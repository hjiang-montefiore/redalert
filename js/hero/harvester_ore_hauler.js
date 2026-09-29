/* ===== harvester_ore_hauler.js - HERO model: rigid-frame ore hauler =======
   The "Ore Hauler" (rules.js harvester, ERA_TIMELESS, every faction in every
   era).  No armoured mining truck has ever existed; "armoured" is card text
   only.  What the old model was actually drawing is a rigid-frame
   off-highway haul truck, so this draws one honestly, in the 90-tonne class
   of the Caterpillar 777 and the Komatsu HD785.

   Reference: the Caterpillar 777F dimension table (the maker's spec sheet,
   as reproduced by RitchieSpecs in feet; converted here), and the tyre
   maker's data for 27.00R49.
     overall length          34.56 ft  10.53 m   bumper to body tail
     wheelbase               14.96 ft   4.56 m
     rear axle to tail       10.04 ft   3.06 m
     overall canopy width    19.84 ft   6.05 m
     operating width         21.30 ft   6.49 m   over the mirrors
     front canopy height     16.96 ft   5.17 m
     top of ROPS (cab roof)  15.46 ft   4.71 m
     loading height, empty   14.37 ft   4.38 m   top of the side rail
     outside body width      18.12 ft   5.52 m
     inside body length      21.58 ft   6.58 m
     inside body depth, max   6.21 ft   1.89 m
     overall body length     32.25 ft   9.83 m   tail to canopy lip
     front tyre centreline   13.28 ft   4.05 m
     rear dual centreline    11.73 ft   3.58 m   pair centre to pair centre
     overall tyre width      17.13 ft   5.22 m   over the outer duals
     engine guard clearance   2.83 ft   0.86 m
     rear axle clearance      2.88 ft   0.88 m
     27.00R49 E4 tyre: 2.70 m outside diameter, 0.74 m section, on a
     49 in (1.245 m) rim.
   So L 10.53, W 6.05 over the canopy, H 5.17 at the canopy lip: W/L 0.57
   and H/L 0.49.  The old box model was W/L 0.36 on 1.9 m tyres, which is
   why it read as a lorry.

   What makes a 777 read as a 777 from above, and is therefore built here:
   the upper deck across the front with the ROPS cab on the LEFT and the air
   cleaners on the right; the radiator grille at the front centre with the
   diagonal stairway crossing it; the dump body whose canopy runs forward
   over the cab; flared, ribbed side boards; the body hinged on pins behind
   the rear axle and lifted by two hoist cylinders; two single front tyres
   and four rear duals; the exhaust piped up the body front wall to heat
   the body; a heaped load.

   Draw calls.  About thirteen of these are on screen in a typical match
   and render3d.js gives every mesh a shadow pass as well, so the old
   model's 76 meshes cost about 2,000 draws a frame for one unit type.
   Everything that does not move is therefore BAKED: one merged geometry
   per material, each part keeping its own flat or smooth normals, so the
   lighting is exactly what separate meshes would get.  Only the six wheels
   stay separate, because they turn: 18 meshes, about 470 draws.

   Wheels: each tyre is a Group named "roadwheel" with the axle on its
   local Y, which is what render3d.js spins (rotation.y at road speed).
   The chevron lugs are what make that turn visible: a smooth tyre rotating
   about its own axis shows nothing.

   Model space: +X nose, +Y left (port), +Z up, real metres, tyres on z = 0.
   render3d.js stands it up and rescales by the MEASURED X extent, so only
   the proportions survive; nothing here sticks out along X past the bumper
   or the body tail.
   Colours are authored in sRGB and left to prepModel() to linearise, as
   the rest of units3d.js does; no material sets _srgbDone.
   ASCII only: a stray byte inside a hex literal has broken this before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroOreHauler = (function () {
  "use strict";

  /* ------------------------------------------------------------ geometry */
  var X_BUMP = 5.27;          /* bumper face                                 */
  var X_TAIL = -5.26;         /* body tail lip: 10.53 m overall             */
  var XF = 2.36;              /* front axle                                  */
  var XR = -2.20;             /* rear axle: 4.56 m wheelbase, 3.06 m to tail */
  var TR = 1.35;              /* 27.00R49: 2.70 m outside diameter           */
  var TW = 0.74;              /* section width                               */
  var LUG = 0.07;             /* E4 rock tread depth                         */
  var YF = 2.025;             /* front tyres: 4.05 m centreline              */
  /* rear duals: pair centres 3.575 m apart, 5.22 m over the outer walls,
     so the outer tyre sits at 2.61 - 0.37 and the inner one mirrors it
     about the pair centre (1.79) */
  var YRO = 2.24, YRI = 1.335;
  var DECK = 2.95;            /* upper deck walking surface                  */
  var RAIL = 4.40;            /* body side rail: loading height 4.38 m       */
  var X_WALL = 1.45;          /* body front wall; 6.58 m inside length ahead
                                 of the tail                                  */
  var X_CAN = 4.57;           /* canopy lip: 9.83 m overall body length      */
  var CAN_HW = 3.02;          /* 6.05 m over the canopy                      */
  var Z_CAN0 = 4.98;          /* canopy top at the front wall                */
  var Z_CAN1 = 5.10;          /* canopy top at the lip; its rail makes 5.17  */
  var BW_O = 2.62;            /* side wall outer face                        */
  var BW_I = 2.52;            /* side wall inner face                        */
  var FLARE = 2.76;           /* flared top: 5.52 m outside body width       */
  /* body underside, front wall to tail.  The dual-slope floor dips to its
     deepest just ahead of the rear tyres (1.89 m below the rail) and climbs
     over them to the tail; every point clears a 1.35 m tyre by 0.2 m or
     more, which is what a body on a real truck has to do at full bump. */
  var BP = [[1.45, 3.05], [0.45, 2.45], [-0.45, 2.45], [-1.20, 2.90],
            [-3.40, 3.02], [X_TAIL, 3.50]];

  function bpz(x) {
    for (var i = 0; i < BP.length - 1; i++) {
      var a = BP[i], b = BP[i + 1];
      if (x <= a[0] && x >= b[0]) return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
    }
    return x > BP[0][0] ? BP[0][1] : BP[BP.length - 1][1];
  }

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ SKIN tex */
  /* One canvas, built once per page and shared by every team's copy.  The
     baked skin mesh is mapped by WORLD position (see Baker.flush), 6.5 m to
     the canvas, so a rail and a body side carry the paint at the same scale
     instead of each box face stretching the whole canvas.  On the vertical
     faces v is height, so the bottom band of the canvas is where the haul
     road dust lives, and it lands on the lower metre and a bit of every
     side.  Top faces are mapped into the upper, cleaner part.
     Base: worn mining yellow, a tenth brighter than the old #a5822c so the
     truck separates from desert terrain without turning into a sign. */
  var _skinCv = null, _oreCv = null;
  function skinCanvas() {
    if (_skinCv) return _skinCv;
    var R = rng(77701), W = 512, H = 512, i, x, y, w;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var q = cv.getContext("2d");
    q.fillStyle = "#b68e2e"; q.fillRect(0, 0, W, H);
    /* faded and dusted patches */
    for (i = 0; i < 34; i++) {
      q.fillStyle = R() < 0.5 ? "rgba(236,214,160,0.07)" : "rgba(60,44,14,0.07)";
      q.fillRect(R() * W, R() * H, 40 + R() * 150, 30 + R() * 110);
    }
    /* scrapes where the shovel teeth and rock have taken the paint off */
    q.fillStyle = "rgba(40,34,26,0.22)";
    for (i = 0; i < 40; i++) q.fillRect(R() * W, R() * H * 0.8, 10 + R() * 60, 1 + R() * 3);
    /* rust runs down from welds and bolt heads */
    for (i = 0; i < 30; i++) {
      x = R() * W; y = R() * H * 0.7; w = 2 + R() * 4;
      q.fillStyle = "rgba(110,58,20," + (0.10 + R() * 0.16).toFixed(3) + ")";
      q.fillRect(x, y, w, 30 + R() * 120);
    }
    q.fillStyle = "rgba(70,40,14,0.28)";
    for (i = 0; i < 60; i++) q.fillRect(R() * (W - 4), R() * (H - 4), 3, 3);
    /* haul-road dust: the bottom 22% of the canvas is the lowest 1.4 m */
    var gr = q.createLinearGradient(0, H * 0.78, 0, H);
    gr.addColorStop(0, "rgba(120,96,66,0.00)");
    gr.addColorStop(1, "rgba(120,96,66,0.55)");
    q.fillStyle = gr; q.fillRect(0, H * 0.78, W, H * 0.22);
    for (i = 0; i < 70; i++) {
      q.fillStyle = "rgba(96,76,52," + (0.12 + R() * 0.2).toFixed(3) + ")";
      q.fillRect(R() * W, H * 0.8 + R() * H * 0.2, 6 + R() * 30, 3 + R() * 10);
    }
    _skinCv = cv;
    return cv;
  }

  /* The load.  Dark broken rock with the gold-bearing glints the old model
     used, so the heap still reads as the game's ore field. */
  function oreCanvas() {
    if (_oreCv) return _oreCv;
    var R = rng(4410233), i, x, y, r, v;
    var cv = document.createElement("canvas"); cv.width = 256; cv.height = 256;
    var q = cv.getContext("2d");
    q.fillStyle = "#2a241a"; q.fillRect(0, 0, 256, 256);
    for (i = 0; i < 420; i++) {
      v = 26 + Math.floor(R() * 56);
      q.fillStyle = "rgba(" + v + "," + Math.floor(v * 0.9) + "," + Math.floor(v * 0.72) + ",0.8)";
      q.fillRect(R() * 252, R() * 252, 2 + R() * 6, 2 + R() * 5);
    }
    for (i = 0; i < 50; i++) {
      x = 8 + R() * 240; y = 8 + R() * 240; r = 2 + R() * 5;
      var g = q.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,208,60,0.95)");
      g.addColorStop(0.6, "rgba(210,150,30,0.55)");
      g.addColorStop(1, "rgba(120,80,10,0)");
      q.fillStyle = g;
      q.beginPath(); q.arc(x, y, r, 0, Math.PI * 2); q.fill();
    }
    _oreCv = cv;
    return cv;
  }

  function canvasTex(THREE, cv) {
    try {
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      /* r148: encoding is the switch that works; colorSpace does nothing */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      return t;
    } catch (e) { return null; }
  }

  /* ---------------------------------------------------------- materials */
  /* Eight, the ceiling for this key.  SKIN (painted steel: body, frame,
     deck, cab, rims), METAL (steel: rods, pins, lamp bezels), DARK (grille
     mesh, exhaust, grating, mirrors, the keyline round the canopy team
     panel), RUBBER (tyres, flaps, hub nuts),
     GLASS, TEAM, LAMP (tail lights) and ORE. */
  function makeMats(THREE, C) {
    var T = {};
    var st = canvasTex(THREE, skinCanvas());
    T.skin = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08 });
    if (st) T.skin.map = st; else T.skin.color.setHex(0xa8852c);
    T.skin.userData.worldUV = 6.5;
    T.skin.userData.uvBand = true;
    T.steel = new THREE.MeshStandardMaterial({ color: 0x9b9d9f, roughness: 0.36, metalness: 0.62 });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x262724, roughness: 0.78, metalness: 0.22 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x191918, roughness: 0.95, metalness: 0.02 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1a2830, roughness: 0.12, metalness: 0.35 });
    /* team flash: exactly the owner's colour, as the old harvester had it */
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0,
                                              roughness: 0.55, metalness: 0.18 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xc41a10, roughness: 0.35, metalness: 0.1,
                                              emissive: 0x5a0a04, emissiveIntensity: 0.8 });
    var ot = canvasTex(THREE, oreCanvas());
    /* flat shaded: averaged normals turn a rock heap into a soft pudding */
    T.ore = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.72, metalness: 0.22,
                                             flatShading: true });
    if (ot) T.ore.map = ot; else T.ore.color.setHex(0x3a3222);
    T.ore.userData.worldUV = 3.0;
    return T;
  }

  /* --------------------------------------------------------- triangles */
  /* A flat triangle soup with normals.  tri() orients every face so that it
     faces AWAY from a hint point: for a convex part that is its own middle,
     which removes any doubt about winding.  Across the roster 447 of 832
     keys carry at least one FrontSide mesh wound inside-out, most of them
     lofts; nothing here is lofted. */
  function Soup() { this.p = []; this.n = []; }
  Soup.prototype.tri = function (a, b, c, away) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (l < 1e-9) return;
    nx /= l; ny /= l; nz /= l;
    var cx = (a[0] + b[0] + c[0]) / 3 - away[0];
    var cy = (a[1] + b[1] + c[1]) / 3 - away[1];
    var cz = (a[2] + b[2] + c[2]) / 3 - away[2];
    if (nx * cx + ny * cy + nz * cz < 0) { var t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
  };
  Soup.prototype.quad = function (a, b, c, d, away) { this.tri(a, b, c, away); this.tri(a, c, d, away); };
  /* smooth-normal triangle: winding follows the supplied normals */
  Soup.prototype.triN = function (a, b, c, na, nb, nc) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * nx + ny * ny + nz * nz < 1e-18) return;
    if (nx * (na[0] + nb[0] + nc[0]) + ny * (na[1] + nb[1] + nc[1]) + nz * (na[2] + nb[2] + nc[2]) < 0) {
      var t = b; b = c; c = t; t = nb; nb = nc; nc = t;
    }
    this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    this.n.push(na[0], na[1], na[2], nb[0], nb[1], nb[2], nc[0], nc[1], nc[2]);
  };
  Soup.prototype.geo = function (THREE) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(new Array(this.p.length / 3 * 2).fill(0), 2));
    return g;
  };

  /* A surface of revolution about Y, the wheel axle.  prof is [r, y] pairs;
     each profile span is its own band with its own normal, so a shoulder
     stays a crisp edge while the band stays smooth around the wheel.  The
     outward side of a span walked from p0 to p1 is (dy, -dr). */
  function lathe(S, prof, seg) {
    for (var i = 0; i < prof.length - 1; i++) {
      var r0 = prof[i][0], y0 = prof[i][1], r1 = prof[i + 1][0], y1 = prof[i + 1][1];
      var dr = r1 - r0, dy = y1 - y0, l = Math.sqrt(dr * dr + dy * dy);
      var nr = dy / l, ny = -dr / l;
      for (var j = 0; j < seg; j++) {
        var a0 = j / seg * Math.PI * 2, a1 = (j + 1) / seg * Math.PI * 2;
        var c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
        var A = [r0 * c0, y0, r0 * s0], B = [r0 * c1, y0, r0 * s1];
        var Cc = [r1 * c1, y1, r1 * s1], D = [r1 * c0, y1, r1 * s0];
        var nA = [nr * c0, ny, nr * s0], nB = [nr * c1, ny, nr * s1];
        if (r0 > 1e-6) S.triN(A, B, Cc, nA, nB, nB);
        if (r1 > 1e-6) S.triN(A, Cc, D, nA, nB, nA);
      }
    }
  }

  /* flat disc closing a tyre's bead hole, facing +/-y */
  function disc(S, r, y, seg) {
    var n = [0, y > 0 ? 1 : -1, 0];
    for (var j = 0; j < seg; j++) {
      var a0 = j / seg * Math.PI * 2, a1 = (j + 1) / seg * Math.PI * 2;
      S.triN([0, y, 0], [r * Math.cos(a0), y, r * Math.sin(a0)], [r * Math.cos(a1), y, r * Math.sin(a1)], n, n, n);
    }
  }

  /* ----------------------------------------------------------- the tyre */
  /* 27.00R49 E4.  The carcass is a five-span lathe: bead, bulging sidewall,
     shoulder, crown, and back.  The tread is fourteen lugs a side, each a
     slanted block running from the centreline out over the shoulder, the
     two halves meeting in a V: the deep chevron of a rock-service tyre.
     The shoulder end of each lug drops down the sidewall, so the lugs
     notch the tyre's silhouette in a side view and the wheel is seen to
     turn. */
  var TYRE_SEG = 16, LUGS = 14;
  function tyreSoup(nuts, capOut) {
    var S = new Soup();
    var rc = TR - LUG, h = TW / 2;
    lathe(S, [[0.64, -h + 0.04], [1.10, -h], [rc, -h + 0.07], [rc, h - 0.07],
              [1.10, h], [0.64, h - 0.04]], TYRE_SEG);
    /* the lugs */
    var pitch = Math.PI * 2 / LUGS, w = pitch * 0.56, K = 0.5;
    /* the two halves meet ON the centreline with identical inner ends, so
       each V closes into one solid; with a gap between them, a look
       between the near lugs went straight into the open end of a far one */
    var yin = 0, yout = h - 0.005;
    function P(r, a, y) { return [r * Math.cos(a), y, r * Math.sin(a)]; }
    for (var side = -1; side <= 1; side += 2) {
      for (var k = 0; k < LUGS; k++) {
        /* lug 0 is centred straight down, so the tyre stands on a lug */
        var c = -Math.PI / 2 + k * pitch;
        var fi = K * yin, fo = K * yout;
        var Ti0 = P(TR, c + fi - w / 2, side * yin), Ti1 = P(TR, c + fi + w / 2, side * yin);
        var To0 = P(TR - 0.015, c + fo - w / 2, side * yout), To1 = P(TR - 0.015, c + fo + w / 2, side * yout);
        /* the inner foot goes 35 mm under the crown: a 16-sided crown's
           flats sag 25 mm inside its circle, and a lug stood on the circle
           left a slot under itself that you could see into */
        var Bi0 = P(rc - 0.035, c + fi - w / 2, side * yin), Bi1 = P(rc - 0.035, c + fi + w / 2, side * yin);
        /* the outer end's foot is sunk inside the shoulder, so the lug's
           open underside is never seen past the sidewall */
        var Bo0 = P(1.12, c + fo - w / 2, side * (h - 0.04)), Bo1 = P(1.12, c + fo + w / 2, side * (h - 0.04));
        var mid = P((TR + rc) / 2 - 0.02, c + (fi + fo) / 2, side * (yin + yout) / 2);
        S.quad(Ti0, Ti1, To1, To0, mid);
        S.quad(Ti1, To1, Bo1, Bi1, mid);
        S.quad(Ti0, To0, Bo0, Bi0, mid);
        S.quad(To0, To1, Bo1, Bo0, mid);
      }
    }
    /* the inboard face of every tyre is closed: through the bead hole you
       would otherwise look straight into the culled back of the carcass */
    disc(S, 0.64, -h + 0.04, TYRE_SEG);
    if (capOut) disc(S, 0.64, h - 0.04, TYRE_SEG);
    /* wheel nuts on the rim face, dark against the yellow rim: with the
       lugs, the thing that shows the wheel turning when it is side-on */
    if (nuts) {
      for (var n = 0; n < 6; n++) {
        var a = n / 6 * Math.PI * 2, cx = 0.42 * Math.cos(a), cz = 0.42 * Math.sin(a);
        var y0 = 0.17, y1 = 0.24, e = 0.04;
        var ctr = [cx, 0.15, cz];
        var q = [[cx - e, y1, cz - e], [cx + e, y1, cz - e], [cx + e, y1, cz + e], [cx - e, y1, cz + e]];
        var b = [[cx - e, y0, cz - e], [cx + e, y0, cz - e], [cx + e, y0, cz + e], [cx - e, y0, cz + e]];
        S.quad(q[0], q[1], q[2], q[3], ctr);
        for (var m = 0; m < 4; m++) S.quad(q[m], q[(m + 1) % 4], b[(m + 1) % 4], b[m], [cx, 0.22, cz]);
      }
    }
    return S;
  }

  /* 49 in rim, dished, with the hub boss standing proud, painted like the
     rest of the truck */
  function rimSoup() {
    var S = new Soup(), h = TW / 2;
    lathe(S, [[0.64, h - 0.04], [0.61, h - 0.01], [0.58, 0.19], [0.34, 0.17],
              [0.25, 0.31], [0.0, 0.34]], TYRE_SEG);
    return S;
  }
  /* The rim wears the skin material but is not baked, so it gets its own
     UVs: planar across its face, into the clean middle of the canvas.  Left
     at (0, 0) every vertex sampled one texel of the dust band. */
  function rimUV(geo) {
    var P = geo.attributes.position.array, U = geo.attributes.uv.array;
    for (var i = 0; i < P.length / 3; i++) {
      U[i * 2] = 0.5 + P[i * 3] / 6.5;
      U[i * 2 + 1] = 0.55 + P[i * 3 + 2] / 6.5;
    }
    geo.attributes.uv.needsUpdate = true;
    return geo;
  }

  /* mirror a soup across y = 0 for the starboard wheels, keeping the faces
     outward: a mirror flips winding, so two corners swap */
  function mirrorY(THREE, geo) {
    var g = geo.clone();
    var p = g.attributes.position.array, n = g.attributes.normal.array, i, k, t;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; n[i + 1] = -n[i + 1]; }
    for (i = 0; i < p.length; i += 9) {
      for (k = 0; k < 3; k++) {
        t = p[i + 3 + k]; p[i + 3 + k] = p[i + 6 + k]; p[i + 6 + k] = t;
        t = n[i + 3 + k]; n[i + 3 + k] = n[i + 6 + k]; n[i + 6 + k] = t;
      }
    }
    g.attributes.position.needsUpdate = true; g.attributes.normal.needsUpdate = true;
    return g;
  }

  /* ------------------------------------------------------------- baker */
  /* Collects positioned geometry per material and emits ONE mesh per
     material.  Parts are converted to plain triangle lists first, so a
     box keeps its hard edges and a cylinder its smooth sides. */
  function Baker(THREE) { this.T = THREE; this.by = []; }
  Baker.prototype.add = function (mat, geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    for (var i = 0; i < this.by.length; i++) if (this.by[i].mat === mat) { this.by[i].g.push(g); return; }
    this.by.push({ mat: mat, g: [g] });
  };
  Baker.prototype.put = function (mat, geo, x, y, z, rx, ry, rz) {
    var THREE = this.T, m = new THREE.Matrix4();
    m.compose(new THREE.Vector3(x, y, z),
              new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)),
              new THREE.Vector3(1, 1, 1));
    geo.applyMatrix4(m);
    this.add(mat, geo);
  };
  Baker.prototype.box = function (mat, sx, sy, sz, x, y, z, rx, ry, rz) {
    this.put(mat, new this.T.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  };
  /* box from its min/max corners, unrotated */
  Baker.prototype.bb = function (mat, x0, x1, y0, y1, z0, z1) {
    /* callers mirror with s * y, so the corners may arrive swapped */
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    this.box(mat, x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  /* a thin bar (rail, post, rung) from its corners, leaving off the end
     faces across its long axis that are BURIED: "lo", "hi" or "both".
     An open end that can be seen is a hole, so only buried ends go. */
  Baker.prototype.bar = function (mat, x0, x1, y0, y1, z0, z1, drop) {
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    var sx = x1 - x0, sy = y1 - y0, sz = z1 - z0;
    var ax = sx >= sy && sx >= sz ? 0 : (sy >= sz ? 1 : 2);
    var g = new this.T.BoxGeometry(sx, sy, sz).toNonIndexed();
    /* BoxGeometry lays its faces out +x, -x, +y, -y, +z, -z, six vertices each */
    var k, i, P = g.attributes.position.array, N = g.attributes.normal.array, U = g.attributes.uv.array;
    var pp = [], nn = [], uu = [];
    for (k = 0; k < 6; k++) {
      if ((k >> 1) === ax && (drop === "both" || (drop === "hi" && !(k & 1)) || (drop === "lo" && (k & 1)))) continue;
      for (i = k * 6; i < k * 6 + 6; i++) {
        pp.push(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]);
        nn.push(N[i * 3], N[i * 3 + 1], N[i * 3 + 2]);
        uu.push(U[i * 2], U[i * 2 + 1]);
      }
    }
    var b = new this.T.BufferGeometry();
    b.setAttribute("position", new this.T.Float32BufferAttribute(pp, 3));
    b.setAttribute("normal", new this.T.Float32BufferAttribute(nn, 3));
    b.setAttribute("uv", new this.T.Float32BufferAttribute(uu, 2));
    b.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    this.add(mat, b);
  };
  /* cylinder along a world axis */
  Baker.prototype.cyl = function (mat, r, len, seg, x, y, z, axis, r2) {
    var g = new this.T.CylinderGeometry(r2 === undefined ? r : r2, r, len, seg);
    if (axis === "x") this.put(mat, g, x, y, z, 0, 0, -Math.PI / 2);
    else if (axis === "z") this.put(mat, g, x, y, z, Math.PI / 2, 0, 0);
    else this.put(mat, g, x, y, z);
  };
  /* cylinder from point a to point b */
  Baker.prototype.rod = function (mat, r, a, b, seg) {
    var THREE = this.T;
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(); d.normalize();
    var g = new THREE.CylinderGeometry(r, r, len, seg || 8);
    var m = new THREE.Matrix4().compose(
      new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d),
      new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    this.add(mat, g);
  };
  /* a plate lying along the segment (x0,z0)-(x1,z1) in the XZ plane, its
     lower face ON the segment, spanning y0..y1 */
  Baker.prototype.strip = function (mat, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, len = Math.sqrt(dx * dx + dz * dz);
    var ang = Math.atan2(-dz, dx);
    /* the upward perpendicular of a segment walked in -x is (dz, -dx)/len
       flipped to point up */
    var px = -dz / len, pz = dx / len;
    if (pz < 0) { px = -px; pz = -pz; }
    this.box(mat, len, y1 - y0, th, (x0 + x1) / 2 + px * th / 2, (y0 + y1) / 2, (z0 + z1) / 2 + pz * th / 2, 0, ang, 0);
  };
  Baker.prototype.flush = function (group) {
    var THREE = this.T;
    for (var i = 0; i < this.by.length; i++) {
      var e = this.by[i], n = 0, j, k;
      for (j = 0; j < e.g.length; j++) n += e.g[j].attributes.position.count;
      var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
      for (j = 0; j < e.g.length; j++) {
        var g = e.g[j], c = g.attributes.position.count;
        P.set(g.attributes.position.array, o * 3);
        if (g.attributes.normal) N.set(g.attributes.normal.array, o * 3);
        if (g.attributes.uv) U.set(g.attributes.uv.array, o * 2);
        o += c;
      }
      var S = e.mat.userData && e.mat.userData.worldUV;
      if (S) worldUV(P, U, S, e.mat.userData.uvBand);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      geo.computeBoundingSphere();
      var mesh = new THREE.Mesh(geo, e.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.by = [];
  };

  /* Box projection by each triangle's own facing.  Sides take (along,
     height) so the dust band on the canvas lands at the bottom of the
     truck; with `band` set (the paint), top faces take the cleaner part of
     the canvas above it, otherwise (the ore) a plain plan projection. */
  function worldUV(P, U, S, band) {
    for (var t = 0; t < P.length / 9; t++) {
      var o = t * 9;
      var ux = P[o + 3] - P[o], uy = P[o + 4] - P[o + 1], uz = P[o + 5] - P[o + 2];
      var vx = P[o + 6] - P[o], vy = P[o + 7] - P[o + 1], vz = P[o + 8] - P[o + 2];
      var nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
      for (var k = 0; k < 3; k++) {
        var x = P[o + k * 3], y = P[o + k * 3 + 1], z = P[o + k * 3 + 2], u, v;
        if (nz >= nx && nz >= ny) { u = x / S; v = band ? 0.36 + 0.58 * Math.min(1, Math.max(0, y / S + 0.5)) : y / S; }
        else if (nx >= ny) { u = y / S + 0.5; v = z / S; }
        else { u = x / S; v = z / S; }
        U[t * 6 + k * 2] = u; U[t * 6 + k * 2 + 1] = v;
      }
    }
  }

  /* ------------------------------------------------------------ the load */
  /* ONE mesh: a displaced grid over the inside of the body.  The SAE 2:1
     heap on a 5.2 m wide body stands about 1.3 m above the rail; this one
     peaks a little under that, centred just ahead of the rear axle, where
     the load has to sit for the loaded axle split, and falls away to the
     tail lip, which is lower than the rail.  Lumps and a few boulders sit
     in it.  Its edges stay below the rail and inside the walls, so nothing
     pokes through. */
  function heapGeo(THREE) {
    var R = rng(9091), S = new Soup(), i, j;
    var NX = 16, NY = 10, x0 = -4.85, x1 = 1.36, yw = 2.48;
    var lumps = [];
    for (i = 0; i < 11; i++) lumps.push([x0 + 0.8 + R() * (x1 - x0 - 1.6), (R() - 0.5) * 3.4,
                                         0.35 + R() * 0.45, 0.10 + R() * 0.2]);
    function cap(t) { var q = 1 - t * t; return q > 0 ? Math.pow(q, 0.75) : 0; }
    function edge(x) {
      if (x > 1.0) return 4.18 + 0.17 * (x - 1.0) / 0.36;
      if (x < -3.9) return 4.18 - 0.56 * (-3.9 - x) / 0.95;
      return 4.18;
    }
    function hz(x, y) {
      var z = edge(x) + 1.0 * cap((x + 1.75) / 3.35) * cap(y / 2.55);
      for (var k = 0; k < lumps.length; k++) {
        var L = lumps[k], dx = x - L[0], dy = y - L[1];
        z += L[3] * Math.exp(-(dx * dx + dy * dy) / (L[2] * L[2]));
      }
      return z;
    }
    var V = [];
    for (i = 0; i <= NX; i++) {
      V.push([]);
      for (j = 0; j <= NY; j++) {
        var x = x0 + (x1 - x0) * i / NX, y = -yw + 2 * yw * j / NY;
        var fade = Math.min(1, Math.min(i, NX - i, j, NY - j) / 1.5);
        var jx = (R() - 0.5) * 0.22 * fade, jy = (R() - 0.5) * 0.22 * fade;
        x += jx; y += jy;
        var z = hz(x, y) + (R() - 0.5) * 0.12 * fade;
        if (fade === 0) z = Math.min(z, edge(x) + 0.05);
        V[i].push([x, y, z]);
      }
    }
    for (i = 0; i < NX; i++) for (j = 0; j < NY; j++) {
      var a = V[i][j], b = V[i + 1][j], c = V[i + 1][j + 1], d = V[i][j + 1];
      /* alternate the diagonal so the facets do not all lean one way */
      var below = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, -10];
      if ((i + j) & 1) { S.tri(a, b, c, below); S.tri(a, c, d, below); }
      else { S.tri(a, b, d, below); S.tri(b, c, d, below); }
    }
    var geo = S.geo(THREE), out = [geo];
    /* boulders: a shovel load is not graded */
    for (i = 0; i < 6; i++) {
      var bx = -3.9 + R() * 4.6, by = (R() - 0.5) * 3.2, br = 0.22 + R() * 0.2;
      var ig = new THREE.IcosahedronGeometry(br, 0);
      var m = new THREE.Matrix4().compose(
        new THREE.Vector3(bx, by, hz(bx, by) + br * 0.25),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(R() * 3, R() * 3, R() * 3)),
        new THREE.Vector3(1.0, 0.85, 0.62));
      ig.applyMatrix4(m);
      out.push(ig.index ? ig.toNonIndexed() : ig);
    }
    return out;
  }

  /* ------------------------------------------------------------ the body */
  function buildBody(THREE, K, T) {
    var s, i;
    /* side walls: extruded from the side outline (rail, the rise to the
       canopy at the front, the dual-slope underside, the raked tail) */
    var shp = new THREE.Shape();
    var out = [[-4.95, RAIL], [0.95, RAIL], [X_WALL, Z_CAN0 + 0.02]];
    for (i = 0; i < BP.length; i++) out.push(BP[i]);
    shp.moveTo(out[0][0], out[0][1]);
    for (i = 1; i < out.length; i++) shp.lineTo(out[i][0], out[i][1]);
    shp.closePath();
    for (s = -1; s <= 1; s += 2) {
      var g = new THREE.ExtrudeGeometry(shp, { depth: BW_O - BW_I, bevelEnabled: false });
      /* shape (x, y) -> model (x, z); the extrusion runs to -y */
      g.rotateX(Math.PI / 2);
      g.translate(0, s > 0 ? BW_O : -BW_I, 0);
      K.add(T.skin, g);
      /* the flared top board, and the rail tube along it */
      K.box(T.skin, 5.9, 0.06, 0.36, -2.0, s * (BW_O + 0.07), RAIL - 0.22, -s * 0.46, 0, 0);
      K.box(T.skin, 5.9, 0.12, 0.12, -2.0, s * (FLARE - 0.04), RAIL - 0.06);
      /* vertical ribs down the outside of the side, as on the maker's
         body: they carry the rail and they are what a body side looks like */
      var RX = [-4.35, -3.25, -2.15, -1.05, 0.05];
      for (i = 0; i < RX.length; i++) {
        var zb = bpz(RX[i]) + 0.02, zt = RAIL - 0.4;
        K.box(T.skin, 0.18, 0.16, zt - zb, RX[i], s * (BW_O + 0.07), (zb + zt) / 2);
      }
      /* the rib that runs up the front corner into the canopy */
      K.rod(T.skin, 0.07, [0.72, s * (BW_O + 0.05), 3.0], [1.25, s * (BW_O + 0.05), Z_CAN0 - 0.05], 6);
      /* rock ejector hanging between the rear duals */
      K.bar(T.skin, XR - 0.04, XR + 0.04, s * 1.79 - 0.03, s * 1.79 + 0.03, 1.95, bpz(XR) + 0.05, "hi");
    }
    /* floor, following the underside profile */
    for (i = 0; i < BP.length - 1; i++)
      K.strip(T.skin, BP[i][0], BP[i][1], BP[i + 1][0], BP[i + 1][1], -BW_I, BW_I, 0.14);
    /* cross-members under the floor */
    var CX = [0.9, -0.05, -1.7, -2.8, -4.1];
    for (i = 0; i < CX.length; i++) {
      var z0 = bpz(CX[i]);
      K.box(T.skin, 0.16, 2 * BW_I, 0.2, CX[i], 0, z0 - 0.08);
    }
    /* front wall, in courses: the team band is a course of it, so it is
       flush on both faces and seen over the load from behind and under
       the canopy from ahead */
    K.bb(T.skin, X_WALL - 0.06, X_WALL + 0.06, -BW_O, BW_O, BP[0][1], 4.60);
    K.bb(T.team, X_WALL - 0.06, X_WALL + 0.06, -2.2, 2.2, 4.60, 4.92);
    K.bb(T.skin, X_WALL - 0.06, X_WALL + 0.06, 2.2, BW_O, 4.60, 4.92);
    K.bb(T.skin, X_WALL - 0.06, X_WALL + 0.06, -BW_O, -2.2, 4.60, 4.92);
    K.bb(T.skin, X_WALL - 0.06, X_WALL + 0.06, -BW_O, BW_O, 4.92, Z_CAN0);
    /* the canopy: forward over the cab and the whole deck, rising slightly
       to 5.10 m at the lip; the rail on it makes the 5.17 m of the table */
    var clen = X_CAN - X_WALL, cang = Math.atan2(-(Z_CAN1 - Z_CAN0), clen);
    var cmx = (X_WALL + X_CAN) / 2, cmz = (Z_CAN0 + Z_CAN1) / 2;
    /* The plate is one 5 x 5 grid of cells, so the team panel and a dark
       keyline round it ARE cells of the plate, flush, rather than sheets
       stacked on a sheet that z-fight at map zoom.  Every cell shares its
       corners with its neighbours: a T-junction on a flat roof sparkles.
       The keyline is for the yellow and grey players.  PLA's #e0a33c on
       this paint is about 1.5:1 and the panel vanished at game size; the
       dark ring outlines it whatever the colour.  0.12 m is about one
       screen pixel at the default camera (fov 40, dist 430, scale 2.44),
       the least that still shows.  The top is 50 triangles, the underside
       one quad; the lip edge is buried in the lip, so it is not drawn.
       The tail edge is: the canopy is 0.4 m wider than the front wall a
       side, and from behind at game pitch those ends were open. */
    var PXB = [X_WALL, 3.43, 3.55, 4.35, 4.47, X_CAN];
    var PYB = [-CAN_HW, -2.62, -2.5, 2.5, 2.62, CAN_HW];
    function pz(x) { return Z_CAN0 + (Z_CAN1 - Z_CAN0) * (x - X_WALL) / clen; }
    var PS = { skin: new Soup(), dark: new Soup(), team: new Soup() }, pi, pj;
    for (pi = 0; pi < 5; pi++) for (pj = 0; pj < 5; pj++) {
      var ring = pi >= 1 && pi <= 3 && pj >= 1 && pj <= 3;
      var ps = pi === 2 && pj === 2 ? PS.team : (ring ? PS.dark : PS.skin);
      var xa = PXB[pi], xb = PXB[pi + 1], ya = PYB[pj], yb = PYB[pj + 1];
      ps.quad([xa, ya, pz(xa)], [xb, ya, pz(xb)], [xb, yb, pz(xb)], [xa, yb, pz(xa)],
              [(xa + xb) / 2, (ya + yb) / 2, pz((xa + xb) / 2) - 1]);
    }
    var pc = [cmx, 0, cmz - 0.05];
    PS.skin.quad([X_WALL, -CAN_HW, Z_CAN0 - 0.1], [X_CAN, -CAN_HW, Z_CAN1 - 0.1],
                 [X_CAN, CAN_HW, Z_CAN1 - 0.1], [X_WALL, CAN_HW, Z_CAN0 - 0.1], [cmx, 0, cmz + 1]);
    for (s = -1; s <= 1; s += 2)
      PS.skin.quad([X_WALL, s * CAN_HW, Z_CAN0], [X_CAN, s * CAN_HW, Z_CAN1],
                   [X_CAN, s * CAN_HW, Z_CAN1 - 0.1], [X_WALL, s * CAN_HW, Z_CAN0 - 0.1], pc);
    PS.skin.quad([X_WALL, -CAN_HW, Z_CAN0], [X_WALL, CAN_HW, Z_CAN0],
                 [X_WALL, CAN_HW, Z_CAN0 - 0.1], [X_WALL, -CAN_HW, Z_CAN0 - 0.1], pc);
    K.add(T.skin, PS.skin.geo(THREE));
    K.add(T.dark, PS.dark.geo(THREE));
    K.add(T.team, PS.team.geo(THREE));
    for (s = -1; s <= 1; s += 2) {
      /* side lip hanging under the edge, and the rail standing on it */
      K.box(T.skin, clen, 0.06, 0.24, cmx, s * (CAN_HW - 0.03), cmz - 0.17, 0, cang, 0);
      K.box(T.skin, clen, 0.09, 0.07, cmx, s * (CAN_HW - 0.05), cmz + 0.035, 0, cang, 0);
    }
    K.bb(T.skin, X_CAN - 0.08, X_CAN, -CAN_HW, CAN_HW, Z_CAN1 - 0.32, Z_CAN1);
    K.bb(T.skin, X_CAN - 0.1, X_CAN - 0.01, -CAN_HW, CAN_HW, Z_CAN1, Z_CAN1 + 0.07);
    /* gussets carrying the canopy off the front wall; the left one clears
       the cab roof */
    var GY = [-2.4, -0.2, 2.45];
    for (i = 0; i < GY.length; i++)
      K.rod(T.skin, 0.06, [X_WALL + 0.07, GY[i], 4.5], [X_WALL + 0.72, GY[i], Z_CAN0 - 0.04], 6);
    /* hinge brackets down to the pins at the frame's tail */
    for (s = -1; s <= 1; s += 2) {
      K.bb(T.skin, -3.56, -3.26, s * 0.53 - 0.1, s * 0.53 + 0.1, 2.02, bpz(-3.4) + 0.02);
      K.cyl(T.steel, 0.1, 0.5, 8, -3.41, s * 0.53, 2.1, "y");
    }
    /* team: the canopy panel and the front-wall band are laid as pieces of
       their plates (above); the plate on each body side, where a fleet
       number goes, stands 30 mm proud and is sunk behind: flush paint on
       a coplanar face z-fights at map zoom.  It fills the clear bay between
       the ribs at -1.05 and 0.05; one bay forward, the diagonal corner rib
       cut across its front edge. */
    for (s = -1; s <= 1; s += 2)
      K.bb(T.team, -0.86, -0.14, s * BW_O - 0.01, s * (BW_O + 0.03), 3.25, 3.95);
  }

  /* ------------------------------------------------------ front and deck */
  function buildFront(THREE, K, T) {
    var s, i;
    /* upper deck, full width over both front tyres */
    K.bb(T.skin, X_WALL + 0.06, 4.95, -2.95, 2.95, DECK - 0.12, DECK);
    /* toe plate along the deck front, broken where the stair lands */
    K.bb(T.skin, 4.91, 4.96, 0.2, 2.95, DECK - 0.4, DECK);
    K.bb(T.skin, 4.91, 4.96, -2.95, -0.7, DECK - 0.4, DECK);
    /* under the deck: the radiator housing behind the grille, yellow, then
       the engine itself, which a 777 leaves open to the side; a slab of
       paint here made the whole front end read as a block.  Both stay
       inside the front tyres' inner walls so the struts sit beside them. */
    K.bb(T.skin, 3.85, 4.70, -1.12, 1.12, 1.6, DECK - 0.12);
    K.bb(T.dark, X_WALL + 0.35, 3.85, -0.95, 0.95, 1.45, DECK - 0.2);
    K.bb(T.skin, X_WALL + 0.06, 3.85, -1.12, 1.12, DECK - 0.24, DECK - 0.12);
    /* grille: dark core in a yellow frame, horizontal guard bars */
    K.bb(T.dark, 4.70, 4.74, -1.02, 1.02, 1.70, 2.72);
    K.bb(T.skin, 4.70, 4.80, -1.12, 1.12, 2.72, DECK - 0.12);
    K.bb(T.skin, 4.70, 4.80, -1.12, 1.12, 1.58, 1.70);
    for (s = -1; s <= 1; s += 2) K.bb(T.skin, 4.70, 4.80, s * 1.02, s * 1.12, 1.70, 2.72);
    for (i = 0; i < 6; i++) K.bar(T.skin, 4.74, 4.78, -1.06, 1.06, 1.80 + i * 0.16, 1.84 + i * 0.16, "both");
    K.bar(T.skin, 4.74, 4.78, -0.03, 0.03, 1.66, 2.76, "both");
    /* bumper and the engine guard under the sump (0.86 m clearance) */
    K.bb(T.skin, 4.95, X_BUMP, -2.05, 2.05, 0.95, 1.65);
    K.bb(T.dark, 5.0, X_BUMP + 0.001, -1.7, -1.2, 1.2, 1.4);
    K.bb(T.dark, 5.0, X_BUMP + 0.001, 1.2, 1.7, 1.2, 1.4);
    K.bb(T.skin, 2.6, 4.9, -0.72, 0.72, 0.86, 0.96);
    /* headlights on the deck front, either side of the grille */
    for (s = -1; s <= 1; s += 2) {
      K.cyl(T.steel, 0.12, 0.08, 10, 4.96, s * 1.45, 2.66, "x");
      K.cyl(T.steel, 0.12, 0.08, 10, 4.96, s * 1.80, 2.66, "x");
    }
    /* the diagonal stairway across the grille: off the right end of the
       bumper, up to the deck just left of centre */
    var y0 = -1.95, z0 = 1.65, y1 = 0.02, z1 = DECK;
    var dy = y1 - y0, dz = z1 - z0, sl = Math.sqrt(dy * dy + dz * dz), sa = Math.atan2(dz, dy);
    var my = (y0 + y1) / 2, mz = (z0 + z1) / 2;
    K.box(T.skin, 0.05, sl, 0.2, 4.85, my, mz, sa, 0, 0);
    K.box(T.skin, 0.05, sl, 0.2, 5.22, my, mz, sa, 0, 0);
    for (i = 0; i < 5; i++) {
      var t = (i + 0.7) / 5.2;
      K.bb(T.dark, 4.87, 5.20, y0 + dy * t - 0.14, y0 + dy * t + 0.14, z0 + dz * t, z0 + dz * t + 0.04);
    }
    K.box(T.skin, 0.05, sl, 0.05, 5.22, my, mz + 0.9, sa, 0, 0);
    for (i = 0; i < 3; i++) {
      var tt = 0.08 + i * 0.42, py = y0 + dy * tt, pz = z0 + dz * tt;
      K.bar(T.skin, 5.20, 5.24, py - 0.025, py + 0.025, pz + 0.1, pz + 0.9, "both");
    }
    /* boarding ladder from the ground, just outboard of the bumper's
       right end, onto its top where the stair starts */
    K.bar(T.skin, 5.02, 5.06, -2.10, -2.06, 0.5, 1.65);
    K.bar(T.skin, 5.02, 5.06, -2.46, -2.42, 0.5, 1.65);
    for (i = 0; i < 3; i++) K.bar(T.dark, 5.02, 5.06, -2.44, -2.08, 0.62 + i * 0.34, 0.66 + i * 0.34, "both");
    /* handrails: the deck front (with the gap where the stair arrives)
       and both deck sides */
    var RH = [DECK + 1.0, DECK + 0.5];
    for (i = 0; i < 2; i++) {
      /* every rail ends inside a post, so its end faces can go; the posts
         stand to the top of the top rail (DECK + 1.025) so that is true of
         its upper 25 mm as well */
      K.bar(T.skin, 4.87, 4.92, 0.37, 2.93, RH[i] - 0.025, RH[i] + 0.025, "both");
      K.bar(T.skin, 4.87, 4.92, -2.93, -0.17, RH[i] - 0.025, RH[i] + 0.025, "both");
      for (s = -1; s <= 1; s += 2)
        K.bar(T.skin, X_WALL + 0.22, 4.90, s * 2.895, s * 2.945, RH[i] - 0.025, RH[i] + 0.025, "both");
    }
    var PY = [2.92, 1.6, 0.38, -0.18, -1.5, -2.92];
    for (i = 0; i < PY.length; i++) K.bar(T.skin, 4.87, 4.92, PY[i] - 0.025, PY[i] + 0.025, DECK, DECK + 1.025, "lo");
    for (s = -1; s <= 1; s += 2) {
      K.bar(T.skin, X_WALL + 0.2, X_WALL + 0.25, s * 2.92 - 0.025, s * 2.92 + 0.025, DECK, DECK + 1.025, "lo");
      K.bar(T.skin, 3.2, 3.25, s * 2.92 - 0.025, s * 2.92 + 0.025, DECK, DECK + 1.025, "lo");
      /* mirrors on arms off the front corners: the 6.49 m operating width.
         The arm runs out of the top side rail, so both its ends are buried,
         one in the rail and one in the mirror; hung 30 mm under the rail
         its inboard end was an open box you could see into. */
      K.bar(T.steel, 4.82, 4.86, s * 2.92, s * 3.08, DECK + 0.98, DECK + 1.02, "both");
      K.bb(T.dark, 4.80, 4.86, s * 3.06, s * 3.26, DECK + 0.62, DECK + 1.08);
    }
  }

  /* --------------------------------------------------------- cab, deck kit */
  function buildCab(THREE, K, T) {
    /* ROPS cab, offset LEFT, the door on its left side.  Large glass all
       round above a 0.6 m waist: it is an operator's cab, not a turret,
       and the old "slit windows" had no counterpart on any haul truck. */
    var x0 = 2.05, x1 = 3.82, y0 = 0.97, y1 = 2.78, zw = 3.55, zg = 4.52, zt = 4.62;
    /* built as the ROPS frame it is: a waist, four corner posts and a
       header, with the glass as the walls between them, set 20 mm in */
    K.bb(T.skin, x0, x1, y0, y1, DECK, zw);
    K.bb(T.skin, x0, x1, y0, y1, zg, zt);
    K.bb(T.skin, x0 - 0.05, x1 + 0.05, y0 - 0.05, y1 + 0.05, zt, 4.71);
    var cxs = [x0, x1 - 0.1], cys = [y0, y1 - 0.1], a, b;
    for (a = 0; a < 2; a++) for (b = 0; b < 2; b++)
      K.bar(T.skin, cxs[a], cxs[a] + 0.1, cys[b], cys[b] + 0.1, zw, zg, "both");
    K.bb(T.glass, x1 - 0.06, x1 - 0.02, y0 + 0.1, y1 - 0.1, zw, zg);
    K.bb(T.glass, x0 + 0.02, x0 + 0.06, y0 + 0.1, y1 - 0.1, zw, zg);
    K.bb(T.glass, x0 + 0.1, x1 - 0.1, y1 - 0.06, y1 - 0.02, zw, zg);
    K.bb(T.glass, x0 + 0.1, x1 - 0.1, y0 + 0.02, y0 + 0.06, zw, zg);
    /* door pillar and the grab rail beside the door */
    K.bar(T.skin, 2.9, 2.96, y1 - 0.08, y1, zw, zg, "both");
    K.bar(T.steel, 3.74, 3.78, y1 + 0.02, y1 + 0.06, 3.2, 4.2);
    /* team panel on the door, under its window */
    K.bb(T.team, 2.98, 3.72, y1 - 0.01, y1 + 0.04, 3.06, 3.46);

    /* air cleaners on the right half of the deck: two big canisters on a
       saddle, their precleaner caps forward, the intake plenum behind */
    K.bb(T.dark, 3.35, 4.55, -2.65, -1.2, DECK, DECK + 0.08);
    var s, AY = [-1.55, -2.28];
    for (s = 0; s < 2; s++) {
      K.cyl(T.skin, 0.3, 1.15, 12, 3.95, AY[s], 3.35, "x");
      K.cyl(T.dark, 0.22, 0.14, 10, 4.58, AY[s], 3.35, "x");
    }
    K.bb(T.skin, 3.05, 3.38, -2.5, -1.3, DECK, 3.5);
    /* exhaust: piped up the front wall of the body and into it, which is
       how the maker heats the body so wet ore does not freeze to it */
    for (s = -1; s <= 1; s += 2) {
      K.cyl(T.dark, 0.09, 1.25, 8, X_WALL + 0.16, s * 0.45, DECK + 0.62, "z");
      K.cyl(T.dark, 0.09, 0.14, 8, X_WALL + 0.1, s * 0.45, DECK + 1.25, "x");
    }
  }

  /* --------------------------------------------------- frame, axle, tanks */
  function buildChassis(THREE, K, T) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      var y = s * 0.53;
      /* the two main rails: level under the engine, kicked up over the
         rear axle to the hinge pins */
      K.bb(T.skin, -0.2, 4.95, y - 0.11, y + 0.11, 0.95, 1.62);
      K.box(T.skin, 1.2, 0.22, 0.66, -0.7, y, 1.58, 0, Math.atan2(0.6, 1.0), 0);
      K.bb(T.skin, -3.45, -1.15, y - 0.11, y + 0.11, 1.55, 2.2);
      /* front strut: yellow barrel, bright rod, spindle arm to the hub */
      K.cyl(T.skin, 0.17, 0.8, 10, XF, s * 1.38, 2.4, "z");
      K.cyl(T.steel, 0.1, 0.6, 8, XF, s * 1.38, 1.75, "z");
      K.bb(T.skin, XF - 0.2, XF + 0.2, s * 1.2, s * 1.66, 1.2, 1.5);
      /* hoist cylinder, frame to body, just ahead of the rear tyres */
      var a = [0.6, s * 0.85, 1.3], b = [-0.3, s * 0.85, 2.42];
      var m = [a[0] + (b[0] - a[0]) * 0.62, s * 0.85, a[2] + (b[2] - a[2]) * 0.62];
      K.rod(T.skin, 0.17, a, m, 10);
      K.rod(T.steel, 0.09, m, b, 8);
      /* rear suspension strut from the axle up to the frame */
      K.rod(T.skin, 0.12, [XR + 0.25, s * 0.8, 1.7], [XR + 0.55, s * 0.8, 2.18], 8);
      /* mud flap behind each front tyre, on an arm off the frame */
      K.bb(T.rub, 0.94, 0.97, s * (YF - 0.4), s * (YF + 0.4), 1.05, 2.5);
      K.bb(T.skin, 0.9, 1.0, s * 0.64, s * (YF - 0.4), 2.4, 2.5);
      /* tail lights on the rear crossmember under the body overhang */
      K.bb(T.lamp, -3.54, -3.5, s * 0.6, s * 0.84, 1.78, 1.94);
    }
    K.bb(T.skin, -3.5, -3.38, -0.9, 0.9, 1.6, 2.1);
    K.bb(T.skin, 4.3, 4.6, -0.64, 0.64, 1.0, 1.5);
    /* rear axle housing (0.88 m under it) with the differential bulge */
    K.bb(T.skin, XR - 0.4, XR + 0.4, -0.97, 0.97, 0.9, 1.72);
    K.cyl(T.skin, 0.42, 1.0, 12, XR, 0, 1.31, "x");
    /* fuel tank on the left, hydraulic tank on the right, between axles */
    K.bb(T.skin, -0.5, 0.88, 1.05, 2.0, 1.0, 2.12);
    K.cyl(T.dark, 0.1, 0.08, 8, 0.4, 1.7, 2.16, "z");
    K.bb(T.skin, -0.35, 0.75, -1.85, -1.05, 1.05, 2.3);
  }

  /* ------------------------------------------------------------ wheels */
  function buildWheels(THREE, g, T) {
    var tOut = tyreSoup(true, false).geo(THREE);
    var tIn = tyreSoup(false, true).geo(THREE);
    var rim = rimUV(rimSoup().geo(THREE));
    tOut.computeBoundingBox();
    /* seat the lowest lug exactly on z = 0: render3d.js lifts a model
       that dips below the ground but never lowers one that floats */
    var hub = -tOut.boundingBox.min.z;
    var G = {
      outL: tOut, outR: mirrorY(THREE, tOut), inL: tIn, inR: mirrorY(THREE, tIn),
      rimL: rim, rimR: mirrorY(THREE, rim)
    };
    function wheel(x, y, outer) {
      var w = new THREE.Group();
      w.name = "roadwheel";
      w.position.set(x, y, hub);
      var L = y > 0;
      w.add(new THREE.Mesh(outer ? (L ? G.outL : G.outR) : (L ? G.inL : G.inR), T.rub));
      if (outer) w.add(new THREE.Mesh(L ? G.rimL : G.rimR, T.skin));
      g.add(w);
    }
    for (var s = -1; s <= 1; s += 2) {
      wheel(XF, s * YF, true);
      wheel(XR, s * YRO, true);
      wheel(XR, s * YRI, false);
    }
  }

  /* =========================================================== ASSEMBLY  */
  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group();
    g.name = "ore_hauler";
    var K = new Baker(THREE);
    buildBody(THREE, K, T);
    buildFront(THREE, K, T);
    buildCab(THREE, K, T);
    buildChassis(THREE, K, T);
    var hg = heapGeo(THREE);
    for (var i = 0; i < hg.length; i++) K.add(T.ore, hg[i]);
    K.flush(g);
    buildWheels(THREE, g, T);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }

  return { build: build };
})();

/* Replaces the box truck in units3d.js.  len is the MEASURED x extent,
   bumper face to body tail; render3d.js normalises on the measurement. */
UNIT_MODELS["harvester"] = { len: 10.53, build: HeroOreHauler.build };
