/* ==================== js/hero/ru_sverdlov.js ============================
   HERO MODEL -- Project 68bis "Sverdlov" class gun cruiser as completed
   and photographed 1952-1956 (key pact_e50_cruiser).  REDO 2026-10-24:
   the hull lofted from a section table scaled off the recognition
   profile, the long forecastle deck with its break abaft X turret, the
   tower bridge as the 1953 photograph shows it (stepped bridge tiers, a
   round tower column, the gallery and the KDP2-8 director on top), the
   tripod fore- and mainmasts (the old model had poles), the oval funnels
   with their raked black caps, the SPN-500 posts, the planked decks.
   Length overall 210 m, beam 22 m, draught 6.9 m mean / 7.3 m maximum
   (Russian Wikipedia "Kreisera proekta 68-bis": 209.98 x 22 m, 205 x
   21.2 x 6.9 m on the waterline).

   REFERENCES (Wikimedia Commons, fetched at width 960):
     [P] "Sverdlov-class cruiser profile 1986.png" - recognition profile,
         hull 936 px = 210 m (4.457 px/m), waterline y 214.  A LATER
         drawing: only the hull and the gun, funnel, mast and tower
         stations were taken from it.  Quarterdeck 4.3 m; the forecastle
         deck 6.5 m, 7.0 m near the stem, the stem head 8.3 m; the break
         of the forecastle just abaft X turret (x -55..-57); turrets
         A +68.5, B +54.5, X -50, Y -64.5; B roof 3.1 m over A, X roof
         2.2 m over Y; the tower x +30..+45, the foremast +29.5, the fore
         funnel +16..+23, the mainmast -5.8, the after funnel -16..-9,
         the after director tower about -24.  Its 1960s-80s lattice mast,
         radars and radomes are NOT drawn.
     [C] "Sverdlov at the Coronation Naval Review 1953 IWM A 32576.jpg"
         (high starboard quarter, 1953): pale grey ship, stepped bridge
         tiers with open wings, the round tower column with a gallery and
         the director with its rangefinder arms on top, the TRIPOD foremast
         close abaft the tower, the oval fore funnel with a black raked
         cap, the boats and the long boat derrick on the TRIPOD mainmast,
         the after funnel, the after director, decks pale.
     [H] "Bezoek Russische vlootsmaldeel Kruiser Sverdlov passeert de Hoek
         van Holland" 907-9020 and 907-9022 (Nationaal Archief, 1956,
         broadside views): the same layout, the turret pairs at both ends,
         the funnel caps sloping down aft, the rows of scuttles in the
         hull, the yards and small arrays on both mastheads.
     [A] "Soviet cruiser Sverdlov in 1974.jpeg" (USN, colour, from above):
         the plan - planked decks, the narrow superstructure with wide side
         decks, the SM-5-1 twins and the white SPN-500 post along the side,
         boats between the funnels; deck rgb 206,166,131 in sun.
     [K] "Mikhail Kutuzov in Novorossiysk, 2012.jpg" (the preserved ship):
         the tower shape and the turret faces; her later grey and fittings
         are NOT used.
     [W] Russian Wikipedia (above): 4 x 3 152 mm B-38 in MK-5bis turrets,
         6 x 2 100 mm SM-5-1, 16 x 2 37 mm V-11M, 2 x 5 533 mm tubes,
         2 x KDP2-8-III directors, 2 x SPN-500 posts with Yakor-M, two
         Zalp sets, search radar Gyuis-2 (or later Kliver / Kil), Rif; two
         shafts with 4.58 m screws.

   RECOGNITION LIST (where each shows):
     1. Long, low 210 m hull, the forecastle deck running to X turret and
        the lower quarterdeck aft, raked clipper stem, round cruiser stern
        [P][H] - STA, the break bulkhead.
     2. Four triple 152 mm MK-5bis turrets, A/B forward with B superfiring,
        X/Y aft with X superfiring; flat roofs, sloped faces, the
        rangefinder ears at the after corners [P][C][K][W] - mk5().
     3. The tower bridge: three stepped tiers, open wings, a round column
        with a gallery and the KDP2-8 director (8 m rangefinder arms) on top
        [C][H][K] - the "tower" block.
     4. The tripod foremast just abaft the tower, with its yard and a
        dipole array [C][H] - foremast.
     5. Two oval funnels with black caps sloping aft, the fore one close
        abaft the tower [C][H][P] - funnel().
     6. The tripod mainmast ahead of the after funnel with the long boat
        derrick and boats between the funnels [C][A] - mainmast.
     7. The after director tower with the second KDP2-8 [P][C][H].
     8. Six twin SM-5-1 100 mm mounts along the sides and the two SPN-500
        posts [A][W] - sm51(), spn500().
     9. Twin 37 mm V-11M mounts on the bridge, funnel and after decks [W].
    10. Paint: pale grey hull and upperworks [C], black funnel caps and
        boot topping, planked decks [A][K]; scuttles in the hull [H].
   NOT CONFIRMED and therefore approximate or not drawn: the exact x of
   the SM-5-1 mounts and of the sixteen V-11M (spread as [A] and [C]
   suggest, count from [W]); the radar types (a dipole array on each
   masthead stands for Gyuis-2 / Rif, which the photographs are too small
   to identify); the two torpedo tube banks (not visible in any reference,
   so NOT drawn); the rudder count. No pennant number, name, ensign or
   jack is painted.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The
   group named "turret" is A turret (the forward triple 152 mm MK-5bis),
   the mount of the row's first weapon w_e50_pact_cruiser; everything else
   is baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSverdlov = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -105.0, XS1 = 105.0, XWL = 101.6;   /* stern, stem head, stem at the waterline [P] */
  var XBRK = -57.0;                              /* break of the forecastle [P] */

  /* HULL SECTION TABLE [P][W]: x, deck z, half beam at the deck edge,
     half beam at the waterline, bottom z on the centreline, bilge power */
  var STA = [
    [-105.0, 4.20, 5.20, 3.60,  1.60, 2.2],
    [-103.0, 4.24, 6.90, 5.60,  0.20, 2.3],
    [ -99.0, 4.26, 8.40, 7.40, -2.40, 2.4],
    [ -92.0, 4.28, 9.60, 8.90, -4.60, 2.5],
    [ -82.0, 4.30, 10.45, 10.0, -6.00, 2.7],
    [ -70.0, 4.32, 10.90, 10.5, -6.60, 2.9],
    [ -57.3, 4.34, 11.00, 10.6, -6.85, 3.0],
    [ -56.7, 6.40, 11.00, 10.6, -6.85, 3.0],
    [ -30.0, 6.40, 11.00, 10.6, -6.90, 3.2],
    [   0.0, 6.42, 11.00, 10.6, -6.90, 3.2],
    [  25.0, 6.46, 10.92, 10.5, -6.90, 3.1],
    [  45.0, 6.52, 10.50, 10.0, -6.85, 2.9],
    [  60.0, 6.56, 9.70, 9.00, -6.70, 2.6],
    [  72.0, 6.66, 8.55, 7.50, -6.30, 2.3],
    [  82.0, 6.80, 7.05, 5.60, -5.50, 2.0],
    [  90.0, 6.94, 5.40, 3.70, -4.30, 1.7],
    [  96.0, 7.06, 3.85, 2.10, -2.90, 1.5],
    [  99.5, 7.16, 2.60, 0.90, -1.40, 1.35],
    [ 101.6, 7.22, 1.70, 0.00,  0.00, 1.3],
    [ 105.0, 7.30, 0.20, 0.00,  0.00, 1.2]
  ];
  function pick(x, k) {
    var i;
    if (x <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
      var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[k] + (b[k] - a[k]) * f;
    }
    return STA[STA.length - 1][k];
  }
  function deckZ(x) { return pick(x, 1); }
  function halfB(x) { return pick(x, 2); }
  /* the clipper stem: from the waterline at XWL curving forward to the
     stem head, steep low down and reaching forward near the top [P] */
  function zBot(x) {
    if (x > XWL) return deckZ(XS1) * Math.pow((x - XWL) / (XS1 - XWL), 1.45);
    return pick(x, 4);
  }
  function W(x, z) {
    var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.55);
    if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.4);
    var n = pick(x, 5), t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  function roofZ(x) { return deckZ(x) + 2.6; }

  /* ---------------------------------------------------------- textures */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvasTex(THREE, key, W0, H0, draw) {
    if (TEX[key]) return TEX[key];
    var cv = document.createElement("canvas"); cv.width = W0; cv.height = H0;
    draw(cv.getContext("2d"), W0, H0);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }
  /* hull side over its whole length: u = (x + 105) / 210, v = z / 10.
     Strakes, butts, the scuttle rows [H] (two rows forward of the break,
     one aft), weathering streaks. */
  function hullTex(THREE) {
    return canvasTex(THREE, "hull", 2048, 128, function (g, w, h) {
      var R = rng(6868), i, x, y;
      var U = function (xm) { return (xm + 105) / 210 * w; }, V = function (zm) { return h - zm / 10 * h; };
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 6; i++) { y = V(i * 1.4); g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
      for (x = -102; x < 105; x += 6.5) { g.beginPath(); g.moveTo(U(x), 0); g.lineTo(U(x), h); g.stroke(); }
      g.globalAlpha = 0.06;
      for (i = 0; i < 120; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, 1 + R() * 3, 10 + R() * 50);
      }
      g.globalAlpha = 0.85; g.fillStyle = "#15191c";
      for (x = -98; x < 92; x += 3.2) {
        if (x > -62 && x < -52) continue;
        var zz = x < XBRK ? [2.9] : [3.0, 5.1];
        if (x > 60) zz = [3.4, 5.3];
        for (i = 0; i < zz.length; i++) { g.beginPath(); g.arc(U(x), V(zz[i]), 1.6, 0, 6.3); g.fill(); }
      }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "plate", 256, 256, function (g, w, h) {
      var R = rng(6117), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 26; i++) {
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30);
      }
      g.globalAlpha = 1;
    });
  }
  /* planked deck [A][K]: one tile 8 x 8 m, planks fore and aft about
     15 cm wide with staggered butts and seams */
  function deckTex(THREE) {
    return canvasTex(THREE, "deck", 512, 512, function (g, w, h) {
      var R = rng(6801), i, j, py = h / 52;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      for (i = 0; i < 52; i++) {
        g.globalAlpha = 0.05 + R() * 0.08; g.fillStyle = R() < 0.5 ? "#000000" : "#ffffff";
        g.fillRect(0, i * py, w, py);
      }
      g.globalAlpha = 0.3; g.fillStyle = "#000000";
      for (i = 0; i <= 52; i++) g.fillRect(0, i * py - 0.5, w, 1);
      g.globalAlpha = 0.22;
      for (i = 0; i < 52; i++) for (j = 0; j < 3; j++) g.fillRect(((j + (i % 4) * 0.25) * w / 3) % w, i * py, 1, py);
      g.globalAlpha = 1;
    });
  }
  /* funnel cap top and the grille openings */
  function grilleTex(THREE) {
    return canvasTex(THREE, "grille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1a1c1d"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#050606";
      for (i = 0; i < 12; i++) g.fillRect(6, 6 + i * 10, w - 12, 6);
    });
  }

  /* paint: [C] 1953 hull reads rgb 192,192,192 in a bright print, [A]
     1974 hull about 105-136 in haze; the 1950s light grey taken to about
     0.8 of the print -> 0x979ea3; the house a touch lighter; the planked
     deck [A] 206,166,131 in sun greyed toward the pale 1953 print [C] -> 0x9a8a74 */
  var PAINT = { hull: 0x979ea3, sup: 0x9ea5a9, deck: 0x9a8a74, cap: 0x141516 };
  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(PAINT.hull, hullTex(THREE), 0.86),
      boot:  skin(0x0c0d0f, plateTex(THREE), 0.9),
      under: skin(0x3d1813, plateTex(THREE), 0.9),
      sup:   skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:  skin(PAINT.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5f666c, 0.52, 0.5),
      cap:   metal(PAINT.cap, 0.75, 0.25),
      gun:   metal(0x8e959a, 0.5, 0.45),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x05090b, roughness: 0.1, metalness: 0,
                                              transparent: true, opacity: 0.84 })
    };
  }
  function sealMats(M) {
    for (var k in M) if (M.hasOwnProperty(k)) {
      M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ------------------------------------------------------------ helpers */
  function geoOf(THREE, pos, uv, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    if (idx) g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function box(THREE, p, lx, ly, lz, m, x, y, z, rz) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (rz) b.rotation.z = rz; p.add(b); return b;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open); g.rotateZ(-PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylY(THREE, p, r, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg, 1), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* box with 8 given corners (bottom 0-3, top 4-7, CCW from above) */
  function hexa(THREE, p, m, V) {
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16);
      else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var ax = lx0 / 2, ay = ly0 / 2, bx = lx1 / 2, by = ly1 / 2, hz = lz / 2;
    return hexa(THREE, p, m, [[x - ax, y - ay, z - hz], [x + ax, y - ay, z - hz], [x + ax, y + ay, z - hz], [x - ax, y + ay, z - hz],
                              [x - bx, y - by, z + hz], [x + bx, y - by, z + hz], [x + bx, y + by, z + hz], [x - bx, y + by, z + hz]]);
  }
  /* convex polygon (CCW from above) extruded z0..z1 */
  function polyPrism(THREE, p, m, pts, z0, z1) {
    var pos = [], uv = [], n = pts.length, i, a, b;
    function tri(P, Q, R, side) {
      var k, v = [P, Q, R];
      for (k = 0; k < 3; k++) {
        pos.push(v[k][0], v[k][1], v[k][2]);
        if (side) uv.push(v[k][0] * 0.16 + v[k][1] * 0.16, v[k][2] * 0.16); else uv.push(v[k][0] * 0.16, v[k][1] * 0.16);
      }
    }
    for (i = 1; i < n - 1; i++) {
      tri([pts[0][0], pts[0][1], z1], [pts[i][0], pts[i][1], z1], [pts[i + 1][0], pts[i + 1][1], z1], false);
      tri([pts[0][0], pts[0][1], z0], [pts[i + 1][0], pts[i + 1][1], z0], [pts[i][0], pts[i][1], z0], false);
    }
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      tri([a[0], a[1], z0], [b[0], b[1], z0], [b[0], b[1], z1], true);
      tri([a[0], a[1], z0], [b[0], b[1], z1], [a[0], a[1], z1], true);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  /* a rounded-end deck house plan: x0 (aft) .. x1 (fore), half width hw,
     the ends rounded with radius re (fore) and ra (aft) */
  function roundPlan(x0, x1, hw, rf, ra) {
    var pts = [], k, a;
    for (k = 0; k <= 4; k++) { a = -PI / 2 + k * PI / 8; pts.push([x1 - rf + Math.cos(a) * rf, Math.sin(a) * hw]); }
    pts[pts.length - 1][1] = 0;
    for (k = 1; k <= 4; k++) { a = k * PI / 8; pts.push([x1 - rf + Math.cos(a) * rf, Math.sin(a) * hw]); }
    for (k = 0; k <= 8; k++) { a = PI / 2 + k * PI / 8; pts.push([x0 + ra + Math.cos(a) * ra, Math.sin(a) * hw]); }
    return pts;
  }
  /* rings lofted along X (each ring a closed list of [y,z]); capped ends */
  function ringLoft(THREE, p, m, xs, rings, cap) {
    var pos = [], uv = [], idx = [], n = rings[0].length, i, j;
    for (i = 0; i < xs.length; i++) for (j = 0; j < n; j++) {
      pos.push(xs[i], rings[i][j][0], rings[i][j][1]); uv.push(xs[i] * 0.2, j / n);
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = a + n, d = b + n;
      idx.push(a, b, c, b, d, c);
    }
    if (cap) [0, xs.length - 1].forEach(function (i0, e) {
      var c0 = pos.length / 3, k, sy = 0, sz = 0;
      for (k = 0; k < n; k++) { sy += rings[i0][k][0]; sz += rings[i0][k][1]; }
      pos.push(xs[i0], sy / n, sz / n); uv.push(0, 0);
      for (k = 0; k < n; k++) {
        var q = i0 * n + k, r = i0 * n + (k + 1) % n;
        if (e === 0) idx.push(c0, r, q); else idx.push(c0, q, r);
      }
    });
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv, idx), m); p.add(mm); return mm;
  }
  function superRing(w, h, zc, e, n) {
    var r = [], j, t;
    for (j = 0; j < n; j++) {
      t = j / n * PI * 2;
      var c = Math.cos(t), s = Math.sin(t);
      r.push([w * Math.sign(c) * Math.pow(Math.abs(c), e), zc + h * Math.sign(s) * Math.pow(Math.abs(s), e)]);
    }
    return r;
  }

  /* ---------------------------------------------------------------- hull */
  function hullXs() {
    var xs = [], x, i;
    for (x = XS0; x < XS1 - 0.01; x += 5.0) xs.push(x);
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (x = 88; x < XS1; x += 2.0) xs.push(x);
    for (x = -105; x < -95; x += 2.0) xs.push(x);
    xs.push(XS1);
    xs.sort(function (a, b) { return a - b; });
    return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
  }
  /* one band of the shell between heights zlo and zhi, both sides; the
     topsides take the whole-length scuttle texture (uvMode "side") */
  function shellBand(THREE, m, zlo, zhi, rows, side) {
    var xs = hullXs(), pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
    for (s = -1; s <= 1; s += 2) {
      var base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        var x = xs[i], zb = zBot(x), zd = deckZ(x);
        var a = Math.min(Math.max(zlo, zb), zd), b = Math.min(Math.max(zhi, zb), zd);
        for (j = 0; j < NR; j++) {
          var z = a + (b - a) * j / rows;
          pos.push(x, s * W(x, z), z);
          if (side) uv.push((x + 105) / 210, z / 10); else uv.push(x / 24, z / 8);
        }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < rows; j++) {
        var p0 = base + i * NR + j, p1 = p0 + 1, p2 = p0 + NR, p3 = p2 + 1;
        if (s > 0) idx.push(p0, p1, p2, p1, p3, p2); else idx.push(p0, p2, p1, p1, p2, p3);
      }
    }
    var keep = [];
    for (i = 0; i < idx.length; i += 3) {
      var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
      var ux = pos[B] - pos[A], uy = pos[B + 1] - pos[A + 1], uz = pos[B + 2] - pos[A + 2];
      var vx = pos[Cc] - pos[A], vy = pos[Cc + 1] - pos[A + 1], vz = pos[Cc + 2] - pos[A + 2];
      var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
      if (cx * cx + cy * cy + cz * cz > 1e-8) keep.push(idx[i], idx[i + 1], idx[i + 2]);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, keep), m);
  }
  /* the weather decks edge to edge, planks along x (8 m tiles) */
  function deckSheet(THREE, m) {
    var xs = hullXs(), pos = [], uv = [], idx = [], i, j, NC = 4;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = halfB(x), z = deckZ(x);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, w * (1 - 2 * j / NC) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  /* the small round-stern transom face above the overhang */
  function transom(THREE, g, T) {
    var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, s, pos = [], uv = [], k;
    for (j = 0; j < N; j++) {
      var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
      var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1);
      pos.push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
      for (k = 0; k < 6; k++) uv.push(0.001, pos[pos.length - 18 + k * 3 + 2] / 10);
    }
    void s;
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.hull));
  }
  function edgeY(x) { return Math.max(0.1, halfB(x) - 0.2); }
  function railRun(THREE, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x);
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.02, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 2.4));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.03, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.022, 3);
    }
  }
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      if (!geo.attributes.normal) geo.computeVertexNormals();
      var id = o.material.uuid;
      if (!bins[id]) { bins[id] = { m: o.material, P: [], N: [], U: [] }; order.push(id); }
      var b = bins[id], pa = geo.attributes.position.array, na = geo.attributes.normal.array;
      var ua = geo.attributes.uv ? geo.attributes.uv.array : null, i;
      for (i = 0; i < pa.length; i++) { b.P.push(pa[i]); b.N.push(na[i]); }
      for (i = 0; i < pa.length / 3; i++) b.U.push(ua ? ua[i * 2] : 0, ua ? ua[i * 2 + 1] : 0);
    });
    var out = new THREE.Group();
    order.forEach(function (id) {
      var b = bins[id], g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.P, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.N, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.U, 2));
      var me = new THREE.Mesh(g, b.m); me.castShadow = true; me.receiveShadow = true; out.add(me);
    });
    return out;
  }

  /* ------------------------------------------------------------ fittings */
  /* MK-5bis triple 152 mm turret at rest pointing +X, origin on the ring
     centre at the barbette top [P][C][K]: house about 10.4 m long, 8.6 m
     wide, 3.1 m tall, sloped face and side plates, flat roof, the
     rangefinder ears at the after corners, three B-38 guns (57 calibres) */
  function mk5(THREE, g, T) {
    var s, i;
    cylZ(THREE, g, 4.4, 4.4, 0.3, 20, T.sup, 0, 0, 0.15);
    hexa(THREE, g, T.sup, [
      [-5.6, -4.3, 0.2], [4.6, -4.3, 0.2], [4.6, 4.3, 0.2], [-5.6, 4.3, 0.2],
      [-5.4, -3.9, 3.3], [3.0, -3.9, 3.3], [3.0, 3.9, 3.3], [-5.4, 3.9, 3.3]]);
    /* the face plate (slightly darker by its angle), gun ports */
    for (i = -1; i <= 1; i++) box(THREE, g, 0.3, 0.9, 1.5, T.dark, 4.1, i * 1.75, 1.35, 0);
    /* rangefinder ears: the 8 m DM-8 tube ends in hoods at the after corners */
    for (s = -1; s <= 1; s += 2) {
      hexa(THREE, g, T.sup, [
        [-4.4, s * 3.9 - 0.6, 2.0], [-2.6, s * 3.9 - 0.6, 2.0], [-2.6, s * 3.9 + 0.6, 2.0], [-4.4, s * 3.9 + 0.6, 2.0],
        [-4.3, s * 3.9 - 0.5, 3.0], [-2.8, s * 3.9 - 0.5, 3.0], [-2.8, s * 3.9 + 0.5, 3.0], [-4.3, s * 3.9 + 0.5, 3.0]].map(function (v) {
          return [v[0], s > 0 ? Math.max(v[1], 3.6) + (v[1] > 4 ? 0.6 : 0) : Math.min(v[1], -3.6) - (v[1] < -4 ? 0.6 : 0), v[2]];
        }));
      /* sighting hoods on the roof */
      box(THREE, g, 1.0, 0.8, 0.5, T.sup, 1.4, s * 2.6, 3.55);
      box(THREE, g, 1.0, 0.9, 0.12, T.metal, -2.0, s * 1.8, 3.36);
    }
    box(THREE, g, 1.6, 1.2, 0.35, T.sup, -3.6, 0, 3.47);
    var e = new THREE.Group(); e.position.set(3.0, 0, 1.45); e.rotation.y = -0.04; g.add(e);
    for (i = -1; i <= 1; i++) {
      cylX(THREE, e, 0.42, 0.48, 1.3, 10, T.sup, 1.9, i * 1.75, 0);           /* blast bag */
      cylX(THREE, e, 0.16, 0.23, 7.0, 10, T.gun, 6.0, i * 1.75, 0, true);     /* chase */
      cylX(THREE, e, 0.2, 0.2, 0.35, 10, T.gun, 9.4, i * 1.75, 0);            /* muzzle */
    }
    return g;
  }
  function barbette(THREE, g, T, x, z0, z1) {
    cylZ(THREE, g, 4.6, 4.75, z1 - z0 + 0.3, 24, T.sup, x, 0, (z0 + z1) / 2 - 0.15);
  }
  /* SM-5-1 twin 100 mm at rest pointing +X [A][W]: the closed shield with
     a rounded front and roof, about 5 m long */
  function sm51(THREE, g, T) {
    cylZ(THREE, g, 1.6, 1.75, 0.5, 12, T.sup, 0, 0, 0.25);
    var xs = [-2.6, -2.5, -1.6, 0.0, 1.4, 2.1, 2.45];
    var sec = [[1.3, 0.95, 1.35, 3.0], [1.45, 1.05, 1.4, 3.0], [1.55, 1.12, 1.42, 2.8], [1.55, 1.12, 1.42, 2.6],
               [1.45, 1.0, 1.38, 2.4], [1.25, 0.85, 1.3, 2.2], [0.9, 0.6, 1.25, 2.0]];
    ringLoft(THREE, g, T.sup, xs, sec.map(function (s) { return superRing(s[0], s[1], s[2] + 0.2, 2 / s[3], 12); }), true);
    box(THREE, g, 1.0, 0.7, 0.4, T.sup, -0.6, 0.9, 2.7);
    var s, bar = new THREE.Group(); bar.position.set(2.0, 0, 1.6); bar.rotation.y = -0.1; g.add(bar);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, bar, 0.12, 0.15, 5.4, 6, T.gun, 2.9, s * 0.45, 0, true);
      cylX(THREE, bar, 0.14, 0.14, 0.3, 6, T.gun, 5.5, s * 0.45, 0);
    }
    return g;
  }
  /* V-11M twin 37 mm in its open shield [W] */
  function v11(THREE, g, T) {
    var s;
    cylZ(THREE, g, 0.55, 0.7, 0.6, 6, T.sup, 0, 0, 0.3);
    hexa(THREE, g, T.sup, [[-0.9, -0.95, 0.6], [0.7, -0.95, 0.6], [0.7, 0.95, 0.6], [-0.9, 0.95, 0.6],
                           [-0.8, -0.85, 1.6], [0.95, -0.8, 1.6], [0.95, 0.8, 1.6], [-0.8, 0.85, 1.6]]);
    var e = new THREE.Group(); e.position.set(0.6, 0, 1.25); e.rotation.y = -0.35; g.add(e);
    for (s = -1; s <= 1; s += 2) cylX(THREE, e, 0.05, 0.07, 2.6, 4, T.gun, 1.3, s * 0.32, 0, true);
    return g;
  }
  /* KDP2-8-III director [C][W]: round drum on a short trunk with the 8 m
     rangefinder arms across it and their end hoods; a twin-dish Zalp
     antenna on its roof [W] */
  function kdp(THREE, g, T, x, z, r) {
    cylZ(THREE, g, r * 0.7, r * 0.75, 0.8, 14, T.sup, x, 0, z + 0.4);
    cylZ(THREE, g, r, r, 1.9, 18, T.sup, x, 0, z + 1.75);
    var d = new THREE.SphereGeometry(r, 18, 3, 0, PI * 2, 0, PI * 0.42); d.scale(1, 0.4, 1);
    var dm = new THREE.Mesh(d, T.sup); dm.rotation.x = PI / 2; dm.position.set(x, 0, z + 2.7); g.add(dm);
    cylY(THREE, g, 0.24, 8.0, 8, T.sup, x - 0.2, 0, z + 2.0);
    box(THREE, g, 0.9, 0.7, 0.9, T.sup, x - 0.2, 4.1, z + 2.0);
    box(THREE, g, 0.9, 0.7, 0.9, T.sup, x - 0.2, -4.1, z + 2.0);
    box(THREE, g, 0.12, r * 1.2, 0.3, T.dark, x + r - 0.02, 0, z + 1.9);
    /* Zalp: two small dishes side by side, facing forward */
    var s;
    box(THREE, g, 0.6, 1.6, 0.5, T.metal, x - 0.3, 0, z + 3.35);
    for (s = -1; s <= 1; s += 2) {
      var dg = new THREE.SphereGeometry(0.75, 12, 3, 0, PI * 2, 0, PI / 3.2);
      dg.rotateZ(-PI / 2); dg.scale(0.35, 1, 1);
      var dd = new THREE.Mesh(dg, T.metal); dd.position.set(x + 0.15, s * 0.8, z + 3.75); g.add(dd);
    }
  }
  /* SPN-500 stabilised post [A][W]: tall drum with a domed top and the
     Yakor-M dish (Sun Visor) on its roof */
  function spn500(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 1.05, 1.25, 2.8, 14, T.sup, x, y, z + 1.4);
    var d = new THREE.SphereGeometry(1.05, 14, 4, 0, PI * 2, 0, PI / 2);
    var dm = new THREE.Mesh(d, T.sup); dm.rotation.x = PI / 2; dm.position.set(x, y, z + 2.8); g.add(dm);
    box(THREE, g, 0.5, 0.5, 0.6, T.metal, x, y, z + 4.0);
    var dg = new THREE.SphereGeometry(1.0, 14, 3, 0, PI * 2, 0, PI / 3.4);
    dg.rotateZ(-PI / 2); dg.scale(0.35, 1, 1);
    var dd = new THREE.Mesh(dg, T.metal); dd.position.set(x + 0.2, y, z + 4.7); g.add(dd);
  }
  /* oval funnel [C][H][P]: body l x w (plan), base z0, the cap sloping
     from zf (front) to za (after edge), black for the top 2.6 m [C] */
  function funnel(THREE, g, T, x, z0, zf, za, l, w) {
    function oval(r0, z0b, zfa, zaa, mat, open) {
      var N = 24, pos = [], uv = [], i;
      for (i = 0; i < N; i++) {
        var a0 = i / N * PI * 2, a1 = (i + 1) / N * PI * 2;
        var x0 = Math.cos(a0) * l / 2 * r0, y0 = Math.sin(a0) * w / 2 * r0, x1 = Math.cos(a1) * l / 2 * r0, y1 = Math.sin(a1) * w / 2 * r0;
        var t0 = zaa + (zfa - zaa) * (x0 / l + 0.5), t1 = zaa + (zfa - zaa) * (x1 / l + 0.5);
        var b0 = typeof z0b === "function" ? z0b(x0) : z0b, b1 = typeof z0b === "function" ? z0b(x1) : z0b;
        pos.push(x + x0, y0, b0, x + x1, y1, b1, x + x1, y1, t1, x + x0, y0, b0, x + x1, y1, t1, x + x0, y0, t0);
        uv.push(i / N * 4, b0 / 6, (i + 1) / N * 4, b1 / 6, (i + 1) / N * 4, t1 / 6, i / N * 4, b0 / 6, (i + 1) / N * 4, t1 / 6, i / N * 4, t0 / 6);
      }
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv), mat));
    }
    var slope = function (dx) { return za - 2.6 + (zf - za) * (dx / l + 0.5); };
    oval(1.0, z0, zf - 2.6, za - 2.6, T.sup);
    oval(1.02, slope, zf, za, T.cap);
    /* the top: an inset dark plate following the slope */
    var N = 16, pos = [], uv = [], i;
    for (i = 0; i < N; i++) {
      var a0 = i / N * PI * 2, a1 = (i + 1) / N * PI * 2;
      var p0 = [Math.cos(a0) * l / 2, Math.sin(a0) * w / 2], p1 = [Math.cos(a1) * l / 2, Math.sin(a1) * w / 2];
      var h0 = za + (zf - za) * (p0[0] / l + 0.5) - 0.25, h1 = za + (zf - za) * (p1[0] / l + 0.5) - 0.25, hc = (za + zf) / 2 - 0.25;
      pos.push(x, 0, hc, x + p0[0], p0[1], h0, x + p1[0], p1[1], h1);
      uv.push(0.5, 0.5, 0.5 + p0[0] / l, 0.5 + p0[1] / w, 0.5 + p1[0] / l, 0.5 + p1[1] / w);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.dark));
    /* the searchlight gallery round the funnel [C] */
    var gz = z0 + 3.2, NG = 16, gp = [], gu = [], k;
    for (k = 0; k < NG; k++) {
      var q0 = k / NG * PI * 2, q1 = (k + 1) / NG * PI * 2, rx = l / 2 + 1.1, ry = w / 2 + 1.1;
      gp.push(x, 0, gz, x + Math.cos(q0) * rx, Math.sin(q0) * ry, gz, x + Math.cos(q1) * rx, Math.sin(q1) * ry, gz);
      gu.push(0, 0, Math.cos(q0), Math.sin(q0), Math.cos(q1), Math.sin(q1));
    }
    g.add(new THREE.Mesh(geoOf(THREE, gp, gu), T.metal));
    for (k = 0; k < 10; k++) {
      var qa = k / 10 * PI * 2;
      strut(THREE, g, T.metal, x + Math.cos(qa) * (l / 2 + 1.05), Math.sin(qa) * (w / 2 + 1.05), gz,
            x + Math.cos(qa) * (l / 2 + 1.05), Math.sin(qa) * (w / 2 + 1.05), gz + 0.9, 0.03, 3);
    }
    /* the steam pipes up the after face */
    strut(THREE, g, T.metal, x - l / 2 - 0.15, 0.7, z0 + 1, x - l / 2 + 0.25, 0.7, za + 0.6, 0.12, 6);
    strut(THREE, g, T.metal, x - l / 2 - 0.15, -0.7, z0 + 1, x - l / 2 + 0.25, -0.7, za + 0.4, 0.09, 6);
  }
  /* dipole search array (stands for Gyuis-2 / Rif, not identifiable in
     the photographs): a rectangular frame with rows of dipoles, facing +X */
  function dipoleArray(THREE, g, T, x, z, span, hgt, yaw) {
    var h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.z = yaw || 0; g.add(h);
    var i;
    cylZ(THREE, h, 0.25, 0.3, 0.6, 8, T.metal, 0, 0, -0.3);
    box(THREE, h, 0.12, span, 0.1, T.metal, 0, 0, 0.05);
    box(THREE, h, 0.12, span, 0.1, T.metal, 0, 0, hgt);
    for (i = 0; i <= 6; i++) box(THREE, h, 0.08, 0.08, hgt, T.metal, 0, (i / 6 - 0.5) * span, hgt / 2);
    for (i = 0; i < 4; i++) box(THREE, h, 0.9, span * 0.9, 0.05, T.metal, 0.5, 0, hgt * (i + 0.5) / 4);
  }
  /* ship's boat on its chocks */
  function boat(THREE, g, T, x, y, z, L) {
    var k = L / 8;
    var xs = [-4.0 * k, -3.6 * k, -2.0 * k, 1.5 * k, 3.0 * k, 3.9 * k];
    var sec = [[0.9, 0.5, 0, 2.5], [1.15, 0.6, 0, 2.5], [1.25, 0.65, 0, 2.5], [1.25, 0.65, 0, 2.5], [0.95, 0.6, 0.05, 2.2], [0.2, 0.45, 0.1, 2.0]];
    var bg = new THREE.Group(); bg.position.set(x, y, z + 0.7); g.add(bg);
    ringLoft(THREE, bg, T.sup, xs, sec.map(function (s) { return superRing(s[0] * Math.min(1.25, k), s[1], s[2], 2 / s[3], 12); }), true);
    box(THREE, bg, 3.2 * k, 1.8, 0.7, T.sup, -0.6 * k, 0, 0.7);
    box(THREE, bg, 0.08, 1.5, 0.35, T.glass, 1.0 * k, 0, 0.85);
    box(THREE, g, 0.4, 2.2, 0.7, T.metal, x - 2.2 * k, y, z + 0.35);
    box(THREE, g, 0.4, 2.2, 0.7, T.metal, x + 2.2 * k, y, z + 0.35);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x;

    /* hull shell in three bands, the round stern face, the decks [P][H] */
    g.add(shellBand(THREE, T.under, -8, -0.45, 5, false));
    g.add(shellBand(THREE, T.boot, -0.45, 0.55, 1, false));
    g.add(shellBand(THREE, T.hull, 0.55, 12, 6, true));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    /* the break of the forecastle: the bulkhead across the ship [P] */
    var zq = deckZ(-57.4), zf = deckZ(-56.6), wq = halfB(-57);
    hexa(THREE, g, T.hull, [[-57.35, -wq, zq - 0.1], [-56.6, -wq, zq - 0.1], [-56.6, wq, zq - 0.1], [-57.35, wq, zq - 0.1],
                            [-57.35, -wq, zf], [-56.6, -wq, zf], [-56.6, wq, zf], [-57.35, wq, zf]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.8, 0.06, 1.7, T.dark, -57.42, s * 3.0, zq + 0.9);
      /* hawse and anchors, two a side [C][H] */
      var ax = 92.5, az = 5.4, ay = s * (W(ax, az) + 0.03);
      box(THREE, g, 1.4, 0.12, 1.2, T.dark, ax, ay, az);
      box(THREE, g, 0.9, 0.2, 1.1, T.gun, ax + 0.1, ay + s * 0.05, az - 0.3);
      /* the bilge keels */
      box(THREE, g, 60.0, 0.1, 0.8, T.under, -8.0, s * (W(-8, -4.6) + 0.25), -4.6);
      /* boot topping knuckle stays, nothing else on the topsides */
    }
    /* stem bulwark at the stem head [P] (the drawing's stem head 8.3 m) */
    for (s = -1; s <= 1; s += 2) {
      var b0 = 95.0, b1 = 104.9, A0 = [b0, s * (halfB(b0) - 0.15)], B0 = [b1, s * 0.05], C0 = [b1, s * 0.2], D0 = [b0, s * halfB(b0)];
      var h0 = deckZ(b0), h1 = deckZ(b1), P4 = s > 0 ? [A0, B0, C0, D0] : [D0, C0, B0, A0];
      hexa(THREE, g, T.hull, P4.map(function (v) { return [v[0], v[1], v[0] > 100 ? h1 : h0]; }).concat(
        P4.map(function (v) { return [v[0], v[1], v[0] > 100 ? h1 + 1.0 : h0 + 0.25]; })));
    }

    /* ---------------------------------------------------- the turrets [P] */
    var zA = deckZ(68.5) + 0.3, zB = zA + 3.1, zY = deckZ(-64.5) + 0.3, zX = zY + 2.2;
    barbette(THREE, g, T, 54.5, deckZ(54.5) - 0.2, zB);
    barbette(THREE, g, T, -50.0, deckZ(-50) - 0.2, zX);
    barbette(THREE, g, T, 68.5, deckZ(68.5) - 0.2, zA);
    barbette(THREE, g, T, -64.5, deckZ(-64.5) - 0.2, zY);
    var tB = new THREE.Group(); tB.position.set(54.5, 0, zB); mk5(THREE, tB, T); g.add(tB);
    var tX = new THREE.Group(); tX.position.set(-50.0, 0, zX); tX.rotation.z = PI; mk5(THREE, tX, T); g.add(tX);
    var tY = new THREE.Group(); tY.position.set(-64.5, 0, zY); tY.rotation.z = PI; mk5(THREE, tY, T); g.add(tY);

    /* --------------------------------------- forward superstructure [P][C][A] */
    var z0 = deckZ(30) - 0.3, z1 = roofZ(30);               /* 01 level */
    polyPrism(THREE, g, T.sup, roundPlan(10.0, 47.0, 6.9, 4.0, 1.0), z0, z1);
    var z2 = z1 + 2.6;                                        /* 02 level */
    polyPrism(THREE, g, T.sup, roundPlan(12.0, 46.0, 6.2, 4.5, 1.0), z1 - 0.05, z2);
    var z3 = z2 + 2.6;                                        /* 03: the navigating bridge */
    polyPrism(THREE, g, T.sup, roundPlan(26.0, 44.6, 5.4, 4.0, 1.0), z2 - 0.05, z3);
    /* bridge glazing round the front, the open wings on the 03 roof edge [C] */
    for (i = -3; i <= 3; i++) {
      var aa = i * 0.24;
      box(THREE, g, 0.1, 1.15, 0.8, T.glass, 40.6 + Math.cos(aa) * 4.02, Math.sin(aa) * 5.42, z3 - 0.85, aa);
    }
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 6.0, 0.08, 0.8, T.glass, 35.0, s * 5.43, z3 - 0.85);
      box(THREE, g, 5.0, 2.6, 0.16, T.sup, 38.5, s * 6.6, z2 + 0.0);
      box(THREE, g, 5.0, 0.1, 1.0, T.sup, 38.5, s * 7.85, z2 + 0.55);
      for (i = 0; i < 5; i++) box(THREE, g, 0.9, 0.06, 0.55, T.dark, 14.0 + i * 5.6, s * 6.92, z0 + 1.9);
      for (i = 0; i < 7; i++) box(THREE, g, 0.8, 0.06, 0.5, T.dark, 16.0 + i * 4.4, s * 6.22, z1 + 1.6);
      box(THREE, g, 0.9, 0.06, 1.9, T.dark, 20.0, s * 6.92, z0 + 1.2);
    }
    roofRail(THREE, g, T, [[29.5, 5.3], [42.0, 5.3], [44.4, 2.4], [44.6, 0], [44.4, -2.4], [42.0, -5.3], [29.5, -5.3]], z3, 0.9);
    /* the tower column, its gallery and the KDP2-8 on top [C][K] */
    var tx = 36.5, z5 = z3 + 2.4, z4 = z5 + 4.4;
    polyPrism(THREE, g, T.sup, roundPlan(31.6, 42.6, 4.4, 3.2, 1.0), z3 - 0.05, z5);   /* 04 level */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 3.0, 0.06, 0.6, T.glass, 38.5, s * 4.3, z5 - 0.9);
    roofRail(THREE, g, T, [[32.2, 4.3], [40.0, 4.3], [42.4, 1.8], [42.4, -1.8], [40.0, -4.3], [32.2, -4.3]], z5, 0.8);
    cylZ(THREE, g, 2.7, 3.1, z4 - z5, 18, T.sup, tx, 0, (z5 + z4) / 2);
    box(THREE, g, 4.0, 4.6, 2.4, T.sup, tx - 2.4, 0, z5 + 1.2);
    for (i = 0; i < 6; i++) {
      var ang = -0.9 + i * 0.36;
      box(THREE, g, 0.08, 0.7, 0.45, T.dark, tx + Math.cos(ang) * 2.95, Math.sin(ang) * 2.95, z5 + 2.4, ang);
    }
    cylZ(THREE, g, 4.5, 4.5, 0.25, 22, T.sup, tx, 0, z4);
    cylZ(THREE, g, 4.4, 4.5, 1.0, 22, T.sup, tx, 0, z4 + 0.6, true);
    cylZ(THREE, g, 2.4, 2.4, 1.6, 16, T.sup, tx, 0, z4 + 0.9);
    kdp(THREE, g, T, tx, z4 + 1.6, 2.3);
    /* the foremast: a tripod close abaft the tower [C][H] */
    var fx = 31.2, fTop = 39.0;
    strut(THREE, g, T.metal, fx, 0, z3, fx, 0, fTop - 4.5, 0.32, 8);
    strut(THREE, g, T.metal, fx - 3.6, 2.8, z3, fx, 0, 30.5, 0.24, 6);
    strut(THREE, g, T.metal, fx - 3.6, -2.8, z3, fx, 0, 30.5, 0.24, 6);
    strut(THREE, g, T.metal, fx, 0, fTop - 4.5, fx - 0.2, 0, fTop, 0.12, 6);
    box(THREE, g, 2.4, 2.6, 0.14, T.metal, fx - 0.3, 0, 29.4);
    roofRail(THREE, g, T, [[fx - 1.5, 1.3], [fx + 0.9, 1.3], [fx + 0.9, -1.3], [fx - 1.5, -1.3], [fx - 1.5, 1.3]], 29.4, 0.6);
    dipoleArray(THREE, g, T, fx + 0.3, 30.1, 4.4, 1.3, 0);
    strut(THREE, g, T.metal, fx - 0.1, -4.6, 33.6, fx - 0.1, 4.6, 33.6, 0.07, 4);
    box(THREE, g, 0.8, 0.6, 0.6, T.metal, fx + 0.2, 0, 36.5);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, fx - 0.1, s * 4.4, 33.6, fx - 6, s * 3.0, z3, 0.012, 3);
    strut(THREE, g, T.metal, fx - 0.2, 0, fTop - 0.5, -5.5, 0, 34.0, 0.015, 3);   /* the triatic stay [H] */

    /* the fore funnel x 16-23 [P]; top 20.6 m at the front edge: [H] scales
       18.6, [C] about 20, the later [P] 22.7 */
    funnel(THREE, g, T, 19.4, z2 - 0.05, 20.6, 18.3, 7.8, 6.4);
    /* SPN-500 posts each side abreast it [A][W] */
    for (s = -1; s <= 1; s += 2) spn500(THREE, g, T, 13.8, s * 4.6, z2);

    /* ---------------------------------------- the waist and boat deck [C][A] */
    var zw = roofZ(0);
    polyPrism(THREE, g, T.sup, [[-20.0, -5.6], [10.5, -5.6], [10.5, 5.6], [-20.0, 5.6]], deckZ(0) - 0.3, zw);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) box(THREE, g, 0.9, 0.06, i % 2 ? 0.55 : 1.9, T.dark, -17.0 + i * 4.6, s * 5.62, deckZ(0) + (i % 2 ? 1.8 : 1.0));
      /* boats, two a side between the funnels, and a smaller pair aft [C][A] */
      boat(THREE, g, T, 6.0, s * 3.4, zw, 9.5);
      boat(THREE, g, T, -2.4, s * 4.2, zw, 8.0);
    }
    /* the mainmast: tripod ahead of the after funnel, with the boat derrick [C][P] */
    var mx = -5.8, mTop = 35.0;
    strut(THREE, g, T.metal, mx, 0, zw, mx, 0, mTop - 4, 0.3, 8);
    strut(THREE, g, T.metal, mx + 3.5, 1.8, zw, mx, 0, 26.0, 0.22, 6);
    strut(THREE, g, T.metal, mx + 3.5, -1.8, zw, mx, 0, 26.0, 0.22, 6);
    strut(THREE, g, T.metal, mx, 0, mTop - 4, mx - 0.2, 0, mTop, 0.11, 6);
    box(THREE, g, 2.2, 2.4, 0.14, T.metal, mx, 0, 25.0);
    dipoleArray(THREE, g, T, mx + 0.2, 25.7, 3.4, 1.0, 0);
    strut(THREE, g, T.metal, mx, -3.8, 29.0, mx, 3.8, 29.0, 0.06, 4);
    strut(THREE, g, T.metal, mx + 0.3, 0, zw + 1.2, mx + 12.5, 0, zw + 10.5, 0.2, 6);    /* the derrick [C] */
    strut(THREE, g, T.metal, mx, 0, 24.0, mx + 12.5, 0, zw + 10.5, 0.03, 3);
    box(THREE, g, 0.4, 0.4, 1.2, T.metal, mx + 12.5, 0, zw + 9.8);

    /* the after funnel x -16..-9 [P], a little lower [H][C] */
    funnel(THREE, g, T, -12.5, zw - 0.05, 20.2, 17.9, 7.6, 6.2);

    /* ------------------------------------- after superstructure [P][C][H] */
    var za1 = roofZ(-32);
    polyPrism(THREE, g, T.sup, roundPlan(-43.6, -20.0, 6.3, 1.0, 3.5), deckZ(-32) - 0.3, za1);
    polyPrism(THREE, g, T.sup, roundPlan(-30.5, -17.5, 4.6, 1.0, 2.5), za1 - 0.05, za1 + 2.5);
    /* the after director tower about x -24 [P][C][H] */
    cylZ(THREE, g, 2.0, 2.3, 1.4, 16, T.sup, -24.5, 0, za1 + 3.2);
    kdp(THREE, g, T, -24.5, za1 + 3.9, 2.1);
    roofRail(THREE, g, T, [[-30.0, 4.5], [-18.0, 4.5], [-18.0, -4.5], [-30.0, -4.5], [-30.0, 4.5]], za1 + 2.5, 0.9);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) box(THREE, g, 0.9, 0.06, i % 2 ? 0.55 : 1.9, T.dark, -40.0 + i * 4.6, s * 6.32, deckZ(-32) + (i % 2 ? 1.8 : 1.0));
      box(THREE, g, 0.8, 0.06, 0.5, T.dark, -25.0, s * 4.62, za1 + 1.5);
    }
    roofRail(THREE, g, T, [[-43.3, 3.0], [-41.5, 5.9], [-31.0, 6.2]], za1, 0.9);
    roofRail(THREE, g, T, [[-43.3, -3.0], [-41.5, -5.9], [-31.0, -6.2]], za1, 0.9);
    /* a small pole and yard on the after house */
    strut(THREE, g, T.metal, -36.0, 0, za1, -36.0, 0, za1 + 7.5, 0.1, 5);
    strut(THREE, g, T.metal, -36.0, -2.4, za1 + 6.4, -36.0, 2.4, za1 + 6.4, 0.05, 3);

    /* ---------------------------- SM-5-1 twins, three a side [A][W] (approximate x) */
    [[39.5, 8.7, 0], [3.5, 8.0, 0], [-31.5, 8.3, PI]].forEach(function (q) {
      for (s = -1; s <= 1; s += 2) {
        var m = new THREE.Group(); m.position.set(q[0], s * q[1], deckZ(q[0]));
        m.rotation.z = q[2] + s * (q[2] ? -0.2 : 0.2); sm51(THREE, m, T); g.add(m);
      }
    });
    /* ----------------------- V-11M twins, sixteen [W] (spread as [C][A]) */
    var p37 = [[40.0, 6.9, z2 + 0.08, 0.3], [24.2, 5.4, z2, 0.6], [27.5, 8.4, deckZ(27.5), 0.6], [15.0, 8.2, deckZ(15), 0.5],
               [-17.0, 4.6, zw, 1.8], [-26.5, 5.5, za1, 2.1], [-38.0, 5.0, za1, 2.6], [-41.6, 2.2, za1, 3.0]];
    p37.forEach(function (q) {
      for (s = -1; s <= 1; s += 2) {
        var m = new THREE.Group(); m.position.set(q[0], s * q[1], q[2]); m.rotation.z = s * q[3]; v11(THREE, m, T); g.add(m);
      }
    });

    /* ------------------------------------------------- deck fittings [C][A] */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.6, 0.7, 0.6, 12, T.metal, 87.0, s * 1.4, deckZ(87) + 0.3);
      box(THREE, g, 4.6, 0.25, 0.08, T.gun, 89.6, s * 2.4, deckZ(89.6) + 0.05, -s * 0.45);
      for (i = 0; i < 3; i++) {
        x = [80, 46, -80][i];
        cylZ(THREE, g, 0.2, 0.2, 0.55, 6, T.metal, x, s * (halfB(x) - 1.1), deckZ(x) + 0.27);
        cylZ(THREE, g, 0.2, 0.2, 0.55, 6, T.metal, x + 0.7, s * (halfB(x) - 1.1), deckZ(x) + 0.27);
      }
      box(THREE, g, 2.4, 1.2, 1.0, T.sup, 78.0, s * 3.6, deckZ(78) + 0.5);
      box(THREE, g, 2.4, 1.2, 1.0, T.sup, -84.0, s * 4.0, deckZ(-84) + 0.5);
      /* ventilators on the forecastle deck abreast the superstructure */
      for (i = 0; i < 3; i++) {
        cylZ(THREE, g, 0.35, 0.35, 1.2, 8, T.sup, -16.0 + i * 7.0, s * 7.3, deckZ(0) + 0.6);
        cylZ(THREE, g, 0.55, 0.35, 0.35, 8, T.sup, -16.0 + i * 7.0, s * 7.3, deckZ(0) + 1.35);
      }
    }
    box(THREE, g, 1.4, 1.4, 0.6, T.metal, 84.0, 0, deckZ(84) + 0.3);
    cylZ(THREE, g, 0.6, 0.75, 0.7, 12, T.metal, -92.0, 0, deckZ(-92) + 0.35);
    strut(THREE, g, T.metal, 104.4, 0, deckZ(104.4) + 0.8, 104.4, 0, deckZ(104.4) + 4.0, 0.06, 5);   /* jackstaff */
    strut(THREE, g, T.metal, -104.4, 0, deckZ(-104.4), -104.4, 0, deckZ(-104.4) + 5.0, 0.07, 5);   /* ensign staff */

    /* --------------------------------- underwater: two shafts, one rudder [W] */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.28, 0.28, 22.0, 8, T.metal, -79.0, s * 4.4, -4.6);
      strut(THREE, g, T.metal, -86.5, s * 4.4, -4.6, -86.5, s * 5.6, -2.4, 0.2, 5);
      strut(THREE, g, T.metal, -86.5, s * 4.4, -4.6, -86.5, s * 3.0, -2.6, 0.2, 5);
      cylX(THREE, g, 0.5, 0.75, 1.1, 10, T.metal, -90.6, s * 4.4, -4.6);
      for (i = 0; i < 3; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.8, 2.1), T.metal);
        bl.position.set(-90.6, s * 4.4, -4.6); bl.rotation.x = i * 2 * PI / 3 + 0.3;
        bl.translateZ(1.1); bl.rotation.y = 0.45; g.add(bl);
      }
    }
    box(THREE, g, 4.6, 0.4, 4.6, T.metal, -97.2, 0, -2.3);

    /* ------------------------------------------- rails along the deck edges */
    railRun(THREE, g, T, -104.2, -57.8, 5.2, 1.0);
    railRun(THREE, g, T, -56.4, 60.0, 7.0, 1.0);
    railRun(THREE, g, T, 60.0, 96.0, 5.2, 1.0);

    /* --------------------------- team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.6, 1.0, 0.04, T.team, -40.0, 0, za1 + 0.03);
    box(THREE, g, 2.4, 1.0, 0.04, T.team, 26.4, 0, z2 + 0.03);
    box(THREE, g, 2.0, 0.9, 0.04, T.team, -19.6, 0, za1 + 2.53);

    /* ------------------------------ trained mount: A turret [P][C] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(68.5, 0, zA); mk5(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tb = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  return { build: build };
})();

UNIT_MODELS["pact_e50_cruiser"] = {
  len: 210.0,
  build: function (THREE, M, C) { return HeroSverdlov.build(THREE, M, C); }
};
