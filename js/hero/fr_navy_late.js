/* ==================== js/hero/fr_navy_late.js ========================
   HERO MODELS -- the French navy from the 1980s on: twelve classes, built
   once each and registered on every row that names them.  Until now each
   of these rows borrowed the first model of its role (render3d.js
   modelKeyFor): an American Mk VI, LCS, Arleigh Burke, Virginia, Ohio or
   Ford.

     key                builder                  class drawn
     boat_f             HeroFrNavyLate.pom        Patrouilleur Outre-mer (Auguste Benebig)
     fra_e80_patrol     HeroFrNavyLate.p400       P400 (L'Audacieuse class)
     fra_e90_patrol     HeroFrNavyLate.flamant    Flamant (OPV 54)
     fra_e00_patrol     HeroFrNavyLate.confiance  La Confiance (PLG)
     fra_e80_corvette   HeroFrNavyLate.a69        A69 aviso (D'Estienne d'Orves)
     fra_e90_corvette   HeroFrNavyLate.lafayette  La Fayette fregate furtive
     corvette_f,
     fra_e00_corvette   HeroFrNavyLate.fremm      FREMM Aquitaine (one builder, two rows)
     fra_e80_destroyer  HeroFrNavyLate.tourville  Tourville F67
     fra_e90_destroyer  HeroFrNavyLate.cassard    Cassard F70 AA
     destroyer_f,
     fra_e00_destroyer  HeroFrNavyLate.horizon    Horizon, drawn as Forbin (two rows)
     fra_e80_sub        HeroFrNavyLate.agosta     Agosta SSK
     fra_e90_sub        HeroFrNavyLate.rubis      Rubis SSN as built (72.1 m)
     fra_e00_sub        HeroFrNavyLate.amethyste  Rubis after the Amethyste refit (73.6 m)
     sub_f              HeroFrNavyLate.suffren    Suffren (Barracuda) SSN
     ssbn_f,
     fra_e90_ssbn       HeroFrNavyLate.triomphant Le Triomphant SNLE-NG (two rows: M51 / M45)
     carrier_f,
     fra_e00_carrier    HeroFrNavyLate.cdg        Charles de Gaulle (two rows)
     fra_e80_carrier,
     fra_e90_carrier,
     fra_e80_cruiser    NOT BUILT HERE: registered at the foot on HeroClemenceau /
                        HeroColbert from js/hero/fr_navy_early.js, guarded, so they
                        take effect only when that file loads first.
   Nothing in js/hero draws any of these hulls (grep for the names finds
   only text), so policy 5 has nothing to reuse; the geometry kit is copied
   from js/hero/pla_navy_modern.js (itself from pla_type056.js).

   REFERENCES: each class's block below names its photographs or drawings
   (Wikimedia Commons, fetched through thumb.php, kept in
   scratchpad/q_frnl_ref) and what was read off each.  PUBLISHED figures
   are en.wikipedia's (raw wikitext read 2026-11-12): FREMM 142 x 20 x
   7.6 (draught with the sonar; hull 5.4 drawn); Horizon 152.87 x 20.3 x
   5.4; Charles de Gaulle 261.5 LOA, 64.36 overall width, 9.43 draught;
   Suffren 99.5 x 8.8 x 7.3; Triomphant 138 x 12.5 x 10.6; Rubis 72.1
   (Amethyste 73.6) x 7.6 x 6.4; Agosta 67 x 6; A69 80 x 10.3 x 5.3
   (with the sonar; 3.6 drawn); Tourville 152.8 x 15.3 x 5.7; La Fayette
   125 x 15.4 x 4.1; Cassard 139 x 14 x 6.5 (with the sonar; 5.0 drawn);
   P400 54.8 x 8 x 2.54; Flamant 54 x 10 x 2.2; Confiance 60.8 x 9.55 x
   3.2; the POM's 80 m is the row's own figure (no page found).

   REWORK ROUND 2026-11-12 (the owner's visual review): the Charles de
   Gaulle's flight deck no longer floats over a bare hull -- an overhang
   band and soffit run round it back to the flared hull, deepest under the
   angled deck's sponson [G2][G3], with bays in its face; the island's
   tiers carry window and door rows and deck galleries [G1][G2]; the
   lattice mast now stands on the island's platform (it had been drawn on
   the centreline).  Soffit slope and bay places NOT CONFIRMED.
   REWORK 2 (same day): the Amethyste (fra_e00_sub) re-lofted on the
   submarine kit of js/hero/fr_navy_early.js (HeroFrSubKit, called, not
   copied): the round pressure hull with the casing on its back from the
   knuckle line [R2] draws, the side panel's upright ends, the paler
   casing skin, weld seams, a free-flood row, the bow shutters, casing
   hatches, cleats, capstan and track, the lofted sail with its window
   ring, bridge recess and masts, tapered planes, rudders with hinge gaps
   and a skewed five-bladed screw (details at buildAmethyste2).  9668 ->
   10814 tris, 4 -> 7 draw calls; 73.52 x 8.0 x 16.8 m (masts raised).
   The Rubis (fra_e90_sub) and the other boats keep buildSub, unchanged.
   LOAD ORDER (rework 2): the Amethyste needs js/hero/fr_navy_early.js
   loaded first (it is, in index.html and cmp.html); without it the
   earlier buildSub model is drawn.

   NOT CONFIRMED (every ship): the plan widths of the superstructure
   blocks (the references are side views; walls are drawn flush with the
   hull or set in, leaning in on the stealthy ships as the 3/4 views show);
   every underwater line (the hull's stations are laid out from the
   published length, beam and draught by autoSTA); the places of the small
   fittings (rails, bollards, hatches, vents, rafts, scuttles, ladders,
   aerials - rule 10: every photograph shows them; their exact stations
   are not measured).  Heights read through a projective fit (A69,
   Tourville, Flamant) carry about +-1 m.  No pennant numbers, names,
   flags, roundels or deck lettering anywhere; plain Marine nationale grey
   on a weathered plate texture, red-brown bottom, black boot topping,
   matt black submarines; the team colour as small roof strips.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0 (the
   submarines at their surfaced trim, as js/hero/ru_kilo.js).  Rows with
   turret:true have their main gun mount as the group named "turret"
   (on the Horizon the starboard 76 mm of the pair abreast; the port one
   is baked); the escorts with a pad carry a hidden "helipad" node on its
   middle (js/hero/pla_navy_modern.js).  The carrier's flight deck is a
   clean plate: nothing stands on it but the island (the catwalk rails run
   under its edge).  ASCII only.

   LOAD ORDER: after nothing (self-contained) - but the three guarded
   Clemenceau / Colbert registrations need js/hero/fr_navy_early.js loaded
   BEFORE this file.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroFrNavyLate = (function () {
  "use strict";
  var PI = Math.PI;

  /* ================================================================ KIT
     Copied from js/hero/pla_navy_modern.js (itself from pla_type056.js):
     textures, materials, primitives, the faceted frustum, the chamfered
     plan, the ring loft, the plate, the baker and the lofted hull. */
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
  function hullTex(THREE) {
    return canvasTex(THREE, "fnlHull", 512, 256, function (g, w, h) {
      var R = rng(6205), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      /* plating seams (strakes and butts) */
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 5; i++) { var xx = i * w / 5 + (i % 2) * 18; g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke(); }
      /* weathering: rust and salt streaks running down, grime patches */
      g.globalAlpha = 0.07;
      for (i = 0; i < 46; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 2 + R() * 5, 18 + R() * 80); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 22; i++) { g.fillStyle = "#6a4a30"; g.fillRect(R() * w, R() * h * 0.6, 1 + R() * 2, 20 + R() * 60); }
      g.globalAlpha = 0.05;
      for (i = 0; i < 14; i++) { g.fillStyle = "#000000"; g.beginPath(); g.arc(R() * w, R() * h, 10 + R() * 30, 0, 6.3); g.fill(); }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "fnlPlate", 256, 256, function (g, w, h) {
      var R = rng(6217), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.05;
      for (i = 0; i < 18; i++) { g.fillStyle = "#5a4a3a"; g.fillRect(R() * w, R() * h, 1 + R() * 2, 14 + R() * 40); }
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 26; i++) { g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000"; g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30); }
      g.globalAlpha = 1;
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "fnlDeck", 256, 256, function (g, w, h) {
      var R = rng(6211), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.13; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, i * h / 6); g.lineTo(w, i * h / 6); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  function grilleTex(THREE) {
    return canvasTex(THREE, "fnlGrille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }
  function tileTex(THREE) {
    return canvasTex(THREE, "fnlTile", 256, 256, function (g, w, h) {
      var i, j;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (j = 0; j < 8; j++) {
        g.beginPath(); g.moveTo(0, j * h / 8); g.lineTo(w, j * h / 8); g.stroke();
        for (i = 0; i < 6; i++) {
          var xx = i * w / 6 + (j % 2) * w / 12;
          g.beginPath(); g.moveTo(xx, j * h / 8); g.lineTo(xx, (j + 1) * h / 8); g.stroke();
        }
      }
      g.globalAlpha = 1;
    });
  }

  /* paint: Marine nationale light grey (every photograph below); the boot
     topping and bottom dark red-brown; the submarines matt black */
  var PAINT = { hull: 0x9aa1a5, sup: 0xa3aaad, deck: 0x5a6064 };
  function makeMats(THREE, C, P) {
    P = P || PAINT;
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    var M = {
      hull:  skin(P.hull, hullTex(THREE), 0.86),
      under: skin(0x4a1c16, hullTex(THREE), 0.9),
      sup:   skin(P.sup, plateTex(THREE), 0.86),
      deck:  skin(P.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      white: skin(0xd2d4d2, plateTex(THREE), 0.8),
      tile:  skin(0x262829, tileTex(THREE), 0.95),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5c636a, 0.52, 0.55),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x05090b, roughness: 0.1, metalness: 0,
                                              transparent: true, opacity: 0.84 })
    };
    for (var k in M) if (M.hasOwnProperty(k)) { M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true; }
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
  function sphere(THREE, p, r, m, x, y, z, ws, hs) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, ws || 12, hs || 8), m);
    s.position.set(x, y, z); p.add(s); return s;
  }
  /* a dome: a sphere's upper part on a short drum (radomes) */
  function dome(THREE, p, r, m, x, y, z) {
    cylZ(THREE, p, r, r, r * 0.7, 14, m, x, y, z + r * 0.35);
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 6, 0, PI * 2, 0, PI / 2), m);
    s.rotation.x = PI / 2; s.position.set(x, y, z + r * 0.7); p.add(s); return s;
  }
  /* a faceted solid between two convex polygons (CCW from above) */
  function frustum(THREE, p, m, lo, z0, hi, z1) {
    var pos = [], uv = [], n = lo.length, i, a, b, c, d;
    function tri(P, Q, R, side) {
      var v = [P, Q, R], k;
      for (k = 0; k < 3; k++) {
        pos.push(v[k][0], v[k][1], v[k][2]);
        if (side) uv.push((v[k][0] + v[k][1]) * 0.16, v[k][2] * 0.16); else uv.push(v[k][0] * 0.16, v[k][1] * 0.16);
      }
    }
    for (i = 1; i < n - 1; i++) {
      tri([hi[0][0], hi[0][1], z1], [hi[i][0], hi[i][1], z1], [hi[i + 1][0], hi[i + 1][1], z1], false);
      tri([lo[0][0], lo[0][1], z0], [lo[i + 1][0], lo[i + 1][1], z0], [lo[i][0], lo[i][1], z0], false);
    }
    for (i = 0; i < n; i++) {
      a = [lo[i][0], lo[i][1], z0]; b = [lo[(i + 1) % n][0], lo[(i + 1) % n][1], z0];
      c = [hi[(i + 1) % n][0], hi[(i + 1) % n][1], z1]; d = [hi[i][0], hi[i][1], z1];
      tri(a, b, c, true); tri(a, c, d, true);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  /* plan rectangle x0..x1, half width hw, corners chamfered (cfa aft, cff
     forward), CCW from above; edge 0 starboard side, 2 front, 4 port side,
     6 after face */
  function chamf(x0, x1, hw, cfa, cff, yc) {
    yc = yc || 0;
    return [[x0 + cfa, yc - hw], [x1 - cff, yc - hw], [x1, yc - hw + cff], [x1, yc + hw - cff],
            [x1 - cff, yc + hw], [x0 + cfa, yc + hw], [x0, yc + hw - cfa], [x0, yc - hw + cfa]];
  }
  function facePatch(THREE, p, m, lo, z0, hi, z1, k, s0, s1, za, zb, off) {
    var n = lo.length, k1 = (k + 1) % n;
    function at(s, z) {
      var f = (z - z0) / (z1 - z0);
      var ax = lo[k][0] + (hi[k][0] - lo[k][0]) * f, ay = lo[k][1] + (hi[k][1] - lo[k][1]) * f;
      var bx = lo[k1][0] + (hi[k1][0] - lo[k1][0]) * f, by = lo[k1][1] + (hi[k1][1] - lo[k1][1]) * f;
      return [ax + (bx - ax) * s, ay + (by - ay) * s, z];
    }
    var ex = lo[k1][0] - lo[k][0], ey = lo[k1][1] - lo[k][1], L = Math.hypot(ex, ey) || 1;
    var nx = ey / L * off, ny = -ex / L * off;
    var A = at(s0, za), B = at(s1, za), Cc = at(s1, zb), D = at(s0, zb), pos = [], uv = [];
    [A, B, Cc, D].forEach(function (P) { P[0] += nx; P[1] += ny; });
    function q(P, Q, R) { pos.push(P[0], P[1], P[2], Q[0], Q[1], Q[2], R[0], R[1], R[2]); uv.push(0, 0, 1, 0, 1, 1); }
    q(A, B, Cc); q(A, Cc, D); q(A, Cc, B); q(A, D, Cc);
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  function ringLoft(THREE, p, m, xs, rings, cap, uvs) {
    var pos = [], uv = [], idx = [], n = rings[0].length, i, j;
    for (i = 0; i < xs.length; i++) for (j = 0; j < n; j++) {
      pos.push(xs[i], rings[i][j][0], rings[i][j][1]); uv.push(xs[i] * (uvs || 0.2), j / n * (uvs ? 40 * uvs : 1));
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
  function plate(THREE, p, m, poly, z, th, mSide) {
    var shp = new THREE.Shape(), i, n = poly.length;
    shp.moveTo(poly[0][0], poly[0][1]);
    for (i = 1; i < n; i++) shp.lineTo(poly[i][0], poly[i][1]);
    var gT = new THREE.ShapeGeometry(shp); gT.translate(0, 0, z);
    var mT = new THREE.Mesh(gT, m); p.add(mT);
    if (th > 0) {
      var gB = new THREE.ShapeGeometry(shp); gB.rotateX(PI); gB.scale(1, -1, 1); gB.translate(0, 0, z - th);
      p.add(new THREE.Mesh(gB, mSide || m));
      var pos = [], uv = [], s = 0;
      for (i = 0; i < n; i++) {
        var a = poly[i], b = poly[(i + 1) % n], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
        pos.push(a[0], a[1], z - th, b[0], b[1], z - th, b[0], b[1], z,
                 a[0], a[1], z - th, b[0], b[1], z, a[0], a[1], z);
        uv.push(s / 8, 0, (s + L) / 8, 0, (s + L) / 8, th / 8, s / 8, 0, (s + L) / 8, th / 8, s / 8, th / 8);
        s += L;
      }
      p.add(new THREE.Mesh(geoOf(THREE, pos, uv), mSide || m));
    }
    return mT;
  }
  function polyCCW(poly) {
    var a = 0, i;
    for (i = 0; i < poly.length; i++) { var p = poly[i], q = poly[(i + 1) % poly.length]; a += p[0] * q[1] - q[0] * p[1]; }
    return a >= 0 ? poly : poly.slice().reverse();
  }
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
  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 3.0));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.03, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.022, 3);
      strut(THREE, g, T.metal, a[0], a[1], z + hgt * 0.5, b[0], b[1], z + hgt * 0.5, 0.018, 3);
    }
  }

  /* ======================================================= LOFTED HULL
     makeHull as in pla_navy_modern.js.  H.STA rows: x, half beam at the
     deck edge, half beam at the waterline, bottom z on the centreline,
     bilge fullness.  autoSTA (new here) lays those rows out from the
     published length, beam and draught: the plan and the underwater body
     are NOT CONFIRMED on every ship (side photographs only); the stem,
     transom and sheer come from each ship's side photograph. */
  function lin(tab, x) {
    var i;
    if (x <= tab[0][0]) return tab[0][1];
    for (i = 1; i < tab.length; i++) if (x <= tab[i][0]) {
      var a = tab[i - 1], b = tab[i];
      return b[0] === a[0] ? b[1] : a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
    }
    return tab[tab.length - 1][1];
  }
  function autoSTA(o) {
    /* o: XS0 (transom), XS1 (stem head), XWL (stem at the waterline), B
       (half beam at the deck), Bw (half beam at the waterline), T
       (draught), tw (transom width fraction), fine (bow fineness) */
    var L = o.XWL - o.XS0, tw = o.tw === undefined ? 0.8 : o.tw, f = o.fine || 1;
    var U = [[0, tw, tw * 0.92, 0.12, 3.0], [0.04, 0.9, 0.86, 0.45, 3.0], [0.14, 0.99, 0.97, 0.85, 3.0],
             [0.3, 1, 1, 1, 3.2], [0.55, 1, 1, 1, 3.2], [0.7, 0.96, 0.9, 0.98, 2.6],
             [0.8, 0.86 - 0.06 * f, 0.7 - 0.1 * f, 0.94, 2.1], [0.9, 0.66 - 0.08 * f, 0.42 - 0.08 * f, 0.82, 1.7],
             [0.96, 0.48 - 0.06 * f, 0.18, 0.55, 1.4]];
    var S = U.map(function (u) { return [o.XS0 + u[0] * L, o.B * u[1], o.Bw * u[2], -o.T * u[3], u[4]]; });
    S.push([o.XWL, o.B * (o.bw0 || 0.36), 0, 0, 1.3]);
    S.push([o.XS1, 0.15, 0, 0, 1.2]);
    return S;
  }
  function makeHull(H) {
    var STA = H.STA, XS0 = H.XS0, XS1 = H.XS1, XWL = H.XWL, XST = H.XST;
    var deckZ = H.deckZ || function (x) { return lin(H.sheer, x); };
    function pick(x, k) {
      var i;
      if (x <= STA[0][0]) return STA[0][k];
      for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * f;
      }
      return STA[STA.length - 1][k];
    }
    function zBot(x) {
      if (x > XWL) return deckZ(XS1) * (x - XWL) / (XS1 - XWL);
      if (x < XST) return pick(XS0, 3) + (pick(XST, 3) - pick(XS0, 3)) * (x - XS0) / (XST - XS0);
      return pick(x, 3);
    }
    function W(x, z) {
      var zd = deckZ(x), bk = pick(x, 1), bw = pick(x, 2), zb = zBot(x);
      if (z > zd) z = zd;
      if (z <= zb) return 0;
      if (x > XWL) return bk * Math.pow((z - zb) / (zd - zb), H.stemP || 0.62);
      if (z >= 0) return bw + (bk - bw) * Math.pow(z / zd, H.fl || 1);
      var n = pick(x, 4), t = Math.min(1, z / zb);
      return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    }
    function halfTop(x) { return W(x, deckZ(x)); }
    function xs() {
      var a = [], x, i, st = H.step || 2.0;
      for (x = XS0; x < XS1 - 0.01; x += st) a.push(x);
      for (i = 0; i < STA.length; i++) a.push(STA[i][0]);
      for (x = XWL - 8; x < XS1; x += st / 2.5) a.push(x);
      (H.sheer || []).forEach(function (v) { a.push(v[0]); });
      a.push(XS1, XST);
      a.sort(function (p, q) { return p - q; });
      return a.filter(function (v, k) { return v >= XS0 && v <= XS1 && (k === 0 || v - a[k - 1] > 0.05); });
    }
    function shellBand(THREE, m, zlo, zhi, rows) {
      var X = xs(), pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
      for (s = -1; s <= 1; s += 2) {
        var base = pos.length / 3;
        for (i = 0; i < X.length; i++) {
          var x = X[i], zb = zBot(x), zd = deckZ(x);
          var a0 = Math.min(Math.max(zlo, zb), zd), b0 = Math.min(Math.max(zhi, zb), zd);
          for (j = 0; j < NR; j++) {
            var z = a0 + (b0 - a0) * j / rows;
            pos.push(x, s * W(x, z), z); uv.push(x / 24, z / 8);
          }
        }
        for (i = 0; i < X.length - 1; i++) for (j = 0; j < rows; j++) {
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
    function deckSheet(THREE, m, xa, xb) {
      var X = xs().filter(function (v) { return v >= xa - 1e-6 && v <= xb + 1e-6; });
      var pos = [], uv = [], idx = [], i, j, NC = 4;
      for (i = 0; i < X.length; i++) {
        var x = X[i], w = halfTop(x), z = deckZ(x);
        for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC)) / 8); }
      }
      for (i = 0; i < X.length - 1; i++) for (j = 0; j < NC; j++) {
        var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
      return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
    }
    function transom(THREE, g, mHull, mUnder) {
      var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, k;
      var P = { hi: [[], []], lo: [[], []] };
      for (j = 0; j < N; j++) {
        var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
        var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1), Lr = (z0 + z1) / 2 >= -0.3 ? P.hi : P.lo;
        Lr[0].push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
        for (k = 0; k < 6; k++) Lr[1].push(Lr[0][Lr[0].length - 18 + k * 3 + 1] / 24, Lr[0][Lr[0].length - 18 + k * 3 + 2] / 8);
      }
      if (P.hi[0].length) g.add(new THREE.Mesh(geoOf(THREE, P.hi[0], P.hi[1]), mHull));
      if (P.lo[0].length) g.add(new THREE.Mesh(geoOf(THREE, P.lo[0], P.lo[1]), mUnder || mHull));
    }
    function edgeY(x) { return Math.max(0.1, halfTop(x) - 0.12); }
    function railRun(THREE, g, T, x0, x1, step, hgt) {
      var n = Math.max(2, Math.round(Math.abs(x1 - x0) / step)), s, i, prev, x, y, z;
      for (s = -1; s <= 1; s += 2) {
        prev = null;
        for (i = 0; i <= n; i++) {
          x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x);
          strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
          if (prev) {
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt, x, y, z + hgt, 0.024, 3);
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.018, 3);
          }
          prev = [x, y, z];
        }
      }
    }
    /* the standard surface-ship hull: anti-fouling below the boot line,
       grey above, the transom, the weather deck */
    function shell(THREE, g, T, zTop) {
      var zb = -H.T - 1;
      g.add(shellBand(THREE, T.under, zb, -0.25, 5));
      g.add(shellBand(THREE, T.tile, -0.25, 0.3, 1));              /* the boot-topping band */
      g.add(shellBand(THREE, T.hull, 0.3, zTop || 40, 7));
      transom(THREE, g, T.hull, T.under);
      g.add(deckSheet(THREE, T.deck, XS0, XS1));
    }
    return { W: W, zBot: zBot, deckZ: deckZ, halfTop: halfTop, shellBand: shellBand,
             deckSheet: deckSheet, transom: transom, railRun: railRun, edgeY: edgeY, pick: pick, shell: shell };
  }
  /* a hull from the generic rows: o as autoSTA, plus sheer [[x, z]...] */
  function hullOf(o) {
    var H = { XS0: o.XS0, XS1: o.XS1, XWL: o.XWL, XST: o.XST === undefined ? o.XS0 + 1.0 : o.XST,
              step: o.step || 2.0, fl: o.fl || 1.0, stemP: o.stemP, sheer: o.sheer, T: o.T,
              STA: o.STA || autoSTA(o) };
    return makeHull(H);
  }

  /* ========================================================= FITTINGS */
  /* a superstructure block: plan x0..x1, half width hw (centred on yc),
     from z0 to z1, its walls leaning in by lean (m per m of height: the
     inclined walls of the stealthy ships), corners chamfered */
  function block(THREE, g, m, x0, x1, hw, z0, z1, o) {
    o = o || {};
    var ln = (o.lean || 0) * (z1 - z0), cfa = o.cfa === undefined ? 0.5 : o.cfa, cff = o.cff === undefined ? 0.8 : o.cff;
    var lo = chamf(x0, x1, hw, cfa, cff, o.yc), hi = chamf(x0 + ln * (o.leanAft === undefined ? 1 : o.leanAft), x1 - ln * (o.leanFwd === undefined ? 1 : o.leanFwd), hw - ln, cfa, cff, o.yc);
    frustum(THREE, g, m, lo, z0, hi, z1);
    return { lo: lo, hi: hi, z0: z0, z1: z1 };
  }
  /* a band of windows across a block's front (faces 1..3) */
  function glazeFront(THREE, g, T, B, za, zb) {
    [1, 2, 3].forEach(function (k) { facePatch(THREE, g, T.glass, B.lo, B.z0, B.hi, B.z1, k, 0.05, 0.95, za, zb, 0.06); });
  }
  /* a radome on a short pedestal */
  function radome(THREE, g, T, r, x, y, z, ped) {
    if (ped) cylZ(THREE, g, r * 0.35, r * 0.45, ped, 8, T.sup, x, y, z + ped / 2);
    sphere(THREE, g, r, T.white, x, y, z + (ped || 0) + r * 0.85, 14, 10);
  }
  /* a pole mast with yards */
  function pole(THREE, g, T, x, z0, z1, r, yards) {
    strut(THREE, g, T.metal, x, 0, z0, x, 0, z1, r, 6);
    (yards || []).forEach(function (yd) { box(THREE, g, 0.12, yd[1] * 2, 0.12, T.metal, x, 0, yd[0]); });
  }
  /* a lattice mast: four legs tapering from a square of side a at z0 to b at z1 */
  function lattice(THREE, g, T, x, z0, z1, a, b) {
    var s, t, n = Math.max(2, Math.round((z1 - z0) / 2.2)), i;
    for (s = -1; s <= 1; s += 2) for (t = -1; t <= 1; t += 2)
      strut(THREE, g, T.metal, x + s * a / 2, t * a / 2, z0, x + s * b / 2, t * b / 2, z1, 0.08, 4);
    for (i = 1; i <= n; i++) {
      var z = z0 + (z1 - z0) * i / n, w = a + (b - a) * i / n;
      box(THREE, g, w, 0.08, 0.08, T.metal, x, w / 2, z); box(THREE, g, w, 0.08, 0.08, T.metal, x, -w / 2, z);
      box(THREE, g, 0.08, w, 0.08, T.metal, x - w / 2, 0, z); box(THREE, g, 0.08, w, 0.08, T.metal, x + w / 2, 0, z);
    }
  }
  /* a flat rotating search array on its pedestal (DRBV, Herakles-type grid) */
  function array(THREE, g, T, x, y, z, wid, hgt, m) {
    cylZ(THREE, g, 0.3, 0.4, 0.8, 8, T.metal, x, y, z + 0.4);
    box(THREE, g, 0.35, wid, hgt, m || T.dark, x, y, z + 0.8 + hgt / 2);
  }
  /* MM38/MM40 Exocet: a pair (or n) of canisters on a cradle, angled up
     forward, at x, on one side or both (side +1 port, -1 starboard, 0 a
     pair across the centreline aimed outboard) */
  function exocet(THREE, g, T, x, y, z, n, rz, len) {
    var grp = new THREE.Group(), k; len = len || 6.0;
    grp.position.set(x, y, z); grp.rotation.z = rz || 0; g.add(grp);
    for (k = 0; k < n; k++) {
      var c = cylX(THREE, grp, 0.42, 0.42, len, 8, T.white, 0, (k - (n - 1) / 2) * 0.95, 0.9);
      c.rotation.y = -0.2;
      c.geometry.rotateY(0);
    }
    box(THREE, grp, len * 0.5, n * 0.95, 0.4, T.metal, -0.4, 0, 0.3);
  }
  /* a Sylver / Mk 41 style cell field: a plate with dark hatches */
  function cells(THREE, g, T, x0, nx, ny, px, py, z, yc) {
    var i, j, L = nx * px + 0.6, Wd = ny * py + 0.6; yc = yc || 0;
    box(THREE, g, L, Wd, 0.3, T.deck, x0 + L / 2 - 0.3, yc, z + 0.15);
    for (i = 0; i < nx; i++) for (j = 0; j < ny; j++)
      box(THREE, g, px * 0.8, py * 0.8, 0.04, T.dark, x0 + (i + 0.5) * px, yc + (j - (ny - 1) / 2) * py, z + 0.31);
  }
  /* a funnel: a raked chamfered stack with a dark cap */
  function funnel(THREE, g, T, x0, x1, hw, z0, z1, rake, yc) {
    var r = rake || 0;
    var lo = chamf(x0, x1, hw, (x1 - x0) * 0.3, (x1 - x0) * 0.25, yc), hi = chamf(x0 - r, x1 - r, hw * 0.85, (x1 - x0) * 0.3, (x1 - x0) * 0.25, yc);
    frustum(THREE, g, T.sup, lo, z0, hi, z1);
    var cap = chamf(x0 - r + 0.3, x1 - r - 0.3, hw * 0.7, (x1 - x0) * 0.25, (x1 - x0) * 0.2, yc);
    frustum(THREE, g, T.dark, cap, z1 - 0.05, cap, z1 + 0.15);
  }
  /* a ship's boat or RHIB on its davit */
  function boat(THREE, g, T, x, y, z, L) {
    var hw = L * 0.17;
    frustum(THREE, g, T.white, chamf(x - L / 2, x + L / 2, hw * 0.8, 0.2, L * 0.25), z, chamf(x - L / 2, x + L / 2, hw, 0.2, L * 0.3), z + 0.7);
    frustum(THREE, g, T.sup, chamf(x - L * 0.1, x + L * 0.2, hw * 0.6, 0.1, 0.2), z + 0.7, chamf(x - L * 0.05, x + L * 0.15, hw * 0.5, 0.1, 0.2), z + 1.3);
  }

  /* ---------------------------------------------------- gun mounts
     Each at rest pointing +X, origin on the ring at the deck. */
  /* the French 100 mm (modele 1968 / CADAM / TR): the faceted angular
     house of every photograph - flat sides, a sloped front, a flat roof */
  function gun100(THREE, g, T, stealth) {
    var L = 4.6, hw = 1.3, h = 2.3;
    cylZ(THREE, g, 1.25, 1.3, 0.35, 16, T.sup, -0.3, 0, 0.17);
    var lo = [[-L * 0.55, -hw], [L * 0.25, -hw], [L * 0.45, -hw * 0.55], [L * 0.45, hw * 0.55], [L * 0.25, hw], [-L * 0.55, hw]];
    var hi = [[-L * 0.5, -hw * (stealth ? 0.72 : 0.9)], [-L * 0.05, -hw * (stealth ? 0.72 : 0.9)], [L * 0.12, -hw * 0.45], [L * 0.12, hw * 0.45], [-L * 0.05, hw * (stealth ? 0.72 : 0.9)], [-L * 0.5, hw * (stealth ? 0.72 : 0.9)]];
    frustum(THREE, g, T.sup, lo, 0.35, hi, h);
    cylX(THREE, g, 0.2, 0.24, 0.9, 10, T.metal, L * 0.45 + 0.35, 0, 1.15);
    cylX(THREE, g, 0.08, 0.1, 5.4, 10, T.metal, L * 0.45 + 0.8 + 2.7, 0, 1.15, true);
    box(THREE, g, 1.0, 0.7, 0.04, T.team, -L * 0.25, 0, h + 0.02);
  }
  /* the Oto Melara 76 mm Super Rapid: the round cupola (stealth: the
     faceted cupola of the FREMM and Horizon) */
  function gun76(THREE, g, T, stealth) {
    cylZ(THREE, g, 1.4, 1.45, 0.4, 16, T.sup, 0, 0, 0.2);
    if (stealth) {
      var lo = [[-1.9, -1.5], [0.6, -1.5], [1.7, -0.7], [1.7, 0.7], [0.6, 1.5], [-1.9, 1.5]];
      var hi = [[-1.6, -1.0], [0.2, -1.0], [0.9, -0.45], [0.9, 0.45], [0.2, 1.0], [-1.6, 1.0]];
      frustum(THREE, g, T.sup, lo, 0.4, hi, 2.2);
    } else {
      var s = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 8, 0, PI * 2, 0, PI / 2), T.sup);
      s.rotation.x = PI / 2; s.scale.set(1.15, 1, 1.05); s.position.set(-0.2, 0, 0.4); g.add(s);
    }
    cylX(THREE, g, 0.07, 0.09, 4.7, 10, T.metal, 1.3 + 2.35, 0, 1.0, true);
    box(THREE, g, 0.9, 0.6, 0.04, T.team, -0.9, 0, stealth ? 2.22 : 2.07);
  }
  /* a 40 mm (Bofors L/60 / Breda) open mount with its shield */
  function gun40(THREE, g, T) {
    cylZ(THREE, g, 0.8, 0.9, 0.5, 12, T.sup, 0, 0, 0.25);
    frustum(THREE, g, T.sup, chamf(-1.0, 0.9, 0.85, 0.2, 0.3), 0.5, chamf(-0.9, 0.5, 0.7, 0.2, 0.3), 1.6);
    cylX(THREE, g, 0.05, 0.07, 2.8, 8, T.metal, 0.9 + 1.4, 0, 1.15, true);
    box(THREE, g, 0.6, 0.5, 0.04, T.team, -0.4, 0, 1.62);
  }
  /* a small remote / pintle cannon (20 mm Narwhal, 30 mm): a low box and a short barrel */
  function gun20(THREE, g, T) {
    cylZ(THREE, g, 0.45, 0.5, 0.5, 10, T.sup, 0, 0, 0.25);
    box(THREE, g, 1.0, 0.8, 0.7, T.sup, -0.1, 0, 0.85);
    cylX(THREE, g, 0.04, 0.05, 1.8, 8, T.metal, 0.4 + 0.9, 0, 0.9, true);
    box(THREE, g, 0.5, 0.4, 0.04, T.team, -0.2, 0, 1.22);
  }

  /* bake the hull, then the turret on its own, add the hidden pad marker */
  function finish(THREE, g, tw, pad) {
    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    if (tw) {
      var tb = bake(THREE, tw);
      tw.children.slice().forEach(function (c) { tw.remove(c); });
      tb.children.slice().forEach(function (c) { tw.add(c); });
      root.add(tw);
    }
    if (pad) {
      var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
      hp.position.set(pad[0], pad[1], pad[2]); root.add(hp);
    }
    return root;
  }
  /* ============================================== SMALL FITTINGS
     (rule 10: the fittings every photograph shows, merged per material)
     o.rails [[x0, x1]...] deck-edge rail runs (posts and two wires);
     o.roof [B...] blocks whose roof edge gets a rail; o.bollards [x...]
     a pair each side; o.hatches [[x, y, lx, ly]]; o.vents [[x, y]];
     o.rafts [[x0, x1, z, y]] canisters along a roof edge (both sides);
     o.anchor [x, z] hawse and anchor each side, windlass on deck at x;
     o.scuttles [[x0, x1, z, n]]; o.aerials [[x, y, z, h]]; o.ladders
     [[x, y, z0, z1]].  (The boot-topping band is in shell().) */
  function fittings(THREE, g, T, Hh, o) {
    var s, i;
    (o.rails || []).forEach(function (r) { Hh.railRun(THREE, g, T, r[0], r[1], 1.6, 1.0); });
    (o.roof || []).forEach(function (B) {
      var p = B.hi.concat([B.hi[0]]);
      roofRail(THREE, g, T, p, B.z1, 1.0);
    });
    (o.bollards || []).forEach(function (x) {
      for (s = -1; s <= 1; s += 2) {
        var y = s * (Hh.edgeY(x) - 0.55), z = Hh.deckZ(x);
        cylZ(THREE, g, 0.16, 0.18, 0.5, 8, T.metal, x - 0.3, y, z + 0.25);
        cylZ(THREE, g, 0.16, 0.18, 0.5, 8, T.metal, x + 0.3, y, z + 0.25);
        box(THREE, g, 1.0, 0.36, 0.08, T.metal, x, y, z + 0.04);
        box(THREE, g, 0.5, 0.25, 0.25, T.metal, x + 1.0, s * (Hh.edgeY(x) - 0.12), z + 0.12);     /* the fairlead */
      }
    });
    (o.hatches || []).forEach(function (h) {
      var z = Hh.deckZ(h[0]);
      box(THREE, g, h[2], h[3], 0.25, T.sup, h[0], h[1], z + 0.12);
      box(THREE, g, h[2] * 0.8, h[3] * 0.8, 0.04, T.dark, h[0], h[1], z + 0.26);
    });
    (o.vents || []).forEach(function (v) {
      var z = v[2] === undefined ? Hh.deckZ(v[0]) : v[2];
      cylZ(THREE, g, 0.2, 0.22, 0.9, 8, T.sup, v[0], v[1], z + 0.45);
      cylZ(THREE, g, 0.36, 0.3, 0.2, 8, T.sup, v[0], v[1], z + 1.0);
    });
    (o.rafts || []).forEach(function (r) {
      for (s = -1; s <= 1; s += 2) for (var x = r[0]; x <= r[1] + 1e-6; x += 1.5) {
        cylX(THREE, g, 0.3, 0.3, 1.3, 10, T.white, x, s * r[3], r[2] + 0.4);
        box(THREE, g, 1.3, 0.7, 0.08, T.metal, x, s * r[3], r[2] + 0.05);
      }
    });
    if (o.anchor) {
      var ax = o.anchor[0], az = o.anchor[1];
      for (s = -1; s <= 1; s += 2) {
        var ay = s * (Hh.W(ax, az) + 0.02);
        var hp = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.3, 12), T.dark); hp.position.set(ax, ay, az + 0.4); g.add(hp);
        box(THREE, g, 0.25, 0.25, 1.4, T.metal, ax + 0.1, s * (Hh.W(ax, az - 0.6) + 0.12), az - 0.4);
        box(THREE, g, 1.2, 0.25, 0.25, T.metal, ax + 0.1, s * (Hh.W(ax, az - 1.1) + 0.12), az - 1.1);
        var zd = Hh.deckZ(ax - 2.5);
        cylY(THREE, g, 0.35, 0.8, 10, T.metal, ax - 2.5, s * 0.9, zd + 0.45);
        strut(THREE, g, T.metal, ax - 2.5, s * 0.9, zd + 0.1, ax - 0.2, s * (Hh.edgeY(ax) - 0.4), Hh.deckZ(ax) + 0.05, 0.06, 4);
      }
    }
    (o.scuttles || []).forEach(function (q) {
      for (i = 0; i < q[3]; i++) {
        var x = q[0] + (q[1] - q[0]) * (q[3] > 1 ? i / (q[3] - 1) : 0.5);
        for (s = -1; s <= 1; s += 2) {
          var sc = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 10), T.dark);
          sc.position.set(x, s * (Hh.W(x, q[2]) + 0.02), q[2]); g.add(sc);
        }
      }
    });
    (o.aerials || []).forEach(function (a) { strut(THREE, g, T.metal, a[0], a[1], a[2], a[0], a[1], a[2] + a[3], 0.04, 4); });
    (o.ladders || []).forEach(function (l) {
      var n = Math.max(2, Math.round((l[3] - l[2]) / 0.3));
      strut(THREE, g, T.metal, l[0] - 0.25, l[1], l[2], l[0] - 0.25, l[1], l[3], 0.03, 3);
      strut(THREE, g, T.metal, l[0] + 0.25, l[1], l[2], l[0] + 0.25, l[1], l[3], 0.03, 3);
      for (i = 1; i < n; i++) box(THREE, g, 0.5, 0.04, 0.04, T.metal, l[0], l[1], l[2] + (l[3] - l[2]) * i / n);
    });
  }
  function cylY(THREE, p, r, len, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(r, r, len, seg, 1);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function turretAt(THREE, x, z) {
    var tw = new THREE.Group(); tw.name = "turret"; tw.position.set(x, 0, z); return tw;
  }

  /* the narrowest deck half-beam over x0..x1, less an inset: a block
     standing flush with the ship's side */
  function flushHW(Hh, x0, x1, inset) {
    var m = 99, x;
    for (x = x0; x <= x1 + 1e-6; x += Math.max(0.5, (x1 - x0) / 12)) m = Math.min(m, Hh.halfTop(x));
    return m - (inset || 0.15);
  }
  /* a dark panel (recess, door, louvre) on a leaning wall whose foot is
     at half width hw at z0 and leans in by ln per metre: x0..x1, za..zb */
  function sidePanel(THREE, g, m, x0, x1, za, zb, hw, z0, ln, side) {
    var zm = (za + zb) / 2, y = hw - ln * (zm - z0) + 0.04;
    var b = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.08, (zb - za) / Math.cos(Math.atan(ln))), m);
    b.position.set((x0 + x1) / 2, side * y, zm); b.rotation.x = side * Math.atan(ln); g.add(b); return b;
  }
  /* a hull, its deck and an aft pad, the shared start of every surface ship */
  function startShip(THREE, C, Ho, P) {
    var g = new THREE.Group(), T = makeMats(THREE, C, P), Hh = hullOf(Ho);
    Hh.shell(THREE, g, T, 40);
    return { g: g, T: T, Hh: Hh };
  }

  /* ================================================= FREMM AQUITAINE [F1]
     Stations off [F1] (starboard broadside, bow right, level): transom x
     103, stem head x 1565: 1462 px = the published 142.2 m, 10.28 px/m;
     X = (px - 834) / 10.28, Z = (604 - py) / 10.28 (waterline row 604).
       the flight deck 5.0 from the transom to the hangar's after wall at
       -48.5; the main deck 7.5 at the bridge rising to 8.2 at the stem;
       the stem at the waterline X 61.1, raked to the head at 71.1;
       the long block, hangar to bridge, -48.5..6.4, roof 13.2, its walls
       flush with the ship's side and leaning in; the recess in its side
       -22.8..-12.1 (z 3.8..11.3); the after upper block -24.7..-7.2 to
       16.3 with the step over it -24.2..-12.1 to 19.2 and the dome at
       -24.9; the mast's pyramid -7.7..0.1 at its foot to 31.0, the pole to
       49; the forward block 6.4..29.8 at the deck (25.4 at its roof, the
       front raked), roof 16.0, glazing 13.8..15.0; the pyramid on it
       9.3..16.1 to 24.5 and the dome at 18.1; the 76 mm at 46.0.
     NOT CONFIRMED: the plan of every block (side view only; the walls are
     drawn flush with the hull and leaning in 10 deg, as the 3/4 views of
     the class show), the Sylver field forward of the bridge (flush with the
     deck, not seen) and the Exocet between the masts (not seen in [F1]). */
  var HFREMM = { XS0: -71.1, XS1: 71.1, XWL: 61.1, B: 9.9, Bw: 9.3, T: 5.4, tw: 0.86, fine: 1.0, step: 2.0, bw0: 0.4,
                 sheer: [[-71.1, 5.0], [-48.6, 5.0], [-48.5, 7.5], [29.8, 7.5], [71.1, 8.2]] };
  function buildFREMM(THREE, M, C) {
    var S = startShip(THREE, C, HFREMM), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw1 = flushHW(Hh, -48.5, 29.8, 0.1), LN = 0.176;
    var B1 = block(THREE, g, T.sup, -48.5, 6.4, hw1, 5.0, 13.2, { lean: LN, cfa: 0.3, cff: 0.3, leanFwd: 0 });
    for (s = -1; s <= 1; s += 2) sidePanel(THREE, g, T.dark, -22.8, -12.1, 5.5, 11.3, hw1, 5.0, LN, s);
    facePatch(THREE, g, T.dark, B1.lo, B1.z0, B1.hi, B1.z1, 6, 0.15, 0.85, 5.05, 11.0, 0.05);     /* the hangar door */
    block(THREE, g, T.sup, -24.7, -7.2, hw1 - 2.4, 13.15, 16.3, { lean: LN, cfa: 0.6, cff: 0.6 });
    block(THREE, g, T.sup, -24.2, -12.1, hw1 - 3.6, 16.25, 19.2, { lean: 0.35, cfa: 0.5, cff: 0.5 });
    radome(THREE, g, T, 1.5, -24.9, 3.0, 13.2, 1.0);
    /* the integrated mast: the pyramid, its four array faces, the pole */
    var mp = block(THREE, g, T.sup, -7.7, 0.1, 3.6, 13.15, 31.0, { lean: 0.17, cfa: 0.8, cff: 0.8 });
    [0, 2, 4, 6].forEach(function (k) { facePatch(THREE, g, T.dark, mp.lo, mp.z0, mp.hi, mp.z1, k, 0.15, 0.85, 26.0, 29.6, 0.05); });
    pole(THREE, g, T, -3.8, 31.0, 49.0, 0.14, [[38.0, 1.6], [43.0, 1.0]]);
    /* the forward block, its raked front, glazing, the pyramid and dome */
    var B3 = block(THREE, g, T.sup, 6.4, 29.8, hw1, 7.5, 16.0, { lean: LN, leanAft: 0, leanFwd: 2.94, cfa: 0.3, cff: 1.2 });
    glazeFront(THREE, g, T, B3, 13.8, 15.0);
    block(THREE, g, T.sup, 9.3, 16.1, 3.2, 15.95, 24.5, { lean: 0.22, cfa: 0.6, cff: 0.6 });
    radome(THREE, g, T, 1.7, 18.6, -2.5, 16.0, 0.8);
    /* Sylver cells flush forward of the bridge; Exocet between the masts (NOT CONFIRMED) */
    cells(THREE, g, T, 31.5, 4, 4, 1.6, 1.6, 7.5);
    exocet(THREE, g, T, 3.2, 2.2, 13.2, 4, 0, 5.4); exocet(THREE, g, T, 3.2, -2.2, 13.2, 4, 0, 5.4);
    /* rails round the flight deck [F1]; a team strip on the pad and the mast block roof */
    Hh.railRun(THREE, g, T, -70.6, -49.0, 1.6, 1.1);
    box(THREE, g, 2.2, 1.2, 0.04, T.team, -66.0, 0, 5.03);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, -16.0, 0, 16.33);
    /* fittings [F1]: rails along the forecastle, bollards, the anchor, the
       whip aerials on the roofs, life rafts on the long block's roof edge */
    fittings(THREE, g, T, Hh, { rails: [[30.5, 70.4]], roof: [B3], bollards: [64.0, 52.0, -67.0, -55.0],
      hatches: [[57.0, 0, 1.4, 1.4], [-52.0, 3.0, 1.0, 1.0]], vents: [[40.5, 3.6], [40.5, -3.6], [-46.0, 4.6, 13.2], [-46.0, -4.6, 13.2]],
      rafts: [[-46.0, -36.0, 13.2, hw1 - 2.0]], anchor: [61.0, 5.6], scuttles: [[40.0, 58.0, 5.6, 6]],
      aerials: [[-40.0, 4.5, 13.2, 7.0], [-33.0, -4.5, 13.2, 6.0], [-30.0, 4.5, 13.2, 5.0], [18.6, 4.0, 16.0, 7.5], [23.9, -4.0, 16.0, 6.5]],
      ladders: [[-47.0, 0, 5.0, 13.2]] });
    var tw = turretAt(THREE, 46.0, Hh.deckZ(46.0)); gun76(THREE, tw, T, true);
    return finish(THREE, g, tw, [-60.0, 0, 5.0]);
  }

  /* ================================================ CHARLES DE GAULLE [G1-G3]
     Stations and heights off [G1] (starboard broadside, bow right, near
     level): deck front x 1455, deck end x 125 -> 1330 px = the published
     261.5 m LOA, 5.124 px/m (taken as 1340 px including the round-down's
     lip: 5.124); X = (px - 788) / 5.124, Z = (375 - py) / 5.124 (waterline
     row 377 at the bow, 372 at the stern).
       flight deck 15.6 (row 296) along its length, its fascia 1.2 deep;
       stem at the waterline X 118.6, deck front X 130.2, deck end -129.4,
       a vertical transom under it; the island's lower tier X 3.3..54.1 to
       24.4, its upper tier 11.1..44.3 to 33.6, the tower 26.7..33.6 to
       50.4 with its platform 14.1..39.4 (49.8-51.7), the lattice mast
       25.4..26.7 to 69.3, the dome on the platform (X 35.3, r 2.2), the big
       domes on the upper tier (X 18.3, r 2.5), the after tower 35.9..41.4
       to 44.6; the forward starboard sponson box X 60.9..80.4 (z 9.0 to the
       deck); the two openings in the starboard side at X -82.6..-66.9 and
       -19.0..-0.6 (the lifts, deck-edge, aft of the island [G1][G2]).
     PLAN (NOT CONFIRMED but for the published 64.36 m overall width): the
     narrow square bow, the straight starboard edge with the island on it,
     the angled deck's sponson out to port from abreast the island to the
     quarter, read off the 3/4 views [G2][G3]; the angled deck's axis at
     8.3 deg (published figure, painted into the deck texture). */
  /* the flight deck's overhang (rework round 2026-11-12): a band under
     the deck edge and the soffit that slopes from it back to the flared
     hull side, all round the plan poly (CCW) [G2][G3] */
  function overhang(THREE, g, m, Hh, poly, zTop, band, slope, zMin, step) {
    var pos = [], uv = [], i, j, n = poly.length, zb = zTop - band;
    function push(A, B, Cc, ox, oy, oz) {
      var ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2], vx = Cc[0] - A[0], vy = Cc[1] - A[1], vz = Cc[2] - A[2];
      var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
      if (cx * cx + cy * cy + cz * cz < 1e-8) return;
      var v = (cx * ox + cy * oy + cz * oz) >= 0 ? [A, B, Cc] : [A, Cc, B];
      v.forEach(function (P) { pos.push(P[0], P[1], P[2]); uv.push((P[0] + P[1]) / 12, P[2] / 8); });
    }
    function inner(P) {
      var s = P[1] < 0 ? -1 : 1, d = Math.abs(P[1]) - Hh.W(P[0], zb);
      if (d <= 0.05) return null;
      var zq = Math.max(zMin, zb - slope * d);
      return [P[0], s * Math.min(Math.abs(P[1]) - 0.05, Hh.W(P[0], zq)), zq];
    }
    for (i = 0; i < n; i++) {
      var a = poly[i], b = poly[(i + 1) % n], ex = b[0] - a[0], ey = b[1] - a[1], L = Math.hypot(ex, ey);
      if (L < 0.01) continue;
      var nx = ey / L, ny = -ex / L, ns = Math.max(1, Math.ceil(L / (step || 4)));
      for (j = 0; j < ns; j++) {
        var P0 = [a[0] + ex * j / ns, a[1] + ey * j / ns], P1 = [a[0] + ex * (j + 1) / ns, a[1] + ey * (j + 1) / ns];
        var A0 = [P0[0], P0[1], zTop], A1 = [P1[0], P1[1], zTop], B0 = [P0[0], P0[1], zb], B1 = [P1[0], P1[1], zb];
        push(A0, A1, B1, nx, ny, 0); push(A0, B1, B0, nx, ny, 0);
        var Q0 = inner(P0), Q1 = inner(P1);
        if (Q0 && Q1) { push(B0, B1, Q1, nx * 0.4, ny * 0.4, -1); push(B0, Q1, Q0, nx * 0.4, ny * 0.4, -1); }
        else if (Q0) push(B0, B1, Q0, nx * 0.4, ny * 0.4, -1);
        else if (Q1) push(B0, B1, Q1, nx * 0.4, ny * 0.4, -1);
      }
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); g.add(mm); return mm;
  }
  var CDG_FD = 15.6, CDG_FB = 13.4;
  var CDG_DECK = [
    [130.2, 11.5], [118.0, 15.0], [96.0, 17.5], [74.0, 19.0], [58.0, 26.0], [44.0, 36.5],
    [30.0, 39.8], [8.0, 39.8], [-30.0, 35.0], [-80.0, 28.0], [-112.0, 23.0], [-129.4, 18.0],
    [-129.4, -16.0], [-118.0, -19.5], [-100.0, -24.5], [-40.0, -24.5], [3.0, -24.5],
    [54.0, -24.5], [80.0, -23.5], [100.0, -21.0], [118.0, -17.0], [130.2, -12.0]
  ];
  var CDG_LIFTS = [[-85.6, -66.6], [-19.6, -0.6]];      /* X ranges, Y -12.0..-24.5 (19 x 12.5 m published) */
  function cdgDeckTex(THREE) {
    return canvasTex(THREE, "fnlFdeckCdG", 1024, 256, function (g, w, h) {
      function U(x) { return (x + 135) / 270 * w; }
      function V(y) { return (42 - y) / 84 * h; }
      var R = rng(9101), i;
      g.fillStyle = "#55595b"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.07;
      for (i = 0; i < 260; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 6 + R() * 30, 2 + R() * 6); }
      g.globalAlpha = 1;
      function line(x0, y0, x1, y1, col, lw) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.moveTo(U(x0), V(y0)); g.lineTo(U(x1), V(y1)); g.stroke(); }
      /* the angled deck: from the stern quarter at 8.3 deg to port [G2][G3] */
      var ca = Math.cos(8.3 * PI / 180), sa = Math.sin(8.3 * PI / 180);
      function la(s, o) { return [-128 + s * ca - o * sa, -4.0 + s * sa + o * ca]; }
      [-11, 11].forEach(function (o) { var a = la(2, o), b = la(190, o); line(a[0], a[1], b[0], b[1], "#d8d8d2", 2); });
      for (i = 0; i < 17; i++) { var a = la(8 + i * 11, 0), b = la(14 + i * 11, 0); line(a[0], a[1], b[0], b[1], "#e4e0d2", 2); }
      [40, 52, 64].forEach(function (sx) { var a = la(sx, -11), b = la(sx, 11); line(a[0], a[1], b[0], b[1], "#202020", 2.2); });
      /* the two catapult tracks: one in the bow, one in the waist [G2] */
      line(40, 2.0, 128, 2.0, "#2e3032", 1.6); line(-30, 26.0, 50, 33.0, "#2e3032", 1.6);
      for (i = 0; i < 12; i++) line(125 - i * 9, -6, 121 - i * 9, -6, "#d8d8d2", 1.5);
      g.strokeStyle = "#d0cec6"; g.lineWidth = 1.2; g.beginPath();
      CDG_DECK.forEach(function (p, k) { var xx = U(p[0] - Math.sign(p[0]) * 0.8), yy = V(p[1] - Math.sign(p[1]) * 0.8); if (k) g.lineTo(xx, yy); else g.moveTo(xx, yy); });
      g.closePath(); g.stroke();
    });
  }
  var HCDG = { XS0: -129.4, XS1: 126.0, XWL: 118.6, XST: -128.4, B: 17.6, Bw: 15.75, T: 9.43, tw: 0.86, fine: 0.6,
               fl: 2.0, stemP: 1.6, step: 5.0, sheer: [[-130, CDG_FB], [130, CDG_FB]], bw0: 0.62 };
  function buildCdG(THREE, M, C) {
    var g = new THREE.Group(), T = makeMats(THREE, C, { hull: 0x8f969a, sup: 0x9ea5a8, deck: 0x55595b }), Hh = hullOf(HCDG), s, i;
    T.fdeck = new THREE.MeshStandardMaterial({ color: 0xffffff, map: cdgDeckTex(THREE), roughness: 0.95, metalness: 0.04 });
    T.fdeck.userData = { _srgbDone: true };
    g.add(Hh.shellBand(THREE, T.under, -10.5, -0.25, 6));
    g.add(Hh.shellBand(THREE, T.tile, -0.25, 0.4, 1));
    g.add(Hh.shellBand(THREE, T.hull, 0.4, CDG_FB + 0.1, 7));
    Hh.transom(THREE, g, T.hull, T.under);
    g.add(Hh.deckSheet(THREE, T.dark, HCDG.XS0, HCDG.XS1));
    /* the flight deck slab, its top textured, its fascia and underside grey */
    var top = plate(THREE, g, T.fdeck, polyCCW(CDG_DECK), CDG_FD, CDG_FD - CDG_FB, T.sup);
    (function () {
      var pa = top.geometry.attributes.position, uv = [], k;
      for (k = 0; k < pa.count; k++) uv.push((pa.getX(k) + 135) / 270, (pa.getY(k) + 42) / 84);
      top.geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    })();
    /* the overhang: band and soffit back to the hull, the angled deck's
       sponson to port the deepest [G2][G3] (rework 2026-11-12: the slab
       deck used to float over a bare hull) */
    overhang(THREE, g, T.hull, Hh, polyCCW(CDG_DECK), CDG_FB, 1.4, 0.55, 5.5, 4.0);
    /* boat and gallery bays in the port sponson's face, the starboard
       sponsons' openings [G3] */
    [[-100, 26.0], [-78, 29.0], [-56, 32.3], [-34, 35.4], [-12, 38.7], [14, 39.95]].forEach(function (q, k) {
      box(THREE, g, 7.0, 0.14, 1.0, T.dark, q[0], q[1] + 0.1, CDG_FB - 0.75);
    });
    /* the gallery's dark band under the deck edge [G1] */
    for (s = -1; s <= 1; s += 2) for (i = -127; i < 100; i += 22.5) box(THREE, g, 22.1, 0.1, 1.1, T.dark, i + 11.25, s * (Hh.W(i + 11.25, CDG_FB) + 0.06), CDG_FB - 0.9);
    /* the lifts' openings in the starboard side and the lift plates [G1] */
    CDG_LIFTS.forEach(function (L) {
      box(THREE, g, L[1] - L[0], 1.2, 6.5, T.dark, (L[0] + L[1]) / 2, -(Hh.W((L[0] + L[1]) / 2, 8.0) + 0.06), 9.0);
      box(THREE, g, L[1] - L[0], 12.5, 0.06, T.deck, (L[0] + L[1]) / 2, -18.2, CDG_FD + 0.02);
    });
    /* the island on the starboard edge [G1]; plan width NOT CONFIRMED (12 m) */
    var YC = -18.4;
    var lowB = block(THREE, g, T.sup, 3.3, 54.1, 6.0, CDG_FD - 0.05, 24.4, { yc: YC, cfa: 1.0, cff: 2.5 });
    var upB = block(THREE, g, T.sup, 11.1, 44.3, 5.2, 24.35, 33.6, { yc: YC, cfa: 1.0, cff: 2.0 });
    glazeFront(THREE, g, T, upB, 31.6, 32.8);
    [0, 4].forEach(function (k) {
      facePatch(THREE, g, T.dark, upB.lo, upB.z0, upB.hi, upB.z1, k, 0.12, 0.9, 30.6, 31.3, 0.06);
      facePatch(THREE, g, T.dark, lowB.lo, lowB.z0, lowB.hi, lowB.z1, k, 0.1, 0.9, 21.8, 22.6, 0.06);
    });
    /* window and door rows on the island's decks [G1][G2] (rework
       2026-11-12: the tiers were blank) */
    [0, 4].forEach(function (k) {
      [[0.06, 0.12], [0.18, 0.22], [0.3, 0.36], [0.46, 0.5], [0.62, 0.68], [0.78, 0.82]].forEach(function (w) {
        facePatch(THREE, g, T.dark, lowB.lo, lowB.z0, lowB.hi, lowB.z1, k, w[0], w[1], 16.0, 18.4, 0.06);
      });
      for (var wi = 0; wi < 9; wi++) facePatch(THREE, g, T.glass, lowB.lo, lowB.z0, lowB.hi, lowB.z1, k, 0.08 + wi * 0.095, 0.13 + wi * 0.095, 19.4, 20.4, 0.06);
      for (wi = 0; wi < 7; wi++) facePatch(THREE, g, T.glass, upB.lo, upB.z0, upB.hi, upB.z1, k, 0.1 + wi * 0.115, 0.17 + wi * 0.115, 26.0, 27.0, 0.06);
      for (wi = 0; wi < 7; wi++) facePatch(THREE, g, T.glass, upB.lo, upB.z0, upB.hi, upB.z1, k, 0.1 + wi * 0.115, 0.17 + wi * 0.115, 28.4, 29.4, 0.06);
    });
    [2, 6].forEach(function (k) { facePatch(THREE, g, T.glass, lowB.lo, lowB.z0, lowB.hi, lowB.z1, k, 0.1, 0.9, 19.4, 20.4, 0.06); });
    glazeFront(THREE, g, T, lowB, 22.9, 23.8);
    /* the deck-level galleries round the island's tiers */
    box(THREE, g, 52.0, 12.8, 0.25, T.sup, 28.7, YC, 24.5);
    box(THREE, g, 36.0, 11.6, 0.3, T.sup, 27.7, YC, 33.75);                       /* the catwalk deck round the upper tier */
    block(THREE, g, T.sup, 26.7, 33.6, 2.4, 33.6, 49.9, { yc: YC, cfa: 0.6, cff: 0.6 });
    box(THREE, g, 25.3, 9.0, 1.9, T.sup, 26.75, YC, 50.75);                       /* the platform */
    /* the lattice mast on the island's platform (it was drawn on the
       centreline, clear of the island: fixed 2026-11-12) */
    var lm = new THREE.Group(); lm.position.y = YC; g.add(lm);
    lattice(THREE, lm, T, 26.0, 51.7, 69.3, 1.6, 0.4);
    box(THREE, g, 0.15, 6.0, 0.15, T.metal, 26.0, YC + 0, 60.0);
    radome(THREE, g, T, 2.2, 35.3, YC, 51.7, 0.4);
    radome(THREE, g, T, 2.5, 18.3, YC + 2.0, 33.6, 1.2);
    radome(THREE, g, T, 1.4, 41.0, YC - 2.6, 33.6, 1.0);
    block(THREE, g, T.sup, 35.9, 41.4, 2.2, 33.6, 44.6, { yc: YC - 1.0, cfa: 0.4, cff: 0.4 });
    array(THREE, g, T, 38.6, YC - 1.0, 44.6, 5.0, 1.6);                           /* the DRBJ 11B face on the after tower */
    array(THREE, g, T, 16.0, YC, 51.7, 7.0, 1.2);                                  /* the DRBV 26D on the platform's fore end */
    /* the forward starboard sponson box [G1] and its port mirror (NOT
       CONFIRMED: the port one is seen in [G2] only end on) with the cells */
    for (s = -1; s <= 1; s += 2) {
      var yo = s * (Hh.W(70, CDG_FB) + 3.2);
      box(THREE, g, 19.5, 6.4, 6.0, T.sup, 70.6, yo, 12.0);
      cells(THREE, g, T, 63.0, 4, 2, 1.4, 1.4, 15.0, yo);
    }
    /* four shafts' worth of stern gear is not seen; two shafts, two screws (published: two) */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.5, 0.5, 26.0, 8, T.metal, -102.0, s * 7.0, -6.5);
      cylX(THREE, g, 0.7, 0.9, 1.4, 8, T.metal, -115.7, s * 7.0, -6.5);
      for (i = 0; i < 5; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, 2.6), T.metal);
        bl.position.set(-115.7, s * 7.0, -6.5); bl.rotation.x = i * 2 * PI / 5 + 0.4;
        bl.translateZ(1.6); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 5.0, 0.6, 6.0, T.metal, -121.0, s * 7.0, -5.0);
    }
    /* fittings [G1][G2]: the catwalk rails all round just under the deck
       edge (nothing above the deck: aircraft park on it), life-raft
       canisters along the galleries, the anchors and hawse in the bow,
       scuttles, whip aerials and rails on the island */
    var ring = CDG_DECK.map(function (p) { return [p[0] + Math.sign(p[0]) * 0.4, p[1] + Math.sign(p[1]) * 0.9]; });
    roofRail(THREE, g, T, ring.concat([ring[0]]), CDG_FD - 1.7, 1.0);
    for (s = -1; s <= 1; s += 2) for (i = -110; i <= -30; i += 4) {
      cylX(THREE, g, 0.3, 0.3, 1.3, 10, T.white, i, s * (Hh.W(i, CDG_FB - 2.4) + 0.5), CDG_FB - 2.4);
    }
    fittings(THREE, g, T, Hh, { anchor: [112.0, 9.0], scuttles: [[-110.0, 100.0, 6.5, 40], [60.0, 110.0, 9.5, 10]] });
    roofRail(THREE, g, T, upB.hi.concat([upB.hi[0]]), 33.9, 1.0);
    roofRail(THREE, g, T, lowB.hi.concat([lowB.hi[0]]), 24.4, 1.0);
    [[8.0, -13.5, 24.4, 6.0], [50.0, -13.5, 24.4, 7.0], [14.0, -23.0, 33.9, 5.0], [42.0, -23.0, 33.9, 6.0]].forEach(function (a) {
      strut(THREE, g, T.metal, a[0], a[1], a[2], a[0], a[1], a[2] + a[3], 0.05, 4);
    });
    /* team strips on the island roofs */
    box(THREE, g, 3.0, 1.4, 0.05, T.team, 8.0, YC, 24.43);
    box(THREE, g, 3.0, 1.4, 0.05, T.team, 50.0, YC, 24.43);
    box(THREE, g, 2.4, 1.2, 0.05, T.team, 40.0, YC, 33.93);
    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  /* ====================================================== SUBMARINES
     One builder for the five boats, after build094 in pla_navy_modern.js:
     the hull a loft of sections read column by column off each class's
     profile drawing (rows [x, top z, keel z] at the surfaced trim, the
     waterline z = 0 taken at the drawing's boot line or the photograph's
     waterline); the section a round lower half under a superellipse upper
     half (NOT CONFIRMED: no boat is seen end-on); the beam capped at the
     published half beam.  S: { prof, B, sail: [x0, x1, top, hw, foot0,
     foot1], sp: sail planes [x0, x1, z, span] or null, bp: bow planes
     [x0, x1, z, span] or null, stern: "cross" | "x", rud: [[x0, x1, z0,
     z1] upper, lower], spl: stern planes [x0, x1, z, span], jet: pump-jet
     [x, r, len] or null, screw: [x, z, r, n], hump: [x0, x1] or null,
     hatches: [x0, pitch, n, y] or null, masts: [[x, h, r]...] } */
  function subRow(P, x) {
    var i;
    if (x <= P[0][0]) return P[0];
    for (i = 1; i < P.length; i++) if (x <= P[i][0]) {
      var a = P[i - 1], b = P[i], f = (x - a[0]) / (b[0] - a[0]);
      return [x, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
    }
    return P[P.length - 1];
  }
  function subSec(S, x) {
    var r = subRow(S.prof, x), top = r[1], kz = r[2], d = top - kz;
    var hl = Math.min(S.rl || 99, d / 2), zc = kz + hl, hu = top - zc;
    var w = Math.min(S.B, hl * 1.02), n = hu > hl * 1.15 ? 2.8 : 2.0;
    return { zc: zc, hl: hl, hu: hu, w: Math.max(0.05, w), n: n };
  }
  function subY(S, x, z) {
    var q = subSec(S, x), t;
    if (z >= q.zc) { t = (z - q.zc) / q.hu; if (t >= 1) return 0; return q.w * Math.pow(1 - Math.pow(t, q.n), 1 / q.n); }
    t = (q.zc - z) / q.hl; if (t >= 1) return 0; return q.w * Math.sqrt(1 - t * t);
  }
  function extr(THREE, g, m, pts, th, plane, off) {
    var sh = new THREE.Shape(); sh.moveTo(pts[0][0], pts[0][1]);
    for (var k = 1; k < pts.length; k++) sh.lineTo(pts[k][0], pts[k][1]);
    var fg = new THREE.ExtrudeGeometry(sh, { depth: th, bevelEnabled: false });
    fg.translate(0, 0, -th / 2);
    if (plane === "xz") fg.rotateX(PI / 2);       /* pts are [x, z]; thickness along y */
    if (off) fg.translate(off[0], off[1], off[2]);
    var me = new THREE.Mesh(fg, m); g.add(me); return me;
  }
  function buildSub(THREE, M, C, S) {
    var g = new THREE.Group(), T = makeMats(THREE, C), s, i, x;
    var P = S.prof, X0 = P[0][0], X1 = P[P.length - 1][0], NR = 28, xs = [];
    for (x = X0; x < X1; x += (x > X1 - 8 || x < X0 + 8 ? 0.6 : 1.8)) xs.push(x);
    P.forEach(function (r) { xs.push(r[0]); }); xs.push(X1);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.15; });
    var full = xs.map(function (xx) {
      var q = subSec(S, xx), o = [], k;
      for (k = 0; k < NR * 2; k++) {
        var a = -PI / 2 + 2 * PI * k / (NR * 2), c = Math.cos(a), sn = Math.sin(a), y, z;
        if (sn >= 0) { y = q.w * Math.sign(c) * Math.pow(Math.abs(c), 2 / q.n); z = q.zc + q.hu * Math.pow(sn, 2 / q.n); }
        else { y = q.w * c; z = q.zc + q.hl * sn; }
        o.push([y, z]);
      }
      return o;
    });
    var hullM = ringLoft(THREE, new THREE.Group(), T.tile, xs, full, true, 0.12);
    (function split() {
      var geo = hullM.geometry.toNonIndexed(), Pa = geo.attributes.position.array, U = geo.attributes.uv.array;
      var A = { p: [], u: [] }, B = { p: [], u: [] }, f, k;
      for (f = 0; f < Pa.length / 9; f++) {
        var zm = (Pa[f * 9 + 2] + Pa[f * 9 + 5] + Pa[f * 9 + 8]) / 3, D = zm >= -0.15 ? A : B;
        for (k = 0; k < 9; k++) D.p.push(Pa[f * 9 + k]);
        for (k = 0; k < 6; k++) D.u.push(U[f * 6 + k]);
      }
      g.add(new THREE.Mesh(geoOf(THREE, A.p, A.u), T.tile));
      g.add(new THREE.Mesh(geoOf(THREE, B.p, B.u), S.redBottom ? T.under : T.tile));
    })();
    /* the sail: a rounded-nose plan, straight sides, a tapered tail */
    var sl = S.sail;
    function sailPlan(x0, x1, hw) {
      var o = [], k;
      for (k = 0; k <= 8; k++) { var a = -PI / 2 + PI * k / 8; o.push([x1 - hw * 1.5 + hw * 1.5 * Math.cos(a), hw * Math.sin(a)]); }
      o.push([x0 + (x1 - x0) * 0.25, hw * 0.92]); o.push([x0, hw * 0.3]); o.push([x0, -hw * 0.3]); o.push([x0 + (x1 - x0) * 0.25, -hw * 0.92]);
      return polyCCW(o.map(function (p) { return [p[0], -p[1]]; }));
    }
    var zf = subRow(P, (sl[0] + sl[1]) / 2)[1] - 0.6;
    frustum(THREE, g, T.tile, sailPlan(sl[4], sl[5], sl[3] * 1.35), zf, sailPlan(sl[0], sl[1], sl[3]), zf + 1.4);
    frustum(THREE, g, T.tile, sailPlan(sl[0], sl[1], sl[3]), zf + 1.35, sailPlan(sl[0] + (sl[6] || 0), sl[1] - (sl[7] || 0), sl[3] * 0.94), sl[2]);
    if (S.sp) for (s = -1; s <= 1; s += 2) {
      var sp = S.sp;
      extr(THREE, g, T.tile, [[sp[0], 0], [sp[1], 0], [sp[1] - (sp[1] - sp[0]) * 0.2, s * sp[3]], [sp[0] + 0.3, s * sp[3]]], 0.22, null, [0, s * sl[3] * 0.9, sp[2]]);
    }
    if (S.bp) for (s = -1; s <= 1; s += 2) {
      var bp = S.bp;
      extr(THREE, g, T.tile, [[bp[0], 0], [bp[1], 0], [bp[1] - 0.4, s * bp[3]], [bp[0] + 0.3, s * bp[3]]], 0.22, null, [0, s * subY(S, (bp[0] + bp[1]) / 2, bp[2]) * 0.92, bp[2]]);
    }
    /* masts housed in the sail top, a few raised [photographs] */
    (S.masts || []).forEach(function (mm) { strut(THREE, g, T.tile, mm[0], 0, sl[2], mm[0], 0, sl[2] + mm[1], mm[2], 8); });
    box(THREE, g, (sl[1] - sl[0]) * 0.25, sl[3] * 0.9, 0.05, T.dark, sl[1] - (sl[1] - sl[0]) * 0.2, 0, sl[2] + 0.02);
    /* the missile deck hump and its hatches (SSBN) */
    if (S.hatches) {
      var hh = S.hatches;
      for (i = 0; i < hh[2]; i++) for (s = -1; s <= 1; s += 2) {
        x = hh[0] + i * hh[1];
        var zt = subRow(P, x)[1];
        cylZ(THREE, g, hh[4] * 1.1, hh[4] * 1.1, 0.06, 16, T.dark, x, s * hh[3], zt + 0.01);
        cylZ(THREE, g, hh[4], hh[4], 0.1, 16, T.tile, x, s * hh[3], zt + 0.04);
      }
    }
    /* the stern: a cross (upper and lower rudders, horizontal planes) or an X [drawings] */
    var rr = S.rud, spl = S.spl;
    if (S.stern === "x") {
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) {
        var fin = new THREE.Group(); fin.position.set(0, 0, spl[2]); fin.rotation.x = Math.atan2(q[1], q[0]) - PI / 2; g.add(fin);
        extr(THREE, fin, q[1] > 0 ? T.tile : T.tile, [[spl[0], 0], [spl[1], 0], [spl[1] - (spl[1] - spl[0]) * 0.45, spl[3]], [spl[0] + 0.2, spl[3]]], 0.4, "xz");
      });
    } else {
      extr(THREE, g, T.tile, [[rr[0][0], rr[0][2]], [rr[0][1], rr[0][2]], [rr[0][1] - (rr[0][1] - rr[0][0]) * 0.3, rr[0][3]], [rr[0][0] + 0.2, rr[0][3]]], 0.4, "xz");
      extr(THREE, g, T.tile, [[rr[1][0], rr[1][2]], [rr[1][1], rr[1][2]], [rr[1][1] - (rr[1][1] - rr[1][0]) * 0.3, rr[1][3]], [rr[1][0] + 0.2, rr[1][3]]], 0.4, "xz");
      for (s = -1; s <= 1; s += 2)
        extr(THREE, g, T.tile, [[spl[0], 0], [spl[1], 0], [spl[1] - (spl[1] - spl[0]) * 0.35, s * spl[3]], [spl[0] + 0.2, s * spl[3]]], 0.35, null, [0, 0, spl[2]]);
    }
    if (S.jet) {
      /* the pump-jet shroud [drawing] */
      cylX(THREE, g, S.jet[1] * 0.92, S.jet[1], S.jet[2], 16, T.tile, S.jet[0], 0, S.jet[3], true);
      cylZ(THREE, g, 0.01, 0.01, 0.01, 3, T.tile, S.jet[0], 0, S.jet[3]);
      cylX(THREE, g, 0.3, S.jet[1] * 0.6, S.jet[2] * 0.8, 10, T.metal, S.jet[0] + 0.2, 0, S.jet[3]);
      if (S.tip !== undefined) cylX(THREE, g, 0.6, 0.05, S.jet[0] - S.tip, 10, T.tile, (S.jet[0] + S.tip) / 2, 0, S.jet[3]);
    } else if (S.screw) {
      var sc = S.screw;
      cylX(THREE, g, 0.2, 0.45, 1.0, 10, T.metal, sc[0], 0, sc[1]);
      for (i = 0; i < sc[3]; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, sc[2] * 0.42, sc[2] * 0.8), T.metal);
        bl.position.set(sc[0], 0, sc[1]); bl.rotation.x = i * 2 * PI / sc[3]; bl.translateZ(sc[2] * 0.5); bl.rotation.y = 0.5; g.add(bl);
      }
    }
    /* fittings on the casing (rule 10; the photographs [R3][T2] show the
       flush hatches, the cleats and the safety track; places NOT
       CONFIRMED): hatch rings fore and aft of the sail, two pairs of
       cleats, the track along the casing's crown, the sail's ladder rungs */
    var XA = P[0][0], XB = P[P.length - 1][0], Lh = XB - XA;
    [0.22, 0.38, 0.78, 0.86].forEach(function (f) {
      x = XA + Lh * f; var zt = subRow(P, x)[1];
      cylZ(THREE, g, 0.45, 0.45, 0.05, 14, T.dark, x, 0, zt + 0.01);
      cylZ(THREE, g, 0.38, 0.38, 0.06, 14, T.tile, x, 0, zt + 0.03);
    });
    [0.3, 0.83].forEach(function (f) {
      x = XA + Lh * f; var zt = subRow(P, x)[1];
      for (s = -1; s <= 1; s += 2) { box(THREE, g, 0.6, 0.18, 0.2, T.metal, x, s * 0.9, zt + 0.05); box(THREE, g, 0.6, 0.18, 0.2, T.metal, x + 1.2, s * 0.9, zt + 0.05); }
    });
    for (x = XA + Lh * 0.15; x < XA + Lh * 0.92; x += 1.0) box(THREE, g, 1.0, 0.12, 0.03, T.metal, x, 0.0, subRow(P, x)[1] + 0.02);
    for (i = 0; i < 8; i++) box(THREE, g, 0.04, 0.5, 0.04, T.metal, sl[1] - 0.6, 0, zf + 1.6 + i * (sl[2] - zf - 2.0) / 8);
    /* team: two small strips, the sail top and the casing abaft it */
    box(THREE, g, Math.min(2.4, (sl[1] - sl[0]) * 0.3), sl[3] * 0.8, 0.04, T.team, sl[0] + (sl[1] - sl[0]) * 0.35, 0, sl[2] + 0.03);
    x = sl[0] - 6; box(THREE, g, 2.4, 0.8, 0.04, T.team, x, 0, subRow(P, x)[1] + 0.03);
    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  /* drawing pixels to model metres: X = (px - p0) / k + X0, Z = (keel - py) / k - T */
  function pxSub(D) {
    function X(p) { return (p - D.p0) / D.k + D.X0; }
    function Z(p) { return (D.keel - p) / D.k - D.T; }
    var S = { B: D.B, rl: D.rl, stern: D.stern, redBottom: false };
    S.prof = D.rows.map(function (r) { return [X(r[0]), Z(r[1]), Z(r[2])]; });
    var s = D.sail;          /* [aft foot px, fwd foot px, aft at shoulder, fwd at shoulder, aft top, fwd top, top py, hw m] */
    S.sail = [X(s[2]), X(s[3]), Z(s[6]), s[7], X(s[0]), X(s[1]), X(s[4]) - X(s[2]), X(s[3]) - X(s[5])];
    if (D.sp) S.sp = [X(D.sp[0]), X(D.sp[1]), Z(D.sp[2]), D.sp[3]];
    if (D.rud) S.rud = D.rud.map(function (r) { return [X(r[0]), X(r[1]), Z(r[2]), Z(r[3])]; });
    if (D.spl) S.spl = [X(D.spl[0]), X(D.spl[1]), Z(D.spl[2]), D.spl[3]];
    if (D.jet) S.jet = [X(D.jet[0]), D.jet[1] / D.k, D.jet[2] / D.k, Z(D.jet[3])];
    if (D.tip !== undefined) S.tip = X(D.tip);
    if (D.screw) S.screw = [X(D.screw[0]), Z(D.screw[1]), D.screw[2] / D.k, D.screw[3]];
    if (D.masts) S.masts = D.masts.map(function (m) { return [X(m[0]), m[1], m[2]]; });
    if (D.hatches) S.hatches = [X(D.hatches[0]), D.hatches[1], D.hatches[2], D.hatches[3], D.hatches[4]];
    S.len = X(D.rows[D.rows.length - 1][0]) - Math.min(X(D.rows[0][0]), S.tip !== undefined ? S.tip : S.jet ? S.jet[0] - S.jet[2] / 2 : 1e9, S.screw ? S.screw[0] - 0.5 : 1e9);
    return S;
  }

  /* ---------------------------------------------- SUFFREN (Barracuda) [U1]
     [U1] "Suffren class SSN.svg" (en.wikipedia profile, 1600 px): pump-jet
     tail x 0 to bow x 1600 = the published 99.5 m, 16.08 px/m; the keel row
     352 (the drawing's lower edge), the waterline set at the published
     7.3 m draught above it: X = px / 16.08 - 49.75, Z = (352 - py) / 16.08
     - 7.3.  Hull top and keel read column by column; the casing 2.1 m
     out of the water amidships; the sail 9.6..27.6 at its foot, 12.7..24.2
     at its top (8.5 m), its swept trailing edge and the fillet at its
     forward foot; three masts raised (to 14.3); the X stern (fins to 6.1 m
     off the axis, from the 4.3 m they show in profile at 45 deg); the
     pump-jet shroud -47.2..-44.4, radius 2.3.  NOT CONFIRMED: the sail's
     width (3.0 m), every section (beam capped at the published 8.8 m). */
  var D_SUFFREN = { k: 16.08, p0: 0, X0: -49.75, keel: 352, T: 7.3, B: 4.4, rl: 4.4, stern: "x",
    rows: [[88, 262, 302], [120, 247, 318], [160, 227, 337], [180, 220, 344], [200, 215, 348], [240, 207, 352], [300, 201, 352],
           [320, 200, 352], [940, 200, 352], [1260, 200, 352], [1360, 201, 352], [1400, 203, 352], [1440, 207, 352], [1480, 213, 352],
           [1500, 218, 351], [1520, 223, 351], [1540, 229, 348], [1560, 237, 342], [1580, 250, 330], [1590, 262, 318], [1598, 280, 300]],
    sail: [955, 1245, 965, 1210, 1005, 1190, 97, 1.5],
    spl: [100, 155, 282, 6.1 * 16.1 / 16.1], jet: [62, 37, 45, 282], tip: 2,
    masts: [[1048, 3.0, 0.35], [1110, 5.7, 0.3], [1127, 5.7, 0.22]] };

  /* ------------------------------------------- LE TRIOMPHANT (SNLE-NG) [T1]
     [T1] "Triomphant class SSBN.svg" (en.wikipedia silhouette, 1600 px):
     shroud x 0 to bow x 1597 = the published 138 m, 11.57 px/m; keel row
     254, the waterline at the published 10.6 m draught above it.  The
     hull, the slight rise of the missile section (top 3.6 m), the sail
     22.6..39.0 at its foot and 23.9..36.3 at its top (11.0 m), its
     vertical front and swept back edge, the fillet at its forward foot;
     the cruciform stern -59.7..-56.2 (upper fin to 4.0, lower to -9.9);
     the pump-jet shroud -68.6..-63.4 (radius 3.4).
     [T2] "Temeraire1048.jpg" (Le Temeraire, the same class, surfaced, from
     astern and above): the sail planes high on the sail (about 2.2 m
     under its top), each reaching out about 7.5 m - 1.5 beams tip to tip;
     the casing smooth abaft the sail.  NOT DRAWN: the sixteen tube hatches
     (neither reference shows them; they lie flush).  NOT CONFIRMED: the
     sail's width (4.0 m), the sail planes' chord and station (X 29.5..33.5)
     and span, the horizontal stern planes' span (7.5 m), the sections
     (beam capped at the published 12.5 m). */
  var D_TRIOMPHANT = { k: 11.57, p0: 0, X0: -69.0, keel: 254, T: 10.6, B: 6.25, rl: 6.25, stern: "cross",
    rows: [[68, 152, 201], [100, 145, 208], [150, 133, 218], [200, 124, 227], [250, 116, 235], [300, 109, 242], [350, 103, 246],
           [400, 98, 249], [450, 95, 249], [500, 92, 250], [600, 90, 250], [800, 91, 251], [1000, 91, 253], [1050, 92, 253],
           [1250, 95, 254], [1300, 100, 254], [1350, 103, 253], [1400, 107, 250], [1450, 111, 245], [1500, 117, 237],
           [1550, 133, 223], [1575, 146, 210], [1590, 160, 195], [1597, 172, 181]],
    sail: [1060, 1250, 1062, 1228, 1075, 1218, 4, 2.0], sp: [1140, 1186, 30, 7.5],
    rud: [[108, 148, 150, 85], [108, 148, 205, 246]], spl: [108, 148, 177, 7.5], jet: [35, 39, 60, 177],
    masts: [[1150, 2.5, 0.35], [1185, 3.2, 0.25]] };

  /* -------------------------------------------- RUBIS / AMETHYSTE [R1][R2]
     [R1] "Rubis class submarine.svg" (en.wikipedia, 1600 px): the boat as
     built, the rounded bow; [R2] "Rubis class submarine-2.svg": the same
     boat after the Amethyste refit, the blunter, fuller bow of the new
     sonar.  Screw x 68 to bow x 1501 (R1) / 1497 (R2), drawn at one size,
     so each is scaled to its own published length: 72.1 m (19.88 px/m)
     and 73.6 m (19.42 px/m).  Keel row 532, the waterline at the
     published 6.4 m draught.  The casing 1.7 m out of the water; the sail
     X(978..1192 px) with its swept back edge and top at row 257; the sail
     plane in its forward half (row 302, its span 2.2 m NOT CONFIRMED); the
     cruciform stern (rudders rows 380..536, planes edge-on at the shaft
     row 459, span NOT CONFIRMED 4.0 m); the screw (radius 1.6 m, five
     blades NOT CONFIRMED - the drawing shows two). */
  function D_RUBIS(ame) {
    var k = ame ? 19.42 : 19.88, L = ame ? 73.6 : 72.1;
    var fwd = ame ? [[1300, 374, 530], [1360, 376, 529], [1420, 379, 528], [1480, 381, 526], [1486, 387, 519], [1490, 395, 510],
                     [1494, 410, 493], [1497, 440, 462]]
                  : [[1300, 376, 530], [1360, 382, 529], [1400, 388, 526], [1440, 398, 517], [1470, 411, 505], [1490, 425, 490],
                     [1501, 450, 466]];
    return { k: k, p0: 68, X0: -L / 2, keel: 532, T: 6.4, B: 3.8, rl: 3.8, stern: "cross",
      rows: [[110, 445, 474], [200, 417, 499], [260, 412, 509], [300, 405, 516], [360, 396, 525], [420, 389, 530], [480, 383, 532],
             [540, 379, 532], [600, 375, 532], [700, 372, 531], [800, 371, 531], [960, 372, 531], [1220, 373, 530]].concat(fwd),
      sail: [976, 1194, 980, 1192, 1000, 1186, 257, 1.4],
      sp: [1128, 1180, 302, 2.2],
      rud: [[120, 185, 420, 380], [120, 185, 500, 536]], spl: [120, 185, 459, 4.0],
      screw: [76, 459, 31, 5], masts: [] };
  }
  /* ------------------------------------------------------ AGOSTA [G1][G2]
     [G1] "OuessantBrest2005.jpg" (Commons, 750 px): Ouessant, the same
     class, surfaced, PORT broadside, bow left.  Bow x 35, upper rudder's
     after edge x 730: 695 px = the published 67 m (en.wikipedia), 10.37
     px/m; X = (382.5 - px) / 10.37, Z = (312 - py) / 10.37 (her
     waterline).  The casing 2.1 m out of the water, sloping down to the
     bow from 27 m and to the stern from -15 m; the tall sail 6.5..16.6 to
     10.9 with its upright front; two masts raised; the bow planes low on
     the bow; the upper rudder standing clear of the water well abaft the
     casing's end (-30.5..-33.5).  [G2] "AgostaRouen1994.jpg" (Agosta
     herself alongside at Rouen, starboard): the same sail and casing.
     NOT CONFIRMED: everything under the water - the keel at -4.8 (the
     published 6 m beam plus the casing; Agosta's draught is not on the
     page read), the lower rudder, the stern planes' span, the screw. */
  var S_AGOSTA = { B: 3.0, rl: 3.0, stern: "cross", redBottom: false,
    prof: [[-31.2, -1.3, -2.6], [-29.0, -0.5, -2.9], [-25.0, 0.6, -3.6], [-20.0, 1.7, -4.4], [-15.0, 2.1, -4.8],
           [20.0, 2.1, -4.8], [27.0, 2.0, -4.8], [30.5, 1.6, -4.5], [32.5, 0.6, -3.8], [33.5, -1.0, -2.6]],
    sail: [6.6, 16.5, 10.9, 1.4, 6.2, 17.2, 0.4, 0.2],
    bp: [29.3, 31.3, 0.6, 2.2],
    rud: [[-33.5, -30.5, -0.8, 2.1], [-33.3, -30.5, -2.8, -6.2]], spl: [-33.0, -30.6, -1.95, 3.6],
    screw: [-33.0, -1.95, 1.5, 5], masts: [[14.0, 1.8, 0.3], [12.6, 3.0, 0.12]] };
  var SUBS = {};
  function subOf(name, D) {
    return function (THREE, M, C) { var S = SUBS[name] || (SUBS[name] = pxSub(D)); return buildSub(THREE, M, C, S); };
  }
  function buildAgosta(THREE, M, C) { return buildSub(THREE, M, C, S_AGOSTA); }
  var buildSuffren = subOf("suffren", D_SUFFREN);
  var buildTriomphant = subOf("triomphant", D_TRIOMPHANT);
  var buildRubis = subOf("rubis", D_RUBIS(false));
  /* --------------------------------- AMETHYSTE, REWORK 2026-11-12 [R2][R3]
     The owner's review found the Amethyste a plain tube.  Re-lofted on
     the submarine kit of js/hero/fr_navy_early.js (HeroFrSubKit: a round
     pressure hull with the casing standing on its back, sloped sides from
     a knuckle to a flat top with rounded shoulders, two smooth skins).
     [R2]'s rows are kept (D_RUBIS(true) above).  New off [R2], by a pixel
     scan: the casing's side panel, the knuckle at row 422-423 (z -0.76)
     from px 500 to 1410, dipping to rows 425 / 427.5 at px 400 / 380 and
     424.5 at 1420; the panel's ends upright at px 373 (X -21.1) and 1430
     (X 33.3).  [R3] "amethyste.jpg" (the boat alongside, from the port
     bow): the casing's flat top about two thirds of the beam (half width
     2.5 drawn), its shoulders rounded, the sail's rounded front, the sail
     planes high on its forward half, the window ring at the sail top, the
     plain black steel (no tiles seen: steel finish), hatches and cleats
     on the casing by the sail.  NOT CONFIRMED: the casing's top width and
     the slope of its sides (no end view); the free-flood row low on the
     casing's side (not resolved in [R3]); the torpedo shutters' places;
     every section below the knuckle (the circle of the published beam).
     Falls back to the earlier builder if fr_navy_early.js is not loaded. */
  function buildAmethyste2(THREE, M, C) {
    var K = HeroFrSubKit, D = D_RUBIS(true), s, i, x;
    function X(p) { return (p - D.p0) / D.k + D.X0; }
    function Z(p) { return (D.keel - p) / D.k - D.T; }
    var rows = D.rows.map(function (r) {
      var top = Z(r[1]), kz = Z(r[2]);
      return [X(r[0]), top, kz, Math.min(D.B, (top - kz) / 2 * 1.02)];
    });
    var foot = [[X(373), Z(428)], [X(380), Z(427.5)], [X(400), Z(425.5)], [X(500), Z(422.5)], [X(1410), Z(422.5)], [X(1420), Z(424.5)], [X(1430), Z(425)]];
    var SP = K.subSpec({ P: K.fairP(rows, 0.6), foot: foot, c0: -31.5, c1: 35.4, WT: 2.5, wk: 0.75, cmin: 0.2 });
    function Q(xx) { var q = SP(xx); K.secPts(q); return q; }
    var g = new THREE.Group(), T = K.materials(THREE, C, K.SUBP2), B = K.bins(T);
    var X0 = rows[0][0], X1 = rows[rows.length - 1][0];
    var xs = K.stations(X0, X1, function (xx) { return xx < -28 || xx > 31 ? 0.45 : 1.3; },
                        [X(373) - 0.3, X(373) + 0.05, X(1430) - 0.05, X(1430) + 0.3]);
    K.subHull2(B.hull, xs, SP, B.deck);
    /* weld seams round the pressure hull, every 3.6 m */
    for (x = -30.0; x < 34; x += 3.6) K.seam2(B.metal, SP, x);
    /* the free-flood row low along the casing's side panel (NOT CONFIRMED) */
    for (x = -19.5; x < 32.5; x += 1.25) {
      var qh = Q(x);
      for (s = -1; s <= 1; s += 2) K.panelOn(B.dark, x, K.slopePt(qh, 0.22), 0.25, 0.08, s);
    }
    /* the torpedo-tube shutters, two a side in the blunt bow */
    for (s = -1; s <= 1; s += 2) [-1.8, -3.4].forEach(function (zz) { K.panelOn(B.dark, 35.0, K.arcAtZ(Q(35.0), zz), 0.7, 0.36, s); });
    /* the casing's fittings [R3]: hatches fore and aft of the sail, the
       weapons-loading hatch forward, retractable cleats, the capstan, the
       safety track along the crown, the small post forward [R2] */
    [-14.0, 7.5, 24.5].forEach(function (xx) { K.roundHatch(B, xx, 0, Q(xx).zt, 0.42); });
    K.hatch(B, 29.0, 0, Q(29.0).zt - 0.02, 2.2, 0.8);
    [-24.0, -18.5, 8.6, 26.5, 32.0].forEach(function (xx) { for (s = -1; s <= 1; s += 2) K.cleat(B, xx, s * 0.7, Q(xx).zt); });
    K.cylZ(B.metal, 31.0, 0, Q(31.0).zt, Q(31.0).zt + 0.28, 0.25, 12);
    K.cylZ(B.sup, X(1338), 0, Q(X(1338)).zt, Q(X(1338)).zt + 0.35, 0.12, 8);
    for (x = -27.0; x < 33.5; x += 1.6) { var qw = Q(x + 0.7); if (x > 9.5 && x < 21.5) continue; K.box(B.deck, x, x + 1.4, -0.12, 0.12, qw.zt - 0.02, qw.zt + 0.03); }
    /* the sail [R2]: foot X(976..1194), top 7.76 at X(1000..1186), the
       after edge raked, the front near upright and half-round [R3]; the
       window ring under its top, the bridge recess, the masts housed */
    var sx0 = X(980), sx1 = X(1192), szt = Z(257), shw = 1.4;
    K.sail2(B.sup, sx0, sx1, 1.5, szt, shw, 0.35, 0.3, X(1000) - X(980), X(1192) - X(1186));
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) K.box(B.glass, 18.6 + i * 0.5, 18.95 + i * 0.5, s > 0 ? shw - 0.005 : -shw - 0.015, s > 0 ? shw + 0.015 : -shw + 0.005, szt - 0.75, szt - 0.45);
      K.box(B.dark, 13.0, 20.3, s > 0 ? shw - 0.005 : -shw - 0.012, s > 0 ? shw + 0.012 : -shw + 0.005, szt - 0.95, szt - 0.9);
      /* the sail planes at row 302 [R2], X(1128..1180), 2.2 m out [R3] */
      K.foil(B.sup, X(1128), X(1180), X(1128) + 0.5, X(1180) - 0.6, s * (shw - 0.05), s * (shw + 2.2), 0.3, false, Z(302));
      for (i = 0; i < 6; i++) K.box(B.metal, sx0 + 0.9 - 0.04, sx0 + 0.9 + 0.04, s > 0 ? 0.95 : -1.01, s > 0 ? 1.01 : -0.95, 2.4 + i * 0.75, 2.45 + i * 0.75);
    }
    K.box(B.dark, 19.0, 20.5, -0.8, 0.8, szt - 0.28, szt + 0.01);
    K.periscopes(B, 16.8, szt, [[0, 0, 1.4, 0.15], [-1.3, 0, 1.0, 0.13], [-2.6, 0, 0.7, 0.22]]);
    K.whip(B, 14.0, 0.3, szt, 2.4);
    for (i = 0; i < 3; i++) K.box(B.dark, 11.6 + i * 2.1, 12.9 + i * 2.1, -0.45, 0.45, szt - 0.01, szt + 0.02);
    /* the cruciform stern [R2]: rudders rows 380..420 and 500..536 over
       X(120..185), the stern planes on the shaft row 459 (4.0 m out, NOT
       CONFIRMED), the hinge gaps; the five-bladed screw at X(76) */
    var ra = X(120), rb = X(185), zs = Z(459);
    K.foil(B.hull, ra, rb, ra + 0.2, rb - 1.0, Z(420) - 0.6, Z(380), 0.42, true, 0);
    K.foil(B.hull, ra, rb, ra + 0.2, rb - 1.0, Z(500) + 0.6, Z(536), 0.42, true, 0);
    K.box(B.dark, ra + 1.0, ra + 1.25, -0.17, 0.17, Z(420) - 0.3, Z(380) - 0.1);
    K.box(B.dark, ra + 1.0, ra + 1.25, -0.17, 0.17, Z(536) + 0.1, Z(500) + 0.3);
    for (s = -1; s <= 1; s += 2) {
      K.foil(B.hull, ra, rb, ra + 0.2, rb - 1.2, s * 0.5, s * 4.0, 0.36, false, zs);
      K.box(B.dark, ra + 1.0, ra + 1.2, s > 0 ? 1.0 : -3.9, s > 0 ? 3.9 : -1.0, zs - 0.15, zs + 0.15);
    }
    K.screw2(B.metal, X(76), 0, zs, D.screw[2] / D.k, 5, 0.4, 0.22);
    /* team: the sail top and the casing abaft it */
    K.box(B.team, 13.5, 16.0, -0.4, 0.4, szt + 0.0, szt + 0.04);
    x = sx0 - 6; K.box(B.team, x - 1.2, x + 1.2, -0.4, 0.4, Q(x).zt + 0.01, Q(x).zt + 0.05);
    K.flush(THREE, g, B);
    return g;
  }
  var buildAmethyste = function (THREE, M, C) {
    if (typeof HeroFrSubKit !== "undefined" && HeroFrSubKit) return buildAmethyste2(THREE, M, C);
    return subOf("amethyste", D_RUBIS(true))(THREE, M, C);
  };

  /* ===================================== PATROUILLEUR OUTRE-MER (POM) [P1]
     [P1] "POM ANG - Arrivee de l'Auguste Benebig a Port Vila 3 (cropped)"
     (Commons; the file name carries accents): Auguste Benebig, PORT
     broadside, bow LEFT, level, 1600 px.  Stem head x 28, transom x 1548:
     1520 px = 80 m, 19.0 px/m (the length the row's own text gives; no
     encyclopaedia page for the class could be read - en.wikipedia has none
     under the names tried, fr.wikipedia is blocked here: NOT CONFIRMED) (people on her decks stand 34
     px, 1.8 m, at that scale); X = (788 - px) / 19.0, Z = (610 - py) / 19.0.
       the stem head 40.0 at 6.3, the stem at the waterline 35.2; the
       forecastle and main deck 5.9; the low forward deckhouse 29.6..13.1
       to 7.5 with the gun on it at 21.6; the main block 15.4..-15.9 to 8.7,
       its raked front, the big windows 14.6..1.5 (z 6.0..6.8); the bridge
       6.2..-10.4 to 11.4, glazing 10.0..10.6; the lattice mast on the
       bridge roof, 7.6 m across its foot to 3 m at 20 m, top 21.3; the
       SATCOM dome at -6.2 (r 1.5); the two exhaust pipes -10.4..-13.3 to
       12.6; the after working deck 2.6 from -16.0 to the transom with the
       boat bay -21.9..-27.2.
     NOT CONFIRMED: the plan of the blocks (side view only); the beam and
     draught are the published figures. */
  var HPOM = { XS0: -40.0, XS1: 40.0, XWL: 35.2, B: 5.9, Bw: 5.6, T: 3.6, tw: 0.9, fine: 0.8, step: 1.2, bw0: 0.4,
               sheer: [[-40.0, 2.6], [-16.1, 2.6], [-16.0, 5.9], [28.0, 5.9], [40.0, 6.3]] };
  function buildPOM(THREE, M, C) {
    var S = startShip(THREE, C, HPOM), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -16, 29.6, 0.3);
    var B0 = block(THREE, g, T.sup, 13.1, 29.6, hw - 0.6, 5.9, 7.5, { lean: 0.1, leanFwd: 2.0, cfa: 0.3, cff: 1.2 });
    var B1 = block(THREE, g, T.sup, -15.9, 15.4, hw, 5.9, 8.7, { lean: 0.08, leanFwd: 0.8, cfa: 0.4, cff: 0.6 });
    for (s = 0; s <= 4; s += 4) facePatch(THREE, g, T.dark, B1.lo, B1.z0, B1.hi, B1.z1, s, s ? 0.03 : 0.55, s ? 0.45 : 0.97, 6.0, 6.8, 0.05);
    var Bb = block(THREE, g, T.sup, -10.4, 6.2, hw - 0.5, 8.65, 11.4, { lean: 0.05, cfa: 0.4, cff: 0.8 });
    glazeFront(THREE, g, T, Bb, 10.0, 10.6);
    lattice(THREE, g, T, 0.0, 11.4, 21.3, 5.5, 2.0);
    box(THREE, g, 0.15, 4.0, 0.15, T.metal, 0.0, 0, 20.2);
    radome(THREE, g, T, 1.5, -6.2, 0, 11.4, 0.4);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -11.9, s * 0.9, 8.7, -12.6, s * 0.9, 12.6, 0.42, 10);
    /* the boat bay and the rails round the after deck [P1] */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 5.3, 0.1, 2.0, T.dark, -24.5, s * (Hh.halfTop(-24.5) - 0.05), 3.6);
    Hh.railRun(THREE, g, T, -39.6, -16.4, 1.6, 1.1);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, -30.0, 0, 2.63);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, -4.0, 0, 11.43);
    /* fittings [P1]: rails round the forecastle and the roofs, bollards,
       anchor and hawse, the scuttles along her side, aerials */
    fittings(THREE, g, T, Hh, { rails: [[16.0, 39.5]], roof: [Bb, B0], bollards: [34.0, 24.0, -36.0, -30.0, -20.0],
      hatches: [[32.0, 0, 1.0, 1.0], [-34.0, 0, 1.6, 1.6]], vents: [[30.0, 2.8], [30.0, -2.8], [-18.0, 4.2], [-18.0, -4.2]],
      rafts: [[-14.0, -11.0, 8.7, hw - 0.7]], anchor: [34.0, 4.2], scuttles: [[-14.0, 26.0, 3.3, 12], [0.0, 12.0, 5.0, 4]],
      aerials: [[-8.0, 3.0, 11.4, 5.0], [-3.0, -3.0, 11.4, 4.0], [24.0, 2.0, 7.5, 4.5]],
      ladders: [[-16.5, 4.0, 2.6, 5.9], [-10.8, 3.0, 8.7, 11.4]] });
    var tw = turretAt(THREE, 21.6, 7.5); gun20(THREE, tw, T);
    return finish(THREE, g, tw, null);
  }

  /* ================================================ P400 (L'Audacieuse) [Q1][Q2]
     [Q1] "French Navy patrol boat La Moqueuse at Sydney in September
     2012.JPG": starboard side from slightly forward of the beam, bow
     right, alongside.  Transom x 245, stem head x 1250: 1005 px = the
     published 54.8 m (en.wikipedia; 8 m beam, 2.54 m draught), 18.34 px/m (the bow nearer the camera: the stations
     carry about +-1 m); the waterline row 742 aft to 752 at the bow.
       the after deck 2.8 at the transom, the sheer rising to 4.1 at the
       superstructure's after wall (-12.7) and 6.9 at the stem head (27.3);
       the stem at the waterline 23.3; the two funnels abreast -15.8..-12.7
       to 9.6 (side by side as [Q2] shows them); the superstructure
       -12.7..9.9 to 7.8, the bridge -5.8..9.9 to 10.7 with its glazing
       9.2..10.0; the mast at -2.0 to 18.8; the dome at 0.2; the gun at 11.6.
     [Q2] "Glorieuse-01.jpg" (La Glorieuse, from the starboard quarter and
     above): the two funnels abreast, the open after deck, the RHIB and its
     crane between the funnels, the forecastle mount.
     NOT CONFIRMED: the plan of the blocks; the gun is drawn as the 40 mm
     the row names (Q1's mount is small and partly hidden). */
  var HP400 = { XS0: -27.4, XS1: 27.4, XWL: 23.4, B: 4.0, Bw: 3.8, T: 2.54, tw: 0.9, fine: 0.9, step: 1.0, bw0: 0.4,
                sheer: [[-27.4, 2.8], [-12.7, 4.1], [10.0, 4.8], [27.4, 6.9]] };
  function buildP400(THREE, M, C) {
    var S = startShip(THREE, C, HP400), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -12.7, 9.9, 0.4);
    block(THREE, g, T.sup, -12.7, 9.9, hw, 4.0, 7.8, { lean: 0.05, leanFwd: 0.3, cfa: 0.3, cff: 0.6 });
    var Bb = block(THREE, g, T.sup, -5.8, 9.9, hw - 0.4, 7.75, 10.7, { lean: 0.06, leanFwd: 0.6, cfa: 0.3, cff: 0.8 });
    glazeFront(THREE, g, T, Bb, 9.2, 10.0);
    pole(THREE, g, T, -2.0, 10.7, 18.8, 0.12, [[15.0, 1.4]]);
    block(THREE, g, T.sup, -3.0, -1.0, 0.6, 10.65, 13.5, { lean: 0.1, cfa: 0.2, cff: 0.2 });
    radome(THREE, g, T, 1.0, 0.6, 1.8, 10.7, 0.3);
    for (s = -1; s <= 1; s += 2) funnel(THREE, g, T, -15.8, -12.7, 0.75, Hh.deckZ(-14.2), 9.6, 0.3, s * 1.7);
    Hh.railRun(THREE, g, T, -26.8, -16.2, 1.5, 1.0);
    boat(THREE, g, T, -20.5, 0, 3.4, 5.0);
    box(THREE, g, 1.6, 0.9, 0.04, T.team, -24.0, 0, 2.95);
    box(THREE, g, 1.6, 0.9, 0.04, T.team, 2.0, 0, 10.73);
    /* fittings [Q1][Q2]: rails all along, bollards, anchor, scuttles, aerials */
    fittings(THREE, g, T, Hh, { rails: [[10.2, 27.0], [-12.0, 9.8]], roof: [Bb], bollards: [22.0, 15.0, -25.0, -17.0],
      hatches: [[19.0, 0, 0.9, 0.9], [-23.0, 0, 1.2, 1.2]], vents: [[16.0, 1.8], [16.0, -1.8], [-24.5, 2.6], [-24.5, -2.6]],
      rafts: [[-10.5, -7.5, 7.8, hw - 0.5]], anchor: [21.5, 4.3], scuttles: [[-10.0, 18.0, 2.4, 8]],
      aerials: [[-4.0, 2.0, 10.7, 6.0], [3.0, -2.0, 10.7, 4.0]],
      ladders: [[-13.0, 2.5, 4.1, 7.8]] });
    var tw = turretAt(THREE, 11.6, Hh.deckZ(11.6)); gun40(THREE, tw, T);
    return finish(THREE, g, tw, null);
  }

  /* ===================================================== HORIZON (FORBIN) [H1][H2]
     [H1] "French destroyer Forbin (D620) underway in the Indian Ocean on
     21 May 2019 (190521-N-VA840-0040).jpg": STARBOARD broadside, bow
     right, level, 1600 px.  Transom x 210, stem head x 1490: 1280 px = the
     published 152.87 m, 8.373 px/m; X = (px - 850) / 8.373, Z = (713 - py)
     / 8.373 (waterline row 713).
       the flight deck 7.5 from the transom to the hangar's after wall at
       -60.3; the main deck 7.9, the forecastle 8.1 at the stem head 76.4,
       the stem at the waterline 71.1; the long block -60.3..31.1, roof 13.7,
       flush with the side; on it the small block over the hangar
       -54.3..-49.6 (16.5); the after mast -26.9..-17.9 to 25.4 with the
       S1850M face over it (25.4..29.0) and the box beside it -20.3..-12.5
       (23.0); the middle mast 0.6..10.2 to 30.2 and its pole to 43.3; the
       bridge block 10.7..31.1 (16.5), glazing 14.7..15.9; the EMPAR mast
       16.1..27.5 at its foot to 30.8, its drum to 34.4 and the EMPAR dome
       (X 24.3, r 2.6, top 39.4); the gun deck 31.1..40.0 at 10.5 with the
       two 76 mm abreast at 37.6; the Sylver block 40.0..50.2 (8.7).
     [H2] "Forbin-090606-N-9988F-372-cropped.jpg" (from the starboard
     quarter and above): the two 76 mm side by side on the step before the
     bridge, the Sylver block's flat top with its hatches forward of them,
     the rails round the pad, the flush flat-sided hull.
     The row is turret:true: the STARBOARD 76 mm is the "turret" group, the
     port one is baked (the engine trains one mount).
     NOT CONFIRMED: every block's plan width (side views); the Exocet's
     place (between the middle and forward masts, as [H2] suggests). */
  var HHOR = { XS0: -76.4, XS1: 76.4, XWL: 71.1, B: 10.1, Bw: 9.4, T: 5.4, tw: 0.86, fine: 1.0, step: 2.0, bw0: 0.4,
               sheer: [[-76.4, 7.5], [-60.4, 7.5], [-60.3, 7.9], [50.2, 7.9], [76.4, 8.1]] };
  function buildHorizon(THREE, M, C) {
    var S = startShip(THREE, C, HHOR), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -60.3, 50.2, 0.1), LN = 0.1;
    var B1 = block(THREE, g, T.sup, -60.3, 31.1, hw, 7.5, 13.7, { lean: LN, cfa: 0.3, cff: 0.3, leanFwd: 0, leanAft: 1.6 });
    facePatch(THREE, g, T.dark, B1.lo, B1.z0, B1.hi, B1.z1, 6, 0.15, 0.85, 7.55, 12.0, 0.05);
    for (s = -1; s <= 1; s += 2) sidePanel(THREE, g, T.dark, -30.0, -18.0, 9.0, 11.0, hw, 7.5, LN, s);
    block(THREE, g, T.sup, -54.3, -49.6, hw - 2.5, 13.65, 16.5, { lean: 0.1, cfa: 0.4, cff: 0.4 });
    var am = block(THREE, g, T.sup, -26.9, -17.9, 3.4, 13.65, 25.4, { lean: 0.12, cfa: 0.6, cff: 0.6 });
    block(THREE, g, T.sup, -20.3, -12.5, 3.8, 13.65, 23.0, { lean: 0.05, cfa: 0.5, cff: 0.5 });
    var ar = new THREE.Group(); ar.position.set(-22.0, 0, 25.4); g.add(ar);
    cylZ(THREE, ar, 0.5, 0.6, 0.8, 8, T.metal, 0, 0, 0.4);
    var fa = box(THREE, ar, 0.5, 6.2, 3.4, T.dark, 0.3, 0, 2.5); fa.rotation.y = -0.25;
    var mm = block(THREE, g, T.sup, 0.6, 10.2, 3.6, 13.65, 30.2, { lean: 0.11, cfa: 0.8, cff: 0.8 });
    pole(THREE, g, T, 5.1, 30.2, 43.3, 0.14, [[36.0, 2.2], [40.0, 1.4]]);
    var Bb = block(THREE, g, T.sup, 10.7, 31.1, hw - 1.6, 13.65, 16.5, { lean: 0.1, cfa: 0.4, cff: 1.4 });
    glazeFront(THREE, g, T, Bb, 14.7, 15.9);
    var em = block(THREE, g, T.sup, 16.1, 27.5, 4.2, 16.45, 30.8, { lean: 0.27, cfa: 1.0, cff: 1.0 });
    cylZ(THREE, g, 2.0, 2.3, 3.6, 16, T.sup, 21.8, 0, 32.6);
    radome(THREE, g, T, 2.6, 21.8, 0, 34.4, 0.0);
    /* the gun deck and the Sylver block forward of it [H1][H2] */
    block(THREE, g, T.sup, 31.0, 40.0, hw - 0.4, 7.85, 10.5, { lean: 0.1, cfa: 0.3, cff: 0.6 });
    block(THREE, g, T.sup, 40.0, 50.2, hw - 2.4, 7.85, 8.7, { lean: 0.2, cfa: 0.3, cff: 1.2 });
    cells(THREE, g, T, 41.0, 6, 4, 1.4, 1.4, 8.4);
    exocet(THREE, g, T, 13.0, 2.4, 13.7, 4, 0, 5.4); exocet(THREE, g, T, 13.0, -2.4, 13.7, 4, 0, 5.4);
    Hh.railRun(THREE, g, T, -75.9, -60.8, 1.6, 1.1);
    /* the port 76 mm, baked */
    var pg = new THREE.Group(); pg.position.set(37.6, 3.4, 10.5); gun76(THREE, pg, T, true); g.add(pg);
    box(THREE, g, 2.2, 1.2, 0.04, T.team, -70.0, 0, 7.53);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, -52.0, 0, 16.53);
    /* fittings [H1][H2]: forecastle rails, bollards, anchor, aerials, rafts */
    fittings(THREE, g, T, Hh, { rails: [[50.5, 75.8]], roof: [Bb], bollards: [66.0, 55.0, -72.0, -64.0],
      hatches: [[60.0, 0, 1.4, 1.4]], vents: [[52.5, 3.5], [52.5, -3.5], [-57.0, 5.4, 13.7], [-57.0, -5.4, 13.7]],
      rafts: [[-44.0, -32.0, 13.7, hw - 1.8]], anchor: [68.0, 5.8], scuttles: [[52.0, 66.0, 6.2, 5]],
      aerials: [[-42.0, 5.0, 13.7, 7.0], [-36.0, -5.0, 13.7, 6.0], [-10.0, 5.0, 13.7, 6.0], [-6.0, -5.0, 13.7, 6.0]],
      ladders: [[-61.0, 3.0, 7.5, 13.7]] });
    var tw = turretAt(THREE, 37.6, 10.5); tw.position.y = -3.4; gun76(THREE, tw, T, true);
    return finish(THREE, g, tw, [-68.4, 0, 7.5]);
  }

  /* ==================================================== LA FAYETTE [L1]
     [L1] "French frigate La Fayette - 03.jpg" (Commons, 3737 px, fetched at
     1600): STARBOARD broadside, bow right, level, against the light.
     Transom x 232, stem head x 1440: 1208 px = the published 125 m, 9.66
     px/m; X = (px - 836) / 9.66, Z = (465 - py) / 9.66 (waterline row 465).
       the flight deck 5.9 from the transom to the hangar at -29.1; the
       forecastle 6.0, the stem head 62.5, the stem at the waterline 56.6;
       the one long block -29.1..37.3 to 11.2, flush with the side, the
       walls leaning in; the dark boat bay in its side -1.0..10.8 (z
       6.2..11.2); the funnel -9.4..-4.8 to 15.6 with its black cap; the
       bridge block 17.0..37.3 to 12.9; the pyramid mast 8.2..15.4 at its
       foot to 26.4 with the search array on its top; the small radome at
       17.0; the 100 mm TR at 41.3, its house 2.5 m tall.
     NOT CONFIRMED: every plan width; the Crotale on the hangar roof (an
     outline only in [L1]); Exocet not drawn (not seen in [L1]). */
  var HLAF = { XS0: -62.5, XS1: 62.5, XWL: 56.6, B: 7.7, Bw: 7.1, T: 4.1, tw: 0.88, fine: 1.0, step: 1.6, bw0: 0.4,
               sheer: [[-62.5, 5.9], [-29.2, 5.9], [-29.1, 6.0], [62.5, 6.2]] };
  function buildLaFayette(THREE, M, C) {
    var S = startShip(THREE, C, HLAF), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -29.1, 37.3, 0.1), LN = 0.18;
    var B1 = block(THREE, g, T.sup, -29.1, 37.3, hw, 5.9, 11.2, { lean: LN, cfa: 0.3, cff: 0.3, leanFwd: 1.4 });
    facePatch(THREE, g, T.dark, B1.lo, B1.z0, B1.hi, B1.z1, 6, 0.15, 0.85, 5.95, 10.0, 0.05);
    for (s = -1; s <= 1; s += 2) sidePanel(THREE, g, T.dark, -1.0, 10.8, 6.3, 11.0, hw, 5.9, LN, s);
    var bb = block(THREE, g, T.sup, 17.0, 36.0, hw - LN * 5.3 - 0.1, 11.15, 12.9, { lean: LN, cfa: 0.4, cff: 1.4, leanFwd: 1.6 });
    glazeFront(THREE, g, T, bb, 11.6, 12.4);
    block(THREE, g, T.sup, -9.4, -4.8, 2.2, 11.15, 15.6, { lean: 0.15, cfa: 0.8, cff: 0.8, leanFwd: 1.6, leanAft: 0 });
    frustum(THREE, g, T.dark, chamf(-9.8, -6.4, 1.3, 0.4, 0.4), 15.5, chamf(-9.8, -6.4, 1.3, 0.4, 0.4), 15.75);
    block(THREE, g, T.sup, 8.2, 15.4, 3.0, 12.85, 26.4, { lean: 0.17, cfa: 0.8, cff: 0.8 });
    array(THREE, g, T, 11.8, 0, 26.4, 4.6, 1.4);
    radome(THREE, g, T, 1.0, 17.0, -1.8, 12.9, 0.6);
    /* Crotale on the hangar roof (outline in [L1]) */
    cylZ(THREE, g, 0.9, 1.0, 0.8, 12, T.sup, -24.0, 0, 11.6);
    box(THREE, g, 2.6, 2.6, 1.4, T.white, -24.0, 0, 12.7);
    Hh.railRun(THREE, g, T, -62.0, -29.6, 1.6, 1.1);
    box(THREE, g, 2.2, 1.2, 0.04, T.team, -56.0, 0, 5.93);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, 26.0, 0, 12.93);
    /* fittings [L1]: the forecastle rail, bollards, anchor, aerials */
    fittings(THREE, g, T, Hh, { rails: [[37.8, 61.8]], roof: [bb], bollards: [53.0, 45.0, -58.0, -50.0],
      hatches: [[49.0, 0, 1.2, 1.2]], vents: [[-27.0, 4.0, 11.2], [-27.0, -4.0, 11.2]],
      rafts: [[-20.0, -12.0, 11.2, hw - LN * 5.3 - 1.0]], anchor: [55.5, 4.4], scuttles: [[44.0, 54.0, 4.0, 4]],
      aerials: [[-17.0, 4.0, 11.2, 6.0], [3.0, -4.0, 11.2, 7.0], [20.0, 4.0, 12.9, 5.0]],
      ladders: [[-30.0, 2.5, 5.9, 11.2]] });
    var tw = turretAt(THREE, 41.3, Hh.deckZ(41.3)); gun100(THREE, tw, T, true);
    return finish(THREE, g, tw, [-48.0, 0, 5.9]);
  }

  /* ============================================ A69 AVISO (D'Estienne d'Orves) [A1][A2]
     [A1] "20250506 CORYMBE-Ducoing.jpg": Commandant Ducuing from the
     starboard quarter, bow left, low.  The ship is at an angle, so the
     stations are read through a projective fit along her deck edge: stem
     x 250 = X 40, transom x 1418 = X -40 (the published 80 m), the scale
     ratio of the hull's depth at the two ends (50 / 95 px) fixing the
     perspective: X = (u - 652.7) / (-8.13 - 0.00776 u); heights scale
     with 21.6 / (0.00776 X + 1) px/m from the waterline (row 790 at the
     bow, 815 at the stern).  Read through it:
       the forecastle 4.2 at the stem head, the stem at the waterline
       36.5; the 01 level flush with the side 28.5..-18.1, its roof about
       7.0 (6.1 to 8.0 along it: the fit carries +-1 m); the bridge
       26..10 to 9.9; the mack (funnel and lattice mast on it) 4.1..-0.6,
       the funnel's black cap 11.1, the lattice to 23.3 with its yard at
       16.3; the SATCOM dome aft of it; the after deckhouse -6..-14 (8.6);
       the quarterdeck 3.2 from -18.1 to the transom; the deckhouse on it
       -18..-26 (6.4) and the after pole at -38.7.
     [A2] "Frans marinevaartuig Commandant de Pimodam in Amsterdam,
     Bestanddeelnr 930-1138.jpg" (1970s, from the starboard bow): the 100
     mm on the forecastle close before the bridge, the lattice mast on the
     funnel, the rails, the anchor in its hawse, the life-raft canisters on
     the 01 level, the whip aerials.
     NOT CONFIRMED: all plan widths; the Exocet's place (2 + 2 amidships,
     not identified in either photograph); heights +-1 m (the fit). NOT
     DRAWN: the towed drogue frame of [A1] (a temporary fit). */
  var HA69 = { XS0: -40.0, XS1: 40.0, XWL: 36.5, B: 5.15, Bw: 4.9, T: 3.6, tw: 0.86, fine: 1.0, step: 1.2, bw0: 0.4,
               sheer: [[-40.0, 3.2], [-18.2, 3.2], [-18.1, 4.0], [28.5, 4.0], [40.0, 4.2]] };
  function buildA69(THREE, M, C) {
    var S = startShip(THREE, C, HA69), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -18.1, 28.5, 0.15);
    var B1 = block(THREE, g, T.sup, -18.1, 28.5, hw, 3.2, 7.0, { lean: 0.03, cfa: 0.3, cff: 1.0 });
    var Bb = block(THREE, g, T.sup, 10.0, 26.0, hw - 0.9, 6.95, 9.9, { lean: 0.05, cfa: 0.4, cff: 1.2 });
    glazeFront(THREE, g, T, Bb, 8.9, 9.6);
    funnel(THREE, g, T, -0.6, 4.1, 1.6, 6.95, 11.1, 0.4, 0);
    lattice(THREE, g, T, 1.6, 11.1, 23.3, 1.8, 0.5);
    box(THREE, g, 0.15, 8.0, 0.15, T.metal, 1.6, 0, 16.3);
    array(THREE, g, T, 1.6, 0, 18.5, 3.6, 0.8);
    radome(THREE, g, T, 1.3, -7.0, -2.0, 7.0, 0.8);
    var Ba = block(THREE, g, T.sup, -14.0, -6.0, hw - 1.4, 6.95, 8.6, { lean: 0.05, cfa: 0.4, cff: 0.4 });
    block(THREE, g, T.sup, -26.0, -18.0, hw - 1.0, 3.15, 6.4, { lean: 0.05, cfa: 0.4, cff: 0.4 });
    pole(THREE, g, T, -38.7, 3.2, 9.5, 0.08, [[8.0, 0.8]]);
    for (s = -1; s <= 1; s += 2) exocet(THREE, g, T, -3.0, s * 2.8, 7.0, 2, s * 0.35, 5.2);
    fittings(THREE, g, T, Hh, { rails: [[28.6, 39.6], [-39.6, -18.4]], roof: [Bb, Ba], bollards: [36.0, -36.0, -28.0],
      hatches: [[36.5, 0, 0.9, 0.9], [-30.0, 0, 1.2, 1.2]], vents: [[29.5, 2.6], [29.5, -2.6]],
      rafts: [[12.0, 18.0, 7.0, hw - 0.5], [-16.0, -13.0, 7.0, hw - 0.5]], anchor: [35.0, 2.8],
      scuttles: [[-12.0, 26.0, 2.4, 10]],
      aerials: [[20.0, 2.5, 9.9, 7.0], [16.0, -2.5, 9.9, 8.0], [-10.0, 3.0, 8.6, 6.0], [-24.0, -3.0, 6.4, 5.0]],
      ladders: [[-18.6, 3.0, 3.2, 7.0]] });
    box(THREE, g, 1.8, 1.0, 0.04, T.team, -32.0, 0, 3.23);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 18.0, 0, 9.93);
    var tw = turretAt(THREE, 31.6, Hh.deckZ(31.6)); gun100(THREE, tw, T, false);
    return finish(THREE, g, tw, null);
  }

  /* ===================================================== TOURVILLE F67 [V1][V2][V3]
     [V1] "Tourville (D 610) at New York Harbor.jpg" (1600 px): PORT side,
     bow left, from forward of the beam and low.  The crew manning the rail
     stand 27 px tall at the bow end and 20 px at the stern end (1.75 m),
     so the stations are read through a projective fit (as the A69's):
     stem head x 305 = X 76.4, transom x 1405 = X -76.4 (the published
     152.8 m), X = (u - 946.8) / (-9.067 + 0.002185 u), heights at 15.4 px/m
     at the bow falling to 11.0 at the stern from the waterline (row 745 at
     the bow, 718 at the stern).  Read through it:
       the deck edge 6.9 at the stem head falling to 6.3 at the transom;
       the stem at the waterline 71.9; the A 100 mm on the forecastle at
       56.6 and the B mount on its deckhouse (roof 9.0) at 48.2; the bridge
       block 44.7..12.1 (its 01 level 11.0, the bridge 13.9) and the
       lattice foremast 32.7..27.8 to 22.4; the mack 12.1..2.0 to 19.5;
       the main mast to 42.1 with the DRBV 26 array (X 15, z 25.7..29.3);
       the hangar block -6.2..-46.1 to 11.6 with the dome and the Crotale
       on its roof; the flight deck and the VDS house aft.
     [V2] "Zerstorer TOURVILLE (franz.) (Kiel 69.633).jpg" (from the port
     quarter): the high square transom with its VDS opening, the hangar's
     after face and the pad; [V3] "Tourville - Brest 2008.jpg" (alongside):
     the rails, life-raft canisters and ladders along the 01 level, the
     bollards, the scuttles.
     NOT CONFIRMED: all plan widths; heights +-1 m (the fit); the Malafon
     and its hangar (not identified) are not drawn. */
  var HTV = { XS0: -76.4, XS1: 76.4, XWL: 71.9, B: 7.65, Bw: 7.2, T: 5.7, tw: 0.82, fine: 1.1, step: 2.0, bw0: 0.35,
              sheer: [[-76.4, 6.3], [0, 6.6], [76.4, 6.9]] };
  function buildTourville(THREE, M, C) {
    var S = startShip(THREE, C, HTV), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -46.1, 44.7, 1.0);
    var Bf = block(THREE, g, T.sup, 12.1, 44.7, hw, 6.5, 11.0, { lean: 0.03, cfa: 0.5, cff: 1.4 });
    var Bb = block(THREE, g, T.sup, 25.0, 41.5, hw - 1.4, 10.95, 13.9, { lean: 0.06, cfa: 0.5, cff: 1.4 });
    glazeFront(THREE, g, T, Bb, 12.6, 13.4);
    block(THREE, g, T.sup, 45.0, 51.5, hw - 1.6, 6.7, 9.0, { lean: 0.05, cfa: 0.4, cff: 1.2 });
    lattice(THREE, g, T, 30.2, 13.9, 22.4, 2.4, 0.9);
    array(THREE, g, T, 30.2, 0, 22.4, 3.0, 0.7);
    var Bm = block(THREE, g, T.sup, -6.2, 12.1, hw - 0.4, 6.4, 11.0, { lean: 0.03, cfa: 0.4, cff: 0.4 });
    funnel(THREE, g, T, 2.0, 12.1, 2.2, 10.95, 19.5, 0.8, 0);
    lattice(THREE, g, T, 15.0, 11.0, 30.0, 3.0, 1.0);
    pole(THREE, g, T, 15.0, 30.0, 42.1, 0.12, [[34.0, 2.6], [38.0, 1.6]]);
    var ar = new THREE.Group(); ar.position.set(15.0, 0, 26.0); g.add(ar);
    var dsh = box(THREE, ar, 0.6, 6.5, 3.4, T.dark, 0.8, 0, 1.7); dsh.rotation.y = -0.2;
    var Bh = block(THREE, g, T.sup, -46.1, -6.2, hw - 0.4, 6.3, 11.6, { lean: 0.03, cfa: 0.4, cff: 0.4 });
    facePatch(THREE, g, T.dark, Bh.lo, Bh.z0, Bh.hi, Bh.z1, 6, 0.15, 0.85, 6.4, 10.6, 0.05);
    radome(THREE, g, T, 1.2, -8.0, 0, 11.6, 1.4);
    cylZ(THREE, g, 1.0, 1.1, 0.8, 12, T.sup, -16.0, 0, 12.0);
    box(THREE, g, 2.8, 2.6, 1.5, T.white, -16.0, 0, 13.2);
    block(THREE, g, T.sup, -76.0, -67.0, hw - 2.0, 6.25, 8.6, { lean: 0.05, cfa: 0.3, cff: 0.6 });
    fittings(THREE, g, T, Hh, { rails: [[44.9, 75.8], [-66.8, -46.4]], roof: [Bb, Bh], bollards: [66.0, 58.0, -72.0, -52.0],
      hatches: [[62.0, 0, 1.4, 1.4], [-60.0, 3.5, 1.2, 1.2]], vents: [[52.5, 4.0], [52.5, -4.0], [-44.0, 5.0, 11.6], [-44.0, -5.0, 11.6]],
      rafts: [[16.0, 24.0, 11.0, hw - 0.6], [-40.0, -28.0, 11.6, hw - 0.9]], anchor: [68.0, 4.8], scuttles: [[-40.0, 60.0, 4.2, 18]],
      aerials: [[36.0, 4.0, 13.9, 8.0], [-2.0, -4.0, 11.0, 7.0], [-30.0, 4.5, 11.6, 6.0], [-36.0, -4.5, 11.6, 6.0]],
      ladders: [[-46.6, 3.0, 6.3, 11.6], [12.0, -4.0, 6.5, 11.0]] });
    var pb = new THREE.Group(); pb.position.set(48.2, 0, 9.0); gun100(THREE, pb, T, false); g.add(pb);
    box(THREE, g, 2.2, 1.2, 0.04, T.team, -56.0, 0, 6.33);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, -30.0, 0, 11.63);
    var tw = turretAt(THREE, 56.6, Hh.deckZ(56.6)); gun100(THREE, tw, T, false);
    return finish(THREE, g, tw, [-56.5, 0, 6.4]);
  }

  /* ======================================================= CASSARD F70 AA [K1][K2]
     [K1] "French destroyer Cassard (D614) underway in the Arabian Sea on
     18 December 2018 (181218-N-GC639-2133).JPG" (1600 px): PORT side,
     bow left, near broadside from slightly above.  Stem head x 128,
     transom x 1445: 1317 px = the published 139 m, 9.48 px/m; X = 69.5 -
     (px - 128) / 9.48, Z = (WL - py) / 9.48 with the waterline WL = 740 +
     0.0254 (px - 170); a roof seen from above shows its far edge, so roofs
     are read about 1 m under their outline.
       the deck edge 6.4 at the stem head, 5.2 at the gun, 4.8 amidships,
       5.3 on the pad; the 100 mm at 43.5; the forward block 39.2..12.9 to
       9.5 with the bridge 39.0..31.0 to 13.4; the lattice mast 22.3..18.1
       to 31.7, its pole to 43.3; the radar column at 26.3 (19.5); the big
       block 6.5..-7.7 to 15.0 with its tower to 24.5 and the DRBJ 11B on
       top (25.5), the two SATCOM domes beside it; the after block
       -7.7..-22.5 to 10.5 with the two SPG-51 directors; the Mk 13 arm on
       its house at -31; the hangar -37.2..-52.0 to 9.7; the pad to the
       transom.
     [K2] "French destroyer Cassard (D614) underway in the Arabian Gulf
     October 2014 (cropped).JPG" (from the port bow and above): the same
     layout; the Exocet canisters abreast the big block, the boat, the
     rails, life rafts and the funnel soot.
     NOT CONFIRMED: plan widths; the Exocet's exact station. */
  var HCAS = { XS0: -69.5, XS1: 69.5, XWL: 64.5, B: 7.0, Bw: 6.6, T: 5.0, tw: 0.84, fine: 1.1, step: 2.0, bw0: 0.35,
               sheer: [[-69.5, 5.3], [-40.0, 5.0], [0.0, 4.8], [40.0, 5.2], [69.5, 6.4]] };
  function buildCassard(THREE, M, C) {
    var S = startShip(THREE, C, HCAS), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -52.0, 39.2, 0.9);
    var Bf = block(THREE, g, T.sup, 12.9, 39.2, hw, 4.7, 9.5, { lean: 0.03, cfa: 0.4, cff: 1.4 });
    var Bb = block(THREE, g, T.sup, 31.0, 39.0, hw - 1.0, 9.45, 13.4, { lean: 0.06, cfa: 0.4, cff: 1.2 });
    glazeFront(THREE, g, T, Bb, 12.1, 12.9);
    cylZ(THREE, g, 1.0, 1.2, 1.0, 12, T.sup, 35.0, 0, 13.9);
    lattice(THREE, g, T, 20.2, 9.5, 31.7, 3.0, 0.9);
    pole(THREE, g, T, 20.2, 31.7, 43.3, 0.1, [[34.0, 2.4], [38.0, 1.4]]);
    array(THREE, g, T, 20.2, 0, 31.7, 4.0, 0.8);
    cylZ(THREE, g, 0.5, 0.6, 6.1, 8, T.sup, 26.3, 0, 12.45);
    array(THREE, g, T, 26.3, 0, 15.5, 3.4, 1.0);
    var Bm = block(THREE, g, T.sup, -7.7, 6.5, hw - 0.6, 4.7, 15.0, { lean: 0.04, cfa: 0.6, cff: 0.6 });
    funnel(THREE, g, T, -3.8, 1.6, 2.2, 14.95, 24.5, 0.5, 0);
    array(THREE, g, T, -1.6, 0, 24.6, 4.0, 1.2);
    radome(THREE, g, T, 1.6, 4.6, 2.2, 15.0, 2.0); radome(THREE, g, T, 1.6, 4.6, -2.2, 15.0, 2.0);
    var Ba = block(THREE, g, T.sup, -22.5, -7.7, hw - 1.0, 4.7, 10.5, { lean: 0.04, cfa: 0.5, cff: 0.4 });
    [[-11.6, 18.5], [-16.0, 16.0]].forEach(function (d) {
      cylZ(THREE, g, 0.6, 0.8, d[1] - 10.5 - 1.2, 10, T.sup, d[0], 0, (10.5 + d[1] - 1.2) / 2);
      var dd = new THREE.Mesh(new THREE.SphereGeometry(1.3, 12, 6, 0, PI * 2, 0, PI / 3), T.white);
      dd.rotation.z = PI / 2; dd.position.set(d[0] + 0.2, 0, d[1]); g.add(dd);
    });
    block(THREE, g, T.sup, -34.0, -27.0, hw - 2.2, 4.75, 7.0, { lean: 0.05, cfa: 0.4, cff: 0.4 });
    cylZ(THREE, g, 1.1, 1.3, 0.8, 12, T.sup, -30.8, 0, 7.4);
    strut(THREE, g, T.metal, -30.8, 0, 7.9, -28.6, 0, 9.4, 0.3, 8);
    cylX(THREE, g, 0.18, 0.18, 4.4, 8, T.white, -28.8, 0, 9.7);
    var Bh = block(THREE, g, T.sup, -52.0, -37.2, hw - 0.4, 4.9, 9.7, { lean: 0.03, cfa: 0.4, cff: 0.4 });
    facePatch(THREE, g, T.dark, Bh.lo, Bh.z0, Bh.hi, Bh.z1, 6, 0.15, 0.85, 5.0, 8.7, 0.05);
    for (s = -1; s <= 1; s += 2) exocet(THREE, g, T, 1.0, s * (hw - 0.4), 4.8, 2, s * 0.4, 5.2);
    boat(THREE, g, T, -13.0, -(hw - 1.6), 10.5, 6.0);
    fittings(THREE, g, T, Hh, { rails: [[39.4, 68.9], [-68.9, -52.3], [-36.9, -22.8]], roof: [Bb, Bh, Ba], bollards: [60.0, 50.0, -66.0, -56.0],
      hatches: [[55.0, 0, 1.3, 1.3], [-25.0, 2.5, 1.0, 1.0]], vents: [[48.0, 3.5], [48.0, -3.5], [-36.0, 4.5], [-36.0, -4.5]],
      rafts: [[14.0, 24.0, 9.5, hw - 0.6], [-46.0, -40.0, 9.7, hw - 0.9]], anchor: [62.0, 4.6], scuttles: [[-30.0, 56.0, 3.4, 16]],
      aerials: [[30.0, 4.0, 13.4, 7.0], [-6.0, 4.0, 15.0, 6.0], [-20.0, -4.0, 10.5, 6.0], [-50.0, 4.0, 9.7, 5.0]],
      ladders: [[-52.4, 3.0, 5.0, 9.7], [12.6, -3.0, 4.8, 9.5]] });
    box(THREE, g, 2.2, 1.2, 0.04, T.team, -62.0, 0, 5.33);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, -44.0, 0, 9.73);
    var tw = turretAt(THREE, 43.5, Hh.deckZ(43.5)); gun100(THREE, tw, T, false);
    return finish(THREE, g, tw, [-61.0, 0, 5.2]);
  }

  /* =========================================== LA CONFIANCE (PLG) [C1][C2]
     [C1] "2017FAG 061 001 013 PAG.jpg" (Commons, 2000 px, fetched at 1600):
     La Confiance, STARBOARD broadside, bow right, near level.  Transom x
     415, stem head x 1517: 1102 px = the published 60.8 m, 18.13 px/m; X
     = (px - 966) / 18.13, Z = (640 - py) / 18.13.
       the stem head 5.0, the stem at the waterline 27.8 (head 30.4); the
       forecastle 4.4 with its bulwark; the deckhouse -15.8..18.4 to 7.7
       (portholes along it), the bridge -4.7..7.9 to 11.3 under its wide
       sun roof, glazing 9.7..10.7; the lattice mast on the bridge roof to
       23.4; the boat davit block -14..-9; the quarterdeck 2.4 to the
       transom with the crane at -23.5; the life-raft canisters at -8..-5.
     [C2] "2017FAG 028 004 Confiante.jpg" (from the starboard bow): the
     high flared bow, the anchor in its pocket, the mast's lattice, the
     rails and the scuttle rows.
     NOT CONFIRMED: plan widths; the gun's place (the small mount on the
     deckhouse's fore end in [C1]). */
  var HCF = { XS0: -30.4, XS1: 30.4, XWL: 27.8, B: 4.78, Bw: 4.5, T: 3.2, tw: 0.9, fine: 0.9, step: 1.0, bw0: 0.4,
              sheer: [[-30.4, 2.4], [-15.9, 2.4], [-15.8, 4.4], [18.4, 4.4], [30.4, 5.0]] };
  function buildConfiance(THREE, M, C) {
    var S = startShip(THREE, C, HCF), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -15.8, 18.4, 0.1);
    var B1 = block(THREE, g, T.sup, -15.8, 18.4, hw, 2.4, 7.7, { lean: 0.04, cfa: 0.3, cff: 1.0 });
    var Bb = block(THREE, g, T.sup, -4.7, 7.9, hw - 1.0, 7.65, 11.3, { lean: 0.03, cfa: 0.4, cff: 0.8 });
    glazeFront(THREE, g, T, Bb, 9.7, 10.7);
    box(THREE, g, 15.7, 2 * hw + 0.4, 0.25, T.sup, 1.6, 0, 11.4);
    lattice(THREE, g, T, 1.6, 11.5, 23.4, 3.6, 1.0);
    box(THREE, g, 0.12, 3.6, 0.12, T.metal, 1.6, 0, 20.0);
    radome(THREE, g, T, 0.6, 5.5, 2.0, 11.5, 0.3);
    block(THREE, g, T.sup, -14.0, -9.0, hw - 1.4, 7.65, 9.6, { lean: 0.05, cfa: 0.3, cff: 0.3 });
    strut(THREE, g, T.metal, -14.0, 1.8, 9.6, -16.5, 0, 12.6, 0.18, 6);
    strut(THREE, g, T.metal, -14.0, -1.8, 9.6, -16.5, 0, 12.6, 0.18, 6);
    strut(THREE, g, T.metal, -23.5, 0, 2.4, -23.5, 0, 5.2, 0.25, 8);
    strut(THREE, g, T.metal, -23.5, 0, 5.2, -20.0, 0, 6.4, 0.15, 6);
    boat(THREE, g, T, -22.0, 2.4, 2.45, 6.5);
    fittings(THREE, g, T, Hh, { rails: [[18.6, 30.0], [-30.0, -16.0]], roof: [B1, Bb], bollards: [26.0, 21.0, -28.0, -19.0],
      hatches: [[23.5, 0, 0.9, 0.9], [-26.5, -2.4, 1.0, 1.0]], vents: [[20.0, 2.6], [20.0, -2.6]],
      rafts: [[-8.0, -5.0, 7.7, hw - 0.5]], anchor: [26.5, 3.0], scuttles: [[-14.0, 22.0, 2.1, 14], [-12.0, 16.0, 5.6, 9]],
      aerials: [[-2.0, 2.5, 11.6, 6.0], [7.0, -2.5, 11.6, 4.0], [-12.0, 2.5, 9.6, 5.0]],
      ladders: [[-16.3, 3.0, 2.4, 7.7]] });
    box(THREE, g, 1.6, 0.9, 0.04, T.team, -27.0, 0, 2.43);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, -1.0, 0, 11.55);
    var tw = turretAt(THREE, 16.6, 7.7); gun20(THREE, tw, T);
    return finish(THREE, g, tw, null);
  }

  /* a 12.7 mm machine gun on a pintle: the "turret" of the MG-only patrol ships */
  function gunMG(THREE, g, T) {
    cylZ(THREE, g, 0.08, 0.12, 1.0, 8, T.metal, 0, 0, 0.5);
    box(THREE, g, 0.7, 0.22, 0.25, T.metal, 0.1, 0, 1.1);
    cylX(THREE, g, 0.03, 0.03, 1.2, 6, T.metal, 1.0, 0, 1.12, true);
    box(THREE, g, 0.06, 0.6, 0.45, T.sup, 0.35, 0, 1.25);
    box(THREE, g, 0.25, 0.2, 0.04, T.team, -0.15, 0, 1.25);
  }
  /* ============================================= FLAMANT (OPV 54) [N1][N2]
     [N1] "French Navy Flamant Class P676 entering Dunkirk harbour
     (7961651562).jpg" (4000 px, fetched at 1600): PORT bow quarter, bow
     left, from slightly above.  Stem x 90, stern x 1560 taken linearly
     over the published 54 m (27.2 px/m along her; the bow is the nearer
     end, so the stations carry about +-2 m); heights from the waterline
     (row 955 at the bow, 935 at the stern) at 27.8 px/m at the bow falling
     10 % to the stern (the hull's depth at the two ends), roofs read about
     1.5 m under their outline (seen from above).
       the deck 6.0 forward, 5.6 aft with the bulwark; the long block
       -14.2..19.3 to 10.5 with its raked, faceted front; the bridge
       -0.4..15.8 to 12.5, glazing 10.6..12.0; the tower mast at 4.9 to 23
       and its pole to 28; the two SATCOM domes; the funnel -7.4..-1.3 to
       15.0; the crane abaft it; the open after deck.
     [N2] "French Navy Flamant Class P676 Dublin Docks.jpg" (from ahead
     and to port, alongside): the faceted bridge front, the bulwarked
     forecastle, the hawse and anchor pockets, the rails, the mast's yards.
     NOT CONFIRMED: plan widths; stations +-2 m, heights +-1 m; the MG's
     place on the forecastle (the row's one weapon; [N1][N2] show no gun). */
  var HFL = { XS0: -27.0, XS1: 27.0, XWL: 23.5, B: 5.0, Bw: 4.7, T: 2.2, tw: 0.92, fine: 0.8, step: 1.0, bw0: 0.45,
              sheer: [[-27.0, 5.6], [-14.3, 5.6], [-14.2, 5.8], [19.3, 5.9], [27.0, 6.3]] };
  function buildFlamant(THREE, M, C) {
    var S = startShip(THREE, C, HFL), g = S.g, T = S.T, Hh = S.Hh, s;
    var hw = flushHW(Hh, -14.2, 19.3, 0.1);
    var B1 = block(THREE, g, T.sup, -14.2, 19.3, hw, 5.6, 10.5, { lean: 0.06, leanFwd: 0.9, cfa: 0.3, cff: 1.6 });
    var Bb = block(THREE, g, T.sup, -0.4, 15.8, hw - 0.6, 10.45, 12.5, { lean: 0.1, leanFwd: 1.4, cfa: 0.4, cff: 1.2 });
    glazeFront(THREE, g, T, Bb, 10.6, 12.0);
    [0, 4].forEach(function (k) { facePatch(THREE, g, T.glass, Bb.lo, Bb.z0, Bb.hi, Bb.z1, k, 0.5, 0.95, 10.8, 11.9, 0.05); });
    block(THREE, g, T.sup, 3.6, 6.2, 1.0, 12.45, 23.0, { lean: 0.04, cfa: 0.3, cff: 0.3 });
    pole(THREE, g, T, 4.9, 23.0, 28.0, 0.08, [[20.5, 2.2], [24.5, 1.2]]);
    radome(THREE, g, T, 1.1, 9.5, 2.0, 12.5, 1.0); radome(THREE, g, T, 1.2, 1.6, -2.0, 12.5, 1.4);
    funnel(THREE, g, T, -7.4, -1.3, 1.6, 10.45, 15.0, 0.4, 0);
    strut(THREE, g, T.metal, -10.0, 0, 10.5, -10.0, 0, 13.5, 0.25, 8);
    strut(THREE, g, T.metal, -10.0, 0, 13.5, -15.5, 0, 12.0, 0.16, 6);
    boat(THREE, g, T, -19.0, 0, 5.65, 6.0);
    fittings(THREE, g, T, Hh, { rails: [[19.5, 26.6], [-26.6, -14.4]], roof: [B1, Bb], bollards: [24.0, 21.5, -25.0, -16.5],
      hatches: [[22.5, 0, 0.9, 0.9], [-24.5, 2.6, 1.0, 1.0]], vents: [[-13.0, 3.0, 10.5], [-13.0, -3.0, 10.5]],
      rafts: [[-12.0, -9.0, 10.5, hw - 0.7]], anchor: [24.0, 3.8], scuttles: [[-12.0, 16.0, 4.0, 10]],
      aerials: [[0.0, 3.0, 12.5, 6.0], [13.0, -3.0, 12.5, 5.0], [-6.0, 3.5, 10.5, 7.0]],
      ladders: [[-14.6, 3.0, 5.6, 10.5]] });
    box(THREE, g, 1.6, 0.9, 0.04, T.team, -24.0, 0, 5.63);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 6.0, 0, 12.53);
    var tw = turretAt(THREE, 21.0, Hh.deckZ(21.0)); gunMG(THREE, tw, T);
    return finish(THREE, g, tw, null);
  }

  return { cdg: buildCdG, fremm: buildFREMM, suffren: buildSuffren, triomphant: buildTriomphant, rubis: buildRubis, amethyste: buildAmethyste, pom: buildPOM, p400: buildP400, horizon: buildHorizon, lafayette: buildLaFayette, a69: buildA69, tourville: buildTourville, cassard: buildCassard, confiance: buildConfiance, flamant: buildFlamant, agosta: buildAgosta };

})();

