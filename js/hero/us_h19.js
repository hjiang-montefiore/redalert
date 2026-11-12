/* ===== us_h19.js - HERO model: Sikorsky H-19D Chickasaw (S-55) =====
   Key: nato_e50_transport "Sikorsky H-19D Chickasaw (S-55)" (1950s).

   References (fetched with a generic agent string; nothing is copied, they
   gave the shape and the figures):
     - the Sikorsky H-19A three-view line drawing on Wikimedia Commons,
       with its dimensions: fuselage 42 ft 2.5 in (12.87 m), rotor 53 ft
       (16.15 m, blades 16.4 in chord), 9 ft 11 in from the nose to the
       rotor axis, rotor axis to tail rotor hub 31 ft 4 in, nose wheels
       10 ft 7 in ahead of the main wheels, nose wheels 4 ft 8 in apart,
       main wheels 11 ft 6 in apart, tail rotor 8 ft 8 in, tail rotor hub
       at 10 ft 10 in, rotor head top 13 ft 4 in; the side view gives the
       profile: radial in the nose behind clamshell doors, the cockpit
       perched over it, the cabin roof, the boom upswept behind the cabin
       and the fin leaning aft;
     - a photograph of a USAF H-19B (Commons, "Sikorsky UH-19B Chickasaw
       USAF"): twin nose wheels on a short strut, main wheels on long raked
       struts, two cockpit windows and two square cabin windows, the sliding
       door, the boom band, a horizontal tail plane on the boom.
   Not confirmed: the paint. rotor_specs.js gives "olive" for this row, so
   the machine is drawn olive drab (the photographed one is bare metal with
   a yellow band). The H-19D's inclined boom (three degrees, S-55C onward)
   is not drawn separately from the drawing's level one: the difference is
   under 0.7 m at the tail. The tail rotor is drawn on the port side from
   the drawing's plan view; the photograph does not settle it.

   Helicopter conventions as h60_hawk_family.js and de_bo105.js:
     rotor      hangs in a mount turned +PI/2 about X, the head inside is
                authored in model axes; three blades at 45, 165 and 285
                degrees so blade phase does not set the scale; turns
                anti-clockwise from above.
     rotordisc  see-through blur disc, own transparent material.
     tailrotor  the same mount pattern, hub axis along the model Y.
     gear       the four wheels (twin nose, two main), the lowest opaque
                part; the rotor, boom and fin are all above them.
   Team colour: exactly C.team on the boom band and the roof patch. */
