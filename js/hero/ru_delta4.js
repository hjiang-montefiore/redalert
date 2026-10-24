/* ============ ru_delta4.js -- HERO model: Project 667BDRM Delfin / Delta IV SSBN, K-51 (pact_e90_ssbn) ============
   Full-quality redo, 2026-10-24. The row's boat, K-51 Verkhoturye (lead ship, commissioned 1984), as she
   went to sea in the 1990s: sixteen R-29RM tubes in the tall missile casing (the "hump") abaft the sail,
   the planes on the sail, two shafts, the towed-array pod on the head of the upper fin. No Sineva-era
   refit is drawn (nothing on the outside that the sources show).

   References (Wikimedia Commons, fetched at width=960, cached in scratchpad/q_delta4_ref):
     - "Delta IV class SSBN variant.svg" (a_var.png, starboard profile, bow right, 959 px = 167.4 m,
       5.729 px/m; ru.wikipedia: "the appearance of the FIRST HULLS", filed under K-51, K-84 and K-114):
       THE source for every station. Read off it: the white water-line mark at row 92 (z = 0); the casing
       top at row 75 and the keel at row 143 over the parallel body (11.9 m, published beam 11.7 m; keel
       8.9 m under the mark, published draught 8.8 m); the bow rounding from 900 px; the tail cone from
       210 px to the tip at 12 px; the hump rising from 300 px in a straight ramp to its flat crown at row
       54 (6.6 m over the water) from 508 to 676 px, and its fore end falling beside the sail to the deck
       at 767 px; the sail 678-781 px, roof at row 40 (9.1 m over the water); the planes edge-on at row 60,
       748-765 px; the masts (ESM pod 688 px, snorkel 693 px, whip 697 px, frame aerial 703 px); the window
       at 746 px; the upper fin (trailing edge 43 px, the towed-array pod along its head at row 72 from 43
       to 78 px, the short rod on it at 63 px, the rudder hinge line at 60 px, the leading-edge fillet
       falling to the hull at 116 px); the lower fin (trailing edge 38 px, foot at row 144 to 66 px); the
       stern plane's root edge-on at row 109.5, 64-102 px; the screw disc at the tail tip, 3.8 m, axis row
       112; the long flood slot at row 89 (445-760 px), the first hulls' grille group at 310-360 px and the
       rows of small holes along the after and fore deck edges.
     - "Delta IV class SSBN.svg" (a_side.png, the later hulls): compared, the same hull; its slot runs
       further aft and it lacks the grille group, so the variant drawing is used for K-51.
     - "Projekt667BDRM-Sensor-DE.svg" (b_sensor.png, sail cutaway with the masts named): the sail with
       upright walls, a rounded fore end and windows round the fore top; the hump wider than the sail with
       its rounded fore end against the sail flanks; the planes at about half height; the mast suite
       (ESM "Brick Pulp" pod, snorkel, VHF/UHF whip, "Parklamp" frame, periscopes, "Pert Spring" cone).
     - "Submarine Delta IV class.jpg" (c_1994.jpg, US DoD, 1 Jan 1994, aerial off the starboard bow,
       surfaced, supposedly K-18): THE 1990s photograph. The tall flat-sided hump with rounded shoulders
       and a rounded fore end, WIDER than the sail; tile courses on its flanks; the sail's semicircular
       fore end and flat roof; the long thin planes at about half height, rounded tips; the dark window on
       the sail flank; the ESM mast, the snorkel and a whip raised aft on the roof; the upper fin with the
       round pod on its head and the short rod on the pod; the rows of dark holes on the after deck; black
       to the water.
     - "Russian submarine Tula (K-114).jpg" (e_tula12.jpg, mil.ru 2012, alongside, port quarter): the
       hump's long ramp, the sail, the masts; paint sampled here and on the dock photographs.
     - "K-51 Verkhoturye is preparing to sea trials in 2012.jpg" (f_k51.jpg): the sail head-on, two
       windows at its fore top, the planes at about half height.
     - "K-114 Tula at Zvyozdochka in 2017" 1-4 (d_dock*.jpg): the bow and the hull out of the water in the
       building hall: the round bluff bow, the circular hull with a flattish casing top, BLACK TO THE KEEL.
     - ru.wikipedia "Podvodnye lodki proekta 667BDRM Delfin": two-shaft plant ("dvukhvintovaya"), NEW
       FIVE-BLADE screws, the horizontal rudders on the sail, the missile tubes in a casing standing proud
       of the hull, the casing taller than on the 667BDR; the surface covered in acoustic coating.

   CORRECTED from the earlier model (ru_delta4.js of HEAD):
     - The screws are FIVE-bladed (ru.wikipedia), not four.
     - The hull is black tiles to the keel, not red-brown below the water: the 2017 dock photographs of
       K-114 show black to the keel, the 1994 photograph black to the water. The drawing's red boot is
       NOT drawn. (A Delta III, K-433, was photographed in dock with a red under-body; no photograph of a
       Delta IV's under-body in the 1990s was found, so the 1990s under-body colour is NOT CONFIRMED.)
     - The sail is narrower (4.0 m, not 6.8 m) and the hump far wider (10.9 m, not 8.6 m): measured on the
       1994, 2012 and 2017 photographs against the drawing's heights. The hump's fore end is rounded and
       falls beside the sail as the cutaway and the 1994 photograph show it.
     - The masts are the ones the 1994 photograph shows raised (ESM pod, snorkel, whip, a low frame), not
       the drawing's full suite.
     - The sixteen lids are round, in two rows of eight on the flat crown (the earlier model drew square
       panels); the stern planes have a swept plan and sit at the shaft line.

   RECOGNITION (each one shows on the final sheets):
     1. The long cylindrical black hull with a flattish casing top and the round bluff bow (drawing;
        dock photographs; c_1994).
     2. The tall flat-sided missile hump abaft the sail, its walls nearly flush with the hull sides: long
        straight after ramp, flat crown, rounded shoulders, rounded fore end beside the sail (drawing;
        cutaway; c_1994; d_dock4).
     3. Sixteen R-29RM lids in two rows of eight on the crown (drawing 507-677 px; ru.wikipedia).
     4. The sail well forward: upright walls, semicircular fore end, flat roof, windows round the fore
        top, the dark window on the flank (drawing; cutaway; c_1994; f_k51).
     5. The long thin sail planes at about half height (drawing; c_1994; f_k51).
     6. Masts raised aft on the roof as the 1994 photograph shows them (drawing positions).
     7. The tall upper fin with the towed-array pod along its head and the rod on the pod, its long
        leading-edge fillet (drawing; c_1994).
     8. The lower fin and the swept stern planes at the shaft line (drawing).
     9. Two five-blade screws at the tail tip (drawing's disc; ru.wikipedia).
    10. Matte black anechoic tile courses on hull, hump and sail (c_1994; ru.wikipedia).
    11. The flood slot, the grille group and the rows of holes along the decks (drawing; c_1994).

   ESTIMATED, not measured (no plan view found): the sail's width (4.0 m) and the sail-plane span (5.0 m
   out from the sail side), both from the sail's height and the planes' level as scales on the 1994, 2012
   and 2017 photographs (3.0-4.4 m and 4.5-5.8 m); the hump's width (10.9 m, its walls nearly flush with the
   hull sides, as c_1994 and the 2017 dock photograph show it) and its plan rounding; the stern-plane span
   (6.3 m from the axis) and sweep; the screws' lateral spacing (+-2.05 m, the drawing shows one disc
   edge-on) and the bossings and web that carry the shafts (no stern photograph of a Delta IV found); the lids' plan shape and
   their offset (+-2.1 m, 2.5 m across); the fin thicknesses; the masts' lateral offsets.
   NOT DRAWN: hull numbers, names, flags, rails, the bridge screen and people (c_1994), the white water-line
   mark and draught marks (lettering; the mark sits at z = 0 under the game's water anyway), sonar windows
   and hatches below the water.
   MEASURED on the model: 167.0 m overall, screw boss to bow (published 167.4 m, the drawing scaled to it);
   hull 11.7 m across (published beam 11.7 m), 14.0 m over the sail planes; keel 8.9 m under the water line
   (published draught 8.8 m), lower fin foot 9.1 m; hump crown 6.6 m and sail roof 9.1 m over the water; screw discs 3.8 m.
   12,488 triangles, 8 draw calls, 8 materials, 2 canvas textures. Paint: the 2017 dock
   photograph samples (83,82,82) on the flank under snow-bright exposure, the 2012 alongside one (12,16,21)
   in shade; drawn at the house black of the Borei and Typhoon redos (#2b2a2c tile base, a touch cooler).
   The row is not turret:true, so nothing is named "turret"; the lids are flush and merged (render3d opens
   none; combat.js launches an SLBM from the unit's position, not from a hatch). Model space +X bow, +Y port,
   +Z up, metres; water line z = 0; hull axis 3.0 m under it. render3d scales a submarine by
   UNIT_MODELS[key].len, set to the measured X extent. Merged per material. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroDelta4_667BDRM = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 959 / 167.4;
  function X(px) { return (px - 1) / PXM - 83.7; }        /* drawing px from the stern -> metres */
  function Z(row) { return (92 - row) / PXM; }             /* drawing row -> metres over the water line */

  /* [px, top row, keel row, top exponent] off the profile; the section is round below the axis and a
     touch flattened above it (the casing top, dock photographs). Under the fins (38-130 px) the top is
     the mirror of the visible keel line about the axis. */
  var STA = [
    [12, 110.0, 115.0, 2.0], [20, 109.0, 116.0, 2.0], [30, 107.0, 117.4, 2.0], [38, 106.0, 118.5, 2.0],
    [50, 103.0, 120.8, 2.0], [62, 100.0, 123.0, 2.0], [78, 94.0, 127.0, 2.05], [90, 91.5, 130.0, 2.05],
    [100, 89.0, 132.0, 2.1], [110, 87.0, 134.0, 2.1], [120, 85.5, 136.0, 2.1], [130, 84.0, 137.0, 2.15],
    [150, 80.5, 139.5, 2.2], [165, 79.0, 141.5, 2.2], [180, 77.5, 142.6, 2.25], [195, 76.8, 143.0, 2.25],
    [210, 76.0, 143.0, 2.3], [300, 75.6, 143.0, 2.3], [880, 75.0, 143.0, 2.3], [900, 75.0, 143.0, 2.3],
    [912, 76.6, 143.0, 2.3], [920, 77.8, 142.3, 2.25], [930, 80.0, 140.4, 2.2], [936, 82.0, 139.0, 2.2],
    [942, 84.6, 136.3, 2.15], [946, 86.8, 134.0, 2.1], [950, 89.6, 131.0, 2.1], [954, 94.5, 126.0, 2.0],
    [956, 97.8, 122.4, 2.0], [957.6, 101.0, 119.0, 2.0], [958.6, 104.5, 115.5, 2.0]
  ];
  var XS = X(12), XE = X(958.6);
  function tab(x, k) {
    var px = (x + 83.7) * PXM + 1, i;
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
  function hw(x) { return Math.min(hh(x), 5.85); }        /* beam 11.7 m (published) */
  function pT(x) { return tab(x, 3); }
  /* hull half-breadth at height z, and the deck height at lateral y */
  function sideY(x, z) {
    var d = (z - zc(x)) / hh(x), p = d > 0 ? pT(x) : 2.0, u = Math.min(Math.abs(d), 0.9999);
    return hw(x) * Math.pow(1 - Math.pow(u, p), 1 / p);
  }
  function deckAt(x, y) {
    var p = pT(x), u = Math.min(Math.abs(y) / hw(x), 0.9999);
    return zc(x) + hh(x) * Math.pow(1 - Math.pow(u, p), 1 / p);
  }
  /* girth fraction (0 port beam, 0.25 crown, 0.5 starboard beam, 0.75 keel) of height z */
  function girthV(x, z, stbd) {
    var d = (z - zc(x)) / hh(x), p = d > 0 ? pT(x) : 2.0;
    d = Math.max(-0.9999, Math.min(0.9999, d));
    var s = (d < 0 ? -1 : 1) * Math.pow(Math.abs(d), p / 2), v = Math.asin(s) / (2 * PI);
    return stbd ? 0.5 - v : (v < 0 ? v + 1 : v);
  }

  /* ---------------------------------------------------------------- textures */
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  var _tex = {};

  /* hull skin: u stern to bow over XS..XE, v round the girth (flipY: row = (1 - v) H). Tile courses,
     patches of replaced tiles, and the drawing's holes and slots along the decks */
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(66751), i, j, s, x;
    var L = XE - XS;
    g.fillStyle = "#2b2a2c"; g.fillRect(0, 0, W, H);
    var NC = 48, tw = 1.6 / L * W, th = H / NC;
    for (j = 0; j < NC; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < W; i++) {
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.024).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect(i * tw + off + 0.4, j * th + 0.4, tw - 0.8, th - 0.8);
      }
    }
    for (i = 0; i < 90; i++) {                          /* replaced tiles, as on c_1994's after deck */
      var bx = R1() * W, by = R1() * H, bw = tw * (1 + Math.floor(R1() * 4)), bh = th * (1 + Math.floor(R1() * 2));
      g.fillStyle = R1() < 0.6 ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.12)";
      g.fillRect(bx, by, bw, bh);
    }
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 0.8;
    for (j = 0; j <= NC; j++) { g.beginPath(); g.moveTo(0, j * th); g.lineTo(W, j * th); g.stroke(); }
    for (j = 0; j < NC; j++) {
      var o2 = (j % 2) ? tw * 0.5 : 0;
      for (i = 0; i * tw + o2 < W; i++) {
        g.beginPath(); g.moveTo(i * tw + o2, j * th); g.lineTo(i * tw + o2, (j + 1) * th); g.stroke();
      }
    }
    function col(xx) { return (xx - XS) / L * W; }
    function rowOf(xx, z, stbd) { return (1 - girthV(xx, z, stbd)) * H; }
    g.fillStyle = "rgba(0,0,0,0.92)";
    for (s = 0; s < 2; s++) {
      /* rows of small holes along the after deck edge (drawing row 80, 180-295 px; c_1994) */
      for (x = X(180); x < X(296); x += 1.25) g.fillRect(col(x), rowOf(x, Z(80), s) - 1, 2.2, 2);
      /* the first hulls' grille group on the ramp (drawing 310-360 px, two rows) */
      for (x = X(310); x < X(360); x += 0.62) {
        g.fillRect(col(x), rowOf(x, Z(88), s) - 0.8, 1.6, 1.6);
        g.fillRect(col(x), rowOf(x, Z(90), s) - 0.8, 1.6, 1.6);
      }
      /* holes along the fore deck edge forward of the sail (drawing row 80, 783-830 px) */
      for (x = X(783); x < X(830); x += 1.3) if ((Math.floor((x - X(783)) / 1.3) % 4) !== 3) g.fillRect(col(x), rowOf(x, Z(80), s) - 1, 2.2, 2);
      /* small holes along the bow (drawing row 86, 860-905 px) */
      for (x = X(860); x < X(905); x += 2.0) g.fillRect(col(x), rowOf(x, Z(86), s) - 1, 1.8, 2);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex.hull = t;
    return t;
  }

  /* 2 m tile patch for the parts with metre UVs: hump, sail, fins, planes */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d");
    var R1 = rng(6672), i, j;
    g.fillStyle = "#2a292b"; g.fillRect(0, 0, S, S);
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
      dark:  std(0x0c0d0e, 0.80, 0.20),     /* slots, windows, recesses, lid rims */
      panel: std(0x353436, 0.85, 0.10),     /* missile lids, hatch covers */
      metal: std(0x3a4045, 0.55, 0.45),     /* masts, shafts, hubs */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze screws */
      cap:   std(0xa9adb0, 0.70, 0.10),     /* pale mast heads (drawing, cutaway) */
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

  /* the pressure-hull loft: superellipse rings (flattened above the axis), fans at both ends;
     uv = the hull map (u along XS..XE, v = girth parameter) */
  function hullBody(THREE, xs, segs) {
    var pos = [], uv = [], idx = [], i, j, ring = segs + 1;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = hw(x), h = hh(x), c0 = zc(x), pt = pT(x);
      for (j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, c = Math.cos(t), sn = Math.sin(t), e = 2 / (sn > 0 ? pt : 2.0);
        pos.push(x, w * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e), c0 + h * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e));
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
    var c0i = pos.length / 3; pos.push(xs[0] - 0.15, 0, zc(xs[0])); uv.push(0, 0.5);
    for (j = 0; j < segs; j++) idx.push(c0i, j + 1, j);
    var c1i = pos.length / 3; pos.push(XE + 0.06, 0, zc(XE)); uv.push(1, 0.5);
    for (j = 0; j < segs; j++) idx.push(L * ring + j, L * ring + j + 1, c1i);
    return outward(geoOf(THREE, pos, uv, idx));
  }

  /* loft of (y, z) outlines of equal count at increasing x, capped by fans, metre UVs */
  function ringLoft(THREE, st) {
    var N = st[0].pts.length, L = st.length, ring = N + 1, pos = [], uv = [], idx = [], i, j, k;
    for (i = 0; i < L; i++) {
      var run = 0, pv = st[i].pts[0];
      for (j = 0; j <= N; j++) {
        var p = st[i].pts[j % N];
        run += Math.sqrt((p[0] - pv[0]) * (p[0] - pv[0]) + (p[1] - pv[1]) * (p[1] - pv[1])); pv = p;
        pos.push(st[i].x, p[0], p[1]); uv.push(st[i].x, run);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var ends = [0, L - 1], e;
    for (e = 0; e < 2; e++) {
      var lv = ends[e], base = pos.length / 3, cy = 0, cz = 0;
      for (k = 0; k < N; k++) { cy += st[lv].pts[k][0]; cz += st[lv].pts[k][1]; }
      pos.push(st[lv].x, cy / N, cz / N); uv.push(cy / N, cz / N);
      for (k = 0; k < N; k++) {
        if (e === 0) idx.push(base, lv * ring + k + 1, lv * ring + k);
        else idx.push(base, lv * ring + k, lv * ring + k + 1);
      }
    }
    return outward(geoOf(THREE, pos, uv, idx));
  }
  /* hump section: flat walls, flat crown, rounded shoulders (radius rs), foot at zb; counter-clockwise */
  function humpRing(w, zb, zt, rs, n) {
    var pts = [], k, a;
    rs = Math.max(0.02, Math.min(rs, w * 0.95, (zt - zb) * 0.95));
    pts.push([w, zb]);
    for (k = 0; k <= n; k++) { a = k / n * PI / 2; pts.push([w - rs + rs * Math.cos(a), zt - rs + rs * Math.sin(a)]); }
    for (k = 0; k <= n; k++) { a = PI / 2 + k / n * PI / 2; pts.push([-w + rs + rs * Math.cos(a), zt - rs + rs * Math.sin(a)]); }
    pts.push([-w, zb]);
    pts.push([0, zb - 0.01]);
    return pts;
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

  /* thin patch on the hull flank: x0..x1, z0..z1, 'off' proud */
  function sidePatch(THREE, sign, x0, x1, z0, z1, off, nx) {
    nx = nx || 4;
    var nz = 1, pos = [], uv = [], idx = [], i, j, x, z;
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
  /* a polygon (x, y) draped on the hull deck, 'off' proud, normals up */
  function deckPoly(THREE, pts, off) {
    var pos = [], uv = [], idx = [], k, n = pts.length, cx = 0, cy = 0;
    for (k = 0; k < n; k++) { cx += pts[k][0]; cy += pts[k][1]; }
    cx /= n; cy /= n;
    pos.push(cx, cy, deckAt(cx, cy) + off); uv.push(cx, cy);
    for (k = 0; k < n; k++) { pos.push(pts[k][0], pts[k][1], deckAt(pts[k][0], pts[k][1]) + off); uv.push(pts[k][0], pts[k][1]); }
    for (k = 0; k < n; k++) idx.push(0, 1 + k, 1 + (k + 1) % n);
    var g = geoOf(THREE, pos, uv, idx);
    if (g.attributes.normal.array[2] < 0) { flip(idx); g.setIndex(idx); g.computeVertexNormals(); }
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
  /* a lathe about +x: prof = [[x, r]]; sgn +1 faces out */
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
  /* sail plan: semicircular fore end (radius w), square after end with corner radius ra; counter-clockwise */
  function sailPlan(x0, x1, w, ra, n) {
    var pts = [], k, a, q = n / 4;
    var xf = x1 - w;
    for (k = 0; k < 2 * q; k++) { a = -PI / 2 + k / (2 * q - 1) * PI; pts.push([xf + w * Math.cos(a), w * Math.sin(a)]); }
    for (k = 0; k < q; k++) { a = PI / 2 + k / (q - 1) * PI / 2; pts.push([x0 + ra + ra * Math.cos(a), w - ra + ra * Math.sin(a)]); }
    for (k = 0; k < q; k++) { a = PI + k / (q - 1) * PI / 2; pts.push([x0 + ra + ra * Math.cos(a), -w + ra + ra * Math.sin(a)]); }
    return pts;
  }

  /* the hump off the drawing: [px, crown row, half-width m, shoulder radius m]. Straight ramp 300-508 px,
     flat crown 508-676 px, the rounded fore end falling beside the sail to the deck at 767 px */
  var HUMP = [[300, 75.6, 3.0, 0.3], [320, 73.7, 3.8, 0.5], [345, 71.2, 4.5, 0.7], [380, 67.6, 5.05, 0.9],
              [420, 63.4, 5.35, 1.1], [460, 59.1, 5.45, 1.2], [508, 54.0, 5.45, 1.2], [600, 54.0, 5.45, 1.2],
              [676, 54.0, 5.45, 1.2], [690, 55.4, 5.35, 1.4], [707, 61.0, 5.0, 1.8], [722, 64.6, 4.5, 2.0],
              [740, 68.4, 3.8, 1.8], [756, 72.2, 3.0, 1.2], [767, 75.6, 2.3, 0.3]];
  var HW = 5.45;                                           /* the hump's walls, near the hull's beam */
  var SX0 = X(678), SX1 = X(781), SHW = 2.0, ZT = Z(40), ZH = Z(54);

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, s, x, z;

    /* ---- the pressure hull: one loft, tail tip to bow ---- */
    var xs = [], px;
    for (i = 0; i < STA.length; i++) xs.push(X(STA[i][0]));
    for (px = 230; px < 880; px += 30) xs.push(X(px));
    xs.sort(function (p, q) { return p - q; });
    var xu = [];
    for (i = 0; i < xs.length; i++) if (!i || xs[i] - xu[xu.length - 1] > 0.2) xu.push(xs[i]);
    A.add("skin", hullBody(THREE, xu, 64), 0, 0, 0);

    /* ---- the hump: flat-walled sections standing on the hull, rounded shoulders ---- */
    var hs = [];
    for (i = 0; i < HUMP.length; i++) {
      x = X(HUMP[i][0]);
      var w = HUMP[i][2], zt = Math.max(Z(HUMP[i][1]), topZ(x) - 0.3), zb = zc(x) + 0.5;
      hs.push({ x: x, pts: humpRing(w, zb, zt, HUMP[i][3], 5) });
    }
    A.add("tile", ringLoft(THREE, hs), 0, 0, 0);
    /* the long flood slot (drawing row 89, 445-760 px): on the hump wall, then on the hull side where the
       hump's fore end has rounded in */
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", new THREE.BoxGeometry(X(688) - X(445), 0.05, 0.17), (X(445) + X(688)) / 2, s * (HW + 0.01), Z(89.1));
      A.add("dark", sidePatch(THREE, s, X(700), X(760), Z(89.6), Z(88.6), 0.03, 6), 0, 0, 0);
      /* small vents along the hump's flank under the shoulder (drawing dots, rows 62-63) */
      for (k = 0; k < 9; k++) A.add("dark", new THREE.BoxGeometry(0.5, 0.05, 0.22), X(520 + k * 18), s * (HW + 0.01), Z(62.5));
      /* the tile seam courses on the wall (c_1994) */
      A.add("dark", new THREE.BoxGeometry(X(676) - X(470), 0.03, 0.05), (X(470) + X(676)) / 2, s * (HW + 0.005), ZH - 1.6);
      A.add("dark", new THREE.BoxGeometry(X(676) - X(430), 0.03, 0.05), (X(430) + X(676)) / 2, s * (HW + 0.005), 2.6);
    }

    /* ---- sixteen R-29RM lids: two rows of eight on the flat crown, 3.71 m pitch ---- */
    var LP = (X(677) - X(507)) / 8, LY = 2.1, LR = 1.25;
    for (k = 0; k < 8; k++) {
      x = X(507) + LP * (k + 0.5);
      for (s = -1; s <= 1; s += 2) {
        A.add("dark", new THREE.RingGeometry(LR, LR + 0.13, 20, 1), x, s * LY, ZH + 0.025);
        A.add("panel", new THREE.CircleGeometry(LR, 20), x, s * LY, ZH + 0.03);
        A.add("dark", new THREE.BoxGeometry(1.2, 0.3, 0.06), x, s * (LY + LR + 0.25), ZH + 0.02);   /* hinge fairing */
      }
    }
    A.add("dark", new THREE.BoxGeometry(X(677) - X(507), 0.1, 0.04), (X(507) + X(677)) / 2, 0, ZH + 0.01);

    /* ---- the sail: upright walls, semicircular fore end, flat roof ---- */
    var rings = [], zl = [1.3, 2.3, 2.9, 3.7, ZT - 1.4, ZT - 0.6, ZT - 0.25, ZT - 0.05, ZT];
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      var fil = Math.max(0, 1 - Math.max(0, z - 2.3) / 1.4);   /* the foot fillet onto the deck */
      var e2 = Math.max(0, z - (ZT - 1.4)) / 1.4, rd = 0.55 * (1 - Math.sqrt(Math.max(0, 1 - e2 * e2)));
      var e3 = Math.max(0, z - (ZT - 0.6)) / 0.6, rs = 0.35 * (1 - Math.sqrt(Math.max(0, 1 - e3 * e3)));
      rings.push({ z: z, pts: sailPlan(SX0 + rs, SX1 + 0.5 * fil * fil - rd * 1.6, SHW + 0.35 * fil * fil - rs, 0.6, 64) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);
    /* windows round the fore top (cutaway; f_k51), the flank window (c_1994; drawing 746 px), the bridge */
    /* five windows round the fore top: a wide one ahead, two a side (e_tula12, f_k51, cutaway) */
    var WA = [[0, 1.0], [0.55, 0.5], [-0.55, 0.5], [0.88, 0.45], [-0.88, 0.45]];
    for (k = 0; k < WA.length; k++) {
      var aw = WA[k][0], wx = SX1 - SHW + (SHW + 0.01) * Math.cos(aw), wy = (SHW + 0.01) * Math.sin(aw);
      A.add("dark", new THREE.BoxGeometry(0.06, WA[k][1], 0.45), wx, wy, ZT - 0.95, 0, 0, aw);
    }
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", new THREE.BoxGeometry(0.6, 0.05, 0.6), X(746), s * (SHW + 0.01), Z(49.5));
      A.add("dark", new THREE.BoxGeometry(SX1 - SX0 - 4.0, 0.03, 0.06), (SX0 + SX1) / 2 - 1.0, s * (SHW + 0.005), ZT - 1.9);
      A.add("dark", new THREE.BoxGeometry(0.9, 0.04, 2.0), X(690), s * (SHW + 0.01), Z(62));    /* door outline */
    }
    A.add("dark", new THREE.BoxGeometry(2.6, 2.2, 0.05), SX1 - 2.4, 0, ZT + 0.02);                /* bridge well */
    A.add("dark", new THREE.BoxGeometry(1.0, 1.0, 0.05), SX0 + 6.5, 0, ZT + 0.02);                 /* roof hatch */

    /* ---- the sail planes at half height (drawing row 60, 748-765 px; c_1994; f_k51) ---- */
    var PZ = Z(60.5), PC = (X(748) + X(765)) / 2, PCH = X(765) - X(748);
    for (s = -1; s <= 1; s += 2) {
      /* constant chord, blunt rounded tip (e_tula12), 5.0 m out from the sail side */
      var sp = [[s * (SHW - 0.3), PC, PCH, 0.55], [s * (SHW + 2.0), PC, PCH, 0.48],
                [s * (SHW + 4.4), PC, PCH * 0.97, 0.38], [s * (SHW + 4.8), PC, PCH * 0.8, 0.32],
                [s * (SHW + 5.0), PC, PCH * 0.45, 0.2]];
      if (s < 0) sp.reverse();
      A.add("tile", foil(THREE, sp, "y", PZ, 12), 0, 0, 0);
    }

    /* ---- masts as c_1994 shows them raised; x off the drawing ---- */
    var MS = [[X(688), 0.45, Z(10.5), 0.30, "esm"], [X(693.5), -0.45, Z(16), 0.24, "snort"],
              [X(697.5), 0.0, Z(6), 0.06, "whip"], [X(703), -0.3, Z(26), 0.12, "frame"]];
    for (k = 0; k < MS.length; k++) {
      var mx = MS[k][0], my = MS[k][1], mt = MS[k][2], mr = MS[k][3], kd = MS[k][4];
      A.add("metal", new THREE.CylinderGeometry(mr * 1.7, mr * 1.9, 0.3, 12), mx, my, ZT + 0.12, PI / 2, 0, 0);
      if (kd === "esm") {
        strut(THREE, A, "metal", mr, mr, [mx, my, ZT], [mx, my, mt - 1.6], 12);
        A.add("cap", new THREE.CylinderGeometry(0.42, 0.42, 1.2, 14), mx, my, mt - 1.0, PI / 2, 0, 0);
        A.add("cap", new THREE.SphereGeometry(0.42, 14, 6, 0, PI * 2, 0, PI / 2), mx, my, mt - 0.4, PI / 2, 0, 0);
        A.add("metal", new THREE.CylinderGeometry(0.46, 0.46, 0.25, 14), mx, my, mt - 1.55, PI / 2, 0, 0);
      } else if (kd === "snort") {
        strut(THREE, A, "metal", mr, mr, [mx, my, ZT], [mx, my, mt - 1.6], 12);
        A.add("metal", new THREE.CylinderGeometry(0.34, 0.36, 0.9, 12), mx, my, mt - 1.6, PI / 2, 0, 0);
        A.add("metal", new THREE.CylinderGeometry(0.02, 0.34, 1.2, 12), mx, my, mt - 0.6, PI / 2, 0, 0);
        A.add("metal", new THREE.BoxGeometry(0.5, 0.3, 0.6), mx - 0.45, my, mt - 2.8);             /* VAN-M box (c_1994) */
      } else if (kd === "frame") {
        strut(THREE, A, "metal", mr, mr, [mx, my, ZT], [mx, my, mt - 0.9], 8);
        A.add("cap", new THREE.TorusGeometry(0.32, 0.05, 4, 14), mx, my, mt - 0.45, PI / 2, 0, 0);
      } else {
        strut(THREE, A, "metal", 0.08, 0.025, [mx, my, ZT], [mx, my, mt], 6);
      }
    }

    /* ---- the stern off the drawing ---- */
    var ZA = Z(112);                                            /* the shaft line, -3.49 m */
    /* upper fin: trailing edge upright at 43 px; the pod along its head at row 72 from 43 to 78 px; the
       leading-edge fillet falling to the hull at 116 px */
    var uf = [[Z(106), X(43), X(125), 0.95], [Z(100), X(43), X(122), 0.95], [Z(86), X(43), X(116), 0.9],
              [Z(82), X(43), X(104.3), 0.85], [Z(78), X(43), X(92.6), 0.8], [Z(75.2), X(43.5), X(85), 0.7]];
    var stf = [];
    for (i = 0; i < uf.length; i++) stf.push([uf[i][0], (uf[i][1] + uf[i][2]) / 2, uf[i][2] - uf[i][1], uf[i][3]]);
    A.add("tile", foil(THREE, stf, "z", 0, 14), 0, 0, 0);
    /* the towed-array pod on the fin head (drawing; c_1994) and the rod on it at 63 px */
    A.add("tile", lathe(THREE, [[X(41.5), 0.05], [X(42.5), 0.32], [X(44.5), 0.5], [X(70), 0.52], [X(76), 0.42], [X(79), 0.05]], 16, 1),
          0, 0, Z(74.3));
    A.add("metal", new THREE.CylinderGeometry(0.16, 0.2, 1.1, 10), X(63), 0, Z(72) + 0.4, PI / 2, 0, 0);
    /* rudder hinge line (drawing 60 px) */
    for (s = -1; s <= 1; s += 2) A.add("dark", new THREE.BoxGeometry(0.07, 0.04, Z(76) - topZ(X(60)) - 0.4), X(60), s * 0.4, (Z(76) + topZ(X(60))) / 2);
    /* lower fin: trailing edge 38 px, foot at row 144 to 66 px, leading edge rising to the hull at 76 px */
    var lf = [[Z(116), X(38), X(80), 0.95], [Z(126), X(38), X(74.5), 0.9], [Z(134), X(38), X(70), 0.88],
              [Z(139), X(38), X(68), 0.85], [Z(143.5), X(38.5), X(66.3), 0.7], [Z(144.2), X(40), X(65), 0.35]];
    stf = [];
    for (i = 0; i < lf.length; i++) stf.push([lf[i][0], (lf[i][1] + lf[i][2]) / 2, lf[i][2] - lf[i][1], lf[i][3]]);
    A.add("tile", foil(THREE, stf, "z", 0, 14), 0, 0, 0);
    /* stern planes: root edge-on at row 109.5, 64-102 px; swept plan, tip 6.3 m from the axis */
    var ZP = Z(109.5);
    for (s = -1; s <= 1; s += 2) {
      var spl = [[s * 0.6, (X(64) + X(104)) / 2, X(104) - X(64), 0.9], [s * 3.0, (X(64) + X(96)) / 2, X(96) - X(64), 0.75],
                 [s * 5.6, (X(64.5) + X(86)) / 2, X(86) - X(64.5), 0.55], [s * 6.3, (X(65.5) + X(80)) / 2, X(80) - X(65.5), 0.35]];
      if (s < 0) spl.reverse();
      A.add("tile", foil(THREE, spl, "y", ZP, 12), 0, 0, 0);
    }
    /* two shafts in faired bossings on a web from the tail cone (estimated: the drawing shows them edge-on
       as one thin tail); five-blade screws (ru.wikipedia), disc 3.8 m off the drawing */
    var SY = 2.05, SXP = X(6.5);
    var blade = [[-0.12, 0.42], [-0.5, 0.85], [-0.55, 1.45], [-0.3, 1.86], [0.08, 1.92], [0.38, 1.6], [0.42, 1.0], [0.18, 0.5]];
    for (s = -1; s <= 1; s += 2) {
      var by = s * SY;
      /* bossing from the stern plane's root aft along the tail (estimated) */
      A.add("tile", lathe(THREE, [[X(70), 0.05], [X(64), 0.55], [X(40), 0.62], [X(20), 0.5], [X(10.5), 0.38]], 14, 1), 0, by, ZA);
      A.add("tile", foil(THREE, s > 0 ? [[0.2, (X(66) + X(14)) / 2, X(66) - X(14), 0.5], [by, (X(66) + X(14)) / 2, X(66) - X(14), 0.5]]
                                       : [[by, (X(66) + X(14)) / 2, X(66) - X(14), 0.5], [-0.2, (X(66) + X(14)) / 2, X(66) - X(14), 0.5]], "y", ZA, 8), 0, 0, 0);
      A.add("metal", lathe(THREE, [[X(10.5), 0.3], [X(8), 0.3]], 10, 1), 0, by, ZA);
      A.add("screw", lathe(THREE, [[X(8.2), 0.42], [X(6.5), 0.44], [X(4.5), 0.36], [X(2.2), 0.05]], 14, 1), 0, by, ZA);
      for (i = 0; i < 5; i++) {
        var sh = new THREE.Shape(), bi;
        sh.moveTo(blade[0][0], blade[0][1]);
        for (bi = 1; bi < blade.length; bi++) sh.lineTo(blade[bi][0], blade[bi][1]);
        sh.closePath();
        var gb = new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: false });
        gb.translate(0, 0, -0.035);
        gb.rotateY(0.5 * s);
        A.add("screw", gb, SXP, by, ZA, i * 2 * PI / 5 + (s > 0 ? 0 : 0.3), 0, 0);
      }
    }

    /* ---- deck fittings off the drawing: hatches fore and aft, the fore escape hatch ---- */
    A.add("dark", deckPoly(THREE, circ(X(840), 0, 0.5, 12), 0.04), 0, 0, 0);
    A.add("dark", deckPoly(THREE, circ(X(250), 0, 0.5, 12), 0.04), 0, 0, 0);
    A.add("dark", deckPoly(THREE, [[X(871) - 1.0, -0.8], [X(871) + 1.0, -0.8], [X(871) + 1.0, 0.8], [X(871) - 1.0, 0.8]], 0.03), 0, 0, 0);

    /* ---- modest team patches: fore deck, after deck, sail roof ---- */
    A.add("team", new THREE.BoxGeometry(X(817) - X(805), 1.8, 0.06), (X(805) + X(817)) / 2, 0, deckAt((X(805) + X(817)) / 2, 0.9) + 0.01);
    A.add("team", new THREE.BoxGeometry(X(227) - X(215), 1.8, 0.06), (X(215) + X(227)) / 2, 0, deckAt((X(215) + X(227)) / 2, 0.9) + 0.01);
    A.add("team", new THREE.BoxGeometry(1.6, 1.6, 0.04), SX0 + 3.5, 0, ZT + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent (screw boss to bow): render3d scales a submarine by it. */
UNIT_MODELS["pact_e90_ssbn"] = {
  len: 167.0,
  build: function (THREE, M, C) { return HeroDelta4_667BDRM.build(THREE, M, C); }
};