UNIT_MODELS["carrier_f"] = { len: 260.5, build: function (THREE, M, C) { return HeroFrNavyLate.cdg(THREE, M, C); } };
UNIT_MODELS["corvette_f"] = { len: 142.2, build: function (THREE, M, C) { return HeroFrNavyLate.fremm(THREE, M, C); } };
UNIT_MODELS["sub_f"] = { len: 99.25, build: function (THREE, M, C) { return HeroFrNavyLate.suffren(THREE, M, C); } };
UNIT_MODELS["ssbn_f"] = { len: 137.6, build: function (THREE, M, C) { return HeroFrNavyLate.triomphant(THREE, M, C); } };
UNIT_MODELS["fra_e90_sub"] = { len: 72.18, build: function (THREE, M, C) { return HeroFrNavyLate.rubis(THREE, M, C); } };
UNIT_MODELS["fra_e00_sub"] = { len: 73.52, build: function (THREE, M, C) { return HeroFrNavyLate.amethyste(THREE, M, C); } };
UNIT_MODELS["boat_f"] = { len: 80.0, build: function (THREE, M, C) { return HeroFrNavyLate.pom(THREE, M, C); } };
UNIT_MODELS["fra_e80_patrol"] = { len: 54.8, build: function (THREE, M, C) { return HeroFrNavyLate.p400(THREE, M, C); } };
UNIT_MODELS["destroyer_f"] = { len: 152.8, build: function (THREE, M, C) { return HeroFrNavyLate.horizon(THREE, M, C); } };
UNIT_MODELS["fra_e90_corvette"] = { len: 125.0, build: function (THREE, M, C) { return HeroFrNavyLate.lafayette(THREE, M, C); } };
UNIT_MODELS["fra_e80_corvette"] = { len: 80.0, build: function (THREE, M, C) { return HeroFrNavyLate.a69(THREE, M, C); } };
UNIT_MODELS["fra_e80_destroyer"] = { len: 152.8, build: function (THREE, M, C) { return HeroFrNavyLate.tourville(THREE, M, C); } };
UNIT_MODELS["fra_e90_destroyer"] = { len: 139.0, build: function (THREE, M, C) { return HeroFrNavyLate.cassard(THREE, M, C); } };
UNIT_MODELS["fra_e00_patrol"] = { len: 60.8, build: function (THREE, M, C) { return HeroFrNavyLate.confiance(THREE, M, C); } };
UNIT_MODELS["fra_e90_patrol"] = { len: 54.0, build: function (THREE, M, C) { return HeroFrNavyLate.flamant(THREE, M, C); } };
UNIT_MODELS["fra_e80_sub"] = { len: 67.0, build: function (THREE, M, C) { return HeroFrNavyLate.agosta(THREE, M, C); } };

