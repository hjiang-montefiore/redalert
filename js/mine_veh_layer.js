/* ============ mine_veh_layer.js - Armoured Mine-Laying Vehicle ============
   Unit id "minelayer". A tracked mine dispenser in the GMZ-3 / M139 Volcano
   idiom: an armoured hull with NO turret and no main gun, whose entire
   silhouette argues at the BACK.

   Model space follows models3d.js: +X nose, +Y left, +Z up, real metres.
   render3d.js applies rotation.x = -PI/2 to stand the model up, so this file
   is authored Z-UP and never Y-up.

   What this vehicle has to say at a glance, in order of importance:

     - It is a WORKER, not a fighter. The roof is flat and empty except for
       one small commander's cupola offset to the left and a crew hatch.
       Nothing traverses, nothing points forward. A turretless deck on a
       tracked chassis is the single strongest read.
     - It CARRIES something. The rear two thirds of the deck is an open rack
       of mine canisters standing on edge like coins in a slot, held between
       two side frames with separator rails between the columns. From above
       and from three quarters that rack is unmistakably cargo.
     - It PUTS THAT SOMETHING ON THE GROUND. A chute hangs off the tail at
       forty-odd degrees, running from the floor of the magazine down to
       shin height behind the vehicle, with cross rollers in it and a pair
       of hydraulic rams either side. Two plough arms reach down past it to
       ground level to cut the furrow the mine drops into.
     - It lives outdoors. Stowage boxes down both hull sides under the
       sponson overhang, fenders and mud flaps, an engine louvre panel on
       the right front and an exhaust over the fender, a whip aerial aft.

   Running gear follows the conventions in js/armour3d.js: a cylinder's own
   axis is +Y and that IS the axle, so road wheels take no rotation at all;
   the belt is its two runs and not one solid slab, otherwise it swallows the
   wheels; the hull sponson overhangs the track and the belt shows below it.
   Six road wheels on torsion bars, drive sprocket FORWARD, idler aft, four
   return rollers - a post-war engineering chassis, not a tank.

   Dimensions: 8.00 m over the plough arms, 3.10 m over the tracks, 2.50 m to
   the top of the mine rack and 2.39 m to the cupola. Ground clearance 0.46,
   track top 0.86, deck 1.90.                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  /* --------------------------------------------------------- the geometry
     Every number the parts have to agree about lives here, so the deck, the
     magazine floor and the chute mouth cannot drift apart. */
  var L        = 8.00;
  var X_NOSE   = 3.55;   /* tip of the lower nose plate                    */
  var X_TAIL   = -3.35;  /* hull tail plate                                */
  var Z_BELLY  = 0.46;   /* hull floor, clear of the track                 */
  var Z_DECK   = 1.90;   /* hull roof - everything on top starts here      */
  var HW_BODY  = 1.22;   /* half width of the hull tub                     */
  var HW_DECK  = 1.55;   /* half width of the roof plate = the beam        */
  var DECK_T   = 0.16;   /* roof plate thickness: this is the sponson side */

  var BELT_Y   = 1.34;   /* track centreline                               */
  var BELT_W   = 0.42;
  var BELT_T   = 0.10;   /* belt band thickness                            */
  var WHEEL_R  = 0.33;
  var WHEEL_Z  = 0.36;   /* road wheel axle height                         */
  var TRK_TOP  = 0.86;   /* top of the upper run                           */
  var WHEEL_X  = [-2.55, -1.53, -0.51, 0.51, 1.53, 2.55];
  var ROLL_X   = [-2.04, -0.60, 0.85, 2.15];

  /* the glacis: one plane from the deck break down to the nose */
  var GLA_X0   = 2.05, GLA_X1 = 3.40, GLA_Z1 = 1.02;
  var GLA_SLOPE = (Z_DECK - GLA_Z1) / (GLA_X1 - GLA_X0);
  var GLA_TILT = Math.atan(GLA_SLOPE);
  function glacisZ(x) { return Z_DECK - (x - GLA_X0) * GLA_SLOPE; }

  /* the magazine */
  var MAG_X0   = -0.55, MAG_X1 = -3.25;   /* front and rear bulkheads      */
  var MAG_HW   = 1.18;
  var MAG_FLR  = 2.04;                    /* the floor the canisters sit on */
  var MINE_R   = 0.205, MINE_T = 0.16;
  var MINE_Y   = [0.865, 0.288, -0.288, -0.865];
  var MINE_X   = [-0.92, -1.36, -1.80, -2.24, -2.68, -3.12];

  /* ------------------------------------------------------------ materials
     Three tiers and no more. SKIN is the painted hull: a procedural canvas
     with plate seams, bolt runs and dirt that gets heavier low down. METAL
     is running gear, rails, the chute and the rack frames. GLASS is the
     cupola vision blocks. */
  var OLIVE = 0x4b5238;

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  var skinTexCache;
  function skinTex(THREE) {
    if (skinTexCache !== undefined) return skinTexCache;
    skinTexCache = null;
    try {
      var W = 512, H = 512, i;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var R = rngFor(60413);

      g.fillStyle = "#4b5238"; g.fillRect(0, 0, W, H);

      /* soft disruptive blotches - an engineer vehicle wears the same green
         as everything else in the park, just more faded on the upper faces */
      var tones = ["#3b422c", "#5b6245", "#464d33"];
      for (i = 0; i < 22; i++) {
        g.globalAlpha = 0.40; g.fillStyle = tones[i % tones.length];
        g.beginPath();
        g.ellipse(R() * W, R() * H, 38 + R() * 95, 22 + R() * 58, R() * 3.14, 0, 6.29);
        g.fill();
      }
      g.globalAlpha = 1;

      /* plate seams: long welds, mostly along the hull */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.6;
      for (i = 0; i < 20; i++) {
        var x = R() * W, y = R() * H, l = 70 + R() * 200;
        g.beginPath();
        if (R() < 0.62) { g.moveTo(x, y); g.lineTo(x + l, y + (R() - 0.5) * 12); }
        else { g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 12, y + l); }
        g.stroke();
      }
      /* a lighter highlight just above each seam so the plate reads proud */
      g.strokeStyle = "rgba(255,255,255,0.07)"; g.lineWidth = 1.2;
      for (i = 0; i < 14; i++) {
        var hx = R() * W, hy = R() * H, hl = 60 + R() * 170;
        g.beginPath(); g.moveTo(hx, hy - 2); g.lineTo(hx + hl, hy - 2); g.stroke();
      }

      /* bolt runs and lifting-eye clusters */
      g.fillStyle = "rgba(0,0,0,0.26)";
      for (i = 0; i < 28; i++) {
        var bx = R() * W, by = R() * H, n = 4 + ((R() * 9) | 0);
        for (var q = 0; q < n; q++) g.fillRect(bx + q * 6, by, 2, 2);
      }

      /* chipped paint at the edges of things */
      for (i = 0; i < 90; i++) {
        g.fillStyle = R() < 0.5 ? "rgba(126,116,96,0.30)" : "rgba(36,33,28,0.26)";
        g.fillRect(R() * W, R() * H, 2 + R() * 6, 2 + R() * 4);
      }

      /* dust thrown up by the tracks: heavy low, nothing on the roof */
      var dust = g.createLinearGradient(0, H * 0.50, 0, H);
      dust.addColorStop(0, "rgba(158,145,114,0.00)");
      dust.addColorStop(1, "rgba(158,145,114,0.40)");
      g.fillStyle = dust; g.fillRect(0, H * 0.50, W, H * 0.50);
      g.fillStyle = "rgba(22,20,18,0.15)";
      for (i = 0; i < 34; i++) g.fillRect(R() * W, R() * H, 2 + R() * 4, 18 + R() * 62);

      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      /* r148 ships SRGBColorSpace but Texture.colorSpace is inert until r152,
         so the ONLY thing that works here is the old encoding field */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      skinTexCache = t;
    } catch (e) { skinTexCache = null; }
    return skinTexCache;
  }

  function skinMat(THREE) {
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    var t = skinTex(THREE);
    if (t) m.map = t; else m.color.setHex(OLIVE);
    return m;
  }
  function metalMat(THREE, c, r, mt) {
    return new THREE.MeshStandardMaterial({
      color: c === undefined ? 0x54595d : c,
      roughness: r === undefined ? 0.55 : r,
      metalness: mt === undefined ? 0.48 : mt });
  }
  function glassMat(THREE) {
    return new THREE.MeshPhysicalMaterial({
      color: 0x2c3a44, roughness: 0.10, metalness: 0.0,
      transparent: true, opacity: 0.84 });
  }

  /* ------------------------------------------------------------- shorthand
     BoxGeometry(w, d, h) is X by Y by Z here, and a cylinder's own axis is
     +Y, so cylY needs no rotation at all - that is the axle case. */
  function box(THREE, w, d, h, mtl, x, y, z) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }
  function cylY(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }
  function cylZ(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var m = cylY(THREE, r1, r2, h, seg, mtl, x, y, z);
    m.rotation.x = Math.PI / 2;
    return m;
  }
  function cylX(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var m = cylY(THREE, r1, r2, h, seg, mtl, x, y, z);
    m.rotation.z = Math.PI / 2;
    return m;
  }

  /* ------------------------------------------------------------------ hull
     Stations in INCREASING x, as [x, halfWidth, zBottom, zTop]. A repeated
     station emits a zero-area ring, which stops computeVertexNormals
     averaging the deck into the glacis - that is what makes the plate join
     a hard crease instead of a rounded shoulder.

     sq is the exponent loft() raises |cos| to: BELOW one squares the section
     off. An armoured hull is a box, so it wants a low one. */
  var STATIONS = [
    [X_TAIL, 1.08, 0.62, 1.76],
    [-3.05,  1.22, 0.48, Z_DECK, 1],
    [GLA_X0, 1.22, Z_BELLY, Z_DECK, 1],
    [GLA_X1, 1.10, 0.56, GLA_Z1],
    [X_NOSE, 0.92, 0.62, 0.96],
  ];

  function buildHull(THREE, M, skin) {
    var G = new THREE.Group();
    var secs = [], i, s, sec;
    for (i = 0; i < STATIONS.length; i++) {
      s = STATIONS[i];
      sec = { x: s[0], w: s[1], h: (s[3] - s[2]) * 0.5,
              zc: (s[3] + s[2]) * 0.5, sq: 0.28 };
      secs.push(sec);
      if (s[4]) secs.push({ x: sec.x, w: sec.w, h: sec.h, zc: sec.zc, sq: sec.sq });
    }
    G.add(new THREE.Mesh(M.loft(THREE, secs, 20), skin));

    /* The roof, as one flat plate carried out to the full beam. A lofted
       section can only be widest at its own mid height, so left alone the
       roof corners droop and the vehicle reads as a loaf from overhead. The
       plate is what makes the plan view a rectangle, and it gives every roof
       fitting one height to sit at. Its thickness IS the sponson side. */
    var pts = [
      [2.10, 1.24], [1.85, HW_DECK], [-3.00, HW_DECK], [-3.22, 1.30],
      [-3.22, -1.30], [-3.00, -HW_DECK], [1.85, -HW_DECK], [2.10, -1.24],
    ];
    var pl = new THREE.Mesh(M.slab(THREE, pts, DECK_T), skin);
    pl.position.z = Z_DECK - DECK_T;
    G.add(pl);
    return G;
  }

  /* ---------------------------------------------------------- running gear */
  function runningGear(THREE, g) {
    var dark  = metalMat(THREE, 0x191b1d, 0.94, 0.06);
    var steel = metalMat(THREE, 0x4a4f53, 0.60, 0.45);
    var s, i;

    for (s = -1; s <= 1; s += 2) {
      var ty = s * BELT_Y;

      /* the belt is its two runs. Drawn as one solid slab it fills the space
         between the wheels and swallows them whole. */
      g.add(box(THREE, 6.50, BELT_W, BELT_T, dark, 0.02, ty, BELT_T * 0.5));
      g.add(box(THREE, 6.50, BELT_W, BELT_T, dark, 0.02, ty, TRK_TOP - BELT_T * 0.5));

      for (i = 0; i < WHEEL_X.length; i++) {
        /* no rotation: the cylinder's axis is already +Y, which is the axle */
        g.add(cylY(THREE, WHEEL_R, WHEEL_R, BELT_W * 0.84, 12, dark,
                   WHEEL_X[i], ty, WHEEL_Z));
        /* a pale hub picks the wheel out against the belt */
        g.add(cylY(THREE, WHEEL_R * 0.34, WHEEL_R * 0.34, BELT_W * 0.94, 8, steel,
                   WHEEL_X[i], ty, WHEEL_Z));
      }

      /* drive sprocket forward, idler aft, both raised clear of the ground */
      g.add(cylY(THREE, 0.27, 0.27, BELT_W * 0.72, 12, steel, 3.02, ty, 0.58));
      g.add(cylY(THREE, 0.24, 0.24, BELT_W * 0.72, 12, dark, -3.00, ty, 0.52));

      for (i = 0; i < ROLL_X.length; i++)
        g.add(cylY(THREE, 0.12, 0.12, BELT_W * 0.50, 8, dark,
                   ROLL_X[i], ty, TRK_TOP - BELT_T - 0.12));
    }
  }

  /* --------------------------------------------------------------- fenders */
  function fenders(THREE, g, skin, dark) {
    for (var s = -1; s <= 1; s += 2) {
      var y = s * BELT_Y;
      /* forward of the deck the track runs uncovered, so it gets its own
         mudguard rather than nothing at all */
      g.add(box(THREE, 1.24, BELT_W + 0.10, 0.07, skin, 2.72, y, 1.12));
      g.add(box(THREE, 0.06, BELT_W + 0.10, 0.34, dark, 3.32, y, 0.95));
      /* no rear flap: the plough arm hangs exactly where one would go */
    }
  }

  /* ------------------------------------------------------------ nose plate */
  function noseFittings(THREE, g, skin, dark, glass) {
    /* an applique plate laid on the glacis, lying on its own normal */
    var xm = 2.745, zm = glacisZ(xm);
    var n = 0.045;
    var ap = box(THREE, 1.28, 2.28, 0.07, skin,
                 xm + n * Math.sin(GLA_TILT), 0, zm + n * Math.cos(GLA_TILT));
    ap.rotation.y = GLA_TILT;
    g.add(ap);

    for (var s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 0.24, 0.13, 0.22, dark, 3.42, s * 0.60, 0.80));
      /* headlight in a brush guard - small, but it is the only thing that
         says which end is the front once the rack is behind you */
      g.add(cylX(THREE, 0.11, 0.11, 0.14, 10, dark, 3.28, s * 0.86, 1.31));
      g.add(cylX(THREE, 0.095, 0.095, 0.04, 10, glass, 3.37, s * 0.86, 1.31));
      g.add(box(THREE, 0.04, 0.30, 0.05, dark, 3.42, s * 0.86, 1.45));
      g.add(box(THREE, 0.04, 0.30, 0.05, dark, 3.42, s * 0.86, 1.17));
    }
  }

  /* ----------------------------------------------------------- roof fittings
     One small cupola offset to the LEFT and a crew hatch. That is the whole
     armament story: there is no turret ring, no mantlet and no gun. */
  function roofFittings(THREE, g, skin, dark, glass, steel) {
    var cx = 1.50, cy = 0.68;
    g.add(cylZ(THREE, 0.44, 0.44, 0.10, 14, skin, cx, cy, Z_DECK + 0.05));
    g.add(cylZ(THREE, 0.40, 0.40, 0.30, 14, skin, cx, cy, Z_DECK + 0.25));

    /* vision blocks all round the front hemisphere */
    var ang = [0, 0.85, -0.85, 1.70, -1.70, 2.55, -2.55], i;
    for (i = 0; i < ang.length; i++) {
      var a = ang[i];
      var vb = box(THREE, 0.10, 0.20, 0.13, glass,
                   cx + Math.cos(a) * 0.40, cy + Math.sin(a) * 0.40, Z_DECK + 0.30);
      vb.rotation.z = a;
      g.add(vb);
    }
    g.add(cylZ(THREE, 0.38, 0.38, 0.09, 14, skin, cx, cy, Z_DECK + 0.445));
    g.add(box(THREE, 0.15, 0.24, 0.13, dark, cx + 0.34, cy, Z_DECK + 0.52));

    /* crew hatch, flush */
    g.add(cylZ(THREE, 0.40, 0.40, 0.05, 12, dark, 0.35, 0.62, Z_DECK + 0.02));
    g.add(cylZ(THREE, 0.35, 0.35, 0.09, 12, skin, 0.35, 0.62, Z_DECK + 0.06));

    /* engine louvres, right front - the powerpack is forward so the whole
       back of the vehicle is free for the magazine */
    g.add(box(THREE, 0.98, 1.08, 0.05, dark, 1.52, -0.84, Z_DECK - 0.02));
    for (i = 0; i < 6; i++)
      g.add(box(THREE, 0.09, 1.00, 0.10, dark, 1.14 + i * 0.153, -0.84, Z_DECK + 0.04));

    /* exhaust out over the right fender, under a heat shield */
    g.add(cylX(THREE, 0.11, 0.11, 0.58, 10, steel, 1.92, -1.32, 1.56));
    g.add(box(THREE, 0.66, 0.32, 0.05, dark, 1.92, -1.32, 1.72));

    /* a stowed toolbox on the otherwise empty middle of the deck */
    g.add(box(THREE, 0.86, 0.56, 0.24, skin, 0.10, -0.72, Z_DECK + 0.12));
    g.add(box(THREE, 0.90, 0.10, 0.26, dark, 0.10, -0.72, Z_DECK + 0.13));

    /* whip aerial on the left, clear of the rack */
    g.add(box(THREE, 0.14, 0.14, 0.10, dark, -0.25, 1.28, Z_DECK + 0.05));
    g.add(cylZ(THREE, 0.022, 0.012, 1.05, 6, steel, -0.25, 1.28, Z_DECK + 0.60));
  }

  /* ------------------------------------------------------- stowage the sides
     Boxes hung in the gap between the hull tub and the sponson edge. They are
     what stops the flank being a blank painted wall at RTS zoom. */
  function sideStowage(THREE, g, skin, dark) {
    /* Set flush with the hull side these were green boxes on a green wall
       and vanished. They now stand proud of the sponson edge and wear dark
       lid and strap bands, so the flank has an outline instead of a smear. */
    var at = [-0.42, -1.52, -2.44];
    for (var s = -1; s <= 1; s += 2)
      for (var i = 0; i < at.length; i++) {
        g.add(box(THREE, 0.92, 0.32, 0.36, skin, at[i], s * 1.44, 1.54));
        g.add(box(THREE, 0.96, 0.36, 0.05, dark, at[i], s * 1.44, 1.73));
        for (var q = -1; q <= 1; q += 2)
          g.add(box(THREE, 0.06, 0.36, 0.36, dark, at[i] + q * 0.30, s * 1.44, 1.54));
      }
  }

  /* ------------------------------------------------------------- the magazine
     The reason the vehicle exists. Canisters stand on EDGE in four columns
     with separator rails between them, so they roll aft down the chute; that
     is how a real mechanical layer feeds, and it also happens to be the
     reading that survives being sixty pixels tall. */
  function magazine(THREE, g, skin, steel, dark, mine) {
    var xc = (MAG_X0 + MAG_X1) * 0.5, len = MAG_X0 - MAG_X1, i, j;

    /* Floor, and the side frames that carry it. These were solid plates and
       they walled the load in completely: from a side elevation the whole
       point of the vehicle was a blank box. An open frame - bottom rail, top
       rail, four posts - holds the canisters just as convincingly and lets
       them be SEEN, which is the only reason they are modelled. */
    g.add(box(THREE, len, MAG_HW * 2 + 0.04, 0.14, skin, xc, 0, MAG_FLR - 0.07));
    var post = [-0.72, -1.58, -2.42, -3.18];
    for (var s = -1; s <= 1; s += 2) {
      /* The top rail used to cut across the canisters at two thirds height
         and the load read as a fence with nothing behind it. It now clears
         their crowns, so from a side elevation the whole row is visible. */
      g.add(box(THREE, len, 0.09, 0.09, steel, xc, s * MAG_HW, MAG_FLR + 0.045));
      g.add(box(THREE, len, 0.09, 0.08, steel, xc, s * MAG_HW, MAG_FLR + 0.49));
      for (i = 0; i < post.length; i++)
        g.add(box(THREE, 0.09, 0.10, 0.53, steel, post[i], s * MAG_HW, MAG_FLR + 0.26));
    }

    /* bulkheads: tall at the front, cut right down at the back so the load
       has somewhere to go */
    g.add(box(THREE, 0.08, MAG_HW * 2, 0.46, skin, MAG_X0 - 0.04, 0, MAG_FLR + 0.23));
    g.add(box(THREE, 0.08, MAG_HW * 2, 0.16, steel, MAG_X1 + 0.04, 0, MAG_FLR + 0.08));

    /* separator rails between the four columns */
    var sep = [0, 0.577, -0.577];
    for (i = 0; i < sep.length; i++)
      g.add(box(THREE, len, 0.06, 0.22, dark, xc, sep[i], MAG_FLR + 0.11));

    /* retaining straps over the top of the rack */
    g.add(box(THREE, 0.07, MAG_HW * 2, 0.06, dark, -1.15, 0, MAG_FLR + 0.56));
    g.add(box(THREE, 0.07, MAG_HW * 2, 0.06, dark, -2.90, 0, MAG_FLR + 0.56));

    /* the canisters themselves */
    var mz = MAG_FLR + MINE_R;
    for (i = 0; i < MINE_Y.length; i++)
      for (j = 0; j < MINE_X.length; j++)
        g.add(cylX(THREE, MINE_R, MINE_R, MINE_T, 10, mine, MINE_X[j], MINE_Y[i], mz));
  }

  /* ------------------------------------------------------------- the chute
     Hinged off the magazine floor and running down behind the vehicle. Built
     as its own group so the walls and rollers can be written in the chute's
     own frame instead of being trigonometry. */
  function chute(THREE, g, skin, steel, dark) {
    var C = new THREE.Group();
    C.position.set(-3.72, 0, 1.42);
    C.rotation.y = -0.72;

    C.add(box(THREE, 1.70, 0.92, 0.09, skin, 0, 0, 0));
    for (var s = -1; s <= 1; s += 2)
      C.add(box(THREE, 1.70, 0.07, 0.28, steel, 0, s * 0.46, 0.18));
    /* cross rollers: without them the trough is a blank ramp */
    C.add(cylY(THREE, 0.06, 0.06, 0.86, 8, dark, -0.45, 0, 0.12));
    C.add(cylY(THREE, 0.06, 0.06, 0.86, 8, dark, 0.18, 0, 0.12));
    g.add(C);

    /* the rams that raise it, outboard of the trough walls */
    for (var t = -1; t <= 1; t += 2) {
      var ram = box(THREE, 0.92, 0.09, 0.09, steel, -3.66, t * 0.74, 1.60);
      ram.rotation.y = -0.55;
      g.add(ram);
    }
  }

  /* ------------------------------------------------------------ plough arms
     Two furrow openers reaching past the chute to ground level, one in each
     track line. Authored as a side elevation in the xz plane and extruded
     across, which is what M.slab's "xz" mode is for. */
  function ploughs(THREE, g, M, steel, dark) {
    /* The share touches down AHEAD of the chute mouth, because that is the
       order the ground meets things: the furrow is cut, then the mine drops
       into it. Drawn level with the chute the two silhouettes also merged
       into one white wedge and neither read as anything. */
    var pts = [
      [-3.10, 1.68], [-3.43, 1.68], [-3.95, 0.36],
      [-4.11, 0.06], [-3.75, 0.06], [-3.69, 0.34],
    ];
    var th = 0.11;
    for (var s = -1; s <= 1; s += 2) {
      var a = new THREE.Mesh(M.slab(THREE, pts, th, "xz"), steel);
      /* slab("xz") extrudes along -Y from the plane, so shift it back half a
         thickness to sit the arm on its own centreline */
      a.position.y = s * 1.30 + th * 0.5;
      g.add(a);
    }
    /* the beam that ties the two arms together, passing under the chute */
    g.add(cylY(THREE, 0.07, 0.07, 2.72, 8, dark, -3.62, 0, 1.18));
  }

  /* ------------------------------------------------------------------ build */
  function build(THREE, M, C) {
    var skin  = skinMat(THREE);
    /* These were a stop brighter and everything metal - the rack frames,
       the chute, the plough arms - came out white against the green. Under
       ACES with a 1.4 key an unlit-side metal still reads two stops up. */
    var steel = metalMat(THREE, 0x2f3438, 0.62, 0.40);
    var dark  = metalMat(THREE, 0x1e2225, 0.80, 0.20);
    var glass = glassMat(THREE);
    /* the canisters get their own paint: darker and a shade more olive than
       the hull, so the rack reads as cargo and not as more vehicle */
    /* Painted the hull's own olive the canisters disappeared into it. Anti
       tank mines are shipped in sand-drab anyway, and the contrast is what
       makes the rack read as a LOAD at RTS zoom rather than as bodywork. */
    var mine  = new THREE.MeshStandardMaterial({
      color: 0x6e6547, roughness: 0.82, metalness: 0.10 });

    var g = new THREE.Group();
    g.add(buildHull(THREE, M, skin));
    runningGear(THREE, g);
    fenders(THREE, g, skin, dark);
    noseFittings(THREE, g, skin, dark, glass);
    roofFittings(THREE, g, skin, dark, glass, steel);
    sideStowage(THREE, g, skin, dark);
    magazine(THREE, g, skin, steel, dark, mine);
    chute(THREE, g, skin, steel, dark);
    ploughs(THREE, g, M, steel, dark);

    /* Team flash. C.team arrives as a CSS hex STRING - "#4b8fe0" - so it goes
       straight into a material, and no arithmetic may be done on it. */
    if (C && C.team) {
      var team = new THREE.MeshStandardMaterial({
        color: C.team, roughness: 0.58, metalness: 0.20 });
      for (var s = -1; s <= 1; s += 2) {
        /* one on the sponson side, where nothing can cover it */
        g.add(box(THREE, 0.82, 0.04, 0.11, team, 0.95, s * (HW_DECK + 0.02), 1.82));
        /* and one on the rack frame, which is the rear three quarter view */
        g.add(box(THREE, 0.62, 0.04, 0.11, team, -1.90, s * 1.22, MAG_FLR - 0.07));
      }
    }
    return g;
  }

  UNIT_MODELS["minelayer"] = { len: L, build: build };
})();
