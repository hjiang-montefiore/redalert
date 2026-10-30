/* ==================== js/hero/pla_luda.js ==============================
   HERO MODEL -- Type 051 (NATO "Luda") destroyer, the PLAN's first
   indigenous destroyer, as the gun-and-HY-2 ship of the 1970s and 1980s:
   two twin 130 mm mounts fore and aft, two triple HY-1/HY-2 (P-15 / Styx
   derived) launchers amidships, four enclosed twin 37 mm, two funnels with
   sloped dark caps, two lattice masts and the gun director on the bridge.
   Keys: pla_e60_destroyer (e60, service 1971) and pla_e80_destroyer (e80,
   service 1971; the row's text says later hulls and refits added HQ-7 and
   helicopter decks).  NOT the 1987 Luda II helicopter conversion of Jinan,
   the 051DT / 051G HQ-7 refits (en.wikipedia dates the Kaifeng/Dalian and
   Zhuhai refits to the 1990s and 1999), nor the 051Z.

   ONE FIT FOR BOTH ROWS.  The two dated beam views [X] (Xi'an, a first
   batch Type 051, 1993) and [D] (Dalian, a second batch 051D, 1988) show
   the same layout and, measured against each other (mast, funnel and
   launcher heights as ratios of the funnel height in each picture), the
   same masts, radars, guns and launchers; the 051D's changes are
   "electronics" and underway replenishment [E], which these pictures do
   not resolve.  So the 1970s fit and the 1980s fit are drawn the same and
   both keys register the same builder.

   DIMENSIONS [E]: 132 m overall, beam 12.8 m, draught 4.6 m, 3,670 t.
   No hull depth or freeboard is published in the references reached: the
   freeboards below are measured off [X] (see the NOT CONFIRMED list).

   REFERENCES (Wikimedia Commons, fetched at width 1600; English Wikipedia)
     [X] "Chinese guided missile destroyer XIAN (DDG 106).JPEG", US Navy
         DN-SN-94-00789, dated 1993-05-01: a PORT BEAM view of the whole
         ship, bow left, from about 12 degrees above the horizon.  No
         standard-scale line drawing of the class was found on Commons
         (searched "Luda profile", "Type 051 drawing", the class and ship
         categories); Navypedia is not reachable from this machine.  So
         this photograph is the measuring sheet: stem head at px 90 to the
         top of the raked transom at px 1560 = 132 m (11.14 px/m), the
         waterline taken 0.5 m under the lower edge of the light paint
         (the boot topping hides it).  Heights of centreline objects are
         read 1.3 m lower than their image height to take out the camera's
         elevation (half the beam x sin 12 deg); heights at the near deck
         edge are read as they stand.  Read off it (model x, + forward,
         metres; z above the waterline):
           deck edge 8.0 at the stem head x 66.0, 7.6 at 56, 6.4 at 47, 5.2
             at 38, 4.4 at 29, 4.1-4.4 from 20 to -25, 4.0 at -43, 3.8 at
             the stern; stem meets the water at x 61.1; transom raked from
             x -66.0 at the deck to -63.3 at its foot, 0.5 m up;
           forward 130 mm mount x 38.3-46.9, roof 9.4;
           low forward house x 27-37 with a small enclosed twin mount on it
             at x 30-32.6;
           bridge front x 27.2, wheelhouse roof about 13.6, the open deck of
             the wings about 10, bridge aft end x 14.8;
           director on a column over the wheelhouse x 15.6-18.4, its top
             about 19;
           foremast: lattice legs from x 14.1 / 11.2 at about 7 m, tapering
             to a platform at x 12.7, about 20.5 m; an antenna on it to
             about 24.4 m, a pole and aerial to about 26 m;
           forward funnel x 7.6-11.2 at the top, its top sloping from about
             11.7 forward to 10.5 aft, dark cap;
           forward launcher, its box from x 6.5 (front end, raised) to -2.9;
           mainmast on a plated base x -3.3 to -7.2 (roof about 9.3), legs
             x -4.5 / -8.7 tapering to a platform at about 18 m; a wide
             antenna over it to about 19.5 m;
           a pole at x -12.3 to about 14.5 m with a yard;
           after funnel x -16.6 to -20.6 at the top, 11.4 forward, 10.0 aft;
           after launcher x -21.6 (raised front end) to -31.2;
           after deckhouse x -31.9 to -42.7, roof about 6.7, a director on
             a column at x -33.7 (top about 11), a small enclosed twin
             mount at x -39.1;
           after 130 mm mount x -42.7 to -50.7, roof about 8, trained aft;
           quarterdeck gear x -51 to -64; ensign staff x -64.9.
     [D] "Luda DN-SN-89-03098.jpg", US Navy, dated 1988-01-01: STARBOARD
         beam of Dalian (110), a 051D, bow and stern cut off by the frame.
         The same order and spacing as [X] from the after 130 mm to the
         forward one; both launchers shown as three boxes side by side,
         raised at the front end, on trainers; the funnels' tops sloping
         down aft under dark caps; the director drum with its dish over the
         bridge; a boat on the 01 level abaft the bridge; the antenna on
         the mainmast seen end-on (so a rotating antenna, as [X] shows it
         broadside); the flat-sided 130 mm mounts with sloped faces.
     [E] en.wikipedia "Type 051 destroyer" (Luda-class destroyer redirects
         there): dimensions as above; Type 051 = Soviet-derived systems,
         two triple HY-1 (possibly later HY-2) launchers, two twin 130 mm
         (SM-2-1 derivatives), four twin 37 mm (Bussert) - the infobox
         instead lists 4 x 2 Type 66 57 mm for the 051 and 4 x 2 Type 76
         37 mm for the 051D; FQF-2500 ASW rockets; depth charges; mines;
         the 051D: electronics and underway replenishment; Jinan to
         helicopters 1987; the HQ-7 refits replacing the "X" mount; based
         on the Neustrashimy with Kotlin features.
     [K] js/hero/ru_kotlin.js (HeroKotlin) - the Kotlin's SM-2-1, director
         and lattice code is the kit this file starts from (the Luda is a
         Kotlin-derived hull [E]); its shapes are re-dimensioned here to
         what [X] and [D] show.
     A third reference, "PLANS Jinan (ship, 1970).jpg" (the lead ship on
     trials in 1970, the as-built fit), could not be fetched: Commons
     answered every request for it with HTTP 429.

   RECOGNITION LIST (where each shows):
     1. Long flush hull with a strong sheer rising forward to a high raked
        stem (8 m), low and level amidships and aft (about 4 m), a raked
        transom [X] - STA, W(), zBot().
     2. Two twin 130 mm mounts, flat sided with a sloped face: forward on
        the forecastle (the "turret") and aft on the quarterdeck trained
        astern [X][D][E] - t130().
     3. Two triple HY-2 box launchers on trainers on the centreline, one
        between the forward funnel and the mainmast, one abaft the after
        funnel, raised at the front end [X][D][E] - hy2().
     4. Two funnels with sloped tops and dark caps, the forward one close
        abaft the foremast [X][D] - funnel().
     5. A tall bridge block, the gun director drum with its dish on a
        column over the wheelhouse [X][D] - director().
     6. A lattice foremast just abaft the bridge with an antenna platform
        and pole, and a lattice mainmast on a plated base between the
        launcher and the after funnel with a wide rotating array [X][D] -
        lattice(), yagi().
     7. Four small enclosed twin AA mounts, two abreast on the low house
        ahead of the bridge, two abreast on the after deckhouse [X][E] -
        twin37().
     8. The after deckhouse with its own director [X].
     9. A boat each side abaft the bridge, abreast the forward funnel
        casing, on chocks with davits [D] (exact station NOT CONFIRMED).
    10. Quarterdeck: depth-charge throwers, racks and mine rails [X][E].
   NOT CONFIRMED (estimated or not drawn):
     - The freeboards and heights are measured off a photograph, not a
       drawing; each is good to about +-0.5 m.  The half-breadths, the
       underwater body, the bilge and the stem's curve are the Kotlin's [K]
       scaled to the published 12.8 m beam: no reference shows them.
     - All widths across the ship (houses, funnels 3.2 m, launchers 4.6 m,
       mounts) are estimated from the 3/4 look of [X] and [D]; only the
       lengths and heights are measured.
     - Which gun the four small twin mounts are: [E] gives 37 mm in one
       place and 57 mm for the Type 051 in another.  They are drawn as the
       small ENCLOSED twins the photographs show (the Type 76 37 mm type),
       for both rows.
     - The radar types: the eras.js row comment names the Type 515 (Knife
       Rest) and the Type 354 (Eye Shield); the photographs do not resolve
       which antenna is on which mast.  Drawn as a wide horizontal array on
       the mainmast and a curved reflector on the foremast, generic.
     - The launcher elevation (about 10 degrees, as both photographs show
       them) and the box section; the boxes are drawn plain.
     - FQF-2500 ASW rocket launchers, torpedo tubes, mine rails' exact run,
       and the sonar are in [E] but not placeable from these pictures: the
       rocket launchers and tubes are NOT drawn; the mine rails are drawn
       as two plain rails along the quarterdeck.
     - The colour (all photographs monochrome) - see PAINT.
   No hull numbers, names, ensigns or the bow badge.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The rows
   have turret:true and their first weapon is the 130 mm (w_e60/e80
   _pla_destroyer): the forward twin 130 mm is the group named "turret";
   everything else is baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLuda = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -66.0, XS1 = 66.0, XWL = 61.1;   /* transom top, stem head, stem at the waterline [X] */

  /* HULL SECTION TABLE.  Deck heights at the side measured off [X]; half
     beams from the published 12.8 m [E], fined forward and aft as the
     Kotlin's [K]; bottom on the centreline to the 4.6 m draught [E] less
     the sonar dome (not drawn); the counter rises to the raked transom [X].
     x, deck z, half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power) */
  var STA = [
    [-66.0, 3.80, 4.30, 3.70,  2.60, 2.2],
    [-63.3, 3.82, 5.05, 4.55,  0.50, 2.3],
    [-60.0, 3.85, 5.65, 5.15, -0.95, 2.5],
    [-54.0, 3.90, 6.10, 5.70, -2.80, 2.7],
    [-46.0, 3.97, 6.35, 6.00, -3.90, 2.9],
    [-32.0, 4.05, 6.40, 6.20, -4.30, 3.0],
    [-12.0, 4.15, 6.40, 6.20, -4.40, 3.0],
    [  6.0, 4.25, 6.40, 6.15, -4.40, 3.0],
    [ 18.0, 4.32, 6.30, 5.95, -4.38, 2.8],
    [ 28.0, 4.55, 6.00, 5.40, -4.30, 2.5],
    [ 37.0, 5.15, 5.50, 4.65, -4.10, 2.2],
    [ 45.0, 6.05, 4.80, 3.60, -3.70, 1.9],
    [ 52.0, 6.95, 3.80, 2.30, -2.90, 1.7],
    [ 57.0, 7.55, 2.85, 1.30, -1.80, 1.5],
    [ 61.1, 7.82, 2.00, 0.00,  0.00, 1.4],
    [ 63.5, 7.93, 1.25, 0.00,  0.00, 1.3],
    [ 66.0, 8.00, 0.20, 0.00,  0.00, 1.2]
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
  /* the raked stem from the waterline at XWL to the stem head [X];
     elsewhere the table's keel line, rising aft into the counter */
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
  /* superstructure levels [X]: the 01 roofs, the bridge wing deck (02), the
     wheelhouse roof, the mainmast base roof, the after deckhouse roof */
  var R01 = 7.0, R02 = 10.0, R03 = 13.6, RMM = 9.3, RAFT = 6.7;

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
    return canvasTex(THREE, "hull051", 512, 256, function (g, w, h) {
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
    return canvasTex(THREE, "plate051", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "deck051", 256, 256, function (g, w, h) {
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
    return canvasTex(THREE, "grille051", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* paint: every reference photograph here is monochrome, so the colour is
     NOT measured.  The light grey of the PLAN of the period is drawn with
     the same values the Soviet heroes use (ru_kotlin.js, from the Kashin
     colour samples), a touch bluer; [X] and [D] show light hull and houses,
     a darker boot topping and dark funnel caps */
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
    for (x = XS0; x < -58; x += 0.8) xs.push(x);
    for (x = 54; x < XS1; x += 1.0) xs.push(x);
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
  /* the small transom face at the end of the raked counter [X], hull paint */
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

  /* twin 130 mm at rest pointing +X [X][D][K]: the flat-sided house with a
     sloped face, about 7.4 m long over the face (the photographs read 8.0-
     8.6 m with the base and rear overhang), 5 m wide, 2.8 m tall, a small
     rangefinder hood and sight hoods on the roof, 58-calibre barrels
     (SM-2-1 derivative [E]) */
  function t130(THREE, g, T) {
    var s;
    cylZ(THREE, g, 2.4, 2.5, 0.45, 20, T.sup, -0.4, 0, 0.22);
    hexa(THREE, g, T.sup, [
      [-4.3, -2.5, 0.4], [1.6, -2.5, 0.4], [1.6, 2.5, 0.4], [-4.3, 2.5, 0.4],
      [-4.2, -2.38, 3.2], [1.3, -2.38, 3.2], [1.3, 2.38, 3.2], [-4.2, 2.38, 3.2]]);
    hexa(THREE, g, T.sup, [
      [1.6, -2.5, 0.4], [3.0, -2.15, 0.4], [3.0, 2.15, 0.4], [1.6, 2.5, 0.4],
      [1.3, -2.38, 3.2], [3.0, -2.05, 2.2], [3.0, 2.05, 2.2], [1.3, 2.38, 3.2]]);
    box(THREE, g, 0.08, 1.0, 1.6, T.dark, -4.32, -1.3, 1.4);
    box(THREE, g, 1.4, 1.8, 0.28, T.sup, -3.0, 0, 3.34);
    cylZ(THREE, g, 0.7, 0.78, 0.4, 14, T.sup, -1.2, 0, 3.4);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 6, 0, PI * 2, 0, PI / 2), T.sup);
    hd.rotation.x = PI / 2; hd.position.set(-1.2, 0, 3.6); g.add(hd);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.9, 0.55, 0.4, T.sup, 0.5, s * 1.7, 3.38);
      box(THREE, g, 0.06, 0.4, 0.2, T.glass, 0.97, s * 1.7, 3.42);
      box(THREE, g, 0.12, 0.85, 1.1, T.dark, 3.03, s * 0.72, 1.5);
      var br = new THREE.Group(); br.position.set(2.85, s * 0.72, 1.5); br.rotation.y = -0.06;
      cylX(THREE, br, 0.24, 0.26, 0.9, 10, T.gun, 0.4, 0, 0);
      cylX(THREE, br, 0.105, 0.15, 6.9, 10, T.gun, 4.2, 0, 0, true);
      cylX(THREE, br, 0.13, 0.13, 0.35, 10, T.gun, 7.5, 0, 0);
      g.add(br);
    }
    return g;
  }

  /* small enclosed twin AA mount at rest pointing +X [X][E]: the rounded
     shell about 2.4 m long, 2 m wide, 1.6 m tall, two barrels of about 2.6 m
     with flash hiders (drawn as the Type 76 37 mm type, see NOT CONFIRMED) */
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

  /* triple HY-2 launcher on its trainer, origin on the deck, front end +X
     [X][D][E]: base ring, pedestal, trainer, and the three boxes side by
     side (9.6 m long [X]; 1.5 x 1.95 m section, estimated), raised about
     10 degrees as both photographs show them */
  function hy2(THREE, g, T) {
    var i, k, s;
    cylZ(THREE, g, 1.8, 1.95, 0.5, 18, T.sup, 0, 0, 0.25);
    cylZ(THREE, g, 1.25, 1.45, 1.9, 16, T.sup, 0, 0, 1.45);
    box(THREE, g, 2.4, 3.6, 0.45, T.sup, 0, 0, 2.3);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.8, 0.3, 1.5, T.sup, 0, s * 2.45, 2.9);
    var c = new THREE.Group(); c.position.set(0, 0, 3.7); c.rotation.y = -0.17;
    for (i = 0; i < 3; i++) {
      var y = (i - 1) * 1.52;
      box(THREE, c, 9.6, 1.48, 1.95, T.sup, 0, y, 0);
      box(THREE, c, 0.08, 1.28, 1.75, T.metal, 4.82, y, 0);
      box(THREE, c, 0.08, 1.28, 1.75, T.dark, -4.82, y, 0);
      for (k = 0; k < 5; k++) box(THREE, c, 0.14, 1.53, 2.0, T.sup, -3.8 + k * 1.9, y, 0);
    }
    box(THREE, c, 6.0, 4.4, 0.3, T.metal, -0.4, 0, -1.0);
    g.add(c);
    return g;
  }

  /* a funnel: an oval casing raked aft, its top falling aft, a dark cap
     and the uptake grille [X][D] (the Riga hero's funnel) */
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

  /* the gun director [X][D]: the drum, its body and dome, the rangefinder
     arms and the round dish forward (the Kotlin's SVP-42/50 shape [K]; the
     Chinese type is NOT identified) */
  function director(THREE, g, T, x, z) {
    cylZ(THREE, g, 1.45, 1.55, 1.0, 18, T.sup, x, 0, z + 0.5);
    hexa(THREE, g, T.sup, [
      [x - 1.6, -1.4, z + 1.0], [x + 1.5, -1.4, z + 1.0], [x + 1.5, 1.4, z + 1.0], [x - 1.6, 1.4, z + 1.0],
      [x - 1.4, -1.25, z + 2.6], [x + 1.1, -1.25, z + 2.6], [x + 1.1, 1.25, z + 2.6], [x - 1.4, 1.25, z + 2.6]]);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(1.25, 16, 6, 0, PI * 2, 0, PI / 2), T.sup);
    hd.rotation.x = PI / 2; hd.scale.set(1.05, 1, 0.6); hd.position.set(x - 0.15, 0, z + 2.6); g.add(hd);
    box(THREE, g, 0.75, 4.2, 0.5, T.sup, x - 0.3, 0, z + 2.0);
    var s;
    for (s = -1; s <= 1; s += 2) cylY(THREE, g, 0.3, 0.3, 0.2, 10, T.glass, x - 0.3, s * 2.15, z + 2.0);
    box(THREE, g, 0.06, 1.4, 0.3, T.glass, x + 1.35, 0, z + 2.1);
    box(THREE, g, 1.0, 0.45, 0.45, T.metal, x + 1.8, 0, z + 3.0);
    dish(THREE, g, T.metal, 1.4, x + 2.4, 0, z + 3.0, 1, 1);
  }
  /* a small optical director drum with a dish, for the after deckhouse [X] */
  function smallDirector(THREE, g, T, x, z) {
    cylZ(THREE, g, 0.95, 1.05, 1.5, 14, T.sup, x, 0, z + 0.75);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(0.95, 14, 6, 0, PI * 2, 0, PI / 2), T.sup);
    hd.rotation.x = PI / 2; hd.scale.set(1, 1, 0.6); hd.position.set(x, 0, z + 1.5); g.add(hd);
    var s;
    for (s = -1; s <= 1; s += 2) cylY(THREE, g, 0.18, 0.18, 0.5, 8, T.sup, x, s * 1.15, z + 1.1);
    box(THREE, g, 0.06, 0.9, 0.25, T.glass, x + 0.96, 0, z + 1.15);
    dish(THREE, g, T.metal, 0.8, x + 1.25, 0, z + 2.0, 1, 1);
  }
  /* a wide rotating array on its pedestal (Knife-Rest-like dipole array,
     type NOT CONFIRMED): two booms with the dipole rows forward */
  function arrayRadar(THREE, g, T, x, z) {
    cylZ(THREE, g, 0.3, 0.42, 0.8, 8, T.metal, x, 0, z + 0.4);
    var h = new THREE.Group(); h.position.set(x, 0, z + 1.0);
    box(THREE, h, 0.25, 6.2, 0.22, T.metal, 0, 0, 0);
    box(THREE, h, 0.25, 6.2, 0.22, T.metal, 0, 0, 0.95);
    var i;
    for (i = -4; i <= 4; i++) {
      var y = i * 0.72;
      strut(THREE, h, T.metal, 0, y, 0, 0, y, 0.95, 0.03, 3);
      box(THREE, h, 1.5, 0.05, 0.05, T.metal, 0.8, y, 0.25);
      box(THREE, h, 1.5, 0.05, 0.05, T.metal, 0.8, y, 0.7);
      box(THREE, h, 0.05, 0.6, 0.05, T.metal, 1.5, y, 0.25);
      box(THREE, h, 0.05, 0.6, 0.05, T.metal, 1.5, y, 0.7);
    }
    box(THREE, h, 0.5, 0.6, 0.6, T.metal, -0.3, 0, 0.45);
    g.add(h);
  }
  /* a ship's boat on its chocks [D] (the Kotlin's) */
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

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x;
    void M;

    /* hull shell in three bands, transom, weather deck [X][E] */
    g.add(shellBand(THREE, T.under, -6, -0.4, 4));
    g.add(shellBand(THREE, T.boot, -0.4, 0.6, 1));
    g.add(shellBand(THREE, T.hull, 0.6, 12, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    for (s = -1; s <= 1; s += 2) {
      /* anchors in their hawses near the stem */
      var ax = 57.0, az = 6.1, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 1.6, 0.12, 1.3, T.dark, ax, ay, az);
      box(THREE, g, 1.1, 0.18, 1.0, T.gun, ax + 0.1, ay + s * 0.04, az - 0.15);
      /* scuttles fore and aft */
      for (i = 0; i < 12; i++) {
        x = 36 - i * 2.6;
        box(THREE, g, 0.32, 0.05, 0.32, T.dark, x, s * (W(x, deckZ(x) - 1.0) + 0.02), deckZ(x) - 1.0);
      }
      for (i = 0; i < 9; i++) {
        x = -34 - i * 2.6;
        box(THREE, g, 0.32, 0.05, 0.32, T.dark, x, s * (W(x, deckZ(x) - 1.0) + 0.02), deckZ(x) - 1.0);
      }
    }

    /* ------------------------------------------ forward house and bridge */
    /* the 01 level from the low house behind the forward mount (x 37) back
       past the bridge [X] */
    polyPrism(THREE, g, T.sup, [[15.0, -4.6], [33.8, -4.6], [36.8, -2.2], [36.8, 2.2], [33.8, 4.6], [15.0, 4.6]], deckZ(15) - 0.3, R01);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 5; i++) box(THREE, g, 0.4, 0.06, 0.4, T.dark, 18.0 + i * 3.0, s * 4.62, R01 - 1.0);
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, 33.0, s * 4.62, deckZ(33) + 1.05);
      /* the two forward twins abreast on the house [X][E] */
      var fm = new THREE.Group(); fm.position.set(31.4, s * 2.3, R01); twin37(THREE, fm, T); g.add(fm);
    }
    roofRail(THREE, g, T, [[29.0, 4.5], [33.8, 4.5], [36.7, 2.2], [36.7, -2.2], [33.8, -4.5], [29.0, -4.5]], R01, 0.9);
    /* the 02 level (wing deck) x 15.6-28.4 */
    polyPrism(THREE, g, T.sup, chamferBox(15.6, 28.4, 4.2, 1.2), R01 - 0.05, R02);
    polyPrism(THREE, g, T.sup, chamferBox(19.5, 27.4, 5.8, 1.0), R02 - 0.2, R02);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 0.5, 0.06, 0.5, T.dark, 17.0 + i * 2.6, s * 4.22, R02 - 1.2);
      box(THREE, g, 7.9, 0.08, 1.0, T.sup, 23.45, s * 5.76, R02 + 0.5);
    }
    roofRail(THREE, g, T, [[15.8, 4.1], [19.5, 4.1]], R02, 0.9);
    roofRail(THREE, g, T, [[15.8, -4.1], [19.5, -4.1]], R02, 0.9);
    roofRail(THREE, g, T, [[15.8, 4.1], [15.8, -4.1]], R02, 0.9);
    /* the wheelhouse x 15.8-27.2, its face raked a little [X] */
    hexa(THREE, g, T.sup, [[15.8, -3.4, R02 - 0.05], [27.4, -3.4, R02 - 0.05], [27.4, 3.4, R02 - 0.05], [15.8, 3.4, R02 - 0.05],
                           [15.8, -3.3, R03], [26.9, -3.3, R03], [26.9, 3.3, R03], [15.8, 3.3, R03]]);
    hexa(THREE, g, T.glass, [[27.08, -3.0, R03 - 1.55], [27.15, -3.0, R03 - 1.55], [27.15, 3.0, R03 - 1.55], [27.08, 3.0, R03 - 1.55],
                             [26.97, -3.0, R03 - 0.75], [27.04, -3.0, R03 - 0.75], [27.04, 3.0, R03 - 0.75], [26.97, 3.0, R03 - 0.75]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 6.0, 0.06, 0.7, T.glass, 23.4, s * 3.39, R03 - 1.15);
      for (i = 0; i < 3; i++) box(THREE, g, 0.5, 0.06, 0.5, T.dark, 17.2 + i * 1.6, s * 3.39, R03 - 1.1);
    }
    box(THREE, g, 11.0, 6.4, 0.1, T.metal, 21.4, 0, R03 + 0.05);
    roofRail(THREE, g, T, [[18.6, 3.2], [26.8, 3.2], [26.8, -3.2], [18.6, -3.2]], R03, 0.9);
    /* the director on its column over the after part of the wheelhouse [X][D] */
    cylZ(THREE, g, 0.85, 1.0, 1.8, 14, T.sup, 17.0, 0, R03 + 0.9);
    director(THREE, g, T, 17.0, R03 + 1.8);
    /* signal lamps and the whips on the wings */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.35, 0.35, 0.5, 12, T.metal, 25.5, s * 5.2, R02 + 1.4);
      cylZ(THREE, g, 0.08, 0.1, 0.5, 6, T.metal, 25.5, s * 5.2, R02 + 0.9);
      strut(THREE, g, T.metal, 20.0, s * 5.6, R02 + 1.0, 19.6, s * 6.0, R02 + 8.5, 0.04, 3);
    }

    /* ------------------------------------ foremast, funnel casing, boats */
    /* the 01 casing x 5.4-15.0 round the forward uptakes [X] */
    polyPrism(THREE, g, T.sup, [[5.4, -3.3], [15.2, -3.3], [15.2, 3.3], [5.4, 3.3]], deckZ(6) - 0.3, R01);
    roofRail(THREE, g, T, [[5.5, 3.2], [5.5, -3.2]], R01, 0.9);
    /* lattice foremast: legs from x 14.1 / 11.2 on the 01 roof tapering to
       the platform at x 12.7, 20.5 m; a curved reflector on it (type NOT
       CONFIRMED) and a pole topmast [X][D] */
    var fx = 12.65;
    lattice(THREE, g, T.metal, fx, 1.45, 1.9, 0.6, 0.7, R01, 20.5, 6, 0.15);
    polyPrism(THREE, g, T.metal, [[fx - 1.3, -1.4], [fx + 1.4, -1.4], [fx + 1.4, 1.4], [fx - 1.3, 1.4]], 20.5, 20.64);
    roofRail(THREE, g, T, [[fx - 1.3, 1.4], [fx + 1.4, 1.4], [fx + 1.4, -1.4], [fx - 1.3, -1.4], [fx - 1.3, 1.4]], 20.64, 0.7);
    box(THREE, g, 0.35, 7.0, 0.14, T.metal, fx, 0, 17.6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, fx, s * 0.8, 16.8, fx, s * 3.4, 17.6, 0.04, 3);
    cylZ(THREE, g, 0.35, 0.45, 1.3, 8, T.metal, fx + 0.2, 0, 21.3);
    var fr = new THREE.Group(); fr.position.set(fx + 0.2, 0, 22.0); fr.rotation.z = 0.35;
    cheese(THREE, fr, T.metal, 4.4, 1.5, 0.6, 0, 0.9, 0);
    box(THREE, fr, 0.15, 4.0, 0.12, T.metal, 0, 0, 1.65);
    box(THREE, fr, 0.15, 4.0, 0.12, T.metal, 0, 0, 0.15);
    strut(THREE, fr, T.metal, 0, 0, 0.9, 1.4, 0, 0.9, 0.05, 3);
    g.add(fr);
    strut(THREE, g, T.metal, fx - 0.9, 0, 20.6, fx - 0.9, 0, 26.3, 0.07, 5);
    box(THREE, g, 0.1, 3.4, 0.1, T.metal, fx - 0.9, 0, 25.0);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, fx - 0.9, 0, 26.0, fx - 6.0, s * 2.8, R01, 0.012, 3);
    /* forward funnel x 7.6-11.2 at the top, raked, top sloping aft [X][D] */
    funnel(THREE, g, T, 9.85, 4.2, 3.2, R01, 11.7, 10.5, 0.12);
    /* the boats either side abreast the casing on their chocks, with
       davits [D] */
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T, 10.4, s * 4.85, deckZ(10.4) + 1.55, 7.0, 0.95, 0.55);
      for (i = -1; i <= 1; i += 2) {
        var dx = 10.4 + i * 2.6;
        strut(THREE, g, T.metal, dx, s * 3.4, deckZ(dx), dx, s * 3.6, R01 + 1.2, 0.08, 5);
        strut(THREE, g, T.metal, dx, s * 3.6, R01 + 1.2, dx, s * 4.85, R01 + 1.5, 0.07, 5);
      }
    }

    /* forward HY-2 launcher between the casing and the mainmast [X][D] */
    var la = new THREE.Group(); la.position.set(2.0, 0, deckZ(2.0)); hy2(THREE, la, T); g.add(la);

    /* ---------------------------------------- mainmast, pole, after funnel */
    /* the 01 casing x -3.2 to -21.2, the plated mast base x -3.2 to -7.8 on
       it to 9.3 m [X] */
    polyPrism(THREE, g, T.sup, [[-21.2, -3.3], [-3.2, -3.3], [-3.2, 3.3], [-21.2, 3.3]], deckZ(-12) - 0.3, R01);
    polyPrism(THREE, g, T.sup, [[-7.8, -2.3], [-3.6, -2.3], [-3.2, -1.8], [-3.2, 1.8], [-3.6, 2.3], [-7.8, 2.3]], R01 - 0.05, RMM);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) box(THREE, g, 0.9, 0.06, 1.8, T.dark, -6.0 - i * 5.5, s * 3.33, deckZ(-8) + 1.05);
      box(THREE, g, 0.9, 0.06, 1.5, T.dark, -5.6, s * 2.33, R01 + 0.8);
      cylX(THREE, g, 0.36, 0.36, 1.5, 10, T.sup, -10.5, s * 2.7, R01 + 0.38);
      cylX(THREE, g, 0.36, 0.36, 1.5, 10, T.sup, -13.0, s * 2.7, R01 + 0.38);
    }
    roofRail(THREE, g, T, [[-3.3, 3.2], [-21.1, 3.2], [-21.1, -3.2], [-3.3, -3.2], [-3.3, 3.2]], R01, 0.9);
    roofRail(THREE, g, T, [[-3.4, 2.2], [-7.7, 2.2], [-7.7, -2.2], [-3.4, -2.2]], RMM, 0.9);
    /* lattice mainmast to its platform at 18 m, the wide array over it, a
       short pole [X][D] */
    var mx = -6.4;
    lattice(THREE, g, T.metal, mx, 2.1, 1.9, 0.75, 0.8, RMM, 18.0, 5, 0.14);
    polyPrism(THREE, g, T.metal, [[mx - 1.2, -1.2], [mx + 1.2, -1.2], [mx + 1.2, 1.2], [mx - 1.2, 1.2]], 18.0, 18.12);
    roofRail(THREE, g, T, [[mx - 1.2, 1.2], [mx + 1.2, 1.2], [mx + 1.2, -1.2], [mx - 1.2, -1.2], [mx - 1.2, 1.2]], 18.12, 0.6);
    arrayRadar(THREE, g, T, mx + 0.2, 18.12);
    strut(THREE, g, T.metal, mx - 0.9, 0, 18.1, mx - 0.9, 0, 21.8, 0.05, 4);
    box(THREE, g, 0.3, 4.6, 0.12, T.metal, mx, 0, 14.6);
    /* the pole at x -12.3 with its yard and a small box (NOT identified) [X][D] */
    strut(THREE, g, T.metal, -12.3, 0, R01, -12.3, 0, 14.6, 0.12, 6);
    box(THREE, g, 0.12, 3.6, 0.12, T.metal, -12.3, 0, 13.2);
    box(THREE, g, 0.8, 0.8, 0.9, T.metal, -12.1, 0, 11.8);
    /* after funnel x -16.6 to -20.6 at the top [X][D] */
    funnel(THREE, g, T, -18.15, 4.2, 3.2, R01, 11.4, 10.0, 0.12);

    /* after HY-2 launcher [X][D] */
    var lb = new THREE.Group(); lb.position.set(-26.4, 0, deckZ(-26.4)); hy2(THREE, lb, T); g.add(lb);

    /* ------------------------------------------------- after deckhouse */
    polyPrism(THREE, g, T.sup, [[-42.7, -3.6], [-32.6, -3.6], [-31.9, -2.9], [-31.9, 2.9], [-32.6, 3.6], [-42.7, 3.6]], deckZ(-37) - 0.3, RAFT);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.9, 0.06, 1.8, T.dark, -35.0, s * 3.62, deckZ(-35) + 1.05);
      for (i = 0; i < 3; i++) box(THREE, g, 0.45, 0.06, 0.45, T.dark, -37.0 - i * 2.0, s * 3.62, RAFT - 1.0);
      var am = new THREE.Group(); am.position.set(-39.6, s * 2.1, RAFT); am.rotation.z = PI; twin37(THREE, am, T); g.add(am);
    }
    roofRail(THREE, g, T, [[-32.6, 3.5], [-42.6, 3.5], [-42.6, -3.5], [-32.6, -3.5]], RAFT, 0.9);
    /* its director on a short tower, facing aft [X] */
    polyPrism(THREE, g, T.sup, [[-35.0, -1.3], [-32.4, -1.3], [-32.4, 1.3], [-35.0, 1.3]], RAFT - 0.05, 8.2);
    var ad = new THREE.Group(); ad.position.set(-33.7, 0, 0); ad.rotation.z = PI; g.add(ad);
    smallDirector(THREE, ad, T, 0, 8.2);

    /* after 130 mm on the quarterdeck, trained astern [X] */
    var ag = new THREE.Group(); ag.position.set(-46.7, 0, deckZ(-46.7)); ag.rotation.z = PI; t130(THREE, ag, T); g.add(ag);

    /* quarterdeck: four depth-charge throwers, two stern racks, two mine
       rails each side [X][E] */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        var bx = -54.0 - i * 2.2;
        var bm = new THREE.Group(); bm.position.set(bx, s * 4.4, deckZ(bx)); g.add(bm);
        cylZ(THREE, bm, 0.32, 0.4, 0.4, 8, T.sup, 0, 0, 0.2);
        var tb = new THREE.Group(); tb.position.set(0, 0, 0.45); tb.rotation.x = -s * 0.5; bm.add(tb);
        cylZ(THREE, tb, 0.18, 0.18, 1.2, 8, T.gun, 0, 0, 0.55);
        cylZ(THREE, tb, 0.24, 0.24, 0.2, 8, T.gun, 0, 0, 1.15);
        box(THREE, g, 1.2, 0.7, 0.6, T.metal, bx, s * 3.3, deckZ(bx) + 0.3);
      }
      var ry = s * 1.8, r0 = -65.0, r1 = -59.6;
      box(THREE, g, r1 - r0, 0.12, 0.1, T.metal, (r0 + r1) / 2, ry - 0.45, deckZ(r1) + 0.6);
      box(THREE, g, r1 - r0, 0.12, 0.1, T.metal, (r0 + r1) / 2, ry + 0.45, deckZ(r1) + 0.6);
      for (i = 0; i < 4; i++) {
        strut(THREE, g, T.metal, r0 + 0.3 + i * 1.6, ry - 0.45, deckZ(r0), r0 + 0.3 + i * 1.6, ry - 0.45, deckZ(r0) + 0.6, 0.04, 4);
        strut(THREE, g, T.metal, r0 + 0.3 + i * 1.6, ry + 0.45, deckZ(r0), r0 + 0.3 + i * 1.6, ry + 0.45, deckZ(r0) + 0.6, 0.04, 4);
      }
      for (i = 0; i < 6; i++) cylY(THREE, g, 0.26, 0.26, 0.62, 10, T.gun, r0 + 0.6 + i * 0.85, ry, deckZ(r0) + 0.9);
      var mr = [s * (halfB(-44) - 0.9), s * (halfB(-44) - 1.5)];
      mr.forEach(function (yy) {
        box(THREE, g, 20.5, 0.1, 0.1, T.metal, -54.6, yy, deckZ(-54.6) + 0.06);
      });
    }
    /* a reel house and lockers abaft the after mount */
    polyPrism(THREE, g, T.sup, [[-53.2, -1.5], [-51.4, -1.5], [-51.4, 1.5], [-53.2, 1.5]], deckZ(-52) - 0.2, deckZ(-52) + 1.4);

    /* forecastle: capstans, windlass, bollards; jackstaff, ensign staff */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.45, 0.55, 0.6, 10, T.metal, 54.6, s * 1.2, deckZ(54.6) + 0.3);
      box(THREE, g, 2.8, 0.18, 0.08, T.gun, 56.0, s * 1.7, deckZ(56) + 0.05, -s * 0.3);
      for (i = 0; i < 4; i++) {
        var bxx = 49 - i * 27;
        cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, bxx, s * (halfB(bxx) - 0.55), deckZ(bxx) + 0.22);
        cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, bxx - 0.6, s * (halfB(bxx) - 0.55), deckZ(bxx) + 0.22);
      }
      cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, -62.0, s * 4.4, deckZ(-62) + 0.22);
    }
    box(THREE, g, 1.4, 1.2, 0.55, T.metal, 52.8, 0, deckZ(52.8) + 0.27);
    strut(THREE, g, T.metal, 65.3, 0, deckZ(65.3), 65.3, 0, deckZ(65.3) + 3.8, 0.05, 4);
    strut(THREE, g, T.metal, XS0 + 1.0, 0, deckZ(XS0), XS0 + 1.0, 0, deckZ(XS0) + 4.8, 0.06, 4);
    /* mushroom vents on the weather deck */
    var vs = [[49.5, 2.2], [49.5, -2.2], [38.0, 4.0], [38.0, -4.0], [-23.0, 4.6], [-23.0, -4.6],
              [-30.5, 4.6], [-30.5, -4.6], [-44.0, 4.0], [-44.0, -4.0], [4.6, 4.6], [4.6, -4.6]];
    for (i = 0; i < vs.length; i++) {
      var vx = vs[i][0], vz = deckZ(vx);
      cylZ(THREE, g, 0.2, 0.2, 0.7, 8, T.sup, vx, vs[i][1], vz + 0.35);
      cylZ(THREE, g, 0.4, 0.2, 0.3, 8, T.sup, vx, vs[i][1], vz + 0.8);
    }

    /* underwater gear: two shafts in bossings, four-blade screws and one
       rudder (the Kotlin's arrangement [K]; NOT CONFIRMED for the Luda) */
    for (s = -1; s <= 1; s += 2) {
      var bos = [];
      for (i = 0; i <= 5; i++) {
        var f = i / 5;
        bos.push(superRing(0.6 - f * 0.32, 0.6 - f * 0.32, -2.85 + f * 0.1, 1, 10).map(function (p) { return [s * 2.8 + p[0], p[1]]; }));
      }
      ringLoft(THREE, g, T.under, [-30, -38, -46, -51, -54, -55.8], bos, true);
      cylX(THREE, g, 0.2, 0.2, 1.6, 8, T.metal, -56.6, s * 2.8, -2.75);
      cylX(THREE, g, 0.36, 0.46, 0.8, 8, T.metal, -57.6, s * 2.8, -2.75);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, 1.5), T.metal);
        bl.position.set(-57.6, s * 2.8, -2.75); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.95); bl.rotation.y = 0.45; g.add(bl);
      }
    }
    box(THREE, g, 3.2, 0.3, 3.4, T.metal, -60.6, 0, -1.5);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 32.0, 0.08, 0.6, T.under, -4.0, s * (W(-4, -3.4) + 0.2), -3.45);

    /* rails along the deck edge, broken at the forward mount */
    railRun(THREE, g, T, XS0 + 0.8, 36.0, 4.6, 1.0);
    railRun(THREE, g, T, 36.0, 64.6, 3.6, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 35.0, 0, R01 + 0.02);
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -5.4, 0, RMM + 0.02);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, -41.6, 0, RAFT + 0.02);

    /* the trained mount: the forward twin 130 mm [X][D][E] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(42.3, 0, deckZ(42.3)); t130(THREE, tw, T);

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

/* Registration: len is the published overall length, 132 m [E].  Both
   rows are the same gun-and-HY-2 Type 051 fit (see ONE FIT FOR BOTH ROWS
   in the header). */
UNIT_MODELS["pla_e60_destroyer"] = {
  len: 132.0,
  build: function (THREE, M, C) { return HeroLuda.build(THREE, M, C); }
};
UNIT_MODELS["pla_e80_destroyer"] = {
  len: 132.0,
  build: function (THREE, M, C) { return HeroLuda.build(THREE, M, C); }
};
