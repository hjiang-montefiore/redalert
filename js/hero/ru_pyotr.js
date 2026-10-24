/* ==================== js/hero/ru_pyotr.js ===============================
   HERO MODEL -- Project 1144.2 "Orlan" heavy nuclear-powered missile
   cruiser PYOTR VELIKIY (Kirov class, fourth ship, commissioned 1998), as
   she was from 1998 into the 2000s. Key: pact_e90_cruiser only (the one row
   of this family; see the registration at the foot).
   Length overall 250.1 m, beam 28.5 m overall and 25.0 m at the waterline,
   draught 10.3 m over the sonar bulb (Russian Wikipedia, "Pyotr Velikiy
   (atomny kreyser)" and "Kreysera proekta 1144", in Russian). js/
   warship_specs.js gives len 252: the model is drawn at the published 250.1.

   REFERENCES (Wikimedia Commons, fetched small; what each feature rests on):
     - "Kirov-class battlecruiser profile 1986.png" (recognition profile,
       922 px = 250.1 m, 3.69 px/m, waterline at the foot of the silhouette):
       every station and height below - the low quarterdeck 7.0 m and the
       step up to the main deck 45 m from the stern; the knuckle 6.5 m
       amidships, rising forward to 11.4 m; the deck 9.5 m amidships with the
       sheer rising to about 14 m at the stem; the stem raked 16.8 m (108.2 m
       at the waterline to 125 m at the deck); the after block 15 m, the
       after Top Dome 28 m, the after mast 31 m with its pole to 37 m; the
       tower body to 40 m and the Top Pair head to 50 m; the bridge block
       25 m with its dome to 31 m; the two boats on each side at 13-15 m.
     - "Russian battlecruiser Pyotr Velikiy-9.jpg" and "-11.jpg" (2017, port
       broadside) and "RIAN archive 669522" (2010, starboard broadside): her
       own fit - the twin AK-130 at the after end of the superstructure on
       the centreline (this is the trained "turret"), the four Kashtan on the
       after superstructure, the after Top Dome beside the after mast, the
       slanted panel forward of the tower, the low Kashtan block forward on
       the port side of the Granit field.
     - "HMS Dragon with Kirov Class 'Pyotr Velikiy' MOD 45157551" and
       "...45157553" (2014, from above, starboard bow and port quarter): the
       grey hull and superstructure, the red-brown decks and pad, the
       knuckle line rising to the bow, the tower and the Top Pair.
     - "RIAN archive 643176" (2010, on the forecastle looking aft): the grey
       Granit hatches on the red-brown deck, the bridge block with the two
       big spherical radomes at its forward corners, the dome on top, the
       Kashtan block on the starboard side.
     - "Model tyazhologo atomnogo kreysera Pyotr Velikiy.jpg" (Navy museum
       model, from above): the plan - the Granit field (4 across x 5 along)
       against the bridge block, the 12 S-300F hatches ahead of it (3 rows of
       4), the V breakwater, the two raised casings near the bow; the
       Kashtan blocks, port forward and starboard aft of the Granit field;
       the dome and its slanted panel on the bridge block; the pad at the
       stern with its ring and cross, the AK-130 forward of it at the foot of
       the after superstructure, the low casing beside the pad.
     - "Battlecruiser Frunze aft section 1985.jpg" (USN, sister ship): the
       low quarterdeck and its pad with ring and fore-and-aft line, the
       step, the AK-130 dome forward of the step.
     - Russian Wikipedia (as above): 20 P-700 Granit in SM-233 under deck
       hatches; S-300F (48) and S-300FM Fort-M (46) with a new antenna
       post; 128 Kinzhal in under-deck drums; six Kortik (Kashtan) - two
       forward either side of the Granit, four in the after superstructure;
       the twin AK-130; one RBU-12000 on a turntable in the bow; two
       RBU-1000 aft on the upper deck, one each side; Fregat-M2 3D radar;
       the Ka-27 below the quarterdeck (the game row: three).

   RECOGNITION LIST (where each shows):
     1. The long forecastle, the Granit field of 20 hatches (4 x 5) against
        the bridge block - x +30 to +56.
     2. The 12 round S-300F hatches ahead of it (3 x 4) - x +61 to +74.
     3. The big pyramid tower with the Top Pair (MR-800 Voskhod) at its
        head, about 50 m - x -26 to -9.
     4. The bridge block with its two big radomes on the forward corners,
        the dome and the slanted panel on top - x -9 to +27.
     5. The after superstructure: the Top Dome, the after mast (the mack:
        uptakes black at the top, pole and the small back-to-back antenna
        the 2017 broadside shows; Russian Wikipedia names a Fregat-M2 3D
        radar - that this is it is my reading) - x -70 to -33.
     6. Four Kashtan on the after superstructure, one on each low block
        forward (port forward, starboard aft).
     7. The twin AK-130 in its round dome on the centreline, forward of the
        step - x -74.5.
     8. The low stepped quarterdeck with the pad (ring, cross, lift
        outline) - x -125 to -81.
     9. The knuckle line rising to the bow, the raked stem, the high flared
        bow with its bulwark, the broad transom.
    10. Two boats a side under davits abreast the tower.
    11. Paint: Russian navy grey, red-brown decks, black boot-top.

   PAINT (sampled, then taken to about 0.9 of its level): MOD 45157553 hull
   #717578 and RIAN 643176 superstructure #71716f: hull 0x6a6e72,
   superstructure 0x707478 (as ru_kuznetsov.js e00); RIAN 643176 deck
   #48322f (wet) and MOD 45157551 pad #908481 (haze): decks 0x5c3e37. Boot
   top black. No hull number, name or ensign.

   The Top Pair turns; it is drawn yawed 34 degrees, as the photographs
   catch it, so it reads from the side and from ahead.
   NOT CONFIRMED and therefore not drawn: the Kinzhal drum hatches (no
   photograph or drawing I read shows where they are); the Fort-M antenna
   post as a separate set (the slanted panel forward of the tower is drawn
   as photographed, not named); anchors and the ten RBU-12000 barrels in
   detail (the mount is drawn as a block on its turntable); rudders; the
   PK-14 launchers; antennas smaller than the main sets. The two RBU-1000
   are confirmed but no photograph shows them: drawn abreast the AK-130,
   position approximate. The lift outline on the pad is placed between the
   ring and the step (approximate).

   TRAINED MOUNT: the twin AK-130 is the group named "turret", barrels
   along +X at rest (the photographs show it trained aft when idle; the
   game trains it from +X). Everything else is baked, one mesh per
   material. HELICOPTER PAD: the whole low quarterdeck is one clean flat
   plate (x = -125 to -81.3, top z = 7.04) with its marks painted only; it
   fills her after eighth, so render3d's deckOf/padSpot find it without a
   "helipad" node (none before, none now).

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0. 10
   materials. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPyotr = (function () {
  "use strict";
  var PI = Math.PI;
  var XS = -125.05, XB = 125.05;
  var PADX0 = -125.0, PADX1 = -81.3, PADC = -108.5, STEP = -81.0;

  /* ---- station tables (the 1986 profile, the plan of the museum model) ---- */
  /* waterline half-breadth (25.0 m at the waterline) */
  var HW = [[-125.05, 9.6], [-118, 11.0], [-106, 12.1], [-90, 12.5], [40, 12.5], [58, 12.1], [72, 11.0],
            [86, 8.8], [98, 5.9], [106, 3.2], [112, 1.2], [125.05, 0.0]];
  /* knuckle half-breadth and height (the white line of the profile) */
  var HK = [[-125.05, 11.6], [-112, 13.2], [-95, 14.0], [-70, 14.15], [40, 14.15], [58, 13.9], [72, 13.1],
            [86, 11.4], [98, 9.0], [108, 6.4], [116, 3.9], [121, 2.0], [125.05, 0.25]];
  var ZK = [[-125.05, 4.3], [-81.3, 4.3], [-80.7, 6.5], [70, 6.5], [86, 10.3], [106, 11.4], [125.05, 12.2]];
  /* deck-edge half-breadth: 28.5 m overall */
  var HD = [[-125.05, 11.75], [-112, 13.35], [-95, 14.15], [-70, 14.25], [40, 14.25], [58, 14.05], [72, 13.35],
            [86, 11.75], [98, 9.5], [108, 7.0], [116, 4.4], [121, 2.4], [125.05, 0.3]];
  var KZ = [[-125.05, -1.0], [-117, -4.8], [-106, -7.8], [-90, -9.1], [125.05, -9.1]];
  var BP = [[-125.05, 1.7], [-100, 2.6], [-60, 3.4], [40, 3.4], [80, 2.3], [105, 1.5], [125.05, 1.2]];
  var FL = [[-125.05, 1.3], [0, 1.2], [60, 1.4], [125.05, 1.8]];
  /* deck height: the low quarterdeck, the step, the sheer rising to the stem */
  var DZT = [[-125.05, 7.0], [-81.3, 7.0], [-80.7, 9.4], [30, 9.6], [66, 10.0], [84, 10.9], [98, 11.9],
             [110, 12.9], [125.05, 14.0]];
  function tab(T, x) {
    if (x <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * f;
    }
    return T[T.length - 1][1];
  }
  function deckZ(x) { return tab(DZT, x); }
  /* the stem: raked 16.8 m above water, a rounded forefoot below */
  function xStem(z) {
    if (z >= 0) return 108.2 + 16.85 * Math.pow(Math.min(1, z / 14.0), 0.85);
    return 108.2 - 6.0 * Math.pow(Math.min(1, -z / 9.1), 1.6);
  }
  /* the transom: its lower edge 2.4 m above water, the run cut up under it */
  function xSt(z) { return XS + 5.0 * Math.max(0, Math.min(1, (2.4 - z) / 3.4)); }
  function xAt(xn, z) { var u = (xn - XS) / (XB - XS); return xSt(z) + u * (xStem(z) - xSt(z)); }
  function sideY(xn, z) {
    var hw = tab(HW, xn), k = tab(KZ, xn);
    if (z <= 0) {
      var t = Math.max(0, Math.min(1, (z - k) / (0 - k))), p = tab(BP, xn);
      return hw * Math.pow(1 - Math.pow(1 - t, p), 1 / p);
    }
    var zk = tab(ZK, xn), hk = tab(HK, xn);
    if (z <= zk) return hw + (hk - hw) * Math.pow(z / zk, tab(FL, xn));
    var hd = tab(HD, xn), zd = deckZ(xn);
    return hk + (hd - hk) * Math.min(1, (z - zk) / Math.max(0.05, zd - zk));
  }
  function edgeY(x) { return sideY(x, deckZ(x)); }
  /* the deck top at a true x: the deck stations are mapped forward and aft
     with the stem and transom (xAt), so invert that map before reading DZT */
  function dTop(x) {
    var z = deckZ(x);
    for (var i = 0; i < 4; i++) z = deckZ(XS + (x - xSt(z)) * (XB - XS) / (xStem(z) - xSt(z)));
    return z;
  }

  /* ---------------------------------------------------------- palette */
  var P = { hull: 0x6a6e72, sup: 0x707478, deck: 0x5c3e37, padc: "#5e4039" };

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
  /* plating: frame and stringer seams, weathering patches, rust streaks */
  function plateTex(THREE, rep) {
    var key = "p" + rep[0] + "_" + rep[1];
    if (TEX[key]) return TEX[key];
    var W = 256, H = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(11442), i;
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
    for (i = 0; i < 14; i++) g.fillRect(R() * W, R() * H * 0.6, 2, 18 + R() * 50);
    g.globalAlpha = 1;
    return (TEX[key] = finish(THREE, cv, rep));
  }
  /* the uptake tops and window glass: dark grilles */
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
  /* the quarterdeck in plan: red-brown plating, its edge line, the ring with
     its centre mark, the cross through it (Frunze 1985, the museum model),
     and the lift outline (flush; position approximate) */
  var PADW = 14.3;
  function padTex(THREE) {
    if (TEX.pad) return TEX.pad;
    var W = 1024, H = 512, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d"), R = rng(2024), i;
    var sx = W / (PADX1 - PADX0), sy = H / (2 * PADW);
    var px = function (X) { return (X - PADX0) * sx; };
    var py = function (Y) { return (1 - (Y + PADW) / (2 * PADW)) * H; };
    g.fillStyle = P.padc; g.fillRect(0, 0, W, H);
    g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
    for (i = -14; i <= 14; i += 2) { g.beginPath(); g.moveTo(0, py(i)); g.lineTo(W, py(i)); g.stroke(); }
    g.globalAlpha = 0.07;
    for (i = 0; i < 60; i++) {
      g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff";
      g.fillRect(R() * W, R() * H, 10 + R() * 60, 6 + R() * 28);
    }
    g.globalAlpha = 1;
    /* the lift: a dark seam round a slightly darker plate */
    g.fillStyle = "rgba(0,0,0,0.10)"; g.fillRect(px(-99.0), py(3.6), 13.0 * sx, 7.2 * sy);
    g.strokeStyle = "#2a1c18"; g.lineWidth = 3;
    g.strokeRect(px(-99.0), py(3.6), 13.0 * sx, 7.2 * sy);
    /* white marks: ring, centre ring, fore-and-aft line and the cross */
    g.strokeStyle = "#e2e2dc"; g.lineWidth = 7;
    g.beginPath(); g.arc(px(PADC), py(0), 5.0 * sx, 0, PI * 2); g.stroke();
    g.lineWidth = 5;
    g.beginPath(); g.arc(px(PADC), py(0), 1.1 * sx, 0, PI * 2); g.stroke();
    g.beginPath(); g.moveTo(px(PADC - 12.0), py(0)); g.lineTo(px(PADC + 9.0), py(0)); g.stroke();
    g.beginPath(); g.moveTo(px(PADC), py(-8.0)); g.lineTo(px(PADC), py(8.0)); g.stroke();
    /* the deck-edge line */
    g.lineWidth = 4;
    g.beginPath(); g.moveTo(px(-123.5), py(10.6)); g.lineTo(px(-84.0), py(12.6)); g.stroke();
    g.beginPath(); g.moveTo(px(-123.5), py(-10.6)); g.lineTo(px(-84.0), py(-12.6)); g.stroke();
    return (TEX.pad = finish(THREE, cv, null, true));
  }

  function makeMats(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      hull:  skin(P.hull, plateTex(THREE, [16, 1.2]), 0.86),
      boot:  skin(0x15181a, plateTex(THREE, [16, 1]), 0.9),
      under: skin(0x4a2a28, plateTex(THREE, [10, 2]), 0.9),
      sup:   skin(P.sup, plateTex(THREE, [2, 2]), 0.86),
      deck:  skin(P.deck, plateTex(THREE, [12, 1.5]), 0.95),
      hatch: skin(0x3a3f43, plateTex(THREE, [1, 1]), 0.9),
      pad:   skin(0xffffff, padTex(THREE), 0.93),
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
  function sphere(THREE, p, r, m, x, y, z, ws, hs) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, ws || 10, hs || 6), m);
    s.position.set(x, y, z); p.add(s); return s;
  }
  function dome(THREE, p, m, r, x, y, z, ws) {
    var d = new THREE.SphereGeometry(r, ws || 14, 5, 0, PI * 2, 0, PI / 2); d.rotateX(PI / 2);
    var mm = new THREE.Mesh(d, m); mm.position.set(x, y, z); p.add(mm); return mm;
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
     top rectangle (x0b..x1b, |y| <= yb, z = zb), centred on y = yc */
  function hexa(THREE, p, m, x0a, x1a, ya, za, x0b, x1b, yb, zb, yc) {
    var c = yc || 0;
    var V = [[x0a, c - ya, za], [x1a, c - ya, za], [x1a, c + ya, za], [x0a, c + ya, za],
             [x0b, c - yb, zb], [x1b, c - yb, zb], [x1b, c + yb, zb], [x0b, c + yb, zb]];
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
  /* a flat pane (window, scuttle) standing in the XZ plane, facing s * Y */
  function pane(THREE, p, w, h, m, x, y, z, s) {
    var q = new THREE.PlaneGeometry(w, h); q.rotateX(s > 0 ? -PI / 2 : PI / 2);
    var mm = new THREE.Mesh(q, m); mm.position.set(x, y, z); p.add(mm); return mm;
  }
  /* the wall half-width of a hexa at height z */
  function hwz(ya, za, yb, zb, z) { return ya + (yb - ya) * (z - za) / (zb - za); }

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
        if (pos[3 * P0 + 1] === pos[3 * S0 + 1]) idx.push(S0, S1, P1);
        else idx.push(P0, S0, P1, S0, S1, P1);
      }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }
  var FU = [0, 0.02, 0.06, 0.13, 0.25, 0.42, 0.62, 0.82, 1.0];
  var FB = [0, 1];
  var FL1 = [0, 0.2, 0.42, 0.62, 0.8, 1.0];
  var FL2 = [0, 0.5, 1.0];
  function hullPiece(THREE, g, T, xs) {
    var kz = function (xn) { return tab(KZ, xn); };
    var zk = function (xn) { return tab(ZK, xn); };
    g.add(hullStrip(THREE, T.under, xs, kz, function () { return -0.45; }, FU, true));
    g.add(hullStrip(THREE, T.boot, xs, function () { return -0.45; }, function () { return 0.6; }, FB, true));
    g.add(hullStrip(THREE, T.hull, xs, function () { return 0.6; }, zk, FL1, true));
    g.add(hullStrip(THREE, T.hull, xs, zk, deckZ, FL2, true));
  }
  /* a flat deck ribbon over a run of stations at the hull's own edge */
  function ribbon(THREE, m, xs, zf, inset, NC, uvf) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < xs.length; i++) {
      var xn = xs[i], z = zf(xn), w = Math.max(0.05, sideY(xn, deckZ(xn)) - inset), x = xAt(xn, deckZ(xn));
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
  /* a wall standing on the deck edge (the bow bulwark), h tall, both sides */
  function bulwark(THREE, m, xs, h) {
    var pos = [], uv = [], idx = [], i, s;
    for (s = -1; s <= 1; s += 2) {
      var base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        var xn = xs[i], z = deckZ(xn), y = sideY(xn, z), x = xAt(xn, z);
        var hh = h * Math.min(1, (xn - xs[0]) / 4 + 0.25);
        pos.push(x, s * y, z, x, s * (y + 0.06 * hh), z + hh);
        uv.push(xn / 12, 0, xn / 12, hh / 12);
      }
      for (i = 0; i < xs.length - 1; i++) {
        var A = base + 2 * i, B = A + 1, Cc = A + 2, D = A + 3;
        if (s > 0) idx.push(A, Cc, B, B, Cc, D, A, B, Cc, B, D, Cc);
        else idx.push(A, B, Cc, B, D, Cc, A, Cc, B, B, Cc, D);
      }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }

  /* a narrow strake standing 0.12 m proud along the knuckle, both sides */
  function strake(THREE, m, xs) {
    var pos = [], uv = [], idx = [], i, s;
    for (s = -1; s <= 1; s += 2) {
      var base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        var xn = xs[i], z = tab(ZK, xn), y = sideY(xn, z), x = xAt(xn, z);
        pos.push(x, s * y, z - 0.25, x, s * (y + 0.12), z - 0.05, x, s * y, z + 0.12);
        uv.push(xn / 12, 0, xn / 12, 0.02, xn / 12, 0.04);
      }
      for (i = 0; i < xs.length - 1; i++) for (var q = 0; q < 2; q++) {
        var A = base + 3 * i + q, B = A + 1, Cc = A + 3, D = Cc + 1;
        if (s > 0) idx.push(A, B, Cc, B, D, Cc); else idx.push(A, Cc, B, B, Cc, D);
      }
    }
    return geoMesh(THREE, pos, idx, uv, m);
  }

  /* ------------------------------------------------------------- weapons */
  /* twin 130 mm AK-130 in its round dome, barrels along +X */
  function ak130(THREE, g, T) {
    cylZ(THREE, g, 3.0, 3.15, 0.6, 22, T.sup, 0, 0, 0.3);
    var dg = new THREE.SphereGeometry(2.8, 22, 9, 0, PI * 2, 0, PI / 2); dg.rotateX(PI / 2); dg.scale(1.15, 1, 0.98);
    var d = new THREE.Mesh(dg, T.sup); d.position.set(0, 0, 0.6); g.add(d);
    box(THREE, g, 0.4, 2.2, 1.1, T.hatch, 3.05, 0, 1.6);
    box(THREE, g, 1.4, 0.9, 0.7, T.sup, -0.6, 0, 3.3);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.14, 0.15, 7.6, 8, T.metal, 6.6, s * 0.62, 1.6, true);
      cylX(THREE, g, 0.30, 0.30, 2.0, 10, T.sup, 3.9, s * 0.62, 1.6);
      cylX(THREE, g, 0.2, 0.2, 0.5, 8, T.metal, 10.3, s * 0.62, 1.6);
    }
    return g;
  }
  /* Kashtan (Kortik) combat module along +X: drum base, the turning housing,
     the radar/optics head on top, a 30 mm six-barrel gun and a stack of
     missile containers on each side */
  function kashtan(THREE, g, T) {
    cylZ(THREE, g, 1.25, 1.35, 0.8, 12, T.sup, 0, 0, 0.4);
    box(THREE, g, 2.4, 1.9, 1.3, T.sup, 0, 0, 1.45);
    box(THREE, g, 1.1, 1.0, 0.8, T.sup, -0.3, 0, 2.5);
    box(THREE, g, 0.08, 0.7, 0.4, T.hatch, 0.27, 0, 2.55);
    box(THREE, g, 0.12, 1.3, 0.9, T.metal, -0.95, 0, 3.2);
    for (var s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.13, 0.13, 2.0, 6, T.metal, 1.9, s * 0.62, 1.55, true);
      box(THREE, g, 1.6, 0.55, 1.05, T.sup, -0.1, s * 1.25, 1.75);
      box(THREE, g, 0.05, 0.45, 0.9, T.hatch, 0.72, s * 1.25, 1.75);
    }
    return g;
  }
  /* a curved lattice reflector, concave toward +X (ru_slava.js) */
  function reflector(THREE, g, T, w, h, depth, n) {
    var k, prev = null;
    for (k = 0; k <= n; k++) {
      var y = -w / 2 + k * w / n, x = depth * (4 * y * y / (w * w));
      if (prev) {
        var mx = (x + prev[0]) / 2, my = (y + prev[1]) / 2, dy = y - prev[1], dx = x - prev[0];
        var L = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dx, dy);
        var pnl = new THREE.Mesh(new THREE.BoxGeometry(0.12, L, h - 0.2), T.sup);
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
  /* round flush hatch of an S-300F revolver launcher */
  function fortHatch(THREE, g, T, x, y, z) {
    cylZ(THREE, g, 1.65, 1.7, 0.1, 12, T.sup, x, y, z + 0.05);
    var lid = new THREE.Mesh(new THREE.CircleGeometry(1.25, 12), T.hatch); lid.position.set(x, y, z + 0.11); g.add(lid);
    box(THREE, g, 2.6, 0.1, 0.04, T.metal, x, y, z + 0.12);
  }

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = sealMats(makeMats(THREE, C));
    var s, i, j, x, k;
    function wins(x0, dx, n, ya, za, yb, zb, z, yc) {
      for (var sg = -1; sg <= 1; sg += 2) for (var q = 0; q < n; q++)
        pane(THREE, g, 1.0, 0.6, T.hatch, x0 + q * dx, (yc || 0) + sg * (hwz(ya, za, yb, zb, z) + 0.03), z, sg);
    }
    function kmount(x, y, z, yaw) {
      var kg = new THREE.Group(); kg.position.set(x, y, z); kg.rotation.z = yaw;
      kashtan(THREE, kg, T); g.add(kg);
    }

    /* ---------------- hull */
    var xs = [-125.05, -122, -118, -112, -104, -95, -86, -81.3, -80.7, -74, -60, -45, -30, -15, 0, 15, 30,
              45, 58, 66, 72, 78, 84, 90, 96, 101, 105, 109, 113, 116.5, 119.5, 122, 124, 125.05];
    hullPiece(THREE, g, T, xs);
    /* the sonar bulb under the forefoot (draught 10.3 m over it) */
    var bg = new THREE.SphereGeometry(1, 14, 8); bg.scale(8.0, 2.4, 3.1);
    var bm = new THREE.Mesh(bg, T.under); bm.position.set(101.5, 0, -7.2); g.add(bm);
    /* decks: the low quarterdeck plate (the pad), the step, the main deck */
    var px = [], dx = [];
    for (x = PADX0; x < PADX1; x += 3.2) px.push(x);
    px.push(PADX1);
    g.add(ribbon(THREE, T.pad, px, function (xn) { return deckZ(xn) + 0.04; }, 0.02, 10,
      function (X, Y) { return [(X - PADX0) / (PADX1 - PADX0), (Y + PADW) / (2 * PADW)]; }));
    for (x = -80.7; x < 123.5; x += 3.0) dx.push(x);
    dx.push(123.5, 124.6);
    g.add(ribbon(THREE, T.deck, dx, function (xn) { return deckZ(xn) + 0.04; }, 0.03, 4));
    /* the knuckle: a thin strake along it, the line the profile draws white */
    g.add(strake(THREE, T.hull, xs.slice(1, xs.length - 1)));
    /* the step face across the beam */
    var sx0 = xAt(-81.3, 7.0) - 0.1, sx1 = xAt(-80.7, 9.4) + 0.2;
    box(THREE, g, sx1 - sx0, 2 * edgeY(STEP) - 0.1, 2.4, T.hull, (sx0 + sx1) / 2, 0, 8.22);
    /* the bow bulwark from the breakwater to the stem (profile) */
    var bx = [];
    for (x = 76; x < 124; x += 4) bx.push(x);
    bx.push(124.6);
    g.add(bulwark(THREE, T.hull, bx, 1.2));

    /* scuttle rows, the hawse pipes */
    for (x = -118; x <= 100; x += 4.5) {
      for (s = -1; s <= 1; s += 2) {
        var zz = tab(ZK, x) + 1.1;
        pane(THREE, g, 0.4, 0.4, T.hatch, xAt(x, zz), s * (sideY(x, zz) + 0.03), zz, s);
      }
    }
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.3, 0.1, 1.1, T.hatch, xAt(110.0, 11.2), s * (sideY(110.0, 11.2) + 0.03), 11.2);
      box(THREE, g, 1.3, 0.1, 1.1, T.hatch, xAt(104.0, 10.8), s * (sideY(104.0, 10.8) + 0.03), 10.8);
    }

    /* ---------------- quarterdeck: the low casings beside the pad (Frunze
       1985, museum model), the two RBU-1000 abreast the gun (approximate) */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 11.0, 1.6, 0.8, T.sup, -91.0, s * 11.4, 7.44);
      box(THREE, g, 11.2, 0.1, 0.12, T.metal, -91.0, s * 10.55, 7.86);
      cylZ(THREE, g, 0.9, 1.0, 1.0, 10, T.sup, -77.5, s * 10.2, 9.9);
      box(THREE, g, 1.4, 1.5, 1.0, T.sup, -77.5, s * 10.2, 10.9);
      for (i = 0; i < 6; i++) cylX(THREE, g, 0.15, 0.15, 1.5, 6, T.hatch, -77.5, s * 10.2 + (i % 3 - 1) * 0.42, 10.7 + Math.floor(i / 3) * 0.4);
    }
    /* the gun's round base */
    cylZ(THREE, g, 3.5, 3.7, 1.0, 22, T.sup, -74.5, 0, 9.9);

    /* ---------------- after superstructure (profile; 2017 broadside) */
    /* tier A: the long after block */
    hexa(THREE, g, T.sup, -70.0, -40.0, 11.4, 9.4, -70.0, -40.0, 10.8, 15.0);
    wins(-68.0, 4.0, 7, 11.4, 9.4, 10.8, 15.0, 11.4);
    wins(-68.0, 4.0, 7, 11.4, 9.4, 10.8, 15.0, 13.4);
    box(THREE, g, 0.12, 6.0, 2.6, T.hatch, -70.06, 0, 10.8);
    /* tier B: the block under the Kashtan pair and the Top Dome */
    hexa(THREE, g, T.sup, -66.0, -44.0, 8.0, 15.0, -65.0, -45.0, 7.2, 19.0);
    wins(-63.0, 4.2, 4, 8.0, 15.0, 7.2, 19.0, 17.0);
    /* the after Top Dome on its drum */
    cylZ(THREE, g, 2.4, 2.6, 3.4, 18, T.sup, -50.0, 0, 20.7);
    hexa(THREE, g, T.sup, -53.0, -47.0, 2.8, 19.0, -52.6, -47.4, 2.6, 22.4);
    var tdg = new THREE.SphereGeometry(3.0, 20, 12); tdg.rotateX(PI / 2);
    var td = new THREE.Mesh(tdg, T.sup); td.position.set(-50.0, 0, 25.4); g.add(td);
    /* the four Kashtan: two at the after corners of tier B, two on tier A
       forward of them (2017 broadside: two stepped mounts a side) */
    for (s = -1; s <= 1; s += 2) {
      kmount(-61.0, s * 5.2, 19.0, s * PI * 0.72);
      kmount(-44.5, s * 8.6, 15.0, s * PI * 0.45);
      cylZ(THREE, g, 0.7, 0.75, 1.0, 10, T.sup, -57.0, s * 4.8, 19.5);   /* the Kashtan control radomes */
      sphere(THREE, g, 0.75, T.sup, -57.0, s * 4.8, 20.3, 10, 6);
    }
    /* the after mast (the mack): tapering casing, platforms, the uptakes
       black at its top, the pole with the small back-to-back antenna at
       its head (photographed; that it is the Fregat-M2 is my reading) */
    hexa(THREE, g, T.sup, -46.0, -33.0, 7.6, 13.2, -43.5, -36.5, 3.0, 33.0);
    for (k = 0; k < 3; k++) {
      var zq = 19.5 + k * 3.6, wq = hwz(7.6, 13.2, 3.0, 33.0, zq);
      box(THREE, g, 9.0 - k * 1.5, 2 * wq + 1.4, 0.16, T.sup, -39.5, 0, zq);
      for (s = -1; s <= 1; s += 2) box(THREE, g, 9.0 - k * 1.5, 0.05, 0.8, T.metal, -39.5, s * (wq + 0.7), zq + 0.45);
    }
    box(THREE, g, 6.6, 5.6, 0.12, T.dark, -40.0, 0, 33.06);
    box(THREE, g, 7.2, 0.3, 0.8, T.sup, -40.0, 2.95, 33.4);
    box(THREE, g, 7.2, 0.3, 0.8, T.sup, -40.0, -2.95, 33.4);
    strut(THREE, g, T.metal, -38.0, 0, 33.0, -38.0, 0, 39.6, 0.16, 6);
    box(THREE, g, 0.3, 6.4, 0.2, T.metal, -38.0, 0, 36.8);
    var fr = new THREE.Group(); fr.position.set(-38.0, 0, 38.6);
    box(THREE, fr, 0.25, 3.6, 1.5, T.hatch, 0.35, 0, 0);
    box(THREE, fr, 0.25, 3.6, 1.5, T.hatch, -0.35, 0, 0);
    box(THREE, fr, 0.9, 0.9, 0.5, T.metal, 0, 0, -1.0);
    g.add(fr);
    /* the long stays from the mack to the tower (profile) */
    strut(THREE, g, T.metal, -38.0, 0, 35.0, -20.0, 0, 38.0, 0.05, 3);

    /* ---------------- midships house, the boats under their davits */
    hexa(THREE, g, T.sup, -40.0, -9.0, 12.6, 9.6, -40.0, -9.0, 11.6, 13.2);
    wins(-38.0, 3.6, 8, 12.6, 9.6, 11.6, 13.2, 11.2);
    var BX = [-33.0, -2.5];
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      var cx = BX[i], by = s * 12.9;
      var hb = new THREE.SphereGeometry(1, 12, 6, 0, PI * 2, PI / 2, PI / 2); hb.rotateX(PI / 2); hb.scale(5.0, 1.3, 1.45);
      var hm = new THREE.Mesh(hb, T.sup); hm.position.set(cx, by, 14.2); g.add(hm);
      box(THREE, g, 9.6, 2.8, 0.2, T.sup, cx, by, 14.25);
      box(THREE, g, 3.4, 2.0, 1.0, T.sup, cx - 1.0, by, 14.85);
      box(THREE, g, 0.1, 1.9, 0.5, T.hatch, cx + 0.72, by, 14.95);
      for (j = -1; j <= 1; j += 2) {
        strut(THREE, g, T.metal, cx + j * 3.2, s * 11.7, 13.2, cx + j * 3.2, s * 12.4, 17.0, 0.16, 5);
        strut(THREE, g, T.metal, cx + j * 3.2, s * 12.4, 17.0, cx + j * 3.2, s * 12.9, 15.6, 0.1, 4);
      }
    }

    /* ---------------- the tower: the stepped pyramid, the Top Pair at its head */
    hexa(THREE, g, T.sup, -27.0, -9.0, 8.4, 13.2, -26.0, -10.0, 6.2, 30.0);
    hexa(THREE, g, T.sup, -26.0, -10.0, 6.2, 30.0, -25.0, -12.0, 5.2, 37.6);
    hexa(THREE, g, T.sup, -25.0, -12.0, 5.2, 37.6, -23.5, -13.5, 3.8, 39.5);
    wins(-25.0, 3.4, 5, 8.4, 13.2, 6.2, 30.0, 17.0);
    wins(-25.0, 3.4, 5, 8.4, 13.2, 6.2, 30.0, 24.0);
    box(THREE, g, 0.12, 8.0, 1.2, T.hatch, -9.05 - 0.75, 0, 21.0);
    /* the working platforms round it and their rails */
    [[20.5, 1.6], [27.0, 1.4], [33.5, 1.2]].forEach(function (q) {
      var zq2 = q[0], w2 = (zq2 < 30 ? hwz(8.4, 13.2, 6.2, 30.0, zq2) : hwz(6.2, 30.0, 5.2, 37.6, zq2)) + q[1];
      box(THREE, g, 15.0, 2 * w2, 0.16, T.sup, -18.0, 0, zq2);
      for (var sg = -1; sg <= 1; sg += 2) box(THREE, g, 15.0, 0.05, 0.8, T.metal, -18.0, sg * w2, zq2 + 0.45);
    });
    /* the small radomes and director drums on its flanks */
    for (s = -1; s <= 1; s += 2) {
      sphere(THREE, g, 1.3, T.sup, -12.0, s * 7.6, 22.2, 10, 6);
      sphere(THREE, g, 1.1, T.sup, -23.5, s * 7.0, 28.3, 10, 6);
      cylZ(THREE, g, 1.0, 1.1, 1.4, 10, T.sup, -14.0, s * 5.6, 34.4);
      sphere(THREE, g, 1.0, T.sup, -14.0, s * 5.6, 35.4, 10, 6);
    }
    /* the head: a drum, the mast, the Top Pair (MR-800 Voskhod): two curved
       lattice reflectors back to back on a turntable, leaning aft */
    cylZ(THREE, g, 3.4, 3.8, 1.8, 14, T.sup, -18.5, 0, 40.4);
    cylZ(THREE, g, 1.0, 1.4, 5.0, 12, T.sup, -16.5, 0, 43.8);
    cylZ(THREE, g, 1.7, 1.7, 0.2, 14, T.sup, -16.5, 0, 46.4);
    var tpy = new THREE.Group(); tpy.position.set(-16.5, 0, 46.9); tpy.rotation.z = 0.6;
    var tp = new THREE.Group(); tpy.add(tp); tp.rotation.y = 0.45;
    var big = new THREE.Group(); big.position.set(1.2, 0, 0.3); big.rotation.z = PI;
    reflector(THREE, big, T, 10.0, 7.0, 2.0, 6); tp.add(big);
    var sm = new THREE.Group(); sm.position.set(-1.2, 0, -0.4);
    reflector(THREE, sm, T, 8.4, 5.0, 1.2, 5); tp.add(sm);
    box(THREE, tp, 2.4, 0.8, 4.4, T.metal, 0, 0, 0);
    for (s = -1; s <= 1; s += 2) strut(THREE, tp, T.metal, 0, 0, -1.8, -0.3, s * 3.0, 2.0, 0.08, 4);
    g.add(tpy);
    /* the yard and the forward-leaning arm (profile) */
    strut(THREE, g, T.metal, -16.5, -5.0, 44.2, -16.5, 5.0, 44.2, 0.08, 4);
    strut(THREE, g, T.metal, -14.0, 0, 41.0, -9.0, 0, 44.5, 0.1, 4);

    /* ---------------- bridge block: the forward deckhouse, the bridge, the
       dome and its slanted panel, the two big radomes forward */
    hexa(THREE, g, T.sup, -9.0, 27.0, 12.6, 9.6, -9.0, 27.0, 11.8, 16.0);
    wins(-6.5, 3.4, 10, 12.6, 9.6, 11.8, 16.0, 11.4);
    wins(-6.5, 3.4, 10, 12.6, 9.6, 11.8, 16.0, 14.0);
    box(THREE, g, 0.12, 20.0, 1.0, T.hatch, 27.06, 0, 12.6);
    hexa(THREE, g, T.sup, -9.0, 20.0, 9.8, 16.0, -8.5, 19.2, 9.0, 22.6);
    wins(-6.0, 3.6, 7, 9.8, 16.0, 9.0, 22.6, 18.2);
    /* the bridge windows: the raked face and the sides */
    hexa(THREE, g, T.sup, 19.2, 21.6, 8.6, 19.4, 19.2, 20.6, 8.4, 22.0);
    box(THREE, g, 0.2, 16.0, 1.1, T.dark, 21.15, 0, 20.6);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 7.0, 0.12, 1.0, T.dark, 15.0, s * 9.05, 20.6);
      /* bridge wings */
      box(THREE, g, 4.6, 2.6, 0.18, T.sup, 17.5, s * 10.6, 19.2);
      box(THREE, g, 4.6, 0.06, 0.9, T.metal, 17.5, s * 11.9, 19.7);
      box(THREE, g, 0.06, 2.6, 0.9, T.metal, 19.8, s * 10.6, 19.7);
      /* the big spherical radomes on the forward corners (RIAN 643176) */
      cylZ(THREE, g, 2.0, 2.2, 1.6, 14, T.sup, 23.5, s * 8.6, 16.8);
      sphere(THREE, g, 2.55, T.sup, 23.5, s * 8.6, 19.6, 14, 9);
    }
    /* the roof structure, the dome on it, the slanted panel forward of it */
    hexa(THREE, g, T.sup, -7.5, 11.0, 5.2, 22.6, -7.0, 10.0, 4.6, 25.4);
    cylZ(THREE, g, 2.2, 2.4, 1.6, 16, T.sup, 6.0, 0, 26.2);
    var fdg = new THREE.SphereGeometry(2.9, 18, 10); fdg.rotateX(PI / 2);
    var fd = new THREE.Mesh(fdg, T.sup); fd.position.set(6.0, 0, 28.6); g.add(fd);
    box(THREE, g, 1.4, 1.4, 3.6, T.metal, 15.5, 0, 24.4);
    var sp = new THREE.Group(); sp.position.set(15.7, 0, 27.4); sp.rotation.y = -0.6;
    box(THREE, sp, 0.35, 3.6, 2.8, T.sup, 0, 0, 0);
    box(THREE, sp, 0.05, 3.2, 2.4, T.hatch, 0.2, 0, 0);
    g.add(sp);
    /* the pole mast with its yard on the roof */
    strut(THREE, g, T.metal, -5.5, 0, 25.4, -5.5, 0, 34.0, 0.13, 5);
    strut(THREE, g, T.metal, -5.5, -3.2, 31.6, -5.5, 3.2, 31.6, 0.06, 4);
    /* the forward step of the deckhouse with two directors */
    hexa(THREE, g, T.sup, 20.0, 26.5, 5.0, 16.0, 20.0, 25.5, 4.6, 18.0);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.8, 0.85, 1.0, 10, T.sup, 24.0, s * 3.4, 18.5);
      sphere(THREE, g, 0.85, T.sup, 24.0, s * 3.4, 19.2, 10, 6);
    }

    /* ---------------- forecastle: the Granit field (4 across x 5 along)
       against the deckhouse, the two Kashtan blocks (port forward,
       starboard aft), the 12 S-300F hatches, the V breakwater, the two
       raised casings, the RBU-12000 on its turntable, capstans, jackstaff */
    var gz0 = dTop(56.6);
    hexa(THREE, g, T.sup, 28.0, 56.6, 8.8, dTop(28.0), 28.2, 56.4, 8.6, gz0 + 0.34);
    for (i = 0; i < 5; i++) for (j = 0; j < 4; j++) {
      var gx = 30.9 + i * 5.6, gy = (j - 1.5) * 4.2;
      box(THREE, g, 5.0, 3.8, 0.08, T.hatch, gx, gy, gz0 + 0.36);
      box(THREE, g, 4.6, 3.4, 0.1, T.sup, gx, gy, gz0 + 0.42);
      box(THREE, g, 0.3, 0.6, 0.06, T.metal, gx + 2.0, gy, gz0 + 0.5);
    }
    /* the two low blocks with a Kashtan each */
    hexa(THREE, g, T.sup, 44.0, 56.0, 2.4, dTop(44) - 0.05, 44.6, 55.4, 2.1, dTop(50) + 3.6, 11.3);
    kmount(51.0, 11.3, dTop(50) + 3.6, -0.3);
    hexa(THREE, g, T.sup, 28.0, 39.0, 2.4, dTop(28) - 0.05, 28.6, 38.4, 2.1, dTop(33) + 3.6, -11.3);
    kmount(33.5, -11.3, dTop(33) + 3.6, 0.3);
    for (s = -1; s <= 1; s += 2) {
      var kx = s > 0 ? 46.0 : 37.0;
      cylZ(THREE, g, 0.7, 0.75, 0.9, 10, T.sup, kx, s * 11.3, dTop(kx) + 4.05);
      sphere(THREE, g, 0.75, T.sup, kx, s * 11.3, dTop(kx) + 4.7, 10, 6);
    }
    /* the S-300F hatches: three rows of four */
    for (i = 0; i < 3; i++) for (j = 0; j < 4; j++) {
      var fx = 61.5 + i * 6.0, fy = (j - 1.5) * 4.6;
      fortHatch(THREE, g, T, fx, fy, dTop(fx) + 0.04);
    }
    /* the V breakwater */
    for (s = -1; s <= 1; s += 2) {
      var ax0 = 86.0, ay0 = 0, ax1 = 79.5, ay1 = s * 10.0;
      var bl = Math.sqrt((ax1 - ax0) * (ax1 - ax0) + (ay1 - ay0) * (ay1 - ay0));
      var bw = box(THREE, g, bl, 0.3, 1.2, T.sup, (ax0 + ax1) / 2, (ay0 + ay1) / 2, dTop(83) + 0.6);
      bw.rotation.z = Math.atan2(ay1 - ay0, ax1 - ax0);
    }
    /* the two raised casings */
    box(THREE, g, 8.0, 4.6, 0.9, T.sup, 91.0, 3.4, dTop(91) + 0.45);
    box(THREE, g, 7.0, 4.4, 0.9, T.sup, 99.0, -3.0, dTop(99) + 0.45);
    /* RBU-12000 on its turntable */
    cylZ(THREE, g, 2.0, 2.1, 0.5, 16, T.sup, 106.5, 0, dTop(106.5) + 0.25);
    box(THREE, g, 2.8, 2.4, 1.4, T.sup, 106.5, 0, dTop(106.5) + 1.3);
    for (i = 0; i < 10; i++) cylX(THREE, g, 0.17, 0.17, 0.3, 6, T.hatch, 107.95, (i % 5 - 2) * 0.44, dTop(106.5) + 1.0 + Math.floor(i / 5) * 0.55);
    /* working gear: capstans, bollards, chain pipes, jackstaff */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.65, 0.75, 0.8, 12, T.metal, 113.0, s * 2.4, dTop(113.0) + 0.4);
      box(THREE, g, 1.8, 1.0, 0.6, T.metal, 116.5, s * 1.8, dTop(116.5) + 0.3);
      for (i = 0; i < 4; i++) {
        var xb = 62 + i * 13;
        cylZ(THREE, g, 0.24, 0.24, 0.6, 8, T.metal, xb, s * (edgeY(xb) - 1.0), dTop(xb) + 0.3);
      }
    }
    strut(THREE, g, T.metal, 124.6, 0, dTop(124.6), 124.6, 0, dTop(124.6) + 3.4, 0.05, 4);

    /* ---------------- railings: the main deck edges (not round the pad) */
    function railRun(x0, x1) {
      for (var sg = -1; sg <= 1; sg += 2) {
        var prev = null, xq;
        for (xq = x0; xq <= x1; xq += 5.0) {
          var zd = deckZ(xq) + 0.04, yd = sg * (edgeY(xq) - 0.15), xx = xAt(xq, deckZ(xq));
          strut(THREE, g, T.metal, xx, yd, zd, xx, yd, zd + 1.0, 0.04, 3);
          if (prev) strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + 0.98, xx, yd, zd + 0.98, 0.025, 3);
          prev = [xx, yd, zd];
        }
      }
    }
    railRun(-80.0, 75.0);

    /* ---------------- underwater: two shafts and screws */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.36, 0.36, 26.0, 8, T.metal, -104.0, s * 5.0, -5.6);
      strut(THREE, g, T.metal, -112.0, s * 5.0, -5.6, -112.0, s * 3.0, -3.6, 0.16, 4);
      cylX(THREE, g, 0.55, 0.7, 1.2, 8, T.metal, -117.6, s * 5.0, -5.6);
      for (i = 0; i < 4; i++) {
        var bld = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.8, 2.2), T.metal);
        bld.position.set(-117.6, s * 5.0, -5.6); bld.rotation.x = i * PI / 2 + 0.4;
        bld.translateZ(1.25); bld.rotation.y = 0.45; g.add(bld);
      }
    }

    /* ---------------- team: three small strips on up-facing roofs, 2 cm proud */
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -1.0, 0, 25.42);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -62.0, 0, 19.07);
    box(THREE, g, 1.2, 4.0, 0.04, T.team, -30.0, 0, 13.27);
    /* the red-brown roofs of the deckhouse levels (2014 photographs from above) */
    box(THREE, g, 35.8, 23.4, 0.04, T.deck, 9.0, 0, 16.02);
    box(THREE, g, 29.8, 21.4, 0.04, T.deck, -55.0, 0, 15.02);
    box(THREE, g, 30.8, 23.0, 0.04, T.deck, -24.5, 0, 13.22);
    box(THREE, g, 19.8, 14.2, 0.04, T.deck, -55.0, 0, 19.02);
    box(THREE, g, 28.8, 17.8, 0.04, T.deck, 5.5, 0, 22.62);

    /* ---------------- trained mount: the twin AK-130 on its round base */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(-74.5, 0, 10.4); ak130(THREE, tw, T);

    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    var tb = bake(THREE, tw);
    tw.children.slice().forEach(function (c) { tw.remove(c); });
    tb.children.forEach(function (c) { tw.add(c); });
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

UNIT_MODELS["pact_e90_cruiser"] = {
  len: 250.1,
  build: function (THREE, M, C) { return HeroPyotr.build(THREE, M, C); }
};
