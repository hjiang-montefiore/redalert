/* ================= us_ec121.js  -  HERO MODEL =================
   Lockheed EC-121D Warning Star (Navy WV-2): the Super Constellation
   airliner airframe turned into the 1950s airborne radar picket.
   Key: nato_e50_awacs.

   Drawn from:
     - "Lockheed C-121C (L-1049) Super Constellation drawings.png" (Wikimedia
       Commons three-view): the long curved dolphin fuselage, the triple fin,
       the wing planform (root chord about 6.7 m, the leading edge swept back,
       the trailing edge forward), the nacelles standing 4.6 m and 9.3 m out
       with the propeller plane about 10.9 m aft of the nose, the nose gear at
       about 2.8 m and the main gear aft of the inner nacelle at about 16 m.
       Stations were scaled off the plan and side views against the length.
     - "Lockheed 1049A Super Constellation (EC-121T) ... by Don Ramey Logan.jpg"
       (Commons photograph): the black nose radome, the tip tanks, the
       four-blade propellers, the big ventral radome under the wing root, the
       tall main gear legs with the twin wheels.
     - the Wikipedia EC-121 article: the WV-2/EC-121D carried the AN/APS-45
       height-finder on the back and the AN/APS-20 search radar in the belly;
       specifications 35.40 m long, 38.45 m span, 7.54 m high, four Wright
       R-3350 turbo-compounds.
   NOT confirmed from a reference and so estimated: the size and exact
   position of the two radomes (the ventral one is about 6.6 m long, the
   dorsal one 5.2 m long and standing about 1.75 m above the fuselage), the
   tip-tank length, the end-fin height. The paint is the game's "white" camo
   for this row: gloss white over bare metal, black nose radome.

   Model space: +X nose, +Y port, +Z up, real metres; z = 0 is the fuselage
   axis, 3.7 m above the ground. Stations s are metres aft of the nose.
   Props are static blades under a see-through blur disc. Everything is baked
   into one mesh per material, the gear in a group of its own (the wheels are
   the lowest opaque part). The team material is exactly C.team (fin tips and
   tip-tank bands).
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEC121 = (function () {
  "use strict";

  var D2R = Math.PI / 180;
  var GZ = 3.7;                  /* the ground lies this far below the fuselage axis */
  var LEN = 35.4, HX = 17.7;
  var RP = 2.29;                 /* 15 ft propellers */
  function X(s) { return HX - s; }
  function sgp(v, e) { return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), e); }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  var _sheets = {};
  function sheet(THREE, key, base, seam, seed) {
    if (_sheets[key] !== undefined) return _sheets[key];
    var tex = null;
    try {
      var S = 256, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), R = rngFor(seed), i;
      g.fillStyle = base; g.fillRect(0, 0, S, S);
      for (i = 0; i < 60; i++) {
        g.fillStyle = "rgba(" + (R() < 0.5 ? "0,0,0" : "255,255,255") + "," + (0.03 + 0.04 * R()).toFixed(3) + ")";
        g.fillRect(R() * S, R() * S, 8 + 30 * R(), 4 + 10 * R());
      }
      g.strokeStyle = "rgba(0,0,0," + seam + ")"; g.lineWidth = 1;
      for (i = 0; i < S; i += 21) { g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, S); g.stroke(); }
      for (i = 0; i < S; i += 43) { g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(S, i + 0.5); g.stroke(); }
      tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 4;
    } catch (e) { tex = null; }
    _sheets[key] = tex;
    return tex;
  }

  function materials(THREE, C) {
    function coat(key, base, seam, seed, rough, met) {
      var t = sheet(THREE, key, base, seam, seed);
      var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: rough, metalness: met, side: THREE.DoubleSide });
      if (t) m.map = t; else m.color.set(base);
      return m;
    }
    return {
      top: coat("top", "#d4d8da", 0.12, 7101, 0.62, 0.08),
      low: coat("low", "#a9afb3", 0.18, 7102, 0.46, 0.38),
      /* exactly C.team, so eraPaint's team test leaves it alone */
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
        roughness: 0.82, metalness: 0.06, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x474d52, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({ color: 0x060708, roughness: 0.9, metalness: 0.03, side: THREE.DoubleSide }),
      blade: new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.62, metalness: 0.3, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95, metalness: 0.04 }),
      blur: new THREE.MeshStandardMaterial({ color: 0xd2d8dc, roughness: 0.5, metalness: 0.0,
        transparent: true, opacity: 0.11, depthWrite: false, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x27383f, roughness: 0.13, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.83, side: THREE.DoubleSide })
    };
  }

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
     team flash and the dark parts by rule(centroid, face normal). */
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
  /* body of revolution (or a rounded box, with w, h, e) along -X:
     prof rows [aft of the front, half width, half height] */
  function lathe(THREE, prof, N, x0, yc, zc, e, capA, capB) {
    var rings = [], i;
    for (i = 0; i < prof.length; i++) {
      var w = Math.max(prof[i][1], 0.004), h = Math.max(prof[i].length > 2 ? prof[i][2] : prof[i][1], 0.004);
      rings.push(secRing(x0 - prof[i][0], yc, w, zc + h, zc - h, zc, e || 1, N));
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
  function strut(THREE, mat, a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 8, 1), mat);
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
  /* a flat disc facing along X (the propeller blur, nozzles) */
  function disc(THREE, mat, r, x, y, z, n) {
    var m = new THREE.Mesh(new THREE.CircleGeometry(r, n || 14), mat);
    m.rotation.y = Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }
  /* NACA 4-digit section thickness and the ring from the trailing edge over the top */
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


  /* ===================================================== merge by material ==
     Each mesh costs a draw call, and one more for the shadow pass, per
     aircraft on screen: everything sharing a material becomes one geometry,
     the "gear" group kept a group of its own so the renderer can stow it.
     (The same merge as js/hero/us_b52_stratofortress.js.)                  */
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


  /* ============================================================ airframe == */
  /* fuselage stations: s, half width, top z, bottom z (z = 0 is the axis). Top and bottom lines were read off the
     side view of the three-view: the dolphin camber - nose and cockpit low, belly sweeping up to a high tail */
  var FUS = [
    [0.00, 0.04, -0.45, -0.85], [0.35, 0.50, -0.15, -1.15], [1.00, 1.00, 0.05, -1.40],
    [2.00, 1.45, 0.25, -1.62], [3.20, 1.72, 0.95, -1.75], [5.00, 1.78, 1.38, -1.82],
    [8.00, 1.78, 1.67, -1.85], [10.0, 1.78, 1.88, -1.95], [14.0, 1.78, 1.85, -1.95],
    [20.0, 1.76, 1.76, -2.00], [24.0, 1.70, 1.74, -1.90], [26.0, 1.62, 1.68, -1.74],
    [28.0, 1.45, 1.66, -1.53], [30.5, 1.20, 1.58, -1.20], [32.5, 0.85, 1.53, -0.80],
    [34.0, 0.50, 1.50, -0.40], [35.0, 0.20, 1.45, -0.18], [35.4, 0.06, 1.40, -0.10]
  ];
  function fusAt(s) {
    var i = 0;
    while (i < FUS.length - 2 && s > FUS[i + 1][0]) i++;
    var a = FUS[i], b = FUS[i + 1], t = (s - a[0]) / (b[0] - a[0]);
    t = Math.max(0, Math.min(1, t)); t = t * t * (3 - 2 * t);
    return [s, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t];
  }
  function addFuselage(THREE, g, T) {
    var rings = [], i, NS = 44;
    for (i = 0; i <= NS; i++) {
      var u = i / NS, s;
      /* denser at the nose and tail */
      s = LEN * (0.5 - 0.5 * Math.cos(u * Math.PI)) * 0.55 + LEN * u * 0.45;
      var f = fusAt(s);
      rings.push(secRing(X(s), 0, f[1], f[2], f[3], f[3] + 0.5 * (f[2] - f[3]), 0.88, 36));
    }
    emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
      var s = HX - cx;
      if (s < 0.95) return "ink";                                   /* the black nose radome */
      var fm = fusAt(s);                                            /* the white/metal line follows the camber */
      return cz > 0.5 * (fm[2] + fm[3]) - 0.37 - 0.12 * Math.min(1, Math.max(0, (s - 22) / 8)) ? "top" : "low";
    });
    /* flight-deck glazing */
    g.add(egg(THREE, T.glass, 0.75, 1.05, 0.38, X(2.4), 0, 0.62, 12, 8));
  }
  function wingZ(y) { return -0.85 + 0.052 * Math.abs(y); }
  function wingLE(y) { return 12.4 + 0.15 * Math.abs(y); }
  function wingTE(y) { return 19.1 - 0.10 * Math.abs(y); }
  function addWings(THREE, g, T) {
    var WY = [0.5, 3, 4.6, 6.5, 9.3, 12, 14.5, 16.5, 18.3], s;
    for (s = -1; s <= 1; s += 2) {
      var rings = WY.map(function (Y) {
        var c = wingTE(Y) - wingLE(Y), tc = 0.14 - 0.05 * Y / 18.3;
        return foil(12, tc, 0.01).map(function (p) { return [X(wingLE(Y) + p[0] * c), s * Y, wingZ(Y) + p[1] * c]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function () { return "low"; });
      /* tip tank: a long teardrop at the tip, a team band on its top */
      var yt = s * 18.62;
      emit(THREE, g, lathe(THREE, [[0, 0.03], [0.35, 0.34], [1.0, 0.55], [2.0, 0.62], [3.2, 0.60], [4.2, 0.40], [4.8, 0.05]],
        20, X(12.5), yt, 0.12, 1, true, true), T, function (cx, cy, cz) {
          var d = HX - cx;
          return (d > 14.0 && d < 15.2 && cz > 0.12 + 0.2) ? "team" : "low";
        });
    }
  }
  function addEngines(THREE, g, T) {
    var s, k, Y;
    [4.6, 9.3].forEach(function (Y) {
      var zc = Y < 6 ? -0.75 : -0.62;
      for (s = -1; s <= 1; s += 2) {
        var yc = s * Y, d0 = 10.7;
        emit(THREE, g, lathe(THREE, [[0, 0.80], [0.12, 0.90], [0.6, 0.94], [1.6, 0.94], [2.6, 0.90], [3.5, 0.80], [4.3, 0.62], [5.0, 0.38], [5.3, 0.10]],
          24, X(d0), yc, zc, 1, true, true), T, function (cx) { return (HX - cx) < d0 + 0.75 ? "metal" : "low"; });
        emit(THREE, g, lathe(THREE, [[0, 0.02], [0.2, 0.18], [0.55, 0.30], [0.9, 0.32]],
          14, X(d0 - 0.9), yc, zc, 1, true, false), T, function () { return "metal"; });
        for (k = 0; k < 4; k++) addBlade(THREE, g, T, X(d0 - 0.45), yc, zc, k * Math.PI / 2 + 0.4 + (s > 0 ? 0 : 0.2));
        g.add(disc(THREE, T.blur, RP, X(d0 - 0.45), yc, zc, 28));
      }
    });
  }
  function addBlade(THREE, g, T, x, yc, zc, a) {
    var RR = [0.34, 0.8, 1.3, 1.75, RP], pos = [], idx = [], k;
    var CH = [0.30, 0.38, 0.40, 0.34, 0.22];
    var PT = [50, 40, 32, 26, 20];
    var er = [Math.sin(a), Math.cos(a)], et = [Math.cos(a), -Math.sin(a)];
    for (k = 0; k < 5; k++) {
      var r = RR[k], hc = CH[k] / 2, pr = PT[k] * D2R;
      var by = yc + er[0] * r, bz = zc + er[1] * r;
      pos.push(x + hc * Math.sin(pr), by + et[0] * hc * Math.cos(pr), bz + et[1] * hc * Math.cos(pr));
      pos.push(x - hc * Math.sin(pr), by - et[0] * hc * Math.cos(pr), bz - et[1] * hc * Math.cos(pr));
    }
    for (k = 0; k < 4; k++) idx.push(2 * k, 2 * k + 1, 2 * k + 2, 2 * k + 1, 2 * k + 3, 2 * k + 2);
    var bg = geoFrom(THREE, pos, idx);
    bg.computeVertexNormals();
    g.add(new THREE.Mesh(bg, T.blade));
  }
  function addRadomes(THREE, g, T) {
    /* AN/APS-20 under the wing root, AN/APS-45 height-finder on the back */
    emit(THREE, g, lathe(THREE, [[0, 0.05, 0.05], [0.6, 0.95, 0.55], [1.6, 1.28, 0.78], [3.0, 1.32, 0.82], [4.6, 1.25, 0.78], [5.8, 0.85, 0.52], [6.6, 0.05, 0.05]],
      24, X(11.5), 0, -2.1, 0.95, true, true), T, function () { return "low"; });
    emit(THREE, g, lathe(THREE, [[0, 0.04, 0.04], [0.5, 0.40, 0.65], [1.3, 0.52, 1.05], [2.6, 0.54, 1.2], [3.9, 0.50, 1.0], [4.7, 0.34, 0.6], [5.2, 0.04, 0.05]],
      22, X(14.5), 0, 2.45, 0.95, true, true), T, function () { return "top"; });
  }
  function addTail(THREE, g, T) {
    var s, h;
    /* fins: sections stacked in height, the chord ring lying in the XY plane */
    function fin(y0, zb, zt, le0, le1, c0, c1, tc0, tc1, tipTeam) {
      var rings = [], n = 6, i;
      for (i = 0; i <= n; i++) {
        var f = i / n, le = le0 + (le1 - le0) * f, c = c0 + (c1 - c0) * f, tc = tc0 + (tc1 - tc0) * f, z = zb + (zt - zb) * f;
        rings.push(foil(10, tc, 0).map(function (p) { return [X(le + p[0] * c), y0 + p[1] * c, z]; }));
      }
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function (cx, cy, cz) {
        return (tipTeam && cz > zt - 0.62) ? "team" : "top";
      });
    }
    fin(0, 0.40, 3.84, 29.8, 32.9, 5.2, 1.9, 0.11, 0.08, true);
    for (s = -1; s <= 1; s += 2) {
      fin(s * 7.0, -0.55, 3.55, 31.0, 32.9, 3.5, 1.7, 0.10, 0.08, true);
      var rings = [0.4, 2.4, 4.6, 6.6].map(function (Y) {
        var le = 31.3 + 0.12 * Y, te = 35.0 - 0.10 * Y, tc = 0.11 - 0.015 * Y / 6.6;
        return foil(12, tc, 0).map(function (p) { return [X(le + p[0] * (te - le)), s * Y, 0.55 + p[1] * (te - le)]; });
      });
      emit(THREE, g, gridGeo(THREE, rings, true, true), T, function () { return "top"; });
    }
  }
  function addGear(THREE, g, T) {
    var gear = new THREE.Group();
    gear.name = "gear";
    var R = 0.72, W = 0.40, az = -GZ + R, s, d;
    for (s = -1; s <= 1; s += 2) {
      var xm = X(15.8), ym = s * 4.6;
      for (d = -1; d <= 1; d += 2) {
        var t = new THREE.Mesh(new THREE.CylinderGeometry(R, R, W, 18, 1), T.tyre);
        t.position.set(xm, ym + d * 0.24, az); t.rotation.x = Math.PI / 2;
        gear.add(t);
      }
      var h = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.5, R * 0.5, 0.92, 10, 1), T.metal);
      h.position.set(xm, ym, az); h.rotation.x = Math.PI / 2;
      gear.add(h);
      gear.add(strut(THREE, T.metal, [xm, ym, -1.5], [xm, ym, az], 0.11, 8));
    }
    var rn = 0.5, an = -GZ + rn, xn = X(2.9);
    for (d = -1; d <= 1; d += 2) {
      var tn = new THREE.Mesh(new THREE.CylinderGeometry(rn, rn, 0.32, 16, 1), T.tyre);
      tn.position.set(xn, d * 0.22, an); tn.rotation.x = Math.PI / 2;
      gear.add(tn);
    }
    var hn = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.8, 8, 1), T.metal);
    hn.position.set(xn, 0, an); hn.rotation.x = Math.PI / 2;
    gear.add(hn);
    gear.add(strut(THREE, T.metal, [xn - 0.1, 0, -1.6], [xn, 0, an], 0.09, 8));
    g.add(gear);
  }

  function build(THREE, M, C) {
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addFuselage(THREE, g, T);
    addWings(THREE, g, T);
    addEngines(THREE, g, T);
    addRadomes(THREE, g, T);
    addTail(THREE, g, T);
    addGear(THREE, g, T);
    return mergeByMaterial(THREE, g);
  }

  return { build: build, len: LEN };
})();

UNIT_MODELS["nato_e50_awacs"] = {
  len: HeroEC121.len,
  build: function (THREE, M, C) { return HeroEC121.build(THREE, M, C); }
};
