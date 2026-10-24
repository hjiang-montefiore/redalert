/* ==================== js/hero/ru_kiev.js ===============================
   HERO MODEL -- Project 1143.3 heavy aviation cruiser NOVOROSSIYSK, the third
   of the Kiev class (Krechyet), as photographed 1983-86.
   Key: pact_e80_carrier ("Project 1143 Kiev", full "Project 1143 Krechyet
   (Novorossiysk)", e80, service 1982).

   PUBLISHED FIGURES (Russian Wikipedia "Novorossiysk (aviation cruiser)",
   after russian-ships.info): length overall 273.1 m (drawn 273.1), flight
   deck beam 51.3 m (drawn 51.2), waterline beam 31.0 m (drawn 31.0; the
   previous file used English Wikipedia's 32.6), draught 8 m standard and
   9.3 m full (drawn 8.6), keel to masthead 61.6 m (drawn 62.2 to the whip
   on the ball), waterline length 235.8 m (NOT matched: D1's foot gives
   246.3, stern -128.5 to stem +117.8, and that is drawn), the angled
   deck at 4.5 degrees (drawn), two lifts - the aircraft lift "in the
   midships area", the helicopter lift "behind the superstructure".
   Armament as built: 4 twin P-500 Bazalt, 2 twin M-11 Shtorm, 2 twin
   AK-726, 8 AK-630, 1 RPK-1 Vikhr (SUW-N-1), 2 RBU-6000; NO torpedo tubes
   and no Osa-M (both fitted to Kiev and Minsk).

   REFERENCES (Wikimedia Commons, fetched at 960 px, all read):
     D1 "Kiev class aircraft carrier profile 1986.png" - recognition profile
        from starboard with a 274 m bar (3.36 px/m): the waterline length
        (stern -128.5, stem +117.8 at the drawing's foot), the flight deck at
        12.6, the island tiers (14.6, 17.8, 23.5, the tower 34.5 from x -12 to
        +25, 30.0 and 22.5 forward), the funnel's raked top on the tower's
        after end, the ball at x +10 (top 51.8), the tilted antenna forward
        of it, the dish posts at x -26, -20, +31, +40, the gallery scuttle
        row under the flight deck, the open boat bays in the quarters.
     P1 "Kiev-class Novorossiysk DD-ST-85-06598 r.jpg" (USN 1985, starboard
        bow from above): the forecastle battery in order - the RBU-6000 on
        its curved base, the SUW-N-1 with its arm raised, the M-11 on its
        tall drum, the white-domed AK-726 on a raised base between the four
        twin Bazalt boxes (two each side, fore and aft rows); the island
        with its galleries and white domes; the dark flight deck with white
        lines; the red-brown forecastle deck; the light grey hull.
        PAINT sampled here: hull 0xbcc1c3-0xd0d2ce, island 0xa2a6aa, flight
        deck 0x555058, forecastle deck 0x81645f-0x7f6f72 (all taken to about
        0.8-0.9 below: hull 0xa0a5a8, island 0x8f9498, deck 0x4c4a4f,
        forecastle 0x6c5450).
     P2 "Kiev-class Novorossiysk DN-SN-86-06938 r.jpg" (USN 1986, port side
        of the island): forward to aft on the tower roof - the tilted lattice
        antenna (Top Sail) on its cone, the ball on the lattice tripod with
        its yard, the planar array on a post (both turn; both are drawn
        trained 45 degrees to port, the way P2 and P4 show their faces),
        the funnel's raked casing; the
        directors at the island's ends; the island's raked upper faces.
     P3 "Aircraft carrier "Novorossiysk" in 1984.jpeg" (from above the port
        quarter): the deck plan - the angled strip's two edge lines, dashed
        centreline, six spots with cross lines, the circles near the stern,
        the aircraft lift open beside the island's forward part, the island
        on the starboard edge.
     P4 "Novorossijsk Kiev-class 1986.jpg" (port bow): the Top Sail seen
        edge-on in front of the ball, the AK-630s on a sponson under the
        angled deck's forward end, the forecastle order.
     P5 "Aircraft carrier "Novorossiysk" in 1983.jpeg" (port broadside) and
        "Aircraft carrier "Novorossiysk" in 1986.JPEG" (bow on): the sheer,
        the overhang of the angled deck to port, the stern recesses.
     P6 "Kiev 1985 DN-SN-86-00684r.jpg" (KIEV, for comparison only): the
        lift aft of the island, the AK-630s on the stern quarter sponsons.

   RECOGNITION LIST (where each shows):
     1. the angled flight deck down the port side, 4.5 degrees, 51.3 m
        across, with its sponson and soffit (P3, P5) - EP table, soffit;
     2. the long island on the starboard edge with stepped tiers forward
        and aft of a tall tower (D1, P1, P2) - island tiers;
     3. the ball radome on its lattice tripod and yard (D1, P2, P4);
     4. the Top Sail antenna tilted on its cone forward of the ball and the
        planar array aft of it (D1, P2, P4);
     5. the raked funnel casing on the tower's after end (D1, P2);
     6. four twin P-500 Bazalt boxes, two rows a side, raised forward (P1);
     7. the AK-726 between them, the M-11 on its drum, the SUW-N-1 and
        the RBU-6000s forward (P1, P4);
     8. the raked, flared bow and the high forecastle sheer (D1, P4, P5);
     9. the red-brown forecastle deck against the dark grey flight deck
        with white strip lines and spots (P1, P3);
    10. the AK-630 pairs: island front, under the angled deck's forward
        end, the stern quarters (D1, P4; the stern pairs as on P6);
    11. the light grey hull with a dark boot-top and the gallery scuttle row
        under the flight deck (P1, D1).

   WHAT DIFFERS ON NOVOROSSIYSK FROM KIEV AND MINSK, AS DRAWN: no Osa-M
   (Kiev and Minsk had two pop-up launchers beside the island), no torpedo
   tubes in hull recesses, larger air group (36, so a busier deck); built
   with three Yak-41 blast grates later removed (1979, so not drawn). The
   island, masts and forecastle battery read the same at this scale.

   CORRECTED from the previous version of this file: the forward M-11 stood
   between the Bazalt rows and the AK-726 at the bow - P1 shows the domed
   AK-726 between the rows and the M-11 on its drum forward of them; the
   leading-edge "fairing" is not visible in any photograph fetched (not
   drawn); waterline beam 31.0, deck beam 51.3; the Top Sail and the
   funnel casing were missing; the lifts are now painted (P3, Russian
   Wikipedia); the stern AK-630 pairs are on the quarter sponsons.

   NOT CONFIRMED, drawn plainly or not at all: the lift sizes (18.5 x 10.3 m
   drawn for both); the exact y of the mounts; the directors' identities
   (drawn as dish posts where D1 shows posts); the boats; rudders (not
   drawn); the anti-fouling colour (dark red-brown drawn, no photograph shows
   it). No hull number, name or ensign.

   NO TRAINED MOUNT: the row has no turret flag, so nothing is named
   "turret"; every mount is baked at rest.
   FLIGHT DECK: one flat top at z = 12.6 from the stern to x = +38 (nothing
   stands on it; lifts and markings are painted in its texture). deckOf
   reads it from the aft eighth of the plan.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. Static
   parts are merged into one mesh per material. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKiev = (function () {
  "use strict";
  var PI = Math.PI;
  var XS = -136.5, XB = 136.6;     /* stern and stem at the deck            */
  var FD = 12.6, FDU = 11.7;       /* flight deck top and underside         */
  var XFD1 = 38.0;                 /* forward end of the flat flight deck   */
  var XD0 = -138.0, XD1 = 48.0, YD0 = -19.0, YD1 = 35.0;   /* deck texture box */
  var HZ0 = -0.5, HZ1 = 17.0;      /* hull texture z range                  */

  var PAINT = { hull: "#a0a5a8", sup: "#8f9498", deck: "#4c4a4f", fc: "#6c5450",
                boot: "#1d1f21", under: "#5c3330", line: "#dcdcd6" };

  /* ------------------------------------------- station tables (D1, P5) */
  /* waterline half-beam (31.0 m) */
  var HW = [[-136.5, 6.0], [-128, 11.0], [-115, 14.4], [-95, 15.5], [35, 15.5], [60, 14.8],
            [80, 12.6], [100, 8.8], [112, 4.6], [118, 1.6], [136.6, 0.0]];
  /* hull half-width at its top edge (the flare up to the deck) */
  var HD = [[-136.5, 13.0], [-128, 15.8], [-115, 17.1], [-90, 17.6], [30, 17.6], [55, 17.2],
            [80, 15.6], [100, 12.2], [115, 7.6], [128, 3.2], [136.6, 0.4]];
  var KZ = [[-136.5, -1.6], [-124, -5.4], [-108, -8.6], [100, -8.6], [112, -6.4], [118, -4.0], [136.6, -2.0]];
  var BP = [[-136.5, 1.6], [-110, 2.6], [-60, 3.2], [60, 3.2], [100, 2.0], [136.6, 1.2]];
  var FL = [[-136.5, 1.9], [-60, 1.8], [0, 1.6], [60, 1.6], [100, 1.8], [136.6, 2.0]];
  /* flight deck edges: port (the angled sponson) and starboard, magnitudes */
  var EP = [[-136.5, 13.6], [-133, 16.4], [-128, 17.4], [-122, 17.8], [28, 29.6], [34, 33.4],
            [38.5, 33.4], [41.5, 25.0], [44.0, 18.6], [46.0, 17.6]];
  var ES = [[-136.5, 13.6], [-133, 16.4], [-128, 17.4], [-120, 17.8], [46.0, 17.8]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  function edgeP(x) { return tab(EP, x); }
  function edgeS(x) { return tab(ES, x); }
  /* the flat deck to x = 38, the step up to the forecastle at 14.4 (D1),
     then the sheer to 15.8 at the stem */
  function deckZ(x) {
    if (x <= XFD1) return FD;
    if (x < 46) { var f = (x - XFD1) / 8; return FD + (14.4 - FD) * f * f * (3 - 2 * f); }
    if (x <= 92) return 14.4;
    return 14.4 + 1.4 * Math.pow((Math.min(x, XB) - 92) / 44.6, 2);
  }
  function xStemAt(z) {
    if (z >= 0) return 117.8 + 18.8 * Math.pow(Math.min(1, z / 15.8), 0.9);
    return 117.8 - 9.0 * Math.pow(Math.min(1, -z / 8.6), 1.5);
  }
  function xSternAt(z) {
    if (z >= 0) return -128.5 - 8.0 * Math.min(1, z / 11.0);
    return -128.5 + 12.0 * Math.pow(Math.min(1, -z / 8.6), 1.6);
  }
  function xAt(xn, z) {
    var u = (xn - XS) / (XB - XS), a = xSternAt(z), b = xStemAt(z);
    return a + u * (b - a);
  }
  function hullTop(xn) { return xn <= XFD1 ? FDU : deckZ(xn); }
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var hd = tab(HD, xn), zr = hullTop(xn);
    return hw + (hd - hw) * Math.pow(Math.min(1, z / zr), tab(FL, xn));
  }
  /* the angled strip's centreline: 4.5 degrees, 10 m inboard of the edge */
  var TAN45 = Math.tan(4.5 * PI / 180);
  function axisA(x) { return 7.4 + TAN45 * (x + 122); }

  /* ---------------------------------------------------------- textures */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function finish(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); }
    else t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }
  /* plain plate in a colour, seams and a little weathering */
  function plateTex(THREE, col, seed) {
    var key = "s" + col + seed;
    if (TEX[key]) return TEX[key];
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(seed + 7), i;
    g.fillStyle = col; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 4; i++) {
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
    }
    g.globalAlpha = 0.07;
    for (i = 0; i < 40; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 12 + R() * 50, 8 + R() * 30);
    }
    g.globalAlpha = 0.09; g.fillStyle = "#2a2018";
    for (i = 0; i < 16; i++) g.fillRect(R() * W, R() * H, 2, 20 + R() * 40);
    g.globalAlpha = 1;
    return (TEX[key] = finish(THREE, cv, [1, 1]));
  }
  /* the hull sides along her length: boot-top, seams, the gallery scuttle
     row under the flight deck and a sparser row below (D1), hawse pipes, the
     dark boat bays in the quarters (D1, P5). Top half starboard, lower port. */
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 2048, H = 512, HH = H / 2, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(1143), i, x, s;
    var px = function (X) { return (X - XS) / (XB - XS) * W; };
    var pz = function (Z, top) { return (top ? 0 : HH) + (1 - (Z - HZ0) / (HZ1 - HZ0)) * HH; };
    var mz = HH / (HZ1 - HZ0), mx = W / (XB - XS);
    for (s = 0; s < 2; s++) {
      var top = s === 0;
      g.fillStyle = PAINT.hull; g.fillRect(0, pz(HZ1, top), W, pz(0.7, top) - pz(HZ1, top));
      g.fillStyle = PAINT.boot; g.fillRect(0, pz(0.7, top), W, pz(HZ0, top) - pz(0.7, top) + 1);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (x = -134; x < 136; x += 8.0) { g.beginPath(); g.moveTo(px(x), pz(16.5, top)); g.lineTo(px(x), pz(0.7, top)); g.stroke(); }
      [3.0, 6.2, 9.6].forEach(function (zz) { g.beginPath(); g.moveTo(0, pz(zz, top)); g.lineTo(W, pz(zz, top)); g.stroke(); });
      g.globalAlpha = 0.07;
      for (i = 0; i < 70; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * W, pz(2 + R() * 12, top), 20 + R() * 90, 3 + R() * 9);
      }
      g.globalAlpha = 0.15; g.fillStyle = "#3a2a20";
      for (i = 0; i < 46; i++) g.fillRect(R() * W, pz(11 - R() * 7, top), 1.5, 6 + R() * 14);
      g.globalAlpha = 1;
      /* the gallery scuttle row just under the flight deck, 3.4 m apart,
         rising with the sheer forward; a sparser row 2.4 m lower (D1) */
      g.fillStyle = "#15181a";
      for (x = -130; x <= 112; x += 3.4) {
        var zr = x > 40 ? 12.6 + (deckZ(x) - 14.4) * 0.8 : 10.9;
        g.fillRect(px(x) - 0.22 * mx, pz(zr, top), 0.45 * mx, 0.38 * mz);
        if (((x + 130) / 3.4 | 0) % 3 === 0) g.fillRect(px(x + 1.7) - 0.22 * mx, pz(zr - 2.4, top), 0.45 * mx, 0.38 * mz);
      }
      /* the boat bays in the quarters: three dark openings with pale frames (D1) */
      for (i = 0; i < 3; i++) {
        var xb = -115.5 + i * 9.6;
        g.fillStyle = "#cfd2d0"; g.fillRect(px(xb - 0.4), pz(8.9, top), 8.9 * mx, 6.2 * mz);
        g.fillStyle = "#101214"; g.fillRect(px(xb), pz(8.5, top), 8.1 * mx, 5.4 * mz);
      }
      /* the hawse pipes, high in the bow flare */
      g.fillStyle = "#121416";
      g.beginPath(); g.arc(px(119.0), pz(11.6, top), 0.6 * mz, 0, PI * 2); g.fill();
    }
    return (TEX.hull = finish(THREE, cv));
  }
  /* the flight deck in plan: dark plating, wear, the angled strip's edge
     lines, dashed centreline, six spots with their cross lines and the
     lines between them, the two circles near the stern (P3), the two lifts
     as outlines, the starboard edge line. No numbers or letters. */
  function deckTex(THREE) {
    if (TEX.fd) return TEX.fd;
    var W = 2048, H = 600, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(7311), i, x;
    var sx = W / (XD1 - XD0), sy = H / (YD1 - YD0);
    var px = function (X) { return (X - XD0) * sx; };
    var py = function (Y) { return (1 - (Y - YD0) / (YD1 - YD0)) * H; };
    g.fillStyle = PAINT.deck; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (x = -136; x < 48; x += 6) { g.beginPath(); g.moveTo(px(x), 0); g.lineTo(px(x), H); g.stroke(); }
    for (i = -18; i <= 34; i += 2) { g.beginPath(); g.moveTo(0, py(i)); g.lineTo(W, py(i)); g.stroke(); }
    g.globalAlpha = 0.08;
    for (i = 0; i < 220; i++) {
      g.fillStyle = R() < 0.6 ? "#000000" : "#bdb6b8";
      g.fillRect(R() * W, R() * H, 10 + R() * 60, 4 + R() * 18);
    }
    g.globalAlpha = 0.12; g.fillStyle = "#151515";
    for (i = 0; i < 60; i++) {
      var wx = -125 + R() * 150, wy = axisA(wx) + (R() - 0.5) * 9;
      g.save(); g.translate(px(wx), py(wy)); g.rotate(-TAN45);
      g.fillRect(0, -1, (6 + R() * 16) * sx, 1.2 + R() * 2.4); g.restore();
    }
    g.globalAlpha = 1;
    var L = PAINT.line;
    var seg = function (x0, y0, x1, y1, w) {
      g.strokeStyle = L; g.lineWidth = w * sx; g.beginPath(); g.moveTo(px(x0), py(y0)); g.lineTo(px(x1), py(y1)); g.stroke();
    };
    /* lifts: the aircraft lift beside the island's forward part (P3), the
       helicopter lift aft of the island (Russian Wikipedia; P6 on Kiev);
       a darker tone and an outline */
    [[2.0, 20.5, -3.6, 6.7], [-70.0, -51.5, -16.6, -6.3]].forEach(function (q) {
      g.fillStyle = "rgba(0,0,0,0.16)"; g.fillRect(px(q[0]), py(q[3]), (q[1] - q[0]) * sx, (q[3] - q[2]) * sy);
      g.strokeStyle = L; g.lineWidth = 0.3 * sx; g.strokeRect(px(q[0]), py(q[3]), (q[1] - q[0]) * sx, (q[3] - q[2]) * sy);
    });
    /* the angled strip: two solid edge lines, dashed centreline (P3) */
    seg(-130, axisA(-130) - 9.6, 34, axisA(34) - 9.6, 0.5);
    seg(-130, axisA(-130) + 9.0, 30, axisA(30) + 9.0, 0.5);
    for (x = -128; x < 30; x += 5) seg(x, axisA(x), x + 2.8, axisA(x + 2.8), 0.4);
    /* six spots with a bar, and the lines across the strip between them */
    for (i = 0; i < 6; i++) {
      var cx = -100 + i * 24.5, cy = axisA(cx);
      g.strokeStyle = L; g.lineWidth = 0.4 * sx;
      g.beginPath(); g.ellipse(px(cx), py(cy), 3.8 * sx, 3.8 * sy, 0, 0, PI * 2); g.stroke();
      seg(cx - 2.6, cy - 0.2, cx + 2.6, cy + 0.2, 0.35);
      var lx = cx + 12.2;
      if (i < 5) seg(lx + 0.75, axisA(lx) - 9.6, lx - 0.7, axisA(lx) + 9.0, 0.3);
    }
    /* the two overlapping circles near the stern, starboard of the strip (P3) */
    [[-114.0, -2.5], [-108.5, -1.0]].forEach(function (c) {
      g.strokeStyle = L; g.lineWidth = 0.4 * sx;
      g.beginPath(); g.ellipse(px(c[0]), py(c[1]), 5.6 * sx, 5.6 * sy, 0, 0, PI * 2); g.stroke();
    });
    /* starboard deck-edge line and the round-down line at the stern */
    seg(-128, -16.6, 0, -16.6, 0.3);
    seg(-134.6, -14.0, -134.6, 15.0, 0.4);
    return (TEX.fd = finish(THREE, cv));
  }

  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var tex = function (map, r) { return new THREE.MeshStandardMaterial({ color: 0xffffff, map: map, roughness: r, metalness: 0.06 }); };
    var flat = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    return {
      hull:  tex(hullTex(THREE), 0.88),
      sup:   tex(plateTex(THREE, PAINT.sup, 11), 0.86),
      under: tex(plateTex(THREE, PAINT.under, 5), 0.9),
      fdeck: tex(deckTex(THREE), 0.94),
      fc:    tex(plateTex(THREE, PAINT.fc, 23), 0.93),
      dark:  flat(0x16191b, 0.9, 0.05),
      metal: flat(0x5c6368, 0.55, 0.5),
      white: flat(0xc9cdcf, 0.6, 0.04),
      team:  flat(team, 0.8, 0.08),
      glass: new THREE.MeshStandardMaterial({ color: 0x101a22, roughness: 0.12, metalness: 0.0,
                                              transparent: true, opacity: 0.88 })
    };
  }

  /* ------------------------------------------------------------ helpers */
  function geoMesh(THREE, pos, idx, uv, m) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
  function box(THREE, p, lx, ly, lz, m, x, y, z) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); p.add(b); return b;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1); g.rotateZ(-PI / 2);
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
  function sphere(THREE, p, m, r, x, y, z, half) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, 12, half ? 5 : 8, 0, PI * 2, 0, half ? PI / 2 : PI), m);
    if (half) s.rotation.x = PI / 2;
    s.position.set(x, y, z); p.add(s); return s;
  }
  function orient(THREE, pos, idx, uv, m, want) {
    var i, a, b, c, ux, uy, uz, vx, vy, vz, nx, ny, nz, w, t;
    for (i = 0; i < idx.length; i += 3) {
      a = idx[i] * 3; b = idx[i + 1] * 3; c = idx[i + 2] * 3;
      ux = pos[b] - pos[a]; uy = pos[b + 1] - pos[a + 1]; uz = pos[b + 2] - pos[a + 2];
      vx = pos[c] - pos[a]; vy = pos[c + 1] - pos[a + 1]; vz = pos[c + 2] - pos[a + 2];
      nx = uy * vz - uz * vy; ny = uz * vx - ux * vz; nz = ux * vy - uy * vx;
      w = want((pos[a] + pos[b] + pos[c]) / 3, (pos[a + 1] + pos[b + 1] + pos[c + 1]) / 3, (pos[a + 2] + pos[b + 2] + pos[c + 2]) / 3);
      if (nx * w[0] + ny * w[1] + nz * w[2] < 0) { t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  function ruled(THREE, A, B, m, want, uvf) {
    var pos = [], uv = [], idx = [], i;
    for (i = 0; i < A.length; i++) {
      pos.push(A[i][0], A[i][1], A[i][2], B[i][0], B[i][1], B[i][2]);
      uv.push.apply(uv, uvf(A[i], B[i]));
    }
    for (i = 0; i < A.length - 1; i++) { var a = 2 * i; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    return orient(THREE, pos, idx, uv, m, want);
  }
  /* closed prism: plan polygon (counter-clockwise from above) from z0 to z1,
     the top scaled about the centroid by st (a raked tier) */
  function prism(THREE, p, m, pts, z0, z1, st, nobot) {
    var n = pts.length, cx = 0, cy = 0, i, pos = [], uv = [], idx = [];
    pts.forEach(function (q) { cx += q[0] / n; cy += q[1] / n; });
    var tp = pts.map(function (q) { return [cx + (q[0] - cx) * (st || 1), cy + (q[1] - cy) * (st || 1)]; });
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n, b = pos.length / 3, a = pts[i], c = pts[j], A = tp[i], Cq = tp[j];
      var L = Math.sqrt((c[0] - a[0]) * (c[0] - a[0]) + (c[1] - a[1]) * (c[1] - a[1]));
      pos.push(a[0], a[1], z0, c[0], c[1], z0, Cq[0], Cq[1], z1, A[0], A[1], z1);
      uv.push(0, z0 * 0.12, L * 0.12, z0 * 0.12, L * 0.12, z1 * 0.12, 0, z1 * 0.12);
      idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
    }
    var tb = pos.length / 3;
    tp.forEach(function (q) { pos.push(q[0], q[1], z1); uv.push(q[0] * 0.12, q[1] * 0.12); });
    for (i = 1; i < n - 1; i++) idx.push(tb, tb + i, tb + i + 1);
    if (!nobot) {
      var bb = pos.length / 3;
      pts.forEach(function (q) { pos.push(q[0], q[1], z0); uv.push(q[0] * 0.12, q[1] * 0.12); });
      for (i = 1; i < n - 1; i++) idx.push(bb, bb + i + 1, bb + i);
    }
    var mm = geoMesh(THREE, pos, idx, uv, m); p.add(mm); return mm;
  }
  function rect(x0, x1, y0, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }
  function chamf(x0, x1, y0, y1, c) {
    return [[x0 + c, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0 + c, y1], [x0, y1 - c], [x0, y0 + c]];
  }
  function blk(THREE, p, m, x0, x1, y0, y1, z0, z1, nobot) { return prism(THREE, p, m, rect(x0, x1, y0, y1), z0, z1, 1, nobot); }
  /* a block whose four top corners are given apart from its bottom ones
     (x0a..x1a, y0a..y1a at za up to x0b..x1b, y0b..y1b at zb): raked faces */
  function rake(THREE, p, m, x0a, x1a, y0a, y1a, za, x0b, x1b, y0b, y1b, zb) {
    var V = [[x0a, y0a, za], [x1a, y0a, za], [x1a, y1a, za], [x0a, y1a, za],
             [x0b, y0b, zb], [x1b, y0b, zb], [x1b, y1b, zb], [x0b, y1b, zb]];
    var F = [[4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4], [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], idx = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]); idx.push(idx.length);
      if (i < 2) uv.push(v[0] * 0.12, v[1] * 0.12);
      else if (i < 4 || (i >= 6 && i < 8)) uv.push(v[0] * 0.12, v[2] * 0.12);
      else uv.push(v[1] * 0.12, v[2] * 0.12);
    }
    var cx = (x0a + x1a + x0b + x1b) / 4, cy = (y0a + y1a + y0b + y1b) / 4, cz = (za + zb) / 2;
    var mm = orient(THREE, pos, idx, uv, m, function (x, y, z) { return [x - cx, y - cy, z - cz]; });
    p.add(mm); return mm;
  }
  function rail(THREE, g, T, pts, h) {
    for (var i = 0; i < pts.length; i++) {
      var q = pts[i];
      strut(THREE, g, T.metal, q[0], q[1], q[2], q[0], q[1], q[2] + h, 0.035, 3);
      if (i) { var r = pts[i - 1]; strut(THREE, g, T.metal, r[0], r[1], r[2] + h, q[0], q[1], q[2] + h, 0.03, 3); }
    }
  }

  /* --------------------------------------------------------------- hull */
  function hullUV(x, z, port) {
    var vv = Math.max(0.01, Math.min(0.99, (z - HZ0) / (HZ1 - HZ0)));
    return [(x - XS) / (XB - XS), port ? 0.5 * vv : 0.5 + 0.5 * vv];
  }
  var PLAIN = function (x, port) { return hullUV(x, 15.5, port); };
  function hullStrip(THREE, m, xs, zA, zB, F, paint) {
    var pos = [], uv = [], idx = [], n = F.length, i, j, s, xn, z, base;
    for (s = 0; s < 2; s++) {
      var sg = s === 0 ? 1 : -1;
      base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        xn = xs[i];
        var a = zA(xn), b = zB(xn);
        for (j = 0; j < n; j++) {
          z = a + (b - a) * F[j];
          var xx = xAt(xn, z);
          pos.push(xx, sg * sideY(xn, z), z);
          if (paint) uv.push.apply(uv, hullUV(xx, z, sg > 0)); else uv.push(xx / 12, z / 12);
        }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n - 1; j++) {
        var A = base + i * n + j, B = A + 1, Cc = A + n, D = Cc + 1;
        if (sg > 0) idx.push(A, B, Cc, B, D, Cc); else idx.push(A, Cc, B, B, Cc, D);
      }
    }
    /* the transom across the first station */
    xn = xs[0]; base = pos.length / 3;
    var a0 = zA(xn), b0 = zB(xn);
    for (j = 0; j < n; j++) {
      z = a0 + (b0 - a0) * F[j]; var y = sideY(xn, z), xq = xAt(xn, z);
      pos.push(xq, y, z, xq, -y, z);
      if (paint) { uv.push.apply(uv, PLAIN(xq, true)); uv.push.apply(uv, PLAIN(xq, false)); }
      else uv.push(y / 12, z / 12, -y / 12, z / 12);
    }
    for (j = 0; j < n - 1; j++) {
      var P0 = base + 2 * j, S0 = P0 + 1, P1 = P0 + 2, S1 = P0 + 3;
      idx.push(P0, S0, P1, S0, S1, P1);
    }
    return orient(THREE, pos, idx, uv, m, function (x, y, zz) { return x < xAt(xn, zz) + 0.3 ? [-1, 0, 0] : [0, y, 0]; });
  }
  var FU = [0, 0.06, 0.16, 0.30, 0.48, 0.68, 0.86, 1.0];
  var FH = [0, 0.05, 0.12, 0.22, 0.35, 0.5, 0.65, 0.8, 0.92, 1.0];

  /* ---------------------------------------------------- the flight deck */
  function flightDeck(THREE, g, T) {
    var xs = [], i, j, x;
    for (x = XS; x < XFD1; x += 4) xs.push(x);
    EP.concat(ES).forEach(function (q) { if (q[0] <= XFD1 + 8) xs.push(q[0]); });
    xs.push(XFD1);
    xs.sort(function (p, q) { return p - q; });
    for (i = xs.length - 1; i > 0; i--) if (xs[i] - xs[i - 1] < 0.4) xs.splice(i, 1);
    xs = xs.filter(function (q) { return q <= 46.0; });
    var NJ = 6, pos = [], uv = [], idx = [];
    /* forward of x = 38 the flat plate narrows to the angled deck's tip only
       (port of y +17.6); the forecastle rises beside it */
    var yS = function (xn) { return xn <= XFD1 ? -edgeS(xn) : 17.6; };
    for (i = 0; i < xs.length; i++) {
      var xn = xs[i], yp = edgeP(xn), ys = yS(xn);
      if (yp < ys + 0.05) yp = ys + 0.05;
      for (j = 0; j <= NJ; j++) {
        var yv = yp + (ys - yp) * j / NJ;
        pos.push(xn, yv, FD);
        uv.push((xn - XD0) / (XD1 - XD0), (yv - YD0) / (YD1 - YD0));
      }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NJ; j++) {
      var a = i * (NJ + 1) + j, b = a + 1, c = a + NJ + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    g.add(orient(THREE, pos, idx, uv, T.fdeck, function () { return [0, 0, 1]; }));

    /* rim round the plate */
    var Pt = [], Pb = [], St = [], Sb = [];
    xs.forEach(function (xn) {
      Pt.push([xn, edgeP(xn), FD]); Pb.push([xn, edgeP(xn), FDU]);
      if (xn <= XFD1) { St.push([xn, -edgeS(xn), FD]); Sb.push([xn, -edgeS(xn), FDU]); }
    });
    var uvr = function (a) { return [a[0] / 6, 0.1, a[0] / 6, 0]; };
    g.add(ruled(THREE, Pt, Pb, T.sup, function () { return [0, 1, 0]; }, uvr));
    g.add(ruled(THREE, St, Sb, T.sup, function () { return [0, -1, 0]; }, uvr));
    var e0 = [XS, edgeP(XS), FD], e1 = [XS, -edgeS(XS), FD];
    g.add(ruled(THREE, [e0, e1], [[XS, e0[1], FDU], [XS, e1[1], FDU]], T.sup,
                function () { return [-1, 0, 0]; }, function (a) { return [a[1] / 6, 0, a[1] / 6, 0.1]; }));

    /* the sponsons where the deck overhangs the hull: a wall from the edge
       down, then the soffit back to the hull (P5: the angled deck's deep
       overhang to port; to starboard the edge is near the hull side) */
    [1, -1].forEach(function (sg) {
      var top = [], wall = [], hull = [];
      xs.forEach(function (xn) {
        if (sg < 0 && xn > XFD1) return;
        var e = sg > 0 ? edgeP(xn) : edgeS(xn), over = Math.max(0, e - tab(HD, xn));
        var zw = FDU - Math.min(1.6, 0.25 + 0.12 * over);
        var za = Math.max(4.0, zw - Math.min(5.5, 0.45 * over));
        top.push([xn, sg * e, FDU]); wall.push([xn, sg * e, zw]);
        hull.push([xAt(xn, za), sg * sideY(xn, za), za]);
      });
      g.add(ruled(THREE, top, wall, T.hull, function () { return [0, sg, 0]; },
                  function (a) { return PLAIN(a[0], sg > 0).concat(PLAIN(a[0], sg > 0)); }));
      g.add(ruled(THREE, wall, hull, T.hull, function () { return [0, sg * 0.4, -1]; },
                  function (a, b) { return PLAIN(a[0], sg > 0).concat(PLAIN(b[0], sg > 0)); }));
    });
    /* braces under the angled sponson */
    for (x = -100; x <= 36; x += 8) {
      var e = edgeP(x), over = e - tab(HD, x);
      if (over < 5) continue;
      var zw = FDU - Math.min(1.6, 0.25 + 0.12 * over), za = Math.max(4.0, zw - Math.min(5.5, 0.45 * over));
      strut(THREE, g, T.metal, xAt(x, za), sideY(x, za) + 0.2, za + 0.3, x, e - 0.6, zw - 0.1, 0.2, 5);
    }
    /* deck-edge catwalk nets, outboard and a little below the edge, both sides */
    [1, -1].forEach(function (sg) {
      var A = [], B = [];
      for (x = -130; x <= 30; x += 4) {
        var e2 = sg > 0 ? edgeP(x) : edgeS(x);
        A.push([x, sg * (e2 - 0.05), FD - 0.35]); B.push([x, sg * (e2 + 1.1), FD - 0.75]);
      }
      g.add(ruled(THREE, A, B, T.metal, function () { return [0, 0, 1]; }, function () { return [0, 0, 0.2, 0.2]; }));
    });
  }

  /* ------------------------------------------------------------- weapons */
  /* twin P-500 Bazalt: two big tubes side by side in a cradle, raised
     forward, a blast wall at the back (P1) */
  function bazalt(THREE, g, T) {
    var cr = new THREE.Group(); cr.position.set(-5.4, 0, 1.5); cr.rotation.y = -0.22; g.add(cr);
    var s;
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, cr, 0.95, 0.95, 11.6, 12, T.white, 5.8, s * 1.02, 0.0);
      cylX(THREE, cr, 1.0, 1.0, 0.45, 12, T.metal, 11.4, s * 1.02, 0.0);
      cylX(THREE, cr, 1.0, 1.0, 0.4, 12, T.sup, 2.0, s * 1.02, 0.0);
      cylX(THREE, cr, 1.0, 1.0, 0.4, 12, T.sup, 7.8, s * 1.02, 0.0);
    }
    box(THREE, cr, 10.6, 0.6, 0.4, T.metal, 5.4, 0, -0.85);
    blk(THREE, g, T.sup, -4.2, 4.2, -2.0, 2.0, 0, 0.9);
    blk(THREE, g, T.sup, -6.6, -5.8, -2.4, 2.4, 0, 3.6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -5.6, s * 2.0, 0.2, 2.2, s * 2.0, 1.4, 0.12, 4);
  }
  /* M-11 Shtorm twin-arm launcher on its drum, arms level and forward */
  function shtorm(THREE, g, T, drum) {
    cylZ(THREE, g, 2.0, 2.3, drum, 16, T.sup, 0, 0, drum / 2);
    cylZ(THREE, g, 1.2, 1.3, 1.4, 12, T.sup, 0, 0, drum + 0.7);
    box(THREE, g, 1.8, 3.6, 0.9, T.sup, 0.1, 0, drum + 1.7);
    for (var s = -1; s <= 1; s += 2) {
      box(THREE, g, 6.4, 0.45, 0.55, T.white, 2.2, s * 1.45, drum + 2.25);
      box(THREE, g, 5.0, 0.16, 0.2, T.metal, 2.4, s * 1.45, drum + 1.88);
      box(THREE, g, 0.6, 0.5, 0.6, T.dark, 5.1, s * 1.45, drum + 2.25);
    }
  }
  /* RPK-1 Vikhr (SUW-N-1): a twin-arm launcher on a pedestal, arms raised */
  function vikhr(THREE, g, T) {
    cylZ(THREE, g, 1.4, 1.7, 1.2, 14, T.sup, 0, 0, 0.6);
    blk(THREE, g, T.sup, -1.0, 1.0, -1.2, 1.2, 1.2, 2.4);
    for (var s = -1; s <= 1; s += 2) {
      var arm = new THREE.Group(); arm.position.set(-0.4, s * 1.0, 2.2); arm.rotation.y = -0.45; g.add(arm);
      box(THREE, arm, 6.2, 0.4, 0.5, T.white, 2.6, 0, 0);
      box(THREE, arm, 5.4, 0.14, 0.18, T.metal, 2.6, 0, -0.34);
    }
  }
  /* AK-726: twin 76 mm in its domed shield, barrels forward */
  function ak726(THREE, g, T) {
    cylZ(THREE, g, 2.0, 2.2, 0.7, 16, T.sup, 0, 0, 0.35);
    var dg = new THREE.SphereGeometry(2.0, 16, 7, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2); dg.scale(1.15, 1, 0.85);
    var d = new THREE.Mesh(dg, T.white); d.position.set(0, 0, 0.7); g.add(d);
    blk(THREE, g, T.white, 0.4, 2.3, -1.5, 1.5, 0.8, 2.2);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.1, 0.1, 4.2, 6, T.metal, 4.3, s * 0.5, 1.6);
      cylX(THREE, g, 0.2, 0.2, 0.8, 8, T.metal, 2.6, s * 0.5, 1.6);
    }
  }
  /* one AK-630: low drum, rounded top, six-barrel gun forward */
  function ak630(THREE, g, T, face) {
    var h = new THREE.Group(); h.rotation.z = face || 0; g.add(h);
    cylZ(THREE, h, 1.0, 1.1, 0.5, 8, T.sup, 0, 0, 0.25);
    cylZ(THREE, h, 0.9, 1.0, 0.8, 8, T.sup, 0, 0, 0.9);
    var d = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 3, 0, PI * 2, 0, PI / 2), T.sup);
    d.rotation.x = PI / 2; d.scale.set(1, 1, 0.6); d.position.set(0, 0, 1.3); h.add(d);
    cylX(THREE, h, 0.17, 0.17, 1.7, 6, T.metal, 1.5, 0, 1.0);
  }
  /* RBU-6000: twelve barrels in a horseshoe on a trunnion, on its base */
  function rbu(THREE, g, T) {
    cylZ(THREE, g, 0.9, 1.0, 0.9, 10, T.sup, 0, 0, 0.45);
    var c = new THREE.Group(); c.position.set(0.2, 0, 1.6); c.rotation.y = -0.6; g.add(c);
    for (var i = 0; i < 12; i++) {
      var a = -PI * 0.8 + i * (PI * 1.6 / 11);
      cylX(THREE, c, 0.13, 0.13, 1.9, 4, T.metal, 0.4, Math.sin(a) * 0.55, Math.cos(a) * 0.55);
    }
  }
  /* a director: a pedestal, a cabin and one or two dishes facing forward */
  function director(THREE, g, T, x, y, z, h, r, twin) {
    cylZ(THREE, g, 0.45, 0.6, h, 8, T.sup, x, y, z + h / 2);
    blk(THREE, g, T.sup, x - 0.9, x + 0.9, y - 0.8, y + 0.8, z + h, z + h + 1.3, true);
    var n = twin ? 2 : 1;
    for (var k = 0; k < n; k++) {
      var yy = twin ? y + (k ? 1.1 : -1.1) : y;
      var dg = new THREE.CylinderGeometry(r, r * 0.3, 0.35, 12, 1); dg.rotateZ(-PI / 2);
      var d = new THREE.Mesh(dg, T.white); d.position.set(x + 1.1, yy, z + h + 0.8); g.add(d);
    }
  }
  /* a lattice mast: four legs braced, from a base square to a top square */
  function lattice(THREE, g, T, cx, cy, b0, t0, z0, z1, rl) {
    var B = [[cx - b0, cy - b0], [cx - b0, cy + b0], [cx + b0, cy - b0], [cx + b0, cy + b0]];
    var Tt = [[cx - t0, cy - t0], [cx - t0, cy + t0], [cx + t0, cy - t0], [cx + t0, cy + t0]];
    var i, k;
    for (i = 0; i < 4; i++) strut(THREE, g, T.dark, B[i][0], B[i][1], z0, Tt[i][0], Tt[i][1], z1, rl, 5);
    var lev = function (f) { return B.map(function (b, q) { return [b[0] + (Tt[q][0] - b[0]) * f, b[1] + (Tt[q][1] - b[1]) * f, z0 + (z1 - z0) * f]; }); };
    var ring = [0, 2, 3, 1, 0];
    [0.25, 0.5, 0.75, 1.0].forEach(function (f) {
      var R4 = lev(f);
      for (k = 0; k < 4; k++) { var a = R4[ring[k]], b = R4[ring[k + 1]]; strut(THREE, g, T.dark, a[0], a[1], a[2], b[0], b[1], b[2], 0.07, 4); }
    });
    [[0, 2], [1, 3], [0, 1], [2, 3]].forEach(function (pr) {
      [0, 0.25, 0.5, 0.75].forEach(function (f) {
        var A = lev(f), Bq = lev(f + 0.25);
        strut(THREE, g, T.dark, A[pr[0]][0], A[pr[0]][1], A[pr[0]][2], Bq[pr[1]][0], Bq[pr[1]][1], Bq[pr[1]][2], 0.05, 3);
      });
    });
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = makeMats(THREE, C);
    var s, i, x, k;

    /* ---------------- hull, lofted from the station tables */
    var mainXs = [-136.5, -134, -131, -127, -122, -116, -108, -98, -86, -72, -58, -44, -30, -16, -2, 12, 26, 34, 38, 38.05,
                  40, 42, 44, 46, 54, 62, 70, 78, 85, 92, 98, 104, 109, 114, 119, 123.5, 127.5, 131, 133.7, 135.6, 136.6];
    var kz = function (xn) { return tab(KZ, xn); };
    g.add(hullStrip(THREE, T.under, mainXs, kz, function () { return HZ0; }, FU, false));
    g.add(hullStrip(THREE, T.hull, mainXs, function () { return HZ0; }, hullTop, FH, true));
    /* the forecastle deck from the step to the stem (red-brown, P1) */
    var fx = [];
    fx.push(38.05);
    for (x = 40; x < 134; x += 2.0) fx.push(x);
    fx.push(135.6, 136.5);
    var fp = [], fu = [], fi = [], NC = 8;
    fx.forEach(function (xn) {
      var z = deckZ(xn), xq = xAt(xn, z);
      var w = Math.max(0.05, sideY(xn, z) - 0.02);
      /* abreast of the angled deck's tip the forecastle runs only to its edge */
      var yl = xn < 46 ? Math.min(w, 17.55) : w;
      for (var j = 0; j <= NC; j++) {
        var yy = yl - (yl + w) * j / NC;
        fp.push(xq, yy, z + 0.02); fu.push(xq / 9, yy / 9);
      }
    });
    for (i = 0; i < fx.length - 1; i++) for (k = 0; k < NC; k++) {
      var a = i * (NC + 1) + k; fi.push(a, a + 1, a + NC + 1, a + 1, a + NC + 2, a + NC + 1);
    }
    g.add(orient(THREE, fp, fi, fu, T.fc, function () { return [0, 0, 1]; }));
    /* the step face at the angled deck's forward end, from 12.6 to the forecastle */
    var sa = [], sb = [];
    for (x = XFD1; x <= 46.01; x += 1) { sa.push([x, 17.6, FD]); sb.push([x, 17.6, deckZ(x)]); }
    g.add(ruled(THREE, sa, sb, T.sup, function () { return [0, 1, 0]; }, function (p, q) { return [p[0] / 6, 0, p[0] / 6, 0.2]; }));

    flightDeck(THREE, g, T);

    /* ---------------- the island, on the starboard edge (D1 stations) */
    var YO = -17.4, YN = -5.0;                    /* outboard and inboard faces */
    /* after end: the low block (14.6) with the AK-726, the second tier
       (17.8) with the M-11, the third (23.5) with the director posts */
    blk(THREE, g, T.sup, -50.0, -40.0, YO + 0.6, YN - 0.6, FD, 14.8, true);
    blk(THREE, g, T.sup, -40.0, -27.0, YO + 0.4, YN - 0.3, FD, 17.8, true);
    blk(THREE, g, T.sup, -27.0, -12.0, YO + 0.4, YN - 0.2, FD, 23.5, true);
    /* the tower: lower body upright to 28, then raked faces to its roof at 34.5 (P2) */
    blk(THREE, g, T.sup, -12.0, 25.0, YO + 0.3, YN, FD, 28.0, true);
    rake(THREE, g, T.sup, -12.0, 25.0, YO + 0.3, YN, 28.0, -9.6, 21.6, YO + 2.2, YN - 1.9, 34.5);
    /* the forward tiers: 30.0 to x +30, 22.5 to +43, 18.5 to +45, 14.8 to +50 */
    blk(THREE, g, T.sup, 25.0, 30.0, YO + 0.6, YN - 0.6, FD, 30.0, true);
    rake(THREE, g, T.sup, 30.0, 43.0, YO + 0.6, YN - 0.4, FD, 30.0, 41.6, YO + 1.0, YN - 0.8, 22.5);
    blk(THREE, g, T.sup, 43.0, 45.5, YO + 0.6, YN - 0.6, deckZ(43), 18.5, true);
    blk(THREE, g, T.sup, 45.5, 50.5, YO + 0.6, YN - 0.6, deckZ(45.5), 15.4, true);
    /* the funnel casing on the tower's after end, its raked top falling aft (D1, P2) */
    rake(THREE, g, T.sup, -10.4, 0.0, YO + 3.2, YN - 2.6, 34.5, -10.6, -1.0, YO + 3.6, YN - 3.0, 36.0);
    /* the casing's sloped cap: higher forward (37.2) than aft (36.0) */
    var cp = [-10.6, YO + 3.6, 36.0, -1.0, YO + 3.6, 37.2, -1.0, YN - 3.0, 37.2, -10.6, YN - 3.0, 36.0];
    g.add(orient(THREE, cp, [0, 1, 2, 0, 2, 3], [0, 0, 1, 0, 1, 1, 0, 1], T.dark, function () { return [0, 0, 1]; }));
    [[YO + 3.6, -1], [YN - 3.0, 1]].forEach(function (q) {
      var tri = [-10.6, q[0], 36.0, -1.0, q[0], 37.2, -1.0, q[0], 36.0];
      g.add(orient(THREE, tri, [0, 1, 2], [0, 0, 1, 0, 1, 1], T.sup, function () { return [0, -q[1], 0]; }));
    });
    var fr = [-1.0, YO + 3.6, 36.0, -1.0, YN - 3.0, 36.0, -1.0, YN - 3.0, 37.2, -1.0, YO + 3.6, 37.2];
    g.add(orient(THREE, fr, [0, 1, 2, 0, 2, 3], [0, 0, 1, 0, 1, 1, 0, 1], T.sup, function () { return [1, 0, 0]; }));

    /* galleries with rails round the tiers */
    [[-50.4, -40.0, 14.8], [-40.4, -27.0, 17.8], [-27.4, -12.0, 23.5], [-12.4, 25.4, 28.0], [25.0, 30.4, 30.0], [41.6, 50.8, 18.5]].forEach(function (q) {
      blk(THREE, g, T.sup, q[0], q[1], YO - 0.6, YN + 0.5, q[2] - 0.25, q[2], false);
      var po = [], pi = [];
      for (x = q[0] + 0.3; x <= q[1] - 0.2; x += 3.6) { po.push([x, YO - 0.5, q[2]]); pi.push([x, YN + 0.4, q[2]]); }
      rail(THREE, g, T, po, 1.0); rail(THREE, g, T, pi, 1.0);
    });
    /* windows: rows on both faces of the tiers, the bridge band on the tower front */
    /* D1: two short rows high on the tower's middle, single rows on the tiers */
    var wr = [[-48, -42, 13.6], [-38, -29, 16.0], [-25, -14, 20.6], [-7, 8, 19.6], [-7, 8, 22.4], [12, 22, 25.0], [26, 29, 27.4]];
    wr.forEach(function (q) {
      for (x = q[0]; x <= q[1]; x += 3.0) {
        box(THREE, g, 1.2, 0.1, 0.75, T.dark, x, YO + 0.25, q[2]);
        box(THREE, g, 1.2, 0.1, 0.75, T.dark, x, YN + 0.05 - (q[0] > -12 && q[0] < 25 ? 0 : 0.3), q[2]);
      }
    });
    box(THREE, g, 0.12, (YN - 0.6) - (YO + 0.6) - 1.0, 1.0, T.glass, 30.06, (YO + YN) / 2, 28.6);
    box(THREE, g, 0.12, (YN - 0.8) - (YO + 1.0) - 1.2, 0.9, T.glass, 25.06, (YO + YN) / 2, 32.6);
    for (i = 0; i < 3; i++) box(THREE, g, 0.1, 1.8, 2.6, T.dark, -50.05, YO + 2.6 + i * 3.6, FD + 1.4);
    for (i = 0; i < 4; i++) box(THREE, g, 2.0, 0.1, 2.6, T.dark, -36 + i * 18, YN + 0.08 - (i > 1 ? 0 : 0.3), FD + 1.4);
    /* bridge wings */
    blk(THREE, g, T.sup, 22.0, 25.0, YO - 1.8, YO + 0.3, 28.4, 29.0);
    blk(THREE, g, T.sup, 22.0, 25.0, YN, YN + 1.6, 28.4, 29.0);
    /* white domes on the tower sides and roof (P1) */
    [[-6.0, YO + 0.9, 30.0], [6.0, YO + 0.9, 30.0], [-6.0, YN - 0.6, 30.0], [16.0, YN - 0.8, 30.0], [-20.0, YO + 1.4, 24.6], [36.0, YO + 1.6, 23.6]].forEach(function (q) {
      blk(THREE, g, T.sup, q[0] - 0.8, q[0] + 0.8, q[1] - 0.8, q[1] + 0.8, q[2] - 1.3, q[2] - 0.6, true);
      sphere(THREE, g, T.white, 1.0, q[0], q[1], q[2]);
    });

    /* ---------------- masts and antennas on the tower roof (D1, P2, P4) */
    var TY = (YO + 2.2 + YN - 1.9) / 2;          /* the roof's middle line */
    /* the ball on its lattice tripod at x +10, with its yard */
    lattice(THREE, g, T, 10.0, TY, 2.4, 0.8, 34.5, 46.6, 0.16);
    cylZ(THREE, g, 0.5, 0.65, 1.4, 10, T.dark, 10.0, TY, 47.3);
    sphere(THREE, g, T.white, 2.2, 10.0, TY, 50.0);
    strut(THREE, g, T.dark, 10.0, TY - 6.0, 45.6, 10.0, TY + 6.0, 45.6, 0.12, 5);
    strut(THREE, g, T.dark, 7.6, TY, 45.6, 12.4, TY, 45.6, 0.1, 4);
    [-5.6, -3.0, 3.0, 5.6].forEach(function (d) {
      strut(THREE, g, T.dark, 10.0, TY + d, 45.6, 10.0, TY + d, 46.8, 0.05, 3);
      strut(THREE, g, T.dark, 10.0, TY + d, 45.6, 10.0, TY + d, 44.6, 0.05, 3);
    });
    strut(THREE, g, T.dark, 10.0, TY, 52.2, 10.0, TY, 53.6, 0.05, 3);
    /* the Top Sail: a lattice reflector tilted back on its cone, facing forward */
    cylZ(THREE, g, 0.7, 1.8, 3.6, 10, T.sup, 19.5, TY, 36.3);
    /* it turns: drawn trained 45 degrees to port, as P2 and P4 show its face */
    var tz = new THREE.Group(); tz.position.set(18.6, TY, 42.0); tz.rotation.z = PI / 4; g.add(tz);
    var ts = new THREE.Group(); ts.rotation.y = -0.42; tz.add(ts);
    /* the reflector: a concave mesh face 6.6 m wide and 8.6 m tall, both sides
       drawn (metal), its back trusses and a feed arm forward */
    var rp = [], ri = [], ru = [], NY = 6, NZ = 4, yq, zq;
    for (k = 0; k <= NZ; k++) for (var q = 0; q <= NY; q++) {
      yq = -3.3 + q * 6.6 / NY; zq = -4.3 + k * 8.6 / NZ;
      rp.push(-0.7 * (1 - Math.pow(yq / 3.3, 2)), yq, zq); ru.push(q / NY, k / NZ);
    }
    for (k = 0; k < NZ; k++) for (q = 0; q < NY; q++) {
      var a0 = k * (NY + 1) + q; ri.push(a0, a0 + 1, a0 + NY + 2, a0, a0 + NY + 2, a0 + NY + 1);
      ri.push(a0, a0 + NY + 2, a0 + 1, a0, a0 + NY + 1, a0 + NY + 2);
    }
    ts.add(geoMesh(THREE, rp, ri, ru, T.metal));
    for (k = -1; k <= 1; k++) strut(THREE, ts, T.dark, -0.8, k * 2.6, -4.2, -0.8, k * 2.6, 4.2, 0.09, 3);
    [-3.0, 0, 3.0].forEach(function (zz) { strut(THREE, ts, T.dark, -0.8, -3.2, zz, -0.8, 3.2, zz, 0.07, 3); });
    strut(THREE, ts, T.dark, -0.8, 0, -4.0, -2.6, 0, 0, 0.12, 4);
    strut(THREE, ts, T.dark, -0.8, 0, 4.0, -2.6, 0, 0, 0.12, 4);
    strut(THREE, ts, T.dark, 0.0, 0, -3.6, 2.4, 0, -1.0, 0.1, 4);
    /* the planar array aft of the ball, on its post (P2) */
    /* (it turns; drawn trained 45 degrees to port, so both profiles show it) */
    strut(THREE, g, T.dark, 3.8, TY, 34.5, 3.8, TY, 38.0, 0.3, 6);
    var pa = new THREE.Group(); pa.position.set(3.8, TY, 40.2); pa.rotation.z = PI / 4; g.add(pa);
    var pb = new THREE.Group(); pb.rotation.y = -0.35; pa.add(pb);
    box(THREE, pb, 0.35, 7.2, 4.6, T.metal, 0, 0, 0);
    for (k = -2; k <= 2; k++) box(THREE, pb, 0.45, 0.08, 4.65, T.dark, 0.02, k * 1.45, 0);
    for (k = -1; k <= 1; k++) box(THREE, pb, 0.45, 7.25, 0.08, T.dark, 0.02, 0, k * 1.5);
    /* small dishes and whips on the roof */
    director(THREE, g, T, -6.0, TY + 1.0, 34.5, 1.4, 0.9, false);
    director(THREE, g, T, 20.4, TY - 2.0, 34.5, 1.0, 0.8, false);
    [[-4, YN - 2.0], [5, YO + 2.6], [-30, YO + 1.2], [-46, YN - 1.2], [14, YO + 2.2]].forEach(function (q, k2) {
      var zt = q[0] < -40 ? 14.8 : (q[0] < -27 ? 17.8 : 34.5);
      strut(THREE, g, T.metal, q[0], q[1], zt, q[0], q[1], zt + 3.6 + k2 * 0.5, 0.04, 3);
    });

    /* ---------------- directors at the island's ends (D1 posts, P1, P2) */
    director(THREE, g, T, -20.0, (YO + YN) / 2, 23.5, 5.0, 1.3, true);   /* aft M-11's director  */
    director(THREE, g, T, -26.0, YN - 2.0, 17.8, 4.6, 0.9, false);
    director(THREE, g, T, 31.4, (YO + YN) / 2, 30.0, 2.4, 1.3, true);    /* fwd M-11's director  */
    director(THREE, g, T, 40.0, YO + 2.6, 22.5, 1.0, 0.9, false);
    director(THREE, g, T, 40.0, YN - 2.2, 22.5, 1.0, 0.9, false);

    /* ---------------- the after weapons on the island's after tiers */
    var aw = new THREE.Group(); aw.position.set(-45.0, -11.2, 14.8); ak726(THREE, aw, T); g.add(aw);
    aw.rotation.z = PI;                                   /* the after mount looks aft */
    var am = new THREE.Group(); am.position.set(-33.5, -11.2, 17.8); shtorm(THREE, am, T, 0.8); am.rotation.z = PI; g.add(am);

    /* ---------------- the forecastle battery (P1, P4, D1) */
    [[55.0, 1], [55.0, -1], [73.0, 1], [73.0, -1]].forEach(function (q) {
      var bz = new THREE.Group(); bz.position.set(q[0], q[1] * 8.6, deckZ(q[0])); bazalt(THREE, bz, T); g.add(bz);
    });
    /* the raised base between the rows carrying the AK-726 */
    blk(THREE, g, T.sup, 59.5, 68.5, -4.2, 4.2, deckZ(60), 16.6);
    blk(THREE, g, T.sup, 48.5, 51.0, -3.6, 3.6, deckZ(50), 15.9);
    var fw = new THREE.Group(); fw.position.set(64.5, 0, 16.6); ak726(THREE, fw, T); g.add(fw);
    /* the M-11 on its tall drum */
    var fm = new THREE.Group(); fm.position.set(88.5, 0, deckZ(88.5)); shtorm(THREE, fm, T, 3.4); g.add(fm);
    /* the SUW-N-1 on its pedestal and platform */
    blk(THREE, g, T.sup, 98.5, 104.5, -3.2, 3.2, deckZ(100), deckZ(100) + 0.7);
    var fv = new THREE.Group(); fv.position.set(101.0, 0, deckZ(101) + 0.7); vikhr(THREE, fv, T); g.add(fv);
    /* the two RBU-6000 on their curved bases, and the bow platform */
    [1, -1].forEach(function (sg) {
      var rb = new THREE.Group(); rb.position.set(112.0, sg * 3.6, deckZ(112)); rbu(THREE, rb, T); g.add(rb);
      blk(THREE, g, T.sup, 113.6, 114.4, sg * 1.2, sg * 6.0, deckZ(114), deckZ(114) + 1.2);
    });
    blk(THREE, g, T.sup, 122.0, 128.0, -2.6, 2.6, deckZ(123), deckZ(123) + 0.9);
    /* capstans, bollards, a jackstaff, two small posts by the SUW-N-1 */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.6, 0.7, 0.8, 12, T.metal, 118.5, s * 2.4, deckZ(118.5) + 0.4);
      for (i = 0; i < 5; i++) {
        var bx = 50 + i * 16;
        cylZ(THREE, g, 0.22, 0.22, 0.6, 8, T.metal, bx, s * (sideY(bx, deckZ(bx)) - 1.0), deckZ(bx) + 0.3);
      }
      director(THREE, g, T, 106.5, s * 3.4, deckZ(106.5), 1.6, 0.6, false);
    }
    strut(THREE, g, T.metal, 135.4, 0, deckZ(135.4), 135.4, 0, deckZ(135.4) + 3.0, 0.05, 4);
    /* the low bulwark round the stem (P1) */
    [1, -1].forEach(function (sg) {
      var A = [], B = [];
      for (x = 126; x <= 136.4; x += 2.6) {
        var zb = deckZ(x), yb = sg * Math.max(0.05, sideY(x, zb) - 0.05);
        A.push([xAt(x, zb), yb, zb]); B.push([xAt(x, zb), yb, zb + 1.1]);
      }
      g.add(ruled(THREE, A, B, T.hull, function () { return [0, sg, 0.1]; }, function (a) { return PLAIN(a[0], sg > 0).concat(PLAIN(a[0], sg > 0)); }));
    });
    /* forecastle rails */
    for (s = -1; s <= 1; s += 2) {
      var rp = [];
      for (x = 47; x <= 134; x += 4.4) {
        var zd = deckZ(x);
        rp.push([xAt(x, zd), s * (sideY(x, zd) - 0.15), zd]);
      }
      rail(THREE, g, T, rp, 1.0);
    }

    /* ---------------- the AK-630 pairs and their directors */
    /* starboard forward, on the island's front block */
    [-9.0, -14.0].forEach(function (yy) { var m1 = new THREE.Group(); m1.position.set(47.6, yy, 15.4); ak630(THREE, m1, T); g.add(m1); });
    director(THREE, g, T, 44.2, -11.4, 18.5, 1.2, 0.7, false);
    /* port forward, on a sponson under the angled deck's forward end (P4) */
    blk(THREE, g, T.sup, 39.0, 47.0, 15.8, 21.2, 9.2, 9.8);
    g.add(ruled(THREE, [[39.0, 21.2, 9.2], [47.0, 21.2, 9.2]], [[39.0, 16.4, 5.6], [47.0, 16.2, 5.6]], T.hull,
          function () { return [0, 0.5, -1]; }, function (a) { return PLAIN(a[0], true).concat(PLAIN(a[0], true)); }));
    [41.2, 45.0].forEach(function (xx) { var m2 = new THREE.Group(); m2.position.set(xx, 19.0, 9.8); ak630(THREE, m2, T); g.add(m2); });
    /* the stern quarters, below the flight deck (P6 on Kiev) */
    [1, -1].forEach(function (sg) {
      blk(THREE, g, T.sup, -134.0, -124.0, sg > 0 ? 14.2 : -18.6, sg > 0 ? 18.6 : -14.2, 8.0, 8.6);
      [-131.5, -127.0].forEach(function (xx) {
        var m3 = new THREE.Group(); m3.position.set(xx, sg * 16.6, 8.6); ak630(THREE, m3, T, sg > 0 ? 0.6 : -0.6); g.add(m3);
      });
    });

    /* ---------------- underwater: four shafts and screws */
    [[-5.2, -4.2], [-10.6, -3.4]].forEach(function (sq) {
      for (s = -1; s <= 1; s += 2) {
        var y0 = s * sq[0], z2 = sq[1];
        cylX(THREE, g, 0.36, 0.36, 26.0, 8, T.metal, -108.0, y0, z2);
        strut(THREE, g, T.metal, -114.0, y0 * 0.75, z2 + 2.4, -114.0, y0, z2, 0.16, 4);
        cylX(THREE, g, 0.55, 0.7, 1.0, 8, T.metal, -121.5, y0, z2);
        for (i = 0; i < 4; i++) {
          var bl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.75, 2.1), T.metal);
          bl.position.set(-121.5, y0, z2); bl.rotation.x = i * PI / 2 + 0.4;
          bl.translateZ(1.2); bl.rotation.y = 0.45; g.add(bl);
        }
      }
    });

    /* ---------------- team: three modest strips on up-facing island roofs */
    box(THREE, g, 4.0, 1.2, 0.05, T.team, -18.0, YO + 2.0, 23.53);
    box(THREE, g, 3.0, 1.2, 0.05, T.team, 27.5, YN - 2.0, 30.03);
    box(THREE, g, 3.0, 1.2, 0.05, T.team, 37.5, -11.2, 22.53 - 0.0);

    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  /* One mesh per material */
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      if (!geo.attributes.normal) geo.computeVertexNormals();
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
  return { build: build };
})();

UNIT_MODELS["pact_e80_carrier"] = {
  len: 273.1,
  build: function (THREE, M, C) { return HeroKiev.build(THREE, M, C); }
};
