/* ============ ru_su17.js - HERO model: Sukhoi Su-17M "Fitter-C" ============
   One airframe, two fits, for the e60 Pact fighter-bomber rows:
     pact_e60_cas   "Su-17 Fitter"    (Sukhoi Su-17M Fitter-C, 1970 row)
     pact_e60_sead  "Su-17M (Kh-28)"  the same aeroplane with its one Kh-28
   No other army's row uses this file.

   References (Wikimedia Commons unless said):
     A "Sukhoi Su-17 3-view line drawing.png" (Su-17M2/Su-22 three-view,
       wings swept, the spread position dashed): planform
     B "Sukhoi Su-17, Su-17M and Su-17M2 side-view silhouettes.png": the
       Su-17M profile, measured column by column for the station table
     C "Sukhoi Su-17 silhouettes illustrating external stores.png"
     D "SSSR-Su-17M(DN-SN-83-06774).jpg" (US DoD 1983, from below)
     E "Su-17M.jpg" (US DoD 1985, starboard rear, landing)
     F "Sukhoi Su-17M Sukhoi Su-17M cn 26918 Khodinka Air Force Museum
       Sep93" (a Soviet Su-17M in its natural-metal finish, port side)
     G "Berlin Gatow Luftwaffenmuseum Sukhoi Su-20 Fitter C 01/03" (the
       export Su-17M, starboard side: spine, fillet, fence, pods, nose)
     H "Sukhoi Su-17M, Russia - Air Force AN1661641.jpg" (intake and cone)
     K "Dissembling Kh-28 AS-9 Kyle.png" (the missile's tail)
     R Russian Wikipedia "Kh-28": "the Su-17M, built from 1972, could carry
       only ONE Kh-28, under the fuselage (PU-28S launcher; the Metel-A pod
       on a pylon under the fixed wing)"; a belly panel recessed for the
       missile's upper fin, the lower fin folded; delta wing, trapezoidal
       panels with a 75 degree leading edge and a straight trailing edge,
       cruciform all-moving tail, ogive radome, a dorsal conduit.
   Published figures: length 18.75 m over the probe, span 13.68 m spread
   and 10.02 m swept, height 5.0 m; Kh-28 5.97 m long, 0.43 m across,
   1.93 m span. This model: 18.75 / 13.68 / 5.0.

   Recognition list (what makes it a Fitter at game zoom), and its source:
    1. the round nose that IS the intake, a two-step shock cone standing out
       of the lip, its tip green dielectric - B, F, H
    2. the deep straight dorsal spine from the canopy to the fin, faired
       into the body, level with the canopy top - B, F, G
    3. the small framed canopy, windscreen and hood, standing just proud of
       the spine - B, F, G
    4. the tall swept fin with a long concave dorsal fillet, a square-cut tip
       with a green cap, the brake-chute box at its base - B, E, F, G
    5. the fixed glove with its 63-degree leading edge, the big boundary
       fence at the pivot, the outer panels spread (30 degrees) - A, D, F, G
    6. the low all-moving tailplane, anti-flutter rods at the tips - A, D, E
    7. long air-data boom to starboard, a short one to port - D, G
    8. NR-30 muzzles in the glove roots - D, G
    9. the airbrakes on the rear fuselage, the nozzle petals - E, G
   10. pylons: two under the fuselage, three under each glove - C, D, G
   11. natural metal, red stars on the fin - F (see paint)
   12. sead: ONE Kh-28 on the centreline, lower fin folded - R, K

   Paint: the rows are 1970 and 1973. F, a Soviet Su-17M kept in the finish
   it served in, is natural metal (silver) overall with a dark-green
   dielectric cone tip and fin cap and a dielectric panel low on the fin
   leading edge; the camouflage of D and E is the 1980s finish and is not
   used. Silver sampled off F about #a8b4bc under an overcast blue cast,
   neutralised and taken to 0.8: #93999b to #a0a5a6 by panel. Red stars on
   the fin (F, E) and under the outer wings (D); no bort numbers (F's "95"
   is left off). Team colour exactly C.team, two small strips on the upper
   outer wings.

   Corrections to the previous file: the canopy stood 0.2 m low, under the
   spine (B, F, G put it level with or above the spine); the fin's top chord
   was 1.2 m (B: 1.5 m) and it had no dorsal fillet; the spine was a
   separate tube on a round body, now one lofted section; the sead fit had
   TWO Kh-28 under the gloves (C, a later variant's load) - R says the
   Su-17M took one, under the fuselage. C's tanks on the fence pylons are
   kept for it (D shows them there on a Su-17M). The Metel-A pod is not
   drawn: no reference gives its shape or size. Which way the missile's
   lower fin folds is not in R: it is drawn folded to starboard, lying
   15 degrees under the starboard tail fin.
   Variable sweep: render3d.js moves no wing panels and only carrier types
   fold, so the outer panels are drawn spread, the span the rows give.
   Gear retracts (E: in flight, gear up and down): group "gear".
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu17 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -2.03;                 /* tyre bottoms: 5.0 m under the fin tip */
  var FIN_TOP = 2.97;

  var PXM = 48, XMIN = -9.2, TW = 960;
  var TOPH = 696, SIDEH = 224, TH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 7.25, ZTOP = 3.4, ZSPAN = 4.6;

  /* natural metal by panel (F), dielectric green (F), stars */
  var PAL = { a: "#9a9fa1", b: "#a0a5a6", c: "#93999b", d: "#979da0", diel: "#33493a" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxY(y) { return (YMAX - y) * PXM; }

  /* the Soviet star: red, a white border and a thin red edge */
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
    g.fillStyle = "#a8261f"; path(1.24); g.fill();
    g.fillStyle = "#e2e0d8"; path(1.12); g.fill();
    g.fillStyle = "#b22a22"; path(1.0); g.fill();
  }

  /* fuselage panel joints, model x (from F and G: the frames at the
     cockpit, the gun bay, the wing box, the engine break, the tail) */
  var FRAMES = [7.30, 6.70, 6.10, 4.40, 3.60, 2.70, 1.50, 0.30, -1.10, -2.40, -3.50, -4.60, -5.70, -6.70, -7.30];

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 17101, i, b, x, y, k, w;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    var tones = [PAL.a, PAL.b, PAL.c, PAL.d];
    g.fillStyle = PAL.a; g.fillRect(0, 0, TW, TH);
    /* panels: each bay between two frames, split into strakes, a tone each */
    for (b = 0; b < 4; b++) {
      for (i = 0; i < FRAMES.length + 1; i++) {
        var xa = i === 0 ? 10.5 : FRAMES[i - 1], xb = i === FRAMES.length ? -9.2 : FRAMES[i];
        var nStr = b === 0 || b === 3 ? 7 : 3;
        for (k = 0; k < nStr; k++) {
          g.fillStyle = tones[(R() * 4) | 0];
          g.fillRect(pxX(xa), bandY[b] + bandH[b] * k / nStr, pxX(xb) - pxX(xa), bandH[b] / nStr + 1);
        }
      }
    }
    /* a soft sheen on the upper surfaces, darker underside, so the metal
       reads as metal and not as grey paint */
    var gr = g.createLinearGradient(0, bandY[1], 0, bandY[1] + SIDEH);
    gr.addColorStop(0, "rgba(255,255,255,0.10)"); gr.addColorStop(0.5, "rgba(0,0,0,0)"); gr.addColorStop(1, "rgba(0,0,0,0.12)");
    g.fillStyle = gr; g.fillRect(0, bandY[1], TW, SIDEH);
    gr = g.createLinearGradient(0, bandY[2], 0, bandY[2] + SIDEH);
    gr.addColorStop(0, "rgba(255,255,255,0.10)"); gr.addColorStop(0.5, "rgba(0,0,0,0)"); gr.addColorStop(1, "rgba(0,0,0,0.12)");
    g.fillStyle = gr; g.fillRect(0, bandY[2], TW, SIDEH);
    g.fillStyle = "rgba(0,0,0,0.07)"; g.fillRect(0, bandY[3], TW, TOPH);
    /* the hot section: the engine bay aft of the last frame darkens (G) */
    for (b = 0; b < 4; b++) {
      var hx0 = pxX(-5.7), hx1 = pxX(-8.0);
      var hg = g.createLinearGradient(hx0, 0, hx1, 0);
      hg.addColorStop(0, "rgba(111,106,98,0)"); hg.addColorStop(1, "rgba(92,86,78,0.55)");
      g.fillStyle = hg; g.fillRect(hx1, bandY[b], hx0 - hx1, bandH[b]);
    }
    /* frame joints, strake joints and rivet rows */
    g.strokeStyle = "rgba(20,24,26,0.42)"; g.lineWidth = 1.2;
    for (b = 0; b < 4; b++) for (i = 0; i < FRAMES.length; i++) {
      x = pxX(FRAMES[i]); g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke();
    }
    g.strokeStyle = "rgba(20,24,26,0.22)"; g.lineWidth = 1;
    for (b = 1; b <= 2; b++) for (k = 1; k < 3; k++) {
      y = bandY[b] + SIDEH * k / 3; g.beginPath(); g.moveTo(0, y); g.lineTo(TW, y); g.stroke();
    }
    g.fillStyle = "rgba(30,34,36,0.28)";
    for (b = 0; b < 4; b++) for (i = 0; i < FRAMES.length; i++) {
      x = pxX(FRAMES[i]) + 3;
      for (y = bandY[b] + 2; y < bandY[b] + bandH[b] - 2; y += 5) g.fillRect(x, y, 1.2, 1.2);
    }
    /* access hatches, as F and G show them along the sides */
    var HATCH = [[5.2, 0.05, 0.5, 0.35], [3.2, -0.25, 0.7, 0.30], [1.0, 0.25, 0.6, 0.30], [-2.0, 0.10, 0.9, 0.35], [-4.3, -0.20, 0.6, 0.30], [-6.2, 0.30, 0.5, 0.25]];
    g.strokeStyle = "rgba(20,24,26,0.40)";
    for (b = 1; b <= 2; b++) for (i = 0; i < HATCH.length; i++) {
      var h = HATCH[i];
      g.strokeRect(pxX(h[0]), sideZ(h[1] + h[3] / 2, b), h[2] * PXM, h[3] / ZSPAN * SIDEH);
    }
    /* streaks and weathering */
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(40,40,38," + (0.03 + R() * 0.06).toFixed(3) + ")";
      w = 14 + R() * 60; g.fillRect(R() * TW, R() * TH, w, 1.5 + R() * 4);
    }
    /* the fin: green dielectric cap and the strip low on its leading edge (F) */
    for (b = 1; b <= 2; b++) {
      g.fillStyle = PAL.diel;
      g.beginPath();
      g.moveTo(pxX(-4.25), sideZ(1.02, b)); g.lineTo(pxX(-4.95), sideZ(1.43, b));
      g.lineTo(pxX(-5.35), sideZ(1.43, b)); g.lineTo(pxX(-4.70), sideZ(1.02, b)); g.closePath(); g.fill();
      star(g, pxX(-7.00), sideZ(2.05, b), 0.40 * PXM, 0.40 * SIDEH / ZSPAN);
    }
    /* red stars under the outer wings (D) */
    star(g, pxX(-3.05), bandY[3] + pxY(4.95), 0.55 * PXM, 0.55 * PXM);
    star(g, pxX(-3.05), bandY[3] + pxY(-4.95), 0.55 * PXM, 0.55 * PXM);
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
      var band = nz > 0.62 ? 0 : nz < -0.62 ? 3 : (ny >= 0 ? 1 : 2);
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.50, metalness: 0.35 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x9a9fa1);
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6d7376, roughness: 0.45, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x3b525a, roughness: 0.08, metalness: 0.45 });
    m.pale  = new V.MeshStandardMaterial({ color: 0x9da2a3, roughness: 0.50, metalness: 0.40 });
    m.diel  = new V.MeshStandardMaterial({ color: 0x33493a, roughness: 0.60, metalness: 0.05 });
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
  /* a closed solid between two sections with the same number of corners */
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
  /* a rectangular block section on a lifting surface, between chord fractions
     f0 and f1, half-thickness h along nrm: the team flashes */
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }

  /* ---- the loft. A section is a superellipse (e 1 round) with, on its upper
     half, the dorsal spine added as a smooth bump of height sp and half-width
     sw, so body and spine are ONE surface with a faired fillet (B, F, G).
     Sections run from the nose to the tail (decreasing x) and the quads are
     wound (a, c, b), which for that order puts every normal outward. */
  function ls(x, yc, zc, w, h, e, sp, sw) {
    return { x: x, yc: yc, zc: zc, w: w, h: h, e: e || 1, sp: sp || 0, sw: sw || 0.4 };
  }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn, y, z, u;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      y = s.w * sgn(c) * Math.pow(Math.abs(c), s.e);
      z = s.h * sgn(sn) * Math.pow(Math.abs(sn), s.e);
      if (s.sp > 0 && sn > 0) {
        u = Math.abs(y) / s.sw;
        if (u < 1) z += s.sp * Math.pow(1 - u * u, 1.7);
      }
      o.push([s.yc + y, s.zc + z]);
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

  /* ---------------------------------------------------------- station table
     From B, measured every 0.3 m at 13.3 px/m (top of spine / belly), and A
     (body 1.55 m across): x, centre z, half-width, half-height, spine height
     above the round body, spine half-width. Spine top 0.96, belly -0.86 over
     the wing; the nose droops to an intake centred at z -0.17 (B, G). */
  var FUS = [
    ls(7.62, 0, -0.170, 0.452, 0.452),
    ls(7.30, 0, -0.152, 0.505, 0.525),
    ls(6.90, 0, -0.145, 0.560, 0.575),
    ls(6.40, 0, -0.135, 0.615, 0.630),
    ls(5.90, 0, -0.120, 0.660, 0.680),
    ls(5.40, 0, -0.100, 0.700, 0.720),
    ls(4.90, 0, -0.090, 0.730, 0.750),
    ls(4.65, 0, -0.088, 0.740, 0.760, 1, 0.05, 0.30),
    ls(4.40, 0, -0.085, 0.752, 0.770, 1, 0.24, 0.40),
    ls(4.00, 0, -0.083, 0.762, 0.775, 1, 0.27, 0.42),
    ls(3.00, 0, -0.080, 0.770, 0.778, 1, 0.27, 0.43),
    ls(1.50, 0, -0.080, 0.775, 0.780, 1, 0.27, 0.43),
    ls(0.00, 0, -0.080, 0.775, 0.780, 1, 0.27, 0.43),
    ls(-1.50, 0, -0.080, 0.775, 0.780, 1, 0.26, 0.43),
    ls(-3.00, 0, -0.075, 0.770, 0.775, 1, 0.255, 0.42),
    ls(-4.20, 0, -0.060, 0.758, 0.765, 1, 0.24, 0.38),
    ls(-5.20, 0, -0.035, 0.735, 0.745, 1, 0.21, 0.33),
    ls(-6.20, 0, 0.000, 0.700, 0.710, 1, 0.17, 0.28),
    ls(-6.90, 0, 0.030, 0.665, 0.675, 1, 0.13, 0.24),
    ls(-7.40, 0, 0.050, 0.630, 0.640, 1, 0.09, 0.20),
    ls(-7.66, 0, 0.060, 0.600, 0.615, 1, 0.06, 0.18)
  ];
  var ICZ = -0.170;                    /* intake centre */
  /* the lip, inside the duct round to the outside, one profile [x, r] */
  var LIP = [[7.30, 0.385], [7.62, 0.392], [7.69, 0.408], [7.70, 0.428], [7.665, 0.446], [7.60, 0.452]];
  /* canopy (B, F, G): windscreen 6.30-5.85, the hood glass to 5.02, then the
     hood's metal rear fairing down into the spine; its top 1.07, standing clear of
     the spine */
  var GLASS = [ls(6.34, 0, 0.50, 0.12, 0.10), ls(6.14, 0, 0.50, 0.35, 0.33), ls(5.86, 0, 0.50, 0.43, 0.50),
               ls(5.60, 0, 0.50, 0.445, 0.56), ls(5.25, 0, 0.50, 0.445, 0.575), ls(4.95, 0, 0.50, 0.44, 0.57)];
  var HOOD = [ls(4.98, 0, 0.50, 0.442, 0.572), ls(4.70, 0, 0.50, 0.425, 0.545), ls(4.40, 0, 0.50, 0.385, 0.49),
              ls(4.10, 0, 0.50, 0.31, 0.44)];

  /* ------------------------------------------------------------ planform --
     Glove (fixed), measured on A and kept from the previous file (it lies on
     A's lines): body side y 0.76, leading edge x 2.55 there, swept 63.8
     degrees to the boundary fence at y 2.70 (x -1.40); trailing edge unswept
     at x -3.40. Outer panel, spread (A's dashed outline, D): leading edge 30
     degrees from x -1.42 at y 2.72 to x -3.80 at the tip, y 6.84; trailing
     edge -3.78 to -4.68. A's front view has the lower surface level from root
     to tip: no anhedral. Thickness 0.34 m at the root to 0.06. */
  var ROOT = 0.62, BODY = 0.76, PIV = 2.70, PO = 2.73, TIP = 6.84;
  var ZLOW = -0.20;                    /* the level lower surface: a mid-low wing (B, G) */
  function gLE(y) { return 2.55 - (y - BODY) * 2.036; }
  function gTE(y) { return -3.40 - (y - BODY) * 0.026; }
  function gZ(y)  { return ZLOW + gT(y) / 2; }
  function gT(y)  { return 0.34 - (y - ROOT) * 0.048; }
  function oLE(y) { return -1.42 - (y - PO) * 0.5774; }
  function oTE(y) { return -3.78 - (y - PO) * 0.219; }
  function oZ(y)  { return ZLOW + oT(y) / 2; }
  function oT(y)  { return 0.17 - (y - PO) * 0.027; }
  function wLE(y) { return y <= PIV ? gLE(y) : oLE(y); }
  function wTE(y) { return y <= PIV ? gTE(y) : oTE(y); }
  function wZ(y)  { return y <= PIV ? gZ(y) : oZ(y); }
  function wT(y)  { return y <= PIV ? gT(y) : oT(y); }
  /* a chordwise slice of the wing between chord fractions f0..f1 */
  function wPart(y, s, f0, f1, tk) {
    var le = wLE(y), te = wTE(y), c = le - te;
    return foil([le - c * f0, s * y, wZ(y)], [le - c * f1, s * y, wZ(y)], wT(y) * (tk || 1), [0, 0, 1]);
  }

  /* fin (B): root in the spine at z 0.80, leading edge through (-4.68, 1.32)
     and (-7.42, 2.97), a 1.5 m square-cut tip, trailing edge raked */
  function finF(z) { return (z - 0.80) / (FIN_TOP - 0.80); }
  function finLE(z) { return -3.82 - (z - 0.80) * 1.66; }
  function finTE(z) { return -7.98 - finF(z) * 0.90; }
  function finT(z) { return 0.32 - finF(z) * 0.20; }
  function finPart(z, f0, f1) {
    var le = finLE(z), te = finTE(z), c = le - te;
    return foil([le - c * f0, 0, z], [le - c * f1, 0, z], finT(z), [0, 1, 0]);
  }
  /* the dorsal fillet's concave leading edge, B: [z, x] */
  var FILLET = [[0.86, -3.10], [0.96, -3.48], [1.06, -3.86], [1.16, -4.20], [1.26, -4.50], [1.34, -4.71]];

  /* stores, profiles [x fraction, radius fraction] nose first */
  var P_TANK = [[0.50, 0.04], [0.44, 0.40], [0.34, 0.80], [0.22, 0.98], [0.10, 1.0], [-0.22, 1.0], [-0.36, 0.86], [-0.46, 0.52], [-0.50, 0.10]];
  var P_POD  = [[0.50, 0.70], [0.47, 0.94], [0.42, 1.0], [-0.40, 1.0], [-0.47, 0.90], [-0.50, 0.80]];
  /* Kh-28 (R): ogive radome, a body of varying diameter, blunt tail */
  var P_KH   = [[0.50, 0.03], [0.47, 0.36], [0.43, 0.66], [0.385, 0.88], [0.34, 0.97], [0.29, 1.0], [0.05, 1.0],
                [0.00, 0.95], [-0.42, 0.95], [-0.47, 0.90], [-0.50, 0.80]];

  /* a pylon: a slim faceted blade from the wing (zTop) down to zBot */
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
  /* one flat fin on a store: root chord from x back chordR, swept back by
     sweep to a tip chord chordT at span out along angle a, thickness th */
  function fin1(list, x, y, z, chordR, chordT, sweep, r0, span, a, th) {
    var cy = Math.cos(a), cz = Math.sin(a), r1 = r0 + span;
    var A = [x, y + cy * r0, z + cz * r0], B = [x - chordR, y + cy * r0, z + cz * r0];
    var Cc = [x - sweep - chordT, y + cy * r1, z + cz * r1], D = [x - sweep, y + cy * r1, z + cz * r1];
    var nY = -cz * th, nZ = cy * th;
    list.push(solid([[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                    [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]));
  }
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th) {
    for (var k = 0; k < 4; k++) fin1(list, x, y, z, chordR, chordT, sweep, 0, span, ang + k * PI / 2, th);
  }
  /* the underside of the glove at lateral station y (for hanging pylons) */
  function underAt(y) { return wZ(y) - wT(y) * 0.40; }
  var BELLY_PYL = -1.00;               /* the fuselage pylons' shoe */

  function store(K, kind, x, y, zTop) {
    var len, r, zc, j;
    if (kind === "tank") {               /* 820 l drop tank (C), 4.4 m, 0.62 m across */
      len = 4.4; r = 0.31; zc = zTop - 0.06 - r;
      push(K.pale, revolve(P_TANK, len, r, x, y, zc, 22, 0, 0));
      fins(K.pale, x - len * 0.36, y, zc, 0.55, 0.28, 0.22, r + 0.30, PI / 4, 0.012);
    } else if (kind === "ub32") {        /* UB-32 rocket pod (C, G), 0.48 m across */
      len = 2.4; r = 0.24; zc = zTop - 0.04 - r;
      push(K.pale, revolve(P_POD, len, r, x, y, zc, 22, 0, 0));
      K.dark.push(cyl(r * 0.80, r * 0.80, 0.02, 20, "x", x + len * 0.5 + 0.005, y, zc));
      for (j = 0; j < 12; j++) {          /* the outer ring of tube mouths (G) */
        var a = j * PI / 6;
        K.metal.push(cyl(0.034, 0.034, 0.03, 5, "x", x + len * 0.5 + 0.01, y + Math.cos(a) * r * 0.62, zc + Math.sin(a) * r * 0.62));
      }
    } else if (kind === "kh28") {
      /* Kh-28 (R, K): 5.97 m, 0.43 m across. Delta wings, two panels, 75
         degree leading edge, straight trailing edge, 1.93 m span; cruciform
         all-moving tail in +, the upper fin up into the belly recess, the
         lower one folded; a dorsal conduit; on the PU-28S under the belly */
      len = 5.97; r = 0.215; zc = zTop - r;
      push(K.pale, revolve(P_KH, len, r, x, y, zc, 24, 0, 0));
      K.dark.push(cyl(r * 0.55, r * 0.62, 0.08, 16, "x", x - len * 0.5 - 0.04, y, zc));       /* nozzle */
      K.pale.push(box(len * 0.66, 0.08, 0.07, x - len * 0.06, y, zc + r * 0.95 + 0.02));     /* conduit */
      var wx = x + 0.90;                  /* wing root LE; TE 2.9 m aft */
      for (j = -1; j <= 1; j += 2)
        fin1(K.pale, wx, y, zc, 2.90, 0.10, 2.80, r * 0.95, 0.965 - r * 0.95, j > 0 ? 0 : PI, 0.016);
      var tx = x - len * 0.5 + 0.86;      /* tail fins: 0.85 root chord, 0.55 out */
      fin1(K.pale, tx, y, zc, 0.85, 0.36, 0.50, r * 0.9, 0.55, 0, 0.014);
      fin1(K.pale, tx, y, zc, 0.85, 0.36, 0.50, r * 0.9, 0.55, PI, 0.014);
      fin1(K.pale, tx, y, zc, 0.85, 0.36, 0.50, r * 0.9, 0.55, PI / 2, 0.014);
      fin1(K.pale, tx, y, zc, 0.85, 0.36, 0.50, r * 0.9, 0.55, -PI / 2 - 1.31, 0.014);    /* folded */
    }
  }

  function buildAirframe(THREE, C, cfg) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = cfg.node;
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], pale: [], diel: [] };
    var G = { metal: [], tyre: [], dark: [], skin: [] };
    var s, i, y;

    /* ---- fuselage with its spine, intake lip, duct, shock cone, nozzle */
    push(K.skin, loft(FUS, 46, null, null));
    var lipS = [];
    for (i = 0; i < LIP.length; i++) lipS.push(ls(LIP[i][0], 0, ICZ, LIP[i][1], LIP[i][1]));
    push(K.skin, loft(lipS, 44, null, null));
    /* the duct: sections in increasing x, so the faces look in */
    push(K.dark, loft([ls(6.70, 0, ICZ, 0.36, 0.36), ls(7.30, 0, ICZ, 0.385, 0.385)], 30, null, null));
    K.dark.push(cyl(0.37, 0.37, 0.02, 24, "x", 6.72, 0, ICZ));
    /* the cone (H, F): metal rear step, green dielectric front, on its strut */
    push(K.metal, revolve([[0.5, 0.80], [0.22, 0.92], [-0.18, 0.99], [-0.5, 1.0]], 0.62, 0.31, 7.36, 0, ICZ, 24, null, 0));
    push(K.diel, revolve([[0.5, 0.0], [0.30, 0.34], [0.05, 0.63], [-0.30, 0.78], [-0.5, 0.80]], 0.58, 0.31, 7.95, 0, ICZ, 24, 0, null));
    K.dark.push(cyl(0.04, 0.04, 0.30, 8, "x", 6.95, 0, ICZ));
    /* auxiliary intake doors behind the lip (G): two each side */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      var dz = ICZ + (i ? -0.17 : 0.17), dx = 6.95;
      var rr = Math.sqrt(Math.max(0.01, 0.56 * 0.56 - (dz + 0.145) * (dz + 0.145)));
      K.metal.push(box(0.36, 0.02, 0.15, dx, s * (rr + 0.005), dz));
    }
    /* nozzle: the afterburner shroud and the petals, a dark bore */
    push(K.metal, loft([ls(-7.62, 0, 0.06, 0.60, 0.61), ls(-7.80, 0, 0.06, 0.585, 0.59), ls(-7.98, 0, 0.06, 0.55, 0.55)], 28, null, null));
    push(K.dark, loft([ls(-7.96, 0, 0.06, 0.50, 0.50), ls(-7.50, 0, 0.06, 0.47, 0.47)], 24, null, 0.0));
    for (i = 0; i < 14; i++) {            /* petal seams */
      var pa = i * 2 * PI / 14;
      K.dark.push(bar([-7.66, Math.cos(pa) * 0.60, 0.06 + Math.sin(pa) * 0.61], [-7.97, Math.cos(pa) * 0.552, 0.06 + Math.sin(pa) * 0.552], 0.009, 4));
    }
    /* brake-chute box under the rudder (B, E, G) */
    push(K.skin, loft([ls(-7.40, 0, 0.74, 0.10, 0.10), ls(-7.70, 0, 0.74, 0.17, 0.17), ls(-8.30, 0, 0.74, 0.17, 0.17), ls(-8.44, 0, 0.74, 0.12, 0.12)], 16, 0.05, 0.02));
    /* four airbrakes round the rear fuselage ahead of the tailplane (E, G) */
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) {
      var ab = (i > 0 ? 0.62 : -0.55);
      K.skin.push(box(1.10, 0.03, 0.40, -5.30, s * Math.cos(ab) * 0.745, -0.035 + Math.sin(ab) * 0.745, s * ab, 0, 0));
    }
    /* spine antennae and the belly blade */
    K.dark.push(box(0.36, 0.05, 0.10, -1.2, 0, 1.00));
    K.dark.push(box(0.26, 0.04, 0.08, 2.2, 0, 1.00));
    K.dark.push(box(0.30, 0.03, 0.30, 2.5, 0, -0.96));

    /* ---- canopy: windscreen and hood glass, the hood's metal rear, frames */
    push(K.glass, loft(GLASS, 24, 0.03, null));
    push(K.skin, loft(HOOD, 24, null, 0.10));
    var arch = function (x, w, h, r) {
      var pts = [], k;
      for (k = 0; k <= 10; k++) { var t = PI * k / 10; pts.push([x, Math.cos(t) * (w + 0.012), 0.50 + Math.sin(t) * (h + 0.012)]); }
      for (k = 0; k < 10; k++) K.dark.push(bar(pts[k], pts[k + 1], r, 5));
    };
    arch(5.86, 0.43, 0.50, 0.028);         /* windscreen arch */
    arch(4.97, 0.44, 0.57, 0.024);       /* hood glass, rear */
    for (s = -1; s <= 1; s += 2) {         /* windscreen side frames and the hood sill */
      K.dark.push(bar([6.33, s * 0.10, 0.60], [5.87, s * 0.23, 0.95], 0.018, 5));
      K.dark.push(bar([5.86, s * 0.435, 0.51], [4.97, s * 0.445, 0.51], 0.020, 5));
    }
    K.metal.push(box(0.16, 0.06, 0.06, 5.30, 0, 1.095));                 /* rear-view periscope */
    K.dark.push(box(0.34, 0.30, 0.38, 5.20, 0, 0.66));                  /* ejection seat head */
    /* air data booms (D, G): the long one to starboard, a short one to port */
    K.metal.push(cyl(0.022, 0.045, 2.70, 8, "x", 8.51, -0.40, 0.18));   /* to x 9.86 */
    K.metal.push(cyl(0.05, 0.08, 0.40, 8, "x", 7.05, -0.40, 0.18));
    K.metal.push(box(0.025, 0.24, 0.012, 9.45, -0.40, 0.18));
    K.metal.push(box(0.025, 0.012, 0.18, 9.30, -0.40, 0.18));
    K.metal.push(cyl(0.016, 0.035, 1.30, 8, "x", 8.05, 0.40, 0.16));
    K.metal.push(box(0.10, 0.02, 0.10, 6.6, -0.56, 0.12));              /* AoA vane */

    /* ---- glove, fences, outer panels with slats, flaps and ailerons */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(wPart(ROOT, s, 0, 0.84), wPart(1.6, s, 0, 0.84)));
      K.skin.push(solid(wPart(1.6, s, 0, 0.84), wPart(PIV, s, 0, 0.84)));
      K.skin.push(solid(wPart(BODY, s, 0.855, 1.0, 0.9), wPart(PIV - 0.03, s, 0.855, 1.0, 0.9)));
      /* the boundary fence at the pivot: full chord, above and below (A, D, G) */
      var fx0 = wLE(PIV) + 0.25, fx1 = wTE(PIV) - 0.05, fz = wZ(PIV);
      K.skin.push(solid(
        [[fx0 + 0.25, s * (PIV - 0.02), fz - 0.02], [fx1, s * (PIV - 0.02), fz + 0.08], [fx1 + 0.3, s * (PIV - 0.02), fz + 0.40], [fx0 - 1.0, s * (PIV - 0.02), fz + 0.36]],
        [[fx0 + 0.25, s * (PIV + 0.02), fz - 0.02], [fx1, s * (PIV + 0.02), fz + 0.08], [fx1 + 0.3, s * (PIV + 0.02), fz + 0.40], [fx0 - 1.0, s * (PIV + 0.02), fz + 0.36]]));
      /* the pivot fairing under the fence */
      K.skin.push(solid(
        [[fx0, s * (PIV - 0.10), fz - 0.10], [fx1 + 0.2, s * (PIV - 0.10), fz - 0.10], [fx1 + 0.2, s * (PIV - 0.10), fz + 0.04], [fx0, s * (PIV - 0.10), fz + 0.04]],
        [[fx0, s * (PIV + 0.10), fz - 0.10], [fx1 + 0.2, s * (PIV + 0.10), fz - 0.10], [fx1 + 0.2, s * (PIV + 0.10), fz + 0.04], [fx0, s * (PIV + 0.10), fz + 0.04]]));
      /* outer panel: slat, box, flap, aileron, and a raked tip */
      K.skin.push(solid(wPart(PO, s, 0, 0.14, 0.8), wPart(TIP - 0.05, s, 0, 0.14, 0.8)));
      K.skin.push(solid(wPart(PO, s, 0.15, 0.74), wPart(TIP - 0.05, s, 0.15, 0.74)));
      K.skin.push(solid(wPart(PO + 0.05, s, 0.755, 1.0, 0.85), wPart(5.6, s, 0.755, 1.0, 0.85)));
      K.skin.push(solid(wPart(5.62, s, 0.755, 1.0, 0.85), wPart(TIP - 0.05, s, 0.755, 1.0, 0.85)));
      var tz = wZ(TIP);
      K.skin.push(solid(
        foil([wLE(TIP - 0.05), s * (TIP - 0.05), tz], [wTE(TIP - 0.05), s * (TIP - 0.05), tz], wT(TIP - 0.05), [0, 0, 1]),
        foil([wLE(TIP) - 0.12, s * TIP, tz], [wTE(TIP) + 0.08, s * TIP, tz], 0.015, [0, 0, 1])));
      /* NR-30 muzzles out of the glove roots (D, G) */
      y = 1.02;
      K.metal.push(cyl(0.042, 0.042, 0.55, 10, "x", gLE(y) + 0.05, s * y, gZ(y) - 0.04));
      K.skin.push(solid(
        foil([gLE(y) + 0.02, s * (y - 0.07), gZ(y) - 0.04], [gLE(y) - 0.9, s * (y - 0.07), gZ(y) - 0.04], 0.13, [0, 0, 1]),
        foil([gLE(y) + 0.02, s * (y + 0.07), gZ(y) - 0.04], [gLE(y) - 0.9, s * (y + 0.07), gZ(y) - 0.04], 0.13, [0, 0, 1])));
      /* team colour: one small strip on each upper outer wing */
      var tb = function (yy) {
        var le = wLE(yy), te = wTE(yy), c = le - te, z = wZ(yy), h = wT(yy) * 0.47 + 0.01;
        return blk([le, s * yy, z], [te, s * yy, z], 0.28, 0.66, h, [0, 0, 1]);
      };
      K.team.push(solid(tb(5.25), tb(5.6)));
    }

    /* ---- tailplane: low, all-moving, anti-flutter rods at the tips (A, D, E) */
    for (s = -1; s <= 1; s += 2) {
      var tz0 = -0.12;
      K.skin.push(solid(foil([-5.45, s * 0.45, tz0], [-7.75, s * 0.45, tz0], 0.22, [0, 0, 1]),
                        foil([-7.30, s * 2.30, tz0], [-8.50, s * 2.30, tz0], 0.07, [0, 0, 1])));
      K.metal.push(cyl(0.035, 0.035, 0.80, 8, "x", -7.05, s * 2.27, tz0));
      push(K.metal, revolve([[0.5, 0.05], [0.2, 1.0], [-0.3, 1.0], [-0.5, 0.4]], 0.36, 0.065, -6.70, s * 2.27, tz0, 10, 0, 0));
      K.metal.push(cyl(0.11, 0.11, 0.12, 12, "y", -6.40, s * 0.78, tz0));
    }

    /* ---- fin, its dorsal fillet, rudder, the green cap and LE strip (F) */
    K.skin.push(solid(finPart(0.80, 0, 0.80), finPart(2.10, 0, 0.80)));
    K.skin.push(solid(finPart(2.10, 0, 0.80), finPart(FIN_TOP - 0.20, 0, 0.80)));
    K.skin.push(solid(finPart(0.80, 0.815, 1.0), finPart(1.10, 0.815, 1.0)));
    K.skin.push(solid(finPart(1.12, 0.815, 1.0), finPart(FIN_TOP - 0.22, 0.815, 1.0)));      /* rudder */
    for (i = 0; i < FILLET.length - 1; i++) {
      var za = FILLET[i][0], zb = FILLET[i + 1][0];
      var ta = 0.30 - i * 0.02, tb2 = 0.30 - (i + 1) * 0.02;
      K.skin.push(solid(foil([FILLET[i][1], 0, za], [finLE(za) - 0.9, 0, za], ta, [0, 1, 0]),
                        foil([FILLET[i + 1][1], 0, zb], [finLE(zb) - 0.9, 0, zb], tb2, [0, 1, 0])));
    }
    K.diel.push(solid(finPart(FIN_TOP - 0.20, 0, 1.0), finPart(FIN_TOP, 0.02, 0.99)));
    K.dark.push(box(0.30, 0.06, 0.12, -6.60, 0, 1.15));                 /* fin antenna */

    /* ---- pylons: twin fuselage, three under each glove (C, D, G) */
    for (s = -1; s <= 1; s += 2) {
      pylon(K.skin, 1.20, -1.40, s * 0.40, -0.70, BELLY_PYL, 0.10);
      pylon(K.skin, 0.80, -1.70, s * 1.24, underAt(1.24) + 0.02, underAt(1.24) - 0.24);
      pylon(K.skin, -0.30, -2.30, s * 2.02, underAt(2.02) + 0.02, underAt(2.02) - 0.22);
      pylon(K.skin, -0.70, -2.90, s * 2.70, underAt(2.70) + 0.04, underAt(2.70) - 0.26, 0.10);
    }
    var ST = cfg.stores;
    for (s = -1; s <= 1; s += 2) for (i = 0; i < ST.length; i++) {
      var st = ST[i], sy = st.y, zt = sy < 0.6 ? BELLY_PYL : underAt(sy) - (sy > 2.5 ? 0.26 : 0.24);
      store(K, st.kind, st.x, s * sy, zt);
    }
    if (cfg.kh28) {
      /* R: one Kh-28 on the PU-28S under the fuselage, its upper fin in the
         belly recess; between the fuselage pylons, behind the nose gear */
      pylon(K.skin, 1.55, -1.25, 0, -0.80, -1.30, 0.18);
      store(K, "kh28", cfg.kh28, 0, -1.30);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");
    mesh(g, K.diel, T.diel, "dielectric");

    /* ---- landing gear (E, F, G): retracts, so named "gear"; tyres lowest */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 4.30, nr = 0.33, nz = GROUND + nr;
    G.metal.push(bar([4.52, 0, -0.70], [nx + 0.04, 0, nz + 0.10], 0.06, 10));
    G.metal.push(bar([nx + 0.04, -0.13, nz + 0.30], [nx, -0.13, nz], 0.028, 6));
    G.metal.push(bar([nx + 0.04, 0.13, nz + 0.30], [nx, 0.13, nz], 0.028, 6));
    G.metal.push(bar([nx + 0.04, -0.13, nz + 0.30], [nx + 0.04, 0.13, nz + 0.30], 0.03, 6));
    G.metal.push(bar([3.70, 0, -0.75], [nx + 0.02, 0, -1.05], 0.035, 6));
    G.tyre.push(cyl(nr, nr, 0.20, 26, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.21, 14, "y", nx, 0, nz));
    G.dark.push(box(0.70, 0.30, 0.03, nx + 0.05, 0, nz + nr + 0.06));    /* mudguard (F, G) */
    for (s = -1; s <= 1; s += 2) G.skin.push(box(1.10, 0.025, 0.42, 4.55, s * 0.30, -0.95));
    var mx = -1.60, mr = 0.44, mzz = GROUND + mr, my = 1.92;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([-1.35, s * 1.62, -0.10], [mx, s * (my - 0.17), mzz + 0.05], 0.075, 10));
      G.metal.push(bar([-0.40, s * 1.05, -0.20], [-1.45, s * 1.70, -1.05], 0.035, 6));
      G.metal.push(cyl(0.05, 0.05, 0.24, 8, "y", mx, s * (my - 0.08), mzz));
      G.tyre.push(cyl(mr, mr, 0.23, 30, "y", mx, s * my, mzz));
      G.metal.push(cyl(mr * 0.52, mr * 0.52, 0.24, 16, "y", mx, s * my, mzz));
      G.skin.push(box(1.30, 0.025, 0.72, -1.45, s * 1.46, -0.56, s * 0.35, 0, 0));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    mesh(gr, G.skin, T.skin, "gear_doors", true);
    return g;
  }

  var FITS = {
    /* C, first load less its AA-8 (the R-60 came after this 1970 row): tanks
       on the fuselage pair, four UB-32 under the gloves */
    cas:  { node: "su17", stores: [{ kind: "tank", x: 0.10, y: 0.40 }, { kind: "ub32", x: 0.10, y: 1.24 }, { kind: "ub32", x: -1.30, y: 2.70 }] },
    /* R: ONE Kh-28 under the fuselage; C and D: the tanks on the fence pylons */
    sead: { node: "su17_kh28", kh28: 0.30, stores: [{ kind: "tank", x: -1.70, y: 2.70 }] }
  };
  function maker(f) { return function (THREE, M, C) { return buildAirframe(THREE, C, f); }; }
  return { cas: maker(FITS.cas), sead: maker(FITS.sead) };
})();

/* len is the measured x extent: boom tip (9.86) to fin tip (-8.88) */
UNIT_MODELS["pact_e60_cas"]  = { len: 18.8, build: HeroSu17.cas };
UNIT_MODELS["pact_e60_sead"] = { len: 18.8, build: HeroSu17.sead };
