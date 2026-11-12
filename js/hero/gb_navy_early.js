/* ==================== js/hero/gb_navy_early.js ==========================
   HERO MODELS -- the Royal Navy of the 1950s and 1960s (team gbr).  Each
   of these thirteen rows had no model of its own and drew an American
   ship (render3d.js modelKeyFor).  One builder per class; the two
   Audacious-class carriers share one builder with a variant each, and the
   two cruisers share the 555.5 ft hull.

     gbr_e50_patrol     Ford-class seaward defence boat (HMS Droxford)
     gbr_e50_corvette   Type 12 Whitby-class frigate (HMS Blackpool)
     gbr_e50_destroyer  Daring-class destroyer (HMS Daring)
     gbr_e50_cruiser    Swiftsure (Minotaur class, 1944)
     gbr_e50_sub        Porpoise-class submarine
     gbr_e50_carrier    Audacious class: HMS Eagle as completed, 1951
     gbr_e60_patrol     Brave-class fast patrol boat (HMS Brave Borderer)
     gbr_e60_corvette   Leander-class frigate, as built (1963)
     gbr_e60_destroyer  County-class DLG, Batch 1 (Devonshire / Kent)
     gbr_e60_cruiser    Tiger class as converted (Tiger 1972 / Blake)
     gbr_e60_sub        Valiant-class SSN
     gbr_e60_ssbn       Resolution-class SSBN (sixteen Polaris A3 tubes)
     gbr_e60_carrier    Audacious class: HMS Ark Royal after the 1967-70 refit

   Published figures (en.wikipedia, the class articles, fetched 2026-11):
     Ford       117 ft 2 in (35.7 m) oa, beam 20 ft (6.1 m), draught 6 ft 6 in
     Whitby     370 ft (112.8 m) oa, beam 41 ft (12.5 m), draught 17 ft
     Daring     390 ft (118.9 m), beam 43 ft (13.1 m), draught 12.75 ft
     Swiftsure  555.5 ft (169.3 m), beam 63 ft, draught 17.25 ft
     Tiger      555.5 ft (169.3 m), beam 64 ft (19.5 m), draught 23 ft
     Porpoise   [PD] drawing scaled to 90.0 m (the 1956 class article could
                not be fetched: the length is NOT CONFIRMED to better than
                1 %); draught 5.5 m assumed from the class's 18 ft (NOT
                CONFIRMED)
     Audacious  804 ft (245 m), hull beam 112.8 ft, 171 ft over the angled
                deck (1978), draught 33 ft
     Brave      98 ft 10 in (30.1 m) oa, beam 25 ft 6 in (7.8 m), draught 7 ft
     Leander    113.4 m, beam 12.5 m, draught 4.5 m
     County     520 ft (158.5 m), beam 54 ft (16.5 m), draught 21 ft
     Valiant    285 ft (86.9 m), beam 33 ft 3 in (10.1 m), draught 27 ft
     Resolution 425 ft (129.5 m), beam 33 ft (10.1 m), draught 30 ft 1 in

   REFERENCES (Wikimedia Commons unless said; each class's own block below
   says what was measured off which):
     [DD] "Daring Class line drawing.jpg" -- side and plan, with a scale and
          a painting note (light Admiralty grey topsides, brick red bottom,
          black boot topping and guns, white boats).
     [WB] "HMS Blackpool (F77).jpg" (starboard broadside); [WT] "HMS Tenby
          (F65), 1963"; [WQ] "HMS Torquay (F43) underway c1961".
     [CS] "HMS Swiftsure.jpg"; [CB] "HMS Blake C99.jpg"; [CT] "HMS Tiger
          (1945) at Portsmouth Navy Day 1980".
     [PD] "Porpoise-class SS.svg" (side elevation); [PP] "HMS Porpoise
          (S01).jpg".
     [RD] "Resolution-class SSBN.svg" (side elevation); [RR] "HMS Repulse
          (S23) in the Firth of Clyde c1979".
     [VP] "Valiant class submarine 1986.jpeg"; [VS] "HMS Valiant S102 01".
     [AE1] "HMS Eagle (R05) after her commissioning 1951"; [AE2] "HMS Eagle
          (R05) flight deck at Gibraltar c1953"; [AT] "Ark Royal R09 from
          top lauch Buc NAN1-71" (from overhead); [AR] "17 HMS Ark Royal
          North Atlantic July 76" (starboard side).
     [BB1] [BB2] [BB3] Bundesarchiv B 145 Bild-F010729-0071, -0037, -0057
          (HMS Brave Borderer, P1011, at Oberwinter).
     [LP] "HMS Penelope, 1970 (IWM)" (from overhead); [LA] "HMS Apollo 1976
          SMB-2008".
     [CK] "HMS Kent, Portsmouth Navy Yards, July 1989"; [CN] "NAVO eskader
          bezoekt Amsterdam, vlaggeschip HNS Norfolk, Bestanddeelnr
          928-6223"; [CG] "HMS Glamorgan (11533801865)"; [CL] "HMS London,
          1971 (IWM)" (the AKE-2 on a Batch 1 ship).
     [FG] "GMS043-33-N.jpg" (HMS Droxford, P3113); [FD] "Droxford 1975 @ Gt
          Harbour Greenock.jpg".

   NOT CONFIRMED (beyond what each block lists): the heights of every
   class measured off a photograph rather than a drawing (all but the
   Daring, the Porpoise and the Resolution), because an oblique photograph
   gives lengths and heights at different scales -- where a gunhouse or an
   aircraft of known size was in frame it set the height scale; the widths
   of houses and mounts (no plan except [DD], [AT], [LP]); the Mk 6, Mk 26,
   Mk XXIII, Mk N1 gunhouse widths; boat, raft, bollard, vent and hatch
   counts (drawn where the photographs show such fittings, not counted one
   for one); the under-water hull sections between the waterline and the
   keel; screws and rudders (two shafts, four on the cruisers and the
   carriers, per the articles).  Sea Cat was "fitted for but not with" on
   Ark Royal and is not drawn.  No pennant numbers, names, crests, flags,
   funnel bands or deck letters on any of them.

   PAINT: Royal Navy light grey hull and houses, a dark grey deck, black
   boot topping, funnel caps and guns, dark red below the boot topping
   ([DD]'s painting note; the 1950s photographs agree); submarines black
   overall.  Weathered canvas textures (strakes, butts, streaks) from the
   ru_riga.js kit.  C.team in small roof strips only.

   NODES: the rows with turret:true have their main gun mount as the group
   named "turret" (origin on its ring, barrels along +X): the forward Mk 6
   (Whitby, Daring, Leander, County), the forward triple 6 in (Swiftsure),
   the Mk 26 twin 6 in (Tiger), the 40 mm (Brave).  The Ford's "turret" is
   an EMPTY group at the forecastle gun position: both photographs are of
   the 1970s with no gun, so the 40 mm is not drawn.  The ships with a pad
   (Leander, County, Tiger) carry a hidden "helipad" node on its middle;
   the carriers' flight decks are one level slab with flush (1 cm)
   markings.  Everything else is baked, one mesh per material (11 to 15
   draw calls a ship, 6 or 7 a submarine).

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0 (the
   submarines at their surfaced trim from the published draught).  Kit
   (textures, materials, geoOf, box, cyl*, strut, hexa, taper, polyPrism,
   house, ringLoft, superRing, zLoft, makeHull, rails, bake, finish, dish,
   radome, boat, latticeMast, platform, bridgeGlass, screws, bofors40,
   raftRack) copied from js/hero/support_naval.js (itself from
   ru_riga.js).  Load order: none -- the file is self-contained and draws
   no other module's hulls (no Royal Navy ship of these classes had a hero
   model to reuse).  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
var HeroGbNavyEarly = (function () {
  "use strict";
  var PI = Math.PI;

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
  function hullTex(THREE) {
    return canvasTex(THREE, "gbe_hull", 512, 256, function (g, w, h) {
      var R = rng(7101), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.13; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 5; i++) {
        var xx = i * w / 5 + (i % 2) * 18;
        g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 46; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, 2 + R() * 5, 18 + R() * 80);
      }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "gbe_plate", 256, 256, function (g, w, h) {
      var R = rng(7117), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
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
    return canvasTex(THREE, "gbe_deck", 256, 256, function (g, w, h) {
      var R = rng(7111), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  function grilleTex(THREE) {
    return canvasTex(THREE, "gbe_grille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* Royal Navy light grey on hull and houses, a darker deck, black boot
     topping and funnel caps, dark red antifouling (see the header) */
  var PAINT = { hull: 0x8e9599, sup: 0x9aa1a5, deck: 0x52575b, soot: 0x1f2224 };
  function makeMats(THREE, C) {
    var team = (C && C.team !== undefined) ? C.team : 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:   skin(PAINT.hull, hullTex(THREE), 0.86),
      boot:   skin(0x0c0d0f, hullTex(THREE), 0.9),
      under:  skin(0x4a1c16, hullTex(THREE), 0.9),
      sup:    skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:   skin(PAINT.deck, deckTex(THREE), 0.95),
      dark:   skin(0xffffff, grilleTex(THREE), 0.9),
      team:   skin(team, plateTex(THREE), 0.84),
      metal:  metal(0x5c636a, 0.52, 0.55),
      soot:   metal(PAINT.soot, 0.7, 0.35),
      gun:    metal(0x3b4146, 0.48, 0.60),
      orange: skin(0xd8551e, plateTex(THREE), 0.7),
      white:  skin(0xe6e8e8, plateTex(THREE), 0.6),
      glass:  new THREE.MeshPhysicalMaterial({ color: 0x05090b, roughness: 0.1, metalness: 0,
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
  function cylY(THREE, p, r, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg, 1), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  function sphere(THREE, p, r, m, x, y, z) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8), m);
    s.position.set(x, y, z); p.add(s); return s;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* a square-section beam between two points */
  function beam(THREE, p, m, ax, ay, az, bx, by, bz, w) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.BoxGeometry(w, L, w), m);
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
  /* a box tapering in x and y from bottom (lx0, ly0) to top (lx1, ly1),
     the top centre shifted dx forward of the bottom centre */
  function taper(THREE, p, m, x, y, z0, z1, lx0, ly0, lx1, ly1, dx) {
    var ax = lx0 / 2, ay = ly0 / 2, bx = lx1 / 2, by = ly1 / 2, t = x + (dx || 0);
    return hexa(THREE, p, m, [[x - ax, y - ay, z0], [x + ax, y - ay, z0], [x + ax, y + ay, z0], [x - ax, y + ay, z0],
                              [t - bx, y - by, z1], [t + bx, y - by, z1], [t + bx, y + by, z1], [t - bx, y + by, z1]]);
  }
  /* convex polygon (CCW from above) extruded z0..z1 */
  function polyPrism(THREE, p, m, pts, z0, z1) {
    var pos = [], uv = [], n = pts.length, i, a, b;
    function tri(P, Q, R, side) {
      var v = [P, Q, R], k;
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
  /* a deckhouse: x0 aft, x1 forward, half breadth hw, the forward corners
     chamfered by c */
  function house(THREE, p, m, x0, x1, hw, c, z0, z1) {
    return polyPrism(THREE, p, m, [[x0, -hw], [x1 - c, -hw], [x1, -hw + c], [x1, hw - c], [x1 - c, hw], [x0, hw]], z0, z1);
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
  /* rounded-rectangle rings stacked up Z (a funnel): lv = [[z, cx, hx, hy], ...],
     superellipse exponent e; the top is capped in `capM` */
  function zLoft(THREE, p, m, capM, lv, e, n) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < lv.length; i++) for (j = 0; j < n; j++) {
      var t = j / n * PI * 2, c = Math.cos(t), s = Math.sin(t);
      pos.push(lv[i][1] + lv[i][2] * Math.sign(c) * Math.pow(Math.abs(c), e),
               lv[i][3] * Math.sign(s) * Math.pow(Math.abs(s), e), lv[i][0]);
      uv.push(j / n * 4, lv[i][0] / 6);
    }
    for (i = 0; i < lv.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, cc = a + n, d = b + n;
      idx.push(a, b, d, a, d, cc);
    }
    p.add(new THREE.Mesh(geoOf(THREE, pos, uv, idx), m));
    var top = lv[lv.length - 1], cp = [], cu = [];
    for (j = 0; j < n; j++) {
      var t0 = j / n * PI * 2, t1 = (j + 1) / n * PI * 2;
      var f = function (t) {
        var c = Math.cos(t), s = Math.sin(t);
        return [top[1] + top[2] * 0.97 * Math.sign(c) * Math.pow(Math.abs(c), e), top[3] * 0.97 * Math.sign(s) * Math.pow(Math.abs(s), e)];
      };
      var A = f(t0), B = f(t1);
      cp.push(top[1], 0, top[0] - 0.1, A[0], A[1], top[0] - 0.1, B[0], B[1], top[0] - 0.1);
      cu.push(0.5, 0.5, 0, 0, 1, 1);
    }
    p.add(new THREE.Mesh(geoOf(THREE, cp, cu), capM));
  }

  /* ---------------------------------------------------------------- hull
     A generalised ru_riga.js hull.  STA rows are
       [d (metres aft of the stem head), deck z at the side, half beam at
        the deck edge, half beam at the waterline, bottom z on the
        centreline, bilge fullness]
     xWL / xST are the stem and the transom at the waterline (d), sternZ the
     transom's bottom edge. */
  function makeHull(L, rows, dWL, dST, sternZ) {
    var H = L / 2, STA = rows.map(function (r) { return [H - r[0], r[1], r[2], r[3], r[4], r[5]]; });
    STA.sort(function (a, b) { return a[0] - b[0]; });
    var XS0 = -H, XS1 = H, XWL = H - dWL, XST = H - dST;
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
    var kST = pick(XST, 4);
    function zBot(x) {
      if (x > XWL) return deckZ(XS1) * (x - XWL) / (XS1 - XWL);
      if (x < XST) return kST + (sternZ - kST) * (XST - x) / (XST - XS0);
      return pick(x, 4);
    }
    function W(x, z) {
      var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
      if (z >= zd) return bd;
      if (z <= zb) return 0;
      if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
      if (x < XST) {
        var f = (XST - x) / (XST - XS0);
        return bd * Math.pow((z - zb) / (zd - zb), 0.2 + 0.3 * f);
      }
      if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.5);
      var n = pick(x, 5), t = Math.min(1, z / zb);
      return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    }
    var XS = null;
    function hullXs() {
      if (XS) return XS;
      var xs = [], x, i, st = L / 42;
      for (x = XS0; x < XS1 - 0.01; x += st) xs.push(x);
      for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
      for (x = XWL - L * 0.06; x < XS1; x += L / 110) xs.push(x);
      for (x = XS0; x < XST; x += Math.max(0.2, (XST - XS0) / 4)) xs.push(x);
      xs.push(XS1);
      xs.sort(function (a, b) { return a - b; });
      XS = xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
      return XS;
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
        for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC)) / 8); }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
        var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
      return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
    }
    function transom(THREE, g, mHull, mBoot) {
      var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, k;
      var P = { h: [], b: [] }, U = { h: [], b: [] };
      for (j = 0; j < N; j++) {
        var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
        var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1), key = z1 <= 0.6 ? "b" : "h";
        P[key].push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
        var L0 = P[key].length;
        for (k = 0; k < 6; k++) U[key].push(P[key][L0 - 18 + k * 3 + 1] / 24, P[key][L0 - 18 + k * 3 + 2] / 8);
      }
      if (P.h.length) g.add(new THREE.Mesh(geoOf(THREE, P.h, U.h), mHull));
      if (P.b.length) g.add(new THREE.Mesh(geoOf(THREE, P.b, U.b), mBoot || mHull));
    }
    function edgeY(x) { return Math.max(0.1, halfB(x) - 0.15); }
    function railRun(THREE, g, T, x0, x1, step, hgt) {
      var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
      for (s = -1; s <= 1; s += 2) {
        prev = null;
        for (i = 0; i <= n; i++) {
          x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x);
          strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
          if (prev) {
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.022, 3);
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.018, 3);
          }
          prev = [x, y, z];
        }
      }
    }
    /* shell, boot topping, deck, transom */
    function shell(THREE, g, T) {
      var top = 0, i;
      for (i = 0; i < STA.length; i++) top = Math.max(top, STA[i][1]);
      g.add(shellBand(THREE, T.under, -20, -0.3, 5));
      g.add(shellBand(THREE, T.boot, -0.3, 0.45, 1));
      g.add(shellBand(THREE, T.hull, 0.45, top + 1, 6));
      transom(THREE, g, T.hull, T.boot);
      g.add(deckSheet(THREE, T.deck));
    }
    return { X: function (d) { return H - d; }, deckZ: deckZ, halfB: halfB, W: W, zBot: zBot,
             edgeY: edgeY, railRun: railRun, shell: shell, XS0: XS0, XS1: XS1 };
  }

  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 2.6));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.028, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.02, 3);
    }
  }
  /* rail round a rectangle x0..x1, +-hw at height z */
  function rectRail(THREE, g, T, x0, x1, hw, z) {
    roofRail(THREE, g, T, [[x1, hw], [x0, hw], [x0, -hw], [x1, -hw], [x1, hw]], z, 0.95);
  }
  /* windows in a row on a side face (y = s * yy) or a front face */
  function sideWindows(THREE, g, T, x0, x1, n, yy, z, w, h) {
    var s, i;
    for (s = -1; s <= 1; s += 2) for (i = 0; i < n; i++)
      box(THREE, g, w, 0.06, h, T.dark, x0 + (x1 - x0) * (i + 0.5) / n, s * (yy + 0.02), z);
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
  function finish(THREE, g, tw) {
    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    if (tw) {
      var tb = bake(THREE, tw);
      tw.children.slice().forEach(function (c) { tw.remove(c); });
      tb.children.slice().forEach(function (c) { tw.add(c); });
      root.add(tw);
    }
    return root;
  }

  /* ------------------------------------------------------------ fittings */
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 14, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    if (tilt) dg.rotateY(-tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }
  /* a radome on a short pedestal from z0 */
  function radome(THREE, g, T, x, y, z0, zc, r) {
    cylZ(THREE, g, r * 0.35, r * 0.45, zc - z0, 8, T.metal, x, y, (z0 + zc) / 2);
    sphere(THREE, g, r, T.white, x, y, zc + r * 0.6);
  }
  /* small boat on chocks: lofted hull and canopy */
  function boat(THREE, g, m, mTop, x, y, z, L, B, canopy) {
    var xs = [], rings = [], i, n = 9;
    for (i = 0; i <= n; i++) {
      var t = i / n, xx = x - L / 2 + L * t;
      var wf = t > 0.65 ? Math.max(0.08, 1 - Math.pow((t - 0.65) / 0.35, 1.6)) : (t < 0.08 ? 0.75 + t * 3 : 1);
      xs.push(xx); rings.push(superRing(B / 2 * wf, B * 0.26, z + B * 0.26, 0.8, 12).map(function (p) { return [p[0] + y, p[1]]; }));
    }
    ringLoft(THREE, g, m, xs, rings, true);
    if (canopy) {
      var cx = [], cr = [];
      for (i = 0; i <= 6; i++) {
        var u = i / 6, xc = x - L * 0.42 + L * 0.8 * u, f = Math.sin(PI * (0.1 + 0.8 * u));
        cx.push(xc); cr.push(superRing(B * 0.46 * (0.6 + 0.4 * f), B * 0.32 * f + 0.05, z + B * 0.5, 0.9, 12).map(function (p) { return [p[0] + y, Math.max(z + B * 0.45, p[1])]; }));
      }
      ringLoft(THREE, g, mTop, cx, cr, true);
    }
  }
  /* four-legged lattice mast tapering to a platform at zt (ru_riga.js) */
  function latticeMast(THREE, g, T, xa, xf, w, z0, xta, xtf, wt, zt, n) {
    var legs = [[xa, -w, xta, -wt], [xf, -w, xtf, -wt], [xf, w, xtf, wt], [xa, w, xta, wt]], i, k;
    n = n || 5;
    function at(L, f) { return [L[0] + (L[2] - L[0]) * f, L[1] + (L[3] - L[1]) * f, z0 + (zt - z0) * f]; }
    for (i = 0; i < 4; i++) {
      var a = at(legs[i], 0), b = at(legs[i], 1);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], 0.11, 5);
    }
    for (k = 0; k <= n; k++) {
      var f = k / n;
      for (i = 0; i < 4; i++) {
        var p = at(legs[i], f), q = at(legs[(i + 1) % 4], f);
        strut(THREE, g, T.metal, p[0], p[1], p[2], q[0], q[1], q[2], 0.05, 3);
        if (k < n) {
          var r = at(legs[(i + 1) % 4], (k + 1) / n);
          strut(THREE, g, T.metal, p[0], p[1], p[2], r[0], r[1], r[2], 0.035, 3);
        }
      }
    }
  }
  /* a platform with a rail */
  function platform(THREE, g, T, x, y, z, lx, ly) {
    box(THREE, g, lx, ly, 0.12, T.metal, x, y, z);
    roofRail(THREE, g, T, [[x + lx / 2, y + ly / 2], [x - lx / 2, y + ly / 2], [x - lx / 2, y - ly / 2], [x + lx / 2, y - ly / 2], [x + lx / 2, y + ly / 2]], z + 0.06, 0.8);
  }
  /* bridge windows round the front of a block: front face at xf, half
     breadth hw, chamfer c, window band z0..z1 */
  function bridgeGlass(THREE, g, T, xf, hw, c, z0, z1, sideLen) {
    var zc = (z0 + z1) / 2, h = z1 - z0, s;
    box(THREE, g, 0.07, 2 * (hw - c) - 0.3, h, T.glass, xf + 0.03, 0, zc);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, c * 1.3, 0.07, h, T.glass, xf - c / 2 + 0.02, s * (hw - c / 2 + 0.02), zc, -s * PI / 4);
      if (sideLen) box(THREE, g, sideLen, 0.07, h, T.glass, xf - c - sideLen / 2 - 0.2, s * (hw + 0.03), zc);
    }
  }
  /* shafts on A-brackets, screws, rudders */
  function screws(THREE, g, T, xp, yS, zS, xr, len, rp, rh) {
    var s, i;
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.16, 0.16, len, 8, T.metal, xp + len / 2, s * yS, zS);
      strut(THREE, g, T.metal, xp + 1.6, s * yS, zS, xp + 1.6, s * (yS + 0.4), zS + 1.4, 0.1, 4);
      cylX(THREE, g, 0.22, 0.32, 0.6, 8, T.metal, xp, s * yS, zS);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, rp * 0.5, rp), T.metal);
        bl.position.set(xp, s * yS, zS); bl.rotation.x = i * PI / 2 + 0.3;
        bl.translateZ(rp * 0.55); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, rh * 0.8, 0.16, rh, T.metal, xr, s * yS * 0.9, zS + rh * 0.35);
    }
  }
  /* a pintle .50 cal machine gun, origin on the pedestal foot, along +X */
  function mg50(THREE, g, T) {
    cylZ(THREE, g, 0.12, 0.16, 1.0, 8, T.gun, 0, 0, 0.5);
    box(THREE, g, 0.5, 0.42, 0.06, T.gun, 0.05, 0, 1.0);
    box(THREE, g, 0.95, 0.18, 0.22, T.gun, 0.1, 0, 1.16);
    cylX(THREE, g, 0.025, 0.03, 1.15, 6, T.gun, 1.12, 0, 1.17);
    box(THREE, g, 0.06, 0.55, 0.42, T.gun, 0.42, 0, 1.25);
    box(THREE, g, 0.25, 0.22, 0.16, T.gun, 0.05, 0.2, 1.1);
  }
  /* single 40 mm Bofors L/70 in its rounded shield (Vidar [V2]) */
  function bofors40(THREE, g, T) {
    cylZ(THREE, g, 1.05, 1.15, 0.4, 16, T.sup, 0, 0, 0.2);
    var xs = [-1.45, -1.35, -0.7, 0.2, 0.9, 1.2], rings = [];
    var S = [[0.8, 0.7], [0.95, 0.8], [1.05, 0.85], [1.05, 0.85], [0.95, 0.72], [0.7, 0.5]];
    S.forEach(function (q) { rings.push(superRing(q[0], q[1], 1.15, 0.55, 16)); });
    ringLoft(THREE, g, T.sup, xs, rings, true);
    box(THREE, g, 0.2, 0.36, 0.55, T.dark, 1.15, 0, 1.15);
    var bar = new THREE.Group(); bar.position.set(1.0, 0, 1.15); bar.rotation.y = -0.12;
    cylX(THREE, bar, 0.1, 0.12, 0.7, 8, T.gun, 0.35, 0, 0);
    cylX(THREE, bar, 0.05, 0.06, 2.4, 8, T.gun, 1.85, 0, 0, true);
    cylX(THREE, bar, 0.08, 0.08, 0.35, 8, T.gun, 3.1, 0, 0);
    g.add(bar);
  }
  /* life-raft canisters on a rack, n along X centred on x */
  function raftRack(THREE, g, T, x, y, z, n) {
    var i;
    box(THREE, g, n * 0.75 + 0.2, 0.9, 0.08, T.metal, x, y, z - 0.38);
    for (i = 0; i < n; i++) {
      var c = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.25, 10), T.white);
      c.position.set(x - (n - 1) * 0.375 + i * 0.75, y, z); g.add(c);
    }
  }


  /* ================================================== Royal Navy fittings
     Each is drawn about its own origin (a mount on its ring at the deck,
     barrels along +X) and placed by the builder.  Sizes are listed per
     fitting with where they come from. */

  /* a gun barrel run out along +X from (x0, y, z) */
  function barrel(THREE, g, T, x0, y, z, len, r0, r1, el) {
    var b = new THREE.Group(); b.position.set(x0, y, z); b.rotation.y = -(el || 0);
    cylX(THREE, b, r1, r0, len, 8, T.gun, len / 2, 0, 0);
    cylX(THREE, b, r0 * 1.35, r0 * 1.35, 0.7, 8, T.gun, 0.35, 0, 0);
    g.add(b); return b;
  }
  /* an enclosed gunhouse: flat roof, sloped face, overhanging back.
     L long, B wide, H high over its ring; the face slopes back f of its
     height; the barrels n abreast at spacing sp, length bl, bore radius br */
  function gunhouse(THREE, g, T, L, B, H, f, n, sp, bl, br, ringR) {
    var xf = L * 0.42, xa = -L * 0.58, hb = B / 2, ht = hb * 0.92;
    cylZ(THREE, g, ringR || hb * 0.8, (ringR || hb * 0.8) + 0.1, 0.5, 16, T.sup, 0, 0, 0.25);
    hexa(THREE, g, T.sup, [[xa, -hb, 0.45], [xf, -hb, 0.45], [xf, hb, 0.45], [xa, hb, 0.45],
                           [xa + 0.15, -ht, H], [xf - H * f, -ht, H], [xf - H * f, ht, H], [xa + 0.15, ht, H]]);
    var i, zb = 0.45 + (H - 0.45) * 0.42;
    for (i = 0; i < n; i++) {
      var y = (i - (n - 1) / 2) * sp;
      box(THREE, g, 0.25, 0.75, 0.9, T.dark, xf - (zb - 0.45) * f * 0.9 + 0.05, y, zb);
      barrel(THREE, g, T, xf - (zb - 0.45) * f + 0.1, y, zb, bl, br * 1.6, br * 1.15, 0.03);
    }
    return { xf: xf, xa: xa };
  }
  /* QF 4.5 in Mk 6 twin: gunhouse 6.0 long and 3.05 high over the deck
     ([DD] A mount; [WB] gives the same 0.5 height-to-length), 4.9 wide
     (NOT CONFIRMED: no plan or head-on photograph measured), guns 45 cal
     (5.1 m), 1.4 m apart (NOT CONFIRMED) */
  function mk6(THREE, g, T) { gunhouse(THREE, g, T, 6.0, 4.9, 3.05, 0.42, 2, 1.4, 5.1, 0.075, 2.4); }
  /* BL 6 in Mk XXIII triple: turret 9.0 x 6.6 x 3.0 m, guns 50 cal (7.6 m) */
  function triple6(THREE, g, T) { gunhouse(THREE, g, T, 9.0, 6.6, 3.0, 0.30, 3, 1.75, 7.6, 0.095, 3.4); }
  /* QF 6 in Mk N5 twin (Mk 26 mounting, Tiger): 10.0 x 7.2 x 3.6 m, guns 7.6 m */
  function twin6N5(THREE, g, T) { gunhouse(THREE, g, T, 10.0, 7.2, 3.6, 0.45, 2, 2.4, 7.6, 0.095, 3.6); }
  /* QF 3 in Mk N1 twin (Mk 6 mounting): 5.2 x 3.6 x 2.6 m, guns 70 cal (5.3 m) */
  function twin3(THREE, g, T) { gunhouse(THREE, g, T, 5.2, 3.6, 2.6, 0.45, 2, 1.05, 5.3, 0.05, 1.8); }
  /* QF 4 in Mk XIX twin HA on an open mounting with a light shield */
  function twin4open(THREE, g, T) {
    cylZ(THREE, g, 1.4, 1.5, 0.6, 12, T.sup, 0, 0, 0.3);
    hexa(THREE, g, T.sup, [[-1.6, -1.6, 0.6], [1.3, -1.6, 0.6], [1.3, 1.6, 0.6], [-1.6, 1.6, 0.6],
                           [-1.4, -1.5, 2.3], [0.7, -1.5, 2.3], [0.7, 1.5, 2.3], [-1.4, 1.5, 2.3]]);
    barrel(THREE, g, T, 0.9, 0.5, 1.5, 4.5, 0.1, 0.07, 0.25);
    barrel(THREE, g, T, 0.9, -0.5, 1.5, 4.5, 0.1, 0.07, 0.25);
  }
  /* 40 mm Bofors twin (STAAG / Mk V) seen as a box mount with two barrels */
  function bofors2(THREE, g, T) {
    cylZ(THREE, g, 1.0, 1.1, 0.4, 12, T.sup, 0, 0, 0.2);
    box(THREE, g, 2.4, 2.2, 1.4, T.sup, -0.2, 0, 1.1);
    barrel(THREE, g, T, 0.9, 0.42, 1.3, 2.6, 0.06, 0.045, 0.15);
    barrel(THREE, g, T, 0.9, -0.42, 1.3, 2.6, 0.06, 0.045, 0.15);
  }
  /* single 40 mm Bofors on an open pedestal with a light shield */
  function bofors1(THREE, g, T) {
    cylZ(THREE, g, 0.5, 0.65, 0.8, 10, T.gun, 0, 0, 0.4);
    hexa(THREE, g, T.sup, [[-0.4, -0.9, 0.8], [0.7, -0.9, 0.8], [0.7, 0.9, 0.8], [-0.4, 0.9, 0.8],
                           [-0.4, -0.8, 1.8], [0.45, -0.8, 1.8], [0.45, 0.8, 1.8], [-0.4, 0.8, 1.8]]);
    box(THREE, g, 1.4, 0.5, 0.5, T.gun, 0.2, 0, 1.25);
    barrel(THREE, g, T, 0.8, 0, 1.3, 2.4, 0.06, 0.045, 0.12);
  }
  /* a gun director: a drum with a hood and a radar dish on its face */
  function director(THREE, g, T, x, y, z, r, h, dishR) {
    cylZ(THREE, g, r, r, h, 12, T.sup, x, y, z + h / 2);
    box(THREE, g, r * 1.4, r * 2.1, h * 0.45, T.sup, x, y, z + h * 0.95);
    if (dishR) dish(THREE, g, T.metal, dishR, x + r + 0.3, y, z + h * 1.45, 0.1);
  }
  /* a radar "bedstead": a rectangular frame of tubes w wide and h high, its
     centre at (x, y, z), facing +X; `two` stacks a second frame behind the
     first (the AKE-2 double) */
  function bedstead(THREE, g, T, x, y, z, w, h, two) {
    var k, j, nf = two ? 2 : 1;
    for (k = 0; k < nf; k++) {
      var xx = x - k * 0.9;
      strut(THREE, g, T.metal, xx, y - w / 2, z - h / 2, xx, y + w / 2, z - h / 2, 0.06, 4);
      strut(THREE, g, T.metal, xx, y - w / 2, z + h / 2, xx, y + w / 2, z + h / 2, 0.06, 4);
      for (j = 0; j <= 6; j++) {
        var yy = y - w / 2 + w * j / 6;
        strut(THREE, g, T.metal, xx, yy, z - h / 2, xx, yy, z + h / 2, j % 3 === 0 ? 0.06 : 0.03, 3);
      }
      strut(THREE, g, T.metal, xx, y - w / 2, z, xx, y + w / 2, z, 0.04, 3);
    }
    if (two) strut(THREE, g, T.metal, x, y, z, x - 0.9, y, z, 0.12, 6);
    box(THREE, g, 0.7, 0.7, 0.6, T.metal, x - (nf - 1) * 0.45, y, z - h / 2 - 0.3);
  }
  /* a "cheese" or trough aerial (Type 277, 293, 992): a curved reflector
     w wide, h high, on a drum at z */
  function cheese(THREE, g, T, x, y, z, w, h) {
    cylZ(THREE, g, 0.3, 0.35, 0.5, 8, T.metal, x, y, z + 0.25);
    var dg = new THREE.CylinderGeometry(w * 0.6, w * 0.6, h, 12, 1, true, -0.7, 1.4);
    var d = new THREE.Mesh(dg, T.metal); d.rotation.x = PI / 2; d.rotation.z = -PI / 2;
    d.position.set(x - w * 0.35, y, z + 0.5 + h / 2); g.add(d);
  }
  /* a pole topmast with a yard */
  function pole(THREE, g, T, x, y, z0, z1, r, yard, zy) {
    strut(THREE, g, T.metal, x, y, z0, x, y, z1, r, 6);
    if (yard) strut(THREE, g, T.metal, x, y - yard / 2, zy, x, y + yard / 2, zy, r * 0.6, 4);
  }
  /* a tripod: the main leg at (x, 0) and two legs spread aft to (x - a, +-b) */
  function tripod(THREE, g, T, x, z0, a, b, zt, r) {
    strut(THREE, g, T.metal, x, 0, z0, x, 0, zt, r, 8);
    strut(THREE, g, T.metal, x - a, -b, z0, x, 0, zt - 1.5, r * 0.75, 6);
    strut(THREE, g, T.metal, x - a, b, z0, x, 0, zt - 1.5, r * 0.75, 6);
  }
  /* a funnel from a table [[z, xc, hx, hy], ...] with a black cap */
  function funnel(THREE, g, T, lv, e) {
    zLoft(THREE, g, T.sup, T.soot, lv, e || 0.7, 20);
    var t = lv[lv.length - 1];
    zLoft(THREE, g, T.soot, T.soot, [[t[0] - 0.9, t[1], t[2] * 1.005, t[3] * 1.005], [t[0] + 0.02, t[1], t[2] * 1.005, t[3] * 1.005]], e || 0.7, 20);
  }
  /* Limbo Mk 10: the well in the quarterdeck and its three-barrel mortar */
  function limbo(THREE, g, T, x, y, z) {
    box(THREE, g, 4.0, 3.4, 0.06, T.dark, x, y, z + 0.02);
    cylY(THREE, g, 0.5, 2.6, 10, T.gun, x, y, z + 0.5);
    var i;
    for (i = -1; i <= 1; i++) strut(THREE, g, T.gun, x, y + i * 0.6, z + 0.5, x + 1.2, y + i * 0.6, z + 1.6, 0.2, 8);
  }
  /* Sea Cat GWS-20/22: a quadruple launcher on a pedestal, missiles along +X */
  function seacat(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 0.5, 0.65, 1.2, 10, T.sup, x, y, z + 0.6);
    box(THREE, g, 0.6, 1.8, 0.5, T.sup, x, y, z + 1.4);
    var i, j;
    for (i = -1; i <= 1; i += 2) for (j = 0; j < 2; j++)
      cylX(THREE, g, 0.1, 0.1, 1.5, 6, T.white, x + 0.3, y + i * 0.75, z + 1.25 + j * 0.45);
  }
  /* boats in davits along a side */
  function boatDavit(THREE, g, T, x, y, z, L, B) {
    var s = y < 0 ? -1 : 1;
    boat(THREE, g, T.white, T.white, x, y, z, L, B, false);
    strut(THREE, g, T.metal, x - L * 0.35, y - s * 0.8, z - 1.2, x - L * 0.35, y, z + B * 0.9, 0.08, 4);
    strut(THREE, g, T.metal, x + L * 0.35, y - s * 0.8, z - 1.2, x + L * 0.35, y, z + B * 0.9, 0.08, 4);
  }

  /* ================================================== submarines
     A body of revolution from a profile table, [x, crown z, keel z] (x from
     the stern tip, metres), with an elliptic section of half breadth hb at
     its widest scaled with the depth; a flat casing on top at zc from x0 to
     x1 of half width cw. */
  function subHull(THREE, g, m, tab, hbMax, dMax) {
    var xs = [], rings = [], i, j, N = 22;
    var L = tab[tab.length - 1][0];
    function at(x, k) {
      var q;
      for (q = 1; q < tab.length; q++) if (x <= tab[q][0]) {
        var a = tab[q - 1], b = tab[q], f = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * f;
      }
      return tab[tab.length - 1][k];
    }
    var X = [];
    for (i = 0; i < tab.length; i++) X.push(tab[i][0]);
    for (i = 1; i < 40; i++) X.push(L * i / 40);
    X.sort(function (a, b) { return a - b; });
    X = X.filter(function (v, k) { return v >= tab[0][0] && (k === 0 || v - X[k - 1] > 0.05); });
    for (i = 0; i < X.length; i++) {
      var x = X[i], zt = at(x, 1), zk = at(x, 2), h = Math.max(0.03, (zt - zk) / 2), zc = (zt + zk) / 2;
      var w = Math.max(0.03, hbMax * h / dMax * 2);
      var r = [];
      for (j = 0; j < N; j++) {
        var t = j / N * PI * 2;
        r.push([w * Math.cos(t), zc + h * Math.sin(t)]);
      }
      xs.push(x - L / 2); rings.push(r);
    }
    ringLoft(THREE, g, m, xs, rings, true);
    return { at: at, L: L };
  }
  /* a fin (sail) as a stack of rounded plan shapes: lv [[z, xa, xf, hw], ...] */
  function sail(THREE, g, m, capM, lv) {
    var L2 = lv.map(function (q) { return [q[0], (q[1] + q[2]) / 2, (q[2] - q[1]) / 2, q[3]]; });
    zLoft(THREE, g, m, capM, L2, 0.55, 24);
  }
  /* a flat plane (hydroplane, rudder) as a thin hexa: root chord at xr0..xr1
     on the hull side y0, tip chord xt0..xt1 at y1, height z, thickness t */
  function planeH(THREE, g, m, xr0, xr1, xt0, xt1, y0, y1, z, t) {
    var s, V;
    for (s = -1; s <= 1; s += 2) {
      V = [[xr0, s * y0, z - t], [xr1, s * y0, z - t], [xt1, s * y1, z - t], [xt0, s * y1, z - t],
           [xr0, s * y0, z + t], [xr1, s * y0, z + t], [xt1, s * y1, z + t], [xt0, s * y1, z + t]];
      if (s < 0) V = [V[3], V[2], V[1], V[0], V[7], V[6], V[5], V[4]];
      hexa(THREE, g, m, V);
    }
  }
  function planeV(THREE, g, m, xr0, xr1, xt0, xt1, z0, z1, t) {
    hexa(THREE, g, m, [[xr0, -t, z0], [xr1, -t, z0], [xr1, t, z0], [xr0, t, z0],
                       [xt0, -t, z1], [xt1, -t, z1], [xt1, t, z1], [xt0, t, z1]]);
  }
  function subScrew(THREE, g, T, x, z, r, n) {
    var i;
    cylX(THREE, g, 0.25, 0.45, 1.2, 10, T.gun, x, 0, z);
    for (i = 0; i < n; i++) {
      var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, r * 0.45, r), T.gun);
      bl.position.set(x, 0, z); bl.rotation.x = i * 2 * PI / n;
      bl.translateZ(r * 0.5); bl.rotation.y = 0.5; g.add(bl);
    }
  }

  /* ================================================== small deck detail
     (policy rule 10: rails, bollards, fairleads, hatches, vents, ladders,
     rafts, anchors and hawse, scuttles, whip aerials).  Placed per ship
     from the photographs; their exact counts are NOT CONFIRMED. */
  function bollard(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 0.16, 0.16, 0.45, 8, T.metal, x - 0.3, y, z + 0.22);
    cylZ(THREE, g, 0.16, 0.16, 0.45, 8, T.metal, x + 0.3, y, z + 0.22);
    box(THREE, g, 1.0, 0.45, 0.06, T.metal, x, y, z + 0.03);
  }
  function hatch(THREE, g, T, x, y, z, lx, ly) {
    box(THREE, g, lx, ly, 0.22, T.sup, x, y, z + 0.11);
    box(THREE, g, lx * 0.8, ly * 0.8, 0.04, T.dark, x, y, z + 0.23);
  }
  /* a mushroom or goose-neck vent */
  function vent(THREE, g, T, x, y, z, r, h) {
    cylZ(THREE, g, r, r, h, 8, T.sup, x, y, z + h / 2);
    cylZ(THREE, g, r * 1.7, r * 1.4, r * 0.8, 8, T.sup, x, y, z + h + r * 0.3);
  }
  function ladder(THREE, g, T, x, y, z0, z1, run) {
    var i, n = Math.max(2, Math.round((z1 - z0) / 0.3));
    strut(THREE, g, T.metal, x, y - 0.3, z0, x - run, y - 0.3, z1, 0.03, 3);
    strut(THREE, g, T.metal, x, y + 0.3, z0, x - run, y + 0.3, z1, 0.03, 3);
    for (i = 1; i < n; i++) {
      var f = i / n;
      strut(THREE, g, T.metal, x - run * f, y - 0.3, z0 + (z1 - z0) * f, x - run * f, y + 0.3, z0 + (z1 - z0) * f, 0.02, 3);
    }
  }
  /* a whip aerial with its insulator base */
  function whip(THREE, g, T, x, y, z, h, lean) {
    cylZ(THREE, g, 0.1, 0.12, 0.4, 6, T.white, x, y, z + 0.2);
    strut(THREE, g, T.metal, x, y, z + 0.4, x + (lean || 0), y, z + h, 0.025, 3);
  }
  /* a row of scuttles along both sides of the hull: xs, height above the
     waterline z (or a function of x) */
  function scuttles(THREE, g, T, H, x0, x1, n, z) {
    var i, s;
    for (i = 0; i < n; i++) {
      var x = x0 + (x1 - x0) * (n === 1 ? 0.5 : i / (n - 1)), zz = typeof z === "function" ? z(x) : z;
      for (s = -1; s <= 1; s += 2) cylY(THREE, g, 0.17, 0.05, 8, T.dark, x, s * (H.W(x, zz) + 0.012), zz);
    }
  }
  /* the anchors in their hawse pipes, the cables to the windlass */
  function anchors(THREE, g, T, H, x, zDrop, sz, xw) {
    var s, z = H.deckZ(x) - zDrop;
    for (s = -1; s <= 1; s += 2) {
      var y = s * (H.W(x, z) + 0.02);
      box(THREE, g, sz * 1.2, 0.12, sz * 0.9, T.dark, x, y, z, -s * 0.25);
      box(THREE, g, sz * 0.3, 0.1, sz * 1.3, T.gun, x - 0.1, y + s * 0.05, z - sz * 0.5);
      box(THREE, g, sz * 1.0, 0.12, sz * 0.25, T.gun, x - 0.1, y + s * 0.05, z - sz * 1.1);
      var zd = H.deckZ(x - 0.5);
      cylZ(THREE, g, sz * 0.35, sz * 0.4, 0.25, 10, T.gun, x - 0.5, s * (H.halfB(x - 0.5) - 1.0), zd + 0.12);
      strut(THREE, g, T.gun, x - 0.5, s * (H.halfB(x - 0.5) - 1.0), zd + 0.12, xw, s * 0.6, H.deckZ(xw) + 0.12, sz * 0.07, 4);
      cylZ(THREE, g, sz * 0.4, sz * 0.5, sz * 0.6, 10, T.metal, xw, s * 0.6, H.deckZ(xw) + sz * 0.3);
    }
  }
  /* life-raft canisters in pairs on deck or a roof, along x */
  function rafts(THREE, g, T, x0, y, z, n) {
    var i;
    for (i = 0; i < n; i++) {
      var c = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.1, 10), T.white);
      c.position.set(x0 + i * 0.75, y, z + 0.32); g.add(c);
    }
    box(THREE, g, n * 0.75, 0.8, 0.06, T.metal, x0 + (n - 1) * 0.375, y, z + 0.03);
  }
  /* jack and ensign staffs */
  function staff(THREE, g, T, x, z, h) { strut(THREE, g, T.metal, x, 0, z, x, 0, z + h, 0.045, 4); }

  /* ============================================== PORPOISE (gbr_e50_sub)
     [PD] stations, px of the 1920 px render of "Porpoise-class SS.svg":
     stern tip 6, stem 1913 (1907 px = 90.0 m, 21.19 px/m); casing crown
     row 313, keel row 471 (7.46 m); the published 5.5 m draught puts the
     waterline 5.5 m over the keel, so the casing stands 1.96 m clear. */
  var PO_L = 90.0, PO_K = 21.19, PO_C = 1.96;
  function poX(px) { return (px - 959.5) / PO_K; }
  function poZ(r) { return PO_C + (313 - r) / PO_K; }
  var PO_TAB = [[108, 398, 424], [130, 336, 418], [170, 316, 417], [216, 314, 418], [264, 314, 421],
                [312, 314, 431], [336, 314, 451], [360, 314, 469], [384, 314, 471], [1632, 313, 471],
                [1680, 313, 454], [1728, 313, 448], [1800, 313, 438], [1848, 300, 432], [1872, 296, 422],
                [1896, 300, 349], [1913, 312, 320]];
  function buildPorpoise(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), i, s;
    var tab = PO_TAB.map(function (q) { return [poX(q[0]) + PO_L / 2, poZ(q[1]), poZ(q[2])]; });
    subHull(THREE, g, T.boot, tab, 4.05, 7.46);
    /* the flat casing deck along the top [PD][PP] */
    box(THREE, g, poX(1640) - poX(170), 2.6, 0.12, T.deck, (poX(1640) + poX(170)) / 2, 0, PO_C + 0.02);
    for (i = 0; i < 46; i++) {
      var xl = poX(200) + i * (poX(1600) - poX(200)) / 45;
      for (s = -1; s <= 1; s += 2) box(THREE, g, 0.35, 0.05, 0.12, T.dark, xl, s * 1.32, PO_C - 0.25);
    }
    /* the raised bow casing and the forward box [PD] */
    box(THREE, g, poX(1690) - poX(1640), 1.8, poZ(284) - PO_C, T.boot, (poX(1690) + poX(1640)) / 2, 0, (poZ(284) + PO_C) / 2);
    var bx = [], br = [];
    for (i = 0; i <= 6; i++) {
      var px = 1800 + 100 * i / 6, hgt = (poZ(282) - PO_C) * Math.sin(PI * (0.12 + 0.76 * i / 6));
      bx.push(poX(px)); br.push(superRing(1.0 - 0.5 * i / 6, Math.max(0.05, hgt / 2), PO_C + hgt / 2 - 0.05, 0.7, 12));
    }
    ringLoft(THREE, g, T.boot, bx, br, true);
    /* the after casing over the rudder and the lower rudder [PD] */
    box(THREE, g, poX(170) - poX(10), 1.6, poZ(341) - poZ(362), T.boot, (poX(170) + poX(10)) / 2, 0, (poZ(341) + poZ(362)) / 2);
    planeV(THREE, g, T.boot, poX(20), poX(80), poX(25), poX(78), poZ(448), poZ(362), 0.2);
    /* stern planes at the shaft line, NOT CONFIRMED span (3.6 m from the axis) */
    planeH(THREE, g, T.boot, poX(150), poX(240), poX(130), poX(190), 0.9, 3.6, poZ(408), 0.12);
    subScrew(THREE, g, T, poX(112), poZ(410), 1.6, 5);
    /* bow planes, folded up against the casing forward [PD 1660-1700] */
    planeH(THREE, g, T.boot, poX(1640), poX(1700), poX(1650), poX(1690), 1.6, 3.0, poZ(318), 0.1);
    /* bow torpedo tube shutters, three a side [PD 1815-1870] */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) {
      var xt = poX(1842), zt = poZ(370 + i * 19);
      box(THREE, g, poX(1870) - poX(1815), 0.05, 0.6, T.dark, xt, s * 2.35, zt);
    }
    /* the fin: leading edge 790 (raked to 806), roof row 177, after edge 1040 [PD][PP] */
    var zf = poZ(177);
    sail(THREE, g, T.boot, T.dark, [[PO_C - 0.2, poX(784), poX(1042), 1.5], [PO_C + 2.0, poX(790), poX(1041), 1.45],
                                     [zf - 1.2, poX(800), poX(1040), 1.3], [zf - 0.25, poX(812), poX(1039), 1.15], [zf, poX(822), poX(1037), 1.0]]);
    /* bridge windows / openings at the fin's fore top [PD] */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.2, 0.05, 0.35, T.dark, poX(830), s * 1.08, zf - 0.6);
    /* the mast row [PD]: px of each, top row */
    [[830, 105, 0.16], [853, 10, 0.12], [878, 112, 0.22], [903, 102, 0.14], [929, 108, 0.14], [956, 104, 0.12], [993, 100, 0.08]].forEach(function (m) {
      cylZ(THREE, g, m[2], m[2], poZ(m[1]) - zf, 8, T.metal, poX(m[0]), 0, (poZ(m[1]) + zf) / 2);
      cylZ(THREE, g, m[2] * 1.5, m[2] * 1.5, 0.4, 8, T.gun, poX(m[0]), 0, poZ(m[1]) - 0.2);
    });
    /* rails on the bridge and the casing guard posts [PP] */
    rectRail(THREE, g, T, poX(830), poX(1030), 0.95, zf);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 6; i++) strut(THREE, g, T.metal, poX(1100) + i * 3.2, s * 1.2, PO_C, poX(1100) + i * 3.2, s * 1.2, PO_C + 0.9, 0.025, 3);
    hatch(THREE, g, T, poX(1220), 0, PO_C, 1.0, 1.0);
    hatch(THREE, g, T, poX(600), 0, PO_C, 1.0, 1.0);
    bollard(THREE, g, T, poX(1220), 0.8, PO_C); bollard(THREE, g, T, poX(207), 0.8, PO_C);
    box(THREE, g, 1.6, 0.6, 0.03, T.team, poX(930), 0, zf + 0.03);
    return finish(THREE, g, null);
  }

  /* ============================================ RESOLUTION (gbr_e60_ssbn)
     [RD] stations, px of the 1920 px render of "Resolution-class SSBN.svg":
     screw tip 4, bow 1915 (1911 px = 129.5 m, 14.76 px/m); missile-deck
     crown row 202, keel row 368 (11.25 m); the published 9.17 m (30 ft
     1 in) draught puts the crown 2.08 m over the water. */
  var RE_L = 129.5, RE_K = 14.76, RE_C = 2.08;
  function reX(px) { return (px - 959.5) / RE_K; }
  function reZ(r) { return RE_C + (202 - r) / RE_K; }
  var RE_TAB = [[30, 280, 312], [60, 270, 322], [168, 260, 328], [216, 251, 337], [264, 244, 345], [312, 237, 351],
                [360, 231, 356], [408, 227, 360], [456, 223, 363], [504, 221, 365], [552, 219, 366], [576, 211, 367],
                [624, 206, 368], [696, 202, 368], [1176, 202, 368], [1392, 203, 368], [1488, 206, 368],
                [1584, 210, 367], [1680, 214, 362], [1752, 219, 354], [1824, 227, 344], [1872, 234, 332],
                [1896, 248, 322], [1915, 288, 294]];
  function buildResolution(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), i, s;
    var tab = RE_TAB.map(function (q) { return [reX(q[0]) + RE_L / 2, reZ(q[1]), reZ(q[2])]; });
    subHull(THREE, g, T.boot, tab, 5.05, 11.25);
    /* the flat missile-deck casing over the tubes, 600-1600 [RD][RR] */
    hexa(THREE, g, T.boot, [[reX(600), -1.2, RE_C - 0.9], [reX(1600), -1.2, reZ(210) - 0.9], [reX(1600), 1.2, reZ(210) - 0.9], [reX(600), 1.2, RE_C - 0.9],
                            [reX(600), -1.0, reZ(208)], [reX(1600), -1.2, reZ(210) + 0.08], [reX(1600), 1.2, reZ(210) + 0.08], [reX(600), 1.0, reZ(208)]]);
    box(THREE, g, reX(1190) - reX(690), 4.6, 0.5, T.boot, (reX(1190) + reX(690)) / 2, 0, RE_C - 0.12);
    /* the sixteen Polaris A3 tube hatches in two rows of eight, 845-1145 [RD] */
    for (i = 0; i < 8; i++) for (s = -1; s <= 1; s += 2) {
      var xh = reX(860 + i * 38.5);
      cylZ(THREE, g, 1.0, 1.05, 0.14, 16, T.gun, xh, s * 1.2, RE_C + 0.2);
      cylZ(THREE, g, 0.8, 0.8, 0.02, 16, T.dark, xh, s * 1.2, RE_C + 0.28);
      box(THREE, g, 0.5, 0.2, 0.12, T.gun, xh - 1.0, s * 1.2, RE_C + 0.22);
    }
    box(THREE, g, reX(1150) - reX(845), 0.05, 0.05, T.dark, (reX(1150) + reX(845)) / 2, 0, RE_C + 0.02);
    /* the sail 1200-1393, roof row 127, rounded nose [RD][RR] */
    var zf = reZ(127);
    sail(THREE, g, T.boot, T.dark, [[RE_C - 0.3, reX(1196), reX(1396), 1.8], [RE_C + 1.5, reX(1200), reX(1394), 1.7],
                                     [zf - 0.8, reX(1205), reX(1392), 1.55], [zf, reX(1214), reX(1388), 1.35]]);
    box(THREE, g, 0.9, 0.06, 0.4, T.dark, reX(1380), 0, zf - 0.6);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.6, 0.05, 0.3, T.dark, reX(1360), s * 1.37, zf - 0.7);
    /* the mast row [RD]: px, top row */
    [[1234, 87, 0.18], [1252, 73, 0.3], [1270, 11, 0.13], [1288, 64, 0.12], [1318, 68, 0.12], [1340, 75, 0.14]].forEach(function (m) {
      cylZ(THREE, g, m[2], m[2], reZ(m[1]) - zf, 8, T.metal, reX(m[0]), 0, (reZ(m[1]) + zf) / 2);
      cylZ(THREE, g, m[2] * 1.4, m[2] * 1.4, 0.5, 8, T.gun, reX(m[0]), 0, reZ(m[1]) - 0.25);
    });
    /* the casing box forward, 1622-1665 rows 186-215 [RD]: its use is NOT identified */
    box(THREE, g, reX(1665) - reX(1622), 1.6, reZ(186) - reZ(214), T.boot, (reX(1665) + reX(1622)) / 2, 0, (reZ(186) + reZ(214)) / 2);
    /* the cruciform stern: upper and lower rudders 62-150, rows 191-364 [RD] */
    planeV(THREE, g, T.boot, reX(62), reX(150), reX(64), reX(140), reZ(258), reZ(191), 0.2);
    planeV(THREE, g, T.boot, reX(64), reX(140), reX(62), reX(150), reZ(364), reZ(314), 0.2);
    /* stern planes at the shaft line, span NOT CONFIRMED (5.4 m from the axis) */
    planeH(THREE, g, T.boot, reX(70), reX(165), reX(66), reX(130), 1.6, 5.4, reZ(292), 0.15);
    subScrew(THREE, g, T, reX(22), reZ(292), 2.4, 7);
    /* the flank-array strip low on the hull, 690-1470 [RD] */
    for (s = -1; s <= 1; s += 2) box(THREE, g, reX(1470) - reX(690), 0.06, 0.3, T.dark, (reX(1470) + reX(690)) / 2, s * 4.35, reZ(333));
    hatch(THREE, g, T, reX(1500), 0, reZ(206), 1.0, 1.0);
    hatch(THREE, g, T, reX(640), 0, reZ(205), 1.0, 1.0);
    box(THREE, g, 2.0, 0.8, 0.03, T.team, reX(1300), 0, zf + 0.03);
    return finish(THREE, g, null);
  }

  /* =============================================== VALIANT (gbr_e60_sub)
     No profile drawing of the Valiant class was found.  The Resolution was
     the Valiant design with the missile section added and the same 10.1 m
     hull (en.wikipedia), so the hull here is [RD]'s stern run (screw to
     px 696) and bow run (px 1392 to the stem) joined by 4.6 m of parallel
     body to make the published 86.9 m (285 ft): NOT CONFIRMED in detail.
     The published 8.23 m draught on [RD]'s 11.25 m depth puts the crown
     3.0 m clear.  The fin, the bow planes and the rudder from [VP] "Valiant
     class submarine 1986" (port quarter, from the air) with its
     foreshortening taken out along the hull: fin 26.7-35.3 m from the bow,
     bow planes 15-18 m from the bow; the fin height (6.5 m over the crown)
     is NOT CONFIRMED.  [VS] "HMS Valiant S102 01" (alongside): the round
     bow, the tall narrow fin with its rounded nose, the black finish. */
  var VA_L = 86.9, VA_C = 3.0, VA_PAR = 4.6;
  function vaRow(q) {
    var x = q[0] <= 696 ? (q[0] - 4) / RE_K : (696 - 4) / RE_K + VA_PAR + (q[0] - 1392) / RE_K;
    return [x, VA_C + (202 - q[1]) / RE_K, VA_C + (202 - q[2]) / RE_K];
  }
  function buildValiant(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), i, s;
    var tab = RE_TAB.filter(function (q) { return q[0] <= 696 || q[0] >= 1392; }).map(vaRow);
    var sc = VA_L / tab[tab.length - 1][0];
    tab = tab.map(function (r) { return [r[0] * sc, r[1], r[2]]; });
    subHull(THREE, g, T.boot, tab, 5.05, 11.25);
    function XB(m) { return VA_L / 2 - m; }          /* metres from the bow -> model x */
    function XS(px) { return -VA_L / 2 + (px - 4) / RE_K * sc; }   /* [RD] stern px -> model x */
    /* the casing strip along the crown [VP] */
    box(THREE, g, 36, 2.2, 0.3, T.boot, XB(30), 0, VA_C - 0.2);
    /* the fin [VP][VS] */
    var zf = VA_C + 6.5;
    sail(THREE, g, T.boot, T.dark, [[VA_C - 0.4, XB(35.3), XB(26.7), 1.45], [VA_C + 2.0, XB(35.2), XB(26.8), 1.4],
                                     [zf - 0.6, XB(35.0), XB(27.0), 1.3], [zf, XB(34.8), XB(27.4), 1.15]]);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.2, 0.05, 0.3, T.dark, XB(27.6), s * 1.2, zf - 0.6);
    rectRail(THREE, g, T, XB(30.5), XB(27.6), 0.9, zf);
    [[28.4, 3.6, 0.16], [29.6, 6.0, 0.13], [30.8, 2.6, 0.2], [32.2, 3.0, 0.14]].forEach(function (m) {
      cylZ(THREE, g, m[2], m[2], m[1], 8, T.metal, XB(m[0]), 0, zf + m[1] / 2);
    });
    /* bow planes, out, on the upper hull 15-18 m from the bow [VP] */
    planeH(THREE, g, T.boot, XB(18.0), XB(15.0), XB(17.6), XB(15.8), 3.6, 6.6, VA_C - 0.9, 0.12);
    /* the cruciform stern after [RD] */
    planeV(THREE, g, T.boot, XS(62), XS(150), XS(64), XS(140), VA_C + (202 - 270) / RE_K, VA_C + (202 - 191) / RE_K, 0.2);
    planeV(THREE, g, T.boot, XS(64), XS(140), XS(62), XS(150), VA_C + (202 - 364) / RE_K, VA_C + (202 - 314) / RE_K, 0.2);
    planeH(THREE, g, T.boot, XS(70), XS(165), XS(66), XS(130), 1.6, 5.4, VA_C + (202 - 292) / RE_K, 0.15);
    subScrew(THREE, g, T, XS(22), VA_C + (202 - 292) / RE_K, 2.2, 7);
    /* casing fittings: hatches, the capstan, guard stanchion sockets [VS] */
    hatch(THREE, g, T, XB(20), 0, VA_C - 0.05, 1.0, 1.0);
    hatch(THREE, g, T, XB(44), 0, VA_C - 0.05, 1.0, 1.0);
    bollard(THREE, g, T, XB(17), 0.6, VA_C - 0.05);
    bollard(THREE, g, T, XB(46), 0.6, VA_C - 0.05);
    for (i = 0; i < 10; i++) for (s = -1; s <= 1; s += 2) box(THREE, g, 0.12, 0.12, 0.15, T.metal, XB(14 + i * 3.4), s * 1.0, VA_C + 0.02);
    box(THREE, g, 1.6, 0.8, 0.03, T.team, XB(30.0), 0, zf + 0.03);
    return finish(THREE, g, null);
  }

  /* ================================================ DARING (gbr_e50_destroyer)
     [DD] "Daring Class line drawing.jpg" (1000 px): stem head 86, stern
     985 (899 px = 118.9 m, 7.56 px/m; its 100 ft bar gives 7.61), the
     waterline row 288 (the keel row 318 less the published 12.75 ft
     draught), so d = (px - 86) / 7.56 aft of the stem, z = (288 - row) / 7.56. */
  var DA_L = 118.9;
  var DA_STA = [
    /* d,    deck,  hbDeck, hbWL, keel, n */
    [0.0,   10.30, 0.10, 0.00,  0.00, 1.2],
    [2.0,   10.22, 1.20, 0.00,  0.00, 1.3],
    [4.0,   10.14, 2.10, 0.80, -2.30, 1.4],
    [8.0,   10.00, 3.40, 2.10, -3.60, 1.7],
    [14.0,   9.85, 4.60, 3.50, -3.90, 2.0],
    [22.0,   9.68, 5.60, 4.80, -3.90, 2.4],
    [30.0,   9.55, 6.25, 5.70, -3.90, 2.8],
    [40.0,   9.42, 6.55, 6.15, -3.90, 3.0],
    [55.4,   9.30, 6.55, 6.20, -3.90, 3.0],
    [59.9,   6.45, 6.55, 6.20, -3.90, 3.0],
    [80.0,   6.50, 6.50, 6.10, -3.90, 3.0],
    [95.0,   6.58, 6.20, 5.70, -3.40, 3.0],
    [105.0,  6.66, 5.60, 4.90, -2.40, 3.1],
    [112.0,  6.76, 5.00, 4.10, -1.20, 3.2],
    [118.0,  6.85, 4.45, 3.50, -0.30, 3.3],
    [118.9,  6.87, 4.30, 3.35,  0.50, 3.3]
  ];
  function buildDaring(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    var h = makeHull(DA_L, DA_STA, 2.0, 118.0, 0.5), X = h.X, D = h.deckZ;
    h.shell(THREE, g, T);
    /* scuttles: the forecastle row (row 221) and the lower row (row 252),
       the after row (row 246) [DD] */
    scuttles(THREE, g, T, h, X(12.5), X(39), 6, 8.9);
    scuttles(THREE, g, T, h, X(65), X(81), 4, 8.9);
    scuttles(THREE, g, T, h, X(34.3), X(71), 8, 4.8);
    scuttles(THREE, g, T, h, X(93), X(105.5), 5, 5.6);
    anchors(THREE, g, T, h, X(3.4), 1.3, 1.2, X(9.5));
    /* the V breakwater ahead of A [DD plan] */
    for (s = -1; s <= 1; s += 2)
      hexa(THREE, g, T.sup, [[X(14.0), 0, D(X(14))], [X(16.5), s * 3.6, D(X(16.5))], [X(16.7), s * 3.6, D(X(16.7))], [X(14.2), 0, D(X(14))],
                             [X(14.0), 0, D(X(14)) + 1.0], [X(16.5), s * 3.6, D(X(16.5)) + 0.8], [X(16.7), s * 3.6, D(X(16.7)) + 0.8], [X(14.2), 0, D(X(14)) + 1.0]].map(function (v, k, a) { return s > 0 ? v : a[[3, 2, 1, 0, 7, 6, 5, 4][k]]; }));
    /* forecastle fittings: bollards, fairleads, vents, lockers [DD plan] */
    for (s = -1; s <= 1; s += 2) {
      bollard(THREE, g, T, X(7.5), s * 2.4, D(X(7.5)));
      bollard(THREE, g, T, X(28.5), s * 5.1, D(X(28.5)));
      bollard(THREE, g, T, X(96.0), s * 5.0, D(X(96)));
      bollard(THREE, g, T, X(113.5), s * 3.8, D(X(113.5)));
      vent(THREE, g, T, X(11.5), s * 1.6, D(X(11.5)), 0.25, 0.8);
      box(THREE, g, 1.0, 0.6, 0.8, T.sup, X(19.0), s * 4.0, D(X(19)) + 0.4);
    }
    hatch(THREE, g, T, X(12.0), 0, D(X(12)), 1.4, 1.2);

    /* 01 house on the forecastle d 31.2-55.4, roof 12.4 [DD] */
    var R01 = 12.4;
    house(THREE, g, T.sup, X(55.4), X(31.2), 4.0, 1.2, 9.2, R01);
    sideWindows(THREE, g, T, X(54), X(41), 4, 4.0, 11.2, 0.35, 0.35);
    for (s = -1; s <= 1; s += 2) {
      /* life-raft stowages on the house sides (the crossed panels of [DD]) */
      box(THREE, g, 3.0, 0.35, 2.2, T.sup, X(39.0), s * 4.15, 10.7);
      box(THREE, g, 4.6, 0.35, 2.2, T.sup, X(51.5), s * 4.15, 10.7);
      box(THREE, g, 0.9, 0.06, 1.9, T.dark, X(45.2), s * 4.02, 10.4);
    }
    rectRail(THREE, g, T, X(55.2), X(31.6), 3.85, R01);
    /* bridge block d 39-43, roof 19.3, its face raked [DD] */
    hexa(THREE, g, T.sup, [[X(43.2), -3.2, R01], [X(39.0), -3.2, R01], [X(39.0), 3.2, R01], [X(43.2), 3.2, R01],
                           [X(43.2), -3.0, 19.3], [X(39.4), -3.0, 19.3], [X(39.4), 3.0, 19.3], [X(43.2), 3.0, 19.3]]);
    bridgeGlass(THREE, g, T, X(39.35), 3.0, 0.6, 17.9, 18.8, 1.6);
    rectRail(THREE, g, T, X(43.1), X(39.5), 2.9, 19.3);
    /* searchlight platform d 43.6-48.2 at 18.6 with its two lamps [DD] */
    platform(THREE, g, T, X(45.9), 0, 18.6, 4.6, 4.8);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, X(45.9), s * 2.0, R01, X(45.9), s * 2.0, 18.55, 0.12, 6);
      cylX(THREE, g, 0.5, 0.5, 0.9, 12, T.sup, X(45.5), s * 1.6, 17.6);
      cylZ(THREE, g, 0.25, 0.3, 0.6, 8, T.metal, X(45.5), s * 1.6, 16.9);
    }
    /* the after block d 48.5-55.4 roof 14.0 with the two STAAG abreast [DD] */
    house(THREE, g, T.sup, X(55.4), X(48.5), 3.6, 0.6, R01 - 0.05, 14.0);
    for (s = -1; s <= 1; s += 2) {
      var st = new THREE.Group(); st.position.set(X(52.6), s * 2.0, 14.0); st.rotation.z = s * 0.6; bofors2(THREE, st, T); g.add(st);
    }
    rectRail(THREE, g, T, X(55.2), X(48.7), 3.45, 14.0);
    /* director tower d 48.1-53.3 z 15.9-18.6 on its column, and the main
       director with its dish on top (to 21.8) [DD] */
    box(THREE, g, 2.4, 2.2, 15.9 - 14.0, T.sup, X(49.8), 0, 14.95);
    house(THREE, g, T.sup, X(53.3), X(48.1), 2.2, 0.5, 15.9, 18.6);
    cylZ(THREE, g, 1.6, 1.6, 0.25, 14, T.sup, X(50.5), 0, 19.0);
    director(THREE, g, T, X(50.5), 0, 19.1, 1.2, 1.7, 0.9);
    ladder(THREE, g, T, X(47.8), -1.0, R01, 18.6, 1.0);

    /* the lattice foremast d 57.0-61.2 from the forecastle to the platform
       at 25.4, the fore funnel inside it (the black uptake of [DD], top
       about 19 m), the yard, the Type 293 aerial over the platform and the
       pole to 33.2 [DD] */
    house(THREE, g, T.sup, X(62.5), X(56.0), 3.0, 0.5, 6.4, 9.6);
    funnel(THREE, g, T, [[9.5, X(60.2), 1.9, 1.5], [14.0, X(60.4), 1.6, 1.25], [19.0, X(60.5), 1.45, 1.1]], 0.75);
    latticeMast(THREE, g, T, X(61.2), X(57.0), 2.1, 9.5, X(61.0), X(58.0), 0.9, 25.4, 6);
    platform(THREE, g, T, X(59.5), 0, 25.4, 3.6, 2.4);
    box(THREE, g, 0.18, 5.2, 0.18, T.metal, X(59.4), 0, 25.6);
    cheese(THREE, g, T, X(58.6), 0, 25.5, 2.4, 1.0);
    pole(THREE, g, T, X(61.0), 0, 25.4, 33.2, 0.09, 2.4, 29.5);

    /* the after house on the main deck d 62.9-107.7, roof 9.55 [DD] */
    var RA = 9.55;
    house(THREE, g, T.sup, X(107.7), X(62.9), 3.6, 0.8, 6.3, RA);
    sideWindows(THREE, g, T, X(105), X(66), 10, 3.6, 8.2, 0.3, 0.3);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 3.4, 0.3, 2.3, T.sup, X(71.0), s * 3.72, 7.8);
      box(THREE, g, 3.4, 0.3, 2.3, T.sup, X(84.5), s * 3.72, 7.8);
      box(THREE, g, 1.0, 0.06, 1.9, T.dark, X(90), s * 3.62, 7.4);
    }
    roofRail(THREE, g, T, [[X(107.5), 3.45], [X(63.2), 3.45]], RA, 0.9);
    roofRail(THREE, g, T, [[X(107.5), -3.45], [X(63.2), -3.45]], RA, 0.9);
    /* the after funnel d 75.6-78.9, top 16.8, with its black cap [DD] */
    funnel(THREE, g, T, [[RA - 0.05, X(77.2), 2.4, 1.8], [11.5, X(77.25), 1.9, 1.5], [16.8, X(77.3), 1.65, 1.35]], 0.7);
    /* the pentad torpedo tubes on the house roof d 64-70 [DD plan] */
    cylZ(THREE, g, 1.3, 1.4, 0.5, 14, T.sup, X(67.0), 0, RA + 0.25);
    for (i = -2; i <= 2; i++) cylX(THREE, g, 0.3, 0.3, 6.6, 10, T.gun, X(67.0), i * 0.65, RA + 1.0);
    box(THREE, g, 1.2, 3.6, 0.9, T.sup, X(69.6), 0, RA + 0.9);
    /* deckhouses on the roof and the after director [DD] */
    [[71.0, 73.5], [80.0, 82.5], [83.7, 87.5], [88.0, 93.0]].forEach(function (q) {
      house(THREE, g, T.sup, X(q[1]), X(q[0]), 2.0, 0.3, RA - 0.05, 12.7);
    });
    director(THREE, g, T, X(90.8), 0, 12.7, 0.9, 1.3, 0);
    pole(THREE, g, T, X(88.1), 0, 12.7, 19.6, 0.08, 2.8, 17.5);
    /* boats: the 25 ft motor boats abreast at the break, the 27 ft whaler
       to starboard [DD plan]; davits */
    for (s = -1; s <= 1; s += 2) boatDavit(THREE, g, T, X(58.6), s * 5.3, 10.4, 7.6, 2.2);
    boatDavit(THREE, g, T, X(75.5), -5.1, 8.0, 8.2, 1.9);
    rafts(THREE, g, T, X(103.5), 2.4, RA, 3);
    rafts(THREE, g, T, X(103.5), -2.4, RA, 3);
    /* Y gun on the after house, trained aft [DD] */
    var yg = new THREE.Group(); yg.position.set(X(96.6), 0, RA); yg.rotation.z = PI; mk6(THREE, yg, T); g.add(yg);
    /* B gun on the 01 roof [DD] */
    var bg = new THREE.Group(); bg.position.set(X(34.5), 0, R01); mk6(THREE, bg, T); g.add(bg);
    /* Squid on the quarterdeck d 112-115 [DD] */
    limbo(THREE, g, T, X(113.5), 0, D(X(113.5)));
    staff(THREE, g, T, X(0.6), D(X(0.6)), 3.0);
    staff(THREE, g, T, X(118.6), D(X(118.6)), 4.0);
    /* rails on the forecastle and the quarterdeck */
    h.railRun(THREE, g, T, X(55.0), X(1.2), 2.8, 1.0);
    h.railRun(THREE, g, T, X(118.6), X(60.2), 2.8, 1.0);
    screws(THREE, g, T, X(108.5), 2.8, -2.6, X(112.0), 12.0, 1.4, 2.6);
    box(THREE, g, 2.2, 1.6, 0.04, T.team, X(41.2), 0, 19.33);
    box(THREE, g, 2.6, 1.4, 0.04, T.team, X(102), 0, RA + 0.03);
    box(THREE, g, 2.0, 1.2, 0.04, T.team, X(58.6), 0, 9.63);
    /* A gun on the forecastle: the row's turret [DD] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(23.8), 0, D(X(23.8))); mk6(THREE, tw, T);
    return finish(THREE, g, tw);
  }

  /* ============================================ WHITBY (gbr_e50_corvette)
     [WB] "HMS Blackpool (F77).jpg" (Commons, starboard broadside, 1600 px):
     stem head 70, stern 1535 (1465 px = 112.8 m, 12.99 px/m), waterline at
     the foot of the boot topping, row 696 at the bow to 690 at the stern;
     d = (px - 70) / 12.99 aft of the stem.  [WT] "HMS Tenby (F65), 1963"
     and [WQ] "HMS Torquay (F43) underway c1961" (bow quarter views): the
     flared bow, the breakwater, the gunhouse face, the director, the
     lattice foremast. */
  var WH_L = 112.8;
  var WH_STA = [
    [0.0,   13.00, 0.10, 0.00,  0.00, 1.2],
    [2.5,   12.85, 1.00, 0.00,  0.00, 1.3],
    [6.0,   12.60, 2.30, 0.90, -2.80, 1.5],
    [12.0,  12.25, 3.70, 2.50, -4.00, 1.8],
    [20.0,  11.85, 4.90, 4.00, -4.20, 2.2],
    [29.3,  11.20, 5.70, 5.10, -4.20, 2.6],
    [37.0,   9.70, 6.10, 5.70, -4.20, 2.9],
    [42.3,   8.60, 6.25, 5.95, -4.20, 3.0],
    [48.5,   7.90, 6.25, 6.00, -4.20, 3.0],
    [56.0,   7.30, 6.25, 6.00, -4.20, 3.0],
    [64.0,   7.20, 6.25, 6.00, -4.20, 3.0],
    [74.6,   7.10, 6.20, 5.90, -4.20, 3.0],
    [76.0,   6.20, 6.20, 5.90, -4.20, 3.0],
    [95.0,   6.20, 5.80, 5.30, -3.40, 3.0],
    [106.0,  6.00, 5.20, 4.60, -2.00, 3.1],
    [107.6,  3.90, 5.10, 4.50, -1.80, 3.1],
    [112.0,  3.90, 4.80, 4.10, -0.40, 3.2],
    [112.8,  3.90, 4.70, 4.00,  0.40, 3.2]
  ];
  function buildWhitby(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    var h = makeHull(WH_L, WH_STA, 2.5, 112.0, 0.4), X = h.X, D = h.deckZ;
    h.shell(THREE, g, T);
    scuttles(THREE, g, T, h, X(31), X(48), 5, function (x) { return D(x) - 1.5; });
    scuttles(THREE, g, T, h, X(52), X(74), 6, 5.6);
    scuttles(THREE, g, T, h, X(78), X(104), 9, 4.9);
    anchors(THREE, g, T, h, X(5.4), 2.2, 1.2, X(11.5));
    for (s = -1; s <= 1; s += 2) {
      bollard(THREE, g, T, X(9.0), s * 2.6, D(X(9)));
      bollard(THREE, g, T, X(33.0), s * 5.2, D(X(33)));
      bollard(THREE, g, T, X(80.0), s * 5.5, D(X(80)));
      bollard(THREE, g, T, X(101.0), s * 4.6, D(X(101)));
      vent(THREE, g, T, X(16), s * 2.0, D(X(16)), 0.25, 0.8);
      vent(THREE, g, T, X(90), s * 4.0, D(X(90)), 0.3, 0.9);
    }
    hatch(THREE, g, T, X(14), 0, D(X(14)), 1.5, 1.2);
    hatch(THREE, g, T, X(26), 1.6, D(X(26)), 1.2, 1.2);
    /* the V breakwater ahead of the gun, d 40-43 [WB][WT] */
    for (s = -1; s <= 1; s += 2) {
      var V = [[X(40.0), 0, D(X(40))], [X(43.0), s * 4.2, D(X(43))], [X(43.25), s * 4.2, D(X(43))], [X(40.25), 0, D(X(40))],
               [X(40.0), 0, D(X(40)) + 1.3], [X(43.0), s * 4.2, D(X(43)) + 0.9], [X(43.25), s * 4.2, D(X(43)) + 0.9], [X(40.25), 0, D(X(40)) + 1.3]];
      if (s < 0) V = [V[3], V[2], V[1], V[0], V[7], V[6], V[5], V[4]];
      hexa(THREE, g, T.sup, V);
    }

    /* the 01 house d 50.5-74.6 to 11.2 [WB] */
    var R01 = 11.2;
    house(THREE, g, T.sup, X(74.6), X(50.5), 4.6, 1.3, 6.9, R01);
    sideWindows(THREE, g, T, X(73), X(60), 5, 4.6, 9.4, 0.35, 0.35);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.0, 0.06, 1.9, T.dark, X(66), s * 4.62, 8.4);
    rectRail(THREE, g, T, X(74.4), X(59.8), 4.45, R01);
    ladder(THREE, g, T, X(57.0), -4.0, 7.4, R01, 1.6);
    /* the bridge d 52-59.5, roof 14.0, window band 13.0 [WB][WT] */
    house(THREE, g, T.sup, X(59.5), X(52.0), 4.0, 1.5, R01 - 0.05, 14.0);
    bridgeGlass(THREE, g, T, X(52.0), 4.0, 1.5, 12.7, 13.4, 2.4);
    rectRail(THREE, g, T, X(59.3), X(52.3), 3.85, 14.0);
    /* the Mk 6M director on its pedestal d 61.5-64.5, top 19.1, with the
       two Type 275 nacelles [WB][WT] */
    cylZ(THREE, g, 1.1, 1.3, 15.0 - R01, 12, T.sup, X(63.0), 0, (15.0 + R01) / 2);
    box(THREE, g, 3.4, 3.0, 2.6, T.sup, X(63.0), 0, 16.3);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.85, 0.85, 2.0, 14, T.sup, X(62.2), s * 1.55, 18.2);
      sphere(THREE, g, 0.84, T.sup, X(61.2), s * 1.55, 18.2);
    }
    /* the lattice foremast d 66.0-72.3 from the 01 roof to 22.3, the
       Type 277Q dish on its face, the yard at 24.2, the topmast with the
       Type 293Q at 26.8-28 and the pole to 34.5 [WB] */
    latticeMast(THREE, g, T, X(72.3), X(66.0), 1.9, R01, X(70.5), X(68.0), 0.7, 22.3, 5);
    platform(THREE, g, T, X(69.2), 0, 22.3, 3.2, 2.4);
    dish(THREE, g, T.metal, 1.4, X(66.9), 0, 21.0, 0.1);
    box(THREE, g, 0.2, 12.5, 0.2, T.metal, X(69.0), 0, 24.2);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, X(69.0), s * 6.2, 24.2, X(69.0), s * 6.2, 23.2, 0.03, 3);
    strut(THREE, g, T.metal, X(69.2), 0, 22.3, X(69.2), 0, 34.5, 0.1, 6);
    cheese(THREE, g, T, X(68.4), 0, 26.6, 2.4, 1.0);
    /* the funnel d 71.6-75.4, its domed top 18.3 [WB] */
    funnel(THREE, g, T, [[R01 - 0.05, X(73.5), 1.95, 1.75], [16.9, X(73.5), 1.9, 1.7], [17.8, X(73.5), 1.6, 1.4], [18.3, X(73.5), 0.9, 0.8]], 0.6);
    /* the after house on the main deck d 74-90 to 9.5, the stump mast with
       its dish, the platform with the twin 40 mm Mk 5 [WB] */
    house(THREE, g, T.sup, X(90.0), X(74.0), 4.0, 0.6, 6.0, 9.5);
    sideWindows(THREE, g, T, X(88), X(77), 4, 4.0, 8.0, 0.35, 0.35);
    rectRail(THREE, g, T, X(89.8), X(76.0), 3.85, 9.5);
    latticeMast(THREE, g, T, X(86.2), X(84.2), 0.9, 9.5, X(85.6), X(84.8), 0.45, 15.6, 3);
    dish(THREE, g, T.metal, 0.6, X(84.6), 0, 16.0, 0.1);
    platform(THREE, g, T, X(85.5), 0, 12.4, 4.0, 4.0);
    var bo = new THREE.Group(); bo.position.set(X(85.5), 0, 12.45); bo.rotation.z = PI; bofors2(THREE, bo, T); g.add(bo);
    /* the fixed torpedo tubes along the house sides (the dark tube bank of
       [WB], d 76-90): drawn as two tubes a side, NOT CONFIRMED count */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++)
      cylX(THREE, g, 0.3, 0.3, 7.0, 10, T.gun, X(82.5), s * (4.6 + i * 0.7), 7.0);
    /* the whaler in davits to starboard, the motor boat to port [WB] */
    boatDavit(THREE, g, T, X(80.5), -5.8, 10.3, 7.6, 2.0);
    boatDavit(THREE, g, T, X(80.5), 5.8, 10.3, 7.0, 2.0);
    rafts(THREE, g, T, X(97), 3.4, D(X(97)), 4);
    rafts(THREE, g, T, X(97), -3.4, D(X(97)), 4);
    /* the two Limbo Mk 10 in their well on the quarterdeck d 108-111 [WB][article] */
    limbo(THREE, g, T, X(108.6), 1.6, 3.9);
    limbo(THREE, g, T, X(108.6), -1.6, 3.9);
    staff(THREE, g, T, X(111.8), 3.9, 6.0);
    staff(THREE, g, T, X(0.4), 13.0, 3.6);
    h.railRun(THREE, g, T, X(106.6), X(0.8), 2.8, 1.0);
    h.railRun(THREE, g, T, X(112.5), X(107.9), 1.6, 1.0);
    screws(THREE, g, T, X(101), 3.0, -2.9, X(105.0), 12, 1.5, 2.6);
    box(THREE, g, 2.4, 1.8, 0.04, T.team, X(56), 0, 14.03);
    box(THREE, g, 2.2, 1.6, 0.04, T.team, X(79), 0, 9.53);
    box(THREE, g, 1.6, 1.4, 0.04, T.team, X(110.5), 0, 3.93);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(47.0), 0, D(X(47.0))); mk6(THREE, tw, T);
    return finish(THREE, g, tw);
  }

  /* ======================================= the 555.5 ft cruiser hull
     Swiftsure (Minotaur class, 1944) and Tiger (laid down 1941-42 to the
     same design, completed 1959) share the hull: 169.3 m, 19.5 m beam
     (en.wikipedia).  Stations along the hull from [CS] "HMS Swiftsure.jpg"
     (aerial, starboard bow) and [CB] "HMS Blake C99.jpg" (starboard
     broadside, converted), both with the foreshortening taken out along
     the length: the long forecastle to d 113, the quarterdeck a deck lower
     aft (both photographs).  The freeboards (bow 11.5 m, forecastle 9.3 m,
     quarterdeck 7.0 m) are read off [CB] amidships and are NOT CONFIRMED to
     better than about 1 m: no drawing of either class was found.  Keel
     6.0 m under the water (between the published 17.25 ft and 23 ft). */
  var CL_L = 169.3;
  var CL_STA = [
    [0.0,   11.50, 0.15, 0.00,  0.00, 1.2],
    [3.0,   11.30, 1.60, 0.00,  0.00, 1.3],
    [8.0,   11.00, 3.60, 2.00, -4.50, 1.6],
    [16.0,  10.50, 5.60, 4.40, -6.00, 2.0],
    [26.0,  10.00, 7.30, 6.50, -6.00, 2.4],
    [40.0,   9.60, 8.70, 8.10, -6.00, 2.8],
    [60.0,   9.35, 9.75, 9.30, -6.00, 3.0],
    [112.0,  9.30, 9.75, 9.30, -6.00, 3.0],
    [114.0,  7.00, 9.70, 9.25, -6.00, 3.0],
    [140.0,  7.00, 9.10, 8.40, -5.00, 3.0],
    [155.0,  7.05, 8.10, 7.00, -3.00, 3.1],
    [165.0,  7.10, 7.00, 5.60, -0.80, 3.2],
    [169.3,  7.15, 6.30, 5.00,  1.00, 3.2]
  ];
  function clHull(THREE, g, T) {
    var h = makeHull(CL_L, CL_STA, 3.0, 165.0, 1.0), X = h.X, D = h.deckZ, s;
    h.shell(THREE, g, T);
    scuttles(THREE, g, T, h, X(10), X(110), 30, function (x) { return D(x) - 1.6; });
    scuttles(THREE, g, T, h, X(30), X(100), 18, 4.2);
    scuttles(THREE, g, T, h, X(118), X(160), 12, 4.6);
    anchors(THREE, g, T, h, X(6.5), 2.0, 1.6, X(16.0));
    for (s = -1; s <= 1; s += 2) {
      bollard(THREE, g, T, X(12), s * 3.0, D(X(12)));
      bollard(THREE, g, T, X(24), s * 6.8, D(X(24)));
      bollard(THREE, g, T, X(108), s * 9.0, D(X(108)));
      bollard(THREE, g, T, X(150), s * 7.6, D(X(150)));
      bollard(THREE, g, T, X(163), s * 6.0, D(X(163)));
      vent(THREE, g, T, X(20), s * 2.5, D(X(20)), 0.35, 1.0);
      vent(THREE, g, T, X(128), s * 6.5, D(X(128)), 0.35, 1.0);
    }
    hatch(THREE, g, T, X(17), 0, D(X(17)), 2.0, 1.6);
    h.railRun(THREE, g, T, X(112.6), X(1.4), 3.2, 1.0);
    h.railRun(THREE, g, T, X(168.9), X(114.3), 3.2, 1.0);
    staff(THREE, g, T, X(0.6), D(X(0.6)), 4.0);
    screws(THREE, g, T, X(152), 3.4, -4.4, X(158), 20, 1.9, 3.6);
    screws(THREE, g, T, X(138), 6.2, -4.6, X(158), 6, 1.9, 0.01);
    return h;
  }
  /* a stack of deckhouse levels from z0: lv = [[d aft, d fwd, hw, top], ...] */
  function levels(THREE, g, T, X, z0, lv) {
    var z = z0;
    lv.forEach(function (q, k) {
      house(THREE, g, T.sup, X(q[0]), X(q[1]), q[2], Math.min(1.5, q[2] * 0.3), z - 0.05, q[3]);
      if (k === lv.length - 1 || k === 0) sideWindows(THREE, g, T, X(q[0] - 1.5), X(q[1] + 1.5), Math.max(2, Math.round((q[0] - q[1]) / 7)), q[2], z + (q[3] - z) * 0.6, 0.35, 0.35);
      rectRail(THREE, g, T, X(q[0] - 0.2), X(q[1] + 0.2), q[2] - 0.15, q[3]);
      z = q[3];
    });
  }

  /* ============================================ SWIFTSURE (gbr_e50_cruiser)
     [CS] stations, d aft of the stem: A turret 31.6, B 44.4 superfiring,
     the bridge block 50-72.7, the tripod foremast 69.6, the fore funnel
     75.4, the after funnel 99.1, the tripod mainmast 117, the after
     director tower 124, Y turret 143.9 trained aft; the 4 in twins abreast
     the funnels on the shelter deck, the boats between the funnels.
     Heights NOT CONFIRMED (see the hull). */
  function buildSwiftsure(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    var h = clHull(THREE, g, T), X = h.X, D = h.deckZ;
    /* B barbette and the forward superstructure */
    cylZ(THREE, g, 3.6, 3.7, 2.4, 20, T.sup, X(44.4), 0, D(X(44.4)) + 1.2);
    levels(THREE, g, T, X, 9.3, [[110, 48.5, 7.0, 11.8], [74, 50, 5.4, 14.3], [70, 51, 4.4, 16.8], [64, 52, 3.6, 19.3]]);
    bridgeGlass(THREE, g, T, X(52), 3.6, 1.1, 18.0, 18.8, 3);
    director(THREE, g, T, X(56.5), 0, 19.3, 1.6, 2.0, 1.1);
    cheese(THREE, g, T, X(61.5), 0, 19.3, 3.0, 1.2);
    tripod(THREE, g, T, X(69.6), 16.8, 4.0, 2.4, 33.0, 0.28);
    platform(THREE, g, T, X(69.6), 0, 26.0, 3.0, 3.0);
    box(THREE, g, 0.2, 13.0, 0.2, T.metal, X(69.6), 0, 28.0);
    cheese(THREE, g, T, X(69.4), 0, 30.0, 3.4, 1.4);
    pole(THREE, g, T, X(69.6), 0, 33.0, 39.0, 0.12, 4.0, 36.5);
    funnel(THREE, g, T, [[11.7, X(75.4), 3.4, 2.4], [20.0, X(75.8), 3.2, 2.3], [24.5, X(76.0), 3.1, 2.25]], 0.7);
    funnel(THREE, g, T, [[11.7, X(99.1), 3.4, 2.4], [20.0, X(99.5), 3.2, 2.3], [24.0, X(99.7), 3.1, 2.25]], 0.7);
    /* the after superstructure, the mainmast, the after director [CS] */
    levels(THREE, g, T, X, 9.3, [[112, 104, 6.0, 11.8]]);
    levels(THREE, g, T, X, 7.0, [[134, 113.5, 5.6, 9.6], [130, 118, 4.0, 12.1]]);
    tripod(THREE, g, T, X(117), 11.8, 4.0, 2.4, 31.0, 0.26);
    box(THREE, g, 0.2, 10.0, 0.2, T.metal, X(117), 0, 26.0);
    pole(THREE, g, T, X(117), 0, 31.0, 36.0, 0.1, 0, 0);
    cylZ(THREE, g, 1.4, 1.6, 2.6, 12, T.sup, X(124), 0, 13.4);
    director(THREE, g, T, X(124), 0, 14.7, 1.4, 1.7, 0.9);
    /* the 4 in Mk XIX twins on the shelter deck, two a side, and one aft [CS] */
    for (s = -1; s <= 1; s += 2) [84, 92].forEach(function (d) {
      var m4 = new THREE.Group(); m4.position.set(X(d), s * 5.4, 11.8); m4.rotation.z = s * 1.2; twin4open(THREE, m4, T); g.add(m4);
    });
    var m5 = new THREE.Group(); m5.position.set(X(132), 0, 12.1); m5.rotation.z = PI; twin4open(THREE, m5, T); g.add(m5);
    /* boats between the funnels, the cranes [CS] */
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T.white, T.white, X(87), s * 3.0, 12.4, 9.5, 2.6, true);
      strut(THREE, g, T.metal, X(95.5), s * 4.5, 11.8, X(91), s * 6.0, 19.0, 0.18, 6);
      rafts(THREE, g, T, X(108), s * 5.0, 11.8, 4);
    }
    /* B and Y turrets */
    var bt = new THREE.Group(); bt.position.set(X(44.4), 0, D(X(44.4)) + 2.4); triple6(THREE, bt, T); g.add(bt);
    cylZ(THREE, g, 3.6, 3.7, 1.0, 20, T.sup, X(143.9), 0, 7.5);
    var yt = new THREE.Group(); yt.position.set(X(143.9), 0, 8.0); yt.rotation.z = PI; triple6(THREE, yt, T); g.add(yt);
    staff(THREE, g, T, X(168.8), 7.15, 5.0);
    box(THREE, g, 3.0, 2.0, 0.04, T.team, X(58), 0, 19.33);
    box(THREE, g, 3.0, 2.0, 0.04, T.team, X(122), 0, 12.13);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(31.6), 0, D(X(31.6))); triple6(THREE, tw, T);
    return finish(THREE, g, tw);
  }

  /* ============================================== TIGER (gbr_e60_cruiser)
     Drawn as converted (Tiger 1968-72, Blake 1965-69) because the row
     carries four helicopters (js/eras.js helo: 4) and its text describes
     the conversion.  [CB] stations, d aft of the stem: the 6 in Mk 26 twin
     ring 44, the 3 in Mk 6 twin on the bridge front 56, the bridge block
     58-82, the lattice foremast 83-90 (pole to 44 m), the fore funnel
     88-94, the after funnel 98-107, the mack with the Type 965 AKE-1
     124-133, the hangar 133-156, the flight deck 156-169.3; the two Type 903
     directors (domes), the Sea Cat launchers abreast the hangar (the 1972
     fit, [CB] [CT] "HMS Tiger (1945) at Portsmouth Navy Day 1980"). */
  function buildTiger(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s;
    var h = clHull(THREE, g, T), X = h.X, D = h.deckZ;
    cylZ(THREE, g, 4.0, 4.1, 1.6, 20, T.sup, X(44), 0, D(X(44)) + 0.8);
    levels(THREE, g, T, X, 9.3, [[96, 52, 7.0, 12.0], [82, 58, 5.6, 14.7], [80, 60, 4.6, 17.4], [74, 61, 3.8, 20.0]]);
    bridgeGlass(THREE, g, T, X(61), 3.8, 1.1, 18.6, 19.4, 3);
    var b3 = new THREE.Group(); b3.position.set(X(55.5), 0, 12.0); twin3(THREE, b3, T); g.add(b3);
    /* the two Type 903 director domes and the 992Q [CB] */
    radome(THREE, g, T, X(66), 0, 20.0, 21.4, 1.4);
    radome(THREE, g, T, X(118), 0, 14.4, 15.6, 1.3);
    latticeMast(THREE, g, T, X(90), X(83), 2.2, 20.0, X(88), X(85), 0.8, 34.0, 6);
    platform(THREE, g, T, X(86.5), 0, 34.0, 3.0, 2.4);
    box(THREE, g, 0.2, 12.0, 0.2, T.metal, X(86.5), 0, 35.5);
    cheese(THREE, g, T, X(86.0), 0, 36.0, 3.0, 1.2);
    pole(THREE, g, T, X(86.5), 0, 34.0, 44.0, 0.1, 4.0, 40.0);
    funnel(THREE, g, T, [[11.9, X(91), 2.8, 2.2], [26.0, X(91.2), 2.6, 2.0]], 0.75);
    funnel(THREE, g, T, [[11.9, X(102.5), 4.4, 2.6], [24.0, X(102.8), 4.2, 2.5]], 0.75);
    levels(THREE, g, T, X, 9.3, [[112, 96, 6.4, 12.0], [109, 98, 4.8, 14.4]]);
    /* the 3 in twins abreast the after funnel [CB] */
    for (s = -1; s <= 1; s += 2) {
      var m3 = new THREE.Group(); m3.position.set(X(111), s * 5.0, 12.0); m3.rotation.z = s * 1.3; twin3(THREE, m3, T); g.add(m3);
      boatDavit(THREE, g, T, X(100), s * 7.8, 12.6, 9.0, 2.5);
    }
    /* the mack and its Type 965 AKE-1 bedstead [CB] */
    levels(THREE, g, T, X, 7.0, [[133, 113.5, 6.4, 11.9]]);
    zLoft(THREE, g, T.sup, T.soot, [[11.8, X(128.5), 4.6, 2.6], [24.0, X(128.5), 3.0, 1.8], [29.0, X(128.5), 2.0, 1.3], [30.0, X(128.5), 1.6, 1.0]], 0.7, 20);
    zLoft(THREE, g, T.soot, T.soot, [[28.2, X(128.5), 2.05, 1.32], [30.02, X(128.5), 1.62, 1.02]], 0.7, 20);
    bedstead(THREE, g, T, X(128.5), 0, 32.4, 8.6, 3.2, false);
    box(THREE, g, 0.2, 9.0, 0.2, T.metal, X(129), 0, 27.0);
    /* the hangar d 133-156, roof 19.0, its doors aft; the flight deck over
       the old quarterdeck d 156-169, 12.0 [CB] */
    house(THREE, g, T.sup, X(156), X(133), 8.6, 1.2, 6.9, 19.0);
    box(THREE, g, 0.08, 12.0, 6.2, T.dark, X(156) - 0.02, 0, 15.3);
    rectRail(THREE, g, T, X(155.8), X(133.4), 8.4, 19.0);
    for (s = -1; s <= 1; s += 2) seacat(THREE, g, T, X(140), s * 6.6, 19.0);
    director(THREE, g, T, X(136), 0, 19.0, 1.0, 1.2, 0.7);
    polyPrism(THREE, g, T.deck, [[X(168.6), -6.6], [X(156), -8.6], [X(156), 8.6], [X(168.6), 6.6]], 6.9, 12.0);
    polyPrism(THREE, g, T.hull, [[X(168.6), -6.7], [X(156), -8.7], [X(156), -8.4], [X(168.6), -6.4]], 6.9, 12.0);
    polyPrism(THREE, g, T.hull, [[X(168.6), 6.4], [X(156), 8.4], [X(156), 8.7], [X(168.6), 6.7]], 6.9, 12.0);
    box(THREE, g, 0.4, 13.0, 5.0, T.hull, X(168.6), 0, 9.4);
    roofRail(THREE, g, T, [[X(156.2), 8.5], [X(168.6), 6.5], [X(168.6), -6.5], [X(156.2), -8.5]], 12.0, 0.9);
    cylZ(THREE, g, 3.0, 3.0, 0.02, 24, T.white, X(162), 0, 12.01);
    box(THREE, g, 3.0, 1.6, 0.04, T.team, X(68), 0, 20.03);
    box(THREE, g, 3.0, 2.0, 0.04, T.team, X(145), 0, 19.03);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(44), 0, D(X(44)) + 1.6); twin6N5(THREE, tw, T);
    var root = finish(THREE, g, tw);
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(X(162), 0, 12.02); root.add(hp);
    return root;
  }

  /* ============================================ LEANDER (gbr_e60_corvette)
     [LP] "HMS Penelope, 1970 (IWM)" (Commons, from directly overhead, bow
     right): stem 1550, stern 150 (1400 px = 113.4 m, 12.35 px/m), every
     station below as d aft of the stem.  [LA] "HMS Apollo 1976 SMB-2008"
     (starboard bow): heights scaled from the Mk 6 gunhouse (3.05 m, [DD])
     at 27.9 px/m in that photograph, so they hold near the gun and are NOT
     CONFIRMED to better than about 1 m elsewhere; the freeboards (bow 8.0,
     gun 6.3, amidships 5.5, stern 5.2 m) are from the same photograph and
     are NOT CONFIRMED.  Drawn as built (Leander 1963): twin 4.5 in Mk 6,
     MRS 3 director, Type 993 on the foremast, Type 965 AKE-1 on the
     mainmast, the hangar with the Sea Cat launcher, the pad, Limbo, and
     the VDS well at the stern ([LP]; the article lists all of them). */
  var LE_L = 113.4;
  var LE_STA = [
    [0.0,   8.00, 0.10, 0.00,  0.00, 1.2],
    [2.4,   7.90, 1.10, 0.00,  0.00, 1.3],
    [6.0,   7.70, 2.40, 1.00, -2.80, 1.5],
    [12.0,  7.30, 3.80, 2.60, -4.10, 1.8],
    [20.0,  6.85, 5.00, 4.20, -4.30, 2.2],
    [31.0,  6.30, 5.90, 5.30, -4.30, 2.6],
    [45.0,  5.80, 6.25, 5.90, -4.30, 3.0],
    [70.0,  5.50, 6.25, 5.95, -4.30, 3.0],
    [90.0,  5.35, 5.90, 5.40, -3.40, 3.0],
    [104.0, 5.25, 5.20, 4.50, -1.80, 3.1],
    [112.6, 5.20, 4.70, 3.90,  0.00, 3.2],
    [113.4, 5.20, 4.60, 3.80,  0.50, 3.2]
  ];
  function buildLeander(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s;
    var h = makeHull(LE_L, LE_STA, 2.4, 112.6, 0.5), X = h.X, D = h.deckZ;
    h.shell(THREE, g, T);
    scuttles(THREE, g, T, h, X(10), X(30), 6, function (x) { return D(x) - 1.2; });
    scuttles(THREE, g, T, h, X(38), X(76), 10, 3.6);
    anchors(THREE, g, T, h, X(5.2), 1.4, 1.1, X(10.5));
    for (s = -1; s <= 1; s += 2) {
      bollard(THREE, g, T, X(8.5), s * 2.6, D(X(8.5)));
      bollard(THREE, g, T, X(27.0), s * 5.4, D(X(27)));
      bollard(THREE, g, T, X(100.0), s * 4.8, D(X(100)));
      vent(THREE, g, T, X(14), s * 2.0, D(X(14)), 0.25, 0.8);
      var V = [[X(18.0), 0, D(X(18))], [X(24.5), s * 4.6, D(X(24.5))], [X(24.75), s * 4.6, D(X(24.5))], [X(18.25), 0, D(X(18))],
               [X(18.0), 0, D(X(18)) + 1.1], [X(24.5), s * 4.6, D(X(24.5)) + 0.8], [X(24.75), s * 4.6, D(X(24.5)) + 0.8], [X(18.25), 0, D(X(18)) + 1.1]];
      if (s < 0) V = [V[3], V[2], V[1], V[0], V[7], V[6], V[5], V[4]];
      hexa(THREE, g, T.sup, V);
    }
    hatch(THREE, g, T, X(12), 0, D(X(12)), 1.4, 1.2);
    /* the superstructure d 34-77 (hangar included) [LP] */
    var R01 = 8.6;
    house(THREE, g, T.sup, X(66), X(34.5), 5.2, 1.6, 5.4, R01);
    sideWindows(THREE, g, T, X(64), X(46), 6, 5.2, 7.4, 0.35, 0.35);
    rectRail(THREE, g, T, X(65.8), X(46), 5.05, R01);
    house(THREE, g, T.sup, X(45), X(35.5), 4.4, 1.6, R01 - 0.05, 11.3);
    bridgeGlass(THREE, g, T, X(35.5), 4.4, 1.6, 10.3, 11.0, 2.4);
    rectRail(THREE, g, T, X(44.8), X(36), 4.25, 11.3);
    /* MRS 3 director on the bridge roof d 39.7 [LP][LA] */
    director(THREE, g, T, X(39.7), 0, 11.3, 1.1, 1.4, 0.9);
    /* the plated foremast d 42.5-46.5 to 17.4, platform, Type 993, pole [LA] */
    zLoft(THREE, g, T.sup, T.sup, [[11.25, X(44.5), 2.0, 1.6], [17.4, X(44.6), 1.0, 0.8]], 0.6, 16);
    platform(THREE, g, T, X(44.6), 0, 17.4, 2.6, 2.6);
    box(THREE, g, 0.18, 9.0, 0.18, T.metal, X(44.6), 0, 19.0);
    pole(THREE, g, T, X(44.6), 0, 17.4, 29.8, 0.1, 0, 0);
    box(THREE, g, 0.5, 4.2, 0.35, T.metal, X(44.4), 0, 22.0);
    /* the funnel d 52-58 with its black top to 14.5 [LP][LA] */
    funnel(THREE, g, T, [[R01 - 0.05, X(55), 3.0, 1.9], [13.0, X(55.2), 2.8, 1.8], [14.5, X(55.3), 2.6, 1.7]], 0.65);
    /* the mainmast d 61.5-66 and the Type 965 AKE-1 [LP][LA] */
    zLoft(THREE, g, T.sup, T.sup, [[R01 - 0.05, X(63.8), 2.2, 1.8], [17.6, X(63.9), 1.1, 0.9]], 0.6, 16);
    bedstead(THREE, g, T, X(63.9), 0, 19.8, 7.6, 3.0, false);
    /* boats on the 01 deck abreast the funnel [LP] */
    boatDavit(THREE, g, T, X(56), -6.0, 9.4, 8.0, 2.2);
    boatDavit(THREE, g, T, X(56), 6.0, 9.4, 7.0, 2.0);
    rafts(THREE, g, T, X(47), 4.0, R01, 4);
    rafts(THREE, g, T, X(47), -4.0, R01, 4);
    /* the hangar d 66-77, roof 9.2, Sea Cat on its after end [LP] */
    house(THREE, g, T.sup, X(77.6), X(66), 4.4, 0.5, 5.4, 9.2);
    box(THREE, g, 0.06, 6.4, 3.0, T.dark, X(77.6) - 0.03, 0, 7.0);
    seacat(THREE, g, T, X(75.6), 0, 9.2);
    director(THREE, g, T, X(68.5), 0, 9.2, 0.7, 1.0, 0.5);
    /* the pad d 77.7-92 with its circle, Limbo d 92-99, the VDS d 104-113 [LP] */
    cylZ(THREE, g, 2.8, 2.8, 0.02, 24, T.white, X(87.5), 0, D(X(87.5)) + 0.01);
    limbo(THREE, g, T, X(95.5), 0, D(X(95.5)));
    box(THREE, g, 7.0, 3.6, 0.06, T.dark, X(108.5), 0, D(X(108.5)) + 0.02);
    box(THREE, g, 2.0, 0.4, 3.2, T.sup, X(110.5), 1.7, D(X(110.5)) + 1.6);
    box(THREE, g, 2.0, 0.4, 3.2, T.sup, X(110.5), -1.7, D(X(110.5)) + 1.6);
    box(THREE, g, 0.5, 3.8, 0.4, T.sup, X(110.5), 0, D(X(110.5)) + 3.1);
    h.railRun(THREE, g, T, X(113.0), X(0.8), 2.8, 1.0);
    staff(THREE, g, T, X(0.4), D(X(0.4)), 3.0);
    screws(THREE, g, T, X(100), 3.0, -2.9, X(104), 12, 1.5, 2.6);
    box(THREE, g, 2.4, 1.8, 0.04, T.team, X(42), 0, 11.33);
    box(THREE, g, 2.4, 2.0, 0.04, T.team, X(71), 0, 9.23);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(31.0), 0, D(X(31.0))); mk6(THREE, tw, T);
    var root = finish(THREE, g, tw);
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(X(85), 0, D(X(85)) + 0.02); root.add(hp);
    return root;
  }

  /* ============================================= COUNTY (gbr_e60_destroyer)
     [CK] "HMS Kent, Portsmouth Navy Yards, July 1989" (starboard bow,
     Batch 1 as Devonshire): heights scaled from the A gunhouse (3.05 m) at
     19.7 px/m: the freeboard at A 8.4 m, the bridge roof 14.7, the
     foremast tower 19.5 with the Type 992Q at 22.5, the mack and its
     bedstead to 23.  [CN] "NAVO eskader bezoekt Amsterdam, HNS Norfolk"
     (starboard broadside, Batch 2, Exocet in B; used for stations only,
     the foreshortening taken out along the hull): A 23.9, B 38, the bridge
     44-57, the foremast 65, the mack with the Type 965 92, the after
     funnel 103.5, the boats 93-122.  [CG] "HMS Glamorgan (11533801865)"
     (alongside): the AKE-2 double bedstead on its plated mack, the Sea Cat
     launcher, the hangar door, the Type 904 director.  The hangar and pad
     aft, the Type 901 and the Sea Slug launcher at the stern are from the
     article text and [CN]'s after hull; their sizes are NOT CONFIRMED.
     Freeboards away from A (bow 10.0, stern 6.6 m) NOT CONFIRMED. */
  var CO_L = 158.5;
  var CO_STA = [
    [0.0,  10.00, 0.12, 0.00,  0.00, 1.2],
    [3.0,   9.85, 1.50, 0.00,  0.00, 1.3],
    [8.0,   9.55, 3.30, 1.80, -4.20, 1.6],
    [16.0,  9.00, 5.30, 4.20, -5.20, 2.0],
    [24.0,  8.40, 6.60, 5.80, -5.30, 2.4],
    [40.0,  7.90, 7.90, 7.30, -5.30, 2.8],
    [60.0,  7.60, 8.25, 7.85, -5.30, 3.0],
    [110.0, 7.10, 8.25, 7.85, -5.30, 3.0],
    [135.0, 6.80, 7.70, 7.00, -4.20, 3.0],
    [150.0, 6.65, 6.80, 5.80, -2.20, 3.1],
    [157.6, 6.60, 6.10, 5.00,  0.00, 3.2],
    [158.5, 6.60, 6.00, 4.90,  0.60, 3.2]
  ];
  function buildCounty(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    var h = makeHull(CO_L, CO_STA, 3.0, 157.6, 0.6), X = h.X, D = h.deckZ;
    h.shell(THREE, g, T);
    scuttles(THREE, g, T, h, X(10), X(40), 9, function (x) { return D(x) - 1.3; });
    scuttles(THREE, g, T, h, X(45), X(120), 16, 4.4);
    anchors(THREE, g, T, h, X(6.0), 1.6, 1.4, X(13));
    for (s = -1; s <= 1; s += 2) {
      bollard(THREE, g, T, X(9.5), s * 2.8, D(X(9.5)));
      bollard(THREE, g, T, X(30), s * 7.0, D(X(30)));
      bollard(THREE, g, T, X(125), s * 7.6, D(X(125)));
      bollard(THREE, g, T, X(150), s * 5.8, D(X(150)));
      vent(THREE, g, T, X(16), s * 2.2, D(X(16)), 0.3, 0.9);
    }
    hatch(THREE, g, T, X(14), 0, D(X(14)), 1.6, 1.4);
    /* B deckhouse and the forward superstructure d 33-104 [CN][CK] */
    var R01 = 10.9;
    house(THREE, g, T.sup, X(42), X(33), 4.6, 1.4, 7.7, R01);
    house(THREE, g, T.sup, X(104), X(42), 6.6, 1.0, 7.0, R01);
    sideWindows(THREE, g, T, X(102), X(58), 10, 6.6, 9.4, 0.35, 0.35);
    rectRail(THREE, g, T, X(103.8), X(58), 6.45, R01);
    house(THREE, g, T.sup, X(57), X(44), 5.4, 1.6, R01 - 0.05, 12.8);
    house(THREE, g, T.sup, X(55), X(45), 4.6, 1.6, 12.75, 14.7);
    bridgeGlass(THREE, g, T, X(45), 4.6, 1.6, 13.7, 14.4, 2.6);
    rectRail(THREE, g, T, X(54.8), X(45.5), 4.45, 14.7);
    director(THREE, g, T, X(50.5), 0, 14.7, 1.1, 1.4, 0.9);
    /* Sea Cat launchers abreast the bridge, the 20 mm [CG] */
    for (s = -1; s <= 1; s += 2) seacat(THREE, g, T, X(60), s * 5.6, R01);
    /* the plated foremast d 62-68 to 19.5, the lattice top, the 992Q [CK][CN] */
    zLoft(THREE, g, T.sup, T.sup, [[R01 - 0.05, X(65), 3.0, 2.2], [19.5, X(65.2), 1.4, 1.1]], 0.6, 16);
    latticeMast(THREE, g, T, X(66.0), X(64.4), 0.9, 19.5, X(65.6), X(64.8), 0.5, 22.0, 3);
    cheese(THREE, g, T, X(65.0), 0, 22.0, 3.0, 1.2);
    box(THREE, g, 0.18, 9.0, 0.18, T.metal, X(65.2), 0, 21.0);
    pole(THREE, g, T, X(65.4), 0, 22.0, 30.0, 0.09, 3.0, 26.0);
    /* the fore funnel abaft it and the mack with the AKE-2 [CN][CG] */
    funnel(THREE, g, T, [[R01 - 0.05, X(76), 2.8, 2.0], [17.5, X(76.2), 2.4, 1.8]], 0.7);
    zLoft(THREE, g, T.sup, T.soot, [[R01 - 0.05, X(92), 4.6, 2.8], [19.0, X(92), 2.6, 1.6], [21.5, X(92), 1.6, 1.0]], 0.65, 20);
    zLoft(THREE, g, T.soot, T.soot, [[20.6, X(92), 1.98, 1.24], [21.52, X(92), 1.62, 1.02]], 0.65, 20);
    bedstead(THREE, g, T, X(92.4), 0, 24.4, 8.6, 3.4, true);
    box(THREE, g, 0.18, 10.0, 0.18, T.metal, X(91.5), 0, 20.5);
    /* the after funnel d 101-106 [CN] */
    funnel(THREE, g, T, [[R01 - 0.05, X(103.5), 2.6, 1.9], [16.4, X(103.7), 2.4, 1.8]], 0.7);
    /* the boats in davits abreast the mack [CN] */
    for (s = -1; s <= 1; s += 2) {
      boatDavit(THREE, g, T, X(96), s * 7.7, 11.6, 8.4, 2.3);
      boatDavit(THREE, g, T, X(110), s * 7.7, 9.6, 7.0, 2.0);
      rafts(THREE, g, T, X(84), s * 5.4, R01, 4);
    }
    /* the hangar d 104-118 and the pad d 118-133 [article][CG] */
    house(THREE, g, T.sup, X(118), X(104), 5.0, 0.6, 6.9, 12.2);
    box(THREE, g, 0.06, 7.0, 4.0, T.dark, X(118) - 0.03, 0, 9.0);
    cylZ(THREE, g, 3.0, 3.0, 0.02, 24, T.white, X(126), 0, D(X(126)) + 0.01);
    /* the Type 901 director on the after house and the Sea Slug launcher at
       the stern with two missiles on the arms [article][CN] */
    house(THREE, g, T.sup, X(146), X(134), 4.6, 0.8, 6.7, 10.0);
    cylZ(THREE, g, 1.4, 1.6, 2.0, 12, T.sup, X(138), 0, 11.0);
    dish(THREE, g, T.white, 2.2, X(137.0), 0, 13.6, 0.0);
    cylZ(THREE, g, 2.0, 2.2, 1.2, 16, T.sup, X(151), 0, D(X(151)) + 0.6);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 5.0, 0.5, 0.5, T.sup, X(151.4), s * 0.9, D(X(151)) + 2.2);
      cylX(THREE, g, 0.21, 0.21, 6.0, 10, T.white, X(150.8), s * 0.9, D(X(151)) + 2.75);
      for (i = 0; i < 4; i++) cylX(THREE, g, 0.3, 0.3, 2.4, 10, T.white, X(153.0), s * 0.9 + (i % 2 ? 0.36 : -0.36), D(X(151)) + 2.75 + (i < 2 ? 0.36 : -0.36));
    }
    h.railRun(THREE, g, T, X(158.0), X(1.0), 3.0, 1.0);
    staff(THREE, g, T, X(0.5), D(X(0.5)), 3.2);
    screws(THREE, g, T, X(142), 3.6, -3.8, X(147), 16, 1.8, 3.2);
    box(THREE, g, 2.6, 2.0, 0.04, T.team, X(50), 0, 14.73);
    box(THREE, g, 2.6, 2.2, 0.04, T.team, X(111), 0, 12.23);
    /* B gun on its deckhouse [CK] */
    var bg = new THREE.Group(); bg.position.set(X(38), 0, R01); mk6(THREE, bg, T); g.add(bg);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(23.9), 0, D(X(23.9))); mk6(THREE, tw, T);
    var root = finish(THREE, g, tw);
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(X(126), 0, D(X(126)) + 0.02); root.add(hp);
    return root;
  }

  /* ================================================== AUDACIOUS CLASS
     One builder, two variants (HMS Eagle and HMS Ark Royal were sisters):
       "eagle51"  gbr_e50_carrier, Eagle as completed in 1951: the axial
                  deck, two bow catapults, two centreline lifts, eight twin
                  4.5 in in sponsons, the island with its lattice mast
                  ([AE1] "HMS Eagle (R05) after her commissioning 1951",
                  from astern and above; [AE2] "HMS Eagle (R05) flight deck at
                  Gibraltar c1953").
       "ark70"    gbr_e60_carrier, Ark Royal after the 1967-70 refit: the
                  full angled deck measured off [AT] "Ark Royal R09 from top
                  lauch Buc NAN1-71" (from overhead, bow left; 245 m over
                  1340 px, the photograph turned 3.5 deg to the ship's
                  axis): the bow deck +-13.7 m at d 10, the port sponson
                  +23.6 at d 60 and +26 abreast the island, +17.6 at d 218,
                  the stern +-16.5, the landing-area centreline 8.9 deg to
                  port (the published 8.5 deg), the island d 90-163 outboard
                  to -26; the guns gone, two Type 965 (the AKE-2 on the
                  forward lattice mast, an AKE-1 on the after one; [AR]
                  "17 HMS Ark Royal North Atlantic July 76", starboard side).
     Published: 804 ft (245 m), hull beam 112.8 ft (34.4 m), 171 ft (52 m)
     over the angled deck, draught 33 ft (10 m).  The flight deck height,
     17.5 m over the water, is scaled from the Phantom FG.1 parked forward
     in [AR] (its published 5.0 m height over 47 px gives 18.6 m at the
     bow) and is NOT CONFIRMED amidships.  The island's heights are scaled
     the same way and are NOT CONFIRMED; Eagle's 1951 island and gun
     positions are the Ark Royal stations read across, NOT CONFIRMED. */
  var AU_L = 245.0, AU_FD = 17.5;
  var AU_STA = [
    [0.0,   16.9, 0.20, 0.00,  0.00, 1.2],
    [4.0,   16.8, 2.80, 0.00,  0.00, 1.3],
    [12.0,  16.6, 7.50, 3.80, -7.50, 1.6],
    [28.0,  16.4, 12.6, 10.0, -10.0, 2.0],
    [50.0,  16.3, 16.0, 14.8, -10.0, 2.6],
    [80.0,  16.3, 17.4, 17.0, -10.0, 3.0],
    [170.0, 16.3, 17.4, 17.0, -10.0, 3.0],
    [205.0, 16.4, 16.4, 15.4, -9.00, 3.0],
    [228.0, 16.5, 14.4, 12.6, -5.50, 3.1],
    [240.0, 16.6, 12.8, 10.6, -1.00, 3.2],
    [245.0, 16.6, 12.0, 10.0,  1.50, 3.2]
  ];
  function buildAudacious(THREE, M, C, V) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    var ark = V === "ark70";
    var h = makeHull(AU_L, AU_STA, 4.0, 240.0, 1.5), X = h.X;
    h.shell(THREE, g, T);
    scuttles(THREE, g, T, h, X(20), X(225), 44, 9.5);
    scuttles(THREE, g, T, h, X(30), X(215), 30, 5.2);
    anchors(THREE, g, T, h, X(9), 3.0, 2.2, X(20));
    /* the flight deck slab: its plan per variant */
    var P = ark ?
      [[1, 0], [10, 13.7], [37, 13.6], [60, 23.6], [90, 26.0], [170, 26.0], [218, 17.6], [244.5, 16.0], [244.5, -16.6], [205, -17.2], [163, -17.4], [90, -17.4], [10, -13.7]] :
      [[2, 0], [12, 13.5], [30, 16.8], [235, 16.8], [244.5, 15.0], [244.5, -15.0], [235, -16.8], [163, -17.4], [90, -17.4], [30, -16.8], [12, -13.5]];
    var pts = P.map(function (q) { return [X(q[0]), q[1]]; });
    var fd0 = AU_FD - 0.8;
    polyPrism(THREE, g, T.deck, pts, fd0, AU_FD);
    /* the gallery walls round the overhangs and sponsons, a deck under the
       flight deck (the port sponson of the angled deck on its brackets) */
    for (i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length], ln = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (ln < 0.5) continue;
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
      var w = new THREE.Mesh(new THREE.BoxGeometry(ln, 0.25, 1.6), T.hull);
      w.position.set(mx, my, fd0 - 0.7); w.rotation.z = ang; g.add(w);
    }
    /* deck markings, painted flush (1 cm): the edge lines and the landing
       centreline; lifts and catapult tracks as dark flush panels */
    var mk = function (x, y, lx, ly, rz, m) { box(THREE, g, lx, ly, 0.02, m || T.white, x, y, AU_FD + 0.005, rz); };
    if (ark) {
      var an = 8.9 * PI / 180, x0 = X(75.7), y0 = 17.5;
      for (i = 0; i < 22; i++) {
        var t = i * 6.4;
        mk(x0 - t * Math.cos(an), y0 - t * Math.sin(an), 3.2, 0.5, an);
      }
      mk(X(140), 25.5 - 0.0, 150, 0.35, 0);
      mk(X(140), 25.5 - 0.0, 150, 0.35, 0, T.white);
      box(THREE, g, 62, 1.0, 0.02, T.dark, X(38), -3.0, AU_FD + 0.005);         /* bow catapult */
      box(THREE, g, 58, 1.0, 0.02, T.dark, X(95), 14.5, AU_FD + 0.005, an);    /* waist catapult */
      box(THREE, g, 16, 14, 0.02, T.dark, X(78), -6.0, AU_FD + 0.004);          /* forward lift */
      box(THREE, g, 14, 10, 0.02, T.dark, X(176), -11.0, AU_FD + 0.004);        /* after lift */
    } else {
      for (i = 0; i < 30; i++) mk(X(40 + i * 6.6), 0, 3.2, 0.5, 0);
      for (s = -1; s <= 1; s += 2) mk(X(140), s * 15.8, 190, 0.35, 0);
      box(THREE, g, 50, 1.0, 0.02, T.dark, X(32), 5.0, AU_FD + 0.005);
      box(THREE, g, 50, 1.0, 0.02, T.dark, X(32), -5.0, AU_FD + 0.005);
      box(THREE, g, 16, 14, 0.02, T.dark, X(68), 0, AU_FD + 0.004);
      box(THREE, g, 16, 14, 0.02, T.dark, X(176), 0, AU_FD + 0.004);
    }
    /* the island d 95-158 on its sponson outboard to starboard [AT][AR][AE1] */
    /* the island sponson outboard of the starboard deck edge [AT] */
    polyPrism(THREE, g, T.deck, [[X(162), -17.0], [X(162), -26.2], [X(92), -26.2], [X(92), -17.0]], fd0, AU_FD);
    polyPrism(THREE, g, T.hull, [[X(158), -17.0], [X(158), -25.8], [X(96), -25.8], [X(96), -17.0]], 9.0, fd0);
    var yI = -21.8, gI = new THREE.Group(); gI.position.y = yI; g.add(gI);
    house(THREE, gI, T.sup, X(158), X(95), 3.8, 1.5, AU_FD - 0.1, AU_FD + 7.0);
    house(THREE, gI, T.sup, X(150), X(104), 3.4, 1.5, AU_FD + 6.9, AU_FD + 11.0);
    house(THREE, gI, T.sup, X(128), X(106), 3.0, 1.6, AU_FD + 10.9, AU_FD + 14.0);
    for (s = 0; s < 3; s++) box(THREE, gI, 0.08, 5.0, 1.0, T.glass, X(95 + s * 4.5) + 0.05, 0, AU_FD + 1.8 + s * 4.2);
    box(THREE, gI, 0.08, 4.4, 1.1, T.glass, X(106) + 0.05, 0, AU_FD + 13.0);
    for (i = 0; i < 6; i++) for (s = -1; s <= 1; s += 2) box(THREE, gI, 0.6, 0.06, 0.6, T.dark, X(110 + i * 7), s * 3.82, AU_FD + 4.5);
    funnel(THREE, gI, T, [[AU_FD + 10.9, X(120), 6.0, 3.0], [AU_FD + 16.0, X(121), 5.4, 2.8], [AU_FD + 17.5, X(121.5), 5.0, 2.6]], 0.7);
    rectRail(THREE, gI, T, X(127.6), X(106.6), 2.8, AU_FD + 14.0);
    rectRail(THREE, gI, T, X(157.6), X(129), 3.6, AU_FD + 7.0);
    ladder(THREE, gI, T, X(150), 3.0, AU_FD, AU_FD + 7.0, 2.0);
    if (ark) {
      /* forward lattice mast with the AKE-2, the main pole mast, the after
         lattice mast with the AKE-1 [AR] */
      latticeMast(THREE, gI, T, X(117), X(112), 1.6, AU_FD + 14.0, X(115.6), X(113.4), 0.7, AU_FD + 24.0, 5);
      bedstead(THREE, gI, T, X(114.4), 0, AU_FD + 27.0, 9.0, 3.6, true);
      pole(THREE, gI, T, X(125), 0, AU_FD + 14.0, AU_FD + 36.0, 0.22, 7.0, AU_FD + 30.0);
      cheese(THREE, gI, T, X(124.6), 0, AU_FD + 22.0, 3.0, 1.2);
      latticeMast(THREE, gI, T, X(152), X(147), 1.6, AU_FD + 11.0, X(150.6), X(148.4), 0.7, AU_FD + 22.0, 5);
      bedstead(THREE, gI, T, X(149.5), 0, AU_FD + 24.2, 7.6, 3.0, false);
      director(THREE, gI, T, X(140), 0, AU_FD + 11.0, 1.2, 1.4, 1.0);
      /* the bow and waist bridle catchers [AT] */
      box(THREE, g, 4.0, 1.6, 0.6, T.sup, X(3.5), 0, AU_FD - 0.4);
      box(THREE, g, 5.0, 1.6, 0.6, T.sup, X(62), 23.8, AU_FD - 0.4);
    } else {
      /* Eagle 1951: the lattice mast on the island with the Type 960 on a
         yard and the Type 982 / 983 on the island [AE1][AE2] */
      latticeMast(THREE, gI, T, X(124), X(116), 1.9, AU_FD + 14.0, X(122.4), X(117.6), 0.8, AU_FD + 28.0, 6);
      bedstead(THREE, gI, T, X(120), 0, AU_FD + 31.0, 8.0, 3.2, false);
      pole(THREE, gI, T, X(120), 0, AU_FD + 28.0, AU_FD + 36.0, 0.14, 5.0, AU_FD + 33.5);
      cheese(THREE, gI, T, X(108), 0, AU_FD + 14.0, 6.0, 1.6);
      cheese(THREE, gI, T, X(145), 0, AU_FD + 11.0, 4.0, 2.0);
      director(THREE, gI, T, X(133), 0, AU_FD + 11.0, 1.2, 1.4, 1.0);
      /* the eight twin 4.5 in in sponsons under the deck edge, four a side
         [AE1] (positions NOT CONFIRMED) */
      for (s = -1; s <= 1; s += 2) [26, 40, 205, 219].forEach(function (d) {
        var yy = s * (h.halfB(X(d)) + 2.2);
        var sp = [[X(d) - 4.5, yy - s * 3.5], [X(d) + 4.5, yy - s * 3.5], [X(d) + 4.5, yy + s * 3.0], [X(d) - 4.5, yy + s * 3.0]];
        polyPrism(THREE, g, T.hull, s > 0 ? sp : sp.reverse(), 11.0, 12.0);
        var gm = new THREE.Group(); gm.position.set(X(d), yy, 12.0); gm.rotation.z = s * (d < 100 ? 0.9 : 2.2); mk6(THREE, gm, T); g.add(gm);
      });
    }
    /* deck-edge fittings: cranes on the starboard side (AE1), the
       walkway rails along both sides under the deck edge, boats */
    for (s = -1; s <= 1; s += 2) {
      roofRail(THREE, g, T, [[X(30), s * 16.0], [X(230), s * 16.0]], fd0 - 1.6, 0.9);
      for (i = 0; i < 3; i++) boatDavit(THREE, g, T, X(60 + i * 11), s * 17.9, 12.0, 8.0, 2.3);
    }
    strut(THREE, g, T.metal, X(165), -17.4, AU_FD, X(160), -20.5, AU_FD + 12.0, 0.25, 6);
    strut(THREE, g, T.metal, X(160), -20.5, AU_FD + 12.0, X(152), -24, AU_FD + 11.0, 0.15, 6);
    staff(THREE, g, T, X(244.5), AU_FD, 4.0);
    screws(THREE, g, T, X(222), 5.2, -7.0, X(229), 24, 2.4, 5.2);
    screws(THREE, g, T, X(208), 10.6, -7.4, X(229), 8, 2.4, 0.01);
    box(THREE, g, 4.0, 2.4, 0.04, T.team, X(116), yI, AU_FD + 14.03);
    box(THREE, g, 4.0, 2.6, 0.04, T.team, X(150), yI, AU_FD + 11.03);
    return finish(THREE, g, null);
  }

  /* =============================================== BRAVE (gbr_e60_patrol)
     [BB1] Bundesarchiv B 145 Bild-F010729-0071 (Commons): HMS Brave
     Borderer (P1011) at Oberwinter, port side, the forward two-thirds,
     broadside; scaled 59.3 px/m from [BB2] Bild-F010729-0037 (the whole boat
     from the port quarter, P1011 on both) and the published 98 ft 10 in
     (30.1 m): d = (1555 - px) / 59.3 in [BB1].  Measured there: the raked
     stem (2.2 m overhang), the hard chine rising from the waterline
     amidships to 1.9 m at d 2, the deck 3.3 m over the water, the 40 mm
     Bofors at d 15.4 behind its ready-use lockers (d 13.4-17.8), the
     bridge d 19-23 to 7.6 m, the rounded white-roofed cabin d 21-26 to
     6.9 m, the lattice mast with its yagi at d 25 and the pole mast.  The
     21 in torpedoes in their side-launching troughs ([BB3] Bild-
     F010729-0057 shows one in its trough at the deck edge): drawn two a
     side d 16-24, placement NOT CONFIRMED.  Beam 7.8 m (25 ft 6 in) and
     draught 2.1 m published; the hull sections between chine and keel NOT
     CONFIRMED. */
  var BR_L = 30.1;
  var BR_STA = [
    [0.0,   3.70, 0.10, 0.00,  0.00, 1.0],
    [2.2,   3.62, 1.40, 0.00,  0.00, 1.0],
    [5.0,   3.52, 2.80, 1.40, -0.70, 1.0],
    [9.0,   3.44, 3.55, 2.70, -1.10, 1.05],
    [14.0,  3.36, 3.90, 3.40, -1.30, 1.1],
    [22.0,  3.30, 3.90, 3.55, -1.20, 1.2],
    [29.6,  3.30, 3.85, 3.55, -0.60, 1.3],
    [30.1,  3.30, 3.80, 3.50, -0.30, 1.3]
  ];
  function buildBrave(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    var h = makeHull(BR_L, BR_STA, 2.2, 30.0, -0.3), X = h.X, D = h.deckZ;
    h.shell(THREE, g, T);
    /* the hard chine as a rubbing strip, rising forward [BB1] */
    for (s = -1; s <= 1; s += 2) {
      var cx = [], cr = [];
      for (i = 0; i <= 12; i++) {
        var d = 2 + 27.5 * i / 12, x = X(d), zc = d < 16 ? 1.9 * (1 - (d - 2) / 14) + 0.15 : 0.15;
        cx.push(x); cr.push(superRing(0.06, 0.06, zc, 1, 6).map(function (p) { return [p[0] + s * (h.W(x, zc) + 0.02), p[1]]; }));
      }
      ringLoft(THREE, g, T.metal, cx, cr, true);
      bollard(THREE, g, T, X(3.5), s * 1.2, D(X(3.5)));
      bollard(THREE, g, T, X(28.5), s * 2.8, D(X(28.5)));
    }
    anchors(THREE, g, T, h, X(2.6), 0.7, 0.5, X(5.0));
    /* ready-use lockers round the gun [BB1] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.0, 1.0, 1.3, T.sup, X(14.2), s * 2.4, 3.3 + 0.65);
      box(THREE, g, 1.6, 0.9, 1.0, T.sup, X(17.0), s * 2.6, 3.3 + 0.5);
    }
    /* the bridge d 19-23, top 7.6, and the cabin d 21-26, its roof white [BB1][BB2] */
    house(THREE, g, T.sup, X(23.0), X(19.0), 2.4, 0.8, 3.25, 7.6);
    bridgeGlass(THREE, g, T, X(19.0), 2.4, 0.8, 6.6, 7.2, 1.2);
    rectRail(THREE, g, T, X(22.8), X(19.2), 2.25, 7.6);
    var cxs = [], crs = [];
    for (i = 0; i <= 8; i++) {
      var dd = 21 + 5.2 * i / 8, ww = 3.0 - 0.5 * Math.pow(Math.abs(i - 4) / 4, 3);
      cxs.push(X(dd)); crs.push(superRing(ww, 1.8, 5.1, 0.45, 16).map(function (p) { return [p[0], Math.max(3.25, p[1])]; }));
    }
    ringLoft(THREE, g, T.white, cxs, crs, true);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) cylY(THREE, g, 0.22, 0.05, 10, T.dark, X(21.8 + i * 1.6), s * 2.98, 5.0);
    /* the lattice mast with its yagi and the pole mast [BB1][BB2] */
    latticeMast(THREE, g, T, X(25.6), X(24.4), 0.5, 6.9, X(25.2), X(24.8), 0.2, 13.0, 4);
    box(THREE, g, 0.06, 2.4, 0.06, T.metal, X(25), 0, 12.0);
    for (i = 0; i < 5; i++) box(THREE, g, 0.04, 0.04, 0.6, T.metal, X(25), -1.0 + i * 0.5, 12.3);
    pole(THREE, g, T, X(20.6), 0, 7.6, 14.0, 0.07, 2.2, 12.5);
    whip(THREE, g, T, X(22.4), 1.6, 7.6, 6.0, 0);
    whip(THREE, g, T, X(22.4), -1.6, 7.6, 6.0, 0);
    /* the torpedoes in their deck-edge troughs [BB3] */
    for (s = -1; s <= 1; s += 2) [19.0, 22.5].forEach(function (d) {
      box(THREE, g, 7.4, 0.7, 0.25, T.metal, X(d + 1.5), s * 3.35, 3.42);
      cylX(THREE, g, 0.27, 0.27, 6.6, 12, T.gun, X(d + 1.5), s * 3.35, 3.78);
      sphere(THREE, g, 0.27, T.gun, X(d + 1.5) + 3.3, s * 3.35, 3.78);
    });
    rafts(THREE, g, T, X(28.8), 1.2, 3.3, 2);
    h.railRun(THREE, g, T, X(29.9), X(1.2), 1.6, 0.9);
    staff(THREE, g, T, X(29.9), 3.3, 2.6);
    screws(THREE, g, T, X(27.6), 1.6, -1.2, X(28.8), 7.0, 0.55, 1.2);
    box(THREE, g, 1.4, 1.2, 0.03, T.team, X(21), 0, 7.62);
    /* the 40 mm Bofors: the row's turret [BB1] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(15.4), 0, 3.3); bofors1(THREE, tw, T);
    return finish(THREE, g, tw);
  }

  /* ================================================== FORD (gbr_e50_patrol)
     [FG] "GMS043-33-N.jpg" (Commons: HMS Droxford, P3113, at Carrick
     Castle, starboard bow, the stern hidden by the pier) and [FD]
     "Droxford 1975 @ Gt Harbour Greenock.jpg" (starboard quarter):
     stations d aft of the stem from [FD] with its foreshortening taken out
     along the hull (the stern is the near end): the raised forecastle to
     d 17, the cylindrical fitting at d 9.6 (NOT identified: drawn as a plain
     capped cylinder), the wheelhouse d 10.5-15 with its round-fronted
     windows [FG], the lattice mast d 14 with the radar on its head, the
     deckhouse with the round ports d 15-24, the covered gear on the
     quarterdeck (the depth-charge rails of the published fit).  Published
     117 ft 2 in (35.7 m), beam 20 ft (6.1 m), draught 6 ft 6 in (2.0 m).
     Heights (forecastle 2.8 m, quarterdeck 2.0 m, house roof 4.3 m, the
     mast to 12.5 m) are proportions off [FD] and are NOT CONFIRMED.  Both
     photographs are of the 1970s (the RNXS), with no gun: the 40 mm the
     class carried forward as built is NOT drawn (no reference shows it);
     the row's "turret" node is left empty at its place on the forecastle. */
  var FO_L = 35.7;
  var FO_STA = [
    [0.0,   3.40, 0.10, 0.00,  0.00, 1.2],
    [1.6,   3.30, 0.90, 0.00,  0.00, 1.3],
    [5.0,   3.10, 2.20, 1.30, -1.20, 1.6],
    [10.0,  2.90, 2.90, 2.50, -1.80, 2.0],
    [16.8,  2.80, 3.05, 2.80, -1.90, 2.4],
    [17.3,  2.00, 3.05, 2.80, -1.90, 2.4],
    [28.0,  2.00, 2.95, 2.70, -1.60, 2.6],
    [35.2,  2.00, 2.70, 2.30, -0.20, 2.8],
    [35.7,  2.00, 2.65, 2.25,  0.30, 2.8]
  ];
  function buildFord(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i;
    var h = makeHull(FO_L, FO_STA, 1.6, 35.2, 0.3), X = h.X, D = h.deckZ;
    h.shell(THREE, g, T);
    scuttles(THREE, g, T, h, X(3), X(15), 5, 1.9);
    scuttles(THREE, g, T, h, X(19), X(30), 4, 1.2);
    anchors(THREE, g, T, h, X(2.2), 0.8, 0.6, X(4.5));
    for (s = -1; s <= 1; s += 2) {
      bollard(THREE, g, T, X(3.6), s * 1.2, D(X(3.6)));
      bollard(THREE, g, T, X(33.5), s * 2.1, D(X(33.5)));
    }
    /* the deckhouse d 15-24 to 4.3 with its round ports, the wheelhouse
       d 10.5-15 to 5.0 [FD][FG] */
    house(THREE, g, T.sup, X(24), X(15), 2.3, 0.3, 1.95, 4.3);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) cylY(THREE, g, 0.3, 0.06, 12, T.dark, X(17 + i * 2.6), s * 2.32, 3.4);
    rectRail(THREE, g, T, X(23.8), X(16), 2.15, 4.3);
    house(THREE, g, T.sup, X(15.2), X(10.5), 2.2, 1.0, 2.75, 5.0);
    bridgeGlass(THREE, g, T, X(10.5), 2.2, 1.0, 4.1, 4.7, 1.6);
    rectRail(THREE, g, T, X(15.0), X(10.8), 2.05, 5.0);
    /* the unidentified capped cylinder d 9.6 [FD] */
    cylZ(THREE, g, 0.55, 0.55, 2.6, 14, T.sup, X(9.6), 0, D(X(9.6)) + 1.3);
    cylZ(THREE, g, 0.6, 0.6, 0.2, 14, T.sup, X(9.6), 0, D(X(9.6)) + 2.7);
    /* the lattice mast d 14, the radar on its head, yards [FD][FG] */
    latticeMast(THREE, g, T, X(14.6), X(13.6), 0.55, 5.0, X(14.3), X(13.9), 0.25, 10.5, 4);
    box(THREE, g, 0.08, 2.6, 0.08, T.metal, X(14.1), 0, 9.6);
    box(THREE, g, 0.4, 1.6, 0.25, T.metal, X(14.1), 0, 10.8);
    pole(THREE, g, T, X(14.1), 0, 10.5, 12.5, 0.05, 0, 0);
    whip(THREE, g, T, X(22), 1.6, 4.3, 7.0, 0);
    /* the covered gear on the quarterdeck: the depth-charge rails [FD][published] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 6.0, 0.5, 0.6, T.metal, X(32), s * 1.3, 2.3);
      for (i = 0; i < 5; i++) cylY(THREE, g, 0.28, 0.6, 10, T.gun, X(29.8 + i * 1.1), s * 1.3, 2.9);
      box(THREE, g, 2.0, 1.2, 0.9, T.white, X(26.5), s * 1.6, 2.45);
    }
    rafts(THREE, g, T, X(21), 0, 4.3, 2);
    h.railRun(THREE, g, T, X(35.5), X(17.6), 1.8, 0.9);
    h.railRun(THREE, g, T, X(16.7), X(0.8), 1.8, 0.9);
    staff(THREE, g, T, X(35.5), 2.0, 3.2);
    screws(THREE, g, T, X(32.5), 1.0, -1.3, X(33.8), 6.0, 0.55, 1.1);
    box(THREE, g, 1.6, 1.4, 0.03, T.team, X(19.5), 0, 4.32);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(5.5), 0, D(X(5.5)));
    return finish(THREE, g, tw);
  }

  return { porpoise: buildPorpoise, resolution: buildResolution, daring: buildDaring, whitby: buildWhitby, valiant: buildValiant, swiftsure: buildSwiftsure, tiger: buildTiger, leander: buildLeander, county: buildCounty,
           audacious: buildAudacious, brave: buildBrave, ford: buildFord };
})();
UNIT_MODELS["gbr_e50_sub"] = { len: 89.81, build: function (THREE, M, C) { return HeroGbNavyEarly.porpoise(THREE, M, C); } };
UNIT_MODELS["gbr_e60_ssbn"] = { len: 128.89, build: function (THREE, M, C) { return HeroGbNavyEarly.resolution(THREE, M, C); } };
UNIT_MODELS["gbr_e50_destroyer"] = { len: 118.9, build: function (THREE, M, C) { return HeroGbNavyEarly.daring(THREE, M, C); } };
UNIT_MODELS["gbr_e50_corvette"] = { len: 112.8, build: function (THREE, M, C) { return HeroGbNavyEarly.whitby(THREE, M, C); } };
UNIT_MODELS["gbr_e60_sub"] = { len: 86.28, build: function (THREE, M, C) { return HeroGbNavyEarly.valiant(THREE, M, C); } };
UNIT_MODELS["gbr_e50_cruiser"] = { len: 169.3, build: function (THREE, M, C) { return HeroGbNavyEarly.swiftsure(THREE, M, C); } };
UNIT_MODELS["gbr_e60_cruiser"] = { len: 169.3, build: function (THREE, M, C) { return HeroGbNavyEarly.tiger(THREE, M, C); } };
UNIT_MODELS["gbr_e60_corvette"] = { len: 113.4, build: function (THREE, M, C) { return HeroGbNavyEarly.leander(THREE, M, C); } };
UNIT_MODELS["gbr_e60_destroyer"] = { len: 158.5, build: function (THREE, M, C) { return HeroGbNavyEarly.county(THREE, M, C); } };
UNIT_MODELS["gbr_e50_carrier"] = { len: 245.0, build: function (THREE, M, C) { return HeroGbNavyEarly.audacious(THREE, M, C, "eagle51"); } };
UNIT_MODELS["gbr_e60_carrier"] = { len: 245.0, build: function (THREE, M, C) { return HeroGbNavyEarly.audacious(THREE, M, C, "ark70"); } };
UNIT_MODELS["gbr_e60_patrol"] = { len: 30.1, build: function (THREE, M, C) { return HeroGbNavyEarly.brave(THREE, M, C); } };
UNIT_MODELS["gbr_e50_patrol"] = { len: 35.7, build: function (THREE, M, C) { return HeroGbNavyEarly.ford(THREE, M, C); } };
