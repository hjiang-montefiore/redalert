/* ============ mine_veh_clear.js - Mine-Clearing Vehicle ("mineclear") =====
   The engineer vehicle that goes at the head of a column when the ground is
   suspect. Everything about the silhouette has to say "plough" from the front
   three quarters at RTS zoom, so the equipment gets the geometry budget and
   the hull is deliberately plain.

   What has to read at a glance:
     - A FULL-WIDTH mine plough carried out ahead of the glacis on a hinged
       push frame: two tine banks in a shallow V, apex forward on the
       centreline, sweeping back and outboard so the spoil and anything in it
       is thrown clear of the track path. Seventeen raked tines, tips almost
       on the ground.
     - The frame that carries it: a centre spine and two push arms off a
       transverse pivot tube at the hull nose, plus a lift arm and a hydraulic
       ram each side running back and UP to lugs on the glacis. That diagonal
       pair is what stops the plough reading as a bulldozer blade.
     - Depth-control roller gangs on outriggers at each end of the bank, so
       the plough rides at a set depth instead of digging in.
     - A small remote machine-gun mount ("turret") and a commander's cupola on
       the roof - the vehicle is armed, but barely.
     - Lane-marking gear filling the rear deck: a dispenser with its chute
       over the tail, racks of marker pickets, and the cable reel.

   Model space: +X nose/front, +Y left, +Z up. Real metres, ground at z = 0.
   render3d.js stands the model up with rotation.x = -PI/2; a file authored
   +Y-up is a bug that has been found and fixed three times in this project.

   Materials are the house three tiers only - SKIN (procedural painted
   CanvasTexture), METAL (tines, tracks, rams, barrels), GLASS (vision
   blocks). ASCII only: a stray byte inside a hex literal has broken this
   project before and node --check is the only thing that catches it.

   Two things borrowed from the hero armour, both measured rather than
   reasoned about:
     1. M.loft winds its quads (a, c, b), so the face normal points radially
        INWARD and a FrontSide material culls the outer skin - which is most
        of why lofted armour here reads as a soft blob. body() flips the
        winding and recomputes normals.
     2. sq acts in normalised section space, so a wide shallow hull station
        needs a far lower exponent than the 0.34 rule of thumb to come out
        square. This hull uses 0.09, and the lofted body takes flatShading
        because averaged normals put the rounding straight back.            */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var MineClearVehicle = (function () {
  "use strict";

  /* ===================================================== dimensions (m) */
  /* Every number two parts have to agree about lives here, so the running
     gear, the skirts and the plough frame cannot drift apart. */
  var X_TAIL   = -3.55;
  var X_NOSE   =  3.35;   /* hull nose plate; the plough is all ahead of it */
  var HW       =  1.78;   /* hull half width over the sponsons             */
  var Z_BELLY  =  0.46;
  var Z_SPON   =  0.94;   /* sponson floor, just clear of the top track run*/
  var Z_DECK   =  1.72;   /* flat hull roof                                */
  var X_GBRK   =  1.32;   /* glacis break                                  */
  var GSLOPE   =  0.404;  /* glacis fall per metre, (1.72-0.90)/(3.35-1.32)*/

  var WR       =  0.33;   /* road wheel radius                             */
  var TT       =  0.11;   /* track belt thickness including the pad        */
  var BW       =  0.60;   /* track width                                   */
  var TY       =  1.46;   /* track centreline offset                       */
  var N_WHEEL  =  6;
  var WX0      =  2.30;   /* front road wheel                              */
  var WX1      = -2.42;   /* rear road wheel                               */
  var WZ       = WR + TT * 0.5 + 0.005;

  var SPR      = { x: -3.05, z: 0.66, r: 0.29 };  /* REAR drive sprocket   */
  var IDL      = { x:  2.92, z: 0.54, r: 0.31 };  /* front idler           */

  var SUP      = { x: 0.30, hl: 1.05, hw: 1.42, h: 0.52 };  /* superstructure */
  var Z_SUP    = Z_DECK + SUP.h;                  /* 2.24, the roof        */

  /* ---- plough: the V blade line, apex forward on the centreline -------- */
  var PV_AX    =  4.72;   /* apex x                                        */
  var PV_AY    =  0.10;   /* apex half gap                                 */
  var PV_OX    =  3.78;   /* outer end x                                   */
  var PV_OY    =  1.72;   /* outer end y                                   */
  var PV_Z     =  0.52;   /* blade line height                             */
  var N_TINE   =  8;      /* per side, plus one on the centreline          */

  /* ===================================================== small utilities */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  /* height of the glacis surface at a given x, for hanging fittings on it */
  function glacisZ(x) {
    if (x <= X_GBRK) return Z_DECK;
    return Z_DECK - (x - X_GBRK) * GSLOPE;
  }

  /* ========================================================== SKIN paint */
  /* One 1024 canvas carries the whole paint job: an engineer-green base,
     disruptive blotches, a real plate layout in seams with bolt rows along
     them, and grime that is heaviest low down and behind the exhaust.
     The base is PAINT.green (0x3d4a30) from armour3d.js taken a shade
     warmer: this renderer runs ACES tone mapping under a 1.4 key light and
     the raw table value comes back off the screen as flat sage. */
  var _cv = null;
  function paintCanvas() {
    if (_cv) return _cv;
    var W = 1024, H = 1024, i, j, x, y, n;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rng(50711);

    g.fillStyle = "#414a2c"; g.fillRect(0, 0, W, H);

    var tones = ["#37402a", "#4d5636", "#5a5b3a", "#2f3724"];
    for (i = 0; i < 42; i++) {
      g.globalAlpha = 0.30 + R() * 0.24;
      g.fillStyle = tones[i % tones.length];
      g.beginPath();
      g.ellipse(R() * W, R() * H, 44 + R() * 128, 28 + R() * 80, R() * 3.1416, 0, 6.2832);
      g.fill();
    }
    g.globalAlpha = 1;

    /* plate layout: deck joins across, plate ends down */
    var seams = [];
    g.lineWidth = 2.0;
    for (i = 0; i < 8; i++) {
      y = (i + 0.5) * (H / 8) + (R() - 0.5) * 24;
      g.strokeStyle = "rgba(22,24,18,0.36)";
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      g.strokeStyle = "rgba(224,226,204,0.14)";
      g.beginPath(); g.moveTo(0, y + 2.5); g.lineTo(W, y + 2.5); g.stroke();
      seams.push(y);
    }
    for (i = 0; i < 20; i++) {
      x = R() * W;
      var ya = R() * H, yb = ya + 80 + R() * 240;
      g.strokeStyle = "rgba(22,24,18,0.30)";
      g.beginPath(); g.moveTo(x, ya); g.lineTo(x + (R() - 0.5) * 10, yb); g.stroke();
    }

    /* bolt and rivet rows tracking the seams */
    for (i = 0; i < seams.length; i++) {
      y = seams[i] - 9;
      n = 38 + ((R() * 18) | 0);
      for (j = 0; j < n; j++) {
        x = (j + 0.5) * (W / n) + (R() - 0.5) * 4;
        g.fillStyle = "rgba(20,22,16,0.44)";
        g.beginPath(); g.arc(x, y, 2.2, 0, 6.2832); g.fill();
        g.fillStyle = "rgba(226,228,206,0.20)";
        g.beginPath(); g.arc(x - 0.8, y - 0.9, 1.0, 0, 6.2832); g.fill();
      }
    }
    for (i = 0; i < 24; i++) {
      var bx = R() * W, by = R() * H;
      n = 5 + ((R() * 8) | 0);
      for (j = 0; j < n; j++) {
        g.fillStyle = "rgba(20,22,16,0.38)";
        g.beginPath(); g.arc(bx + j * 9, by, 1.9, 0, 6.2832); g.fill();
      }
    }

    /* weathering: an engineer vehicle lives in churned earth, so the mud
       band low down is heavier and browner than a tank's dust */
    var low = g.createLinearGradient(0, H * 0.52, 0, H);
    low.addColorStop(0.0, "rgba(92,78,52,0.00)");
    low.addColorStop(0.55, "rgba(88,74,48,0.30)");
    low.addColorStop(1.0, "rgba(66,55,36,0.58)");
    g.fillStyle = low; g.fillRect(0, H * 0.52, W, H * 0.48);
    /* the loft wraps v, so the far side band also sits low: dirty it too */
    var low2 = g.createLinearGradient(0, 0, 0, H * 0.14);
    low2.addColorStop(0.0, "rgba(72,60,40,0.40)");
    low2.addColorStop(1.0, "rgba(72,60,40,0.00)");
    g.fillStyle = low2; g.fillRect(0, 0, W, H * 0.14);

    /* mud spatter and rain streaks down the plates */
    for (i = 0; i < 150; i++) {
      x = R() * W; y = H * (0.28 + R() * 0.64);
      g.fillStyle = R() < 0.6 ? "rgba(58,48,32,0.16)" : "rgba(150,146,116,0.12)";
      g.fillRect(x, y, 1.6 + R() * 3.2, 22 + R() * 120);
    }
    for (i = 0; i < 110; i++) {
      g.fillStyle = "rgba(74,62,42,0.30)";
      g.beginPath();
      g.ellipse(R() * W, H * (0.60 + R() * 0.40), 3 + R() * 11, 2 + R() * 6, 0, 0, 6.2832);
      g.fill();
    }
    /* chipped paint down to primer along the plate edges */
    for (i = 0; i < 80; i++) {
      g.fillStyle = "rgba(48,48,40,0.32)";
      g.fillRect(R() * W, seams[(R() * seams.length) | 0] + (R() - 0.5) * 12,
                 3 + R() * 11, 2 + R() * 4);
    }
    /* exhaust staining, painted into the tail band of the loft (u = 0) */
    for (i = 0; i < 3; i++) {
      var eg = g.createLinearGradient(0, 0, W * 0.24, 0);
      eg.addColorStop(0.0, "rgba(24,22,18,0.52)");
      eg.addColorStop(1.0, "rgba(30,28,24,0.00)");
      g.fillStyle = eg;
      g.fillRect(0, H * (0.30 + i * 0.22), W * 0.24, H * 0.20);
    }
    _cv = cv;
    return _cv;
  }

  function skinTex(THREE, rx, ry, ox, oy) {
    try {
      var t = new THREE.CanvasTexture(paintCanvas());
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      /* r148 ships SRGBColorSpace but Texture.colorSpace does nothing until
         r152, so the encoding field is the only one that works here. */
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      t.repeat.set(rx, ry);
      t.offset.set(ox || 0, oy || 0);
      return t;
    } catch (e) { return null; }
  }

  function makeMats(THREE, C) {
    var T = {};
    function paint(rx, ry, ox, oy) {
      var m = new THREE.MeshStandardMaterial(
        { color: 0xffffff, roughness: 0.90, metalness: 0.05 });
      var t = skinTex(THREE, rx, ry, ox, oy);
      if (t) m.map = t; else m.color.setHex(0x3d4a30);
      return m;
    }
    /* tier 1 SKIN */
    T.skin  = paint(1, 1);
    T.skinL = paint(1, 1); T.skinL.flatShading = true;   /* lofted hull */
    /* Small fittings sample a SMALL window of the same canvas, so where that
       window lands decides what colour half the vehicle's detail comes out.
       Left at the origin it sat in the clean top band and every bracket,
       fender and hatch rendered near white, which read as bare metal instead
       of paint. v is flipped against canvas y, so v in 0.06..0.36 is the
       muddy lower third of the sheet - which is where fittings low on a
       working engineer vehicle should look like they live. */
    T.skinS = paint(0.30, 0.30, 0.15, 0.06);

    /* tier 2 METAL - no map. Values kept at the low end of the house range:
       there is no environment map in this scene, so a flat metal face turned
       into the 1.4 key light returns almost pure specular and blows out to
       white. That is what turned the cable reel into a snowball and the road
       wheels into pale discs on the first pass. */
    T.metal = new THREE.MeshStandardMaterial(
      { color: 0x585d62, roughness: 0.58, metalness: 0.44 });
    T.bare  = new THREE.MeshStandardMaterial(   /* scoured plough steel */
      { color: 0x767c82, roughness: 0.50, metalness: 0.52 });
    T.dark  = new THREE.MeshStandardMaterial(
      { color: 0x33363a, roughness: 0.66, metalness: 0.36 });
    T.rub   = new THREE.MeshStandardMaterial(
      { color: 0x1b1d1e, roughness: 0.95, metalness: 0.04 });

    /* tier 3 GLASS */
    T.glass = new THREE.MeshPhysicalMaterial({
      color: 0x2b3a44, roughness: 0.10, metalness: 0.10,
      transparent: true, opacity: 0.84 });

    /* Team flash. C.team arrives as a CSS hex STRING from the game and as a
       number from cmp.html; the Color constructor takes either, so never do
       bit arithmetic on it. Taken down in value because at full value the
       key light plus ACES burns a mid blue out to near white and ownership
       stops reading at map zoom. */
    T.team = new THREE.MeshStandardMaterial(
      { color: 0x3f7fd0, roughness: 0.82, metalness: 0.08 });
    if (C && C.team !== undefined && C.team !== null) {
      try { T.team.color.set(C.team); } catch (e) { /* keep the default */ }
    }
    T.team.color.multiplyScalar(0.66);
    return T;
  }

  /* ==================================================== lofted body fix */
  function body(THREE, M, secs, segs) {
    var geo = M.loft(THREE, secs, segs);
    var ix = geo.getIndex ? geo.getIndex() : null;
    if (ix && ix.array) {
      var a = ix.array, i, t;
      for (i = 0; i + 2 < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      ix.needsUpdate = true;
      geo.computeVertexNormals();
    }
    return geo;
  }

  /* ========================================================= primitives */
  function box(THREE, p, w, d, h, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m);
    b.position.set(x, y, z);
    if (ry) b.rotation.y = ry;
    p.add(b);
    return b;
  }
  /* a cylinder's own axis is +Y, which for a road wheel IS the axle: do not
     roll it a quarter turn or the vehicle stands on flat discs */
  function wheelCyl(THREE, p, r, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg), m);
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* axis along +X: gun tubes, smoke launchers */
  function tube(THREE, p, r1, r2, len, seg, m, x, y, z, ry) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), m);
    c.rotation.z = Math.PI / 2;
    if (ry) { c.rotation.order = "ZYX"; c.rotation.y = ry; }
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* axis along +Z: pedestals, hatch rings, aerials */
  function post(THREE, p, r1, r2, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), m);
    c.rotation.x = Math.PI / 2;
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* A box spanning two arbitrary points. The plough frame is nothing but
     struts at compound angles, and writing them as Euler triples by hand is
     how the arms end up not meeting the thing they are supposed to hold. */
  function beam(THREE, p, d, h, m, a, b) {
    var v = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var L = v.length();
    if (L < 1e-5) return null;
    var msh = new THREE.Mesh(new THREE.BoxGeometry(L, d, h), m);
    msh.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), v.normalize());
    msh.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    p.add(msh);
    return msh;
  }
  /* a cylinder spanning two arbitrary points, r2 optional for a taper */
  function rod(THREE, p, r1, r2, seg, m, a, b) {
    var v = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var L = v.length();
    if (L < 1e-5) return null;
    var msh = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, L, seg), m);
    msh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize());
    msh.position.set((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    p.add(msh);
    return msh;
  }
  function mix(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  /* ============================================================== HULL   */
  function buildHull(THREE, M, g, T) {
    var i, s;

    /* Stations written as (x, halfWidth, top, bottom) because a plate layout
       is easier to reason about than a centre plus a half height. Repeated
       stations are creases: the zero-area quad between the twin rings
       contributes no normal, so computeVertexNormals stops averaging the
       deck into the glacis and the break comes out hard. */
    var st = [
      [X_TAIL,  1.64, 1.66, 1.02],
      [-3.38,   HW,   Z_DECK, Z_SPON],
      [-3.36,   HW,   Z_DECK, Z_SPON],       /* crease: tail plate break   */
      [X_GBRK,  HW,   Z_DECK, Z_SPON],
      [X_GBRK + 0.02, HW, Z_DECK, Z_SPON],   /* crease: glacis break       */
      [2.40,    1.76, 1.284, 0.90],
      [3.00,    1.70, 1.041, 0.84],
      [X_NOSE,  1.56, 0.900, 0.78]
    ];
    var secs = [];
    for (i = 0; i < st.length; i++) {
      secs.push({ x: st[i][0], w: st[i][1],
                  h: (st[i][2] - st[i][3]) * 0.5,
                  zc: (st[i][2] + st[i][3]) * 0.5, sq: 0.09 });
    }
    g.add(new THREE.Mesh(body(THREE, M, secs, 20), T.skinL));

    /* lower tub between the tracks: the loft is the sponson box only, so
       without this the hull is hollow from the belly to the sponson floor */
    box(THREE, g, 6.70, 2.14, Z_SPON - Z_BELLY, T.skin,
        -0.20, 0, (Z_SPON + Z_BELLY) * 0.5);

    /* nose underside: closes the wedge and gives the lower front plate */
    var np = new THREE.Mesh(M.slab(THREE,
      [[2.90, 0.50], [X_NOSE, 0.62], [X_NOSE, 0.80], [2.90, 0.88]], 2.60, "xz"),
      T.skin);
    np.position.y = 1.30;
    g.add(np);

    /* ---- tail: plate, exhaust grille, pintle, convoy lights ---- */
    box(THREE, g, 0.10, 3.24, 0.66, T.skin, X_TAIL, 0, 1.32);
    box(THREE, g, 0.10, 2.30, 0.46, T.skin, X_TAIL + 0.01, 0, 0.80);
    box(THREE, g, 0.07, 1.80, 0.48, T.dark, X_TAIL - 0.03, 0, 1.28);
    for (i = 0; i < 4; i++)
      box(THREE, g, 0.05, 1.74, 0.05, T.metal, X_TAIL - 0.065, 0, 1.12 + i * 0.11);
    box(THREE, g, 0.16, 0.28, 0.20, T.metal, X_TAIL - 0.02, 0, 0.72);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.10, 0.24, 0.20, T.dark, X_TAIL - 0.02, s * 1.42, 1.50);
      box(THREE, g, 0.04, 0.17, 0.14, T.glass, X_TAIL - 0.075, s * 1.42, 1.50);
      /* tow eyes */
      box(THREE, g, 0.16, 0.11, 0.22, T.metal, X_TAIL + 0.04, s * 0.90, 0.86);
    }

    /* ---- engine deck: two louvred grille panels behind the crew box ---- */
    for (i = 0; i < 2; i++) {
      /* kept clear of the tail plate: at 1.24 m apart the rear panel hung
         0.22 m out past the back of the hull in the bounding box */
      var gx = -1.86 - i * 1.14;
      box(THREE, g, 1.04, 2.46, 0.06, T.dark, gx, 0, Z_DECK - 0.03);
      for (var k = 0; k < 3; k++)
        box(THREE, g, 0.17, 2.34, 0.05, T.metal, gx - 0.34 + k * 0.34, 0, Z_DECK + 0.015);
    }
    /* fuel filler caps break up the flat deck */
    for (s = -1; s <= 1; s += 2)
      post(THREE, g, 0.16, 0.16, 0.05, 8, T.skinS, -1.30, s * 1.08, Z_DECK + 0.03);

    /* ---- glacis fittings ---- */
    /* driver's hatch and periscopes, offset right of the centreline */
    post(THREE, g, 0.30, 0.30, 0.06, 10, T.skinS, 1.86, -0.62, glacisZ(1.86) + 0.03);
    for (i = 0; i < 2; i++) {
      box(THREE, g, 0.11, 0.21, 0.08, T.dark, 2.14, -0.94 + i * 0.64, glacisZ(2.14) + 0.05);
      box(THREE, g, 0.03, 0.17, 0.06, T.glass, 2.09, -0.94 + i * 0.64, glacisZ(2.09) + 0.055);
    }
    /* plough hinge lugs, heavy and bolted through the lower front plate */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.32, 0.16, 0.34, T.metal, X_NOSE - 0.10, s * 1.15, 0.74);
      box(THREE, g, 0.26, 0.14, 0.30, T.metal, X_NOSE - 0.08, s * 0.24, 0.72);
      /* ram anchor lugs, higher up the glacis */
      box(THREE, g, 0.24, 0.18, 0.26, T.metal, 2.25, s * 1.05, glacisZ(2.25) + 0.10);
    }

    /* ---- front fenders laid along the glacis, not floating clear of it -- */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.24, 0.42, 0.08, T.skinS, 2.42, s * 1.62, glacisZ(2.42) + 0.06, 0.384);
      box(THREE, g, 0.06, 0.42, 0.24, T.skinS, 1.82, s * 1.62, 1.26);
      /* rear mudflap behind the sprocket */
      box(THREE, g, 0.06, 0.58, 0.44, T.rub, -3.40, s * 1.44, 0.40);
    }

    /* ---- hull side stowage, sat on the sponson above the skirt line ---- */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.14, 0.40, 0.34, T.skinS, -1.05, s * 1.58, 1.44);
      box(THREE, g, 0.72, 0.36, 0.30, T.skinS, -2.90, s * 1.56, 1.42);
    }

    /* ---- segmented side skirts ---- */
    /* The top edge is set flush with the SPONSON FLOOR so the hull overhang
       shades it. Carried higher, its 0.05 top face pointed straight at the
       key light and the run came out as a row of bright dashes down the side
       of an otherwise matt vehicle. */
    var segN = 5, segL = 1.16, skH = Z_SPON - 0.46;
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < segN; i++)
        box(THREE, g, segL * 0.94, 0.05, skH, T.skinS,
            -3.02 + segL * (i + 0.5), s * 1.80, 0.46 + skH * 0.5);
  }

  /* ====================================================== RUNNING GEAR   */
  function buildRunningGear(THREE, g, T) {
    var s, i, j;
    var dx = (WX0 - WX1) / (N_WHEEL - 1);

    /* The belt walked as a closed path in side profile rather than as two
       straight slabs, so it climbs over the raised rear sprocket and the
       rear-drive layout reads at a glance. */
    var P = [
      [-2.80, 0.083], [2.80, 0.083],
      [3.14, 0.22], [3.28, 0.52], [3.04, 0.80],
      [2.40, 0.84], [-2.45, 0.90],
      [-2.95, 0.99], [-3.36, 0.80], [-3.42, 0.52], [-3.12, 0.22]
    ];

    for (s = -1; s <= 1; s += 2) {
      var y = s * TY;

      for (i = 0; i < P.length; i++) {
        var a = P[i], b = P[(i + 1) % P.length];
        var ddx = b[0] - a[0], ddz = b[1] - a[1];
        var len = Math.sqrt(ddx * ddx + ddz * ddz);
        if (len < 1e-4) continue;
        var th = Math.atan2(ddz, ddx);
        box(THREE, g, len + TT * 0.6, BW, TT, T.rub,
            (a[0] + b[0]) * 0.5, y, (a[1] + b[1]) * 0.5, -th);
        /* the link pattern is the strongest read on a track and METAL
           carries no texture, so the pads have to be geometry */
        var np = Math.max(1, Math.round(len / 0.86));
        for (j = 0; j < np; j++) {
          var t = (j + 0.5) / np;
          var px = a[0] + ddx * t, pz = a[1] + ddz * t;
          /* the loop is walked counter-clockwise in XZ, so the OUTWARD
             normal is the tangent turned -90 degrees; backwards puts the
             ground pads on top of the belt */
          var nx = Math.sin(th), nz = -Math.cos(th);
          box(THREE, g, 0.36, BW * 1.05, 0.05, T.dark,
              px + nx * TT * 0.52, y, pz + nz * TT * 0.52, -th);
        }
      }

      for (i = 0; i < N_WHEEL; i++) {
        var wx = WX1 + i * dx;
        wheelCyl(THREE, g, WR, BW * 0.84, 10, T.dark, wx, y, WZ);
        wheelCyl(THREE, g, WR * 0.42, BW * 0.92, 6, T.metal, wx, y, WZ);
        /* torsion-bar swing arms on alternate stations: enough to fill the
           gaps between wheels without paying for six of them a side */
        if (i % 2 === 0)
          box(THREE, g, 0.62, 0.14, 0.16, T.dark, wx - 0.30, s * (TY - BW * 0.52), WZ + 0.06);
      }

      /* rear drive sprocket and front idler */
      wheelCyl(THREE, g, SPR.r, BW * 0.70, 10, T.metal, SPR.x, y, SPR.z);
      wheelCyl(THREE, g, SPR.r * 0.45, BW * 0.86, 6, T.dark, SPR.x, y, SPR.z);
      wheelCyl(THREE, g, IDL.r, BW * 0.70, 10, T.dark, IDL.x, y, IDL.z);
      wheelCyl(THREE, g, IDL.r * 0.42, BW * 0.84, 6, T.metal, IDL.x, y, IDL.z);

      /* return rollers under the upper run */
      for (i = 0; i < 2; i++)
        wheelCyl(THREE, g, 0.12, BW * 0.46, 5, T.dark, 1.30 - i * 2.40, y, 0.74);
    }
  }

  /* ==================================================== SUPERSTRUCTURE   */
  function buildSuper(THREE, M, g, T) {
    var s, i;

    /* crew and equipment box on the forward deck */
    box(THREE, g, SUP.hl * 2, SUP.hw * 2, SUP.h, T.skin, SUP.x, 0, Z_DECK + SUP.h * 0.5);
    /* raked front face, so the box does not read as a packing crate */
    var wedge = new THREE.Mesh(M.slab(THREE,
      [[SUP.x + SUP.hl, Z_DECK], [SUP.x + SUP.hl + 0.44, Z_DECK],
       [SUP.x + SUP.hl, Z_SUP]], SUP.hw * 2, "xz"), T.skin);
    wedge.position.y = SUP.hw;
    g.add(wedge);
    /* rear face of the box gets a stowage rack */
    box(THREE, g, 0.10, 2.30, 0.30, T.skinS, SUP.x - SUP.hl - 0.05, 0, Z_DECK + 0.36);

    /* vision blocks along the front of the box, and the side ones */
    for (i = -1; i <= 1; i++) {
      box(THREE, g, 0.09, 0.26, 0.13, T.dark, SUP.x + SUP.hl + 0.40, i * 0.52, Z_SUP - 0.16);
      box(THREE, g, 0.04, 0.21, 0.10, T.glass, SUP.x + SUP.hl + 0.45, i * 0.52, Z_SUP - 0.16);
    }
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.26, 0.06, 0.13, T.dark, SUP.x + 0.42, s * (SUP.hw + 0.02), Z_SUP - 0.16);
      box(THREE, g, 0.21, 0.04, 0.10, T.glass, SUP.x + 0.42, s * (SUP.hw + 0.05), Z_SUP - 0.16);
    }

    /* commander's cupola, right of the centreline */
    var cx = 0.16, cy = -0.68;
    post(THREE, g, 0.40, 0.40, 0.30, 10, T.skin, cx, cy, Z_SUP + 0.15);
    for (i = 0; i < 6; i++) {
      var a = i / 6 * Math.PI * 2;
      box(THREE, g, 0.10, 0.20, 0.11, T.glass,
          cx + Math.cos(a) * 0.39, cy + Math.sin(a) * 0.39, Z_SUP + 0.20)
        .rotation.z = a;
    }
    post(THREE, g, 0.38, 0.36, 0.06, 8, T.skinS, cx, cy, Z_SUP + 0.33);
    box(THREE, g, 0.20, 0.09, 0.05, T.metal, cx - 0.30, cy, Z_SUP + 0.38);

    /* smoke grenade launchers: two banks of four, canted up and outboard */
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < 4; i++)
        tube(THREE, g, 0.055, 0.055, 0.30, 5, T.metal,
             SUP.x + 0.86, s * (1.18 + (i % 2) * 0.16), Z_SUP - 0.10 + ((i / 2) | 0) * 0.15,
             -0.32);

    /* headlights in brush guards on the front corners of the box */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.16, 0.22, 0.19, T.skinS, SUP.x + SUP.hl + 0.34, s * 1.20, Z_DECK + 0.20);
      box(THREE, g, 0.04, 0.15, 0.13, T.glass, SUP.x + SUP.hl + 0.43, s * 1.20, Z_DECK + 0.20);
      box(THREE, g, 0.20, 0.04, 0.24, T.metal, SUP.x + SUP.hl + 0.36, s * 1.35, Z_DECK + 0.20);
    }

    /* whip aerials */
    for (s = -1; s <= 1; s += 2)
      post(THREE, g, 0.028, 0.010, 1.24, 5, T.dark, -0.70, s * 1.26, Z_SUP + 0.62);

    /* team flashes: hull side, glacis and tail so ownership reads from any
       bearing even with the plough filling the front of the sprite */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.66, 0.05, 0.17, T.team, -0.05, s * (SUP.hw + 0.02), Z_DECK + 0.30);
      box(THREE, g, 0.44, 0.05, 0.15, T.team, -2.60, s * 1.80, 1.42);
    }
    box(THREE, g, 0.06, 0.60, 0.16, T.team, X_TAIL - 0.05, 0, 1.52);
  }

  /* =============================================== REMOTE WEAPON MOUNT   */
  /* Named "turret": render3d.js traverses this group about Z. Everything is
     local to the ring centre so the traverse pivots where it should. */
  function buildTurret(THREE, T) {
    var t = new THREE.Group();
    t.name = "turret";

    post(THREE, t, 0.24, 0.24, 0.08, 10, T.skinS, 0, 0, 0.04);
    box(THREE, t, 0.30, 0.30, 0.20, T.skinS, 0, 0, 0.18);
    /* mount body and the ammunition can beside it */
    box(THREE, t, 0.44, 0.34, 0.24, T.skinS, 0.02, 0, 0.40);
    box(THREE, t, 0.26, 0.19, 0.21, T.dark, -0.15, -0.24, 0.38);
    /* day/thermal sight head with its window */
    box(THREE, t, 0.16, 0.18, 0.15, T.skinS, 0.06, 0.22, 0.50);
    box(THREE, t, 0.04, 0.13, 0.10, T.glass, 0.15, 0.22, 0.51);
    /* small frontal shield: the crew are under armour, the gun is not */
    box(THREE, t, 0.05, 0.46, 0.30, T.metal, 0.20, 0, 0.46);
    /* the HMG itself - receiver, barrel jacket, flash hider */
    box(THREE, t, 0.38, 0.11, 0.12, T.dark, 0.28, 0, 0.42);
    tube(THREE, t, 0.036, 0.030, 0.62, 6, T.metal, 0.76, 0, 0.42);
    tube(THREE, t, 0.052, 0.052, 0.10, 6, T.dark, 1.09, 0, 0.42);
    /* ammunition belt feed chute */
    box(THREE, t, 0.12, 0.10, 0.16, T.metal, 0.06, -0.18, 0.38);

    t.position.set(0.62, 0.68, Z_SUP);
    return t;
  }

  /* ============================================================ PLOUGH   */
  /* The whole identity of the vehicle. The blade is a shallow V with its
     apex forward on the centreline; tines rake forward, outboard and down
     off that line so spoil is thrown clear of the track path. */
  function buildPlough(THREE, g, T) {
    var s, i;
    var HINGE_Z = 0.74;

    /* transverse pivot tube across the nose - the hinge line */
    rod(THREE, g, 0.085, 0.085, 8, T.metal,
        [X_NOSE - 0.06, -1.32, HINGE_Z], [X_NOSE - 0.06, 1.32, HINGE_Z]);

    /* centre spine from the hinge to the apex of the V */
    beam(THREE, g, 0.20, 0.22, T.skinS,
         [X_NOSE - 0.06, 0, HINGE_Z - 0.04], [PV_AX - 0.06, 0, PV_Z + 0.10]);

    var apex = [PV_AX, PV_AY, PV_Z];

    /* point on the blade line at parameter u (0 apex, 1 outer end) */
    function bl(u, sg) {
      return [PV_AX + (PV_OX - PV_AX) * u, sg * (PV_AY + (PV_OY - PV_AY) * u), PV_Z];
    }
    /* outward-forward unit normal of the blade line, per side */
    var dxl = PV_OX - PV_AX, dyl = PV_OY - PV_AY;
    var nlen = Math.sqrt(dxl * dxl + dyl * dyl);
    var NX = dyl / nlen, NY = -dxl / nlen;   /* (0.877, 0.481) */

    for (s = -1; s <= 1; s += 2) {
      var inner = bl(0, s), outer = bl(1, s);

      /* main blade beam along the V, and the mouldboard plate under it */
      beam(THREE, g, 0.19, 0.28, T.skinS,
           [inner[0], inner[1], PV_Z + 0.30], [outer[0], outer[1], PV_Z + 0.30]);
      beam(THREE, g, 0.11, 0.56, T.bare,
           [inner[0] - NX * 0.05, inner[1] - s * NY * 0.05, PV_Z - 0.10],
           [outer[0] - NX * 0.05, outer[1] - s * NY * 0.05, PV_Z - 0.10]);
      /* stiffener ribs standing on the back of the mouldboard */
      for (i = 0; i < 3; i++) {
        var ur = 0.22 + i * 0.30;
        var pr = bl(ur, s);
        beam(THREE, g, 0.07, 0.10, T.skinS,
             [pr[0] - NX * 0.38, pr[1] - s * NY * 0.38, PV_Z + 0.42],
             [pr[0] - NX * 0.02, pr[1] - s * NY * 0.02, PV_Z - 0.16]);
      }

      /* the tines. Each one rakes forward, outboard and down off the blade
         line; the tips finish about 0.12 m off the ground, which is what
         makes the plough read as ground equipment rather than a dozer. */
      for (i = 0; i < N_TINE; i++) {
        var u = i / (N_TINE - 1);
        var b0 = bl(u, s);
        var tip = [b0[0] + NX * 0.58, b0[1] + s * NY * 0.58, PV_Z - 0.44];
        rod(THREE, g, 0.088, 0.036, 4, T.bare,
            [b0[0], b0[1], b0[2] + 0.06], tip);
        /* hardened share welded on the last third; a cone, so the tip pays
           for no end cap and the whole bank costs 68 triangles less */
        rod(THREE, g, 0.062, 0.0, 4, T.metal, mix(b0, tip, 0.58), tip);
      }

      /* push arm from the hinge lug out to the blade at mid span */
      var mid = bl(0.62, s);
      beam(THREE, g, 0.16, 0.18, T.skinS,
           [X_NOSE - 0.08, s * 1.15, HINGE_Z], [mid[0] - NX * 0.10, mid[1], PV_Z + 0.14]);

      /* lift arm and hydraulic ram, back and UP to the glacis lugs. This
         diagonal pair is the difference between a plough and a dozer. */
      var lug = [2.25, s * 1.05, glacisZ(2.25) + 0.10];
      var brk = bl(0.86, s);
      var top = [brk[0] - NX * 0.06, brk[1], PV_Z + 0.52];
      beam(THREE, g, 0.10, 0.16, T.skinS, [brk[0], brk[1], PV_Z + 0.18], top);
      beam(THREE, g, 0.11, 0.13, T.skinS,
           [2.42, s * 1.38, glacisZ(2.42) + 0.16], [brk[0] + 0.04, brk[1], PV_Z + 0.30]);
      rod(THREE, g, 0.090, 0.090, 8, T.metal, lug, mix(lug, top, 0.58));
      rod(THREE, g, 0.044, 0.044, 6, T.bare, mix(lug, top, 0.46), top);
      box(THREE, g, 0.14, 0.14, 0.16, T.metal, top[0], top[1], top[2]);

      /* outrigger to the depth-control roller gang: without it the plough
         digs in and stops instead of skimming the ground */
      var oarm = [outer[0] + 0.10, outer[1] + s * 0.10, PV_Z - 0.02];
      var oax  = [4.42, s * 2.13, 0.24];
      beam(THREE, g, 0.11, 0.13, T.skinS, oarm, oax);
      rod(THREE, g, 0.05, 0.05, 5, T.metal,
          [oax[0], s * 1.98, oax[2]], [oax[0], s * 2.30, oax[2]]);
      for (i = 0; i < 2; i++)
        wheelCyl(THREE, g, 0.22, 0.10, 8, T.dark, oax[0], s * (2.06 + i * 0.15), oax[2]);
      /* end plate closing the outboard end of the mouldboard */
      box(THREE, g, 0.36, 0.06, 0.60, T.bare, outer[0] + 0.14, s * (PV_OY + 0.10), PV_Z - 0.08);
    }

    /* the centre tine, filling the apex gap between the two banks */
    var ct0 = [PV_AX + 0.04, 0, PV_Z + 0.04];
    var ct1 = [PV_AX + 0.54, 0, PV_Z - 0.44];
    rod(THREE, g, 0.088, 0.036, 4, T.bare, ct0, ct1);
    rod(THREE, g, 0.062, 0.0, 4, T.metal, mix(ct0, ct1, 0.58), ct1);
    /* apex knuckle where the two blade beams meet */
    box(THREE, g, 0.28, 0.32, 0.42, T.skinS, PV_AX - 0.02, 0, PV_Z + 0.22);
    /* hazard flash on the outer ends so the equipment reads as equipment */
    for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.10, 0.24, 0.16, T.team, 4.30, s * 2.22, 0.62);
  }

  /* =============================================== LANE-MARKING GEAR     */
  /* Clearing a lane is worthless if nobody can find it afterwards, so the
     whole rear deck is given over to marking it. */
  function buildRearGear(THREE, g, T) {
    var s, i;

    /* dispenser body over the engine deck, with the chute over the tail */
    box(THREE, g, 1.16, 2.00, 0.44, T.skin, -2.42, 0, Z_DECK + 0.22);
    /* the lid is painted, not bare: as a METAL plate it took the key light
       flat on and became the brightest thing on the vehicle */
    box(THREE, g, 0.94, 1.74, 0.07, T.skinS, -2.42, 0, Z_DECK + 0.46);
    for (i = 0; i < 3; i++)
      box(THREE, g, 0.07, 1.78, 0.05, T.metal, -2.76 + i * 0.34, 0, Z_DECK + 0.50);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.62, 0.34, 0.26, T.skinS, -3.18, s * 0.66, Z_DECK + 0.05, -0.62);
      box(THREE, g, 0.30, 0.30, 0.10, T.metal, -3.52, s * 0.66, Z_DECK - 0.22, -0.62);
    }
    /* marker cartridge launcher block on top of the dispenser */
    for (i = 0; i < 2; i++)
      post(THREE, g, 0.085, 0.085, 0.28, 5, T.metal,
           -2.62 + i * 0.26, 0.00, Z_DECK + 0.61);

    /* racks of marker pickets, five a side, standing on the sponson tops */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.70, 0.09, 0.07, T.skinS, -2.30, s * 1.38, Z_DECK + 0.10);
      box(THREE, g, 1.70, 0.09, 0.07, T.skinS, -2.30, s * 1.38, Z_DECK + 0.74);
      for (i = 0; i < 4; i++) {
        var px = -2.93 + i * 0.42;
        box(THREE, g, 0.06, 0.06, 0.86, T.skinS, px, s * 1.38, Z_DECK + 0.45);
        if (i % 2 === 0)
          box(THREE, g, 0.02, 0.16, 0.14, T.team, px, s * 1.44, Z_DECK + 0.80);
      }
    }

    /* cable reel for the lane tape, behind the crew box */
    wheelCyl(THREE, g, 0.23, 0.44, 10, T.dark, -1.16, 0, Z_DECK + 0.26);
    wheelCyl(THREE, g, 0.28, 0.05, 8, T.skinS, -1.16, 0.23, Z_DECK + 0.26);
    wheelCyl(THREE, g, 0.28, 0.05, 8, T.skinS, -1.16, -0.23, Z_DECK + 0.26);

    /* marker light bar on the tail plate */
    box(THREE, g, 0.09, 1.10, 0.10, T.metal, X_TAIL - 0.055, 0, 1.82);
    for (s = -1; s <= 1; s += 2)
      box(THREE, g, 0.05, 0.16, 0.12, T.glass, X_TAIL - 0.105, s * 0.40, 1.82);
  }

  /* ============================================================ assembly */
  function build(THREE, M, C) {
    var T = makeMats(THREE, C);
    var g = new THREE.Group();

    buildHull(THREE, M, g, T);
    buildRunningGear(THREE, g, T);
    buildSuper(THREE, M, g, T);
    buildRearGear(THREE, g, T);
    buildPlough(THREE, g, T);
    g.add(buildTurret(THREE, T));

    g.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    return g;
  }

  return { build: build };
})();

/* Registration. len is the model's real overall extent along X: the tail
   plate at -3.55 to the centre tine tip at 5.42.                          */
UNIT_MODELS["mineclear"] = {
  len: 9.0,
  build: function (THREE, M, C) { return MineClearVehicle.build(THREE, M, C); }
};
