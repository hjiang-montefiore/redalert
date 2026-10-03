/* ============ us_f4_phantom.js - HERO model: McDonnell Douglas F-4 Phantom II ============
   Three rows, one airframe (checked against a three-view and photographs of the F-4B, F-4C and F-4G/E):
     nato_e60_cfighter F-4B of the Navy (1961 on): the F-4C's short nose, light gull grey over white, white fin, wing-fold hinge,
                       thinner main tyres without the C's wing bulges, four AIM-7 and the centreline tank (photographs show no other
                       store; AIM-9 and wing tanks left off as unconfirmed). Launch bar, slats, hook and pitot are not drawn.
     nato_e60_fighter  F-4C of the USAF (1963 on): the short nose of the F-4B/C/D
                       (58 ft 3 in, 17.76 m), no gun, southeast-Asia camouflage
                       (tan, two greens over light grey, from 1966-67), four
                       AIM-7 Sparrow in the belly recesses, a pair of AIM-9 on each
                       outer pylon, the 600 US gal centreline tank and a 370 US gal
                       tank on each inboard pylon. The row is the USAF F-4C, so the
                       model is NOT carrier capable and has no catapult bar shown.
     nato_e80_sead     F-4G Advanced Wild Weasel (1978 on): the F-4E airframe, 63 ft
                       (19.2 m) with the longer radome, the gun replaced by the
                       APR-47 / APR-38 fairing under the nose, an extra antenna cap on
                       the fin, European I camouflage (FS 34092 / 34102 / 36081 - the
                       scheme the A-10 hero in this repo uses for the same decade),
                       an AGM-88 HARM on each inboard pylon, the centreline tank and
                       a pair of AIM-7 in the aft belly recesses.
   Published figures: span 11.71 m (38 ft 4.75 in), height 5.02 m (16 ft 5 in),
   wing area 49.2 m2, two GE J79; length 19.2 m (F-4E/G) and 17.76 m (F-4B/C/D).
   The geometry follows the known layout of the type: wing with a flat inner
   panel and outer panels with 12 deg of dihedral, stabilators with 23 deg of
   anhedral set low at the tail, tall fin with the rudder raked, two side
   intakes behind the cockpit with their boundary-layer splitter plates, tandem
   canopy, two J79 nozzles protruding past the stabilators.
   Not confirmed from a drawing and so only approximate: the wheel track and
   wheelbase, the exact pylon stations, the extent of the camouflage pattern.
   Not drawn: leading-edge slats and flaps, the pitot boom (it would set the
   renderer's scale), the refuelling receptacle, the arrestor hook.
   ================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroF4 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -2.05;                       /* tyre bottoms; fin tip 2.97 -> 5.02 m */

  /* paint canvas: four bands stacked - top, port side, starboard side, belly */
  var PXM = 40, XMIN = -10.2, TW = 820, YMAX = 6.2, ZTOP = 3.1, ZSPAN = 5.2;
  var TOPH = 500, SIDEH = 208, TH = TOPH + 2 * SIDEH + TOPH;
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }

  var SCHEMES = {
    /* SEA camouflage: FS 30219 tan, 34102 green, 34079 dark green over 36622 grey */
    sea: { name: "sea", seed: 40403, base: "#8b7a52", blot: ["#47573a", "#2f4130"], belly: "#a9afb0",
           nTop: 40, nSide: 16, nBelly: 0, flat: 0x8b7a52 },
    /* European I: 34092 / 34102 / 36081, wrap-around */
    /* Navy light gull grey (FS 36440) over white (17875), the F-4B of 1961-1970s fleet squadrons */
    gull: { name: "gull", seed: 40405, base: "#b9bdbc", blot: ["#aeb2b1", "#c4c7c5"], belly: "#e6e6e1",
            nTop: 10, nSide: 6, nBelly: 0, flat: 0xb9bdbc },
    euro1: { name: "euro1", seed: 40404, base: "#56603c", blot: ["#333f2f", "#47494a"], belly: null,
             nTop: 46, nSide: 20, nBelly: 34, flat: 0x56603c }
  };

  function paint(S) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = S.seed, i, j, b, x, y;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    g.fillStyle = S.base; g.fillRect(0, 0, TW, TH);
    if (S.belly) { g.fillStyle = S.belly; g.fillRect(0, bandY[3], TW, TOPH); }
    for (b = 0; b < 4; b++) {
      var n = b === 0 ? S.nTop : b === 3 ? S.nBelly : S.nSide;
      var flat = (b === 0 || b === 3) ? 1 : 0.42;
      for (i = 0; i < n; i++) {
        g.fillStyle = S.blot[i % S.blot.length];
        var cx = R() * TW, cy = bandY[b] + R() * bandH[b];
        for (j = 0; j < 4; j++) {
          g.beginPath();
          g.ellipse(cx + (R() - 0.5) * 80, cy + (R() - 0.5) * 80 * flat,
                    24 + R() * 50, (14 + R() * 32) * flat, R() * 3.14, 0, 6.283);
          g.fill();
        }
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.15)"; g.lineWidth = 1;
    for (b = 0; b < 4; b++) {
      x = 0;
      while (x < TW) { x += 26 + R() * 56; g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke(); }
      y = bandY[b];
      while (y < bandY[b] + bandH[b]) { y += 22 + R() * 50; g.beginPath(); g.moveTo(0, y); g.lineTo(TW, y); g.stroke(); }
    }
    /* exhaust soot behind the J79 nozzles, on top and under the tail */
    for (j = 0; j < 4; j += 3) for (i = -1; i <= 1; i += 2) {
      var gr = g.createLinearGradient(pxX(-6.0), 0, pxX(-9.4), 0);
      gr.addColorStop(0, "rgba(22,20,18,0.35)"); gr.addColorStop(1, "rgba(22,20,18,0.12)");
      g.fillStyle = gr;
      g.fillRect(pxX(-9.4), bandY[j] + (YMAX - i * 0.6) * PXM - 0.5 * PXM, pxX(-6.0) - pxX(-9.4), PXM);
    }
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(24,22,20," + (0.03 + R() * 0.08).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 60, 2 + R() * 9);
    }
    return cv;
  }
  var _tex = {};
  function skinTexture(S) {
    if (_tex[S.name] !== undefined) return _tex[S.name];
    var t = false;
    try {
      t = new V.CanvasTexture(paint(S));
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex[S.name] = t;
    return t;
  }
  /* face-normal projection into the four bands (same layout as the A-10 hero) */
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (band === 0) { U = pxX(x); W = clamp((YMAX - y) * PXM, 2, TOPH - 2); }
        else if (band === 3) { U = pxX(x); W = TOPH + 2 * SIDEH + clamp((YMAX - y) * PXM, 2, TOPH - 2); }
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

  function makeMats(C, S) {
    var tex = skinTexture(S), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(S.flat);
    m.belly = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.belly.map = tex; else m.belly.color.setHex(0xa9afb0);
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x1d2e33, roughness: 0.10, metalness: 0.35 });
    m.white = new V.MeshStandardMaterial({ color: 0xe4e4df, roughness: 0.80, metalness: 0.06 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xb4babd, roughness: 0.55, metalness: 0.15 });
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
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
  function box(sx, sy, sz, x, y, z, rx, ry, rz) { return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz); }
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2); else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
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
  function mesh(parent, list, mat, name) {
    if (!list.length) return null;
    var m = new V.Mesh(merge(list), mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  /* the skin list becomes two meshes: upward and side faces (camouflage) and
     the faces looking down (belly colour); a single material when there is no split */
  function skinMeshes(parent, list, T, name, splitBelly) {
    var geo = projUV(merge(list));
    if (!splitBelly) { var m0 = new V.Mesh(geo, T.skin); m0.name = name; parent.add(m0); return; }
    var p = geo.attributes.position.array, n = geo.attributes.normal.array, u = geo.attributes.uv.array;
    var a = { p: [], n: [], u: [] }, b = { p: [], n: [], u: [] }, t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nz = ux * vy - uy * vx, nl = Math.sqrt(Math.pow(uy * vz - uz * vy, 2) + Math.pow(uz * vx - ux * vz, 2) + nz * nz) || 1;
      var D = (nz / nl < -0.5) ? b : a;
      for (k = 0; k < 9; k++) { D.p.push(p[t + k]); D.n.push(n[t + k]); }
      for (k = 0; k < 6; k++) D.u.push(u[t / 3 * 2 + k]);
    }
    function mk(D, mat, nm) {
      if (!D.p.length) return;
      var gg = new V.BufferGeometry();
      gg.setAttribute("position", new V.Float32BufferAttribute(D.p, 3));
      gg.setAttribute("normal", new V.Float32BufferAttribute(D.n, 3));
      gg.setAttribute("uv", new V.Float32BufferAttribute(D.u, 2));
      var m = new V.Mesh(gg, mat); m.name = nm; parent.add(m);
    }
    mk(a, T.skin, name); mk(b, T.belly, name + "_belly");
  }

  /* ---- solids from rings. rings[i] is an array of [x,y,z] with the same
     count; each quad is wound to face away from the centre of its ring. */
  function ctr(r) {
    var c = [0, 0, 0], i;
    for (i = 0; i < r.length; i++) { c[0] += r[i][0]; c[1] += r[i][1]; c[2] += r[i][2]; }
    return [c[0] / r.length, c[1] / r.length, c[2] / r.length];
  }
  function sol(rings, capA, capB) {
    var pos = [], idx = [], n = rings[0].length, i, j, base = 0;
    function addRing(r) { for (var q = 0; q < r.length; q++) pos.push(r[q][0], r[q][1], r[q][2]); }
    for (i = 0; i < rings.length; i++) addRing(rings[i]);
    function nrm(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      return [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
    }
    /* one fixed winding for the whole solid, flipped as a whole when its signed volume is negative */
    for (i = 0; i < rings.length - 1; i++) {
      for (j = 0; j < n; j++) {
        var j1 = (j + 1) % n;
        var a = i * n + j, b = i * n + j1, c = (i + 1) * n + j, d = (i + 1) * n + j1;
        idx.push(a, c, b, b, c, d);
      }
    }
    function cap(r, ringIdx, last) {
      var c = ctr(r), ci = pos.length / 3;
      pos.push(c[0], c[1], c[2]);
      for (j = 0; j < n; j++) {
        var j1 = (j + 1) % n;
        if (last) idx.push(ci, ringIdx * n + j1, ringIdx * n + j); else idx.push(ci, ringIdx * n + j, ringIdx * n + j1);
      }
    }
    if (capA) cap(rings[0], 0, false);
    if (capB) cap(rings[rings.length - 1], rings.length - 1, true);
    var vol = 0, q;
    for (q = 0; q < idx.length; q += 3) {
      var P = idx[q] * 3, Q = idx[q + 1] * 3, R2 = idx[q + 2] * 3;
      vol += pos[P] * (pos[Q + 1] * pos[R2 + 2] - pos[Q + 2] * pos[R2 + 1]) -
             pos[P + 1] * (pos[Q] * pos[R2 + 2] - pos[Q + 2] * pos[R2]) +
             pos[P + 2] * (pos[Q] * pos[R2 + 1] - pos[Q + 1] * pos[R2]);
    }
    if (vol < 0) for (q = 0; q < idx.length; q += 3) { var tt = idx[q + 1]; idx[q + 1] = idx[q + 2]; idx[q + 2] = tt; }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return geo;
  }
  /* superellipse section: x, centre (yc, zc), half-width w, half-height h, exponent e */
  function sgn(v) { return v < 0 ? -1 : 1; }
  function sec(x, yc, zc, w, h, e, n) {
    var o = [], j, t, c, s;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); s = Math.sin(t);
      o.push([x, yc + w * sgn(c) * Math.pow(Math.abs(c), e), zc + h * sgn(s) * Math.pow(Math.abs(s), e)]);
    }
    return o;
  }
  /* list of [x, yc, zc, w, h, e] -> solid */
  function loft(rows, n, capA, capB) {
    var rings = [], i;
    for (i = 0; i < rows.length; i++) rings.push(sec(rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4], rows[i][5] || 1, n));
    return sol(rings, capA, capB);
  }
  /* body of revolution along x: prof [xFrac, rFrac] nose first */
  function rev(prof, len, r, x0, y, z, n) {
    var rows = [], i;
    for (i = 0; i < prof.length; i++) rows.push([x0 - prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], 1]);
    return loft(rows, n, true, true);
  }
  /* aerofoil ring: leading edge le, trailing edge te (3D), thickness t along unit vector nr */
  function foil(le, te, t, nr) {
    function at(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nr[0] * k, le[1] + (te[1] - le[1]) * f + nr[1] * k, le[2] + (te[2] - le[2]) * f + nr[2] * k];
    }
    return [le.slice(), at(0.3, t / 2), at(0.7, t * 0.4), at(1, 0.012), at(0.7, -t * 0.4), at(0.3, -t / 2)];
  }

  /* ---------------------------------------------------------- airframe -- */
  function buildAirframe(THREE, C, F) {
    V = THREE;
    var T = makeMats(C, F.scheme);
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], pale: [], fin: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var g = new V.Group(), s, i;
    g.name = F.node;

    /* nose stations ahead of the cockpit are compressed for the short F-4B/C/D nose */
    var NK = F.long ? 1 : (8.1 - 5.2) / (9.6 - 5.2);
    function nx(x) { return x > 5.2 ? 5.2 + (x - 5.2) * NK : x; }
    var N = 44;

    /* radome (dark) and forward fuselage */
    K.dark.push(loft([
      [nx(9.6), 0, -0.10, 0.02, 0.02, 1], [nx(9.45), 0, -0.11, 0.14, 0.14, 1], [nx(9.0), 0, -0.12, 0.29, 0.28, 1],
      [nx(8.2), 0, -0.10, 0.43, 0.41, 1], [nx(7.2), 0, -0.05, 0.54, 0.51, 1]], N, true, false));
    K.skin.push(loft([
      [nx(7.2), 0, -0.05, 0.54, 0.51, 1], [nx(6.4), 0, -0.02, 0.62, 0.58, 1], [5.8, 0, 0.0, 0.67, 0.63, 1],
      [5.2, 0, 0.05, 0.72, 0.70, 1], [4.0, 0, 0.10, 0.78, 0.82, 1], [2.5, 0, 0.05, 0.80, 0.88, 1],
      [0.5, 0, 0.0, 0.80, 0.88, 1], [-2.0, 0, 0.0, 0.78, 0.88, 1], [-4.5, 0, 0.0, 0.72, 0.82, 1],
      [-6.5, 0, -0.05, 0.66, 0.70, 1], [-7.9, 0, -0.1, 0.52, 0.48, 1]], N, false, true));
    /* the APR-47 fairing under the nose of the F-4G, in the place of the gun */
    if (F.chin) {
      K.skin.push(loft([
        [nx(8.1), 0, -0.52, 0.06, 0.06, 1], [nx(7.7), 0, -0.56, 0.20, 0.16, 1], [nx(7.0), 0, -0.60, 0.30, 0.24, 1],
        [nx(5.8), 0, -0.62, 0.34, 0.28, 1], [4.8, 0, -0.64, 0.36, 0.30, 1], [3.8, 0, -0.66, 0.30, 0.22, 1]], 14, true, true));
      for (s = -1; s <= 1; s += 2) {
        K.dark.push(box(0.5, 0.05, 0.12, nx(7.4), s * 0.30, -0.60));           /* antenna windows */
        K.dark.push(box(0.4, 0.05, 0.10, nx(6.2), s * 0.34, -0.62));
      }
      /* the fin-top antenna housing and the small blade antennas of the SEAD fit */
      K.skin.push(loft([[-6.3, 0, 2.92, 0.04, 0.04, 1], [-6.7, 0, 2.90, 0.20, 0.07, 1], [-7.6, 0, 2.90, 0.20, 0.07, 1],
        [-8.5, 0, 2.91, 0.08, 0.05, 1]], 12, true, true));
    }

    /* radar-warning blade antennas along the spine and wing roots (small fairings) */
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(box(0.5, 0.05, 0.14, 1.6, s * 0.55, 0.96));
      K.dark.push(box(0.35, 0.05, 0.12, -3.0, s * 0.45, 0.88));
      if (F.chin) for (i = 0; i < 6; i++) K.dark.push(box(0.12, 0.04, 0.10, 6.2 - i * 0.28 - (F.long ? 0 : 0.9), s * 0.50, 0.12));
    }
    /* canopy: glass, with dark frames and the four seats' heads showing */
    K.glass.push(loft([[5.2, 0, 0.74, 0.14, 0.10, 1], [4.7, 0, 0.84, 0.40, 0.30, 1], [4.0, 0, 0.92, 0.46, 0.40, 1],
      [3.0, 0, 0.94, 0.46, 0.42, 1], [2.0, 0, 0.92, 0.44, 0.40, 1], [1.2, 0, 0.84, 0.32, 0.30, 1], [0.5, 0, 0.78, 0.10, 0.10, 1]],
      36, false, true));
    K.dark.push(box(0.09, 0.84, 0.10, 4.55, 0, 1.12));        /* windscreen bow */
    K.dark.push(box(0.10, 0.90, 0.10, 3.05, 0, 1.30));        /* canopy divider */
    K.dark.push(box(0.10, 0.80, 0.10, 1.6, 0, 1.22));
    for (i = 0; i < 2; i++) {
      var sx = i === 0 ? 3.95 : 2.10;
      K.dark.push(box(0.40, 0.46, 0.40, sx, 0, 0.80));         /* seat and instrument coaming */
      K.dark.push(box(0.12, 0.24, 0.30, sx - 0.15, 0, 1.12));
    }

    /* intakes with their splitter plates (variable ramps behind) */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(loft([[3.45, s * 1.20, -0.20, 0.34, 0.56, 0.6], [2.0, s * 1.24, -0.20, 0.40, 0.60, 0.6],
        [-0.5, s * 1.20, -0.18, 0.44, 0.62, 0.6], [-3.5, s * 1.08, -0.16, 0.46, 0.60, 0.7],
        [-5.4, s * 0.98, -0.12, 0.36, 0.52, 0.8], [-6.6, s * 0.86, -0.1, 0.18, 0.32, 1]], 32, false, true));
      K.dark.push(box(0.05, 0.62, 1.04, 3.28, s * 1.20, -0.20));                /* the mouth, recessed */
      K.dark.push(box(1.9, 0.045, 1.0, 2.5, s * 0.84, -0.18));                  /* splitter plate */
    }

    /* wing: flat inner panel, outer panels with 12 deg of dihedral */
    var rise = 2.75 * Math.tan(12 * PI / 180);
    var WZ = -0.35;
    for (s = -1; s <= 1; s += 2) {
      var up = [0, 0, 1];
      K.skin.push(sol([
        foil([1.7, s * 0.7, WZ], [-5.4, s * 0.7, WZ], 0.52, up),
        foil([-0.7, s * 3.1, WZ], [-5.1, s * 3.1, WZ], 0.30, up),
        foil([-3.9, s * 5.85, WZ + rise], [-5.35, s * 5.85, WZ + rise], 0.12, up)], true, true));
      /* flap and aileron hinge lines, drawn as shallow dark strips */
      K.dark.push(box(1.5, 0.03, 0.04, -4.35, s * 1.9, WZ + 0.17));
      K.dark.push(box(1.0, 0.03, 0.04, -4.75, s * 4.2, WZ + 0.30 + 0.05 * 0));
      /* wing-fold line: the Navy B shows the hinge across the whole chord */
      K.dark.push(F.fold ? box(1.9, 0.05, 0.04, -3.0, s * 3.1, WZ + 0.16) : box(0.8, 0.05, 0.03, -2.6, s * 3.1, WZ + 0.17));
      /* the C's upper-wing bulges over its wider main tyres */
      if (F.bulge) K.skin.push(loft([[-0.7, s * 2.1, WZ + 0.22, 0.05, 0.03, 1], [-1.4, s * 2.1, WZ + 0.27, 0.34, 0.09, 1],
        [-2.3, s * 2.1, WZ + 0.27, 0.34, 0.09, 1], [-3.0, s * 2.1, WZ + 0.22, 0.05, 0.03, 1]], 12, true, true));
      /* top team patch on the outer panel near the tip */
      K.team.push(sol([
        foil([-3.2, s * 4.5, WZ + (4.5 - 3.1) * 0.2126 + 0.002], [-5.3, s * 4.5, WZ + (4.5 - 3.1) * 0.2126 + 0.002], 0.13, up),
        foil([-3.8, s * 5.6, WZ + (5.6 - 3.1) * 0.2126 + 0.002], [-5.3, s * 5.6, WZ + (5.6 - 3.1) * 0.2126 + 0.002], 0.07, up)], true, true));
    }
    /* stabilators: 23 deg of anhedral, low at the tail */
    for (s = -1; s <= 1; s += 2) {
      var dn = 2.0 * Math.tan(23 * PI / 180);
      K.skin.push(sol([
        foil([-6.7, s * 0.85, -0.5], [-9.1, s * 0.85, -0.5], 0.22, [0, 0, 1]),
        foil([-8.1, s * 2.85, -0.5 - dn], [-9.1, s * 2.85, -0.5 - dn], 0.08, [0, 0, 1])], true, true));
    }
    /* fin and rudder, tip cap in team colour */
    (F.whiteFin ? K.fin : K.skin).push(sol([
      foil([-3.4, 0, 0.55], [-8.0, 0, 0.55], 0.32, [0, 1, 0]),
      foil([-6.2, 0, 2.9], [-8.4, 0, 2.9], 0.10, [0, 1, 0])], true, true));
    K.team.push(box(2.0, 0.16, 0.06, -7.2, 0, 2.935));
    K.dark.push(box(0.04, 0.34, 1.3, -8.15, 0, 1.6, 0, 0, 0));                  /* rudder hinge */
    K.dark.push(box(0.5, 0.05, 0.05, -8.3, 0.0, 2.35));
    K.metal.push(box(0.5, 0.04, 0.5, -2.2, 0, 1.0));                            /* airbrake dorsal plate, folded */

    /* J79 nozzles: the exhaust ends stand proud of the tail cone */
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(cyl(0.50, 0.44, 1.75, 32, "x", -8.42, s * 0.58, -0.20, true));
      K.dark.push(cyl(0.40, 0.40, 0.04, 32, "x", -8.6, s * 0.58, -0.20));
      K.metal.push(cyl(0.54, 0.54, 0.16, 32, "x", -7.7, s * 0.58, -0.20, true));
      K.dark.push(box(0.4, 0.1, 0.08, -9.35, s * 0.58, -0.2 + 0.46));
      K.dark.push(box(0.3, 0.45, 0.04, -9.3, s * 0.58, 0.05));
      /* the nozzle petals */
      for (i = 0; i < 24; i++) {
        var pa = i / 24 * 2 * PI;
        K.metal.push(bar([-8.55, s * 0.58 + 0.47 * Math.cos(pa), -0.20 + 0.47 * Math.sin(pa)],
                         [-9.30, s * 0.58 + 0.45 * Math.cos(pa + 0.17), -0.20 + 0.45 * Math.sin(pa + 0.17)], 0.018, 4));
      }
    }
    /* arrestor-hook fairing and tail light */
    K.metal.push(box(0.9, 0.18, 0.1, -8.0, 0, -0.62));

    /* weapons */
    var AAM = [[0, 0.0], [0.07, 0.35], [0.5, 0.5], [0.95, 0.5], [1, 0.3]];
    function sparrow(x, y, z) {
      K.pale.push(rev([[0, 0.0], [0.04, 0.45], [0.12, 0.8], [0.3, 1], [0.9, 1], [1, 0.8]], 3.66, 0.10, x, y, z, 16));
      K.pale.push(box(0.55, 0.78, 0.02, x - 1.5, y, z)); K.pale.push(box(0.55, 0.02, 0.78, x - 1.5, y, z));
      K.pale.push(box(0.55, 0.62, 0.02, x - 3.2, y, z)); K.pale.push(box(0.55, 0.02, 0.62, x - 3.2, y, z));
    }
    function sidewinder(x, y, z) {
      K.pale.push(rev([[0, 0.0], [0.03, 0.55], [0.08, 0.9], [0.3, 1], [1, 1]], 2.85, 0.064, x, y, z, 14));
      K.dark.push(cyl(0.062, 0.062, 0.12, 10, "x", x - 2.78, y, z));
      K.pale.push(box(0.3, 0.40, 0.014, x - 0.5, y, z)); K.pale.push(box(0.3, 0.014, 0.40, x - 0.5, y, z));
      K.pale.push(box(0.3, 0.30, 0.014, x - 2.6, y, z)); K.pale.push(box(0.3, 0.014, 0.30, x - 2.6, y, z));
    }
    function harm(x, y, z) {
      K.pale.push(rev([[0, 0.0], [0.06, 0.5], [0.16, 0.85], [0.28, 1], [1, 1]], 4.14, 0.127, x, y, z, 16));
      K.pale.push(box(0.5, 0.62, 0.02, x - 1.9, y, z)); K.pale.push(box(0.5, 0.02, 0.62, x - 1.9, y, z));
      K.pale.push(box(0.6, 0.62, 0.02, x - 3.6, y, z)); K.pale.push(box(0.6, 0.02, 0.62, x - 3.6, y, z));
    }
    function tank(len, r, x, y, z) {
      K.pale.push(rev([[0, 0.0], [0.04, 0.5], [0.12, 0.85], [0.25, 1], [0.75, 1], [0.92, 0.7], [1, 0.25]], len, r, x, y, z, 24));
      K.pale.push(box(0.6, 0.012 + r * 2.0, 0.012, x - len + 0.8, y, z)); K.pale.push(box(0.6, 0.012, 0.012 + r * 2.0, x - len + 0.8, y, z));
    }
    function pylon(x, y, zWing, zBot) {
      K.dark.push(box(1.5, 0.10, zWing - zBot, x, y, (zWing + zBot) / 2));
    }
    /* belly: centreline tank between the missile recesses */
    tank(4.6, 0.36, 3.6, 0, -1.22);
    K.dark.push(box(1.2, 0.10, 0.34, 1.4, 0, -0.95));
    var spLine = F.sparrows;
    for (i = 0; i < spLine.length; i++) {
      sparrow(spLine[i][0], spLine[i][1], -0.84);
    }
    /* wing stations: z of the wing's underside at the pylon */
    var zi = WZ - 0.12, zo = WZ + (4.3 - 3.1) * 0.2126 - 0.06;
    for (s = -1; s <= 1; s += 2) {
      pylon(-1.4, s * 2.6, zi, zi - 0.28);
      pylon(-3.0, s * 4.3, zo, zo - 0.22);
      if (F.inboard === "tank") tank(4.1, 0.30, 0.6, s * 2.6, zi - 0.58);
      if (F.inboard === "harm") harm(0.4, s * 2.6, zi - 0.44);
      if (F.outboard === "aim9") {
        sidewinder(-1.2, s * 4.3 - 0.14, zo - 0.36);
        sidewinder(-1.2, s * 4.3 + 0.14, zo - 0.36);
      }
    }

    mesh(g, K.dark, T.dark, "dark");
    skinMeshes(g, K.skin, T, "skin", !!F.scheme.belly);
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.fin, T.white, "fin");
    mesh(g, K.pale, T.pale, "stores");

    /* ---- gear: named "gear"; tyres are the lowest opaque points ---- */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nxg = 4.3, nr = 0.30, nzc = GROUND + nr;
    G.metal.push(bar([nxg + 0.15, 0, -0.75], [nxg, 0, nzc + 0.1], 0.07, 8));
    G.metal.push(bar([nxg - 0.9, 0, -0.80], [nxg, 0, nzc + 0.3], 0.03, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.14, 32, "y", nxg, s * 0.15, nzc));
      G.metal.push(cyl(0.15, 0.15, 0.16, 12, "y", nxg, s * 0.15, nzc));
      G.dark.push(box(1.0, 0.04, 0.5, nxg - 0.1, s * 0.5, -0.78));            /* nose-gear doors */
    }
    var mr = F.thin ? 0.37 : 0.40, mzc = GROUND + mr, mx = -1.5, my = 2.0, tw = F.thin ? 0.20 : 0.26;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.35, s * (my - 0.5), -0.55], [mx, s * my, mzc + 0.12], 0.09, 8));
      G.metal.push(bar([mx + 0.9, s * (my - 0.4), -0.55], [mx + 0.1, s * my, mzc + 0.9], 0.04, 6));
      G.metal.push(bar([mx, s * (my - 0.05), mzc], [mx, s * (my + 0.27), mzc], 0.05, 8));
      G.tyre.push(cyl(mr, mr, tw, 40, "y", mx, s * (my + 0.14), mzc));
      G.metal.push(cyl(0.22, 0.22, 0.30, 24, "y", mx, s * (my + 0.14), mzc));
      G.dark.push(box(1.7, 0.04, 0.55, mx + 0.1, s * (my - 0.55), -0.56));    /* gear doors */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  /* Sparrow recess stations: two forward at the belly corners, two aft */
  var FITS = {
    f4b: { node: "f4b", scheme: SCHEMES.gull, long: false, chin: false, whiteFin: true, fold: true, thin: true, bulge: false,
           sparrows: [[2.6, 0.62], [2.6, -0.62], [-1.3, 0.62], [-1.3, -0.62]], inboard: null, outboard: null },
    f4c: { node: "f4c", scheme: SCHEMES.sea, long: false, chin: false, bulge: true,
           sparrows: [[2.6, 0.62], [2.6, -0.62], [-1.3, 0.62], [-1.3, -0.62]], inboard: "tank", outboard: "aim9" },
    f4g: { node: "f4g", scheme: SCHEMES.euro1, long: true, chin: true,
           sparrows: [[-1.3, 0.62], [-1.3, -0.62]], inboard: "harm", outboard: null }
  };
  function maker(f) { return function (THREE, M, C) { return buildAirframe(THREE, C, f); }; }
  return { f4b: maker(FITS.f4b), f4c: maker(FITS.f4c), f4g: maker(FITS.f4g) };
})();

/* len is the measured x extent: radome tip to the nozzle ends */
UNIT_MODELS["nato_e60_fighter"] = { len: 17.65, build: HeroF4.f4c };
UNIT_MODELS["nato_e60_cfighter"] = { len: 17.65, build: HeroF4.f4b };
UNIT_MODELS["nato_e80_sead"]    = { len: 19.15, build: HeroF4.f4g };
