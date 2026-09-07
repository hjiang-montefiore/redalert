/* ==================== js/hero/stealth_c.js ====================
   HERO reference model - Chengdu J-20A "Mighty Dragon"  (era e20, PLAAF)

   Hand-built style anchor for the e20 aircraft set. Model space follows
   models3d.js: +X nose, +Y left, +Z up, real metres. render3d.js lays the
   template down with rotation.x = -PI/2 and renormalises overall length, so
   what survives to the screen is the PROPORTION.

   Period cues this airframe exists to carry:
     - very long chined forebody, diamond section, sharp lateral chine edge
     - large all-moving CANARDS well forward, span ~half the wing span,
       with pronounced anhedral
     - cropped delta wing, 48 deg leading edge, slightly forward-swept TE
     - twin outward-canted all-moving fins PLUS large canted ventral fins
     - diverterless supersonic intakes: a compression bump on the fuselage
       side ahead of a raked, sharp-lipped cowl

   Reference: Wikimedia Commons photographs cached in the run scratchpad -
   j20_a.jpg (side / underside pair), j20_b.jpg (three-quarter underside,
   intake and canard detail), j20_c.jpg (four-ship, near plan view).

   Materials: exactly three tiers - SKIN (textured), METAL, GLASS.
   Colour: PAINT.darkgrey from the table at the top of js/air3d_era.js,
   which is what air_specs.js already assigns to stealth_c.
   ============================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJ20 = (function () {
  "use strict";

  var LEN  = 21.2;                 /* real length, metres */
  var D2R  = Math.PI / 180;
  var BASE = 0x4f575d;             /* PAINT.darkgrey, air3d_era.js          */

  /* ------------------------------------------------------------ rng ----- */
  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }

  /* Deepen and saturate a team colour before painting with it. This
     renderer runs ACES tone mapping under a 1.4 key plus 0.5 ambient, so
     roughly a 1.9x multiplier lands on every diffuse surface; a mid blue
     clips its blue channel, ACES desaturates the clip, and the flash comes
     out white. Renormalising the channels, putting a gamma on the ratio to
     push the weak channels down, and scaling the whole thing back to about
     three fifths brightness leaves a colour that is still recognisably the
     player's after the tone curve has had it. */
  function teamPaint(c) {
    var r = ((c >> 16) & 255) / 255, g = ((c >> 8) & 255) / 255, b = (c & 255) / 255;
    var m = Math.max(r, g, b, 1e-3), k = 0.60 * m;
    function ch(v) { return Math.max(0, Math.min(255, Math.round(Math.pow(v / m, 1.6) * k * 255))); }
    return (ch(r) << 16) | (ch(g) << 8) | ch(b);
  }

  /* ------------------------------------------------------- paintwork ---- */
  /* Two canvases. The body sheet wraps the lofted fuselage exactly once
     (u runs 0 at the TAIL to 1 at the NOSE, v runs 0 left side, 0.25 top,
     0.5 right side, 0.75 belly) so soot goes on the LEFT of the sheet and
     the heavy grime band sits low. The surface sheet dresses the wing,
     canards and fins, where u is spanwise and v runs round the aerofoil
     (0 trailing edge, 0.25 upper, 0.5 leading edge, 0.75 lower).          */
  var texCache = {};

  function zigzag(g, ax, ay, bx, by, n, amp) {
    var i, dx = (bx - ax) / n, dy = (by - ay) / n;
    var nx = -dy, ny = dx, L = Math.sqrt(nx * nx + ny * ny) || 1;
    nx = nx / L * amp; ny = ny / L * amp;
    g.beginPath(); g.moveTo(ax, ay);
    for (i = 0; i < n; i++) {
      g.lineTo(ax + dx * (i + 0.5) + nx, ay + dy * (i + 0.5) + ny);
      g.lineTo(ax + dx * (i + 1), ay + dy * (i + 1));
    }
    g.stroke();
  }

  function rivets(g, R, W, H, rows, alpha) {
    var i, j;
    g.fillStyle = "rgba(0,0,0," + alpha + ")";
    for (i = 0; i < rows; i++) {
      var ry = R() * H, rx0 = R() * W * 0.72, n = 18 + (R() * 46) | 0;
      var step = 6 + R() * 4;
      for (j = 0; j < n; j++) g.fillRect(rx0 + j * step, ry, 1.7, 1.7);
    }
  }

  function commonWear(g, R, W, H, sootFrom, sootTo) {
    var i;
    /* plate seams: long stringers plus short local ones */
    g.strokeStyle = "rgba(8,10,12,0.34)"; g.lineWidth = 1.7;
    var x = 0;
    while (x < W) { x += 24 + R() * 66; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    var y = 0;
    while (y < H) { y += 30 + R() * 74; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.strokeStyle = "rgba(8,10,12,0.20)"; g.lineWidth = 1.1;
    for (i = 0; i < 44; i++) {
      var qx = R() * W, qy = R() * H, ql = 36 + R() * 150;
      g.beginPath();
      if (R() < 0.5) { g.moveTo(qx, qy); g.lineTo(qx + ql, qy); }
      else { g.moveTo(qx, qy); g.lineTo(qx, qy + ql * 0.6); }
      g.stroke();
    }
    /* low observable sawtooth panel edges - the signature of the type */
    g.strokeStyle = "rgba(6,8,10,0.42)"; g.lineWidth = 1.5;
    for (i = 0; i < 9; i++) {
      var zx = R() * W * 0.8, zy = R() * H;
      zigzag(g, zx, zy, zx + 90 + R() * 190, zy + (R() - 0.5) * 60, 7 + (R() * 6 | 0), 5 + R() * 5);
    }
    rivets(g, R, W, H, 30, 0.20);

    /* access hatches and inspection panels */
    g.lineWidth = 1.3;
    for (i = 0; i < 20; i++) {
      var hx = R() * W, hy = R() * H, hw = 13 + R() * 36, hh = 9 + R() * 22;
      g.strokeStyle = "rgba(8,10,12,0.38)"; g.strokeRect(hx, hy, hw, hh);
      g.globalAlpha = 0.09; g.fillStyle = "#000"; g.fillRect(hx, hy, hw, hh); g.globalAlpha = 1;
    }
    /* radar absorbent patch repairs: matte blotches slightly off-tone */
    for (i = 0; i < 22; i++) {
      g.globalAlpha = 0.07 + R() * 0.07;
      g.fillStyle = R() < 0.5 ? "#2f353b" : "#78828a";
      g.beginPath();
      g.ellipse(R() * W, R() * H, 16 + R() * 52, 10 + R() * 30, R() * 3.14, 0, 6.283);
      g.fill();
    }
    g.globalAlpha = 1;

    /* exhaust soot, laid on the tail end of the sheet */
    var soot = g.createLinearGradient(sootTo, 0, sootFrom, 0);
    soot.addColorStop(0, "rgba(16,15,14,0)");
    soot.addColorStop(1, "rgba(16,15,14,0.40)");
    g.fillStyle = soot;
    g.fillRect(Math.min(sootFrom, sootTo), 0, Math.abs(sootTo - sootFrom), H);

    /* grime is heavier low down: a soft dark band across the belly row */
    var grime = g.createLinearGradient(0, H * 0.52, 0, H * 0.80);
    grime.addColorStop(0, "rgba(14,14,13,0)");
    grime.addColorStop(1, "rgba(14,14,13,0.26)");
    g.fillStyle = grime; g.fillRect(0, H * 0.52, W, H * 0.28);
    var grime2 = g.createLinearGradient(0, H, 0, H * 0.80);
    grime2.addColorStop(0, "rgba(14,14,13,0.10)");
    grime2.addColorStop(1, "rgba(14,14,13,0.26)");
    g.fillStyle = grime2; g.fillRect(0, H * 0.80, W, H * 0.20);

    /* streaks trailing aft of every vent and seam */
    g.fillStyle = "rgba(22,21,19,0.12)";
    for (i = 0; i < 46; i++) {
      var sx = R() * W, sy = R() * H;
      g.fillRect(sx, sy, 2 + R() * 4, 18 + R() * 80);
    }
  }

  function bodyCanvas(THREE) {
    var W = 1024, H = 512, i;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rngFor(0x5ea71);

    g.fillStyle = hex(BASE); g.fillRect(0, 0, W, H);
    /* tonal patchwork so the skin is never one flat colour */
    for (i = 0; i < 34; i++) {
      g.globalAlpha = 0.05 + R() * 0.07;
      g.fillStyle = (i % 3 === 0) ? "#7e8890" : "#343a40";
      g.beginPath();
      g.ellipse(R() * W, R() * H, 44 + R() * 130, 22 + R() * 62, R() * 3.14, 0, 6.283);
      g.fill();
    }
    g.globalAlpha = 1;
    /* lighter underside, feathered in around the belly row of the wrap */
    var bell = g.createLinearGradient(0, H * 0.56, 0, H * 0.76);
    bell.addColorStop(0, "rgba(150,160,168,0)");
    bell.addColorStop(1, "rgba(150,160,168,0.30)");
    g.fillStyle = bell; g.fillRect(0, H * 0.56, W, H * 0.20);
    g.fillStyle = "rgba(150,160,168,0.30)"; g.fillRect(0, H * 0.76, W, H * 0.14);
    var bel2 = g.createLinearGradient(0, H * 0.90, 0, H);
    bel2.addColorStop(0, "rgba(150,160,168,0.30)");
    bel2.addColorStop(1, "rgba(150,160,168,0)");
    g.fillStyle = bel2; g.fillRect(0, H * 0.90, W, H * 0.10);

    commonWear(g, R, W, H, 0, W * 0.34);

    /* stencils: low visibility light grey blocks and a serial band */
    g.fillStyle = "rgba(198,208,216,0.26)";
    for (i = 0; i < 14; i++) g.fillRect(R() * W, R() * H, 12 + R() * 30, 3 + R() * 4);
    g.fillStyle = "rgba(198,208,216,0.34)";
    for (i = 0; i < 5; i++) g.fillRect(W * 0.60 + i * 13, H * 0.22, 9, 13);
    /* the one hot colour on the whole airframe: ejection warning triangle */
    g.strokeStyle = "rgba(176,44,34,0.60)"; g.lineWidth = 3;
    g.beginPath();
    g.moveTo(W * 0.615, H * 0.30); g.lineTo(W * 0.640, H * 0.345);
    g.lineTo(W * 0.590, H * 0.345); g.closePath(); g.stroke();
    g.strokeStyle = "rgba(176,44,34,0.45)"; g.lineWidth = 2.5;
    g.setLineDash([9, 7]);
    g.beginPath(); g.moveTo(W * 0.44, H * 0.185); g.lineTo(W * 0.70, H * 0.185); g.stroke();
    g.setLineDash([]);

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  function surfCanvas(THREE) {
    var W = 512, H = 512, i;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var g = cv.getContext("2d");
    var R = rngFor(0x1d3b9);

    g.fillStyle = hex(BASE); g.fillRect(0, 0, W, H);
    for (i = 0; i < 22; i++) {
      g.globalAlpha = 0.05 + R() * 0.06;
      g.fillStyle = (i % 3 === 0) ? "#7a848c" : "#363c42";
      g.beginPath();
      g.ellipse(R() * W, R() * H, 30 + R() * 90, 18 + R() * 48, R() * 3.14, 0, 6.283);
      g.fill();
    }
    g.globalAlpha = 1;
    /* the underside band of a lifting surface is the lighter one */
    g.fillStyle = "rgba(150,160,168,0.26)"; g.fillRect(0, H * 0.62, W, H * 0.30);

    commonWear(g, R, W, H, 0, W * 0.22);

    /* control surface hinge lines run spanwise: constant v = a straight
       row across the sheet. Flaperon near the trailing edge on both faces,
       leading edge flap near v = 0.5. */
    g.strokeStyle = "rgba(6,8,10,0.55)"; g.lineWidth = 2.4;
    [0.055, 0.945, 0.435, 0.565].forEach(function (v) {
      g.beginPath(); g.moveTo(0, H * v); g.lineTo(W, H * v); g.stroke();
    });
    /* sawtooth break on the outer panel joint */
    g.strokeStyle = "rgba(6,8,10,0.45)"; g.lineWidth = 1.6;
    zigzag(g, W * 0.72, 0, W * 0.72, H, 16, 5);
    zigzag(g, W * 0.30, 0, W * 0.30, H, 16, 5);

    /* national marking: a low visibility outlined star, drawn, not typed */
    function star(cx, cy, r, a) {
      var k, ang, rr;
      g.beginPath();
      for (k = 0; k < 10; k++) {
        ang = -Math.PI / 2 + k * Math.PI / 5;
        rr = (k % 2 === 0) ? r : r * 0.40;
        if (k === 0) g.moveTo(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr);
        else g.lineTo(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr);
      }
      g.closePath();
      g.strokeStyle = "rgba(206,214,220," + a + ")"; g.lineWidth = 2; g.stroke();
    }
    star(W * 0.42, H * 0.20, 22, 0.40);
    star(W * 0.42, H * 0.80, 22, 0.34);
    g.strokeStyle = "rgba(206,214,220,0.34)"; g.lineWidth = 2;
    g.strokeRect(W * 0.47, H * 0.16, 34, 11);
    g.fillStyle = "rgba(198,208,216,0.24)";
    for (i = 0; i < 10; i++) g.fillRect(R() * W, R() * H, 11 + R() * 26, 3 + R() * 4);
    /* walkway hatching along the wing root end of the sheet */
    g.strokeStyle = "rgba(20,20,20,0.40)"; g.lineWidth = 2.5;
    g.setLineDash([8, 6]);
    g.beginPath(); g.moveTo(W * 0.02, H * 0.24); g.lineTo(W * 0.26, H * 0.24); g.stroke();
    g.setLineDash([]);

    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }

  function tex(THREE, which) {
    if (texCache[which] === undefined) {
      try { texCache[which] = which === "body" ? bodyCanvas(THREE) : surfCanvas(THREE); }
      catch (e) { texCache[which] = null; }
    }
    return texCache[which];
  }

  /* ------------------------------------------------------- geometry ----- */
  /* lofted body. tbl rows: [x, halfW, halfH, zCentre, sq, yCentre].
     M.loft has no lateral offset, so the rings are shifted afterwards -
     that is what lets one duct walk inboard from the intake lip to the
     engine face without a second mesh. */
  function lofted(THREE, M, tbl, segs) {
    var i, j, k, s = [], r = tbl.slice();
    r.sort(function (a, b) { return a[0] - b[0]; });
    for (i = 0; i < r.length; i++)
      s.push({ x: r[i][0], w: r[i][1], h: r[i][2], zc: r[i][3], sq: r[i][4] || 1 });
    var g = M.loft(THREE, s, segs);
    var p = g.attributes.position.array, ring = segs + 1, any = false;
    for (i = 0; i < r.length; i++) if (r[i][5]) any = true;
    if (any) {
      for (i = 0; i < r.length; i++) {
        var yc = r[i][5] || 0;
        for (j = 0; j <= segs; j++) { k = (i * ring + j) * 3; p[k + 1] += yc; }
      }
      g.computeVertexNormals();
    }
    return g;
  }

  /* aerofoil panel lofted along SPAN. st rows: [span, chordCentreX, chord,
     thickness, z]. sq above 1 pinches the section, so 1.55 gives the sharp
     leading and trailing edges a stealth planform needs. Stations must run
     in increasing span. */
  function foil(THREE, M, st, segs, sq) {
    var i, j, k, s = [];
    for (i = 0; i < st.length; i++)
      s.push({ x: st[i][0], w: st[i][2] * 0.5, h: st[i][3] * 0.5, zc: 0, sq: sq || 1.55 });
    var g = M.loft(THREE, s, segs);
    var p = g.attributes.position.array, ring = segs + 1;
    for (i = 0; i < st.length; i++)
      for (j = 0; j <= segs; j++) {
        k = (i * ring + j) * 3;
        p[k + 1] -= st[i][1];
        p[k + 2] += st[i][4];
      }
    g.rotateZ(Math.PI / 2);       /* span -> +Y, chord -> +X */
    g.computeVertexNormals();
    return g;
  }

  /* Rake the open front ring of a duct in BOTH axes. A diverterless intake
     lip is not a flat washer on the end of a pipe: it is a sharp edged
     parallelogram whose lower outboard corner leads by better than a metre.
     kz drives the vertical lean, ky the lateral one, each normalised over
     the ring's own extent so the amounts are metres of x travel. */
  function rakeRing(g, segs, kz, ky) {
    var p = g.attributes.position.array, j, k;
    var ymin = 1e9, ymax = -1e9, zmin = 1e9, zmax = -1e9;
    for (j = 0; j <= segs; j++) {
      k = j * 3;
      ymin = Math.min(ymin, p[k + 1]); ymax = Math.max(ymax, p[k + 1]);
      zmin = Math.min(zmin, p[k + 2]); zmax = Math.max(zmax, p[k + 2]);
    }
    var ys = (ymax - ymin) || 1, zs = (zmax - zmin) || 1;
    for (j = 0; j <= segs; j++) {
      k = j * 3;
      p[k] += kz * ((p[k + 2] - zmin) / zs * 2 - 1) + ky * ((p[k + 1] - ymin) / ys * 2 - 1);
    }
    g.computeVertexNormals();
  }

  function mirrorPts(pts) {
    var q = [], i;
    for (i = pts.length - 1; i >= 0; i--) q.push([pts[i][0], -pts[i][1]]);
    return q;
  }

  /* ------------------------------------------------------------ build --- */
  function build(THREE, M, C) {
    var G = new THREE.Group(), i, m, g2;
    var TEAM = (C && C.team !== undefined && C.team !== null) ? C.team : 0x3f7fd0;

    /* ---- three material tiers, no more ---- */
    function skinMat(sheet, rep, off) {
      var mm = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: 0.87, metalness: 0.08, side: THREE.DoubleSide });
      var t = tex(THREE, sheet);
      if (!t) { mm.color.setHex(BASE); return mm; }
      if (rep) {
        var c = t.clone(); c.needsUpdate = true;
        c.wrapS = c.wrapT = THREE.RepeatWrapping;
        c.repeat.set(rep, rep);
        c.offset.set(off || 0.31, 0.27);
        mm.map = c;
      } else mm.map = t;
      return mm;
    }
    var SKIN  = skinMat("body");                  /* lofted fuselage bodies */
    var SKINW = skinMat("surf");                  /* lofted lifting surfaces */
    var SKINP = skinMat("surf", 1 / 4.5, 0.34);   /* extruded slabs, UV in m */
    var METAL = new THREE.MeshStandardMaterial({ color: 0x6a7176, roughness: 0.52, metalness: 0.46 });
    var DARK  = new THREE.MeshStandardMaterial({ color: 0x191b1d, roughness: 0.60, metalness: 0.40 });
    var RUBBER= new THREE.MeshStandardMaterial({ color: 0x1b1c1e, roughness: 0.95, metalness: 0.04 });
    /* matte, metalness zero: under ACES plus a hot key light any metalness
       at all washes a saturated colour straight to white, and the team flash
       is the one thing on this aircraft that must keep its hue. */
    var TEAMM = new THREE.MeshStandardMaterial({ color: teamPaint(TEAM), roughness: 0.85, metalness: 0.04, side: THREE.DoubleSide });
    /* gold vapour deposited canopy. Kept DARK on purpose - a light tint
       rendered as an opaque beige egg, which is the failure mode here. */
    /* Gold vapour deposited canopy. The hex looks almost black, and that is
       deliberate: this renderer does not decode material colours from sRGB
       before lighting them, so a value multiplied by roughly 1.9x of key
       plus ambient and then written out through the sRGB curve comes back
       two to three times lighter than the number reads. 0x2c2a1b, which is
       a dark olive on paper, rendered as an opaque tan easter egg. */
    var GLASS = new THREE.MeshPhysicalMaterial({
      color: 0x0b0904, roughness: 0.09, metalness: 0.00, transparent: true,
      opacity: 0.80, side: THREE.FrontSide });
    if (GLASS.clearcoat !== undefined) { GLASS.clearcoat = 0.16; GLASS.clearcoatRoughness = 0.06; }

    function add(geo, mat, parent) {
      var mesh = new THREE.Mesh(geo, mat);
      (parent || G).add(mesh);
      return mesh;
    }

    /* ===================================================== 1. FUSELAGE ===
       Diamond section forward (sq 2.0 makes |y/w| + |z/h| = 1, a true knife
       edged chine) easing to a softer section aft, tapering to the pointed
       centre fairing that sits between the two nozzles.                   */
    /* The first draft tapered the radome to 5 cm across a metre and a half
       and the side view came out with a two metre knitting needle on the
       front. The real radome is a fat cone: quarter of a metre across only
       one metre back from the tip. sq stays near 2.0 the whole length of
       the forebody so the section is a true diamond and the chine is a
       corner, not a curve. */
    var FUSE = [
      [ 10.60, 0.030, 0.026,  0.06, 2.10],
      [ 10.10, 0.110, 0.100,  0.04, 2.10],
      [  9.60, 0.205, 0.186,  0.02, 2.10],
      [  9.00, 0.320, 0.286, -0.01, 2.05],
      [  8.20, 0.460, 0.392, -0.04, 2.05],
      [  7.10, 0.635, 0.474, -0.06, 2.00],
      [  6.00, 0.790, 0.500, -0.07, 2.00],
      [  4.80, 0.960, 0.560, -0.08, 1.95],
      [  3.40, 1.070, 0.620, -0.04, 1.90],
      [  1.80, 1.160, 0.670,  0.00, 1.85],
      [  0.00, 1.245, 0.700,  0.03, 1.80],
      [ -1.80, 1.290, 0.700,  0.06, 1.75],
      [ -3.80, 1.290, 0.680,  0.08, 1.70],
      [ -5.80, 1.250, 0.640,  0.10, 1.60],
      [ -7.20, 1.170, 0.590,  0.12, 1.52],
      [ -8.40, 1.020, 0.500,  0.14, 1.45],
      [ -9.30, 0.760, 0.360,  0.16, 1.40],
      [ -9.90, 0.400, 0.190,  0.18, 1.35],
      [-10.35, 0.090, 0.060,  0.19, 1.30],
    ];
    add(lofted(THREE, M, FUSE, 26), SKIN);

    /* chine strake: the hard edge running from under the windscreen back
       into the wing root. It is what makes the plan view read as one
       continuous widening wedge instead of a tube with wings. */
    var chine = [
      [9.70, 0.14], [8.20, 0.50], [6.60, 0.86], [4.80, 1.12], [3.40, 1.23],
      [1.80, 1.33], [0.55, 1.40],
      [0.55, 1.14], [1.80, 1.06], [3.40, 0.96], [4.80, 0.86], [6.60, 0.62],
      [8.20, 0.34], [9.70, 0.06]
    ];
    [1, -1].forEach(function (s) {
      var pts = s > 0 ? chine : mirrorPts(chine);
      var gg = M.slab(THREE, pts, 0.075);
      gg.translate(0, 0, -0.0375);
      add(gg, SKINP);
    });

    /* ===================================================== 2. CANOPY =====
       Sits well forward, a low bubble faired into the spine. Frame and a
       hint of an interior so the glass is not an empty jelly bean.        */
    var CANO = [
      [ 6.55, 0.09, 0.05, 0.56, 1.20],
      [ 6.10, 0.32, 0.20, 0.63, 1.10],
      [ 5.40, 0.50, 0.34, 0.68, 1.05],
      [ 4.50, 0.57, 0.40, 0.70, 1.05],
      [ 3.60, 0.55, 0.37, 0.69, 1.10],
      [ 2.90, 0.46, 0.28, 0.65, 1.15],
      [ 2.55, 0.34, 0.18, 0.60, 1.20],
    ];
    add(lofted(THREE, M, CANO, 20), GLASS);
    /* windscreen bow and canopy sill, opaque */
    var bow = M.slab(THREE, [[6.10, 0.36], [5.86, 0.42], [5.80, 0.40], [6.04, 0.33]], 0.42, "xz");
    bow.translate(0, 0.18, 0.44);
    add(bow, SKINP);
    [1, -1].forEach(function (s) {
      var sill = M.slab(THREE, [[6.20, 0.10], [5.30, 0.36], [3.40, 0.40], [2.55, 0.22],
                                [2.55, 0.14], [3.40, 0.32], [5.30, 0.28], [6.20, 0.03]], 0.07);
      if (s < 0) sill.scale(1, -1, 1);
      sill.translate(0, 0, 0.44);
      add(sill, SKINP);
    });
    /* cockpit interior: coaming, seat back, headrest */
    add(new THREE.BoxGeometry(0.55, 0.80, 0.16), DARK).position.set(5.55, 0, 0.50);
    add(new THREE.BoxGeometry(0.20, 0.62, 0.72), DARK).position.set(3.90, 0, 0.42);
    add(new THREE.BoxGeometry(0.22, 0.40, 0.22), DARK).position.set(3.85, 0, 0.80);
    add(new THREE.BoxGeometry(1.05, 0.56, 0.34), DARK).position.set(4.65, 0, 0.30);

    /* ===================================================== 3. SPINE ======
       The broad flat dorsal deck behind the canopy. Squared section
       (sq 0.75) because the top of this aircraft is a facet, not a tube. */
    var SPINE = [
      [ 2.70, 0.44, 0.10, 0.60, 0.80],
      [ 1.20, 0.62, 0.13, 0.66, 0.75],
      [-1.20, 0.74, 0.14, 0.68, 0.75],
      [-3.60, 0.72, 0.13, 0.66, 0.75],
      [-5.80, 0.60, 0.10, 0.60, 0.80],
      [-7.60, 0.42, 0.07, 0.53, 0.85],
      [-8.80, 0.18, 0.04, 0.47, 0.90],
    ];
    add(lofted(THREE, M, SPINE, 18), SKIN);

    /* ============================================ 4. DSI INTAKES/DUCTS ===
       Three parts a side, and all three have to be there before the eye
       reads "diverterless". BUMP is the fixed compression surface swelling
       out of the fuselage flank ahead of the mouth. COWL is the sharp
       lipped shell whose aperture wraps round the back of that bump, raked
       so the lower outboard corner leads by a metre and a quarter. THROAT
       is the black hole a third of a metre inside it. The first draft had
       the mouth buried inside the fuselage loft, and from head on the
       aircraft simply had no intakes - which on this type is the whole
       point of the airframe missing.                                     */
    [1, -1].forEach(function (s) {
      var RAKZ = -0.22, RAKY = 0.42 * s;

      /* --- fixed compression bump, no splitter plate anywhere near it.
             It has to sit INSIDE the capture area to be a DSI bump at all,
             but the first attempt made it so fat it corked the aperture and
             the intake read as a smooth pod with no hole in it. Keep it
             inboard and low: two thirds of the mouth stays open. --- */
      add(lofted(THREE, M, [
        [ 7.30, 0.05, 0.09, -0.30, 1.00, 0.32 * s],
        [ 6.70, 0.13, 0.22, -0.36, 1.00, 0.54 * s],
        [ 6.10, 0.19, 0.30, -0.40, 1.00, 0.72 * s],
        [ 5.55, 0.23, 0.36, -0.42, 1.00, 0.86 * s],
        [ 5.10, 0.25, 0.39, -0.43, 1.00, 0.94 * s],
        [ 4.78, 0.24, 0.38, -0.43, 1.05, 0.96 * s],
      ], 16), SKIN);

      /* --- cowl and duct in one open ended shell, lip to engine face.
             sq below 1 squares the section off: the aperture wants to be a
             rounded parallelogram, not a circle. --- */
      var DUCT = [
        [ 5.20, 0.50, 0.54, -0.42, 0.78, 1.20 * s],
        [ 4.40, 0.52, 0.56, -0.41, 0.78, 1.19 * s],
        [ 3.00, 0.53, 0.57, -0.39, 0.82, 1.16 * s],
        [ 1.20, 0.53, 0.56, -0.37, 0.86, 1.12 * s],
        [-0.60, 0.54, 0.57, -0.34, 0.92, 1.05 * s],
        [-2.40, 0.55, 0.57, -0.31, 1.00, 0.95 * s],
        [-4.40, 0.56, 0.58, -0.28, 1.05, 0.83 * s],
        [-6.40, 0.57, 0.58, -0.26, 1.05, 0.74 * s],
        [-8.20, 0.59, 0.59, -0.24, 1.02, 0.68 * s],
        [-9.30, 0.615, 0.615, -0.23, 1.00, 0.66 * s],
      ];
      var dg = lofted(THREE, M, DUCT, 20);
      rakeRing(dg, 20, RAKZ, RAKY);
      add(dg, SKIN);

      /* black throat, raked to exactly the same plane so it stays tucked
         a third of a metre inside the lip all the way round */
      var tg = lofted(THREE, M, [
        [ 4.90, 0.445, 0.485, -0.42, 0.78, 1.20 * s],
        [ 3.90, 0.360, 0.400, -0.40, 0.82, 1.16 * s],
        [ 3.40, 0.095, 0.110, -0.39, 0.86, 1.14 * s],
      ], 16);
      rakeRing(tg, 16, RAKZ, RAKY);
      add(tg, DARK);

      /* side weapons bay: the PL-10 launcher box behind the intake. The
         door and its hinge line are the only break in that long flank. */
      var bay = M.slab(THREE, [[0.70, -0.42], [-1.95, -0.38], [-2.70, -0.56],
                               [-2.70, -0.74], [-1.95, -0.78], [0.70, -0.76]], 0.26, "xz");
      bay.translate(0, 1.30 * s - 0.13, 0);
      add(bay, SKINP);
    });

    /* ============================================ 5. BELLY / MAIN BAY ====
       Flat bottomed pan under the mid fuselage with the two main bay doors
       standing slightly proud, which is how the underside reads at any
       three quarter angle.                                                */
    add(lofted(THREE, M, [
      [ 2.60, 0.62, 0.16, -0.62, 0.65],
      [ 1.20, 0.78, 0.20, -0.66, 0.60],
      [-0.60, 0.86, 0.23, -0.68, 0.60],
      [-2.40, 0.86, 0.23, -0.68, 0.60],
      [-4.00, 0.76, 0.19, -0.66, 0.65],
      [-5.20, 0.58, 0.13, -0.62, 0.70],
    ], 16), SKIN);
    [1, -1].forEach(function (s) {
      var door = [[1.50, 0.06], [1.50, 0.80], [-2.70, 0.80], [-3.05, 0.44], [-2.70, 0.06]];
      var dg = M.slab(THREE, s > 0 ? door : mirrorPts(door), 0.035);
      dg.translate(0, 0, -0.925);
      add(dg, SKINP);
    });

    /* ===================================================== 6. NOZZLES ====
       Round, closely spaced, protruding a clear metre aft of the aircraft
       with the serrated petal ring that the type is known for.           */
    [1, -1].forEach(function (s) {
      var y = 0.66 * s, z = -0.23;
      add(lofted(THREE, M, [
        [ -9.30, 0.615, 0.615, z, 1.0, y],
        [ -9.85, 0.585, 0.585, z, 1.0, y],
        [-10.20, 0.545, 0.545, z, 1.0, y],
        [-10.42, 0.520, 0.520, z, 1.0, y],
        [-10.60, 0.515, 0.515, z, 1.0, y],
      ], 18), METAL);
      /* the hot interior, receding forward */
      add(lofted(THREE, M, [
        [-10.58, 0.470, 0.470, z, 1.0, y],
        [-10.30, 0.360, 0.360, z, 1.0, y],
        [-10.02, 0.090, 0.090, z, 1.0, y],
      ], 18), DARK);
      /* serrated petal ring */
      for (i = 0; i < 12; i++) {
        var a = i / 12 * Math.PI * 2;
        var pm = add(new THREE.BoxGeometry(0.50, 0.19, 0.050), DARK);
        pm.position.set(-9.94, y - Math.sin(a) * 0.605, z + Math.cos(a) * 0.605);
        pm.rotation.x = a;
      }
    });

    /* ===================================================== 7. WING =======
       Cropped delta. Leading edge 48 deg, trailing edge swept 3.5 deg
       FORWARD, tip chord 1.4 m, span 13.0 m. Built as one full span
       aerofoil so the anhedral stays symmetric and the root buries itself
       inside the fuselage the way a blended wing root should.            */
    var WING = [];
    (function () {
      var ys = [-6.56, -6.50, -6.10, -5.20, -3.90, -2.60, -1.30, 0.00,
                 1.30, 2.60, 3.90, 5.20, 6.10, 6.50, 6.56];
      var TAN = Math.tan(48 * D2R);
      for (var q = 0; q < ys.length; q++) {
        var y = ys[q], ay = Math.abs(y);
        var le = 0.80 - ay * TAN;
        var te = -8.20 + ay * 0.0585;
        var ch = le - te, th;
        if (ay > 6.52) { ch = 0.90; le = te + ch; th = 0.02; }
        else if (ay > 6.4) th = 0.07;
        else th = 0.045 + 0.068 * ch;
        WING.push([y, (le + te) * 0.5, ch, th, 0.02 - 0.024 * ay]);
      }
    })();
    add(foil(THREE, M, WING, 22), SKINW);
    /* flaperon actuator fairings under the trailing edge: small, but they
       are the only thing breaking that long straight edge from below */
    [1, -1].forEach(function (s) {
      [2.4, 4.3].forEach(function (y) {
        var f = add(new THREE.BoxGeometry(1.10, 0.30, 0.20), SKINP);
        f.position.set(-7.55 + y * 0.0585, y * s, -0.09 - 0.024 * y);
        f.rotation.z = -3.5 * D2R * s;
      });
    });

    /* ===================================================== 8. CANARDS ====
       Well forward, span 6.84 m against a 13.0 m wing - just over half -
       with about 10 degrees of anhedral. All moving, so no fixed root.   */
    var CAN = [];
    (function () {
      var ys = [-3.42, -3.35, -2.80, -2.00, -1.10, 0.00, 1.10, 2.00, 2.80, 3.35, 3.42];
      var TAN = Math.tan(46 * D2R);
      for (var q = 0; q < ys.length; q++) {
        var y = ys[q], ay = Math.abs(y);
        var le = 4.35 - ay * TAN;
        var te = 1.65 - ay * 0.5134;
        var ch = le - te, th;
        if (ay > 3.38) { ch = 0.60; le = te + ch; th = 0.02; }
        else th = 0.02 + 0.072 * ch;
        CAN.push([y, (le + te) * 0.5, ch, th, 0.22 - 0.150 * ay]);
      }
    })();
    add(foil(THREE, M, CAN, 18), SKINW);

    /* ================================= 9. TAIL BOOMS, FINS, VENTRALS ====
       Outboard booms carry the all moving fins on top and the ventral fins
       underneath. Two canted fins plus two canted ventrals: four surfaces
       at the back, which is the tail signature of this generation.       */
    [1, -1].forEach(function (s) {
      add(lofted(THREE, M, [
        [-3.60, 0.28, 0.34, 0.10, 0.75, 1.48 * s],
        [-5.20, 0.34, 0.40, 0.14, 0.70, 1.50 * s],
        [-6.80, 0.34, 0.40, 0.16, 0.70, 1.50 * s],
        [-8.20, 0.30, 0.34, 0.16, 0.70, 1.46 * s],
        [-9.30, 0.20, 0.22, 0.14, 0.75, 1.38 * s],
        [-9.95, 0.04, 0.05, 0.12, 0.85, 1.30 * s],
      ], 14), SKIN);

      /* --- vertical fin, canted 20 deg outward --- */
      var FIN = [], TF = Math.tan(48 * D2R);
      [0.00, 0.50, 1.08, 1.58, 1.85, 1.90].forEach(function (h) {
        var le = -5.55 - h * TF;
        var te = -8.86 - h * 0.0732;
        var ch = le - te, th;
        if (h > 1.87) { ch = 1.05; le = te + ch; th = 0.02; }
        else th = 0.022 + 0.060 * ch;
        FIN.push([h, (le + te) * 0.5, ch, th, 0]);
      });
      var fgrp = new THREE.Group();
      G.add(fgrp);
      fgrp.position.set(0, 1.55 * s, 0.42);
      fgrp.rotation.x = -20 * D2R * s;
      var fm = new THREE.Mesh(foil(THREE, M, FIN, 16), SKINW);
      fm.rotation.x = Math.PI / 2;
      fgrp.add(fm);
      /* team flash: a cap band near the fin tip, not the half fin the
         first draft painted - that read as a white patch, not an owner. */
      var fl = new THREE.Mesh(M.slab(THREE, [[-7.05, 1.16], [-8.20, 1.16],
                                             [-8.50, 1.78], [-7.52, 1.78]], 0.03, "xz"), TEAMM);
      fl.position.y = 0.075 * s;
      fgrp.add(fl);

      /* --- ventral fin, canted 32 deg outward --- */
      var VEN = [], TV = Math.tan(55 * D2R);
      [0.00, 0.46, 0.86, 1.13, 1.18].forEach(function (d) {
        var le = -5.10 - d * TV;
        var te = -7.95 + d * 0.2174;
        var ch = le - te, th;
        if (d > 1.15) { ch = 0.88; le = te + ch; th = 0.02; }
        else th = 0.022 + 0.055 * ch;
        VEN.push([d, (le + te) * 0.5, ch, th, 0]);
      });
      var vgrp = new THREE.Group();
      G.add(vgrp);
      vgrp.position.set(0, 1.42 * s, -0.34);
      vgrp.rotation.x = 35 * D2R * s;
      var vm = new THREE.Mesh(foil(THREE, M, VEN, 14), SKINW);
      vm.rotation.x = -Math.PI / 2;
      vgrp.add(vm);
    });

    /* ================================================= 10. SENSORS ETC ===
       Only shapes that survive a three quarter view: the EOTS chin facet,
       the two cheek apertures, a blade aerial and the nose probes.        */
    var eots = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 6), SKINP);
    eots.scale.set(1.55, 0.72, 0.34);
    eots.position.set(7.55, 0, -0.44);
    G.add(eots);
    add(new THREE.BoxGeometry(0.70, 0.05, 0.30), DARK).position.set(7.60, 0, -0.55);
    [1, -1].forEach(function (s) {
      var ch2 = add(new THREE.BoxGeometry(0.62, 0.06, 0.26), DARK);
      ch2.position.set(6.20, 0.60 * s, -0.28);
      ch2.rotation.x = 22 * D2R * s;
      var da = add(new THREE.BoxGeometry(0.46, 0.05, 0.22), DARK);
      da.position.set(5.10, 0.30 * s, 0.44);
    });
    var blade = M.slab(THREE, [[-1.30, 0.00], [-1.60, 0.00], [-1.72, 0.34], [-1.42, 0.34]], 0.05, "xz");
    blade.translate(0, 0.025, 0.80);
    add(blade, SKINP);
    var probe = add(new THREE.CylinderGeometry(0.020, 0.034, 0.30, 8), METAL);
    probe.rotation.z = Math.PI / 2; probe.position.set(10.70, 0, 0.05);
    [1, -1].forEach(function (s) {
      var v = add(new THREE.CylinderGeometry(0.022, 0.030, 0.26, 6), METAL);
      v.rotation.x = Math.PI / 2; v.position.set(9.35, 0.24 * s, 0.02);
    });

    /* --- team colour. The first draft put chevrons on the wing at the
       wing's CENTRE z, which buried them inside a 30 cm thick aerofoil and
       painted the inside of the wing. Everything here is laid on a surface
       whose height is known exactly: the flat top face of the chine strake,
       and the flat outer wall of the intake cowl. The chine stripe runs the
       whole length of the forebody, so ownership reads from directly above
       even when the aircraft is a thumbnail on a busy map.               */
    var stripe = [
      [9.70, 0.13], [8.20, 0.49], [6.60, 0.85], [4.80, 1.11], [3.40, 1.22],
      [1.80, 1.32], [0.60, 1.39],
      [0.60, 1.12], [1.80, 1.05], [3.40, 0.95], [4.80, 0.85], [6.60, 0.61],
      [8.20, 0.29], [9.70, 0.05]
    ];
    [1, -1].forEach(function (s) {
      var sg = M.slab(THREE, s > 0 ? stripe : mirrorPts(stripe), 0.02);
      sg.translate(0, 0, 0.030);
      add(sg, TEAMM);
      /* and a chevron on the outer wall of each intake cowl, which is the
         one big flat facet visible from ahead and from the side both */
      var bd = M.slab(THREE, [[2.30, -0.20], [1.10, -0.20], [0.55, -0.62],
                              [1.10, -0.62], [1.65, -0.40], [2.30, -0.62],
                              [2.85, -0.62]], 0.03, "xz");
      bd.translate(0, 1.72 * s + (s > 0 ? 0 : 0.03), 0);
      add(bd, TEAMM);
    });

    /* Seen from directly overhead - which is most of the time in this game -
       the fins are edge on and the chine stripe is a hairline. The spine is
       the one big surface pointed at the camera, so the band goes there. It
       is lofted rather than slabbed because the spine crowns by 3 cm over
       its length and a flat plate would sink into it at the middle. */
    add(lofted(THREE, M, [
      [ 1.70, 0.40, 0.022, 0.762, 0.55],
      [ 0.60, 0.50, 0.022, 0.798, 0.55],
      [-0.30, 0.52, 0.022, 0.810, 0.55],
      [-1.05, 0.50, 0.022, 0.818, 0.55],
    ], 12), TEAMM);

    /* =================================================== 11. GEAR ========
       Named "gear" so render3d.js can stow it in cruise. Nose leg forward
       under the cockpit, mains in the bays between duct and nacelle.     */
    var gear = new THREE.Group();
    gear.name = "gear";
    G.add(gear);

    function leg(x, y, ztop, zaxle, r, tyre, w) {
      var len = ztop - zaxle;
      var st = new THREE.Mesh(new THREE.CylinderGeometry(0.070, 0.090, len, 8), METAL);
      st.position.set(x, y, (ztop + zaxle) * 0.5);
      st.rotation.x = Math.PI / 2;
      gear.add(st);
      var ax = new THREE.Mesh(new THREE.CylinderGeometry(0.050, 0.050, w * 2.2, 6), METAL);
      ax.position.set(x, y, zaxle); gear.add(ax);
      var wh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 14), RUBBER);
      wh.position.set(x, y, zaxle); gear.add(wh);
      var hb = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.45, r * 0.45, w * 1.15, 10), METAL);
      hb.position.set(x, y, zaxle); gear.add(hb);
      var br = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.06, 0.09), METAL);
      br.position.set(x + 0.26, y, zaxle + len * 0.55); br.rotation.y = 0.55; gear.add(br);
    }
    leg(5.05, 0, -0.58, -1.72, 0.33, 1, 0.15);
    leg(-1.30,  1.46, -0.80, -1.63, 0.42, 1, 0.19);
    leg(-1.30, -1.46, -0.80, -1.63, 0.42, 1, 0.19);
    /* bay doors, hanging open */
    [1, -1].forEach(function (s) {
      var nd = M.slab(THREE, [[5.70, 0.05], [4.30, 0.05], [4.30, 0.42], [5.70, 0.42]], 0.04, "xz");
      nd.translate(0, 0.10 * s, -1.05);
      var ndm = new THREE.Mesh(nd, SKINP);
      ndm.rotation.x = (s > 0 ? 1 : -1) * 62 * D2R;
      ndm.position.set(0, 0.16 * s, -0.42);
      gear.add(ndm);
      var md = M.slab(THREE, [[0.10, 0.05], [-2.60, 0.05], [-2.60, 0.72], [0.10, 0.72]], 0.04, "xz");
      md.translate(0, 0.10 * s, -1.30);
      var mdm = new THREE.Mesh(md, SKINP);
      mdm.rotation.x = (s > 0 ? 1 : -1) * 70 * D2R;
      mdm.position.set(0, 1.05 * s, -0.60);
      gear.add(mdm);
    });

    /* formation light strips, cheap and they sharpen the chine at night */
    [1, -1].forEach(function (s) {
      var fs = add(new THREE.BoxGeometry(1.60, 0.05, 0.09), SKINP);
      fs.position.set(2.40, 1.23 * s, -0.02);
      var fs2 = add(new THREE.BoxGeometry(1.20, 0.05, 0.09), SKINP);
      fs2.position.set(-6.40, 1.55 * s, 0.30);
    });

    return G;
  }

  return { LEN: LEN, build: build };
})();

UNIT_MODELS["stealth_c"] = { len: 21.2, build: function (THREE, M, C) { return HeroJ20.build(THREE, M, C); } };
