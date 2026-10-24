/* ============ ru_victor.js -- HERO model: Project 671 Yorsh / Victor I SSN, K-38 (pact_e60_ssn) ============
   Soviet nuclear attack submarine; K-38, the lead boat, built 1963-1967, Northern Fleet 1967-1991
   (ru.wikipedia "K-38"). One of the first SECOND-generation Soviet SSNs (ru.wikipedia "Podvodnye lodki
   proekta 671 Yorsh"): a body-of-revolution hull, one shaft. Full-quality redo, 2026-10-24.

   References (Wikimedia Commons, fetched at width=960, cached in scratchpad/q_victor_ref):
     - "Victor I class SSN.svg" (a_svg.png, starboard profile, bow right, captioned "project 671 Yorsh.
       K-38"): THE source for every station. 960 px frame: screw-hub tip at 1.5 px, bow tip at 958.5 px,
       so 957 px = 92.5 m (10.35 px/m). Read off it: the casing crown at row 121 and the keel at row 229
       over the parallel body (10.45 m deep; published beam 10.6 m); the blunt round bow from 880 px with
       its axis 3 rows low; the long after body, its top falling faster than its keel so the tail cone
       droops (axis row 175 amidships, 184 at the tail-cone end, 20 px); the low faired fin 552-724 px
       (long convex after slope, flat roof at row 86.5 from 640 to 680 px, steep rounded fore end); the
       mast suite on the roof; the bow-plane housing on the upper hull just forward of the fin (710-765
       px, rows 124-131, its dark rounded fore end); the slot pairs and the small square openings along
       the upper hull; the cruciform stern (upper fin trailing edge upright at 74 px, roof row 105, swept
       leading edge with its fillet to 140 px; lower fin foot at row 233; rudder outlines at 97 px); the
       stern-plane root fairing (an ellipse 72-132 px, rows 177-190) with the smaller pod inside it
       (72-107 px) and the SMALL TWO-BLADE AUXILIARY SCREW behind it at 58 px; the main screw disc at
       14 px, 3.6 m across.
     - "Victor I class submarine.jpg" (b_usn.jpg, US Navy, surfaced underway, undated): the black boat,
       the low blunt fin about a quarter of the length abaft the bow, the upper rudder standing clear of
       the wake well astern, the rows of openings along the hull side, people and stubs on the fin roof.
     - "Victor class diving.jpg" (c_dive84.jpg, DoD 1984, "Victor I", at periscope depth): three masts
       raised; their spacing (74 : 100 px) matches the drawing's masts at 658, 638 and 609 px (20 : 29);
       the aftmost carries the whip.
     - "Rubka K-306 (Park Pobedy, Ufa, 2018).jpg" (f_k306sail.jpg, CC0; ru.wikipedia: the fin of the
       scrapped Project 671 K-306): the fin's bell section, the rounded fore end, narrowing to rounded
       shoulders, a broad fillet at the foot, the two small windows at the fore top, black.
     - "Eksponaty muzeya Marinesko, modeli podlodok 26.jpg" (g_model26.jpg, a builder's-style model of the
       671 family, no towed-array pod): the same silhouette; the bow planes housed in a dark fairing on the
       upper hull forward of the fin; the swept upper fin; the lower fin; the stern planes with the small
       two-blade screw right behind them; one main screw.
     - "Submarine propeller (VF 671-10-20) in B-396 Museum" front and side (h_screw.jpg, i_screw_side.jpg):
       a Project 671 main screw: broad, rounded, skewed blades, eight of them, on one short hub, the roots
       at two stations along it (side view).
     - "P-3B VP-1 over Soviet Victor class sub 1987.JPG" and the DPLA aerial of 21 March 1984
       (e_p3b87.jpg, d_aerial84.jpg, both "Victor I"): black overall, the fin low and forward.

   RECOGNITION (each one shows on the final sheets):
     1. Short, fat body of revolution, under 9:1, with a very blunt round bow (drawing; b_usn).
     2. The long after body tapering into a fine, slightly drooping tail cone (drawing; g_model26).
     3. The low faired fin about a quarter of the length abaft the bow: long convex after slope, short
        flat roof, steep rounded fore end, 3.3 m over the casing (drawing; b_usn; K-306).
     4. The fin's bell section with the broad fillet at the foot and rounded shoulders (K-306).
     5. The drawing's mast suite on the roof: whip aft, the thick orange-capped mast, the slim tubes and
        the short mast forward (drawing; c_dive84).
     6. The retractable bow planes, HOUSED, in their fairing on the upper hull forward of the fin
        (drawing; g_model26; no photograph shows them out).
     7. Cruciform stern: the swept upper fin with its long fillet, the deeper lower fin, rudder outlines
        (drawing; g_model26; b_usn).
     8. Stern planes at the shaft line with their root fairing and pods, and the two small two-blade
        auxiliary screws behind them (drawing; g_model26).
     9. One big main screw at the tail tip, broad skewed blades (drawing's disc; B-396 museum screw).
    10. Slot pairs and square openings along the upper hull (drawing; b_usn).
    11. Black painted plating, no anechoic tiles (b_usn; e_p3b87; the row's own text puts the tiles on the
        671RTM of 1979).
    12. The lozenge fairing on the bilge with the opening in its pointed fore end (drawing 473-545 px;
        g_model26 shows it too; what it is my sources do not say - the Akula drawing calls the like
        fitting a water intake).

   CORRECTED from the earlier model (ru_victor.js of HEAD):
     - "First of the third generation" -> second generation (ru.wikipedia).
     - The under-body: the earlier model painted the drawing's dark red below the water. No photograph of
       K-38's or any Victor I's under-body was found; every photograph shows the boat black to the water
       (b_usn's maroon cast is on the fin too, so it is the print, not a boot top). Drawn black to the keel,
       as the Akula, Typhoon and Delta IV redos; the red is NOT confirmed and NOT drawn.
     - The two small auxiliary screws are drawn: the drawing and the model both show one behind the stern
       plane (the earlier model left them out).
     - The main screw: eight blades on one hub (the museum screw counted again, front view), not seven.
     - The fin now has a bell section flaring into the hull (it was an extrusion standing on the casing).
     - The crown 3.4 m over the water, the keel 7.0 m under it (the earlier model: 3.0 m and 7.4 m). The
       draught is NOT confirmed by this pass's sources (about 7 m is the figure usually given).
   ESTIMATED, not measured (no plan view found): the fin's width (half-width 1.8 m, 1.5 m at the shoulder,
   2.5 m at the fillet; K-306 against the drawn height); the stern-plane span (4.7 m from the axis) and
   plan; the auxiliary pods' lateral position (2.9 m from the axis; the drawing and the model show them
   side-on only); the screw's blade outline; the masts' diameters; the bow-plane housing's exact girth
   position (from its drawn rows on the round section).
   NOT CONFIRMED for K-38 in 1967: the main screw's blade count (the B-396 screw is labelled Project 671,
   which boat is not said); the drawing's mast-head colours (orange cap) come from the drawing only.
   NOT DRAWN: hull numbers, names, flags, rails, the drawing's white line and draught marks (lettering;
   no photograph shows the line), the red under-body (above), the bridge windscreen of the K-306 memorial.
   Paint: b_usn's fin (49,25,39) with the print's magenta cast removed is a black of about 33 grey; the
   upper surfaces read grey there from the sky's sheen, so the plating is a satin black, #2a2a2c, at the
   house black of the other Soviet submarine redos.
   Dimensions: 92.5 m (sub_specs.js; the model's X extent, hub tip to bow); beam 10.6 m; crown 3.4 m over
   the water line. The sub_specs row's sailLen 10.5 / sailH 5.2 do not match the drawing (16.7 m at the
   casing, 3.3 m over it); reported, not edited.
   MEASURED on the model: 92.51 m hub tip to bow; 10.60 m beam; keel 7.04 m under the water line; fin roof
   6.7 m over it; the fin 16.7 m long at the casing; main screw 3.6 m, auxiliary screws 1.2 m.
   13,322 triangles, 7 draw calls, 7 materials, 2 canvas textures.
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a submarine by
   UNIT_MODELS[key].len and draws a "sub" row at a fixed datum under the surface; it reads no named node
   of a submarine, and the row is not turret:true, so nothing is named. Merged per material. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroVictor671 = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 957 / 92.5;                                    /* drawing px per metre */
  var CROWN = 3.4;                                         /* casing crown over the water line */
  function X(px) { return (px - 1.5) / PXM - 46.25; }      /* drawing column -> model x */
  function Z(row) { return CROWN + (121 - row) / PXM; }    /* drawing row -> metres over the water */
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* [drawing column, top row, keel row] off the profile. Under the fins (74-140 px) the top and the keel
     are carried straight from the tail-cone end to where the fins' fillets begin. */
  var STA = [
    [20, 180, 188], [26, 179, 188], [32, 178, 189], [38, 177, 190], [44, 176, 191], [50, 175, 192],
    [56, 174, 193], [62, 173, 194], [68, 172, 194.5], [80, 170, 196], [92, 167.8, 197.7],
    [104, 165.6, 199.5], [116, 163.4, 201.4], [128, 161.2, 203.2], [140, 158.5, 205], [152, 157, 207],
    [164, 155, 208], [176, 153, 210], [188, 151, 212], [200, 149, 214], [212, 147, 216], [224, 145, 217],
    [236, 143, 219], [248, 141, 220], [260, 140, 221], [272, 138, 222], [284, 137, 223], [296, 135, 224],
    [308, 134, 225], [320, 132, 226], [338, 131, 227], [356, 129, 228], [374, 127, 228.5], [392, 126, 229],
    [410, 125, 229], [428, 124, 229], [446, 123, 229], [470, 122, 229], [506, 121, 229], [810, 121, 229],
    [824, 122, 229], [836, 125, 229], [848, 126.5, 229], [872, 127, 229], [884, 128, 228], [896, 130, 226],
    [908, 133, 223], [920, 137, 219], [932, 143, 213], [938, 147, 210], [944, 152, 205], [950, 158, 198],
    [953, 162, 193.5], [956, 171, 185], [957.6, 174.5, 181.5], [958.5, 177.5, 178.5]
  ];
  var BEAM_K = 1.015;                                      /* 10.6 m beam over the drawn 10.45 m depth */
  function pxOf(x) { return (x + 46.25) * PXM + 1.5; }
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
  function hw(x) { return hh(x) * BEAM_K; }
  function sideY(x, z) {
    var h = hh(x), d = (z - zc(x)) / h;
    return hw(x) * Math.sqrt(Math.max(1 - d * d, 0.0004));
  }
  function topZ(x, y) {
    var w = hw(x), d = y / w;
    return zc(x) + hh(x) * Math.sqrt(Math.max(1 - d * d, 0.0004));
  }
  var XS = X(20), XE = X(958.5);

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  var PAINT = "#2a2a2c";
  var _tex = {};

  /* hull skin: u stern -> bow over XS..XE, v round the girth (0 port beam, 0.25 crown, 0.5 starboard
     beam); flipY on upload, so row = (1 - v) H. Painted plating: strakes and frames, plate-to-plate
     variation, the drawing's flush outlines (bow sonar window, the flank hatch) */
  function vOf(x, z, stbd) {
    var t = Math.asin(clamp((z - zc(x)) / hh(x), -1, 1)), v = t / (2 * PI);
    v = stbd ? 0.5 - v : (v < 0 ? v + 1 : v);
    return v;
  }
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R1 = rng(67138), i, j, s, k;
    var L = XE - XS;
    function col(x) { return (x - XS) / L * W; }
    function row(x, z, stbd) { return (1 - vOf(x, z, stbd)) * H; }
    g.fillStyle = PAINT; g.fillRect(0, 0, W, H);
    var NS = 16, sh = H / NS, fw = 4.6 / L * W;             /* strakes ~2.1 m, frames ~4.6 m */
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
    /* streaks of salt and wear along the water line band (b_usn: the side lighter at the wash) */
    for (i = 0; i < 160; i++) {
      var sx = R1() * W, sz = -0.4 + R1() * 1.2, st = R1() < 0.5;
      var xm = XS + sx / W * L;
      if (hh(xm) < 1.0) continue;
      g.fillStyle = "rgba(150,150,150," + (0.03 + R1() * 0.04).toFixed(3) + ")";
      g.fillRect(sx, row(xm, sz, st), 6 + R1() * 26, 1.5);
    }
    g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 1.4;
    for (s = 0; s < 2; s++) {
      /* the bow sonar window: down from the upper bow at 842 px, round under to the keel (drawing) */
      var BW = [[842, 152], [843, 170], [846, 190], [851, 206], [860, 218], [874, 226], [890, 229]];
      g.beginPath();
      for (k = 0; k < BW.length; k++) {
        var bx = X(BW[k][0]), bz = Z(BW[k][1]);
        if (k === 0) g.moveTo(col(bx), row(bx, bz, s)); else g.lineTo(col(bx), row(bx, bz, s));
      }
      g.stroke();
      /* the flank hatch outline, 770-796 px, rows 154-177 (drawing) */
      var hx0 = X(770), hx1 = X(796), hzm = (X(770) + X(796)) / 2;
      var ra = row(hzm, Z(154), s), rb = row(hzm, Z(177), s);
      g.strokeRect(col(hx0), Math.min(ra, rb), col(hx1) - col(hx0), Math.abs(rb - ra));
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex.hull = t;
    return t;
  }
  /* 2 m plating patch for the parts with metre UVs: fin, rudders, planes, pods */
  function plateTex(THREE) {
    if (_tex.plate) return _tex.plate;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d"), R1 = rng(6719), i, j;
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
      skin:   new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.78, metalness: 0.08 }),
      plate:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: plateTex(THREE), roughness: 0.78, metalness: 0.08 }),
      dark:   std(0x0c0d0f, 0.80, 0.20),     /* openings, recesses, hinge lines, windows */
      metal:  std(0x3a3f44, 0.55, 0.45),     /* masts, shafts */
      bronze: std(0x6e5c38, 0.45, 0.70),     /* screws (B-396 museum screw) */
      cap:    std(0x9a6232, 0.60, 0.30),     /* the orange mast cap (drawing) */
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

  /* the hull loft: round rings, fans at both ends; uv = the hull map */
  function hullBody(THREE, xs, segs) {
    var pos = [], uv = [], idx = [], i, j, ring = segs + 1;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = hw(x), h = hh(x), c0 = zc(x);
      for (j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2;
        pos.push(x, w * Math.cos(t), c0 + h * Math.sin(t));
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
    var c0i = pos.length / 3; pos.push(xs[0] - 0.02, 0, zc(xs[0])); uv.push(0, 0.5);
    for (j = 0; j < segs; j++) idx.push(c0i, j + 1, j);
    var c1i = pos.length / 3; pos.push(XE + 0.01, 0, zc(XE)); uv.push(1, 0.5);
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
        /* blunt round nose forward (+x), fine trailing edge aft */
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
  /* a lathe about +x: prof = [[x, r]], closed by the ends' own points */
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
  function hullPatch(THREE, sign, x0, x1, z0, z1, off, nx) {
    return gridGeo(THREE, nx || 3, 1, function (u, v) {
      var xx = x0 + (x1 - x0) * u, zz = z0 + (z1 - z0) * v;
      return [xx, sign * (sideY(xx, zz) + off), zz];
    }, sign > 0);
  }
  function strut(THREE, A, mat, r0, r1, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r1, r0, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }

  /* ---- the fin, read off the elevation: [row, column] of its after and fore outline ---- */
  var SB = Z(121), ST = Z(86.5);                           /* casing crown; the roof, 3.33 m over it */
  var S_AFT = [[86.5, 641], [88, 626], [90, 614], [93, 607], [95, 600], [97, 596], [100, 588], [104, 580],
               [108, 572], [111, 568], [114, 564], [116, 560], [119, 556], [121, 552]];
  var S_FORE = [[86.5, 680], [88, 690], [90, 700], [91, 704], [93, 708], [99, 712.5], [107, 716.5],
                [115, 720.5], [121, 724]];
  function colAt(tb, z) {
    var r = 121 - (z - CROWN) * PXM, i;
    if (r <= tb[0][0]) return tb[0][1];
    for (i = 1; i < tb.length; i++) {
      if (r <= tb[i][0]) {
        var a = tb[i - 1], b = tb[i];
        return a[1] + (b[1] - a[1]) * (r - a[0]) / (b[0] - a[0]);
      }
    }
    return tb[tb.length - 1][1];
  }
  /* half-width over the height: 1.85 m low down, the sides tumbling home to 1.4 m under the rounded
     roof (K-306, estimated) */
  function sailHW(z) { var t = clamp((z - SB) / (ST - SB), 0, 1); return 1.85 - 0.45 * t * t; }
  /* plan form: rounded nose, widest in the fore third, narrowing to the after slope */
  function sailHalf(s, L, w) {
    var Ln = Math.min(w * 1.4, 0.35 * L), v;
    if (s <= 0) return 0;
    if (s < Ln) { v = (Ln - s) / Ln; return w * Math.sqrt(Math.max(0, 1 - v * v)); }
    v = Math.min(1, (s - Ln) / (L - Ln));
    return w * (1 - 0.72 * Math.pow(v, 1.8));
  }
  function sailRing(x0, x1, w, M) {
    var pts = [], L = x1 - x0, k, s;
    for (k = 0; k <= M; k++) { s = L * Math.pow(k / M, 1.5); pts.push([x1 - s, Math.max(0.03, sailHalf(s, L, w))]); }
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

    /* ---- the hull: one loft, tail-cone end to the bow ---- */
    var xs = [];
    for (i = 0; i < STA.length; i++) xs.push(X(STA[i][0]));
    for (px = 160; px < 950; px += 22) xs.push(X(px));
    for (px = 950.5; px < 958.5; px += 1.0) xs.push(X(px));
    xs.sort(function (p, q) { return p - q; });
    var xu = [];
    for (i = 0; i < xs.length; i++) if (!i || xs[i] - xu[xu.length - 1] > 0.5 || (pxOf(xs[i]) > 940 && xs[i] - xu[xu.length - 1] > 0.05)) xu.push(xs[i]);
    A.add("skin", hullBody(THREE, xu, 48), 0, 0, 0);

    /* ---- openings along the upper hull (drawing): slot pairs, small squares and the after dashes ---- */
    var SLOTS = [[369, 140.5, 0.85], [381.5, 140.5, 0.85], [409.5, 140.5, 0.85], [422, 140.5, 0.85],
                 [459, 140.5, 0.85], [472, 140.5, 0.85], [538, 135, 0.85], [551, 135, 0.85],
                 [580.5, 135, 0.85], [593, 135, 0.85], [652.5, 136, 0.9], [666, 136, 0.9]];
    var SQ = [[719.5, 139], [732.5, 139], [744.5, 139], [757, 139], [811.5, 136], [823.5, 136],
              [864.5, 146], [874.5, 146], [884.5, 146], [894, 146]];
    var DASH = [[209.5, 151], [236, 148], [262, 145], [313.5, 143], [326, 143], [339, 143]];
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < SLOTS.length; k++) {
        x = X(SLOTS[k][0]); z = Z(SLOTS[k][1]);
        A.add("dark", hullPatch(THREE, s, x - SLOTS[k][2] / 2, x + SLOTS[k][2] / 2, z - 0.17, z + 0.17, 0.025, 2), 0, 0, 0);
      }
      for (k = 0; k < SQ.length; k++) {
        x = X(SQ[k][0]); z = Z(SQ[k][1]);
        A.add("dark", hullPatch(THREE, s, x - 0.17, x + 0.17, z - 0.14, z + 0.14, 0.025, 1), 0, 0, 0);
      }
      for (k = 0; k < DASH.length; k++) {
        x = X(DASH[k][0]); z = Z(DASH[k][1]);
        A.add("dark", hullPatch(THREE, s, x - 0.18, x + 0.18, z - 0.06, z + 0.06, 0.025, 1), 0, 0, 0);
      }
    }

    /* ---- the lozenge fairing on the bilge, 473-545 px, rows 201-216, with the dark opening in its
            pointed fore end (521-545 px): drawn on the drawing and on the model (not identified by my
            sources; the Akula drawing labels the like fitting a water intake) ---- */
    var fx = X(509), fz = Z(208.5), fdz = fz - zc(fx), fhh = hh(fx), fhw = hw(fx);
    var fyy = sideY(fx, fz), fan = Math.atan2(-fdz / (fhh * fhh), fyy / (fhw * fhw));
    for (s = -1; s <= 1; s += 2) {
      A.add("plate", new THREE.SphereGeometry(1, 18, 8), fx, s * (fyy - 0.12), fz, -s * fan, 0, 0, [3.5, 0.42, 0.74]);
      A.add("dark", new THREE.SphereGeometry(1, 14, 6), X(531), s * (fyy - 0.1), Z(206.5), -s * fan, 0, 0, [1.25, 0.38, 0.42]);
    }

    /* ---- the bow planes, housed: the fairing on the upper hull, 710-765 px, rows 124-131, with the
            dark rounded fore end (drawing; g_model26) ---- */
    var bx0 = X(710), bx1 = X(765), bz0 = Z(131), bz1 = Z(124);
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", hullPatch(THREE, s, bx0 - 0.1, bx1 + 0.1, bz0 - 0.08, bz1 + 0.08, 0.02, 6), 0, 0, 0);
      /* the stowed plane's outer face, standing a hand proud in the housing */
      A.add("plate", hullPatch(THREE, s, bx0 + 0.05, bx1 - 0.75, bz0 + 0.06, bz1 - 0.06, 0.045, 6), 0, 0, 0);
      var bzm = (bz0 + bz1) / 2, bym = sideY(bx1 - 0.4, bzm) + 0.05;
      A.add("dark", new THREE.SphereGeometry(1, 10, 6), bx1 - 0.42, s * bym, bzm, 0, 0, 0, [0.42, 0.08, 0.32]);
    }

    /* ---- the fin: low and long, the long convex after slope, steep rounded fore end, bell section
            flaring into the hull, rounded shoulders under the roof ---- */
    var rings = [], f, zn, w, xa, xf, pts, NS = 22;
    var FL = [0, 0.12, 0.28, 0.5, 0.75, 1.0], FH = 1.1, FW = 0.9, FE = 0.6;
    for (k = 0; k < FL.length; k++) {
      f = FL[k]; zn = SB - 0.35 + (FH + 0.35) * f;
      w = sailHW(Math.max(zn, SB)) + FW * (1 - f) * (1 - f);
      xf = X(colAt(S_FORE, Math.max(zn, SB))) + FE * (1 - f) * (1 - f);
      xa = X(colAt(S_AFT, Math.max(zn, SB))) - 2.0 * (1 - f) * (1 - f);
      pts = sailRing(xa, xf, w, NS);
      for (j = 0; j < pts.length; j++) {
        var zs = topZ(pts[j][0], pts[j][1]) - 0.1;
        pts[j].push((1 - f) * zs + f * Math.max(zn, zs));
      }
      rings.push({ z: zn, pts: pts });
    }
    var RT = 0.55, zl = [];
    for (k = 1; k <= 4; k++) zl.push(SB + FH + (ST - RT - SB - FH) * k / 4);
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
      return gridGeo(THREE, 4, 1, function (u, v) {
        var xx = x0 + (x1 - x0) * u, zz = za + (zb - za) * u;
        if (horiz) zz += (v - 0.5) * wdt; else xx += (v - 0.5) * wdt;
        return [xx, s1 * (sailW(xx, zz) + 0.03), zz];
      }, horiz ? s1 > 0 : s1 < 0);
    }
    function finPanel(s1, x0, x1, z0, z1) {
      return gridGeo(THREE, 2, 2, function (u, v) {
        var xx = x0 + (x1 - x0) * u, zz = z0 + (z1 - z0) * v; return [xx, s1 * (sailW(xx, zz) + 0.03), zz];
      }, s1 > 0);
    }
    for (s = -1; s <= 1; s += 2) {
      /* the seam round the fin's lower band (row 117, 585-722 px) and the panel lines (603 px; the fore
         panel 672-722 px, rows 98-117) */
      A.add("dark", finStrip(s, X(588), X(718), Z(117), Z(117), 0.07), 0, 0, 0);
      A.add("dark", finStrip(s, X(603), X(603), Z(116.5), Z(94), 0.07), 0, 0, 0);
      A.add("dark", finStrip(s, X(672), X(672), Z(116.5), Z(98), 0.07), 0, 0, 0);
      A.add("dark", finStrip(s, X(672), X(706), Z(98), Z(98), 0.07), 0, 0, 0);
      /* the two small windows at the fore top (drawing 633-647 px, row 95; K-306) */
      A.add("dark", finPanel(s, X(633), X(639), Z(97), Z(93.5)), 0, 0, 0);
      A.add("dark", finPanel(s, X(641), X(647), Z(97), Z(93.5)), 0, 0, 0);
      /* the grille, 664-671 px, rows 106-119 */
      for (k = 0; k < 4; k++) A.add("dark", finStrip(s, X(664), X(671), Z(107 + k * 3.3), Z(107 + k * 3.3), 0.11), 0, 0, 0);
    }
    /* the bridge well at the fore end of the roof, and the hatch */
    A.add("dark", gridGeo(THREE, 1, 1, function (u, v) { return [X(662) + (X(679) - X(662)) * u, -0.7 + 1.4 * v, ST + 0.025]; }, false), 0, 0, 0);
    A.add("dark", new THREE.CircleGeometry(0.38, 12), X(648), 0.6, ST + 0.03);

    /* ---- masts, off the drawing (c_dive84 shows three of them raised: 658, 638 and 609 px) ---- */
    var R = function (row) { return Z(row); };
    /* the dark fairing block at the after end of the roof, and the thick mast's collar */
    A.add("dark", new THREE.BoxGeometry(X(632) - X(608), 1.1, Z(85) - Z(90.5)), (X(608) + X(632)) / 2, 0, (Z(85) + Z(90.5)) / 2 - 0.05);
    A.add("metal", new THREE.CylinderGeometry(0.55, 0.6, 0.45, 14), X(640), 0, ST + 0.2, PI / 2, 0, 0);
    /* the raked whip, aft: from the fairing block (610.5 px) up and aft to row 3 at 603 px (drawing;
       c_dive84 shows it raked on the aftmost mast) */
    strut(THREE, A, "metal", 0.08, 0.025, [X(610.5), 0, ST], [X(603), 0, R(3)], 6);
    /* the mast with the cross-piece and the short whip (619 px) */
    strut(THREE, A, "metal", 0.12, 0.11, [X(619), 0.25, ST], [X(619), 0.25, R(45)], 8);
    A.add("metal", new THREE.BoxGeometry(0.12, 0.7, 0.12), X(619), 0.25, R(46));
    strut(THREE, A, "metal", 0.03, 0.02, [X(619), 0.25, R(45)], [X(619), 0.25, R(35)], 4);
    /* the two slim tubes, the first with the forked head (624, 627.5 px) */
    strut(THREE, A, "metal", 0.1, 0.1, [X(624), -0.2, ST], [X(624), -0.2, R(48)], 8);
    strut(THREE, A, "metal", 0.04, 0.04, [X(624), -0.2, R(48)], [X(624) - 0.45, -0.2, R(43)], 4);
    strut(THREE, A, "metal", 0.04, 0.04, [X(624), -0.2, R(48)], [X(624) + 0.45, -0.2, R(43)], 4);
    strut(THREE, A, "metal", 0.1, 0.09, [X(627.5), 0.15, ST], [X(627.5), 0.15, R(50)], 8);
    /* the thick mast: pale head, orange cap, a point on top (639 px) */
    strut(THREE, A, "metal", 0.28, 0.27, [X(639.5), 0, ST], [X(639.5), 0, R(48)], 14);
    A.add("metal", new THREE.CylinderGeometry(0.3, 0.3, Z(42) - Z(48), 14), X(639.5), 0, (Z(42) + Z(48)) / 2, PI / 2, 0, 0);
    A.add("cap", new THREE.CylinderGeometry(0.33, 0.36, Z(31) - Z(42), 14), X(640), 0, (Z(31) + Z(42)) / 2, PI / 2, 0, 0);
    A.add("cap", new THREE.ConeGeometry(0.33, Z(28.5) - Z(31), 12), X(640), 0, (Z(28.5) + Z(31)) / 2, PI / 2, 0, 0);
    /* the short mast forward with its head (658.5 px, to row 45) */
    strut(THREE, A, "metal", 0.14, 0.13, [X(658.5), 0, ST], [X(658.5), 0, R(47)], 10);
    A.add("metal", new THREE.CylinderGeometry(0.17, 0.17, Z(45) - Z(48), 10), X(658.5), 0, (Z(45) + Z(48)) / 2, PI / 2, 0, 0);

    /* ---- the cruciform stern off the drawing ---- */
    var ZA = Z(183.5);                                           /* the shaft line */
    /* upper fin: trailing edge upright at 74 px, roof at row 105, swept leading edge with its fillet */
    var uf = [[166, 74, 141], [160, 74, 137], [154, 74, 128.5], [146, 74, 123.5], [136, 74, 119],
              [126, 74, 114.5], [116, 74, 110.5], [108, 74.3, 106.5], [105.2, 75, 103.5]];
    var stf = [];
    for (i = 0; i < uf.length; i++) stf.push([Z(uf[i][0]), X(uf[i][1]), X(uf[i][2]), i < 2 ? 0.8 : 0.62 - 0.02 * i]);
    A.add("plate", foil(THREE, stf, "z", 0, 14), 0, 0, 0);
    /* lower fin: trailing edge 74 px, foot at row 233, leading edge 104-122 px with its fillet */
    var lf = [[198, 74, 135], [203, 74, 125], [208, 74, 117.5], [216, 74, 114], [226, 74, 110],
              [231, 74.5, 105.5], [233.4, 76, 101]];
    stf = [];
    for (i = 0; i < lf.length; i++) stf.push([Z(lf[i][0]), X(lf[i][1]), X(lf[i][2]), i < 2 ? 0.8 : 0.6 - 0.02 * i]);
    A.add("plate", foil(THREE, stf, "z", 0, 14), 0, 0, 0);
    /* rudder outlines on both fins (97 px; rows 129 and 200) and the small square on the upper fin */
    for (s = -1; s <= 1; s += 2) {
      var yo = s * 0.33;
      A.add("dark", new THREE.BoxGeometry(0.07, 0.04, Z(129) - Z(162)), X(97), yo, (Z(129) + Z(162)) / 2);
      A.add("dark", new THREE.BoxGeometry(X(97) - X(74), 0.04, 0.07), (X(97) + X(74)) / 2, yo, Z(129));
      A.add("dark", new THREE.BoxGeometry(0.07, 0.04, Z(200) - Z(232)), X(97), yo, (Z(200) + Z(232)) / 2);
      A.add("dark", new THREE.BoxGeometry(X(97) - X(74), 0.04, 0.07), (X(97) + X(74)) / 2, yo, Z(200));
      A.add("dark", new THREE.BoxGeometry(0.5, 0.04, 0.5), X(119.5), s * 0.36, Z(153));
    }

    /* stern planes at the shaft line: swept leading edge, straight trailing edge (g_model26), tips 4.7 m
       from the axis (estimated) */
    for (s = -1; s <= 1; s += 2) {
      var spl = [[s * 0.5, X(72), X(134), 0.75], [s * 2.0, X(72), X(127), 0.6], [s * 3.4, X(72.5), X(115), 0.48],
                 [s * 4.4, X(73.5), X(103), 0.36], [s * 4.7, X(75), X(96), 0.22]];
      if (s < 0) spl.reverse();
      A.add("plate", foil(THREE, spl, "y", ZA, 12), 0, 0, 0);
      /* the root fairing on the cone: the drawing's ellipse, 72-132 px, rows 177-190 */
      var lx = X(102);
      A.add("plate", new THREE.SphereGeometry(1, 18, 8), lx, s * (sideY(lx, ZA) - 0.25), ZA, 0, 0, 0, [X(132) - X(102), 0.55, 0.63]);
      /* the auxiliary pod (72-107 px) and its two-blade screw behind it (58 px, 1.2 m) */
      var py = s * 2.9, pxa = X(72), pxf = X(107);
      A.add("plate", lathe(THREE, [[pxa - 0.05, 0.02], [pxa, 0.18], [pxa + 0.5, 0.3], [pxa + 1.6, 0.38],
                                   [pxf - 0.8, 0.38], [pxf - 0.2, 0.25], [pxf, 0.02]], 12), 0, py, ZA);
      A.add("metal", lathe(THREE, [[X(60), 0.06], [pxa, 0.07]], 6), 0, py, ZA);
      A.add("bronze", lathe(THREE, [[X(56.5), 0.02], [X(57.2), 0.1], [X(59.3), 0.12], [X(60), 0.06]], 8), 0, py, ZA);
      for (k = 0; k < 2; k++) {
        var ab = new THREE.SphereGeometry(1, 8, 4);
        ab.scale(0.07, 0.17, 0.62); ab.translate(0, 0, 0.62);
        ab.rotateZ(0.35);
        A.add("bronze", ab, X(58.2), py, ZA, k * PI + 0.4, 0, 0);
      }
    }

    /* ---- the main screw at the tail tip: hub boss, pointed cap, eight broad skewed blades on one short
            hub, roots at two stations (B-396 museum screw); disc 3.6 m (drawing) ---- */
    A.add("bronze", lathe(THREE, [[X(1.5), 0.02], [X(3.5), 0.16], [X(6.5), 0.32], [X(10), 0.42], [X(17), 0.45],
                                  [X(20.5), 0.42], [X(21), 0.02]], 16), 0, 0, ZA);
    var bl = [[-0.22, 0.38], [-0.55, 0.78], [-0.66, 1.25], [-0.5, 1.62], [-0.12, 1.79], [0.22, 1.64],
              [0.36, 1.2], [0.32, 0.72], [0.18, 0.38]];
    var stations = [X(16), X(12.5)];
    for (j = 0; j < 2; j++) {
      for (i = 0; i < 4; i++) {
        var sh = new THREE.Shape(), bi;
        sh.moveTo(bl[0][0], bl[0][1]);
        for (bi = 1; bi < bl.length; bi++) sh.lineTo(bl[bi][0], bl[bi][1]);
        sh.closePath();
        var gb = new THREE.ExtrudeGeometry(sh, { depth: 0.08, bevelEnabled: false });
        gb.translate(0, 0, -0.04);
        gb.rotateY(0.55);
        A.add("bronze", gb, stations[j], 0, ZA, i * PI / 2 + j * PI / 4, 0, 0);
      }
    }

    /* ---- modest team marks on the casing crown, fore and aft ---- */
    function crownPatch(x0, x1) {
      return gridGeo(THREE, 3, 2, function (u, v) {
        var xx = x0 + (x1 - x0) * u, yy = -0.5 + v; return [xx, yy, topZ(xx, yy) + 0.04];
      }, false);
    }
    A.add("team", crownPatch(X(790) - 1.4, X(790) + 1.4), 0, 0, 0);
    A.add("team", crownPatch(X(420) - 1.4, X(420) + 1.4), 0, 0, 0);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true length (sub_specs.js 92.5 m); the model's X extent, hub tip to bow, is the same
   figure: render3d scales a submarine by it. */
UNIT_MODELS["pact_e60_ssn"] = {
  len: 92.5,
  build: function (THREE, M, C) { return HeroVictor671.build(THREE, M, C); }
};
