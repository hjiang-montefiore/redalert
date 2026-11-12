/* ==================== js/hero/pla_e00_destroyer.js ======================
   HERO MODEL -- Type 052C (Luyang II) destroyer, PLAN, era e00 (2004), drawn
   as Lanzhou (170), the lead ship.  Key pla_e00_destroyer; global
   HeroPlaE00Destroyer.build(THREE, M, C).

   REBUILD (2026-11).  This file used to draw the Type 052B (Guangzhou,
   SA-N-12 revolvers, Front Dome radomes) in 474 separate meshes.  The row
   (js/eras.js) is "Type 052C / 052D", service 2004, so it now draws the row's
   first ship, the 052C; the 052D is js/hero/pla_navy_modern.js destroyer_c.
   Kept: the global, build(), the key, the "turret" group (the main gun), the
   light PLAN grey, the hull's double band (grey topsides, red bottom).  New:
   every station and height, the shape of the ship, one mesh per material
   (14 draw calls) and a hidden "helipad" node on the middle of the pad.

   PUBLISHED FIGURES (en.wikipedia "Type 052C destroyer", raw wikitext read
   2026-11-12, citing Jane's Fighting Ships 2009-10): length 155 m, beam
   17 m, draught 6 m, 7,000 t; 1 x 100 mm H/PJ-87, 48 HHQ-9 in eight
   six-round revolver cells (six forward, two aft), 8 YJ-62, 2 x Type 730
   CIWS, Type 346 (four fixed arrays), Type 517 (Yagi), a hangar for one
   Ka-28 or Z-9.

   REFERENCES (Wikimedia Commons, fetched at 1600 px; grids laid over them
   with PIL, scratchpad/q_reb3):
     [P1] "Type 052C destroyer.jpg" -- Lanzhou (170) at anchor, PORT side,
          bow left, camera at about deck height, long lens.  Stem head x 85,
          stern x 1532: 1447 px = 155 m (0.1071 m/px along the length).  The
          ship lies forward of the beam (the bow's flare and the anchor
          recess face the camera), so the LENGTH is foreshortened; positions
          along the ship are read as fractions of it (long lens: near-
          orthographic) and are good.  Heights: waterline row 665 (x 200) to
          652 (x 1500).  A foreshortened photograph cannot give its own
          vertical scale, so the scale (12.8 px/m) is the one that puts the
          deck edge amidships at 8.2 m, the deck edge of the SAME Jiangnan
          hull measured broadside in pla_navy_modern.js [D1].  Every other
          height is then read off [P1] at that one scale, and they agree
          with [D1] where the two ships share a part: the pad 5.4 (052D
          4.8), the bridge roof 18.5 (17.8), the mast dome's top 30.2
          (29.3).
     [P2] "Luyang II (Type 052C) Class Destroyer.JPG" -- Lanzhou from the
          port bow, high: the four array faces on the corners of the
          bridge block, the 01-level deckhouse with the Type 730 ahead of
          the bridge, the black-capped funnel, the Yagi on its own tower,
          the hangar block with the second Type 730.
     [P3] "Chinese Navy Guided-Missile Destroyer Xian (153) Departs Joint
          Base Pearl Harbor-Hickam ... 160804-N-IU636-106.jpg" -- Xi'an
          (153, 052C) from the port bow: the YJ-62 tubes between the Yagi
          tower and the hangar, trained athwartships; the two domes abreast
          the Yagi tower; the big black anchor recess.
     [P4] "CNS Haikou (DDG-171) in Rim of the Pacific (RIMPAC) Exercise
          2014.jpg" -- Haikou nearly bow-on: the tumblehome of the
          superstructure sides, the bridge block narrower than the hull.

   MEASURED OFF [P1] (x = 77.5 - (px - 85) * 0.1071; z = (wl - row) / 12.8):
     stem head 77.5 (10.5 m), the stem meeting the water at 65.5; deck edge
     9.4 at the gun, 8.6 at the forward deckhouse, 8.1 amidships; the gun
     house 42.4..46.8 (top 11.8), muzzle 51.6; the forward deckhouse
     19.7..28.7 (11.8) and its Type 730 21.3..25.3 (top 15.7); the bridge
     block from 19.7 (roof 18.5, glazing 17.0-17.8), its array faces
     9.3..14.9 x 11.3-16.4, its roof dome 8.2..11.9 (top 22.0); the mast
     tower -2.3..5.2, its dome 0.9..4.2 (top 30.2), the pole to 35.8; the
     block's after end -3.4; the funnel -7.3..-15.7 (14.4) and its black
     uptakes -8.2..-14.1 (17.0); the 01 casing to -34.3 (10.2); two domes
     -23.2..-25.9 (centre 11.7); the Yagi tower -29.2..-33.9 (14.3) and its
     array -27.9..-35.2 x 14.1-18.9; the YJ-62s -35.2..-45.9; the hangar
     block to -61.5 (roof 11.6) with the Type 730 -48.9..-51.9 (15.3); the
     pad 5.4 m to the transom at -77.5.

   NOT CONFIRMED -- estimated, not measured:
     - the vertical scale itself (above): a broadside photograph of a 052C
       was not found; heights carry about +-0.6 m;
     - every plan width (the photographs are side and bow views): the
       hull's half beam is the published 17 m; the superstructure's
       tumblehome and chamfers follow [P4] by eye;
     - the arrangement of the eight HHQ-9 revolvers (six forward in two rows
       of three, two aft ahead of the YJ-62s), drawn as flush round hatches;
     - the YJ-62 tube layout (two pairs a side);
     - everything below the waterline (keel line, shafts, screws, rudders,
       bilge keels, the bow sonar), from the published draught only.
   No pennant numbers, names, flags or stars.  The team colour is three
   small strips on roofs.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0.  The main
   gun is the group named "turret" (origin on its ring at the deck, gun
   along +X); the rest is baked one mesh per material.  A hidden "helipad"
   node marks the middle of the pad, as pla_navy_modern.js does.  The kit
   is pla_navy_modern.js's (itself from pla_type056.js).  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlaE00Destroyer = (function () {
  "use strict";
  var PI = Math.PI;

  /* ================================================================ KIT
     (js/hero/pla_navy_modern.js: textures, materials, primitives, the
     faceted frustum, the chamfered plan, the lofted hull and the baker) */
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
  /* hull plating: one tile is 24 m x 8 m; a welded stealth hull shows few seams */
  function hullTex(THREE) {
    return canvasTex(THREE, "K_HULL", 512, 256, function (g, w, h) {
      var R = rng(5205), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.08; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke(); }
      for (i = 0; i < 4; i++) { var xx = i * w / 4 + (i % 2) * 22; g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke(); }
      g.globalAlpha = 0.06;
      for (i = 0; i < 40; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 2 + R() * 4, 16 + R() * 70); }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "K_PLATE", 256, 256, function (g, w, h) {
      var R = rng(5217), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.06;
      for (i = 0; i < 26; i++) { g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000"; g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30); }
      g.globalAlpha = 1;
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "K_DECK", 256, 256, function (g, w, h) {
      var R = rng(5211), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, i * h / 6); g.lineTo(w, i * h / 6); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* louvres, glazing backs, cell covers, recesses: dark grille bars */
  function grilleTex(THREE) {
    return canvasTex(THREE, "K_GRILLE", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }
  var PAINT = { hull: 0x8c959b, sup: 0x959ea3, deck: 0x50575c };
  function makeMats(THREE, C, P) {
    P = P || PAINT;
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(P.hull, hullTex(THREE), 0.86),
      under: skin(0x4a1c16, hullTex(THREE), 0.9),
      sup:   skin(P.sup, plateTex(THREE), 0.86),
      deck:  skin(P.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      white: skin(0xc9ccca, plateTex(THREE), 0.8),
      array: skin(0x6c757b, plateTex(THREE), 0.7),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5c636a, 0.52, 0.55),
      gun:   metal(0x6d757a, 0.48, 0.45),
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
  function sphere(THREE, p, r, m, x, y, z, ws, hs) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, ws || 12, hs || 8), m);
    s.position.set(x, y, z); p.add(s); return s;
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
  /* a plan rectangle x0..x1, half width hw, corners chamfered (cfa aft,
     cff forward); CCW from above.  Edge k runs from point k to k+1:
     0 starboard side, 1 starboard-forward corner, 2 front, 3 port-forward
     corner, 4 port side, 5 port-aft corner, 6 after face, 7 starboard-aft */
  function chamf(x0, x1, hw, cfa, cff) {
    return [[x0 + cfa, -hw], [x1 - cff, -hw], [x1, -hw + cff], [x1, hw - cff],
            [x1 - cff, hw], [x0 + cfa, hw], [x0, hw - cfa], [x0, -hw + cfa]];
  }
  /* a patch lying ON face k of a frustum (lo at z0, hi at z1), from
     fraction s0 to s1 along the edge and from height za to zb, stood off
     the face by off: the flat array faces, the glazing, the louvres */
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
  /* rings lofted along X (each ring a closed list of [y,z]); capped ends */
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
  /* a flat plate in the XY plane from a plan polygon, at height z (both
     faces), and its edge band down to z - th */
  function plate(THREE, p, m, poly, z, th, mSide) {
    var shp = new THREE.Shape(), i, n = poly.length;
    shp.moveTo(poly[0][0], poly[0][1]);
    for (i = 1; i < n; i++) shp.lineTo(poly[i][0], poly[i][1]);
    var gT = new THREE.ShapeGeometry(shp); gT.translate(0, 0, z);
    var mT = new THREE.Mesh(gT, m); p.add(mT);
    if (th > 0) {
      var gB = new THREE.ShapeGeometry(shp); gB.rotateX(PI); gB.scale(1, -1, 1); gB.translate(0, 0, z - th);
      /* rotateX(PI) flips z and y; scale y back so the plan matches; the
         winding is now reversed, so the face looks down */
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
  /* One mesh per material: bake every mesh under root into merged geometry */
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
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 14, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    if (tilt) dg.rotateY(-tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
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
    }
  }

  /* ======================================================= LOFTED HULL
     The pla_type056.js hull generalised.  H.STA rows: x, half beam at the
     deck edge, half beam at the waterline, bottom z on the centreline,
     bilge fullness; H.deckZ(x) the deck-edge height; XS0/XS1 the transom
     and the stem head, XWL the stem at the waterline, XST the transom's
     foot; H.fl the flare exponent above the water (1 straight, >1 the
     concave flare that opens out near the deck), H.stemP the stem's. */
  function makeHull(H) {
    var STA = H.STA, deckZ = H.deckZ, XS0 = H.XS0, XS1 = H.XS1, XWL = H.XWL, XST = H.XST;
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
      (H.extra || []).forEach(function (v) { a.push(v); });
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
        var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1), L = (z0 + z1) / 2 >= -0.3 ? P.hi : P.lo;
        L[0].push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
        for (k = 0; k < 6; k++) L[1].push(L[0][L[0].length - 18 + k * 3 + 1] / 24, L[0][L[0].length - 18 + k * 3 + 2] / 8);
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
          if (prev) strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt, x, y, z + hgt, 0.024, 3);
          prev = [x, y, z];
        }
      }
    }
    return { W: W, zBot: zBot, deckZ: deckZ, halfTop: halfTop, shellBand: shellBand,
             deckSheet: deckSheet, transom: transom, railRun: railRun, edgeY: edgeY, pick: pick };
  }

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

  /* ==================================================== WEAPONS [P1-P3] */
  /* 100 mm H/PJ-87 at rest pointing +X, origin on the ring at the deck:
     a faceted gun house 4.4 m long and 2.4 m tall [P1], the barrel's
     muzzle 6.8 m ahead of the ring */
  function gun100(THREE, g, T) {
    var L = 4.4, hw = 1.55, h = 2.4;
    cylZ(THREE, g, 1.45, 1.55, 0.3, 16, T.sup, -0.1, 0, 0.15);
    var lo = [[-L * 0.5, -hw], [L * 0.1, -hw], [L * 0.5, -hw * 0.5], [L * 0.5, hw * 0.5], [L * 0.1, hw], [-L * 0.5, hw]];
    var hi = [[-L * 0.45, -hw * 0.72], [-L * 0.05, -hw * 0.72], [L * 0.2, -hw * 0.4], [L * 0.2, hw * 0.4], [-L * 0.05, hw * 0.72], [-L * 0.45, hw * 0.72]];
    frustum(THREE, g, T.sup, lo, 0.3, hi, h);
    box(THREE, g, 0.2, 0.7, 0.8, T.dark, L * 0.46, 0, h * 0.5);
    cylX(THREE, g, 0.2, 0.24, 0.9, 10, T.gun, L * 0.5 + 0.4, 0, h * 0.5);
    cylX(THREE, g, 0.075, 0.09, 4.6, 8, T.gun, L * 0.5 + 0.85 + 2.3, 0, h * 0.5, true);
    return g;
  }
  /* Type 730 at rest pointing +X: round base, white housing, the gatling in
     its nose, an EO box on its side [P1][P2] */
  function ciws(THREE, g, T) {
    cylZ(THREE, g, 1.2, 1.3, 0.6, 14, T.sup, 0, 0, 0.3);
    frustum(THREE, g, T.white, chamf(-1.3, 1.0, 0.95, 0.3, 0.5), 0.6, chamf(-1.2, 0.7, 0.75, 0.25, 0.4), 2.4);
    cylX(THREE, g, 0.2, 0.22, 2.0, 8, T.gun, 1.8, 0, 1.3);
    box(THREE, g, 0.5, 0.35, 0.45, T.white, 0, 1.05, 1.9);
    sphere(THREE, g, 0.45, T.white, -0.6, 0, 2.6, 10, 6);
    return g;
  }
  /* an HHQ-9 revolver cell: a flush round hatch plate (NOT CONFIRMED layout) */
  function revolver(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 1.25, 1.25, 0.16, 16, T.deck, x, y, z + 0.08);
    cylZ(THREE, g, 1.05, 1.05, 0.04, 16, T.dark, x, y, z + 0.17);
  }

  /* ========================================================= THE HULL
     H.STA rows: x, half beam at the deck edge, half beam at the waterline,
     keel z, bilge fullness.  Deck edge [P1]; half beam the published 17 m;
     draught the published 6 m. */
  var XPAD = -61.5, PADZ = 5.4;
  var H52C = {
    XS0: -77.5, XS1: 77.5, XWL: 65.5, XST: -76.6, step: 2.0, fl: 1.0, extra: [XPAD - 0.3, XPAD, 19.7, 28.7],
    deckZ: function (x) {
      if (x < XPAD - 0.3) return PADZ;
      if (x < XPAD) return PADZ + 2.7 * (x - XPAD + 0.3) / 0.3;
      if (x < 20) return 8.1;
      if (x < 44) return 8.1 + 1.3 * (x - 20) / 24;
      return 9.4 + 1.1 * Math.pow((x - 44) / 33.5, 1.6);
    },
    STA: [
      [-77.5, 7.70, 6.60, -0.60, 3.0],
      [-76.6, 7.80, 6.80, -1.20, 3.0],
      [-70.0, 8.30, 7.60, -3.60, 3.0],
      [-50.0, 8.50, 8.00, -5.70, 3.2],
      [-10.0, 8.50, 8.10, -6.00, 3.4],
      [ 10.0, 8.50, 8.10, -6.00, 3.2],
      [ 30.0, 8.20, 7.30, -5.90, 2.6],
      [ 45.0, 7.40, 5.60, -5.60, 2.1],
      [ 55.0, 6.20, 3.60, -5.00, 1.8],
      [ 61.0, 5.00, 2.00, -4.00, 1.6],
      [ 65.5, 4.10, 0.00,  0.00, 1.3],
      [ 71.0, 2.50, 0.00,  0.00, 1.2],
      [ 77.5, 0.15, 0.00,  0.00, 1.2]
    ]
  };

  /* ================================================================ BUILD */
  function build(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), Hh = makeHull(H52C), s, i, k, x;
    var DK = 8.1;
    g.add(Hh.shellBand(THREE, T.under, -7, -0.3, 5));
    g.add(Hh.shellBand(THREE, T.hull, -0.3, 11.0, 7));
    Hh.transom(THREE, g, T.hull, T.under);
    g.add(Hh.deckSheet(THREE, T.deck, H52C.XS0, H52C.XS1));

    /* bow: the big dark anchor recess in the flare [P1][P3], the rail round
       the forecastle, a breakwater, windlasses, the jackstaff */
    for (s = -1; s <= 1; s += 2) {
      var ar = box(THREE, g, 3.0, 0.12, 3.0, T.dark, 67.0, s * (Hh.W(67.0, 6.0) + 0.03), 6.0);
      ar.rotation.y = PI / 4; ar.rotation.z = -s * 0.45;
      strut(THREE, g, T.sup, 38.5, s * 4.6, Hh.deckZ(38.5) + 0.4, 41.0, s * 0.3, Hh.deckZ(41) + 0.4, 0.4, 4);
      cylZ(THREE, g, 0.4, 0.45, 0.5, 8, T.metal, 58.0, s * 1.4, Hh.deckZ(58) + 0.25);
    }
    Hh.railRun(THREE, g, T, 19.9, 76.6, 2.6, 1.0);
    Hh.railRun(THREE, g, T, -76.8, XPAD - 0.5, 2.6, 1.0);
    strut(THREE, g, T.metal, 76.6, 0, Hh.deckZ(76.6), 76.6, 0, Hh.deckZ(76.6) + 2.6, 0.05, 4);

    /* six HHQ-9 revolvers forward, two rows of three (NOT CONFIRMED) */
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2)
      revolver(THREE, g, T, 30.6 + i * 3.0, s * 1.5, Hh.deckZ(30.6 + i * 3.0));

    /* forward deckhouse 19.7..28.7, roof 11.8, its Type 730 [P1][P2] */
    var fdLo = chamf(19.0, 28.7, 6.8, 0.4, 2.6), fdHi = chamf(19.0, 28.0, 6.1, 0.3, 2.2);
    frustum(THREE, g, T.sup, fdLo, DK - 0.05, fdHi, 11.8);
    var cw = new THREE.Group(); cw.position.set(23.3, 0, 11.8); ciws(THREE, cw, T); g.add(cw);
    roofRail(THREE, g, T, [[19.6, 5.7], [25.6, 5.7], [27.6, 3.6], [27.6, -3.6], [25.6, -5.7], [19.6, -5.7]], 11.8, 0.9);

    /* the bridge block: foot -3.4..19.7, roof 18.5, tumblehome [P1][P4] */
    var ZB = 18.5;
    var bLo = chamf(-3.4, 19.7, 7.9, 1.0, 4.2), bHi = chamf(-2.6, 17.6, 6.2, 0.8, 3.0);
    frustum(THREE, g, T.sup, bLo, DK - 0.05, bHi, ZB);
    [1, 2, 3].forEach(function (k2) { facePatch(THREE, g, T.glass, bLo, DK - 0.05, bHi, ZB, k2, 0.05, 0.95, 17.0, 17.8, 0.12); });
    [0, 4].forEach(function (k2) { facePatch(THREE, g, T.glass, bLo, DK - 0.05, bHi, ZB, k2, 0.74, 0.97, 17.0, 17.8, 0.12); });
    /* the four Type 346 faces: on the forward corners [P1][P2] and the
       after corners (the after pair NOT CONFIRMED in position) */
    [1, 3].forEach(function (k2) { facePatch(THREE, g, T.array, bLo, DK - 0.05, bHi, ZB, k2, 0.06, 0.94, 11.3, 16.4, 0.15); });
    [5, 7].forEach(function (k2) { facePatch(THREE, g, T.array, bLo, DK - 0.05, bHi, ZB, k2, 0.06, 0.94, 12.6, 15.6, 0.15); });
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) box(THREE, g, 1.0, 0.06, 2.0, T.dark, 0.5 + i * 3.6, s * 7.75, DK + 1.1);
    /* the roof dome 8.2..11.9 (top 22.0) and the small fittings [P1] */
    cylZ(THREE, g, 1.1, 1.3, 0.6, 12, T.sup, 10.0, 0, ZB + 0.3);
    sphere(THREE, g, 1.85, T.white, 10.0, 0, ZB + 1.7, 16, 10);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.35, 0.4, 1.0, 8, T.white, 15.4, s * 3.4, ZB + 0.5);
      sphere(THREE, g, 0.45, T.white, 15.4, s * 3.4, ZB + 1.25);
      strut(THREE, g, T.metal, 16.2, s * 2.0, ZB, 16.2, s * 2.0, ZB + 4.2, 0.04, 4);
    }
    roofRail(THREE, g, T, [[-2.2, 5.9], [14.8, 5.9], [17.3, 3.4], [17.3, -3.4], [14.8, -5.9], [-2.2, -5.9]], ZB, 0.9);

    /* the mast tower -2.3..5.2 up from the roof, its dome (top 30.2), the
       pole to 35.8, two yards [P1][P2] */
    frustum(THREE, g, T.sup, chamf(-2.3, 5.2, 2.9, 0.7, 0.9), ZB - 0.05, chamf(1.2, 3.8, 1.0, 0.3, 0.3), 26.5);
    cylZ(THREE, g, 0.8, 0.9, 0.5, 12, T.sup, 2.5, 0, 26.7);
    sphere(THREE, g, 1.65, T.white, 2.5, 0, 28.55, 16, 10);
    box(THREE, g, 0.2, 7.2, 0.18, T.metal, 2.0, 0, 23.4);
    box(THREE, g, 0.2, 4.6, 0.16, T.metal, 2.4, 0, 25.6);
    strut(THREE, g, T.metal, 1.2, 0, 24.0, 1.2, 0, 35.8, 0.12, 6);
    box(THREE, g, 0.12, 2.4, 0.12, T.metal, 1.2, 0, 33.6);
    for (s = -1; s <= 1; s += 2) { cylZ(THREE, g, 0.4, 0.5, 1.1, 8, T.white, 4.4, s * 2.6, ZB + 0.55); sphere(THREE, g, 0.5, T.white, 4.4, s * 2.6, ZB + 1.4); }

    /* funnel -7.3..-15.7 (14.4), louvres, the black uptakes to 17.0 [P1] */
    var fLo = chamf(-15.7, -3.0, 4.8, 0.6, 0.8), fHi = chamf(-15.4, -6.9, 3.9, 0.5, 0.6);
    frustum(THREE, g, T.sup, fLo, DK - 0.05, fHi, 14.4);
    [0, 4].forEach(function (k2) { facePatch(THREE, g, T.dark, fLo, DK - 0.05, fHi, 14.4, k2, 0.1, 0.4, 11.0, 13.8, 0.12); });
    frustum(THREE, g, T.dark, chamf(-14.1, -8.2, 2.4, 0.4, 0.4), 14.35, chamf(-14.0, -8.3, 2.2, 0.4, 0.4), 17.0);
    /* the 01 casing to -34.3, roof 10.2, doors in its sides */
    var adLo = chamf(-34.3, -3.0, 7.9, 0.8, 0.4), adHi = chamf(-34.1, -3.0, 7.6, 0.7, 0.3);
    frustum(THREE, g, T.sup, adLo, DK - 0.05, adHi, 10.2);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) box(THREE, g, 0.9, 0.06, 1.2, T.dark, -31 + i * 4.6, s * 7.85, 9.2);
    /* the two domes abreast -24.5 [P1][P3] */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.6, 0.7, 0.4, 10, T.sup, -24.5, s * 3.2, 10.4);
      sphere(THREE, g, 1.3, T.white, -24.5, s * 3.2, 11.7, 14, 10);
    }
    /* the Type 517 tower -29.2..-33.9 (14.3) and its Yagi [P1][P2] */
    frustum(THREE, g, T.sup, chamf(-33.9, -29.2, 2.2, 0.4, 0.4), 10.15, chamf(-32.6, -30.4, 1.0, 0.2, 0.2), 14.3);
    strut(THREE, g, T.metal, -31.5, 0, 14.3, -31.5, 0, 16.4, 0.12, 6);
    box(THREE, g, 7.3, 0.14, 0.14, T.metal, -31.55, 0, 16.4);
    for (i = 0; i < 6; i++) {
      x = -35.0 + i * 1.4;
      strut(THREE, g, T.metal, x, 0, 14.1, x, 0, 18.9, 0.04, 3);
    }
    box(THREE, g, 7.3, 0.08, 0.08, T.metal, -31.55, 0, 18.8);
    box(THREE, g, 7.3, 0.08, 0.08, T.metal, -31.55, 0, 14.2);
    /* the two after HHQ-9 revolvers ahead of the YJ-62s (NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) revolver(THREE, g, T, -36.8, s * 1.6, 10.2);
    /* YJ-62: two pairs of tubes a side, trained outboard [P3] */
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      var yj = new THREE.Group(); yj.position.set(-40.2 - k * 3.6, s * 4.6, 10.2); yj.rotation.z = s * 1.2;
      box(THREE, yj, 1.0, 1.0, 0.8, T.sup, 0, 0, 0.4);
      var tb = new THREE.Group(); tb.position.set(0, 0, 1.2); tb.rotation.y = -0.32; yj.add(tb);
      for (i = -1; i <= 1; i += 2) cylX(THREE, tb, 0.42, 0.42, 7.0, 10, T.white, 0.4, i * 0.47, 0);
      box(THREE, tb, 0.25, 2.0, 1.0, T.sup, 0.4, 0, -0.1);
      g.add(yj);
    }
    /* hangar block -46.0..-61.5, roof 11.6, the door down to the pad, the
       second Type 730 on its roof [P1][P2] */
    var hLo = chamf(XPAD, -46.0, 8.25, 0.3, 1.0), hHi = chamf(XPAD + 0.2, -46.3, 7.5, 0.3, 0.8);
    frustum(THREE, g, T.sup, hLo, DK - 0.05, hHi, 11.6);
    box(THREE, g, 0.3, 5.2, 4.6, T.dark, XPAD - 0.22, 0, PADZ + 2.3);
    var cw2 = new THREE.Group(); cw2.position.set(-50.4, 0, 11.6); cw2.rotation.z = PI; ciws(THREE, cw2, T); g.add(cw2);
    roofRail(THREE, g, T, [[-46.6, 7.2], [XPAD + 0.4, 7.2], [XPAD + 0.4, -7.2], [-46.6, -7.2]], 11.6, 0.9);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 11.0, 0.06, 1.0, T.dark, -54.0, s * 8.2, 9.2);
      var by = s * (Hh.W(-53.0, 6.6) + 0.02);
      box(THREE, g, 7.0, 0.08, 2.6, T.dark, -53.0, by, 6.6);
    }

    /* the pad: touchdown circle, lines [P2] */
    var tc = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.1, 3, 32), T.white);
    tc.scale.z = 0.25; tc.position.set(-69.5, 0, PADZ + 0.03); g.add(tc);
    box(THREE, g, 15.0, 0.16, 0.03, T.white, -69.5, 0, PADZ + 0.02);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 15.6, 0.14, 0.03, T.white, -69.5, s * 7.0, PADZ + 0.02);

    /* underwater gear: two shafts, screws, two rudders, bilge keels (NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.24, 0.24, 18.0, 8, T.metal, -57.0, s * 3.2, -4.4);
      strut(THREE, g, T.metal, -63.0, s * 3.2, -4.4, -63.0, s * 2.0, -2.6, 0.14, 4);
      cylX(THREE, g, 0.34, 0.48, 1.0, 8, T.metal, -66.4, s * 3.2, -4.4);
      for (i = 0; i < 5; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 1.6), T.metal);
        bl.position.set(-66.4, s * 3.2, -4.4); bl.rotation.x = i * 2 * PI / 5 + 0.3;
        bl.translateZ(0.95); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 3.0, 0.26, 3.2, T.metal, -70.0, s * 3.2, -3.0);
      box(THREE, g, 34.0, 0.08, 0.6, T.under, -10.0, s * (Hh.W(-10, -4.6) + 0.15), -4.6);
    }

    /* team: small strips on up-facing roofs */
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -12.0, 0, 17.02);
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -56.0, 0, 11.62);
    box(THREE, g, 1.6, 0.8, 0.04, T.team, -76.0, 0, PADZ + 0.03);

    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(44.6, 0, Hh.deckZ(44.6)); gun100(THREE, tw, T);
    return finish(THREE, g, tw, [-69.5, 0, PADZ]);
  }

  return { build: build };
})();

/* Registration: len is the drawn overall length, the published 155 m. */
UNIT_MODELS["pla_e00_destroyer"] = {
  len: 155.0,
  build: function (THREE, M, C) { return HeroPlaE00Destroyer.build(THREE, M, C); }
};
