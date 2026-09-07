/* ====== hero/kpa_e90_missileboat.js - Soju class missile boat (KPA, e90) ======
   HERO reference model. Hand-built to a higher standard than the parametric
   roster in warship3d.js; the e90 small-combatant hulls are meant to be tuned
   to match this one.

   Model space follows models3d.js: +X bow, +Y left (port), +Z up, real metres,
   WATERLINE AT z = 0. render3d.js applies rotation.x = -PI/2 and rescales by
   measured length, so this file is authored Z-up and NEVER Y-up.

   The Soju is North Korea's stretched Osa derivative: the same Project 205
   layout on a slightly longer hull. The period cues this model exists to
   carry, all of them read off the photographs listed below:

     - A 39 m hard-chine planing hull, very low freeboard amidships, sharply
       raked stem with a knuckle, flat transom. No funnel at all - the diesels
       exhaust through the quarters, so the profile is uninterrupted.
     - FOUR enormous SS-N-2 Styx launch containers, two per side, tapered
       hangar boxes with the open muzzle end FORWARD and HIGH: elevated about
       12 degrees and splayed some 5 degrees outboard. They dominate the whole
       after two thirds of the boat and their tops sit level with the bridge
       roof. Getting this backwards - nose end low - was the first thing the
       photographs settled.
     - A low stepped pilothouse well forward, roughly one third of the length
       back from the stem, with a band of big square windows and a raked face.
     - Twin 30 mm AK-230 mounts fore and aft: low rounded drums with a domed
       top and two short barrels, not gun houses.
     - A short plated pole mast right behind the bridge carrying a small drum
       radar, plus the Osa's other signature - a ball radome on its own
       pedestal aft, between the after pair of containers.
     - Dark grey, weathered, workmanlike: PAINT.darkgrey from warship3d.js.

   Dimensions came off ref/osa_pol.jpg (broadside, Project 205, 46 px/m fixed
   by the 38.6 m waterline) and ref/osa_2.jpg (43 px/m), cross-checked against
   ref/osa4_profile.png and ref/osa4_plan.png (line drawings, profile and
   plan), ref/osa_bow.jpg (bow quarter, settles the launcher splay and the
   flare) and ref/osa_1.jpg / ref/osa_3.jpg (quarter views).

   Measured, in this file's coordinates (midships x = 0, stem x = +19.5):
     deck at stem 2.96, amidships 1.61, at transom 1.46; draught 1.84
     forward gun axis x = +10.3      aft gun axis x = -16.9
     pilothouse x = +2.3 .. +7.4     bridge roof z = 5.12
     mast truck z = 10.9             radome centre z = 6.45, x = -11.6
     forward containers x = -2.0     after containers x = -11.2
     container centreline y = +/- 2.72                                      */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";

  var PI = Math.PI;

  /* ---------------------------------------------------------------- paint
     Straight out of the PAINT table at the top of js/warship3d.js. The spec
     row js/warship_specs.js:kpa_e90_missileboat carries camo "darkgrey", so:
       hull 0x4f565c   superstructure 0x5a6168   deck 0x383d42
     Nothing here is invented; the canvases are painted with these literal
     hexes and the materials are left white so what reaches the screen is the
     table colour and not the table colour squared.                        */
  var C_HULL = "#4f565c";
  var C_SUP  = "#5a6168";
  var C_DECK = "#383d42";
  var C_BOOT = "#272c31";        /* boot topping band at the waterline     */
  var C_FOUL = "#191513";        /* anti-fouling below it, darker still    */

  var LEN   = 39.0;
  var X_ST  = -19.5, X_BW = 19.5;
  var Z_TB  = -2.10, Z_TT = 3.10;   /* hull texture v span, metres of z    */

  /* ------------------------------------------------------------- stations
     x, half beam, deck z, keel z, topsides sq, underbody sq.
     sq below 1 squares the section off. A planing hull with a hard chine is
     genuinely slab-sided, so the topsides run near 0.28 and only pinch above
     1.0 at the forefoot where the entry has to go fine.                    */
  var STA = [
    [-19.50, 2.98, 1.46, -1.28, 0.30, 0.30],
    [-18.70, 3.18, 1.46, -1.55, 0.30, 0.30],
    [-16.50, 3.50, 1.48, -1.72, 0.28, 0.31],
    [-13.50, 3.70, 1.51, -1.79, 0.27, 0.33],
    [-10.00, 3.79, 1.55, -1.83, 0.27, 0.35],
    [ -6.00, 3.80, 1.61, -1.84, 0.27, 0.36],
    [ -2.00, 3.77, 1.71, -1.83, 0.28, 0.38],
    [  2.00, 3.68, 1.85, -1.79, 0.30, 0.44],
    [  5.50, 3.50, 2.01, -1.70, 0.33, 0.54],
    [  8.50, 3.22, 2.17, -1.55, 0.38, 0.66],
    [ 11.00, 2.88, 2.33, -1.34, 0.44, 0.78],
    [ 13.50, 2.40, 2.50, -1.02, 0.55, 0.92],
    [ 15.50, 1.90, 2.65, -0.66, 0.68, 1.04],
    [ 17.20, 1.32, 2.78,  0.00, 0.82, 1.16],
    [ 18.50, 0.74, 2.88,  0.76, 0.96, 1.26],
    [ 19.50, 0.16, 2.96,  1.58, 1.10, 1.34]
  ];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* interpolate a station row at any x */
  function sta(x) {
    var n = STA.length, i;
    if (x <= STA[0][0]) return STA[0].slice();
    if (x >= STA[n - 1][0]) return STA[n - 1].slice();
    for (i = 1; i < n; i++) {
      if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i];
        var u = (x - a[0]) / (b[0] - a[0]), o = [x];
        for (var k = 1; k < 6; k++) o.push(lerp(a[k], b[k], u));
        return o;
      }
    }
    return STA[n - 1].slice();
  }

  function deckZ(x) { return sta(x)[2]; }
  function halfB(x) { return sta(x)[1]; }

  /* topsides loft bottom: level with the waterline knuckle amidships, but it
     has to climb with the keel forward or the stem grows a thin fin hanging
     down below the forefoot */
  function topBot(zk) { return zk < -0.22 ? -0.20 : zk + 0.03; }

  /* where the lofted top surface actually is at a given fraction of the half
     beam, so the deck plate lies ON the hull instead of hovering over it */
  function crownZ(x, ky) {
    var s = sta(x), bot = topBot(s[3]);
    var h = (s[2] - bot) * 0.5, zc = (s[2] + bot) * 0.5;
    var c = Math.pow(clamp(Math.abs(ky), 0, 1), 1 / s[4]);
    var t = Math.sqrt(Math.max(0, 1 - c * c));
    return zc + h * Math.pow(t, s[4]);
  }
  function edgeY(x, ky) { return halfB(x) * ky; }

  /* =============================================================== texture
     Three painted canvases, one per SKIN surface: the hull side elevation,
     the superstructure plating and the deck. Everything else is METAL or
     GLASS. The hull canvas is a true side elevation - the loft's cylindrical
     v is thrown away and replaced with one derived from world z - which is
     the only way a boot topping and a waterline survive on a lofted hull. */
  var TEX = {};

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function hex(n) { return "#" + ("000000" + (n >>> 0).toString(16)).slice(-6); }
  function finish(THREE, cv, clampEdge) {
    var t = new THREE.CanvasTexture(cv);
    if (clampEdge) {
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    } else {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
    }
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  function hullTex(THREE, team) {
    var key = "hull_" + (team >>> 0);
    if (TEX[key]) return TEX[key];
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(90211), i, x, y;
    var pxm = H / (Z_TT - Z_TB);                 /* 49.2 px per metre of z  */
    function yOf(z) { return (Z_TT - z) * pxm; }
    function uOf(sx) { return (sx - X_ST) / (X_BW - X_ST) * W; }
    function deckY(u) { return yOf(deckZ(X_ST + (u / W) * LEN)); }

    g.fillStyle = C_HULL; g.fillRect(0, 0, W, H);

    /* plate patchwork - adjacent strakes never weather to the same tone */
    for (i = 0; i < 130; i++) {
      g.globalAlpha = 0.035 + R() * 0.055;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H * 0.72, 30 + R() * 170, 8 + R() * 26);
    }
    g.globalAlpha = 1;

    /* horizontal strakes: a seam every 0.85 m of height, with the light
       catching the plate edge just above each one */
    var zs;
    for (zs = 2.85; zs > -2.0; zs -= 0.85) {
      y = yOf(zs);
      g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.11)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(0, y - 1.8); g.lineTo(W, y - 1.8); g.stroke();
    }
    /* vertical butt seams every 1.5 m of length */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1.1;
    for (i = 1; i < 26; i++) {
      x = i * W / 26;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke();
    }

    /* the sheer: a dark rubbing strake tracked along the real deck line, and
       a lighter deck edge above it */
    g.lineWidth = 3.2; g.strokeStyle = "rgba(0,0,0,0.40)";
    g.beginPath();
    for (i = 0; i <= 64; i++) { x = i * W / 64; if (i) g.lineTo(x, deckY(x) + 5); else g.moveTo(x, deckY(x) + 5); }
    g.stroke();
    g.lineWidth = 1.4; g.strokeStyle = "rgba(214,224,230,0.09)";
    g.beginPath();
    for (i = 0; i <= 64; i++) { x = i * W / 64; if (i) g.lineTo(x, deckY(x) + 1.4); else g.moveTo(x, deckY(x) + 1.4); }
    g.stroke();

    /* freeing ports along the low midships run, each weeping rust downward */
    for (i = 0; i < 16; i++) {
      x = 90 + i * 42 + R() * 12;
      y = deckY(x) + 12 + R() * 8;
      g.fillStyle = "rgba(10,12,14,0.55)";
      g.fillRect(x, y, 9 + R() * 5, 4);
    }
    g.globalAlpha = 1;
    for (i = 0; i < 130; i++) {
      x = R() * W;
      y = deckY(x) + 10 + R() * 26;
      var len = 22 + R() * 74;
      var grd = g.createLinearGradient(0, y, 0, y + len);
      grd.addColorStop(0, "rgba(96,60,34,0.20)");
      grd.addColorStop(1, "rgba(118,70,36,0.0)");
      g.fillStyle = grd;
      g.fillRect(x, y, 1.3 + R() * 2.6, len);
    }

    /* exhaust staining: no funnel on an Osa, the diesels vent through the
       quarters, so the smut lies on the topsides abaft the engine room */
    for (i = 0; i < 3; i++) {
      var ex = uOf(-13.0 + i * 2.4), ey = yOf(0.95);
      var sg = g.createRadialGradient(ex, ey, 2, ex, ey, 46);
      sg.addColorStop(0, "rgba(18,18,18,0.42)");
      sg.addColorStop(1, "rgba(18,18,18,0.0)");
      g.fillStyle = sg;
      g.fillRect(ex - 50, ey - 34, 100, 74);
    }

    /* hawse pipe and its long anchor stain */
    var hx = uOf(16.4), hy = deckY(uOf(16.4)) + 16;
    g.fillStyle = "rgba(8,10,12,0.72)";
    g.beginPath(); g.ellipse(hx, hy, 7, 5, 0, 0, 6.2832); g.fill();
    var ag = g.createLinearGradient(0, hy, 0, hy + 62);
    ag.addColorStop(0, "rgba(106,64,34,0.34)");
    ag.addColorStop(1, "rgba(126,74,38,0.0)");
    g.fillStyle = ag; g.fillRect(hx - 6, hy, 13, 62);

    /* boot topping, then anti-fouling under it */
    g.fillStyle = C_BOOT;
    g.fillRect(0, yOf(0.44), W, yOf(-0.06) - yOf(0.44));
    g.fillStyle = C_FOUL;
    g.fillRect(0, yOf(-0.06), W, H - yOf(-0.06));
    g.globalAlpha = 0.20;
    for (i = 0; i < 70; i++) {
      g.fillStyle = R() < 0.5 ? "#000000" : "#6a5148";
      g.fillRect(R() * W, yOf(-0.10) + R() * 90, 24 + R() * 90, 6 + R() * 20);
    }
    g.globalAlpha = 1;
    /* draught marks, forward and aft */
    g.fillStyle = "rgba(226,232,236,0.55)"; g.font = "bold 13px Arial";
    for (i = 0; i < 5; i++) {
      g.fillText("" + (10 + i * 2), uOf(17.0), yOf(-0.30 + i * 0.34));
      g.fillText("" + (10 + i * 2), uOf(-18.2), yOf(-0.30 + i * 0.34));
    }

    /* a short team flash on each quarter, for the stern-on view. The pennant
       number itself is NOT painted here - see pennantTex. */
    g.save();
    g.fillStyle = hex(team === undefined ? 0xc8d2d8 : team);
    g.globalAlpha = 0.92;
    g.fillRect(uOf(-18.7), yOf(1.05), 42, 9);
    g.globalAlpha = 1;
    g.restore();

    TEX[key] = finish(THREE, cv, true);
    return TEX[key];
  }

  /* One plate per side. The port copy is drawn mirrored so that, seen from
     outside, both bows read "421" the right way round. */
  function pennantTex(THREE, team, mirror) {
    var key = "pen_" + (team >>> 0) + "_" + (mirror ? 1 : 0);
    if (TEX[key]) return TEX[key];
    var W = 256, H = 128, cv = cvs(W, H), g = cv.getContext("2d");
    g.clearRect(0, 0, W, H);
    g.save();
    if (mirror) { g.translate(W, 0); g.scale(-1, 1); }
    g.font = "bold 86px Arial";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.lineWidth = 7;
    g.strokeStyle = "rgba(10,12,14,0.80)";
    g.strokeText("421", W * 0.5, H * 0.52);
    g.fillStyle = hex(team === undefined ? 0xc8d2d8 : team);
    g.fillText("421", W * 0.5, H * 0.52);
    g.restore();
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t;
    return t;
  }

  function supTex(THREE) {
    if (TEX.sup) return TEX.sup;
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(3319), i;
    g.fillStyle = C_SUP; g.fillRect(0, 0, W, H);
    for (i = 0; i < 60; i++) {
      g.globalAlpha = 0.035 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 130, 20 + R() * 90);
    }
    g.globalAlpha = 1;
    /* plate seams */
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.5;
    for (i = 1; i < 7; i++) {
      g.beginPath(); g.moveTo(0, i * H / 7); g.lineTo(W, i * H / 7); g.stroke();
      g.beginPath(); g.moveTo(i * W / 7, 0); g.lineTo(i * W / 7, H); g.stroke();
    }
    g.strokeStyle = "rgba(230,238,242,0.10)"; g.lineWidth = 1;
    for (i = 1; i < 7; i++) {
      g.beginPath(); g.moveTo(0, i * H / 7 - 2); g.lineTo(W, i * H / 7 - 2); g.stroke();
    }
    /* watertight doors and scuttles, small enough to belong in the texture */
    for (i = 0; i < 7; i++) {
      var dx = 30 + R() * (W - 100), dy = 40 + R() * (H - 150);
      g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 2.4;
      g.strokeRect(dx, dy, 34, 62);
      g.fillStyle = "rgba(255,255,255,0.05)"; g.fillRect(dx, dy, 34, 62);
      g.fillStyle = "rgba(0,0,0,0.30)"; g.fillRect(dx + 27, dy + 28, 4, 8);
    }
    for (i = 0; i < 24; i++) {
      g.fillStyle = "rgba(0,0,0,0.34)";
      g.beginPath(); g.arc(R() * W, R() * H, 3 + R() * 2.6, 0, 6.2832); g.fill();
      g.strokeStyle = "rgba(220,228,232,0.14)"; g.lineWidth = 1;
      g.stroke();
    }
    /* rust weeping down from the fittings */
    for (i = 0; i < 40; i++) {
      var rx = R() * W, ry = R() * H * 0.8, rl = 16 + R() * 60;
      var gr = g.createLinearGradient(0, ry, 0, ry + rl);
      gr.addColorStop(0, "rgba(112,66,34,0.26)");
      gr.addColorStop(1, "rgba(112,66,34,0.0)");
      g.fillStyle = gr; g.fillRect(rx, ry, 1.6 + R() * 3, rl);
    }
    TEX.sup = finish(THREE, cv, false);
    return TEX.sup;
  }

  function canTex(THREE) {
    if (TEX.can) return TEX.can;
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(5281), i;
    g.fillStyle = C_SUP; g.fillRect(0, 0, W, H);
    for (i = 0; i < 34; i++) {
      g.globalAlpha = 0.04 + R() * 0.05;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 120, 12 + R() * 40);
    }
    g.globalAlpha = 1;
    /* longitudinal panel seams run the length of the box */
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.6;
    for (i = 1; i < 8; i++) {
      g.beginPath(); g.moveTo(0, i * H / 8); g.lineTo(W, i * H / 8); g.stroke();
    }
    g.strokeStyle = "rgba(228,236,240,0.10)"; g.lineWidth = 1;
    for (i = 1; i < 8; i++) {
      g.beginPath(); g.moveTo(0, i * H / 8 - 2); g.lineTo(W, i * H / 8 - 2); g.stroke();
    }
    /* transverse strapping bands, the way a launch canister is banded */
    for (i = 1; i < 7; i++) {
      var bx = i * W / 7;
      g.fillStyle = "rgba(255,255,255,0.07)"; g.fillRect(bx - 5, 0, 10, H);
      g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(bx - 5, 0); g.lineTo(bx - 5, H); g.stroke();
      g.beginPath(); g.moveTo(bx + 5, 0); g.lineTo(bx + 5, H); g.stroke();
    }
    /* a warning stripe near the muzzle end and some honest grime */
    g.fillStyle = "rgba(28,32,36,0.55)"; g.fillRect(W - 26, 0, 8, H);
    for (i = 0; i < 26; i++) {
      var sx = R() * W, sy = R() * H, sl = 10 + R() * 34;
      var gr = g.createLinearGradient(0, sy, 0, sy + sl);
      gr.addColorStop(0, "rgba(92,58,32,0.20)");
      gr.addColorStop(1, "rgba(92,58,32,0.0)");
      g.fillStyle = gr; g.fillRect(sx, sy, 1.4 + R() * 2.4, sl);
    }
    TEX.can = finish(THREE, cv, false);
    return TEX.can;
  }

  function deckTex(THREE) {
    if (TEX.deck) return TEX.deck;
    var W = 512, H = 512, cv = cvs(W, H), g = cv.getContext("2d"), R = rng(7717), i;
    g.fillStyle = C_DECK; g.fillRect(0, 0, W, H);
    for (i = 0; i < 44; i++) {
      g.globalAlpha = 0.05 + R() * 0.06;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 150, 26 + R() * 110);
    }
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 2;
    for (i = 1; i < 9; i++) {
      g.beginPath(); g.moveTo(0, i * H / 9); g.lineTo(W, i * H / 9); g.stroke();
      g.beginPath(); g.moveTo(i * W / 9, 0); g.lineTo(i * W / 9, H); g.stroke();
    }
    /* hatches and deck rings */
    for (i = 0; i < 6; i++) {
      var hxp = 40 + R() * (W - 140), hyp = 40 + R() * (H - 140);
      g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 3;
      g.strokeRect(hxp, hyp, 54, 40);
      g.fillStyle = "rgba(255,255,255,0.045)"; g.fillRect(hxp, hyp, 54, 40);
    }
    /* non-skid grit */
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 2600; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 0.16; g.fillStyle = "#c8d2d8";
    for (i = 0; i < 900; i++) g.fillRect(R() * W, R() * H, 1.5, 1.5);
    g.globalAlpha = 1;
    TEX.deck = finish(THREE, cv, false);
    return TEX.deck;
  }

  /* ============================================================= materials
     Exactly three tiers. SKIN carries a canvas and sits at roughness 0.86
     with almost no metalness; METAL is untextured and mid-rough; GLASS is a
     physical material. Nothing else exists in this file.                  */
  function mats(THREE, team) {
    var ht = hullTex(THREE, team), st = supTex(THREE), dt = deckTex(THREE);
    var supRep = st.clone();
    supRep.wrapS = supRep.wrapT = THREE.RepeatWrapping;
    supRep.repeat.set(1.6, 1.6);
    if (THREE.sRGBEncoding !== undefined) supRep.encoding = THREE.sRGBEncoding;
    supRep.needsUpdate = true;

    var slabRep = st.clone();
    slabRep.wrapS = slabRep.wrapT = THREE.RepeatWrapping;
    slabRep.repeat.set(0.30, 0.30);
    if (THREE.sRGBEncoding !== undefined) slabRep.encoding = THREE.sRGBEncoding;
    slabRep.needsUpdate = true;

    var canRep = canTex(THREE);

    var deckRep = dt.clone();
    deckRep.wrapS = deckRep.wrapT = THREE.RepeatWrapping;
    deckRep.repeat.set(9, 2);
    if (THREE.sRGBEncoding !== undefined) deckRep.encoding = THREE.sRGBEncoding;
    deckRep.needsUpdate = true;

    return {
      hull: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.87, metalness: 0.06, map: ht }),
      sup:  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.07, map: supRep }),
      can:  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.09, map: canRep }),
      slab: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.07, map: slabRep }),
      deck: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0.05, map: deckRep }),
      metal: new THREE.MeshStandardMaterial({ color: 0x878e94, roughness: 0.55, metalness: 0.48 }),
      dkmetal: new THREE.MeshStandardMaterial({ color: 0x4e5459, roughness: 0.47, metalness: 0.60 }),
      brass: new THREE.MeshStandardMaterial({ color: 0x8a7346, roughness: 0.50, metalness: 0.62 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x1d2a33, roughness: 0.10, metalness: 0.0,
        transparent: true, opacity: 0.84
      }),
      penP: new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: 0.84, metalness: 0.06,
        map: pennantTex(THREE, team, false), alphaTest: 0.5
      }),
      penS: new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: 0.84, metalness: 0.06,
        map: pennantTex(THREE, team, true), alphaTest: 0.5
      }),
      team: new THREE.MeshStandardMaterial({
        color: (team === undefined ? 0xc8d2d8 : team), roughness: 0.62, metalness: 0.10
      })
    };
  }

  /* ============================================================== geometry */

  /* M.loft winds its triangles inward, so a single-sided material shows you
     the inside of the far wall. Flip and renormalise; warship3d.js does the
     same thing for the same reason. */
  function loftMesh(THREE, M, S, segs, mtl, hullUV) {
    var g = M.loft(THREE, S, segs);
    var idx = g.getIndex();
    if (idx) {
      var a = idx.array;
      for (var i = 0; i < a.length; i += 3) { var t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
      idx.needsUpdate = true;
    }
    if (hullUV) {
      var p = g.getAttribute("position"), uv = g.getAttribute("uv");
      for (var j = 0; j < p.count; j++) {
        uv.setXY(j, (p.getX(j) - X_ST) / (X_BW - X_ST),
                    (p.getZ(j) - Z_TB) / (Z_TT - Z_TB));
      }
      uv.needsUpdate = true;
    }
    g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  function box(THREE, lx, ly, lz, mtl, x, y, z) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }

  /* a four-sided cylinder is a box whose top face scales independently:
     every deckhouse and pedestal gets its inward-sloping sides for free */
  function tbox(THREE, lx, ly, lz, top, mtl, x, y, z) {
    var g = new THREE.CylinderGeometry(top === undefined ? 1 : top, 1, lz, 4, 1);
    g.rotateX(PI / 2); g.rotateZ(PI / 4);
    g.scale(lx * 0.70710678, ly * 0.70710678, 1);
    g = g.toNonIndexed(); g.computeVertexNormals();
    var m = new THREE.Mesh(g, mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }

  function cylZ(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var g = new THREE.CylinderGeometry(r1, r2, h, seg || 12, 1);
    g.rotateX(PI / 2);
    var m = new THREE.Mesh(g, mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }
  function cylX(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var g = new THREE.CylinderGeometry(r1, r2, h, seg || 12, 1);
    g.rotateZ(-PI / 2);
    var m = new THREE.Mesh(g, mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }
  function cylY(THREE, r1, r2, h, seg, mtl, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg || 12, 1), mtl);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }

  /* a cylinder stretched between two points: braces, yards, guardrail wires */
  function strut(THREE, mtl, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az;
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return new THREE.Object3D();
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1), mtl);
    m.position.set((ax + bx) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
                                    new THREE.Vector3(dx, dy, dz).normalize());
    return m;
  }

  /* ---------------------------------------------------------------- hull */
  function buildHull(THREE, M, g, P) {
    var TOP = [], LOW = [], i, s, bot;

    /* flat transom cap: a zero-length section closes the tube */
    s = STA[0]; bot = topBot(s[3]);
    TOP.push({ x: s[0] - 0.06, w: 0.004, h: 0.004, zc: (s[2] + bot) * 0.5, sq: 1 });
    LOW.push({ x: s[0] - 0.06, w: 0.004, h: 0.004, zc: (s[2] + s[3]) * 0.5, sq: 1 });

    for (i = 0; i < STA.length; i++) {
      s = STA[i]; bot = topBot(s[3]);
      TOP.push({ x: s[0], w: s[1] + 0.035, h: (s[2] - bot) * 0.5,
                 zc: (s[2] + bot) * 0.5, sq: s[4] });
      LOW.push({ x: s[0], w: s[1], h: (s[2] - s[3]) * 0.5,
                 zc: (s[2] + s[3]) * 0.5, sq: s[5] });
    }
    s = STA[STA.length - 1]; bot = topBot(s[3]);
    TOP.push({ x: s[0] + 0.06, w: 0.004, h: 0.004, zc: (s[2] + bot) * 0.5, sq: 1 });
    LOW.push({ x: s[0] + 0.06, w: 0.004, h: 0.004, zc: (s[2] + s[3]) * 0.5, sq: 1 });

    g.add(loftMesh(THREE, M, LOW, 26, P.hull, true));
    g.add(loftMesh(THREE, M, TOP, 38, P.hull, true));

    /* main deck: a cambered ribbon lying exactly on the hull crown */
    var kys = [-0.94, -0.72, -0.42, 0, 0.42, 0.72, 0.94];
    var pos = [], uv = [], idx = [], j;
    var XS = [];
    for (i = 0; i < STA.length; i++) XS.push(STA[i][0]);
    for (i = 0; i < XS.length; i++) {
      for (j = 0; j < kys.length; j++) {
        var x = XS[i], ky = kys[j];
        pos.push(x, edgeY(x, ky), crownZ(x, ky) + 0.035);
        uv.push((x - X_ST) / LEN, (ky + 1) * 0.5);
      }
    }
    var ring = kys.length;
    for (i = 0; i < XS.length - 1; i++) for (j = 0; j < ring - 1; j++) {
      var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    var dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    dg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    dg.setIndex(idx);
    dg.computeVertexNormals();
    g.add(new THREE.Mesh(dg, P.deck));

    /* transom plate and the two quarter exhaust ports */
    var ts = STA[0];
    g.add(tbox(THREE, 0.18, ts[1] * 1.86, ts[2] - ts[3] - 0.10, 0.98, P.hull,
               -19.52, 0, (ts[2] + ts[3]) * 0.5));
    for (i = -1; i <= 1; i += 2) {
      g.add(box(THREE, 0.14, 0.62, 0.44, P.dkmetal, -19.60, i * 1.55, 0.62));
    }
  }

  /* ------------------------------------------------- shafts, screws, rudders
     Three shafts on an Osa. They only show at low angles but the boat looks
     amputated without them, and they cost almost nothing. */
  function buildRunningGear(THREE, g, P) {
    var i, k, sy = [-2.05, 0, 2.05];
    for (i = 0; i < 3; i++) {
      var y = sy[i];
      var x0 = -16.6, x1 = -19.9, z0 = -1.42, z1 = -1.62;
      g.add(strut(THREE, P.dkmetal, x0, y, z0, x1, y, z1, 0.085, 8));
      /* A-bracket */
      g.add(strut(THREE, P.metal, x0 + 0.9, y, z0 + 0.05, x0 + 1.15, y - 0.42, -0.95, 0.055, 5));
      g.add(strut(THREE, P.metal, x0 + 0.9, y, z0 + 0.05, x0 + 1.15, y + 0.42, -0.95, 0.055, 5));
      /* boss and three blades */
      g.add(cylX(THREE, 0.16, 0.10, 0.34, 10, P.brass, x1 - 0.12, y, z1 - 0.01));
      for (k = 0; k < 3; k++) {
        var a = k * 2.0944 + i;
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.30, 0.52), P.brass);
        bl.position.set(x1 - 0.10, y + Math.cos(a) * 0.30, z1 - 0.01 + Math.sin(a) * 0.30);
        bl.rotation.x = a;
        bl.rotation.y = 0.35;
        g.add(bl);
      }
    }
    for (i = -1; i <= 1; i += 2) {
      g.add(box(THREE, 0.95, 0.10, 0.90, P.dkmetal, -19.35, i * 1.15, -1.12));
      g.add(cylZ(THREE, 0.07, 0.07, 0.55, 8, P.metal, -19.35, i * 1.15, -0.55));
    }
  }

  /* -------------------------------------------------------- superstructure
     One continuous low casing running from under the after containers all
     the way forward, stepping up into the pilothouse. On the real boat the
     containers sit ON this casing and overhang it, which is why the after
     deck reads as solid launcher from any angle.                          */
  function buildSuper(THREE, M, g, P) {
    var i;

    /* after casing, between and under the after pair of containers */
    g.add(tbox(THREE, 7.90, 3.30, 1.78, 0.93, P.sup, -10.30, 0, 2.43));
    /* midships casing */
    g.add(tbox(THREE, 4.80, 3.46, 1.78, 0.93, P.sup, -4.25, 0, 2.49));
    /* forward casing, under the forward pair */
    g.add(tbox(THREE, 4.70, 3.62, 1.66, 0.93, P.sup, -0.05, 0, 2.60));
    /* bridge base */
    g.add(tbox(THREE, 6.40, 3.86, 1.52, 0.95, P.sup, 4.95, 0, 2.71));

    /* pilothouse: profile drawn in x-z with the front face raked aft, then
       extruded across. This is the shape the side view lives or dies on. */
    var pts = [
      [2.30, 3.40], [7.30, 3.40], [7.44, 4.06], [7.06, 5.12], [2.30, 5.12]
    ];
    var ph = new THREE.Mesh(M.slab(THREE, pts, 3.72, "xz"), P.slab);
    ph.position.y = 1.86;
    g.add(ph);
    /* a narrower cap course so the block is not a plain brick */
    g.add(tbox(THREE, 4.60, 3.46, 0.16, 0.92, P.sup, 4.60, 0, 5.20));

    /* bridge windows: the raked front face, then three each side */
    var rake = Math.atan2(0.38, 1.06);          /* 19.7 deg off vertical    */
    for (i = -1; i <= 1; i += 2) {
      var w1 = box(THREE, 0.09, 0.80, 0.62, P.glass, 7.32, i * 0.52, 4.62);
      w1.rotation.y = -rake; g.add(w1);
      var w2 = box(THREE, 0.09, 0.74, 0.60, P.glass, 7.27, i * 1.42, 4.62);
      w2.rotation.y = -rake; g.add(w2);
    }
    for (i = -1; i <= 1; i += 2) {
      g.add(box(THREE, 0.86, 0.09, 0.58, P.glass, 6.35, i * 1.87, 4.66));
      g.add(box(THREE, 0.86, 0.09, 0.58, P.glass, 5.25, i * 1.87, 4.66));
      g.add(box(THREE, 0.72, 0.09, 0.52, P.glass, 4.15, i * 1.87, 4.66));
      /* scuttle band on the lower level */
      g.add(box(THREE, 0.50, 0.08, 0.34, P.glass, 6.30, i * 1.94, 3.86));
      g.add(box(THREE, 0.50, 0.08, 0.34, P.glass, 5.30, i * 1.94, 3.86));
    }

    /* bridge wing overhang and the nav-light boards on it */
    for (i = -1; i <= 1; i += 2) {
      g.add(box(THREE, 1.50, 0.42, 0.11, P.sup, 6.45, i * 2.05, 5.06));
      g.add(box(THREE, 0.26, 0.16, 0.34, P.metal, 6.60, i * 2.18, 5.30));
    }

    /* charthouse box on the bridge roof, and two vents */
    g.add(tbox(THREE, 1.90, 2.20, 0.62, 0.88, P.sup, 3.30, 0, 5.43));
    for (i = -1; i <= 1; i += 2) {
      g.add(cylZ(THREE, 0.22, 0.22, 0.50, 10, P.sup, 2.20, i * 1.10, 5.37));
      g.add(cylZ(THREE, 0.26, 0.26, 0.10, 10, P.metal, 2.20, i * 1.10, 5.64));
    }

    /* deck lockers, ventilators and liferaft canisters on the casing sides,
       which is what fills the gap between the two pairs of containers */
    for (i = -1; i <= 1; i += 2) {
      g.add(cylX(THREE, 0.34, 0.34, 1.25, 12, P.sup, -4.40, i * 1.92, 3.55));
      g.add(box(THREE, 1.20, 0.16, 0.11, P.dkmetal, -4.40, i * 1.92, 3.18));
      g.add(box(THREE, 0.90, 0.70, 0.55, P.sup, -6.60, i * 1.30, 3.66));
      g.add(cylZ(THREE, 0.24, 0.24, 0.55, 10, P.sup, -8.40, i * 1.24, 3.60));
      g.add(cylZ(THREE, 0.28, 0.28, 0.10, 10, P.metal, -8.40, i * 1.24, 3.90));
    }
    /* engine-room air intakes down the middle of the after casing */
    for (i = 0; i < 3; i++) {
      g.add(box(THREE, 1.05, 1.70, 0.42, P.sup, -12.20 + i * 2.05, 0, 3.53));
    }
  }

  /* ------------------------------------------------------------ AK-230 mount
     A low rounded drum with a domed top and two short barrels - nothing like
     a gun house. Origin sits on the deck at the mount's own vertical axis so
     that rotating the group trains it about its own centre.               */
  function gunMount(THREE, P) {
    var g = new THREE.Group(), i;
    g.add(cylZ(THREE, 0.94, 0.99, 0.24, 20, P.sup, 0, 0, 0.12));
    g.add(cylZ(THREE, 0.62, 0.88, 0.70, 20, P.sup, 0, 0, 0.60));
    var dome = new THREE.SphereGeometry(0.62, 20, 6, 0, PI * 2, 0, PI * 0.5);
    dome.rotateX(PI / 2); dome.scale(1, 1, 0.62);
    var dm = new THREE.Mesh(dome, P.sup);
    dm.position.set(0, 0, 0.95); g.add(dm);
    /* sloped front plate with the two barrel ports */
    var fp = box(THREE, 0.26, 1.02, 0.66, P.sup, 0.62, 0, 0.72);
    fp.rotation.y = -0.22; g.add(fp);
    for (i = -1; i <= 1; i += 2) {
      g.add(cylX(THREE, 0.075, 0.082, 1.55, 10, P.dkmetal, 1.42, i * 0.24, 0.80));
      g.add(cylX(THREE, 0.100, 0.100, 0.14, 10, P.metal, 2.14, i * 0.24, 0.80));
      g.add(box(THREE, 0.10, 0.20, 0.24, P.dkmetal, 0.72, i * 0.24, 0.80));
      /* spent-case chutes down the flanks */
      g.add(box(THREE, 0.70, 0.14, 0.20, P.metal, -0.10, i * 0.80, 0.42));
    }
    /* sight blister and the small vane on the crown */
    g.add(box(THREE, 0.34, 0.26, 0.20, P.metal, 0.42, 0, 1.20));
    return g;
  }

  /* ------------------------------------------------ SS-N-2 Styx launcher
     The whole reason this model exists. A tapered hangar box, muzzle end
     forward and BIG, tail end small; elevated about twelve degrees and
     splayed outboard, so the four of them fill the after deck.            */
  function launcher(THREE, M, P) {
    var g = new THREE.Group(), i;
    var S = [
      { x: -3.62, w: 0.004, h: 0.004, zc: -0.02, sq: 1.00 },
      { x: -3.55, w: 0.52,  h: 0.56,  zc: -0.02, sq: 0.30 },
      { x: -2.55, w: 0.63,  h: 0.67,  zc:  0.00, sq: 0.28 },
      { x: -0.60, w: 0.78,  h: 0.81,  zc:  0.02, sq: 0.26 },
      { x:  1.60, w: 0.86,  h: 0.90,  zc:  0.03, sq: 0.25 },
      { x:  3.10, w: 0.90,  h: 0.95,  zc:  0.03, sq: 0.24 },
      { x:  3.55, w: 0.90,  h: 0.95,  zc:  0.03, sq: 0.24 },
      { x:  3.62, w: 0.004, h: 0.004, zc:  0.03, sq: 1.00 }
    ];
    g.add(loftMesh(THREE, M, S, 22, P.can, false));

    /* the open muzzle: a dark recessed frame with the missile nose in it */
    g.add(box(THREE, 0.10, 1.56, 1.66, P.dkmetal, 3.64, 0, 0.03));
    g.add(box(THREE, 0.05, 1.28, 1.38, P.dkmetal, 3.71, 0, 0.03));
    g.add(cylX(THREE, 0.05, 0.31, 0.92, 12, P.metal, 4.16, 0, 0.03));
    g.add(cylX(THREE, 0.31, 0.31, 0.30, 12, P.metal, 3.72, 0, 0.03));
    /* the missile's clipped delta wing roots, just visible in the opening */
    for (i = -1; i <= 1; i += 2) {
      var wg = box(THREE, 0.34, 0.04, 0.22, P.dkmetal, 3.78, i * 0.20, -0.10);
      wg.rotation.x = i * 0.5;
      g.add(wg);
    }

    /* longitudinal spine and the lifting/latch fittings along the top */
    g.add(tbox(THREE, 6.40, 0.44, 0.18, 0.80, P.can, 0.30, 0, 0.92));
    for (i = 0; i < 3; i++) {
      g.add(box(THREE, 0.24, 1.30, 0.14, P.metal, -2.10 + i * 2.10, 0, 0.88));
    }
    /* skirt down each side so the box does not read as a floating slab */
    for (i = -1; i <= 1; i += 2) {
      g.add(box(THREE, 5.60, 0.10, 0.26, P.can, 0.20, i * 0.78, -0.72));
    }
    /* blast deflector plate on the tail */
    g.add(box(THREE, 0.14, 1.05, 1.10, P.can, -3.62, 0, -0.02));
    return g;
  }

  /* ----------------------------------------------------------------- mast
     Short plated pole, raked slightly aft, with a yard of ECM cans and a
     small drum radar at the truck. */
  function buildMast(THREE, g, P) {
    var m = new THREE.Group(), i;
    m.position.set(1.75, 0, 3.40);
    m.rotation.y = -0.075;

    m.add(cylZ(THREE, 0.20, 0.36, 3.10, 10, P.sup, 0, 0, 1.55));
    m.add(cylZ(THREE, 0.13, 0.20, 4.20, 10, P.metal, 0, 0, 4.75));
    /* two struts down to the bridge roof - the mast is a tripod at the foot */
    m.add(strut(THREE, P.metal, 0, 0, 1.30, 0.95, -1.35, 0.05, 0.065, 5));
    m.add(strut(THREE, P.metal, 0, 0, 1.30, 0.95, 1.35, 0.05, 0.065, 5));

    /* signal platform */
    m.add(box(THREE, 1.10, 1.90, 0.10, P.metal, 0.10, 0, 3.15));
    /* lower yard with four ECM / IFF cans */
    m.add(strut(THREE, P.metal, 0, -2.05, 4.05, 0, 2.05, 4.05, 0.055, 5));
    for (i = -1; i <= 1; i += 2) {
      m.add(strut(THREE, P.metal, 0, i * 2.02, 4.05, 0, i * 0.30, 3.10, 0.042, 4));
      m.add(cylZ(THREE, 0.17, 0.17, 0.52, 10, P.metal, 0, i * 0.95, 4.30));
      m.add(cylZ(THREE, 0.17, 0.17, 0.52, 10, P.metal, 0, i * 1.72, 4.30));
      m.add(box(THREE, 0.10, 0.62, 0.30, P.metal, 0.28, i * 1.35, 4.34));
    }
    /* upper yard, shorter */
    m.add(strut(THREE, P.metal, 0, -1.25, 5.55, 0, 1.25, 5.55, 0.045, 5));
    for (i = -1; i <= 1; i += 2) {
      m.add(cylZ(THREE, 0.12, 0.12, 0.36, 8, P.metal, 0, i * 1.05, 5.72));
    }

    /* masthead: pedestal, then the small drum radar lying athwartships */
    m.add(cylZ(THREE, 0.24, 0.24, 0.44, 10, P.metal, 0, 0, 6.80));
    m.add(box(THREE, 0.50, 0.90, 0.30, P.dkmetal, 0, 0, 7.14));
    var drum = new THREE.Group();
    drum.position.set(0, 0, 7.50);
    drum.rotation.x = 0.16;
    drum.add(cylY(THREE, 0.43, 0.43, 1.32, 16, P.metal, 0, 0, 0));
    drum.add(box(THREE, 0.10, 1.36, 0.86, P.dkmetal, 0.34, 0, 0));
    drum.add(cylY(THREE, 0.14, 0.14, 1.60, 8, P.metal, 0, 0, 0));
    m.add(drum);
    /* truck whip */
    m.add(cylZ(THREE, 0.020, 0.045, 1.30, 6, P.metal, 0, 0, 8.60));
    g.add(m);
  }

  /* ------------------------------------------- Drum Tilt radome, aft pedestal */
  function buildAftRadar(THREE, g, P) {
    var i;
    g.add(tbox(THREE, 1.70, 1.60, 2.05, 0.84, P.sup, -11.60, 0, 4.32));
    g.add(box(THREE, 2.35, 2.25, 0.11, P.metal, -11.60, 0, 5.40));
    g.add(tbox(THREE, 1.10, 1.10, 0.62, 0.90, P.sup, -11.60, 0, 5.76));
    var dome = new THREE.SphereGeometry(0.64, 18, 12);
    dome.scale(1.02, 1.02, 0.94);
    var dm = new THREE.Mesh(dome, P.sup);
    dm.position.set(-11.60, 0, 6.52);
    g.add(dm);
    for (i = -1; i <= 1; i += 2) {
      g.add(cylY(THREE, 0.10, 0.10, 0.24, 8, P.metal, -11.60, i * 0.72, 6.40));
    }
    /* ladder up the pedestal front */
    for (i = 0; i < 6; i++) {
      g.add(cylY(THREE, 0.026, 0.026, 0.40, 4, P.metal, -10.78, 0, 3.55 + i * 0.30));
    }
    g.add(strut(THREE, P.metal, -10.78, -0.20, 3.40, -10.78, -0.20, 5.40, 0.030, 4));
    g.add(strut(THREE, P.metal, -10.78, 0.20, 3.40, -10.78, 0.20, 5.40, 0.030, 4));
  }

  /* ------------------------------------------------------------- railings
     A warship without railings does not read as a warship. Stanchion and
     two-wire runs, only where the real boat has open deck: the bow, the
     quarterdeck, and around the elevated platforms.                       */
  function railRun(THREE, g, P, pts, h) {
    var i, k;
    var sg = new THREE.CylinderGeometry(0.028, 0.028, h, 5, 1);
    sg.rotateX(PI / 2);
    for (i = 0; i < pts.length; i++) {
      var s = new THREE.Mesh(sg, P.metal);
      s.position.set(pts[i][0], pts[i][1], pts[i][2] + h * 0.5);
      g.add(s);
    }
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      for (k = 1; k <= 2; k++) {
        var f = k / 2;
        g.add(strut(THREE, P.metal, a[0], a[1], a[2] + h * f,
                                    b[0], b[1], b[2] + h * f, 0.018, 4));
      }
    }
  }

  function buildRails(THREE, g, P) {
    var i, s, pts;
    /* forecastle, both sides, following the sheer out to the stemhead */
    for (s = -1; s <= 1; s += 2) {
      pts = [];
      for (i = 0; i <= 9; i++) {
        var x = 7.90 + i * (18.60 - 7.90) / 9;
        var ky = 0.93;
        pts.push([x, s * edgeY(x, ky), crownZ(x, ky) + 0.03]);
      }
      railRun(THREE, g, P, pts, 0.92);
    }
    /* the two runs meet at the stemhead */
    g.add(strut(THREE, P.metal, 18.60, -edgeY(18.60, 0.93), crownZ(18.60, 0.93) + 0.95,
                                19.30, 0, deckZ(19.30) + 0.80, 0.018, 4));
    g.add(strut(THREE, P.metal, 18.60, edgeY(18.60, 0.93), crownZ(18.60, 0.93) + 0.95,
                                19.30, 0, deckZ(19.30) + 0.80, 0.018, 4));
    g.add(cylZ(THREE, 0.030, 0.030, 0.86, 5, P.metal, 19.30, 0, deckZ(19.30) + 0.43));

    /* quarterdeck */
    for (s = -1; s <= 1; s += 2) {
      pts = [];
      for (i = 0; i <= 5; i++) {
        var qx = -19.20 + i * (-14.60 + 19.20) / 5;
        pts.push([qx, s * edgeY(qx, 0.93), crownZ(qx, 0.93) + 0.03]);
      }
      railRun(THREE, g, P, pts, 0.88);
    }
    /* transom rail closing the two quarterdeck runs */
    pts = [];
    for (i = 0; i <= 4; i++) {
      pts.push([-19.28, -edgeY(-19.20, 0.90) + i * edgeY(-19.20, 0.90) * 2 / 4,
                crownZ(-19.20, 0.55) + 0.03]);
    }
    railRun(THREE, g, P, pts, 0.88);

    /* bridge roof */
    pts = [];
    for (i = 0; i <= 4; i++) pts.push([6.80 - i * 1.05, -1.80, 5.14]);
    for (i = 1; i <= 3; i++) pts.push([2.60, -1.80 + i * 1.20, 5.14]);
    for (i = 1; i <= 4; i++) pts.push([2.60 + i * 1.05, 1.80, 5.14]);
    railRun(THREE, g, P, pts, 0.84);

    /* radome platform */
    pts = [];
    for (i = 0; i <= 3; i++) pts.push([-12.70 + i * 0.73, -1.10, 5.46]);
    for (i = 1; i <= 3; i++) pts.push([-10.51, -1.10 + i * 0.73, 5.46]);
    for (i = 1; i <= 3; i++) pts.push([-10.51 - i * 0.73, 1.10, 5.46]);
    railRun(THREE, g, P, pts, 0.80);

    /* mast signal platform */
    pts = [];
    for (i = 0; i <= 3; i++) pts.push([2.35, -0.90 + i * 0.60, 6.60]);
    for (i = 1; i <= 2; i++) pts.push([2.35 - i * 0.55, 0.90, 6.60]);
    railRun(THREE, g, P, pts, 0.74);
  }

  /* ---------------------------------------------------------- deck fittings
     Only things that change the silhouette. Bollards, cleats and plate lines
     live in the deck texture where they belong.                           */
  function buildFittings(THREE, g, P) {
    var i;

    /* anchor windlass and the stockless anchor stowed in the starboard hawse */
    g.add(tbox(THREE, 1.15, 1.55, 0.34, 0.85, P.sup, 16.10, 0, deckZ(16.10) + 0.20));
    g.add(cylY(THREE, 0.22, 0.22, 1.05, 12, P.dkmetal, 16.10, 0, deckZ(16.10) + 0.46));
    g.add(cylZ(THREE, 0.20, 0.24, 0.42, 10, P.metal, 15.15, 0, deckZ(15.15) + 0.22));
    /* anchor: shank plus a crown of flukes, flat against the bow plating */
    var an = new THREE.Group();
    an.position.set(16.30, -edgeY(16.30, 1.02), crownZ(16.30, 0.985) - 0.42);
    an.rotation.z = 0.24;
    an.add(box(THREE, 1.00, 0.13, 0.15, P.dkmetal, 0, 0, 0));
    an.add(box(THREE, 0.30, 0.17, 0.66, P.dkmetal, -0.44, 0, -0.06));
    an.add(box(THREE, 0.14, 0.15, 0.36, P.dkmetal, 0.48, 0, 0.04));
    g.add(an);

    /* two capstans aft and a cable reel */
    for (i = -1; i <= 1; i += 2) {
      g.add(cylZ(THREE, 0.19, 0.23, 0.40, 10, P.metal, -15.20, i * 1.90, deckZ(-15.2) + 0.20));
    }
    g.add(cylY(THREE, 0.42, 0.42, 0.70, 12, P.metal, -14.10, 0, deckZ(-14.1) + 0.55));
    for (i = -1; i <= 1; i += 2) {
      g.add(cylY(THREE, 0.52, 0.52, 0.07, 12, P.metal, -14.10, i * 0.38, deckZ(-14.1) + 0.55));
    }

    /* two life rings on the casing sides */
    for (i = -1; i <= 1; i += 2) {
      var lr = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.08, 6, 12), P.metal);
      lr.position.set(-7.90, i * 1.78, 3.05);
      lr.rotation.y = PI / 2;
      g.add(lr);
    }

    /* stern whip antennas - cheap, and unmistakably Soviet-pattern */
    for (i = -1; i <= 1; i += 2) {
      g.add(cylZ(THREE, 0.022, 0.055, 4.30, 6, P.metal,
                 -17.90, i * 2.30, deckZ(-17.9) + 2.15));
    }
    /* jackstaff and ensign staff */
    g.add(cylZ(THREE, 0.025, 0.045, 1.60, 6, P.metal, 18.95, 0, deckZ(18.95) + 0.80));
    g.add(cylZ(THREE, 0.025, 0.045, 1.90, 6, P.metal, -19.15, 0, deckZ(-19.15) + 0.95));
  }

  /* ================================================================ build */
  function build(THREE, M, C) {
    var g = new THREE.Group();
    var team = (C && C.team !== undefined) ? C.team : 0xc8d2d8;
    var P = mats(THREE, team);
    var i, s;

    buildHull(THREE, M, g, P);
    buildRunningGear(THREE, g, P);
    buildSuper(THREE, M, g, P);
    buildMast(THREE, g, P);
    buildAftRadar(THREE, g, P);

    /* --- the four Styx containers: elevated 12 deg, splayed 5 deg out --- */
    var LX = [-2.00, -11.20], LZ = [3.45, 3.25], LY = 2.88;
    for (i = 0; i < 2; i++) {
      for (s = -1; s <= 1; s += 2) {
        var L = launcher(THREE, M, P);
        L.position.set(LX[i], s * LY, LZ[i]);
        L.rotation.set(0, -0.212, s * 0.090);
        g.add(L);
        /* the pedestal the tail of the box sits on, built in ship space so
           it stands vertically instead of leaning with the launcher */
        var px = LX[i] - 3.15, pz = LZ[i] - 1.25;
        var base = deckZ(px) + 0.02;
        g.add(tbox(THREE, 1.30, 1.20, pz - base, 0.80, P.sup,
                   px, s * LY, (pz + base) * 0.5));
        g.add(box(THREE, 0.90, 0.90, 0.30, P.metal, LX[i] + 1.20, s * (LY - 0.10), LZ[i] - 0.95));
      }
    }

    /* --- gun mounts: the forward one is the trainable "turret" --- */
    var fwd = gunMount(THREE, P);
    fwd.name = "turret";                 /* render3d.js finds this by name */
    fwd.position.set(10.30, 0, deckZ(10.30) + 0.02);
    g.add(fwd);
    /* raised circular sponson under it */
    g.add(cylZ(THREE, 1.16, 1.20, 0.22, 20, P.deck, 10.30, 0, deckZ(10.30) + 0.02));

    var aft = gunMount(THREE, P);
    aft.position.set(-16.90, 0, deckZ(-16.90) + 0.24);
    aft.rotation.z = PI;                 /* the after mount trains astern  */
    g.add(aft);
    g.add(cylZ(THREE, 1.18, 1.24, 0.26, 20, P.deck, -16.90, 0, deckZ(-16.9) + 0.11));

    buildRails(THREE, g, P);
    buildFittings(THREE, g, P);

    /* --- team colour --------------------------------------------------
       The pennant number on both bows is already painted in the owner's
       colour by hullTex. These add a flash that survives a top-down camera:
       a band across the after casing roof and a chevron on the bridge face. */
    var pn;
    pn = box(THREE, 2.30, 0.04, 0.98, P.penP, 15.05, 2.04, 1.64);
    pn.rotation.z = -0.245; g.add(pn);
    pn = box(THREE, 2.30, 0.04, 0.98, P.penS, 15.05, -2.04, 1.64);
    pn.rotation.z = 0.245; g.add(pn);

    g.add(box(THREE, 0.55, 3.05, 0.06, P.team, -12.90, 0, 3.36));
    g.add(box(THREE, 0.55, 3.05, 0.06, P.team, -8.30, 0, 3.36));
    for (i = -1; i <= 1; i += 2) {
      var fl = box(THREE, 0.09, 0.60, 0.34, P.team, 7.40, i * 1.02, 4.06);
      fl.rotation.y = -0.35;
      g.add(fl);
    }
    return g;
  }

  UNIT_MODELS["kpa_e90_missileboat"] = { len: 39.0, build: build };
})();
