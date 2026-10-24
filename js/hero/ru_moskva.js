/* ==================== js/hero/ru_moskva.js =============================
   HERO MODEL -- Project 1123 "Kondor" (Moskva class) anti-submarine
   helicopter cruiser, as built and as photographed 1967 to the early 1980s
   (Moskva, Leningrad).
   Key: pact_e60_carrier ("Project 1123 Moskva", service 1967, e60).
   PUBLISHED FIGURES: length overall 189 m (drawn 189.0; js/warship_specs.js
   len 189), waterline beam 23 m (drawn 23.0), flight deck beam 34 m (drawn
   34.2), flight deck area 2,200 m2 (Russian Wikipedia "Kreisera proekta
   1123"; NOT matched: the plate drawn to the superstructure's after face,
   82.5 m long as D1 gives it, is about 2,770 m2 - two broadside photographs
   bracket 75-81 m; D1 is followed), draught 7.7 m (drawn; published figures vary
   7.6-8.5, not from a fetched source), masthead about 54 m above water
   (D1; drawn 54.4 to the pole). Armament (English and Russian Wikipedia):
   1 twin SUW-N-1 (RPK-1 Vikhr, MS-18 launcher), 2 twin SA-N-3 (M-11
   Shtorm, ZIF-101 launchers), 2 twin 57 mm AK-725, 2 RBU-6000. Radars:
   MR-600 Voskhod (Top Sail), MR-310 Angara (Head Net), two 4R60 Grom
   (Head Light) directors for the M-11, ECM radomes (Side Globe).

   REFERENCES (Wikimedia Commons, fetched at 960 px, all read):
     D1 "Moskva-class helicopter carrier profile 1986.png" - recognition
        profile from starboard, 191 m bar (4.79 px/m, waterline at the hull
        foot y = 283): rows scanned every 2-5 m of height for the stations
        below. The flush upper deck at 9.4-9.7 m with the forward sheer; the
        superstructure's after face at x = -12.0 at deck level, leaning aft to
        -14.8 at 33 m (the old file put it at -17.6, measured off the funnel
        lip: CORRECTED); the block to 21 m from -12 to +21.6, the next tier to
        28.5 m forward to +9.0, the tower to 34.6 m forward to -3.0; the
        funnel drum and lip -16.6 to -9.3 at 35 m; the lattice mast at x -9 to
        -6 from 35 to 49 m and the pole to 54.6; the Top Sail x -7.8 to -2.2,
        44 to 53.7 m, leaning back; the Head Net at x -4.8 to 0, 37-40 m; the
        lower Head Light at x 16-22, 21-28 m; the upper at x 4.8-10.9, 29-36.6
        m; two pairs of white globes (x 2.2 at 26.5/28.6 m, x 4.8 at 18.3/20.5
        m: the Side Globes; the 1974 stamp "1974 CPA 4376.jpg" also paints
        round fittings stacked on the tower side, while the 1970 photograph
        P3 is too small to show them); the raised launcher deckhouse
        x 21.6-35.8 to 14.3 m with its
        launcher at 30.3; the thin pole at x 35.6; the low deckhouse to 44;
        launchers at 52.1 and 64.6; the two small mounts at 72.6 and 83.4.
     P1 "Moskva class Leningrad flightdeck cruiser, aerial bow view.jpg" (USN,
        catalogued 1985, from ahead and above): the forecastle order - an
        RBU-6000 between the two anchor capstans at the bow (its horseshoe of
        barrels; Russian Wikipedia: two anchor-mooring capstans on the bow), the second RBU-6000 aft of it on the centreline, the SUW-N-1
        on its pedestal without side panels, the forward M-11 between two flat
        panels, the after M-11 raised between two sloped panels, the boats in
        crutches beside the raised deckhouse, the AK-725 domes at the deck
        edges abreast the bridge; the two Head Lights stacked on the
        superstructure front (each: two big dishes with X feed struts, two
        small dishes above, a dome on top, a small dish under the middle); the
        white globes on the tower sides; the lattice yards out to both sides at
        the tower top; the round funnel cap; the Top Sail; the teardrop deck
        plan widening aft.
     P2 "Moskva class Moskva flightdeck cruiser, starboard quarter view.jpg"
        (USN, catalogued 1982, colour): the flight deck spots (concentric
        circles in darker squares), the open stern gallery on posts, the big
        flare aft, the door in the superstructure's after face, the pyramid
        tower with its dark funnel cap and the mast rising from it.
        PAINT sampled here: hull 0x8d8f91, superstructure 0xadb1b6, flight
        deck 0xdedacc-0xf1f0e5 (sunlit), funnel cap 0x443830; drawn at about
        0.8 (hull 0x717476, superstructure 0x8b8f93) and the deck at 0.72
        (0xa6a398).
     P3 "38MoskvaoffMoroccoJan1970.jpg" (1970, starboard broadside): the
        as-built layout - the Top Sail leaning back on the lattice mast, the
        brimmed funnel cap overhanging aft, the two Head Lights on posts, the
        Head Net in front of the mast foot; too distant for colours.
     P4 "A starboard view of the Soviet Moskva class helicopter cruiser
        LENINGRAD underway - DPLA", "Helicopter carrier "Leningrad" in
        1990.jpeg", "DoD-Leningrad-DN-ST-90-07636 50pct.jpg" (1990, colour):
        the forecastle in profile (both RBU-6000 in tandem, the SUW-N-1 with
        its long arms, the sloped M-11 panels, the thin pole) and the spots
        staggered port and starboard. Their green flight deck and red-brown
        forecastle are LATER paint and are not drawn on this 1960s-70s row.

   RECOGNITION LIST (where each shows):
     1. the teardrop deck plan: narrow raked bow flaring to a broad flat
        flight deck over the after half, rounded stern (P1, P2) - HW/HD
        tables, flightDeck;
     2. the massive pyramidal superstructure amidships with a vertical after
        face over the flight deck (D1, P2) - tiers T1-T4;
     3. the single big funnel drum on the tower top with its dark cap and the
        lattice mast rising out of it (D1, P2);
     4. the Top Sail at the masthead, leaning back, and the Head Net below it
        on the mast front (D1, P1);
     5. the two Head Light directors stacked on the superstructure front (D1,
        P1, P4);
     6. the white Side Globe radomes on the tower sides and the lattice yards
        out at the tower top (D1, P1);
     7. the stepped forecastle: raised deckhouse with the after M-11 between
        sloped panels, the forward M-11 between flat panels, the SUW-N-1, the
        two RBU-6000 in tandem at the bow (D1, P1, P4);
     8. the two AK-725 domes at the deck edges abreast the bridge (P1);
     9. the pale flight deck with four staggered spots and two centreline
        lifts painted on it (P2, P4) - deckTex;
    10. the open stern gallery under the flight deck's after end (D1, P2);
    11. the grey hull with dark boot-top and scuttle rows, boats beside the
        raised deckhouse (P1, P2).

   NOT CONFIRMED, drawn plainly or not at all: the lift sizes (16.5 x 4.5 m
   drawn, centreline, as in the previous file - the photographs show their
   outlines only faintly); the spot positions (staggered, after P2 and P4,
   approximate); the after-face door (one, drawn starboard of centre after P2);
   the torpedo tubes (behind hull doors; not drawn); the AK-725 directors and
   the small antennas I could not identify; the rudders. No hull number,
   name or ensign.

   NO TRAINED MOUNT: the row has no turret flag, so nothing is named
   "turret"; every mount is baked, at rest pointing forward.
   FLIGHT DECK: one clean flat plate, top at z = 9.75, from the stern
   (x = -94.5) to the after face of the superstructure (x = -12.0), nothing
   standing on it (lifts and spots are painted in its texture). render3d's
   deckOf reads it from the aft eighth of the plan; no "helipad" node.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. Every part
   is merged into one mesh per material. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMoskva = (function () {
  "use strict";
  var PI = Math.PI;
  var XS = -93.0;            /* transom, below the stern gallery            */
  var XB = 94.5;             /* stem at the deck                            */
  var XFD0 = -94.5;          /* flight deck after edge                      */
  var XFD1 = -12.0;          /* flight deck forward edge = superstructure   */
  var FD = 9.75;             /* flight deck top                             */
  var FDU = 9.0;             /* flight deck underside                       */
  var GAL = 4.6;             /* stern gallery floor                         */
  var HZ0 = -0.45, HZ1 = 11.4;

  var PAINT = { hull: "#787b7d", sup: "#8b8f93", deck: "#a6a398", fc: "#8f8e88",
                boot: "#17191b", under: "#4a2a24", line: "#e4e2d8", spot: "#8c897f" };

  /* ------------------------------------------------------ hull tables (D1, P1)
     xn: nominal station (stern -93 .. stem 94.5) */
  var HW = [[-93, 8.6], [-85, 10.0], [-70, 11.0], [-50, 11.5], [20, 11.5], [40, 11.2],
            [55, 10.2], [68, 8.2], [78, 5.6], [86, 2.8], [91, 0.9], [94.5, 0.0]];
  /* deck-edge half-width: the teardrop of P1 - full width to the bridge,
     where the AK-725 stand at the edge, then curving in to the bow */
  var HD = [[-93, 13.2], [-88, 16.6], [-82, 16.8], [-40, 16.8], [-18, 16.8], [0, 16.4],
            [12, 15.8], [22, 14.8], [32, 13.6], [40, 12.6], [55, 10.8], [68, 8.6],
            [78, 6.4], [86, 3.8], [91, 1.7], [94.5, 0.25]];
  var KZ = [[-93, -1.6], [-86, -3.8], [-78, -6.4], [-68, -7.7], [94.5, -7.7]];
  var BP = [[-93, 1.6], [-70, 2.6], [-40, 3.2], [30, 3.2], [60, 2.2], [80, 1.4], [94.5, 1.2]];
  var FL = [[-93, 2.2], [-40, 2.0], [0, 1.7], [40, 1.5], [94.5, 1.25]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  /* upper deck: flush at 9.7 m, sheer rising forward to 11.2 m at the stem */
  function deckZ(x) { return x <= 25 ? 9.7 : 9.7 + 1.5 * Math.pow((x - 25) / 69.5, 2); }
  function zRef(xn) { return xn < XFD1 ? FDU : deckZ(xn); }
  /* the stem: raked above water, a rounded forefoot below */
  function xStem(z) {
    if (z >= 0) return 89.3 + 5.2 * Math.min(1, z / 11.2);
    return 89.3 - 9.3 * Math.pow(Math.min(1, -z / 7.7), 1.5);
  }
  function xAt(xn, z) { var u = (xn - XS) / (XB - XS); return XS + u * (xStem(z) - XS); }
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var hd = tab(HD, xn), zr = zRef(xn);
    return hw + (hd - hw) * Math.pow(Math.min(1, z / zr), tab(FL, xn));
  }
  /* flight deck plan: half width at x (0.3 m proud of the hull, rounded stern) */
  function fdHalf(x) {
    var w = tab(HD, Math.max(-88, x)) + 0.3;
    if (x < -88) w = w * Math.sqrt(Math.max(0, 1 - Math.pow((x + 88) / 6.5, 2)));
    return w;
  }

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
  /* plain plate in a colour: seams, a little weathering and rust streaks */
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
    g.globalAlpha = 0.08; g.fillStyle = "#2a2018";
    for (i = 0; i < 14; i++) g.fillRect(R() * W, R() * H, 2, 20 + R() * 40);
    g.globalAlpha = 1;
    return (TEX[key] = finish(THREE, cv, [1, 1]));
  }
  /* the hull sides along her length: boot-top, plate seams, two scuttle rows
     forward of the flight deck and one under it, the hawse pipes. Top half
     of the canvas starboard, lower half port. */
  function hullUV(xn, z, port) {
    var f = (z - HZ0) / (HZ1 - HZ0);
    return [(xn - XS) / (XB - XS), port ? 0.5 * f : 0.5 + 0.5 * f];
  }
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 2048, H = 512, HH = H / 2, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(1123), i, x, s;
    var px = function (X) { return (X - XS) / (XB - XS) * W; };
    var pz = function (Z, top) { return (top ? 0 : HH) + (1 - (Z - HZ0) / (HZ1 - HZ0)) * HH; };
    var mz = HH / (HZ1 - HZ0), mx = W / (XB - XS);
    for (s = 0; s < 2; s++) {
      var top = s === 0;
      g.fillStyle = PAINT.hull; g.fillRect(0, pz(HZ1, top), W, pz(0.55, top) - pz(HZ1, top));
      g.fillStyle = PAINT.boot; g.fillRect(0, pz(0.55, top), W, pz(HZ0, top) - pz(0.55, top) + 1);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (x = -90; x < 94; x += 7.0) { g.beginPath(); g.moveTo(px(x), pz(11, top)); g.lineTo(px(x), pz(0.6, top)); g.stroke(); }
      [2.6, 5.4, 8.0].forEach(function (zz) { g.beginPath(); g.moveTo(0, pz(zz, top)); g.lineTo(W, pz(zz, top)); g.stroke(); });
      g.globalAlpha = 0.07;
      for (i = 0; i < 60; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * W, pz(1.5 + R() * 8, top), 20 + R() * 80, 3 + R() * 8);
      }
      g.globalAlpha = 0.14; g.fillStyle = "#3a2a20";
      for (i = 0; i < 40; i++) g.fillRect(R() * W, pz(8.6 - R() * 6, top), 1.5, 5 + R() * 12);
      g.globalAlpha = 1;
      /* scuttles: a row 2.4 m under the deck the whole length, a second row
         forward of the flight deck 2.4 m lower (P2: sparse) */
      g.fillStyle = "#15181a";
      for (x = -84; x <= 82; x += 3.6) {
        if (x > -16 && x < -9) continue;
        var zr = 7.1 + (x > 25 ? (deckZ(x) - 9.7) * 0.8 : 0);
        g.fillRect(px(x) - 0.22 * mx, pz(zr, top), 0.45 * mx, 0.4 * mz);
        if (x > -8 && x < 70 && (((x + 84) / 3.6) | 0) % 2 === 0) g.fillRect(px(x + 1.8) - 0.22 * mx, pz(zr - 2.4, top), 0.45 * mx, 0.4 * mz);
      }
      /* hawse pipes high in the bow flare */
      g.beginPath(); g.arc(px(85.5), pz(8.4, top), 0.55 * mz, 0, PI * 2); g.fill();
    }
    return (TEX.hull = finish(THREE, cv));
  }
  /* the flight deck in plan: pale plating (P2), seams, wear, the four
     staggered spots - two circles and a cross bar in a darker square - the
     two lifts as outlines on the centreline, the deck-edge line and a thin
     centreline. No numbers or letters. */
  var FDY = 17.4;
  function deckTex(THREE) {
    if (TEX.fd) return TEX.fd;
    var W = 1024, H = 464, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(6767), i, x, y;
    var px = function (X) { return (X - XFD0) / (XFD1 - XFD0) * W; };
    var py = function (Y) { return (1 - (Y + FDY) / (2 * FDY)) * H; };
    var sm = W / (XFD1 - XFD0), sn = H / (2 * FDY);
    g.fillStyle = PAINT.deck; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.09; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (y = -16; y <= 16; y += 2) { g.beginPath(); g.moveTo(0, py(y)); g.lineTo(W, py(y)); g.stroke(); }
    for (x = -94; x < -12; x += 6) { g.beginPath(); g.moveTo(px(x), 0); g.lineTo(px(x), H); g.stroke(); }
    g.globalAlpha = 0.07;
    for (i = 0; i < 90; i++) {
      g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
      g.fillRect(R() * W, R() * H, 10 + R() * 70, 6 + R() * 30);
    }
    g.globalAlpha = 1;
    /* spots: staggered port and starboard (P2, P4) */
    [[-81, 7.0], [-64, -7.6], [-47, 7.6], [-30, -7.6]].forEach(function (c) {
      var cx = px(c[0]), cy = py(c[1]);
      g.fillStyle = PAINT.spot; g.fillRect(cx - 5.0 * sm, cy - 5.0 * sn, 10.0 * sm, 10.0 * sn);
      g.strokeStyle = PAINT.line; g.lineWidth = 0.35 * sm;
      g.beginPath(); g.ellipse(cx, cy, 4.2 * sm, 4.2 * sn, 0, 0, PI * 2); g.stroke();
      g.beginPath(); g.ellipse(cx, cy, 2.5 * sm, 2.5 * sn, 0, 0, PI * 2); g.stroke();
      g.fillStyle = PAINT.line; g.fillRect(cx - 1.6 * sm, cy - 0.18 * sn, 3.2 * sm, 0.36 * sn);
    });
    /* lifts: two on the centreline, 16.5 x 4.5 m, a darker tone and an outline */
    [[-40.0, -23.5], [-73.0, -56.5]].forEach(function (L) {
      g.fillStyle = "rgba(0,0,0,0.13)"; g.fillRect(px(L[0]), py(2.25), (L[1] - L[0]) * sm, 4.5 * sn);
      g.strokeStyle = PAINT.line; g.lineWidth = 2; g.strokeRect(px(L[0]), py(2.25), (L[1] - L[0]) * sm, 4.5 * sn);
    });
    /* thin centreline from the stern to the lifts */
    g.fillStyle = PAINT.line;
    for (x = -92; x < -14; x += 4) if (!(x > -74 && x < -56) && !(x > -41 && x < -23)) g.fillRect(px(x), py(0.12), 2.2 * sm, 0.24 * sn);
    /* deck-edge line, inset 0.7 m */
    g.strokeStyle = PAINT.line; g.lineWidth = 2; g.beginPath();
    for (x = XFD1; x >= XFD0 + 0.8; x -= 1) { var yy = fdHalf(x) - 0.7; if (yy < 0) continue; g.lineTo(px(x), py(yy)); }
    for (x = XFD0 + 0.8; x <= XFD1; x += 1) { var y2 = fdHalf(x) - 0.7; if (y2 < 0) continue; g.lineTo(px(x), py(-y2)); }
    g.stroke();
    return (TEX.fd = finish(THREE, cv));
  }

  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var tex = function (map, r) { return new THREE.MeshStandardMaterial({ color: 0xffffff, map: map, roughness: r, metalness: 0.06 }); };
    var flat = function (col, r, m) { return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m }); };
    var M = {
      hull:  tex(hullTex(THREE), 0.88),
      under: tex(plateTex(THREE, PAINT.under, 5), 0.9),
      sup:   tex(plateTex(THREE, PAINT.sup, 11), 0.86),
      deck:  tex(plateTex(THREE, PAINT.fc, 23), 0.93),
      fdeck: tex(deckTex(THREE), 0.93),
      dark:  flat(0x15181a, 0.9, 0.05),
      metal: flat(0x5b6268, 0.55, 0.5),
      white: flat(0xc4c8ca, 0.6, 0.04),
      team:  flat(team, 0.8, 0.08),
      glass: new THREE.MeshStandardMaterial({ color: 0x0c151c, roughness: 0.12, metalness: 0.0,
                                              transparent: true, opacity: 0.88 })
    };
    for (var k in M) if (M.hasOwnProperty(k)) { M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true; }
    return M;
  }

  /* ------------------------------------------------------------ helpers */
  function geoMesh(THREE, pos, idx, uv, m) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  }
  function box(THREE, p, lx, ly, lz, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (ry) b.rotation.y = ry; p.add(b); return b;
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
  function sphere(THREE, p, m, r, x, y, z) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8), m);
    s.position.set(x, y, z); p.add(s); return s;
  }
  /* a block from its bottom rectangle (x0a..x1a, |y| <= ya, z = za) to its
     top rectangle (x0b..x1b, |y| <= yb, z = zb): a raked tier */
  function hexa(THREE, p, m, x0a, x1a, ya, za, x0b, x1b, yb, zb) {
    var V = [[x0a, -ya, za], [x1a, -ya, za], [x1a, ya, za], [x0a, ya, za],
             [x0b, -yb, zb], [x1b, -yb, zb], [x1b, yb, zb], [x0b, yb, zb]];
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.12, v[1] * 0.12);
      else if (i < 8) uv.push(v[0] * 0.12, v[2] * 0.12);
      else uv.push(v[1] * 0.12, v[2] * 0.12);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    var mm = new THREE.Mesh(g, m); p.add(mm); return mm;
  }
  function tprism(THREE, p, lx0, ly0, lx1, ly1, lz, m, x, y, z) {
    var mm = hexa(THREE, p, m, -lx0 / 2, lx0 / 2, ly0 / 2, -lz / 2, -lx1 / 2, lx1 / 2, ly1 / 2, lz / 2);
    mm.position.set(x, y, z); return mm;
  }
  /* a blast panel: a wedge sloping from (yIn, z1) down to (yOut, z0), x0..x1 */
  function wedge(THREE, p, m, x0, x1, yIn, yOut, z0, z1) {
    var sh = new THREE.Shape();
    sh.moveTo(yIn, z0); sh.lineTo(yOut, z0); sh.lineTo(yIn, z1); sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: x1 - x0, bevelEnabled: false, curveSegments: 1 });
    g.applyMatrix4(new THREE.Matrix4().set(0, 0, 1, x0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1));
    /* (the extruder winds either hand of the triangle outward itself) */
    var mm = new THREE.Mesh(g, m); p.add(mm); return mm;
  }
  /* a rail along a run of points at height h above them */
  function rail(THREE, g, T, pts, h) {
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i];
      strut(THREE, g, T.metal, a[0], a[1], a[2], a[0], a[1], a[2] + h, 0.03, 3);
      if (i) { var b = pts[i - 1]; strut(THREE, g, T.metal, b[0], b[1], b[2] + h, a[0], a[1], a[2] + h, 0.025, 3); }
    }
  }
  /* a parabolic dish, closed (front and back), facing +X, rim radius r */
  function dish(THREE, p, m, r, depth, x, y, z, ry) {
    var pts = [], n = 6, i;
    for (i = 0; i <= n; i++) { var t = i / n; pts.push(new THREE.Vector2(Math.max(0.001, r * t), depth * t * t)); }
    for (i = n; i >= 0; i--) { var u = i / n; pts.push(new THREE.Vector2(Math.max(0.001, r * u * 0.97), depth * u * u - 0.12)); }
    var g = new THREE.LatheGeometry(pts, 14); g.rotateZ(-PI / 2);
    var ix = g.index.array;               /* the loop runs inside-out: turn the faces */
    for (i = 0; i < ix.length; i += 3) { var t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    g.computeVertexNormals();
    var d = new THREE.Mesh(g, m); d.position.set(x, y, z); if (ry) d.rotation.z = ry; p.add(d); return d;
  }

  /* --------------------------------------------------------------- hull */
  function hullStrip(THREE, m, xs, zA, zB, F, cap, paint) {
    var pos = [], uv = [], idx = [], n = F.length, i, j, s, xn, z, base;
    for (s = 0; s < 2; s++) {
      var sg = s === 0 ? 1 : -1;
      base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        xn = xs[i];
        var a = zA(xn), b = zB(xn);
        for (j = 0; j < n; j++) {
          z = a + (b - a) * F[j];
          pos.push(xAt(xn, z), sg * sideY(xn, z), z);
          if (paint) uv.push.apply(uv, hullUV(xn, z, s === 0)); else uv.push(xn / 12, z / 12);
        }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n - 1; j++) {
        var A = base + i * n + j, B = A + 1, Cc = A + n, D = Cc + 1;
        if (sg > 0) idx.push(A, B, Cc, B, D, Cc); else idx.push(A, Cc, B, B, Cc, D);
      }
    }
    if (cap) {
      xn = xs[0]; base = pos.length / 3;
      var a0 = zA(xn), b0 = zB(xn);
      for (j = 0; j < n; j++) {
        z = a0 + (b0 - a0) * F[j]; var y = sideY(xn, z), xx = xAt(xn, z);
        pos.push(xx, y, z, xx, -y, z);
        if (paint) { var q = hullUV(xn + 0.4, z, true); uv.push(q[0], q[1], q[0], q[1]); }
        else uv.push(y / 12, z / 12, -y / 12, z / 12);
      }
      for (j = 0; j < n - 1; j++) {
        var P0 = base + 2 * j, S0 = P0 + 1, P1 = P0 + 2, S1 = P0 + 3;
        idx.push(P0, S0, P1, S0, S1, P1);
      }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  var FU = [0, 0.02, 0.06, 0.13, 0.25, 0.42, 0.62, 0.82, 1.0];
  var FT = [0, 0.1, 0.22, 0.36, 0.5, 0.64, 0.77, 0.89, 1.0];
  function hullPiece(THREE, g, T, xs, top, cap) {
    var kz = function (xn) { return tab(KZ, xn); };
    g.add(hullStrip(THREE, T.under, xs, kz, function () { return HZ0; }, FU, cap, false));
    g.add(hullStrip(THREE, T.hull, xs, function () { return HZ0; }, top, FT, cap, true));
  }
  /* a flat deck ribbon over a run of stations at the hull's own edge */
  function ribbon(THREE, m, xs, zf, inset, NC) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < xs.length; i++) {
      var xn = xs[i], z = zf(xn), w = Math.max(0.05, sideY(xn, z) - inset), x = xAt(xn, z);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 10, w * (1 - 2 * j / NC) / 10); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }

  /* ---------------------------------------------------- the flight deck */
  function flightDeck(THREE, g, T) {
    var out = [], x, i;
    [XFD1, -18, -40, -82].forEach(function (q) { out.push([q, fdHalf(q)]); });
    for (i = 0; i <= 14; i++) {
      var a = i / 14 * PI / 2;                       /* round the stern */
      out.push([-88 - 6.5 * Math.sin(a), fdHalf(-88) * Math.cos(a)]);
    }
    for (i = 13; i >= 0; i--) {
      var b = i / 14 * PI / 2;
      out.push([-88 - 6.5 * Math.sin(b), -fdHalf(-88) * Math.cos(b)]);
    }
    [-88, -82, -40, -18, XFD1].forEach(function (q) { out.push([q, -fdHalf(q)]); });
    var P = [];
    out.forEach(function (q) { var l = P[P.length - 1]; if (!l || Math.abs(l[0] - q[0]) + Math.abs(l[1] - q[1]) > 0.05) P.push(q); });
    var sh = new THREE.Shape();
    sh.moveTo(P[0][0], P[0][1]);
    for (i = 1; i < P.length; i++) sh.lineTo(P[i][0], P[i][1]);
    sh.closePath();
    var top = new THREE.ShapeGeometry(sh), pa = top.attributes.position, uv = [];
    for (i = 0; i < pa.count; i++) {
      uv.push((pa.getX(i) - XFD0) / (XFD1 - XFD0), (pa.getY(i) + FDY) / (2 * FDY));
      pa.setZ(i, FD);
    }
    top.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    top.computeVertexNormals();
    g.add(new THREE.Mesh(top, T.fdeck));
    var bot = new THREE.ShapeGeometry(sh), pb = bot.attributes.position;
    for (i = 0; i < pb.count; i++) pb.setZ(i, FDU);
    var ix = bot.index.array;
    for (i = 0; i < ix.length; i += 3) { var t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    bot.computeVertexNormals();
    g.add(new THREE.Mesh(bot, T.sup));
    /* fascia all round */
    var pos = [], uu = [], idx = [];
    for (i = 0; i < P.length; i++) {
      var p0 = P[i], p1 = P[(i + 1) % P.length], k = pos.length / 3;
      pos.push(p0[0], p0[1], FDU, p1[0], p1[1], FDU, p1[0], p1[1], FD, p0[0], p0[1], FD);
      var q0 = hullUV(p0[0], 9.3, p0[1] > 0), q1 = hullUV(p1[0], 9.3, p0[1] > 0);
      uu.push(q0[0], q0[1], q1[0], q1[1], q1[0], q1[1], q0[0], q0[1]);
      idx.push(k, k + 1, k + 2, k, k + 2, k + 3);
    }
    g.add(geoMesh(THREE, pos, idx, uu, T.hull));
    /* deck-edge safety netting: outriggers below the deck top along both sides */
    var np = [], nu = [], ni = [];
    for (var s = -1; s <= 1; s += 2) {
      var b0 = np.length / 3, xs = [];
      for (x = -86; x <= -14; x += 3) xs.push(x);
      xs.forEach(function (xx) {
        var w = fdHalf(xx);
        np.push(xx, s * (w + 0.05), FD - 0.45, xx, s * (w + 1.2), FD - 0.75);
        nu.push(xx / 6, 0, xx / 6, 1);
      });
      for (i = 0; i < xs.length - 1; i++) {
        var A = b0 + 2 * i, B = A + 1, Cc = A + 2, D = A + 3;
        if (s > 0) ni.push(A, Cc, B, B, Cc, D); else ni.push(A, B, Cc, B, D, Cc);
      }
    }
    g.add(geoMesh(THREE, np, ni, nu, T.metal));
    /* the netting frames: posts every 6 m */
    for (s = -1; s <= 1; s += 2) for (x = -86; x <= -14; x += 6) {
      var w2 = fdHalf(x);
      strut(THREE, g, T.metal, x, s * (w2 + 0.05), FD - 0.45, x, s * (w2 + 1.2), FD + 0.2, 0.04, 3);
    }
  }

  /* ------------------------------------------------------------- weapons */
  /* twin-arm launcher at rest, trained forward, arms level (M-11 ZIF-101 and
     the SUW-N-1 MS-18 share the layout; P1, P4) */
  function twinArm(THREE, g, T, armLen) {
    cylZ(THREE, g, 1.0, 1.15, 1.8, 14, T.sup, 0, 0, 0.9);
    tprism(THREE, g, 2.2, 2.1, 1.7, 1.8, 1.0, T.sup, 0, 0, 2.3);
    box(THREE, g, 1.4, 3.4, 0.7, T.sup, 0.2, 0, 3.1);
    for (var s = -1; s <= 1; s += 2) {
      box(THREE, g, armLen, 0.42, 0.5, T.sup, armLen * 0.38, s * 1.35, 3.75);
      box(THREE, g, armLen * 0.85, 0.16, 0.2, T.metal, armLen * 0.36, s * 1.35, 3.4);
      box(THREE, g, 0.6, 0.5, 0.6, T.dark, armLen * 0.38 + armLen * 0.5 - 0.3, s * 1.35, 3.75);
    }
    return g;
  }
  /* RBU-6000: a horseshoe of twelve barrels on a trained cradle (P1) */
  function rbu(THREE, g, T) {
    cylZ(THREE, g, 0.75, 0.9, 1.1, 12, T.sup, 0, 0, 0.55);
    box(THREE, g, 1.3, 2.0, 1.0, T.sup, -0.2, 0, 1.55);
    var c = new THREE.Group(); c.position.set(0.2, 0, 2.5); c.rotation.y = -0.45; g.add(c);
    for (var i = 0; i < 12; i++) {
      var a = -PI * 0.15 + i / 11 * PI * 1.3;
      cylX(THREE, c, 0.11, 0.11, 1.8, 6, T.metal, 0.3, Math.cos(a) * 0.6, Math.sin(a) * 0.6);
    }
    cylX(THREE, c, 0.32, 0.32, 1.0, 10, T.sup, -0.2, 0, 0);
    return g;
  }
  /* twin 57 mm AK-725: domed shield, two barrels (P1) */
  function ak725(THREE, g, T) {
    cylZ(THREE, g, 1.6, 1.7, 0.5, 16, T.sup, 0, 0, 0.25);
    var dg = new THREE.SphereGeometry(1.5, 16, 7, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2); dg.scale(1.2, 1, 0.9);
    var d = new THREE.Mesh(dg, T.sup); d.position.set(0, 0, 0.5); g.add(d);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.09, 0.09, 3.6, 6, T.metal, 3.0, s * 0.35, 1.05, true);
      cylX(THREE, g, 0.16, 0.16, 0.6, 6, T.metal, 1.6, s * 0.35, 1.05);
    }
    return g;
  }
  /* 4R60 Grom (Head Light) director (P1): pedestal, cabin, two big dishes
     with X feed struts, two small dishes above, a dome on top and a small
     dish under the middle */
  function headLight(THREE, g, T, ped) {
    cylZ(THREE, g, 0.9, 1.1, ped, 12, T.sup, 0, 0, ped / 2);
    cylZ(THREE, g, 1.6, 1.6, 0.5, 14, T.sup, 0, 0, ped + 0.25);
    box(THREE, g, 2.6, 2.6, 2.4, T.sup, -0.3, 0, ped + 1.7);
    var z0 = ped + 1.8;
    for (var s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.6, 1.0, 0.5, T.sup, 0.4, s * 1.5, z0);
      dish(THREE, g, T.sup, 1.9, 0.75, 0.9, s * 2.5, z0);
      var fx = 2.5;
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) {
        strut(THREE, g, T.metal, 1.6, s * 2.5 + q[0] * 1.3, z0 + q[1] * 1.3, fx, s * 2.5, z0, 0.05, 3);
      });
      cylX(THREE, g, 0.18, 0.12, 0.5, 6, T.dark, fx + 0.2, s * 2.5, z0);
      dish(THREE, g, T.sup, 0.85, 0.35, 0.8, s * 1.15, ped + 3.6);
    }
    var dm = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 5, 0, PI * 2, 0, PI / 2), T.sup);
    dm.rotation.x = PI / 2; dm.position.set(-0.4, 0, ped + 2.9); g.add(dm);
    dish(THREE, g, T.sup, 0.6, 0.25, 1.1, 0, ped + 0.9);
    return g;
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = makeMats(THREE, C);
    var s, i, x;

    /* ---------------- hull: the stern below the gallery, then the main body */
    var aftXs = [-93, -91.5, -89.5, -87, -84.5, -82.5];
    hullPiece(THREE, g, T, aftXs, function () { return GAL; }, true);
    var mainXs = [-82.5, -80, -76, -70, -62, -54, -46, -38, -30, -24, -18, -12.2, -11.8, -6, 0, 6, 14, 22,
                  30, 38, 46, 54, 61, 67, 72, 76, 80, 83.5, 86.5, 89, 91, 92.6, 93.7, 94.5];
    hullPiece(THREE, g, T, mainXs, zRef, true);
    g.add(ribbon(THREE, T.deck, aftXs, function () { return GAL + 0.02; }, 0.02, 3));
    var fx = [];
    for (x = -12.0; x < 93.7; x += 3) fx.push(x);
    fx.push(93.7, 94.4);
    g.add(ribbon(THREE, T.deck, fx, function (xn) { return deckZ(xn) + 0.04; }, 0.03, 4));

    /* ---------------- flight deck (nothing stands on it) */
    flightDeck(THREE, g, T);

    /* stern gallery: posts under the deck's after edge, the towed-sonar gear */
    for (i = -4; i <= 4; i++) {
      var yy = i * 2.3, xp = -92.6 + Math.abs(i) * 0.15;
      strut(THREE, g, T.metal, xp, yy, GAL, xp, yy, FDU, 0.2, 6);
    }
    for (s = -1; s <= 1; s += 2) [-89.5, -86.0].forEach(function (xq) {
      strut(THREE, g, T.metal, xq, s * (sideY(xq, GAL) - 0.3), GAL, xq, s * (sideY(xq, GAL) - 0.3), FDU, 0.2, 6);
    });
    box(THREE, g, 4.2, 3.6, 2.4, T.sup, -88.0, 0, GAL + 1.2);
    cylX(THREE, g, 0.9, 0.9, 3.4, 12, T.dark, -90.2, 0, GAL + 1.6);
    box(THREE, g, 0.3, 5.0, 3.0, T.metal, -91.6, 0, GAL + 2.6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -91.6, s * 2.4, GAL, -91.6, s * 2.4, GAL + 4.0, 0.12, 6);
    /* the dark gallery back wall under the deck */
    box(THREE, g, 0.2, 18.0, FDU - GAL - 0.1, T.dark, -82.6, 0, (GAL + FDU) / 2);

    /* ---------------- superstructure (D1 rows, P1, P2) */
    /* T1 base block, two decks: after face x = -12.0 */
    hexa(THREE, g, T.sup, -12.0, 21.6, 7.4, 9.7, -12.0, 21.6, 7.4, 15.4);
    /* T2 to the bridge: front at 20.6 */
    hexa(THREE, g, T.sup, -12.0, 20.6, 6.9, 15.4, -12.2, 20.4, 6.7, 21.0);
    /* T3: the tier forward of the tower, to the upper director (D1) */
    hexa(THREE, g, T.sup, -4.0, 9.0, 6.2, 21.0, -4.0, 8.4, 5.3, 28.5);
    /* T4: the pyramid tower in one taper from the 21 m deck to the funnel,
       its after face leaning aft, forward face at -3 (D1, P2) */
    hexa(THREE, g, T.sup, -12.2, -2.4, 6.6, 21.0, -14.4, -3.4, 4.3, 34.6);
    /* galleries: thin decks round the tiers' tops */
    hexa(THREE, g, T.sup, -12.6, 21.8, 7.8, 15.25, -12.6, 21.8, 7.8, 15.45);
    hexa(THREE, g, T.sup, -12.8, 21.2, 7.3, 20.85, -12.8, 21.2, 7.3, 21.05);
    hexa(THREE, g, T.sup, -13.8, 9.6, 6.0, 28.35, -13.8, 9.6, 6.0, 28.55);
    /* bridge front glazing and side windows */
    box(THREE, g, 0.12, 11.4, 1.0, T.glass, 20.62, 0, 19.6);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 6.0, 0.12, 0.9, T.glass, 16.8, s * 6.86, 19.6);
      for (i = 0; i < 8; i++) box(THREE, g, 1.0, 0.08, 0.6, T.dark, -9 + i * 4.0, s * 7.43, 13.2);
      for (i = 0; i < 6; i++) box(THREE, g, 1.0, 0.08, 0.6, T.dark, -7 + i * 4.0, s * 6.88, 17.4);
      /* side doors and the ladders up the tiers (P1, P2) */
      box(THREE, g, 1.2, 0.1, 2.0, T.dark, 12.5, s * 7.43, 10.7);
      box(THREE, g, 1.2, 0.1, 2.0, T.dark, -6.5, s * 7.43, 10.7);
      strut(THREE, g, T.metal, 8.0, s * 7.9, 9.7, 11.0, s * 7.9, 15.3, 0.12, 3);
      strut(THREE, g, T.metal, 0.0, s * 7.4, 15.4, 3.0, s * 7.4, 20.9, 0.12, 3);
      /* side platforms on the tower carrying the globes, with rails */
      hexa(THREE, g, T.sup, -2.0, 7.0, 1.5, 24.9, -2.0, 7.0, 1.5, 25.15).position.set(0, s * 6.6, 0);
      for (i = 0; i < 4; i++) strut(THREE, g, T.metal, -2.0 + i * 3.0, s * 8.05, 25.15, -2.0 + i * 3.0, s * 8.05, 26.1, 0.03, 3);
      strut(THREE, g, T.metal, -2.0, s * 8.05, 26.1, 7.0, s * 8.05, 26.1, 0.03, 3);
    }
    for (i = 0; i < 6; i++) box(THREE, g, 0.08, 1.0, 0.6, T.dark, 21.63, -6.25 + i * 2.5, 13.2);
    /* the door in the after face (P2) and a small one beside it */
    box(THREE, g, 0.14, 4.6, 5.2, T.dark, -12.07, -1.6, FD + 2.6);
    box(THREE, g, 0.14, 1.2, 2.2, T.dark, -12.07, 4.4, FD + 1.1);
    /* the after face's platform at 20 m (D1: the bump aft at 20-22 m) */
    hexa(THREE, g, T.sup, -15.0, -12.0, 5.0, 19.8, -15.0, -12.0, 5.0, 20.1);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -14.8, s * 4.6, 18.0, -12.1, s * 4.6, 19.8, 0.07, 4);

    /* rails round the tier tops (P1, P2) */
    rail(THREE, g, T, [[-12.4, 7.75, 15.45], [21.7, 7.75, 15.45], [21.7, -7.75, 15.45], [-12.4, -7.75, 15.45]], 1.0);
    rail(THREE, g, T, [[-12.6, 7.25, 21.05], [21.1, 7.25, 21.05], [21.1, -7.25, 21.05], [-12.6, -7.25, 21.05]], 1.0);
    rail(THREE, g, T, [[-3.4, 5.95, 28.55], [9.5, 5.95, 28.55], [9.5, -5.95, 28.55], [-3.4, -5.95, 28.55]], 1.0);
    /* whips at the funnel's after edge (D1) */
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -16.4, s * 2.2, 37.1, -16.9, s * 2.4, 41.0, 0.05, 3);
    /* funnel drum on the tower top: flared lip, dark cap (D1, P2) */
    var ug = new THREE.CylinderGeometry(1.06, 1.0, 2.2, 28, 1); ug.rotateX(PI / 2); ug.scale(3.75, 4.3, 1);
    var up = new THREE.Mesh(ug, T.sup); up.position.set(-12.9, 0, 35.7); g.add(up);
    var lg = new THREE.CylinderGeometry(1.0, 1.0, 0.35, 28, 1); lg.rotateX(PI / 2); lg.scale(4.05, 4.6, 1);
    var lip = new THREE.Mesh(lg, T.sup); lip.position.set(-12.9, 0, 36.95); g.add(lip);
    var mg = new THREE.CircleGeometry(1, 28); mg.scale(3.8, 4.35, 1);
    var mouth = new THREE.Mesh(mg, T.dark); mouth.position.set(-12.9, 0, 37.14); g.add(mouth);
    for (i = -4; i <= 4; i++) box(THREE, g, 7.0 * Math.sqrt(Math.max(0, 1 - Math.pow(i / 4.4, 2))), 0.12, 0.12, T.dark, -12.9, i * 0.95, 37.2);

    /* AK-725 at the deck edges abreast the bridge, on low sponsons (P1) */
    for (s = -1; s <= 1; s += 2) {
      hexa(THREE, g, T.sup, 16.0, 22.0, 2.2, 9.7, 16.0, 22.0, 2.2, 10.3).position.set(0, s * 11.8, 0);
      var gun = new THREE.Group(); gun.position.set(19.0, s * 12.0, 10.3); ak725(THREE, gun, T); g.add(gun);
    }
    /* Side Globe radomes: two pairs a side on brackets (D1, P1) */
    for (s = -1; s <= 1; s += 2) [[2.2, 26.4, 6.95], [2.2, 28.7, 6.6], [4.8, 18.3, 7.95], [4.8, 20.5, 7.8]].forEach(function (q) {
      sphere(THREE, g, T.white, 0.95, q[0], s * q[2], q[1]);
      box(THREE, g, 1.3, 1.3, 0.14, T.sup, q[0], s * (q[2] - 0.45), q[1] - 0.98);
      strut(THREE, g, T.metal, q[0], s * (q[2] - 1.0), q[1] - 0.98, q[0], s * (q[2] - 1.6), q[1] - 2.2, 0.06, 3);
    });
    /* the two Head Lights stacked on the front (D1, P1) */
    var d1 = new THREE.Group(); d1.position.set(19.0, 0, 21.0); headLight(THREE, d1, T, 1.4); g.add(d1);
    var d2 = new THREE.Group(); d2.position.set(6.6, 0, 28.5); headLight(THREE, d2, T, 1.6); g.add(d2);
    /* their platforms */
    hexa(THREE, g, T.sup, 15.6, 21.6, 4.2, 20.85, 15.6, 21.6, 4.2, 21.1);
    hexa(THREE, g, T.sup, 3.4, 9.6, 4.0, 28.35, 3.4, 9.6, 4.0, 28.6);

    /* lattice yards out to both sides at the tower top (P1) */
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * 4.3, y1 = s * 11.0;
      [[-10.2, 33.6], [-8.6, 33.6], [-10.2, 34.4], [-8.6, 34.4]].forEach(function (q) {
        strut(THREE, g, T.metal, q[0], y0, q[1], q[0], y1, q[1], 0.06, 3);
      });
      for (i = 0; i <= 6; i++) {
        var yl = y0 + (y1 - y0) * i / 6;
        strut(THREE, g, T.metal, -10.2, yl, 33.6, -8.6, yl, 34.4, 0.04, 3);
        strut(THREE, g, T.metal, -10.2, yl, 34.4, -8.6, yl, 33.6, 0.04, 3);
      }
      strut(THREE, g, T.metal, -9.4, y1, 33.6, -9.4, y1, 37.2, 0.07, 4);
      strut(THREE, g, T.metal, -9.4, y1 - s * 2.5, 34.4, -9.4, y1 - s * 2.5, 36.2, 0.05, 3);
      strut(THREE, g, T.metal, -9.4, y0, 31.0, -9.4, y1 * 0.8, 33.6, 0.05, 3);
    }

    /* ---------------- lattice mast out of the funnel drum, Head Net, Top Sail */
    var LB = [[-10.0, -2.4], [-10.0, 2.4], [-5.6, -2.4], [-5.6, 2.4]];
    var mz0 = 37.1, mz1 = 48.6, TP = [[-8.0, -0.85], [-8.0, 0.85], [-6.2, -0.85], [-6.2, 0.85]];
    for (i = 0; i < 4; i++) strut(THREE, g, T.dark, LB[i][0], LB[i][1], mz0, TP[i][0], TP[i][1], mz1, 0.2, 5);
    var lev = function (f) { return LB.map(function (b, k) { return [b[0] + (TP[k][0] - b[0]) * f, b[1] + (TP[k][1] - b[1]) * f, mz0 + (mz1 - mz0) * f]; }); };
    [0.2, 0.4, 0.6, 0.8].forEach(function (f) {
      var R4 = lev(f), ring = [0, 2, 3, 1, 0];
      for (var k = 0; k < 4; k++) { var a = R4[ring[k]], b = R4[ring[k + 1]]; strut(THREE, g, T.dark, a[0], a[1], a[2], b[0], b[1], b[2], 0.07, 4); }
    });
    [[0, 2], [1, 3], [0, 1], [2, 3]].forEach(function (pr) {
      [0, 0.2, 0.4, 0.6, 0.8].forEach(function (f) {
        var A = lev(f), B = lev(f + 0.2);
        strut(THREE, g, T.dark, A[pr[0]][0], A[pr[0]][1], A[pr[0]][2], B[pr[1]][0], B[pr[1]][1], B[pr[1]][2], 0.06, 3);
      });
    });
    box(THREE, g, 3.4, 2.8, 0.25, T.metal, -7.1, 0, mz1 + 0.1);
    box(THREE, g, 3.4, 3.8, 0.2, T.metal, -7.6, 0, 42.0);
    /* yard across the mast */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, -7.6, s * 1.4, 44.6, -7.6, s * 6.5, 44.6, 0.08, 4);
      strut(THREE, g, T.metal, -7.6, s * 1.2, 45.6, -7.6, s * 6.5, 44.8, 0.05, 4);
      strut(THREE, g, T.metal, -7.6, s * 6.5, 44.6, -7.6, s * 6.5, 45.8, 0.05, 4);
    }
    /* Head Net (MR-310 Angara) on its bracket on the mast front (D1) */
    box(THREE, g, 3.0, 1.6, 0.25, T.metal, -4.3, 0, 37.6);
    cylZ(THREE, g, 0.3, 0.35, 1.2, 8, T.metal, -2.6, 0, 38.3);
    var hn = new THREE.Group(); hn.position.set(-2.6, 0, 39.4); g.add(hn);
    [0.38, -0.38].forEach(function (ra) {
      var bar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 5.8, 1.3), T.metal);
      bar.rotation.x = ra; hn.add(bar);
    });
    box(THREE, hn, 0.9, 0.14, 0.14, T.metal, 0.5, 0, 0);
    /* Top Sail (MR-600 Voskhod): the big reflector at the masthead, curved
       in elevation, concave forward, leaning back (D1, P1, P2) */
    cylZ(THREE, g, 0.6, 0.8, 1.6, 10, T.metal, -7.1, 0, mz1 + 1.0);
    strut(THREE, g, T.metal, -7.6, 0, mz1, -7.6, 0, 54.4, 0.08, 4);
    var ts = new THREE.Group(); ts.position.set(-5.4, 0, 49.4); ts.rotation.y = -0.42; g.add(ts);
    var NA = 8, RR = 9.0, HW2 = 3.0, tp = [], ti = [], tu = [];
    for (i = 0; i <= NA; i++) {
      var fa = -0.5 + i / NA * 1.0;
      var px0 = RR * (1 - Math.cos(fa)), pz0 = RR * Math.sin(fa) * 0.94;
      tp.push(px0, -HW2, pz0, px0, HW2, pz0); tu.push(0, i / NA, 1, i / NA);
    }
    for (i = 0; i < NA; i++) { var q0 = 2 * i; ti.push(q0, q0 + 2, q0 + 1, q0 + 1, q0 + 2, q0 + 3, q0, q0 + 1, q0 + 2, q0 + 1, q0 + 3, q0 + 2); }
    ts.add(geoMesh(THREE, tp, ti, tu, T.metal));
    for (i = 0; i <= 4; i++) {
      var fb = -0.5 + i / 4;
      box(THREE, ts, 0.3, 6.2, 0.14, T.dark, RR * (1 - Math.cos(fb)) - 0.12, 0, RR * Math.sin(fb) * 0.94);
    }
    for (i = -2; i <= 2; i++) box(THREE, ts, 0.35, 0.14, 8.6, T.dark, -0.15, i * 1.45, 0);
    box(THREE, ts, 0.3, 3.6, 0.3, T.metal, 3.6, 0, -0.6);
    for (s = -1; s <= 1; s += 2) strut(THREE, ts, T.metal, 0.4, s * 2.6, -3.2, 3.6, s * 1.8, -0.6, 0.06, 4);

    /* ---------------- forward: deckhouses and launchers (D1, P1, P4) */
    /* raised deckhouse with the after M-11 between sloped panels */
    hexa(THREE, g, T.sup, 21.6, 35.8, 5.2, 9.7, 21.6, 35.2, 5.0, 14.3);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) box(THREE, g, 0.9, 0.08, 0.55, T.dark, 24 + i * 3.6, s * 5.12, 12.6);
    var l3 = new THREE.Group(); l3.position.set(30.3, 0, 14.3); twinArm(THREE, l3, T, 6.0); g.add(l3);
    /* its two blast panels sloping up from the roof edges (P1, P2, P4) */
    for (s = -1; s <= 1; s += 2) wedge(THREE, g, T.sup, 28.0, 32.6, s * 2.0, s * 4.8, 14.3, 16.0);
    /* the thin pole between the deckhouses */
    strut(THREE, g, T.metal, 35.6, 0, 14.3, 35.6, 0, 21.4, 0.1, 5);
    strut(THREE, g, T.metal, 35.6, -1.4, 19.5, 35.6, 1.4, 19.5, 0.05, 3);
    /* low deckhouse */
    hexa(THREE, g, T.sup, 35.8, 44.2, 4.0, deckZ(35.8), 36.2, 43.8, 3.7, 12.2);
    /* forward M-11 on its magazine trunk, flat panels */
    cylZ(THREE, g, 2.4, 2.6, 2.4, 16, T.sup, 52.1, 0, deckZ(52.1) + 1.2);
    var l2 = new THREE.Group(); l2.position.set(52.1, 0, deckZ(52.1) + 2.3); twinArm(THREE, l2, T, 6.0); g.add(l2);
    for (s = -1; s <= 1; s += 2) wedge(THREE, g, T.sup, 49.9, 54.3, s * 2.4, s * 5.2, deckZ(52.1), deckZ(52.1) + 2.3);
    /* SUW-N-1 on its pedestal, longer arms, no panels */
    cylZ(THREE, g, 1.6, 2.0, 1.4, 16, T.sup, 64.6, 0, deckZ(64.6) + 0.7);
    var l1 = new THREE.Group(); l1.position.set(64.6, 0, deckZ(64.6) + 0.6); twinArm(THREE, l1, T, 7.6); g.add(l1);
    /* the two RBU-6000 in tandem; the forward one between the anchor capstans */
    [72.6, 83.4].forEach(function (xr) {
      var r = new THREE.Group(); r.position.set(xr, 0, deckZ(xr)); rbu(THREE, r, T); g.add(r);
    });
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.7, 0.8, 0.8, 12, T.metal, 83.4, s * 2.5, deckZ(83.4) + 0.4);
      strut(THREE, g, T.dark, 83.4, s * 2.5, deckZ(83.4) + 0.08, 86.2, s * 3.3, deckZ(86.2) + 0.08, 0.12, 4);
      for (i = 0; i < 3; i++) cylZ(THREE, g, 0.22, 0.22, 0.6, 8, T.metal, 40 + i * 18, s * (sideY(40 + i * 18, deckZ(40 + i * 18)) - 1.0), deckZ(40 + i * 18) + 0.3);
    }
    /* the low bulwark across the bow (P1) */
    for (s = -1; s <= 1; s += 2) {
      var bw = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.6, 0.9), T.sup);
      bw.position.set(86.0, s * 1.75, deckZ(86) + 0.45); bw.rotation.z = s * 0.5; g.add(bw);
    }
    strut(THREE, g, T.metal, 93.9, 0, deckZ(93.9), 93.9, 0, deckZ(93.9) + 3.0, 0.05, 4);

    /* working boats in crutches beside the raised deckhouse (P1) */
    for (s = -1; s <= 1; s += 2) {
      tprism(THREE, g, 7.4, 1.8, 8.5, 2.5, 1.1, T.white, 30.0, s * 9.9, 11.1);
      box(THREE, g, 3.2, 1.9, 0.9, T.sup, 29.0, s * 9.9, 12.1);
      for (i = -1; i <= 1; i += 2) box(THREE, g, 0.4, 2.2, 0.8, T.metal, 30 + i * 2.6, s * 9.9, 10.2);
      strut(THREE, g, T.metal, 26.2, s * 8.0, 9.7, 26.2, s * 10.2, 13.6, 0.08, 4);
      strut(THREE, g, T.metal, 33.8, s * 8.0, 9.7, 33.8, s * 10.2, 13.6, 0.08, 4);
    }

    /* ---------------- railings: waist and forecastle edges */
    for (s = -1; s <= 1; s += 2) {
      var prev = null;
      for (x = -11.0; x <= 91.5; x += 3.6) {
        var zd = deckZ(x) + 0.04, yd = s * (sideY(x, deckZ(x)) - 0.15), xx = xAt(x, deckZ(x));
        strut(THREE, g, T.metal, xx, yd, zd, xx, yd, zd + 1.0, 0.04, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.98, xx, yd, zd + 0.98, 0.025, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.5, xx, yd, zd + 0.5, 0.02, 3);
        }
        prev = [xx, yd, zd];
      }
    }

    /* ---------------- underwater: two shafts and screws (rudders not drawn) */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.32, 0.32, 20.0, 8, T.metal, -68.0, s * 4.6, -5.0);
      strut(THREE, g, T.metal, -74.0, s * 4.6, -5.0, -74.0, s * 3.0, -2.6, 0.14, 4);
      cylX(THREE, g, 0.45, 0.6, 0.9, 8, T.metal, -78.4, s * 4.6, -5.0);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6, 1.7), T.metal);
        bl.position.set(-78.4, s * 4.6, -5.0); bl.rotation.x = i * PI / 2 + 0.4;
        bl.translateZ(1.0); bl.rotation.y = 0.45; g.add(bl);
      }
    }

    /* ---------------- team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 4.0, 1.2, 0.04, T.team, 40.0, 0, 12.22);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, 25.2, 0, 14.32);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, 12.0, 0, 21.06);

    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  /* One mesh per material: bake every mesh under root into merged geometry */
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

UNIT_MODELS["pact_e60_carrier"] = {
  len: 189.0,
  build: function (THREE, M, C) { return HeroMoskva.build(THREE, M, C); }
};
