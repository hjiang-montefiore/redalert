/* ==================== js/hero/gb_navy_late.js ==========================
   HERO MODELS -- the Royal Navy from 1980 to today: twenty rows that drew
   American hulls (render3d.js modelKeyFor fell back to boat_n, corvette_n,
   destroyer_n, sub_n and carrier_n) now draw their own ships.  One kit
   (js/hero/pla_navy_modern.js's, its paint textures given panel lines,
   grime streaks and weathering per AGENT_POLICY rule 10), one builder per
   class, a variants table only where the references differ.

     key                 class drawn                         builder / variant
     boat_b              River Batch 2 OPV (Forth)           buildRiver2
     gbr_e00_patrol      River Batch 1 OPV (Tyne)            buildRiver1
     gbr_e80_patrol      Island-class OPV (Guernsey)         buildIsland
     gbr_e90_patrol      Castle-class OPV                    buildCastle
     gbr_e80_corvette    Type 22 Batch 1 (Broadsword)        buildT22
     gbr_e90_corvette    Type 23, 1990: Mk 8 Mod 0, 996      buildT23 {gun 0}
     gbr_e00_corvette    Type 23, 2006: Mod 1, 996, 2087     buildT23 {gun 1}
     corvette_b          Type 23 today: Artisan, Sea Ceptor  buildT23 {997, ceptor}
     gbr_e80_destroyer   Type 42 Batch 1, 965 (Sheffield)    buildT42 {batch 1}
     gbr_e90_destroyer   Type 42 Batch 3, 1022, Phalanx      buildT42 {batch 3}
     gbr_e00_destroyer   Type 45 as built                    buildT45
     destroyer_b         Type 45 with the Phalanx pair       buildT45 {phalanx}
     gbr_e80_sub         Swiftsure SSN                       buildSub "swift"
     gbr_e90_sub         Trafalgar SSN (S107's own screw)    buildSub "traf"
     sub_b, gbr_e00_sub  Astute SSN                          buildSub "astute"
     gbr_e80_carrier     Invincible 1980: 7 deg, Sea Dart    buildInvincible
     gbr_e90_carrier     Invincible class 1990s: 12 deg, 3 Goalkeeper
     carrier_b,
     gbr_e00_carrier     Queen Elizabeth                     buildQE

   Nothing is reused from another hero file: no file draws any of these
   hulls (grep js/hero for Type 42/22/23/45, Invincible, Astute, River,
   Island, Castle, Swiftsure, Trafalgar, Queen Elizabeth: none).

   PUBLISHED FIGURES (en.wikipedia class articles, raw wikitext read
   2026-11-12): River B1 79.5 x 13.5 m, draught 3.8, B2 90.5 x 13.5 m,
   4.6; Island 195 ft (59.5 m) x 36 ft, 14 ft, a Bofors 40 mm; Castle
   266 ft (81.0 m) x 37 ft 9 in, 11 ft 3 in, Bofors 40 mm, a Sea King deck;
   Type 22 B1 131.2 x 14.8 m, 6.1; Type 23 133.0 x 16.1 m, 7.3; Type 42
   B1 125 (125.6) x 14.3 m, B3 141.1 x 14.9 m, keel 4.2, screws 5.8;
   Type 45 152.4 x 21.2 m, 7.4; Swiftsure 82.9 x 9.8 m, 8.5; Trafalgar
   85.4 x 9.8 m, 9.5; Astute 97 x 11.3 m, 10; Invincible 209 x 36 m, 8,
   7 deg ski-jumps (12 deg after refit, Ark Royal built so), Phalanx then
   three Goalkeeper, Sea Dart removed in the mid-1990s; Queen Elizabeth
   284 m, 39 m waterline beam (73 m deck), 11 m, three Phalanx.

   REFERENCES (Wikimedia Commons, 1600 px through thumb.php; grids laid
   over them with PIL, scratchpad/q_gbnl_ref and q_gbnl_out/g_*.png):
     [S1] "HMS Sutherland (F81) MoD.jpg" -- Type 23, starboard broadside,
          level.  Every Type 23 station and height (see the T23 block).
     [N1] "HMS Norfolk F230 DNSD0305134.jpg" -- Type 23 in the 1990s: the
          Mk 8 Mod 0's round shield, the 996.
     [L1] "HMS LANCASTER LEAVES NORWAY MOD 45168084.jpg" -- the Sea Ceptor
          silo seen from the bridge: domed CAMM lids, 4 x 8, high walls.
     [A1] "HMS Argyll Type 997 Radar MOD 45156530.jpg" -- the Artisan's
          rounded box over its black frame.
     [D1] "HMS Daring-1.jpg" -- Type 45, port broadside, a little above.
     [D2] "HMS Defender (8614177368).jpg" -- Type 45, starboard bow.
     [P2] "HMS Daring (D32) Phalanx CIWS.jpg" -- the mount (close-up only).
     [T1] "Het Britse fregat HMS Broadsword (Type 22, 1979) (2097 001
          124).jpg" -- Type 22 B1, port broadside, level; [T1b] "HMS
          Broadword F88 Tampa Bay 1994.jpeg", starboard, alongside.
     [B1] "HMS Birmingham D86.jpg" -- Type 42 B1, port bow 3/4: the gun,
          the Sea Dart with rounds on the arms, the 909s, the masts.
     [M1] "HMS Manchester D95.jpg" -- Type 42 B3, port bow 3/4.
     [P1] "HMS Sheffield (D80).jpg" -- B1 with the 965 bedstead on the
          foremast and the black-topped mainmast, starboard quarter.
     [R2] "HMS Forth (P222) off Berry Head.jpg" -- River B2, broadside.
     [R1] "HMS Mersey MOD 45161943.jpg", [R1b] "HMS Tyne (P281).jpg" --
          River B1 from the port bow.
     [I1] "HMS Guernsey (39846371870).jpg" -- Island, starboard side.
     [K1] "Milan 2018 - MILES - Milan Exercise Sea - 3.jpg" -- a Castle in
          Bangladeshi service, port broadside (700 px); [K2] "HMS Dumbarton
          Castle displays her Paying Off Pennant ... MOD 45147584.jpg" --
          from astern in RN service.
     [Q1] "Swiftsure class SSN.svg", [Q2] "Trafalgar class SSN.svg", [Q3]
          "Astute class SSN.svg" -- en.wikipedia profiles, read column by
          column (alpha); [Q4] "HMS Trafalgar SSN cropped.JPG" and [Q5]
          "HMS Spartan Leaves Faslane MOD 45138100.jpg" for the sail and
          casing.
     [V3] "HMS Invincible Falklands war 1982.jpg" -- starboard, distant:
          the island; [V2] "HMS Invincible Returns From Falklands War.jpg"
          -- from astern, high: the stern, the deck, no CIWS in 1982;
          [V4] "HMS Illustrious 1.jpg" -- 12 deg ramp, starboard bow; [V1]
          "HMS Invincible (R05).jpg" -- bow-on, the Goalkeeper on the bow.
     [Z1] "Aerial view of HMS Queen Elizabeth (R08) off Scotland on 28 June
          2017 (4516752).jpg" -- the deck plan; [Z2] "HMS Queen Elizabeth
          (R08) underway during trials with HMS Sutherland (F81) and HMS
          Iron Duke (F234) on 28 June 2017 (45162784).jpg" -- the islands;
          [Z3] "HMS Queen Elizabeth.jpg" -- the bow at Rosyth.

   NOT CONFIRMED (all ships) -- estimated, not measured:
     - everything under the waterline (lines, keels, shafts; drawn to the
       published draughts on a generic fine-ended form);
     - every plan width of a deckhouse (the photographs are side views);
     - Type 42: stations +-3 m (two 3/4 photographs scaled linearly) and
       every height +-1.5 m; the Batch 3 Phalanx places ("amidships");
     - Type 45: the Phalanx places abreast the funnel;
     - Invincible: the flight deck's 15.0 m over the water (+-2 m), the
       island heights an upper bound (the views are off the beam), the
       deck outline, lifts and island width, two of the Goalkeeper places;
     - Queen Elizabeth: every height (freeboard 23 m assumed, the islands
       scaled to it by ratio off [Z2]), the ski-jump's 50 m, the Phalanx
       sponsons;
     - River B1 and Castle: heights +-2 m off 3/4 or small photographs;
       the Island's and Castle's Bofors mount and place;
     - submarine sails' plan widths, stern-plane spans, the lower rudders
       below the cut of [Q3].
   No pennant numbers, names, flags or ensigns.  Team colour: small strips.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0
   (submarines at their surfaced trim, keel at the published draught).
   Rows with turret:true have their main gun (the Type 22: its forward
   Sea Wolf launcher; the patrol vessels: their 40/30/20 mm) as the group
   "turret"; escorts with a flight deck carry a hidden "helipad" node on
   it; the carriers' flight decks are clean plates (marks 4 mm proud) for
   render3d.js deckLayout.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroGBNavyLate = (function () {
  "use strict";
  var PI = Math.PI;

  /* ================================================================ KIT
     (from js/hero/pla_navy_modern.js, which has it from pla_type056.js: textures, materials, primitives, the
     faceted frustum, the chamfered plan, the ring loft and the baker) */
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
    return canvasTex(THREE, "gbnHull", 512, 256, function (g, w, h) {
      var R = rng(5205), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke(); }
      for (i = 0; i < 4; i++) { var xx = i * w / 4 + (i % 2) * 22; g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 64; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 2 + R() * 4, 16 + R() * 70); }
      /* weathering: grime streaks running down from the deck edge and the scuttles */
      g.globalAlpha = 0.10; g.fillStyle = "#3a2e22";
      for (i = 0; i < 30; i++) { var sx = R() * w, sl = 10 + R() * 60; g.fillRect(sx, 0, 1 + R() * 2, sl); g.fillRect(sx + 40, h / 2, 1 + R() * 2, sl * 0.6); }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "gbnPlate", 256, 256, function (g, w, h) {
      var R = rng(5217), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.08;
      for (i = 0; i < 26; i++) { g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000"; g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30); }
      g.globalAlpha = 0.09; g.fillStyle = "#3a2e22";
      for (i = 0; i < 14; i++) g.fillRect(R() * w, R() * h * 0.5, 1 + R() * 2, 12 + R() * 40);
      g.globalAlpha = 1;
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "gbnDeck", 256, 256, function (g, w, h) {
      var R = rng(5211), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.13; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, i * h / 6); g.lineTo(w, i * h / 6); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* louvres, glazing backs, cell covers, recesses: dark grille bars */
  function grilleTex(THREE) {
    return canvasTex(THREE, "gbnGrille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }
  /* the submarine's anechoic tiles: a staggered grid, faint on matt black [S2] */
  function tileTex(THREE) {
    return canvasTex(THREE, "gbnTile", 256, 256, function (g, w, h) {
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

  /* paint: Royal Navy light grey on every photograph used, a dark grey
     non-slip deck, a BLACK boot topping and bottom (every surface ship's
     photograph shows black at the waterline); submarines matt black */
  var PAINT = { hull: 0x8e969a, sup: 0x969ea2, deck: 0x4d5357 };
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
      under: skin(0x232526, hullTex(THREE), 0.9),
      sup:   skin(P.sup, plateTex(THREE), 0.86),
      deck:  skin(P.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      white: skin(0xc9ccca, plateTex(THREE), 0.8),
      array: skin(0x6c757b, plateTex(THREE), 0.7),
      tile:  skin(0x222425, tileTex(THREE), 0.95),
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

  /* ================================================ NEW HELPERS (this file) */
  /* piecewise linear over [[x, v], ...] */
  function tab(T0, x) {
    var i;
    if (x <= T0[0][0]) return T0[0][1];
    for (i = 1; i < T0.length; i++) if (x <= T0[i][0]) {
      var a = T0[i - 1], b = T0[i];
      return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
    }
    return T0[T0.length - 1][1];
  }
  /* a hull station table from a few figures: L overall, hb the half beam
     at the deck edge, hw at the waterline, T the draught, rake the stem's
     overhang at the waterline, over the transom's; the run of the lines
     is a generic fine-ended warship form (NOT CONFIRMED, under water) */
  function hullDef(L, hb, hw, T, rake, over, deckZ, o) {
    o = o || {};
    var X0 = -L / 2, f = function (s) { return X0 + s * L; }, st = o.stern || 0.9;
    var xwl = L / 2 - rake, sw = (xwl - X0) / L;
    return {
      XS0: X0, XS1: L / 2, XWL: xwl, XST: X0 + over, step: o.step || Math.max(1.0, L / 70), fl: o.fl || 1.0,
      stemP: o.stemP || 0.62, extra: o.extra || [], deckZ: deckZ,
      STA: [
        [f(0), hb * st, hw * st * 0.92, -T * 0.22, 3.0],
        [X0 + over, hb * st * 1.01, hw * st, -T * 0.32, 3.0],
        [f(0.12), hb * 0.97, hw * 0.95, -T * 0.8, 3.2],
        [f(0.30), hb, hw, -T, 3.4],
        [f(0.55), hb, hw, -T, 3.4],
        [f(0.70), hb * 0.97, hw * 0.88, -T, 2.8],
        [f(0.80), hb * 0.88, hw * 0.66, -T * 0.97, 2.2],
        [f(sw - 0.07), hb * 0.70, hw * 0.36, -T * 0.88, 1.8],
        [xwl, hb * 0.50, 0.0, 0.0, 1.4],
        [xwl + (L / 2 - xwl) * 0.6, hb * 0.26, 0.0, 0.0, 1.2],
        [L / 2, 0.15, 0.0, 0.0, 1.2]
      ]
    };
  }
  /* the hull shell, boot topping, transom and deck of a surface ship */
  function shell(THREE, g, T, H, top) {
    var Hh = makeHull(H);
    g.add(Hh.shellBand(THREE, T.under, -30, 0.35, 4));
    g.add(Hh.shellBand(THREE, T.hull, 0.35, top || 40, 7));
    Hh.transom(THREE, g, T.hull, T.under);
    g.add(Hh.deckSheet(THREE, T.deck, H.XS0, H.XS1));
    return Hh;
  }
  /* a deckhouse x0..x1, +-hw at its foot z0, drawn in by inset at z1 */
  function blk(THREE, g, m, x0, x1, hw, z0, z1, inset, cf) {
    if (inset === undefined) inset = 0.25;
    if (cf === undefined) cf = 0.4;
    var c2 = Math.min(cf, (x1 - x0) / 2 - 0.05, hw - 0.05);
    var lo = chamf(x0, x1, hw, c2, c2);
    var hi = chamf(x0 + inset * 0.5, x1 - inset * 0.5, hw - inset, Math.max(0.02, c2 - inset * 0.3), Math.max(0.02, c2 - inset * 0.3));
    frustum(THREE, g, m, lo, z0, hi, z1);
    return { lo: lo, hi: hi, z0: z0, z1: z1 };
  }
  /* bridge glazing on a block's front, front corners and the fore ends of its sides */
  function glaze(THREE, g, T, b, za, zb) {
    [1, 2, 3].forEach(function (k) { facePatch(THREE, g, T.glass, b.lo, b.z0, b.hi, b.z1, k, 0.05, 0.95, za, zb, 0.06); });
    facePatch(THREE, g, T.glass, b.lo, b.z0, b.hi, b.z1, 0, 0.70, 0.97, za, zb, 0.06);
    facePatch(THREE, g, T.glass, b.lo, b.z0, b.hi, b.z1, 4, 0.03, 0.30, za, zb, 0.06);
  }
  /* dark doors / louvres on a block's sides */
  function doors(THREE, g, T, b, k, list, za, zb) {
    list.forEach(function (s) { facePatch(THREE, g, T.dark, b.lo, b.z0, b.hi, b.z1, k, s[0], s[1], za, zb, 0.05); });
  }
  function radome(THREE, g, T, x, y, z0, zc, r) {
    if (zc - r > z0 + 0.05) cylZ(THREE, g, r * 0.35, r * 0.45, zc - r - z0 + 0.2, 10, T.sup, x, y, (z0 + zc - r) / 2 + 0.1);
    cylZ(THREE, g, r, r, r * 0.7, 18, T.white, x, y, zc - r * 0.35 + 0.05);
    sphere(THREE, g, r, T.white, x, y, zc + 0.3, 18, 10);
  }
  /* the flight-deck marks: a touchdown ring and the line-up line, laid
     4 mm proud of the deck (parked3d_check: marks must not lift a wheel) */
  function padMarks(THREE, g, T, x, z, len, r) {
    var tc = new THREE.Mesh(new THREE.TorusGeometry(r || 3.2, 0.12, 3, 32), T.white);
    tc.scale.z = 0.02; tc.position.set(x, 0, z + 0.004); g.add(tc);
    box(THREE, g, len, 0.16, 0.008, T.white, x, 0, z + 0.004);
  }
  function rhib(THREE, g, T, x, y, z, L) {
    var b = cylX(THREE, g, 0.55, 0.55, L, 10, T.dark, x, y, z); b.scale.set(1, 1.2, 0.8);
    box(THREE, g, L * 0.4, 0.8, 0.6, T.white, x + L * 0.1, y, z + 0.5);
  }
  function fin(THREE, g, m, pts, th, plane, z) {
    var sh = new THREE.Shape(), k;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (k = 1; k < pts.length; k++) sh.lineTo(pts[k][0], pts[k][1]);
    var fg = new THREE.ExtrudeGeometry(sh, { depth: th, bevelEnabled: false });
    fg.translate(0, 0, -th / 2);
    if (plane === "xz") fg.rotateX(PI / 2); else fg.translate(0, 0, z || 0);
    g.add(new THREE.Mesh(fg, m)); return fg;
  }

  /* ========================================================== WEAPONS
     Every mount is built at its own origin on the deck, pointing +X. */
  /* 4.5 in Mk 8: Mod 0 the rounded glass-fibre shield [N1 Norfolk][B1 Birmingham][M1 Manchester],
     Mod 1 the faceted shield [S1 Sutherland][D1 Daring]; height off [S1] */
  function gun45(THREE, g, T, mod) {
    cylZ(THREE, g, 1.55, 1.65, 0.4, 18, T.sup, -0.3, 0, 0.2);
    if (mod === 1) {
      frustum(THREE, g, T.sup, chamf(-2.3, 1.7, 1.65, 0.5, 1.3), 0.4, chamf(-2.1, 0.5, 1.15, 0.4, 0.6), 4.0);
    } else {
      var c = cylZ(THREE, g, 1.6, 1.7, 1.9, 20, T.sup, -0.4, 0, 1.35); c.scale.x = 1.25;
      var d = sphere(THREE, g, 1.6, T.sup, -0.4, 0, 2.3, 20, 8); d.scale.set(1.25, 1.0, 0.65);
    }
    var bz = mod === 1 ? 1.9 : 1.6;
    cylX(THREE, g, 0.2, 0.24, 0.9, 10, T.gun, 1.8, 0, bz);
    cylX(THREE, g, 0.09, 0.11, 6.0, 10, T.gun, 5.2, 0, bz, true);
    return g;
  }
  /* small guns: "b40" Bofors 40 mm L/60 Mk 3 on its pedestal, "ds30" the
     30 mm DS30 mount with its box, "o20" the 20 mm on a pedestal */
  function smallGun(THREE, g, T, kind) {
    if (kind === "b40") {
      cylZ(THREE, g, 0.7, 0.8, 0.8, 12, T.sup, 0, 0, 0.4);
      frustum(THREE, g, T.sup, chamf(-1.0, 0.9, 1.0, 0.2, 0.4), 0.8, chamf(-0.9, 0.5, 0.8, 0.2, 0.3), 2.0);
      cylX(THREE, g, 0.06, 0.08, 3.0, 8, T.gun, 1.9, 0, 1.55, true);
    } else if (kind === "ds30") {
      cylZ(THREE, g, 0.55, 0.65, 0.9, 12, T.sup, 0, 0, 0.45);
      box(THREE, g, 1.4, 1.2, 0.9, T.sup, -0.1, 0, 1.3);
      cylX(THREE, g, 0.05, 0.07, 2.6, 8, T.gun, 1.9, 0, 1.4, true);
    } else {
      cylZ(THREE, g, 0.25, 0.35, 1.0, 8, T.gun, 0, 0, 0.5);
      box(THREE, g, 0.6, 0.5, 0.5, T.gun, 0, 0, 1.2);
      cylX(THREE, g, 0.04, 0.05, 1.8, 6, T.gun, 1.1, 0, 1.25, true);
    }
    return g;
  }
  /* GWS 30 Sea Dart twin launcher with two rounds on the arms [B1][P1 Sheffield] */
  function seaDart(THREE, g, T) {
    cylZ(THREE, g, 1.7, 1.9, 0.8, 18, T.sup, 0, 0, 0.4);
    box(THREE, g, 1.6, 1.4, 1.4, T.sup, 0, 0, 1.5);
    var s, a = new THREE.Group(); a.position.set(0, 0, 2.1); a.rotation.y = -0.3; g.add(a);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, a, 2.4, 0.4, 0.4, T.gun, 0.6, s * 0.95, 0);
      cylX(THREE, a, 0.22, 0.22, 4.4, 10, T.white, 0.9, s * 0.95, 0.42);
      cylX(THREE, a, 0.05, 0.22, 0.6, 10, T.white, 3.4, s * 0.95, 0.42);
    }
    return g;
  }
  /* GWS 25 Sea Wolf six-barrel launcher [T1 Broadsword] */
  function seaWolf6(THREE, g, T) {
    cylZ(THREE, g, 1.1, 1.3, 1.0, 14, T.sup, 0, 0, 0.5);
    box(THREE, g, 2.8, 2.6, 1.6, T.sup, 0, 0, 1.9);
    var i, k;
    for (i = 0; i < 3; i++) for (k = 0; k < 2; k++) {
      var c = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 10), T.dark);
      c.rotation.z = PI / 2; c.position.set(1.42, -0.8 + i * 0.8, 1.55 + k * 0.7); g.add(c);
    }
    return g;
  }
  /* a quad Harpoon launcher: four canisters on a frame, raised at the front [S1] */
  function harpoon(THREE, g, T, x, y, z, yaw) {
    var h = new THREE.Group(); h.position.set(x, y, z); h.rotation.z = yaw; g.add(h);
    var b = new THREE.Group(); b.position.set(0, 0, 1.2); b.rotation.y = -0.32; h.add(b);
    var i, k;
    for (i = 0; i < 2; i++) for (k = 0; k < 2; k++) cylX(THREE, b, 0.3, 0.3, 4.6, 10, T.sup, 0, -0.33 + i * 0.66, k * 0.66);
    strut(THREE, h, T.metal, -1.6, 0, 0, -1.6, 0, 1.4, 0.12, 4);
    strut(THREE, h, T.metal, 1.4, 0, 0, 1.4, 0, 2.2, 0.12, 4);
  }
  /* MM38 Exocet: a pair of box launchers splayed outboard [T1] */
  function exocetPair(THREE, g, T, x, y, z, yaw) {
    var h = new THREE.Group(); h.position.set(x, y, z); h.rotation.z = yaw; g.add(h);
    var b = new THREE.Group(); b.position.set(0, 0, 0.9); b.rotation.y = -0.2; h.add(b);
    box(THREE, b, 5.6, 0.95, 0.95, T.sup, 0, -0.55, 0);
    box(THREE, b, 5.6, 0.95, 0.95, T.sup, 0, 0.55, 0);
    box(THREE, h, 1.0, 1.8, 0.8, T.metal, -1.8, 0, 0.4);
    box(THREE, h, 1.0, 1.8, 1.2, T.metal, 1.6, 0, 0.6);
  }
  /* Phalanx: base, the white radome over the gun [P2 Daring's Phalanx] */
  function phalanx(THREE, g, T, x, y, z, yaw) {
    var p = new THREE.Group(); p.position.set(x, y, z); p.rotation.z = yaw || 0; g.add(p);
    cylZ(THREE, p, 1.0, 1.1, 0.9, 12, T.sup, 0, 0, 0.45);
    box(THREE, p, 1.6, 1.5, 1.0, T.white, 0, 0, 1.4);
    cylZ(THREE, p, 0.66, 0.66, 1.5, 14, T.white, -0.2, 0, 2.6);
    sphere(THREE, p, 0.66, T.white, -0.2, 0, 3.35, 14, 8);
    cylX(THREE, p, 0.13, 0.15, 1.9, 8, T.gun, 1.3, 0, 1.6);
  }
  /* Goalkeeper: a bigger box turret with its radar on top [V1 Invincible 2000s] */
  function goalkeeper(THREE, g, T, x, y, z, yaw) {
    var p = new THREE.Group(); p.position.set(x, y, z); p.rotation.z = yaw || 0; g.add(p);
    cylZ(THREE, p, 1.4, 1.5, 0.8, 14, T.sup, 0, 0, 0.4);
    box(THREE, p, 2.8, 2.3, 1.9, T.white, -0.1, 0, 1.75);
    box(THREE, p, 0.5, 1.9, 0.7, T.white, -0.4, 0, 3.05);
    cylX(THREE, p, 0.18, 0.2, 2.8, 8, T.gun, 2.6, 0, 1.6);
  }
  /* radar antennae, each centred at (x, y, z), facing +X */
  function radar(THREE, g, T, kind, x, y, z) {
    if (kind === "996" || kind === "992") {      /* small reflector on a turntable */
      cylZ(THREE, g, 0.4, 0.5, 0.8, 10, T.metal, x, y, z - 0.6);
      box(THREE, g, 0.5, kind === "996" ? 4.0 : 3.4, 1.3, T.dark, x, y, z + 0.4);
      box(THREE, g, 0.2, 4.2, 0.2, T.metal, x - 0.4, y, z + 1.2);
    } else if (kind === "997") {                  /* Artisan: the rounded box over a black frame [A1] */
      var fr = frustum(THREE, g, T.dark, chamf(x - 1.6, x + 1.6, 1.8, 0.4, 0.4), z - 2.0, chamf(x - 1.2, x + 1.2, 1.4, 0.3, 0.3), z - 0.3); fr.position.y = y;
      var a = box(THREE, g, 1.6, 5.0, 1.3, T.sup, x, y, z + 0.4); a.scale.set(1, 1, 1);
      cylX(THREE, g, 0.65, 0.65, 1.6, 12, T.sup, x, y - 2.5, z + 0.4);
      cylX(THREE, g, 0.65, 0.65, 1.6, 12, T.sup, x, y + 2.5, z + 0.4);
    } else if (kind === "965") {                  /* AKE-2 double bedstead [P1 Sheffield] */
      cylZ(THREE, g, 0.5, 0.6, 1.0, 10, T.metal, x, y, z - 2.8);
      box(THREE, g, 0.4, 8.0, 4.6, T.dark, x, y, z);
      box(THREE, g, 0.6, 8.2, 0.2, T.metal, x, y, z - 2.3);
      box(THREE, g, 0.6, 8.2, 0.2, T.metal, x, y, z + 2.3);
      box(THREE, g, 0.6, 0.2, 4.8, T.metal, x, y, z);
    } else if (kind === "1022") {                 /* planar array [B1][M1] */
      cylZ(THREE, g, 0.4, 0.5, 1.2, 10, T.metal, x, y, z - 2.2);
      box(THREE, g, 0.4, 7.4, 3.0, T.dark, x, y, z);
      box(THREE, g, 0.6, 7.6, 0.2, T.metal, x - 0.1, y, z - 1.55);
    } else if (kind === "s1850") {                /* S1850M on the after tower [D1] */
      var s = new THREE.Group(); s.position.set(x, y, z); s.rotation.y = 0.28; g.add(s);
      box(THREE, s, 0.5, 8.6, 3.5, T.dark, 0, 0, 0);
      box(THREE, s, 0.7, 8.8, 0.2, T.sup, 0, 0, -1.8);
      cylZ(THREE, g, 0.6, 0.7, 1.4, 10, T.metal, x, y, z - 2.3);
    }
  }
  /* a tapering mast tower of plated (m) or black lattice section */
  function tower(THREE, g, m, x0, x1, hw0, z0, xa, xb, hw1, z1) {
    frustum(THREE, g, m, chamf(x0, x1, hw0, 0.3, 0.3), z0, chamf(xa, xb, hw1, 0.15, 0.15), z1);
  }
  function yard(THREE, g, T, x, z, half, fore) {
    box(THREE, g, 0.18, half * 2, 0.18, T.metal, x, 0, z);
    if (fore) box(THREE, g, fore, 0.16, 0.16, T.metal, x, 0, z + 0.3);
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
  function turretAt(THREE, x, z, fill) {
    var tw = new THREE.Group(); tw.name = "turret"; tw.position.set(x, 0, z); fill(tw); return tw;
  }

  /* ============================================== SMALL FITTINGS (rule 10)
     the fittings every photograph shows on every hull: rails with two
     wires along the open deck edges, bollards in pairs, the hawse and the
     anchor in the bow flare, a row of scuttles, hatches and vents on the
     open decks, life-raft canisters in racks, whip aerials.  o:
       rails  [[x0, x1], ...]        open deck edges to rail (both sides)
       boll   [x, ...]               bollard pairs inboard of each edge
       hawse  x                      hawse pipe and anchor, both bows, at z
       scut   [x0, x1, z, n]         a row of scuttles on each side
       hatch  [[x, y, sx, sy], ...]  flush hatches / vents on the deck
       rafts  [[x, y, z, n], ...]    raft canisters (n along X) on a rack
       whips  [[x, y, z, h], ...]    whip aerials                       */
  function outfit(THREE, g, T, Hh, o) {
    var s;
    (o.rails || []).forEach(function (r) { Hh.railRun(THREE, g, T, r[0], r[1], 1.8, 1.05); });
    (o.boll || []).forEach(function (x) {
      for (s = -1; s <= 1; s += 2) {
        var y = s * Math.max(0.3, Hh.edgeY(x) - 0.9), z = Hh.deckZ(x);
        cylZ(THREE, g, 0.17, 0.2, 0.5, 8, T.gun, x - 0.3, y, z + 0.25);
        cylZ(THREE, g, 0.17, 0.2, 0.5, 8, T.gun, x + 0.3, y, z + 0.25);
        box(THREE, g, 0.9, 0.5, 0.12, T.gun, x, y, z + 0.06);
      }
    });
    if (o.hawse !== undefined) {
      var hx = o.hawse, hz = o.hawseZ;
      for (s = -1; s <= 1; s += 2) {
        var hy = s * (Hh.W(hx, hz) + 0.04);
        var hp = cylZ(THREE, g, 0.5, 0.5, 0.12, 12, T.dark, hx, hy, hz); hp.rotation.x = PI / 2;
        var an = box(THREE, g, 0.5, 0.16, 1.3, T.dark, hx - 0.1, s * (Hh.W(hx - 0.1, hz - 0.9) + 0.08), hz - 0.9);
        an.rotation.x = s * 0.18;
        box(THREE, g, 1.2, 0.16, 0.35, T.dark, hx - 0.1, s * (Hh.W(hx - 0.1, hz - 1.6) + 0.08), hz - 1.6);
      }
      for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.45, 0.5, 0.45, 10, T.gun, hx - 4.0, s * 1.1, Hh.deckZ(hx - 4) + 0.22);
    }
    if (o.scut) {
      var q = o.scut, i;
      for (i = 0; i < q[3]; i++) {
        var sx = q[0] + (q[1] - q[0]) * (i + 0.5) / q[3];
        for (s = -1; s <= 1; s += 2) {
          var sc = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8), T.dark);
          sc.position.set(sx, s * (Hh.W(sx, q[2]) + 0.03), q[2]); g.add(sc);
        }
      }
    }
    (o.hatch || []).forEach(function (h) {
      box(THREE, g, h[2], h[3], 0.14, T.metal, h[0], h[1], Hh.deckZ(h[0]) + 0.07);
    });
    (o.vents || []).forEach(function (v) {
      cylZ(THREE, g, 0.22, 0.22, 0.9, 8, T.sup, v[0], v[1], v[2] + 0.45);
      var c = cylX(THREE, g, 0.24, 0.24, 0.5, 8, T.sup, v[0] + 0.2, v[1], v[2] + 0.95); c.rotation.y = 0.0;
    });
    (o.rafts || []).forEach(function (r) {
      var k;
      box(THREE, g, r[3] * 0.85 + 0.2, 0.9, 0.12, T.metal, r[0], r[1], r[2] + 0.06);
      for (k = 0; k < r[3]; k++) cylX(THREE, g, 0.36, 0.36, 0.75, 10, T.white, r[0] + (k - (r[3] - 1) / 2) * 0.85, r[1], r[2] + 0.5);
    });
    (o.whips || []).forEach(function (w) { strut(THREE, g, T.metal, w[0], w[1], w[2], w[0], w[1], w[2] + w[3], 0.05, 4); });
  }

  /* ================================================ Type 23 [S1][N1][L1][A1]
     Stations and heights off [S1] Sutherland, starboard broadside, level:
     stern x 62, stem head x 1510 (1448 px = 133.0 m, 10.88 px/m),
     waterline row 608; X = (px - 62) / 10.88 - 66.5, z = (608 - row) / 10.88.
       flight deck 5.2 (sailors' feet, row 552) X -66.5..-46.9; the main
       deck 5.4 amidships; the sheer 5.7 (X 19.7), 7.1 (28.9), 8.5 (38.1),
       9.4 (47.3), the stem head 10.6; the stem at the waterline X 58.2;
       hangar -45.8..-17.0 roof 13.0; funnel -17.0..-4.2 roof 19.3 and
       its black top -14.3..-7.9 to 23.2; the 01 deckhouse to 28.9 at 8.0;
       the 02 block -3.3..14.2 at 11.2; the bridge 14.2..28.9 roof 15.3,
       glazing 12.6-13.9; the mast 4.1..8.7 to 34, its radar 36.5-38.5 and
       a yard at 27.8; the satcom domes at X 0.9 (centre 19.0, r 2.6); a
       dome at X 12.4 (18.8); the forward 911 tracker X 15.1 (19-23); the
       after dome X -19 (20.5); the after mast X -22.1 to 30.5; the Harpoon
       quads at X 25.7 (starboard) and 33.5 (port); the gun X 46.8 on the
       forecastle at 9.4, its Mod 1 shield 4.0 high.
     Variants: V.gun 0 = the Mk 8 Mod 0 round shield [N1] (gbr_e90_corvette),
     1 = Mod 1 [S1]; V.radar "996" [S1][N1] or "997" Artisan [A1]; V.harpoon;
     V.ceptor: the Sea Ceptor silo's domed CAMM lids [L1] instead of the
     flush Sea Wolf hatches.  The Sonar 2087 array streams from the transom
     and shows nothing above water (gbr_e00_corvette = [S1] as drawn). */
  var T23D = [[-66.5, 5.2], [19.7, 5.5], [28.9, 7.1], [38.1, 8.5], [47.3, 9.4], [66.5, 10.6]];
  var H23 = hullDef(133.0, 8.05, 7.5, 4.6, 8.3, 3.2, function (x) { return tab(T23D, x); }, { stern: 0.92, fl: 1.25 });
  function buildT23(THREE, M, C, V) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    var Hh = shell(THREE, g, T, H23, 12);
    /* hangar, door aft, the low 01 deckhouse, funnel and its black top */
    var hg = blk(THREE, g, T.sup, -45.8, -17.0, 6.9, 5.15, 13.0, 0.6, 0.6);
    box(THREE, g, 0.12, 5.2, 4.8, T.dark, -45.85, 0, 7.6);
    doors(THREE, g, T, hg, 0, [[0.2, 0.26], [0.62, 0.68]], 5.6, 7.6);
    doors(THREE, g, T, hg, 4, [[0.32, 0.38], [0.74, 0.8]], 5.6, 7.6);
    var h01 = blk(THREE, g, T.sup, -17.0, 28.9, 7.3, 5.35, 8.0, 0.3, 0.5);
    doors(THREE, g, T, h01, 0, [[0.1, 0.14], [0.45, 0.49], [0.8, 0.84]], 5.6, 7.5);
    doors(THREE, g, T, h01, 4, [[0.16, 0.2], [0.51, 0.55], [0.86, 0.9]], 5.6, 7.5);
    var fn = blk(THREE, g, T.sup, -17.0, -4.2, 5.2, 7.95, 19.3, 1.0, 1.4);
    doors(THREE, g, T, fn, 0, [[0.3, 0.7]], 15.5, 18.2);
    doors(THREE, g, T, fn, 4, [[0.3, 0.7]], 15.5, 18.2);
    blk(THREE, g, T.dark, -14.3, -7.9, 3.2, 19.25, 23.2, 0.4, 0.8);
    /* the 02 block, the bridge and its glazing */
    blk(THREE, g, T.sup, -3.3, 14.2, 6.2, 7.95, 11.2, 0.4, 0.8);
    var br = blk(THREE, g, T.sup, 14.2, 28.9, 6.7, 7.95, 15.3, 1.4, 1.2);
    glaze(THREE, g, T, br, 12.6, 13.9);
    roofRail(THREE, g, T, [[15.0, 5.0], [27.0, 5.0], [27.0, -5.0], [15.0, -5.0]], 15.3, 0.9);
    /* the mast, its yards and the radar on top */
    tower(THREE, g, T.sup, 4.1, 8.7, 2.3, 11.15, 5.3, 7.6, 1.0, 34.0);
    box(THREE, g, 3.6, 3.2, 0.7, T.sup, 6.4, 0, 34.3);
    roofRail(THREE, g, T, [[4.7, 1.5], [8.1, 1.5], [8.1, -1.5], [4.7, -1.5], [4.7, 1.5]], 34.65, 0.8);
    yard(THREE, g, T, 6.4, 27.8, 4.2, 12.0);
    yard(THREE, g, T, 6.4, 31.0, 2.6);
    if (V.radar === "997") radar(THREE, g, T, "997", 6.4, 0, 37.0);
    else { cylZ(THREE, g, 0.9, 1.1, 1.6, 10, T.dark, 6.4, 0, 35.5); radar(THREE, g, T, "996", 6.4, 0, 37.2); }
    strut(THREE, g, T.metal, 3.2, 0, 11.2, 3.2, 0, 30.0, 0.06, 4);
    /* satcom domes, the dome over the bridge front, the 911 trackers */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 4.0, 3.0, 0.3, T.sup, 0.9, s * 3.7, 11.35);
      radome(THREE, g, T, 0.9, s * 3.7, 11.5, 19.0, 2.6);
    }
    radome(THREE, g, T, 12.4, 0, 11.2, 18.8, 1.8);
    cylZ(THREE, g, 0.7, 0.9, 3.7, 10, T.sup, 15.6, 0, 17.15);
    box(THREE, g, 1.6, 1.8, 1.5, T.white, 15.6, 0, 19.8);
    dish(THREE, g, T.white, 1.0, 16.6, 0, 21.4);
    cylZ(THREE, g, 0.6, 0.8, 5.5, 10, T.sup, -19.0, 0, 15.75);
    radome(THREE, g, T, -19.0, 0, 18.5, 20.5, 1.6);
    strut(THREE, g, T.metal, -22.1, 0, 13.0, -22.1, 0, 30.5, 0.18, 6);
    yard(THREE, g, T, -22.1, 26.0, 2.4);
    /* Harpoon quads (not on the Sea Ceptor ship) */
    if (V.harpoon) { harpoon(THREE, g, T, 25.7, -2.6, 8.0, -0.35); harpoon(THREE, g, T, 33.5, 2.6, tab(T23D, 33.5), 0.35); }
    /* the forward silo: 32 Sea Wolf hatches, or Sea Ceptor's domed lids [L1] */
    var vz = tab(T23D, 39.0);
    box(THREE, g, 7.0, 5.0, 0.3, T.deck, 39.0, 0, vz + 0.1);
    for (i = 0; i < 8; i++) for (s = 0; s < 4; s++) {
      var cx = 35.9 + i * 0.85, cy = -1.8 + s * 1.2;
      if (V.ceptor) sphere(THREE, g, 0.33, T.dark, cx, cy, vz + 0.3, 10, 6).scale.z = 0.7;
      else box(THREE, g, 0.7, 1.0, 0.04, T.dark, cx, cy, vz + 0.27);
    }
    if (V.ceptor) for (s = -1; s <= 1; s += 2) box(THREE, g, 7.4, 0.2, 0.9, T.sup, 39.0, s * 2.7, vz + 0.45);
    /* boats in the waist, rafts, breakwater */
    for (s = -1; s <= 1; s += 2) {
      rhib(THREE, g, T, -9.0, s * 6.0, 9.0, 6.5);
      strut(THREE, g, T.metal, -11.5, s * 6.6, 8.0, -11.5, s * 6.0, 10.8, 0.08, 4);
      strut(THREE, g, T.metal, -6.5, s * 6.6, 8.0, -6.5, s * 6.0, 10.8, 0.08, 4);
      strut(THREE, g, T.sup, 42.0, s * 3.6, tab(T23D, 42) + 0.4, 44.0, 0, tab(T23D, 44) + 0.4, 0.35, 4);
    }
    outfit(THREE, g, T, Hh, {
      rails: [[-66.2, -46.2], [29.3, 65.5]], boll: [-60, -50, 31, 52, 60], hawse: 61.5, hawseZ: 8.0,
      scut: [-40, 40, 3.6, 16], hatch: [[-62, 0, 1.4, 1.2], [55, 1.5, 1.2, 1.2], [55, -1.5, 1.2, 1.2]],
      rafts: [[-30, 6.6, 8.0, 4], [-30, -6.6, 8.0, 4], [22, 6.6, 8.0, 3], [22, -6.6, 8.0, 3], [-36, 6.4, 13.0, 3], [-36, -6.4, 13.0, 3]],
      vents: [[-28, 3, 13.0], [-26, -3, 13.0], [2, 4.5, 11.2], [10, -4.5, 11.2]],
      whips: [[-2.5, 5.5, 11.2, 7.0], [-2.5, -5.5, 11.2, 7.0], [26, 4.8, 15.3, 4.5], [-42, 5.8, 13.0, 6.0]]
    });
    padMarks(THREE, g, T, -56.7, 5.2, 16.0, 3.4);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, -30.0, 0, 13.02);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 20.0, 0, 15.32);
    var tw = turretAt(THREE, 46.8, tab(T23D, 46.8), function (t) { gun45(THREE, t, T, V.gun); });
    return finish(THREE, g, tw, [-56.7, 0, 5.2]);
  }

  /* ================================================ Type 45 [D1][P2]
     Off [D1] Daring, port broadside from a little above, bow left: stem
     head x 125, transom x 1455 (1330 px = 152.4 m, 8.73 px/m); waterline
     row 728; X = 76.2 - (px - 125) / 8.73, z = (728 - row) / 8.73.
       stem head 11.9, deck 9.7 at X 56.5, 8.7 amidships, 9.0 aft; the
       stem at the waterline X 68.8; gun X 48.7; forward deckhouse (the
       Sylver silo) 25.2..44.7 roof 12.8; the hull-wide block -50..27.1
       roof 14.5; bridge 9..27.1 roof 17.3, glazing 15.5-16.8; SAMPSON's
       tower from the bridge roof (3.5..16.4) to 42.3 (8.9..14.6), the
       radome centre X 11.5, z 45.4, r 3.1; yards at 26.9; the block abaft
       it 1.2..-12.1 roof 23.6; the funnel -12.8..-20.2 to 28.3 and its
       pole (X -18.0) to 47.2; the after block -20.2..-40.0 roof 21.4 with
       a step to 18.2 at -36.3; the S1850M tower -22.4..-34.5 (21.4) to
       -25.6..-32.5 (27.3), its antenna centre X -28.6, z 30.0, 8.6 x 3.5;
       hangar roof 17.9 to -50.0, its after face sloping to -53.6 at the
       deck; flight deck -53.6..-76.2 at 9.0.
     The heights of tall items read high on [D1] (seen from above, a
     top's silhouette is its far edge): the gun's shield is drawn at the
     4.0 m measured on [S1] for the same Mod 1 mount.
     V.phalanx: the two Phalanx fitted from 2011 [P2 shows the mount];
     their places abreast the funnel are NOT CONFIRMED (no broadside
     photograph of a Phalanx-fitted ship was found). */
  var T45D = [[-76.2, 9.0], [0, 8.7], [27.9, 8.7], [56.5, 9.7], [76.2, 11.9]];
  var H45 = hullDef(152.4, 10.6, 9.4, 5.7, 7.4, 1.4, function (x) { return tab(T45D, x); }, { stern: 0.94, fl: 1.35 });
  function buildT45(THREE, M, C, V) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i, k;
    var Hh = shell(THREE, g, T, H45, 14);
    var main = blk(THREE, g, T.sup, -50.0, 27.1, 10.0, 8.6, 14.5, 0.9, 1.2);
    doors(THREE, g, T, main, 0, [[0.18, 0.22], [0.4, 0.44], [0.62, 0.66], [0.84, 0.87]], 9.4, 11.6);
    doors(THREE, g, T, main, 4, [[0.13, 0.16], [0.34, 0.38], [0.56, 0.6], [0.78, 0.82]], 9.4, 11.6);
    var fd = blk(THREE, g, T.sup, 25.2, 44.7, 8.0, 8.65, 12.8, 0.6, 2.0);
    for (i = 0; i < 8; i++) for (k = 0; k < 6; k++) box(THREE, g, 0.9, 0.9, 0.04, T.dark, 30.0 + i * 1.15, -2.9 + k * 1.15, 12.82);
    var hg = new THREE.Group(); g.add(hg);
    frustum(THREE, g, T.sup, chamf(-53.6, -36.3, 9.2, 0.6, 0.6), 8.95, chamf(-50.0, -36.3, 8.2, 0.5, 0.5), 17.9);
    box(THREE, g, 0.12, 6.0, 5.6, T.dark, -52.4, 0, 12.0).rotation.y = -0.34;
    blk(THREE, g, T.sup, -40.0, -20.2, 8.4, 14.45, 21.4, 0.8, 1.0);
    blk(THREE, g, T.sup, -12.1, 1.2, 7.0, 14.45, 23.6, 0.8, 1.2);
    var br = blk(THREE, g, T.sup, 9.0, 27.1, 8.6, 14.45, 17.3, 1.6, 1.6);
    glaze(THREE, g, T, br, 15.5, 16.8);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 2.6, 2.0, 0.25, T.sup, 23.0, s * 8.6, 16.0);
    /* SAMPSON's tower, yards, radome */
    tower(THREE, g, T.sup, 3.5, 16.4, 4.6, 17.25, 8.9, 14.6, 1.6, 42.3);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 2.2, 0.06, 1.6, T.dark, 11.0, s * 3.4, 25.0);
    yard(THREE, g, T, 11.5, 26.9, 6.0);
    cylZ(THREE, g, 1.4, 1.6, 0.9, 14, T.sup, 11.5, 0, 42.7);
    sphere(THREE, g, 3.1, T.white, 11.5, 0, 45.4, 22, 14);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 11.5, s * 2.6, 46.8, 11.5, s * 3.8, 48.0, 0.04, 3);
    /* the block abaft it with its domes, the funnel and pole */
    radome(THREE, g, T, -6.0, 3.5, 23.6, 25.5, 1.2);
    radome(THREE, g, T, -6.0, -3.5, 23.6, 25.5, 1.2);
    var fn = blk(THREE, g, T.sup, -20.2, -12.8, 3.2, 21.3, 25.5, 0.3, 0.5);
    blk(THREE, g, T.dark, -19.8, -13.2, 2.6, 25.45, 28.3, 0.4, 0.5);
    strut(THREE, g, T.dark, -18.0, 0, 28.3, -18.0, 0, 47.2, 0.3, 6);
    for (i = 0; i < 4; i++) box(THREE, g, 0.15, 2.4 - i * 0.3, 0.12, T.metal, -18.0, 0, 34 + i * 3.0);
    /* the S1850M tower and antenna */
    tower(THREE, g, T.sup, -34.5, -22.4, 4.2, 21.35, -32.5, -25.6, 2.0, 27.3);
    radar(THREE, g, T, "s1850", -28.6, 0, 30.0);
    strut(THREE, g, T.metal, -38.0, 4.0, 21.4, -36.0, 4.0, 29.0, 0.05, 3);
    if (V.phalanx) for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 3.0, 2.8, 0.3, T.sup, -16.5, s * 6.0, 21.55);
      phalanx(THREE, g, T, -16.5, s * 6.0, 21.7, s * 1.2);
    }
    for (s = -1; s <= 1; s += 2) {
      rhib(THREE, g, T, -30.0, s * 9.6, 11.6, 7.0);
      strut(THREE, g, T.metal, -33, s * 9.9, 14.5, -33, s * 10.2, 12.6, 0.08, 4);
      strut(THREE, g, T.metal, -27, s * 9.9, 14.5, -27, s * 10.2, 12.6, 0.08, 4);
    }
    outfit(THREE, g, T, Hh, {
      rails: [[-75.8, -54.0], [27.5, 75.0]], boll: [-70, -60, 31, 40, 58, 66], hawse: 70.0, hawseZ: 8.5,
      scut: [-44, 24, 5.8, 18], hatch: [[-72, 0, 1.4, 1.4], [62, 2, 1.2, 1.2], [62, -2, 1.2, 1.2]],
      rafts: [[-44, 9.2, 14.5, 4], [-44, -9.2, 14.5, 4], [-8, 6.6, 23.6, 3], [-8, -6.6, 23.6, 3]],
      vents: [[-25, 6, 21.4], [-25, -6, 21.4], [4, 6.5, 14.5], [4, -6.5, 14.5]],
      whips: [[-46, 7.6, 17.9, 6], [-46, -7.6, 17.9, 6], [22, 6, 17.3, 5], [-2, 5.5, 23.6, 6]]
    });
    padMarks(THREE, g, T, -64.9, 9.0, 18.0, 3.8);
    box(THREE, g, 3.0, 1.4, 0.04, T.team, -44.0, 0, 17.92);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, 36.0, 3.8, 12.82);
    var tw = turretAt(THREE, 48.7, tab(T45D, 48.7), function (t) { gun45(THREE, t, T, 1); });
    return finish(THREE, g, tw, [-64.9, 0, 9.0]);
  }

  /* ================================================ Type 22 Batch 1 [T1]
     Off [T1] Broadsword, port broadside, level, bow left: stem x 138,
     transom x 1442 (1304 px = 131.2 m, 9.94 px/m); waterline row 628;
     X = 65.6 - (px - 138) / 9.94, z = (628 - row) / 9.94.
       forecastle deck 7.1 from the stem (6.9) to the hangar; the flight
       deck one deck down, 4.3, from X -45.3 aft; the stem at the waterline
       X 62.4; the Exocet boxes 41.8..47.8; the forward Sea Wolf launcher
       X 38 (the trained mount, "turret"); the forward superstructure from
       X 19.1, bridge roof 12.4 with the 910 tracker on it (to 15); the
       foremast X 9.6, its platform 25.4 and radar to 27.5; the funnel
       -4.0..-13.1 to 17.4 with two black exhaust tops; the mainmast X
       -19.9, black 17.5-22.9, pole to 28.5; the hangar flush with the hull
       sides -21..-45.3 to 8.3; the after tracker block -22.1..-31.2 to
       12.1 (tracker 14.4); the after Sea Wolf launcher X -36.  No gun:
       the Batch 1 ships had none. */
  var T22D = function (x) { return x < -45.6 ? 4.3 : (x < -45.3 ? 4.3 + 2.8 * (x + 45.6) / 0.3 : 7.1 + 0.15 * Math.max(0, (x - 40) / 25.6)); };
  var H22 = hullDef(131.2, 7.4, 7.0, 6.1, 3.2, 1.5, T22D, { stern: 0.93, fl: 1.2, extra: [-45.6, -45.3] });
  function buildT22(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s;
    var Hh = shell(THREE, g, T, H22, 10);
    /* the hangar and after superstructure flush with the hull sides */
    var hg = blk(THREE, g, T.sup, -45.3, -21.0, 7.35, 4.25, 8.3, 0.15, 0.3);
    box(THREE, g, 0.12, 5.0, 3.6, T.dark, -45.35, 0, 6.1);
    var a01 = blk(THREE, g, T.sup, -21.0, 19.1, 6.9, 7.05, 9.0, 0.3, 0.6);
    doors(THREE, g, T, a01, 0, [[0.12, 0.15], [0.4, 0.43], [0.7, 0.73]], 7.2, 8.8);
    doors(THREE, g, T, a01, 4, [[0.27, 0.3], [0.57, 0.6], [0.85, 0.88]], 7.2, 8.8);
    blk(THREE, g, T.sup, -31.2, -22.1, 5.0, 8.25, 12.1, 0.4, 0.6);
    cylZ(THREE, g, 0.6, 0.8, 1.6, 10, T.sup, -24.7, 0, 12.9);
    box(THREE, g, 1.5, 1.6, 1.3, T.white, -24.7, 0, 14.0); dish(THREE, g, T.white, 0.9, -23.8, 0, 14.4);
    var sw2 = new THREE.Group(); sw2.position.set(-36.0, 0, 8.3); sw2.rotation.z = PI; seaWolf6(THREE, sw2, T); g.add(sw2);
    var br = blk(THREE, g, T.sup, 1.0, 19.1, 6.0, 8.95, 12.4, 0.8, 1.6);
    glaze(THREE, g, T, br, 10.8, 11.8);
    cylZ(THREE, g, 0.6, 0.8, 1.6, 10, T.sup, 17.0, 0, 13.2);
    box(THREE, g, 1.5, 1.6, 1.3, T.white, 17.0, 0, 14.3); dish(THREE, g, T.white, 0.9, 17.9, 0, 14.7);
    /* foremast and its radar platform */
    tower(THREE, g, T.sup, 8.0, 11.2, 1.8, 12.35, 9.0, 10.2, 0.8, 25.4);
    box(THREE, g, 2.6, 2.6, 0.5, T.sup, 9.6, 0, 25.4);
    radar(THREE, g, T, "992", 9.6, 0, 26.6);
    yard(THREE, g, T, 9.6, 21.0, 3.4);
    /* the funnel with its two exhaust tops */
    var fn = blk(THREE, g, T.sup, -13.1, -4.0, 4.0, 8.95, 17.4, 1.0, 1.2);
    doors(THREE, g, T, fn, 0, [[0.2, 0.8]], 10.0, 12.0);
    doors(THREE, g, T, fn, 4, [[0.2, 0.8]], 10.0, 12.0);
    cylZ(THREE, g, 1.4, 1.4, 1.0, 12, T.dark, -6.5, 0, 17.6);
    cylZ(THREE, g, 1.0, 1.0, 1.0, 12, T.dark, -10.8, 0, 17.6);
    /* mainmast, black above */
    tower(THREE, g, T.sup, -21.0, -18.8, 1.3, 8.95, -20.5, -19.3, 0.8, 17.5);
    tower(THREE, g, T.dark, -20.5, -19.3, 0.8, 17.45, -20.3, -19.5, 0.6, 22.9);
    strut(THREE, g, T.metal, -19.9, 0, 22.9, -19.9, 0, 28.5, 0.1, 5);
    strut(THREE, g, T.metal, -19.6, 0, 20.5, -15.0, 0, 24.5, 0.06, 4);
    for (s = -1; s <= 1; s += 2) {
      exocetPair(THREE, g, T, 44.8, s * 2.6, 7.1, s * 0.35);
      rhib(THREE, g, T, -12.0, s * 6.6, 9.5, 6.0);
      strut(THREE, g, T.metal, -14.5, s * 6.9, 9.0, -14.5, s * 6.6, 11.0, 0.08, 4);
      strut(THREE, g, T.metal, -9.5, s * 6.9, 9.0, -9.5, s * 6.6, 11.0, 0.08, 4);
      radome(THREE, g, T, -1.5, s * 3.8, 9.0, 11.2, 1.1);
    }
    outfit(THREE, g, T, Hh, {
      rails: [[-65.2, -45.8], [19.5, 64.5]], boll: [-60, -50, 25, 34, 52, 58], hawse: 58.5, hawseZ: 5.0,
      scut: [-40, 18, 4.0, 14], hatch: [[-62, 0, 1.4, 1.2], [30, 2.5, 1.2, 1.2], [30, -2.5, 1.2, 1.2]],
      rafts: [[-28, 6.6, 8.3, 4], [-28, -6.6, 8.3, 4], [4, 6.4, 9.0, 3], [4, -6.4, 9.0, 3]],
      vents: [[-34, 4, 8.3], [-34, -4, 8.3], [-1, 5, 9.0]],
      whips: [[-43, 6.6, 8.3, 6], [-43, -6.6, 8.3, 6], [14, 5, 12.4, 5]]
    });
    padMarks(THREE, g, T, -55.5, 4.3, 16.0, 3.2);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, -38.0, 0, 8.32);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 6.0, 0, 12.42);
    var tw = turretAt(THREE, 38.0, 7.1, function (t) { seaWolf6(THREE, t, T); });
    return finish(THREE, g, tw, [-55.5, 0, 4.3]);
  }

  /* ================================================ Type 42 [B1][M1][P1]
     Two station lists, each off ONE photograph, scaled linearly from its
     published length (both are 3/4 views from the bow quarter, so every
     station carries about +-3 m, NOT CONFIRMED):
       Batch 1 off [B1] Birmingham (stem x 338, stern x 1395, 125 m);
       Batch 3 off [M1] Manchester (stem x 190, stern x 1440, 141.1 m).
     On the two photographs the Batch 3's extra 16 m lies between the
     bridge and the flight deck, not forward of the gun.
     Heights: one set for both batches, off [B1] near the bridge with its
     local scale (hull 7.2 m deep at the deck edge): bridge roof 14.5, the
     909 radomes' tops 20.5 / 19.5, the masts to 30 and their poles,
     funnel 20, hangar 13 (NOT CONFIRMED, +-1.5 m).
     Fits: e80 Sheffield [P1]: the Type 965 double bedstead on the
     foremast, a 992Q on the mainmast, no close-in weapon.  e90 Batch 3
     [M1]: the 1022 planar array on the foremast platform, a 996 on the
     mainmast, the two Phalanx "mounted amidships" (en.wikipedia; their
     exact places are NOT CONFIRMED, [M1] does not show them). */
  var T42S = {
    1: { L: 125.0, hb: 7.15, gun: 36.9, dart: 23.3, brF: 22.0, brA: 4.0, dome: 8.0, fore: -8.0, fun: [-23.0, -12.0], main: -25.2, adome: -30.8, hang: [-44.0, -33.0], pad: -53.3 },
    3: { L: 141.1, hb: 7.45, gun: 59.8, dart: 51.5, brF: 44.0, brA: 24.3, dome: 28.0, fore: 11.6, fun: [-6.0, 2.0], main: -7.3, adome: -16.6, hang: [-37.8, -19.7], pad: -54.2 }
  };
  function buildT42(THREE, M, C, V) {
    var P = T42S[V.batch], L2 = P.L / 2, g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s;
    var D42 = [[-L2, 6.9], [0, 7.2], [L2 - 25, 7.6], [L2, 9.5]];
    var H = hullDef(P.L, P.hb, P.hb - 0.45, 4.2, 4.5, 1.5, function (x) { return tab(D42, x); }, { stern: 0.92, fl: 1.2 });
    var Hh = shell(THREE, g, T, H, 11);
    var a01 = blk(THREE, g, T.sup, P.hang[0], P.brF, P.hb - 0.5, 6.85, 10.0, 0.3, 0.8);
    doors(THREE, g, T, a01, 0, [[0.1, 0.13], [0.35, 0.38], [0.6, 0.63], [0.85, 0.88]], 7.3, 9.4);
    doors(THREE, g, T, a01, 4, [[0.12, 0.15], [0.37, 0.4], [0.62, 0.65], [0.87, 0.9]], 7.3, 9.4);
    blk(THREE, g, T.sup, P.hang[0], P.hang[1], P.hb - 0.9, 9.95, 13.0, 0.4, 0.6);
    box(THREE, g, 0.12, 5.0, 4.6, T.dark, P.hang[0] - 0.05, 0, 9.4);
    var br = blk(THREE, g, T.sup, P.brA, P.brF, 6.0, 9.95, 14.5, 0.6, 1.4);
    glaze(THREE, g, T, br, 12.9, 13.9);
    blk(THREE, g, T.sup, P.main - 3, P.brA + 0.1, 5.4, 9.95, 12.5, 0.4, 0.8);
    radome(THREE, g, T, P.dome, 0, 14.5, 18.1, 2.4);
    /* foremast: plated foot, lattice top, the long-range radar */
    tower(THREE, g, T.sup, P.fore - 1.8, P.fore + 1.8, 1.6, 12.45, P.fore - 1.2, P.fore + 1.2, 1.0, 22.0);
    tower(THREE, g, T.dark, P.fore - 1.2, P.fore + 1.2, 1.0, 21.95, P.fore - 0.6, P.fore + 0.6, 0.5, 30.0);
    yard(THREE, g, T, P.fore, 26.5, 4.0);
    strut(THREE, g, T.metal, P.fore, 0, 30.0, P.fore, 0, V.radar === "965" ? 30.8 : 36.0, 0.1, 5);
    if (V.radar === "965") radar(THREE, g, T, "965", P.fore, 0, 33.5);
    else { box(THREE, g, 2.4, 3.0, 0.3, T.sup, P.fore + 2.6, 0, 22.0); radar(THREE, g, T, "1022", P.fore + 2.6, 0, 24.4); }
    /* funnel, mainmast, after radome */
    var fx = (P.fun[0] + P.fun[1]) / 2, fl = (P.fun[1] - P.fun[0]) / 2;
    var fc = cylZ(THREE, g, 3.2, 3.6, 8.0, 20, T.sup, fx, 0, 14.0); fc.scale.x = fl / 3.4;
    var fk = cylZ(THREE, g, 2.6, 3.2, 2.0, 20, T.sup, fx - 0.5, 0, 19.0); fk.scale.x = fl / 3.4;
    var fb = cylZ(THREE, g, 1.6, 1.6, 0.8, 14, T.dark, fx - 1.0, 0, 20.2); fb.scale.x = 1.5;
    tower(THREE, g, T.sup, P.main - 1.6, P.main + 1.6, 1.5, 12.45, P.main - 1.1, P.main + 1.1, 1.0, 20.0);
    tower(THREE, g, T.dark, P.main - 1.1, P.main + 1.1, 1.0, 19.95, P.main - 0.7, P.main + 0.7, 0.6, 30.0);
    yard(THREE, g, T, P.main, 26.0, 3.6);
    box(THREE, g, 1.8, 1.8, 0.3, T.dark, P.main, 0, 30.1);
    radar(THREE, g, T, V.radar === "965" ? "992" : "996", P.main, 0, 31.4);
    radome(THREE, g, T, P.adome, 0, 13.0, 17.1, 2.4);
    if (V.phalanx) for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 3.0, 2.4, 0.3, T.sup, fx, s * 5.6, 12.6);
      phalanx(THREE, g, T, fx, s * 5.6, 12.75, s * 1.4);
    }
    var sd = new THREE.Group(); sd.position.set(P.dart, 0, tab(D42, P.dart)); seaDart(THREE, sd, T); g.add(sd);
    for (s = -1; s <= 1; s += 2) {
      rhib(THREE, g, T, P.main - 4, s * (P.hb - 0.4), 10.8, 6.0);
      strut(THREE, g, T.metal, P.main - 6.5, s * (P.hb - 0.2), 10.0, P.main - 6.5, s * (P.hb - 0.4), 12.0, 0.08, 4);
      strut(THREE, g, T.metal, P.main - 1.5, s * (P.hb - 0.2), 10.0, P.main - 1.5, s * (P.hb - 0.4), 12.0, 0.08, 4);
    }
    outfit(THREE, g, T, Hh, {
      rails: [[-L2 + 0.4, P.hang[0] - 0.4], [P.brF + 0.4, L2 - 1.0]], boll: [-L2 + 6, P.hang[0] - 6, P.brF + 3, P.gun + 6, L2 - 8],
      hawse: L2 - 6.5, hawseZ: 6.5, scut: [P.hang[0] + 3, P.brF - 3, 4.3, 16],
      hatch: [[-L2 + 4, 0, 1.3, 1.2], [P.gun + 4, 1.8, 1.1, 1.1], [P.gun + 4, -1.8, 1.1, 1.1]],
      rafts: [[P.hang[0] + 5, P.hb - 0.8, 10.0, 4], [P.hang[0] + 5, -P.hb + 0.8, 10.0, 4], [P.brA + 3, 5.4, 12.5, 3], [P.brA + 3, -5.4, 12.5, 3]],
      vents: [[P.hang[1] - 3, 3, 13.0], [P.hang[1] - 3, -3, 13.0]],
      whips: [[P.hang[0] + 2, 5.5, 13.0, 6], [P.hang[0] + 2, -5.5, 13.0, 6], [P.brF - 3, 5, 14.5, 4]]
    });
    padMarks(THREE, g, T, P.pad, tab(D42, P.pad), 14.0, 3.0);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, (P.hang[0] + P.hang[1]) / 2, 0, 13.02);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, P.brA + 4.0, 0, 14.52);
    var tw = turretAt(THREE, P.gun, tab(D42, P.gun), function (t) { gun45(THREE, t, T, 0); });
    return finish(THREE, g, tw, [P.pad, 0, tab(D42, P.pad)]);
  }

  /* ================================================ patrol vessels
     River Batch 2 off [R2] Forth, port broadside, level, distant: stem
     head x 539, stern x 1063 (524 px = 90.5 m, 5.79 px/m); waterline row
     676; X = 45.25 - (px - 539) / 5.79, z = (676 - row) / 5.79.
       stem head 6.2, forecastle 6.0; the flight deck 4.5 from X -12 aft;
       the 30 mm X 21.9 on the forecastle; the superstructure 0.9..18.1
       (01 roof 9.0), the bridge on it to 11.7 (glazing 10.3-11.2); the
       mast 2.4..6.9 to 21.4, its pole to 27.5; the funnel block
       -12.0..-2.9 to 11.2; the crane abaft it to 9.7.
     River Batch 1 off [R1] Mersey (port bow 3/4, heavy perspective) and
     [R1b] Tyne: the high bulwarked forecastle, the hull knuckle, the
     long low working deck aft with its crane, no flight deck.  Stations
     scaled linearly (13.4 px/m near the bridge) and heights from the
     bridge's local scale: NOT CONFIRMED, +-2 m.
     Island off [I1] Guernsey (starboard broadside, level, 23.2 px/m):
     the trawler sheer (bulwark top 6.8 aft, 7.5 at X 5.2, 8.6 at 10.6,
     10.0 at the stem); the deckhouse -14.7..5.2 to 10.8, its after part
     to 12.0, the bridge -12..-0.2 to 15.3; the mast X -8.0.  The Bofors
     on the forecastle is not distinct on [I1]: drawn at X 16 (NOT
     CONFIRMED place).
     Castle off [K1] (ex-Dumbarton/Leeds Castle in Bangladeshi service,
     port broadside, 6.28 px/m) for the hull and superstructure, and [K2]
     Dumbarton Castle from astern in 1980s-2010 RN service for the flight
     deck aft and the mast: stem head 7.2, deck 5.3, the flight deck 4.5
     from X -14.1 aft; the deckhouse -14.1..9.0 to 8.0, the bridge block
     -11.3..3.9 to 12.6, mast X -7.6 to 17.4.  [K1] has a 76 mm added in
     Bangladesh; the RN 40 mm Bofors (en.wikipedia) is drawn in its
     place, X 15.3 (NOT CONFIRMED shape: the Island's mount). */
  function patrolBase(THREE, g, T, H, top) { return shell(THREE, g, T, H, top); }
  var RIV2D = function (x) { return x < -12.3 ? 4.5 : (x < -12.0 ? 4.5 + 1.5 * (x + 12.3) / 0.3 : 6.0 + 0.2 * Math.max(0, (x - 30) / 15.25)); };
  var HR2 = hullDef(90.5, 6.75, 6.3, 4.6, 4.2, 0.8, RIV2D, { stern: 0.95, fl: 1.4, extra: [-12.3, -12.0] });
  function buildRiver2(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s;
    var Hh = shell(THREE, g, T, HR2, 8);
    var a01 = blk(THREE, g, T.sup, -12.0, 18.1, 6.3, 5.95, 9.0, 0.4, 1.0);
    doors(THREE, g, T, a01, 0, [[0.15, 0.19], [0.5, 0.54]], 6.2, 8.2);
    doors(THREE, g, T, a01, 4, [[0.46, 0.5], [0.81, 0.85]], 6.2, 8.2);
    var br = blk(THREE, g, T.sup, 0.9, 17.4, 5.6, 8.95, 11.7, 0.6, 1.6);
    glaze(THREE, g, T, br, 10.3, 11.2);
    tower(THREE, g, T.sup, 2.4, 6.9, 1.8, 11.65, 3.8, 5.4, 0.8, 21.4);
    box(THREE, g, 2.4, 2.4, 0.4, T.sup, 4.6, 0, 18.0);
    radar(THREE, g, T, "992", 4.6, 0, 22.2);
    strut(THREE, g, T.metal, 4.6, 0, 21.4, 4.6, 0, 27.5, 0.07, 4);
    yard(THREE, g, T, 4.6, 19.5, 2.6);
    radome(THREE, g, T, 9.0, 3.0, 11.7, 13.0, 0.8);
    radome(THREE, g, T, 9.0, -3.0, 11.7, 13.0, 0.8);
    var fn = blk(THREE, g, T.sup, -12.0, -2.9, 4.4, 8.95, 11.2, 0.5, 0.8);
    blk(THREE, g, T.dark, -9.5, -6.0, 1.8, 11.15, 12.0, 0.2, 0.4);
    /* crane and boat abaft the funnel */
    cylZ(THREE, g, 0.4, 0.5, 3.0, 8, T.sup, -14.0, -4.0, 7.5);
    strut(THREE, g, T.sup, -14.0, -4.0, 9.0, -19.0, -2.0, 9.7, 0.18, 5);
    for (s = -1; s <= 1; s += 2) rhib(THREE, g, T, -6.0, s * 6.6, 7.0, 6.0);
    outfit(THREE, g, T, Hh, {
      rails: [[-45.0, -12.4], [18.4, 44.0]], boll: [-40, -20, 26, 36], hawse: 40.0, hawseZ: 4.2,
      scut: [-10, 16, 3.4, 9], hatch: [[30, 0, 1.2, 1.2], [-42, 0, 1.0, 1.0]],
      rafts: [[-4, 5.6, 9.0, 3], [-4, -5.6, 9.0, 3]], vents: [[-1, 4.2, 9.0]],
      whips: [[-11, 4.0, 11.2, 5], [-11, -4.0, 11.2, 5]]
    });
    padMarks(THREE, g, T, -29.5, 4.5, 14.0, 3.6);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 8.0, 0, 11.72);
    var tw = turretAt(THREE, 21.9, 6.0, function (t) { smallGun(THREE, t, T, "ds30"); });
    return finish(THREE, g, tw, [-29.5, 0, 4.5]);
  }
  var RIV1D = [[-39.75, 3.6], [-20.5, 3.6], [-20.0, 5.0], [10, 5.2], [25, 6.4], [39.75, 8.0]];
  var HR1 = hullDef(79.5, 6.75, 6.4, 3.8, 4.0, 0.6, function (x) { return tab(RIV1D, x); }, { stern: 0.97, fl: 1.6, extra: [-20.5, -20.0] });
  function buildRiver1(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s;
    var Hh = shell(THREE, g, T, HR1, 10);
    var a01 = blk(THREE, g, T.sup, -16.6, 11.8, 6.4, 5.15, 8.6, 0.4, 0.8);
    doors(THREE, g, T, a01, 0, [[0.2, 0.24], [0.6, 0.64]], 5.4, 7.6);
    doors(THREE, g, T, a01, 4, [[0.36, 0.4], [0.76, 0.8]], 5.4, 7.6);
    var br = blk(THREE, g, T.sup, -6.0, 11.4, 5.8, 8.55, 12.0, 0.6, 1.8);
    glaze(THREE, g, T, br, 10.5, 11.5);
    box(THREE, g, 8.0, 12.6, 0.25, T.sup, 6.5, 0, 12.1);
    tower(THREE, g, T.sup, -12.9, -7.6, 2.0, 11.95, -11.4, -9.0, 1.0, 16.0);
    tower(THREE, g, T.dark, -11.4, -9.0, 1.0, 15.95, -10.8, -9.6, 0.5, 19.5);
    box(THREE, g, 2.6, 6.0, 0.3, T.dark, -10.2, 0, 16.0);
    box(THREE, g, 2.0, 3.6, 0.3, T.dark, -10.2, 0, 19.5);
    radar(THREE, g, T, "992", -10.2, 0, 20.6);
    strut(THREE, g, T.metal, -10.2, 0, 19.5, -10.2, 0, 24.0, 0.07, 4);
    radome(THREE, g, T, -3.0, 3.2, 12.0, 13.6, 0.9);
    radome(THREE, g, T, -1.0, -3.2, 12.0, 13.6, 0.9);
    /* the 25 t crane on the working deck [R1] */
    cylZ(THREE, g, 0.6, 0.7, 4.0, 10, T.sup, -19.0, -4.8, 7.0);
    strut(THREE, g, T.sup, -19.0, -4.8, 8.6, -28.0, -1.5, 11.5, 0.22, 6);
    for (s = -1; s <= 1; s += 2) rhib(THREE, g, T, -14.0, s * 6.4, 9.2, 6.0);
    outfit(THREE, g, T, Hh, {
      rails: [[-39.4, -20.8], [11.8, 13.0]], boll: [-36, -30, -24, 30], hawse: 33.5, hawseZ: 5.5,
      scut: [-15, 10, 3.2, 8], hatch: [[-30, 2.5, 3.0, 2.0], [-30, -2.5, 3.0, 2.0], [-36, 0, 1.2, 1.2]],
      rafts: [[-8, 6.0, 8.6, 3], [-8, -6.0, 8.6, 3]], whips: [[-15, 5, 8.6, 5], [-15, -5, 8.6, 5]]
    });
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 6.0, 0, 12.25);
    var tw = turretAt(THREE, 18.5, tab(RIV1D, 18.5), function (t) { smallGun(THREE, t, T, "o20"); });
    return finish(THREE, g, tw, null);
  }
  var ISLD = [[-29.75, 6.8], [-14.7, 7.0], [5.2, 7.5], [10.6, 8.6], [29.75, 10.0]];
  var HIS = hullDef(59.5, 5.5, 5.3, 4.3, 3.0, 0.5, function (x) { return tab(ISLD, x); }, { stern: 0.93, fl: 1.4 });
  function buildIsland(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s;
    var Hh = shell(THREE, g, T, HIS, 12);
    var a = blk(THREE, g, T.sup, -14.7, 5.2, 4.7, 6.9, 10.8, 0.3, 0.6);
    doors(THREE, g, T, a, 0, [[0.2, 0.25], [0.6, 0.65]], 7.2, 9.4);
    doors(THREE, g, T, a, 4, [[0.35, 0.4], [0.75, 0.8]], 7.2, 9.4);
    blk(THREE, g, T.sup, -14.7, -0.2, 4.3, 10.75, 12.0, 0.2, 0.5);
    var br = blk(THREE, g, T.sup, -12.0, -0.2, 4.0, 11.95, 15.3, 0.4, 0.9);
    glaze(THREE, g, T, br, 13.2, 14.5);
    strut(THREE, g, T.sup, -8.0, 0, 15.3, -8.0, 0, 22.0, 0.35, 6);
    strut(THREE, g, T.metal, -8.0, 0, 22.0, -8.0, 0, 25.5, 0.08, 4);
    yard(THREE, g, T, -8.0, 20.0, 2.6);
    radar(THREE, g, T, "992", -8.0, 0, 23.0);
    blk(THREE, g, T.sup, -18.0, -14.7, 1.6, 6.9, 10.0, 0.2, 0.3);
    cylZ(THREE, g, 0.3, 0.35, 4.0, 8, T.sup, -20.0, -3.0, 9.0);
    strut(THREE, g, T.sup, -20.0, -3.0, 10.5, -25.0, -1.5, 10.0, 0.15, 5);
    for (s = -1; s <= 1; s += 2) rhib(THREE, g, T, -9.0, s * 4.8, 11.5, 5.0);
    outfit(THREE, g, T, Hh, {
      rails: [[-29.4, -15.2], [5.6, 28.8]], boll: [-26, -20, 12, 22], hawse: 25.0, hawseZ: 7.5,
      scut: [-14, 4, 5.0, 7], hatch: [[-24, 0, 1.6, 1.6], [11, 0, 1.2, 1.2]],
      rafts: [[-4, 4.4, 10.8, 2], [-4, -4.4, 10.8, 2]], whips: [[-13, 3.5, 12.0, 5], [-13, -3.5, 12.0, 5]]
    });
    box(THREE, g, 1.8, 1.0, 0.04, T.team, -6.0, 0, 15.32);
    var tw = turretAt(THREE, 16.0, tab(ISLD, 16.0), function (t) { smallGun(THREE, t, T, "b40"); });
    return finish(THREE, g, tw, null);
  }
  var CASD = function (x) { return x < -14.4 ? 4.5 : (x < -14.1 ? 4.5 + 0.8 * (x + 14.4) / 0.3 : (x < 20 ? 5.3 : 5.3 + 1.9 * Math.pow((x - 20) / 20.5, 1.5))); };
  var HCA = hullDef(81.0, 5.75, 5.5, 3.4, 3.0, 0.6, CASD, { stern: 0.95, fl: 1.3, extra: [-14.4, -14.1] });
  function buildCastle(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s;
    var Hh = shell(THREE, g, T, HCA, 8);
    var a = blk(THREE, g, T.sup, -14.1, 9.0, 5.1, 5.25, 8.0, 0.3, 0.6);
    doors(THREE, g, T, a, 0, [[0.15, 0.19], [0.55, 0.59]], 5.5, 7.4);
    doors(THREE, g, T, a, 4, [[0.41, 0.45], [0.81, 0.85]], 5.5, 7.4);
    var br = blk(THREE, g, T.sup, -11.3, 3.9, 4.4, 7.95, 12.6, 0.4, 1.0);
    glaze(THREE, g, T, br, 11.2, 12.2);
    strut(THREE, g, T.sup, -7.6, 0, 12.6, -7.6, 0, 17.4, 0.35, 6);
    strut(THREE, g, T.metal, -7.6, 0, 17.4, -7.6, 0, 21.0, 0.08, 4);
    yard(THREE, g, T, -7.6, 16.0, 2.6);
    radar(THREE, g, T, "992", -7.6, 0, 18.2);
    blk(THREE, g, T.dark, -12.5, -9.5, 1.2, 12.55, 13.6, 0.1, 0.3);
    for (s = -1; s <= 1; s += 2) rhib(THREE, g, T, -4.0, s * 5.0, 9.0, 5.0);
    outfit(THREE, g, T, Hh, {
      rails: [[-40.2, -14.6], [9.4, 39.5]], boll: [-36, -18, 14, 26], hawse: 35.0, hawseZ: 5.0,
      scut: [-13, 8, 3.4, 8], hatch: [[24, 0, 1.2, 1.2]],
      rafts: [[2, 4.6, 8.0, 2], [2, -4.6, 8.0, 2]], whips: [[-13, 4, 8.0, 5], [-13, -4, 8.0, 5]]
    });
    padMarks(THREE, g, T, -27.5, 4.5, 14.0, 3.6);
    box(THREE, g, 1.8, 1.0, 0.04, T.team, -4.0, 0, 12.62);
    var tw = turretAt(THREE, 15.3, 5.3, function (t) { smallGun(THREE, t, T, "b40"); });
    return finish(THREE, g, tw, [-27.5, 0, 4.5]);
  }

  /* ================================================ SSNs [Q1][Q2][Q3]
     Each hull read column by column (alpha profile, 25 px steps) off the
     en.wikipedia profile drawing of its class, scaled from the published
     length, the keel put at the published draught below the waterline
     (surfaced trim, as js/hero/ru_kilo.js):
       Swiftsure [Q1] "Swiftsure class SSN.svg" 19.25 px/m, WL row 291;
       Trafalgar [Q2] "Trafalgar class SSN.svg" 18.68 px/m, WL row 264.5;
       Astute    [Q3] "Astute class SSN.svg"    16.43 px/m, WL row 233
                 (the drawing is cut at the keel row 397 = -10.0 m).
     Rows: X, hull top (casing), keel.  The plan width is the published
     beam, the section a superellipse (NOT CONFIRMED).  Sails: plan width
     NOT CONFIRMED (2.6-3.0 m).  [Q2] draws HMS Trafalgar's own
     seven-bladed screw; [Q1] a shrouded tail cone; [Q3] the pump-jet. */
  var SUB = {
    swift: { B: 9.8, rows: [[-41.45, -3.3, -3.6], [-40.3, -1.66, -5.40], [-38.9, -1.30, -5.77], [-37.7, -0.99, -6.08], [-33.8, 0.2, -7.0],
      [-31.2, 0.47, -7.53], [-28.6, 0.99, -8.0], [-26.0, 1.51, -8.36], [-23.4, 1.87, -8.5], [-20.8, 2.13, -8.5], [-18.2, 2.29, -8.5],
      [-15.6, 2.34, -8.5], [20.8, 2.34, -8.5], [23.4, 2.18, -8.5], [26.0, 2.08, -8.47], [28.6, 1.87, -8.21], [31.2, 1.61, -7.95],
      [33.8, 1.14, -7.64], [36.4, 0.52, -7.22], [39.0, -0.26, -6.75], [40.3, -0.78, -6.44], [41.0, -1.6, -5.4], [41.45, -3.0, -4.0]],
      sail: [6.5, 15.0, 7.7, 1.4], rud: [-36.4, -33.8, 2.5, -9.35], mast: [[13.0, 11.2], [11.5, 10.4], [10.2, 9.8]], tail: "cone" },
    traf: { B: 9.8, rows: [[-42.7, -4.2, -4.8], [-41.5, -2.9, -6.0], [-40.2, -3.1, -6.2], [-38.8, -2.86, -6.18], [-35.5, -1.6, -7.5],
      [-33.4, -0.99, -8.05], [-32.1, -0.67, -8.38], [-29.4, -0.03, -8.91], [-26.7, 0.46, -9.34], [-24.1, 0.88, -9.45], [-21.4, 1.15, -9.5],
      [-18.7, 1.31, -9.5], [-16.0, 1.36, -9.5], [21.4, 1.36, -9.5], [24.1, 1.15, -9.5], [26.8, 1.04, -9.39], [29.5, 0.83, -9.18],
      [32.1, 0.56, -8.91], [34.8, 0.08, -8.59], [37.5, -0.56, -8.16], [40.2, -1.26, -7.74], [41.5, -1.79, -7.41], [42.3, -3.0, -6.0], [42.7, -4.4, -4.8]],
      sail: [6.2, 15.5, 6.7, 1.35], rud: [-37.5, -33.7, 3.2, -10.2], mast: [[13.5, 9.0], [12.0, 8.6], [14.6, 14.0]], tail: "screw" },
    astute: { B: 11.3, rows: [[-48.5, -3.9, -5.3], [-47.2, -2.56, -6.76], [-45.6, -2.07, -7.18], [-44.1, -2.98, -6.33], [-41.0, -1.9, -7.5],
      [-38.0, -1.03, -8.28], [-36.5, -0.55, -8.76], [-33.5, 0.43, -9.68], [-30.4, 1.34, -10.0], [-27.4, 2.19, -10.0], [-24.3, 2.50, -10.0],
      [-9.1, 2.50, -10.0], [0.0, 2.07, -10.0], [21.0, 1.70, -10.0], [33.5, 1.64, -10.0], [36.5, 1.40, -9.86], [39.6, 0.79, -9.25],
      [42.6, 0.06, -8.52], [45.7, -0.85, -7.73], [47.2, -2.19, -7.06], [48.1, -3.4, -5.9], [48.5, -4.5, -5.0]],
      sail: [1.2, 20.7, 7.0, 1.6, 4.3, 19.2], rud: [-42.9, -38.3, 3.9, -12.6], mast: [[16.0, 13.8], [14.5, 11.4], [12.0, 10.8], [10.0, 9.6]], tail: "pumpjet" }
  };
  function buildSub(THREE, M, C, key) {
    var D = SUB[key], g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    function row(x) {
      var R = D.rows, k;
      for (k = 1; k < R.length; k++) if (x <= R[k][0]) {
        var a = R[k - 1], b = R[k], f = (x - a[0]) / (b[0] - a[0]);
        return [a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
      }
      return [R[R.length - 1][1], R[R.length - 1][2]];
    }
    var xs = [], x, NR = 32, ZB = -0.12;
    for (x = D.rows[0][0]; x < D.rows[D.rows.length - 1][0]; x += 1.2) xs.push(x);
    D.rows.forEach(function (r) { xs.push(r[0]); });
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.15; });
    var rings = xs.map(function (xx) {
      var r = row(xx), zt = r[0], zb = r[1], zc = (zt + zb) / 2, h = Math.max(0.05, (zt - zb) / 2), w = Math.min(D.B / 2, h), o = [], k;
      for (k = 0; k < NR; k++) {
        var a = -PI / 2 + 2 * PI * k / NR, c = Math.cos(a), sn = Math.sin(a), n = sn > 0 ? 2.6 : 2.2;
        o.push([w * Math.sign(c) * Math.pow(Math.abs(c), 2 / n), zc + h * Math.sign(sn) * Math.pow(Math.abs(sn), 2 / n)]);
      }
      return o;
    });
    var hm = ringLoft(THREE, new THREE.Group(), T.tile, xs, rings, true, 0.12);
    (function split() {
      var geo = hm.geometry.toNonIndexed(), P = geo.attributes.position.array, U = geo.attributes.uv.array;
      var A = { p: [], u: [] }, B = { p: [], u: [] }, f, k;
      for (f = 0; f < P.length / 9; f++) {
        var zm = (P[f * 9 + 2] + P[f * 9 + 5] + P[f * 9 + 8]) / 3, Dd = zm >= ZB ? A : B;
        for (k = 0; k < 9; k++) Dd.p.push(P[f * 9 + k]);
        for (k = 0; k < 6; k++) Dd.u.push(U[f * 6 + k]);
      }
      g.add(new THREE.Mesh(geoOf(THREE, A.p, A.u), T.tile));
      g.add(new THREE.Mesh(geoOf(THREE, B.p, B.u), T.under));
    })();
    /* the flat casing along the top, its walkway line and fittings */
    var c0 = -20, c1 = 34;
    for (x = c0; x < c1; x += 2.0) {
      var zt = row(x + 1.0)[0];
      box(THREE, g, 2.0, 2.4, 0.06, T.tile, x + 1.0, 0, zt + 0.0);
    }
    /* the sail: a rounded front, flat sides, top at D.sail[2] */
    var S = D.sail, sx0 = S[0], sx1 = S[1], shw = S[3];
    function sPlan(a, b, hw) {
      var o = [], k;
      for (k = 0; k <= 8; k++) { var t = -PI / 2 + PI * k / 8; o.push([b - hw * 1.4 + hw * 1.4 * Math.cos(t), hw * Math.sin(t)]); }
      o.push([a + 0.8, hw * 0.9]); o.push([a, hw * 0.35]); o.push([a, -hw * 0.35]); o.push([a + 0.8, -hw * 0.9]);
      return polyCCW(o);
    }
    var zs = row((sx0 + sx1) / 2)[0] - 0.2;
    if (S.length > 4) {      /* Astute: the faired front and its fillet [Q3] */
      frustum(THREE, g, T.tile, sPlan(sx0, sx1, shw * 1.25), zs, sPlan(S[4] - 1.5, S[5] + 0.8, shw), zs + 1.6);
      frustum(THREE, g, T.tile, sPlan(S[4] - 1.5, S[5] + 0.8, shw), zs + 1.55, sPlan(S[4], S[5], shw * 0.95), S[2]);
    } else frustum(THREE, g, T.tile, sPlan(sx0, sx1, shw), zs, sPlan(sx0 + 0.2, sx1 - 0.2, shw * 0.95), S[2]);
    var top = S.length > 4 ? [S[4], S[5]] : [sx0 + 0.2, sx1 - 0.2];
    box(THREE, g, 1.4, 1.6, 0.4, T.tile, top[1] - 1.4, 0, S[2] + 0.2);
    box(THREE, g, (top[1] - top[0]) * 0.4, shw * 1.4, 0.05, T.dark, top[1] - 2.8, 0, S[2] + 0.03);
    D.mast.forEach(function (m, k) {
      strut(THREE, g, k === 0 ? T.metal : T.tile, m[0] - (sx1 - sx0) * 0.18, 0, S[2], m[0] - (sx1 - sx0) * 0.18, 0, m[1], k === 0 ? 0.08 : 0.22, 6);
    });
    /* rudders and stern planes: a cruciform tail [Q1-Q3] */
    var R = D.rud, ax = (row(R[1])[0] + row(R[1])[1]) / 2;
    fin(THREE, g, T.tile, [[R[0], ax], [R[1], ax], [R[1] - 0.6, R[2]], [R[0] + 0.3, R[2]]], 0.45, "xz");
    fin(THREE, g, T.under, [[R[0], ax], [R[1], ax], [R[1] - 0.6, R[3]], [R[0] + 0.3, R[3]]], 0.45, "xz");
    var sp = D.B / 2 + 1.5;
    for (s = -1; s <= 1; s += 2) fin(THREE, g, T.under, [[R[0], 0], [R[1], 0], [R[1] - 0.6, s * sp], [R[0] + 0.3, s * sp]], 0.4, "xy", ax - 0.2);
    var tx = D.rows[0][0], tz = (D.rows[0][1] + D.rows[0][2]) / 2;
    if (D.tail === "screw") {
      cylX(THREE, g, 0.3, 0.7, 1.4, 12, T.metal, tx + 0.5, 0, tz);
      for (i = 0; i < 7; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.9, 1.8), T.metal);
        bl.position.set(tx + 0.6, 0, tz); bl.rotation.x = i * 2 * PI / 7; bl.translateZ(1.2); bl.rotation.y = 0.5; g.add(bl);
      }
    } else if (D.tail === "pumpjet") {
      var pj = cylX(THREE, g, 2.4, 2.55, 3.6, 20, T.under, tx + 2.2, 0, -4.6, true);
      pj.material = T.under;
      cylX(THREE, g, 2.3, 2.4, 3.4, 20, T.tile, tx + 2.2, 0, -4.6, true).scale.set(1, 0.97, 0.97);
    }
    /* bow planes housed in the casing's flank (Astute's show on [Q3]) and the escape hatches */
    for (s = -1; s <= 1; s += 2) {
      var bx = D.rows[D.rows.length - 1][0] - 9.0, bz = row(bx)[0] - 1.5;
      fin(THREE, g, T.tile, [[bx - 1.5, 0], [bx + 1.5, 0], [bx + 0.8, s * 1.2], [bx - 1.2, s * 1.2]], 0.25, "xy", bz).translate(0, s * (D.B / 2 - 0.4), 0);
    }
    [-14, 22, 30].forEach(function (hx) { cylZ(THREE, g, 0.45, 0.45, 0.08, 12, T.dark, hx, 0, row(hx)[0] + 0.05); });
    for (s = -1; s <= 1; s += 2) [-10, 0, 24].forEach(function (cx) { cylZ(THREE, g, 0.12, 0.15, 0.4, 6, T.metal, cx, s * 1.0, row(cx)[0] + 0.2); });
    box(THREE, g, 2.0, 0.8, 0.04, T.team, (top[0] + top[1]) / 2, 0, S[2] + 0.02);
    box(THREE, g, 3.0, 1.0, 0.04, T.team, -12.0, 0, row(-12)[0] + 0.05);
    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  /* ================================================ carriers
     The flight deck is a clean plate: render3d.js lays its deck park out
     on the model's own height field (deckLayout / placeOn, the level of
     the after eighth), so the after deck is flat and its marks lie 4 mm
     proud.  The ski-jump, island and mounts stand off the parking area. */
  function skiJump(THREE, g, T, x1, L, y0, y1, fd, deg) {
    var n = 10, i, xs = [], rings = [], A = deg * PI / 180;
    for (i = 0; i <= n; i++) {
      var t = i / n, xx = x1 - L + L * t, zz = fd + L * Math.tan(A) * t * t / 2;
      xs.push(xx);
      rings.push([[y0, fd - 0.6], [y1, fd - 0.6], [y1, zz], [y0, zz]]);
    }
    ringLoft(THREE, g, T.deck, xs, rings, true, 0.12);
    return fd + L * Math.tan(A) / 2;
  }
  /* the flight deck's overhang (rework round 2026-11-12): the outer band
     under the deck edge (zTop down by band) and the soffit that slopes
     from it back to the hull side, all round the plan poly (CCW), so the
     deck no longer floats over a bare hull [V4][Z2].  slope: metres of
     drop per metre inboard; zMin: the lowest the soffit may come. */
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
  /* an elliptical funnel X x0..x1, half width hw, from z0 to z1, its top
     drawn in by k, with a black cap (the Invincibles' funnels [V4]) */
  function ellFunnel(THREE, g, T, x0, x1, hw, z0, z1, k, cap) {
    var r = hw, sx = (x1 - x0) / 2 / hw, xc = (x0 + x1) / 2;
    var f = cylZ(THREE, g, r * k, r, z1 - z0, 24, T.sup, xc, 0, (z0 + z1) / 2); f.scale.x = sx;
    var c = cylZ(THREE, g, r * k * 0.97, r * k, cap, 24, T.under, xc, 0, z1 + cap / 2 - 0.02); c.scale.x = sx;
    var l = cylZ(THREE, g, r * k * 1.03, r * k * 1.03, 0.35, 24, T.metal, xc, 0, z1 - 0.3); l.scale.x = sx;
    return f;
  }
  function deckLines(THREE, g, T, x0, x1, y, z) {
    box(THREE, g, x1 - x0, 0.3, 0.008, T.white, (x0 + x1) / 2, y, z + 0.004);
  }
  function lift(THREE, g, T, x, y, lx, ly, z) {
    box(THREE, g, lx, 0.2, 0.008, T.white, x, y - ly / 2, z + 0.004);
    box(THREE, g, lx, 0.2, 0.008, T.white, x, y + ly / 2, z + 0.004);
    box(THREE, g, 0.2, ly, 0.008, T.white, x - lx / 2, y, z + 0.004);
    box(THREE, g, 0.2, ly, 0.008, T.white, x + lx / 2, y, z + 0.004);
  }

  /* Invincible [V2][V3][V4][V1]
     Island off [V3] "HMS Invincible Falklands war 1982" (starboard
     broadside, distant; stern x 742, bow x 177: 565 px = 209 m, 2.70
     px/m; X = 104.5 - (px - 177) / 2.70; flight deck row 310): the
     island X -40..47.8; the bridge block 27.5..47.8 to +25.9 over the
     deck; the forward funnel 12.6..24.9 to +32.6; the main mast tower
     -2.2..5.2 to +40.7, its pole to +49; the after funnel -22.5..-10.3
     to +30.4; the after radome X -36.4, top +24.1.  Those heights agree
     with the ratio on [V4] (Illustrious) to 4 per cent, but both views
     are a little off the beam: they are an upper bound.
     The flight deck's height over the water, 15.0 m, off [V2] (the 1982
     homecoming from astern: transom 215 px deep on a 425 px waterline
     beam taken as the published 27.5 m, 30 deg down): NOT CONFIRMED
     (+-2 m; [V3] reads only 7.4 m with the waterline lost in the swell).
     The deck plan from the published 209 x 36 m; its outline, the lifts
     and the island's width (6.5 m) are NOT CONFIRMED.
     V.ski: 7 deg (Invincible as built, en.wikipedia) or 12 deg (both
     sisters from their 1980s-90s refits); V.ciws: none in 1980, three
     Goalkeeper on the 1990s ship (en.wikipedia; [V1] shows the bow
     mount; the two after places NOT CONFIRMED); Sea Dart on the
     forecastle in both (removed in the late 1990s).
     REWORK 2026-11-12 (visual review: the island read as four slab
     towers): the funnels are now ELLIPTICAL with black caps and the main
     mast tower black above its gallery, as [V4] shows; the base is two
     decks, the bridge block three stepped tiers with galleries; the 1022
     moved to the foremast over the bridge and the 992 to the main mast
     ([V4]: the planar array stands forward, the small reflector on the
     black-topped tower; the earlier build had them swapped); the deck
     edge gets its overhang band and soffit with the gallery openings and
     the hull side its boat-bay openings ([V4]).  Stations and heights
     are those measured above; plan widths of the tiers NOT CONFIRMED. */
  var INV = { FD: 15.0 };
  function buildInvincible(THREE, M, C, V) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i, FD = INV.FD;
    var D = function (x) { return x > 69.3 ? FD - 2.6 : (x > 69.0 ? FD - 1.0 - 1.6 * (x - 69.0) / 0.3 : FD - 1.0); };
    var H = hullDef(209.0, 14.2, 13.75, 8.0, 7.0, 2.0, D, { stern: 0.98, fl: 1.3, extra: [69.0, 69.3] });
    var Hh = shell(THREE, g, T, H, FD);
    var poly = polyCCW([[-104.5, -15.8], [-104.5, 16.5], [-100, 18.0], [82, 18.0], [104.5, 13.5], [104.5, 2.5], [69.0, 2.5],
      [69.0, -13.5], [50, -16.5], [-104.5, -16.5]]);
    plate(THREE, g, T.deck, poly, FD, 1.0, T.sup);
    /* under the ski-jump the hull side is carried up to the plate */
    box(THREE, g, 31.0, 11.0, 1.7, T.hull, 85.5, 8.0, FD - 1.8);
    var top = skiJump(THREE, g, T, 104.5, V.ski >= 12 ? 37.0 : 27.0, 2.6, 13.4, FD, V.ski);
    /* deck marks: the runway's edge lines and centreline, landing spots */
    deckLines(THREE, g, T, -100, 104 - (V.ski >= 12 ? 37 : 27), 8.0, FD);
    deckLines(THREE, g, T, -100, 66, 1.2, FD); deckLines(THREE, g, T, -100, 66, 14.8, FD);
    for (i = 0; i < 5; i++) padMarks(THREE, g, T, -88 + i * 26, FD, 0.1, 3.0);
    lift(THREE, g, T, 50.0, 6.0, 16.0, 9.5, FD);
    lift(THREE, g, T, -62.0, 6.0, 16.0, 9.5, FD);
    /* the overhang under the deck edge, galleries and openings in it [V4] */
    overhang(THREE, g, T.hull, Hh, poly, FD - 1.0, 2.2, 0.8, FD - 7.0, 4.0);
    for (i = 0; i < 9; i++) {
      var ox = -92 + i * 19.5;
      box(THREE, g, 4.2 + (i % 3) * 1.5, 0.12, 1.4, T.dark, ox, 18.06, FD - 2.1);
      if (ox < 45) box(THREE, g, 4.2 + ((i + 1) % 3) * 1.5, 0.12, 1.4, T.dark, ox + 6, -16.56, FD - 2.1);
    }
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 7; i++) {
      var hx = -80 + i * 24 + (s > 0 ? 6 : 0), hy = s * (Hh.W(hx, FD - 6.5) + 0.05);
      box(THREE, g, 3.4, 0.14, 1.6, T.dark, hx, hy, FD - 6.5);
      box(THREE, g, 3.8, 0.5, 0.12, T.metal, hx, hy + s * 0.2, FD - 7.4);
    }
    /* the island along the starboard edge [V3][V4]: a two-deck base the
       length of the island, the bridge block stepped in three tiers with a
       gallery at each, the foremast with the 1022 over it, the two
       ELLIPTICAL funnels with black caps, the main mast tower between them
       black above its gallery and carrying the 992; a radome aft */
    var YC = -13.2, ig = new THREE.Group(); ig.position.y = YC; g.add(ig);
    var IB = FD + 9.0, base = blk(THREE, ig, T.sup, -40.0, 47.8, 3.3, FD, FD + 4.6, 0.12, 0.8);
    var base2 = blk(THREE, ig, T.sup, -38.5, 46.6, 3.18, FD + 4.55, IB, 0.25, 0.7);
    function iblk(x0, x1, hw, z0, z1, m, ins) { return blk(THREE, ig, m || T.sup, x0, x1, hw, z0, z1, ins === undefined ? 0.3 : ins, 0.6); }
    doors(THREE, ig, T, base, 4, [[0.1, 0.14], [0.4, 0.44], [0.7, 0.74]], FD + 0.2, FD + 3.0);
    doors(THREE, ig, T, base, 0, [[0.2, 0.24], [0.55, 0.59], [0.8, 0.83]], FD + 0.2, FD + 3.0);
    [0, 4].forEach(function (k) {
      doors(THREE, ig, T, base2, k, [[0.06, 0.1], [0.16, 0.19], [0.3, 0.33], [0.62, 0.65], [0.86, 0.9]], FD + 6.0, FD + 7.4);
    });
    roofRail(THREE, ig, T, [[-38.3, -3.1], [46.4, -3.1], [46.4, 3.1], [-38.3, 3.1]], IB, 1.0);
    var b1 = iblk(29.0, 47.4, 3.0, IB - 0.05, FD + 16.0, null, 0.15);
    var b2 = iblk(30.5, 47.8, 3.25, FD + 15.95, FD + 21.0, null, 0.1);
    var br = iblk(28.0, 46.6, 3.0, FD + 20.95, FD + 25.9, null, 0.35);
    [0, 4].forEach(function (k) { doors(THREE, ig, T, b1, k, [[0.1, 0.2], [0.35, 0.45], [0.6, 0.7], [0.8, 0.88]], FD + 12.0, FD + 13.4); });
    [0, 2, 4].forEach(function (k) { facePatch(THREE, ig, T.glass, b2.lo, b2.z0, b2.hi, b2.z1, k, 0.08, 0.92, FD + 18.2, FD + 19.6, 0.06); });
    [1, 2, 3].forEach(function (k) { facePatch(THREE, ig, T.glass, br.lo, br.z0, br.hi, br.z1, k, 0.04, 0.96, FD + 23.4, FD + 24.9, 0.08); });
    facePatch(THREE, ig, T.glass, br.lo, br.z0, br.hi, br.z1, 0, 0.6, 0.97, FD + 23.4, FD + 24.9, 0.08);
    facePatch(THREE, ig, T.glass, br.lo, br.z0, br.hi, br.z1, 4, 0.03, 0.4, FD + 23.4, FD + 24.9, 0.08);
    roofRail(THREE, ig, T, [[30.6, -3.35], [47.6, -3.35], [47.6, 3.35], [30.6, 3.35]], FD + 21.0, 1.0);
    roofRail(THREE, ig, T, [[28.4, -2.75], [46.2, -2.75], [46.2, 2.75], [28.4, 2.75]], FD + 25.9, 0.9);
    ellFunnel(THREE, ig, T, 12.6, 24.9, 2.8, IB - 0.05, FD + 31.55, 0.94, 1.05);
    ellFunnel(THREE, ig, T, -22.5, -10.3, 2.8, IB - 0.05, FD + 29.35, 0.94, 1.05);
    [[18.75, 2.8], [-16.4, 2.8]].forEach(function (f) {
      for (s = -1; s <= 1; s += 2) box(THREE, ig, 3.2, 0.12, 2.2, T.dark, f[0], s * (f[1] * 0.97 + 0.02), FD + 22.0);
    });
    tower(THREE, ig, T.sup, -2.2, 5.2, 2.6, IB - 0.05, -0.9, 3.9, 1.75, FD + 31.0);
    box(THREE, ig, 6.4, 4.6, 0.3, T.metal, 1.5, 0, FD + 31.1);
    roofRail(THREE, ig, T, [[-1.6, -2.3], [4.6, -2.3], [4.6, 2.3], [-1.6, 2.3]], FD + 31.25, 0.9);
    tower(THREE, ig, T.under, -0.9, 3.9, 1.75, FD + 31.2, -0.2, 3.2, 1.0, FD + 40.7);
    box(THREE, ig, 4.2, 3.6, 0.3, T.metal, 1.5, 0, FD + 36.0);
    strut(THREE, g, T.metal, 1.5, YC, FD + 40.7, 1.5, YC, FD + 49.0, 0.12, 5);
    box(THREE, g, 2.6, 2.6, 0.4, T.under, 1.5, YC, FD + 40.9);
    radar(THREE, g, T, "992", 1.5, YC, FD + 42.4);
    yard(THREE, ig, T, 1.5, FD + 38.0, 4.0);
    /* the foremast on the bridge roof: a plated stub and pole, the 1022 */
    tower(THREE, ig, T.sup, 31.5, 35.5, 1.4, FD + 25.85, 32.6, 34.4, 0.7, FD + 31.0);
    strut(THREE, g, T.metal, 33.5, YC, FD + 31.0, 33.5, YC, FD + 38.5, 0.14, 5);
    radar(THREE, g, T, "1022", 33.5, YC, FD + 34.6);
    yard(THREE, ig, T, 33.5, FD + 36.6, 3.4);
    radome(THREE, g, T, 40.0, YC, FD + 25.9, FD + 28.0, 1.6);
    radome(THREE, g, T, 8.2, YC + 2.2, FD + 31.2, FD + 32.6, 1.2);
    radome(THREE, g, T, -5.2, YC - 2.2, FD + 31.2, FD + 32.6, 1.2);
    var af = iblk(-39.0, -25.0, 2.9, IB - 0.05, FD + 15.0);
    [0, 4].forEach(function (k) { doors(THREE, ig, T, af, k, [[0.15, 0.3], [0.6, 0.75]], FD + 11.0, FD + 12.4); });
    radome(THREE, g, T, -36.4, YC, FD + 15.0, FD + 21.7, 2.4);
    /* Sea Dart on the forecastle, the CIWS */
    var sd = new THREE.Group(); sd.position.set(86.0, -6.0, FD - 2.6); seaDart(THREE, sd, T); g.add(sd);
    if (V.ciws === "goalkeeper") {
      goalkeeper(THREE, g, T, 97.0, -6.5, FD - 2.6, 0);
      box(THREE, g, 6.0, 4.0, 0.4, T.sup, -95.0, 18.5, FD - 1.2); goalkeeper(THREE, g, T, -95.0, 18.5, FD - 1.0, 2.4);
      box(THREE, g, 6.0, 4.0, 0.4, T.sup, -60.0, -18.5, FD - 1.2); goalkeeper(THREE, g, T, -60.0, -18.5, FD - 1.0, -2.2);
    }
    /* galleries under the deck edge, boats, the stern openings [V2] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 150.0, 1.4, 0.2, T.metal, -20.0, s * (s > 0 ? 18.6 : 17.1), FD - 1.6);
      for (i = 0; i < 4; i++) rhib(THREE, g, T, -70 + i * 30, s * (Hh.W(-70 + i * 30, FD - 4) + 0.7), FD - 4.0, 7.0);
    }
    for (i = 0; i < 4; i++) box(THREE, g, 0.12, 3.0, 2.0, T.dark, -104.55, -10.5 + i * 7.0, FD - 3.5);
    outfit(THREE, g, T, Hh, {
      rails: [[70.0, 100.0]], hawse: 98.0, hawseZ: 9.0, scut: [-90, 60, 9.0, 30],
      rafts: [[-50, 15.2, FD - 3.0, 6], [20, 15.2, FD - 3.0, 6]],
      whips: [[-80, 17.6, FD, 6], [-40, 17.6, FD, 6], [10, 17.6, FD, 6], [60, 17.6, FD, 6]]
    });
    box(THREE, g, 3.0, 1.6, 0.04, T.team, 37.0, YC, FD + 25.92);
    box(THREE, g, 3.0, 1.6, 0.04, T.team, -28.0, YC, IB + 0.02);
    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  /* Queen Elizabeth [Z1][Z2][Z3]
     Plan off [Z1] "Aerial view of HMS Queen Elizabeth (R08) off Scotland,
     28 June 2017" (high, from the port quarter; bow to stern 1283 px =
     284 m, 4.52 px/m along her axis): the forward island X 31..71, the
     after island -47..-6.7, both on the starboard edge; the two
     starboard deck-edge lifts at X 14 (between the islands) and -59
     (abaft the after island); the runway on the port side to the
     ski-jump.  Heights off [Z2] (with two Type 23s, starboard bow) as
     ratios of the freeboard: the forward island's block +0.70 of it over
     the deck, its S1850M +1.4; the after island's block +0.87, its mast
     +2.2.  The freeboard itself, 23 m, is NOT CONFIRMED (no level
     broadside was found), and so neither is any height here.  [Z3] (the
     ship at Rosyth, from the bow) shows the overhanging bow deck and
     the hull's flare.  The ski-jump's 12.5 deg is published; its length,
     50 m, and the Phalanx places (three, published) are NOT CONFIRMED.
     REWORK 2026-11-12 (visual review: slab islands over a bare hull):
     both islands faceted as [Z1][Z2] show them -- walls leaning in, a
     wider bridge level with glazing all round and a gallery, a pyramid
     tower; the flyco glazing standing out inboard on the after island and
     its round black-topped exhaust ([Z1]); the deck overhang drawn as a
     band and soffit back to the flared hull with its openings ([Z2]).
     Same stations and heights as before; tier widths NOT CONFIRMED. */
  function buildQE(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i, FD = 23.0;
    var H = hullDef(284.0, 26.0, 19.5, 11.0, 9.0, 2.0, function () { return FD - 1.0; }, { stern: 0.96, fl: 1.8, stemP: 0.5 });
    var Hh = shell(THREE, g, T, H, FD);
    var poly = polyCCW([[-142, -34.5], [-142, 32.0], [-128, 36.5], [104, 36.5], [142, 25.0], [142, 3.0], [122, -14.0], [80, -32.0],
      [74, -38.0], [-50, -38.0], [-58, -34.5]]);
    plate(THREE, g, T.deck, poly, FD, 1.2, T.sup);
    skiJump(THREE, g, T, 142.0, 50.0, 4.0, 24.0, FD, 12.5);
    deckLines(THREE, g, T, -138, 92, 14.0, FD); deckLines(THREE, g, T, -138, 92, 4.2, FD); deckLines(THREE, g, T, -138, 92, 23.8, FD);
    for (i = 0; i < 6; i++) padMarks(THREE, g, T, -120 + i * 34, FD, 0.1, 4.0);
    lift(THREE, g, T, 14.0, -28.5, 20.0, 16.0, FD);
    lift(THREE, g, T, -59.0, -28.5, 20.0, 16.0, FD);
    /* the overhang: a 3.5 m band under the deck edge and the soffit
       sloping back to the flared hull [Z2][Z3]; the sponson openings and
       galleries along it */
    overhang(THREE, g, T.hull, Hh, poly, FD - 1.2, 3.5, 0.7, FD - 12.0, 4.0);
    for (i = 0; i < 10; i++) {
      var ox = -125 + i * 23;
      box(THREE, g, 5.0 + (i % 3) * 2.0, 0.14, 1.8, T.dark, ox, 36.58, FD - 3.0);
      if (ox > -50 && ox < 70) box(THREE, g, 4.0 + (i % 2) * 3.0, 0.14, 1.8, T.dark, ox + 9, -38.08, FD - 3.0);
    }
    box(THREE, g, 40.0, 0.14, 1.2, T.dark, -96.0, -34.58, FD - 2.8);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 6; i++) {
      var hx = -110 + i * 38 + (s > 0 ? 8 : 0), hy = s * (Hh.W(hx, FD - 10.5) + 0.05);
      box(THREE, g, 6.0, 0.16, 2.6, T.dark, hx, hy, FD - 10.5);
      box(THREE, g, 6.6, 0.6, 0.14, T.metal, hx, hy + s * 0.25, FD - 12.0);
    }
    /* the two islands [Z1][Z2], both faceted: a base whose walls lean in,
       a wider bridge level with raked glazing all round and a gallery, a
       pyramid tower above.  Forward island: the navigating bridge and the
       S1850M; after island: the flyco glazing looking inboard over the
       deck, the Artisan's mast and the round exhaust at its after end */
    var YC = -33.0, ig = new THREE.Group(); ig.position.y = YC; g.add(ig);
    function fr(x0, x1, hw, z0, xa, xb, hwa, z1, cf, m) {
      var lo = chamf(x0, x1, hw, cf, cf), hi = chamf(xa, xb, hwa, cf * 0.8, cf * 0.8);
      frustum(THREE, ig, m || T.sup, lo, z0, hi, z1); return { lo: lo, hi: hi, z0: z0, z1: z1 };
    }
    var f1 = fr(31.0, 71.0, 5.0, FD, 33.0, 68.0, 4.2, FD + 12.0, 1.6);
    doors(THREE, ig, T, f1, 4, [[0.1, 0.16], [0.5, 0.56]], FD + 0.2, FD + 4.0);
    [0, 4].forEach(function (k) { doors(THREE, ig, T, f1, k, [[0.25, 0.3], [0.7, 0.74]], FD + 7.0, FD + 8.4); });
    var f2 = fr(37.0, 68.5, 4.5, FD + 11.95, 36.0, 69.8, 5.4, FD + 16.5, 1.4);
    [0, 1, 2, 3, 4].forEach(function (k) { facePatch(THREE, ig, T.glass, f2.lo, f2.z0, f2.hi, f2.z1, k, 0.05, 0.95, FD + 13.4, FD + 15.8, 0.08); });
    var f3 = fr(36.0, 69.8, 5.4, FD + 16.45, 39.5, 66.0, 4.3, FD + 18.0, 1.4);
    roofRail(THREE, ig, T, [[36.4, -5.5], [69.4, -5.5], [69.4, 5.5], [36.4, 5.5]], FD + 16.5, 1.0);
    var f4 = fr(41.0, 64.0, 4.0, FD + 17.95, 43.5, 60.0, 3.3, FD + 24.0, 1.0);
    [0, 4].forEach(function (k) { doors(THREE, ig, T, f4, k, [[0.15, 0.22], [0.6, 0.67]], FD + 19.5, FD + 21.0); });
    fr(45.0, 59.0, 3.2, FD + 23.95, 49.0, 55.0, 1.4, FD + 30.0, 0.8);
    box(THREE, ig, 3.0, 2.2, 0.3, T.metal, 52.0, 0, FD + 30.1);
    radar(THREE, g, T, "s1850", 52.0, YC, FD + 32.2);
    strut(THREE, g, T.metal, 44.0, YC, FD + 24.0, 44.0, YC, FD + 36.0, 0.1, 5);
    yard(THREE, ig, T, 44.0, FD + 33.0, 3.0);
    fr(60.5, 65.5, 1.6, FD + 23.95, 61.0, 64.5, 1.2, FD + 27.0, 0.4, T.sup);
    box(THREE, ig, 3.2, 2.0, 0.3, T.under, 62.8, 0, FD + 27.1);
    var a1 = fr(-47.0, -6.7, 5.0, FD, -45.0, -9.0, 4.2, FD + 15.0, 1.6);
    doors(THREE, ig, T, a1, 4, [[0.2, 0.26], [0.6, 0.66]], FD + 0.2, FD + 4.0);
    [0, 4].forEach(function (k) { doors(THREE, ig, T, a1, k, [[0.3, 0.34], [0.75, 0.79]], FD + 8.0, FD + 9.4); });
    var a2 = fr(-44.0, -10.0, 4.4, FD + 14.95, -45.0, -9.0, 5.0, FD + 20.0, 1.4);
    [0, 2, 6].forEach(function (k) { facePatch(THREE, ig, T.glass, a2.lo, a2.z0, a2.hi, a2.z1, k, 0.05, 0.95, FD + 16.4, FD + 19.2, 0.08); });
    roofRail(THREE, ig, T, [[-44.6, -5.1], [-9.4, -5.1], [-9.4, 5.1], [-44.6, 5.1]], FD + 20.0, 1.0);
    var a3 = fr(-42.0, -12.0, 4.2, FD + 19.95, -40.0, -14.0, 3.6, FD + 25.0, 1.2);
    /* the flyco: a glazed box standing out over the deck (port, +Y) */
    var fl = fr(-36.0, -20.0, 1.8, FD + 22.0, -36.5, -19.5, 2.1, FD + 27.6, 0.6);
    ig.children[ig.children.length - 1].position.y = 5.0;
    [[4, 6.9], [2, 0], [6, 0]].forEach(function (q) {
      var p = facePatch(THREE, ig, T.glass, fl.lo, fl.z0, fl.hi, fl.z1, q[0], 0.05, 0.95, FD + 23.2, FD + 27.0, 0.08); p.position.y = 5.0;
    });
    box(THREE, ig, 17.0, 3.0, 0.4, T.sup, -28.0, 3.6, FD + 22.0);
    [0, 2, 4].forEach(function (k) { facePatch(THREE, ig, T.glass, a3.lo, a3.z0, a3.hi, a3.z1, k, 0.06, 0.94, FD + 22.6, FD + 24.2, 0.08); });
    fr(-34.0, -20.0, 3.0, FD + 24.95, -30.0, -24.0, 1.3, FD + 44.0, 0.6);
    box(THREE, ig, 6.0, 4.0, 0.3, T.metal, -27.0, 0, FD + 36.0);
    radar(THREE, g, T, "997", -27.0, YC, FD + 46.5);
    strut(THREE, g, T.metal, -24.0, YC, FD + 44.0, -24.0, YC, FD + 50.0, 0.1, 5);
    yard(THREE, ig, T, -27.0, FD + 40.0, 4.0);
    /* the after exhaust: a round uptake with a black top [Z1] */
    cylZ(THREE, ig, 2.2, 2.5, 7.0, 18, T.sup, -42.5, -0.6, FD + 28.4);
    cylZ(THREE, ig, 2.15, 2.2, 1.0, 18, T.under, -42.5, -0.6, FD + 32.4);
    radome(THREE, g, T, -38.0, YC + 2.5, FD + 25.0, FD + 26.6, 1.3);
    radome(THREE, g, T, -16.0, YC - 2.5, FD + 25.0, FD + 26.6, 1.3);
    radome(THREE, g, T, 62.0, YC + 2.2, FD + 18.0, FD + 19.6, 1.3);
    radome(THREE, g, T, 38.0, YC - 2.2, FD + 18.0, FD + 19.6, 1.3);
    /* Phalanx: three, on sponsons under the deck edge */
    [[128.0, -16.0, 0.0], [-138.0, 30.0, 2.6], [-138.0, -30.0, -2.6]].forEach(function (p) {
      box(THREE, g, 5.0, 5.0, 0.5, T.sup, p[0], p[1], FD - 3.5);
      phalanx(THREE, g, T, p[0], p[1], FD - 3.25, p[2]);
    });
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 200.0, 1.6, 0.2, T.metal, -20.0, s * 36.0, FD - 1.8);
      for (i = 0; i < 4; i++) rhib(THREE, g, T, -90 + i * 40, s * (Hh.W(-90 + i * 40, FD - 6) + 0.8), FD - 6.0, 8.0);
    }
    outfit(THREE, g, T, Hh, {
      hawse: 128.0, hawseZ: 14.0, scut: [-120, 100, 12.0, 34],
      rafts: [[-60, 34.6, FD - 3.0, 8], [30, 34.6, FD - 3.0, 8]],
      whips: [[-110, 36.4, FD, 7], [-40, 36.4, FD, 7], [40, 36.4, FD, 7]]
    });
    box(THREE, g, 4.0, 2.0, 0.04, T.team, 53.0, YC, FD + 24.02);
    box(THREE, g, 4.0, 2.0, 0.04, T.team, -36.0, YC, FD + 28.02);
    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  return { buildT23: buildT23, buildT45: buildT45, buildT22: buildT22, buildT42: buildT42,
           buildRiver1: buildRiver1, buildRiver2: buildRiver2, buildIsland: buildIsland, buildCastle: buildCastle,
           buildSub: buildSub, buildInvincible: buildInvincible, buildQE: buildQE };
})();

