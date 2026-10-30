/* ==================== js/hero/ru_riga.js ===============================
   HERO MODEL -- Project 50 "Gornostay" (NATO "Riga") patrol ship (SKR),
   drawn as the class stood after the 1959-61 modernisation and as it was
   photographed through the 1960s and into 1971: three single 100 mm
   B-34USMA, two twin 37 mm V-11M, the triple TTA-53-50 tubes, the two
   RBU-2500 that replaced the MBU-200, four BMB-2 throwers and two stern
   racks, Fut-N (Slim Net) on the lattice mast and the Yakor-M director on
   the bridge.  Key: pact_e50_corvette.
   REDO 2026-10-24: hull lofted from a section table scaled off the
   Navypedia standard-scale drawing; the B gun raised on its house; the
   RBU-2500 pair, the triple tubes, the BMB-2 throwers and the boats put
   in; the funnel, the lattice mast with Slim Net and the director rebuilt
   to the drawing's stations.

   DIMENSIONS: 91.0 m overall (en.wikipedia; Navypedia 90.9 m), 86 m on
   the waterline (ru.wikipedia), beam 10.2 m (9.6 m on the waterline,
   ru.wikipedia), draught 2.9 m (Navypedia; en.wikipedia gives 3.16 m at
   full load).  The old header's 91.5 m (js/warship_specs.js) is not in
   these references; ru.wikipedia's 96.6 m overall is not supported by
   the drawing (its own 86 m waterline and the drawing's overhangs give
   about 91 m) and is not used.

   REFERENCES
     [N] Navypedia, "YAGUAR guard ships (project 50)": standard-scale side
         and plan drawing "Rosomakha 1961" (a modernised ship), fetched at
         its native 303 x 136 px: hull 291 px = 90.9 m (3.2 px/m), bow
         right, waterline row 78.  Stations read off it (metres from
         amidships, + forward): stem 45.5 at the deck, 41.5 at the
         waterline; deck at the side 2.8 m aft, 3.2 m amidships, 6.85 m
         at the stem; A gun 25.8 (shield top 7.6 m) with a V breakwater
         27-32 ahead of it; B gun 18.3 raised on a house (shield top about
         9 m); the RBU-2500 pair abreast at 16.5 at the deck edge; the
         bridge block 1 to 14 (wheelhouse roof 10.3 m) with the director at
         3-9 (top about 16 m; [S] reads 14-15 m, so it is drawn at 15.6 m)
         and two whip poles at 9.8 and 12.0; the lattice mast -3 to 2 (to
         about 14.5 m) with the radar on a pedestal over it at about 18-19
         m and a pole to 23 m; the funnel -7.5 to -1.5 (top about 10.5 m
         forward, 9.7 m aft);
         the boats abreast -4.5 to -0.8; the tubes on the centreline -14.5
         to -8; the after deckhouse -23.5 to -15 with the two 37 mm twins
         abreast at -19.5 and two poles at -16.7 and -15.1; the after gun
         -28.6 on a low pedestal and a small house -34.6 to -31.4; the
         throwers at -39 and -36.4 abreast; the stern.  Armament and
         electronics lists and the 1959-61 changes (- MBU-200, twin tubes,
         Guys-1M4, Lin', Yakor'; + triple tubes, 2 x 16 RBU-2500, Fut-N,
         Neptun-M, Yakor'-M) are from the same page.
     [R] ru.wikipedia "Storozhevye korabli proekta 50": flush-decked with
         sheer ("gladkopalubnyy s prodol'noy sedlovatost'yu"), one funnel,
         one mast, two superstructures; three B-34USMA, two twin V-11, BMB-2
         throwers, the 1959-60 modernisation as in [N]; two rudders, two
         screws.  So there is no raised-forecastle step: the forecastle is
         the sheer rising to the stem.
     [P] Commons "Riga-class frigate profile 1988.png" (recognition
         profile): the same layout; B gun high over A; raked funnel.
     [S] Commons "71-riga-frigate-a.jpg" (starboard broadside, off the
         Ryukyus, 1971): positions agree with [N] to about 1 m (mast -0.6,
         funnel -4.9, director 6.2, B gun 18.1, A gun 26.3).
     [H] Commons "SH-3D of HS-4 over Soviet Riga class frigate 1971.jpg"
         (port bow): the bridge face, the director drum and its dish, the
         lattice mast with Slim Net on its head and a pole topmast with a
         yard, the raked funnel with the dark cap, the tubes abaft it, the
         37 mm twins on the after deckhouse, the after gun; two round
         fittings at the deck edge under the mast (NOT identified: drawn
         as plain round fittings).
     [K] Commons "Soviet Riga class frigate.JPEG" (SKR-57, elevated port
         beam, 1983; used for what the 1959-61 fit did not change): the
         rounded B-34USMA shields, the B gun house with its sloped front,
         a boat under the mast, the RBU-2500 box abaft the B gun, the
         light grey paint.
     [O] Commons "428-GX-USN 1143725" and "428-GX-USN-1143789" (Okean,
         April 1970; port bow and starboard quarter): the bow and the
         breakwater, the yard under the Slim Net, the black funnel cap,
         the low quarterdeck with its depth-charge gear.

   RECOGNITION LIST (where each shows):
     1. Long flush hull, low aft, with a strong sheer rising to a raked
        stem [N][R][S] - STA, shell bands, deckSheet().
     2. Three single 100 mm B-34USMA in rounded enclosed shields: A on the
        forecastle (the "turret"), B raised on its house, one aft trained
        aft [N][K][S] - b34().
     3. The bridge block with the Yakor-M director drum and dish over it
        [N][H][S] - director().
     4. A four-legged lattice mast with the Fut-N (Slim Net) on its head
        and a pole topmast [N][H][O] - latticeMast(), slimNet().
     5. One big raked funnel with a black cap [N][H][O] - funnel().
     6. The triple TTA-53-50 tubes on the centreline abaft the funnel
        [N][H] - tta53().
     7. The after deckhouse with the two twin 37 mm V-11M abreast [N][H]
        - v11().
     8. The RBU-2500 pair abreast the B gun [N][K] - rbu2500().
     9. The depth-charge gear on the quarterdeck: four BMB-2 throwers, two
        stern racks [N][O] - bmb2(), racks.
    10. Boats under the mast, the V breakwater, anchors [N][K][O].
    11. Paint: light Soviet grey hull and houses, darker decks, black boot
        topping and funnel cap [K][O]; the colour views here are faded
        prints, so the greys are the Kashin photograph samples (same fleet
        and period) used for the Kynda, about 0.85-0.9 of their level.
   NOT CONFIRMED and therefore not drawn: the as-built 1954-58 fit (MBU-200,
   twin tubes, Guys-1M4, Lin'), because no photograph or drawing of it was
   found; the 25 mm 2M-3M twins some ships got in 1968-72; mine rails (the
   ship carried mines [R] but no reference resolves the rails); the sonar.
   The two round fittings of [H] and the two poles on the after deckhouse
   are drawn as plain fittings and poles: their use is NOT identified.
   No hull numbers, names or flags.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The row
   has turret:true and its first weapon is "3 x 100mm B-34": the forward
   100 mm (A gun) is the group named "turret"; everything else is baked,
   one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRiga = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -45.5, XS1 = 45.5, XWL = 41.5, XST = -43.9;   /* transom, stem head, stem and transom at the waterline [N] */

  /* HULL SECTION TABLE scaled off [N] (3.2 px/m), half beams from the
     published 10.2 m (deck) and 9.6 m (waterline) [R].  x, deck z at the
     side, half beam at the deck edge, half beam at the waterline, bottom z
     on the centreline, bilge fullness */
  var STA = [
    [-45.5, 2.78, 3.55, 3.05,  0.90, 3.0],
    [-43.9, 2.79, 4.05, 3.65, -0.40, 3.0],
    [-41.0, 2.81, 4.50, 4.15, -1.35, 2.8],
    [-35.0, 2.85, 4.92, 4.58, -2.35, 2.6],
    [-26.0, 2.92, 5.08, 4.77, -2.82, 2.8],
    [-12.0, 3.06, 5.10, 4.80, -2.90, 3.0],
    [  0.0, 3.24, 5.10, 4.80, -2.90, 3.0],
    [  8.0, 3.44, 5.05, 4.72, -2.90, 2.9],
    [ 16.0, 3.86, 4.86, 4.45, -2.86, 2.6],
    [ 22.0, 4.30, 4.56, 4.00, -2.76, 2.3],
    [ 28.0, 4.84, 4.06, 3.28, -2.56, 2.0],
    [ 33.0, 5.34, 3.42, 2.42, -2.26, 1.8],
    [ 37.0, 5.82, 2.72, 1.58, -1.80, 1.6],
    [ 41.5, 6.34, 1.62, 0.00,  0.00, 1.3],
    [ 43.5, 6.59, 0.88, 0.00,  0.00, 1.2],
    [ 45.5, 6.85, 0.12, 0.00,  0.00, 1.2]
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
  /* the raked stem and the small transom overhang [N] */
  function zBot(x) {
    if (x > XWL) return deckZ(XS1) * (x - XWL) / (XS1 - XWL);
    if (x < XST) return -0.4 + 1.3 * (XST - x) / (XST - XS0);
    return pick(x, 4);
  }
  /* half breadth at height z: flared above the waterline, a super-ellipse bilge below */
  function W(x, z) {
    var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
    if (x < XST) {
      var f = (XST - x) / (XST - XS0);
      return bd * Math.pow((z - zb) / (zd - zb), 0.2 + 0.3 * f);
    }
    if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.5);
    var n = pick(x, 5), t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  /* superstructure levels [N]: the 01 house roof, the B gun house, the
     bridge (02) and the wheelhouse (03) roofs, the after deckhouse roof */
  var R01 = 5.55, RB = 6.35, R02 = 7.95, R03 = 10.4, RAFT = 5.2;

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
  /* hull plating: one tile is 24 m x 8 m (UVs are metres / tile): strakes,
     staggered butts, weathering streaks under the scuttles */
  function hullTex(THREE) {
    return canvasTex(THREE, "hull50", 512, 256, function (g, w, h) {
      var R = rng(5050), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 5; i++) {
        var xx = i * w / 5 + (i % 2) * 18;
        g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 46; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, 2 + R() * 5, 18 + R() * 80);
      }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "plate50", 256, 256, function (g, w, h) {
      var R = rng(5017), i;
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
  function deckTex(THREE) {
    return canvasTex(THREE, "deck50", 256, 256, function (g, w, h) {
      var R = rng(5011), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* funnel top, scuttle glass, louvres: dark grille bars */
  function grilleTex(THREE) {
    return canvasTex(THREE, "grille50", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* paint: the Kashin photograph samples (the Kynda's PAINT), taken to
     about 0.85-0.9 of their level; [K] shows the same light grey */
  var PAINT = { hull: 0x8a9298, sup: 0x949ca1, deck: 0x4e5458, soot: 0x2a2d30 };
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
      boot:  skin(0x0c0d0f, hullTex(THREE), 0.9),
      under: skin(0x3a1612, hullTex(THREE), 0.9),
      sup:   skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:  skin(PAINT.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5c636a, 0.52, 0.55),
      soot:  metal(PAINT.soot, 0.7, 0.35),
      gun:   metal(0x3b4146, 0.48, 0.60),
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
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
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
      var v = [P, Q, R], k;
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
    for (x = XS0; x < XS1 - 0.01; x += 2.2) xs.push(x);
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (x = 34; x < XS1; x += 0.9) xs.push(x);
    for (x = XS0; x < XST; x += 0.4) xs.push(x);
    xs.push(XS1);
    xs.sort(function (a, b) { return a - b; });
    return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
  }
  /* one band of the shell between heights zlo and zhi, both sides, metre
     UVs on a 24 x 8 m tile */
  function shellBand(THREE, m, zlo, zhi, rows) {
    var xs = hullXs(), pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
    for (s = -1; s <= 1; s += 2) {
      var base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        var x = xs[i], zb = zBot(x), zd = deckZ(x);
        var a = Math.min(Math.max(zlo, zb), zd), b = Math.min(Math.max(zhi, zb), zd);
        for (j = 0; j < NR; j++) {
          var z = a + (b - a) * j / rows;
          pos.push(x, s * W(x, z), z); uv.push(x / 24, z / 8);
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
  /* the weather deck, edge to edge, 4 strips across, following the sheer */
  function deckSheet(THREE, m) {
    var xs = hullXs(), pos = [], uv = [], idx = [], i, j, NC = 4;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = halfB(x), z = deckZ(x);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC)) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  /* the transom face above the small overhang [N] */
  function transom(THREE, g, T) {
    var x = XS0, zb = zBot(x), zd = deckZ(x), N = 6, j, k;
    var pos = [], uv = [];
    for (j = 0; j < N; j++) {
      var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
      var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1);
      pos.push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
      for (k = 0; k < 6; k++) uv.push(pos[pos.length - 18 + k * 3 + 1] / 24, pos[pos.length - 18 + k * 3 + 2] / 8);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.hull));
  }
  function edgeY(x) { return Math.max(0.1, halfB(x) - 0.15); }
  function railRun(THREE, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x);
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.022, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.018, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 2.6));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.028, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.02, 3);
    }
  }

  /* One mesh per material: bake every mesh under root into merged geometry
     in root's frame. */
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
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
  /* a dish facing +X, rim radius rad */
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 14, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    if (tilt) dg.rotateY(-tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }
  /* a "cheese" reflector concave toward +X, w wide, h tall */
  function cheese(THREE, g, m, w, h, x, y, z, yaw) {
    var cg = new THREE.CylinderGeometry(w * 0.75, w * 0.75, h, 14, 1, true, -0.72, 1.44);
    cg.translate(0, 0, -w * 0.75);
    cg.rotateX(PI / 2); cg.rotateZ(-PI / 2);
    var c = new THREE.Mesh(cg, m), grp = new THREE.Group();
    grp.add(c); grp.position.set(x, y, z); grp.rotation.z = yaw || 0; g.add(grp);
    return grp;
  }

  /* 100 mm B-34USMA at rest pointing +X: the rounded enclosed shield
     (about 3.6 m long, 2.7 m wide, 2.4 m tall [K][S]), its gun port, the
     L/56 barrel (5.6 m) and the base ring */
  function b34(THREE, g, T) {
    cylZ(THREE, g, 1.45, 1.55, 0.32, 18, T.sup, -0.2, 0, 0.16);
    var xs = [-2.0, -1.92, -1.5, -0.5, 0.5, 1.15, 1.5, 1.66];
    var sec = [[1.18, 0.95, 1.30, 3.0], [1.3, 1.05, 1.32, 3.0], [1.36, 1.12, 1.33, 2.8], [1.36, 1.12, 1.33, 2.8],
               [1.32, 1.08, 1.30, 2.6], [1.2, 0.96, 1.24, 2.4], [1.0, 0.8, 1.16, 2.2], [0.72, 0.58, 1.08, 2.0]];
    var rings = sec.map(function (s) { return superRing(s[0], s[1], s[2] + 0.1, 2 / s[3], 20); });
    ringLoft(THREE, g, T.sup, xs, rings, true);
    /* the sighting hoods on the roof, the rear door, the gun port */
    box(THREE, g, 0.7, 0.42, 0.24, T.sup, -0.3, 0.75, 2.6);
    box(THREE, g, 0.7, 0.42, 0.24, T.sup, -0.3, -0.75, 2.6);
    box(THREE, g, 0.08, 0.8, 1.3, T.dark, -2.02, 0, 1.25);
    box(THREE, g, 0.2, 0.42, 1.0, T.dark, 1.62, 0, 1.25);
    var bar = new THREE.Group(); bar.position.set(1.5, 0, 1.25); bar.rotation.y = -0.08;
    cylX(THREE, bar, 0.2, 0.24, 0.8, 10, T.gun, 0.4, 0, 0);
    cylX(THREE, bar, 0.085, 0.11, 4.9, 8, T.gun, 3.2, 0, 0, true);
    cylX(THREE, bar, 0.12, 0.12, 0.25, 8, T.gun, 5.6, 0, 0);
    g.add(bar);
    return g;
  }
  /* twin 37 mm V-11M at rest pointing +X: pedestal, cradle, the open-backed
     shield, two barrels with flash hiders */
  function v11(THREE, g, T) {
    cylZ(THREE, g, 0.5, 0.65, 0.7, 12, T.sup, 0, 0, 0.35);
    box(THREE, g, 1.4, 1.5, 0.35, T.sup, -0.2, 0, 0.85);
    /* shield: front plate sloped back and two side wings */
    hexa(THREE, g, T.sup, [[0.55, -0.95, 0.8], [0.7, -0.95, 0.8], [0.7, 0.95, 0.8], [0.55, 0.95, 0.8],
                           [0.2, -0.85, 1.9], [0.35, -0.85, 1.9], [0.35, 0.85, 1.9], [0.2, 0.85, 1.9]]);
    var s;
    for (s = -1; s <= 1; s += 2) {
      hexa(THREE, g, T.sup, [[-0.9, s * 0.95 - 0.04, 0.8], [0.62, s * 0.95 - 0.04, 0.8], [0.62, s * 0.95 + 0.04, 0.8], [-0.9, s * 0.95 + 0.04, 0.8],
                             [-0.5, s * 0.87 - 0.04, 1.75], [0.3, s * 0.87 - 0.04, 1.85], [0.3, s * 0.87 + 0.04, 1.85], [-0.5, s * 0.87 + 0.04, 1.75]]);
      box(THREE, g, 0.4, 0.3, 0.5, T.gun, -0.6, s * 0.55, 1.1);
    }
    var bar = new THREE.Group(); bar.position.set(0.3, 0, 1.35); bar.rotation.y = -0.18;
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, bar, 0.1, 0.12, 1.1, 8, T.gun, -0.1, s * 0.24, 0);
      cylX(THREE, bar, 0.045, 0.05, 2.2, 6, T.gun, 1.5, s * 0.24, 0, true);
      cylX(THREE, bar, 0.07, 0.07, 0.3, 6, T.gun, 2.7, s * 0.24, 0);
    }
    box(THREE, bar, 0.9, 0.3, 0.45, T.gun, -0.2, 0, 0.12);
    g.add(bar);
    return g;
  }
  /* triple 533 mm TTA-53-50 on its turntable, breeches forward */
  function tta53(THREE, g, T) {
    var i, y;
    cylZ(THREE, g, 1.15, 1.25, 0.45, 16, T.sup, 0, 0, 0.22);
    box(THREE, g, 2.0, 2.4, 0.35, T.sup, 0.3, 0, 0.62);
    for (i = 0; i < 3; i++) {
      y = (i - 1) * 0.72;
      cylX(THREE, g, 0.32, 0.32, 7.3, 14, T.sup, -1.85, y, 1.12, true);
      cylX(THREE, g, 0.36, 0.36, 0.3, 14, T.metal, 1.62, y, 1.12);
      cylX(THREE, g, 0.29, 0.29, 0.06, 12, T.dark, -5.52, y, 1.12);
      cylX(THREE, g, 0.34, 0.34, 0.14, 14, T.metal, -3.0, y, 1.12, true);
      cylX(THREE, g, 0.34, 0.34, 0.14, 14, T.metal, -0.4, y, 1.12, true);
    }
    /* the training position and its hood on the breech end */
    box(THREE, g, 1.0, 1.0, 0.9, T.sup, 1.95, 0.0, 1.0);
    var hd = new THREE.SphereGeometry(0.5, 10, 4, 0, PI * 2, 0, PI / 2); hd.rotateX(PI / 2);
    var hm = new THREE.Mesh(hd, T.sup); hm.position.set(1.95, 0, 1.45); g.add(hm);
    box(THREE, g, 5.6, 2.2, 0.08, T.metal, -2.0, 0, 1.47);
    return g;
  }
  /* RBU-2500: sixteen barrels in two rows of eight on a trainer, raised */
  function rbu2500(THREE, g, T) {
    var i, r;
    cylZ(THREE, g, 0.5, 0.62, 0.55, 10, T.sup, 0, 0, 0.27);
    box(THREE, g, 1.0, 1.9, 0.5, T.sup, -0.1, 0, 0.8);
    var cl = new THREE.Group(); cl.position.set(0.1, 0, 1.15); cl.rotation.y = -0.35;
    for (r = 0; r < 2; r++) for (i = 0; i < 8; i++)
      cylX(THREE, cl, 0.12, 0.12, 1.65, 6, T.gun, 0, -0.84 + i * 0.24, -0.13 + r * 0.26, true);
    box(THREE, cl, 0.25, 2.1, 0.62, T.sup, -0.7, 0, 0);
    box(THREE, cl, 0.2, 2.1, 0.62, T.metal, 0.55, 0, 0);
    g.add(cl);
    return g;
  }
  /* BMB-2 depth-charge thrower: a short mortar on a pedestal with a tray */
  function bmb2(THREE, g, T, s) {
    cylZ(THREE, g, 0.3, 0.38, 0.35, 8, T.metal, 0, 0, 0.17);
    var m = new THREE.Group(); m.position.set(0, 0, 0.35); m.rotation.x = -s * 0.75;
    cylZ(THREE, m, 0.2, 0.2, 1.0, 10, T.gun, 0, 0, 0.5);
    cylZ(THREE, m, 0.28, 0.28, 0.28, 10, T.metal, 0, 0, 1.05);
    g.add(m);
    box(THREE, g, 1.4, 0.6, 0.08, T.metal, -0.5, -s * 0.5, 0.5);
    return g;
  }
  /* Fut-N (Slim Net): a long cheese on a pedestal with its lattice back */
  function slimNet(THREE, g, T, x, z) {
    cylZ(THREE, g, 0.3, 0.42, 1.5, 8, T.metal, x, 0, z + 0.75);
    var h = new THREE.Group(); h.position.set(x, 0, z + 2.3);
    cheese(THREE, h, T.metal, 5.6, 1.5, 0.4, 0, 0.3, 0);
    var i;
    for (i = 0; i < 6; i++) box(THREE, h, 0.08, 0.08, 1.5, T.metal, -0.2, -2.6 + i * 1.04, 0.3);
    box(THREE, h, 0.12, 5.4, 0.12, T.metal, -0.2, 0, 1.05);
    box(THREE, h, 0.12, 5.4, 0.12, T.metal, -0.2, 0, -0.45);
    box(THREE, h, 0.5, 0.5, 0.9, T.metal, -0.05, 0, -0.6);
    g.add(h);
  }
  /* Yakor-M director with the SVP-42-50 sight: the drum, its dome, the
     rangefinder ears and the dish on the front [N][H] */
  function director(THREE, g, T, x, z) {
    cylZ(THREE, g, 1.25, 1.35, 1.3, 18, T.sup, x, 0, z + 0.65);
    var dg = new THREE.SphereGeometry(1.25, 18, 6, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2); dg.scale(1, 1, 0.55);
    var dm = new THREE.Mesh(dg, T.sup); dm.position.set(x, 0, z + 1.3); g.add(dm);
    var s;
    for (s = -1; s <= 1; s += 2) {
      cylY(THREE, g, 0.16, 0.7, 8, T.sup, x - 0.1, s * 1.55, z + 1.0);
      box(THREE, g, 0.36, 0.18, 0.36, T.dark, x + 0.05, s * 1.92, z + 1.0);
    }
    strut(THREE, g, T.metal, x + 0.2, 0, z + 1.85, x + 0.5, 0, z + 2.5, 0.09, 6);
    dish(THREE, g, T.metal, 0.95, x + 0.75, 0, z + 2.55, 0.3);
    box(THREE, g, 0.3, 0.12, 0.12, T.metal, x + 1.3, 0, z + 2.75);
  }
  /* small boat on chocks: lofted hull and canopy */
  function boat(THREE, g, T, x, y, z, L, B) {
    var xs = [], rings = [], i, n = 9;
    for (i = 0; i <= n; i++) {
      var t = i / n, xx = x - L / 2 + L * t;
      var wf = t > 0.65 ? Math.max(0.08, 1 - Math.pow((t - 0.65) / 0.35, 1.6)) : (t < 0.08 ? 0.75 + t * 3 : 1);
      xs.push(xx); rings.push(superRing(B / 2 * wf, 0.45, z + 0.45, 0.8, 12).map(function (p) { return [p[0] + y, p[1]]; }));
    }
    ringLoft(THREE, g, T.sup, xs, rings, true);
    tprism(THREE, g, L * 0.5, B * 0.7, L * 0.45, B * 0.6, 0.6, T.sup, x - L * 0.05, y, z + 1.15);
    box(THREE, g, 0.3, B * 0.6, 0.35, T.glass, x + L * 0.2, y, z + 1.1);
  }
  /* funnel: an oval casing raked aft, the top falling aft, a black cap and
     a grille [N][H][O] */
  function funnel(THREE, g, T, cx, L, B, z0, zf, za, rake) {
    var N = 22, j, ring = [], tr = Math.tan(rake);
    for (j = 0; j < N; j++) {
      var t = j / N * PI * 2, c = Math.cos(t), s = Math.sin(t);
      ring.push([L / 2 * Math.sign(c) * Math.pow(Math.abs(c), 0.6), B / 2 * Math.sign(s) * Math.pow(Math.abs(s), 0.6)]);
    }
    function xAt(px, z) { return cx + px - (z - z0) * tr; }
    function zt(px) { return za + (zf - za) * (px + L / 2) / L; }
    function band(m, lo, hi) {
      var pos = [], uv = [];
      for (j = 0; j < N; j++) {
        var a = ring[j], b = ring[(j + 1) % N];
        var a0 = lo(a[0]), a1 = hi(a[0]), b0 = lo(b[0]), b1 = hi(b[0]);
        pos.push(xAt(a[0], a0), a[1], a0, xAt(b[0], b0), b[1], b0, xAt(b[0], b1), b[1], b1,
                 xAt(a[0], a0), a[1], a0, xAt(b[0], b1), b[1], b1, xAt(a[0], a1), a[1], a1);
        var ua = (a[0] + a[1]) / 6, ub = (b[0] + b[1]) / 6;
        uv.push(ua, a0 / 6, ub, b0 / 6, ub, b1 / 6, ua, a0 / 6, ub, b1 / 6, ua, a1 / 6);
      }
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv), m));
    }
    band(T.sup, function () { return z0; }, function (px) { return zt(px) - 0.95; });
    band(T.soot, function (px) { return zt(px) - 0.95; }, function (px) { return zt(px); });
    var pos = [], uv = [], zc = zt(0) - 0.2;
    for (j = 0; j < N; j++) {
      var a = ring[j], b = ring[(j + 1) % N];
      pos.push(xAt(0, zc), 0, zc, xAt(a[0], zt(a[0]) - 0.2), a[1], zt(a[0]) - 0.2, xAt(b[0], zt(b[0]) - 0.2), b[1], zt(b[0]) - 0.2);
      uv.push(0.5, 0.5, a[0] / L + 0.5, a[1] / B + 0.5, b[0] / L + 0.5, b[1] / B + 0.5);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.dark));
    /* the cap's lip and two steam pipes up its after side */
    var zl = zt(-L / 2);
    for (j = -1; j <= 1; j += 2)
      strut(THREE, g, T.metal, xAt(-L / 2 + 0.3, z0 + 1), j * 0.6, z0 + 1, xAt(-L / 2 + 0.3, zl + 0.5) - 0.15, j * 0.6, zl + 0.5, 0.07, 5);
  }
  /* four-legged lattice mast tapering to a platform at zt [N][H][O] */
  function latticeMast(THREE, g, T, xa, xf, w, z0, xta, xtf, wt, zt) {
    var legs = [[xa, -w, xta, -wt], [xf, -w, xtf, -wt], [xf, w, xtf, wt], [xa, w, xta, wt]], i, k, n = 5;
    function at(L, f) { return [L[0] + (L[2] - L[0]) * f, L[1] + (L[3] - L[1]) * f, z0 + (zt - z0) * f]; }
    for (i = 0; i < 4; i++) {
      var a = at(legs[i], 0), b = at(legs[i], 1);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], 0.09, 5);
    }
    for (k = 0; k <= n; k++) {
      var f = k / n;
      for (i = 0; i < 4; i++) {
        var p = at(legs[i], f), q = at(legs[(i + 1) % 4], f);
        strut(THREE, g, T.metal, p[0], p[1], p[2], q[0], q[1], q[2], 0.045, 3);
        if (k < n) {
          var r = at(legs[(i + 1) % 4], (k + 1) / n), u = at(legs[i], (k + 1) / n);
          strut(THREE, g, T.metal, p[0], p[1], p[2], r[0], r[1], r[2], 0.03, 3);
          strut(THREE, g, T.metal, q[0], q[1], q[2], u[0], u[1], u[2], 0.03, 3);
        }
      }
    }
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* hull shell in three bands, transom, weather deck [N][R] */
    g.add(shellBand(THREE, T.under, -4, -0.35, 5));
    g.add(shellBand(THREE, T.boot, -0.35, 0.5, 1));
    g.add(shellBand(THREE, T.hull, 0.5, 8, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));

    /* scuttles along the sides, the anchors and hawses [S][H][O] */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 24; i++) {
        x = -38 + i * 3.1;
        if (x > 36) break;
        z = deckZ(x) - 0.95;
        box(THREE, g, 0.3, 0.08, 0.3, T.dark, x, s * (W(x, z) + 0.01), z);
      }
      var ax = 39.2, az = deckZ(ax) - 0.9, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 1.5, 0.12, 1.2, T.dark, ax, ay, az, -s * 0.2);
      box(THREE, g, 1.0, 0.18, 0.9, T.gun, ax + 0.1, ay + s * 0.05, az - 0.15, -s * 0.2);
    }

    /* ---- the 01 house, x -8.5 to 15: inset aft of the bridge, out to the
       hull sides under it [N][H][S] */
    var Y01 = 3.45, zb01 = deckZ(-8.2) - 0.2;
    polyPrism(THREE, g, T.sup, [[-8.2, -Y01], [4.2, -Y01], [4.2, Y01], [-8.2, Y01]], zb01, R01);
    polyPrism(THREE, g, T.sup, [[4.0, -edgeY(4.0) + 0.05], [12.0, -edgeY(12.0) + 0.05], [15.2, -edgeY(15.2) + 0.15],
                                [15.2, edgeY(15.2) - 0.15], [12.0, edgeY(12.0) - 0.05], [4.0, edgeY(4.0) - 0.05]], deckZ(4.0) - 0.2, R01);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) box(THREE, g, 0.45, 0.06, 0.45, T.dark, -7.4 + i * 2.0, s * (Y01 + 0.02), 4.4);
      for (i = 0; i < 4; i++) box(THREE, g, 0.45, 0.06, 0.45, T.dark, 5.6 + i * 2.2, s * (edgeY(5.6 + i * 2.2) - 0.03 + 0.04), 4.6);
      box(THREE, g, 0.9, 0.06, 1.7, T.dark, -6.2, s * (Y01 + 0.02), 3.9);
      /* the two round fittings at the deck edge under the mast [H] */
      for (i = 0; i < 2; i++) {
        var rf = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.22, 14), T.sup);
        rf.position.set(1.2 + i * 1.45, s * 4.55, deckZ(1) + 0.72); g.add(rf);
        var rd = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.24, 12), T.dark);
        rd.position.set(1.2 + i * 1.45, s * 4.55, deckZ(1) + 0.72); g.add(rd);
      }
    }
    roofRail(THREE, g, T, [[4.0, Y01 - 0.1], [-8.1, Y01 - 0.1], [-8.1, -Y01 + 0.1], [4.0, -Y01 + 0.1]], R01, 0.9);

    /* ---- the B gun house, x 15 to 21.6, its sloped front [N][K][P] */
    polyPrism(THREE, g, T.sup, [[14.8, -3.0], [19.6, -3.0], [21.6, -1.6], [21.6, 1.6], [19.6, 3.0], [14.8, 3.0]], deckZ(15) - 0.2, RB);
    hexa(THREE, g, T.sup, [[19.6, -3.0, deckZ(21) - 0.1], [23.0, -1.4, deckZ(23) - 0.1], [23.0, 1.4, deckZ(23) - 0.1], [19.6, 3.0, deckZ(21) - 0.1],
                           [19.6, -3.0, RB], [21.6, -1.6, RB], [21.6, 1.6, RB], [19.6, 3.0, RB]]);
    roofRail(THREE, g, T, [[15.0, 2.9], [19.6, 2.9], [21.5, 1.6]], RB, 0.9);
    roofRail(THREE, g, T, [[15.0, -2.9], [19.6, -2.9], [21.5, -1.6]], RB, 0.9);
    var bg = new THREE.Group(); bg.position.set(18.3, 0, RB); b34(THREE, bg, T); g.add(bg);

    /* ---- the RBU-2500 pair abreast the B gun house, at the deck edge,
       trained forward [N][K] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.4, 1.3, 0.12, T.metal, 16.4, s * 3.85, R01 - 0.3);
      strut(THREE, g, T.metal, 15.4, s * 4.3, deckZ(15.4), 15.4, s * 4.3, R01 - 0.36, 0.06, 4);
      strut(THREE, g, T.metal, 17.4, s * 4.3, deckZ(17.4), 17.4, s * 4.3, R01 - 0.36, 0.06, 4);
      var rb = new THREE.Group(); rb.position.set(16.4, s * 3.85, R01 - 0.24); rbu2500(THREE, rb, T); g.add(rb);
    }

    /* ---- the bridge (02) x 1 to 14 and the wheelhouse (03) [N][H][S] */
    polyPrism(THREE, g, T.sup, [[1.0, -3.3], [12.6, -3.3], [14.0, -2.6], [14.0, 2.6], [12.6, 3.3], [1.0, 3.3]], R01 - 0.05, R02);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++)
      box(THREE, g, 0.5, 0.06, 0.5, T.dark, 2.4 + i * 2.6, s * 3.32, 6.9);
    polyPrism(THREE, g, T.sup, [[6.6, -2.95], [12.4, -2.95], [13.7, -2.2], [13.7, 2.2], [12.4, 2.95], [6.6, 2.95]], R02 - 0.05, R03);
    /* the bridge front windows and the wing screens */
    hexa(THREE, g, T.glass, [[13.69, -2.1, 8.85], [13.75, -2.1, 8.85], [13.75, 2.1, 8.85], [13.69, 2.1, 8.85],
                             [13.64, -2.1, 10.05], [13.7, -2.1, 10.05], [13.7, 2.1, 10.05], [13.64, 2.1, 10.05]]);
    for (i = 0; i < 5; i++) box(THREE, g, 0.07, 0.6, 0.6, T.dark, 14.03, -2.0 + i * 1.0, 6.9);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.4, 0.08, 0.75, T.glass, 13.05, s * 2.6, 9.6, s * 0.52);
      box(THREE, g, 4.6, 0.08, 0.7, T.glass, 9.8, s * 2.97, 9.6);
      box(THREE, g, 2.6, 1.5, 0.14, T.sup, 11.6, s * 3.9, R02 + 0.07);
      box(THREE, g, 2.6, 0.08, 1.0, T.sup, 11.6, s * 4.62, R02 + 0.55);
      box(THREE, g, 0.08, 1.5, 1.0, T.sup, 12.86, s * 3.9, R02 + 0.55);
    }
    roofRail(THREE, g, T, [[1.2, 3.2], [6.4, 3.2]], R02, 0.9);
    roofRail(THREE, g, T, [[1.2, -3.2], [6.4, -3.2]], R02, 0.9);
    roofRail(THREE, g, T, [[1.2, 3.2], [1.2, -3.2]], R02, 0.9);
    box(THREE, g, 7.0, 5.8, 0.1, T.metal, 10.0, 0, R03 + 0.05);
    roofRail(THREE, g, T, [[7.0, 2.85], [12.4, 2.85], [13.6, 2.1], [13.6, -2.1], [12.4, -2.85], [7.0, -2.85]], R03, 0.9);
    /* the director tower rising aft of the wheelhouse, the Yakor-M on it */
    polyPrism(THREE, g, T.sup, [[3.2, -1.9], [7.4, -1.9], [7.9, -1.4], [7.9, 1.4], [7.4, 1.9], [3.2, 1.9]], R02 - 0.05, 12.4);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.6, 0.06, 0.5, T.dark, 5.2, s * 1.92, 11.2);
    director(THREE, g, T, 5.4, 12.4);
    /* the two whip poles [N][K] and a signal lamp each side */
    strut(THREE, g, T.metal, 9.8, 0.8, R03, 9.8, 0.8, 17.8, 0.05, 4);
    strut(THREE, g, T.metal, 12.0, -0.8, R03, 12.0, -0.8, 15.6, 0.05, 4);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.2, 0.2, 0.45, 10, T.metal, 12.2, s * 4.2, R02 + 1.3);

    /* ---- the lattice mast, its yard, the Slim Net and the pole topmast
       with the Neptun-M [N][H][O] */
    latticeMast(THREE, g, T, -3.0, 2.0, 1.75, R01, -2.0, 0.5, 0.7, 14.5);
    box(THREE, g, 3.6, 2.2, 0.12, T.metal, -0.6, 0, 14.55);
    roofRail(THREE, g, T, [[-2.4, 1.05], [1.1, 1.05], [1.1, -1.05], [-2.4, -1.05], [-2.4, 1.05]], 14.55, 0.7);
    box(THREE, g, 0.14, 7.0, 0.14, T.metal, 0.3, 0, 13.8);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 0.3, s * 0.6, 14.5, 0.3, s * 3.4, 13.85, 0.025, 3);
    slimNet(THREE, g, T, -0.5, 15.3);
    cylZ(THREE, g, 0.5, 0.6, 0.8, 8, T.metal, -0.5, 0, 14.95);
    strut(THREE, g, T.metal, -2.1, 0, 14.6, -2.1, 0, 23.0, 0.08, 6);
    box(THREE, g, 0.1, 3.0, 0.1, T.metal, -2.1, 0, 22.1);
    box(THREE, g, 0.6, 0.6, 0.08, T.metal, -1.95, 0, 20.6);
    cheese(THREE, g, T.metal, 1.6, 0.35, -1.75, 0, 20.95, 0);
    cylZ(THREE, g, 0.08, 0.1, 0.3, 6, T.metal, -1.95, 0, 20.75);

    /* ---- the funnel, raked aft, x -7.5 to -2.5 [N][S][H][O] */
    funnel(THREE, g, T, -4.3, 5.8, 3.8, R01 - 0.05, 10.55, 9.7, 0.15);

    /* ---- the boats under the mast on chocks, with davits [N][K] */
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T, -2.6, s * 4.25, deckZ(-2.6) + 0.9, 5.8, 1.7);
      for (i = 0; i < 2; i++) {
        var dx = -4.7 + i * 4.2;
        strut(THREE, g, T.metal, dx, s * 3.6, R01 - 0.2, dx, s * 3.75, R01 + 1.6, 0.08, 5);
        strut(THREE, g, T.metal, dx, s * 3.75, R01 + 1.6, dx, s * 4.35, R01 + 1.9, 0.07, 5);
        box(THREE, g, 0.5, 0.25, 0.9, T.metal, -2.6 + (i - 0.5) * 3.2, s * 4.25, deckZ(-2.6) + 0.45);
      }
    }

    /* ---- the triple torpedo tubes on the centreline abaft the funnel [N][H] */
    var tt = new THREE.Group(); tt.position.set(-10.6, 0, deckZ(-10.6)); tta53(THREE, tt, T); g.add(tt);

    /* ---- the after deckhouse x -23.5 to -15 with the 37 mm twins [N][H] */
    polyPrism(THREE, g, T.sup, [[-23.5, -3.0], [-22.8, -3.5], [-15.6, -3.5], [-15.0, -3.0], [-15.0, 3.0], [-15.6, 3.5], [-22.8, 3.5], [-23.5, 3.0]],
              deckZ(-23.5) - 0.2, RAFT);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) box(THREE, g, 0.45, 0.06, 0.45, T.dark, -21.6 + i * 2.6, s * 3.52, 4.3);
      box(THREE, g, 0.9, 0.06, 1.7, T.dark, -16.4, s * 3.52, 3.75);
      cylZ(THREE, g, 1.25, 1.3, 0.3, 16, T.sup, -19.5, s * 2.15, RAFT + 0.15);
      var k = new THREE.Group(); k.position.set(-19.5, s * 2.15, RAFT + 0.3); v11(THREE, k, T); g.add(k);
    }
    roofRail(THREE, g, T, [[-15.2, 3.3], [-23.3, 3.3], [-23.3, -3.3], [-15.2, -3.3]], RAFT, 0.9);
    /* the raised sight post between the twins and the two poles [N] */
    tprism(THREE, g, 1.6, 1.6, 1.3, 1.3, 1.2, T.sup, -16.4, 0, RAFT + 0.6);
    cylZ(THREE, g, 0.45, 0.45, 0.5, 10, T.sup, -16.4, 0, RAFT + 1.45);
    strut(THREE, g, T.metal, -16.7, 0.75, RAFT, -16.7, 0.75, 14.0, 0.055, 4);
    strut(THREE, g, T.metal, -15.1, -0.75, RAFT, -15.1, -0.75, 13.2, 0.055, 4);
    /* vents and lockers between the tubes and the after deckhouse */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.3, 0.35, 0.9, 10, T.sup, -14.6, s * 3.5, deckZ(-14.6) + 0.45);
      cylZ(THREE, g, 0.45, 0.3, 0.3, 10, T.dark, -14.6, s * 3.5, deckZ(-14.6) + 1.05);
      box(THREE, g, 1.4, 0.8, 0.9, T.sup, -25.8, s * 2.8, deckZ(-25.8) + 0.45);
    }

    /* ---- the after 100 mm on its low pedestal, trained aft, and the small
       house abaft it [N][H][O] */
    cylZ(THREE, g, 1.6, 1.7, 0.5, 18, T.sup, -28.6, 0, deckZ(-28.6) + 0.2);
    var aft = new THREE.Group(); aft.position.set(-28.6, 0, deckZ(-28.6) + 0.45); aft.rotation.z = PI;
    b34(THREE, aft, T); g.add(aft);
    polyPrism(THREE, g, T.sup, [[-34.6, -1.7], [-31.4, -1.7], [-31.4, 1.7], [-34.6, 1.7]], deckZ(-34.6) - 0.2, 5.0);
    box(THREE, g, 0.06, 0.8, 1.6, T.dark, -31.37, 0, 3.5);

    /* ---- depth-charge gear: four BMB-2 throwers abreast, two stern racks
       [N][O] */
    for (s = -1; s <= 1; s += 2) {
      [-39.0, -36.4].forEach(function (bx) {
        var t = new THREE.Group(); t.position.set(bx, s * 3.7, deckZ(bx)); bmb2(THREE, t, T, s); g.add(t);
        box(THREE, g, 1.2, 0.7, 0.6, T.metal, bx + 0.2, s * 2.7, deckZ(bx) + 0.3);
      });
      var ry = s * 2.0, r0 = -44.9, r1 = -40.2;
      box(THREE, g, r1 - r0, 0.12, 0.1, T.metal, (r0 + r1) / 2, ry - 0.45, deckZ(r1) + 0.55);
      box(THREE, g, r1 - r0, 0.12, 0.1, T.metal, (r0 + r1) / 2, ry + 0.45, deckZ(r1) + 0.55);
      for (i = 0; i < 4; i++) strut(THREE, g, T.metal, r0 + i * 1.5, ry - 0.45, deckZ(r0), r0 + i * 1.5, ry - 0.45, deckZ(r0) + 0.55, 0.04, 4);
      for (i = 0; i < 4; i++) strut(THREE, g, T.metal, r0 + i * 1.5, ry + 0.45, deckZ(r0), r0 + i * 1.5, ry + 0.45, deckZ(r0) + 0.55, 0.04, 4);
      for (i = 0; i < 6; i++) cylY(THREE, g, 0.24, 0.62, 10, T.gun, r0 + 0.5 + i * 0.75, ry, deckZ(r0) + 0.85);
    }

    /* ---- forecastle: the V breakwater ahead of the A gun, ground tackle,
       the jackstaff [N][O] */
    for (s = -1; s <= 1; s += 2) {
      var BW = [[27.4, s * 3.85, deckZ(27.4) - 0.1], [32.2, s * 0.1, deckZ(32.2) - 0.1], [32.2, s * 0.25, deckZ(32.2) - 0.1], [27.4, s * 4.0, deckZ(27.4) - 0.1],
                [27.2, s * 3.85, deckZ(27.4) + 0.95], [32.0, s * 0.1, deckZ(32.2) + 0.95], [32.0, s * 0.25, deckZ(32.2) + 0.95], [27.2, s * 4.0, deckZ(27.4) + 0.95]];
      /* the starboard arm is the mirror image: keep its faces wound outward */
      if (s < 0) BW = [BW[1], BW[0], BW[3], BW[2], BW[5], BW[4], BW[7], BW[6]];
      hexa(THREE, g, T.sup, BW);
      cylZ(THREE, g, 0.42, 0.48, 0.5, 10, T.metal, 35.6, s * 0.9, deckZ(35.6) + 0.25);
      box(THREE, g, 4.0, 0.16, 0.07, T.gun, 37.6, s * 1.25, deckZ(37.6) + 0.04, -s * 0.18);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, 31.0, s * 2.9, deckZ(31) + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, 31.5, s * 2.85, deckZ(31.5) + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, -42.5, s * 3.6, deckZ(-42.5) + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, -12.5, s * 4.5, deckZ(-12.5) + 0.22);
    }
    box(THREE, g, 1.1, 0.9, 0.5, T.metal, 34.4, 0, deckZ(34.4) + 0.25);
    strut(THREE, g, T.metal, 45.0, 0, deckZ(45.0), 45.0, 0, deckZ(45.0) + 2.6, 0.045, 4);
    strut(THREE, g, T.metal, -45.2, 0, deckZ(-45.2), -45.2, 0, deckZ(-45.2) + 3.6, 0.05, 4);

    /* ---- underwater gear: two shafts on A-brackets, screws, two rudders [R] */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.18, 0.18, 9.0, 8, T.metal, -35.5, s * 2.2, -2.4);
      strut(THREE, g, T.metal, -39.0, s * 2.2, -2.4, -39.0, s * 2.9, -1.0, 0.11, 4);
      strut(THREE, g, T.metal, -39.0, s * 2.2, -2.4, -39.0, s * 1.4, -1.2, 0.11, 4);
      cylX(THREE, g, 0.26, 0.38, 0.7, 8, T.metal, -40.6, s * 2.2, -2.4);
      for (i = 0; i < 3; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 1.1), T.metal);
        bl.position.set(-40.6, s * 2.2, -2.4); bl.rotation.x = i * 2 * PI / 3 + 0.3;
        bl.translateZ(0.7); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 1.8, 0.18, 2.0, T.metal, -42.6, s * 1.6, -1.25);
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 26.0, 0.07, 0.45, T.under, -4.0, s * (W(-4, -2.4) + 0.12), -2.45);

    /* ---- rails along the deck edge */
    railRun(THREE, g, T, -45.0, 3.8, 3.0, 1.0);
    railRun(THREE, g, T, 15.4, 44.6, 2.9, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.0, 0.9, 0.04, T.team, -33.0, 0, 5.02);
    box(THREE, g, 2.2, 0.9, 0.04, T.team, 8.8, 0, R03 + 0.12);
    box(THREE, g, 1.8, 0.8, 0.04, T.team, 16.2, 0, RB + 0.02);

    /* trained mount: the forward 100 mm (A gun) on the forecastle [N][S][K];
       the row's first weapon is the B-34 */
    cylZ(THREE, g, 1.55, 1.7, 0.55, 18, T.sup, 25.8, 0, deckZ(25.8) + 0.1);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(25.8, 0, deckZ(25.8) + 0.35); b34(THREE, tw, T);

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

/* Registration: len is the real overall length of Project 50, 91.0 m. */
UNIT_MODELS["pact_e50_corvette"] = {
  len: 91.0,
  build: function (THREE, M, C) { return HeroRiga.build(THREE, M, C); }
};

/* The PLAN's Type 6601 frigates were Project 50 (Riga) ships: "4 ships were built in kits
   for the People's Liberation Army Navy to be licence assembled in China as Chengdu class
   (Type 6601/01) frigate" (en.wikipedia "Riga-class frigate").  Drawn as this Project 50
   model; any differences of the Chinese-assembled ships are NOT drawn.  No markings. */
UNIT_MODELS["pla_e50_corvette"] = {
  len: 91.0,
  build: function (THREE, M, C) { return HeroRiga.build(THREE, M, C); }
};
