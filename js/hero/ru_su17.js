/* ============ ru_su17.js - HERO model: Sukhoi Su-17M "Fitter-C" ============
   One airframe, two fits, for the e60 Pact fighter-bomber rows:
     pact_e60_cas   "Su-17 Fitter"    (Sukhoi Su-17M Fitter-C)
     pact_e60_sead  "Su-17M (Kh-28)"  the same aeroplane carrying two Kh-28

   References (Wikimedia Commons, fetched for this file):
     A "Sukhoi Su-17 3-view line drawing.png" (Su-17M2/Su-22 three-view,
       wings swept, spread position dashed)
     B "Sukhoi Su-17, Su-17M and Su-17M2 side-view silhouettes.png"
     C "Sukhoi Su-17 silhouettes illustrating external stores.png" (front
       views of five Su-17 loads, with captions)
     D "SSSR-Su-17M(DN-SN-83-06774).jpg" (US DoD 1983: a Soviet Su-17M from
       below, wings spread)
     E "Su-17M.jpg" (US DoD 1985: a Soviet Su-17 Fitter-C landing, from the
       starboard rear)
     F "Sukhoi Su-17M2.jpg" (US DoD 1982, from below and to one side)
     G "Sukhoi Su-17M Fitter monument at Glubokoe.jpg" (a preserved Su-17M,
       in colour: the hues only)
   Published figures: length 18.8 m over the probe (the row), span 13.68 m
   spread and 10.02 m swept, height 5.0 m. This model: 18.8 / 13.7 / 5.0.

   What each part rests on:
     - fuselage: B (the Su-17M's straight belly line, the raised dorsal spine
       standing proud of the canopy, short nose ahead of the windscreen) and
       A (1.5 m wide body, nose IS the intake with a shock cone standing
       out of the lip).
     - air data booms: D and E - a long boom off the starboard side of the
       nose, a short one to port.
     - glove: A and D - the fixed inner wing with a 63 degree leading edge
       from x 2.55 at the body to the pivot 2.7 m out, an unswept trailing
       edge, the big boundary fence at its tip; D puts the outer panel's
       spread leading edge at 30 degrees from that fence and the tip chord
       at 0.9 m; no pylons on the moving panels (C, D).
     - NR-30 muzzles at the glove roots: D (two short barrels ahead of the
       glove leading edge).
     - fin, rudder, the brake-chute box under the rudder, the low all-moving
       tailplane with its anti-flutter rods at the tips: A, B, D, E, F.
     - gear: E (single nose wheel under the cockpit, main legs out of the
       glove); wheelbase and track estimated from E.
     - stores: C. cas: "820 liter tanks x 2" on the twin fuselage pylons and
       "32 x 57 mm rocket pods x 4" on the glove pylons (the AA-8 of that
       load is left off: the R-60 came after this 1970 row). sead: "820 liter
       tanks x 2, Vyuga pod, AS-9 ARMs x 2" - tanks on the fence pylons,
       Kh-28 on the inner glove pylons (the Vyuga pod's length is not in any
       reference, so it is not drawn). D shows the tanks on the fence pylons.
     - paint: D, E and F (all of Soviet Su-17s) show large irregular patches
       of two or three tones over the upper surfaces and the sides and a
       pale underside; they are black and white, so the hues are the ones
       G wears (green, dark green, sand; pale blue-grey below) - not
       confirmed for the 1970s. Red stars where D and E put them: both sides
       of the fin and under the outer wings; none on the upper wings or the
       rear fuselage. No bort numbers (E's "42" is left off), and not D's
       dark under-wing bands.
   Variable sweep: render3d.js moves no wing panels, so the outer panels are
   drawn at one sweep, spread, the span the rows give.
   Team colour exactly C.team, on two small strips on the upper outer wings.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu17 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -2.03;                 /* tyre bottoms: 5.0 m under the fin tip */
  var FIN_TOP = 2.97;

  var PXM = 40, XMIN = -9.2, TW = 800;
  var TOPH = 580, SIDEH = 184, TH = TOPH + 2 * SIDEH + TOPH;
  var YMAX = 7.25, ZTOP = 3.4, ZSPAN = 4.6;

  /* hues from G; the layout of large patches from D, E and F */
  var PAL = { base: "#5d6b3c", dark: "#36432a", sand: "#a08a5a", belly: "#a7b7c0" };

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

  /* a soft-edged patch: a closed curve through points given in model metres,
     mapped by fx/fy into the band */
  function blob(g, pts, fx, fy, col) {
    var n = pts.length, i;
    g.fillStyle = col;
    g.beginPath();
    for (i = 0; i <= n; i++) {
      var p = pts[i % n], q = pts[(i + 1) % n];
      var mx = (fx(p[0]) + fx(q[0])) / 2, my = (fy(p[1]) + fy(q[1])) / 2;
      if (!i) g.moveTo(mx, my); else g.quadraticCurveTo(fx(p[0]), fy(p[1]), mx, my);
    }
    g.closePath();
    g.fill();
  }

  /* upper-surface patches, model x (nose +) and y (port +): broad bands
     that run across the fuselage and out over the wings, as in D/E/F */
  var TOP_DARK = [
    [[10.4, 2.0], [7.8, 1.6], [6.0, 0.4], [6.6, -1.2], [8.6, -2.2], [10.4, -1.0]],
    [[3.4, 7.2], [1.0, 5.6], [0.6, 2.6], [1.4, 0.2], [0.2, -1.8], [-1.6, -3.6], [-2.8, -6.0], [-4.6, -7.2], [-5.0, -5.0], [-3.0, -2.0], [-2.2, 0.8], [-1.8, 3.8], [0.0, 6.6]],
    [[-5.4, 3.0], [-4.6, 1.0], [-5.6, -0.8], [-7.4, -1.6], [-9.2, -0.8], [-9.0, 1.4], [-7.2, 2.6]],
    [[-2.6, 7.2], [-3.4, 5.2], [-4.6, 4.6], [-5.0, 6.4], [-4.0, 7.2]]
  ];
  var TOP_SAND = [
    [[5.6, 3.0], [4.6, 1.2], [5.2, -0.6], [3.8, -2.4], [2.6, -4.2], [1.6, -3.0], [2.8, -1.0], [2.6, 1.4], [3.6, 3.2]],
    [[-0.6, 7.0], [-1.8, 4.6], [-2.2, 2.4], [-3.6, 2.6], [-3.2, 5.0], [-1.8, 7.2]],
    [[-3.6, -0.6], [-4.4, -2.4], [-5.2, -4.0], [-6.4, -3.4], [-6.0, -1.6], [-4.8, -0.2]]
  ];
  /* side patches, model x and z, mirrored front-to-back between the sides
     so that the two sides do not match */
  var SIDE_DARK = [
    [[10.4, 1.2], [7.4, 1.0], [5.6, 0.2], [6.2, -0.5], [8.2, -0.5], [10.4, -0.2]],
    [[2.2, 1.4], [0.6, 1.2], [-0.4, 0.2], [-1.4, -0.5], [0.8, -0.5], [2.6, 0.1]],
    [[-4.0, 1.0], [-5.0, 0.4], [-5.6, -0.5], [-7.4, -0.5], [-7.6, 0.6], [-6.6, 1.6], [-5.4, 2.6], [-6.6, 3.4], [-8.0, 3.4], [-9.2, 2.2], [-9.2, 3.4]]
  ];
  var SIDE_SAND = [
    [[4.8, 1.0], [3.4, 0.9], [2.6, 0.0], [3.0, -0.5], [4.6, -0.5], [5.2, 0.3]],
    [[-1.8, 1.2], [-3.0, 1.1], [-3.6, 0.0], [-3.0, -0.5], [-1.6, -0.5], [-1.4, 0.4]]
  ];
  var DEMARK = -0.36;                  /* camouflage down the sides to here */

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 17101, i, b, x, y, k;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = PAL.base; g.fillRect(0, 0, TW, TOPH + 2 * SIDEH);
    for (i = 0; i < TOP_DARK.length; i++) blob(g, TOP_DARK[i], pxX, pxY, PAL.dark);
    for (i = 0; i < TOP_SAND.length; i++) blob(g, TOP_SAND[i], pxX, pxY, PAL.sand);
    for (b = 1; b <= 2; b++) {
      var flip = b === 2 ? function (v) { return pxX(1.2 - v); } : pxX;
      var fz = (function (bb) { return function (z) { return sideZ(z, bb); }; })(b);
      for (i = 0; i < SIDE_DARK.length; i++) blob(g, SIDE_DARK[i], flip, fz, PAL.dark);
      for (i = 0; i < SIDE_SAND.length; i++) blob(g, SIDE_SAND[i], flip, fz, PAL.sand);
      /* the pale underside up the lower sides, a soft wavy edge */
      g.fillStyle = PAL.belly;
      g.beginPath(); g.moveTo(0, bandY[b] + SIDEH);
      for (x = 0; x <= TW; x += 20) g.lineTo(x, sideZ(DEMARK + Math.sin(x * 0.05 + b) * 0.03, b));
      g.lineTo(TW, bandY[b] + SIDEH); g.closePath(); g.fill();
    }
    g.fillStyle = PAL.belly; g.fillRect(0, bandY[3], TW, TOPH);
    /* panel lines and rivet rows */
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1;
    var PANEL_X = [6.6, 4.8, 3.0, 1.2, -0.6, -2.4, -4.0, -5.4, -6.8];
    for (b = 0; b < 4; b++) for (i = 0; i < PANEL_X.length; i++) {
      x = pxX(PANEL_X[i]); g.beginPath(); g.moveTo(x, bandY[b]); g.lineTo(x, bandY[b] + bandH[b]); g.stroke();
    }
    g.fillStyle = "rgba(0,0,0,0.16)";
    for (i = 0; i < 70; i++) {
      x = R() * TW * 0.92; y = R() * TH; k = 8 + ((R() * 26) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 5, y, 1.3, 1.3);
    }
    /* soot along the rear fuselage and weathering */
    var sx = pxX(-8.2), gr = g.createLinearGradient(sx, 0, pxX(-5.6), 0);
    gr.addColorStop(0, "rgba(22,18,14,0.50)"); gr.addColorStop(1, "rgba(22,18,14,0)");
    g.fillStyle = gr; g.fillRect(sx, TOPH, pxX(-5.6) - sx, TH - TOPH);
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(24,20,16," + (0.04 + R() * 0.10).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 50, 2 + R() * 8);
    }
    /* red stars: both sides of the fin (E), under the outer wings (D) */
    for (b = 1; b <= 2; b++) star(g, pxX(-6.75), sideZ(1.95, b), 0.40 * PXM, 0.40 * SIDEH / ZSPAN);
    star(g, pxX(-3.05), bandY[3] + pxY(4.75), 0.55 * PXM, 0.55 * PXM);
    star(g, pxX(-3.05), bandY[3] + pxY(-4.75), 0.55 * PXM, 0.55 * PXM);
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x5d6b3c);
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x24363b, roughness: 0.10, metalness: 0.35 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xb9c0bf, roughness: 0.55, metalness: 0.15 });
    m.gun   = new V.MeshStandardMaterial({ color: 0x8b9092, roughness: 0.40, metalness: 0.55 });
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
     Glove (fixed): body side y 0.76, leading edge x 2.55 there, swept 63.8
     degrees to the boundary fence at y 2.70 (x -1.40); trailing edge unswept
     at x -3.40. Outer panel, spread: leading edge 30 degrees from x -1.42 at
     y 2.72 to x -3.80 at the tip, y 6.84; trailing edge -3.78 to -4.68. A's front
     view has the lower surface level from root to tip (the upper one falls
     as the wing thins): no anhedral. Thickness 0.34 m at the root to 0.06. */
  var ROOT = 0.62, BODY = 0.76, PIV = 2.70, PO = 2.73, TIP = 6.84;
  var ZLOW = -0.14;                    /* the level lower surface */
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

  /* fin: root on the spine at z 0.80, leading edge 58 degrees */
  function finF(z) { return (z - 0.80) / (FIN_TOP - 0.80); }
  function finLE(z) { return -4.30 - (z - 0.80) * 1.60; }
  function finTE(z) { return -8.10 - finF(z) * 0.84; }
  function finT(z) { return 0.30 - finF(z) * 0.18; }
  function finPart(z, f0, f1) {
    var le = finLE(z), te = finTE(z), c = le - te;
    return foil([le - c * f0, 0, z], [le - c * f1, 0, z], finT(z), [0, 1, 0]);
  }

  /* fuselage, from the intake lip to the nozzle; the belly line straight
     from the cockpit aft (B) */
  var FUS = [ls(7.55, 0, -0.13, 0.448, 0.448), ls(7.20, 0, -0.14, 0.49, 0.49), ls(6.80, 0, -0.15, 0.535, 0.535),
             ls(6.30, 0, -0.16, 0.585, 0.585), ls(5.60, 0, -0.13, 0.64, 0.645), ls(4.80, 0, -0.09, 0.69, 0.69),
             ls(3.80, 0, -0.05, 0.735, 0.735), ls(2.60, 0, -0.02, 0.765, 0.765), ls(1.20, 0, 0, 0.775, 0.775),
             ls(-0.60, 0, 0, 0.775, 0.775), ls(-2.40, 0, 0, 0.77, 0.77), ls(-3.80, 0, 0.01, 0.755, 0.75),
             ls(-5.00, 0, 0.02, 0.72, 0.71), ls(-6.00, 0, 0.03, 0.68, 0.67), ls(-6.80, 0, 0.04, 0.64, 0.63),
             ls(-7.40, 0, 0.05, 0.605, 0.60), ls(-7.66, 0, 0.05, 0.59, 0.585)];
  /* the lip, inside the duct round to the outside, one profile [x, r] */
  var LIP = [[7.30, 0.380], [7.62, 0.386], [7.68, 0.402], [7.685, 0.422], [7.645, 0.442], [7.55, 0.448]];
  var CANOPY = [ls(6.64, 0, 0.36, 0.10, 0.05), ls(6.36, 0, 0.38, 0.33, 0.22), ls(5.95, 0, 0.40, 0.41, 0.38),
                ls(5.35, 0, 0.40, 0.43, 0.44), ls(4.85, 0, 0.40, 0.41, 0.43), ls(4.45, 0, 0.42, 0.36, 0.38)];
  var SPINE = [ls(5.00, 0, 0.46, 0.28, 0.30, 0.85), ls(4.40, 0, 0.53, 0.40, 0.37, 0.8), ls(2.80, 0, 0.57, 0.46, 0.36, 0.75),
               ls(-0.50, 0, 0.58, 0.46, 0.35, 0.75), ls(-3.20, 0, 0.57, 0.40, 0.35, 0.75), ls(-5.20, 0, 0.55, 0.30, 0.34, 0.8),
               ls(-7.00, 0, 0.54, 0.22, 0.31, 0.85), ls(-8.05, 0, 0.53, 0.14, 0.24, 0.9)];
  /* stores, profiles [x fraction, radius fraction] nose first */
  var P_TANK = [[0.50, 0.04], [0.44, 0.40], [0.34, 0.80], [0.22, 0.98], [0.10, 1.0], [-0.22, 1.0], [-0.36, 0.86], [-0.46, 0.52], [-0.50, 0.10]];
  var P_POD  = [[0.50, 0.70], [0.47, 0.94], [0.42, 1.0], [-0.40, 1.0], [-0.47, 0.90], [-0.50, 0.80]];
  var P_KH   = [[0.50, 0.03], [0.46, 0.40], [0.40, 0.78], [0.33, 0.97], [0.26, 1.0], [-0.44, 1.0], [-0.48, 0.92], [-0.50, 0.72]];

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
     pylons): the glove's lower surface, or the belly */
  function underAt(y) { return wZ(y) - wT(y) * 0.40; }

  function store(K, kind, x, y, zTop) {
    var len, r, zc;
    if (kind === "tank") {               /* 820 l drop tank (C), 4.4 m, 0.62 m across */
      len = 4.4; r = 0.31; zc = zTop - 0.06 - r;
      push(K.pale, revolve(P_TANK, len, r, x, y, zc, 22, 0, 0));
      fins(K.pale, x - len * 0.36, y, zc, 0.55, 0.28, 0.22, r + 0.30, PI / 4, 0.012);
    } else if (kind === "ub32") {        /* UB-32 rocket pod (C), 0.48 m across */
      len = 2.4; r = 0.24; zc = zTop - 0.04 - r;
      push(K.metal, revolve(P_POD, len, r, x, y, zc, 22, 0, 0));
      K.dark.push(cyl(r * 0.80, r * 0.80, 0.02, 20, "x", x + len * 0.5 + 0.005, y, zc));
      var j;                            /* the outer ring of tube mouths */
      for (j = 0; j < 12; j++) {
        var a = j * PI / 6;
        K.pale.push(cyl(0.032, 0.032, 0.03, 6, "x", x + len * 0.5 + 0.01, y + Math.cos(a) * r * 0.62, zc + Math.sin(a) * r * 0.62));
      }
    } else if (kind === "kh28") {        /* Kh-28: 5.97 m, 0.43 m across, 1.93 m span */
      len = 5.97; r = 0.215; zc = zTop - 0.30 - r;
      push(K.pale, revolve(P_KH, len, r, x, y, zc, 22, 0, 0));
      K.dark.push(cyl(r * 0.55, r * 0.50, 0.06, 14, "x", x - len * 0.5 - 0.03, y, zc));    /* nozzle */
      fins(K.pale, x - len * 0.06, y, zc, 1.30, 0.50, 0.75, 0.965, PI / 4, 0.014);          /* wings */
      fins(K.pale, x - len * 0.40, y, zc, 0.55, 0.30, 0.20, 0.55, PI / 4, 0.012);           /* tail controls */
      /* the launch rail between missile and pylon */
      K.metal.push(box(2.6, 0.12, 0.30, x + 0.4, y, zTop - 0.15));
    }
  }

  function buildAirframe(THREE, C, cfg) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = cfg.node;
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], pale: [], gun: [] };
    var G = { metal: [], tyre: [], dark: [], skin: [] };
    var s, i, y;

    /* ---- fuselage, intake lip, duct, shock cone, nozzle */
    push(K.skin, loft(FUS, 44, null, null));
    var lipS = [];
    for (i = 0; i < LIP.length; i++) lipS.push(ls(LIP[i][0], 0, -0.13, LIP[i][1], LIP[i][1]));
    push(K.skin, loft(lipS, 44, null, null));
    /* the duct: sections in increasing x, so the faces look in */
    push(K.dark, loft([ls(6.70, 0, -0.13, 0.36, 0.36), ls(7.30, 0, -0.13, 0.38, 0.38)], 30, null, null));
    K.dark.push(cyl(0.37, 0.37, 0.02, 24, "x", 6.72, 0, -0.13));
    /* the cone: a two-angle spike standing out of the lip, on its strut */
    push(K.metal, revolve([[0.5, 0.0], [0.05, 0.62], [-0.18, 0.86], [-0.5, 1.0]], 1.05, 0.305, 7.72, 0, -0.13, 22, 0, 0));
    K.dark.push(cyl(0.04, 0.04, 0.30, 8, "x", 7.12, 0, -0.13));
    /* nozzle: the afterburner shroud and the petals, a dark bore */
    push(K.metal, loft([ls(-7.62, 0, 0.05, 0.585, 0.58), ls(-7.80, 0, 0.05, 0.575, 0.57), ls(-7.98, 0, 0.05, 0.545, 0.54)], 28, null, null));
    push(K.dark, loft([ls(-7.96, 0, 0.05, 0.50, 0.50), ls(-7.50, 0, 0.05, 0.47, 0.47)], 24, null, 0.0));
    for (i = 0; i < 14; i++) {            /* petal seams */
      var pa = i * 2 * PI / 14;
      K.dark.push(bar([-7.66, Math.cos(pa) * 0.586, 0.05 + Math.sin(pa) * 0.581], [-7.97, Math.cos(pa) * 0.547, 0.05 + Math.sin(pa) * 0.542], 0.009, 4));
    }
    /* dorsal spine from the canopy to the fin (B: it stands above the canopy) */
    push(K.skin, loft(SPINE, 18, 0, 0.04));
    /* brake-chute box under the rudder (B, E) */
    push(K.skin, loft([ls(-7.45, 0, 0.74, 0.10, 0.10), ls(-7.75, 0, 0.74, 0.17, 0.17), ls(-8.30, 0, 0.74, 0.17, 0.17), ls(-8.42, 0, 0.74, 0.13, 0.13)], 14, 0.05, 0.02));
    /* four airbrakes round the rear fuselage ahead of the tailplane */
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) {
      var ab = (i > 0 ? 0.62 : -0.55);
      K.skin.push(box(1.10, 0.03, 0.40, -5.25, s * Math.cos(ab) * 0.712, 0.02 + Math.sin(ab) * 0.712, s * ab, 0, 0));
    }

    /* ---- canopy, its frames, headrest; booms and probes */
    push(K.glass, loft(CANOPY, 22, 0.03, 0.03));
    K.dark.push(bar([5.95, -0.40, 0.42], [5.95, -0.24, 0.72], 0.022, 6));
    K.dark.push(bar([5.95, 0.40, 0.42], [5.95, 0.24, 0.72], 0.022, 6));
    K.dark.push(bar([5.95, -0.24, 0.72], [5.95, 0.24, 0.72], 0.022, 6));
    K.dark.push(bar([4.62, -0.39, 0.45], [4.62, 0.39, 0.45], 0.028, 6));
    K.dark.push(box(0.36, 0.30, 0.42, 4.75, 0, 0.52));                                /* ejection seat head */
    K.dark.push(box(0.70, 0.62, 0.02, 6.95, 0, 0.36, 0, 0.30, 0));                     /* anti-glare panel */
    K.metal.push(cyl(0.022, 0.045, 2.70, 8, "x", 8.51, -0.40, 0.18));                  /* main boom (stbd), to x 9.86 */
    K.metal.push(cyl(0.05, 0.08, 0.40, 8, "x", 7.05, -0.40, 0.18));
    K.metal.push(box(0.025, 0.24, 0.012, 9.45, -0.40, 0.18));
    K.metal.push(box(0.025, 0.012, 0.18, 9.30, -0.40, 0.18));
    K.metal.push(cyl(0.016, 0.035, 1.30, 8, "x", 8.05, 0.40, 0.16));                   /* short boom (port) */
    K.metal.push(box(0.10, 0.02, 0.10, 6.6, -0.48, 0.15));                             /* AoA vane */
    K.dark.push(box(0.36, 0.05, 0.10, -1.2, 0, 0.94));                                 /* spine antennae */
    K.dark.push(box(0.30, 0.03, 0.30, 2.5, 0, -0.86, 0, 0, 0));                        /* belly blade */

    /* ---- glove, fences, outer panels with slats and flaps */
    for (s = -1; s <= 1; s += 2) {
      /* glove: main box ahead of the flap, then the flap */
      K.skin.push(solid(wPart(ROOT, s, 0, 0.84), wPart(1.6, s, 0, 0.84)));
      K.skin.push(solid(wPart(1.6, s, 0, 0.84), wPart(PIV, s, 0, 0.84)));
      K.skin.push(solid(wPart(BODY, s, 0.855, 1.0, 0.9), wPart(PIV - 0.03, s, 0.855, 1.0, 0.9)));
      /* the boundary fence at the pivot: full chord, above and below (A, D) */
      var fx0 = wLE(PIV) + 0.25, fx1 = wTE(PIV) - 0.05, fz = wZ(PIV);
      K.skin.push(solid(
        [[fx0, s * (PIV - 0.02), fz + 0.06], [fx1, s * (PIV - 0.02), fz + 0.10], [fx1 + 0.4, s * (PIV - 0.02), fz + 0.40], [fx0 - 1.2, s * (PIV - 0.02), fz + 0.34]],
        [[fx0, s * (PIV + 0.02), fz + 0.06], [fx1, s * (PIV + 0.02), fz + 0.10], [fx1 + 0.4, s * (PIV + 0.02), fz + 0.40], [fx0 - 1.2, s * (PIV + 0.02), fz + 0.34]]));
      /* outer panel: slat, box, flap, and a raked tip */
      K.skin.push(solid(wPart(PO, s, 0, 0.14, 0.8), wPart(TIP - 0.05, s, 0, 0.14, 0.8)));
      K.skin.push(solid(wPart(PO, s, 0.15, 0.74), wPart(TIP - 0.05, s, 0.15, 0.74)));
      K.skin.push(solid(wPart(PO + 0.05, s, 0.755, 1.0, 0.85), wPart(5.6, s, 0.755, 1.0, 0.85)));
      K.skin.push(solid(wPart(5.62, s, 0.755, 1.0, 0.85), wPart(TIP - 0.05, s, 0.755, 1.0, 0.85)));     /* aileron */
      var tz = wZ(TIP);
      K.skin.push(solid(
        foil([wLE(TIP - 0.05), s * (TIP - 0.05), tz], [wTE(TIP - 0.05), s * (TIP - 0.05), tz], wT(TIP - 0.05), [0, 0, 1]),
        foil([wLE(TIP) - 0.12, s * TIP, tz], [wTE(TIP) + 0.08, s * TIP, tz], 0.015, [0, 0, 1])));
      /* NR-30 muzzles out of the glove roots (D) */
      y = 1.02;
      K.gun.push(cyl(0.042, 0.042, 0.55, 10, "x", gLE(y) + 0.05, s * y, gZ(y) - 0.04));
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

    /* ---- tailplane: low, all-moving, anti-flutter rods at the tips */
    for (s = -1; s <= 1; s += 2) {
      var tz0 = -0.12;
      K.skin.push(solid(foil([-5.45, s * 0.45, tz0], [-7.75, s * 0.45, tz0], 0.22, [0, 0, 1]),
                        foil([-7.30, s * 2.30, tz0], [-8.50, s * 2.30, tz0], 0.07, [0, 0, 1])));
      K.metal.push(cyl(0.035, 0.035, 0.80, 8, "x", -7.05, s * 2.27, tz0));
      push(K.metal, revolve([[0.5, 0.05], [0.2, 1.0], [-0.3, 1.0], [-0.5, 0.4]], 0.36, 0.065, -6.70, s * 2.27, tz0, 10, 0, 0));
      K.metal.push(cyl(0.11, 0.11, 0.12, 12, "y", -6.40, s * 0.78, tz0));               /* pivot fairing */
    }

    /* ---- fin with its fillet, rudder, tip cap */
    K.skin.push(solid(finPart(0.80, 0, 0.80), finPart(2.10, 0, 0.80)));
    K.skin.push(solid(finPart(2.10, 0, 0.80), finPart(FIN_TOP - 0.10, 0, 0.80)));
    K.skin.push(solid(finPart(0.98, 0.815, 1.0), finPart(FIN_TOP - 0.14, 0.815, 1.0)));
    K.skin.push(solid(foil([-3.55, 0, 0.82], [-4.90, 0, 0.82], 0.22, [0, 1, 0]),
                      foil([-4.66, 0, 1.30], [-4.84, 0, 1.30], 0.05, [0, 1, 0])));
    K.dark.push(solid(finPart(FIN_TOP - 0.10, 0.02, 0.80), finPart(FIN_TOP, 0.08, 0.75)));
    K.dark.push(box(0.30, 0.06, 0.12, -6.50, 0, 1.15));                               /* fin antenna */

    /* ---- pylons: twin fuselage, three under each glove (C) */
    for (s = -1; s <= 1; s += 2) {
      pylon(K.skin, 1.20, -1.40, s * 0.40, -0.62, -0.84, 0.10);
      pylon(K.skin, 0.80, -1.70, s * 1.24, underAt(1.24) + 0.02, underAt(1.24) - 0.24);
      pylon(K.skin, -0.30, -2.30, s * 2.02, underAt(2.02) + 0.02, underAt(2.02) - 0.22);
      pylon(K.skin, -0.70, -2.90, s * 2.70, underAt(2.70) + 0.04, underAt(2.70) - 0.26, 0.10);
    }
    var ST = cfg.stores;
    for (s = -1; s <= 1; s += 2) for (i = 0; i < ST.length; i++) {
      var st = ST[i], sy = st.y, zt = sy < 0.6 ? -0.84 : underAt(sy) - (sy > 2.5 ? 0.26 : 0.24);
      store(K, st.kind, st.x, s * sy, zt);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");
    mesh(g, K.gun, T.gun, "guns");

    /* ---- landing gear (E): named "gear"; its tyres are the lowest points */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 4.30, nr = 0.33, nz = GROUND + nr;
    G.metal.push(bar([4.52, 0, -0.66], [nx + 0.04, 0, nz + 0.10], 0.06, 10));
    G.metal.push(bar([nx + 0.04, -0.13, nz + 0.30], [nx, -0.13, nz], 0.028, 6));
    G.metal.push(bar([nx + 0.04, 0.13, nz + 0.30], [nx, 0.13, nz], 0.028, 6));
    G.metal.push(bar([nx + 0.04, -0.13, nz + 0.30], [nx + 0.04, 0.13, nz + 0.30], 0.03, 6));
    G.metal.push(bar([3.70, 0, -0.70], [nx + 0.02, 0, -1.05], 0.035, 6));               /* drag strut */
    G.tyre.push(cyl(nr, nr, 0.20, 26, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.21, 14, "y", nx, 0, nz));
    G.dark.push(box(0.70, 0.30, 0.03, nx + 0.05, 0, nz + nr + 0.06));                   /* mudguard */
    for (s = -1; s <= 1; s += 2) G.skin.push(box(1.10, 0.025, 0.42, 4.55, s * 0.30, -0.80));    /* nose doors */
    var mx = -1.60, mr = 0.44, mzz = GROUND + mr, my = 1.92;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([-1.35, s * 1.62, 0.0], [mx, s * (my - 0.17), mzz + 0.05], 0.075, 10));
      G.metal.push(bar([mx, s * (my - 0.17), mzz], [mx, s * (my - 0.17), mzz + 0.02], 0.08, 8));
      G.metal.push(bar([-0.40, s * 1.05, -0.08], [-1.45, s * 1.70, -1.05], 0.035, 6));   /* side brace */
      G.metal.push(cyl(0.05, 0.05, 0.24, 8, "y", mx, s * (my - 0.08), mzz));              /* axle */
      G.tyre.push(cyl(mr, mr, 0.23, 30, "y", mx, s * my, mzz));
      G.metal.push(cyl(mr * 0.52, mr * 0.52, 0.24, 16, "y", mx, s * my, mzz));
      G.skin.push(box(1.30, 0.025, 0.72, -1.45, s * 1.46, -0.48, s * 0.35, 0, 0));      /* leg door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    mesh(gr, G.skin, T.skin, "gear_doors", true);
    return g;
  }

  var FITS = {
    /* C, first load less its AA-8: tanks on the fuselage pair, four UB-32 */
    cas:  { node: "su17", stores: [{ kind: "tank", x: 0.10, y: 0.40 }, { kind: "ub32", x: 0.10, y: 1.24 }, { kind: "ub32", x: -1.30, y: 2.70 }] },
    /* C, the AS-9 load: tanks on the fence pylons, Kh-28 inboard */
    sead: { node: "su17_kh28", stores: [{ kind: "tank", x: -1.70, y: 2.70 }, { kind: "kh28", x: 0.20, y: 1.24 }] }
  };
  function maker(f) { return function (THREE, M, C) { return buildAirframe(THREE, C, f); }; }
  return { cas: maker(FITS.cas), sead: maker(FITS.sead) };
})();

/* len is the measured x extent: boom tip (9.86) to fin tip (-8.94) */
UNIT_MODELS["pact_e60_cas"]  = { len: 18.8, build: HeroSu17.cas };
UNIT_MODELS["pact_e60_sead"] = { len: 18.8, build: HeroSu17.sead };
