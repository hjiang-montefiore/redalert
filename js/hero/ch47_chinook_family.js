/* ======= ch47_chinook_family.js - HERO model: the Boeing CH-47 Chinook in RAF service =======
   Four defs, one airframe. The RAF's Chinooks are one fleet rebuilt three
   times: the HC.1s of 1980 became HC.2s (CH-47D standard) from 1993, the
   HC.2/2A became HC.4s under Project Julius from 2011, and the HC.4s became
   HC.6As from 2017. What a camera sees change is the paint, the hooks and
   the kit bolted on for Iraq and Afghanistan.

     gbr_e80_transport  Chinook HC.1, 1980s. CH-47C standard (T55-L-11E):
                        the wrap-around disruptive camouflage of dark green
                        and dark sea grey every 1981-86 photograph shows,
                        the large red and blue roundel ahead of the windows,
                        a single centre cargo hook (the CH-47C's; see WHAT
                        COULD NOT BE CONFIRMED).
     gbr_e90_transport  Chinook HC2, from 1993: CH-47D standard, so the
                        triple-hook system; overall dark green.
     gbr_e00_transport  Chinook HC4, from 2011 (Project Julius): the nose
                        FLIR turret, the defensive aids (missile warners on
                        the nose and tail, the flare dispensers on the
                        sponsons) and the second roundel on the sponson.
     trans_b            Chinook HC6A (rules.js), from 2017: the HC4 with the
                        digital flight control system (DAFCS), which changes
                        nothing outside. Drawn as the HC4.
   Nothing else in rules.js, eras.js, rotor_specs.js or air_specs.js names a
   Chinook; all four rows drew trans_n's Black Hawk until this file.

   RECOGNITION LIST, and the reference each rests on
     1. The long box fuselage, square in section with flat sides and a
        rounded roof: the Commons three-view (front and top views) and HC1
        ZD984 side on at Hannover, 1986.
     2. Two three-blade tandem rotors, the forward on its pylon over the
        cockpit, the aft on the tall rear pylon, the aft head higher (5.41
        against 4.65 m): ZD984 1986, HC4 ZD983 at Odiham 2013.
     3. The forward rotor turns anti-clockwise from above, the aft clockwise
        (chinook-helicopter.com, "Forward and Aft Transmissions": "When
        viewed from above, the forward rotor system turns counter-clockwise
        and the aft turns clockwise"); the forward shaft leans 9 degrees
        forward and the aft 4 (the same pages' Boeing drawings).
     4. The fuel pods (sponsons) along the lower fuselage, 3.78 m across
        them (12 ft 5 in, Boeing), from the forward gear to behind the aft
        gear: three-view, ZD984, HC6A ZH891 at RIAT 2018.
     5. The two T55s on the sides of the aft pylon, each with its conical
        inlet screen ahead and its straight exhaust pipe aft: ZD984 tail
        close-up, HC4 ZA718 tail section (Nordholz 2013).
     6. The rear loading ramp, the underside sweeping up from the aft gear
        to the pylon's trailing edge: three-view, ZD984, HC6A ZA680 from
        below (2022) with the ramp down.
     7. The cockpit glazing: three windshield panes, the side windows and
        the big curved chin windows low on the nose: three-view front view,
        HC4 ZA718 head on (2013), HC1 at Odiham (1981).
     8. The four-point undercarriage: twin wheels on each forward leg under
        the front of the sponsons, a single castoring wheel on each aft leg:
        three-view, ZD983 hovering at Odiham, ZH891.
     9. The cargo hooks under the belly: three on the CH-47D standard
        (Wikipedia "Boeing CH-47 Chinook": "With its triple-hook cargo
        system"), the centre one in the floor hatch: ZA680 from below.
    10. The round cabin windows and the forward starboard door: ZD984, ZA707
        (RIAT 2009), ZH891.
    11. Per variant: the HC.1's green/grey camouflage; the HC4/HC6A's nose
        FLIR turret (Wikipedia, "Boeing Chinook (UK variants)", Project
        Julius: "installation of a nose-mounted forward-looking infrared";
        ZA718 head on) and defensive aids (ZD983, ZH891).

   REFERENCES
     Wikimedia Commons "Boeing CH-47 Chinook 3-view line drawing.svg" (side,
       top and front views). Its fuselage runs 6 % long against its rotor
       hubs and wheelbase, so the stations along x were taken from the
       side-on photograph of ZD984 instead, scaled to Boeing's 51 ft 2 in
       fuselage; widths and the section shapes come from its top and front
       views, heights from the photograph checked against the drawing.
     Boeing / Wikipedia "Boeing CH-47 Chinook" specifications: length 98 ft
       10.7 in rotors turning, fuselage 51 ft 2 in, width 12 ft 5 in, height
       18 ft 7.8 in, rotors 60 ft; Wikipedia "Boeing Chinook (UK variants)"
       for the HC.1 (CH-47C standard, T55-L-11E), the HC2 (CH-47D standard,
       1993), Project Julius (HC4, 2011: nose FLIR, T55-714) and the HC6A
       (2017: DAFCS); chinook-helicopter.com "The Rotor Blade" (32 in chord)
       and the transmission pages (rotation sense, shaft tilts).
     Commons photographs: HC1 of 18 Sqn, 1981 (AN1047062), HC1 ZD984 at
       Hannover 1986 (Gerwing 004441), HC1 ZA683 1986 (AN1468521), HC2 of 18
       Sqn RIAT 2005 from above (AN0894293), HC2 ZA682 Kemble 2008, HC2
       ZA707 RIAT 2009, HC4 ZD983 Odiham 2013, HC4 ZA718 head on and tail
       section (Nordholz 2013), HC6A ZH891 RIAT 2018, HC6A ZA680 from below
       (Schoenefeld 2022), HC4 landing on HMS Ocean 2014.

   MEASURED (heights above the ground, x from the fuselage's mid-length)
     fuselage 15.53 m nose to the aft pylon's trailing edge (51 ft 2 in:
     15.60); hubs 11.84 m apart (5.78 and -6.06); forward hub 4.65 m up,
     aft 5.41 (18 ft 7.8 in = 5.68 m to the top of the aft head, 0.25 m
     over its blade roots); width 3.78 m over the sponsons; wheelbase 7.15
     m (ZD984); cabin 2.48 m wide outside (the front view's 0.66 of the
     sponson width); roof 3.30 m, sponsons 0.64 to 1.88 m.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent. A tandem's
     60 ft rotors overhang its fuselage whichever way the blades lie: with
     three blades one always reaches at least half a radius past the hub,
     so no phase leaves the fuselage as the X extent. The blades are laid
     at the phase the rotors are synchronised to (ZA680 from below: each
     head with one blade straight aft, the other two 60 degrees either side
     of the nose), the least-overhanging real phase: 4.6 m past the forward
     hub, 9.1 m past the aft one, 25.5 m in all. The renderer turns the two
     heads at the same rate in opposite senses, so that phase is kept. No
     "rotordisc" is built: two full discs would make the X extent the 30.1
     m rotors-turning length and draw the fuselage a fifth smaller.

   NAMED NODES
     rotor (x2)  each head hangs in the h60_hawk_family.js mount: a tilt
                 group leaning the shaft forward (9 and 4 degrees), a +PI/2
                 mount about X and a -PI/2 group inside, so the "rotor"
                 node's local +Y points up its shaft. The forward head is
                 added first, so render3d.js rotorShafts() finds it first
                 and turns it positively about that axis, anti-clockwise
                 from above; the aft head, found second, it turns the other
                 way, clockwise from above, as the real one does.
   Nothing is named "turret", and the undercarriage (four legs, six tyres,
   the lowest opaque part) is NOT named "gear": the Chinook's wheels are
   fixed and stay down in flight, and render3d.js hides a "gear" node above
   18 m. The H-60 hero leaves its fixed wheels unnamed for the same reason.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   2.0 m above the ground (GROUND = -2.0) at the fuselage's mid-length.
   Materials: SKIN (one CanvasTexture per paint scheme), GLASS, DARK, METAL,
   TEAM, the gear's METAL and RUBBER, and per head its HUB and BLADES.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroCH47 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* ------------------------------------------------------------ datums */
  var GROUND = -2.0;
  function Z(h) { return GROUND + h; }
  var X_NOSE = 7.80, X_TAIL = -7.73;
  var HUB_F = { x: 5.78, h: 4.65, tilt: 9 * D2R };   /* forward head  */
  var HUB_A = { x: -6.06, h: 5.41, tilt: 4 * D2R };  /* aft head      */
  var ROTOR_R = 9.144;                                /* 60 ft         */
  var CHORD = 0.813;                                  /* 32 in         */
  var ENG_Y = 1.03, ENG_H = 3.30;                     /* T55 centreline */
  var GEAR_F = { x: 2.16, y: 1.55, r: 0.33, w: 0.20 };  /* twin wheels  */
  var GEAR_A = { x: -4.99, y: 1.70, r: 0.33, w: 0.22 }; /* castoring    */

  /* --------------------------------------------------------- variants */
  var VARIANTS = {
    hc1:  { key: "hc1",  scheme: "raf80", hooks: 1, das: false, flir: false, rnd: "big" },
    hc2:  { key: "hc2",  scheme: "raf90", hooks: 3, das: false, flir: false, rnd: "small" },
    hc4:  { key: "hc4",  scheme: "raf00", hooks: 3, das: true,  flir: true,  rnd: "small2" },
    hc6a: { key: "hc6a", scheme: "raf00", hooks: 3, das: true,  flir: true,  rnd: "small2" }
  };

  /* ------------------------------------------------------ paint schemes
     Authored darker than the photographs, because the ACES pass lifts mid
     tones (the H-60 hero's US Army green is #40463a). raf80: the HC.1's
     dark green with dark sea grey bands (ZD984 1986: the green reads
     #6a6c63 and the faded grey #959ea4 in sun; taken to 0.7 and 0.75 of
     that); raf90/raf00: the overall dark green of the HC2 to HC6A (ZD983
     #4a5255 overcast, ZH891 #756f59 in sun). */
  var SCHEMES = {
    raf80: { key: "raf80", base: "#474d3d", light: "#515846", dark: "#3d4235", belly: "#454a3c",
             camo: "#656d70", seed: 4711 },
    raf90: { key: "raf90", base: "#4a4f3e", light: "#545946", dark: "#404536", belly: "#474c3c",
             camo: null, seed: 4712 },
    raf00: { key: "raf00", base: "#4c4f3f", light: "#565947", dark: "#424537", belly: "#494c3d",
             camo: null, seed: 4713 }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres: 0 TOP (x across, y down), 1 PORT (x, z),
     2 STARBOARD (x, z), 3 BELLY (x, y). projUV() picks the band by normal. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -8.0, UX1 = 8.0;
  var QY = 2.0;
  var QZ0 = Z(0.30), QZ1 = Z(5.00);
  var SX = TW / (UX1 - UX0);
  var SZ = BAND / (QZ1 - QZ0);
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* The RAF roundel as these Chinooks wear it, drawn the us_f35_family.js
     way (concentric discs on the skin sheet): the dull "type B" red and
     blue of every photograph from 1981 to 2022, no white ring. */
  function roundel(g, u, v, ru, rv) {
    g.fillStyle = "rgba(44,58,104,0.92)";
    g.beginPath(); g.ellipse(u, v, ru, rv, 0, 0, PI * 2); g.fill();
    g.fillStyle = "rgba(150,46,44,0.92)";
    g.beginPath(); g.ellipse(u, v, ru * 0.52, rv * 0.52, 0, 0, PI * 2); g.fill();
  }

  function skinCanvas(SC, VR) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(SC.seed);
    var i, b, x, y;

    g.fillStyle = SC.base; g.fillRect(0, 0, TW, TH);

    /* ---- the HC.1's disruptive camouflage: grey bands over the green,
       slanting aft as they climb the sides (ZD984 and ZA683, 1986), carried
       over the roof and under the belly. Each band is a polygon in model
       metres with ragged edges, drawn into all four projections. */
    if (SC.camo) {
      /* five broad bands, about two fifths of the airframe, their edges
         wandering a quarter of a metre either way */
      var bands = [-6.9, -3.7, -0.6, 2.6, 5.9];
      g.fillStyle = SC.camo;
      for (i = 0; i < bands.length; i++) {
        var x0 = bands[i] + (R() - 0.5) * 0.6, wd = 1.25 + R() * 0.7, k = 0.50 + R() * 0.15;
        for (b = 1; b <= 2; b++) {
          g.beginPath();
          var hs = [0.3, 0.9, 1.5, 2.1, 2.7, 3.3, 3.9, 4.5, 5.0], pts = [], q;
          for (q = 0; q < hs.length; q++) pts.push([x0 - k * (hs[q] - 2.0) + (R() - 0.5) * 0.45, hs[q]]);
          for (q = hs.length - 1; q >= 0; q--) pts.push([x0 - k * (hs[q] - 2.0) - wd + (R() - 0.5) * 0.45, hs[q]]);
          for (q = 0; q < pts.length; q++) {
            var ux = pxX(pts[q][0]), uy = pySide(Z(pts[q][1]), b);
            if (q) g.lineTo(ux, uy); else g.moveTo(ux, uy);
          }
          g.closePath(); g.fill();
        }
        /* roof and belly: the band where it leaves the sides, joined across */
        var xt = x0 - k * (3.3 - 2.0), xb = x0 - k * (0.7 - 2.0);
        g.beginPath();
        g.moveTo(pxX(xt), pyTop(QY)); g.lineTo(pxX(xt - 0.35), pyTop(0.6)); g.lineTo(pxX(xt - 0.1), pyTop(-0.7)); g.lineTo(pxX(xt), pyTop(-QY));
        g.lineTo(pxX(xt - wd), pyTop(-QY)); g.lineTo(pxX(xt - wd - 0.25), pyTop(-0.5)); g.lineTo(pxX(xt - wd - 0.4), pyTop(0.7)); g.lineTo(pxX(xt - wd), pyTop(QY));
        g.closePath(); g.fill();
        g.beginPath();
        g.moveTo(pxX(xb), pyBelly(QY)); g.lineTo(pxX(xb + 0.3), pyBelly(0)); g.lineTo(pxX(xb), pyBelly(-QY));
        g.lineTo(pxX(xb - wd), pyBelly(-QY)); g.lineTo(pxX(xb - wd + 0.3), pyBelly(0)); g.lineTo(pxX(xb - wd), pyBelly(QY));
        g.closePath(); g.fill();
      }
    }

    /* ---- panel-to-panel colour: repainted panels a shade off */
    for (i = 0; i < 150; i++) {
      var pw = (0.4 + R() * 1.4) * SX, ph = 8 + R() * 26;
      g.fillStyle = (i & 1) ? SC.light : SC.dark;
      g.globalAlpha = 0.16 + R() * 0.22;
      g.fillRect(R() * TW, R() * TH, pw, ph);
    }
    g.globalAlpha = 1;
    /* sun-faded roof, grimy sides, a dirtier belly */
    g.fillStyle = "rgba(255,255,236,0.05)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 170; i++) {
      g.fillStyle = "rgba(20,20,18," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 36);
    }
    g.fillStyle = SC.belly; g.globalAlpha = 0.5; g.fillRect(0, 3 * BAND, TW, BAND); g.globalAlpha = 1;
    for (i = 0; i < 100; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.04 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }
    /* exhaust soot down the aft pylon sides behind the T55 pipes */
    for (b = 1; b <= 2; b++) {
      var sg = g.createLinearGradient(pxX(-6.0), 0, pxX(-7.8), 0);
      sg.addColorStop(0, "rgba(16,15,13,0.40)"); sg.addColorStop(1, "rgba(16,15,13,0.05)");
      g.fillStyle = sg;
      g.fillRect(pxX(-7.8), pySide(Z(3.75), b), pxX(-6.0) - pxX(-7.8), pySide(Z(2.85), b) - pySide(Z(3.75), b));
    }

    /* ---- frames and stringers at the airframe's stations */
    var frames = [7.06, 6.47, 5.60, 4.40, 3.70, 2.90, 2.10, 1.30, 0.50, -0.30, -1.10, -1.90,
                  -2.70, -3.50, -4.40, -5.20, -6.00, -6.80, -7.40];
    g.lineWidth = 1.4;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.28)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.05)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(150,150,140,0.16)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.2;
    [0.95, 1.88, 2.45, 2.85].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(pxX(-7.7), yy); g.lineTo(pxX(7.0), yy); g.stroke();
      }
    });
    [-0.45, 0.45].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-3.0), yy); g.lineTo(pxX(4.2), yy); g.stroke();
    });
    g.lineWidth = 1.1;
    for (i = 0; i < 60; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 10 + R() * 30, hh = 8 + R() * 18;
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.strokeRect(hx, hy, hw, hh);
    }

    /* ---- doors and the ramp. The forward cabin door on the starboard side
       just aft of the cockpit (ZD984, ZH891); the port side's escape hatch
       there; the ramp's edges under the tail and its hinge line; the floor
       hatch over the centre hook. */
    function door(b, x0, x1, h0, h1) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
      g.strokeRect(pxX(x1), pySide(Z(h1), b), pxX(x0) - pxX(x1), pySide(Z(h0), b) - pySide(Z(h1), b));
      g.strokeStyle = "rgba(255,255,255,0.07)"; g.lineWidth = 1;
      g.strokeRect(pxX(x1) + 2, pySide(Z(h1), b) + 2, pxX(x0) - pxX(x1) - 4, pySide(Z(h0), b) - pySide(Z(h1), b) - 4);
    }
    door(2, 5.30, 4.38, 0.95, 2.95);
    door(1, 4.95, 4.05, 1.85, 2.70);
    door(1, 6.40, 5.45, 1.05, 2.95); door(2, 6.40, 5.80, 1.05, 2.95);
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 2.4;
    for (b = 1; b <= 2; b++) {
      g.beginPath(); g.moveTo(pxX(-4.40), pySide(Z(0.75), b)); g.lineTo(pxX(-7.73), pySide(Z(2.40), b)); g.stroke();
    }
    g.beginPath(); g.moveTo(pxX(-4.40), pyBelly(1.15)); g.lineTo(pxX(-4.40), pyBelly(-1.15)); g.stroke();
    g.beginPath(); g.moveTo(pxX(-4.40), pyBelly(1.12)); g.lineTo(pxX(-7.73), pyBelly(1.05));
    g.moveTo(pxX(-4.40), pyBelly(-1.12)); g.lineTo(pxX(-7.73), pyBelly(-1.05)); g.stroke();
    g.strokeRect(pxX(-0.05), pyBelly(0.42), pxX(0.75) - pxX(-0.05), pyBelly(-0.42) - pyBelly(0.42));
    /* walkway lines along the roof */
    g.strokeStyle = "rgba(10,10,8,0.40)"; g.lineWidth = 1.3;
    [-0.30, 0.30].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-2.9), yy); g.lineTo(pxX(4.1), yy); g.stroke();
    });

    /* ---- national markings only: no serials, codes or squadron marks */
    for (b = 1; b <= 2; b++) {
      if (VR.rnd === "big") roundel(g, pxX(3.70), pySide(Z(2.73), b), 0.33 * SX, 0.33 * SZ);
      else roundel(g, pxX(3.62), pySide(Z(2.82), b), 0.21 * SX, 0.21 * SZ);
      if (VR.rnd === "small2") roundel(g, pxX(-0.55), pySide(Z(1.42), b), 0.17 * SX, 0.17 * SZ);
    }
    return cv;
  }

  var _cv = {}, _tex = {};
  function skinTexture(SC, VR) {
    var k = SC.key + VR.rnd;
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(SC, VR);
      var t = new V.CanvasTexture(_cv[k]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;   /* r148 */
      _tex[k] = t;
    } catch (e) { _tex[k] = false; }
    return _tex[k];
  }

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
      var band = nz > 0.62 ? 0 : nz < -0.62 ? 3 : (ny >= 0 ? 1 : 2);
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

  /* ========================================================= materials == */
  function makeMats(C, VR) {
    var SC = SCHEMES[VR.scheme];
    var tex = skinTexture(SC, VR);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.87, metalness: 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(SC.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6266, roughness: 0.46, metalness: 0.62 });
    /* fittings, inlet screens, soot, antennas: near-black so a stand-in's
       era paint would leave them alone (render3d.js eraPaint) */
    m.dark   = new V.MeshStandardMaterial({ color: 0x15181a, roughness: 0.66, metalness: 0.30 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x0b0c0c, roughness: 0.95, metalness: 0.02 });
    m.gmetal = new V.MeshStandardMaterial({ color: 0x4e5458, roughness: 0.50, metalness: 0.55 });
    /* the composite blades, dark grey, weathered flat */
    m.blade  = new V.MeshStandardMaterial({ color: 0x2c2f2c, roughness: 0.80, metalness: 0.10 });
    m.hub    = new V.MeshStandardMaterial({ color: 0x3e4447, roughness: 0.52, metalness: 0.58 });
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x080d10, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05, side: V.DoubleSide });
    /* exactly C.team; the emissive keeps it from greying out under ACES */
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
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
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  function disc(r, seg, c, n) {
    var g = new V.CircleGeometry(r, seg);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1),
      new V.Vector3(n[0], n[1], n[2]).normalize()));
    g.translate(c[0], c[1], c[2]);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
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
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var out1 = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
        if (out1 >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function pod(secs) {
    var faces = [secs[0], secs[secs.length - 1]], q, j, n = secs[0].length;
    for (q = 0; q < secs.length - 1; q++)
      for (j = 0; j < n; j++)
        faces.push([secs[q][j], secs[q][(j + 1) % n], secs[q + 1][(j + 1) % n], secs[q + 1][j]]);
    return convex(faces);
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners,
     box-like where e is low. Above the widest line the half-width runs from
     wm to wt as |zn| to the power pt, so a high pt keeps the side upright
     and turns it in late, into the Chinook's rounded roof; below, to wb as
     |zn|^pb. Heights are ABOVE GROUND. Sections run nose to tail (x
     decreasing) and the quads are wound (a, c, b): normals outward, as in
     h60_hawk_family.js. */
  function sec(x, zb, zt, zm, wb, wm, wt, e, o) {
    o = o || {};
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e,
             et: o.et || e, pt: o.pt || 1, pb: o.pb || 1, yc: o.yc || 0 };
  }
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th), up = sn > 0;
    var ee = up ? s.et : s.e;
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), ee);
    var z = s.zm + zn * (up ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((up ? s.wt : s.wb) - s.wm) * Math.pow(Math.abs(zn), up ? s.pt : s.pb);
    return [W * Math.pow(Math.abs(c), ee) + s.yc, z];
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(ringPt(s, -PI / 2 + PI * i / n));
    for (i = n - 1; i >= 1; i--) pts.push([2 * s.yc - pts[i][0], pts[i][1]]);
    return pts;
  }
  function lerpSec(A, B, f) {
    var o = {};
    ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "et", "pt", "pb", "yc"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
    return o;
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
  /* a loft through explicit closed rings of [y, z] points (all the same
     count, ordered belly -> +y -> top -> -y), nose to tail */
  function rloft(sts, capF, capA) {
    var pos = [], idx = [], rl = sts[0].pts.length, i, j;
    for (i = 0; i < sts.length; i++) for (j = 0; j < rl; j++) pos.push(sts[i].x, sts[i].pts[j][0], sts[i].pts[j][1]);
    for (i = 0; i < sts.length - 1; i++) for (j = 0; j < rl; j++) {
      var a = i * rl + j, b = i * rl + (j + 1) % rl, c = (i + 1) * rl + j, d = (i + 1) * rl + (j + 1) % rl;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, front) {
      var s = sts[k], t = [], cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cy += s.pts[j][0]; cz += s.pts[j][1]; }
      var o = [s.x, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, s.pts[j][0], s.pts[j][1]], p1 = [s.x, s.pts[(j + 1) % rl][0], s.pts[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (capF) cap(0, true);
    if (capA) cap(sts.length - 1, false);
    return out;
  }
  function latheX(prof, seg, y, z) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), -prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateZ(PI / 2);
    g.translate(0, y, z);
    return g;
  }

  /* ---- surface patches cut from a loft and laid a few cm proud of it
     (h60_hawk_family.js): windows and the team panels */
  function surfPt(secs, x, th) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x + 1e-9 && x >= B.x - 1e-9) {
        var f = (A.x - x) / (A.x - B.x);
        var n = secs.n, u = (th + PI / 2) / (PI / n), j = Math.max(0, Math.min(n - 1, Math.floor(u))), g = u - j;
        var t0 = -PI / 2 + PI * j / n, t1 = t0 + PI / n;
        var a = ringPt(A, t0), b = ringPt(A, t1), c = ringPt(B, t0), d = ringPt(B, t1);
        if (f + g <= 1)
          return [x, a[0] + f * (c[0] - a[0]) + g * (b[0] - a[0]), a[1] + f * (c[1] - a[1]) + g * (b[1] - a[1])];
        return [x, d[0] + (1 - f) * (b[0] - d[0]) + (1 - g) * (c[0] - d[0]),
                   d[1] + (1 - f) * (b[1] - d[1]) + (1 - g) * (c[1] - d[1])];
      }
    }
    return null;
  }
  function thAtZ(secs, x, z) {
    var lo = -PI / 2, hi = PI / 2, i, m;
    for (i = 0; i < 40; i++) { m = (lo + hi) / 2; if (surfPt(secs, x, m)[2] < z) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function thAtY(secs, x, y) {
    var lo = 0, hi = PI / 2, i, m;
    for (i = 0; i < 40; i++) { m = (lo + hi) / 2; if (surfPt(secs, x, m)[1] > y) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function surfN(secs, x, th, x0, x1) {
    var e = 1e-3, dx = 0.01;
    var xa = Math.min(x0, x + dx), xb = Math.max(x1, x - dx);
    var pt = surfPt(secs, x, Math.min(PI / 2, th + e)), pm = surfPt(secs, x, Math.max(-PI / 2, th - e));
    var pa = surfPt(secs, xa, th), pb = surfPt(secs, xb, th);
    var t = [pt[0] - pm[0], pt[1] - pm[1], pt[2] - pm[2]], u = [pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]];
    var n = [t[1] * u[2] - t[2] * u[1], t[2] * u[0] - t[0] * u[2], t[0] * u[1] - t[1] * u[0]];
    var l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]) || 1;
    return [n[0] / l, n[1] / l, n[2] / l];
  }
  function patch(secs, xa, xb, t0, t1, nx, nt, off) {
    var P = [], N = [], i, j, pos = [], nor = [];
    var x0 = Math.max(xa, xb), x1 = Math.min(xa, xb);
    for (i = 0; i <= nx; i++) {
      var x = xa + (xb - xa) * i / nx, a = t0(x), b = t1(x);
      P.push([]); N.push([]);
      for (j = 0; j <= nt; j++) {
        var th = a + (b - a) * j / nt, p = surfPt(secs, x, th), n = surfN(secs, x, th, x0, x1);
        P[i].push([p[0] + n[0] * off, p[1] + n[1] * off, p[2] + n[2] * off]); N[i].push(n);
      }
    }
    function push(p, q, r, np, nq, nr) {
      var ux = q[0] - p[0], uy = q[1] - p[1], uz = q[2] - p[2], vx = r[0] - p[0], vy = r[1] - p[1], vz = r[2] - p[2];
      var fx = uy * vz - uz * vy, fy = uz * vx - ux * vz, fz = ux * vy - uy * vx;
      if (fx * (np[0] + nq[0] + nr[0]) + fy * (np[1] + nq[1] + nr[1]) + fz * (np[2] + nq[2] + nr[2]) < 0) {
        var t = q; q = r; r = t; t = nq; nq = nr; nr = t;
      }
      pos.push(p[0], p[1], p[2], q[0], q[1], q[2], r[0], r[1], r[2]);
      nor.push(np[0], np[1], np[2], nq[0], nq[1], nq[2], nr[0], nr[1], nr[2]);
    }
    for (i = 0; i < nx; i++) for (j = 0; j < nt; j++) {
      push(P[i][j], P[i + 1][j], P[i][j + 1], N[i][j], N[i + 1][j], N[i][j + 1]);
      push(P[i + 1][j], P[i + 1][j + 1], P[i][j + 1], N[i + 1][j], N[i + 1][j + 1], N[i][j + 1]);
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    return g;
  }
  function cnst(v) { return function () { return v; }; }
  function lin(xa, va, xb, vb) { return function (x) { return va + (vb - va) * (x - xa) / (xb - xa); }; }

  /* ========================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "ch47_" + VR.key;
    var i, k, s;
    var skin = [], dark = [], metal = [], team = [], glass = [];

    /* --------------------------------------------------- the fuselage ----
       Nose to the aft pylon's trailing edge. The blunt nose with the chin
       windows round its lower front; the windshield raked back from 2.40 m
       at x 7.06 to the cockpit roof at 3.20 m (ZD984); then the cabin, 2.48
       m across its flat sides, its roof turned in hard above 2.6 m so the
       T55s on the aft pylon clear its shoulders (front view: their axes
       2.06 m apart, 3.3 m up); the belly flat at 0.70 m; from the aft gear
       the ramp sweeps up to 2.38 m under the pylon's trailing edge.
                x      zb    zt    zm    wb    wm    wt    e              */
    var CAB = { et: 0.5, pt: 2.0, pb: 3.0 };
    var FUS = [
      sec( 7.80, 1.74, 1.98, 1.86, 0.30, 0.42, 0.30, 0.80),
      sec( 7.74, 1.54, 2.14, 1.84, 0.56, 0.70, 0.52, 0.62),
      sec( 7.62, 1.38, 2.27, 1.82, 0.78, 0.90, 0.72, 0.50),
      sec( 7.45, 1.26, 2.35, 1.80, 0.92, 1.03, 0.85, 0.44),
      sec( 7.25, 1.17, 2.39, 1.80, 1.02, 1.12, 0.93, 0.40),
      sec( 7.06, 1.11, 2.40, 1.82, 1.08, 1.17, 0.96, 0.36),
      sec( 6.88, 1.06, 2.64, 1.88, 1.12, 1.21, 0.86, 0.34, { et: 0.45, pt: 1.6 }),
      sec( 6.68, 1.02, 2.92, 1.96, 1.14, 1.23, 0.74, 0.32, { et: 0.48, pt: 1.8 }),
      sec( 6.47, 0.98, 3.20, 2.10, 1.15, 1.24, 0.58, 0.30, CAB),
      sec( 6.10, 0.94, 3.24, 2.20, 1.15, 1.24, 0.55, 0.30, CAB),
      sec( 5.40, 0.86, 3.28, 2.30, 1.15, 1.24, 0.52, 0.30, CAB),
      sec( 4.40, 0.76, 3.30, 2.36, 1.14, 1.24, 0.50, 0.30, CAB),
      sec( 3.40, 0.71, 3.30, 2.38, 1.14, 1.24, 0.50, 0.30, CAB),
      sec( 1.60, 0.70, 3.30, 2.38, 1.14, 1.24, 0.50, 0.30, CAB),
      sec(-0.40, 0.70, 3.30, 2.38, 1.14, 1.24, 0.50, 0.30, CAB),
      sec(-2.40, 0.70, 3.30, 2.38, 1.14, 1.24, 0.50, 0.30, CAB),
      sec(-3.80, 0.71, 3.30, 2.40, 1.14, 1.24, 0.50, 0.30, CAB),
      sec(-4.40, 0.76, 3.30, 2.42, 1.12, 1.24, 0.50, 0.30, CAB),
      sec(-5.00, 0.97, 3.30, 2.48, 1.10, 1.24, 0.50, 0.30, CAB),
      sec(-5.60, 1.28, 3.30, 2.56, 1.07, 1.23, 0.50, 0.32, CAB),
      sec(-6.20, 1.60, 3.30, 2.66, 1.02, 1.21, 0.50, 0.34, CAB),
      sec(-6.80, 1.93, 3.30, 2.78, 0.96, 1.18, 0.50, 0.36, CAB),
      sec(-7.30, 2.20, 3.30, 2.88, 0.90, 1.13, 0.50, 0.38, CAB),
      sec(-7.73, 2.38, 3.30, 2.94, 0.84, 1.06, 0.50, 0.40, CAB)
    ];
    function fusAt(x) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) return lerpSec(A, B, (A.x - x) / (A.x - B.x));
      }
      return null;
    }
    var FUS_N = 16;
    FUS.n = FUS_N;
    var fl = loft(FUS, FUS_N, 0.03, 0.0);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);
    function sideY(x, z) { return surfPt(FUS, x, thAtZ(FUS, x, z))[1]; }

    /* ------------------------------------------------- the fuel pods ----
       The sponsons: 3.78 m across (12 ft 5 in), from 0.64 to 1.88 m up,
       from just ahead of the forward gear to behind the aft gear (x 4.05 to
       -5.55: ZH891, the three-view's side view). The section is the front
       view's: the top falls from the cabin side to a rounded outer edge, the
       side upright, the bottom rounded under into the belly. Its inner part
       is buried in the cabin. The ends round off toward the cabin wall. */
    var SP = [[1.00, 0.64], [1.45, 0.64], [1.66, 0.67], [1.81, 0.76], [1.88, 0.92], [1.90, 1.15],
              [1.89, 1.44], [1.83, 1.61], [1.67, 1.75], [1.44, 1.84], [1.20, 1.89], [1.00, 1.90]];
    function spRing(x, sy, sz) {
      var zc = 1.27, pts = [], q;
      for (q = 0; q < SP.length; q++) pts.push([1.00 + (SP[q][0] - 1.00) * sy, Z(zc + (SP[q][1] - zc) * sz)]);
      return { x: x, pts: pts };
    }
    var SPS = [[4.05, 0.10, 0.25], [4.00, 0.38, 0.62], [3.88, 0.62, 0.82], [3.66, 0.82, 0.94],
               [3.36, 0.95, 0.99], [2.95, 1.0, 1.0], [-4.70, 1.0, 1.0], [-5.08, 0.94, 0.97],
               [-5.32, 0.80, 0.88], [-5.48, 0.56, 0.68], [-5.55, 0.20, 0.30]];
    var spSts = SPS.map(function (a) { return spRing(a[0], a[1], a[2]); });
    rloft(spSts, true, true).forEach(function (geo) { both(skin, geo); });

    /* --------------------------------------------- the forward pylon ----
       Over the cockpit: its face rising from the cockpit roof at x 6.72 to
       its top at 4.06-4.10 m, flat back to its upright after face at x 4.22
       (ZD984; HC4 ZA718 head on: about two thirds of the cabin's width,
       narrowing upward). */
    var PYF = [
      sec( 6.74, 2.86, 3.22, 3.10, 0.66, 0.70, 0.50, 0.50),
      sec( 6.58, 2.86, 3.58, 3.16, 0.80, 0.84, 0.52, 0.44, { pt: 1.6 }),
      sec( 6.40, 2.86, 3.88, 3.18, 0.82, 0.86, 0.54, 0.40, { pt: 1.6 }),
      sec( 6.20, 2.86, 4.04, 3.20, 0.82, 0.86, 0.55, 0.38, { pt: 1.6 }),
      sec( 5.70, 2.86, 4.10, 3.20, 0.82, 0.86, 0.56, 0.36, { pt: 1.6 }),
      sec( 4.70, 2.86, 4.09, 3.20, 0.82, 0.86, 0.56, 0.36, { pt: 1.6 }),
      sec( 4.32, 2.86, 4.05, 3.20, 0.80, 0.84, 0.54, 0.38, { pt: 1.6 }),
      sec( 4.22, 2.86, 3.98, 3.20, 0.78, 0.82, 0.52, 0.40, { pt: 1.6 })
    ];
    PYF.n = 10;
    loft(PYF, PYF.n, 0.02, 0.0).forEach(function (geo) { skin.push(geo); });

    /* ------------------------------------------------- the aft pylon ----
       The tall rear pylon: its leading edge curving up off the roof from x
       -3.0 to the top at 4.78 m by x -4.3, the top level to the trailing
       edge at x -7.73, which is upright from 4.79 m down to the ramp's top
       at 2.38 (ZD984 tail close-up). 1.0 m across at the top, wider at its
       foot (three-view front view). */
    var PYA = [
      sec(-3.00, 2.80, 3.34, 3.20, 0.74, 0.74, 0.58, 0.50),
      sec(-3.18, 2.80, 3.66, 3.22, 0.74, 0.74, 0.56, 0.44, { pt: 1.4 }),
      sec(-3.45, 2.80, 4.04, 3.24, 0.72, 0.72, 0.54, 0.40, { pt: 1.4 }),
      sec(-3.78, 2.80, 4.44, 3.26, 0.70, 0.70, 0.52, 0.38, { pt: 1.4 }),
      sec(-4.12, 2.80, 4.70, 3.28, 0.69, 0.69, 0.51, 0.36, { pt: 1.4 }),
      sec(-4.55, 2.80, 4.79, 3.28, 0.68, 0.68, 0.50, 0.35, { pt: 1.4 }),
      sec(-7.40, 2.80, 4.81, 3.28, 0.66, 0.66, 0.49, 0.35, { pt: 1.4 }),
      sec(-7.73, 2.80, 4.79, 3.28, 0.64, 0.64, 0.48, 0.36, { pt: 1.4 })
    ];
    PYA.n = 10;
    loft(PYA, PYA.n, 0.02, 0.0).forEach(function (geo) { skin.push(geo); });
    /* the pylon's rear face below the cabin roof line: the upper ramp door
       closes the fuselage there, the loft's own end cap */

    /* ------------------------------------------------------- the T55s ----
       On the aft pylon's sides (ZD984 and ZA718): the conical inlet screen
       ahead, the nacelle, and the straight exhaust pipe aft, its mouth
       sooted. A fairing ties each to the pylon. */
    var EZ = Z(ENG_H);
    var nacProf = [[-3.42, 0.04], [-3.50, 0.16], [-3.66, 0.32], [-3.86, 0.44], [-3.98, 0.45],
                   [-4.10, 0.40], [-4.40, 0.38], [-5.10, 0.38], [-5.40, 0.33], [-5.46, 0.29]];
    both(skin, latheX(nacProf, 18, ENG_Y, EZ));
    both(dark, latheX([[-3.43, 0.035], [-3.51, 0.15], [-3.67, 0.31], [-3.86, 0.43]], 18, ENG_Y, EZ));
    both(metal, latheX([[-5.40, 0.29], [-6.07, 0.29], [-6.08, 0.27], [-6.00, 0.24]], 16, ENG_Y, EZ));
    /* the sooted mouth, facing aft, and the pipe's lining seen from behind */
    both(dark, disc(0.245, 16, [-5.90, ENG_Y, EZ], [-1, 0, 0]));
    both(dark, latheX([[-5.90, 0.245], [-6.06, 0.268]], 16, ENG_Y, EZ));
    both(skin, convex([[[-4.15, 0.62, EZ - 0.12], [-4.15, ENG_Y - 0.28, EZ - 0.12], [-4.15, ENG_Y - 0.28, EZ + 0.14], [-4.15, 0.62, EZ + 0.14]],
                       [[-5.25, 0.60, EZ - 0.12], [-5.25, ENG_Y - 0.28, EZ - 0.12], [-5.25, ENG_Y - 0.28, EZ + 0.14], [-5.25, 0.60, EZ + 0.14]]]));

    /* --------------------------------------------------- the masts -----
       From each pylon's top to its head, fixed in the tilt frames below. */

    /* --------------------------------------------------- the glazing ----
       Cut from the loft 2.5 cm proud. Three windshield panes between two
       posts; the cockpit side windows; the big chin windows wrapping the
       lower nose either side of a centre post (three-view front view, ZA718
       head on, the 1981 HC.1). */
    var OFF = 0.05;
    both(glass, patch(FUS, 7.03, 6.52, function (x) { return thAtY(FUS, x, 0.95); },
                      function (x) { return thAtY(FUS, x, 0.36); }, 5, 4, OFF));
    both(glass, patch(FUS, 7.03, 6.52, function (x) { return thAtY(FUS, x, 0.30); },
                      cnst(PI / 2 - 0.002), 5, 2, OFF));
    /* chin windows */
    both(glass, patch(FUS, 7.60, 7.14, function (x) { return thAtZ(FUS, x, Z(1.50)); },
                      function (x) { return thAtZ(FUS, x, Z(2.08)); }, 6, 4, OFF));
    /* cockpit side windows: the upper pane and the door's lower one */
    both(glass, patch(FUS, 6.86, 6.12, function (x) { return thAtZ(FUS, x, Z(2.30)); },
                      function (x) { return thAtZ(FUS, x, Z(Math.min(3.02, 2.40 + (7.06 - x) * 1.05))); }, 4, 4, OFF));
    both(glass, patch(FUS, 6.80, 6.20, function (x) { return thAtZ(FUS, x, Z(1.52)); },
                      function (x) { return thAtZ(FUS, x, Z(2.14)); }, 3, 3, OFF));
    /* the round cabin windows: four a side and the one in the starboard
       door; the port escape hatch's at the same station (ZD984, ZD983) */
    function porthole(x, h, side, r) {
      var th = thAtZ(FUS, x, Z(h)), p = surfPt(FUS, x, th), n = surfN(FUS, x, th, x + 0.01, x - 0.01);
      var d = disc(r, 14, [p[0] + n[0] * 0.02, p[1] + n[1] * 0.02, p[2] + n[2] * 0.02], n);
      glass.push(side < 0 ? mirrorY(d) : d);
      var rim = new V.RingGeometry(r, r + 0.045, 14, 1);
      rim.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1), new V.Vector3(n[0], n[1], n[2])));
      rim.translate(p[0] + n[0] * 0.018, p[1] + n[1] * 0.018, p[2] + n[2] * 0.018);
      dark.push(side < 0 ? mirrorY(rim) : rim);
    }
    [2.66, 0.57, -1.54, -3.63].forEach(function (x) { porthole(x, 2.25, 1, 0.27); porthole(x, 2.25, -1, 0.27); });
    porthole(4.84, 2.25, -1, 0.24);
    porthole(4.50, 2.28, 1, 0.24);

    /* ------------------------------------------------ the cargo hooks ----
       Under the belly on the centreline: the centre hook in its floor
       hatch, the forward and aft hooks either side (ZA680 from below). The
       HC.1 is given the CH-47C's single centre hook. */
    function hook(x) {
      var zb = fusAt(x).zb;
      dark.push(box(0.36, 0.26, 0.10, x, 0, zb - 0.04));
      metal.push(bar([x, 0, zb - 0.08], [x, 0, zb - 0.30], 0.035, 6, true));
      metal.push(place(new V.TorusGeometry(0.075, 0.022, 4, 10, PI * 1.4), x, 0, zb - 0.36, PI / 2, 0, 0));
    }
    hook(0.35);
    if (VR.hooks === 3) { hook(2.35); hook(-1.75); }

    /* ---------------------------------------------- antennas and kit ---- */
    /* blade aerials along the roof (ZD984, ZD983) */
    [3.40, 1.10, -1.60].forEach(function (x) {
      dark.push(box(0.30, 0.03, 0.26, x, 0, Z(3.30) + 0.12, 0, 0.35, 0));
    });
    dark.push(box(0.28, 0.03, 0.18, -2.6, 0, Z(0.70) - 0.08));
    /* the pitot heads on the nose */
    for (s = -1; s <= 1; s += 2) {
      metal.push(bar([7.30, s * 0.70, Z(2.30)], [7.62, s * 0.70, Z(2.32)], 0.014, 5, true));
    }
    /* steps up the forward pylon's front and the access handholds */
    for (k = 0; k < 3; k++) dark.push(box(0.03, 0.30, 0.04, 6.70 - k * 0.11, 0, Z(3.30 + k * 0.22)));

    if (VR.flir) {
      /* the Project Julius FLIR turret under the nose (ZA718 head on) */
      skin.push(cyl(0.10, 0.12, 0.20, 10, "z", 7.20, 0, Z(1.12) - 0.08));
      skin.push(sph(0.21, 14, 10, 7.20, 0, Z(0.80)));
      glass.push(box(0.03, 0.16, 0.14, 7.41, 0, Z(0.80)));
    }
    if (VR.das) {
      /* defensive aids: the missile-warning sensors at the nose and on the
         aft pylon's sides, the flare dispensers on the sponsons' after ends
         (ZD983 2013, ZH891 2018) */
      [[7.20, Z(1.35)], [-7.20, Z(2.65)]].forEach(function (p) {
        var y0 = sideY(p[0], p[1]);
        both(dark, sph(0.085, 10, 6, p[0], y0 + 0.02, p[1], 1, 0.7, 1));
      });
      [-3.25, -4.30].forEach(function (x) {
        both(dark, box(0.36, 0.10, 0.26, x, 1.86, Z(1.40)));
      });
    }

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, as the RTS camera looks down: a panel on the top of
       each pylon, the two stretches of the upper airframe the rotor heads
       leave clear. Exactly C.team. */
    both(team, patch(PYF, 5.30, 4.45, function (x) { return thAtY(PYF, x, 0.40); },
                     cnst(PI / 2 - 0.001), 3, 3, 0.02));
    both(team, patch(PYA, -4.80, -5.55, function (x) { return thAtY(PYA, x, 0.36); },
                     cnst(PI / 2 - 0.001), 3, 3, 0.02));

    /* ---------------------------------------------- the undercarriage ----
       Fixed, four legs. Forward: twin wheels on each leg under the front of
       the sponson, an oleo up into it and a drag brace forward. Aft: one
       castoring wheel on a trailing fork under the sponson's after end
       (three-view, ZD983, ZH891). */
    var gear = new V.Group();
    gear.name = "undercarriage";   // fixed wheels: not "gear", which hides in flight
    g.add(gear);
    var gm = [], gr = [];
    var fz = Z(GEAR_F.r);
    for (k = 0; k < 2; k++) {
      var wy = GEAR_F.y + (k ? 0.13 : -0.13);
      gr.push(cyl(GEAR_F.r, GEAR_F.r, GEAR_F.w, 18, "y", GEAR_F.x, wy, fz));
      gm.push(cyl(0.17, 0.17, GEAR_F.w + 0.01, 12, "y", GEAR_F.x, wy, fz));
    }
    gm.push(cyl(0.05, 0.05, 0.42, 8, "y", GEAR_F.x, GEAR_F.y, fz));
    gm.push(bar([GEAR_F.x, GEAR_F.y, fz], [GEAR_F.x + 0.05, GEAR_F.y - 0.02, Z(0.80)], 0.075, 8, true));
    gm.push(bar([GEAR_F.x, GEAR_F.y, fz + 0.05], [GEAR_F.x + 0.55, GEAR_F.y - 0.06, Z(0.70)], 0.045, 6, true));
    var az = Z(GEAR_A.r);
    gr.push(cyl(GEAR_A.r, GEAR_A.r, GEAR_A.w, 18, "y", GEAR_A.x, GEAR_A.y, az));
    gm.push(cyl(0.16, 0.16, GEAR_A.w + 0.01, 12, "y", GEAR_A.x, GEAR_A.y, az));
    gm.push(box(0.10, 0.06, 0.40, GEAR_A.x + 0.08, GEAR_A.y + GEAR_A.w / 2 + 0.05, az + 0.12, 0, -0.35, 0));
    gm.push(box(0.10, 0.06, 0.40, GEAR_A.x + 0.08, GEAR_A.y - GEAR_A.w / 2 - 0.05, az + 0.12, 0, -0.35, 0));
    gm.push(box(0.16, GEAR_A.w + 0.18, 0.08, GEAR_A.x + 0.16, GEAR_A.y, az + 0.33));
    gm.push(bar([GEAR_A.x + 0.18, GEAR_A.y, az + 0.33], [GEAR_A.x + 0.20, GEAR_A.y - 0.02, Z(0.86)], 0.075, 8, true));
    var gmS = [], grS = [];
    gm.forEach(function (q) { both(gmS, q); });
    gr.forEach(function (q) { both(grS, q); });
    mesh(gear, gmS, T.gmetal, "gear_legs");
    mesh(gear, grS, T.rubber, "gear_tyres");

    /* ========================================================= rotors ===
       Each head in the h60_hawk_family.js mount: a tilt group at the hub
       leaning the shaft forward, a +PI/2 mount about X, the "rotor" node,
       and a -PI/2 group so the head is authored in model axes. The forward
       head is added first. */
    function rotorHead(H, ccw, nameSfx) {
      /* the mast and the swashplate's fixed ring, in the tilt frame */
      var tiltM = new V.Matrix4().makeRotationY(H.tilt).setPosition(H.x, 0, Z(H.h));
      var pyTop = H === HUB_F ? 4.10 : 4.80;
      var mlen = H.h - pyTop + 0.05;
      var fixed = [cyl(0.17, 0.20, mlen, 14, "z", 0, 0, -mlen / 2 - 0.05),
                   cyl(0.46, 0.46, 0.06, 18, "z", 0, 0, -0.40)];
      fixed.forEach(function (q) { q.applyMatrix4(tiltM); metal.push(q); });

      var tilt = new V.Group();
      tilt.position.set(H.x, 0, Z(H.h));
      tilt.rotation.y = H.tilt;
      g.add(tilt);
      var mnt = new V.Group();
      mnt.rotation.x = PI / 2;
      tilt.add(mnt);
      var rotor = new V.Group();
      rotor.name = "rotor";
      mnt.add(rotor);
      var head = new V.Group();
      head.rotation.x = -PI / 2;
      rotor.add(head);

      /* The fully articulated hub: the hub barrel and its cap, the turning
         ring of the swashplate, and per blade the horizontal and vertical
         hinges, the pitch-varying housing, the lag damper on the trailing
         side, the pitch horn and its link down to the swashplate. The
         leading edge is +Y on the anti-clockwise forward head and -Y on the
         clockwise aft one. */
      var hm = [], bl = [];
      var lead = ccw ? 1 : -1;
      hm.push(cyl(0.26, 0.30, 0.34, 16, "z", 0, 0, 0));
      hm.push(cyl(0.16, 0.24, 0.14, 14, "z", 0, 0, 0.24));
      hm.push(cyl(0.40, 0.40, 0.05, 18, "z", 0, 0, -0.34));
      var ang = [60, 180, 300];
      for (k = 0; k < 3; k++) {
        var a = ang[k] * D2R;
        var parts = [box(0.34, 0.30, 0.22, 0.38, 0, 0),
                     cyl(0.12, 0.10, 0.70, 12, "x", 0.85, 0, 0),
                     box(0.40, 0.16, 0.12, 1.12, 0, 0),
                     cyl(0.05, 0.05, 0.62, 8, "x", 0.70, -lead * 0.22, 0.04),
                     box(0.14, 0.08, 0.06, 0.58, lead * 0.20, -0.08),
                     bar([0.58, lead * 0.22, -0.10], [0.58, lead * 0.24, -0.32], 0.022, 6, true)];
        parts.forEach(function (q) { q.rotateZ(a); hm.push(q); });
        /* the blade, 32 in chord, from the cuff to the tip; its trim tab;
           coned 3 degrees */
        var LE = lead * 0.25 * CHORD, TE = lead * (0.25 * CHORD - CHORD);
        var outline = [[1.20, TE * 0.7], [1.55, TE], [ROTOR_R - 0.05, TE], [ROTOR_R, TE * 0.85],
                       [ROTOR_R, LE * 0.9], [ROTOR_R - 0.10, LE], [1.55, LE], [1.20, LE * 0.7]];
        if (lead < 0) outline.reverse();
        var b = M.slab(V, outline, 0.07);
        b.translate(0, 0, -0.035);
        b.rotateY(-3 * D2R);
        b.rotateZ(a);
        bl.push(b);
        var tab = box(0.50, 0.10, 0.012, ROTOR_R - 2.2, TE - lead * 0.04, 0);
        tab.rotateY(-3 * D2R); tab.rotateZ(a);
        bl.push(tab);
      }
      mesh(head, hm, T.hub, "hub" + nameSfx);
      mesh(head, bl, T.blade, "blades" + nameSfx);
      return rotor;
    }
    rotorHead(HUB_F, true, "_fwd");
    rotorHead(HUB_A, false, "_aft");

    /* ------------------------------------------------ static meshes ----
       after the heads, whose masts and swashplate rings are fixed metal */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");
    return g;
  }

  function variant(k) { return function (THREE, M, C) { return build(THREE, M, C, VARIANTS[k]); }; }
  return { hc1: variant("hc1"), hc2: variant("hc2"), hc4: variant("hc4"), hc6a: variant("hc6a") };
})();

/* len is the MEASURED x extent, the forward head's two forward blades to
   the aft head's aft blade; render3d.js normalises on the measurement. */
UNIT_MODELS["gbr_e80_transport"] = { len: 25.5, build: HeroCH47.hc1 };
UNIT_MODELS["gbr_e90_transport"] = { len: 25.5, build: HeroCH47.hc2 };
UNIT_MODELS["gbr_e00_transport"] = { len: 25.5, build: HeroCH47.hc4 };
UNIT_MODELS["trans_b"]           = { len: 25.5, build: HeroCH47.hc6a };
