/* ============================================================================
   pact_e60_fighter.js  --  HERO reference model: MiG-21 "Fishbed"
   ----------------------------------------------------------------------------
   This is the hand-built style anchor for the e60 era. Everything else in that
   decade gets tuned against it, so the shapes here are drawn from the real
   aeroplane rather than from a generic jet-fighter template.

   What a Fishbed actually is, and what this file therefore builds:

     * a needle. 14.7 m long on a fuselage 1.24 m across -- barely wider than
       the man sitting in it. The whole airframe is a tube wrapped round one
       engine, with a pilot squeezed on top of the intake duct.
     * the nose IS the air intake. A translating shock cone slides out of the
       lip on rails: a separate body with a flat base standing 150 mm PROUD of
       the ring, filling 93% of the bore, and a dead straight taper. Buried in
       the lip or tapered as an ogive it stops being a shock cone and the
       aeroplane turns into a Super Sabre -- which is what the first cut of
       this file did, and why the numbers below are so specific.
     * a 57-degree delta with a straight, unswept trailing edge and a tiny
       clipped tip, carried mid-body with a couple of degrees of anhedral.
     * an all-moving slab tailplane, mounted LOW on the rear fuselage, well
       below the wing line and well aft of the wing trailing edge.
     * a long pitot boom standing over the intake lip, offset to starboard,
       reaching a metre past the tip of the cone.

   Model space: +X nose, +Y left, +Z up, real metres. render3d.js lays the
   model down with rotation.x = -PI/2 and renormalises the overall length.

   Materials are the three house tiers only: SKIN (procedural CanvasTexture),
   METAL (fittings, gear, nozzle, boom) and GLASS (canopy).
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMiG21 = (function () {
  "use strict";

  var D2R = Math.PI / 180;

  /* ---------------------------------------------------------------- paint */
  /* Straight out of the PAINT table at the top of js/air3d_era.js: the spec
     for this unit id is camo "bluegrey", the Soviet blue-grey that Warsaw
     Pact Fishbeds wore over natural metal.  0x7b8b9b, tones as listed. */
  var BASE   = 0x7b8b9b;
  /* The table tones are #6a7d8e / #93a4b2. Used literally they came out of
     this renderer as flat pale grey with no blue in it at all -- ACES plus a
     1.4 key light eats the separation. So the mottle tones are pushed well
     past where they look right in the hex value, which is the only way the
     blue survives to the screen. */
  var TONE_A = "#3f5b74";
  var TONE_B = "#92acc4";
  var BELLY  = "#9aabba";

  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ------------------------------------------------------------- the skin */
  /* One 1024x512 sheet does all the work the geometry is forbidden to do:
     camouflage mottle, the lighter underside, frame and stringer seams, rivet
     rows following those frames, access panels, and grime -- heaviest on the
     belly and in a long soot plume off the afterburner.

     The lofted body carries cylindrical UVs, so u runs tail (0) to nose (1)
     and v runs round the section: v = 0.25 is the spine, v = 0.75 the belly.
     With the default flipY that puts the spine at canvas y = 0.75H and the
     belly at y = 0.25H, which is where the light paint and the dirt go.     */
  var _tex = null;

  function skinCanvas(THREE) {
    var W = 1024, H = 512;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rngFor(210771);
    var i, x, y;

    g.fillStyle = hex(BASE); g.fillRect(0, 0, W, H);

    /* soft mottle: two tones of the same grey, not a disruptive scheme */
    for (i = 0; i < 30; i++) {
      g.globalAlpha = 0.30 + R() * 0.16;
      g.fillStyle = (i & 1) ? TONE_A : TONE_B;
      g.beginPath();
      g.ellipse(R() * W, R() * H, 60 + R() * 150, 26 + R() * 62, R() * 3.14, 0, 6.29);
      g.fill();
    }
    g.globalAlpha = 1;

    /* the underside is lighter than the top on every fighter ever painted.
       v = 0.75 -> canvas y = 0.25H = 128 */
    var bg = g.createLinearGradient(0, 40, 0, 216);
    bg.addColorStop(0.00, "rgba(154,171,186,0.00)");
    bg.addColorStop(0.30, "rgba(154,171,186,0.62)");
    bg.addColorStop(0.70, "rgba(154,171,186,0.62)");
    bg.addColorStop(1.00, "rgba(154,171,186,0.00)");
    g.fillStyle = bg; g.fillRect(0, 40, W, 176);
    g.fillStyle = BELLY; g.globalAlpha = 0.34;
    g.fillRect(0, 100, W, 56); g.globalAlpha = 1;

    /* ---- panel seams: frames across the body, stringers along it -------- */
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.7;
    x = 0;
    while (x < W) {
      x += 22 + R() * 58;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.4;
    y = 0;
    while (y < H) {
      y += 40 + R() * 74;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    }
    /* short local seams round hatches and fairings */
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1;
    for (i = 0; i < 58; i++) {
      var qx = R() * W, qy = R() * H, ql = 34 + R() * 130;
      g.beginPath();
      if (R() < 0.5) { g.moveTo(qx, qy); g.lineTo(qx + ql, qy); }
      else           { g.moveTo(qx, qy); g.lineTo(qx, qy + ql * 0.55); }
      g.stroke();
    }
    /* a highlight on one side of the long seams reads as a raised lap joint */
    g.strokeStyle = "rgba(255,255,255,0.13)"; g.lineWidth = 1;
    x = 6;
    while (x < W) {
      x += 22 + R() * 58;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }

    /* ---- rivet and bolt rows, following the frames --------------------- */
    g.fillStyle = "rgba(0,0,0,0.26)";
    for (i = 0; i < 46; i++) {
      var ry = R() * H, rx0 = R() * W * 0.72, n = 20 + ((R() * 46) | 0);
      for (var k = 0; k < n; k++) g.fillRect(rx0 + k * 6.5, ry, 1.7, 1.7);
    }
    /* a couple of dense bolt circles: engine bay and gun bay fasteners */
    for (i = 0; i < 5; i++) {
      var cx = R() * W, cy = R() * H, rr = 16 + R() * 26;
      for (var a = 0; a < 22; a++) {
        g.fillRect(cx + Math.cos(a / 22 * 6.283) * rr,
                   cy + Math.sin(a / 22 * 6.283) * rr, 1.8, 1.8);
      }
    }

    /* ---- access hatches and inspection panels -------------------------- */
    g.lineWidth = 1.3;
    for (i = 0; i < 24; i++) {
      var hx = R() * W, hy = R() * H, hw = 16 + R() * 40, hh = 12 + R() * 26;
      g.strokeStyle = "rgba(0,0,0,0.38)";
      g.strokeRect(hx, hy, hw, hh);
      g.globalAlpha = 0.10; g.fillStyle = "#000";
      g.fillRect(hx, hy, hw, hh); g.globalAlpha = 1;
      g.fillStyle = "rgba(0,0,0,0.30)";
      g.fillRect(hx + 2, hy + 2, 2, 2);
      g.fillRect(hx + hw - 4, hy + hh - 4, 2, 2);
    }
    /* the ventral airbrake outlines, which the geometry does not model */
    g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 2.2;
    g.strokeRect(W * 0.63, 104, 78, 52);
    g.strokeRect(W * 0.63, 160, 78, 52);
    g.strokeRect(W * 0.30, 108, 96, 46);

    /* ---- weathering ---------------------------------------------------- */
    /* u = 0 is the tail, so the afterburner soot lives on the LEFT edge */
    var soot = g.createLinearGradient(0, 0, W * 0.34, 0);
    soot.addColorStop(0, "rgba(18,16,15,0.52)");
    soot.addColorStop(1, "rgba(18,16,15,0)");
    g.fillStyle = soot; g.fillRect(0, 0, W * 0.34, H);
    /* a hotter ring right at the nozzle -- kept nearly neutral, because a
       warm stain that reads well on the jetpipe reads as mud when a wing
       panel happens to sample the same corner of the sheet */
    var burn = g.createLinearGradient(0, 0, W * 0.07, 0);
    burn.addColorStop(0, "rgba(64,54,46,0.30)");
    burn.addColorStop(1, "rgba(64,54,46,0)");
    g.fillStyle = burn; g.fillRect(0, 0, W * 0.07, H);

    /* grime is heaviest low down: bias the streaks toward the belly band */
    for (i = 0; i < 150; i++) {
      var sx = R() * W;
      var bias = R();
      var sy = 40 + bias * bias * 210;               /* crowds toward y ~ 40..250 */
      g.fillStyle = "rgba(30,27,24," + (0.06 + R() * 0.13).toFixed(3) + ")";
      g.fillRect(sx, sy, 2 + R() * 5, 20 + R() * 110);
    }
    /* lighter general dirt everywhere, so the top is not clinically clean */
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(38,34,30,0.05)";
      g.fillRect(R() * W, R() * H, 3 + R() * 7, 18 + R() * 70);
    }
    /* fuel and hydraulic stains trailing aft from the belly panels */
    for (i = 0; i < 26; i++) {
      var fx = 120 + R() * (W - 260);
      g.fillStyle = "rgba(40,37,32,0.13)";
      g.fillRect(fx, 96 + R() * 70, 30 + R() * 90, 3 + R() * 5);
    }

    /* ---- markings ------------------------------------------------------ */
    /* walkway line along the wing root and the intake danger stripe */
    g.strokeStyle = "rgba(22,22,22,0.42)"; g.lineWidth = 3;
    g.setLineDash([10, 8]);
    g.beginPath(); g.moveTo(W * 0.34, H * 0.62); g.lineTo(W * 0.74, H * 0.62); g.stroke();
    g.setLineDash([]);
    /* Warning flashes stay SHORT. A full-height stripe drawn here for the
       intake lip came out as a red band across the fin, because the tail
       panels sample this sheet at their own scale and offset. */
    g.fillStyle = "rgba(178,42,32,0.45)";
    g.fillRect(W * 0.52, H * 0.56, 52, 5);
    g.fillRect(W * 0.21, H * 0.61, 40, 4);

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  function texture(THREE) {
    if (_tex === null) {
      try { _tex = skinCanvas(THREE); } catch (e) { _tex = false; }
    }
    return _tex;
  }

  /* -------------------------------------------------- the three materials */
  function skinMat(THREE) {                        /* tier 1: painted surface */
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.87, metalness: 0.08, side: THREE.DoubleSide });
    var t = texture(THREE);
    if (t) m.map = t; else m.color.setHex(BASE);
    return m;
  }
  /* Extruded slabs carry UVs in model metres, so the sheet has to be scaled
     down or a six-metre wing tiles the panel lines six times over. */
  function panelMat(THREE, span, offU, offV) {
    var m = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.87, metalness: 0.08, side: THREE.DoubleSide });
    var t = texture(THREE);
    if (!t) { m.color.setHex(BASE); return m; }
    var c = t.clone(); c.needsUpdate = true;
    c.wrapS = c.wrapT = THREE.RepeatWrapping;
    var k = 1 / span;
    c.repeat.set(k, k);
    c.offset.set(offU, offV);
    m.map = c;
    return m;
  }
  function metalMat(THREE, col, r, mt) {           /* tier 2: bare fittings */
    return new THREE.MeshStandardMaterial({
      color: col, roughness: r, metalness: mt, side: THREE.DoubleSide });
  }
  function glassMat(THREE) {                       /* tier 3: the canopy */
    return new THREE.MeshPhysicalMaterial({
      color: 0x4e7f95, roughness: 0.11, metalness: 0.0,
      transparent: true, opacity: 0.82,
      clearcoat: 0.8, clearcoatRoughness: 0.10, side: THREE.DoubleSide });
  }

  /* ------------------------------------------------------------- helpers */
  function sec(x, w, h, zc, sq) {
    return { x: x, w: w, h: h, zc: zc || 0, sq: sq === undefined ? 1 : sq };
  }
  function body(THREE, M, tbl, segs, mat) {
    return new THREE.Mesh(M.loft(THREE, tbl, segs), mat);
  }
  function box(THREE, sx, sy, sz, px, py, pz, mat) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    b.position.set(px, py, pz);
    return b;
  }
  function cyl(THREE, rt, rb, h, seg, open, mat) {
    return new THREE.Mesh(
      new THREE.CylinderGeometry(rt, rb, h, seg, 1, !!open), mat);
  }
  /* a lifting surface and its mirror image */
  function pair(THREE, M, g, pts, thick, z, anhedralDeg, mat) {
    for (var s = -1; s <= 1; s += 2) {
      var q = [], i;
      for (i = 0; i < pts.length; i++) q.push([pts[i][0], pts[i][1] * s]);
      var m = new THREE.Mesh(M.slab(THREE, q, thick), mat);
      m.position.z = z - thick * 0.5;
      m.rotation.x = s * (anhedralDeg || 0) * D2R;
      g.add(m);
    }
  }
  /* A vertical surface drawn in the XZ plane. slab() extrudes toward +Z and
     the "xz" rotation sends that to -Y, so the raw plate lies entirely on the
     starboard side; half a thickness of +Y puts it back on the centreline.
     Passing an extra offset here on top of that is how the fin ended up
     85 mm off centre the first time round. */
  function finPlate(THREE, M, pts, thick, mat) {
    var m = new THREE.Mesh(M.slab(THREE, pts, thick, "xz"), mat);
    m.position.y = thick * 0.5;
    return m;
  }

  /* ===================================================== the airframe ==== */
  /* Longitudinal datum, metres. The intake lip is the front of the tube; the
     shock cone lives ahead of it and the pitot boom ahead of that. */
  var LIP  =  5.55;     /* intake lip plane                                  */
  var CBASE=  5.70;     /* flat base of the shock cone, standing PROUD of it */
  var TIP  =  7.05;     /* tip of the shock cone -- nose of the aeroplane    */
  var TAIL = -7.35;     /* jetpipe exit plane                                */

  var SWEEP   = 57;                       /* delta leading edge, degrees     */
  var TANSW   = Math.tan(SWEEP * D2R);
  var SEMI    = 3.577;                    /* half of 7.154 m span            */
  var ROOT_LE =  1.05;
  var ROOT_TE = -4.92;                    /* trailing edge is unswept        */
  var WZ      = -0.10;                    /* mid-set, a touch low            */
  var WT      =  0.13;                    /* wing thickness                  */

  function build(THREE, M, C) {
    var g = new THREE.Group();
    g.name = "mig21";

    var skin   = skinMat(THREE);
    var panel  = panelMat(THREE, 13.2, 0.34, 0.30);
    var panelB = panelMat(THREE, 9.0, 0.74, 0.42);     /* smaller surfaces */
    var metal  = metalMat(THREE, 0x9aa2a8, 0.55, 0.50);
    var steel  = metalMat(THREE, 0x6f767c, 0.50, 0.60);
    var dark   = metalMat(THREE, 0x1d2023, 0.60, 0.40);
    var soot   = metalMat(THREE, 0x14161a, 0.62, 0.45);
    var rubber = metalMat(THREE, 0x131416, 0.95, 0.04);
    var team   = metalMat(THREE, C && C.team !== undefined ? C.team : 0x3f7fd0, 0.55, 0.40);
    var glass  = glassMat(THREE);

    /* ------------------------------------------------------- the needle -- */
    /* Circular section end to end. Widest (1.24 m) just behind the cockpit,
       tapering gently both ways: the whole thing is a duct with an engine in
       it. sq = 1 keeps it round; anything lower would square off a tube that
       is not square. */
    g.add(body(THREE, M, [
      sec(TAIL,  0.435, 0.435,  0.030),
      sec(-7.05, 0.445, 0.445,  0.030),
      sec(-6.55, 0.465, 0.465,  0.028),
      sec(-5.90, 0.495, 0.495,  0.024),
      sec(-5.10, 0.530, 0.530,  0.019),
      sec(-4.20, 0.565, 0.565,  0.012),
      sec(-3.20, 0.595, 0.595,  0.006),
      sec(-2.10, 0.615, 0.615,  0.000),
      sec(-1.00, 0.622, 0.622,  0.000),
      sec( 0.10, 0.620, 0.620,  0.000),
      sec( 1.20, 0.610, 0.612, -0.005),
      sec( 2.20, 0.596, 0.600, -0.012),
      sec( 3.10, 0.586, 0.590, -0.022),
      sec( 3.90, 0.573, 0.577, -0.032),
      sec( 4.60, 0.563, 0.566, -0.042),
      sec( 5.15, 0.557, 0.560, -0.050),
      sec( 5.40, 0.554, 0.557, -0.054),
      sec( LIP,  0.552, 0.555, -0.056),
    ], 32, skin));

    /* ---- dorsal spine ---------------------------------------------------
       The MF/bis spine is a broad flat-topped fairing carrying fuel and
       control runs from behind the canopy back into the fin fillet. It is
       what makes the top line of a late Fishbed one long straight sweep
       instead of a dip behind the cockpit, so it changes the silhouette. */
    /* It ran out at x = -5.30 in the first cut, which left a bare metre of
       round fuselage between the end of the spine and the front of the fin
       and killed the one-long-line look. It now runs all the way aft into
       the fin root, and it is 0.67 m across at its widest -- half again the
       width of the man underneath it. */
    g.add(body(THREE, M, [
      sec(-7.22, 0.244, 0.146, 0.454, 0.50),
      sec(-6.40, 0.266, 0.174, 0.486, 0.50),
      sec(-5.50, 0.284, 0.196, 0.510, 0.50),
      sec(-4.40, 0.302, 0.214, 0.534, 0.50),
      sec(-3.20, 0.318, 0.228, 0.554, 0.50),
      sec(-2.00, 0.330, 0.238, 0.572, 0.50),
      sec(-0.60, 0.336, 0.244, 0.582, 0.50),
      sec( 0.80, 0.322, 0.226, 0.578, 0.50),
      sec( 1.70, 0.262, 0.166, 0.556, 0.50),
      sec( 2.30, 0.106, 0.064, 0.512, 0.50),
    ], 20, skin));

    /* ---- intake: lip, duct and translating shock cone -------------------
       The defining feature. The nose is a hole; the cone stands proud of it
       on a collar with a real step, because on the aeroplane it slides fore
       and aft to hold the shock on the lip at speed. */
    /* The lip is a fat rolled ring at the very front of the barrel. Its bore
       is 0.92 m across; nothing forward of this plane belongs to the duct. */
    var lipRing = new THREE.Mesh(new THREE.TorusGeometry(0.505, 0.050, 8, 34), skin);
    lipRing.rotation.y = Math.PI / 2;
    lipRing.position.set(LIP, 0, -0.056);
    g.add(lipRing);
    /* an inner lip in bare metal, so the bore rim catches light separately
       from the painted barrel and the annulus round the cone reads as a HOLE */
    var lipIn = cyl(THREE, 0.462, 0.470, 0.20, 30, true, steel);
    lipIn.rotation.z = -Math.PI / 2;
    lipIn.position.set(LIP - 0.09, 0, -0.056);
    g.add(lipIn);

    /* the duct receding into the aeroplane -- near black, because what makes
       an intake read as an intake is that you cannot see the back of it */
    var duct = cyl(THREE, 0.456, 0.390, 2.30, 28, true, dark);
    duct.rotation.z = -Math.PI / 2;
    duct.position.set(LIP - 1.20, 0, -0.056);
    g.add(duct);
    var ductEnd = new THREE.Mesh(new THREE.CircleGeometry(0.392, 24), soot);
    ductEnd.rotation.y = -Math.PI / 2;
    ductEnd.position.set(LIP - 2.34, 0, -0.056);
    g.add(ductEnd);

    /* ---- the shock cone -------------------------------------------------
       This is the whole point of the aeroplane's face and the first version
       of this file got it wrong: the cone was tucked inside the lip and
       tapered so gently out of the barrel that the nose read as one smooth
       radome -- an F-100, not a MiG. Three things fix it.

         1. the base plane sits 0.15 m PROUD of the lip, so there is a real
            annular gap you can see the dark bore through from three-quarters;
         2. the base is 0.86 m across against a 0.92 m bore -- it fills 93%
            of the hole, which is what a translating centrebody looks like;
         3. the base is FLAT and the taper is straight, so the side profile
            steps down from the 1.11 m barrel to the cone and then runs dead
            straight to the tip. That step is the silhouette.

       Length forward of the lip is 1.50 m on a 0.92 m bore -- the ratio the
       real centrebody shows at full extension. */
    g.add(body(THREE, M, [
      sec(CBASE,        0.430, 0.430, -0.056),
      sec(CBASE + 0.20, 0.426, 0.426, -0.055),
      sec(CBASE + 0.23, 0.398, 0.398, -0.055),   /* step: cone section joint */
      sec(CBASE + 0.55, 0.284, 0.284, -0.052),
      sec(CBASE + 0.90, 0.160, 0.160, -0.048),
      sec(CBASE + 1.18, 0.060, 0.060, -0.044),
      sec(TIP - 0.05,   0.032, 0.032, -0.042),
      sec(TIP,          0.008, 0.008, -0.042),
    ], 30, skin));
    /* the flat annular disc that closes the base of the cone. Without it the
       loft is open and you see straight up the inside of the cone. */
    var coneBase = new THREE.Mesh(new THREE.CircleGeometry(0.430, 30), steel);
    coneBase.rotation.y = -Math.PI / 2;
    coneBase.position.set(CBASE - 0.002, 0, -0.056);
    g.add(coneBase);
    /* the rails the centrebody slides on, bridging the gap at four points --
       small, but they are what stops the cone looking like it floats */
    for (var cr = 0; cr < 4; cr++) {
      var ca = cr / 4 * Math.PI * 2 + Math.PI / 4;
      var rail = box(THREE, 0.20, 0.055, 0.055, LIP + 0.06,
                     Math.cos(ca) * 0.445, -0.056 + Math.sin(ca) * 0.445, steel);
      rail.rotation.x = ca;
      g.add(rail);
    }

    /* ---- afterburner nozzle --------------------------------------------- */
    g.add(body(THREE, M, [
      sec(TAIL,  0.435, 0.435, 0.030),
      sec(-7.48, 0.446, 0.446, 0.030),
      sec(-7.62, 0.452, 0.452, 0.030),
    ], 26, metal));
    /* the dark throat receding into the aeroplane */
    g.add(body(THREE, M, [
      sec(-7.64, 0.402, 0.402, 0.030),
      sec(-7.30, 0.396, 0.396, 0.030),
      sec(-6.80, 0.330, 0.330, 0.028),
      sec(-6.40, 0.250, 0.250, 0.026),
    ], 22, soot));
    /* nozzle petals: twelve of them round the rim, which is what makes an
       afterburner nozzle read as an afterburner nozzle */
    for (var pz = 0; pz < 14; pz++) {
      var pa = pz / 14 * Math.PI * 2;
      var pet = box(THREE, 0.26, 0.115, 0.028, -7.50,
                    Math.cos(pa) * 0.438, 0.030 + Math.sin(pa) * 0.438, steel);
      pet.rotation.x = pa;
      g.add(pet);
    }

    /* ---- the delta ------------------------------------------------------
       57 degrees on the leading edge, trailing edge square across, tip clipped
       to just under half a metre of chord. Two degrees of anhedral. */
    var tipLE = ROOT_LE - SEMI * TANSW;
    var wing = [
      [ROOT_LE,  0.00],
      [tipLE,    SEMI],
      [ROOT_TE,  SEMI],
      [ROOT_TE,  0.00],
    ];
    pair(THREE, M, g, wing, WT, WZ, -2, panel);

    /* wing-root fairing: a shallow lens along the fuselage flank that blends
       the delta into the tube. There is no leading-edge extension on a
       Fishbed -- the wing root simply runs into the side of the body. */
    for (var rs = -1; rs <= 1; rs += 2) {
      var rf = body(THREE, M, [
        sec(ROOT_TE - 0.10, 0.055, 0.045, WZ - 0.03, 0.70),
        sec(-4.00,          0.170, 0.105, WZ - 0.02, 0.70),
        sec(-1.50,          0.205, 0.130, WZ,        0.70),
        sec( 0.40,          0.165, 0.100, WZ + 0.01, 0.70),
        sec(ROOT_LE + 0.06, 0.050, 0.040, WZ + 0.01, 0.70),
      ], 12, skin);
      rf.position.y = rs * 0.595;
      g.add(rf);
    }

    /* boundary-layer fences, one per wing, standing proud of the upper
       surface at a bit over half span -- small, but they are a Fishbed
       fingerprint and they catch the light from three-quarters on */
    var fy = 1.95, fLE = ROOT_LE - fy * TANSW;
    for (var fs = -1; fs <= 1; fs += 2) {
      var fz = WZ - fy * Math.tan(2 * D2R);
      var fen = finPlate(THREE, M, [
        [fLE + 0.05, fz - 0.09], [fLE - 0.28, fz + 0.09],
        [fLE - 1.02, fz + 0.09], [fLE - 1.10, fz - 0.09],
      ], 0.035, panelB);
      fen.position.y = fs * fy;
      g.add(fen);
    }
    /* the wheel-well blisters on the upper wing surface, inboard */
    for (var bs = -1; bs <= 1; bs += 2) {
      var bz = WZ - 1.16 * Math.tan(2 * D2R);
      var bl = body(THREE, M, [
        sec(-3.55, 0.10, 0.030, bz - 0.05, 0.6),
        sec(-3.00, 0.24, 0.095, bz - 0.03, 0.6),
        sec(-2.10, 0.28, 0.115, bz - 0.02, 0.6),
        sec(-1.35, 0.26, 0.108, bz - 0.02, 0.6),
        sec(-0.85, 0.16, 0.055, bz - 0.04, 0.6),
      ], 14, skin);
      bl.position.y = bs * 1.16;
      g.add(bl);
    }

    /* ---- all-moving slab tailplane --------------------------------------
       Low on the rear fuselage, comfortably below the wing plane and aft of
       its trailing edge, so the two surfaces read as separate from the side.
       The whole panel pivots -- there is no fixed stabiliser and no elevator
       hinge line, which is why the outline is one clean plate. */
    var tSemi = 1.87, tRootLE = -5.30, tRootTE = -7.20;
    var tTipLE = tRootLE - tSemi * Math.tan(50 * D2R);
    var stab = [
      [tRootLE,        0.00],
      [tTipLE,         tSemi],
      [tTipLE - 0.62,  tSemi],
      [tRootTE,        0.00],
    ];
    pair(THREE, M, g, stab, 0.11, -0.22, 0, panelB);
    /* the pivot fairings where the stabilators enter the fuselage */
    for (var ts = -1; ts <= 1; ts += 2) {
      var tf = body(THREE, M, [
        sec(-7.32, 0.070, 0.065, -0.22, 0.7),
        sec(-6.80, 0.135, 0.120, -0.22, 0.7),
        sec(-6.00, 0.148, 0.132, -0.22, 0.7),
        sec(-5.40, 0.088, 0.078, -0.22, 0.7),
      ], 12, skin);
      tf.position.y = ts * 0.50;
      g.add(tf);
    }

    /* ---- fin, fillet, ventral fin ---------------------------------------
       Broad-chorded and blunt-tipped, not a needle: the tip still carries
       1.3 m of chord. The fillet ahead of it is the tail end of the spine. */
    /* A BROAD LOW TRAPEZOID, which is the shape people actually recognise.
       Root chord 4.85 m -- a third of the whole aeroplane -- against 1.79 m
       of height above the spine and a tip that still carries 1.64 m of
       chord. Leading edge sweep 60.5 degrees. Built tall and narrow it looks
       like a Sabre's fin, which is exactly what the first cut looked like. */
    g.add(finPlate(THREE, M, [
      [-2.45, 0.55], [-5.62, 2.34], [-7.26, 2.34], [-7.52, 1.10], [-7.30, 0.55],
    ], 0.195, panel));

    /* the dorsal fillet: a broad low fairing that flares out either side of
       the fin root and runs forward along the spine. On the aeroplane it is
       structure, not decoration -- it carries the fin loads into the frames
       -- and from three-quarters it is the difference between a fin that
       grows out of the aeroplane and a plate stuck on top of it. */
    g.add(body(THREE, M, [
      sec(-7.30, 0.222, 0.128, 0.520, 0.42),
      sec(-6.50, 0.252, 0.150, 0.552, 0.42),
      sec(-5.60, 0.256, 0.155, 0.564, 0.42),
      sec(-4.60, 0.240, 0.146, 0.560, 0.42),
      sec(-3.60, 0.204, 0.124, 0.542, 0.42),
      sec(-2.70, 0.148, 0.090, 0.512, 0.42),
      sec(-1.90, 0.078, 0.048, 0.482, 0.42),
    ], 16, skin));

    /* the dielectric cap on top of the fin */
    g.add(body(THREE, M, [
      sec(-7.28, 0.052, 0.034, 2.352, 0.6),
      sec(-6.90, 0.090, 0.066, 2.392, 0.6),
      sec(-6.20, 0.094, 0.072, 2.400, 0.6),
      sec(-5.70, 0.054, 0.038, 2.372, 0.6),
    ], 12, skin));
    /* rudder hinge line, three bracket fairings down the fin trailing edge */
    for (var rh = 0; rh < 3; rh++) {
      g.add(box(THREE, 0.22, 0.255, 0.16, -7.20, 0, 1.24 + rh * 0.50, steel));
    }

    /* ventral fin under the jetpipe. Head on it is half the reason a Fishbed
       looks like a Fishbed, so it is deep enough to break the belly line:
       0.75 m below the bottom of the fuselage. */
    g.add(finPlate(THREE, M, [
      [-3.52, -0.360], [-6.62, -0.440], [-6.30, -1.185], [-4.66, -1.110],
    ], 0.155, panelB));

    /* ---- cockpit -------------------------------------------------------- */
    /* One canopy loft covers the raked windscreen and the hood behind it,
       because on a Fishbed they are one continuous glazed line falling into
       the spine. */
    g.add(body(THREE, M, [
      sec(2.02, 0.094, 0.050, 0.628, 0.80),
      sec(2.32, 0.292, 0.222, 0.686, 0.80),
      sec(2.72, 0.348, 0.306, 0.700, 0.80),
      sec(3.12, 0.344, 0.298, 0.694, 0.80),
      sec(3.44, 0.318, 0.256, 0.678, 0.80),
      sec(3.72, 0.268, 0.180, 0.650, 0.80),
      sec(4.00, 0.212, 0.096, 0.614, 0.80),
    ], 20, glass));

    /* what shows through the glass: coaming, seat, headrest. Not instruments
       -- those are texture's business, and there is no texture in here. */
    g.add(box(THREE, 0.30, 0.42, 0.13, 3.46, 0, 0.600, dark));
    g.add(box(THREE, 0.30, 0.36, 0.40, 2.56, 0, 0.585, dark));
    g.add(box(THREE, 0.15, 0.30, 0.20, 2.32, 0, 0.775, dark));
    /* canopy framing: the bow between screen and hood, and the two sills */
    var bow = new THREE.Mesh(new THREE.TorusGeometry(0.305, 0.024, 5, 16), steel);
    bow.rotation.y = Math.PI / 2;
    bow.position.set(3.46, 0, 0.678);
    g.add(bow);
    var arc = new THREE.Mesh(new THREE.TorusGeometry(0.195, 0.022, 5, 14), steel);
    arc.rotation.y = Math.PI / 2;
    arc.position.set(4.00, 0, 0.612);
    g.add(arc);
    for (var cs = -1; cs <= 1; cs += 2) {
      g.add(box(THREE, 1.72, 0.045, 0.055, 2.92, cs * 0.298, 0.586, steel));
    }
    /* the rear-view periscope on the canopy spine */
    g.add(box(THREE, 0.20, 0.10, 0.13, 3.02, 0, 0.978, steel));
    g.add(box(THREE, 0.06, 0.11, 0.10, 3.13, 0, 0.952, dark));

    /* ---- GSh-23 gun pack ------------------------------------------------ */
    g.add(body(THREE, M, [
      sec(1.52, 0.110, 0.075, -0.615, 0.55),
      sec(1.95, 0.205, 0.150, -0.678, 0.55),
      sec(2.45, 0.228, 0.168, -0.700, 0.55),
      sec(2.90, 0.205, 0.148, -0.686, 0.55),
      sec(3.16, 0.120, 0.080, -0.648, 0.55),
    ], 16, skin));
    for (var gs = -1; gs <= 1; gs += 2) {
      var bar = cyl(THREE, 0.032, 0.036, 0.34, 8, false, steel);
      bar.rotation.z = -Math.PI / 2;
      bar.position.set(3.28, gs * 0.055, -0.660);
      g.add(bar);
    }

    /* ---- stores: centreline tank, four pylons, four missiles ------------ */
    g.add(body(THREE, M, [
      sec(-2.62, 0.048, 0.048, -1.000),
      sec(-2.30, 0.126, 0.126, -1.005),
      sec(-1.84, 0.206, 0.206, -1.010),
      sec(-1.04, 0.266, 0.266, -1.012),
      sec( 0.00, 0.282, 0.282, -1.012),
      sec( 0.70, 0.272, 0.272, -1.010),
      sec( 1.04, 0.216, 0.216, -1.006),
      sec( 1.22, 0.122, 0.122, -1.002),
      sec( 1.31, 0.036, 0.036, -1.000),
    ], 20, skin));
    g.add(box(THREE, 0.62, 0.09, 0.20, -0.20, 0, -0.700, panelB));
    for (var tk = 0; tk < 4; tk++) {
      var ta = tk / 4 * Math.PI * 2 + Math.PI / 4;
      var tfn = box(THREE, 0.52, 0.035, 0.30, -2.28,
                    Math.cos(ta) * 0.16, -1.005 + Math.sin(ta) * 0.16, panelB);
      tfn.rotation.x = ta;
      g.add(tfn);
    }

    /* a K-13 on each pylon: fat body, four canards, four tail fins */
    function missile(xc, y, z) {
      var mg = new THREE.Group();
      mg.add(body(THREE, M, [
        sec(xc - 1.42, 0.040, 0.040, z),
        sec(xc - 1.30, 0.086, 0.086, z),
        sec(xc - 0.60, 0.092, 0.092, z),
        sec(xc + 0.86, 0.092, 0.092, z),
        sec(xc + 1.10, 0.070, 0.070, z),
        sec(xc + 1.30, 0.028, 0.028, z),
      ], 12, skin));
      var q;
      for (q = 0; q < 4; q++) {
        var qa = q / 4 * Math.PI * 2 + Math.PI / 4;
        var tail = box(THREE, 0.46, 0.026, 0.22, xc - 1.18,
                       Math.cos(qa) * 0.15, z + Math.sin(qa) * 0.15, metal);
        tail.rotation.x = qa; mg.add(tail);
        var can = box(THREE, 0.30, 0.024, 0.16, xc + 0.62,
                      Math.cos(qa) * 0.13, z + Math.sin(qa) * 0.13, metal);
        can.rotation.x = qa; mg.add(can);
      }
      var see = cyl(THREE, 0.030, 0.030, 0.07, 8, false, dark);
      see.rotation.z = -Math.PI / 2;
      see.position.set(xc + 1.33, 0, z);
      mg.add(see);
      mg.position.y = y;
      return mg;
    }
    var PY = [[1.55, -2.25], [2.55, -3.62]];
    for (var ps = -1; ps <= 1; ps += 2) {
      for (var pi = 0; pi < PY.length; pi++) {
        var py = PY[pi][0], px = PY[pi][1];
        g.add(box(THREE, 0.86, 0.085, 0.32, px, ps * py, WZ - 0.24, panelB));
        g.add(missile(px + 0.10, ps * py, WZ - 0.52));
      }
    }

    /* ---- undercarriage --------------------------------------------------
       Named "gear" so render3d can stow it in cruise and drop it on the
       apron. Nose leg retracts forward under the duct; the mains fold into
       the wing root, which is why the blisters above them exist. */
    var gear = new THREE.Group();
    gear.name = "gear";
    g.add(gear);

    /* nose leg */
    var nl = cyl(THREE, 0.052, 0.060, 0.92, 8, false, steel);
    nl.rotation.x = Math.PI / 2;
    nl.position.set(2.90, 0, -1.01);
    gear.add(nl);
    gear.add(box(THREE, 0.13, 0.30, 0.26, 2.90, 0, -1.40, steel));
    var nw = cyl(THREE, 0.245, 0.245, 0.155, 16, false, rubber);
    nw.position.set(2.90, 0, -1.47);
    gear.add(nw);
    var nhub = cyl(THREE, 0.085, 0.085, 0.165, 10, false, steel);
    nhub.position.set(2.90, 0, -1.47);
    gear.add(nhub);
    /* the mudguard over the nosewheel, which every Fishbed carries */
    gear.add(box(THREE, 0.52, 0.22, 0.035, 2.98, 0, -1.24, steel));
    var nbrace = cyl(THREE, 0.030, 0.030, 0.62, 6, false, steel);
    nbrace.rotation.x = Math.PI / 2; nbrace.rotation.y = 0.55;
    nbrace.position.set(3.16, 0, -0.86);
    gear.add(nbrace);
    for (var ns = -1; ns <= 1; ns += 2) {
      var nd = box(THREE, 1.15, 0.035, 0.30, 2.86, ns * 0.20, -0.62, panelB);
      nd.rotation.x = ns * 0.38;
      gear.add(nd);
    }

    /* main legs: straight struts leaning out to a 2.69 m track */
    var MY = 1.345, MZ = -1.30, MX = -1.35;
    var dy = MY - 0.60, dz = MZ - (-0.34);
    var legL = Math.sqrt(dy * dy + dz * dz);
    for (var ms = -1; ms <= 1; ms += 2) {
      /* the cylinder's own axis is +Y; rotating it about X by ang sends that
         axis to (0, cos ang, sin ang), so ang aims the leg down and out */
      var ang = Math.atan2(dz, ms * dy);
      var lg = cyl(THREE, 0.058, 0.068, legL, 8, false, steel);
      lg.rotation.x = ang;
      lg.position.set(MX + 0.10, ms * (0.60 + dy * 0.5), -0.34 + dz * 0.5);
      gear.add(lg);

      var mw = cyl(THREE, 0.395, 0.395, 0.20, 18, false, rubber);
      mw.position.set(MX, ms * MY, MZ);
      gear.add(mw);
      var hub = cyl(THREE, 0.145, 0.145, 0.215, 10, false, steel);
      hub.position.set(MX, ms * MY, MZ);
      gear.add(hub);

      /* drag brace and the two doors: one on the fuselage, one on the wing */
      var br = cyl(THREE, 0.032, 0.032, 0.86, 6, false, steel);
      br.rotation.x = ang; br.rotation.z = 0.42;
      br.position.set(MX + 0.62, ms * 0.92, -0.74);
      gear.add(br);
      var d1 = box(THREE, 1.30, 0.035, 0.44, MX + 0.10, ms * 0.60, -0.52, panelB);
      d1.rotation.x = ms * 0.30;
      gear.add(d1);
      var d2 = box(THREE, 1.05, 0.42, 0.035, MX - 0.05, ms * 1.20, WZ - 0.16, panelB);
      gear.add(d2);
    }

    /* ---- probes, antennas, lights --------------------------------------- */
    /* The pitot boom: long, offset to starboard, standing over the intake lip
       and reaching a good metre past the tip of the cone. On the real machine
       it carries the static ports and the yaw and pitch vanes. */
    var bx0 = 5.30, bx1 = 8.25;
    var boomY = -0.300, boomZ = 0.408;
    var boom = cyl(THREE, 0.022, 0.052, bx1 - bx0, 8, false, steel);
    boom.rotation.z = -Math.PI / 2;
    boom.position.set((bx0 + bx1) * 0.5, boomY, boomZ);
    g.add(boom);
    var bfair = body(THREE, M, [
      sec(4.86, 0.052, 0.048, boomZ - 0.115, 0.7),
      sec(5.20, 0.092, 0.086, boomZ - 0.055, 0.7),
      sec(5.55, 0.098, 0.092, boomZ - 0.020, 0.7),
      sec(5.95, 0.066, 0.060, boomZ, 0.7),
    ], 12, skin);
    bfair.position.y = boomY;
    g.add(bfair);
    /* the two vanes near the tip, one in each plane */
    g.add(box(THREE, 0.10, 0.020, 0.20, 7.70, boomY, boomZ + 0.11, steel));
    g.add(box(THREE, 0.10, 0.20, 0.020, 7.50, boomY + 0.11, boomZ, steel));
    var ntip = cyl(THREE, 0.008, 0.022, 0.26, 6, false, steel);
    ntip.rotation.z = -Math.PI / 2;
    ntip.position.set(bx1 + 0.11, boomY, boomZ);
    g.add(ntip);

    /* blade antennas above the spine and under the belly, and the little
       triangular IFF fin under the nose */
    g.add(box(THREE, 0.28, 0.035, 0.20, -1.10, 0, 0.905, dark));
    g.add(box(THREE, 0.24, 0.035, 0.18, -0.20, 0, -0.700, dark));
    g.add(finPlate(THREE, M, [
      [4.35, -0.520], [4.05, -0.760], [3.55, -0.755], [3.60, -0.548],
    ], 0.05, dark));

    /* engine bay cooling scoops on the rear fuselage flanks */
    for (var ss = -1; ss <= 1; ss += 2) {
      var sc = box(THREE, 0.46, 0.10, 0.20, -5.35, ss * 0.50, 0.14, skin);
      sc.rotation.x = ss * 0.25;
      g.add(sc);
    }

    /* navigation lights on the clipped tips: port red, starboard green */
    var portLamp = metalMat(THREE, 0xc4362a, 0.45, 0.35);
    var stbdLamp = metalMat(THREE, 0x2fa851, 0.45, 0.35);
    for (var ls = -1; ls <= 1; ls += 2) {
      var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.058, 8, 6),
                                ls > 0 ? portLamp : stbdLamp);
      lamp.position.set(ROOT_TE + 0.28, ls * (SEMI - 0.03), WZ - 0.02);
      g.add(lamp);
    }

    /* ---- team colour ----------------------------------------------------
       Three flashes, so ownership reads from any angle on a busy map: a band
       round the nose behind the intake lip, a stripe on each wing, and a
       flash on both faces of the fin. */
    var nband = cyl(THREE, 0.578, 0.584, 0.36, 26, true, team);
    nband.rotation.z = -Math.PI / 2;
    nband.position.set(5.02, 0, -0.050);
    g.add(nband);

    /* Wing flashes. The first attempt straddled the wing section with a thin
       box and vanished: it stood 12 mm proud, which at the scale this thing
       is drawn is a third of a pixel. What reads on a busy map is AREA, so
       these are proper panels laid on the skin.

       The z figures below are not guesses. M.slab clamps its bevel to 5% of
       the outline's smaller dimension, so an extrusion is thicker than the
       thickness you asked for: the wing is nominally 0.13 but its flat upper
       plateau actually sits 0.117 above the section centre, and the flash's
       own plateaus sit at -0.020 and +0.070 in its local frame. Sitting one
       on the other means working from those numbers, not from WT. Both
       panels get the wing's own anhedral so they stay flush out to the tip.

       Kept outboard of the boundary-layer fence at y = 1.95 so the fence does
       not stab through the flash. */
    var flash = [
      [-2.90, 2.15], [-4.30, 3.15], [-4.66, 3.15], [-4.66, 2.15],
    ];
    for (var wsn = -1; wsn <= 1; wsn += 2) {
      var qf = [], qi;
      for (qi = 0; qi < flash.length; qi++) {
        qf.push([flash[qi][0], flash[qi][1] * wsn]);
      }
      var up = new THREE.Mesh(M.slab(THREE, qf, 0.05), team);
      up.position.z = 0.010;            /* plateau 63 mm above the wing */
      up.rotation.x = wsn * -2 * D2R;
      g.add(up);
      var dn = new THREE.Mesh(M.slab(THREE, qf, 0.05), team);
      dn.position.z = -0.257;           /* and the same underneath */
      dn.rotation.x = wsn * -2 * D2R;
      g.add(dn);
    }

    /* Fin flash, one on each face. Same arithmetic: the fin plate asks for
       0.195 of thickness and its faces end up at +/- 0.1755. */
    var finFlash = [
      [-5.35, 1.42], [-6.05, 2.22], [-7.16, 2.22], [-7.16, 1.42],
    ];
    for (var fsn = -1; fsn <= 1; fsn += 2) {
      var ff = new THREE.Mesh(M.slab(THREE, finFlash, 0.055, "xz"), team);
      ff.position.y = fsn > 0 ? 0.2225 : -0.1675;
      g.add(ff);
    }

    return g;
  }

  return { build: build };
})();

/* A hero model replaces whatever parametric stand-in exists for this id. */
UNIT_MODELS["pact_e60_fighter"] = {
  len: 14.7,
  build: function (THREE, M, C) { return HeroMiG21.build(THREE, M, C); },
};
