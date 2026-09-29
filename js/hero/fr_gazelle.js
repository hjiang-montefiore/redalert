/* ======= fr_gazelle.js - HERO models: Aerospatiale SA 341F / SA 342M / SA 342M1 Gazelle =======
   France's gunship for three eras. Until this file the three defs had no
   model of their own, so render3d.js modelKeyFor fell back to helo_n and
   drew a Longbow Apache, repainted by ERA_KIT, for a two-tonne scout with a
   glass nose. Each def now has its own key, so modelKeyFor returns the def
   id and render3d applies no ERA_KIT repaint or kit: the period paint is
   built into each variant here.

     fra_e60_gunship  SA 341F HOT  vert armee, four HOT, APX M397 roof sight;
                                   the markings as delivered, a roundel
                                   mid-boom (see THE e60 FIT)
     fra_e80_gunship  SA 342M      vert armee as delivered from 1980, four HOT,
                                   M397, the SA 342's Doppler fairing and
                                   square manhole; "armee de TERRE" on the boom
                                   and the army's sticker on the fin from 1981
     fra_e90_gunship  SA 342M1     Centre-Europe three-tone, four HOT, Viviane
                                   roof sight, AS 555 Fennec main blades (0.35 m
                                   chord against the Gazelle blade's 0.28 m,
                                   measured off the drawing's plan), and the
                                   wire strike cutters

   References. Dimensions are the ALAT's own data sheets for the SA 341F and
   the SA 342M (alat.fr, "Presentation de la Gazelle"), which agree with
   the French Wikipedia (from the MAT 8711 manual) and Wikipedia:
     length           11.97 m   rotors turning
     fuselage          9.53 m   nose to the back of the Fenestron shroud
     height            3.19 m   overall, to the top of the fin; 2.72 m to the
                                top of the rotor head
     main rotor       10.50 m   three blades, turning CLOCKWISE seen from
                                above as every Sud / Aerospatiale rotor does
     Fenestron         0.69 m   the shrouded fan in the fin (0.695 m in some
                                sheets), thirteen blades counted off the
                                Commons photograph "Fenestron.jpg"
     width             2.04 m   blades folded, i.e. over the skids
   Stations were measured off the Commons orthographic drawing "Aerospatiale
   SA 342 Gazelle orthographical image.svg". Its side view is exact: scaled
   on the 9.53 m fuselage it puts the rotor head top at 2.72 m and the fin
   top at 3.19 m, the two published heights, to the centimetre. Its plan
   and front views are not self-consistent (the plan is 10 % too wide for
   the 2.04 m width), so widths come from the plan's SHAPE scaled to that
   width, which the older Commons "3-view line drawing" confirms: a cabin
   1.42 m across, skids 1.95 m apart, a 1.78 m tailplane. Fittings were
   read off Commons photographs: SA 341F2 "BOO" in the Gulf in 1990 (the
   vert armee scheme); SA 342M "AEH" at RIAT 1991 and "BQN" of the 5e RHC
   in 1998 (the HOT station, the M397 and where it sits, the fin sticker,
   the size of the boom lettering); "ATL" at Schoenefeld in June 1992 (the
   M397 head-on, and the upper wire cutter); SA 342M1 "BXE" at RIAT 1998,
   "GBJ" at Nancy, "GAY", "GBF" at RIAT 2013 and "CXF" at Radom 2005 (the
   Viviane head and the three-tone scheme); "Aerospatiale Gazelle
   engine.jpg" (the Astazou and its annular intake screen).

   What the ALAT pages say, and the model follows:
     - the chef de bord, who is also the gunner, sits in the LEFT seat, and
       the M397 and later the Viviane head are mounted on the cabin roof
       above him (+Y side here). In the photographs the M397's drum stands
       over the front third of the front door, about 1.5 m ahead of the mast;
     - the four HOT tubes sit on individual launch rails, in pairs either
       side of the fuselage, on a cylindrical beam that passes through the
       fuselage behind the cabin. The SA 341F HOT and the SA 342M carry the
       same installation ("sans changement par rapport a la SA341 F");
     - both types were delivered in uniform "vert armee" HRI, the SA 341F
       from 1973 and the SA 342M from 1980, with a roundel centred on each
       side of the boom. From May 1981 "armee de TERRE" runs along the boom,
       the roundel moves forward ahead of it and the fin carries the army's
       blue-white-red sticker, an upright oval (on "AEH"). The three-tone
       Centre-Europe scheme (green, brown, black) came in from 1985;
     - Viviane: trials from June 1990, 72 conversions delivered from 1996,
       and every Viviane got AS 555 Fennec main blades for the extra weight;
     - the SA 342 has a Doppler antenna fairing under the root of the tail
       boom and a square manhole on the right side behind the cabin; the
       SA 341F has neither fairing, and a round manhole;
     - the fleet's night-vision refit, which the ALAT dates to the mid-1990s,
       brought two wire strike cutters, over the windscreen and under the
       chin. "ATL" already carries the upper one in June 1992, so cutters
       are a 1990s fit: the e90 machine has them and the e80 does not.

   CORRECTIONS to the brief this model was built from:
     - fra_e90 was to wear the Gulf War "Daguet" desert scheme. The ALAT did
       not repaint its Gazelles for the Gulf: the only Gulf markings it
       lists are three white bands round the boom and under the cabin, and
       the Commons photographs of SA 341F2 "BOO" over the Saudi desert show
       it in vert armee. Viviane itself entered service in 1996, five years
       after the war. A 1990s Viviane Gazelle wears the three-tone
       Centre-Europe scheme, as "BXE" does at RIAT 1998, so that is what
       fra_e90 wears here, green the largest share of it as on "BXE",
       "AEH" and "BQN".
     - the Viviane head is a box on a pedestal above the LEFT seat and sits
       over the front of the cabin, 1.0-1.65 m ahead of the mast; the M397
       is a smaller head in the same place. Confirmed, as briefed.
     - two HOT tubes a side are side by side, not stacked, on rails on the
       beam behind the cabin. Confirmed, with the station corrected: the
       tubes run from the rear door frame 1.3 m aft, not along the cabin.
     - fra_e60 was to carry AS.11 on side rails: see THE e60 FIT.

   THE e60 FIT. The def was written as "SA 341F Gazelle with AS.11". The
   AS.11 is a Gazelle weapon only on paper (Aerospatiale's list gives "four
   AS.11 or two AS.12"); the ALAT never flew it on a Gazelle, and no
   photograph of one was found. Its 1970s anti-tank helicopter was the
   Alouette III with AS.11 and an APX-Bezu 260 sight, and the Gazelle that
   replaced it was the SA 341F HOT "jour": "presentee des 1975, comme la
   solution au remplacement des ALOUETTE III SS-11 ... entrees en service
   des 1978", with "le viseur APX M397 ... monte sur le toit de la cabine"
   and the four tubes on the beam behind the cabin (alat.fr). That is the
   ALAT's armed Gazelle of the 1960s-70s era, so e60 is drawn as it: the
   SA 341F airframe (no Doppler fairing, round manhole) in the vert armee
   and markings of 1978-81, with the HOT station and the M397 of the SA 342M.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   under the mast about where the machine balances, 1.15 m above the skid
   soles (GROUND). render3d.js stands the model up with rotation.x = -PI/2
   and rescales it by the measured X extent.

   WHAT SETS THE SCALE. The faint rotor disc reaches 5.25 m ahead of the
   hub, and the back of the Fenestron shroud is 6.71 m behind it, so the X
   extent is 11.96 m, the published 11.97 m with rotors turning. The
   blades sit as a parked Gazelle's do, one straight aft over the boom and
   two at 60 degrees either side of the nose; inside the disc, so blade
   phase never sets the scale.

   NAMED NODES:
     rotor      the pact_e20_gunship_mi28n.js mount: a group turned -PI/2
                about X, so the head's local +Y - the axis render3d.js
                turns it about, being the one of its own axes that lies
                along the mast - points DOWN the mast and the head turns
                clockwise from above, as a Sud rotor does. A +PI/2 group
                inside puts the head back into model axes.
     rotordisc  inside the rotor, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
   There is no "tailrotor". render3d.js used to apply a tail rotor's axis
   in the rotor's PARENT frame, which matched the shaft only at headings 0
   and 180 degrees. An open tail rotor that tumbles at other headings is a
   wobble; a fan in a 0.34 m-thick shroud that tumbles cuts out through
   both faces of the fin (measured: its blades reached 0.35 m off the duct
   plane at headings 45 and 90, against the shroud's 0.17 m
   half-thickness), which breaks the one feature a player reads the
   Gazelle by. A 0.7 m fan at 5,800 rpm is a blur at any zoom, so it stays
   still, as the parametric fenestron in rotor3d.js does, and its hub and
   blades are merged into the fittings meshes, two draw calls (and two
   shadow draws) fewer per Gazelle on screen. Turned, thirteen sharp
   blades would not blur either: at the renderer's 40 rad/s tail-rotor
   rate a blade moves 38.2 deg a frame at 60 fps against a 27.7 deg
   pitch, so the fan would seem to creep forward 10.5 deg a frame (and
   back 6.7 at 30 fps). The fan is built in the asw_helo_fit.js tail mount
   all the same (+PI/2 about X, axis along local Z, the lateral axis), and
   render3d.js now turns every part about its own shaft: set FAN_SPINS
   below to true and it becomes a "tailrotor" node of its own that turns
   inside its shroud (tools/jsc/rotor_axes_check.js builds it that way and
   holds it to the slab it fills at rest, at every heading, nosed up and
   banked).
   There is no "gear" (the skids are fixed) and no "turret".

   Materials are the house tiers: SKIN (one procedural CanvasTexture per
   paint scheme, roughness 0.86, metalness 0.08), METAL and DARK fittings,
   the BLADE composite, STORES olive (the HOT tubes and the M397 head),
   GLASS, the TEAM flash and the DISC. Eight in all, in six airframe
   meshes and four in the rotor head: ten draw calls. The skin UVs are
   projected from model space by face normal (top, port, starboard, belly
   bands of one sheet), so a camouflage patch is the same size in metres
   on the boom as on the cabin. The first build in a session paints its
   scheme's sheet and casts the rays that seat the windows: 77-168 ms
   under jsc, against helo_n's 26-57 ms first build. Later builds reuse
   both: 7-20 ms, as helo_n's 10-28 ms do. render3d.js builds once per
   key, team and era.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroGazelle = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* x is measured from the mast, forward positive; heights above the skid
     soles. Every number two parts must agree on lives here. */
  var GROUND  = -1.15;
  function Z(h) { return GROUND + h; }
  var HUB_H   =  2.64;                     /* blade plane; head top 2.72  */
  var ROTOR_R =  5.25;                     /* 10.50 m disc                */
  var TR_X = -5.88, TR_H = 1.68;           /* Fenestron axis              */
  var TR_R    =  0.3475;                   /* 0.695 m fan                 */
  var SKID_Y  =  0.975, SKID_R = 0.045;    /* 2.04 m over the skids       */
  var XS_FWD = 0.87, XS_AFT = -0.26;       /* cross-tube stations         */
  var STAB_H  =  1.47;                     /* tailplane mid-plane         */
  var STAB_Y  =  0.89;                     /* 1.78 m over the endplates   */
  var BEAM_X = -0.22, BEAM_H = 0.92;       /* the weapons beam            */

  /* render3d.js spins a "tailrotor" about its own shaft, so true makes the
     Fenestron fan one that turns true in its shroud; see NAMED NODES for
     why it stands still. */
  var FAN_SPINS = false;

  /* ---- the three variants: what each era's def actually flew ---- */
  var FITS = {
    fra_e60_gunship: { name: "SA 341F HOT", scheme: "va", arms: "hot", sight: "m397",
                       doppler: false, manhole: "round", chord: 0.28, blade: 0x2c302e,
                       marks: 1978 },
    fra_e80_gunship: { name: "SA 342M", scheme: "va", arms: "hot", sight: "m397",
                       doppler: true, manhole: "square", chord: 0.28, blade: 0x2c302e,
                       marks: 1981 },
    fra_e90_gunship: { name: "SA 342M1", scheme: "ce", arms: "hot", sight: "viviane",
                       doppler: true, manhole: "square", chord: 0.35, blade: 0x3a3f40,
                       marks: 1981, cutters: true },
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     projUV() below picks the band from each triangle's face normal. The
     port band is seen from the left, where the nose is to the viewer's
     LEFT, so lettering there is painted mirrored to read the right way. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -7.0, UX1 = 3.1;               /* x covered across the sheet  */
  var QY = 1.3;                            /* |y| covered by top/belly    */
  var QZ0 = GROUND - 0.12, QZ1 = 2.18;     /* z covered by the side bands */
  var SX = TW / (UX1 - UX0);               /* px per metre along x        */
  var SZ = BAND / (QZ1 - QZ0);             /* px per metre up a side band */
  var SQ = BAND / (2 * QY);                /* px per metre across top     */
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyH(h, b)    { return pySide(Z(h), b); }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  /* The ALAT's "vert armee" HRI and the Centre-Europe three tones. The
     hexes sit darker than the paint chips, because the ACES pass lifts
     untextured mid tones by about 1.8x. */
  var VA = "#3d4331", VA_L = "#474e3a", VA_D = "#333928";
  var CE_G = "#3e4930", CE_B = "#523c29", CE_K = "#1e1f1b";

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* the French roundel: blue centre, white, red outside. rx and ry are
     its radius in pixels along the sheet's two axes. */
  function roundel(g, cx, cy, rx, ry) {
    var ring = [["#b8262c", 1.0], ["#e4e4dc", 0.67], ["#21398a", 0.34]];
    for (var i = 0; i < ring.length; i++) {
      g.fillStyle = ring[i][0];
      g.beginPath(); g.ellipse(cx, cy, rx * ring[i][1], ry * ring[i][1], 0, 0, PI * 2); g.fill();
    }
  }
  /* "armee de TERRE" on the boom, from just behind the roundel to the
     tailplane: 2.5 m long, capitals 0.3 m tall, filling most of the boom's
     depth as on "AEH" and "BXE". The army's lettering is narrower than a
     canvas sans, so the em is 0.40 m and the run is squeezed to 78 %.
     It follows the boom's centreline, which climbs 0.11 m for every metre
     aft. Mirrored on the port band so it reads nose-first from the left,
     as on the aircraft. */
  function boomTitle(g, x, h, b) {
    var px = 0.40 * SZ, cx = pxX(x), cy = pyH(h, b);
    g.save();
    g.translate(cx, cy);
    g.rotate(Math.atan(0.11 * SZ / SX));
    g.scale((b === 1 ? -1 : 1) * 0.78 * SX / SZ, 1);
    g.font = "bold " + px.toFixed(1) + "px sans-serif";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = "#e8e8e0";
    g.fillText("arm" + String.fromCharCode(0xe9) + "e de TERRE", 0, 0);
    g.restore();
  }
  /* The army's blue-white-red sticker on the fin from May 1981: an upright
     oval, 0.19 m by 0.31 m, pale, with the tricolour standing up in it
     (on "AEH"). cx, cy are its centre in pixels. */
  function finSticker(g, cx, cy) {
    var rx = 0.095 * SX, ry = 0.155 * SZ;
    g.fillStyle = "#c9ccc8";
    g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, PI * 2); g.fill();
    g.fillStyle = "#8e959a";
    g.beginPath(); g.ellipse(cx, cy, rx * 0.84, ry * 0.88, 0, 0, PI * 2); g.fill();
    var bw = rx * 0.30, bh = ry * 1.20, y0 = cy - ry * 0.62;
    g.fillStyle = "#21398a"; g.fillRect(cx - 1.5 * bw, y0, bw, bh);
    g.fillStyle = "#ecece6"; g.fillRect(cx - 0.5 * bw, y0, bw, bh);
    g.fillStyle = "#b8262c"; g.fillRect(cx + 0.5 * bw, y0, bw, bh);
  }

  function skinCanvas(F) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(F.scheme === "ce" ? 3421 : 3410);
    var i, b, x, y;

    if (F.scheme === "ce") {
      /* ---- Centre-Europe, from 1985: green, brown and black in broad
         disruptive bands that cross the airframe on the slant, their edges
         wandering, sprayed band by band so the two sides are not mirror
         images. Green is the largest share, as on "BXE", "AEH" and "BQN".
         The bands repeat every 1.7-2.8 m in the order brown, green, black,
         green, at 35, 24, 19 and 22 % of each repeat, so every stretch of
         boom and cabin carries all three colours in those shares whatever
         the random numbers do; a scatter of random patches does not, and
         can leave the top of the machine, which is what the camera sees,
         half brown. Baked onto the model and seen from above or either
         side, the bands measure 45-48 % green, 32-38 % brown and 15-22 %
         black. */
      g.fillStyle = CE_G; g.fillRect(0, 0, TW, TH);
      var SEQ = [[CE_B, 0.35], [CE_G, 0.24], [CE_K, 0.19], [CE_G, 0.22]], NV = 9;
      for (b = 0; b < 4; b++) {
        var sy = (b === 0 || b === 3) ? SQ : SZ, hM = BAND / sy;    /* band height in metres */
        var tilt = (b & 1 ? 1 : -1) * (0.35 + R() * 0.35);
        /* a boundary: its x at NV heights down the band, tilted and wandering */
        var edge = function (u0, amp, after) {
          var t2 = tilt + (R() - 0.5) * 0.9, out = [];
          for (var q = 0; q < NV; q++) {
            var e2 = u0 + t2 * (q / (NV - 1) - 0.5) * hM + (R() - 0.5) * 2 * amp;
            /* never closer than 0.1 m to the edge before it, so no band
               pinches off or crosses its neighbour */
            out.push(after ? Math.max(e2, after[q] + 0.10) : e2);
          }
          return out;
        };
        g.save();
        g.beginPath(); g.rect(0, b * BAND, TW, BAND); g.clip();
        var u = UX0 - 1.2 - R() * 1.5, prev = edge(u, 0.10, null), si = Math.floor(R() * 4);
        while (u < UX1 + 1.2) {
          var P = 1.7 + R() * 1.1, st2 = SEQ[si % 4], w2 = P * st2[1];
          u += w2;
          var next = edge(u, Math.min(0.30, w2 * 0.45), prev);
          if (st2[0] !== CE_G) {
            g.fillStyle = st2[0];
            g.beginPath();
            for (var q2 = 0; q2 < NV; q2++) {
              var yy2 = b * BAND + BAND * q2 / (NV - 1);
              if (q2) g.lineTo(pxX(prev[q2]), yy2); else g.moveTo(pxX(prev[q2]), yy2);
            }
            for (q2 = NV - 1; q2 >= 0; q2--) g.lineTo(pxX(next[q2]), b * BAND + BAND * q2 / (NV - 1));
            g.closePath(); g.fill();
          }
          prev = next; si++;
        }
        g.restore();
      }
    } else {
      /* ---- vert armee HRI, as delivered: one flat army green all over,
         top and belly alike. Repainted access panels come up a shade
         lighter or darker than their neighbours. */
      g.fillStyle = VA; g.fillRect(0, 0, TW, TH);
      for (i = 0; i < 120; i++) {
        var pw = (0.3 + R() * 1.0) * SX, ph = 10 + R() * 30;
        g.fillStyle = (i & 1) ? VA_L : VA_D;
        g.globalAlpha = 0.22 + R() * 0.30;
        g.fillRect(R() * TW, R() * TH, pw, ph);
      }
      g.globalAlpha = 1;
    }

    /* sun on the top band, grime down the sides and over the belly */
    g.fillStyle = "rgba(255,255,236,0.045)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 150; i++) {
      g.fillStyle = "rgba(20,20,16," + (0.04 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 8 + R() * 36);
    }
    for (i = 0; i < 80; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 80, 6 + R() * 18);
    }

    /* ---- Astazou soot. The jet pipe blows aft and a little up over the
       boom, so the stain lies along the boom top and its upper flanks
       behind x -2.4, fading by the tailplane. */
    var sg = g.createLinearGradient(pxX(-2.3), 0, pxX(-4.6), 0);
    sg.addColorStop(0, "rgba(16,15,13,0.55)");
    sg.addColorStop(1, "rgba(16,15,13,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-4.6), pyTop(0.34), pxX(-2.3) - pxX(-4.6), pyTop(-0.34) - pyTop(0.34));
    for (b = 1; b <= 2; b++)
      g.fillRect(pxX(-4.6), pyH(1.62, b), pxX(-2.3) - pxX(-4.6), pyH(1.30, b) - pyH(1.62, b));

    /* ---- panel seams: frames at the real stations, stringers at the
       door sills and along the boom */
    var frames = [2.20, 1.62, 0.95, 0.50, 0.12, -0.58, -1.10, -1.95, -2.80,
                  -3.60, -4.40, -5.00];
    g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.05)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.3;
    [0.79, 1.26].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pyH(h, bb);
        g.beginPath(); g.moveTo(pxX(-1.1), yy); g.lineTo(pxX(2.3), yy); g.stroke();
      }
    });
    [-0.20, 0.20].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-5.3), yy); g.lineTo(pxX(-1.1), yy); g.stroke();
    });
    /* the door outlines below the glass, both sides: front door from the
       glazing's diagonal to the B pillar, rear door to the cabin's back */
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 2.0;
      g.strokeRect(pxX(0.50), pyH(1.78, b), pxX(0.95) - pxX(0.50), pyH(0.42, b) - pyH(1.78, b));
      g.beginPath();
      g.moveTo(pxX(0.95), pyH(0.42, b)); g.lineTo(pxX(2.20), pyH(0.42, b));
      g.moveTo(pxX(0.95), pyH(0.79, b)); g.lineTo(pxX(2.09), pyH(0.79, b));
      g.stroke();
      /* door handles */
      g.fillStyle = "rgba(170,170,160,0.55)";
      g.fillRect(pxX(1.02), pyH(0.72, b), 6, 2);
      g.fillRect(pxX(0.57), pyH(1.00, b), 6, 2);
    }
    /* access hatches and inspection panels on the aft fuselage and boom */
    g.lineWidth = 1.2;
    for (i = 0; i < 40; i++) {
      var hx = pxX(-5.0 + R() * 5.2), hy = BAND + R() * 2 * BAND, hw = 10 + R() * 26, hh = 8 + R() * 16;
      g.strokeStyle = "rgba(0,0,0,0.32)"; g.strokeRect(hx, hy, hw, hh);
    }
    /* the manhole on the RIGHT side behind the cabin: round on the SA 341,
       square on the SA 342 (the ALAT's own recognition note) */
    g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
    if (F.manhole === "round") {
      g.beginPath(); g.ellipse(pxX(0.15), pyH(1.02, 2), 0.16 * SX, 0.16 * SZ, 0, 0, PI * 2); g.stroke();
    } else {
      g.strokeRect(pxX(0.30), pyH(1.18, 2), 0.30 * SX, 0.30 * SZ);
    }

    /* ---- national markings. As delivered (the SA 341F from 1973, the
       SA 342M from 1980): a roundel centred on each side of the boom and
       nothing else. From May 1981: "armee de TERRE" along the boom with
       the roundel moved ahead of it, and the army's sticker on the fin. */
    for (b = 1; b <= 2; b++) {
      if (F.marks < 1981) {
        roundel(g, pxX(-3.40), pyH(1.28, b), 0.19 * SX, 0.19 * SZ);
      } else {
        roundel(g, pxX(-2.10), pyH(1.14, b), 0.19 * SX, 0.19 * SZ);
        boomTitle(g, -3.70, 1.31, b);
        finSticker(g, pxX(-6.20), pyH(2.78, b));
      }
    }
    return cv;
  }

  var _cv = {}, _tex = {};                 /* module scope: one per scheme */
  var _hits = {};                          /* rays onto the loft, see build */
  function skinTexture(F) {
    var key = F.scheme + F.manhole + F.marks;
    if (_tex[key] !== undefined) return _tex[key];
    try {
      if (!_cv[key]) _cv[key] = skinCanvas(F);
      var t = new V.CanvasTexture(_cv[key]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[key] = t;
    } catch (e) { _tex[key] = false; }
    return _tex[key];
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft (the nose, the intake, the tube ends) would collapse to a line
     under an x projection, so they are laid out along x + y. */
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
  function makeMats(C, F) {
    var tex = skinTexture(F);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(F.scheme === "ce" ? 0x3e4930 : 0x3d4331);
    m.metal = new V.MeshStandardMaterial({ color: 0x5a6064, roughness: 0.46, metalness: 0.62 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.66, metalness: 0.32 });
    /* composite blades weathered flat; the Fennec blades are a lighter grey */
    m.blade = new V.MeshStandardMaterial({ color: F.blade, roughness: 0.80, metalness: 0.08 });
    /* HOT tubes, AS.11 rounds and their rails: ordnance olive */
    m.store = new V.MeshStandardMaterial({ color: 0x4a5139, roughness: 0.80, metalness: 0.10 });
    /* the Gazelle's glazing is clear perspex; from outside and above it
       reads as the dark cabin behind it, with a hard sheen */
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1e2c33, roughness: 0.06, metalness: 0.20,
                                           clearcoat: 1.0, clearcoatRoughness: 0.05 });
    /* exactly C.team, with an emissive lift so ACES does not grey it out */
    var tc = (C && C.team !== undefined) ? C.team : "#5f7fd6";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
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
  /* a light square-section bar for frames that lie on the skin */
  function rail(p, q, r) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) + r;
    var g = new V.CylinderGeometry(r, r, L, 4, 1, true);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / (L - r), dy / (L - r), dz / (L - r))));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  /* A round tube swept along a polyline that bends in one plane, whose
     normal is ref: one ring of seg corners at every point, capped at both
     ends. Each ring is built on u = ref x t and v = t x u, so u x v = t and
     the quads (a0, a1, b1)(a0, b1, b0) face outward. */
  function pipe(pts, r, seg, ref) {
    function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function nrm(a) { var l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
    function crs(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    var n = pts.length, rings = [], i, k, t0 = null, tN = null;
    for (i = 0; i < n; i++) {
      var t;
      if (i === 0) t = nrm(sub(pts[1], pts[0]));
      else if (i === n - 1) t = nrm(sub(pts[n - 1], pts[n - 2]));
      else { var t1 = nrm(sub(pts[i], pts[i - 1])), t2 = nrm(sub(pts[i + 1], pts[i])); t = nrm([t1[0] + t2[0], t1[1] + t2[1], t1[2] + t2[2]]); }
      if (i === 0) t0 = t;
      if (i === n - 1) tN = t;
      var u = nrm(crs(ref, t)), v = crs(t, u), ring = [];
      for (k = 0; k < seg; k++) {
        var an = 2 * PI * k / seg, c = Math.cos(an), sn = Math.sin(an);
        var d = [c * u[0] + sn * v[0], c * u[1] + sn * v[1], c * u[2] + sn * v[2]];
        ring.push({ p: [pts[i][0] + r * d[0], pts[i][1] + r * d[1], pts[i][2] + r * d[2]], n: d });
      }
      rings.push(ring);
    }
    var P = [], N = [];
    function tri(A, B, Cc) { [A, B, Cc].forEach(function (q) { P.push(q.p[0], q.p[1], q.p[2]); N.push(q.n[0], q.n[1], q.n[2]); }); }
    for (i = 0; i < n - 1; i++) for (k = 0; k < seg; k++) {
      var a0 = rings[i][k], a1 = rings[i][(k + 1) % seg], b0 = rings[i + 1][k], b1 = rings[i + 1][(k + 1) % seg];
      tri(a0, a1, b1); tri(a0, b1, b0);
    }
    var c0 = { p: pts[0], n: [-t0[0], -t0[1], -t0[2]] }, cN = { p: pts[n - 1], n: tN };
    for (k = 0; k < seg; k++) {
      var s0 = rings[0][k], s1 = rings[0][(k + 1) % seg], e0 = rings[n - 1][k], e1 = rings[n - 1][(k + 1) % seg];
      tri(c0, { p: s1.p, n: c0.n }, { p: s0.p, n: c0.n });
      tri(cN, { p: e0.p, n: cN.n }, { p: e1.p, n: cN.n });
    }
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(P, 3));
    g.setAttribute("normal", new V.Float32BufferAttribute(N, 3));
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
  /* flat-shaded triangles from a list of corners, three per triangle */
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* A convex solid from its faces, each wound so its normal points away
     from the solid's centre. */
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
        var o = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
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
  /* six-cornered aerofoil: le and te are [x, z]; at(x, z, k) lays the
     thickness k out into a model-space point */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }
  /* a thin plate from an outline in the XZ plane (x, height above ground),
     t thick, centred on y0 */
  function plate(pts, t, y0) {
    var sh = new V.Shape(), i;
    sh.moveTo(pts[0][0], Z(pts[0][1]));
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], Z(pts[i][1]));
    sh.closePath();
    var bv = Math.min(0.012, t * 0.3);
    var g = new V.ExtrudeGeometry(sh, { depth: Math.max(0.002, t - 2 * bv), bevelEnabled: true,
      bevelThickness: bv, bevelSize: bv, bevelSegments: 1, curveSegments: 4 });
    g.rotateX(PI / 2);                       /* extrusion z -> model -y   */
    g.translate(0, (t - 2 * bv) / 2 + (y0 || 0), 0);
    return g;
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

  /* ---- the loft. A section is a rounded trapezoid: superelliptic above
     its widest line with exponent e, below it with eb (the Gazelle's cabin
     is broad and flat-roofed but round-bellied).
       zb, zt   belly and top          zm   height of the widest line
       wb, wt   half-widths toward the belly and the roof, wm the widest
     Heights are given ABOVE GROUND. Sections run nose to tail (decreasing
     x) and the quads are wound (a, c, b), which for that order puts every
     normal outward; the signed volume is checked positive in the tool. */
  function sec(x, zb, zt, zm, wb, wm, wt, e, eb) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e, eb: eb || e };
  }
  function lerpSec(A, B, f) {
    var o = {};
    ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "eb"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
    return o;
  }
  function secAt(list, x) {
    if (x >= list[0].x) return list[0];
    for (var q = 0; q < list.length - 1; q++) {
      var A = list[q], B = list[q + 1];
      if (x <= A.x && x >= B.x) return lerpSec(A, B, (A.x - x) / (A.x - B.x));
    }
    return list[list.length - 1];
  }
  /* the port-side point at angle th (-PI/2 belly .. PI/2 roof) */
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var ex = sn < 0 ? s.eb : s.e;
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), ex);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), ex), z];
  }
  /* The ring's port half, belly to roof, resampled to equal steps of arc
     length: an even angle step would bunch the corners of a flat-sided
     cabin at the roof and belly and leave its door panels one facet. */
  function ringOf(s, n) {
    var dense = [], len = [0], i, j, M = 160;
    for (i = 0; i <= M; i++) dense.push(ringPt(s, -PI / 2 + PI * i / M));
    for (i = 1; i <= M; i++) {
      var dy = dense[i][0] - dense[i - 1][0], dz = dense[i][1] - dense[i - 1][1];
      len.push(len[i - 1] + Math.sqrt(dy * dy + dz * dz));
    }
    var pts = [], L = len[M];
    for (i = 0, j = 1; i <= n; i++) {
      var want = L * i / n;
      while (j < M && len[j] < want) j++;
      var f = (want - len[j - 1]) / Math.max(1e-9, len[j] - len[j - 1]);
      pts.push([dense[j - 1][0] + (dense[j][0] - dense[j - 1][0]) * f,
                dense[j - 1][1] + (dense[j][1] - dense[j - 1][1]) * f]);
    }
    pts[0][0] = 0; pts[n][0] = 0;
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);
    return pts;
  }
  /* The loft as triangles, each handed to classify(centroid, normal),
     which names the list it goes to. Normals are smoothed across the
     whole loft first, so a window edge does not crease the skin. */
  function loftInto(secs, n, noseDx, tailDx, classify) {
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
    var P = geo.attributes.position.array, N = geo.attributes.normal.array;
    var buckets = {};
    function put(list, pts, nrm) {
      var bkt = buckets[list] || (buckets[list] = { p: [], n: [] });
      for (var q = 0; q < 3; q++) {
        bkt.p.push(pts[q][0], pts[q][1], pts[q][2]);
        bkt.n.push(nrm[q][0], nrm[q][1], nrm[q][2]);
      }
    }
    function faceN(A, B, Cc) {
      var ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2];
      var vx = Cc[0] - A[0], vy = Cc[1] - A[1], vz = Cc[2] - A[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      return [nx / l, ny / l, nz / l];
    }
    for (i = 0; i < idx.length; i += 3) {
      var pts = [], nrm = [];
      for (j = 0; j < 3; j++) {
        var v = idx[i + j];
        pts.push([P[v * 3], P[v * 3 + 1], P[v * 3 + 2]]);
        nrm.push([N[v * 3], N[v * 3 + 1], N[v * 3 + 2]]);
      }
      var cen = [(pts[0][0] + pts[1][0] + pts[2][0]) / 3, (pts[0][1] + pts[1][1] + pts[2][1]) / 3,
                 (pts[0][2] + pts[1][2] + pts[2][2]) / 3];
      put(classify(cen, faceN(pts[0], pts[1], pts[2])), pts, nrm);
    }
    /* domed end caps: a fan to a centre point pushed out along x */
    function cap(k, dx, front) {
      var s = secs[k], r = ringOf(s, n), cz = 0;
      for (j = 0; j < rl; j++) cz += r[j][1];
      var o = [s.x + dx, 0, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, r[j][0], r[j][1]], p1 = [s.x, r[(j + 1) % rl][0], r[(j + 1) % rl][1]];
        var t3 = front ? [o, p0, p1] : [o, p1, p0];
        var fn = faceN(t3[0], t3[1], t3[2]);
        var cen2 = [(o[0] + p0[0] + p1[0]) / 3, (o[1] + p0[1] + p1[1]) / 3, (o[2] + p0[2] + p1[2]) / 3];
        put(classify(cen2, fn), t3, [fn, fn, fn]);
      }
    }
    if (noseDx !== null) cap(0, noseDx, true);
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
    var out = {};
    Object.keys(buckets).forEach(function (k) {
      var g = new V.BufferGeometry();
      g.setAttribute("position", new V.Float32BufferAttribute(buckets[k].p, 3));
      g.setAttribute("normal", new V.Float32BufferAttribute(buckets[k].n, 3));
      out[k] = g;
    });
    return out;
  }

  /* ========================================================= the build == */
  function build(THREE, M, C, id) {
    V = THREE;
    var F = FITS[id] || FITS.fra_e80_gunship;
    var T = makeMats(C, F);
    var g = new V.Group();
    g.name = "gazelle";
    var i, k, a;
    var skin = [], glass = [], dark = [], metal = [], store = [], team = [];

    /* --------------------------------------------------- the fuselage ----
       A glass egg. The nose is the bubble: the whole front of the cabin
       glazed from the chin to the roof, back to the door's slanting front
       frame, with the battery hatch an opaque strip down the middle of the
       chin. The cabin is 1.42 m across, flat-roofed at 1.89 m and round in
       the belly at 0.36 m; behind the rear doors the top falls away under
       the gearbox and engine cowls, and the belly sweeps up into the tail
       boom, a tapered cone that is a little wider than it is deep. The boom
       ends inside the Fenestron shroud.
                    x     zb     zt     zm     wb     wm     wt     e    eb  */
    var CTL = [
      sec( 2.82, 0.84,  0.97,  0.905, 0.07,  0.11,  0.07,  0.90, 0.90),
      sec( 2.78, 0.71,  1.09,  0.91,  0.14,  0.21,  0.15,  0.85, 0.90),
      sec( 2.72, 0.64,  1.18,  0.92,  0.20,  0.30,  0.22,  0.75, 0.90),
      sec( 2.62, 0.565, 1.30,  0.94,  0.27,  0.40,  0.31,  0.64, 0.88),
      sec( 2.48, 0.505, 1.40,  0.96,  0.33,  0.50,  0.40,  0.56, 0.87),
      sec( 2.30, 0.445, 1.51,  0.99,  0.39,  0.585, 0.47,  0.50, 0.86),
      sec( 2.10, 0.41,  1.63,  1.01,  0.43,  0.645, 0.52,  0.47, 0.85),
      sec( 1.90, 0.40,  1.715, 1.03,  0.45,  0.685, 0.56,  0.46, 0.85),
      sec( 1.70, 0.39,  1.77,  1.05,  0.46,  0.705, 0.575, 0.45, 0.85),
      sec( 1.45, 0.38,  1.84,  1.06,  0.47,  0.71,  0.585, 0.45, 0.85),
      sec( 1.20, 0.37,  1.87,  1.07,  0.47,  0.71,  0.585, 0.45, 0.85),
      sec( 0.95, 0.365, 1.89,  1.07,  0.47,  0.70,  0.58,  0.45, 0.85),
      sec( 0.46, 0.36,  1.89,  1.07,  0.45,  0.665, 0.555, 0.45, 0.85),
      sec( 0.20, 0.37,  1.84,  1.07,  0.44,  0.645, 0.53,  0.47, 0.85),
      sec(-0.05, 0.385, 1.78,  1.07,  0.42,  0.63,  0.50,  0.48, 0.85),
      sec(-0.35, 0.43,  1.71,  1.08,  0.39,  0.595, 0.46,  0.50, 0.85),
      sec(-0.65, 0.50,  1.645, 1.10,  0.35,  0.55,  0.42,  0.52, 0.85),
      sec(-0.90, 0.56,  1.60,  1.11,  0.31,  0.505, 0.37,  0.55, 0.85),
      sec(-1.10, 0.62,  1.53,  1.10,  0.27,  0.455, 0.32,  0.58, 0.85),
      sec(-1.35, 0.68,  1.45,  1.08,  0.24,  0.41,  0.28,  0.62, 0.85),
      sec(-1.60, 0.73,  1.41,  1.08,  0.22,  0.37,  0.25,  0.65, 0.85),
      sec(-1.95, 0.79,  1.42,  1.11,  0.21,  0.335, 0.23,  0.67, 0.85),
      sec(-2.43, 0.87,  1.46,  1.17,  0.19,  0.31,  0.21,  0.70, 0.85),
      sec(-3.39, 1.01,  1.53,  1.275, 0.17,  0.275, 0.18,  0.72, 0.85),
      sec(-4.35, 1.16,  1.61,  1.385, 0.15,  0.235, 0.16,  0.74, 0.85),
      sec(-4.83, 1.23,  1.625, 1.43,  0.14,  0.215, 0.15,  0.75, 0.85),
      sec(-5.46, 1.32,  1.645, 1.48,  0.12,  0.185, 0.13,  0.77, 0.85),
    ];
    /* sample the control sections finely through the cabin, so the window
       edges fall on section lines rather than zig-zagging across them */
    var XS = [2.82, 2.79, 2.75, 2.69, 2.61, 2.50, 2.36, 2.20,
              2.06, 1.92, 1.78, 1.62, 1.46, 1.30, 1.14, 0.97, 0.92, 0.76, 0.62, 0.53,
              0.46, 0.20, -0.05, -0.35, -0.65, -0.90, -1.10, -1.35, -1.60, -1.95, -2.43,
              -3.10, -3.80, -4.35, -4.83, -5.46];
    XS.sort(function (p, q) { return q - p; });
    var FUS = [];
    for (i = 0; i < XS.length; i++) if (!i || XS[i] < XS[i - 1] - 0.01) FUS.push(secAt(CTL, XS[i]));
    function fusAt(x) { return secAt(FUS, x); }

    /* where the glazing is. Xd(h) is the slanting front frame of the door,
       from the chin 2.20 m ahead of the mast up to the roof at 1.80 m. */
    function Xd(h) { return h < 0.45 ? 2.20 : 2.20 - 0.31 * (h - 0.45); }
    function yIn(x) { return 0.10 + Math.max(0, Math.min(1.35, 1.90 - x)) * 0.15; }
    function classify(c, n) {
      var h = c[2] - GROUND, x = c[0], ay = Math.abs(c[1]);
      if (x > Xd(h)) {                                     /* the bubble  */
        if (ay < 0.17 && h < 1.10) return "skin";          /* battery hatch */
        return "glass";
      }
      return "skin";
    }
    var fl = loftInto(FUS, 12, 0.03, 0.05, classify);
    if (fl.skin) skin.push(fl.skin);
    if (fl.glass) glass.push(fl.glass);
    /* Anything laid on the skin - window panes, frames, the sight's foot -
       is placed by a ray onto the loft's own facets, which is the surface
       it has to clear; the analytic section lies inside the facets by up
       to 5 cm where the roof rounds over. Every variant has the same loft,
       so each hit is kept at module scope and cast only once. */
    var probe = null, RC = null, rOrg, rDir;
    function loftHit(x, y, z, dy, dz, lift) {
      var key = x.toFixed(4) + "," + y.toFixed(4) + "," + z.toFixed(4) + "," + dy + "," + dz;
      var hit = _hits[key];
      if (hit === undefined) {
        if (!probe) {
          probe = new V.Mesh(merge([fl.skin, fl.glass].filter(Boolean)),
                             new V.MeshBasicMaterial({ side: V.DoubleSide }));
          probe.updateMatrixWorld(true);
          RC = new V.Raycaster(); rOrg = new V.Vector3(); rDir = new V.Vector3();
        }
        RC.set(rOrg.set(x, y, z), rDir.set(0, dy, dz));
        var hh = RC.intersectObject(probe, false);
        hit = hh.length ? [hh[0].point.x, hh[0].point.y, hh[0].point.z,
                           hh[0].face.normal.x, hh[0].face.normal.y, hh[0].face.normal.z] : null;
        _hits[key] = hit;
      }
      if (!hit) return null;
      return [hit[0] + hit[3] * lift, hit[1] + hit[4] * lift, hit[2] + hit[5] * lift];
    }
    function loftY(x, z) { var q = loftHit(x, 3, z, -1, 0, 0); return q ? q[1] : 0; }
    function loftZ(x, y) { var q = loftHit(x, y, 5, 0, -1, 0); return q ? q[2] : Z(1.89); }

    /* The door windows and the roof panels over the front seats are glass
       laid 2 cm proud of the skin along its normal, sampled on the loft's
       own facets, so their edges are straight where the facets' are not.
       2 cm is what clears the facets' ridges between samples; the frames
       ride over the panes' edges. */
    function patch(list, nu, nv, at) {
      var P = [], i2, j2, out = [];
      for (i2 = 0; i2 <= nu; i2++) { P.push([]); for (j2 = 0; j2 <= nv; j2++) P[i2].push(at(i2 / nu, j2 / nv)); }
      for (i2 = 0; i2 < nu; i2++) for (j2 = 0; j2 < nv; j2++)
        out.push([P[i2][j2], P[i2 + 1][j2], P[i2 + 1][j2 + 1]], [P[i2][j2], P[i2 + 1][j2 + 1], P[i2][j2 + 1]]);
      var pts = [];
      out.forEach(function (t3) { pts.push(t3[0], t3[1], t3[2]); });
      var gg = tris(pts), nn = gg.attributes.normal.array, pp = gg.attributes.position.array, q;
      /* wind every facet to face away from the fuselage's axis */
      for (q = 0; q < pp.length; q += 9) {
        var cy3 = (pp[q + 1] + pp[q + 4] + pp[q + 7]) / 3, cz3 = (pp[q + 2] + pp[q + 5] + pp[q + 8]) / 3 - Z(1.07);
        if (nn[q + 1] * cy3 + nn[q + 2] * cz3 < 0) {
          for (var c3 = 0; c3 < 3; c3++) { var tt = pp[q + 3 + c3]; pp[q + 3 + c3] = pp[q + 6 + c3]; pp[q + 6 + c3] = tt; }
        }
      }
      gg.computeVertexNormals();
      both(list, gg);
    }
    function sideAt(x, h) { return loftHit(x, 3, Z(h), -1, 0, 0.02) || [x, 0.6, Z(h)]; }
    /* front door, two panes either side of its mid bar; rear door window */
    [[0.81, 1.22, 2], [1.30, 1.73, 5]].forEach(function (hp) {
      patch(glass, 5, hp[2], function (u, v) {
        var hh = hp[0] + (hp[1] - hp[0]) * v, x1 = Xd(hh) - 0.03;
        return sideAt(0.98 + (x1 - 0.98) * u, hh);
      });
    });
    patch(glass, 2, 5, function (u, v) { return sideAt(0.545 + 0.36 * u, 1.31 + 0.42 * v); });
    /* roof panels, wedges that narrow aft beside the central frame */
    patch(glass, 7, 4, function (u, v) {
      var xx = 0.58 + 1.30 * u, yy = yIn(xx) + (0.50 - yIn(xx)) * v;
      return loftHit(xx, yy, 5, 0, -1, 0.02) || [xx, yy, Z(1.89)];
    });

    /* --------------------------------------------------- canopy frames ---
       Painted frames over the glazing, riding 1 cm proud of the skin: the
       slanting door front frame and the arch over the windscreen, the B
       pillar and the rear door frame, the front door's mid bar, the sills
       and the central frame over the roof and down the nose. */
    var FR = 0.026;
    function onSide(x, h) { return loftHit(x, 3, Z(h), -1, 0, 0.022) || [x, 0.6, Z(h)]; }
    function onTop(x, y) { return loftHit(x, y, 5, 0, -1, 0.022) || [x, y, Z(1.89)]; }
    var fr = [];
    /* the slanting door front frame, chin to roof */
    var dp = [];
    for (k = 0; k <= 4; k++) { var hh = 0.42 + (1.74 - 0.42) * k / 4; dp.push(onSide(Xd(hh), hh)); }
    fr.push(dp);
    /* the arch over the windscreen top, across the roof */
    var arch = [];
    for (k = 0; k <= 4; k++) {
      var yy0 = 0.53 * (1 - k / 4);
      arch.push(onTop(1.80 + 0.14 * (k / 4), yy0));
    }
    fr.push([dp[dp.length - 1]].concat(arch));
    /* B pillar, rear door frame, rear door window sill */
    [0.95, 0.50].forEach(function (xp) {
      var col = [];
      for (k = 0; k <= 3; k++) col.push(onSide(xp, 0.42 + (1.78 - 0.42) * k / 3));
      fr.push(col);
    });
    fr.push([onSide(0.53, 1.30), onSide(0.73, 1.30), onSide(0.95, 1.30)]);
    /* the front door's mid bar and its sills */
    [0.79, 1.26].forEach(function (hb) {
      var row = [], x1 = Xd(hb);
      for (k = 0; k <= 3; k++) row.push(onSide(0.95 + (x1 - 0.95) * k / 3, hb));
      fr.push(row);
    });
    /* the cant rail along the top of the doors */
    var cant = [];
    for (k = 0; k <= 3; k++) cant.push(onSide(0.50 + (1.80 - 0.50) * k / 3, 1.76));
    fr.push(cant);
    for (k = 0; k < fr.length; k++) {
      var line = fr[k];
      for (i = 0; i < line.length - 1; i++) both(skin, rail(line[i], line[i + 1], FR));
    }
    /* the central frame, along the roof ridge and down the front of the
       bubble to the battery hatch */
    var ridge = [];
    [0.55, 0.95, 1.40, 1.80, 2.10, 2.40, 2.62, 2.73, 2.79].forEach(function (xr) {
      var sct = fusAt(xr);
      ridge.push([xr, 0, sct.zt + 0.012]);
    });
    ridge.push([2.832, 0, Z(1.02)]);
    for (i = 0; i < ridge.length - 1; i++) skin.push(rail(ridge[i], ridge[i + 1], 0.035));

    /* ------------------------------------------ gearbox and engine cowls --
       Over the rear of the cabin the main gearbox fairing, 0.53 m across,
       rises to 2.09 m round the mast. Behind it the Astazou lies along the
       top of the fuselage: the annular intake screen, dark, then the engine
       cowl, 0.55 m across, and the jet pipe blowing aft and a little up
       over the boom. A fairing closes the engine down onto the boom. */
    var COWL = [
      sec( 0.52, 1.80, 1.93, 1.87, 0.10, 0.14, 0.10, 0.80),
      sec( 0.48, 1.75, 2.02, 1.88, 0.16, 0.22, 0.17, 0.60),
      sec( 0.42, 1.70, 2.075, 1.88, 0.20, 0.255, 0.21, 0.50),
      sec( 0.30, 1.65, 2.09, 1.88, 0.21, 0.265, 0.22, 0.45),
      sec(-0.45, 1.55, 2.09, 1.85, 0.21, 0.265, 0.22, 0.45),
      sec(-0.60, 1.50, 2.07, 1.84, 0.20, 0.255, 0.21, 0.50),
      sec(-0.68, 1.48, 2.02, 1.84, 0.17, 0.22, 0.17, 0.60),
    ];
    var cw = loftInto(COWL, 10, 0.02, 0.02, function () { return "skin"; });
    skin.push(cw.skin);
    var EZ = Z(1.91);                              /* engine axis        */
    /* the annular intake screen: a drum of bright wire mesh */
    metal.push(cyl(0.235, 0.235, 0.44, 14, "x", -0.86, 0, EZ));
    skin.push(latheX([[-1.02, 0.0], [-1.02, 0.225], [-1.05, 0.262], [-1.12, 0.275],
                      [-1.60, 0.275], [-1.74, 0.250], [-1.86, 0.195], [-1.86, 0.0]], 12, 0, EZ));
    var EFAIR = [
      sec(-0.95, 1.40, 1.76, 1.58, 0.18, 0.21, 0.17, 0.60),
      sec(-1.80, 1.38, 1.72, 1.55, 0.14, 0.17, 0.13, 0.60),
      sec(-1.98, 1.40, 1.62, 1.51, 0.08, 0.10, 0.07, 0.80),
    ];
    var ef = loftInto(EFAIR, 8, 0.03, 0.03, function () { return "skin"; });
    skin.push(ef.skin);
    /* the jet pipe, 6 degrees up, and its soot-black mouth */
    var jp = cyl(0.125, 0.145, 0.62, 16, "x", 0, 0, 0, true);
    var jm = disc(0.13, 16, [-0.31, 0, 0], [-1, 0, 0]);
    var jl = inwardCyl(0.140, 0.10, 16, -0.26);
    [jp, jm, jl].forEach(function (q) { q.rotateY(6 * D2R); q.translate(-2.11, 0, Z(1.95)); });
    skin.push(jp); dark.push(jm); dark.push(jl);
    function inwardCyl(r, len, segs, x0) {
      var c = new V.CylinderGeometry(r, r, len, segs, 1, true);
      c.rotateZ(-PI / 2); c.translate(x0, 0, 0);
      var f = flat(c), p = f.attributes.position.array, nn = f.attributes.normal.array, t, q, tm;
      for (t = 0; t < p.length / 9; t++) for (q = 0; q < 3; q++) {
        tm = p[t * 9 + 3 + q]; p[t * 9 + 3 + q] = p[t * 9 + 6 + q]; p[t * 9 + 6 + q] = tm;
      }
      for (t = 0; t < nn.length; t++) nn[t] = -nn[t];
      return f;
    }
    /* the tail rotor drive shaft cover along the boom top. Aft of the
       roundel it runs down the middle of the team strip (see team
       flashes), so there it takes the team colour, or it would split the
       strip in two seen from above. */
    var shaftPts = [];
    [-1.95, -2.45, -2.9, -3.9, -4.9, -5.40].forEach(function (xs) { shaftPts.push([xs, 0, fusAt(xs).zt + 0.03]); });
    for (i = 0; i < shaftPts.length - 1; i++) {
      var s0 = shaftPts[i], s1 = shaftPts[i + 1];
      var ln = s0[0] - s1[0], ang = Math.atan2(s1[2] - s0[2], ln);
      (s0[0] > -2.4 ? skin : team).push(box(ln + 0.02, 0.09, 0.06, (s0[0] + s1[0]) / 2, 0, (s0[2] + s1[2]) / 2, 0, ang, 0));
    }
    /* SA 342 only: the Doppler antenna fairing under the root of the boom */
    if (F.doppler) {
      var dz = fusAt(-1.62).zb;
      skin.push(solid([[-1.30, 0.17, dz + 0.02], [-1.30, -0.17, dz + 0.02], [-1.30, -0.15, dz - 0.07], [-1.30, 0.15, dz - 0.07]],
                      [[-1.95, 0.15, dz + 0.02], [-1.95, -0.15, dz + 0.02], [-1.95, -0.13, dz - 0.05], [-1.95, 0.13, dz - 0.05]]));
    }
    /* the small ventral fin that guards the boom in a tail-low landing */
    skin.push(plate([[-3.46, 1.06], [-3.82, 1.08], [-3.75, 0.74], [-3.58, 0.74]], 0.035, 0));

    /* ----------------------------------------------------- the tail ------
       The Fenestron shroud: a thick lens of fin, 0.34 m through, round the
       0.695 m duct. Its outline is off the orthographic drawing; the duct
       mouth is a bell, 0.05 m bigger at the faces than in the middle,
       which is the bevel of the extrusion. Above it the swept fin rises to
       3.19 m, below it a swept ventral fin reaches down to 0.87 m. */
    var BEV = 0.05, BT = 0.06, SH_T = 0.34;
    var outline = [[-5.40, 1.37], [-5.40, 1.96], [-5.54, 2.16], [-6.40, 2.16], [-6.53, 1.88],
                   [-6.65, 1.57], [-6.48, 1.44], [-6.28, 1.33], [-5.95, 1.20], [-5.62, 1.25]];
    var shp = new V.Shape();
    shp.moveTo(outline[0][0], Z(outline[0][1]));
    for (i = 1; i < outline.length; i++) shp.lineTo(outline[i][0], Z(outline[i][1]));
    shp.closePath();
    /* the duct as twenty explicit corners: absarc closes the circle on a
       duplicate point, which leaves zero-area slivers in the wall */
    var hole = new V.Path(), HR = TR_R + 0.012 + BEV;
    for (i = 0; i < 20; i++) {
      var ha = -i * 2 * PI / 20;
      if (i) hole.lineTo(TR_X + HR * Math.cos(ha), Z(TR_H) + HR * Math.sin(ha));
      else hole.moveTo(TR_X + HR, Z(TR_H));
    }
    shp.holes.push(hole);
    var shroud = new V.ExtrudeGeometry(shp, { depth: SH_T - 2 * BT, bevelEnabled: true,
      bevelThickness: BT, bevelSize: BEV, bevelSegments: 2, curveSegments: 4 });
    shroud.rotateX(PI / 2);
    shroud.translate(0, (SH_T - 2 * BT) / 2, 0);
    skin.push(shroud);
    /* the upper fin: a swept aerofoil from the shroud to the 3.19 m tip */
    function finAt(x, z, kk) { return [x, kk, z]; }
    skin.push(solid(foil([-5.45, Z(2.10)], [-6.46, Z(2.10)], 0.13, finAt),
                    foil([-6.11, Z(3.19)], [-6.58, Z(3.18)], 0.07, finAt)));
    /* the ventral fin under the shroud */
    skin.push(plate([[-5.47, 1.28], [-5.75, 0.88], [-6.06, 0.88], [-6.36, 1.34]], 0.05, 0));
    /* the fixed arm that carries the fan's gearbox, running forward across
       the duct to its front wall */
    dark.push(box(0.26, 0.05, 0.07, TR_X + 0.24, -0.07, Z(TR_H)));
    /* the tailplane, 1.78 m over the endplates, just ahead of the shroud */
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + kk]; }; }
    both(skin, solid(foil([-4.93, 0], [-5.36, 0], 0.07, stabAt(0.10)),
                     foil([-4.95, 0], [-5.36, 0], 0.05, stabAt(STAB_Y - 0.01))));
    /* its endplates, swept, standing above and below it */
    both(skin, plate([[-5.22, 1.88], [-5.36, 1.88], [-5.29, 1.06], [-5.00, 1.06], [-4.88, 1.49]], 0.03, STAB_Y));

    /* ----------------------------------------------------- the skids -----
       Two tubes 1.95 m apart on two arched cross tubes, the front one
       under the front doors and the rear one just behind the mast. The
       skid runs 2.8 m from its turned-up toe to its tail; all of it is
       painted the airframe colour. */
    var sk = [[-0.95, SKID_Y, Z(0.075)], [-0.88, SKID_Y, Z(SKID_R)], [1.62, SKID_Y, Z(SKID_R)],
              [1.77, SKID_Y, Z(0.065)], [1.87, SKID_Y, Z(0.11)], [1.93, SKID_Y, Z(0.19)]];
    both(skin, pipe(sk, SKID_R, 8, [0, 1, 0]));
    [XS_FWD, XS_AFT].forEach(function (xc) {
      var inner = loftY(xc, Z(0.52));
      var ct = [[xc, SKID_Y, Z(0.07)], [xc, SKID_Y - 0.01, Z(0.20)], [xc, SKID_Y - 0.05, Z(0.31)],
                [xc, SKID_Y - 0.14, Z(0.40)], [xc, SKID_Y - 0.28, Z(0.46)], [xc, inner - 0.02, Z(0.52)]];
      both(skin, pipe(ct, 0.035, 7, [1, 0, 0]));
    });

    /* ------------------------------------------------------ the weapons --
       The beam: a tube through the fuselage behind the cabin (ALAT: "une
       poutre cylindrique traversante en arriere de la cabine"). Four HOT in
       their 1.3 m launch tubes, two a side on individual rails, side by
       side; the tubes start at the rear door frame. The SA 341F HOT and the
       SA 342M carry the same station. */
    if (F.arms === "hot") {
      both(store, cyl(0.05, 0.05, 0.62, 10, "y", BEAM_X, 0.74, Z(BEAM_H)));
      var TUBE_R = 0.093, TL = 1.30, TX = BEAM_X - 0.02, RH = BEAM_H + 0.05 + 0.025;
      var TH_ = RH + 0.025 + TUBE_R;
      [0.80, 1.00].forEach(function (ty) {
        both(store, box(1.14, 0.07, 0.05, TX, ty, Z(RH)));
        both(store, cyl(TUBE_R, TUBE_R, TL, 10, "x", TX, ty, Z(TH_)));
        both(store, cyl(TUBE_R + 0.012, TUBE_R + 0.012, 0.07, 10, "x", TX + TL / 2 - 0.035, ty, Z(TH_), true));
        both(store, cyl(TUBE_R + 0.012, TUBE_R + 0.012, 0.07, 10, "x", TX - TL / 2 + 0.035, ty, Z(TH_), true));
        both(dark, disc(TUBE_R - 0.01, 10, [TX + TL / 2 + 0.001, ty, Z(TH_)], [1, 0, 0]));
      });
    }

    /* Wire strike cutters, one on the roof over the windscreen and one
       under the chin: the ALAT dates the pair to the fleet's mid-1990s
       night-vision refit, and "ATL" carries the upper one in June 1992, so
       they are a 1990s fit. Only the 1990s Viviane machine has them. */
    if (F.cutters) {
      skin.push(plate([[1.70, 1.73], [1.98, 1.68], [2.21, 1.97], [2.12, 1.99]], 0.022, 0));
      skin.push(plate([[2.02, 0.45], [2.30, 0.49], [2.57, 0.28], [2.47, 0.26]], 0.022, 0));
    }

    /* ------------------------------------------------------ the sights ---
       On the cabin roof above the LEFT seat, where the chef de bord who
       aims the missiles sits. */
    if (F.sight === "m397") {
      /* APX M397, as "AEH" (RIAT 1991), "BQN" (1998) and "ATL" (1992) show
         it: a plate on the roof, a wedge fairing that rises forward, and the
         stabilised head, a squat upright drum with its window looking
         ahead. The drum stands over the front third of the front door,
         1.52 m ahead of the mast and a drum's width behind the top of the
         door's front frame (1.49 m off "BQN" side-on, 1.55 m off "AEH").
         The roof falls away toward the windscreen there, so the plate
         follows it, corner by corner. The sight is the grey-olive of the
         missile gear, not the airframe's paint. */
      var mx = 1.31, my2 = 0.33, xd = mx + 0.21;
      var mTop = function (x, y) { return loftZ(x, y) + 0.05; };
      var pc = [[mx - 0.32, my2 - 0.18], [mx + 0.32, my2 - 0.18], [mx + 0.32, my2 + 0.18], [mx - 0.32, my2 + 0.18]];
      store.push(solid(pc.map(function (q) { return [q[0], q[1], loftZ(q[0], q[1]) - 0.01]; }),
                       pc.map(function (q) { return [q[0], q[1], mTop(q[0], my2)]; })));
      var wr = mTop(mx - 0.27, my2) - 0.01, wf = mTop(mx + 0.12, my2) - 0.01;
      store.push(solid([[mx - 0.27, my2 - 0.12, wr], [mx + 0.12, my2 - 0.12, wf], [mx + 0.12, my2 - 0.12, wf + 0.19]],
                       [[mx - 0.27, my2 + 0.12, wr], [mx + 0.12, my2 + 0.12, wf], [mx + 0.12, my2 + 0.12, wf + 0.19]]));
      var dz0 = mTop(xd, my2) - 0.01;
      store.push(cyl(0.125, 0.125, 0.24, 14, "z", xd, my2, dz0 + 0.12));
      glass.push(box(0.03, 0.13, 0.10, xd + 0.115, my2, dz0 + 0.15));
    } else if (F.sight === "viviane") {
      /* Viviane: the day channel, the thermal camera, the laser range-
         finder and the missile tracker in one head, 59 kg over the gunner's
         head, on a pedestal braced into the roof */
      var vx = 1.32, vy = 0.30, vz = loftZ(vx, vy) - 0.01;
      skin.push(cyl(0.11, 0.13, 0.16, 14, "z", vx - 0.06, vy, vz + 0.08));
      skin.push(box(0.70, 0.42, 0.32, vx, vy, vz + 0.32));
      skin.push(box(0.76, 0.46, 0.04, vx + 0.02, vy, vz + 0.50));
      skin.push(box(0.26, 0.30, 0.18, vx - 0.44, vy, vz + 0.26));
      glass.push(box(0.02, 0.17, 0.15, vx + 0.355, vy - 0.10, vz + 0.33));
      glass.push(disc(0.065, 14, [vx + 0.352, vy + 0.11, vz + 0.33], [1, 0, 0]));
    }

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down. The ALAT's own
       high-visibility bands (the orange anti-collision stripes of its
       school machines, alat.fr) go on the tailplane and the tail boom, so
       the flash does too: the tops of the tailplane, 1 cm clear of its
       upper surface from 10 % to 88 % chord, and a strip along the top of
       the boom from the roundel to the shroud over the upper 54 degrees of
       its round, cut from the boom's own sections 1.6 cm proud (a depth
       buffer at map distance separates that; a 3 % oversize would be 7 mm
       here). A band right round the boom would sit on the "armee de TERRE"
       lettering, which runs back to the tailplane. The drive shaft cover
       down the middle of the strip takes the colour too. Seen from straight
       above (a depth-tested count on a 2 cm grid, blades left out) that is
       1.07 m2 of team colour, 0.0075 of the machine's length squared: the
       share of the picture helo_n's flashes take (2.25 m2, 0.0071). */
    function flash(le, te, mid, th, y0, y1, f0, f1) {
      function top(f, y, kk) {
        var x = le(y) + (te(y) - le(y)) * f;
        return [x, y, mid(y) + th(y) * (0.5 - 0.12 * (f - 0.15) / 0.6) + kk];
      }
      var lo = [top(f0, y0, 0.010), top(f1, y0, 0.010), top(f1, y1, 0.010), top(f0, y1, 0.010)];
      var hi = [top(f0, y0, 0.024), top(f1, y0, 0.024), top(f1, y1, 0.024), top(f0, y1, 0.024)];
      return solid(lo, hi);
    }
    function lerpY(p, q, y0, y1) { return function (y) { return p + (q - p) * (y - y0) / (y1 - y0); }; }
    both(team, flash(lerpY(-4.93, -4.95, 0.10, STAB_Y), lerpY(-5.36, -5.36, 0.10, STAB_Y),
                     function () { return Z(STAB_H); }, lerpY(0.07, 0.05, 0.10, STAB_Y), 0.13, 0.86, 0.10, 0.88));
    /* the boom strip: rings of the upper arc only, nose to tail, wound as
       the loft is (up the port side, over, down the starboard side) */
    var SA = 27 * D2R, SM = 4, strip = [], ringsS = [];
    for (i = 0; i <= 8; i++) {
      var xs = -2.45 + (-5.30 + 2.45) * i / 8, B1 = fusAt(xs), zc = B1.zm;
      var so = { x: xs, zm: zc, zb: B1.zb, zt: B1.zt + 0.016,
                 wb: B1.wb, wm: B1.wm + 0.016, wt: B1.wt + 0.016, e: B1.e, eb: B1.eb };
      var rg = [];
      for (k = 0; k <= SM; k++) { var q2 = ringPt(so, PI / 2 - SA + SA * k / SM); rg.push([xs, q2[0], q2[1]]); }
      for (k = SM - 1; k >= 0; k--) rg.push([xs, -rg[k][1], rg[k][2]]);
      ringsS.push(rg);
    }
    for (i = 0; i < ringsS.length - 1; i++) for (k = 0; k < ringsS[i].length - 1; k++) {
      var A1 = ringsS[i][k], B2 = ringsS[i][k + 1], C1 = ringsS[i + 1][k], D1 = ringsS[i + 1][k + 1];
      strip.push(A1, C1, B2, B2, C1, D1);
    }
    team.push(tris(strip));

    /* ---------------------------------------------- the rotor mast ------
       Fixed parts, in model axes: the mast out of the gearbox fairing and
       the swashplate's fixed ring. */
    metal.push(cyl(0.085, 0.095, 0.50, 12, "z", 0, 0, Z(2.30)));
    metal.push(cyl(0.19, 0.19, 0.05, 16, "z", 0, 0, Z(2.36)));

    /* ===================================================== the Fenestron ==
       asw_helo_fit.js tail mount: +PI/2 about X, so inside it local X is
       the model's X, local Y the model's up and local Z the model's right.
       Thirteen blades from the 0.13 m hub to 0.345 m, pitched 24 degrees,
       and a spinner on the port face, where the air goes in. While the fan
       stands still (FAN_SPINS, see NAMED NODES) the mount's turn is baked
       into the parts and they join the fittings meshes. */
    var trM = [cyl(0.13, 0.13, 0.12, 14, "z", 0, 0, 0.0), sph(0.11, 12, 4, 0, 0, -0.06, 1, 1, 0.7)];
    var trB = [];
    for (k = 0; k < 13; k++) {
      var fb = box(TR_R - 0.125, 0.065, 0.012, 0.125 + (TR_R - 0.125) / 2, 0, 0);
      fb.rotateX(24 * D2R);
      fb.rotateZ(k * 2 * PI / 13);
      trB.push(fb);
    }
    var tm = new V.Group();
    tm.position.set(TR_X, 0, Z(TR_H));
    tm.rotation.x = PI / 2;
    if (FAN_SPINS) {
      g.add(tm);
      var trot = new V.Group();
      trot.name = "tailrotor";
      tm.add(trot);
      mesh(trot, trM, T.metal, "tailrotor_hub");
      mesh(trot, trB, T.dark, "tailrotor_blades");
    } else {
      tm.updateMatrix();
      trM.forEach(function (q) { metal.push(q.applyMatrix4(tm.matrix)); });
      trB.forEach(function (q) { dark.push(q.applyMatrix4(tm.matrix)); });
    }

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "stores");
    mesh(g, team, T.team, "team");

    /* ======================================================= main rotor ==
       The mount's -PI/2 about X points the rotor node's local +Y - the one
       of its own axes along the mast, which render3d.js turns it
       positively about - DOWN the mast, so the rotor turns clockwise from
       above. head undoes the turn so the head is authored in model axes,
       with its origin at the hub in the blade plane. */
    var mnt = new V.Group();
    mnt.position.set(0, 0, Z(HUB_H));
    mnt.rotation.x = -PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);

    var hubM = [], hubD = [], blades = [];
    /* the hub body to the 2.72 m head top, the turning swashplate ring */
    hubM.push(cyl(0.13, 0.14, 0.20, 12, "z", 0, 0, -0.02));
    hubM.push(cyl(0.08, 0.10, 0.06, 10, "z", 0, 0, 0.10));
    hubM.push(cyl(0.20, 0.20, 0.04, 14, "z", 0, 0, -0.24, true));
    /* Blade outline, blade along +X. The rotor turns clockwise from
       above, so the leading edge is on the -Y side, the pitch axis at the
       quarter chord. A square tip, as the drawing and photographs show. */
    var CH = F.chord, LE = -CH / 4, TE = LE + CH;
    var BP = [[0.64, LE + 0.03], [0.85, LE], [ROTOR_R - 0.03, LE], [ROTOR_R, LE + 0.02],
              [ROTOR_R, TE], [0.85, TE], [0.64, TE - 0.06]];
    for (k = 0; k < 3; k++) {
      /* one blade straight aft over the boom, two at 60 degrees either
         side of the nose: how a Gazelle is parked and tied down */
      a = (60 + 120 * k) * D2R;
      var blg = solid(BP.map(function (q) { return [q[0], q[1], -0.015]; }),
                      BP.map(function (q) { return [q[0], q[1], 0.015]; }));
      blg.rotateZ(a);
      blades.push(blg);
      /* the hub arm, the blade sleeve with its hinges, the drag damper on
         the trailing side and the pitch link down to the swashplate */
      var parts = [[box(0.36, 0.13, 0.09, 0.28, 0, 0), hubM],
                   [cyl(0.055, 0.05, 0.30, 8, "x", 0.56, 0, 0), hubM],
                   [cyl(0.028, 0.028, 0.32, 6, "x", 0.38, 0.11, 0.02), hubD],
                   [box(0.10, 0.05, 0.04, 0.26, -0.10, -0.03), hubD],
                   [cyl(0.016, 0.016, 0.22, 6, "z", 0.22, -0.12, -0.14), hubD]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    /* One upward face is all a camera above the machine ever sees, and it
       casts no shadow (its back faces away from the sun). */
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    return g;
  }

  return { build: build, FITS: FITS };
})();

/* len is the MEASURED x extent, rotor disc front to the back of the
   Fenestron shroud; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["fra_e60_gunship"] = { len: 11.96, build: function (T, M, C) { return HeroGazelle.build(T, M, C, "fra_e60_gunship"); } };
UNIT_MODELS["fra_e80_gunship"] = { len: 11.96, build: function (T, M, C) { return HeroGazelle.build(T, M, C, "fra_e80_gunship"); } };
UNIT_MODELS["fra_e90_gunship"] = { len: 11.96, build: function (T, M, C) { return HeroGazelle.build(T, M, C, "fra_e90_gunship"); } };
