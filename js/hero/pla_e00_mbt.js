/* ==========================================================================
   pla_e00_mbt.js -- HERO reference model: ZTZ-99A main battle tank (PLA)

   Built by hand as the style anchor for era e00 armour. Everything else in
   this era gets tuned to match what this file does, so the conventions here
   are deliberate rather than incidental:

     model space   +X nose, +Y left, +Z up, ground at z = 0, real metres
     materials     exactly three tiers -- SKIN (textured paint), METAL
                   (running gear, barrels, fittings; rubber is METAL with
                   roughness 0.95) and GLASS (vision blocks, sight windows)
     detail rule   a part exists only if it changes the silhouette or reads
                   as its own shape from a three-quarter view. Rivets, panel
                   joins, bolt rows and dirt live in the canvas texture.

   Period cues this model exists to establish, checked against
   commons photographs of a parade ZTZ-99A and a museum ZTZ-99:

     - six road wheels a side, front idler, REAR drive sprocket raised clear
       of the road-wheel line so the belt slopes up to it at the tail
     - welded angular turret: flat near-vertical sides, a long squared bustle
       carrying a stowage cage, no cast rounding anywhere
     - arrow-shaped ERA: two cassette arrays on the turret cheeks converging
       on the mantlet, capped by an arrowhead plate across the turret face,
       so the front reads as a broad arrow from above and from the quarter
     - 125 mm smoothbore with a bore evacuator just forward of mid-tube
     - JD-3 laser dazzler as a boxed head on a pedestal beside the cupola
     - full-length segmented side skirts, the leading plate deeper and raked

   Real dimensions used: 7.60 m hull, 3.44 m beam over the sponsons, 2.34 m to
   the turret roof, 0.47 m ground clearance, 0.70 m road wheels, 11.44 m over
   the gun. Measured in the scene: 7,208 triangles.

   Three things were found by rendering this and measuring the pixels, and
   they are written down here because the parametric era models are meant to
   be tuned against this file:

   1. THREE builds a cylinder about its own +Y. rotation.x = PI/2 therefore
      carries that axis onto +Z and gives you an UPRIGHT cylinder -- a cupola,
      a hatch ring, a fan cover. A road wheel wants NO rotation at all. Built
      the other way round, every wheel, the idler, the sprocket, the stowed
      snorkel and both whip aerials came out as drums standing on end, poking
      out through the side skirts.

   2. M.slab clamps its bevel to a fraction of the OUTLINE's own size. On a
      thin applique that reads as a chamfer, but the upper hull is a
      5.4 x 3.4 m outline extruded 0.42 m, so it was handed a 17 cm bevel: the
      sponson measured y +/-1.892 instead of +/-1.720 and its deck sat at
      z 1.688 instead of 1.520. It overhung its own skirts, hid the team
      flashes on them, and put rounded edges on a welded tank. Anything that
      must keep a hard plate edge is built by the local prism() below instead.

   3. This renderer's ACES pass eats saturation at the top end. Sampled off
      the render: METAL at 0x3c4146 with metalness 0.48 came back at
      rgb(154,158,159), two and a half times its own value, because an
      unlit-environment metal here is nearly all direct specular. And the team
      blue handed in raw measured rgb(199,220,232) -- a white panel with no
      blue left. Both are fixed by halving the source value, not by changing
      the hue.
   ========================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlaE00Mbt = (function () {
  "use strict";

  /* ------------------------------------------------- principal dimensions */
  var HL    = 3.80;   /* hull half length: nose +3.80, tail plate -3.80     */
  var BODY  = 1.16;   /* half width of the lower hull, between the tracks   */
  var SPHW  = 1.72;   /* half width of the upper hull over the sponsons     */
  var BELLY = 0.47;   /* ground clearance                                   */
  var ROOF  = 1.52;   /* hull roof, and the turret ring plane               */
  var SPONZ = 1.10;   /* underside of the wide upper hull                   */
  var GBRK  = 1.58;   /* x where the glacis meets the roof                  */
  var GNX   = 3.78;   /* x at the top of the lower front plate              */
  var GNZ   = 0.66;   /* z at the top of the lower front plate              */

  var BW    = 0.56;   /* track belt width                                   */
  var BY    = 1.46;   /* belt centre line, absolute y                       */
  var BT    = 0.10;   /* belt thickness                                     */
  var WR    = 0.35;   /* road wheel radius                                  */
  var WZ    = 0.45;   /* road wheel axle height                             */
  var WX    = [2.45, 1.47, 0.49, -0.49, -1.47, -2.45];
  var IDX   = 3.32, IDR = 0.28, IDZ = 0.635;   /* front idler               */
  var SPX   = -3.30, SPR = 0.315, SPZ = 0.60;  /* REAR drive sprocket       */
  var RLX   = [1.85, 0.10, -1.75], RLR = 0.11, RLZ = 0.805;
  var TOPZ  = 0.965;  /* height of the belt centre line on the top run      */

  var TRX   = 0.25;   /* turret ring, x                                     */
  var TCORE = 0.66;   /* turret core height above the ring                  */
  var TROOF = 0.82;   /* turret roof above the ring (world 2.34)            */

  /* metres of vehicle covered by one tile of the paint texture. Every skin
     mesh is authored so its UVs are in metres, so this one number sets the
     camouflage scale for the whole model. */
  var TEX_M = 2.20;

  /* ------------------------------------------------------------ utilities */
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* Rewrite a geometry's UVs into metres. loft() hands back 0..1 along the
     body and 0..1 around the section; slab() already works in shape units,
     which are metres. Without this the camouflage came out finger-nail sized
     on the extruded plates and bed-sheet sized on the lofted hull. */
  function uvMetres(g, su, sv) {
    var uv = g.getAttribute("uv");
    if (!uv) return g;
    for (var i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
    uv.needsUpdate = true;
    return g;
  }

  /* ---------------------------------------------------------------- paint */
  /* PLA digital camouflage. The four tones are the repo's own values: the
     base and the sand come from Armour3D.PAINT (green, desert) and the two
     mid tones from the secondary table that file already uses for "green",
     so this hero does not invent a palette. */
  var _tex = null;
  function skinTex(THREE) {
    if (_tex !== null) return _tex;
    _tex = null;
    try {
      var W = 640, H = 640;
      var cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      var g = cv.getContext("2d");
      var R = rngFor(0x99a5);
      /* ordered dark -> light so a neighbouring tone is index +/- 1.
         The hues are the repo's own (Armour3D.PAINT green/desert and the
         secondary greens that file already uses); only the value spread is
         pushed, because ACES plus the key light flattens this renderer and
         the first pass came out a uniform sandy olive with no green in it. */
      var TONE = ["#1f2a17", "#38492a", "#5b5530", "#93865c"];

      /* a coarse value-noise field so the pixel blocks clump into real camo
         patches instead of dithering into flat mud at RTS zoom */
      var N = 10, fld = [], i, j;
      for (i = 0; i < N * N; i++) fld.push(R());
      function smp(a, b) { return fld[((b % N) + N) % N * N + (((a % N) + N) % N)]; }
      function fval(u, v) {
        var x0 = Math.floor(u), y0 = Math.floor(v), fx = u - x0, fy = v - y0;
        fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
        var a = smp(x0, y0), b = smp(x0 + 1, y0), c = smp(x0, y0 + 1), d = smp(x0 + 1, y0 + 1);
        return (a + (b - a) * fx) + ((c + (d - c) * fx) - (a + (b - a) * fx)) * fy;
      }
      var CELL = 20, x, y, f, t;
      g.fillStyle = TONE[0]; g.fillRect(0, 0, W, H);
      for (y = 0; y < H; y += CELL) {
        for (x = 0; x < W; x += CELL) {
          f = fval(x / W * N, y / H * N) + (R() - 0.5) * 0.34;
          t = f < 0.34 ? 0 : (f < 0.70 ? 1 : (f < 0.91 ? 2 : 3));
          g.fillStyle = TONE[t]; g.fillRect(x, y, CELL, CELL);
          /* half-cells break the grid up the way the real print does. They
             only ever step to an ADJACENT tone -- picking uniformly put the
             sand tone into a third of the cells and bleached the whole tank. */
          if (R() < 0.30) {
            var nb = t + (R() < 0.5 ? -1 : 1);
            if (nb < 0) nb = 1; if (nb > 3) nb = 2;
            g.fillStyle = TONE[nb];
            g.fillRect(x + (R() < 0.5 ? 0 : CELL / 2), y + (R() < 0.5 ? 0 : CELL / 2),
                       CELL / 2, CELL / 2);
          }
        }
      }

      /* plate seams: long welded joins, mostly horizontal along the hull */
      g.lineCap = "round";
      for (i = 0; i < 26; i++) {
        var sx = R() * W, sy = R() * H, ln = 90 + R() * 300;
        g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 2.2;
        g.beginPath();
        if (R() < 0.72) { g.moveTo(sx, sy); g.lineTo(sx + ln, sy + (R() - 0.5) * 10); }
        else { g.moveTo(sx, sy); g.lineTo(sx + (R() - 0.5) * 10, sy + ln * 0.6); }
        g.stroke();
        /* the weld bead catches light on its upper lip */
        g.strokeStyle = "rgba(255,255,255,0.10)"; g.lineWidth = 1.1;
        g.stroke();
      }
      /* bolt and rivet rows along the seams and around the hatch rings */
      g.fillStyle = "rgba(0,0,0,0.34)";
      for (i = 0; i < 40; i++) {
        var bx = R() * W, by = R() * H, n = 5 + ((R() * 12) | 0), st = 7 + R() * 5;
        if (R() < 0.5) for (j = 0; j < n; j++) g.fillRect(bx + j * st, by, 2.4, 2.4);
        else           for (j = 0; j < n; j++) g.fillRect(bx, by + j * st, 2.4, 2.4);
      }
      for (i = 0; i < 7; i++) {
        var cx = R() * W, cy = R() * H, rr = 22 + R() * 26, n2 = 14;
        for (j = 0; j < n2; j++) {
          var a2 = j / n2 * 6.2832;
          g.fillRect(cx + Math.cos(a2) * rr, cy + Math.sin(a2) * rr, 2.4, 2.4);
        }
      }
      /* weathering: dust climbing the lower half, soot streaks running down */
      var dust = g.createLinearGradient(0, H * 0.46, 0, H);
      dust.addColorStop(0, "rgba(146,133,104,0)");
      dust.addColorStop(0.62, "rgba(146,133,104,0.13)");
      dust.addColorStop(1, "rgba(150,138,110,0.32)");
      g.fillStyle = dust; g.fillRect(0, H * 0.46, W, H * 0.54);
      g.fillStyle = "rgba(22,20,18,0.15)";
      for (i = 0; i < 46; i++)
        g.fillRect(R() * W, R() * H * 0.9, 2 + R() * 5, 22 + R() * 90);
      /* heavier scorching in one band, for the plates behind the exhaust */
      var soot = g.createLinearGradient(0, H * 0.70, 0, H);
      soot.addColorStop(0, "rgba(26,24,22,0)");
      soot.addColorStop(1, "rgba(26,24,22,0.34)");
      g.fillStyle = soot; g.fillRect(0, H * 0.70, W, H * 0.30);

      var t2 = new THREE.CanvasTexture(cv);
      t2.wrapS = t2.wrapT = THREE.RepeatWrapping;
      t2.repeat.set(1 / TEX_M, 1 / TEX_M);
      if (THREE.sRGBEncoding !== undefined) t2.encoding = THREE.sRGBEncoding;
      t2.anisotropy = 8;
      _tex = t2;
    } catch (e) { _tex = null; }
    return _tex;
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    root.name = "pla_e00_mbt";

    /* --- the three material tiers, and nothing else ------------------- */
    var skin = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.87, metalness: 0.06 });
    var tex = skinTex(THREE);
    if (tex) skin.map = tex; else skin.color.setHex(0x38492a);

    var metal = new THREE.MeshStandardMaterial({
      color: 0x22262a, roughness: 0.62, metalness: 0.38 });
    var rubber = new THREE.MeshStandardMaterial({          /* METAL tier */
      color: 0x17191b, roughness: 0.95, metalness: 0.04 });
    var glass = new THREE.MeshPhysicalMaterial({
      color: 0x27363f, roughness: 0.09, metalness: 0.10,
      transparent: true, opacity: 0.84 });
    /* SKIN tier, flat: painted markings, not plate. Two things had to be
       fixed here. Handed 0.35 metalness the flash went grey; and handed the
       team colour raw it measured (199,220,232) on screen -- a white panel
       with no blue left in it, because green and blue both clip past the
       ACES knee. Scaling the incoming colour down keeps the brightest
       channel under the knee so the HUE survives, which is the same trick
       the other hero armour in this fleet uses. Only the level is ours;
       the hue is whatever C.team hands in. */
    var teamCol = new THREE.Color((C && C.team) !== undefined ? C.team : 0x3f7fd0);
    teamCol.multiplyScalar(0.36);
    var team = new THREE.MeshStandardMaterial({
      color: teamCol, roughness: 0.84, metalness: 0.05 });

    /* --- local helpers ------------------------------------------------ */
    function add(G, geo, mat, x, y, z) {
      var m = new THREE.Mesh(geo, mat);
      m.position.set(x || 0, y || 0, z || 0);
      G.add(m);
      return m;
    }
    /* A crisp extruded prism -- no bevel at all.
       M.slab clamps its bevel to a fraction of the OUTLINE's own size, which
       is exactly right for a thin applique but wrong for a welded box. The
       upper hull is a 5.4 x 3.4 m outline extruded 0.42 m, so it was handed a
       17 cm bevel: measured in the scene, the sponson came out at y +/-1.892
       instead of +/-1.720 and its deck at z 1.688 instead of 1.520. It was
       overhanging its own side skirts, hiding the team flashes on them, and
       carrying rounded edges on a tank whose whole identity is welded plate.
       Everything that has to keep a hard plate edge is built here; M.slab
       still does the thin appliques, where its bevel reads as a chamfer. */
    function prism(pts, thick, plane) {
      var sh = new THREE.Shape(), k;
      sh.moveTo(pts[0][0], pts[0][1]);
      for (k = 1; k < pts.length; k++) sh.lineTo(pts[k][0], pts[k][1]);
      sh.closePath();
      var g = new THREE.ExtrudeGeometry(sh, { depth: thick, bevelEnabled: false });
      if (plane === "xz") g.rotateX(Math.PI / 2);
      g.computeVertexNormals();
      return g;
    }
    /* a skin box whose UVs are in metres, so the camo keeps one scale */
    function bx(w, h, d) {
      var g = new THREE.BoxGeometry(w, h, d);
      return uvMetres(g, (w + d) * 0.5, (h + d) * 0.5);
    }
    function cyl(rt, rb, h, seg, open) {
      return new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open);
    }
    /* cylinder lying along +X */
    function tube(G, mat, r0, r1, len, seg, x, y, z) {
      var m = new THREE.Mesh(cyl(r0, r1, len, seg), mat);
      m.rotation.z = Math.PI / 2;
      m.position.set(x, y, z);
      G.add(m);
      return m;
    }
    /* cylinder STANDING on +Z -- a cupola, a hatch ring, a fan cover.
       THREE builds a cylinder about its own +Y, and rotation.x = PI/2 carries
       that +Y onto +Z, so this is the upright one. */
    function disc(G, mat, r0, r1, len, seg, x, y, z) {
      var m = new THREE.Mesh(cyl(r0, r1, len, seg), mat);
      m.rotation.x = Math.PI / 2;
      m.position.set(x, y, z);
      G.add(m);
      return m;
    }
    /* cylinder lying across the hull on a +Y axis -- a road wheel, a sprocket,
       a stowed snorkel. THREE's cylinder is already built about +Y, so this
       one applies NO rotation. Every wheel on this tank was built with disc()
       to begin with and the whole running gear came out as drums standing on
       end, sticking out past the skirts. */
    function axleY(G, mat, r0, r1, len, seg, x, y, z) {
      var m = new THREE.Mesh(cyl(r0, r1, len, seg), mat);
      m.position.set(x, y, z);
      G.add(m);
      return m;
    }

    /* ================================================== 1. LOWER HULL ==== */
    /* One loft between the tracks. sq below 1 squares the section off; a
       tank hull is a welded box, so it runs low. The top of the front
       stations steps down to follow the glacis so the plate does not saw
       through the deck. */
    var GSLOPE = (ROOF - GNZ) / (GNX - GBRK);
    function glacisZ(x) { return ROOF - (x - GBRK) * GSLOPE; }
    function sec(x, w, top, bot) {
      return { x: x, w: w, h: (top - bot) * 0.5, zc: (top + bot) * 0.5, sq: 0.34 };
    }
    var hullSecs = [
      sec(-3.80, 1.06, 1.28, 0.56),
      sec(-3.56, 1.16, 1.30, 0.47),
      sec( 2.20, 1.16, 1.30, 0.47),
      sec( 2.80, 1.15, glacisZ(2.80) - 0.02, 0.47),
      sec( 3.40, 1.09, glacisZ(3.40) - 0.02, 0.49),
      sec( 3.74, 0.92, glacisZ(3.74) + 0.01, 0.55)
    ];
    var hullGeo = M.loft(THREE, hullSecs, 22);
    uvMetres(hullGeo, 7.6, 6.4);
    root.add(new THREE.Mesh(hullGeo, skin));

    /* ================================================== 2. UPPER HULL ==== */
    /* The wide box that overhangs the tracks. Flat sides, flat deck: this is
       what makes the top-down silhouette a rectangle rather than a loaf. */
    var sponPts = [
      [ GBRK + 0.04,  SPHW], [-3.64,  SPHW], [-3.80,  1.50],
      [-3.80, -1.50], [-3.64, -SPHW], [ GBRK + 0.04, -SPHW]
    ];
    var spon = new THREE.Mesh(prism(sponPts, ROOF - SPONZ), skin);
    spon.position.z = SPONZ;
    root.add(spon);

    /* ================================================== 3. GLACIS ======== */
    var gdx = GNX - GBRK, gdz = GNZ - ROOF;
    var grun = Math.sqrt(gdx * gdx + gdz * gdz);
    var gang = Math.atan2(-gdz / grun, gdx / grun);   /* rotation about +Y */
    var gnx = Math.sin(gang), gnz = Math.cos(gang);   /* plate normal      */
    var GTH = 0.16;
    var glacPts = [[0.02, 1.60], [grun, 1.04], [grun, -1.04], [0.02, -1.60]];
    var glac = new THREE.Mesh(prism(glacPts, GTH), skin);
    glac.rotation.y = gang;
    glac.position.set(GBRK - gnx * GTH, 0, ROOF - gnz * GTH);
    root.add(glac);

    /* a point on the glacis face, f along the run from the break, lifted */
    function onGl(f, up, ny) {
      return { x: GBRK + (gdx / grun) * f + gnx * up,
               y: ny,
               z: ROOF + (gdz / grun) * f + gnz * up };
    }

    /* --- the arrow on the glacis. The Type 98/99 wears its hull ERA as a
       chevron with the driver's hatch at the apex; it is the single feature
       that tells you which way the tank is facing from directly overhead. */
    /* One band, apex forward, arms swept back and outboard. The first
       version ran arms forward AND back from the same waist and rendered as
       a symmetrical X, which points nowhere. Shape x is measured along the
       plate run, so +x is toward the nose. */
    var chev = [
      [ 0.95,  0.00], [ 0.05,  1.34], [-0.35,  1.34], [ 0.50,  0.00],
      [-0.35, -1.34], [ 0.05, -1.34]
    ];
    var chevM = new THREE.Mesh(M.slab(THREE, chev, 0.11), skin);
    chevM.rotation.y = gang;
    var cp = onGl(1.15, GTH - 0.005, 0);
    chevM.position.set(cp.x, 0, cp.z);
    root.add(chevM);

    /* driver's hatch at the apex of the chevron, plus his vision block */
    var dh = new THREE.Mesh(bx(0.62, 0.60, 0.07), skin);
    dh.rotation.y = gang;
    var dp = onGl(0.52, GTH + 0.03, 0);
    dh.position.set(dp.x, 0, dp.z);
    root.add(dh);
    var dv = new THREE.Mesh(bx(0.09, 0.34, 0.10), glass);
    dv.rotation.y = gang;
    var dvp = onGl(0.30, GTH + 0.05, 0);
    dv.position.set(dvp.x, 0, dvp.z);
    root.add(dv);

    /* tow eyes on the lower front plate */
    var s, i, j;
    for (s = -1; s <= 1; s += 2) {
      add(root, bx(0.30, 0.13, 0.20), skin, 3.70, s * 0.72, 0.62);
      tube(root, metal, 0.05, 0.05, 0.22, 8, 3.80, s * 0.72, 0.62);
    }
    /* lower front plate under the glacis nose */
    add(root, bx(0.26, 1.84, 0.24), skin, 3.68, 0, 0.58);

    /* ================================================== 4. RUNNING GEAR == */
    /* The belt is swept as a rectangular section around a closed path, which
       is the only way the front idler, the raised REAR sprocket and the sag
       over the return rollers all end up on one continuous run. */
    function beltPath() {
      var p = [], k, a, Ri = IDR + BT * 0.5, Rs = SPR + BT * 0.5;
      for (k = 0; k <= 7; k++) {                     /* idler, top to bottom */
        a = (90 - k * (185 / 7)) * Math.PI / 180;
        p.push([IDX + Ri * Math.cos(a), IDZ + Ri * Math.sin(a)]);
      }
      p.push([2.72, BT * 0.5]);                      /* bottom run           */
      p.push([-2.72, BT * 0.5]);
      for (k = 0; k <= 7; k++) {                     /* sprocket, bottom up  */
        a = (265 - k * (170 / 7)) * Math.PI / 180;
        p.push([SPX + Rs * Math.cos(a), SPZ + Rs * Math.sin(a)]);
      }
      p.push([-1.75, TOPZ]); p.push([0.10, TOPZ]); p.push([1.85, TOPZ]);
      return p;
    }
    /* per-vertex outward normals for a closed 2D loop */
    function loopNormals(p) {
      var n = p.length, area = 0, k, en = [], nm = [];
      for (k = 0; k < n; k++) {
        var q = p[(k + 1) % n];
        area += p[k][0] * q[1] - q[0] * p[k][1];
      }
      if (area < 0) p.reverse();
      for (k = 0; k < n; k++) {
        var a = p[k], b = p[(k + 1) % n];
        var dx = b[0] - a[0], dz = b[1] - a[1];
        var l = Math.sqrt(dx * dx + dz * dz) || 1;
        en.push([dz / l, -dx / l]);
      }
      for (k = 0; k < n; k++) {
        var e0 = en[(k - 1 + n) % n], e1 = en[k];
        var nx = e0[0] + e1[0], nz = e0[1] + e1[1];
        var l2 = Math.sqrt(nx * nx + nz * nz) || 1;
        nm.push([nx / l2, nz / l2]);
      }
      return nm;
    }
    function beltGeo(path, nrm, side) {
      var pos = [], idx = [], n = path.length, k, h = BT * 0.5, w = BW * 0.5;
      for (k = 0; k < n; k++) {
        var px = path[k][0], pz = path[k][1], nx = nrm[k][0], nz = nrm[k][1];
        var oy = side * BY;
        /* four corners: outer/inner face crossed with inboard/outboard edge */
        pos.push(px + nx * h, oy - w, pz + nz * h);
        pos.push(px + nx * h, oy + w, pz + nz * h);
        pos.push(px - nx * h, oy + w, pz - nz * h);
        pos.push(px - nx * h, oy - w, pz - nz * h);
      }
      for (k = 0; k < n; k++) {
        var a = k * 4, b = ((k + 1) % n) * 4, q;
        for (q = 0; q < 4; q++) {
          var a0 = a + q, a1 = a + (q + 1) % 4, b0 = b + q, b1 = b + (q + 1) % 4;
          idx.push(a0, b0, a1, a1, b0, b1);
        }
      }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setIndex(idx);
      g.computeVertexNormals();
      return g;
    }

    var bpath = beltPath();
    var bnrm = loopNormals(bpath);
    for (s = -1; s <= 1; s += 2) root.add(new THREE.Mesh(beltGeo(bpath, bnrm, s), rubber));

    /* track pads, resampled along the same path so the shoes follow the run
       round both wheels rather than only the straight sections */
    (function () {
      var segLen = [], total = 0, k, n = bpath.length;
      for (k = 0; k < n; k++) {
        var a = bpath[k], b = bpath[(k + 1) % n];
        var l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        segLen.push(l); total += l;
      }
      var PAD = 30, padGeo = new THREE.BoxGeometry(0.30, BW * 0.94, 0.07);
      for (var q = 0; q < PAD; q++) {
        var want = total * q / PAD, acc = 0, seg = 0;
        while (seg < n - 1 && acc + segLen[seg] < want) { acc += segLen[seg]; seg++; }
        var f = segLen[seg] > 1e-6 ? (want - acc) / segLen[seg] : 0;
        var a2 = bpath[seg], b2 = bpath[(seg + 1) % n];
        var px = a2[0] + (b2[0] - a2[0]) * f, pz = a2[1] + (b2[1] - a2[1]) * f;
        var ang = Math.atan2(b2[1] - a2[1], b2[0] - a2[0]);
        var nx = bnrm[seg][0], nz = bnrm[seg][1];
        for (s = -1; s <= 1; s += 2) {
          var m = new THREE.Mesh(padGeo, rubber);
          m.rotation.y = -ang;
          m.position.set(px + nx * (BT * 0.5 + 0.025), s * BY, pz + nz * (BT * 0.5 + 0.025));
          root.add(m);
        }
      }
    })();

    /* six road wheels a side, dished with a proud hub */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < WX.length; i++) {
        axleY(root, rubber, WR, WR, 0.42, 16, WX[i], s * BY, WZ);
        axleY(root, metal, WR - 0.09, WR - 0.09, 0.44, 14, WX[i], s * BY, WZ);
        /* swing arm back to the hull side, so the wheels are carried */
        add(root, new THREE.BoxGeometry(0.34, 0.11, 0.14), metal,
            WX[i] - 0.16, s * (BODY + 0.05), WZ + 0.10);
      }
      /* front idler, smaller and lifted: the belt slopes up to it */
      axleY(root, rubber, IDR, IDR, 0.42, 14, IDX, s * BY, IDZ);
      axleY(root, metal, IDR - 0.08, IDR - 0.08, 0.44, 12, IDX, s * BY, IDZ);
      /* REAR drive sprocket, higher again, with teeth that read at zoom */
      axleY(root, metal, SPR - 0.06, SPR - 0.06, 0.42, 14, SPX, s * BY, SPZ);
      axleY(root, metal, 0.14, 0.14, 0.48, 8, SPX, s * BY, SPZ);
      for (j = 0; j < 9; j++) {
        var ta = j / 9 * Math.PI * 2;
        var tm = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.40, 0.13), metal);
        tm.rotation.y = -ta;
        tm.position.set(SPX + Math.cos(ta) * (SPR - 0.03), s * BY, SPZ + Math.sin(ta) * (SPR - 0.03));
        root.add(tm);
      }
      /* return rollers under the top run */
      for (i = 0; i < RLX.length; i++)
        axleY(root, metal, RLR, RLR, 0.22, 8, RLX[i], s * (BY + 0.06), RLZ);
    }

    /* ================================================== 5. SKIRTS ======== */
    /* Segmented armour plates hung off the sponson edge. The leading plate
       is deeper and raked, the trailing one cut away over the sprocket --
       the two shapes that stop a skirt run reading as a plain rectangle. */
    var SKY = 1.755, SKT = 0.09, SK_TOP = 1.24, SK_BOT = 0.50;
    for (s = -1; s <= 1; s += 2) {
      var yy = s > 0 ? SKY + SKT * 0.5 : -SKY + SKT * 0.5;
      var front = [[3.34, SK_TOP], [3.34, 0.88], [3.02, 0.42], [2.16, 0.42], [2.16, SK_TOP]];
      var fm = new THREE.Mesh(prism(front, SKT, "xz"), skin);
      fm.position.y = yy;
      root.add(fm);
      var rear = [[-2.06, SK_TOP], [-2.06, SK_BOT], [-2.94, SK_BOT], [-3.34, 0.94], [-3.34, SK_TOP]];
      var rm = new THREE.Mesh(prism(rear, SKT, "xz"), skin);
      rm.position.y = yy;
      root.add(rm);
      /* the four plain plates between them */
      for (i = 0; i < 4; i++) {
        var cx2 = 2.16 - 0.5275 - i * 1.055;
        add(root, bx(1.03, SKT, SK_TOP - SK_BOT), skin, cx2, s * SKY, (SK_TOP + SK_BOT) * 0.5);
      }
    }

    /* ================================================== 6. FENDERS ======= */
    for (s = -1; s <= 1; s += 2) {
      /* the shelf forward of the sponson, over the front of the track */
      add(root, bx(1.86, 0.68, 0.14), skin, 2.48, s * 1.44, 1.21);
      /* long stowage box on the front fender, flush with the deck */
      add(root, bx(1.62, 0.60, 0.22), skin, 2.52, s * 1.44, 1.39);
      /* raked mudguard hanging in front of the idler */
      var mg = new THREE.Mesh(bx(0.44, 0.66, 0.62), skin);
      mg.rotation.y = -0.34;
      mg.position.set(3.48, s * 1.44, 0.98);
      root.add(mg);
      /* headlamp in an armoured bucket */
      add(root, bx(0.20, 0.28, 0.26), skin, 3.42, s * 1.16, 1.44);
      tube(root, glass, 0.10, 0.10, 0.05, 10, 3.53, s * 1.16, 1.44);
      /* tow cable coiled along the sponson side */
      tube(root, metal, 0.042, 0.042, 3.10, 6, -0.60, s * 1.775, 1.26);
      /* rear mudflap */
      add(root, bx(0.10, 0.60, 0.44), rubber, -3.80, s * 1.46, 0.72);
    }

    /* ================================================== 7. ENGINE DECK === */
    /* louvres and fan covers, the plan-view signature of the rear deck */
    for (s = -1; s <= 1; s += 2) {
      add(root, bx(1.26, 0.86, 0.05), metal, -2.86, s * 0.76, ROOF + 0.03);
      for (i = 0; i < 5; i++)
        add(root, new THREE.BoxGeometry(1.18, 0.07, 0.06), rubber,
            -2.86, s * 0.76 + (i - 2) * 0.17, ROOF + 0.06);
      disc(root, metal, 0.30, 0.30, 0.07, 12, -1.62, s * 0.74, ROOF + 0.03);
    }
    /* exhaust, out of the left sponson side and sooted */
    add(root, bx(0.62, 0.14, 0.44), metal, -2.30, 1.76, 1.30);
    for (i = 0; i < 4; i++)
      add(root, new THREE.BoxGeometry(0.54, 0.05, 0.06), rubber, -2.30, 1.83, 1.16 + i * 0.11);

    /* rear plate: engine access door, and two external fuel drums */
    add(root, bx(0.12, 3.04, 0.94), skin, -3.84, 0, 1.00);
    tube(root, skin, 0.40, 0.40, 0.10, 14, -3.92, -0.62, 1.02);
    for (s = -1; s <= 1; s += 2) {
      tube(root, skin, 0.30, 0.30, 0.80, 14, -4.00, s * 0.80, 1.28);
      add(root, bx(0.10, 0.16, 0.60), metal, -3.76, s * 0.80, 1.28);
      add(root, bx(0.10, 0.16, 0.60), metal, -4.24, s * 0.80, 1.28);
    }
    /* unditching beam across the tail */
    add(root, bx(0.22, 2.30, 0.22), skin, -3.98, 0, 0.66);

    /* turret ring collar, so the turret does not float on the deck */
    disc(root, metal, 1.06, 1.06, 0.08, 18, TRX, 0, ROOF + 0.01);

    /* ================================================== 8. TURRET ======== */
    /* The renderer traverses for this name and spins it, so it must be
       exactly "turret" and it must carry the gun with it. */
    var T = new THREE.Group();
    T.name = "turret";
    T.position.set(TRX, 0, ROOF);
    root.add(T);

    /* welded core: flat sides, a long squared bustle, no cast rounding */
    var tPts = [
      [ 1.44,  0.34], [ 1.20,  0.62], [ 0.72,  1.08], [ 0.32,  1.32],
      [-0.90,  1.34], [-1.00,  1.14], [-2.18,  1.14],
      [-2.18, -1.14], [-1.00, -1.14], [-0.90, -1.34],
      [ 0.32, -1.32], [ 0.72, -1.08], [ 1.20, -0.62], [ 1.44, -0.34]
    ];
    T.add(new THREE.Mesh(prism(tPts, TCORE), skin));
    /* the roof, stepped in over the fighting compartment only: the bustle
       stays a plate lower, which is where the stowage cage sits */
    var tCap = [
      [ 1.30,  0.30], [ 1.10,  0.56], [ 0.66,  0.98], [ 0.28,  1.22],
      [-0.86,  1.24], [-0.98,  1.06],
      [-0.98, -1.06], [-0.86, -1.24], [ 0.28, -1.22],
      [ 0.66, -0.98], [ 1.10, -0.56], [ 1.30, -0.30]
    ];
    var cap = new THREE.Mesh(prism(tCap, TROOF - TCORE), skin);
    cap.position.z = TCORE;
    T.add(cap);

    /* --- arrow-shaped ERA on the turret face ------------------------- */
    /* Two cassette arrays lie on the cheeks and converge on the mantlet;
       the rows step further forward as they go down, so the face leans
       back the way the real applique does. The arrowhead plate across the
       roof front closes the shape so it reads as an arrow from above. */
    var cheekA = { x: 1.44, y: 0.34 }, cheekB = { x: 0.32, y: 1.32 };
    var cdx = cheekB.x - cheekA.x, cdy = cheekB.y - cheekA.y;
    var clen = Math.sqrt(cdx * cdx + cdy * cdy);
    var cang = Math.atan2(cdy, cdx);
    var cux = cdx / clen, cuy = cdy / clen;
    var cnx = cuy, cny = -cux;                 /* outward, forward-left */
    var cmx = (cheekA.x + cheekB.x) * 0.5, cmy = (cheekA.y + cheekB.y) * 0.5;
    /* Two courses of large cassettes, not three of small ones: the first
       pass read as brickwork from the front, where the photographs show a
       few big trapezoidal plates. The rows step further forward as they go
       down, so the face leans back the way the real applique does. */
    var ROWZ = [0.19, 0.55], ROWO = [0.17, 0.09];
    var casGeo = bx(0.46, 0.15, 0.32);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < ROWZ.length; i++) {
        for (j = -1; j <= 1; j++) {
          var off = ROWO[i];
          var px2 = cmx + cux * (j * 0.50) + cnx * off;
          var py2 = cmy + cuy * (j * 0.50) + cny * off;
          var cm = new THREE.Mesh(casGeo, skin);
          cm.rotation.z = s > 0 ? cang : -cang;
          cm.position.set(px2, s * py2, ROWZ[i]);
          T.add(cm);
        }
      }
      /* the seam plate that closes each array against the mantlet */
      var sp = new THREE.Mesh(bx(0.20, 0.16, 0.56), skin);
      sp.rotation.z = s > 0 ? cang : -cang;
      sp.position.set(1.36 + cnx * 0.10, s * (0.40 + cny * 0.10), 0.38);
      T.add(sp);
    }
    /* arrowhead across the turret face, on the roof line */
    var arrow = [
      [ 1.38, 0.00], [ 0.34, 1.24], [-0.04, 1.24], [-0.04, -1.24], [ 0.34, -1.24]
    ];
    var arw = new THREE.Mesh(M.slab(THREE, arrow, 0.11), skin);
    arw.position.z = TROOF - 0.015;
    T.add(arw);

    /* --- mantlet and 125 mm smoothbore ------------------------------- */
    var GUNZ = 0.38;
    add(T, bx(0.24, 0.98, 0.62), skin, 0.90, 0, GUNZ);      /* trunnion box */
    add(T, bx(0.58, 0.80, 0.54), skin, 1.26, 0, GUNZ);      /* mantlet      */
    tube(T, metal, 0.145, 0.128, 3.00, 14, 2.60, 0, GUNZ);  /* thermal sleeve */
    tube(T, metal, 0.128, 0.185, 0.12, 14, 4.16, 0, GUNZ);
    tube(T, metal, 0.185, 0.185, 0.44, 14, 4.44, 0, GUNZ);  /* bore evacuator */
    tube(T, metal, 0.185, 0.118, 0.12, 14, 4.72, 0, GUNZ);
    tube(T, metal, 0.116, 0.104, 1.92, 14, 5.74, 0, GUNZ);
    tube(T, metal, 0.126, 0.126, 0.09, 14, 6.74, 0, GUNZ);  /* muzzle ring  */
    /* coaxial machine gun port, left of the mantlet */
    tube(T, metal, 0.05, 0.05, 0.30, 8, 1.62, 0.30, GUNZ - 0.02);

    /* --- roof fittings ------------------------------------------------ */
    /* gunner's primary sight, left front: a big armoured box with glass */
    add(T, bx(0.56, 0.42, 0.30), skin, 0.30, 0.52, TROOF + 0.15);
    add(T, bx(0.06, 0.28, 0.18), glass, 0.59, 0.52, TROOF + 0.17);
    add(T, bx(0.16, 0.46, 0.34), skin, 0.10, 0.52, TROOF + 0.17);   /* shutter hinge */

    /* commander's cupola, right, with a panoramic sight and the AA mount */
    disc(T, skin, 0.38, 0.40, 0.22, 16, -0.32, -0.62, TROOF + 0.11);
    disc(T, skin, 0.34, 0.34, 0.08, 16, -0.32, -0.62, TROOF + 0.24);
    add(T, bx(0.34, 0.34, 0.26), skin, -0.05, -0.62, TROOF + 0.36);
    add(T, bx(0.05, 0.22, 0.15), glass, 0.11, -0.62, TROOF + 0.38);
    for (i = 0; i < 4; i++)                                  /* vision blocks */
      add(T, bx(0.09, 0.15, 0.11), glass,
          -0.32 + Math.cos(i * 1.4 - 0.4) * 0.39, -0.62 + Math.sin(i * 1.4 - 0.4) * 0.39,
          TROOF + 0.16);
    /* 12.7 mm anti-aircraft gun on its ring */
    disc(T, metal, 0.30, 0.30, 0.05, 12, -0.32, -0.62, TROOF + 0.29);
    add(T, bx(0.12, 0.10, 0.26), metal, -0.32, -0.62, TROOF + 0.42);
    add(T, bx(0.44, 0.14, 0.16), metal, -0.20, -0.62, TROOF + 0.56);
    tube(T, metal, 0.035, 0.030, 1.05, 8, 0.48, -0.62, TROOF + 0.60);
    add(T, bx(0.26, 0.22, 0.20), metal, -0.34, -0.44, TROOF + 0.55);  /* ammo box */

    /* loader's hatch, left of the cupola */
    disc(T, skin, 0.30, 0.30, 0.07, 14, -0.40, 0.56, TROOF + 0.035);

    /* --- JD-3 laser dazzler ------------------------------------------ */
    /* Boxed head on a short pedestal outboard of the cupola. It is the one
       fitting that dates this tank to the 2000s at a glance, so it is built
       proud of the roof rather than flush. */
    add(T, bx(0.20, 0.20, 0.20), skin, 0.16, -1.02, TROOF + 0.10);
    add(T, bx(0.42, 0.36, 0.36), skin, 0.16, -1.02, TROOF + 0.38);
    tube(T, metal, 0.14, 0.14, 0.10, 12, 0.40, -1.02, TROOF + 0.40);
    tube(T, glass, 0.115, 0.115, 0.04, 12, 0.46, -1.02, TROOF + 0.40);
    add(T, bx(0.10, 0.30, 0.10), metal, 0.16, -1.02, TROOF + 0.60);

    /* --- smoke grenade launchers, both turret sides ------------------- */
    for (s = -1; s <= 1; s += 2) {
      var bank = new THREE.Mesh(bx(0.52, 0.12, 0.34), skin);
      bank.position.set(-0.58, s * 1.34, 0.46);
      T.add(bank);
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 2; j++) {
          var g2 = new THREE.Mesh(cyl(0.056, 0.056, 0.30, 6), metal);
          g2.rotation.z = Math.PI / 2;
          g2.rotation.y = 0;
          var holder = new THREE.Group();
          holder.add(g2);
          holder.rotation.z = s * -0.52;   /* splayed outboard */
          holder.rotation.y = -0.20;       /* tipped up        */
          holder.position.set(-0.70 + i * 0.19, s * 1.40, 0.36 + j * 0.20);
          T.add(holder);
        }
      }
    }

    /* --- bustle: applique grid, stowage cage, snorkel, aerials -------- */
    for (i = 0; i < 3; i++) {
      for (j = -1; j <= 1; j += 2) {
        add(T, bx(0.36, 0.06, 0.24), skin, -1.20 - i * 0.40, j * 1.17, 0.18 + i * 0.0);
        add(T, bx(0.36, 0.06, 0.24), skin, -1.20 - i * 0.40, j * 1.17, 0.48);
      }
    }
    add(T, bx(0.08, 2.06, 0.52), skin, -2.22, 0, 0.40);       /* rear plate */
    /* stowage cage on the bustle roof */
    var cageBar = new THREE.BoxGeometry(0.06, 0.06, 0.40);
    for (i = -1; i <= 1; i += 2) {
      for (j = 0; j < 2; j++) {
        var pm = new THREE.Mesh(cageBar, metal);
        pm.position.set(j ? -2.48 : -1.10, i * 1.14, TCORE + 0.20);
        T.add(pm);
      }
      add(T, new THREE.BoxGeometry(1.44, 0.06, 0.06), metal, -1.79, i * 1.14, TCORE + 0.40);
      add(T, new THREE.BoxGeometry(1.44, 0.06, 0.06), metal, -1.79, i * 1.14, TCORE + 0.06);
    }
    add(T, new THREE.BoxGeometry(0.06, 2.28, 0.06), metal, -2.48, 0, TCORE + 0.40);
    add(T, new THREE.BoxGeometry(0.06, 2.28, 0.06), metal, -1.10, 0, TCORE + 0.40);
    add(T, bx(1.40, 2.22, 0.05), metal, -1.79, 0, TCORE + 0.03);
    /* what is stowed in it: a rolled tarpaulin and a crate */
    axleY(T, skin, 0.22, 0.22, 1.60, 10, -1.34, 0, TCORE + 0.24);
    add(T, bx(0.62, 0.90, 0.34), skin, -2.14, 0.50, TCORE + 0.20);
    /* snorkel stowed across the tail of the bustle */
    axleY(T, metal, 0.11, 0.11, 1.90, 10, -2.36, 0, 0.20);
    /* whip aerials */
    for (s = -1; s <= 1; s += 2) {
      var ae = new THREE.Mesh(cyl(0.018, 0.030, 1.05, 5), metal);
      ae.rotation.x = Math.PI / 2 + s * 0.05;
      ae.position.set(-2.02, s * 1.00, TCORE + 0.50);
      T.add(ae);
    }

    /* ================================================== 9. TEAM COLOUR === */
    /* A PLA star on each turret side in the owning player's colour, plus a
       flash on the bustle tail and one on each front fender, so ownership
       reads from behind and from above as well as from the flank. */
    function starPts(r, ri) {
      var p = [], k, a;
      for (k = 0; k < 10; k++) {
        a = Math.PI / 2 + k * Math.PI / 5;
        p.push([Math.cos(a) * (k % 2 ? ri : r), Math.sin(a) * (k % 2 ? ri : r)]);
      }
      return p;
    }
    /* The turret side is only 0.66 m tall and the smoke banks want the same
       panel, so the star is sized to sit inside it and placed forward of
       them, which is also where the photographs have it. */
    var star = M.slab(THREE, starPts(0.27, 0.113), 0.035, "xz");
    for (s = -1; s <= 1; s += 2) {
      var sm = new THREE.Mesh(star, team);
      sm.position.set(0.04, s > 0 ? 1.372 : -1.337, 0.33);
      T.add(sm);
    }
    /* a band along the top of every side skirt: the one marking that is still
       legible when the tank is a thumb-nail on a busy map, because it is long
       and horizontal rather than a small emblem */
    for (s = -1; s <= 1; s += 2) {
      /* two flashes a side, not a continuous stripe: with the upper hull
         no longer overhanging them, four full-length bands turned the tank
         blue instead of marking it */
      for (i = 0; i < 2; i++)
        add(root, bx(0.86, 0.05, 0.18), team,
            1.12 - i * 2.48, s * (SKY + 0.068), SK_TOP - 0.17);
      /* and a flash on the front fender, seen from directly above */
      add(root, bx(0.60, 0.40, 0.05), team, 1.94, s * 1.44, 1.507);
    }
    /* stern flash, so ownership reads from behind as well */
    add(T, bx(0.07, 1.30, 0.16), team, -2.27, 0, 0.50);
    add(root, bx(0.06, 1.10, 0.16), team, -3.92, 0, 1.24);

    /* ================================================ finish ============ */
    root.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    return root;
  }

  return { build: build };
})();

UNIT_MODELS["pla_e00_mbt"] = {
  len: 7.6,
  build: function (THREE, M, C) { return HeroPlaE00Mbt.build(THREE, M, C); }
};
