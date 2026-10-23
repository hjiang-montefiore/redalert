/* ======= us_ch46_seaknight.js - HERO model: the Boeing Vertol CH-46 Sea Knight (USMC) =======
   Two defs, one airframe: the Boeing Vertol 107M the Marines flew from 1964
   to 2015. What a camera sees change between the two rows is the paint, the
   blades and the defensive kit the E carried.

     nato_e60_ch46  CH-46D, 1966 on (T58-GE-10, the "new cambered (droop
                    snoot) rotor blades": Naval Historical Center, "CH-46 and
                    UH-46 Sea Knight", 2000). Overall Marine green with the
                    full-colour star-and-bar, as the Vietnam photographs
                    show; the metal blades dark.
     nato_e80_ch46  CH-46E, the A, D and F airframes rebuilt with T58-GE-16s
                    and "fiberglass rotor blades" (NHC; Vectorsite "Boeing
                    Vertol H-46 Sea Knight", 2011). Overall grey with the
                    low-visibility star-and-bar, as its photographs from 1997
                    to 2011 show; the grey glass-fibre blades; and the
                    countermeasures Vectorsite lists ("missile warning systems
                    and chaff-flare dispensers"): the chaff and flare
                    dispensers on the after ends of the sponsons (HMM-264
                    side on, 1980s, and HMM-364, 2011), the missile-warning
                    sensors on the nose and the tail and the box on each
                    side of the aft pylon (HMM-264 at Zakho 1991, HMM-364
                    2011).
   Nothing else in rotor_specs.js, eras.js or air_specs.js names a Sea
   Knight; both rows drew the parametric tandem until this file.

   THE EXTERNAL DIFFERENCES BETWEEN THE D AND THE E, from sources
     - Blades: the D's cambered metal blades, the E's glass-fibre ones (NHC;
       Vectorsite). The outline is the same in every photograph at this
       scale; the colour is what differs (dark metal in the 1960s-70s
       photographs, grey glass fibre on the Tarawa in 1997 and in 2011).
     - Engines: T58-GE-10 against T58-GE-16 (NHC), inside the same aft
       pylon: no outside difference found.
     - The E's countermeasures (Vectorsite), as listed above.
     - Paint (below). Not drawn: the "Bullfrog" doubled fuel tanks that
       "some" Es were given (Vectorsite), since no photograph here shows which,
       and the door and ramp guns (optional; the rows carry no weapons).

   RECOGNITION LIST, and the reference each rests on
     1. The long slab-sided cabin with a rounded roof, nose-up on its
        wheels: the Commons line drawing (side, front, below) and HMM-264 side
        on (starboard, DPLA b6eb72be).
     2. The big rounded glazed nose: four windshield panes, the cockpit side
        windows and the chin windows low on the nose: drawing (front view),
        HMM-364 2011 (Huntington Beach, port side), the HMM-165 museum
        aircraft (port side).
     3. Two three-blade rotors in tandem, the forward on a short pylon over
        the cockpit, the aft on the tall rear pylon, its head higher: drawing,
        every photograph.
     4. The forward rotor turns anti-clockwise from above, the aft clockwise:
        Zilliac and Long, "Modeling of H-46 Tip Strikes", AHS Forum 55, 1999
        (NASA NTRS 20020073383): "The H-46 rear rotor rotates clockwise
        (opposite to that of most single rotor helicopters in the U.S.)";
        Wikipedia "Boeing Vertol CH-46 Sea Knight": "counter-rotating main
        rotors".
     5. The tall aft pylon, its leading edge raked back, its top flat, its
        trailing edge over the ramp: drawing, HMM-364 2011, Zakho 1991.
     6. The two T58 intakes, round and side by side at the foot of the aft
        pylon's leading edge, and an exhaust on each side of the pylon with
        its soot below: HMM-364 2011 (close), the museum aircraft, the drawing
        (the dark exhaust on the pylon's side).
     7. The sponsons on the after half of the cabin only, the main gear under
        them: NHC ("the aft sponsons carrying the fixed main gear"), drawing
        (below and front), every photograph.
     8. The fixed tricycle undercarriage, twin wheels on all three legs, the
        nose leg long under the cockpit: NHC ("a fixed nose gear"),
        Vectorsite ("fixed tricycle landing gear, with twin wheels on all
        three units"), drawing (front view).
     9. The rear ramp, the underside sweeping up from the sponsons to the
        pylon's trailing edge: drawing, Zakho 1991 (from behind).
    10. The round cabin windows, two of them in square frames, and the
        forward cabin door on the starboard side with its window; the port
        escape hatch at the same station: drawing, HMM-264 (starboard),
        museum (port).
    11. Per row: the D's green and full-colour insignia, dark blades; the E's
        grey, low-visibility insignia, grey blades and countermeasures.

   REFERENCES
     Wikimedia Commons "Boeing Vertol CH-46 Sea Knight Line Drawing.svg"
       (side, front, from below) at 960 px; Naval Historical Center
       three-view of a CH-46E (history.navy.mil/planes/ch-46e.pdf, archived
       2000). Stations along x were measured off the drawing's side view,
       scaled to the 44 ft 10 in fuselage; the drawing's heights run about
       6 % tall against the 16 ft 9 in to the top of the aft head and against
       the side-on HMM-264 photograph, so they were taken at 0.95; widths off
       the view from below (the same scale as the side view within 1 %).
     Wikipedia "Boeing Vertol CH-46 Sea Knight" specifications (Frawley 2002;
       Donald 1997): fuselage 44 ft 10 in, 83 ft 4 in rotors turning, height
       16 ft 9 in to the top of the rear rotor head, rotors 50 ft, three
       blades. NHC: the fixed gear, the D's cambered blades, the E's
       glass-fibre blades. Vectorsite: twin wheels on all three legs, the E's
       countermeasures, the "Bullfrogs".
     Commons photographs: CH-46D of HMM-165 over USS Tripoli (1972); an
       HMM-263 CH-46D at Marble Mountain; HMM-263 CH-46Ds near Da Nang;
       HMM-165 CH-46s (1969, from behind); a CH-46 at Da Nang (1968 colour
       slide: its colour faded, its hue a drab green); CH-46E of HMM-264 side
       on (1980s: overall green, full-colour insignia); CH-46E HMM-163 1989
       (winter camouflage); CH-46E of HMM-264 at Zakho (1991: three-tone
       camouflage, from behind); folded CH-46E blades on USS Tarawa (1997);
       CH-46E of HMM-364 (2011, Huntington Beach); HMM-165 museum CH-46E
       "YW 154803".

   MEASURED (heights above the ground, x from the fuselage's mid-length)
     fuselage 13.66 m nose to the aft pylon's trailing edge (44 ft 10 in);
     hubs 9.98 m apart (4.90 and -5.08; the 83 ft 4 in rotors-turning
     length gives 10.16, the side-on photograph 10.05); the forward blade
     plane 3.94 m up, the aft 4.98 m, the top of the aft head 5.11 m (16 ft
     9 in); cabin 2.16 m wide; 4.20 m over the sponsons; wheelbase 7.50 m;
     roof 3.03 m at the forward pylon falling to 2.94 m at the aft one
     (the nose-up stance, 1.3 degrees); belly 0.95 to 0.79 m.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent. With three
     blades a head always reaches at least half a radius past its hub, so
     the blades are laid at the phase the CH-47 hero uses, the least
     overhanging one in which the two heads interleave: each head with one
     blade straight aft and the other two 60 degrees either side of the
     nose. That reaches 4.11 m ahead of the forward hub (a blade's trailing
     corner, 60 degrees off the nose) and 7.65 m behind the aft one: 21.73 m
     measured. At the rows' r 17 the game draws it 38.1 m long, so the
     fuselage is drawn 23.96 m long (1.75 times its 13.66 m). The renderer
     turns the two heads at one rate in opposite senses, so the phase is
     kept. No "rotordisc" is built:
     two full discs would make the X extent the 25.2 m rotors-turning length
     and draw the fuselage a sixth smaller.

   NAMED NODES
     rotor (x2)  each head hangs in the h60_hawk_family.js mount: a tilt
                 group, a +PI/2 mount about X and a -PI/2 group inside, so
                 the "rotor" node's local +Y points up its shaft. The forward
                 head is added first, so render3d.js rotorShafts() turns it
                 positively, anti-clockwise from above, and the aft head the
                 other way, clockwise from above (item 4).
     The shafts are drawn square to the cabin floor, 1.3 degrees aft of the
     vertical in the nose-up stance: no source for the 107's shaft tilts was
     found (see WHAT COULD NOT BE CONFIRMED).
   Nothing is named "turret". The undercarriage (three legs, six tyres, the
   lowest opaque part) is named "undercarriage", NOT "gear": every leg of the
   CH-46 is fixed and stays down in flight (NHC, Vectorsite), and render3d.js
   hides a "gear" node above 18 m. The CH-47 and H-60 heroes do the same.

   WHAT COULD NOT BE CONFIRMED
     - The shaft tilts (drawn square to the cabin floor).
     - The blade chord: about 0.46 m off the photographs, no published figure
       found.
     - The 1980s E: its photographs show overall green with full-colour
       insignia (HMM-264), and in 1991 a three-tone camouflage (Zakho). The
       renderer hands a hero build no period, so one row draws one scheme:
       the grey of the 1997-2011 photographs, the longest-worn.
     - The D's exact green: the one colour slide (1968) is faded; the green
       is the 1980s HMM-264 photograph's, the same Marine green the
       UH-1 hero's "usmc" scheme uses.
     - The name of the box on each side of the E's aft pylon (in the 1991
       and 2011 photographs; drawn as photographed, not named).

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   1.8 m above the ground (GROUND = -1.8) at the fuselage's mid-length.
   Materials: SKIN (one CanvasTexture per paint scheme), GLASS, DARK, METAL,
   TEAM, the undercarriage's METAL and RUBBER, and per head its HUB and
   BLADES.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroCH46 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;

  /* ------------------------------------------------------------ datums */
  var GROUND = -1.8;
  function Z(h) { return GROUND + h; }
  var X_NOSE = 6.83, X_TAIL = -6.83;
  var STANCE = 1.3 * D2R;                             /* nose-up on its wheels */
  var HUB_F = { x: 4.90, h: 3.94, tilt: -STANCE };    /* forward head  */
  var HUB_A = { x: -5.08, h: 4.98, tilt: -STANCE };   /* aft head      */
  var ROTOR_R = 7.62;                                 /* 50 ft         */
  var CHORD = 0.46;
  var INL = { x: -1.72, y: 0.46, h: 3.14, r: 0.21 };  /* T58 intakes   */
  var EXH = { x: -4.33, h: 2.75 };                    /* T58 exhausts  */
  var GEAR_N = { x: 4.90, r: 0.22, w: 0.15 };         /* nose, twin    */
  var GEAR_M = { x: -2.60, y: 1.57, r: 0.25, w: 0.17 }; /* main, twin  */

  /* --------------------------------------------------------- variants */
  var VARIANTS = {
    d: { key: "d", scheme: "usmc60", ecm: false, blade: 0x262a2a },
    e: { key: "e", scheme: "usmc00", ecm: true,  blade: 0x50565a }
  };

  /* ------------------------------------------------------ paint schemes
     Authored darker than the photographs, as the ACES pass lifts mid tones.
     usmc60: overall Marine green; HMM-264's green reads #566142 in sun,
     taken to 0.8 (the UH-1 hero's "usmc" is #47503a). usmc00: the grey of
     HMM-364 in 2011, #636c7a on the sunlit side and #424b53 in shade,
     taken to about 0.93 of the sunlit side. */
  var SCHEMES = {
    usmc60: { key: "usmc60", base: "#465036", light: "#515b3f", dark: "#3c452e", belly: "#434c34",
              seed: 4601, insig: "full" },
    usmc00: { key: "usmc00", base: "#5d656c", light: "#687077", dark: "#535a61", belly: "#596067",
              seed: 4602, insig: "lowvis" }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres: 0 TOP (x across, y down), 1 PORT (x, z),
     2 STARBOARD (x, z), 3 BELLY (x, y). projUV() picks the band by normal. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -7.0, UX1 = 7.0;
  var QY = 2.3;
  var QZ0 = Z(0.30), QZ1 = Z(4.80);
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

  /* the sheet's side bands hold fewer pixels a metre up than along, so
     every mark takes its horizontal and vertical radii apart (ru, rv) */
  function star(g, u, v, ru, rv) {
    g.beginPath();
    for (var i = 0; i < 10; i++) {
      var a = -PI / 2 + i * PI / 5, k = i % 2 ? 0.38 : 0.92;
      if (i === 0) g.moveTo(u + ru * k * Math.cos(a), v + rv * k * Math.sin(a));
      else g.lineTo(u + ru * k * Math.cos(a), v + rv * k * Math.sin(a));
    }
    g.closePath(); g.fill();
  }
  function oval(g, u, v, ru, rv) { g.beginPath(); g.ellipse(u, v, ru, rv, 0, 0, PI * 2); g.closePath(); g.fill(); }
  /* The US star-and-bar drawn the us_f35_family.js way (discs and bars on
     the skin sheet). "full": the 1960s-70s full colour - insignia blue
     disc and outline, white star and bars, the red stripe (HMM-263 at
     Marble Mountain, the museum aircraft); "lowvis": the 2011 aircraft's
     darker grey outline on the grey (us_f35_family.js insignia()). */
  function starBar(g, u, v, ru, rv, kind) {
    if (kind === "full") {
      g.fillStyle = "rgba(30,44,92,0.95)";
      oval(g, u, v, ru * 1.08, rv * 1.08);
      g.fillRect(u - ru * 2.08, v - rv * 0.40, ru * 4.16, rv * 0.80);
      g.fillStyle = "rgba(214,214,206,0.95)";
      g.fillRect(u - ru * 2.0, v - rv * 0.32, ru * 4.0, rv * 0.64);
      g.fillStyle = "rgba(150,40,38,0.95)";
      g.fillRect(u - ru * 2.0, v - rv * 0.11, ru * 4.0, rv * 0.22);
      g.fillStyle = "rgba(30,44,92,0.95)";
      oval(g, u, v, ru, rv);
      g.fillStyle = "rgba(214,214,206,0.95)";
      star(g, u, v, ru, rv);
      return;
    }
    g.fillStyle = "rgba(60,66,72,0.70)";
    oval(g, u, v, ru, rv);
    g.fillRect(u - ru * 2.0, v - rv * 0.32, ru * 4.0, rv * 0.64);
    g.fillStyle = "rgba(112,120,128,0.65)";
    oval(g, u, v, ru * 0.86, rv * 0.86);
    g.fillRect(u - ru * 1.9, v - rv * 0.22, ru * 3.8, rv * 0.44);
    g.fillStyle = "rgba(60,66,72,0.70)";
    star(g, u, v, ru, rv);
  }

  function skinCanvas(SC, VR) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(SC.seed);
    var i, b, x, y;

    g.fillStyle = SC.base; g.fillRect(0, 0, TW, TH);
    /* ---- panel-to-panel colour: repainted panels a shade off */
    for (i = 0; i < 150; i++) {
      var pw = (0.4 + R() * 1.2) * SX, ph = 8 + R() * 26;
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
    /* exhaust soot down and aft of each T58 pipe on the pylon's sides
       (HMM-364 2011, Zakho 1991) */
    for (b = 1; b <= 2; b++) {
      var sg = g.createLinearGradient(pxX(-4.2), 0, pxX(-6.2), 0);
      sg.addColorStop(0, "rgba(14,13,12,0.55)"); sg.addColorStop(1, "rgba(14,13,12,0.05)");
      g.fillStyle = sg;
      g.beginPath();
      g.moveTo(pxX(-4.15), pySide(Z(2.95), b)); g.lineTo(pxX(-6.3), pySide(Z(2.70), b));
      g.lineTo(pxX(-6.3), pySide(Z(1.95), b)); g.lineTo(pxX(-4.45), pySide(Z(2.30), b));
      g.closePath(); g.fill();
    }

    /* ---- frames and stringers at the airframe's stations */
    var frames = [6.10, 5.45, 4.80, 3.88, 3.10, 2.30, 1.50, 0.70, -0.10, -0.90, -1.70, -2.50,
                  -3.40, -4.20, -5.00, -5.80, -6.50];
    g.lineWidth = 1.4;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.26)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.05)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(150,150,140,0.15)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    g.strokeStyle = "rgba(0,0,0,0.22)"; g.lineWidth = 1.2;
    [1.05, 1.62, 2.55, 2.85].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(pxX(-6.6), yy); g.lineTo(pxX(5.5), yy); g.stroke();
      }
    });
    g.lineWidth = 1.1;
    for (i = 0; i < 60; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 10 + R() * 30, hh = 8 + R() * 18;
      g.strokeStyle = "rgba(0,0,0,0.28)"; g.strokeRect(hx, hy, hw, hh);
    }

    /* ---- doors, hatches and the ramp. The forward cabin door on the
       starboard side behind the cockpit (HMM-264), the escape hatch with its
       window at the same station to port (the museum aircraft, the drawing);
       the ramp's edges and hinge line under the tail; the hatch in the
       floor over the cargo hook. */
    function door(b, x0, x1, h0, h1, lw) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = lw || 2.2;
      g.strokeRect(pxX(x1), pySide(Z(h1), b), pxX(x0) - pxX(x1), pySide(Z(h0), b) - pySide(Z(h1), b));
      g.strokeStyle = "rgba(255,255,255,0.07)"; g.lineWidth = 1;
      g.strokeRect(pxX(x1) + 2, pySide(Z(h1), b) + 2, pxX(x0) - pxX(x1) - 4, pySide(Z(h0), b) - pySide(Z(h1), b) - 4);
    }
    door(2, 4.79, 3.88, 1.08, 2.66);                       /* starboard door */
    g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.6;
    g.beginPath(); g.moveTo(pxX(4.79), pySide(Z(1.86), 2)); g.lineTo(pxX(3.88), pySide(Z(1.86), 2)); g.stroke();
    door(1, 4.79, 3.88, 1.12, 2.62);                       /* port hatch     */
    door(1, 3.30, 2.70, 1.62, 2.30, 1.6); door(2, 3.30, 2.70, 1.62, 2.30, 1.6);
    /* the ramp */
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 2.4;
    for (b = 1; b <= 2; b++) {
      g.beginPath(); g.moveTo(pxX(-3.55), pySide(Z(0.95), b)); g.lineTo(pxX(-6.75), pySide(Z(2.70), b)); g.stroke();
    }
    g.beginPath(); g.moveTo(pxX(-3.55), pyBelly(0.98)); g.lineTo(pxX(-3.55), pyBelly(-0.98)); g.stroke();
    g.beginPath(); g.moveTo(pxX(-3.55), pyBelly(0.96)); g.lineTo(pxX(-6.75), pyBelly(0.88));
    g.moveTo(pxX(-3.55), pyBelly(-0.96)); g.lineTo(pxX(-6.75), pyBelly(-0.88)); g.stroke();
    g.strokeRect(pxX(0.20), pyBelly(0.36), pxX(0.90) - pxX(0.20), pyBelly(-0.36) - pyBelly(0.36));
    /* the louvres behind the cockpit and the slot in the forward pylon's
       face (the museum aircraft); the oil-cooler slot high on the aft
       pylon's leading edge (HMM-364 2011) */
    g.fillStyle = "rgba(10,10,10,0.55)";
    for (b = 1; b <= 2; b++) {
      for (i = 0; i < 7; i++) g.fillRect(pxX(5.02 - i * 0.07), pySide(Z(2.92), b), 0.035 * SX, 0.13 * SZ);
      g.beginPath();
      g.moveTo(pxX(-3.02), pySide(Z(3.62), b)); g.lineTo(pxX(-3.42), pySide(Z(4.22), b));
      g.lineTo(pxX(-3.62), pySide(Z(4.16), b)); g.lineTo(pxX(-3.20), pySide(Z(3.56), b));
      g.closePath(); g.fill();
    }
    g.fillRect(pxX(5.30), pyTop(0.10), 0.12 * SX, 0.20 / (2 * QY) * BAND);
    /* walkway lines along the roof */
    g.strokeStyle = "rgba(10,10,8,0.40)"; g.lineWidth = 1.3;
    [-0.32, 0.32].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-2.4), yy); g.lineTo(pxX(2.5), yy); g.stroke();
    });

    /* ---- national markings only: no serials, codes, titles or squadron
       marks. The star-and-bar on each side of the lower cabin ahead of the
       sponson (HMM-264, HMM-364, the museum aircraft). */
    for (b = 1; b <= 2; b++) starBar(g, pxX(1.55), pySide(Z(1.36), b), 0.27 * SX, 0.27 * SZ, SC.insig);
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(SC.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6266, roughness: 0.46, metalness: 0.62 });
    /* fittings, intake mouths, soot, antennas: near-black so a stand-in's
       era paint would leave them alone (render3d.js eraPaint) */
    m.dark   = new V.MeshStandardMaterial({ color: 0x15181a, roughness: 0.66, metalness: 0.30 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x0b0c0c, roughness: 0.95, metalness: 0.02 });
    m.gmetal = new V.MeshStandardMaterial({ color: 0x4e5458, roughness: 0.50, metalness: 0.55 });
    /* the D's dark metal blades, the E's grey glass-fibre ones */
    m.blade  = new V.MeshStandardMaterial({ color: VR.blade, roughness: 0.78, metalness: 0.12 });
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
    g.name = "ch46_" + VR.key;
    var i, k, s;
    var skin = [], dark = [], metal = [], team = [], glass = [];

    /* --------------------------------------------------- the fuselage ----
       Nose to the aft pylon's trailing edge, one loft (the drawing's side
       view at 0.95 in height, its view from below for widths). The rounded
       glazed nose, its tip 1.58 m up; the cabin 2.16 m across its flat
       sides, the roof turned in above 2.5 m, the roof and the belly falling
       aft with the 1.3 degree nose-up stance; from x -2.4 the aft pylon's
       leading edge rakes up to its flat top at 4.58 m, the sides leaning in
       from the cabin's waist to 0.90 m across the top (between the drawing's
       front view, 0.75 m, and the HMM-165 pair from behind, 1969, about
       0.96 m once its perspective is taken out); the trailing edge drops from 4.54 m to the
       ramp's top at 2.90; under it the ramp sweeps up from the sponsons.
                x      zb    zt    zm    wb    wm    wt    e              */
    var CAB = { et: 0.5, pt: 2.0, pb: 3.0 };
    var FUS = [
      sec( 6.83, 1.50, 1.68, 1.58, 0.42, 0.54, 0.42, 0.70),
      sec( 6.79, 1.33, 1.86, 1.58, 0.64, 0.76, 0.60, 0.55),
      sec( 6.71, 1.21, 2.01, 1.59, 0.79, 0.88, 0.71, 0.48),
      sec( 6.59, 1.12, 2.18, 1.61, 0.88, 0.96, 0.78, 0.42),
      sec( 6.44, 1.07, 2.34, 1.65, 0.93, 1.00, 0.82, 0.38),
      sec( 6.25, 1.03, 2.52, 1.72, 0.96, 1.02, 0.81, 0.36, { et: 0.45, pt: 1.6 }),
      sec( 6.00, 1.00, 2.70, 1.80, 0.98, 1.04, 0.77, 0.34, { et: 0.45, pt: 1.8 }),
      sec( 5.75, 0.99, 2.85, 1.88, 0.99, 1.05, 0.70, 0.32, { et: 0.48, pt: 2.0 }),
      sec( 5.50, 0.98, 2.96, 1.95, 1.00, 1.06, 0.62, 0.30, CAB),
      sec( 5.20, 0.98, 3.01, 1.98, 1.01, 1.07, 0.58, 0.30, CAB),
      sec( 4.50, 0.97, 3.03, 2.00, 1.02, 1.08, 0.56, 0.30, CAB),
      sec( 3.40, 0.95, 3.03, 2.00, 1.02, 1.08, 0.56, 0.30, CAB),
      sec( 2.20, 0.93, 3.02, 1.99, 1.02, 1.08, 0.56, 0.30, CAB),
      sec( 0.40, 0.89, 2.98, 1.97, 1.02, 1.08, 0.56, 0.30, CAB),
      sec(-1.40, 0.85, 2.95, 1.94, 1.02, 1.08, 0.56, 0.30, CAB)
    ];
    /* the aft pylon over the ramp, sampled from its outline */
    var LEP = [[-2.40, 2.93], [-2.56, 3.09], [-2.84, 3.42], [-3.19, 3.82], [-3.53, 4.21],
               [-3.74, 4.47], [-3.95, 4.58], [-6.44, 4.54], [-6.83, 2.92]];
    function pylonTop(x) {
      for (var q = 0; q < LEP.length - 1; q++)
        if (x <= LEP[q][0] && x >= LEP[q + 1][0])
          return LEP[q][1] + (LEP[q + 1][1] - LEP[q][1]) * (LEP[q][0] - x) / (LEP[q][0] - LEP[q + 1][0]);
      return 2.93;
    }
    function under(x) {
      if (x > -3.39) return 0.85 + (-1.40 - x) * 0.0227;
      if (x > -6.30) return 0.79 + (-3.39 - x) * 0.498;
      return 2.24 + (-6.30 - x) * 1.245;
    }
    [-2.40, -2.56, -2.70, -2.84, -3.02, -3.19, -3.36, -3.53, -3.74, -3.95, -4.40, -5.00, -5.60,
     -6.10, -6.44, -6.58, -6.70, -6.78, -6.83].forEach(function (x) {
      var zt = pylonTop(x), zb = under(x);
      var f = Math.min(1, Math.max(0, (-2.40 - x) / 1.35));       /* cabin -> pylon */
      var ft = Math.min(1, Math.max(0, (-5.6 - x) / 1.23));        /* to the tail end */
      var zm = Math.min(zt - 0.06, Math.max(1.94 + 0.16 * f, zb + 0.30));
      var wb = 1.02 - 0.16 * ft, wm = 1.08 - 0.16 * ft, wt = 0.56 - 0.11 * f;
      FUS.push(sec(x, zb, zt, zm, wb, wm, Math.min(wt, wm - 0.02), 0.30 + 0.06 * ft,
                   { et: 0.50 - 0.06 * f, pt: 2.0 - 1.0 * f, pb: 3.0 }));
    });
    function fusAt(x) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) return lerpSec(A, B, (A.x - x) / (A.x - B.x));
      }
      return null;
    }
    FUS.n = 16;
    loft(FUS, FUS.n, 0.03, 0.0).forEach(function (geo) { skin.push(geo); });
    function sideY(x, z) { return surfPt(FUS, x, thAtZ(FUS, x, z))[1]; }

    /* --------------------------------------------- the forward pylon ----
       Over the cockpit: its face rising from the cockpit roof at x 5.42 to
       its top at 3.78 m by x 5.05, the top falling gently aft and then in a
       long fairing to the cabin roof at x 2.5 (the drawing; the museum
       aircraft and HMM-364 2011: narrower than the cabin, narrowing up). */
    var PYF = [
      sec( 5.44, 2.74, 3.02, 2.96, 0.60, 0.60, 0.46, 0.50),
      sec( 5.38, 2.74, 3.32, 3.00, 0.62, 0.62, 0.46, 0.42, { pt: 1.5 }),
      sec( 5.29, 2.74, 3.56, 3.02, 0.62, 0.62, 0.45, 0.38, { pt: 1.5 }),
      sec( 5.17, 2.74, 3.72, 3.04, 0.62, 0.61, 0.44, 0.36, { pt: 1.5 }),
      sec( 5.02, 2.74, 3.78, 3.04, 0.62, 0.61, 0.44, 0.36, { pt: 1.5 }),
      sec( 4.50, 2.74, 3.76, 3.04, 0.62, 0.61, 0.44, 0.36, { pt: 1.5 }),
      sec( 3.90, 2.74, 3.67, 3.04, 0.62, 0.60, 0.43, 0.36, { pt: 1.5 }),
      sec( 3.35, 2.74, 3.55, 3.02, 0.61, 0.58, 0.40, 0.38, { pt: 1.5 }),
      sec( 3.00, 2.74, 3.38, 3.00, 0.58, 0.54, 0.36, 0.40, { pt: 1.4 }),
      sec( 2.75, 2.74, 3.22, 2.98, 0.52, 0.48, 0.32, 0.42, { pt: 1.3 }),
      sec( 2.50, 2.74, 3.06, 2.96, 0.44, 0.40, 0.28, 0.46, { pt: 1.2 })
    ];
    PYF.n = 10;
    loft(PYF, PYF.n, 0.0, 0.03).forEach(function (geo) { skin.push(geo); });

    /* ------------------------------------------------- the sponsons -----
       On the after half of the cabin only, 4.20 m across (the view from
       below): from a rounded fairing at x -0.18 (the side view) to full span
       by x -1.2 (the view from below), back to the rounded after end at -3.46; the top falling
       from 1.61 m to the end, the bottom 0.70 m; the outboard end rounded
       (the front view). The inner part is buried in the cabin.
                       x      top   bottom  outer y                      */
    var SPS = [[-0.18, 1.24, 1.12, 1.10], [-0.32, 1.46, 0.93, 1.24], [-0.52, 1.57, 0.84, 1.44],
               [-0.75, 1.61, 0.79, 1.74], [-0.98, 1.61, 0.77, 2.02], [-1.25, 1.60, 0.75, 2.10],
               [-1.80, 1.56, 0.73, 2.10],
               [-2.50, 1.43, 0.71, 2.10], [-2.95, 1.32, 0.70, 2.06], [-3.20, 1.20, 0.71, 1.94],
               [-3.36, 1.04, 0.73, 1.72], [-3.46, 0.84, 0.75, 1.36]];
    /* the section: flat underneath, the outboard end rounded and 0.72 m
       deep at most (the front view), the top rising inboard into the cabin
       side (the side view's top line is where it meets the cabin) */
    function spRing(a) {
      var x = a[0], top = a[1], bot = a[2], outer = a[3];
      var rz = Math.min((top - bot) / 2, 0.36), zc = bot + rz;
      var cy = Math.max(0.80, outer - rz), ry = outer - cy;
      var pts = [[0.80, bot]], q;
      for (q = 0; q <= 8; q++) {
        var an = -PI / 2 + PI * q / 8;
        pts.push([cy + ry * Math.cos(an), zc + rz * Math.sin(an)]);
      }
      pts.push([Math.max(0.80, Math.min(cy - 0.05, 1.30)), zc + rz + (top - zc - rz) * 0.75]);
      pts.push([0.80, top]);
      return { x: x, pts: pts.map(function (p) { return [p[0], Z(p[1])]; }) };
    }
    rloft(SPS.map(spRing), true, true).forEach(function (geo) { both(skin, geo); });

    /* ------------------------------------------------------- the T58s ----
       The two intakes side by side at the foot of the aft pylon's leading
       edge, round, facing forward over the cabin roof, each on a fairing
       (HMM-364 2011, the museum aircraft; the drawing's front view: centres
       0.92 m apart). The exhausts: an oval duct on each side of the pylon,
       its mouth sooted (the drawing, HMM-364 2011). */
    var IZ = Z(INL.h);
    var inProf = [[INL.x + 0.04, INL.r - 0.05], [INL.x, INL.r], [INL.x - 0.05, INL.r + 0.025],
                  [INL.x - 0.20, INL.r + 0.035], [INL.x - 0.80, INL.r + 0.035], [INL.x - 1.15, INL.r + 0.02],
                  [INL.x - 1.25, INL.r - 0.04]];
    both(skin, latheX(inProf, 16, INL.y, IZ));
    both(dark, disc(INL.r - 0.02, 16, [INL.x - 0.10, INL.y, IZ], [1, 0, 0]));
    both(dark, latheX([[INL.x + 0.035, INL.r - 0.05], [INL.x - 0.10, INL.r - 0.02]], 16, INL.y, IZ));
    both(skin, pod([[[INL.x - 0.10, INL.y - 0.20, IZ - 0.30], [INL.x - 0.10, INL.y + 0.17, IZ - 0.30],
                     [INL.x - 0.10, INL.y + 0.17, IZ - 0.08], [INL.x - 0.10, INL.y - 0.20, IZ - 0.08]],
                    [[INL.x - 1.00, INL.y - 0.22, IZ - 0.32], [INL.x - 1.00, INL.y + 0.20, IZ - 0.32],
                     [INL.x - 1.00, INL.y + 0.20, IZ - 0.04], [INL.x - 1.00, INL.y - 0.22, IZ - 0.04]]]));
    var EZ = Z(EXH.h), ey = sideY(EXH.x, EZ);
    var duct = cyl(0.20, 0.22, 0.20, 16, "y", 0, 0, 0, true);
    duct.scale(1.0, 1.0, 1.45); duct.translate(EXH.x, ey + 0.04, EZ);
    both(skin, duct);
    var mouth = disc(0.18, 16, [0, 0, 0], [0, 1, 0]);
    mouth.scale(1.0, 1.0, 1.45); mouth.translate(EXH.x, ey + 0.13, EZ);
    both(dark, mouth);

    /* --------------------------------------------------- the glazing ----
       Cut from the loft 5 cm proud: the four windshield panes either side
       of the centre post; the cockpit side windows behind them; the chin
       windows wrapping the lower nose (the drawing's front and side views,
       HMM-364 2011, the museum aircraft). */
    var OFF = 0.05;
    both(glass, patch(FUS, 6.66, 5.80, function (x) { return thAtY(FUS, x, 0.50); },
                      function (x) { return thAtY(FUS, x, 0.05); }, 5, 4, OFF));
    both(glass, patch(FUS, 6.66, 5.80, function (x) { return thAtZ(FUS, x, Z(2.04)); },
                      function (x) { return thAtY(FUS, x, 0.57); }, 5, 4, OFF));
    both(glass, patch(FUS, 5.74, 5.44, function (x) { return thAtZ(FUS, x, Z(1.86)); },
                      function (x) { return thAtZ(FUS, x, Z(2.66)); }, 2, 3, OFF));
    both(glass, patch(FUS, 5.38, 5.06, function (x) { return thAtZ(FUS, x, Z(1.86)); },
                      function (x) { return thAtZ(FUS, x, Z(2.62)); }, 2, 3, OFF));
    both(glass, patch(FUS, 6.76, 6.18, function (x) { return thAtZ(FUS, x, Z(1.20)); },
                      function (x) { return thAtZ(FUS, x, Z(1.76)); }, 5, 3, OFF));
    /* the door's window to starboard, the hatch's to port */
    glass.push(mirrorY(patch(FUS, 4.62, 4.06, function (x) { return thAtZ(FUS, x, Z(2.00)); },
                             function (x) { return thAtZ(FUS, x, Z(2.46)); }, 2, 2, OFF)));
    glass.push(patch(FUS, 4.56, 4.12, function (x) { return thAtZ(FUS, x, Z(1.62)); },
                     function (x) { return thAtZ(FUS, x, Z(2.40)); }, 2, 2, OFF));
    /* the round cabin windows, four a side; the two forward ones in their
       square frames (HMM-264, the drawing) */
    function porthole(x, h, side, r, framed) {
      var th = thAtZ(FUS, x, Z(h)), p = surfPt(FUS, x, th), n = surfN(FUS, x, th, x + 0.01, x - 0.01);
      var d = disc(r, 16, [p[0] + n[0] * 0.02, p[1] + n[1] * 0.02, p[2] + n[2] * 0.02], n);
      glass.push(side < 0 ? mirrorY(d) : d);
      var q = new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1), new V.Vector3(n[0], n[1], n[2]));
      var rim = new V.RingGeometry(r, r + 0.04, 16, 1);
      rim.applyQuaternion(q);
      rim.translate(p[0] + n[0] * 0.018, p[1] + n[1] * 0.018, p[2] + n[2] * 0.018);
      dark.push(side < 0 ? mirrorY(rim) : rim);
      if (framed) {
        var sq = new V.RingGeometry(r * 1.36, r * 1.36 + 0.035, 4, 1, PI / 4);
        sq.applyQuaternion(q);
        sq.translate(p[0] + n[0] * 0.016, p[1] + n[1] * 0.016, p[2] + n[2] * 0.016);
        dark.push(side < 0 ? mirrorY(sq) : sq);
      }
    }
    [[2.42, true], [0.79, true], [-0.04, false], [-1.66, false]].forEach(function (w) {
      porthole(w[0], 1.97, 1, 0.22, w[1]); porthole(w[0], 1.97, -1, 0.22, w[1]);
    });

    /* ------------------------------------------------ the cargo hook ----
       In its floor hatch under the cabin's centre (built to hoist 10,000 lb
       externally, NHC) */
    var hz = fusAt(0.55).zb;
    dark.push(box(0.34, 0.24, 0.08, 0.55, 0, hz - 0.03));
    metal.push(bar([0.55, 0, hz - 0.06], [0.55, 0, hz - 0.26], 0.03, 6, true));
    metal.push(place(new V.TorusGeometry(0.065, 0.02, 4, 10, PI * 1.4), 0.55, 0, hz - 0.31, PI / 2, 0, 0));

    /* ---------------------------------------------- antennas and kit ---- */
    [1.60, -0.80].forEach(function (x) {
      dark.push(box(0.28, 0.03, 0.22, x, 0, Z(fusAt(x).zt) + 0.10, 0, 0.35, 0));
    });
    dark.push(box(0.26, 0.03, 0.16, -1.9, 0, Z(under(-1.9)) - 0.07));
    /* the pitot heads on the nose */
    for (s = -1; s <= 1; s += 2)
      metal.push(bar([6.40, s * 0.62, Z(2.22)], [6.86, s * 0.62, Z(2.24)], 0.013, 5, true));
    if (VR.ecm) {
      /* the E's countermeasures as photographed: the chaff and flare
         dispensers on the sponsons' after ends (HMM-264, HMM-364), the
         missile-warning sensors low on the nose and at the tail, and the
         box on each side of the aft pylon above the exhaust (Zakho 1991,
         HMM-364 2011) */
      both(dark, box(0.32, 0.20, 0.16, -3.02, 1.66, Z(1.36)));
      [[6.42, Z(1.50)], [-6.30, Z(2.95)]].forEach(function (p) {
        var y0 = sideY(p[0], p[1]);
        both(dark, sph(0.07, 10, 6, p[0], y0 + 0.02, p[1], 1, 0.7, 1));
      });
      var by = sideY(-4.10, Z(3.50));
      both(dark, box(0.36, 0.14, 0.42, -4.10, by + 0.05, Z(3.50)));
      both(glass, box(0.22, 0.02, 0.24, -4.10, by + 0.125, Z(3.53)));
    }

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, as the RTS camera looks down: a panel on the top of
       each pylon, clear of the heads. Exactly C.team. */
    both(team, patch(PYF, 4.42, 3.45, function (x) { return thAtY(PYF, x, 0.34); },
                     cnst(PI / 2 - 0.001), 3, 3, 0.02));
    both(team, patch(FUS, -5.65, -6.38, function (x) { return thAtY(FUS, x, 0.34); },
                     cnst(PI / 2 - 0.001), 3, 3, 0.02));

    /* ---------------------------------------------- the undercarriage ----
       Fixed, three legs, twin wheels on each (NHC, Vectorsite). The nose
       leg long under the cockpit, an oleo with its torque links and a drag
       brace; the main legs short, out of the sponsons' undersides (the
       drawing, HMM-364 2011, Zakho 1991). */
    var gear = new V.Group();
    gear.name = "undercarriage";   // fixed wheels: not "gear", which hides in flight
    g.add(gear);
    var gm = [], gr = [];
    var nz = Z(GEAR_N.r), nb = fusAt(GEAR_N.x).zb;
    for (k = -1; k <= 1; k += 2) {
      gr.push(cyl(GEAR_N.r, GEAR_N.r, GEAR_N.w, 18, "y", GEAR_N.x, k * 0.15, nz));
      gm.push(cyl(0.12, 0.12, GEAR_N.w + 0.01, 12, "y", GEAR_N.x, k * 0.15, nz));
    }
    gm.push(cyl(0.045, 0.045, 0.30, 8, "y", GEAR_N.x, 0, nz));
    gm.push(bar([GEAR_N.x, 0, nz], [GEAR_N.x - 0.04, 0, nz + 0.40], 0.050, 8, true));
    gm.push(bar([GEAR_N.x - 0.04, 0, nz + 0.36], [GEAR_N.x - 0.06, 0, nb + 0.05], 0.075, 8, true));
    gm.push(bar([GEAR_N.x - 0.02, 0.06, nz + 0.10], [GEAR_N.x + 0.10, 0.06, nz + 0.28], 0.02, 5, true));
    gm.push(bar([GEAR_N.x - 0.05, 0, nz + 0.50], [GEAR_N.x + 0.55, 0, nb + 0.04], 0.035, 6, true));
    var mz = Z(GEAR_M.r), mb = Z(0.71);
    var mm = [], mr = [];
    for (k = -1; k <= 1; k += 2) {
      mr.push(cyl(GEAR_M.r, GEAR_M.r, GEAR_M.w, 18, "y", GEAR_M.x, GEAR_M.y + k * 0.17, mz));
      mm.push(cyl(0.14, 0.14, GEAR_M.w + 0.01, 12, "y", GEAR_M.x, GEAR_M.y + k * 0.17, mz));
    }
    mm.push(cyl(0.05, 0.05, 0.36, 8, "y", GEAR_M.x, GEAR_M.y, mz));
    mm.push(bar([GEAR_M.x, GEAR_M.y, mz], [GEAR_M.x + 0.03, GEAR_M.y, mb + 0.10], 0.085, 8, true));
    mm.push(bar([GEAR_M.x, GEAR_M.y, mz + 0.05], [GEAR_M.x + 0.42, GEAR_M.y - 0.10, mb + 0.06], 0.04, 6, true));
    mm.forEach(function (q) { both(gm, q); });
    mr.forEach(function (q) { both(gr, q); });
    mesh(gear, gm, T.gmetal, "undercarriage_legs");
    mesh(gear, gr, T.rubber, "undercarriage_tyres");

    /* ========================================================= rotors ===
       Each head in the h60_hawk_family.js mount: a tilt group at the hub
       (square to the cabin floor), a +PI/2 mount about X, the "rotor" node,
       and a -PI/2 group so the head is authored in model axes. The forward
       head is added first. */
    function rotorHead(H, ccw, nameSfx, pyTop) {
      var tiltM = new V.Matrix4().makeRotationY(H.tilt).setPosition(H.x, 0, Z(H.h));
      var mlen = H.h - pyTop + 0.05;
      var sw = Math.min(0.30, H.h - pyTop - 0.03);       /* the swashplate */
      var fixed = [cyl(0.15, 0.18, mlen, 14, "z", 0, 0, -mlen / 2 - 0.05),
                   cyl(0.38, 0.38, 0.05, 18, "z", 0, 0, -sw)];
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

      /* The fully articulated hub (the folded heads on USS Tarawa, 1997):
         the hub barrel and its cap, the swashplate's turning ring, and per
         blade the flapping and lag hinges, the pitch housing with the fold
         hinge outboard, the lag damper on the trailing side and the pitch
         horn with its link down to the swashplate. The leading edge is +Y
         on the anti-clockwise forward head and -Y on the clockwise aft one. */
      var hm = [], bl = [];
      var lead = ccw ? 1 : -1;
      hm.push(cyl(0.21, 0.25, 0.28, 16, "z", 0, 0, 0));
      hm.push(cyl(0.13, 0.20, 0.12, 14, "z", 0, 0, 0.20));
      hm.push(cyl(0.33, 0.33, 0.05, 18, "z", 0, 0, -sw + 0.06));
      var ang = [60, 180, 300];
      for (k = 0; k < 3; k++) {
        var a = ang[k] * D2R;
        var parts = [box(0.28, 0.25, 0.18, 0.31, 0, 0),
                     cyl(0.10, 0.085, 0.56, 12, "x", 0.70, 0, 0),
                     box(0.20, 0.17, 0.14, 1.02, 0, 0),
                     cyl(0.04, 0.04, 0.50, 8, "x", 0.58, -lead * 0.18, 0.03),
                     box(0.12, 0.07, 0.05, 0.48, lead * 0.17, -0.07),
                     bar([0.48, lead * 0.18, -0.08], [0.48, lead * 0.20, -0.26], 0.018, 6, true)];
        parts.forEach(function (q) { q.rotateZ(a); hm.push(q); });
        /* the blade, constant chord from the cuff to the square tip; its
           trim tab; coned 2 degrees */
        var LE = lead * 0.25 * CHORD, TE = lead * (0.25 * CHORD - CHORD);
        var outline = [[1.12, TE * 0.7], [1.40, TE], [ROTOR_R - 0.04, TE], [ROTOR_R, TE * 0.85],
                       [ROTOR_R, LE * 0.9], [ROTOR_R - 0.08, LE], [1.40, LE], [1.12, LE * 0.7]];
        if (lead < 0) outline.reverse();
        var b = M.slab(V, outline, 0.055);
        b.translate(0, 0, -0.028);
        b.rotateY(-2 * D2R);
        b.rotateZ(a);
        bl.push(b);
        var tab = box(0.40, 0.08, 0.010, ROTOR_R - 1.9, TE - lead * 0.03, 0);
        tab.rotateY(-2 * D2R); tab.rotateZ(a);
        bl.push(tab);
      }
      mesh(head, hm, T.hub, "hub" + nameSfx);
      mesh(head, bl, T.blade, "blades" + nameSfx);
      return rotor;
    }
    rotorHead(HUB_F, true, "_fwd", 3.77);
    rotorHead(HUB_A, false, "_aft", 4.55);

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
  return { d: variant("d"), e: variant("e") };
})();

/* len is the MEASURED x extent, the forward head's two forward blades to
   the aft head's aft blade; render3d.js normalises on the measurement. */
UNIT_MODELS["nato_e60_ch46"] = { len: 21.7, build: HeroCH46.d };
UNIT_MODELS["nato_e80_ch46"] = { len: 21.7, build: HeroCH46.e };
