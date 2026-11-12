/* ====== js/hero/roc_e80_destroyer.js - HERO MODEL: Gearing FRAM I =======
   A Gearing class destroyer after the FRAM I rebuild, as the ROC navy
   received them (the Chao Yang / Wu Chin hulls).  Global HeroGearingFram,
   build(THREE, M, C); keys roc_e80_destroyer (here) and roc_e60_destroyer
   (js/hero/roc_kpa_reuse.js calls HeroGearingFram.build).

   REBUILD (2026-11).  The old file drew this in 367 separate meshes and
   painted the ROC hull number "912" on the bow; plain paint now (no
   numbers), one mesh per material (13 draw calls), and the ship re-measured
   off one broadside photograph.  Kept: the global, build(), both keys, the
   "turret" group (mount 51), the published length and beam, the two
   Mk 38 twin 5 in/38 mounts, the SQS-23 dome.  Corrected off [R1]: mount 51
   sits at 39.8 (was 36.5), the forward superstructure starts at 25.7 (was
   31.9), FRAM I keeps BOTH stacks (the old file had one stack and a
   lattice), the ASROC launcher stands BETWEEN the stacks (it was ahead of
   the first), the hangar is -14.1..-25.8 with its roof 11.1 m up (it was
   -17.2..-30.4 at 8.75), and the sheer is lower (stem 6.4 m, was 8.7).

   PUBLISHED FIGURES (en.wikipedia "Gearing-class destroyer", raw wikitext
   read 2026-11-12): length 390.5 ft (119.0 m), beam 40.9 ft (12.47 m),
   draft 14.3 ft (4.36 m).  FRAM I: mount 52 and the torpedo tubes landed,
   ASROC Mk 112, two Mk 32 triple tubes, a DASH hangar and pad, SPS-37 or
   SPS-40 air search, SQS-23 sonar.

   REFERENCES (Wikimedia Commons, fetched at 1600 px; grids laid over them
   with PIL, scratchpad/q_reb3):
     [R1] "Gearing class destroyers before and after FRAM modernization.jpg"
          LOWER half: USS Rowan (DD-782) after FRAM I, PORT broadside, bow
          left, level.  Stem x 36, stern x 1571: 1535 px = 119.0 m
          (0.0776 m/px, 12.9 px/m).  Every station along the ship and every
          height above the deck is read off it (heights by the same 12.9
          px/m from the main deck edge amidships, row 932).
     [R2] the same file, UPPER half: USS Sarsfield (DD-837) as built, port
          broadside, 13.15 px/m: the freeboard, read where the waterline
          shows (the bow wave hides it on [R1]): stem head 6.3 m, amidships
          3.8, at the stern 2.5.
   MEASURED OFF [R1] (x = 59.5 - (px - 36) * 0.0776):
     mount 51 house 37.2..42.5 (3.0 m over the deck), muzzle 45.1; a low
     deckhouse in the old mount 52 position 31.5..35.0 (top 8.5); the 01
     deckhouse from 25.7 (roof 7.6 forward, 6.8 amidships); the bridge
     block 17.7..25.9 (pilothouse roof 12.1, director 13.8); the tripod
     mast's foot 10.7..13.7, its yard 27.6, its pole 35.0, the SPS-37/40
     face ahead of it 13.7..17.7 x 21.5-26.0; the forward stack 6.4..9.2
     (top 16.8); ASROC -1.3..4.5 (top 9.2); a small deckhouse -5.2..-7.5
     (10.7); the after stack -9.5..-12.6 (14.8); the hangar -14.1..-25.8
     (11.1) with the after mast at -20.8 (20.6); the DASH pad -25.8..-38.4
     at the 01 level; mount 53 -39.3..-45.5; the stern -59.5.

   NOT CONFIRMED -- estimated, not measured:
     - every plan width (the references are side views): the hull's half
       beams are the published beam; the deckhouses' by eye;
     - the pad drawn at the 01 level on open stanchions (it reads so on
       [R1]; its structure underneath is not seen);
     - the low deckhouse in the mount 52 position (not identified);
     - the stem at the waterline (hidden by the bow wave on [R1]);
     - everything below the waterline (keel, dome, shafts, screws,
       rudders) from the published draught only.
   No hull numbers, names or flags.  The team colour is three small strips.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0.  Mount 51
   is the group named "turret" (origin on its ring at the deck, guns +X);
   everything else is baked one mesh per material.  A hidden "helipad" node
   marks the middle of the DASH pad.  The kit is js/hero/pla_navy_modern.js's.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroGearingFram = (function () {
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

  /* 1960s USN haze grey and deck grey (by eye; [R1] is monochrome) */
  var GPAINT = { hull: 0x848e96, sup: 0x8d979f, deck: 0x4e545a };

  /* ======================================== Mk 38 twin 5 in/38 [R1]
     at rest pointing +X, origin on the ring at the deck: a flat-sided gun
     house 5.0 m long, 3.0 m over the deck, raked face, two barrels */
  function gunMount(THREE, g, T) {
    var s;
    cylZ(THREE, g, 2.0, 2.1, 0.3, 16, T.sup, 0, 0, 0.15);
    var lo = [[-2.5, -1.8], [1.6, -1.8], [2.4, -1.2], [2.4, 1.2], [1.6, 1.8], [-2.5, 1.8]];
    var hi = [[-2.3, -1.55], [0.9, -1.55], [1.5, -1.0], [1.5, 1.0], [0.9, 1.55], [-2.3, 1.55]];
    frustum(THREE, g, T.sup, lo, 0.3, hi, 3.0);
    box(THREE, g, 1.6, 1.3, 0.45, T.sup, -0.7, 0, 3.2);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.9, 0.5, 0.5, T.sup, 1.0, s * 1.35, 3.1);
      cylX(THREE, g, 0.42, 0.42, 0.9, 10, T.white, 2.6, s * 0.64, 1.9);
      cylX(THREE, g, 0.17, 0.13, 4.6, 10, T.gun, 5.3, s * 0.64, 1.9);
    }
    return g;
  }

  /* ========================================================= THE HULL
     Rows: x, half beam at the deck edge, at the waterline, keel z, bilge
     fullness.  Sheer [R1][R2]; half beam the published 12.47 m beam;
     draft the published 4.36 m. */
  var XS = -59.5, XB = 59.5;
  function sheer(x) {
    if (x < -20) return 2.6 + 1.2 * (x - XS) / (-20 - XS);
    if (x < 12) return 3.8;
    if (x < 42) return 3.8 + 2.0 * Math.pow((x - 12) / 30, 1.3);
    return 5.8 + 0.6 * (x - 42) / 17.5;
  }
  var HG = {
    XS0: XS, XS1: XB, XWL: 56.5, XST: -58.6, step: 1.6, fl: 1.4, stemP: 0.7, extra: [25.7, 37.2, -25.8],
    deckZ: sheer,
    STA: [
      [-59.5, 4.05, 3.40, -1.00, 2.4],
      [-56.0, 4.55, 4.00, -2.40, 2.6],
      [-47.0, 5.55, 5.05, -3.95, 2.8],
      [-34.0, 6.05, 5.70, -4.36, 3.0],
      [-17.0, 6.22, 6.00, -4.36, 3.2],
      [  1.0, 6.20, 6.00, -4.36, 3.2],
      [ 19.0, 5.85, 5.40, -4.32, 2.8],
      [ 34.0, 5.15, 4.20, -3.95, 2.2],
      [ 47.0, 3.75, 2.40, -2.95, 1.8],
      [ 52.0, 2.80, 1.40, -2.05, 1.6],
      [ 56.5, 1.80, 0.00,  0.00, 1.4],
      [ 58.4, 0.70, 0.00,  0.00, 1.3],
      [ 59.5, 0.15, 0.00,  0.00, 1.2]
    ]
  };

  /* ================================================================ BUILD */
  function build(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C, GPAINT)), Hh = makeHull(HG), s, i, x;
    var Z1F = 7.6, Z1A = 6.8, ZPH = 12.1, PADZ = 6.6;
    g.add(Hh.shellBand(THREE, T.under, -5, -0.25, 5));
    g.add(Hh.shellBand(THREE, T.hull, -0.25, 7.0, 6));
    Hh.transom(THREE, g, T.hull, T.under);
    g.add(Hh.deckSheet(THREE, T.deck, XS, XB));

    /* forecastle: rails, windlass, anchors, breakwater, jackstaff */
    Hh.railRun(THREE, g, T, 26.0, 58.6, 2.4, 1.0);
    Hh.railRun(THREE, g, T, -58.6, -26.0, 2.4, 1.0);
    box(THREE, g, 2.4, 3.6, 0.9, T.metal, 50.5, 0, Hh.deckZ(50.5) + 0.45);
    for (s = -1; s <= 1; s += 2) {
      var an = box(THREE, g, 1.5, 0.3, 1.8, T.dark, 53.5, s * (Hh.W(53.5, 4.6) + 0.06), 4.6);
      an.rotation.z = -s * 0.5;
      strut(THREE, g, T.sup, 34.0, s * 4.4, Hh.deckZ(34) + 0.45, 36.0, s * 0.3, Hh.deckZ(36) + 0.45, 0.25, 4);
    }
    strut(THREE, g, T.metal, 58.4, 0, Hh.deckZ(58.4), 58.4, 0, Hh.deckZ(58.4) + 3.4, 0.05, 4);
    strut(THREE, g, T.metal, -58.6, 0, Hh.deckZ(-58.6), -58.6, 0, Hh.deckZ(-58.6) + 3.0, 0.05, 4);

    /* the low deckhouse in the old mount 52 position, 31.5..35.0 (8.5) */
    frustum(THREE, g, T.sup, chamf(31.5, 35.0, 1.8, 0.3, 0.5), Hh.deckZ(31.5) - 0.05, chamf(31.6, 34.8, 1.6, 0.3, 0.4), 8.5);

    /* the 01 deckhouse: 25.7 aft to the hangar, roof 7.6 forward of the
       bridge's after end and 6.8 abaft it [R1] */
    frustum(THREE, g, T.sup, chamf(15.5, 25.7, 4.5, 0.3, 2.2), 3.75, chamf(15.5, 25.6, 4.4, 0.3, 2.1), Z1F);
    frustum(THREE, g, T.sup, chamf(-14.1, 15.6, 3.4, 0.4, 0.4), 3.75, chamf(-14.0, 15.6, 3.3, 0.4, 0.4), Z1A);
    /* the bridge block 17.7..25.9, pilothouse roof 12.1, faceted front */
    var bLo = chamf(17.7, 25.2, 3.4, 0.3, 1.6), bHi = chamf(17.7, 24.6, 3.1, 0.3, 1.4);
    frustum(THREE, g, T.sup, bLo, Z1F - 0.05, bHi, ZPH);
    [1, 2, 3].forEach(function (k) { facePatch(THREE, g, T.glass, bLo, Z1F - 0.05, bHi, ZPH, k, 0.05, 0.95, 10.7, 11.6, 0.1); });
    [0, 4].forEach(function (k) { facePatch(THREE, g, T.glass, bLo, Z1F - 0.05, bHi, ZPH, k, 0.7, 0.97, 10.7, 11.6, 0.1); });
    for (s = -1; s <= 1; s += 2) box(THREE, g, 2.8, 1.6, 0.2, T.sup, 22.6, s * 3.9, ZPH - 1.2);
    /* open bridge and the Mk 37 director over it (top 13.8) */
    frustum(THREE, g, T.sup, chamf(18.2, 23.8, 2.4, 0.3, 1.0), ZPH - 0.05, chamf(18.2, 23.6, 2.3, 0.3, 0.9), ZPH + 0.7);
    var dir = new THREE.Group(); dir.position.set(22.3, 0, ZPH + 0.7); g.add(dir);
    cylZ(THREE, dir, 1.0, 1.1, 0.4, 12, T.sup, 0, 0, 0.2);
    frustum(THREE, dir, T.sup, chamf(-1.3, 1.4, 1.2, 0.3, 0.4), 0.4, chamf(-1.1, 1.0, 1.0, 0.3, 0.3), 2.2);
    cylZ(THREE, dir, 0.22, 0.22, 4.2, 8, T.metal, 0, 0, 1.4).rotation.x = PI / 2;
    dish(THREE, dir, T.metal, 0.95, 0.4, 0, 2.8, 0.3);
    /* the flag deck abaft the bridge 15.8..20.7 (13.3 with its fittings) */
    frustum(THREE, g, T.sup, chamf(15.8, 17.8, 2.2, 0.3, 0.3), Z1F - 0.05, chamf(15.9, 17.7, 2.1, 0.3, 0.3), 10.4);

    /* the tripod mast: foot 10.7..13.7, yard 27.6, pole to 35.0 [R1] */
    var MX = 11.4;
    strut(THREE, g, T.metal, 13.4, 0, Z1A, MX + 0.2, 0, 28.2, 0.32, 6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 10.4, s * 2.8, Z1A, MX, s * 0.2, 25.0, 0.26, 5);
    strut(THREE, g, T.metal, MX + 0.1, 0, 26.0, MX - 0.2, 0, 35.0, 0.08, 4);
    strut(THREE, g, T.metal, MX, -3.6, 27.6, MX, 3.6, 27.6, 0.08, 4);
    for (i = 0; i < 2; i++) {
      var zz = 13 + i * 6, f = (zz - Z1A) / (25 - Z1A), yy = 2.8 * (1 - f) + 0.2 * f, xa = 10.4 + (MX - 10.4) * f, xf = 13.4 + (MX + 0.2 - 13.4) * (zz - Z1A) / (28.2 - Z1A);
      strut(THREE, g, T.metal, xa, yy, zz, xa, -yy, zz, 0.07, 4);
      for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, xa, s * yy, zz, xf, 0, zz, 0.07, 4);
    }
    box(THREE, g, 2.6, 3.2, 0.15, T.sup, MX + 0.6, 0, 20.4);
    /* the SPS-37/40 face ahead of the mast, 13.7..17.7 x 21.5-26.0, as an
       open grid (the bars) on its turntable */
    var ant = new THREE.Group(); ant.position.set(15.0, 0, 23.75); ant.rotation.z = 0.9; g.add(ant);
    for (i = 0; i < 6; i++) box(THREE, ant, 0.08, 5.4, 0.08, T.metal, 0, 0, -2.2 + i * 0.88);
    for (i = 0; i < 7; i++) box(THREE, ant, 0.08, 0.08, 4.5, T.metal, 0, -2.7 + i * 0.9, 0);
    strut(THREE, g, T.metal, MX + 0.6, 0, 20.5, 15.0, 0, 23.0, 0.1, 4);
    /* SPS-10 on its stalk above the yard */
    box(THREE, g, 0.3, 2.4, 0.5, T.metal, MX + 0.2, 0, 29.6);
    cylZ(THREE, g, 0.2, 0.2, 1.2, 6, T.metal, MX + 0.1, 0, 28.8);

    /* forward stack 6.4..9.2 (16.8) and after stack -9.5..-12.6 (14.8),
       grey with black caps [R1][R2] */
    var stk = [[7.8, 1.45, 1.25, 16.8], [-11.05, 1.6, 1.35, 14.8]];
    stk.forEach(function (q) {
      var p = cylZ(THREE, g, q[2], q[1], q[3] - 0.8 - Z1A, 16, T.sup, q[0], 0, (q[3] - 0.8 + Z1A) / 2);
      p.scale.set(1.0, 0.82, 1);
      var c = cylZ(THREE, g, q[2], q[2], 0.8, 16, T.dark, q[0], 0, q[3] - 0.4); c.scale.set(1.0, 0.82, 1);
    });
    /* ASROC Mk 112 between the stacks, -1.3..4.5, top 9.2 [R1] */
    box(THREE, g, 3.6, 3.4, 0.8, T.sup, 1.6, 0, Z1A + 0.4);
    var asr = new THREE.Group(); asr.position.set(1.6, 0, Z1A + 1.6); asr.rotation.y = -0.15; g.add(asr);
    box(THREE, asr, 5.4, 3.0, 1.5, T.sup, 0, 0, 0);
    for (i = 0; i < 4; i++) for (s = -1; s <= 1; s += 2)
      box(THREE, asr, 0.06, 0.62, 0.55, T.dark, 2.73, (i - 1.5) * 0.7, s * 0.36);
    /* the small deckhouse -5.2..-7.5 (10.7) */
    frustum(THREE, g, T.sup, chamf(-7.5, -5.2, 1.8, 0.3, 0.3), Z1A - 0.05, chamf(-7.4, -5.3, 1.7, 0.3, 0.3), 10.7);
    /* Mk 32 triple tubes, a bank each side abaft the forward stack */
    for (s = -1; s <= 1; s += 2) {
      var tt = new THREE.Group(); tt.position.set(-2.8, s * 3.6, Z1A); tt.rotation.z = s * 1.3; g.add(tt);
      cylZ(THREE, tt, 0.45, 0.5, 0.5, 8, T.metal, 0, 0, 0.25);
      [[0.38, 0.85], [-0.38, 0.85], [0, 1.5]].forEach(function (q) { cylX(THREE, tt, 0.33, 0.33, 3.2, 8, T.metal, 0, q[0], q[1]); });
    }
    /* boats in davits abreast the forward stack */
    for (s = -1; s <= 1; s += 2) {
      var bt = cylX(THREE, g, 0.9, 0.9, 7.0, 10, T.white, 6.0, s * 4.4, Z1A + 1.6); bt.scale.set(1, 1, 0.7);
      strut(THREE, g, T.metal, 9.2, s * 3.3, Z1A, 9.2, s * 4.9, Z1A + 2.8, 0.1, 4);
      strut(THREE, g, T.metal, 2.8, s * 3.3, Z1A, 2.8, s * 4.9, Z1A + 2.8, 0.1, 4);
    }

    /* the DASH hangar -14.1..-25.8 (11.1) and its after mast -20.8 [R1] */
    var hLo = chamf(-25.8, -14.1, 3.7, 0.3, 0.6), hHi = chamf(-25.7, -14.2, 3.55, 0.3, 0.5);
    frustum(THREE, g, T.sup, hLo, Z1A - 0.05, hHi, 11.1);
    box(THREE, g, 0.2, 5.4, 3.6, T.dark, -25.9, 0, Z1A + 1.9);
    strut(THREE, g, T.metal, -20.8, 0, 11.1, -20.8, 0, 20.6, 0.12, 6);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.45, 0.45, 1.3, 10, T.dark, -20.8, s * 1.2, 15.6);
    strut(THREE, g, T.metal, -20.8, -1.6, 15.0, -20.8, 1.6, 15.0, 0.06, 4);
    /* the 01-level casing under the hangar and pad, its open stanchioned
       sides aft (the pad structure NOT CONFIRMED) */
    frustum(THREE, g, T.sup, chamf(-38.4, -25.8, 4.6, 0.6, 0.3), sheer(-38.4) - 0.05, chamf(-38.4, -25.8, 4.5, 0.6, 0.3), PADZ - 0.25);
    plate(THREE, g, T.deck, polyCCW(chamf(-38.4, -25.8, 5.4, 0.8, 0.2)), PADZ, 0.25, T.sup);
    roofRail(THREE, g, T, [[-25.9, 5.3], [-38.0, 5.3], [-38.4, 4.5], [-38.4, -4.5], [-38.0, -5.3], [-25.9, -5.3]], PADZ, 0.9);
    var ring = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.09, 3, 30), T.white);
    ring.scale.z = 0.12; ring.position.set(-32.1, 0, PADZ + 0.002); g.add(ring);
    box(THREE, g, 10.0, 0.14, 0.02, T.white, -32.1, 0, PADZ + 0.006);

    /* mount 53 on the fantail, trained aft, -39.3..-45.5 [R1] */
    var m53 = new THREE.Group(); m53.position.set(-42.4, 0, sheer(-42.4)); m53.rotation.z = PI;
    gunMount(THREE, m53, T); g.add(m53);
    /* fantail: depth-charge racks NOT drawn (not seen); a reel */
    cylX(THREE, g, 0.8, 0.8, 2.0, 10, T.metal, -53.5, 0, sheer(-53.5) + 0.85);

    /* SQS-23 dome, shafts, screws, rudders (NOT CONFIRMED) */
    var dome = sphere(THREE, g, 1.0, T.under, 38.5, 0, -4.3, 14, 9); dome.scale.set(3.4, 1.7, 1.3);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.28, 0.28, 13.0, 8, T.metal, -41.5, s * 2.55, -3.1);
      strut(THREE, g, T.metal, -45.0, s * 2.55, -3.1, -45.0, s * 1.6, -1.6, 0.16, 4);
      cylX(THREE, g, 0.3, 0.42, 1.0, 8, T.metal, -48.4, s * 2.55, -3.1);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, 1.5), T.metal);
        bl.position.set(-48.4, s * 2.55, -3.1); bl.rotation.x = i * PI / 2 + 0.3;
        bl.translateZ(0.85); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.6, 0.26, 2.8, T.metal, -51.4, s * 2.1, -2.0);
      box(THREE, g, 26.0, 0.08, 0.5, T.under, -6.0, s * (Hh.W(-6, -3.4) + 0.12), -3.4);
    }

    /* team: small strips on roofs */
    box(THREE, g, 1.8, 1.0, 0.04, T.team, 20.0, 0, ZPH + 0.72);
    box(THREE, g, 3.0, 1.2, 0.04, T.team, -19.0, 0, 11.12);
    box(THREE, g, 1.0, 3.0, 0.04, T.team, -14.6, 0, 11.12);

    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(39.8, 0, sheer(39.8)); gunMount(THREE, tw, T);
    return finish(THREE, g, tw, [-32.1, 0, PADZ]);
  }

  return { build: build };
})();

/* Registration: len is the published overall length, 390 ft 6 in. */
UNIT_MODELS["roc_e80_destroyer"] = {
  len: 119.0,
  build: function (THREE, M, C) { return HeroGearingFram.build(THREE, M, C); }
};
