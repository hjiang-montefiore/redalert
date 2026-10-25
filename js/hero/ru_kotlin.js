/* ==================== js/hero/ru_kotlin.js ===============================
   HERO MODEL -- Project 56 "Kotlin" class destroyer (Soviet name: the
   Spokoynyy type), the original GUN ship as built 1955-58 and as the
   unconverted ships were photographed: NOT the 56-PLO (RBU-2500 beside the
   bow 45 mm, second tube mount and throwers removed), 56-K, 56-A (SA-N-1
   aft) or 56-M/56-U conversions.  Key: pact_e50_destroyer ("Project 56
   Kotlin", e50, service 1955, turret:true).
   REDO 2026-10-24: the hull lofted from a section table (the sheer, the
   flared raked bow and the counter stern of the recognition profile, the
   published depths); the freeboard amidships brought down to the
   published 3.1-3.4 m (the old model had 4.8 m); the bridge, funnels and
   masts raised to the profile's heights; the Slim Net (Fut-N) moved to
   the MAINMAST between the funnels, where ru.wikipedia and [T] put it
   (the old model had it on the foremast); flat-sided SM-2-1 turrets with
   the Shtag-B hood; shielded SM-20-ZIF quads with full-length 3.4 m
   barrels; the SVP-42/50 director with its Yakor-M (Sun Visor) dish;
   the round Fut-B director abaft the mainmast; shaft bossings and the
   single rudder.

   REFERENCES (Wikimedia Commons at width 960, and Russian Wikipedia):
     [P] "Spokoynyy-class destroyer profile 1987.png" - recognition
         profile, bow right: hull 823 px = 126.1 m (6.53 px/m), waterline
         at y 180.  It shows a 56-A (twin SA-N-1 launcher aft), so it is
         used ONLY for what the conversion left: the hull and sheer, the
         forward 130 mm, the bow house, the bridge, the foremast and the
         first funnel.  Read off it: deck edge at y 163-165 aft, rising
         from about x 15 to the stem head; stem at the waterline at x 58.8
         and raked and curved up to x 63 at the deck; a counter stern with
         its transom foot about 1.2 m above the water; forward turret x 35
         to 43; bow house x 24-34; bridge x 14-23.6 with the director
         over its after part; the foremast x 10-11; funnel 1 x 6-12,
         raked, its top level with the bridge roof.
     [V] "Soviet destroyer Vyderzhannyy underway c1973.jpg" (starboard
         bow, from high): an UNCONVERTED ship (Vyderzhannyy is in neither the
         56-PLO nor the 56-A list of [W]) - turret, bow house with mount
         No. 1, bridge, tall lattice foremast, funnel 1 just abaft it, the
         mainmast on its plated base, funnel 2 with its dark raked cap,
         the after 45 mm and the low after end.
     [S] "Soviet Spokoynyy-class destroyer underway c1973.jpg" (port bow,
         low, Mediterranean): the bridge block with its wide open bridge,
         the director with its round dish, the lattice foremast with yards,
         the mainmast with its round Fut-B director abaft it, the oval
         funnel with its dark rim, mounts No. 2-4 with barrels raised.
     [T] "Soejalaevad Tallinnas Paljassaare sadamas 86.jpg" (port bow,
         1986, laid up): the clearest side view of the forward two thirds -
         the flared bow, bow house and bridge, the director drum with the
         Sun Visor dish, the foremast tower, the mainmast with the curved
         Slim Net reflector at its head and the Fut-B behind it, funnel 2.
         Its yard of rectangular boxes is a later fit and is NOT drawn.
     [O] "428-GX-USN 1143715" (Okean 1970, close-up): an SM-20-ZIF quad on
         its raised platform - the tall shield, the vertically paired
         barrels, the crew stand and rails behind, cylindrical life rafts,
         a searchlight in its ring.
     [W] Russian Wikipedia "Eskadrennye minonostsy proekta 56": 126.1 m
         overall, 117.9 m waterline, 12.76 m beam (12.41 m at the
         waterline), depth 12.1 m at the stem, 7.4 m amidships, 7.65-7.7 m
         aft, draught 4.26 m, 34.5 m overall height from the baseline;
         flush deck with marked sheer forward, slight flare forward, the
         anchors recessed in the hull; three superstructures, the four
         45 mm "in a rhombus"; bulwarks at the bow 45 mm and along the bow
         house; 2 x 2 130 mm SM-2-1 (58 calibres) with the Shtag-B
         rangefinder in a hood on each turret roof; SVP-42/50 director
         with Yakor-M; 4 x 4 45 mm SM-20-ZIF; 2 x 5 533 mm PTA-53-56;
         six BMB-2 throwers and two under-deck droppers aft; mine rails;
         Fut-N on the MAINMAST, two Fut-B (on the deckhouse and abaft the
         mainmast); one semi-balanced rudder and shaft bossings instead of
         brackets after the lead ship's trials; 4.0 m four-blade screws.
     The layout of the after half (no photograph shows an unconverted
     ship's after half from the beam) keeps the stations the earlier model
     read off the Navypedia as-built drawing "Spravedlivyy 1960" and the
     words of [W]: middle superstructure x -18.8 to -0.7 with mounts
     No. 2/3 at x -5.4, the mainmast x -4.4, the Fut-B pedestal x -8.8,
     funnel 2 x -16.4; after tubes x -22.9; after house x -33 to -26.3
     with mount No. 4 and the second Fut-B tower x -34; after 130 mm
     x -40.5; a low house x -51.5 to -47.5; throwers right aft.  [V]
     agrees with that order.

   RECOGNITION LIST (where each shows):
     1. Long flush hull, low amidships and aft (3.1-3.4 m), the sheer
        sweeping up forward to a flared, raked stem 7.8 m high; counter
        stern [P][W][T] - STA, W(), zBot().
     2. Twin 130 mm SM-2-1, flat sided with a sloped face and the Shtag-B
        hood, forward (the "turret", x 40.5) and aft on the quarterdeck
        trained astern (x -40.5) [P][V][W] - sm21().
     3. Four shielded SM-20-ZIF quads "in a rhombus": No. 1 on the bow
        house, No. 2/3 on sponsons of the middle house, No. 4 on the after
        house [O][S][V][W] - zif20().
     4. A tall bridge block with a wide open bridge and the SVP-42/50
        director over its after part carrying the round Yakor-M dish
        [P][S][T] - the bridge tiers, director().
     5. Tall lattice foremast just abaft the bridge with yards and a
        topmast to 30 m [P][S][T][V][W] - lattice() at x 13.1 (the 1960
        drawing's 12.4, moved forward so the legs clear funnel No. 1).
     6. Two oval raked funnels with dark caps, the first close abaft the
        foremast, the second abaft the mainmast [P][S][V] - funnel().
     7. Lattice mainmast between the funnels with the Slim Net (Fut-N)
        reflector at its head and the round Fut-B director abaft it
        [S][T][W] - slimNet(), futB().
     8. Two quintuple PTA-53-56 mounts on the centreline, abaft each
        funnel [W] - tubes5().
     9. Six BMB-2 throwers, mine rails, the dropper hatches in the transom
        [W] - right aft.
    10. Boats by the bridge and the yawl on the middle house; life rafts;
        searchlights [O][S][W].
    11. Paint: Soviet light grey hull and superstructure (the photographs
        here are monochrome: the Kashin hero's colour samples of the same
        fleet and period, taken to about 0.85 of their level), dark grey
        decks, black boot topping and funnel caps.
   NOT CONFIRMED and therefore drawn generic or not at all: the type of
   the small radar on the foremast platform (drawn as a small generic
   antenna, as [S][T] show something there); the Zarya torpedo control
   radar's position (not drawn); the PTA-53-56 tube layout is drawn as a
   single row of five (as the Soviet five-tube mounts of the period were);
   the exact boat types.  Hull numbers, names, the bow badge and ensigns
   are never drawn.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The
   forward 130 mm SM-2-1 is the group named "turret" (the row's first
   weapon, w_e50_pact_destroyer, is the 130 mm); everything else is baked,
   one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKotlin = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -63.05, XS1 = 63.05, XWL = 58.8;   /* transom, stem head, stem at the waterline [P] */

  /* HULL SECTION TABLE.  Deck heights: the deck edge of [P] (6.53 px/m)
     scaled so its freeboards meet the published depths less the draught
     [W] (7.8 m at the stem, 3.1-3.4 m amidships and aft); half beams from
     12.76 m (12.41 m at the waterline) [W], fined forward with the flare
     [W][T]; the counter stern of [P].
     x, deck z, half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power) */
  var STA = [
    [-63.05, 3.05, 4.30, 4.00,  1.20, 2.2],
    [-61.0,  3.07, 5.05, 4.60,  0.75, 2.4],
    [-58.0,  3.10, 5.60, 5.15, -0.60, 2.6],
    [-53.0,  3.13, 6.00, 5.65, -2.40, 2.7],
    [-45.0,  3.18, 6.30, 6.00, -3.55, 2.9],
    [-32.0,  3.23, 6.38, 6.18, -4.05, 3.0],
    [-12.0,  3.28, 6.38, 6.20, -4.15, 3.0],
    [  6.0,  3.36, 6.36, 6.15, -4.15, 3.0],
    [ 16.0,  3.55, 6.25, 5.95, -4.12, 2.8],
    [ 26.0,  4.05, 5.95, 5.40, -4.05, 2.5],
    [ 35.0,  4.62, 5.45, 4.65, -3.90, 2.2],
    [ 43.0,  5.25, 4.70, 3.65, -3.55, 1.9],
    [ 50.0,  5.95, 3.75, 2.40, -2.90, 1.7],
    [ 55.0,  6.60, 2.85, 1.35, -2.00, 1.5],
    [ 58.8,  7.12, 2.05, 0.00,  0.00, 1.4],
    [ 61.0,  7.45, 1.30, 0.00,  0.00, 1.3],
    [ 63.05, 7.80, 0.22, 0.00,  0.00, 1.2]
  ];
  function pick(x, k) {
    var i;
    if (x <= STA[0][0]) return STA[0][k];
    for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
      var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
      f = f * f * (3 - 2 * f) * 0.35 + f * 0.65;   /* eased so the sheer reads as a curve */
      return a[k] + (b[k] - a[k]) * f;
    }
    return STA[STA.length - 1][k];
  }
  function deckZ(x) { return pick(x, 1); }
  function halfB(x) { return pick(x, 2); }
  /* the raked stem, curving up from the waterline at XWL to the stem
     head [P]; elsewhere the table's keel line (the counter aft) */
  function zBot(x) { return x > XWL ? deckZ(XS1) * Math.pow((x - XWL) / (XS1 - XWL), 0.8) : pick(x, 4); }
  /* half breadth at height z: flared above the water, a super-ellipse
     bilge below, a rounded counter where the bottom is above the water */
  function W(x, z) {
    var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
    var ws;
    if (z >= 0) ws = bw + (bd - bw) * Math.pow(z / zd, 1.5);
    else {
      var n = pick(x, 5), t = Math.min(1, z / Math.min(zb, -0.01));
      ws = bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    }
    var f = Math.max(0, Math.min(1, (zb + 1.2) / 1.3));
    if (f <= 0) return ws;
    var wc = bd * Math.pow((z - zb) / (zd - zb), 0.45);
    return f * wc + (1 - f) * ws;
  }
  /* superstructure roof one tier (2.5 m) over the deck, following it */
  function roofZ(x) { return deckZ(x) + 2.5; }

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
     butts, a row of scuttles under the deck edge, rust and weather streaks */
  function hullTex(THREE) {
    return canvasTex(THREE, "hull", 512, 256, function (g, w, h) {
      var R = rng(5621), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 4; i++) {
        var xx = i * w / 4 + (i % 2) * 22;
        g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke();
      }
      g.globalAlpha = 0.06;
      for (i = 0; i < 40; i++) {
        g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, 2 + R() * 6, 20 + R() * 90);
      }
      g.globalAlpha = 0.10; g.fillStyle = "#5a3020";
      for (i = 0; i < 14; i++) g.fillRect(R() * w, 30 + R() * 40, 1.5, 18 + R() * 40);
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "plate", 256, 256, function (g, w, h) {
      var R = rng(5617), i;
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
    return canvasTex(THREE, "deck", 256, 256, function (g, w, h) {
      var R = rng(561), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* funnel caps and openings: soot and the grille bars */
  function grilleTex(THREE) {
    return canvasTex(THREE, "grille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* paint: the Kashin hero's colour samples (same fleet and period; the
     Kotlin photographs here are monochrome) - hull 0x8a9298, houses a touch
     lighter, dark grey decks, black caps */
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
  function cylY(THREE, p, rt, rb, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, len, seg, 1), m);
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
  /* an oval stack lofted up Z: levels [z, half length, half width, x
     offset]; capped top and bottom */
  function ovalStack(THREE, p, m, xc, yc, lv, n) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < lv.length; i++) for (j = 0; j < n; j++) {
      var t = j / n * PI * 2, c = Math.cos(t), s = Math.sin(t);
      var ex = 0.7, cx = Math.sign(c) * Math.pow(Math.abs(c), ex), sy = Math.sign(s) * Math.pow(Math.abs(s), ex);
      pos.push(xc + lv[i][3] + lv[i][1] * cx, yc + lv[i][2] * sy, lv[i][0]);
      uv.push(j / n * 3, lv[i][0] * 0.16);
    }
    for (i = 0; i < lv.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, cc = a + n, d = b + n;
      idx.push(a, b, cc, b, d, cc);
    }
    [0, lv.length - 1].forEach(function (i0, e) {
      var c0 = pos.length / 3, k;
      pos.push(xc + lv[i0][3], yc, lv[i0][0]); uv.push(0, 0);
      for (k = 0; k < n; k++) {
        var q = i0 * n + k, r = i0 * n + (k + 1) % n;
        if (e === 0) idx.push(c0, r, q); else idx.push(c0, q, r);
      }
    });
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv, idx), m); p.add(mm); return mm;
  }

  /* ---------------------------------------------------------------- hull */
  function hullXs() {
    var xs = [], x, i;
    for (x = XS0; x < XS1 - 0.01; x += 3.0) xs.push(x);
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (x = XS0; x < -56; x += 1.0) xs.push(x);
    for (x = 52; x < XS1; x += 1.0) xs.push(x);
    xs.push(XS1);
    xs.sort(function (a, b) { return a - b; });
    return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
  }
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
  /* the small flat transom at the end of the counter [P], hull paint */
  function transom(THREE, g, T) {
    var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, s, pos = [], uv = [], k;
    for (j = 0; j < N; j++) {
      var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
      var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1);
      pos.push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
      for (k = 0; k < 6; k++) uv.push(pos[pos.length - 18 + k * 3 + 1] / 24, pos[pos.length - 18 + k * 3 + 2] / 8);
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
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 2.2));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.03, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.022, 3);
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
  /* a four-legged tapering lattice tower centred on cx */
  function lattice(THREE, g, m, cx, bx, by, tx, ty, z0, z1, n, r) {
    var i, j, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    function pt(k, f) {
      var sx = bx + (tx - bx) * f, sy = by + (ty - by) * f;
      return [cx + c[k][0] * sx, c[k][1] * sy, z0 + (z1 - z0) * f];
    }
    for (j = 0; j < 4; j++) {
      var a = pt(j, 0), b = pt(j, 1);
      strut(THREE, g, m, a[0], a[1], a[2], b[0], b[1], b[2], r, 4);
    }
    for (i = 0; i <= n; i++) {
      var f = i / n;
      for (j = 0; j < 4; j++) {
        var p = pt(j, f), q = pt((j + 1) % 4, f);
        if (i > 0) strut(THREE, g, m, p[0], p[1], p[2], q[0], q[1], q[2], r * 0.6, 3);
        if (i < n) {
          var p2 = pt((j + 1) % 4, f + 1 / n), q2 = pt(j, f + 1 / n);
          strut(THREE, g, m, p[0], p[1], p[2], p2[0], p2[1], p2[2], r * 0.4, 3);
          strut(THREE, g, m, q[0], q[1], q[2], q2[0], q2[1], q2[2], r * 0.4, 3);
        }
      }
    }
  }
  /* a dish facing +X */
  function dish(THREE, g, m, rad, x, y, z, sy, sz) {
    var dg = new THREE.SphereGeometry(rad, 16, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    dg.scale(1, sy || 1, sz || 1);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }
  /* a curved reflector strip concave toward +X, w wide, h tall */
  function cheese(THREE, g, m, w, h, x, y, z, tilt) {
    var cg = new THREE.CylinderGeometry(w * 0.75, w * 0.75, h, 14, 1, true, -0.72, 1.44);
    cg.translate(0, 0, -w * 0.75);
    cg.rotateX(PI / 2); cg.rotateZ(-PI / 2);
    var c = new THREE.Mesh(cg, m), grp = new THREE.Group();
    grp.add(c); grp.position.set(x, y, z); grp.rotation.y = tilt || 0; g.add(grp);
    return grp;
  }

  /* twin 130 mm SM-2-1 at rest pointing +X: the flat-sided welded house
     (about 7 m long, 5 m wide, 2.6 m tall) with its sloped face, the
     Shtag-B rangefinder hood on the roof [W], the AMO sight hoods, the
     58-calibre (7.5 m) barrels in their ports [P][V] */
  function sm21(THREE, g, T) {
    var s;
    cylZ(THREE, g, 2.35, 2.45, 0.45, 20, T.sup, -0.3, 0, 0.22);
    /* main house: sides tumble home a little, roof flat */
    hexa(THREE, g, T.sup, [
      [-3.6, -2.45, 0.4], [1.5, -2.45, 0.4], [1.5, 2.45, 0.4], [-3.6, 2.45, 0.4],
      [-3.5, -2.3, 2.75], [1.2, -2.3, 2.75], [1.2, 2.3, 2.75], [-3.5, 2.3, 2.75]]);
    /* sloped face plate, narrowing to the gun ports */
    hexa(THREE, g, T.sup, [
      [1.5, -2.45, 0.4], [2.75, -2.1, 0.4], [2.75, 2.1, 0.4], [1.5, 2.45, 0.4],
      [1.2, -2.3, 2.75], [2.75, -2.0, 1.85], [2.75, 2.0, 1.85], [1.2, 2.3, 2.75]]);
    /* overhang at the rear, door and the vents */
    box(THREE, g, 0.08, 1.0, 1.5, T.dark, -3.62, -1.2, 1.3);
    box(THREE, g, 1.2, 1.6, 0.3, T.sup, -2.6, 0, 2.9);
    /* Shtag-B hood on the roof [W] */
    cylZ(THREE, g, 0.75, 0.82, 0.45, 14, T.sup, -0.9, 0, 2.97);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(0.75, 14, 6, 0, PI * 2, 0, PI / 2), T.sup);
    hd.rotation.x = PI / 2; hd.position.set(-0.9, 0, 3.18); g.add(hd);
    for (s = -1; s <= 1; s += 2) {
      /* AMO sight hoods at the front corners of the roof */
      box(THREE, g, 0.9, 0.55, 0.42, T.sup, 0.5, s * 1.65, 2.95);
      box(THREE, g, 0.06, 0.4, 0.2, T.glass, 0.97, s * 1.65, 2.98);
      /* gun ports and barrels, raised a little */
      box(THREE, g, 0.12, 0.85, 1.05, T.dark, 2.78, s * 0.7, 1.35);
      var br = new THREE.Group(); br.position.set(2.6, s * 0.7, 1.35); br.rotation.y = -0.06;
      cylX(THREE, br, 0.24, 0.26, 0.9, 10, T.gun, 0.4, 0, 0);
      cylX(THREE, br, 0.105, 0.15, 6.9, 10, T.gun, 4.2, 0, 0, true);
      cylX(THREE, br, 0.13, 0.13, 0.35, 10, T.gun, 7.5, 0, 0);
      g.add(br);
    }
    return g;
  }

  /* 45 mm SM-20-ZIF quadruple at rest pointing +X [O][W]: the base ring,
     the tall shield with its sloped face, the barrels in two vertical
     pairs (76 calibres, 3.4 m), the open crew stand behind */
  function zif20(THREE, g, T) {
    var s, k;
    cylZ(THREE, g, 1.0, 1.1, 0.35, 14, T.sup, 0, 0, 0.17);
    hexa(THREE, g, T.sup, [
      [-0.9, -1.2, 0.35], [0.95, -1.2, 0.35], [0.95, 1.2, 0.35], [-0.9, 1.2, 0.35],
      [-0.75, -1.1, 2.2], [0.5, -1.1, 2.2], [0.5, 1.1, 2.2], [-0.75, 1.1, 2.2]]);
    box(THREE, g, 1.4, 2.8, 0.1, T.metal, -1.4, 0, 0.42);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, -2.05, s * 1.35, 0.42, -2.05, s * 1.35, 1.3, 0.03, 3);
      strut(THREE, g, T.metal, -0.85, s * 1.35, 1.3, -2.05, s * 1.35, 1.3, 0.025, 3);
      var bar = new THREE.Group(); bar.position.set(0.55, s * 0.38, 1.3); bar.rotation.y = -0.14;
      for (k = 0; k < 2; k++) {
        cylX(THREE, bar, 0.09, 0.09, 0.6, 8, T.gun, 0.2, 0, k * 0.36);
        cylX(THREE, bar, 0.04, 0.055, 3.0, 6, T.gun, 1.95, 0, k * 0.36, true);
      }
      g.add(bar);
    }
    return g;
  }

  /* PTA-53-56: five 533 mm tubes in a row on a trainer, pointing +X */
  function tubes5(THREE, g, T) {
    var i;
    cylZ(THREE, g, 1.0, 1.15, 0.45, 12, T.sup, 0, 0, 0.22);
    box(THREE, g, 2.4, 3.3, 0.3, T.sup, 0, 0, 0.6);
    for (i = 0; i < 5; i++) {
      var y = -1.32 + i * 0.66;
      cylX(THREE, g, 0.3, 0.3, 7.6, 10, T.sup, 0.2, y, 1.08);
      cylX(THREE, g, 0.32, 0.32, 0.25, 10, T.dark, -3.65, y, 1.08);
      cylX(THREE, g, 0.32, 0.32, 0.18, 10, T.metal, 3.95, y, 1.08);
    }
    box(THREE, g, 0.3, 3.5, 0.2, T.metal, -2.0, 0, 1.45);
    box(THREE, g, 0.3, 3.5, 0.2, T.metal, 2.2, 0, 1.45);
    box(THREE, g, 0.9, 0.9, 0.9, T.sup, -2.9, -1.95, 1.0);
    return g;
  }

  /* an oval funnel raked aft: base x, from z0 to the top zt (front),
     half length a, half width b; the dark cap band [P][S][V] */
  function funnel(THREE, g, T, x, z0, zt, a, b, rake) {
    var h = zt - z0, off = function (z) { return -(z - z0) * rake; };
    ovalStack(THREE, g, T.sup, x, 0, [
      [z0, a * 1.06, b * 1.06, 0], [z0 + h * 0.35, a, b, off(z0 + h * 0.35)],
      [zt - 1.1, a * 0.96, b * 0.96, off(zt - 1.1)]], 20);
    ovalStack(THREE, g, T.soot, x, 0, [
      [zt - 1.1, a * 0.97, b * 0.97, off(zt - 1.1)], [zt, a * 0.95, b * 0.95, off(zt)],
      [zt + 0.02, a * 0.82, b * 0.80, off(zt)]], 20);
    /* the uptake mouth and the whistle / steam pipes up its after side */
    var tx = x + off(zt);
    box(THREE, g, a * 1.2, b * 1.1, 0.06, T.dark, tx, 0, zt + 0.04);
    strut(THREE, g, T.metal, x - a * 0.95, b * 0.5, z0, tx - a * 0.92, b * 0.5, zt + 0.5, 0.08, 5);
    strut(THREE, g, T.metal, x - a * 0.95, -b * 0.5, z0, tx - a * 0.92, -b * 0.5, zt + 0.3, 0.06, 5);
  }
  /* SVP-42/50 director with its DMS-3 rangefinder arms and the round
     Yakor-M (Sun Visor) dish forward [W][S][T] */
  function director(THREE, g, T, x, z) {
    cylZ(THREE, g, 1.45, 1.55, 1.0, 18, T.sup, x, 0, z + 0.5);
    hexa(THREE, g, T.sup, [
      [x - 1.6, -1.4, z + 1.0], [x + 1.5, -1.4, z + 1.0], [x + 1.5, 1.4, z + 1.0], [x - 1.6, 1.4, z + 1.0],
      [x - 1.4, -1.25, z + 2.6], [x + 1.1, -1.25, z + 2.6], [x + 1.1, 1.25, z + 2.6], [x - 1.4, 1.25, z + 2.6]]);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(1.25, 16, 6, 0, PI * 2, 0, PI / 2), T.sup);
    hd.rotation.x = PI / 2; hd.scale.set(1.05, 1, 0.6); hd.position.set(x - 0.15, 0, z + 2.6); g.add(hd);
    box(THREE, g, 0.75, 5.0, 0.55, T.sup, x - 0.3, 0, z + 2.0);
    var s;
    for (s = -1; s <= 1; s += 2) cylY(THREE, g, 0.32, 0.32, 0.2, 10, T.glass, x - 0.3, s * 2.55, z + 2.0);
    box(THREE, g, 0.06, 1.4, 0.3, T.glass, x + 1.35, 0, z + 2.1);
    /* the Yakor-M dish on its arm ahead of the director, about 2.6 m
       across [S][T] */
    box(THREE, g, 1.0, 0.45, 0.45, T.metal, x + 1.8, 0, z + 3.2);
    dish(THREE, g, T.metal, 1.6, x + 2.45, 0, z + 3.2, 1, 1);
    strut(THREE, g, T.metal, x + 2.4, 0, z + 3.2, x + 3.4, 0, z + 3.2, 0.05, 3);
  }
  /* Fut-B director: pedestal and the round enclosure [S][T][W] */
  function futB(THREE, g, T, x, z0, z1, yaw) {
    cylZ(THREE, g, 0.45, 0.6, z1 - z0, 10, T.sup, x, 0, (z0 + z1) / 2);
    var h = new THREE.Group(); h.position.set(x, 0, z1); h.rotation.z = yaw || 0;
    box(THREE, h, 0.9, 1.0, 0.5, T.sup, 0, 0, 0.25);
    var b = new THREE.Mesh(new THREE.SphereGeometry(0.85, 14, 8), T.sup);
    b.scale.set(0.8, 1, 1); b.position.set(0.2, 0, 1.1); h.add(b);
    dish(THREE, h, T.metal, 0.75, 0.8, 0, 1.1, 1, 1);
    g.add(h);
  }
  /* Slim Net (Fut-N): the long curved lattice reflector with its frame
     [T][S][W] */
  function slimNet(THREE, g, T, x, z) {
    var h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.z = 0.25;
    cylZ(THREE, h, 0.35, 0.45, 0.6, 10, T.metal, 0, 0, 0.3);
    box(THREE, h, 0.5, 0.6, 0.6, T.metal, 0, 0, 0.8);
    var r = cheese(THREE, h, T.metal, 6.6, 1.6, 0.9, 0, 1.4, 0.0);
    void r;
    box(THREE, h, 0.12, 6.4, 0.12, T.metal, 0.0, 0, 2.25);
    box(THREE, h, 0.12, 6.4, 0.12, T.metal, 0.0, 0, 0.55);
    var i;
    for (i = -3; i <= 3; i++) strut(THREE, h, T.metal, 0, i * 1.0, 0.55, 0.15 + Math.abs(i) * 0.0, i * 1.0, 2.25, 0.03, 3);
    strut(THREE, h, T.metal, 0, 0, 1.4, 1.6, 0, 1.4, 0.05, 3);
    g.add(h);
  }
  /* a ship's boat on its chocks */
  function boat(THREE, g, T, x, y, z, len, bw, hh) {
    var xs = [], sec = [], k;
    for (k = 0; k <= 6; k++) {
      var t = k / 6;
      xs.push(-len / 2 + t * len);
      var w = Math.max(0.12, bw * Math.pow(Math.sin(PI * Math.min(1, 0.12 + t * 0.95)), 0.6));
      sec.push(superRing(w, hh * (t > 0.85 ? 1.1 : 1), 0, 2 / 2.4, 12));
    }
    var bg = new THREE.Group(); bg.position.set(x, y, z);
    ringLoft(THREE, bg, T.sup, xs, sec, true);
    box(THREE, bg, len * 0.75, bw * 1.7, 0.08, T.deck, 0, 0, hh * 0.85);
    g.add(bg);
    for (k = -1; k <= 1; k += 2) box(THREE, g, 0.25, bw * 1.6, 0.4, T.metal, x + k * len * 0.28, y, z - hh - 0.15);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, k, x;
    void M;

    /* hull shell in three bands, transom, weather deck [P][W] */
    g.add(shellBand(THREE, T.under, -6, -0.4, 4));
    g.add(shellBand(THREE, T.boot, -0.4, 0.6, 1));
    g.add(shellBand(THREE, T.hull, 0.6, 12, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    for (s = -1; s <= 1; s += 2) {
      /* anchors recessed into the hull near the stem [W][T] */
      var ax = 55.6, az = 5.0, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 1.5, 0.12, 1.3, T.dark, ax, ay, az);
      box(THREE, g, 1.0, 0.18, 1.0, T.gun, ax + 0.1, ay + s * 0.04, az - 0.15);
      /* scuttles along the forward and after accommodation [T][V] */
      for (i = 0; i < 12; i++) {
        x = 30 - i * 2.6;
        box(THREE, g, 0.32, 0.05, 0.32, T.dark, x, s * (W(x, deckZ(x) - 0.9) + 0.02), deckZ(x) - 0.9);
      }
      for (i = 0; i < 8; i++) {
        x = -36 - i * 2.6;
        box(THREE, g, 0.32, 0.05, 0.32, T.dark, x, s * (W(x, deckZ(x) - 0.9) + 0.02), deckZ(x) - 0.9);
      }
      /* dropper hatches in the transom [W] */
      box(THREE, g, 0.1, 1.0, 0.8, T.dark, XS0 - 0.02, s * 1.6, 2.2);
    }

    /* ---------------------------------------------- bow superstructure */
    /* x 24.8-35.6, its front angled in to the centreline, roof following the
       sheer; the bulwark along it and round mount No. 1 [W][T][V] */
    var bzr = roofZ(30.0) + 0.15;
    polyPrism(THREE, g, T.sup, [[24.8, -4.6], [32.6, -4.3], [35.6, -1.8], [35.6, 1.8], [32.6, 4.3], [24.8, 4.6]], deckZ(24.8) - 0.3, bzr);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 7.6, 0.08, 0.9, T.sup, 28.7, s * 4.47, bzr + 0.45);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, 26.0, s * 4.62, deckZ(26) + 1.0);
      box(THREE, g, 2.0, 0.06, 0.6, T.dark, 30.5, s * 4.5, deckZ(30.5) + 1.7);
      /* life rafts beside mount No. 1 [W][O] */
      cylX(THREE, g, 0.36, 0.36, 1.5, 10, T.sup, 26.4, s * 3.4, bzr + 0.38);
      cylX(THREE, g, 0.36, 0.36, 1.5, 10, T.sup, 26.4, s * 2.6, bzr + 0.38);
    }
    hexa(THREE, g, T.sup, [[32.6, -4.3, bzr], [35.6, -1.8, bzr], [35.6, -1.7, bzr], [32.6, -4.2, bzr],
                            [32.6, -4.3, bzr + 0.9], [35.6, -1.8, bzr + 0.9], [35.6, -1.7, bzr + 0.9], [32.6, -4.2, bzr + 0.9]]);
    hexa(THREE, g, T.sup, [[35.6, 1.8, bzr], [32.6, 4.3, bzr], [32.6, 4.2, bzr], [35.6, 1.7, bzr],
                            [35.6, 1.8, bzr + 0.9], [32.6, 4.3, bzr + 0.9], [32.6, 4.2, bzr + 0.9], [35.6, 1.7, bzr + 0.9]]);
    box(THREE, g, 0.08, 3.6, 0.9, T.sup, 35.6, 0, bzr + 0.45);
    var m1 = new THREE.Group(); m1.position.set(30.2, 0, bzr); zif20(THREE, m1, T); g.add(m1);

    /* --------------------------------------------------------- bridge */
    /* 01 level x 13-24.8 (narrow aft over the boats), 02 level, the
       wheelhouse with its windows, the open bridge on its roof, wings, and
       the director tower aft [P][S][T] */
    var z1 = roofZ(19.0) + 0.2, z2 = z1 + 2.5, z3 = z2 + 2.5;
    polyPrism(THREE, g, T.sup, [[13.0, -2.9], [19.0, -2.9], [19.0, -4.5], [24.8, -4.6], [24.8, 4.6], [19.0, 4.5], [19.0, 2.9], [13.0, 2.9]].slice(0), deckZ(13) - 0.3, z1);
    polyPrism(THREE, g, T.sup, [[15.2, -4.0], [23.2, -4.45], [24.5, -3.4], [24.5, 3.4], [23.2, 4.45], [15.2, 4.0]], z1, z2);
    polyPrism(THREE, g, T.sup, [[16.0, -3.7], [22.6, -3.9], [23.9, -2.9], [23.9, 2.9], [22.6, 3.9], [16.0, 3.7]], z2, z3);
    /* the wide open bridge deck overhanging the wheelhouse, its plated
       breastwork */
    polyPrism(THREE, g, T.sup, [[15.4, -4.5], [22.9, -4.75], [24.8, -3.4], [24.8, 3.4], [22.9, 4.75], [15.4, 4.5]], z3, z3 + 0.2);
    var bw = [[15.4, 4.5], [22.9, 4.75], [24.8, 3.4], [24.8, -3.4], [22.9, -4.75], [15.4, -4.5]];
    for (i = 0; i < bw.length - 1; i++) {
      var p0 = bw[i], p1 = bw[i + 1], L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      box(THREE, g, L, 0.1, 1.05, T.sup, (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, z3 + 0.72, Math.atan2(p1[1] - p0[1], p1[0] - p0[0]));
    }
    /* windows: wheelhouse front and sides, the 02 level front */
    hexa(THREE, g, T.glass, [[23.9, -2.8, z2 + 1.2], [23.96, -2.8, z2 + 1.2], [23.96, 2.8, z2 + 1.2], [23.9, 2.8, z2 + 1.2],
                              [23.9, -2.8, z2 + 1.95], [23.96, -2.8, z2 + 1.95], [23.96, 2.8, z2 + 1.95], [23.9, 2.8, z2 + 1.95]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.4, 0.06, 0.75, T.glass, 23.3, s * 3.42, z2 + 1.55, -s * 0.62);
      box(THREE, g, 5.6, 0.06, 0.7, T.glass, 19.4, s * 3.82, z2 + 1.55);
      for (i = 0; i < 4; i++) box(THREE, g, 0.7, 0.06, 0.6, T.glass, 16.6 + i * 1.8, s * (4.02 + i * 0.06), z1 + 1.4);
      box(THREE, g, 0.9, 0.06, 1.9, T.dark, 20.6, s * 4.53, deckZ(20.6) + 1.05);
      /* searchlights on the open bridge wings [O][S] */
      cylX(THREE, g, 0.38, 0.38, 0.55, 12, T.metal, 22.2, s * 4.1, z3 + 1.6);
      cylX(THREE, g, 0.33, 0.33, 0.04, 12, T.glass, 22.5, s * 4.1, z3 + 1.6);
      cylZ(THREE, g, 0.08, 0.1, 0.5, 6, T.metal, 22.2, s * 4.1, z3 + 1.1);
    }
    box(THREE, g, 0.06, 5.6, 0.6, T.glass, 24.42, 0, z1 + 1.5);
    roofRail(THREE, g, T, [[13.1, 2.8], [13.1, -2.8]], z1, 0.9);
    /* director tower on the after part of the open bridge, the director */
    var zt = z3 + 1.6;
    polyPrism(THREE, g, T.sup, [[15.6, -1.8], [19.2, -1.8], [19.8, -1.2], [19.8, 1.2], [19.2, 1.8], [15.6, 1.8]], z3, zt);
    director(THREE, g, T, 17.6, zt);
    /* ladders up the bridge sides */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 14.0, s * 3.0, deckZ(14), 15.6, s * 3.0, z1, 0.05, 3);
      strut(THREE, g, T.metal, 14.0, s * 2.6, z1, 15.6, s * 2.6, z2, 0.05, 3);
    }

    /* ship's boats on the upper deck either side abaft the bridge front:
       the command launch to starboard, the motor launch to port, with their
       boat booms [W] */
    boat(THREE, g, T, 15.6, -4.55, deckZ(15.6) + 0.95, 6.6, 0.95, 0.55);
    boat(THREE, g, T, 15.6, 4.55, deckZ(15.6) + 0.95, 7.0, 1.0, 0.6);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 13.2, s * 2.9, z1, 17.2, s * 4.5, z1 + 3.4, 0.08, 4);
      strut(THREE, g, T.metal, 17.2, s * 4.5, z1 + 3.4, 17.2, s * 4.5, deckZ(16) + 2.0, 0.02, 3);
    }

    /* -------------------------------------------- foremast, funnel No. 1 */
    /* tall lattice tower rising behind the bridge, ahead of funnel No. 1, to 22 m, the
       platform with its small (unidentified) radar, yards, the topmast to
       30.2 m (34.5 m from the baseline [W]) [P][S][T][V] */
    var fx = 13.1;
    lattice(THREE, g, T.metal, fx, 1.1, 2.1, 0.5, 0.65, z1, 22.0, 6, 0.15);
    box(THREE, g, 1.8, 2.0, 0.12, T.metal, fx, 0, 17.4);
    box(THREE, g, 0.4, 9.0, 0.14, T.metal, fx, 0, 21.2);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, fx, s * 0.6, 20.2, fx, s * 4.4, 21.2, 0.04, 3);
    /* the masthead platform with its radar housing and small antenna
       (type not identified) [S][T] */
    polyPrism(THREE, g, T.metal, [[fx - 1.3, -1.5], [fx + 1.5, -1.5], [fx + 1.5, 1.5], [fx - 1.3, 1.5]], 22.0, 22.14);
    roofRail(THREE, g, T, [[fx - 1.3, 1.5], [fx + 1.5, 1.5], [fx + 1.5, -1.5], [fx - 1.3, -1.5], [fx - 1.3, 1.5]], 22.14, 0.7);
    cylZ(THREE, g, 0.85, 0.95, 1.2, 12, T.sup, fx + 0.2, 0, 22.75);
    box(THREE, g, 0.5, 2.6, 0.35, T.metal, fx + 0.2, 0, 23.6);
    strut(THREE, g, T.metal, fx - 0.6, 0, 22.1, fx - 0.6, 0, 30.2, 0.07, 5);
    box(THREE, g, 0.1, 3.6, 0.1, T.metal, fx - 0.6, 0, 27.6);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, fx, s * 4.3, 21.2, fx - 5.5, s * 2.0, roofZ(6) + 0.1, 0.015, 3);
      strut(THREE, g, T.metal, fx - 0.6, 0, 30.0, 0.0, s * 3.5, roofZ(0), 0.012, 3);
    }
    /* casing round the uptakes x 6.6-13, funnel No. 1 raked aft, life rafts
       on the casing [P][V][W] */
    var zc1 = roofZ(9.0);
    polyPrism(THREE, g, T.sup, [[6.6, -3.0], [13.0, -3.0], [13.0, 3.0], [6.6, 3.0]], deckZ(7) - 0.3, zc1);
    funnel(THREE, g, T, 9.2, zc1, 12.5, 2.5, 2.05, 0.13);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.36, 0.36, 1.5, 10, T.sup, 12.0, s * 2.55, zc1 + 0.38);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, 8.0, s * 3.03, deckZ(8) + 1.0);
    }
    roofRail(THREE, g, T, [[6.7, 2.9], [6.7, -2.9]], zc1, 0.9);

    /* forward PTA-53-56 on the centreline abaft the casing [W] */
    var ttA = new THREE.Group(); ttA.position.set(2.8, 0, deckZ(2.8)); tubes5(THREE, ttA, T); g.add(ttA);

    /* ---------------------------------------------- middle superstructure */
    /* x -18.8 to -0.7 with sponsons for mounts No. 2/3, the mainmast, the
       Fut-B pedestal, funnel No. 2 and the yawl to port */
    var zm = roofZ(-10.0);
    polyPrism(THREE, g, T.sup, [[-18.8, -3.4], [-1.6, -3.3], [-0.7, -2.6], [-0.7, 2.6], [-1.6, 3.3], [-18.8, 3.4]], deckZ(-10) - 0.3, zm);
    polyPrism(THREE, g, T.sup, [[-7.4, -3.4], [-6.4, -5.3], [-4.4, -5.3], [-3.4, -3.3], [-3.4, 3.3], [-4.4, 5.3], [-6.4, 5.3], [-7.4, 3.4]], deckZ(-5) - 0.3, zm);
    for (s = -1; s <= 1; s += 2) {
      var mz = new THREE.Group(); mz.position.set(-5.4, s * 3.95, zm); zif20(THREE, mz, T); mz.rotation.z = s * 0.5; g.add(mz);
      for (i = 0; i < 3; i++) box(THREE, g, 0.9, 0.06, 1.8, T.dark, -16.0 + i * 5.2, s * 3.43, deckZ(-10) + 1.0);
      cylX(THREE, g, 0.36, 0.36, 1.5, 10, T.sup, -13.6, s * 2.9, zm + 0.38);
    }
    roofRail(THREE, g, T, [[-1.6, 3.2], [-3.4, 3.2], [-4.4, 5.2], [-6.4, 5.2], [-7.4, 3.3], [-18.7, 3.3], [-18.7, -3.3], [-7.4, -3.3],
                           [-6.4, -5.2], [-4.4, -5.2], [-3.4, -3.2], [-1.6, -3.2]], zm, 0.9);
    /* mainmast: lattice tower between the funnels to 20 m, the Slim Net
       at its head, a pole topmast [S][T][V][W] */
    var mx = -4.4;
    /* its plated, tapering lower part with the arch through it [S][V] */
    hexa(THREE, g, T.sup, [[mx - 1.7, -1.7, zm], [mx + 1.7, -1.7, zm], [mx + 1.7, 1.7, zm], [mx - 1.7, 1.7, zm],
                            [mx - 0.9, -0.95, zm + 4.2], [mx + 0.9, -0.95, zm + 4.2], [mx + 0.9, 0.95, zm + 4.2], [mx - 0.9, 0.95, zm + 4.2]]);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.4, 0.06, 1.6, T.dark, mx, s * 1.62, zm + 0.8);
    lattice(THREE, g, T.metal, mx, 0.9, 0.95, 0.4, 0.45, zm + 4.2, 19.8, 4, 0.12);
    box(THREE, g, 1.6, 1.6, 0.12, T.metal, mx, 0, 15.0);
    box(THREE, g, 0.3, 5.0, 0.12, T.metal, mx, 0, 15.1);
    box(THREE, g, 1.2, 1.2, 0.12, T.metal, mx, 0, 19.8);
    slimNet(THREE, g, T, mx, 19.86);
    strut(THREE, g, T.metal, mx - 0.4, 0, 19.8, mx - 0.4, 0, 24.5, 0.05, 4);
    box(THREE, g, 0.08, 2.4, 0.08, T.metal, mx - 0.4, 0, 23.8);
    /* the Fut-B director abaft the mainmast [W][S][T] */
    futB(THREE, g, T, -8.8, zm, zm + 2.6, 0);
    /* funnel No. 2 [V][S] */
    funnel(THREE, g, T, -16.2, zm, 12.1, 3.0, 2.1, 0.13);
    /* six-oar yawl on the roof to port [W] */
    boat(THREE, g, T, -11.4, 2.2, zm + 0.7, 6.0, 0.85, 0.42);

    /* after PTA-53-56 on the centreline [W] */
    var ttB = new THREE.Group(); ttB.position.set(-22.7, 0, deckZ(-22.7)); tubes5(THREE, ttB, T); g.add(ttB);

    /* ------------------------------------------------ after superstructure */
    var za = roofZ(-30.0) + 0.2;
    polyPrism(THREE, g, T.sup, [[-33.0, -3.0], [-26.3, -3.1], [-26.3, 3.1], [-33.0, 3.0]], deckZ(-30) - 0.3, za);
    var m4 = new THREE.Group(); m4.position.set(-29.4, 0, za); m4.rotation.z = PI; zif20(THREE, m4, T); g.add(m4);
    roofRail(THREE, g, T, [[-26.4, 3.0], [-32.9, 2.9], [-32.9, -2.9], [-26.4, -3.0], [-26.4, 3.0]], za, 0.9);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.06, 1.8, T.dark, -28.0, s * 3.13, deckZ(-28) + 1.0);
    /* the second Fut-B on its small tower abaft it */
    polyPrism(THREE, g, T.sup, [[-35.6, -1.3], [-33.0, -1.3], [-33.0, 1.3], [-35.6, 1.3]], deckZ(-34) - 0.3, za + 1.2);
    futB(THREE, g, T, -34.3, za + 1.2, za + 1.8, PI);

    /* low house on the quarterdeck abaft the after turret */
    polyPrism(THREE, g, T.sup, [[-51.5, -1.8], [-47.5, -1.6], [-47.5, 1.6], [-51.5, 1.8]], deckZ(-49.5) - 0.3, deckZ(-49.5) + 1.4);

    /* after 130 mm on the quarterdeck, trained astern */
    var ag = new THREE.Group(); ag.position.set(-40.5, 0, deckZ(-40.5)); ag.rotation.z = PI; sm21(THREE, ag, T); g.add(ag);

    /* six BMB-2 throwers right aft, three a side, and the mine rails from
       funnel No. 2 to the stern [W] */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        var bx = -54.4 - i * 1.7;
        var bm = new THREE.Group(); bm.position.set(bx, s * 3.0, deckZ(bx)); g.add(bm);
        cylZ(THREE, bm, 0.32, 0.4, 0.4, 8, T.sup, 0, 0, 0.2);
        var tb = new THREE.Group(); tb.position.set(0, 0, 0.45); tb.rotation.x = -s * 0.5; bm.add(tb);
        cylZ(THREE, tb, 0.16, 0.16, 1.3, 8, T.gun, 0, 0, 0.6);
        cylZ(THREE, tb, 0.2, 0.2, 0.18, 8, T.gun, 0, 0, 1.2);
      }
      for (k = 0; k < 2; k++) {
        var ins = k ? 1.6 : 1.0;
        for (i = 0; i < 6; i++) {
          var rx0 = -18.0 - i * 7.4, rx1 = Math.max(XS0 + 1.4, rx0 - 7.4);
          if (rx0 <= rx1) continue;
          strut(THREE, g, T.metal, rx0, s * (halfB(rx0) - ins), deckZ(rx0) + 0.07, rx1, s * (halfB(rx1) - ins), deckZ(rx1) + 0.07, 0.05, 3);
        }
      }
    }

    /* forecastle: capstans, windlass, bollards, breakwater-less deck; the
       jackstaff and the ensign staff */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.45, 0.55, 0.6, 10, T.metal, 53.6, s * 1.15, deckZ(53.6) + 0.3);
      box(THREE, g, 2.8, 0.18, 0.08, T.gun, 55.0, s * 1.6, deckZ(55) + 0.05, -s * 0.3);
      for (i = 0; i < 4; i++) {
        var bxx = 46 - i * 26;
        cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, bxx, s * (halfB(bxx) - 0.55), deckZ(bxx) + 0.22);
        cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, bxx - 0.6, s * (halfB(bxx) - 0.55), deckZ(bxx) + 0.22);
      }
      cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, -60.0, s * 4.4, deckZ(-60) + 0.22);
    }
    box(THREE, g, 1.4, 1.2, 0.55, T.metal, 51.8, 0, deckZ(51.8) + 0.27);
    strut(THREE, g, T.metal, 62.6, 0, deckZ(62.6), 62.6, 0, deckZ(62.6) + 3.0, 0.05, 4);
    strut(THREE, g, T.metal, XS0 + 0.4, 0, deckZ(XS0), XS0 + 0.4, 0, deckZ(XS0) + 4.0, 0.06, 4);
    /* mushroom vents on the weather deck */
    var vs = [[47.0, 2.2], [47.0, -2.2], [37.0, 3.6], [37.0, -3.6], [-12.0, 4.6], [-12.0, -4.6],
              [-36.8, 3.0], [-36.8, -3.0], [-49.5, 3.2], [-49.5, -3.2], [3.8, 4.4], [3.8, -4.4]];
    for (i = 0; i < vs.length; i++) {
      var vx = vs[i][0], vz = deckZ(vx);
      cylZ(THREE, g, 0.2, 0.2, 0.7, 8, T.sup, vx, vs[i][1], vz + 0.35);
      cylZ(THREE, g, 0.4, 0.2, 0.3, 8, T.sup, vx, vs[i][1], vz + 0.8);
    }
    /* whip aerials on the bridge and middle house */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 21.0, s * 4.4, z3 + 1.2, 20.6, s * 4.9, z3 + 8.5, 0.04, 3);
      strut(THREE, g, T.metal, -14.2, s * 3.2, zm, -14.6, s * 3.7, zm + 8.0, 0.04, 3);
    }

    /* underwater gear: shafts in bossings (no brackets after the lead
       ship's trials [W]), four-blade 4.0 m screws, one rudder [W] */
    for (s = -1; s <= 1; s += 2) {
      var bos = [];
      for (i = 0; i <= 5; i++) {
        var f = i / 5;
        bos.push(superRing(0.55 - f * 0.3, 0.55 - f * 0.3, -2.75 + f * 0.1, 1, 10).map(function (p) { return [s * 2.7 + p[0], p[1]]; }));
      }
      ringLoft(THREE, g, T.under, [-28, -36, -44, -49, -52, -53.8], bos, true);
      cylX(THREE, g, 0.2, 0.2, 1.6, 8, T.metal, -54.6, s * 2.7, -2.7);
      cylX(THREE, g, 0.35, 0.45, 0.8, 8, T.metal, -55.6, s * 2.7, -2.7);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, 1.7), T.metal);
        bl.position.set(-55.6, s * 2.7, -2.7); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(1.05); bl.rotation.y = 0.45; g.add(bl);
      }
    }
    box(THREE, g, 3.0, 0.3, 3.4, T.metal, -58.6, 0, -1.4);
    /* bilge keels */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 30.0, 0.08, 0.6, T.under, -4.0, s * (W(-4, -3.2) + 0.2), -3.25);

    /* rails along the deck edge (the forecastle rails broken at the turret) */
    railRun(THREE, g, T, XS0 + 0.6, 24.5, 4.6, 1.0);
    railRun(THREE, g, T, 24.5, 62.0, 3.8, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.0, 0.9, 0.04, T.team, 33.4, 0, bzr + 0.02);
    box(THREE, g, 3.0, 1.0, 0.04, T.team, -13.0, -1.4, zm + 0.02);
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -49.5, 0, deckZ(-49.5) + 1.42);

    /* the trained mount: forward 130 mm SM-2-1 [P][V][W] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(40.5, 0, deckZ(40.5)); sm21(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tbk = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tbk.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  return { build: build };
})();

/* Registration: len is the true overall length, 126.1 m [W]. */
UNIT_MODELS["pact_e50_destroyer"] = {
  len: 126.1,
  build: function (THREE, M, C) { return HeroKotlin.build(THREE, M, C); }
};
