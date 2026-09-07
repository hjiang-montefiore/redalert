/* ============ hero/kpa_e50_mbt.js - T-34-85 (KPA, e50) ============
   HERO reference model. Hand-built to a higher standard than the parametric
   roster; the e50 armour models are meant to be tuned to match this one.

   Model space follows models3d.js: +X nose, +Y left, +Z up, real metres.
   render3d.js applies rotation.x = -PI/2 and rescales by measured length, so
   this file is authored Z-up and NEVER Y-up.

   The period cues this model exists to carry:
     - Christie suspension: five very large road wheels almost touching, and
       NO return rollers, so the upper track run lies straight across the
       wheel tops and sags between them.
     - Sharply sloped glacis breaking to a flat deck right at the turret.
     - Rounded cast turret, flat roof, set well forward on the hull.
     - 85mm ZiS-S-53 with a plain muzzle - no brake, no bore evacuator.
     - External cylindrical fuel drums on the rear hull sides.
     - The T-34 hull box: a narrow tub between the tracks, a sponson that
       overhangs the track, and upper side plates that slope steeply INWARD
       to a deck barely wider than the turret ring. The hull is TALL - the
       deck sits at 1.66 m, two thirds of the way to the top of the cupola.

   Every dimension below was measured off ref/t3485_ortho.png (a scaled
   orthographic side elevation) at 249 px/m, the scale fixed independently by
   the 0.83 m road wheel and by the 2.72 m overall height. Cross-checked
   against ref/t3485_a.jpg (head-on) and ref/t3485_b.jpg (three-quarter rear).

   Measured off that drawing:  ground 0.00, track upper run 0.96,
   fender/sponson top 1.20, hull deck 1.66, turret roof 2.51, cupola 2.72,
   gun axis 2.07, road wheel axle 0.50, wheel dia 0.83, sprocket dia 0.62,
   idler dia 0.50, hull 6.10 over the mudguards, 3.00 over the sponsons.   */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  /* ------------------------------------------------------------ constants */
  var OLIVE = 0x4a5236;          /* PAINT.olive from js/armour3d.js         */

  var Z_BELLY = 0.40;            /* ground clearance                        */
  var Z_TUB   = 0.94;            /* top of the narrow tub / sponson floor   */
  var Z_SPON  = 1.20;            /* sponson + fender top surface            */
  var Z_DECK  = 1.66;            /* hull roof                               */
  var Y_LOW   = 0.98;            /* half width of the tub between tracks    */
  var Y_SPON  = 1.50;            /* sponson outer edge, 3.00 m over all     */
  var Y_DECK  = 1.05;            /* half width of the roof                  */

  var TRK_Y   = 1.25;            /* track centreline                        */
  var TRK_W   = 0.50;
  var TRK_T   = 0.085;           /* track band thickness                    */
  var WHEEL_R = 0.415;
  var WHEEL_Z = 0.50;            /* road wheel axle height                  */
  var TOP_Z   = WHEEL_Z + WHEEL_R + TRK_T * 0.5;   /* upper run centreline  */
  var WHEEL_X = [1.93, 1.00, 0.04, -0.90, -1.84];

  var IDL_X = 2.58, IDL_R = 0.25, IDL_Z = 0.66;
  var SPR_X = -2.60, SPR_R = 0.31, SPR_Z = 0.64;

  var TUR_X = 0.57;              /* turret ring centre on the hull          */
  var GLA_X0 = 1.82, GLA_X1 = 2.90, GLA_Z1 = 1.04;
  var GLA_SLOPE = (Z_DECK - GLA_Z1) / (GLA_X1 - GLA_X0);   /* 0.574 = 60 deg
                                    from vertical, the T-34 glacis angle    */
  var GLA_TILT = Math.atan(GLA_SLOPE);   /* rotation.y to lie on the glacis */

  function glacisZ(x) { return Z_DECK - (x - GLA_X0) * GLA_SLOPE; }

  /* ------------------------------------------------------------- materials
     Exactly three tiers: SKIN (painted, textured), METAL (running gear,
     barrels, fittings; track pads are METAL at roughness 0.95), GLASS.

     A note on colour that cost an afternoon: this renderer runs ACES tone
     mapping under a 1.4 key light, which eats saturation. Painting the
     canvas with the literal PAINT.olive hex came back on screen as a pale
     grey-green, and every 0.5-metalness fitting blew out to near white. So
     the canvas is painted a more saturated 4BO than the hex suggests, and
     every metal here sits at the DARK, LOW-metalness end of the tier.      */
  var skinCache = null, markCache = null;

  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* shared weathering pass so the paint and the marking sheet agree */
  function weather(g, W, H, R, strength) {
    var i;
    /* dirt: heaviest along the belly band, which every prism in this file
       maps to v -> 0 and v -> 1 (the section polygons all start at the
       bottom of the body) */
    var lo = g.createLinearGradient(0, H * 0.70, 0, H);
    lo.addColorStop(0, "rgba(116,100,70,0)");
    lo.addColorStop(1, "rgba(116,100,70," + (0.55 * strength) + ")");
    g.fillStyle = lo; g.fillRect(0, H * 0.70, W, H * 0.30);
    var hi = g.createLinearGradient(0, H * 0.30, 0, 0);
    hi.addColorStop(0, "rgba(116,100,70,0)");
    hi.addColorStop(1, "rgba(116,100,70," + (0.55 * strength) + ")");
    g.fillStyle = hi; g.fillRect(0, 0, W, H * 0.30);

    /* mud thrown up the sides and rain-run streaks */
    for (i = 0; i < 110; i++) {
      g.fillStyle = "rgba(108,92,64," + (0.18 * strength) + ")";
      g.fillRect(R() * W, H * (R() < 0.5 ? 0.82 : 0.02), 4 + R() * 26, 8 + R() * 40);
    }
    for (i = 0; i < 150; i++) {
      /* Keep these short. Long ones survive the piecewise-affine UV of a
         two-triangle quad as a kinked line and read as a crack in the plate. */
      g.fillStyle = "rgba(28,28,20," + (0.09 * strength) + ")";
      g.fillRect(R() * W, R() * H, 1 + R() * 2, 6 + R() * 26);
    }
    /* exhaust soot: the rear of every body in this file sits at u -> 0 */
    var so = g.createLinearGradient(0, 0, W * 0.20, 0);
    so.addColorStop(0, "rgba(22,20,18," + (0.52 * strength) + ")");
    so.addColorStop(1, "rgba(22,20,18,0)");
    g.fillStyle = so; g.fillRect(0, 0, W * 0.20, H);
    for (i = 0; i < 40; i++) {
      g.fillStyle = "rgba(20,18,16," + (0.26 * strength) + ")";
      g.fillRect(R() * W * 0.22, R() * H, 3 + R() * 16, 16 + R() * 70);
    }
  }

  /* seams, bolt rows and cast orange-peel, shared by both sheets */
  function plating(g, W, H, R, ink) {
    var i, s, t, q;
    function seam(x0, y0, x1, y1) {
      g.strokeStyle = "rgba(20,22,16," + (0.42 * ink) + ")"; g.lineWidth = 2.6;
      g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      g.strokeStyle = "rgba(126,134,102," + (0.34 * ink) + ")"; g.lineWidth = 1.3;
      g.beginPath(); g.moveTo(x0, y0 - 1.7); g.lineTo(x1, y1 - 1.7); g.stroke();
    }
    var vSeam = [0.055, 0.140, 0.300, 0.430, 0.560, 0.700, 0.860, 0.945];
    for (s = 0; s < vSeam.length; s++) seam(0, vSeam[s] * H, W, vSeam[s] * H + (R() - 0.5) * 5);
    for (t = 0; t < 9; t++) {
      var xx = (0.06 + t * 0.11) * W;
      seam(xx, 0, xx + (R() - 0.5) * 6, H);
    }
    /* bolt and rivet rows along the seams - geometry would be invisible at
       RTS zoom, so they live here, as the DETAIL RULE demands */
    for (i = 0; i < vSeam.length; i++) {
      var ry = vSeam[i] * H + 5;
      g.fillStyle = "rgba(18,20,14," + (0.42 * ink) + ")";
      for (q = 0; q < 52; q++) {
        g.beginPath(); g.arc(8 + q * (W / 52) + (R() - 0.5) * 4, ry, 1.9, 0, 6.29); g.fill();
      }
      g.fillStyle = "rgba(134,142,110," + (0.26 * ink) + ")";
      for (q = 0; q < 52; q++) g.fillRect(8 + q * (W / 52), ry - 1.4, 1.6, 1.6);
    }
    /* cast-armour orange peel */
    for (i = 0; i < 2600; i++) {
      g.fillStyle = R() < 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.045)";
      g.fillRect(R() * W, R() * H, 1 + R() * 2, 1 + R() * 2);
    }
  }

  function skinTexture(THREE) {
    if (skinCache !== null) return skinCache;
    try {
      var W = 1024, H = 512, i;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var R = rng(3485);

      /* 4BO Soviet green, pushed up in saturation to survive tone mapping */
      g.fillStyle = "#414a25"; g.fillRect(0, 0, W, H);
      var tone = ["#495226", "#394221", "#4e582c", "#333c1f"];
      for (i = 0; i < 46; i++) {
        g.globalAlpha = 0.22 + R() * 0.20;
        g.fillStyle = tone[(R() * tone.length) | 0];
        g.beginPath();
        g.ellipse(R() * W, R() * H, 30 + R() * 130, 18 + R() * 70, R() * 3.14, 0, 6.29);
        g.fill();
      }
      g.globalAlpha = 1;

      plating(g, W, H, R, 1.0);
      weather(g, W, H, R, 1.0);

      /* paint chipped back to primer on the sharp edges */
      for (i = 0; i < 220; i++) {
        g.fillStyle = R() < 0.6 ? "rgba(74,62,44,0.34)" : "rgba(96,92,80,0.24)";
        g.fillRect(R() * W, R() * H, 2 + R() * 7, 2 + R() * 4);
      }

      var tex = new THREE.CanvasTexture(cv);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = 8;
      skinCache = tex;
    } catch (err) { skinCache = null; }
    return skinCache;
  }

  /* A near-white sheet carrying the same seams and dirt, so a team flash can
     be tinted to C.team by the material colour and still read as painted
     metal rather than as a flat decal. */
  function markTexture(THREE) {
    if (markCache !== null) return markCache;
    try {
      var W = 256, H = 256;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var R = rng(85085);
      g.fillStyle = "#7a7a76"; g.fillRect(0, 0, W, H);
      plating(g, W, H, R, 0.55);
      weather(g, W, H, R, 0.65);
      var tex = new THREE.CanvasTexture(cv);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) tex.encoding = THREE.sRGBEncoding;
      markCache = tex;
    } catch (err) { markCache = null; }
    return markCache;
  }

  function skinMat(THREE, ru, rv) {
    /* Repeats are not free here. Every prism and loft in this file lays v
       around the section perimeter starting at the BOTTOM of the body and u
       along its length starting at the REAR, and the sheet is painted with
       belly dirt at v -> 0 and 1 and exhaust soot at u -> 0. So a repeat of
       exactly 1 puts the dirt on the belly and the soot on the tail, and any
       other value drags one of them somewhere it does not belong: 1.5 walked
       the dirt band straight across the turret roof and 0.42 sampled nothing
       but the sooty corner. Only flat slabs, whose UVs are raw metres and
       already span the sheet many times over, want anything else. */
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.86, metalness: 0.06 });
    var t = skinTexture(THREE);
    if (t) {
      if (ru !== undefined) {
        t = t.clone(); t.needsUpdate = true;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(ru, rv);
      }
      m.map = t;
    } else { m.color.setHex(OLIVE); }
    return m;
  }
  function teamMat(THREE, col) {
    var m = new THREE.MeshStandardMaterial({
      color: col, roughness: 0.88, metalness: 0.05 });
    var t = markTexture(THREE);
    if (t) m.map = t;
    return m;
  }
  function metalMat(THREE, c, r, mt) {
    return new THREE.MeshStandardMaterial({
      color: c === undefined ? 0x30342f : c,
      roughness: r === undefined ? 0.62 : r,
      metalness: mt === undefined ? 0.36 : mt });
  }
  function glassMat(THREE) {
    var G = THREE.MeshPhysicalMaterial || THREE.MeshStandardMaterial;
    return new G({ color: 0x16222a, roughness: 0.10, metalness: 0.20,
      transparent: true, opacity: 0.82 });
  }

  /* --------------------------------------------------------------- helpers
     M.loft only takes superelliptical sections symmetric about zc, which
     cannot describe either the T-34's hexagonal hull (narrow tub, sponson
     ledge, inward-sloping upper plates) or its cast turret (flat roof over
     sides that flare outward as they go down). This lofts arbitrary YZ
     polygons instead, using exactly M.loft's winding and UV convention so
     normals and paint line up with everything else in the file. A point
     repeated in the polygon becomes a hard crease, because
     computeVertexNormals averages per index and a duplicated position is
     given its own index; a station repeated at the same x creases across
     the body the same way.                                                */
  /* Reverse a geometry's triangle winding so its faces point outward.

     M.loft in js/models3d.js emits its side quads as (a, c, b) with the
     stations running in +x and the ring running +Y -> +Z -> -Y, which makes
     every face point INTO the body: put a bright sphere inside a lofted tube
     and back-face culling shows you the sphere through the skin. That is
     invisible on a plain convex fuselage, because you simply see the far wall
     instead of the near one, but it is not invisible here - the turret ring
     collar sat 0.9 m under the turret roof and rendered straight through it.
     models3d.js is not mine to change, so anything this file gets back from
     M.loft is turned outward-facing here, and prism() below emits the correct
     winding to begin with. */
  function faceOut(geo) {
    var ix = geo.index, arr = ix && (ix.array || ix), i, t;
    if (arr) {
      for (i = 0; i < arr.length; i += 3) { t = arr[i + 1]; arr[i + 1] = arr[i + 2]; arr[i + 2] = t; }
      if (ix.needsUpdate !== undefined) ix.needsUpdate = true;
    }
    if (geo.computeVertexNormals) geo.computeVertexNormals();
    return geo;
  }

  function prism(THREE, stations) {
    var n = stations[0].p.length, i, j;
    var pos = [], uv = [], idx = [];
    var x0 = stations[0].x, x1 = stations[stations.length - 1].x;
    for (i = 0; i < stations.length; i++) {
      var st = stations[i], acc = [0], per = 0;
      for (j = 0; j < n; j++) {
        var a = st.p[j], b = st.p[(j + 1) % n];
        per += Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        acc.push(per);
      }
      if (per <= 0) per = 1;
      for (j = 0; j <= n; j++) {
        var q = st.p[j % n];
        pos.push(st.x, q[0], q[1]);
        uv.push((st.x - x0) / (x1 - x0), acc[j] / per);
      }
    }
    var ring = n + 1;
    for (i = 0; i < stations.length - 1; i++)
      for (j = 0; j < n; j++) {
        var aa = i * ring + j, bb = aa + 1, cc = aa + ring, dd = cc + 1;
        idx.push(aa, bb, cc, bb, dd, cc);   /* outward, see faceOut above */
      }
    function cap(si, front) {
      var st = stations[si], cy = 0, cz = 0, k;
      for (k = 0; k < n; k++) { cy += st.p[k][0]; cz += st.p[k][1]; }
      var base = pos.length / 3;
      pos.push(st.x, cy / n, cz / n); uv.push(0.5, 0.5);
      for (k = 0; k < n; k++) {
        pos.push(st.x, st.p[k][0], st.p[k][1]);
        uv.push(0.5 + st.p[k][0] * 0.10, 0.5 + st.p[k][1] * 0.10);
      }
      for (k = 0; k < n; k++) {
        var u1 = base + 1 + k, u2 = base + 1 + ((k + 1) % n);
        if (front) idx.push(base, u1, u2); else idx.push(base, u2, u1);
      }
    }
    cap(0, false); cap(stations.length - 1, true);

    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  function box(THREE, sx, sy, sz, mat, x, y, z) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(x, y, z);
    return m;
  }
  /* cylinder with its axle along +Y - the natural axis for road wheels */
  function wheelCyl(THREE, rt, rb, w, seg, mat, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, w, seg), mat);
    m.position.set(x, y, z);
    return m;
  }
  /* cylinder lying along +X - gun tubes, fuel drums, exhaust stubs */
  function tubeX(THREE, rt, rb, len, seg, mat, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, len, seg), mat);
    m.rotation.z = -Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }
  /* cylinder standing on +Z - cupolas, hatches, filler caps */
  function tubeZ(THREE, rt, rb, len, seg, mat, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, len, seg), mat);
    m.rotation.x = Math.PI / 2;
    m.position.set(x, y, z);
    return m;
  }

  /* ------------------------------------------------------------------ hull
     Cross section listed counter-clockwise in the YZ plane, matching the
     order M.loft walks its rings, so the winding agrees with every lofted
     body here. Corners are doubled: this is a welded plate hull and the
     plate edges must stay crisp instead of smoothing into a loaf.

       (yLow,zBot) --- up the tub side --- (yLow,zTub)
       --- out under the sponson --------- (ySpon,zTub)
       --- up the sponson side ----------- (ySpon,zSpon)
       --- in and up the sloped plate ---- (yDeck,zTop)  ... and mirrored.  */
  function section(yLow, zBot, zTub, ySpon, zSpon, yDeck, zTop) {
    var p = [];
    function add(y, z) { p.push([y, z]); p.push([y, z]); }
    add(yLow, zBot);
    add(yLow, zTub);
    add(ySpon, zTub);
    add(ySpon, zSpon);
    add(yDeck, zTop);
    add(-yDeck, zTop);
    add(-ySpon, zSpon);
    add(-ySpon, zTub);
    add(-yLow, zTub);
    add(-yLow, zBot);
    return p;
  }

  /*  x      yLow  zBot  zTub  ySpon zSpon yDeck zTop                       */
  var HULL = [
    [-2.96, 0.62, 0.98, 1.06, 1.06, 1.10, 0.88, 1.14],  /* rear beam        */
    [-2.90, 0.86, 0.72, 0.94, 1.34, 1.14, 0.98, 1.22],  /* sloped rear plate*/
    [-2.74, 0.96, 0.52, 0.94, 1.48, 1.19, 1.02, 1.34],
    [-2.62, 0.98, 0.46, 0.94, 1.50, 1.20, 1.03, 1.38],
    [-2.30, 0.98, 0.42, 0.94, 1.50, 1.20, 1.04, 1.45],  /* rear deck slope  */
    [-1.80, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.56],
    [-1.32, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],
    [-1.32, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],  /* crease: deck edge*/
    [-0.80, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],
    [-0.20, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],
    [ 0.40, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],
    [ 1.00, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],
    [ 1.45, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],
    [ 1.82, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],
    [ 1.82, 0.98, 0.40, 0.94, 1.50, 1.20, 1.05, 1.66],  /* crease: glacis   */
    [ 2.02, 0.98, 0.415, 0.94, 1.50, 1.20, 1.12, 1.55], /* glacis, 60 deg   */
    [ 2.20, 0.98, 0.435, 0.94, 1.50, 1.20, 1.20, 1.44],
    [ 2.40, 0.97, 0.490, 0.94, 1.49, 1.19, 1.29, 1.33],
    [ 2.55, 0.96, 0.545, 0.94, 1.48, 1.17, 1.36, 1.24],
    [ 2.80, 0.90, 0.710, 0.95, 1.40, 1.08, 1.40, 1.10],
    [ 2.90, 0.80, 0.860, 0.96, 1.24, 1.00, 1.22, 1.04],
    [ 2.96, 0.62, 0.940, 0.98, 1.02, 0.99, 0.98, 1.01]  /* nose beam        */
  ];

  function buildHull(THREE, skin) {
    var st = [], i;
    for (i = 0; i < HULL.length; i++) {
      var h = HULL[i];
      st.push({ x: h[0], p: section(h[1], h[2], h[3], h[4], h[5], h[6], h[7]) });
    }
    return new THREE.Mesh(prism(THREE, st), skin);
  }

  /* ---------------------------------------------------------------- turret
     A cast turret is not a superellipse. Seen head-on the T-34-85's turret
     is a trapezoid: a flat roof, sides that flare outward all the way down
     to the widest point just above the ring, and a soft radius everywhere
     the faces meet. Seen from above it is a rounded hexagon, blunt at the
     bustle and drawn in to a narrow front around the mantlet aperture.

     Local space: origin at the turret ring centre, z = 0 on the hull deck. */
  function turSection(wB, wR, zB, zT) {
    /* one side, bottom to top; f is the fraction of the way up the wall */
    var side = [
      [wB * 0.90, zB],
      [wB * 1.00, zB + 0.05],
      [wB * 1.00, zB + 0.22],
      [wB * 1.00, zB + 0.42 * (zT - zB)],
      [wB + (wR - wB) * 0.62, zB + 0.66 * (zT - zB)],
      [wR, zT - 0.13],
      [wR * 0.94, zT - 0.035]
    ];
    var p = [], i;
    p.push([side[0][0], side[0][1]]);          /* crease at the bottom edge */
    for (i = 0; i < side.length; i++) p.push([side[i][0], side[i][1]]);
    p.push([wR * 0.72, zT]); p.push([wR * 0.72, zT]);     /* flat roof edge */
    p.push([-wR * 0.72, zT]); p.push([-wR * 0.72, zT]);
    for (i = side.length - 1; i >= 0; i--) p.push([-side[i][0], side[i][1]]);
    p.push([-side[0][0], side[0][1]]);
    return p;
  }

  /*  x      wBase wRoof zBot   zTop                                        */
  var TUR = [
    [-1.42, 0.50, 0.42,  0.070, 0.815],   /* blunt vertical bustle face    */
    [-1.38, 0.66, 0.56,  0.065, 0.825],
    [-1.25, 0.80, 0.68,  0.050, 0.830],   /* the bustle overhangs the deck */
    [-1.05, 0.89, 0.74,  0.020, 0.832],
    [-0.75, 0.95, 0.78, -0.030, 0.832],
    [-0.35, 0.97, 0.79, -0.050, 0.832],
    [ 0.05, 0.97, 0.79, -0.050, 0.832],
    [ 0.40, 0.95, 0.77, -0.050, 0.830],
    [ 0.68, 0.90, 0.72, -0.050, 0.825],
    [ 0.90, 0.83, 0.66, -0.050, 0.815],
    [ 1.06, 0.72, 0.57, -0.040, 0.796],   /* the brow drops to the mantlet */
    [ 1.18, 0.56, 0.45, -0.030, 0.760],
    [ 1.26, 0.36, 0.30, -0.020, 0.712],
    [ 1.30, 0.18, 0.16, -0.010, 0.662]
  ];

  function buildTurret(THREE, M, C, skin, metal, glass) {
    var T = new THREE.Group();
    T.name = "turret";                       /* the renderer spins this */
    var i, s;

    var st = [];
    for (i = 0; i < TUR.length; i++)
      st.push({ x: TUR[i][0], p: turSection(TUR[i][1], TUR[i][2], TUR[i][3], TUR[i][4]) });
    T.add(new THREE.Mesh(prism(THREE, st), skin));

    /* turret ring: a shallow collar so the casting does not look glued on */
    T.add(tubeZ(THREE, 0.72, 0.74, 0.14, 20, metal(0x0c0e08, 0.62, 0.35), 0, 0, -0.10));

    /* commander's cupola, left of the roof centreline and set back */
    var cupX = -0.34, cupY = 0.42, ROOF = 0.832;
    T.add(tubeZ(THREE, 0.30, 0.32, 0.20, 20, skin, cupX, cupY, ROOF + 0.10));
    T.add(tubeZ(THREE, 0.285, 0.30, 0.06, 20, skin, cupX, cupY, ROOF + 0.23));
    for (i = 0; i < 5; i++) {
      var a = -1.05 + i * 0.62;
      var sl = box(THREE, 0.09, 0.12, 0.060, glass,
        cupX + Math.cos(a) * 0.305, cupY + Math.sin(a) * 0.305, ROOF + 0.11);
      sl.rotation.z = a;
      T.add(sl);
    }
    /* loader's round hatch, right side, further back */
    T.add(tubeZ(THREE, 0.26, 0.275, 0.07, 18, skin, -0.62, -0.40, ROOF + 0.032));
    T.add(box(THREE, 0.16, 0.06, 0.045, metal(0x15180e), -0.40, -0.40, ROOF + 0.075));

    /* roof periscopes - small, but they break an otherwise blank roof line */
    T.add(box(THREE, 0.17, 0.23, 0.09, skin, 0.22, 0.40, ROOF + 0.043));
    T.add(box(THREE, 0.03, 0.14, 0.045, glass, 0.305, 0.40, ROOF + 0.055));
    T.add(box(THREE, 0.17, 0.23, 0.085, skin, 0.10, -0.42, ROOF + 0.040));

    /* cast lifting eyes on the shoulders, and grab rails down the flanks */
    for (s = -1; s <= 1; s += 2) {
      T.add(box(THREE, 0.19, 0.07, 0.10, metal(0x16190f), -0.70, s * 0.80, ROOF - 0.02));
      T.add(box(THREE, 0.19, 0.07, 0.10, metal(0x16190f), 0.62, s * 0.76, ROOF - 0.02));
      T.add(box(THREE, 0.62, 0.055, 0.05, metal(0x14170f), -0.20, s * 0.99, 0.30));
    }

    /* whip aerial on the roof - a 1950 tank silhouette cue */
    T.add(tubeZ(THREE, 0.055, 0.075, 0.12, 8, metal(0x14170f), -1.02, 0.60, ROOF + 0.06));
    T.add(tubeZ(THREE, 0.008, 0.020, 1.30, 6, metal(0x0d0f08, 0.60, 0.40), -1.02, 0.60, ROOF + 0.75));

    /* ------------------------------------------------------- mantlet + gun
       The gun axis sits at local z 0.41, which is 2.07 m over the ground -
       the height measured off the side elevation.                         */
    var GZ = 0.35;
    var mSecs = [
      { x: 1.08, w: 0.44, h: 0.30, zc: GZ, sq: 0.60 },
      { x: 1.26, w: 0.48, h: 0.33, zc: GZ, sq: 0.70 },
      { x: 1.42, w: 0.44, h: 0.30, zc: GZ, sq: 0.80 },
      { x: 1.55, w: 0.28, h: 0.21, zc: GZ, sq: 0.95 },
      { x: 1.62, w: 0.12, h: 0.10, zc: GZ, sq: 1.00 }
    ];
    T.add(new THREE.Mesh(faceOut(M.loft(THREE, mSecs, 22)), skinMat(THREE)));

    var gunM = metal(0x14170f, 0.56, 0.42);
    /* armoured collar where the tube leaves the mantlet */
    T.add(tubeX(THREE, 0.104, 0.132, 0.36, 16, gunM, 1.73, 0, GZ));
    /* 85mm ZiS-S-53: a long plain tube. NO muzzle brake, no bore evacuator,
       no fume extractor - that absence is the period cue. */
    T.add(tubeX(THREE, 0.060, 0.086, 2.66, 16, gunM, 3.22, 0, GZ));
    /* the only muzzle feature is the reinforcing band at the lip */
    T.add(tubeX(THREE, 0.068, 0.068, 0.09, 16, gunM, 4.50, 0, GZ));

    /* team flashes on both turret cheeks, tilted onto the sloping side, and
       one on the roof so ownership reads from directly overhead */
    if (C && C.team) {
      var team = teamMat(THREE, C.team);
      for (s = -1; s <= 1; s += 2) {
        var fl = box(THREE, 0.56, 0.035, 0.22, team, -0.42, s * 0.950, 0.44);
        fl.rotation.x = s * 0.42;
        T.add(fl);
      }
      T.add(box(THREE, 0.30, 0.40, 0.035, team, -1.06, -0.16, ROOF + 0.015));
    }

    T.position.set(TUR_X, 0, Z_DECK);
    return T;
  }

  /* ---------------------------------------------------------- running gear
     Five very large road wheels almost touching, and nothing at all above
     them. The absence of return rollers is half of what says "Christie".  */
  function buildRunningGear(THREE, g, skin, metal) {
    var rubber = metal(0x060607, 0.95, 0.04);
    var steel = metal(0x131611, 0.58, 0.44);
    var hubM = metal(0x0e1009, 0.60, 0.40);
    var side, i;

    for (side = -1; side <= 1; side += 2) {
      var yOut = side * (TRK_Y + 0.135);
      var yIn = side * (TRK_Y - 0.135);

      for (i = 0; i < WHEEL_X.length; i++) {
        var x = WHEEL_X[i];
        /* dished disc wheels in pairs, rubber tyred, the gap between each
           pair swallowing the track's centre guide horns */
        g.add(wheelCyl(THREE, WHEEL_R, WHEEL_R, 0.145, 16, rubber, x, yOut, WHEEL_Z));
        g.add(wheelCyl(THREE, 0.362, 0.362, 0.172, 16, skin, x, yOut, WHEEL_Z));
        g.add(wheelCyl(THREE, 0.110, 0.130, 0.090, 10, hubM, x, yOut + side * 0.10, WHEEL_Z));
        g.add(wheelCyl(THREE, WHEEL_R, WHEEL_R, 0.145, 12, rubber, x, yIn, WHEEL_Z));
        g.add(wheelCyl(THREE, 0.362, 0.362, 0.172, 12, skin, x, yIn, WHEEL_Z));
        /* swing arm running back to the hull side; the Christie coil springs
           it works against live inside the sponson, out of sight */
        var arm = box(THREE, 0.13, 0.10, 0.36, steel, x + 0.05, side * 1.00, WHEEL_Z + 0.20);
        arm.rotation.y = 0.28 * (x > 0 ? 1 : -1);
        g.add(arm);
      }

      /* front idler: smaller than a road wheel and mounted higher, so the
         track climbs to meet it */
      g.add(wheelCyl(THREE, IDL_R, IDL_R, 0.145, 14, rubber, IDL_X, yOut, IDL_Z));
      g.add(wheelCyl(THREE, 0.200, 0.200, 0.172, 14, skin, IDL_X, yOut, IDL_Z));
      g.add(wheelCyl(THREE, IDL_R, IDL_R, 0.145, 10, rubber, IDL_X, yIn, IDL_Z));
      g.add(wheelCyl(THREE, 0.200, 0.200, 0.172, 10, skin, IDL_X, yIn, IDL_Z));
      g.add(wheelCyl(THREE, 0.080, 0.090, 0.080, 8, hubM, IDL_X, yOut + side * 0.10, IDL_Z));

      /* rear drive sprocket: the T-34's roller type - two plates with six
         rollers between them, not cut teeth */
      g.add(wheelCyl(THREE, 0.290, 0.290, 0.050, 16, skin, SPR_X, yOut, SPR_Z));
      g.add(wheelCyl(THREE, 0.290, 0.290, 0.050, 14, skin, SPR_X, yIn, SPR_Z));
      g.add(wheelCyl(THREE, 0.115, 0.125, 0.32, 10, hubM, SPR_X, side * TRK_Y, SPR_Z));
      for (i = 0; i < 6; i++) {
        var a2 = i * Math.PI / 3 + 0.26;
        /* the six lightening holes, sunk just proud of the plate */
        g.add(wheelCyl(THREE, 0.070, 0.070, 0.062, 8, hubM,
          SPR_X + Math.cos(a2) * 0.190, yOut + side * 0.006, SPR_Z + Math.sin(a2) * 0.190));
        /* and the drive rollers the track links ride on, between the plates */
        g.add(wheelCyl(THREE, 0.048, 0.048, 0.24, 6, steel,
          SPR_X + Math.cos(a2) * 0.278, side * TRK_Y, SPR_Z + Math.sin(a2) * 0.278));
      }
    }
  }

  /* ---------------------------------------------------------------- tracks
     Built from an explicit path so the upper run can lie flat across the
     road wheel tops and sag between them. With no return rollers that sag
     is the whole point - it is how a Christie suspension reads.           */
  function trackPath() {
    var p = [], i, a;
    var rI = IDL_R + TRK_T * 0.5, rS = SPR_R + TRK_T * 0.5;

    /* ground contact run, front to rear */
    for (i = 0; i <= 8; i++)
      p.push([WHEEL_X[0] - (WHEEL_X[0] - WHEEL_X[4]) * (i / 8), TRK_T * 0.5]);
    /* climb off the ground toward the sprocket */
    p.push([-2.15, 0.115]);
    p.push([-2.45, 0.215]);
    /* wrap the sprocket from below-rear round to the top of the upper run */
    for (i = 0; i <= 9; i++) {
      a = -1.25 + i * ((Math.PI / 2 + 1.25) / 9);
      p.push([SPR_X - Math.cos(a) * rS, SPR_Z + Math.sin(a) * rS]);
    }
    /* upper run, rear to front, sagging between the wheel tops */
    var span = [SPR_X, WHEEL_X[4], WHEEL_X[3], WHEEL_X[2], WHEEL_X[1], WHEEL_X[0], IDL_X];
    var zAt = [SPR_Z + rS, TOP_Z, TOP_Z, TOP_Z, TOP_Z, TOP_Z, IDL_Z + rI];
    for (i = 0; i < span.length - 1; i++) {
      p.push([span[i], zAt[i]]);
      p.push([(span[i] + span[i + 1]) * 0.5, (zAt[i] + zAt[i + 1]) * 0.5 - 0.038]);
    }
    p.push([IDL_X, IDL_Z + rI]);
    /* wrap the idler and drop back to the ground run */
    for (i = 1; i <= 9; i++) {
      var ti = Math.PI / 2 - i * ((Math.PI / 2 + 1.15) / 9);
      p.push([IDL_X + Math.cos(ti) * rI, IDL_Z + Math.sin(ti) * rI]);
    }
    p.push([2.42, 0.185]);
    p.push([2.16, 0.075]);
    return p;
  }

  function buildTracks(THREE, g, metal) {
    var band = metal(0x060708, 0.62, 0.42);
    var pad = metal(0x0a0b0c, 0.95, 0.05);
    var path = trackPath();
    var n = path.length, side, i, j;
    var half = TRK_W * 0.5, th = TRK_T * 0.5;

    for (side = -1; side <= 1; side += 2) {
      var yc = side * TRK_Y;
      var pos = [], uv = [], idx = [];
      for (i = 0; i < n; i++) {
        var pPrev = path[(i - 1 + n) % n], pNext = path[(i + 1) % n];
        var dx = pNext[0] - pPrev[0], dz = pNext[1] - pPrev[1];
        var L = Math.sqrt(dx * dx + dz * dz) || 1;
        var nx = -dz / L, nz = dx / L;
        var cx = path[i][0], cz = path[i][1];
        var ring = [
          [cx + nx * th, yc + half, cz + nz * th],
          [cx + nx * th, yc - half, cz + nz * th],
          [cx - nx * th, yc - half, cz - nz * th],
          [cx - nx * th, yc + half, cz - nz * th]
        ];
        for (j = 0; j < 4; j++) { pos.push(ring[j][0], ring[j][1], ring[j][2]); uv.push(i / n, j / 3); }
      }
      for (i = 0; i < n; i++) {
        var b0 = i * 4, b1 = ((i + 1) % n) * 4;
        for (j = 0; j < 4; j++) {
          var k = (j + 1) % 4;
          idx.push(b0 + j, b0 + k, b1 + j, b0 + k, b1 + k, b1 + j);
        }
      }
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
      geo.setIndex(idx);
      geo.computeVertexNormals();
      g.add(new THREE.Mesh(geo, band));

      /* raised link cleats so the band reads as track and not as a belt */
      var acc = 0, target = 0, step = 0.245;
      for (i = 0; i < n; i++) {
        var q0 = path[i], q1 = path[(i + 1) % n];
        var ddx = q1[0] - q0[0], ddz = q1[1] - q0[1];
        var seg = Math.sqrt(ddx * ddx + ddz * ddz);
        while (acc + seg >= target && seg > 1e-6) {
          var f = (target - acc) / seg;
          var px = q0[0] + ddx * f, pz = q0[1] + ddz * f;
          var ang = Math.atan2(ddz, ddx);
          var cl = box(THREE, 0.10, TRK_W * 0.88, 0.05, pad,
            px - Math.sin(ang) * (th + 0.022), yc, pz + Math.cos(ang) * (th + 0.022));
          cl.rotation.y = -ang;
          g.add(cl);
          target += step;
        }
        acc += seg;
      }
    }
  }

  /* ----------------------------------------------------------- hull detail */
  function buildDeck(THREE, M, g, skin, metal, glass) {
    var steel = metal(0x131611, 0.58, 0.42);
    var dark = metal(0x090b09, 0.64, 0.35);
    var i, s;

    /* ---- engine deck ----
       A raised access hatch on the flat deck with a narrow intake louvre
       bank down each side of it, then the radiator outlet grille lying flat
       on the deck where it slopes away to the rear plate. An earlier pass
       built all of this from tilted slats and it came out as a grey grating
       raft hovering over the whole rear deck; these are flat panels with
       shallow ribs so they read as let-in gratings instead. */
    g.add(box(THREE, 0.86, 1.20, 0.070, skin, -0.88, 0, Z_DECK + 0.033));
    for (s = -1; s <= 1; s += 2) {
      g.add(box(THREE, 0.82, 0.24, 0.055, skin, -0.88, s * 0.80, Z_DECK + 0.026));
      for (i = 0; i < 4; i++)
        g.add(box(THREE, 0.075, 0.20, 0.035, dark,
          -1.14 + i * 0.175, s * 0.80, Z_DECK + 0.048));
    }
    var gz = function (x) { return Z_DECK + (x + 1.32) * 0.215; };
    var gpan = box(THREE, 0.86, 1.40, 0.045, dark, -1.86, 0, gz(-1.86) + 0.012);
    gpan.rotation.y = -0.212;
    g.add(gpan);
    for (i = 0; i < 5; i++) {
      var gx = -1.53 - i * 0.152;
      var rv = box(THREE, 0.055, 1.36, 0.035, steel, gx, 0, gz(gx) + 0.030);
      rv.rotation.y = -0.212;
      g.add(rv);
    }
    /* fuel filler caps on the deck either side of the engine hatch */
    for (s = -1; s <= 1; s += 2)
      g.add(tubeZ(THREE, 0.095, 0.105, 0.05, 10, steel, -0.42, s * 0.86, Z_DECK + 0.02));

    /* ---- glacis ---- */
    /* driver's hatch, left of centre, with its two periscope hoods */
    var dh = box(THREE, 0.52, 0.58, 0.085, skin, 2.28, 0.42, glacisZ(2.28) + 0.022);
    dh.rotation.y = GLA_TILT;
    g.add(dh);
    for (s = -1; s <= 1; s += 2) {
      var pz = box(THREE, 0.14, 0.17, 0.10, skin, 2.15, 0.42 + s * 0.17, glacisZ(2.15) + 0.062);
      pz.rotation.y = GLA_TILT;
      g.add(pz);
      var pg = box(THREE, 0.03, 0.10, 0.045, glass, 2.22, 0.42 + s * 0.17, glacisZ(2.22) + 0.078);
      pg.rotation.y = GLA_TILT;
      g.add(pg);
    }
    /* hull machine gun in its ball mount, right of centre */
    g.add(tubeX(THREE, 0.150, 0.215, 0.24, 14, skin, 2.40, -0.46, glacisZ(2.40) - 0.10));
    g.add(tubeX(THREE, 0.030, 0.040, 0.42, 8, dark, 2.70, -0.46, glacisZ(2.40) - 0.14));

    /* headlight and horn, left of the glacis */
    g.add(tubeX(THREE, 0.100, 0.110, 0.13, 12, skin, 2.56, 0.66, glacisZ(2.54) + 0.13));
    g.add(new THREE.Mesh(new THREE.CircleGeometry(0.094, 12), glass)
      .translateX(2.63).translateY(0.66).translateZ(glacisZ(2.54) + 0.13));
    g.add(box(THREE, 0.07, 0.07, 0.18, steel, 2.52, 0.66, glacisZ(2.52) + 0.03));
    g.add(tubeX(THREE, 0.052, 0.072, 0.14, 10, dark, 2.55, 0.32, glacisZ(2.53) + 0.07));

    /* towing eyes on the nose beam */
    for (s = -1; s <= 1; s += 2)
      g.add(box(THREE, 0.22, 0.09, 0.16, steel, 2.94, s * 0.62, 1.00));

    /* spare track links bolted flat to the glacis - standard T-34 practice,
       and they break up an otherwise blank plate */
    for (i = 0; i < 5; i++) {
      var tx = 2.44 + i * 0.118;
      var tl = box(THREE, 0.100, 0.50, 0.042, metal(0x0d0f11, 0.64, 0.35),
        tx, -0.02, glacisZ(tx) + 0.024);
      tl.rotation.y = GLA_TILT;
      g.add(tl);
    }

    /* ---- fenders ---- */
    var fend = skinMat(THREE, 0.6, 2.4);
    /* One swept plate per side, drawn as a profile in XZ and extruded across
       the track. It runs flat along the sponson and turns down at both ends -
       that short down-swept nose guard is most of what makes a T-34 front end
       read as a T-34 front end. Built as three boxes before, and the corners
       never met. */
    var fprof = [
      [-3.06, 1.00], [-2.88, 1.20], [2.82, 1.20], [3.06, 0.96],
      [3.06, 0.91], [2.80, 1.15], [-2.88, 1.15], [-3.06, 0.95]
    ];
    for (s = -1; s <= 1; s += 2) {
      var fm = new THREE.Mesh(M.slab(THREE, fprof, 0.44, "xz"), fend);
      fm.position.y = s > 0 ? 1.62 : -1.18;
      g.add(fm);
      /* bracket carrying the guard forward of the sponson */
      g.add(box(THREE, 0.07, 0.24, 0.17, steel, 2.76, s * 1.46, 1.12));
      g.add(box(THREE, 0.07, 0.24, 0.15, steel, -2.84, s * 1.46, 1.11));
    }

    /* ---- external fuel drums on the rear hull sides ----
       Cylindrical 90-litre drums on stand-off brackets, nestled against the
       inward-sloping upper side plate and overhanging the fender. One of the
       period cues this model is here to carry. */
    for (s = -1; s <= 1; s += 2) {
      var dy = s * 1.45;
      g.add(tubeX(THREE, 0.25, 0.25, 0.98, 16, skinMat(THREE), -1.81, dy, 1.445));
      g.add(tubeX(THREE, 0.255, 0.255, 0.045, 16, dark, -1.36, dy, 1.445));
      g.add(tubeX(THREE, 0.255, 0.255, 0.045, 16, dark, -2.26, dy, 1.445));
      for (i = 0; i < 2; i++) {
        var bx = -1.50 - i * 0.62;
        g.add(box(THREE, 0.055, 0.30, 0.30, steel, bx, s * 1.36, 1.30));
      }
    }

    /* ---- sponson stowage, deliberately asymmetric ---- */
    g.add(box(THREE, 0.82, 0.28, 0.28, skin, -0.30, -1.44, 1.35));
    /* tow cable run along the left sponson, tucked against the plate */
    g.add(tubeX(THREE, 0.028, 0.028, 2.40, 8, dark, 0.20, 1.49, 1.29));

    /* ---- rear plate ---- */
    /* two round transmission access hatches */
    for (s = -1; s <= 1; s += 2) {
      var th2 = tubeX(THREE, 0.24, 0.24, 0.07, 16, skin, -2.87, s * 0.52, 1.00);
      th2.rotation.y = -0.42;
      g.add(th2);
    }
    /* exhaust stubs in their armoured cowls - the soot in the paint sits
       behind these, at u -> 0 on every body in this file */
    for (s = -1; s <= 1; s += 2) {
      g.add(tubeX(THREE, 0.095, 0.110, 0.26, 12, metal(0x0a0806, 0.64, 0.35), -3.02, s * 0.60, 1.22));
      g.add(tubeX(THREE, 0.130, 0.130, 0.07, 12, steel, -2.90, s * 0.60, 1.22));
      g.add(box(THREE, 0.16, 0.09, 0.14, steel, -2.94, s * 0.90, 0.82));
    }
    /* spare track links on the rear plate */
    for (i = 0; i < 4; i++) {
      var rl = box(THREE, 0.10, 0.46, 0.055, metal(0x0d0f11, 0.64, 0.35),
        -2.84 - i * 0.045, -0.02, 1.34 - i * 0.115);
      rl.rotation.y = -1.05;
      g.add(rl);
    }
  }

  /* ------------------------------------------------------------------ build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var skin = skinMat(THREE);
    var turSkin = skinMat(THREE);
    function metal(c, r, m) { return metalMat(THREE, c, r, m); }
    var glass = glassMat(THREE);

    g.add(buildHull(THREE, skin));
    buildDeck(THREE, M, g, skin, metal, glass);
    buildRunningGear(THREE, g, skin, metal);
    buildTracks(THREE, g, metal);
    g.add(buildTurret(THREE, M, C, turSkin, metal, glass));

    /* hull team flashes: one on each sponson side, low enough that the
       turret cannot hide them as it traverses, and one on the nose */
    if (C && C.team) {
      var team = teamMat(THREE, C.team);
      for (var s = -1; s <= 1; s += 2) {
        var fl = box(THREE, 0.66, 0.035, 0.20, team, 1.10, s * 1.365, 1.42);
        fl.rotation.x = s * 0.80;
        g.add(fl);
      }
      var nf = box(THREE, 0.05, 0.46, 0.22, team, 2.55, 0, glacisZ(2.55) + 0.02);
      nf.rotation.y = GLA_TILT;
      g.add(nf);
    }
    return g;
  }

  UNIT_MODELS["kpa_e50_mbt"] = { len: 6.10, build: build };
})();
