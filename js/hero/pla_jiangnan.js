/* ==================== js/hero/pla_jiangnan.js ==========================
   HERO MODEL -- Type 065 (NATO "Jiangnan") frigate, 1966: five ships
   designed by the No. 701 Institute (Wuhan) from the Riga-derived Type
   6601, lead ship Haikou (529) laid down at Huangpu August 1964, in
   service August 1966 [W].  Gun-armed only: three single 100 mm, twin
   37 mm, ASW rocket launchers and depth charges.  NO missiles, no
   torpedo tubes ("little space for any torpedo tubes or missile
   launchers" [E]).  Key: pla_e60_corvette.

   WHAT THIS MODEL RESTS ON.  One photograph, [P] (Haikou, starboard bow
   quarter, underway, 960 px), is the measuring sheet; no line drawing of
   the class was found.  Stations along the hull are read off it with a
   one-point perspective correction: stem head px 82 to stern px 915 =
   91.5 m, the image scale at the stern taken as 1/1.8 of that at the bow
   (from the rail heights and the freeboards at the two ends; ratios 1.6
   and 2.0 move the amidships stations by about 2.5 m, so stations are
   good to about +-2.5 m).  Heights use 14 px/m at the bow, falling with
   the same ratio, and are good to about +-15 %.  The hull lines below
   the deck edge, the 37 mm and thrower builders and the funnel builder
   are the Riga's [K]; each borrowing is marked [K].

   GUN LAYOUT -- CORRECTED AGAINST THE TASK BRIEF.  The brief asked for
   "two forward, one aft".  Every source reached says the reverse:
   "Main guns were mounted one forward and two aft, instead of two
   forward and one aft on the Riga class" [W]; "two of the 100 mm
   turrets were relocated to the rear, only one was kept on the forward
   deck" [E]; "three single 100mm guns, two of which were mounted at
   the stern" (War Thunder forum excerpt); GlobalSecurity [G] reports a
   front-2/rear-1 plan was discussed but the ships were built front-1,
   rear-2.  Drawn ONE FORWARD, TWO AFT.

   DIMENSIONS: length 91.5 m (the brief's figure; [G]/[E] excerpts give
   "about 90 to 92 m"; js/warship_specs.js 90.9 m; the Riga 91 m [W]);
   beam 10.2 m ([G]/[E] excerpts, as the Riga; the brief says about
   10.1 m); draught about 2.9-3.0 m ([G] excerpt 2.92-3 m); displacement
   1,350 long tons ([E]), [G] 1,146 t standard / 1,249.5 t full load.

   REFERENCES
     [W] en.wikipedia "Type 053 frigate" (fetched earlier into this
         session's scratchpad; Type 065 under "Versions" and "Replicating
         the Riga and the Type 065"): based on the Riga hull "with the
         flush deck replaced by a long forecastle" to take a large medium
         -speed civilian diesel plant; guns one forward and two aft; five
         ships; dates as above.  en.wikipedia "Riga-class frigate": "5
         ships with a different gun arrangement ... reverse-engineered
         copies from type 6601".
     [E] naval-encyclopedia.com "Jiangnan Type 065 class frigates" (search
         excerpts only): 3 x 100 mm DP, 8 x 37 mm (4 x 2), 4 x 14.5 mm
         (2 x 2), ASW rocket launchers, depth charges; one 100 mm forward,
         two aft; "a 37 mm AA mount" just behind the forward gun; "two
         others were located on the wings of the new superstructure"
         (originally single 37 mm, later twins); [E2] the after turret
         "only on a slight superfiring position ... the gap in height was
         only 1.50 m"; the after 100 mm "behind a 37 mm AA mount"; [E3] a
         listing "2 ... ASW RL, 4 DCT, 2 DC rails".
     [G] globalsecurity.org "Type 065 Jiangnan" pages (search excerpts
         only): two 250 mm five-tube ASW rocket launchers, four depth
         -charge throwers; two diesels of about 6,600 hp; [G2] the single
         funnel near the centre "roughly where" the Riga's was; "the main
         mast was a lighter tripod" carrying smaller electronics.
     [K] js/hero/ru_riga.js (HeroRiga, Project 50, measured off the
         Navypedia standard-scale drawing): the half-breadths and
         underwater body, the 37 mm (V-11M) and depth-charge thrower
         builders, the funnel and boat builders, the lattice-mast builder,
         and the stations of the throwers, racks, shafts and rudders.
     [P] Commons "Type 65 frigate PLANS Haikou (209).jpg" (Haikou, hull
         209, starboard bow quarter, underway; monochrome).  Read off it
         (model x, + forward; z above the waterline):
           stem head 7.05 (6.5-7.6); forecastle deck 5.7-6.4 forward, 5.4
             amidships, 4.8 at -10, 4.6 at the break, which falls between
             the X and Y guns (x about -24.5); quarterdeck about 3;
           A gun: flat-sided enclosed shield x 25.4-28.7, top about 8.7;
           01 house from x 24.5 aft to -12.9, an open railed platform on
             its fore end, a 37 mm twin on it at x 20 with raised barrels;
           bridge front x 18.3, wheelhouse roof about 11.3, a rangefinder
             drum on it at x 10.3 (top about 13.4); two round life-float
             canisters on the house side under the mast;
           foremast a four-legged LATTICE at x 4.6, platform about 19.7,
             yard about 16.5, a small box antenna, pole to about 25;
           ONE funnel close abaft the mast, x 2.4 to -3.6, nearly upright,
             with a wide flared cap, top about 12.2;
           after deckhouse to x -12.9 with a pole mast at -6.8 (about 16
             m) and a boat on chocks with davits beside it, x -2.7 to -9.4;
           X gun x -15.4 to -21.3 (top about 8.8), a slatted multi-tube
             launcher raised and trained aft abaft it at about -23.7, Y gun
             x -24.8 to -29.0 (top about 6.7), quarterdeck gear to the
             stern, ensign staff.

   RECOGNITION LIST (where each shows):
     1. Riga-type hull with a LONG FORECASTLE ending between the after
        guns, a short low quarterdeck [W][P] - STA, XB.
     2. ONE single 100 mm in a flat-sided enclosed shield on the forecastle
        (the "turret") [W][E][P] - g100().
     3. TWO single 100 mm aft, trained aft: X on the after end of the
        forecastle, Y on the quarterdeck lower down [W][E2][P] - g100().
     4. A long 01 house from the A gun to the after deckhouse, a 37 mm
        twin on its fore end [E][P] - v11().
     5. The bridge with its wheelhouse and a rangefinder drum on top [P].
     6. A four-legged lattice foremast with a pole topmast [P].
     7. One squat funnel with a wide flared cap close abaft the mast [P].
     8. A pole mast and a boat with davits at the after deckhouse [P].
     9. An ASW rocket launcher abaft the X gun [G][P] - asw5().
    10. Depth-charge throwers and racks on the quarterdeck [G][E3][P].
    11. Paint: one mid-grey for hull and houses [P] (monochrome); the
        Luda's PLAN grey is used.
   NOT CONFIRMED (estimated, borrowed or not drawn):
     - The perspective correction itself (see above): stations +-2.5 m,
       heights +-15 %.
     - ALL WIDTHS across the ship (houses, mounts, funnel): [P] is nearly
       broadside; the 01 house is drawn 7.2 m wide, the bridge 6.0 m.
     - The hull below the deck edge, draught and stern shape are the
       Riga's [K] stretched to 91.5 m; the quarterdeck height is the
       Riga's (2.8-2.9 m; [P] reads 2.3-3.5).
     - [G2] calls the main mast "a lighter tripod"; [P] shows a lattice
       foremast, which is drawn.  The radar and the rangefinder types are
       not identified; both are generic shapes.
     - The 100 mm shield's width (2.6 m) and the barrel (the Riga's 5.6 m
       L/56 [K]).  [P] settles the shield's side shape only.
     - The 37 mm twins are the Riga's V-11M [K].  The two "wing" twins of
       [E] are not resolved in [P] and are placed abreast the bridge front
       at x 15.5 as a guess; the after twin (on the after deckhouse roof,
       x -11) is placed from [E2]'s "behind a 37 mm AA mount", as [P]
       shows only unresolved gear there.
     - ASW launchers: [P] shows ONE (starboard) abaft the X gun; the
       port one is assumed, and the five-barrel shape follows [G]'s
       "five-tube".  The throwers (Riga BMB-2 [K]) and racks are at the
       Riga's stations; [P] shows only clutter there.
     - The boat on the port side (only starboard is seen).
     - NOT DRAWN: the 4 x 14.5 mm (2 x 2) of [E] (no position known),
       mine rails, sonar.
     - The colour.
   No hull numbers, names or flags.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The row
   has turret:true and its first weapon is "3 x 100mm": the forward 100 mm
   is the group named "turret"; everything else is baked, one mesh per
   material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJiangnan = (function () {
  "use strict";
  var PI = Math.PI;
  /* transom, stem head, stem and transom at the waterline: the Riga's [K]
     stations stretched from 91.0 m to the 91.5 m overall used here */
  var XS0 = -45.75, XS1 = 45.75, XWL = 41.7, XST = -44.1;
  /* the forecastle break: the long forecastle [W] ends here and the
     quarterdeck steps down, between the X and Y guns [P] */
  var XB = -24.5;

  /* HULL SECTION TABLE.  Half-breadths, waterline breadths, bottom and
     bilge are the Riga's [K] (the Type 065 is "based on the Riga class
     hull" [W]) stretched to 91.5 m; the deck at the side is read off [P]
     (forecastle 6.4-5.7 m forward, 5.4 amidships, 4.8 at -10, 4.6 at the
     break; quarterdeck 3.5 m falling to about 2.3 at the stern, taken as
     the Riga's 2.8-2.9) and the stem head off [P] (6.5-7.6 m, drawn 7.05).
     x, deck z at the side, half beam at the deck edge, half beam at the
     waterline, bottom z on the centreline, bilge fullness */
  var STA = [
    [-45.75, 2.78, 3.55, 3.05,  0.90, 3.0],
    [-44.10, 2.79, 4.05, 3.65, -0.40, 3.0],
    [-41.20, 2.81, 4.50, 4.15, -1.35, 2.8],
    [-35.20, 2.85, 4.92, 4.58, -2.35, 2.6],
    [-24.60, 2.92, 5.08, 4.77, -2.84, 2.8],
    [-24.50, 4.60, 5.08, 4.77, -2.84, 2.8],
    [-12.10, 4.85, 5.10, 4.80, -2.90, 3.0],
    [  0.00, 5.15, 5.10, 4.80, -2.90, 3.0],
    [  8.00, 5.30, 5.05, 4.72, -2.90, 2.9],
    [ 16.10, 5.50, 4.86, 4.45, -2.86, 2.6],
    [ 22.10, 5.70, 4.56, 4.00, -2.76, 2.3],
    [ 28.20, 5.95, 4.06, 3.28, -2.56, 2.0],
    [ 33.20, 6.20, 3.42, 2.42, -2.26, 1.8],
    [ 37.20, 6.50, 2.72, 1.58, -1.80, 1.6],
    [ 41.70, 6.80, 1.62, 0.00,  0.00, 1.3],
    [ 43.70, 6.92, 0.88, 0.00,  0.00, 1.2],
    [ 45.75, 7.05, 0.12, 0.00,  0.00, 1.2]
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
  /* the raked stem and the small transom overhang (the Riga's [K]) */
  function zBot(x) {
    if (x > XWL) return deckZ(XS1) * (x - XWL) / (XS1 - XWL);
    if (x < XST) return -0.4 + 1.3 * (XST - x) / (XST - XS0);
    return pick(x, 4);
  }
  /* half breadth at height z: flared above the waterline, a super-ellipse
     bilge below; the flare is taken to the Riga's deck height (3.2 m) and
     the forecastle side is carried up plumb from there */
  function W(x, z) {
    var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
    if (x < XST) {
      var f = (XST - x) / (XST - XS0);
      return bd * Math.pow((z - zb) / (zd - zb), 0.2 + 0.3 * f);
    }
    var zf = Math.min(zd, 3.2 + Math.max(0, x - 8) * 0.12);
    if (z >= zf) return bd;
    if (z >= 0) return bw + (bd - bw) * Math.pow(z / zf, 1.5);
    var n = pick(x, 5), t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  /* superstructure levels read off [P]: the 01 house roof, the 02 (bridge
     deck) roof, the wheelhouse roof */
  var R01 = 7.6, R02 = 9.5, R03 = 11.3;

  /* ---------------------------------------------------------- textures */
  var TEX = {};
  /* paint: the Luda's PLAN grey (js/hero/pla_luda.js PAINT); [P] is a
     monochrome print, so the colour is NOT CONFIRMED; it shows a mid-tone
     hull and houses of one shade, which this grey matches */
  var PAINT = { hull: 0x8a959c, sup: 0x95a0a6, deck: 0x4d5459, soot: 0x26292c };
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
    return canvasTex(THREE, "hull065", 512, 256, function (g, w, h) {
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
    return canvasTex(THREE, "plate065", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "deck065", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "grille065", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

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
  /* the transom face above the small overhang (the Riga's [K]) */
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
  /* twin 37 mm at rest pointing +X.  BORROWED: the Riga's V-11M (the
     Chinese twin 37 mm is a V-11 copy, js/eras.js aagun_pla57 names the
     Type 76; its shape here is NOT CONFIRMED): pedestal, cradle, the open-backed
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
  /* depth-charge thrower, BORROWED from the Riga's BMB-2: a short mortar on a pedestal with a tray */
  function bmb2(THREE, g, T, s) {
    cylZ(THREE, g, 0.3, 0.38, 0.35, 8, T.metal, 0, 0, 0.17);
    var m = new THREE.Group(); m.position.set(0, 0, 0.35); m.rotation.x = -s * 0.75;
    cylZ(THREE, m, 0.2, 0.2, 1.0, 10, T.gun, 0, 0, 0.5);
    cylZ(THREE, m, 0.28, 0.28, 0.28, 10, T.metal, 0, 0, 1.05);
    g.add(m);
    box(THREE, g, 1.4, 0.6, 0.08, T.metal, -0.5, -s * 0.5, 0.5);
    return g;
  }
  /* funnel: an oval casing raked aft, the top falling aft, a black cap and
     a grille (the Riga's funnel builder; the Type 065 funnel's
     shape is NOT CONFIRMED) */
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

  /* ASW rocket launcher: [G] gives "two 250-mm five-tube" launchers; [P]
     shows a slatted multi-tube launcher raised and trained aft abaft the X
     gun.  Drawn as five barrels side by side on a trainer pointing +X
     (the group is turned aft); barrel count from [G], shape NOT CONFIRMED */
  function asw5(THREE, g, T) {
    var i;
    cylZ(THREE, g, 0.45, 0.55, 0.5, 10, T.sup, 0, 0, 0.25);
    box(THREE, g, 0.9, 1.5, 0.45, T.sup, -0.1, 0, 0.72);
    var cl = new THREE.Group(); cl.position.set(0.1, 0, 1.05); cl.rotation.y = -0.4;
    for (i = 0; i < 5; i++) cylX(THREE, cl, 0.14, 0.14, 1.6, 8, T.gun, 0, -0.6 + i * 0.3, 0, true);
    box(THREE, cl, 0.22, 1.65, 0.36, T.sup, -0.65, 0, 0);
    box(THREE, cl, 0.18, 1.65, 0.36, T.metal, 0.5, 0, 0);
    g.add(cl);
    return g;
  }
  /* 100 mm single mount at rest pointing +X, as [P] shows all three: a
     FLAT-SIDED enclosed shield, tall and square at the back, the roof
     sloping down to a raked face, one barrel.  [P] reads the A gun's shield
     about 3.3 m long (x 25.4-28.7) and 2.3 m tall over its base ring; the
     width (2.6 m) and the 5.6 m barrel (the Riga's L/56 [K]) are NOT
     CONFIRMED */
  function g100(THREE, g, T) {
    cylZ(THREE, g, 1.4, 1.5, 0.3, 18, T.sup, -0.2, 0, 0.15);
    hexa(THREE, g, T.sup, [[-1.75, -1.3, 0.3], [1.35, -1.3, 0.3], [1.35, 1.3, 0.3], [-1.75, 1.3, 0.3],
                           [-1.75, -1.3, 2.55], [0.55, -1.3, 2.3], [0.55, 1.3, 2.3], [-1.75, 1.3, 2.55]]);
    hexa(THREE, g, T.sup, [[1.35, -1.3, 0.3], [1.6, -1.1, 0.3], [1.6, 1.1, 0.3], [1.35, 1.3, 0.3],
                           [0.55, -1.3, 2.3], [0.62, -1.1, 2.25], [0.62, 1.1, 2.25], [0.55, 1.3, 2.3]]);
    box(THREE, g, 0.6, 0.4, 0.22, T.sup, -0.6, 0.75, 2.6);
    box(THREE, g, 0.08, 0.8, 1.4, T.dark, -1.78, 0, 1.3);
    box(THREE, g, 0.3, 0.45, 0.9, T.dark, 1.42, 0, 1.25);
    var bar = new THREE.Group(); bar.position.set(1.3, 0, 1.3); bar.rotation.y = -0.08;
    cylX(THREE, bar, 0.2, 0.24, 0.8, 10, T.gun, 0.4, 0, 0);
    cylX(THREE, bar, 0.085, 0.11, 4.9, 8, T.gun, 3.2, 0, 0, true);
    cylX(THREE, bar, 0.12, 0.12, 0.25, 8, T.gun, 5.6, 0, 0);
    g.add(bar);
    return g;
  }
  /* rangefinder / director on the wheelhouse roof [P]: a drum with two
     arms (type NOT CONFIRMED) */
  function rangefinder(THREE, g, T, x, z) {
    cylZ(THREE, g, 0.9, 1.0, 1.0, 16, T.sup, x, 0, z + 0.5);
    box(THREE, g, 1.0, 1.4, 0.7, T.sup, x, 0, z + 1.35);
    cylY(THREE, g, 0.22, 4.0, 10, T.sup, x - 0.1, 0, z + 1.4);
    for (var s = -1; s <= 1; s += 2) box(THREE, g, 0.3, 0.12, 0.3, T.dark, x + 0.05, s * 2.02, z + 1.4);
  }
  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x, z;

    /* hull shell in three bands, transom, weather decks [W][K] */
    g.add(shellBand(THREE, T.under, -4, -0.35, 5));
    g.add(shellBand(THREE, T.boot, -0.35, 0.5, 1));
    g.add(shellBand(THREE, T.hull, 0.5, 8, 7));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    /* the forecastle break: a plated bulkhead across the ship at XB [W] */
    var zq = deckZ(XB - 0.2), zf = deckZ(XB + 0.1), wb = halfB(XB);
    box(THREE, g, 0.12, 2 * wb - 0.02, zf - zq + 0.02, T.hull, XB - 0.02, 0, (zf + zq) / 2);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.07, 0.9, 1.7, T.dark, XB - 0.09, s * 2.6, zq + 0.85);

    /* scuttles along the sides, the anchors and hawses (standard fittings;
       positions estimated) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 26; i++) {
        x = -38 + i * 3.0;
        if (x > 37) break;
        z = x > XB + 0.5 ? deckZ(x) - 1.2 : deckZ(x) - 0.9;
        box(THREE, g, 0.3, 0.08, 0.3, T.dark, x, s * (W(x, z) + 0.01), z);
      }
      var ax = 39.4, az = deckZ(ax) - 0.9, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 1.5, 0.12, 1.2, T.dark, ax, ay, az, -s * 0.2);
      box(THREE, g, 1.0, 0.18, 0.9, T.gun, ax + 0.1, ay + s * 0.05, az - 0.15, -s * 0.2);
    }

    /* ---- the 01 house [P]: from just abaft the A gun (x 24.5) to the
       after end of the after deckhouse (x -12.9), roof about 7.6 m; an open
       railed platform on its fore end.  Its width is NOT CONFIRMED */
    var Y01 = 3.6;
    polyPrism(THREE, g, T.sup, [[-12.9, -Y01], [14.0, -Y01], [22.0, -2.7], [24.5, -1.9], [24.5, 1.9], [22.0, 2.7], [14.0, Y01], [-12.9, Y01]],
              deckZ(-12.9) - 0.2, R01);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 12; i++) box(THREE, g, 0.45, 0.06, 0.45, T.dark, -11.4 + i * 2.2, s * (Y01 + 0.02), R01 - 1.1);
      box(THREE, g, 0.9, 0.06, 1.7, T.dark, -6.0, s * (Y01 + 0.02), deckZ(-6.0) + 0.85);
    }
    roofRail(THREE, g, T, [[18.4, 3.2], [22.0, 2.6], [24.4, 1.8], [24.4, -1.8], [22.0, -2.6], [18.4, -3.2]], R01, 1.0);
    roofRail(THREE, g, T, [[-12.8, Y01 - 0.1], [-12.8, -Y01 + 0.1]], R01, 0.9);

    /* ---- the 37 mm twin "just behind the forward gun" [E], seen in [P]
       on the fore end of the 01 house, barrels raised, x 20.3 */
    cylZ(THREE, g, 1.25, 1.3, 0.3, 16, T.sup, 20.3, 0, R01 + 0.15);
    var t1 = new THREE.Group(); t1.position.set(20.3, 0, R01 + 0.3); v11(THREE, t1, T); g.add(t1);

    /* ---- the bridge [P]: the 02 block x 3.8 to 18.3 (roof 9.5), the
       wheelhouse x 8.5 to 17.6 (roof 11.3, its face glazed), the
       rangefinder drum on its roof at x 10.3 (top about 13.4) */
    polyPrism(THREE, g, T.sup, [[3.8, -3.0], [17.0, -3.0], [18.3, -2.2], [18.3, 2.2], [17.0, 3.0], [3.8, 3.0]], R01 - 0.05, R02);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 5; i++)
      box(THREE, g, 0.5, 0.06, 0.5, T.dark, 5.4 + i * 2.6, s * 3.02, R02 - 0.9);
    polyPrism(THREE, g, T.sup, [[8.5, -2.6], [16.6, -2.6], [17.6, -1.8], [17.6, 1.8], [16.6, 2.6], [8.5, 2.6]], R02 - 0.05, R03);
    hexa(THREE, g, T.glass, [[17.59, -1.7, R03 - 1.2], [17.65, -1.7, R03 - 1.2], [17.65, 1.7, R03 - 1.2], [17.59, 1.7, R03 - 1.2],
                             [17.54, -1.7, R03 - 0.35], [17.6, -1.7, R03 - 0.35], [17.6, 1.7, R03 - 0.35], [17.54, 1.7, R03 - 0.35]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.3, 0.08, 0.7, T.glass, 17.1, s * 2.2, R03 - 0.75, s * 0.68);
      box(THREE, g, 6.0, 0.08, 0.65, T.glass, 12.6, s * 2.62, R03 - 0.75);
    }
    roofRail(THREE, g, T, [[3.9, 2.9], [8.3, 2.9]], R02, 0.9);
    roofRail(THREE, g, T, [[3.9, -2.9], [8.3, -2.9]], R02, 0.9);
    roofRail(THREE, g, T, [[3.9, 2.9], [3.9, -2.9]], R02, 0.9);
    box(THREE, g, 8.6, 5.1, 0.1, T.metal, 13.0, 0, R03 + 0.05);
    roofRail(THREE, g, T, [[8.6, 2.5], [16.6, 2.5], [17.5, 1.75], [17.5, -1.75], [16.6, -2.5], [8.6, -2.5]], R03, 0.9);
    rangefinder(THREE, g, T, 10.3, R03);
    /* two round life-float canisters on the house side under the mast [P] */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      var lf = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.3, 14), T.sup);
      lf.position.set(5.6 - i * 1.7, s * (Y01 + 0.18), R01 - 1.0); g.add(lf);
    }

    /* ---- the "two others" 37 mm twins "on the wings of the new
       superstructure" [E]: not resolved in [P]; drawn abreast on the 01
       roof beside the bridge front, x 15.5 (station ESTIMATED) */
    for (s = -1; s <= 1; s += 2) {
      var w = new THREE.Group(); w.position.set(15.5, s * 2.75, R01); w.scale.set(0.85, 0.85, 0.85); v11(THREE, w, T); g.add(w);
    }

    /* ---- the foremast is a four-legged LATTICE [P] (not the tripod of
       [G2]): legs from the 02 roof at x 2.9-6.3, tapering to a platform at
       about 19.7 m at x 4.6, a yard at about 16.5 m, a small antenna box on
       the fore side, a pole topmast to about 25 m */
    latticeMast(THREE, g, T, 2.9, 6.3, 1.5, R02, 4.0, 5.2, 0.55, 19.7);
    box(THREE, g, 1.8, 1.6, 0.1, T.metal, 4.6, 0, 19.75);
    roofRail(THREE, g, T, [[3.8, 0.75], [5.4, 0.75], [5.4, -0.75], [3.8, -0.75], [3.8, 0.75]], 19.75, 0.6);
    box(THREE, g, 0.12, 6.0, 0.12, T.metal, 4.8, 0, 16.5);
    box(THREE, g, 0.1, 3.0, 0.1, T.metal, 4.6, 0, 22.4);
    strut(THREE, g, T.metal, 4.6, 0, 19.75, 4.6, 0, 25.0, 0.07, 6);
    box(THREE, g, 0.9, 1.2, 0.7, T.metal, 6.0, 0, 18.4);
    cylZ(THREE, g, 0.2, 0.25, 0.6, 8, T.metal, 4.6, 0, 20.1);
    box(THREE, g, 0.45, 2.6, 0.45, T.metal, 4.6, 0, 20.65);

    /* ---- the single funnel close abaft the mast [P][G2]: x 2.4 to -3.6,
       nearly upright, a wide flared cap overhanging fore and aft, top about
       12.2 m */
    funnel(THREE, g, T, -0.6, 5.2, 3.3, R01 - 0.05, 11.7, 11.6, 0.04);
    var cap = [], j;
    for (j = 0; j < 20; j++) {
      var ct = j / 20 * PI * 2;
      cap.push([-0.95 + 3.3 * Math.cos(ct), 2.0 * Math.sin(ct)]);
    }
    polyPrism(THREE, g, T.soot, cap, 11.75, 12.2);

    /* ---- the after deckhouse x -2.7 to -12.9 (part of the 01 house) with
       a pole mast at x -6.8 to about 16 m [P] */
    strut(THREE, g, T.metal, -6.8, 0, R01, -6.8, 0, 16.2, 0.09, 6);
    box(THREE, g, 0.1, 2.6, 0.1, T.metal, -6.8, 0, 14.6);
    box(THREE, g, 0.7, 0.7, 0.9, T.sup, -6.5, 0, 12.6);

    /* ---- a boat on chocks with davits at the deck edge abreast the after
       deckhouse, x -2.7 to -9.4 [P] (starboard seen; port assumed) */
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T, -6.0, s * 4.3, deckZ(-6.0) + 0.6, 6.4, 1.8);
      for (i = 0; i < 2; i++) {
        var dx = -8.6 + i * 5.2;
        strut(THREE, g, T.metal, dx, s * 3.7, deckZ(dx), dx, s * 3.8, R01 + 0.6, 0.08, 5);
        strut(THREE, g, T.metal, dx, s * 3.8, R01 + 0.6, dx, s * 4.4, R01 + 0.9, 0.07, 5);
      }
    }

    /* ---- the after 37 mm twin on the after deckhouse roof, trained aft
       ("behind a 37 mm AA mount" [E2]; [P] shows gear on this roof that it
       does not resolve; station ESTIMATED) */
    cylZ(THREE, g, 1.2, 1.25, 0.3, 16, T.sup, -11.0, 0, R01 + 0.15);
    var t4 = new THREE.Group(); t4.position.set(-11.0, 0, R01 + 0.3); v11(THREE, t4, T); t4.rotation.z = PI; g.add(t4);
    var zh = R01;

    /* ---- the two after 100 mm, trained aft [W][E][P]: X on the after end
       of the forecastle (x -18.3, shield top about 8.8 m), Y on the
       quarterdeck abaft the break (x -26.9, top about 6.7 m) - "only a
       slight superfiring position" [E2] */
    var xX = -18.3, xY = -26.9;
    cylZ(THREE, g, 1.5, 1.65, 0.5, 18, T.sup, xX, 0, deckZ(xX) + 0.15);
    var gx = new THREE.Group(); gx.position.set(xX, 0, deckZ(xX) + 0.4); gx.rotation.z = PI; g100(THREE, gx, T); g.add(gx);
    var zY = deckZ(xY) + 0.3;
    cylZ(THREE, g, 1.5, 1.65, 0.4, 18, T.sup, xY, 0, deckZ(xY) + 0.1);
    var gy = new THREE.Group(); gy.position.set(xY, 0, zY); gy.rotation.z = PI; g100(THREE, gy, T); g.add(gy);

    /* ---- the two ASW rocket launchers [G]: [P] shows one, starboard,
       between the X gun and the break, raised and trained aft (port one
       assumed) */
    for (s = -1; s <= 1; s += 2) {
      var ra = new THREE.Group(); ra.position.set(-22.6, s * 3.2, deckZ(-22.6)); ra.rotation.z = PI; asw5(THREE, ra, T); g.add(ra);
    }

    /* ---- quarterdeck: four depth-charge throwers [G] abreast, two stern
       racks [E3]; stations are the Riga's [K] (NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) {
      [-38.8, -36.2].forEach(function (bx) {
        var t = new THREE.Group(); t.position.set(bx, s * 3.7, deckZ(bx)); bmb2(THREE, t, T, s); g.add(t);
        box(THREE, g, 1.2, 0.7, 0.6, T.metal, bx + 0.2, s * 2.7, deckZ(bx) + 0.3);
      });
      var ry = s * 2.0, r0 = -45.1, r1 = -40.4;
      box(THREE, g, r1 - r0, 0.12, 0.1, T.metal, (r0 + r1) / 2, ry - 0.45, deckZ(r1) + 0.55);
      box(THREE, g, r1 - r0, 0.12, 0.1, T.metal, (r0 + r1) / 2, ry + 0.45, deckZ(r1) + 0.55);
      for (i = 0; i < 4; i++) strut(THREE, g, T.metal, r0 + i * 1.5, ry - 0.45, deckZ(r0), r0 + i * 1.5, ry - 0.45, deckZ(r0) + 0.55, 0.04, 4);
      for (i = 0; i < 4; i++) strut(THREE, g, T.metal, r0 + i * 1.5, ry + 0.45, deckZ(r0), r0 + i * 1.5, ry + 0.45, deckZ(r0) + 0.55, 0.04, 4);
      for (i = 0; i < 6; i++) cylY(THREE, g, 0.24, 0.62, 10, T.gun, r0 + 0.5 + i * 0.75, ry, deckZ(r0) + 0.85);
    }

    /* ---- forecastle ground tackle, bollards, jackstaff and ensign staff
       (standard fittings) */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.42, 0.48, 0.5, 10, T.metal, 35.8, s * 0.9, deckZ(35.8) + 0.25);
      box(THREE, g, 4.0, 0.16, 0.07, T.gun, 37.8, s * 1.25, deckZ(37.8) + 0.04, -s * 0.18);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, 31.2, s * 2.9, deckZ(31.2) + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, -42.7, s * 3.6, deckZ(-42.7) + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, -25.0, s * 4.4, deckZ(-25.0) + 0.22);
    }
    box(THREE, g, 1.1, 0.9, 0.5, T.metal, 34.6, 0, deckZ(34.6) + 0.25);
    strut(THREE, g, T.metal, 45.2, 0, deckZ(45.2), 45.2, 0, deckZ(45.2) + 2.6, 0.045, 4);
    strut(THREE, g, T.metal, -45.4, 0, deckZ(-45.4), -45.4, 0, deckZ(-45.4) + 3.6, 0.05, 4);

    /* ---- underwater gear: two shafts on A-brackets, screws, two rudders
       (two diesels, two shafts [G]; the Riga's layout [K]) */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.18, 0.18, 9.0, 8, T.metal, -35.7, s * 2.2, -2.4);
      strut(THREE, g, T.metal, -39.2, s * 2.2, -2.4, -39.2, s * 2.9, -1.0, 0.11, 4);
      strut(THREE, g, T.metal, -39.2, s * 2.2, -2.4, -39.2, s * 1.4, -1.2, 0.11, 4);
      cylX(THREE, g, 0.26, 0.38, 0.7, 8, T.metal, -40.8, s * 2.2, -2.4);
      for (i = 0; i < 3; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 1.1), T.metal);
        bl.position.set(-40.8, s * 2.2, -2.4); bl.rotation.x = i * 2 * PI / 3 + 0.3;
        bl.translateZ(0.7); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 1.8, 0.18, 2.0, T.metal, -42.8, s * 1.6, -1.25);
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 26.0, 0.07, 0.45, T.under, -4.0, s * (W(-4, -2.4) + 0.12), -2.45);

    /* ---- rails along the deck edges, forecastle and quarterdeck apart */
    railRun(THREE, g, T, -45.2, XB - 0.3, 3.0, 1.0);
    railRun(THREE, g, T, XB + 0.2, -13.3, 2.9, 1.0);
    railRun(THREE, g, T, 14.2, 44.8, 2.9, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.2, 0.9, 0.04, T.team, 14.0, 0, R03 + 0.12);
    box(THREE, g, 1.6, 0.8, 0.04, T.team, -8.6, 0, zh + 0.02);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, 22.0, 0, R01 + 0.02);

    /* trained mount: the forward 100 mm, the only gun forward [W][E][P],
       its shield x 25.4-28.7 in [P] */
    var xA = 27.0;
    cylZ(THREE, g, 1.55, 1.7, 0.55, 18, T.sup, xA, 0, deckZ(xA) + 0.1);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(xA, 0, deckZ(xA) + 0.35); g100(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tb = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.slice().forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  return { build: build };
})();

/* Registration: len is the overall length used, 91.5 m. */
UNIT_MODELS["pla_e60_corvette"] = {
  len: 91.5,
  build: function (THREE, M, C) { return HeroJiangnan.build(THREE, M, C); }
};
