/* ============ ru_su35.js - HERO model: Sukhoi Su-35S "Flanker-E" ============
   Registers pact_e00_fighter ("Su-35S", "Sukhoi Su-35S Flanker-E", 2014).
   No other def registers or is changed by this file; see the report for
   rows that may borrow the key by category (pla_e90_fighter, the Su-27SK).

   References (Wikimedia Commons, fetched for this file):
     A "Sukhoi Su-27 3-view line drawing.svg" - top, front and side views of
       the Flanker airframe. Used for the planform and every station: the
       LERX flowing into a 42 degree wing, the two engine nacelles with the
       tunnel between them, twin fins on the nacelle shoulders, the low
       slab tailplane, the tail sting, the wing and tail positions. It is
       an Su-27 drawing (with its canard-free layout, which the Su-35S
       shares), scaled here to the Su-35S length.
     B "Sukhoi Su-35S 07 RED PAS 2013 07.jpg" - a close-up of an Su-35S
       engine nozzle and tailplane root: the nozzle sits ahead of the
       stabilator trailing edge, a red x on the tail, grey metal petals.
     C "Russian SU-35 Over Syria.jpg" - an in-service Su-35S from alongside:
       pale sky-blue-grey sides, a mid-grey radome, the nose probe, the
       wingtip pod, the red numeral. The colour reference for the paint.
     D "Su-35 in flight. (3826731912).jpg" - the Su-35 demonstrator from
       below: no canards (only used for that; its camouflage and star
       places are NOT used).
     F "Russian Air Force, RF-81719, Sukhoi Su-35S (49581740157).jpg" and
     G "Russian Air Force, RF-95475, Sukhoi Su-35S (37230419561).jpg" - two
       in-service Russian Su-35S in the grey-blue scheme: the fuselage and
       the wing tops a very pale blue-grey, the fins and the tailplane a
       darker grey-blue, a mid-grey radome, a Russian red star on the outer
       face of each fin at mid-height, one on the upper wing and one under
       the wing at about mid-semispan. Paint and star places rest on F, G.
       (Their bort numbers, the flag and lettering are not drawn.)
     E "Sukhoi Su-35.jpg" - an Su-30 in Russkie Vityazi colours: only used
       to confirm that the Flanker nose, canopy and IRST position repeat.
   Published figures (row, air_specs): length 21.9 m, span 15.3 m over the
   wingtip pods, height 5.9 m. This model measures 21.9 x 15.3 x 5.9.

   What each part rests on:
     - fuselage, radome, canopy, nacelles, fins, tailplane, wing: A, checked
       by overlaying the model's side and plan silhouettes on A (nose depth,
       the canopy 3.9 m from the radome tip, the dorsal hump behind it).
     - IRST ball ahead of the windscreen, the wingtip ECM pods, the thrust
       vectoring nozzles (drawn as plain nozzles; the canting of the real
       ones is not drawn): the row and C/B; their sizes are estimated.
     - NO airbrake on the spine: none is drawn (the Su-35S has none).
     - NO canard: A (the drawing) and D (the aircraft from below).
     - Tail sting: A's proportions (an Su-27 drawing); a shorter sting on
       the Su-35S could not be confirmed from the downloads.
     - Stores: the row names R-77-1 and R-73 (generations.js). Two R-77 on
       the mid-wing pylons and two R-73 outboard are the row's weapons at
       plausible stations (an in-service photograph, C, shows a slim pale
       missile under the wing but not its type); the Su-35S has twelve
       hardpoints and only these four are drawn.
     - Gear: A (a twin-wheel nose leg under the cockpit and two main legs
       under the wing roots); tyre sizes estimated.
     - Paint: F, G (pale upper surfaces, darker fins and tailplane, grey
       radome), as painted; no patches are invented. The red numerals and the
       Z in C are not drawn. Red star with a thin white edge: both sides of
       both fins, the upper and lower wings (F, G).
   Team colour exactly C.team: one small strip on each upper outer wing.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu35 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -2.30;                 /* tyre bottoms: 5.9 m under the fin tip */
  var FIN_TIP = 3.60;

  var PXM = 36, XMIN = -11.2, TW = 800;
  var TOPH = 566, SIDEH = 172, TH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 7.85, ZTOP = 3.7, ZSPAN = 6.0;

  var PAL = { up: "#c2d1dd", side: "#adc0cf", belly: "#9fb0bd", fin: "#6f8790", spine: "#8fa5b4" };

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
    var g = cv.getContext("2d"), s = 35101, i, b, x, y, k;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = PAL.up; g.fillRect(0, 0, TW, TOPH);
    g.fillStyle = PAL.side; g.fillRect(0, TOPH, TW, 2 * SIDEH);
    g.fillStyle = PAL.belly; g.fillRect(0, bandY[3], TW, TOPH);
    /* in-service layout (photographs F and G): wings and fuselage a very pale
       blue-grey, a slightly darker spine, fins and tailplane a darker grey-blue.
       The tail surfaces are painted into the bands they project onto. */
    g.fillStyle = PAL.spine; g.fillRect(pxX(8.0), pxY(0.45), pxX(-8.6) - pxX(8.0), pxY(-0.45) - pxY(0.45));
    g.fillStyle = PAL.fin;
    g.fillRect(pxX(-9.7), pxY(4.5), pxX(-6.5) - pxX(-9.7), pxY(1.3) - pxY(4.5));
    g.fillRect(pxX(-9.7), pxY(-1.3), pxX(-6.5) - pxX(-9.7), pxY(-4.5) - pxY(-1.3));
    g.fillRect(pxX(-9.7), bandY[3] + pxY(4.5), pxX(-6.5) - pxX(-9.7), pxY(1.3) - pxY(4.5));
    g.fillRect(pxX(-9.7), bandY[3] + pxY(-1.3), pxX(-6.5) - pxX(-9.7), pxY(-4.5) - pxY(-1.3));
    for (b = 1; b <= 2; b++) g.fillRect(pxX(-8.7), sideZ(3.7, b), pxX(-4.4) - pxX(-8.7), sideZ(0.62, b) - sideZ(3.7, b));
    /* panel lines and rivet rows */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    var PANEL_X = [7.4, 5.6, 3.8, 2.0, 0.2, -1.6, -3.4, -5.2, -7.0, -8.6];
    for (b = 0; b < 4; b++) for (i = 0; i < PANEL_X.length; i++) {
      x = pxX(PANEL_X[i]); g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke();
    }
    g.fillStyle = "rgba(0,0,0,0.13)";
    for (i = 0; i < 70; i++) {
      x = R() * TW * 0.92; y = R() * TH; k = 8 + ((R() * 26) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 5, y, 1.3, 1.3);
    }
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(24,22,20," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 50, 2 + R() * 8);
    }
    /* stars (photographs F and G, in-service aircraft): both fins on the outer face, mid-height; upper and lower wing, mid-semispan */
    for (b = 1; b <= 2; b++) star(g, pxX(-6.55), sideZ(1.75, b), 0.40 * PXM, 0.40 * SIDEH / ZSPAN);
    star(g, pxX(-3.0), pxY(3.5), 0.46 * PXM, 0.52 * PXM);
    star(g, pxX(-3.0), pxY(-3.5), 0.46 * PXM, 0.52 * PXM);
    star(g, pxX(-3.0), bandY[3] + pxY(3.5), 0.46 * PXM, 0.52 * PXM);
    star(g, pxX(-3.0), bandY[3] + pxY(-3.5), 0.46 * PXM, 0.52 * PXM);
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
    m.radome = new V.MeshStandardMaterial({ color: 0x8b9094, roughness: 0.70, metalness: 0.10 });
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
  /* a closed solid between two sections with the same number of corners */
  function solid(A, B) {
    /* wound from the sections themselves, not from a centroid test: thin
       swept panels (fins, tailplane edges, missile fins) fooled that test and
       left inside-out faces. s is the sign of A's Newell normal along A->B. */
    var n = A.length, i, k, nx = 0, ny = 0, nz = 0, ax = 0, ay = 0, az = 0, out = [];
    for (i = 0; i < n; i++) {
      var p = A[i], q = A[(i + 1) % n];
      nx += (p[1] - q[1]) * (p[2] + q[2]); ny += (p[2] - q[2]) * (p[0] + q[0]); nz += (p[0] - q[0]) * (p[1] + q[1]);
      ax += B[i][0] - A[i][0]; ay += B[i][1] - A[i][1]; az += B[i][2] - A[i][2];
    }
    var s = (nx * ax + ny * ay + nz * az) >= 0 ? 1 : -1;
    function q3(a, b, c) { if (s > 0) out.push(a, b, c); else out.push(a, c, b); }
    for (i = 1; i < n - 1; i++) { q3(A[0], A[i + 1], A[i]); q3(B[0], B[i], B[i + 1]); }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      /* the shorter diagonal, so the faces on the two skins of a panel split alike */
      var d1 = (A[i][0] - B[j][0]) * (A[i][0] - B[j][0]) + (A[i][1] - B[j][1]) * (A[i][1] - B[j][1]) + (A[i][2] - B[j][2]) * (A[i][2] - B[j][2]);
      var d2 = (A[j][0] - B[i][0]) * (A[j][0] - B[i][0]) + (A[j][1] - B[i][1]) * (A[j][1] - B[i][1]) + (A[j][2] - B[i][2]) * (A[j][2] - B[i][2]);
      if (d1 <= d2) { q3(A[i], A[j], B[j]); q3(A[i], B[j], B[i]); }
      else { q3(A[i], A[j], B[i]); q3(A[j], B[j], B[i]); }
    }
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
  /* four fins round a store; ang 0 is +, PI/4 is x */
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th) {
    for (var k = 0; k < 4; k++) {
      var a = ang + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a), r0 = 0.0, r1 = span;
      var A = [x, y + cy * r0, z + cz * r0], B = [x - chordR, y + cy * r0, z + cz * r0];
      var Cc = [x - sweep - chordT, y + cy * r1, z + cz * r1], D = [x - sweep, y + cy * r1, z + cz * r1];
      var nY = -cz * th, nZ = cy * th;
      list.push(solid([[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                      [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]));
    }
  }
  /* the underside of the airframe at lateral station y and x (for hanging

  /* ------------------------------------------------------------ planform --
     Drawing A scaled to 21.9 m. x = 9.9 - (distance from the radome tip).
     Wing: the LERX runs from the body (y 0.55, x 5.8) to the wing root (y 2.0,
     x -0.5), then 42 degrees to the tip (y 7.35, x -5.3); trailing edge from
     x -4.6 to -6.8. */
  var Y0 = 0.55, Y1 = 2.0, TIPY = 7.35;
  function wLE(y) { return y < Y1 ? 5.8 - (y - Y0) * 4.345 : -0.5 - (y - Y1) * 0.8972; }
  function wTE(y) { return y < Y1 ? -4.6 : -4.6 - (y - Y1) * 0.411; }
  function wT(y)  { return Math.max(0.17, 0.34 - 0.036 * (y - Y0)); }   /* no skin thinner than the 4 cm the back-face view cannot resolve */
  function wPart(y, s, f0, f1, tk) {
    var le = wLE(y), te = wTE(y), c = le - te;
    return foil([le - c * f0, s * y, 0], [le - c * f1, s * y, 0], wT(y) * (tk || 1), [0, 0, 1]);
  }
  function blk2(y, s, f0, f1, h) {
    var le = wLE(y), te = wTE(y);
    return blk([le, s * y, 0], [te, s * y, 0], f0, f1, h, [0, 0, 1]);
  }

  function plate(y, s, f0, f1) {
    var le = wLE(y), te = wTE(y), zc = wT(y) * 0.44;
    return blk([le, s * y, zc + 0.04], [te, s * y, zc + 0.04], f0, f1, 0.03, [0, 0, 1]);
  }

  /* fins: root z -0.55 on the nacelle shoulder, tip z 3.6 */
  var FIN_Y = 1.78, FIN_Z0 = -0.55;
  function finF(z) { return (z - FIN_Z0) / (FIN_TIP - FIN_Z0); }
  function finLE(z) { return -4.5 - finF(z) * 2.45; }
  function finTE(z) { return -8.5 + finF(z) * 0.70; }
  function finT(z) { return 0.30 - finF(z) * 0.15; }
  function finPart(z, s, f0, f1) {
    var le = finLE(z), te = finTE(z), c = le - te;
    return foil([le - c * f0, s * FIN_Y, z], [le - c * f1, s * FIN_Y, z], finT(z), [0, 1, 0]);
  }

  /* centre body, nose to tail, increasing -x */
  var RADOME = [ls(9.90, 0, -0.30, 0.02, 0.02), ls(9.60, 0, -0.29, 0.13, 0.13), ls(9.00, 0, -0.24, 0.32, 0.33),
                ls(8.20, 0, -0.14, 0.48, 0.52), ls(7.40, 0, -0.06, 0.56, 0.62), ls(6.90, 0, -0.01, 0.59, 0.67)];
  var BODY = [ls(6.90, 0, -0.01, 0.59, 0.67), ls(5.90, 0, 0.07, 0.72, 0.74), ls(4.40, 0, 0.11, 0.84, 0.78, 0.9),
              ls(3.00, 0, 0.08, 0.92, 0.66, 0.8), ls(1.70, 0, 0.02, 1.18, 0.62, 0.7), ls(0.00, 0, 0.05, 1.44, 0.60, 0.65),
              ls(-2.00, 0, 0.10, 1.30, 0.56, 0.65), ls(-4.50, 0, 0.12, 1.10, 0.50, 0.65), ls(-6.50, 0, 0.10, 0.80, 0.42, 0.7),
              ls(-8.40, 0, 0.05, 0.50, 0.32, 0.8)];
  var STING = [ls(-8.40, 0, 0.00, 0.50, 0.30, 0.9), ls(-9.20, 0, -0.10, 0.22, 0.20), ls(-10.0, 0, -0.14, 0.14, 0.13), ls(-11.0, 0, -0.15, 0.05, 0.05)];
  var NAC_Y = 1.25;
  var NAC = [ls(1.70, 0, -0.60, 0.62, 0.64, 0.5), ls(0.50, 0, -0.68, 0.64, 0.74, 0.6), ls(-2.00, 0, -0.74, 0.65, 0.78, 0.7),
             ls(-6.00, 0, -0.75, 0.65, 0.78, 0.8), ls(-7.60, 0, -0.75, 0.60, 0.64, 0.95), ls(-8.40, 0, -0.75, 0.58, 0.58, 1)];
  var CANOPY = [ls(6.05, 0, 0.58, 0.12, 0.05), ls(5.60, 0, 0.74, 0.37, 0.50), ls(5.00, 0, 0.78, 0.47, 0.72),
                ls(4.00, 0, 0.76, 0.46, 0.66), ls(3.10, 0, 0.72, 0.40, 0.46), ls(2.70, 0, 0.62, 0.22, 0.20)];
  var SPINE = [ls(3.40, 0, 0.88, 0.42, 0.28, 0.8), ls(2.40, 0, 0.94, 0.46, 0.30, 0.8), ls(1.00, 0, 0.84, 0.52, 0.31, 0.75),
               ls(-0.50, 0, 0.72, 0.55, 0.30, 0.75), ls(-2.00, 0, 0.58, 0.55, 0.30, 0.75),
               ls(-5.00, 0, 0.40, 0.42, 0.30, 0.75), ls(-8.00, 0, 0.26, 0.20, 0.17, 0.85)];
  var P_R77 = [[0.50, 0.03], [0.44, 0.40], [0.36, 0.80], [0.28, 1.0], [-0.42, 1.0], [-0.50, 0.90]];
  var P_R73 = [[0.50, 0.05], [0.42, 0.50], [0.32, 0.90], [0.22, 1.0], [-0.44, 1.0], [-0.50, 0.85]];
  var P_POD = [[0.50, 0.05], [0.42, 0.50], [0.32, 0.92], [0.20, 1.0], [-0.35, 1.0], [-0.46, 0.8], [-0.50, 0.40]];

  function store(K, kind, x, y, zTop) {
    var len, r, zc;
    if (kind === "r77") {              /* R-77: 3.6 m, 0.2 m, lattice tail fins */
      len = 3.6; r = 0.10; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_R77, len, r, x, y, zc, 14, 0, 0));
      for (var a = 0; a < 4; a++) {
        var an = PI / 4 + a * PI / 2;
        K.dark.push(box(0.26, 0.015, 0.22, x - len * 0.40, y + Math.cos(an) * 0.17, zc + Math.sin(an) * 0.17, an, 0, 0));
      }
    } else if (kind === "r73") {       /* R-73: 2.93 m, 0.17 m, canards and tail fins */
      len = 2.93; r = 0.085; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_R73, len, r, x, y, zc, 14, 0, 0));
      fins(K.pale, x + len * 0.20, y, zc, 0.20, 0.10, 0.06, 0.20, PI / 4, 0.008);
      fins(K.pale, x - len * 0.38, y, zc, 0.30, 0.16, 0.10, 0.28, 0, 0.008);
    }
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "su35";
    var K = { skin: [], radome: [], dark: [], metal: [], glass: [], team: [], pale: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, y;

    /* ---- radome (grey), body, spine, tail sting, nacelles */
    push(K.radome, loft(RADOME, 40, null, 0.0));
    push(K.skin, loft(BODY, 64, null, 0.0));
    push(K.skin, loft(SPINE, 24, 0, 0.0));
    push(K.skin, loft(STING, 20, null, 0.02));
    for (s = -1; s <= 1; s += 2) {
      var secs = [];
      for (i = 0; i < NAC.length; i++) { var n0 = NAC[i]; secs.push(ls(n0.x, s * NAC_Y, n0.zc, n0.w, n0.h, n0.e)); }
      push(K.skin, loft(secs, 56, 0.0, 0.0));
      /* intake mouth: a dark face in front of the lip */
      K.dark.push(box(0.03, 1.00, 1.04, 1.74, s * NAC_Y, -0.60));
      /* nozzle: shroud, petals, dark bore (the AL-41F1S nozzles) */
      push(K.metal, loft([ls(-8.30, s * NAC_Y, -0.75, 0.585, 0.585), ls(-8.55, s * NAC_Y, -0.75, 0.555, 0.555), ls(-8.80, s * NAC_Y, -0.75, 0.50, 0.50)], 26, null, null));
      push(K.dark, loft([ls(-8.76, s * NAC_Y, -0.75, 0.50, 0.50), ls(-8.77, s * NAC_Y, -0.75, 0.50, 0.50)], 26, null, 0.0));   /* closes the shroud: the dark bore */
      for (i = 0; i < 12; i++) {
        var pa = i * 2 * PI / 12;
        K.dark.push(bar([-8.32, s * NAC_Y + Math.cos(pa) * 0.585, -0.75 + Math.sin(pa) * 0.585],
                        [-8.80, s * NAC_Y + Math.cos(pa) * 0.50, -0.75 + Math.sin(pa) * 0.50], 0.008, 4));
      }
    }

    /* ---- canopy, frames, IRST ball ahead of it, nose probe */
    push(K.glass, loft(CANOPY, 32, 0.02, 0.02));
    K.dark.push(bar([5.60, -0.38, 0.80], [5.60, 0.38, 0.80], 0.022, 6));
    K.dark.push(bar([3.95, -0.45, 0.72], [3.95, 0.45, 0.72], 0.025, 6));
    K.dark.push(box(0.36, 0.30, 0.40, 4.20, 0, 0.55));
    K.glass.push(new V.SphereGeometry(0.17, 14, 8).translate(6.38, 0, 0.60));
    K.metal.push(cyl(0.20, 0.20, 0.06, 14, "x", 6.28, 0, 0.55));
    K.metal.push(cyl(0.012, 0.025, 1.20, 8, "x", 10.30, 0, -0.30));                   /* probe, tip at x 10.9 */
    K.metal.push(box(0.025, 0.14, 0.012, 10.0, 0, -0.30));
    K.dark.push(box(0.60, 0.50, 0.015, 6.7, 0, 0.50, 0, 0.35, 0));                     /* anti-glare panel */

    /* ---- wings, wingtip ECM pods, team strips */
    for (s = -1; s <= 1; s += 2) {
      var sts = [Y0, Y1, 3.5, 5.0, 6.3, TIPY];
      for (i = 0; i < sts.length - 1; i++) K.skin.push(solid(wPart(sts[i], s, 0, 1), wPart(sts[i + 1], s, 0, 1)));
      push(K.metal, revolve(P_POD, 3.0, 0.125, -5.95, s * (TIPY + 0.15), 0, 14, 0, 0));
      K.skin.push(box(1.30, 0.28, 0.05, -5.95, s * (TIPY - 0.05), 0));
      /* a thin plate lying ON the upper skin (its underside inside the wing), not a slab through it */
      K.team.push(solid(plate(5.25, s, 0.28, 0.66), plate(5.95, s, 0.28, 0.66)));
    }

    /* ---- tailplane: low, all-moving, tips cut off square */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(foil([-6.60, s * 1.45, -0.65], [-9.60, s * 1.45, -0.65], 0.18, [0, 0, 1]),
                        foil([-8.80, s * 4.40, -0.65], [-9.60, s * 4.40, -0.65], 0.14, [0, 0, 1])));
      K.metal.push(cyl(0.10, 0.10, 0.50, 12, "y", -7.40, s * 1.5, -0.65));
    }

    /* ---- fins, with a dark cap on each tip */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(finPart(FIN_Z0, s, 0, 1), finPart(1.4, s, 0, 1)));
      K.skin.push(solid(finPart(1.4, s, 0, 1), finPart(FIN_TIP - 0.12, s, 0, 1)));
      K.dark.push(solid(finPart(FIN_TIP - 0.12, s, 0.0, 1), finPart(FIN_TIP, s, 0.04, 0.96)));
    }

    /* ---- stores: R-77 on the mid-wing pylons, R-73 outboard */
    for (s = -1; s <= 1; s += 2) {
      pylon(K.skin, -2.60, -5.30, s * 4.6, -0.04, -0.34, 0.10);
      store(K, "r77", -4.0, s * 4.6, -0.34);
      pylon(K.skin, -4.10, -6.20, s * 6.3, -0.03, -0.26, 0.09);
      store(K, "r73", -5.2, s * 6.3, -0.26);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");

    /* ---- landing gear (A): named "gear", tyres lowest */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 5.60, nr = 0.33, nz = GROUND + nr;
    G.metal.push(bar([5.90, 0, -0.50], [nx, 0, nz + 0.12], 0.06, 10));
    G.metal.push(bar([nx, -0.16, nz], [nx, 0.16, nz], 0.035, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.20, 26, "y", nx, s * 0.17, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.21, 14, "y", nx, s * 0.17, nz));
    }
    G.dark.push(box(0.70, 0.52, 0.03, nx + 0.05, 0, nz + nr + 0.05));                   /* mudguard */
    G.metal.push(bar([4.80, 0, -0.50], [nx + 0.04, 0, -1.30], 0.035, 6));              /* drag strut */
    var mx = -0.30, mr = 0.52, mz = GROUND + mr, my = 2.12;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.05, s * 1.78, -0.95], [mx, s * (my - 0.15), mz + 0.05], 0.075, 10));
      G.metal.push(cyl(0.06, 0.06, 0.28, 8, "y", mx, s * (my - 0.08), mz));
      G.tyre.push(cyl(mr, mr, 0.34, 32, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.35, 16, "y", mx, s * my, mz));
      G.metal.push(bar([mx - 0.6, s * 1.85, -0.95], [mx - 0.05, s * (my - 0.15), mz + 0.30], 0.035, 6));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured x extent: probe tip (10.9) to the sting end (-11.0) */
UNIT_MODELS["pact_e00_fighter"] = { len: 21.9, build: HeroSu35.build };
