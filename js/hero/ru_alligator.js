/* ==================== js/hero/ru_alligator.js ============================
   HERO MODEL -- Project 1171 "Tapir" (NATO Alligator) large landing ship
   (BDK).  Key: pact_e60_lst (service 1965, e60 to e80).  REDO 2026-10-24.
   SERIES DRAWN: the first group (Yantar yard nos. 291-294, completed
   1966-67, NATO "Alligator I"), as navypedia draws the lead ship,
   Voronezhskiy Komsomolets (later Saratov), in 1970: THREE cranes (one on
   the quarterdeck, two on the cargo deck), the open bridge on the
   wheelhouse roof, one twin 57 mm ZIF-31B, NO Grad launcher and NO 25 mm
   guns.  The row's service year (1965) and the e60 start point at this
   group; the later groups (enclosed bridge, one crane, A-215 Grad-M on
   the forecastle from no. 298, twin 25 mm on 303-305) are NOT drawn.
   Length overall 113.1 m, beam 15.6 m, draught 4.5 m (navypedia; the
   game row and facts: 113 m, 3,400 t, built 1964-75, from 1965).

   REFERENCES (fetched with a generic User-Agent; Commons at width 960):
     [D] navypedia.org "BDK-10 large landing ships (project 1171)", its
         standard-scale drawing "Voronezhskiy Komsomolets 1970" (starboard
         profile drawn to the waterline, and a plan; 3.20 px a metre over
         the 113.1 m).  Every station below is read off it; its plan beam
         over the outline (16.6 m) is scaled to the published 15.6 m.  The
         same page: 113.1 x 15.6 x 4.5 m; "bow and stern ramps ...
         essentially of freighter configuration"; "early units have three
         cranes (15t and two 5t); later ships have only one crane"; "later
         units have an enclosed bridge and a RL forward"; armament by yard
         number (291-296: one twin 57/75 ZIF-31B only); 1-2 Don radars.
     [W] ru.wikipedia "Bolshie desantnye korabli proekta 1171": freighter-
         like, superstructure only aft, a watertight hinged stern door
         (lacport) for loading over a pier stern-to and for craft; the bow
         vehicle space with the landing ramp closed by doors that open
         apart; cranes on deck; the ZIF-31B.
     [S] Commons "Slavic Commonwealth 2012 02.jpg" (Saratov, the lead
         ship, port side, 2012): the hull - the high after body, the side
         curving down abreast the superstructure front to the cargo deck,
         the strake along the cargo deck's deck line under a solid
         bulwark, the long sheer to the high raked bow, the hawse with its
         anchor at about 0.86 of the length, the bow door seam; two
         box-pedestal cranes with lattice booms on the cargo deck.  Her
         2012 bridge, paint and the missing aft crane are NOT used.
     [V] Commons "Saratov2007Sevastopol.jpg" (starboard, 2007): the two
         forward cranes with booms raised, the superstructure aft.
     [N] Commons "Vysadka na ostrov Nokra.jpg" (a ship beached, bow open,
         a T-54/55 coming ashore): the bow doors - two tall side-hinged
         leaves forming the bow from the waterline up to the forecastle
         bulwark, the ramp inside, the fixed stem head above.
     [B] Commons "BDK Saratov.png" (beached, bow open, colour): the same
         doors and ramp, the forecastle bulwark over the opening.
     [U] Commons "USN 1144921 Soviet Alligator Class.jpg" (1970s, a later
         one-crane ship): the light grey hull and lighter upper works.
     [C] Commons "428-GX-KN 22781" (NARA, colour, from the air, a later
         ship): the period paint - light grey hull and superstructure,
         red-brown decks; boats beside the superstructure; the hatches.

   RECOGNITION LIST (where each shows):
     1. Long freighter-like hull, the superstructure only in the after
        third, the forward two-thirds an open cargo deck [D][S][W] - STA,
        deckZ, tier1-tier3.
     2. The side line: high after body (9 m), curving down abreast the
        superstructure front to the cargo deck bulwark (7 m), then the
        long sheer up to a high raked stem head (12.7 m) [D][S] - zS().
     3. Solid bulwark round the cargo deck and forecastle with the strake
        and freeing ports at the deck line [D][S] - bulwark(), ports.
     4. The bow doors: two leaves from the waterline to 8 m, the hinge
        lines raked a little forward, the seam on the stem [D][N][B][S]
        - bowSeams(); drawn SHUT (no def.bowRamp, see below).
     5. The stern door in the raked transom [W][D] - sternDoor().
     6. THREE cranes: the big one (15 t) at x 4 with its boom raised over
        the cargo deck, the 5 t one at x 23 with its boom stowed forward on
        a crutch, the 5 t one on the quarterdeck at x -50.4 [D][S][V]
        - crane().
     7. Four hatch groups: three on the cargo deck, one on the quarterdeck
        [D plan][C] - hatch().
     8. Stepped superstructure: the 01 level nearly full width, the 02
        level, the front block and the wheelhouse with the open bridge on
        its roof [D][U] - tier blocks, bridge().
     9. The broad oval funnel with its dark top band and two exhaust
        pipes, and the pole mast on its fore end with the Don radar and a
        yard [D] - funnel, mast.
    10. The twin 57 mm ZIF-31B on its platform at the superstructure front
        over the cargo deck [D][W] - zif31().
    11. Two boats under davits on the 01 roof beside the 02 level [D plan]
        [C] - boat().
    12. Paint: light grey hull and upper works, red-brown decks, black
        boot topping, red underwater body [C][U].

   STATION TABLE (x from amidships, + forward; z above the waterline;
   half-breadths after the 0.94 plan scale; the keel is not on [D]:
   4.5 m draught amidships, rising to a long beaching forefoot and to the
   counter aft):
       x      side top z   half at side top   half at WL   keel z
     -56.55      9.40          4.60              -          (transom top)
     -53.6       9.20          5.90             5.55        -0.97 (transom foot)
     -45.9       9.00          7.35             7.00        -3.40
     -36.5       8.90          7.80             7.80        -4.50
     -13.0       8.85          7.80             7.80        -4.50 (01 front)
      -9.0       7.60          7.80             7.80        -4.50
      -4.0       6.95          7.80             7.80        -4.50 (cargo deck)
      24.4       7.05          7.80             7.70        -4.45
      33.8       7.45          7.25             6.85        -4.30
      40.0       8.40          6.80             5.85        -4.05 (forecastle)
      46.3      10.60          5.90             4.10        -3.30
      51.0      11.60          4.55             2.10        -1.90
      53.9      12.15          3.00             0.00         0.00 (stem at WL)
      56.55     12.70          0.15              -            -   (stem head)
   Decks: the quarterdeck flush with the side at about 8.8 m; the cargo
   deck at 5.75-6.0 m under a 1.2 m bulwark (the strake line of [D] and
   [S]); the forecastle from 7.4 m at its break (x 39.2) rising with the
   sheer under a 1.0-1.4 m bulwark.  The transom is raked 2.95 m from its
   foot (x -53.6, under water) to the top (x -56.55) [D].

   NO "bowramp" NODE: pact_e60_lst has no def.bowRamp (js/eras.js), so
   render3d.js never looks for one and the doors are drawn SHUT and baked,
   as us_newport_lst.js does; nor a "wellgate" (no well deck).  The
   stern door's outline is approximate: no reference gives its size.

   PAINT.  [C] (colour, 1980s) and [U] (1970s) show a light grey hull with
   lighter upper works and red-brown decks; set beside the accepted
   Soviet heroes (Rogov 0x788085 hull, 0x6f4335 decks; Kashin 0x8a9298)
   at about 0.85 of a light Soviet grey: hull 0x7d868c, upper works
   0x889095, decks 0x6b4033.  The 2007-2012 dark grey and red boot of [S]
   [V] are later paint and NOT used.  No hull numbers, names, stars or
   ensigns.  The team colour is exactly C.team: three small flashes on
   roofs and the forecastle.

   NOT DRAWN (no reference shows it well enough): the Strela-3 posts of the
   1970s refits, deck cargo and vehicles, the bow ramp inside the doors,
   the turntables and tank deck, the anchor at the stern, the second Don
   radar, flags.  The stern-door gantry (two posts at the transom) is
   drawn as the 1970 drawing shows a post pair there; its use is my
   reading.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  X extent
   113.1 m, transom top to stem head; nothing is proud of either end.
   The row is turret:false, so nothing is named "turret"; every part is
   baked into one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAlligator = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -56.55, XS1 = 56.55, XWL = 53.9, XTR = -53.6;  /* transom top, stem head, stem at the WL, transom foot [D] */
  var XSTEP = -12.0, XFC = 39.2;   /* superstructure-front step down to the cargo deck; forecastle break [D][S] */

  /* HULL SECTION TABLE from [D] (3.20 px/m, plan x 0.94):
     x, side top z, half beam at the side top, half beam at the WL, keel z,
     bilge fullness (super-ellipse power) */
  var STA = [
    [-56.55, 9.40, 4.60, 4.40, -0.80, 2.4],
    [-55.0,  9.30, 5.40, 5.10, -0.90, 2.4],
    [-53.1,  9.20, 5.95, 5.60, -1.00, 2.4],
    [-50.6,  9.10, 6.50, 6.10, -2.20, 2.6],
    [-45.9,  9.00, 7.35, 7.00, -3.40, 3.0],
    [-41.2,  8.95, 7.75, 7.60, -4.20, 3.5],
    [-36.5,  8.90, 7.80, 7.80, -4.50, 4.0],
    [-13.0,  8.85, 7.80, 7.80, -4.50, 4.0],
    [-11.5,  8.60, 7.80, 7.80, -4.50, 4.0],
    [ -9.0,  7.60, 7.80, 7.80, -4.50, 4.0],
    [ -6.5,  7.05, 7.80, 7.80, -4.50, 4.0],
    [ -4.0,  6.95, 7.80, 7.80, -4.50, 4.0],
    [ 15.0,  6.95, 7.80, 7.80, -4.50, 4.0],
    [ 24.4,  7.05, 7.80, 7.70, -4.45, 3.8],
    [ 29.1,  7.20, 7.65, 7.40, -4.40, 3.4],
    [ 33.8,  7.45, 7.25, 6.85, -4.30, 3.0],
    [ 38.5,  7.95, 6.90, 6.20, -4.15, 2.6],
    [ 40.0,  8.40, 6.80, 5.85, -4.05, 2.5],
    [ 43.1,  9.60, 6.60, 5.10, -3.80, 2.2],
    [ 46.3, 10.60, 5.90, 4.10, -3.30, 2.0],
    [ 48.8, 11.10, 5.45, 3.20, -2.70, 1.8],
    [ 51.0, 11.60, 4.55, 2.10, -1.90, 1.6],
    [ 52.5, 11.85, 3.80, 1.20, -1.10, 1.5],
    [ 53.9, 12.15, 3.00, 0.00,  0.00, 1.4],
    [ 55.3, 12.40, 2.10, 0.00,  0.00, 1.3],
    [ 56.55, 12.70, 0.15, 0.00, 0.00, 1.3]
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
  function zS(x) { return pick(x, 1); }
  function halfB(x) { return pick(x, 2); }
  /* the raked stem forward of XWL, the raked transom aft of XTR [D] */
  function zBot(x) {
    if (x > XWL) return zS(XS1) * (x - XWL) / (XS1 - XWL);
    if (x < XTR) { var k0 = pick(XTR, 4); return k0 + (XTR - x) / (XTR - XS0) * (zS(XS0) - k0); }
    return pick(x, 4);
  }
  /* half breadth at height z: flared above the WL, super-ellipse bilge below */
  function W(x, z) {
    var zs = zS(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zs) return bd;
    if (z <= zb) return 0;
    if (x > XWL) {
      var p = 1.5 - 0.5 * (x - XWL) / (XS1 - XWL);
      return bd * Math.pow((z - zb) / (zs - zb), p);
    }
    if (z >= 0) return bw + (bd - bw) * Math.pow(z / zs, 1.5);
    var n = pick(x, 5), t = Math.min(1, z / pick(x, 4));
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  /* weather decks: the quarterdeck flush with the side, the cargo deck
     under its 1.2 m bulwark, the forecastle under a 1.0-1.4 m one [D][S] */
  function deckZ(x) {
    if (x <= XSTEP) return zS(x) - 0.12;
    if (x < XFC) return 5.75 + Math.max(0, x - 30) / (XFC - 30) * 0.25;
    return zS(x) - (1.0 + 0.4 * (x - XFC) / (XS1 - XFC));
  }
  var BW_T = 0.18;   /* bulwark thickness */
  function deckHW(x) { var w = W(x, deckZ(x) + 0.001); return x <= XSTEP ? w : Math.max(0.05, w - BW_T); }

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
  /* hull plating: one tile is 24 m x 8 m (UVs are metres / tile): strakes
     every 1.6 m, butts every 6 m, rust and weathering streaks */
  function hullTex(THREE) {
    return canvasTex(THREE, "hull", 512, 256, function (g, w, h) {
      var R = rng(1171), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 4; i++) {
        var xx = i * w / 4 + (i % 2) * 22;
        g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 46; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : (R() < 0.5 ? "#ffffff" : "#5a3a28");
        g.fillRect(R() * w, R() * h, 2 + R() * 6, 20 + R() * 90);
      }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "plate", 256, 256, function (g, w, h) {
      var R = rng(1173), i;
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
  /* red-brown deck paint: plating seams, worn tracks of vehicles [C] */
  function deckTex(THREE) {
    return canvasTex(THREE, "deck", 256, 256, function (g, w, h) {
      var R = rng(291), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.09;
      for (i = 0; i < 34; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* the dark parts: funnel top grille, openings, seams */
  function grilleTex(THREE) {
    return canvasTex(THREE, "grille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  var PAINT = { hull: 0x7d868c, sup: 0x889095, deck: 0x6b4033, soot: 0x26282a };
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
      boot:  skin(0x111315, hullTex(THREE), 0.9),
      under: skin(0x4a1c16, hullTex(THREE), 0.9),
      sup:   skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:  skin(PAINT.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5c636a, 0.52, 0.55),
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
  /* rounded-corner rectangle outline, CCW from above */
  function rrect(x0, x1, hw, rf, ra) {
    var P = [], i, a;
    for (i = 0; i <= 3; i++) { a = -PI / 2 + i * PI / 6; P.push([x1 - rf + rf * Math.cos(a), (-hw + rf) + rf * Math.sin(a)]); }
    for (i = 0; i <= 3; i++) { a = i * PI / 6; P.push([x1 - rf + rf * Math.cos(a), (hw - rf) + rf * Math.sin(a)]); }
    for (i = 0; i <= 3; i++) { a = PI / 2 + i * PI / 6; P.push([x0 + ra + ra * Math.cos(a), (hw - ra) + ra * Math.sin(a)]); }
    for (i = 0; i <= 3; i++) { a = PI + i * PI / 6; P.push([x0 + ra + ra * Math.cos(a), (-hw + ra) + ra * Math.sin(a)]); }
    return P;
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
  /* quads between two polylines A[i] and B[i] (points [x,y,z]) */
  function strip(THREE, m, A, B, flip, uvs) {
    var pos = [], uv = [], i;
    function v(P) { pos.push(P[0], P[1], P[2]); uv.push(P[0] / (uvs || 8), (P[2] + P[1]) / (uvs || 8)); }
    for (i = 0; i < A.length - 1; i++) {
      if (!flip) { v(A[i]); v(A[i + 1]); v(B[i + 1]); v(A[i]); v(B[i + 1]); v(B[i]); }
      else { v(A[i]); v(B[i + 1]); v(A[i + 1]); v(A[i]); v(B[i]); v(B[i + 1]); }
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv), m);
  }

  /* ---------------------------------------------------------------- hull */
  function hullXs(x0, x1) {
    var xs = [], x, i;
    for (x = XS0; x < XS1 - 0.01; x += 2.5) xs.push(x);
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (x = 42; x < XS1; x += 1.3) xs.push(x);
    for (x = -56; x < -50; x += 0.75) xs.push(x);
    for (x = -13; x < -4; x += 1.0) xs.push(x);
    xs.push(XS1, XWL, XTR, XSTEP, XFC, XSTEP + 0.01, XFC - 0.01);
    if (x0 !== undefined) xs = xs.filter(function (v) { return v >= x0 - 1e-6 && v <= x1 + 1e-6; }).concat([x0, x1]);
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
        var x = xs[i], zb = zBot(x), zd = zS(x);
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
  /* the raked transom [D]: strips across at the transom line, by paint band */
  function transom(THREE, g, T) {
    var N = 14, i, x0, x1, z0, z1, w0, w1, P = { hull: [], boot: [], under: [] };
    for (i = 0; i < N; i++) {
      x0 = XS0 + (XTR - XS0) * i / N; x1 = XS0 + (XTR - XS0) * (i + 1) / N;
      z0 = zBot(x0); z1 = zBot(x1);
      w0 = W(x0, z0 + 0.002); w1 = W(x1, z1 + 0.002);
      var zm = (z0 + z1) / 2, key = zm > 0.4 ? "hull" : (zm > -0.2 ? "boot" : "under");
      P[key].push([x0, -w0, z0], [x0, w0, z0], [x1, w1, z1], [x0, -w0, z0], [x1, w1, z1], [x1, -w1, z1]);
    }
    ["hull", "boot", "under"].forEach(function (k) {
      if (!P[k].length) return;
      var pos = [], uv = [];
      P[k].forEach(function (q) { pos.push(q[0], q[1], q[2]); uv.push(q[1] / 24, q[2] / 8); });
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T[k]));
    });
  }
  /* the stern door in the raked transom [W][D]: its seams, hinge at the foot
     (outline approximate) */
  function sternDoor(THREE, g, T) {
    var zl = 1.6, zh = 8.5, hw = 2.3, e = 0.06;
    function px(z) { return zBotInvX(z) - e; }
    hexa(THREE, g, T.dark, [[px(zl), -hw, zl], [px(zl) + 0.01, -hw, zl], [px(zl) + 0.01, hw, zl], [px(zl), hw, zl],
                            [px(zl), -hw, zl + 0.16], [px(zl) + 0.01, -hw, zl + 0.16], [px(zl) + 0.01, hw, zl + 0.16], [px(zl), hw, zl + 0.16]]);
    hexa(THREE, g, T.dark, [[px(zh), -hw, zh - 0.16], [px(zh) + 0.01, -hw, zh - 0.16], [px(zh) + 0.01, hw, zh - 0.16], [px(zh), hw, zh - 0.16],
                            [px(zh), -hw, zh], [px(zh) + 0.01, -hw, zh], [px(zh) + 0.01, hw, zh], [px(zh), hw, zh]]);
    [-1, 1].forEach(function (s) {
      var y0 = s * hw, y1 = s * (hw - 0.16);
      hexa(THREE, g, T.dark, [[px(zl), Math.min(y0, y1), zl], [px(zl) + 0.01, Math.min(y0, y1), zl], [px(zl) + 0.01, Math.max(y0, y1), zl], [px(zl), Math.max(y0, y1), zl],
                              [px(zh), Math.min(y0, y1), zh], [px(zh) + 0.01, Math.min(y0, y1), zh], [px(zh) + 0.01, Math.max(y0, y1), zh], [px(zh), Math.max(y0, y1), zh]]);
      /* the hinge knuckles at the foot */
      cylX(THREE, g, 0.18, 0.18, 0.5, 8, T.metal, px(zl) + 0.05, s * (hw - 0.6), zl - 0.05);
    });
  }
  function zBotInvX(z) {   /* x of the transom face at height z */
    var k0 = pick(XTR, 4);
    return XTR - (z - k0) / (zS(XS0) - k0) * (XTR - XS0);
  }
  /* a deck sheet from x0 to x1, edge to edge, 4 strips across */
  function deckSheet(THREE, m, x0, x1, lift) {
    var xs = hullXs(x0, x1), pos = [], uv = [], idx = [], i, j, NC = 4;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = deckHW(x), z = deckZ(x) + (lift || 0);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, w * (1 - 2 * j / NC) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  /* the bulwark's inner face and cap from x0 to x1 [D][S] */
  function bulwark(THREE, g, T, x0, x1) {
    var xs = hullXs(x0, x1).filter(function (x) { return x < XS1 - 0.25; }), s;
    for (s = -1; s <= 1; s += 2) {
      var A = [], B = [], C = [], D = [];
      xs.forEach(function (x) {
        var zt = zS(x), zd = deckZ(x), wt = W(x, zt - 0.001), wi = Math.max(0.05, wt - BW_T);
        A.push([x, s * Math.max(0.05, W(x, zd + 0.001) - BW_T), zd]); B.push([x, s * wi, zt]);
        C.push([x, s * wi, zt]); D.push([x, s * wt, zt]);
      });
      g.add(strip(THREE, T.hull, A, B, s < 0));
      g.add(strip(THREE, T.hull, C, D, s < 0));
    }
  }
  function railRun(THREE, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * (halfB(x) - 0.15); z = deckZ(x);
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.02, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  /* rail along a polyline at height z */
  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 2.0));
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.025, 3);
      strut(THREE, g, T.metal, a[0], a[1], z + hgt * 0.5, b[0], b[1], z + hgt * 0.5, 0.02, 3);
      for (k = 0; k <= n; k++) {
        var x = a[0] + (b[0] - a[0]) * k / n, y = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
      }
    }
  }

  /* One mesh per material: bake every mesh under root into merged
     geometry in root's frame. */
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
  /* a lattice boom: four chords from the foot (w0 square) to the tip (w1),
     laced on the sides, luffed at el (rad) toward +x */
  function boom(THREE, g, m, x0, y0, z0, L, el, w0, w1, n) {
    var dx = Math.cos(el), dz = Math.sin(el), nx = -dz, nz = dx, i;
    function P(f, sy, sn) {
      var w = (w0 + (w1 - w0) * f) / 2;
      return [x0 + dx * L * f + nx * sn * w, y0 + sy * w, z0 + dz * L * f + nz * sn * w];
    }
    function S(a, b, r) { strut(THREE, g, m, a[0], a[1], a[2], b[0], b[1], b[2], r, 4); }
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(function (c) { S(P(0, c[0], c[1]), P(1, c[0], c[1]), 0.09); });
    for (i = 0; i < n; i++) {
      var f0 = i / n, f1 = (i + 1) / n, a = i % 2 ? 1 : -1;
      S(P(f0, -1, a), P(f1, -1, -a), 0.04); S(P(f0, 1, a), P(f1, 1, -a), 0.04);
      if (i % 2 === 0) { S(P(f1, -1, 1), P(f1, 1, 1), 0.035); S(P(f1, -1, -1), P(f1, 1, -1), 0.035); }
    }
    return [x0 + dx * L, y0, z0 + dz * L];
  }
  /* a deck crane as [S][V][D] show them: box pedestal, slewing cab with its
     A-frame, lattice boom forward */
  function crane(THREE, g, T, cx, cz, pedH, L, el, big) {
    var pw = big ? 2.8 : 2.3, zt = cz + pedH, s;
    tprism(THREE, g, pw + 0.4, pw + 0.4, pw, pw, pedH, T.sup, cx, 0, cz + pedH / 2);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.7, 0.05, 1.4, T.dark, cx, s * (pw / 2 + 0.11), cz + 1.0);
    cylZ(THREE, g, pw * 0.48, pw * 0.48, 0.35, 14, T.metal, cx, 0, zt + 0.17);
    var cl = big ? 3.8 : 3.2, cw = big ? 2.8 : 2.4, ch = big ? 2.8 : 2.2;
    box(THREE, g, cl, cw, ch, T.sup, cx - 0.5, 0, zt + 0.35 + ch / 2);
    box(THREE, g, 0.06, cw * 0.7, 0.8, T.glass, cx - 0.5 + cl / 2 + 0.02, 0, zt + 0.35 + ch * 0.62);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.2, 0.05, 0.7, T.glass, cx + 0.4, s * (cw / 2 + 0.02), zt + 0.35 + ch * 0.62);
    box(THREE, g, 1.4, cw * 0.9, 0.9, T.metal, cx - 0.5 - cl / 2 - 0.5, 0, zt + 0.8);   /* counterweight */
    /* A-frame on the cab roof */
    var ax = cx - 0.9, az = zt + 0.35 + ch + (big ? 5.2 : 3.6), bz = zt + 0.35 + ch;
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, cx + 0.6, s * cw * 0.4, bz, ax, s * 0.25, az, 0.11, 4);
      strut(THREE, g, T.metal, cx - 0.5 - cl / 2 + 0.2, s * cw * 0.4, bz, ax, s * 0.25, az, 0.09, 4);
    }
    box(THREE, g, 0.4, 0.8, 0.4, T.metal, ax, 0, az);
    /* the boom from its heel at the cab front */
    var hx = cx - 0.5 + cl / 2 - 0.2, hz = zt + 0.9;
    var tip = boom(THREE, g, T.metal, hx, 0, hz, L, el, big ? 1.1 : 0.9, big ? 0.45 : 0.4, big ? 14 : 10);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, ax, s * 0.2, az, tip[0], s * 0.15, tip[2] + 0.2, 0.025, 3);
    /* fall and hook block */
    strut(THREE, g, T.metal, tip[0] + 0.2, 0, tip[2], tip[0] + 0.2, 0, tip[2] - 2.2, 0.03, 3);
    box(THREE, g, 0.45, 0.4, 0.6, T.gun, tip[0] + 0.2, 0, tip[2] - 2.5);
    return tip;
  }
  /* a hatch group: coaming, covers with their panel seams [D plan][C] */
  function hatch(THREE, g, T, x0, x1, hw, panels) {
    var z = deckZ((x0 + x1) / 2), ch = 0.55, i;
    polyPrism(THREE, g, T.sup, [[x0, -hw], [x1, -hw], [x1, hw], [x0, hw]], z - 0.1, z + ch);
    box(THREE, g, x1 - x0 - 0.3, 2 * hw - 0.3, 0.12, T.deck, (x0 + x1) / 2, 0, z + ch + 0.05);
    for (i = 1; i < panels; i++) box(THREE, g, 0.1, 2 * hw - 0.4, 0.04, T.dark, x0 + (x1 - x0) * i / panels, 0, z + ch + 0.12);
    box(THREE, g, x1 - x0 - 0.5, 0.08, 0.04, T.dark, (x0 + x1) / 2, 0, z + ch + 0.12);
  }
  /* twin 57 mm ZIF-31B in its shield, barrels raised as [D] draws them */
  function zif31(THREE, g, T) {
    var s;
    cylZ(THREE, g, 1.2, 1.3, 0.45, 16, T.sup, 0, 0, 0.22);
    tprism(THREE, g, 2.8, 2.4, 2.1, 2.0, 1.35, T.sup, -0.15, 0, 1.12);
    hexa(THREE, g, T.sup, [[1.25, -1.2, 0.45], [1.85, -0.9, 0.45], [1.85, 0.9, 0.45], [1.25, 1.2, 0.45],
                           [0.9, -1.0, 1.8], [1.3, -0.8, 1.6], [1.3, 0.8, 1.6], [0.9, 1.0, 1.8]]);
    for (s = -1; s <= 1; s += 2) {
      var b = new THREE.Group(); b.position.set(1.2, s * 0.38, 1.15); b.rotation.y = -0.33;
      cylX(THREE, b, 0.16, 0.16, 0.8, 8, T.gun, 0.4, 0, 0);
      cylX(THREE, b, 0.07, 0.08, 4.0, 8, T.gun, 2.6, 0, 0, true);
      cylX(THREE, b, 0.1, 0.1, 0.35, 8, T.gun, 4.5, 0, 0);
      g.add(b);
    }
    box(THREE, g, 0.06, 0.6, 0.35, T.dark, 1.0, 0.75, 1.55);
  }
  /* a ship's boat on chocks with its canvas cover [D plan][C] */
  function boat(THREE, g, T, cx, cy, cz, L, B) {
    var xs = [], rings = [], i, N = 9;
    for (i = 0; i < N; i++) {
      var f = i / (N - 1), x = cx - L / 2 + L * f;
      var wf = f < 0.12 ? 0.62 + 0.38 * f / 0.12 : (f > 0.65 ? Math.max(0.06, Math.sqrt(Math.max(0, 1 - Math.pow((f - 0.65) / 0.35, 2)))) : 1);
      xs.push(x); rings.push(superRing(B / 2 * wf, 0.55, cz + 0.55, 0.55, 10).map(function (q) { return [q[0] + cy, q[1]]; }));
    }
    ringLoft(THREE, g, T.sup, xs, rings, true);
    tprism(THREE, g, L * 0.6, B * 0.75, L * 0.5, B * 0.45, 0.6, T.sup, cx - L * 0.04, cy - cy, cz + 1.35).position.y = cy;
    box(THREE, g, 0.9, B * 0.5, 0.05, T.glass, cx + L * 0.2, cy, cz + 1.5);
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, y, z;

    /* ---- the hull: shell by paint band, raked transom, decks, bulwarks */
    g.add(shellBand(THREE, T.under, -9, -0.2, 4));
    g.add(shellBand(THREE, T.boot, -0.2, 0.4, 1));
    g.add(shellBand(THREE, T.hull, 0.4, 99, 7));
    transom(THREE, g, T);
    sternDoor(THREE, g, T);
    g.add(deckSheet(THREE, T.deck, zBotInvX(zS(XS0) - 0.14), XSTEP));
    g.add(deckSheet(THREE, T.deck, XSTEP + 0.01, XFC - 0.01));
    g.add(deckSheet(THREE, T.deck, XFC, XS1 - 0.3));
    bulwark(THREE, g, T, XSTEP, XS1 - 0.2);
    /* the step bulkhead under the superstructure front and the forecastle break */
    box(THREE, g, 0.4, 2 * (halfB(XSTEP) - BW_T), deckZ(XSTEP - 0.01) - 5.6, T.sup, XSTEP - 0.2, 0, (deckZ(XSTEP - 0.01) + 5.6) / 2);
    box(THREE, g, 0.3, 2 * deckHW(XFC + 0.01), deckZ(XFC + 0.01) - deckZ(XFC - 0.01) + 0.1, T.sup, XFC - 0.15, 0,
        (deckZ(XFC + 0.01) + deckZ(XFC - 0.01)) / 2);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.3, 0.3, 0.12, 8, T.dark, XFC - 0.32, s * 3.0, deckZ(XFC - 0.5) + 0.75);

    /* strake at the cargo deck's deck line, and its freeing ports [D][S] */
    for (s = -1; s <= 1; s += 2) {
      var SA = [], SB = [];
      for (x = -6.5; x <= 37.5; x += 1.0) {
        var zl = deckZ(x) + 0.05;
        SA.push([x, s * (W(x, zl) + 0.1), zl]); SB.push([x, s * (W(x, zl + 0.16) + 0.1), zl + 0.16]);
      }
      g.add(strip(THREE, T.sup, SA, SB, s > 0));
      for (x = -3.0; x < 37.5; x += 2.0) box(THREE, g, 1.0, 0.06, 0.35, T.dark, x, s * (W(x, deckZ(x) + 0.45) + 0.02), deckZ(x) + 0.45);
    }
    /* scuttles in the after body, in pairs [D] */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 12; i++) {
      x = -51.5 + i * 3.25;
      box(THREE, g, 0.36, 0.06, 0.36, T.dark, x, s * (W(x, 7.6) + 0.01), 7.6);
      if (i % 2 === 0) box(THREE, g, 0.36, 0.06, 0.36, T.dark, x + 1.1, s * (W(x + 1.1, 7.6) + 0.01), 7.6);
    }
    /* hawse with the anchor at the bow [D][S] */
    for (s = -1; s <= 1; s += 2) {
      var hx = 40.8, hz = 7.0, hw2 = W(hx, hz);
      var hp = cylZ(THREE, g, 0.75, 0.75, 0.3, 14, T.dark, hx, s * (hw2 + 0.02), hz); hp.rotation.set(PI / 2, 0, 0);
      box(THREE, g, 0.5, 0.25, 1.5, T.gun, hx + 0.05, s * (hw2 + 0.12), hz - 0.85);
      box(THREE, g, 1.3, 0.25, 0.3, T.gun, hx + 0.05, s * (hw2 + 0.12), hz - 1.6);
    }

    /* the bow doors, SHUT: hinge lines raked forward, top seam, stem seam
       [D][N][B][S] */
    var zdt = 8.0, e = 0.05;
    for (s = -1; s <= 1; s += 2) {
      var HA = [], HB = [], TA = [], TB = [];
      for (i = 0; i <= 8; i++) {
        z = 0.3 + (zdt - 0.3) * i / 8; x = 49.1 + 0.9 * i / 8;
        HA.push([x - 0.09, s * (W(x - 0.09, z) + e), z]); HB.push([x + 0.09, s * (W(x + 0.09, z) + e), z]);
      }
      g.add(strip(THREE, T.dark, HA, HB, s < 0));
      var xe = XWL + zdt / zS(XS1) * (XS1 - XWL) - 0.05;
      for (i = 0; i <= 8; i++) {
        x = 50.0 + (xe - 50.0) * i / 8;
        TA.push([x, s * (W(x, zdt - 0.09) + e), zdt - 0.09]); TB.push([x, s * (W(x, zdt + 0.09) + e), zdt + 0.09]);
      }
      g.add(strip(THREE, T.dark, TA, TB, s > 0));
    }
    for (i = 0; i < 8; i++) {
      var z0 = 0.2 + (zdt - 0.2) * i / 8, z1 = 0.2 + (zdt - 0.2) * (i + 1) / 8;
      var x0 = XWL + z0 / zS(XS1) * (XS1 - XWL) + 0.03, x1 = XWL + z1 / zS(XS1) * (XS1 - XWL) + 0.03;
      hexa(THREE, g, T.dark, [[x0 - 0.05, -0.07, z0], [x0 + 0.02, -0.07, z0], [x0 + 0.02, 0.07, z0], [x0 - 0.05, 0.07, z0],
                              [x1 - 0.05, -0.07, z1], [x1 + 0.02, -0.07, z1], [x1 + 0.02, 0.07, z1], [x1 - 0.05, 0.07, z1]]);
    }

    /* ---- forecastle: windlass, capstans, bitts, hatches, jackstaff [D plan] */
    var fz = function (xx) { return deckZ(xx); };
    box(THREE, g, 1.6, 3.2, 0.7, T.metal, 44.6, 0, fz(44.6) + 0.35);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.45, 0.45, 0.6, 10, T.gun, 44.6, s * 1.25, fz(44.6) + 0.75);
      cylZ(THREE, g, 0.42, 0.48, 0.55, 10, T.metal, 41.0, s * 4.6, fz(41.0) + 0.28);
      box(THREE, g, 3.4, 0.25, 0.08, T.gun, 42.8, s * 2.9, fz(42.8) + 0.05, s * 0.6);
      cylZ(THREE, g, 0.18, 0.18, 0.55, 6, T.metal, 47.6, s * 3.6, fz(47.6) + 0.28);
      cylZ(THREE, g, 0.18, 0.18, 0.55, 6, T.metal, 48.2, s * 3.5, fz(48.2) + 0.28);
      cylZ(THREE, g, 0.18, 0.18, 0.55, 6, T.metal, 37.5, s * 6.6, deckZ(37.5) + 0.28);
      cylZ(THREE, g, 0.18, 0.18, 0.55, 6, T.metal, 36.9, s * 6.6, deckZ(36.9) + 0.28);
    }
    box(THREE, g, 1.3, 1.3, 0.35, T.sup, 46.6, 0, fz(46.6) + 0.18);
    box(THREE, g, 1.3, 1.3, 0.35, T.sup, 51.4, 0, fz(51.4) + 0.18);
    strut(THREE, g, T.metal, 56.1, 0, zS(56.1), 56.1, 0, zS(56.1) + 3.2, 0.05, 4);

    /* ---- cargo deck: three hatch groups, two cranes [D][S][V] */
    hatch(THREE, g, T, -10.0, 2.4, 4.2, 4);
    hatch(THREE, g, T, 5.8, 19.6, 4.2, 5);
    hatch(THREE, g, T, 24.6, 36.8, 4.2, 4);
    /* the 15 t crane at x 4.2, boom raised over the second hatch */
    crane(THREE, g, T, 4.2, deckZ(4.2), 5.4, 16.0, 0.6, true);
    /* the 5 t crane at x 23.2, boom stowed forward on its crutch at the break [D] */
    var tipA = crane(THREE, g, T, 23.2, deckZ(23.2), 3.9, 13.2, -0.03, false);
    strut(THREE, g, T.metal, tipA[0] - 0.5, 0, deckZ(tipA[0] - 0.5), tipA[0] - 0.5, 0, tipA[2] - 0.55, 0.12, 6);
    box(THREE, g, 0.3, 1.4, 0.2, T.metal, tipA[0] - 0.5, 0, tipA[2] - 0.5);
    /* ventilators along the cargo deck sides */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) {
      x = 3.4 + i * 19.2;
      if (x > 38) continue;
      cylZ(THREE, g, 0.3, 0.32, 1.1, 10, T.sup, x - 0.2, s * 5.6, deckZ(x) + 0.55);
      cylZ(THREE, g, 0.42, 0.32, 0.3, 10, T.dark, x - 0.2, s * 5.6, deckZ(x) + 1.25);
    }

    /* ---- quarterdeck: hatch, the 5 t crane, stern-door gantry, flagstaff */
    hatch(THREE, g, T, -47.4, -38.4, 3.6, 3);
    crane(THREE, g, T, -50.6, deckZ(-50.6), 2.6, 11.0, 0.95, false);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, -55.2, s * 2.7, deckZ(-55.2), -55.2, s * 2.7, deckZ(-55.2) + 4.0, 0.16, 6);
      cylZ(THREE, g, 0.35, 0.35, 0.45, 10, T.metal, -53.4, s * 3.8, deckZ(-53.4) + 0.23);
      cylZ(THREE, g, 0.18, 0.18, 0.55, 6, T.metal, -55.6, s * 3.9, deckZ(-55.6) + 0.28);
      cylZ(THREE, g, 0.18, 0.18, 0.55, 6, T.metal, -55.0, s * 4.2, deckZ(-55.0) + 0.28);
      cylZ(THREE, g, 0.28, 0.34, 1.0, 10, T.sup, -44.0, s * 5.9, deckZ(-44.0) + 0.5);
      cylZ(THREE, g, 0.4, 0.3, 0.3, 10, T.dark, -44.0, s * 5.9, deckZ(-44.0) + 1.1);
    }
    box(THREE, g, 0.35, 5.8, 0.35, T.metal, -55.2, 0, deckZ(-55.2) + 4.0);
    box(THREE, g, 2.0, 2.6, 1.6, T.sup, -53.2, 0, deckZ(-53.2) + 0.8);
    strut(THREE, g, T.metal, -56.25, 0, deckZ(-56.2), -56.3, 0, deckZ(-56.2) + 5.6, 0.05, 4);

    /* ---- superstructure [D] (profile tiers; plan widths x 0.94) */
    var Z1 = 11.3, Z2 = 14.2, Z3 = 16.9, ZB = 19.5;
    /* 01 level, nearly full width, its front on the step bulkhead */
    polyPrism(THREE, g, T.sup, rrect(-37.0, XSTEP - 0.3, 7.15, 0.8, 1.2), deckZ(-24) - 0.3, Z1);
    /* the gun platform over the cargo deck (x -13 to -10.2) */
    polyPrism(THREE, g, T.sup, rrect(XSTEP - 0.6, -9.9, 2.7, 1.3, 0.2), 9.6, Z1);
    tprism(THREE, g, 1.6, 2.0, 2.4, 3.6, 3.9, T.sup, -10.9, 0, 7.6);
    /* 02 level */
    polyPrism(THREE, g, T.sup, rrect(-33.6, -14.6, 5.2, 1.0, 0.4), Z1 - 0.05, Z2);
    /* the front block (03 level) */
    polyPrism(THREE, g, T.sup, rrect(-24.6, -14.8, 4.7, 1.2, 0.3), Z2 - 0.05, Z3);
    /* the wheelhouse with the open bridge on its roof */
    polyPrism(THREE, g, T.sup, rrect(-21.4, -15.1, 4.3, 1.2, 0.3), Z3 - 0.05, ZB);
    for (s = -1; s <= 1; s += 2) {
      /* wings at the wheelhouse floor, with their screens */
      box(THREE, g, 2.8, 1.9, 0.16, T.sup, -16.6, s * 5.55, Z3 + 0.04);
      box(THREE, g, 2.8, 0.08, 1.05, T.sup, -16.6, s * 6.46, Z3 + 0.6);
      box(THREE, g, 0.08, 1.9, 1.05, T.sup, -15.25, s * 5.55, Z3 + 0.6);
      cylZ(THREE, g, 0.2, 0.2, 0.45, 10, T.metal, -17.6, s * 6.2, Z3 + 1.3);
      /* window bands */
      box(THREE, g, 4.6, 0.06, 0.85, T.glass, -18.6, s * 4.31, ZB - 1.15);
      box(THREE, g, 1.4, 0.06, 0.8, T.glass, -15.75, s * 3.85, ZB - 1.15, -s * 0.66);
    }
    box(THREE, g, 0.06, 6.0, 0.9, T.glass, -15.06, 0, ZB - 1.15);
    /* the open bridge screen on the wheelhouse roof */
    roofRail(THREE, g, T, [[-21.0, 3.9], [-15.6, 3.9], [-15.3, 3.0], [-15.3, -3.0], [-15.6, -3.9], [-21.0, -3.9]], ZB, 0.5);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 5.0, 0.08, 1.0, T.sup, -18.3, s * 3.95, ZB + 0.5);
    box(THREE, g, 0.08, 6.0, 1.0, T.sup, -15.32, 0, ZB + 0.5);
    box(THREE, g, 0.8, 0.8, 1.1, T.sup, -16.4, 0, ZB + 0.55);
    box(THREE, g, 6.2, 8.4, 0.08, T.metal, -18.2, 0, ZB + 0.04);
    /* windows: round scuttles on the 01 and 02 levels, square on the 03 */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 9; i++) box(THREE, g, 0.55, 0.06, 0.55, T.dark, -35.0 + i * 2.6, s * 7.17, deckZ(-24) + 1.6);
      for (i = 0; i < 7; i++) box(THREE, g, 0.55, 0.06, 0.55, T.dark, -31.5 + i * 2.4, s * 5.22, Z1 + 1.55);
      for (i = 0; i < 3; i++) box(THREE, g, 0.8, 0.06, 0.7, T.dark, -23.0 + i * 2.4, s * 4.72, Z2 + 1.4);
      box(THREE, g, 0.06, 0.9, 1.9, T.dark, -14.58, s * 3.6, Z1 + 1.05);
    }
    for (i = 0; i < 4; i++) box(THREE, g, 0.06, 0.8, 0.7, T.dark, -14.78, -2.4 + i * 1.6, Z2 + 1.4);
    for (i = 0; i < 5; i++) box(THREE, g, 0.06, 0.55, 0.55, T.dark, XSTEP + 0.03, -5.2 + i * 2.6, 7.4);
    for (i = 0; i < 4; i++) box(THREE, g, 0.06, 0.55, 0.55, T.dark, XSTEP - 0.28, -4.2 + i * 2.8, 10.1);
    /* the open gallery in the 01 level's sides abreast the front block [D] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 10.8, 0.08, 1.5, T.dark, -20.6, s * 7.14, 9.9);
      strut(THREE, g, T.metal, -26.0, s * 7.2, 10.05, -15.2, s * 7.2, 10.05, 0.03, 3);
      for (i = 0; i < 6; i++) strut(THREE, g, T.metal, -25.8 + i * 2.1, s * 7.2, 9.15, -25.8 + i * 2.1, s * 7.2, 10.65, 0.05, 3);
    }
    /* roof rails */
    roofRail(THREE, g, T, [[-14.2, 6.9], [-36.6, 6.9], [-36.6, -6.9], [-14.2, -6.9]], Z1, 0.9);
    roofRail(THREE, g, T, [[-12.4, 2.6], [-10.2, 2.6], [-10.2, -2.6], [-12.4, -2.6]], Z1, 0.9);
    roofRail(THREE, g, T, [[-24.8, 5.0], [-33.4, 5.0], [-33.4, -5.0], [-24.8, -5.0]], Z2, 0.9);

    /* the oval funnel with its dark top [D] */
    var FP = [], k;
    for (k = 0; k < 16; k++) { var a = k / 16 * PI * 2; FP.push([-26.4 + 3.2 * Math.cos(a), 2.2 * Math.sin(a)]); }
    polyPrism(THREE, g, T.sup, FP, Z2 - 0.05, 19.7);
    var FT = FP.map(function (p) { return [-26.4 + (p[0] + 26.4) * 1.02, p[1] * 1.03]; });
    polyPrism(THREE, g, T.dark, FT, 19.7, 20.4);
    /* the light funnel top with its two exhaust pipes (the plan's two dots) [D] */
    polyPrism(THREE, g, T.sup, FP.map(function (p) { return [-26.4 + (p[0] + 26.4) * 0.94, p[1] * 0.92]; }), 20.3, 20.46);
    cylZ(THREE, g, 0.45, 0.45, 0.9, 10, T.gun, -27.9, 0, 20.8);
    cylZ(THREE, g, 0.4, 0.4, 0.8, 10, T.gun, -25.6, 0, 20.75);
    box(THREE, g, 2.6, 2.6, 0.9, T.sup, -24.2, 0, Z2 + 0.45);
    /* the pole mast on the funnel's fore end: Don radar, yard, top [D] */
    var mb = [-23.6, 0, 20.4], mt = [-23.8, 0, 30.6];
    var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.32, mt[2] - mb[2], 8, 1), T.metal);
    mast.position.set((mb[0] + mt[0]) / 2, 0, (mb[2] + mt[2]) / 2); mast.rotation.set(PI / 2, 0, 0);
    mast.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.atan2(mt[0] - mb[0], mt[2] - mb[2]));
    g.add(mast);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -22.3, s * 1.6, ZB + 0.1, -23.8, 0, 24.0, 0.09, 4);
    box(THREE, g, 2.4, 2.0, 0.12, T.metal, -22.9, 0, 24.2);
    roofRail(THREE, g, T, [[-23.9, 1.0], [-21.8, 1.0], [-21.8, -1.0], [-23.9, -1.0]], 24.2, 0.6);
    cylZ(THREE, g, 0.2, 0.25, 0.5, 8, T.metal, -22.4, 0, 24.5);
    box(THREE, g, 0.45, 3.8, 0.4, T.gun, -22.4, 0, 25.0);
    box(THREE, g, 0.06, 3.6, 0.25, T.dark, -22.18, 0, 25.0);
    box(THREE, g, 0.18, 5.0, 0.16, T.metal, -23.75, 0, 27.6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -23.75, s * 2.4, 27.6, -23.75, s * 2.4, 26.9, 0.012, 3);
    box(THREE, g, 0.35, 0.35, 0.4, T.metal, -23.8, 0, 30.8);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -23.8, 0, 29.8, -36.0, s * 0.6, Z2 + 0.9, 0.012, 3);
    /* whips on the 02 roof aft [D] */
    strut(THREE, g, T.metal, -31.9, 2.6, Z2, -31.9, 2.6, Z2 + 9.0, 0.04, 3);
    strut(THREE, g, T.metal, -31.9, -2.6, Z2, -31.9, -2.6, Z2 + 7.0, 0.04, 3);

    /* the twin 57 mm on its platform, trained forward [D][W] */
    var gm = new THREE.Group(); gm.position.set(-11.6, 0, Z1); zif31(THREE, gm, T); g.add(gm);

    /* boats under gravity davits on the 01 roof [D plan][C] */
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T, -30.0, s * 6.25, Z1 + 0.35, 7.2, 2.3);
      for (i = 0; i < 2; i++) {
        x = -33.4 + i * 6.8;
        strut(THREE, g, T.metal, x, s * 5.3, Z1, x, s * 5.5, Z1 + 2.6, 0.11, 4);
        strut(THREE, g, T.metal, x, s * 5.5, Z1 + 2.6, x, s * 6.5, Z1 + 3.0, 0.09, 4);
        strut(THREE, g, T.metal, x, s * 6.5, Z1 + 3.0, x, s * 6.4, Z1 + 1.9, 0.02, 3);
      }
      for (i = 0; i < 2; i++) box(THREE, g, 1.2, 0.5, 0.5, T.sup, -23.4 + i * 1.6, s * 4.4, Z2 + 0.25);
      for (i = 0; i < 3; i++) cylX(THREE, g, 0.3, 0.3, 1.3, 10, T.sup, -35.5, s * (4.0 - i * 0.7), Z2 + 0.35);
    }

    /* ---- underwater: shafts on brackets, props, rudders, bilge keels */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.24, 0.24, 9.0, 8, T.metal, -46.5, s * 3.1, -2.7);
      strut(THREE, g, T.metal, -49.5, s * 3.1, -2.7, -49.5, s * 3.9, -1.3, 0.14, 4);
      strut(THREE, g, T.metal, -49.5, s * 3.1, -2.7, -49.5, s * 2.2, -1.3, 0.14, 4);
      cylX(THREE, g, 0.36, 0.5, 0.8, 8, T.metal, -51.4, s * 3.1, -2.7);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.55, 1.15), T.metal);
        bl.position.set(-51.4, s * 3.1, -2.7); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.75); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.2, 0.22, 2.6, T.metal, -53.0, s * 3.1, -1.9);
      box(THREE, g, 30.0, 0.08, 0.55, T.under, -12.0, s * (W(-12, -3.9) + 0.18), -3.95);
    }

    /* rails on the quarterdeck edges */
    railRun(THREE, g, T, -56.2, XSTEP - 0.6, 3.0, 1.0);

    /* team: small flashes on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -18.6, 0, ZB + 0.1);
    box(THREE, g, 2.4, 0.9, 0.04, T.team, -36.0, 0, Z1 + 0.02);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, 49.4, 0, deckZ(49.4) + 0.03);

    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }
  return { build: build };
})();

UNIT_MODELS["pact_e60_lst"] = {
  len: 113.1,
  build: function (THREE, M, C) { return HeroAlligator.build(THREE, M, C); }
};
