/* ============ mine_objects.js - the mines themselves ============

   Two small static objects that get drawn in very large numbers: a buried
   anti-tank mine and a moored contact mine. Both are authored at real scale
   in the shared model space (+X front, +Y left, +Z up, metres) and left for
   the renderer to size - do not pre-inflate them here.

   Ground convention: z = 0 is the earth for the land mine and the WATERLINE
   for the sea mine, so the sea mine's mooring ring and cable hang below the
   origin where the water plane hides them. Nothing here relies on a
   "snap the belly to the ground" pass: the land mine already sits on z = 0,
   give or take a 3 mm pebble of spoil.

   Registered into MINE_MODELS as .land / .sea, and mirrored into UNIT_MODELS
   as "mine_land" / "mine_sea" so the comparison harness can render them.

   Budget: 212 triangles for the land mine, 356 for the sea mine, one canvas
   per type (256 x 384 for the land mine, split into three bands; 256 x 256
   for the sea mine), and every canvas, texture and material cached at module
   level so laying a hundred mines costs a hundred Object3Ds and nothing more.

   Overall extents, measured: land 0.444 x 0.450 x 0.113 m - the mine itself
   is 0.33 across and 0.11 high, the rest is the scrape. Sea 1.0 x 0.975 x
   1.653 m, of which everything below z = 0 is mooring gear underwater.     */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }
if (typeof MINE_MODELS === "undefined") { var MINE_MODELS = {}; }

