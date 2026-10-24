/* ======= ru_ka25.js - HERO model: Kamov Ka-25PL Hormone-A =======
   The Soviet Navy's first shipborne anti-submarine helicopter, for
     pact_e60_aswhelo  "Ka-25PL Hormone-A"  (service 1968; eras.js, e60 only)
   No other row uses this airframe. (The Ka-27 family, its successor, is
   pact_ka27_helix.js.)

   REFERENCES (Wikimedia Commons unless said; fetched at 960 px)
     side     "Soviet Ka-25 Hormone-C (cropped)" - a Ka-25Ts in flight, port
              side, taken from far off, so nearly free of perspective: every
              length below is measured off it, scaled on the published 9.75 m
              fuselage from the radome to the rudder trailing edge (69.7 px a
              metre). The 3.05 m it gives between the wheels agrees with the
              published 3.02 m.
              "Kamov Ka-25PLO Hormone 77 yellow (8027744482)" - a Ka-25PL on
              its wheels, port side, close: heights over the ground (the hub
              at 5.36 m on the 5.37 m published), the PL nose and radome, the
              tail, the gear legs. Lengths NOT taken from it: it is a close
              wide-angle view and stretches the rear half by about 0.5 m.
     front    "Ka-25 Kiev1" (head on): the cowl and intakes, the windscreen,
              the radome width, the 3.5 m main and 1.4 m nose tracks, the leg
              geometry, the toe-in of the outer fins.
     3/4      "Ka-25 Kiev2", "Ka-25 Kiev3" (front-left), "Kamov Ka-25PL,
              Russia - Navy AN2178447" (front-left): the door blisters, the
              lower nose window, the exhaust pipes, the fairing on the rear
              fuselage.
     tail     "Kamov Ka-25PL Kiyv 2019 04" (from the starboard quarter): the
              outer fins with their rudders, the upper and lower centre fin,
              the stabiliser, the fairing on the rear fuselage.
     period   "Sikorsky SH-3D ... near Soviet Kamov Ka-25 over the Norwegian
              Sea, in 1971 (USN 1149842)" and "45RussianChopperJan1970": Soviet
              Ka-25s in their own years, with the flotation-bag packs on all
              four wheels.
     deck     "ARKR Kalinin flight deck with Ka-25 and Ka-27" (blades folded aft).
     text     ru.wikipedia "Ka-25" (design section).
   No three-view of the Ka-25 is on Commons (the only drawing, "Schema Kamow
   Ka-25", is a 227 px sketch), so the stations are photo measurements on the
   published figures, as the brief allows.

   PUBLISHED FIGURES (ru.wikipedia): fuselage 9.75 m, rotors 15.74 m, height
   5.37 m; blades 7.085 m long, 0.37 m chord, three a head; main tyres 600 x
   180, nose 400 x 150; wheelbase 3.02 m, tracks 1.41 m (nose) and 3.50 m
   (main). Kept from the first version: 9.75 m, 15.74 m, 5.37 m, the mast
   4.0 m behind the nose (the in-flight side view gives 3.98 m).
   CORRECTED against the references:
     - the tail is the THREE-fin tail of ru.wikipedia ("a stabiliser, upper
       and lower fins, and two endplate fins with rudders ... set at an angle
       to the fuselage axis"; "trekhkilevoe"). The first version drew four
       fins (two small ones inboard); the two inboard shapes in Kiyv 04 are
       ONE centre fin, above and below the boom, and the outer fins are toed
       in (7 deg, by eye off the head-on Kiev1);
     - the main wheels are 1.75 m out (3.50 m track), not 1.55, and 0.62 m
       behind the mast, not 1.65; the nose wheels 0.70 m out, not 0.66;
     - the blades are the published 0.37 m chord, not 0.46;
     - the flotation gear: ru.wikipedia puts the balloonets ON THE GEAR LEGS
       ("two-section on the nose legs, four-section on the main"), and both
       period photographs show their packs round all four wheels. The first
       version's small cylinders beside the main struts are gone. (They were
       later taken off - 260 kg and much drag - so the museum machines lack
       them; this row is the 1968 aircraft and keeps them.)
     - there is ONE cargo door, sliding, on the PORT side (ru.wikipedia); the
       first version drew door lines on both sides;
     - no naval ensign: the flag decal on the museum '77' is not drawn.

   RECOGNITION LIST (and where each shows)
     1  two coaxial three-blade heads 1.35 m apart on one column, the
        swashplates and control rods between them, the blade-fold hinge on
        each sleeve (Kiev1, '77', ru.wikipedia "on the hubs, the blade
        folding mechanisms")                                    - head()
     2  the short, deep cabin with a flat roof and near-flat sides (all side
        photographs)                                            - FUS loft
     3  the twin-engine cowl on the roof, the two round intakes side by side
        at its front (Kiev1)                                    - NAC loft
     4  a round exhaust pipe out of each side of the cowl, just behind the
        mast ('77', Kiev1)                                      - exhausts
     5  the chin radome ("Initsiativa-2K", from frame 1A to frame 3,
        ru.wikipedia): a fat flat-bottomed tub under the nose ('77', Kiev1,
        Kiev3)                                                  - RAD loft
     6  the two-pane windscreen and the round lower window each side of the
        nose (Kiev1, '77', Kiev3)                               - glass
     7  the big bulged blister in each cockpit door ("two sliding doors with
        large blisters", ru.wikipedia; Kiev3)                   - blisters
     8  the conical boom ending in the three-fin tail: two big toed-in endplate
        fins with rudders, the upper and lower centre fin, the stabiliser
        (ru.wikipedia; Kiyv 04, '77')                           - tail
     9  four fixed wheels, the long raked main legs from high on the cabin
        side with a radius rod and a V under them (Kiev1, '77') - undercarriage
    10  the flotation-bag packs round each wheel, four lobes on a main wheel,
        two on a nose wheel (the 1970 and 1971 photographs, ru.wikipedia)
                                                                - bags
    11  the cylindrical fairing standing on the rear fuselage behind the cowl
        ('77', Kiyv 04, AN2178447)                              - fairing
    12  the red star with a white edge on the outer face of each endplate fin
        ('77', the 1970 and 1971 photographs, Hormone-C)        - fin tiles

   PAINT: the Soviet Navy's light blue-grey. Sampled off the sunlit side of the
   in-flight Hormone-C, 195,207,204, and taken to 0.72 of that: #8c9597. The
   museum colours ('77' bright blue, the Ukrainian teal, the Russian white)
   are repaints and not used. Blades dark grey, as every photograph shows.
   MARKINGS: the star on the fins only. No bort number, no ensign, no titles.
   Team colour: a stripe along the cowl roof, a patch on each stabiliser half
   and a band across each fin top, as the Ka-27 hero has it.

   NOT CONFIRMED, and so not drawn: the dipping sonar (VGS-2) and the MAD bird
   (APM-60) that can replace it are both inside the cabin, lowered through the
   floor (ru.wikipedia) - no photograph shows any housing outside, so the
   belly carries only the weapons-bay doors ("closed by two doors") as seams;
   the starboard emergency hatch (ru.wikipedia gives it a window, but none of
   my photographs is of the starboard side, so only the two cabin windows
   are drawn there); the whip aerials and lights.
   FOLDING BLADES: render3d.js folds only wings ("wingfold"); a "rotor" turns
   and stops where it stops, so a folded blade inside it would point anywhere.
   The blades are therefore drawn spread, with their fold hinges and the fold
   brackets on top of the stabiliser (ru.wikipedia), not folded.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is the
   rotor column axis, 4.0 m behind the nose, and z = 0 is 2.30 m above the
   wheel contact plane. render3d.js stands the model up and rescales it on its
   measured X extent: the 15.74 m rotor discs, which the hull lies inside.

   NAMED NODES
     rotor          TWO, one per head, on the same column, each in a mount
                    turned +PI/2 about X (the asw_helo_fit.js pattern) so its
                    local +Y runs up the column; render3d.js turns the second
                    head the other way, as a Kamov's contra-rotating pair.
     rotordisc      one inside each head, transparent, depthWrite off.
     undercarriage  the four wheels: FIXED gear ("four-leg, not retracting in
                    flight", ru.wikipedia), so NOT "gear" (render3d hides a
                    "gear" node above 18 m). The tyres are the lowest solid
                    part, so a parked machine stands on them.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKa25 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  var GROUND  = -2.30;                     /* wheel contact plane         */
  function Z(h) { return GROUND + h; }     /* height above ground -> z    */
  function XN(d) { return 4.0 - d; }       /* metres behind the nose -> x */
  var ROTOR_R = 7.87;                      /* 15.74 m discs               */
  var H_LO = 3.80, H_UP = 5.15;            /* the two blade planes        */
  var NAC_Y = 0.42, NAC_H = 3.33;          /* engine nacelles             */
  var FIN_Y = 1.45, FIN_TOE = 7 * D2R;     /* outer fins, toed in         */
  var STAB_H = 2.06;                       /* stabiliser mid-plane        */

  /* the endplate fin outline (x, height above ground), off '77' and the
     Hormone-C: the leading edge upright, rounded corners, a flat top, the
     rudder the aft 44% of the chord */
  var FIN = [[-4.37, 1.42], [-4.46, 1.27], [-5.05, 1.24], [-5.66, 1.31], [-5.75, 1.44],
             [-5.76, 2.84], [-5.69, 2.96], [-5.10, 3.01], [-4.48, 3.01], [-4.38, 2.90]];
  var RUD_X = -5.15;                       /* rudder hinge line           */
  /* the centre fin above and below the boom end (Kiyv 04, '77') */
  var CFIN_UP = [[-4.42, 2.20], [-5.22, 2.20], [-5.20, 2.80], [-5.08, 2.94], [-4.62, 2.94], [-4.48, 2.84]];
  var CFIN_LO = [[-4.48, 1.96], [-5.22, 1.96], [-5.20, 1.36], [-5.08, 1.24], [-4.66, 1.24], [-4.52, 1.34]];

  /* =================================================== the painted skin ===
     One 1024 x 1280 sheet in five 256-pixel rows:
        row 0  TOP        x across, y down the band (port at the top)
        row 1  PORT side  x across, z down the band
        row 2  STARBOARD  x across, z down the band
        row 3  BELLY      x across, y down the band
        row 4  the FIN tiles: outer face with the star (left), inner (right)
     projUV() picks the row from each triangle's face normal; the fins carry
     their own UVs. */
  var TW = 1024, TH = 1280, BAND = 256;
  var UX0 = -5.95, UX1 = 4.10;             /* x covered across the sheet  */
  var QY = 1.9;                            /* |y| covered by top/belly    */
  var QZ0 = Z(0.55), QZ1 = Z(3.80);        /* z covered by the side rows  */
  var FX0 = -5.85, FX1 = -4.30;            /* fin tile: x range           */
  var FZ0 = Z(1.15), FZ1 = Z(3.10);        /*           z range           */
  function pxX(x)       { return (x - UX0) / (UX1 - UX0) * TW; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }
  /* a box of the side row b from x0..x1 (aft..fore) and heights h0..h1 */
  function sideRect(b, x0, x1, h0, h1) {
    var py = pySide(Z(h1), b);
    return [pxX(x0), py, pxX(x1) - pxX(x0), pySide(Z(h0), b) - py];
  }

  var PAINT = { base: "#8c9597", belly: "#97a0a2" };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* the Soviet star: red with a white edge */
  function star(g, cx, cy, r) {
    function path(rr) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? rr * 0.40 : rr;
        var x = cx + Math.cos(a) * q, y = cy + Math.sin(a) * q;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#d9dcd8"; path(r * 1.16); g.fill();
    g.fillStyle = "#a8271f"; path(r); g.fill();
  }

  function skinCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(2525);
    var i, b, x, y, r;

    g.fillStyle = PAINT.base; g.fillRect(0, 0, TW, TH);
    g.fillStyle = PAINT.belly; g.fillRect(0, 3 * BAND, TW, BAND);

    /* ---- weathering: salt streaks down the sides, a little sun on top ---- */
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

    /* ---- frames and rivet rows ('77': close frames on the cabin, the
       boom in rings) ---- */
    var frames = [XN(0.55), XN(1.20), XN(1.62), XN(2.55), XN(3.05), XN(3.50), XN(4.05), XN(4.45),
                  XN(5.10), XN(5.65), XN(6.05), XN(6.60), XN(7.15), XN(7.70), XN(8.25)];
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
    /* the seam where the cowl sits on the cabin roof, the long stringers
       and the cowl's own lower seam ('77') */
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.8;
    [3.08, 2.20, 1.55, 1.05].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(pxX(XN(8.3)), yy); g.lineTo(pxX(XN(0.6)), yy); g.stroke();
      }
    });
    [-NAC_Y, 0, NAC_Y, -0.72, 0.72].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(XN(6.0)), yy); g.lineTo(pxX(XN(1.9)), yy); g.stroke();
    });
    g.lineWidth = 1.2;
    for (i = 0; i < 60; i++) {
      var hx = R() * TW, hy = BAND + R() * 2 * BAND, hw = 12 + R() * 30, hh = 9 + R() * 18;
      g.strokeStyle = "rgba(0,0,0,0.28)"; g.strokeRect(hx, hy, hw, hh);
    }

    function frame(rr, w, a) {
      g.strokeStyle = "rgba(0,0,0," + (a || 0.55) + ")"; g.lineWidth = w || 2.2;
      g.strokeRect(rr[0], rr[1], rr[2], rr[3]);
    }
    function vent(rr, n) {
      g.fillStyle = "rgba(16,20,22,0.85)";
      for (var k = 0; k < n; k++) g.fillRect(rr[0] + (k + 0.2) * rr[2] / n, rr[1], rr[2] / n * 0.5, rr[3]);
    }
    /* ---- doors, hatches and vents ---- */
    for (b = 1; b <= 2; b++) {
      /* the sliding cockpit door, each side; its blister is glass */
      frame(sideRect(b, XN(2.55), XN(1.55), 1.85, 3.00));
      /* cowl panels and the louvres behind the exhaust ('77') */
      frame(sideRect(b, XN(5.75), XN(2.35), 3.12, 3.62), 1.6, 0.40);
      vent(sideRect(b, XN(4.95), XN(4.65), 3.30, 3.52), 4);
      vent(sideRect(b, XN(5.40), XN(5.05), 3.24, 3.46), 4);
      /* hatches on the rear cabin and the boom */
      [[XN(6.70), XN(6.15), 1.60, 2.35], [XN(7.70), XN(7.20), 1.80, 2.30]].forEach(function (h) {
        frame(sideRect(b, h[0], h[1], h[2], h[3]), 1.6, 0.42);
      });
      /* the step plates under the cockpit door */
      g.fillStyle = "rgba(20,22,24,0.55)";
      r = sideRect(b, XN(2.20), XN(1.95), 1.30, 1.40); g.fillRect(r[0], r[1], r[2], r[3]);
    }
    /* the one cargo door: sliding, port side (ru.wikipedia; the Hormone-C,
       door open, gives its 1.2 m width) */
    frame(sideRect(1, XN(5.62), XN(4.42), 1.30, 2.95));
    g.fillStyle = "rgba(20,20,20,0.7)"; r = sideRect(1, XN(4.60), XN(4.52), 2.00, 2.10);
    g.fillRect(r[0], r[1], r[2], r[3]);
    /* the door's rail along its top */
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(pxX(XN(6.40)), pySide(Z(3.02), 1)); g.lineTo(pxX(XN(4.42)), pySide(Z(3.02), 1)); g.stroke();

    /* ---- belly: the weapons bay under the cabin floor, two doors ---- */
    g.strokeStyle = "rgba(0,0,0,0.38)"; g.lineWidth = 1.6;
    g.strokeRect(pxX(XN(5.30)), pyBelly(0.40), pxX(XN(2.70)) - pxX(XN(5.30)), pyBelly(-0.40) - pyBelly(0.40));
    g.beginPath(); g.moveTo(pxX(XN(5.30)), pyBelly(0)); g.lineTo(pxX(XN(2.70)), pyBelly(0)); g.stroke();
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.beginPath(); g.moveTo(x, 3 * BAND); g.lineTo(x, 4 * BAND); g.stroke();
    }

    /* ---- the fin tiles. Tile A is the outer face: the rudder hinge line,
       riveted ribs, the star. Tile B the inner face, plain. ---- */
    function fx(xm) { return 8 + (xm - FX0) / (FX1 - FX0) * 240; }
    function fy(h)  { return 4 * BAND + 8 + (FZ1 - Z(h)) / (FZ1 - FZ0) * 240; }
    for (b = 0; b < 2; b++) {
      var ox = b * 256;
      g.strokeStyle = "rgba(0,0,0,0.38)"; g.lineWidth = 1.8;
      g.beginPath(); g.moveTo(ox + fx(RUD_X), 4 * BAND); g.lineTo(ox + fx(RUD_X), 5 * BAND); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 4 * BAND + 4; y < 5 * BAND; y += 7) g.fillRect(ox + fx(RUD_X) + 4, y, 1.6, 1.6);
      g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
      /* the rudder's fabric ribs and the fin's stringers ('77', Kiyv 04) */
      for (h = 1.40; h < 3.0; h += 0.16) {
        g.beginPath(); g.moveTo(ox + fx(RUD_X) + 3, fy(h)); g.lineTo(ox + fx(-5.74), fy(h)); g.stroke();
      }
      [1.75, 2.35].forEach(function (hh) {
        g.beginPath(); g.moveTo(ox + fx(-4.40), fy(hh)); g.lineTo(ox + fx(RUD_X) - 2, fy(hh)); g.stroke();
      });
      g.fillStyle = "rgba(0,0,0,0.45)";
      [1.55, 2.70].forEach(function (hh) { g.fillRect(ox + fx(RUD_X) - 8, fy(hh) - 3, 12, 6); });
    }
    var h;
    star(g, fx(-5.12), fy(2.12), 0.40 * 123);
    return cv;
  }

  var _cv = null, _tex;                    /* module scope: one sheet     */
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    try {
      if (!_cv) _cv = skinCanvas();
      _tex = new V.CanvasTexture(_cv);
      _tex.wrapS = _tex.wrapT = V.ClampToEdgeWrapping;
      _tex.anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) _tex.encoding = V.sRGBEncoding;
    } catch (e) { _tex = false; }
    return _tex;
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
  function makeMats(C) {
    var tex = skinTexture();
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x8c9597);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 });
    m.blade  = new V.MeshStandardMaterial({ color: 0x3a3e40, roughness: 0.80, metalness: 0.10 });
    /* the tyres, and the rubberised fabric of the flotation-bag packs */
    m.rubber = new V.MeshStandardMaterial({ color: 0x232524, roughness: 0.95, metalness: 0.02 });
    /* the panes lie 20 mm off the skin and take a polygon offset */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x20343a, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05,
                                            polygonOffset: true, polygonOffsetFactor: -1,
                                            polygonOffsetUnits: -2 });
    /* The flash is exactly C.team; the emissive keeps it from greying out
       under ACES. */
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
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "ka25";
    var i, k, s, a;

    var skin = [], glass = [], dark = [], metal = [], team = [];

    /* --------------------------------------------------- the fuselage ----
       Stations in metres behind the nose (XN), heights above the ground:
       the nose cap 0.3 m behind the radome's front, the windscreen from
       1.25 to 1.80 m (base 2.50 m up, top 3.00 m), the flat cabin roof at
       3.02 m, the belly 0.86 m up, the cabin 1.72 m wide; from 6.0 m the
       hull tapers into the conical boom, which ends at 9.0 m ('77', the
       Hormone-C, Kiev1).
                x          zb    zt    zm    wb    wm    wt    e          */
    var FUS = [
      sec(XN(0.30), 1.58, 2.06, 1.82, 0.12, 0.16, 0.10, 0.80),
      sec(XN(0.40), 1.38, 2.20, 1.80, 0.32, 0.42, 0.28, 0.70),
      sec(XN(0.65), 1.16, 2.35, 1.80, 0.52, 0.62, 0.46, 0.60),
      sec(XN(1.00), 1.00, 2.47, 1.82, 0.66, 0.76, 0.58, 0.50),
      sec(XN(1.30), 0.92, 2.58, 1.84, 0.72, 0.83, 0.66, 0.46),
      sec(XN(1.55), 0.89, 2.84, 1.85, 0.74, 0.85, 0.70, 0.44),
      sec(XN(1.80), 0.87, 3.00, 1.86, 0.74, 0.86, 0.72, 0.42),
      sec(XN(2.40), 0.86, 3.02, 1.86, 0.74, 0.86, 0.72, 0.42),
      sec(XN(4.00), 0.86, 3.02, 1.86, 0.74, 0.86, 0.72, 0.42),
      sec(XN(5.60), 0.86, 3.02, 1.86, 0.73, 0.85, 0.72, 0.42),
      sec(XN(6.00), 0.94, 2.98, 1.90, 0.66, 0.79, 0.66, 0.45),
      sec(XN(6.50), 1.20, 2.82, 1.98, 0.48, 0.60, 0.46, 0.55),
      sec(XN(7.00), 1.48, 2.62, 2.04, 0.33, 0.42, 0.32, 0.68),
      sec(XN(7.80), 1.66, 2.46, 2.06, 0.24, 0.30, 0.23, 0.80),
      sec(XN(8.60), 1.80, 2.32, 2.06, 0.18, 0.22, 0.17, 0.85),
      sec(XN(9.00), 1.88, 2.24, 2.06, 0.13, 0.16, 0.12, 0.88),
    ];
    skin = skin.concat(loft(FUS, 22, 0.05, 0.10));
    var HULL = triList(skin[0]);

    /* the chin radome: a fat, flat-bottomed tub from the very front to 1.85 m
       behind it, 1.26 m wide, its bottom 0.64 m off the ground ('77', Kiev1) */
    var RAD = [
      sec(XN(0.02), 0.94, 1.22, 1.08, 0.16, 0.22, 0.15, 0.80),
      sec(XN(0.14), 0.75, 1.38, 1.05, 0.40, 0.48, 0.38, 0.68),
      sec(XN(0.38), 0.66, 1.48, 1.02, 0.54, 0.62, 0.52, 0.60),
      sec(XN(0.80), 0.64, 1.50, 1.00, 0.56, 0.63, 0.54, 0.58),
      sec(XN(1.25), 0.66, 1.42, 0.98, 0.52, 0.60, 0.52, 0.60),
      sec(XN(1.60), 0.74, 1.22, 0.95, 0.40, 0.48, 0.42, 0.70),
      sec(XN(1.85), 0.84, 1.06, 0.94, 0.20, 0.26, 0.22, 0.80),
    ];
    skin = skin.concat(loft(RAD, 18, 0.03, 0.04));

    /* ---------------------------------------------- engine nacelles ----
       Two GTD-3F engines side by side on the roof, 0.84 m between their
       centres (Kiev1), the intakes facing forward 2.05 m behind the nose,
       the cowl roof level at 3.64 m to 5.6 m behind the nose and falling
       steeply to the hull at 6.05 m ('77'). */
    var NAC = [
      [XN(2.02), 3.02, 3.62, NAC_H, 0.300, 0.305, 0.290, 1.00],
      [XN(2.30), 2.98, 3.65, NAC_H, 0.320, 0.335, 0.300, 0.90],
      [XN(3.40), 2.96, 3.66, NAC_H, 0.320, 0.345, 0.305, 0.80],
      [XN(5.30), 2.96, 3.64, 3.31, 0.320, 0.345, 0.300, 0.80],
      [XN(5.70), 2.96, 3.55, 3.26, 0.300, 0.330, 0.280, 0.80],
      [XN(5.95), 2.96, 3.25, 3.10, 0.240, 0.270, 0.220, 0.85],
      [XN(6.05), 2.96, 3.06, 3.01, 0.120, 0.140, 0.100, 0.90],
    ];
    for (s = -1; s <= 1; s += 2) {
      skin = skin.concat(loft(NAC.map(function (q) {
        return sec(q[0], q[1], q[2], q[3], q[4], q[5], q[6], q[7], s * NAC_Y);
      }), 14, null, 0.04));
    }
    /* the saddle between the nacelles, a little below their crowns */
    skin = skin.concat(loft([
      sec(XN(2.10), 2.98, 3.52, 3.25, 0.22, 0.25, 0.20, 0.80),
      sec(XN(5.60), 2.98, 3.56, 3.25, 0.22, 0.25, 0.20, 0.80),
      sec(XN(6.00), 2.96, 3.20, 3.08, 0.16, 0.18, 0.14, 0.85),
    ], 8, 0.06, 0.05));
    /* the column fairing where the mast leaves the cowl */
    skin.push(cyl(0.34, 0.44, 0.22, 18, "z", 0, 0, Z(3.70)));
    /* the intakes: a skin lip, a dark mouth, the engine's own bullet */
    for (s = -1; s <= 1; s += 2) {
      skin.push(place(new V.RingGeometry(0.21, 0.305, 24), XN(2.015), s * NAC_Y, Z(NAC_H), 0, PI / 2, 0));
      metal.push(cyl(0.215, 0.215, 0.06, 24, "x", XN(2.04), s * NAC_Y, Z(NAC_H), true));
      dark.push(place(new V.CircleGeometry(0.21, 24), XN(2.06), s * NAC_Y, Z(NAC_H), 0, PI / 2, 0));
      metal.push(sph(0.085, 10, 8, XN(2.08), s * NAC_Y, Z(NAC_H), 1.3, 1, 1));
    }
    /* the exhausts: a round pipe out of each side of the cowl, 0.25-0.6 m
       behind the column, standing well proud ('77'; Kiev1: out to 0.95 m),
       pointing outboard and 30 deg aft, with a black mouth. Built for port,
       mirrored. */
    var EXA = 30 * D2R, edx = -Math.sin(EXA), edy = Math.cos(EXA);
    var em = [XN(4.38), 0.95, Z(3.40)];
    var exS = new V.CylinderGeometry(0.24, 0.24, 0.46, 22, 1, true);   /* axis local y */
    exS.rotateZ(EXA); exS.translate(em[0] - edx * 0.23, em[1] - edy * 0.23, em[2]);
    both(metal, exS);
    var exL = new V.RingGeometry(0.19, 0.25, 22);                        /* the lip     */
    exL.rotateX(-PI / 2); exL.rotateZ(EXA); exL.translate(em[0], em[1], em[2]);
    both(metal, exL);
    var exM = new V.CircleGeometry(0.19, 22);
    exM.rotateX(-PI / 2); exM.rotateZ(EXA); exM.translate(em[0] - edx * 0.05, em[1] - edy * 0.05, em[2]);
    both(dark, exM);
    /* the fairing that stands on the rear fuselage behind the cowl: a
       cylinder with a collar and a domed cap ('77', Kiyv 04, AN2178447) */
    skin.push(cyl(0.19, 0.20, 0.42, 16, "z", XN(6.62), 0, Z(2.98)));
    skin.push(sph(0.19, 16, 8, XN(6.62), 0, Z(3.19), 1, 1, 0.55));
    metal.push(cyl(0.215, 0.215, 0.05, 16, "z", XN(6.62), 0, Z(3.06)));

    /* ---------------------------------------------------------- tail ----
       The stabiliser across the boom end at 2.06 m, 0.70 m chord; an
       endplate fin at each tip, toed in; the centre fin above and below the
       boom; the two blade-fold brackets on top of the stabiliser
       (ru.wikipedia); the tail light. */
    var stab = M.slab(V, [[-4.40, -1.42], [-5.12, -1.42], [-5.14, -0.20], [-5.14, 0.20],
                          [-5.12, 1.42], [-4.40, 1.42], [-4.34, 0.20], [-4.34, -0.20]], 0.07);
    stab.translate(0, 0, Z(STAB_H) - 0.035);
    skin.push(stab);
    var pivotZ = Z(STAB_H), finMidX = -5.06;
    var fin = M.slab(V, FIN.map(function (q) { return [q[0], Z(q[1])]; }), 0.10, "xz");
    fin.translate(-finMidX, 0.05, 0);
    fin.rotateZ(-FIN_TOE);                 /* leading edge inboard          */
    fin.translate(finMidX, FIN_Y, 0);
    fin = finUV(fin, 1);
    both(skin, fin);
    var cfu = M.slab(V, CFIN_UP.map(function (q) { return [q[0], Z(q[1])]; }), 0.07, "xz");
    cfu.translate(0, 0.035, 0); skin.push(cfu);
    var cfl = M.slab(V, CFIN_LO.map(function (q) { return [q[0], Z(q[1])]; }), 0.07, "xz");
    cfl.translate(0, 0.035, 0); skin.push(cfl);
    for (s = -1; s <= 1; s += 2) {
      metal.push(box(0.10, 0.06, 0.14, -4.80, s * 0.72, Z(STAB_H) + 0.10));    /* fold bracket */
      metal.push(box(0.16, 0.08, 0.03, -4.80, s * 0.72, Z(STAB_H) + 0.17));
    }
    dark.push(sph(0.06, 8, 6, XN(9.06), 0, Z(2.06), 1.2, 1, 1));            /* tail light */

    /* ----------------------------------------------------- glazing ----- */
    /* the windscreen: two curved panes either side of an 8 cm post, from
       2.50 to 3.00 m up, raked 45 deg (Kiev1, '77') */
    var SL = 45 * D2R, n0 = [Math.sin(SL), 0, Math.cos(SL)], sv = [-Math.cos(SL), 0, Math.sin(SL)];
    var screen = pane(HULL, 6, 6, function (fu, fv) {
      var vv = -0.32 + 0.66 * fv, y = 0.04 + (0.62 - 0.05 * fv - 0.04) * fu;
      return [[XN(1.50) + vv * sv[0] + 2.5 * n0[0], y, Z(2.74) + vv * sv[2] + 2.5 * n0[2]],
              [-n0[0], 0, -n0[2]]];
    }, 0.025);
    if (screen) both(glass, screen);
    /* where the screen wraps round the corner onto the side, back to the
       door post ('77': the screen reads as a tall pane from the side) */
    var quarter = pane(HULL, 4, 5, function (fu, fv) {
      var x = XN(1.60) + (0.06 + 0.30 * (1 - fv)) * fu, h = 2.47 + 0.31 * fv;
      return [[x, 3.0, Z(h)], [0, -1, 0]];
    }, 0.025);
    if (quarter) both(glass, quarter);
    /* the round lower window on each side of the nose ('77', Kiev3) */
    var low = pane(HULL, 5, 5, function (fu, fv) {
      /* the square grid squeezed onto an oval 0.40 x 0.54 m */
      var u = 2 * fu - 1, w = 2 * fv - 1;
      var ex = u * Math.sqrt(1 - w * w / 2), ez = w * Math.sqrt(1 - u * u / 2);
      return [[XN(1.00) + 0.20 * ex, 3.0, Z(2.06 + 0.27 * ez)], [0, -1, 0]];
    }, 0.02);
    if (low) both(glass, low);
    /* the cabin windows: one small one ahead of the door each side, and the
       one in the cargo door (port) / the hatch (starboard) */
    [[XN(3.40), XN(3.65), 2.58, 2.84], [XN(4.75), XN(5.12), 2.42, 2.80]].forEach(function (w) {
      var cw = pane(HULL, 2, 2, function (fu, fv) {
        return [[w[0] + (w[1] - w[0]) * fu, 3.0, Z(w[2] + (w[3] - w[2]) * fv)], [0, -1, 0]];
      }, 0.02);
      if (cw) both(glass, cw);
    });
    /* the blister in each cockpit door: a bulged pane 0.80 x 0.62 m, 0.12 m
       proud (Kiev3, ru.wikipedia "large blisters") */
    for (s = -1; s <= 1; s += 2) {
      glass.push(sph(1, 14, 8, XN(2.06), s * 0.80, Z(2.58), 0.40, 0.17, 0.31));
      metal.push(sph(1, 14, 8, XN(2.06), s * 0.79, Z(2.58), 0.43, 0.15, 0.34));   /* its frame */
    }

    /* ----------------------------------------------------- team flash --- */
    for (s = -1; s <= 1; s += 2) {
      team.push(box(2.30, 0.12, 0.02, XN(4.20), s * NAC_Y, Z(3.665)));
      team.push(box(0.44, 0.80, 0.02, -4.76, s * 0.62, Z(STAB_H) + 0.046));
      var tb = box(0.90, 0.02, 0.16, finMidX + 0.30, 0, Z(2.86));
      tb.translate(-finMidX, 0, 0); tb.rotateZ(-FIN_TOE); tb.translate(finMidX, FIN_Y + 0.062, 0);
      team.push(s > 0 ? tb : mirrorY(tb));
    }

    /* ----------------------------------------------- the undercarriage ---
       FIXED, four wheels. The main legs: a long raked oleo from the cabin
       side 2.70 m up, just under the cowl, to a 600 x 180 tyre 1.75 m out
       and 0.62 m behind the column, a radius rod across at 1.5 m and a V
       of two struts from the belly to the axle (Kiev1, '77'). The nose legs: an upright oleo to
       each 400 x 150 tyre, 0.70 m out, 3.02 m ahead of the mains, braced
       back to the belly. Round every wheel, the packed flotation bags, four
       lobes on a main wheel and two on a nose wheel (the 1970 and 1971
       photographs; ru.wikipedia "two-section front, four-section rear"). */
    var uc = new V.Group();
    uc.name = "undercarriage";
    g.add(uc);
    var tyres = [], bags = [];
    var XM = -0.62, XNW = XM + 3.02;
    for (s = -1; s <= 1; s += 2) {
      tyres.push(cyl(0.30, 0.30, 0.18, 22, "y", XM, s * 1.75, Z(0.30)));
      metal.push(cyl(0.17, 0.17, 0.20, 14, "y", XM, s * 1.75, Z(0.30)));
      metal.push(cyl(0.05, 0.05, 0.30, 8, "y", XM, s * 1.60, Z(0.30)));                  /* axle */
      skin.push(bar([0.02, s * 0.88, Z(2.70)], [XM + 0.02, s * 1.62, Z(0.62)], 0.065, 8)); /* oleo */
      metal.push(bar([XM + 0.15, s * 1.46, Z(1.10)], [XM, s * 1.62, Z(0.30)], 0.048, 6));   /* slide */
      skin.push(bar([0.20, s * 0.86, Z(1.55)], [XM + 0.26, s * 1.31, Z(1.48)], 0.036, 6)); /* rod */
      skin.push(bar([-0.18, s * 0.55, Z(0.88)], [XM, s * 1.55, Z(0.32)], 0.034, 6));
      skin.push(bar([-1.10, s * 0.55, Z(0.92)], [XM, s * 1.55, Z(0.32)], 0.034, 6));
      /* the four-lobe pack round the main wheel */
      [[0.30, 0.15], [0.30, -0.15], [-0.30, 0.15], [-0.30, -0.15]].forEach(function (q) {
        bags.push(sph(1, 8, 6, XM + q[0], s * (1.75 + q[1]), Z(0.44), 0.24, 0.13, 0.17));
      });
      bags.push(cyl(0.12, 0.12, 0.62, 10, "x", XM, s * 1.75, Z(0.56)));
      /* the nose leg, its tyre and brace, and the two-lobe pack */
      tyres.push(cyl(0.20, 0.20, 0.15, 18, "y", XNW, s * 0.70, Z(0.20)));
      metal.push(cyl(0.11, 0.11, 0.17, 12, "y", XNW, s * 0.70, Z(0.20)));
      metal.push(bar([XNW + 0.04, s * 0.60, Z(1.30)], [XNW, s * 0.60, Z(0.20)], 0.045, 6));
      metal.push(cyl(0.035, 0.035, 0.18, 6, "y", XNW, s * 0.66, Z(0.20)));
      skin.push(bar([XNW, s * 0.60, Z(0.32)], [XNW - 0.60, s * 0.36, Z(0.92)], 0.030, 5));
      [0.22, -0.22].forEach(function (q) {
        bags.push(sph(1, 8, 6, XNW + q, s * 0.70, Z(0.32), 0.16, 0.12, 0.13));
      });
    }
    mesh(uc, tyres.concat(bags), T.rubber, "tyres");

    /* ================================================ the coaxial column ==
       The fixed parts: the shaft between the heads, the swashplate rings
       and three control rods. */
    for (k = 0; k < 3; k++) {
      a = k * PI * 2 / 3 + 0.4;
      metal.push(bar([Math.cos(a) * 0.30, Math.sin(a) * 0.30, Z(4.02)],
                     [Math.cos(a) * 0.30, Math.sin(a) * 0.30, Z(5.05)], 0.022, 5));
    }
    metal.push(cyl(0.13, 0.13, 1.40, 12, "z", 0, 0, Z(4.53)));
    metal.push(cyl(0.30, 0.30, 0.05, 18, "z", 0, 0, Z(4.22)));
    metal.push(cyl(0.26, 0.26, 0.05, 18, "z", 0, 0, Z(4.64)));
    metal.push(cyl(0.33, 0.33, 0.06, 18, "z", 0, 0, Z(4.06)));
    metal.push(cyl(0.18, 0.22, 0.10, 14, "z", 0, 0, Z(3.78)));

    /* ----------------------------------------------------- airframe ----- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");

    /* ======================================================== the heads ==
       The same mount as asw_helo_fit.js: +PI/2 about X points the node's
       local +Y up the column, and the inner group turned -PI/2 puts the head
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
      var hubM = [], blades = [], j;
      hubM.push(cyl(0.24, 0.29, 0.30, 16, "z", 0, 0, 0));
      hubM.push(cyl(0.35, 0.35, 0.05, 16, "z", 0, 0, -0.17));
      if (upper) hubM.push(cyl(0.08, 0.19, 0.14, 12, "z", 0, 0, 0.15));   /* cap: top at 5.37 m */
      else hubM.push(cyl(0.19, 0.19, 0.05, 16, "z", 0, 0, 0.18));
      /* blade outline, blade along +X: the root at 0.80 m, rectangular, the
         published 0.37 m chord, square tip with the corners cut */
      var BP = [[0.80, -0.185], [7.74, -0.185], [ROTOR_R, -0.09], [ROTOR_R, 0.09],
                [7.74, 0.185], [0.80, 0.185]];
      for (j = 0; j < 3; j++) {
        a = azs[j] * D2R;
        var bl = M.slab(V, BP, 0.045);
        bl.translate(0, 0, -0.022);
        bl.rotateZ(a);
        blades.push(bl);
        /* sleeve, the blade-fold hinge (an upright pin housing with its
           lugs), the flapping-hinge housing, lag damper and pitch horn */
        var parts = [box(0.42, 0.20, 0.14, 0.42, 0, 0),
                     cyl(0.085, 0.085, 0.22, 8, "z", 0.68, 0, 0),
                     box(0.16, 0.24, 0.05, 0.68, 0, 0.09),
                     box(0.16, 0.24, 0.05, 0.68, 0, -0.09),
                     box(0.14, 0.22, 0.12, 0.84, 0, 0),
                     box(0.32, 0.28, 0.16, 0.26, 0, -0.02),
                     cyl(0.042, 0.042, 0.46, 8, "x", 0.50, 0.18, 0.05),
                     box(0.10, 0.18, 0.05, 0.62, 0.21, -0.04),
                     bar([0.66, 0.21, -0.06], [0.34, 0.19, -0.24], 0.022, 5)];
        for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hubM.push(parts[i]); }
      }
      mesh(hd, hubM, T.metal, "hub");
      mesh(hd, blades, T.blade, "blades");
      /* one upward face, no shadow */
      mesh(hd, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");
    }
    head(H_LO, false, [40, 160, 280]);
    head(H_UP, true, [100, 220, 340]);

    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent: the rotor discs, which are wider than the
   9.75 m hull; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["pact_e60_aswhelo"] = { len: 15.74, build: function (THREE, M, C) { return HeroKa25.build(THREE, M, C); } };
