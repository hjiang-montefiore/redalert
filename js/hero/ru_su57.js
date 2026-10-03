/* ============ ru_su57.js - HERO model: Sukhoi Su-57 "Felon" ============
   Registers stealth_p ("Su-57 Felon", present day; rules.js row, air_specs
   20.1 m x 14.1 m). pact_e00_stealthfighter ("none in service") is NOT
   registered here and keeps resolving as before.

   References (Wikimedia Commons, fetched for this file):
     A "Sukhoi T-50 3-view.svg" - top, side and front line drawing of the
       Su-57 airframe. Every station, the planform and the heights rest on
       it: the wide flat blended body, the LERX flowing into the 40 degree
       wing (a straight leading edge, a short raked tip), the widely spaced
       engine nacelles with the tunnel between them and the tail sting that
       runs out past the nozzles, the caret-section intakes under the LERX,
       the canted fins on the outboard booms (about 23 degrees off the
       vertical), the low tailplanes, the canopy on the nose, and the IRST
       ball ahead of the windscreen on the starboard side of the nose. The
       drawing is scaled to 20.1 m (nose to sting) and gives a span of
       14.1 m and a height of 4.6 m; this model measures 20.1 x 14.1 x 4.5.
     B "Sukhoi Su-57 RF-81775 Army-2022.jpg" - an in-service Su-57 parked,
       seen from the port bow: tricycle gear (twin-wheel nose leg ahead of
       the intakes, single-wheel main legs under the wing roots, gear doors),
       the closed bays, the light silver-grey paint with darker grey
       "digital" patches, the red Russian star low on the fin, the grey radome.
     C "Sukhoi Su-57 bn058 Kubinka 2020.jpg" - an in-service Su-57 in a bank,
       seen from below and ahead: nothing under the wings or belly (the
       weapons stay in the internal bays), a Russian star near the tip of
       each lower wing, the nacelle tunnel and the nozzles.
   What each part rests on:
     - body, nacelles (centre y 1.42), wing, tailplanes (root chord x -5.5 to
       -9.2 at y 2.5, tip y 5.0), canopy, IRST, the tail sting: A.
     - Fins: A (top and side views) gives the root on the outboard boom at
       y 2.6, the tip at y 3.4 (about 22 degrees off the vertical), root
       chord x -4.75 to -7.7, tip chord 0.7 m. A is the T-50 prototype; the
       serial aircraft's fins (B) look smaller, but no dimensioned drawing of
       them was found, so the prototype size is kept (a risk, see the report).
     - LEVCONs: real flush slabs on the LERX edge between the kink (x 4.1)
       and the wing root (A, B) with dark hinge and gap lines; the surfaces
       are fixed in neutral, as are the fins and tailplanes.
     - Intakes: caret mouths under the LERX with a swept lip frame, a splitter
       and the inner ramp (A, C); the bays stay closed.
     - Nozzles: sixteen petals closing from 0.58 m to 0.38 m radius at x
       -8.65 (A), a dark bore; no thrust-vector canting is drawn.
     - Gear (B): twin-wheel nose leg with two doors, single-wheel main legs
       with a leg door and an inner bay door; the stations and tyre sizes are
       estimated from A and B only roughly.
     - Paint: plain light grey with a slightly darker top and a pale belly
       (B, C); the "digital" pixel patches seen in B and C are NOT drawn - no
       labelled layout was available. No bort number, no T-50 prototype
       marking. The red star with a thin white edge: both sides of both fins,
       low on the fin (B), and the lower side of both wings near the tip (C).
       No upper-wing star: neither photograph shows one.
     - No stores of any kind: the internal bays are closed.
   Team colour exactly C.team: one small strip on each upper outer wing.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu57 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -2.30;                 /* tyre bottoms: 4.6 m under the fin tip */
  var HALFSPAN = 7.05;

  var PXM = 36, XMIN = -10.4, TW = 800;
  var TOPH = 534, SIDEH = 172, TH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 7.4, ZTOP = 2.4, ZSPAN = 5.0;

  var PAL = { up: "#98a3ab", side: "#a9b3ba", belly: "#a2acb3" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxY(y) { return (YMAX - y) * PXM; }

  /* the Russian star: red with a thin white edge */
  function star(g, cx, cy, rx, ry) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#e6e6e0"; path(1.14); g.fill();
    g.fillStyle = "#c1281f"; path(1.0); g.fill();
  }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 57011, i, b, x, y, k;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = PAL.up; g.fillRect(0, 0, TW, TOPH);
    g.fillStyle = PAL.side; g.fillRect(0, TOPH, TW, 2 * SIDEH);
    g.fillStyle = PAL.belly; g.fillRect(0, bandY[3], TW, TOPH);
    /* panel lines */
    g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 1;
    var PANEL_X = [8.2, 6.6, 3.8, 1.8, -0.2, -2.2, -4.2, -6.2, -8.2];
    for (b = 0; b < 4; b++) for (i = 0; i < PANEL_X.length; i++) {
      x = pxX(PANEL_X[i]); g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke();
    }
    /* internal bay doors on the belly, bottom band (A, C): main bay between
       the nacelles, two side bays */
    g.strokeStyle = "rgba(20,24,28,0.40)"; g.lineWidth = 1.2;
    function bandRect(x0, x1, y0, y1) {
      g.strokeRect(pxX(x1), bandY[3] + pxY(y1), pxX(x0) - pxX(x1), pxY(y0) - pxY(y1));
    }
    bandRect(3.4, -3.6, -0.55, 0.55);
    bandRect(2.0, -1.2, 1.25, 2.1); bandRect(2.0, -1.2, -2.1, -1.25);
    /* soot behind the nozzles, rivet rows, light weathering */
    g.fillStyle = "rgba(30,28,26,0.20)";
    for (b = -1; b <= 1; b += 2) g.fillRect(pxX(-6.6), bandY[3] + pxY(b * 1.4 + 0.5), pxX(-9.2) - pxX(-6.6) + 0, 1.0 * PXM);
    g.fillStyle = "rgba(0,0,0,0.10)";
    for (i = 0; i < 50; i++) {
      x = R() * TW * 0.92; y = R() * TH; k = 8 + ((R() * 24) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 5, y, 1.3, 1.3);
    }
    for (i = 0; i < 30; i++) {
      g.fillStyle = "rgba(24,22,20," + (0.03 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 50, 2 + R() * 8);
    }
    /* stars: both sides of both fins (B), lower wings near the tip (C) */
    for (b = 1; b <= 2; b++) star(g, pxX(-6.40), sideZ(1.0, b), 0.22 * PXM, 0.22 * SIDEH / ZSPAN * 1.04);
    star(g, pxX(-4.35), bandY[3] + pxY(5.7), 0.32 * PXM, 0.32 * PXM);
    star(g, pxX(-4.35), bandY[3] + pxY(-5.7), 0.32 * PXM, 0.32 * PXM);
    _cv = cv;
    return cv;
  }

  var _tex = null;
  function skinTexture() {
    if (_tex !== null) return _tex;
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x9bb2c9);
    m.radome = new V.MeshStandardMaterial({ color: 0xa9b2b8, roughness: 0.70, metalness: 0.10 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6f72, roughness: 0.45, metalness: 0.62 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x2a3d44, roughness: 0.10, metalness: 0.35 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xc4c9c8, roughness: 0.55, metalness: 0.15 });
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
  /* a cylinder along model x, y or z; r0 is the end toward +axis */
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  /* a round bar from p to q */
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
  /* one buffer per material: a single draw call (and one shadow draw) for what
     would otherwise be dozens */
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
  /* flat-shaded triangles from corners, three per triangle */
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* A convex solid from its faces; every face is wound away from the centre,
     so the caller need not get the order right. */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0], fc = [0, 0, 0];
      /* test each triangle against the centre of ITS face, not its first
         corner: on a long thin swept panel with anhedral the first corner
         sits far inboard of the solid's centre and turned the top skin in */
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
  /* a closed solid between two sections with the same number of corners:
     built with consistent topology (caps as fans, sides as quads), then the
     signed volume decides whether the whole solid is turned inside out */
  function solid(A, B) {
    var n = A.length, i, out = [], vol = 0;
    for (i = 1; i < n - 1; i++) { out.push(A[0], A[i + 1], A[i]); out.push(B[0], B[i], B[i + 1]); }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      out.push(A[i], A[j], B[j]); out.push(A[i], B[j], B[i]);
    }
    for (i = 0; i < out.length; i += 3) {
      var a = out[i], b = out[i + 1], c = out[i + 2];
      vol += a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
    }
    if (vol < 0) for (i = 0; i < out.length; i += 3) { var t = out[i + 1]; out[i + 1] = out[i + 2]; out[i + 2] = t; }
    return tris(out);
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
  /* a rectangular block section on a lifting surface, between chord fractions
     f0 and f1, half-thickness h along nrm: the team flashes */
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }

  /* ---- the loft. A section is a superellipse: e 1 is round, lower e is a
     flat-sided box with rounded corners. Sections run from the nose to the
     tail (decreasing x) and the quads are wound (a, c, b), which for that
     order puts every normal outward. */
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
  /* a round body of revolution along x from a profile of [xFraction, radiusFraction],
     nose first, centred on (x, y, z) */
  function revolve(prof, len, r, x, y, z, n, capNose, capTail) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(ls(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], 1));
    return loft(secs, n, capNose === undefined ? 0 : capNose, capTail === undefined ? 0 : capTail);
  }

  /* ------------------------------------------------------------ planform --
     Drawing A scaled to 20.1 m, x 0 at mid length (nose +10.05, sting end
     -10.05), +y to port. Wing: leading edge straight from the body (x -0.07,
     y 3.15) to the tip (x -5.5, y 7.05); trailing edge from x -6.45 at the
     root to -6.0 at the tip. */
  var WY0 = 2.80;
  function wLE(y) { return -0.07 - (y - 3.15) * 1.361; }
  function wTE(y) { return -6.45 + (y - 3.10) * 0.113; }
  function wT(y)  { return Math.max(0.08, 0.32 - 0.058 * (y - WY0)); }
  function wPart(y, s, f0, f1) {
    var le = wLE(y), te = wTE(y), c = le - te;
    return foil([le - c * f0, s * y, 0], [le - c * f1, s * y, 0], wT(y), [0, 0, 1]);
  }
  function blk2(y, s, f0, f1, h) {
    var le = wLE(y), te = wTE(y);
    return blk([le, s * y, 0], [te, s * y, 0], f0, f1, h, [0, 0, 1]);
  }

  /* canted fin: root on the outboard boom (y 2.6), tip y 3.4, about 22
     degrees off the vertical; drawing A: root chord x -4.75 to -7.7, tip
     chord x -6.45 to -7.15, 1.9 m above the boom. */
  var FIN_R = [0, 2.55, 0.15], FIN_D = [0, 0.85, 2.05];
  function finPart(f, s) {
    var le = -4.75 - 1.70 * f, te = -7.70 + 0.55 * f;
    var cy = FIN_R[1] + FIN_D[1] * f, cz = FIN_R[2] + FIN_D[2] * f;
    var th = 0.24 - 0.14 * f, nl = Math.sqrt(0.92 * 0.92 + 0.39 * 0.39);
    return foil([le, s * cy, cz], [te, s * cy, cz], th, [0, s * 0.92 / nl, -0.39 / nl]);
  }

  /* sections: x, y centre, z centre, half-width, half-height, squareness.
     LERX edge after drawing A: kink at x 4.1 (y 1.0), straight to x 1.7
     (y 2.65), then the wing leading edge. */
  var PLATE = [ls(10.05, 0, -0.15, 0.02, 0.02), ls(9.40, 0, -0.15, 0.25, 0.14, 0.9), ls(8.40, 0, -0.10, 0.62, 0.30, 0.85),
               ls(7.20, 0, 0.00, 0.80, 0.42, 0.8), ls(5.60, 0, 0.00, 0.90, 0.50, 0.65), ls(4.10, 0, -0.05, 1.02, 0.48, 0.55),
               ls(3.30, 0, -0.10, 1.55, 0.42, 0.5), ls(2.30, 0, -0.10, 2.30, 0.34, 0.5), ls(1.70, 0, -0.09, 2.66, 0.33, 0.5),
               ls(0.00, 0, -0.08, 3.15, 0.32, 0.5),
               ls(-2.0, 0, -0.08, 3.15, 0.32, 0.5), ls(-4.5, 0, -0.06, 3.00, 0.30, 0.5), ls(-5.6, 0, -0.04, 2.80, 0.22, 0.5),
               ls(-6.8, 0, 0.00, 2.30, 0.08, 0.5)];
  var BEAM = [ls(3.50, 0, 0.05, 0.55, 0.40, 0.7), ls(0.00, 0, 0.00, 0.90, 0.42, 0.7), ls(-4.5, 0, -0.05, 0.90, 0.42, 0.7),
              ls(-7.5, 0, -0.05, 0.80, 0.40, 0.75), ls(-8.8, 0, -0.05, 0.50, 0.30, 0.85), ls(-9.6, 0, -0.05, 0.22, 0.20),
              ls(-10.05, 0, -0.05, 0.03, 0.03)];
  /* nacelles: centre y 1.42 (drawing A), nozzles end at x -8.65 */
  var NAC_Y = 1.42;
  var NAC = [ls(2.60, 0, -0.65, 0.54, 0.31, 0.5), ls(2.10, 0, -0.74, 0.60, 0.40, 0.5), ls(1.00, 0, -0.80, 0.66, 0.55, 0.55),
             ls(-2.00, 0, -0.55, 0.70, 0.60, 0.65), ls(-5.00, 0, -0.25, 0.68, 0.55, 0.8), ls(-7.00, 0, -0.10, 0.60, 0.52, 0.95),
             ls(-7.95, 0, -0.10, 0.58, 0.51, 1)];
  var BOOM_Y = 2.50;
  var BOOM = [ls(-3.5, 0, 0.02, 0.10, 0.10, 0.8), ls(-4.5, 0, 0.04, 0.40, 0.28, 0.7), ls(-7.0, 0, 0.04, 0.38, 0.26, 0.8),
              ls(-8.5, 0, 0.0, 0.14, 0.14, 1), ls(-9.2, 0, 0.0, 0.03, 0.03, 1)];
  var CANOPY = [ls(7.40, 0, 0.42, 0.08, 0.03), ls(6.90, 0, 0.62, 0.40, 0.26), ls(5.80, 0, 0.72, 0.52, 0.48),
                ls(4.90, 0, 0.62, 0.50, 0.38), ls(4.20, 0, 0.50, 0.30, 0.14)];

  /* the height of the body-plate top skin at (x, y), for panels laid on it */
  function topZ(x, y) {
    var i, a, b, f, w, h, zc, e, r;
    y = Math.abs(y);
    for (i = 0; i < PLATE.length - 1; i++) {
      a = PLATE[i]; b = PLATE[i + 1];
      if (x <= a.x && x >= b.x) {
        f = (a.x - x) / (a.x - b.x);
        w = a.w + (b.w - a.w) * f; h = a.h + (b.h - a.h) * f; zc = a.zc + (b.zc - a.zc) * f; e = a.e + (b.e - a.e) * f;
        r = 1 - Math.pow(Math.min(1, y / w), 2 / e);
        return zc + h * Math.pow(Math.max(0, r), e / 2);
      }
    }
    return 0;
  }
  /* a chain of sections as ONE closed solid (caps only at the two ends, no
     faces buried between segments) */
  function chain(secs) {
    var n = secs[0].length, k, i, out = [], vol = 0, A = secs[0], B = secs[secs.length - 1];
    for (i = 1; i < n - 1; i++) { out.push(A[0], A[i + 1], A[i]); out.push(B[0], B[i], B[i + 1]); }
    for (k = 0; k < secs.length - 1; k++) for (i = 0; i < n; i++) {
      var j = (i + 1) % n, P = secs[k], Q = secs[k + 1];
      out.push(P[i], P[j], Q[j]); out.push(P[i], Q[j], Q[i]);
    }
    for (i = 0; i < out.length; i += 3) {
      var a = out[i], b = out[i + 1], c = out[i + 2];
      vol += a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
    }
    if (vol < 0) for (i = 0; i < out.length; i += 3) { var t = out[i + 1]; out[i + 1] = out[i + 2]; out[i + 2] = t; }
    return tris(out);
  }
  /* a thin flat slab over four plan corners (x, y) lying on the top skin,
     raised rz above it and sunk dz into it */
  function skinSlab(P, rz, dz) {
    var top = [], bot = [], i;
    for (i = 0; i < 4; i++) {
      var z = topZ(P[i][0], P[i][1]);
      top.push([P[i][0], P[i][1], z + rz]); bot.push([P[i][0], P[i][1], z - dz]);
    }
    return solid(top, bot);
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "su57";
    var K = { skin: [], radome: [], dark: [], metal: [], glass: [], team: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, j, k;

    /* ---- body plate (LERX, flat blended body), nose cone, centre beam */
    push(K.skin, loft(PLATE.slice(3), 64, null, 0.0));
    push(K.radome, loft(PLATE.slice(0, 4), 40, 0.0, null));
    push(K.skin, loft(BEAM, 40, 0.0, 0.02));

    /* ---- LEVCONs: the leading-edge root surfaces on the LERX edge from the
       kink to the wing root (photo B, drawing A), flush, with dark hinge
       and gap lines */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(skinSlab([[4.00, s * 1.12], [3.62, s * 0.66], [1.52, s * 2.18], [1.86, s * 2.60]], 0.022, 0.05));
      K.dark.push(bar([4.00, s * 1.12, topZ(4.0, 1.12) + 0.03], [1.86, s * 2.60, topZ(1.86, 2.6) + 0.03], 0.012, 4));
      K.dark.push(bar([3.62, s * 0.66, topZ(3.62, 0.66) + 0.03], [1.52, s * 2.18, topZ(1.52, 2.18) + 0.03], 0.014, 4));
      K.dark.push(bar([4.00, s * 1.12, topZ(4.0, 1.12) + 0.03], [3.62, s * 0.66, topZ(3.62, 0.66) + 0.03], 0.012, 4));
      K.dark.push(bar([1.52, s * 2.18, topZ(1.52, 2.18) + 0.03], [1.86, s * 2.60, topZ(1.86, 2.6) + 0.03], 0.012, 4));
    }

    /* ---- nacelles, caret intakes, nozzles with petals */
    for (s = -1; s <= 1; s += 2) {
      var secs = [];
      for (i = 0; i < NAC.length; i++) { var n0 = NAC[i]; secs.push(ls(n0.x, s * NAC_Y, n0.zc, n0.w, n0.h, n0.e)); }
      push(K.skin, loft(secs, 48, 0.0, 0.0));
      /* intake: raked dark mouth, caret lip frame, a splitter plate and the
         inner ramp, the cowl lip swept so the top edge leads (A, B) */
      var ix = 2.62, iy = s * NAC_Y, iz0 = -0.35, iz1 = -0.96, hw = 0.50;
      K.dark.push(solid([[ix + 0.02, iy - hw, iz0], [ix + 0.02, iy + hw, iz0], [ix - 0.04, iy + hw, iz1], [ix - 0.04, iy - hw, iz1]],
                        [[ix - 0.05, iy - hw, iz0], [ix - 0.05, iy + hw, iz0], [ix - 0.10, iy + hw, iz1], [ix - 0.10, iy - hw, iz1]]));
      K.skin.push(solid([[ix + 0.10, iy - hw - 0.07, iz0 + 0.04], [ix + 0.10, iy + hw + 0.07, iz0 + 0.04], [ix + 0.10, iy + hw + 0.07, iz0 - 0.05], [ix + 0.10, iy - hw - 0.07, iz0 - 0.05]],
                        [[ix - 0.30, iy - hw - 0.09, iz0 + 0.04], [ix - 0.30, iy + hw + 0.09, iz0 + 0.04], [ix - 0.30, iy + hw + 0.09, iz0 - 0.05], [ix - 0.30, iy - hw - 0.09, iz0 - 0.05]]));
      K.skin.push(solid([[ix - 0.04, iy - hw - 0.07, iz1 + 0.03], [ix - 0.04, iy + hw + 0.07, iz1 + 0.03], [ix - 0.04, iy + hw + 0.07, iz1 - 0.05], [ix - 0.04, iy - hw - 0.07, iz1 - 0.05]],
                        [[ix - 0.40, iy - hw - 0.09, iz1 + 0.03], [ix - 0.40, iy + hw + 0.09, iz1 + 0.03], [ix - 0.40, iy + hw + 0.09, iz1 - 0.05], [ix - 0.40, iy - hw - 0.09, iz1 - 0.05]]));
      for (j = -1; j <= 1; j += 2) {
        K.skin.push(solid([[ix + 0.06, iy + j * (hw + 0.02), iz0 + 0.02], [ix + 0.06, iy + j * (hw + 0.10), iz0 + 0.02], [ix - 0.02, iy + j * (hw + 0.10), iz1 + 0.02], [ix - 0.02, iy + j * (hw + 0.02), iz1 + 0.02]],
                          [[ix + 0.06, iy + j * (hw + 0.02), iz0 - 0.04], [ix + 0.06, iy + j * (hw + 0.10), iz0 - 0.04], [ix - 0.02, iy + j * (hw + 0.10), iz1 - 0.04], [ix - 0.02, iy + j * (hw + 0.02), iz1 - 0.04]]));
      }
      /* the inner ramp and splitter plate seen through the mouth */
      K.metal.push(solid([[ix - 0.12, iy - hw + 0.03, iz0 - 0.03], [ix - 0.12, iy + hw - 0.03, iz0 - 0.03], [ix - 0.12, iy + hw - 0.03, iz0 - 0.07], [ix - 0.12, iy - hw + 0.03, iz0 - 0.07]],
                         [[ix - 0.50, iy - hw + 0.03, iz0 - 0.30], [ix - 0.50, iy + hw - 0.03, iz0 - 0.30], [ix - 0.50, iy + hw - 0.03, iz0 - 0.34], [ix - 0.50, iy - hw + 0.03, iz0 - 0.34]]));
      /* nozzle: sixteen petals closing to the exit, a dark bore */
      for (i = 0; i < 16; i++) {
        var a0 = i * 2 * PI / 16, a1 = (i + 0.86) * 2 * PI / 16;
        function np(r, a, x) { return [x, s * NAC_Y + Math.cos(a) * r, -0.10 + Math.sin(a) * r * 0.88]; }
        var pet = solid([np(0.585, a0, -7.95), np(0.585, a1, -7.95), np(0.545, a1, -7.95), np(0.545, a0, -7.95)],
                        [np(0.385, a0, -8.65), np(0.385, a1, -8.65), np(0.345, a1, -8.65), np(0.345, a0, -8.65)]);
        if (i & 1) K.metal.push(pet); else K.dark.push(pet);
      }
      push(K.dark, loft([ls(-7.96, s * NAC_Y, -0.10, 0.52, 0.46), ls(-8.64, s * NAC_Y, -0.10, 0.34, 0.30)], 24, null, 0.0));
      /* outboard tail boom */
      var bs = [];
      for (i = 0; i < BOOM.length; i++) { var b0 = BOOM[i]; bs.push(ls(b0.x, s * BOOM_Y, b0.zc, b0.w, b0.h, b0.e)); }
      push(K.skin, loft(bs, 24, null, 0.0));
    }

    /* ---- canopy, sill rails, arch frames, windscreen bow; IRST on the nose */
    push(K.glass, loft(CANOPY, 28, 0.02, 0.02));
    function canopyAt(x) {
      for (var q = 0; q < CANOPY.length - 1; q++) {
        var a = CANOPY[q], b = CANOPY[q + 1];
        if (x <= a.x && x >= b.x) {
          var f = (a.x - x) / (a.x - b.x);
          return ls(x, 0, a.zc + (b.zc - a.zc) * f, a.w + (b.w - a.w) * f, a.h + (b.h - a.h) * f, 1);
        }
      }
      return CANOPY[0];
    }
    var archX = [6.55, 5.50, 4.55];
    for (j = 0; j < archX.length; j++) {
      var cs = canopyAt(archX[j]), pr = ringOf(cs, 24), prev = null;
      for (k = 0; k < pr.length; k++) {
        if (pr[k][1] < cs.zc - 0.02) { prev = null; continue; }
        var cur = [archX[j], pr[k][0], pr[k][1] + 0.012];
        if (prev) K.dark.push(bar(prev, cur, j === 0 ? 0.026 : 0.018, 4));
        prev = cur;
      }
    }
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(bar([7.15, s * 0.22, 0.44], [5.80, s * 0.52, 0.24], 0.022, 4));
      K.dark.push(bar([5.80, s * 0.52, 0.24], [4.35, s * 0.30, 0.48], 0.022, 4));
    }
    K.dark.push(bar([7.15, -0.22, 0.44], [7.15, 0.22, 0.44], 0.02, 4));
    /* IRST: fairing and ball ahead of the windscreen, just starboard (A) */
    K.metal.push(cyl(0.12, 0.14, 0.30, 16, "x", 7.62, -0.14, 0.34));
    K.glass.push(new V.SphereGeometry(0.115, 16, 10).translate(7.80, -0.14, 0.34));

    /* ---- wings: one chained solid a side; team strips on the outer wing */
    for (s = -1; s <= 1; s += 2) {
      var sts = [WY0, 3.6, 4.6, 5.6, 6.4, HALFSPAN], wl = [];
      for (i = 0; i < sts.length; i++) wl.push(wPart(sts[i], s, 0, 1));
      K.skin.push(chain(wl));
      K.team.push(solid(blk2(5.6, s, 0.30, 0.62, wT(5.6) * 0.47 + 0.01), blk2(6.3, s, 0.30, 0.62, wT(6.3) * 0.47 + 0.01)));
    }

    /* ---- tailplanes (A: root chord x -5.5 to -9.2 at y 2.5, tip chord
       x -8.0 to -8.8 at y 5.0): all-moving, low; pivots */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(chain([foil([-5.50, s * 2.55, 0.0], [-9.20, s * 2.55, 0.0], 0.22, [0, 0, 1]),
                         foil([-6.70, s * 3.75, 0.0], [-9.00, s * 3.75, 0.0], 0.13, [0, 0, 1]),
                         foil([-8.00, s * 5.00, 0.0], [-8.80, s * 5.00, 0.0], 0.05, [0, 0, 1])]));
      K.metal.push(cyl(0.10, 0.10, 0.40, 12, "y", -7.40, s * 2.55, 0.0));
    }

    /* ---- all-moving canted fins, a root fairing */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(chain([finPart(0, s), finPart(0.5, s), finPart(1.0, s)]));
      K.skin.push(box(1.8, 0.22, 0.12, -6.2, s * 2.62, 0.20));
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");

    /* ---- landing gear (B): twin-wheel nose leg under the cockpit with two
       doors, single-wheel main legs at the wing roots with a leg door each;
       tyres are the lowest part */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 5.00, nr = 0.30, nz = GROUND + nr;
    G.metal.push(bar([nx + 0.1, 0, -0.45], [nx, 0, nz + 0.10], 0.055, 10));
    G.metal.push(bar([nx + 0.07, 0, -0.78], [nx + 0.03, 0, nz + 0.30], 0.075, 12));   /* oleo sleeve */
    G.metal.push(bar([nx, -0.15, nz], [nx, 0.15, nz], 0.035, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.16, 28, "y", nx, s * 0.15, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.17, 16, "y", nx, s * 0.15, nz));
      G.dark.push(cyl(nr * 0.30, nr * 0.30, 0.19, 10, "y", nx, s * 0.15, nz));
      G.dark.push(box(0.60, 0.04, 0.48, nx + 0.15, s * 0.42, -0.50, 0, 0, s * 0.28));      /* nose gear doors */
    }
    G.dark.push(box(0.50, 0.04, 0.34, nx + 0.55, 0, -0.52));
    G.metal.push(bar([nx - 0.9, 0, -0.45], [nx + 0.04, 0, nz + 0.9], 0.03, 6));  /* drag strut */
    G.metal.push(bar([nx + 0.20, 0, -0.55], [nx - 0.15, 0, -0.95], 0.02, 5));    /* torque links */
    G.metal.push(box(0.10, 0.06, 0.07, nx + 0.28, 0.0, nz + 0.45));              /* landing light */
    var mx = -0.60, mr = 0.50, mz = GROUND + mr, my = 2.15;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.05, s * my, -0.42], [mx, s * my, mz + 0.05], 0.07, 10));
      G.metal.push(bar([mx + 0.07, s * my, -0.85], [mx + 0.03, s * my, mz + 0.35], 0.095, 12));
      G.tyre.push(cyl(mr, mr, 0.32, 36, "y", mx, s * (my + 0.14), mz));
      G.metal.push(cyl(mr * 0.58, mr * 0.58, 0.33, 18, "y", mx, s * (my + 0.14), mz));
      G.dark.push(cyl(mr * 0.34, mr * 0.34, 0.35, 12, "y", mx, s * (my + 0.14), mz));
      G.metal.push(bar([mx - 0.7, s * my, -0.42], [mx - 0.05, s * my, mz + 0.35], 0.03, 6));
      G.metal.push(bar([mx + 0.25, s * my, -0.60], [mx - 0.1, s * my, mz + 0.55], 0.022, 5));
      G.dark.push(box(1.10, 0.05, 0.55, mx - 0.1, s * (my - 0.52), -0.55, 0, 0, s * 0.35));   /* leg door */
      G.dark.push(box(0.90, 0.05, 0.40, mx - 0.1, s * (my - 1.00), -0.40, 0, 0, s * 0.10));   /* inner bay door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the x extent: nose tip (10.05) to the sting end (-10.05) */
UNIT_MODELS["stealth_p"] = { len: 20.1, build: HeroSu57.build };
