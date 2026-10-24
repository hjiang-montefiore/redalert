/* ==================== js/hero/ru_sovremenny.js ==========================
   HERO MODEL -- Project 956 "Sovremenny" class destroyer (Sarych).  Keys:
   pact_e80_destroyer (the 1980s ships), pact_e90_destroyer (the 1990s and
   2000s) and destroyer_p (the present day).  Published figures: length
   overall 156.5 m, beam 17.3 m (js/warship_specs.js 156.5 / 17.3), draught
   about 6 m.  REDO 2026-10-24: hull lofted from a section table, rounded
   AK-130 shields, the Kite Screech director, the two Fregat antennas, the
   telescopic hangar and a painted pad; paint in three periods.

   REFERENCES (Wikimedia Commons, fetched at width 960):
     [P] "Sovremennyy-class destroyer profile 1987.png" - orthographic
         recognition profile, hull 922 px = 156.5 m (5.89 px/m), waterline
         at y 181.  Stations and the sheer were scaled off it.
     [A] "Sovremennyy1986.jpg" - hull 441 from high on the starboard bow,
         the whole plan: the deck layout, the pad markings, the funnel casing.
     [B] "A starboard bow view of ... BEZUPRECHNYY ... Northern Wedding '86"
         (DPLA 536b9a...) - a near-beam starboard view, 1986: Top Steer,
         the Kite Screech dish, the sheer step at the Moskit quads.  Long
         lens and an oblique line of sight: heights read about 1.55x her
         length scale, so only ratios are taken from it.
     [C] "US Navy 050606-N-5258M-011 ... Nastoychivyy (DD 610) ... BALTOPS
         2005" - port bow, 2005: Top Plate, the 1990s/2000s grey, the
         black boot topping.
     [D] "Admiral Ushakov destroyer in Severomorsk, April 2011" - starboard
         side of the fore part, 2011: the AK-130 shield shape (lower rounded
         front, domed higher rear), the Moskit canisters with domed caps at
         about 14 deg, Top Plate, the present-day darker grey.
   The earlier hero's AFTER PART stations (aft AK-130 x -56.5 on a 1.5 m
   ring, 01 house to x -50, aft Uragan x -45 trained aft, pad block
   x -42..-30 with its deck at z 10.0, hangar x -30 to the casing, aft Front
   Domes x -24, aft AK-630s x -31.9) rested on [P], [A] and five more dated
   photographs (Okrylenny 1989, Boevoi 1987, Bespokoyny 2018, Sovremenny
   1982); [A] and [B] agree with them and they are kept.

   RECOGNITION LIST (what makes her, and where it shows):
     1. Long hull with a strong sheer; the forecastle deck ends in a
        sloped break under the after halves of the Moskit quads (their fore
        ends at forecastle level, their after ends down in the break), and
        a flared raked bow [P][B][C][D] - section table STA, break x 19.5-23.
     2. Twin AK-130 in rounded shields fore (x 50.6) and aft (x -56.5, on a
        raised ring) [P][A][D] - ak130().
     3. Two KT-190 quadruple Moskit launchers abreast the bridge, canisters
        2 over 2 with domed fore caps, raised about 14 deg [B][C][D] - moskit().
     4. 3S90 Uragan single-arm launchers on the forward house (x 31.5) and
        aft of the pad (x -45) [A][B] - uragan().
     5. The Fregat air-search antenna on the enclosed tower behind the
        bridge: Top Steer (open mesh, with a smaller back antenna) on the
        1980s ships [B][P], Top Plate (two planar arrays back to back) on
        the later ones [C][D] - topSteer() / topPlate().
     6. Band Stand dome on the bridge roof, the Kite Screech dish behind it
        [A][B][D] - bridge block.
     7. One big boxy funnel casing with the lattice mast on it [A][B][C].
     8. Raised pad on the 02 block abaft the hangar, with its painted ring
        [A]; the retracted telescopic hangar against the casing [A][P].
     9. Front Dome illuminators on the bridge wings and the funnel quarters,
        AK-630 pairs amidships and at the pad corners [A][B].
    10. Paint: the 1980s light blue-grey [A][B]; the 2005 mid grey
        (sampled about rgb 84,88,91 on her house, 78,83,81 shaded hull,
        [C]); the 2011 darker blue-grey (house 77,80,85, hull 46,50,55 in
        overcast, [D]); black boot topping [C][D].  Hull numbers, names and
        flags are never drawn.

   WHAT VARIES BY KEY: the Fregat antenna (Top Steer 1980s, Top Plate later)
   and the paint.  NOT CONFIRMED: the year each ship got Top Plate (later
   batch; the early ships keep Top Steer), the sonar dome (not visible, not
   drawn), the Bass Tilt directors (not identified in the references, not
   drawn), the run-out length of the telescopic hangar (drawn retracted),
   the boxy object on the quarterdeck abaft the aft gun in [A] (not
   identified, not drawn).

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The forward
   twin AK-130 is the group named "turret" (the rows carry turret:true);
   everything else is baked, one mesh per material.  The hidden "helipad"
   node marks the middle of the pad surface for render3d deckOf/padSpot.
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSovremenny = (function () {
  "use strict";
  var PI = Math.PI;
  var XS0 = -78.25, XS1 = 78.25, XWL = 72.7;   /* transom, stem head, stem at the waterline [P] */

  /* HULL SECTION TABLE, scaled off [P] (5.89 px/m) with the half-beams
     from the published 17.3 m beam and the plan in [A].
     x, deck z, half beam at the deck edge, half beam at the waterline,
     bottom z on the centreline, bilge fullness (super-ellipse power) */
  var STA = [
    [-78.25, 4.40, 6.60, 6.10, -1.00, 3.0],
    [-76.0,  4.40, 7.20, 6.80, -2.30, 2.8],
    [-72.0,  4.40, 7.85, 7.45, -3.70, 2.6],
    [-64.0,  4.40, 8.35, 8.00, -5.00, 2.6],
    [-50.0,  4.40, 8.65, 8.30, -5.80, 2.8],
    [-26.0,  4.40, 8.65, 8.30, -5.95, 3.0],
    [-4.0,   5.40, 8.65, 8.30, -5.95, 3.0],
    [ 14.0,  5.90, 8.60, 8.20, -5.95, 2.8],
    [ 19.5,  5.98, 8.52, 8.06, -5.92, 2.6],
    [ 23.0,  8.30, 8.45, 7.88, -5.90, 2.5],
    [ 34.0,  8.60, 7.95, 6.90, -5.70, 2.2],
    [ 44.0,  8.80, 7.05, 5.70, -5.40, 1.9],
    [ 54.0,  9.00, 5.85, 4.10, -4.90, 1.6],
    [ 62.0,  9.20, 4.45, 2.50, -4.00, 1.45],
    [ 68.0,  9.40, 3.05, 1.20, -2.60, 1.3],
    [ 72.7,  9.60, 1.75, 0.00,  0.00, 1.2],
    [ 75.5,  9.70, 0.95, 0.00,  0.00, 1.2],
    [ 78.25, 9.80, 0.12, 0.00,  0.00, 1.2]
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
  /* the raked stem: straight from the waterline at x 72.7 to the stem head [P] */
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
      var R = rng(9561), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
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
      var R = rng(4417), i;
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
  /* the pad as [A] shows it: dark plating, a white ring, a small touchdown
     ring in it, and the guide line running forward into the hangar.  UV
     0..1 over x -42..-30, y -6.4..6.4 */
  function padTex(THREE) {
    return canvasTex(THREE, "pad", 256, 256, function (g, w, h) {
      var R = rng(77), i;
      g.fillStyle = "#4a4f53"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000"; g.fillRect(R() * w, R() * h, 10 + R() * 40, 6 + R() * 24); }
      g.globalAlpha = 1;
      var s = w / 12.0, cx = (-36.1 + 42) * s, cy = h / 2;      /* 21.3 px per metre */
      /* the touchdown circle painted lighter, its white rim, a small inner
         ring, two radial lines toward the fore corners and the pair of
         guide lines running forward into the hangar [A] */
      g.fillStyle = "#7c8184"; g.beginPath(); g.arc(cx, cy, 4.1 * s, 0, PI * 2); g.fill();
      g.strokeStyle = "#c4c6c2"; g.lineWidth = 0.3 * s;
      g.beginPath(); g.arc(cx, cy, 4.1 * s, 0, PI * 2); g.stroke();
      g.lineWidth = 0.22 * s;
      g.beginPath(); g.arc(cx, cy, 1.0 * s, 0.6, PI * 2 - 0.6); g.stroke();
      g.lineWidth = 0.18 * s;
      for (i = -1; i <= 1; i += 2) {
        g.beginPath(); g.moveTo(cx + 1.3 * s, cy + i * 0.45 * s); g.lineTo(w, cy + i * 0.45 * s); g.stroke();
        g.beginPath(); g.moveTo(cx + 0.9 * s * Math.cos(0.8), cy + i * 0.9 * s * Math.sin(0.8));
        g.lineTo(cx + 4.6 * s * Math.cos(0.8), cy + i * 4.6 * s * Math.sin(0.8)); g.stroke();
      }
      g.lineWidth = 0.22 * s; g.strokeStyle = "#b9bbb6";
      g.strokeRect(0.25 * s, 0.25 * s, w - 0.5 * s, h - 0.5 * s);
    });
  }

  /* paint by period, photograph samples taken to about 0.8-0.9 of level */
  var PAINT = {
    e80: { hull: 0x8a9298, sup: 0x99a1a6, deck: 0x52575b },   /* [A][B] 1980s light blue-grey */
    e90: { hull: 0x737877, sup: 0x7f8484, deck: 0x4f5352 },   /* [C] 2005 mid grey */
    e20: { hull: 0x5d646b, sup: 0x6c737a, deck: 0x464b50 }    /* [D] 2011 darker blue-grey */
  };
  function makeMats(THREE, C, P) {
    var team = (C && C.team) || 0x3f7fd0;
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
      deck:  skin(P.deck, plateTex(THREE), 0.95),
      pad:   skin(0xffffff, padTex(THREE), 0.92),
      dark:  skin(0x08090a, plateTex(THREE), 0.9),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x555c62, 0.52, 0.55),
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
  function box(THREE, p, lx, ly, lz, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (ry) b.rotation.z = ry; p.add(b); return b;
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
  /* convex polygon (CCW from above) extruded z0..z1; uv by a callback */
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
  /* rows x sections lofted body (each section a closed ring of [y,z]
     pairs, all rings the same length), along X; capped at both ends */
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
      var c0 = pos.length / 3, k;
      var sy = 0, sz = 0; for (k = 0; k < n; k++) { sy += rings[i0][k][0]; sz += rings[i0][k][1]; }
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
    for (x = XS0; x < XS1 - 0.01; x += 3.2) xs.push(x);
    for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
    for (x = 70; x < XS1; x += 1.4) xs.push(x);
    xs.push(XS1);
    xs.sort(function (a, b) { return a - b; });
    return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
  }
  /* one band of the shell between heights zlo and zhi (clamped to the
     section), both sides, metre UVs on a 24 x 8 m tile */
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
    /* drop the triangles the stem and keel collapse to nothing */
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
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 6, w * (1 - 2 * j / NC) / 6); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  /* flat transom, by fan from its centre */
  function transom(THREE, g, T) {
    var x = XS0, zb = zBot(x), zd = deckZ(x), N = 10, j, s;
    var bands = [[T.under, zb, -0.4], [T.boot, -0.4, 0.6], [T.hull, 0.6, zd]];
    bands.forEach(function (bd) {
      var pos = [], uv = [], k = 0;
      for (j = 0; j < N; j++) {
        var z0 = bd[1] + (bd[2] - bd[1]) * j / N, z1 = bd[1] + (bd[2] - bd[1]) * (j + 1) / N;
        var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1);
        pos.push(x, -w0, z0, x, w0, z0, x, w1, z1, x, -w0, z0, x, w1, z1, x, -w1, z1);
        for (k = 0; k < 6; k++) uv.push(pos[pos.length - 18 + k * 3 + 1] / 24, pos[pos.length - 18 + k * 3 + 2] / 8);
      }
      /* faces aft: reverse winding */
      for (j = 0; j < pos.length; j += 9) {
        for (s = 0; s < 3; s++) { var t = pos[j + 3 + s]; pos[j + 3 + s] = pos[j + 6 + s]; pos[j + 6 + s] = t; }
      }
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv), bd[0]));
    });
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
  function lattice(THREE, g, T, cx, bx, by, tx, ty, z0, z1, n, r) {
    var i, j, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    function pt(k, f) {
      var sx = bx + (tx - bx) * f, sy = by + (ty - by) * f;
      return [cx + c[k][0] * sx, c[k][1] * sy, z0 + (z1 - z0) * f];
    }
    for (j = 0; j < 4; j++) {
      var a = pt(j, 0), b = pt(j, 1);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], r, 4);
    }
    for (i = 0; i <= n; i++) {
      var f = i / n;
      for (j = 0; j < 4; j++) {
        var p = pt(j, f), q = pt((j + 1) % 4, f);
        if (i > 0) strut(THREE, g, T.metal, p[0], p[1], p[2], q[0], q[1], q[2], r * 0.6, 3);
        if (i < n) {
          var q2 = pt((j + 1) % 4, f + 1 / n);
          strut(THREE, g, T.metal, p[0], p[1], p[2], q2[0], q2[1], q2[2], r * 0.4, 3);
        }
      }
    }
  }
  /* a dish facing +X, rim radius rad */
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 16, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2 + (tilt || 0));
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }

  /* twin 130 mm AK-130 at rest pointing +X: a rounded shield, lower at the
     front and domed higher at the rear [D][A], on its ring */
  function ak130(THREE, g, T) {
    cylZ(THREE, g, 2.75, 2.95, 0.45, 20, T.sup, -0.2, 0, 0.22);
    var xs = [-3.35, -3.2, -2.4, -1.0, 0.4, 1.6, 2.5, 3.1, 3.35];
    var sec = [[2.3, 1.6, 2.05, 4.5], [2.5, 1.82, 2.12, 3.4], [2.6, 1.95, 2.15, 2.6], [2.6, 1.92, 2.12, 2.4],
               [2.55, 1.6, 1.88, 2.4], [2.4, 1.18, 1.6, 2.4], [2.15, 0.95, 1.5, 2.3], [1.8, 0.78, 1.45, 2.2], [1.25, 0.52, 1.42, 2.0]];
    var rings = sec.map(function (s) { return superRing(s[0], s[1], s[2], 2 / s[3], 20); });
    ringLoft(THREE, g, T.sup, xs, rings, true);
    /* rangefinder hood on the rear roof, vents */
    box(THREE, g, 1.2, 1.4, 0.35, T.sup, -1.9, 0, 4.1);
    box(THREE, g, 0.1, 1.2, 0.5, T.dark, -3.36, 0, 2.1);
    var s;
    box(THREE, g, 0.3, 2.3, 1.1, T.dark, 3.25, 0, 1.55);
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.24, 0.26, 1.0, 10, T.gun, 3.7, s * 0.6, 1.55);
      cylX(THREE, g, 0.12, 0.15, 6.3, 10, T.gun, 7.25, s * 0.6, 1.55, true);
      cylX(THREE, g, 0.155, 0.155, 0.35, 10, T.gun, 10.2, s * 0.6, 1.55);
    }
    return g;
  }
  /* 3S90 Uragan single-arm launcher, arm level and empty as photographed,
     pointing +X */
  function uragan(THREE, g, T) {
    cylZ(THREE, g, 1.7, 1.9, 0.6, 16, T.sup, 0, 0, 0.3);
    hexa(THREE, g, T.sup, [
      [-1.6, -1.5, 0.6], [1.2, -1.5, 0.6], [1.2, 1.5, 0.6], [-1.6, 1.5, 0.6],
      [-1.3, -1.0, 2.0], [0.7, -1.0, 2.0], [0.7, 1.0, 2.0], [-1.3, 1.0, 2.0]]);
    var arm = new THREE.Group(); arm.position.set(0.0, 0, 2.15); arm.rotation.y = -0.1;
    box(THREE, arm, 5.6, 0.42, 0.55, T.sup, 1.9, 0, 0);
    box(THREE, arm, 0.9, 0.8, 0.9, T.sup, -0.5, 0, 0.0);
    box(THREE, arm, 4.8, 0.18, 0.12, T.metal, 2.2, 0, -0.34);
    g.add(arm);
    return g;
  }
  /* KT-190 quad Moskit: canisters 2 over 2 with domed fore caps, the frame
     and the blast deflector box at the after ends, along +X [D][B] */
  function moskit(THREE, g, T) {
    var a, b, L = 10.4, R = 0.66;
    for (a = -1; a <= 1; a += 2) for (b = -1; b <= 1; b += 2) {
      var y = a * 0.7, z = b * 0.7;
      cylX(THREE, g, R, R, L, 14, T.sup, 0, y, z);
      var cg = new THREE.SphereGeometry(R, 14, 6, 0, PI * 2, 0, PI / 2); cg.scale(1, 0.75, 1); cg.rotateZ(-PI / 2);
      var cp = new THREE.Mesh(cg, T.sup); cp.position.set(L / 2, y, z); g.add(cp);
      cylX(THREE, g, R + 0.04, R + 0.04, 0.18, 14, T.metal, L / 2 - 0.6, y, z);
      cylX(THREE, g, R + 0.04, R + 0.04, 0.18, 14, T.metal, -L / 2 + 1.2, y, z);
      cylX(THREE, g, R * 0.92, R * 0.92, 0.12, 14, T.dark, -L / 2 - 0.02, y, z);
    }
    box(THREE, g, 0.35, 3.0, 3.0, T.metal, -1.6, 0, 0);
    box(THREE, g, 0.35, 3.0, 3.0, T.metal, 2.2, 0, 0);
    box(THREE, g, 7.0, 2.6, 0.2, T.metal, 0.3, 0, -1.45);
    return g;
  }
  /* AK-630 six-barrel 30 mm mount */
  function ak630(THREE, g, T) {
    cylZ(THREE, g, 0.55, 0.65, 0.5, 10, T.sup, 0, 0, 0.25);
    var sg = new THREE.SphereGeometry(0.75, 12, 6, 0, PI * 2, 0, PI / 2); sg.rotateX(PI / 2); sg.scale(1.1, 0.9, 1.2);
    var d = new THREE.Mesh(sg, T.sup); d.position.set(0, 0, 0.55); g.add(d);
    cylX(THREE, g, 0.16, 0.16, 1.9, 8, T.gun, 1.45, 0, 1.0, true);
    cylX(THREE, g, 0.26, 0.26, 0.5, 8, T.gun, 0.65, 0, 1.0);
    return g;
  }
  /* Front Dome (OP-3) illuminator on a short stalk */
  function frontDome(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 0.42, 0.55, 0.5, 8, T.sup, x, y, z + 0.25);
    var sg = new THREE.SphereGeometry(0.85, 12, 8, 0, PI * 2, 0, PI * 0.62);
    sg.rotateX(PI / 2);
    var d = new THREE.Mesh(sg, T.sup); d.position.set(x, y, z + 0.65); g.add(d);
  }
  /* Top Steer (MR-700 Fregat): the big open-mesh antenna tilted back, a
     smaller bar antenna back to back with it [B][P] */
  function topSteer(THREE, g, T, x, z) {
    var a = new THREE.Group(); a.position.set(x, 0, z); a.rotation.y = -0.32;
    var i;
    box(THREE, a, 0.16, 7.4, 0.2, T.metal, 0.2, 0, -2.0);
    box(THREE, a, 0.16, 7.4, 0.2, T.metal, 0.2, 0, 2.0);
    for (i = 0; i < 5; i++) box(THREE, a, 0.08, 7.2, 0.08, T.metal, 0.2, 0, -1.33 + i * 0.67);
    for (i = 0; i < 11; i++) box(THREE, a, 0.12, 0.12, 4.0, T.metal, 0.2 + Math.abs(i - 5) * 0.06, -3.6 + i * 0.72, 0);
    box(THREE, a, 0.9, 0.5, 3.6, T.metal, -0.4, 0, 0);
    box(THREE, a, 0.6, 4.8, 0.9, T.metal, -1.2, 0, 0.6);
    box(THREE, a, 0.12, 4.6, 0.7, T.dark, -1.52, 0, 0.6);
    g.add(a);
  }
  /* Top Plate (MR-750 Fregat-M2): two planar arrays back to back, leaning
     apart, on a turntable [C][D] */
  function topPlate(THREE, g, T, x, z) {
    var a = new THREE.Group(), s; a.position.set(x, 0, z);
    for (s = -1; s <= 1; s += 2) {
      var pnl = new THREE.Group(); pnl.position.set(s * 0.55, 0, 0); pnl.rotation.y = s * 0.36;
      hexa(THREE, pnl, T.sup, [
        [-0.18, -3.0, -1.8], [0.18, -3.0, -1.8], [0.18, 3.0, -1.8], [-0.18, 3.0, -1.8],
        [-0.18, -3.5, 1.8], [0.18, -3.5, 1.8], [0.18, 3.5, 1.8], [-0.18, 3.5, 1.8]]);
      box(THREE, pnl, 0.08, 6.6, 0.1, T.metal, s * 0.2, 0, 1.75);
      a.add(pnl);
    }
    box(THREE, a, 1.4, 1.6, 1.0, T.metal, 0, 0, -1.6);
    g.add(a);
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C, V) {
    var g = new THREE.Group();
    var P = PAINT[V] || PAINT.e90;
    var T = sealMats(makeMats(THREE, C, P));
    var late = V !== "e80";
    var s, i, x;

    /* hull shell in three bands, transom, weather deck */
    g.add(shellBand(THREE, T.under, -7, -0.4, 5));
    g.add(shellBand(THREE, T.boot, -0.4, 0.6, 1));
    g.add(shellBand(THREE, T.hull, 0.6, 12, 6));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck));

    /* scuttles, anchor recesses, hull doors */
    for (i = 0; i < 40; i++) {
      x = -70 + i * 3.4;
      if ((x > 14 && x < 28) || x > 64) continue;
      for (s = -1; s <= 1; s += 2) {
        var sg = new THREE.PlaneGeometry(0.32, 0.32); sg.rotateX(-s * PI / 2);
        var zz = deckZ(x) - 1.4, sc = new THREE.Mesh(sg, T.dark);
        sc.position.set(x, s * (W(x, zz) + 0.04), zz); g.add(sc);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      var hz = 7.6;
      box(THREE, g, 1.2, 0.3, 1.0, T.dark, 67.0, s * (W(67, hz) - 0.05), hz);
      box(THREE, g, 2.0, 0.06, 1.6, T.dark, -22.0, s * (W(-22, 2.6) + 0.02), 2.6);
    }

    /* forecastle house carrying the forward Uragan [A] */
    polyPrism(THREE, g, T.sup, [[26.5, -4.4], [36.0, -4.4], [37.5, -2.6], [37.5, 2.6], [36.0, 4.4], [26.5, 4.4]], 8.3, 10.65);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) box(THREE, g, 0.9, 0.05, 1.3, T.dark, 28.5 + i * 2.6, s * 4.42, 9.3);
    /* main bridge house (tier A), bridge (tier B), upper bridge (tier C) */
    polyPrism(THREE, g, T.sup, [[0.0, -5.4], [23.2, -5.4], [24.6, -3.6], [24.6, 3.6], [23.2, 5.4], [0.0, 5.4]], 5.4, 11.8);
    polyPrism(THREE, g, T.sup, [[6.2, -5.5], [22.6, -5.5], [24.0, -3.4], [24.0, 3.4], [22.6, 5.5], [6.2, 5.5]], 11.8, 15.5);
    polyPrism(THREE, g, T.sup, [[6.0, -4.2], [14.0, -4.2], [15.2, -3.0], [15.2, 3.0], [14.0, 4.2], [6.0, 4.2]], 15.5, 18.2);
    /* bridge windows: a raked row across the front and down the sides */
    hexa(THREE, g, T.glass, [[23.95, -3.3, 14.1], [24.05, -3.3, 14.1], [24.05, 3.3, 14.1], [23.95, 3.3, 14.1],
                              [23.75, -3.3, 15.0], [23.85, -3.3, 15.0], [23.85, 3.3, 15.0], [23.75, 3.3, 15.0]]);
    box(THREE, g, 0.1, 5.6, 0.75, T.glass, 15.22, 0, 17.2);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.9, 0.1, 0.8, T.glass, 23.3, s * 4.5, 14.5, s * 0.98);
      box(THREE, g, 10.0, 0.1, 0.8, T.glass, 17.0, s * 5.52, 14.4);
      box(THREE, g, 7.0, 0.1, 0.7, T.glass, 10.5, s * 4.22, 17.2);
      /* bridge wings */
      box(THREE, g, 3.0, 2.0, 0.16, T.sup, 20.5, s * 6.4, 13.9);
      box(THREE, g, 3.0, 0.08, 1.0, T.sup, 20.5, s * 7.38, 14.45);
      for (i = 0; i < 9; i++) box(THREE, g, 0.8, 0.05, 0.55, T.dark, 1.5 + i * 2.4, s * 5.43, 10.4);
      for (i = 0; i < 4; i++) box(THREE, g, 1.0, 0.05, 1.6, T.dark, 3.0 + i * 4.8, s * 5.43, 7.0);
    }
    box(THREE, g, 8.6, 8.0, 0.12, T.metal, 10.5, 0, 18.26);

    /* Band Stand dome [A][B][D], the Kite Screech director behind it [B][D][P] */
    cylZ(THREE, g, 1.3, 1.7, 0.9, 14, T.sup, 18.4, 0, 15.95);
    var bd = new THREE.SphereGeometry(2.05, 20, 12); bd.scale(1, 1, 1.05);
    var bm = new THREE.Mesh(bd, T.sup); bm.position.set(18.4, 0, 17.9); g.add(bm);
    cylZ(THREE, g, 0.55, 0.7, 1.6, 10, T.sup, 13.6, 0, 19.0);
    box(THREE, g, 1.8, 2.0, 1.3, T.sup, 13.3, 0, 20.4);
    dish(THREE, g, T.metal, 1.35, 14.5, 0, 20.6, 0.05);
    box(THREE, g, 0.8, 0.9, 0.9, T.sup, 13.4, 1.4, 21.3);
    for (s = -1; s <= 1; s += 2) {
      frontDome(THREE, g, T, 21.6, s * 3.7, 15.5);
      frontDome(THREE, g, T, 6.6, s * 3.4, 18.3);
    }

    /* the enclosed tower behind the bridge carrying the Fregat [P][B] */
    tprism(THREE, g, 6.4, 6.2, 3.8, 4.0, 14.0, T.sup, 3.6, 0, 18.8);
    box(THREE, g, 5.0, 6.2, 0.14, T.metal, 3.6, 0, 21.0);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.6, 0.08, 0.7, T.dark, 3.6, s * 2.6, 20.0);
      box(THREE, g, 1.2, 1.4, 0.12, T.metal, 3.6, s * 2.6, 24.0);
      dish(THREE, g, T.metal, 0.5, 4.0, s * 3.0, 24.6, 0);
    }
    box(THREE, g, 4.4, 4.6, 0.14, T.metal, 3.6, 0, 25.8);
    cylZ(THREE, g, 0.55, 0.7, 1.2, 10, T.sup, 3.6, 0, 26.4);
    if (late) topPlate(THREE, g, T, 3.6, 28.7); else topSteer(THREE, g, T, 3.6, 28.6);
    strut(THREE, g, T.metal, 1.8, 0, 25.8, 1.8, 0, 30.0, 0.04, 3);

    /* funnel casing, cap and exhaust grille [A][B]; house ahead of it */
    tprism(THREE, g, 17.0, 12.4, 14.6, 9.8, 11.2, T.sup, -15.0, 0, 11.0);
    tprism(THREE, g, 14.2, 9.6, 12.4, 8.4, 1.6, T.sup, -15.4, 0, 17.4);
    box(THREE, g, 7.5, 5.0, 0.1, T.dark, -13.0, 0, 18.25);
    for (i = 0; i < 6; i++) box(THREE, g, 0.12, 5.0, 0.12, T.metal, -16.4 + i * 1.5, 0, 18.32);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 5; i++)
      box(THREE, g, 1.1, 0.1, 1.5, T.dark, -21.0 + i * 3.0, s * 5.62, 10.0);
    polyPrism(THREE, g, T.sup, [[-6.6, -5.0], [0.2, -5.0], [0.2, 5.0], [-6.6, 5.0]], 5.2, 13.2);
    cylZ(THREE, g, 0.7, 0.8, 1.4, 10, T.sup, -2.0, 0, 13.9);
    /* the lattice mast on the casing, its yard and the navigation radars */
    lattice(THREE, g, T, -17.5, 2.0, 1.7, 0.6, 0.55, 18.2, 28.0, 6, 0.09);
    box(THREE, g, 3.4, 3.0, 0.12, T.metal, -17.5, 0, 24.0);
    box(THREE, g, 2.4, 2.2, 0.12, T.metal, -17.5, 0, 28.0);
    box(THREE, g, 1.0, 9.6, 0.14, T.metal, -17.5, 0, 26.0);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.3, 0.3, 0.9, 8, T.sup, -17.5, s * 4.4, 25.5);
      box(THREE, g, 0.3, 2.8, 0.18, T.metal, -16.7, s * 1.6, 28.5, s * 0.6);
    }
    strut(THREE, g, T.metal, -17.5, 0, 28.0, -17.5, 0, 33.0, 0.05, 4);
    box(THREE, g, 0.1, 2.6, 0.1, T.metal, -17.5, 0, 31.5);
    /* boats under davits, port and starboard abreast the house [A] */
    for (s = -1; s <= 1; s += 2) {
      var bx = -3.5, by = s * 6.6;
      hexa(THREE, g, T.sup, [[bx - 3.5, by - 1.0, 6.9], [bx + 3.2, by - 1.0, 6.9], [bx + 3.2, by + 1.0, 6.9], [bx - 3.5, by + 1.0, 6.9],
                              [bx - 3.3, by - 1.1, 7.8], [bx + 3.6, by - 0.6, 7.8], [bx + 3.6, by + 0.6, 7.8], [bx - 3.3, by + 1.1, 7.8]]);
      box(THREE, g, 2.2, 1.4, 0.5, T.sup, bx - 0.6, by, 8.05);
      strut(THREE, g, T.metal, bx - 2.4, s * 5.2, 6.0, bx - 2.4, by, 9.2, 0.07, 4);
      strut(THREE, g, T.metal, bx + 2.4, s * 5.2, 6.0, bx + 2.4, by, 9.2, 0.07, 4);
    }

    /* AFT OF THE FUNNEL (kept stations; see the header) */
    var Z1 = 7.84, ZP = 10.0;
    polyPrism(THREE, g, T.sup, [[-48.0, -6.0], [-9.2, -6.0], [-9.2, 6.0], [-48.0, 6.0], [-50.0, 4.0], [-50.0, -4.0]], 4.3, Z1);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 1.0, 0.06, 1.9, T.dark, -45.5 + i * 5.2, s * 6.02, 5.45);
      box(THREE, g, 0.06, 1.0, 1.9, T.dark, -50.03, s * 2.2, 5.45);
    }
    /* pad block (02 level) x -42..-30 and the pad plate, the hexagon [A] */
    polyPrism(THREE, g, T.sup, [[-42.0, -5.5], [-30.0, -5.5], [-30.0, 5.5], [-42.0, 5.5]], Z1, ZP - 0.06);
    var PADP = [[-42.0, -4.2], [-39.8, -6.4], [-34.4, -6.4], [-30.2, -3.2], [-30.2, 3.2], [-34.4, 6.4], [-39.8, 6.4], [-42.0, 4.2]];
    polyPrism(THREE, g, T.pad, PADP, ZP - 0.06, ZP, function (px, py, pz, side) {
      return side ? [0.004, 0.12] : [(px + 42) / 12, (py + 6.4) / 12.8];
    });
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 4; i++) box(THREE, g, 0.9, 0.05, 0.6, T.dark, -40.5 + i * 2.6, s * 5.52, 9.0);
    /* pad edge: low rail posts and the folded net frames */
    var PR = [[-42.0, -4.2], [-39.8, -6.4], [-34.4, -6.4], [-30.4, -3.35]], pr, q, k2;
    for (s = -1; s <= 1; s += 2) for (k2 = 0; k2 < PR.length - 1; k2++) {
      var a0 = PR[k2], a1 = PR[k2 + 1], L2 = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]);
      var nP = Math.max(1, Math.round(L2 / 1.8));
      for (q = 0; q <= nP; q++) {
        if (k2 > 0 && q === 0) continue;
        pr = [a0[0] + (a1[0] - a0[0]) * q / nP, s * (a0[1] + (a1[1] - a0[1]) * q / nP)];
        strut(THREE, g, T.metal, pr[0], pr[1], ZP, pr[0], pr[1], ZP + 0.8, 0.035, 3);
      }
      strut(THREE, g, T.metal, a0[0], s * a0[1], ZP + 0.78, a1[0], s * a1[1], ZP + 0.78, 0.025, 3);
    }
    strut(THREE, g, T.metal, -42.0, -4.2, ZP + 0.78, -42.0, 4.2, ZP + 0.78, 0.025, 3);
    /* the telescopic hangar, retracted: three nested sections stepping up
       toward the casing, the after one a little above the pad [A][P] */
    tprism(THREE, g, 2.4, 10.4, 2.4, 10.4, 10.84 - Z1, T.sup, -28.9, 0, (10.84 + Z1) / 2);
    tprism(THREE, g, 2.5, 10.8, 2.5, 10.8, 11.1 - Z1, T.sup, -26.5, 0, (11.1 + Z1) / 2);
    tprism(THREE, g, 2.4, 11.2, 2.4, 11.2, 11.35 - Z1, T.sup, -24.1, 0, (11.35 + Z1) / 2);
    for (i = -2; i <= 2; i++) box(THREE, g, 0.06, 0.12, 2.4, T.dark, -30.12, i * 2.0, 9.5);
    box(THREE, g, 0.05, 9.6, 0.08, T.dark, -30.12, 0, 10.72);
    /* aft 3S90 Uragan, trained aft */
    var au = new THREE.Group(); au.position.set(-45.0, 0, Z1); au.rotation.z = PI; uragan(THREE, au, T); g.add(au);
    for (s = -1; s <= 1; s += 2) {
      /* aft Front Domes on sponsons at the casing's after corners */
      box(THREE, g, 2.4, 2.0, 0.25, T.sup, -23.6, s * 4.4, 12.4);
      strut(THREE, g, T.metal, -24.4, s * 4.4, 12.3, -23.0, s * 4.4, 11.3, 0.08, 4);
      frontDome(THREE, g, T, -23.6, s * 4.4, 12.52);
      /* aft AK-630 pair at the fore corners of the pad block */
      box(THREE, g, 1.9, 1.5, 0.12, T.sup, -31.9, s * 5.75, ZP - 0.06);
      var ac = new THREE.Group(); ac.position.set(-31.9, s * 5.85, ZP); ac.rotation.z = s * PI / 2; ak630(THREE, ac, T); g.add(ac);
      /* AK-630 pair abeam of the tier A house */
      var ad = new THREE.Group(); ad.position.set(0.8, s * 6.5, deckZ(0.8)); ad.rotation.z = s * 0.4; ak630(THREE, ad, T); g.add(ad);
    }

    /* forecastle: the Moskit quads on the lower deck abreast the bridge,
       fore ends up about 14 deg, their saddles [D][B] */
    for (s = -1; s <= 1; s += 2) {
      var mk = new THREE.Group(); mk.position.set(19.4, s * 7.0, 8.6); mk.rotation.y = -0.245; moskit(THREE, mk, T); g.add(mk);
      box(THREE, g, 1.4, 2.6, 1.6, T.sup, 16.2, s * 6.95, 6.3);
      box(THREE, g, 1.4, 2.6, 2.5, T.sup, 22.4, s * 6.95, 7.0);
    }
    cylZ(THREE, g, 0.6, 0.6, 0.7, 10, T.metal, 61.0, 0, deckZ(61) + 0.35);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.45, 0.5, 0.5, 10, T.metal, 66.0, s * 1.4, deckZ(66) + 0.25);
      cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, 42.0, s * 5.0, deckZ(42) + 0.25);
      cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, -70.0, s * 5.5, deckZ(-70) + 0.25);
    }
    box(THREE, g, 1.4, 0.5, 0.2, T.metal, 64.0, 0, deckZ(64) + 0.1);
    strut(THREE, g, T.metal, 77.0, 0, 9.8, 77.0, 0, 12.5, 0.05, 4);

    /* aft AK-130 trained aft on its raised round base [P][A] */
    cylZ(THREE, g, 4.1, 4.3, 1.5, 28, T.sup, -56.5, 0, 5.15);
    var ag = new THREE.Group(); ag.position.set(-56.5, 0, 5.9); ag.rotation.z = PI; ak130(THREE, ag, T); g.add(ag);

    /* underwater gear: two shafts on A-brackets, props, rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.24, 0.24, 8.0, 8, T.metal, -68.0, s * 3.4, -3.4);
      strut(THREE, g, T.metal, -71.5, s * 3.4, -3.4, -71.5, s * 4.6, -1.8, 0.15, 4);
      cylX(THREE, g, 0.38, 0.55, 0.9, 8, T.metal, -73.3, s * 3.4, -3.4);
      for (i = 0; i < 5; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 1.3), T.metal);
        bl.position.set(-73.3, s * 3.4, -3.4); bl.rotation.x = i * 2 * PI / 5 + 0.35;
        bl.translateZ(0.85); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.4, 0.2, 2.6, T.metal, -75.2, s * 1.4, -2.2);
    }

    /* rails: not over the pad or the quarterdeck, which stay clean */
    railRun(THREE, g, T, -26.0, 19.4, 4.5, 1.0);
    railRun(THREE, g, T, 23.2, 76.0, 4.0, 1.0);

    /* team: small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 2.0, 0.9, 0.04, T.team, -24.1, 0, 11.37);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, 9.0, 0, 18.34);
    box(THREE, g, 2.6, 0.9, 0.04, T.team, 31.0, 0, 10.67);

    /* trained mount: forward AK-130 */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(50.6, 0, deckZ(50.6)); ak130(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tb = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
    root.add(tw);
    /* the middle of the pad's surface, for render3d deckOf/padSpot: the pad
       stands on the 02 block 5.6 m above the quarterdeck (hidden, no geometry) */
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(-36.1, 0, ZP); root.add(hp);
    return root;
  }
  return { build: build };
})();

/* the 1980s ships: Top Steer, the Soviet light blue-grey ([A][B]) */
UNIT_MODELS["pact_e80_destroyer"] = {
  len: 156.5,
  build: function (THREE, M, C) { return HeroSovremenny.build(THREE, M, C, "e80"); }
};
/* the 1990s and 2000s: Top Plate, the 2005 mid grey ([C]) */
UNIT_MODELS["pact_e90_destroyer"] = {
  len: 156.5,
  build: function (THREE, M, C) { return HeroSovremenny.build(THREE, M, C, "e90"); }
};
/* the present day: Top Plate, the darker grey of the 2010s ([D]) */
UNIT_MODELS["destroyer_p"] = {
  len: 156.5,
  build: function (THREE, M, C) { return HeroSovremenny.build(THREE, M, C, "e20"); }
};
