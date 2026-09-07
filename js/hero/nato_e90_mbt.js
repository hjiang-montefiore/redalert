/* ============ nato_e90_mbt.js - HERO reference model: M1A2 Abrams ========
   Style and period anchor for the e90 (1990s NATO) armour roster.

   What has to read at a glance, from the reference photographs:
     - SEVEN road wheels per side, evenly spaced, with the drive sprocket at
       the REAR and a smaller compensating idler at the front. Every earlier
       pass at this vehicle put the sprocket at the front, which is the single
       fastest way to make an Abrams read as a Leopard.
     - A very long, very low wedge hull: the glacis is one uninterrupted
       shallow ramp running most of the vehicle's length down to a nose that
       sits barely above wheel-hub height.
     - A flat-faced faceted turret. The front is two big planar cheeks that
       sweep back and out to the widest point behind the sights; the sides are
       near-vertical slabs; the roof is one flat plane carried all the way
       back over a deep stowage bustle.
     - The 120 mm M256 smoothbore: thick thermal shroud off the mantlet, a
       step down to the bare tube, a bore evacuator two thirds out.
     - Segmented side skirts, with a deeper heavy section over the front pair
       of wheels whose bottom edge drops away toward the nose.
     - The M1A2 tell: the commander's independent thermal viewer standing
       proud of the turret roof on its pedestal, forward and left of the
       cupola.

   Model space: +X nose/front, +Y left, +Z up. Real metres, ground at z = 0.
   Materials are the house three tiers only - SKIN (textured paint), METAL
   (bare fittings, tracks, rubber), GLASS (vision blocks and sight windows).
   ASCII only: a stray byte in a hex literal has broken this project before.

   Two things measured on the renderer while building this, both of which the
   parametric armour will want when it is tuned to match:

   1. M.loft winds its quads (a, c, b), which puts the face normal radially
      INWARD. Under a default FrontSide material the outer skin is therefore
      culled and you are looking at the far inner wall of the body: a solid
      turret rendered with the ring plate underneath it plainly visible, and
      the shading came out inverted, which is most of why lofted armour in
      this project has always read as a soft blob. Every lofted body here goes
      through body() below, which flips the winding and recomputes normals.
      (The aircraft files sidestep this by using DoubleSide everywhere;
      armour3d.js does not, so its hulls are almost certainly inside out.)

   2. sq does NOT square a section off the way the number suggests once the
      section is wide and shallow. The exponent acts in normalised space, so a
      hull station 3.44 m wide and 0.58 m tall at the recommended sq 0.34 gets
      a corner chamfer 0.40 m across - a quarter of the half-width - and reads
      as a rounded shoulder. Measured on this hull, sq 0.09 gives a 0.20 m
      bevel and a crisp deck edge; the turret uses 0.08. Wide flat sections
      want a far lower exponent than a square one does. The lofted bodies also
      take flatShading, because averaged normals put the rounding back. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAbrams = (function () {
  "use strict";

  /* ------------------------------------------------------------ geometry */
  /* Everything below is in metres and every number that two parts have to
     agree about lives here, so the running gear, the skirts and the hull
     cannot drift apart the way they did when each was tuned by eye. */
  var L        = 7.93;    /* hull length, nose to tail plate                */
  var X_NOSE   =  3.965;
  var X_TAIL   = -3.965;
  var HW       = 1.72;    /* hull half width over the sponsons              */
  var Z_DECK   = 1.48;    /* flat hull roof                                 */
  var Z_SPON   = 0.90;    /* sponson floor, just clear of the top track run */
  var Z_BELLY  = 0.48;    /* ground clearance                               */

  var WR       = 0.32;    /* road wheel radius (0.635 m wheel)              */
  var TT       = 0.115;   /* track belt thickness, pad included             */
  var WZ       = TT + WR; /* road wheel centre height                       */
  var BW       = 0.63;    /* track width                                    */
  var TY       = 1.40;    /* track centreline offset from the hull centre   */
  var N_WHEEL  = 7;       /* the period cue                                 */
  var WX0      =  2.42;   /* first (front) road wheel                       */
  var WX1      = -2.42;   /* last (rear) road wheel                         */

  var SPR      = { x: -3.18, z: 0.62, r: 0.275, tr: 0.345 };  /* REAR drive */
  var IDL      = { x:  3.12, z: 0.50, r: 0.300 };             /* front idler*/

  var SK_Y     = 1.755;   /* skirt inner face                               */
  var SK_TH    = 0.055;
  var SK_TOP   = 1.34;
  var SK_BOT   = 0.50;

  var TUR      = { x: 0.15, z: Z_DECK };   /* turret ring centre            */
  var GUN_TIP  = 5.555;                    /* turret-local muzzle x         */

  /* ------------------------------------------------------------- helpers */
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------ SKIN tex */
  /* One 1024 canvas carries the whole paint job: NATO desert base from the
     armour3d PAINT table, disruptive blotches in that table's secondary
     tones, a real plate layout in seams, bolt rows along the seams, and
     grime that is heaviest low down and behind the exhaust.
     u = 0 is the hull TAIL on the lofted body, so the exhaust smear is
     painted into the low-u band and lands where the grille actually is.  */
  var _cv = null;
  function paintCanvas() {
    if (_cv) return _cv;
    var W = 1024, H = 1024, i, j, x, y, n, q;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rng(19902);

    /* Base coat is PAINT.desert (0xb0a07c) from armour3d.js, pulled down and
       warmed to 0x9c8759. That is deliberate: this renderer runs ACES tone
       mapping under a 1.4 key light and the table value came back off the
       screen as pale cream with no desert in it at all. The darker source
       lands on the value the table is asking for. */
    g.fillStyle = "#9c8759"; g.fillRect(0, 0, W, H);

    /* disruptive camouflage */
    var tones = ["#87764c", "#b09a69", "#7b6c47", "#a89263"];
    for (i = 0; i < 46; i++) {
      g.globalAlpha = 0.34 + R() * 0.22;
      g.fillStyle = tones[i % tones.length];
      g.beginPath();
      g.ellipse(R() * W, R() * H, 46 + R() * 130, 30 + R() * 84, R() * 3.1416, 0, 6.2832);
      g.fill();
    }
    g.globalAlpha = 1;

    /* --- plate layout: horizontal deck joins and vertical plate ends --- */
    var seams = [];
    g.lineWidth = 2.0;
    for (i = 0; i < 9; i++) {
      y = (i + 0.5) * (H / 9) + (R() - 0.5) * 26;
      g.strokeStyle = "rgba(28,26,22,0.34)";
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      /* a thin highlight under each seam reads as a raised plate lip */
      g.strokeStyle = "rgba(232,224,198,0.16)";
      g.beginPath(); g.moveTo(0, y + 2.5); g.lineTo(W, y + 2.5); g.stroke();
      seams.push(y);
    }
    for (i = 0; i < 22; i++) {
      x = R() * W;
      var ya = R() * H, yb = ya + 90 + R() * 260;
      g.strokeStyle = "rgba(28,26,22,0.30)";
      g.beginPath(); g.moveTo(x, ya); g.lineTo(x + (R() - 0.5) * 10, yb); g.stroke();
    }

    /* --- bolt and rivet rows, tracking the horizontal seams --- */
    for (i = 0; i < seams.length; i++) {
      y = seams[i] - 9;
      n = 40 + ((R() * 20) | 0);
      for (j = 0; j < n; j++) {
        x = (j + 0.5) * (W / n) + (R() - 0.5) * 4;
        g.fillStyle = "rgba(30,27,22,0.42)";
        g.beginPath(); g.arc(x, y, 2.3, 0, 6.2832); g.fill();
        g.fillStyle = "rgba(238,230,206,0.22)";
        g.beginPath(); g.arc(x - 0.8, y - 0.9, 1.1, 0, 6.2832); g.fill();
      }
    }
    /* short bolted patches away from the seams: hatch rings, box mounts */
    for (i = 0; i < 26; i++) {
      var bx = R() * W, by = R() * H;
      n = 5 + ((R() * 9) | 0);
      for (j = 0; j < n; j++) {
        g.fillStyle = "rgba(30,27,22,0.38)";
        g.beginPath(); g.arc(bx + j * 9, by, 2.0, 0, 6.2832); g.fill();
      }
    }

    /* --- weathering: grime heaviest low down --------------------------- */
    var low = g.createLinearGradient(0, H * 0.56, 0, H);
    low.addColorStop(0.0, "rgba(122,108,80,0.00)");
    low.addColorStop(0.6, "rgba(112,99,72,0.24)");
    low.addColorStop(1.0, "rgba(84,74,54,0.48)");
    g.fillStyle = low; g.fillRect(0, H * 0.56, W, H * 0.44);
    /* the lofted body wraps v so the far side band also sits low: dirty it */
    var low2 = g.createLinearGradient(0, 0, 0, H * 0.13);
    low2.addColorStop(0.0, "rgba(96,85,62,0.34)");
    low2.addColorStop(1.0, "rgba(96,85,62,0.00)");
    g.fillStyle = low2; g.fillRect(0, 0, W, H * 0.13);

    /* dust and rain streaks running down the plates */
    for (i = 0; i < 150; i++) {
      x = R() * W; y = H * (0.30 + R() * 0.62);
      g.fillStyle = R() < 0.55 ? "rgba(70,62,46,0.14)" : "rgba(178,166,136,0.13)";
      g.fillRect(x, y, 1.6 + R() * 3.4, 26 + R() * 130);
    }
    /* chipped paint down to primer on the plate edges */
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(58,54,44,0.30)";
      g.fillRect(R() * W, seams[(R() * seams.length) | 0] + (R() - 0.5) * 12,
                 3 + R() * 12, 2 + R() * 4);
    }

    /* --- exhaust staining, painted into the tail band of the loft ------ */
    for (q = 0; q < 3; q++) {
      var eg = g.createLinearGradient(0, 0, W * 0.26, 0);
      eg.addColorStop(0.0, "rgba(26,23,20,0.50)");
      eg.addColorStop(0.5, "rgba(34,30,26,0.26)");
      eg.addColorStop(1.0, "rgba(34,30,26,0.00)");
      g.fillStyle = eg;
      g.fillRect(0, H * (0.30 + q * 0.22), W * 0.26, H * 0.20);
    }
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(22,20,18,0.20)";
      g.fillRect(R() * W * 0.24, R() * H, 2 + R() * 7, 14 + R() * 80);
    }
    _cv = cv;
    return _cv;
  }

  function skinTex(THREE, rx, ry) {
    try {
      var t = new THREE.CanvasTexture(paintCanvas());
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 8;
      t.repeat.set(rx, ry);
      return t;
    } catch (e) { return null; }
  }

  /* ---------------------------------------------------------- materials */
  function makeMats(THREE, C) {
    var M3 = {};
    /* tier 1 SKIN - painted surface, textured */
    function paint(rx, ry) {
      var m = new THREE.MeshStandardMaterial(
        { color: 0xffffff, roughness: 0.90, metalness: 0.05 });
      var t = skinTex(THREE, rx, ry);
      if (t) m.map = t; else m.color.setHex(0xb0a07c);
      return m;
    }
    M3.skin  = paint(1, 1);       /* small painted panels that want smoothing */
    /* The lofted hull and turret take a flat-shaded copy of the same paint.
       Averaged normals turned the squared-off sections back into a soft cast
       dome the moment the corner chamfers were shaded smooth - which is the
       "rounded blob" this project keeps producing. Flat shading is what makes
       a chamfer read as a plate edge, and an Abrams is nothing but plates. */
    M3.skinL = paint(1, 1); M3.skinL.flatShading = true;
    M3.skinS = paint(0.34, 0.34); /* small painted fittings, zoomed in      */

    /* tier 2 METAL - fittings, gun, undercarriage; no texture */
    M3.metal = new THREE.MeshStandardMaterial(
      { color: 0x5d6165, roughness: 0.55, metalness: 0.50 });
    M3.dark  = new THREE.MeshStandardMaterial(
      { color: 0x3a3d40, roughness: 0.60, metalness: 0.45 });
    /* rubber and track pads count as METAL, matt and non-metallic */
    M3.rub   = new THREE.MeshStandardMaterial(
      { color: 0x1b1d1e, roughness: 0.95, metalness: 0.04 });

    /* tier 3 GLASS - vision blocks, periscopes, sight windows */
    M3.glass = new THREE.MeshPhysicalMaterial({
      color: 0x2b3a44, roughness: 0.10, metalness: 0.10,
      transparent: true, opacity: 0.84 });

    /* Team flash: painted, so it stays inside the SKIN tier. The colour is
       C.team as handed in, taken down in value first - at full value the key
       light plus ACES burnt a mid blue out to near white and ownership stopped
       reading at map zoom. Darkening keeps the hue and gets it back. */
    M3.team = new THREE.MeshStandardMaterial(
      { color: (C && C.team) || 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    M3.team.color.multiplyScalar(0.62);
    return M3;
  }

  /* ------------------------------------------------------- lofted bodies */
  /* M.loft emits its quads wound (a, c, b) which, for the section walk it
     uses, puts the face normal radially INWARD: with the default FrontSide
     material the outer skin is culled and you look straight through the body
     at its own far wall - which is how a solid turret came to show the ring
     plate lying underneath it, and why every lofted hull in this project has
     read as a soft blob no matter what sq it was given. Flipping the winding
     here and recomputing normals costs nothing, keeps FrontSide (so the
     silhouette stays crisp and shadows stay right) and finally lets the
     squared-off sections read as flat plates. */
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

  /* --------------------------------------------------------- primitives */
  function box(THREE, p, w, d, h, m, x, y, z, ry) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(w, d, h), m);
    b.position.set(x, y, z);
    if (ry) b.rotation.y = ry;
    p.add(b);
    return b;
  }
  /* a cylinder's own axis is +Y, which for a road wheel IS the axle: do not
     roll it a quarter turn or the vehicle ends up standing on flat discs. */
  function wheelCyl(THREE, p, r, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg), m);
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* axis along +X: for gun tubes and anything pointing forward */
  function tube(THREE, p, r1, r2, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), m);
    c.rotation.z = Math.PI / 2;
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }
  /* axis along +Z: masts, pedestals, hatch rings */
  function post(THREE, p, r1, r2, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), m);
    c.rotation.x = Math.PI / 2;
    c.position.set(x, y, z);
    p.add(c);
    return c;
  }

  /* ============================================================== HULL   */
  function buildHull(THREE, M, g, T) {
    var i, s;

    /* The lofted upper hull. Stations are written as (x, halfWidth, top,
       bottom) and converted, because a plate layout is easier to reason
       about than a centre-and-half-height. Repeated stations are creases:
       the zero-area quad between the twin rings contributes no normal, so
       computeVertexNormals stops averaging the deck into the glacis and the
       break comes out hard instead of as a rounded shoulder.
       sq is BELOW 1 so the section squares off - above 1 pinches it in and
       gives the rounded blob this project has produced before. */
    var st = [
      [X_TAIL,      1.62, 1.46, 0.98],
      [-3.800,      1.72, 1.48, 0.90],
      [-3.780,      1.72, 1.48, 0.90],   /* crease: tail plate break       */
      [ 0.300,      1.72, 1.48, 0.90],
      [ 0.320,      1.72, 1.48, 0.90],   /* crease: glacis break           */
      [ 2.100,      1.71, 1.09, 0.86],
      [ 3.200,      1.66, 0.85, 0.70],
      [ 3.800,      1.52, 0.70, 0.60],
      [X_NOSE,      1.34, 0.62, 0.58],
    ];
    var secs = [];
    for (i = 0; i < st.length; i++) {
      secs.push({ x: st[i][0], w: st[i][1],
                  h: (st[i][2] - st[i][3]) * 0.5,
                  zc: (st[i][2] + st[i][3]) * 0.5, sq: 0.09 });
    }
    g.add(new THREE.Mesh(body(THREE, M, secs, 32), T.skinL));

    /* lower tub between the tracks - the loft is the sponson box only, so
       without this the hull is hollow from the belly to the sponson floor */
    box(THREE, g, 7.15, 2.12, 0.48, T.skin, -0.30, 0, Z_BELLY + 0.24);

    /* nose underside: closes the wedge and gives the lower front plate */
    var np = new THREE.Mesh(M.slab(THREE,
      [[3.20, 0.46], [X_NOSE, 0.575], [X_NOSE, 0.74], [3.20, 0.80]], 2.60, "xz"),
      T.skin);
    np.position.y = 1.30;
    g.add(np);

    /* ---- tail plate, exhaust grille and pintle ---- */
    box(THREE, g, 0.09, 3.30, 0.62, T.skin, X_TAIL, 0, 1.17);
    box(THREE, g, 0.09, 2.20, 0.44, T.skin, X_TAIL + 0.01, 0, 0.72);
    /* the grille itself is a recess with horizontal louvres across it */
    box(THREE, g, 0.07, 1.86, 0.50, T.dark, X_TAIL - 0.02, 0, 1.14);
    for (i = 0; i < 6; i++)
      box(THREE, g, 0.05, 1.80, 0.045, T.metal, X_TAIL - 0.055, 0, 0.94 + i * 0.082);
    box(THREE, g, 0.14, 0.26, 0.20, T.metal, X_TAIL - 0.03, 0, 0.64);     /* pintle */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.10, 0.22, 0.20, T.dark, X_TAIL - 0.005, s * 1.46, 1.34);
      box(THREE, g, 0.04, 0.16, 0.14, T.glass, X_TAIL - 0.055, s * 1.46, 1.34);
    }

    /* ---- engine deck: two big louvred grille panels behind the turret -- */
    for (i = 0; i < 2; i++) {
      var gx = -1.95 - i * 1.30;
      box(THREE, g, 1.18, 2.70, 0.06, T.dark, gx, 0, Z_DECK - 0.03);
      for (var k = 0; k < 5; k++)
        box(THREE, g, 0.15, 2.58, 0.05, T.metal, gx - 0.46 + k * 0.23, 0, Z_DECK + 0.015);
    }
    /* deck edge rails, and the fuel filler caps that break the flat top */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.86, 0.10, 0.07, T.skinS, -2.48, s * 1.58, Z_DECK + 0.035);
      post(THREE, g, 0.17, 0.17, 0.05, 10, T.skinS, -1.25, s * 1.05, Z_DECK + 0.03);
    }

    /* ---- glacis fittings ---- */
    /* driver's hatch, on the centreline, with its three periscopes */
    post(THREE, g, 0.30, 0.30, 0.055, 14, T.skinS, 2.62, 0, 0.985);
    for (i = -1; i <= 1; i++) {
      box(THREE, g, 0.11, 0.20, 0.075, T.dark, 2.86, i * 0.30, 1.02);
      box(THREE, g, 0.03, 0.16, 0.055, T.glass, 2.81, i * 0.30, 1.025);
    }
    /* headlight clusters in their brush guards, one each side of the nose */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.20, 0.30, 0.22, T.skinS, 3.53, s * 1.16, 0.70);
      box(THREE, g, 0.04, 0.12, 0.11, T.glass, 3.64, s * 1.23, 0.73);
      box(THREE, g, 0.04, 0.11, 0.09, T.glass, 3.64, s * 1.08, 0.67);
      box(THREE, g, 0.22, 0.04, 0.24, T.metal, 3.55, s * 1.32, 0.70);
    }
    /* tow shackles on the nose and hull front lifting eyes */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.30, 0.13, 0.16, T.metal, 3.86, s * 0.52, 0.70);
      box(THREE, g, 0.14, 0.10, 0.22, T.metal, X_TAIL + 0.02, s * 0.86, 0.80);
    }

    /* ---- front fenders: thin plates over the front of the track, raked to
       lie along the glacis instead of floating clear of it at the nose ---- */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.42, 0.60, 0.22, T.skinS, 2.92, s * 1.50, 0.86, 0.219);
      box(THREE, g, 0.06, 0.60, 0.26, T.skinS, 2.23, s * 1.50, 1.09);
      /* rear mudflap behind the sprocket, and the front skirt flap */
      box(THREE, g, 0.06, 0.60, 0.46, T.rub, -3.62, s * 1.44, 0.42);
      box(THREE, g, 0.05, 0.30, 0.34, T.rub, 3.46, s * 1.69, 0.42);
    }

    /* ---- hull side stowage boxes, sat on the sponson above the skirt --- */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 1.02, 0.42, 0.30, T.skinS, -1.30, s * 1.28, 1.63);
      box(THREE, g, 0.60, 0.38, 0.26, T.skinS, -3.34, s * 1.24, 1.61);
    }
  }

  /* ====================================================== RUNNING GEAR   */
  function buildRunningGear(THREE, g, T) {
    var s, i, j;
    var dx = (WX0 - WX1) / (N_WHEEL - 1);

    /* the belt path in side profile, walked as a closed loop. Writing it as
       a path rather than as two straight slabs is what puts the track UP and
       OVER the raised rear sprocket, which is most of how the rear-drive
       layout reads at a glance. */
    var P = [
      [-2.95, 0.085], [ 2.95, 0.085],
      [ 3.30, 0.28], [ 3.46, 0.52], [ 3.24, 0.83],
      [ 2.55, 0.87], [-2.55, 0.95],
      [-3.05, 1.00], [-3.48, 0.80], [-3.55, 0.50], [-3.24, 0.18]
    ];

    for (s = -1; s <= 1; s += 2) {
      var y = s * TY;

      /* --- belt: one box per path segment, plus pads walked along it --- */
      for (i = 0; i < P.length; i++) {
        var a = P[i], b = P[(i + 1) % P.length];
        var ddx = b[0] - a[0], ddz = b[1] - a[1];
        var len = Math.sqrt(ddx * ddx + ddz * ddz);
        if (len < 1e-4) continue;
        var th = Math.atan2(ddz, ddx);
        box(THREE, g, len + TT * 0.6, BW, TT, T.rub,
            (a[0] + b[0]) * 0.5, y, (a[1] + b[1]) * 0.5, -th);
        /* track pads: the link pattern is the strongest read on a track and
           METAL carries no texture, so it has to be geometry */
        var np = Math.max(1, Math.round(len / 0.34));
        for (j = 0; j < np; j++) {
          var t = (j + 0.5) / np;
          var px = a[0] + ddx * t, pz = a[1] + ddz * t;
          /* the loop is walked counter-clockwise in XZ, so the OUTWARD
             normal is the tangent turned -90 degrees. Getting this backwards
             put the ground pads on top of the belt. */
          var nx = Math.sin(th), nz = -Math.cos(th);
          box(THREE, g, 0.20, BW * 1.04, 0.05, T.dark,
              px + nx * TT * 0.52, y, pz + nz * TT * 0.52, -th);
        }
      }

      /* --- seven road wheels --- */
      for (i = 0; i < N_WHEEL; i++) {
        var wx = WX0 - i * dx;
        wheelCyl(THREE, g, WR, BW * 0.88, 14, T.rub, wx, y, WZ);
        /* the dished aluminium disc, proud of the tyre on the outer face */
        wheelCyl(THREE, g, WR * 0.62, BW * 0.96, 12, T.dark, wx, y, WZ);
        wheelCyl(THREE, g, WR * 0.22, BW * 1.02, 8, T.metal, wx, y, WZ);
        /* torsion-bar arm anchor, so the suspension is not a bare cylinder */
        box(THREE, g, 0.30, 0.10, 0.16, T.dark, wx + 0.22, s * (TY - 0.34), WZ + 0.10);
      }

      /* --- REAR drive sprocket: hub plus real teeth --- */
      wheelCyl(THREE, g, SPR.r, BW * 0.66, 14, T.dark, SPR.x, y, SPR.z);
      wheelCyl(THREE, g, SPR.r * 0.42, BW * 0.90, 10, T.metal, SPR.x, y, SPR.z);
      for (i = 0; i < 12; i++) {
        var ang = i * Math.PI * 2 / 12;
        box(THREE, g, 0.13, BW * 0.60, 0.15, T.metal,
            SPR.x + Math.cos(ang) * SPR.tr, y, SPR.z + Math.sin(ang) * SPR.tr, -ang);
      }
      /* final drive housing where the sprocket meets the hull */
      wheelCyl(THREE, g, 0.30, 0.22, 12, T.skinS, SPR.x, s * (TY - 0.42), SPR.z);

      /* --- front compensating idler --- */
      wheelCyl(THREE, g, IDL.r, BW * 0.80, 14, T.rub, IDL.x, y, IDL.z);
      wheelCyl(THREE, g, IDL.r * 0.52, BW * 0.94, 10, T.dark, IDL.x, y, IDL.z);

      /* --- two return rollers carrying the top run --- */
      for (i = 0; i < 2; i++)
        wheelCyl(THREE, g, 0.115, BW * 0.50, 10, T.dark,
                 1.15 - i * 2.30, y, 0.80);
    }
  }

  /* =========================================================== SKIRTS    */
  function buildSkirts(THREE, M, g, T) {
    var s, i;
    var x0 = -2.95, x1 = 1.28, gap = 0.018;
    var segN = 8, segW = ((x1 - x0) - gap * (segN - 1)) / segN;

    for (s = -1; s <= 1; s += 2) {
      var yc = s * (SK_Y + SK_TH * 0.5);
      /* the hanger rail the segments bolt to, running the whole band */
      box(THREE, g, x1 - x0 + 0.10, SK_TH * 1.5, 0.09, T.skinS,
          (x0 + x1) * 0.5, yc, SK_TOP - 0.02);
      for (i = 0; i < segN; i++) {
        var sx = x0 + segW * 0.5 + i * (segW + gap);
        box(THREE, g, segW, SK_TH, SK_TOP - SK_BOT - 0.09, T.skinS,
            sx, yc, (SK_TOP - 0.09 + SK_BOT) * 0.5);
        /* the bracket at each joint keeps the segmentation reading at zoom */
        box(THREE, g, 0.055, SK_TH * 1.9, SK_TOP - SK_BOT - 0.14, T.dark,
            sx + segW * 0.5 + gap * 0.5, yc, (SK_TOP - 0.09 + SK_BOT) * 0.5);
      }

      /* the heavy front section: deeper than the rest and its bottom edge
         drops away toward the nose, exactly as in the photographs */
      var hp = [[1.26, SK_BOT - 0.06], [3.26, 0.28], [3.48, 0.58],
                [3.48, 0.82], [1.26, SK_TOP]];
      var hm = new THREE.Mesh(M.slab(THREE, hp, SK_TH * 1.5, "xz"), T.skinS);
      hm.position.y = s > 0 ? SK_Y + SK_TH * 1.5 : -SK_Y;
      g.add(hm);
    }
  }

  /* =========================================================== TURRET    */
  function buildTurret(THREE, M, T) {
    var t = new THREE.Group();
    t.name = "turret";                 /* the renderer rotates this by name */
    t.position.set(TUR.x, 0, TUR.z);
    var i, s;

    /* The faceted body. Stations again as (x, halfWidth, top, bottom): the
       plan view sweeps out from the mantlet to the widest point behind the
       sights and then tapers gently into the bustle, while top and bottom
       taper too so the front reads as a wedge in elevation as well as in
       plan. Creases at the widest station and at the bustle join. */
    var st = [
      [-2.55, 1.50, 0.91,  0.17],
      [-2.52, 1.50, 0.91,  0.17],   /* crease: bustle rear plate           */
      [-1.50, 1.64, 0.94,  0.03],
      [ 0.50, 1.66, 0.94, -0.02],   /* widest, sides parallel to here      */
      [ 0.53, 1.66, 0.94, -0.02],   /* crease: the cheeks start here       */
      [ 1.45, 0.99, 0.86,  0.05],
      [ 2.05, 0.52, 0.74,  0.16],
    ];
    var secs = [];
    for (i = 0; i < st.length; i++) {
      secs.push({ x: st[i][0], w: st[i][1],
                  h: (st[i][2] - st[i][3]) * 0.5,
                  zc: (st[i][2] + st[i][3]) * 0.5, sq: 0.08 });
    }
    t.add(new THREE.Mesh(body(THREE, M, secs, 28), T.skinL));

    /* bustle rear plate closes the loft and carries the rack */
    box(THREE, t, 0.09, 2.98, 0.74, T.skinL, -2.57, 0, 0.54);
    /* turret ring skirt, so the bustle does not float over the deck */
    post(THREE, t, 0.94, 0.94, 0.12, 16, T.dark, -0.05, 0, -0.05);

    /* ---- mantlet and the 120 mm M256 smoothbore ---- */
    box(THREE, t, 0.34, 1.02, 0.62, T.skin, 2.10, 0, 0.44);
    tube(THREE, t, 0.20, 0.20, 0.30, 12, T.metal, 2.24, 0, 0.44);
    /* thermal shroud, step down to the bare tube, bore evacuator, muzzle */
    tube(THREE, t, 0.135, 0.135, 1.70, 16, T.metal, 3.20, 0, 0.44);
    tube(THREE, t, 0.080, 0.080, 3.05, 14, T.metal, 4.03, 0, 0.44);
    tube(THREE, t, 0.142, 0.142, 0.66, 14, T.metal, 4.42, 0, 0.44);
    tube(THREE, t, 0.093, 0.093, 0.20, 12, T.metal, GUN_TIP - 0.10, 0, 0.44);
    /* the gun travel lock folded on the glacis is a hull part, not here */

    /* ---- the M1A2 tell: commander's independent thermal viewer, standing
       proud of the roof on its pedestal, forward and LEFT of the cupola --- */
    post(THREE, t, 0.16, 0.19, 0.22, 12, T.metal, 0.52, 0.46, 1.05);
    box(THREE, t, 0.40, 0.36, 0.34, T.skinS, 0.52, 0.46, 1.33);
    box(THREE, t, 0.07, 0.30, 0.22, T.dark,   0.73, 0.46, 1.34);
    box(THREE, t, 0.03, 0.24, 0.17, T.glass,  0.77, 0.46, 1.34);
    box(THREE, t, 0.46, 0.40, 0.05, T.skinS,  0.53, 0.46, 1.52);   /* sun hood */

    /* ---- gunner's primary sight, armoured hood on the roof front right - */
    box(THREE, t, 0.52, 0.46, 0.30, T.skinS, 0.92, -0.52, 1.09);
    box(THREE, t, 0.06, 0.34, 0.24, T.dark,  1.20, -0.52, 1.10);
    box(THREE, t, 0.03, 0.28, 0.19, T.glass, 1.24, -0.52, 1.10);
    /* the gunner's auxiliary sight port beside it */
    box(THREE, t, 0.18, 0.16, 0.14, T.dark,  1.34, -0.16, 1.00);

    /* ---- commander's cupola, right of the centreline, with the M2 ------ */
    var cx = -0.30, cy = -0.74;
    post(THREE, t, 0.50, 0.50, 0.20, 16, T.skinS, cx, cy, 1.03);
    post(THREE, t, 0.40, 0.40, 0.09, 12, T.skinS, cx, cy, 1.17);
    for (i = 0; i < 6; i++) {
      var a = i * Math.PI * 2 / 6 + 0.4;
      box(THREE, t, 0.16, 0.13, 0.11, T.glass,
          cx + Math.cos(a) * 0.47, cy + Math.sin(a) * 0.47, 1.05, -a);
    }
    /* the .50 cal on its ring mount */
    box(THREE, t, 0.14, 0.14, 0.24, T.metal, cx + 0.30, cy, 1.32);
    box(THREE, t, 0.62, 0.14, 0.16, T.metal, cx + 0.46, cy, 1.46);
    tube(THREE, t, 0.045, 0.045, 0.80, 8, T.metal, cx + 1.10, cy, 1.47);
    box(THREE, t, 0.20, 0.26, 0.22, T.dark,   cx + 0.20, cy - 0.16, 1.40);
    box(THREE, t, 0.34, 0.06, 0.30, T.metal,  cx + 0.62, cy + 0.14, 1.52);

    /* ---- loader's hatch and skate-mounted M240, left of the centreline - */
    var lx = -0.18, ly = 0.76;
    post(THREE, t, 0.36, 0.36, 0.07, 14, T.skinS, lx, ly, 0.98);
    post(THREE, t, 0.44, 0.44, 0.05, 12, T.metal, lx, ly, 0.96);
    box(THREE, t, 0.12, 0.12, 0.26, T.metal, lx + 0.40, ly + 0.10, 1.10);
    box(THREE, t, 0.44, 0.10, 0.12, T.metal, lx + 0.56, ly + 0.10, 1.26);
    tube(THREE, t, 0.032, 0.032, 0.50, 8, T.metal, lx + 0.98, ly + 0.10, 1.26);

    /* ---- smoke grenade launchers on both front cheeks ---- */
    for (s = -1; s <= 1; s += 2) {
      var bank = new THREE.Group();
      bank.position.set(1.30, s * 1.07, 0.60);
      bank.rotation.z = s * 0.90;
      bank.rotation.y = -0.18;
      box(THREE, bank, 0.10, 0.62, 0.30, T.skinS, 0, 0, 0);
      for (i = 0; i < 6; i++)
        tube(THREE, bank, 0.052, 0.052, 0.20, 6, T.dark,
             0.14, -0.22 + (i % 3) * 0.22, (i < 3 ? -0.07 : 0.07));
      t.add(bank);
    }

    /* ---- the deep stowage bustle rack: open tubular basket on the tail - */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, t, 0.05, 0.05, 0.64, T.metal, -2.63, s * 1.36, 0.56);
      box(THREE, t, 0.05, 0.05, 0.64, T.metal, -3.02, s * 1.14, 0.56);
      box(THREE, t, 0.45, 0.05, 0.05, T.metal, -2.83, s * 1.25, 0.87);
      box(THREE, t, 0.45, 0.05, 0.05, T.metal, -2.83, s * 1.25, 0.28);
      /* side stowage box carried on the turret flank */
      box(THREE, t, 1.30, 0.24, 0.44, T.skinS, -1.10, s * 1.71, 0.60);
    }
    for (i = 0; i < 3; i++)
      box(THREE, t, 0.05, 2.42, 0.05, T.metal, -3.02, 0, 0.30 + i * 0.29);
    box(THREE, t, 0.42, 2.46, 0.04, T.dark, -2.83, 0, 0.28);   /* rack floor */

    /* ---- roof furniture: blowout panel lids, lifting eyes, aerials ----- */
    for (s = -1; s <= 1; s += 2) {
      /* the two ammunition blowout panels, the whole rear half of the roof */
      box(THREE, t, 1.30, 0.66, 0.06, T.skinS, -1.80, s * 0.66, 0.95);
      box(THREE, t, 0.14, 0.10, 0.16, T.metal, 0.40, s * 1.42, 1.00);
      box(THREE, t, 0.14, 0.10, 0.16, T.metal, -2.30, s * 1.24, 0.96);
      /* whip aerial at the bustle corner */
      box(THREE, t, 0.13, 0.13, 0.16, T.dark, -2.34, s * 1.38, 1.00);
      post(THREE, t, 0.019, 0.010, 1.00, 6, T.dark, -2.34, s * 1.38, 1.58);
    }
    /* wind sensor mast on the bustle roof */
    post(THREE, t, 0.030, 0.030, 0.44, 6, T.metal, -1.10, 0, 1.16);
    box(THREE, t, 0.22, 0.12, 0.10, T.dark, -1.10, 0, 1.42);

    /* ---- team flashes, so ownership reads on a busy map ---- */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, t, 0.62, 0.05, 0.17, T.team, -0.30, s * 1.69, 0.74);
      box(THREE, t, 0.46, 0.05, 0.15, T.team, -1.10, s * 1.84, 0.60);
    }
    box(THREE, t, 0.07, 0.74, 0.17, T.team, -2.60, 0, 0.74);
    return t;
  }

  /* ============================================================ BUILD    */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = makeMats(THREE, C);

    buildHull(THREE, M, g, T);
    buildRunningGear(THREE, g, T);
    buildSkirts(THREE, M, g, T);
    g.add(buildTurret(THREE, M, T));

    /* hull team flashes: front and rear so the owner reads from any bearing */
    var s;
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 0.62, 0.05, 0.17, T.team, 2.55, s * 1.86, 0.72);
      box(THREE, g, 0.48, 0.05, 0.15, T.team, -3.05, s * 1.76, 1.30);
    }
    box(THREE, g, 0.06, 0.62, 0.15, T.team, X_TAIL - 0.02, 0, 1.40);

    g.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    return g;
  }

  return { build: build };
})();

/* Registration. Overwrite unconditionally: a hero model is meant to replace
   whatever parametric version already claimed this id.
   len is the model's real overall extent, gun forward: 9.77 m.            */
UNIT_MODELS["nato_e90_mbt"] = {
  len: 9.77,
  build: function (THREE, M, C) { return HeroAbrams.build(THREE, M, C); }
};