/* Registration: len is each ship's drawn overall length.  One builder per
   class; the rows of a class share it, with a variant only where the
   references differ. */
(function () {
  var B = HeroGBNavyLate;
  function reg(keys, len, fn) {
    keys.forEach(function (k) { UNIT_MODELS[k] = { len: len, build: fn }; });
  }
  /* River class: Batch 2 (boat_b, Forth) and Batch 1 (Tyne) are different hulls */
  reg(["boat_b"], 90.5, function (THREE, M, C) { return B.buildRiver2(THREE, M, C); });
  reg(["gbr_e00_patrol"], 79.5, function (THREE, M, C) { return B.buildRiver1(THREE, M, C); });
  reg(["gbr_e80_patrol"], 59.5, function (THREE, M, C) { return B.buildIsland(THREE, M, C); });
  reg(["gbr_e90_patrol"], 81.0, function (THREE, M, C) { return B.buildCastle(THREE, M, C); });
  /* Type 23: 1990 (Mod 0 gun, 996, Harpoon), 2006 (Mod 1, 996, Harpoon,
     Sonar 2087), today (Mod 1, Artisan 997, Sea Ceptor, no Harpoon) */
  reg(["gbr_e90_corvette"], 133.0, function (THREE, M, C) { return B.buildT23(THREE, M, C, { gun: 0, radar: "996", harpoon: true }); });
  reg(["gbr_e00_corvette"], 133.0, function (THREE, M, C) { return B.buildT23(THREE, M, C, { gun: 1, radar: "996", harpoon: true }); });
  reg(["corvette_b"], 133.0, function (THREE, M, C) { return B.buildT23(THREE, M, C, { gun: 1, radar: "997", harpoon: false, ceptor: true }); });
  reg(["gbr_e80_corvette"], 131.2, function (THREE, M, C) { return B.buildT22(THREE, M, C); });
  /* Type 42: Batch 1 as Sheffield went to war; Batch 3 stretched */
  reg(["gbr_e80_destroyer"], 125.0, function (THREE, M, C) { return B.buildT42(THREE, M, C, { batch: 1, radar: "965" }); });
  reg(["gbr_e90_destroyer"], 141.1, function (THREE, M, C) { return B.buildT42(THREE, M, C, { batch: 3, radar: "1022", phalanx: true }); });
  /* Type 45: as built (2009) and with the Phalanx pair (today) */
  reg(["gbr_e00_destroyer"], 152.4, function (THREE, M, C) { return B.buildT45(THREE, M, C, { phalanx: false }); });
  reg(["destroyer_b"], 152.4, function (THREE, M, C) { return B.buildT45(THREE, M, C, { phalanx: true }); });
  reg(["gbr_e80_sub"], 82.9, function (THREE, M, C) { return B.buildSub(THREE, M, C, "swift"); });
  reg(["gbr_e90_sub"], 85.4, function (THREE, M, C) { return B.buildSub(THREE, M, C, "traf"); });
  reg(["sub_b", "gbr_e00_sub"], 97.0, function (THREE, M, C) { return B.buildSub(THREE, M, C, "astute"); });
  /* Invincible: 1980 (7 deg, no CIWS) and the 1990s FA2 ship (12 deg, Goalkeeper) */
  reg(["gbr_e80_carrier"], 209.0, function (THREE, M, C) { return B.buildInvincible(THREE, M, C, { ski: 7, ciws: "none" }); });
  reg(["gbr_e90_carrier"], 209.0, function (THREE, M, C) { return B.buildInvincible(THREE, M, C, { ski: 12, ciws: "goalkeeper" }); });
  reg(["carrier_b", "gbr_e00_carrier"], 284.0, function (THREE, M, C) { return B.buildQE(THREE, M, C); });
})();
