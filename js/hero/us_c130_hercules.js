/* ================= us_c130_hercules.js  -  HERO MODEL =================
   Lockheed C-130 Hercules: the transport and the gunship. One airframe, a
   guise for each of the ten rows that draw it (js/heavyair.js herc() and
   spectre(), js/eras.js for the RAF):

     nato_e50_airlift    "A50"  C-130A: three-blade 15 ft Aeroproducts props,
                                no underwing tanks, white over bare metal.
     nato_e80_airlift    "H80"  C-130H: Hamilton Standard four-blade 13 ft 6 in
                                props, the underwing tanks, European One.
     airlift_n           "J20"  C-130J-30 Super Hercules: the 15 ft stretch,
                                six-blade scimitar props, the AE2100 nacelle.
     gbr_e60_airlift     "K60"  Hercules C.1 (C-130K): the short body, four
                                blades, white over bare metal.
     gbr_e80_airlift     "K80"  Hercules C.3: the C-130K stretched 15 ft, the
                                refuelling probe over the flight deck, RAF
                                green.
     gbr_e90_airlift     "K90"  the same C.3 in the greyer 1990s wear.
     nato_e60_gunshipair "G60"  AC-130A: four 7.62 mm miniguns and four 20 mm
                                Vulcans out of the port side, three-blade props,
                                no tanks, SEA camouflage over black.
     nato_e80_gunshipair "G80"  AC-130H: two 20 mm forward, the 40 mm Bofors and
                                the 105 mm aft, the sensor ball, gunship grey.
     nato_e00_gunshipair "G00"  AC-130U: the 25 mm where the Vulcans were, the
                                40 mm and the 105 mm aft.
     gunshipair_n        "G20"  AC-130J: the 30 mm forward, the 105 mm aft, a
                                chin sensor ball, six-blade props, short body.
   No row carries turret:true, so nothing here is named "turret": the guns are
   baked into the airframe like everything else.

   References (Wikimedia Commons, fetched at width 960/1280 for this rebuild):
     D1 "Lockheed C-130J Hercules 3-view drawing.svg": the station table below
        is measured off it at 29.14 px/m (its side view is 868 px for the
        29.79 m body): fuselage 4.32 m wide and 4.05 m deep, the belly 0.65 m
        off the ground and flat from 4 m to 16.5 m aft of the nose, the
        radome tip 2.1 m up with its joint kinked at 1.05 m, the crown level
        at 4.70 m, the belly sweeping up behind the gear at 22 deg to the
        beaver tail; the main-gear sponsons 9.25 to 16.55 m aft and 2.52 m
        out; the wing leading edge at 11.2 m (11.8 m at the tip), the constant
        4.95 m chord to 5.63 m out and the 2.58 m tip at 20.2 m; the nacelles
        5.05 and 10.1 m out, the prop plane 8.9 m aft of the nose; the tanks
        7.6 m out, 1.14 m through, from 9.8 to 17.7 m; the fin 6.6 m at the
        root, 1.75 m at the tip, its leading edge 28 deg back behind a dorsal
        fillet rising from 17.6 m; the 16 m tailplane at 4.62 m; main wheels
        at 12.35 and 13.87 m (1.24 m tyres), nose wheels at 3.45 m.
     D2 "Lockheed C-130A Hercules (late) 3-view line drawing.png" (Lockheed's
        dimensioned drawing): span 132 ft 8 in, length 97 ft 9 in, height
        38 ft 4 in, tailplane 52 ft 8 in, the A's props 15 ft 1 in across,
        2 deg 31 min of dihedral, main-gear track 14 ft 3 in, nose-gear track
        1 ft 10 in, nose gear 11 ft 8 in aft of the nose, the main axles 5 ft
        apart, prop tips 5 ft and 5 ft 8 in off the ground.
     D3 "Lockheed C-130 Hercules 3-view.png": the general arrangement.
     D4 "Size comparison C-17 A400M C-130J-30 C-130J.jpg": the RAF's short
        and stretched C-130J side by side at one scale. Measured: the props,
        the crew door and the main gear of the J-30 sit 3.0-3.2 m further aft
        of the nose than the short J's, so the 15 ft stretch is about 10 ft
        ahead of the wing and 5 ft behind it (the old model had it the other
        way round).
     P1 "Lockheed C-130K Hercules C.3 XV307 of the RAF - 2006 RIAT at RAF
        Fairford.jpg": the C.3 in RAF green, belly included.
     P2 "16-5843 ... Lockheed C-130J-30 Super Hercules - VGHS.jpg": the J-30's
        side, the long body, grey all over, the sponson and the ramp line.
     P4 "AC-130H flies along Northwest Florida coast.jpg": the radome, the
        cockpit glazing from ahead and above, the deep T56 nacelles with the
        chin intake, the tanks on short pylons, the blisters either side of
        the lower nose, gunship grey.
     P5 "Lockheed AC-130U Aviation Nation 2017.jpg", P11 "AC-130U weapons and
        sensors.jpg" (from below, labelled): the 25 mm at about 7 m, the
        sensor ball in a blister just ahead of the sponson (9 m), the 40 mm
        at about 15.7 m and the 105 mm at 17.5 m - both AFT of the wing, where
        the old model had the Bofors over the gear - and a blister aft.
     P6 "Lockheed AC-130A Hercules '50014' (11635034546).jpg": the Roman-nose
        radome and the window pattern from the front quarter: eyebrow panes,
        the windscreen, the side panes and the two low side windows.
     P7 "RAAF C-130A Hercules (AWM 128872).jpeg": a C-130A of 1958, white top,
        bare metal below, the dark radome, three-blade props.
     P8 "AC-130J Ghostrider ... Hurlburt Field.jpg": six-blade scimitar props,
        the tanks, the chin ball, the barrel out of the port side.
     P9 "C-130H Minnesota ANG dropping paras 1992.JPEG": European One all over.
     P10 "Lockheed Hercules C-130H 3 (7570398108).jpg": the nose close up.
   Published: C-130H 97 ft 9 in (29.79 m), span 132 ft 7 in (40.41 m), height
   38 ft 3 in (11.66 m), Hamilton Standard 54H60 props 13 ft 6 in (4.11 m);
   C-130J-30 112 ft 9 in (34.36 m), Dowty R391 13 ft 6 in; AC-130J 38 ft 10 in
   high (11.84 m); Hercules C.3 stretched 15 ft (4.57 m) by Marshall.

   Recognition, at game zoom (each on the references above):
     1. the high wing, straight, with the constant-chord centre section and
        the tapered outer panels (D1 plan, D2);
     2. four deep nacelles slung ahead of the wing, the chin intake under the
        spinner (D1, P4), and the props by guise: 3 broad blades on the A
        (P7, D2), 4 on the H/K, 6 scimitars on the J (P8);
     3. the 'Roman nose': the round radome kinked under the sloping
        windscreen (D1 side, P6, P10);
     4. the stepped glazing: eyebrow panes, windscreen, side panes, the low
        side windows (D1, P6);
     5. the round fuselage with the flat cargo floor and the main-gear
        sponsons on the lower sides (D1 front, P2, P5);
     6. the upswept beaver tail with the ramp and the cargo door under it
        (D1 side, P2);
     7. the tall fin with its long dorsal fillet, the tailplane low on the
        tail cone (D1, P1, P5);
     8. the long underwing tanks between the engines, not on the A rows (D1,
        P4, P8);
     9. the J-30 and C.3 stretch, 10 ft ahead of the wing and 5 ft behind
        (D4);
    10. the gunships' guns and sensors on the port side (P4, P5, P8, P11);
    11. the paint by guise (P1, P2, P4, P7, P9).

   Model space: +X nose, +Y left (port), +Z up, real metres; x = 0 is the
   short body's mid-length station, which the stretched bodies keep (their
   nose reaches 3.05 m further forward, their tail 1.52 m further aft); z = 0
   is the fuselage axis, 2.69 m above the ground; every height below is h, metres
   above the ground, converted by Z(). Stations d are metres aft of the nose
   of the SHORT body: dm() applies the stretch to the fuselage, W() moves the
   wing and all it carries by the forward plug, T() moves the tail by both.
   Paint: one canvas sheet per guise, four plan views (from above, port,
   starboard, below), each skin triangle projected into the view its normal
   faces, as js/hero/us_f35_family.js does; the radome is its own material.
   Team colour: exactly C.team, a band round each wing tip and the top of the
   fin. Insignia: the F-35 hero's low-visibility ones, a shade off the skin.
   Everything is merged into one mesh per material, the gear in a group of its
   own: the tyres are the lowest opaque thing on the aeroplane.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroC130 = (function () {
  "use strict";

  var V = null;                     /* THREE, set by build() */
  var D2R = Math.PI / 180;
  var HC = 2.69;                    /* the fuselage axis above the ground */
  var NOSE = 14.9, S1 = 0, S2 = 0;  /* set per build: nose X, the forward and aft plugs */
  var PA = 5.4, PB = 16.9;          /* the plug stations: behind the flight deck, behind the sponson */
  function X(d) { return NOSE - d; }
  function Z(h) { return h - HC; }
  function dm(d) { return d + (d > PA ? S1 : 0) + (d > PB ? S2 : 0); }
  function W(d) { return d + S1; }
  function T(d) { return d + S1 + S2; }
  function sgp(v, e) { return v < 0 ? -Math.pow(-v, e) : Math.pow(v, e); }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function cr(p0, p1, p2, p3, t) {
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
                  (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  /* a smooth look-up in a table whose first column is the station */
  function tab(rows, s) {
    var n = rows.length, i = 0, k, out = [];
    if (s <= rows[0][0]) return rows[0].slice(1);
    if (s >= rows[n - 1][0]) return rows[n - 1].slice(1);
    while (rows[i + 1][0] < s) i++;
    var a = rows[Math.max(i - 1, 0)], b = rows[i], c = rows[i + 1], d = rows[Math.min(i + 2, n - 1)];
    var t = (s - b[0]) / Math.max(1e-6, c[0] - b[0]);
    for (k = 1; k < b.length; k++) out.push(cr(a[k], b[k], c[k], d[k], t));
    return out;
  }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ---------------------------------------------------------------- rows --
     s1, s2: the plugs (D4: about 10 ft ahead of the wing, 5 ft behind).
     prop: blades; rp: their radius (the A's 15 ft 1 in Aeroproducts, D2;
     13 ft 6 in for the 54H60 and the R391). fin: height of the fin tip above
     the ground. probe: how far the RAF probe reaches ahead of the radome.
     tanks: false on the two A rows (P7 and the AC-130A pylon-turn photograph
     show the wing clean between the engines). ball: the gunship's sensor
     ball; blis: the blisters either side of the lower nose (P4, P11); rec:
     the refuelling receptacle behind the flight deck.                      */
  var VARIANTS = {
    A50: { id: "A50", len: 29.79, s1: 0, s2: 0, prop: 3, blade: "broad", rp: 2.30, nac: "t56", paint: "white", fin: 11.66, tanks: false },
    H80: { id: "H80", len: 29.79, s1: 0, s2: 0, prop: 4, blade: "paddle", rp: 2.06, nac: "t56", paint: "lizard", fin: 11.66 },
    J20: { id: "J20", len: 34.36, s1: 3.05, s2: 1.52, prop: 6, blade: "scimitar", rp: 2.06, nac: "ae", paint: "ghost", fin: 11.84 },
    K60: { id: "K60", len: 29.79, s1: 0, s2: 0, prop: 4, blade: "paddle", rp: 2.06, nac: "t56", paint: "white", fin: 11.66, uk: true },
    K80: { id: "K80", len: 34.36, s1: 3.05, s2: 1.52, prop: 4, blade: "paddle", rp: 2.06, nac: "t56", paint: "olive", fin: 11.66, probe: 1.0, uk: true },
    K90: { id: "K90", len: 34.36, s1: 3.05, s2: 1.52, prop: 4, blade: "paddle", rp: 2.06, nac: "t56", paint: "olive2", fin: 11.66, probe: 1.0, uk: true },
    G60: { id: "G60", len: 29.79, s1: 0, s2: 0, prop: 3, blade: "broad", rp: 2.30, nac: "t56", paint: "sea", fin: 11.66, tanks: false, guns: "A", ball: "fwdA" },
    G80: { id: "G80", len: 29.79, s1: 0, s2: 0, prop: 4, blade: "paddle", rp: 2.06, nac: "t56", paint: "grey", fin: 11.66, guns: "H", ball: "fwd", blis: true, rec: true },
    G00: { id: "G00", len: 29.79, s1: 0, s2: 0, prop: 4, blade: "paddle", rp: 2.06, nac: "t56", paint: "grey2", fin: 11.66, guns: "U", ball: "fwd", blis: true, aftBlis: true, rec: true },
    G20: { id: "G20", len: 29.79, s1: 0, s2: 0, prop: 6, blade: "scimitar", rp: 2.06, nac: "ae", paint: "grey3", fin: 11.84, guns: "J", ball: "chin", rec: true }
  };
  function lenOf(which) { var v = VARIANTS[which]; return v.len + (v.probe || 0); }

  /* --------------------------------------------------------------- paint --
     Hexes are authored darker than the photographs read: the renderer's ACES
     pass lifts mid greys (pla_e00_destroyer.js).
     white:  white crown over bare alloy (P7): the low coat is the metal, the
             wing is the metal, the fin is white; the radome black.
     lizard: European One (P9): FS 34092 dark green, 34102 green and 36081
             grey wrapped round the whole aeroplane.
     ghost:  the USAF C-130J's light grey all over (P2).
     olive:  RAF green all over, belly included (P1); olive2 the greyer 1990s
             wear of the same.
     sea:    South-East Asia tan and two greens over black, the AC-130A.
     grey:   gunship grey for the AC-130H (P4), grey2 the U's (P5), grey3 the
             J's (P8).
     demarc: where the low coat starts on the side (h, m); null wraps round. */
  var PAINT = {
    white:  { top: "#cfd3d5", low: "#9ea6ab", wing: "#9ea6ab", demarc: 3.25, dome: 0x141618, seam: 0.20, blobs: [], gloss: true },
    lizard: { top: "#3d4838", low: "#3d4838", demarc: null, dome: 0x2c322c, seam: 0.16,
              blobs: [["#55623f", 26, 1.6, 3.2], ["#575d5f", 22, 1.5, 3.0]] },
    ghost:  { top: "#8a9196", low: "#868d92", demarc: null, dome: 0x7a8186, seam: 0.15,
              blobs: [["#82898e", 30, 0.8, 2.0], ["#91989d", 26, 0.8, 1.8]] },
    olive:  { top: "#47533e", low: "#47533e", demarc: null, dome: 0x30372e, seam: 0.16,
              blobs: [["#3d4836", 26, 1.2, 2.6], ["#525c4a", 22, 1.0, 2.2]] },
    olive2: { top: "#4a5246", low: "#4a5246", demarc: null, dome: 0x343a33, seam: 0.15,
              blobs: [["#41493e", 26, 1.2, 2.6], ["#575e54", 22, 1.0, 2.2]] },
    sea:    { top: "#56633d", low: "#202224", demarc: 2.45, dome: 0x1d1f21, seam: 0.15,
              blobs: [["#8e7d5a", 30, 1.4, 3.0], ["#333d2c", 28, 1.4, 3.0]] },
    grey:   { top: "#50565b", low: "#4e5459", demarc: null, dome: 0x484e53, seam: 0.15,
              blobs: [["#4a5055", 30, 0.8, 2.0], ["#575d62", 26, 0.8, 1.8]] },
    grey2:  { top: "#555b60", low: "#53595e", demarc: null, dome: 0x4c5257, seam: 0.15,
              blobs: [["#4f555a", 30, 0.8, 2.0], ["#5c6267", 26, 0.8, 1.8]] },
    grey3:  { top: "#596065", low: "#575e63", demarc: null, dome: 0x50575c, seam: 0.14,
              blobs: [["#535a5f", 30, 0.8, 2.0], ["#60676c", 26, 0.8, 1.8]] }
  };

  /* ========================================================== fuselage ==
     Rows: d, half-width, top h, bottom h, the widest line's h, and the
     squareness of the upper and lower halves (a superellipse: 1 is an
     ellipse, smaller is boxier). Measured off D1's side, plan and front
     views: the body 4.32 m wide and 4.05 m deep, the upper half nearly round,
     the lower half square-bottomed over the cargo floor. The radome's top
     line kinks into the windscreen at 1.05 m (the Roman nose). Behind the
     sponson the belly sweeps up at 22 deg to the beaver tail: the section
     keeps its width while the ramp and the door cut its bottom off flat, so
     the tail is broad and shallow, as from below in P11. The rows at PA and
     PB carry the plugs. */
  var FUS = [
    [0.00, 0.03, 2.13, 2.07, 2.10, 1.00, 1.00],
    [0.06, 0.30, 2.33, 1.86, 2.10, 1.00, 1.00],
    [0.15, 0.46, 2.50, 1.72, 2.12, 1.00, 1.00],
    [0.30, 0.60, 2.64, 1.60, 2.14, 1.00, 1.00],
    [0.50, 0.71, 2.75, 1.50, 2.16, 1.00, 0.98],
    [0.75, 0.82, 2.84, 1.40, 2.18, 1.00, 0.95],
    [1.05, 0.94, 2.93, 1.30, 2.21, 0.98, 0.92],
    [1.32, 1.06, 3.18, 1.21, 2.27, 0.96, 0.88],
    [1.60, 1.19, 3.47, 1.13, 2.33, 0.94, 0.84],
    [1.90, 1.32, 3.80, 1.05, 2.40, 0.93, 0.80],
    [2.25, 1.47, 4.10, 0.95, 2.47, 0.92, 0.76],
    [2.60, 1.61, 4.29, 0.86, 2.53, 0.92, 0.72],
    [3.00, 1.75, 4.43, 0.77, 2.58, 0.92, 0.68],
    [3.50, 1.92, 4.55, 0.70, 2.63, 0.92, 0.64],
    [4.10, 2.04, 4.64, 0.66, 2.66, 0.92, 0.60],
    [4.80, 2.13, 4.68, 0.65, 2.68, 0.92, 0.58],
    [5.40, 2.16, 4.70, 0.65, 2.69, 0.92, 0.57],
    [16.50, 2.16, 4.70, 0.65, 2.69, 0.92, 0.57],
    [16.90, 2.16, 4.70, 0.69, 2.69, 0.92, 0.57],
    [17.40, 2.16, 4.70, 0.80, 2.69, 0.92, 0.57],
    [18.00, 2.16, 4.71, 0.96, 2.69, 0.92, 0.57],
    [18.70, 2.16, 4.72, 1.20, 2.70, 0.92, 0.55],
    [19.40, 2.16, 4.73, 1.47, 2.72, 0.92, 0.52],
    [20.20, 2.15, 4.73, 1.78, 2.76, 0.92, 0.50],
    [21.00, 2.13, 4.74, 2.09, 2.85, 0.93, 0.48],
    [21.90, 2.09, 4.75, 2.50, 3.00, 0.94, 0.46],
    [22.80, 2.03, 4.76, 2.90, 3.20, 0.95, 0.45],
    [23.70, 1.93, 4.77, 3.29, 3.50, 0.96, 0.45],
    [24.60, 1.80, 4.78, 3.66, 3.84, 0.97, 0.47],
    [25.50, 1.64, 4.78, 3.92, 4.07, 0.98, 0.50],
    [26.40, 1.45, 4.78, 4.04, 4.18, 0.98, 0.55],
    [27.30, 1.22, 4.78, 4.17, 4.30, 0.98, 0.62],
    [28.10, 0.98, 4.78, 4.33, 4.43, 1.00, 0.72],
    [28.80, 0.72, 4.77, 4.46, 4.53, 1.00, 0.82],
    [29.30, 0.50, 4.75, 4.51, 4.58, 1.00, 0.90],
    [29.65, 0.26, 4.71, 4.56, 4.62, 1.00, 1.00],
    [29.79, 0.05, 4.66, 4.61, 4.635, 1.00, 1.00]
  ];
  /* the rings the hull is lofted through (short-body stations) */
  var FST = [0, 0.06, 0.15, 0.30, 0.50, 0.75, 1.05, 1.32, 1.60, 1.90, 2.25, 2.60, 3.00, 3.50, 4.10, 4.80,
             5.40, 9.0, 12.5, 16.50, 16.90, 17.40, 18.00, 18.70, 19.40, 20.20, 21.00, 21.90, 22.80, 23.70,
             24.60, 25.50, 26.40, 27.30, 28.10, 28.80, 29.30, 29.65, 29.79];
  var FN = 32;
  var FT = null;                         /* the stretched table, per build */
  function stretchTable() {
    var out = [], i, r, d;
    for (i = 0; i < FUS.length; i++) {
      r = FUS[i].slice(); d = r[0];
      r[0] = dm(d);
      out.push(r);
      if (d === PA && S1) { r = r.slice(); r[0] = PA + S1; out.push(r); }
      if (d === PB && S2) { r = r.slice(); r[0] = PB + S1 + S2; out.push(r); }
    }
    return out;
  }
  function stations() {
    var out = [], i, d;
    for (i = 0; i < FST.length; i++) {
      d = FST[i];
      out.push(dm(d));
      if (d === PA && S1) out.push(PA + S1);
      if (d === PB && S2) out.push(PB + S1 + S2);
    }
    return out;
  }
  /* the section at a stretched station: [w, zt, zb, zw, eU, eL], heights in h */
  function sec(d) { return tab(FT, d); }
  /* a point of the section by angle t from the port side, counter-clockwise
     seen from ahead (t = 90 deg is the crown): [y, h] */
  function secPt(r, t) {
    var c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? r[4] : r[5];
    return [r[0] * sgp(c, e), s >= 0 ? r[3] + (r[1] - r[3]) * sgp(s, e) : r[3] + (r[3] - r[2]) * sgp(s, e)];
  }
  /* the hull's half-width at station d and height h */
  function hullY(d, h) {
    var r = sec(d), up = h >= r[3], e = up ? r[4] : r[5];
    var v = up ? (h - r[3]) / Math.max(0.01, r[1] - r[3]) : (r[3] - h) / Math.max(0.01, r[3] - r[2]);
    v = clamp(v, 0, 0.999);
    var sn = Math.pow(v, 1 / e), c = Math.sqrt(Math.max(0, 1 - sn * sn));
    return r[0] * Math.pow(c, e);
  }
  /* the height of the upper hull where its half-width is |y| */
  function hullTopH(d, y) {
    var r = sec(d), e = r[4], c = Math.min(0.999, Math.abs(y) / r[0]);
    var cc = Math.pow(c, 1 / e), sn = Math.sqrt(Math.max(0, 1 - cc * cc));
    return r[3] + (r[1] - r[3]) * Math.pow(sn, e);
  }

  /* ============================================================ shells ==
     Every skin part is a ring loft. A triangle is wound to face away from the
     inside of its ring pair, so no part depends on how a table was written
     (the scheme of js/hero/us_e3_sentry.js); normals are smoothed over the
     shared vertices, the caps keep their own. Categories are material keys. */
  function Shell() { this.P = []; this.T = []; }
  Shell.prototype.vert = function (p) { this.P.push(p); return this.P.length - 1; };
  Shell.prototype.tri = function (a, b, c, cat, od) {
    var P = this.P, pa = P[a], pb = P[b], pc = P[c];
    var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
    var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (nx * od[0] + ny * od[1] + nz * od[2] < 0) { var t = b; b = c; c = t; }
    this.T.push([a, b, c, cat]);
  };
  Shell.prototype.fan = function (ring, c, ref, cat) {
    var n = ring.length, ic = this.vert(c), ids = [], i;
    var od = [c[0] - ref[0], c[1] - ref[1], c[2] - ref[2]];
    for (i = 0; i < n; i++) ids.push(this.vert(ring[i]));
    for (i = 0; i < n; i++) this.tri(ic, ids[i], ids[(i + 1) % n], cat, od);
  };
  Shell.prototype.loft = function (rings, catOf, capA, capB) {
    var R = rings.length, n = rings[0].length, r, i, j, idx = [], cent = [];
    for (r = 0; r < R; r++) {
      var row = [], cx = 0, cy = 0, cz = 0;
      for (i = 0; i < n; i++) {
        var p = rings[r][i];
        row.push(this.vert(p)); cx += p[0]; cy += p[1]; cz += p[2];
      }
      idx.push(row); cent.push([cx / n, cy / n, cz / n]);
    }
    for (r = 0; r + 1 < R; r++) {
      var mc = [(cent[r][0] + cent[r + 1][0]) / 2, (cent[r][1] + cent[r + 1][1]) / 2, (cent[r][2] + cent[r + 1][2]) / 2];
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        var A = rings[r][i], B = rings[r][j], C = rings[r + 1][j], D = rings[r + 1][i];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - mc[0], (A[1] + B[1] + C[1] + D[1]) / 4 - mc[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - mc[2]];
        var cat = catOf ? catOf(i, r, A, B, C, D) : "skin";
        this.tri(idx[r][i], idx[r][j], idx[r + 1][j], cat, od);
        this.tri(idx[r][i], idx[r + 1][j], idx[r + 1][i], cat, od);
      }
    }
    if (capA) this.fan(rings[0], cent[0], cent[1], capA);
    if (capB) this.fan(rings[R - 1], cent[R - 1], cent[R - 2], capB);
  };
  /* a grid of points (rows of columns), wound away from ref */
  Shell.prototype.sheet = function (grid, cat, ref) {
    var ids = [], i, j;
    for (i = 0; i < grid.length; i++) {
      var row = [];
      for (j = 0; j < grid[i].length; j++) row.push(this.vert(grid[i][j]));
      ids.push(row);
    }
    for (i = 0; i + 1 < grid.length; i++) {
      for (j = 0; j + 1 < grid[i].length; j++) {
        var A = grid[i][j], B = grid[i][j + 1], C = grid[i + 1][j + 1], D = grid[i + 1][j];
        var od = [(A[0] + B[0] + C[0] + D[0]) / 4 - ref[0], (A[1] + B[1] + C[1] + D[1]) / 4 - ref[1],
                  (A[2] + B[2] + C[2] + D[2]) / 4 - ref[2]];
        this.tri(ids[i][j], ids[i][j + 1], ids[i + 1][j + 1], cat, od);
        this.tri(ids[i][j], ids[i + 1][j + 1], ids[i + 1][j], cat, od);
      }
    }
  };
  Shell.prototype.emit = function () {
    var P = this.P, Tr = this.T, N = [], i, k;
    for (i = 0; i < P.length; i++) N.push([0, 0, 0]);
    for (k = 0; k < Tr.length; k++) {
      var t = Tr[k], pa = P[t[0]], pb = P[t[1]], pc = P[t[2]];
      var ux = pb[0] - pa[0], uy = pb[1] - pa[1], uz = pb[2] - pa[2];
      var vx = pc[0] - pa[0], vy = pc[1] - pa[1], vz = pc[2] - pa[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      for (i = 0; i < 3; i++) { var q = N[t[i]]; q[0] += nx; q[1] += ny; q[2] += nz; }
    }
    for (i = 0; i < N.length; i++) {
      var m = Math.sqrt(N[i][0] * N[i][0] + N[i][1] * N[i][1] + N[i][2] * N[i][2]) || 1;
      N[i][0] /= m; N[i][1] /= m; N[i][2] /= m;
    }
    var by = {};
    for (k = 0; k < Tr.length; k++) {
      var cat = Tr[k][3];
      if (!by[cat]) by[cat] = { pos: [], nor: [] };
      for (i = 0; i < 3; i++) {
        var p = P[Tr[k][i]], nn = N[Tr[k][i]];
        by[cat].pos.push(p[0], p[1], p[2]); by[cat].nor.push(nn[0], nn[1], nn[2]);
      }
    }
    for (var key in by) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(by[key].pos, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(by[key].nor, 3));
      put(key, g);
    }
  };

  var K = null, G = null;            /* the lists, one per material: airframe and gear */
  function put(key, g) { (K[key] || (K[key] = [])).push(g); }

  /* general ring: a superellipse about (x, yc), half-width w, top and bottom
     zt / zb (model z), widest at zw, squareness eU / eL; n points from the
     port side counter-clockwise seen from ahead */
  function ringSE(x, yc, w, zt, zb, zw, eU, eL, n) {
    var out = [], j;
    for (j = 0; j < n; j++) {
      var t = j / n * Math.PI * 2, c = Math.cos(t), s = Math.sin(t), e = s >= 0 ? eU : eL;
      out.push([x, yc + w * sgp(c, e), s >= 0 ? zw + (zt - zw) * sgp(s, e) : zw + (zw - zb) * sgp(s, e)]);
    }
    return out;
  }

  /* ------------------------------------------------------------ the hull */
  function addFuselage() {
    var st = stations(), rings = [], r, i, sh = new Shell();
    for (r = 0; r < st.length; r++) {
      var s = sec(st[r]), ring = [];
      for (i = 0; i < FN; i++) {
        var p = secPt(s, i / FN * Math.PI * 2);
        ring.push([X(st[r]), p[0], Z(p[1])]);
      }
      rings.push(ring);
    }
    /* the radome: everything ahead of 1.05 m, and below the joint line that
       runs from the kink down and aft to 1.6 m (D1 side view) */
    sh.loft(rings, function (i, r, A, B, C, D) {
      var dmid = (st[r] + st[r + 1]) / 2;
      if (dmid < 1.05) return "dome";
      if (dmid < 1.6) {
        var hm = (A[2] + B[2] + C[2] + D[2]) / 4 + HC;
        if (hm < 2.93 - (dmid - 1.05) * 1.24) return "dome";
      }
      return "skin";
    }, "dome", "skin");
    sh.emit();
  }

  /* ---------------------------------------------------------- glazing ==
     Panes laid a few centimetres proud of the hull, with the hull between
     them for the frames (D1 side view at 6x, P6): on each side two lower
     side windows, two sloping chin panes over the radome joint, two side
     panes and two eyebrows; across the front two windscreen panes a side of
     the centre post and two eyebrows above them. */
  function paneSide(sh, d0, d1, h0, h1, side) {
    var grid = [], i, j;
    for (i = 0; i <= 2; i++) {
      var d = d0 + (d1 - d0) * i / 2, row = [];
      for (j = 0; j <= 2; j++) {
        var h = h0 + (h1 - h0) * j / 2, r = sec(d), y = hullY(d, h);
        var dz = h - r[3], dy = y, L = Math.sqrt(dy * dy + dz * dz) || 1;
        row.push([X(d), side * (y + 0.03 * dy / L), Z(h + 0.03 * dz / L)]);
      }
      grid.push(row);
    }
    var rr = sec((d0 + d1) / 2);
    sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(rr[3])]);
  }
  function paneTop(sh, d0, d1, y0, y1) {
    var grid = [], i, j;
    for (i = 0; i <= 2; i++) {
      var d = d0 + (d1 - d0) * i / 2, row = [];
      for (j = 0; j <= 2; j++) {
        var y = y0 + (y1 - y0) * j / 2, r = sec(d), h = hullTopH(d, y);
        var dz = h - r[3], L = Math.sqrt(y * y + dz * dz) || 1;
        row.push([X(d), y + 0.03 * y / L, Z(h + 0.03 * dz / L)]);
      }
      grid.push(row);
    }
    var rr = sec((d0 + d1) / 2);
    sh.sheet(grid, "glass", [X((d0 + d1) / 2), 0, Z(rr[3])]);
  }
  function addGlass() {
    var sh = new Shell(), s;
    for (s = -1; s <= 1; s += 2) {
      paneTop(sh, 1.64, 2.08, s * 0.06, s * 0.60);        /* windscreen, a side of the post */
      paneTop(sh, 1.66, 2.10, s * 0.66, s * 1.06);
      paneTop(sh, 2.16, 2.46, s * 0.08, s * 0.50);        /* eyebrows over it */
      paneTop(sh, 2.18, 2.48, s * 0.56, s * 0.98);
      paneSide(sh, 2.16, 2.58, 3.30, 3.76, s);            /* side panes */
      paneSide(sh, 2.64, 3.08, 3.30, 3.78, s);
      paneSide(sh, 2.60, 2.86, 3.86, 4.04, s);            /* side eyebrows */
      paneSide(sh, 2.92, 3.14, 3.86, 4.05, s);
      paneSide(sh, 1.34, 1.58, 2.62, 2.98, s);            /* chin panes over the radome joint */
      paneSide(sh, 1.62, 1.86, 2.60, 3.05, s);
      paneSide(sh, 1.92, 2.18, 2.38, 2.88, s);            /* the two low side windows */
      paneSide(sh, 2.22, 2.48, 2.38, 2.88, s);
    }
    sh.emit();
  }

  /* ========================================================== sponsons ==
     The main-gear fairings on the lower sides (D1 side, plan and front
     views): from a rounded nose at 9.25 m to the blunt aft face at 16.55 m,
     2.52 m out, from 0.70 m up to 2.58 m. Rows: d, outer half-width, top h,
     bottom h. Their inner half lies inside the hull. */
  var SPON = [[9.25, 1.95, 1.64, 1.56], [9.45, 2.14, 2.00, 1.15], [9.80, 2.32, 2.25, 0.88], [10.3, 2.44, 2.43, 0.74],
              [11.0, 2.50, 2.53, 0.70], [12.0, 2.52, 2.58, 0.70], [15.2, 2.52, 2.58, 0.70], [16.0, 2.46, 2.54, 0.76],
              [16.45, 2.37, 2.48, 0.90], [16.58, 2.22, 2.32, 1.08]];
  function addSponsons() {
    for (var s = -1; s <= 1; s += 2) {
      var rings = SPON.map(function (q) {
        var yc = 1.25, w = q[1] - yc;
        return ringSE(X(W(q[0])), s * yc, w, Z(q[2]), Z(q[3]), Z((q[2] + q[3]) / 2), 0.5, 0.45, 16);
      });
      var sh = new Shell();
      sh.loft(rings, null, "skin", "skin");
      sh.emit();
    }
  }

  /* ======================================================= airfoil lofts ==
     A section ring: the upper surface from the leading edge to the trailing
     edge and back under, NACA 4-digit thickness, a little camber. frame "w":
     across the span at y = a, the chord plane at height o; frame "f": up a fin
     at height a, centred on y = o. s is the leading edge's X. */
  var FK = 10;
  function foilRing(s, c, t, a, o, frame, cam) {
    var up = [], lo = [], j, u, th, cm, ring = [];
    for (j = 0; j <= FK; j++) {
      u = (1 - Math.cos(Math.PI * j / FK)) / 2;
      th = t * c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
      cm = (cam || 0) * 4 * u * (1 - u) * c;
      if (frame === "w") {
        up.push([s - u * c, a, o + cm + th]);
        lo.push([s - u * c, a, o + cm - th]);
      } else {
        up.push([s - u * c, o + th, a]);
        lo.push([s - u * c, o - th, a]);
      }
    }
    for (j = 0; j <= FK; j++) ring.push(up[j]);
    for (j = FK - 1; j >= 1; j--) ring.push(lo[j]);
    return ring;
  }
  function foilLoft(rings, cat, capA, capB) {
    var sh = new Shell();
    sh.loft(rings, function () { return cat; }, capA ? cat : null, capB ? cat : null);
    sh.emit();
  }

  /* ============================================================== wing ==
     High on the crown, straight: the leading edge at 11.2 m at the root and
     11.8 m at the tip, a constant 4.95 m chord to the centre-section joint
     5.63 m out, then the trailing edge running forward to a 2.58 m tip at
     20.2 m (D1 plan; 165 m2 against the published 162.1). 18 per cent thick
     at the root, 12 at the tip; level across the centre section and 2.5 deg
     of dihedral outboard (D2). The last 0.75 m of each tip is the team's. */
  function wLE(y) { return W(11.2 + 0.03 * Math.abs(y)); }
  function wTE(y) { var a = Math.abs(y); return W(a <= 5.63 ? 16.15 : 16.15 - (a - 5.63) * 0.1215); }
  function wH(y) { var a = Math.abs(y); return 4.30 + (a > 4.0 ? (a - 4.0) * 0.0437 : 0); }
  function wTC(y) { return 0.18 - 0.06 * Math.min(1, Math.abs(y) / 20.2); }
  var WCAM = 0.012, WTEAM = 19.6, WTIP = 20.2;
  function wingRing(y, k) {
    var le = wLE(y), te = wTE(y), c = te - le;
    if (k) { le += c * (1 - k) * 0.7; c *= k; }          /* the rounded tip */
    return foilRing(X(le), c, wTC(y) * (k ? 0.8 : 1), y, Z(wH(y)), "w", WCAM);
  }
  /* the wing's upper (or lower) surface height at span y and station d */
  function wingSurf(y, d, upper) {
    var le = wLE(y), c = wTE(y) - le, u = clamp((d - le) / c, 0, 1), t = wTC(y);
    var th = t * c * (1.4845 * Math.sqrt(u) - 0.63 * u - 1.758 * u * u + 1.4215 * u * u * u - 0.518 * u * u * u * u);
    return wH(y) + WCAM * 4 * u * (1 - u) * c + (upper ? th : -th);
  }
  function addWing() {
    var ys = [-WTEAM, -16.0, -13.0, -10.1, -7.6, -5.63, -5.05, -4.0, -2.2, 0, 2.2, 4.0, 5.05, 5.63, 7.6, 10.1, 13.0, 16.0, WTEAM];
    foilLoft(ys.map(function (y) { return wingRing(y); }), "skin", false, false);
    for (var s = -1; s <= 1; s += 2) {
      foilLoft([wingRing(s * WTEAM), wingRing(s * 20.0), wingRing(s * WTIP, 0.72)], "team", true, true);
    }
  }

  /* ============================================================== tail ==
     The fin: leading edge 28 deg back from 22.6 m (its root behind the
     fillet) to 26.1 m at the tip, trailing edge from 29.15 m at the root to
     27.95 m at the tip, 12 per cent thick at the root (D1 side view, its
     plan shows the root 0.66 m through). The dorsal fillet rises from the
     crown at 17.6 m. The top 0.45 m of the fin is the team's. The tailplane:
     16 m across (D2), its leading edge from 24.0 m at the root to 25.9 m at
     the tip, trailing edge 28.35 to 27.5 m, 4.62 m up on the tail cone. */
  function finLE(h) { return T(22.57 + (h - 4.9) * 0.535); }
  function finTE(h) { return T(29.15 - (h - 4.9) * 0.18); }
  function finRing(h, k) {
    var le = finLE(h), te = finTE(h), c = te - le;
    if (k) { le += c * (1 - k) * 0.5; c *= k; }
    return foilRing(X(le), c, 0.12 - 0.03 * clamp((h - 4.6) / 7, 0, 1), Z(h), 0, "f", 0);
  }
  function tpLE(y) { return T(24.0 + Math.max(0, Math.abs(y) - 1.5) * 0.30); }
  function tpTE(y) { return T(28.35 - Math.max(0, Math.abs(y) - 1.5) * 0.134); }
  function tpRing(y, k) {
    var le = tpLE(y), c = tpTE(y) - le;
    if (k) { le += c * (1 - k) * 0.6; c *= k; }
    return foilRing(X(le), c, 0.12 - 0.03 * Math.abs(y) / 8.02, y, Z(4.62), "w", 0);
  }
  function addTail(v) {
    var H = v.fin, hs = [4.6, 6.0, 8.0, 10.0, H - 0.45];
    foilLoft(hs.map(function (h) { return finRing(h); }), "skin", true, false);
    foilLoft([finRing(H - 0.45), finRing(H - 0.12), finRing(H, 0.9)], "team", false, true);
    /* the dorsal fillet: thin, its leading edge rising 0.19 m per metre */
    var fr = [4.6, 4.95, 5.3, 5.62].map(function (h) {
      var le = T(17.6 + Math.max(0, h - 4.7) / 0.192), te = T(29.0), c = te - le;
      return foilRing(X(le), c, 0.50 / c, Z(h), 0, "f", 0);
    });
    foilLoft(fr, "skin", true, true);
    var ys = [-8.02, -7.6, -6.0, -4.0, -1.5, 0, 1.5, 4.0, 6.0, 7.6, 8.02];
    foilLoft(ys.map(function (y) { return tpRing(y, Math.abs(y) > 8 ? 0.7 : 0); }), "skin", true, true);
  }

  /* =========================================================== engines ==
     Four nacelles 5.05 and 10.1 m out, the prop plane 8.9 m aft of the nose
     (D1), the hubs 0.39 m under the chord line (3.96 and 4.18 m up, D1 front
     view). Rows: distance aft of the prop plane, half-width, top and bottom
     about the hub. Deep and slab-sided, the oil-cooler chin under the
     spinner, the lower nacelle running back under the wing into its lower
     skin at 14.7 m (D1 side, P4). The AE2100 of the J is a little slimmer
     with a longer, sharper spinner (D1, P8). */
  var NACP = {
    t56: [[0.02, 0.38, 0.36, -0.58], [0.22, 0.49, 0.48, -0.74], [0.60, 0.55, 0.58, -0.84], [1.30, 0.56, 0.64, -0.86],
          [2.10, 0.56, 0.68, -0.84], [3.00, 0.53, 0.68, -0.70], [4.00, 0.47, 0.64, -0.48], [5.00, 0.37, 0.56, -0.20],
          [5.80, 0.16, 0.45, 0.14]],
    ae:  [[0.02, 0.36, 0.35, -0.52], [0.24, 0.47, 0.46, -0.68], [0.65, 0.53, 0.56, -0.78], [1.35, 0.54, 0.62, -0.80],
          [2.10, 0.54, 0.66, -0.78], [3.00, 0.51, 0.66, -0.66], [4.00, 0.45, 0.62, -0.46], [5.00, 0.35, 0.55, -0.19],
          [5.80, 0.15, 0.45, 0.14]]
  };
  var SPIN = { t56: [[0, 0.03], [0.12, 0.16], [0.28, 0.25], [0.45, 0.31], [0.56, 0.33]],
               ae:  [[0, 0.02], [0.18, 0.12], [0.40, 0.21], [0.62, 0.28], [0.78, 0.32]] };
  var ENG = [5.05, 10.1];
  function hubH(y) { return wH(y) - 0.39; }
  function pod(x0, yc, zc, prof, n, capA, capB, cat) {
    var rings = prof.map(function (q) {
      var r = Math.max(q[1], 0.005), out = [], j;
      for (j = 0; j < n; j++) {
        var a = j / n * Math.PI * 2;
        out.push([x0 - q[0], yc + r * Math.cos(a), zc + r * Math.sin(a)]);
      }
      return out;
    });
    var sh = new Shell();
    sh.loft(rings, function () { return cat; }, capA ? cat : null, capB ? cat : null);
    sh.emit();
  }
  /* one blade: six stations along it, a twisted strip; a = its angle round
     the shaft from straight up. broad: the A's Aeroproducts paddles; paddle:
     the 54H60's square tips; scimitar: the R391's swept blades. */
  var BLADES = {
    broad:    { rr: [0.30, 0.6, 1.0, 1.5, 1.95, 1.0], ch: [0.30, 0.42, 0.46, 0.45, 0.38, 0.22], sw: 0 },
    paddle:   { rr: [0.30, 0.6, 1.0, 1.45, 1.85, 1.0], ch: [0.26, 0.36, 0.38, 0.37, 0.33, 0.24], sw: 0 },
    scimitar: { rr: [0.30, 0.6, 1.0, 1.45, 1.85, 1.0], ch: [0.24, 0.30, 0.31, 0.27, 0.19, 0.08], sw: 0.34 }
  };
  function addBlade(v, x, yc, zc, a) {
    var B = BLADES[v.blade], pos = [], k, rp = v.rp;
    var PT = [52, 42, 33, 26, 21, 18];
    var er = [Math.sin(a), Math.cos(a)], et = [Math.cos(a), -Math.sin(a)];
    for (k = 0; k < 6; k++) {
      var r = k === 5 ? rp : B.rr[k] * rp / 2.06, f = r / rp, hc = B.ch[k] / 2, pr = PT[k] * D2R;
      var sw = B.sw * f * f * f, rake = -0.10 * B.sw * f * f;
      var by = yc + er[0] * r, bz = zc + er[1] * r;
      pos.push([x + rake + hc * Math.sin(pr), by + et[0] * (sw + hc * Math.cos(pr)), bz + et[1] * (sw + hc * Math.cos(pr))]);
      pos.push([x + rake - hc * Math.sin(pr), by + et[0] * (sw - hc * Math.cos(pr)), bz + et[1] * (sw - hc * Math.cos(pr))]);
    }
    var grid = [];
    for (k = 0; k < 6; k++) grid.push([pos[2 * k], pos[2 * k + 1]]);
    var sh = new Shell();
    sh.sheet(grid, "blade", [x + 1, yc, zc]);
    sh.emit();
  }
  function addEngines(v) {
    var prof = NACP[v.nac], dP = W(8.9), xP = X(dP);
    ENG.forEach(function (Y, ei) {
      for (var s = -1; s <= 1; s += 2) {
        var yc = s * Y, hh = hubH(Y), zh = Z(hh), k;
        var rings = prof.map(function (q) {
          var zt = zh + q[2], zb = zh + q[3];
          return ringSE(X(dP + q[0]), yc, q[1], zt, zb, clamp(zh - 0.06, zb + 0.03, zt - 0.03), 0.82, 0.70, 16);
        });
        var sh = new Shell();
        /* the front ring is the intake: the spinner covers its middle and the
           dark chin shows below it */
        sh.loft(rings, null, "ink", "skin");
        sh.emit();
        pod(xP + (v.nac === "ae" ? 0.78 : 0.56) - 0.02, yc, zh, SPIN[v.nac], 12, false, true, "metal");
        /* static blades, the lowest a little outboard of straight down, the
           inboard props turned further round */
        var dl = (v.prop === 6 ? 10 : 15) + (ei === 0 ? 20 : 0), a0 = (180 - s * dl) * D2R;
        for (k = 0; k < v.prop; k++) addBlade(v, xP + 0.01, yc, zh, a0 + k * Math.PI * 2 / v.prop);
        var dg = new V.CircleGeometry(v.rp, 28);
        dg.rotateY(Math.PI / 2); dg.translate(xP - 0.03, yc, zh);
        put("blur", dg);
        /* the exhaust on the inboard side of the nacelle over the wing */
        var ex = new V.CylinderGeometry(0.10, 0.12, 0.50, 8);
        ex.rotateZ(Math.PI / 2);
        ex.translate(X(W(11.2)), yc - s * 0.50, Z(hh + 0.40));
        put("metal", ex);
        put("ink", egg(0.02, 0.085, 0.085, X(W(11.2)) - 0.26, yc - s * 0.50, Z(hh + 0.40), 8, 4));
      }
    });
  }

  /* ============================================================== tanks ==
     The 1,360 US gal underwing tanks between the engines, 7.6 m out, 1.14 m
     through, from 9.8 m to 17.7 m - their tails stand behind the trailing
     edge (D1 plan and front views) - on a short pylon (P4). Not on the A
     rows. */
  var TANK = [[0, 0.02], [0.30, 0.25], [0.80, 0.42], [1.50, 0.53], [2.40, 0.57], [4.50, 0.57], [5.70, 0.50],
              [6.70, 0.33], [7.40, 0.15], [7.90, 0.02]];
  function addTanks(v) {
    if (v.tanks === false) return;
    for (var s = -1; s <= 1; s += 2) {
      var Y = 7.6, hc = 2.94;
      pod(X(W(9.8)), s * Y, Z(hc), TANK, 14, true, true, "skin");
      var top = hc + 0.50, d0 = W(11.4), d1 = W(15.6);
      var ring = [];
      [[d0, top], [d1, top], [d1 - 0.5, wingSurf(Y, d1 - 0.5, false) + 0.05], [d0 + 0.5, wingSurf(Y, d0 + 0.5, false) + 0.05]].forEach(function (p) {
        ring.push([X(p[0]), s * Y, Z(p[1])]);
      });
      var a = ring.map(function (p) { return [p[0], p[1] + 0.07, p[2]]; }), b = ring.map(function (p) { return [p[0], p[1] - 0.07, p[2]]; });
      var sh = new Shell();
      sh.loft([a, b], null, "skin", "skin");
      sh.emit();
    }
  }

  /* ============================================================== guns ==
     Out of the LEFT side only: the renderer banks the AC-130 left and fires
     out of +Y. [kind, d, h, barrel out of the hull, radius, muzzle radius];
     depressed 14 deg, a dark port behind each. The A: the 1967 Gunship II
     fit, four miniguns and four Vulcans ahead of the gear (kept from the
     old model, no photograph consulted shows them). The H: two Vulcans
     forward, the Bofors over the aft end of the sponson and the 105 mm in
     the aft paratroop-door station (P11, the U's photograph: the H and U
     share the aft guns). The U: the 25 mm where the Vulcans were. The J:
     the 30 mm there. */
  var GUNS = {
    A: [["m7", 4.6, 2.5, 0.7, 0.035, 0.05], ["m7", 5.1, 2.5, 0.7, 0.035, 0.05],
        ["m7", 5.6, 2.5, 0.7, 0.035, 0.05], ["m7", 6.1, 2.5, 0.7, 0.035, 0.05],
        ["v20", 6.8, 2.2, 1.0, 0.065, 0.105], ["v20", 7.4, 2.2, 1.0, 0.065, 0.105],
        ["v20", 8.0, 2.2, 1.0, 0.065, 0.105], ["v20", 8.6, 2.2, 1.0, 0.065, 0.105]],
    H: [["v20", 6.4, 2.1, 1.0, 0.065, 0.105], ["v20", 7.3, 2.1, 1.0, 0.065, 0.105],
        ["b40", 15.7, 2.9, 1.4, 0.07, 0.09], ["h105", 17.5, 2.15, 1.8, 0.115, 0.17]],
    U: [["g25", 7.1, 2.1, 0.95, 0.085, 0.11], ["b40", 15.7, 2.9, 1.4, 0.07, 0.09], ["h105", 17.5, 2.15, 1.8, 0.115, 0.17]],
    J: [["g30", 7.1, 2.1, 1.3, 0.06, 0.075], ["h105", 17.5, 2.15, 1.8, 0.115, 0.17]]
  };
  var _m4 = null, _q = null, _v = null, _u = null;
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function egg(rx, ry, rz, x, y, z, ws, hs) {
    var g = new V.SphereGeometry(1, ws || 12, hs || 8);
    g.scale(rx, ry, rz);
    g.translate(x, y, z);
    return g;
  }
  function addGuns(v) {
    if (v.guns) {
      var dy = Math.cos(14 * D2R), dz = -Math.sin(14 * D2R);
      GUNS[v.guns].forEach(function (q) {
        var d = dm(q[1]), yh = hullY(d, q[2]), z = Z(q[2]);
        var a = [X(d), yh - 0.06, z], b = [a[0], a[1] + q[3] * dy, a[2] + q[3] * dz];
        put("metal", rod(a, b, q[4], 8));
        put("metal", rod([a[0], b[1] - 0.3 * dy, b[2] - 0.3 * dz], b, q[5], 8));
        var big = q[0] === "h105" || q[0] === "b40";
        put("ink", boxG(big ? 1.1 : 0.8, 0.04, big ? 0.9 : 0.6, X(d), yh + 0.005, z));
      });
    }
    var bd, bh, by;
    if (v.ball === "fwdA") {
      /* the A's ball under the left side of the flight deck (the AC-130A
         pylon-turn photograph, read for the old model) */
      bd = 7.6; bh = 1.05; by = hullY(dm(bd), bh) + 0.28;
      put("metal", egg(0.44, 0.44, 0.44, X(dm(bd)), by, Z(bh), 12, 8));
      put("ink", egg(0.16, 0.16, 0.16, X(dm(bd) - 0.3), by + 0.28, Z(bh), 8, 6));
    } else if (v.ball === "fwd") {
      /* the sensor ball in its blister on the port side just ahead of the
         sponson (P11 "D", P4) */
      bd = 9.0; bh = 1.25; by = hullY(dm(bd), bh);
      put("skin", egg(0.75, 0.38, 0.55, X(dm(bd) - 0.1), by, Z(bh + 0.15), 12, 8));
      put("metal", egg(0.42, 0.42, 0.42, X(dm(bd)), by + 0.30, Z(bh - 0.05), 12, 8));
      put("ink", egg(0.15, 0.15, 0.15, X(dm(bd) - 0.28), by + 0.52, Z(bh - 0.1), 8, 6));
    } else if (v.ball === "chin") {
      /* the J's ball under the nose, ahead of the nose gear (P8) */
      put("metal", egg(0.38, 0.38, 0.38, X(2.55), 0, Z(0.62), 12, 8));
      put("ink", egg(0.15, 0.15, 0.15, X(2.25), 0, Z(0.58), 8, 6));
    }
    if (v.blis) {
      /* the blisters either side of the lower nose behind the radome (P4,
         P11 "A"); what they hold is not confirmed */
      for (var s = -1; s <= 1; s += 2) {
        var yb = hullY(1.95, 1.55);
        put("skin", egg(0.42, 0.20, 0.24, X(1.95), s * yb, Z(1.55), 10, 6));
      }
    }
    if (v.aftBlis) {
      /* the blister on the port side aft of the guns (P11 "G") */
      var da = dm(21.8), ya = hullY(da, 2.9);
      put("skin", egg(0.50, 0.24, 0.28, X(da), ya, Z(2.9), 10, 6));
    }
  }
  /* the C.1P and C.3P probe: a pipe over the flight deck reaching past the
     radome, its tip a metre ahead of it */
  function addProbe(v) {
    if (!v.probe) return;
    put("metal", rod([X(4.2), 0, Z(4.66)], [X(-v.probe), 0, Z(4.30)], 0.07, 8));
    put("metal", rod([X(-v.probe + 0.3), 0, Z(4.32)], [X(-v.probe), 0, Z(4.30)], 0.12, 8));
    put("metal", rod([X(3.7), 0, Z(4.55)], [X(3.7), 0, Z(4.66)], 0.05, 6));
  }

  /* ============================================================== gear ==
     Named "gear": render3d.js stows it in cruise. The mains in tandem pairs
     inside the sponsons, 2.17 m out (D2's 14 ft 3 in track), at 12.35 and
     13.87 m (D1; D2's 5 ft between axles), 1.24 m tyres; the twin nose wheels
     at 3.45 m on a 0.56 m track (D2). Every tyre ends on the ground. */
  function wheelG(r, w, x, y, z, seg) { var g = new V.CylinderGeometry(r, r, w, seg || 18); g.translate(x, y, z); return g; }
  function addGear() {
    var s, R = 0.62, Wd = 0.46;
    [12.35, 13.87].forEach(function (d) {
      for (s = -1; s <= 1; s += 2) {
        var x = X(W(d)), y = s * 2.17;
        G.tyre.push(wheelG(R, Wd, x, y, Z(R), 20));
        G.metal.push(wheelG(0.30, Wd + 0.03, x, y, Z(R), 10));
        G.metal.push(rod([x, y - s * 0.30, Z(R)], [x, y - s * 0.30, Z(1.75)], 0.09, 8));
      }
    });
    var rn = 0.47, xn = X(3.45);
    G.metal.push(rod([xn + 0.05, 0, Z(1.15)], [xn, 0, Z(rn)], 0.08, 8));
    G.metal.push(rod([xn - 0.55, 0, Z(1.0)], [xn, 0, Z(rn + 0.35)], 0.04, 6));
    G.metal.push(rod([xn, -0.30, Z(rn)], [xn, 0.30, Z(rn)], 0.05, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(wheelG(rn, 0.28, xn, s * 0.28, Z(rn), 18));
      G.metal.push(wheelG(0.17, 0.30, xn, s * 0.28, Z(rn), 8));
    }
  }

  /* ============================================================= paint ==
     One sheet per guise, four plan views: from above, from port, from
     starboard, from below, at 20 px a metre along the aeroplane. Every skin
     triangle takes its UVs by projection into the view its normal faces
     (projUV), so seams, doors, windows and insignia land where they are on
     the aeroplane. Cached at module scope: build() runs per key, team and
     era. */
  var TW = 768, TH = 2048, PX = 20, XMIN = -18.4, PY = 18, YMAX = 20.4, TOPH = 734;
  var PZ = 22, ZMAX = 9.6, SIDEH = 276, B_PORT = 736, B_STBD = 1014, B_BOT = 1292;
  function cu(x) { return clamp((x - XMIN) * PX, 1, TW - 1); }
  function rTop(y) { return clamp((YMAX - y) * PY, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PY, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((ZMAX - z) * PZ, 1, SIDEH - 1); }
  var _tex = {};

  function paintSheet(v, P) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), R = rngFor(5101 + v.id.charCodeAt(0) * 7 + v.id.charCodeAt(1) * 13);
    var LINE = "rgba(18,22,24," + P.seam + ")", DARK = "rgba(14,16,18,0.80)";
    var i, k, s, d, y;
    var L = v.len;
    function line(pts, col, lw) {
      g.strokeStyle = col || LINE; g.lineWidth = lw || 1;
      g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
      for (var j = 1; j < pts.length; j++) g.lineTo(pts[j][0], pts[j][1]);
      g.stroke();
    }
    function T_(dd, yy) { return [cu(X(dd)), rTop(yy)]; }
    function B_(dd, yy) { return [cu(X(dd)), rBot(yy)]; }
    function S_(dd, hh, st) { return [cu(X(dd)), rSide(Z(hh), st)]; }
    function blob(cx, cy, rx, ry) {
      var n = 11, j, a, rr;
      g.beginPath();
      for (j = 0; j < n; j++) {
        a = j / n * Math.PI * 2; rr = 0.7 + 0.5 * R();
        if (j === 0) g.moveTo(cx + Math.cos(a) * rx * rr, cy + Math.sin(a) * ry * rr);
        else g.lineTo(cx + Math.cos(a) * rx * rr, cy + Math.sin(a) * ry * rr);
      }
      g.closePath(); g.fill();
    }
    /* insignia in metres on a band whose two scales are sx, sy (px/m):
       the US star-and-bar or the UK roundel, a shade off the skin, as the
       F-35 hero draws them */
    function insignia(u, w, r, sx, sy, uk) {
      g.save(); g.translate(u, w); g.scale(sx, sy);
      function disc(rr, col) { g.fillStyle = col; g.beginPath(); g.arc(0, 0, rr, 0, Math.PI * 2); g.closePath(); g.fill(); }
      if (uk) {
        disc(r, "rgba(70,78,84,0.75)"); disc(r * 0.70, "rgba(140,148,152,0.55)"); disc(r * 0.34, "rgba(70,78,84,0.75)");
      } else {
        disc(r, "rgba(72,80,86,0.70)");
        g.fillStyle = "rgba(72,80,86,0.70)"; g.fillRect(-r * 2.0, -r * 0.32, r * 4.0, r * 0.64);
        g.fillStyle = "rgba(150,158,162,0.55)"; g.beginPath();
        for (var j = 0; j < 10; j++) {
          var a = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? r * 0.38 : r * 0.92;
          if (j === 0) g.moveTo(rr * Math.cos(a), rr * Math.sin(a)); else g.lineTo(rr * Math.cos(a), rr * Math.sin(a));
        }
        g.closePath(); g.fill();
      }
      g.restore();
    }

    /* ---- the coats ---- */
    g.fillStyle = P.top; g.fillRect(0, 0, TW, TOPH + 2);
    g.fillStyle = P.top; g.fillRect(0, B_PORT, TW, 2 * SIDEH + 4);
    g.fillStyle = P.low; g.fillRect(0, B_BOT - 2, TW, TH - B_BOT + 2);
    if (P.wing) {                                      /* bare-metal wings and tailplane under the white crown */
      g.fillStyle = P.wing;
      g.fillRect(0, 0, TW, rTop(2.25)); g.fillRect(0, rTop(-2.25), TW, TOPH - rTop(-2.25) + 2);
    }
    if (P.demarc) {
      g.fillStyle = P.low;
      for (s = 0; s < 2; s++) { var r0 = rSide(Z(P.demarc), s === 1); g.fillRect(0, r0, TW, (s ? B_STBD : B_PORT) + SIDEH - r0); }
    }
    /* camouflage and wear: blobs within each band, above the low coat where
       there is one */
    var bands = [[0, TOPH, 1.0], [B_PORT, SIDEH, 0.45], [B_STBD, SIDEH, 0.45], [B_BOT, TOPH, P.demarc ? 0 : 1.0]];
    for (k = 0; k < P.blobs.length; k++) {
      g.fillStyle = P.blobs[k][0];
      for (var b = 0; b < 4; b++) {
        var nb = Math.round(P.blobs[k][1] * bands[b][2]);
        for (i = 0; i < nb; i++) {
          var rad = (P.blobs[k][2] + (P.blobs[k][3] - P.blobs[k][2]) * R());
          var cy = bands[b][0] + R() * bands[b][1];
          if (P.demarc && (b === 1 || b === 2)) {
            var lim = rSide(Z(P.demarc), b === 2) - rad * PZ * 0.6;
            if (cy > lim) cy = bands[b][0] + R() * (lim - bands[b][0]);
          }
          blob(R() * TW, cy, rad * PX, rad * (b === 0 || b === 3 ? PY : PZ));
        }
      }
    }
    for (i = 0; i < 70; i++) {                         /* a faint weathering */
      g.fillStyle = R() < 0.5 ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)";
      g.beginPath(); g.arc(R() * TW, R() * TH, 6 + R() * 22, 0, Math.PI * 2); g.closePath(); g.fill();
    }

    /* ---- from above ---- */
    for (d = 3.0; d < L - 1.0; d += 1.52) line([T_(d, -1.9), T_(d, 1.9)]);   /* frames over the crown */
    line([T_(dm(5.4), -2.0), T_(dm(5.4), 2.0)], LINE, 1.4);                    /* the flight-deck bulkhead */
    [[dm(3.75), dm(4.45)], [W(10.2), W(10.9)], [dm(17.5), dm(18.2)]].forEach(function (q) {   /* roof hatches */
      line([T_(q[0], -0.42), T_(q[1], -0.42), T_(q[1], 0.42), T_(q[0], 0.42), T_(q[0], -0.42)], LINE, 1.3);
    });
    if (v.rec) {                                       /* the refuelling receptacle */
      g.fillStyle = DARK; var p0 = T_(dm(6.9), 0.28), p1 = T_(dm(6.0), -0.28);
      g.fillRect(p0[0], p0[1], p1[0] - p0[0], p1[1] - p0[1]);
    }
    for (s = -1; s <= 1; s += 2) {
      var wing = function (u, y0, y1, band) {
        var pts = [];
        for (y = y0; y <= y1 + 1e-6; y += 0.5) {
          var dd = wLE(y) + u * (wTE(y) - wLE(y));
          pts.push(band ? B_(dd, s * y) : T_(dd, s * y));
        }
        return pts;
      };
      for (var bnd = 0; bnd < 2; bnd++) {
        line(wing(0.72, 2.2, 13.9, bnd), LINE, 1.3);                 /* flap hinge */
        line(wing(0.70, 14.1, 19.4, bnd), LINE, 1.3);                /* aileron hinge */
        line(wing(0.12, 2.2, 19.6, bnd), LINE, 1.0);                 /* the leading-edge panels */
        line(wing(0.62, 2.2, 19.6, bnd), "rgba(18,22,24,0.08)", 1.0); /* rear spar */
        [5.63, 14.0].forEach(function (yy) {                         /* centre-section joint, flap/aileron break */
          var a = yy === 14.0 ? 0.70 : 0, p = wLE(yy) + a * (wTE(yy) - wLE(yy));
          line(bnd ? [B_(p, s * yy), B_(wTE(yy), s * yy)] : [T_(p, s * yy), T_(wTE(yy), s * yy)], LINE, 1.3);
        });
        for (y = 2.4; y < 13.5; y += 2.6) {                          /* flap segments */
          var p2 = wLE(y) + 0.72 * (wTE(y) - wLE(y));
          line(bnd ? [B_(p2, s * y), B_(wTE(y), s * y)] : [T_(p2, s * y), T_(wTE(y), s * y)], LINE, 1.0);
        }
        /* the tailplane's elevator hinge */
        var ep = [];
        for (y = 1.6; y <= 7.9; y += 0.5) { var de = tpLE(y) + 0.70 * (tpTE(y) - tpLE(y)); ep.push(bnd ? B_(de, s * y) : T_(de, s * y)); }
        line(ep, LINE, 1.2);
      }
      ENG.forEach(function (Y) {                                     /* cowl seams */
        [0.6, 1.5, 2.3].forEach(function (q) { line([T_(W(8.9 + q), s * (Y - 0.5)), T_(W(8.9 + q), s * (Y + 0.5))], LINE, 1.0); });
      });
    }
    /* insignia: US on the port upper wing, UK on both */
    insignia(cu(X(wLE(14.5) + 0.45 * (wTE(14.5) - wLE(14.5)))), rTop(14.5), 0.78, PX, PY, v.uk);
    if (v.uk) insignia(cu(X(wLE(14.5) + 0.45 * (wTE(14.5) - wLE(14.5)))), rTop(-14.5), 0.78, PX, PY, true);

    /* ---- from below ---- */
    for (d = 4.5; d < L - 4.0; d += 1.52) line([B_(d, -1.2), B_(d, 1.2)], "rgba(18,22,24,0.08)", 1);
    var r1 = dm(17.4), r2 = dm(20.75), r3 = dm(25.4);       /* the ramp and the cargo door */
    line([B_(r1, -1.62), B_(r3, -1.55), B_(r3, 1.55), B_(r1, 1.62), B_(r1, -1.62)], "rgba(10,12,14,0.55)", 1.6);
    line([B_(r2, -1.6), B_(r2, 1.6)], "rgba(10,12,14,0.55)", 1.6);
    line([B_(2.85, -0.38), B_(4.25, -0.38), B_(4.25, 0.38), B_(2.85, 0.38), B_(2.85, -0.38)], LINE, 1.3);  /* nose-gear doors */
    insignia(cu(X(wLE(14.5) + 0.45 * (wTE(14.5) - wLE(14.5)))), rBot(-14.5), 0.78, PX, PY, v.uk);
    if (v.uk) insignia(cu(X(wLE(14.5) + 0.45 * (wTE(14.5) - wLE(14.5)))), rBot(14.5), 0.78, PX, PY, true);

    /* ---- the sides ---- */
    for (k = 0; k < 2; k++) {
      var sg = k === 1;
      for (d = 3.0; d < L - 2.0; d += 1.52) line([S_(d, 0.9, sg), S_(d, 4.6, sg)], "rgba(18,22,24,0.09)", 1);
      line([S_(dm(5.4), 0.8, sg), S_(dm(5.4), 4.65, sg)], LINE, 1.3);
      line([S_(4.0, 1.95, sg), S_(dm(17.2), 1.95, sg)], "rgba(18,22,24,0.10)", 1);   /* the floor line */
      /* the ramp's edge along the side, parallel to the upswept belly */
      var rp = [];
      for (d = 17.4; d <= 25.4; d += 0.4) rp.push(S_(dm(d), sec(dm(d))[2] + 0.30, sg));
      line(rp, "rgba(10,12,14,0.40)", 1.5);
      line([S_(dm(17.4), 0.82, sg), S_(dm(17.4), 1.15, sg)], "rgba(10,12,14,0.40)", 1.5);
      /* the paratroop door, its window, and the windows (round, dark) */
      var pd0 = dm(17.15), pd1 = dm(17.95);
      line([S_(pd0, 1.0, sg), S_(pd1, 1.0, sg), S_(pd1, 2.85, sg), S_(pd0, 2.85, sg), S_(pd0, 1.0, sg)], "rgba(10,12,14,0.50)", 1.5);
      [[dm(17.55), 2.45], [dm(5.95), 2.0], [dm(7.05), 2.0], [dm(15.0), 2.75], [dm(15.95), 2.75]].forEach(function (q) {
        var c = S_(q[0], q[1], sg);
        g.fillStyle = DARK; g.save(); g.translate(c[0], c[1]); g.scale(PX, PZ);
        g.beginPath(); g.arc(0, 0, 0.15, 0, Math.PI * 2); g.closePath(); g.fill(); g.restore();
      });
      if (!sg) {                                       /* the crew door, port side (D1) */
        line([S_(dm(8.45), 0.95, false), S_(dm(9.3), 0.95, false), S_(dm(9.3), 2.95, false),
              S_(dm(8.45), 2.95, false), S_(dm(8.45), 0.95, false)], "rgba(10,12,14,0.50)", 1.5);
      }
      /* the fin: the rudder hinge and the trim-tab line */
      line([S_(T(27.35), 5.2, sg), S_(T(27.15), v.fin - 0.5, sg)], LINE, 1.3);
      line([S_(T(28.4), 5.6, sg), S_(T(28.2), 7.6, sg)], LINE, 1.0);
      /* the nacelle cowls */
      [0.6, 1.5, 2.3].forEach(function (q) { line([S_(W(8.9 + q), 3.25, sg), S_(W(8.9 + q), 4.62, sg)], LINE, 1.0); });
      if (v.uk) insignia(cu(X(dm(19.6))), rSide(Z(3.25), sg), 0.55, PX, PZ, true);
    }

    var tex = new V.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    if (V.sRGBEncoding !== undefined) tex.encoding = V.sRGBEncoding;   /* r148 */
    return tex;
  }
  function sheet(v, P) {
    if (_tex[v.id] !== undefined) return _tex[v.id];
    try { _tex[v.id] = paintSheet(v, P); } catch (e) { _tex[v.id] = false; }
    return _tex[v.id];
  }

  /* projected UVs: each triangle into the band its normal faces. Faces that
     look fore or aft would collapse to a line under an x projection, so they
     go to the plan view from above (or below), laid out along x plus a share
     of the span: a leading edge takes the wing's coat, not the fuselage
     side's. */
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var endOn = Math.abs(nx) > 0.8;
      var band = endOn ? (nz < -0.3 ? 3 : 0) : (nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2));
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        U = cu(endOn ? x + 0.35 * yy : x);
        if (band === 0) Rr = rTop(yy);
        else if (band === 3) Rr = rBot(yy);
        else Rr = rSide(z, band === 2);
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ========================================================== materials ==
     SKIN: the painted sheet. DOME: the radome, its own colour by guise.
     TEAM: exactly C.team (eraPaint leaves it alone; the emissive keeps it
     from greying out under ACES). METAL: guns, spinners, gear legs. INK: flat
     black of intakes, exhausts and gun ports. BLADE. BLUR: the propeller
     disc, see-through and depthWrite off, so the parking code does not
     stand the aeroplane on it. GLASS. TYRE. */
  function makeMats(C, v) {
    var P = PAINT[v.paint], tex = sheet(v, P), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: P.gloss ? 0.62 : 0.84,
                                          metalness: P.gloss ? 0.22 : 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(P.top);
    m.dome = new V.MeshStandardMaterial({ color: P.dome, roughness: 0.55, metalness: 0.05, side: V.DoubleSide });
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10, side: V.DoubleSide });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.blade = new V.MeshStandardMaterial({ color: 0x17191c, roughness: 0.62, metalness: 0.30, side: V.DoubleSide });
    m.blur = new V.MeshStandardMaterial({ color: 0xd2d8dc, roughness: 0.5, metalness: 0.0,
                                          transparent: true, opacity: 0.11, depthWrite: false, side: V.DoubleSide });
    m.glass = new V.MeshStandardMaterial({ color: 0x24333b, roughness: 0.12, metalness: 0.45,
                                           transparent: true, opacity: 0.86, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    return m;
  }

  /* ============================================================= build == */
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
  function emit(parent, lists, mats, order) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      var geo = merge(lists[key]);
      if (key === "skin") projUV(geo);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }

  function build(THREE, M, C, which) {
    V = THREE;
    var v = VARIANTS[which] || VARIANTS.H80;
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    S1 = v.s1; S2 = v.s2;
    /* the stretched bodies hang on the short body's wing station: the plugs
       grow the nose forward and the tail aft, and the wing, the engines and
       the gear stand where the short one's do. Centred on its own length, a
       parked J-30 or C.3 had its outboard props 0.3 m behind the front end
       of an airbase revetment's side wall and its blades 0.3-0.5 m into it
       (tools/jsc/parked3d_check.js B). */
    NOSE = (v.len - S1 - S2) / 2 + S1;
    FT = stretchTable();
    K = {}; G = { metal: [], tyre: [] };
    addFuselage();
    addGlass();
    addSponsons();
    addWing();
    addTail(v);
    addEngines(v);
    addTanks(v);
    addGuns(v);
    addProbe(v);
    addGear();
    var mats = makeMats(C, v);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "dome", "team", "metal", "ink", "blade", "glass", "blur"]);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["metal", "tyre"]);
    root.add(gear);
    return root;
  }

  return { build: build, variants: VARIANTS, lenOf: lenOf };
})();

