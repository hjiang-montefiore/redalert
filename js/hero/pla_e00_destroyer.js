/* ==========================================================================
   pla_e00_destroyer.js -- HERO reference model: Type 052B "Luyang I"
   destroyer (PLAN, era e00).  Lead ship Guangzhou (168).

   Built by hand as the style and period anchor for the e00 PLAN surface
   fleet; warship3d.js hulls get tuned against this file afterwards, so the
   conventions below are deliberate rather than incidental.

     model space   +X bow, +Y port, +Z up, WATERLINE at z = 0, real metres.
                   Hull is modelled down to -6.05 m (design draught) and the
                   superstructure rises in +Z.  render3d.js stands the model
                   up with rotation.x = -PI/2.
     dimensions    155.6 m LOA, 17.2 m beam, 6.05 m draught -- the real ship.
     materials     three tiers only.  SKIN (painted steel, procedural
                   CanvasTexture, rough 0.82-0.92 / metal <= 0.10), METAL
                   (barrels, masts, railings, anchors, screws, davits,
                   rough 0.45-0.65 / metal 0.35-0.65, no map) and GLASS
                   (bridge and pilothouse glazing, MeshPhysicalMaterial,
                   rough 0.10, opacity 0.84).
     colour        bluegrey, straight off the PAINT table shared by
                   warship3d.js and armour3d.js: hull 0x6c7c8b,
                   superstructure 0x788794, deck 0x414a52.  A 2000s PLAN
                   destroyer is FLAT and mid-dark, not the light glossy grey
                   the 1950s ships in this roster wear.

   PERIOD CUES this model exists to establish, checked against commons
   photographs of Guangzhou (168) at Cadiz, at St Petersburg and under way
   with USS Chung-Hoon:

     - the first genuinely modern PLAN destroyer: ONE continuous enclosed
       superstructure block with inward-sloped (tumblehome) sides all the
       way from the forward SAM deckhouse to the hangar.  No lattice
       clutter, no stack of 1950s deckhouses -- that is the whole point of
       the class and it is what separates it from the Luda ahead of it.
     - single 100 mm stealth gun mount forward: a faceted, hard-chined gun
       house, not a rounded cupola.  Named "turret" (see below).
     - TWO Russian SA-N-12 revolver launchers -- the single-arm 3S90E, one
       on the deckhouse before the bridge and one abaft the funnel, each on
       its own circular revolver magazine drum.
     - FOUR YJ-83 quad box launcher clusters amidships, two a side, canted
       outboard and elevated, between the funnel and the after uptake.
     - TWO large Front Dome (MR-90 Orekh) illuminator radomes, the forward
       one on the bridge roof just ahead of the mast, the after one lifted
       high on its own plated tower.  These two white spheres are the single
       most recognisable thing about the class from any angle.
     - twin BLACK uptake pipes standing proud of a boxy grey funnel casing.
     - helicopter hangar and open flight deck aft, Ka-28 sized.
     - plated tapered mainmast carrying the Top Plate 3D air search array.

   Three things were learned by rendering this and are written down because
   the parametric ships are meant to be tuned against this file:

   1. M.loft's `sq` exponent is applied as |cos|^sq to BOTH the half width
      and the half height of a section, so it controls the corner radius of
      the whole section, not just its width.  The contract's 0.45-0.60
      midsection band drooped this hull's gunwale 0.9 m below the deck crown
      and the forecastle came out domed.  0.30-0.34 amidships gives a
      slab-sided warship with a believable rounded sheer strake, which is
      also what warship3d.js settled on (it uses 0.20).  It is ramped up
      past 1.0 only forward of station 62 to pinch the forefoot to a fine
      entry -- ABOVE 1 forward, WELL BELOW 1 everywhere else.

   2. M.loft's default v wraps around the section, so a painted waterline
      cannot survive it: the boot topping would spiral.  The topsides loft
      here has its UVs rewritten after the fact to u = length fraction,
      v = ABSOLUTE HEIGHT (z = -0.40 m at the bottom row to z = +12.00 m at
      the top).  Both sides then sample the same side elevation, so the boot
      topping, the knuckle, the rust weeps and the funnel soot all sit at
      the height they were painted at even though the freeboard runs from
      6.4 m aft to 11.8 m at the stem.

   3. Two lofts, not one.  The topsides run from just under the waterline to
      the deck and are 1.5 cm wider; the underbody runs keel to deck inside
      them.  What shows is grey above, anti-fouling below, and a hard
      knuckle at the waterline with no z-fighting.  Forward of station 70
      the topsides' lower edge follows the STEM instead of the waterline,
      which is what gives the raked clipper bow its profile.

   Measured in the cmp.html scene: see the label under the render.
   ========================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPlaE00Destroyer = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 155.6;

  /* ------------------------------------------------------------- palette
     bluegrey row of the shared PAINT table.  Baked into the canvases, so
     every SKIN material carries color 0xffffff and lets its map speak. */
  /* The bluegrey PAINT row is the reference; these are those values taken
     down to about 0.60 of their level.  Measured off the first render of
     this file: 0x6c7c8b baked into a canvas and shown through a white
     material came back as rgb(200,205,210) -- a white ship -- because this
     renderer's ACES pass lifts a mid grey by roughly 1.8x and eats its
     saturation on the way up.  Hue is untouched, only the level. */
  var C_HULL = 0x404a54;
  var C_SUP  = 0x475059;
  var C_DECK = 0x2d3339;
  var C_FOUL = 0x32201a;          /* anti-fouling oxide red below the boot */
  var C_BOOT = 0x101317;          /* boot topping band at the waterline    */
  var C_DOME = 0x8d9498;          /* radome and canvas cover off-white     */

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function rngOf(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function hx(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function dim(c, f) {
    var r = Math.round((c >> 16 & 255) * f);
    var g = Math.round((c >> 8 & 255) * f);
    var b = Math.round((c & 255) * f);
    return (r << 16) | (g << 8) | b;
  }

  /* ===================================================== procedural skins
     Cached module-wide: the fleet may hold several of these and the maps
     are identical for every one of them.  Only the pennant panel, which
     carries the team colour, is keyed by team.                          */
  var TEX = {};

  function mkTex(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    return t;
  }

  /* --- topsides.  u = stern(0) to stem(1), v = height z -0.40 .. +12.00 --- */
  var HZ0 = -6.60, HZ1 = 12.00;
  function hullTex(THREE) {
    if (TEX.hull) return TEX.hull;
    var W = 2048, H = 640, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rngOf(52021), i, k;
    var PPM = H / (HZ1 - HZ0);
    function Y(z) { return H - (z - HZ0) * PPM; }
    function U(x) { return (x + 77.6) / LOA * W; }
    var yB0 = Y(1.55), yB1 = Y(-0.15);

    /* three LEVEL bands: topsides grey, boot topping, anti-fouling.  Both
       hull lofts share this map and the same elevation UV, so wherever the
       underbody pushes out through the topsides the two agree exactly and
       the waterline still lands at z = 0 along the whole ship. */
    g.fillStyle = hx(C_FOUL); g.fillRect(0, 0, W, H);
    g.fillStyle = hx(C_HULL); g.fillRect(0, 0, W, yB0);
    g.fillStyle = hx(C_BOOT); g.fillRect(0, yB0, W, yB1 - yB0);

    /* plate patchwork: no two adjacent plates weather to the same tone */
    for (i = 0; i < 240; i++) {
      g.globalAlpha = 0.030 + R() * 0.050;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * yB0, 70 + R() * 280, 16 + R() * 44);
    }
    for (i = 0; i < 130; i++) {
      g.globalAlpha = 0.020 + R() * 0.038;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, yB1 + R() * (H - yB1), 60 + R() * 240, 14 + R() * 40);
    }
    g.globalAlpha = 1;

    /* horizontal strakes every 1.35 m with a lit lip above each seam, and
       vertical butt joints staggered strake to strake.  This is a ship's
       most legible surface cue and it costs no geometry at all. */
    for (i = -5; i * 1.35 + 1.55 < HZ1; i++) {
      var zs = 1.55 + i * 1.35, y0 = Y(zs), y1 = Y(zs + 1.35);
      g.fillStyle = "rgba(0,0,0,0.28)"; g.fillRect(0, y0 - 1, W, 2);
      g.fillStyle = "rgba(255,255,255,0.065)"; g.fillRect(0, y0 - 3, W, 2);
      var off = ((i + 10) % 2) * 62;
      for (k = 0; k < W; k += 124) {
        g.fillStyle = "rgba(0,0,0,0.20)";
        g.fillRect(k + off, y1, 2, y0 - y1);
      }
    }

    /* the knuckle: a hard chine lifting from amidships to the stem */
    g.lineCap = "round";
    g.beginPath(); g.moveTo(U(2), Y(5.30)); g.lineTo(U(46), Y(6.85)); g.lineTo(U(75), Y(9.70));
    g.lineWidth = 7; g.strokeStyle = "rgba(0,0,0,0.32)"; g.stroke();
    g.beginPath(); g.moveTo(U(2), Y(5.52)); g.lineTo(U(46), Y(7.07)); g.lineTo(U(75), Y(9.92));
    g.lineWidth = 5; g.strokeStyle = "rgba(255,255,255,0.13)"; g.stroke();

    /* exhaust staining trailing AFT of the funnel (funnel sits at x = -7) */
    var soot = [[7.60, 6.70, 0.26], [6.70, 5.70, 0.17], [5.70, 4.40, 0.08]];
    for (i = 0; i < soot.length; i++) {
      var eg = g.createLinearGradient(U(-9), 0, U(-50), 0);
      eg.addColorStop(0, "rgba(22,20,18," + soot[i][2] + ")");
      eg.addColorStop(1, "rgba(22,20,18,0)");
      g.fillStyle = eg;
      g.fillRect(U(-50), Y(soot[i][0]), U(-9) - U(-50), Y(soot[i][1]) - Y(soot[i][0]));
    }

    /* rust weeping DOWN from freeing ports and scuppers */
    for (i = 0; i < 34; i++) {
      var rx = R() * W, rz = 2.6 + R() * 4.4, ry = Y(rz);
      var len = 30 + R() * 150, wd = 3 + R() * 5;
      var gr = g.createLinearGradient(0, ry, 0, ry + len);
      gr.addColorStop(0, "rgba(88,56,34,0.34)");
      gr.addColorStop(0.35, "rgba(92,62,40,0.17)");
      gr.addColorStop(1, "rgba(92,62,40,0.00)");
      g.fillStyle = gr; g.fillRect(rx, ry, wd, len);
      g.fillStyle = "rgba(14,16,18,0.42)"; g.fillRect(rx - 2, ry - 4, wd + 4, 4);
    }
    /* the big black anchor recess panel each side of the bow -- painted,
       not geometry, and one of the most recognisable marks on this class */
    g.fillStyle = "#0e1114";
    g.beginPath();
    g.moveTo(U(72.0), Y(9.55)); g.lineTo(U(65.0), Y(8.35));
    g.lineTo(U(65.6), Y(6.10)); g.lineTo(U(71.4), Y(7.15));
    g.closePath(); g.fill();

    /* heavy rust from the two hawse pipes at the bow */
    for (i = 0; i < 2; i++) {
      var ax = U(67.2 + i * 2.0), az = Y(8.60), al = 240;
      var ag = g.createLinearGradient(0, az, 0, az + al);
      ag.addColorStop(0, "rgba(96,60,32,0.52)");
      ag.addColorStop(1, "rgba(96,60,32,0.00)");
      g.fillStyle = ag; g.fillRect(ax, az, 15, al);
    }

    /* boot topping trim line, and the salt wash that sits above it */
    g.fillStyle = "rgba(255,255,255,0.12)"; g.fillRect(0, yB0 - 2, W, 3);
    g.fillStyle = "rgba(0,0,0,0.40)"; g.fillRect(0, yB1 - 1, W, 2);
    g.globalAlpha = 0.10; g.fillStyle = "#c8ced2";
    for (i = 0; i < 130; i++) g.fillRect(R() * W, Y(2.10) + R() * 26, 20 + R() * 100, 3 + R() * 6);
    g.globalAlpha = 1;

    TEX.hull = mkTex(THREE, cv);
    return TEX.hull;
  }

  /* --- underbody: anti-fouling, seen only below the boot topping --- */
  function foulTex(THREE) {
    if (TEX.foul) return TEX.foul;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(7717), i;
    g.fillStyle = hx(C_FOUL); g.fillRect(0, 0, W, H);
    for (i = 0; i < 150; i++) {
      g.globalAlpha = 0.05 + R() * 0.08;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 50 + R() * 200, 12 + R() * 40);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.6;
    for (i = 1; i < 10; i++) { g.beginPath(); g.moveTo(0, i * H / 10); g.lineTo(W, i * H / 10); g.stroke(); }
    for (i = 1; i < 56; i++) { g.beginPath(); g.moveTo(i * W / 56, 0); g.lineTo(i * W / 56, H); g.stroke(); }
    /* weed and slime along the top of the anti-fouling */
    g.globalAlpha = 0.20; g.fillStyle = "#243027";
    for (i = 0; i < 120; i++) g.fillRect(R() * W, R() * 40, 30 + R() * 120, 6 + R() * 14);
    g.globalAlpha = 1;
    TEX.foul = mkTex(THREE, cv);
    return TEX.foul;
  }

  /* --- weather deck: non-skid, plate grid, tie-down grit --- */
  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(3313), i;
    g.fillStyle = hx(C_DECK); g.fillRect(0, 0, W, H);
    for (i = 0; i < 60; i++) {
      g.globalAlpha = 0.026 + R() * 0.040;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 24 + R() * 110, 16 + R() * 80);
    }
    g.globalAlpha = 0.34; g.strokeStyle = "#000000"; g.lineWidth = 2;
    for (i = 1; i < 8; i++) {
      g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke();
      g.beginPath(); g.moveTo(i * W / 8, 0); g.lineTo(i * W / 8, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 2600; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 0.16; g.fillStyle = "#c9ccc4";
    for (i = 0; i < 40; i++) g.fillRect(R() * W, R() * H, 6 + R() * 26, 4);
    g.globalAlpha = 1;
    TEX.deck = mkTex(THREE, cv);
    return TEX.deck;
  }

  /* --- superstructure plating: panels, hatches, vertical weather streaks */
  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(9091), i;
    g.fillStyle = hx(C_SUP); g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.03 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 140, 20 + R() * 90);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.6;
    for (i = 1; i < 7; i++) { g.beginPath(); g.moveTo(0, i * H / 7); g.lineTo(W, i * H / 7); g.stroke(); }
    for (i = 1; i < 11; i++) { g.beginPath(); g.moveTo(i * W / 11, 0); g.lineTo(i * W / 11, H); g.stroke(); }
    /* watertight doors and small hatches: geometry would be waste here */
    for (i = 0; i < 14; i++) {
      var dx = 20 + R() * (W - 70), dy = 20 + R() * (H - 90);
      g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 2.4;
      g.strokeRect(dx, dy, 26 + R() * 10, 44 + R() * 16);
      g.fillStyle = "rgba(255,255,255,0.06)"; g.fillRect(dx + 2, dy + 2, 22, 40);
    }
    /* vertical streaking down from every horizontal edge */
    for (i = 0; i < 90; i++) {
      var sx = R() * W, sy = R() * H * 0.7, sl = 20 + R() * 90;
      var sg = g.createLinearGradient(0, sy, 0, sy + sl);
      sg.addColorStop(0, "rgba(46,50,54,0.30)");
      sg.addColorStop(1, "rgba(46,50,54,0.00)");
      g.fillStyle = sg; g.fillRect(sx, sy, 2 + R() * 4, sl);
    }
    TEX.sup = mkTex(THREE, cv);
    return TEX.sup;
  }

  /* --- radome / canvas cover: SKIN tier, faint panel seams only --- */
  function domeTex(THREE) {
    if (TEX.dome) return TEX.dome;
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rngOf(2027), i;
    g.fillStyle = hx(C_DOME); g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(0,0,0,0.14)"; g.lineWidth = 1.6;
    for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke(); }
    for (i = 1; i < 12; i++) { g.beginPath(); g.moveTo(i * W / 12, 0); g.lineTo(i * W / 12, H); g.stroke(); }
    g.globalAlpha = 0.10; g.fillStyle = "#5a5f62";
    for (i = 0; i < 70; i++) g.fillRect(R() * W, R() * H, 8 + R() * 40, 4 + R() * 18);
    g.globalAlpha = 1;
    TEX.dome = mkTex(THREE, cv);
    return TEX.dome;
  }

  /* --- pennant panel: the one place the team colour goes, per contract --- */
  function pennantTex(THREE, team) {
    var key = "pen_" + team;
    if (TEX[key]) return TEX[key];
    var W = 512, H = 168, cv = cvs(W, H), g = cv.getContext("2d"), i;
    g.fillStyle = hx(C_HULL); g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 2;
    for (i = 1; i < 3; i++) { g.beginPath(); g.moveTo(0, i * H / 3); g.lineTo(W, i * H / 3); g.stroke(); }
    g.font = "bold 150px monospace";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = "rgba(0,0,0,0.60)";
    g.fillText("168", W * 0.5 + 6, H * 0.5 + 6);
    g.fillStyle = hx(dim(team, 1.00));
    g.fillText("168", W * 0.5, H * 0.5);
    g.lineWidth = 4; g.strokeStyle = "rgba(0,0,0,0.45)";
    g.strokeText("168", W * 0.5, H * 0.5);
    TEX[key] = mkTex(THREE, cv);
    TEX[key].wrapS = TEX[key].wrapT = THREE.ClampToEdgeWrapping;
    return TEX[key];
  }

  /* ============================================================ geometry */
  /* A four-sided cylinder is a box whose top face scales independently --
     that is how every deckhouse, funnel casing and gun house on this ship
     gets its inward-sloping (tumblehome) sides for free. */
  function tboxG(THREE, lx, ly, lz, top) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    return g;
  }
  function cylZ(THREE, rt, rb, h, seg) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg || 12, 1);
    g.rotateX(PI / 2); return g;
  }
  function cylX(THREE, rt, rb, h, seg) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg || 12, 1);
    g.rotateZ(-PI / 2); return g;
  }

  /* M.loft winds its triangles inward; flipping the index and recomputing
     the normals halves the fill and gets the shading right. */
  function loftMesh(THREE, M, secs, segs, mtl, vz0, vz1) {
    var g = M.loft(THREE, secs, segs), i, t;
    var idx = g.getIndex();
    if (idx) {
      var a = idx.array;
      for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    /* rewrite u,v to length fraction and ABSOLUTE HEIGHT (see header note 2) */
    var pos = g.getAttribute("position"), uv = g.getAttribute("uv");
    var x0 = secs[0].x, x1 = secs[secs.length - 1].x;
    for (i = 0; i < pos.count; i++) {
      uv.setXY(i, (pos.getX(i) - x0) / (x1 - x0),
               clamp((pos.getZ(i) - vz0) / (vz1 - vz0), 0, 1));
    }
    uv.needsUpdate = true;
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* triangle fan closing one end of a loft -- the transom */
  function capMesh(THREE, st, segs, mtl, xOff, vz0, vz1) {
    var pos = [], uv = [], idx = [], j;
    pos.push(st.x + xOff, 0, st.zc);
    uv.push(0.5, clamp((st.zc - vz0) / (vz1 - vz0), 0, 1));
    for (j = 0; j <= segs; j++) {
      var t = j / segs * PI * 2, cy = Math.cos(t), sz = Math.sin(t), e = st.sq;
      var vy = st.w * Math.sign(cy) * Math.pow(Math.abs(cy), e);
      var vz = st.zc + st.h * Math.sign(sz) * Math.pow(Math.abs(sz), e);
      pos.push(st.x + xOff, vy, vz);
      uv.push(0.5 + vy / (st.w * 4), clamp((vz - vz0) / (vz1 - vz0), 0, 1));
    }
    /* wound to face -X: the transom looks aft */
    for (j = 1; j <= segs; j++) idx.push(0, j + 1, j);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* where a lofted section's surface actually is at a given fraction of its
     own half beam -- the deck plate must lie ON the hull, not hover */
  function topZ(st, ky) {
    var c = Math.pow(clamp(ky, 0, 1), 1 / st.sq);
    var s = Math.sqrt(Math.max(0, 1 - c * c));
    return st.zc + st.h * Math.pow(s, st.sq);
  }
  /* outboard y of a section at a given height */
  function sideY(st, z) {
    var s = clamp((z - st.zc) / st.h, -1, 1);
    var sn = Math.pow(Math.abs(s), 1 / st.sq);
    return st.w * Math.pow(Math.max(0, 1 - sn * sn), st.sq * 0.5);
  }
  function pickST(ST, x) {
    var n = ST.length, i;
    if (x <= ST[0].x) return ST[0];
    if (x >= ST[n - 1].x) return ST[n - 1];
    for (i = 1; i < n; i++) {
      if (x <= ST[i].x) {
        var a = ST[i - 1], b = ST[i], u = (x - a.x) / (b.x - a.x);
        return { x: x, w: a.w + (b.w - a.w) * u, h: a.h + (b.h - a.h) * u,
                 zc: a.zc + (b.zc - a.zc) * u, sq: a.sq + (b.sq - a.sq) * u };
      }
    }
    return ST[n - 1];
  }

  /* main deck: a cambered ribbon lying on the hull top, sheer and all */
  function deckRibbon(THREE, ST, mtl, edge, repU, repV) {
    var kys = [-edge, -edge * 0.82, -edge * 0.56, -edge * 0.26, 0,
               edge * 0.26, edge * 0.56, edge * 0.82, edge];
    var pos = [], uv = [], idx = [], i, j;
    var x0 = ST[0].x, x1 = ST[ST.length - 1].x;
    for (i = 0; i < ST.length; i++) {
      var st = ST[i];
      for (j = 0; j < kys.length; j++) {
        var ky = kys[j];
        pos.push(st.x, st.w * ky, topZ(st, Math.abs(ky)) + 0.05);
        uv.push((st.x - x0) / (x1 - x0) * repU, (ky + 1) * 0.5 * repV);
      }
    }
    var ring = kys.length;
    for (i = 0; i < ST.length - 1; i++)
      for (j = 0; j < ring - 1; j++) {
        var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        idx.push(a, c, d, a, d, b);
      }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* team flash panel: painted steel, so it stays in the SKIN tier */
  function flashTex(THREE, team) {
    var key = "flash_" + team;
    if (TEX[key]) return TEX[key];
    var W = 64, H = 64, cv = cvs(W, H), g = cv.getContext("2d"), i;
    g.fillStyle = hx(dim(team, 0.60)); g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.4;
    for (i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke(); }
    g.fillStyle = "rgba(255,255,255,0.08)"; g.fillRect(0, 0, W, 4);
    TEX[key] = mkTex(THREE, cv);
    return TEX[key];
  }

  /* ================================================================ hull
     x, half beam, deck CROWN z, keel z, section squareness.
     The crown sits ~0.35 m above the intended deck edge because the loft
     rolls the last few per cent of the beam down into the sheer strake. */
  var STN = [
    [-77.60, 6.95,  6.78, -3.30, 0.22],
    [-73.00, 7.72,  6.83, -4.70, 0.22],
    [-66.00, 8.32,  6.95, -5.60, 0.22],
    [-54.00, 8.60,  7.09, -6.00, 0.23],
    [-38.00, 8.62,  7.29, -6.05, 0.23],
    [-20.00, 8.60,  7.49, -6.05, 0.23],
    [ -2.00, 8.55,  7.75, -6.05, 0.24],
    [ 14.00, 8.34,  8.05, -6.00, 0.26],
    [ 28.00, 7.94,  8.51, -5.85, 0.29],
    [ 40.00, 7.18,  9.07, -5.45, 0.34],
    [ 52.00, 5.92,  9.89, -4.55, 0.44],
    [ 62.00, 4.42, 10.69, -3.05, 0.62],
    [ 70.00, 2.82, 11.39, -0.90, 0.95],
    [ 74.00, 1.62, 11.79,  2.10, 1.35],
    [ 77.00, 0.60, 12.09,  6.20, 1.70],
    [ 78.00, 0.15, 12.23,  9.40, 1.95]
  ];

  /* ================================================================ build */
  function build(THREE, M, C) {
    var root = new THREE.Group();
    root.name = "pla_e00_destroyer";
    var team = (C && C.team) || 0x3f7fd0;
    var i, k, s, sg;

    /* ------------------------------------------------ 1. MATERIALS ---- */
    /* SKIN -- the colour lives in the canvas, so the material is white  */
    function skin(map, rough) {
      return new THREE.MeshStandardMaterial({
        color: 0xffffff, map: map, roughness: rough === undefined ? 0.88 : rough,
        metalness: 0.06
      });
    }
    var mHull  = skin(hullTex(THREE), 0.88);
    var mFoul  = skin(foulTex(THREE), 0.90);
    var mDeck  = skin(deckTex(THREE), 0.95);
    var mSup   = skin(supTex(THREE), 0.86);
    var mDome  = skin(domeTex(THREE), 0.84);
    var mPen   = skin(pennantTex(THREE, team), 0.88);
    var mTeam  = skin(flashTex(THREE, team), 0.84);
    var fdTex  = deckTex(THREE).clone();
    fdTex.needsUpdate = true; fdTex.repeat.set(0.13, 0.13);
    var mFlt   = skin(fdTex, 0.95);

    /* METAL -- no map, by contract */
    var mMetal = new THREE.MeshStandardMaterial({ color: 0x4b5257, roughness: 0.55, metalness: 0.50 });
    var mBlack = new THREE.MeshStandardMaterial({ color: 0x191c1f, roughness: 0.62, metalness: 0.38 });

    /* GLASS */
    var mGlass = new THREE.MeshPhysicalMaterial({
      color: 0x16222b, roughness: 0.10, metalness: 0.0,
      transparent: true, opacity: 0.84
    });

    /* ------------------------------------------------ 2. HELPERS ------ */
    function A(par, geo, mtl, x, y, z, rx, ry, rz) {
      var m = new THREE.Mesh(geo, mtl);
      m.position.set(x || 0, y || 0, z || 0);
      if (rx || ry || rz) m.rotation.set(rx || 0, ry || 0, rz || 0);
      par.add(m); return m;
    }
    function rod(par, mtl, ax, ay, az, bx, by, bz, r, seg) {
      var dx = bx - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (L < 1e-4) return null;
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 6, 1), mtl);
      m.position.set((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(dx, dy, dz).normalize());
      par.add(m); return m;
    }
    /* a chord-following box: deck edge bulwarks, railing wires */
    function chord(par, mtl, ax, ay, az, bx, by, bz, wd, ht, zoff) {
      var dx = bx - ax, dy = by - ay, dz = bz - az;
      var flat = Math.sqrt(dx * dx + dy * dy);
      var len = Math.sqrt(flat * flat + dz * dz);
      return A(par, tboxG(THREE, len, wd, ht, 1.0),
        mtl, (ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5 + (zoff || 0),
        0, -Math.atan2(dz, flat), Math.atan2(dy, dx));
    }

    /* ------------------------------------------------ 3. HULL --------- */
    var STop = [], SLow = [];
    for (i = 0; i < STN.length; i++) {
      s = STN[i];
      var bz = Math.max(-0.60, s[3] - 0.10);
      STop.push({ x: s[0], w: s[1] + 0.14, h: (s[2] - bz) * 0.5, zc: (s[2] + bz) * 0.5,
                  sq: Math.min(s[4], 0.30) });
      SLow.push({ x: s[0], w: s[1], h: (s[2] - s[3]) * 0.5, zc: (s[2] + s[3]) * 0.5, sq: s[4] });
    }
    root.add(loftMesh(THREE, M, SLow, 26, mHull, HZ0, HZ1));
    root.add(loftMesh(THREE, M, STop, 32, mHull, HZ0, HZ1));
    root.add(capMesh(THREE, SLow[0], 26, mHull, -0.03, HZ0, HZ1));
    root.add(capMesh(THREE, STop[0], 32, mHull, -0.08, HZ0, HZ1));
    root.add(deckRibbon(THREE, STop, mDeck, 0.955, 26, 3));

    function dkZ(x) { var t = pickST(STop, x); return t.zc + t.h; }
    function edgeZ(x) { return topZ(pickST(STop, x), 0.950); }
    function edgeY(x) { return pickST(STop, x).w * 0.950; }

    /* bow sonar dome under the forefoot */
    var sonar = A(root, new THREE.SphereGeometry(2.30, 14, 9), mFoul, 56.0, 0, -4.30);
    sonar.scale.set(2.30, 0.72, 0.62);

    /* ------------------------------------------------ 4. DECKHOUSES ---
       ONE continuous enclosed block with tumblehome sides: the single
       biggest thing that separates a Luyang from the Luda before it.  */
    function house(x0, x1, hw, zb, zt, taper, mtl) {
      return A(root, tboxG(THREE, x1 - x0, hw * 2, zt - zb, taper),
        mtl || mSup, (x0 + x1) * 0.5, 0, (zb + zt) * 0.5);
    }
    house( 26.0,  40.5, 5.90,  8.55, 11.55, 0.90);   /* forward SAM house */
    house(  4.4,  26.6, 6.80,  8.00, 11.50, 0.93);   /* under the bridge  */
    house(-14.0,   6.4, 7.30,  7.55, 11.40, 0.94);   /* amidships         */
    house(-47.5, -12.0, 7.10,  7.20, 11.25, 0.94);   /* after deckhouse   */
    house( 26.4,  31.2, 4.40, 11.50, 13.40, 0.90);   /* CIWS bandstand    */
    house(  5.0,  26.6, 5.70, 11.50, 14.35, 0.90);   /* 02 level          */
    house( 12.5,  26.2, 5.30, 14.35, 16.80, 0.88);   /* bridge, 03 level  */
    house(  0.5,  12.6, 4.30, 11.50, 15.70, 0.86);   /* mast house        */
    house(-12.7,  -1.3, 4.70, 11.40, 17.00, 0.80);   /* funnel casing     */
    house(-33.2, -27.0, 3.70, 11.25, 15.30, 0.82);   /* after uptake      */
    house(-39.8, -32.8, 3.55, 11.25, 18.60, 0.68);   /* after radar tower */
    house(-58.5, -47.5, 6.20,  7.05, 13.20, 0.93);   /* hangar            */

    /* deck lips: the overhanging walkway at the top of each level, which
       is what separates the blocks from each other in a side view */
    function lip(x0, x1, hw, z) {
      A(root, tboxG(THREE, x1 - x0, hw * 2, 0.24, 1.0), mSup,
        (x0 + x1) * 0.5, 0, z + 0.10);
    }
    lip( 25.6,  40.9, 6.10, 11.55);
    lip(  5.6,  26.9, 7.05, 11.50);
    lip(-14.4,   6.7, 7.55, 11.40);
    lip(-47.9, -13.2, 7.35, 11.25);
    lip(  4.6,  27.0, 5.95, 14.35);
    lip( 12.1,  26.6, 5.55, 16.80);
    lip(-58.9, -47.1, 6.45, 13.20);

    /* bridge wings */
    for (sg = -1; sg <= 1; sg += 2) {
      A(root, tboxG(THREE, 6.40, 2.10, 1.55, 0.88), mSup, 19.0, sg * 6.20, 15.10);
      A(root, tboxG(THREE, 6.40, 2.30, 0.16, 1.0), mDeck, 19.0, sg * 6.40, 15.95);
    }
    /* pilothouse glazing: the wide raked window band and its wing lights */
    A(root, tboxG(THREE, 0.46, 9.30, 1.90, 1.0), mGlass, 25.60, 0, 15.60, 0, -0.16, 0);
    for (sg = -1; sg <= 1; sg += 2) {
      A(root, tboxG(THREE, 9.00, 0.44, 1.70, 1.0), mGlass, 21.0, sg * 4.98, 15.58);
      A(root, tboxG(THREE, 1.90, 0.34, 1.05, 1.0), mGlass, 19.0, sg * 7.20, 15.15);
    }
    /* hangar door and the flight deck end of the after deckhouse */
    A(root, tboxG(THREE, 0.30, 8.40, 5.20, 1.0), mMetal, -58.60, 0, 9.75);
    A(root, tboxG(THREE, 11.4, 12.0, 0.20, 1.0), mDeck, -53.0, 0, 13.28);

    /* ------------------------------------------------ 5. FLIGHT DECK -- */
    var fdPts = [[-75.6, -7.10], [-59.0, -7.55], [-59.0, 7.55], [-75.6, 7.10]];
    A(root, M.slab(THREE, fdPts, 0.34), mFlt, 0, 0, 6.80);
    A(root, new THREE.TorusGeometry(4.10, 0.11, 4, 24), mDeck, -67.0, 0, 7.20);
    A(root, new THREE.TorusGeometry(2.10, 0.09, 4, 20), mDeck, -67.0, 0, 7.20);

    /* ------------------------------------------------ 6. FORECASTLE ---
       solid bulwark from the break of the forecastle to the stem: it is
       most of the bow's silhouette and it hides the anchor gear          */
    var bws = [28.5, 33.0, 37.5, 42.0, 46.5, 51.0, 55.5, 60.0, 64.0, 68.0, 71.5, 74.0, 76.2];
    for (sg = -1; sg <= 1; sg += 2) {
      for (i = 0; i < bws.length - 1; i++) {
        var xa = bws[i], xb = bws[i + 1];
        var ha = dkZ(xa) + 0.66 - edgeZ(xa), hb = dkZ(xb) + 0.66 - edgeZ(xb);
        var hm = clamp((ha + hb) * 0.5, 0.95, 2.10);
        chord(root, mSup, xa, sg * edgeY(xa), edgeZ(xa),
              xb, sg * edgeY(xb), edgeZ(xb), 0.20, hm, hm * 0.5);
      }
      /* anchor, laid flush in its hawse recess on the real hull surface */
      var anY = sideY(pickST(STop, 68.0), 8.10) - 0.04;
      A(root, tboxG(THREE, 1.80, 0.32, 1.95, 1.0), mBlack, 68.0, sg * anY, 8.10);
      A(root, new THREE.BoxGeometry(0.34, 0.55, 0.38), mBlack, 68.0, sg * (anY - 0.16), 9.20);
      /* windlass and cable reel */
      A(root, cylZ(THREE, 0.58, 0.62, 0.80, 12), mMetal, 61.0, sg * 2.30, dkZ(61.0) + 0.40);
      A(root, cylZ(THREE, 0.95, 0.95, 0.55, 12), mMetal, 57.0, sg * 2.60, dkZ(57.0) + 0.28);
    }
    /* breakwater chevron */
    for (sg = -1; sg <= 1; sg += 2)
      A(root, tboxG(THREE, 0.26, 5.80, 1.15, 1.0), mSup,
        52.6, sg * 2.45, dkZ(52.6) + 0.55, 0, -0.26, sg * 0.50);

    /* ------------------------------------------------ 7. MAIN GUN -----
       Named "turret": render3d.js finds it by name and trains it on the
       target, so the whole mount -- barbette, house, barrel -- rotates
       about ITS OWN vertical axis at its own centre. */
    A(root, tboxG(THREE, 7.60, 5.60, 0.62, 0.92), mSup, 47.5, 0, 9.72);
    var T = new THREE.Group();
    T.name = "turret";
    T.position.set(47.5, 0, 10.03);
    root.add(T);
    A(T, cylZ(THREE, 2.28, 2.48, 0.55, 18), mSup, 0, 0, 0.27);
    /* faceted stealth gun house: hard chines, no cast rounding anywhere */
    var gunPts = [
      [-2.80, 0.06], [2.10, 0.06], [2.80, 0.70], [2.60, 2.10],
      [1.55, 2.72], [-2.25, 2.72], [-2.80, 1.86]
    ];
    A(T, M.slab(THREE, gunPts, 3.50, "xz"), mSup, 0, 1.75, 0);
    A(T, tboxG(THREE, 0.78, 1.24, 1.10, 0.85), mSup, 2.48, 0, 1.78);
    A(T, cylX(THREE, 0.170, 0.225, 6.10, 12), mMetal, 5.30, 0, 1.78);
    A(T, cylX(THREE, 0.250, 0.250, 0.60, 10), mMetal, 8.10, 0, 1.78);
    A(T, tboxG(THREE, 0.90, 0.16, 0.55, 1.0), mTeam, -1.60, 1.78, 2.10);
    A(T, tboxG(THREE, 0.90, 0.16, 0.55, 1.0), mTeam, -1.60, -1.78, 2.10);

    /* ------------------------------------------------ 8. SA-N-12 ------
       Russian 3S90E single-arm launcher on its revolver magazine drum.
       One before the bridge, one abaft the funnel -- the period cue.   */
    function samMount(x, z, aft) {
      var G = new THREE.Group();
      G.position.set(x, 0, z);
      if (aft) G.rotation.z = PI;
      root.add(G);
      A(G, cylZ(THREE, 2.60, 2.80, 1.10, 18), mSup, 0, 0, 0.55);
      A(G, cylZ(THREE, 1.85, 2.30, 0.45, 18), mSup, 0, 0, 1.32);
      A(G, cylZ(THREE, 1.20, 1.35, 0.90, 14), mMetal, 0, 0, 1.95);
      A(G, tboxG(THREE, 1.45, 1.80, 0.80, 0.85), mSup, 0, 0, 2.72);
      var arm = new THREE.Group();
      arm.position.set(0, 0, 2.95); arm.rotation.y = -0.34;
      G.add(arm);
      A(arm, tboxG(THREE, 4.00, 0.60, 0.44, 0.92), mMetal, 1.65, 0, 0);
      A(arm, cylX(THREE, 0.205, 0.205, 3.30, 10), mDome, 1.75, 0, 0.44);
      A(arm, cylX(THREE, 0.03, 0.205, 0.80, 10), mDome, 3.80, 0, 0.44);
      for (k = 0; k < 4; k++) {
        var an = k * PI / 2 + PI / 4;
        A(arm, new THREE.BoxGeometry(0.80, 0.06, 0.46), mDome,
          0.35, Math.cos(an) * 0.30, 0.44 + Math.sin(an) * 0.30, an, 0, 0);
      }
      return G;
    }
    samMount(34.0, 11.55, false);
    samMount(-43.6, 11.25, true);

    /* ------------------------------------------------ 9. YJ-83 --------
       four quad box clusters, two a side, canted outboard and elevated */
    function yjGroup(x, sgy) {
      var G = new THREE.Group();
      G.position.set(x, sgy * 5.60, 12.05);
      G.rotation.set(0, -0.30, sgy * 0.20);
      root.add(G);
      A(G, tboxG(THREE, 5.60, 3.30, 0.30, 1.0), mSup, 0, 0, -0.42);
      A(G, tboxG(THREE, 2.60, 3.10, 0.85, 0.86), mSup, -1.10, 0, -0.90);
      A(G, tboxG(THREE, 2.20, 2.90, 0.85, 0.86), mSup, 2.00, 0, -0.90);
      for (var q = 0; q < 4; q++) {
        var yy = (q - 1.5) * 0.78;
        A(G, tboxG(THREE, 5.90, 0.68, 0.72, 1.0), mDome, 0, yy, 0.12);
        A(G, tboxG(THREE, 0.20, 0.74, 0.78, 1.0), mMetal, 3.00, yy, 0.12);
        A(G, tboxG(THREE, 0.20, 0.74, 0.78, 1.0), mMetal, -3.00, yy, 0.12);
      }
      return G;
    }
    yjGroup(-16.5,  1); yjGroup(-16.5, -1);
    yjGroup(-24.4,  1); yjGroup(-24.4, -1);

    /* ----------------------------------------------- 10. FUNNEL -------
       twin BLACK uptake pipes standing proud of the grey casing        */
    for (sg = -1; sg <= 1; sg += 2) {
      A(root, cylZ(THREE, 1.16, 1.24, 5.30, 14), mBlack, -6.8, sg * 1.95, 18.00);
      A(root, cylZ(THREE, 1.30, 1.30, 0.55, 14), mBlack, -6.8, sg * 1.95, 20.35);
      A(root, tboxG(THREE, 3.20, 0.16, 0.90, 1.0), mTeam, -6.8, sg * 4.05, 15.20);
    }
    A(root, tboxG(THREE, 9.20, 6.20, 0.35, 1.0), mSup, -6.8, 0, 17.05);
    /* after uptake, a low second stack */
    for (sg = -1; sg <= 1; sg += 2)
      A(root, cylZ(THREE, 0.88, 0.95, 3.60, 12), mBlack, -30.1, sg * 1.45, 16.20);
    A(root, tboxG(THREE, 5.20, 5.40, 0.30, 1.0), mSup, -30.1, 0, 15.35);

    /* ----------------------------------------------- 11. MAINMAST -----
       plated tapered tower, NOT a lattice -- that is the whole point of
       the class -- carrying the Top Plate 3D air search array           */
    var MX = 6.60;
    A(root, tboxG(THREE, 5.70, 5.30, 7.20, 0.70), mSup, MX, 0, 19.30);
    A(root, tboxG(THREE, 4.90, 5.90, 0.28, 1.0),  mSup, MX, 0, 23.05);
    A(root, tboxG(THREE, 2.95, 2.65, 4.20, 0.76), mSup, MX, 0, 25.00);
    A(root, cylZ(THREE, 0.52, 0.62, 1.30, 10),    mMetal, MX, 0, 27.60);
    /* Top Plate: back-to-back planar arrays, raked aft */
    A(root, tboxG(THREE, 0.66, 4.50, 3.80, 1.0), mSup,  MX, 0, 29.15, 0, -0.26, 0);
    A(root, tboxG(THREE, 0.16, 4.10, 3.40, 1.0), mMetal, MX + 0.46, 0, 29.26, 0, -0.26, 0);
    /* surface search / navigation open array */
    A(root, tboxG(THREE, 0.24, 3.60, 0.30, 1.0), mMetal, MX, 0, 23.75);
    A(root, cylZ(THREE, 0.22, 0.22, 0.70, 8), mMetal, MX, 0, 23.40);
    for (sg = -1; sg <= 1; sg += 2) {
      rod(root, mMetal, MX, sg * 0.60, 23.20, MX - 0.4, sg * 4.60, 22.55, 0.10, 5);
      rod(root, mMetal, MX + 1.9, sg * 1.10, 22.90, MX + 1.9, sg * 3.40, 21.60, 0.09, 5);
      rod(root, mMetal, MX - 1.1, sg * 1.20, 27.00, MX - 1.1, sg * 1.20, 31.60, 0.075, 5);
      rod(root, mMetal, MX + 1.7, sg * 1.90, 23.10, MX + 1.7, sg * 1.90, 29.20, 0.065, 5);
      A(root, cylZ(THREE, 0.50, 0.56, 1.10, 10), mDome, MX - 0.4, sg * 3.80, 23.20);
      A(root, new THREE.SphereGeometry(0.78, 10, 7), mDome, MX + 1.9, sg * 3.10, 21.15);
    }

    /* ----------------------------------------------- 12. FRONT DOME ---
       MR-90 Orekh illuminators.  Two big white spheres, forward one on
       the bridge roof ahead of the mast, after one high on its tower.  */
    A(root, cylZ(THREE, 1.55, 1.80, 1.60, 14), mSup, 18.60, 0, 17.55);
    A(root, new THREE.SphereGeometry(1.88, 18, 12), mDome, 18.60, 0, 19.20);
    A(root, cylZ(THREE, 1.55, 1.80, 1.20, 14), mSup, -36.30, 0, 19.15);
    A(root, new THREE.SphereGeometry(1.88, 18, 12), mDome, -36.30, 0, 20.75);
    /* secondary radomes clustered round the after tower and the hangar */
    for (sg = -1; sg <= 1; sg += 2) {
      A(root, new THREE.SphereGeometry(0.86, 10, 7), mDome, -33.6, sg * 3.00, 16.30);
      A(root, new THREE.SphereGeometry(0.72, 10, 7), mDome, -45.6, sg * 3.60, 12.30);
      A(root, cylZ(THREE, 0.46, 0.52, 1.05, 10), mDome, 27.0, sg * 3.60, 14.00);
      A(root, new THREE.SphereGeometry(0.66, 10, 7), mDome, 14.6, sg * 4.20, 17.35);
    }

    /* ----------------------------------------------- 13. TYPE 730 ----- */
    function ciws(x, z) {
      var G = new THREE.Group(); G.position.set(x, 0, z); root.add(G);
      A(G, cylZ(THREE, 1.30, 1.48, 0.72, 14), mSup, 0, 0, 0.36);
      A(G, tboxG(THREE, 2.15, 2.10, 1.20, 0.80), mMetal, 0, 0, 1.32);
      A(G, cylX(THREE, 0.30, 0.30, 1.95, 10), mMetal, 1.35, 0, 1.28);
      A(G, cylX(THREE, 0.15, 0.15, 0.80, 8), mMetal, 2.62, 0, 1.28);
      A(G, new THREE.SphereGeometry(0.62, 10, 7), mDome, -0.55, 0, 2.28);
      A(G, tboxG(THREE, 0.60, 0.80, 0.66, 0.9), mDome, 0.70, 0, 2.20);
      return G;
    }
    ciws(28.8, 13.40);
    ciws(-52.8, 13.38);

    /* ----------------------------------------------- 14. DECK FITTINGS */
    for (sg = -1; sg <= 1; sg += 2) {
      /* triple 324 mm torpedo tubes, trained outboard */
      for (k = 0; k < 3; k++) {
        var ty = sg * 7.20, tz = 12.00 + (k === 2 ? 0.70 : 0);
        var tx = -10.6 + (k === 0 ? 0.40 : k === 1 ? -0.40 : 0);
        A(root, new THREE.CylinderGeometry(0.34, 0.34, 3.30, 10, 1), mSup, tx, ty, tz);
      }
      A(root, tboxG(THREE, 1.60, 1.30, 0.55, 1.0), mSup, -10.6, sg * 6.00, 11.70);
      /* RHIB in davits */
      A(root, tboxG(THREE, 6.20, 2.10, 1.05, 0.72), mSup, -30.5, sg * 5.60, 11.85);
      A(root, tboxG(THREE, 2.60, 1.55, 0.72, 0.85), mDome, -31.4, sg * 5.60, 12.70);
      rod(root, mMetal, -27.8, sg * 4.40, 11.30, -27.2, sg * 6.90, 14.10, 0.13, 5);
      rod(root, mMetal, -33.2, sg * 4.40, 11.30, -33.8, sg * 6.90, 14.10, 0.13, 5);
      /* liferaft canisters */
      for (k = 0; k < 3; k++)
        A(root, new THREE.CylinderGeometry(0.42, 0.42, 1.20, 8, 1), mDome,
          -19.0 - k * 3.6, sg * 6.55, 11.85);
      /* chaff launchers on the bridge wing faces */
      A(root, tboxG(THREE, 0.95, 0.80, 0.85, 0.9), mMetal, 22.2, sg * 5.90, 12.05);
      A(root, tboxG(THREE, 0.95, 0.80, 0.85, 0.9), mMetal, 16.0, sg * 6.10, 12.05);
      /* ventilation trunks and lockers along the 01 deck */
      A(root, tboxG(THREE, 2.40, 1.30, 1.10, 0.9), mSup, 1.5, sg * 5.40, 11.95);
      A(root, tboxG(THREE, 3.20, 1.50, 0.95, 0.9), mSup, -40.5, sg * 5.30, 11.72);
      /* replenishment-at-sea post */
      rod(root, mMetal, -2.0, sg * 5.80, 11.40, -2.0, sg * 5.80, 15.60, 0.16, 6);
    }

    /* ----------------------------------------------- 15. RAILINGS -----
       a warship without railings does not read as a warship             */
    var RX0 = 28.5, RX1 = -75.6, NR = 32;
    for (sg = -1; sg <= 1; sg += 2) {
      var px = 0, py = 0, pz = 0, have = false;
      for (i = 0; i <= NR; i++) {
        var rx = RX0 + (RX1 - RX0) * (i / NR);
        var ry = sg * edgeY(rx), rz = edgeZ(rx);
        A(root, new THREE.BoxGeometry(0.10, 0.10, 1.06), mMetal, rx, ry, rz + 0.53);
        if (have) {
          chord(root, mMetal, px, py, pz + 0.46, rx, ry, rz + 0.46, 0.055, 0.055, 0);
          chord(root, mMetal, px, py, pz + 0.96, rx, ry, rz + 0.96, 0.065, 0.065, 0);
        }
        px = rx; py = ry; pz = rz; have = true;
      }
    }

    /* ----------------------------------------------- 16. UNDERWATER --- */
    for (sg = -1; sg <= 1; sg += 2) {
      A(root, cylX(THREE, 0.26, 0.26, 12.0, 8), mMetal, -62.5, sg * 3.20, -4.55);
      rod(root, mMetal, -66.0, sg * 1.60, -5.90, -68.4, sg * 3.20, -4.55, 0.20, 6);
      rod(root, mMetal, -66.0, sg * 4.60, -5.60, -68.4, sg * 3.20, -4.55, 0.20, 6);
      A(root, cylX(THREE, 0.50, 0.30, 0.90, 10), mMetal, -69.6, sg * 3.20, -4.55);
      for (k = 0; k < 5; k++) {
        var ba = k * (2 * PI / 5);
        A(root, new THREE.BoxGeometry(0.11, 1.55, 0.62), mMetal,
          -69.7, sg * 3.20 + Math.cos(ba) * 0.92, -4.55 + Math.sin(ba) * 0.92, ba, 0, 0);
      }
      A(root, tboxG(THREE, 2.70, 0.30, 3.30, 0.85), mFoul, -72.6, sg * 2.70, -3.30);
      /* bilge keel */
      A(root, tboxG(THREE, 34.0, 0.16, 0.80, 1.0), mFoul, -14.0, sg * 8.42, -3.90, 0.60, 0, 0);
    }

    /* ----------------------------------------------- 17. TEAM COLOUR --
       pennant number panels on the bow, plus flashes aft so ownership
       still reads from astern on a busy map                            */
    var penY = sideY(pickST(STop, 40.0), 4.70) + 0.07;
    var penS = new THREE.PlaneGeometry(10.40, 3.40);
    penS.rotateX(PI / 2);                       /* normal -Y: starboard   */
    var penP = new THREE.PlaneGeometry(10.40, 3.40);
    penP.rotateX(PI / 2); penP.rotateZ(PI);     /* normal +Y, text unmirrored */
    A(root, penS, mPen, 41.0, -penY, 4.85, 0, 0,  0.084);
    A(root, penP, mPen, 41.0,  penY, 4.85, 0, 0, -0.084);
    A(root, tboxG(THREE, 0.24, 3.40, 0.85, 1.0), mTeam, -77.95, 0, 4.60);
    for (sg = -1; sg <= 1; sg += 2) {
      A(root, tboxG(THREE, 3.60, 0.14, 0.95, 1.0), mTeam, -53.0, sg * 6.05, 12.10);
      A(root, tboxG(THREE, 1.80, 0.16, 0.60, 1.0), mTeam, 19.0, sg * 7.30, 15.20);
      A(root, tboxG(THREE, 2.60, 0.16, 0.70, 1.0), mTeam, 33.0, sg * 5.55, 10.30);
    }

    /* ----------------------------------------------- 18. FINISH ------- */
    root.traverse(function (o) {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
    return root;
  }

  return { build: build };
})();

UNIT_MODELS["pla_e00_destroyer"] = {
  len: 155.6,
  build: function (THREE, M, C) { return HeroPlaE00Destroyer.build(THREE, M, C); }
};
