/* ============ ru_oscar.js -- HERO model: Project 949A Antey (NATO Oscar II) SSGN (ssgn_p) ============
   Full-quality redo, 2026-10-24. The row is "Oscar II SSGN" / "Project 949A Antey", from e80 on, armed
   with twenty-four P-700 Granit (rules.js), so the boat drawn is the 949A as built from 1986 (K-148
   Krasnodar onward) in its Granit fit. The 949AM refits (Oniks / Kalibr, 2010s) are NOT drawn.

   References (Wikimedia Commons, fetched at width=960, cached in scratchpad/q_oscar_ref):
     - "Oscar II class SSGN.svg" (a_svg.png, starboard elevation, bow right, 959 px = 154 m, 6.23 px/m):
       THE source for every station. Read off it: crown row 72 over the parallel body, rising to row 68
       from 480 px to the sail's after edge (588 px) and back to 72 at its front (768 px); keel row 157
       from 280 to 880 px; the water line (white line, 9.2 m over the keel) at row 99.5 and the boot line
       at row 116.5; the tail cone to 14 px, the round bow from 880 px; the sail 588-768 px with a raked
       after edge (588 -> 595 px), a flat roof at row 46, the bridge a little higher at the fore top (row
       43-45, 748 px on) with four windows, a low housing on the roof (690-720 px) and the masts' stations
       (622, 630, 639, 652, 663, the radome at 678, 723, 740 px); SIX long hatch panels a side
       (548-808 px, rows 76-89, boundaries at 593, 634, 677, 719, 762 px) with a short end panel abaft
       (535-548 px) and nine pairs of round ports under them (row 95); the bow-plane housing forward of the
       panels (813-852 px, rows 86-93); the rows of flood slots; the upper fin (trailing edge 70 px,
       head row 65.5 from 70 to 102 px, leading edge down to the hull at 150 px) with the towed-array
       pod across its head (54-102 px, rows 64-68) and the rudder hinge at 86 px; the lower fin (64-98 px,
       to row 155); the stern planes edge-on at row 117 (53-107 px); the screw at the tail (0-14 px,
       2.6 m radius, hub row 121); black above the boot line, red-brown under it.
     - "Oscar class submarine 3.jpg" (c_aerial, US Navy, from above the starboard quarter, underway): the
       very wide flat casing, the sail well forward, the line of hatch panels along the shoulder catching
       the light, the upper fin standing alone aft.
     - "Oscar class submarine 1.JPG" (d_os1, from astern, high): the plan of the casing (wide, tapering
       aft to about a third of the beam where it meets the water), the sail about 5-6 m wide with a round
       nose, the rows of dark flood slots along both casing edges, the walkway seams and the small dark
       fittings down the centreline with a round and a pale hatch abaft the sail, the pod on the fin head.
     - "Oscar class submarine 2.JPG" (b_bowq) and "Soviet Oscar Class submarine.JPEG" (e_sov, bow on):
       the blunt round bow and broad flat-topped casing, the sail's upright rounded front with its top
       edges well rounded and the sides leaning in a little, the windows at the fore top, ONE whip mast
       raised; the tile courses and panel seams.
     - "Submarine Oscar class.jpg" (f_sub, colour, from above the starboard quarter): paint sampled here.
     - en.wikipedia "Oscar-class submarine": two shafts; 18.2 m beam (it gives 155 m and 9 m draught; the
       drawing and the row's len use 154 m, kept).

   RECOGNITION (each one shows on the final sheets):
     1. The very wide (18.2 m), flat-topped, round-shouldered casing; the blunt round bow; the long tail
        cone (drawing; photographs d, e, f).
     2. The long, low sail set forward (17.6 to 46.3 m before amidships): raked after edge, upright
        rounded front, flat roof with rounded edges (drawing; photographs b, e).
     3. The bridge at the sail's fore top with its four windows (drawing; photographs b, e).
     4. The twenty-four P-700 Granit: SIX hatch panels a side, two tubes under each, on the casing
        shoulder 11.0 to 52.8 m before amidships, lying at the shoulder's own slope, about 35-40 degrees,
        outlined by dark joints; the short end panel abaft them (drawing; photographs c, f).
     5. The retractable bow planes forward of the panels: run out of their housing (813-852 px, rows
        86-93 of the drawing), as photograph e shows one at sea.
     6. The upper fin standing alone aft, with the towed-array pod across its head and the rudder hinge
        (drawing; photographs b, d, e).
     7. The lower fin and the horizontal stern planes (drawing).
     8. Twin shafts with seven-blade screws (en.wikipedia: two shafts; drawing: seven blades, the screw
        at the tail).
     9. Black anechoic tile skin with a tonal patchwork, the rows of flood slots along the upper sides,
        the walkway seams and centreline fittings (photographs d, f; slot rows from the drawing).
    10. The red-brown under-body below the boot line (the drawing only; no photograph shows it: the
        Commons search of 2026-10-24 found the Kursk only as diagrams, and "K-410 Smolensk.jpg",
        "Tomsk in Vilyuchinsk" and "K-186 Omsk in 2025.jpg" show the hull black down to the water line).
    11. One whip mast raised (b, e, f); the drawing's other masts housed, their lids on the roof.

   CORRECTED from the first model (ru_oscar.js of HEAD):
     - The sail is 5.8 m wide (photographs d and e against the 18.2 m beam), not the estimated 8 m.
     - The section is flat-topped with rounded shoulders (photographs e, f), not a symmetric superellipse.
     - The hatch panels are lofted onto the shoulder with their joints, not flat tilted boxes.
     - Masts: the photographs at sea show one whip raised; the full raised suite and radome of the drawing
       are not drawn (only their lids). Two shafts confirmed (en.wikipedia), drawn as before.
   ESTIMATED, not measured: the plan of the casing (half beam taken in proportion to the drawn depth,
   18.2 m over the parallel body, round in the tail cone); the section's shape (exponents fitted to the
   bow photograph); the sail width (5.8 m) and its 0.25 m lean-in; the stern planes' span (+-7.6 m); the
   pod's section (1.24 m); the bow planes' size; the shafts' spacing (+-2.75 m); the deck fittings' stations (perspective
   photograph d).
   NOT DRAWN: hull numbers, names, flags, rails, draft marks; the masts the photographs show housed;
   end plates on the stern planes (nothing confirms them).
   The bow planes' station is the drawing's housing; the photographs, taken at an angle, do not fix it
   better. Their size (5 m root chord, 3.2 m out from the hull) is ESTIMATED from photograph e.
   Paint: photograph f, casing in light, sampled (54,57,62); taken to ~0.75 for the ACES lift: #28292c.
   The drawing's under-body red-brown muted to #3e2620. Bronze screws (drawing).
   Model space +X bow, +Y port, +Z up, metres; water line z = 0 (crown 4.4-5.1 m over it, the drawing).
   render3d scales a submarine by UNIT_MODELS[key].len, the true 154 m; the model's X extent is 154.25 m
   (screw tips to bow). Named nodes: none read by any file (render3d reads no sub node names; combat.js
   launches from the unit's position); the row is not turret:true, so nothing is named "turret".
   Merged per material: 8 draw calls, 8 materials, 3 canvas textures. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOscar949A = (function () {
  "use strict";
  var PI = Math.PI;

  /* ---- the side elevation "Oscar II class SSGN.svg" at 960 px: 959 px = 154 m, the water line
     (the drawing's white line, draught 9.2 m over the keel) at row 99.5 ---- */
  var PXM = 959 / 154, WLR = 99.5;
  function X(col) { return col / PXM - 77.0; }
  function Z(row) { return (WLR - row) / PXM; }
  /* [column, crown row, keel row] read off the elevation (under the fins: the hull line drawn through) */
  var DR = [
    [14, 117, 125], [20, 116, 126], [30, 115, 127], [40, 113, 129], [52, 111, 130], [60, 110, 132],
    [80, 104, 135], [100, 97.5, 138], [120, 92, 141], [140, 87.5, 144], [160, 84, 147], [180, 81.5, 149],
    [200, 80, 152], [220, 78, 154], [240, 76, 155], [260, 74, 156], [280, 73, 157], [300, 72, 157],
    [430, 72, 157], [450, 71, 157], [470, 69, 157], [480, 68, 157], [588, 68, 157], [768, 72, 157],
    [880, 72, 157], [900, 74, 156], [908, 76, 156], [916, 78, 155], [924, 81, 153], [932, 85, 151],
    [940, 89, 147], [948, 95, 142], [952, 99, 138], [956, 105, 132], [958.6, 112, 124]
  ];
  var KW = 9.1 / (85 / 2 / PXM);         /* beam 18.2 m over the drawn depth of the parallel body */
  var X0 = X(DR[0][0]), X1 = X(DR[DR.length - 1][0]);
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function sm(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  /* section at x: [x, crown z, keel z, half beam, z of the widest line, upper exp, lower exp] */
  function look(x) {
    var col = (x + 77.0) * PXM, i, a, b, t, top, kel;
    if (col <= DR[0][0]) { top = DR[0][1]; kel = DR[0][2]; }
    else if (col >= DR[DR.length - 1][0]) { top = DR[DR.length - 1][1]; kel = DR[DR.length - 1][2]; }
    else {
      for (i = 1; i < DR.length; i++) if (col <= DR[i][0]) break;
      a = DR[i - 1]; b = DR[i]; t = (col - a[0]) / (b[0] - a[0]);
      if (a[0] >= 900) {                /* bow: the half depth squared runs linear (round nose) */
        var ha = (a[2] - a[1]) / 2, hb = (b[2] - b[1]) / 2, ca = (a[1] + a[2]) / 2, cb = (b[1] + b[2]) / 2;
        var hh = Math.sqrt(Math.max(0, ha * ha + (hb * hb - ha * ha) * t)), cc = ca + (cb - ca) * t;
        top = cc - hh; kel = cc + hh;
      } else {
        t = t * t * (3 - 2 * t) * 0.5 + t * 0.5;
        top = a[1] + (b[1] - a[1]) * t; kel = a[2] + (b[2] - a[2]) * t;
      }
    }
    var zt = Z(top), zk = Z(kel), d = zt - zk;
    /* the tail cone is round; the body wide, flat-topped and round-shouldered (photographs) */
    var body = sm((col - 60) / 240) * (1 - sm((col - 935) / 24) * 0.6);
    var k = 1.0 + (KW - 1.0) * body;
    var f = 0.5 - 0.08 * body;
    return [x, zt, zk, Math.min(d / 2 * k, 9.1), zt - d * f, 2.0 + 0.85 * body, 2.0 + 0.3 * body];
  }
  /* point on the hull at girth angle th (0 port beam, PI/2 crown, PI starboard, 3PI/2 keel) */
  function surf(s, th) {
    var c = Math.cos(th), n = Math.sin(th), p = n >= 0 ? s[5] : s[6];
    var y = s[3] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / p);
    var h = n >= 0 ? s[1] - s[4] : s[4] - s[2];
    var z = s[4] + (n < 0 ? -1 : 1) * h * Math.pow(Math.abs(n), 2 / p);
    return [y, z];
  }
  function topZ(x, y) {
    var s = look(x), u = Math.min(Math.abs(y) / s[3], 0.9999);
    return s[4] + (s[1] - s[4]) * Math.pow(1 - Math.pow(u, s[5]), 1 / s[5]);
  }
  function sideY(x, z) {
    var s = look(x), d = z - s[4], h, p;
    if (d >= 0) { h = s[1] - s[4]; p = s[5]; } else { h = s[4] - s[2]; p = s[6]; d = -d; }
    return s[3] * Math.pow(Math.max(1 - Math.pow(Math.min(d / h, 0.9999), p), 0), 1 / p);
  }
  /* girth fraction (0 port beam, 0.25 crown, 0.5 starboard beam, 0.75 keel) of height z, port side */
  function girthV(x, z) {
    var s = look(x), d = z - s[4], h;
    if (d >= 0) { h = s[1] - s[4]; return Math.asin(Math.pow(Math.min(d / h, 1), s[5] / 2)) / (2 * PI); }
    h = s[4] - s[2];
    return -Math.asin(Math.pow(Math.min(-d / h, 1), s[6] / 2)) / (2 * PI);
  }

  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      done: function (T, g) {
        var k;
        for (k in by) {
          var list = by[k], n = 0, i, j;
          for (i = 0; i < list.length; i++) n += list[i].attributes.position.count;
          var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
          for (i = 0; i < list.length; i++) {
            var a = list[i].attributes, c = a.position.count;
            for (j = 0; j < c * 3; j++) { P[o * 3 + j] = a.position.array[j]; N[o * 3 + j] = a.normal.array[j]; }
            if (a.uv) for (j = 0; j < c * 2; j++) U[o * 2 + j] = a.uv.array[j];
            o += c;
          }
          var G = new THREE.BufferGeometry();
          G.setAttribute("position", new THREE.BufferAttribute(P, 3));
          G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
          G.setAttribute("uv", new THREE.BufferAttribute(U, 2));
          var mesh = new THREE.Mesh(G, T[k]);
          mesh.name = "m_" + k;
          mesh.castShadow = true; mesh.receiveShadow = true;
          g.add(mesh);
        }
      }
    };
  }

  /* a grid patch; fn(u, v) -> [x, y, z]; metre UVs (x and y, or x and z) */
  function gridGeo(THREE, nx, nz, fn, flip, uvz) {
    var pos = [], uv = [], idx = [], i, j, a, b, c, d, v;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        v = fn(i / nx, j / nz); pos.push(v[0], v[1], v[2]); uv.push(v[0], uvz ? v[2] : v[1]);
      }
    }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        a = j * (nx + 1) + i; b = a + 1; c = a + nx + 1; d = c + 1;
        if (flip) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* stacked rings (each {z, pts:[[x,y(,z)]..]}, counter-clockwise from above), metre UVs, flat cap */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p, zz;
    for (i = 0; i < L; i++) {
      var run = 0, prev = rings[i].pts[0];
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        run += Math.sqrt((p[0] - prev[0]) * (p[0] - prev[0]) + (p[1] - prev[1]) * (p[1] - prev[1]));
        prev = p;
        zz = p.length > 2 ? p[2] : rings[i].z;
        pos.push(p[0], p[1], zz); uv.push(run, zz);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    }
    var top = rings[L - 1], base = pos.length / 3, cx = 0, cy = 0, k;
    for (k = 0; k < N; k++) { cx += top.pts[k][0]; cy += top.pts[k][1]; }
    cx /= N; cy /= N;
    pos.push(cx, cy, top.z); uv.push(cx, cy);
    for (k = 0; k < N; k++) { pos.push(top.pts[k][0], top.pts[k][1], top.z); uv.push(top.pts[k][0], top.pts[k][1]); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* flat extrusion of an outline; xz: the outline is (x, z), thickness toward -y */
  function ext(THREE, pts, depth, xz) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false });
    if (xz) g.rotateX(PI / 2);
    g.computeVertexNormals();
    return g;
  }
  function strut(THREE, A, mat, r, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r, r, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  function cylX(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, 0, 0, -PI / 2);
  }

  /* ---------------------------------------------------------------- hull skin texture
     u stern -> bow over X0..X1, v round the girth; the canvas is flipped on upload, so row = (1 - v) H */
  var PAINT = "#28292c", TONE = [40, 41, 44], RED = "#3e2620";
  var _tex = {};
  function hullTex(THREE, low) {
    var key = low ? "low" : "hull";
    if (_tex[key]) return _tex[key];
    var TW = 1024, TH = 512, cv = cvs(TW, TH), cx = cv.getContext("2d"), R1 = rng(low ? 9492 : 9491), i, j, k, sg;
    function uOf(x) { return (x - X0) / (X1 - X0) * TW; }
    function rowOf(x, z, s) {
      var v = girthV(x, z); v = s > 0 ? v : 0.5 - v;
      if (v < 0) v += 1;
      return (1 - v) * TH;
    }
    cx.fillStyle = low ? RED : PAINT; cx.fillRect(0, 0, TW, TH);
    /* anechoic tiles: about 1.1 m x 0.75 m courses, staggered, a tonal patchwork */
    var tw = 1.1 / (X1 - X0) * TW, th = TH / Math.round(PI * 2 * 8.0 / 0.75), nc = Math.round(TH / th);
    for (j = 0; j < nc; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < TW; i++) {
        var r0 = R1();
        cx.fillStyle = r0 < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.026).toFixed(3) + ")"
                                : "rgba(0,0,0," + (0.03 + R1() * 0.08).toFixed(3) + ")";
        cx.fillRect(i * tw + off + 0.5, j * th + 0.5, tw - 1, th - 1);
      }
    }
    for (i = 0; i < 90; i++) {                                /* patches of replaced tiles */
      var bw = tw * (2 + Math.floor(R1() * 7)), bh = th * (1 + Math.floor(R1() * 3));
      cx.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.12)";
      cx.fillRect(R1() * TW, R1() * TH, bw, bh);
    }
    cx.strokeStyle = "rgba(0,0,0,0.36)"; cx.lineWidth = 1;
    for (j = 0; j <= nc; j++) { cx.beginPath(); cx.moveTo(0, j * th); cx.lineTo(TW, j * th); cx.stroke(); }
    for (j = 0; j < nc; j++) {
      var o2 = (j % 2) ? tw * 0.5 : 0;
      for (i = 0; i * tw + o2 < TW; i++) { cx.beginPath(); cx.moveTo(i * tw + o2, j * th); cx.lineTo(i * tw + o2, (j + 1) * th); cx.stroke(); }
    }
    var x;
    /* flood slots and drain holes as drawn: [first col, last col, row, slot length px, pitch px] */
    var SL = [[256, 258, 79.5, 2.4, 4.5], [279, 350, 79.5, 2.4, 4.5], [390, 397, 79.5, 2.4, 4.5], [434, 474, 79.5, 2.4, 4.5],
              [488, 531, 79.5, 2.4, 4.5], [277, 293, 118, 2.6, 4.2], [277, 293, 122, 2.6, 4.2], [370, 397, 128, 2.4, 4.5],
              [339, 356, 132.5, 2.4, 4.5], [409, 432, 137.5, 2.4, 4.5], [752, 769, 138, 2.4, 4.5], [526, 564, 143, 2.4, 4.5],
              [595, 648, 143, 2.4, 4.5], [661, 671, 143, 2.4, 4.5], [686, 702, 143, 2.4, 4.5], [725, 740, 143, 2.4, 4.5]];
    cx.fillStyle = "rgba(6,6,8,0.92)";
    for (k = 0; k < SL.length; k++) {
      var S = SL[k], c0;
      if ((S[2] > 116.5) !== !!low) continue;
      for (c0 = S[0]; c0 <= S[1]; c0 += S[4]) {
        for (sg = -1; sg <= 1; sg += 2) {
          var xs0 = X(c0), r1 = rowOf(xs0, Z(S[2]) + 0.22, sg), r2 = rowOf(xs0, Z(S[2]) - 0.22, sg);
          cx.fillRect(uOf(xs0), Math.min(r1, r2), Math.max(1.5, S[3] / PXM / (X1 - X0) * TW), Math.max(2, Math.abs(r2 - r1)));
        }
      }
    }
    /* the casing top as photographed from astern ("Oscar class submarine 1"): the walkway seams either
       side of the centreline, the small dark deck fittings along it, a round hatch and a pale hatch */
    if (!low) {
      var vC = 0.25, yW = 1.3, xw;
      for (xw = -58; xw < 70; xw += 0.5) {
        var Lw = look(xw), dv = Math.asin(Math.pow(Math.min(1, Math.max(0, (topZ(xw, yW) - Lw[4]) / (Lw[1] - Lw[4]))), Lw[5] / 2)) / (2 * PI);
        cx.fillStyle = "rgba(0,0,0,0.5)";
        cx.fillRect(uOf(xw), (1 - dv) * TH - 0.5, 0.5 / (X1 - X0) * TW + 0.5, 1);
        cx.fillRect(uOf(xw), (1 - (0.5 - dv)) * TH - 0.5, 0.5 / (X1 - X0) * TW + 0.5, 1);
      }
      cx.fillStyle = "rgba(4,4,6,0.9)";
      for (xw = -52; xw < 14; xw += 3.6) cx.fillRect(uOf(xw), (1 - vC) * TH - 2, 0.7 / (X1 - X0) * TW, 4);
      for (xw = 50; xw < 66; xw += 3.6) cx.fillRect(uOf(xw), (1 - vC) * TH - 2, 0.7 / (X1 - X0) * TW, 4);
      cx.beginPath(); cx.ellipse(uOf(-21), (1 - vC) * TH, 0.45 / (X1 - X0) * TW, 5, 0, 0, 2 * PI); cx.fill();
      cx.fillStyle = "rgba(190,192,194,0.7)";
      cx.fillRect(uOf(-29), (1 - vC) * TH - 6, 1.6 / (X1 - X0) * TW, 12);
    }
    /* the drawing's pairs of round ports under the missile hatches, row 95 */
    var OO = low ? [] : [595, 617, 638, 660, 680, 702, 723, 745, 765];
    for (k = 0; k < OO.length; k++) {
      for (sg = -1; sg <= 1; sg += 2) {
        for (j = -1; j <= 1; j += 2) {
          var xo = X(OO[k]) + j * 0.42, ro = rowOf(xo, Z(95), sg);
          cx.beginPath(); cx.ellipse(uOf(xo), ro, 0.3 / (X1 - X0) * TW, 3, 0, 0, 2 * PI); cx.fill();
        }
      }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex[key] = t;
    return t;
  }
  /* 2 m tile patch for the parts with metre UVs: sail, fins, hatch lids, planes */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d"), R1 = rng(9493), i, j;
    g.fillStyle = PAINT; g.fillRect(0, 0, S, S);
    for (j = 0; j < 3; j++) {
      for (i = -1; i < 2; i++) {
        var o = (j % 2) ? 32 : 0;
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.012 + R1() * 0.03).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.04 + R1() * 0.07).toFixed(3) + ")";
        g.fillRect(i * 64 + o + 1, j * 43 + 1, 62, 41);
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.2;
    for (j = 0; j <= 3; j++) { g.beginPath(); g.moveTo(0, j * 43); g.lineTo(S, j * 43); g.stroke(); }
    for (j = 0; j < 3; j++) {
      var oo = (j % 2) ? 32 : 0;
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * 64 + oo, j * 43); g.lineTo(i * 64 + oo, (j + 1) * 43); g.stroke(); }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.repeat.set(0.5, 0.5);
    t.anisotropy = 4;
    _tex.tile = t;
    return t;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group(), A = Acc(THREE);
    var i, j, k, x, sg, z, s;
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    var T = {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.92, metalness: 0.04 }),
      tile:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.92, metalness: 0.04 }),
      red:    new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE, true), roughness: 0.92, metalness: 0.04 }),
      dark:   std(0x0b0c0e, 0.80, 0.20),     /* joints, windows, slots, lids' seams */
      lid:    std(0x34363b, 0.58, 0.12),     /* the Granit hatch lids: they catch the light (aerial photograph) */
      metal:  std(0x34383c, 0.55, 0.45),     /* masts, shafts */
      bronze: std(0x6e5c38, 0.45, 0.70),     /* propellers (the drawing) */
      team:   std(team, 0.86, 0.06)
    };

    /* ---- hull: lofted grid over the drawn stations, outward winding, UVs for the skin canvas ---- */
    var xs = [], cols = [], NG = 40;
    for (i = 0; i < DR.length; i++) cols.push(DR[i][0]);
    for (x = 320; x < 880; x += 14) cols.push(x);
    for (x = 941; x < 958.6; x += 1.5) cols.push(x);
    cols.sort(function (p, q) { return p - q; });
    for (i = 0; i < cols.length; i++) if (i === 0 || cols[i] - cols[i - 1] > 0.6) xs.push(X(cols[i]));
    /* split at the drawing's boot line (row 116.5): black casing above, the drawn red-brown below */
    var ZB = Z(116.5);
    function bootTh(s0) {                                       /* port girth angle of the boot line */
      if (ZB >= s0[1]) return PI / 2;
      var n = -Math.pow(clamp((s0[4] - ZB) / (s0[4] - s0[2]), 0, 1), s0[6] / 2);
      if (ZB > s0[4]) n = Math.pow(clamp((ZB - s0[4]) / (s0[1] - s0[4]), 0, 1), s0[5] / 2);
      return Math.asin(n);
    }
    function hullPart(lower) {
      var pos = [], uv = [], idx = [], ii, jj, NP = lower ? 24 : NG;
      for (ii = 0; ii < xs.length; ii++) {
        var s0 = look(xs[ii]), tb = bootTh(s0), t0 = lower ? PI - tb : tb, t1 = lower ? 2 * PI + tb : PI - tb;
        for (jj = 0; jj <= NP; jj++) {
          var th = t0 + (t1 - t0) * jj / NP, p = surf(s0, th);
          pos.push(xs[ii], p[0], p[1]); uv.push((xs[ii] - X0) / (X1 - X0), th / (2 * PI));
        }
      }
      for (ii = 0; ii < xs.length - 1; ii++) {
        var c0 = !lower && ZB >= look(xs[ii])[1], c1 = !lower && ZB >= look(xs[ii + 1])[1];
        if (c0 && c1) continue;
        for (jj = 0; jj < NP; jj++) {
          var a = ii * (NP + 1) + jj, b = a + 1, c = a + NP + 1, d = c + 1;
          if (!c0) idx.push(a, b, c);
          if (!c1) idx.push(b, d, c);
        }
      }
      var hg = new THREE.BufferGeometry();
      hg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      hg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      hg.setIndex(idx);
      hg.computeVertexNormals();
      return hg;
    }
    A.add("skin", hullPart(false), 0, 0, 0);
    A.add("red", hullPart(true), 0, 0, 0);
    /* the bow tip and the tail end closed */
    s = look(X1); A.add("red", new THREE.SphereGeometry(1, 12, 8), X1 - 0.02, 0, s[4] * 0 + (s[1] + s[2]) / 2, 0, 0, 0, [0.25, s[3] * 0.98, (s[1] - s[2]) / 2 * 0.98]);
    s = look(X0); A.add("red", new THREE.CircleGeometry(1, 14), X0, 0, (s[1] + s[2]) / 2, 0, -PI / 2, 0, [1, (s[1] - s[2]) / 2 * 1.02, s[3] * 1.02]);

    /* ---- the sail (fin): 588-768 px, raked aft edge, upright rounded front, flat roof ---- */
    var SZ0 = Z(68) - 0.9, STOP = Z(46), RT = 0.85, HW = 2.9, TUM = 0.25;
    function aftAt(zz) { return X(588 + 7 * clamp((zz - Z(68)) / (Z(47) - Z(68)), 0, 1)); }
    var XF = X(766.5);
    var NS = 30;
    function ring(xa, xf, hw) {
      var L = xf - xa, ln = Math.min(hw * 1.35, L * 0.3), la = Math.min(hw * 1.1, L * 0.25), pts = [], kk, xx, yy, e;
      for (kk = 0; kk <= NS; kk++) {
        xx = xf - L * (0.5 - 0.5 * Math.cos(PI * kk / NS));
        if (xx > xf - ln) { e = (xx - (xf - ln)) / ln; yy = hw * Math.sqrt(Math.max(0, 1 - e * e)); }
        else if (xx < xa + la) { e = (xa + la - xx) / la; yy = hw * Math.sqrt(Math.max(0, 1 - e * e)); }
        else yy = hw;
        pts.push([xx, yy]);
      }
      for (kk = NS - 1; kk >= 1; kk--) pts.push([pts[kk][0], -pts[kk][1]]);
      return pts;
    }
    var rings = [], zl = [SZ0, Z(68) + 0.15, Z(68) + 0.6];
    for (k = 1; k <= 3; k++) zl.push(Z(68) + 0.6 + (STOP - RT - Z(68) - 0.6) * k / 3);
    var tops = [0.4, 0.7, 0.9, 1.0];
    for (k = 0; k < tops.length; k++) zl.push(STOP - RT + RT * tops[k]);
    for (k = 0; k < zl.length; k++) {
      var zz = zl[k], e2 = Math.max(0, zz - (STOP - RT)) / RT, sh = RT * (1 - Math.sqrt(Math.max(0, 1 - e2 * e2)));
      var fl = k === 0 ? 0.35 : (k === 1 ? 0.18 : 0);           /* a small foot fillet */
      var tum = TUM * clamp((zz - Z(68)) / (STOP - Z(68)), 0, 1);  /* the sides lean in a little (bow photograph) */
      rings.push({ z: zz, pts: ring(aftAt(zz) + sh - fl * 2, XF - sh + fl, HW - tum - sh + fl) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);
    /* the bridge at the fore top, a little higher (drawing 43-45 px), with its four windows (drawing;
       Oscar class submarine 1 / Soviet Oscar Class submarine photographs) */
    var BZ = Z(43.5);
    var br = [];
    for (k = 0; k < 3; k++) {
      var zb2 = STOP - 0.2 + (BZ - STOP + 0.2) * k / 2, shb = k === 2 ? 0.25 : 0;
      br.push({ z: zb2, pts: ring(X(748) + shb, XF - RT * 0.6 - shb, HW - TUM - RT * 0.6 - shb) });
    }
    A.add("tile", shell(THREE, br), 0, 0, 0);
    function onNose(zz, th0, dep, hw0) {
      var L = XF - aftAt(zz), ln = Math.min(hw0 * 1.35, L * 0.3);
      var px = XF - ln + ln * Math.cos(th0), py = hw0 * Math.sin(th0);
      var ang = Math.atan2(Math.sin(th0) / hw0, Math.cos(th0) / ln);
      return [px - Math.cos(ang) * dep, py - Math.sin(ang) * dep, ang];
    }
    var WIN = [-0.55, -0.19, 0.19, 0.55];
    for (k = 0; k < WIN.length; k++) {
      var wz = STOP - 0.75, wp = onNose(wz, WIN[k], 0.02, HW - TUM * 0.85);
      A.add("dark", new THREE.BoxGeometry(0.12, 0.62, 0.42), wp[0], wp[1], wz, 0, 0, wp[2]);
    }
    /* the low housing on the roof (drawing 690-720 px) and the flush mast lids where the drawing
       stands its masts; one whip mast raised, as every photograph at sea shows */
    A.add("tile", new THREE.SphereGeometry(1, 16, 6, 0, 2 * PI, 0, PI / 2), X(705), 0, STOP - 0.02, PI / 2, 0, 0, [2.4, 0.35, 1.4]);
    var LIDS = [[622, 0.45], [630, -0.45], [639, 0.5], [652, -0.5], [663, 0.4], [678, 0], [723, 0.6], [740, -0.6]];
    for (k = 0; k < LIDS.length; k++) {
      A.add("dark", new THREE.CylinderGeometry(0.42, 0.42, 0.06, 12), X(LIDS[k][0]), LIDS[k][1], STOP + 0.01, PI / 2, 0, 0);
    }
    var mx = X(723);
    A.add("metal", new THREE.CylinderGeometry(0.2, 0.24, 0.5, 10), mx, 0.6, STOP + 0.25, PI / 2, 0, 0);
    strut(THREE, A, "metal", 0.09, [mx, 0.6, STOP], [mx, 0.6, Z(23)], 8);
    A.add("metal", new THREE.SphereGeometry(0.16, 8, 6), mx, 0.6, Z(23));

    /* ---- the twenty-four P-700 Granit: six hatch panels a side, each over two tubes, on the casing
       shoulder between rows 76 and 89 (drawing), lying at the casing's own slope ---- */
    var HB = [548.3, 592.7, 634.3, 676.7, 719.3, 761.7, 808.3], HZ0 = Z(89), HZ1 = Z(76);
    function onHull(x0, zz, out) {
      var y0 = sideY(x0, zz), dz = 0.05;
      var yu = sideY(x0, zz + dz), yd = sideY(x0, zz - dz);
      var ny = dz * 2, nz = (yd - yu);                         /* outward normal in (y, z) */
      var nl = Math.sqrt(ny * ny + nz * nz) || 1;
      return [y0 + out * ny / nl, zz + out * nz / nl];
    }
    for (k = 0; k < 6; k++) {
      var xa0 = X(HB[k]) + 0.1, xb0 = X(HB[k + 1]) - 0.1;
      for (sg = -1; sg <= 1; sg += 2) {
        (function (xa, xb, s1) {
          A.add("dark", gridGeo(THREE, 4, 4, function (u, v) {
            var xx = xa + (xb - xa) * u, zz = HZ0 + (HZ1 - HZ0) * v, q = onHull(xx, zz, 0.03);
            return [xx, s1 * q[0], q[1]];
          }, s1 > 0), 0, 0, 0);
          A.add("lid", gridGeo(THREE, 4, 4, function (u, v) {
            var xx = xa + 0.26 + (xb - xa - 0.52) * u, zz = HZ0 + 0.22 + (HZ1 - HZ0 - 0.44) * v, q = onHull(xx, zz, 0.14);
            return [xx, s1 * q[0], q[1]];
          }, s1 > 0), 0, 0, 0);
        })(xa0, xb0, sg);
      }
    }
    /* the short end panel abaft them (535-548 px) */
    for (sg = -1; sg <= 1; sg += 2) {
      (function (s1) {
        A.add("dark", gridGeo(THREE, 2, 3, function (u, v) {
          var xx = X(535) + (X(548) - X(535)) * u, zz = Z(88) + (Z(78) - Z(88)) * v, q = onHull(xx, zz, 0.04);
          return [xx, s1 * q[0], q[1]];
        }, s1 > 0), 0, 0, 0);
        /* the retractable bow planes' housing, forward of the hatches (813-852 px, rows 86-93) */
        A.add("dark", gridGeo(THREE, 4, 2, function (u, v) {
          var xx = X(813) + (X(852) - X(813)) * u, zz = Z(93) + (Z(86) - Z(93)) * v, q = onHull(xx, zz, 0.04);
          return [xx, s1 * q[0], q[1]];
        }, s1 > 0), 0, 0, 0);
        /* the plane itself run out of it, as the bow photograph shows one at sea */
        var bx0 = X(815), bx1 = X(849), bz = Z(89.5), by0 = sideY((bx0 + bx1) / 2, bz) - 0.3, bsp = 3.2;
        var bpl = [[bx1, s1 * by0], [bx1 - 0.5, s1 * (by0 + bsp)], [bx0 + 1.0, s1 * (by0 + bsp)], [bx0, s1 * by0]];
        var gbp = ext(THREE, bpl, 0.36);
        gbp.translate(0, 0, -0.18);
        A.add("tile", gbp, 0, 0, bz);
        A.add("tile", new THREE.BoxGeometry(bx1 - 0.5 - bx0 - 1.0 + 0.1, 0.14, 0.42), (bx1 - 0.5 + bx0 + 1.0) / 2, s1 * (by0 + bsp), bz);
      })(sg);
    }

    /* ---- stern: upper fin with the towed-array pod across its head, rudder hinge, lower fin,
       horizontal planes edge-on at row 117 ---- */
    var fin = [[X(70), Z(108)], [X(70), Z(66)], [X(102), Z(65.5)], [X(150), Z(84.5)], [X(150), Z(92)]];
    A.add("tile", ext(THREE, fin, 1.0, true), 0, 0.5, 0);
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(0.08, 0.04, Z(67) - Z(104)), X(86), sg * 0.51, (Z(67) + Z(104)) / 2);
    }
    var POD = [X(54), X(102)], PZ = Z(66);
    cylX(THREE, A, "tile", 0.62, 0.62, POD[1] - POD[0] - 1.2, 16, (POD[0] + POD[1]) / 2, 0, PZ);
    A.add("tile", new THREE.SphereGeometry(0.62, 14, 8), POD[0] + 0.6, 0, PZ, 0, 0, 0, [1.6, 1, 1]);
    A.add("tile", new THREE.SphereGeometry(0.62, 14, 8), POD[1] - 0.6, 0, PZ, 0, 0, 0, [1.6, 1, 1]);
    A.add("tile", new THREE.CylinderGeometry(0.22, 0.26, 0.7, 10), X(78), 0, PZ + 0.75, PI / 2, 0, 0);
    var lf = [[X(64), Z(128)], [X(64), Z(155)], [X(91), Z(155)], [X(98), Z(137)], [X(98), Z(130)]];
    A.add("red", ext(THREE, lf, 0.9, true), 0, 0.45, 0);
    var zp = Z(117), SPY = 7.6;
    var pl = [[X(107), 1.0], [X(97), SPY], [X(62), SPY], [X(53), 1.0], [X(53), -1.0], [X(62), -SPY], [X(97), -SPY], [X(107), -1.0]];
    A.add("tile", ext(THREE, pl, 0.45), 0, 0, zp - 0.225);
    for (sg = -1; sg <= 1; sg += 2) {
      strut(THREE, A, "dark", 0.035, [X(70), sg * 2.6, zp + 0.23], [X(70), sg * (SPY - 0.3), zp + 0.23], 4);
      strut(THREE, A, "dark", 0.035, [X(70), sg * 2.6, zp - 0.23], [X(70), sg * (SPY - 0.3), zp - 0.23], 4);
    }

    /* ---- two shafts (en.wikipedia), seven-blade screws as drawn at the tail ---- */
    var blade = [[-0.14, 0.35], [-0.5, 0.8], [-0.56, 1.4], [-0.3, 2.0], [0.08, 2.3], [0.36, 1.85], [0.4, 1.1], [0.18, 0.5]];
    var PZP = Z(121), PXP = X(6);
    for (sg = -1; sg <= 1; sg += 2) {
      var py = sg * 2.75;
      strut(THREE, A, "metal", 0.26, [X(40), sg * 0.8, PZP], [PXP + 0.6, py, PZP], 10);
      cylX(THREE, A, "bronze", 0.5, 0.3, 1.5, 12, PXP, py, PZP);
      A.add("bronze", new THREE.SphereGeometry(0.3, 10, 6), PXP - 0.75, py, PZP);
      for (i = 0; i < 7; i++) {
        var gb = ext(THREE, blade, 0.07);
        gb.translate(0, 0, -0.035);
        gb.rotateY(sg * 0.6);
        A.add("bronze", gb, PXP, py, PZP, i * 2 * PI / 7 + (sg > 0 ? 0.2 : 0), 0, 0);
      }
    }

    /* ---- modest team marks on the casing crown, fore and aft ---- */
    function crownPatch(x0, x1) {
      return gridGeo(THREE, 3, 2, function (u, v) {
        var xx = x0 + (x1 - x0) * u, yy = -0.7 + 1.4 * v; return [xx, yy, topZ(xx, yy) + 0.04];
      }, false);
    }
    A.add("team", crownPatch(X(880) - 1.6, X(880) + 1.6), 0, 0, 0);
    A.add("team", crownPatch(X(330) - 1.6, X(330) + 1.6), 0, 0, 0);

    A.done(T, g);
    return g;
  }
  return { build: build };
})();

/* len is the true length, 154 m: render3d scales a submarine by it. */
UNIT_MODELS["ssgn_p"] = {
  len: 154,
  build: function (THREE, M, C) { return HeroOscar949A.build(THREE, M, C); }
};