/* DETAIL PASS (2026-11): the airframe now carries a painted skin sheet (seams at the drawing's
   stations, fastener rows, repainted panels, the Cyclone's oil, exhaust soot, grime) in place of
   the flat olive, and the fittings the photograph shows: windscreen frames and wipers, window
   frames, kick-in steps and handholds, the cabin-door step, the door rail's rollers, hinges,
   position lamps (red / green material), the boom beacon and the white tail lamp, boom hanger
   covers, the landing lamp, the intake grille, the long-wire aerial, the radio-compass loop, the
   gearbox grilles and lifting eyes, hub caps, oleo pistons and torque links; on the head the root
   cuffs, bolts, dampers and tip caps. Sizes NOT measured. 4848 -> 7224 tris, 12 -> 14 draw
   calls; extents and len unchanged. */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroH19 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* x forward from the rotor axis; heights above the ground */
  var GROUND  = -1.80;
  function Z(h) { return GROUND + h; }
  var ROTOR_R = 8.075;                 /* 53 ft */
  var CHORD   = 0.417;                 /* 16.4 in */
  var HUB_H   = 3.72;                  /* blade plane */
  var TR_R    = 1.32;                  /* 8 ft 8 in */
  var TR_X = -9.55, TR_Y = 0.27, TR_H = 3.30;

  /* fuselage stations, nose to tail: x, floor, roof, half width, squareness */
  var SEC = [
    [ 3.00, 1.00, 1.90, 0.34, 2.6],
    [ 2.92, 0.80, 2.15, 0.55, 2.8],
    [ 2.75, 0.58, 2.35, 0.72, 3.0],
    [ 2.45, 0.42, 2.55, 0.82, 3.4],
    [ 2.05, 0.34, 2.45, 0.86, 3.8],
    [ 1.88, 0.34, 2.64, 0.86, 4.0],
    [ 1.28, 0.34, 3.17, 0.86, 4.0],
    [ 1.00, 0.34, 3.24, 0.86, 4.0],
    [ 0.00, 0.34, 3.26, 0.86, 4.0],
    [-1.00, 0.34, 3.18, 0.86, 4.0],
    [-1.70, 0.34, 2.92, 0.84, 3.6],
    [-2.30, 0.38, 2.80, 0.80, 3.2],
    [-2.80, 0.80, 2.78, 0.62, 2.8],
    [-3.20, 1.35, 2.78, 0.42, 2.4],
    [-4.50, 1.60, 2.76, 0.36, 2.2],
    [-6.50, 1.95, 2.76, 0.28, 2.2],
    [-8.50, 2.30, 2.74, 0.18, 2.2],
    [-8.80, 2.34, 2.72, 0.12, 2.2]
  ];
  function sect(x) {
    var i, a, b, t;
    for (i = 0; i < SEC.length - 1; i++) {
      a = SEC[i]; b = SEC[i + 1];
      if (x <= a[0] && x >= b[0]) {
        t = (a[0] - x) / (a[0] - b[0]);
        return [x, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t, a[4] + (b[4] - a[4]) * t];
      }
    }
    return SEC[SEC.length - 1];
  }

  /* ------------------------------------------------------- materials */
  function makeMats(C) {
    var m = {};
    m.skin  = new V.MeshStandardMaterial({ color: 0x424a30, roughness: 0.86, metalness: 0.08 });
    var tx = skinTexture();
    if (tx) { m.skin.map = tx; m.skin.color.setHex(0xffffff); }
    m.lampR = new V.MeshStandardMaterial({ color: 0xc8261e, roughness: 0.3, metalness: 0.1, emissive: 0x8a1410, emissiveIntensity: 0.6 });
    m.lampG = new V.MeshStandardMaterial({ color: 0x1fa64a, roughness: 0.3, metalness: 0.1, emissive: 0x0e6a2c, emissiveIntensity: 0.6 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a7073, roughness: 0.48, metalness: 0.60 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1f2222, roughness: 0.74, metalness: 0.15 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1b2a31, roughness: 0.08, metalness: 0.20,
                                           clearcoat: 1.0, clearcoatRoughness: 0.05 });
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc  = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                           transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ------------------------------------------------- the painted skin ===
     Added in the detail pass: one 1024 x 1024 sheet in four 256-pixel
     bands (0 top, 1 port side, 2 starboard side, 3 belly), each a
     projection of the airframe in model metres, picked per face by its
     normal (the de_bo105.js scheme). Olive drab as before, now with the
     panel seams at the drawing's frame stations, fastener rows, the
     repainted panels of a hard-used machine, the Cyclone's oil thrown back
     along the nose and the belly, exhaust soot on the starboard side and
     grime down the flanks. */
  var TW = 1024, BAND = 256, UX0 = -10.2, UX1 = 3.4, QY = 1.0, QH0 = 0.0, QH1 = 4.1;
  var SX = TW / (UX1 - UX0), SZ = BAND / (QH1 - QH0);
  function pxX(x) { return (x - UX0) * SX; }
  function pyTop(y) { return (QY - y) / (2 * QY) * BAND; }
  function pySide(h, b) { return b * BAND + (QH1 - h) / (QH1 - QH0) * BAND; }
  function pyBelly(y) { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }
  function rngFor(seed) {
    var st = (seed >>> 0) || 1;
    return function () { st = (st * 1664525 + 1013904223) >>> 0; return st / 4294967296; };
  }
  var _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    try {
      var cv = document.createElement("canvas");
      cv.width = TW; cv.height = TW;
      var g = cv.getContext("2d"), R = rngFor(1955), i, b, x, y;
      g.fillStyle = "#3f472e"; g.fillRect(0, 0, TW, TW);
      for (i = 0; i < 130; i++) {
        g.fillStyle = (i & 1) ? "#4a5236" : "#373e28";
        g.globalAlpha = 0.22 + R() * 0.30;
        g.fillRect(R() * TW, R() * TW, (0.3 + R() * 1.1) * SX, 10 + R() * 28);
      }
      g.globalAlpha = 1;
      g.fillStyle = "rgba(255,255,236,0.05)"; g.fillRect(0, 0, TW, BAND);
      for (i = 0; i < 160; i++) {
        g.fillStyle = "rgba(20,20,16," + (0.04 + R() * 0.07).toFixed(3) + ")";
        g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 8 + R() * 34);
      }
      g.fillStyle = "rgba(0,0,0,0.12)"; g.fillRect(0, 3 * BAND, TW, BAND);
      /* frames at the drawing's stations, with fastener rows */
      [2.45, 1.88, 1.28, 0.50, -0.40, -1.00, -1.70, -2.30, -3.20, -4.50, -5.50, -6.50, -7.50, -8.50].forEach(function (xf) {
        x = pxX(xf);
        g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.4;
        g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TW); g.stroke();
        g.fillStyle = "rgba(0,0,0,0.22)";
        for (y = 3; y < TW; y += 7) g.fillRect(x - 4, y, 1.4, 1.4);
      });
      for (b = 1; b <= 2; b++) {
        /* stringers along the cabin and the boom */
        g.fillStyle = "rgba(0,0,0,0.22)";
        [0.60, 1.20, 2.30, 2.95].forEach(function (h) { for (x = pxX(-2.3); x < pxX(2.4); x += 5) g.fillRect(x, pySide(h, b), 1.2, 1.2); });
        [2.10, 2.45, 2.65].forEach(function (h) { for (x = pxX(-8.6); x < pxX(-3.2); x += 5) g.fillRect(x, pySide(h, b), 1.2, 1.2); });
        g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 1.3;
        [[-4.0, -4.5, 2.05, 2.50], [-6.0, -6.4, 2.20, 2.60], [-7.8, -8.2, 2.35, 2.62], [-2.0, -2.6, 0.70, 1.30], [2.40, 1.95, 0.60, 1.10]].forEach(function (q) {
          g.strokeRect(pxX(q[1]), pySide(q[3], b), pxX(q[0]) - pxX(q[1]), pySide(q[2], b) - pySide(q[3], b));
        });
        /* oil off the clamshell doors, streaking aft along the lower nose */
        for (i = 0; i < 16; i++) {
          g.fillStyle = "rgba(24,18,10," + (0.10 + R() * 0.14).toFixed(3) + ")";
          g.fillRect(pxX(2.6 - R() * 2.8), pySide(0.45 + R() * 0.6, b), (0.5 + R() * 1.0) * SX, 1.5 + R() * 2);
        }
        /* scuffing under the cabin door */
        g.fillStyle = "rgba(120,112,92,0.16)"; g.fillRect(pxX(-0.80), pySide(0.50, b), pxX(1.00) - pxX(-0.80), 4);
      }
      /* exhaust soot aft of the stub under the starboard nose */
      var sg = g.createLinearGradient(pxX(2.1), 0, pxX(-0.2), 0);
      sg.addColorStop(0, "rgba(20,18,15,0.45)"); sg.addColorStop(1, "rgba(20,18,15,0)");
      g.fillStyle = sg; g.fillRect(pxX(-0.2), pySide(0.95, 2), pxX(2.1) - pxX(-0.2), pySide(0.35, 2) - pySide(0.95, 2));
      /* oil on the belly, the walkway on the roof round the gearbox */
      for (i = 0; i < 24; i++) {
        g.fillStyle = "rgba(24,18,10," + (0.10 + R() * 0.12).toFixed(3) + ")";
        g.fillRect(pxX(2.6 - R() * 3.6), pyBelly(-0.6 + R() * 1.2), (0.6 + R() * 1.2) * SX, 2);
      }
      g.fillStyle = "rgba(0,0,0,0.12)";
      g.fillRect(pxX(-1.0), pyTop(0.80), pxX(1.0) - pxX(-1.0), pyTop(0.50) - pyTop(0.80));
      g.fillRect(pxX(-1.0), pyTop(-0.50), pxX(1.0) - pxX(-1.0), pyTop(-0.80) - pyTop(-0.50));
      g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.6;
      g.strokeRect(pxX(-1.10), pyTop(0.45), pxX(0.85) - pxX(-1.10), pyTop(-0.45) - pyTop(0.45));
      var t = new V.CanvasTexture(cv);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex = t;
    } catch (e) { _tex = false; }
    return _tex;
  }
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.62 ? 0 : nz < -0.62 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], h = p[t + 3 * k + 2] - GROUND;
        var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
        if (band === 0) { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else { U = pxX(endOn ? x + Math.abs(y) * 0.3 : x); W = pySide(h, band); }
        U = Math.max(2, Math.min(TW - 2, U)); W = Math.max(lo, Math.min(hi, W));
        uv[(t / 3 + k) * 2] = U / TW; uv[(t / 3 + k) * 2 + 1] = 1 - W / TW;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* --------------------------------------------------- geometry kit */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx) geo.rotateX(rx);
    if (ry) geo.rotateY(ry);
    if (rz) geo.rotateZ(rz);
    geo.translate(x, y, z);
    return geo;
  }
  function box(lx, ly, lz, x, y, z) { return place(new V.BoxGeometry(lx, ly, lz), x, y, z); }
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r1, r0, len, seg, 1);     /* radius r0 at the -axis end */
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    g.translate(x, y, z);
    return g;
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    g.translate(x, y, z);
    return g;
  }
  function bar(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, len, seg || 6, 1);
    var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 1, 0), new V.Vector3(dx / len, dy / len, dz / len));
    g.applyQuaternion(q);
    g.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return g;
  }
  function sgn(v) { return v < 0 ? -1 : 1; }
  /* a lofted tube through sections [x, floor, roof, half width, squareness],
     faces turned to face outwards whatever order the sections run in */
  function loft(secs, N, caps, grow) {
    var pos = [], idx = [], out = [], i, k, s, t, c, sn, zc, hh, ctr = [], a, b, d;
    grow = grow || 0;
    for (i = 0; i < secs.length; i++) {
      s = secs[i]; zc = (s[1] + s[2]) / 2; hh = (s[2] - s[1]) / 2 + grow;
      ctr.push([s[0], 0, zc]);
      for (k = 0; k < N; k++) {
        t = 2 * PI * k / N; c = Math.cos(t); sn = Math.sin(t);
        pos.push(s[0], (s[3] + grow) * sgn(c) * Math.pow(Math.abs(c), 2 / s[4]), zc + hh * sgn(sn) * Math.pow(Math.abs(sn), 2 / s[4]));
      }
    }
    function fix(i0, i1, i2, cy, cz) {
      var p0 = [pos[i0 * 3], pos[i0 * 3 + 1], pos[i0 * 3 + 2]], p1 = [pos[i1 * 3], pos[i1 * 3 + 1], pos[i1 * 3 + 2]], p2 = [pos[i2 * 3], pos[i2 * 3 + 1], pos[i2 * 3 + 2]];
      var ux = p1[0] - p0[0], uy = p1[1] - p0[1], uz = p1[2] - p0[2], vx = p2[0] - p0[0], vy = p2[1] - p0[1], vz = p2[2] - p0[2];
      var ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var cyv = (p0[1] + p1[1] + p2[1]) / 3 - cy, czv = (p0[2] + p1[2] + p2[2]) / 3 - cz;
      if (ny * cyv + nz * czv >= 0) idx.push(i0, i1, i2); else idx.push(i0, i2, i1);
    }
    for (i = 0; i < secs.length - 1; i++) {
      for (k = 0; k < N; k++) {
        a = i * N + k; b = i * N + (k + 1) % N; c = (i + 1) * N + k; d = (i + 1) * N + (k + 1) % N;
        fix(a, b, c, 0, ctr[i][2]); fix(b, d, c, 0, ctr[i][2]);
      }
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    out.push(g);
    if (caps) {
      var ends = [[0, 1], [secs.length - 1, secs.length - 2]];
      for (i = 0; i < 2; i++) {
        var e = ends[i][0], f = ends[i][1], cp = [], ci = [];
        for (k = 0; k < N; k++) cp.push(pos[(e * N + k) * 3], pos[(e * N + k) * 3 + 1], pos[(e * N + k) * 3 + 2]);
        cp.push(ctr[e][0], 0, ctr[e][2]);
        var dir = secs[e][0] > secs[f][0] ? 1 : -1;
        for (k = 0; k < N; k++) {
          var k2 = (k + 1) % N;
          /* triangle (k, k2, centre) has normal along +x when the ring runs anticlockwise seen from +x */
          var ay = cp[k2 * 3 + 1] - cp[k * 3 + 1], az = cp[k2 * 3 + 2] - cp[k * 3 + 2];
          var by = cp[N * 3 + 1] - cp[k * 3 + 1], bz = cp[N * 3 + 2] - cp[k * 3 + 2];
          if ((ay * bz - az * by) * dir >= 0) ci.push(k, k2, N); else ci.push(k, N, k2);
        }
        var cg = new V.BufferGeometry();
        cg.setAttribute("position", new V.Float32BufferAttribute(cp, 3));
        cg.setIndex(ci);
        cg.computeVertexNormals();
        out.push(cg);
      }
    }
    return out;
  }
  /* a flat plate from an (x, z) outline, thickness t across y, centred on y0 */
  function plate(pts, t, y0) {
    var sh = new V.Shape();
    sh.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    var g = new V.ExtrudeGeometry(sh, { depth: t, bevelEnabled: false });
    g.rotateX(PI / 2);                    /* (x, z) -> (x, z) with depth running to -y */
    g.translate(0, y0 + t / 2, 0);
    return g;
  }
  function flat(g) {
    if (g.index) g = g.toNonIndexed();
    if (!g.attributes.normal) g.computeVertexNormals();
    return g;
  }
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    return out;
  }
  function mesh(parent, list, mat, name, uvFn) {
    if (!list.length) return null;
    var geo = merge(list);
    if (uvFn) uvFn(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function zs(list, dz) { for (var i = 0; i < list.length; i++) list[i].translate(0, 0, dz); return list; }

  /* ============================================================ build == */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    var skin = [], metal = [], dark = [], glass = [], team = [];
    var i, k, s;

    /* ---- the fuselage: nose cowl over the radial, cockpit, cabin, boom */
    var stn = [];
    for (i = 0; i < SEC.length; i++) { stn.push(SEC[i]); if (i < SEC.length - 1) stn.push(sect((SEC[i][0] + SEC[i + 1][0]) / 2)); }
    var body = loft(stn, 40, true);
    for (i = 0; i < body.length; i++) skin.push(body[i].translate(0, 0, GROUND * 0));
    /* the main gearbox fairing standing out of the roof */
    skin.push(cyl(0.42, 0.27, 0.46, 16, "z", 0, 0, 3.32));
    metal.push(cyl(0.12, 0.12, 0.30, 10, "z", 0, 0, 3.58));
    /* the nose: clamshell doors' seam and the cooling-air face */
    dark.push(cyl(0.20, 0.20, 0.05, 14, "x", 3.00, 0, 1.45));
    dark.push(box(0.02, 0.01, 0.9, 2.95, 0, 1.45));
    for (s = -1; s <= 1; s += 2) {
      dark.push(box(0.30, 0.04, 0.55, 2.28, s * 0.80, 1.45));            /* engine cooling louvres */
      dark.push(box(0.22, 0.03, 0.30, 2.62, s * 0.66, 1.0));
    }
    /* panel lines: the sliding cabin door, the cockpit door, the nose doors */
    for (s = -1; s <= 1; s += 2) {
      var yy = s * 0.865;
      dark.push(box(0.02, 0.03, 1.55, 1.00, yy, 1.15), box(0.02, 0.03, 1.55, -0.80, yy, 1.15));
      dark.push(box(1.82, 0.03, 0.02, 0.10, yy, 0.45), box(1.82, 0.03, 0.02, 0.10, yy, 1.95));
      dark.push(box(0.02, 0.03, 0.95, 1.55, s * 0.855, 2.05), box(0.02, 0.03, 0.55, 0.00, s * 0.865, 2.55));
      dark.push(box(0.12, 0.03, 0.03, 0.78, yy, 1.30));                    /* door handle */
      dark.push(box(0.03, 0.03, 1.0, 2.62, s * 0.70, 1.40), box(0.03, 0.03, 0.8, 2.86, s * 0.60, 1.40));
    }
    dark.push(cyl(0.05, 0.05, 0.50, 8, "x", 2.30, -0.45, 0.40));            /* exhaust stub under the starboard nose */
    /* the boom band and the roof patch carry the team colour */
    var band = [];
    for (i = 0; i < 4; i++) band.push(sect(-5.2 - i * 0.2));
    var bg = loft(band, 20, false, 0.02);
    for (i = 0; i < bg.length; i++) team.push(bg[i]);
    team.push(box(1.2, 0.5, 0.03, -1.15, 0, 3.17));

    /* ---- glass: windshield, cockpit windows, cabin windows */
    var th = -48 * D2R;
    for (s = -1; s <= 1; s += 2) {
      glass.push(place(new V.BoxGeometry(0.05, 0.62, 0.78), 1.58, s * 0.34, 2.93, 0, th, 0));
      glass.push(box(0.58, 0.10, 0.55, 1.00, s * 0.84, 2.70));         /* cockpit door window */
      glass.push(box(0.55, 0.10, 0.52, 0.30, s * 0.84, 2.70));
      glass.push(box(0.36, 0.07, 0.38, -0.85, s * 0.86, 2.00));        /* cabin windows */
      glass.push(box(0.36, 0.07, 0.38, -1.55, s * 0.855, 2.00));
      glass.push(place(new V.BoxGeometry(0.30, 0.04, 0.34), 2.05, s * 0.64, 2.50, 0, 0, s * 0.2));
    }
    /* the cabin door's rail and the starboard hoist */
    for (s = -1; s <= 1; s += 2) metal.push(box(2.3, 0.04, 0.04, 0.45, s * 0.875, 2.08));
    metal.push(box(0.5, 0.25, 0.30, -0.60, -0.90, 2.65));

    /* ---- tail fin, tail plane, bumper, tail gearbox */
    skin.push(plate([[-8.35, 2.30], [-8.35, 2.74], [-9.0, 3.18], [-9.55, 3.85], [-9.90, 3.90], [-9.88, 3.25], [-9.72, 2.30]], 0.10, 0));
    skin.push(box(0.55, 1.22, 0.05, -9.10, 0, 2.26));
    metal.push(bar([-9.05, 0, 2.25], [-9.50, 0, 1.80], 0.035, 5));
    metal.push(cyl(0.09, 0.09, 0.26, 10, "y", TR_X, TR_Y / 2 + 0.05, TR_H));
    dark.push(box(0.20, 0.07, 0.12, -9.78, 0, 3.97));                    /* tail light / fin cap */
    /* a whip antenna and the pitot */
    metal.push(bar([-3.6, 0, 2.78], [-4.2, 0, 3.15], 0.012, 4));
    metal.push(bar([2.9, -0.2, 2.05], [3.25, -0.2, 2.05], 0.015, 4));

    /* ================================================= DETAIL PASS ======
       The fittings the first pass left out, placed off the H-19A three-view
       and the UH-19B photograph: sizes read through the photograph's
       perspective, NOT measured. Heights above the ground, as above. */
    var lampR = [], lampG = [];
    /* the windscreen's centre post, its frames and the wipers */
    dark.push(bar([1.90, 0, 2.62], [1.28, 0, 3.16], 0.024, 4));
    for (s = -1; s <= 1; s += 2) {
      dark.push(bar([1.90, s * 0.70, 2.62], [1.30, s * 0.70, 3.12], 0.022, 4));
      dark.push(bar([1.86, s * 0.30, 2.66], [1.62, s * 0.27, 2.86], 0.010, 4));
      /* window frames round the cockpit and cabin windows */
      [[1.00, 0.58, 2.70, 0.55], [0.30, 0.55, 2.70, 0.52], [-0.85, 0.36, 2.00, 0.38], [-1.55, 0.36, 2.00, 0.38]].forEach(function (w) {
        var yy = s * (w[0] < -0.5 ? 0.895 : 0.892);
        dark.push(box(w[1] + 0.06, 0.02, 0.03, w[0], yy, w[2] + w[3] / 2 + 0.02), box(w[1] + 0.06, 0.02, 0.03, w[0], yy, w[2] - w[3] / 2 - 0.02));
        dark.push(box(0.03, 0.02, w[3] + 0.04, w[0] + w[1] / 2 + 0.02, yy, w[2]), box(0.03, 0.02, w[3] + 0.04, w[0] - w[1] / 2 - 0.02, yy, w[2]));
      });
      /* the kick-in steps and handholds up the nose's side to the cockpit,
         the step under the cabin door */
      [0.80, 1.30, 1.80].forEach(function (h) { dark.push(box(0.14, 0.02, 0.05, 2.10, s * 0.87, h)); });
      metal.push(bar([1.55, s * 0.90, 2.30], [1.55, s * 0.90, 2.48], 0.012, 4));
      metal.push(box(0.55, 0.18, 0.025, 0.10, s * 0.96, 0.32));
      metal.push(bar([0.30, s * 0.86, 0.36], [0.30, s * 1.02, 0.32], 0.012, 4), bar([-0.10, s * 0.86, 0.36], [-0.10, s * 1.02, 0.32], 0.012, 4));
      /* the door rail's rollers, the cockpit door's hinges */
      metal.push(cyl(0.03, 0.03, 0.05, 8, "y", 0.95, s * 0.90, 2.06), cyl(0.03, 0.03, 0.05, 8, "y", -0.75, s * 0.90, 2.06));
      dark.push(box(0.05, 0.03, 0.07, 1.30, s * 0.875, 2.45), box(0.05, 0.03, 0.07, 1.30, s * 0.875, 2.95));
      /* position lamps low on the cabin's rear corners: port red, starboard green */
      (s > 0 ? lampR : lampG).push(sph(0.035, 8, 5, -1.90, s * 0.86, 0.80, 1.4, 0.6, 0.9));
      /* the boom's drive-shaft hanger covers */
      [-4.5, -5.5, -6.5, -7.5].forEach(function (xh) { dark.push(box(0.10, 0.02, 0.05, xh, s * (sect(xh)[3] + 0.005), sect(xh)[2] - 0.12)); });
      /* the tail plane's tip lamps */
      (s > 0 ? lampR : lampG).push(sph(0.028, 8, 5, -9.10, s * 0.62, 2.26, 1.4, 0.7, 0.9));
    }
    /* the landing lamp under the nose, the carburettor air intake's grille
       and the oil cooler's face */
    metal.push(cyl(0.10, 0.10, 0.05, 12, "z", 2.55, 0.35, 0.47));
    glass.push(cyl(0.085, 0.085, 0.012, 12, "z", 2.55, 0.35, 0.44));
    for (i = 0; i < 5; i++) metal.push(box(0.02, 0.36, 0.02, 3.01, 0, 1.30 + i * 0.07));
    /* the beacon on the boom top behind the cabin, the white tail lamp */
    dark.push(cyl(0.05, 0.055, 0.04, 10, "z", -3.40, 0, 2.80));
    lampR.push(sph(0.045, 10, 6, -3.40, 0, 2.83, 1, 1, 0.8));
    metal.push(sph(0.03, 8, 5, -9.92, 0, 3.55, 1.3, 0.8, 1.0));
    /* the long-wire aerial from the whip's mast to the fin, the radio-
       compass loop on the roof */
    dark.push(bar([-4.20, 0, 3.15], [-9.20, 0, 3.40], 0.005, 3));
    dark.push(cyl(0.12, 0.12, 0.05, 12, "z", 0.75, 0.40, 3.27));
    /* the gearbox fairing's cooling grilles and lifting eyes */
    for (s = -1; s <= 1; s += 2) {
      dark.push(box(0.30, 0.02, 0.14, 0, s * 0.35, 3.33));
      metal.push(box(0.05, 0.03, 0.06, 0.10, s * 0.18, 3.57));
    }

    /* all body parts so far were authored with height above ground in z:
       shift them to the model's z */
    function lowerAll(list) { for (var j = 0; j < list.length; j++) list[j].translate(0, 0, GROUND); }
    lowerAll(skin); lowerAll(metal); lowerAll(dark); lowerAll(glass); lowerAll(team);
    lowerAll(lampR); lowerAll(lampG);

    mesh(g, skin, T.skin, "fuselage", T.skin.map ? projUV : null);
    mesh(g, lampR, T.lampR, "lamp_red");
    mesh(g, lampG, T.lampG, "lamp_green");
    mesh(g, glass, T.glass, "glass");
    mesh(g, team, T.team, "team");
    mesh(g, dark, T.dark, "dark");
    mesh(g, metal, T.metal, "fittings");

    /* ---- the undercarriage: twin nose wheels, two main wheels on raked
       struts; the lowest opaque part */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var gm = [], gt = [];
    var NX = 1.81, MX = -1.36, NR = 0.24, MR = 0.30;
    for (s = -1; s <= 1; s += 2) {
      gt.push(cyl(NR, NR, 0.15, 24, "y", NX, s * 0.71, Z(NR)));
      gm.push(cyl(0.09, 0.09, 0.17, 8, "y", NX, s * 0.71, Z(NR)));
      gm.push(bar([NX - 0.05, s * 0.36, Z(0.55)], [NX, s * 0.71, Z(NR)], 0.032, 6));
      gt.push(cyl(MR, MR, 0.22, 24, "y", MX, s * 1.60, Z(MR)));
      gm.push(cyl(0.12, 0.12, 0.25, 8, "y", MX, s * 1.60, Z(MR)));
      gm.push(bar([-1.80, s * 0.86, Z(1.30)], [MX, s * 1.60, Z(MR)], 0.045, 6));
      gm.push(bar([-0.70, s * 0.86, Z(0.95)], [MX + 0.1, s * 1.55, Z(MR + 0.1)], 0.03, 5));
    }
    gm.push(bar([NX - 0.05, -0.36, Z(0.55)], [NX - 0.05, 0.36, Z(0.55)], 0.03, 5));
    /* detail pass: hub caps, the main oleos' bright pistons and the nose
       legs' torque links */
    for (s = -1; s <= 1; s += 2) {
      gm.push(cyl(0.07, 0.07, 0.03, 10, "y", MX, s * 1.725, Z(MR)), cyl(0.025, 0.025, 0.03, 6, "y", MX, s * 1.745, Z(MR)));
      gm.push(cyl(0.05, 0.05, 0.02, 10, "y", NX, s * 0.79, Z(NR)));
      gm.push(bar([MX - 0.08, s * 1.45, Z(MR + 0.22)], [MX - 0.22, s * 1.22, Z(0.78)], 0.06, 8));
      gm.push(bar([NX + 0.06, s * 0.55, Z(0.30)], [NX + 0.04, s * 0.45, Z(0.48)], 0.012, 4));
    }
    mesh(gear, gt, T.dark, "gear_tyres");
    mesh(gear, gm, T.metal, "gear_legs");

    /* ---- main rotor: mount turned +PI/2 about X, so render3d's turn about
       the parent's up axis becomes a turn about the mast; the head undoes it */
    var mnt = new V.Group();
    mnt.position.set(0, 0, Z(HUB_H));
    mnt.rotation.x = PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);

    var hm = [], hb = [], a;
    hm.push(cyl(0.22, 0.20, 0.20, 12, "z", 0, 0, 0));
    hm.push(cyl(0.12, 0.09, 0.16, 10, "z", 0, 0, 0.18));                 /* head top 4.06 m */
    hm.push(cyl(0.14, 0.14, 0.30, 10, "z", 0, 0, -0.25));               /* mast */
    hm.push(cyl(0.30, 0.30, 0.04, 14, "z", 0, 0, -0.32));               /* swashplate */
    for (k = 0; k < 3; k++) {
      a = (45 + 120 * k) * D2R;
      var sleeve = box(0.62, 0.13, 0.08, 0.40, 0, 0);                  /* hinge housing, flapping hinge 9 in out */
      sleeve.rotateZ(a);
      hm.push(sleeve);
      var rod = bar([0.30, 0, -0.30], [0.50, 0, -0.04], 0.012, 4);     /* pitch link */
      rod.rotateZ(a);
      hm.push(rod);
      var bl = box(ROTOR_R - 0.70, CHORD, 0.028, 0.70 + (ROTOR_R - 0.70) / 2, 0, 0);
      bl.rotateX(5 * D2R);
      bl.rotateZ(a);
      hb.push(bl);
      /* detail pass: the blade's root cuff and bolts, the drag damper, the
         bright tip cap */
      [cyl(0.075, 0.075, 0.24, 10, "x", 0.82, 0, 0), cyl(0.024, 0.024, 0.16, 8, "z", 0.76, 0.05, 0),
       cyl(0.024, 0.024, 0.16, 8, "z", 0.86, -0.05, 0), cyl(0.03, 0.03, 0.40, 6, "x", 0.42, 0.14, 0.03),
       box(0.14, CHORD * 0.92, 0.04, ROTOR_R - 0.07, 0, 0).rotateX(5 * D2R)].forEach(function (q) { q.rotateZ(a); hm.push(q); });
    }
    mesh(head, hm, T.metal, "hub");
    mesh(head, hb, T.dark, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ---- tail rotor: same mount pattern, hub axis along the model Y, on
       the port side of the fin */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.07, 0.07, 0.12, 10, "z", 0, 0, 0), cyl(0.04, 0.03, 0.06, 8, "z", 0, 0, -0.08),
               box(0.28, 0.07, 0.05, 0, 0, 0)];
    var trB = [];
    for (k = 0; k < 2; k++) {
      var tb = box(TR_R - 0.14, 0.20, 0.022, 0.14 + (TR_R - 0.14) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ((50 + 180 * k) * D2R);
      trB.push(tb);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.dark, "tailrotor_blades");

    return g;
  }

  return { build: build };
})();

UNIT_MODELS["nato_e50_transport"] = { len: 18.55, build: HeroH19.build };
