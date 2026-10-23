/* ======= us_ch53_stallion.js - HERO model: the Sikorsky CH-53D Sea Stallion and CH-53E Super Stallion =======
   Two defs, two airframes. The CH-53E (S-80) is the CH-53D (S-65) grown:
   a third engine, a seventh blade, a longer fuselage, longer sponsons and a
   new tail. At game zoom they are told apart by the tail first (a straight
   upright pylon with a flat tailplane against a fin leaning hard to port
   with a gull-winged tailplane), then by the hump behind the rotor with the
   third engine's exhaust on it, the long tanks along the E's sponsons and
   her probe, and by the paint.

     nato_e60_ch53  CH-53D Sea Stallion (USMC), 1966 on (the row's e60
                    only): two T64s in side nacelles, six blades, a four-
                    blade tail rotor upright on the port side of the pylon
                    and a straight tailplane on the starboard side of its
                    top; the short sponsons; overall olive drab with the
                    national insignia in full colour on the sponsons.
     nato_e80_ch53  CH-53E Super Stallion (USMC), 1981 on: the third T64 on
                    the port side of the hump behind the mast, its exhaust
                    on top; seven blades; the fin canted 20 degrees to port
                    with the tail rotor on its port side and the gull-wing
                    tailplane on the starboard side; the in-flight
                    refuelling probe low on the starboard side of the nose;
                    the longer sponsons with a 650 US gal tank alongside
                    each; overall tactical grey.

   RECOGNITION LIST, and the reference each rests on
     1. The long boxy cabin with the rear ramp sweeping up into a slim tail
        boom: both Commons drawings (side views), CH-53D HMH-361 side on at
        Twentynine Palms 1981, CH-53E side on at Balikatan 2016.
     2. The engines in nacelles on stubs either side of the upper fuselage,
        level with the cabin roof, intakes forward of the mast: both
        drawings (front views), the 1981 D, the 2016 E.
     3. The blunt rounded nose and big cockpit glazing: both drawings, the
        1981 D, the 2016 E.
     4. Main rotor: six blades on the D, seven on the E (Wikipedia, "Sikorsky
        CH-53 Sea Stallion": "a fully-articulated six-bladed main rotor and
        four-bladed tail rotor"; "Sikorsky CH-53E Super Stallion": "adding a
        seventh blade to the main rotor, and canting the tail rotor 20
        degrees"): both drawings' top views.
     5. The D's upright tail pylon, its tail rotor on the port side and its
        flat tailplane on the starboard side of the pylon top: D drawing
        (top and front views), the 1981 D (the tailplane on the near,
        starboard, side of the pylon top, the disc beyond it).
     6. The E's fin canted to port with the tail rotor on its port side and
        the gull-wing tailplane on the starboard side (Goebel, Vectorsite
        "S-65 / S-80" part 2: "the tailfin canted to the left by 20 degrees
        and an inverted-gull asymmetric tailplane mounted on the right"):
        E drawing (front and top views), the 1989 E on USS Tarawa.
     7. The E's third engine on the port side of the hump behind the mast,
        its big exhaust scoop on top: E drawing (top and side views), the
        2016 E (the scoop seen from starboard), the 1989 E.
     8. The sponsons low on the cabin sides, the main gear under them: both
        drawings, the 1981 D, the 2016 E; the E's longer ("longer sponsons
        to increase fuel capacity", Vectorsite).
     9. The E's spindle tanks alongside the sponsons ("provision for big
        external tanks with a capacity of 2,460 liters (650 US gallons)",
        Vectorsite): E drawing (front view, the tanks outboard of the
        sponson tips), the 2016 E, the 1989 E, HC-4's CH-53E.
    10. The E's refuelling probe ("An extensible inflight refueling probe",
        Vectorsite) low on the starboard side of the nose: E drawing (top
        view, starboard of the centreline), the 2016 E, HC-4's CH-53E.
    11. The paint: the D's olive drab (the 1967 Phu Bai, 1969, 1980 157173
        and 1981 photographs), the E's overall grey (2016; see WHAT COULD
        NOT BE CONFIRMED).

   REFERENCES
     Wikimedia Commons "Sikorsky CH-53D Sea Stallion Drawing.svg" and
       "Sikorsky CH-53E Super Stallion Drawing.svg" (side, top, front).
       Each side view was scaled so its nose-to-tail-gearbox length is the
       published fuselage length; the hub-to-tail-rotor distance it then
       gives (13.75 and 15.13 m) agrees with the published rotors-turning
       lengths (13.45 and 15.10 m), which were used. Their top views put the
       hub up to 0.9 m further aft and were used for widths only.
     G. Goebel, Vectorsite (web.archive.org, vectorsite.net avskbig_1 and
       avskbig_2): CH-53D rotor 22.02 m, tail rotor 4.88 m, fuselage 20.47
       m, rotors turning 26.9 m, height to the rotor head 5.22 m; CH-53E
       rotor 24.08 m, tail rotor 6.10 m, fuselage 22.35 m, rotors turning
       30.19 m, tail rotor top 8.66 m, rotor head 5.32 m; "tricycle
       landing retractable landing gear, with twin wheels on all gear
       assemblies and the main gear retracting into the sponsons" (CH-53A,
       and the D and E keep it); the E's fuselage stretch of 1.88 m, its
       tail, probe and tanks as quoted above.
     Wikipedia: CH-53D 67 ft 6 in fuselage, 15 ft 6 in across; rotor 72 ft
       2.8 in; CH-53E 99 ft 0.5 in rotors turning, rotor 79 ft.
     Commons photographs: CH-53A/D at Phu Bai 1967; CH-53D 1969 lifting a
       net; CH-53D 157173 (CJ) on a deck, 1980 (tail, sponson, nacelle);
       CH-53D HMH-361 at Twentynine Palms, 1981 (starboard side, the
       tailplane, the insignia on the sponson); a HC-4 CH-53E in flight from
       the left (probe, tank, gear up); CH-53E with an LAV-25 underslung
       (1980s); two CH-53Es on USS Tarawa, Thalay Thai '89; CH-53E at
       Balikatan 2016 (starboard side); a CH-53E tail rotor hub (USS
       Nassau, 2009).

   MEASURED (x from the mast, heights above the ground)
     CH-53D: nose 6.23 m ahead of the mast, tail rotor hub 13.44 m behind
     it, so 26.89 m from the front of the disc to the tail rotor's aft tip
     (26.9 published); fuselage nose to tail gearbox 20.4 m (20.47); 4.74 m
     over the sponsons (15 ft 6 in = 4.72); cabin 2.66 m wide outside;
     rotor head top 5.30 m (5.22); tail rotor hub 5.75 m.
     CH-53E: nose 6.42 m ahead, tail rotor hub 15.10 m behind, 30.19 m
     rotors turning (30.19); fuselage 22.1 m (22.35); probe tip 3.0 m ahead
     of the nose; tail rotor top tip 8.72 m (8.66); rotor head top 5.40 m
     (5.32); 5.08 m over the sponsons, 6.88 m over the tanks.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent. The faint
     main rotor disc reaches R ahead of the mast and one tail rotor blade is
     built pointing straight aft, so the extent is the published length
     with rotors turning: 26.89 m (D), 30.19 m (E). Both rows have r 17, so
     the game draws both 38.1 game metres long: the D's fuselage 28.9 of
     them, the E's 27.9. The blades are laid so none lies along the
     fuselage.

   SENSE OF ROTATION
     Main rotor: anti-clockwise from above, as every Sikorsky single rotor
     (the house rule in tools/jsc/rotor_axes_check.js: "American ones -
     Sikorsky, Bell, Boeing, Hughes ... turn anti-clockwise"; with the
     tail rotor on the port side pushing the tail to starboard). The head
     hangs in the h60_hawk_family.js mount.
     Tail rotor: top blade aft (clockwise seen from the left), the mount
     turned as the H-60's (local +Z to starboard, 20 degrees up on the E).
     NOT CONFIRMED for the H-53 by any source found in the time; drawn to
     the general rule the H-60 and Mi-24 heroes follow.

   NAMED NODES
     rotor      the main head, in the h60_hawk_family.js mount (+PI/2 about
                X, a -PI/2 group inside), so it turns anti-clockwise from
                above about its own +Y.
     rotordisc  inside the rotor, the faded disc material.
     tailrotor  in a mount turned PI/2 - cant about X, at the hub on the
                port side; render3d.js turns it positively about its own +Z.
     gear       the nose and main legs and their twin wheels: the gear
                RETRACTS (Vectorsite, above; the HC-4 E in flight shows no
                wheels), so it is named "gear" and render3d.js hides it
                above 18 m. It is the lowest opaque part.
   Nothing is named "turret".

   Model space: +X nose, +Y LEFT (port), +Z up, real metres; the origin is
   on the mast, 2.0 m above the ground (GROUND = -2.0).
   Materials: SKIN (one CanvasTexture per scheme, UVs projected by face
   normal into top, port, starboard and belly bands), GLASS, DARK, METAL,
   TEAM, the gear's METAL and RUBBER, the head's METAL, BLADE and DISC, the
   tail rotor's BLADE. Twelve draw calls.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroCH53 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  var GROUND = -2.0;
  function Z(h) { return GROUND + h; }

  /* --------------------------------------------------------- variants */
  var VARIANTS = {
    ch53d: { key: "ch53d", e: false, scheme: "od",
             nose: 6.23, R: 11.01, nb: 6, chord: 0.66, hubH: 4.95, headTop: 5.30,
             trX: -13.44, trY: 0.62, trH: 5.66, trR: 2.44, cant: 0, trChord: 0.36,
             nacX0: 3.50, nacX1: -0.46, nacR: 0.50,
             mainX: -1.85, mainY: 1.99, noseX: 5.43, wr: 0.33, wrN: 0.31,
             band: -9.55 },
    ch53e: { key: "ch53e", e: true, scheme: "tps",
             nose: 6.42, R: 12.04, nb: 7, chord: 0.76, hubH: 5.02, headTop: 5.40,
             trX: -15.10, trY: 1.62, trH: 5.80, trR: 3.05, cant: 20 * D2R, trChord: 0.40,
             nacX0: 3.67, nacX1: -1.14, nacR: 0.55,
             mainX: -2.06, mainY: 1.98, noseX: 5.62, wr: 0.34, wrN: 0.31,
             band: -11.05 }
  };
  var NAC_Y = 1.68, NAC_H = 3.20;

  /* ------------------------------------------------------ paint schemes
     od: the Marines' olive drab of the D's whole service in these
     photographs (1967, 1969, 1980, 1981), sampled about #7c6a3c in the
     1981 evening light and #7a7b56 in the 1980 overcast, taken to about
     0.65 of that. tps: the overall tactical grey of the E (2016: #565b61 in
     the shade of the cabin side, lighter on top), at about 0.85. */
  var SCHEMES = {
    od:  { key: "od",  base: "#4b4b36", light: "#56563f", dark: "#3f3f2e", belly: "#47472f", seed: 5301 },
    tps: { key: "tps", base: "#5f666d", light: "#6a7178", dark: "#535a61", belly: "#5b6268", seed: 5302 }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands: 0 TOP (x across, y
     down, port at the top), 1 PORT (x, z), 2 STARBOARD (x, z), 3 BELLY. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -16.6, UX1 = 6.7;
  var QY = 3.9;
  var QZ0 = Z(0.25), QZ1 = Z(6.6);
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

  /* The US star-and-bar drawn the us_f35_family.js way (discs and a bar on
     the sheet), here in the full colour the D wears in the 1981 photograph:
     a blue disc and bar border, the white star and bars, the red stripe. */
  function starBar(g, u, v, r) {
    var i, a;
    g.fillStyle = "rgba(40,52,96,0.95)";
    g.fillRect(u - r * 2.08, v - r * 0.62, r * 4.16, r * 1.24);
    g.beginPath(); g.arc(u, v, r * 1.06, 0, PI * 2); g.closePath(); g.fill();
    g.fillStyle = "rgba(214,214,206,0.95)";
    g.fillRect(u - r * 2.0, v - r * 0.52, r * 4.0, r * 1.04);
    g.fillStyle = "rgba(40,52,96,0.95)";
    g.beginPath(); g.arc(u, v, r, 0, PI * 2); g.closePath(); g.fill();
    g.fillStyle = "rgba(150,40,38,0.95)";
    g.fillRect(u - r * 2.0, v - r * 0.17, r * 0.98, r * 0.34);
    g.fillRect(u + r * 1.02, v - r * 0.17, r * 0.98, r * 0.34);
    g.fillStyle = "rgba(214,214,206,0.95)";
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = -PI / 2 + i * PI / 5;
      var rr = i % 2 ? r * 0.38 : r * 0.95;
      if (i === 0) g.moveTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
      else g.lineTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
    }
    g.closePath(); g.fill();
  }

  function skinCanvas(SC, VR) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(SC.seed);
    var i, b, x, y;
    var NX = VR.nose;

    g.fillStyle = SC.base; g.fillRect(0, 0, TW, TH);
    /* repainted panels a shade off their neighbours */
    for (i = 0; i < 190; i++) {
      var pw = (0.5 + R() * 1.6) * SX, ph = 8 + R() * 26;
      g.fillStyle = (i & 1) ? SC.light : SC.dark;
      g.globalAlpha = 0.12 + R() * 0.20;
      g.fillRect(R() * TW, R() * TH, pw, ph);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(255,255,236,0.045)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 200; i++) {
      g.fillStyle = "rgba(20,20,18," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 40);
    }
    g.fillStyle = SC.belly; g.globalAlpha = 0.6; g.fillRect(0, 3 * BAND, TW, BAND); g.globalAlpha = 1;
    for (i = 0; i < 120; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.04 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }

    /* exhaust soot: the side engines blow aft and out from the nacelle
       tails over the upper fuselage sides; the E's third engine from its
       scoop over the top of the boom */
    var sx0 = VR.nacX1 + 0.2, sx1 = VR.nacX1 - 4.2;
    var sg = g.createLinearGradient(pxX(sx0), 0, pxX(sx1), 0);
    sg.addColorStop(0, "rgba(16,15,13,0.50)");
    sg.addColorStop(1, "rgba(16,15,13,0)");
    g.fillStyle = sg;
    for (b = 1; b <= 2; b++)
      g.fillRect(pxX(sx1), pySide(Z(3.75), b), pxX(sx0) - pxX(sx1), pySide(Z(2.55), b) - pySide(Z(3.75), b));
    g.fillRect(pxX(sx1), pyTop(2.0), pxX(sx0) - pxX(sx1), pyTop(0.8) - pyTop(2.0));
    g.fillRect(pxX(sx1), pyTop(-0.8), pxX(sx0) - pxX(sx1), pyTop(-2.0) - pyTop(-0.8));
    if (VR.e) {
      var tg = g.createLinearGradient(pxX(-5.2), 0, pxX(-10.5), 0);
      tg.addColorStop(0, "rgba(16,15,13,0.55)");
      tg.addColorStop(1, "rgba(16,15,13,0)");
      g.fillStyle = tg;
      g.fillRect(pxX(-10.5), pyTop(1.1), pxX(-5.2) - pxX(-10.5), pyTop(-0.6) - pyTop(1.1));
      g.fillRect(pxX(-10.5), pySide(Z(4.3), 1), pxX(-5.2) - pxX(-10.5), pySide(Z(3.2), 1) - pySide(Z(4.3), 1));
    }

    /* frames at stations along the whole airframe */
    g.lineWidth = 1.4;
    for (x = NX - 1.0; x > -16; x -= (x > -5 ? 0.62 : 0.85)) {
      var px = pxX(x);
      g.strokeStyle = "rgba(0,0,0,0.26)";
      g.beginPath(); g.moveTo(px, 0); g.lineTo(px, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.05)";
      g.beginPath(); g.moveTo(px + 2, 0); g.lineTo(px + 2, TH); g.stroke();
      g.fillStyle = "rgba(150,150,140,0.16)";
      for (y = 3; y < TH; y += 7) g.fillRect(px - 3, y, 1.3, 1.3);
    }
    /* stringers: the side bands at real heights, the top band over the
       cabin roof edges and the deck */
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.2;
    [0.95, 1.70, 2.55, 2.95, 3.35].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
      }
    });
    [-1.05, -0.62, 0.62, 1.05].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-9), yy); g.lineTo(pxX(NX - 1.4), yy); g.stroke();
    });
    g.lineWidth = 1.1;
    for (i = 0; i < 80; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 8 + R() * 28, hh = 7 + R() * 18;
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.strokeRect(hx, hy, hw, hh);
    }

    /* doors: the crew door on each side behind the cockpit (open in the
       1981 D and the 2016 E on the starboard side, drawn shut), split at
       its middle; the escape hatches round the cabin windows; the ramp and
       the clamshell door above it, outlined on the belly and sides */
    function door(bb, x0, x1, h0, h1) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
      g.strokeRect(pxX(x1), pySide(Z(h1), bb), pxX(x0) - pxX(x1), pySide(Z(h0), bb) - pySide(Z(h1), bb));
      g.strokeStyle = "rgba(255,255,255,0.07)"; g.lineWidth = 1;
      g.strokeRect(pxX(x1) + 2, pySide(Z(h1), bb) + 2, pxX(x0) - pxX(x1) - 4, pySide(Z(h0), bb) - pySide(Z(h1), bb) - 4);
    }
    var dX = VR.e ? 3.60 : 3.48;
    for (b = 1; b <= 2; b++) {
      door(b, dX, dX - 0.95, 0.62, 2.70);
      g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(pxX(dX), pySide(Z(1.52), b)); g.lineTo(pxX(dX - 0.95), pySide(Z(1.52), b)); g.stroke();
    }
    var rx0 = VR.e ? -5.04 : -4.72, rx1 = VR.e ? -7.11 : -6.51;
    g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.4;
    g.strokeRect(pxX(rx1), pyBelly(1.05), pxX(rx0) - pxX(rx1), pyBelly(-1.05) - pyBelly(1.05));
    g.strokeRect(pxX(rx1 - 2.4), pyBelly(0.85), pxX(rx1) - pxX(rx1 - 2.4), pyBelly(-0.85) - pyBelly(0.85));
    /* walkway lines along the deck */
    g.strokeStyle = "rgba(10,10,8,0.40)"; g.lineWidth = 1.2;
    [0.55, -0.55].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-3.0), yy); g.lineTo(pxX(3.2), yy); g.stroke();
    });

    /* the national insignia: the D's, full colour on each sponson's side
       (HMH-361, 1981: abaft the modex, which is not drawn). The E's
       photographs show none on these sides, so it has none. */
    if (!VR.e) for (b = 1; b <= 2; b++) starBar(g, pxX(-0.80), pySide(Z(1.14), b), 0.25 * SZ);
    return cv;
  }

  var _cv = {}, _tex = {};
  function skinTexture(SC, VR) {
    var k = SC.key;
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(SC, VR);
      var t = new V.CanvasTexture(_cv[k]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
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

  /* ========================================================= materials == */
  function makeMats(C, VR) {
    var SC = SCHEMES[VR.scheme];
    var tex = skinTexture(SC, VR);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(SC.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6266, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.32 });
    /* the tyres: black enough for render3d.js eraPaint() to leave alone */
    m.rubber = new V.MeshStandardMaterial({ color: 0x0b0c0c, roughness: 0.95, metalness: 0.02 });
    m.blade  = new V.MeshStandardMaterial({ color: VR.e ? 0x3a3f44 : 0x30322a, roughness: 0.80, metalness: 0.10 });
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x080d10, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05, side: V.DoubleSide });
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ====================================================== geometry kit ==
     The kit of hero/h60_hawk_family.js. */
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
  function bar2(p, q, r0, r1, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r1, r0, L, seg, 1, true);
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
  function inward(geo) {
    var g = flat(geo);
    var p = g.attributes.position.array, n = g.attributes.normal.array, t, k, tmp;
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
    }
    for (t = 0; t < n.length; t++) n[t] = -n[t];
    return g;
  }
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
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  function pod(secs) {
    var faces = [secs[0], secs[secs.length - 1]], q, j, n = secs[0].length;
    for (q = 0; q < secs.length - 1; q++)
      for (j = 0; j < n; j++)
        faces.push([secs[q][j], secs[q][(j + 1) % n], secs[q + 1][(j + 1) % n], secs[q + 1][j]]);
    return convex(faces);
  }
  function facingOut(list, c) {
    var out = [], i;
    for (i = 0; i < list.length; i += 3) {
      var p = list[i], q = list[i + 1], r = list[i + 2];
      var ux = q[0] - p[0], uy = q[1] - p[1], uz = q[2] - p[2], vx = r[0] - p[0], vy = r[1] - p[1], vz = r[2] - p[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var d = nx * (p[0] - c[0]) + ny * (p[1] - c[1]) + nz * (p[2] - c[2]);
      if (d >= 0) out.push(p, q, r); else out.push(p, r, q);
    }
    return tris(out);
  }
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft (hero/h60_hawk_family.js): a section is a trapezoid with
     superelliptic corners; heights are given above the ground. */
  function sec(x, zb, zt, zm, wb, wm, wt, e, yc) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: yc || 0 };
  }
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), s.e) + s.yc, z];
  }
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) pts.push(ringPt(s, -PI / 2 + PI * i / n));
    for (i = n - 1; i >= 1; i--) pts.push([2 * s.yc - pts[i][0], pts[i][1]]);
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
  function latheX(prof, seg, y, z) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), -prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateZ(PI / 2);
    g.translate(0, y, z);
    return g;
  }
  function latheZ(prof, seg, x, y) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateX(PI / 2);
    g.translate(x, y, 0);
    return g;
  }
  /* surface patches cut from the loft (hero/h60_hawk_family.js) */
  function surfPt(secs, x, th) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x + 1e-9 && x >= B.x - 1e-9) {
        var f = (A.x - x) / (A.x - B.x);
        if (!secs.n) {
          var pa = ringPt(A, th), pb = ringPt(B, th);
          return [x, pa[0] + (pb[0] - pa[0]) * f, pa[1] + (pb[1] - pa[1]) * f];
        }
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
  function interp(tab, x, k) {
    for (var q = 0; q < tab.length - 1; q++)
      if (x <= tab[q][0] && x >= tab[q + 1][0])
        return tab[q][k] + (tab[q + 1][k] - tab[q][k]) * (tab[q][0] - x) / (tab[q][0] - tab[q + 1][0]);
    return x > tab[0][0] ? tab[0][k] : tab[tab.length - 1][k];
  }

  /* =========================================================== tables ==
     THE NOSE AND CABIN, shared: the E's is the D's (the 1.88 m stretch is
     behind the mast, see MEASURED). Rows are metres aft of the nose tip;
     traced off the D drawing's side and top views at 21.0 px/m and checked
     on the 1981 D and the 2016 E:
            dn    zb    zt    zm    wb    wm    wt    e                    */
  var NOSE = [
    [0.00, 1.33, 1.55, 1.44, 0.10, 0.14, 0.09, 0.80],
    [0.06, 1.05, 1.88, 1.43, 0.38, 0.50, 0.33, 0.70],
    [0.18, 0.86, 2.15, 1.43, 0.58, 0.74, 0.48, 0.62],
    [0.38, 0.70, 2.42, 1.46, 0.78, 0.96, 0.62, 0.55],
    [0.63, 0.60, 2.64, 1.49, 0.95, 1.12, 0.74, 0.48],
    [0.93, 0.54, 2.82, 1.53, 1.06, 1.22, 0.82, 0.42],
    [1.28, 0.51, 2.95, 1.57, 1.13, 1.28, 0.88, 0.38],
    [1.68, 0.50, 3.05, 1.60, 1.17, 1.31, 0.92, 0.34],
    [2.13, 0.50, 3.11, 1.62, 1.19, 1.33, 0.95, 0.30],
    [2.83, 0.50, 3.16, 1.65, 1.20, 1.33, 0.98, 0.28]
  ];
  /* THE AFT FUSELAGE, per airframe, x from the mast: the cabin to the ramp
     hinge, the ramp (D: 0.50 to 1.43 m up between 4.72 and 6.51 m aft; E:
     to 1.58 m by 7.11 m), the clamshell door above it, then the boom (D
     0.85 m deep, its top at the cabin roof; the E's 1.2 m, its top level
     with the nacelles, 3.83 m). Widths from the top views: full width to
     the ramp, then tapering to the boom. */
  var AFT = {
    ch53d: [
      [ 1.00, 0.50, 3.20, 1.66, 1.20, 1.33, 1.00, 0.28],
      [-2.00, 0.50, 3.22, 1.66, 1.20, 1.33, 1.00, 0.28],
      [-4.60, 0.50, 3.24, 1.68, 1.20, 1.33, 1.00, 0.28],
      [-5.20, 0.70, 3.26, 1.82, 1.18, 1.31, 0.99, 0.30],
      [-5.90, 1.16, 3.28, 2.08, 1.10, 1.22, 0.94, 0.34],
      [-6.60, 1.47, 3.29, 2.28, 0.98, 1.08, 0.85, 0.40],
      [-7.40, 1.80, 3.30, 2.50, 0.84, 0.92, 0.74, 0.46],
      [-8.20, 2.15, 3.30, 2.70, 0.68, 0.75, 0.61, 0.52],
      [-9.00, 2.45, 3.29, 2.86, 0.52, 0.58, 0.48, 0.60],
      [-10.00, 2.45, 3.28, 2.87, 0.40, 0.45, 0.37, 0.64],
      [-11.20, 2.44, 3.26, 2.86, 0.31, 0.35, 0.29, 0.68],
      [-12.20, 2.44, 3.20, 2.83, 0.27, 0.31, 0.25, 0.70],
      [-12.45, 2.52, 3.08, 2.80, 0.18, 0.22, 0.16, 0.76]
    ],
    ch53e: [
      [ 1.00, 0.50, 3.20, 1.66, 1.20, 1.33, 1.00, 0.28],
      [-2.00, 0.50, 3.22, 1.66, 1.20, 1.33, 1.00, 0.28],
      [-4.90, 0.50, 3.40, 1.70, 1.20, 1.33, 1.00, 0.28],
      [-5.50, 0.74, 3.62, 1.86, 1.18, 1.31, 0.99, 0.30],
      [-6.30, 1.12, 3.78, 2.10, 1.11, 1.23, 0.94, 0.34],
      [-7.10, 1.55, 3.83, 2.38, 1.00, 1.10, 0.86, 0.40],
      [-8.00, 1.95, 3.83, 2.62, 0.86, 0.95, 0.76, 0.46],
      [-9.00, 2.35, 3.82, 2.85, 0.70, 0.78, 0.62, 0.52],
      [-9.70, 2.58, 3.81, 3.00, 0.59, 0.66, 0.54, 0.58],
      [-11.00, 2.60, 3.76, 3.05, 0.46, 0.52, 0.42, 0.62],
      [-12.30, 2.62, 3.66, 3.04, 0.37, 0.42, 0.33, 0.66],
      [-13.60, 2.64, 3.48, 3.00, 0.30, 0.34, 0.26, 0.70],
      [-14.00, 2.72, 3.36, 3.00, 0.20, 0.24, 0.17, 0.76]
    ]
  };
  /* THE UPPER DECK: the fairing over the cabin roof from the cockpit back,
     the nacelles either side of it, the mast on it, and behind the mast the
     main gearbox hump (D: 4.44 m at 2.1-2.7 m aft; E: 4.43 m from 0.9 m
     ahead to 3.9 m aft, falling to the boom by 6.2 m). Ahead of the mast
     the D drawing puts the deck at the nacelles' top, 3.65 m, and the 1981
     photograph about 4.3 m over them; it is drawn at 4.0, which is also
     the front view's height between the nacelles. */
  var DECK = {
    ch53d: [
      [ 4.20, 3.02, 3.10, 3.06, 0.05, 0.06, 0.05, 0.90],
      [ 3.90, 3.00, 3.50, 3.18, 0.60, 0.68, 0.46, 0.55],
      [ 3.30, 3.00, 3.84, 3.25, 0.82, 0.90, 0.62, 0.50],
      [ 2.00, 3.00, 3.96, 3.28, 0.88, 0.95, 0.68, 0.50],
      [ 0.60, 3.00, 4.00, 3.30, 0.88, 0.95, 0.70, 0.50],
      [-0.60, 3.00, 4.06, 3.35, 0.90, 0.96, 0.72, 0.50],
      [-1.40, 3.00, 4.32, 3.45, 0.90, 0.96, 0.74, 0.48],
      [-2.40, 3.00, 4.44, 3.50, 0.86, 0.92, 0.72, 0.48],
      [-3.00, 3.00, 4.22, 3.45, 0.74, 0.80, 0.60, 0.50],
      [-3.50, 3.00, 3.70, 3.30, 0.52, 0.58, 0.40, 0.55],
      [-3.90, 3.05, 3.36, 3.20, 0.25, 0.30, 0.20, 0.70]
    ],
    ch53e: [
      [ 4.40, 3.08, 3.16, 3.12, 0.05, 0.06, 0.05, 0.90],
      [ 4.10, 3.05, 3.46, 3.20, 0.60, 0.68, 0.46, 0.55],
      [ 3.50, 3.05, 3.66, 3.28, 0.82, 0.90, 0.62, 0.50],
      [ 2.00, 3.05, 3.84, 3.30, 0.88, 0.95, 0.68, 0.50],
      [ 0.90, 3.05, 4.30, 3.40, 0.90, 0.96, 0.74, 0.48],
      [-0.50, 3.05, 4.43, 3.45, 0.92, 0.98, 0.76, 0.48],
      [-3.00, 3.10, 4.43, 3.50, 0.92, 0.98, 0.76, 0.48],
      [-4.00, 3.20, 4.35, 3.55, 0.86, 0.92, 0.70, 0.50],
      [-5.00, 3.35, 4.10, 3.60, 0.70, 0.76, 0.56, 0.52],
      [-5.80, 3.55, 3.90, 3.70, 0.45, 0.50, 0.36, 0.60],
      [-6.20, 3.70, 3.84, 3.77, 0.15, 0.18, 0.12, 0.75]
    ]
  };
  /* THE SPONSONS, port side: x, outer edge, belly and top. D: the drawing's
     side view (2.62 to -3.53 m, 0.60 to 1.67 m up) and front view (4.74 m
     across); E: the front view (0.73 to 1.86 m, 5.08 m across) and the top
     line of its side view. */
  var SPON = {
    ch53d: [[2.62, 1.30, 1.10, 1.20], [2.40, 1.75, 0.86, 1.42], [2.00, 2.10, 0.70, 1.56], [1.30, 2.32, 0.62, 1.64],
            [0.20, 2.37, 0.60, 1.67], [-1.20, 2.37, 0.62, 1.66], [-2.20, 2.25, 0.70, 1.58], [-2.90, 1.95, 0.86, 1.45],
            [-3.30, 1.60, 1.00, 1.32], [-3.53, 1.25, 1.12, 1.20]],
    ch53e: [[2.60, 1.30, 1.25, 1.40], [2.30, 1.85, 0.95, 1.70], [1.80, 2.35, 0.78, 1.83], [0.80, 2.54, 0.73, 1.86],
            [-1.60, 2.54, 0.73, 1.86], [-2.60, 2.40, 0.80, 1.80], [-3.20, 2.00, 0.95, 1.62], [-3.60, 1.55, 1.10, 1.45],
            [-3.85, 1.25, 1.22, 1.32]]
  };

  /* ========================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "ch53_" + VR.key;
    var i, k, s, a;
    var skin = [], dark = [], metal = [], team = [], glass = [];
    var gearM = [], gearR = [];
    var E = VR.e, NX = VR.nose;

    /* --------------------------------------------------- the fuselage ---- */
    var FUS = [];
    NOSE.forEach(function (r) { FUS.push(sec(NX - r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7])); });
    AFT[VR.key].forEach(function (r) { FUS.push(sec(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7])); });
    var FUS_N = 16;
    FUS.n = FUS_N;
    var fl = loft(FUS, FUS_N, 0.02, 0.05);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);
    function fusAt(x) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) {
          var f = (A.x - x) / (A.x - B.x), o = {};
          ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (kk) { o[kk] = A[kk] + (B[kk] - A[kk]) * f; });
          return o;
        }
      }
      return null;
    }

    /* ---------------------------------------------------- the upper deck */
    var DK = DECK[VR.key].map(function (r) { return sec(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]); });
    DK.n = 12;
    var dk = loft(DK, DK.n, 0.02, 0.03);
    for (i = 0; i < dk.length; i++) skin.push(dk[i]);
    function deckTop(x) { return Z(interp(DECK[VR.key], x, 2)); }

    /* --------------------------------------------------- the sponsons ---- */
    var SP = SPON[VR.key].map(function (r) {
      var yi = 1.00, hw = (r[1] - yi) / 2, zm = (r[2] + r[3]) / 2;
      return sec(r[0], r[2], r[3], zm, hw * 0.92, hw, hw * 0.94, 0.34, yi + hw);
    });
    var sp = loft(SP, 10, 0.04, 0.05);
    for (i = 0; i < sp.length; i++) both(skin, sp[i]);
    if (E) {
      /* the 650 US gal tanks alongside the sponson tips: 7.0 m spindles,
         1.08 m through, centred 3.17 m out and 1.08 m up (E drawing front
         and side views; the HC-4 E), each on a pylon off the sponson tip */
      var TY = 3.17, TZ = Z(1.08);
      both(skin, latheX([[3.10, 0.0005], [3.05, 0.12], [2.85, 0.28], [2.40, 0.44], [1.60, 0.53], [0.20, 0.54],
                         [-1.50, 0.52], [-2.80, 0.42], [-3.50, 0.25], [-3.85, 0.08], [-3.89, 0.0005]], 18, TY, TZ));
      both(skin, pod([[[1.30, 2.40, Z(1.30)], [1.30, 2.82, Z(1.52)], [1.30, 2.82, Z(1.64)], [1.30, 2.40, Z(1.60)]],
                      [[-1.90, 2.40, Z(1.30)], [-1.90, 2.82, Z(1.52)], [-1.90, 2.82, Z(1.64)], [-1.90, 2.40, Z(1.60)]]]));
    }

    /* ------------------------------------------------- the side engines --
       The T64 nacelles, 0.5 m (D) and 0.55 m (E) round, on stubs either side
       of the deck, their intakes ahead of the mast with the screen drum
       both drawings show, the exhaust turned aft and out at the tail. */
    var NR = VR.nacR, NZ = Z(NAC_H), X0 = VR.nacX0, X1 = VR.nacX1;
    both(skin, latheX([[X0, NR * 0.80], [X0 - 0.05, NR * 0.94], [X0 - 0.25, NR], [X1 + 0.70, NR],
                       [X1 + 0.25, NR * 0.86], [X1, NR * 0.70], [X1, 0.0005]], 20, NAC_Y, NZ));
    /* the intake: the screen drum, its dark throat and the bullet */
    both(metal, cyl(NR * 0.86, NR * 0.86, 0.34, 16, "x", X0 + 0.15, NAC_Y, NZ, true));
    both(dark, disc(NR * 0.84, 16, [X0 + 0.30, NAC_Y, NZ], [1, 0, 0]));
    both(skin, place(new V.TorusGeometry(NR * 0.86, 0.05, 4, 16), X0 + 0.32, NAC_Y, NZ, 0, PI / 2, 0));
    both(metal, sph(NR * 0.36, 10, 6, X0 + 0.36, NAC_Y, NZ, 1.2, 1, 1));
    /* the stub from the deck to the nacelle */
    var stubX0 = X0 - 0.5, stubX1 = X1 + 0.6, sy0 = 0.70, sy1 = NAC_Y - NR * 0.6;
    both(skin, pod([[[stubX0, sy0, Z(3.02)], [stubX0, sy1, NZ - 0.22], [stubX0, sy1, NZ + 0.14], [stubX0, sy0, Z(3.52)]],
                    [[stubX1, sy0, Z(3.02)], [stubX1, sy1, NZ - 0.22], [stubX1, sy1, NZ + 0.14], [stubX1, sy0, Z(3.52)]]]));
    /* the exhaust pipe, turned 25 degrees out */
    var exD = [-Math.cos(25 * D2R), Math.sin(25 * D2R), 0], exL = 0.55;
    var e0 = [X1 + 0.10, NAC_Y, NZ], e1 = [e0[0] + exD[0] * exL, e0[1] + exD[1] * exL, NZ];
    both(skin, bar(e0, e1, NR * 0.62, 14, false));
    both(dark, disc(NR * 0.58, 14, [e1[0] + exD[0] * 0.01, e1[1] + exD[1] * 0.01, NZ], exD));

    /* ------------------------------------------- the E's third engine ----
       On the port side of the hump behind the mast, its intake just aft of
       the head (E drawing, front and side views), and its big exhaust
       scoop on top of the hump 3.9 to 5.6 m aft (E drawing side view; the
       dark scoop over the hump in the 2016 and 1989 photographs). */
    if (E) {
      var TE_Y = 0.62, TE_Z = Z(4.08);
      skin.push(latheX([[-0.70, 0.36], [-0.80, 0.42], [-1.10, 0.45], [-3.70, 0.45], [-4.10, 0.40]], 14, TE_Y, TE_Z));
      dark.push(disc(0.33, 14, [-0.66, TE_Y, TE_Z], [1, 0, 0]));
      metal.push(cyl(0.36, 0.36, 0.10, 14, "x", -0.72, TE_Y, TE_Z, true));
      /* the scoop: a short duct rising aft and out, its mouth facing aft */
      var sd = [-0.92, 0.18, 0.35], sl = Math.sqrt(sd[0] * sd[0] + sd[1] * sd[1] + sd[2] * sd[2]);
      sd = [sd[0] / sl, sd[1] / sl, sd[2] / sl];
      var s0 = [-4.00, TE_Y, TE_Z + 0.02], s1 = [s0[0] + sd[0] * 1.45, s0[1] + sd[1] * 1.45, s0[2] + sd[2] * 1.45];
      skin.push(bar2(s0, s1, 0.42, 0.50, 16));
      skin.push(place(new V.TorusGeometry(0.50, 0.04, 4, 16), 0, 0, 0));
      skin[skin.length - 1].applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1), new V.Vector3(sd[0], sd[1], sd[2])));
      skin[skin.length - 1].translate(s1[0], s1[1], s1[2]);
      dark.push(disc(0.48, 16, [s1[0] - sd[0] * 0.02, s1[1] - sd[1] * 0.02, s1[2] - sd[2] * 0.02], sd));
      dark.push(inward(bar(s1, [s1[0] - sd[0] * 0.3, s1[1] - sd[1] * 0.3, s1[2] - sd[2] * 0.3], 0.48, 16, false)));
    }

    /* ------------------------------------------- the refuelling probe ----
       The E's, low on the starboard side of the nose (E drawing top view,
       0.7 m starboard of the centreline; the 2016 E), out of a fairing
       along the nose side, extended as photographed. */
    if (E) {
      var PY = -0.98, PZ = Z(1.22);
      skin.push(pod([[[4.40, -0.95, PZ - 0.14], [4.40, -1.28, PZ - 0.10], [4.40, -1.28, PZ + 0.12], [4.40, -0.95, PZ + 0.14]],
                     [[4.80, -0.95, PZ - 0.15], [4.80, -1.18, PZ - 0.11], [4.80, -1.18, PZ + 0.12], [4.80, -0.95, PZ + 0.15]],
                     [[6.05, -0.80, PZ - 0.10], [6.05, -1.08, PZ - 0.08], [6.05, -1.08, PZ + 0.08], [6.05, -0.80, PZ + 0.10]],
                     [[6.30, -0.90, PZ - 0.04], [6.30, -1.04, PZ - 0.04], [6.30, -1.04, PZ + 0.04], [6.30, -0.90, PZ + 0.04]]]));
      metal.push(cyl(0.065, 0.065, 3.00, 8, "x", 7.70, PY, PZ));
      metal.push(cyl(0.05, 0.09, 0.22, 8, "x", 9.25, PY, PZ));
      dark.push(cyl(0.04, 0.05, 0.10, 8, "x", 9.40, PY, PZ));
    }

    /* --------------------------------------------------- the glazing ----
       The windscreen either side of the centre post, the chin windows low on
       the nose, the cockpit side windows, the crew door windows and the
       square cabin windows (both drawings; the 1981 D, the 2016 E). */
    var OFF = 0.022;
    function winZ(list, x0, x1, h0, h1, nx, nt, mir) {
      var p = patch(FUS, x0, x1, function (x) { return thAtZ(FUS, x, Z(h0)); },
                    function (x) { return thAtZ(FUS, x, Z(h1)); }, nx || 2, nt || 2, OFF);
      if (mir === 0 || mir === undefined) both(list, p); else list.push(mir < 0 ? mirrorY(p) : p);
    }
    /* windscreen: the upper front of the nose, from the side post to the
       centre post */
    both(glass, patch(FUS, NX - 0.25, NX - 0.98, function (x) { return thAtZ(FUS, x, Z(2.02)); },
                      function (x) { return thAtY(FUS, x, 0.07); }, 5, 5, OFF));
    /* chin windows */
    both(glass, patch(FUS, NX - 0.20, NX - 0.85, function (x) { return thAtZ(FUS, x, Z(0.92)); },
                      function (x) { return thAtZ(FUS, x, Z(1.62)); }, 5, 4, OFF));
    /* cockpit side windows */
    winZ(glass, NX - 1.00, NX - 1.95, 1.78, 2.72, 3, 3);
    /* the crew door windows, and the cabin windows */
    var CW = E ? [[3.44, 2.94, 1.69, 2.54], [0.80, 0.35, 1.97, 2.54], [-1.76, -2.22, 1.97, 2.54], [-3.85, -4.31, 1.97, 2.54]]
               : [[3.31, 2.82, 1.59, 2.42], [0.88, 0.41, 1.82, 2.42], [-1.52, -2.03, 1.82, 2.42], [-3.53, -3.96, 1.82, 2.42]];
    CW.forEach(function (w) { winZ(glass, w[0], w[1], w[2], w[3], 1, 2); });

    /* -------------------------------------------------- the tail pylon --
       D: upright, swept, from the boom top 11.0-12.3 m aft to its top 12.4-
       13.5 m aft and 5.5 m up, the tail gearbox fairing on top; E: the
       same build canted 20 degrees to port about the boom's line, from
       11.9-14.0 m aft at the root to 13.35-15.25 at the tip 2.6 m up it. */
    var CANT = VR.cant, cu = [0, Math.sin(CANT), Math.cos(CANT)], cn = [0, Math.cos(CANT), -Math.sin(CANT)];
    var finBaseZ = E ? Z(3.62) : Z(3.22);
    function finPt(span) {
      return function (x, zz, kk) {
        return [x, cu[1] * span + cn[1] * kk, finBaseZ + cu[2] * span + cn[2] * kk];
      };
    }
    var FSPAN = E ? 2.60 : 2.40;
    var finRoot = E ? foil([-11.85, 0], [-14.00, 0], 0.42, finPt(-0.30)) : foil([-10.96, 0], [-12.30, 0], 0.40, finPt(-0.25));
    var finTip = E ? foil([-13.35, 0], [-15.30, 0], 0.32, finPt(FSPAN)) : foil([-12.45, 0], [-13.60, 0], 0.32, finPt(FSPAN));
    skin.push(solid(finRoot, finTip));
    /* the tail gearbox fairing on the pylon top */
    var gbC = finPt(FSPAN)(E ? -14.55 : -13.20, 0, 0);
    var GB = [], gq = E ? [[-13.60, 0.10, 0.12], [-13.90, 0.24, 0.26], [-14.80, 0.27, 0.30], [-15.45, 0.20, 0.22], [-15.70, 0.06, 0.07]]
                        : [[-12.40, 0.10, 0.12], [-12.70, 0.22, 0.24], [-13.50, 0.25, 0.28], [-13.95, 0.18, 0.20], [-14.15, 0.05, 0.06]];
    gq.forEach(function (q) {
      var ring = [], j;
      for (j = 0; j < 8; j++) {
        var an = j / 8 * PI * 2, ry = Math.cos(an) * q[1], rz = Math.sin(an) * q[2];
        ring.push([q[0], gbC[1] + cn[1] * ry + cu[1] * rz, gbC[2] + cn[2] * ry + cu[2] * rz]);
      }
      GB.push(ring);
    });
    skin.push(pod(GB));
    /* the cooling grille at the pylon root (157173, 1980) */
    both(dark, box(0.50, 0.012, 0.36, E ? -12.55 : -11.70, E ? 0.43 : 0.32, E ? Z(3.95) : Z(3.48)));

    /* ------------------------------------------------- the tailplanes ---
       D: straight, on the starboard side of the pylon top, 3.4 m out with
       a little dihedral, chords 1.17 m at the root and 0.72 m at the tip
       (D drawing, top and front views; the 1981 D). E: the gull wing on the
       starboard side of the fin: an inner panel rising from the fin's face
       to 0.84 m starboard of the centreline and 6.17 m up, then the flat
       outer panel to 3.75 m (E drawing front view; the 1989 E). */
    var stabTop = [];
    function stabSeg(y0, z0, y1, z1, le0, te0, le1, te1, t0, t1, flash) {
      function at(y, zz) { return function (x, q, kk) { return [x, y, zz + kk]; }; }
      var A = foil([le0, 0], [te0, 0], t0, at(y0, z0)), B = foil([le1, 0], [te1, 0], t1, at(y1, z1));
      skin.push(solid(A, B));
      if (flash) stabTop.push([y0, z0, y1, z1, le0, te0, le1, te1, t0, t1]);
    }
    if (!E) {
      stabSeg(-0.10, Z(5.62), -3.45, Z(6.12), -12.92, -14.06, -13.32, -14.04, 0.15, 0.09, true);
    } else {
      var rootP = finPt(2.05)(0, 0, -0.18);
      stabSeg(rootP[1], rootP[2], -0.84, Z(6.17), -13.02, -14.72, -13.12, -14.62, 0.18, 0.15, false);
      stabSeg(-0.84, Z(6.17), -3.75, Z(6.17), -13.12, -14.62, -13.45, -14.40, 0.15, 0.09, true);
    }

    /* ------------------------------------------------- the tail bumper -- */
    var tbX = E ? -13.55 : -11.85, tbH = E ? 1.66 : 1.72;
    metal.push(bar([tbX + 0.35, 0, Z(E ? 2.66 : 2.48)], [tbX - 0.55, 0, Z(tbH + 0.06)], 0.05, 6, true));
    metal.push(bar([tbX - 0.25, 0, Z(E ? 2.66 : 2.47)], [tbX - 0.55, 0, Z(tbH + 0.06)], 0.045, 6, true));
    dark.push(box(0.36, 0.20, 0.06, tbX - 0.60, 0, Z(tbH + 0.03)));

    /* ----------------------------------------------- aerials and kit ---- */
    dark.push(box(0.36, 0.03, 0.24, E ? -8.6 : -6.9, 0, (E ? Z(3.83) : Z(3.30)) + 0.12, 0, 0.35, 0));
    dark.push(box(0.30, 0.03, 0.18, -3.0, 0, Z(0.50) - 0.09));
    dark.push(box(0.26, 0.03, 0.16, E ? -10.5 : -9.6, 0, (E ? Z(2.60) : Z(2.45)) - 0.08));
    for (s = -1; s <= 1; s += 2) {
      dark.push(bar([NX - 1.45, s * 0.75, Z(3.02)], [NX - 1.40, s * 0.78, Z(3.16)], 0.016, 5, true));
      dark.push(bar([NX - 1.40, s * 0.78, Z(3.16)], [NX - 1.05, s * 0.78, Z(3.16)], 0.013, 5, true));
    }
    /* the cargo hook well under the cabin, aft of the mast */
    dark.push(box(1.00, 0.70, 0.02, -1.0, 0, Z(0.49)));

    /* ----------------------------------------------- the undercarriage --
       Twin wheels on every leg (Vectorsite). The nose leg under the nose,
       the main legs under the sponsons, 1.85 m (D) and 2.06 m (E) behind
       the mast, 3.98 m and 3.96 m apart (the drawings' side and front
       views); the tyres 0.62-0.68 m across (1981 D). */
    var WR = VR.wr, WN = VR.wrN, WW = 0.22;
    function wheelPair(list, mlist, x, yc, r, gap) {
      for (var q = -1; q <= 1; q += 2) {
        list.push(cyl(r, r, WW, 16, "y", x, yc + q * gap, Z(r)));
        mlist.push(cyl(r * 0.5, r * 0.5, WW + 0.01, 10, "y", x, yc + q * gap, Z(r)));
      }
      mlist.push(cyl(0.05, 0.05, 2 * gap + WW, 8, "y", x, yc, Z(r)));
    }
    wheelPair(gearR, gearM, VR.noseX, 0, WN, 0.15);
    gearM.push(bar([VR.noseX + 0.10, 0, Z(WN)], [VR.noseX + 0.05, 0, Z(0.80)], 0.07, 8, true));
    for (s = -1; s <= 1; s += 2) {
      wheelPair(gearR, gearM, VR.mainX, s * VR.mainY, WR, 0.15);
      gearM.push(bar([VR.mainX + 0.06, s * VR.mainY, Z(WR)], [VR.mainX + 0.20, s * (VR.mainY - 0.05), Z(E ? 0.98 : 0.90)], 0.09, 8, true));
      gearM.push(bar([VR.mainX - 0.20, s * VR.mainY, Z(WR + 0.12)], [VR.mainX - 0.55, s * (VR.mainY - 0.10), Z(E ? 0.90 : 0.80)], 0.05, 6, true));
    }

    /* ------------------------------------------------- team flashes ----
       A band round the boom, the outer tailplane's upper face, and a panel
       on the deck ahead of the mast: modest, upper surfaces, C.team. */
    function bandRing(x, kf, c) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) {
          var f = (A.x - x) / (A.x - B.x), ra = ringOf(A, FUS_N), rb = ringOf(B, FUS_N), out = [], cy = 0, cz = 0, j;
          for (j = 0; j < ra.length; j++) out.push([ra[j][0] + (rb[j][0] - ra[j][0]) * f, ra[j][1] + (rb[j][1] - ra[j][1]) * f]);
          for (j = 0; j < out.length; j++) { cy += out[j][0]; cz += out[j][1]; }
          cy /= out.length; cz /= out.length;
          return out.map(function (p) {
            var dy = p[0] - cy, dz = p[1] - cz, l = Math.sqrt(dy * dy + dz * dz) || 1;
            return [x, cy + dy * kf + dy / l * c, cz + dz * kf + dz / l * c];
          });
        }
      }
      return null;
    }
    var BX = VR.band;
    var bR = [bandRing(BX, 1.006, 0.004), bandRing(BX - 0.02, 1.03, 0.012),
              bandRing(BX - 0.62, 1.03, 0.012), bandRing(BX - 0.64, 1.006, 0.004)], bq = [], bk;
    for (bk = 0; bk < 3; bk++) {
      var bA = bR[bk], bB = bR[bk + 1];
      for (i = 0; i < bA.length; i++) {
        var i2 = (i + 1) % bA.length;
        bq.push(bA[i], bB[i], bA[i2], bA[i2], bB[i], bB[i2]);
      }
    }
    team.push(facingOut(bq, [BX - 0.32, 0, fusAt(BX - 0.32).zm]));
    stabTop.forEach(function (st) {
      /* a plate on the outer half of the panel, 18-72% chord */
      function top(fy, fc, kk) {
        var y = st[0] + (st[2] - st[0]) * fy, zz = st[1] + (st[3] - st[1]) * fy;
        var le = st[4] + (st[6] - st[4]) * fy, te = st[5] + (st[7] - st[5]) * fy, t = st[8] + (st[9] - st[8]) * fy;
        return [le + (te - le) * fc, y, zz + t * 0.44 + kk];
      }
      var lo = [top(0.5, 0.18, 0.010), top(0.5, 0.72, 0.010), top(0.95, 0.72, 0.010), top(0.95, 0.18, 0.010)];
      var hi = [top(0.5, 0.18, 0.024), top(0.5, 0.72, 0.024), top(0.95, 0.72, 0.024), top(0.95, 0.18, 0.024)];
      team.push(solid(lo, hi));
    });
    both(team, patch(DK, 2.70, 1.60, function (x) { return thAtY(DK, x, 0.36); },
                     function () { return PI / 2; }, 3, 3, 0.02));

    /* ======================================================= main rotor ==
       The mast and the swashplate stand on the deck; the head hangs in the
       h60_hawk_family.js mount, so it turns anti-clockwise from above. */
    var HZ = Z(VR.hubH), dTop = deckTop(0);
    metal.push(cyl(0.24, 0.30, HZ - dTop - 0.10, 14, "z", 0, 0, (HZ + dTop) / 2 - 0.10));
    metal.push(cyl(0.62, 0.62, 0.07, 18, "z", 0, 0, HZ - 0.40));
    dark.push(cyl(0.52, 0.56, 0.16, 18, "z", 0, 0, HZ - 0.30));

    /* the tail rotor's output shaft housing, from the gearbox out to the
       hub on the port side; it does not turn */
    var TRp = [VR.trX, VR.trY, Z(VR.trH)];
    metal.push(bar([TRp[0], gbC[1] + cn[1] * 0.20, gbC[2] + cn[2] * 0.20],
                   [TRp[0], TRp[1] - cn[1] * 0.12, TRp[2] - cn[2] * 0.12], 0.11, 10, true));

    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    mesh(gear, gearR, T.rubber, "gear_tyres");
    mesh(gear, gearM, T.metal, "gear_legs");

    var tilt = new V.Group();
    tilt.position.set(0, 0, HZ);
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

    /* The fully articulated head: the hub plate, a sleeve, hinge block and
       damper per blade, the cap on top (both drawings' side and front
       views; the 2016 E). Blades laid half a pitch off the fuselage line. */
    var hubM = [], blades = [], NB = VR.nb, RR = VR.R, CH = VR.chord;
    var LE = 0.25 * CH, TE = LE - CH;
    hubM.push(cyl(0.50, 0.50, 0.26, 18, "z", 0, 0, 0));
    hubM.push(cyl(0.32, 0.40, 0.18, 16, "z", 0, 0, 0.22));
    hubM.push(cyl(0.44, 0.32, 0.12, 16, "z", 0, 0, Z(VR.headTop) - HZ - 0.06));
    hubM.push(cyl(0.18, 0.18, Z(VR.headTop) - HZ - 0.30, 10, "z", 0, 0, (Z(VR.headTop) - HZ) / 2 + 0.05));
    var a0 = NB === 6 ? 30 : 360 / 7 / 4;
    for (k = 0; k < NB; k++) {
      a = (a0 + 360 / NB * k) * D2R;
      var bp = [box(0.55, 0.30, 0.20, 0.70, 0, 0), cyl(0.12, 0.12, 0.40, 10, "x", 1.10, 0, 0),
                box(0.50, 0.20, 0.12, 1.45, 0, 0), cyl(0.05, 0.05, 0.60, 6, "x", 0.85, -0.26, 0.04)];
      for (i = 0; i < bp.length; i++) { bp[i].rotateZ(a); hubM.push(bp[i]); }
      var bl = M.slab(V, [[1.55, TE + 0.06], [1.80, TE], [RR - 0.30, TE], [RR, TE + 0.08], [RR, LE - 0.04],
                          [RR - 0.30, LE], [1.80, LE], [1.55, LE - 0.04]], 0.07);
      bl.translate(0, 0, -0.035);
      bl.rotateY(-2 * D2R);
      bl.rotateZ(a);
      blades.push(bl);
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, blades, T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(RR, 48), 0, 0, 0.05)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       On the port side of the pylon top; on the E the shaft follows the
       fin's 20 degree cant. The mount turns PI/2 - cant about X: local +Z,
       the axis render3d.js turns it positively about, points to starboard
       (and 20 degrees up on the E), so the top blade moves aft. Four blades
       as two crossed pairs; one points straight aft as built (WHAT SETS
       THE SCALE). */
    var tm = new V.Group();
    tm.position.set(TRp[0], TRp[1], TRp[2]);
    tm.rotation.x = PI / 2 - CANT;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trB = [cyl(0.16, 0.18, 0.22, 12, "z", 0, 0, 0.0), cyl(0.10, 0.03, 0.16, 10, "z", 0, 0, -0.19)];
    var TRR = VR.trR;
    for (k = 0; k < 4; k++) {
      var tang = (180 + 90 * k) * D2R, zoff = (k & 1) ? -0.04 : 0.04;
      var tb = box(TRR - 0.28, VR.trChord, 0.05, 0.28 + (TRR - 0.28) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(tang);
      tb.translate(0, 0, zoff);
      trB.push(tb);
      var beam = box(0.36, 0.10, 0.06, 0.18, 0, 0);
      beam.rotateZ(tang); beam.translate(0, 0, zoff);
      trB.push(beam);
    }
    mesh(trot, trB, T.blade, "tailrotor_blades");
    return g;
  }

  function variant(k) { return function (THREE, M, C) { return build(THREE, M, C, VARIANTS[k]); }; }
  return { ch53d: variant("ch53d"), ch53e: variant("ch53e") };
})();

/* len is the MEASURED x extent, rotor disc front to the tip of the aft tail
   rotor blade (the published length with rotors turning) */
UNIT_MODELS["nato_e60_ch53"] = { len: 26.89, build: HeroCH53.ch53d };
UNIT_MODELS["nato_e80_ch53"] = { len: 30.19, build: HeroCH53.ch53e };
