/* ============ us_ohio_ssbn.js -- HERO model: Ohio-class SSBN / SSGN ============
   Two rows, one hull:
     - ssbn_n  "SSBN-726 Ohio-class": the Trident boat with twenty-four missile tubes in two rows
               of twelve. The row's text names Trident II D5; the C4 and D5 boats look the same
               from outside (the tubes were sized for D5 from the start), so the hull is one fit.
     - ssgn_n  "SSGN-726 (converted)": the same hull and tubes with ONE dry-deck shelter on the
               forward missile tubes, as the SSGN profile and two dated photographs show it.

   References (Wikimedia Commons, small renders, in scratchpad/q_ohio_ref):
     - "SSBN726 Ohio.svg" (port profile, bow right, Commons' own 1280 px render): THE source for
       every station. Hub tip 1 px, bow tip 1278 px, so with the published 560 ft (170.69 m) it is
       7.481 px/m; drawn isotropic (its 1 ft draft marks and its 35 ft boot top agree with that
       scale and with the published 35.5 ft maximum draught). Read off it: the long parallel body
       (keel flat 336-1136 px), the pressure hull circle about row 170 (47 px = 6.28 m radius;
       drawn here at the published 42 ft beam), the casing over it, which raises the deck 1.75 m
       above the circle on the missile deck (top flat at row 109 from 456 to 968 px) and ramps
       down abaft (290-456 px); the sail 969-1041 px, top at row 64, flat and flat-sided with
       vertical fore and after edges; the four raised masts and their heights; the sail plane's
       root airfoil at 56 per cent of the sail height; twelve hatch outlines 600-886 px; the
       long black line low on the flank (row 135, 310-1085 px); the bow-dome joint (1219 px); the
       cruciform stern: rudders 40-74 px, upper top row 122, lower to the keel line, the stern-
       plane END PLATES (41-74 px, rows 153-188) with the streamlined pod through them; the
       skewed single screw at the tail tip, 6.8 m across; the three groups of four flood grates
       low aft and the two panels low on the bow.
       (A QuickLook render of the same SVG was tried and found to shift the sail and deck
       fittings 5 m forward of where Commons' renderer puts them, so it was not used.)
     - "SSGN726 Ohio.svg" (same sheet, 1280 px): the dry-deck shelter, 814-904 px (12.0 m),
       top at row 83 (3.3 m over the deck), domed after door, rounded fore end; the SSGN's
       masts (plain finish, a ball-headed mast where the SSBN has a tall periscope).
     - "A port beam view of ... USS OHIO (SSBN-726) ... Hood" (1982) and "USS Michigan arrives in
       Busan ... (34135595341)" (SSGN, 24 April 2017): trim. The hull shows 0.47-0.48 of the sail's
       own height above the water at the sail, so the deck stands 2.85 m out of the water (the
       drawing's boot top would show 3.9 m); the planes at mid sail; the four dots abaft the sail.
     - "An aerial port quarter view of ... USS OHIO (SSBN-726) ... docking" (1982): the broad,
       flattened missile deck, the sail's narrow plan with a fine fore end, the long sail planes
       (span 5.4 times the sail's width) with round tips.
     - "USS Ohio (SSBN-726) hatches" (1981): two rows of twelve big hatches, a narrow walkway
       between the rows, flush lids.
     - "USS Pennsylvania prepares to moor in Apra Harbor, Guam" (31 October 2016): the anechoic
       tile patchwork, the broad top, the dark line along the flank just above the water.
     - "US Navy 061029-N-1683M-002" (USS Ohio SSGN, 26 October 2006): one shelter abaft the sail.
     - "US Navy 030814-N-0000X-001" (Ohio in dry dock, 2003): the round bow and hull section.

   Dimensions: 170.69 m long (560 ft), 12.8 m beam (42 ft), published. Trim off the photographs:
   the hull axis 5.31 m under the water line, the missile deck 2.85 m over it, the sail top 8.9 m.
   The keel then draws 11.7 m against the published 10.8 m maximum: the photographs' freeboard
   and the drawing's depth cannot both hold, and what shows above the water follows the photos.

   RECOGNITION (each one shows on the final sheets):
     1. The very long hull: a 108 m parallel body, a long fine run aft (SSBN726.svg; aerials).
     2. The long raised missile deck abaft the sail, flattened on top, ramping down aft
        (SSBN726.svg top line; 1982 aerial; Pennsylvania 2016).
     3. Twenty-four hatches, two rows of twelve, 3.21 m apart (SSBN726.svg; 1981 hatches).
     4. The sail set well forward (fore edge 31.7 m abaft the bow), tall, flat-sided, flat top
        (SSBN726.svg; Michigan 2017).
     5. The sail planes at mid height, long, round-tipped, reaching past the hull's sides
        (1982 aerial; Pennsylvania 2016; the root airfoil on SSBN726.svg).
     6. The masts: four raised on the sail, two of them tall periscopes (SSBN726.svg; 2016).
     7. The cruciform stern with END PLATES on the stern planes (SSBN726.svg).
     8. The single skewed screw at the tail tip (SSBN726.svg).
     9. The anechoic finish: matte black, rectangular tiles, tonal patchwork (Pennsylvania 2016).
    10. The dark line low along the flank under the missile deck (SSBN726.svg; 2016; 1982).
    11. SSGN only: the dry-deck shelter on the forward tubes (SSGN726.svg; Ohio 2006; Michigan
        2017), with its domed after door.
    12. The four dots on each flank abaft the sail (SSBN726.svg; 1982 beam view).

   ESTIMATED, not measured: the sail's width (2.9 m: the 1982 aerial gives width / plane span =
   0.185 and the 2016 bow view agrees, with the span taken as 15 m); the sail-plane span and
   taper; the stern-plane span (end plates 6.0 m out from the axis; no plan view or photograph
   of the stern was found); the hatch rows' offset (+-1.9 m, off the 1981 photograph); the
   casing's cross-section (a superellipse that flattens the top, fitted to the profile and the
   aerials); the screw's blade count (the profile shows a skewed screw but its blades cannot be
   counted: seven are drawn).
   NOT DRAWN: hull numbers, names, flags, draft marks and the white stern marks; the dazzle
   pattern the profile paints on the periscopes (photographs at sea show them dark); a second
   dry-deck shelter (the 2006 caption speaks of "dual" shelters, and the shelter there looks
   longer than the 2017 one, but that photograph is too far and too oblique to count them; the
   SSGN profile and the 2017 photograph show one). The rows are not turret:true, so nothing is named "turret"; the missile hatches
   are flush lids merged into the hull meshes, as ru_borei.js and ru_delta4.js draw theirs, and
   render3d opens none of them.
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a submarine by
   UNIT_MODELS[key].len, set to the measured X extent. Merged per material. Paint: the photos'
   sail black in shade is (53,53,52); taken to 0.9 for the ACES lift that is the #2d2f31 base
   (the same black as us_virginia_ssn.js). ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOhioSSBN = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 7.481;                     /* SSBN726.svg px per metre (1277 px = 170.69 m) */
  var XC = 639.5;                      /* drawing column of model x = 0 */
  var ZW = 130.3;                      /* drawing row of the water line (photographs' trim) */
  var AXR = 170;                       /* drawing row of the hull axis */
  var R = 6.4;                         /* pressure hull radius, 42 ft beam */
  var KB = R / ((217 - AXR) / PXM);    /* the drawing's 6.28 m circle drawn at the published beam */
  function X(c) { return (c - XC) / PXM; }
  function Z(r) { return (ZW - r) / PXM; }
  var ZA = Z(AXR);                     /* -5.31 */

  /* [drawing column, top row, keel row] off the profile, fins and sail left out (the tail cone
     under the fins, 38-84 px, is interpolated); the first rows are the screw's hub */
  var STA = [
    [0.6, 169.4, 170.6], [2, 166.5, 173], [6, 165, 174.5], [10, 164, 176], [14, 163, 177],
    [20, 161, 178], [26, 160, 180], [32, 158, 181], [38, 157, 183], [50, 154, 186], [62, 151, 189],
    [74, 148.5, 191], [84, 147, 192], [96, 145, 195], [112, 142, 198], [128, 139, 200],
    [144, 137, 203], [160, 134, 205], [176, 132, 207], [192, 131, 209], [208, 129, 210],
    [224, 128, 211], [240, 127, 213], [256, 126, 214], [272, 125, 214], [288, 124, 215],
    [296, 122.5, 215], [304, 121, 216], [312, 120, 216], [320, 118.5, 216.5], [336, 116.5, 217],
    [352, 115, 217], [368, 114, 217], [384, 112.5, 217], [408, 111, 217], [424, 110, 217],
    [440, 109.4, 217], [456, 109, 217], [600, 109, 217], [760, 109, 217], [968, 109, 217],
    [1000, 110, 217], [1048, 112, 217], [1072, 113.5, 217], [1096, 115, 217], [1120, 116.5, 217],
    [1136, 118, 217], [1144, 119, 216.4], [1160, 121, 215.2], [1176, 123, 214], [1192, 125, 212.3],
    [1208, 128, 210], [1219, 130.5, 208], [1230, 133.3, 205.5], [1240, 136, 203],
    [1248, 139.3, 200], [1254, 142, 197.5], [1259, 144.8, 194.6], [1264, 148, 192],
    [1268, 151, 188.8], [1271, 154, 186], [1273.5, 157, 183], [1275.5, 160, 180],
    [1277, 163, 176.8], [1278, 166, 173.6], [1278.6, 169.2, 170.6]
  ];
  var TAB = [], ti;
  for (ti = 0; ti < STA.length; ti++) {
    var tUp = (AXR - STA[ti][1]) / PXM, tR = Math.min(R, (STA[ti][2] - AXR) / PXM * KB);
    /* the casing: its height over the pressure-hull circle flattens the top (p 2 -> 3) */
    var hc = Math.max(0, tUp - tR), tp = 2 + Math.min(1, hc / 1.75);
    TAB.push([X(STA[ti][0]), tR, Math.max(tUp, tR * 0.94), tp]);
  }
  var XS = TAB[0][0], XB = TAB[TAB.length - 1][0];

  function tabAt(x, k) {
    var i;
    if (x <= TAB[0][0]) return TAB[0][k];
    for (i = 1; i < TAB.length; i++) {
      if (x <= TAB[i][0]) {
        var a = TAB[i - 1], b = TAB[i], t = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * t;
      }
    }
    return TAB[TAB.length - 1][k];
  }
  function hullR(x) { return tabAt(x, 1); }
  function hullUp(x) { return tabAt(x, 2); }
  function hullP(x) { return tabAt(x, 3); }
  /* the upper surface at lateral offset y, and the half-breadth at height z */
  function topAt(x, y) {
    var r = hullR(x), u = Math.min(Math.abs(y) / r, 0.9999), p = hullP(x);
    return ZA + hullUp(x) * Math.pow(1 - Math.pow(u, p), 1 / p);
  }
  function sideY(x, z) {
    var r = hullR(x), d = z - ZA;
    if (d < 0) return Math.sqrt(Math.max(0.0001, r * r - d * d));
    var u = Math.min(d / hullUp(x), 0.9999), p = hullP(x);
    return r * Math.pow(1 - Math.pow(u, p), 1 / p);
  }

  /* ---------------------------------------------------------------- textures */
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  var _tex = {};

  /* Hull skin: u runs stern to bow over the loft (XS..XB), v round the girth (0.25 crown).
     Rectangular tiles in courses, replaced tiles a shade off in blocks (the Pennsylvania
     photograph of 2016), and the bow dome forward of its joint (1219 px) smooth. */
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(72601), i, j;
    g.fillStyle = "#2d2f31"; g.fillRect(0, 0, W, H);
    var L = XB - XS, xd = (X(1219) - XS) / L * W;       /* dome joint column */
    var NC = 32, tw = 1.5 / L * W, th = H / NC;          /* ~1.5 m tiles, 32 courses */
    for (j = 0; j < NC; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < xd; i++) {
        var x0 = i * tw + off, x1 = Math.min(x0 + tw, xd);
        if (x1 <= 0) continue;
        var v = R1();
        g.fillStyle = v < 0.5 ? "rgba(255,255,255," + (0.008 + R1() * 0.024).toFixed(3) + ")"
                              : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect(x0 + 0.5, j * th + 0.5, x1 - x0 - 1.0, th - 1.0);
      }
    }
    /* patchwork: blocks of replaced tiles, more of them on the upper works */
    for (i = 0; i < 70; i++) {
      var bx = R1() * (xd - 30), by = R1() * H, bw = tw * (2 + Math.floor(R1() * 6)), bh = th * (1 + Math.floor(R1() * 3));
      g.fillStyle = R1() < 0.55 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.10)";
      g.fillRect(bx, by, Math.min(bw, xd - bx), bh);
    }
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1;
    for (j = 0; j <= NC; j++) { g.beginPath(); g.moveTo(0, j * th); g.lineTo(xd, j * th); g.stroke(); }
    for (j = 0; j < NC; j++) {
      var o2 = (j % 2) ? tw * 0.5 : 0;
      for (i = 0; i * tw + o2 < xd; i++) {
        g.beginPath(); g.moveTo(i * tw + o2, j * th); g.lineTo(i * tw + o2, (j + 1) * th); g.stroke();
      }
    }
    g.fillStyle = "#28292c"; g.fillRect(xd, 0, W - xd, H);
    g.fillStyle = "rgba(0,0,0,0.55)"; g.fillRect(xd - 1, 0, 2, H);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex.hull = t;
    return t;
  }

  /* 2 m tile patch for parts with metre UVs: the sail, planes, fins, shelter */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d");
    var R1 = rng(4417), i, j;
    g.fillStyle = "#2c2e30"; g.fillRect(0, 0, S, S);
    for (j = 0; j < 3; j++) {
      for (i = 0; i < 2; i++) {
        var o = (j % 2) ? 32 : 0;
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.010 + R1() * 0.026).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.05).toFixed(3) + ")";
        g.fillRect((i * 64 + o) % S + 1, j * 43 + 1, 62, 41);
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.36)"; g.lineWidth = 1.2;
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

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      tile:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.9, metalness: 0.05 }),
      dark:  std(0x0e1012, 0.80, 0.20),     /* the flank line, hatch rims, grates, recesses */
      panel: std(0x3b3f43, 0.85, 0.10),     /* hatch lids, the bow-dome band, panels */
      metal: std(0x3a4147, 0.55, 0.45),     /* masts, the screw */
      cap:   std(0x8d9398, 0.70, 0.10),     /* periscope heads, the pale mast tops */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* ------------------------------------------------------ merge machinery */
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

  /* make a closed (or nearly closed) indexed body wind outward: flip it if its signed
     volume is negative */
  function outward(g) {
    var P = g.attributes.position.array, ix = g.getIndex(), a = ix.array, v = 0, i;
    for (i = 0; i < a.length; i += 3) {
      var i0 = a[i] * 3, i1 = a[i + 1] * 3, i2 = a[i + 2] * 3;
      var ax = P[i0], ay = P[i0 + 1], az = P[i0 + 2], bx = P[i1], by = P[i1 + 1], bz = P[i1 + 2];
      var cx = P[i2], cy = P[i2 + 1], cz = P[i2 + 2];
      v += ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx);
    }
    if (v < 0) {
      for (i = 0; i < a.length; i += 3) { var t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      ix.needsUpdate = true;
    }
    g.computeVertexNormals();
    return g;
  }

  /* the hull: lower half the pressure-hull circle, upper half a superellipse of exponent p
     over the casing; u along the length, v round the girth from the port side over the top */
  function hullGeo(THREE, secs, segs) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < secs.length; i++) {
      var s = secs[i];
      for (j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, c = Math.cos(t), sn = Math.sin(t);
        var up = sn >= 0, e = up ? 2 / s.p : 1;
        var y = s.r * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e);
        var z = ZA + (up ? s.up : s.r) * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e);
        pos.push(s.x, y, z);
        uv.push((s.x - XS) / (XB - XS), j / segs);
      }
    }
    var ring = segs + 1;
    for (i = 0; i < secs.length - 1; i++) {
      for (j = 0; j < segs; j++) {
        var a = i * ring + j, b = a + 1, cc = a + ring, d = cc + 1;
        idx.push(a, b, cc, b, d, cc);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    return outward(g);
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
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* flat extrusion of an outline (bevel off); xz: the outline is (x, z), thickness toward -y */
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

  /* spanwise loft of elliptic aerofoil sections: st = [[span, x of mid chord, chord, thickness]];
     axis "y" for a horizontal plane (thickness along z), "z" for a vertical fin (along y);
     the last section is closed with a cap; metre UVs */
  function foil(THREE, st, axis, c0, n) {
    var pos = [], uv = [], idx = [], i, j, L = st.length, ring = n + 1;
    for (i = 0; i < L; i++) {
      var sp = st[i][0], xm = st[i][1], ch = st[i][2], th = st[i][3];
      for (j = 0; j <= n; j++) {
        var f = j / n * PI * 2, ax = xm + ch / 2 * Math.cos(f), at = th / 2 * Math.sin(f);
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
    /* caps at both ends, wound to match the sides (each edge run both ways) */
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
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    /* the end caps fan with one winding; make the whole closed body face out */
    return outward(g);
  }

  /* thin patch on the hull flank: x0..x1, z0..z1 (z may follow a function of x), 'off' proud */
  function sidePatch(THREE, sign, x0, x1, z0, z1, off, nx) {
    nx = nx || 6;
    var nz = 2, pos = [], idx = [], i, j, x, z;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx;
        var zb = typeof z0 === "function" ? z0(x) : z0, zt = typeof z1 === "function" ? z1(x) : z1;
        z = zb + (zt - zb) * j / nz;
        pos.push(x, sign * (sideY(x, z) + off), z);
      }
    }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        if (sign > 0) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* thin patch on the crown: x0..x1, y0..y1 (y0 < y1), 'off' proud, normals up */
  function crownPatch(THREE, x0, x1, y0, y1, off, nx, ny) {
    var pos = [], idx = [], i, j, x, y;
    for (j = 0; j <= ny; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; y = y0 + (y1 - y0) * j / ny;
        pos.push(x, y, topAt(x, y) + off);
      }
    }
    for (j = 0; j < ny; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* a round hatch on the crown at (cx, cy), every vertex on the hull surface + off */
  function crownDisc(THREE, cx, cy, r0, r1, off, seg) {
    var pos = [], idx = [], k, a;
    for (k = 0; k <= seg; k++) {
      a = k / seg * PI * 2;
      var xo = cx + r1 * Math.cos(a), yo = cy + r1 * Math.sin(a);
      var xi = cx + r0 * Math.cos(a), yi = cy + r0 * Math.sin(a);
      pos.push(xo, yo, topAt(xo, yo) + off, xi, yi, topAt(xi, yi) + off);
    }
    for (k = 0; k < seg; k++) {
      var o = k * 2, iI = o + 1, o2 = o + 2, i2 = o + 3;
      if (r0 > 0) idx.push(o, o2, iI, iI, o2, i2); else idx.push(o, o2, iI);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function cylZ(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, PI / 2, 0, 0);
  }

  /* sail plan outline: elliptic nose of length ln, straight sides, rounded tail of length lt */
  function sailRing(xa, xf, hw, ln, lt, n) {
    var pts = [], k, a;
    var nn = Math.round(n * 0.25), ns = Math.round(n * 0.06), nt = n / 2 - nn - ns;
    for (k = 0; k < nn; k++) { a = k / nn * PI / 2; pts.push([xf - ln + ln * Math.cos(a), hw * Math.sin(a)]); }
    for (k = 0; k < ns; k++) { pts.push([xf - ln - (xf - ln - (xa + lt)) * k / ns, hw]); }
    for (k = 0; k < nt; k++) { a = k / nt * PI / 2; pts.push([xa + lt - lt * Math.sin(a), hw * Math.cos(a)]); }
    var half = pts.length, out = pts.slice();
    out.push([xa, 0]);
    for (k = half - 1; k >= 1; k--) out.push([pts[k][0], -pts[k][1]]);
    return out;
  }

  /* ---- the sail, off the profile: 969-1041 px, top row 64 ---- */
  var SX0 = X(969), SX1 = X(1041), SHW = 1.45, ZT = Z(64);
  var HX = X(611), HP = (X(875) - X(611)) / 11, HY = 1.9;    /* hatch rows */

  function build(THREE, M, C, ssgn) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, s, x, z;

    /* ---- hull: one lofted body, screw hub to bow ---- */
    var secs = [];
    for (i = 0; i < TAB.length; i++) secs.push({ x: TAB[i][0], r: TAB[i][1], up: TAB[i][2], p: TAB[i][3] });
    A.add("skin", hullGeo(THREE, secs, 44), 0, 0, 0);

    /* ---- the dark line low on the flank: the casing's foot, rising at the hump's after end
       (profile row 135 from 410 to 1010 px, 127 at 310 px); drawn just above the water,
       where the 1982 and 2016 photographs show it ---- */
    var lineZ = function (xx) {
      var c = xx * PXM + XC, rise = 0;
      if (c < 410) rise = (410 - c) / 100 * 1.07;
      if (c > 1010) rise = (c - 1010) / 75 * 0.25;
      return 0.02 + rise;
    };
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", sidePatch(THREE, s, X(312), X(1085), lineZ, function (xx) { return lineZ(xx) + 0.30; }, 0.08, 40), 0, 0, 0);
      /* the four dots abaft the sail (943-966 px, row 120) */
      for (k = 0; k < 4; k++) {
        x = X(944) + k * (X(966) - X(944)) / 3; z = Z(120);
        A.add("dark", new THREE.CircleGeometry(0.16, 8), x, s * (sideY(x, z) + 0.03), z, -s * PI / 2, 0, 0);
      }
      /* flood grates low aft, three groups of four (119-195 px), and the two bow panels */
      var GR = [[119, 140], [146, 168], [174, 195]];
      for (k = 0; k < GR.length; k++) {
        A.add("dark", sidePatch(THREE, s, X(GR[k][0]), X(GR[k][1]), function (xx) { return ZA - 0.86 * hullR(xx); },
                                function (xx) { return ZA - 0.72 * hullR(xx); }, 0.04, 4), 0, 0, 0);
      }
      A.add("panel", sidePatch(THREE, s, X(1137), X(1183), Z(193), Z(187), 0.05, 4), 0, 0, 0);
      A.add("panel", sidePatch(THREE, s, X(1153), X(1199), Z(183), Z(177), 0.05, 4), 0, 0, 0);
    }
    /* the bow-dome joint ring (1219 px) */
    var xj = X(1219);
    var jb = new THREE.CylinderGeometry(Math.max(hullR(xj + 0.2), hullUp(xj + 0.2)) + 0.06,
                                        Math.max(hullR(xj - 0.2), hullUp(xj - 0.2)) + 0.06, 0.4, 40, 1, true);
    A.add("panel", jb, xj, 0, ZA, 0, 0, -PI / 2);

    /* ---- twenty-four missile hatches, two rows of twelve (600-886 px; 1981 photograph);
       on the SSGN the shelter sits over the forward three pairs ---- */
    for (k = 0; k < 12; k++) {
      x = HX + k * HP;
      if (ssgn && k >= 9) continue;
      for (s = -1; s <= 1; s += 2) {
        A.add("dark", crownDisc(THREE, x, s * HY, 1.24, 1.45, 0.10, 18), 0, 0, 0);
        A.add("panel", crownDisc(THREE, x, s * HY, 0, 1.24, 0.09, 18), 0, 0, 0);
        /* the hinge block outboard of each lid */
        A.add("dark", new THREE.BoxGeometry(1.1, 0.30, 0.10), x, s * (HY + 1.48), topAt(x, s * (HY + 1.48)) + 0.06);
      }
    }
    /* the walkway between the rows */
    A.add("dark", crownPatch(THREE, HX - 1.6, HX + (ssgn ? 8 : 11) * HP + 1.6, -0.12, 0.12, 0.06, 12, 1), 0, 0, 0);
    /* the access hatch on the deck abaft the missile deck (538-564 px) */
    A.add("dark", crownPatch(THREE, X(538), X(564), -0.75, 0.75, 0.07, 4, 2), 0, 0, 0);
    A.add("panel", crownPatch(THREE, X(540), X(562), -0.62, 0.62, 0.09, 4, 2), 0, 0, 0);

    /* ---- the sail: flat-sided, flat top, fine fore end in plan (1982 aerial) ---- */
    var zc0 = topAt(SX1, 0);
    var zl = [1.6, 2.2, zc0 + 0.05, zc0 + 0.3, zc0 + 1.2, ZT - 0.5];
    var RT = 0.42, tops = [0.45, 0.76, 0.94, 1.0], rings = [];
    for (i = 0; i < tops.length; i++) zl.push(ZT - RT + RT * tops[i]);
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      var foot = Math.max(0, 1 - Math.max(0, z - zc0) / 0.5) * 0.14;      /* small fillet at the foot */
      var ee = Math.max(0, z - (ZT - RT)) / RT, sh = RT * (1 - Math.sqrt(Math.max(0, 1 - ee * ee)));
      rings.push({ z: z, pts: sailRing(SX0 + sh * 0.5 - foot, SX1 - sh + foot, SHW + foot - sh * 0.7, 2.7, 0.75, 56) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);
    /* bridge cockpit outline and the sail's cheek recesses (profile) */
    A.add("dark", new THREE.BoxGeometry(1.4, 1.1, 0.04), SX1 - 1.6, 0, ZT + 0.01);
    for (s = -1; s <= 1; s += 2) {
      A.add("dark", new THREE.BoxGeometry(0.9, 0.04, 0.8), X(1036), s * (SHW + 0.005), Z(78));
      A.add("dark", new THREE.BoxGeometry(0.55, 0.04, 0.55), X(985), s * (SHW + 0.005), Z(72));
      A.add("dark", new THREE.BoxGeometry(0.55, 0.04, 0.55), X(992), s * (SHW + 0.005), Z(72));
    }

    /* ---- sail planes: root airfoil 4.65 m at 56 per cent of the sail's height, span +-7.5 m
       with round tips (profile; 1982 aerial; 2016) ---- */
    var PZ = zc0 + 0.56 * (ZT - zc0), PXm = (SX0 + SX1) / 2 + 0.55;
    for (s = -1; s <= 1; s += 2) {
      var pst = [[0.6, PXm, 4.65, 0.58], [SHW, PXm, 4.65, 0.56], [3.5, PXm - 0.12, 4.45, 0.48],
                 [5.5, PXm - 0.25, 4.2, 0.40], [6.8, PXm - 0.34, 3.95, 0.33], [7.25, PXm - 0.38, 3.4, 0.27],
                 [7.48, PXm - 0.40, 2.3, 0.18], [7.55, PXm - 0.40, 0.9, 0.08]];
      for (i = 0; i < pst.length; i++) pst[i][0] *= s;
      if (s < 0) pst.reverse();
      A.add("tile", foil(THREE, pst, "y", PZ, 16), 0, 0, 0);
    }

    /* ---- masts off the profile: [first px, last px, top row, kind] ---- */
    var MS = ssgn ? [[987, 996, 33, "box"], [999, 1003, 27, "ball"], [1007, 1012, 4, "scope"], [1015, 1018, 23, "pole"]]
                  : [[986, 997, 35, "box"], [999, 1004, 1, "scope"], [1007, 1012, 4, "scope"], [1015, 1017, 22, "whip"]];
    for (k = 0; k < MS.length; k++) {
      var mx = (X(MS[k][0]) + X(MS[k][1])) / 2, mw = (X(MS[k][1]) - X(MS[k][0])) / 2, mt = Z(MS[k][2]), kd = MS[k][3];
      if (kd === "box") {
        cylZ(THREE, A, "metal", 0.42, 0.45, mt - 1.6 - ZT + 0.2, 12, mx, 0, (ZT + mt - 1.6) / 2 - 0.1);
        A.add("dark", new THREE.BoxGeometry(mw * 2, 0.85, 1.65), mx, 0, mt - 0.82);
        A.add("cap", new THREE.CylinderGeometry(0.28, 0.28, 0.06, 10), mx + mw - 0.25, 0.43, mt - 0.6, 0, 0, 0);
      } else if (kd === "scope") {
        /* periscope: the fat lower tube, the slim upper tube, a pale head */
        var zs = ZT + (mt - ZT) * 0.52;
        cylZ(THREE, A, "metal", 0.36, 0.38, zs - ZT + 0.2, 12, mx, 0, (ZT + zs) / 2 - 0.1);
        cylZ(THREE, A, "metal", 0.17, 0.22, mt - zs - 0.5, 10, mx, 0, (zs + mt - 0.5) / 2);
        cylZ(THREE, A, "cap", 0.15, 0.17, 0.55, 10, mx, 0, mt - 0.27);
      } else if (kd === "ball") {
        cylZ(THREE, A, "metal", 0.2, 0.24, mt - ZT - 0.4, 10, mx, 0, (ZT + mt - 0.4) / 2);
        A.add("cap", new THREE.SphereGeometry(0.34, 12, 8), mx, 0, mt - 0.32);
      } else if (kd === "pole") {
        cylZ(THREE, A, "metal", 0.22, 0.26, mt - ZT, 10, mx, 0, (ZT + mt) / 2);
        cylZ(THREE, A, "cap", 0.23, 0.23, 0.5, 10, mx, 0, mt - 0.3);
      } else {
        cylZ(THREE, A, "metal", 0.09, 0.15, mt - ZT, 8, mx, 0, (ZT + mt) / 2);
        A.add("metal", new THREE.SphereGeometry(0.16, 8, 6), mx, 0, mt);
      }
    }

    /* ---- cruciform stern off the profile: rudders 40-74 px, LE to the hull at 81 px;
       upper top row 122.5, lower to the keel line ---- */
    var up = [[X(40), ZA + 1.4], [X(40), Z(122.5)], [X(72), Z(122.5)], [X(74), Z(124)], [X(81.5), Z(146)], [X(83), ZA + 2.6]];
    A.add("tile", ext(THREE, up, 0.62, true), 0, 0.31, 0);
    /* the small fitting on the upper rudder's top (profile, 62-65 px) */
    A.add("tile", new THREE.BoxGeometry(0.45, 0.3, 0.3), X(63.5), 0, Z(122.5) + 0.14);
    var lo = [[X(40), ZA - 1.4], [X(83), ZA - 2.6], [X(81.5), Z(194)], [X(74), Z(215.5)], [X(72), Z(217)], [X(40), Z(217)]];
    A.add("tile", ext(THREE, lo, 0.62, true), 0, 0.31, 0);
    /* stern planes out to the END PLATES (41-74 px, rows 153-188); span estimated */
    var EY = 6.0, ex0 = X(41), ex1 = X(74.4);
    for (s = -1; s <= 1; s += 2) {
      var spl = [[1.0 * s, (ex0 + ex1) / 2, ex1 - ex0, 0.62], [EY * s, (ex0 + ex1) / 2 + 0.05, ex1 - ex0 - 0.1, 0.46]];
      if (s < 0) spl.reverse();
      A.add("tile", foil(THREE, spl, "y", ZA, 12), 0, 0, 0);
      /* the end plate: an upright aerofoil slab 4.6 m tall */
      var epl = [[Z(188), (ex0 + ex1) / 2, ex1 - ex0, 0.30], [Z(153), (ex0 + ex1) / 2, ex1 - ex0, 0.30]];
      A.add("tile", foil(THREE, epl, "z", s * (EY + 0.1), 12), 0, 0, 0);
      /* the streamlined pod through the plate: a rod aft (28 px), the fat nose forward (97 px) */
      var pod = [[X(28), 0.02], [X(30), 0.22], [X(45), 0.27], [X(62), 0.30], [X(70), 0.50], [X(76), 0.62],
                 [X(84), 0.60], [X(91), 0.45], [X(95.5), 0.22], [X(97.5), 0.02]];
      var pp = [], pi2;
      for (pi2 = 0; pi2 < pod.length; pi2++) pp.push(new THREE.Vector2(pod[pi2][1], pod[pi2][0]));
      var pl = outward(new THREE.LatheGeometry(pp, 12));
      pl.rotateZ(-PI / 2);
      A.add("tile", pl, 0, s * (EY + 0.42), ZA);
    }

    /* ---- the screw: hub cone is the loft's tail; seven skewed blades (count not confirmed),
       disc 6.8 m (profile rows 144-195) at 9-19 px ---- */
    var bl = [[0.85, -0.55], [1.6, -0.75], [2.4, -0.72], [3.0, -0.45], [3.38, 0.05], [3.3, 0.55],
              [2.8, 0.95], [2.0, 1.05], [1.3, 0.85], [0.85, 0.55]];
    var bx = X(14);
    for (k = 0; k < 7; k++) {
      var bg = ext(THREE, bl, 0.10);                 /* outline in (radius, chord), thickness z */
      bg.translate(0, 0, -0.05);
      /* radius -> z, chord -> x, thickness -> y; then pitch the chord about the radius */
      bg.applyMatrix4(new THREE.Matrix4().set(0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1));
      bg.rotateZ(0.62);
      A.add("metal", bg, bx, 0, ZA, k * 2 * PI / 7, 0, 0);
    }

    /* ---- SSGN: the dry-deck shelter on the forward tubes (SSGN726.svg 814-904 px, top row 83;
       Ohio 2006, Michigan 2017) ---- */
    if (ssgn) {
      var dx0 = X(814), dx1 = X(904), dtop = Z(83.5), drad = 1.45, dzc = dtop - drad;
      var dp = [[0.02, dx0], [0.55, dx0 + 0.06], [0.95, dx0 + 0.2], [1.25, dx0 + 0.42], [1.40, dx0 + 0.66],
                [1.45, dx0 + 0.95], [1.45, dx1 - 0.9], [1.40, dx1 - 0.55], [1.25, dx1 - 0.28], [0.9, dx1 - 0.09],
                [0.02, dx1]];
      var dl = [];
      for (i = 0; i < dp.length; i++) dl.push(new THREE.Vector2(dp[i][0], dp[i][1]));
      var dds = outward(new THREE.LatheGeometry(dl, 24));
      dds.rotateZ(-PI / 2);
      var dua = dds.attributes.uv;
      for (i = 0; i < dua.count; i++) dua.setXY(i, dua.getX(i) * 9.1, dua.getY(i) * 12.0);
      A.add("tile", dds, 0, 0, dzc);
      /* the door joint at the after dome, and hoops along the shelter */
      A.add("dark", new THREE.TorusGeometry(1.44, 0.05, 4, 28), dx0 + 0.95, 0, dzc, 0, PI / 2, 0);
      for (k = 1; k <= 3; k++) A.add("dark", new THREE.TorusGeometry(1.46, 0.035, 3, 24), dx0 + 0.95 + k * 2.6, 0, dzc, 0, PI / 2, 0);
      /* the saddle it sits on, down into the casing */
      var sr = [];
      var sdz = [topAt(dx0 + 0.6, 0) - 0.6, dzc - 0.2];
      for (i = 0; i < sdz.length; i++) {
        var w2 = i === 0 ? 1.45 : 1.25;
        sr.push({ z: sdz[i], pts: [[dx0 + 0.6, -w2], [dx1 - 0.5, -w2], [dx1 - 0.5, w2], [dx0 + 0.6, w2]] });
      }
      A.add("tile", shell(THREE, sr), 0, 0, 0);
    }

    /* ---- modest team strips on the deck fore and aft of the sail, and on the sail top ---- */
    A.add("team", crownPatch(THREE, 62.0, 66.0, -0.55, 0.55, 0.05, 2, 2), 0, 0, 0);
    A.add("team", crownPatch(THREE, -30.0, -26.0, -0.55, 0.55, 0.05, 2, 2), 0, 0, 0);
    A.add("team", new THREE.BoxGeometry(1.4, 1.2, 0.04), SX0 + 2.6, 0, ZT + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent (screw hub tip to bow): render3d scales a submarine by it. */
UNIT_MODELS["ssbn_n"] = {
  len: 170.83,
  build: function (THREE, M, C) { return HeroOhioSSBN.build(THREE, M, C, false); }
};
UNIT_MODELS["ssgn_n"] = {
  len: 170.83,
  build: function (THREE, M, C) { return HeroOhioSSBN.build(THREE, M, C, true); }
};
