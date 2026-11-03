/* ==================== js/hero/pla_jianghu.js ===========================
   HERO MODEL -- Type 053H2 (NATO "Jianghu-III") frigate, Hudong, three
   ships for the PLAN: Huangshi (535, 1986), Wuhu (536, 1987) and Zhoushan
   (537, 1990; renamed Cangzhou 2006).  The surface-warfare Jianghu: the
   enclosed twin 100 mm fore and aft, four twin 37 mm, two groups of YJ-8
   box launchers amidships (the H2's signature, where the 053H/H1 carry
   open SY-1 rails), a single box funnel with a black cap, the bridge with
   the gun director dome and the plated foremast, ASW rocket launchers on
   the forecastle.  No hangar, no flight deck.
   Key: pla_e80_corvette only (js/eras.js: "Type 053H2 Jianghu-III",
   service 1986; js/warship_specs.js: 103.2 x 10.8 m, funnels 1, guns 2 x
   100 mm fore and aft, box launchers, no helicopter).

   WHICH SHIP, WHICH DATE.  Every photograph reached is of Huangshi AFTER
   her sale to Bangladesh in 2013-2014, as BNS Abu Bakr (F15), 2014-2020.
   No photograph of a Jianghu-III in PLAN service could be found on
   Commons (searched the class, the three names and the pennants).  The
   Bangladesh ships were transferred as built [E]; the layout the
   photographs show (guns, launchers, funnel, masts, directors) is the
   053H2 layout [E] lists, and it is drawn.  What may be a Bangladesh
   change is listed under NOT CONFIRMED (the masthead antenna above all).
   Nothing Bangladeshi is drawn: no pennant number, no ensign, no flags.

   DIMENSIONS.  Published: 103.2 m overall [E][W]; beam 10.8 m ([W], the
   brief; [E]'s comparison table gives 11.3 m for the H2 and 10.8 m for the
   053H, unsourced); draught 3.1 m ([W]; [E] table 3.19 m); 1,720 t
   normal, 1,960 t full load [E].  Drawn to 103.2 x 10.8 m, keel 3.1 m
   under the waterline.

   REFERENCES (Wikimedia Commons, fetched at 960 px wide; en.wikipedia)
     [P1] "bnaujaa aabu bkr, baanlaadesh naubaahinii (cropped).jpg" (Bengali
         title: "BNS Abu Bakr, Bangladesh Navy"): PORT BEAM of F15, bow
         left, from near water level with a long lens; 960 x 283.  The
         MEASURING SHEET.  The frame is tilted 1.38 degrees (the boot line
         runs from y 276 at px 60 to y 255 at px 930); it was levelled
         first, which puts the waterline at y 268.  Stem head px 8 to the
         transom px 942 = 103.2 m, 9.06 px/m both ways (a sailor on the
         forecastle reads 14-16 px under the rail, so the vertical scale
         holds).  Model x = 51.6 - (px - 8) / 9.06, z = (268 - y) / 9.06.
         Read off it:
           stem head x 51.6, z 7.9; stem in the water at x 48.5;
           forecastle edge z 7.0 at x 45.9, 6.4 at 41.5, 5.9 at 37 to the
             gun; the side rises to the 01 level (7.5) just abaft the gun,
             at x 32.5, and stays there to x -19.1, then curves down to the
             quarterdeck (4.2) by x -22.4; the quarterdeck is level to the
             vertical transom, whose foot is about 0.5 m up;
           forward 100 mm house x 36.4-32.4, roof 10.2 (on a barbette);
           a covered mount on the 01 deck x 30.4-26.1 (forward 37 mm);
           bridge front x 25.2, vertical, roof 13.0; a white radome on the
             roof x 20.2-16.1, top 18.2;
           plated mast tower x 11.3-7.8 widening to the bridge at its foot,
             a platform at 19.6, a lattice top to a platform and yards at
             23.1 (yards 8.6 m), an antenna on it to 26 and a pole to 29.5;
           a boat under davits on the 01 deck x 6.1 to -0.5, top 10.6;
           box funnel x 0.6 to -6.6, flat overhanging dark cap at 13.0-13.5,
             a row of louvres high on the side;
           after launcher group x -9.3 (raised front end, top 12.8) to -17.1
             (low end 9.1) on a frame: boxes sloping down aft;
           a director on a lattice pedestal x -18.2 to -19.8, platform 13.6,
             top 16.5;
           the after deckhouse on the centreline to x -27.8 at the 01 level
             (the side already stepped down), covered mounts on it;
           after 100 mm house x -27.8 to -35.3 with its base, roof 9.2,
             trained aft, barrels to x -39.8;
           depth-charge gear and the ensign staff on the quarterdeck.
     [P2] "BNS Abu Bakr (Type 053H2).jpg": STARBOARD side of F15 from a little
         forward of the beam (the bow is magnified; used for shapes, not
         lengths).  The angular twin 100 mm forward of the bridge with the
         side rising behind it in a curve; the bridge with a row of windows
         in the top storey and the director radome on the roof; the plated
         tower and the lattice top with a rectangular antenna; the forward
         launcher group beside the mast; the funnel with louvres; the after
         launcher group, a long box raised at its forward end on a frame;
         the director on its lattice pedestal on a plated base; an OPEN
         twin 37 mm with crew on the after deckhouse; the after 100 mm
         behind the high side, its barrels out over the quarterdeck.
     [P3] "BNS Abu Bakr during Bongosagar exercise with Indian Navy.jpg": the
         ship at sea FROM ABOVE, starboard side, bow left.  The plan: the
         gun on the forecastle, two small items forward of it; the 01 deck
         from abaft the gun to the after step; the bridge and its radome;
         the tower; the first launcher group just abaft the tower, the
         black-capped funnel with louvres on its sides, the second group
         abaft it; a boat abreast the funnel to starboard; life-raft
         canisters; the after deckhouse with two mounts abreast; the side
         stepping down; the after gun on the quarterdeck; the stern gear.
         Both launcher groups are TRAINED ATHWARTSHIPS here, so the mounts
         train (see NOT CONFIRMED).
     [P4] "Superstructures Bangladesh Navy Ships (27554924120).jpg" (2016):
         from the forecastle of a Bangladesh ship looking AFT at what is
         taken to be the forward end of F15 or her sister F17 (the same
         angular twin 100 mm and the same bridge radome): the gun house
         face on, two barrels about 0.75 m apart, chamfered roof edges, on
         a raised base; two canvas-covered mounts abreast on the forecastle
         forward of it, behind a low breakwater; two canvas-covered mounts
         abreast on the 01 deck behind it, beside the bridge front.
     [E] en.wikipedia "Type 053 frigate" (Type 053H2 section and the
         comparison table): 103.2 x 11.3 x 3.19 m; 1,720 / 1,960 t;
         8 x YJ-8 or YJ-82 in two four-box launcher groups; 2 x Type 79A
         twin 100 mm; 4 x Type 76 twin 37 mm; 2 x five-tube Type 81 ASW
         rocket launchers; 4 x Type 64 DC projectors, 2 DC racks; 2 x Mk 36
         RBOC; Type 354 (Eye Shield), Type 352 (Square Tie), Type 343 (Wasp
         Head), 2 x Type 341, 2 x RM-1290 radars; built 1985-1990 at
         Hudong; Huangshi and Wuhu sold to Bangladesh 2013.
     [W] the task brief / js/warship_specs.js: 103.2 x 10.8 m, 3.1 m,
         about 1,900 t.
     [K] js/hero/pla_jiangwei.js (HeroJiangwei) and js/hero/pla_luda.js
         (HeroLuda): the kit (textures, lofted hull, bake, lattice, boat)
         is copied from them; every part is re-dimensioned to [P1]-[P4].

   RECOGNITION LIST (where each shows):
     1. Flush hull, the forecastle sheering up to a raked stem (7.9 m), the
        side carried up to the 01 level (7.5) from the forward gun to abaft
        the second launcher group, then curving down to a low level
        quarterdeck (4.2) and a vertical transom [P1][P2][P3] - STA, W().
     2. The angular twin 100 mm on a raised base on the forecastle, the
        "turret" [P1][P2][P4][E] - t79().
     3. Two five-tube ASW rocket launchers abreast forward of it behind a
        breakwater [P4][P3][E] - asw().
     4. Two twin 37 mm abreast on the 01 deck beside the bridge front and
        two abreast on the after deckhouse [P1][P2][P3][P4][E] - twin37().
     5. The bridge: flush vertical front, a windowed top storey, the gun
        director under a white radome on the roof [P1][P2][P3].
     6. The plated foremast tower with a platform, a lattice top, yards, a
        rotating antenna and a pole [P1][P2].
     7. The YJ-8 launchers: two groups, one between the mast and the
        funnel, one abaft the funnel; long boxes raised at the forward end
        on trainable frames [P1][P2][P3][E] - yjGroup().
     8. The box funnel with louvres and a flat, overhanging black cap
        [P1][P2][P3] - stack().
     9. The after director on a lattice pedestal [P1][P2] - director().
    10. The after twin 100 mm on the quarterdeck, trained aft [P1][P2][P3].
    11. Boats: port under davits by the mast [P1], starboard abreast the
        funnel [P2][P3]; life-raft canisters [P1][P3].
    12. Depth-charge gear at the stern [P1][P3][E].
   NOT CONFIRMED (estimated or not drawn):
     - The date: all four photographs are of the ship in Bangladesh service
       (2014 and later).  The antenna at the masthead ([P1] a white curved
       reflector, [P2] a rectangular box: one rotating antenna seen at two
       angles) is drawn as a generic rotating reflector; the as-built Type
       354 Eye Shield [E] is not checked.  The radome over the bridge is
       drawn as the photographs show it; whether the as-built Type 343 [E]
       sat under it in 1986 is not checked.
     - Heights: measured off [P1] only (one picture, +-0.4 m); the storey
       heights inside the bridge block (02 at 10.3) are assumed.
     - All widths across the ship (houses 8.4-8.8 m, funnel 4.4 m, gun house
       3.4 m, launcher groups) are estimated from the 3/4 and overhead views
       [P2][P3][P4]; only lengths and heights are measured.  The beam is the
       published 10.8 m; [E]'s 11.3 m is not drawn.
     - The half-breadths, the bilge, the underwater body and the stem below
       the water are the Jiangwei's [K] scaled to 10.8 m and 3.1 m: no
       reference shows them.
     - The launchers: [E] and the brief give four twin launchers in two
       groups.  The photographs resolve two long elements per group ([P3])
       and a side profile about 1.2-1.5 m deep ([P1][P2]).  Drawn as two
       twin launchers per group side by side, each two boxes stacked (6.4 x
       0.95 x 0.75 m), trained fore and aft and raised 18 degrees at the
       forward end as both beam views show them.  The forward group is
       hidden behind the boat in [P1] and is drawn like the after one.
     - The twin 37 mm: drawn as the open Type 76 mount [P2] shows aft; the
       forward pair is under canvas in [P1][P4] and is drawn the same.
     - The ASW launchers: under canvas in [P4]; drawn as five-tube Type 81
       (RBU-1200 class) launchers as [E] gives them.  [P4] is taken to show
       F15 or F17 (not certain).
     - The two directors (radome over the bridge, dish on the after
       pedestal) are not identified; the after one is drawn as a drum with
       a dish.
     - Depth-charge projectors and racks are drawn at the stern where
       [P1][P3] show gear; their number and form follow [E], not a picture.
       Mk 36 decoys, torpedo tubes, ESM, sonar and the two navigation
       radars are NOT drawn (not resolved).
     - Two shafts and rudders [E] (two diesels); the underwater gear is not
       seen and is drawn as the minimum.
     - Colour: medium grey hull, lighter grey upperworks, black boot top
       and funnel cap as [P1][P2][P3] show them (hazy, blue-cast pictures;
       values set by eye).  The anti-fouling red under water is not seen.
       No hull numbers, names, ensigns or flags.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The row
   has turret:true and its first weapon is the main gun (w_e80_pla_
   corvette): the forward twin 100 mm is the group named "turret", origin
   on its ring on top of the barbette; everything else (the after 100 mm
   included) is baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJianghu = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -51.6, XS1 = 51.6, XWL = 48.5;   /* transom, stem head, stem at the waterline [P1] */

  /* HULL SECTION TABLE.  Deck (side top) heights read off [P1]: the
     forecastle sheer, the side rising to the 01 level (7.5) between x 32.6
     and 31.8 just abaft the gun, down again between x -19.1 and -22.4, the
     level quarterdeck (4.2); half beams from the published 10.8 m, fined
     forward and aft as the Jiangwei's [K]; bottom on the centreline to the
     3.1 m draught.
     x, deck z, half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power) */
  var STA = [
    [-51.6,  4.20, 4.70, 4.10,  0.45, 2.2],
    [-50.6,  4.20, 4.95, 4.45, -0.30, 2.3],
    [-47.5,  4.20, 5.15, 4.80, -1.25, 2.5],
    [-42.0,  4.20, 5.30, 5.05, -2.25, 2.7],
    [-34.0,  4.20, 5.40, 5.15, -2.85, 2.9],
    [-22.4,  4.20, 5.40, 5.15, -3.05, 3.0],
    [-19.1,  7.50, 5.40, 5.15, -3.08, 3.0],
    [ -5.0,  7.50, 5.40, 5.15, -3.10, 3.0],
    [ 10.0,  7.50, 5.40, 5.10, -3.10, 3.0],
    [ 22.0,  7.50, 5.30, 4.90, -3.05, 2.8],
    [ 31.8,  7.50, 5.02, 4.42, -3.00, 2.5],
    [ 32.6,  5.88, 5.00, 4.38, -2.98, 2.5],
    [ 37.0,  5.90, 4.65, 3.80, -2.85, 2.1],
    [ 41.5,  6.40, 3.95, 2.85, -2.55, 1.9],
    [ 45.9,  7.00, 2.95, 1.60, -1.90, 1.6],
    [ 48.5,  7.40, 2.25, 0.00,  0.00, 1.4],
    [ 50.2,  7.65, 1.35, 0.00,  0.00, 1.3],
    [ 51.6,  7.90, 0.20, 0.00,  0.00, 1.2]
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
  /* the raked stem from the waterline at XWL to the stem head [P1];
     elsewhere the table's keel line, rising aft to the transom */
  function zBot(x) { return x > XWL ? deckZ(XS1) * Math.pow((x - XWL) / (XS1 - XWL), 0.8) : pick(x, 4); }
  /* half breadth at height z: flared above the water, a super-ellipse
     bilge below, a rounded counter where the bottom is near the water */
  function W(x, z) {
    var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
    var ws;
    if (z >= 0) ws = bw + (bd - bw) * Math.pow(Math.min(1, z / Math.min(zd, 3.8)), 1.5);
    else {
      var n = pick(x, 5), t = Math.min(1, z / Math.min(zb, -0.01));
      ws = bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    }
    var f = Math.max(0, Math.min(1, (zb + 1.0) / 1.1));
    if (f <= 0) return ws;
    var wc = bd * Math.pow((z - zb) / (zd - zb), 0.45);
    return f * wc + (1 - f) * ws;
  }
  /* levels [P1]: the 01 deck (the raised side), the 02 roof (assumed),
     the wheelhouse roof, the quarterdeck */
  var R01 = 7.5, R02 = 10.3, R03 = 13.0, RQD = 4.2;

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
    return canvasTex(THREE, "hull053h2", 512, 256, function (g, w, h) {
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
    return canvasTex(THREE, "plate053h2", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "deck053h2", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "grille053h2", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }


  /* paint: [P1][P2][P3] are hazy colour photographs with a blue cast.  They
     show a medium grey hull, lighter grey upperworks, a black boot top and
     a black funnel cap.  Values set by eye (NOT sampled true) */
  var PAINT = { hull: 0x858e94, sup: 0x9aa2a6, deck: 0x52595e, soot: 0x1f2224 };
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
      boot:  skin(0x2a2d30, hullTex(THREE), 0.9),
      under: skin(0x5a1e18, hullTex(THREE), 0.9),
      sup:   skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:  skin(PAINT.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      team:  skin(team, plateTex(THREE), 0.84),
      dome:  skin(0xd6d8d4, plateTex(THREE), 0.7),
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

  /* ---------------------------------------------------------------- hull */
  function hullXs() {
    var xs = [], x, i;
    for (x = XS0; x < XS1 - 0.01; x += 3.0) xs.push(x);
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (x = XS0; x < -48; x += 0.8) xs.push(x);
    for (x = -22.6; x < -18.9; x += 0.45) xs.push(x);
    for (x = 31.6; x < 32.8; x += 0.2) xs.push(x);
    for (x = 42; x < XS1; x += 1.0) xs.push(x);
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
  /* the small transom face at the end of the counter, hull paint [P1] */
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
  /* a ship's boat on its chocks (the Jiangwei's [K]; m: the hull paint, default T.sup) */
  function boat(THREE, g, T, x, y, z, len, bw, hh, m) {
    var xs = [], sec = [], k;
    for (k = 0; k <= 6; k++) {
      var t = k / 6;
      xs.push(-len / 2 + t * len);
      var w = Math.max(0.12, bw * Math.pow(Math.sin(PI * Math.min(1, 0.12 + t * 0.95)), 0.6));
      sec.push(superRing(w, hh * (t > 0.85 ? 1.1 : 1), 0, 2 / 2.4, 12));
    }
    var bg = new THREE.Group(); bg.position.set(x, y, z);
    ringLoft(THREE, bg, m || T.sup, xs, sec, true);
    box(THREE, bg, len * 0.75, bw * 1.7, 0.08, T.deck, 0, 0, hh * 0.85);
    g.add(bg);
    for (k = -1; k <= 1; k += 2) box(THREE, g, 0.25, bw * 1.6, 0.4, T.metal, x + k * len * 0.28, y, z - hh - 0.15);
  }
  function chamferBox(x0, x1, hy, c) {
    return [[x0, -hy], [x1 - c, -hy], [x1, -hy + c], [x1, hy - c], [x1 - c, hy], [x0, hy]];
  }
  /* a house plan with the forward corners rounded (radius r, n steps),
     CCW from above */
  function roundFront(x0, x1, hy, r, n) {
    var pts = [[x0, -hy]], k;
    for (k = 0; k <= n; k++) {
      var a = -PI / 2 + (PI / 2) * k / n;
      pts.push([x1 - r + r * Math.cos(a), -hy + r + r * Math.sin(a)]);
    }
    for (k = 0; k <= n; k++) {
      var b = (PI / 2) * k / n;
      pts.push([x1 - r + r * Math.cos(b), hy - r + r * Math.sin(b)]);
    }
    pts.push([x0, hy]);
    return pts;
  }

  /* ------------------------------------------------------------ weapons */
  /* the twin 100 mm (Type 79A [E]) at rest pointing +X [P1][P2][P4]: an
     angular house 4.7 m long, 3.4 m wide and 2.9 m tall, vertical lower
     sides, a sloped facet above them at the front and chamfered roof
     edges ([P4] face on); two barrels 0.76 m apart from slots low in the
     face, 3.6 m of each outside the house ([P1]: the after mount's reach
     3.3-3.6 m past the face); sight hoods on the roof.  Origin on the ring
     at the top of the barbette. */
  function t79(THREE, g, T) {
    var s;
    cylZ(THREE, g, 1.75, 1.85, 0.25, 20, T.sup, -0.4, 0, 0.125);
    hexa(THREE, g, T.sup, [[-2.6, -1.7, 0.25], [2.1, -1.7, 0.25], [2.1, 1.7, 0.25], [-2.6, 1.7, 0.25],
                           [-2.6, -1.7, 1.35], [2.1, -1.7, 1.35], [2.1, 1.7, 1.35], [-2.6, 1.7, 1.35]]);
    hexa(THREE, g, T.sup, [[-2.6, -1.7, 1.35], [2.1, -1.7, 1.35], [2.1, 1.7, 1.35], [-2.6, 1.7, 1.35],
                           [-2.45, -1.25, 2.9], [0.6, -1.25, 2.9], [0.6, 1.25, 2.9], [-2.45, 1.25, 2.9]]);
    box(THREE, g, 0.1, 1.6, 1.0, T.dark, -2.62, 0, 1.0);
    /* the canvas blast bag over the slots [P4] */
    box(THREE, g, 0.12, 1.3, 1.15, T.soot, 2.12, 0, 0.95);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.7, 0.42, 0.32, T.sup, -1.3, s * 0.85, 3.05);
      box(THREE, g, 0.06, 0.3, 0.15, T.glass, -0.93, s * 0.85, 3.07);
      box(THREE, g, 0.7, 0.06, 0.5, T.dark, -0.6, s * 1.71, 0.9);
      var br = new THREE.Group(); br.position.set(2.1, s * 0.38, 0.95); br.rotation.y = -0.04;
      cylX(THREE, br, 0.17, 0.2, 0.5, 12, T.soot, 0.2, 0, 0);
      cylX(THREE, br, 0.075, 0.105, 3.3, 10, T.gun, 1.95, 0, 0, true);
      cylX(THREE, br, 0.1, 0.1, 0.28, 10, T.gun, 3.55, 0, 0);
      g.add(br);
    }
    return g;
  }

  /* open twin 37 mm (Type 76 [E]) at rest pointing +X: [P2] shows the
     after starboard one uncovered, a low carriage with side plates, a
     front shield and two barrels; about 2.6 m long over the barrels' rest
     position, 1.8 m wide, 1.8 m tall.  Origin on the deck. */
  function twin37(THREE, g, T) {
    var s;
    cylZ(THREE, g, 0.85, 0.95, 0.35, 14, T.sup, 0, 0, 0.175);
    box(THREE, g, 1.3, 1.2, 0.55, T.sup, -0.1, 0, 0.62);
    hexa(THREE, g, T.sup, [[0.45, -0.85, 0.85], [0.6, -0.85, 0.85], [0.6, 0.85, 0.85], [0.45, 0.85, 0.85],
                           [0.25, -0.75, 1.75], [0.36, -0.75, 1.75], [0.36, 0.75, 1.75], [0.25, 0.75, 1.75]]);
    box(THREE, g, 0.9, 0.5, 0.36, T.metal, -0.05, 0, 1.3);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.1, 0.08, 0.85, T.sup, -0.15, s * 0.8, 1.25);
      box(THREE, g, 0.32, 0.3, 0.3, T.metal, -0.6, s * 0.55, 1.0);
      box(THREE, g, 0.45, 0.25, 0.4, T.soot, -0.15, s * 0.55, 1.1);
      var bar = new THREE.Group(); bar.position.set(0.4, s * 0.17, 1.38); bar.rotation.y = -0.14;
      cylX(THREE, bar, 0.09, 0.1, 0.5, 8, T.gun, 0.15, 0, 0);
      cylX(THREE, bar, 0.045, 0.055, 2.1, 6, T.gun, 1.4, 0, 0, true);
      cylX(THREE, bar, 0.07, 0.07, 0.3, 6, T.gun, 2.55, 0, 0);
      g.add(bar);
    }
    return g;
  }

  /* five-tube ASW rocket launcher (Type 81 [E]) pointing +X, under canvas
     in [P4]: a pedestal, a yoke and three tubes over two in a cradle with
     side plates.  Origin on the deck. */
  function asw(THREE, g, T) {
    var i;
    cylZ(THREE, g, 0.4, 0.5, 0.7, 12, T.sup, 0, 0, 0.35);
    box(THREE, g, 0.7, 1.0, 0.3, T.sup, 0, 0, 0.85);
    var c = new THREE.Group(); c.position.set(0.05, 0, 1.3); c.rotation.y = -0.4;
    var tp = [[-0.36, -0.16], [0, -0.16], [0.36, -0.16], [-0.18, 0.16], [0.18, 0.16]];
    for (i = 0; i < tp.length; i++) {
      cylX(THREE, c, 0.14, 0.14, 1.5, 10, T.sup, 0.2, tp[i][0], tp[i][1]);
      cylX(THREE, c, 0.11, 0.11, 0.04, 10, T.dark, 0.96, tp[i][0], tp[i][1]);
    }
    box(THREE, c, 0.25, 1.15, 0.7, T.metal, -0.6, 0, 0);
    box(THREE, c, 1.4, 0.08, 0.7, T.sup, 0.15, 0.6, 0);
    box(THREE, c, 1.4, 0.08, 0.7, T.sup, 0.15, -0.6, 0);
    g.add(c);
    return g;
  }

  /* one YJ-8 launcher group [P1][P2][P3][E]: two twin launchers side by
     side, each two boxes stacked (6.4 x 0.95 x 0.75 m), on one trainer,
     trained fore and aft and raised el at the forward end (see NOT
     CONFIRMED).  Origin at the middle of the bundle. */
  function yjGroup(THREE, g, T, el) {
    var c = new THREE.Group(); c.rotation.y = -el; g.add(c);
    var i, j, k;
    for (i = -1; i <= 1; i += 2) for (j = 0; j < 2; j++) {
      var y = i * 0.5, z = (j - 0.5) * 0.77;
      box(THREE, c, 6.4, 0.95, 0.75, T.sup, 0, y, z);
      box(THREE, c, 0.06, 0.82, 0.62, T.metal, 3.22, y, z);
      box(THREE, c, 0.06, 0.82, 0.62, T.dark, -3.22, y, z);
      for (k = 0; k < 3; k++) box(THREE, c, 0.14, 1.0, 0.8, T.sup, -2.2 + k * 2.2, y, z);
    }
    box(THREE, c, 5.6, 2.2, 0.16, T.metal, -0.2, 0, -0.86);
    return c;
  }

  /* a director on a lattice pedestal [P1][P2]: a plated base, a four-leg
     lattice, a railed platform, a drum with a dish forward (type NOT
     identified).  x, base z, platform z */
  function director(THREE, g, T, x, z0, zp) {
    box(THREE, g, 2.2, 2.2, 1.5, T.sup, x, 0, z0 + 0.75);
    lattice(THREE, g, T.metal, x, 0.85, 0.85, 0.55, 0.55, z0 + 1.5, zp, 3, 0.09);
    polyPrism(THREE, g, T.metal, [[x - 1.3, -1.3], [x + 1.3, -1.3], [x + 1.3, 1.3], [x - 1.3, 1.3]], zp, zp + 0.12);
    roofRail(THREE, g, T, [[x - 1.3, 1.3], [x + 1.3, 1.3], [x + 1.3, -1.3], [x - 1.3, -1.3], [x - 1.3, 1.3]], zp + 0.12, 0.8);
    cylZ(THREE, g, 0.55, 0.65, 1.0, 12, T.sup, x - 0.2, 0, zp + 0.62);
    box(THREE, g, 1.2, 0.9, 0.8, T.sup, x - 0.1, 0, zp + 1.5);
    dish(THREE, g, T.dome, 0.95, x + 0.75, 0, zp + 1.55, 1, 1);
  }

  /* the box funnel [P1][P2][P3]: a casing 7.2 m long and 4.5 m wide at
     the 01 deck, hardly tapering, a row of louvres high on each side, a
     flat black cap overhanging all round */
  function stack(THREE, g, T, cx, z0, zt) {
    var s, i;
    hexa(THREE, g, T.sup, [[cx - 3.6, -2.25, z0], [cx + 3.6, -2.25, z0], [cx + 3.6, 2.25, z0], [cx - 3.6, 2.25, z0],
                           [cx - 3.4, -2.15, zt], [cx + 3.4, -2.15, zt], [cx + 3.4, 2.15, zt], [cx - 3.4, 2.15, zt]]);
    box(THREE, g, 7.7, 4.9, 0.42, T.soot, cx, 0, zt + 0.21);
    box(THREE, g, 5.6, 3.4, 0.08, T.dark, cx, 0, zt + 0.45);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) box(THREE, g, 0.5, 0.06, 0.45, T.dark, cx + 2.6 - i * 0.9, s * 2.17, zt - 1.0);
      box(THREE, g, 1.0, 0.06, 0.9, T.dark, cx - 2.9, s * 2.2, zt - 1.6);
    }
    box(THREE, g, 0.06, 2.6, 1.4, T.dark, cx + 3.55, 0, z0 + 1.6);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x;
    void M;

    /* hull shell in three bands (red anti-fouling, black boot, grey), the
       transom and the weather deck [P1][P2] */
    g.add(shellBand(THREE, T.under, -4, -0.3, 4));
    g.add(shellBand(THREE, T.boot, -0.3, 0.4, 1));
    g.add(shellBand(THREE, T.hull, 0.4, 9, 7));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    for (s = -1; s <= 1; s += 2) {
      /* the hawse [P1] and two scuttles by the after step [P1] */
      box(THREE, g, 1.0, 0.2, 0.8, T.dark, 44.2, s * (W(44.2, 3.4) + 0.02), 3.4);
      box(THREE, g, 0.6, 0.3, 0.5, T.gun, 44.6, s * (W(44.6, 3.0) + 0.05), 3.0);
      for (i = 0; i < 2; i++) {
        x = -19.6 - i * 1.1;
        box(THREE, g, 0.32, 0.05, 0.32, T.dark, x, s * (W(x, 6.1) + 0.02), 6.1);
      }
    }

    /* ------------------------------------ forecastle and the 100 mm [P1][P4] */
    /* the barbette under the forward gun, 1.4 m (house roof 10.2 [P1]) */
    cylZ(THREE, g, 1.9, 2.0, 1.5, 20, T.sup, 34.8, 0, deckZ(34.8) + 0.65);
    /* the breakwater and the two ASW launchers behind it [P4][P3] */
    box(THREE, g, 0.15, 6.0, 0.8, T.hull, 40.7, 0, deckZ(40.7) + 0.4);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.6, 0.15, 0.6, T.hull, 40.5, s * 2.95, deckZ(40.5) + 0.3, s * 0.6);
      var aw = new THREE.Group(); aw.position.set(38.4, s * 2.2, deckZ(38.4)); asw(THREE, aw, T); g.add(aw);
      /* capstans and bollards [P4] */
      cylZ(THREE, g, 0.4, 0.5, 0.55, 10, T.metal, 46.0, s * 0.9, deckZ(46.0) + 0.27);
      for (i = 0; i < 3; i++) {
        var bxx = 48.0 - i * 6.5;
        cylZ(THREE, g, 0.15, 0.15, 0.4, 6, T.metal, bxx, s * (halfB(bxx) - 0.45), deckZ(bxx) + 0.2);
        cylZ(THREE, g, 0.15, 0.15, 0.4, 6, T.metal, bxx - 0.5, s * (halfB(bxx) - 0.45), deckZ(bxx) + 0.2);
      }
      box(THREE, g, 2.4, 0.16, 0.07, T.gun, 47.5, s * 0.7, deckZ(47.5) + 0.04, -s * 0.15);
    }
    box(THREE, g, 1.2, 1.0, 0.5, T.metal, 44.0, 0, deckZ(44.0) + 0.25);
    strut(THREE, g, T.metal, 51.0, 0, deckZ(51.0), 51.0, 0, deckZ(51.0) + 3.0, 0.05, 4);

    /* ------------------------------------- the 01 deck forward [P1][P4] */
    /* the forward pair of twin 37 mm beside the bridge front */
    for (s = -1; s <= 1; s += 2) {
      var fm = new THREE.Group(); fm.position.set(28.3, s * 3.1, R01); twin37(THREE, fm, T); g.add(fm);
    }

    /* --------------------------------------------------------- bridge */
    /* the 02 block x 25.2 to 11.2, flush vertical front [P1][P2] */
    polyPrism(THREE, g, T.sup, roundFront(11.2, 25.2, 4.3, 1.0, 3), R01 - 0.05, R02);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 0.45, 0.06, 0.45, T.dark, 22.5 - i * 2.8, s * 4.32, R02 - 1.2);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, 12.4, s * 4.32, R01 + 0.95);
    }
    roofRail(THREE, g, T, [[13.0, 4.2], [24.2, 4.2], [25.1, 3.3], [25.1, -3.3], [24.2, -4.2], [13.0, -4.2]], R02, 0.9);
    /* the wheelhouse x 25.2 to 14.2, windows across the front and along
       the sides [P2] */
    polyPrism(THREE, g, T.sup, roundFront(14.2, 25.2, 3.8, 0.9, 3), R02 - 0.05, R03);
    box(THREE, g, 0.06, 5.6, 0.75, T.glass, 25.21, 0, R03 - 0.9);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 8; i++) box(THREE, g, 0.7, 0.06, 0.6, T.glass, 23.6 - i * 1.15, s * 3.81, R03 - 0.9);
      box(THREE, g, 0.8, 0.8, 0.75, T.glass, 24.85, s * 3.45, R03 - 0.9, s * 0.78);
    }
    roofRail(THREE, g, T, [[14.4, 3.7], [24.4, 3.7], [25.1, 3.0], [25.1, -3.0], [24.4, -3.7], [14.4, -3.7]], R03, 0.9);
    /* the gun director under its white radome on the roof [P1][P2][P3] */
    cylZ(THREE, g, 1.25, 1.35, 1.2, 16, T.sup, 18.2, 0, R03 + 0.6);
    var rd = new THREE.Mesh(new THREE.SphereGeometry(1.95, 18, 12), T.dome);
    rd.position.set(18.2, 0, R03 + 3.1); g.add(rd);
    box(THREE, g, 0.1, 0.9, 0.9, T.soot, 20.12, 0, R03 + 3.0);

    /* ------------------------------------ the foremast [P1][P2] */
    /* the plated tower, centre x 9.8, widening at its foot into the back
       of the bridge; a platform at 19.6 */
    var fx = 9.8;
    hexa(THREE, g, T.sup, [[7.8, -1.9, R01 - 0.05], [13.2, -1.9, R01 - 0.05], [13.2, 1.9, R01 - 0.05], [7.8, 1.9, R01 - 0.05],
                           [7.9, -1.5, R03], [11.6, -1.5, R03], [11.6, 1.5, R03], [7.9, 1.5, R03]]);
    hexa(THREE, g, T.sup, [[7.9, -1.5, R03], [11.6, -1.5, R03], [11.6, 1.5, R03], [7.9, 1.5, R03],
                           [8.6, -1.1, 19.6], [11.0, -1.1, 19.6], [11.0, 1.1, 19.6], [8.6, 1.1, 19.6]]);
    box(THREE, g, 0.06, 0.8, 1.9, T.dark, 11.62, 0, R03 + 1.4);
    polyPrism(THREE, g, T.metal, [[8.1, -1.8], [14.0, -1.8], [14.0, 1.8], [8.1, 1.8]], 19.6, 19.72);
    roofRail(THREE, g, T, [[8.1, 1.8], [14.0, 1.8], [14.0, -1.8], [8.1, -1.8]], 19.72, 0.8);
    /* the lattice top, the platform and yards at 23.1, the rotating
       antenna (NOT identified) and the pole [P1][P2] */
    lattice(THREE, g, T.metal, fx, 1.1, 1.0, 0.6, 0.6, 19.7, 23.1, 3, 0.11);
    polyPrism(THREE, g, T.metal, [[fx - 1.1, -1.1], [fx + 1.1, -1.1], [fx + 1.1, 1.1], [fx - 1.1, 1.1]], 23.1, 23.22);
    box(THREE, g, 0.2, 8.6, 0.12, T.metal, fx, 0, 22.9);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, fx, s * 0.6, 22.0, fx, s * 3.0, 22.85, 0.035, 3);
      box(THREE, g, 0.3, 0.3, 0.3, T.metal, fx, s * 4.1, 22.7);
    }
    cylZ(THREE, g, 0.22, 0.3, 0.9, 8, T.metal, fx + 0.2, 0, 23.67);
    box(THREE, g, 0.45, 2.8, 1.0, T.dome, fx + 0.35, 0, 24.65);
    box(THREE, g, 0.6, 0.4, 0.3, T.metal, fx - 0.1, 0, 24.2);
    strut(THREE, g, T.metal, fx - 1.0, 0, 23.1, fx - 2.4, 0, 29.5, 0.07, 5);
    box(THREE, g, 0.12, 2.4, 0.08, T.metal, fx - 1.95, 0, 27.4);

    /* ----------------------------------- the launchers and the funnel */
    /* the first group between the mast and the funnel, the second abaft
       the funnel, each on a trainer; boxes 9.1 to 12.6 m [P1][P2][P3] */
    var YZ = 10.8, EL = 18 * PI / 180, gx = [4.3, -13.4], k;
    for (k = 0; k < 2; k++) {
      var yg = new THREE.Group(); yg.position.set(gx[k], 0, YZ); g.add(yg);
      yjGroup(THREE, yg, T, EL);
      cylZ(THREE, g, 0.7, 0.9, YZ - 1.0 - R01, 12, T.sup, gx[k] + 0.3, 0, (R01 + YZ - 1.0) / 2);
      for (s = -1; s <= 1; s += 2) {
        strut(THREE, g, T.metal, gx[k] + 2.2, s * 0.9, R01, gx[k] + 1.6, s * 0.8, YZ - 0.45, 0.07, 4);
        strut(THREE, g, T.metal, gx[k] - 2.2, s * 0.9, R01, gx[k] - 1.6, s * 0.8, YZ - 1.4, 0.07, 4);
      }
    }
    /* the funnel x 0.6 to -6.6, cap 13.0-13.4 [P1][P3] */
    stack(THREE, g, T, -3.0, R01 - 0.05, 13.0);
    /* boats: port by the mast under davits [P1]; starboard abreast the
       funnel, dark [P2][P3] */
    boat(THREE, g, T, 2.8, 4.25, 9.9, 6.6, 0.95, 0.6);
    boat(THREE, g, T, -3.0, -4.35, 9.6, 6.0, 0.9, 0.5, T.soot);
    for (i = -1; i <= 1; i += 2) {
      var dx = 2.8 + i * 2.3, ex = -3.0 + i * 2.1;
      strut(THREE, g, T.metal, dx, 4.6, R01, dx, 4.7, 11.2, 0.07, 5);
      strut(THREE, g, T.metal, dx, 4.7, 11.2, dx, 4.25, 11.4, 0.06, 5);
      strut(THREE, g, T.metal, ex, -4.6, R01, ex, -4.7, 10.9, 0.07, 5);
      strut(THREE, g, T.metal, ex, -4.7, 10.9, ex, -4.35, 11.1, 0.06, 5);
    }
    /* life-raft canisters on the 01 deck edges [P1][P3] */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) {
      cylX(THREE, g, 0.32, 0.32, 1.2, 10, T.dome, 16.4 - i * 1.5, s * 4.95, R01 + 0.4);
      cylX(THREE, g, 0.32, 0.32, 1.2, 10, T.dome, -8.6 - i * 1.5, s * 4.95, R01 + 0.4);
    }

    /* ----------------------------------------- aft [P1][P2][P3] */
    /* the director on its lattice pedestal */
    director(THREE, g, T, -18.5, R01, 13.6);
    /* the after deckhouse at the 01 level, inboard of the stepped side */
    polyPrism(THREE, g, T.sup, chamferBox(-27.8, -18.0, 4.2, 0.8), RQD - 0.05, R01);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, -25.0, s * 4.22, RQD + 1.0);
      box(THREE, g, 0.45, 0.06, 0.45, T.dark, -21.8, s * 4.22, R01 - 1.2);
      var am = new THREE.Group(); am.position.set(-24.2, s * 2.9, R01); twin37(THREE, am, T); g.add(am);
    }
    roofRail(THREE, g, T, [[-19.4, 4.1], [-27.0, 4.1], [-27.7, 3.4], [-27.7, -3.4], [-27.0, -4.1], [-19.4, -4.1]], R01, 0.9);
    /* the after twin 100 mm on its barbette, trained aft */
    cylZ(THREE, g, 2.0, 2.1, 1.85, 20, T.sup, -31.6, 0, RQD + 0.88);
    var ag = new THREE.Group(); ag.position.set(-31.6, 0, RQD + 1.8); ag.rotation.z = PI;
    t79(THREE, ag, T); g.add(ag);
    /* stern: two depth-charge racks and two projectors each side ([E];
       gear seen in [P1][P3]), the ensign staff */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.6, 0.7, 0.12, T.metal, -50.0, s * 3.0, RQD + 0.6);
      box(THREE, g, 2.6, 0.08, 0.6, T.metal, -50.0, s * 3.35, RQD + 0.3);
      for (i = 0; i < 4; i++) cylY(THREE, g, 0.28, 0.28, 0.6, 10, T.gun, -50.9 + i * 0.6, s * 3.0, RQD + 0.95);
      for (i = 0; i < 2; i++) {
        var px = -44.5 - i * 2.4;
        cylZ(THREE, g, 0.3, 0.35, 0.5, 8, T.metal, px, s * 4.3, RQD + 0.25);
        strut(THREE, g, T.gun, px, s * 4.3, RQD + 0.4, px, s * 4.8, RQD + 1.3, 0.14, 8);
      }
    }
    strut(THREE, g, T.metal, XS0 + 0.5, 0, RQD, XS0 + 0.5, 0, RQD + 4.0, 0.05, 4);
    var vs = [[-38.0, 3.6], [-38.0, -3.6], [36.0, 2.6], [36.0, -2.6]];
    for (i = 0; i < vs.length; i++) {
      var vx = vs[i][0], vz = deckZ(vx);
      cylZ(THREE, g, 0.18, 0.18, 0.6, 8, T.sup, vx, vs[i][1], vz + 0.3);
      cylZ(THREE, g, 0.36, 0.18, 0.28, 8, T.sup, vx, vs[i][1], vz + 0.7);
    }

    /* underwater gear: two shafts in bossings, four-blade screws, two
       rudders ([E]: two diesels, two shafts; the rest NOT seen) */
    for (s = -1; s <= 1; s += 2) {
      var bos = [];
      for (i = 0; i <= 5; i++) {
        var f = i / 5;
        bos.push(superRing(0.45 - f * 0.25, 0.45 - f * 0.25, -2.15 + f * 0.1, 1, 10).map(function (p) { return [s * 2.3 + p[0], p[1]]; }));
      }
      ringLoft(THREE, g, T.under, [-20, -28, -35, -40, -42.5, -44], bos, true);
      cylX(THREE, g, 0.15, 0.15, 1.2, 8, T.metal, -44.6, s * 2.3, -2.05);
      cylX(THREE, g, 0.3, 0.36, 0.7, 8, T.metal, -45.5, s * 2.3, -2.05);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.6, 1.2), T.metal);
        bl.position.set(-45.5, s * 2.3, -2.05); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.75); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.2, 0.24, 2.2, T.metal, -47.6, s * 2.3, -1.0);
      box(THREE, g, 24.0, 0.08, 0.45, T.under, -6.0, s * (W(-6, -2.5) + 0.12), -2.5);
    }

    /* rails along the deck edges */
    railRun(THREE, g, T, 32.8, 51.2, 3.0, 1.0);
    railRun(THREE, g, T, -19.0, 31.6, 3.6, 1.0);
    railRun(THREE, g, T, XS0 + 0.3, -22.6, 3.0, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.8, 1.0, 0.04, T.team, 22.6, 0, R03 + 0.02);
    box(THREE, g, 2.0, 0.9, 0.04, T.team, -46.5, 0, RQD + 0.02);
    box(THREE, g, 1.4, 0.8, 0.04, T.team, 42.6, 0, deckZ(42.6) + 0.06);

    /* the trained mount: the forward twin 100 mm [P1][P2][P4] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(34.8, 0, deckZ(34.8) + 1.4); t79(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tbk = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tbk.children.slice().forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
  }
  return { build: build };
})();

/* Registration: len is the published overall length, 103.2 m.  One row,
   the Jianghu-III as the photographs show it (see WHICH SHIP in the
   header). */
UNIT_MODELS["pla_e80_corvette"] = {
  len: 103.2,
  build: function (THREE, M, C) { return HeroJianghu.build(THREE, M, C); }
};