(function () {
  "use strict";

  /* ------------------------------------------------------------ utilities */

  /* Deterministic noise. The canvases are built once and cached, but a mine
     that speckled itself differently on every reload would be impossible to
     compare against its own screenshot. */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function speckle(c, x0, y0, w, h, n, seed, cols, sz) {
    var r = rng(seed), i, x, y, s;
    for (i = 0; i < n; i++) {
      x = x0 + r() * w; y = y0 + r() * h;
      c.fillStyle = cols[(r() * cols.length) | 0];
      s = sz * (0.45 + r() * 1.1);
      c.fillRect(x, y, s, s);
    }
  }

  /* One canvas can feed two materials: repeat/offset picks a horizontal band
     out of it. v0/v1 are in texture space, so v = 1 is the TOP row of the
     drawn canvas (flipY is on by default). */
  function texFrom(THREE, cv, v0, v1) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    if (v1 !== undefined) { t.repeat.set(1, v1 - v0); t.offset.set(0, v0); }
    /* r148 defines THREE.SRGBColorSpace but Texture.colorSpace is inert until
       r152 - encoding is the one that actually does anything here. Testing for
       SRGBColorSpace first is how a hero warship shipped as a black cutout. */
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.needsUpdate = true;
    return t;
  }

  function skin(THREE, tex, tint, rough) {
    return new THREE.MeshStandardMaterial({
      map: tex,
      color: tint === undefined ? 0xffffff : tint,
      roughness: rough === undefined ? 0.9 : rough,
      metalness: 0.06,
    });
  }
  /* An unmapped colour is fed to the shader as LINEAR light, while a texture
     tagged sRGB gets decoded first. Pick METAL greys that read as steel in a
     paint chart and they arrive four times too bright and burn out to white
     under the key light - the horns on this mine looked like ivory tusks. All
     the bare-metal hexes below are therefore pre-darkened to linear. */
  function metal(THREE, col, rough, met) {
    return new THREE.MeshStandardMaterial({
      color: col,
      roughness: rough === undefined ? 0.55 : rough,
      metalness: met === undefined ? 0.5 : met,
    });
  }
  /* C.team is a CSS hex STRING in the game and a number in some harnesses.
     THREE.Color swallows either; arithmetic on it swallows neither. */
  function teamColor(THREE, C) {
    var v = (C && C.team !== undefined && C.team !== null) ? C.team : 0x6f7a84;
    try { return new THREE.Color(v); } catch (e) { return new THREE.Color(0x6f7a84); }
  }

  /* =========================================================== land canvas
     Three bands out of one 256 x 384 canvas, because a disc lit by the disc
     UV of a CircleGeometry sampling the SIDE band came out striped with the
     casing ribs, like corrugated iron laid flat.
       y   0-128 (tex v 0.67-1.00): casing side. u wraps around the mine, v
                 runs from the buried bottom edge up to the rim.
       y 128-256 (tex v 0.33-0.67): the top faces. Drawn as ellipses because
                 a circle UV inscribes the [0,1] box, so a 2:1 band maps an
                 ellipse back to a circle.
       y 256-384 (tex v 0.00-0.33): turned earth, outer lip at the bottom. */
  var landCv = null;
  function landCanvas() {
    if (landCv) return landCv;
    var W = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = 384;
    var c = cv.getContext("2d"), i, x, g;

    /* ---- casing: dark olive, ribbed, filthy along the buried edge ---- */
    c.fillStyle = "#2f3120"; c.fillRect(0, 0, W, 128);
    /* uneven paint - these things are stored in crates and dragged about */
    var patches = [[10, 8, 46, 62, "rgba(255,255,255,0.05)"],
                   [88, 30, 38, 80, "rgba(0,0,0,0.09)"],
                   [150, 4, 54, 50, "rgba(255,255,255,0.04)"],
                   [206, 44, 40, 70, "rgba(0,0,0,0.07)"],
                   [58, 70, 34, 40, "rgba(120,110,70,0.10)"]];
    for (i = 0; i < patches.length; i++) {
      c.fillStyle = patches[i][4];
      c.fillRect(patches[i][0], patches[i][1], patches[i][2], patches[i][3]);
    }
    /* moulded ribs around the circumference */
    for (i = 0; i < 26; i++) {
      x = i * W / 26;
      c.fillStyle = "rgba(18,20,14,0.30)"; c.fillRect(x, 4, 2.2, 120);
      c.fillStyle = "rgba(196,198,170,0.07)"; c.fillRect(x + 2.4, 4, 1.2, 120);
    }
    /* rolled rim at the top edge and a shadow line under it */
    c.fillStyle = "rgba(210,212,186,0.10)"; c.fillRect(0, 0, W, 7);
    c.fillStyle = "rgba(12,14,10,0.34)"; c.fillRect(0, 7, W, 3);
    /* a pair of stencilled bands, faded */
    c.fillStyle = "rgba(196,176,96,0.12)"; c.fillRect(0, 34, W, 5);
    c.fillStyle = "rgba(196,176,96,0.07)"; c.fillRect(0, 42, W, 2);
    /* earth creeping up the buried third */
    g = c.createLinearGradient(0, 74, 0, 128);
    g.addColorStop(0, "rgba(52,40,26,0)");
    g.addColorStop(1, "rgba(46,35,22,0.72)");
    c.fillStyle = g; c.fillRect(0, 74, W, 54);
    speckle(c, 0, 60, W, 68, 260, 7331, ["#3a2f20", "#5a4a30", "#2a2317"], 2.4);
    speckle(c, 0, 0, W, 128, 200, 9137, ["rgba(0,0,0,0.22)", "rgba(230,230,200,0.10)"], 1.8);
    /* a couple of scuffs where the paint has gone */
    c.fillStyle = "rgba(150,132,96,0.30)"; c.fillRect(38, 18, 16, 3);
    c.fillRect(174, 58, 12, 3); c.fillRect(122, 96, 20, 3);

    /* ---- top faces: moulded radial ribs, worn brightest at the centre ---- */
    c.save();
    c.beginPath(); c.rect(0, 128, W, 128); c.clip();
    c.fillStyle = "#2f3120"; c.fillRect(0, 128, W, 128);
    c.translate(128, 192); c.scale(1, 0.5);
    for (i = 0; i < 20; i++) {
      var ta = i * Math.PI / 10;
      c.strokeStyle = "rgba(14,16,10,0.34)"; c.lineWidth = 7;
      c.beginPath();
      c.moveTo(Math.cos(ta) * 34, Math.sin(ta) * 34);
      c.lineTo(Math.cos(ta) * 128, Math.sin(ta) * 128);
      c.stroke();
      c.strokeStyle = "rgba(198,200,172,0.06)"; c.lineWidth = 3;
      c.beginPath();
      c.moveTo(Math.cos(ta + 0.09) * 34, Math.sin(ta + 0.09) * 34);
      c.lineTo(Math.cos(ta + 0.09) * 128, Math.sin(ta + 0.09) * 128);
      c.stroke();
    }
    c.strokeStyle = "rgba(12,14,9,0.42)"; c.lineWidth = 5;
    [36, 74, 112].forEach(function (rad) {
      c.beginPath(); c.arc(0, 0, rad, 0, 6.2832); c.stroke();
    });
    c.fillStyle = "rgba(198,200,172,0.07)";
    c.beginPath(); c.arc(0, 0, 30, 0, 6.2832); c.fill();
    c.restore();
    speckle(c, 0, 128, W, 128, 300, 6611, ["rgba(0,0,0,0.24)", "rgba(120,110,74,0.16)"], 2.4);

    /* ---- turned earth: fresh and dark against the mine, dry at the lip ---- */
    g = c.createLinearGradient(0, 384, 0, 256);
    g.addColorStop(0, "#463b2a");
    g.addColorStop(0.55, "#392f20");
    g.addColorStop(1, "#261f15");
    c.fillStyle = g; c.fillRect(0, 256, W, 128);
    /* clumps and hollows */
    var r = rng(4242);
    for (i = 0; i < 46; i++) {
      var cx = r() * W, cy = 258 + r() * 124, rad = 3 + r() * 11;
      c.fillStyle = r() > 0.5 ? "rgba(28,22,14,0.22)" : "rgba(150,130,94,0.16)";
      c.beginPath(); c.arc(cx, cy, rad, 0, 6.2832); c.fill();
    }
    speckle(c, 0, 256, W, 128, 700, 5150, ["#1b160e", "#4d4029", "#2f2618", "#5a4b33"], 2.6);
    landCv = cv;
    return cv;
  }

  /* ============================================================ sea canvas
     Wrapped straight onto the sphere: canvas x runs around the equator,
     canvas y from the north pole (0) to the south pole (256), so the joint
     flange lands on the horizontal centre line and growth gets heavier as
     you go down.                                                           */
  var seaCv = null;
  function seaCanvas() {
    if (seaCv) return seaCv;
    var W = 256, H = 256, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var c = cv.getContext("2d"), i, r = rng(8081);

    c.fillStyle = "#161a1b"; c.fillRect(0, 0, W, H);
    /* mottled paint, greener where the growth has taken hold */
    for (i = 0; i < 30; i++) {
      var mx = r() * W, my = r() * H, mr = 12 + r() * 34;
      c.fillStyle = r() > 0.45 ? "rgba(36,46,40,0.30)" : "rgba(8,10,11,0.35)";
      c.beginPath(); c.arc(mx, my, mr, 0, 6.2832); c.fill();
    }
    /* rust running down from the horn seats and the top plug */
    for (i = 0; i < 18; i++) {
      var rx = r() * W, ry = 24 + r() * 96, rl = 26 + r() * 88, rw = 1.5 + r() * 3.4;
      var g = c.createLinearGradient(0, ry, 0, ry + rl);
      g.addColorStop(0, "rgba(96,52,22,0.24)");
      g.addColorStop(1, "rgba(92,48,20,0)");
      c.fillStyle = g; c.fillRect(rx, ry, rw, rl);
    }
    /* the joint flange between the two hemispheres, with its bolt heads */
    c.fillStyle = "rgba(6,8,9,0.75)"; c.fillRect(0, 122, W, 4);
    c.fillStyle = "rgba(112,118,116,0.15)"; c.fillRect(0, 126, W, 6);
    c.fillStyle = "rgba(6,8,9,0.55)"; c.fillRect(0, 132, W, 3);
    for (i = 0; i < 32; i++) {
      c.fillStyle = "rgba(96,102,98,0.30)";
      c.beginPath(); c.arc(i * W / 32 + 4, 129, 1.9, 0, 6.2832); c.fill();
    }
    /* barnacles and weed - a light dusting up top, a crust underneath */
    speckle(c, 0, 0, W, 128, 130, 1201, ["#232720", "#1b1f1c", "#2c3129"], 2.0);
    speckle(c, 0, 150, W, 106, 380, 3307, ["#2b2f27", "#232720", "#34392e", "#1a1d17"], 2.6);
    for (i = 0; i < 26; i++) {
      var bx = r() * W, by = 152 + r() * 104, br = 1.6 + r() * 3.4;
      c.fillStyle = "rgba(74,78,64,0.38)";
      c.beginPath(); c.arc(bx, by, br, 0, 6.2832); c.fill();
      c.fillStyle = "rgba(34,38,30,0.60)";
      c.beginPath(); c.arc(bx, by, br * 0.42, 0, 6.2832); c.fill();
    }
    /* wet sheen along the waterline band */
    c.fillStyle = "rgba(190,206,206,0.05)"; c.fillRect(0, 100, W, 18);
    seaCv = cv;
    return cv;
  }

  /* --------------------------------------------------- cached texture sets */
  var LT = null, ST = null;
  function landTex(THREE) {
    if (!LT) {
      var cv = landCanvas();
      LT = {
        casing: texFrom(THREE, cv, 2 / 3, 1),
        top: texFrom(THREE, cv, 1 / 3, 2 / 3),
        earth: texFrom(THREE, cv, 0, 1 / 3),
      };
      LT.casingMat = skin(THREE, LT.casing, 0xffffff, 0.9);
      LT.topMat = skin(THREE, LT.top, 0xffffff, 0.9);
      LT.plateSideMat = skin(THREE, LT.casing, 0x6e7062, 0.94);
      LT.plateMat = skin(THREE, LT.top, 0x6e7062, 0.94);
      LT.earthMat = skin(THREE, LT.earth, 0x9d968c, 0.96);
      LT.earthMat.metalness = 0.0;
      LT.fuzeMat = metal(THREE, 0x070806, 0.72, 0.12);
    }
    return LT;
  }
  var hornByTeam = {};
  function seaHornMat(THREE, C, base) {
    var col = teamColor(THREE, C), key = col.getHexString();
    if (!hornByTeam[key]) {
      var m = base.clone();
      m.color = new THREE.Color(0x0a0c0d).lerp(col.multiplyScalar(0.06), 0.5);
      hornByTeam[key] = m;
    }
    return hornByTeam[key];
  }
  function seaTex(THREE) {
    if (!ST) {
      ST = { hull: texFrom(THREE, seaCanvas()) };
      /* wet, so the low end of the skin range - it still has to read as
         painted steel and not as a chrome ball */
      ST.hullMat = skin(THREE, ST.hull, 0xffffff, 0.82);
      ST.hullMat.metalness = 0.10;
      ST.hornMat = metal(THREE, 0x0a0c0d, 0.72, 0.28);    // soft lead horns
      ST.hornMat.side = THREE.DoubleSide;   // the horn tips are open tubes
      ST.ringMat = metal(THREE, 0x070809, 0.52, 0.5);     // wet forged steel
      ST.cableMat = metal(THREE, 0x050607, 0.6, 0.45);
    }
    return ST;
  }

  /* ====================================================== LAND: anti-tank
     0.33 m across, 0.11 m high, sunk into a shallow scrape whose berm adds
     about 0.11 m of skirt all round. 208 triangles.                        */
  function buildLandMine(THREE, M, C) {
    var G = new THREE.Group(), T = landTex(THREE);
    var R = 0.165, HB = 0.082, m, gm;

    /* the scrape: a low berm of turned earth sloping away from the rim.
       An open cone costs 40 triangles and, unlike a flat disc, it actually
       makes the mine look dug in rather than dropped on the grass. */
    gm = new THREE.CylinderGeometry(R * 1.02, 0.222, 0.048, 20, 1, true);
    gm.rotateX(Math.PI / 2);
    m = new THREE.Mesh(gm, T.earthMat);
    m.position.z = 0.024;
    G.add(m);

    /* spoil thrown out of the hole - 4 triangles each */
    var clod = new THREE.TetrahedronGeometry(0.020);
    var rr = rng(97);
    for (var i = 0; i < 7; i++) {
      var a = rr() * 6.2832, rad = 0.196 + rr() * 0.034;
      m = new THREE.Mesh(clod, T.earthMat);
      m.position.set(Math.cos(a) * rad, Math.sin(a) * rad, 0.014);
      m.rotation.set(rr() * 3, rr() * 3, rr() * 3);
      m.scale.set(1, 1, 0.45);      // keeps every vertex above z = 0
      G.add(m);
    }

    /* casing: a squat drum, very slightly coned so the top rim catches light */
    gm = new THREE.CylinderGeometry(R * 0.98, R, HB, 20, 1, true);
    gm.rotateX(Math.PI / 2);
    m = new THREE.Mesh(gm, T.casingMat);
    m.position.z = HB / 2;
    G.add(m);
    m = new THREE.Mesh(new THREE.CircleGeometry(R * 0.98, 20), T.topMat);
    m.position.z = HB;
    G.add(m);

    /* pressure plate: the wide black disc that does the work */
    gm = new THREE.CylinderGeometry(0.105, 0.108, 0.016, 16, 1, true);
    gm.rotateX(Math.PI / 2);
    m = new THREE.Mesh(gm, T.plateSideMat);
    m.position.z = HB + 0.008;
    G.add(m);
    m = new THREE.Mesh(new THREE.CircleGeometry(0.105, 16), T.plateMat);
    m.position.z = HB + 0.016;
    G.add(m);

    /* fuze boss on top of the plate */
    gm = new THREE.CylinderGeometry(0.038, 0.040, 0.012, 8, 1, true);
    gm.rotateX(Math.PI / 2);
    m = new THREE.Mesh(gm, T.fuzeMat);
    m.position.z = HB + 0.022;
    G.add(m);
    m = new THREE.Mesh(new THREE.CircleGeometry(0.038, 8), T.fuzeMat);
    m.position.z = HB + 0.028;
    G.add(m);

    /* arming lever on the rim, in team colour - the one thing on a buried
       mine that anybody ever paints, and the only ownership cue it gets */
    var tc = teamColor(THREE, C).multiplyScalar(0.05);
    m = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.022, 0.013),
                       new THREE.MeshStandardMaterial({
                         color: tc, roughness: 0.8, metalness: 0.12 }));
    m.position.set(R * 0.90, 0, HB * 0.76);   // clear of the spoil, or it is buried
    G.add(m);

    G.name = "mine_land";
    return G;
  }

  /* ======================================================= SEA: moored contact
     A 1.0 m sphere sitting on the waterline with six Hertz horns on the upper
     hemisphere, a mooring ring under it and a stub of cable to the sinker.
     356 triangles.                                                          */
  function buildSeaMine(THREE, M, C) {
    var G = new THREE.Group(), T = seaTex(THREE);
    var RS = 0.5, CZ = 0.05, m, gm, i;

    /* case: 14 x 8 is 196 triangles and, on a sphere a metre across at RTS
       zoom, indistinguishable from twice that */
    gm = new THREE.SphereGeometry(RS, 14, 8);
    gm.rotateX(Math.PI / 2);                     // poles onto +Z, flange level
    m = new THREE.Mesh(gm, T.hullMat);
    m.position.z = CZ;
    G.add(m);

    /* horns: one on the crown, five on the shoulders at 42 degrees */
    var horn = new THREE.CylinderGeometry(0.011, 0.036, 0.118, 6, 1, true);
    var up = new THREE.Vector3(0, 1, 0), d = new THREE.Vector3();
    var dirs = [[0, 0]], k, hm = seaHornMat(THREE, C, T.hornMat);
    for (k = 0; k < 5; k++) dirs.push([0.7330, k * 1.2566 + 0.31]);   // 42 deg
    for (i = 0; i < dirs.length; i++) {
      var pol = dirs[i][0], az = dirs[i][1];
      d.set(Math.sin(pol) * Math.cos(az), Math.sin(pol) * Math.sin(az), Math.cos(pol));
      m = new THREE.Mesh(horn, hm);
      m.quaternion.setFromUnitVectors(up, d);
      m.position.set(d.x * (RS + 0.034), d.y * (RS + 0.034), CZ + d.z * (RS + 0.034));
      G.add(m);
    }

    /* mooring lug, ring and a stub of cable running down to the sinker.
       All of it sits below z = 0, which is the waterline - in game the sea
       plane hides it and only the horned cap shows. */
    m = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.08), T.ringMat);
    m.position.z = CZ - RS + 0.012;
    G.add(m);

    gm = new THREE.TorusGeometry(0.085, 0.016, 4, 8);
    gm.rotateX(Math.PI / 2);                     // stand the ring on edge
    m = new THREE.Mesh(gm, T.ringMat);
    m.position.z = CZ - RS - 0.072;
    G.add(m);

    gm = new THREE.CylinderGeometry(0.012, 0.016, 0.42, 6, 1, true);
    m = new THREE.Mesh(gm, T.cableMat);
    m.rotation.z = Math.PI / 2;                  // axis onto X, then lean it
    m.rotation.y = 1.42;
    m.position.set(0.055, 0, CZ - RS - 0.35);
    G.add(m);

    G.name = "mine_sea";
    return G;
  }

  /* ------------------------------------------------------------- register */
  var LAND = { len: 0.33, build: buildLandMine };   // scrape adds ~0.11 m all round
  var SEA = { len: 1.00, build: buildSeaMine };     // sphere diameter

  MINE_MODELS.land = LAND;
  MINE_MODELS.sea = SEA;
  UNIT_MODELS["mine_land"] = LAND;
  UNIT_MODELS["mine_sea"] = SEA;
  if (typeof window !== "undefined") {
    window.MINE_MODELS = MINE_MODELS;
    window.UNIT_MODELS = UNIT_MODELS;
  }
})();
