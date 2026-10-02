/* ======= pact_ka27_helix.js - HERO model: Kamov Ka-27PL Helix-A =======
   The anti-submarine helicopter of the Soviet and Russian navies, drawn for
   the two rows that are this aircraft:
     pact_e80_aswhelo  "Ka-27PL Helix"  the Soviet Navy machine, 1981-1991
     asw_helo_p        "Ka-27 Helix"    the Russian Navy machine, 1991 to date
   (pact_e60_aswhelo is the Ka-25PL Hormone, a different airframe, and is
   left to the stand-in it already has.) The two differ only in the national
   marking on the fins - the Soviet red star with a white edge, the Russian
   one with a blue edge round the white - because that is all that differs
   on a Ka-27PL between the two navies; the airframe, the radome and the
   grey paint are the same, as in the photographs.

   Reference. Dimensions from the published Ka-27 data: fuselage 11.30 m,
   two three-blade rotors of 15.90 m turning on one mast 1.40 m apart,
   height 5.40 m to the top of the upper hub (5.45 here, with its cap), main tyres 620 x 180 (the
   marking is legible on the wheel photograph). Stations and shapes from
   Wikimedia Commons photographs of the Ka-27PLs of the destroyers Admiral
   Vinogradov and Admiral Tributs and the cruiser Varyag, taken on deck in
   Manila: "Ka-27 Helicopter Left Side View", "Front View", "Rear", "Rear
   Left Side", "Main Wheel" and "Main Rotor Hub Mechanism" of Admiral
   Vinogradov, "KA-27 Side View" of Admiral Tributs, "The Varyag (011)
   Cruiser's Ka-27 Helicopter", and "Kamov Ka-27-in-2008" for the tail seen
   from below in flight. The two side views are long-lens, so near
   orthographic: scaled on 11.30 m from nose to the fin trailing edge they
   put the rotor mast 4.1 m behind the nose, the fin leading edge 8.9 m and
   its trailing edge 10.7 m behind it, the engine intakes 1.7 m behind it
   and the cowl roof flat as far as 7.5 m, where it falls to the tail cone.

   What the photographs show and the model carries:
     - a short, deep, flat-sided whale of a hull, with the cockpit roof and
       the cabin shoulder level and the engines on top of them;
     - TWO engines (TV3-117V) side by side on the roof, each a round
       forward-facing intake of 0.75 m, and the cowl roof flat to the tail,
       where it falls away steeply onto the boom. Each exhaust is a big
       squared-off oval nozzle, about 0.70 m tall and 0.55 m long, standing
       out of the outer flank 0.8 m ahead of the mast and opening outboard
       and aft, with a black soot panel about 0.9 m long behind it (the
       long-lens port views of "68" and "62");
     - the bort number, two red digits about 0.4 m tall on each cowl flank
       between the intake and the exhaust ("68" on Admiral Tributs, "66"
       and "62" on Admiral Vinogradov); this model carries "68";
     - a steeply raked two-pane windscreen set into the nose round a frame
       post, a window in each cockpit door, a big cabin door on each side
       with its own window and three small cabin windows;
     - the PL's chin search-radar radome, a fat white-grey bulge under the
       nose, as wide as the nose itself;
     - four fixed wheels: a pair of small nose wheels under the cockpit and
       two main wheels on long raked cantilever legs from high on the
       fuselage side, wide of the hull. The tracks are the published Ka-27
       figures: main 3.50 m, nose 1.40 m, wheelbase 3.02 m;
     - NO tail rotor. A short tail cone carries a horizontal stabiliser and
       a big rounded rectangular fin at each tip, leaning slightly outward,
       each with its star; a small ventral fin with a bumper under the boom,
       a dorsal fairing on top of it, a tail-light bullet, and a tube
       bracing each stabiliser half to the cone;
     - two three-blade heads of 0.48 m chord on one mast, the upper one 1.40
       m above the lower, with the swashplate rings and control rods between.
   The STARBOARD cabin side is not the port side: an in-flight photograph of
   a Ka-28, the export PL on the same airframe (Commons, "Protivolodochnyi
   Ka-28, Koktebel, Crimea, September 2015"), shows a rounded door fairing
   over the cabin door, 1.6 m by 0.85 m and about 0.2 m proud, and aft of it
   a squared equipment box 1.2 m by 1.05 m standing 0.3 m off the skin, just
   under the cowl. The port side, in the Admiral Vinogradov and Tributs
   photographs, has neither. Both are modelled where the photograph puts
   them, measured against the 11.3 m hull.
   What it does NOT carry, because the photographs do not show it: external
   stores. The PL's torpedoes, depth bombs and sonobuoys go in a bay in the
   belly and its dipping sonar is a winch in the cabin, so there is no
   pylon, buoy rack or sonar pod hung under the airframe (the old parametric
   model hung all three).

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is the
   rotor mast axis, 4.25 m behind the nose, and z = 0 is the fuselage
   reference line 2.05 m above the wheel contact plane. render3d.js stands
   the model up with rotation.x = -PI/2 and rescales it by the measured X
   extent.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent. The faint rotor
   discs are 15.90 m across and centred on the mast, and the hull (4.25 m
   ahead of the mast, 7.06 m behind it) lies inside them, so the extent is
   the disc diameter, 15.90 m - the size the machine occupies in flight, and
   the figure the old model had. Blade phase does not matter: the heads'
   discs set it, and the blades stand at 40, 160 and 280 degrees (lower) and
   100, 220 and 340 (upper), none along the fuselage.

   NAMED NODES, and how each mount is built:
     rotor      TWO of them, one per head, both on the same mast. render3d.js
                finds each head's own axis nearest the machine's up and turns
                a machine's second head the other way, which is what a Kamov's
                contra-rotating pair does. Each head hangs in a mount turned
                +PI/2 about X (the asw_helo_fit.js pattern) so its local +Y
                runs up the mast, and inside it a group turned -PI/2 puts the
                head back into model axes, so it is authored like the rest.
     rotordisc  one inside each head, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     gear       the four wheels and their legs, so the renderer can show them
                near the ground only, and the lowest solid part of the model,
                so a parked machine stands on its tyres.
     There is no "tailrotor": the Ka-27 has none.

   Materials, nine at most: the painted SKIN (one CanvasTexture per
   marking), GLASS, DARK and METAL fittings, the BLADE composite, RUBBER, the
   TEAM flash (exactly C.team) and the DISC. The skin UVs are projected from
   model space by face normal, as in the Mi-28N hero: top, port, starboard
   and belly bands of one sheet, plus a fifth row holding the fin tiles (the
   outer face with the star, the inner face plain).
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKa27 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  var GROUND  = -2.05;                     /* wheel contact plane         */
  function Z(h) { return GROUND + h; }     /* height above ground -> z    */
  var ROTOR_R = 7.95;                      /* 15.9 m discs                */
  var CHORD   = 0.48;
  var H_LO = 3.80, H_UP = 5.20;            /* the two blade planes        */
  var NAC_Y = 0.55, NAC_R = 0.375, NAC_H = 3.075;   /* engine nacelles    */
  var FIN_Y = 1.85, FIN_CANT = 6 * D2R;
  var STAB_H = 1.98;                       /* stabiliser mid-plane        */

  /* the fin outline, (x, height above ground): leading edge nearly upright,
     a flat top with the aft corner rounded, the trailing edge upright */
  var FIN = [[-4.85, 1.20], [-6.60, 1.42], [-6.67, 2.62], [-6.62, 2.96], [-6.40, 3.12],
             [-5.05, 3.12], [-4.92, 3.02], [-4.84, 2.20]];

  /* =================================================== the painted skin ===
     One 1024 x 1280 sheet in five 256-pixel rows:
        row 0  TOP        x across, y down the band (port at the top)
        row 1  PORT side  x across, z down the band
        row 2  STARBOARD  x across, z down the band
        row 3  BELLY      x across, y down the band
        row 4  the FIN tiles: outer face with the star (left), inner (right)
     projUV() picks the row from each triangle's face normal; the fins carry
     their own UVs. The grey is the Ka-27's pale blue-grey; the hexes sit
     darker than the paint chips because the ACES pass lifts a mid grey by
     about 1.8x. */
  var TW = 1024, TH = 1280, BAND = 256;
  var UX0 = -7.6, UX1 = 4.8;               /* x covered across the sheet  */
  var QY = 2.0;                            /* |y| covered by top/belly    */
  var QZ0 = -1.85, QZ1 = 1.55;             /* z covered by the side rows  */
  var FX0 = -6.75, FX1 = -4.75;            /* fin tile: x range           */
  var FZ0 = Z(1.15), FZ1 = Z(3.20);        /*           z range           */
  function pxX(x)       { return (x - UX0) / (UX1 - UX0) * TW; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }
  /* a box of the side row b from x0..x1 (aft..fore) and heights h0..h1 */
  function sideRect(b, x0, x1, h0, h1) {
    var py = pySide(Z(h1), b);
    return [pxX(x0), py, pxX(x1) - pxX(x0), pySide(Z(h0), b) - py];
  }

  var BASE = "#8a96a0", BELLY = "#98a3ab";

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* the national star on the fin: Soviet = red with a white edge; Russian =
     red inside a thin dark blue edge inside a white one, the order the
     photographs show (zoomed on the fins of "62" and "68": red, then blue,
     then white outermost). That bordered star is the marking of 2010 on;
     before it the Russian Navy flew the Soviet star. build() is handed no
     era for an own-id key, so asw_helo_p, which runs from the 1990s, wears
     the present-day marking throughout. */
  function star(g, cx, cy, r, russian) {
    function path(rr) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? rr * 0.40 : rr;
        var x = cx + Math.cos(a) * q, y = cy + Math.sin(a) * q;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#d9dcd8"; path(r * (russian ? 1.30 : 1.14)); g.fill();
    if (russian) { g.fillStyle = "#26357c"; path(r * 1.12); g.fill(); }
    g.fillStyle = "#a8271f"; path(r); g.fill();
  }

  /* the bort number in the squared stencil the photographs show, one
     segment at a time (fillRect only, so the sheet is the same in every
     browser). Cell units: u across as read, w up. */
  var SEG = { a: [0, 0.80, 1, 1], b: [0.75, 0.5, 1, 1], c: [0.75, 0, 1, 0.5], d: [0, 0, 1, 0.20],
              e: [0, 0, 0.25, 0.5], f: [0, 0.5, 0.25, 1], g: [0, 0.40, 1, 0.60] };
  var DIGIT = { "6": "afgedc", "8": "abcdefg" };
  /* On the PORT row x runs to the right while the viewer, standing off the
     port side, has the nose on his left; so there the number is read from
     the fore end aft and each digit lands mirrored on the sheet, which the
     model turns the right way round. On the starboard row it is read from
     the aft end forward, as drawn. */
  function bort(g, b, txt, xFore, h0, h1, cw, gap) {
    var total = txt.length * cw + (txt.length - 1) * gap, ci, si;
    for (ci = 0; ci < txt.length; ci++) {
      var segs = DIGIT[txt.charAt(ci)];
      for (si = 0; si < segs.length; si++) {
        var q = SEG[segs.charAt(si)];
        var u0 = ci * (cw + gap) + q[0] * cw, u1 = ci * (cw + gap) + q[2] * cw, xa, xb;
        if (b === 1) { xa = xFore - u1; xb = xFore - u0; }
        else         { xa = xFore - total + u0; xb = xFore - total + u1; }
        var rr = sideRect(b, xa, xb, h0 + q[1] * (h1 - h0), h0 + q[3] * (h1 - h0));
        g.fillRect(rr[0], rr[1], rr[2], rr[3]);
      }
    }
  }

  function skinCanvas(russian) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(2727);
    var i, b, x, y, r;

    g.fillStyle = BASE; g.fillRect(0, 0, TW, TH);
    g.fillStyle = BELLY; g.fillRect(0, 3 * BAND, TW, BAND);

    /* ---- weathering: rain streaks down the sides, a little sun on top ---- */
    for (i = 0; i < 240; i++) {
      g.fillStyle = "rgba(30,36,42," + (0.03 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 12 + R() * 46);
    }
    for (i = 0; i < 46; i++) {
      g.fillStyle = "rgba(236,240,242," + (0.03 + R() * 0.04).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * BAND, 30 + R() * 90, 6 + R() * 16);
    }
    for (i = 0; i < 70; i++) {
      g.fillStyle = "rgba(30,34,38," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 80, 5 + R() * 16);
    }

    /* ---- frames and rivet rows at the stations the photographs show ---- */
    var frames = [3.45, 2.95, 2.40, 1.75, 1.15, 0.75, -0.75, -1.45, -2.20, -2.95,
                  -3.55, -4.15, -4.80, -5.50, -6.20];
    g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 4 * BAND); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.08)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, 4 * BAND); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 3; y < 4 * BAND; y += 7) g.fillRect(x - 4, y, 1.6, 1.6);
    }
    /* the seam where the cowls sit on the cabin shoulder, and the cabin's
       own stringers */
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.8;
    [2.70, 2.15, 1.55, 1.00].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
      }
    });
    [-0.52, 0, 0.52, -1.0, 1.0].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
    });
    g.lineWidth = 1.2;
    for (i = 0; i < 60; i++) {
      var hx = R() * TW, hy = BAND + R() * 2 * BAND, hw = 12 + R() * 30, hh = 9 + R() * 18;
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.strokeRect(hx, hy, hw, hh);
    }

    /* ---- doors and windows, both sides ---- */
    for (b = 1; b <= 2; b++) {
      /* cockpit door, with its window */
      r = sideRect(b, 2.62, 3.52, 1.28, 2.56);
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2; g.strokeRect(r[0], r[1], r[2], r[3]);
      /* the big cabin door and its window */
      r = sideRect(b, -0.78, 0.78, 0.98, 2.50);
      g.strokeRect(r[0], r[1], r[2], r[3]);
      r = sideRect(b, 0.18, 0.56, 1.88, 2.34);
      g.fillStyle = "rgba(18,26,30,0.92)"; g.fillRect(r[0], r[1], r[2], r[3]);
      g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 1.6; g.strokeRect(r[0], r[1], r[2], r[3]);
      /* door handle and the step plate below */
      r = sideRect(b, -0.55, -0.40, 1.60, 1.66);
      g.fillStyle = "rgba(20,20,20,0.7)"; g.fillRect(r[0], r[1], r[2], r[3]);
      /* the three small cabin windows low on the cowl flank */
      [-1.50, -1.86, -2.22].forEach(function (wx) {
        var q = sideRect(b, wx - 0.12, wx + 0.12, 2.70, 2.93);
        g.fillStyle = "rgba(18,26,30,0.92)"; g.fillRect(q[0], q[1], q[2], q[3]);
      });
      /* inspection hatches on the aft cabin and the tail cone */
      [[-2.60, -3.30, 1.20, 2.20], [-3.45, -3.95, 1.30, 2.05], [-4.30, -4.85, 1.55, 2.20]].forEach(function (h) {
        var q = sideRect(b, h[1], h[0], h[2], h[3]);
        g.strokeStyle = "rgba(0,0,0,0.42)"; g.lineWidth = 1.6; g.strokeRect(q[0], q[1], q[2], q[3]);
      });
      /* the black soot panel on the cowl flank behind each exhaust nozzle,
         about 0.9 m long, and the grime it streaks further aft */
      r = sideRect(b, -0.38, 0.54, 2.86, 3.30);
      var sg = g.createLinearGradient(pxX(-0.38), 0, pxX(-1.9), 0);
      sg.addColorStop(0, "rgba(24,22,20,0.34)"); sg.addColorStop(1, "rgba(24,22,20,0)");
      g.fillStyle = sg; g.fillRect(pxX(-1.9), r[1], pxX(-0.38) - pxX(-1.9), r[3]);
      g.fillStyle = "rgba(20,20,20,0.92)"; g.fillRect(r[0], r[1], r[2], r[3]);
      /* the bort number, red, on the cowl flank between intake and exhaust */
      g.fillStyle = "#b0262b";
      bort(g, b, "68", 2.20, 2.88, 3.26, 0.30, 0.08);
    }

    /* ---- belly: oil and exhaust grime, the bay doors under the cabin ---- */
    g.strokeStyle = "rgba(0,0,0,0.32)"; g.lineWidth = 1.6;
    g.strokeRect(pxX(-3.2), pyBelly(0.46), pxX(1.4) - pxX(-3.2), pyBelly(-0.46) - pyBelly(0.46));
    g.beginPath(); g.moveTo(pxX(-0.9), pyBelly(0.46)); g.lineTo(pxX(-0.9), pyBelly(-0.46)); g.stroke();

    /* ---- the fin tiles. Tile A is the outer face: the hinge line of the
       rudder, riveted ribs, the star. Tile B the inner face, plain. ---- */
    function fx(xm) { return 8 + (xm - FX0) / (FX1 - FX0) * 240; }
    function fy(h)  { return 4 * BAND + 8 + (3.20 - h) / (3.20 - 1.15) * 240; }
    for (b = 0; b < 2; b++) {
      var ox = b * 256;
      g.fillStyle = BASE; g.fillRect(ox, 4 * BAND, 256, 256);
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(ox + fx(-6.05), 4 * BAND); g.lineTo(ox + fx(-6.05), 5 * BAND); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 4 * BAND + 4; y < 5 * BAND; y += 7) g.fillRect(ox + fx(-6.05) + 4, y, 1.6, 1.6);
      for (y = 4 * BAND + 4; y < 5 * BAND; y += 7) g.fillRect(ox + fx(-5.20) - 4, y, 1.6, 1.6);
      g.strokeStyle = "rgba(0,0,0,0.28)";
      g.beginPath(); g.moveTo(ox, fy(2.05)); g.lineTo(ox + 256, fy(2.05)); g.stroke();
    }
    star(g, fx(-5.72), fy(2.28), 0.42 * 120, russian);

    /* ---- the pale belly's panel seams ---- */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.beginPath(); g.moveTo(x, 3 * BAND); g.lineTo(x, 4 * BAND); g.stroke();
    }
    return cv;
  }

  var _cv = {}, _tex = {};                 /* module scope: one per marking */
  function skinTexture(russian) {
    var k = russian ? "ru" : "su";
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(russian);
      _tex[k] = new V.CanvasTexture(_cv[k]);
      _tex[k].wrapS = _tex[k].wrapT = V.ClampToEdgeWrapping;
      _tex[k].anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) _tex[k].encoding = V.sRGBEncoding;
    } catch (e) { _tex[k] = false; }
    return _tex[k];
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft (the nose cap, the intake rims, the fin edges) would collapse to
     a line under an x projection, so they are laid out along x + y. */
  function projUV(geo) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.55 ? 0 : nz < -0.55 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
        if (band === 0)      { U = pxX(x); W = pyTop(y); }
        else if (band === 3) { U = pxX(x); W = pyBelly(y); }
        else                 { U = pxX(endOn ? x + y : x); W = pySide(z, band); }
        U = Math.max(2, Math.min(TW - 2, U));
        W = Math.max(lo, Math.min(hi, W));
        uv[(t / 3 + k) * 2]     = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }
  /* The fin's own UVs: the outer face (normal pointing the way the fin
     stands off the hull, outerSign) into tile A with the star, every other
     face into the plain tile B. */
  function finUV(geo, outerSign) {
    var g = flat(geo);
    if (!g.attributes.normal) g.computeVertexNormals();
    var p = g.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var ny = uz * vx - ux * vz, nl = Math.sqrt((uy * vz - uz * vy) * (uy * vz - uz * vy) +
                 ny * ny + (ux * vy - uy * vx) * (ux * vy - uy * vx)) || 1;
      var outer = ny / nl * outerSign > 0.6;
      for (k = 0; k < 3; k++) {
        var X = p[t + 3 * k], Zc = p[t + 3 * k + 2];
        var U = (outer ? 0 : 256) + 8 + (X - FX0) / (FX1 - FX0) * 240;
        var W = 4 * BAND + 8 + (FZ1 - Zc) / (FZ1 - FZ0) * 240;
        U = Math.max((outer ? 0 : 256) + 2, Math.min((outer ? 0 : 256) + 254, U));
        W = Math.max(4 * BAND + 2, Math.min(5 * BAND - 2, W));
        uv[(t / 3 + k) * 2]     = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    g.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return g;
  }

  /* ========================================================= materials == */
  function makeMats(C, russian) {
    var tex = skinTexture(russian);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x8a96a0);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 });
    /* the blades weather to a dull grey-brown composite */
    m.blade  = new V.MeshStandardMaterial({ color: 0x3a3e40, roughness: 0.80, metalness: 0.10 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    /* the panes lie 12 mm off the skin, so they also take a polygon offset,
       as the decals of the other heroes do, to stay clear of the depth
       buffer's resolution at the game camera's range */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x20343a, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05,
                                            polygonOffset: true, polygonOffsetFactor: -1,
                                            polygonOffsetUnits: -2 });
    /* The flash is exactly C.team, so eraPaint's team test leaves it alone
       if this key is ever stood in for another def. The emissive keeps it
       from greying out under ACES. */
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ====================================================== geometry kit == */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  /* a cylinder along model x, y or z; r0 is the end toward +axis */
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  /* an ellipsoid with its pole up the z axis: the lower half (lower = 1),
     the upper half (0) or the whole (2). A half is an open shell, so use it
     only where its rim is buried. */
  function dome(rx, ry, rz, x, y, z, lower, ws, hs) {
    var g = new V.SphereGeometry(1, ws, hs, 0, PI * 2, lower === 1 ? PI / 2 : 0, lower === 2 ? PI : PI / 2);
    g.rotateX(PI / 2);
    g.scale(rx, ry, rz);
    return place(g, x, y, z);
  }
  /* a round bar from p to q */
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  /* The starboard twin of a port part. Negating y turns the part inside
     out, so each triangle's last two corners are swapped back. */
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array;
    var n = g.attributes.normal ? g.attributes.normal.array : null;
    var u = g.attributes.uv ? g.attributes.uv.array : null;
    var i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) {
      for (k = 0; k < 3; k++) {
        tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
        if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
      }
      if (u) for (k = 0; k < 2; k++) {
        tmp = u[t * 6 + 2 + k]; u[t * 6 + 2 + k] = u[t * 6 + 4 + k]; u[t * 6 + 4 + k] = tmp;
      }
    }
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
  /* a duct along local y with a squared-off oval section, half-width ax
     (local x) and half-height az (local z), superellipse exponent pe;
     closed at both ends */
  function duct(ax, az, len, seg, pe) {
    var g = new V.CylinderGeometry(1, 1, len, seg, 1, false);
    var p = g.attributes.position.array, i;
    for (i = 0; i < p.length; i += 3) {
      var x = p[i], z = p[i + 2], r = Math.sqrt(x * x + z * z);
      if (r < 1e-6) continue;
      var c = x / r, sn = z / r;
      p[i]     = r * ax * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), pe);
      p[i + 2] = r * az * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), pe);
    }
    g.computeVertexNormals();
    return g;
  }
  /* ---- conformal glazing: the triangles of a loft, a ray against them,
     and a pane cast onto them. A pane is a grid of rays shot at the skin;
     each hit is lifted along its face normal and the grid becomes the
     glass, so a pane lies on the nose however the loft curves there. */
  function triList(geo) {
    var p = geo.attributes.position.array, ix = geo.index ? geo.index.array : null;
    var n = ix ? ix.length : p.length / 3, out = [], i, a, b, c;
    for (i = 0; i < n; i += 3) {
      a = 3 * (ix ? ix[i] : i); b = 3 * (ix ? ix[i + 1] : i + 1); c = 3 * (ix ? ix[i + 2] : i + 2);
      out.push([p[a], p[a + 1], p[a + 2], p[b], p[b + 1], p[b + 2], p[c], p[c + 1], p[c + 2]]);
    }
    return out;
  }
  function cast(tl, o, d) {
    var best = null, i;
    for (i = 0; i < tl.length; i++) {
      var T = tl[i];
      var ax = T[3] - T[0], ay = T[4] - T[1], az = T[5] - T[2];
      var bx = T[6] - T[0], by = T[7] - T[1], bz = T[8] - T[2];
      var px = d[1] * bz - d[2] * by, py = d[2] * bx - d[0] * bz, pz = d[0] * by - d[1] * bx;
      var det = ax * px + ay * py + az * pz;
      if (Math.abs(det) < 1e-12) continue;
      var inv = 1 / det, tx = o[0] - T[0], ty = o[1] - T[1], tz = o[2] - T[2];
      var u = (tx * px + ty * py + tz * pz) * inv;
      if (u < 0 || u > 1) continue;
      var qx = ty * az - tz * ay, qy = tz * ax - tx * az, qz = tx * ay - ty * ax;
      var v = (d[0] * qx + d[1] * qy + d[2] * qz) * inv;
      if (v < 0 || u + v > 1) continue;
      var t = (bx * qx + by * qy + bz * qz) * inv;
      if (t > 0 && (!best || t < best.t)) {
        var nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        if (nx * d[0] + ny * d[1] + nz * d[2] > 0) nl = -nl;     /* face the ray */
        best = { t: t, n: [nx / nl, ny / nl, nz / nl] };
      }
    }
    return best;
  }
  /* nu x nv cells; ray(fu, fv) gives [origin, direction] for each corner */
  function pane(tl, nu, nv, ray, lift) {
    var P = [], pts = [], i, j;
    for (j = 0; j <= nv; j++) for (i = 0; i <= nu; i++) {
      var r = ray(i / nu, j / nv), o = r[0], d = r[1], h = cast(tl, o, d);
      if (!h) return null;
      P.push([o[0] + d[0] * h.t + h.n[0] * lift, o[1] + d[1] * h.t + h.n[1] * lift,
              o[2] + d[2] * h.t + h.n[2] * lift, h.n]);
    }
    function at(a, b) { return P[b * (nu + 1) + a]; }
    function tri(a, b, c) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var m = a[3];
      if ((uy * vz - uz * vy) * m[0] + (uz * vx - ux * vz) * m[1] + (ux * vy - uy * vx) * m[2] < 0)
        pts.push(a, c, b);
      else pts.push(a, b, c);
    }
    for (j = 0; j < nv; j++) for (i = 0; i < nu; i++) {
      tri(at(i, j), at(i + 1, j), at(i + 1, j + 1));
      tri(at(i, j), at(i + 1, j + 1), at(i, j + 1));
    }
    return tris(pts);
  }
  /* one buffer per material and assembly: a single draw call (and one
     shadow draw) for what would otherwise be dozens */
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  /* skinned parts get the projected UVs unless they carry their own */
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    if (skinned) {
      list = list.map(function (g) {
        g = flat(g);
        if (!g.attributes.normal) g.computeVertexNormals();
        if (!g.attributes.uv) projUV(g);
        return g;
      });
    }
    var m = new V.Mesh(merge(list), mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  /* flat-shaded triangles from a list of corners, three per triangle */
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners:
     flat-sided boxes where e is low, round tubes where it nears 1.
       zb, zt   belly and top          zm   height of the widest point
       wb, wt   half-widths at belly and top corners, wm the widest
       yc       centreline offset (the engine nacelles)
     Heights are given ABOVE GROUND and converted here. Sections run from
     nose to tail (decreasing x), and the quads are wound (a, c, b), which
     for that order puts every normal outward. */
  function sec(x, zb, zt, zm, wb, wm, wt, e, yc) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: yc || 0 };
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {                       /* belly, up the port side, to the top */
      var th = -PI / 2 + PI * i / n, c = Math.cos(th), sn = Math.sin(th);
      var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
      var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
      var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
      pts.push([W * Math.pow(Math.abs(c), s.e), z]);
    }
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);   /* and down starboard */
    for (i = 0; i < pts.length; i++) pts[i][0] += s.yc;
    return pts;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], rl = 2 * n, i, j;
    for (i = 0; i < secs.length; i++) {
      var r = ringOf(secs[i], n);
      for (j = 0; j < rl; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < rl; j++) {
      var a = i * rl + j, b = i * rl + (j + 1) % rl, c = (i + 1) * rl + j, d = (i + 1) * rl + (j + 1) % rl;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    /* domed end caps: a fan to a centre point pushed out along x */
    function cap(k, dx, front) {
      var s = secs[k], r = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cy += r[j][0]; cz += r[j][1]; }
      var o = [s.x + dx, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, r[j][0], r[j][1]], p1 = [s.x, r[(j + 1) % rl][0], r[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null) cap(0, noseDx, true);
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
    return out;
  }

  /* ========================================================= the build == */
  function build(THREE, M, C, russian) {
    V = THREE;
    var T = makeMats(C, russian);
    var g = new V.Group();
    g.name = "ka27";
    var i, k, s, a;

    var skin = [], glass = [], dark = [], metal = [], team = [];

    /* --------------------------------------------------- the fuselage ----
       The whale: the nose raked back from the chin to the cockpit roof in
       about 50 degrees, the cockpit roof and the cabin shoulder level at
       2.76 m, the cabin 2.0 m deep and 2.0 m wide with the sides leaning
       in above the widest point, then the short tail cone with its belly
       lifting toward the tail light.
                x      zb    zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 4.18, 1.18, 1.44, 1.31, 0.09, 0.15, 0.08, 0.80),
      sec( 4.06, 1.04, 1.64, 1.34, 0.28, 0.40, 0.22, 0.70),
      sec( 3.84, 0.94, 1.98, 1.42, 0.46, 0.66, 0.34, 0.60),
      sec( 3.52, 0.87, 2.40, 1.52, 0.62, 0.86, 0.52, 0.52),
      sec( 3.20, 0.82, 2.74, 1.58, 0.74, 0.98, 0.72, 0.48),
      sec( 2.60, 0.78, 2.76, 1.62, 0.80, 1.02, 0.82, 0.45),
      sec( 1.20, 0.76, 2.76, 1.64, 0.82, 1.04, 0.84, 0.45),
      sec(-1.00, 0.76, 2.76, 1.64, 0.82, 1.04, 0.84, 0.45),
      sec(-2.60, 0.78, 2.74, 1.64, 0.80, 1.02, 0.80, 0.46),
      sec(-3.50, 0.86, 2.68, 1.62, 0.74, 0.96, 0.70, 0.50),
      sec(-4.20, 1.00, 2.56, 1.62, 0.55, 0.76, 0.52, 0.60),
      sec(-5.00, 1.22, 2.46, 1.80, 0.40, 0.55, 0.40, 0.70),
      sec(-6.00, 1.46, 2.36, 1.90, 0.28, 0.36, 0.28, 0.78),
      sec(-6.80, 1.60, 2.24, 1.92, 0.18, 0.24, 0.18, 0.82),
      sec(-6.98, 1.66, 2.16, 1.91, 0.11, 0.15, 0.11, 0.84),
    ];
    skin = skin.concat(loft(FUS, 22, 0.08, 0.08));

    /* ---------------------------------------------- engine nacelles ----
       Two TV3-117Vs side by side on the cabin shoulder, 1.10 m between
       their centrelines. Each is a plain cylinder to the exhaust nozzle, then
       a slightly fuller cowl whose roof stays flat to x = -3.2 and then
       falls steeply onto the tail cone. A saddle fills the valley between
       them, and the gearbox fairing rises through it at the mast. */
    var NAC = [
      [ 2.40, 2.70, 3.45, 3.075, 0.375, 0.375, 0.375, 1.00],
      [ 0.90, 2.70, 3.45, 3.075, 0.375, 0.375, 0.375, 1.00],
      [ 0.70, 2.70, 3.45, 3.075, 0.370, 0.410, 0.350, 0.86],
      [-0.60, 2.70, 3.45, 3.075, 0.370, 0.410, 0.340, 0.82],
      [-3.20, 2.70, 3.44, 3.070, 0.360, 0.400, 0.330, 0.82],
      [-3.80, 2.66, 3.24, 2.950, 0.330, 0.370, 0.300, 0.82],
      [-4.30, 2.58, 2.90, 2.740, 0.280, 0.310, 0.250, 0.85],
      [-4.80, 2.44, 2.60, 2.520, 0.120, 0.140, 0.110, 0.90],
    ];
    for (s = -1; s <= 1; s += 2) {
      skin = skin.concat(loft(NAC.map(function (q) {
        return sec(q[0], q[1], q[2], q[3], q[4], q[5], q[6], q[7], s * NAC_Y);
      }), 14, null, 0.05));
    }
    skin = skin.concat(loft([
      sec( 1.00, 2.70, 3.30, 3.00, 0.20, 0.25, 0.20, 0.80),
      sec(-3.00, 2.70, 3.30, 3.00, 0.20, 0.25, 0.20, 0.80),
      sec(-3.90, 2.62, 3.14, 2.88, 0.17, 0.21, 0.17, 0.82),
      sec(-4.50, 2.48, 2.72, 2.60, 0.10, 0.13, 0.10, 0.90),
    ], 8, 0.05, 0.05));
    skin.push(cyl(0.40, 0.46, 0.34, 18, "z", 0, 0, Z(3.40)));
    /* the intakes: a skin lip, a dark mouth, the engine's own bullet */
    for (s = -1; s <= 1; s += 2) {
      skin.push(place(new V.RingGeometry(0.30, NAC_R + 0.004, 24), 2.41, s * NAC_Y, Z(NAC_H), 0, PI / 2, 0));
      dark.push(place(new V.CircleGeometry(0.30, 24), 2.415, s * NAC_Y, Z(NAC_H), 0, PI / 2, 0));
      metal.push(sph(0.085, 10, 8, 2.44, s * NAC_Y, Z(NAC_H), 1.3, 1, 1));
    }
    /* the exhaust nozzles: a squared-off oval duct 0.54 m long and 0.70 m
       tall standing out of each outer flank 0.8 m ahead of the mast, its
       mouth turned 25 degrees aft so that the aft lip meets the cowl and the
       fore lip stands 0.25 m proud; a black mouth inside the metal lip,
       raised 3 cm off its end so the two never fight in the depth buffer at
       the game camera's range. The inner end is buried in the nacelle.
       Built for port, mirrored. */
    var EXA = 25 * D2R, EXL = 0.50, edx = -Math.sin(EXA), edy = Math.cos(EXA);
    var em = [0.80, NAC_Y + 0.41 + 0.14, Z(3.02)];
    var exS = duct(0.27, 0.35, EXL, 24, 0.6);
    exS.rotateZ(EXA);
    exS.translate(em[0] - edx * EXL / 2, em[1] - edy * EXL / 2, em[2]);
    both(metal, exS);
    var exM = duct(0.225, 0.30, 0.034, 24, 0.6);   /* 3 cm proud of the lip: */
    exM.rotateZ(EXA);                                /* clear of the depth    */
    exM.translate(em[0] + edx * 0.014, em[1] + edy * 0.014, em[2]);   /* buffer */
    both(dark, exM);

    /* -------------------------------------------------- the chin radome --
       The PL's search radar. A fat egg under the nose, nearly as wide as the
       nose, its bottom 0.42 m above the ground. */
    skin.push(dome(0.95, 0.72, 0.60, 3.35, 0, Z(1.02), 2, 22, 14));

    /* --------------------------------------------------------- the tail --
       The stabiliser is a plain plate across the tail cone at mid-height,
       a fin stands at each tip leaning 6 degrees outward, and under the boom
       hangs a small ventral fin with its bumper. */
    var stab = M.slab(V, [[-5.15, -1.84], [-6.50, -1.84], [-6.55, -0.40], [-6.55, 0.40],
                          [-6.50, 1.84], [-5.15, 1.84], [-5.05, 0.40], [-5.05, -0.40]], 0.06);
    stab.translate(0, 0, Z(STAB_H) - 0.03);
    skin.push(stab);
    var pivotZ = Z(STAB_H);
    /* M.slab bevels its edges by up to 40% of the depth on each face, so the
       depths asked for here (0.08, 0.06) come out at 0.14 and 0.11 m thick */
    var fin = M.slab(V, FIN.map(function (q) { return [q[0], Z(q[1])]; }), 0.08, "xz");
    fin.translate(0, 0.04, -pivotZ);
    fin.rotateX(-FIN_CANT);
    fin.translate(0, FIN_Y, pivotZ);
    fin = finUV(fin, 1);
    both(skin, fin);
    /* the starboard side's equipment, from the in-flight Ka-28 photograph: an
       equipment box tucked under the cowl aft of the door, and the rounded
       fairing over the cabin door itself. Neither is on the port side. */
    skin.push(box(1.20, 0.30, 1.05, -2.35, -0.99, Z(2.28)));
    var pod = [], pr = 0.22, pq, pc;
    [[0.89 - pr, 1.86 + pr, -90], [0.89 - pr, 2.71 - pr, 0], [-0.70 + pr, 2.71 - pr, 90],
     [-0.70 + pr, 1.86 + pr, 180]].forEach(function (c) {
      for (pq = 0; pq <= 4; pq++) {
        pc = (c[2] + pq * 22.5) * D2R;
        pod.push([c[0] + Math.cos(pc) * pr, Z(c[1] + Math.sin(pc) * pr)]);
      }
    });
    var podG = M.slab(V, pod, 0.10, "xz");
    podG.translate(0, -0.84, 0);
    skin.push(podG);
    var vent = M.slab(V, [[-3.80, Z(1.02)], [-4.95, Z(1.20)], [-5.02, Z(0.72)], [-4.20, Z(0.60)]], 0.06, "xz");
    vent.translate(0, 0.03, 0);
    skin.push(vent);
    dark.push(box(0.84, 0.12, 0.04, -4.56, 0, Z(0.58)));       /* the bumper strip */
    skin.push(dome(0.55, 0.19, 0.17, -4.65, 0, Z(2.50), 0, 12, 6));   /* dorsal fairing */
    dark.push(sph(0.17, 10, 8, -7.07, 0, Z(1.92), 1.2, 1, 1));            /* tail light */
    for (s = -1; s <= 1; s += 2) {                  /* the tubes bracing the stabiliser */
      metal.push(bar([-5.40, s * 0.28, Z(1.44)], [-5.70, s * 1.55, Z(1.95)], 0.032, 6));
    }

    /* ----------------------------------------------------------- glass ---
       The raked screen in two panes either side of a 9 cm frame post, and
       the window in each cockpit door. Every pane is cast onto the loft
       (see pane()), so it lies 12 mm off the skin wherever the nose curves:
       the screen from 1.98 m up to 2.64 m, 0.1 m under the cockpit roof,
       0.80 m across at the bottom and 1.00 m at the top; the door window a
       trapezoid from 1.92 m to 2.46 m whose fore edge follows the rake. */
    var NOSE = triList(skin[0]);
    var SL = 50.8 * D2R, n0 = [Math.sin(SL), 0, Math.cos(SL)], sv = [-Math.cos(SL), 0, Math.sin(SL)];
    var screen = pane(NOSE, 6, 8, function (fu, fv) {
      var v = -0.43 + 0.86 * fv, y = 0.045 + (0.40 + 0.10 * fv - 0.045) * fu;
      return [[3.53 + v * sv[0] + 2.5 * n0[0], y, Z(2.31) + v * sv[2] + 2.5 * n0[2]],
              [-n0[0], 0, -n0[2]]];
    }, 0.012);
    var dwin = pane(NOSE, 6, 5, function (fu, fv) {
      var h = 1.92 + 0.54 * fv, x = 2.70 + (0.70 - 0.30 * fv) * fu;
      return [[x, 2.0, Z(h)], [0, -1, 0]];
    }, 0.012);
    if (screen) both(glass, screen);
    if (dwin) both(glass, dwin);
    dark.push(box(0.10, 0.20, 0.05, 3.80, 0, Z(0.82)));          /* landing light under the nose */
    dark.push(box(0.30, 0.04, 0.16, 1.60, 0, Z(0.72)));          /* belly antenna blade */
    dark.push(box(0.34, 0.03, 0.22, -1.30, 0, Z(3.41)));         /* blade antenna on the cowl roof */
    metal.push(bar([3.55, -0.80, Z(2.08)], [4.40, -0.96, Z(1.96)], 0.018, 5));   /* the pitot boom */

    /* ------------------------------------------------------- team flash --
       Two stripes along the cowl roofs and a patch on each half of the
       stabiliser, all on faces that look up; and a band across the top of
       each fin. */
    for (s = -1; s <= 1; s += 2) {
      team.push(box(2.40, 0.13, 0.02, -1.95, s * NAC_Y, Z(3.452)));
      team.push(box(0.62, 1.05, 0.02, -5.85, s * 1.12, Z(STAB_H) + 0.068));
    }
    for (s = -1; s <= 1; s += 2) {
      var tb = box(1.30, 0.02, 0.22, -5.70, 0, Z(2.92));
      tb.translate(0, 0, -pivotZ); tb.rotateX(-FIN_CANT); tb.translate(0, FIN_Y + 0.086, pivotZ);
      team.push(s > 0 ? tb : mirrorY(tb));
    }

    /* ----------------------------------------------- the undercarriage ---
       Photographs: the main legs are straight raked tubes from high on the
       fuselage side, 2.2 m long, with a 620 x 180 tyre on the end of each,
       wide of the hull, at the published 3.50 m main track; the nose wheels
       are small and sit under the cockpit either side of the radome, 1.44 m
       apart. */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    var legs = [], tyres = [];
    for (s = -1; s <= 1; s += 2) {
      /* main */
      tyres.push(cyl(0.31, 0.31, 0.18, 22, "y", -0.50, s * 1.75, Z(0.31)));
      legs.push(cyl(0.19, 0.19, 0.20, 14, "y", -0.50, s * 1.75, Z(0.31)));
      legs.push(bar([-0.32, s * 0.82, Z(2.32)], [-0.50, s * 1.66, Z(0.33)], 0.056, 7));
      legs.push(bar([-0.46, s * 0.66, Z(0.86)], [-0.50, s * 1.36, Z(1.12)], 0.034, 6));
      legs.push(box(0.24, 0.16, 0.10, -0.50, s * 1.66, Z(0.52)));
      /* nose */
      tyres.push(cyl(0.225, 0.225, 0.15, 18, "y", 2.55, s * 0.72, Z(0.225)));
      legs.push(cyl(0.14, 0.14, 0.17, 12, "y", 2.55, s * 0.72, Z(0.225)));
      legs.push(bar([2.55, s * 0.56, Z(0.90)], [2.55, s * 0.70, Z(0.24)], 0.046, 6));
      legs.push(bar([2.12, s * 0.46, Z(0.86)], [2.55, s * 0.70, Z(0.50)], 0.030, 5));
    }
    mesh(gear, legs, T.metal, "gear_legs");
    mesh(gear, tyres, T.rubber, "tyres");

    /* ----------------------------------------------------- airframe ----- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");

    /* ================================================ the coaxial mast ===
       The fixed parts: the shaft between the heads, two swashplate rings and
       three control rods. The heads, which turn, are below. */
    for (k = 0; k < 3; k++) {
      a = k * PI * 2 / 3 + 0.4;
      metal.push(bar([Math.cos(a) * 0.32, Math.sin(a) * 0.32, Z(3.98)],
                     [Math.cos(a) * 0.32, Math.sin(a) * 0.32, Z(5.06)], 0.022, 5));
    }
    metal.push(cyl(0.13, 0.13, 1.50, 12, "z", 0, 0, Z(4.30)));
    metal.push(cyl(0.31, 0.31, 0.05, 18, "z", 0, 0, Z(4.22)));
    metal.push(cyl(0.27, 0.27, 0.05, 18, "z", 0, 0, Z(4.62)));
    metal.push(cyl(0.34, 0.34, 0.06, 18, "z", 0, 0, Z(4.04)));
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");

    /* ======================================================== the heads ==
       The same mount as asw_helo_fit.js: +PI/2 about X points the node's
       local +Y up the mast, and the inner group turned -PI/2 puts the head
       back into model axes. render3d.js turns the second "rotor" head the
       other way. */
    function head(h, upper, azs) {
      var mnt = new V.Group();
      mnt.position.set(0, 0, Z(h));
      mnt.rotation.x = PI / 2;
      g.add(mnt);
      var rotor = new V.Group();
      rotor.name = "rotor";
      mnt.add(rotor);
      var hd = new V.Group();
      hd.rotation.x = -PI / 2;
      rotor.add(hd);
      var hubM = [], hubD = [], blades = [], tips = [], j;
      hubM.push(cyl(0.25, 0.30, 0.34, 20, "z", 0, 0, 0));
      hubM.push(cyl(0.36, 0.36, 0.05, 20, "z", 0, 0, -0.19));
      if (upper) hubM.push(cyl(0.08, 0.20, 0.08, 16, "z", 0, 0, 0.21));   /* cap: top at 5.45 m */
      else hubM.push(cyl(0.20, 0.20, 0.05, 16, "z", 0, 0, 0.19));
      /* blade outline, blade along +X: root cut-out to 0.9 m, a square tip
         with the corners cut, 0.48 m chord, 0.04 m thick */
      var BP = [[0.88, -0.24], [7.78, -0.24], [ROTOR_R, -0.10], [ROTOR_R, 0.10],
                [7.78, 0.24], [0.88, 0.24]];
      var TP = [[7.10, -0.245], [7.78, -0.245], [ROTOR_R, -0.105], [ROTOR_R, 0.105],
                [7.78, 0.245], [7.10, 0.245]];
      for (j = 0; j < 3; j++) {
        a = azs[j] * D2R;
        var bl = M.slab(V, BP, 0.04);
        bl.translate(0, 0, -0.02);
        bl.rotateZ(a);
        blades.push(bl);
        if (upper) {
          var tp = M.slab(V, TP, 0.056);
          tp.translate(0, 0, -0.028);
          tp.rotateZ(a);
          tips.push(tp);
        }
        /* sleeve, flapping-hinge housing, lag damper and pitch horn */
        var parts = [box(0.74, 0.22, 0.15, 0.62, 0, 0),
                     box(0.34, 0.30, 0.17, 0.30, 0, -0.02),
                     cyl(0.045, 0.045, 0.52, 8, "x", 0.62, 0.20, 0.05),
                     box(0.10, 0.20, 0.05, 0.78, 0.24, -0.04),
                     bar([0.82, 0.24, -0.06], [0.36, 0.20, -0.24], 0.022, 5)];
        for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); (i === 2 ? hubD : hubM).push(parts[i]); }
      }
      mesh(hd, hubM, T.metal, "hub");
      mesh(hd, hubD, T.dark, "hub_dampers");
      mesh(hd, blades, T.blade, "blades");
      if (tips.length) mesh(hd, tips, T.team, "blade_tips");
      /* one upward face is all a camera above the machine ever sees; it also
         casts no shadow (a closed cylinder would lay a solid 16 m disc of
         shadow under a blur that is 95% clear) */
      mesh(hd, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");
    }
    head(H_LO, false, [40, 160, 280]);
    head(H_UP, true, [100, 220, 340]);

    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent: the rotor discs, which are wider than the
   11.3 m hull; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["pact_e80_aswhelo"] = { len: 15.9, build: function (THREE, M, C) { return HeroKa27.build(THREE, M, C, false); } };
UNIT_MODELS["asw_helo_p"]       = { len: 15.9, build: function (THREE, M, C) { return HeroKa27.build(THREE, M, C, true); } };
