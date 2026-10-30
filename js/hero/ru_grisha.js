/* ==================== js/hero/ru_grisha.js ===============================
   HERO MODEL -- Project 1124 "Albatros" (NATO Grisha) small anti-submarine
   ship (MPK), two rows, each drawn as the variant its weapons name:
     pact_e60_corvette - Project 1124, GRISHA I (1970-74, 12 built): one
       twin 57 mm AK-725 aft (the "turret"), MR-103 Bars (Muff Cob) director,
       MR-302 Rubka (Strut Curve), two RBU-6000.
     pact_e90_corvette - Project 1124M, GRISHA V (1985-94): the 76 mm AK-176
       in the AK-725's place aft (the "turret"), AK-630M, MR-123 Vympel
       (Bass Tilt), MR-320 Topaz-2V (Strut Pair), the PORT RBU-6000 only.
   Length overall 71.2 m; beam 9.8 m (e60) / 10.2 m (e90) as
   js/warship_specs.js gives them (the hull table is drawn for 9.8 m and
   widened for the e90 row); draught about 3.7 m.
   REDO 2026-10-24: hull lofted from a section table scaled off the
   recognition profile, the variants split by fit, three shafts.

   REFERENCES (Wikimedia Commons, US DoD public domain, fetched at 960 px):
     [P] "Grisha-class corvette profile 1987.png" - recognition profiles of
         Grisha I/II/III.  Grisha I hull 466 px = 71.2 m (6.54 px/m): stem
         raked from x 32.3 at the waterline to 35.6 at the head (5.9 m);
         the quarterdeck 1.6-2.3 m; the raked break at x -3.4 to -1.8; the
         raised hull/01 level 4.6-5.5 m with a low step to the forecastle at
         x 17.5; the bridge block x -1 to 11.6 (7.4 m) with the wheelhouse x 7.4
         to 11.9 (9.4 m); the foremast x 2.4 (head 15 m) with Strut Curve
         and the Don below it; Pop Group abaft the wheelhouse x 5.9 (11.5 m);
         RBU x 15.5; the SA-N-4 bin x 22; the uptake casing x -8.8 to
         -1.2 (6.8 m); tubes x
         -13 to -6; the after house x -21.6 to -12.6 with the Muff Cob
         x -20 and the small tripod x -13.2; the AK-725 x -26.
     [A] "Project1124-1985-1.jpg" (Grisha I, port beam, aerial, 1985) and
         "Corvette Grisha I.jpg" (starboard beam, 1986): the same stations;
         the RBU-6000 pair at the front corners of the 01 level; the
         twin tubes on the main deck either side of the uptake casing;
         the tall thin lattice just abaft the foremast.
     [B] "Project1124-1983-6.jpg" (starboard bow, aerial): the round SA-N-4
         bin hatch on the forecastle, the step up to the 01 level, the
         bridge block narrower than the hull, flared bow.
     [S] "Project1124-1983-1.jpg" / "-1983-3.jpg" (port quarter and stern,
         aerial): the AK-725's rounded hood on a raised base, barrels aft;
         the dark ball radome of the Muff Cob on its pedestal; the uptake
         casing with dark top; the flat transom with a dark port at each
         corner (the depth-charge rails end there); rails round the deck.
     [V] "Project1124M-1990-1.jpg" (MPK-89, colour, 1990), "Corvette Grisha
         V.jpg" (1990): the Grisha V - one RBU-6000 to port, the slab Strut
         Pair on the square mast, the lattice behind it, the Bass Tilt drum
         on the tripod at the front of the after house, the AK-630 on the
         house roof, the AK-176 aft.  Hull side sampled rgb 114,128,129
         in shade and 184,180,174 lit.
     [W] Russian Wikipedia "Malye protivolodochnye korabli proekta 1124":
         flush-decked hull with sheer and a full-width forward
         superstructure; round-bilge bow, hard-chine stern; square solid
         foremast; small tripod mainmast at the front of the separate after
         house; two RBU-6000 side by side at the front of the superstructure,
         1124M keeps only the LEFT (port) one; two twin DTA-53-1124 tubes
         either side abaft the forward superstructure; ZIF-122 (Osa-M)
         launcher stowed under the forecastle deck; one AK-725 aft, the
         AK-176 in its place on the 1124M; MR-302 Rubka / MR-320 Topaz-2V;
         MR-103 Bars, from MPK-43 MR-123 Vympel with the AK-630M; depth
         charges carried; THREE shafts (two diesels on the wing shafts,
         2.0 m props; the gas turbine on the centre shaft, 2.4 m prop);
         two rudders; one YaL-4 boat and four PSN-10M rafts.

   RECOGNITION LIST (where each shows):
     1. Short hull, low quarterdeck, raked step up to a long raised forward
        hull with sheer and a flared, raked bow [P][A][B][W] - STA.
     2. Round SA-N-4 bin hatch on the forecastle x 22 [B][V][W] - osaBin.
     3. RBU-6000 at the front corners of the 01 level x 15.5: two on the
        Grisha I, the port one only on the Grisha V [A][B][V][W] - rbu6000().
     4. Bridge block with the wheelhouse forward and the Pop Group on its
        roof [P][A][V] - popGroup().
     5. Square solid foremast with Strut Curve (Grisha I) / Strut Pair
        (Grisha V), the Don nav radar, and the tall thin lattice aft of it
        [P][A][V][W] - strutCurve(), strutPair(), lattice().
     6. Uptake casing aft of the break with dark exhaust tops [P][S].
     7. Twin 533 mm tubes either side of the casing [A][S][V][W] - tubes2().
     8. After house with the small tripod mast at its front; the Muff Cob
        ball radome (Grisha I) / the Bass Tilt drum on the tripod and the
        AK-630 (Grisha V) [P][S][V][W].
     9. The stern gun on its raised base: twin 57 mm AK-725 hood (Grisha I),
        76 mm AK-176 (Grisha V) [P][S][V][W] - ak725(), ak176().
    10. Depth-charge rails to the transom ports; three shafts, two rudders
        [S][W].
    11. Paint: light grey hull and upperworks for both periods; black boot
        topping, red-brown bottom; dark grey decks [V].  The B&W prints show
        the low after hull darker than the flared forward hull from BOTH
        sides and on the Grisha V 071 too, while the colour print of
        MPK-89 shows one grey: it is light on the flare, not paint.
   NOT CONFIRMED and therefore not drawn: the YaL-4 boat's stowage, the
   sonar fairing (under-keel, size not found), the towed/dipping sonar
   gear, the KTU-77 fit, MANPADS posts, the salute gun some 1124M had in
   the starboard RBU's place.  No hull numbers, names or flags.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The
   stern gun - the mount of each row's FIRST weapon (AK-725 on e60, AK-176
   on e90) - is the group named "turret", barrels along its local +X (the
   renderer trains it by rotation.z); everything else is baked, one mesh
   per material.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroGrisha = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -35.6, XS1 = 35.6, XWL = 32.3;   /* transom, stem head, stem at the waterline [P] */

  /* HULL SECTION TABLE, scaled off [P] (6.54 px/m), half beams for 9.8 m.
     x, deck z (the raised 01 level over x -1.8..17.4 is flush with the hull
     sides [W]), half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power: high
     aft for the hard-chine stern, low forward for the round bilge [W]) */
  var STA = [
    [-35.6, 1.65, 4.20, 3.85, -0.80, 6.0],
    [-33.0, 1.70, 4.50, 4.15, -1.50, 6.0],
    [-28.0, 1.80, 4.78, 4.42, -2.30, 5.0],
    [-20.0, 1.95, 4.90, 4.55, -2.90, 4.2],
    [-10.0, 2.15, 4.90, 4.58, -3.15, 3.4],
    [ -3.4, 2.30, 4.90, 4.58, -3.25, 3.0],
    [ -1.8, 4.60, 4.90, 4.58, -3.25, 3.0],
    [  4.0, 4.85, 4.90, 4.52, -3.25, 2.8],
    [ 11.0, 5.15, 4.82, 4.32, -3.20, 2.5],
    [ 17.4, 5.45, 4.62, 3.95, -3.10, 2.2],
    [ 17.6, 4.70, 4.61, 3.94, -3.10, 2.2],
    [ 22.0, 4.95, 4.25, 3.40, -2.85, 1.9],
    [ 26.0, 5.20, 3.75, 2.70, -2.50, 1.75],
    [ 29.5, 5.45, 3.05, 1.75, -1.85, 1.6],
    [ 32.3, 5.62, 2.30, 0.00,  0.00, 1.4],
    [ 34.2, 5.78, 1.30, 0.00,  0.00, 1.3],
    [ 35.6, 5.90, 0.15, 0.00,  0.00, 1.3]
  ];
  var BS = 1;
  function pick(x, k) {
    var i, v;
    if (x <= STA[0][0]) v = STA[0][k];
    else if (x >= STA[STA.length - 1][0]) v = STA[STA.length - 1][k];
    else for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
      var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
      v = a[k] + (b[k] - a[k]) * f; break;
    }
    return (k === 2 || k === 3) ? v * BS : v;
  }
  function deckZ(x) { return pick(x, 1); }
  function halfB(x) { return pick(x, 2); }
  function zBot(x) { return x > XWL ? deckZ(XS1) * (x - XWL) / (XS1 - XWL) : pick(x, 4); }
  function W(x, z) {
    var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
    if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.5);
    var n = pick(x, 5), t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }

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

  /* paint, photograph samples taken to about 0.85 of their level: [V] the
     hull side 114,128,129 in shade and 184,180,174 lit average about
     150,154,152 -> Grisha V 0x7f8585 hull, house a touch lighter; the
     Grisha I prints are B&W, so its light grey is the period Soviet grey
     the Kashin hero uses (0x8a9298) a shade darker; decks dark grey [V] */
  function makeMats(THREE, C, V) {
    var team = (C && C.team) || 0x3f7fd0;
    var P = V.mod ? { hull: 0x7f8585, sup: 0x8a8f8f, deck: 0x55575a }
                  : { hull: 0x858d93, sup: 0x8f969b, deck: 0x51565a };
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(P.hull, hullTex(THREE), 0.86),
      boot:  skin(0x0c0d0f, hullTex(THREE), 0.9),
      under: skin(0x3a1612, hullTex(THREE), 0.9),
      sup:   skin(P.sup, plateTex(THREE), 0.86),
      deck:  skin(P.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5c636a, 0.52, 0.55),
      soot:  metal(0x2a2d30, 0.7, 0.35),
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
    for (x = XS0; x < XS1 - 0.01; x += 1.2) xs.push(x);
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (x = 28; x < XS1; x += 0.8) xs.push(x);
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

  /* ------------------------------------------------------------ fittings */
  function sphere(THREE, g, m, r, x, y, z, sx, sy, sz) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 9), m);
    s.position.set(x, y, z); s.scale.set(sx || 1, sy || 1, sz || 1); g.add(s); return s;
  }
  /* twin 57 mm AK-725 at rest pointing +X [S]: the rounded hood (about
     3.9 m long, 2.5 m wide, 1.9 m tall), flat rear, sloped front with the
     slot, the two barrels close together, raised a little */
  function ak725(THREE, g, T) {
    cylZ(THREE, g, 1.45, 1.5, 0.2, 16, T.sup, 0, 0, 0.1);
    var xs = [-2.2, -2.15, -1.4, 0.4, 1.4, 1.95, 2.2];
    var sec = [[1.22, 0.86], [1.38, 0.98], [1.46, 1.05], [1.46, 1.05], [1.38, 0.98], [1.15, 0.8], [0.8, 0.55]];
    ringLoft(THREE, g, T.sup, xs, sec.map(function (s) { return superRing(s[0], s[1], 1.0, 2 / 2.7, 20); }), true);
    box(THREE, g, 0.1, 0.95, 1.0, T.dark, 2.18, 0, 1.2);
    box(THREE, g, 0.8, 0.55, 0.28, T.sup, -1.0, 0.6, 2.08);
    box(THREE, g, 0.12, 1.6, 0.8, T.dark, -2.21, 0, 0.95);
    var bar = new THREE.Group(); bar.position.set(1.95, 0, 1.2); bar.rotation.y = -0.1;
    var s;
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, bar, 0.12, 0.14, 0.8, 8, T.gun, 0.4, s * 0.24, 0);
      cylX(THREE, bar, 0.05, 0.06, 3.6, 8, T.gun, 2.6, s * 0.24, 0, true);
      cylX(THREE, bar, 0.075, 0.075, 0.35, 8, T.gun, 4.3, s * 0.24, 0);
    }
    g.add(bar);
    return g;
  }
  /* 76 mm AK-176 at rest pointing +X [V]: the low faceted shield with its
     sloped front and roof, the single barrel and its muzzle brake */
  function ak176(THREE, g, T) {
    cylZ(THREE, g, 1.3, 1.35, 0.25, 16, T.sup, 0, 0, 0.12);
    hexa(THREE, g, T.sup, [
      [-1.9, -1.3, 0.2], [1.5, -1.25, 0.2], [1.5, 1.25, 0.2], [-1.9, 1.3, 0.2],
      [-1.8, -1.05, 1.75], [0.5, -0.95, 1.85], [0.5, 0.95, 1.85], [-1.8, 1.05, 1.75]]);
    hexa(THREE, g, T.sup, [
      [1.5, -1.25, 0.2], [2.3, -0.9, 0.2], [2.3, 0.9, 0.2], [1.5, 1.25, 0.2],
      [0.5, -0.95, 1.85], [1.6, -0.6, 1.25], [1.6, 0.6, 1.25], [0.5, 0.95, 1.85]]);
    box(THREE, g, 0.6, 0.45, 0.6, T.dark, 1.85, 0, 0.95);
    box(THREE, g, 0.8, 0.5, 0.25, T.sup, -0.8, -0.5, 1.88);
    var bar = new THREE.Group(); bar.position.set(1.9, 0, 0.95); bar.rotation.y = -0.08;
    cylX(THREE, bar, 0.16, 0.18, 0.8, 10, T.gun, 0.35, 0, 0);
    cylX(THREE, bar, 0.075, 0.085, 4.0, 8, T.gun, 2.7, 0, 0, true);
    cylX(THREE, bar, 0.12, 0.12, 0.4, 8, T.gun, 4.8, 0, 0);
    g.add(bar);
    return g;
  }
  /* AK-630M: the round shield and the six-barrel cluster, pointing +X */
  function ak630(THREE, g, T) {
    cylZ(THREE, g, 0.72, 0.78, 0.45, 14, T.sup, 0, 0, 0.22);
    var xs = [-0.75, -0.7, -0.2, 0.4, 0.75, 0.9];
    var sec = [[0.55, 0.45], [0.65, 0.55], [0.7, 0.6], [0.68, 0.58], [0.55, 0.45], [0.3, 0.25]];
    ringLoft(THREE, g, T.sup, xs, sec.map(function (s) { return superRing(s[0], s[1], 0.95, 2 / 2.4, 16); }), true);
    cylX(THREE, g, 0.16, 0.16, 0.6, 8, T.gun, 1.1, 0, 0.92);
    var k, a;
    for (k = 0; k < 6; k++) {
      a = k * PI / 3;
      cylX(THREE, g, 0.03, 0.03, 1.4, 4, T.gun, 2.0, Math.cos(a) * 0.09, 0.92 + Math.sin(a) * 0.09);
    }
    cylX(THREE, g, 0.13, 0.13, 0.1, 8, T.gun, 2.65, 0, 0.92);
    return g;
  }
  /* RBU-6000: twelve barrels in a horseshoe on a trainer, raised [A][B] */
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
  /* DTA-53-1124: two 533 mm tubes side by side on a turntable, lying fore
     and aft, muzzles forward [A][S][W] */
  function tubes2(THREE, g, T) {
    var s;
    cylZ(THREE, g, 0.7, 0.8, 0.35, 12, T.sup, 0.3, 0, 0.17);
    box(THREE, g, 2.0, 1.5, 0.3, T.sup, 0.3, 0, 0.5);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.3, 0.3, 7.4, 12, T.sup, 0, s * 0.37, 0.95);
      cylX(THREE, g, 0.32, 0.32, 0.22, 12, T.metal, 3.6, s * 0.37, 0.95);
      cylX(THREE, g, 0.32, 0.32, 0.3, 12, T.dark, -3.6, s * 0.37, 0.95);
      cylX(THREE, g, 0.33, 0.33, 0.14, 12, T.metal, -1.6, s * 0.37, 0.95);
      cylX(THREE, g, 0.33, 0.33, 0.14, 12, T.metal, 1.6, s * 0.37, 0.95);
    }
    box(THREE, g, 0.3, 1.6, 0.2, T.metal, -2.6, 0, 1.3);
    box(THREE, g, 0.9, 0.5, 0.6, T.sup, -3.2, 0, 0.45);
  }
  /* Pop Group (4R-33 / MPZ-301 Baza) on its pedestal, facing +X [P][A]:
     the housing, the big tracking dish between two small dishes, the
     guidance horns above */
  function popGroup(THREE, g, T, x, z) {
    var h = new THREE.Group(); h.position.set(x, 0, z);
    cylZ(THREE, h, 0.75, 0.9, 1.0, 12, T.sup, 0, 0, 0.5);
    box(THREE, h, 2.1, 2.7, 1.6, T.sup, -0.1, 0, 1.8);
    box(THREE, h, 1.0, 1.2, 0.6, T.sup, -0.4, 0, 2.8);
    dish(THREE, h, T.metal, 0.85, 1.05, 0, 1.7, 1, 1, 0.05);
    dish(THREE, h, T.metal, 0.38, 0.95, 1.05, 2.1, 1, 1, 0);
    dish(THREE, h, T.metal, 0.38, 0.95, -1.05, 2.1, 1, 1, 0);
    box(THREE, h, 0.5, 0.35, 0.35, T.metal, 0.4, 0.75, 2.9);
    box(THREE, h, 0.5, 0.35, 0.35, T.metal, 0.4, -0.75, 2.9);
    box(THREE, h, 0.6, 0.3, 0.3, T.dark, 0.2, 0, 3.2);
    g.add(h);
  }
  /* MR-302 Rubka (Strut Curve): the curved reflector with its feed boom on
     a turntable [P][A] */
  function strutCurve(THREE, g, T, x, z) {
    var h = new THREE.Group(); h.position.set(x, 0, z);
    cylZ(THREE, h, 0.3, 0.38, 0.5, 10, T.metal, 0, 0, 0.25);
    box(THREE, h, 0.4, 0.6, 0.5, T.metal, 0, 0, 0.7);
    cheese(THREE, h, T.metal, 4.2, 1.7, 0.35, 0, 1.5, 0.18);
    strut(THREE, h, T.metal, 0.3, 0, 0.8, 1.6, 0, 1.25, 0.04, 3);
    box(THREE, h, 0.25, 0.25, 0.25, T.metal, 1.6, 0, 1.25);
    g.add(h);
  }
  /* MR-320 Topaz-2V (Strut Pair): two planar arrays back to back [V] */
  function strutPair(THREE, g, T, x, z) {
    var h = new THREE.Group(); h.position.set(x, 0, z);
    cylZ(THREE, h, 0.3, 0.38, 0.5, 10, T.metal, 0, 0, 0.25);
    box(THREE, h, 0.5, 0.7, 0.6, T.metal, 0, 0, 0.8);
    var a = new THREE.Group(); a.position.set(0.32, 0, 1.4); a.rotation.y = -0.2; h.add(a);
    box(THREE, a, 0.16, 3.2, 1.25, T.metal, 0, 0, 0);
    box(THREE, a, 0.04, 3.0, 1.1, T.dark, 0.09, 0, 0);
    var b = new THREE.Group(); b.position.set(-0.32, 0, 1.4); b.rotation.y = 0.2; h.add(b);
    box(THREE, b, 0.16, 3.2, 1.25, T.metal, 0, 0, 0);
    box(THREE, b, 0.04, 3.0, 1.1, T.dark, -0.09, 0, 0);
    g.add(h);
  }
  /* Don nav radar: a slotted bar on a small pedestal */
  function donBar(THREE, g, T, x, z) {
    cylZ(THREE, g, 0.12, 0.15, 0.4, 8, T.metal, x, 0, z + 0.2);
    box(THREE, g, 0.3, 2.4, 0.22, T.metal, x, 0, z + 0.5);
  }
  /* MR-103 Bars (Muff Cob): the director body on its pedestal with the
     dark ball radome on top [S][P] */
  function muffCob(THREE, g, T, x, z) {
    hexa(THREE, g, T.sup, [[x - 1.1, -1.2, z], [x + 1.1, -1.2, z], [x + 1.1, 1.2, z], [x - 1.1, 1.2, z],
                            [x - 0.9, -0.95, z + 1.4], [x + 0.9, -0.95, z + 1.4], [x + 0.9, 0.95, z + 1.4], [x - 0.9, 0.95, z + 1.4]]);
    cylZ(THREE, g, 0.55, 0.65, 0.4, 12, T.sup, x, 0, z + 1.6);
    sphere(THREE, g, T.soot, 0.95, x, 0, z + 2.6, 1, 1, 1.05);
    box(THREE, g, 0.5, 0.4, 0.4, T.sup, x - 0.2, 0.9, z + 1.7);
  }
  /* MR-123 Vympel (Bass Tilt): the drum radome on a platform [V] */
  function bassTilt(THREE, g, T, x, z) {
    cylZ(THREE, g, 0.85, 0.85, 1.0, 16, T.sup, x, 0, z + 0.5);
    var d = new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 6, 0, PI * 2, 0, PI / 2), T.sup);
    d.geometry.rotateX(PI / 2); d.scale.set(1, 1, 0.55); d.position.set(x, 0, z + 1.0); g.add(d);
    box(THREE, g, 0.4, 0.5, 0.5, T.sup, x - 0.9, 0, z + 0.4);
  }
  /* PSN-10M raft canister on a cradle */
  function raft(THREE, g, T, x, y, z) {
    cylX(THREE, g, 0.33, 0.33, 1.25, 12, T.sup, x, y, z + 0.4);
    box(THREE, g, 1.1, 0.5, 0.1, T.metal, x, y, z + 0.05);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    BS = V.beam / 9.8;
    var T = sealMats(makeMats(THREE, C, V));
    var s, i, x, z;

    /* hull shell in three bands, transom, weather deck and 01 roof [P][W] */
    g.add(shellBand(THREE, T.under, -6, -0.4, 7));
    g.add(shellBand(THREE, T.boot, -0.4, 0.55, 1));
    g.add(shellBand(THREE, T.hull, 0.55, 12, 7));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));
    /* the raked break bulkhead and the front of the 01 level [P][B] */
    var wb = halfB(-2.6) - 0.02;
    hexa(THREE, g, T.hull, [[-3.42, -wb, 2.2], [-3.3, -wb, 2.2], [-3.3, wb, 2.2], [-3.42, wb, 2.2],
                            [-1.86, -wb, 4.62], [-1.74, -wb, 4.62], [-1.74, wb, 4.62], [-1.86, wb, 4.62]]);
    var wf = halfB(17.5) - 0.02;
    box(THREE, g, 0.14, 2 * wf, 0.8, T.sup, 17.5, 0, 5.05);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.06, 0.9, 0.55, T.dark, 17.58, s * 1.4, 5.0);
      /* scuttles in the raised hull, doors in the 01 level side, the anchor
         in its pocket [A][B] */
      for (i = 0; i < 6; i++) { x = 0.5 + i * 2.6; box(THREE, g, 0.32, 0.06, 0.32, T.dark, x, s * (W(x, 3.6) + 0.02), 3.6); }
      box(THREE, g, 0.8, 0.06, 1.5, T.dark, -0.8, s * (W(-0.8, 3.7) + 0.02), 3.7);
      for (i = 0; i < 4; i++) { x = -30 + i * 6.5; box(THREE, g, 0.28, 0.06, 0.28, T.dark, x, s * (W(x, 1.15) + 0.02), 1.15); }
      var ax = 30.6, az = 4.3, ay = s * (W(ax, az) + 0.03);
      box(THREE, g, 1.1, 0.1, 1.0, T.dark, ax, ay, az);
      box(THREE, g, 0.8, 0.16, 0.8, T.gun, ax + 0.05, ay + s * 0.04, az - 0.15);
      /* depth-charge rails along the quarterdeck to the transom ports [S][W] */
      box(THREE, g, 6.2, 0.1, 0.1, T.metal, -32.3, s * 3.1, deckZ(-32.3) + 0.14);
      box(THREE, g, 6.2, 0.1, 0.1, T.metal, -32.3, s * 3.6, deckZ(-32.3) + 0.14);
      for (i = 0; i < 5; i++) box(THREE, g, 0.08, 0.7, 0.12, T.metal, -35.0 + i * 1.4, s * 3.35, deckZ(-35 + i * 1.4) + 0.06);
      box(THREE, g, 0.06, 0.9, 0.6, T.dark, XS0 - 0.02, s * 3.35, 1.25);
    }

    /* forecastle: the SA-N-4 bin x 22 [B][V][W], windlass, bollards,
       jackstaff */
    var BX = 22.0, bz = deckZ(BX);
    cylZ(THREE, g, 1.95, 2.05, 0.55, 24, T.sup, BX, 0, bz + 0.2);
    cylZ(THREE, g, 1.78, 1.85, 0.12, 24, T.metal, BX, 0, bz + 0.52);
    var lid = new THREE.Mesh(new THREE.SphereGeometry(1.8, 20, 4, 0, PI * 2, 0, 0.32), T.metal);
    lid.geometry.rotateX(PI / 2); lid.position.set(BX, 0, bz + 0.58 - 1.8 * Math.cos(0.32)); g.add(lid);
    box(THREE, g, 3.5, 0.06, 0.05, T.dark, BX, 0, bz + 0.86);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.42, 0.48, 0.45, 10, T.metal, 29.6, s * 0.9, deckZ(29.6) + 0.22);
      box(THREE, g, 2.2, 0.16, 0.08, T.gun, 30.6, s * 1.3, deckZ(30.6) + 0.05, -s * 0.3);
      cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, 27.0, s * 2.9, deckZ(27) + 0.22);
      cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, 27.5, s * 2.8, deckZ(27.5) + 0.22);
      cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, 19.5, s * 3.9, deckZ(19.5) + 0.22);
    }
    box(THREE, g, 1.0, 0.9, 0.45, T.metal, 28.5, 0, deckZ(28.5) + 0.22);
    strut(THREE, g, T.metal, 35.2, 0, deckZ(35.2), 35.2, 0, deckZ(35.2) + 2.4, 0.05, 4);

    /* RBU-6000 at the front corners of the 01 level x 15.5 [A][B][W]; the
       Grisha V keeps the port one only [V][W] */
    for (s = -1; s <= 1; s += 2) {
      if (V.mod && s < 0) continue;
      var rb = new THREE.Group(); rb.position.set(15.5, s * 2.85, deckZ(15.5)); rb.scale.set(1.15, 1.15, 1.15); rbu6000(THREE, rb, T); g.add(rb);
    }

    /* bridge block x -0.9..11.6 (02 level), the wheelhouse forward, the
       bridge wings [P][A][B] */
    var r2 = 7.4;
    polyPrism(THREE, g, T.sup, [[-0.9, -3.5], [10.9, -3.5], [11.6, -2.9], [11.6, 2.9], [10.9, 3.5], [-0.9, 3.5]], 4.5, r2);
    polyPrism(THREE, g, T.sup, [[7.4, -3.0], [11.1, -3.0], [11.9, -2.2], [11.9, 2.2], [11.1, 3.0], [7.4, 3.0]], r2, 9.4);
    hexa(THREE, g, T.glass, [[11.88, -2.15, 8.4], [11.96, -2.15, 8.4], [11.96, 2.15, 8.4], [11.88, 2.15, 8.4],
                              [11.86, -2.15, 9.1], [11.94, -2.15, 9.1], [11.94, 2.15, 9.1], [11.86, 2.15, 9.1]]);
    box(THREE, g, 4.4, 6.2, 0.1, T.metal, 9.6, 0, 9.45);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.05, 0.08, 0.65, T.glass, 11.5, s * 2.6, 8.75, s * 0.78);
      box(THREE, g, 3.0, 0.08, 0.6, T.glass, 9.4, s * 3.02, 8.75);
      box(THREE, g, 2.2, 1.3, 0.14, T.sup, 10.2, s * 4.1, r2 + 0.05);
      box(THREE, g, 2.2, 0.08, 0.9, T.sup, 10.2, s * 4.72, r2 + 0.5);
      for (i = 0; i < 5; i++) box(THREE, g, 0.6, 0.06, 0.5, T.dark, -0.2 + i * 2.2, s * 3.52, 6.6);
      box(THREE, g, 0.8, 0.06, 1.6, T.dark, 2.0, s * 3.52, 5.6);
      /* four PSN-10M rafts on the 01 level beside the bridge block [W][V] */
      raft(THREE, g, T, -0.2, s * 3.95, deckZ(-0.2));
      raft(THREE, g, T, 1.3, s * 3.95, deckZ(1.3));
    }
    roofRail(THREE, g, T, [[-0.8, 3.4], [7.3, 3.4], [7.3, -3.4], [-0.8, -3.4], [-0.8, 3.4]], r2, 0.8);
    popGroup(THREE, g, T, 5.9, r2);
    cylZ(THREE, g, 0.18, 0.18, 0.5, 8, T.metal, 11.0, 1.9, 9.75);
    cylZ(THREE, g, 0.18, 0.18, 0.5, 8, T.metal, 11.0, -1.9, 9.75);

    /* the square, solid foremast x 2.4 [W][P][A], its platforms, yard and
       radars: Strut Curve on the Grisha I, Strut Pair on the Grisha V */
    tprism(THREE, g, 2.3, 2.2, 1.25, 1.2, 13.6 - r2, T.sup, 2.4, 0, (13.6 + r2) / 2);
    box(THREE, g, 2.8, 2.0, 0.12, T.metal, 3.2, 0, 12.4);
    roofRail(THREE, g, T, [[2.0, 1.0], [4.5, 1.0], [4.5, -1.0], [2.0, -1.0]], 12.4, 0.6);
    donBar(THREE, g, T, 4.0, 12.46);
    box(THREE, g, 0.18, 4.2, 0.14, T.metal, 2.4, 0, 13.1);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 2.4, s * 0.45, 12.5, 2.4, s * 1.9, 13.1, 0.03, 3);
    box(THREE, g, 1.4, 1.4, 0.12, T.metal, 2.4, 0, 13.66);
    if (V.mod) strutPair(THREE, g, T, 2.4, 13.7); else strutCurve(THREE, g, T, 2.4, 13.7);
    /* the tall thin lattice abaft the foremast [P][A][V] */
    var lg = new THREE.Group(); lg.position.set(0.6, 0, r2); lg.rotation.y = -0.12; g.add(lg);
    lattice(THREE, lg, T.metal, 0, 0.42, 0.42, 0.1, 0.1, 0, 17.4 - r2, 5, 0.045);
    box(THREE, lg, 0.1, 2.6, 0.08, T.metal, 0, 0, 15.6 - r2);
    box(THREE, lg, 0.1, 1.6, 0.08, T.metal, 0, 0, 16.8 - r2);
    strut(THREE, lg, T.metal, 0, 0, 17.4 - r2, 0, 0, 18.6 - r2, 0.03, 3);

    /* the uptake casing on the main deck abaft the break, its dark
       exhaust tops and louvres [P][S] */
    hexa(THREE, g, T.sup, [[-8.8, -2.15, 2.1], [-1.2, -2.15, 2.1], [-1.2, 2.15, 2.1], [-8.8, 2.15, 2.1],
                            [-8.4, -1.9, 6.4], [-1.4, -1.9, 6.8], [-1.4, 1.9, 6.8], [-8.4, 1.9, 6.4]]);
    var cg = new THREE.Group(); cg.position.set(-4.9, 0, 6.62); cg.rotation.y = -Math.atan2(0.4, 7.0);
    box(THREE, cg, 6.0, 3.0, 0.3, T.sup, 0, 0, 0.1);
    box(THREE, cg, 1.7, 1.6, 0.06, T.soot, -1.3, 0, 0.27);
    box(THREE, cg, 1.7, 1.6, 0.06, T.soot, 1.3, 0, 0.27);
    g.add(cg);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++)
      box(THREE, g, 1.1, 0.06, 1.0, T.dark, -7.6 + i * 1.7, s * 2.06, 4.4);

    /* the twin tubes either side of the casing, muzzles forward [A][S][W] */
    for (s = -1; s <= 1; s += 2) {
      var tt = new THREE.Group(); tt.position.set(-9.6, s * 3.1, deckZ(-9.6)); tubes2(THREE, tt, T); g.add(tt);
    }

    /* the after house x -21.6..-12.6 and the small tripod at its front
       [P][S][W] */
    var ah = 4.5;
    polyPrism(THREE, g, T.sup, [[-21.6, -2.7], [-20.8, -3.35], [-12.6, -3.35], [-12.6, 3.35], [-20.8, 3.35], [-21.6, 2.7]], 1.6, ah);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 0.55, 0.06, 0.45, T.dark, -20.0 + i * 2.0, s * 3.37, 3.6);
      box(THREE, g, 0.8, 0.06, 1.6, T.dark, -13.6, s * 3.37, 2.8);
      /* ventilators and bollards on the quarterdeck */
      cylZ(THREE, g, 0.24, 0.3, 0.8, 10, T.sup, -11.6, s * 3.9, deckZ(-11.6) + 0.4);
      cylZ(THREE, g, 0.38, 0.24, 0.3, 10, T.dark, -11.6, s * 3.9, deckZ(-11.6) + 0.95);
      cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, -30.0, s * 4.1, deckZ(-30) + 0.22);
      cylZ(THREE, g, 0.17, 0.17, 0.45, 6, T.metal, -30.5, s * 4.1, deckZ(-30.5) + 0.22);
    }
    box(THREE, g, 0.06, 1.0, 1.6, T.dark, -12.58, 0, 2.8);
    roofRail(THREE, g, T, [[-12.7, 3.25], [-20.8, 3.25], [-21.5, 2.6], [-21.5, -2.6], [-20.8, -3.25], [-12.7, -3.25]], ah, 0.8);
    var tp = [[-12.9, 0, ah], [-14.2, 1.4, ah], [-14.2, -1.4, ah]], tz = V.mod ? 8.0 : 9.4;
    tp.forEach(function (p) { strut(THREE, g, T.metal, p[0], p[1], p[2], -13.6, 0, tz, 0.07, 4); });
    if (V.mod) {
      /* Bass Tilt on the tripod platform, the AK-630M on the house roof aft [V][W] */
      box(THREE, g, 2.4, 2.4, 0.14, T.metal, -13.6, 0, tz);
      bassTilt(THREE, g, T, -13.6, tz + 0.07);
      strut(THREE, g, T.metal, -14.5, 0, tz + 1.6, -14.5, 0, tz + 3.2, 0.03, 3);
      cylZ(THREE, g, 0.85, 0.95, 0.6, 14, T.sup, -19.4, 0, ah + 0.3);
      var a6 = new THREE.Group(); a6.position.set(-19.4, 0, ah + 0.6); a6.rotation.z = PI; ak630(THREE, a6, T); g.add(a6);
    } else {
      /* Muff Cob on its pedestal [P][S]; a lamp and yard at the tripod head */
      strut(THREE, g, T.metal, -13.6, 0, tz, -13.6, 0, tz + 1.0, 0.04, 4);
      box(THREE, g, 0.1, 1.8, 0.08, T.metal, -13.6, 0, tz - 0.3);
      muffCob(THREE, g, T, -20.0, ah);
    }

    /* the raised base of the stern gun x -26 [S] */
    var gz = deckZ(-26.0);
    polyPrism(THREE, g, T.sup, [[-28.0, -1.2], [-27.3, -1.85], [-24.9, -1.85], [-24.1, -1.1], [-24.1, 1.1], [-24.9, 1.85], [-27.3, 1.85], [-28.0, 1.2]], gz - 0.1, gz + 0.9);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.6, 0.06, 0.5, T.dark, -26.4, s * 1.87, gz + 0.45);

    /* underwater gear: three shafts (wing 2.0 m props, centre 2.4 m) on
       brackets, two rudders [W]; bilge keels */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.16, 0.16, 8.0, 8, T.metal, -29.0, s * 2.5, -2.0);
      strut(THREE, g, T.metal, -32.0, s * 2.5, -2.0, -32.0, s * 2.9, -0.9, 0.1, 4);
      strut(THREE, g, T.metal, -32.0, s * 2.5, -2.0, -32.0, s * 1.8, -1.0, 0.1, 4);
      cylX(THREE, g, 0.24, 0.36, 0.6, 8, T.metal, -33.4, s * 2.5, -2.0);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.42, 0.95), T.metal);
        bl.position.set(-33.4, s * 2.5, -2.0); bl.rotation.x = i * PI / 2 + 0.35;
        bl.translateZ(0.55); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 1.6, 0.18, 1.7, T.metal, -34.6, s * 1.25, -1.15);
      box(THREE, g, 20.0, 0.08, 0.5, T.under, -8.0, s * (W(-8, -2.4) + 0.15), -2.45);
    }
    cylX(THREE, g, 0.2, 0.2, 9.0, 8, T.metal, -27.0, 0, -2.75);
    strut(THREE, g, T.metal, -30.0, 0, -2.75, -30.0, 0, -1.9, 0.12, 4);
    cylX(THREE, g, 0.28, 0.42, 0.7, 8, T.metal, -31.8, 0, -2.75);
    for (i = 0; i < 4; i++) {
      var bc = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.5, 1.15), T.metal);
      bc.position.set(-31.8, 0, -2.75); bc.rotation.x = i * PI / 2 + 0.6;
      bc.translateZ(0.65); bc.rotation.y = 0.45; g.add(bc);
    }

    /* rails along the deck edges */
    railRun(THREE, g, T, -35.3, -3.7, 3.0, 1.0);
    railRun(THREE, g, T, -1.5, 17.2, 3.2, 1.0);
    railRun(THREE, g, T, 17.9, 34.6, 2.8, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.0, 0.8, 0.04, T.team, 9.6, 0, 9.52);
    box(THREE, g, 2.0, 0.8, 0.04, T.team, -16.0, 0, ah + 0.02);
    box(THREE, g, 1.6, 0.7, 0.04, T.team, -33.4, 0, deckZ(-33.4) + 0.02);

    /* trained mount: the stern gun, the mount of the row's first weapon */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(-26.0, 0, gz + 0.9);
    if (V.mod) ak176(THREE, tw, T); else ak725(THREE, tw, T);

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

UNIT_MODELS["pact_e60_corvette"] = {
  len: 71.2,
  build: function (THREE, M, C) { return HeroGrisha.build(THREE, M, C, { beam: 9.8, mod: false }); }
};
UNIT_MODELS["pact_e90_corvette"] = {
  len: 71.2,
  build: function (THREE, M, C) { return HeroGrisha.build(THREE, M, C, { beam: 10.2, mod: true }); }
};
