/* ==================== js/hero/pla_anshan.js ============================
   HERO MODEL -- Anshan class destroyer: the four ex-Soviet Project 7
   ("Gnevny" type) destroyers Rekordny, Rezky, Reshitelny and Retivy,
   transferred 1954-55 as Anshan (101), Fushun (102), Changchun (103) and
   Taiyuan (104).  Drawn AS TRANSFERRED, the fit of the 1950s: four single
   130 mm B-13 in shielded mounts (two forward, two aft, each pair
   superfiring), two single 76.2 mm 34-K, four single 37 mm 70-K, two
   triple 533 mm torpedo tube mounts amidships [E].  NOT the 1971-74
   "Type 6607" rebuild (two twin HY-2 launchers in place of the tubes,
   twin Type 61 37 mm in place of the singles, the 76 mm and 20 mm
   removed [E]) that the museum ship at Qingdao carries.
   Key: pla_e50_destroyer (e50, service 1955, turret:true).

   DIMENSIONS [E][S]: 112.8 m overall, 109 m between perpendiculars,
   beam 10.2 m, draught 4.0 m [E] (en.wikipedia's Gnevny article [S]
   gives 4.8 m at deep load; the Anshan figure is used, the waterline is
   the 4.0 m one).  The drawing [G] is labelled "375'-0 O.A." (114.3 m)
   and its stern-to-stem length reads 374 ft on its own scale bar: 1.3 %
   longer than the published 112.8 m, so [G] is rescaled to 112.8 m.

   REFERENCES (Wikimedia Commons; English Wikipedia)
     [G] "Plan and elevation of Gnevny-class DDs.jpg" (750 x 361 px, the
         file's full size): a starboard ELEVATION and a PLAN of a wartime
         Project 7, bow right, the line drawing every station below is
         read from.  Stern at px 23, stem head at px 678 (655 px = 112.8 m,
         5.81 px/m; model x = (px - 350.5) / 5.81); waterline at y 143.
         Read off it: main deck at y 131-128 aft and amidships (2.1-2.6 m);
         forecastle 4.5 m at its after end rising to 5.2 m at the stem;
         the stem raked from px 670 at the water to 678 at the deck; Y gun
         x -41.7 on the main deck, X gun x -35.7 on a deckhouse x -38.8 to
         -31.9 (roof 6.2 m), each with its barrel aft; a tower abaft that
         deckhouse x -31.9 to -29.3 with a rangefinder on top (7.9 m);
         triple tubes centred about x -23.7 and x -7.0; a deckhouse x -17.3
         to -11.6 (roof 5.85 m) carrying the two 76 mm ABREAST (plan) and
         the pole mainmast at its after end (top 16.5 m, raked aft); a
         deckhouse x -1.8 to 4.7 (roof 5.5 m) and a tall block x 4.2-7.6
         (roof 7.9 m) with a searchlight on it, two small gun positions
         abreast it (plan); the ONE large funnel on a casing x 5-18, its
         base 9.5 m long and (plan) 3.8 m wide, the top sloping from
         12.2 m forward to 10.2 m aft, the fore edge raked; the bridge
         from x 19.8 forward, levels at 7.4 and 9.6 m, the gun director
         with its rangefinder on top (13.3 m); the pole foremast at x 20.6
         to 22.4 m with two yards; two small positions on the bridge
         wings (plan).  Low resolution: positions are good to about
         +-1 m, heights to about +-0.4 m.
     [M] "PLANS Anshan (101).jpg": the museum ship at Qingdao from
         STARBOARD, nearly broadside, bow right.  Taken from it: the
         sheer and the sloped forecastle break (from the main deck up to
         the forecastle under mount B), the forecastle-to-main-deck
         freeboard ratio (2.2 : 1, the same as [G]: so [G]'s heights are
         kept), the spacing of A and B (B on a raised house at the
         forecastle break, A well forward on the forecastle, read about
         x 36.6 and 42.7 from the stem and foremast stations; [G]'s plan
         gives 36.4 and 45.0; drawn at 38.0 and 44.0, so that B clears
         the bridge front [G] at 35.4), the boxy B-13 shields with sloped faces,
         the one large funnel close abaft the bridge, the pole mainmast.
         REMOVED as 1970s fit: the two HY-2 launchers and their blast
         screens, the twin 37 mm mounts, the lattice foremast and its
         radars, the hood (cowl) on the funnel top, two tall vertical
         pipes abaft the mainmast, the gangway structures aft.
     [Q] "Qingdao..." infobox photograph (Chinese file name; Anshan as
         museum ship, 24 August 2017, from the port bow) and [Q2]
         "Anshan-class destroyer Anshan No. in Qingdao Naval Museum
         20080713.jpg" (port bow): the B-13 shields (flat roof, sloped
         face, the barrel in a slot), mount B on its house ahead of the
         bridge, the flared bow, the funnel's long oval, the bridge tiers
         and the gun director over the bridge.
     [R] "Aerial view of Razumny A 22471.jpg" (1944, from high on the
         starboard quarter): a Project 7 in service - one funnel, POLE
         foremast and POLE mainmast, the four 130 mm, the low after end.
     [E] en.wikipedia "Anshan-class destroyer": dimensions; the 1954-55
         armament (4 x 130 mm/50 B-13, 2 x 76.2 mm 34-K "in two turrets",
         4 x 37 mm 70-K single, 1 x 20 mm, 2 x 3 533 mm tubes); the
         1971-74 rebuild; depth-charge projectors and racks, 60 mines.
     [S] en.wikipedia "Gnevny-class destroyer": the 130 mm in "two pairs
         of superfiring single mounts fore and aft of the superstructure",
         two 34-K and two 21-K 45 mm singles, two triple tube mounts
         amidships, mines and depth charges.
     [K] js/hero/ru_kotlin.js (HeroKotlin): the geometry kit, section
         lofting, textures and bake are copied from it.

   CHECKED AGAINST THE BRIEF: the brief listed "two raked funnels" and a
   "tripod foremast".  Every reference here shows ONE large funnel (the
   three boilers trunked into it) [G][M][Q][R] and a POLE foremast
   [G][R] (the museum ship's lattice foremast is a later fit [M]): one
   funnel and a pole foremast are drawn.

   RECOGNITION LIST (where each shows):
     1. Flush main deck aft, low (2.2-2.6 m), a raised forecastle from
        under mount B to the flared, raked stem (4.6-5.2 m), its after end
        sloped [G][M] - STA, W(), zBot().
     2. Four single 130 mm B-13 in boxy open-backed shields with sloped
        faces: A on the forecastle (the "turret"), B superfiring on a house
        ahead of the bridge, X superfiring on the after deckhouse and Y on
        the quarterdeck, X and Y trained astern [G][M][Q][S] - b13().
     3. One very large oval funnel abaft the bridge, raked, its top
        sloping down aft under a dark band [G][M][Q][R] - funnelS().
     4. The bridge block with the gun director and its rangefinder on
        top, the pole foremast at its after end [G][Q][R] - director().
     5. Two triple 533 mm tube mounts on the centreline, one between the
        funnel casing and the after deckhouse, one abaft it [G][S][E] -
        tubes3().
     6. The two 76.2 mm 34-K abreast on the after deckhouse with the pole
        mainmast at its after end [G][E][R] - k34().
     7. Four single 37 mm 70-K [E] at the four small gun positions [G]
        shows (two on the bridge wings, two abreast the searchlight block
        abaft the funnel) - k70().
     8. A rangefinder tower abaft X and a searchlight block abaft the
        funnel [G].
     9. Mine rails along the sides of the after deck and depth-charge
        racks at the stern [G][E].
    10. Paint: plain light grey (the Luda hero's PLAN grey); dark decks,
        black boot topping and funnel band.
   NOT CONFIRMED (estimated or not drawn):
     - All widths across the ship except the beam and the funnel (houses,
       gun shields, tube mounts) are estimated from [G]'s small plan and
       the photographs' 3/4 views; the hull's half breadths below the
       deck edge, the bilge and the underwater body are the Kotlin's [K]
       form scaled to 10.2 m beam: no reference shows them.
     - Which gun stood at which of the four small positions in 1955: [G]
       shows the positions (wartime: 45 mm 21-K and machine guns); [E]
       says four single 70-K were fitted.  The 70-K is drawn at all four.
     - The 20 mm Oerlikon [E]: no position known, not drawn.
     - Radars of the 1950s fit: none is shown by [G] or [R]; none drawn.
       Boats and davits: not resolved by any reference; not drawn.
     - The B-13 shield and 34-K shield sizes: from [G]'s side outline
       and the museum mounts [M][Q]; their widths are estimates.
     - Depth-charge projectors [E]: positions unknown, not drawn; racks
       drawn at the stern where [G]'s plan shows two fittings.
   No pennant numbers, names, ensigns or the bow star.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The row
   has turret:true and its first weapon is the 130 mm: the forward-most
   130 mm (mount A) is the group named "turret"; everything else is
   baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAnshan = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -56.4, XS1 = 56.4, XWL = 55.0;   /* stern, stem head, stem at the waterline [G] */

  /* HULL SECTION TABLE.  Deck heights at the side read off [G] (main deck
     2.2-2.6 m, the forecastle 4.6-5.2 m; the sloped forecastle break
     x 31-35 under mount B [G][M]); half beams from the published 10.2 m
     [E], fined forward and aft after [G]'s plan; bottom on the
     centreline to the 4.0 m draught [E]; a counter stern with its transom
     foot 0.8 m above the water [G][M].
     x, deck z, half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power) */
  var STA = [
    [-56.4, 2.22, 2.90, 2.30,  0.80, 2.2],
    [-55.0, 2.22, 3.60, 3.10,  0.20, 2.3],
    [-52.0, 2.22, 4.30, 3.90, -1.20, 2.5],
    [-46.0, 2.23, 4.80, 4.50, -2.90, 2.7],
    [-36.0, 2.25, 5.05, 4.90, -3.80, 2.9],
    [-20.0, 2.28, 5.10, 5.00, -4.00, 3.0],
    [  0.0, 2.32, 5.10, 5.00, -4.00, 3.0],
    [ 15.0, 2.42, 5.05, 4.90, -4.00, 2.9],
    [ 25.0, 2.55, 4.88, 4.60, -3.95, 2.7],
    [ 31.0, 2.68, 4.65, 4.25, -3.90, 2.5],
    [ 35.0, 4.60, 4.40, 3.90, -3.80, 2.3],
    [ 42.0, 4.75, 3.75, 3.00, -3.40, 2.0],
    [ 48.0, 4.90, 2.95, 1.90, -2.60, 1.7],
    [ 52.0, 5.02, 2.20, 1.00, -1.60, 1.5],
    [ 55.0, 5.12, 1.25, 0.00,  0.00, 1.4],
    [ 56.4, 5.20, 0.20, 0.00,  0.00, 1.2]
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
     head [G]; elsewhere the table's keel line (the counter aft) */
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

  /* paint: plain PLAN light grey, the Luda hero's values (the wartime
     references are monochrome; the museum ship's repaint is not taken as
     the 1950s colour) - dark grey decks, black boot topping and band */
  var PAINT = { hull: 0x8a959c, sup: 0x95a0a6, deck: 0x4d5459, soot: 0x26292c };
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
    for (x = XS0; x < XS0 + 5; x += 1.0) xs.push(x);
    for (x = 29; x < 36; x += 0.5) xs.push(x);
    for (x = 47; x < XS1; x += 1.0) xs.push(x);
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
  /* the small flat transom at the end of the counter [G][M], hull paint */
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

  /* ------------------------------------------------------------ fittings */
  /* single 130 mm B-13 at rest pointing +X: the pedestal, the boxy
     open-backed shield (3.4 m long, 2.7 m wide, its face sloped back to
     the roof) with the barrel slot, the 50-calibre (6.5 m) barrel
     [G][M][Q]; origin on the deck under the pivot */
  function b13(THREE, g, T) {
    var s;
    cylZ(THREE, g, 1.25, 1.35, 0.45, 18, T.sup, 0, 0, 0.22);
    /* the shield: sides, roof, the sloped face */
    hexa(THREE, g, T.sup, [
      [-1.7, -1.35, 0.45], [1.1, -1.35, 0.45], [1.1, 1.35, 0.45], [-1.7, 1.35, 0.45],
      [-1.7, -1.3, 2.55], [0.7, -1.3, 2.55], [0.7, 1.3, 2.55], [-1.7, 1.3, 2.55]]);
    hexa(THREE, g, T.sup, [
      [1.1, -1.35, 0.45], [1.75, -1.15, 0.45], [1.75, 1.15, 0.45], [1.1, 1.35, 0.45],
      [0.7, -1.3, 2.55], [1.2, -1.1, 2.45], [1.2, 1.1, 2.45], [0.7, 1.3, 2.55]]);
    /* the open back shows dark; the sight hoods on the roof */
    box(THREE, g, 0.06, 2.3, 1.7, T.dark, -1.73, 0, 1.45);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.7, 0.4, 0.3, T.sup, 0.1, s * 0.8, 2.68);
    /* barrel slot and barrel, raised a little */
    box(THREE, g, 0.1, 0.5, 1.1, T.dark, 1.62, 0, 1.45);
    var br = new THREE.Group(); br.position.set(1.0, 0, 1.45); br.rotation.y = -0.05;
    cylX(THREE, br, 0.2, 0.22, 1.0, 10, T.gun, 0.4, 0, 0);
    cylX(THREE, br, 0.09, 0.13, 6.0, 10, T.gun, 3.6, 0, 0, true);
    cylX(THREE, br, 0.11, 0.11, 0.3, 10, T.gun, 6.5, 0, 0);
    g.add(br);
    return g;
  }
  /* single 76.2 mm 34-K at rest pointing +X: pedestal, the small shield
     (2.0 m long, 1.9 m wide), the 55-calibre (4.2 m) barrel [G][E] */
  function k34(THREE, g, T) {
    cylZ(THREE, g, 0.8, 0.9, 0.4, 14, T.sup, 0, 0, 0.2);
    hexa(THREE, g, T.sup, [
      [-1.1, -0.95, 0.4], [0.9, -0.95, 0.4], [0.9, 0.95, 0.4], [-1.1, 0.95, 0.4],
      [-1.0, -0.9, 1.95], [0.45, -0.9, 1.95], [0.45, 0.9, 1.95], [-1.0, 0.9, 1.95]]);
    box(THREE, g, 0.05, 1.6, 1.2, T.dark, -1.12, 0, 1.1);
    var br = new THREE.Group(); br.position.set(0.5, 0, 1.25); br.rotation.y = -0.2;
    cylX(THREE, br, 0.14, 0.14, 0.7, 8, T.gun, 0.25, 0, 0);
    cylX(THREE, br, 0.06, 0.08, 3.6, 8, T.gun, 2.3, 0, 0, true);
    g.add(br);
    return g;
  }
  /* single 37 mm 70-K at rest pointing +X: pedestal, a small curved
     shield, the 63-calibre (2.3 m) barrel [E] */
  function k70(THREE, g, T) {
    cylZ(THREE, g, 0.45, 0.55, 0.5, 10, T.sup, 0, 0, 0.25);
    box(THREE, g, 0.12, 1.3, 1.0, T.sup, 0.35, 0, 1.0);
    box(THREE, g, 0.9, 0.5, 0.45, T.metal, -0.05, 0, 0.75);
    var br = new THREE.Group(); br.position.set(0.3, 0, 1.0); br.rotation.y = -0.35;
    cylX(THREE, br, 0.05, 0.05, 2.3, 6, T.gun, 1.0, 0, 0, true);
    cylX(THREE, br, 0.08, 0.08, 0.25, 6, T.gun, 2.0, 0, 0);
    g.add(br);
    /* the ring of the gun tub */
    var tg = new THREE.CylinderGeometry(1.25, 1.25, 0.9, 16, 1, true); tg.rotateX(PI / 2);
    var tub = new THREE.Mesh(tg, T.sup); tub.position.set(0, 0, 0.45); g.add(tub);
    return g;
  }
  /* triple 533 mm tubes on a trainer, pointing +X (7.6 m tubes) [G][S] */
  function tubes3(THREE, g, T) {
    var i;
    cylZ(THREE, g, 1.0, 1.15, 0.5, 12, T.sup, 0, 0, 0.25);
    box(THREE, g, 2.2, 2.3, 0.3, T.sup, 0, 0, 0.65);
    for (i = 0; i < 3; i++) {
      var y = -0.7 + i * 0.7;
      cylX(THREE, g, 0.32, 0.32, 7.6, 10, T.sup, 0.3, y, 1.15);
      cylX(THREE, g, 0.34, 0.34, 0.25, 10, T.dark, -3.55, y, 1.15);
      cylX(THREE, g, 0.34, 0.34, 0.18, 10, T.metal, 4.1, y, 1.15);
    }
    box(THREE, g, 0.3, 2.4, 0.2, T.metal, -1.8, 0, 1.55);
    box(THREE, g, 0.3, 2.4, 0.2, T.metal, 2.4, 0, 1.55);
    /* the trainer's seat and its shelter at the after end [G] */
    box(THREE, g, 1.0, 0.9, 1.0, T.sup, -2.6, -1.6, 1.0);
    return g;
  }
  /* the large raked oval funnel with a top sloping down aft [G][M][Q]:
     base centre xb, base half length a0 / half width b0 at z0, top centre
     xt, top half length a1 / half width b1, the top at zf forward and za
     aft; the upper 0.9 m in the dark band */
  function funnelS(THREE, g, T, xb, z0, a0, b0, xt, a1, b1, zf, za) {
    var n = 24, NR = 8, j, i;
    function ring(t) {
      var r = [], xc = xb + (xt - xb) * t, a = a0 + (a1 - a0) * t, b = b0 + (b1 - b0) * t;
      for (j = 0; j < n; j++) {
        var th = j / n * PI * 2, c = Math.cos(th), s = Math.sin(th);
        var px = Math.sign(c) * Math.pow(Math.abs(c), 0.75), py = Math.sign(s) * Math.pow(Math.abs(s), 0.75);
        var zt = za + (px + 1) / 2 * (zf - za);
        r.push([xc + a * px, b * py, z0 + (zt - z0) * t]);
      }
      return r;
    }
    function loft(m, t0, t1, rows, capTop) {
      var pos = [], uv = [], idx = [], k;
      for (i = 0; i <= rows; i++) {
        var R = ring(t0 + (t1 - t0) * i / rows);
        for (j = 0; j < n; j++) { pos.push(R[j][0], R[j][1], R[j][2]); uv.push(j / n * 3, R[j][2] * 0.16); }
      }
      for (i = 0; i < rows; i++) for (j = 0; j < n; j++) {
        var a = i * n + j, b = i * n + (j + 1) % n, c = a + n, d = b + n;
        idx.push(a, b, c, b, d, c);
      }
      if (capTop) {
        var c0 = pos.length / 3, top = ring(t1), sx = 0, sz = 0;
        for (k = 0; k < n; k++) { sx += top[k][0]; sz += top[k][2]; }
        pos.push(sx / n, 0, sz / n - 0.25); uv.push(0, 0);
        for (k = 0; k < n; k++) idx.push(c0, rows * n + k, rows * n + (k + 1) % n);
      }
      var mm = new THREE.Mesh(geoOf(THREE, pos, uv, idx), m); g.add(mm); return mm;
    }
    var tb = 1 - 0.9 / (za - z0);
    loft(T.sup, 0, tb, NR, false);
    loft(T.soot, tb, 1, 2, false);
    /* the uptake mouth: a dark sloped plate just inside the rim */
    var top = ring(1), pos = [], uv = [], k, cx = 0, cz = 0;
    for (k = 0; k < n; k++) { cx += top[k][0]; cz += top[k][2]; }
    cx /= n; cz /= n;
    for (k = 0; k < n; k++) {
      var p = top[k], q = top[(k + 1) % n];
      pos.push(cx, 0, cz - 0.2, p[0] * 0.94 + cx * 0.06, p[1] * 0.92, p[2] - 0.05, q[0] * 0.94 + cx * 0.06, q[1] * 0.92, q[2] - 0.05);
      uv.push(0, 0, 1, 0, 0, 1);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.dark));
    /* steam pipes up the after side */
    strut(THREE, g, T.metal, xb - a0 * 0.95, 0.6, z0, xt - a1 * 0.97, 0.6, za + 0.6, 0.09, 5);
    strut(THREE, g, T.metal, xb - a0 * 0.95, -0.6, z0, xt - a1 * 0.97, -0.6, za + 0.4, 0.07, 5);
  }
  /* the gun director on the bridge: the drum, its hood and the
     rangefinder arms across the ship [G][Q] */
  function director(THREE, g, T, x, z) {
    cylZ(THREE, g, 1.2, 1.3, 1.4, 16, T.sup, x, 0, z + 0.7);
    hexa(THREE, g, T.sup, [
      [x - 1.4, -1.2, z + 1.4], [x + 1.3, -1.2, z + 1.4], [x + 1.3, 1.2, z + 1.4], [x - 1.4, 1.2, z + 1.4],
      [x - 1.3, -1.1, z + 2.6], [x + 0.9, -1.1, z + 2.6], [x + 0.9, 1.1, z + 2.6], [x - 1.3, 1.1, z + 2.6]]);
    cylY(THREE, g, 0.28, 0.28, 4.4, 10, T.sup, x - 0.2, 0, z + 2.25);
    var s;
    for (s = -1; s <= 1; s += 2) cylY(THREE, g, 0.3, 0.3, 0.12, 10, T.glass, x - 0.2, s * 2.25, z + 2.25);
    box(THREE, g, 0.06, 1.4, 0.3, T.glass, x + 1.15, 0, z + 1.95);
  }
  /* searchlight on a short column */
  function searchlight(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 0.1, 0.14, 0.6, 6, T.metal, x, y, z + 0.3);
    cylX(THREE, g, 0.45, 0.45, 0.7, 12, T.metal, x, y, z + 1.0);
    cylX(THREE, g, 0.4, 0.4, 0.04, 12, T.glass, x + 0.37, y, z + 1.0);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x;
    void M;

    /* hull shell in three bands, transom, weather deck [G][M] */
    g.add(shellBand(THREE, T.under, -6, -0.4, 4));
    g.add(shellBand(THREE, T.boot, -0.4, 0.5, 1));
    g.add(shellBand(THREE, T.hull, 0.5, 12, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    for (s = -1; s <= 1; s += 2) {
      /* hawse and anchor near the stem [M][Q] */
      var ax = 50.6, az = 3.7, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 1.2, 0.1, 1.0, T.dark, ax, ay, az);
      box(THREE, g, 0.8, 0.16, 0.8, T.gun, ax + 0.1, ay + s * 0.04, az - 0.1);
      /* scuttles: two rows under the forecastle, one aft [G][M] */
      for (i = 0; i < 9; i++) {
        x = 47 - i * 2.2;
        box(THREE, g, 0.28, 0.05, 0.28, T.dark, x, s * (W(x, deckZ(x) - 0.9) + 0.02), deckZ(x) - 0.9);
        if (x > 36) box(THREE, g, 0.28, 0.05, 0.28, T.dark, x, s * (W(x, 2.0) + 0.02), 2.0);
      }
      for (i = 0; i < 9; i++) {
        x = -30 - i * 2.4;
        box(THREE, g, 0.28, 0.05, 0.28, T.dark, x, s * (W(x, 1.5) + 0.02), 1.5);
      }
    }

    /* --------------------------------------------- forward gun pair */
    /* B on its raised house at the forecastle break, x 35.4-40.6 [G][M] */
    var zB = 7.2;
    polyPrism(THREE, g, T.sup, [[35.4, -2.9], [39.6, -2.5], [40.6, -1.4], [40.6, 1.4], [39.6, 2.5], [35.4, 2.9]], 2.5, zB);
    roofRail(THREE, g, T, [[39.5, 2.4], [40.5, 1.35], [40.5, -1.35], [39.5, -2.4]], zB, 0.9);
    var mB = new THREE.Group(); mB.position.set(38.0, 0, zB); b13(THREE, mB, T); g.add(mB);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.06, 1.8, T.dark, 37.0, s * 2.84, deckZ(37) + 1.0);

    /* --------------------------------------------------------- bridge */
    /* the base house x 18.6-35.4 to 5.0 m, the bridge house to 7.4 m,
       the open bridge with its breastwork to 9.6 m, the director on top
       to 13.3 m [G][Q] */
    var z1 = 5.0, z2 = 7.4, z3 = 9.6;
    polyPrism(THREE, g, T.sup, [[18.6, -3.4], [33.5, -3.6], [35.4, -2.9], [35.4, 2.9], [33.5, 3.6], [18.6, 3.4]], 2.3, z1);
    polyPrism(THREE, g, T.sup, [[22.0, -3.0], [32.2, -3.1], [34.2, -2.2], [34.2, 2.2], [32.2, 3.1], [22.0, 3.0]], z1, z2);
    polyPrism(THREE, g, T.sup, [[24.5, -2.6], [31.6, -2.6], [33.0, -1.9], [33.0, 1.9], [31.6, 2.6], [24.5, 2.6]], z2, z3 - 1.0);
    /* the open bridge deck, its wings and breastwork */
    polyPrism(THREE, g, T.sup, [[24.0, -4.2], [32.0, -4.2], [33.6, -2.4], [33.6, 2.4], [32.0, 4.2], [24.0, 4.2]], z3 - 1.0, z3 - 0.8);
    var bw = [[24.0, 4.2], [32.0, 4.2], [33.6, 2.4], [33.6, -2.4], [32.0, -4.2], [24.0, -4.2]];
    for (i = 0; i < bw.length - 1; i++) {
      var p0 = bw[i], p1 = bw[i + 1], L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      box(THREE, g, L, 0.1, 1.0, T.sup, (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, z3 - 0.3, Math.atan2(p1[1] - p0[1], p1[0] - p0[0]));
    }
    /* wheelhouse windows */
    hexa(THREE, g, T.glass, [[32.98, -1.8, z2 + 0.6], [33.04, -1.8, z2 + 0.6], [33.04, 1.8, z2 + 0.6], [32.98, 1.8, z2 + 0.6],
                              [32.98, -1.8, z2 + 1.15], [33.04, -1.8, z2 + 1.15], [33.04, 1.8, z2 + 1.15], [32.98, 1.8, z2 + 1.15]]);
    box(THREE, g, 0.06, 4.0, 0.55, T.glass, 34.23, 0, z1 + 1.4);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.3, 0.06, 0.55, T.glass, 32.3, s * 2.25, z2 + 0.85, -s * 0.5);
      for (i = 0; i < 4; i++) box(THREE, g, 0.5, 0.06, 0.45, T.glass, 23.5 + i * 2.6, s * 3.06, z1 + 1.3);
      for (i = 0; i < 4; i++) box(THREE, g, 0.32, 0.05, 0.32, T.dark, 20.0 + i * 3.4, s * (3.42 + i * 0.02), 3.8);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, 20.6, s * 3.43, 3.3);
      /* the 37 mm on the bridge wings, on the base house roof [G][E] */
      var w = new THREE.Group(); w.position.set(21.3, s * 2.2, z1); k70(THREE, w, T); w.rotation.z = s * 0.6; g.add(w);
      /* searchlights on the bridge wings */
      searchlight(THREE, g, T, 25.0, s * 3.7, z3 - 0.8);
    }
    /* the director pedestal and director [G][Q] */
    polyPrism(THREE, g, T.sup, [[27.6, -1.4], [30.6, -1.4], [31.2, -0.9], [31.2, 0.9], [30.6, 1.4], [27.6, 1.4]], z3 - 0.8, z3 + 0.9);
    director(THREE, g, T, 29.4, z3 + 0.9);
    roofRail(THREE, g, T, [[18.7, 3.3], [18.7, -3.3]], z1, 0.9);
    roofRail(THREE, g, T, [[22.1, 2.9], [22.1, -2.9]], z2, 0.9);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 17.4, s * 2.6, deckZ(17.4), 19.2, s * 2.6, z1, 0.05, 3);
      strut(THREE, g, T.metal, 20.3, s * 2.4, z1, 22.0, s * 2.4, z2, 0.05, 3);
    }

    /* --------------------------------------------------- foremast */
    /* pole foremast at the bridge's after end, raked a little aft, to
       22.4 m with two yards [G][R] */
    var fx = 20.6;
    cylZ(THREE, g, 0.55, 0.7, 2.4, 10, T.sup, fx, 0, z1 + 1.2);
    strut(THREE, g, T.metal, fx, 0, z1 + 2.4, fx - 0.9, 0, 22.4, 0.16, 6);
    box(THREE, g, 0.25, 6.0, 0.14, T.metal, fx - 0.45, 0, 14.5);
    box(THREE, g, 0.15, 3.6, 0.1, T.metal, fx - 0.65, 0, 18.4);
    box(THREE, g, 1.2, 1.2, 0.1, T.metal, fx - 0.4, 0, 13.0);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, fx - 0.45, s * 3.0, 14.5, fx - 0.45, s * 3.0, 13.4, 0.015, 3);
      strut(THREE, g, T.metal, fx - 0.85, 0, 21.5, 18.8, s * 3.3, z1, 0.015, 3);
    }

    /* ---------------------------------- funnel casing, funnel, searchlight */
    /* casing x 5-18.6 to 4.5 m [G]; the one large funnel [G][M][Q][R] */
    var zc = 4.5;
    polyPrism(THREE, g, T.sup, [[5.0, -3.0], [18.6, -3.0], [18.6, 3.0], [5.0, 3.0]], 2.1, zc);
    funnelS(THREE, g, T, 13.2, zc, 4.7, 2.0, 12.25, 4.05, 1.9, 12.2, 10.2);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) box(THREE, g, 0.9, 0.06, 1.6, T.dark, 7.0 + i * 4.2, s * 3.03, 3.2);
      cylX(THREE, g, 0.35, 0.35, 1.4, 10, T.sup, 17.5, s * 2.5, zc + 0.36);
    }
    roofRail(THREE, g, T, [[5.1, 2.9], [5.1, -2.9]], zc, 0.9);

    /* deckhouse x -1.8 to 5.0 to 5.5 m with the searchlight block x 4.2-
       7.6 to 7.9 m and the two 37 mm abreast it [G][E] */
    var zh = 5.5;
    polyPrism(THREE, g, T.sup, [[-1.8, -2.9], [5.0, -3.0], [5.0, 3.0], [-1.8, 2.9]], 2.1, zh);
    polyPrism(THREE, g, T.sup, [[4.2, -1.3], [7.6, -1.3], [7.6, 1.3], [4.2, 1.3]], zh - 0.2, 7.9);
    searchlight(THREE, g, T, 5.9, 0, 7.9);
    roofRail(THREE, g, T, [[4.3, 1.25], [7.5, 1.25], [7.5, -1.25], [4.3, -1.25], [4.3, 1.25]], 7.9, 0.8);
    for (s = -1; s <= 1; s += 2) {
      var a37 = new THREE.Group(); a37.position.set(2.6, s * 1.75, zh); k70(THREE, a37, T); a37.rotation.z = s * 1.2; g.add(a37);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, 1.0, s * 2.93, 3.2);
    }
    roofRail(THREE, g, T, [[4.2, 2.9], [-1.7, 2.8], [-1.7, -2.8], [4.2, -2.9]], zh, 0.9);

    /* forward tube mount, x -7.0 [G] */
    var ttA = new THREE.Group(); ttA.position.set(-7.0, 0, deckZ(-7)); tubes3(THREE, ttA, T); ttA.rotation.z = 0.12; g.add(ttA);

    /* -------------------------------------- after deckhouse and mainmast */
    /* x -19.4 to -11.4 to 5.85 m, the 76 mm abreast on its after part,
       the pole mainmast at its forward end [G][E][R] */
    var zm = 5.85;
    polyPrism(THREE, g, T.sup, [[-19.4, -2.4], [-18.4, -3.4], [-12.4, -3.4], [-11.4, -2.4], [-11.4, 2.4], [-12.4, 3.4], [-18.4, 3.4], [-19.4, 2.4]], 2.1, zm);
    for (s = -1; s <= 1; s += 2) {
      var g76 = new THREE.Group(); g76.position.set(-16.2, s * 1.75, zm); k34(THREE, g76, T); g76.rotation.z = PI - s * 0.5; g.add(g76);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, -13.0, s * 3.43, 3.2);
    }
    roofRail(THREE, g, T, [[-11.5, 2.3], [-12.4, 3.3], [-18.4, 3.3], [-19.3, 2.3], [-19.3, -2.3], [-18.4, -3.3], [-12.4, -3.3], [-11.5, -2.3], [-11.5, 2.3]], zm, 0.9);
    var mx = -12.2;
    strut(THREE, g, T.metal, mx, 0, zm, mx - 0.7, 0, 16.5, 0.14, 6);
    box(THREE, g, 0.2, 4.4, 0.12, T.metal, mx - 0.45, 0, 12.6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, mx - 0.65, 0, 15.6, -19.2, s * 2.4, zm, 0.015, 3);
    strut(THREE, g, T.metal, fx - 0.9, 0, 22.0, mx - 0.7, 0, 16.3, 0.012, 3);

    /* after tube mount, x -23.7 [G] */
    var ttB = new THREE.Group(); ttB.position.set(-23.9, 0, deckZ(-23.9)); tubes3(THREE, ttB, T); ttB.rotation.z = -0.12; g.add(ttB);

    /* ---------------------------------------------- after gun pair */
    /* rangefinder tower x -31.9 to -29.3 to 7.9 m [G] */
    polyPrism(THREE, g, T.sup, [[-31.9, -1.2], [-29.3, -1.2], [-29.3, 1.2], [-31.9, 1.2]], 2.1, 6.9);
    cylZ(THREE, g, 0.9, 0.95, 0.9, 12, T.sup, -30.6, 0, 7.35);
    cylY(THREE, g, 0.2, 0.2, 3.2, 8, T.sup, -30.6, 0, 7.5);
    for (s = -1; s <= 1; s += 2) cylY(THREE, g, 0.22, 0.22, 0.1, 8, T.glass, -30.6, s * 1.62, 7.5);
    /* X deckhouse x -38.8 to -31.9 to 6.0 m, X on it trained astern [G] */
    var zX = 6.0;
    polyPrism(THREE, g, T.sup, [[-38.8, -2.6], [-31.9, -2.8], [-31.9, 2.8], [-38.8, 2.6]], 2.1, zX);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.06, 1.8, T.dark, -33.4, s * 2.81, 3.2);
    roofRail(THREE, g, T, [[-32.0, 2.7], [-38.7, 2.5], [-38.7, -2.5], [-32.0, -2.7]], zX, 0.9);
    var mX = new THREE.Group(); mX.position.set(-35.4, 0, zX); mX.rotation.z = PI; b13(THREE, mX, T); g.add(mX);
    /* Y on the quarterdeck trained astern [G] */
    var mY = new THREE.Group(); mY.position.set(-41.8, 0, deckZ(-41.8)); mY.rotation.z = PI; b13(THREE, mY, T); g.add(mY);

    /* mine rails from abreast the after tubes to the stern, and the two
       depth-charge racks at the stern [G][E] */
    for (s = -1; s <= 1; s += 2) {
      for (var k = 0; k < 2; k++) {
        var ins = k ? 1.3 : 0.75, rx;
        for (rx = -20; rx > XS0 + 2.0; rx -= 6) {
          var rx1 = Math.max(XS0 + 1.6, rx - 6);
          strut(THREE, g, T.metal, rx, s * (halfB(rx) - ins), deckZ(rx) + 0.06, rx1, s * (halfB(rx1) - ins), deckZ(rx1) + 0.06, 0.05, 3);
        }
      }
      var rk = new THREE.Group(); rk.position.set(-53.2, s * 1.9, deckZ(-53.2)); g.add(rk);
      box(THREE, rk, 3.0, 0.9, 0.1, T.metal, 0, 0, 0.9);
      for (i = 0; i < 4; i++) cylY(THREE, rk, 0.3, 0.3, 0.6, 8, T.gun, 1.1 - i * 0.7, 0, 1.25);
      strut(THREE, rk, T.metal, 1.4, 0, 0, 1.4, 0, 0.9, 0.04, 3);
      strut(THREE, rk, T.metal, -1.4, 0, 0, -1.4, 0, 0.9, 0.04, 3);
    }

    /* forecastle: breakwater-less deck, windlass, capstans, bollards;
       jackstaff and ensign staff */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.4, 0.5, 0.5, 10, T.metal, 49.0, s * 0.95, deckZ(49) + 0.25);
      box(THREE, g, 2.6, 0.16, 0.07, T.gun, 50.3, s * 1.35, deckZ(50.3) + 0.04, -s * 0.3);
      for (i = 0; i < 4; i++) {
        var bxx = 41 - i * 25;
        cylZ(THREE, g, 0.15, 0.15, 0.4, 6, T.metal, bxx, s * (halfB(bxx) - 0.5), deckZ(bxx) + 0.2);
        cylZ(THREE, g, 0.15, 0.15, 0.4, 6, T.metal, bxx - 0.55, s * (halfB(bxx) - 0.5), deckZ(bxx) + 0.2);
      }
    }
    box(THREE, g, 1.2, 1.0, 0.5, T.metal, 47.4, 0, deckZ(47.4) + 0.25);
    strut(THREE, g, T.metal, 55.9, 0, deckZ(55.9), 55.9, 0, deckZ(55.9) + 2.6, 0.05, 4);
    strut(THREE, g, T.metal, XS0 + 0.5, 0, deckZ(XS0), XS0 + 0.5, 0, deckZ(XS0) + 3.6, 0.06, 4);
    /* mushroom vents */
    var vs = [[46.0, 1.8], [46.0, -1.8], [33.0, 3.9], [33.0, -3.9], [-9.5, 3.8], [-9.5, -3.8],
              [-27.0, 3.6], [-27.0, -3.6], [-46.5, 3.2], [-46.5, -3.2]];
    for (i = 0; i < vs.length; i++) {
      var vx = vs[i][0], vz = deckZ(vx);
      cylZ(THREE, g, 0.18, 0.18, 0.65, 8, T.sup, vx, vs[i][1], vz + 0.32);
      cylZ(THREE, g, 0.36, 0.18, 0.28, 8, T.sup, vx, vs[i][1], vz + 0.75);
    }

    /* underwater: shafts on brackets, three-blade 3.18 m screws [S], one
       rudder */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.2, 0.2, 18.0, 8, T.metal, -40.0, s * 2.3, -2.9);
      strut(THREE, g, T.under, -47.0, s * 2.3, -2.9, -47.0, s * 1.2, -1.5, 0.12, 4);
      cylX(THREE, g, 0.3, 0.4, 0.7, 8, T.metal, -49.3, s * 2.3, -2.9);
      for (i = 0; i < 3; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 1.4), T.metal);
        bl.position.set(-49.3, s * 2.3, -2.9); bl.rotation.x = i * 2 * PI / 3 + 0.3;
        bl.translateZ(0.85); bl.rotation.y = 0.45; g.add(bl);
      }
    }
    box(THREE, g, 2.6, 0.28, 2.8, T.metal, -52.6, 0, -1.3);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 26.0, 0.08, 0.5, T.under, -2.0, s * (W(-2, -3.1) + 0.18), -3.15);

    /* rails along the deck edges: the main deck and the forecastle */
    railRun(THREE, g, T, XS0 + 0.6, 31.0, 4.4, 1.0);
    railRun(THREE, g, T, 35.0, 55.6, 3.6, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.6, 0.8, 0.04, T.team, 40.0, 0, zB + 0.02);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, 0.8, 0, zh + 0.02);
    box(THREE, g, 2.4, 0.9, 0.04, T.team, -37.8, 0, zX + 0.02);

    /* the trained mount: A, the forward-most 130 mm [G][M][Q] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(44.0, 0, deckZ(44.0));
    var tb = new THREE.Group(); b13(THREE, tb, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tbk = bake(THREE, tb);
    tbk.children.slice().forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  return { build: build };
})();

/* Registration: len is the true overall length, 112.8 m [E][S]. */
UNIT_MODELS["pla_e50_destroyer"] = {
  len: 112.8,
  build: function (THREE, M, C) { return HeroAnshan.build(THREE, M, C); }
};
