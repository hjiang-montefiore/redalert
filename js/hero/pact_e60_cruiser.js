/* ==================== js/hero/pact_e60_cruiser.js ======================
   HERO MODEL -- Project 58 (NATO "Kynda") missile cruiser, lead ship
   Grozny (Grozny, Admiral Fokin, Admiral Golovko, Varyag; in service
   1962-1965), drawn as built and as photographed in the 1960s-70s: NOT
   the 1976-1989 refits (no AK-630s, no Bass Tilt, no Head Net-C).
   Key: pact_e60_cruiser.  Length overall 142 m, beam 15.8 m, draught
   about 5.3 m (js/warship_specs.js 142 / 16; en.wikipedia 15.8 / 5.3).
   REDO 2026-10-24: the hull lofted from a section table scaled off the
   recognition profile, with the long forecastle and its break down to a
   low quarterdeck; the four P-35 containers side by side in each SM-70
   launcher (the earlier model had them as a cluster); the launchers,
   towers, funnels and radars moved to the stations the profile and the
   photographs give; the reload doors, the funnel cowls, the RBU-6000 pair
   on the forecastle and the Owl Screech director put in.

   REFERENCES (Wikimedia Commons, fetched at width 960):
     [P] "Kynda-class cruiser profile 1986.png" - recognition profile,
         bow right: hull 922 px = 142 m at the deck (6.49 px/m), waterline
         at y 222.  Stem raked from x 66.6 at the waterline to 71 at the
         deck; transom raked from x -68.1 at the waterline to -71; the
         quarterdeck 4.0 m high from the transom to the forecastle break
         at x -24.5; Volna x 45.8 on its magazine house x 41-51.5; forward
         SM-70 x 28-39.6 (containers' axis 9.0 m); bridge front x 27.5,
         Peel Group x 22.7 (top 18 m); forward tower x 10-15 (top 26.5 m)
         with the Scoop Pair on a boom forward to x 17 at 21.5 m; forward
         funnel x 5-9.6 (top 16.3 forward, 15.5 aft); after tower x -9.5
         to -1.5 (top 29 m) with its Scoop Pair aft at x -12, 21 m; after
         funnel x -21 to -14.5 (16.9 forward, 15.3 aft with a cowl lip
         aft); Owl Screech x -23.5 (13.9 m); after SM-70 x -37.9 to -26.9
         (axis 6.7 m); the upper AK-726 x -43.9 on a house x -47 to -37.4
         (turret top 9.6 m), the lower x -50.5 (7.4 m); a small house x -57
         to -53; the pad aft of it.  Two round fittings on the after
         deckhouse side at x -16.4 and -14.6.
     [H] "428-GX-USN 1160105" (port beam, Hawaiian waters, April 1974):
         the same layout; the Scoop Pairs on booms - forward one looking
         forward, after one aft; the funnels abaft each tower, the after
         one with its top falling aft into a cowl; Owl Screech abaft it;
         Peel Group over the bridge front; Head Net at both tower heads.
     [A] "428-GX-USN 1156258" (after part from high on the starboard
         beam, Admiral Golovko): the four containers of the after SM-70
         side by side on a round barbette; the forecastle break curving
         down to the quarterdeck just forward of it; the two AK-726 in
         line, the upper on its house; the small house; the plain
         quarterdeck pad aft (the painted circle in this undated view is
         NOT drawn: the 1960s-70s views do not resolve one); the dark cap
         of the after funnel; the two round fittings of [P].
     [B] "Kynda class cruiser underway.jpg" (Grozny, elevated port beam,
         1985) and [C] "Cruiser Kynda.jpg" (port bow, 1985), used ONLY for
         what the refit did not change: the four containers with domed
         fronts in a row on the forward SM-70, the reload door in the
         bridge front right behind it, the RBU-6000 pair abreast on the
         forecastle ahead of the Volna, the plated pyramid towers, the
         oval funnels, a derrick boom by the after funnel (also in [H]).
     [G] "Soviet guided missile cruiser Groznyy underway c1980.jpg".
     [R] Russian Wikipedia "Kreisera proekta 58" (in Russian): long
         forecastle, a smooth rise forward; aluminium-magnesium
         superstructures; PYRAMIDAL masts carrying the radars; two SM-70
         quadruple P-35 launchers trained up to 120 deg each side, raised
         25 deg to fire; eight reloads in magazines in the superstructures;
         four Binom (Scoop Pair) antennas; one ZIF-101 Volna forward of the
         forward SM-70 with the Yatagan (Peel Group); two AK-726 aft,
         superfiring, with ONE MR-105 Turel (Owl Screech); RBU-6000;
         AK-630s only from the 1976-1989 refits.
     [E] English Wikipedia "Kynda-class cruiser": 142 x 15.8 x 5.3 m; two
         RBU-6000; two triple 533 mm torpedo tubes; a helipad, no hangar.

   RECOGNITION LIST (where each shows):
     1. Two SM-70 launchers, four big containers side by side on a round
        barbette, forward on the forecastle (the "turret") x 33.8 and aft
        on the quarterdeck x -32.4, muzzles out [P][A][C] - sm70().
     2. Two plated PYRAMID towers, the after one taller, each with a pole
        topmast and Head Net-A at its head [P][H][R] - tower(), headNetA().
     3. A Scoop Pair (two dishes, one above the other) on a boom off each
        tower, forward one looking forward, after one aft [P][H][R]
        - scoopPair().
     4. Oval funnels abaft each tower, tops falling aft, black cowl tops
        [P][H][A] - funnel().
     5. Long forecastle breaking down to a low quarterdeck just forward of
        the after SM-70 [P][A][B][R] - deckZ(), the hull and deck loft.
     6. Volna (ZIF-101) twin arm on its magazine house forward of the
        forward SM-70, Peel Group over the bridge [P][H][R] - zif101(),
        peelGroup().
     7. Two AK-726 superfiring aft, the upper on its house; the Owl
        Screech on the after deckhouse [P][A][H][R] - ak726(), owlScreech().
     8. Reload doors in the superstructure faces behind each launcher
        [C][R]; RBU-6000 pair on the forecastle [C][E].
     9. Raked stem with the smooth rise forward, raked transom, plain pad
        on the quarterdeck [P][R][E].
    10. Paint: light Soviet grey hull and superstructure, dark decks, black
        boot topping, black funnel cowls [A][H] (the Kashin samples, same
        period and fleet, since the Kynda views here are monochrome).
   NOT CONFIRMED and therefore not drawn: the triple torpedo-tube mounts
   (two triple 533 mm [E], but no reference here shows a mount clearly -
   only the paired round fittings of [P][A] on the after deckhouse, drawn
   as fittings); boats (none resolved in the 1960s-70s views); the sonar
   fairing; any pad marking; the missiles on the Volna arms (drawn empty).
   Hull numbers, names and flags are never drawn.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The
   forward SM-70 is the group named "turret" (the row has turret:true and
   its first weapon is the P-35); everything else is baked, one mesh per
   material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKynda = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -71.0, XS1 = 71.0, XWL = 66.6, XST = -68.1;   /* transom, stem head, stem and transom at the waterline [P] */
  var XB0 = -25.4, XB1 = -23.8;                           /* the forecastle break [P][A] */

  /* HULL SECTION TABLE, scaled off [P] (6.49 px/m), half beams from the
     published 15.8 m.  x, forecastle deck z (aft of the break the
     quarterdeck qdZ is used), half beam at the deck edge, half beam at the
     waterline, bottom z on the centreline, bilge fullness */
  var STA = [
    [-71.0, 6.00, 5.30, 4.40,  2.40, 3.0],
    [-68.1, 6.00, 6.05, 5.45, -0.60, 3.0],
    [-64.0, 6.00, 6.85, 6.35, -2.30, 2.8],
    [-56.0, 6.00, 7.45, 7.00, -3.90, 2.6],
    [-44.0, 6.00, 7.80, 7.40, -4.80, 2.8],
    [-30.0, 6.00, 7.90, 7.55, -5.10, 3.0],
    [ -4.0, 5.95, 7.90, 7.55, -5.15, 3.0],
    [ 10.0, 5.98, 7.88, 7.45, -5.15, 3.0],
    [ 22.0, 6.10, 7.72, 7.15, -5.10, 2.8],
    [ 32.0, 6.30, 7.38, 6.65, -4.95, 2.5],
    [ 42.0, 6.55, 6.78, 5.75, -4.65, 2.2],
    [ 50.0, 6.85, 5.90, 4.45, -4.15, 1.9],
    [ 56.0, 7.12, 4.92, 3.15, -3.45, 1.7],
    [ 61.0, 7.42, 3.82, 1.85, -2.40, 1.5],
    [ 66.6, 7.80, 2.40, 0.00,  0.00, 1.3],
    [ 69.0, 7.98, 1.40, 0.00,  0.00, 1.2],
    [ 71.0, 8.15, 0.15, 0.00,  0.00, 1.2]
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
  /* the quarterdeck, 4.0 m at the transom [P] */
  function qdZ(x) { return 4.05 - (x - XS0) * 0.002; }
  /* the weather deck: quarterdeck aft, a curved break [A], the forecastle */
  function deckZ(x) {
    if (x <= XB0) return qdZ(x);
    var fz = pick(x, 1);
    if (x >= XB1) return fz;
    var t = (x - XB0) / (XB1 - XB0), s = 0.5 - 0.5 * Math.cos(PI * t);
    return qdZ(x) + (fz - qdZ(x)) * s;
  }
  function halfB(x) { return pick(x, 2); }
  /* the raked stem and the raked transom overhang [P] */
  function zBot(x) {
    if (x > XWL) return deckZ(XS1) * (x - XWL) / (XS1 - XWL);
    if (x < XST) return -0.6 + (2.4 + 0.6) * (XST - x) / (XST - XS0);
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
      return bd * Math.pow((z - zb) / (zd - zb), 0.18 + 0.3 * f);
    }
    if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.5);
    var n = pick(x, 5), t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  /* the 01 house roof on the forecastle, 2.6 m over the deck amidships [P] */
  var R01 = 8.6, R02A = 11.0, R02F = 11.3, R03 = 13.7;

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
     staggered butts, faint weathering streaks and a row of scuttles */
  function hullTex(THREE) {
    return canvasTex(THREE, "hull58", 512, 256, function (g, w, h) {
      var R = rng(5858), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
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
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "plate58", 256, 256, function (g, w, h) {
      var R = rng(5817), i;
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
  /* weather deck: plating seams and darker worn walkway patches */
  function deckTex(THREE) {
    return canvasTex(THREE, "deck58", 256, 256, function (g, w, h) {
      var R = rng(5811), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* funnel tops and openings: dark grille bars */
  function grilleTex(THREE) {
    return canvasTex(THREE, "grille58", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* paint: the Kynda references here are monochrome, so the colours are the
     Kashin's photograph samples (same fleet and period), taken to about
     0.85-0.9 of their level: hull rgb 155,161,167 -> 0x8a9298, the houses a
     touch lighter, the decks dark grey; the funnel cowls black [A] */
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
  /* tapered block centred at x,y,z: bottom lx0 x ly0, top lx1 x ly1 */
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var ax = lx0 / 2, ay = ly0 / 2, bx = lx1 / 2, by = ly1 / 2, hz = lz / 2;
    return hexa(THREE, p, m, [[x - ax, y - ay, z - hz], [x + ax, y - ay, z - hz], [x + ax, y + ay, z - hz], [x - ax, y + ay, z - hz],
                              [x - bx, y - by, z + hz], [x + bx, y - by, z + hz], [x + bx, y + by, z + hz], [x - bx, y + by, z + hz]]);
  }
  /* convex polygon (CCW from above) extruded z0..z1 */
  function polyPrism(THREE, p, m, pts, z0, z1, uvf) {
    var pos = [], uv = [], n = pts.length, i, a, b;
    uvf = uvf || function (x, y, z, side) { return side ? [x * 0.16 + y * 0.16, z * 0.16] : [x * 0.16, y * 0.16]; };
    function tri(P, Q, R, side) {
      var k, v = [P, Q, R], t;
      for (k = 0; k < 3; k++) { pos.push(v[k][0], v[k][1], v[k][2]); t = uvf(v[k][0], v[k][1], v[k][2], side); uv.push(t[0], t[1]); }
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
    for (x = 58; x < XS1; x += 1.2) xs.push(x);
    for (x = XS0; x < XST; x += 0.7) xs.push(x);
    for (i = 0; i <= 6; i++) xs.push(XB0 - 0.3 + (XB1 - XB0 + 0.6) * i / 6);
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
  /* the weather deck, edge to edge, 4 strips across; it climbs the break */
  function deckSheet(THREE, m) {
    var xs = hullXs(), pos = [], uv = [], idx = [], i, j, NC = 4;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = halfB(x), z = deckZ(x);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC) + z) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  /* the transom: what stands above the raked overhang [P] */
  function transom(THREE, g, T) {
    var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, k;
    var pos = [], uv = [];
    for (j = 0; j < N; j++) {
      var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
      var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1);
      pos.push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
      for (k = 0; k < 6; k++) uv.push(pos[pos.length - 18 + k * 3 + 1] / 24, pos[pos.length - 18 + k * 3 + 2] / 8);
    }
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
  /* a rail round a roof edge, given as a polyline at height z */
  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 3.2));
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
  /* a dish facing +X, rim radius rad, squashed to sy x sz */
  function dish(THREE, g, m, rad, x, y, z, sy, sz, tilt) {
    var dg = new THREE.SphereGeometry(rad, 14, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    dg.scale(1, sy || 1, sz || 1);
    if (tilt) dg.rotateY(-tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }
  /* a "cheese" reflector: a curved strip concave toward +X, w wide, h tall */
  function cheese(THREE, g, m, w, h, x, y, z, tilt) {
    var cg = new THREE.CylinderGeometry(w * 0.75, w * 0.75, h, 12, 1, true, -0.72, 1.44);
    cg.translate(0, 0, -w * 0.75);
    cg.rotateX(PI / 2); cg.rotateZ(-PI / 2);
    var c = new THREE.Mesh(cg, m), grp = new THREE.Group();
    grp.add(c); grp.position.set(x, y, z); grp.rotation.y = tilt || 0; g.add(grp);
    return grp;
  }

  /* SM-70 at rest pointing +X: four P-35 containers SIDE BY SIDE [C][A]
     (the missile 9.8 m x 0.86 m [R]; the containers about 11 m x 1.64 m
     [P]), domed fronts, on a cradle over a round barbette [A].  ax is the
     containers' axis height over the mount base. */
  function sm70(THREE, g, T, ax) {
    var i, s;
    cylZ(THREE, g, 2.15, 2.45, ax - 1.15, 20, T.sup, 0, 0, (ax - 1.15) / 2);
    cylZ(THREE, g, 2.0, 2.1, 0.18, 20, T.metal, 0, 0, ax - 1.06);
    /* the trainer: a deck under the containers and the two side cheeks */
    box(THREE, g, 3.4, 6.9, 0.32, T.sup, -0.4, 0, ax - 0.86);
    for (s = -1; s <= 1; s += 2) {
      hexa(THREE, g, T.sup, [[-2.4, s * 3.42 - 0.12, ax - 1.0], [1.6, s * 3.42 - 0.12, ax - 1.0], [1.6, s * 3.42 + 0.12, ax - 1.0], [-2.4, s * 3.42 + 0.12, ax - 1.0],
                              [-1.6, s * 3.42 - 0.12, ax + 0.2], [0.8, s * 3.42 - 0.12, ax + 0.2], [0.8, s * 3.42 + 0.12, ax + 0.2], [-1.6, s * 3.42 + 0.12, ax + 0.2]]);
    }
    for (i = 0; i < 4; i++) {
      var y = -2.55 + i * 1.7;
      cylX(THREE, g, 0.82, 0.82, 9.6, 14, T.sup, -0.6, y, ax, true);
      /* domed front cap and the rear end ring */
      var dg = new THREE.SphereGeometry(0.82, 14, 4, 0, PI * 2, 0, PI / 2);
      dg.rotateZ(-PI / 2); dg.scale(0.85, 1, 1);
      var dm = new THREE.Mesh(dg, T.sup); dm.position.set(4.2, y, ax); g.add(dm);
      cylX(THREE, g, 0.86, 0.86, 0.3, 14, T.metal, -5.3, y, ax);
      cylX(THREE, g, 0.7, 0.7, 0.06, 12, T.dark, -5.47, y, ax);
      /* the hoops */
      cylX(THREE, g, 0.85, 0.85, 0.18, 14, T.metal, -2.6, y, ax, true);
      cylX(THREE, g, 0.85, 0.85, 0.18, 14, T.metal, 1.4, y, ax, true);
      cylX(THREE, g, 0.85, 0.85, 0.12, 14, T.metal, 3.9, y, ax, true);
    }
    /* the rack along the tops [A][C] */
    for (i = 0; i < 5; i++) box(THREE, g, 0.22, 6.8, 0.2, T.metal, -4.4 + i * 2.1, 0, ax + 0.86);
    for (i = 0; i < 4; i++) box(THREE, g, 9.0, 0.16, 0.16, T.metal, -0.2, -2.55 + i * 1.7, ax + 0.9);
    return g;
  }
  /* twin 76 mm AK-726 at rest pointing +X: the rounded shield (about 4.4 m
     long, 3.2 m wide, 2.3 m tall), barrels raised a little */
  function ak726(THREE, g, T) {
    cylZ(THREE, g, 1.75, 1.85, 0.35, 18, T.sup, -0.2, 0, 0.17);
    var xs = [-2.3, -2.2, -1.6, -0.4, 0.8, 1.5, 1.95, 2.15];
    var sec = [[1.35, 0.85, 1.25, 3.2], [1.5, 0.98, 1.27, 3.0], [1.6, 1.05, 1.28, 2.8], [1.62, 1.05, 1.28, 2.8],
               [1.58, 1.0, 1.25, 2.6], [1.45, 0.9, 1.2, 2.4], [1.25, 0.75, 1.15, 2.2], [0.9, 0.55, 1.1, 2.0]];
    var rings = sec.map(function (s) { return superRing(s[0], s[1] * 1.14, s[2] * 1.14 + 0.12, 2 / s[3], 20); });
    ringLoft(THREE, g, T.sup, xs, rings, true);
    box(THREE, g, 0.9, 2.2, 0.22, T.sup, -0.9, 0, 2.82);
    box(THREE, g, 0.1, 0.9, 0.5, T.dark, -2.32, 0, 1.4);
    var s, bar = new THREE.Group(); bar.position.set(1.7, 0, 1.62); bar.rotation.y = -0.12;
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.2, 0.55, 0.9, T.dark, 2.18, s * 0.42, 1.62);
      cylX(THREE, bar, 0.17, 0.2, 0.9, 10, T.gun, 0.6, s * 0.42, 0);
      cylX(THREE, bar, 0.075, 0.09, 3.4, 8, T.gun, 2.7, s * 0.42, 0, true);
      cylX(THREE, bar, 0.1, 0.1, 0.3, 8, T.gun, 4.3, s * 0.42, 0);
    }
    g.add(bar);
    return g;
  }
  /* ZIF-101 twin-arm launcher, arms empty, raised about 12 deg, at rest
     pointing +X: the drum pedestal, the trainer body and the two beams */
  function zif101(THREE, g, T) {
    cylZ(THREE, g, 1.25, 1.45, 1.3, 16, T.sup, 0, 0, 0.65);
    cylZ(THREE, g, 1.05, 1.15, 0.25, 16, T.metal, 0, 0, 1.42);
    hexa(THREE, g, T.sup, [
      [-1.3, -1.0, 1.5], [1.0, -1.0, 1.5], [1.0, 1.0, 1.5], [-1.3, 1.0, 1.5],
      [-1.1, -0.85, 2.6], [0.8, -0.8, 2.6], [0.8, 0.8, 2.6], [-1.1, 0.85, 2.6]]);
    box(THREE, g, 0.7, 3.2, 0.6, T.sup, 0.2, 0, 2.3);
    var arms = new THREE.Group(); arms.position.set(0.2, 0, 2.35); arms.rotation.y = -0.21;
    var s;
    for (s = -1; s <= 1; s += 2) {
      hexa(THREE, arms, T.sup, [
        [-1.6, s * 1.35 - 0.2, -0.45], [3.6, s * 1.35 - 0.16, -0.12], [3.6, s * 1.35 + 0.16, -0.12], [-1.6, s * 1.35 + 0.2, -0.45],
        [-1.6, s * 1.35 - 0.2, 0.35], [3.6, s * 1.35 - 0.16, 0.18], [3.6, s * 1.35 + 0.16, 0.18], [-1.6, s * 1.35 + 0.2, 0.35]]);
      box(THREE, arms, 0.5, 0.3, 0.55, T.sup, 3.75, s * 1.35, -0.2);
      box(THREE, arms, 4.6, 0.12, 0.1, T.metal, 1.2, s * 1.35, -0.42);
      box(THREE, arms, 0.6, 0.9, 0.5, T.sup, -0.2, s * 0.85, 0);
    }
    g.add(arms);
    return g;
  }
  /* RBU-6000: twelve barrels in a horseshoe on a trainer, raised */
  function rbu6000(THREE, g, T) {
    var i, a;
    cylZ(THREE, g, 0.55, 0.7, 0.6, 10, T.sup, 0, 0, 0.3);
    box(THREE, g, 1.2, 1.6, 0.5, T.sup, -0.1, 0, 0.85);
    var cl = new THREE.Group(); cl.position.set(0.2, 0, 1.25); cl.rotation.y = -0.45;
    for (i = 0; i < 12; i++) {
      a = i * PI / 6;
      cylX(THREE, cl, 0.11, 0.11, 1.9, 6, T.gun, 0, Math.cos(a) * 0.5, Math.sin(a) * 0.5, true);
    }
    cylX(THREE, cl, 0.62, 0.62, 0.25, 12, T.sup, -0.85, 0, 0);
    g.add(cl);
    return g;
  }
  /* Owl Screech (MR-105 Turel): the cone pedestal, the housing, the round
     dish [H][A] */
  function owlScreech(THREE, g, T, x, z0, z1, yaw) {
    cylZ(THREE, g, 0.65, 1.15, z1 - z0, 12, T.sup, x, 0, (z0 + z1) / 2);
    cylZ(THREE, g, 1.0, 0.85, 0.3, 12, T.sup, x, 0, z1 + 0.15);
    var h = new THREE.Group(); h.position.set(x, 0, z1 + 0.3); h.rotation.z = yaw || 0;
    box(THREE, h, 1.5, 1.7, 1.1, T.sup, -0.1, 0, 0.6);
    cylZ(THREE, h, 0.55, 0.55, 0.3, 10, T.sup, -0.3, 0, 1.25);
    dish(THREE, h, T.metal, 1.05, 1.05, 0, 0.75, 1, 1, 0);
    box(THREE, h, 0.5, 0.4, 0.4, T.sup, 0.5, -1.0, 0.9);
    g.add(h);
  }
  /* Peel Group (Yatagan): pedestal and trainer carrying two pairs of
     cheese reflectors, one horizontal and one vertical, side by side */
  function peelGroup(THREE, g, T, x, z, yaw, sc) {
    var h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.z = yaw || 0; h.scale.set(sc, sc, sc);
    cylZ(THREE, h, 0.7, 0.85, 1.8, 12, T.sup, 0, 0, 0.9);
    box(THREE, h, 1.6, 3.6, 0.7, T.sup, -0.1, 0, 2.05);
    box(THREE, h, 1.3, 1.2, 1.4, T.sup, -0.4, 0, 2.8);
    var a = new THREE.Group(); a.rotation.y = -0.08; a.position.z = 0.6; h.add(a);
    cheese(THREE, a, T.metal, 2.6, 0.9, 0.55, 1.15, 2.4, 0);
    cheese(THREE, a, T.metal, 0.95, 2.6, 0.55, -1.15, 2.4, 0);
    cheese(THREE, a, T.metal, 1.4, 0.5, 0.4, -1.1, 4.0, 0);
    cheese(THREE, a, T.metal, 0.5, 1.4, 0.4, 1.1, 3.95, 0);
    strut(THREE, h, T.metal, -0.2, 1.15, 2.4, -0.2, 1.15, 3.9, 0.08, 4);
    strut(THREE, h, T.metal, -0.2, -1.15, 2.4, -0.2, -1.15, 3.9, 0.08, 4);
    box(THREE, h, 0.3, 3.0, 0.2, T.metal, -0.2, 0, 3.9);
    g.add(h);
  }
  /* Scoop Pair (Binom): two dishes one above the other on a frame, with
     their feed spars and the side arms, looking +X; the boom back to the
     tower [P][H][R] */
  function scoopPair(THREE, g, T, x, z, yaw, xt) {
    var h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.z = yaw; g.add(h);
    var s;
    box(THREE, h, 0.9, 1.1, 1.3, T.sup, -0.55, 0, 0);
    box(THREE, h, 0.25, 0.3, 4.4, T.metal, -0.15, 0, 0);
    box(THREE, h, 0.25, 3.4, 0.3, T.metal, -0.15, 0, 0);
    for (s = -1; s <= 1; s += 2) {
      dish(THREE, h, T.metal, 1.25, 0.15, 0, s * 1.3, 1, 0.92, 0);
      strut(THREE, h, T.metal, 0.1, 0, s * 1.3, 1.25, 0, s * 1.3, 0.05, 3);
      box(THREE, h, 0.3, 0.3, 0.3, T.metal, 1.3, 0, s * 1.3);
      box(THREE, h, 0.6, 0.5, 0.6, T.sup, -0.3, s * 1.75, 0);
    }
    /* the boom from the tower face */
    var L = Math.abs(x - xt);
    box(THREE, h, L, 0.5, 0.5, T.sup, -0.55 - L / 2, 0, -0.2);
    strut(THREE, h, T.metal, -1.0, 0, -0.4, -L, 0, -2.2, 0.08, 4);
  }
  /* Head Net-A (MR-300 Angara): ONE elongated cheese reflector on a
     turntable with its back frame [R][H][P] */
  function headNetA(THREE, g, T, x, z, yaw) {
    var h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.z = yaw || 0;
    cylZ(THREE, h, 0.4, 0.5, 0.5, 10, T.metal, 0, 0, 0.25);
    box(THREE, h, 0.5, 0.7, 1.2, T.metal, -0.1, 0, 0.95);
    cheese(THREE, h, T.metal, 6.2, 1.5, 0.4, 0, 1.25, -0.1);
    box(THREE, h, 0.12, 5.6, 0.12, T.metal, -0.35, 0, 1.25);
    strut(THREE, h, T.metal, -0.3, 0, 1.3, 1.6, 0, 1.15, 0.05, 3);
    box(THREE, h, 0.3, 0.3, 0.3, T.metal, 1.6, 0, 1.15);
    g.add(h);
  }
  /* a plated pyramid tower [R][P][H]: bottom x ab..af, half width wb at zb;
     top x tb..tf, half width wt at zt; louvres and doors on the sides */
  function tower(THREE, g, T, ab, af, wb, zb, tb, tf, wt, zt, zs) {
    /* grey below zs, black above it, as the towers are painted in [G][B][C] */
    var q = (zs - zb) / (zt - zb), sb = ab + (tb - ab) * q, sf = af + (tf - af) * q, sw = wb + (wt - wb) * q;
    hexa(THREE, g, T.sup, [[ab, -wb, zb], [af, -wb, zb], [af, wb, zb], [ab, wb, zb],
                            [sb, -sw, zs], [sf, -sw, zs], [sf, sw, zs], [sb, sw, zs]]);
    hexa(THREE, g, T.soot, [[sb, -sw, zs], [sf, -sw, zs], [sf, sw, zs], [sb, sw, zs],
                             [tb, -wt, zt], [tf, -wt, zt], [tf, wt, zt], [tb, wt, zt]]);
    var s, k;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      var f = 0.1 + k * 0.3, zz = zb + (zt - zb) * f;
      var xm = (ab + af) / 2 + ((tb + tf) / 2 - (ab + af) / 2) * f, ww = wb + (wt - wb) * f;
      box(THREE, g, 0.7, 0.06, 0.8, T.dark, xm, s * (ww + 0.03), zz);
    }
  }
  /* an oval funnel [P][H][A][B]: centre cx, length L, breadth B, from z0;
     the top falls from zf (forward) to za (aft), the upper 1.3 m black
     with the grille on top, and a black cowl lip projecting aft */
  function funnel(THREE, g, T, cx, L, B, z0, zf, za, lip) {
    var N = 24, j, k, ring = [];
    for (j = 0; j < N; j++) {
      var t = j / N * PI * 2, c = Math.cos(t), s = Math.sin(t);
      ring.push([cx + L / 2 * Math.sign(c) * Math.pow(Math.abs(c), 0.55), B / 2 * Math.sign(s) * Math.pow(Math.abs(s), 0.55)]);
    }
    function zt(px) { return za + (zf - za) * (px - (cx - L / 2)) / L; }
    function band(m, lo, hi) {
      var pos = [], uv = [];
      for (j = 0; j < N; j++) {
        var a = ring[j], b = ring[(j + 1) % N];
        var a0 = lo(a[0]), a1 = hi(a[0]), b0 = lo(b[0]), b1 = hi(b[0]);
        pos.push(a[0], a[1], a0, b[0], b[1], b0, b[0], b[1], b1, a[0], a[1], a0, b[0], b[1], b1, a[0], a[1], a1);
        var ua = (a[0] + a[1]) / 6, ub = (b[0] + b[1]) / 6;
        uv.push(ua, a0 / 6, ub, b0 / 6, ub, b1 / 6, ua, a0 / 6, ub, b1 / 6, ua, a1 / 6);
      }
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv), m));
    }
    band(T.sup, function () { return z0; }, function (px) { return zt(px) - 1.3; });
    band(T.soot, function (px) { return zt(px) - 1.3; }, function (px) { return zt(px); });
    var pos = [], uv = [], zc = zt(cx) - 0.25;
    for (j = 0; j < N; j++) {
      var a = ring[j], b = ring[(j + 1) % N];
      pos.push(cx, 0, zc, a[0], a[1], zt(a[0]) - 0.25, b[0], b[1], zt(b[0]) - 0.25);
      uv.push(0.5, 0.5, (a[0] - cx) / L + 0.5, a[1] / B + 0.5, (b[0] - cx) / L + 0.5, b[1] / B + 0.5);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.dark));
    /* the cowl lip, continuing the top's fall aft */
    var xa = cx - L / 2, sl = (zf - za) / L;
    hexa(THREE, g, T.soot, [[xa - lip, -B * 0.32, za - lip * sl - 0.2], [xa + 0.4, -B * 0.4, za - 0.2], [xa + 0.4, B * 0.4, za - 0.2], [xa - lip, B * 0.32, za - lip * sl - 0.2],
                             [xa - lip, -B * 0.32, za - lip * sl], [xa + 0.4, -B * 0.4, za + 0.05], [xa + 0.4, B * 0.4, za + 0.05], [xa - lip, B * 0.32, za - lip * sl]]);
    for (k = 0; k < 2; k++) {
      var sy = k ? 1 : -1;
      box(THREE, g, L * 0.5, 0.06, 0.8, T.dark, cx, sy * (B / 2 * 0.98), z0 + 1.2);
    }
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x;

    /* hull shell in three bands, transom, weather deck [P][A] */
    g.add(shellBand(THREE, T.under, -6, -0.4, 5));
    g.add(shellBand(THREE, T.boot, -0.4, 0.6, 1));
    g.add(shellBand(THREE, T.hull, 0.6, 12, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    /* the anchors in their pockets [C]; a row of scuttles under the
       forecastle deck [C][B]; a hull door aft */
    for (s = -1; s <= 1; s += 2) {
      var az = 6.0, ax = 64.6, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 2.0, 0.12, 1.8, T.dark, ax, ay, az, -s * 0.12);
      box(THREE, g, 1.3, 0.18, 1.3, T.gun, ax + 0.1, ay + s * 0.04, az - 0.25, -s * 0.12);
      for (i = 0; i < 22; i++) {
        x = -20 + i * 3.6;
        if (x > 56) break;
        var zz = deckZ(x) - 1.25;
        box(THREE, g, 0.3, 0.08, 0.3, T.dark, x, s * (W(x, zz) + 0.01), zz);
      }
    }

    /* ---- the long 01 deckhouse on the forecastle, x -23.6 to 27.6 [P][B] */
    polyPrism(THREE, g, T.sup, [[-23.6, -5.3], [-22.8, -5.75], [18.0, -5.75], [27.6, -5.0], [27.6, 5.0], [18.0, 5.75], [-22.8, 5.75], [-23.6, 5.3]],
              5.7, R01);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 9; i++) {
        x = -19 + i * 5.4;
        if (x > 25) break;
        box(THREE, g, (i % 3 === 0) ? 0.9 : 0.5, 0.06, (i % 3 === 0) ? 1.8 : 0.5, T.dark, x, s * 5.78, (i % 3 === 0) ? 6.95 : 7.7);
      }
      /* the paired round fittings on the after deckhouse side [P][A] */
      for (i = 0; i < 2; i++) {
        var rf = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.14, 14), T.metal);
        rf.position.set(-15.9 + i * 2.3, s * 5.8, 7.95); g.add(rf);
        var rd = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.16, 12), T.dark);
        rd.position.set(-15.9 + i * 2.3, s * 5.81, 7.95); g.add(rd);
      }
    }
    /* the after reload door, facing the after SM-70 [R][A] */
    box(THREE, g, 0.1, 3.0, 1.8, T.dark, -23.66, 0, 6.85);
    roofRail(THREE, g, T, [[-21.6, 5.65], [-23.5, 5.2], [-23.5, -5.2], [-21.6, -5.65]], R01, 0.9);

    /* ---- the after 02 block round the after tower and the funnel [P][H] */
    polyPrism(THREE, g, T.sup, [[-21.3, -4.2], [-20.5, -4.8], [-0.6, -4.8], [-0.6, 4.8], [-20.5, 4.8], [-21.3, 4.2]], R01 - 0.05, R02A);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++)
      box(THREE, g, 0.5, 0.06, 0.5, T.dark, -18.5 + i * 6.2, s * 4.82, 10.0);
    roofRail(THREE, g, T, [[-0.8, 4.7], [-21.1, 4.7], [-21.1, -4.7], [-0.8, -4.7]], R02A, 0.8);
    /* the Owl Screech on the 01 roof abaft it [P][H][A] */
    owlScreech(THREE, g, T, -22.5, R01, 12.6, PI);
    /* the after funnel x -21 to -14.5, top 16.9 forward, 15.3 aft [P][H][A] */
    funnel(THREE, g, T, -17.75, 6.5, 4.4, R02A - 0.05, 16.9, 15.3, 2.0);
    /* the derrick boom by it [H][B] */
    strut(THREE, g, T.metal, -11.0, 3.6, R02A + 0.3, -17.0, 4.1, 15.2, 0.11, 5);
    strut(THREE, g, T.metal, -11.0, 3.6, R02A + 0.3, -11.0, 3.6, R02A + 1.4, 0.16, 6);

    /* ---- the after tower, the taller [P][H][G] */
    tower(THREE, g, T, -9.6, -1.4, 3.0, R02A - 0.05, -6.0, -4.8, 0.7, 24.6, 18.6);
    for (i = 0; i < 3; i++) {
      var pz = [14.8, 17.2, 19.4][i];
      var f0 = (pz - R02A) / (24.6 - R02A), xa0 = -9.6 + 3.6 * f0, xf0 = -1.4 - 3.4 * f0, w0 = 3.0 - 2.3 * f0;
      box(THREE, g, xf0 - xa0 + 2.2, w0 * 2 + 0.6, 0.12, T.metal, (xa0 + xf0) / 2, 0, pz);
      roofRail(THREE, g, T, [[xa0 - 1.1, w0 + 0.3], [xf0 + 1.1, w0 + 0.3], [xf0 + 1.1, -w0 - 0.3], [xa0 - 1.1, -w0 - 0.3], [xa0 - 1.1, w0 + 0.3]], pz, 0.6);
    }
    box(THREE, g, 0.4, 8.4, 0.2, T.soot, -5.4, 0, 22.4);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.5, 0.6, 0.6, T.metal, -5.4, s * 3.9, 22.75);
    box(THREE, g, 2.4, 2.4, 0.14, T.soot, -5.4, 0, 24.66);
    cylZ(THREE, g, 0.22, 0.32, 2.4, 6, T.soot, -5.4, 0, 25.9);
    box(THREE, g, 1.8, 1.8, 0.12, T.soot, -5.4, 0, 27.1);
    headNetA(THREE, g, T, -5.4, 27.16, 0.4);
    strut(THREE, g, T.soot, -5.9, 0, 27.1, -5.9, 0, 30.0, 0.06, 4);
    box(THREE, g, 0.1, 3.0, 0.1, T.soot, -5.9, 0, 29.0);
    scoopPair(THREE, g, T, -12.0, 21.1, PI, -5.9);

    /* ---- the forward block: 02 level x 3.5-27.4, the bridge (03) and
       the Peel Group [P][H][C] */
    polyPrism(THREE, g, T.sup, [[3.5, -4.9], [24.0, -4.9], [27.4, -4.2], [27.4, 4.2], [24.0, 4.9], [3.5, 4.9]], R01 - 0.05, R02F);
    /* the forward reload door, right behind the forward SM-70 [C][R] */
    box(THREE, g, 0.12, 3.4, 2.0, T.dark, 27.44, 0, 9.65);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++)
      box(THREE, g, 0.5, 0.06, 0.5, T.dark, 5.5 + i * 6.0, s * 4.92, 10.3);
    polyPrism(THREE, g, T.sup, [[16.4, -4.3], [25.2, -4.3], [26.4, -3.2], [26.4, 3.2], [25.2, 4.3], [16.4, 4.3]], R02F - 0.05, R03);
    hexa(THREE, g, T.glass, [[26.38, -3.0, 12.45], [26.46, -3.0, 12.45], [26.46, 3.0, 12.45], [26.38, 3.0, 12.45],
                              [26.3, -3.0, 13.3], [26.38, -3.0, 13.3], [26.38, 3.0, 13.3], [26.3, 3.0, 13.3]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.6, 0.08, 0.8, T.glass, 25.8, s * 3.76, 12.85, s * 0.74);
      box(THREE, g, 6.0, 0.08, 0.75, T.glass, 21.6, s * 4.32, 12.85);
      /* bridge wings with their screens */
      box(THREE, g, 3.0, 1.9, 0.16, T.sup, 23.8, s * 5.2, R02F + 0.1);
      box(THREE, g, 3.0, 0.08, 1.0, T.sup, 23.8, s * 6.12, R02F + 0.6);
    }
    box(THREE, g, 9.2, 8.8, 0.12, T.metal, 21.0, 0, R03 + 0.06);
    roofRail(THREE, g, T, [[16.6, 4.2], [25.2, 4.2], [26.3, 3.1], [26.3, -3.1], [25.2, -4.2], [16.6, -4.2]], R03, 0.8);
    tprism(THREE, g, 3.4, 3.4, 2.8, 2.8, 0.8, T.sup, 22.7, 0, R03 + 0.4);
    peelGroup(THREE, g, T, 22.7, R03 + 0.8, 0, 0.95);
    strut(THREE, g, T.metal, 18.0, 0, R03, 18.0, 0, 18.4, 0.05, 4);
    box(THREE, g, 0.08, 3.2, 0.08, T.metal, 18.0, 0, 17.6);

    /* ---- the forward tower x 10-15, aft face steep [P][H][G] */
    tower(THREE, g, T, 9.8, 15.6, 2.7, R02F - 0.05, 11.9, 13.1, 0.65, 24.0, 19.2);
    for (i = 0; i < 2; i++) {
      var qz = [15.2, 18.0][i];
      var g0 = (qz - R02F) / (24.0 - R02F), xa1 = 9.8 + 2.1 * g0, xf1 = 15.6 - 2.5 * g0, w1 = 2.7 - 2.05 * g0;
      box(THREE, g, xf1 - xa1 + 2.0, w1 * 2 + 0.6, 0.12, T.metal, (xa1 + xf1) / 2, 0, qz);
      roofRail(THREE, g, T, [[xa1 - 1.0, w1 + 0.3], [xf1 + 1.0, w1 + 0.3], [xf1 + 1.0, -w1 - 0.3], [xa1 - 1.0, -w1 - 0.3], [xa1 - 1.0, w1 + 0.3]], qz, 0.6);
    }
    box(THREE, g, 0.4, 7.6, 0.2, T.soot, 12.5, 0, 20.6);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.5, 0.6, 0.6, T.metal, 12.5, s * 3.5, 20.95);
    box(THREE, g, 2.2, 2.2, 0.14, T.soot, 12.5, 0, 24.06);
    cylZ(THREE, g, 0.2, 0.3, 0.9, 6, T.soot, 12.5, 0, 24.55);
    box(THREE, g, 1.7, 1.7, 0.12, T.soot, 12.5, 0, 25.0);
    headNetA(THREE, g, T, 12.5, 25.06, -0.4);
    strut(THREE, g, T.soot, 12.0, 0, 25.0, 12.0, 0, 27.6, 0.06, 4);
    box(THREE, g, 0.1, 2.6, 0.1, T.soot, 12.0, 0, 27.0);
    scoopPair(THREE, g, T, 17.2, 21.5, 0, 13.0);
    /* the forward funnel x 4.5-10, abaft the tower [P][H] */
    funnel(THREE, g, T, 7.3, 5.6, 4.2, R02F - 0.05, 15.8, 15.0, 1.0);
    roofRail(THREE, g, T, [[3.7, 4.8], [9.6, 4.8]], R02F, 0.8);
    roofRail(THREE, g, T, [[3.7, -4.8], [9.6, -4.8]], R02F, 0.8);
    /* the low waist between the forward funnel and the after block, on the
       01 roof: vents and lockers [H] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.6, 1.2, 1.0, T.sup, 1.2, s * 3.2, R01 + 0.5);
      cylZ(THREE, g, 0.35, 0.35, 0.8, 8, T.sup, 2.6, s * 1.6, R01 + 0.4);
      cylZ(THREE, g, 0.48, 0.35, 0.22, 8, T.sup, 2.6, s * 1.6, R01 + 0.9);
    }
    roofRail(THREE, g, T, [[3.4, 5.6], [-0.5, 5.6]], R01, 0.8);
    roofRail(THREE, g, T, [[3.4, -5.6], [-0.5, -5.6]], R01, 0.8);

    /* ---- forecastle: the Volna magazine house and launcher, the RBU-6000
       pair, ground tackle [P][C] */
    polyPrism(THREE, g, T.sup, [[40.8, -3.9], [49.6, -3.5], [51.5, -2.2], [51.5, 2.2], [49.6, 3.5], [40.8, 3.9]], deckZ(40.8) - 0.2, 8.5);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.9, 0.06, 1.6, T.dark, 42.2, s * 3.88, 7.5);
      box(THREE, g, 1.4, 1.6, 0.12, T.dark, 49.2, s * 1.1, 8.56);
    }
    roofRail(THREE, g, T, [[41.0, 3.8], [49.6, 3.4], [51.4, 2.2], [51.4, -2.2], [49.6, -3.4], [41.0, -3.8]], 8.5, 0.9);
    var vl = new THREE.Group(); vl.position.set(45.8, 0, 8.5); zif101(THREE, vl, T); g.add(vl);
    for (s = -1; s <= 1; s += 2) {
      var rb = new THREE.Group(); rb.position.set(53.4, s * 2.0, deckZ(53.4)); rbu6000(THREE, rb, T); g.add(rb);
      cylZ(THREE, g, 0.45, 0.5, 0.5, 10, T.metal, 61.4, s * 1.25, deckZ(61.4) + 0.25);
      box(THREE, g, 2.8, 0.18, 0.08, T.gun, 62.8, s * 1.7, deckZ(62.8) + 0.05, -s * 0.35);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, 57.0, s * 3.9, deckZ(57) + 0.25);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, 57.6, s * 3.8, deckZ(57.6) + 0.25);
    }
    box(THREE, g, 1.3, 1.0, 0.5, T.metal, 59.6, 0, deckZ(59.6) + 0.25);
    strut(THREE, g, T.metal, 70.6, 0, deckZ(70.6), 70.6, 0, deckZ(70.6) + 3.0, 0.05, 4);

    /* ---- the after SM-70 on the quarterdeck, trained aft [P][A] */
    var aft = new THREE.Group(); aft.position.set(-32.4, 0, deckZ(-32.4)); aft.rotation.z = PI;
    sm70(THREE, aft, T, 2.68); g.add(aft);

    /* ---- the AK-726 pair, superfiring, trained aft [P][A][H][R] */
    polyPrism(THREE, g, T.sup, [[-47.0, -3.0], [-45.6, -3.7], [-37.6, -3.7], [-37.4, -3.2], [-37.4, 3.2], [-37.6, 3.7], [-45.6, 3.7], [-47.0, 3.0]],
              deckZ(-42) - 0.2, 6.0);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.06, 1.6, T.dark, -40.0, s * 3.72, 4.95);
    roofRail(THREE, g, T, [[-37.6, 3.6], [-46.8, 3.6], [-46.8, -3.6], [-37.6, -3.6]], 6.0, 0.8);
    cylZ(THREE, g, 1.9, 1.95, 0.6, 18, T.sup, -44.1, 0, 6.3);
    var gU = new THREE.Group(); gU.position.set(-44.1, 0, 6.6); gU.rotation.z = PI; ak726(THREE, gU, T); g.add(gU);
    cylZ(THREE, g, 1.9, 1.95, 0.5, 18, T.sup, -50.6, 0, deckZ(-50.6) + 0.25);
    var gL = new THREE.Group(); gL.position.set(-50.6, 0, deckZ(-50.6) + 0.5); gL.rotation.z = PI; ak726(THREE, gL, T); g.add(gL);
    /* the small house abaft them [P][A] and the plain pad [A][E] */
    polyPrism(THREE, g, T.sup, [[-57.2, -1.6], [-53.0, -1.6], [-53.0, 1.6], [-57.2, 1.6]], deckZ(-55) - 0.2, 5.2);
    box(THREE, g, 0.06, 1.0, 0.8, T.dark, -53.0, 0, 4.55);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, -67.0, s * 5.2, deckZ(-67) + 0.25);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, -67.6, s * 5.1, deckZ(-67.6) + 0.25);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, -28.0, s * 6.9, deckZ(-28) + 0.25);
    }
    strut(THREE, g, T.metal, -70.6, 0, deckZ(-70.6), -70.6, 0, deckZ(-70.6) + 4.2, 0.06, 4);

    /* ---- underwater gear: two shafts on A-brackets, props, rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.26, 0.26, 10.0, 8, T.metal, -58.5, s * 3.3, -3.3);
      strut(THREE, g, T.metal, -62.0, s * 3.3, -3.3, -62.0, s * 4.2, -1.4, 0.15, 4);
      strut(THREE, g, T.metal, -62.0, s * 3.3, -3.3, -62.0, s * 2.2, -1.5, 0.15, 4);
      cylX(THREE, g, 0.38, 0.55, 0.9, 8, T.metal, -64.0, s * 3.3, -3.3);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 1.5), T.metal);
        bl.position.set(-64.0, s * 3.3, -3.3); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.95); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.6, 0.22, 2.8, T.metal, -66.4, s * 1.8, -1.6);
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 36.0, 0.08, 0.6, T.under, -4.0, s * (W(-4, -3.6) + 0.2), -3.65, 0);

    /* ---- rails along the deck edge: quarterdeck, forecastle */
    railRun(THREE, g, T, -70.6, -26.0, 4.4, 1.0);
    railRun(THREE, g, T, -23.4, 28.0, 5.6, 1.0);
    railRun(THREE, g, T, 28.0, 70.0, 4.4, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.2, 0.9, 0.04, T.team, -40.6, 0, 6.02);
    box(THREE, g, 2.4, 0.9, 0.04, T.team, 17.6, 0, R03 + 0.14);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, 42.0, 0, 8.52);

    /* trained mount: the forward SM-70, muzzles forward [P][C] - the row's
       first weapon is the P-35 */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(33.8, 0, deckZ(33.8)); sm70(THREE, tw, T, 9.0 - deckZ(33.8));

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

/* Registration: len is the real overall length of Project 58, 142 m. */
UNIT_MODELS["pact_e60_cruiser"] = {
  len: 142.0,
  build: function (THREE, M, C) { return HeroKynda.build(THREE, M, C); }
};
