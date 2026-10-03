/* ================= ru_tu126.js  -  HERO MODEL =================
   Tupolev Tu-126 "Moss" airborne early-warning aircraft (pact_e60_awacs,
   1960s): the Tu-114 airliner fuselage (a round 4.2 m body, rows of round
   cabin portholes, glazed nose and angular flight-deck windows) on the
   Tu-95 / Tu-114 wing - a low wing swept 35 degrees at quarter chord -
   four NK-12 turboprops with eight-bladed contra-rotating propellers, the
   inner pair in long nacelles that run well aft of the trailing edge and
   take the main gear (a four-wheel bogie on a long leg behind each), a
   swept fin with the tailplane low on the rear fuselage, the big flattened
   rotodome (about 11 m across, under 2 m thick) on a swept pylon above the
   fuselage aft of the wing, and the in-flight refuelling probe on the top
   of the nose.

   References (fetched once each, Wikimedia Commons, generic user agent,
   800 px copies, cached in the scratchpad tu126_ref folder):
     - "Tu-126.jpg" and "Tu-126 in flight 1977.JPEG": two side photographs of
       the aircraft in flight. They give the side profile and every
       proportion used here: length 55.2 m (probe tip to tail), the nose
       probe projecting about 2.4 m on the top of the nose, a nose and
       flight-deck glazing as an airliner's, the row of round portholes, the
       rotodome centred about 35 m aft of the probe tip with its pylon base
       from about 30 to 38 m, the tall swept fin (leading edge from the
       fuselage top at about 42 m up to a narrow tip at about 52-54 m) with
       the red star on it, the tailplane low on the rear fuselage, the
       natural-metal finish (pale polished metal, white-grey dome), the
       four turboprop nacelles with the inner pair running far aft of the
       wing.
     - "Tupolev Tu-126, air base Olenya, USSR.jpg": the nose close up -
       the angled flight-deck windows and lower nose glazing (the airliner
       emblem painted below the windows is not drawn).
     - "Tupolev Tu-126 3-view line drawing" (Wikimedia Commons, side, top and
       front views of the Tu-126 itself, cached in tu126_ref2/a.jpg): the
       wing planform (leading edge swept about 37 degrees, root chord about
       11 m, tip about 2.7 m), the nacelle stations (about 6.7 m and 12.6 m
       from the centreline; the inner pair long and running about 2 m aft of
       the trailing edge over the gear bays, the outer pair about 9.5 m), the
       tailplane (span about 16 m, swept) and fin (leading edge from about
       43 m to a tip at about 52 m, top about 8.8 m above the axis), the
       rotodome (about 10.9 m across, 1.6 m thick, centred about 35 m aft of
       the probe tip) on its trapezoid pylon, and the gear bays. The
       drawing's views are not to one scale, so every dimension is taken as a
       fraction of that view's own length or half span and scaled to the
       published 55.2 m and 51.2 m (js/air_specs.js).
     - "Tupolev Tu-126, Zokniai, Siauliai" (ground photograph, tu126_ref2/b.jpg):
       the low stance, the gear legs under the inner nacelles with a
       multi-wheel bogie, and the twin nose wheels; "Long Range Soviet
       Airliner Tu-114" (c.jpg) shows the same gear on the Tu-114.
     - "Tu-126.jpg" and "Tu-126 in flight 1977.JPEG" (in flight): a plain red
       star on the fin and none on the wings or fuselage; pale natural metal
       with a white-grey dome and fin.
     - "Tupolev Tu-126, air base Olenya, USSR.jpg": the nose close up -
       the angled flight-deck windows and lower nose glazing (the airliner
       emblem painted below the windows is not drawn).
   NOT confirmed and kept plain or left out: the overall height (about 13.7 m
   here, from the fin top in the drawing plus an estimated ground clearance
   of about 2.7 m under the belly), the exact wheel count of the bogies,
   any ventral radome or aerial blades, the rear fuselage ventral fairing,
   panel lines, any wing or fuselage star (only the fin star is seen in the
   photographs, so only that is drawn), lettering, bort number, the
   Aeroflot-type emblem on the nose (left out).

   Parking: 51.2 m of span on a 55.2 m body (see tools/jsc/parked3d_check.js).

   Model space: +X nose (probe tip), +Y left (port), +Z up, metres; d is
   metres aft of the probe tip; the fuselage axis is z = 0, the ground is
   z = -4.9. One mesh per material; the gear is a group named "gear" (the
   tyres are the lowest opaque thing); the propeller discs are see-through
   and not animated. Team colour exactly C.team: two small flat strips, one
   on each upper wingtip, nothing else.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTu126 = (function () {
  "use strict";

  var L = 55.2, NOSE = L / 2, GROUND = -4.9;
  function X(d) { return NOSE - d; }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* fuselage: d, half-width, half-height, centre z */
  var FUS = [
    [2.4, 0.05, 0.05, 0.30], [3.0, 0.90, 0.90, 0.10], [4.5, 1.50, 1.55, 0.05], [7.0, 1.95, 2.00, 0.05],
    [11.0, 2.10, 2.15, 0.00], [39.0, 2.10, 2.15, 0.00], [44.0, 1.85, 1.90, 0.12], [49.0, 1.20, 1.25, 0.35],
    [53.0, 0.60, 0.65, 0.50], [55.2, 0.28, 0.28, 0.60]
  ];
  var SPAN = 25.6, ROOT_LE = 17.4, ROOT_C = 11.4, TIP_C = 2.7, SWEEP_LE = 0.746;
  function wLE(y) { return ROOT_LE + SWEEP_LE * y; }
  function wCh(y) { return ROOT_C - (ROOT_C - TIP_C) * y / SPAN; }
  var WSTA = [2.0, 6.8, 12.4, 19.0, SPAN];
  function wz(y) { return -1.15 + 0.035 * y; }
  function wtc(y) { return 0.12 - 0.03 * Math.min(1, y / SPAN); }
  var STAB = [[0.3, 46.3, 51.1], [4.5, 49.4, 52.9], [8.2, 52.0, 54.6]];
  var STABZ = -0.2;
  var FIN = [[1.2, 43.0, 51.2, 0.11], [4.0, 46.2, 52.2, 0.10], [6.5, 49.1, 53.2, 0.09], [8.8, 51.8, 54.2, 0.08]];
  var ENG = [[0.0, 0.02], [0.5, 0.45], [1.4, 0.72], [2.4, 0.92], [4.0, 1.0], [11.0, 1.0], [13.0, 0.85], [14.4, 0.35]];
  var NAC = [{ y: 6.7, d: 17.0, len: 16.4 }, { y: 12.6, d: 20.6, len: 9.5 }];
  var PROPR = 2.8;

  var _sheet;
  function skinSheet(THREE) {
    if (_sheet !== undefined) return _sheet;
    var tex = null;
    try {
      var S = 512, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), R = rngFor(971), i, k;
      g.fillStyle = "#c4cacd"; g.fillRect(0, 0, S, S);
      for (k = 0; k < 90; k++) {
        g.fillStyle = (k & 1) ? "#cfd4d7" : "#b9c0c4";
        g.fillRect(R() * S, R() * S, 20 + R() * 90, 3 + R() * 10);
      }
      g.strokeStyle = "rgba(0,0,0,0.17)"; g.lineWidth = 1;
      for (i = 0; i < S; i += 19) { g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, S); g.stroke(); }
      for (i = 0; i < S; i += 38) { g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(S, i + 0.5); g.stroke(); }
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
  function gridGeo(THREE, rings, capA, capB) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    for (i = 0; i < nr - 1; i++) for (j = 0; j < N; j++) {
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
  /* a finished skin part, its triangles shared out between materials by rule */
  function emit(THREE, grp, g, T, rule) {
    outward(g);
    g.computeVertexNormals();
    planarUV(THREE, g);
    var p = g.attributes.position.array, ix = g.index.array, out = {}, order = [], i;
    for (i = 0; i < ix.length; i += 3) {
      var a = 3 * ix[i], b = 3 * ix[i + 1], c = 3 * ix[i + 2];
      var ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2];
      var vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      var k = rule ? rule((p[a] + p[b] + p[c]) / 3, (p[a + 1] + p[b + 1] + p[c + 1]) / 3,
                          (p[a + 2] + p[b + 2] + p[c + 2]) / 3, nx / l, ny / l, nz / l) : "skin";
      if (!out[k]) { out[k] = []; order.push(k); }
      out[k].push(ix[i], ix[i + 1], ix[i + 2]);
    }
    for (i = 0; i < order.length; i++) {
      var s = new THREE.BufferGeometry();
      s.setAttribute("position", g.attributes.position);
      s.setAttribute("normal", g.attributes.normal);
      s.setAttribute("uv", g.attributes.uv);
      s.setIndex(out[order[i]]);
      grp.add(new THREE.Mesh(s, T[order[i]]));
    }
  }
  function plate(THREE, ol, y0, t) {
    var n = ol.length, pos = [], idx = [], i;
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 + t, ol[i][1]);
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 - t, ol[i][1]);
    for (i = 1; i < n - 1; i++) { idx.push(0, i, i + 1); idx.push(n, n + i + 1, n + i); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; idx.push(i, n + i, j, j, n + i, n + j); }
    return geoFrom(THREE, pos, idx);
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
  function disc(THREE, mat, r, x, y, z, n) {
    var m = new THREE.Mesh(new THREE.CircleGeometry(r, n || 14), mat);
    m.rotation.y = Math.PI / 2;
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
  function addFuselage(THREE, g, T) {
    var rings = [], i, j, N = 26, NR = 46;
    for (i = 0; i < NR; i++) {
      var s = fusAt(2.4 + (L - 2.4) * i / (NR - 1)), ring = [];
      for (j = 0; j < N; j++) {
        var t = j / N * Math.PI * 2;
        ring.push([X(s[0]), s[1] * Math.cos(t), s[3] + s[2] * Math.sin(t)]);
      }
      rings.push(ring);
    }
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function () { return "skin"; });
  }
  function star(THREE, g, T, dC, yS, zC, r, side) {
    /* the Soviet star: white border, red star inside; flat on the surface */
    var k, pos, idx, m, rr;
    [[r, "white"], [r * 0.78, "red"]].forEach(function (lay, li) {
      pos = [dC && 0, 0, 0]; pos = [X(dC), yS + side * 0.012 * (li + 1), zC]; idx = [];
      for (k = 0; k < 10; k++) {
        rr = (k & 1) ? lay[0] * 0.4 : lay[0];
        var a = Math.PI / 2 + k * Math.PI / 5;
        pos.push(X(dC) - rr * Math.cos(a), yS + side * 0.012 * (li + 1), zC + rr * Math.sin(a));
      }
      for (k = 0; k < 10; k++) idx.push(0, 1 + k, 1 + (k + 1) % 10);
      m = new THREE.Mesh(geoFrom(THREE, pos, idx), T[lay[1]]);
      m.geometry.computeVertexNormals();
      g.add(m);
    });
  }
  function addDetails(THREE, g, T) {
    var s, i, f;
    /* the in-flight refuelling probe on the top of the nose */
    g.add(taper(THREE, T.metal, [X(0.0), 0, 0.72], [X(3.4), 0, 0.96], 0.07, 0.15, 8));
    /* flight-deck windscreen and side windows, lower nose glazing (photographs of the nose) */
    g.add(egg(THREE, T.glass, 0.95, 1.0, 0.36, X(6.4), 0, 1.58, 12, 6));
    for (s = -1; s <= 1; s += 2) g.add(egg(THREE, T.glass, 0.75, 0.06, 0.32, X(6.6), s * 1.78, 0.78, 8, 5));
    g.add(egg(THREE, T.glass, 1.15, 0.85, 0.5, X(4.3), 0, -0.95, 12, 6));
    /* the row of round cabin portholes, both sides */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 11; i++) {
      var d = 12.0 + i * 2.7, fs = fusAt(d);
      var w = new THREE.CircleGeometry(0.16, 6);
      w.rotateX(s * Math.PI / 2);
      w.translate(X(d), s * (fs[1] * 0.995 + 0.012), 1.0);
      g.add(new THREE.Mesh(w, T.ink));
    }
    /* the rotodome on its pylon: flattened disc about 11 m across, under 2 m thick, centred about 35 m aft of the probe tip */
    /* the sphere's polar axis is Y, so stand it flat: build it with Y up, then lay it down */
    var dg = new THREE.SphereGeometry(1, 28, 12);
    dg.rotateX(Math.PI / 2);
    dg.scale(5.45, 5.45, 0.82);
    dg.translate(X(35.3), 0, 5.3);
    planarUV(THREE, dg);
    g.add(new THREE.Mesh(dg, T.skin));
    var ol = [[X(31.6), 1.7], [X(39.0), 1.7], [X(37.9), 4.6], [X(32.7), 4.6]];
    emit(THREE, g, plate(THREE, ol, 0, 0.45), T, function () { return "skin"; });
  }

  /* ---------------------------------------------------------- tail / wings */
  function addTail(THREE, g, T) {
    var rings = [], s;
    FIN.forEach(function (f) {
      var c = f[2] - f[1];
      rings.push(foil(9, f[3], 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; }));
    });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function () { return "skin"; });
    for (s = -1; s <= 1; s += 2) {
      var sr = STAB.map(function (st) {
        var y = st[0], c = st[2] - st[1], tc = 0.10 - 0.04 * Math.min(1, y / 8.25);
        return foil(9, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * y, STABZ + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T, function () { return "skin"; });
    }
    /* the red star on both sides of the fin (the photographs show it there) */
    var fc = 4.8, f0 = FIN[1], f1 = FIN[2], t = (fc - f0[0]) / (f1[0] - f0[0]);
    var dl = f0[1] + (f1[1] - f0[1]) * t, dt = f0[2] + (f1[2] - f0[2]) * t, tc = f0[3] + (f1[3] - f0[3]) * t, c = dt - dl;
    var hy = naca(0.5, tc) * c + 0.01;
    for (s = -1; s <= 1; s += 2) star(THREE, g, T, dl + 0.5 * c, s * hy, fc, 0.62, s);
  }
  function wingSkin(y, f, up) {
    var le = wLE(y), c = wCh(y), cam = 0.012, tc = wtc(y);
    var yy = cam * 4 * f * (1 - f) + up * naca(f, tc);
    return [X(le + f * c), wz(y) + yy * c];
  }
  function addWings(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var rings = WSTA.map(function (y) {
        var le = wLE(y), c = wCh(y);
        return foil(15, wtc(y), 0.012).map(function (p) { return [X(le + p[0] * c), s * y, wz(y) + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function () { return "skin"; });
      /* the team strip: one small flat plate on the upper wingtip, just above the skin */
      var y0 = 21.5, y1 = 24.2, f0 = 0.25, f1 = 0.65, pos = [], idx = [], i, j, NY = 3, NF = 3;
      for (i = 0; i <= NY; i++) for (j = 0; j <= NF; j++) {
        var y = y0 + (y1 - y0) * i / NY, f = f0 + (f1 - f0) * j / NF, p = wingSkin(y, f, 1);
        pos.push(p[0], s * y, p[1] + 0.025);
      }
      for (i = 0; i < NY; i++) for (j = 0; j < NF; j++) {
        var a = i * (NF + 1) + j, b = a + 1, c2 = a + NF + 1, d2 = c2 + 1;
        idx.push(a, b, c2, b, d2, c2);
      }
      var tg = geoFrom(THREE, pos, idx);
      tg.computeVertexNormals();
      g.add(new THREE.Mesh(tg, T.team));
    }
  }

  /* ---------------------------------------------------------- engines, props */
  function addEngines(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) NAC.forEach(function (n, k) {
      var yc = s * n.y, zc = wz(n.y) - 0.15, sc = n.len / 14.4;
      var prof = ENG.map(function (e) { return [e[0] * sc, e[1]]; });
      emit(THREE, g, lathe(THREE, prof, 22, X(n.d), yc, zc, false, true), T, function () { return "skin"; });
      /* the chin intake under the spinner */
      g.add(box(THREE, T.ink, 0.5, 0.9, 0.34, X(n.d + 2.3), yc, zc - 0.88));
      /* two eight-bladed contra-rotating airscrews as see-through blur discs, not animated */
      g.add(disc(THREE, T.propDisc, PROPR, X(n.d + 0.7), yc, zc, 32));
      g.add(disc(THREE, T.propDisc, PROPR, X(n.d + 1.15), yc, zc, 32));
    });
  }

  /* ---------------------------------------------------------- gear */
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), s, o;
    gear.name = "gear";
    function wheel(R, W, x, y, z) {
      var t = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 16, 1), T.tyre);
      t.rotation.x = 0;
      t.position.set(x, y, z);
      gear.add(t);
      var h = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.55, R * 0.55, W + 0.03, 10, 1), T.metal);
      h.position.set(x, y, z);
      gear.add(h);
    }
    /* nose: twin tyres under the flight deck */
    var nz = GROUND + 0.45;
    for (s = -1; s <= 1; s += 2) wheel(0.45, 0.22, X(9.0), s * 0.26, nz);
    gear.add(taper(THREE, T.metal, [X(8.9), 0, -1.9], [X(9.0), 0, nz], 0.12, 0.08, 8));
    /* mains: a four-wheel bogie on a long leg behind each inner nacelle */
    var mz = GROUND + 0.6, yi = NAC[0].y, zi = wz(yi) - 0.15 - 0.98;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * yi;
      for (o = -1; o <= 1; o += 2) { wheel(0.6, 0.34, X(26.4 + o * 0.75), yc - 0.3, mz); wheel(0.6, 0.34, X(26.4 + o * 0.75), yc + 0.3, mz); }
      gear.add(taper(THREE, T.metal, [X(25.6), yc, mz], [X(27.2), yc, mz], 0.07, 0.07, 6));
      gear.add(taper(THREE, T.metal, [X(26.4), yc, zi + 0.1], [X(26.4), yc, mz + 0.05], 0.16, 0.12, 8));
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
    var skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.42, metalness: 0.45, side: THREE.DoubleSide });
    var t = skinSheet(THREE);
    if (t) skin.map = t; else skin.color.set("#c4cacd");
    return {
      skin: skin,
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
        roughness: 0.82, metalness: 0.06, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x474d52, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95, metalness: 0.04 }),
      red: new THREE.MeshStandardMaterial({ color: 0xc8161d, roughness: 0.7, metalness: 0.02, side: THREE.DoubleSide }),
      white: new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.7, metalness: 0.02, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.83, side: THREE.DoubleSide }),
      propDisc: new THREE.MeshStandardMaterial({ color: 0x202427, roughness: 1.0, metalness: 0.0, transparent: true, opacity: 0.16,
        depthWrite: false, side: THREE.DoubleSide })
    };
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addFuselage(THREE, g, T);
    addDetails(THREE, g, T);
    addTail(THREE, g, T);
    addWings(THREE, g, T);
    addEngines(THREE, g, T);
    addGear(THREE, g, T);
    return mergeByMaterial(THREE, g);
  }
  return { build: build };
})();

/* len: the X extent, probe tip to the tail */
UNIT_MODELS["pact_e60_awacs"] = {
  len: 55.2,
  build: function (THREE, M, C) { return HeroTu126.build(THREE, M, C); }
};