/* ---- rows built ONCE, registered twice (the brief's "build each class once") ---- */
UNIT_MODELS["fra_e00_corvette"] = { len: 142.2, build: function (THREE, M, C) { return HeroFrNavyLate.fremm(THREE, M, C); } };
UNIT_MODELS["fra_e00_destroyer"] = { len: 152.8, build: function (THREE, M, C) { return HeroFrNavyLate.horizon(THREE, M, C); } };
UNIT_MODELS["fra_e00_carrier"] = { len: 260.5, build: function (THREE, M, C) { return HeroFrNavyLate.cdg(THREE, M, C); } };
/* Le Triomphant with the M45 (1997) and with the M51 (ssbn_f): the hull is the
   same and [T1][T2] show no difference that could be drawn, so one builder.
   No named round (ord): js/fx3d.js has no M45 or M51 round to name. */
UNIT_MODELS["fra_e90_ssbn"] = { len: 137.6, build: function (THREE, M, C) { return HeroFrNavyLate.triomphant(THREE, M, C); } };

/* ---- the Clemenceau class and the Colbert: built by js/hero/fr_navy_early.js
   (HeroClemenceau, HeroColbert), registered here for the later rows only when
   that file has loaded first.  The variant names asked of those builders:
     fra_e80_carrier  HeroClemenceau.build(THREE, M, C, "e60")  Clemenceau, 1980s (Super Etendard/ASMP air group; the hull as refitted)
     fra_e90_carrier  HeroClemenceau.build(THREE, M, C, "e60")        Foch, 1990s
     fra_e80_cruiser  HeroColbert.build(THREE, M, C, "e80")             Colbert after the 1980 Exocet fit
   (the early file defines Clemenceau "e60" only - no reference shows the Foch or the 1980s/90s
   Clemenceau differing outside - and Colbert "e60"/"e80"; these are its exact variant names)
   len follows the early file's own e60 rows where it registered them. ---- */
if (typeof HeroClemenceau !== "undefined") {
  UNIT_MODELS["fra_e80_carrier"] = { len: (UNIT_MODELS["fra_e60_carrier"] || {}).len || 265.0,
    build: function (THREE, M, C) { return HeroClemenceau.build(THREE, M, C, "e60"); } };
  UNIT_MODELS["fra_e90_carrier"] = { len: (UNIT_MODELS["fra_e60_carrier"] || {}).len || 265.0,
    build: function (THREE, M, C) { return HeroClemenceau.build(THREE, M, C, "e60"); } };
}
if (typeof HeroColbert !== "undefined") {
  UNIT_MODELS["fra_e80_cruiser"] = { len: (UNIT_MODELS["fra_e60_cruiser"] || {}).len || 180.8,
    build: function (THREE, M, C) { return HeroColbert.build(THREE, M, C, "e80"); } };
}

