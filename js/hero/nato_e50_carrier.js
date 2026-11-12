/* ========= js/hero/nato_e50_carrier.js - HERO MODEL: USS Forrestal =======
   USS Forrestal (CVA-59) as completed in 1955, the e50 NATO carrier.
   Global HeroForrestal, build(THREE, M, C); key nato_e50_carrier.

   REBUILD (2026-11).  The old file drew her in 657 separate meshes, painted
   "59" on the deck and the island, and put the island well aft (-63..-31).
   Plain paint now (no numbers), one mesh per material (12 draw calls), and
   the plan re-measured off a vertical photograph: the island stands
   AMIDSHIPS (-21.5..+15.1), the three starboard lifts are one forward of it
   and two abaft it, the port lift at the forward end of the angled deck.
   Kept: the global, build(), the key, the "turret" group (the forward
   starboard 5 in/54 Mk 42), the open bow on brackets, the eight 5 in mounts
   on four sponsons, the deck clear of parked aircraft (render3d.js lays the
   deck park out itself, deckLayout/placeOn, off this model's height field).

   PUBLISHED FIGURES (en.wikipedia "Forrestal-class aircraft carrier", raw
   wikitext read 2026-11-12): length 326.1 m overall, 301.7 m waterline;
   beam 129 ft 4 in (39.4 m) waterline, 238 ft extreme; draft 35 ft 9 in
   (10.9 m); 8 x 5 in/54 Mk 42 as built; 60,000 / 81,000 t.

   REFERENCES (Wikimedia Commons; grids laid over them with PIL,
   scratchpad/q_reb3):
     [F1] "Overhead view of USS Forrestal (CVA-59) underway in the
          Mediterranean sea in May 1957.jpg" (1600 px) -- near-vertical,
          turned 189.9 deg so the bow is right and port up.  Stern x 262,
          bow x 1640: 1378 px = 326.1 m (4.226 px/m along).  Across, the
          photograph reads 7 per cent wider than along (it is not quite
          vertical), so widths are scaled by 4.49 px/m, the scale that puts
          the extreme width (port sponson to the starboard lifts, 345 px)
          at 252 ft (76.8 m, the class's usual extreme figure; the infobox's
          238 ft is the flight deck's).  The hull centreline is taken as the
          middle of the bow deck (row 747), between the two bow catapults.
          The deck outline, the island, the lifts, the 5 in sponsons, the
          catapults and the angle of the landing area are read off it.
     [F2] "US Navy 80-G-682046 USS Forrestal (CVA-59) underway on trials
          1955.jpg" -- oblique from the port bow, high: the OPEN bow with
          the deck carried on brackets, the island's two masts in its after
          half, the port 5 in sponsons under the forward end of the angled
          deck, the lift forward of the island.
     [F3] "USS Forrestal (CVA-59), starboard view, 1982.jpg" (1139 px) --
          nearly broadside from starboard, a little high: the flight deck's
          height (deck edge rows 228-245, waterline 295-322, about 3.4 px/m
          near the island: 21.5 m), the island block (14.7 m over the
          deck) and its funnel (20.6 m).  She was rebuilt by 1982 (hurricane
          bow, new mast and sensors), so only the hull, the deck height and
          the island's block and funnel are taken from it.
   MEASURED OFF [F1] (X = (px - 262) / 4.226 - 163.05, Y = (747 - row) / 4.49):
     bow deck +-18.3; port edge forward +18.9 to X 63.6, the angled-deck
     sponson's front 57.7..63.6, its edge +43.4 from 57.7 aft to -89.0, its
     after diagonal to +27.2 at -118.6, the stern +27.2..-11.8; starboard
     edge -11.8 aft of -104.4, -33.6 from there to 41.2 (the lifts and the
     island are in it), -20.3 forward; lifts -87.8, -43.4 and 30.0
     (starboard), 44.2 (port); the island -21.5..15.1 by -20.7..-33.6;
     5 in mounts at (71.5, 23.8), (92.7, 23.8), (-137, 30), (-122, 30),
     (-147, -16), (-124, -16) and the starboard forward pair near 74..88;
     the bow catapults at +12.7 and -11.8 from X 60; the landing area about
     6 deg to port (its lines read 5 to 8 deg).

   NOT CONFIRMED -- estimated, not measured:
     - the centreline (above) and so every width to about +-1.5 m; the
       stern's starboard corner is drawn at -13.0 (measured -11.8) so the
       deck covers the transom;
     - the flight deck's height, 21.5 m, to about +-1.5 m ([F3] is a 1982
       photograph at an angle);
     - the island's tiers between its block and funnel, its glazing, and
       the 1955 masts and radars (SPS-8 height finder, SPS-12 dish; [F2]
       shows where the masts stand, not how tall);
     - the 5 in sponsons' height (15.5 m), the gallery under the overhangs,
       the brackets, the open forecastle's height (13.5 m);
     - everything below the waterline (keel, four screws, rudders) from the
       published draft only.
   No hull numbers, names or flags (the 1955 ship had "59" on deck and
   island: left off).  The team colour is three small strips.

   DETAIL PASS (2026-11): catwalks with rails, rafts and lowered whips round
   the deck, the deck-edge gutter, the gallery deck's ports and frames, rows
   of scuttles, the anchors in their hawses, the forecastle's windlasses,
   bollards and rail, the fantail, sponson rails and lockers, the island's
   roof rails, ports, doors, louvres, wings, ladder, searchlights and whips,
   the boot-topping, a flared hull (fl 1.7), a weathered hull texture, and
   deck paint that is not a number (the white round-down, five wires and the
   barricade recess, lowered blast deflectors, fuel stations, tie-downs).
   13 draw calls.  The fittings' sizes are typical, NOT CONFIRMED.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0, flight deck
   at z = 21.5.  The forward starboard 5 in mount is the group named
   "turret"; everything else is baked one mesh per material.  The kit is
   js/hero/pla_navy_modern.js's.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroForrestal = (function () {
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
      /* weathering: rust runs from the scuttles and drains, salt bloom,
         a few patched plates in a fresher grey */
      for (i = 0; i < 34; i++) {
        var rx = R() * w, ry = R() * h * 0.7, rl = 20 + R() * 90;
        var gr = g.createLinearGradient(0, ry, 0, ry + rl);
        gr.addColorStop(0, "rgba(70,40,24,0.30)"); gr.addColorStop(1, "rgba(70,40,24,0)");
        g.fillStyle = gr; g.globalAlpha = 1; g.fillRect(rx, ry, 1.5 + R() * 2.5, rl);
      }
      g.globalAlpha = 0.07; g.fillStyle = "#ffffff";
      for (i = 0; i < 10; i++) g.fillRect(R() * w, R() * h, 30 + R() * 60, 10 + R() * 26);
      g.globalAlpha = 0.05; g.fillStyle = "#000000";
      for (i = 0; i < 12; i++) g.fillRect(R() * w, R() * h, 40 + R() * 80, 4 + R() * 10);
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
      /* the tie-down pad-eyes, a grid about 1.6 m square (8 m tile / 5),
         and the tyre streaks and oil of the deck park */
      g.globalAlpha = 0.32; g.fillStyle = "#000000";
      var tx, ty;
      for (tx = 0; tx < 5; tx++) for (ty = 0; ty < 5; ty++) {
        g.beginPath(); g.arc(25 + tx * w / 5, 25 + ty * h / 5, 2.4, 0, PI * 2); g.fill();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 14; i++) { g.fillRect(R() * w, R() * h, 70 + R() * 120, 1.5 + R() * 2); }
      g.globalAlpha = 0.10;
      for (i = 0; i < 8; i++) { g.beginPath(); g.ellipse(R() * w, R() * h, 4 + R() * 10, 3 + R() * 6, R() * 3, 0, PI * 2); g.fill(); }
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
      boot:  skin(0x16181a, hullTex(THREE), 0.9),
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

  /* 1950s haze grey, a dark flight deck (by eye; the references are
     monochrome) */
  var FPAINT = { hull: 0x7e8890, sup: 0x87919a, deck: 0x40454a };
  var FD = 21.5;                 /* flight deck surface [F3]              */
  var HULLTOP = 20.0;            /* the hull's top, under the deck slab   */

  /* the flight deck outline [F1], CCW from above (port is +Y) */
  var DECK = [
    [163.05, -16.0], [163.05, 16.0], [160.0, 18.3], [63.6, 18.9], [57.7, 43.4],
    [-89.0, 43.4], [-118.6, 27.2], [-163.05, 27.2], [-163.05, -13.0],
    [-104.4, -13.0], [-104.4, -33.6], [41.2, -33.6], [41.2, -20.3], [160.0, -18.4]
  ];
  var LIFTS = [[-87.8, -1], [-43.4, -1], [30.0, -1], [44.2, 1]];
  var ANG = 6 * PI / 180;        /* landing area to port [F1] */

  /* 5 in/54 Mk 42 at rest pointing +X, origin on its ring: a rounded gun
     house on a low barbette, one long tube (NOT CONFIRMED in detail) */
  function fiveInch(THREE, g, T) {
    cylZ(THREE, g, 2.3, 2.5, 0.8, 14, T.sup, 0, 0, 0.4);
    frustum(THREE, g, T.sup, chamf(-2.9, 2.6, 2.2, 0.8, 1.4), 0.8, chamf(-2.6, 1.6, 1.7, 0.6, 1.0), 3.4);
    cylX(THREE, g, 0.55, 0.62, 1.2, 10, T.gun, 2.8, 0, 2.1);
    cylX(THREE, g, 0.16, 0.2, 6.6, 8, T.gun, 6.6, 0, 2.15, true);
    return g;
  }

  var HF = {
    XS0: -152.0, XS1: 158.0, XWL: 150.5, XST: -150.5, step: 4.0, fl: 1.7, stemP: 0.75, extra: [128, 130],
    deckZ: function (x) { return x < 128 ? HULLTOP : x < 130 ? HULLTOP - 6.5 * (x - 128) / 2 : HULLTOP - 6.5; },
    STA: [
      [-152.0, 14.0, 11.0, -2.0, 2.4],
      [-146.0, 17.0, 14.5, -6.5, 2.6],
      [-136.0, 19.2, 17.5, -9.5, 2.8],
      [-110.0, 20.3, 19.4, -10.9, 3.2],
      [ -40.0, 20.5, 19.7, -10.9, 3.6],
      [  40.0, 20.5, 19.7, -10.9, 3.6],
      [  90.0, 20.0, 18.6, -10.9, 3.0],
      [ 115.0, 18.5, 15.5, -10.6, 2.4],
      [ 132.0, 15.5, 10.5, -9.6, 1.9],
      [ 143.0, 11.5,  5.5, -7.5, 1.6],
      [ 150.5,  7.0,  0.0,  0.0, 1.3],
      [ 155.0,  3.5,  0.0,  0.0, 1.2],
      [ 158.0,  0.3,  0.0,  0.0, 1.2]
    ]
  };

  /* a flat strip lying on the deck from (ax, ay) to (bx, by), width w */
  function stripe(THREE, g, m, ax, ay, bx, by, w, z) {
    var dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy);
    var b = box(THREE, g, L, w, 0.04, m, (ax + bx) / 2, (ay + by) / 2, z);
    b.rotation.z = Math.atan2(dy, dx); return b;
  }


  /* ============================================================ FITTINGS
     The detail pass (2026-11).  The profile and plan fix where the parts
     stand; these small fittings are what every photograph of the class
     shows round her edges and on her island ([F1] shows the catwalks as a
     light band round the deck, the white stern and the wires; [F2] the
     gallery's ports, the island's platforms and rails, the boat booms).
     Sizes are typical US carrier practice, NOT CONFIRMED one by one.
     Nothing stands above the flight deck's surface inside its outline but
     the island and flush paint (4 cm), so the deck park is unchanged. */

  /* posts every step and two wires along a polyline at height z.  Each
     post and wire is one flat ribbon (two triangles, the metal is double
     sided) standing in the rail's own plane, merged with the rest */
  function railLine(THREE, g, T, pts, z, hgt, step) {
    var P = [], i, k;
    function rib(ax, ay, az, bx, by, bz, ux, uy, uz) {
      P.push(ax - ux, ay - uy, az - uz, bx - ux, by - uy, bz - uz, bx + ux, by + uy, bz + uz,
             ax - ux, ay - uy, az - uz, bx + ux, by + uy, bz + uz, ax + ux, ay + uy, az + uz);
    }
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / (step || 2.4)));
      if (L < 1e-3) continue;
      var tx = (b[0] - a[0]) / L, ty = (b[1] - a[1]) / L;
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        rib(px, py, z, px, py, z + hgt, tx * 0.04, ty * 0.04, 0);
      }
      rib(a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0, 0, 0.03);
      rib(a[0], a[1], z + hgt * 0.5, b[0], b[1], z + hgt * 0.5, 0, 0, 0.022);
    }
    if (!P.length) return;
    var uv = []; for (i = 0; i < P.length / 3; i++) uv.push(0, 0);
    g.add(new THREE.Mesh(geoOf(THREE, P, uv), T.metal));
  }
  /* a box lying along (ax, ay)-(bx, by) */
  function boxAlong(THREE, g, m, ax, ay, bx, by, w, th, z) {
    var L = Math.hypot(bx - ax, by - ay);
    if (L < 0.05) return null;
    var b = box(THREE, g, L, w, th, m, (ax + bx) / 2, (ay + by) / 2, z);
    b.rotation.z = Math.atan2(by - ay, bx - ax); return b;
  }
  /* one quad facing (nx, ny): a scuttle, a port, a door */
  function pane(THREE, g, m, x, y, z, w, h, nx, ny) {
    var pg = new THREE.PlaneGeometry(w, h); pg.rotateX(PI / 2); pg.rotateZ(Math.atan2(nx, -ny));
    var q = new THREE.Mesh(pg, m); q.position.set(x, y, z); g.add(q); return q;
  }
  /* a life-raft canister on its cradle, axis along the edge */
  function raft(THREE, g, T, x, y, z, ang) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 1.3, 6, 1), T.white);
    c.rotation.z = ang + PI / 2; c.position.set(x, y, z + 0.38); g.add(c);
    var b = box(THREE, g, 1.0, 0.5, 0.06, T.metal, x, y, z + 0.03); b.rotation.z = ang;
  }

  function fittings(THREE, g, T, Hh, YO, YI, YC) {
    var s, i, k, x, y;
    /* --- catwalks round the flight deck: a grating 1.6 m wide 1.6 m down,
       its outer rail (posts and two wires) and its brackets, broken where
       a lift, the island, a 5 in sponson or the bow and stern stand.  The
       whip aerials are lowered outboard, as they are for flight work. */
    var CZ = FD - 1.6, CW = 1.6;
    var GAP = [[-97.6, -78.0, -1], [-53.2, -33.6, -1], [20.2, 39.8, -1], [-22.0, 15.6, -1], [34.4, 54.0, 1],
               [65.0, 99.0, 1], [-143.5, -115.5, 1], [-153.5, -117.5, -1], [67.5, 94.5, -1]];
    function open(x0, y0) {
      for (var q = 0; q < GAP.length; q++) if (x0 > GAP[q][0] && x0 < GAP[q][1] && (y0 > 0) === (GAP[q][2] > 0)) return false;
      return true;
    }
    var D = polyCCW(DECK), whip = 0;
    for (i = 0; i < D.length; i++) {
      var a = D[i], b = D[(i + 1) % D.length], ex = b[0] - a[0], ey = b[1] - a[1], L = Math.hypot(ex, ey);
      if (L < 6 || Math.abs(ex) < 1e-3 && Math.abs(a[0]) > 160) continue;     /* bow and stern ends */
      var nx = ey / L, ny = -ex / L, n = Math.max(1, Math.round(L / 2.4)), run = [];
      for (k = 0; k <= n + 1; k++) {
        var f = k / n, px = a[0] + ex * f, py = a[1] + ey * f, ok = k <= n && open(px, py);
        if (ok) run.push([px, py]);
        if ((!ok || k === n) && run.length > 1) {
          var p0 = run[0], p1 = run[run.length - 1], o = CW / 2 + 0.05;
          boxAlong(THREE, g, T.deck, p0[0] + nx * o, p0[1] + ny * o, p1[0] + nx * o, p1[1] + ny * o, CW, 0.12, CZ);
          boxAlong(THREE, g, T.sup, p0[0] + nx * (CW + 0.05), p0[1] + ny * (CW + 0.05), p1[0] + nx * (CW + 0.05), p1[1] + ny * (CW + 0.05), 0.08, 0.35, CZ - 0.12);
          railLine(THREE, g, T, run.map(function (p) { return [p[0] + nx * (CW + 0.02), p[1] + ny * (CW + 0.02)]; }), CZ + 0.06, 1.0, 3.0);
          for (var q = 0; q < run.length; q += 4)
            strut(THREE, g, T.metal, run[q][0] + nx * CW, run[q][1] + ny * CW, CZ - 0.08, run[q][0] - nx * 0.4, run[q][1] - ny * 0.4, CZ - 2.2, 0.06, 3);
          /* rafts on the catwalk every 12 m, a whip aerial every fourth run */
          for (q = 2; q < run.length - 1; q += 6) raft(THREE, g, T, run[q][0] + nx * 1.1, run[q][1] + ny * 1.1, CZ + 0.06, Math.atan2(ey, ex));
          if ((whip++ % 3) === 0) {
            var wq = run[Math.floor(run.length / 2)];
            cylZ(THREE, g, 0.12, 0.16, 0.5, 6, T.metal, wq[0] + nx * CW, wq[1] + ny * CW, CZ + 0.3);
            strut(THREE, g, T.metal, wq[0] + nx * CW, wq[1] + ny * CW, CZ + 0.5, wq[0] + nx * (CW + 6.0), wq[1] + ny * (CW + 6.0), CZ + 0.8, 0.05, 3);
          }
        }
        if (!ok) run = [];
      }
      /* the deck-edge gutter: a dark lip on the slab's edge */
      if (L > 6) boxAlong(THREE, g, T.dark, a[0] + nx * 0.03, a[1] + ny * 0.03, b[0] + nx * 0.03, b[1] + ny * 0.03, 0.06, 0.22, FD - 0.12);
    }

    /* --- the gallery deck under the overhangs: its ports (a row of
       small lights) and the frames under the slab, port and starboard */
    for (x = -86; x < 54; x += 3.2) {
      pane(THREE, g, T.glass, x, 42.45, HULLTOP - 1.1, 0.9, 0.55, 0, 1);
      if (Math.round(x) % 2 === 0) box(THREE, g, 0.18, 22.0, 0.35, T.sup, x + 1.6, 31.4, HULLTOP - 0.17);
    }
    for (x = -101; x < 39; x += 3.2) {
      if (x > -97.6 && x < -78 || x > -53.2 && x < -33.6 || x > 20.2 && x < 39.8) continue;
      pane(THREE, g, T.glass, x, -32.85, HULLTOP - 1.0, 0.9, 0.55, 0, -1);
    }
    for (x = -100; x < 38; x += 6.4) box(THREE, g, 0.18, 12.8, 0.35, T.sup, x, -26.4, HULLTOP - 0.17);
    /* the gallery's after diagonal and forward face, ports */
    for (k = 1; k < 7; k++) {
      x = -118.0 + 29.4 * k / 7; y = 26.4 + 16.0 * k / 7;
      var dn = Math.hypot(16.0, 29.4); pane(THREE, g, T.glass, x - 0.3, y + 0.5, HULLTOP - 1.1, 0.9, 0.55, -16.0 / dn, 29.4 / dn);
    }

    /* --- the hull: two rows of scuttles fore and aft of the hangar, the
       hangar's side doors, the anchors in their hawses (two at the bow,
       one aft, port), the forecastle's windlasses, bollards and fairleads */
    for (s = -1; s <= 1; s += 2) {
      for (x = -140; x < 140; x += 3.0) {
        var hang = x > -110 && x < 100;
        if (hang && x % 9 !== 1) continue;
        var zz = hang ? 15.6 : (x > 0 ? 11.0 : 13.0);
        var wy = Hh.W(x, zz); if (!(wy > 1)) continue;
        pane(THREE, g, T.glass, x, s * (wy + 0.04), zz, 0.42, 0.42, 0, s);
        if (!hang) { wy = Hh.W(x, zz - 2.6); if (wy > 1) pane(THREE, g, T.glass, x + 1.5, s * (wy + 0.04), zz - 2.6, 0.42, 0.42, 0, s); }
      }
      /* the bow anchor: the hawse's lip and the stock-less anchor in it */
      var ax = 141.0, az = 9.0, aw = Hh.W(ax, az);
      cylZ(THREE, g, 1.0, 1.2, 0.6, 10, T.dark, ax, s * (aw + 0.05), az).rotation.x = s * PI / 2;
      box(THREE, g, 0.7, 0.35, 2.8, T.metal, ax - 0.2, s * (aw + 0.2), az - 1.6);
      box(THREE, g, 2.6, 0.45, 0.6, T.metal, ax - 0.2, s * (aw + 0.25), az - 3.0);
      /* the forecastle under the open bow (z 13.5): windlass, chain pipe,
       stoppers, bollards and fairleads */
      var fz = HULLTOP - 6.5;
      cylX(THREE, g, 0.9, 0.9, 2.2, 10, T.metal, 136.0, s * 4.0, fz + 1.0);
      box(THREE, g, 2.4, 1.8, 0.7, T.sup, 136.0, s * 4.0, fz + 0.35);
      boxAlong(THREE, g, T.dark, 137.2, s * 4.0, 146.5, s * Math.max(1.5, Hh.W(146.5, fz) - 1.2), 0.5, 0.18, fz + 0.09);
      cylZ(THREE, g, 0.45, 0.45, 0.5, 8, T.dark, 147.0, s * Math.max(1.5, Hh.W(147, fz) - 1.0), fz + 0.25);
      [133, 144, 150].forEach(function (bx) {
        var by = s * Math.max(1.2, Hh.W(bx, fz) - 1.4);
        cylZ(THREE, g, 0.28, 0.3, 0.8, 8, T.metal, bx, by, fz + 0.4); cylZ(THREE, g, 0.28, 0.3, 0.8, 8, T.metal, bx + 1.0, by, fz + 0.4);
        cylZ(THREE, g, 0.38, 0.38, 0.08, 8, T.metal, bx, by, fz + 0.84); cylZ(THREE, g, 0.38, 0.38, 0.08, 8, T.metal, bx + 1.0, by, fz + 0.84);
      });
      /* the forecastle's bulwark rail */
      var rp = [];
      for (x = 131; x <= 155; x += 3) rp.push([x, s * Math.max(0.4, Hh.W(x, fz) - 0.2)]);
      railLine(THREE, g, T, rp, fz, 1.0, 2.2);
      /* boat booms, folded along the hull side under the gallery */
      boxAlong(THREE, g, T.metal, -30.0, s * (Hh.W(-30, 12.0) + 0.3), -10.0, s * (Hh.W(-10, 12.0) + 0.3), 0.3, 0.3, 12.0);
    }
    /* the stern anchor in its hawse on the port quarter */
    var sw = Hh.W(-140.0, 7.0);
    cylZ(THREE, g, 0.8, 1.0, 0.5, 10, T.dark, -140.0, sw + 0.05, 7.0).rotation.x = PI / 2;
    box(THREE, g, 0.6, 0.3, 2.2, T.metal, -140.2, sw + 0.18, 5.8);
    /* the fantail under the round-down: its rail, chocks and bollards */
    var tz = HULLTOP - 1.6, tp = [];
    for (y = -12.5; y <= 12.5; y += 2.5) tp.push([-152.2, y]);
    railLine(THREE, g, T, tp, tz - 3.6, 1.0, 2.4);
    box(THREE, g, 1.6, 26.0, 0.12, T.deck, -152.9, 0, tz - 3.6);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.28, 0.3, 0.8, 8, T.metal, -150.6, s * 8.0, tz - 3.2);
      cylZ(THREE, g, 0.28, 0.3, 0.8, 8, T.metal, -150.6, s * 9.0, tz - 3.2);
    }

    /* --- the 5 in sponsons: an outer rail, a ready-use locker, rafts */
    var ZS = 15.5;
    [[71.5, 23.8], [92.7, 23.8], [74.0, -24.0], [88.0, -24.0], [-122.0, 30.0], [-137.0, 30.0], [-124.0, -16.0], [-147.0, -16.0]].forEach(function (q) {
      var sg = q[1] > 0 ? 1 : -1, yout = q[1] + sg * 4.0, yin = sg * Math.max(0.5, (Hh.W(q[0], ZS) || 6) - 1.0);
      railLine(THREE, g, T, [[q[0] - 6, yin + sg * 0.1], [q[0] - 5, yout - sg * 0.15], [q[0] + 5, yout - sg * 0.15], [q[0] + 6, yin + sg * 0.1]], ZS, 1.0, 2.2);
      box(THREE, g, 1.6, 1.0, 1.3, T.sup, q[0] - 3.8, yin + sg * 1.0, ZS + 0.65);
      raft(THREE, g, T, q[0] + 3.6, yout - sg * 0.9, ZS, 0);
    });

    /* --- deck markings that are not numbers [F1]: the white round-down
       across the stern, the arresting wires across the landing area (five
       pendants and the barricade's recess), the jet-blast deflectors
       (lowered, flush) behind the four catapults, the fuel stations at
       the edges */
    var ZM = FD + 0.035, ta = Math.tan(ANG), ay0 = 8.0;
    stripe(THREE, g, T.white, -161.6, -12.6, -161.6, 26.8, 2.2, ZM);
    for (y = -11; y < 26; y += 4) stripe(THREE, g, T.dark, -159.6, y, -159.6, y + 2, 1.4, ZM);
    [-128, -121, -114, -107, -100].forEach(function (wx) {
      var yc = ay0 + (wx + 160) * ta;
      var sa = Math.sin(ANG) * 11.0, ca = Math.cos(ANG) * 11.0;
      stripe(THREE, g, T.dark, wx + sa, yc - ca, wx - sa, yc + ca, 0.14, ZM);
      for (s = -1; s <= 1; s += 2) box(THREE, g, 0.8, 1.2, 0.04, T.dark, wx - s * sa * 1.05, yc + s * ca * 1.05, ZM).rotation.z = ANG;
    });
    stripe(THREE, g, T.dark, -86 + Math.sin(ANG) * 11, ay0 + 74 * ta - Math.cos(ANG) * 11, -86 - Math.sin(ANG) * 11, ay0 + 74 * ta + Math.cos(ANG) * 11, 0.5, ZM);
    [12.7, -11.8].forEach(function (cy) { box(THREE, g, 2.6, 7.0, 0.04, T.dark, 56.2, cy, ZM); });
    [4.0, 9.0].forEach(function (o) { box(THREE, g, 2.6, 7.0, 0.04, T.dark, -13.0, ay0 + o + 147 * ta, ZM).rotation.z = ANG; });
    [[-60, 42.2], [0, 42.2], [-75, -32.4], [-5, -19.5], [110, 17.6], [120, -17.4]].forEach(function (q) {
      box(THREE, g, 2.0, 1.2, 0.04, T.dark, q[0], q[1], ZM);
    });

    /* --- the island: rails round every roof, doors and ports on its
       faces, louvres, the bridge wings and the platform outboard, a ladder
       up its after end, searchlights, whips at its corners, stub
       exhausts on the funnel cap, signal halyards from the yard */
    var tiers = [[-21.5, 15.1, YO, YI, FD + 9.0], [-15.0, 13.0, YO + 0.8, YI - 0.8, FD + 12.0], [-4.0, 11.0, YO + 1.4, YI - 1.4, FD + 14.7]];
    tiers.forEach(function (t, n) {
      var i0 = 0.35;
      var pts = [[t[0] + i0, t[2] + i0], [t[1] - i0, t[2] + i0], [t[1] - i0, t[3] - i0], [t[0] + i0, t[3] - i0]];
      if (n === 0) pts = [[-15.0, t[3] - i0], [t[0] + i0, t[3] - i0], [t[0] + i0, t[2] + i0], [t[1] - i0, t[2] + i0], [t[1] - i0, t[3] - i0], [13.0, t[3] - i0]];
      else pts.push(pts[0]);
      railLine(THREE, g, T, pts, t[4], 1.0, 2.0);
    });
    /* ports along both faces of the block, doors at its foot */
    for (x = -20; x < 14; x += 2.2) {
      pane(THREE, g, T.glass, x, YI + 0.03, FD + 6.6, 0.5, 0.5, 0, 1);
      pane(THREE, g, T.glass, x, YO - 0.03, FD + 6.6, 0.5, 0.5, 0, -1);
      if (x > -14) pane(THREE, g, T.glass, x + 1.1, YI - 0.8 + 0.03, FD + 9.8, 0.5, 0.5, 0, 1);
    }
    [-18.0, -6.0, 8.0].forEach(function (dx) { box(THREE, g, 1.0, 0.1, 2.0, T.dark, dx, YI + 0.12, FD + 1.0); });
    box(THREE, g, 0.1, 1.0, 2.0, T.dark, 15.15, YC, FD + 1.0);
    box(THREE, g, 0.1, 1.0, 2.0, T.dark, -21.55, YC + 2, FD + 1.0);
    [[-12, YI], [2, YI], [-12, YO], [4, YO]].forEach(function (q) {
      box(THREE, g, 3.0, 0.08, 1.6, T.dark, q[0], q[1] + (q[1] === YI ? 0.04 : -0.04), FD + 3.6);
    });
    /* bridge wings over the side (outboard only: nothing overhangs the deck) */
    plate(THREE, g, T.deck, polyCCW([[8.0, YO + 0.8], [13.0, YO + 0.8], [13.0, YO - 2.0], [8.0, YO - 2.0]]), FD + 9.0, 0.25, T.sup);
    railLine(THREE, g, T, [[8.0, YO - 0.0], [8.0, YO - 1.9], [12.9, YO - 1.9], [12.9, YO + 0.8]], FD + 9.0, 1.0, 1.6);
    plate(THREE, g, T.deck, polyCCW([[-19.0, YO + 0.2], [-8.0, YO + 0.2], [-8.0, YO - 2.4], [-19.0, YO - 2.4]]), FD + 4.6, 0.25, T.sup);
    railLine(THREE, g, T, [[-19.0, YO], [-19.0, YO - 2.3], [-8.0, YO - 2.3], [-8.0, YO]], FD + 4.6, 1.0, 1.8);
    for (k = 0; k < 3; k++) strut(THREE, g, T.metal, -18.0 + k * 4.5, YO, FD + 2.6, -18.0 + k * 4.5, YO - 2.2, FD + 4.4, 0.08, 3);
    /* the ladder up the island's after face to the first roof */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.06, 0.06, 9.0, T.metal, -21.62, YC - 3 + s * 0.25, FD + 4.5);
    for (k = 1; k < 30; k++) box(THREE, g, 0.05, 0.5, 0.04, T.metal, -21.62, YC - 3, FD + k * 0.3);
    /* searchlights and whips on the top tier, a lattice yard on the funnel */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.25, 0.25, 0.5, 8, T.metal, 9.0, YC + s * 4.4, FD + 14.95);
      cylX(THREE, g, 0.42, 0.42, 0.7, 10, T.gun, 9.3, YC + s * 4.4, FD + 15.5);
      strut(THREE, g, T.metal, 10.6, YC + s * 4.9, FD + 14.7, 10.6, YC + s * 5.6, FD + 22.0, 0.05, 3);
      strut(THREE, g, T.metal, -14.5, YC + s * 5.2, FD + 12.0, -14.5, YC + s * 6.2, FD + 18.0, 0.05, 3);
      strut(THREE, g, T.metal, -1.0, YC + s * 6, FD + 29.0, -1.0, YC + s * 2.6, FD + 14.8, 0.015, 3);
    }
    for (k = 0; k < 4; k++) cylZ(THREE, g, 0.5, 0.5, 1.4, 8, T.dark, -14.6 + k * 2.4, YC + (k % 2 ? 1.0 : -1.0), FD + 21.2);
    var fp = chamf(-16.8, -6.6, 3.5, 1.4, 1.0).map(function (p) { return [p[0], p[1] + YC]; });
    fp.push(fp[0]);
    railLine(THREE, g, T, fp, FD + 20.6, 0.9, 2.0);
    /* louvres on the funnel's sides */
    var flo = chamf(-16.0, -5.0, 4.4, 1.5, 1.0).map(function (p) { return [p[0], p[1] + YC]; });
    var fhi = chamf(-16.6, -6.4, 3.6, 1.4, 1.0).map(function (p) { return [p[0], p[1] + YC]; });
    facePatch(THREE, g, T.dark, flo, FD + 11.95, fhi, FD + 19.8, 0, 0.15, 0.85, FD + 14.0, FD + 16.0, 0.04);
    facePatch(THREE, g, T.dark, flo, FD + 11.95, fhi, FD + 19.8, 4, 0.15, 0.85, FD + 14.0, FD + 16.0, 0.04);
    /* the masthead light and the ECM whip */
    strut(THREE, g, T.metal, -1.0, YC, FD + 33.0, -1.0, YC, FD + 37.0, 0.06, 3);
    sphere(THREE, g, 0.3, T.white, -1.0, YC, FD + 33.2, 8, 6);
  }

  function build(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C, FPAINT)), Hh = makeHull(HF), s, i, k, x;
    g.add(Hh.shellBand(THREE, T.under, -12, -0.4, 5));
    /* the boot-topping, 1.4 m of black from just under the waterline */
    g.add(Hh.shellBand(THREE, T.boot, -0.4, 1.0, 1));
    g.add(Hh.shellBand(THREE, T.hull, 1.0, HULLTOP + 1, 6));
    Hh.transom(THREE, g, T.hull, T.under);
    g.add(Hh.deckSheet(THREE, T.deck, HF.XS0, HF.XS1));

    /* the flight deck: one slab 1.5 m deep, its uv in 8 m tiles */
    var dk = plate(THREE, g, T.deck, polyCCW(DECK), FD, FD - HULLTOP, T.sup);
    var uv = dk.geometry.attributes.uv;
    for (i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 8, uv.getY(i) / 8);
    /* the gallery under the port sponson and the island's overhang (NOT
       CONFIRMED depth) */
    frustum(THREE, g, T.sup, [[-118.0, 20.0], [55.0, 20.0], [55.0, 42.4], [-88.6, 42.4], [-118.0, 26.4]], HULLTOP - 2.6,
            [[-118.0, 20.0], [55.0, 20.0], [55.0, 42.4], [-88.6, 42.4], [-118.0, 26.4]], HULLTOP + 0.02);
    frustum(THREE, g, T.sup, [[-103.6, -32.8], [40.4, -32.8], [40.4, -20.0], [-103.6, -20.0]], HULLTOP - 2.2,
            [[-103.6, -32.8], [40.4, -32.8], [40.4, -20.0], [-103.6, -20.0]], HULLTOP + 0.02);
    /* brackets from the hull side to the overhangs, and under the open bow */
    for (x = -110; x <= 50; x += 16) strut(THREE, g, T.metal, x, 19.6, 11.0, x + 4, 38.0, HULLTOP - 2.4, 0.45, 4);
    for (x = -96; x <= 36; x += 16) strut(THREE, g, T.metal, x, -19.8, 12.0, x + 3, -30.0, HULLTOP - 2.0, 0.4, 4);
    for (s = -1; s <= 1; s += 2) for (x = 134; x <= 158; x += 8)
      strut(THREE, g, T.metal, x, s * Math.max(0.5, Hh.W(x, 12.0) - 0.4), 12.0, x + 2, s * 15.0, HULLTOP + 0.05, 0.4, 4);

    /* deck markings [F1]: the landing area's edge lines and centreline,
       the axial centreline, the four catapult tracks, the lift outlines */
    var ZM = FD + 0.03, ay0 = 8.0, ax0 = -160.0, ax1 = 52.0, ta = Math.tan(ANG);
    stripe(THREE, g, T.white, ax0, ay0, ax1, ay0 + (ax1 - ax0) * ta, 0.5, ZM);
    for (s = -1; s <= 1; s += 2)
      stripe(THREE, g, T.white, ax0 + 8, ay0 + s * 11.5 + 8 * ta, ax1, ay0 + s * 11.5 + (ax1 - ax0) * ta, 0.35, ZM);
    for (x = 70; x < 158; x += 9) stripe(THREE, g, T.white, x, 0, x + 4.5, 0, 0.4, ZM);
    [12.7, -11.8].forEach(function (y) { stripe(THREE, g, T.dark, 60.0, y, 158.0, y, 0.6, ZM); });
    /* the two waist catapults on the angled deck, 4 and 9 m to port of
       its centreline */
    [4.0, 9.0].forEach(function (o) {
      stripe(THREE, g, T.dark, -10.0, ay0 + o + 150 * ta, 50.0, ay0 + o + 210 * ta, 0.6, ZM);
    });
    for (k = 0; k < LIFTS.length; k++) {
      var lx = LIFTS[k][0], sd = LIFTS[k][1], yo = sd > 0 ? 42.0 : -33.0, yi = sd > 0 ? 24.0 : -17.5;
      stripe(THREE, g, T.white, lx - 9.6, yi, lx + 9.6, yi, 0.3, ZM);
      stripe(THREE, g, T.white, lx - 9.6, yi, lx - 9.6, yo, 0.3, ZM);
      stripe(THREE, g, T.white, lx + 9.6, yi, lx + 9.6, yo, 0.3, ZM);
      /* the lift's opening in the hull side under it */
      if (sd < 0) box(THREE, g, 17.0, 0.2, 7.0, T.dark, lx, -(Hh.W(lx, 15.0) + 0.05), 15.5);
    }

    /* the island [F1][F3]: X -21.5..15.1, Y -33.6..-20.7 */
    var YI = -20.7, YO = -33.6, YC = (YI + YO) / 2;
    function isl(x0, x1, yo, yi, z0, z1, m) {
      return frustum(THREE, g, m || T.sup, [[x0, yo], [x1, yo], [x1, yi], [x0, yi]], z0, [[x0 + 0.2, yo + 0.2], [x1 - 0.2, yo + 0.2], [x1 - 0.2, yi - 0.2], [x0 + 0.2, yi - 0.2]], z1);
    }
    isl(-21.5, 15.1, YO, YI, FD - 0.05, FD + 9.0);
    isl(-15.0, 13.0, YO + 0.8, YI - 0.8, FD + 8.95, FD + 12.0);
    isl(-4.0, 11.0, YO + 1.4, YI - 1.4, FD + 11.95, FD + 14.7);
    box(THREE, g, 0.12, 9.0, 1.0, T.glass, 13.06, YC, FD + 10.8);
    box(THREE, g, 15.0, 0.12, 1.0, T.glass, 4.0, YO + 0.75, FD + 10.8);
    box(THREE, g, 15.0, 0.12, 1.0, T.glass, 4.0, YI - 0.75, FD + 10.8);
    box(THREE, g, 0.12, 7.6, 0.9, T.glass, 11.05, YC, FD + 13.7);
    box(THREE, g, 14.0, 0.12, 0.9, T.glass, 3.5, YO + 1.35, FD + 13.7);
    /* the funnel at the island's after end, -16..-5, to 20.6 over the deck */
    frustum(THREE, g, T.sup, chamf(-16.0, -5.0, 4.4, 1.5, 1.0).map(function (p) { return [p[0], p[1] + YC]; }), FD + 11.95,
            chamf(-16.6, -6.4, 3.6, 1.4, 1.0).map(function (p) { return [p[0], p[1] + YC]; }), FD + 19.8);
    frustum(THREE, g, T.dark, chamf(-16.6, -6.4, 3.6, 1.4, 1.0).map(function (p) { return [p[0], p[1] + YC]; }), FD + 19.75,
            chamf(-16.8, -6.6, 3.5, 1.4, 1.0).map(function (p) { return [p[0], p[1] + YC]; }), FD + 20.6);
    /* the main mast abaft the bridge: a lattice tripod to 33 m over the
       deck, a yard, the SPS-12 dish and the SPS-8 screen; the after pole
       over the funnel (heights NOT CONFIRMED) */
    var MXp = -1.0, MZ0 = FD + 14.7, MZ1 = FD + 33.0;
    strut(THREE, g, T.metal, MXp + 2.0, YC, MZ0, MXp, YC, MZ1, 0.3, 5);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, MXp - 2.2, YC + s * 2.6, MZ0, MXp, YC, MZ1 - 3, 0.26, 5);
    for (i = 1; i < 4; i++) {
      var zz = MZ0 + i * 4, f = (zz - MZ0) / (MZ1 - 3 - MZ0), yy = 2.6 * (1 - f);
      strut(THREE, g, T.metal, MXp - 2.2 * (1 - f), YC + yy, zz, MXp - 2.2 * (1 - f), YC - yy, zz, 0.1, 4);
    }
    strut(THREE, g, T.metal, MXp, YC - 6, MZ1 - 4, MXp, YC + 6, MZ1 - 4, 0.14, 4);
    dish(THREE, g, T.metal, 2.8, MXp + 1.4, YC + 0.0, MZ1 - 7.5, 0.25);
    var op = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.0, 4.4, 10, 1, true, -PI * 0.35, PI * 0.7), T.metal);
    op.rotation.x = PI / 2; op.position.set(MXp - 3.0, YC, MZ0 + 3.5); g.add(op);
    box(THREE, g, 6.0, 4.0, 0.3, T.sup, MXp - 1.5, YC, MZ0 + 1.0);
    strut(THREE, g, T.metal, -12.0, YC, FD + 20.6, -12.0, YC, FD + 28.0, 0.14, 4);
    strut(THREE, g, T.metal, -12.0, YC - 3, FD + 26.0, -12.0, YC + 3, FD + 26.0, 0.08, 4);

    /* the 5 in sponsons and mounts [F1][F2] (height NOT CONFIRMED) */
    var ZS = 15.5;
    var GUNS = [[71.5, 23.8, 0], [92.7, 23.8, 0], [74.0, -24.0, 0], [88.0, -24.0, 0],
                [-122.0, 30.0, PI], [-137.0, 30.0, PI], [-124.0, -16.0, PI], [-147.0, -16.0, PI]];
    var tw = null;
    GUNS.forEach(function (q, n) {
      var sg = q[1] > 0 ? 1 : -1, hw = Hh.W(q[0], ZS) || 6;
      var yin = sg * Math.max(0.5, hw - 1.0), yout = q[1] + sg * 4.0;
      plate(THREE, g, T.deck, polyCCW([[q[0] - 6, yin], [q[0] + 6, yin], [q[0] + 5, yout], [q[0] - 5, yout]]), ZS, 0.8, T.sup);
      strut(THREE, g, T.metal, q[0], sg * (hw - 0.5), ZS - 6.0, q[0], yout - sg * 1.0, ZS - 0.7, 0.45, 4);
      var mg = new THREE.Group(); mg.position.set(q[0], q[1], ZS); mg.rotation.z = q[2];
      fiveInch(THREE, mg, T);
      if (n === 2) { mg.name = "turret"; tw = mg; } else g.add(mg);
    });
    /* the screws and rudders (NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      var sy = s * (i ? 12.9 : 5.6), sz = i ? -6.3 : -8.0;
      cylX(THREE, g, 0.6, 0.6, 26, 8, T.metal, -130, sy, sz + 0.8);
      cylX(THREE, g, 0.55, 0.95, 2.0, 8, T.metal, -144.4, sy, sz);
      for (k = 0; k < 4; k++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.7, 4.2), T.metal);
        bl.position.set(-144.2, sy, sz); bl.rotation.x = k * PI / 2 + 0.4; bl.translateZ(2.4); bl.rotation.y = 0.34; g.add(bl);
      }
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 7.0, 0.85, 8.0, T.metal, -148.0, s * 7.6, -5.5);

    fittings(THREE, g, T, Hh, YO, YI, YC);

    /* team: strips on the island's roofs */
    box(THREE, g, 3.0, 2.0, 0.05, T.team, 5.0, YC, FD + 14.73);
    box(THREE, g, 3.0, 2.0, 0.05, T.team, -18.5, YC, FD + 9.03);
    box(THREE, g, 2.0, 1.2, 0.05, T.team, 12.0, YC, FD + 12.03);
    return finish(THREE, g, tw, null);
  }

  return { build: build };
})();

/* Registration: len is the published overall length, 326.1 m. */
UNIT_MODELS["nato_e50_carrier"] = {
  len: 326.1,
  build: function (THREE, M, C) { return HeroForrestal.build(THREE, M, C); }
};
