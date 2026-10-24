/* ============ ru_typhoon.js -- HERO model: Project 941 Akula / Typhoon SSBN, TK-208 (pact_e80_ssbn) ============
   Full-quality redo, 2026-10-24. The largest submarine ever built, TK-208 as completed in 1981 and seen
   in the 1980s (the row's "(TK-208)", service 1981, era e80): the R-39 fit, not the 941UM Dmitry Donskoy
   rebuild of 2002 (no Bulava). Two pressure hulls side by side inside one flattened outer casing.

   References (fetched at width=960, cached in scratchpad/q_typhoon_ref):
     - "Typhoon class SSBN.svg" (a_side.png, port profile, bow right, 959 px = 172.8 m, 5.55 px/m): THE
       source for every vertical station. Read off it: the casing crown flat at row 91 from 300 to 880 px
       and the keel at row 184 (16.8 m deep, the plan's sections agree within 5 %); the after casing top
       falling 92 -> 112 between 280 and 120 px and the keel rising 184 -> 158 between 300 and 88 px; the
       bow rounding over the last 100 px; the central-hull fairing (the hump) from 290 to 522 px, top at
       row 71; the sail 352-505 px, roof at row 41 (25.8 m keel to roof; ru.wikipedia gives 26 m); ten
       missile-lid strips on the crown 545-772 px (pitch 4.15 m, first lid 13.8 m forward of amidships);
       the bow-plane housing 837-887 px at row 112; the upper fin (trailing edge 46 px, top row 62, leading
       edge 92 px at the top sloping to 112 px at row 117) and the lower fin (keel row 187 from 16 to 72 px);
       the row of flood slots at row 126; the mast positions on the roof.
     - "Typhoon class Schema.svg" (b_schema.png, profile, plan and sections A-E, legend on ru.wikipedia):
       the casing parallel-sided to 18 m from the nose and rounded in plan over that; the sections, a
       symmetric flattened superellipse (exponent ~2.6) 23.3 m wide; the twenty R-39 silos (8) in TWO ROWS
       OF TEN between the pressure hulls FORWARD of the sail, centres +-2.4 m, 3.0-3.2 m across in the plan;
       the bow planes (4) "retractable", shown extended; the horizontal stern stabiliser (30) to nearly the
       full beam, the two screws "in ring nozzles" (22) on it at +-6.2 m, the horizontal rudders (23)
       DIRECTLY ABAFT the screws, the upper and lower fins (20) with their rudders (21).
     - US DoD "Akula (Typhoon) class submarine DD-ST-85-06625" (c_dod85.jpg, 1985, port quarter, surfaced)
       and "Soviet Typhoon class submarine" (f_soviet.jpg, the same pass): the broad flat casing, the big
       rounded hump with the sail on it, the sail's rounded after end and flat roof, the masts raised, the
       tall narrow upper fin with the round pod on its head, the two dark triangular recesses and the pale
       longitudinal lines on the after deck, the tile courses.
     - "A stern view of Soviet Typhoon class ... underway" (d_stern.jpg, 1980s, from dead astern): the
       BOW PLANES EXTENDED at sea, the hump's width (about 10.5 m) and the sail's (about 6.4 m), the dark
       recesses at the hump's after flanks, the after deck full width to the stern, one tall mast.
     - "Project 941 - anechoic coatings.jpg" (g_tiles.jpg, crop of the 1985 photograph): rectangular rubber
       tiles in courses, with patches of lost tiles; slots on the hump flanks.
     - ru.wikipedia "Podvodnye lodki proekta 941 Akula": 172.8 x 23.3 m, height 26 m, draught 11.2 m; two
       shafts, seven-blade fixed-pitch screws of 5.55 m "in ring nozzles"; "horizontal rudders placed
       directly behind the screws"; "the forward horizontal rudders are retractable"; the sail fence and
       casing reinforced to break ice of 2-2.5 m; 800 t of rubber coating.

   CORRECTED from the earlier model (ru_typhoon.js of HEAD):
     - Draught 11.2 m (ru.wikipedia), not 12.2 m: the crown now stands 5.6 m over the water line.
     - The bow planes are drawn EXTENDED, as the 1980s stern photograph shows them at sea (the earlier model
       drew only the housed slot).
     - The sail is about 6.4 m wide, not 9.8 m (the stern photograph measures it against the 23.3 m casing).
     - The stern: the horizontal stabiliser carrying the two ring nozzles and the horizontal rudders
       directly abaft the screws (schema 22, 23, 30; ru.wikipedia), not stern planes beside the nozzles.
     - Masts as the 1985 photographs show them raised (four), not the drawing's full suite; the pale
       radome ball is not drawn (no 1980s photograph shows it).
     - The hull is black tiles to the keel. The drawing's red-brown boot is NOT drawn: the 1980s
       photographs are monochrome and show the boat black down to the water; below it is NOT CONFIRMED.

   RECOGNITION (each one shows on the final sheets):
     1. The enormous, flat-topped, very wide casing with its flattened round-cornered section (schema
        sections A-E; photographs c, d).
     2. The big rounded hump of the central hull with the sail on it, set well aft of amidships
        (drawing 290-522 px; photographs c, d, g).
     3. The sail: long, upright walls, rounded after end, flat reinforced roof with a proud roof plate
        (drawing; c, g; ru.wikipedia on the reinforced fence).
     4. Twenty R-39 lids in two rows of ten on the flat crown FORWARD of the sail (schema 8; drawing).
     5. The bow planes extended from the casing sides well forward (d; schema 4).
     6. The tall narrow upper fin with its rudder and the round pod on its head (drawing; c, d, f).
     7. The broad flat stern: stabiliser to near full beam, two ring nozzles with seven-blade screws,
        horizontal rudders right behind them, the lower fin (schema 20-23, 30; ru.wikipedia).
     8. Anechoic tile courses in matte black with patches of lost tiles (g; c).
     9. The after-deck markings: two dark triangular recesses, pale fore-and-aft lines, the dark recesses
        at the hump's after flanks (c, d, f).
    10. Masts raised on the roof as photographed (c, f, d), sail windows and doors (drawing).
    11. The row of flood slots along the side and the bow-plane housing (drawing).

   ESTIMATED, not measured: the bow-plane size (4.2 m root chord, 5 m out from the side: the schema shows
   ~3.9 m, the stern photograph more); the hump's plan rounding; the sail's plan ends; the fin and pod
   thicknesses; the stabiliser's plan outline (schema plan only); the after-deck triangles' size; mast
   diameters and lateral offsets. NOT DRAWN: hull numbers, names, flags, rails, the drawing's pale side
   lines (not on the photographs), the small "ice wing" (schema 16, its shape not readable), the sonar
   windows below the water. The row is not turret:true, so nothing is named "turret"; the lids are flush and
   merged (render3d opens none; combat.js launches an SLBM from the unit's position, not from a hatch).
   MEASURED on the model: 172.72 m overall (rudder trailing edge to bow; published 172.8 m), casing 23.3 m
   wide (published 23.3 m; 30.3 m over the extended bow planes), keel 11.2 m under the water line
   (published draught 11.2 m), sail roof 25.8 m over the keel (published height 26 m); the nozzles as drawn
   (31-51 px, 7.0 m across, screws 5.45 m), horizontal rudders 5.4 m chord abaft them (schema ~5.6 m).
   Paint: monochrome photographs; the tiles drawn at the Borei's measured black (#2c2b2b, a sampled
   (50,45,45) taken to ~0.9), a touch cooler. 14,958 triangles, 8 draw calls, 8 materials, 2 canvas
   textures. Model space +X bow, +Y port, +Z up, metres; water line z = 0;
   hull axis 2.8 m under it. render3d scales a submarine by UNIT_MODELS[key].len, set to the measured X
   extent (rudder trailing edge to bow). Merged per material. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroTyphoon941 = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 5.55;
  function X(px) { return px / PXM - 86.4; }               /* drawing px from the stern -> metres */
  function Z(row) { return (184 - row) / PXM - 11.2; }     /* drawing row -> metres over the water line */

  /* [px, top row, keel row, half-width m, section exponent]: the profile off the drawing, the
     half-width off the plan (schema, scaled to the drawing's length) */
  var STA = [
    [36, 133, 150, 5.0, 2.2], [44, 130, 152, 7.0, 2.3], [56, 126, 155, 9.2, 2.4], [72, 122, 158, 10.6, 2.5],
    [88, 118, 159, 11.3, 2.5], [104, 115, 162, 11.55, 2.6], [120, 112, 167, 11.55, 2.6], [140, 110, 168, 11.65, 2.6],
    [160, 106, 172, 11.65, 2.6], [180, 102, 175, 11.65, 2.6], [200, 98, 178, 11.65, 2.6], [220, 97, 180, 11.65, 2.6],
    [240, 95, 181, 11.65, 2.6], [260, 93, 182, 11.65, 2.6], [280, 92, 183, 11.65, 2.6], [300, 91, 184, 11.65, 2.6],
    [858, 91, 184, 11.65, 2.6], [875, 91.5, 184, 10.9, 2.6], [890, 92.5, 184, 10.2, 2.55], [911, 95.5, 182.5, 8.8, 2.5],
    [921, 98, 180, 7.9, 2.45], [931, 102.5, 175.5, 6.7, 2.4], [942, 110.5, 169, 5.4, 2.3], [947, 114, 166, 4.5, 2.25],
    [952, 119.5, 161.5, 3.4, 2.2], [955, 124, 157, 2.5, 2.2], [957.3, 130, 151, 1.5, 2.2]
  ];
  var XS = X(36), XE = X(958.6);
  function tab(x, k) {
    var px = (x + 86.4) * PXM, i;
    if (px <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) {
      if (px <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (px - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return STA[STA.length - 1][k];
  }
  function topZ(x) { return Z(tab(x, 1)); }
  function keelZ(x) { return Z(tab(x, 2)); }
  function zc(x) { return (topZ(x) + keelZ(x)) / 2; }
  function hh(x) { return (topZ(x) - keelZ(x)) / 2; }
  function hw(x) { return tab(x, 3); }
  function pE(x) { return tab(x, 4); }
  /* casing surface z at lateral y, and the half-breadth at height z */
  function topAt(x, y) {
    var w = hw(x), p = pE(x), u = Math.min(Math.abs(y) / w, 0.9999);
    return zc(x) + hh(x) * Math.pow(1 - Math.pow(u, p), 1 / p);
  }
  function sideY(x, z) {
    var p = pE(x), u = Math.min(Math.abs(z - zc(x)) / hh(x), 0.9999);
    return hw(x) * Math.pow(1 - Math.pow(u, p), 1 / p);
  }
  /* girth fraction (0 port beam, 0.25 crown, 0.5 starboard beam, 0.75 keel) of height z, port side */
  function girthV(x, z) {
    var d = (z - zc(x)) / hh(x), p = pE(x);
    d = Math.max(-0.9999, Math.min(0.9999, d));
    var s = (d < 0 ? -1 : 1) * Math.pow(Math.abs(d), p / 2);
    return Math.asin(s) / (2 * PI);
  }

  /* ---------------------------------------------------------------- textures */
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  var _tex = {};

  /* hull skin: u stern to bow over XS..XE, v round the girth (flipY: row = (1 - v) H). Tile courses,
     patches of lost tiles, the flood-slot row, the pale lines on the after deck */
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 512, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(94108), i, j, s;
    var L = XE - XS;
    g.fillStyle = "#2b2a2b"; g.fillRect(0, 0, W, H);
    var NC = 64, tw = 1.6 / L * W, th = H / NC;
    for (j = 0; j < NC; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < W; i++) {
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.024).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect(i * tw + off + 0.5, j * th + 0.5, tw - 1.0, th - 1.0);
      }
    }
    for (i = 0; i < 110; i++) {                         /* lost / replaced tiles (g_tiles) */
      var bx = R1() * W, by = R1() * H, bw = tw * (1 + Math.floor(R1() * 5)), bh = th * (1 + Math.floor(R1() * 2));
      g.fillStyle = R1() < 0.6 ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.13)";
      g.fillRect(bx, by, bw, bh);
    }
    g.strokeStyle = "rgba(0,0,0,0.32)"; g.lineWidth = 1;
    for (j = 0; j <= NC; j++) { g.beginPath(); g.moveTo(0, j * th); g.lineTo(W, j * th); g.stroke(); }
    for (j = 0; j < NC; j++) {
      var o2 = (j % 2) ? tw * 0.5 : 0;
      for (i = 0; i * tw + o2 < W; i++) {
        g.beginPath(); g.moveTo(i * tw + o2, j * th); g.lineTo(i * tw + o2, (j + 1) * th); g.stroke();
      }
    }
    function col(x) { return (x - XS) / L * W; }
    function rowOf(x, z, stbd) { var v = girthV(x, z); if (stbd) v = 0.5 - v; return (1 - v) * H; }
    /* the flood-slot row (drawing row 126), both sides, gaps as drawn */
    for (s = 0; s < 2; s++) {
      for (var x = X(130); x < X(880); x += 1.15) {
        var px = (x + 86.4) * PXM;
        if ((px > 330 && px < 345) || (px > 520 && px < 540) || (Math.floor(px / 23) % 6) === 5) continue;
        g.fillStyle = "rgba(0,0,0,0.9)";
        g.fillRect(col(x), rowOf(x, Z(126.5), s) - 1.5, 3.2, 3);
      }
    }
    /* the pale fore-and-aft lines on the after deck (photographs c, f, d), +-3.9 m */
    for (s = -1; s <= 1; s += 2) {
      for (i = Math.floor(col(-70)); i < col(-37); i++) {
        var xx = XS + (i + 0.5) / W * L, v = girthV(xx, topAt(xx, 3.9 * s) - 0.01);
        var vy = s > 0 ? v : 0.5 - v;
        g.fillStyle = "rgba(200,200,196,0.55)"; g.fillRect(i, (1 - vy) * H - 0.8, 1, 1.6);
      }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex.hull = t;
    return t;
  }

  /* 2 m tile patch for the parts with metre UVs: the hump, the sail, fins, stabiliser, planes */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d");
    var R1 = rng(9412), i, j;
    g.fillStyle = "#2a292a"; g.fillRect(0, 0, S, S);
    for (j = 0; j < 4; j++) {
      for (i = 0; i < 2; i++) {
        var o = (j % 2) ? 32 : 0;
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.010 + R1() * 0.026).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect((i * 64 + o) % S + 1, j * 32 + 1, 62, 30);
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 1.2;
    for (j = 0; j <= 4; j++) { g.beginPath(); g.moveTo(0, j * 32); g.lineTo(S, j * 32); g.stroke(); }
    for (j = 0; j < 4; j++) {
      var oo = (j % 2) ? 32 : 0;
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * 64 + oo, j * 32); g.lineTo(i * 64 + oo, (j + 1) * 32); g.stroke(); }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.repeat.set(0.5, 0.5);
    t.anisotropy = 4;
    _tex.tile = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.92, metalness: 0.04 }),
      tile:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.92, metalness: 0.04 }),
      dark:  std(0x0c0d0e, 0.80, 0.20),     /* recesses, slots, nozzle bores, lid rims */
      panel: std(0x363536, 0.85, 0.10),     /* missile lids, roof plate, hatch covers */
      metal: std(0x3a4045, 0.55, 0.45),     /* masts, shafts, hubs */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze screws */
      cap:   std(0xa9adb0, 0.70, 0.10),     /* pale mast fittings */
      team:  std(team, 0.86, 0.06)
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

  /* generic lofted body of superellipse rings: secs = [{x, zc, h, w, p, zb?}] (zb: a flat bottom
     clamp), closed by fans at both ends; uv = hull map (u along XS..XE) or metres */
  function loftBody(THREE, secs, segs, metreUV) {
    var pos = [], uv = [], idx = [], i, j, ring = segs + 1;
    for (i = 0; i < secs.length; i++) {
      var S = secs[i], run = 0, px0 = null, pz0 = null;
      for (j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, c = Math.cos(t), sn = Math.sin(t), e = 2 / S.p;
        var y = S.w * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e);
        var z = S.zc + S.h * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e);
        if (S.zb !== undefined && z < S.zb) z = S.zb;
        if (px0 !== null) run += Math.sqrt((y - px0) * (y - px0) + (z - pz0) * (z - pz0));
        px0 = y; pz0 = z;
        pos.push(S.x, y, z);
        if (metreUV) uv.push(S.x, run); else uv.push((S.x - XS) / (XE - XS), j / segs);
      }
    }
    for (i = 0; i < secs.length - 1; i++) {
      for (j = 0; j < segs; j++) {
        var a = i * ring + j, b = a + 1, cc = a + ring, d = cc + 1;
        idx.push(a, b, cc, b, d, cc);
      }
    }
    var L = secs.length - 1, k;
    var c0 = pos.length / 3; pos.push(secs[0].x - (secs[0].tip || 0), 0, secs[0].zc); uv.push(0, 0.5);
    for (j = 0; j < segs; j++) idx.push(c0, j + 1, j);
    var c1 = pos.length / 3; pos.push(secs[L].x + (secs[L].tip || 0), 0, secs[L].zc); uv.push(1, 0.5);
    for (j = 0; j < segs; j++) idx.push(L * ring + j, L * ring + j + 1, c1);
    return outward(geoOf(THREE, pos, uv, idx));
  }

  /* closed stack of horizontal outlines (counter-clockwise from above), metre UVs, top cap */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < L; i++) {
      var run = 0, prev = rings[i].pts[0];
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        run += Math.sqrt((p[0] - prev[0]) * (p[0] - prev[0]) + (p[1] - prev[1]) * (p[1] - prev[1]));
        prev = p;
        pos.push(p[0], p[1], rings[i].z); uv.push(run, rings[i].z);
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

  /* spanwise loft of foil sections: st = [[span, x of mid chord, chord, thickness]]; axis "y" for a
     horizontal surface (thickness along z about c0), "z" for an upright fin (along y about c0); capped */
  function foil(THREE, st, axis, c0, n) {
    var pos = [], uv = [], idx = [], i, j, L = st.length, ring = n + 1;
    for (i = 0; i < L; i++) {
      var sp = st[i][0], xm = st[i][1], ch = st[i][2], th = st[i][3];
      for (j = 0; j <= n; j++) {
        var f = j / n * PI * 2, cf = Math.cos(f);
        var ax = xm + ch / 2 * cf, at = th / 2 * Math.sin(f) * (cf > 0 ? 1 : 0.6 + 0.4 * (1 + cf));
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
      var si = ends[e], ci = pos.length / 3, sx = st[si][1], ss = st[si][0];
      if (axis === "y") pos.push(sx, ss, c0); else pos.push(sx, c0, ss);
      uv.push(sx, ss);
      for (j = 0; j < n; j++) {
        if (e === 0) idx.push(ci, si * ring + j + 1, si * ring + j);
        else idx.push(ci, si * ring + j, si * ring + j + 1);
      }
    }
    return outward(geoOf(THREE, pos, uv, idx));
  }

  /* thin patch on the casing flank: x0..x1, z0..z1, 'off' proud */
  function sidePatch(THREE, sign, x0, x1, z0, z1, off, nx) {
    nx = nx || 4;
    var nz = 2, pos = [], uv = [], idx = [], i, j, x, z;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; z = z0 + (z1 - z0) * j / nz;
        pos.push(x, sign * (sideY(x, z) + off), z); uv.push(x, z);
      }
    }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        if (sign > 0) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    return geoOf(THREE, pos, uv, idx);
  }
  /* a polygon (x, y) draped on the casing crown, 'off' proud, normals up (fan from the centroid) */
  function crownPoly(THREE, pts, off) {
    var pos = [], uv = [], idx = [], k, l, n = pts.length, cx = 0, cy = 0, NL = 2;
    for (k = 0; k < n; k++) { cx += pts[k][0]; cy += pts[k][1]; }
    cx /= n; cy /= n;
    pos.push(cx, cy, topAt(cx, cy) + off); uv.push(cx, cy);
    for (l = 1; l <= NL; l++) {                    /* rings toward the outline, so the patch follows the crown */
      for (k = 0; k < n; k++) {
        var px = cx + (pts[k][0] - cx) * l / NL, py = cy + (pts[k][1] - cy) * l / NL;
        pos.push(px, py, topAt(px, py) + off); uv.push(px, py);
      }
    }
    for (k = 0; k < n; k++) idx.push(0, 1 + k, 1 + (k + 1) % n);
    for (l = 1; l < NL; l++) {
      var r0 = 1 + (l - 1) * n, r1 = 1 + l * n;
      for (k = 0; k < n; k++) {
        var k1 = (k + 1) % n;
        idx.push(r0 + k, r1 + k, r1 + k1, r0 + k, r1 + k1, r0 + k1);
      }
    }
    var g = geoOf(THREE, pos, uv, idx);
    var N = g.attributes.normal.array;
    if (N[2] < 0) { flip(idx); g.setIndex(idx); g.computeVertexNormals(); }
    return g;
  }
  /* a ring between two outlines draped on the crown */
  function crownRing(THREE, outer, inner, off) {
    var pos = [], uv = [], idx = [], k, n = outer.length;
    for (k = 0; k < n; k++) {
      pos.push(outer[k][0], outer[k][1], topAt(outer[k][0], outer[k][1]) + off); uv.push(0, 0);
      pos.push(inner[k][0], inner[k][1], topAt(inner[k][0], inner[k][1]) + off); uv.push(0, 0);
    }
    for (k = 0; k < n; k++) {
      var a = k * 2, b = ((k + 1) % n) * 2;
      idx.push(a, b, a + 1, a + 1, b, b + 1);
    }
    var g = geoOf(THREE, pos, uv, idx);
    var N = g.attributes.normal.array;
    if (N[2] < 0) { flip(idx); g.setIndex(idx); g.computeVertexNormals(); }
    return g;
  }
  /* an open strip between two polylines draped on the crown, normals up */
  function crownStrip(THREE, a, b, off) {
    var pos = [], uv = [], idx = [], k, n = a.length;
    for (k = 0; k < n; k++) {
      pos.push(a[k][0], a[k][1], topAt(a[k][0], a[k][1]) + off); uv.push(0, 0);
      pos.push(b[k][0], b[k][1], topAt(b[k][0], b[k][1]) + off); uv.push(0, 0);
    }
    for (k = 0; k < n - 1; k++) { var i0 = k * 2; idx.push(i0, i0 + 2, i0 + 1, i0 + 1, i0 + 2, i0 + 3); }
    var g = geoOf(THREE, pos, uv, idx);
    var N = g.attributes.normal.array;
    if (N[2] < 0) { flip(idx); g.setIndex(idx); g.computeVertexNormals(); }
    return g;
  }
  function circ(cx, cy, r, n) {
    var pts = [], k;
    for (k = 0; k < n; k++) { var a = k / n * PI * 2; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return pts;
  }
  function strut(THREE, A, mat, r0, r1, a, b, seg) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r1, r0, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q);
  }
  /* a lathe about +x: prof = [[x, r]]; sgn +1 faces out, -1 faces the axis */
  function lathe(THREE, prof, seg, sgn) {
    var pp = [], i;
    for (i = 0; i < prof.length; i++) pp.push(new THREE.Vector2(prof[i][1], prof[i][0]));
    var g = new THREE.LatheGeometry(pp, seg);
    g.rotateZ(-PI / 2);
    g.computeVertexNormals();
    var P = g.attributes.position.array, N = g.attributes.normal.array, dot = 0;
    for (i = 0; i < P.length; i += 3) dot += P[i + 1] * N[i + 1] + P[i + 2] * N[i + 2];
    if ((dot < 0) === (sgn > 0)) {
      var ix = g.getIndex(); flip(ix.array); ix.needsUpdate = true; g.computeVertexNormals();
    }
    return g;
  }

  /* sail plan: rounded after end (radius ra), rounded fore end (radius rf), counter-clockwise */
  function sailPlan(x0, x1, w, ra, rf, n) {
    var pts = [], k, a, q = n / 4;
    for (k = 0; k < q; k++) { a = k / (q - 1) * PI / 2; pts.push([x1 - rf + rf * Math.cos(a), w - rf + rf * Math.sin(a)]); }
    for (k = 0; k < q; k++) { a = PI / 2 + k / (q - 1) * PI / 2; pts.push([x0 + ra + ra * Math.cos(a), w - ra + ra * Math.sin(a)]); }
    for (k = 0; k < q; k++) { a = PI + k / (q - 1) * PI / 2; pts.push([x0 + ra + ra * Math.cos(a), -w + ra + ra * Math.sin(a)]); }
    for (k = 0; k < q; k++) { a = 1.5 * PI + k / (q - 1) * PI / 2; pts.push([x1 - rf + rf * Math.cos(a), -w + rf + rf * Math.sin(a)]); }
    return pts;
  }

  /* the hump (central-hull fairing) off the drawing: top row by px, plan half-width estimated from
     the stern photograph (10.5 m) and rounded at both ends */
  var HUMP = [[290, 91.5, 0.0], [296, 89.5, 2.4], [304, 86.5, 3.5], [314, 83.0, 4.3], [326, 79.0, 4.9],
              [340, 75.0, 5.2], [352, 71.5, 5.3], [400, 71.0, 5.3], [480, 71.0, 5.3], [500, 71.5, 5.25],
              [508, 73.0, 5.1], [514, 76.0, 4.7], [518, 80.5, 3.9], [521, 86.0, 2.6], [523, 91.0, 0.0]];
  var SX0 = X(352), SX1 = X(505), SHW = 3.2, ZT = Z(41), ZH = Z(71);
  function humpW(x) {
    var px = (x + 86.4) * PXM, i;
    if (px <= HUMP[0][0] || px >= HUMP[HUMP.length - 1][0]) return 0;
    for (i = 1; i < HUMP.length; i++) {
      if (px <= HUMP[i][0]) { var a = HUMP[i - 1], b = HUMP[i], t = (px - a[0]) / (b[0] - a[0]); return a[2] + (b[2] - a[2]) * t; }
    }
    return 0;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, s, x, y, z;

    /* ---- the casing: one loft, stern body end to the bow tip ---- */
    var xs = [], px;
    for (i = 0; i < STA.length; i++) xs.push(X(STA[i][0]));
    for (px = 320; px < 858; px += 26) xs.push(X(px));
    xs.sort(function (p, q) { return p - q; });
    var secs = [];
    for (i = 0; i < xs.length; i++) {
      x = xs[i];
      secs.push({ x: x, zc: zc(x), h: hh(x), w: hw(x), p: pE(x) });
    }
    secs[0].tip = 0.0; secs[secs.length - 1].tip = X(958.6) - xs[xs.length - 1];
    A.add("skin", loftBody(THREE, secs, 56, false), 0, 0, 0);

    /* central tail cone abaft the body end (schema 18-23 between the nozzles) */
    A.add("tile", lathe(THREE, [[X(36) + 0.4, 1.35], [X(28), 1.2], [X(18), 0.95], [X(10), 0.65], [X(4), 0.35], [X(1.5), 0.05]], 20, 1),
          0, 0, Z(141.5));

    /* ---- the hump: superellipse sections sunk into the crown ---- */
    var hs = [];
    for (i = 0; i < HUMP.length; i++) {
      x = X(HUMP[i][0]);
      var top = Z(HUMP[i][1]), base = topZ(x) - 1.6, w = Math.max(0.05, HUMP[i][2]);
      hs.push({ x: x, zc: base, h: Math.max(0.05, top - base), w: w, p: 2.4, zb: base - 0.01 });
    }
    A.add("tile", loftBody(THREE, hs, 40, true), 0, 0, 0);
    /* the hump's flank fittings: the seam (drawing row 85), the slots (g_tiles), the oval hatches */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) {
        x = X(372 + k * 34);
        var hz = Z(80);
        A.add("dark", new THREE.BoxGeometry(1.6, 0.08, 0.16), x, s * 5.02, hz, s * 0.55, 0, 0.0);
      }
      A.add("dark", new THREE.BoxGeometry(X(517) - X(335), 0.05, 0.07), (X(335) + X(517)) / 2, s * 5.31, Z(85));
      /* the long outline under the sail on the casing side of the hump (rescue-chamber panel) */
      A.add("dark", new THREE.BoxGeometry(X(489) - X(425), 0.06, 0.08), (X(425) + X(489)) / 2, s * 5.2, Z(90));
      /* the dark recesses at the hump's after flanks (d_stern, c, g) */
      var rp = [], rq = [];
      for (k = 0; k <= 8; k++) {
        var rx = X(298 + k * 6), hwi = humpW(rx);
        rp.push([rx, s * (hwi + 0.15)]); rq.push([rx, s * (hwi + 0.3 + 1.6 * Math.sin(k / 8 * PI))]);
      }
      A.add("dark", crownStrip(THREE, rp, rq, 0.16), 0, 0, 0);
    }

    /* ---- the sail: upright walls, rounded after end, flat roof with the proud ice plate ---- */
    var rings = [], zl = [ZH - 0.8, ZH, ZH + 0.25, ZH + 0.7, ZH + 2.0, ZT - 0.6, ZT - 0.25, ZT - 0.05, ZT];
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      var fil = Math.max(0, 1 - Math.max(0, z - ZH) / 0.7);
      var e2 = Math.max(0, z - (ZT - 0.6)) / 0.6, rd = 0.5 * (1 - Math.sqrt(Math.max(0, 1 - e2 * e2)));
      rings.push({ z: z, pts: sailPlan(SX0 - 0.5 * fil * fil + rd, SX1 + 0.6 * fil * fil - rd,
                                       SHW + 0.45 * fil * fil - rd, SHW + 0.45 * fil * fil - rd - 0.01, 2.4, 64) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);
    /* the reinforced roof plate: a slab proud of the roof, bevelled edge */
    var roofR = [{ z: ZT - 0.02, pts: sailPlan(SX0 + 0.45, SX1 - 0.45, SHW - 0.45, SHW - 0.46, 2.0, 48) },
                 { z: ZT + 0.22, pts: sailPlan(SX0 + 0.6, SX1 - 0.6, SHW - 0.6, SHW - 0.61, 1.85, 48) }];
    A.add("panel", shell(THREE, roofR), 0, 0, 0);
    var ZR = ZT + 0.22;
    /* sail fittings off the drawing: windows at the fore top, doors, hatches */
    for (s = -1; s <= 1; s += 2) {
      var sy = s * (SHW + 0.01);
      A.add("dark", new THREE.BoxGeometry(0.5, 0.05, 1.1), X(366), sy, Z(52));
      A.add("dark", new THREE.BoxGeometry(0.45, 0.05, 0.9), X(414), sy, Z(64));
      A.add("dark", new THREE.BoxGeometry(0.45, 0.05, 0.9), X(424), sy, Z(64));
      A.add("dark", new THREE.BoxGeometry(0.45, 0.05, 0.9), X(474), sy, Z(64));
      A.add("dark", new THREE.BoxGeometry(1.1, 0.04, 3.2), X(358), sy, Z(57));          /* door outline */
      A.add("dark", new THREE.BoxGeometry(2.2, 0.04, 1.3), X(495), sy, Z(61));          /* fore panel */
      for (k = 0; k < 3; k++) A.add("dark", new THREE.BoxGeometry(0.42, 0.05, 0.36), X(491 + k * 4), s * (SHW - 0.05), Z(47));
      A.add("dark", new THREE.BoxGeometry(SX1 - SX0 - 4.0, 0.03, 0.06), (SX0 + SX1) / 2, sy, ZT - 1.2);
    }
    A.add("dark", new THREE.BoxGeometry(1.4, 1.2, 0.05), SX1 - 2.6, 0, ZR + 0.01);        /* bridge hatch */

    /* ---- masts raised as the 1985 photographs show them; x off the drawing ---- */
    var MS = [[X(431), 0.0, 21.6, 0.32, "head"], [X(405), 0.7, 21.0, 0.10, "whip"],
              [X(418), -0.6, 20.4, 0.16, "rod"], [X(486), 0.4, 18.4, 0.14, "rod"]];
    for (k = 0; k < MS.length; k++) {
      var mx = MS[k][0], my = MS[k][1], mt = MS[k][2], mr = MS[k][3], kd = MS[k][4];
      A.add("metal", new THREE.CylinderGeometry(mr * 2.0, mr * 2.2, 0.35, 12), mx, my, ZR + 0.15, PI / 2, 0, 0);
      if (kd === "head") {
        strut(THREE, A, "metal", mr * 1.15, mr, [mx, my, ZR], [mx, my, mt - 1.4], 12);
        A.add("metal", new THREE.CylinderGeometry(0.42, 0.42, 1.1, 12), mx, my, mt - 0.9, PI / 2, 0, 0);
        A.add("cap", new THREE.CylinderGeometry(0.30, 0.38, 0.5, 12), mx, my, mt - 0.15, PI / 2, 0, 0);
        A.add("metal", new THREE.BoxGeometry(0.9, 0.3, 0.3), mx - 0.45, my, mt - 2.2);     /* bracket (c, f) */
      } else if (kd === "rod") {
        strut(THREE, A, "metal", mr * 1.3, mr, [mx, my, ZR], [mx, my, mt - 0.4], 8);
        A.add("metal", new THREE.CylinderGeometry(mr * 1.6, mr * 1.6, 0.5, 8), mx, my, mt - 0.25, PI / 2, 0, 0);
      } else {
        strut(THREE, A, "metal", 0.14, mr * 0.6, [mx, my, ZR], [mx, my, mt], 6);
      }
    }

    /* ---- twenty R-39 lids: two rows of ten forward of the sail, centres +-2.4 m, 4.14 m pitch ---- */
    var LX0 = X(555), LP = (X(762) - X(555)) / 9, LY = 2.4, LR = 1.65;
    for (k = 0; k < 10; k++) {
      x = LX0 + k * LP;
      for (s = -1; s <= 1; s += 2) {
        A.add("dark", crownRing(THREE, circ(x, s * LY, LR + 0.14, 20), circ(x, s * LY, LR, 20), 0.07), 0, 0, 0);
        A.add("panel", crownPoly(THREE, circ(x, s * LY, LR, 20), 0.06), 0, 0, 0);
        /* the hinge fairing outboard of each lid */
        A.add("dark", crownPoly(THREE, [[x - 0.7, s * (LY + LR + 0.1)], [x + 0.7, s * (LY + LR + 0.1)],
                                        [x + 0.7, s * (LY + LR + 0.45)], [x - 0.7, s * (LY + LR + 0.45)]], 0.07), 0, 0, 0);
      }
    }
    /* the lid band's edge seams and the walkway seam between the rows */
    var BX0 = LX0 - 2.4, BX1 = LX0 + 9 * LP + 2.4;
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", crownPoly(THREE, [[BX0, s * 4.9], [BX1, s * 4.9], [BX1, s * 5.02], [BX0, s * 5.02]], 0.04), 0, 0, 0);
    }
    A.add("dark", crownPoly(THREE, [[BX0, -0.06], [BX1, -0.06], [BX1, 0.06], [BX0, 0.06]], 0.04), 0, 0, 0);
    /* deck hatches on the crown off the drawing (the small marks at 640 and 735 px) */
    A.add("dark", crownPoly(THREE, circ(X(728), 0, 0.5, 12), 0.05), 0, 0, 0);
    A.add("dark", crownPoly(THREE, circ(X(905), 0, 0.55, 12), 0.05), 0, 0, 0);

    /* ---- bow planes EXTENDED (d_stern; schema 4), with the housing outline on the side ---- */
    var BPX = X(870), BPZ = Z(112), BR = sideY(BPX, BPZ);
    for (s = -1; s <= 1; s += 2) {
      var bp = [[s * (BR - 0.4), BPX, 4.2, 0.55], [s * (BR + 2.5), BPX - 0.25, 3.7, 0.45], [s * (BR + 5.0), BPX - 0.5, 3.0, 0.32]];
      if (s < 0) bp.reverse();
      A.add("tile", foil(THREE, bp, "y", BPZ, 12), 0, 0, 0);
      A.add("dark", sidePatch(THREE, s, X(845), X(893), BPZ - 0.75, BPZ - 0.6, 0.04, 6), 0, 0, 0);
      A.add("dark", sidePatch(THREE, s, X(845), X(893), BPZ + 0.6, BPZ + 0.75, 0.04, 6), 0, 0, 0);
    }

    /* ---- the after deck: the dark triangular recesses and the small hatches (c, f, d) ---- */
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", crownPoly(THREE, [[X(150), s * 2.8], [X(150), s * 6.6], [X(178), s * 4.6]], 0.08), 0, 0, 0);
      A.add("dark", crownPoly(THREE, [[X(126) - 0.4, s * 8.6], [X(126) + 0.4, s * 8.6], [X(126) + 0.4, s * 9.4], [X(126) - 0.4, s * 9.4]], 0.04), 0, 0, 0);
    }

    /* ---- the stern off the drawing and the schema ---- */
    var ZA = Z(141.5);                                          /* the shaft line, -3.45 m */
    /* upper fin: trailing edge upright at 46 px, top row 62, leading edge 92 px at the top -> 112 px at row 117 */
    var uf = [[topZ(X(60)) - 0.6, X(46), X(112) + 1.2, 1.5], [Z(117), X(46), X(112), 1.45], [Z(100), X(46), X(105), 1.35],
              [Z(85), X(46), X(99), 1.25], [Z(70), X(46.5), X(93.5), 1.15], [Z(63.5), X(47.5), X(92), 1.0], [Z(62), X(49), X(90), 0.6]];
    var st = [];
    for (i = 0; i < uf.length; i++) st.push([uf[i][0], (uf[i][1] + uf[i][2]) / 2, uf[i][2] - uf[i][1], uf[i][3]]);
    A.add("tile", foil(THREE, st, "z", 0, 14), 0, 0, 0);
    /* the rudder's hinge line (drawing 75 px) and the head pod (c, d, f) */
    for (s = -1; s <= 1; s += 2) A.add("dark", new THREE.BoxGeometry(0.08, 0.04, Z(64) - Z(118)), X(75), s * 0.7, (Z(64) + Z(118)) / 2);
    A.add("tile", lathe(THREE, [[X(42), 0.05], [X(43.5), 0.45], [X(47), 0.78], [X(60), 0.85], [X(84), 0.85], [X(90), 0.7], [X(93), 0.05]], 16, 1),
          0, 0, Z(62) + 0.25);
    /* lower fin: keel row 187 from 16 to 72 px, leading edge rising to the body at 84 px */
    var lf = [[keelZ(X(70)) + 0.6, X(16), X(86), 1.2], [Z(170), X(16), X(80), 1.2], [Z(180), X(16), X(74), 1.15],
              [Z(185), X(16), X(72), 1.0], [Z(187), X(17.5), X(70), 0.5]];
    st = [];
    for (i = 0; i < lf.length; i++) st.push([lf[i][0], (lf[i][1] + lf[i][2]) / 2, lf[i][2] - lf[i][1], lf[i][3]]);
    A.add("tile", foil(THREE, st, "z", 0, 14), 0, 0, 0);
    /* the stabiliser (schema 30): a broad flat surface on the shaft line to near full beam */
    for (s = -1; s <= 1; s += 2) {
      /* trailing edge at the nozzles' leading edge (51 px), so nothing crosses the screw disc */
      var sb = [[s * 3.0, (X(52) + X(112)) / 2, X(112) - X(52), 1.5], [s * 6.0, (X(52) + X(100)) / 2, X(100) - X(52), 1.3],
                [s * 9.5, (X(52) + X(86)) / 2, X(86) - X(52), 1.0], [s * 11.3, (X(55) + X(74)) / 2, X(74) - X(55), 0.6]];
      if (s < 0) sb.reverse();
      A.add("tile", foil(THREE, sb, "y", ZA, 14), 0, 0, 0);
    }
    /* ring nozzles with seven-blade screws (ru.wikipedia: 5.55 m), horizontal rudders right abaft them */
    var NY = 6.2, NX0 = X(31), NX1 = X(51);            /* the nozzle as drawn: 31-51 px, top row 122 */
    var blade = [[-0.15, 0.5], [-0.6, 1.1], [-0.65, 1.9], [-0.35, 2.6], [0.1, 2.72], [0.45, 2.3], [0.5, 1.4], [0.22, 0.65]];
    for (s = -1; s <= 1; s += 2) {
      var ny = s * NY;
      A.add("tile", lathe(THREE, [[NX0, 3.2], [NX0 + 0.6, 3.42], [NX0 + 2.2, 3.5], [NX1 - 0.3, 3.45], [NX1, 3.28]], 32, 1), 0, ny, ZA);
      A.add("dark", lathe(THREE, [[NX0, 3.12], [NX0 + 1.5, 2.86], [NX1, 3.2]], 32, -1), 0, ny, ZA);
      A.add("tile", new THREE.TorusGeometry(3.16, 0.06, 4, 32), NX0, ny, ZA, 0, PI / 2, 0);
      A.add("tile", new THREE.TorusGeometry(3.24, 0.08, 4, 32), NX1, ny, ZA, 0, PI / 2, 0);
      /* shaft fairing and hub */
      A.add("metal", lathe(THREE, [[NX1 + 4.0, 0.0], [NX1 + 2.0, 0.9], [NX1, 1.0], [NX0 + 1.4, 0.75], [NX0 + 0.6, 0.35], [NX0 + 0.2, 0.05]], 14, 1), 0, ny, ZA);
      var hubX = NX0 + 1.9;
      for (i = 0; i < 7; i++) {
        var sh = new THREE.Shape(), bi;
        sh.moveTo(blade[0][0], blade[0][1]);
        for (bi = 1; bi < blade.length; bi++) sh.lineTo(blade[bi][0], blade[bi][1]);
        sh.closePath();
        var gb = new THREE.ExtrudeGeometry(sh, { depth: 0.08, bevelEnabled: false });
        gb.translate(0, 0, -0.04);
        gb.rotateY(0.55);
        A.add("screw", gb, hubX, ny, ZA, i * 2 * PI / 7 + (s > 0 ? 0 : 0.2), 0, 0);
      }
      /* horizontal rudder abaft the nozzle, across its disc (schema 23) */
      var hr = [[ny - s * 3.0, (NX0 + 0.1 + X(0)) / 2, NX0 + 0.1 - X(0), 0.55], [ny, (NX0 + 0.1 + X(0)) / 2, NX0 + 0.1 - X(0), 0.6],
                [ny + s * 3.0, (NX0 + 0.1 + X(1.5)) / 2, NX0 + 0.1 - X(1.5), 0.5]];
      if (s < 0) hr.reverse();
      A.add("tile", foil(THREE, hr, "y", ZA, 12), 0, 0, 0);
    }

    /* ---- modest team patches: casing fore of the lids, the after deck, the sail roof ---- */
    A.add("team", crownPoly(THREE, [[X(800), -0.9], [X(812), -0.9], [X(812), 0.9], [X(800), 0.9]], 0.05), 0, 0, 0);
    A.add("team", crownPoly(THREE, [[X(230), -0.9], [X(242), -0.9], [X(242), 0.9], [X(230), 0.9]], 0.05), 0, 0, 0);
    A.add("team", new THREE.BoxGeometry(1.6, 1.6, 0.04), SX0 + 4.0, 0, ZR + 0.01);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent (rudder trailing edge to bow): render3d scales a submarine by it. */
UNIT_MODELS["pact_e80_ssbn"] = {
  len: 172.72,
  build: function (THREE, M, C) { return HeroTyphoon941.build(THREE, M, C); }
};