/* len: the measured X extent of each guise (nose to tail, probe included) */
UNIT_MODELS["nato_e50_airlift"] = {
  len: HeroC130.lenOf("A50"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "A50"); }
};
UNIT_MODELS["nato_e80_airlift"] = {
  len: HeroC130.lenOf("H80"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "H80"); }
};
UNIT_MODELS["airlift_n"] = {
  len: HeroC130.lenOf("J20"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "J20"); }
};
UNIT_MODELS["gbr_e60_airlift"] = {
  len: HeroC130.lenOf("K60"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "K60"); }
};
UNIT_MODELS["gbr_e80_airlift"] = {
  len: HeroC130.lenOf("K80"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "K80"); }
};
UNIT_MODELS["gbr_e90_airlift"] = {
  len: HeroC130.lenOf("K90"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "K90"); }
};
UNIT_MODELS["nato_e60_gunshipair"] = {
  len: HeroC130.lenOf("G60"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "G60"); }
};
UNIT_MODELS["nato_e80_gunshipair"] = {
  len: HeroC130.lenOf("G80"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "G80"); }
};
UNIT_MODELS["nato_e00_gunshipair"] = {
  len: HeroC130.lenOf("G00"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "G00"); }
};
UNIT_MODELS["gunshipair_n"] = {
  len: HeroC130.lenOf("G20"),
  build: function (THREE, M, C) { return HeroC130.build(THREE, M, C, "G20"); }
};
