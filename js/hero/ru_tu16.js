/* ================= ru_tu16.js  -  HERO MODEL =================
   Tupolev Tu-16Z wing-to-wing tanker (pact_e50_tanker), the Soviet Union's
   first tanker (1950s): the Tu-16 "Badger" airframe -- 35-degree swept
   mid-wing carrying two AM-3 turbojets buried in the roots (intakes in the
   leading edge beside the fuselage, jets out past the trailing edge), a
   round fuselage with a glazed navigator's nose and a two-seat cockpit
   under a raised canopy, the main gear folding into two long pods behind the
   wing trailing edges, a swept fin with a high-set swept tailplane, and the
   defensive cannon turrets (dorsal, ventral and tail) the bomber kept.

   References (each fetched once, Wikimedia Commons, generic user agent):
     - "Tupolev Tu-16 3-view line drawing.png": the planform (wing sweep
       about 35 deg, root and tip chords, the gear pods behind the trailing
       edge at about a seventh of the span out, engine roots beside the
       fuselage), the swept fin and tailplane, the glazed nose, the side
       profile (cockpit position, turret blisters, fin height). Published
       figures used for the scale: length 34.80 m, span 32.99 m, height
       10.36 m, wing area 164.65 sq m.
     - Four Wikimedia Commons photographs of Soviet Tu-16 bombers (an
       underside view in flight, DPLA f45e6555...; USN photographs of the
       aircraft intercepted by F-4s, 1963 and 1975; one over USS Kitty Hawk,
       1963): the slender round fuselage (about 2.6 m deep), glazed nose
       with the chin glazing, the raised canopy, the AM-3 nacelles in the
       wing roots with intakes at the leading edge, the long main-gear pods
       trailing the wing, the swept fin and the tailplane set on the top of
       the rear fuselage, the dorsal / ventral / tail gun turrets, natural
       metal, and the red stars: on the fin, in a roundel on the rear
       fuselage, and on the upper and lower wing faces.
   NOT confirmed by any source found and kept deliberately plain: a
   photograph of the Z itself (none turned up), the shape of the starboard
   wingtip hose-reel fairing (a simple streamlined pod, nothing more), any
   difference from the bomber's gun fit on the Z (the bomber's three
   turrets are kept), panel lines and lettering. No bort number, no unit
   mark.

   Parking: 33 m of span on a 34.8 m body: pact_e50_tanker is already on the
   OVERSIZE list of tools/jsc/parked3d_check.js and stays there.

   Model space: +X nose, +Y left (port), +Z up, metres; d is metres aft of
   the nose; the fuselage axis is z = 0, the ground z = -2.7. One mesh per
   material; the gear is a group named "gear" (the tyres are the lowest
   opaque thing). Team colour exactly C.team: two small flat strips, one on each
   upper wingtip, nothing else. National stars: fin, rear fuselage and both faces
   of each wing (as the photographs of Soviet Tu-16s show them).
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTu16Z = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var L = 34.8, NOSE = L / 2, GROUND = -2.7;
  function X(d) { return NOSE - d; }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* fuselage: d, half-width, half-height, centre z */
  var FUS = [
    [0.00, 0.04, 0.04, -0.40], [0.30, 0.38, 0.38, -0.42], [0.90, 0.72, 0.72, -0.34], [1.80, 1.02, 1.04, -0.14],
    [3.20, 1.22, 1.26, 0.00], [5.00, 1.27, 1.32, 0.02], [9.00, 1.28, 1.30, 0.00], [16.0, 1.28, 1.30, 0.00],
    [21.0, 1.24, 1.26, 0.02], [25.0, 1.04, 1.06, 0.06], [29.0, 0.78, 0.80, 0.12], [32.0, 0.50, 0.52, 0.16],
    [33.4, 0.30, 0.32, 0.18]
  ];
  /* wing: y, leading-edge d, trailing-edge d */
  var WING = [[1.0, 11.2, 19.9], [5.5, 13.9, 20.4], [11.0, 17.7, 22.0], [16.5, 20.9, 23.5]];
  function wz(y) { return -0.30 + 0.017 * y; }
  function wtc(y) { return 0.125 - 0.035 * Math.min(1, y / 16.5); }
  var STAB = [[0.3, 28.6, 32.8], [2.5, 29.4, 32.9], [5.88, 31.0, 33.4]];
  var STABZ = 0.85;
  var FIN = [[0.6, 24.6, 33.4, 0.11], [3.0, 27.0, 33.8, 0.10], [5.5, 29.6, 34.0, 0.09], [7.66, 31.6, 34.1, 0.08]];
  var ENG = [[0.0, 0.62], [0.25, 0.80], [1.5, 0.86], [6.0, 0.84], [9.5, 0.68], [11.0, 0.52], [11.3, 0.42]];
  var POD = [[0.0, 0.22], [0.8, 0.52], [2.0, 0.62], [6.0, 0.62], [8.0, 0.46], [9.5, 0.20]];
  var YE = 2.15, YP = 4.9;

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
    var rings = [], i, j, N = 30, NR = 52;
    for (i = 0; i < NR; i++) {
      var s = fusAt(33.4 * i / (NR - 1)), ring = [];
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
  function addCockpit(THREE, g, T) {
    /* the glazed navigator's nose, low and forward */
    g.add(egg(THREE, T.glass, 1.15, 0.78, 0.62, X(1.45), 0, -0.62, 14, 8));
    /* the raised two-seat canopy */
    g.add(egg(THREE, T.glass, 1.35, 0.82, 0.46, X(4.9), 0, 1.02, 14, 7));
    /* the navigator's side windows */
    g.add(egg(THREE, T.glass, 0.5, 0.06, 0.28, X(3.0), 1.10, 0.28, 8, 5));
    g.add(egg(THREE, T.glass, 0.5, 0.06, 0.28, X(3.0), -1.10, 0.28, 8, 5));
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
        var y = st[0], c = st[2] - st[1], tc = 0.09 - 0.03 * Math.min(1, y / 5.88);
        return foil(9, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * y, STABZ + p[1] * c - 0.003 * y]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T, function () { return "skin"; });
    }
    /* red stars on both sides of the fin */
    var fc = 4.3, i0 = 1, f0 = FIN[1], f1 = FIN[2], t = (fc - f0[0]) / (f1[0] - f0[0]);
    var dl = f0[1] + (f1[1] - f0[1]) * t, dt = f0[2] + (f1[2] - f0[2]) * t, tc = f0[3] + (f1[3] - f0[3]) * t, c = dt - dl;
    var hy = naca(0.55, tc) * c + 0.01;
    for (s = -1; s <= 1; s += 2) star(THREE, g, T, dl + 0.55 * c, s * hy, fc, 0.62, s);
    /* and on the rear fuselage, aft of the wing */
    var fs = fusAt(27.2);
    for (s = -1; s <= 1; s += 2) star(THREE, g, T, 27.2, s * (fs[1] + 0.012), fs[3], 0.36, s);
  }
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
  /* point on the wing's upper (up = 1) or lower (up = -1) skin at span y, chord fraction f */
  function wingSkin(y, f, up) {
    var w = wingAt(y), c = w.dTE - w.dLE, cam = 0.012, tc = wtc(y);
    var yy = cam * 4 * f * (1 - f) + up * naca(f, tc);
    return [X(w.dLE + f * c), wz(y) + yy * c];
  }
  function flatStar(THREE, g, T, y, f, up, r) {
    /* a red star with a white border lying on the wing skin (photographs show it on both faces) */
    var p = wingSkin(Math.abs(y), f, up), k, lay, li, rr, a, pos, idx, m, lays = [[r, "white"], [r * 0.78, "red"]];
    for (li = 0; li < 2; li++) {
      lay = lays[li];
      pos = [p[0], y, p[1] + up * 0.03 * (li + 1)]; idx = [];
      for (k = 0; k < 10; k++) {
        rr = (k & 1) ? lay[0] * 0.4 : lay[0];
        a = k * Math.PI / 5;
        pos.push(p[0] - rr * Math.cos(a), y + rr * Math.sin(a), p[1] + up * 0.03 * (li + 1));
      }
      for (k = 0; k < 10; k++) idx.push(0, 1 + k, 1 + (k + 1) % 10);
      m = new THREE.Mesh(geoFrom(THREE, pos, idx), T[lay[1]]);
      m.geometry.computeVertexNormals();
      g.add(m);
    }
  }
  function addWingMarks(THREE, g, T, s) {
    var y0 = 14.6, y1 = 16.1, f0 = 0.28, f1 = 0.62, pos = [], idx = [], i, j, NY = 3, NF = 3;
    /* the team strip: one small flat plate on the upper wingtip, just above the skin */
    for (i = 0; i <= NY; i++) for (j = 0; j <= NF; j++) {
      var y = y0 + (y1 - y0) * i / NY, f = f0 + (f1 - f0) * j / NF, p = wingSkin(y, f, 1);
      pos.push(p[0], s * y, p[1] + 0.025);
    }
    for (i = 0; i < NY; i++) for (j = 0; j < NF; j++) {
      var a = i * (NF + 1) + j, b = a + 1, c = a + NF + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    var tg = geoFrom(THREE, pos, idx);
    tg.computeVertexNormals();
    g.add(new THREE.Mesh(tg, T.team));
    /* national star: upper and lower face, about 60 per cent out */
    flatStar(THREE, g, T, s * 9.0, 0.50, 1, 0.95);
    flatStar(THREE, g, T, s * 9.0, 0.50, -1, 0.95);
  }
  function addWings(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var rings = WING.map(function (st) {
        var y = st[0], c = st[2] - st[1];
        return foil(15, wtc(y), 0.012).map(function (p) { return [X(st[1] + p[0] * c), s * y, wz(y) + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function () { return "skin"; });
      addWingMarks(THREE, g, T, s);
      /* two boundary-layer fences on the upper surface */
      [7.6, 12.2].forEach(function (y) {
        var w = wingAt(y), dd = w.dLE + 0.12 * (w.dTE - w.dLE);
        g.add(box(THREE, T.skin, (w.dTE - w.dLE) * 0.5, 0.03, 0.30, X(dd + (w.dTE - w.dLE) * 0.25), s * y, wz(y) + 0.5 * wtc(y) * (w.dTE - w.dLE) * 0.5 + 0.1));
      });
    }
    /* the starboard wingtip hose-reel fairing of the wing-to-wing fit (shape plain, not confirmed) */
    var wy = -16.5, w = wingAt(16.5);
    var fr = lathe(THREE, [[0, 0.05], [0.4, 0.2], [1.2, 0.3], [4.2, 0.3], [5.4, 0.2], [6.0, 0.06]], 12, X(w.dLE - 1.4), wy + 0.1, wz(16.5), false, true);
    emit(THREE, g, fr, T, function () { return "skin"; });
    g.add(disc(THREE, T.ink, 0.04, X(w.dLE - 1.38), wy + 0.1, wz(16.5), 8));
  }

  /* ---------------------------------------------------------- engines, pods, guns */
  function addEngines(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var yc = s * YE, zc = wz(YE) - 0.02, dF = 11.0;
      emit(THREE, g, lathe(THREE, ENG, 24, X(dF), yc, zc, false, true), T, function (cx, cy, cz, nx) { return nx < -0.8 ? "ink" : "skin"; });
      g.add(disc(THREE, T.ink, ENG[0][1] + 0.01, X(dF), yc, zc, 18));
      /* the gear pod behind the trailing edge */
      var yp = s * YP, zp = wz(YP) - 0.12;
      emit(THREE, g, lathe(THREE, POD, 22, X(16.8), yp, zp, true, true), T, function () { return "skin"; });
    }
  }
  function addGuns(THREE, g, T) {
    var s;
    /* dorsal turret */
    g.add(egg(THREE, T.skin, 0.55, 0.38, 0.30, X(16.0), 0, 1.30, 10, 6));
    for (s = -1; s <= 1; s += 2) g.add(box(THREE, T.metal, 1.1, 0.06, 0.06, X(17.2), s * 0.16, 1.32));
    /* ventral turret */
    g.add(egg(THREE, T.skin, 0.6, 0.38, 0.28, X(19.8), 0, -1.30, 10, 6));
    for (s = -1; s <= 1; s += 2) g.add(box(THREE, T.metal, 1.0, 0.06, 0.06, X(20.9), s * 0.15, -1.40));
    /* tail turret: the fuselage ends in it, the barrels set the length */
    g.add(egg(THREE, T.skin, 0.75, 0.30, 0.30, X(33.6), 0, 0.18, 10, 6));
    for (s = -1; s <= 1; s += 2) g.add(box(THREE, T.metal, 1.4, 0.07, 0.07, X(34.1), s * 0.15, 0.2));
    g.add(box(THREE, T.metal, 0.4, 0.04, 0.04, X(L - 0.2) - 0.0, 0.15, 0.2 + 0.001));
  }

  /* ---------------------------------------------------------- gear */
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), s, o;
    gear.name = "gear";
    function wheel(R, W, x, y, z) {
      var t = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 16, 1), T.tyre);
      t.position.set(x, y, z);
      gear.add(t);
      var h = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.55, R * 0.55, W + 0.03, 10, 1), T.metal);
      h.position.set(x, y, z);
      gear.add(h);
    }
    /* nose: twin tyres under the cockpit */
    var nz = GROUND + 0.4;
    for (s = -1; s <= 1; s += 2) wheel(0.4, 0.2, X(5.2), s * 0.2, nz);
    gear.add(taper(THREE, T.metal, [X(5.0), 0, -1.2], [X(5.2), 0, nz], 0.1, 0.07, 8));
    /* mains: a four-wheel bogie under each pod */
    var mz = GROUND + 0.55;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * YP;
      for (o = -1; o <= 1; o += 2) wheel(0.55, 0.32, X(21.8 + o * 0.7), yc, mz);
      gear.add(taper(THREE, T.metal, [X(21.1), yc, mz], [X(22.5), yc, mz], 0.06, 0.06, 6));
      gear.add(taper(THREE, T.metal, [X(21.8), yc, wz(YP) - 0.55], [X(21.8), yc, mz + 0.05], 0.13, 0.1, 8));
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
        transparent: true, opacity: 0.83, side: THREE.DoubleSide })
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
    addGuns(THREE, g, T);
    addGear(THREE, g, T);
    return mergeByMaterial(THREE, g);
  }
  return { build: build };
})();

/* len: the measured X extent, nose to the tail-gun muzzles */
UNIT_MODELS["pact_e50_tanker"] = {
  len: 34.8,
  build: function (THREE, M, C) { return HeroTu16Z.build(THREE, M, C); }
};
