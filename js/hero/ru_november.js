/* ============ ru_november.js -- HERO model: Project 627 Kit / November SSN, K-3 (pact_e50_ssn) ============
   K-3 "Leninsky Komsomol", the first Soviet nuclear submarine, lead boat of Project 627 (the row: "Project 627
   Kit (K-3 Leninsky Komsomol)", service 1958, e50; sub_specs.js "November-class (Project 627A, K-3)"). Two
   shafts, the screws in the horizontal plane. Full-quality redo, 2026-10-24. One row, one key; no other file
   reads pact_e50_ssn or HeroNovember627 (grep of js/, tools/ and the html), render3d reads no named node of a
   submarine, and the row is not turret:true, so nothing is named.

   WHICH K-3: drawn as K-3 is PHOTOGRAPHED - to the Project 627A standard. ru.wikipedia ("Podvodnye lodki
   proekta 627(A) Kit"): only K-3 was built to Project 627, every later boat to 627A; outwardly the two differ
   mainly in where the sonar antennas sit, moved to the bow, "in the lower part of the bow compartment in a
   special protrusion"; and K-3 was brought to the 627A standard in her 1959-1960 refit. K-3 AS BUILT (1958)
   differed: no chin dome under the bow and no light sonar windows on the bow sides (the Project 627 drawing,
   d627), the fin thickened at its fore end round a sonar antenna, with a large light window panel on its fore
   end where the 627A has a row of small windows (d627 against d627a). No photograph of K-3 as built was
   found, so the as-built boat is not drawn; every photograph (the museum boat, the K-14 fin) is 627A-standard.

   References (Wikimedia Commons, fetched at width=960, cached in scratchpad/q_november_ref):
     d627a "November class SSN 627A project.svg": starboard elevation, bow right. THE source for every
            station: stern tip 1 px, bow tip 958.8 px, 957.8 px = 107.4 m (8.918 px/m). Waterline (white
            line) row 94; crown row 76.5 (1.96 m over it), keel row 147 (5.95 m under it): 7.9 m deep, the
            published beam, so a round section with its axis 2.0 m under the water.
     d627  "November class SSN 627 project.svg": the same boat as built (K-3 1958), for the differences above.
     dnov  "November submarine.svg" (Project 627): the same layout, waterline and all.
     p_k3  "K-3 v Muzee boevykh korabley ... 30 iyulya 2023 goda.jpg" (Cyrillic file name; K-3 in the
            Kronshtadt museum): starboard bow - the very round bow, the bow planes run out high on the bow,
            the light-grey upper bow, the big light sonar window, the dark tube shutters, the fin and masts.
     p_m07, p_m20 "Museum of Russian Naval Glory 07 / 20.jpg": the bow three-quarter and head-on - eight
            tube shutters in two columns of four, the light keel dome (chin) under the bow, the planes.
     p_m01, p_m03 "... 01 / 03.jpg": the stern - the tall flat stern blade, the horizontal stabilisers with
            the long shaft bossings, a six-blade screw turning at the after end of each, the plate aft of it.
     p_m12, p_m24 "... 12 / 24.jpg": the long round black hull, the row of small free-flood openings high on
            the side, the plating seams.
     p_k159 "K-159.JPG" (627A hulks at Gremikha): the round hull, the long sloped fin, the opening rows.
     p_k14 "Pamyatnik atomnomu podvodnomu flotu.JPG" (Cyrillic file name; the K-14 fin, Obninsk, 627A): the
            fin's broad round nose, its sides tumbling home, the row of small windows low round the nose.
     ru.wikipedia "Podvodnye lodki proekta 627(A) Kit" and "K-3 Leninsky Komsomol": the refit, 8 bow tubes
            of 533 mm, two screws in the horizontal plane, the external rubber coating of the 627A.

   RECOGNITION (each one shows on the final sheets):
     1. The very long round hull, 107.4 x 7.9 m, nearly 14:1, parallel for most of its length (d627a; p_m24).
     2. The rounded "limousine" bow: the crown runs on nearly level, the forefoot sweeps up to a blunt round
        nose (d627a stations 868-958 px; p_k3, p_m20).
     3. The light keel dome (chin) under the bow, 627A sonar (d627a 872-932 px, 1.7 m deep; p_m07, p_m20).
     4. The light sonar window on each bow side and the light-grey upper bow (d627a; p_k3, p_m07).
     5. Eight dark tube shutters on the bow face, two columns of four (p_m20, p_m07; ru.wiki 8 tubes).
     6. Bow planes run out high on the bow, on the line of their housing (p_k3, p_m20; housing d627a).
     7. The long low fin about a fifth of the length abaft the bow: long convex after slope, flat roof 3.5 m
        over the casing, steep rounded fore end (d627a 607-715.5 px); the broad round nose (p_k14).
     8. The mast suite as drawn: frame aerial, whip, the oval-headed mast, the hooked periscope, the plain
        mast, the tall whip with its cross-piece, the dome-headed mast forward (d627a; p_k3 masts raised).
     9. The casing's free-flood openings: the long row high on the side, the groups low on the hull
        (d627a holes, both sides; p_m24, p_m12, p_k159).
    10. The stern: the hull narrowing in plan into a tall flat blade (upper fin and rudder) as deep as the
        hull (d627a 1-72 px; p_m01, p_m03).
    11. The twin screws on horizontal stabilisers with long shaft bossings, the plates aft of the screws
        (d627a 20-155 px; p_m01, p_m03), six broad skewed blades each (p_m01, p_m03).
    12. Black overall, keel included (p_k3 and the museum photographs); the light grey only where photographed.

   CORRECTED from the earlier model (ru_november.js of HEAD):
     - The bow planes: drawn run out, as K-3 is photographed (the earlier model drew only housed slots).
     - The chin dome, the side sonar windows and the tube shutters are drawn as photographed (the earlier
       model drew small patches and no chin).
     - The stern: a tall flat blade with the stabilisers and long shaft bossings (d627a; p_m01, p_m03) in
       place of the earlier fine tail cone with small rudders and free-standing shaft pods.
     - The under-body: the earlier model painted it red-brown from the drawings; every photograph shows the
       boat black to the keel, so it is black (as the Victor, Akula and Foxtrot-era redos).
     - The fin: 607-715.5 px of d627a, 12.1 m at the casing, roof 3.5 m over the crown (the earlier model
       followed the 627 drawing).
   NOT CONFIRMED, and so estimated or not drawn:
     - No plan view was found: the fin's width (half-width 1.65 m at the foot to 1.25 m under the roof, from
       p_k14), the stern's taper in plan (to a 0.9 m blade, from p_m01/p_m03), the shafts' spacing (+-3.0 m)
       and the stabiliser span (+-4.6 m), the bow-plane span (1.7 m out, from p_m20), the chin's width (2.6 m
       at the hull, from p_m20) are estimates.
     - The screw diameter, 2.6 m, is the drawing's; SIX blades are counted on the museum boat (p_m01,
       p_m03); whether K-3 carried six-blade screws in 1958 is not confirmed.
     - The red rescue buoy dome aft and the bollards on the casing are the drawing's (d627a), no photograph.
     - NOT DRAWN: hull numbers, names, flags, rails, the museum's white line and draught marks (the museum
       paint; no period photograph shows them), the drawing's red-brown under-body (above), the museum
       walkway and guard rails.
   Paint: K-3's lit side in p_k3 samples (43,39,37), a satin black: the house black of the Soviet submarine
   redos, #2a2a2c. The sonar window (132,135,138) and the upper bow (198,195,194) under museum light, taken to
   about 0.7-0.75: #64676a and #8a8785. Screws bronze.
   Dimensions: 107.4 m (sub_specs.js; the model's X extent, stern blade to bow), beam 7.9 m, crown 1.96 m over
   the water line, keel 5.95 m under it (d627a). sub_specs' sailLen 15 / sailH 4.4 do not match the drawing
   (12.1 m at the casing, 3.5 m over the crown, 5.5 m over the water): reported, not edited.
   MEASURED on the model: 107.40 m stern blade to bow; 7.91 m beam over the hull (9.2 m over the stern
   stabilisers); crown 2.0 m over the water line, keel 5.94 m under it, chin to 7.63 m; the fin 11.7 m long
   0.45 m over the crown, roof 5.5 m over the water; mast heads to 9.64 m; screws 2.6 m; bow planes to 4.1 m
   from the centre line. 15,662 triangles, 9 draw calls, 9 materials, 2 canvas textures.
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a submarine by
   UNIT_MODELS[key].len and draws a "sub" row at a fixed datum under the surface. Merged per material.
   ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroNovember627 = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 957.8 / 107.4;                                 /* drawing px per metre */
  var WL = 94;                                             /* drawing row of the water line */
  function X(px) { return (px - 1) / PXM - 53.7; }         /* drawing column -> model x */
  function Z(row) { return (WL - row) / PXM; }             /* drawing row -> metres over the water */
  function pxOf(x) { return (x + 53.7) * PXM + 1; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* [drawing column, top row, keel row] of the hull body off d627a (fins and chin excluded); the forefoot
     under the chin is carried smoothly from 868 px to where the chin's fore edge meets it (932 px) */
  var STA = [
    [1, 79, 138], [2, 79, 139], [4, 79, 140], [6, 79, 141], [9, 79, 142], [10, 79, 144], [12, 79, 146],
    [15, 79, 147], [72, 79, 147], [100, 78, 147], [140, 77, 147], [200, 76.5, 147], [868, 76.5, 147],
    [876, 76.5, 147], [884, 77, 146.5], [892, 77, 146], [900, 78, 145], [908, 79, 144], [912, 80, 143.5],
    [916, 81, 142.8], [920, 82, 142], [924, 83, 141.2], [928, 84, 140.4], [932, 85, 139.2], [936, 87, 137],
    [940, 88, 135], [944, 91, 133], [948, 93, 130], [952, 97, 127], [954, 99.5, 124.5], [956, 102, 121],
    [957, 104, 119.5], [958, 106, 117.5], [958.5, 108.5, 115], [958.8, 111, 112.5]
  ];
  function tab(x) {
    var p = pxOf(x), i;
    if (p <= STA[0][0]) return [STA[0][1], STA[0][2]];
    for (i = 1; i < STA.length; i++) {
      if (p <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (p - a[0]) / (b[0] - a[0]);
        return [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      }
    }
    var l = STA[STA.length - 1];
    return [l[1], l[2]];
  }
  function zc(x) { var r = tab(x); return (Z(r[0]) + Z(r[1])) / 2; }
  function hh(x) { var r = tab(x); return Math.max(0.02, (Z(r[0]) - Z(r[1])) / 2); }
  /* plan: round section; aft of 260 px the hull narrows in plan into the flat stern blade (p_m01, p_m03) */
  var TP = 260, BLADE = 0.45;
  function hw(x) {
    var p = pxOf(x), h = hh(x);
    if (p >= TP) return h;
    var t = clamp((p - 1) / (TP - 1), 0, 1);
    return BLADE + (h - BLADE) * (1 - Math.pow(1 - t, 1.6));
  }
  /* section exponent: a circle over the body, squaring off aft into the flat-sided blade (p_m01) */
  function sx(x) { var p = pxOf(x); return p >= TP ? 2 : 2 + 1.6 * Math.pow(1 - clamp((p - 1) / (TP - 1), 0, 1), 1.5); }
  function sideY(x, z) {
    var h = hh(x), d = Math.min(1, Math.abs((z - zc(x)) / h)), n = sx(x);
    return hw(x) * Math.pow(Math.max(1 - Math.pow(d, n), 0.0004), 1 / n);
  }
  function topZ(x, y) {
    var w = hw(x), d = Math.min(1, Math.abs(y / w)), n = sx(x);
    return zc(x) + hh(x) * Math.pow(Math.max(1 - Math.pow(d, n), 0.0004), 1 / n);
  }
  var XS = X(1), XE = X(958.8);

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  var PAINT = "#2a2a2c";
  var _tex = {};

  /* hull skin: u stern -> bow over XS..XE, v round the girth (0 port beam, 0.25 crown, 0.5 starboard beam,
     0.75 keel); flipY on upload, so row = (1 - v) H. Painted plating: strakes and frames of the rubber-
     coated hull, plate-to-plate variation, salt streaks along the wash */
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(6273), i, j;
    var L = XE - XS;
    g.fillStyle = PAINT; g.fillRect(0, 0, W, H);
    var NS = 16, sh = H / NS, fw = 4.2 / L * W;
    for (j = 0; j < NS; j++) {
      var off = (j % 2) ? fw * 0.5 : 0;
      for (i = -1; i * fw < W; i++) {
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.006 + R1() * 0.018).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.02 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect(i * fw + off + 0.5, j * sh + 0.5, fw - 1, sh - 1);
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1;
    for (j = 0; j <= NS; j++) { g.beginPath(); g.moveTo(0, j * sh); g.lineTo(W, j * sh); g.stroke(); }
    for (j = 0; j < NS; j++) {
      var o2 = (j % 2) ? fw * 0.5 : 0;
      for (i = 0; i * fw + o2 < W; i++) { g.beginPath(); g.moveTo(i * fw + o2, j * sh); g.lineTo(i * fw + o2, (j + 1) * sh); g.stroke(); }
    }
    for (i = 0; i < 180; i++) {
      var sx = R1() * W, v = (R1() < 0.5 ? 0.04 : 0.46) + R1() * 0.05;
      g.fillStyle = "rgba(150,150,150," + (0.03 + R1() * 0.04).toFixed(3) + ")";
      g.fillRect(sx, (1 - v) * H, 6 + R1() * 26, 1.5);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex.hull = t;
    return t;
  }
  /* 2 m plating patch for the parts with metre UVs: fin, stern blade, planes, bossings */
  function plateTex(THREE) {
    if (_tex.plate) return _tex.plate;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d"), R1 = rng(6274), i, j;
    g.fillStyle = PAINT; g.fillRect(0, 0, S, S);
    for (j = 0; j < 2; j++) {
      for (i = -1; i < 2; i++) {
        var o = (j % 2) ? 48 : 0;
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.02).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect(i * 96 + o + 1, j * 64 + 1, 94, 62);
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.1;
    for (j = 0; j <= 2; j++) { g.beginPath(); g.moveTo(0, j * 64); g.lineTo(S, j * 64); g.stroke(); }
    for (j = 0; j < 2; j++) {
      var oo = (j % 2) ? 48 : 0;
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * 96 + oo, j * 64); g.lineTo(i * 96 + oo, (j + 1) * 64); g.stroke(); }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.repeat.set(0.5, 0.5);
    t.anisotropy = 4;
    _tex.plate = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    return {
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.80, metalness: 0.08 }),
      plate:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: plateTex(THREE), roughness: 0.80, metalness: 0.08 }),
      dark:   std(0x0c0d0f, 0.82, 0.18),     /* openings, shutters, hinge lines, windows */
      sonar:  std(0x64676a, 0.70, 0.10),     /* chin dome and side windows (p_k3, p_m07) */
      light:  std(0x8a8785, 0.75, 0.08),     /* the light-grey upper bow (p_k3, p_m07) */
      metal:  std(0x3a3f44, 0.55, 0.45),     /* masts, shafts */
      bronze: std(0x7a6640, 0.45, 0.70),     /* screws */
      red:    std(0x8e2a20, 0.70, 0.05),     /* rescue buoy dome (d627a) */
      team:   std(team, 0.86, 0.06)
    };
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    function push(mat, geo) {
      if (geo.index) geo = geo.toNonIndexed();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      (by[mat] = by[mat] || []).push(geo);
    }
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        push(mat, geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        push(mat, geo);
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

  function flip(idx) { for (var i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; } }
  function geoOf(THREE, pos, uv, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* orient a closed body outward by its signed volume */
  function outward(g) {
    var P = g.attributes.position.array, ix = g.getIndex(), a = ix.array, v = 0, i;
    for (i = 0; i < a.length; i += 3) {
      var i0 = a[i] * 3, i1 = a[i + 1] * 3, i2 = a[i + 2] * 3;
      v += P[i0] * (P[i1 + 1] * P[i2 + 2] - P[i1 + 2] * P[i2 + 1]) - P[i0 + 1] * (P[i1] * P[i2 + 2] - P[i1 + 2] * P[i2])
         + P[i0 + 2] * (P[i1] * P[i2 + 1] - P[i1 + 1] * P[i2]);
    }
    if (v < 0) { flip(a); ix.needsUpdate = true; }
    g.computeVertexNormals();
    return g;
  }
  /* orient an open patch lying on the hull so its faces look away from the hull axis */
  function awayFromAxis(g) {
    var P = g.attributes.position.array, ix = g.getIndex(), a = ix.array, s = 0, i;
    for (i = 0; i < a.length; i += 3) {
      var i0 = a[i] * 3, i1 = a[i + 1] * 3, i2 = a[i + 2] * 3;
      var ux = P[i1] - P[i0], uy = P[i1 + 1] - P[i0 + 1], uz = P[i1 + 2] - P[i0 + 2];
      var vx = P[i2] - P[i0], vy = P[i2 + 1] - P[i0 + 1], vz = P[i2 + 2] - P[i0 + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var cx = (P[i0] + P[i1] + P[i2]) / 3, cy = (P[i0 + 1] + P[i1 + 1] + P[i2 + 1]) / 3, cz = (P[i0 + 2] + P[i1 + 2] + P[i2 + 2]) / 3;
      var ax = Math.min(cx, XE - 2.5);
      s += nx * (cx - ax) + ny * cy + nz * (cz - zc(ax));
    }
    if (s < 0) { flip(a); ix.needsUpdate = true; }
    g.computeVertexNormals();
    return g;
  }

  /* the hull loft: elliptic rings, fans at both ends; uv = the hull map */
  function hullBody(THREE, xs, segs) {
    var pos = [], uv = [], idx = [], i, j, ring = segs + 1;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = hw(x), h = hh(x), c0 = zc(x), n = sx(x);
      for (j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, ct = Math.cos(t), st = Math.sin(t);
        pos.push(x, w * (ct < 0 ? -1 : 1) * Math.pow(Math.abs(ct), 2 / n), c0 + h * (st < 0 ? -1 : 1) * Math.pow(Math.abs(st), 2 / n));
        uv.push((x - XS) / (XE - XS), j / segs);
      }
    }
    for (i = 0; i < xs.length - 1; i++) {
      for (j = 0; j < segs; j++) {
        var a = i * ring + j, b = a + 1, cc = a + ring, d = cc + 1;
        idx.push(a, b, cc, b, d, cc);
      }
    }
    var L = xs.length - 1;
    var c0i = pos.length / 3; pos.push(xs[0], 0, zc(xs[0])); uv.push(0, 0.5);
    for (j = 0; j < segs; j++) idx.push(c0i, j + 1, j);
    var c1i = pos.length / 3; pos.push(XE, 0, zc(XE)); uv.push(1, 0.5);
    for (j = 0; j < segs; j++) idx.push(L * ring + j, L * ring + j + 1, c1i);
    return outward(geoOf(THREE, pos, uv, idx));
  }
  /* closed stack of horizontal outlines (counter-clockwise from above), metre UVs, top cap; a point's
     own z (third value) overrides the ring's */
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
    return geoOf(THREE, pos, uv, idx);
  }
  /* spanwise loft of foil sections: st = [[span, x of the trailing edge, x of the leading edge, thickness]];
     axis "y" for a horizontal surface (thickness along z about c0), "z" for an upright fin (along y) */
  function foil(THREE, st, axis, c0, n) {
    var pos = [], uv = [], idx = [], i, j, L = st.length, ring = n + 1;
    for (i = 0; i < L; i++) {
      var sp = st[i][0], xm = (st[i][1] + st[i][2]) / 2, ch = st[i][2] - st[i][1], th = st[i][3];
      for (j = 0; j <= n; j++) {
        var f = j / n * PI * 2, cf = Math.cos(f);
        var ax = xm + ch / 2 * cf, at = th / 2 * Math.sin(f) * (cf > 0 ? Math.sqrt(1 - cf * 0.15) : 0.55 + 0.45 * (1 + cf));
        if (axis === "y") pos.push(ax, sp, c0 + at); else pos.push(ax, c0 + at, sp);
        uv.push(ax, sp + at);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < n; j++) {
        var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var ends = [0, L - 1], e;
    for (e = 0; e < 2; e++) {
      var si = ends[e], ci = pos.length / 3, sx = (st[si][1] + st[si][2]) / 2, ss = st[si][0];
      if (axis === "y") pos.push(sx, ss, c0); else pos.push(sx, c0, ss);
      uv.push(sx, ss);
      for (j = 0; j < n; j++) {
        if (e === 0) idx.push(ci, si * ring + j + 1, si * ring + j);
        else idx.push(ci, si * ring + j, si * ring + j + 1);
      }
    }
    return outward(geoOf(THREE, pos, uv, idx));
  }
  /* a lathe about +x: prof = [[x, r]] */
  function lathe(THREE, prof, seg) {
    var pp = [], i;
    for (i = 0; i < prof.length; i++) pp.push(new THREE.Vector2(Math.max(0.001, prof[i][1]), prof[i][0]));
    var g = new THREE.LatheGeometry(pp, seg);
    g.rotateZ(-PI / 2);
    g.computeVertexNormals();
    var P = g.attributes.position.array, N = g.attributes.normal.array, dot = 0;
    for (i = 0; i < P.length; i += 3) dot += P[i + 1] * N[i + 1] + P[i + 2] * N[i + 2];
    if (dot < 0) { var ix = g.getIndex(); flip(ix.array); ix.needsUpdate = true; g.computeVertexNormals(); }
    return g;
  }
  /* a grid patch; fn(u, v) -> [x, y, z]; metre UVs */
  function gridGeo(THREE, nx, nz, fn, flp) {
    var pos = [], uv = [], idx = [], i, j, a, b, c, d, v;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) { v = fn(i / nx, j / nz); pos.push(v[0], v[1], v[2]); uv.push(v[0], v[2]); }
    }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        a = j * (nx + 1) + i; b = a + 1; c = a + nx + 1; d = c + 1;
        if (flp) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    return geoOf(THREE, pos, uv, idx);
  }
  /* a flank patch on the hull: x0..x1, z0..z1, 'off' proud; sign +1 port */
  function hullPatch(THREE, sign, x0, x1, z0, z1, off, nx, nz) {
    return awayFromAxis(gridGeo(THREE, nx || 3, nz || 1, function (u, v) {
      var xx = x0 + (x1 - x0) * u, zz = z0 + (z1 - z0) * v;
      return [xx, sign * (sideY(xx, zz) + off), zz];
    }, false));
  }
  /* the bow surface's x at a point (y, z) seen from ahead, by bisection over the bow */
  function bowX(y, z) {
    var a = X(868), b = XE, i, m;
    for (i = 0; i < 40; i++) {
      m = (a + b) / 2;
      var w = hw(m), h = hh(m), dz = (z - zc(m)) / h, dy = y / w;
      if (dy * dy + dz * dz < 1) a = m; else b = m;
    }
    return (a + b) / 2;
  }
  function strut(THREE, A, mat, r0, r1, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r1, r0, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }

  /* ---- the fin off d627a: [row, column] of its after and fore outline ---- */
  var SB = Z(76.5), ST = Z(45);                            /* casing crown; the roof, 3.5 m over it */
  var S_AFT = [[45, 671], [46, 665], [47, 662], [48, 659], [50, 653], [51, 650], [52, 647], [55, 641],
               [56, 638], [58, 635], [60, 632], [61, 629], [63, 626], [65, 623], [67, 620], [68, 617],
               [70, 614], [73, 611], [76.5, 607]];
  var S_FORE = [[45, 704], [46, 707], [48, 710], [52, 713], [56, 714.6], [60, 715.3], [76.5, 715.5]];
  function colAt(tb, z) {
    var r = WL - z * PXM, i;
    if (r <= tb[0][0]) return tb[0][1];
    for (i = 1; i < tb.length; i++) {
      if (r <= tb[i][0]) {
        var a = tb[i - 1], b = tb[i];
        return a[1] + (b[1] - a[1]) * (r - a[0]) / (b[0] - a[0]);
      }
    }
    return tb[tb.length - 1][1];
  }
  /* half-width over the height: 1.65 m low down, the sides tumbling home to 1.25 m under the rounded
     roof (p_k14, estimated) */
  function sailHW(z) { var t = clamp((z - SB) / (ST - SB), 0, 1); return 1.65 - 0.40 * t * t; }
  /* plan form: broad round nose (p_k14), widest in the fore third, narrowing along the after slope */
  function sailHalf(s, L, w) {
    var Ln = Math.min(w * 1.3, 0.4 * L), v;
    if (s <= 0) return 0;
    if (s < Ln) { v = (Ln - s) / Ln; return w * Math.sqrt(Math.max(0, 1 - v * v)); }
    v = Math.min(1, (s - Ln) / (L - Ln));
    return w * (1 - 0.70 * Math.pow(v, 1.7));
  }
  function sailRing(x0, x1, w, M) {
    var pts = [], L = x1 - x0, k, s;
    for (k = 0; k <= M; k++) { s = L * Math.pow(k / M, 1.4); pts.push([x1 - s, Math.max(0.03, sailHalf(s, L, w))]); }
    for (k = M - 1; k >= 1; k--) pts.push([pts[k][0], -pts[k][1]]);
    return pts;
  }
  function sailW(x, z) {
    var x0 = X(colAt(S_AFT, z)), x1 = X(colAt(S_FORE, z));
    return sailHalf(x1 - x, x1 - x0, sailHW(z));
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, j, k, s, x, z, px;

    /* ---- the hull: one loft, stern blade to the bow ---- */
    var xs = [];
    for (i = 0; i < STA.length; i++) xs.push(X(STA[i][0]));
    for (px = 20; px < TP; px += 10) xs.push(X(px));
    for (px = TP; px < 860; px += 30) xs.push(X(px));
    for (px = 860; px < 958; px += 4) xs.push(X(px));
    xs.sort(function (p, q) { return p - q; });
    var xu = [];
    for (i = 0; i < xs.length; i++) if (!i || xs[i] - xu[xu.length - 1] > 0.2 || (pxOf(xs[i]) > 950 && xs[i] - xu[xu.length - 1] > 0.02)) xu.push(xs[i]);
    A.add("skin", hullBody(THREE, xu, 48), 0, 0, 0);

    /* ---- the light-grey upper bow (p_k3, p_m07; d627a's light wedge): over the crown from 46 m to the
            nose, its lower edge falling from 1.0 m to the water line at the nose ---- */
    var CX0 = 46.0, CX1 = XE - 0.25;
    A.add("light", awayFromAxis(gridGeo(THREE, 24, 26, function (u, v) {
      var xx = CX0 + (CX1 - CX0) * u, zb = 1.0 - 1.0 * (xx - CX0) / (XE - CX0);
      var h = hh(xx), w = hw(xx), c0 = zc(xx), sb = clamp((zb - c0) / h, -1, 0.999);
      var t0 = Math.asin(sb), t = t0 + (PI - 2 * t0) * v;
      return [xx, (w + 0.04) * Math.cos(t), c0 + (h + 0.04) * Math.sin(t)];
    }, false)), 0, 0, 0);

    /* ---- the sonar windows on the bow sides (p_k3, p_m07, p_m20: one large light panel a side at the
            widest part of the bow; d627a puts them at 912-956 px, rows 112-119) ---- */
    for (s = -1; s <= 1; s += 2) {
      A.add("sonar", hullPatch(THREE, s, 45.6, 50.9, -2.85, -1.2, 0.045, 16, 6), 0, 0, 0);
    }

    /* ---- the chin: the 627A keel dome under the bow (d627a 872-932 px, to row 162; p_m07, p_m20: light
            grey, 2.6 m wide at the hull, round under) ---- */
    var CH = [[872, 148], [876, 150], [880, 151], [884, 153], [888, 155], [892, 156], [896, 158], [900, 159],
              [904, 160], [908, 161], [912, 162], [916, 162], [920, 162], [922, 161.5], [924, 160],
              [926, 156], [928, 151], [930, 146], [931.5, 141.5]];
    var cr = [], NC = 14;
    for (i = 0; i < CH.length; i++) {
      var cxp = X(CH[i][0]), zbot = Z(CH[i][1]), zt0 = zc(cxp) - hh(cxp) * 0.55;
      var sw = (i === 0 || i === CH.length - 1) ? 0.04 : 1.0;
      var hwc = 1.3 * sw, hwb = 0.95 * sw, pts = [];
      for (j = 0; j <= NC; j++) {
        var a = PI * j / NC, cy = Math.cos(a), sz = Math.sin(a);
        var depth = zt0 - zbot, rr = Math.min(hwb, depth * 0.6);
        /* U section: straight tapering sides, a round bottom of radius rr */
        var yy, zz;
        if (sz < 0.7) { yy = cy * (hwc + (hwb - hwc) * (sz / 0.7)); zz = zt0 - (depth - rr) * (sz / 0.7); }
        else { yy = cy * hwb; zz = zt0 - (depth - rr) - rr * Math.sqrt(1 - Math.pow(1 - (sz - 0.7) / 0.3, 2)); }
        pts.push([yy, zz]);
      }
      cr.push({ x: cxp, pts: pts });
    }
    (function () {
      var pos = [], uv = [], idx = [], n = NC + 1, ii, jj;
      for (ii = 0; ii < cr.length; ii++) for (jj = 0; jj < n; jj++) { pos.push(cr[ii].x, cr[ii].pts[jj][0], cr[ii].pts[jj][1]); uv.push(cr[ii].x, cr[ii].pts[jj][1]); }
      for (ii = 0; ii < cr.length - 1; ii++) for (jj = 0; jj < n - 1; jj++) {
        var a0 = ii * n + jj; idx.push(a0, a0 + 1, a0 + n, a0 + 1, a0 + n + 1, a0 + n);
      }
      var gch = geoOf(THREE, pos, uv, idx);
      /* faces away from the dome's own axis (x, 0, mid-depth) */
      var P = gch.attributes.position.array, ix = gch.getIndex().array, sgn = 0, q;
      for (q = 0; q < ix.length; q += 3) {
        var i0 = ix[q] * 3, i1 = ix[q + 1] * 3, i2 = ix[q + 2] * 3;
        var ux = P[i1] - P[i0], uy = P[i1 + 1] - P[i0 + 1], uz = P[i1 + 2] - P[i0 + 2];
        var vx = P[i2] - P[i0], vy = P[i2 + 1] - P[i0 + 1], vz = P[i2 + 2] - P[i0 + 2];
        var ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        sgn += ny * (P[i0 + 1] + P[i1 + 1] + P[i2 + 1]) / 3 + nz * ((P[i0 + 2] + P[i1 + 2] + P[i2 + 2]) / 3 + 6.2);
      }
      if (sgn < 0) { flip(ix); gch.getIndex().needsUpdate = true; }
      gch.computeVertexNormals();
      A.add("sonar", gch, 0, 0, 0);
    })();

    /* ---- eight tube shutters on the bow face, two columns of four (p_m20, p_m07): y +-1.5 m, centres
            3.05, 1.55, 0.1 and -1.35 m from the bow axis; 1.1 x 1.0 m, rounded ---- */
    var ZAX = zc(X(940)), TR = [3.05, 1.55, 0.1, -1.35];
    for (k = 0; k < TR.length; k++) {
      for (s = -1; s <= 1; s += 2) {
        var ty = s * 1.5, tz = ZAX + TR[k];
        A.add("dark", awayFromAxis(gridGeo(THREE, 4, 4, function (u, v) {
          var yy = ty + (u - 0.5) * 1.1, zz = tz + (v - 0.5) * 1.0;
          var cu = Math.abs(u - 0.5) * 2, cv2 = Math.abs(v - 0.5) * 2;      /* round the corners in */
          if (cu > 0.6 && cv2 > 0.6) { var f = 1 - 0.18 * (cu - 0.6) * (cv2 - 0.6) / 0.16; yy = ty + (yy - ty) * f; zz = tz + (zz - tz) * f; }
          return [bowX(yy, zz) + 0.07, yy, zz];
        }, false)), 0, 0, 0);
      }
    }

    /* ---- the bow planes, run out (p_k3, p_m20) on the line of their housing (d627a 870-910 px, rows
            82-88): 4 m chord, 1.7 m out from the hull, raked tip (estimated span) ---- */
    var BPZ = Z(85), bpx0 = X(872), bpx1 = X(908);
    for (s = -1; s <= 1; s += 2) {
      var yr = sideY((bpx0 + bpx1) / 2, BPZ) - 0.3;
      var bst = [[s * yr, bpx0, bpx1, 0.40], [s * (yr + 0.9), bpx0 + 0.05, bpx1 - 0.1, 0.34],
                 [s * (yr + 1.7), bpx0 + 0.25, bpx1 - 0.6, 0.24], [s * (yr + 1.95), bpx0 + 0.7, bpx1 - 1.3, 0.14]];
      if (s < 0) bst.reverse();
      A.add("plate", foil(THREE, bst, "y", BPZ, 12), 0, 0, 0);
      /* the housing's open slot behind the root */
      A.add("dark", hullPatch(THREE, s, bpx0 - 0.15, bpx1 + 0.15, Z(88), Z(82), 0.015, 4, 1), 0, 0, 0);
    }

    /* ---- free-flood openings off d627a (both sides): the long row high on the casing side, the bow run
            falling forward, the low groups ---- */
    var HI = [113, 145, 167, 188, 209, 231, 252, 274, 295, 316, 338, 356, 372.5, 376.5, 401, 412, 438, 465, 489,
              513, 532, 551, 570, 608, 618, 634, 644, 659, 669, 679, 690, 700, 715, 725, 741, 756, 771, 787, 802];
    var HB = [[817, 84.5], [832, 85.5], [853, 87.5], [863, 88.5], [884, 90.5]];
    var LO = [[103, 105], [108, 105], [113, 105.5], [119, 105.5], [135, 106.5], [141, 107], [146, 107.5],
              [151, 107.5], [162, 108], [167, 108.5], [173, 109], [216, 111.5], [221, 111.5], [227, 111.5],
              [232, 111.5], [238, 111.5], [248, 111.5], [800, 126], [807, 126], [814, 126], [821, 126],
              [855, 139], [862, 139], [869, 139], [883, 139], [889, 139], [281, 144], [290, 144], [302, 144],
              [309, 144], [344, 144], [351, 144], [398, 144], [406, 144], [418, 144], [553, 144], [558, 144],
              [577, 144], [582, 144], [588, 144], [633, 144], [640, 144], [649, 144], [690, 144], [702, 144],
              [711, 144], [723, 144], [732, 144], [796, 144], [803, 144], [810, 144], [818, 144]];
    var GR = [[384, 123], [389, 123], [384, 126.5], [389, 126.5], [446, 123], [451, 123], [446, 126.5], [451, 126.5]];
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < HI.length; k++) {
        x = X(HI[k] + 1.5);
        A.add("dark", hullPatch(THREE, s, x - 0.27, x + 0.27, Z(84.6), Z(82.6), 0.02, 1, 1), 0, 0, 0);
      }
      for (k = 0; k < HB.length; k++) {
        x = X(HB[k][0] + 1.5); z = Z(HB[k][1]);
        A.add("dark", hullPatch(THREE, s, x - 0.25, x + 0.25, z - 0.11, z + 0.11, 0.02, 1, 1), 0, 0, 0);
      }
      for (k = 0; k < LO.length; k++) {
        x = X(LO[k][0] + 1.5); z = Z(LO[k][1]);
        A.add("dark", hullPatch(THREE, s, x - 0.2, x + 0.2, z - 0.08, z + 0.08, 0.02, 1, 1), 0, 0, 0);
      }
      for (k = 0; k < GR.length; k++) {
        x = X(GR[k][0] + 1); z = Z(GR[k][1]);
        A.add("dark", hullPatch(THREE, s, x - 0.2, x + 0.2, z - 0.17, z + 0.17, 0.02, 1, 1), 0, 0, 0);
      }
      /* the small group high on the upper bow (898-912 px, row 101.5) */
      for (k = 0; k < 4; k++) {
        x = X(899 + k * 4); z = Z(101.5);
        A.add("dark", hullPatch(THREE, s, x - 0.14, x + 0.14, z - 0.08, z + 0.08, 0.03, 1, 1), 0, 0, 0);
      }
    }

    /* ---- casing fittings as drawn: the red rescue buoy dome aft (145 px), bollards (184, 839, 861-876) ---- */
    var bxr = X(147);
    A.add("plate", new THREE.CylinderGeometry(0.62, 0.66, 0.12, 18), bxr, 0, topZ(bxr, 0) + 0.02, PI / 2, 0, 0);
    A.add("red", new THREE.SphereGeometry(0.46, 14, 6, 0, 2 * PI, 0, PI / 2), bxr, 0, topZ(bxr, 0) + 0.07, PI / 2, 0, 0, [1, 0.7, 1]);
    var BO = [184, 839, 861, 866, 871, 876];
    for (k = 0; k < BO.length; k++) {
      var bx = X(BO[k]), bz = topZ(bx, 0);
      A.add("metal", new THREE.CylinderGeometry(0.1, 0.12, 0.42, 8), bx, 0, bz + 0.17, PI / 2, 0, 0);
      A.add("metal", new THREE.BoxGeometry(0.14, 0.42, 0.07), bx, 0, bz + 0.38);
    }

    /* ---- the fin: long convex after slope, flat roof, steep rounded fore end; bell section flaring into
            the hull, rounded shoulders under the roof ---- */
    var rings = [], f, zn, w, xa, xf, pts, NS = 22;
    var FL = [0, 0.12, 0.28, 0.5, 0.75, 1.0], FH = 0.9, FW = 0.75, FE = 0.5;
    for (k = 0; k < FL.length; k++) {
      f = FL[k]; zn = SB - 0.35 + (FH + 0.35) * f;
      w = sailHW(Math.max(zn, SB)) + FW * (1 - f) * (1 - f);
      xf = X(colAt(S_FORE, Math.max(zn, SB))) + FE * (1 - f) * (1 - f);
      xa = X(colAt(S_AFT, Math.max(zn, SB))) - 1.8 * (1 - f) * (1 - f);
      pts = sailRing(xa, xf, w, NS);
      for (j = 0; j < pts.length; j++) {
        var zs = topZ(pts[j][0], pts[j][1]) - 0.1;
        pts[j].push((1 - f) * zs + f * Math.max(zn, zs));
      }
      rings.push({ z: zn, pts: pts });
    }
    var RT = 0.5, zl = [];
    for (k = 1; k <= 5; k++) zl.push(SB + FH + (ST - RT - SB - FH) * k / 5);
    var tops = [0.35, 0.62, 0.82, 0.94, 1.0];
    for (k = 0; k < tops.length; k++) zl.push(ST - RT + RT * tops[k]);
    function sailSec(zz) {
      var e = Math.max(0, zz - (ST - RT)) / RT, sh = RT * (1 - Math.sqrt(Math.max(0, 1 - e * e)));
      return { xa: X(colAt(S_AFT, zz)) + sh, xf: X(colAt(S_FORE, zz)) - sh * 0.6, w: sailHW(zz) - sh };
    }
    for (k = 0; k < zl.length; k++) {
      var sc = sailSec(zl[k]);
      rings.push({ z: zl[k], pts: sailRing(sc.xa, sc.xf, sc.w, NS) });
    }
    A.add("plate", shell(THREE, rings), 0, 0, 0);
    /* thin strip on the fin side following its surface (sign +1 port) */
    function finStrip(s1, x0, x1, za, zb, wdt) {
      var horiz = (zb - za) === 0;
      var gg = gridGeo(THREE, 4, 1, function (u, v) {
        var xx = x0 + (x1 - x0) * u, zz = za + (zb - za) * u;
        if (horiz) zz += (v - 0.5) * wdt; else xx += (v - 0.5) * wdt;
        return [xx, s1 * (sailW(xx, zz) + 0.03), zz];
      }, false);
      return finOut(gg, s1);
    }
    function finPanel(s1, x0, x1, z0, z1) {
      return finOut(gridGeo(THREE, 2, 2, function (u, v) {
        var xx = x0 + (x1 - x0) * u, zz = z0 + (z1 - z0) * v; return [xx, s1 * (sailW(xx, zz) + 0.03), zz];
      }, false), s1);
    }
    function finOut(gg, s1) {
      var P = gg.attributes.position.array, ix = gg.getIndex().array, q, sg = 0;
      for (q = 0; q < ix.length; q += 3) {
        var i0 = ix[q] * 3, i1 = ix[q + 1] * 3, i2 = ix[q + 2] * 3;
        sg += (P[i1 + 2] - P[i0 + 2]) * (P[i2] - P[i0]) - (P[i1] - P[i0]) * (P[i2 + 2] - P[i0 + 2]);
      }
      if (sg * s1 < 0) { flip(ix); gg.getIndex().needsUpdate = true; }
      gg.computeVertexNormals();
      return gg;
    }
    for (s = -1; s <= 1; s += 2) {
      /* the seam along the fin's side (row 67, 618-714 px) */
      A.add("dark", finStrip(s, X(619), X(713), Z(67), Z(67), 0.07), 0, 0, 0);
      /* the door outline (672.5-679.5 px, rows 64.5-75) */
      A.add("dark", finStrip(s, X(672.5), X(672.5), Z(75), Z(64.5), 0.07), 0, 0, 0);
      A.add("dark", finStrip(s, X(679.5), X(679.5), Z(75), Z(64.5), 0.07), 0, 0, 0);
      A.add("dark", finStrip(s, X(672.5), X(679.5), Z(64.5), Z(64.5), 0.07), 0, 0, 0);
      /* two small ports high on the side (664.5 and 686.75 px, rows 50.5-52.5) */
      A.add("dark", finPanel(s, X(663.5), X(665.8), Z(52.6), Z(50.4)), 0, 0, 0);
      A.add("dark", finPanel(s, X(685.6), X(688), Z(52.6), Z(50.4)), 0, 0, 0);
    }
    /* the row of small windows low round the fin's nose (d627a 695-714 px, rows 70-74; p_k14) */
    var WZ = Z(72), wsec = sailSec(WZ), wnose = wsec.xf, wwid = sailHW(WZ);
    var WA = [-1.25, -0.84, -0.42, 0, 0.42, 0.84, 1.25];
    for (k = 0; k < WA.length; k++) {
      var an = WA[k], Ln = Math.min(wwid * 1.3, 0.4 * (wnose - wsec.xa));
      var wx = wnose - Ln + Ln * Math.cos(an) + 0.03 * Math.cos(an), wy = (wwid + 0.03) * Math.sin(an);
      A.add("dark", new THREE.BoxGeometry(0.05, 0.42, 0.38), wx, wy, WZ, 0, 0, Math.atan2(Math.sin(an) / wwid, Math.cos(an) / Ln));
    }
    /* the bridge well at the fore end of the roof, the windscreen lip round it (p_k14), the hatch */
    A.add("dark", new THREE.BoxGeometry(X(712) - X(690), 1.5, 0.05), (X(690) + X(712)) / 2, 0, ST + 0.02);
    for (k = 0; k < 9; k++) {
      var la = -PI / 2 + PI * k / 8, lr = 1.0;
      A.add("plate", new THREE.BoxGeometry(0.42, 0.06, 0.28), X(711) - lr + lr * Math.cos(la), 0.95 * Math.sin(la), ST + 0.14, 0, 0, la);
    }
    A.add("dark", new THREE.CircleGeometry(0.36, 12), X(684), 0, ST + 0.03);

    /* ---- masts off d627a, all on the centre line (p_k3 shows them raised) ---- */
    var R = function (row) { return Z(row); };
    function slopeZ(pxm) { var c = X(pxm), r, zz; for (zz = ST; zz > SB; zz -= 0.02) { r = X(colAt(S_AFT, zz)); if (r <= c) return zz; } return SB; }
    /* frame aerial on the after slope (643-648 px, rows 33-38 on a stem) */
    var fx = X(645.5), fz0 = slopeZ(645.5) - 0.1;
    strut(THREE, A, "metal", 0.06, 0.05, [fx, 0, fz0], [fx, 0, R(38)], 6);
    A.add("metal", new THREE.BoxGeometry(0.05, 0.06, R(33) - R(38)), fx - 0.28, 0, (R(33) + R(38)) / 2);
    A.add("metal", new THREE.BoxGeometry(0.05, 0.06, R(33) - R(38)), fx + 0.28, 0, (R(33) + R(38)) / 2);
    A.add("metal", new THREE.BoxGeometry(0.62, 0.06, 0.05), fx, 0, R(33));
    A.add("metal", new THREE.BoxGeometry(0.62, 0.06, 0.05), fx, 0, R(38));
    /* the thin tall whip (650.5 px, to row 13) */
    strut(THREE, A, "metal", 0.07, 0.03, [X(650.5), 0, slopeZ(650.5) - 0.1], [X(650.5), 0, R(13)], 6);
    /* the mast with the oval head (656.5 px, head rows 15-22) */
    strut(THREE, A, "metal", 0.11, 0.11, [X(656.5), 0, slopeZ(656.5) - 0.1], [X(656.5), 0, R(21)], 8);
    A.add("metal", new THREE.SphereGeometry(1, 10, 8), X(656.5), 0, (R(15) + R(22)) / 2, 0, 0, 0, [0.2, 0.2, (R(15) - R(22)) / 2]);
    /* the periscope with its hooked head (668 px, to row 11) */
    strut(THREE, A, "metal", 0.13, 0.12, [X(668), 0.15, ST], [X(668), 0.15, R(14)], 10);
    strut(THREE, A, "metal", 0.09, 0.08, [X(668), 0.15, R(14)], [X(668) + 0.3, 0.15, R(11)], 6);
    /* the plain mast (675 px, to row 11) with its cap */
    strut(THREE, A, "metal", 0.13, 0.12, [X(675), -0.15, ST], [X(675), -0.15, R(12)], 10);
    A.add("metal", new THREE.CylinderGeometry(0.15, 0.15, 0.25, 10), X(675), -0.15, R(11.5), PI / 2, 0, 0);
    /* the tall whip with its cross-piece (681 px, to row 8; cross at row 23) */
    strut(THREE, A, "metal", 0.1, 0.08, [X(681), 0, ST], [X(681), 0, R(23)], 8);
    strut(THREE, A, "metal", 0.04, 0.015, [X(681), 0, R(23)], [X(681), 0, R(8)], 5);
    A.add("metal", new THREE.BoxGeometry(0.08, 0.9, 0.06), X(681), 0, R(23));
    /* the short mast with the dome head forward (703 px, head rows 32-35) */
    strut(THREE, A, "metal", 0.09, 0.09, [X(703), 0, ST], [X(703), 0, R(34)], 8);
    A.add("dark", new THREE.SphereGeometry(0.26, 12, 8), X(703), 0, R(33.5), 0, 0, 0, [1, 1, 0.75]);

    /* ---- the stern blade: upper fin over the narrowed hull (d627a 1-74 px, roof row 68) ---- */
    var uf = [[81, 1.0, 74, 0.75], [78, 1.0, 62, 0.62], [74, 1.0, 53.5, 0.56], [71, 1.4, 49, 0.5],
              [69.3, 2.6, 45, 0.44], [68.3, 4.5, 41, 0.34], [68, 6, 38, 0.2]];
    var stf = [];
    for (i = 0; i < uf.length; i++) stf.push([Z(uf[i][0]), X(uf[i][1]), X(uf[i][2]), uf[i][3]]);
    A.add("plate", foil(THREE, stf, "z", 0, 14), 0, 0, 0);
    /* the rudder outline on the blade (d627a: hinge at 21 px, rows 99-141) */
    for (s = -1; s <= 1; s += 2) {
      var rx = X(21), r0 = Z(141), r1 = Z(99);
      A.add("dark", hullPatch(THREE, s, rx - 0.05, rx + 0.05, r0, r1, 0.02, 1, 6), 0, 0, 0);
      A.add("dark", hullPatch(THREE, s, X(1.5), rx, r1 - 0.05, r1 + 0.05, 0.02, 3, 1), 0, 0, 0);
      A.add("dark", hullPatch(THREE, s, X(1.5), rx, r0 - 0.05, r0 + 0.05, 0.02, 3, 1), 0, 0, 0);
    }

    /* ---- twin shafts on horizontal stabilisers (d627a 20-155 px, shaft line row 122; p_m01, p_m03):
            the stabiliser and its long bossing, the six-blade screw at 46 px, the plate aft of it ---- */
    var ZS = Z(122), YS = 3.0, SPAN = 4.6;
    for (s = -1; s <= 1; s += 2) {
      var yr0 = s * 0.6;
      var stab = [[yr0, X(52), X(152), 0.34], [s * YS, X(51), X(146), 0.3], [s * SPAN, X(58), X(126), 0.18]];
      if (s < 0) stab.reverse();
      A.add("plate", foil(THREE, stab, "y", ZS, 12), 0, 0, 0);
      var elev = [[yr0, X(19), X(40.5), 0.26], [s * YS, X(19), X(40.5), 0.24], [s * SPAN, X(22), X(39.5), 0.14]];
      if (s < 0) elev.reverse();
      A.add("plate", foil(THREE, elev, "y", ZS, 10), 0, 0, 0);
      /* hinge line of the plate */
      A.add("dark", new THREE.BoxGeometry(0.06, SPAN - 0.9, 0.31), X(33), s * (SPAN + 0.9) / 2, ZS);
      /* the bossing: 50-155 px as drawn, flattened into the stabiliser (p_m01, p_m03: about 1 m deep) */
      var bos = lathe(THREE, [[X(155.5), 0.02], [X(152), 0.38], [X(145), 0.66], [X(132), 0.85], [X(110), 0.9],
                              [X(80), 0.9], [X(64), 0.8], [X(55), 0.6], [X(50.5), 0.42], [X(50), 0.02]], 16);
      bos.scale(1, 0.78, 0.55);
      A.add("plate", bos, 0, s * YS, ZS);
      /* shaft, hub and the after cone (21-42 px) */
      A.add("metal", lathe(THREE, [[X(42.5), 0.2], [X(50.2), 0.2]], 10), 0, s * YS, ZS);
      A.add("bronze", lathe(THREE, [[X(43.2), 0.02], [X(43.4), 0.3], [X(48.4), 0.34], [X(48.8), 0.02]], 14), 0, s * YS, ZS);
      var cone = lathe(THREE, [[X(21), 0.02], [X(23), 0.15], [X(30), 0.32], [X(38), 0.36], [X(42.4), 0.3], [X(42.6), 0.02]], 12);
      cone.scale(1, 1, 0.8);
      A.add("plate", cone, 0, s * YS, ZS);
      /* six blades, narrow at the root, broad round skewed tips (p_m01, p_m03); disc 2.6 m (d627a; p_m01
         gives about the same against the stern blade's height) */
      var bl = [[-0.09, 0.32], [-0.23, 0.56], [-0.41, 0.88], [-0.47, 1.11], [-0.36, 1.28], [-0.09, 1.3],
                [0.11, 1.15], [0.16, 0.88], [0.11, 0.56], [0.07, 0.32]];
      for (i = 0; i < 6; i++) {
        var sh = new THREE.Shape(), bi;
        sh.moveTo(bl[0][0], bl[0][1]);
        for (bi = 1; bi < bl.length; bi++) sh.lineTo(bl[bi][0], bl[bi][1]);
        sh.closePath();
        var gb = new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: false });
        gb.translate(0, 0, -0.035);
        gb.rotateY(0.6);
        A.add("bronze", gb, X(46), s * YS, ZS, i * PI / 3 + 0.3 + (s > 0 ? 0 : PI / 6), 0, 0);
      }
    }

    /* ---- modest team marks on the casing crown, fore and aft ---- */
    function crownPatch(x0, x1) {
      return awayFromAxis(gridGeo(THREE, 3, 2, function (u, v) {
        var xx = x0 + (x1 - x0) * u, yy = -0.5 + v; return [xx, yy, topZ(xx, yy) + 0.04];
      }, false));
    }
    A.add("team", crownPatch(X(800) - 1.5, X(800) + 1.5), 0, 0, 0);
    A.add("team", crownPatch(X(420) - 1.5, X(420) + 1.5), 0, 0, 0);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length (sub_specs.js 107.4 m); the model's X extent, stern blade to bow, is the same
   figure: render3d scales a submarine by it. */
UNIT_MODELS["pact_e50_ssn"] = {
  len: 107.4,
  build: function (THREE, M, C) { return HeroNovember627.build(THREE, M, C); }
};
