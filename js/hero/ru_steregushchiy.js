/* ==================== js/hero/ru_steregushchiy.js =======================
   HERO MODEL -- Project 20380 Steregushchiy, the lead ship of the class
   (Severnaya Verf, St Petersburg; laid down 2001, commissioned 2008, the
   first post-Soviet Russian surface warship).  Key: pact_e00_corvette, the
   PACT e00 corvette ("service 2008"), drawn as the LEAD SHIP as she was
   photographed in 2009-2011.  REDO 2026-10-24: hull lofted from a section
   table, the flush stealth superstructure, the Uran well, the two AK-630M,
   the Puma director, a deck-plan canvas and the 2009 two-tone paint.

   PUBLISHED FIGURES (ru.wikipedia, "Korvety proekta 20380", infobox and
   text): length 104.5 m overall, 90.0 m on the waterline; beam 13.0 m
   overall, 11.1 m on the waterline; draught 3.7 m; 1,800 t standard,
   2,250 t full.  The old model was 11.1 m wide at the deck: the 13.0 m is
   the deck-edge knuckle, the 11.1 m the waterline.  CORRECTED.
   Armament of the LEAD SHIP (same article): one 100 mm A-190; the 3M87
   Kortik-M (Kashtan) "on the forecastle"; two AK-630M; two quadruple
   INCLINED Uran launchers (8 Kh-35U) "athwartships in the middle of the
   hull"; two quadruple 324 mm Paket-NK in side ports; four PK-10 decoy
   launchers ("two between the pad and the hangar, two behind the A-190");
   the Puma 5P-10 director "on the forward superstructure"; Furke-2 search
   radar; Monument-A in a radio-transparent fairing built into the foremast;
   OSPV-20380 posts on the hangar roof.  The Redut VLS is on the SERIES
   ships from the second hull on, and the Zaslon integrated mast from the
   seventh: neither is on this ship and neither is drawn.  CORRECTED: the
   old header said the later ships carry AK-630M "in place of" the Kashtan;
   the lead ship has the Kashtan AND two AK-630M, and the later ships swap
   the Kashtan for Redut.  The old model also left the Urans off; they are
   now drawn from [E].

   REFERENCES (Wikimedia Commons, fetched at width 960):
     [A] "Corvette Steregushchiy in SPB.jpg" (27 Jul 2014, CC BY-SA 4.0):
         starboard broadside from across the Neva, 7.4 px a metre at 104.5 m.
         Stations, the sheer, the step heights of the superstructure (8.3 m
         aft, 9.6 m amidships, the hangar block 11.6 m), the tower (to 21.4
         m), the dome (centre 23.4 m), the topmast (32 m), the pylon (25.6 m)
         were all read off a metre grid laid over it.
     [B] "Corvette Steregushchiy.jpg" (26 Jul 2009, public domain): the
         starboard bow: the 2009 paint - dark grey hull to the knuckle,
         light grey superstructure, red at the waterline (sampled hull rgb
         74,84,90; superstructure 139,146,148, overcast).
     [C] "Corvette Steregushchiy detail.JPG" (2010, CC BY 3.0): the A-190
         gunhouse (flat sides with two doors, the big front slope, the
         barrel jacket) and the Kashtan behind it on its stepped pedestal;
         the light bulwark band above the dark hull.
     [D] "Steregushchiy ship.jpg" (2011, CC BY 2.0) and "Steregushchiy korma" (Cyrillic title)
         (2010, CC BY 3.0): the open pad at one level, a Ka-27 on it, the
         tall hangar face with its roller door.
     [E] "10-YearAnniversary2018-01.jpg" (mil.ru, 27 Feb 2018, CC BY 4.0):
         from above her PORT side.  The whole plan: the red-brown forecastle
         and pad, the grey bow, the pad circle, the Uran well with its two
         quadruple packs at right angles to the keel, the grille and the
         black pylon, the dark hangar roof, the port AK-630M at the fore
         corner of the after block, the port boat in its recess under a
         davit, the rafts.
     [F] "10-YearAnniversary2018-02.jpg" (mil.ru 2018): the port bow from
         above: the Kashtan platform, the bridge's big front slope, the
         tower and radome, the Puma head, the knuckle.
     [G] "Steregushchiy in SPb 2011 (3).jpg": the tower close up - the
         chamfered composite tower, the dome on its top, the column of
         platforms with small domes on its after side, the Puma head.

   RECOGNITION LIST (what makes her, and where it shows):
     1. Long low hull, a sharply raked straight stem, a knuckle the length of
        the ship, flare below it and tumblehome above [A][B][F] - STA, W().
     2. The superstructure FLUSH with the hull side from the hangar to the
        bridge (no side decks), stepping 8.3 / 9.6 m [A][E] - flush().
     3. The bridge block's big front slope rising off the Kashtan platform,
        the window band [F][G] - bridge rings BR.
     4. The tall chamfered tower with the white Furke dome on top and the
        lattice column behind it to 32 m [A][G] - tower, mast.
     5. The black exhaust pylon with its own short mast [A][B][E] - pylon.
     6. The A-190 in its faceted gunhouse forward ("turret") [C][E].
     7. The Kashtan on its stepped platform abaft the gun [C][E][F].
     8. The Uran well amidships, two quadruple packs athwartships [E].
     9. Two AK-630M at the fore corners of the after block [E][F]
        (the starboard one mirrored, see below).
    10. Hangar block with a dark roof, the tall aft door, the flat pad aft at
        4.0 m with its circle [A][D][E]; a boat each side on the 8.3 m
        ledge, starboard [A], port [E].
    11. Paint: 2009 dark hull, light superstructure, red-brown decks.

   NOT CONFIRMED: the starboard AK-630M (the references show the port one;
   the starboard one is mirrored, as the article gives two); the deck colour in
   2008-2011 (red-brown is from the 2018 overheads [E][F]); the Paket-NK
   side ports and the 14.5 mm mounts (not located, not drawn); the sonar
   bulb (not visible, not drawn).  No hull numbers, names or flags.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0.  The A-190
   is the group named "turret" (the row has turret:true); everything else
   is baked, one mesh per material.  The pad is the flat after deck at z
   4.0 from the transom to the hangar, clear of fittings: render3d deckOf /
   padSpot find it as her after-eighth level (no helipad node, as before).
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSteregushchiy = (function () {
  "use strict";
  var PI = Math.PI;
  var LOA = 104.5, XS0 = -52.25, XS1 = 52.25, XWL = 44.2;   /* transom, stem head, stem at the WL [A] */

  /* HULL SECTION TABLE off [A] (7.4 px/m) and the plan [E], beams from
     the published 13.0 / 11.1 m.  x, knuckle (deck edge) z, half beam at
     the knuckle, half beam at the waterline, bottom z on the centreline,
     bilge fullness (super-ellipse power) */
  var STA = [
    [-52.25, 4.00, 5.70, 4.70, -0.50, 3.0],
    [-50.0,  4.00, 6.05, 5.05, -1.40, 2.8],
    [-45.0,  4.00, 6.35, 5.35, -2.40, 2.6],
    [-38.0,  4.00, 6.50, 5.50, -3.10, 2.6],
    [-33.0,  4.00, 6.50, 5.55, -3.40, 2.8],
    [-20.0,  4.60, 6.50, 5.55, -3.70, 3.0],
    [  0.0,  5.30, 6.50, 5.55, -3.70, 3.0],
    [  8.0,  5.80, 6.50, 5.50, -3.70, 2.9],
    [ 14.0,  6.60, 6.30, 5.20, -3.70, 2.7],
    [ 20.0,  6.80, 5.95, 4.75, -3.65, 2.5],
    [ 28.0,  7.00, 5.20, 3.80, -3.50, 2.2],
    [ 35.0,  7.10, 4.25, 2.60, -3.20, 1.9],
    [ 41.0,  7.20, 3.10, 1.20, -2.60, 1.6],
    [ 44.2,  7.25, 2.40, 0.00,  0.00, 1.3],
    [ 48.0,  7.30, 1.40, 0.00,  0.00, 1.2],
    [ 52.25, 7.40, 0.12, 0.00,  0.00, 1.2]
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
  /* the raked stem: straight from the waterline at XWL to the stem head [A][F] */
  function zBot(x) { return x > XWL ? deckZ(XS1) * (x - XWL) / (XS1 - XWL) : pick(x, 4); }
  /* half breadth at height z: flared to the knuckle, a super-ellipse bilge below */
  function W(x, z) {
    var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
    if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.25);
    var n = pick(x, 5), t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  /* the superstructure wall leans in 0.17 a metre above the knuckle [B][F] */
  var TH = 0.17;
  function wallY(x, z) { return halfB(x) - TH * Math.max(0, z - deckZ(x)); }

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
    t.anisotropy = 4;
    TEX[key] = t; return t;
  }
  /* hull plating: one tile 24 m x 8 m (UVs metres / tile): strakes, butts,
     faint streaks */
  function hullTex(THREE) {
    return canvasTex(THREE, "hull", 512, 256, function (g, w, h) {
      var R = rng(20380), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 4; i++) {
        var xx = i * w / 4 + (i % 2) * 22;
        g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke();
      }
      g.globalAlpha = 0.06;
      for (i = 0; i < 44; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, 2 + R() * 5, 20 + R() * 80);
      }
      g.globalAlpha = 1;
    });
  }
  /* superstructure: composite panels, 6.25 m tiles, seams and stains */
  function plateTex(THREE) {
    return canvasTex(THREE, "plate", 256, 256, function (g, w, h) {
      var R = rng(530), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.13; g.strokeStyle = "#000000"; g.lineWidth = 1.4;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4 + (i % 2) * 9, 0); g.lineTo(i * w / 4 + (i % 2) * 9, h); g.stroke();
      }
      g.globalAlpha = 0.06;
      for (i = 0; i < 30; i++) {
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * w, R() * h, 10 + R() * 40, 6 + R() * 26);
      }
      g.globalAlpha = 1;
    });
  }
  /* THE DECK PLAN, the whole ship from above [E][F]: u = (x + 52.25) /
     104.5, v = (y + 7) / 14.  Red-brown forecastle and Kashtan platform,
     the grey bow beyond the breakwater line, the 01 roofs light grey, the
     hangar roof dark, the pad red-brown with its white edge, circle,
     cross and the guide line into the hangar.  Every up-facing surface of
     the ship samples it, so its regions follow the model's own stations. */
  function deckTex(THREE, P) {
    return canvasTex(THREE, "deck", 2048, 280, function (g, w, h) {
      var R = rng(77), i;
      var sx = w / LOA, sy = h / 14;
      function X(x) { return (x - XS0) * sx; }
      function Y(y) { return h - (y + 7) * sy; }
      function rect(x0, x1, y0, y1, c) { g.fillStyle = c; g.fillRect(X(x0), Y(y1), (x1 - x0) * sx, (y1 - y0) * sy); }
      rect(XS0, XS1, -7, 7, P.roofC);                              /* 01 roofs */
      rect(-33.2, -14.6, -4.25, 4.25, P.darkC);                    /* hangar roof, sooty [E] */
      rect(-8.2, 8.0, -4.6, 4.6, P.roofC);
      rect(12.8, 41.0, -7, 7, P.deckC);                            /* forecastle and platform */
      rect(41.0, XS1, -7, 7, P.bowC);                              /* the grey bow [E] */
      g.strokeStyle = "#2e2a26"; g.lineWidth = 0.12 * sx;
      g.beginPath(); g.moveTo(X(41.0), Y(-3.2)); g.lineTo(X(43.2), Y(0)); g.lineTo(X(41.0), Y(3.2)); g.stroke();
      /* the pad */
      rect(XS0, -32.9, -7, 7, P.deckC);
      g.globalAlpha = 0.09;
      for (i = 0; i < 160; i++) {
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * w, R() * h, 6 + R() * 30, 3 + R() * 12);
      }
      g.globalAlpha = 1;
      g.strokeStyle = "#d9d9d2"; g.lineWidth = 0.28 * sy;
      g.strokeRect(X(-51.6), Y(5.15), 18.2 * sx, 10.3 * sy);
      var cx = X(-42.6), cy = Y(0);
      g.lineWidth = 0.3 * sy;
      g.beginPath(); g.ellipse(cx, cy, 3.6 * sx, 3.6 * sy, 0, 0, 2 * PI); g.stroke();
      g.lineWidth = 0.2 * sy;
      g.beginPath(); g.moveTo(cx - 1.3 * sx, cy); g.lineTo(cx + 1.3 * sx, cy); g.stroke();
      g.beginPath(); g.moveTo(cx, cy - 1.3 * sy); g.lineTo(cx, cy + 1.3 * sy); g.stroke();
      g.beginPath(); g.moveTo(cx + 3.6 * sx, cy); g.lineTo(X(-33.0), cy); g.stroke();
      /* the orange walkway edge of the 01 roof beside the bridge [E] */
      rect(-8.0, 6.0, 5.05, 5.6, P.deckC); rect(-8.0, 6.0, -5.6, -5.05, P.deckC);
      /* hatches and plates on the forecastle */
      g.strokeStyle = "rgba(0,0,0,0.35)"; g.lineWidth = 0.08 * sx;
      [[31.5, 1.6], [31.5, -1.6], [36.5, 0], [17.0, 2.8], [17.0, -2.8]].forEach(function (q) {
        g.strokeRect(X(q[0] - 0.6), Y(q[1] + 0.5), 1.2 * sx, 1.0 * sy);
      });
    });
  }

  /* paint, sampled off [B] (2009, overcast) and taken to about 0.85-0.9 of
     level; the decks off [E] (2018, sun from above) taken to about 0.6 */
  var PAINT = {
    hull: 0x434c51, sup: 0x7a8285, under: 0x55241f,
    deckC: "#7a4a36", bowC: "#6c7275", roofC: "#7d8487", darkC: "#3b4043"
  };
  function makeMats(THREE, C) {
    var team = (C && C.team) || 0xd6503f;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(PAINT.hull, hullTex(THREE), 0.86),
      under: skin(PAINT.under, hullTex(THREE), 0.9),
      sup:   skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:  skin(0xffffff, deckTex(THREE, PAINT), 0.93),
      dark:  skin(0x1a1e21, plateTex(THREE), 0.85),
      white: skin(0xc9cdcd, plateTex(THREE), 0.7),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x50585d, 0.52, 0.5),
      gun:   metal(0x6c7478, 0.5, 0.45),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x06090b, roughness: 0.1, metalness: 0,
                                              transparent: true, opacity: 0.86 })
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
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg, r2) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, L, seg || 4, 1, r2 === undefined), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  function sphere(THREE, p, r, ws, hs, m, x, y, z, half) {
    var g = half ? new THREE.SphereGeometry(r, ws, hs, 0, 2 * PI, 0, PI / 2) : new THREE.SphereGeometry(r, ws, hs);
    g.rotateX(PI / 2);
    var s = new THREE.Mesh(g, m); s.position.set(x, y, z); p.add(s); return s;
  }

  /* Triangle bags with flat normals.  side() takes box-projected metre UVs
     on the plate tile; a solid's up-facing faces go to the deck plan instead,
     with plan UVs.  Faces are wound outward from a reference point. */
  function Bag() { this.p = []; this.u = []; }
  Bag.prototype.t = function (a, b, c, ref, plan) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-12) return;
    if (ref) {
      var mx = (a[0] + b[0] + c[0]) / 3 - ref[0], my = (a[1] + b[1] + c[1]) / 3 - ref[1], mz = (a[2] + b[2] + c[2]) / 3 - ref[2];
      if (nx * mx + ny * my + nz * mz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    }
    var ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz), self = this;
    [a, b, c].forEach(function (q) {
      self.p.push(q[0], q[1], q[2]);
      if (plan) self.u.push((q[0] - XS0) / LOA, (q[1] + 7) / 14);
      else if (az >= ax && az >= ay) self.u.push(q[0] * 0.16, q[1] * 0.16);
      else if (ay >= ax) self.u.push(q[0] * 0.16, q[2] * 0.16);
      else self.u.push(q[1] * 0.16, q[2] * 0.16);
    });
  };
  Bag.prototype.q = function (a, b, c, d, ref, plan) { this.t(a, b, c, ref, plan); this.t(a, c, d, ref, plan); };
  Bag.prototype.mesh = function (THREE, m) { return this.p.length ? new THREE.Mesh(geoOf(THREE, this.p, this.u), m) : null; };
  /* a convex solid from rings of [x,y,z] (same count each, in order round
     the solid).  Faces whose normal is within ~35 deg of straight up go on
     the deck plan (when `top` is given). */
  function solid(side, top, rings, capA, capB) {
    var n = rings[0].length, cx = 0, cy = 0, cz = 0, c = 0, i, k;
    rings.forEach(function (r) { r.forEach(function (q) { cx += q[0]; cy += q[1]; cz += q[2]; c++; }); });
    var ref = [cx / c, cy / c, cz / c];
    function put(a, b, d) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx, l = Math.sqrt(nx * nx + ny * ny + nz * nz);
      var mz = (a[2] + b[2] + d[2]) / 3 - ref[2];
      if (top && l > 1e-9 && Math.abs(nz) / l > 0.82) {
        /* up-facing if its outward normal points up: test against ref */
        var o = nx * ((a[0] + b[0] + d[0]) / 3 - ref[0]) + ny * ((a[1] + b[1] + d[1]) / 3 - ref[1]) + nz * mz;
        if ((o >= 0 ? nz : -nz) > 0) { top.t(a, b, d, ref, true); return; }
      }
      side.t(a, b, d, ref, false);
    }
    for (i = 0; i < rings.length - 1; i++)
      for (k = 0; k < n; k++) {
        var A = rings[i][k], B = rings[i][(k + 1) % n], C2 = rings[i + 1][(k + 1) % n], D = rings[i + 1][k];
        put(A, B, C2); put(A, C2, D);
      }
    var tR = rings[rings.length - 1], bR = rings[0];
    if (capB) for (k = 1; k < n - 1; k++) put(tR[0], tR[k], tR[k + 1]);
    if (capA) for (k = 1; k < n - 1; k++) put(bR[0], bR[k], bR[k + 1]);
    return ref;
  }
  function ringZ(pts, z) { return pts.map(function (q) { return [q[0], q[1], z]; }); }
  function chamRect(x0, x1, hw, ch) {
    return [[x0 + ch, -hw], [x1 - ch, -hw], [x1, -hw + ch], [x1, hw - ch],
            [x1 - ch, hw], [x0 + ch, hw], [x0, hw - ch], [x0, -hw + ch]];
  }
  /* a flat panel laid on the wall between corners i and j of a two-ring
     block, proud by off, at fractions u0..u1 along and v0..v1 up */
  function panel(bag, bot, top, i, j, u0, u1, v0, v1, off, ref) {
    var n = bot.length;
    function wp(u, v) {
      var a = bot[i], b = bot[j % n], c = top[i], d = top[j % n], p = [], k;
      for (k = 0; k < 3; k++) p.push((a[k] + (b[k] - a[k]) * u) * (1 - v) + (c[k] + (d[k] - c[k]) * u) * v);
      return p;
    }
    var P = [wp(u0, v0), wp(u1, v0), wp(u1, v1), wp(u0, v1)];
    var ux = P[1][0] - P[0][0], uy = P[1][1] - P[0][1], uz = P[1][2] - P[0][2];
    var vx = P[3][0] - P[0][0], vy = P[3][1] - P[0][1], vz = P[3][2] - P[0][2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx /= l; ny /= l; nz /= l;
    var mx = (P[0][0] + P[2][0]) / 2 - ref[0], my = (P[0][1] + P[2][1]) / 2 - ref[1], mz = (P[0][2] + P[2][2]) / 2 - ref[2];
    if (nx * mx + ny * my + nz * mz < 0) { nx = -nx; ny = -ny; nz = -nz; }
    P = P.map(function (q) { return [q[0] + nx * off, q[1] + ny * off, q[2] + nz * off]; });
    bag.q(P[0], P[1], P[2], P[3], ref);
  }

  /* ---------------------------------------------------------------- hull */
  function hullXs(x0, x1, step) {
    var xs = [], x, i;
    for (x = x0; x < x1 - 0.01; x += step) xs.push(x);
    for (i = 0; i < STA.length; i++) if (STA[i][0] > x0 && STA[i][0] < x1) xs.push(STA[i][0]);
    for (x = 40; x < x1; x += 1.2) if (x > x0) xs.push(x);
    xs.push(x1);
    xs.sort(function (a, b) { return a - b; });
    return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
  }
  /* one band of the shell between heights zlo and zhi (clamped to the
     section), both sides, metre UVs on a 24 x 8 m tile */
  function shellBand(THREE, m, zlo, zhi, rows) {
    var xs = hullXs(XS0, XS1, 2.0), pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
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
  /* a stretch of weather deck at the deck edge, plan UVs */
  function deckSheet(THREE, m, x0, x1) {
    var xs = hullXs(x0, x1, 2.0), pos = [], uv = [], idx = [], i, j, NC = 4;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = halfB(x), z = deckZ(x);
      for (j = 0; j <= NC; j++) {
        var y = w * (1 - 2 * j / NC);
        pos.push(x, y, z); uv.push((x - XS0) / LOA, (y + 7) / 14);
      }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  /* flat transom, faces aft */
  function transom(THREE, g, T) {
    var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, s;
    [[T.under, zb, 0.0], [T.hull, 0.0, zd]].forEach(function (bd) {
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
  /* AK-630M: a low drum and the domed turret, the six-barrel gun out of
     its front [E] */
  function ak630(THREE, g, T) {
    cylZ(THREE, g, 0.62, 0.7, 0.45, 12, T.sup, 0, 0, 0.22);
    var sg = new THREE.SphereGeometry(0.78, 14, 7, 0, PI * 2, 0, PI / 2); sg.rotateX(PI / 2); sg.scale(1.15, 0.95, 1.15);
    var d = new THREE.Mesh(sg, T.sup); d.position.set(0, 0, 0.45); g.add(d);
    cylX(THREE, g, 0.15, 0.15, 1.7, 8, T.gun, 1.45, 0, 0.85, true);
    cylX(THREE, g, 0.24, 0.24, 0.45, 8, T.gun, 0.75, 0, 0.85);
  }
  /* Kashtan (Kortik-M) combat module on its faceted pedestal [C][E][F] */
  function kashtan(THREE, g, T, B) {
    var b0 = ringZ(chamRect(-1.45, 1.45, 1.4, 0.5), 0), b1 = ringZ(chamRect(-1.15, 1.15, 1.1, 0.42), 1.05);
    solid(B.sup, B.deck, [b0, b1], false, true);
    cylZ(THREE, g, 0.85, 0.95, 0.35, 14, T.metal, 0, 0, 1.22);
    /* the command module, the radar box and its dish, the TV/EO head */
    box(THREE, g, 1.5, 1.15, 1.05, T.sup, -0.1, 0, 1.92);
    box(THREE, g, 0.22, 1.05, 0.95, T.metal, -0.95, 0, 2.05);
    cylZ(THREE, g, 0.42, 0.42, 0.18, 12, T.metal, 0.35, 0.0, 2.45);
    box(THREE, g, 0.5, 0.42, 0.42, T.dark, 0.35, 0.0, 2.72);
    /* each side: the GSh-6-30K six-barrel gun and a block of four
       missile containers above it [C] */
    [1, -1].forEach(function (s) {
      box(THREE, g, 1.25, 0.55, 0.62, T.sup, 0.1, s * 0.95, 1.75);
      strut(THREE, g, T.gun, 0.6, s * 0.95, 1.72, 2.25, s * 0.95, 2.35, 0.13, 8);
      strut(THREE, g, T.gun, 0.6, s * 0.95, 1.72, 1.05, s * 0.95, 1.9, 0.2, 8);
      box(THREE, g, 1.35, 0.5, 0.55, T.sup, -0.15, s * 0.98, 2.42, 0);
      for (var q = 0; q < 4; q++)
        box(THREE, g, 0.04, 0.2, 0.2, T.dark, 0.53, s * (0.98 + ((q % 2) - 0.5) * 0.23), 2.42 + (q > 1 ? 0.12 : -0.12));
    });
  }
  /* one 3S-24 quadruple Uran launcher: 2 x 2 canisters, domed fore caps,
     raised 12 deg, on a cradle; local +X is its line of fire [E] */
  function uranPack(THREE, g, T) {
    var a = new THREE.Group(); a.rotation.y = -0.21; g.add(a);
    for (var r = 0; r < 2; r++) for (var c = 0; c < 2; c++) {
      var y = (c - 0.5) * 0.56, z = (r - 0.5) * 0.56;
      cylX(THREE, a, 0.25, 0.25, 4.2, 10, T.white, 0, y, z);
      var cp = new THREE.SphereGeometry(0.25, 10, 5, 0, PI * 2, 0, PI / 2); cp.rotateZ(-PI / 2);
      var m = new THREE.Mesh(cp, T.white); m.position.set(2.1, y, z); a.add(m);
      cylX(THREE, a, 0.27, 0.27, 0.12, 10, T.metal, -1.6, y, z);
      cylX(THREE, a, 0.27, 0.27, 0.12, 10, T.metal, 1.2, y, z);
    }
    box(THREE, a, 0.3, 1.3, 1.3, T.metal, -2.15, 0, 0);
    box(THREE, g, 3.0, 1.0, 0.3, T.metal, 0, 0, -0.95);
  }
  /* PK-10 ten-tube decoy launcher, tubes raised 45 deg */
  function pk10(THREE, g, T) {
    box(THREE, g, 0.7, 0.9, 0.35, T.sup, 0, 0, 0.18);
    var a = new THREE.Group(); a.position.set(0, 0, 0.45); a.rotation.y = -PI / 4; g.add(a);
    box(THREE, a, 0.75, 0.82, 0.38, T.sup, 0, 0, 0);
    for (var k = 0; k < 5; k++) box(THREE, a, 0.04, 0.12, 0.12, T.dark, 0.38, -0.32 + k * 0.16, 0.08);
  }
  function railRun(THREE, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * Math.max(0.1, halfB(x) - 0.12); z = deckZ(x);
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.02, 3);
        }
        prev = [x, y, z];
      }
    }
  }

  /* ---------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var B = { sup: new Bag(), deck: new Bag(), dark: new Bag(), glass: new Bag(), hull: new Bag() };
    var s, i, x;

    /* hull shell in two bands (red below the waterline [B]), transom, the
       pad deck aft and the forecastle deck; the deck under the
       superstructure is never seen */
    g.add(shellBand(THREE, T.under, -5, 0.0, 5));
    g.add(shellBand(THREE, T.hull, 0.0, 9, 8));
    transom(THREE, g, T);
    g.add(deckSheet(THREE, T.deck, XS0, -32.6));
    g.add(deckSheet(THREE, T.deck, 13.5, XS1));

    /* THE FLUSH SUPERSTRUCTURE [A][E]: the hull side carried on up from the
       knuckle, leaning in, to 8.3 m abaft x -21.5 and 9.6 m forward of it,
       then the long slope down to the Kashtan platform.  Open between
       x -12.6 and -7.9 for the Uran well.  Lofted station by station. */
    function topZ(x) {
      if (x < -21.5) return 8.3;
      if (x < -21.3) return 8.3 + (x + 21.5) / 0.2 * 1.3;
      if (x <= 7.0) return 9.6;
      return 9.6 - (x - 7.0) / 7.0 * 2.0;
    }
    function flushRing(x) {
      var zk = deckZ(x), zt = topZ(x), wk = halfB(x), wt = wallY(x, zt);
      return [[x, -wk, zk], [x, -wt, zt], [x, wt, zt], [x, wk, zk]];
    }
    function flush(x0, x1) {
      var xs = [x0], xx;
      [-21.5, -21.3, 0, 7.0, 10.5].forEach(function (v) { if (v > x0 && v < x1) xs.push(v); });
      for (xx = Math.ceil(x0 / 4) * 4; xx < x1; xx += 4) if (xx > x0) xs.push(xx);
      xs.push(x1); xs.sort(function (a, b) { return a - b; });
      xs = xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
      solid(B.sup, B.deck, xs.map(flushRing), true, true);
    }
    flush(-32.9, -12.6);
    flush(-7.9, 14.0);
    /* the Uran well: its side walls, floor and dark inside [E] */
    (function () {
      var x0 = -12.6, x1 = -7.9;
      [1, -1].forEach(function (s2) {
        var rs = [x0, x1].map(function (xw) {
          var zk = deckZ(xw), wk = halfB(xw), wt = wallY(xw, 9.6);
          return [[xw, s2 * wk, zk], [xw, s2 * wt, 9.6], [xw, s2 * (wt - 0.35), 9.6], [xw, s2 * (wt - 0.35), 6.8]];
        });
        solid(B.sup, B.deck, rs, true, true);
        panel(B.dark, rs[0], rs[1], 2, 3, 0, 1, 0, 1, 0.02, [(x0 + x1) / 2, s2 * 7, 8]);
      });
      box(THREE, g, x1 - x0, 9.4, 0.12, T.dark, (x0 + x1) / 2, 0, 6.82);
      box(THREE, g, 0.04, 10.4, 2.8, T.dark, x0 + 0.03, 0, 8.2);
      box(THREE, g, 0.04, 10.4, 2.8, T.dark, x1 - 0.03, 0, 8.2);
      /* the forward pack fires to port (its caps face the camera in [E],
         which looks down on her port side), the after one to starboard */
      var u1 = new THREE.Group(); u1.position.set(-11.4, -0.25, 8.0); u1.rotation.z = PI / 2; uranPack(THREE, u1, T); g.add(u1);
      var u2 = new THREE.Group(); u2.position.set(-9.1, 0.25, 8.0); u2.rotation.z = -PI / 2; uranPack(THREE, u2, T); g.add(u2);
    })();

    /* the Kashtan platform abaft the gun, red-brown on top [E][F] */
    var KP0 = ringZ([[13.4, -4.7], [20.4, -4.7], [21.6, -3.4], [21.6, 3.4], [20.4, 4.7], [13.4, 4.7]], 6.4);
    var KP1 = ringZ([[13.4, -4.45], [20.2, -4.45], [21.3, -3.25], [21.3, 3.25], [20.2, 4.45], [13.4, 4.45]], 7.6);
    var kpRef = solid(B.sup, B.deck, [KP0, KP1], false, true);
    for (s = -1; s <= 1; s += 2) panel(B.dark, KP0, KP1, s > 0 ? 4 : 0, s > 0 ? 5 : 1, 0.55, 0.72, 0.15, 0.8, 0.02, kpRef);

    /* the forecastle bulwark, the light band over the dark hull [C][F] */
    (function () {
      var xs = [], xx;
      for (xx = 13.6; xx <= 38.01; xx += 2.0) xs.push(xx);
      [1, -1].forEach(function (s2) {
        var rs = xs.map(function (xb) {
          var h = xb < 33 ? 0.95 : 0.95 * (38 - xb) / 5, zk = deckZ(xb), wk = halfB(xb);
          return [[xb, s2 * wk, zk], [xb, s2 * (wk - TH * h), zk + h + 0.01], [xb, s2 * (wk - TH * h - 0.12), zk + h + 0.01], [xb, s2 * (wk - 0.12), zk]];
        });
        solid(B.sup, null, rs, true, true);
      });
    })();
    railRun(THREE, g, T, 37.0, 51.4, 1.8, 1.0);

    /* THE BRIDGE BLOCK [A][F][G]: the big front slope off the platform up to
       the window band at 12.0-12.9 m, roof 13.5 m, sides leaning in */
    var BR = [
      ringZ([[-7.8, -5.15], [8.6, -5.15], [13.4, -2.4], [13.4, 2.4], [8.6, 5.15], [-7.8, 5.15]], 7.6),
      ringZ([[-7.8, -4.55], [6.8, -4.55], [8.7, -2.05], [8.7, 2.05], [6.8, 4.55], [-7.8, 4.55]], 12.0),
      ringZ([[-7.8, -4.42], [6.3, -4.42], [8.0, -1.95], [8.0, 1.95], [6.3, 4.42], [-7.8, 4.42]], 12.9),
      ringZ([[-7.8, -4.3], [5.7, -4.3], [7.25, -1.85], [7.25, 1.85], [5.7, 4.3], [-7.8, 4.3]], 13.5)
    ];
    var brRef = solid(B.sup, B.deck, BR, false, true);
    /* windows round the front and the forward sides [F][G]: faces 1-3 are
       the front facets, 0 and 4 the sides (glazed over their forward part) */
    [[0, 1, 4, 0.62, 1.0], [1, 2, 3, 0, 1], [2, 3, 4, 0, 1], [3, 4, 3, 0, 1], [4, 5, 4, 0.0, 0.38]].forEach(function (f) {
      var nn = f[2], ua = f[3], ub = f[4];
      for (var k = 0; k < nn; k++) {
        var a = ua + (ub - ua) * (0.08 + 0.84 * k / nn), b = ua + (ub - ua) * (0.08 + 0.84 * (k + 0.72) / nn);
        panel(B.glass, BR[1], BR[2], f[0], f[1], a, b, 0.18, 0.82, 0.03, brRef);
      }
    });
    /* doors and vents down the 9.6 m side [A] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.0, 0.05, 1.9, T.dark, -4.0, s * (wallY(-4, 7) + 0.0), 7.1, s * TH * 0);
      box(THREE, g, 1.0, 0.05, 1.9, T.dark, 3.5, s * (wallY(3.5, 7) + 0.0), 7.3);
    }
    /* the louvre panel abaft the step, starboard [A] */
    for (i = 0; i < 4; i++) box(THREE, g, 0.22, 0.06, 1.4, T.dark, -17.3 + i * 0.4, -(wallY(-17, 8.4) + 0.02), 8.4);
    /* rails along the 01 roof walkway beside the bridge [E], whips [B][F] */
    for (s = -1; s <= 1; s += 2) {
      var rp = [[-7.6, wallY(-7.6, 9.6) - 0.08], [6.8, wallY(6.8, 9.6) - 0.08], [10.2, 4.0]];
      for (i = 0; i < rp.length - 1; i++) {
        var ra = rp[i], rb = rp[i + 1], nseg = Math.max(1, Math.round(Math.hypot(rb[0] - ra[0], rb[1] - ra[1]) / 1.8));
        for (var k = 0; k <= nseg; k++) {
          var rxp = ra[0] + (rb[0] - ra[0]) * k / nseg, ryp = ra[1] + (rb[1] - ra[1]) * k / nseg, rzp = rxp > 7 ? 9.6 - (rxp - 7) / 7 * 2 : 9.6;
          strut(THREE, g, T.metal, rxp, s * ryp, rzp, rxp, s * ryp, rzp + 1.0, 0.03, 3);
        }
        var za = ra[0] > 7 ? 9.6 - (ra[0] - 7) / 7 * 2 : 9.6, zb2 = rb[0] > 7 ? 9.6 - (rb[0] - 7) / 7 * 2 : 9.6;
        strut(THREE, g, T.metal, ra[0], s * ra[1], za + 1.0, rb[0], s * rb[1], zb2 + 1.0, 0.025, 3);
        strut(THREE, g, T.metal, ra[0], s * ra[1], za + 0.5, rb[0], s * rb[1], zb2 + 0.5, 0.02, 3);
      }
      strut(THREE, g, T.metal, 1.5, s * 4.2, 13.5, 1.5, s * 4.2, 19.5, 0.045, 4, 0.02);
      strut(THREE, g, T.metal, -2.5, s * 4.2, 13.5, -2.5, s * 4.2, 18.5, 0.045, 4, 0.02);
      strut(THREE, g, T.metal, -20.5, s * 5.0, 9.6, -20.5, s * 5.0, 15.0, 0.045, 4, 0.02);
    }
    /* life rafts on the 01 roof walkway beside the bridge [E] */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++)
      cylX(THREE, g, 0.3, 0.3, 1.45, 10, T.white, -6.6 + i * 1.75, s * 5.25, 9.92);

    /* THE TOWER [A][G]: a chamfered composite mast (the Monument fairing),
       tapering to 19.5 m then upright to 21.4 m; dark panels high on its
       sides; the white Furke dome on top, forward */
    var TW = [ringZ(chamRect(-5.0, 2.9, 2.75, 0.95), 13.4), ringZ(chamRect(-4.1, 2.3, 2.2, 0.75), 19.5),
              ringZ(chamRect(-4.0, 2.2, 2.12, 0.72), 21.4)];
    var twRef = solid(B.sup, B.deck, TW, false, true);
    [0, 4].forEach(function (f) { panel(B.dark, TW[0], TW[1], f, f + 1, 0.3, 0.92, 0.55, 0.97, 0.03, twRef); });
    cylZ(THREE, g, 1.05, 1.2, 0.7, 14, T.sup, 0.7, 0, 21.75);
    sphere(THREE, g, 1.42, 24, 14, T.white, 0.7, 0, 23.45);
    /* the column on the tower's after face, its platforms with the small
       domes [G], the yards [A] and the topmast to 32 m */
    box(THREE, g, 1.0, 1.0, 18.6, T.sup, -4.75, 0, 22.7);
    [[15.8, -1], [18.2, 1], [20.6, -1], [23.0, 1]].forEach(function (pl) {
      box(THREE, g, 1.6, 1.8, 0.12, T.metal, -5.0, pl[1] * 0.9, pl[0]);
      sphere(THREE, g, 0.34, 10, 6, T.white, -5.0, pl[1] * 1.3, pl[0] + 0.42);
      cylZ(THREE, g, 0.18, 0.18, 0.18, 8, T.metal, -5.0, pl[1] * 1.3, pl[0] + 0.12);
      var ry = pl[1] * 1.75;
      strut(THREE, g, T.metal, -5.8, ry, pl[0] + 0.9, -4.2, ry, pl[0] + 0.9, 0.02, 3);
      strut(THREE, g, T.metal, -5.8, ry, pl[0], -5.8, ry, pl[0] + 0.9, 0.02, 3);
      strut(THREE, g, T.metal, -4.2, ry, pl[0], -4.2, ry, pl[0] + 0.9, 0.02, 3);
    });
    strut(THREE, g, T.metal, -4.75, 0, 32.0, -4.75, 0, 27.0, 0.08, 6, 0.12);
    box(THREE, g, 0.24, 4.8, 0.18, T.metal, -4.5, 0, 26.2);
    box(THREE, g, 0.2, 2.5, 0.14, T.metal, -4.75, 0, 29.4);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.45, 0.3, 0.3, T.metal, -4.5, s * 2.2, 26.0);
      strut(THREE, g, T.metal, -4.5, s * 2.2, 26.2, -4.5, s * 2.2, 27.4, 0.03, 3);
      box(THREE, g, 0.35, 0.25, 0.25, T.metal, -4.75, s * 1.15, 29.25);
    }
    box(THREE, g, 2.4, 0.22, 0.2, T.metal, -4.0, 0, 24.6);
    /* THE PUMA 5P-10 director on the bridge roof, forward [G][F] */
    cylZ(THREE, g, 0.45, 0.6, 0.7, 10, T.sup, 4.5, 0, 13.85);
    box(THREE, g, 1.25, 1.4, 1.25, T.sup, 4.5, 0, 14.85);
    box(THREE, g, 0.12, 1.15, 1.0, T.metal, 5.16, 0, 14.85);
    /* sensor posts and an EO head on the bridge roof corners */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.2, 0.25, 0.8, 8, T.sup, 3.6, s * 3.3, 13.9);
      sphere(THREE, g, 0.32, 10, 6, T.sup, 3.6, s * 3.3, 14.55);
      strut(THREE, g, T.metal, -6.8, s * 3.6, 13.5, -6.8, s * 3.6, 18.0, 0.05, 4, 0.025);
    }
    box(THREE, g, 2.4, 0.9, 0.04, T.team, -6.4, 0, 13.52);

    /* THE HANGAR BLOCK [A][D][E]: x -33.0 to -15.0, 11.6 m roof (dark,
       sooty), its after face the hangar door over the pad */
    var HG = [ringZ(chamRect(-33.0, -14.4, 4.25, 0.3), 4.0), ringZ(chamRect(-33.0, -14.4, 4.25, 0.3), 8.3),
              ringZ(chamRect(-33.0, -14.4, 3.95, 0.3), 11.6)];
    var hgRef = solid(B.sup, B.deck, HG, false, true);
    /* the roller door and its frame [D] */
    panel(B.dark, HG[0], HG[2], 6, 7, 0.06, 0.94, 0.0, 0.72, 0.03, hgRef);
    for (i = 1; i < 6; i++) box(THREE, g, 0.05, 0.05, 5.4, T.metal, -33.06, -3.2 + i * 1.07, 6.75);
    box(THREE, g, 0.1, 7.6, 0.18, T.sup, -33.08, 0, 9.55);
    /* OSPV posts on the hangar roof, small domes [E] (wiki) */
    sphere(THREE, g, 0.3, 10, 6, T.white, -28.5, 2.4, 11.95);
    cylZ(THREE, g, 0.12, 0.12, 0.35, 6, T.metal, -28.5, 2.4, 11.75);
    sphere(THREE, g, 0.3, 10, 6, T.white, -23.0, -2.4, 11.95);
    cylZ(THREE, g, 0.12, 0.12, 0.35, 6, T.metal, -23.0, -2.4, 11.75);
    for (i = 0; i < 4; i++) cylZ(THREE, g, 0.08, 0.08, 1.2, 5, T.metal, -31.5 + i * 3.6, i % 2 ? 3.3 : -3.3, 12.2);
    box(THREE, g, 3.0, 0.9, 0.04, T.team, -26.0, 0, 11.62);

    /* THE BLACK PYLON (exhausts) on the hangar's fore end, tapering, its own
       short mast and yards [A][B][E] */
    var PY = [ringZ(chamRect(-19.8, -14.6, 2.2, 0.4), 11.4), ringZ(chamRect(-19.8, -14.6, 2.2, 0.4), 11.8),
              ringZ(chamRect(-19.0, -15.3, 1.25, 0.3), 13.4), ringZ(chamRect(-17.6, -16.3, 0.45, 0.15), 20.4)];
    var pyRef = solid(B.dark, B.dark, PY, false, true);
    /* the open frame look of [B]: lighter slots in its flanks */
    /* the exhaust openings in its flanks, and its mast, yards, lamps [A][B] */
    for (s = -1; s <= 1; s += 2) panel(B.glass, PY[2], PY[3], s > 0 ? 4 : 0, s > 0 ? 5 : 1, 0.25, 0.75, 0.05, 0.4, 0.02, pyRef);
    strut(THREE, g, T.dark, -16.95, 0, 20.3, -16.95, 0, 25.6, 0.07, 6, 0.13);
    box(THREE, g, 0.2, 3.6, 0.16, T.dark, -16.95, 0, 22.1);
    box(THREE, g, 0.18, 2.0, 0.14, T.dark, -16.95, 0, 24.1);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.35, 0.25, 0.25, T.dark, -16.95, s * 1.65, 21.9);
      strut(THREE, g, T.dark, -16.95, s * 1.65, 22.1, -16.95, s * 1.65, 23.0, 0.03, 3);
    }
    /* the grille deck between the pylon and the Uran well [E] */
    box(THREE, g, 1.7, 7.8, 0.06, T.dark, -13.5, 0, 9.62);
    for (i = 0; i < 6; i++) box(THREE, g, 1.7, 0.06, 0.08, T.metal, -13.5, -3.6 + i * 1.44, 9.68);

    /* AK-630M at the fore corners of the after block, on the 9.6 m roof:
       the port one in [E][F], the starboard one mirrored */
    for (s = -1; s <= 1; s += 2) {
      var ac = new THREE.Group(); ac.position.set(-13.4, s * 4.85, 9.6); ac.rotation.z = s * 0.5; ak630(THREE, ac, T); g.add(ac);
    }
    /* a boat each side on the 8.3 m ledge under its davit: the starboard
       one in [A], the port one in [E] */
    [1, -1].forEach(function (sb) {
      var bx = -27.0, by = sb * 5.0, bz = 8.3;
      var hb = [ringZ([[bx - 3.4, by - 0.75], [bx + 2.4, by - 1.0], [bx + 3.5, by], [bx + 2.4, by + 1.0], [bx - 3.4, by + 0.75]], bz + 0.25),
                ringZ([[bx - 3.5, by - 1.0], [bx + 2.5, by - 1.05], [bx + 3.7, by], [bx + 2.5, by + 1.05], [bx - 3.5, by + 1.0]], bz + 1.05)];
      solid(B.hull, null, hb, true, false);
      box(THREE, g, 2.0, 1.4, 0.7, T.white, bx - 0.6, by, bz + 1.4);
      box(THREE, g, 6.8, 1.9, 0.08, T.white, bx, by, bz + 1.06);
      box(THREE, g, 1.0, 0.6, 0.25, T.metal, bx - 2.5, by, bz + 0.12);
      box(THREE, g, 1.0, 0.6, 0.25, T.metal, bx + 2.0, by, bz + 0.12);
      strut(THREE, g, T.metal, bx + 1.8, sb * 3.95, 8.3, bx + 1.8, sb * 3.95, 11.3, 0.12, 6);
      strut(THREE, g, T.metal, bx + 1.8, sb * 3.95, 11.3, bx + 1.0, by, 11.0, 0.1, 6);
      strut(THREE, g, T.metal, bx + 1.0, by, 11.0, bx + 1.0, by, 9.9, 0.02, 3);
    });
    /* PK-10 decoys: two at the after corners of the block over the pad, two
       abaft the A-190 [wiki] */
    for (s = -1; s <= 1; s += 2) {
      var d1 = new THREE.Group(); d1.position.set(-32.0, s * 4.95, 8.3); d1.rotation.z = s * PI / 2 + PI; pk10(THREE, d1, T); g.add(d1);
      var d2 = new THREE.Group(); d2.position.set(22.3, s * 3.3, deckZ(22.3)); d2.rotation.z = s * PI / 2; pk10(THREE, d2, T); g.add(d2);
    }

    /* forecastle fittings: windlasses, bollards, the stem anchor, hawses */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.38, 0.42, 0.45, 10, T.metal, 40.0, s * 1.1, deckZ(40) + 0.22);
      [33.0, 46.5].forEach(function (bx2) {
        cylZ(THREE, g, 0.15, 0.15, 0.45, 6, T.metal, bx2 - 0.25, s * (halfB(bx2) - 0.55), deckZ(bx2) + 0.22);
        cylZ(THREE, g, 0.15, 0.15, 0.45, 6, T.metal, bx2 + 0.25, s * (halfB(bx2) - 0.55), deckZ(bx2) + 0.22);
      });
      var hz = 5.9, hx = 42.0, hw = W(hx, hz);
      var hs = new THREE.Mesh(new THREE.CircleGeometry(0.32, 10), T.dark);
      hs.rotation.x = -s * PI / 2; hs.position.set(hx, s * (hw + 0.03), hz); g.add(hs);
      /* scuttles forward [F] */
      for (i = 0; i < 5; i++) {
        var sx2 = 27.0 + i * 3.0, sz = 4.9, sc = new THREE.Mesh(new THREE.CircleGeometry(0.17, 8), T.dark);
        sc.rotation.x = -s * PI / 2; sc.position.set(sx2, s * (W(sx2, sz) + 0.03), sz); g.add(sc);
      }
    }
    box(THREE, g, 0.9, 0.5, 0.7, T.dark, 48.6, 0, 2.6);
    strut(THREE, g, T.metal, 51.6, 0, deckZ(51.6), 51.6, 0, deckZ(51.6) + 2.4, 0.04, 4);
    box(THREE, g, 2.4, 0.9, 0.04, T.team, 31.0, 0, deckZ(31) + 0.02);

    /* underwater: two shafts on A-brackets, props, twin rudders */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.2, 0.2, 9.0, 8, T.metal, -41.5, s * 2.5, -2.6);
      strut(THREE, g, T.metal, -45.2, s * 2.5, -2.6, -45.2, s * 3.1, -1.6, 0.12, 4);
      cylX(THREE, g, 0.3, 0.42, 0.8, 8, T.metal, -46.4, s * 2.5, -2.6);
      for (i = 0; i < 5; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.42, 1.0), T.metal);
        bl.position.set(-46.4, s * 2.5, -2.6); bl.rotation.x = i * 2 * PI / 5 + 0.35;
        bl.translateZ(0.65); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 2.0, 0.18, 2.1, T.metal, -48.4, s * 2.3, -1.7);
    }

    /* the bags go in as meshes */
    [["sup", T.sup], ["deck", T.deck], ["dark", T.dark], ["glass", T.glass], ["hull", T.hull]].forEach(function (pr) {
      var mm = B[pr[0]].mesh(THREE, pr[1]);
      if (mm) g.add(mm);
    });

    /* THE A-190 ("turret") [C][E]: faceted gunhouse, flat sides with two
       doors, the big front slope, the jacketed 100 mm barrel; its round base
       ring on the forecastle */
    var GX = 26.0, GZ = deckZ(GX);
    cylZ(THREE, g, 2.05, 2.15, 0.3, 24, T.sup, GX - 0.3, 0, GZ + 0.15);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(GX, 0, GZ + 0.3);
    var tb = { sup: new Bag(), dark: new Bag(), gun: new THREE.Group() };
    var G0 = ringZ(chamRect(-2.5, 2.3, 1.5, 0.35), 0), G1 = ringZ(chamRect(-2.5, 2.1, 1.45, 0.32), 1.25),
        G2 = ringZ(chamRect(-2.45, 0.1, 1.32, 0.3), 2.45);
    var gRef = solid(tb.sup, tb.sup, [G0, G1, G2], false, true);
    for (s = -1; s <= 1; s += 2) {
      var f0 = s > 0 ? 4 : 0;
      panel(tb.dark, G0, G1, f0, f0 + 1, 0.15, 0.3, 0.2, 0.95, 0.02, gRef);
      panel(tb.dark, G0, G1, f0, f0 + 1, 0.45, 0.6, 0.2, 0.95, 0.02, gRef);
    }
    cylX(THREE, tb.gun, 0.24, 0.3, 0.8, 12, T.gun, 2.45, 0, 1.0);
    cylX(THREE, tb.gun, 0.15, 0.15, 3.0, 12, T.gun, 4.2, 0, 1.0);
    cylX(THREE, tb.gun, 0.1, 0.1, 2.4, 10, T.gun, 6.8, 0, 1.0, true);
    cylX(THREE, tb.gun, 0.13, 0.13, 0.35, 10, T.gun, 7.9, 0, 1.0);
    tb.gun.add(tb.sup.mesh(THREE, T.sup)); tb.gun.add(tb.dark.mesh(THREE, T.dark));

    /* the Kashtan (baked), on its platform */
    var kg = new THREE.Group(); kg.position.set(17.3, 0, 7.6);
    var kb = { sup: new Bag(), deck: new Bag() };
    kashtan(THREE, kg, T, kb);
    kg.add(kb.sup.mesh(THREE, T.sup)); kg.add(kb.deck.mesh(THREE, T.sup));
    g.add(kg);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tbk = bake(THREE, tb.gun);
    tbk.children.slice().forEach(function (c) { tw.add(c); });
    root.add(tw);
    root.userData.heroLen = LOA;
    return root;
  }
  return { build: build, len: LOA };
})();

/* pact_e00_corvette is the def itself (eras.js); len is the X extent. */
UNIT_MODELS["pact_e00_corvette"] = {
  len: 104.5,
  build: function (THREE, M, C) { return HeroSteregushchiy.build(THREE, M, C); }
};
