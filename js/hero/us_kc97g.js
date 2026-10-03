/* ================= us_kc97g.js  -  HERO MODEL =================
   Boeing KC-97G Stratofreighter (nato_e50_tanker), USAF Strategic Air
   Command's piston tanker, in service from 1953: the C-97 / Stratocruiser
   airframe with its double-bubble ("figure-eight") fuselage, four Pratt &
   Whitney R-4360 radials with four-blade propellers, the tall fin, tricycle
   gear and the flying boom stowed under the tail. It used to stand in on the
   KC-46 (js/hero/us_tankers.js).

   References (Wikimedia Commons, each fetched once):
     - "Boeing C-97 Stratofreighter 3-view line drawing": length 110 ft 4 in,
       span 141 ft 3 in, fin top 38 ft 3 in (the published KC-97G figures),
       fuselage 11 ft 0 in wide, root chord 17 ft 0 in, tip chord 7 ft 5 in,
       leading edge swept 7 deg, trailing edge nearly straight, 4.5 deg
       dihedral, tailplane span 43 ft 0 in and 11 ft 2 in deep, propellers
       16 ft 6 in across, engine centres 13 ft 11 in and 31 ft 0 in from the
       centreline, the inner propeller plane 7 ft 8 in ahead of the root
       leading edge, nose gear 4 ft 5 in from the nose, wheelbase 36 ft 5 in,
       wheel tread 28 ft 6 in, the fuselage underside rising to the tail.
       The fuselage sections, the fin outline and the nacelle plan come from
       measuring that drawing.
     - "Barksdale Global Power Museum September 2015 38 (Boeing KC-97G-L
       Stratofreighter)": the natural-metal skin, black "U.S. AIR FORCE" on
       the nose (not drawn), the raised flight-deck glazing, the dome on the
       spine, the cowls with chin scoops, yellow-tipped four-blade propellers
       and the dual-wheel nose and main gear. THAT AIRCRAFT CARRIES THE
       J47 JET PODS under the outer wings: they are the KC-97L conversion
       ("G-L"), not the KC-97G, so no pods are drawn here; the wing under the
       outer engines is clean.
   Not confirmed, so not drawn: the lettering, the yellow blade tips, the
   exact boom geometry (a stowed tube, a boom bay fairing and two small
   ruddevators), the flap and aileron lines.

   Parking: 43.05 m of span on a 33.6 m body, the same case as the KC-135 and
   KC-46 rows: nato_e50_tanker is already on the OVERSIZE list of
   tools/jsc/parked3d_check.js and stays there, the wing being wider than the
   revetment bins.

   Model space: +X nose, +Y left, +Z up, metres; every station d is metres
   aft of the nose; the fuselage upper-lobe axis is z = 0, the ground z =
   -4.32. One mesh per material, the gear in a group named "gear" (the tyres
   are the lowest opaque thing). Team flash exactly C.team: the fin tip and
   the upper wing tips and tailplane tips. Propellers: static blades under a
   see-through blur disc.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKC97G = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var L = 33.63, NOSE = L / 2, GROUND = -4.32;
  function X(d) { return NOSE - d; }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* fuselage: d, upper-lobe radius, its centre z, lower-lobe radius, its centre z */
  var FUS = [
    [0.00, 0.05, -1.00, 0.00, -1.00], [0.40, 0.70, -0.55, 0.55, -1.15], [1.00, 1.15, -0.20, 0.95, -1.40],
    [2.00, 1.45, 0.00, 1.15, -1.55], [3.50, 1.64, 0.00, 1.25, -1.62], [6.00, 1.68, 0.00, 1.28, -1.62],
    [18.0, 1.67, 0.00, 1.28, -1.62], [22.0, 1.60, 0.00, 1.15, -1.55], [25.0, 1.45, 0.00, 0.95, -1.25],
    [28.0, 1.25, 0.00, 0.70, -0.70], [31.0, 0.95, 0.10, 0.35, -0.10], [33.0, 0.45, 0.35, 0.00, 0.35],
    [33.63, 0.12, 0.45, 0.00, 0.45]
  ];
  /* wing: y, leading edge d, trailing edge d (root 5.2 m, tip 2.2 m) */
  var WING = [[1.2, 10.02, 15.14], [4.24, 10.44, 15.07], [9.45, 11.15, 15.00], [15.0, 11.91, 14.95],
              [20.0, 12.59, 14.90], [21.52, 12.80, 14.88]];
  function wz(y) { return -1.65 + 0.0787 * y; }                 /* 4.5 deg dihedral */
  function wtc(y) { return 0.16 - 0.065 * Math.min(1, y / 21.5); }
  var CAMBER = 0.012, YTEAM = 18.0;
  var STAB = [[0.4, 28.05, 31.45], [2.0, 28.30, 31.45], [4.0, 28.65, 31.40], [5.5, 29.00, 31.30], [6.2, 29.35, 31.05],
              [6.52, 29.8, 30.6]];
  var STABZ = 1.25;
  var FIN = [[0.9, 22.8, 33.00, 0.12], [2.0, 25.6, 33.20, 0.11], [3.5, 28.2, 33.35, 0.10], [5.0, 29.8, 33.45, 0.09],
             [6.4, 30.8, 33.45, 0.08], [7.0, 31.3, 33.40, 0.075], [7.34, 31.7, 33.35, 0.07]];
  var FINTEAM = 6.4;
  var NAC = [[0.0, 0.62], [0.12, 0.76], [0.5, 0.85], [1.5, 0.89], [3.0, 0.87], [4.5, 0.80], [6.0, 0.64],
             [7.0, 0.46], [7.6, 0.30], [7.9, 0.12]];
  var ENG = [{ y: 4.24, prop: 7.55 }, { y: 9.45, prop: 7.98 }];
  var PR = 2.51;

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
      blade: new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.62, metalness: 0.3, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95, metalness: 0.04 }),
      blur: new THREE.MeshStandardMaterial({ color: 0xd2d8dc, roughness: 0.5, metalness: 0.0,
        transparent: true, opacity: 0.11, depthWrite: false, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.83, side: THREE.DoubleSide })
    };
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
  function resampleD(tab, n) {
    var d0 = tab[0][0], d1 = tab[tab.length - 1][0], out = [], i, j, c;
    for (i = 0; i < n; i++) {
      var d = d0 + (d1 - d0) * i / (n - 1), k = 0;
      for (j = 1; j < tab.length - 1; j++) if (tab[j][0] <= d) k = j;
      var a = tab[k], b = tab[k + 1], t = (d - a[0]) / Math.max(1e-6, b[0] - a[0]);
      var p0 = tab[Math.max(0, k - 1)], p3 = tab[Math.min(tab.length - 1, k + 2)], row = [d];
      for (c = 1; c < a.length; c++) row.push(Math.max(0, cr1(p0[c], a[c], b[c], p3[c], t)));
      /* centres may be negative: redo them unclamped */
      row[2] = cr1(p0[2], a[2], b[2], p3[2], t); row[4] = cr1(p0[4], a[4], b[4], p3[4], t);
      out.push(row);
    }
    return out;
  }
  var SEC = null;
  /* the figure-eight section at one row: the union of two circles, sampled
     round a point inside both (the middle of their common chord) */
  var NF = 36;
  function ringPts(s) {
    var Ru = s[1], zu = s[2], Rl = s[3], zl = s[4], pz, j, out = [];
    var sep = zu - zl, two = Rl > 0.03;
    if (!two || sep + Rl <= Ru + 1e-6) pz = zu;
    else if (sep + Ru <= Rl) pz = zl;
    else pz = zu - (sep * sep + Ru * Ru - Rl * Rl) / (2 * sep);
    for (j = 0; j < NF; j++) {
      var t = j / NF * Math.PI * 2, dy = Math.cos(t), dz = Math.sin(t), r = 0;
      [[Ru, zu], [two ? Rl : 0, zl]].forEach(function (cc) {
        if (cc[0] <= 0) return;
        var oz = pz - cc[1], b = oz * dz, c = oz * oz - cc[0] * cc[0];
        var q = b * b - c;
        if (q < 0) return;
        r = Math.max(r, -b + Math.sqrt(q));
      });
      out.push([dy * r, pz + dz * r]);
    }
    return out;
  }
  function addFuselage(THREE, g, T) {
    var rings = SEC.map(function (s) { return ringPts(s).map(function (p) { return [X(s[0]), p[0], p[1]]; }); });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function () { return "skin"; });
  }
  /* glass laid on the hull between stations and ring angles */
  function glassAt(THREE, T, g, d0, d1, a0, a1, nd, na) {
    var pos = [], idx = [], i, j;
    for (i = 0; i <= nd; i++) {
      var d = d0 + (d1 - d0) * i / nd, k = 0;
      for (var q = 1; q < SEC.length - 1; q++) if (SEC[q][0] <= d) k = q;
      var A = SEC[k], B = SEC[k + 1], t = (d - A[0]) / Math.max(1e-6, B[0] - A[0]), s = [d], c;
      for (c = 1; c < 5; c++) s.push(A[c] + (B[c] - A[c]) * t);
      var pts = ringPts(s);
      for (j = 0; j <= na; j++) {
        var u = (a0 + (a1 - a0) * j / na) / 360 * NF, m = Math.floor(u), f = u - m;
        var p0 = pts[m % NF], p1 = pts[(m + 1) % NF];
        pos.push(X(d), (p0[0] + (p1[0] - p0[0]) * f) * 1.012, (p0[1] + (p1[1] - p0[1]) * f) * 1.012 + 0.01);
      }
    }
    for (i = 0; i < nd; i++) for (j = 0; j < na; j++) {
      var a = i * (na + 1) + j, b = a + 1, cc = a + na + 1, dd = cc + 1;
      idx.push(a, cc, b, b, cc, dd);
    }
    var gg = geoFrom(THREE, pos, idx);
    gg.computeVertexNormals();
    g.add(new THREE.Mesh(gg, T));
  }
  function addCockpit(THREE, g, T) {
    /* the raised flight-deck glazing round the top of the nose */
    glassAt(THREE, T.glass, g, 1.35, 2.9, 55, 125, 3, 7);
    glassAt(THREE, T.glass, g, 1.9, 3.0, 28, 52, 2, 2);
    glassAt(THREE, T.glass, g, 1.9, 3.0, 128, 152, 2, 2);
    /* the dome on the spine behind the flight deck */
    g.add(egg(THREE, T.skin, 0.55, 0.40, 0.24, X(5.2), 0, 1.70, 12, 6));
  }

  /* ---------------------------------------------------------- tail / wings */
  function addTail(THREE, g, T) {
    var rings = [], s;
    FIN.forEach(function (f) {
      var c = f[2] - f[1];
      rings.push(foil(9, f[3], 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; }));
    });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) { return cz > FINTEAM ? "team" : "skin"; });
    for (s = -1; s <= 1; s += 2) {
      var sr = STAB.map(function (st) {
        var y = st[0], c = st[2] - st[1], tc = 0.10 - 0.025 * Math.min(1, y / 6.52);
        return foil(9, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * y, STABZ + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        return (nz > 0 && Math.abs(cy) > 5.3) ? "team" : "skin";
      });
    }
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
  function wingZ(y, d, upper) {
    var w = wingAt(y), c = w.dTE - w.dLE, x = Math.min(1, Math.max(0, (d - w.dLE) / c));
    return wz(Math.abs(y)) + (CAMBER * 4 * x * (1 - x) + (upper ? 1 : -1) * naca(x, wtc(Math.abs(y)))) * c;
  }
  function addWings(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var rings = WING.map(function (st) {
        var y = st[0], c = st[2] - st[1];
        return foil(11, wtc(y), CAMBER).map(function (p) { return [X(st[1] + p[0] * c), s * y, wz(y) + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        return (nz > 0 && Math.abs(cy) > YTEAM) ? "team" : "skin";
      });
    }
  }

  /* ---------------------------------------------------------- engines */
  function lathe(THREE, prof, N, x0, yc, zc, capA, capB) {
    var rings = [], i, j;
    for (i = 0; i < prof.length; i++) {
      var w = Math.max(prof[i][1], 0.004), r = [];
      for (j = 0; j < N; j++) { var t = j / N * Math.PI * 2; r.push([x0 - prof[i][0], yc + w * Math.cos(t), zc + w * Math.sin(t)]); }
      rings.push(r);
    }
    return gridGeo(THREE, rings, capA, capB);
  }
  function addBlade(THREE, g, T, x, yc, zc, phi) {
    var bg = new THREE.BoxGeometry(0.07, 0.34, 2.2);
    bg.rotateZ(26 * D2R);                 /* pitch */
    bg.translate(0, 0, 0.32 + 1.1);
    bg.rotateX(phi);
    bg.translate(x, yc, zc);
    g.add(new THREE.Mesh(bg, T.blade));
  }
  function addEngines(THREE, g, T) {
    ENG.forEach(function (e) {
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * e.y, zc = wz(e.y) - 0.04, dF = e.prop + 0.35, k;
        emit(THREE, g, lathe(THREE, NAC, 18, X(dF), yc, zc, false, true), T, function (cx, cy, cz, nx) {
          return nx < -0.75 ? "ink" : "skin";
        });
        g.add(disc(THREE, T.ink, NAC[0][1] + 0.01, X(dF), yc, zc, 18));
        var sp = outward(lathe(THREE, [[0, 0.02], [0.25, 0.22], [0.50, 0.33]], 10, X(dF - 0.45 - 0.35 + 0.35 - 0.0), yc, zc, false, true));
        sp.computeVertexNormals();
        g.add(new THREE.Mesh(sp, T.metal));
        for (k = 0; k < 4; k++) addBlade(THREE, g, T, X(e.prop), yc, zc, (k / 4 + 0.05 * s + (e.y > 5 ? 0.08 : 0)) * Math.PI * 2);
        g.add(disc(THREE, T.blur, PR, X(e.prop), yc, zc, 32));
        /* the chin scoop under the cowl */
        g.add(box(THREE, T.skin, 1.5, 0.55, 0.32, X(dF + 1.1), yc, zc - 0.82));
        g.add(box(THREE, T.ink, 0.04, 0.45, 0.22, X(dF + 0.33), yc, zc - 0.82));
        /* the web from the nacelle up into the wing */
        emit(THREE, g, plate(THREE, [[X(dF + 2.2), zc + 0.55], [X(dF + 6.2), zc + 0.55],
          [X(dF + 6.2), wingZ(e.y, dF + 6.2, false) + 0.1], [X(dF + 2.2), wingZ(e.y, dF + 2.2, false) + 0.1]], yc, 0.2), T,
          function () { return "skin"; });
      }
    });
  }

  /* ---------------------------------------------------------- boom */
  function addBoom(THREE, g, T) {
    g.add(egg(THREE, T.skin, 1.3, 0.38, 0.30, X(28.9), 0, -1.25, 14, 8));
    g.add(taper(THREE, T.skin, [X(28.6), 0, -1.35], [X(33.56), 0, 0.05], 0.14, 0.07, 10));
    g.add(disc(THREE, T.ink, 0.075, X(33.57), 0, 0.05, 10));
    for (var s = -1; s <= 1; s += 2) {
      var rd = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 0.05), T.skin);
      rd.position.set(X(33.0), s * 0.42, -0.1 + 0.35);
      rd.rotation.x = s * 42 * D2R;
      g.add(rd);
    }
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
    /* nose: twin tyres 4 ft 5 in from the nose */
    var nz = GROUND + 0.46;
    for (s = -1; s <= 1; s += 2) wheel(0.46, 0.28, X(1.45), s * 0.26, nz);
    gear.add(taper(THREE, T.metal, [X(1.35), 0, -2.3], [X(1.45), 0, nz], 0.12, 0.09, 8));
    gear.add(taper(THREE, T.metal, [X(1.45), -0.26, nz], [X(1.45), 0.26, nz], 0.05, 0.05, 6));
    /* mains: dual tyres under the inner nacelles, 36 ft 5 in behind the nose wheel */
    var dm = 1.45 + 11.1, mz = GROUND + 0.71;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * 4.24;
      for (o = -1; o <= 1; o += 2) wheel(0.71, 0.43, X(dm), yc + o * 0.47, mz);
      gear.add(taper(THREE, T.metal, [X(dm), yc - 0.47, mz], [X(dm), yc + 0.47, mz], 0.07, 0.07, 6));
      gear.add(taper(THREE, T.metal, [X(dm), yc, wz(4.24) - 0.8], [X(dm), yc, mz + 0.05], 0.15, 0.12, 8));
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

  function build(THREE, M, C) {
    if (!SEC) SEC = resampleD(FUS, 46);
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addFuselage(THREE, g, T);
    addCockpit(THREE, g, T);
    addTail(THREE, g, T);
    addWings(THREE, g, T);
    addEngines(THREE, g, T);
    addBoom(THREE, g, T);
    addGear(THREE, g, T);
    return mergeByMaterial(THREE, g);
  }
  return { build: build };
})();

/* len: the measured X extent, nose to the end of the boom */
UNIT_MODELS["nato_e50_tanker"] = {
  len: 33.63,
  build: function (THREE, M, C) { return HeroKC97G.build(THREE, M, C); }
};
