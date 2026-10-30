/* ==================== js/hero/pla_jiangwei.js ==========================
   HERO MODEL -- Type 053H3 (NATO "Jiangwei II") frigate, Hudong and
   Huangpu, 1998-2002, as built: the angular twin 100 mm forward, the
   octuple HQ-7 (Crotale) launcher at the front of the raised 01 deck, the
   two six-tube ASW rocket launchers and the two forward domed twin 37 mm
   before the bridge, the bridge and director tower, the lattice foremast,
   the box funnel, two YJ-83 quad launchers amidships, the Type 517 yagi
   on its pole, the after superstructure with the hangar and the after
   twin 37 mm on its roof, and the flight deck.
   Key: pla_e90_corvette only (js/eras.js: "Type 053H2G / H3 Jiangwei",
   era e90 only; js/warship_specs.js names the Type 053H3 Jiangwei II,
   112 x 12.4 m).  NOT the 2015+ mid-life refit (HQ-10 in place of the
   HQ-7, two Type 630 30 mm in place of the four twin 37 mm, Type 054
   style sensors [E]).

   WHICH CLASS.  The row covers both the Jiangwei-I (053H2G, four ships,
   six-cell HQ-61, two triple YJ launchers [E2]) and the Jiangwei-II
   (053H3, ten ships, HQ-7, two quad YJ-83 [E]).  The Jiangwei-II is drawn:
   it is the more numerous (10 against 4), it is the one js/warship_specs.js
   names, its HQ-7 is the launcher the row text says "worked", and all five
   photographs found are of Jiangwei-II ships.  No photograph of a
   Jiangwei-I was fetched, so nothing of the HQ-61 fit is drawn.

   DIMENSIONS.  Published [E][E2]: 112 m overall, beam 12.4 m, draught
   4.3 m, 2,250 t standard, 2,393 t full load.  js/warship_specs.js: 112 x
   12.4.  Drawn to 112.0 x 12.4, waterline to keel 4.3.  Heights are NOT
   published; see the measuring notes under [A] and [B].

   REFERENCES (Wikimedia Commons, fetched 800-1280 px wide; en.wikipedia)
     [A] "053H3-566-2.jpg": PORT BEAM of Huaihua (566), bow left, from the
         air, about 24 degrees above the horizon (the flight-deck circle
         shows as an ellipse 0.41 as tall as wide; sin 24 = 0.41).  Undated:
         the domes it shows forward and aft could be the original twin
         37 mm or the Type 630 of the refit, and its funnel is a round
         casing with a black cap where the earlier ships of [B][J][M] have
         a box casing.  So it is used for LENGTHWISE POSITIONS and the
         deck levels only, as the measuring sheet: stem head px 73 to the
         stern px 1195 = 112 m (10.0 px/m), model x = 56 - (px - 73) / 10.
         Heights at the near (port) side = (waterline y - image y) / 9.2
         (10 px/m x cos 24); a centreline object stands 6.2 m x 4.0 px/m =
         25 px higher in the image than a near-side one at the same height.
         Read off it (x in model metres):
           breakwater x 42.8-39.8; gun centre x 33.6 (house 5.7 m long);
           01 house front (rounded/chamfered) x 26.7; the side rises to the
             01 level between x 26 and 18.5;
           launcher at the forward end of the 01 deck, centre x 24.3;
           two domed mounts abreast before the bridge, x 15.5;
           bridge (02) front x 13.3-13.8, its after end x -1.7; upper block
             (03) from x 10.3 aft to the mast; round director tower x
             6.8-2.3 with the director on top;
           lattice mast legs x 2.3 / -1.7, curved reflector at its head;
           a row of life-raft canisters x 8.8 to -0.7 on the 01 deck edge;
           first YJ group x -2.7 to -5.2 (two rows of boxes, each 1.1 m in
             x, long across the ship: trained outboard);
           funnel x -6.7 to -14.2;
           second YJ group x -15.4 to -17.7, upright boxes on a leg stand;
           the side steps down from the 01 level at x -18.5;
           after superstructure x -19.7 to the hangar face at x -37.7, a
             pole with a two-bay yagi array at x -22.2, a director with a
             dish x -30, two big domes abreast x -32.5;
           flight deck x -37.7 to the stern, a circle and a pair of lines;
           four openings in the side under the flight deck, x -45 to -55;
           freeboard at the side: 4.0 at the gun, 6.2-6.4 amidships, about
             4.8 aft (after the 1.5 m step at x -18.5); stem head about 6.6.
     [B] "Warship2.jpg": STARBOARD BEAM of 565, bow left, from near water
         level, 800 x 395, low resolution.  The picture is not to the same
         scale across as up (it reads 7.0 px/m along the hull; the rails,
         about 1.1 m, read 13 px).  Lengthwise positions agree with [A]
         within 1-2 m except the after step and the hangar face (2-5 m
         further aft in [B]; [A] used, its baseline is longer).  Read at
         10 px/m upward (the scale that puts the amidships freeboard of [A]
         on it): gun house top 7.5, funnel top 11.9 (a box casing with a
         flat top), director top 16.2, curved reflector 20-22, mast top
         24.7, after superstructure roof 8.9, the domes on it 10.5 ([A]:
         10.6), yagi 13.2 ([A]: 14.1).  Where [A] and [B] differ the
         heights drawn are the mean.
     [J] "Jiaxing1.jpg" (2005): STARBOARD BOW 3/4 of Jiaxing (521), the
         first ship, as built.  The angular twin 100 mm (flat sides, sloped
         front); the HQ-7 at the front of the 01 deck, eight canister
         mouths in two rows; a six-tube ASW launcher; the starboard forward
         twin 37 mm dome under the bridge wing; the wheelhouse windows
         wrapping the front; the director tower and its dish; the lattice
         foremast with the curved reflector and yardarms; the box funnel;
         the yagi pair on its pole; the after superstructure with a big
         dome on its roof; the side stepping up to the 01 level abreast the
         bridge and down again aft; two openings in the side at the stern;
         the anchor in the stem; the light grey paint.
     [X] "Xiangfan Jiangwei II Class Frigate.JPG": STARBOARD BOW of
         Xiangfan (567) at a quay, close.  The PJ33 twin 100 mm house
         (vertical lower sides, a large sloped facet above, chamfered roof
         edges, the barrels from the lower front); the 01 house wall behind
         it, about 2.5 m (people on the 01 deck for scale); both six-tube
         ASW launchers on the 01 deck, each forward of a domed twin 37 mm;
         the side rising to the 01 level at a diagonal; the stem anchor.
     [M] "Jiangwei class frigate -Sanming-.jpg": STARBOARD SIDE of Sanming
         (524) from the quay, looking up.  A six-tube ASW launcher (two
         rows of three) and a twin 37 mm forward of the bridge; the
         lattice mast and the director tower; the box funnel with a flat
         overhanging top; the ship's boat on davits under the yagi pole;
         the yagi pair (two crossed dipole bays on a boom); the after
         superstructure with a domed mount; a row of life-raft canisters.
     [E] en.wikipedia "Type 053H3 frigate": dimensions above; 2 x 4 YJ-83,
         1 x 8 HQ-7, 1 x twin 100 mm (H/PJ-33), 4 x Type 76A twin 37 mm,
         2 x six-tube Type 3200 ASW rocket launchers, a hangar for one
         Z-9C; Type 360, Type 517 (Knife Rest), Type 343, 2 x Type 347G;
         CODAD, two shafts; ten ships 1998-2002; "aft AAA mounts elevated
         compared to the 053H2"; the 2015+ refit.
     [E2] en.wikipedia "Type 053H2G frigate": 112 x 12.4 x 4.3 m, HQ-61B,
         2 x 3 YJ, four ships 1991-1993 (the alternative, not drawn).
     [L] js/hero/pla_luhu.js (HeroLuhu): the kit (textures, materials,
         lofted hull, bake), the twin 37 mm, the HQ-7, the YJ quad bundle,
         the director, the boat and the lattice tower are copied from it
         and re-dimensioned to what [A][B][J][X][M] show.

   RECOGNITION LIST (where each shows):
     1. Flush hull, the forecastle low (4.4 m at the gun) with a raked,
        flared bow rising to 6.6 m; the side carried up to the 01 level
        (6.3) from abreast the bridge to abaft the funnel, then stepping
        down to the flight deck (4.8) [A][B][J][X] - STA, W().
     2. The angular twin 100 mm on the forecastle, the "turret"
        [A][J][X][E] - pj33().
     3. The HQ-7 octuple launcher at the front of the 01 deck, before the
        bridge [A][J][E] - hq7().
     4. Two six-tube ASW rocket launchers and two domed twin 37 mm abreast
        on the 01 deck before the bridge [A][J][X][M][E] - asw(), twin37().
     5. Bridge: the 02 block with rounded front corners, the wheelhouse,
        the round director tower with the director [A][B][J][M].
     6. The lattice foremast with yardarms, platform and the curved
        reflector [A][B][J][M] - lattice(), cheese().
     7. The box funnel with a flat overhanging top [B][J][M] - stack().
     8. Two YJ-83 quad launchers, one before and one abaft the funnel
        [A][B][E] - yjBundle().
     9. The yagi pair (Type 517 [E]) on a pole at the front of the after
        superstructure [A][J][M] - yagi().
    10. The after superstructure and hangar, a director and the after pair
        of twin 37 mm on its roof [A][B][J][M][E].
    11. The flight deck, openings in the side under it, the open transom
        [A][J].
    12. The ship's boat on davits, starboard [M]; life-raft canisters
        along both 01 deck edges [A][J].
   NOT CONFIRMED (estimated or not drawn):
     - All heights.  No drawing exists on Commons; the two beam views
       disagree on the vertical scale by about 10 % and the mean is drawn
       (+-0.7 m).  The 2.6-2.7 m storey heights of the 02 block and the
       wheelhouse are assumed, set to fit the tower and director tops.
     - The half-breadths, the bilge, the underwater body and the stem
       below the bow wave are the Luhu's [L] scaled to 12.4 m and 4.3 m:
       no reference shows them.  Widths across the ship (houses, funnel,
       launchers) are estimated from the 3/4 views [J][X][M].
     - The YJ-83 launchers: [A] shows two rows of boxes long across the
       ship in each group, [B] shows them sloping up forward.  Drawn as
       2 x 2 box bundles (as [L]) trained outboard and elevated 15
       degrees, the forward group to starboard and the after group to
       port; which way each faces is not resolved by any reference.
     - The domes: the forward and after pairs are drawn as Type 76A twin
       37 mm, as [J][X] show forward and [E] lists aft; the after pair is
       not resolved as guns in [A] or [B] (domes only).  The director
       types (tower top, after superstructure) are not identified; the
       two small radomes on the 02 roof (two Type 347G [E]) are NOT
       identified in any reference and are drawn as plain spheres.
     - The curved reflector at the masthead is drawn as a generic surface
       search reflector (Type 360 by [E]; not checked).
     - The funnel is drawn as the box casing of [B][J][M]; [A]'s round
       capped casing is not drawn.
     - The boat: [M] shows the starboard one; nothing is drawn to port
       ([A] shows no boat there).
     - Torpedo tubes, depth-charge racks, decoy launchers, ESM, sonar and
       the helicopter are NOT drawn (not seen in the references).
     - Two shafts and screws ([E]: CODAD, two shafts), two rudders: the
       underwater gear is NOT seen; drawn as the minimum.
     - Colour: light grey with a red boot topping, as [A][J][X] show it;
       values set by eye, not sampled.  No hull numbers, names, ensigns or
       flags.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The row
   has turret:true and its first weapon is the 100 mm gun (w_e90_pla_
   corvette): the twin 100 mm is the group named "turret"; everything else
   is baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJiangwei = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -56.0, XS1 = 56.0, XWL = 51.0;   /* stern, stem head, stem at the waterline [A] */

  /* HULL SECTION TABLE.  Deck (side top) heights read off [A][B]: the
     forecastle, the side carried up to the 01 level between x 22.5 and
     18 and down again between x -18.5 and -21 [A]; half beams from the
     published 12.4 m, fined forward and aft as the Luhu's [L]; bottom on
     the centreline to the 4.3 m draught.
     x, deck z, half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power) */
  var STA = [
    [-56.0,  4.80, 5.05, 4.30,  0.40, 2.2],
    [-55.0,  4.80, 5.40, 4.80, -0.40, 2.3],
    [-52.0,  4.80, 5.75, 5.30, -1.60, 2.5],
    [-46.0,  4.80, 6.00, 5.65, -2.80, 2.7],
    [-38.0,  4.80, 6.15, 5.85, -3.70, 2.9],
    [-21.0,  4.80, 6.20, 5.90, -4.20, 3.0],
    [-18.5,  6.30, 6.20, 5.90, -4.25, 3.0],
    [ -5.0,  6.30, 6.20, 5.90, -4.30, 3.0],
    [ 10.0,  6.30, 6.20, 5.85, -4.30, 3.0],
    [ 18.0,  6.30, 6.10, 5.70, -4.25, 2.8],
    [ 22.5,  4.40, 6.00, 5.50, -4.20, 2.6],
    [ 30.0,  4.40, 5.65, 4.95, -4.05, 2.3],
    [ 37.0,  4.60, 5.05, 4.10, -3.80, 2.0],
    [ 43.0,  5.00, 4.20, 2.95, -3.30, 1.8],
    [ 48.0,  5.50, 3.25, 1.75, -2.40, 1.6],
    [ 51.0,  5.85, 2.55, 0.00,  0.00, 1.4],
    [ 53.5,  6.20, 1.50, 0.00,  0.00, 1.3],
    [ 56.0,  6.60, 0.20, 0.00,  0.00, 1.2]
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
  /* the raked stem from the waterline at XWL to the stem head [A];
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
    if (z >= 0) ws = bw + (bd - bw) * Math.pow(Math.min(1, z / Math.min(zd, 4.2)), 1.5);
    else {
      var n = pick(x, 5), t = Math.min(1, z / Math.min(zb, -0.01));
      ws = bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    }
    var f = Math.max(0, Math.min(1, (zb + 1.2) / 1.3));
    if (f <= 0) return ws;
    var wc = bd * Math.pow((z - zb) / (zd - zb), 0.45);
    return f * wc + (1 - f) * ws;
  }
  /* levels [A][B]: the 01 deck (the raised side and the forward house
     roof), the 02 block roof, the wheelhouse roof, the director tower
     roof, the after superstructure and hangar roof, the flight deck */
  var R01 = 6.3, R02 = 9.0, R03 = 11.6, RTW = 14.3, RAFT = 8.6, RFD = 4.8;

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
    return canvasTex(THREE, "hull053h3", 512, 256, function (g, w, h) {
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
    return canvasTex(THREE, "plate053h3", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "deck053h3", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "grille053h3", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* paint: [A][J][X] are colour photographs.  They show a light grey hull
     and houses, a red boot topping, a dark funnel top, off-white domes.
     Values set by eye (NOT sampled): the Luhu's [L] light grey */
  var PAINT = { hull: 0x8f999f, sup: 0x99a3a8, deck: 0x50575c, soot: 0x26292c };
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
      boot:  skin(0x7a2a22, hullTex(THREE), 0.9),
      under: skin(0x5a1e18, hullTex(THREE), 0.9),
      sup:   skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:  skin(PAINT.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      team:  skin(team, plateTex(THREE), 0.84),
      dome:  skin(0xd4d6d2, plateTex(THREE), 0.7),
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
    for (x = XS0; x < -52; x += 0.8) xs.push(x);
    for (x = -21.2; x < -18.3; x += 0.5) xs.push(x);
    for (x = 17.8; x < 22.7; x += 0.6) xs.push(x);
    for (x = 44; x < XS1; x += 1.0) xs.push(x);
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
  /* the small transom face at the end of the counter, hull paint [A][J] */
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


  /* small enclosed twin 37 mm (Type 76A [E]) at rest pointing +X, the
     domed mounts of [J][X][M]: the Luhu's [L], about 2.4 m long,
     2 m wide, 1.6 m tall, two barrels of about 2.6 m with flash hiders */
  function twin37(THREE, g, T) {
    cylZ(THREE, g, 0.95, 1.05, 0.3, 14, T.sup, 0, 0, 0.15);
    var xs = [-1.25, -1.15, -0.45, 0.45, 0.95, 1.12];
    var sec = [[0.82, 0.58], [0.95, 0.68], [1.0, 0.72], [0.98, 0.7], [0.82, 0.6], [0.55, 0.45]];
    var rings = sec.map(function (q) { return superRing(q[0], q[1], 1.02, 2 / 2.6, 16); });
    ringLoft(THREE, g, T.sup, xs, rings, true);
    box(THREE, g, 0.5, 0.5, 0.25, T.sup, -0.2, 0.45, 1.8);
    box(THREE, g, 0.06, 0.36, 0.16, T.glass, 0.06, 0.45, 1.84);
    var s;
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.1, 0.32, 0.5, T.dark, 1.1, s * 0.3, 1.05);
      var bar = new THREE.Group(); bar.position.set(1.0, s * 0.3, 1.05); bar.rotation.y = -0.12;
      cylX(THREE, bar, 0.09, 0.11, 0.6, 8, T.gun, 0.2, 0, 0);
      cylX(THREE, bar, 0.045, 0.055, 2.3, 6, T.gun, 1.6, 0, 0, true);
      cylX(THREE, bar, 0.075, 0.075, 0.32, 6, T.gun, 2.85, 0, 0);
      g.add(bar);
    }
    return g;
  }

  /* a ship's boat on its chocks [M] (the Luhu's [L]) */
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
  /* the twin 100 mm (PJ33 [E]) at rest pointing +X [A][J][X]: an angular
     house about 5.7 m long [A], 3.6 m wide and 2.85 m tall, vertical lower
     sides and a big sloped facet above them, the roof edges chamfered;
     two barrels of 56 calibres (5.6 m) from slots in the lower front,
     1.2 m apart; a sight hood each side of the roof.  Origin on the ring
     at the deck. */
  function pj33(THREE, g, T) {
    var s;
    cylZ(THREE, g, 1.9, 2.0, 0.3, 20, T.sup, -0.4, 0, 0.15);
    hexa(THREE, g, T.sup, [[-3.1, -1.8, 0.3], [2.6, -1.8, 0.3], [2.6, 1.8, 0.3], [-3.1, 1.8, 0.3],
                           [-3.1, -1.8, 1.35], [2.6, -1.8, 1.35], [2.6, 1.8, 1.35], [-3.1, 1.8, 1.35]]);
    hexa(THREE, g, T.sup, [[-3.1, -1.8, 1.35], [2.6, -1.8, 1.35], [2.6, 1.8, 1.35], [-3.1, 1.8, 1.35],
                           [-2.85, -1.3, 2.85], [0.9, -1.3, 2.85], [0.9, 1.3, 2.85], [-2.85, 1.3, 2.85]]);
    box(THREE, g, 0.1, 1.9, 0.9, T.dark, -3.12, 0, 1.3);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.08, 0.34, 0.9, T.dark, 2.62, s * 0.6, 0.95);
      box(THREE, g, 0.8, 0.45, 0.35, T.sup, -1.4, s * 0.85, 3.02);
      box(THREE, g, 0.06, 0.32, 0.16, T.glass, -0.98, s * 0.85, 3.04);
      var br = new THREE.Group(); br.position.set(2.6, s * 0.6, 0.95); br.rotation.y = -0.04;
      cylX(THREE, br, 0.2, 0.24, 0.7, 12, T.sup, 0.3, 0, 0);
      cylX(THREE, br, 0.085, 0.12, 5.0, 10, T.gun, 3.1, 0, 0, true);
      cylX(THREE, br, 0.11, 0.11, 0.3, 10, T.gun, 5.5, 0, 0);
      g.add(br);
    }
    return g;
  }

  /* octuple HQ-7 (Crotale naval) launcher [A][J][E]: a short drum on the
     01 deck, the turret body with the tracking radar on top, and two
     bundles of four canisters (two rows of two each side: [J] shows eight
     mouths in two rows across the front).  The Luhu's [L] on a lower drum.
     Origin on the roof. */
  function hq7(THREE, g, T) {
    var s, i, j, d = 1.0;
    cylZ(THREE, g, 1.7, 1.8, d, 20, T.sup, 0, 0, d / 2);
    cylZ(THREE, g, 1.25, 1.4, 0.3, 18, T.sup, 0, 0, d + 0.15);
    box(THREE, g, 2.2, 1.5, 1.4, T.sup, -0.2, 0, d + 1.0);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(0.62, 14, 6, 0, PI * 2, 0, PI / 2), T.dome);
    hd.rotation.x = PI / 2; hd.position.set(0.1, 0, d + 1.7); g.add(hd);
    cylZ(THREE, g, 0.62, 0.62, 0.3, 14, T.dome, 0.1, 0, d + 1.55);
    for (s = -1; s <= 1; s += 2) {
      var arm = new THREE.Group(); arm.position.set(0, s * 1.35, d + 0.95); arm.rotation.y = -0.08;
      box(THREE, arm, 0.5, 0.3, 0.3, T.metal, -0.2, -s * 0.45, 0);
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        cylX(THREE, arm, 0.2, 0.2, 2.6, 10, T.dome, 0.4, (i - 0.5) * 0.44, (j - 0.5) * 0.44);
        cylX(THREE, arm, 0.17, 0.17, 0.04, 10, T.dark, 1.72, (i - 0.5) * 0.44, (j - 0.5) * 0.44);
      }
      box(THREE, arm, 0.25, 0.95, 0.95, T.metal, -0.6, 0, 0);
      g.add(arm);
    }
    return g;
  }

  /* six-tube ASW rocket launcher (Type 3200 [E]), pointing +X [J][X][M]:
     a pedestal, a cradle and two rows of three tubes in a casing, as [M]
     shows the starboard one.  Origin on the deck. */
  function asw(THREE, g, T) {
    var i, j;
    cylZ(THREE, g, 0.5, 0.6, 0.8, 12, T.sup, 0, 0, 0.4);
    box(THREE, g, 0.9, 1.3, 0.5, T.sup, 0, 0, 1.0);
    var c = new THREE.Group(); c.position.set(0.1, 0, 1.55); c.rotation.y = -0.3;
    for (i = 0; i < 3; i++) for (j = 0; j < 2; j++) {
      cylX(THREE, c, 0.2, 0.2, 1.9, 10, T.sup, 0.3, (i - 1) * 0.44, (j - 0.5) * 0.44);
      cylX(THREE, c, 0.15, 0.15, 0.04, 10, T.dark, 1.26, (i - 1) * 0.44, (j - 0.5) * 0.44);
    }
    box(THREE, c, 0.3, 1.45, 1.0, T.metal, -0.75, 0, 0);
    box(THREE, c, 1.3, 0.12, 0.9, T.sup, 0.0, 0.78, 0);
    box(THREE, c, 1.3, 0.12, 0.9, T.sup, 0.0, -0.78, 0);
    g.add(c);
    return g;
  }

  /* one YJ-83 quad launcher: four box canisters 6.4 m long and 0.95 m
     square, two by two, trained outboard to side s (+1 port, -1
     starboard) and elevated el [A][B][E] (see NOT CONFIRMED).  The Luhu's
     [L].  Origin at the middle of the bundle; a cradle under it. */
  function yjBundle(THREE, g, T, s, el) {
    var yaw = new THREE.Group(); yaw.rotation.z = s * PI / 2; g.add(yaw);
    var c = new THREE.Group(); c.rotation.y = -el; yaw.add(c);
    var i, j, k;
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
      var y = (i - 0.5) * 0.98, z = (j - 0.5) * 0.98;
      box(THREE, c, 6.4, 0.95, 0.95, T.sup, 0, y, z);
      box(THREE, c, 0.06, 0.8, 0.8, T.metal, 3.22, y, z);
      box(THREE, c, 0.06, 0.8, 0.8, T.dark, -3.22, y, z);
      for (k = 0; k < 3; k++) box(THREE, c, 0.14, 1.0, 1.0, T.sup, -2.2 + k * 2.2, y, z);
    }
    box(THREE, c, 5.6, 2.2, 0.18, T.metal, -0.2, 0, -1.08);
    return c;
  }

  /* a director on a column: column, drum, dome and a dish forward (types
     NOT identified; the Luhu's [L]) */
  function director(THREE, g, T, x, z0, zc, rd) {
    var r = rd || 0.95;
    cylZ(THREE, g, r * 0.63, r * 0.79, zc - z0, 12, T.sup, x, 0, (z0 + zc) / 2);
    cylZ(THREE, g, r, r * 1.05, 1.1, 14, T.sup, x, 0, zc + 0.55);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 6, 0, PI * 2, 0, PI / 2), T.sup);
    hd.rotation.x = PI / 2; hd.scale.set(1, 1, 0.6); hd.position.set(x, 0, zc + 1.1); g.add(hd);
    box(THREE, g, 0.06, r * 0.95, 0.25, T.glass, x + r * 1.02, 0, zc + 0.7);
    dish(THREE, g, T.metal, r * 0.8, x + r * 1.25, 0, zc + 1.4, 1, 1);
  }
  /* a radome on a pedestal (types NOT identified) */
  function radome(THREE, g, T, x, y, z0, hp, r) {
    cylZ(THREE, g, r * 0.55, r * 0.7, hp, 12, T.sup, x, y, z0 + hp / 2);
    var sp = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 10), T.dome);
    sp.position.set(x, y, z0 + hp + r * 0.9); g.add(sp);
  }
  /* the yagi pair (Type 517 [E]) [A][J][M]: a boom about 5.5 m long on a
     pole, a crossed-dipole bay at each end, each about 2.6 m square;
     drawn with the boom fore and aft, as [A] and [M] show it.  Origin at
     the foot of the pole. */
  function yagi(THREE, g, T, x, z0, zb) {
    var s, k;
    strut(THREE, g, T.metal, x, 0, z0, x, 0, zb + 0.4, 0.13, 6);
    box(THREE, g, 1.2, 1.2, 0.1, T.metal, x, 0, zb - 1.4);
    strut(THREE, g, T.metal, x - 2.8, 0, zb, x + 2.8, 0, zb, 0.07, 5);
    for (s = -1; s <= 1; s += 2) {
      var bx = x + s * 2.2;
      strut(THREE, g, T.metal, bx, -1.3, zb - 1.3, bx, 1.3, zb + 1.3, 0.035, 3);
      strut(THREE, g, T.metal, bx, 1.3, zb - 1.3, bx, -1.3, zb + 1.3, 0.035, 3);
      for (k = -1; k <= 1; k += 2) {
        strut(THREE, g, T.metal, bx, -1.3, zb + k * 1.3, bx, 1.3, zb + k * 1.3, 0.03, 3);
        strut(THREE, g, T.metal, bx - 0.5, k * 1.3, zb - 1.3, bx - 0.5, k * 1.3, zb + 1.3, 0.025, 3);
      }
      strut(THREE, g, T.metal, bx - 0.5, 0, zb - 1.3, bx - 0.5, 0, zb + 1.3, 0.025, 3);
    }
  }
  /* the box funnel [B][J][M]: a casing raked aft, 8.0 m long at the 01
     deck and 6.6 m at the top, 5.4 m wide narrowing to 4.8, a dark band
     and the uptake grille at the top and the flat overhanging cap [M] */
  function stack(THREE, g, T, cx, z0, zt) {
    var h = zt - 0.7 - z0, f;
    hexa(THREE, g, T.sup, [[cx - 4.0, -2.7, z0], [cx + 4.0, -2.7, z0], [cx + 4.0, 2.7, z0], [cx - 4.0, 2.7, z0],
                           [cx - 3.0, -2.45, z0 + h], [cx + 3.6, -2.45, z0 + h], [cx + 3.6, 2.45, z0 + h], [cx - 3.0, 2.45, z0 + h]]);
    f = z0 + h;
    hexa(THREE, g, T.soot, [[cx - 3.0, -2.45, f], [cx + 3.6, -2.45, f], [cx + 3.6, 2.45, f], [cx - 3.0, 2.45, f],
                            [cx - 2.9, -2.4, zt], [cx + 3.6, -2.4, zt], [cx + 3.6, 2.4, zt], [cx - 2.9, 2.4, zt]]);
    box(THREE, g, 7.4, 5.3, 0.12, T.sup, cx + 0.5, 0, zt + 0.06);
    box(THREE, g, 5.2, 3.6, 0.06, T.dark, cx + 0.2, 0, zt + 0.13);
    box(THREE, g, 0.06, 4.0, 1.4, T.dark, cx + 3.62, 0, z0 + 1.6);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x;
    void M;

    /* hull shell in three bands (red anti-fouling, red boot, grey), the
       transom and the weather deck [A][J][X] */
    g.add(shellBand(THREE, T.under, -5, -0.35, 4));
    g.add(shellBand(THREE, T.boot, -0.35, 0.45, 1));
    g.add(shellBand(THREE, T.hull, 0.45, 9, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    for (s = -1; s <= 1; s += 2) {
      /* the openings in the side under the flight deck [A][J] */
      for (i = 0; i < 4; i++) {
        x = -45.5 - i * 2.9;
        box(THREE, g, 1.6, 0.2, 1.2, T.soot, x, s * (W(x, 3.6) + 0.02), 3.6);
      }
      /* scuttles */
      for (i = 0; i < 9; i++) {
        x = 34 - i * 2.4;
        box(THREE, g, 0.3, 0.05, 0.3, T.dark, x, s * (W(x, deckZ(x) - 1.0) + 0.02), deckZ(x) - 1.0);
      }
      for (i = 0; i < 10; i++) {
        x = 12 - i * 2.6;
        box(THREE, g, 0.3, 0.05, 0.3, T.dark, x, s * (W(x, 3.6) + 0.02), 3.6);
      }
    }
    /* the anchor in the stem [J][X] */
    box(THREE, g, 0.6, 1.0, 1.0, T.dark, 53.6, 0, 3.9);
    box(THREE, g, 0.5, 0.8, 1.1, T.gun, 53.9, 0, 3.5);

    /* ------------------------------------- the forward 01 house [A][X] */
    /* front x 26.7 on the forecastle, its roof the 01 deck (6.3), run aft
       into the raised side */
    polyPrism(THREE, g, T.sup, roundFront(17.5, 26.7, 5.45, 1.6, 4), 4.3, R01);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, 24.6, s * 5.47, 4.4 + 0.95);
      for (i = 0; i < 3; i++) box(THREE, g, 0.4, 0.06, 0.4, T.dark, 23.0 - i * 1.6, s * 5.47, R01 - 0.8);
    }
    roofRail(THREE, g, T, roundFront(17.5, 26.6, 5.35, 1.55, 3), R01, 0.9);
    /* HQ-7 at the front of the 01 deck [A][J] */
    var hq = new THREE.Group(); hq.position.set(24.3, 0, R01); hq7(THREE, hq, T); g.add(hq);
    /* the ASW rocket launchers and the forward twin 37 mm abreast [A][J][X][M] */
    for (s = -1; s <= 1; s += 2) {
      var aw = new THREE.Group(); aw.position.set(19.6, s * 3.9, R01); asw(THREE, aw, T); g.add(aw);
      var fm = new THREE.Group(); fm.position.set(15.5, s * 4.0, R01); twin37(THREE, fm, T); g.add(fm);
    }

    /* --------------------------------------------------------- bridge */
    /* the 02 block x 13.8 to -1.7 with rounded front corners [A][J] */
    polyPrism(THREE, g, T.sup, roundFront(-1.7, 13.8, 4.6, 1.5, 4), R01 - 0.05, R02);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 0.5, 0.06, 0.5, T.dark, 11.0 - i * 3.2, s * 4.62, R02 - 1.1);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, 1.2, s * 4.62, R01 + 0.95);
      /* life-raft canisters along the 01 deck edge [A][J] */
      for (i = 0; i < 5; i++) cylX(THREE, g, 0.34, 0.34, 1.3, 10, T.dome, 8.2 - i * 1.9, s * 5.35, R01 + 0.4);
    }
    roofRail(THREE, g, T, [[11.2, 4.5], [12.3, 4.5], [13.7, 3.1], [13.7, -3.1], [12.3, -4.5], [11.2, -4.5]], R02, 0.9);
    /* the wheelhouse x 11.0 to -0.7, windows across the front and the
       forward sides [J][A] */
    polyPrism(THREE, g, T.sup, roundFront(-0.7, 11.0, 4.0, 1.2, 3), R02 - 0.05, R03);
    hexa(THREE, g, T.glass, [[11.0, -2.9, R03 - 1.6], [11.05, -2.9, R03 - 1.6], [11.05, 2.9, R03 - 1.6], [11.0, 2.9, R03 - 1.6],
                             [11.0, -2.9, R03 - 0.6], [11.05, -2.9, R03 - 0.6], [11.05, 2.9, R03 - 0.6], [11.0, 2.9, R03 - 0.6]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 5.5, 0.06, 1.0, T.glass, 7.0, s * 4.02, R03 - 1.1);
      box(THREE, g, 1.0, 1.0, 1.0, T.glass, 10.3, s * 3.3, R03 - 1.1, s * 0.78);
    }
    /* two small radomes on the 02 roof forward of the wheelhouse (NOT
       identified) [A][J] */
    for (s = -1; s <= 1; s += 2) radome(THREE, g, T, 12.5, s * 2.6, R02, 0.8, 0.45);
    roofRail(THREE, g, T, [[0.0, 3.9], [9.8, 3.9], [10.9, 2.8], [10.9, -2.8], [9.8, -3.9], [0.0, -3.9]], R03, 0.9);
    /* the round director tower x 7.0 to 2.3 and the director [A][B][J] */
    polyPrism(THREE, g, T.sup, roundFront(2.3, 7.0, 2.1, 1.6, 4), R03 - 0.05, RTW);
    roofRail(THREE, g, T, roundFront(2.4, 6.9, 2.0, 1.5, 3), RTW, 0.8);
    director(THREE, g, T, 5.0, RTW, RTW + 0.6, 0.85);

    /* lattice foremast: legs x 2.3 / -1.7 on the wheelhouse roof tapering
       to a platform at 19.2, two yardarms, the curved reflector on the
       platform and a pole [A][B][J][M] */
    var fx = 0.3;
    lattice(THREE, g, T.metal, fx, 1.9, 1.8, 0.6, 0.6, R03, 19.2, 6, 0.13);
    polyPrism(THREE, g, T.metal, [[fx - 1.2, -1.2], [fx + 1.2, -1.2], [fx + 1.2, 1.2], [fx - 1.2, 1.2]], 19.2, 19.32);
    roofRail(THREE, g, T, [[fx - 1.2, 1.2], [fx + 1.2, 1.2], [fx + 1.2, -1.2], [fx - 1.2, -1.2], [fx - 1.2, 1.2]], 19.32, 0.7);
    polyPrism(THREE, g, T.metal, [[fx - 1.6, -1.8], [fx + 1.6, -1.8], [fx + 1.6, 1.8], [fx - 1.6, 1.8]], 15.6, 15.72);
    box(THREE, g, 0.25, 6.4, 0.14, T.metal, fx, 0, 17.2);
    box(THREE, g, 0.25, 4.0, 0.12, T.metal, fx, 0, 21.8);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, fx, s * 0.7, 16.4, fx, s * 3.0, 17.15, 0.035, 3);
      box(THREE, g, 0.4, 0.3, 0.3, T.metal, fx, s * 2.9, 17.4);
    }
    cylZ(THREE, g, 0.3, 0.38, 0.7, 8, T.metal, fx, 0, 19.67);
    var fr = new THREE.Group(); fr.position.set(fx, 0, 20.05);
    cheese(THREE, fr, T.metal, 4.4, 1.0, 0.5, 0, 0.55, 0);
    box(THREE, fr, 0.15, 4.2, 0.12, T.metal, 0, 0, 0.0);
    strut(THREE, fr, T.metal, 0, 0, 0.55, 1.2, 0, 0.55, 0.05, 3);
    g.add(fr);
    strut(THREE, g, T.metal, fx - 0.7, 0, 19.3, fx - 0.7, 0, 25.0, 0.06, 5);

    /* ------------------------------------- YJ-83 groups and the funnel */
    /* first group before the funnel, trained to starboard [A][B] */
    var ya = new THREE.Group(); ya.position.set(-4.2, 0, R01 + 1.9); g.add(ya);
    yjBundle(THREE, ya, T, -1, 0.26);
    cylZ(THREE, g, 0.55, 0.7, 1.2, 10, T.sup, -4.2, 0, R01 + 0.6);
    /* the box funnel x -6.7 to -14.2 [A][B][J][M] */
    stack(THREE, g, T, -10.4, R01 - 0.05, 12.6);
    /* second group abaft it on a leg stand, trained to port [A][B] */
    var yb = new THREE.Group(); yb.position.set(-16.6, 0, R01 + 2.4); g.add(yb);
    yjBundle(THREE, yb, T, 1, 0.26);
    var k, l;
    for (k = -1; k <= 1; k += 2) for (l = -1; l <= 1; l += 2)
      strut(THREE, g, T.metal, -16.6 + k * 0.9, l * 2.0, R01, -16.6 + k * 0.75, l * 1.7, R01 + 1.15, 0.08, 4);
    box(THREE, g, 1.8, 4.0, 0.15, T.metal, -16.6, 0, R01 + 1.2);

    /* -------------------------------------------- after superstructure */
    /* x -19.7 to the hangar face at -37.7, on the after deck (4.8), roof
       8.6 [A][B][J] */
    polyPrism(THREE, g, T.sup, chamferBox(-37.7, -19.7, 5.1, 1.0), RFD - 0.05, RAFT);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 0.5, 0.06, 0.5, T.dark, -22.0 - i * 2.6, s * 5.12, RAFT - 1.2);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, -33.5, s * 5.12, RFD + 1.0);
      /* the after pair of twin 37 mm on the roof [A][B][J][E] */
      cylZ(THREE, g, 1.1, 1.2, 0.5, 14, T.sup, -33.0, s * 3.0, RAFT + 0.25);
      var am = new THREE.Group(); am.position.set(-33.0, s * 3.0, RAFT + 0.5); am.rotation.z = PI; twin37(THREE, am, T); g.add(am);
    }
    roofRail(THREE, g, T, [[-20.7, 5.0], [-37.6, 5.0], [-37.6, -5.0], [-20.7, -5.0]], RAFT, 0.9);
    /* the hangar door, for one Z-9C [E] */
    box(THREE, g, 0.1, 7.6, 3.0, T.sup, -37.75, 0, RFD + 1.55);
    for (i = 0; i < 4; i++) box(THREE, g, 0.12, 7.6, 0.06, T.dark, -37.86, 0, RFD + 0.5 + i * 0.75);
    box(THREE, g, 0.14, 0.12, 3.0, T.dark, -37.77, 3.85, RFD + 1.55);
    box(THREE, g, 0.14, 0.12, 3.0, T.dark, -37.77, -3.85, RFD + 1.55);
    /* the yagi pair on its pole at the forward end [A][J][M] */
    yagi(THREE, g, T, -22.2, RAFT, 13.7);
    /* a director on its column with a dish [A][J] */
    director(THREE, g, T, -29.6, RAFT, 11.0, 0.8);
    /* the ship's boat on davits, starboard, under the yagi [M] */
    boat(THREE, g, T, -22.0, -5.25, RFD + 2.0, 6.0, 0.95, 0.55);
    for (i = -1; i <= 1; i += 2) {
      var dx = -22.0 + i * 2.0;
      strut(THREE, g, T.metal, dx, -4.9, RFD, dx, -5.0, RFD + 3.0, 0.07, 5);
      strut(THREE, g, T.metal, dx, -5.0, RFD + 3.0, dx, -5.25, RFD + 3.2, 0.06, 5);
    }
    /* flight deck markings: the circle and the line [A] */
    var ring = new THREE.Mesh(new THREE.RingGeometry(2.0, 2.2, 32), T.dome);
    ring.position.set(-48.5, 0, RFD + 0.02); g.add(ring);
    box(THREE, g, 15.0, 0.18, 0.02, T.dome, -46.5, 0, RFD + 0.015);

    /* -------------------------------------------- forecastle and gun */
    /* the breakwater x 42.8-39.8 [A], bollards, the cable gear */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 4.92, 0.15, 0.9, T.hull, 41.3, s * 1.95, deckZ(41.3) + 0.4, -s * 0.915);
      cylZ(THREE, g, 0.4, 0.5, 0.55, 10, T.metal, 46.5, s * 1.1, deckZ(46.5) + 0.27);
      for (i = 0; i < 3; i++) {
        var bxx = 48 - i * 10;
        cylZ(THREE, g, 0.15, 0.15, 0.4, 6, T.metal, bxx, s * (halfB(bxx) - 0.5), deckZ(bxx) + 0.2);
        cylZ(THREE, g, 0.15, 0.15, 0.4, 6, T.metal, bxx - 0.5, s * (halfB(bxx) - 0.5), deckZ(bxx) + 0.2);
      }
      box(THREE, g, 2.2, 0.16, 0.07, T.gun, 49.5, s * 0.8, deckZ(49.5) + 0.04, -s * 0.2);
    }
    box(THREE, g, 1.2, 1.0, 0.5, T.metal, 45.0, 0, deckZ(45.0) + 0.25);
    strut(THREE, g, T.metal, 55.2, 0, deckZ(55.2), 55.2, 0, deckZ(55.2) + 3.8, 0.05, 4);
    strut(THREE, g, T.metal, XS0 + 0.6, 0, RFD, XS0 + 0.6, 0, RFD + 4.0, 0.05, 4);
    /* mushroom vents */
    var vs = [[36.0, 2.6], [36.0, -2.6], [-52.0, 4.6], [-52.0, -4.6]];
    for (i = 0; i < vs.length; i++) {
      var vx = vs[i][0], vz = deckZ(vx);
      cylZ(THREE, g, 0.18, 0.18, 0.6, 8, T.sup, vx, vs[i][1], vz + 0.3);
      cylZ(THREE, g, 0.36, 0.18, 0.28, 8, T.sup, vx, vs[i][1], vz + 0.7);
    }

    /* underwater gear: two shafts in bossings, four-blade screws, two
       rudders ([E]: two shafts; the rest NOT seen) */
    for (s = -1; s <= 1; s += 2) {
      var bos = [];
      for (i = 0; i <= 5; i++) {
        var f = i / 5;
        bos.push(superRing(0.55 - f * 0.3, 0.55 - f * 0.3, -2.8 + f * 0.1, 1, 10).map(function (p) { return [s * 2.6 + p[0], p[1]]; }));
      }
      ringLoft(THREE, g, T.under, [-24, -32, -39, -44, -46.5, -48], bos, true);
      cylX(THREE, g, 0.18, 0.18, 1.4, 8, T.metal, -48.7, s * 2.6, -2.7);
      cylX(THREE, g, 0.34, 0.42, 0.8, 8, T.metal, -49.7, s * 2.6, -2.7);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.7, 1.45), T.metal);
        bl.position.set(-49.7, s * 2.6, -2.7); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.9); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.6, 0.26, 2.7, T.metal, -52.3, s * 2.6, -1.5);
      box(THREE, g, 28.0, 0.08, 0.5, T.under, -4.0, s * (W(-4, -3.3) + 0.15), -3.35);
    }

    /* rails along the deck edges */
    railRun(THREE, g, T, 18.0, 55.6, 3.2, 1.0);
    railRun(THREE, g, T, -18.5, 18.0, 4.0, 1.0);
    railRun(THREE, g, T, XS0 + 0.3, -20.8, 3.0, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.6, 1.0, 0.04, T.team, 21.6, 0, R01 + 0.02);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, -36.2, 0, RAFT + 0.02);
    box(THREE, g, 2.0, 0.9, 0.04, T.team, -54.0, 0, RFD + 0.02);

    /* the trained mount: the twin 100 mm [A][J][X] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(33.6, 0, deckZ(33.6)); pj33(THREE, tw, T);

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

/* Registration: len is the published overall length, 112 m.  One row,
   the as-built Jiangwei-II (see WHICH CLASS in the header). */
UNIT_MODELS["pla_e90_corvette"] = {
  len: 112.0,
  build: function (THREE, M, C) { return HeroJiangwei.build(THREE, M, C); }
};
