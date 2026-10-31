/* ==================== js/hero/ru_slava.js ===============================
   HERO MODEL -- Project 1164 "Atlant" (Slava class) guided-missile cruiser.
   Keys: pact_e80_cruiser (the ships as completed, 1982-1980s),
   pact_e00_cruiser (the 2000s: the same fit, Russian grey) and cruiser_p
   (the present day: Marshal Ustinov as refitted 2011-2016, see PERIODS).
   Length overall 186.4 m, beam 20.8 m (js/warship_specs.js len 186.4 beam
   20.8), draught about 7.6 m (published figure, not from a fetched source).

   REFERENCES (Wikimedia Commons, fetched small; what each feature rests on):
     - "Slava class cruiser profile 1986.png" (recognition profile, 787 px =
       186.4 m, 4.22 px/m): every station and height below. The sea line is
       drawn 5 px under the hull, and heights are taken from it: the deck
       6.2 m at the stern, level to the tube banks, rising from about +50 m
       to 8.2 m at the gun and 10.3 m at the stem; the stem raked 10.3 m
       (82.9 m at the waterline to 93.2 m at the deck); the hangar 10.9 m;
       the Top Dome 19.0 m; the funnel 18.7 m; the Top Pair 31.1 m; the
       foremast 37.7 m. Cross-check, "Slava-Cruiser-DN-SC-86-03642.JPEG"
       (Slava, 1986, broadside): Top Dome 19.9, funnel 19.9, Top Pair 32.2,
       foremast 37.9 m scaled by length - 3 to 5 % over the profile, as a
       slightly turned hull gives.
     - "Cruiser Slava aerial starboard 1983.jpg" and "Cruiser Slava elevated
       port view 1984.jpg" (USN, from above): the plan - the pad with its
       ring at the stern (20.7 m), the hangar deckhouse with the Top Dome on
       a block over it, the two oval groups of four S-300F hatches abaft the
       funnel, the boats and the davit crane beside it, the funnel with its
       all-black top, the main mast, the four pairs of P-500 tubes a side
       over a gallery with an opening under each pair, the pyramid foremast
       on the bridge block, the forward block between the banks, the AK-130
       in its round dome with the barrels forward.
     - "A partial aerial port side view ... MARSHAL USTINOV ... DPLA" (1980s,
       close from above): the gallery wall with its openings and saddles,
       the tubes' domed fore caps, the stack of round ECM domes on the main
       mast block, the Top Pair's two curved lattice reflectors back to back,
       the Top Steer's curved lattice and flat panel at the foremast head.
     - "Project 1164 Moskva 2012 G2.jpg" (Sevastopol, port quarter): the
       2000s fit unchanged - Top Pair, Top Steer, Top Dome on the hangar,
       the hangar door in its after face; the pad deck edge red-brown.
     - "Russian cruiser Marshal Ustinov MOD 45164874.jpg" (UK MOD, after
       the 2011-2016 refit): the main mast carrying a tall flat lattice
       array leaning aft, the foremast head a flat solid back-to-back panel,
       the hull, mounts, tubes and Top Dome otherwise as built, the decks
       red-brown. Russian Wikipedia ("Marshal Ustinov (raketny kreyser)", in Russian):
       in that refit she got the "Podberyozovik" 3D long-range radar and the
       "Fregat-M2M" phased-array set - the two new antennas in the photograph.
     - Russian Wikipedia ("Raketnye kreysera proekta 1164", in Russian): the hangar is
       the separate after island crowned by the 3R41 Volna (Top Dome), with
       the pad abaft it; 16 P-500 (later P-1000) in fixed tubes, 11.7 m
       missiles; S-300F, 64 rounds in 8 revolver launchers below deck; two
       Osa-MA (magazines at frames 300-310, aft); six AK-630; two RBU-6000;
       commander's boat Project 1404 and work boat Project 1402.

   RECOGNITION LIST (where each shows):
     1. Sixteen fat tubes in four pairs a side, raised forward 16 degrees,
        over the gallery with an opening under each pair - x +8 to +55.
     2. The pyramid foremast on the bridge block, its head antenna - x +16.
     3. The main mast: pyramid block, then a round mast with the Top Pair
        (Podberyozovik on cruiser_p) - x -7.5, 31 m.
     4. The tall square funnel with its all-black top - x -24.5 to -13.
     5. The Top Dome on its block over the hangar - x -58.8, 19 m.
     6. The pad with its ring at the stern, the hangar door before it.
     7. Two oval groups of four S-300F hatches - x -47.5 to -35.8.
     8. The twin AK-130 in its round dome on the forecastle - x +63.5.
     9. The strongly raked stem and the long low after deck.
    10. The stack of round ECM domes on the main mast block, the boats and
        davit crane beside the funnel.

   PERIODS (paint sampled, then taken to about 0.8 of its level):
     e80 (pact_e80_cruiser): DN-SC-86-03642 in sun - hull #bab2a9, tower
       #cdc5c5, pad #82674e: hull 0x958e87, superstructure 0x9d9894, decks
       red-brown 0x68523e.
     e00 (pact_e00_cruiser): Moskva 2012 G2 - hull #898e95, superstructure
       #84858c, dome #828d91: hull 0x7b8086, superstructure 0x7c7f86,
       decks red-brown at the pad edge, 0x5f4a45. Same fit as e80: the
       2009-2012 Moskva photographs show the Top Pair and Top Steer.
     e20 (cruiser_p): Marshal Ustinov MOD 45164874 (overcast) - hull
       #63676b, superstructure #615f62, deck #786769 / #593c3d: hull
       0x5d6266, superstructure 0x63676a, deck 0x644e4e. The fit is hers
       after the refit: Podberyozovik on the main mast, Fregat-M2M at the
       foremast head. Varyag and Moskva also served in the 2020s; no
       photograph I read dates a change on them, so the one documented
       present-day fit is drawn.
   NOT CONFIRMED and therefore not drawn or drawn plainly: the RBU-6000 and
   the Osa-MA launchers and their directors (no photograph I read shows where
   they stand; the old model's Osa bins on the forward block are removed -
   Russian Wikipedia puts the Osa magazines aft); the exact positions of the
   six AK-630 and their directors (drawn at the corners of the blocks, as
   before); the torpedo tube doors; the rudders; antennas smaller than the
   main sets. No hull number, name or ensign.

   TRAINED MOUNT: the twin AK-130 forward is the group named "turret"
   (at rest pointing forward); everything else is baked.
   HELICOPTER PAD: one clean flat plate (x = -93.2 to -72.5, top z = 6.24)
   with only its painted ring; nothing stands on it. It is at the level of
   her after eighth, so render3d's deckOf finds it without a marker.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. Every part
   is merged into one mesh per material (10 materials).
   ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSlava = (function () {
  "use strict";
  var PI = Math.PI;
  var XS = -93.2, XB = 93.2;
  var PADX0 = -93.2, PADX1 = -72.5, PADC = -82.8;

  /* ---- station tables (profile and the two aerial plans) ---- */
  /* waterline half-breadth */
  var HW = [[-93.2, 6.2], [-86, 7.9], [-75, 9.0], [-55, 9.4], [30, 9.4], [45, 9.0], [58, 8.2],
            [68, 6.8], [76, 4.9], [82, 2.4], [86, 0.9], [93.2, 0.0]];
  /* deck half-breadth: wide square stern, long fine bow */
  var HD = [[-93.2, 7.4], [-90, 8.6], [-82, 9.8], [-68, 10.3], [-50, 10.4], [40, 10.4], [50, 10.1],
            [58, 9.4], [66, 8.3], [74, 6.8], [81, 5.0], [86, 3.4], [90, 1.9], [93.2, 0.3]];
  var KZ = [[-93.2, -3.0], [-86, -5.2], [-76, -7.2], [-62, -7.6], [93.2, -7.6]];
  /* bilge fullness (exponent of the section), flare above the waterline */
  var BP = [[-93.2, 1.8], [-70, 2.6], [-40, 3.2], [30, 3.2], [60, 2.4], [80, 1.6], [93.2, 1.3]];
  var FL = [[-93.2, 2.0], [0, 1.6], [40, 1.3], [93.2, 1.1]];
  /* deck height: level aft and amidships, the sheer rising from the banks */
  var DZT = [[-93.2, 6.2], [-60, 6.25], [0, 6.3], [48, 6.4], [55, 6.9], [62, 8.1], [72, 8.8],
             [82, 9.5], [93.2, 10.3]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  function deckZ(x) { return tab(DZT, x); }
  /* the stem: raked above water (82.9 -> 93.2 m), a rounded forefoot below */
  function xStem(z) {
    if (z >= 0) return 82.9 + 10.3 * Math.min(1, z / 10.3);
    return 82.9 - 9.0 * Math.pow(Math.min(1, -z / 7.6), 1.5);
  }
  function xAt(xn, z) { var u = (xn - XS) / (XB - XS); return XS + u * (xStem(z) - XS); }
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var hd = tab(HD, xn), zr = deckZ(xn);
    return hw + (hd - hw) * Math.pow(Math.min(1, z / zr), tab(FL, xn));
  }

  /* ---------------------------------------------------------- palettes */
  var PAL = {
    e80: { hull: 0x958e87, sup: 0x9d9894, deck: 0x624d3a, padc: "#665240" },
    e00: { hull: 0x7b8086, sup: 0x7c7f86, deck: 0x5f4a45, padc: "#634e49" },
    e20: { hull: 0x5d6266, sup: 0x63676a, deck: 0x644e4e, padc: "#665252" }
  };

  /* ---------------------------------------------------------- textures */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function finish(THREE, cv, rep, clamp) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
    if (rep) t.repeat.set(rep[0], rep[1]);
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }
  /* plating: frame and stringer seams, weathering patches */
  function plateTex(THREE, rep) {
    var key = "p" + rep[0] + "_" + rep[1];
    if (TEX[key]) return TEX[key];
    var W = 256, H = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(1164), i;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 6; i++) {
      g.beginPath(); g.moveTo(0, i * H / 6); g.lineTo(W, i * H / 6); g.stroke();
      g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke();
    }
    g.globalAlpha = 0.07;
    for (i = 0; i < 30; i++) {
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 16 + R() * 58, 10 + R() * 38);
    }
    g.globalAlpha = 0.10; g.fillStyle = "#3a2a20";
    for (i = 0; i < 14; i++) g.fillRect(R() * W, R() * H * 0.6, 2, 18 + R() * 50);   /* rust streaks */
    g.globalAlpha = 1;
    return (TEX[key] = finish(THREE, cv, rep));
  }
  /* the funnel top: exhaust grilles, all black in the 1983 aerial */
  function grilleTex(THREE) {
    if (TEX.gr) return TEX.gr;
    var W = 128, H = 128, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), i;
    g.fillStyle = "#1a1c1d"; g.fillRect(0, 0, W, H);
    g.fillStyle = "#050606";
    for (i = 0; i < 16; i++) g.fillRect(4, 4 + i * 7.6, W - 8, 4);
    g.fillStyle = "#2e3133"; g.fillRect(W / 2 - 2, 0, 4, H);
    return (TEX.gr = finish(THREE, cv, [1, 1], true));
  }
  /* the pad in plan: red-brown plating, edge line, the ring and its centre
     mark and the fore-and-aft line through it (1983 and 1984 aerials) */
  var PADW = 9.0;
  function padTex(THREE, bg) {
    if (TEX["pad" + bg]) return TEX["pad" + bg];
    var W = 512, H = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(2024), i;
    var sx = W / (PADX1 - PADX0), sy = H / (2 * PADW);
    var px = function (X) { return (X - PADX0) * sx; };
    var py = function (Y) { return (1 - (Y + PADW) / (2 * PADW)) * H; };
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (i = -8; i <= 8; i += 2) { g.beginPath(); g.moveTo(0, py(i)); g.lineTo(W, py(i)); g.stroke(); }
    g.globalAlpha = 0.07;
    for (i = 0; i < 40; i++) {
      g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
      g.fillRect(R() * W, R() * H, 10 + R() * 50, 6 + R() * 24);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "#e4e6e0"; g.lineWidth = 6;
    g.beginPath(); g.arc(px(PADC), py(0), 5.2 * sx, 0, PI * 2); g.stroke();
    g.lineWidth = 4;
    g.beginPath(); g.arc(px(PADC), py(0), 1.2 * sx, 0, PI * 2); g.stroke();
    g.beginPath(); g.moveTo(px(PADC - 6.5), py(0)); g.lineTo(px(PADC + 6.5), py(0)); g.stroke();
    return (TEX["pad" + bg] = finish(THREE, cv, null, true));
  }

  function makeMats(THREE, C, P) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      hull:  skin(P.hull, plateTex(THREE, [16, 1.2]), 0.86),
      boot:  skin(0x16191b, plateTex(THREE, [16, 1]), 0.9),
      under: skin(0x3f2622, plateTex(THREE, [10, 2]), 0.9),
      sup:   skin(P.sup, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(P.deck, plateTex(THREE, [12, 1.5]), 0.95),
      hatch: skin(0x3d4245, plateTex(THREE, [1, 1]), 0.9),
      pad:   skin(0xffffff, padTex(THREE, P.padc), 0.93),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      team:  skin(team, plateTex(THREE, [1, 1]), 0.84),
      metal: metal(0x555c62, 0.52, 0.55)
    };
  }
  function sealMats(M) {
    for (var k in M) if (M.hasOwnProperty(k)) {
      M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true;
    }
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
  function sphere(THREE, p, r, m, x, y, z, ws, hs) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, ws || 10, hs || 6), m);
    s.position.set(x, y, z); p.add(s); return s;
  }
  /* a cylinder along +X raised forward by tilt */
  function tubeAx(THREE, p, m, cx, cy, cz, len, r, seg, tilt, open) {
    var g = new THREE.CylinderGeometry(r, r, len, seg, 1, !!open); g.rotateZ(-PI / 2); g.rotateY(-tilt);
    var c = new THREE.Mesh(g, m); c.position.set(cx, cy, cz); p.add(c); return c;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* a block from its bottom rectangle (x0a..x1a, |y| <= ya, z = za) to its
     top rectangle (x0b..x1b, |y| <= yb, z = zb) */
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

  /* --------------------------------------------------------------- hull */
  function hullStrip(THREE, m, xs, zA, zB, F, cap) {
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
          uv.push(xn / 12, z / 12);
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
        pos.push(xx, y, z, xx, -y, z); uv.push(y / 12, z / 12, -y / 12, z / 12);
      }
      for (j = 0; j < n - 1; j++) {
        var P0 = base + 2 * j, S0 = P0 + 1, P1 = P0 + 2, S1 = P0 + 3;
        if (pos[3 * P0 + 1] === pos[3 * S0 + 1]) idx.push(S0, S1, P1);   /* keel point: no sliver */
        else idx.push(P0, S0, P1, S0, S1, P1);
      }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  var FU = [0, 0.02, 0.06, 0.13, 0.25, 0.42, 0.62, 0.82, 1.0];
  var FB = [0, 1];
  var FT = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.88, 1.0];
  function hullPiece(THREE, g, T, xs) {
    var kz = function (xn) { return tab(KZ, xn); };
    g.add(hullStrip(THREE, T.under, xs, kz, function () { return -0.45; }, FU, true));
    g.add(hullStrip(THREE, T.boot, xs, function () { return -0.45; }, function () { return 0.6; }, FB, true));
    g.add(hullStrip(THREE, T.hull, xs, function () { return 0.6; }, deckZ, FT, true));
  }
  /* a flat deck ribbon over a run of stations at the hull's own edge */
  function ribbon(THREE, m, xs, zf, inset, NC, uvf) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < xs.length; i++) {
      var xn = xs[i], z = zf(xn), w = Math.max(0.05, sideY(xn, z) - inset), x = xAt(xn, z);
      for (j = 0; j <= NC; j++) {
        var yy = w * (1 - 2 * j / NC);
        pos.push(x, yy, z);
        if (uvf) { var q = uvf(x, yy); uv.push(q[0], q[1]); } else uv.push(x / 10, yy / 10);
      }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }

  /* ------------------------------------------------------------- weapons */
  /* twin 130 mm AK-130 in its round dome, barrels forward, at rest */
  function ak130(THREE, g, T) {
    cylZ(THREE, g, 3.0, 3.15, 0.6, 22, T.sup, 0, 0, 0.3);
    var dg = new THREE.SphereGeometry(2.8, 22, 9, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2); dg.scale(1.15, 1, 0.98);
    var d = new THREE.Mesh(dg, T.sup); d.position.set(0, 0, 0.6); g.add(d);
    box(THREE, g, 0.4, 2.2, 1.1, T.hatch, 3.05, 0, 1.6);
    box(THREE, g, 1.4, 0.9, 0.7, T.sup, -0.6, 0, 3.3);          /* sight hood on the roof */
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.14, 0.15, 7.6, 8, T.metal, 6.6, s * 0.62, 1.6, true);
      cylX(THREE, g, 0.30, 0.30, 2.0, 10, T.sup, 3.9, s * 0.62, 1.6);
      cylX(THREE, g, 0.2, 0.2, 0.5, 8, T.metal, 10.3, s * 0.62, 1.6);
    }
    return g;
  }
  /* AK-630: base, domed housing, the barrel bundle; at rest along +X */
  function ak630(THREE, g, T) {
    cylZ(THREE, g, 0.6, 0.66, 0.7, 10, T.sup, 0, 0, 0.35);
    var dg = new THREE.SphereGeometry(0.66, 10, 3, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2);
    var d = new THREE.Mesh(dg, T.sup); d.position.set(0, 0, 0.7); g.add(d);
    cylX(THREE, g, 0.17, 0.17, 1.9, 6, T.metal, 1.0, 0, 1.0, true);
    cylX(THREE, g, 0.26, 0.26, 0.5, 6, T.metal, 0.35, 0, 1.0);
    return g;
  }
  /* a flat lattice array in its own plane (x thin): dark mesh, frame, bars */
  function lattice(THREE, g, T, w, h, thick, nv, nh) {
    var i;
    box(THREE, g, thick * 0.35, w - 0.2, h - 0.2, T.hatch, 0, 0, 0);
    box(THREE, g, thick, w, 0.14, T.metal, 0, 0, h / 2);
    box(THREE, g, thick, w, 0.14, T.metal, 0, 0, -h / 2);
    box(THREE, g, thick, 0.14, h, T.metal, 0, w / 2, 0);
    box(THREE, g, thick, 0.14, h, T.metal, 0, -w / 2, 0);
    for (i = 1; i < nv; i++) box(THREE, g, thick * 0.6, 0.07, h, T.metal, 0, -w / 2 + i * w / nv, 0);
    for (i = 1; i < nh; i++) box(THREE, g, thick * 0.6, w, 0.07, T.metal, 0, 0, -h / 2 + i * h / nh);
    return g;
  }
  /* a curved lattice reflector, concave toward +X: n panels round a parabola
     across its width, a rib at each joint, rails top and bottom */
  function reflector(THREE, g, T, w, h, depth, n) {
    var k, prev = null;
    for (k = 0; k <= n; k++) {
      var y = -w / 2 + k * w / n, x = depth * (4 * y * y / (w * w));
      if (prev) {
        var mx = (x + prev[0]) / 2, my = (y + prev[1]) / 2, dy = y - prev[1], dx = x - prev[0];
        var L = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dx, dy);
        var pnl = new THREE.Mesh(new THREE.BoxGeometry(0.12, L, h - 0.2), T.hatch);
        pnl.position.set(mx, my, 0); pnl.rotation.z = -ang; g.add(pnl);
        var r1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, L, 0.14), T.metal);
        r1.position.set(mx, my, h / 2); r1.rotation.z = -ang; g.add(r1);
        var r2 = r1.clone(); r2.position.z = -h / 2; g.add(r2);
        var r3 = r1.clone(); r3.position.z = 0; r3.scale.set(0.6, 1, 0.6); g.add(r3);
      }
      box(THREE, g, 0.2, 0.1, h, T.metal, x, y, 0);
      prev = [x, y];
    }
    return g;
  }

  function build(THREE, M, C, era) {
    var P = PAL[era] || PAL.e80, late = era === "e20";
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C, P));
    var s, i, j, x;

    /* ---------------- hull */
    var xs = [-93.2, -90, -85, -78, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 46, 51, 55, 58.5,
              62, 66, 70, 74, 78, 81, 84, 86.5, 89, 91, 92.4, 93.2];
    hullPiece(THREE, g, T, xs);
    /* deck: the pad plate aft, the deck proper forward of it */
    var px = [], dx = [];
    for (x = PADX0; x < PADX1; x += 3) px.push(x);
    px.push(PADX1);
    g.add(ribbon(THREE, T.pad, px, function (xn) { return deckZ(xn) + 0.04; }, 0.02, 8,
      function (X, Y) { return [(X - PADX0) / (PADX1 - PADX0), (Y + PADW) / (2 * PADW)]; }));
    for (x = PADX1; x < 92.4; x += 2.5) dx.push(x);
    dx.push(92.4, 93.1);
    g.add(ribbon(THREE, T.deck, dx, function (xn) { return deckZ(xn) + 0.04; }, 0.03, 4));

    /* scuttle rows and the hawse pipes */
    for (x = -88; x <= 86; x += 5.0) {
      if (x > 6 && x < 56) continue;
      for (s = -1; s <= 1; s += 2) {
        var zz = deckZ(x) - 1.6;
        box(THREE, g, 0.36, 0.06, 0.36, T.hatch, xAt(x, zz), s * (sideY(x, zz) + 0.03), zz);
      }
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 1.0, 0.1, 1.0, T.hatch, xAt(86.0, 7.6), s * (sideY(86.0, 7.6) + 0.02), 7.6);

    /* ---------------- the hangar island and the Top Dome */
    hexa(THREE, g, T.sup, -72.5, -51.0, 7.6, 6.2, -72.5, -51.0, 6.9, 9.5);
    hexa(THREE, g, T.sup, -72.5, -63.0, 6.9, 9.5, -72.3, -63.3, 6.5, 10.9);
    hexa(THREE, g, T.sup, -62.6, -54.8, 4.9, 9.5, -62.3, -55.2, 4.5, 12.7);
    cylZ(THREE, g, 2.3, 2.5, 1.5, 18, T.sup, -58.8, 0, 13.45);
    var tdg = new THREE.SphereGeometry(3.0, 20, 12); tdg.rotateX(PI / 2);
    var td = new THREE.Mesh(tdg, T.sup); td.position.set(-58.8, 0, 16.0); g.add(td);
    /* the hangar door in the after face, windows, ladders */
    box(THREE, g, 0.12, 7.6, 4.2, T.hatch, -72.56, 0, 8.4);
    box(THREE, g, 0.14, 7.8, 0.18, T.metal, -72.6, 0, 10.55);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 4; i++) box(THREE, g, 1.0, 0.08, 0.6, T.hatch, -68.0 + i * 4.2, s * 7.25, 8.3);
      box(THREE, g, 0.12, 1.4, 1.0, T.hatch, -72.56, s * 5.9, 8.7);
      /* the after deckhouse's wing platforms with an AK-630 each, aimed aft */
      var a1 = new THREE.Group(); a1.position.set(-53.0, s * 5.6, 9.5); a1.rotation.z = PI; ak630(THREE, a1, T); g.add(a1);
      cylZ(THREE, g, 0.7, 0.75, 0.9, 10, T.sup, -56.5, s * 3.0, 13.15);
      sphere(THREE, g, 0.75, T.sup, -56.5, s * 3.0, 13.8, 10, 6);
    }

    /* ---------------- S-300F: two oval groups of four flush revolver hatches */
    var HX = [-47.5, -43.6, -39.7, -35.8];
    for (s = -1; s <= 1; s += 2) {
      var ov = new THREE.CylinderGeometry(1, 1, 0.08, 24, 1); ov.rotateX(PI / 2); ov.scale(8.6, 2.15, 1);
      var ovm = new THREE.Mesh(ov, T.hatch); ovm.position.set(-41.65, s * 2.6, deckZ(-41.65) + 0.06); g.add(ovm);
      for (i = 0; i < 4; i++) {
        cylZ(THREE, g, 1.6, 1.6, 0.06, 18, T.sup, HX[i], s * 2.6, deckZ(HX[i]) + 0.12);
        box(THREE, g, 2.6, 0.12, 0.04, T.metal, HX[i], s * 2.6, deckZ(HX[i]) + 0.17);
        box(THREE, g, 0.12, 2.6, 0.04, T.metal, HX[i], s * 2.6, deckZ(HX[i]) + 0.17);
      }
    }

    /* boats on their cradles and the davit cranes beside the funnel */
    for (s = -1; s <= 1; s += 2) {
      tprism(THREE, g, 8.0, 1.8, 9.0, 2.7, 1.2, T.sup, -26.0, s * 8.6, 7.7);
      box(THREE, g, 3.2, 1.9, 1.0, T.sup, -27.0, s * 8.6, 8.8);
      box(THREE, g, 1.0, 1.95, 0.5, T.hatch, -25.0, s * 8.6, 8.55);
      for (i = -1; i <= 1; i += 2) box(THREE, g, 0.4, 2.2, 0.9, T.metal, -26.0 + i * 2.8, s * 8.6, 6.75);
      strut(THREE, g, T.metal, -31.6, s * 8.9, 6.3, -31.6, s * 8.9, 12.6, 0.2, 6);
      strut(THREE, g, T.metal, -31.6, s * 8.9, 12.4, -26.5, s * 8.7, 10.6, 0.13, 5);
      strut(THREE, g, T.metal, -26.5, s * 8.7, 10.6, -26.5, s * 8.7, 9.3, 0.03, 3);
    }

    /* ---------------- the funnel: lower deckhouse, the tall square casing,
       its all-black top of exhaust grilles */
    hexa(THREE, g, T.sup, -32.5, -12.5, 7.0, 6.3, -32.5, -12.5, 6.6, 12.4);
    hexa(THREE, g, T.sup, -24.5, -13.1, 5.3, 12.4, -24.3, -13.3, 5.0, 18.6);
    box(THREE, g, 10.6, 9.6, 0.1, T.dark, -18.8, 0, 18.66);
    box(THREE, g, 11.4, 0.25, 0.5, T.sup, -18.8, 4.95, 18.85);
    box(THREE, g, 11.4, 0.25, 0.5, T.sup, -18.8, -4.95, 18.85);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) {
      box(THREE, g, 1.4, 0.08, 1.6, T.dark, -23.0 + i * 2.9, s * 5.15, 15.0);
      box(THREE, g, 1.0, 0.08, 0.6, T.hatch, -30.0 + i * 4.2, s * 6.95, 9.9);
    }
    /* life-raft canisters along the deckhouse edges */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 6; i++)
      cylX(THREE, g, 0.3, 0.3, 1.2, 8, T.sup, -31.0 + i * 1.5, s * 6.0, 12.75);

    /* ---------------- main mast block, the pyramid and the round mast */
    hexa(THREE, g, T.sup, -12.5, 8.5, 7.8, 6.3, -12.5, 8.5, 7.1, 12.2);
    hexa(THREE, g, T.sup, -11.0, -4.0, 3.4, 12.2, -9.0, -6.0, 1.4, 25.6);
    cylZ(THREE, g, 0.75, 0.95, 5.0, 12, T.sup, -7.5, 0, 28.1);
    /* the round ECM domes stacked on the block's sides (1980s aerial) */
    [14.0, 16.3, 18.6, 20.9].forEach(function (zq) {
      var f = (zq - 12.2) / 13.4, hy = 3.4 + (1.4 - 3.4) * f;
      for (var sg = -1; sg <= 1; sg += 2) sphere(THREE, g, 0.9, T.sup, -7.5, sg * (hy + 0.75), zq, 10, 6);
    });
    [15.2, 19.8, 24.0].forEach(function (zq) {
      var f = (zq - 12.2) / 13.4, hy = 3.4 + (1.4 - 3.4) * f + 0.6, hx = 3.5 - f * 2.0 + 0.6;
      box(THREE, g, 2 * hx, 2 * hy, 0.18, T.sup, -7.5, 0, zq);
    });
    cylZ(THREE, g, 1.7, 1.7, 0.2, 14, T.sup, -7.5, 0, 30.7);
    if (!late) {
      /* the Top Pair: two curved lattice reflectors back to back on a
         turntable, the big one forward, leaning aft (profile, 1986 photograph) */
      var tp = new THREE.Group(); tp.position.set(-7.5, 0, 33.4); tp.rotation.y = 0.45;
      var big = new THREE.Group(); big.position.set(1.2, 0, 0.5); big.rotation.z = PI;
      reflector(THREE, big, T, 7.8, 5.6, 1.6, 6); tp.add(big);
      var sm = new THREE.Group(); sm.position.set(-1.2, 0, -0.4);
      reflector(THREE, sm, T, 6.2, 3.6, 1.0, 5); tp.add(sm);
      box(THREE, tp, 2.4, 0.8, 4.8, T.metal, 0, 0, 0);
      for (s = -1; s <= 1; s += 2) {
        strut(THREE, tp, T.metal, 0, 0, -2.0, -0.3, s * 2.8, 2.2, 0.08, 4);
        strut(THREE, tp, T.metal, 0.2, s * 0.4, -2.2, 2.6, s * 3.0, 0.5, 0.06, 4);
      }
      /* the lattice arm aft of the mast head (profile) */
      strut(THREE, g, T.metal, -7.5, 0, 30.2, -12.5, 0, 30.0, 0.09, 4);
      strut(THREE, g, T.metal, -7.5, 0, 29.0, -12.5, 0, 30.0, 0.06, 4);
      g.add(tp);
    } else {
      /* Podberyozovik: one tall flat lattice array leaning aft (MOD 2017+) */
      var pb = new THREE.Group(); pb.position.set(-7.0, 0, 35.0); pb.rotation.y = -0.30;
      lattice(THREE, pb, T, 5.6, 8.2, 0.55, 4, 12); g.add(pb);
      box(THREE, g, 1.4, 1.4, 2.2, T.metal, -7.5, 0, 31.9);
      strut(THREE, g, T.metal, -7.5, 0, 31.0, -8.9, 0, 32.6, 0.12, 5);
    }

    /* two Bass Tilt style directors and two AK-630 on the deckhouse roof */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.7, 0.75, 0.9, 10, T.sup, 4.0, s * 5.2, 12.65);
      var sdg = new THREE.SphereGeometry(0.7, 10, 5, 0, PI * 2, 0, PI / 2); sdg.rotateX(PI / 2);
      var sdm = new THREE.Mesh(sdg, T.sup); sdm.position.set(4.0, s * 5.2, 13.1); g.add(sdm);
      var a2 = new THREE.Group(); a2.position.set(-1.0, s * 6.0, 12.2); a2.rotation.z = PI; ak630(THREE, a2, T); g.add(a2);
    }
    /* windows along the main deckhouse sides */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 8; i++) {
      box(THREE, g, 1.0, 0.08, 0.6, T.hatch, -10.8 + i * 2.3, s * 7.75, 8.6);
      box(THREE, g, 1.0, 0.08, 0.6, T.hatch, -10.8 + i * 2.3, s * 7.4, 10.6);
    }
    /* the long stay from the funnel roof up to the tower (profile) */
    strut(THREE, g, T.metal, -14.5, 0, 18.7, 11.5, 0, 27.0, 0.05, 3);

    /* ---------------- bridge block and the pyramid foremast */
    hexa(THREE, g, T.sup, 8.0, 34.8, 8.6, 6.3, 8.0, 34.8, 7.6, 12.6);
    hexa(THREE, g, T.sup, 11.5, 34.6, 6.6, 12.6, 12.0, 33.8, 6.2, 16.4);
    hexa(THREE, g, T.sup, 25.0, 33.6, 5.6, 16.4, 25.5, 33.2, 5.2, 17.4);
    cylZ(THREE, g, 1.8, 1.9, 1.0, 14, T.sup, 29.5, 0, 17.9);
    var kd = new THREE.SphereGeometry(1.3, 12, 6, 0, PI * 2, 0, PI / 2); kd.rotateX(PI / 2);
    var km = new THREE.Mesh(kd, T.sup); km.position.set(29.5, 0, 18.4); g.add(km);
    box(THREE, g, 0.6, 1.8, 0.9, T.sup, 31.2, 0, 18.6);
    /* bridge windows: the face and the sides */
    box(THREE, g, 0.12, 11.4, 1.0, T.hatch, 34.66, 0, 14.6);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 8.0, 0.12, 0.9, T.hatch, 29.5, s * 6.3, 14.6);
      for (i = 0; i < 6; i++) box(THREE, g, 1.0, 0.08, 0.6, T.hatch, 11.5 + i * 3.9, s * 8.15, 10.0);
      /* bridge wings */
      box(THREE, g, 4.6, 2.2, 0.16, T.sup, 31.5, s * 7.5, 16.1);
      box(THREE, g, 4.6, 0.06, 0.9, T.metal, 31.5, s * 8.55, 16.6);
      box(THREE, g, 0.06, 2.2, 0.9, T.metal, 33.8, s * 7.5, 16.6);
    }
    /* the tower: tapering, platforms, the radomes on its flanks */
    hexa(THREE, g, T.sup, 9.0, 24.5, 5.4, 16.4, 12.0, 19.5, 1.9, 30.2);
    [[5.0, 20.4], [6.4, 23.4], [6.4, 27.2]].forEach(function (q) {
      var f = (q[1] - 16.4) / 13.8, w = 5.4 + (1.9 - 5.4) * f;
      box(THREE, g, q[0], 2 * w + 1.6, 0.18, T.sup, 15.5, 0, q[1]);
    });
    for (s = -1; s <= 1; s += 2) {
      sphere(THREE, g, 1.0, T.sup, 12.0, s * 4.4, 21.2, 10, 6);
      sphere(THREE, g, 0.9, T.sup, 14.8, s * 3.4, 24.2, 10, 6);
      /* the lattice yard */
      strut(THREE, g, T.metal, 16.0, s * 1.6, 30.0, 15.6, s * 5.6, 30.0, 0.07, 4);
      strut(THREE, g, T.metal, 16.0, s * 1.6, 29.0, 15.6, s * 5.6, 30.0, 0.05, 3);
    }
    strut(THREE, g, T.metal, 15.8, 0, 30.2, 15.6, 0, 38.0, 0.13, 5);
    /* the foremast's working platforms and their rails, a ladder up its face */
    [[20.4, 6.0], [23.4, 5.2], [27.2, 4.0]].forEach(function (q) {
      for (var sg = -1; sg <= 1; sg += 2) box(THREE, g, 5.6, 0.05, 0.8, T.metal, 15.5, sg * q[1], q[0] + 0.5);
    });
    box(THREE, g, 0.1, 0.8, 9.0, T.metal, 21.9, 0, 21.8);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.6, 1.2, 1.2, T.sup, 19.6, s * 3.0, 26.6);
      sphere(THREE, g, 0.7, T.sup, 18.0, s * 2.2, 28.4, 10, 6);
    }
    if (!late) {
      /* Top Steer: a curved lattice facing forward, a flat panel aft */
      var ts = new THREE.Group(); ts.position.set(16.3, 0, 33.2); ts.rotation.y = 0.2;
      var tsr = new THREE.Group(); tsr.position.set(0.5, 0, 0); tsr.rotation.z = PI;
      reflector(THREE, tsr, T, 4.2, 2.4, 0.7, 4); ts.add(tsr);
      box(THREE, ts, 0.4, 3.0, 2.0, T.metal, -0.8, 0, 0.1);
      g.add(ts);
      box(THREE, g, 1.0, 1.0, 0.8, T.metal, 15.9, 0, 31.6);
    } else {
      /* Fregat-M2M: a flat back-to-back panel on a pedestal (MOD 2017+) */
      box(THREE, g, 1.2, 1.2, 1.6, T.metal, 15.9, 0, 31.0);
      tprism(THREE, g, 1.3, 4.4, 1.1, 4.4, 3.8, T.sup, 16.0, 0, 33.7);
      box(THREE, g, 0.06, 4.0, 3.4, T.hatch, 16.68, 0, 33.7);
      box(THREE, g, 0.06, 4.0, 3.4, T.hatch, 15.32, 0, 33.7);
    }
    strut(THREE, g, T.metal, 15.6, -2.2, 36.3, 15.6, 2.2, 36.3, 0.05, 4);
    box(THREE, g, 0.8, 0.8, 0.3, T.metal, 15.6, 0, 38.1);

    /* ---------------- forward block between the tube banks */
    hexa(THREE, g, T.sup, 34.8, 58.6, 7.0, 6.3, 34.8, 58.0, 6.6, 11.8);
    box(THREE, g, 4.0, 3.0, 1.2, T.sup, 41.0, 0, 12.4);        /* director platform */
    cylZ(THREE, g, 0.9, 1.0, 1.0, 12, T.sup, 41.0, 0, 13.5);
    sphere(THREE, g, 0.9, T.sup, 41.0, 0, 14.2, 12, 6);
    for (s = -1; s <= 1; s += 2) {
      var a3 = new THREE.Group(); a3.position.set(52.0, s * 4.6, 11.8); ak630(THREE, a3, T); g.add(a3);
      for (i = 0; i < 6; i++) box(THREE, g, 1.0, 0.08, 0.6, T.hatch, 37.0 + i * 3.6, s * 6.85, 9.6);
    }

    /* ---------------- the P-500 / P-1000 tube banks: the gallery wall flush
       with the hull side with an opening under each pair, the saddles, and
       the pairs raised forward 16 degrees (profile 15, 1986 photograph 18) */
    var tl = 16 * PI / 180, cT = Math.cos(tl), sT = Math.sin(tl), TL = 12.0, TR = 0.95;
    var XC = [14.0, 25.8, 37.5, 49.2];
    for (s = -1; s <= 1; s += 2) {
      /* the gallery: outer wall up to 8.0 m and its top deck */
      var gx0 = 7.0, gx1 = 56.5, ya, yo;
      for (x = gx0; x < gx1; x += 3.3) {
        var x2 = Math.min(gx1, x + 3.3), xm = (x + x2) / 2;
        yo = sideY(xm, deckZ(xm)) - 0.15;
        box(THREE, g, x2 - x + 0.02, 0.3, 8.0 - deckZ(xm), T.hull, xm, s * yo, (8.0 + deckZ(xm)) / 2);
        box(THREE, g, x2 - x + 0.02, 1.2, 0.1, T.deck, xm, s * (yo - 0.6), 8.02);
      }
      for (i = 0; i < 4; i++) {
        var xc = XC[i];
        ya = sideY(xc, deckZ(xc)) - 0.02;
        /* the opening in the wall under the pair, and its dark recess */
        box(THREE, g, 5.0, 0.1, 1.5, T.dark, xc - 0.8, s * ya, 7.15);
        box(THREE, g, 5.2, 0.12, 0.14, T.metal, xc - 0.8, s * ya, 7.95);
        for (j = 0; j < 2; j++) {
          var ty = s * (7.55 + j * 1.9), tz = 10.6 + (j === 0 ? 0.3 : 0);
          tubeAx(THREE, g, T.sup, xc, ty, tz, TL, TR, 10, tl, true);
          /* the domed fore cap and its ring, the dark after end and its band */
          var cap = new THREE.SphereGeometry(TR * 1.02, 10, 3, 0, PI * 2, 0, PI / 2);
          cap.rotateZ(-PI / 2); cap.scale(0.45, 1, 1); cap.rotateY(-tl);
          var cm = new THREE.Mesh(cap, T.sup); cm.position.set(xc + cT * TL / 2, ty, tz + sT * TL / 2); g.add(cm);
          tubeAx(THREE, g, T.metal, xc + cT * (TL / 2 - 0.3), ty, tz + sT * (TL / 2 - 0.3), 0.35, TR + 0.06, 10, tl, true);
          var ae = new THREE.CircleGeometry(TR, 10); ae.rotateY(-PI / 2); ae.rotateY(-tl);
          var am = new THREE.Mesh(ae, T.hatch); am.position.set(xc - cT * TL / 2, ty, tz - sT * TL / 2); g.add(am);
          tubeAx(THREE, g, T.metal, xc - cT * (TL / 2 - 0.4), ty, tz - sT * (TL / 2 - 0.4), 0.4, TR + 0.06, 10, tl, true);
        }
        /* the saddle columns: fore (tall) and aft (short) */
        [-3.6, 3.2].forEach(function (tq) {
          var zt = 10.6 + tq * sT - TR - 0.1, zb = 8.0;
          if (zt > zb + 0.1) box(THREE, g, 1.1, 3.2, zt - zb, T.sup, xc + tq * cT, s * 8.7, (zt + zb) / 2);
        });
      }
    }

    /* ---------------- forecastle: the gun's raised base, breakwater,
       capstans, bollards, jackstaff, anchors */
    cylZ(THREE, g, 3.3, 3.5, 1.2, 22, T.sup, 63.5, 0, deckZ(63.5) + 0.5);
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.sup, 68.5, s * 0.2, deckZ(68.5) + 0.5, 66.0, s * 5.6, deckZ(66) + 0.5, 0.45, 4);
      cylZ(THREE, g, 0.55, 0.65, 0.7, 12, T.metal, 80.5, s * 1.9, deckZ(80.5) + 0.35);
      for (i = 0; i < 3; i++) {
        var xb = 60 + i * 8;
        cylZ(THREE, g, 0.22, 0.22, 0.6, 8, T.metal, xb, s * (sideY(xb, deckZ(xb)) - 1.0), deckZ(xb) + 0.3);
      }
      box(THREE, g, 1.4, 0.8, 0.5, T.metal, 84.0, s * 1.8, deckZ(84.0) + 0.25);
    }
    cylZ(THREE, g, 0.8, 0.8, 0.5, 10, T.metal, 76.0, 0, deckZ(76.0) + 0.25);
    strut(THREE, g, T.metal, 92.9, 0, deckZ(92.9), 92.9, 0, deckZ(92.9) + 3.0, 0.05, 4);

    /* ---------------- railings: waist and forecastle edges (not at the pad) */
    function railRun(x0, x1) {
      for (var sg = -1; sg <= 1; sg += 2) {
        var prev = null, xq;
        for (xq = x0; xq <= x1; xq += 5.0) {
          var zd = deckZ(xq) + 0.04, yd = sg * (sideY(xq, deckZ(xq)) - 0.15), xx = xAt(xq, deckZ(xq));
          strut(THREE, g, T.metal, xx, yd, zd, xx, yd, zd + 1.0, 0.04, 3);
          if (prev) {
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.98, xx, yd, zd + 0.98, 0.025, 3);
          }
          prev = [xx, yd, zd];
        }
      }
    }
    railRun(-71.0, -49.0);
    railRun(-34.0, 6.0);
    railRun(58.0, 91.0);

    /* ---------------- underwater: two shafts and screws */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.32, 0.32, 18.0, 8, T.metal, -82.0, s * 3.8, -4.6);
      strut(THREE, g, T.metal, -86.0, s * 3.8, -4.6, -86.0, s * 2.4, -2.6, 0.14, 4);
      cylX(THREE, g, 0.45, 0.6, 0.9, 8, T.metal, -91.8, s * 3.8, -4.6);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6, 1.7), T.metal);
        bl.position.set(-91.8, s * 3.8, -4.6); bl.rotation.x = i * PI / 2 + 0.4;
        bl.translateZ(1.0); bl.rotation.y = 0.45; g.add(bl);
      }
    }

    /* ---------------- team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.2, 4.0, 0.04, T.team, 46.0, 0, 11.82);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -68.0, 0, 10.92);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -29.0, 0, 12.42);

    /* ---------------- trained mount: the twin AK-130 on its raised base */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(63.5, 0, deckZ(63.5) + 1.1); ak130(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tb = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.slice().forEach(function (c) { tw.add(c); });
    root.add(tw);
    return root;
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

/* the ships as completed (1980s), the 2000s (same fit, Russian grey), and
   the present day (Marshal Ustinov after her 2011-2016 refit) */
["pact_e80_cruiser", "pact_e00_cruiser", "cruiser_p"].forEach(function (k) {
  var era = k === "pact_e80_cruiser" ? "e80" : (k === "pact_e00_cruiser" ? "e00" : "e20");
  UNIT_MODELS[k] = {
    len: 186.4,
    build: function (THREE, M, C) { return HeroSlava.build(THREE, M, C, era); }
  };
});
