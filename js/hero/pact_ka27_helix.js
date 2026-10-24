/* ======= pact_ka27_helix.js - HERO models: the Kamov Ka-27 Helix family =======
   The coaxial shipborne helicopter of the Soviet and Russian navies, drawn for
   the three rows that are this airframe:
     pact_e80_aswhelo  "Ka-27PL Helix"  Ka-27PL, Soviet Navy, 1981-1991
     asw_helo_p        "Ka-27 Helix"    Ka-27PL, Russian Navy, 1991 to date
     pact_e80_ka29     "Ka-29 Helix-B"  Ka-29TB assault transport, 1987 on
   (pact_e60_aswhelo is the Ka-25PL Hormone, a different airframe, in
   ru_ka25.js.) The two PL rows differ only in the star on the fins; the
   airframe, the radome and the grey are the same in the photographs of both
   periods. The Ka-29 is its own nose, glazing, gun, outriggers and paint on
   the same hull, tail, engines and rotors.

   REFERENCES (Wikimedia Commons unless said)
     drawing  "Kamov Ka-27 orthographical image.svg" (three-view, rendered at
              960 px): every station below is measured off it, scaled on the
              11.30 m fuselage from the nose to the fin trailing edge
              (35.3 px a metre; the front view, on the published 3.50 m main
              track, agrees within 3%).
     PL       "Admiral Vinogradov - Ka-27 Helicopter Left Side View", "- Front
              View", "- Rear Left Side", "- Rear Right Side" (Manila);
              "Kamov Ka-27PL Helix A, Ukraine - Navy JP7212140"; "Ka-27 helo
              near USS Enterprise (CVN-65) 1988" (a Soviet machine in its
              period, black and white).
     Ka-29    "Kamov Ka-29 '16 yellow'" (24221036478, 24221038748: starboard),
              "ParkPatriot2015part9-04" ('62', port, outriggers fitted),
              "NavalFlyingAce2018-10" (from below, outriggers and pods),
              "Kamov Ka-29 in 2010" (head on, outriggers), "Ka-29
              (6220421634)" (from behind), "Kamov Ka-29 in 1990 (zoomed in)"
              (a Soviet machine in its period).
     text     ru.wikipedia "Ka-27" and "Ka-29"; en.wikipedia "Kamov Ka-27".

   SOURCED FACTS kept from the first version: rotors 15.90 m, two
   three-blade heads 1.40 m apart on one mast, height 5.40 m to the top of
   the head; main tyres 620 x 180; main track 3.50 m, nose track 1.40 m,
   wheelbase 3.02 m; two TV3-117V engines side by side on the roof, each with
   its round intake and a squared oval exhaust on the outer flank; no tail
   rotor, a twin-fin tail on a stabiliser.
   CORRECTED here, against the drawing and the photographs:
     - the hull was drawn 0.25 m too tall: the cabin roof is 2.50 m over the
       ground and the cowl roof 3.36 m (drawing 3.30, the '16' side view
       3.36), not 2.76 and 3.45; the lower blade plane 3.65 m, not 3.80;
     - the fins stand 1.55 m either side of the centreline (top and front
       views), not 1.85, and from 9.57 to 11.30 m behind the nose;
     - the cowl roof falls to the boom from 6.35 m behind the nose, not 7.5;
     - the Ka-27 has ONE cabin door, a sliding door on the PORT side aft
       (ru.wikipedia: "for the cargo cabin, a sliding door on the left side
       at the rear"; the drawing puts it behind the main leg). The first
       version drew one on each side;
     - the PL's anti-submarine stores and its dipping sonar ARE in bays in
       the belly (ru.wikipedia: under the cabin floor, frames 4-14, the
       weapons bay, closed by a pair of doors; frames 14-16, the bay of the
       VGS-3 "Ros-V" dipping sonar, also with a pair of doors). Nothing of
       either hangs outside, so they are drawn as their two pairs of doors;
     - the bort number "68" is gone (no bort numbers on these models), and
       the fixed undercarriage is no longer named "gear" (it stays down in
       flight: "four-leg, non-retracting", ru.wikipedia).

   RECOGNITION LIST (and where each shows)
     1  coaxial three-blade heads 1.40 m apart, swashplates and rods between
        (drawing side view; every photograph)                     - the mast
     2  short, deep, flat-sided hull, cabin roof level with the cockpit
        (drawing)                                                - FUS loft
     3  the two engines side by side on the roof, round intakes facing
        forward, the flat cowl roof falling to the boom (drawing, front
        photographs)                                             - NAC loft
     4  the big squared exhaust on each outer flank with its soot panel
        (Vinogradov left side)                                  - exhausts
     5  a short boom, the stabiliser and the two big rounded fins at its
        tips, the rudder line, the ventral fin and the bracing tubes
        (drawing, "Rear Left Side", "Ka-29 (6220421634)")           - tail
     6  four fixed wheels: long raked main legs from high on the side, small
        twin nose wheels (drawing, all side photographs)    - undercarriage
     PL only
     7  the big chin radome under the nose ("Initsiativa-2KM", ru.wikipedia;
        Vinogradov front, Ukrainian PL)                           - radome
     8  the two-pane curved windscreen and the lower nose windows above the
        radome (drawing, Ukrainian PL)                             - glass
     9  the weapons-bay and sonar-bay doors in the belly (ru.wikipedia)
                                                              - belly paint
    10  the flotation-bag covers low on the sides (ru.wikipedia "balloonets
        low on the fuselage sides, under hinged covers"; the cover box on the
        Ukrainian PL's port side)                                  - covers
     Ka-29 only
    11  the nose widened 0.5 m and flat-fronted, with THREE flat armoured
        windscreen panes ("widened by 500 mm ... three flat armoured glasses
        instead of two of double curvature", ru.wikipedia "Ka-29"; the 2010
        head-on photograph shows the three)                   - KA29 nose
    12  the 9A622 gun on the starboard side of the nose, behind the armoured
        flap that closes its port when stowed (ru.wikipedia); the flap is
        drawn shut, as in every photograph                        - gunflap
    13  the pod on the port side of the lower nose ('62', '16', the 2010
        head-on view), and the pitot boom on the starboard nose ('16')
    14  the two side trusses with four beam racks ("two side trusses of
        external stores with four beam racks", ru.wikipedia; '62', 2010,
        NavalFlyingAce): drawn empty, as the row carries no weapons
                                                              - outriggers
    15  the double troop doors on each side (ru.wikipedia "two double-leaf
        doors, left and right") between the cockpit door and the main leg
                                                                    - paint
    16  the two-tone grey disruptive camouflage ('16', '62', the 1990 photo)

   PAINT, sampled and taken to about 0.85 of the photographs' level:
     PL       pale blue-grey, Vinogradov in sun 148,148,154 -> #8a96a0 (the
              same in the 1988 photograph's tones); a paler belly.
     Ka-29    '16 yellow' overcast: dark 78,88,103 and light 122,125,134;
              '62' in sun: dark 76,79,83, light 145-160. Drawn #59636f and
              #8c929a; the 1990 photo shows the same two-tone scheme.
   MARKINGS: the national star on the fins only. Soviet (red, white edge) on
   pact_e80_aswhelo and on pact_e80_ka29 (an e80 row; its 1990 photograph
   wears it); the Russian star (red, blue, white) on asw_helo_p, as the 2015
   Vinogradov photographs show. No bort numbers, serials or titles.

   NOT CONFIRMED, and so not drawn: the Ka-29's gun barrels (the flap is
   always shut in the photographs), any store on the Ka-29's racks, the
   Ka-29's EVU exhaust suppressors and IR jammer (not in these photographs),
   the PL's MAD bird (ru.wikipedia gives the PL a dipping sonar OR a MAD; the
   photographs show none outside), the function of the Ka-29's nose pod.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is the
   rotor mast axis, 4.15 m behind the nose (drawing), and z = 0 is a
   reference line 2.05 m above the wheel contact plane. render3d.js stands
   the model up and rescales it by the measured X extent: the 15.90 m rotor
   discs, centred on the mast, which the hull lies inside.

   NAMED NODES
     rotor          TWO, one per head, both on the same mast, each in a mount
                    turned +PI/2 about X (the asw_helo_fit.js pattern) so its
                    local +Y runs up the mast; render3d.js turns the second
                    head the other way, as a Kamov's contra-rotating pair.
     rotordisc      one inside each head, transparent, depthWrite off.
     undercarriage  the four wheels: FIXED gear, so not "gear" (render3d hides
                    a "gear" node above 18 m). The tyres are the lowest solid
                    part, so a parked machine stands on them.
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
  var H_LO = 3.65, H_UP = 5.05;            /* the two blade planes        */
  var NAC_Y = 0.52, NAC_R = 0.34, NAC_H = 3.02;   /* engine nacelles      */
  var FIN_Y = 1.55, FIN_CANT = 2 * D2R;
  var STAB_H = 2.15;                       /* stabiliser mid-plane        */
  var NOSE_X = 4.15;                       /* nose tip ahead of the mast  */

  /* the fin outline, (x, height above ground), from the drawing: the
     leading edge nearly upright, a flat top falling a little aft, rounded
     corners, the trailing edge bowed */
  var FIN = [[-5.42, 1.30], [-6.95, 1.55], [-7.12, 1.70], [-7.17, 2.40], [-7.10, 3.02],
             [-6.95, 3.18], [-5.62, 3.30], [-5.46, 3.20], [-5.40, 2.30]];

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
  var UX0 = -7.6, UX1 = 5.0;               /* x covered across the sheet  */
  var QY = 2.0;                            /* |y| covered by top/belly    */
  var QZ0 = -1.85, QZ1 = 1.55;             /* z covered by the side rows  */
  var FX0 = -7.25, FX1 = -5.30;            /* fin tile: x range           */
  var FZ0 = Z(1.20), FZ1 = Z(3.40);        /*           z range           */
  function pxX(x)       { return (x - UX0) / (UX1 - UX0) * TW; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }
  /* a box of the side row b from x0..x1 (aft..fore) and heights h0..h1 */
  function sideRect(b, x0, x1, h0, h1) {
    var py = pySide(Z(h1), b);
    return [pxX(x0), py, pxX(x1) - pxX(x0), pySide(Z(h0), b) - py];
  }

  var PAINT = {
    pl:   { base: "#8a96a0", belly: "#98a3ab" },
    ka29: { base: "#59636f", belly: "#646d78", light: "#8c929a" }
  };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* the national star: Soviet = red with a white edge; Russian = red inside
     a thin dark blue edge inside a white one (the Vinogradov fin photograph:
     red, then blue, then white outermost) */
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

  /* the Ka-29's disruptive light-grey patches: soft-cornered blobs laid
     across the sides and the roof, as on '16' and '62' */
  function blob(g, R, cx, cy, rx, ry) {
    var n = 9, i, pts = [];
    for (i = 0; i < n; i++) {
      var a = i / n * PI * 2, k = 0.65 + R() * 0.55;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    g.beginPath();
    g.moveTo((pts[0][0] + pts[n - 1][0]) / 2, (pts[0][1] + pts[n - 1][1]) / 2);
    for (i = 0; i < n; i++) {
      var p = pts[i], q = pts[(i + 1) % n];
      g.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
    }
    g.closePath(); g.fill();
  }

  function skinCanvas(v) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(v.ka29 ? 2929 : 2727);
    var P = v.ka29 ? PAINT.ka29 : PAINT.pl;
    var i, b, x, y, r;

    g.fillStyle = P.base; g.fillRect(0, 0, TW, TH);
    g.fillStyle = P.belly; g.fillRect(0, 3 * BAND, TW, BAND);

    if (v.ka29) {
      /* the camouflage: big pale patches running up the sides and over the
         roof, fewer on the belly */
      g.fillStyle = P.light;
      for (i = 0; i < 9; i++) {
        x = 60 + i * 112 + R() * 40;
        blob(g, R, x, BAND + 70 + R() * 110, 46 + R() * 34, 86 + R() * 40);
        blob(g, R, x + 40, 2 * BAND + 70 + R() * 110, 46 + R() * 34, 86 + R() * 40);
        blob(g, R, x + 20, 40 + R() * 170, 50 + R() * 30, 40 + R() * 34);
      }
      g.fillStyle = "rgba(140,146,154,0.55)";
      for (i = 0; i < 4; i++) blob(g, R, 120 + i * 240 + R() * 60, 3 * BAND + 128, 40, 60);
      /* the fin tiles carry the dark base with one pale patch each */
      g.fillStyle = P.base; g.fillRect(0, 4 * BAND, TW, BAND);
      g.fillStyle = P.light;
      blob(g, R, 70, 4 * BAND + 200, 60, 40); blob(g, R, 256 + 170, 4 * BAND + 70, 60, 50);
    }

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

    /* ---- frames and rivet rows ---- */
    var frames = [3.30, 2.80, 2.38, 1.75, 1.15, 0.60, -0.10, -0.85, -1.50, -2.20, -2.95,
                  -3.60, -4.20, -4.85, -5.50, -6.20];
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
    /* the seam where the cowls sit on the cabin shoulder, and stringers */
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.8;
    [2.52, 2.05, 1.45, 0.95].forEach(function (h) {
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

    function frame(rr, w, a) {
      g.strokeStyle = "rgba(0,0,0," + (a || 0.55) + ")"; g.lineWidth = w || 2.2;
      g.strokeRect(rr[0], rr[1], rr[2], rr[3]);
    }
    function win(rr) {
      g.fillStyle = "rgba(18,26,30,0.92)"; g.fillRect(rr[0], rr[1], rr[2], rr[3]);
      frame(rr, 1.6, 0.6);
    }
    /* ---- doors and windows ---- */
    for (b = 1; b <= 2; b++) {
      /* the sliding cockpit door; its window is glass, cast on the skin */
      frame(v.ka29 ? sideRect(b, 2.30, 3.40, 1.25, 2.55) : sideRect(b, 2.40, 3.32, 1.35, 2.50));
      if (v.ka29) {
        /* the double-leaf troop door on each side, its split and windows */
        r = sideRect(b, 0.30, 1.55, 0.95, 2.35); frame(r);
        g.beginPath(); g.moveTo(pxX(0.92), r[1]); g.lineTo(pxX(0.92), r[1] + r[3]); g.stroke();
        win(sideRect(b, 1.05, 1.40, 1.80, 2.20));
        win(sideRect(b, 0.45, 0.80, 1.80, 2.20));
        /* the window aft of the main leg */
        win(sideRect(b, -2.05, -1.65, 1.85, 2.20));
      } else if (b === 1) {
        /* the Ka-27's only cabin door: sliding, port side, aft */
        r = sideRect(b, -2.44, -1.15, 1.32, 2.45); frame(r);
        win(sideRect(b, -1.99, -1.56, 2.07, 2.36));
        g.fillStyle = "rgba(20,20,20,0.7)"; r = sideRect(b, -1.30, -1.22, 1.75, 1.82);
        g.fillRect(r[0], r[1], r[2], r[3]);
        win(sideRect(b, 1.13, 1.55, 2.07, 2.35));         /* forward cabin window */
      } else {
        win(sideRect(b, 1.13, 1.55, 2.07, 2.35));
        win(sideRect(b, -1.99, -1.56, 2.07, 2.36));
      }
      /* inspection hatches on the aft cabin and the tail cone */
      [[-2.60, -3.25, 1.10, 2.00], [-3.55, -3.95, 1.40, 2.05], [-4.30, -4.85, 1.60, 2.25]].forEach(function (h) {
        frame(sideRect(b, h[1], h[0], h[2], h[3]), 1.6, 0.42);
      });
      /* small fittings on the cowl flank: a square vent and two round ones
         (drawing) */
      win(sideRect(b, -1.30, -1.05, 2.82, 3.06));
      g.fillStyle = "rgba(18,26,30,0.85)";
      g.beginPath(); g.arc(pxX(-1.95), pySide(Z(2.90), b), 5, 0, PI * 2); g.fill();
      /* the black soot panel behind each exhaust, and the grime aft of it */
      r = sideRect(b, -0.45, 0.30, 2.80, 3.22);
      var sg = g.createLinearGradient(pxX(-0.45), 0, pxX(-1.9), 0);
      sg.addColorStop(0, "rgba(24,22,20,0.34)"); sg.addColorStop(1, "rgba(24,22,20,0)");
      g.fillStyle = sg; g.fillRect(pxX(-1.9), r[1], pxX(-0.45) - pxX(-1.9), r[3]);
      g.fillStyle = "rgba(20,20,20,0.92)"; g.fillRect(r[0], r[1], r[2], r[3]);
    }
    if (v.ka29) {
      /* the gun port's armoured flap, starboard nose, shut */
      r = sideRect(2, 3.55, 3.98, 1.00, 1.40); frame(r, 2.0, 0.6);
    }

    /* ---- belly ---- */
    g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.6;
    if (!v.ka29) {
      /* the weapons bay (frames 4-14) and the sonar bay (14-16), each a
         pair of doors split on the centreline */
      g.strokeRect(pxX(-1.70), pyBelly(0.42), pxX(1.40) - pxX(-1.70), pyBelly(-0.42) - pyBelly(0.42));
      g.strokeRect(pxX(-2.55), pyBelly(0.40), pxX(-1.80) - pxX(-2.55), pyBelly(-0.40) - pyBelly(0.40));
      g.beginPath(); g.moveTo(pxX(-2.55), pyBelly(0)); g.lineTo(pxX(1.40), pyBelly(0)); g.stroke();
    } else {
      g.strokeRect(pxX(-2.6), pyBelly(0.30), pxX(1.0) - pxX(-2.6), pyBelly(-0.30) - pyBelly(0.30));
    }

    /* ---- the fin tiles. Tile A is the outer face: the rudder hinge line,
       riveted ribs, the star. Tile B the inner face, plain. ---- */
    function fx(xm) { return 8 + (xm - FX0) / (FX1 - FX0) * 240; }
    function fy(h)  { return 4 * BAND + 8 + (FZ1 - Z(h)) / (FZ1 - FZ0) * 240; }
    for (b = 0; b < 2; b++) {
      var ox = b * 256;
      if (!v.ka29) { g.fillStyle = P.base; g.fillRect(ox, 4 * BAND, 256, 256); }
      g.strokeStyle = "rgba(0,0,0,0.34)"; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(ox + fx(-6.50), 4 * BAND); g.lineTo(ox + fx(-6.50), 5 * BAND); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 4 * BAND + 4; y < 5 * BAND; y += 7) g.fillRect(ox + fx(-6.50) + 4, y, 1.6, 1.6);
      for (y = 4 * BAND + 4; y < 5 * BAND; y += 7) g.fillRect(ox + fx(-5.70) - 4, y, 1.6, 1.6);
      g.strokeStyle = "rgba(0,0,0,0.28)";
      [1.95, 2.55].forEach(function (h) { g.beginPath(); g.moveTo(ox, fy(h)); g.lineTo(ox + 256, fy(h)); g.stroke(); });
      /* the two rudder hinge brackets */
      g.fillStyle = "rgba(0,0,0,0.45)";
      [1.85, 2.85].forEach(function (h) { g.fillRect(ox + fx(-6.50) - 10, fy(h) - 3, 14, 6); });
    }
    star(g, fx(-6.15), fy(2.30), 0.48 * 110, v.russian);

    /* ---- the belly's panel seams ---- */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.beginPath(); g.moveTo(x, 3 * BAND); g.lineTo(x, 4 * BAND); g.stroke();
    }
    return cv;
  }

  var _cv = {}, _tex = {};                 /* module scope: one per variant */
  function skinTexture(v) {
    var k = v.key;
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(v);
      _tex[k] = new V.CanvasTexture(_cv[k]);
      _tex[k].wrapS = _tex[k].wrapT = V.ClampToEdgeWrapping;
      _tex[k].anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) _tex[k].encoding = V.sRGBEncoding;
    } catch (e) { _tex[k] = false; }
    return _tex[k];
  }

  /* the blades: dark composite, and on the upper head the red tip band the
     photographs show ('16', the Vinogradov machines). U runs root to tip. */
  var _bt = {};
  function bladeTexture(tips) {
    var k = tips ? "t" : "p";
    if (_bt[k] !== undefined) return _bt[k];
    try {
      var cv = document.createElement("canvas");
      cv.width = 128; cv.height = 8;
      var g = cv.getContext("2d");
      g.fillStyle = "#3a3e40"; g.fillRect(0, 0, 128, 8);
      g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(0, 0, 128, 1);
      if (tips) { g.fillStyle = "#a8271f"; g.fillRect(118, 0, 10, 8); }
      _bt[k] = new V.CanvasTexture(cv);
      _bt[k].wrapS = _bt[k].wrapT = V.ClampToEdgeWrapping;
      if (V.sRGBEncoding !== undefined) _bt[k].encoding = V.sRGBEncoding;
    } catch (e) { _bt[k] = false; }
    return _bt[k];
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
  /* blade UVs: u along the span (0 at the hub, 1 at the tip) */
  function bladeUV(geo) {
    var g = flat(geo);
    var p = g.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), i;
    for (i = 0; i < p.length / 3; i++) {
      var x = p[3 * i], y = p[3 * i + 1];
      uv[2 * i] = Math.max(0, Math.min(1, Math.sqrt(x * x + y * y) / ROTOR_R));
      uv[2 * i + 1] = 0.5;
    }
    g.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return g;
  }

  /* ========================================================= materials == */
  function makeMats(C, v) {
    var tex = skinTexture(v);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(v.ka29 ? 0x59636f : 0x8a96a0);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 });
    m.bladeL = new V.MeshStandardMaterial({ color: 0x3a3e40, roughness: 0.80, metalness: 0.10 });
    m.bladeU = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.10 });
    var bt = bladeTexture(true);
    if (bt) m.bladeU.map = bt; else m.bladeU.color.setHex(0x3a3e40);
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
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
  function build(THREE, M, C, v) {
    V = THREE;
    var T = makeMats(C, v);
    var g = new V.Group();
    g.name = v.ka29 ? "ka29" : "ka27";
    var i, k, s, a;

    var skin = [], glass = [], dark = [], metal = [], team = [];

    /* --------------------------------------------------- the fuselage ----
       Stations off the drawing, heights above the ground: the belly 0.66 m
       up under the cabin, the cockpit roof 2.70 m, the cabin shoulder 2.52 m
       (the cowls sit on it), the cabin 1.84 m wide (top view), the belly
       lifting from 7.2 m behind the nose into the boom, whose top runs on
       level at 2.50 m to the tail light.
                x      zb    zt    zm    wb    wm    wt    e              */
    var NOSE27 = [
      sec( 4.15, 1.34, 1.70, 1.52, 0.10, 0.16, 0.10, 0.80),
      sec( 4.05, 1.08, 1.98, 1.48, 0.32, 0.44, 0.28, 0.70),
      sec( 3.82, 0.86, 2.26, 1.45, 0.52, 0.64, 0.42, 0.58),
      sec( 3.52, 0.74, 2.50, 1.48, 0.70, 0.84, 0.58, 0.50),
      sec( 3.15, 0.68, 2.65, 1.52, 0.80, 0.94, 0.72, 0.46),
      sec( 2.55, 0.66, 2.70, 1.55, 0.82, 0.95, 0.80, 0.44),
    ];
    /* the Ka-29: 0.5 m wider at the nose, flat-fronted, the three flat
       screens on a face raked at about 47 degrees from the ground ('62'
       port side, the 2010 head-on view) */
    var NOSE29 = [
      sec( 4.22, 0.98, 1.74, 1.36, 0.62, 0.70, 0.62, 0.28),
      sec( 4.14, 0.80, 1.86, 1.36, 0.78, 0.84, 0.72, 0.30),
      sec( 3.96, 0.71, 2.04, 1.40, 0.86, 0.92, 0.78, 0.32),
      sec( 3.66, 0.68, 2.34, 1.45, 0.86, 0.95, 0.82, 0.38),
      sec( 3.28, 0.66, 2.58, 1.50, 0.86, 0.96, 0.86, 0.40),
      sec( 2.80, 0.66, 2.70, 1.55, 0.84, 0.96, 0.86, 0.42),
    ];
    var CAB = [
      sec( 2.10, 0.66, 2.62, 1.55, 0.82, 0.93, 0.82, 0.42),
      sec( 1.20, 0.66, 2.54, 1.55, 0.82, 0.93, 0.84, 0.42),
      sec(-1.60, 0.66, 2.54, 1.55, 0.82, 0.93, 0.84, 0.42),
      sec(-2.60, 0.68, 2.54, 1.56, 0.80, 0.91, 0.80, 0.44),
      sec(-3.05, 0.78, 2.53, 1.60, 0.70, 0.82, 0.68, 0.48),
      sec(-3.70, 1.12, 2.52, 1.76, 0.46, 0.56, 0.42, 0.60),
      sec(-4.60, 1.32, 2.50, 1.90, 0.34, 0.40, 0.30, 0.70),
      sec(-5.45, 1.50, 2.48, 2.00, 0.26, 0.30, 0.22, 0.78),
      sec(-6.60, 1.72, 2.40, 2.05, 0.17, 0.19, 0.15, 0.85),
      sec(-7.05, 1.84, 2.30, 2.06, 0.11, 0.12, 0.10, 0.88),
    ];
    var FUS = (v.ka29 ? NOSE29 : NOSE27).concat(CAB);
    skin = skin.concat(loft(FUS, 22, v.ka29 ? 0.03 : 0.04, 0.08));
    var NOSE = triList(skin[0]);

    /* ---------------------------------------------- engine nacelles ----
       Two TV3-117Vs side by side on the cabin shoulder, 1.04 m between
       their centrelines (front view), the intakes 0.68 m across with their
       centres 3.02 m up and their lips 1.87 m behind the nose. Each is a
       plain cylinder to the exhaust, then a slightly fuller cowl whose roof
       stays flat to x = -2.2 and falls to the boom by -3.75 (drawing). */
    var NAC = [
      [ 2.28, 2.68, 3.36, 3.02, 0.340, 0.340, 0.340, 1.00],
      [ 0.85, 2.68, 3.36, 3.02, 0.340, 0.340, 0.340, 1.00],
      [ 0.65, 2.62, 3.37, 3.00, 0.340, 0.380, 0.320, 0.86],
      [-0.60, 2.60, 3.37, 3.00, 0.340, 0.380, 0.310, 0.82],
      [-2.20, 2.60, 3.36, 2.98, 0.330, 0.370, 0.300, 0.82],
      [-2.75, 2.58, 3.10, 2.86, 0.300, 0.340, 0.270, 0.82],
      [-3.25, 2.55, 2.86, 2.72, 0.240, 0.280, 0.220, 0.85],
      [-3.70, 2.50, 2.60, 2.55, 0.100, 0.120, 0.090, 0.90],
    ];
    for (s = -1; s <= 1; s += 2) {
      skin = skin.concat(loft(NAC.map(function (q) {
        return sec(q[0], q[1], q[2], q[3], q[4], q[5], q[6], q[7], s * NAC_Y);
      }), 14, null, 0.05));
    }
    /* the saddle between the nacelles, and the gearbox fairing at the mast */
    skin = skin.concat(loft([
      sec( 0.95, 2.55, 3.24, 2.95, 0.22, 0.26, 0.22, 0.80),
      sec(-2.20, 2.55, 3.24, 2.95, 0.22, 0.26, 0.22, 0.80),
      sec(-2.90, 2.55, 3.02, 2.80, 0.18, 0.22, 0.18, 0.82),
      sec(-3.55, 2.50, 2.66, 2.58, 0.10, 0.13, 0.10, 0.90),
    ], 8, 0.05, 0.05));
    skin.push(cyl(0.40, 0.48, 0.34, 18, "z", 0, 0, Z(3.36)));
    /* the intakes: a skin lip, a dark mouth, the engine's own bullet */
    for (s = -1; s <= 1; s += 2) {
      skin.push(place(new V.RingGeometry(0.27, NAC_R + 0.004, 24), 2.29, s * NAC_Y, Z(NAC_H), 0, PI / 2, 0));
      dark.push(place(new V.CircleGeometry(0.27, 24), 2.295, s * NAC_Y, Z(NAC_H), 0, PI / 2, 0));
      metal.push(sph(0.08, 10, 8, 2.32, s * NAC_Y, Z(NAC_H), 1.3, 1, 1));
    }
    /* the exhausts: a squared-off oval duct 0.50 m long and 0.62 m tall out
       of each outer flank, its mouth 0.55 m ahead of the mast (Vinogradov
       left side, near orthographic) turned 25 degrees aft, a black mouth 3 cm
       inside the lip. Built for port, mirrored. */
    var EXA = 25 * D2R, EXL = 0.50, edx = -Math.sin(EXA), edy = Math.cos(EXA);
    var em = [0.55, NAC_Y + 0.38 + 0.12, Z(2.98)];
    var exS = duct(0.25, 0.31, EXL, 24, 0.6);
    exS.rotateZ(EXA);
    exS.translate(em[0] - edx * EXL / 2, em[1] - edy * EXL / 2, em[2]);
    both(metal, exS);
    var exM = duct(0.205, 0.265, 0.034, 24, 0.6);
    exM.rotateZ(EXA);
    exM.translate(em[0] + edx * 0.014, em[1] + edy * 0.014, em[2]);
    both(dark, exM);

    /* ---------------------------------------------------------- tail ----
       The stabiliser across the boom at 2.15 m, 1.0 m chord (top view),
       a fin at each tip, a ventral fin with its bumper under the boom, a
       dorsal fairing on it, the tail light, and a tube bracing each half. */
    var stab = M.slab(V, [[-5.70, -1.56], [-6.85, -1.56], [-6.90, -0.30], [-6.90, 0.30],
                          [-6.85, 1.56], [-5.70, 1.56], [-5.55, 0.30], [-5.55, -0.30]], 0.06);
    stab.translate(0, 0, Z(STAB_H) - 0.03);
    skin.push(stab);
    var pivotZ = Z(STAB_H);
    var fin = M.slab(V, FIN.map(function (q) { return [q[0], Z(q[1])]; }), 0.08, "xz");
    fin.translate(0, 0.04, -pivotZ);
    fin.rotateX(-FIN_CANT);
    fin.translate(0, FIN_Y, pivotZ);
    fin = finUV(fin, 1);
    both(skin, fin);
    /* the fin's spar, the thick upright down its middle (rear photographs) */
    for (s = -1; s <= 1; s += 2) {
      var sp = box(0.16, 0.20, 1.95, -6.45, s * FIN_Y, Z(2.28));
      skin.push(sp);
    }
    var vent = M.slab(V, [[-4.20, Z(1.30)], [-5.30, Z(1.48)], [-5.36, Z(0.98)], [-4.60, Z(0.90)]], 0.06, "xz");
    vent.translate(0, 0.03, 0);
    skin.push(vent);
    dark.push(box(0.76, 0.12, 0.04, -4.98, 0, Z(0.93)));            /* the bumper strip */
    skin.push(dome(0.60, 0.20, 0.18, -4.25, 0, Z(2.50), 0, 12, 6));  /* dorsal fairing */
    dark.push(sph(0.15, 10, 8, -7.10, 0, Z(2.05), 1.2, 1, 1));       /* tail light */
    for (s = -1; s <= 1; s += 2) {
      metal.push(bar([-5.75, s * 0.24, Z(1.62)], [-6.05, s * 1.30, Z(2.10)], 0.032, 6));
    }

    /* ----------------------------------------------------- the nose ---- */
    if (!v.ka29) {
      /* the PL's chin radome: a fat egg under the nose, nearly as wide as
         the nose and reaching forward to its tip, its bottom 0.38 m off the
         ground (Vinogradov front view, the Ukrainian PL) */
      skin.push(dome(0.98, 0.80, 0.60, 3.30, 0, Z(0.98), 2, 22, 14));
      /* the screen: two curved panes either side of a 9 cm post, from 1.98
         to 2.58 m up; the lower nose windows over the radome; the window
         in each cockpit door (drawing, the Ukrainian PL) */
      var SL = 52 * D2R, n0 = [Math.sin(SL), 0, Math.cos(SL)], sv = [-Math.cos(SL), 0, Math.sin(SL)];
      var screen = pane(NOSE, 6, 8, function (fu, fv) {
        var vv = -0.40 + 0.80 * fv, y = 0.045 + (0.42 + 0.12 * fv - 0.045) * fu;
        return [[3.62 + vv * sv[0] + 2.5 * n0[0], y, Z(2.24) + vv * sv[2] + 2.5 * n0[2]],
                [-n0[0], 0, -n0[2]]];
      }, 0.02);
      if (screen) both(glass, screen);
      var low = pane(NOSE, 5, 4, function (fu, fv) {
        var y = 0.10 + 0.38 * fu, h = 1.50 + 0.36 * fv;
        return [[6.0, y, Z(h)], [-1, 0, 0]];
      }, 0.02);
      if (low) both(glass, low);
      var dwin = pane(NOSE, 6, 5, function (fu, fv) {
        var h = 1.72 + 0.62 * fv, x = 2.50 + (0.75 - 0.30 * fv) * fu;
        return [[x, 2.0, Z(h)], [0, -1, 0]];
      }, 0.02);
      if (dwin) both(glass, dwin);
      metal.push(bar([3.55, -0.82, Z(2.00)], [4.45, -0.96, Z(1.88)], 0.018, 5));   /* pitot */
      /* the flotation-bag covers low on each side, behind the cockpit door */
      for (s = -1; s <= 1; s += 2) {
        skin.push(box(1.30, 0.14, 0.46, 1.55, s * 0.90, Z(1.02)));
      }
      /* the starboard side fittings of the in-flight Ka-28 photograph: a
         squared equipment box under the cowl and a rounded fairing on the
         cabin side. Neither is on the port side. */
      skin.push(box(1.10, 0.26, 0.90, -2.35, -0.92, Z(2.02)));
      var pod = [], pr = 0.22, pq, pc;
      [[0.95 - pr, 1.62 + pr, -90], [0.95 - pr, 2.42 - pr, 0], [-0.60 + pr, 2.42 - pr, 90],
       [-0.60 + pr, 1.62 + pr, 180]].forEach(function (c) {
        for (pq = 0; pq <= 4; pq++) {
          pc = (c[2] + pq * 22.5) * D2R;
          pod.push([c[0] + Math.cos(pc) * pr, Z(c[1] + Math.sin(pc) * pr)]);
        }
      });
      var podG = M.slab(V, pod, 0.10, "xz");
      podG.translate(0, -0.93, 0);
      skin.push(podG);
      /* the bay doors: two pairs, standing 15 mm proud of the belly so the
         seams read from below */
      dark.push(box(3.10, 0.03, 0.02, -0.15, 0, Z(0.655)));
      dark.push(box(0.03, 0.84, 0.02, 1.40, 0, Z(0.655)));
      dark.push(box(0.03, 0.84, 0.02, -1.75, 0, Z(0.655)));
      dark.push(box(0.03, 0.80, 0.02, -2.55, 0, Z(0.66)));
    } else {
      /* three flat armoured screens on the raked face: the centre one 0.66 m
         wide, a side one each side, from 1.86 to 2.52 m up */
      var SL9 = 47 * D2R, m0 = [Math.sin(SL9), 0, Math.cos(SL9)], mv = [-Math.cos(SL9), 0, Math.sin(SL9)];
      var scr = function (y0, y1) {
        return pane(NOSE, 4, 6, function (fu, fv) {
          var vv = -0.40 + 0.80 * fv, y = y0 + (y1 - y0) * fu;
          return [[3.80 + vv * mv[0] + 2.5 * m0[0], y, Z(2.20) + vv * mv[2] + 2.5 * m0[2]],
                  [-m0[0], 0, -m0[2]]];
        }, 0.02);
      };
      var c0 = scr(-0.32, 0.32); if (c0) glass.push(c0);
      var s1 = scr(0.39, 0.84); if (s1) both(glass, s1);
      /* the big flat window in each cockpit door */
      var dw = pane(NOSE, 6, 5, function (fu, fv) {
        var h = 1.65 + 0.80 * fv, x = 2.45 + (0.85 - 0.25 * fv) * fu;
        return [[x, 2.0, Z(h)], [0, -1, 0]];
      }, 0.02);
      if (dw) both(glass, dw);
      /* the gun port's armoured flap on the starboard nose, shut */
      skin.push(box(0.42, 0.06, 0.38, 3.76, -0.925, Z(1.20)));
      /* the pod at the port side of the lower nose, with its cap */
      metal.push(cyl(0.13, 0.13, 0.55, 14, "x", 4.30, 0.36, Z(1.12)));
      dark.push(sph(0.13, 12, 8, 4.58, 0.36, Z(1.12), 0.7, 1, 1));
      /* the pitot boom on the starboard nose ('16') */
      metal.push(bar([3.95, -0.60, Z(1.55)], [5.05, -0.66, Z(1.55)], 0.018, 5));
      /* the armour plates outside the cockpit, on each side under the door
         window */
      for (s = -1; s <= 1; s += 2) skin.push(box(0.80, 0.05, 0.42, 2.95, s * 0.95, Z(1.36)));

      /* ------------------------------------- the side trusses (outriggers)
         One each side, ahead of the main legs ('62': the truss starts behind
         the cockpit door and the rack ends over the main wheel): two spars out
         from the cabin side
         to a tip 2.45 m off the centreline, a brace down to each spar's tip
         from the cabin shoulder, a diagonal, and two beam racks hanging
         under the spars, at 1.65 and 2.30 m out ('62', 2010, NavalFlyingAce;
         "two side trusses ... with four beam racks", ru.wikipedia). */
      for (s = -1; s <= 1; s += 2) {
        var xf = 0.65, xa = -0.65, zs = Z(1.42), yi = s * 0.86, yo = s * 2.45;
        metal.push(bar([xf, yi, zs], [xf, yo, zs + 0.06], 0.045, 6));
        metal.push(bar([xa, yi, zs], [xa, yo, zs + 0.06], 0.045, 6));
        metal.push(bar([xf, s * 0.88, Z(2.40)], [xf, yo, zs + 0.08], 0.038, 6));
        metal.push(bar([xa, s * 0.88, Z(2.40)], [xa, yo, zs + 0.08], 0.038, 6));
        metal.push(bar([xf, s * 0.88, Z(2.40)], [xa, s * 1.70, zs + 0.04], 0.032, 6));
        metal.push(bar([xf, yo, zs + 0.06], [xa, yo, zs + 0.06], 0.040, 6));
        [1.65, 2.30].forEach(function (yy) {
          var py = s * yy;
          skin.push(box(1.45, 0.12, 0.10, 0.0, py, zs + 0.02));      /* the rack's beam   */
          skin.push(box(1.05, 0.10, 0.22, 0.0, py, zs - 0.14));      /* the rack's body   */
          dark.push(box(0.70, 0.04, 0.03, 0.0, py, zs - 0.265));     /* its shackle line  */
        });
      }
    }

    /* ------------------------------------------------------- team flash --
       A stripe along each cowl roof, a patch on each half of the stabiliser
       (faces that look up), and a band across the top of each fin. */
    for (s = -1; s <= 1; s += 2) {
      team.push(box(2.20, 0.12, 0.02, -1.60, s * NAC_Y, Z(3.372)));
      team.push(box(0.55, 0.95, 0.02, -6.25, s * 0.98, Z(STAB_H) + 0.068));
    }
    for (s = -1; s <= 1; s += 2) {
      var tb = box(1.20, 0.02, 0.18, -6.20, 0, Z(3.08));
      tb.translate(0, 0, -pivotZ); tb.rotateX(-FIN_CANT); tb.translate(0, FIN_Y + 0.086, pivotZ);
      team.push(s > 0 ? tb : mirrorY(tb));
    }

    /* ----------------------------------------------- the undercarriage ---
       FIXED, four wheels. The main legs are raked tubes from high on the
       side, painted with the airframe, each to a 620 x 180 tyre at the
       3.50 m track, with a radius rod from the belly; the twin nose wheels
       sit under the cockpit 1.40 m apart, 3.02 m ahead of the mains. */
    var uc = new V.Group();
    uc.name = "undercarriage";
    g.add(uc);
    var tyres = [];
    var XM = -0.95, XN = 2.07;
    for (s = -1; s <= 1; s += 2) {
      tyres.push(cyl(0.31, 0.31, 0.18, 22, "y", XM, s * 1.75, Z(0.31)));
      metal.push(cyl(0.19, 0.19, 0.20, 14, "y", XM, s * 1.75, Z(0.31)));
      skin.push(bar([XM + 0.14, s * 0.90, Z(2.30)], [XM, s * 1.66, Z(0.34)], 0.060, 8));
      metal.push(bar([XM + 0.05, s * 1.30, Z(1.30)], [XM, s * 1.62, Z(0.52)], 0.045, 6));   /* oleo slide */
      skin.push(bar([XM + 0.05, s * 0.74, Z(0.78)], [XM, s * 1.62, Z(0.36)], 0.036, 6));
      skin.push(bar([XM - 0.55, s * 0.74, Z(0.78)], [XM, s * 1.62, Z(0.40)], 0.032, 6));
      metal.push(box(0.24, 0.16, 0.10, XM, s * 1.66, Z(0.52)));
      tyres.push(cyl(0.225, 0.225, 0.15, 18, "y", XN, s * 0.70, Z(0.225)));
      metal.push(cyl(0.14, 0.14, 0.17, 12, "y", XN, s * 0.70, Z(0.225)));
      metal.push(bar([XN + 0.05, s * 0.52, Z(0.82)], [XN, s * 0.68, Z(0.24)], 0.046, 6));
      metal.push(bar([XN - 0.40, s * 0.46, Z(0.72)], [XN, s * 0.68, Z(0.46)], 0.030, 5));
    }
    mesh(uc, tyres, T.rubber, "tyres");

    /* ================================================ the coaxial mast ===
       The fixed parts: the shaft between the heads, the swashplate rings
       and three control rods. */
    for (k = 0; k < 3; k++) {
      a = k * PI * 2 / 3 + 0.4;
      metal.push(bar([Math.cos(a) * 0.30, Math.sin(a) * 0.30, Z(3.82)],
                     [Math.cos(a) * 0.30, Math.sin(a) * 0.30, Z(4.88)], 0.022, 5));
    }
    metal.push(cyl(0.13, 0.13, 1.50, 12, "z", 0, 0, Z(4.15)));
    metal.push(cyl(0.30, 0.30, 0.05, 18, "z", 0, 0, Z(4.04)));
    metal.push(cyl(0.26, 0.26, 0.05, 18, "z", 0, 0, Z(4.46)));
    metal.push(cyl(0.33, 0.33, 0.06, 18, "z", 0, 0, Z(3.88)));

    /* ----------------------------------------------------- airframe ----- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
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
      var hubM = [], blades = [], j;
      hubM.push(cyl(0.25, 0.30, 0.34, 20, "z", 0, 0, 0));
      hubM.push(cyl(0.36, 0.36, 0.05, 20, "z", 0, 0, -0.19));
      if (upper) hubM.push(cyl(0.08, 0.20, 0.18, 16, "z", 0, 0, 0.26));   /* cap: top at 5.40 m */
      else hubM.push(cyl(0.20, 0.20, 0.05, 16, "z", 0, 0, 0.19));
      /* blade outline, blade along +X: root cut-out to 0.9 m, a square tip
         with the corners cut, 0.48 m chord, 0.04 m thick */
      var BP = [[0.88, -0.24], [7.78, -0.24], [ROTOR_R, -0.10], [ROTOR_R, 0.10],
                [7.78, 0.24], [0.88, 0.24]];
      for (j = 0; j < 3; j++) {
        a = azs[j] * D2R;
        var bl = M.slab(V, BP, 0.04);
        bl.translate(0, 0, -0.02);
        bl.rotateZ(a);
        blades.push(bladeUV(bl));
        /* sleeve, flapping-hinge housing, lag damper and pitch horn */
        var parts = [box(0.74, 0.22, 0.15, 0.62, 0, 0),
                     box(0.34, 0.30, 0.17, 0.30, 0, -0.02),
                     cyl(0.045, 0.045, 0.52, 8, "x", 0.62, 0.20, 0.05),
                     box(0.10, 0.20, 0.05, 0.78, 0.24, -0.04),
                     bar([0.82, 0.24, -0.06], [0.36, 0.20, -0.24], 0.022, 5)];
        for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hubM.push(parts[i]); }
      }
      mesh(hd, hubM, T.metal, "hub");
      mesh(hd, blades, upper ? T.bladeU : T.bladeL, "blades");
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
   11.3 m hull; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["pact_e80_aswhelo"] = { len: 15.9, build: function (THREE, M, C) {
  return HeroKa27.build(THREE, M, C, { key: "pl_su", ka29: false, russian: false }); } };
UNIT_MODELS["asw_helo_p"]       = { len: 15.9, build: function (THREE, M, C) {
  return HeroKa27.build(THREE, M, C, { key: "pl_ru", ka29: false, russian: true }); } };
UNIT_MODELS["pact_e80_ka29"]    = { len: 15.9, build: function (THREE, M, C) {
  return HeroKa27.build(THREE, M, C, { key: "ka29", ka29: true, russian: false }); } };
