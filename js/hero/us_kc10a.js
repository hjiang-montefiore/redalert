/* ================= us_kc10a.js  -  HERO MODEL =================
   McDonnell Douglas KC-10A Extender (nato_e80_tanker, e80, service 1981).
   Until now the row borrowed the KC-46 model of js/hero/us_tankers.js, a twin;
   the Extender is the DC-10-30 airframe: a wide body, two CF6 turbofans slung
   far forward of the wing and the third in the tail, standing on the base of
   the fin at the end of a long duct.

   References (Wikimedia Commons, each fetched once):
     - "McDonnell Douglas DC-10-30 v1.0.png": the dimensioned three-view (side,
       top, front; 55.50 m, 50.40 m, 17.70 m). The fuselage depth and width
       (6.0 m), nose gear station (d 9.0), main gear station (d 31), the wing
       engine (lip d 20.6, 9 m off the centreline, 2.4 m above the ground),
       the tail engine (inlet d 44, 10 m long, its axis 9.7 m up), the fin
       (tip chord 3 m, leading edge swept about 40 deg) and the planform of the
       wing (leading edge d 22.2 at the body to d 38.9 at 25.2 m, the trailing
       edge kinked at 9.7 m) and of the tailplane were measured off it at
       11.35 px per metre and fitted to the published figures below.
     - "AN air-to-air left side view of a KC-10A Extender aircraft refueling an
       E-4A aircraft": a KC-10A of the 1980s in the original scheme - white
       upper fuselage and fin, the dark blue cheatline on the body from the
       nose, light grey wings and belly, the boom stowed under the rear body.
     - "EGUN - McDonnell Douglas KC-10A Extender - 87-0119" (front three-quarter
       and side views): the CF6 pods, the wing gear, the centreline gear, the
       swelling nose gear bay and the dark boom bay under the rear fuselage,
       the tail engine on the fin root. These are the later grey aeroplanes
       and serve only for the shape; the paint here is the 1980s one.
   Published: length 181 ft 7 in (55.35 m), span 165 ft 4.5 in (50.4 m), height
   58 ft 1 in (17.7 m), fuselage 6.0 m wide; wing leading edge about 35 deg.
   NOT confirmed by any reference I could read: the exact station and shape of
   the hose drogue unit (only its side is published: the starboard side of the
   rear fuselage; drawn as a small fairing there, beside the boom bay),
   the receptacle on the nose crown (a dark panel behind the flight deck) and
   the proportions of the boom's ruddevators.

   Parking: a 50 m wing cannot sit inside the airbase revetments; the row is
   already on the OVERSIZE list of tools/jsc/parked3d_check.js beside the other
   tanker rows, so nothing is added there.

   Model space: +X nose, +Y left, +Z up, real metres, the origin on the
   fuselage axis; stations d are metres aft of the nose. One mesh per material;
   the gear sits in a group named "gear" and the tyres are the lowest opaque
   thing. The team flash is exactly C.team: the fin tip and the wing tips.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKC10 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  function sgp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  var A = {
    NOSE: 27.6, GROUND: -5.30,
    /* d, half width, top, bottom, squareness. The body is 6.0 m wide and
       5.85 m deep, the nose drooping, the tail cone sweeping up under the
       tail engine. */
    FUS: [
      [0.00, 0.05, -0.30, -0.75, 1.0], [0.40, 1.00, 0.45, -1.35, 0.97],
      [1.00, 1.65, 1.15, -1.95, 0.95], [2.00, 2.30, 1.85, -2.45, 0.94],
      [3.50, 2.80, 2.50, -2.78, 0.93], [5.50, 2.98, 2.85, -2.90, 0.93],
      [8.00, 3.01, 2.92, -2.92, 0.93], [37.0, 3.01, 2.92, -2.92, 0.93],
      [39.0, 2.97, 2.92, -2.75, 0.93], [41.0, 2.85, 2.92, -2.30, 0.93],
      [44.0, 2.50, 2.90, -1.35, 0.93], [47.0, 1.95, 2.70, -0.40, 0.94],
      [50.0, 1.30, 2.35, 0.55, 0.95], [52.0, 0.70, 2.05, 1.05, 0.97],
      [53.2, 0.25, 1.85, 1.35, 1.0]
    ],
    WING: [
      [2.0, 21.0, 33.8], [3.0, 22.2, 33.9], [6.0, 24.65, 34.2], [9.7, 27.2, 34.5],
      [14.0, 30.4, 36.6], [19.0, 34.2, 39.1], [22.5, 36.8, 40.9], [23.2, 37.344, 41.263], [25.2, 38.9, 42.3]
    ],
    wz: function (y) { return -1.70 + 0.095 * (y - 3); },            /* 5.4 deg dihedral */
    wtc: function (y) { return 0.14 - 0.05 * Math.min(1, y / 25.2); },
    camber: 0.012, yTeam: 23.1,
    STAB: [[1.0, 47.4, 53.0], [2.2, 47.9, 53.2], [6.0, 51.0, 54.6], [11.0, 54.0, 55.35]],
    sz: function (y) { return 1.30 + 0.04 * y; },
    stc: function (y) { return 0.095 - 0.025 * Math.min(1, y / 11); },
    /* fin rows: height z, leading edge d, trailing edge d, thickness ratio */
    FIN: [[4.6, 45.8, 55.0, 0.12], [7.0, 47.4, 55.1, 0.11], [9.5, 49.6, 55.2, 0.10],
          [10.7, 50.656, 55.248, 0.0952], [12.0, 51.8, 55.3, 0.09], [12.40, 52.4, 55.35, 0.085]],
    finTeam: 10.65,
    nose: { d: 9.0, R: 0.45, W: 0.28, tr: 0.28 },
    wingGear: { y: 5.35, ax: [30.2, 31.8], R: 0.56, W: 0.42, du: 0.34 },
    bodyGear: { ax: [32.9, 34.5], R: 0.56, W: 0.42, du: 0.34 }
  };
  A.SEC = null;
  function X(d) { return A.NOSE - d; }

  /* 1980s scheme off the photograph: white upper body and fin, the grey belly
     and wings, the dark blue cheatline. The sheets carry the mottle and seams. */
  var SHEETS = {
    top: { base: "#cfd3d6", spots: [["#c4c9cc", 20, 8, 22], ["#d8dcde", 18, 8, 20]], seam: 0.14, seed: 411 },
    low: { base: "#a3a9ad", spots: [["#989ea3", 22, 8, 22], ["#adb3b7", 20, 8, 20]], seam: 0.18, seed: 412 }
  };
  var VLOW = -0.28;          /* the ring angle (sine) below which the hull is grey */

  var _sheets = {};
  function blob(g, cx, cy, r, R, S) {
    var n = 12, pts = [], i, ox, oy;
    for (i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2, rr = r * (0.7 + 0.5 * R());
      pts.push([Math.cos(a) * rr * 1.4, Math.sin(a) * rr]);
    }
    for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
      if (cx + ox + 2 * r < 0 || cx + ox - 2 * r > S || cy + oy + 2 * r < 0 || cy + oy - 2 * r > S) continue;
      g.beginPath();
      g.moveTo(cx + ox + pts[0][0], cy + oy + pts[0][1]);
      for (i = 1; i < n; i++) g.lineTo(cx + ox + pts[i][0], cy + oy + pts[i][1]);
      g.closePath(); g.fill();
    }
  }
  function sheet(THREE, key, P) {
    if (_sheets[key] !== undefined) return _sheets[key];
    var tex = null;
    try {
      var S = 512, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), R = rngFor(P.seed), i, k;
      g.fillStyle = P.base; g.fillRect(0, 0, S, S);
      for (i = 0; i < P.spots.length; i++) {
        g.fillStyle = P.spots[i][0];
        for (k = 0; k < P.spots[i][1]; k++)
          blob(g, R() * S, R() * S, P.spots[i][2] + (P.spots[i][3] - P.spots[i][2]) * R(), R, S);
      }
      /* panel seams: across the airframe every 1.5 m, along it every 3 m */
      g.strokeStyle = "rgba(0,0,0," + P.seam + ")"; g.lineWidth = 1;
      for (i = 0; i < S; i += 19) { g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, S); g.stroke(); }
      for (i = 0; i < S; i += 38) { g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(S, i + 0.5); g.stroke(); }
      tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 4;
    } catch (e) { tex = null; }
    _sheets[key] = tex;
    return tex;
  }

  /* ========================================================== materials ==
     Three tiers. SKIN: the two coats and the team flash. METAL: fittings,
     gear, nozzles; the tyres. GLASS. Untextured values are dark on purpose:
     this three.js lifts a flat hex two to three stops on screen. */
  function geoFrom(THREE, pos, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    return g;
  }
  /* Rings of equal length bridged in order, closed around, capped if asked.
     outward() then turns the whole part the right way out. */
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
  /* signed volume about the part's own centroid; a negative one is a part
     built inside out, and every triangle is turned */
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
  /* A finished skin part: its triangles shared out between the coats, the
     team flash and the exhaust by rule(centroid, face normal). */
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
                          (p[a + 2] + p[b + 2] + p[c + 2]) / 3, nx / l, ny / l, nz / l) : "top";
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
  /* section ring: superellipse, its widest line at zw, N points CCW seen from
     ahead, starting on the port side */
  function secRing(x, yc, w, zt, zb, zw, e, N) {
    var r = [], j;
    for (j = 0; j < N; j++) {
      var t = j / N * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
      var z = s >= 0 ? zw + (zt - zw) * sgp(s, e) : zw + (zw - zb) * sgp(s, e);
      r.push([x, yc + w * sgp(c, e), z]);
    }
    return r;
  }
  /* body of revolution along -X: prof rows [aft of the front, radius] */
  function lathe(THREE, prof, N, x0, yc, zc, capA, capB) {
    var rings = [], i;
    for (i = 0; i < prof.length; i++) {
      var w = Math.max(prof[i][1], 0.004);
      rings.push(secRing(x0 - prof[i][0], yc, w, zc + w, zc - w, zc, 1, N));
    }
    return gridGeo(THREE, rings, capA, capB);
  }
  /* convex outline in X-Z, extruded +-t about y0 */
  function plate(THREE, ol, y0, t) {
    var n = ol.length, pos = [], idx = [], i;
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 + t, ol[i][1]);
    for (i = 0; i < n; i++) pos.push(ol[i][0], y0 - t, ol[i][1]);
    for (i = 1; i < n - 1; i++) { idx.push(0, i, i + 1); idx.push(n, n + i + 1, n + i); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; idx.push(i, n + i, j, j, n + i, n + j); }
    return geoFrom(THREE, pos, idx);
  }
  /* a tapered tube from a to b */
  function taper(THREE, mat, a, b, r0, r1, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, L, seg || 8, 1), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
    return m;
  }
  function box(THREE, mat, sx, sy, sz, px, py, pz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(px, py, pz);
    return m;
  }
  /* an ellipsoid baked in place, poles fore and aft */
  function egg(THREE, mat, rx, ry, rz, x, y, z, ws, hs) {
    var geo = new THREE.SphereGeometry(1, ws || 12, hs || 8);
    geo.rotateZ(Math.PI / 2);
    geo.scale(rx, ry, rz);
    geo.translate(x, y, z);
    planarUV(THREE, geo);
    return new THREE.Mesh(geo, mat);
  }
  /* a flat disc facing along X (intake faces, nozzles) */
  function disc(THREE, mat, r, x, y, z, n) {
    var m = new THREE.Mesh(new THREE.CircleGeometry(r, n || 14), mat);
    m.rotation.y = Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }
  /* NACA 4-digit section, ring from the trailing edge over the top to the
     nose and back under; x along the chord from the leading edge, y across */
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
  function resample(tab, n) {
    var m = tab.length, cols = tab[0].length, out = [], i, c;
    for (i = 0; i < n; i++) {
      var u = i / (n - 1) * (m - 1), k = Math.min(m - 2, Math.floor(u)), t = u - k, row = [];
      for (c = 0; c < cols; c++)
        row.push(cr1(tab[Math.max(0, k - 1)][c], tab[k][c], tab[k + 1][c], tab[Math.min(m - 1, k + 2)][c], t));
      out.push(row);
    }
    return out;
  }
  /* The body table is resampled so the loft is smooth, but the rows' d values
     are not evenly spaced: a Catmull-Rom spline in the row index would bunch
     the stations where the table is dense. So resample by d instead. */
  function resampleD(tab, n) {
    var d0 = tab[0][0], d1 = tab[tab.length - 1][0], out = [], i, j, c;
    for (i = 0; i < n; i++) {
      var d = d0 + (d1 - d0) * i / (n - 1), k = 0;
      for (j = 1; j < tab.length - 1; j++) if (tab[j][0] <= d) k = j;
      var a = tab[k], b = tab[k + 1], t = (d - a[0]) / Math.max(1e-6, b[0] - a[0]);
      var p0 = tab[Math.max(0, k - 1)], p3 = tab[Math.min(tab.length - 1, k + 2)], row = [d];
      for (c = 1; c < a.length; c++) row.push(cr1(p0[c], a[c], b[c], p3[c], t));
      out.push(row);
    }
    return out;
  }
  function zwOf(zt, zb) { return zb + 0.52 * (zt - zb); }
  function secAt(d, tab) {
    tab = tab || A.SEC;
    if (d <= tab[0][0]) return tab[0];
    for (var i = 1; i < tab.length; i++) {
      if (tab[i][0] >= d) {
        var a = tab[i - 1], b = tab[i], t = (d - a[0]) / Math.max(1e-6, b[0] - a[0]), r = [], c;
        for (c = 0; c < a.length; c++) r.push(a[c] + (b[c] - a[c]) * t);
        return r;
      }
    }
    return tab[tab.length - 1];
  }
  /* the wing at span station y: leading and trailing edge, mean plane, thickness */
  function wingAt(y) {
    var W = A.WING, i, a, b, t;
    y = Math.abs(y);
    if (y <= W[0][0]) return { dLE: W[0][1], dTE: W[0][2], zm: A.wz(y), tc: A.wtc(y) };
    for (i = 1; i < W.length; i++) {
      if (W[i][0] >= y) {
        a = W[i - 1]; b = W[i]; t = (y - a[0]) / (b[0] - a[0]);
        return { dLE: a[1] + (b[1] - a[1]) * t, dTE: a[2] + (b[2] - a[2]) * t, zm: A.wz(y), tc: A.wtc(y) };
      }
    }
    b = W[W.length - 1];
    return { dLE: b[1], dTE: b[2], zm: A.wz(y), tc: A.wtc(y) };
  }
  /* height of the upper or lower wing skin at span y, d aft of the nose */
  function wingZ(y, d, upper) {
    var w = wingAt(y), c = w.dTE - w.dLE, x = Math.min(1, Math.max(0, (d - w.dLE) / c));
    return w.zm + (A.camber * 4 * x * (1 - x) + (upper ? 1 : -1) * naca(x, w.tc)) * c;
  }

  /* ========================================================== fuselage ==
     The coats part along one line of the hull, the ring angle nearest V.low
     (judged by height the two triangles of a quad fell on either side
     wherever the section changes, and the edge came out saw-toothed). */
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

  /* ========================================================== materials ==
     SKIN: the two coats, the cheatline and the team flash. METAL: fittings and
     gear, nozzles; the tyres. GLASS. */
  function materials(THREE, C) {
    function coat(which) {
      var t = sheet(THREE, "kc10/" + which, SHEETS[which]);
      var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08, side: THREE.DoubleSide });
      if (t) m.map = t; else m.color.set(SHEETS[which].base);
      return m;
    }
    return {
      top: coat("top"),
      low: coat("low"),
      navy: new THREE.MeshStandardMaterial({ color: 0x0b1a33, roughness: 0.80, metalness: 0.06, side: THREE.DoubleSide }),
      /* exactly C.team, so eraPaint's team test leaves it alone */
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
        roughness: 0.82, metalness: 0.06, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x474d52, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide }),
      hot: new THREE.MeshStandardMaterial({ color: 0x191a1a, roughness: 0.65, metalness: 0.36, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95, metalness: 0.04 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.83, side: THREE.DoubleSide })
    };
  }

  /* ========================================================== fuselage ==
     The coats part along one line of the hull, the ring angle nearest VLOW. */
  var NF = 28;
  function addFuselage(THREE, g, T) {
    var rows = A.SEC;
    var rings = rows.map(function (s) { return secRing(X(s[0]), 0, s[1], s[2], s[3], zwOf(s[2], s[3]), s[4], NF); });
    var tq = 2 * Math.PI / NF, td = Math.asin(VLOW);
    var sd = Math.sin(Math.round(td / tq) * tq);
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      var s = secAt(A.NOSE - cx, rows), zw = zwOf(s[2], s[3]), e = s[4];
      var u = Math.max(-1, Math.min(1, cy / Math.max(0.01, s[1])));
      var v = Math.max(-1, Math.min(1, (cz - zw) / Math.max(0.01, cz >= zw ? s[2] - zw : zw - s[3])));
      return Math.sin(Math.atan2(sgp(v, 1 / e), sgp(u, 1 / e))) < sd - 1e-6 ? "low" : "top";
    });
  }
  function hullPatch(THREE, d0, d1, t0, t1, nd, nt) {
    var pos = [], idx = [], i, j;
    for (i = 0; i <= nd; i++) {
      var d = d0 + (d1 - d0) * i / nd, s = secAt(d), zw = zwOf(s[2], s[3]);
      for (j = 0; j <= nt; j++) {
        var t = (t0 + (t1 - t0) * j / nt) * D2R, c = Math.cos(t), sn = Math.sin(t), e = s[4];
        var z = sn >= 0 ? zw + (s[2] - zw) * sgp(sn, e) : zw + (zw - s[3]) * sgp(sn, e);
        pos.push(X(d), s[1] * sgp(c, e) * 1.012, zw + (z - zw) * 1.012 + 0.008);
      }
    }
    for (i = 0; i < nd; i++) for (j = 0; j < nt; j++) {
      var a = i * (nt + 1) + j, b = a + 1, cc = a + nt + 1, dd = cc + 1;
      idx.push(a, cc, b, b, cc, dd);
    }
    var g = geoFrom(THREE, pos, idx);
    g.computeVertexNormals();
    return g;
  }
  function addCockpit(THREE, g, T) {
    /* the flight deck: a windscreen across the nose and a side window each side */
    g.add(new THREE.Mesh(hullPatch(THREE, 1.9, 2.95, 40, 140, 3, 8), T.glass));
    g.add(new THREE.Mesh(hullPatch(THREE, 3.0, 3.8, 26, 44, 2, 2), T.glass));
    g.add(new THREE.Mesh(hullPatch(THREE, 3.0, 3.8, 136, 154, 2, 2), T.glass));
    /* the receptacle's slipway, a dark panel on the crown behind the deck */
    g.add(new THREE.Mesh(hullPatch(THREE, 6.0, 8.4, 85, 95, 3, 1), T.ink));
    /* the cheatline, a band along each side from the nose back past the wing */
    g.add(new THREE.Mesh(hullPatch(THREE, 3.9, 41.0, 7, 12, 14, 1), T.navy));
    g.add(new THREE.Mesh(hullPatch(THREE, 3.9, 41.0, 168, 173, 14, 1), T.navy));
  }

  /* ============================================================== tail == */
  function addTail(THREE, g, T) {
    var NFOIL = 9, rings = [], s;
    A.FIN.forEach(function (f) {
      var c = f[2] - f[1];
      rings.push(foil(NFOIL, f[3], 0).map(function (p) { return [X(f[1] + p[0] * c), p[1] * c, f[0]]; }));
    });
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      return cz > A.finTeam ? "team" : "top";
    });
    for (s = -1; s <= 1; s += 2) {
      var sr = A.STAB.map(function (st) {
        var y = st[0], c = st[2] - st[1], zm = A.sz(y), tc = A.stc(y);
        return foil(NFOIL, tc, 0).map(function (p) { return [X(st[1] + p[0] * c), s * y, zm + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, sr, true, true), T, function () { return "low"; });
    }
  }

  /* ============================================================= wings == */
  function addWings(THREE, g, T) {
    for (var s = -1; s <= 1; s += 2) {
      var rings = A.WING.map(function (st) {
        var y = st[0], c = st[2] - st[1], zm = A.wz(y), tc = A.wtc(y);
        return foil(11, tc, A.camber).map(function (p) { return [X(st[1] + p[0] * c), s * y, zm + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz, nx, ny, nz) {
        if (nz < 0) return "low";
        return Math.abs(cy) > A.yTeam ? "team" : "low";
      });
    }
  }

  /* =========================================================== engines ==
     CF6-50: a fan cowl 2.6 m across, a step where the fan air leaves and the
     core cowl behind it. The tail engine has the same fan on a long duct,
     tapering to its tailpipe. [aft of the lip, radius] */
  var CF6 = [[0.40, 1.08], [0.0, 1.17], [0.20, 1.26], [0.8, 1.30], [2.3, 1.30], [2.9, 1.20], [3.1, 0.86],
             [4.2, 0.68], [5.2, 0.56], [5.9, 0.44]];
  var TAILENG = [[0.40, 1.15], [0.0, 1.25], [0.25, 1.38], [1.0, 1.42], [3.2, 1.42], [5.2, 1.40], [7.3, 1.28],
                 [8.8, 1.05], [10.0, 0.80], [10.3, 0.72]];
  function engRule(cx, cy, cz, nx, ny, nz) {
    return nx < -0.75 ? "hot" : (nz < -0.15 ? "low" : "top");
  }
  function pod(THREE, g, T, prof, yc, zc, dF, spin) {
    var L = prof[prof.length - 1][0], R0 = prof[0][1];
    emit(THREE, g, lathe(THREE, prof, 18, X(dF), yc, zc, false, true), T, engRule);
    g.add(disc(THREE, T.ink, R0 + 0.01, X(dF + prof[0][0]), yc, zc, 18));
    g.add(disc(THREE, T.hot, prof[prof.length - 1][1] + 0.02, X(dF + L + 0.01), yc, zc, 12));
    if (spin) {
      var sp = outward(lathe(THREE, [[0, 0.02], [0.22, 0.17], [0.46, 0.27]], 8, X(dF + prof[0][0] - 0.46), yc, zc, false, true));
      sp.computeVertexNormals();
      g.add(new THREE.Mesh(sp, T.metal));
    }
  }
  function addEngines(THREE, g, T) {
    var yc = 8.8, zc = -2.90, dF = 20.6, s;
    for (s = -1; s <= 1; s += 2) {
      pod(THREE, g, T, CF6, s * yc, zc, dF, true);
      /* the long pylon from the top of the pod up to the wing's leading edge */
      var w = wingAt(yc), dT1 = w.dLE + 0.1, dT2 = w.dLE + 3.6;
      var zT1 = wingZ(yc, dT1, false) + 0.05, zT2 = wingZ(yc, dT2, false) + 0.05;
      emit(THREE, g, plate(THREE, [[X(dF + 1.6), zc + 1.15], [X(dF + 4.4), zc + 1.2], [X(dT2), zT2], [X(dT1), zT1]], s * yc, 0.17), T, engRule);
    }
    /* the tail engine: its axis 9.7 m above the ground, on the root of the fin;
       a short pylon joins it to the crown of the body */
    pod(THREE, g, T, TAILENG, 0, 4.40, 44.0, true);
    emit(THREE, g, plate(THREE, [[X(47.0), 3.1], [X(51.5), 3.1], [X(51.5), 2.2], [X(47.0), 2.6]], 0, 0.30), T, engRule);
  }

  /* =============================================================== boom ==
     The flying boom stowed under the tail: the operator's bay as a fairing on
     the belly, the tube trailing aft along the upsweep of the tail cone and the
     two ruddevators near its end, a V open upward. The hose drogue unit is a
     smaller pod on the centreline ahead of the bay. */
  function addBoom(THREE, g, T) {
    g.add(egg(THREE, T.low, 3.4, 0.72, 0.52, X(41.0), 0, -2.55, 14, 8));
    /* the hose drogue unit: a small fairing on the starboard (-Y) side of the lower
       rear fuselage, beside the boom bay (Wikipedia: "on the starboard side of the
       rear fuselage"; not seen in any photograph I could read) */
    g.add(egg(THREE, T.low, 1.5, 0.36, 0.30, X(42.4), -1.45, -1.95, 10, 6));
    g.add(taper(THREE, T.low, [X(41.0), 0, -2.70], [X(53.4), 0, -0.05], 0.20, 0.12, 10));
    g.add(disc(THREE, T.hot, 0.13, X(53.41), 0, -0.05, 10));
    for (var s = -1; s <= 1; s += 2) {
      var rd = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.4, 0.06), T.low);
      rd.position.set(X(52.2), s * 0.55, -0.20);
      rd.rotation.x = s * 42 * D2R;
      g.add(rd);
    }
  }

  /* ============================================================== gear ==
     Named "gear". Nose: twin tyres. Mains: a four-wheel truck under each wing
     and a four-wheel bogie on the centreline, aft of them. */
  function tyreSet(THREE, gear, T, x, y, z, R, W) {
    var t = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 14, 1), T.tyre);
    t.position.set(x, y, z);
    t.rotation.x = 0;
    gear.add(t);
    var h = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.55, R * 0.55, W + 0.03, 10, 1), T.metal);
    h.position.set(x, y, z);
    gear.add(h);
  }
  function truck(THREE, gear, T, G, yc, topZ) {
    var mz = A.GROUND + G.R, i, o, dmid = (G.ax[0] + G.ax[G.ax.length - 1]) / 2;
    for (i = 0; i < G.ax.length; i++) {
      for (o = -1; o <= 1; o += 2) tyreSet(THREE, gear, T, X(G.ax[i]), yc + o * G.du, mz, G.R, G.W);
      gear.add(taper(THREE, T.metal, [X(G.ax[i]), yc - G.du, mz], [X(G.ax[i]), yc + G.du, mz], 0.06, 0.06, 6));
    }
    gear.add(taper(THREE, T.metal, [X(G.ax[0]), yc, mz + 0.05], [X(G.ax[G.ax.length - 1]), yc, mz + 0.05], 0.09, 0.09, 6));
    gear.add(taper(THREE, T.metal, [X(dmid), yc, topZ], [X(dmid), yc, mz + 0.05], 0.15, 0.11, 8));
  }
  function addGear(THREE, g, T) {
    var gear = new THREE.Group(), nd = A.nose, nz = A.GROUND + nd.R, s;
    gear.name = "gear";
    for (s = -1; s <= 1; s += 2) tyreSet(THREE, gear, T, X(nd.d), s * nd.tr, nz, nd.R, nd.W);
    gear.add(taper(THREE, T.metal, [X(nd.d - 0.1), 0, secAt(nd.d)[3] + 0.2], [X(nd.d), 0, nz], 0.11, 0.09, 8));
    gear.add(taper(THREE, T.metal, [X(nd.d), -nd.tr, nz], [X(nd.d), nd.tr, nz], 0.05, 0.05, 6));
    gear.add(new THREE.Mesh(hullPatch(THREE, nd.d - 0.9, nd.d + 0.9, -122, -58, 2, 3), T.ink));
    var W = A.wingGear;
    for (s = -1; s <= 1; s += 2)
      truck(THREE, gear, T, W, s * W.y, wingZ(W.y, (W.ax[0] + W.ax[1]) / 2, false) + 0.1);
    truck(THREE, gear, T, A.bodyGear, 0, secAt(33.7)[3] + 0.15);
    gear.add(new THREE.Mesh(hullPatch(THREE, 32.0, 35.4, -110, -70, 3, 3), T.ink));
    g.add(gear);
  }

  /* ============================================================= build == */
  function build(THREE, M, C) {
    if (!A.SEC) A.SEC = resampleD(A.FUS, 48);
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

/* len: the measured X extent, nose to the tailplane tips */
UNIT_MODELS["nato_e80_tanker"] = {
  len: 55.35,
  build: function (THREE, M, C) { return HeroKC10.build(THREE, M, C); }
};
