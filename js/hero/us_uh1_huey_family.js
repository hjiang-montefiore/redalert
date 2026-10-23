/* ======= us_uh1_huey_family.js - HERO model: the Bell UH-1 "Huey", D, H and N =======
   Six defs, one airframe in three guises. They share the stretched Model 205
   cabin with its big sliding doors, the glazed nose with its chin windows,
   the long tail boom with the synchronised elevator, the swept fin, the
   skid gear and the Bell two-blade teetering head with its stabiliser bar.

     nato_e60_transport  UH-1D, US Army, 1963 (the row's "Bell UH-1D
                         Iroquois", in service 1963): one Lycoming T53, the
                         pitot tubes on the nose, the tail rotor on the port
                         side of the fin, lusterless olive drab.
     deu_e60_transport   UH-1D, Dornier-built for the Heer and the Luftwaffe
                         (1967-2021): the same machine in German olive.
     roc_e60_transport   UH-1H, ROC Army (AIDC licence-built from 1970): the
     roc_e80_transport   UH-1D with the T53-L-13 and the pitot moved from the
     roc_e90_transport   nose to the cockpit roof, in the ROC Army's dark olive
                         as photographed at Songshan in 2011.
     nato_e60_uh1n       UH-1N Twin Huey, USMC, 1971: the PT6T Twin-Pac under
                         a taller, wider cowling with a scoop intake each side
                         and two exhaust stacks; the wider-chord blades, the
                         mast tilted 5 degrees forward, the longer nose, the
                         taller fin with the tail rotor 3.75 m up on its
                         STARBOARD side; the Marines' green.

   REFERENCES, and what each gave
     Commons "Bell UH-1H Iroquois 3-view line drawing.png" (the Army
       operator's manual figure): fuselage 41 ft 5.0 in, 57 ft 0.67 in with
       the rotors turning, the mast 11 ft 8.65 in behind the nose, main rotor
       48 ft 3.2 in with a 1 ft 9.0 in chord, tail rotor 8 ft 6.0 in, its hub
       10 ft 2.5 in up, the head 13 ft 7.40 in, skid track 8 ft 6.6 in, the
       elevator 9 ft 4.3 in by 2 ft 6.5 in, the stabiliser bar 9 ft 0.5 in.
       The station table below was traced off its side and top views on a
       65.4 px/m grid (the 41 ft 5 in dimension): every outline height, the
       cabin and boom half-widths, the doors, windows, skids, crosstubes,
       fin, elevator, the roof pitot and the roof blade antenna.
     Commons "Bell UH-1N Iroquois 3-view line drawing.png": the UH-1N's
       mast 12 ft 9.05 in behind its nose, "5 deg MAST TILT", 48 ft rotor,
       23.8 in blade chord, the 11.5 in tail rotor chord, skid track 8 ft
       8.4 in, the Twin-Pac cowling 2.84 m tall against the H's 2.58 m, and
       the taller fin, the tail rotor hub drawn 3.78 m up (the H's 3.11 m).
     Wikipedia "Bell UH-1 Iroquois": "the pitot tube was relocated from the
       nose to the roof of the cockpit" on the UH-1H; Dornier built 352
       UH-1Ds from 1967; width over the skids 9 ft 6.5 in.
     Wikipedia "Bell UH-1N Twin Huey": the PT6T-3/T400 Twin-Pac, the 48 ft
       rotor, 57 ft 8 in overall, the photographs listed in it.
     Commons photographs: ROC Army UH-1H 395 at Songshan, 2011 (side and
       rear quarter: the tail rotor on the PORT side, the paint, the cowl
       grilles, the exhaust, the roof antenna and pitot, the green overhead
       windows, the skid gear); Heer UH-1D 72+09, 1986, and the BGS UH-1D at
       the museum (the nose pitot tubes, the port tail rotor, the roof blade
       antenna); "UH-1D helicopters in Vietnam 1966" (olive drab, the port
       tail rotor seen from the right); USMC UH-1N 1974 (AN1273635) and 1982
       (NAS Whiting Field) for the green, the Twin-Pac cowling and its port
       intake, the nose-to-mast proportion (0.44 of mast-to-tail-rotor, as
       the N drawing has it, against 0.41 for the H); USMC UH-1N 2008
       approaching Peleliu for the Twin-Pac's starboard scoop and the tail
       rotor on the STARBOARD side.

   RECOGNITION LIST (each built where it says)
     1. The long tail boom, deep at the root and tapering, its belly line
        running straight up from the cabin to the fin (drawing side view):
        FUS stations -2.6 to -8.4.
     2. The synchronised elevator, a plain rectangle 2.85 m across halfway
        down the boom (drawing top view): "elevator" below.
     3. The two-blade teetering head with the stabiliser bar across the
        blades, its weighted ends and the pitch links (drawing front view,
        Songshan side view): the rotor node.
     4. The two-blade tail rotor at the top of the swept fin, port on the D
        and H, starboard and 0.64 m higher on the N's taller fin
        (photographs above; the N drawing).
     5. The cabin with the big sliding doors, each with two windows, the
        rails running aft (drawing; Songshan): glass and the painted skin.
     6. The glazed nose: the two-piece windscreen, the green overhead
        windows and the chin windows low on the nose (drawing; photographs).
     7. The skids: two tubes with up-turned toes on bowed crosstubes under
        the cockpit and the cabin's after end (drawing): the "skids" node.
     8. The cowling and exhaust: the T53's narrow cowl with its single
        upturned tailpipe (D, H); the Twin-Pac's wide tall cowl with its two
        scoops and two stacks (N).
     9. The antennas: the swept blade on the cockpit roof (drawing,
        Songshan, 72+09), the towel-bar on the boom, the belly blades; the
        pitots (nose on the D, roof on the H and N).
    10. The paint by operator and period (see SCHEMES).

   CORRECTIONS to the brief this was built from
     - The skids are NOT named "gear". They are fixed and stay down in
       flight, and render3d.js hides a "gear" node above 18 m, so a Huey
       would fly without them. They hang in a group named "skids" (the
       lowest opaque part), as hero/de_bo105.js, fr_gazelle.js, eu_tiger.js
       and h60_hawk_family.js leave their fixed undercarriage unnamed.
     - The old us_bell_huey.js drew the D with the tail rotor on the port
       side; right for the D and H, but the N's is on the starboard side.

   HEIGHTS. The drawing's own heights do not quite agree with the figures
   printed on it: the fuselage traced isotropically gives the belly 0.45 m
   (printed 1 ft 3.48 in) and the roof 2.38 m (the N drawing, separately,
   2.36 m), but the tail is drawn 0.13 m high (tail rotor hub 3.25 m against
   the printed 3.112 m, the tail skid 1.59 against 4 ft 9.25 in) and the head
   0.2 m below the printed 13 ft 7.4 in. The fuselage is used as traced, the
   tail lowered by a ramp to the printed figures (TAILDROP), and the head set
   between the drawn and the printed (HUB_H), where the Songshan side view
   puts it.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres, x from the mast
   (the D/H's; the N's mast is the same station, its nose 0.315 m longer).
   The origin is 1.50 m above the skids, about the cabin's centre of mass.

   WHAT SETS THE SCALE. The renderer scales by the Box3 X extent: the faint
   rotor disc 7.36 m ahead of the mast and the tail rotor blade built
   straight aft, its tip 10.02 m behind it: 17.38 m, the printed 57 ft 0.67
   in with the rotors turning. The two main blades lie at 45 degrees.

   NAMED NODES
     rotor      the head in the asw_helo_fit.js mount (+PI/2 about X) inside
                a tilt group (0 on the D/H, 5 degrees forward on the N, as
                its drawing has it): it turns anti-clockwise from above, as
                a Bell does. A -PI/2 group inside puts the head back into
                model axes.
     rotordisc  inside the rotor, its own transparent material.
     tailrotor  in a mount turned -PI/2 about X (D, H: local +Z to port) or
                +PI/2 (N: to starboard); one blade points straight aft. Its
                sense is not confirmed by any reference used here: it turns
                top blade forward on the D/H and top blade aft on the N.
     skids      the skid gear (see above).
   Nothing is named "turret" or "gear".

   Materials: SKIN (one CanvasTexture per variant: paint, panel lines,
   doors, rails, grilles, soot, the US low-visibility star where it
   applies), METAL, DARK, BLADE, GLASS (per vertex: clear, the green
   overhead tint, the red beacon lenses), TEAM (exactly C.team), DISC, and
   the tail rotor's blades and hub painted per vertex. ASCII only.        */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroUH1 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  var GROUND  = -1.50;                     /* the skids' contact plane      */
  function Z(h) { return GROUND + h; }
  var X_NOSE  =  3.573;                    /* 11 ft 8.65 in ahead of the mast */
  var NOSE_N  =  0.315;                    /* the N's nose, 12 ft 9.05 in     */
  /* the tail lowered to the printed figures (see HEIGHTS above) */
  function TAILDROP(x) { return x < -2.5 ? 0.13 * Math.min(1, (-x - 2.5) / 6.2) : 0; }
  /* The blade plane and the bar: between the head the drawing draws (the
     blades 3.64 m up at the mast) and the printed 13 ft 7.4 in to its top;
     the Songshan side view puts the hub 0.6 of the cabin's depth above the
     cowl, which this matches. */
  var HUB_H   =  3.80;                     /* blade plane at the hub          */
  var BAR_H   =  3.98;                     /* the stabiliser bar              */
  var TR_X0 = -8.72, TR_H0 = 3.112, TR_R = 1.295, TR_OUT = 0.26;
  var EL_LE = -5.60, EL_TE = -6.375, EL_Y = 1.426, EL_H = 1.55;   /* elevator */
  var SKID_Y_H = 1.303, SKID_Y_N = 1.326, SKID_R = 0.046;

  /* --------------------------------------------------------- variants */
  var VARIANTS = {
    uh1d:  { key: "uh1d",  scheme: "army", twin: false, nosePitot: true,  star: true,
             chord: 0.533, R: 7.355, tilt: 0, trSide: 1, trChord: 0.214, trTip: null },
    uh1dg: { key: "uh1dg", scheme: "heer", twin: false, nosePitot: true,  star: false,
             chord: 0.533, R: 7.355, tilt: 0, trSide: 1, trChord: 0.214, trTip: null },
    uh1h:  { key: "uh1h",  scheme: "roca", twin: false, nosePitot: false, star: false,
             chord: 0.533, R: 7.355, tilt: 0, trSide: 1, trChord: 0.214, trTip: 0xc9a227 },
    uh1n:  { key: "uh1n",  scheme: "usmc", twin: true,  nosePitot: false, star: true,
             chord: 0.605, R: 7.315, tilt: 5 * D2R, trSide: -1, trChord: 0.292, trTip: 0xc9a227,
             /* the taller fin: the hub 3.78 m up in the N drawing, about 3.7 m
                (0.9 m over the Twin-Pac cowl) in the 1982 photograph */
             trX: -8.80, trH: 3.75 }
  };

  /* ------------------------------------------------------ paint schemes
     Authored darker than the paint chips, because the ACES pass lifts mid
     tones (h60_hawk_family.js "army" sits at #40463a for the same green).
       army  US Army lusterless olive drab (FS 34087), browner than the
             UH-60's aircraft green; the 1966 photograph.
       heer  the Bundeswehr's olive (RAL 6014 Gelboliv) the Dornier UH-1Ds
             were delivered in. From the 1980s they wore the three-colour
             camouflage 72+09 shows in 1986; one key cannot be told its era,
             so the delivery olive is drawn.
       roca  the ROC Army's dark olive, sampled off UH-1H 395 at Songshan in
             2011 (the boom in daylight 55,53,47; the door 50,51,46).
       usmc  the Marines' green of 1971 into the 1990s (1974: 113,123,103 in
             full sun, gloss; 1982: 98,95,66). The light grey of the 2000s
             (Peleliu, 2008) is not drawn: the row runs e60-e00 and the
             build is not told the era. */
  var SCHEMES = {
    army: { key: "army", base: "#46472f", light: "#505238", dark: "#3b3c27", belly: "#424330", seed: 1963 },
    heer: { key: "heer", base: "#46432f", light: "#504d37", dark: "#3b3827", belly: "#43402e", seed: 1967 },
    roca: { key: "roca", base: "#3e3f34", light: "#48493d", dark: "#34352b", belly: "#3c3d33", seed: 1970 },
    usmc: { key: "usmc", base: "#47503a", light: "#525b43", dark: "#3d4532", belly: "#454e39", seed: 1971 }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     projUV() picks the band from each triangle's face normal. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -10.3, UX1 = 4.45;             /* x covered across the sheet  */
  var QY = 1.45;                           /* |y| covered by top/belly    */
  var QZ0 = Z(0.25), QZ1 = Z(3.55);        /* z covered by the side bands */
  var SX = TW / (UX1 - UX0);               /* px per metre along x        */
  var SZ = BAND / (QZ1 - QZ0);             /* px per metre in a side band */
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* The US star-and-bar, low-visibility, a shade off the skin, drawn as
     us_f35_family.js draws it */
  function usStar(g, u, v, r) {
    var i, a;
    g.fillStyle = "rgba(24,26,22,0.55)";
    g.beginPath(); g.arc(u, v, r, 0, PI * 2); g.closePath(); g.fill();
    g.fillRect(u - r * 2.0, v - r * 0.32, r * 4.0, r * 0.64);
    g.fillStyle = "rgba(150,152,140,0.55)";
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = -PI / 2 + i * PI / 5;
      var rr = i % 2 ? r * 0.38 : r * 0.92;
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
    var i, b, x;
    var NX = VR.twin ? NOSE_N : 0;           /* the N's cockpit stations   */

    g.fillStyle = SC.base; g.fillRect(0, 0, TW, TH);
    /* panel-to-panel colour: repainted panels a shade off their neighbours */
    for (i = 0; i < 150; i++) {
      var pw = (0.3 + R() * 1.2) * SX, ph = 8 + R() * 26;
      g.fillStyle = (i & 1) ? SC.light : SC.dark;
      g.globalAlpha = 0.20 + R() * 0.28;
      g.fillRect(R() * TW, R() * TH, pw, ph);
    }
    g.globalAlpha = 1;
    /* sun-faded top, dust streaks down the sides, a dirtier belly */
    g.fillStyle = "rgba(255,250,230,0.05)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 170; i++) {
      g.fillStyle = "rgba(20,20,16," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 36);
    }
    g.fillStyle = SC.belly; g.globalAlpha = 0.6; g.fillRect(0, 3 * BAND, TW, BAND); g.globalAlpha = 1;

    /* exhaust soot: the T53's tailpipe (or the Twin-Pac's stacks) blows aft
       and up over the boom root and the shaft cover */
    var sg = g.createLinearGradient(pxX(-2.5), 0, pxX(-6.0), 0);
    sg.addColorStop(0, "rgba(14,13,11,0.55)"); sg.addColorStop(1, "rgba(14,13,11,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-6.0), pyTop(0.55), pxX(-2.5) - pxX(-6.0), pyTop(-0.55) - pyTop(0.55));
    for (b = 1; b <= 2; b++)
      g.fillRect(pxX(-6.0), pySide(Z(2.45), b), pxX(-2.5) - pxX(-6.0), pySide(Z(1.65), b) - pySide(Z(2.45), b));

    /* frames at real stations, the boom's joint and its access panels */
    var frames = [2.75, 2.05, 1.50, 0.85, 0.15, -0.95, -1.50, -2.10, -2.83, -3.6, -4.4, -5.2,
                  -6.0, -6.8, -7.6, -8.3];
    g.lineWidth = 1.4;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i] + (frames[i] > 1.6 ? NX : 0));
      g.strokeStyle = "rgba(0,0,0,0.28)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.fillStyle = "rgba(150,150,138,0.16)";
      for (var yy = 3; yy < TH; yy += 7) g.fillRect(x - 4, yy, 1.5, 1.5);
    }
    g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 2.4;         /* boom joint */
    x = pxX(-2.83); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    /* stringers along the sides */
    g.strokeStyle = "rgba(0,0,0,0.20)"; g.lineWidth = 1.2;
    [0.62, 1.00, 2.24].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var y2 = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(pxX(-2.8), y2); g.lineTo(pxX(2.2), y2); g.stroke();
      }
    });
    /* access hatches */
    g.lineWidth = 1.1;
    for (i = 0; i < 60; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 8 + R() * 26, hh = 6 + R() * 16;
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.strokeRect(hx, hy, hw, hh);
    }

    /* ---- the doors, each side. The cockpit door with its frame; the
       sliding cabin door from 1.49 m ahead of the mast to 0.92 m behind
       (the drawing), its rails along the roof edge and the floor running
       aft over the hinged panel behind it; the hinged panel itself. */
    function door(bnd, x0, x1, h0, h1, lw) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = lw || 2.2;
      g.strokeRect(pxX(x0), pySide(Z(h1), bnd), pxX(x1) - pxX(x0), pySide(Z(h0), bnd) - pySide(Z(h1), bnd));
      g.strokeStyle = "rgba(255,255,240,0.07)"; g.lineWidth = 1;
      g.strokeRect(pxX(x0) + 2, pySide(Z(h1), bnd) + 2, pxX(x1) - pxX(x0) - 4, pySide(Z(h0), bnd) - pySide(Z(h1), bnd) - 4);
    }
    function rail(bnd, x0, x1, h, w) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = w || 3;
      g.beginPath(); g.moveTo(pxX(x0), pySide(Z(h), bnd)); g.lineTo(pxX(x1), pySide(Z(h), bnd)); g.stroke();
    }
    function handle(bnd, x0, h) {
      g.fillStyle = "rgba(10,10,8,0.7)"; g.fillRect(pxX(x0), pySide(Z(h), bnd), 10, 3);
    }
    for (b = 1; b <= 2; b++) {
      door(b, 1.77 + NX * 0.3, 2.74 + NX, 0.68, 2.30);               /* cockpit door  */
      door(b, -0.92, 1.49, 0.52, 2.22);                               /* sliding door  */
      door(b, -1.32, -0.92, 0.55, 2.20, 1.6);                         /* hinged panel  */
      rail(b, -1.70, 1.49, 2.25); rail(b, -1.70, 1.49, 0.50);
      handle(b, -0.80, 1.30); handle(b, 1.95 + NX * 0.3, 1.45);
      /* the window frames, a dark border the glass sits in */
      g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 3;
      [[0.83, 0.15], [-0.08, -0.69]].forEach(function (w2) {
        g.strokeRect(pxX(w2[1]) - 2, pySide(Z(1.95), b) - 2, pxX(w2[0]) - pxX(w2[1]) + 4, pySide(Z(1.29), b) - pySide(Z(1.95), b) + 4);
      });
    }
    /* ---- the cowling: panel lines, the intake screens and the oil cooler
       grilles (Songshan side view); the Twin-Pac's louvres */
    var CX0 = VR.twin ? 0.6 : 0.55, CX1 = VR.twin ? -2.6 : -2.55;
    for (b = 1; b <= 2; b++) {
      var top = VR.twin ? 2.80 : 2.55;
      g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 1.6;
      [CX0 - 0.35, -0.55, -1.45, -2.05].forEach(function (cx) {
        g.beginPath(); g.moveTo(pxX(cx), pySide(Z(top), b)); g.lineTo(pxX(cx), pySide(Z(2.36), b)); g.stroke();
      });
      if (!VR.twin) {
        /* the engine intake screen just aft of the mast and the grilles */
        g.fillStyle = "rgba(14,14,12,0.78)";
        g.fillRect(pxX(-0.50), pySide(Z(2.54), b), pxX(-0.10) - pxX(-0.50), pySide(Z(2.40), b) - pySide(Z(2.54), b));
        g.fillStyle = "rgba(14,14,12,0.62)";
        g.fillRect(pxX(-2.00), pySide(Z(2.54), b), pxX(-1.45) - pxX(-2.00), pySide(Z(2.42), b) - pySide(Z(2.54), b));
        g.strokeStyle = "rgba(90,90,80,0.5)"; g.lineWidth = 1;
        for (i = 0; i < 8; i++) {
          var lx = pxX(-0.48 + i * 0.05);
          g.beginPath(); g.moveTo(lx, pySide(Z(2.54), b)); g.lineTo(lx, pySide(Z(2.40), b)); g.stroke();
        }
      } else {
        g.fillStyle = "rgba(14,14,12,0.55)";
        for (i = 0; i < 6; i++)
          g.fillRect(pxX(-1.95 + i * 0.09), pySide(Z(2.72), b), 4, pySide(Z(2.44), b) - pySide(Z(2.72), b));
      }
    }
    /* the cowling's top: the walkway lines and, on the D/H, the oil cooler
       grille at the back of the cowl */
    g.strokeStyle = "rgba(0,0,0,0.38)"; g.lineWidth = 1.4;
    [0.28, -0.28].forEach(function (q) {
      g.beginPath(); g.moveTo(pxX(CX1), pyTop(q)); g.lineTo(pxX(CX0), pyTop(q)); g.stroke();
    });
    if (!VR.twin) {
      g.fillStyle = "rgba(12,12,10,0.7)";
      g.fillRect(pxX(-2.25), pyTop(0.22), pxX(-1.75) - pxX(-2.25), pyTop(-0.22) - pyTop(0.22));
    }
    /* the roof's frames over the cockpit and the cabin roof's edges */
    g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.2;
    [0.95, -0.95].forEach(function (q) {
      g.beginPath(); g.moveTo(pxX(-1.7), pyTop(q)); g.lineTo(pxX(2.3 + NX), pyTop(q)); g.stroke();
    });
    /* the belly: the cargo hook well, the fuel cell drains */
    g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.6;
    g.strokeRect(pxX(-0.30), pyBelly(0.28), pxX(0.30) - pxX(-0.30), pyBelly(-0.28) - pyBelly(0.28));

    /* ---- the US star, on the boom's sides just behind the joint (the
       1974 and 1982 Marine photographs; the Army's on the same place),
       low-visibility as us_f35_family.js paints it. The port band runs tail
       to nose, so nothing there is lettering that would mirror. */
    if (VR.star) {
      for (b = 1; b <= 2; b++) usStar(g, pxX(-3.55), pySide(Z(1.48), b), 0.24 * SZ);
    }
    return cv;
  }

  var _cv = {}, _tex = {};                 /* module scope, per variant    */
  function skinTexture(SC, VR) {
    var k = VR.key;
    if (_tex[k] !== undefined) return _tex[k];
    try {
      if (!_cv[k]) _cv[k] = skinCanvas(SC, VR);
      var t = new V.CanvasTexture(_cv[k]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[k] = t;
    } catch (e) { _tex[k] = false; }
    return _tex[k];
  }

  /* (the projection and the geometry kit below are hero/h60_hawk_family.js's, verbatim) */
  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft would collapse to a line under an x projection, so they are laid
     out along x + y. */
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
  /* a round bar from p to q; open-ended unless capped */
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  /* an open cone from p (radius r0) to q (radius r1), on the same facets as
     a bar() along the same line */
  function bar2(p, q, r0, r1, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r1, r0, L, seg, 1, true);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  /* a flat disc facing along the unit normal n */
  function disc(r, seg, c, n) {
    var g = new V.CircleGeometry(r, seg);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1),
      new V.Vector3(n[0], n[1], n[2]).normalize()));
    g.translate(c[0], c[1], c[2]);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  /* the same surface wound to face the other way: the lining of a duct */
  function inward(geo) {
    var g = flat(geo);
    var p = g.attributes.position.array, n = g.attributes.normal.array, t, k, tmp;
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
    }
    for (t = 0; t < n.length; t++) n[t] = -n[t];
    return g;
  }
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
  /* push a port part and its starboard twin */
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
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
  function mesh(parent, list, mat, name, skinned) {
    if (!list.length) return null;
    var geo = merge(list);
    if (skinned) projUV(geo);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  /* One mesh painted per vertex, from [geometry, sRGB hex] pairs. The
     colours are stored linear, because three reads a colour attribute as
     it stands and render3d.js prepModel() converts only material colours
     (hero/barracks_block.js does the same). */
  function linRGB(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }
  function meshVC(parent, list, mat, name) {
    if (!list.length || !mat) return null;
    var pos = [], nor = [], col = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i][0]), c = linRGB(list[i][1]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3; j++) col.push(c[0], c[1], c[2]);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("color", new V.Float32BufferAttribute(col, 3));
    var m = new V.Mesh(out, mat);
    m.name = name;
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
  /* A convex solid from its faces (each a convex polygon of corners). Each
     face is wound so its normal points away from the solid's centre. */
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
  /* a closed solid between two convex sections with the same corner count */
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* a convex solid through a run of sections, capped at both ends */
  function pod(secs) {
    var faces = [secs[0], secs[secs.length - 1]], q, j, n = secs[0].length;
    for (q = 0; q < secs.length - 1; q++)
      for (j = 0; j < n; j++)
        faces.push([secs[q][j], secs[q][(j + 1) % n], secs[q + 1][(j + 1) % n], secs[q + 1][j]]);
    return convex(faces);
  }
  /* triangles wound to face along n */
  function facing(list, n) {
    var out = [], i;
    for (i = 0; i < list.length; i += 3) {
      var p = list[i], q = list[i + 1], r = list[i + 2];
      var ux = q[0] - p[0], uy = q[1] - p[1], uz = q[2] - p[2], vx = r[0] - p[0], vy = r[1] - p[1], vz = r[2] - p[2];
      var d = (uy * vz - uz * vy) * n[0] + (uz * vx - ux * vz) * n[1] + (ux * vy - uy * vx) * n[2];
      if (d >= 0) out.push(p, q, r); else out.push(p, r, q);
    }
    return tris(out);
  }
  /* triangles wound to face away from the point c (a convex ring band) */
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
  /* A six-cornered aerofoil section: leading edge, crest 15% back, the
     after-body at 75%, a sharp trailing edge. le and te are [x, z]; at(x,
     z, k) turns chord-plane coordinates and a thickness offset into a
     model-space point. */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners:
     box-like where e is low, round where it nears 1.
       zb, zt   belly and top          zm   height of the widest point
       wb, wt   half-widths at belly and top corners, wm the widest
       yc       centreline offset (the engine nacelles)
     Heights are given ABOVE GROUND and converted here. Sections run from
     nose to tail (decreasing x), and the quads are wound (a, c, b), which
     for that order puts every normal outward (hero/nato_e20_gunship_ah64e.js;
     the signed volume is checked positive with the model tool). */
  function sec(x, zb, zt, zm, wb, wm, wt, e, yc) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, yc: yc || 0 };
  }
  /* one point of a section's port half: th from -PI/2 (belly) to PI/2 (top) */
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
  /* a solid of revolution about model x from an (x, r) profile, front to
     back; LatheGeometry turns about Y, so it is built there and laid down */
  function latheX(prof, seg, y, z) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), -prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateZ(PI / 2);                       /* lathe -Y (front) -> model +X */
    g.translate(0, y, z);
    return g;
  }
  /* the same about model z, from a (z, r) profile bottom to top */
  function latheZ(prof, seg, x, y) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateX(PI / 2);                       /* lathe +Y -> model +Z         */
    g.translate(x, y, 0);
    return g;
  }

  /* ---- surface patches. A window or a flash that must lie on the curved
     skin is cut from the loft itself, then pushed out along the surface
     normal (gb_lynx.js). The point at station x and ring angle th is found
     on the loft's own triangles: the facet between the ring points either
     side of th, split along the diagonal loft() splits it on. Interpolating
     the curve itself put a pane up to 4 cm under the skin where the nose's
     sections change shape fast (the chin windows), the facets there being
     twisted; secs.n, the ring count loft() was given, says where the facets
     are. Without it, the curve. */
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
        if (f + g <= 1)                       /* the facet (a, c, b) */
          return [x, a[0] + f * (c[0] - a[0]) + g * (b[0] - a[0]), a[1] + f * (c[1] - a[1]) + g * (b[1] - a[1])];
        return [x, d[0] + (1 - f) * (b[0] - d[0]) + (1 - g) * (c[0] - d[0]),   /* and (b, c, d) */
                   d[1] + (1 - f) * (b[1] - d[1]) + (1 - g) * (c[1] - d[1])];
      }
    }
    return null;
  }
  /* the ring angle on the port side where the skin stands at model height z */
  function thAtZ(secs, x, z) {
    var lo = -PI / 2, hi = PI / 2, i, m;
    for (i = 0; i < 40; i++) { m = (lo + hi) / 2; if (surfPt(secs, x, m)[2] < z) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  /* the ring angle above the widest point where the skin is y out from the
     centreline (y falls as th climbs toward the top) */
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
  /* A patch over x from xa down to xb (xa > xb) and, at each x, ring angles
     t0(x) to t1(x); off metres proud of the skin. Every triangle is wound to
     face along the skin normal. */
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
  function lerp(a, b, f) { return a + (b - a) * f; }
  function lin(xa, va, xb, vb) { return function (x) { return lerp(va, vb, (x - xa) / (xb - xa)); }; }
  function cnst(v) { return function () { return v; }; }

  /* ========================================================= materials == */
  function makeMats(C, VR) {
    var SC = SCHEMES[VR.scheme];
    var tex = skinTexture(SC, VR);
    var m = {};
    /* the Marines' green was a gloss paint in 1974; the Army's lusterless */
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: VR.scheme === "usmc" ? 0.70 : 0.88, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.set(SC.base);
    m.metal = new V.MeshStandardMaterial({ color: 0x5c6266, roughness: 0.46, metalness: 0.62 });
    /* fittings, the exhaust mouths and the intakes' throats: black enough
       to read as a hole */
    m.dark  = new V.MeshStandardMaterial({ color: 0x15171a, roughness: 0.70, metalness: 0.25 });
    /* the main blades: Bell's bonded metal blades, painted a flat dark grey */
    m.blade = new V.MeshStandardMaterial({ color: 0x2b2d2d, roughness: 0.80, metalness: 0.10 });
    /* Curved acrylic: dark, the overhead panes tinted green, the beacons'
       red lenses; one material painted per vertex (meshVC). Both faces
       drawn, so a pane's rim never shows through at a grazing angle. */
    m.glass = new V.MeshPhysicalMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.08, metalness: 0.20,
                                           clearcoat: 1.0, clearcoatRoughness: 0.05, side: V.DoubleSide });
    /* the tail rotor, hub and blades and the tip bands, per vertex */
    m.trvc  = new V.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.70, metalness: 0.20 });
    /* exactly C.team; the emissive keeps it from greying out under ACES */
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc  = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                           transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ========================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "uh1_" + VR.key;
    var i, k, s, a;
    var skin = [], dark = [], metal = [], team = [], glass = [], skidL = [];
    var TWIN = VR.twin;
    var NX = TWIN ? NOSE_N : 0;
    var TR_X = VR.trX || TR_X0, TR_H = VR.trH || TR_H0;
    /* The N's longer nose: stations ahead of the cabin door move forward,
       spread over the cockpit, the whole 0.315 m from the windscreen on. */
    function NXs(x) { return x + NX * Math.max(0, Math.min(1, (x - 1.60) / (2.75 - 1.60))); }
    var GL = { win: 0x0b1216, green: 0x1d3a26, red: 0xa01c14 };

    /* --------------------------------------------------- the fuselage ----
       Traced off the drawing's side and top views (see the header).
       The rounded nose cone with the chin windows low on its sides; the
       windscreen rising from 1.69 m to the cockpit roof at 2.33 m; the box
       cabin 2.34 m across on a flat belly 0.45 m up, its roof at 2.38 m
       and the big doors in its sides; the after fuselage narrowing in plan
       from 1.0 m behind the mast while its belly rises; then the boom, deep
       at the root, its belly line running straight up to the fin.
                x      zb    zt    zm    wb    wm    wt    e              */
    var TAB = [
      [ 3.573, 1.13, 1.25, 1.19, 0.04, 0.06, 0.04, 0.90],
      [ 3.545, 1.02, 1.36, 1.18, 0.20, 0.27, 0.17, 0.80],
      [ 3.500, 0.95, 1.44, 1.17, 0.31, 0.41, 0.27, 0.70],
      [ 3.420, 0.89, 1.51, 1.16, 0.42, 0.54, 0.36, 0.62],
      [ 3.270, 0.80, 1.61, 1.15, 0.56, 0.68, 0.47, 0.52],
      [ 3.110, 0.73, 1.69, 1.15, 0.66, 0.81, 0.56, 0.45],
      [ 2.950, 0.70, 1.77, 1.16, 0.74, 0.89, 0.64, 0.40],
      [ 2.800, 0.67, 1.91, 1.18, 0.80, 0.94, 0.70, 0.36],
      [ 2.650, 0.65, 2.08, 1.22, 0.84, 0.98, 0.76, 0.33],
      [ 2.500, 0.63, 2.23, 1.28, 0.87, 1.02, 0.82, 0.30],
      [ 2.350, 0.61, 2.33, 1.33, 0.89, 1.05, 0.87, 0.28],
      [ 2.120, 0.58, 2.39, 1.38, 0.92, 1.08, 0.91, 0.26],
      [ 1.770, 0.55, 2.40, 1.40, 0.94, 1.12, 0.94, 0.24],
      [ 1.470, 0.48, 2.39, 1.40, 0.95, 1.15, 0.96, 0.22],
      [ 1.170, 0.45, 2.38, 1.40, 0.96, 1.17, 0.97, 0.22],
      [ 0.500, 0.45, 2.38, 1.40, 0.96, 1.17, 0.97, 0.22],
      [-0.200, 0.45, 2.38, 1.40, 0.96, 1.17, 0.97, 0.22],
      [-0.730, 0.46, 2.38, 1.40, 0.95, 1.16, 0.96, 0.22],
      [-1.030, 0.50, 2.38, 1.42, 0.90, 1.10, 0.92, 0.24],
      [-1.330, 0.54, 2.37, 1.45, 0.82, 1.01, 0.85, 0.27],
      [-1.630, 0.58, 2.36, 1.48, 0.71, 0.88, 0.75, 0.31],
      [-1.930, 0.62, 2.35, 1.50, 0.60, 0.76, 0.64, 0.36],
      [-2.230, 0.69, 2.31, 1.52, 0.48, 0.63, 0.52, 0.42],
      [-2.530, 0.79, 2.17, 1.50, 0.38, 0.50, 0.40, 0.50],
      [-2.830, 0.87, 1.93, 1.40, 0.30, 0.39, 0.31, 0.56],
      [-3.230, 0.91, 1.84, 1.38, 0.27, 0.34, 0.28, 0.60],
      [-4.090, 1.00, 1.85, 1.43, 0.23, 0.29, 0.24, 0.62],
      [-5.000, 1.15, 1.87, 1.50, 0.20, 0.255, 0.21, 0.64],
      [-5.920, 1.30, 1.89, 1.58, 0.18, 0.225, 0.19, 0.66],
      [-7.140, 1.50, 1.93, 1.70, 0.15, 0.19, 0.16, 0.68],
      [-8.060, 1.67, 1.96, 1.80, 0.12, 0.15, 0.12, 0.72],
      [-8.450, 1.74, 1.96, 1.84, 0.08, 0.10, 0.08, 0.78],
      [-8.620, 1.80, 1.93, 1.86, 0.03, 0.04, 0.03, 0.85]
    ];
    var FUS = TAB.map(function (r) {
      var d = TAILDROP(r[0]);
      return sec(NXs(r[0]), r[1] - d, r[2] - d, r[3] - d, r[4], r[5], r[6], r[7]);
    });
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
    var FUS_N = 18;
    FUS.n = FUS_N;
    var fl = loft(FUS, FUS_N, 0.02, 0.03);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);
    function sideY(x, z) { return surfPt(FUS, x, thAtZ(FUS, x, z))[1]; }

    /* ------------------------------------------------- the cowling ----
       D and H: the T53's narrow cowl, 0.9 m across and 2.58 m high, from
       the transmission fairing round the mast to the tailpipe. N: the
       Twin-Pac's, 1.48 m across and 2.84 m high (the N drawing), its
       after end falling to the two stacks. */
    var COWL = TWIN ? [
      sec( 0.82, 2.32, 2.40, 2.36, 0.30, 0.34, 0.26, 0.80),
      sec( 0.62, 2.32, 2.56, 2.42, 0.52, 0.58, 0.44, 0.55),
      sec( 0.35, 2.32, 2.72, 2.46, 0.64, 0.70, 0.54, 0.45),
      sec( 0.05, 2.32, 2.82, 2.48, 0.68, 0.74, 0.58, 0.42),
      sec(-0.90, 2.32, 2.84, 2.50, 0.68, 0.74, 0.58, 0.42),
      sec(-1.80, 2.32, 2.83, 2.50, 0.66, 0.72, 0.56, 0.42),
      sec(-2.15, 2.25, 2.76, 2.46, 0.60, 0.66, 0.50, 0.45),
      sec(-2.45, 2.12, 2.60, 2.38, 0.48, 0.54, 0.40, 0.50),
      sec(-2.68, 2.04, 2.42, 2.26, 0.30, 0.34, 0.24, 0.60)
    ] : [
      sec( 0.78, 2.32, 2.39, 2.35, 0.20, 0.24, 0.18, 0.80),
      sec( 0.62, 2.32, 2.47, 2.38, 0.34, 0.38, 0.28, 0.60),
      sec( 0.40, 2.32, 2.55, 2.40, 0.40, 0.44, 0.34, 0.50),
      sec( 0.10, 2.32, 2.58, 2.40, 0.41, 0.45, 0.36, 0.45),
      sec(-0.80, 2.32, 2.59, 2.40, 0.41, 0.45, 0.36, 0.45),
      sec(-1.70, 2.32, 2.59, 2.40, 0.41, 0.45, 0.36, 0.45),
      sec(-2.20, 2.25, 2.57, 2.38, 0.38, 0.42, 0.33, 0.48),
      sec(-2.50, 2.12, 2.52, 2.34, 0.32, 0.36, 0.28, 0.52),
      sec(-2.66, 2.05, 2.44, 2.30, 0.22, 0.26, 0.20, 0.60)
    ];
    COWL.n = 10;
    var cw = loft(COWL, COWL.n, 0.02, 0.02);
    for (i = 0; i < cw.length; i++) skin.push(cw[i]);
    var COWL_TOP = TWIN ? 2.84 : 2.59;

    if (!TWIN) {
      /* The T53's tailpipe out of the back of the cowl, turned 14 degrees
         up (drawing; Songshan rear quarter), sooty inside */
      var e0 = [-2.36, 0, Z(2.35)], e1 = [-2.74, 0, Z(2.45)];
      var ed = [e1[0] - e0[0], 0, e1[2] - e0[2]], el = Math.sqrt(ed[0] * ed[0] + ed[2] * ed[2]);
      ed = [ed[0] / el, 0, ed[2] / el];
      skin.push(bar(e0, e1, 0.17, 16, false));
      skin.push(bar2(e1, [e1[0] + ed[0] * 0.01, 0, e1[2] + ed[2] * 0.01], 0.17, 0.155, 16));
      dark.push(inward(bar([e1[0] - ed[0] * 0.25, 0, e1[2] - ed[2] * 0.25], e1, 0.155, 16, false)));
      dark.push(disc(0.156, 16, [e1[0] - ed[0] * 0.24, 0, e1[2] - ed[2] * 0.24], ed));
    } else {
      /* the Twin-Pac's two stacks, side by side at the back of the cowl,
         aft, up and a little out (1974 and 1982 photographs) */
      for (s = -1; s <= 1; s += 2) {
        var p0 = [-2.36, s * 0.26, Z(2.46)], p1 = [-2.78, s * 0.34, Z(2.60)];
        var pd = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]], pl = Math.sqrt(pd[0] * pd[0] + pd[1] * pd[1] + pd[2] * pd[2]);
        pd = [pd[0] / pl, pd[1] / pl, pd[2] / pl];
        skin.push(bar(p0, p1, 0.15, 14, false));
        skin.push(bar2(p1, [p1[0] + pd[0] * 0.01, p1[1] + pd[1] * 0.01, p1[2] + pd[2] * 0.01], 0.15, 0.135, 14));
        dark.push(inward(bar([p1[0] - pd[0] * 0.22, p1[1] - pd[1] * 0.22, p1[2] - pd[2] * 0.22], p1, 0.135, 14, false)));
        dark.push(disc(0.136, 14, [p1[0] - pd[0] * 0.21, p1[1] - pd[1] * 0.21, p1[2] - pd[2] * 0.21], pd));
        /* the scoop intake each side, just behind the mast: the cowl swells
           out over a deep opening facing outboard and forward (Peleliu,
           2008, starboard; 1974, port) */
        var sy = s * 0.70, so = s * 0.88;
        var scoop = pod([
          [[ 0.02, sy, Z(2.42)], [ 0.02, sy + s * 0.04, Z(2.42)], [ 0.02, sy + s * 0.04, Z(2.70)], [ 0.02, sy, Z(2.72)]],
          [[-0.22, sy, Z(2.36)], [-0.22, so, Z(2.38)], [-0.22, so, Z(2.78)], [-0.22, sy, Z(2.80)]],
          [[-0.95, sy, Z(2.36)], [-0.95, so - s * 0.02, Z(2.38)], [-0.95, so - s * 0.02, Z(2.78)], [-0.95, sy, Z(2.80)]],
          [[-1.20, sy, Z(2.40)], [-1.20, sy + s * 0.05, Z(2.42)], [-1.20, sy + s * 0.05, Z(2.72)], [-1.20, sy, Z(2.74)]]]);
        skin.push(scoop);
        /* the opening, a dark face on the scoop's outboard side */
        dark.push(facing([[-0.28, so + s * 0.004, Z(2.44)], [-0.90, so - s * 0.016, Z(2.44)], [-0.90, so - s * 0.016, Z(2.72)],
                          [-0.28, so + s * 0.004, Z(2.44)], [-0.90, so - s * 0.016, Z(2.72)], [-0.28, so + s * 0.004, Z(2.72)]], [0.25, s, 0]));
      }
    }
    /* the anti-collision beacon on the back of the cowl's top (Songshan;
       1974), its red lens */
    glass.push([sph(0.065, 10, 5, -2.05, 0, Z(COWL_TOP - (TWIN ? 0.10 : 0.05)), 1, 1, 0.8), GL.red]);
    dark.push(cyl(0.07, 0.07, 0.05, 10, "z", -2.05, 0, Z(COWL_TOP - (TWIN ? 0.13 : 0.08))));

    /* the drive shaft cover along the boom's top, from the cowl to the fin */
    var SHAFT = [], sx;
    for (sx = -2.70; sx >= -7.50; sx -= 0.60) {
      var fs = fusAt(sx);
      SHAFT.push({ x: sx, zb: fs.zt - 0.05, zt: fs.zt + 0.09, zm: fs.zt + 0.01, wb: 0.10, wm: 0.12, wt: 0.09, e: 0.6, yc: 0 });
    }
    var shl = loft(SHAFT, 5, 0.06, 0.05);
    for (i = 0; i < shl.length; i++) skin.push(shl[i]);

    /* ------------------------------------------------------ the fin ----
       Swept, thick, the shaft up its leading edge: the root along the boom
       top from 7.25 to 8.55 m behind the mast, the tip under the 90-degree
       gearbox (drawing, lowered by TAILDROP) */
    function finAt(x, z, kk) { return [x, kk, z]; }
    var fR, fM, fT;
    if (!TWIN) {
      fR = foil([-7.20, Z(1.78)], [-8.62, Z(1.74)], 0.22, finAt);
      /* broader at mid-height, the tip fairing running aft past the
         gearbox (Songshan rear quarter) */
      fM = foil([-7.98, Z(2.55)], [-8.93, Z(2.52)], 0.18, finAt);
      fT = foil([-8.50, Z(3.14)], [-9.06, Z(3.12)], 0.15, finAt);
    } else {
      /* the N's, from its drawing: the leading edge from 7.4 m behind the
         mast up to the gearbox at 3.75 m, the trailing edge near upright */
      fR = foil([-7.36, Z(1.78)], [-8.70, Z(1.74)], 0.22, finAt);
      fM = foil([-8.25, Z(2.90)], [-9.00, Z(2.86)], 0.18, finAt);
      fT = foil([-8.62, Z(3.78)], [-9.08, Z(3.76)], 0.15, finAt);
    }
    skin.push(pod([fR, fM, fT]));
    /* the 42-degree gearbox at the fin's foot and the 90-degree at its
       top, with the output shaft out to the tail rotor's side */
    skin.push(sph(0.13, 10, 6, -7.32, 0, Z(1.92 - TAILDROP(-7.32) + 0.05), 1.6, 0.9, 0.8));
    skin.push(sph(0.15, 12, 6, TR_X, 0, Z(TR_H + 0.03), 1.45, 1.0, 1.1));
    metal.push(cyl(0.06, 0.06, TR_OUT, 10, "y", TR_X, VR.trSide * TR_OUT / 2, Z(TR_H)));
    /* the tail skid: a bent tube under the fin (drawing: 4 ft 9.25 in up) */
    metal.push(bar([-7.95, 0, Z(1.62 - 0.12)], [-8.55, 0, Z(1.50)], 0.035, 8, true));
    metal.push(bar([-8.55, 0, Z(1.50)], [-9.05, 0, Z(1.47)], 0.035, 8, true));
    metal.push(sph(0.035, 8, 4, -9.05, 0, Z(1.47)));
    metal.push(bar([-8.30, 0, Z(1.74 - 0.12)], [-8.62, 0, Z(1.50)], 0.03, 8, true));

    /* --------------------------------------------- the synchronised elevator
       9 ft 4.3 in across, 2 ft 6.5 in chord, half way down the boom
       (drawing); an inverted aerofoil */
    function elAt(y) { return function (x, z, kk) { return [x, y, Z(EL_H) - kk]; }; }
    var eR = foil([EL_LE, 0], [EL_TE, 0], 0.095, elAt(0.15));
    var eT = foil([EL_LE, 0], [EL_TE, 0], 0.075, elAt(EL_Y));
    both(skin, solid(eR, eT));
    /* the team flash on the outer halves' upper surface */
    both(team, solid([[EL_LE - 0.12, 0.78, Z(EL_H) + 0.046], [EL_TE + 0.12, 0.78, Z(EL_H) + 0.040],
                      [EL_TE + 0.12, EL_Y - 0.06, Z(EL_H) + 0.034], [EL_LE - 0.12, EL_Y - 0.06, Z(EL_H) + 0.038]],
                     [[EL_LE - 0.12, 0.78, Z(EL_H) + 0.060], [EL_TE + 0.12, 0.78, Z(EL_H) + 0.054],
                      [EL_TE + 0.12, EL_Y - 0.06, Z(EL_H) + 0.048], [EL_LE - 0.12, EL_Y - 0.06, Z(EL_H) + 0.052]]));

    /* ------------------------------------------------ team band ----
       right round the boom, cut from its own sections 3% oversize */
    function bandRing(x, kx, c) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) {
          var f = (A.x - x) / (A.x - B.x), ra = ringOf(A, FUS_N), rb = ringOf(B, FUS_N), out = [], cy = 0, cz = 0, j;
          for (j = 0; j < ra.length; j++) out.push([ra[j][0] + (rb[j][0] - ra[j][0]) * f, ra[j][1] + (rb[j][1] - ra[j][1]) * f]);
          for (j = 0; j < out.length; j++) { cy += out[j][0]; cz += out[j][1]; }
          cy /= out.length; cz /= out.length;
          return out.map(function (p) {
            var dy = p[0] - cy, dz = p[1] - cz, l = Math.sqrt(dy * dy + dz * dz) || 1;
            return [x, cy + dy * kx + dy / l * c, cz + dz * kx + dz / l * c];
          });
        }
      }
      return null;
    }
    var BX = -4.55;
    var bR = [bandRing(BX, 1.006, 0.004), bandRing(BX - 0.02, 1.03, 0.012),
              bandRing(BX - 0.55, 1.03, 0.012), bandRing(BX - 0.57, 1.006, 0.004)], bq = [], bk;
    for (bk = 0; bk < 3; bk++) {
      var bA = bR[bk], bB = bR[bk + 1];
      for (i = 0; i < bA.length; i++) {
        var i2 = (i + 1) % bA.length;
        bq.push(bA[i], bB[i], bA[i2], bA[i2], bB[i], bB[i2]);
      }
    }
    team.push(facingOut(bq, [BX - 0.28, 0, fusAt(BX - 0.28).zm]));

    /* --------------------------------------------------- the glazing ----
       Cut from the loft a few centimetres proud. */
    var OFF = 0.03;
    function pwl(xs, hs) {
      return function (x) {
        for (var q = 0; q < xs.length - 1; q++)
          if (x <= xs[q] && x >= xs[q + 1]) return hs[q] + (hs[q + 1] - hs[q]) * (xs[q] - x) / (xs[q] - xs[q + 1]);
        return x > xs[0] ? hs[0] : hs[hs.length - 1];
      };
    }
    function paneX(xa, xb, zLo, zHi, nx, nLo, nHi, off) {
      off = off || OFF;
      return [patch(FUS, xa, xb, function (x) { return thAtZ(FUS, x, Z(zLo(x))); }, cnst(0), nx, nLo, off),
              patch(FUS, xa, xb, cnst(0), function (x) { return thAtZ(FUS, x, Z(zHi(x))); }, nx, nHi, off)];
    }
    function gl(geo, col) { glass.push([geo, col]); glass.push([mirrorY(geo), col]); }
    /* The windscreen, a pane each side of the centre post, wrapping round
       to the door post and down to 1.45 m at the side (drawing side view) */
    var wsA = NXs(3.08), wsB = NXs(2.37);
    var wsLo = pwl([wsA, NXs(2.86), wsB], [1.70, 1.46, 1.46]);
    gl(patch(FUS, wsA, wsB, function (x) { return Math.max(thAtZ(FUS, x, Z(wsLo(x))), 0.02); },
             function (x) { return thAtY(FUS, x, 0.05); }, 8, 7, OFF), GL.win);
    /* the green-tinted overhead windows in the cockpit roof */
    gl(patch(FUS, NXs(2.30), NXs(1.86), function (x) { return thAtY(FUS, x, 0.86); },
             function (x) { return thAtY(FUS, x, 0.12); }, 3, 4, OFF), GL.green);
    /* the chin windows, low on the nose, rounded at the front (drawing) */
    var cwx = [NXs(3.44), NXs(3.36), NXs(3.22), NXs(2.96), NXs(2.80)];
    paneX(cwx[0], cwx[4], pwl(cwx, [1.00, 0.86, 0.78, 0.76, 0.77]), pwl(cwx, [1.10, 1.18, 1.21, 1.21, 1.18]), 8, 3, 3)
      .forEach(function (pp) { gl(pp, GL.win); });
    /* the cockpit door's window */
    gl(patch(FUS, NXs(2.30), 1.84, function (x) { return thAtZ(FUS, x, Z(1.38)); },
             function (x) { return thAtZ(FUS, x, Z(2.16)); }, 3, 4, OFF), GL.win);
    /* the sliding door's two windows (drawing; Songshan) */
    [[0.83, 0.15], [-0.08, -0.69]].forEach(function (w2) {
      gl(patch(FUS, w2[0], w2[1], function (x) { return thAtZ(FUS, x, Z(1.30)); },
               function (x) { return thAtZ(FUS, x, Z(1.94)); }, 2, 3, OFF), GL.win);
    });

    /* ------------------------------------------- fittings on the skin ---- */
    /* the sliding doors' rails, along the roof edge and the floor, running
       aft past the hinged panel (Songshan) */
    for (s = -1; s <= 1; s += 2) {
      var ru = [], rl = [];
      for (k = 0; k <= 6; k++) {
        var rx = 1.49 - k * (3.19 / 6);
        ru.push([rx, s * (sideY(rx, Z(2.25)) + 0.025), Z(2.25)]);
        rl.push([rx, s * (sideY(rx, Z(0.52)) + 0.025), Z(0.52)]);
      }
      for (k = 0; k < 6; k++) { dark.push(bar(ru[k], ru[k + 1], 0.022, 5, true)); dark.push(bar(rl[k], rl[k + 1], 0.020, 5, true)); }
    }
    /* the swept blade antenna on the cockpit roof (drawing; Songshan;
       72+09) */
    var ax0 = NXs(1.78), az = fusAt(ax0).zt;
    dark.push(convex([[[ax0, 0.012, az - 0.02], [ax0 - 0.34, 0.012, az - 0.02], [ax0 - 0.40, 0.010, az + 0.30], [ax0 - 0.27, 0.010, az + 0.30]],
                      [[ax0, -0.012, az - 0.02], [ax0 - 0.34, -0.012, az - 0.02], [ax0 - 0.40, -0.010, az + 0.30], [ax0 - 0.27, -0.010, az + 0.30]]]));
    /* the towel-bar antenna on the boom's port side (drawing) */
    var tbz = Z(1.62 - TAILDROP(-7.15) + 0.02), tby = fusAt(-7.15).wm + 0.07;
    dark.push(bar([-6.92, tby, tbz], [-7.40, tby, tbz], 0.014, 5, true));
    dark.push(bar([-6.95, tby - 0.07, tbz], [-6.95, tby, tbz], 0.012, 5, true));
    dark.push(bar([-7.37, tby - 0.07, tbz], [-7.37, tby, tbz], 0.012, 5, true));
    /* blade aerials under the belly and the cargo hook under the mast */
    dark.push(box(0.26, 0.025, 0.16, -1.35, 0, Z(0.50) - 0.06));
    dark.push(box(0.22, 0.025, 0.14, -3.60, 0, fusAt(-3.60).zb - 0.06));
    dark.push(box(0.30, 0.16, 0.08, 0.0, 0, Z(0.45) - 0.03));
    /* the landing light and the searchlight under the nose */
    for (s = -1; s <= 1; s += 2) {
      var lx = NXs(2.92), lz = fusAt(lx).zb;
      dark.push(cyl(0.085, 0.10, 0.07, 12, "z", lx, s * 0.18, lz - 0.02));
      glass.push([disc(0.075, 12, [lx, s * 0.18, lz - 0.058], [0, 0, -1]), GL.win]);
    }
    if (VR.nosePitot) {
      /* the UH-1D's pitot tubes, short, on the flanks of the nose cone
         (72+09 port, the BGS machine starboard) */
      for (s = -1; s <= 1; s += 2) {
        var px0 = 3.33, py0 = fusAt(px0).wm * 0.93;
        dark.push(bar([px0 - 0.04, s * (py0 - 0.02), Z(1.22)], [px0 + 0.20, s * (py0 - 0.01), Z(1.22)], 0.012, 6, true));
        dark.push(box(0.08, 0.03, 0.04, px0 - 0.02, s * py0, Z(1.22)));
      }
    } else {
      /* the UH-1H's (and N's) pitot on the cockpit roof, a raked mast with
         the tube ahead (drawing: 2.1 to 2.4 m ahead of the mast) */
      var pxa = NXs(2.10), pza = fusAt(pxa).zt;
      dark.push(bar([pxa, 0, pza - 0.02], [pxa + 0.24, 0, pza + 0.32], 0.022, 6, true));
      dark.push(bar([pxa + 0.10, 0, pza + 0.32], [pxa + 0.48, 0, pza + 0.32], 0.014, 6, true));
    }

    /* --------------------------------------------------- the skid gear ---
       Two tubes 8 ft 6.6 in apart (D, H; 8 ft 8.4 in on the N), toes turned
       up under the cockpit, on two bowed crosstubes 1.62 m ahead of the
       mast and 0.75 m behind it (drawing side and front views) */
    var SY = TWIN ? SKID_Y_N : SKID_Y_H, SR = SKID_R;
    for (s = -1; s <= 1; s += 2) {
      var sp = [[2.66, 0.40], [2.58, 0.27], [2.46, 0.155], [2.30, 0.075], [2.10, SR], [-1.22, SR]];
      for (k = 0; k < sp.length - 1; k++) {
        skidL.push(bar([sp[k][0], s * SY, Z(sp[k][1])], [sp[k + 1][0], s * SY, Z(sp[k + 1][1])], SR, 10, false));
        skidL.push(sph(SR, 10, 5, sp[k + 1][0], s * SY, Z(sp[k + 1][1])));
      }
      skidL.push(sph(SR, 10, 5, sp[0][0], s * SY, Z(sp[0][1])));
      /* the crosstubes, out of the belly and bowed down to saddles on the
         skids */
      [1.62, -0.75].forEach(function (cx) {
        var bz = fusAt(cx).zb;
        var ct = [[cx, s * 0.55, bz + 0.02], [cx, s * 0.92, bz - 0.04], [cx, s * 1.16, Z(0.30)], [cx, s * (SY - 0.02), Z(0.13)]];
        for (var q = 0; q < ct.length - 1; q++) {
          skidL.push(bar(ct[q], ct[q + 1], 0.048, 10, false));
          skidL.push(sph(0.048, 10, 5, ct[q + 1][0], ct[q + 1][1], ct[q + 1][2]));
        }
        skidL.push(box(0.20, 0.10, 0.07, cx, s * SY, Z(SR + 0.05)));
      });
    }

    /* ======================================================= main rotor ==
       The tilt group at the hub: the N's mast leans 5 degrees forward; the
       mast, the collective sleeve and the swashplate's fixed ring are in
       that frame and do not turn. */
    var tiltM = new V.Matrix4().makeRotationY(VR.tilt).setPosition(0, 0, Z(HUB_H));
    var mastLen = HUB_H - COWL_TOP + 0.06;
    var SW_Z = -(HUB_H - COWL_TOP) * 0.62;     /* the swashplate, in hub frame */
    var mastParts = [cyl(0.075, 0.085, mastLen, 12, "z", 0, 0, -mastLen / 2),
                     cyl(0.17, 0.17, 0.06, 14, "z", 0, 0, -(HUB_H - COWL_TOP) + 0.03),
                     cyl(0.12, 0.13, 0.22, 12, "z", 0, 0, SW_Z - 0.16),
                     cyl(0.26, 0.26, 0.05, 16, "z", 0, 0, SW_Z - 0.03)];
    for (i = 0; i < mastParts.length; i++) { mastParts[i].applyMatrix4(tiltM); metal.push(mastParts[i]); }
    /* the tail rotor's output shaft is above; the fin's gearbox carries it */

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", true);
    meshVC(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, team, T.team, "team");
    var skids = new V.Group();
    skids.name = "skids";
    g.add(skids);
    mesh(skids, skidL, T.skin, "skid_tubes", true);

    var tilt = new V.Group();
    tilt.position.set(0, 0, Z(HUB_H));
    tilt.rotation.y = VR.tilt;
    g.add(tilt);
    /* The mount: +PI/2 about X points the rotor node's local +Y - the axis
       render3d.js turns it positively about - up the mast, so the head
       turns anti-clockwise from above; head undoes it, so the head is
       authored in model axes, its origin at the hub in the blade plane. */
    var mnt = new V.Group();
    mnt.rotation.x = PI / 2;
    tilt.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);

    /* The Bell semi-rigid head (drawing front view; Songshan): the yoke
       across the mast on its teetering trunnion, the blade grips and their
       drag braces, the pitch horns on the leading side; above it, across
       the blades, the stabiliser bar, 9 ft 0.5 in over its weighted ends,
       on its pivot with the two dampers; the pitch links from the turning
       ring of the swashplate up to the mixing levers. */
    var hubM = [], hubD = [], blades = [];
    var BA = 45 * D2R;                        /* the blades at 45 / 225 deg */
    var BARZ = BAR_H - HUB_H;
    hubM.push(cyl(0.085, 0.085, 0.36, 12, "z", 0, 0, 0.05));            /* mast top     */
    hubM.push(sph(0.09, 10, 6, 0, 0, BARZ + 0.10, 1, 1, 0.8));           /* mast nut     */
    hubM.push(cyl(0.25, 0.25, 0.04, 16, "z", 0, 0, SW_Z + 0.02));        /* turning ring */
    for (k = 0; k < 2; k++) {
      a = BA + k * PI;
      var CHD = VR.chord, LE = 0.25 * CHD, TE = LE - CHD, R = VR.R;
      var hp = [[box(0.66, 0.30, 0.10, 0.22, 0, 0), hubM],               /* yoke         */
                [box(0.34, 0.22, 0.14, 0.62, 0, 0), hubM],               /* grip         */
                [cyl(0.06, 0.06, 0.24, 8, "y", 0.12, 0, 0.0), hubM],     /* trunnion     */
                [bar([0.50, TE + 0.06, 0], [0.95, TE + 0.10, 0], 0.03, 6, true), hubD],   /* drag brace */
                [box(0.16, 0.05, 0.05, 0.42, LE + 0.13, -0.06), hubD],  /* pitch horn   */
                [bar([0.40, LE + 0.15, -0.08], [0.24, LE + 0.18, SW_Z + 0.04], 0.018, 6, true), hubD]];  /* pitch link */
      for (i = 0; i < hp.length; i++) { hp[i][0].rotateZ(a); hp[i][1].push(hp[i][0]); }
      /* the blade: constant chord, the root doubler at the grip */
      var bl = M.slab(V, [[0.72, TE + 0.04], [0.98, TE], [R, TE], [R, LE - 0.02], [R - 0.06, LE], [0.98, LE], [0.72, LE - 0.03]], 0.045);
      bl.translate(0, 0, -0.022);
      bl.rotateY(-1.0 * D2R);                 /* a little coning: tips up */
      bl.rotateZ(a);
      blades.push(bl);
      var dbl = box(0.55, CHD * 0.9, 0.07, 1.05, (LE + TE) / 2, 0);
      dbl.rotateZ(a); blades.push(dbl);
      /* the stabiliser bar, across the blades, and its weights */
      var b2 = a + PI / 2, half = 1.378;
      var wgt = cyl(0.055, 0.055, 0.34, 10, "x", half - 0.17, 0, BARZ); wgt.rotateZ(b2); hubD.push(wgt);
      var tipc = sph(0.055, 8, 4, half, 0, BARZ, 0.6, 1, 1); tipc.rotateZ(b2); hubD.push(tipc);
      var dmp = bar([0.14, 0.05, BARZ - 0.02], [0.30, 0.10, -0.06], 0.03, 6, true); dmp.rotateZ(b2); hubD.push(dmp);
      var mix = box(0.30, 0.05, 0.05, 0.36, 0, BARZ - 0.02); mix.rotateZ(b2); hubM.push(mix);
    }
    var rod = cyl(0.022, 0.022, 2.40, 8, "x", 0, 0, BARZ); rod.rotateZ(BA + PI / 2); hubM.push(rod);
    hubM.push(box(0.20, 0.16, 0.10, 0, 0, BARZ));                        /* bar pivot    */
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD.concat(blades), T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(VR.R, 48), 0, 0, 0.04)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       At the top of the fin, on the port side (D, H) or the starboard side
       (N). The mount turns local +Z out to that side; render3d.js turns the
       rotor positively about it. Two blades on a teetering yoke, one built
       straight aft (WHAT SETS THE SCALE). */
    var tm = new V.Group();
    tm.position.set(TR_X, VR.trSide * TR_OUT, Z(TR_H));
    tm.rotation.x = -VR.trSide * PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trv = [], hubC = 0x5c6266, bladeC = 0x2e302e;
    trv.push([cyl(0.075, 0.08, 0.14, 12, "z", 0, 0, 0.03), hubC]);
    trv.push([cyl(0.045, 0.02, 0.08, 8, "z", 0, 0, 0.14), hubC]);
    trv.push([box(0.40, 0.09, 0.06, 0, 0, 0.03), hubC]);
    for (k = 0; k < 2; k++) {
      var tang = (180 + 180 * k) * D2R;
      var tipL = VR.trTip ? 0.20 : 0;
      var tb = box(TR_R - 0.20 - tipL, VR.trChord, 0.028, 0.20 + (TR_R - 0.20 - tipL) / 2, 0, 0.03);
      tb.rotateX(6 * D2R); tb.rotateZ(tang);
      trv.push([tb, bladeC]);
      if (VR.trTip) {
        var tt = box(tipL, VR.trChord, 0.028, TR_R - tipL / 2, 0, 0.03);
        tt.rotateX(6 * D2R); tt.rotateZ(tang);
        trv.push([tt, VR.trTip]);
      }
      /* the pitch links from the crosshead */
      var plk = bar([0.03, 0.06, 0.12], [0.20, VR.trChord * 0.5, 0.05], 0.012, 5, true);
      plk.rotateZ(tang);
      trv.push([plk, hubC]);
    }
    meshVC(trot, trv, T.trvc, "tailrotor_parts");
    return g;
  }

  function variant(k) { return function (THREE, M, C) { return build(THREE, M, C, VARIANTS[k]); }; }
  return { uh1d: variant("uh1d"), uh1dg: variant("uh1dg"), uh1h: variant("uh1h"), uh1n: variant("uh1n") };
})();

/* len is the MEASURED x extent, rotor disc front to the tip of the aft tail
   rotor blade; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["nato_e60_transport"] = { len: 17.37, build: HeroUH1.uh1d };
UNIT_MODELS["deu_e60_transport"]  = { len: 17.37, build: HeroUH1.uh1dg };
UNIT_MODELS["roc_e60_transport"]  = { len: 17.37, build: HeroUH1.uh1h };
UNIT_MODELS["roc_e80_transport"]  = { len: 17.37, build: HeroUH1.uh1h };
UNIT_MODELS["roc_e90_transport"]  = { len: 17.37, build: HeroUH1.uh1h };
UNIT_MODELS["nato_e60_uh1n"]      = { len: 17.39, build: HeroUH1.uh1n };
