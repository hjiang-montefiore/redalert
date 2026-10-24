/* ==================== js/hero/ru_kashin.js ==============================
   HERO MODEL -- Project 61 "Kashin" class large anti-submarine ship (BPK),
   as built and as photographed 1967-1970: the first all-gas-turbine major
   warship, NOT the later 61M / 61MP "Kashin-Mod" refit (no P-15 boxes, no
   AK-630s, no raised stern platform).  Key: pact_e60_destroyer.
   Length overall 144 m, beam 15.8 m (js/warship_specs.js 144 / 15.8),
   draught about 4.7 m.  REDO 2026-10-24: hull lofted from a section table
   scaled off the recognition profile; the mounts put back in the order
   the photographs show (gun outboard, launcher inboard on its magazine
   house, at BOTH ends - the earlier model had the after pair swapped);
   empty ZIF-101 launchers, Head Net-C and Big Net, Peel Group and Owl
   Screech directors, the tall forward and low after uptake casings.

   REFERENCES (Wikimedia Commons, fetched at width 960):
     [P] "Kashin-class destroyer profile 1987.png" - recognition profile,
         hull 883 px = 144 m (6.13 px/m; the old header's "914 px" was the
         image width), waterline at y 192.  Every station below: the stem
         raked from x 65.8 at the waterline to 72 at the deck (8.5 m); the
         sheer rising from about x 16; the fore AK-726 x 49.8; the fore
         launcher x 40 on its house x 32.7-46.4; the Owl Screech pedestal
         x 30.7; the bridge block x 17-25.8, solid up to 15.4 m, with the
         Peel Group on it (20.4 m); the main mast x 12.9 on a plated mast
         house (11.6 m), Head Net-C 24-26 m, pole 28 m; the forward casing
         x 2.4-9.2 (11.6 m aft, 12.7 m fore); the second mast x -0.2
         (21.7 m); the after Peel
         Group tower x -13 (16.6 m); the after Owl Screech x -19; the after
         casing x -30.4 to -22.3 (lower, about 10 m); the after launcher
         x -36 on its house; the after AK-726 x -48.5.  Its raised stern
         block is NOT drawn: the 1970 photograph shows a flush quarterdeck.
     [B] "UH-2B of HC-2 over Soviet Kashin class destroyer c1968.jpg"
         (port beam, 1968; 8.8 px/m by the two masts): the same stations,
         the forward casing with a vertical front and a roof falling aft,
         the low after casing, Head Net-C crowning the main mast, Big Net
         on the second mast, the Owl Screech tub on its cone, the RBU-6000
         beside it, freeboard about 4 m amidships.
     [M] "Kashin class DDG in the Med 1967.jpg" (starboard bow, 1967): the
         AK-726 on the forecastle with its barrels raised, the ZIF-101 on
         its tall pedestal on the magazine house behind it, arms EMPTY.
     [K] "KrasnyyKavkaz1982.jpg" (starboard bow, colour): an unmodified
         ship - the empty twin arms, the Peel Group pairs, the Owl Screech,
         the RBU-6000 at the bridge side, the five torpedo tubes lying fore
         and aft at the foot of the main mast, Big Net, Head Net-C, the
         dark second mast; hull sampled rgb 155,161,167 in haze.
     [O] "Obraztsovyy1982.jpg" (high, starboard bow): the plan - the house
         widths and side decks, the rounded AK-726 shields, the loading
         hatches on the forward house roof, boats by the forward casing,
         the after launcher house and gun.  The painted circle on her
         quarterdeck in 1982 is NOT drawn (the 1960s-70s views lack it).
     [S] "49KashinClassDestroyerMediterraneanJan1970.jpg" (starboard
         quarter, colour, Jan 1970): flush quarterdeck at main deck level,
         flat transom, the after gun, the after launcher on its house, the
         dark tops of both casings, the dark second mast; hull rgb 129,127,
         160 under a blue cast.
     [W] Russian Wikipedia "Bolshie protivolodochnye korabli proekta 61"
         (in Russian): flush-decked hull rising to a raked stem; launcher and
         gun superfiring at each end; two ZIF-101 with two-drum magazines;
         two AK-726 and two "Turel" (Owl Screech); two "Yatagan" (Peel
         Group) on two bases; two masts; two twin funnels; one five-tube
         PTA-53-61; two RBU-6000 and two RBU-1000; NO scuttles in the crew
         spaces; mine rails aft; Ka-25 visits only, no hangar; sonar in an
         under-keel fairing; from 1966 one Angara (Head Net) replaced by
         Kliver (Big Net).

   RECOGNITION LIST (where each shows):
     1. Long flush hull, low aft, the sheer rising from about x 16 to a
        sharply raked stem 8.5 m high [P][K][W] - STA, XWL/XS1.
     2. Twin AK-726 in rounded shields outboard at each end on the main
        deck: fore (the "turret") x 49.8, aft x -48.5 [P][M][O][S] - ak726().
     3. Twin-arm ZIF-101 (SA-N-1) on tall pedestals, arms empty, on the
        magazine houses inboard of the guns: x 40.5 and x -36.5 [P][M][K][S]
        - zif101(), the two magazine houses with their loading hatches.
     4. Tall forward casing (vertical front, roof falling aft) and the low
        after casing, each over a pair of uptakes with dark tops [P][B][S]
        - casing().
     5. Main lattice mast on its plated mast house with Head Net-C (two
        reflectors back to back) x 12.9, and the dark second mast with
        Big Net x -0.2 [P][B][K][S] - headNetC(), bigNet().
     6. Peel Group directors on the bridge tower and the after tower;
        Owl Screech tubs on cones ahead of the bridge and abaft the after
        casing [P][B][K] - peelGroup(), owlScreech().
     7. RBU-6000 pair beside the forward Owl Screech [B][K] - rbu6000().
     8. Five 533 mm tubes fore and aft beside the main mast house, to port
       (where [K][O] show them; one mount [W]) - tubes5().
     9. A 90 m long superstructure with wide side decks [W][O].
    10. Paint: light blue-grey hull and superstructure, dark grey decks,
        black boot topping [K][S]; no scuttles in the hull [W][K].
   NOT CONFIRMED and therefore not drawn: the RBU-1000 pair (no
   reference here shows where it stood), the sonar fairing (under the
   keel, position and size not found), any pad marking (the 1982
   photograph has one, the 1960s-70s ones do not), boats' exact type.
   Hull numbers, names and flags are never drawn.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The
   forward AK-726 is the group named "turret" (the row has turret:true);
   everything else is baked, one mesh per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKashin = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -72.0, XS1 = 72.0, XWL = 65.8;   /* transom, stem head, stem at the waterline [P] */

  /* HULL SECTION TABLE, scaled off [P] (6.13 px/m), half beams from the
     published 15.8 m and the plan in [O].
     x, deck z, half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power) */
  var STA = [
    [-72.0, 4.70, 6.30, 5.50, -0.70, 3.0],
    [-70.0, 4.66, 6.85, 6.20, -1.70, 2.8],
    [-66.0, 4.58, 7.35, 6.85, -2.90, 2.6],
    [-58.0, 4.46, 7.75, 7.35, -4.00, 2.6],
    [-46.0, 4.34, 7.90, 7.55, -4.55, 2.8],
    [-26.0, 4.20, 7.90, 7.60, -4.70, 3.0],
    [ -4.0, 4.14, 7.90, 7.60, -4.70, 3.0],
    [ 10.0, 4.18, 7.88, 7.50, -4.70, 3.0],
    [ 18.0, 4.32, 7.80, 7.30, -4.68, 2.8],
    [ 26.0, 4.62, 7.55, 6.90, -4.60, 2.6],
    [ 34.0, 5.10, 7.10, 6.20, -4.45, 2.3],
    [ 42.0, 5.62, 6.45, 5.20, -4.15, 2.0],
    [ 50.0, 6.05, 5.50, 3.90, -3.60, 1.75],
    [ 56.0, 6.42, 4.50, 2.70, -2.90, 1.55],
    [ 61.0, 6.90, 3.45, 1.45, -1.90, 1.4],
    [ 65.8, 7.50, 2.25, 0.00,  0.00, 1.3],
    [ 69.0, 7.98, 1.25, 0.00,  0.00, 1.2],
    [ 72.0, 8.50, 0.15, 0.00,  0.00, 1.2]
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
  /* the raked stem: straight from the waterline at XWL to the stem head [P] */
  function zBot(x) { return x > XWL ? deckZ(XS1) * (x - XWL) / (XS1 - XWL) : pick(x, 4); }
  /* half breadth at height z: flared above the waterline, a super-ellipse bilge below */
  function W(x, z) {
    var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
    if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.5);
    var n = pick(x, 5), t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  /* the 01 house roof follows the sheer, 2.6 m over the deck [B][O] */
  function roofZ(x) { return deckZ(x) + 2.6; }

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
     every 1.6 m, butts every 6 m, faint weathering streaks */
  function hullTex(THREE) {
    return canvasTex(THREE, "hull", 512, 256, function (g, w, h) {
      var R = rng(6161), i;
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
    return canvasTex(THREE, "plate", 256, 256, function (g, w, h) {
      var R = rng(6117), i;
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
  /* weather deck: plating seams and a darker worn walkway band */
  function deckTex(THREE) {
    return canvasTex(THREE, "deck", 256, 256, function (g, w, h) {
      var R = rng(611), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* uptake tops: the dark exhaust openings with their grille bars [S][O] */
  function grilleTex(THREE) {
    return canvasTex(THREE, "grille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* paint, photograph samples taken to about 0.85-0.9 of their level:
     [K] hull rgb 155,161,167 -> 0x8a9298; house a touch lighter; the decks
     dark grey as [O] shows them */
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
    for (x = 60; x < XS1; x += 1.2) xs.push(x);
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
  /* the weather deck, edge to edge at deck height, 4 strips across */
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
  /* flat transom [S], by bands */
  function transom(THREE, g, T) {
    var x = XS0, zb = zBot(x), zd = deckZ(x), N = 10, j, s;
    var bands = [[T.under, zb, -0.4], [T.boot, -0.4, 0.6], [T.hull, 0.6, zd]];
    bands.forEach(function (bd) {
      var pos = [], uv = [], k;
      for (j = 0; j < N; j++) {
        var z0 = bd[1] + (bd[2] - bd[1]) * j / N, z1 = bd[1] + (bd[2] - bd[1]) * (j + 1) / N;
        var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1);
        pos.push(x, -w0, z0, x, w0, z0, x, w1, z1, x, -w0, z0, x, w1, z1, x, -w1, z1);
        for (k = 0; k < 6; k++) uv.push(pos[pos.length - 18 + k * 3 + 1] / 24, pos[pos.length - 18 + k * 3 + 2] / 8);
      }
      for (j = 0; j < pos.length; j += 9) {
        for (s = 0; s < 3; s++) { var t = pos[j + 3 + s]; pos[j + 3 + s] = pos[j + 6 + s]; pos[j + 6 + s] = t; }
      }
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv), bd[0]));
    });
  }
  /* the 01 house: walls and roof lofted along x with the roof following the
     sheer (roofZ), half width hw(x); flat end walls */
  function house(THREE, g, m, xs, hw, zt) {
    var pos = [], uv = [], i, s;
    function q(a, b, c, d, u) {
      pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]);
      uv.push(u[0], u[1], u[2], u[3], u[4], u[5], u[0], u[1], u[4], u[5], u[6], u[7]);
    }
    for (i = 0; i < xs.length - 1; i++) {
      var x0 = xs[i], x1 = xs[i + 1], w0 = hw(x0), w1 = hw(x1), t0 = zt(x0), t1 = zt(x1);
      var b0 = deckZ(x0) - 0.3, b1 = deckZ(x1) - 0.3;
      q([x0, -w0, t0], [x1, -w1, t1], [x1, w1, t1], [x0, w0, t0], [x0 / 6, -w0 / 6, x1 / 6, -w1 / 6, x1 / 6, w1 / 6, x0 / 6, w0 / 6]);
      for (s = -1; s <= 1; s += 2) {
        var A = [x0, s * w0, b0], B = [x1, s * w1, b1], Cc = [x1, s * w1, t1], D = [x0, s * w0, t0];
        var U = [x0 / 6, b0 / 6, x1 / 6, b1 / 6, x1 / 6, t1 / 6, x0 / 6, t0 / 6];
        if (s < 0) q(A, B, Cc, D, U); else q(B, A, D, Cc, [U[2], U[3], U[0], U[1], U[6], U[7], U[4], U[5]]);
      }
    }
    var xa = xs[0], xb = xs[xs.length - 1];
    q([xa, hw(xa), deckZ(xa) - 0.3], [xa, -hw(xa), deckZ(xa) - 0.3], [xa, -hw(xa), zt(xa)], [xa, hw(xa), zt(xa)], [0, 0, 1, 0, 1, 0.5, 0, 0.5]);
    q([xb, -hw(xb), deckZ(xb) - 0.3], [xb, hw(xb), deckZ(xb) - 0.3], [xb, hw(xb), zt(xb)], [xb, -hw(xb), zt(xb)], [0, 0, 1, 0, 1, 0.5, 0, 0.5]);
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), m));
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
  /* a dish facing +X, rim radius rad, squashed to sy x sz */
  function dish(THREE, g, m, rad, x, y, z, sy, sz, tilt) {
    var dg = new THREE.SphereGeometry(rad, 16, 4, 0, PI * 2, 0, PI / 3.4);
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

  /* twin 76 mm AK-726 at rest pointing +X: the rounded shield [M][O] (about
     4.4 m long, 3.2 m wide, 2.3 m tall), barrels raised a little */
  function ak726(THREE, g, T) {
    cylZ(THREE, g, 1.75, 1.85, 0.35, 18, T.sup, -0.2, 0, 0.17);
    var xs = [-2.3, -2.2, -1.6, -0.4, 0.8, 1.5, 1.95, 2.15];
    var sec = [[1.35, 0.85, 1.25, 3.2], [1.5, 0.98, 1.27, 3.0], [1.6, 1.05, 1.28, 2.8], [1.62, 1.05, 1.28, 2.8],
               [1.58, 1.0, 1.25, 2.6], [1.45, 0.9, 1.2, 2.4], [1.25, 0.75, 1.15, 2.2], [0.9, 0.55, 1.1, 2.0]];
    var rings = sec.map(function (s) { return superRing(s[0], s[1] * 1.14, s[2] * 1.14 + 0.12, 2 / s[3], 20); });
    ringLoft(THREE, g, T.sup, xs, rings, true);
    /* rangefinder hood and the vents on the roof, the gun ports */
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
  /* ZIF-101 twin-arm launcher, arms EMPTY as every reference shows them,
     raised about 12 deg, at rest pointing +X: the tall drum pedestal, the
     trainer body and the two beams [M][K][B] */
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
      /* the beam: deep at the trunnion, tapering forward, a down-turned
         tip and the shoe rail along its underside */
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
  /* RBU-6000: twelve barrels in a horseshoe on a trainer, raised [K][B] */
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
  /* Owl Screech (Turel) director: the tall cone pedestal, the housing and
     its round dish facing forward [B][K] */
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
     cheese reflectors, one horizontal and one vertical, side by side [B][K] */
  function peelGroup(THREE, g, T, x, z, yaw) {
    var h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.z = yaw || 0; h.scale.set(1.3, 1.3, 1.3);
    cylZ(THREE, h, 0.7, 0.85, 1.8, 12, T.sup, 0, 0, 0.9);
    box(THREE, h, 1.6, 3.6, 0.7, T.sup, -0.1, 0, 2.05);
    box(THREE, h, 1.3, 1.2, 1.4, T.sup, -0.4, 0, 2.8);
    /* large pair: horizontal and vertical */
    var a = new THREE.Group(); a.rotation.y = -0.08; a.position.z = 0.6; h.add(a);
    cheese(THREE, a, T.metal, 2.6, 0.9, 0.55, 1.15, 2.4, 0);
    var v = cheese(THREE, a, T.metal, 0.95, 2.6, 0.55, -1.15, 2.4, 0);
    void v;
    /* small pair above, the same arrangement */
    cheese(THREE, a, T.metal, 1.4, 0.5, 0.4, -1.1, 4.0, 0);
    cheese(THREE, a, T.metal, 0.5, 1.4, 0.4, 1.1, 3.95, 0);
    strut(THREE, h, T.metal, -0.2, 1.15, 2.4, -0.2, 1.15, 3.9, 0.08, 4);
    strut(THREE, h, T.metal, -0.2, -1.15, 2.4, -0.2, -1.15, 3.9, 0.08, 4);
    box(THREE, h, 0.3, 3.0, 0.2, T.metal, -0.2, 0, 3.9);
    g.add(h);
  }
  /* PTA-53-61: five 533 mm tubes side by side on a trainer, fore and aft [K][O] */
  function tubes5(THREE, g, T) {
    var i;
    cylZ(THREE, g, 0.9, 1.0, 0.45, 12, T.sup, 0, 0, 0.22);
    box(THREE, g, 2.4, 3.0, 0.3, T.sup, 0, 0, 0.6);
    for (i = 0; i < 5; i++) {
      var y = -1.2 + i * 0.6;
      cylX(THREE, g, 0.29, 0.29, 7.4, 10, T.sup, 0, y, 1.05);
      cylX(THREE, g, 0.31, 0.31, 0.25, 10, T.dark, -3.65, y, 1.05);
      cylX(THREE, g, 0.31, 0.31, 0.18, 10, T.metal, 3.5, y, 1.05);
    }
    box(THREE, g, 0.3, 3.2, 0.2, T.metal, -2.0, 0, 1.4);
    box(THREE, g, 0.3, 3.2, 0.2, T.metal, 2.0, 0, 1.4);
    return g;
  }
  /* an uptake casing [P][B][S]: vertical front at xf, roof falling from zf
     (front) to za (after end), the after face raked from xa0 (bottom) to
     xa1 (top), half widths wb (bottom) and wt (top); dark tops of the two
     uptakes and louvres on the sides */
  function casing(THREE, g, T, xa0, xa1, xf, z0, za, zf, wb, wt) {
    hexa(THREE, g, T.sup, [
      [xa0, -wb, z0], [xf, -wb, z0], [xf, wb, z0], [xa0, wb, z0],
      [xa1, -wt, za], [xf, -wt, zf], [xf, wt, zf], [xa1, wt, za]]);
    /* the coaming round the top and the exhaust grilles in it */
    var L = xf - xa1, k, s;
    for (s = -1; s <= 1; s += 2) {
      var cx = xa1 + L * 0.5, cy = s * wt * 0.45, cz = za + (zf - za) * 0.5;
      var tg = new THREE.Group(); tg.position.set(cx, cy, cz + 0.05); tg.rotation.y = -Math.atan2(zf - za, L);
      box(THREE, tg, L * 0.8, wt * 0.8, 0.5, T.sup, 0, 0, 0.1);
      box(THREE, tg, L * 0.72, wt * 0.68, 0.06, T.dark, 0, 0, 0.37);
      g.add(tg);
      for (k = 0; k < 4; k++) {
        var lx = xa0 + 0.8 + k * (xf - xa0 - 1.6) / 3.5;
        box(THREE, g, 1.0, 0.06, 1.3, T.dark, lx, s * (wb - (wb - wt) * 0.4 + 0.02), z0 + (za - z0) * 0.4);
      }
    }
  }
  /* Head Net-C (Angara-A): two Head Net-A reflectors back to back, one
     canted each way, on a turntable [B][K][S] */
  function headNetC(THREE, g, T, x, z) {
    var h = new THREE.Group(); h.position.set(x, 0, z);
    cylZ(THREE, h, 0.45, 0.55, 0.6, 10, T.metal, 0, 0, 0.3);
    box(THREE, h, 0.6, 0.8, 1.6, T.metal, 0, 0, 1.2);
    var a = cheese(THREE, h, T.metal, 6.6, 1.7, 0.6, 0, 1.5, 0);
    a.rotation.x = 0.0; a.rotation.y = -0.45;
    var b = cheese(THREE, h, T.metal, 6.6, 1.7, -0.6, 0, 1.5, 0);
    b.rotation.z = PI; b.rotation.y = 0.45;
    g.add(h);
  }
  /* Big Net (Kliver): the large elliptical mesh reflector with its feed
     boom, on a turntable [B][K][S] */
  function bigNet(THREE, g, T, x, z) {
    var h = new THREE.Group(); h.position.set(x, 0, z); h.rotation.z = 0.35;
    cylZ(THREE, h, 0.5, 0.6, 0.6, 10, T.soot, 0, 0, 0.3);
    box(THREE, h, 0.8, 0.8, 1.2, T.soot, 0, 0, 1.0);
    dish(THREE, h, T.metal, 2.5, -0.4, 0, 2.2, 1.05, 0.72, 0.25);
    var i;
    for (i = -2; i <= 2; i++) box(THREE, h, 0.1, 0.08, 3.4, T.soot, -0.15, i * 1.0, 2.2);
    box(THREE, h, 0.1, 5.2, 0.1, T.soot, -0.15, 0, 2.2);
    strut(THREE, h, T.soot, -0.2, 0, 1.3, 2.2, 0, 2.5, 0.05, 3);
    strut(THREE, h, T.soot, -0.2, 0, 3.6, 2.2, 0, 2.5, 0.05, 3);
    box(THREE, h, 0.3, 0.3, 0.3, T.soot, 2.2, 0, 2.5);
    g.add(h);
  }
  /* a ship's boat on its cradle (hull ~8 m) */
  function boat(THREE, g, T, x, y, z) {
    var xs = [-4.0, -3.6, -2.0, 1.5, 3.0, 3.9];
    var sec = [[0.9, 0.5, 0, 2.5], [1.15, 0.6, 0, 2.5], [1.25, 0.65, 0, 2.5], [1.25, 0.65, 0, 2.5], [0.95, 0.6, 0.05, 2.2], [0.2, 0.45, 0.1, 2.0]];
    var bg = new THREE.Group(); bg.position.set(x, y, z);
    ringLoft(THREE, bg, T.sup, xs, sec.map(function (s) { return superRing(s[0], s[1], s[2], 2 / s[3], 12); }), true);
    box(THREE, bg, 3.4, 1.8, 0.8, T.sup, -0.6, 0, 0.75);
    box(THREE, bg, 0.1, 1.5, 0.4, T.glass, 1.12, 0, 0.9);
    g.add(bg);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, x;

    /* hull shell in three bands, transom, weather deck [P][S] */
    g.add(shellBand(THREE, T.under, -6, -0.4, 5));
    g.add(shellBand(THREE, T.boot, -0.4, 0.6, 1));
    g.add(shellBand(THREE, T.hull, 0.6, 12, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    /* no scuttles in the crew spaces [W]; the anchors in their pockets [K] */
    for (s = -1; s <= 1; s += 2) {
      var az = 5.5, ax = 62.8, ay = s * (W(ax, az) + 0.02);
      box(THREE, g, 1.3, 0.12, 1.2, T.dark, ax, ay, az);
      box(THREE, g, 0.9, 0.18, 1.0, T.gun, ax + 0.1, ay + s * 0.04, az - 0.2);
      /* a hull door aft and the stern fairleads */
      box(THREE, g, 1.2, 0.06, 1.6, T.dark, -28.0, s * (W(-28, 2.9) + 0.02), 2.9);
    }

    /* the 01 house: the after magazine house x -45 to -31 [P][S], 3.4 m
       high; the long house to x 32.5 with its roof following the sheer;
       the forward magazine house x 32.5 to 46.4, roof flat at 9.0 [P][O] */
    polyPrism(THREE, g, T.sup, [[-45.0, -3.2], [-43.6, -4.3], [-31.0, -4.4], [-31.0, 4.4], [-43.6, 4.3], [-45.0, 3.2]], 4.0, 7.2);
    var hx = [], hw = function (xx) { return xx < 26 ? 5.0 : 5.0 - (xx - 26) * 0.06; };
    for (x = -31.5; x <= 32.6; x += 4.0) hx.push(Math.min(x, 32.6));
    if (hx[hx.length - 1] < 32.6) hx.push(32.6);
    house(THREE, g, T.sup, hx, hw, roofZ);
    polyPrism(THREE, g, T.sup, [[32.4, -4.6], [44.6, -4.1], [46.4, -2.6], [46.4, 2.6], [44.6, 4.1], [32.4, 4.6]], 4.8, 9.3);
    /* doors and louvres along the house sides; the loading hatches on the
       forward house roof [O] */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 13; i++) {
        x = -28 + i * 4.3;
        if (x > 24) break;
        box(THREE, g, (i % 3 === 0) ? 0.9 : 1.2, 0.06, (i % 3 === 0) ? 1.9 : 0.7, T.dark, x, s * (hw(x) + 0.02), deckZ(x) + ((i % 3 === 0) ? 1.05 : 1.7));
      }
      box(THREE, g, 0.9, 0.06, 1.9, T.dark, 36.0, s * 4.52, 6.4);
      box(THREE, g, 0.9, 0.06, 1.9, T.dark, -40.0, s * 4.33, 5.4);
      box(THREE, g, 2.4, 0.06, 0.7, T.dark, -36.0, s * 4.4, 6.6);
      var ya = s < 0 ? -2.6 : 0.4, yb = s < 0 ? -0.4 : 2.6;
      hexa(THREE, g, T.sup, [[42.6, ya, 9.3], [44.4, ya, 9.3], [44.4, yb, 9.3], [42.6, yb, 9.3],
                              [42.6, ya, 9.45], [44.4, ya, 9.9], [44.4, yb, 9.9], [42.6, yb, 9.45]]);
      box(THREE, g, 1.4, 1.6, 0.12, T.dark, 37.0, s * 1.6, 9.36);
    }
    roofRail(THREE, g, T, [[33.0, 4.5], [44.6, 4.0], [46.3, 2.6], [46.3, -2.6], [44.6, -4.0], [33.0, -4.5]], 9.3, 0.9);
    roofRail(THREE, g, T, [[-31.0, 4.35], [-43.6, 4.25], [-44.9, 3.2], [-44.9, -3.2], [-43.6, -4.25], [-31.0, -4.35]], 7.2, 0.9);

    /* bridge block x 17-25.8 [P]: the 02 level, the wheelhouse, the tower
       carrying the forward Peel Group */
    polyPrism(THREE, g, T.sup, [[16.8, -4.6], [24.6, -4.6], [25.8, -3.4], [25.8, 3.4], [24.6, 4.6], [16.8, 4.6]], 6.8, 10.0);
    polyPrism(THREE, g, T.sup, [[17.6, -4.2], [24.8, -4.2], [26.0, -3.0], [26.0, 3.0], [24.8, 4.2], [17.6, 4.2]], 10.0, 12.7);
    hexa(THREE, g, T.glass, [[25.98, -2.9, 11.5], [26.06, -2.9, 11.5], [26.06, 2.9, 11.5], [25.98, 2.9, 11.5],
                              [25.9, -2.9, 12.35], [25.98, -2.9, 12.35], [25.98, 2.9, 12.35], [25.9, 2.9, 12.35]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.6, 0.08, 0.8, T.glass, 25.4, s * 3.65, 11.9, s * 0.78);
      box(THREE, g, 5.4, 0.08, 0.75, T.glass, 21.8, s * 4.22, 11.9);
      /* bridge wings with their screens */
      box(THREE, g, 2.6, 1.5, 0.16, T.sup, 23.6, s * 5.0, 10.05);
      box(THREE, g, 2.6, 0.08, 1.0, T.sup, 23.6, s * 5.72, 10.6);
      for (i = 0; i < 3; i++) box(THREE, g, 0.8, 0.05, 0.6, T.dark, 18.6 + i * 2.2, s * 4.62, 8.7);
    }
    box(THREE, g, 8.0, 8.0, 0.12, T.metal, 21.6, 0, 12.76);
    /* the Yatagan base: the tall block over the wheelhouse, up to 15.4 [P][K] */
    tprism(THREE, g, 7.2, 7.0, 6.6, 6.2, 2.7, T.sup, 21.4, 0, 14.05);
    box(THREE, g, 8.4, 7.4, 0.12, T.metal, 21.6, 0, 15.45);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.8, 0.05, 0.6, T.dark, 19.6, s * 3.33, 14.2);
      box(THREE, g, 0.8, 0.05, 0.6, T.dark, 22.8, s * 3.33, 14.2);
    }
    box(THREE, g, 0.05, 4.0, 0.6, T.glass, 24.72, 0, 14.4);
    roofRail(THREE, g, T, [[17.5, 3.6], [25.7, 3.6], [25.7, -3.6], [17.5, -3.6], [17.5, 3.6]], 15.5, 0.8);
    peelGroup(THREE, g, T, 22.4, 15.5, 0);
    strut(THREE, g, T.metal, 18.6, 0, 15.5, 18.6, 0, 19.4, 0.05, 4);

    /* forward Owl Screech on its cone x 30.7 [P][B]; the RBU-6000 pair
       beside it [B][K] */
    owlScreech(THREE, g, T, 30.7, roofZ(30.7), 13.2, 0);
    for (s = -1; s <= 1; s += 2) {
      var rb = new THREE.Group(); rb.position.set(28.4, s * 3.3, roofZ(28.4)); rb.rotation.z = s * 0.35; rbu6000(THREE, rb, T); g.add(rb);
    }
    box(THREE, g, 1.4, 1.2, 1.2, T.sup, 27.4, 0, roofZ(27.4) + 0.6);

    /* main mast x 12.6: tall tapering lattice on the house roof, its
       platform, yard and the Head Net-C at the head [P][B][K] */
    /* the plated mast house at its foot, to 11.6 [P][B] */
    var mz = 11.6;
    hexa(THREE, g, T.sup, [[10.0, -2.2, roofZ(10) - 0.1], [15.8, -2.2, roofZ(15.8) - 0.1], [15.8, 2.2, roofZ(15.8) - 0.1], [10.0, 2.2, roofZ(10) - 0.1],
                            [11.0, -1.7, mz], [14.8, -1.7, mz], [14.8, 1.7, mz], [11.0, 1.7, mz]]);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.8, 0.05, 1.6, T.dark, 12.9, s * 2.0, 8.6);
    lattice(THREE, g, T.metal, 12.9, 1.9, 1.8, 0.75, 0.8, mz, 24.0, 5, 0.14);
    box(THREE, g, 3.4, 3.6, 0.12, T.metal, 12.9, 0, 17.0);
    roofRail(THREE, g, T, [[11.2, 1.8], [14.6, 1.8], [14.6, -1.8], [11.2, -1.8], [11.2, 1.8]], 17.0, 0.7);
    box(THREE, g, 0.9, 1.2, 0.6, T.metal, 14.2, 0, 17.35);
    box(THREE, g, 0.2, 2.4, 0.18, T.metal, 14.2, 0, 17.8);
    box(THREE, g, 0.6, 11.0, 0.14, T.metal, 12.9, 0, 23.4);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, 12.9, s * 0.7, 22.4, 12.9, s * 5.4, 23.4, 0.05, 3);
      box(THREE, g, 0.4, 0.4, 0.5, T.metal, 12.9, s * 5.3, 23.75);
    }
    box(THREE, g, 1.8, 1.8, 0.12, T.metal, 12.9, 0, 24.0);
    headNetC(THREE, g, T, 12.9, 24.06);
    strut(THREE, g, T.metal, 12.3, 0, 24.0, 12.3, 0, 28.0, 0.05, 4);
    box(THREE, g, 0.08, 2.0, 0.08, T.metal, 12.3, 0, 27.2);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 12.3, 0, 27.8, 4.0, s * 0.6, 12.4, 0.012, 3);

    /* the five torpedo tubes lying fore and aft at the foot of the main mast [K][O] */
    var tt = new THREE.Group(); tt.position.set(12.9, 3.75, roofZ(12.9)); tubes5(THREE, tt, T); g.add(tt);

    /* the forward casing x 2.4-9.2 (tall), the after casing x -30.4 to -22.3
       (low) [P][B][S] */
    casing(THREE, g, T, 1.6, 2.4, 9.2, roofZ(5) - 0.1, 11.2, 12.6, 4.7, 3.9);
    casing(THREE, g, T, -31.2, -30.4, -22.3, roofZ(-26) - 0.1, 8.9, 10.2, 4.5, 3.8);

    /* the second mast x -0.2, dark, carrying Big Net [P][B][K][S] */
    var mz2 = roofZ(-0.2);
    lattice(THREE, g, T.soot, -0.2, 1.3, 2.1, 0.65, 0.75, mz2, 18.6, 5, 0.15);
    box(THREE, g, 2.6, 2.6, 0.12, T.soot, -0.2, 0, 18.6);
    roofRail(THREE, g, T, [[-1.4, 1.2], [1.0, 1.2], [1.0, -1.2], [-1.4, -1.2], [-1.4, 1.2]], 18.6, 0.6);
    bigNet(THREE, g, T, -0.2, 18.65);

    /* boats under davits abreast the second mast, both sides [B][O] */
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T, -2.6, s * 6.35, 5.7);
      strut(THREE, g, T.metal, -5.6, s * 5.0, roofZ(-5.6), -5.6, s * 6.4, 8.2, 0.08, 4);
      strut(THREE, g, T.metal, 0.4, s * 5.0, roofZ(0.4), 0.4, s * 6.4, 8.2, 0.08, 4);
      box(THREE, g, 6.4, 0.1, 0.1, T.metal, -2.6, s * 6.35, 8.15);
    }

    /* after Owl Screech x -19 and the after Peel Group tower x -13 [P][B] */
    owlScreech(THREE, g, T, -19.0, roofZ(-19), 10.0, PI);
    tprism(THREE, g, 4.6, 4.4, 3.0, 3.0, 13.6 - roofZ(-13), T.sup, -13.0, 0, (13.6 + roofZ(-13)) / 2);
    box(THREE, g, 3.8, 3.8, 0.12, T.metal, -13.0, 0, 13.66);
    roofRail(THREE, g, T, [[-14.9, 1.9], [-11.1, 1.9], [-11.1, -1.9], [-14.9, -1.9], [-14.9, 1.9]], 13.7, 0.7);
    peelGroup(THREE, g, T, -13.0, 13.7, PI);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.06, 1.2, 0.7, T.dark, -13.0 + s * 1.95, 0, 10.6);

    /* launchers on their magazine houses, the after one trained aft */
    var fl = new THREE.Group(); fl.position.set(40.4, 0, 9.3); zif101(THREE, fl, T); g.add(fl);
    var al = new THREE.Group(); al.position.set(-37.0, 0, 7.2); al.rotation.z = PI; zif101(THREE, al, T); g.add(al);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.4, 1.6, 0.12, T.dark, -33.4, s * 1.6, 7.26);
    /* after AK-726 on the main deck, trained aft [P][S][O] */
    var ag = new THREE.Group(); ag.position.set(-48.5, 0, deckZ(-48.5)); ag.rotation.z = PI; ak726(THREE, ag, T); g.add(ag);

    /* forecastle: capstans, windlass, bollards, the jackstaff [O] */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.45, 0.5, 0.5, 10, T.metal, 60.5, s * 1.2, deckZ(60.5) + 0.25);
      box(THREE, g, 2.6, 0.18, 0.08, T.gun, 62.0, s * 1.6, deckZ(62) + 0.05, -s * 0.35);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, 55.0, s * 3.6, deckZ(55) + 0.25);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, 55.6, s * 3.5, deckZ(55.6) + 0.25);
      /* quarterdeck: bollards and the mine rails [W] */
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, -66.0, s * 5.8, deckZ(-66) + 0.25);
      cylZ(THREE, g, 0.18, 0.18, 0.5, 6, T.metal, -66.6, s * 5.8, deckZ(-66.6) + 0.25);
      box(THREE, g, 17.0, 0.14, 0.12, T.metal, -62.5, s * 2.5, deckZ(-62.5) + 0.06);
      box(THREE, g, 17.0, 0.14, 0.12, T.metal, -62.5, s * 3.3, deckZ(-62.5) + 0.06);
    }
    box(THREE, g, 1.2, 1.0, 0.5, T.metal, 58.6, 0, deckZ(58.6) + 0.25);
    strut(THREE, g, T.metal, 71.6, 0, deckZ(71.6), 71.6, 0, deckZ(71.6) + 3.0, 0.05, 4);
    strut(THREE, g, T.metal, -71.6, 0, deckZ(-71.6), -71.6, 0, deckZ(-71.6) + 4.5, 0.06, 4);

    /* underwater gear: two shafts on A-brackets, props, rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.22, 0.22, 9.0, 8, T.metal, -62.5, s * 3.0, -3.0);
      strut(THREE, g, T.metal, -65.5, s * 3.0, -3.0, -65.5, s * 3.8, -1.6, 0.14, 4);
      strut(THREE, g, T.metal, -65.5, s * 3.0, -3.0, -65.5, s * 2.0, -1.6, 0.14, 4);
      cylX(THREE, g, 0.35, 0.5, 0.8, 8, T.metal, -67.4, s * 3.0, -3.0);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 1.25), T.metal);
        bl.position.set(-67.4, s * 3.0, -3.0); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.8); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.2, 0.2, 2.4, T.metal, -69.2, s * 1.6, -1.9);
    }
    /* bilge keels */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 34.0, 0.08, 0.6, T.under, -6.0, s * (W(-6, -3.4) + 0.2), -3.45, 0);

    /* rails along the deck edge */
    railRun(THREE, g, T, -71.2, -46.0, 3.6, 1.0);
    railRun(THREE, g, T, -46.0, 46.0, 4.6, 1.0);
    railRun(THREE, g, T, 46.0, 70.0, 3.4, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.4, 0.9, 0.04, T.team, -42.6, 0, 7.22);
    box(THREE, g, 2.4, 0.9, 0.04, T.team, 18.6, 0, 12.84);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, 34.4, 0, 9.32);

    /* trained mount: forward AK-726 [P][M][O] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(49.8, 0, deckZ(49.8)); ak726(THREE, tw, T);

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

UNIT_MODELS["pact_e60_destroyer"] = {
  len: 144,
  build: function (THREE, M, C) { return HeroKashin.build(THREE, M, C); }
};
