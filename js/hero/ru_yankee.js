/* ============ ru_yankee.js -- HERO model: Project 667A Navaga / Yankee I SSBN, K-137 (pact_e60_ssbn) ============
   Full-quality redo, 2026-10-24. The row's boat, K-137 (lead ship, laid down 1964, commissioned November
   1967, Northern Fleet), drawn as a Project 667A went to sea in the late 1960s and 1970s: sixteen R-27
   tubes under the low flat missile casing abaft the sail, the planes on the sail, two shafts. Not the
   667AU rebuild of 1985 (nothing on the outside that the sources separate).

   References (Wikimedia Commons, fetched at width=960, cached in scratchpad/q_yankee_ref):
     - "Yankee class SSBN.svg" (a_side.png, Mike1979 Russia, "Silhouette of soviet Yankee-I class ...
       project 667A ... K-219", starboard profile, bow right, 957 px from screw tip (2 px) to bow (959 px),
       scaled to 129.8 m: 7.373 px/m). THE source for every station. Read off it: the white water-line
       mark at row 126.3 (z = 0); the hull crown at row 99 and the keel at row 185 over the parallel body
       (11.7 m deep, the published beam; keel 8.0 m under the mark, published draught 7.9 m); the hull axis
       at row 142 from the bow to the tail; the bluff round bow over the last 55 px; the tail cone from
       220 px to its end at 13 px; the missile casing rising in a straight ramp from 402 px to its flat
       crown at row 91 (4.8 m over the water, 1.1 m over the hull crown) from 470 px to the sail, and its
       fore end falling beside the sail to the deck at 690 px; the eight lid panels on the casing side,
       17 px long at a 20 px pitch from 480 to 640 px; the sail 645-777 px, flat roof at row 53 (9.9 m
       over the water), the rounded fore top, the fore end's round from 765 px; the planes edge-on at
       row 79, 734-759 px; the masts (bulbous-capped mast 657 px, whip 670 px, periscope 733 px); the two
       window slots (705, 718 px) and the light (728 px) on the flank; the upper fin (trailing edge 20 px,
       flat head row 97.5 from 20 to 58 px, the small housing on the head 46-55 px, the leading edge to the
       hull at 66 px, hinge line 45 px); the lower fin (trailing edge 19 px, foot row 185.5 to 57 px, hinge
       42 px); the stern plane edge-on at row 143.5 from 14 to 95 px; the screw disc 3.9 m (rows 129-158),
       hub 2-14 px; the dashed slot rows along the hull (row 108 aft, rows 111 and 117.5 forward).
     - "Submarine Yankee I class.jpg" (c_y1.jpg, US DoD, dated 1977, port bow from the air): THE 1970s
       photograph. The long black hull low in the water, the sail well forward with flat walls, round fore
       end and flat roof, the long plane on the sail; the low flat-topped missile casing running aft from the
       sail with a step down to the hull; three masts raised (a thin one in the fore half, a thin one and a
       thicker capped one aft); a PALE CAP on the top of the nose with a sharp curved edge.
     - "Yankee sub.jpg" (d_ysub.jpg, US Navy, overhead from the starboard bow, ru.wikipedia's infobox
       photograph): the plan. The missile casing a flat deck two thirds or more of the hull's width with
       the lids in two rows; the narrow sail (about a third of the beam) with a rounded fore end; the
       long rectangular planes; two round hatches on the fore deck; the same pale nose cap.
     - US Navy photographs of K-219, 3 October 1986 (e_k219a.jpg "K219-DN-SN-87-07255", starboard side from
       the air; f_dmg1.jpg "Submarine Yankee I damaged", port bow, colour; g_dmg2.jpg and i_port.jpg, port
       side, colour): black to the water, matte; the sail's rounded fore top; THE close view of the casing
       (e_k219a): ROUND lids on the crown (their arcs over each wall panel, the open No. 6 lid), one
       rectangular panel per tube down the casing wall, the casing wall standing nearly over the hull side; the planes at about two thirds of the sail's height, toward its
       fore end; the upper fin standing well clear at the stern; the window slots and the light on the sail.
       Paint sampled on f_dmg1: (72,72,64) on the sail flank in hazy light.
     - "Ekspanaty muzeya Marinesko, modeli podlodok 25.jpg" (h_model.jpg, a museum model of the 667A):
       the stern -- the stern planes running aft past the tail cone with a screw at each plane's after end,
       outboard of the upper and lower rudders: the twin-screw arrangement the drawing shows edge-on.
     - ru.wikipedia "Podvodnye lodki proekta 667A Navaga" and "K-137 Leninets": beam 11.7 m, draught
       7.9 m; length 132 m (class article) or 128 m (K-137 article); two turbine sets on two shafts;
       16 R-27 (D-5 system) in vertical tubes; K-137 laid down 4 Nov 1964, launched 11 Sep 1966, in service
       November 1967, Northern Fleet.

   CORRECTED from the earlier model (ru_yankee.js of HEAD):
     - The hull is BLACK TO THE KEEL. The earlier model and the drawing gave a red-brown under-body; no
       photograph of a 667A's under-body was found (the 1977 and 1986 photographs show black to the water),
       so the red boot is NOT drawn and the under-body colour is NOT CONFIRMED.
     - The sail is 4.2 m wide (photographs d_ysub, c_y1, f_dmg1: about a third of the beam), not 5-6 m;
       its fore end is a round, not a square end; the roof is 9.9 m over the water (drawing), not 9.6 m.
     - The missile casing is a flat deck about 8.4 m wide (e_k219a, f_dmg1, d_ysub), not 6.6 m, its crown
       1.1 m over the hull crown (drawing), with one rectangular panel per tube down its walls (drawing,
       e_k219a); the sixteen lids are ROUND (e_k219a), not square panels, in two rows of eight at the
       drawing's 2.71 m pitch.
     - The masts are the three the 1977 photograph shows raised, at the drawing's places and heights.
     - The planes sit toward the fore end of the sail at 6.4 m over the water (drawing row 79; f_dmg1),
       not at mid-length.
     - The stern planes run aft past the tail cone and carry the two shafts in bossings; the screws are
       at the planes' after ends (museum model; drawing), not on stub fairings off the tail.
     - The pale nose cap of the 1977 and overhead photographs is drawn.

   RECOGNITION (each one shows on the final sheets):
     1. The long cylindrical black hull, low in the water, with the bluff round bow (drawing; c_y1; i_port).
     2. The sail well forward: flat walls, round fore end, rounded fore top, flat roof (drawing; c_y1; d_ysub;
        e_k219a).
     3. The long rectangular planes on the sail toward its fore end, about two thirds up (drawing; d_ysub;
        f_dmg1).
     4. The low flat missile casing abaft the sail, wider than the sail, a straight ramp aft and its fore end
        falling beside the sail (drawing; c_y1; d_ysub; f_dmg1) -- far flatter than the Delta's hump.
     5. Sixteen round R-27 lids in two rows of eight on its crown, a panel per tube down the casing walls
        (drawing; d_ysub; e_k219a; ru.wikipedia).
     6. Three masts raised as in 1977: the bulbous-capped mast and the whip aft, the periscope forward
        (c_y1; drawing heights).
     7. The cruciform stern: tall upper fin with its rudder and the small housing on its head, the lower fin
        (drawing; h_model; i_port).
     8. The stern planes running aft past the tail cone with the two four-blade screws at their after ends
        (h_model; drawing).
     9. The pale cap on the nose top (c_y1; d_ysub).
    10. The dashed slot rows along the hull, the sail's window slots and light (drawing; e_k219a).

   ESTIMATED, not measured (no plan view to scale found): the sail's width (4.2 m) and its fore-end round;
   the casing's width (8.4 m) and shoulder rounding; the lids' diameter (2.1 m)
   and their offset (+-2.25 m); the plane span (4.6 m out from the sail side, from
   d_ysub against the sail's width); the stern-plane span (5.9 m from the axis) and plan; the shafts' spacing
   (+-2.3 m: the drawing shows one disc edge-on) and the bossings; the screw blade count (the drawing's
   disc reads as four blades; no photograph shows them); the pale cap's extent (9 m back on the crown,
   5 m at the beam) and its grey (the photographs are monochrome: about 2.7x the hull's tone); the fin thicknesses; the masts' lateral offsets.
   NOT DRAWN: hull numbers, names, flags, rails and lifelines, people, the drawing's red boot and white
   water-line mark, the K-219 damage, sonar windows and hatches below the water.
   MEASURED on the model: 129.76 m overall, screw boss to bow (ru.wikipedia gives 132 m for the class and
   128 m for K-137; the drawing's depth and keel match the 11.7 m beam and 7.9 m draught at 129.8 m);
   hull 11.7 m across, 13.4 m over the sail planes; keel 8.03 m under the water line; casing crown 4.78 m
   and sail roof 9.94 m over the water; sail 17.9 m long; screw discs 3.9 m.
   13,906 triangles, 8 draw calls, 8 materials, 2 canvas textures. Paint: black to the keel, #2c2b29 (the
   K-219 colour photograph samples (72,72,64) on the sail flank in haze; drawn at the house black of the
   Delta IV, Typhoon and Borei redos, a touch warmer as that photograph reads).
   The row is not turret:true, so nothing is named "turret"; the lids are flush and merged (render3d opens
   none; combat.js launches an SLBM from the unit's position, not from a hatch). Model space +X bow, +Y port,
   +Z up, metres; water line z = 0; hull axis 2.1 m under it. render3d scales a submarine by
   UNIT_MODELS[key].len, set to the measured X extent. Merged per material. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroYankee667A = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 957 / 129.8;
  function X(px) { return (px - 2) / PXM - 64.9; }         /* drawing px from the stern -> metres */
  function Z(row) { return (126.3 - row) / PXM; }           /* drawing row -> metres over the water line */

  /* [px, top row, keel row, top exponent] off the profile; round below the axis, a touch flattened above it
     (the casing deck). Under the fins (19-66 px) the top and keel are the hull's taper, faired between the
     visible lines at 13 and 66 px about the axis row 142. */
  var STA = [
    [13.5, 138.4, 146.4, 2.0], [20, 136.0, 148.8, 2.0], [30, 132.6, 152.2, 2.0], [40, 129.2, 155.6, 2.0],
    [50, 125.6, 159.2, 2.0], [60, 122.4, 162.4, 2.0], [66, 121.0, 164.0, 2.0], [75, 119.0, 166.0, 2.05],
    [90, 116.0, 169.0, 2.05], [100, 113.5, 171.0, 2.1], [120, 110.0, 175.0, 2.1], [140, 107.0, 178.0, 2.15],
    [160, 104.2, 181.0, 2.2], [180, 102.0, 183.0, 2.2], [200, 100.2, 184.5, 2.25], [220, 99.0, 185.0, 2.3],
    [900, 99.0, 184.8, 2.3], [910, 99.0, 184.0, 2.3], [918, 99.0, 182.6, 2.3], [925, 99.6, 181.0, 2.25],
    [930, 101.0, 179.0, 2.2], [935, 103.0, 177.0, 2.2], [940, 105.0, 174.0, 2.15], [945, 109.0, 170.0, 2.1],
    [950, 114.0, 165.0, 2.0], [953, 118.0, 161.0, 2.0], [955, 121.0, 157.5, 2.0], [957, 126.0, 152.0, 2.0],
    [958.3, 130.0, 148.0, 2.0]
  ];
  var XS = X(13.5), XE = X(958.3);
  function tab(x, k) {
    var px = (x + 64.9) * PXM + 2, i;
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
  var BLACK = "#2c2b29";                                    /* sampled (72,72,64) taken to ~0.6, the redos' black */

  /* hull skin: u stern to bow over XS..XE, v round the girth (flipY: row = (1 - v) H). Coating sheets,
     the drawing's slot rows, the pale nose cap of the 1977 and overhead photographs */
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(66711), i, j, s, x;
    var L = XE - XS;
    g.fillStyle = BLACK; g.fillRect(0, 0, W, H);
    var NC = 24, tw = 4.0 / L * W, th = H / NC;             /* coating sheets, 4 m courses */
    for (j = 0; j < NC; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < W; i++) {
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.006 + R1() * 0.018).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect(i * tw + off + 0.4, j * th + 0.4, tw - 0.8, th - 0.8);
      }
    }
    for (i = 0; i < 70; i++) {                              /* weathered streaks (f_dmg1, i_port) */
      g.fillStyle = R1() < 0.6 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.10)";
      g.fillRect(R1() * W, R1() * H, 8 + R1() * 40, 1 + R1() * 2);
    }
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 0.8;
    for (j = 0; j <= NC; j++) { g.beginPath(); g.moveTo(0, j * th); g.lineTo(W, j * th); g.stroke(); }
    function col(xx) { return (xx - XS) / L * W; }
    function rowOf(xx, z, stbd) { return (1 - girthV(xx, z, stbd)) * H; }
    /* the pale nose cap: 9 m back from the tip on the crown (just ahead of the fore-deck hatches, d_ysub),
       5 m at the beam, a sharp curved edge (c_y1, d_ysub); about 2.7x the hull's tone there, taken to ~0.8 */
    g.fillStyle = "#6a6c6d";
    var tip = X(958.3);
    for (i = Math.floor(col(tip - 9.5)); i < W; i++) {
      x = XS + (i + 0.5) / W * L;
      for (j = 0; j < H; j++) {
        var v = 1 - (j + 0.5) / H;                          /* girth fraction */
        if (v > 0.5) continue;                              /* top half only: port beam -> crown -> starboard beam */
        var a = Math.abs(v - 0.25) / 0.25;                  /* 0 crown, 1 beam */
        var back = 9.0 - 4.0 * a * a;
        if (tip - x < back) g.fillRect(i, j, 1, 1);
      }
    }
    g.fillStyle = "rgba(0,0,0,0.9)";
    for (s = 0; s < 2; s++) {
      /* slot rows off the drawing: row 108 over the after body (190-345 px; the 133-157 px dash lies on
         the deck edge, where the crown is lower than row 108, and is left out) */
      var seg = [[192, 203], [223, 245], [258, 273], [283, 300], [318, 342]];
      for (i = 0; i < seg.length; i++) g.fillRect(col(X(seg[i][0])), rowOf(X(seg[i][0]), Z(108), s) - 1, col(X(seg[i][1])) - col(X(seg[i][0])), 2);
      /* row 117.5 under the casing and the sail (355-900 px) */
      var seg2 = [[355, 402], [458, 483], [489, 519], [545, 580], [600, 640], [700, 727], [735, 766], [784, 812], [830, 860]];
      for (i = 0; i < seg2.length; i++) g.fillRect(col(X(seg2[i][0])), rowOf(X(seg2[i][0]), Z(117.5), s) - 1, col(X(seg2[i][1])) - col(X(seg2[i][0])), 2);
      /* row 111 beside the sail's after end (579-662 px) */
      g.fillRect(col(X(579)), rowOf(X(579), Z(111), s) - 1, col(X(622)) - col(X(579)), 2);
      g.fillRect(col(X(630)), rowOf(X(630), Z(111), s) - 1, col(X(662)) - col(X(630)), 2);
      /* small holes along the fore body (drawing 866-880 px, row 118) */
      for (x = X(864); x < X(882); x += 1.0) g.fillRect(col(x), rowOf(x, Z(118), s) - 1, 2, 2);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex.hull = t;
    return t;
  }

  /* 2 m coating patch for the parts with metre UVs: casing, sail, fins, planes */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d");
    var R1 = rng(6677), i, j;
    g.fillStyle = BLACK; g.fillRect(0, 0, S, S);
    for (j = 0; j < 2; j++) {
      for (i = 0; i < 2; i++) {
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.02).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect(i * 64 + 1, j * 64 + 1, 62, 62);
      }
    }
    for (i = 0; i < 30; i++) {
      g.fillStyle = R1() < 0.6 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.08)";
      g.fillRect(R1() * S, R1() * S, 6 + R1() * 20, 1 + R1() * 2);
    }
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.0;
    for (j = 0; j <= 2; j++) { g.beginPath(); g.moveTo(0, j * 64); g.lineTo(S, j * 64); g.stroke(); }
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
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.04 }),
      tile:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.9, metalness: 0.04 }),
      dark:  std(0x0c0d0e, 0.80, 0.20),     /* slots, windows, seams, hatch rings */
      panel: std(0x353431, 0.86, 0.10),     /* missile lids */
      metal: std(0x3a4045, 0.55, 0.45),     /* masts, shafts */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze screws */
      cap:   std(0xa9adb0, 0.70, 0.10),     /* pale mast heads, the sail light (drawing; e_k219a) */
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
    var c0i = pos.length / 3; pos.push(xs[0] - 0.12, 0, zc(xs[0])); uv.push(0, 0.5);
    for (j = 0; j < segs; j++) idx.push(c0i, j + 1, j);
    var c1i = pos.length / 3; pos.push(XE + 0.08, 0, zc(XE)); uv.push(1, 0.5);
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
  /* casing section: upright walls, flat crown, rounded shoulders (radius rs), foot at zb; counter-clockwise */
  function casingRing(w, zb, zt, rs, n) {
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
  /* sail plan: round fore end (an ellipse a long, w wide), square after end with corner radius ra;
     counter-clockwise from above */
  function sailPlan(x0, x1, w, a, ra, n) {
    var pts = [], k, t, q = n / 4;
    var xf = x1 - a;
    for (k = 0; k < 2 * q; k++) { t = -PI / 2 + k / (2 * q - 1) * PI; pts.push([xf + a * Math.cos(t), w * Math.sin(t)]); }
    for (k = 0; k < q; k++) { t = PI / 2 + k / (q - 1) * PI / 2; pts.push([x0 + ra + ra * Math.cos(t), w - ra + ra * Math.sin(t)]); }
    for (k = 0; k < q; k++) { t = PI + k / (q - 1) * PI / 2; pts.push([x0 + ra + ra * Math.cos(t), -w + ra + ra * Math.sin(t)]); }
    return pts;
  }

  /* the missile casing off the drawing: [px, crown row, half-width m, shoulder radius m]. Straight ramp
     402-470 px, flat crown at row 91 to the sail, the fore end falling beside the sail to the deck at 690 px */
  var CAS = [[402, 99.8, 2.0, 0.3], [414, 98.2, 3.0, 0.35], [428, 96.4, 3.65, 0.4], [446, 94.1, 4.05, 0.42],
             [462, 92.0, 4.2, 0.42], [470, 91.0, 4.2, 0.42], [560, 91.0, 4.2, 0.42], [646, 91.0, 4.2, 0.42],
             [656, 92.3, 4.1, 0.5], [668, 94.5, 3.8, 0.6], [680, 96.9, 3.4, 0.6], [690, 99.2, 2.8, 0.4]];
  var CW = 4.2, ZK = Z(91);                                 /* casing half-width (estimated), crown 4.78 m */
  var SX0 = X(645), SX1 = X(777), SHW = 2.1, ZT = Z(53);    /* sail: 17.9 m long, roof 9.94 m */

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, s, x, z;

    /* ---- the hull: one loft, tail cone to bow ---- */
    var xs = [], px;
    for (i = 0; i < STA.length; i++) xs.push(X(STA[i][0]));
    for (px = 240; px < 900; px += 30) xs.push(X(px));
    xs.sort(function (p, q) { return p - q; });
    var xu = [];
    for (i = 0; i < xs.length; i++) if (!i || xs[i] - xu[xu.length - 1] > 0.2) xu.push(xs[i]);
    A.add("skin", hullBody(THREE, xu, 64), 0, 0, 0);

    /* ---- the missile casing: flat crown, upright walls into the hull, rounded shoulders ---- */
    var hs = [];
    for (i = 0; i < CAS.length; i++) {
      x = X(CAS[i][0]);
      var zt = Math.max(Z(CAS[i][1]), topZ(x) - 0.3), zb = zc(x) + 0.5;
      hs.push({ x: x, pts: casingRing(CAS[i][2], zb, zt, CAS[i][3], 4) });
    }
    A.add("tile", ringLoft(THREE, hs), 0, 0, 0);

    /* ---- sixteen R-27 lids: two rows of eight across the crown, 2.31 m long at a 2.71 m pitch (drawing
       480-640 px); each lid's outer edge turns down the casing side as the drawing's panels show ---- */
    var LP = 20 / PXM, LL = 17 / PXM, LY = 2.25, LR = 1.05;
    for (k = 0; k < 8; k++) {
      x = X(480) + LP * k + LL / 2;
      for (s = -1; s <= 1; s += 2) {
        /* the round lid on the crown (e_k219a: the lids' arcs above each side panel, the open No. 6 lid) */
        A.add("dark", new THREE.CylinderGeometry(LR + 0.13, LR + 0.13, 0.05, 22), x, s * LY, ZK + 0.012, PI / 2, 0, 0);
        A.add("panel", new THREE.CylinderGeometry(LR, LR + 0.03, 0.09, 22), x, s * LY, ZK + 0.045, PI / 2, 0, 0);
        /* the side panel's outline on the wall, 0.95 m deep (drawing rows 91.5-98.5; e_k219a) */
        var zp0 = Z(98.5), zp1 = ZK - 0.3;
        A.add("dark", new THREE.BoxGeometry(0.07, 0.04, zp1 - zp0), x - LL / 2, s * (CW + 0.01), (zp0 + zp1) / 2);
        A.add("dark", new THREE.BoxGeometry(0.07, 0.04, zp1 - zp0), x + LL / 2, s * (CW + 0.01), (zp0 + zp1) / 2);
        A.add("dark", new THREE.BoxGeometry(LL, 0.04, 0.07), x, s * (CW + 0.01), zp0);
        /* hinge fairing at the lid's outboard edge */
        A.add("dark", new THREE.BoxGeometry(LL * 0.5, 0.3, 0.08), x, s * (LY + LR + 0.28), ZK + 0.03);
      }
    }

    /* ---- the sail: upright walls, round fore end, rounded fore top, flat roof ---- */
    var rings = [], zl = [3.0, 3.9, 4.6, 5.3, ZT - 1.2, ZT - 0.65, ZT - 0.3, ZT - 0.08, ZT];
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      var fil = Math.max(0, 1 - Math.max(0, z - 3.9) / 1.4);       /* the foot fillet onto the deck */
      var e2 = Math.max(0, z - (ZT - 1.2)) / 1.2, rd = 0.9 * (1 - Math.sqrt(Math.max(0, 1 - e2 * e2)));
      var e3 = Math.max(0, z - (ZT - 0.3)) / 0.3, rs = 0.2 * (1 - Math.sqrt(Math.max(0, 1 - e3 * e3)));
      rings.push({ z: z, pts: sailPlan(SX0 + rs, SX1 + 0.5 * fil * fil - rd, SHW + 0.35 * fil * fil - rs, 1.6, 0.5, 64) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);
    for (s = -1; s <= 1; s += 2) {
      /* the two window slots (drawing 705 and 718 px, rows 64-75; e_k219a) */
      A.add("dark", new THREE.BoxGeometry(0.55, 0.05, 1.5), X(707), s * (SHW + 0.01), Z(69.5));
      A.add("dark", new THREE.BoxGeometry(0.55, 0.05, 1.5), X(720), s * (SHW + 0.01), Z(69.5));
      /* the light (drawing 728 px, row 64; e_k219a) */
      A.add("cap", new THREE.CylinderGeometry(0.22, 0.22, 0.08, 12), X(729), s * (SHW + 0.02), Z(64.5));
      /* the seam along the sail's foot (drawing row 92, 690-755 px) */
      A.add("dark", new THREE.BoxGeometry(X(755) - X(690), 0.03, 0.06), (X(690) + X(755)) / 2, s * (SHW + 0.005), Z(92));
      /* the bridge windows at the fore top (drawing 768-774 px, row 58) */
      A.add("dark", new THREE.BoxGeometry(0.45, 0.05, 0.35), X(768), s * (SHW + 0.005), Z(58));
    }
    A.add("dark", new THREE.BoxGeometry(2.4, 2.4, 0.05), SX1 - 2.6, 0, ZT + 0.02);                /* bridge well */
    A.add("dark", new THREE.BoxGeometry(1.0, 1.0, 0.05), SX0 + 4.0, 0, ZT + 0.02);                 /* roof hatch */

    /* ---- the planes on the sail toward its fore end (drawing row 79, 734-759 px; d_ysub; f_dmg1) ---- */
    var PZ = Z(79), PC = (X(734) + X(759)) / 2, PCH = X(759) - X(734);
    for (s = -1; s <= 1; s += 2) {
      var sp = [[s * (SHW - 0.3), PC, PCH, 0.5], [s * (SHW + 2.0), PC, PCH, 0.44],
                [s * (SHW + 4.45), PC, PCH * 0.98, 0.34], [s * (SHW + 4.6), PC - 0.05, PCH * 0.9, 0.22]];   /* square tips (d_ysub) */
      if (s < 0) sp.reverse();
      A.add("tile", foil(THREE, sp, "y", PZ, 12), 0, 0, 0);
    }

    /* ---- the three masts c_y1 (1977) shows raised, at the drawing's places and heights ---- */
    /* bulbous-capped mast (657 px, cap rows 12-22) */
    var mx = X(657);
    A.add("metal", new THREE.CylinderGeometry(0.4, 0.44, 0.3, 12), mx, -0.4, ZT + 0.12, PI / 2, 0, 0);
    strut(THREE, A, "metal", 0.2, 0.2, [mx, -0.4, ZT], [mx, -0.4, Z(22)], 10);
    A.add("cap", lathe(THREE, [[-0.75, 0.05], [-0.7, 0.36], [0.1, 0.38], [0.55, 0.26], [0.75, 0.05]], 14, 1), mx, -0.4, Z(17), 0, -PI / 2, 0);
    A.add("metal", new THREE.CylinderGeometry(0.4, 0.4, 0.2, 12), mx, -0.4, Z(22.5), PI / 2, 0, 0);
    /* whip (670 px, to row 8, collar rows 24-30) */
    mx = X(670);
    A.add("metal", new THREE.CylinderGeometry(0.22, 0.26, 0.3, 10), mx, 0.35, ZT + 0.12, PI / 2, 0, 0);
    strut(THREE, A, "metal", 0.11, 0.09, [mx, 0.35, ZT], [mx, 0.35, Z(24)], 8);
    A.add("metal", new THREE.CylinderGeometry(0.16, 0.16, 0.8, 8), mx, 0.35, Z(27), PI / 2, 0, 0);
    strut(THREE, A, "metal", 0.06, 0.02, [mx, 0.35, Z(24)], [mx, 0.35, Z(8)], 6);
    /* periscope (733 px, head rows 24-32) */
    mx = X(733);
    A.add("metal", new THREE.CylinderGeometry(0.3, 0.34, 0.3, 12), mx, 0.0, ZT + 0.12, PI / 2, 0, 0);
    strut(THREE, A, "metal", 0.17, 0.17, [mx, 0, ZT], [mx, 0, Z(32)], 10);
    A.add("metal", new THREE.CylinderGeometry(0.2, 0.2, 0.9, 10), mx, 0, Z(28.5), PI / 2, 0, 0);
    A.add("cap", new THREE.SphereGeometry(0.2, 10, 5, 0, PI * 2, 0, PI / 2), mx, 0, Z(24.5), PI / 2, 0, 0);
    A.add("dark", new THREE.BoxGeometry(0.06, 0.16, 0.2), mx + 0.19, 0, Z(26));                 /* window */

    /* ---- the stern off the drawing ---- */
    var ZA = Z(143);                                        /* the shaft line, -2.28 m */
    /* upper fin: trailing edge upright at 20 px, flat head at row 97.5 to 58 px, leading edge to the hull at 66 px */
    var uf = [[Z(137), X(20), X(69), 0.95], [Z(124), X(20), X(66), 0.9], [Z(112), X(20), X(62), 0.85],
              [Z(102), X(20), X(59.2), 0.75], [Z(98.6), X(20.4), X(58.2), 0.62], [Z(97.5), X(21.2), X(57.4), 0.4]];
    var stf = [];
    for (i = 0; i < uf.length; i++) stf.push([uf[i][0], (uf[i][1] + uf[i][2]) / 2, uf[i][2] - uf[i][1], uf[i][3]]);
    A.add("tile", foil(THREE, stf, "z", 0, 14), 0, 0, 0);
    /* the small housing on the fin head (drawing 46-55 px, rows 92-97.5) */
    A.add("tile", lathe(THREE, [[X(45.5), 0.05], [X(46), 0.3], [X(47), 0.36], [X(54.5), 0.36], [X(55.5), 0.08]], 12, 1), 0, 0, Z(94.8));
    A.add("dark", new THREE.BoxGeometry(X(53) - X(48), 0.74, 0.1), (X(48) + X(53)) / 2, 0, Z(93.6));
    /* lower fin: trailing edge 19 px, foot at row 185.5 to 57 px, leading edge from the hull at 66 px */
    var lf = [[Z(147), X(19), X(70), 0.95], [Z(160), X(19), X(66), 0.9], [Z(170), X(19), X(62), 0.85],
              [Z(180), X(19), X(58.6), 0.75], [Z(184.6), X(19.4), X(57.4), 0.62], [Z(185.5), X(20.2), X(56.6), 0.4]];
    stf = [];
    for (i = 0; i < lf.length; i++) stf.push([lf[i][0], (lf[i][1] + lf[i][2]) / 2, lf[i][2] - lf[i][1], lf[i][3]]);
    A.add("tile", foil(THREE, stf, "z", 0, 14), 0, 0, 0);
    /* rudder hinge lines (drawing 45 px upper, 42 px lower) */
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", new THREE.BoxGeometry(0.07, 0.04, Z(98) - Z(130)), X(45), s * 0.36, (Z(98) + Z(130)) / 2);
      A.add("dark", new THREE.BoxGeometry(0.07, 0.04, Z(155) - Z(185)), X(42), s * 0.36, (Z(155) + Z(185)) / 2);
    }
    /* stern planes: edge-on at row 143.5 from 14 to 95 px; running aft past the tail cone (h_model);
       plan estimated, tip 5.9 m from the axis */
    var ZP = Z(143.5);
    for (s = -1; s <= 1; s += 2) {
      var spl = [[s * 0.4, (X(14) + X(95)) / 2, X(95) - X(14), 0.75], [s * 2.3, (X(14) + X(88)) / 2, X(88) - X(14), 0.7],
                 [s * 4.0, (X(22) + X(74)) / 2, X(74) - X(22), 0.55], [s * 5.4, (X(28) + X(64)) / 2, X(64) - X(28), 0.42],
                 [s * 5.9, (X(31) + X(60)) / 2, X(60) - X(31), 0.26]];
      if (s < 0) spl.reverse();
      A.add("tile", foil(THREE, spl, "y", ZP, 12), 0, 0, 0);
      /* elevator hinge line (drawing 70 px) */
      A.add("dark", new THREE.BoxGeometry(0.06, 4.6, 0.03), X(66), s * 3.3, ZP + 0.3, 0, 0, s * 0.22);
    }
    /* two shafts in bossings along the planes; four-blade screws (the drawing's disc), 3.9 m */
    var SY = 2.3, SXP = X(8.5);
    var blade = [[-0.12, 0.42], [-0.5, 0.85], [-0.55, 1.4], [-0.3, 1.86], [0.08, 1.94], [0.38, 1.6], [0.42, 1.0], [0.18, 0.5]];
    for (s = -1; s <= 1; s += 2) {
      var by = s * SY;
      A.add("tile", lathe(THREE, [[X(100), 0.05], [X(92), 0.45], [X(60), 0.55], [X(30), 0.5], [X(15), 0.4]], 14, 1), 0, by, ZA);
      A.add("metal", lathe(THREE, [[X(15.2), 0.28], [X(13.2), 0.28]], 10, 1), 0, by, ZA);
      A.add("screw", lathe(THREE, [[X(13.6), 0.44], [X(11), 0.46], [X(6), 0.36], [X(2.2), 0.06]], 14, 1), 0, by, ZA);
      for (i = 0; i < 4; i++) {
        var sh = new THREE.Shape(), bi;
        sh.moveTo(blade[0][0], blade[0][1]);
        for (bi = 1; bi < blade.length; bi++) sh.lineTo(blade[bi][0], blade[bi][1]);
        sh.closePath();
        var gb = new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: false });
        gb.translate(0, 0, -0.035);
        gb.rotateY(0.5 * s);
        A.add("screw", gb, SXP, by, ZA, i * PI / 2 + (s > 0 ? PI / 4 : 0), 0, 0);
      }
    }

    /* ---- deck fittings: the two round hatches on the fore deck (d_ysub), the after deck hatch (drawing) ---- */
    A.add("dark", deckPoly(THREE, circ(X(872), 0, 0.62, 14), 0.04), 0, 0, 0);
    A.add("tile", deckPoly(THREE, circ(X(872), 0, 0.48, 14), 0.06), 0, 0, 0);
    A.add("dark", deckPoly(THREE, circ(X(861), 0, 0.42, 12), 0.04), 0, 0, 0);
    A.add("dark", deckPoly(THREE, circ(X(386), 0, 0.5, 12), 0.04), 0, 0, 0);

    /* ---- modest team patches: fore deck, after deck, sail roof ---- */
    function deckRect(x0, x1, hy) {                         /* a rectangle draped on the crown, edges subdivided */
      var pts = [], k;
      for (k = 0; k <= 4; k++) pts.push([x0 + (x1 - x0) * k / 4, -hy]);
      for (k = 1; k <= 4; k++) pts.push([x1, -hy + 2 * hy * k / 4]);
      for (k = 1; k <= 4; k++) pts.push([x1 - (x1 - x0) * k / 4, hy]);
      for (k = 1; k < 4; k++) pts.push([x0, hy - 2 * hy * k / 4]);
      return pts;
    }
    A.add("team", deckPoly(THREE, deckRect(X(815), X(830), 0.8), 0.05), 0, 0, 0);
    A.add("team", deckPoly(THREE, deckRect(X(297), X(312), 0.8), 0.05), 0, 0, 0);
    A.add("team", new THREE.BoxGeometry(1.6, 1.6, 0.04), SX0 + 6.5, 0, ZT + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent (screw boss to bow): render3d scales a submarine by it. */
UNIT_MODELS["pact_e60_ssbn"] = {
  len: 129.8,
  build: function (THREE, M, C) { return HeroYankee667A.build(THREE, M, C); }
};
