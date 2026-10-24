/* ============ ru_yasen.js -- HERO model: Project 885 Yasen (K-560 Severodvinsk, pact_e00_ssn)
   and Project 885M Yasen-M (K-561 Kazan, ssn_p) ============
   Russian fourth-generation nuclear cruise-missile submarine. Full-quality redo, 2026-10-24.

   References (Wikimedia Commons, fetched at width=960, cached in scratchpad/q_yasen_ref):
     - "Graney class SSN.svg" (Project 885) and "Graney class SSN 885M variant.svg" (885M):
       colour side elevations, bow right. THE source for the hull stations (the table below is
       in the 1917 px frame of the first pass; re-checked against the 960 px renders this pass,
       top and keel lines agree within 1 px at seven stations), the white boot line, the sail
       profile (flat top, raked fore edge, long concave aft ramp), the cruciform tail with the
       rudders hinged on the fins and the cap plate on the upper fin, the stern-plane root
       fairing (the lens on the tail cone), the open skewed propeller behind the cone, the
       torpedo-tube shutter outlines just forward of the sail (four a side as drawn), the long
       dark flank line, the light ladder strakes, the bow sonar-window seams, the oval fairing
       under the aft ramp, the raised casing over the silos with its hatch outlines, and (885M
       only) the small black flood slots on the upper flank.
     - "Graney class Schema.svg" (cut-away): the silo compartment abaft the sail.
     - "K-560 Severodvinsk" at Severomorsk (surfaced, starboard bow quarter, winter): the tall
       slab-sided sail with its round leading edge and rounded top edges, the flare of the
       fillet into the hull, the small windows across the top of the fore face, the door low on
       the sail side, two short masts at the fore top and a whip, the oval blister on the upper
       flank aft of the sail, the rubber tile courses picked out by the snow.
     - "APKR Severodvinsk" (at sea, beam on): the low hull, the sail hump with its ramp, the
       tall upper rudder standing clear aft.
     - "Severodvinsk (APL)" (float-out 2010, from the starboard quarter, below) and "Kazan 1"
       (885M float-out 2017): the very large horizontal stern planes, square-tipped, with the
       hinge of the moving after part; the lower rudder; the propulsor under a FAN-SHAPED
       cover (a cover laid over blades, not a drum over a duct).
     - "The nuclear submarine Kazan has arrived at a permanent base ... May 2021" (885M, bow
       quarter): the 885M sail (rounder fore top, two windows high on the side, a door at mid
       side, the bridge fence at the fore top), the tall black mast and the whip, the oval
       blister aft of the sail, the light ladder strake along the bow at the water line.
     - "Model Yasen-class submarine at the exhibition Army 2016": the hull-mounted bow planes
       EXTENDED, trapezoids at the boot line about a third of the way from the sail to the bow;
       the blister; the dark flood slots aft of the sail.
     - Russian Wikipedia, "Podvodnye lodki proekta 885 Yasen": eight vertical silos, "2 rows of
       4 shafts (2 m diameter each) along the sides, in the hull behind the sail", on the 885
       and on the 885M alike; ten 533 mm tubes angled out at the sides near the sail; rubber
       anechoic coating; the 885M 9 m shorter; and the propulsor: "a low-noise propeller was
       used, although in 2000 the media published a scheme of the project with a pump-jet".

   CORRECTED from the first pass (ru_yasen.js of 6cd31e6):
     - The propulsor is drawn as the drawings show it and ru.wikipedia states it: an open,
       highly skewed propeller. The first pass drew a pump-jet duct from sub_specs.js
       (prop:"pumpjet"); no photograph shows a duct (both float-out covers are fan-shaped),
       and the article puts the pump-jet only in a 2000 press scheme. Seven blades are drawn:
       NOT CONFIRMED (no reference gives a count; the drawing shows a side view only).
     - Silo hatches: ONE lid per silo, eight on both rows (2 x 4, per the article). The first
       pass split each lid into 3 / 4 "cell joints"; nothing shows cells on the lids.
     - The light strakes are on the FLANK at the boot line (drawing; Kazan 2021), not on the
       casing top.
     - The "lozenge fairings" on the cone are the stern planes' root fairings seen edge-on.
     - The bow ellipses are torpedo-tube shutter OUTLINES (flush), not open flood holes.

   RECOGNITION (each one shows on the final sheets):
     1. Long, almost parallel hull with a blunt round bow and a long straight tail cone
        (drawings; Severodvinsk at sea).
     2. The sail: tall, slab-sided, round leading edge, rounded top edges, flat top, and the
        LONG concave aft ramp running down to the casing (drawings; Severomorsk; Kazan 2021).
     3. The fillet flaring the sail's foot into the hull, sides and nose (Severomorsk; Kazan).
     4. Hull-mounted bow planes, extended, at the boot line forward of the sail (Army 2016
        model; the hatched housing outline on the 885M drawing).
     5. Eight silo hatches abaft the sail, two rows of four, on a raised casing (ru.wikipedia;
        drawings).
     6. Cruciform stern: tall upper rudder with its cap plate and leading-edge fillet, lower
        rudder, very large square-tipped horizontal planes with root fairings (drawings;
        float-out photographs).
     7. Open skewed propeller behind the cone (drawings; ru.wikipedia).
     8. Anechoic rubber tile courses all over, matte black (Severomorsk snow; Kazan 2021).
     9. The white boot line and the light ladder strake along the bow (drawings; Kazan 2021).
    10. The oval blister on the upper flank under the aft ramp (Severomorsk; Kazan; Army 2016).
    11. Sail windows and door: four across the fore top (885), two high on each side (885M).
    12. Masts as photographed: two short masts and a whip (885); the tall black mast, the whip
        and the bridge fence (885M); the low mast collars on the sail top where the drawings
        stand the masts.
   885 vs 885M, only where the sources show it: 9.2 m shorter hull; the drawn sail, fore edge,
   hatch positions and flood slots; windows, door and masts as the two photographs show.

   ESTIMATED, not measured: sail width (6.0 m at the foot over the fillet's 2.3 m flare, 5.2 m
   at the top, from the Severomorsk photograph against the hull); stern-plane span +-7.4 m
   (float-out photographs); bow plane size (3.4 m root chord, 2.9 m out from the hull, Army
   2016 model); the blister's bulge (0.45 m); propeller radius 2.6 m (drawing side view).
   NOT DRAWN: hull numbers, names, flags, ensigns, draft marks, rails and flag staffs (harbour
   fittings), the lattice signal mast of the Kazan photograph (raised only alongside), the
   drawings' full raised mast suite (no photograph shows it raised), the 885 drawing's small
   ventral fairing (no photograph of the keel), the propeller blade count's source (see above).
   Paint: Severodvinsk at float-out under hall light, sampled (41,40,40), taken to 0.9: #252424
   with a warm cast; Kazan 2021 sail sampled (60,58,66), taken to 0.75: #2d2c31, a touch greyer
   and cooler. Boot line and strakes a muted light grey. Bronze propeller (drawing).
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a submarine by
   UNIT_MODELS[key].len, the true length; the model's X extent matches it (139.20 / 130.00 m;
   the article gives 139 m and 130 m). Beam 13.0 m (sub_specs.js); crown 3.4 m over the water
   line and the sail top 4.9 m (885) / 4.7 m (885M) over the crown, off the drawings.
   Named nodes: none (render3d reads no sub node names; a "sub" row is drawn at a fixed datum
   under the surface; the row is not turret:true). Merged per material: 6 draw calls,
   6 materials, 2 canvas textures; 12,220 triangles (885) and 11,690 (885M). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroYasen = (function () {
  "use strict";
  var PI = Math.PI;

  /* ---- per-variant data read off the two drawings (1917 px frame; px = drawing pixels) ---- */
  var V885 = {
    id: "885", len: 139.2, pxm: 139.2 / 1917, wl: 251, beam: 13.0, tail: 35, bowc: 1918,
    /* [column, centre row, radius px] -- top and keel lines of the profile */
    tab: [[1918, 298, 2], [1900, 296, 36], [1880, 295, 50], [1840, 295.5, 62.5], [1800, 296, 70],
      [1760, 296, 75], [1720, 296, 79], [1680, 295, 82], [1640, 294.5, 83.5], [1600, 293, 85],
      [1500, 291, 87], [640, 291, 87], [600, 292, 86], [560, 293, 85], [520, 294, 83], [480, 295, 81],
      [440, 296, 78], [400, 296.5, 73.5], [360, 295, 70], [320, 293.5, 65.5], [280, 293.5, 59.5],
      [240, 294, 53], [200, 293, 47], [160, 293.5, 40], [120, 294, 33], [90, 295, 24], [35, 295.5, 10]],
    rmax: 87,
    /* sail: [row, column] of the aft ramp and of the fore edge, top row, crown row at the sail */
    aft: [[137, 1300], [138, 1280], [150, 1240], [174, 1200], [200, 1160], [204, 1150], [216, 1118]],
    fore: [[137, 1510], [145, 1522], [178, 1540], [205, 1558], [216, 1563]],
    crown: 204, top: 137, ramp: 1300, shw: [3.0, 2.6],
    /* tail outlines [column, row] */
    ur: [[92, 263], [92, 163], [143, 163], [147, 200], [160, 225], [185, 243], [200, 252], [200, 263]],
    lr: [[92, 262], [92, 380], [160, 380], [172, 350], [190, 338], [200, 330], [200, 262]],
    hinge: 130,
    /* silo hatches: four lids a row, [aft column, fore column] */
    hatch: [[762, 805], [806, 849], [850, 893], [893, 935]],
    slot: [985, 1410, 266],
    shut: [[1578, 262], [1578, 284], [1578, 306], [1578, 327]], shutw: 80,
    flood: [],
    strake: [[1520, 1880, 241], [515, 630, 243], [1000, 1035, 238], [1087, 1125, 238], [1317, 1360, 240]],
    seams: [1655, 1770],
    blister: [1255, 225, 6.5],
    bowp: 1698,
    win: "front", door: 1325, collars: [1270, 1320, 1352, 1426],
    masts: [[1440, 0.22, 0.9, "stubP"], [1440, 0.22, 0.9, "stubS"], [1375, 0.05, 7.0, "whip"], [1395, 0.07, 3.0, "pole"]],
    paint: "#252424", tone: [37, 36, 36], lozen: [150, 299]
  };
  var V885M = {
    id: "885M", len: 130.0, pxm: 130.0 / 1917, wl: 257, beam: 13.0, tail: 35, bowc: 1918,
    tab: [[1918, 306, 3], [1900, 304.5, 38.5], [1880, 304, 52], [1840, 304, 65], [1800, 303, 73],
      [1760, 302.5, 78.5], [1720, 302, 83], [1680, 301, 86], [1640, 300, 87], [1600, 298.5, 88.5],
      [1500, 297, 90], [640, 297.5, 89.5], [600, 298.5, 88.5], [560, 300, 87], [520, 301.5, 85.5],
      [480, 302.5, 82.5], [440, 303, 79], [400, 302.5, 74.5], [360, 301, 71], [320, 300.5, 66.5],
      [280, 300, 60], [240, 301, 53], [200, 298, 48], [160, 298, 40], [120, 299, 31], [90, 300, 24],
      [35, 302.5, 10]],
    rmax: 90,
    aft: [[138, 1300], [139, 1280], [146, 1240], [165, 1200], [193, 1160], [207, 1130], [219, 1100]],
    fore: [[138, 1520], [145, 1540], [174, 1560], [207, 1580], [219, 1586]],
    crown: 207, top: 138, ramp: 1300, shw: [3.0, 2.6],
    ur: [[92, 272], [92, 164], [143, 164], [147, 205], [160, 230], [185, 248], [200, 258], [200, 272]],
    lr: [[92, 272], [92, 390], [160, 390], [172, 360], [190, 347], [200, 340], [200, 272]],
    hinge: 130,
    hatch: [[790, 833], [834, 877], [880, 923], [925, 968]],
    slot: [1017, 1414, 270],
    shut: [[1607, 285], [1607, 307], [1607, 329], [1607, 350]], shutw: 83,
    flood: [500, 600, 690, 1130, 1180, 1320, 1415, 1470],
    strake: [[1510, 1880, 238], [490, 530, 238], [590, 630, 238], [690, 735, 238], [1115, 1190, 237], [1320, 1355, 238]],
    seams: [1750],
    blister: [1260, 219, 6.5],
    bowp: 1712,
    win: "side", door: 1430, collars: [1258, 1290, 1340, 1400],
    masts: [[1376, 0.32, 4.0, "black"], [1405, 0.05, 6.5, "whip"], [1470, 0, 0, "bridge"]],
    paint: "#2d2c31", tone: [45, 44, 49], lozen: [150, 308]
  };

  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }

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

  /* lofted body with the winding flipped so FrontSide faces outward */
  function body(THREE, M, secs, segs) {
    var g = M.loft(THREE, secs, segs);
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }
  /* stacked rings (each {z, pts:[[x,y(,z)]..]}, counter-clockwise from above), metre UVs,
     flat cap on the last; a point's own z (third value) overrides the ring's */
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
  /* a grid patch; fn(u, v) -> [x, y, z]; metre UVs from x and the other coordinate */
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
  function strut(THREE, A, mat, r, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r, r, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }

  /* 2 m tile patch for the parts with metre UVs: sail, fins, raised casing, lids, blister */
  var _tex = {};
  function tileTex(THREE, V) {
    if (_tex["t" + V.id]) return _tex["t" + V.id];
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d"), R1 = rng(5523), i, j;
    g.fillStyle = V.paint; g.fillRect(0, 0, S, S);
    /* 1.0 m x 0.67 m tiles in staggered courses */
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
    _tex["t" + V.id] = t;
    return t;
  }

  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    var PXM = V.pxm, WL = V.wl, HL = V.len / 2;
    var A = Acc(THREE);
    var T, i, j, k, x, sg, z;
    function X(col) { return HL - (V.bowc - col) * PXM; }
    function zOf(row) { return (WL - row) * PXM; }
    var TAB = V.tab.slice().reverse();                       /* ascending columns */
    /* station lookup: blended in the body; in the bow (past 1800 px) r^2 runs linear, which
       follows the drawing's round nose instead of faceting it into a cone */
    function look(col) {
      var n, a, b, t;
      if (col <= TAB[0][0]) return TAB[0];
      for (n = 1; n < TAB.length; n++) {
        if (col <= TAB[n][0]) {
          a = TAB[n - 1]; b = TAB[n]; t = (col - a[0]) / (b[0] - a[0]);
          if (a[0] >= 1800) {
            return [col, a[1] + (b[1] - a[1]) * t, Math.sqrt(Math.max(0, a[2] * a[2] + (b[2] * b[2] - a[2] * a[2]) * t))];
          }
          t = t * t * (3 - 2 * t) * 0.5 + t * 0.5;
          return [col, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
        }
      }
      return TAB[TAB.length - 1];
    }
    function cOf(x0) { return V.bowc - (HL - x0) / PXM; }
    var KW = V.beam / 2 / (V.rmax * PXM);                   /* beam over the drawn depth */
    function hullH(x0) { return look(cOf(x0))[2] * PXM; }
    function hullW(x0) { return hullH(x0) * KW; }
    function zcAt(x0) { return zOf(look(cOf(x0))[1]); }
    function sideY(x0, zz) {
      var h = hullH(x0), w = hullW(x0), dz = zz - zcAt(x0);
      return w * Math.sqrt(Math.max(1 - (dz * dz) / (h * h), 0.0004));
    }
    function topZ(x0, y) {
      var h = hullH(x0), w = hullW(x0);
      return zcAt(x0) + h * Math.sqrt(Math.max(1 - (y * y) / (w * w), 0.0004));
    }

    /* ---- hull stations: the drawn table, every 2.5 m off the parallel body, every 0.3 m
       in the last 4 m of the bow ---- */
    var xs = [], secs = [], xt = X(V.tail), xb = X(V.bowc);
    for (i = 0; i < V.tab.length; i++) xs.push(X(V.tab[i][0]));
    for (x = xt + 1.2; x < X(640); x += 2.5) xs.push(x);
    for (x = X(1500) + 2.5; x < xb - 4; x += 2.5) xs.push(x);
    for (x = xb - 4; x < xb - 0.05; x += 0.3) xs.push(x);
    xs.sort(function (p, q) { return p - q; });
    for (i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] < 0.08) { xs.splice(i, 1); i--; }
    for (i = 0; i < xs.length; i++) {
      secs.push({ x: xs[i], w: hullW(xs[i]), h: hullH(xs[i]), zc: zcAt(xs[i]), sq: 1.0 });
    }
    var X0 = xs[0], X1 = xs[xs.length - 1];

    /* ---- hull texture: u stern -> bow over the loft, v round the girth (0 port beam,
       0.25 crown, 0.5 starboard beam); the canvas is flipped on upload, so row = (1 - v) H ---- */
    var TW = 1024, TH = 512, cv = cvs(TW, TH), cx = cv.getContext("2d"), R1 = rng(885 + V.len);
    var girth = PI * (V.beam / 2 + V.rmax * PXM);
    function uOf(col) { return (X(col) - X0) / (X1 - X0) * TW; }
    function rowOf(col, zz, s) {
      var LL = look(col), h = LL[2] * PXM, t = Math.asin(clamp((zz - zOf(LL[1])) / h, -1, 1)), v;
      v = s > 0 ? t / (2 * PI) : 0.5 - t / (2 * PI);
      if (v < 0) v += 1;
      return (1 - v) * TH;
    }
    cx.fillStyle = V.paint; cx.fillRect(0, 0, TW, TH);
    var tw = 1.1 / (X1 - X0) * TW, th = TH / Math.round(girth / 0.72), nc = Math.round(TH / th);
    for (j = 0; j < nc; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < TW; i++) {
        var r0 = R1();
        cx.fillStyle = r0 < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.024).toFixed(3) + ")"
                                : "rgba(0,0,0," + (0.03 + R1() * 0.07).toFixed(3) + ")";
        cx.fillRect(i * tw + off + 0.5, j * th + 0.5, tw - 1, th - 1);
      }
    }
    for (i = 0; i < 70; i++) {                               /* patches of replaced tiles */
      var bw = tw * (2 + Math.floor(R1() * 6)), bh = th * (1 + Math.floor(R1() * 3));
      cx.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.10)";
      cx.fillRect(R1() * TW, R1() * TH, bw, bh);
    }
    cx.strokeStyle = "rgba(0,0,0,0.34)"; cx.lineWidth = 1;
    for (j = 0; j <= nc; j++) { cx.beginPath(); cx.moveTo(0, j * th); cx.lineTo(TW, j * th); cx.stroke(); }
    for (j = 0; j < nc; j++) {
      var o2 = (j % 2) ? tw * 0.5 : 0;
      for (i = 0; i * tw + o2 < TW; i++) { cx.beginPath(); cx.moveTo(i * tw + o2, j * th); cx.lineTo(i * tw + o2, (j + 1) * th); cx.stroke(); }
    }
    /* per column: boot line, ladder strakes, flank line, both sides */
    var c, ya, yb;
    for (i = 0; i < TW; i++) {
      c = cOf(X0 + (i + 0.5) / TW * (X1 - X0));
      var L0 = look(c);
      if (Math.abs(zOf(L0[1])) > L0[2] * PXM * 0.96) continue;   /* bow tip, tail cone: all under */
      for (sg = -1; sg <= 1; sg += 2) {
        /* the white boot line (drawing) */
        ya = rowOf(c, 0.06, sg); yb = rowOf(c, -0.06, sg);
        cx.fillStyle = "rgba(196,198,200,0.55)"; cx.fillRect(i, Math.min(ya, yb), 1, Math.max(1, Math.abs(yb - ya)));
        for (k = 0; k < V.strake.length; k++) {
          var S = V.strake[k];
          if (c < S[0] || c > S[1] || zOf(S[2]) - zOf(L0[1]) > L0[2] * PXM * 0.9) continue;
          ya = rowOf(c, zOf(S[2]) + 0.24, sg); yb = rowOf(c, zOf(S[2]) - 0.24, sg);
          cx.fillStyle = (i % 3) ? "rgba(150,152,154,0.62)" : "rgba(40,40,42,0.7)";
          cx.fillRect(i, Math.min(ya, yb), 1, Math.max(1.5, Math.abs(yb - ya)));
        }
        if (c >= V.slot[0] && c <= V.slot[1]) {
          ya = rowOf(c, zOf(V.slot[2]) + 0.09, sg); yb = rowOf(c, zOf(V.slot[2]) - 0.09, sg);
          cx.fillStyle = "rgba(6,6,8,0.85)"; cx.fillRect(i, Math.min(ya, yb), 1, Math.max(1.5, Math.abs(yb - ya)));
        }
      }
    }
    /* the bow sonar-window seams (flush outlines on the drawings) */
    cx.fillStyle = "rgba(0,0,0,0.45)";
    for (k = 0; k < V.seams.length; k++) cx.fillRect(uOf(V.seams[k]) - 0.7, 0, 1.4, TH);
    /* torpedo-tube shutter outlines and the 885M flood slots, both sides */
    cx.strokeStyle = "rgba(0,0,0,0.6)"; cx.lineWidth = 1.3;
    for (sg = -1; sg <= 1; sg += 2) {
      for (k = 0; k < V.shut.length; k++) {
        var ec = V.shut[k][0], er = V.shut[k][1], ey = rowOf(ec, zOf(er), sg);
        var ery = Math.abs(rowOf(ec, zOf(er) + 0.42, sg) - ey);
        cx.beginPath(); cx.ellipse(uOf(ec), ey, V.shutw * PXM / 2 / (X1 - X0) * TW, Math.max(1.5, ery), 0, 0, 2 * PI); cx.stroke();
      }
      cx.fillStyle = "rgba(4,4,6,0.9)";
      for (k = 0; k < V.flood.length; k++) {
        var fy0 = rowOf(V.flood[k], zOf(WL - 30) + 0.22, sg), fy1 = rowOf(V.flood[k], zOf(WL - 30) - 0.22, sg);
        cx.fillRect(uOf(V.flood[k]) - 4, Math.min(fy0, fy1), 8, Math.max(2, Math.abs(fy1 - fy0)));
      }
    }
    var tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 4;

    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    T = {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tex, roughness: 0.92, metalness: 0.04 }),
      tile:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE, V), roughness: 0.92, metalness: 0.04 }),
      dark:   std(0x0c0d0f, 0.80, 0.20),     /* windows, doors, seams, recesses */
      metal:  std(0x34383c, 0.55, 0.45),     /* masts and the hub */
      bronze: std(0x6e5c38, 0.45, 0.70),     /* propeller (drawing) */
      team:   std(team, 0.86, 0.06)
    };

    /* ---- hull ---- */
    A.add("skin", body(THREE, M, secs, 56), 0, 0, 0);
    A.add("tile", new THREE.CircleGeometry(hullH(xt) * 1.02, 16), xt, 0, zcAt(xt), 0, -PI / 2, 0);

    /* ---- the sail with its fillet, as one shell ---- */
    function colAt(tab, zz) {
      var r = WL - zz / PXM, n;
      if (r <= tab[0][0]) return tab[0][1];
      for (n = 1; n < tab.length; n++) {
        if (r <= tab[n][0]) {
          var a = tab[n - 1], b = tab[n];
          return a[1] + (b[1] - a[1]) * (r - a[0]) / (b[0] - a[0]);
        }
      }
      return tab[tab.length - 1][1];
    }
    var ST = zOf(V.top), ZC = zOf(V.crown), RT = 0.75, FH = 1.5, FW = 1.15, FE = 0.9;
    var HWB = V.shw[0], HWT = V.shw[1], XR = X(V.ramp), XFOOT = X(colAt(V.aft, ZC));
    /* plan half-width at x: full over the sail proper, narrowing to 0.55 down the ramp */
    function planHW(xx, hw) {
      if (xx >= XR) return hw;
      return hw * (0.55 + 0.45 * clamp((xx - XFOOT) / (XR - XFOOT), 0, 1));
    }
    /* plan outline: elliptic nose, straight sides (tapering down the ramp), round tail.
       From the nose tip aft along port, then forward along starboard (counter-clockwise). */
    var NS = 30;
    function ring(xa, xf, hw) {
      var L = xf - xa, ln = Math.min(hw * 1.2, L * 0.3), la = Math.min(1.4, L * 0.12), pts = [], kk, xx, yy, e;
      var hn = planHW(xf - ln, hw), ha = planHW(xa + la, hw);
      for (kk = 0; kk <= NS; kk++) {
        xx = xf - L * (0.5 - 0.5 * Math.cos(PI * kk / NS));
        if (xx > xf - ln) { e = (xx - (xf - ln)) / ln; yy = hn * Math.sqrt(Math.max(0, 1 - e * e)); }
        else if (xx < xa + la) { e = (xa + la - xx) / la; yy = ha * Math.sqrt(Math.max(0, 1 - e * e)); }
        else yy = planHW(xx, hw);
        pts.push([xx, yy]);
      }
      for (kk = NS - 1; kk >= 1; kk--) pts.push([pts[kk][0], -pts[kk][1]]);
      return pts;
    }
    var rings = [], f, zn, hw, xa, xf, pts;
    /* the fillet: rings that start ON the hull and flare in to the sail's own section */
    var FL = [0, 0.1, 0.24, 0.42, 0.64, 0.86, 1.0];
    for (k = 0; k < FL.length; k++) {
      f = FL[k]; zn = ZC + FH * f;
      hw = HWB + FW * (1 - f) * (1 - f);
      xf = X(colAt(V.fore, zn)) + FE * (1 - f) * (1 - f);
      xa = X(colAt(V.aft, zn));
      pts = ring(xa, xf, hw);
      for (j = 0; j < pts.length; j++) {
        var zs = topZ(pts[j][0], pts[j][1]) - 0.15;
        pts[j].push((1 - f) * zs + f * zn);
      }
      rings.push({ z: zn, pts: pts });
    }
    /* the slab sides, then the rounded top edges */
    var zl = [];
    for (k = 1; k <= 4; k++) zl.push(ZC + FH + (ST - RT - ZC - FH) * k / 4);
    var tops = [0.35, 0.62, 0.82, 0.94, 1.0];
    for (k = 0; k < tops.length; k++) zl.push(ST - RT + RT * tops[k]);
    function sailSec(zz) {
      var e = Math.max(0, zz - (ST - RT)) / RT, sh = RT * (1 - Math.sqrt(Math.max(0, 1 - e * e)));
      var h0 = HWB + (HWT - HWB) * clamp((zz - ZC) / (ST - ZC), 0, 1) - sh;
      return { xa: X(colAt(V.aft, zz)) + sh, xf: X(colAt(V.fore, zz)) - sh, hw: h0 };
    }
    for (k = 0; k < zl.length; k++) {
      var sc = sailSec(zl[k]);
      rings.push({ z: zl[k], pts: ring(sc.xa, sc.xf, sc.hw) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);

    /* windows: on the 885 four across the top of the fore face (Severomorsk); on the 885M two
       high on each side at the fore end (Kazan 2021) */
    function onNose(zz, th0, dep) {
      var s0 = sailSec(zz), L = s0.xf - s0.xa, ln = Math.min(s0.hw * 1.2, L * 0.3);
      var px = s0.xf - ln + ln * Math.cos(th0), py = s0.hw * Math.sin(th0);
      var ang = Math.atan2(Math.sin(th0) / s0.hw, Math.cos(th0) / ln);
      return [px - Math.cos(ang) * dep, py - Math.sin(ang) * dep, ang];
    }
    var WIN = V.win === "front" ? [-0.62, -0.2, 0.2, 0.62] : [1.05, 1.32, -1.05, -1.32];
    for (k = 0; k < WIN.length; k++) {
      var wz = V.win === "front" ? ST - 0.95 : ST - 1.05, wp = onNose(wz, WIN[k], 0.03);
      A.add("dark", new THREE.BoxGeometry(0.14, 0.42, 0.36), wp[0], wp[1], wz, 0, 0, wp[2]);
    }
    /* the door low on each side of the sail */
    for (sg = -1; sg <= 1; sg += 2) {
      var dz0 = ZC + FH + 0.2, dhw = sailSec(dz0 + 0.9).hw;
      A.add("dark", new THREE.BoxGeometry(0.85, 0.12, 1.75), X(V.door), sg * (dhw - 0.03), dz0 + 0.9);
    }

    /* low collars on the sail top where the drawings stand the masts */
    for (k = 0; k < V.collars.length; k++) {
      A.add("tile", new THREE.CylinderGeometry(0.55, 0.62, 0.3, 14), X(V.collars[k]), 0, ST + 0.08, PI / 2, 0, 0, [1.25, 1, 1]);
    }

    /* ---- masts as photographed ---- */
    for (k = 0; k < V.masts.length; k++) {
      var mc = V.masts[k], mx = X(mc[0]), mr = mc[1], mh = mc[2], kind = mc[3], my = 0;
      if (kind === "stubP" || kind === "stubS") {
        my = kind === "stubP" ? 0.75 : -0.75;
        A.add("metal", new THREE.CylinderGeometry(mr, mr * 1.1, mh + 0.4, 10), mx, my, ST + mh / 2 - 0.2, PI / 2, 0, 0);
        A.add("dark", new THREE.SphereGeometry(mr * 1.05, 10, 6, 0, 2 * PI, 0, PI / 2), mx, my, ST + mh, PI / 2, 0, 0);
      } else if (kind === "whip" || kind === "pole") {
        strut(THREE, A, "metal", mr, [mx, 0, ST - 0.2], [mx, 0, ST + mh], 6);
        A.add("metal", new THREE.CylinderGeometry(mr * 2.6, mr * 2.6, 0.5, 8), mx, 0, ST + 0.2, PI / 2, 0, 0);
      } else if (kind === "black") {
        /* the tall black mast of the Kazan photograph, with a slimmer head */
        A.add("dark", new THREE.CylinderGeometry(mr, mr * 1.05, mh - 0.9, 14), mx, 0, ST + (mh - 0.9) / 2 - 0.1, PI / 2, 0, 0);
        A.add("dark", new THREE.CylinderGeometry(mr * 0.55, mr * 0.7, 1.0, 12), mx, 0, ST + mh - 0.45, PI / 2, 0, 0);
        A.add("dark", new THREE.SphereGeometry(mr * 0.55, 10, 6, 0, 2 * PI, 0, PI / 2), mx, 0, ST + mh, PI / 2, 0, 0);
      } else if (kind === "bridge") {
        /* the bridge fence at the fore top (Kazan 2021): a low open box with a screen */
        var bx = mx, bl = 2.6, bwid = 1.7, bh = 0.85;
        A.add("tile", new THREE.BoxGeometry(bl, 0.12, bh), bx, bwid / 2, ST + bh / 2 - 0.05);
        A.add("tile", new THREE.BoxGeometry(bl, 0.12, bh), bx, -bwid / 2, ST + bh / 2 - 0.05);
        A.add("tile", new THREE.BoxGeometry(0.12, bwid, bh + 0.2), bx + bl / 2, 0, ST + bh / 2 + 0.05);
        A.add("tile", new THREE.BoxGeometry(0.12, bwid, bh), bx - bl / 2, 0, ST + bh / 2 - 0.05);
        A.add("dark", new THREE.BoxGeometry(bl - 0.2, bwid - 0.2, 0.05), bx, 0, ST + 0.06);
      }
    }

    /* ---- hull-mounted bow planes, extended, at the boot line (Army 2016 model) ---- */
    var bpx = X(V.bowp), bpz = 0.0;
    for (sg = -1; sg <= 1; sg += 2) {
      var y0 = sideY(bpx, bpz) - 0.25, sp = 2.9;
      var bpl = [[bpx + 1.7, sg * y0], [bpx + 1.0, sg * (y0 + sp)], [bpx - 1.3, sg * (y0 + sp)], [bpx - 1.7, sg * y0]];
      var gp = ext(THREE, bpl, 0.34);
      gp.translate(0, 0, -0.17);
      A.add("tile", gp, 0, 0, bpz);
      /* the housing the plane withdraws into */
      A.add("dark", gridGeo(THREE, 3, 1, (function (s1) { return function (u, v) {
        var xx = bpx - 1.85 + 3.7 * u, zz = bpz - 0.32 + 0.64 * v; return [xx, s1 * (sideY(xx, zz) + 0.02), zz]; }; })(sg), sg > 0, true), 0, 0, 0);
    }
    /* ---- the oval blister on the upper flank under the aft ramp ---- */
    var blx = X(V.blister[0]), blz = zOf(V.blister[1]);
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("tile", new THREE.SphereGeometry(1, 18, 10), blx, sg * (sideY(blx, blz) - 0.12), blz, 0, 0, 0,
            [V.blister[2] / 2, 0.58, 0.78]);
    }

    /* ---- raised casing over the silos and the eight lids, two rows of four ---- */
    var hx0 = X(V.hatch[0][0]) - 0.6, hx1 = X(V.hatch[3][1]) + 0.6, HY = 2.95, HR = 0.2;
    A.add("tile", gridGeo(THREE, 10, 8, function (u, v) {
      var xx = hx0 + (hx1 - hx0) * u, yy = -HY + 2 * HY * v; return [xx, yy, topZ(xx, yy) + HR];
    }, false), 0, 0, 0);
    for (sg = -1; sg <= 1; sg += 2) {
      /* the casing's side skirts and end faces */
      A.add("tile", gridGeo(THREE, 10, 1, function (u, v) {
        var xx = hx0 + (hx1 - hx0) * u; return [xx, sg * HY, topZ(xx, HY) - 0.1 + (HR + 0.1) * v];
      }, sg > 0, true), 0, 0, 0);
      var xe = sg > 0 ? hx1 : hx0;
      A.add("tile", gridGeo(THREE, 8, 1, function (u, v) {
        var yy = -HY + 2 * HY * u; return [xe, yy, topZ(xe, yy) - 0.1 + (HR + 0.1) * v];
      }, sg < 0, true), 0, 0, 0);
    }
    for (k = 0; k < V.hatch.length; k++) {
      var la0 = X(V.hatch[k][0]) + 0.12, la1 = X(V.hatch[k][1]) - 0.12;
      for (sg = -1; sg <= 1; sg += 2) {
        var ya0 = sg * 0.22, ya1 = sg * 2.72;
        /* the dark joint round the lid, then the lid */
        A.add("dark", gridGeo(THREE, 3, 3, function (u, v) {
          var xx = la0 + (la1 - la0) * u, yy = ya0 + (ya1 - ya0) * v; return [xx, yy, topZ(xx, yy) + HR + 0.03];
        }, sg < 0), 0, 0, 0);
        A.add("tile", gridGeo(THREE, 3, 3, function (u, v) {
          var xx = la0 + 0.13 + (la1 - la0 - 0.26) * u, yy = ya0 + sg * 0.13 + (ya1 - ya0 - sg * 0.26) * v;
          return [xx, yy, topZ(xx, yy) + HR + 0.07];
        }, sg < 0), 0, 0, 0);
      }
    }

    /* ---- cruciform stern ---- */
    function pt(p) { return [X(p[0]), zOf(p[1])]; }
    A.add("tile", ext(THREE, V.ur.map(pt), 0.62, true), 0, 0.31, 0);
    A.add("tile", ext(THREE, V.lr.map(pt), 0.62, true), 0, 0.31, 0);
    /* cap plate on the upper fin (drawing) */
    var ftop = zOf(V.ur[1][1]);
    A.add("tile", new THREE.BoxGeometry(X(146) - X(85), 1.0, 0.24), (X(146) + X(85)) / 2, 0, ftop + 0.1);
    /* rudder hinge lines on both fins */
    for (sg = -1; sg <= 1; sg += 2) {
      A.add("dark", new THREE.BoxGeometry(0.1, 0.04, ftop - zOf(V.ur[0][1]) - 0.3), X(V.hinge), sg * 0.32, (ftop + zOf(V.ur[0][1])) / 2);
      var lb = zOf(V.lr[1][1]);
      A.add("dark", new THREE.BoxGeometry(0.1, 0.04, zOf(V.lr[0][1]) - lb - 0.3), X(V.hinge), sg * 0.32, (lb + zOf(V.lr[0][1])) / 2);
    }
    /* horizontal stern planes: very large, square tips, swept leading edge (float-out photos) */
    var xle = X(205), xte = X(92), SPY = 7.4, zpl = zOf(V.lozen[1]);
    var pl = [[xle, 0.9], [xle - 2.0, SPY], [xle - 5.0, SPY], [xte, 0.9], [xte, -0.9], [xle - 5.0, -SPY], [xle - 2.0, -SPY], [xle, -0.9]];
    A.add("tile", ext(THREE, pl, 0.42), 0, 0, zpl - 0.21);
    for (sg = -1; sg <= 1; sg += 2) {
      /* hinge of the moving after part, top and bottom */
      strut(THREE, A, "dark", 0.035, [xle - 3.6, sg * 1.6, zpl + 0.215], [xle - 5.3, sg * (SPY - 0.2), zpl + 0.215], 4);
      strut(THREE, A, "dark", 0.035, [xle - 3.6, sg * 1.6, zpl - 0.215], [xle - 5.3, sg * (SPY - 0.2), zpl - 0.215], 4);
      /* tip plates and the root fairing on the cone (the drawing's lens) */
      A.add("tile", new THREE.BoxGeometry(5.0 - 2.0 + 0.2, 0.16, 0.5), xle - 3.5, sg * (SPY + 0.05), zpl);
      var lx = X(V.lozen[0]);
      A.add("tile", new THREE.SphereGeometry(1, 16, 8), lx, sg * (sideY(lx, zpl) - 0.3), zpl, 0, 0, 0, [4.2, 0.65, 0.55]);
    }

    /* ---- open skewed propeller behind the cone (drawings; ru.wikipedia) ---- */
    var pz = zOf(V.tab[V.tab.length - 1][1]), r35 = hullH(xt);
    var hubP = [new THREE.Vector2(0.001, X(1)), new THREE.Vector2(0.3, X(4)), new THREE.Vector2(0.52, X(10)),
                new THREE.Vector2(0.62, X(16)), new THREE.Vector2(r35 * 0.92, X(30)), new THREE.Vector2(r35, X(35.5))];
    var hub = new THREE.LatheGeometry(hubP, 20);
    hub.rotateZ(-PI / 2);
    A.add("metal", hub, 0, 0, pz);
    var BL = [[-0.40, 0.45], [-0.62, 1.05], [-0.78, 1.65], [-0.80, 2.2], [-0.55, 2.55], [-0.15, 2.62], [0.20, 2.35],
              [0.30, 1.85], [0.32, 1.2], [0.30, 0.45]];
    var NB = 7, bxp = X(19);
    for (i = 0; i < NB; i++) {
      var gb = ext(THREE, BL, 0.07);
      gb.translate(0, 0, -0.035); gb.rotateY(0.55);
      A.add("bronze", gb, bxp, 0, pz, i * 2 * PI / NB, 0, 0);
    }

    /* ---- modest team marks on the casing crown, fore and aft ---- */
    function crownPatch(x0, x1) {
      return gridGeo(THREE, 3, 2, function (u, v) {
        var xx = x0 + (x1 - x0) * u, yy = -0.5 + v; return [xx, yy, topZ(xx, yy) + 0.04];
      }, false);
    }
    A.add("team", crownPatch(X(1690) - 1.4, X(1690) + 1.4), 0, 0, 0);
    A.add("team", crownPatch(X(470) - 1.4, X(470) + 1.4), 0, 0, 0);

    A.done(T, g);
    return g;
  }
  return { build: build, V885: V885, V885M: V885M };
})();

/* len is the true length: render3d scales a submarine by it (sub_specs.js 139.2 / 130.0); the
   model's X extent (propeller hub to bow) is the same figure. */
UNIT_MODELS["pact_e00_ssn"] = {
  len: 139.2,
  build: function (THREE, M, C) { return HeroYasen.build(THREE, M, C, HeroYasen.V885); }
};
UNIT_MODELS["ssn_p"] = {
  len: 130.0,
  build: function (THREE, M, C) { return HeroYasen.build(THREE, M, C, HeroYasen.V885M); }
};
