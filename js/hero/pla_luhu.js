/* ==================== js/hero/pla_luhu.js ==============================
   HERO MODEL -- Type 052 (NATO "Luhu") destroyer, Harbin (112) and
   Qingdao (113), as built in the mid-1990s: the original rounded twin
   100 mm mount forward, the octuple HQ-7 (Crotale) launcher on the raised
   deck behind it, four enclosed twin 37 mm, the forward funnel and the
   tall plated after funnel, two groups of YJ-8/YJ-83 quad box launchers
   amidships, the big Type 518 mesh array on the after superstructure, the
   hangar and the flight deck over an open quarterdeck.
   Key: pla_e90_destroyer only (js/eras.js: "Type 052 Luhu", era e90 only,
   service 1994; its radar comment names the Type 518 'Hai Ying' and a
   Sea Tiger beside it).  NOT the 2003/2005 low-signature gun, nor the
   2010-2011 refit (37 mm removed, Type 730 CIWS aft, Type 517 radar,
   quarterdeck enclosed [E]).

   WHICH FIT.  The row is e90 only, so this is the as-built fit.  The three
   colour photographs from 1997 and 2006 [H][P][Q] show it; the 2014 beam
   view [S] is after the refit and is used ONLY for the hull, the houses,
   the funnels and the launcher stations, which the refit did not move
   (compared against [H][P][Q] one by one below).  What [S] shows of the
   refit (single stealth gun, black funnel tops, radome on the after
   funnel, CIWS, the lattice mast aft, the enclosed stern) is not drawn.

   DIMENSIONS.  Published: 142.7 m overall, beam 15.1 m, draught 5.1 m,
   about 4,800 t full load (the brief's figures, the as-built ones).  The
   en.wikipedia infobox [E] quotes Jane's 2015-16, after the refit and its
   "hull work": 144 m, 16 m, 5.1 m, 4,674 t; js/warship_specs.js has 143 x
   15.9.  Drawn to 142.7 x 15.1 x 5.1 (the as-built figures for an as-built
   model); the 1-6 % difference is listed under NOT CONFIRMED.

   REFERENCES (Wikimedia Commons, fetched 1600-1800 px wide; en.wikipedia)
     [S] "PLANS Harbin (DDG-112) 20141228.jpg" (Japan MoD release, 2014):
         PORT BEAM of Harbin, bow left, from about 9 degrees above the
         horizon (read off the forecastle: its 15.1 m width shows as 2.45 m
         of height, sin = 0.16).  No line drawing of the class was found on
         Commons; this photograph is the measuring sheet: stem head px 38 to
         the stern at deck px 1785 = 142.7 m (12.24 px/m), waterline at
         image y 402 (just under the red boot line).  Heights of a near
         deck edge are read as they stand; tops of centreline objects 1.2 m
         lower (7.55 m half beam x 0.16).  Model x = 71.35 - (px - 38) /
         12.24.  Read off it:
           deck edge 7.3 at the stem head, 6.5 at x 66.3, 5.6 at 58.1, 5.1
             at 49.9, 4.66 at 40.1, 4.25 at 25.4, 4.1-4.2 from 1 to -48;
             the shell rises to the flight deck, about 7.0, abaft the
             hangar (x -51.4); stem at the waterline about x 64.5, the
             transom near vertical, about x -70 at the waterline;
           main gun centre x 45.9 (the refit's single mount stands where
             the twin stood, see [P]);
           the 01 house from x 40.3 (sloped front) aft, unbroken, to the
             hangar's after face at x -51.4, roof 7.2 (a man on the main
             deck at px 719 is 19 px tall: 2.8-3.0 m to the roof's near
             edge);
           HQ-7 launcher centre x 36.2 on the 01 roof, top 11.2;
           02 block front x 29.0, roof about 10.2;
           wheelhouse front x 22.6, window band about 12.4-13.2, roof 13.4,
             aft end x 11.1; a 04 block x 18.9-12.4 to about 16.0, with a
             radome on it at x 13.2, centre 18.7, about 2.2 m across;
           foremast lattice legs x 11.4 / 7.6 tapering to a platform at
             22.4, pole to 27.4;
           a house x 11.1 to 2.6 between the bridge and the funnel;
           forward funnel x 0.8 to -7.3, casing top about 12.0;
           first YJ group: two box bundles centred x -9.9 and -13.0, about
             4.5 m tall in profile, bottoms 7.7, tops 11.0;
           after funnel (the plated tower) x -15.0 to -19.9 at the base,
             tapering, top about 19.8;
           second YJ group: two box bundles on leg stands centred x -21.9
             and -24.8, z 8.4-10.4, legs down to the 01 roof;
           after superstructure x -28.1 to -51.4, roof about 10.2-10.4;
           flight deck x -51.4 to the stern, about 7.0.
     [H] "Chinese destroyer HARIBING (DDG 112).jpg" (US DoD, 1997, San
         Diego): PORT BOW 3/4 view of Harbin as built, from above.  The
         rounded twin 100 mm; the HQ-7 octuple launcher on its drum on the
         raised deck behind it; two domed twin 37 mm abreast on the 02
         deck before the wheelhouse; radomes on the bridge; the forward
         funnel as a casing with a thin dark cap and a top falling aft, its
         top about level with the wheelhouse roof; the plated after funnel
         with a crossyard near its top and a short pole; the low YJ boxes
         abaft it; the Type 518 mesh array on a pedestal at the forward end
         of the after superstructure; a director on a column abaft it; a
         domed twin 37 mm on the after superstructure; the flight deck; the
         open stern with three openings in the side; a boat abreast the
         funnel; the red boot topping; an anchor at the stem.
     [P] "Defense.gov News Photo 970309-N-9815L-005.jpg" (US DoD, 1997,
         Pearl Harbor): STARBOARD BOW of Harbin as built.  The twin 100 mm
         house close up (smooth, rounded edges and roof, two barrels); one
         FQF-2500 12-tube ASW rocket launcher beside it on the forecastle;
         the HQ-7 eight canisters (two rows of four) on the drum; both
         forward 37 mm domes; the lattice foremast with a crossyard and a
         curved reflector at its head; the big radome by the mast and the
         smaller ones on the bridge; the Type 518 array (measured against
         the after funnel's width as about 7.5 m wide by 4.6 m tall); a side
         anchor pocket near the bow; the open stern.
     [Q] "US Navy 060906-N-4856G-021 ... Qingdao (DDG 113) ... Pearl Harbor
         ... .jpg" (US Navy, 2006): STARBOARD BOW, nearly beam on, low.
         Before the 2010 refit; the gun had been changed in 2005 [E], the
         rest is the as-built fit: the 37 mm pairs fore and aft, the YJ
         boxes elevated at the foot of the after funnel, its crossyard
         (arms about 6 m each side), the Type 518 on its pedestal about 13 m
         abaft the after funnel, the boat abreast the forward funnel on its
         davits, the hangar and the open stern.
     [E] en.wikipedia "Type 052 destroyer": dimensions above; 4 x 4 YJ-83
         (YJ-8 as built), 1 x 8 HQ-7, 1 x twin 100 mm/56, four Type 76A
         twin 37 mm at construction (removed 2010, aft pair replaced by
         Type 730), 2 x triple 324 mm torpedo tubes, 2 x 12 FQF-2500, two
         Z-9C, hangar and landing platform; Type 518 air search as built;
         quarterdecks built open, enclosed in 2010.
     [L] js/hero/pla_luda.js (HeroLuda): the kit, the hull lofting, the
         37 mm mount, the funnel and the boat are taken from it and
         re-dimensioned to what [S][H][P][Q] show.

   RECOGNITION LIST (where each shows):
     1. Long flush hull with a flared, strongly raked bow rising to 7.3 m,
        low (4.1-4.2 m) amidships, the shell stepping up to the flight
        deck abaft the hangar [S][H][P] - STA, W(), zBot().
     2. The rounded twin 100 mm mount on the forecastle, the "turret"
        [H][P][E] - t100().
     3. The octuple HQ-7 on its drum on the raised deck behind the gun
        [S][H][P][E] - hq7().
     4. Two FQF-2500 rocket launchers abreast the gun [P][E] - fqf().
     5. Bridge: the 02 block with the two forward twin 37 mm, the
        wheelhouse, the 04 block with the big radome [S][H][P] - build().
     6. The lattice foremast with crossyard, platform and curved
        reflector [S][P][Q] - lattice(), cheese().
     7. Two funnels: the forward casing with a dark cap, the tall plated
        after funnel with a crossyard [S][H][Q] - funnel(), tower().
     8. Two groups of YJ quad box launchers amidships, the first elevated
        steeply at the foot of the after funnel, the second low on leg
        stands [S][H][Q][E] - yjBundle().
     9. The Type 518 mesh array on its pedestal over the after
        superstructure [H][P][Q][E] - hy518().
    10. The after superstructure: director on a column, the after pair of
        twin 37 mm, the hangar for two Z-9 [H][Q][E].
    11. The flight deck over the open quarterdeck, three openings each side
        at the stern, the open transom [H][P][Q][E].
    12. A boat each side abreast the forward funnel on davits [H][Q][S].
   NOT CONFIRMED (estimated or not drawn):
     - Length, beam: 142.7 / 15.1 m drawn, against 144 / 16 m in Jane's
       2015-16 [E] (post refit).  Heights are read off one photograph and
       are good to about +-0.5 m.  The half-breadths, the bilge, the
       underwater body and the stem's curve below the bow wave are the
       Luda's [L] scaled to 15.1 m: no reference shows them.
     - All widths across the ship (houses, funnels, launchers, the array's
       curvature) are estimated from the 3/4 views [H][P][Q]; the lengths
       and heights are measured off [S].
     - The YJ bundles: [S] shows each group as two bundles of boxes; drawn
       as 2 x 2 canisters trained outboard, the forward bundle of each group
       to port and the after one to starboard, the first group elevated 28
       degrees and the second 3 degrees (the elevations are what makes the
       profiles in [S] come out at 4.5 m and 2 m tall).  Which way each
       bundle faces is not resolved by any reference.  The 1990s YJ-8
       boxes are drawn the same as the YJ-83 boxes of 2006/2014.
     - Radar and director types: only the Type 518 array is identified
       (by [E] and the row text).  The curved reflector at the foremast
       head is drawn as a generic surface search reflector (the row text
       calls it Sea Tiger; not checked).  The Type 381 3D radar named in
       the brief is not seen in any reference of this ship and is NOT
       drawn.  The big radome and the small radomes on the bridge are
       drawn as plain spheres on pedestals, types not identified.
     - FQF-2500: [P] shows the starboard one; the port one is drawn by
       symmetry ([E]: two).  The tube layout (three rows of four) is
       estimated.
     - Torpedo tubes, ESM/ECM fits, sonar (VDS at the stern) and the
       helicopters are NOT drawn (not seen in the references).
     - Two shafts, two screws, two rudders: NOT seen; drawn as the minimum
       a twin-turbine ship needs.
     - Colour: light grey as the 1997 colour photographs [H][P] show it,
       with the red boot topping and anti-fouling they show; values set by
       eye, not sampled.  No hull numbers, names, ensigns or flags.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The row
   has turret:true and its first weapon is the 100 mm (w_e90_pla_
   destroyer): the twin 100 mm is the group named "turret"; everything
   else is baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLuhu = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -71.35, XS1 = 71.35, XWL = 64.5;   /* stern at deck, stem head, stem at the waterline [S] */

  /* HULL SECTION TABLE.  Deck heights at the side measured off [S]; half
     beams from the published 15.1 m, fined forward and aft as the Luda's
     [L]; bottom on the centreline to the 5.1 m draught; abaft x -51.4 the
     shell rises to the flight deck (7.0) over the open quarterdeck [S][H].
     x, deck z, half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power) */
  var STA = [
    [-71.35, 7.00, 6.10, 5.40,  0.60, 2.2],
    [-70.0,  7.00, 6.55, 6.00, -0.30, 2.3],
    [-66.0,  7.00, 7.00, 6.55, -1.90, 2.5],
    [-60.0,  7.00, 7.30, 6.95, -3.30, 2.7],
    [-51.6,  7.00, 7.50, 7.15, -4.30, 2.9],
    [-51.2,  4.20, 7.50, 7.15, -4.32, 2.9],
    [-35.0,  4.20, 7.55, 7.25, -4.90, 3.0],
    [-12.0,  4.15, 7.55, 7.25, -5.10, 3.0],
    [  6.0,  4.15, 7.55, 7.20, -5.10, 3.0],
    [ 20.0,  4.25, 7.45, 7.00, -5.05, 2.8],
    [ 30.0,  4.40, 7.15, 6.45, -4.95, 2.5],
    [ 40.0,  4.66, 6.55, 5.55, -4.70, 2.2],
    [ 48.0,  5.00, 5.75, 4.40, -4.30, 1.9],
    [ 55.0,  5.45, 4.65, 2.95, -3.50, 1.7],
    [ 60.0,  5.85, 3.55, 1.75, -2.40, 1.5],
    [ 64.5,  6.30, 2.55, 0.00,  0.00, 1.4],
    [ 68.0,  6.75, 1.45, 0.00,  0.00, 1.3],
    [ 71.35, 7.30, 0.20, 0.00,  0.00, 1.2]
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
  /* the raked stem from the waterline at XWL to the stem head [S];
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
  /* superstructure levels [S]: the 01 roofs, the 02 block, the wheelhouse
     roof, the 04 block, the house abaft the bridge, the after
     superstructure and hangar roof, the flight deck */
  var R01 = 7.2, R02 = 10.2, R03 = 13.4, R04 = 16.0, RBH = 12.6, RAFT = 10.4, RFD = 7.0;

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
    return canvasTex(THREE, "hull052", 512, 256, function (g, w, h) {
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
    return canvasTex(THREE, "plate052", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "deck052", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "grille052", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* paint: [H] and [P] are colour photographs of 1997.  They show a light
     grey hull and houses, a red boot topping and red anti-fouling, dark
     funnel caps, off-white radomes.  Values set by eye (NOT sampled), in
     the range of the Luda's [L] light grey */
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
    for (x = XS0; x < -64; x += 0.8) xs.push(x);
    for (x = 57; x < XS1; x += 1.0) xs.push(x);
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
  /* the small transom face at the end of the counter [S], hull paint; the open quarterdeck recess is added in build() */
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
     domed mounts of [H][P][Q]: the Luda's shell [L], about 2.4 m long,
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


  /* a funnel: an oval casing raked aft, its top falling aft, a dark cap
     and the uptake grille (the Luda's [L]) */
  function funnel(THREE, g, T, cx, L, B, z0, zf, za, rake) {
    var N = 22, j, ring = [], tr = Math.tan(rake);
    for (j = 0; j < N; j++) {
      var t = j / N * PI * 2, c = Math.cos(t), s = Math.sin(t);
      ring.push([L / 2 * Math.sign(c) * Math.pow(Math.abs(c), 0.5), B / 2 * Math.sign(s) * Math.pow(Math.abs(s), 0.5)]);
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
    band(T.sup, function () { return z0; }, function (px) { return zt(px) - 1.1; });
    band(T.soot, function (px) { return zt(px) - 1.1; }, function (px) { return zt(px); });
    var pos = [], uv = [], zc = zt(0) - 0.25;
    for (j = 0; j < N; j++) {
      var a = ring[j], b = ring[(j + 1) % N];
      pos.push(xAt(0, zc), 0, zc, xAt(a[0], zt(a[0]) - 0.25), a[1], zt(a[0]) - 0.25, xAt(b[0], zt(b[0]) - 0.25), b[1], zt(b[0]) - 0.25);
      uv.push(0.5, 0.5, a[0] / L + 0.5, a[1] / B + 0.5, b[0] / L + 0.5, b[1] / B + 0.5);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.dark));
    var zl = zt(-L / 2);
    for (j = -1; j <= 1; j += 2)
      strut(THREE, g, T.metal, xAt(-L / 2 + 0.3, z0 + 1), j * 0.6, z0 + 1, xAt(-L / 2 + 0.3, zl + 0.5) - 0.15, j * 0.6, zl + 0.5, 0.07, 5);
  }


  /* a ship's boat on its chocks [H][Q] (the Luda's [L]) */
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


  /* ------------------------------------------------------------ weapons */
  /* twin 100 mm as built, at rest pointing +X [H][P][E]: the smooth house
     with rounded edges and roof about 6.5 m long, 4.7 m wide and 2.9 m
     tall, two barrels of 56 calibres (5.6 m) 1.2 m apart from a mantlet in
     the face, sight hoods on the roof.  Origin on the ring at the deck. */
  function t100(THREE, g, T) {
    var s;
    cylZ(THREE, g, 2.25, 2.4, 0.4, 20, T.sup, -0.5, 0, 0.2);
    var xs = [-3.6, -3.45, -2.6, 0.6, 2.0, 2.65, 2.95];
    var sec = [[1.95, 1.05, 1.45], [2.25, 1.32, 1.6], [2.35, 1.4, 1.62], [2.35, 1.38, 1.6],
               [2.2, 1.25, 1.52], [1.95, 1.0, 1.42], [1.55, 0.72, 1.36]];
    var rings = sec.map(function (q) { return superRing(q[0], q[1], q[2], 0.55, 24); });
    ringLoft(THREE, g, T.sup, xs, rings, true);
    box(THREE, g, 0.1, 2.3, 1.0, T.dark, 2.95, 0, 1.4);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.9, 0.5, 0.4, T.sup, 0.2, s * 1.5, 3.1);
      box(THREE, g, 0.06, 0.36, 0.2, T.glass, 0.66, s * 1.5, 3.12);
      var br = new THREE.Group(); br.position.set(2.85, s * 0.6, 1.42); br.rotation.y = -0.05;
      cylX(THREE, br, 0.22, 0.26, 0.9, 12, T.sup, 0.35, 0, 0);
      cylX(THREE, br, 0.09, 0.125, 5.6, 10, T.gun, 3.3, 0, 0, true);
      cylX(THREE, br, 0.115, 0.115, 0.3, 10, T.gun, 6.0, 0, 0);
      g.add(br);
    }
    box(THREE, g, 0.12, 1.2, 1.3, T.dark, -3.58, 0, 1.3);
    return g;
  }

  /* octuple HQ-7 (Crotale naval) launcher [S][H][P][E]: a drum on the
     raised deck, the turret body with the tracking radar on top, and two
     bundles of four white canisters (two rows of two each side, as [P]
     shows two rows of four across the front).  Origin on the roof. */
  function hq7(THREE, g, T) {
    var s, i, j;
    cylZ(THREE, g, 1.7, 1.8, 1.9, 20, T.sup, 0, 0, 0.95);
    cylZ(THREE, g, 1.25, 1.4, 0.3, 18, T.sup, 0, 0, 2.05);
    box(THREE, g, 2.2, 1.5, 1.4, T.sup, -0.2, 0, 2.9);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(0.62, 14, 6, 0, PI * 2, 0, PI / 2), T.dome);
    hd.rotation.x = PI / 2; hd.position.set(0.1, 0, 3.6); g.add(hd);
    cylZ(THREE, g, 0.62, 0.62, 0.3, 14, T.dome, 0.1, 0, 3.45);
    for (s = -1; s <= 1; s += 2) {
      var arm = new THREE.Group(); arm.position.set(0, s * 1.35, 2.85); arm.rotation.y = -0.08;
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

  /* FQF-2500 twelve-tube ASW rocket launcher, pointing +X [P][E]: a
     pedestal, the cradle and three rows of four tubes (layout estimated) */
  function fqf(THREE, g, T) {
    var i, j;
    cylZ(THREE, g, 0.55, 0.65, 0.9, 12, T.sup, 0, 0, 0.45);
    box(THREE, g, 0.8, 1.2, 0.5, T.sup, 0, 0, 1.05);
    var c = new THREE.Group(); c.position.set(0.1, 0, 1.45); c.rotation.y = -0.26;
    for (i = 0; i < 4; i++) for (j = 0; j < 3; j++)
      cylX(THREE, c, 0.12, 0.12, 1.8, 8, T.sup, 0.3, (i - 1.5) * 0.27, (j - 1) * 0.27);
    box(THREE, c, 0.06, 1.15, 0.85, T.dark, 1.21, 0, 0);
    box(THREE, c, 0.2, 1.25, 0.95, T.metal, -0.5, 0, 0);
    g.add(c);
    return g;
  }

  /* one YJ quad launcher: four box canisters 6.4 m long and 0.95 m square,
     two by two, trained outboard to side s (+1 port, -1 starboard) and
     elevated el [S][Q][E] (see NOT CONFIRMED).  Origin at the middle of
     the bundle; a cradle under it. */
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

  /* Type 518 'Hai Ying' air search array [H][P][Q][E]: a curved mesh
     reflector about 7.5 m wide and 4.6 m tall, concave forward, on a
     turntable; ribs and chords, the mesh left open as the photographs show
     it.  Origin on the turntable. */
  function hy518(THREE, g, T) {
    var R = 7.0, A0 = 3.75 / R, NV = 9, NH = 5, Hh = 2.3, i, j, zc = 2.6, tilt = 0.08;
    cylZ(THREE, g, 0.55, 0.7, 0.6, 12, T.metal, 0, 0, 0.3);
    box(THREE, g, 1.0, 1.0, 1.2, T.metal, -0.6, 0, 1.0);
    function P(a, z) { return [-0.4 + R * (1 - Math.cos(a)) - (z - zc) * tilt, R * Math.sin(a), z]; }
    for (i = 0; i < NV; i++) {
      var a = -A0 + 2 * A0 * i / (NV - 1), p = P(a, zc - Hh), q = P(a, zc + Hh);
      strut(THREE, g, T.metal, p[0], p[1], p[2], q[0], q[1], q[2], i % 2 ? 0.035 : 0.06, 4);
    }
    for (j = 0; j < NH; j++) {
      var z = zc - Hh + 2 * Hh * j / (NH - 1);
      for (i = 0; i < 12; i++) {
        var a0 = -A0 + 2 * A0 * i / 12, a1 = -A0 + 2 * A0 * (i + 1) / 12;
        var u = P(a0, z), v = P(a1, z);
        strut(THREE, g, T.metal, u[0], u[1], u[2], v[0], v[1], v[2], j % 2 ? 0.03 : 0.05, 4);
        if (j < NH - 1 && i % 2 === 0) {
          var w = P(a1, z + 2 * Hh / (NH - 1));
          strut(THREE, g, T.metal, u[0], u[1], u[2], w[0], w[1], w[2], 0.025, 3);
        }
      }
    }
    /* backing frame to the turntable */
    var c0 = P(0, zc);
    strut(THREE, g, T.metal, -0.6, 0, 1.5, c0[0] - 0.05, 0, zc, 0.12, 6);
    for (i = -1; i <= 1; i += 2) {
      var e = P(i * A0 * 0.6, zc - Hh * 0.5), f = P(i * A0 * 0.6, zc + Hh * 0.6);
      strut(THREE, g, T.metal, -0.6, 0, 1.5, e[0] - 0.05, e[1], e[2], 0.07, 5);
      strut(THREE, g, T.metal, -0.6, 0, 1.6, f[0] - 0.05, f[1], f[2], 0.07, 5);
    }
  }

  /* the after funnel [S][H][Q]: a tall plated tower tapering from 4.9 x 4.2
     m at the 01 roof to 3.2 x 3.0 m at 19.8 m, the uptake grille and a thin
     dark band at its head, a railed platform part way up, the crossyard
     near the top (arms about 6 m each side [Q]) and a short pole with a
     small dark drum (NOT identified) [H] */
  function tower(THREE, g, T, cx, z0, zt) {
    var s;
    tprism(THREE, g, 4.9, 4.2, 3.4, 3.1, zt - 0.6 - z0, T.sup, cx, 0, (z0 + zt - 0.6) / 2);
    tprism(THREE, g, 3.4, 3.1, 3.2, 3.0, 0.6, T.soot, cx, 0, zt - 0.3);
    box(THREE, g, 2.8, 2.6, 0.06, T.dark, cx, 0, zt + 0.01);
    polyPrism(THREE, g, T.metal, [[cx - 2.6, -2.5], [cx + 2.6, -2.5], [cx + 2.6, 2.5], [cx - 2.6, 2.5]], 15.2, 15.32);
    roofRail(THREE, g, T, [[cx - 2.6, 2.5], [cx + 2.6, 2.5], [cx + 2.6, -2.5], [cx - 2.6, -2.5], [cx - 2.6, 2.5]], 15.32, 0.8);
    box(THREE, g, 0.3, 12.0, 0.25, T.metal, cx + 0.3, 0, zt - 1.0);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, cx + 0.3, s * 1.6, zt - 2.6, cx + 0.3, s * 4.5, zt - 1.05, 0.06, 4);
      box(THREE, g, 0.9, 0.25, 0.25, T.metal, cx + 0.3, s * 5.4, zt - 0.8);
      strut(THREE, g, T.metal, cx + 0.3, s * 5.8, zt - 0.9, cx + 0.3, s * 5.8, zt + 0.4, 0.03, 3);
    }
    strut(THREE, g, T.metal, cx - 0.5, 0, zt, cx - 0.5, 0, zt + 3.4, 0.09, 6);
    cylZ(THREE, g, 0.32, 0.32, 0.8, 10, T.soot, cx - 0.5, 0, zt + 2.6);
  }

  /* a director on a column (after superstructure [H]): column, drum, dome
     and a small dish forward (type NOT identified) */
  function director(THREE, g, T, x, z0, zc) {
    cylZ(THREE, g, 0.6, 0.75, zc - z0, 12, T.sup, x, 0, (z0 + zc) / 2);
    cylZ(THREE, g, 0.95, 1.0, 1.1, 14, T.sup, x, 0, zc + 0.55);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(0.95, 14, 6, 0, PI * 2, 0, PI / 2), T.sup);
    hd.rotation.x = PI / 2; hd.scale.set(1, 1, 0.6); hd.position.set(x, 0, zc + 1.1); g.add(hd);
    box(THREE, g, 0.06, 0.9, 0.25, T.glass, x + 0.97, 0, zc + 0.7);
    dish(THREE, g, T.metal, 0.75, x + 1.2, 0, zc + 1.4, 1, 1);
  }
  /* a radome on a pedestal [S][H][P] */
  function radome(THREE, g, T, x, y, z0, hp, r) {
    cylZ(THREE, g, r * 0.55, r * 0.7, hp, 12, T.sup, x, y, z0 + hp / 2);
    var sp = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 10), T.dome);
    sp.position.set(x, y, z0 + hp + r * 0.9); g.add(sp);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x;
    void M;

    /* hull shell in three bands (red anti-fouling, red boot, grey), the
       transom, the weather deck and the flight deck [S][H][P] */
    g.add(shellBand(THREE, T.under, -6, -0.4, 4));
    g.add(shellBand(THREE, T.boot, -0.4, 0.5, 1));
    g.add(shellBand(THREE, T.hull, 0.5, 12, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    /* the step up to the flight deck at the hangar's after face */
    box(THREE, g, 0.3, 14.9, 2.8, T.hull, -51.45, 0, 5.6);
    /* the open quarterdeck under the flight deck [H][P][E]: the transom
       open across its middle, three openings each side near the stern */
    box(THREE, g, 0.06, 8.6, 2.3, T.soot, XS0 - 0.12, 0, 5.55);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) {
        x = -69.6 + i * 2.0;
        box(THREE, g, 1.3, 0.08, 1.5, T.soot, x, s * (halfB(x) + 0.02), 5.6);
      }
      /* side anchor pockets near the bow [P] (port by symmetry) */
      var ax = 61.0, az = 4.6, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 1.8, 0.12, 1.4, T.dark, ax, ay, az);
      box(THREE, g, 1.2, 0.2, 1.1, T.gun, ax + 0.1, ay + s * 0.05, az - 0.15);
      /* scuttles */
      for (i = 0; i < 14; i++) {
        x = 44 - i * 2.6;
        box(THREE, g, 0.32, 0.05, 0.32, T.dark, x, s * (W(x, deckZ(x) - 1.0) + 0.02), deckZ(x) - 1.0);
      }
      for (i = 0; i < 8; i++) {
        x = -30 - i * 2.6;
        box(THREE, g, 0.32, 0.05, 0.32, T.dark, x, s * (W(x, 3.2) + 0.02), 3.2);
      }
    }
    /* the anchor at the stem [H] */
    box(THREE, g, 0.6, 1.1, 1.1, T.dark, 68.3, 0, 4.4);
    box(THREE, g, 0.5, 0.9, 1.2, T.gun, 68.6, 0, 4.0);

    /* --------------------------------------------- the 01 house [S][H] */
    polyPrism(THREE, g, T.sup, [[-51.4, -5.5], [36.6, -5.5], [40.3, -3.3], [40.3, 3.3], [36.6, 5.5], [-51.4, 5.5]],
              4.1, R01);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 6; i++) box(THREE, g, 0.9, 0.06, 1.8, T.dark, 33.0 - i * 13.5, s * 5.52, deckZ(33 - i * 13.5) + 1.05);
      for (i = 0; i < 9; i++) box(THREE, g, 0.4, 0.06, 0.4, T.dark, 27.0 - i * 2.8, s * 5.52, R01 - 1.0);
      /* life-raft canisters on the roof edge [S] */
      for (i = 0; i < 3; i++) cylX(THREE, g, 0.36, 0.36, 1.4, 10, T.dome, 19.5 + i * 1.8, s * 5.0, R01 + 0.4);
    }
    roofRail(THREE, g, T, [[29.2, 5.4], [36.6, 5.4], [40.2, 3.25], [40.2, -3.25], [36.6, -5.4], [29.2, -5.4]], R01, 0.9);
    roofRail(THREE, g, T, [[2.4, 5.4], [-28.0, 5.4]], R01, 0.9);
    roofRail(THREE, g, T, [[2.4, -5.4], [-28.0, -5.4]], R01, 0.9);

    /* HQ-7 on its drum on the raised deck behind the gun [S][H][P] */
    var hq = new THREE.Group(); hq.position.set(36.2, 0, R01); hq7(THREE, hq, T); g.add(hq);

    /* --------------------------------------------------------- bridge */
    /* the 02 block x 11.1-29.0 [S], the two forward twin 37 mm abreast on
       its roof before the wheelhouse [H][P][Q] */
    polyPrism(THREE, g, T.sup, chamferBox(11.1, 29.0, 4.6, 1.3), R01 - 0.05, R02);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 0.5, 0.06, 0.5, T.dark, 13.0 + i * 3.0, s * 4.62, R02 - 1.2);
      var fm = new THREE.Group(); fm.position.set(26.4, s * 2.7, R02); twin37(THREE, fm, T); g.add(fm);
    }
    roofRail(THREE, g, T, [[22.8, 4.5], [27.7, 4.5], [29.0, 3.2], [29.0, -3.2], [27.7, -4.5], [22.8, -4.5]], R02, 0.9);
    /* the wheelhouse x 11.1-22.6, its face raked a little [S][P] */
    hexa(THREE, g, T.sup, [[11.1, -4.2, R02 - 0.05], [22.6, -4.2, R02 - 0.05], [22.6, 4.2, R02 - 0.05], [11.1, 4.2, R02 - 0.05],
                           [11.1, -4.1, R03], [22.1, -4.1, R03], [22.1, 4.1, R03], [11.1, 4.1, R03]]);
    hexa(THREE, g, T.glass, [[22.43, -3.9, R03 - 1.3], [22.5, -3.9, R03 - 1.3], [22.5, 3.9, R03 - 1.3], [22.43, 3.9, R03 - 1.3],
                             [22.2, -3.85, R03 - 0.4], [22.27, -3.85, R03 - 0.4], [22.27, 3.85, R03 - 0.4], [22.2, 3.85, R03 - 0.4]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 6.5, 0.06, 0.8, T.glass, 18.4, s * 4.16, R03 - 0.9);
      cylX(THREE, g, 0.3, 0.3, 0.45, 12, T.metal, 21.2, s * 3.7, R03 + 0.4);
    }
    roofRail(THREE, g, T, [[18.9, 4.0], [22.0, 4.0], [22.0, -4.0], [18.9, -4.0]], R03, 0.9);
    /* two small radomes on the wheelhouse roof [P] (types NOT identified) */
    for (s = -1; s <= 1; s += 2) radome(THREE, g, T, 20.6, s * 2.7, R03, 0.9, 0.55);
    /* the 04 block and the big radome on it [S][H][P] */
    polyPrism(THREE, g, T.sup, chamferBox(12.4, 18.9, 2.7, 0.6), R03 - 0.05, R04);
    roofRail(THREE, g, T, [[12.4, 2.6], [18.8, 2.6], [18.8, -2.6], [12.4, -2.6]], R04, 0.9);
    radome(THREE, g, T, 13.6, 0, R04, 1.5, 1.15);
    /* the house between the bridge and the forward funnel, x 2.6-11.1 [S] */
    polyPrism(THREE, g, T.sup, [[2.6, -4.2], [11.15, -4.2], [11.15, 4.2], [2.6, 4.2]], R01 - 0.05, RBH);
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 3; i++) box(THREE, g, 0.5, 0.06, 0.5, T.dark, 4.0 + i * 2.4, s * 4.22, RBH - 1.3);
    roofRail(THREE, g, T, [[2.7, 4.1], [11.0, 4.1]], RBH, 0.9);
    roofRail(THREE, g, T, [[2.7, -4.1], [11.0, -4.1]], RBH, 0.9);
    roofRail(THREE, g, T, [[2.7, 4.1], [2.7, -4.1]], RBH, 0.9);

    /* lattice foremast: legs x 11.4 / 7.6 on the house roof tapering to the
       platform at 22.4, a crossyard, the curved reflector on the platform
       and the pole to 27.4 [S][P][Q] */
    var fx = 9.5;
    lattice(THREE, g, T.metal, fx, 1.9, 1.8, 0.65, 0.65, RBH, 22.4, 6, 0.15);
    polyPrism(THREE, g, T.metal, [[fx - 1.3, -1.3], [fx + 1.3, -1.3], [fx + 1.3, 1.3], [fx - 1.3, 1.3]], 22.4, 22.54);
    roofRail(THREE, g, T, [[fx - 1.3, 1.3], [fx + 1.3, 1.3], [fx + 1.3, -1.3], [fx - 1.3, -1.3], [fx - 1.3, 1.3]], 22.54, 0.7);
    box(THREE, g, 0.3, 7.6, 0.15, T.metal, fx + 0.2, 0, 20.3);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, fx + 0.2, s * 0.8, 19.4, fx + 0.2, s * 3.6, 20.3, 0.04, 3);
      box(THREE, g, 0.5, 0.3, 0.3, T.metal, fx + 0.2, s * 3.5, 20.55);
    }
    cylZ(THREE, g, 0.3, 0.4, 0.9, 8, T.metal, fx + 0.3, 0, 22.99);
    var fr = new THREE.Group(); fr.position.set(fx + 0.3, 0, 23.45);
    cheese(THREE, fr, T.metal, 4.6, 1.1, 0.5, 0, 0.55, 0);
    box(THREE, fr, 0.15, 4.4, 0.12, T.metal, 0, 0, 0.0);
    strut(THREE, fr, T.metal, 0, 0, 0.55, 1.3, 0, 0.55, 0.05, 3);
    g.add(fr);
    strut(THREE, g, T.metal, fx - 0.8, 0, 22.5, fx - 0.8, 0, 27.4, 0.07, 5);
    box(THREE, g, 0.1, 3.0, 0.1, T.metal, fx - 0.8, 0, 26.0);

    /* ------------------------------------- forward funnel and the boats */
    /* the casing x 0.8 to -7.3, its top falling aft under a dark cap,
       about level with the wheelhouse roof [S][H] */
    funnel(THREE, g, T, -3.25, 7.4, 5.4, R01, 13.4, 12.7, 0.05);
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T, -1.8, s * 5.0, R01 + 0.75, 5.2, 0.9, 0.5);
      for (i = -1; i <= 1; i += 2) {
        var dx = -1.8 + i * 1.8;
        strut(THREE, g, T.metal, dx, s * 4.4, R01, dx, s * 4.5, R01 + 2.1, 0.07, 5);
        strut(THREE, g, T.metal, dx, s * 4.5, R01 + 2.1, dx, s * 5.0, R01 + 2.3, 0.06, 5);
      }
    }

    /* ----------------------------------- YJ groups and the after funnel */
    /* first group: two bundles at the foot of the after funnel, elevated
       28 degrees, on columns [S][Q] */
    [[-9.9, 1], [-13.0, -1]].forEach(function (q) {
      var b = new THREE.Group(); b.position.set(q[0], 0, 10.0); g.add(b);
      yjBundle(THREE, b, T, q[1], 0.49);
      cylZ(THREE, g, 0.55, 0.7, 1.9, 10, T.sup, q[0], 0, R01 + 0.95);
    });
    tower(THREE, g, T, -17.45, R01 - 0.05, 19.8);
    /* second group: two bundles nearly level on leg stands [S][H] */
    [[-21.9, 1], [-24.8, -1]].forEach(function (q) {
      var b = new THREE.Group(); b.position.set(q[0], 0, 9.45); g.add(b);
      yjBundle(THREE, b, T, q[1], 0.05);
      var k, l;
      for (k = -1; k <= 1; k += 2) for (l = -1; l <= 1; l += 2)
        strut(THREE, g, T.metal, q[0] + k * 0.9, l * 2.6, R01, q[0] + k * 0.75, l * 2.3, 8.3, 0.08, 4);
      box(THREE, g, 1.8, 5.4, 0.15, T.metal, q[0], 0, 8.3);
    });

    /* -------------------------------------------- after superstructure */
    /* x -28.1 to the hangar's after face at -51.4, roof 10.4 [S][H][Q] */
    polyPrism(THREE, g, T.sup, [[-51.4, -5.2], [-29.3, -5.2], [-28.1, -4.0], [-28.1, 4.0], [-29.3, 5.2], [-51.4, 5.2]],
              R01 - 0.05, RAFT);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 0.5, 0.06, 0.5, T.dark, -31.0 - i * 2.6, s * 5.22, RAFT - 1.2);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, -40.5, s * 5.22, R01 + 1.05);
      /* the after pair of twin 37 mm on the hangar roof [H][Q] */
      cylZ(THREE, g, 1.1, 1.2, 0.5, 14, T.sup, -45.6, s * 3.3, RAFT + 0.25);
      var am = new THREE.Group(); am.position.set(-45.6, s * 3.3, RAFT + 0.5); am.rotation.z = PI; twin37(THREE, am, T); g.add(am);
    }
    roofRail(THREE, g, T, [[-29.3, 5.1], [-51.3, 5.1], [-51.3, -5.1], [-29.3, -5.1]], RAFT, 0.9);
    /* the hangar door, for two Z-9 [E] */
    box(THREE, g, 0.1, 8.8, 3.1, T.sup, -51.45, 0, RFD + 1.6);
    for (i = 0; i < 4; i++) box(THREE, g, 0.12, 8.8, 0.06, T.dark, -51.56, 0, RFD + 0.5 + i * 0.75);
    box(THREE, g, 0.14, 0.12, 3.1, T.dark, -51.47, 4.45, RFD + 1.6);
    box(THREE, g, 0.14, 0.12, 3.1, T.dark, -51.47, -4.45, RFD + 1.6);
    /* the Type 518 on its pedestal at the forward end [H][P][Q] */
    tprism(THREE, g, 2.0, 2.0, 1.3, 1.3, 1.8, T.sup, -31.0, 0, RAFT + 0.9);
    var ra = new THREE.Group(); ra.position.set(-31.0, 0, RAFT + 1.8); hy518(THREE, ra, T); g.add(ra);
    /* the director on its column abaft it [H] */
    director(THREE, g, T, -37.6, RAFT, 12.0);
    /* a radome either side abaft the director (types NOT identified) [H][Q] */
    for (s = -1; s <= 1; s += 2) radome(THREE, g, T, -40.5, s * 3.2, RAFT, 0.7, 0.6);

    /* -------------------------------------------- forecastle and gun */
    var fq;
    for (s = -1; s <= 1; s += 2) {
      fq = new THREE.Group(); fq.position.set(49.0, s * 4.0, deckZ(49.0)); fqf(THREE, fq, T); g.add(fq);
      cylZ(THREE, g, 0.45, 0.55, 0.6, 10, T.metal, 60.5, s * 1.3, deckZ(60.5) + 0.3);
      for (i = 0; i < 5; i++) {
        var bxx = 56 - i * 26;
        cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, bxx, s * (halfB(bxx) - 0.55), deckZ(bxx) + 0.22);
        cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, bxx - 0.6, s * (halfB(bxx) - 0.55), deckZ(bxx) + 0.22);
      }
      box(THREE, g, 2.6, 0.18, 0.08, T.gun, 62.5, s * 0.9, deckZ(62.5) + 0.05, -s * 0.2);
    }
    box(THREE, g, 1.4, 1.2, 0.55, T.metal, 58.6, 0, deckZ(58.6) + 0.27);
    strut(THREE, g, T.metal, 70.4, 0, deckZ(70.4), 70.4, 0, deckZ(70.4) + 4.2, 0.05, 4);
    strut(THREE, g, T.metal, XS0 + 0.8, 0, RFD, XS0 + 0.8, 0, RFD + 4.5, 0.06, 4);
    /* mushroom vents on the weather deck */
    var vs = [[54.0, 2.4], [54.0, -2.4], [42.0, 4.3], [42.0, -4.3], [-48.0, 6.4], [-48.0, -6.4], [12.0, 6.4], [12.0, -6.4]];
    for (i = 0; i < vs.length; i++) {
      var vx = vs[i][0], vz = deckZ(vx);
      cylZ(THREE, g, 0.2, 0.2, 0.7, 8, T.sup, vx, vs[i][1], vz + 0.35);
      cylZ(THREE, g, 0.4, 0.2, 0.3, 8, T.sup, vx, vs[i][1], vz + 0.8);
    }

    /* underwater gear: two shafts in bossings, four-blade screws, two
       rudders (NOT seen in any reference; see NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) {
      var bos = [];
      for (i = 0; i <= 5; i++) {
        var f = i / 5;
        bos.push(superRing(0.65 - f * 0.35, 0.65 - f * 0.35, -3.3 + f * 0.1, 1, 10).map(function (p) { return [s * 3.2 + p[0], p[1]]; }));
      }
      ringLoft(THREE, g, T.under, [-32, -41, -50, -56, -59, -61], bos, true);
      cylX(THREE, g, 0.22, 0.22, 1.6, 8, T.metal, -61.8, s * 3.2, -3.2);
      cylX(THREE, g, 0.4, 0.5, 0.9, 8, T.metal, -62.9, s * 3.2, -3.2);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 1.7), T.metal);
        bl.position.set(-62.9, s * 3.2, -3.2); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(1.05); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 3.0, 0.3, 3.2, T.metal, -66.0, s * 3.2, -1.7);
      box(THREE, g, 34.0, 0.08, 0.6, T.under, -6.0, s * (W(-6, -3.9) + 0.2), -3.95);
    }

    /* rails along the deck edges and the flight deck */
    railRun(THREE, g, T, -51.0, 44.0, 4.6, 1.0);
    railRun(THREE, g, T, 44.0, 70.6, 3.6, 1.0);
    railRun(THREE, g, T, XS0 + 0.4, -51.8, 3.0, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 39.0, 0, R01 + 0.02);
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -26.6, 0, R01 + 0.02);
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -49.6, 0, RAFT + 0.02);

    /* the trained mount: the twin 100 mm [H][P][E] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(45.9, 0, deckZ(45.9)); t100(THREE, tw, T);

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

/* Registration: len is the published overall length, 142.7 m.  One row,
   the as-built e90 fit (see WHICH FIT in the header). */
UNIT_MODELS["pla_e90_destroyer"] = {
  len: 142.7,
  build: function (THREE, M, C) { return HeroLuhu.build(THREE, M, C); }
};
