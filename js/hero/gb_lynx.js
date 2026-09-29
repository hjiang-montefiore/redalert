/* ======= gb_lynx.js - HERO model: Westland Lynx AH.1 (TOW) and AH.7 (TOW) =======
   The British Army Air Corps anti-tank Lynx, for the two defs that fly it:
     gbr_e80_gunship   Lynx AH.1 (TOW), 1981-89: sixty AH.1s were fitted
                       for eight TOW from 1981
     gbr_e90_gunship   Lynx AH.7 (TOW) as 654 Squadron took it to the Gulf
                       in 1991 (Operation Granby)
   Before this file both defs had no model of their own, so render3d.js drew
   them with the AH-64E Apache (helo_n) and an ERA_KIT repaint: a radar
   Apache with stub wings and Hellfires standing in for a utility helicopter
   with a roof sight and two four-round TOW launchers. Registering a build
   under each def id is what makes modelKeyFor pick this model instead.
   Because the key is the def id, render3d.js applies no ERA_KIT paint, so
   each variant carries its own period scheme.

   Reference, and what each gave:
     NASA TM 104000 (Lau et al., 1993), "Performance and rotor loads
       measurements of the Lynx XZ170 helicopter with rectangular blades":
       XZ170 is a skid-equipped army Lynx, flown for these trials by
       Westland in the summer of 1985. Figure 2 (a dimensioned three-view)
       and Tables 1, 3 and 10 give every datum below:
         main rotor   radius 21 ft (12.80 m disc), 4 blades, chord 1.296 ft
                      (0.395 m), root cutout 5.94 ft, 3 degrees of precone,
                      shaft tilted 4 degrees forward, turning
                      COUNTERCLOCKWISE seen from above
         tail rotor   radius 3.625 ft (2.21 m), 4 blades of 7.09 in chord,
                      hub 25.13 ft behind the main hub, 1.64 ft to the LEFT
                      (port) and 1.29 ft below it; "clockwise viewed from
                      starboard"
         heights      main hub 9.67 ft and tail rotor hub 8.38 ft above the
                      ground; centre of mass 7.17 ft under the main hub
         lengths      nose to main hub 14.47 ft, nose to tail rotor hub
                      39.60 ft, 49.75 ft (15.16 m) with both rotors turning,
                      skid track 6.67 ft (2.03 m)
         tailplane    ONE panel, on the RIGHT (starboard) side of the fin top:
                      half span 5.83 ft, chords 2.45 ft root and 1.31 ft tip
         fin          root chord 4.76 ft
         intakes      a tall rounded panel each side of the cowl, 0.14 to
                      0.64 m aft of the hub and 2.10 to 2.75 m up; in the
                      front view they stand out 0.77 m from the centreline
         door rail    the upper sliding-door rail along the door top,
                      2.12 m up at its front falling to 1.93 m aft
       The fuselage stations, heights and widths were traced off Figure 2
       (side, top and front views) on a metre grid scaled on those labels.
     Wikimedia Commons photographs: Lynx AH.1 XZ615 with TOW (Hannover
       1986, Andre Gerwing collection 030991), AH.1 XZ219 and XZ672 with
       TOW (Berlin-Gatow 1993, 028757 and 028758), AH.7 XZ675 (Middle Wallop
       2014), XZ655 (2009) and ZD284 (RIAT 2008 and 2010, flying side-on),
       an AH.7 near Basra (MOD 45142952, 2003) and an AH.9 at Camp Sa'ad
       (2008). They give the canopy, doors, the swept tail pylon with its
       gearbox fairing, the skids, the roof sight over the LEFT seat, the
       two 2 x 2 TOW launchers behind the cabin doors, the engine intakes
       and exhausts, the red and white tail rotor blades and, in Iraq, the
       "Hay Box" exhaust bins and intake sand filters of hot-climate
       aircraft. The Basra and Camp Sa'ad pictures are measured against the
       4.41 m from nose to hub (about 118 px/m for MOD 45142952).
     army-technology.com (Lynx Mk7/Mk9): AH.7 tail rotor 2.36 m, 15.24 m
       long with rotors turning, "exhaust fitted with diffusers".
     dstorm.eu Lynx page (an AAC engineer's Granby account): every Lynx on
       Granby was an AH.7 "with the uprated main rotor gearboxes and
       clockwise tailrotors"; schemes were "two-tone sand, and sand and
       olive"; Westland supplied engine sand filters, which "were never
       painted ... a sort of greenish grey colour straight from
       Westlands"; the roof sights were grey; the aircraft left Detmold on
       BERP blades but went back to the old-style blades.
     dstorm.eu Gulf Lynx versions table and AH.1GT build notes (after Tony
       Cook): the Gulf AH.7/AH.1GT fit is steel (metal) blades, the
       clockwise tail rotor, the LONG tailplane, engine inlet sand filters,
       TOW with the roof sight and '"Hay Box" IRCM exhaust bins'; the build
       leaves the standard exhaust tubes off; the Gulf aircraft had no
       AN/ALQ-144 jammer. Rotor Craft's RC48-02 AH.1 conversion supplies
       that long tailplane in place of the later AH.7's short one, so the
       1985 XZ170 tailplane of NASA Table 1 serves both variants.
     PPRuNe tail-rotor thread: the AH.1 tail rotor turned counter-clockwise
       and the AH.7's clockwise, read from the rotor (port) side, which is
       how NASA's "clockwise viewed from starboard" for XZ170 squares.
     Hataka CS87 paint notes: BS Olive Drab and Black "well into the 1990s";
       Granby field schemes in BS Light Stone and FS 30279.
     Corgi AA39006 (XZ221 'J', 654 Sqn, Granby 1991), a replica, agrees on
       how the desert scheme, the olive TOW launchers, the filters and the
       exhaust bins sat together on a Granby aircraft. No 1991 photograph
       of the bins or the filters was found, so their shapes and places
       are measured off the Iraq photographs of 2003 and 2008.

   Corrections to the brief this was built from:
     - 15.24 m with rotors turning is the AH.7. The AH.1, with the smaller
       2.21 m tail rotor, is 15.16 m (NASA Figure 2: 49.75 ft).
     - The AAC scheme of the 1980s is BS Olive Drab and Black, not dark
       green; the e90 Granby aircraft wore sand (dstorm; Hataka).
     - The main rotor turns COUNTERCLOCKWISE from above (NASA Table 3), the
       American way, so the head uses the AH-64E mount, not the Mi-28N one.
     - BERP blades were on AH.7s by 1990 (Wikipedia; dstorm), not only the
       AH.9. Both variants still get the old rectangular blades: e80
       predates BERP, and the Granby aircraft were refitted with them.
     - The AH.7 tail rotor is not moved: both marks carry it on the port
       side. What changed is its size (2.21 m to 2.36 m), its composite
       blades, and its direction of rotation.
     - The box exhausts are not on every AH.7. The 2008-2014 photographs
       show plain round nozzles; the "Hay Box" bins are hot-theatre kit
       (Granby 1991 per dstorm, Basra 2003, Iraq 2008), so only the e90
       Granby variant carries them, with the sand filters over the intakes.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   under the mast at the published centre of mass, 7.17 ft under the main
   hub, which puts the skids 0.76 m below it on GROUND. render3d.js stands
   the model up with rotation.x = -PI/2 and rescales it by the measured X
   extent. It parks an aircraft with its origin 1.2 world units over the
   ground, so a low origin keeps a parked Lynx's skids nearly on it.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent. The faint main
   rotor disc reaches 6.38 m ahead of the hub (the shaft leans 4 degrees)
   and one tail rotor blade is built pointing straight aft. The extent is
   therefore the published length with both rotors turning: 15.16 m for the
   AH.1 and 15.23 m for the AH.7 with its larger tail rotor. The four main
   blades sit at 45 degrees, so blade phase never sets it.

   NAMED NODES, and why each mount is built the way it is:
     rotor      render3d.js turns it with rotateOnWorldAxis(scene up), which
                three.js applies in the PARENT's frame. The head hangs in
                the asw_helo_fit.js mount turned +PI/2 about X inside a
                group that leans the shaft 4 degrees forward, so the axis
                lands on the shaft pointing up and the head turns
                counterclockwise from above, as NASA Table 3 says. A -PI/2
                group inside puts the head back into model axes.
     rotordisc  inside the rotor, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     tailrotor  the asw_helo_fit.js tail mount, hub axis along local Z. The
                AH.7 (clockwise from the rotor side, top blade moving aft)
                uses +PI/2, as the AH-64E does; the AH.1 (counter-clockwise,
                top blade moving forward) uses -PI/2, which reverses the
                renderer's spin. Measured with the renderer's own calls:
                each turns the right way at heading 0, about the right axis
                but backwards at 180, and tumbles in between, like every
                tail rotor in the game (see the AH-64E file).
   The skids are NOT named "gear": they are fixed, and the renderer hides a
   "gear" node above 18 m. Nothing is named "turret": the Lynx has no gun,
   and the roof sight is fixed to the airframe.

   Materials are the house tiers: SKIN (one procedural CanvasTexture per
   variant, roughness 0.86, metalness 0.06), METAL and DARK fittings, the
   STORES olive of the TOW launchers, a SIGHT grey (a greenish grey on
   Granby, where it also draws the sand filters), GLASS (both faces drawn),
   the BLADE composite, the striped tail rotor blades, the TEAM flash and
   the DISC.
   The skin UVs are projected from model space by face normal (top, port,
   starboard and belly bands of one sheet), as the AH-64E does.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLynx = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* x from the main hub, forward positive; heights above the ground.
     Every value is NASA TM 104000 converted from feet. */
  var GROUND   = -0.762;                   /* skids; CG is 2.50 ft up     */
  function Z(h) { return GROUND + h; }
  var HUB_H    =  2.947;                   /* 9.67 ft                     */
  var ROTOR_R  =  6.401;                   /* 21 ft                       */
  var CHORD    =  0.395;                   /* 1.296 ft                    */
  var ROOT_CUT =  1.811;                   /* 5.94 ft                     */
  var MAST_TILT = 4 * D2R, PRECONE = 3 * D2R;
  var TR_X = -7.66, TR_Y = 0.50, TR_H = 2.554;
  /* skids: 2.03 m track, runners from under the nose to behind the cabin;
     the cross tubes stand where Figure 2 draws them */
  var SKID_Y = 1.016, SKID_X0 = 1.86, SKID_X1 = -1.40, LEG_F = 1.49, LEG_R = -0.85;
  /* the tail pylon, its outline in the XZ plane (heights above ground),
     traced off the ZD284 side views: the leading edge rises from the boom
     top at about 27 degrees, the trailing edge at about 60 */
  var FIN_LE = [[-6.20, 1.70], [-7.53, 2.40]];
  var FIN_TE = [[-7.55, 1.14], [-8.37, 2.40]];
  var STAB_H = 2.44, STAB_LE = -7.84, STAB_Y0 = -0.16, STAB_Y1 = -1.776;

  var VARIANTS = {
    /* AH.1: 2.21 m tail rotor, counter-clockwise from the rotor side,
       olive drab and black, plain round exhausts */
    ah1: { key: "ah1", trR: 1.105, trChord: 0.180, trCut: 0.42, trSense: -1, granby: false,
           seed: 1981, base: "#525238", camo: ["#1f201d"], camoShare: 0.42 },
    /* AH.7 on Granby: the Westland 30 tail rotor (2.36 m, composite,
       clockwise), two-tone sand, "Hay Box" exhaust bins and sand filters */
    ah7: { key: "ah7", trR: 1.18, trChord: 0.19, trCut: 0.45, trSense: 1, granby: true,
           seed: 1991, base: "#aa976f", camo: ["#8f7152"], camoShare: 0.40 }
  };

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     AAC camouflage wraps right round the airframe, so the belly is
     camouflaged too. The hexes sit darker than the paint chips, because
     the ACES pass lifts them. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -9.0, UX1 = 4.6;
  var QY = 2.0;
  var QZ0 = -0.85, QZ1 = 2.05;
  var SX = TW / (UX1 - UX0);
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* one hard-edged disruptive patch: an irregular polygon, long and slanted,
     the way the AAC schemes run in broad diagonal swathes */
  function blob(g, cx, cy, rx, ry, rot, R) {
    var n = 12, i, a, k, pts = [];
    for (i = 0; i < n; i++) {
      a = i / n * PI * 2;
      k = 0.70 + R() * 0.50;
      pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]);
    }
    var c = Math.cos(rot), s = Math.sin(rot);
    g.beginPath();
    for (i = 0; i < n; i++) {
      var x = cx + pts[i][0] * c - pts[i][1] * s, y = cy + pts[i][0] * s + pts[i][1] * c;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath();
    g.fill();
  }

  /* the Army Air Corps roundel: red centre in blue, no white ring */
  function roundel(g, cx, cy, rx, ry) {
    g.fillStyle = "#27386a"; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, PI * 2); g.fill();
    g.fillStyle = "#9c2a25"; g.beginPath(); g.ellipse(cx, cy, rx * 0.5, ry * 0.5, 0, 0, PI * 2); g.fill();
  }

  function skinCanvas(VR) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(VR.seed);
    var i, b, x, y;
    var SZ = BAND / (QZ1 - QZ0), SQ = BAND / (2 * QY);

    g.fillStyle = VR.base; g.fillRect(0, 0, TW, TH);

    /* ---- the disruptive pattern, band by band, so the two sides are not
       mirror images, which a sprayed scheme never is. Patches are 1.1-2.2 m
       long and half as wide, slanted and hard-edged; their number is set so
       they cover VR.camoShare of each band. */
    for (b = 0; b < 4; b++) {
      var wide = (b === 0 || b === 3);
      var area = (UX1 - UX0) * (wide ? 2 * QY : QZ1 - QZ0);
      var n = Math.round(-Math.log(1 - VR.camoShare) * area / 1.12);
      for (i = 0; i < n; i++) {
        var r = 0.55 + R() * 0.55;
        x = UX0 + R() * (UX1 - UX0);
        var cy = wide ? b * BAND + R() * BAND : pySide(QZ0 + R() * (QZ1 - QZ0), b);
        g.fillStyle = VR.camo[i % VR.camo.length];
        blob(g, pxX(x), cy, r * SX, r * 0.55 * (wide ? SQ : SZ), (R() - 0.5) * 1.4, R);
      }
    }

    /* ---- sun on the top band, grime down the sides, a dirtier belly ---- */
    g.fillStyle = VR.granby ? "rgba(255,250,235,0.05)" : "rgba(255,255,236,0.04)";
    g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 160; i++) {
      g.fillStyle = "rgba(24,22,18," + (0.03 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 40);
    }
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }

    /* ---- exhaust soot: the Gem nozzles blow aft and out along the boom
       root, so the stain runs back from x -2.2 over the top and the upper
       sides. The Granby Hay Box bins throw it higher and further. */
    var s0 = -2.2, s1 = VR.granby ? -5.2 : -4.6;
    var sg = g.createLinearGradient(pxX(s0), 0, pxX(s1), 0);
    sg.addColorStop(0, "rgba(20,18,15,0.45)");
    sg.addColorStop(1, "rgba(20,18,15,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(s1), pyTop(0.9), pxX(s0) - pxX(s1), pyTop(-0.9) - pyTop(0.9));
    for (b = 1; b <= 2; b++)
      g.fillRect(pxX(s1), pySide(Z(2.35), b), pxX(s0) - pxX(s1), pySide(Z(1.55), b) - pySide(Z(2.35), b));

    /* ---- panel seams: frames across the airframe at real stations ---- */
    var frames = [4.05, 3.40, 2.96, 2.02, 1.84, 1.20, 0.37, -0.35, -1.00, -1.60,
                  -2.30, -2.95, -3.30, -4.10, -4.90, -5.70, -6.50, -7.30];
    g.lineWidth = 1.4;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.06)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.2;
    [0.62, 1.05, 1.62, 2.22].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(pxX(2.9), yy); g.lineTo(pxX(-3.2), yy); g.stroke();
      }
    });
    [-0.62, -0.30, 0.30, 0.62].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(1.9), yy); g.lineTo(pxX(-2.9), yy); g.stroke();
    });
    /* access hatches */
    g.lineWidth = 1.2;
    for (i = 0; i < 60; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 10 + R() * 30, hh = 8 + R() * 20;
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.strokeRect(hx, hy, hw, hh);
    }

    /* ---- the doors, both sides: the cockpit door ahead of the cabin
       door, and the big sliding cabin door with the rail it runs back on */
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
      g.strokeRect(pxX(1.82), pySide(Z(2.08), b), pxX(0.37) - pxX(1.82), pySide(Z(0.60), b) - pySide(Z(2.08), b));
      g.strokeRect(pxX(2.88), pySide(Z(2.30), b), pxX(1.86) - pxX(2.88), pySide(Z(0.66), b) - pySide(Z(2.30), b));
      /* the door handles */
      g.fillStyle = "rgba(0,0,0,0.6)";
      g.fillRect(pxX(0.52), pySide(Z(1.45), b), 7, 3);
      g.fillRect(pxX(2.02), pySide(Z(1.40), b), 6, 3);
    }

    /* ---- markings: the roundel under the exhaust on each side of the
       rear fuselage, and ARMY on the boom (black on both schemes). The
       port band is laid out tail-to-nose, so its lettering is mirrored. */
    for (b = 1; b <= 2; b++) {
      roundel(g, pxX(-2.15), pySide(Z(1.52), b), 0.21 * SX, 0.21 * SZ);
      g.save();
      g.fillStyle = "rgba(14,14,12,0.85)";
      g.font = "bold " + Math.round(0.24 * SZ) + "px sans-serif";
      g.textAlign = "center"; g.textBaseline = "middle";
      var tx = pxX(-4.05), ty = pySide(Z(1.53), b);
      g.translate(tx, ty);
      if (b === 1) g.scale(-1, 1);
      g.fillText("ARMY", 0, 0);
      g.restore();
    }
    return cv;
  }

  var _cv = {}, _tex = {};                 /* module scope, per variant    */
  function skinTexture(VR) {
    if (_tex[VR.key] !== undefined) return _tex[VR.key];
    try {
      if (!_cv[VR.key]) _cv[VR.key] = skinCanvas(VR);
      var t = new V.CanvasTexture(_cv[VR.key]);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      /* r148: Texture.colorSpace does nothing yet; encoding is what works */
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex[VR.key] = t;
    } catch (e) { _tex[VR.key] = false; }
    return _tex[VR.key];
  }

  /* The tail rotor blades are painted in red and white bands from the tip
     in, over a grey root, on both marks (every photograph above). u runs
     root to tip. */
  var _trCv = null, _trTex;
  function trTexture() {
    if (_trTex !== undefined) return _trTex;
    try {
      if (!_trCv) {
        _trCv = document.createElement("canvas");
        _trCv.width = 128; _trCv.height = 8;
        var g = _trCv.getContext("2d");
        g.fillStyle = "#4a4e50"; g.fillRect(0, 0, 128, 8);
        var bands = [[0.86, 1.00, "#b3261f"], [0.72, 0.86, "#e4e2dc"], [0.58, 0.72, "#b3261f"],
                     [0.46, 0.58, "#e4e2dc"]];
        for (var i = 0; i < bands.length; i++) {
          g.fillStyle = bands[i][2];
          g.fillRect(bands[i][0] * 128, 0, (bands[i][1] - bands[i][0]) * 128, 8);
        }
      }
      _trTex = new V.CanvasTexture(_trCv);
      if (V.sRGBEncoding !== undefined) _trTex.encoding = V.sRGBEncoding;
    } catch (e) { _trTex = false; }
    return _trTex;
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft would collapse to a line under an x projection, so they are
     laid out along x + y. */
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
    var tex = skinTexture(VR);
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.06 });
    if (tex) m.skin.map = tex; else m.skin.color.set(VR.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5a6064, roughness: 0.48, metalness: 0.60 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f20, roughness: 0.66, metalness: 0.30 });
    /* the TOW launchers: olive drab hardware that was not repainted with
       the airframe */
    m.store  = new V.MeshStandardMaterial({ color: 0x464b34, roughness: 0.80, metalness: 0.10 });
    /* The roof sight head is delivered in a mid grey. On Granby the same
       material also draws the engine sand filters, which "were never
       painted either. They came in a sort of greenish grey colour straight
       from Westlands" (the AAC engineer on dstorm.eu); the sights were
       grey too, so one greenish grey serves both and costs no draw call. */
    m.sight  = new V.MeshStandardMaterial({ color: VR.granby ? 0x6b7068 : 0x6c7173,
                                            roughness: 0.62, metalness: 0.12 });
    /* the metal main blades, painted a dark grey-green and weathered flat */
    m.blade  = new V.MeshStandardMaterial({ color: 0x2e322e, roughness: 0.78, metalness: 0.15 });
    var trt = trTexture();
    m.trblade = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.62, metalness: 0.10 });
    if (trt) m.trblade.map = trt; else m.trblade.color.setHex(0x8a3a33);
    /* Curved acrylic in thin frames: dark from any distance. The panes are
       sheets laid 30 mm proud of the skin, so at a grazing angle their
       edges stand past the fuselage outline; drawing both faces keeps
       those rims dark instead of see-through. */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1e2c33, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05,
                                            side: V.DoubleSide });
    /* The flash is exactly C.team, so eraPaint's team test would leave it
       alone if this key ever stood in for another def. The emissive keeps
       it from greying out under ACES. */
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
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
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  /* an open cone from p (radius r0) to q (radius r1), on the same facets
     as a bar() along the same line */
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
  /* a flat annulus facing along n: closes the lip of an open tube */
  function ring(r0, r1, seg, c, n) {
    var g = new V.RingGeometry(r0, r1, seg, 1);
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
    g.rotateZ(PI / 2);
    g.translate(0, y, z);
    return g;
  }

  /* ---- surface patches. A window, a rail or a flash that must lie on the
     curved skin is cut from the loft itself: the point at station x and
     ring angle th is interpolated between the two stations exactly as the
     loft's own quads are, then pushed out along the surface normal. */
  function surfPt(secs, x, th) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x + 1e-9 && x >= B.x - 1e-9) {
        var f = (A.x - x) / (A.x - B.x), pa = ringPt(A, th), pb = ringPt(B, th);
        return [x, pa[0] + (pb[0] - pa[0]) * f, pa[1] + (pb[1] - pa[1]) * f];
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
  /* A patch over x from xa down to xb (xa > xb) and, at each x, ring
     angles t0(x) to t1(x); off metres proud of the skin. Every triangle is
     wound to face along the skin normal. */
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
  /* uv u along a part's local x from x0 to x1: the tail rotor stripes */
  function spanUV(geo, x0, x1) {
    var g = flat(geo), p = g.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), i;
    for (i = 0; i < p.length / 3; i++) { uv[i * 2] = (p[i * 3] - x0) / (x1 - x0); uv[i * 2 + 1] = 0.5; }
    g.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return g;
  }

  /* ========================================================= the build == */
  function build(THREE, M, C, VR) {
    V = THREE;
    var T = makeMats(C, VR);
    var g = new V.Group();
    g.name = "lynx_" + VR.key;
    var i, k, s, a;
    var skin = [], dark = [], metal = [], store = [], sight = [], team = [], glass = [];

    /* --------------------------------------------------- the fuselage ----
       Figure 2 traced: the rounded snout, its tip 1.16 m up, climbing to
       the foot of the windscreen at 1.60 m; a windscreen that rises steeply
       and then rolls over into the cabin roof at 2.48 m; a box cabin 1.94 m
       across its sliding doors on a flat belly 0.48 m off the ground; then
       the rear fuselage, whose belly sweeps up to meet the tail boom 3.25 m
       behind the mast. The boom is a round tube, 0.58 m deep at its root,
       tapering to its end under the tail pylon.
                x      zb    zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 4.34, 1.03, 1.29, 1.16, 0.07, 0.12, 0.07, 0.85),
      sec( 4.20, 0.95, 1.39, 1.16, 0.20, 0.34, 0.20, 0.72),
      sec( 3.90, 0.86, 1.47, 1.14, 0.38, 0.59, 0.36, 0.62),
      sec( 3.40, 0.74, 1.54, 1.12, 0.56, 0.77, 0.52, 0.52),
      sec( 3.00, 0.66, 1.59, 1.10, 0.68, 0.86, 0.62, 0.45),
      sec( 2.75, 0.62, 1.88, 1.15, 0.74, 0.91, 0.66, 0.40),
      sec( 2.50, 0.59, 2.23, 1.20, 0.77, 0.94, 0.72, 0.35),
      sec( 2.25, 0.56, 2.40, 1.25, 0.79, 0.96, 0.77, 0.32),
      sec( 2.02, 0.53, 2.48, 1.30, 0.80, 0.97, 0.80, 0.30),
      sec( 1.60, 0.51, 2.50, 1.30, 0.80, 0.97, 0.80, 0.30),
      sec( 0.40, 0.48, 2.48, 1.30, 0.80, 0.97, 0.80, 0.30),
      sec(-0.35, 0.47, 2.42, 1.32, 0.76, 0.91, 0.74, 0.32),
      sec(-1.00, 0.51, 2.33, 1.36, 0.62, 0.75, 0.60, 0.38),
      sec(-1.50, 0.62, 2.27, 1.45, 0.54, 0.67, 0.50, 0.42),
      sec(-2.00, 0.76, 2.20, 1.52, 0.46, 0.58, 0.43, 0.45),
      sec(-2.50, 0.93, 2.12, 1.58, 0.38, 0.49, 0.36, 0.50),
      sec(-2.90, 1.09, 2.06, 1.62, 0.31, 0.40, 0.30, 0.56),
      sec(-3.25, 1.27, 2.00, 1.64, 0.26, 0.33, 0.25, 0.66),
      sec(-4.00, 1.28, 1.86, 1.57, 0.25, 0.30, 0.24, 0.80),
      sec(-5.00, 1.24, 1.76, 1.50, 0.22, 0.27, 0.21, 0.80),
      sec(-6.00, 1.21, 1.66, 1.43, 0.19, 0.23, 0.18, 0.80),
      sec(-6.90, 1.16, 1.58, 1.37, 0.16, 0.20, 0.15, 0.80),
      sec(-7.45, 1.15, 1.50, 1.32, 0.12, 0.15, 0.11, 0.80),
    ];
    function fusAt(x) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) {
          var f = (A.x - x) / (A.x - B.x), o = {};
          ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (kk) {
            o[kk] = A[kk] + (B[kk] - A[kk]) * f;
          });
          return o;
        }
      }
      return null;
    }
    var fl = loft(FUS, 12, 0.07, 0.08);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);

    /* ------------------------------------------- engine and gearbox cowl --
       The two Gems sit side by side behind the main gearbox under one cowl
       a little over a metre across, which rises out of the cabin roof 1.3 m
       ahead of the mast, peaks at 2.75 m round it, and runs back down into
       the top of the tail boom. The shaft fairing carries on along the
       boom top to the pylon. */
    var COWL = [
      sec( 1.32, 2.38, 2.50, 2.45, 0.10, 0.14, 0.08, 0.70),
      sec( 1.10, 2.30, 2.61, 2.46, 0.26, 0.32, 0.22, 0.60),
      sec( 0.80, 2.28, 2.69, 2.47, 0.44, 0.50, 0.36, 0.50),
      sec( 0.30, 2.28, 2.745, 2.48, 0.50, 0.54, 0.42, 0.45),
      sec(-0.60, 2.28, 2.745, 2.48, 0.50, 0.54, 0.42, 0.45),
      sec(-1.20, 2.22, 2.71, 2.44, 0.48, 0.52, 0.40, 0.47),
      sec(-1.60, 2.15, 2.56, 2.36, 0.44, 0.47, 0.36, 0.50),
      sec(-2.05, 2.06, 2.37, 2.24, 0.38, 0.40, 0.30, 0.55),
      sec(-2.50, 1.98, 2.20, 2.10, 0.30, 0.32, 0.24, 0.60),
      sec(-2.95, 1.94, 2.08, 2.01, 0.20, 0.22, 0.16, 0.70),
    ];
    var cw = loft(COWL, 10, 0.04, 0.04);
    for (i = 0; i < cw.length; i++) skin.push(cw[i]);
    var SHAFT = [
      sec(-2.70, 1.98, 2.10, 2.04, 0.06, 0.08, 0.05, 0.70),
      sec(-4.00, 1.80, 1.98, 1.90, 0.06, 0.08, 0.05, 0.70),
      sec(-5.00, 1.70, 1.87, 1.79, 0.06, 0.08, 0.05, 0.70),
      sec(-6.30, 1.58, 1.76, 1.67, 0.06, 0.08, 0.05, 0.70),
    ];
    var sf = loft(SHAFT, 5, 0.05, 0.05);
    for (i = 0; i < sf.length; i++) skin.push(sf[i]);

    /* ----------------------------------------------- the engine intakes --
       One each side of the cowl just behind the mast: NASA Figure 2 draws
       it from 0.14 to 0.64 m aft of the hub and 2.10 to 2.75 m up, and the
       XZ615, XZ672, XZ655 and ZD284 photographs show a tall rounded
       opening, about 0.38 m long and half a metre high, in a flat panel
       that faces outboard behind a bulged guard of horizontal bars. The
       panel stands out from the curve of the cowl; seen from ahead, the
       two of them are the "ears" either side of the cowl in Figure 2's
       front view, 0.77 m out, and the top view squares the cowl off there.
       So each is a solid pod whose outer face leans back 12 degrees, its
       foot laid in the cabin shoulder just above the upper door rail, the
       face running in with the shoulder as the cabin narrows aft, and its
       top rolled over into the cowl. On Granby the same place carries the
       sand filter housing instead (below). */
    var IN_LEAN = Math.tan(12 * D2R), IN_XA = -0.14, IN_XB = -0.64;
    var IN_XC = -0.39, IN_HC = 2.40, IN_A = 0.19, IN_B = 0.235;
    /* the face of a pod at station x: through the fuselage surface at
       height hRef, pushed out by grow, leaning back by lean */
    function podY(x, hRef, grow) { return surfPt(FUS, x, thAtZ(FUS, x, Z(hRef)))[1] + grow; }
    /* one section of a pod (port side): inner foot, outer foot, the top of
       the flat face, the roll-over and the inner top, both inner corners
       buried in the cowl; ins pulls a chamfer section in and down */
    function podSec(x, yRef, hRef, lean, h0, hf, ht, roll, ins) {
      var yb = yRef + (hRef - h0) * lean - ins, yt = yRef - (hf - hRef) * lean - ins;
      return [[x, 0.30, Z(h0)], [x, yb, Z(h0)], [x, yt, Z(hf - ins * 0.6)],
              [x, yt - roll, Z(ht - ins * 0.6)], [x, 0.30, Z(ht + 0.01 - ins * 0.6)]];
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
    /* a rounded-rectangle outline (superellipse), n corners, scale s */
    function roundRect(cx, ch, a, b, s, n) {
      var pts = [], i;
      for (i = 0; i < n; i++) {
        var f = i / n * PI * 2, c = Math.cos(f), sn = Math.sin(f);
        pts.push([cx + a * s * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 0.6),
                  ch + b * s * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 0.6)]);
      }
      return pts;
    }
    /* A pod's outer face is a plane: yA and yB are where it stands at
       height hRef at the main stations xA and xB. at(x, h, off) is the
       point of the face at station x and height h, off metres proud. */
    function faceFrame(xA, xB, yA, yB, hRef, lean) {
      var k = (yB - yA) / (xB - xA);
      var n = [-k, 1, lean], l = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
      n = [n[0] / l, n[1] / l, n[2] / l];
      return { n: n, at: function (x, h, off) {
        var y = yA + (x - xA) * k - (h - hRef) * lean;
        return [x + n[0] * off, y + n[1] * off, Z(h) + n[2] * off];
      } };
    }
    /* a flat rounded-rectangle patch on a face, fanned from its centre */
    function facePatch(F, cx, ch, a, b, n, off) {
      var o = roundRect(cx, ch, a, b, 1, n), c = F.at(cx, ch, off), out = [], i;
      for (i = 0; i < n; i++) out.push(c, F.at(o[i][0], o[i][1], off), F.at(o[(i + 1) % n][0], o[(i + 1) % n][1], off));
      return facing(out, F.n);
    }
    if (!VR.granby) {
      var iyA = podY(IN_XA, 2.10, 0), iyB = podY(IN_XB, 2.10, 0);
      both(skin, pod([podSec(IN_XA + 0.06, podY(IN_XA + 0.06, 2.10, 0), 2.10, IN_LEAN, 2.00, 2.68, 2.715, 0.07, 0.06),
                      podSec(IN_XA, iyA, 2.10, IN_LEAN, 2.00, 2.68, 2.715, 0.07, 0),
                      podSec(IN_XB, iyB, 2.10, IN_LEAN, 2.00, 2.68, 2.715, 0.07, 0),
                      podSec(IN_XB - 0.06, podY(IN_XB - 0.06, 2.10, 0), 2.10, IN_LEAN, 2.00, 2.68, 2.715, 0.07, 0.06)]));
      var F = faceFrame(IN_XA, IN_XB, iyA, iyB, 2.10, IN_LEAN);
      /* the dark opening, its bright rim, and the guard: three horizontal
         bars and a vertical one, bowed 75 mm out at the middle */
      both(dark, facePatch(F, IN_XC, IN_HC, IN_A, IN_B, 20, 0.004));
      var o = roundRect(IN_XC, IN_HC, IN_A, IN_B, 1, 20), oR = roundRect(IN_XC, IN_HC, IN_A, IN_B, 1.16, 20), rim = [];
      for (i = 0; i < o.length; i++) {
        var i2 = (i + 1) % o.length;
        var p0 = F.at(o[i][0], o[i][1], 0.008), p1 = F.at(o[i2][0], o[i2][1], 0.008);
        var q0 = F.at(oR[i][0], oR[i][1], 0.008), q1 = F.at(oR[i2][0], oR[i2][1], 0.008);
        rim.push(p0, q0, q1, p0, q1, p1);
      }
      both(metal, facing(rim, F.n));
      [-0.12, 0, 0.12].forEach(function (dh) {
        var hb = IN_HC + dh, mid = F.at(IN_XC, hb, 0.075);
        both(metal, bar(F.at(IN_XC + IN_A * 0.97, hb, 0.008), mid, 0.012, 5, true));
        both(metal, bar(mid, F.at(IN_XC - IN_A * 0.97, hb, 0.008), 0.012, 5, true));
      });
      var vm = F.at(IN_XC, IN_HC, 0.075);
      both(metal, bar(F.at(IN_XC, IN_HC - IN_B * 0.97, 0.008), vm, 0.012, 5, true));
      both(metal, bar(vm, F.at(IN_XC, IN_HC + IN_B * 0.97, 0.008), 0.012, 5, true));
    } else {
      /* The Granby sand filter: a housing standing upright over the
         intake, 0.07 m further out than the intake panel (its face 0.8 m
         from the centreline) and as tall as the cowl, its top bevelled
         into the cowl, with the dark window of
         its screen at the upper aft end and a drum along its foot (MOD
         45142952, Basra 2003: x -0.24 to -0.76 and 2.02 to 2.74 m up; the
         2008 Camp Sa'ad photograph for the window and the drum). It is
         centred on the intake it covers. Greenish grey, never painted. */
      var FL = Math.tan(5 * D2R), FXA = -0.18, FXB = -0.72;
      var fyA = podY(FXA, 2.10, 0.07), fyB = podY(FXB, 2.10, 0.07);
      both(sight, pod([podSec(FXA + 0.05, podY(FXA + 0.05, 2.10, 0.07), 2.10, FL, 2.03, 2.60, 2.73, 0.20, 0.07),
                       podSec(FXA, fyA, 2.10, FL, 2.03, 2.60, 2.73, 0.20, 0),
                       podSec(FXB, fyB, 2.10, FL, 2.03, 2.60, 2.73, 0.20, 0),
                       podSec(FXB - 0.05, podY(FXB - 0.05, 2.10, 0.07), 2.10, FL, 2.03, 2.60, 2.73, 0.20, 0.05)]));
      var FF = faceFrame(FXA, FXB, fyA, fyB, 2.10, FL);
      both(dark, facePatch(FF, -0.62, 2.46, 0.075, 0.10, 12, 0.005));
      both(sight, bar(FF.at(-0.24, 2.13, 0.045), FF.at(-0.64, 2.13, 0.045), 0.065, 10, true));
    }

    /* ------------------------------------------------------ exhausts ----
       The Gem jet pipe leaves each side of the cowl at its tail as a round
       nozzle blowing aft and out; NASA Figure 2 draws its mouth 2.10 m aft
       of the hub and 2.14 m up. */
    var EX_X = -1.99, EX_H = 2.17;
    var exDir = [-0.55, 0.835, 0], exL = 0.34;
    var ex0 = [EX_X + 0.06, 0.30, Z(EX_H)], ex1 = [EX_X + 0.06 + exDir[0] * exL, 0.30 + exDir[1] * exL, Z(EX_H)];
    if (!VR.granby) {
      /* the pipe, its dark lining, the blanking face 0.10 m in, and the
         lip: all on the same fourteen facets and meeting edge to edge, so
         no sliver of the pipe's culled inside shows at any angle */
      var exT = [ex1[0] + exDir[0] * 0.003, ex1[1] + exDir[1] * 0.003, ex1[2]];
      var exB = [ex1[0] - exDir[0] * 0.10, ex1[1] - exDir[1] * 0.10, ex1[2]];
      both(skin, bar(ex0, ex1, 0.17, 14, false));
      both(dark, inward(bar(exB, exT, 0.165, 14, false)));
      both(dark, bar2(exB, [exB[0] + exDir[0] * 0.002, exB[1] + exDir[1] * 0.002, exB[2]], 0.165, 0.0005, 14));
      both(skin, bar2(ex1, exT, 0.17, 0.165, 14));
    } else {
      /* The Granby "Hay Box" IRCM exhaust bin (dstorm.eu's Gulf AH.7/AH.1GT
         table; its build notes leave the standard jet pipes off). The
         Basra 2003 photograph, measured at 118 px/m from the hub, shows the
         bin fixed to the side of the cowl with the pipe running into its
         front end through a short ribbed adaptor: its front 0.2 m aft of
         the pipe's collar and about 2.05 m aft of the hub, 1.1 to 1.2 m
         long, some 0.6 m deep at the front and 0.5 m at the open rear, its
         top falling aft along the line of the boom. Here it runs from 2.10
         to 3.30 m aft of the hub. The adaptor leaves the cowl turned
         further aft than the plain pipe, so that it runs square into the
         bin's front face; it is closed and ends well inside the bin. */
      var gDir = [-0.80, 0.60, 0], g0 = [EX_X + 0.19, 0.24, Z(EX_H)];
      var gAt = function (f) { return [g0[0] + gDir[0] * f, g0[1] + gDir[1] * f, g0[2]]; };
      both(skin, bar(g0, gAt(0.55), 0.17, 14, true));
      [0.27, 0.34].forEach(function (f) {
        both(dark, bar(gAt(f), gAt(f + 0.025), 0.182, 14, true));
      });
      var HBF = -2.10, HBR = -3.30;
      both(skin, pod([
        [[HBF, 0.40, Z(1.86)], [HBF, 0.80, Z(1.86)], [HBF, 0.80, Z(2.40)], [HBF, 0.40, Z(2.40)]],
        [[HBF - 0.09, 0.396, Z(1.86)], [HBF - 0.09, 0.796, Z(1.86)], [HBF - 0.09, 0.796, Z(2.48)], [HBF - 0.09, 0.396, Z(2.48)]],
        [[HBR, 0.34, Z(1.82)], [HBR, 0.74, Z(1.82)], [HBR, 0.74, Z(2.32)], [HBR, 0.34, Z(2.32)]]]));
      /* the open mouth, a dark face just behind the rear frame */
      both(dark, facing([[HBR - 0.008, 0.38, Z(1.86)], [HBR - 0.008, 0.70, Z(1.86)], [HBR - 0.008, 0.70, Z(2.28)],
                         [HBR - 0.008, 0.38, Z(1.86)], [HBR - 0.008, 0.70, Z(2.28)], [HBR - 0.008, 0.38, Z(2.28)]],
                        [-1, 0, 0]));
      /* a stay from the bin's inner face down to the boom top */
      both(metal, bar([-2.95, 0.37, Z(2.24)], [-2.95, 0.10, Z(2.03)], 0.022, 5, true));
    }

    /* ------------------------------------------------ the tail pylon ----
       A swept pylon rising from the boom end. Its root chord runs down
       through the boom to the lower rear corner, so the pylon and the boom
       end are one piece; its tip is buried in the gearbox fairing. */
    function finAt(x, z, kk) { return [x, kk, z]; }
    function finX(line, h) { return lerp(line[0][0], line[1][0], (h - line[0][1]) / (line[1][1] - line[0][1])); }
    var finRoot = foil([finX(FIN_LE, 1.36), Z(1.36)], [FIN_TE[0][0], Z(FIN_TE[0][1])], 0.26, finAt);
    var finTip = foil([FIN_LE[1][0], Z(FIN_LE[1][1])], [FIN_TE[1][0], Z(FIN_TE[1][1])], 0.17, finAt);
    skin.push(solid(finRoot, finTip));
    /* the tail rotor gearbox fairing along the pylon top: a bullet 1.25 m
       long, the rotor hub on its port side near the front */
    skin.push(latheX([[-7.40, 0], [-7.42, 0.08], [-7.49, 0.15], [-7.62, 0.19], [-7.90, 0.20],
                      [-8.35, 0.18], [-8.58, 0.13], [-8.68, 0.06], [-8.70, 0]], 14, 0, Z(2.50)));
    /* the tail rotor output shaft housing out to the hub */
    skin.push(cyl(0.085, 0.10, 0.30, 12, "y", TR_X, 0.30, Z(TR_H)));
    /* the tailplane: one panel, on the starboard side at the fairing,
       level, its leading edge straight and its trailing edge swept forward
       to a tip of half the root chord (NASA Table 1) */
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + kk]; }; }
    var stRoot = foil([STAB_LE, 0], [STAB_LE - 0.748, 0], 0.097, stabAt(STAB_Y0));
    var stTip = foil([STAB_LE, 0], [STAB_LE - 0.400, 0], 0.052, stabAt(STAB_Y1));
    skin.push(solid(stRoot, stTip));
    /* the small ventral fin under the boom and the tail guard under the
       pylon (both in every side-on photograph) */
    skin.push(solid([[-4.66, 0.02, Z(1.30)], [-4.99, 0.02, Z(1.30)], [-4.95, 0.02, Z(0.95)], [-4.72, 0.02, Z(0.95)]],
                    [[-4.66, -0.02, Z(1.30)], [-4.99, -0.02, Z(1.30)], [-4.95, -0.02, Z(0.95)], [-4.72, -0.02, Z(0.95)]]));
    metal.push(bar([-6.72, 0, Z(1.20)], [-7.20, 0, Z(0.80)], 0.022, 6, true));
    metal.push(bar([-7.20, 0, Z(0.80)], [-7.42, 0, Z(0.80)], 0.022, 6, true));

    /* ------------------------------------------------------ the skids ----
       Two runners 2.03 m apart on two arched cross tubes; the runners
       turn up at the front. Painted with the airframe. */
    for (s = -1; s <= 1; s += 2) {
      var sy = s * SKID_Y;
      skin.push(box(SKID_X0 - SKID_X1, 0.10, 0.11, (SKID_X0 + SKID_X1) / 2, sy, Z(0.055)));
      skin.push(box(0.36, 0.10, 0.10, SKID_X0 + 0.14, sy, Z(0.13), 0, -32 * D2R, 0));
    }
    /* cross tubes: out from under the belly and down to the runners */
    function leg(x, hB) {
      both(skin, bar([x, 0.40, Z(hB)], [x, 0.78, Z(hB - 0.14)], 0.045, 8, true));
      both(skin, bar([x, 0.78, Z(hB - 0.14)], [x, SKID_Y, Z(0.10)], 0.045, 8, true));
    }
    leg(LEG_F, 0.52);
    leg(LEG_R, 0.50);
    /* the rear legs carry the damper struts, dark in every photograph */
    both(dark, bar([LEG_R + 0.05, 0.62, Z(0.49)], [LEG_R + 0.05, 0.95, Z(0.16)], 0.06, 8, true));

    /* --------------------------------------------------- the glazing ----
       Cut from the loft 12 mm proud: two windscreen panes either side of
       the centre post, the cockpit door windows and the chin windows below
       them, and the sliding cabin door window. The skin left between them
       is the framing. */
    var OFF = 0.03;
    var wsW = lin(2.93, 0.60, 2.10, 0.72);
    var ws = patch(FUS, 2.93, 2.10, function (x) { return thAtY(FUS, x, wsW(x)); },
                   function (x) { return thAtY(FUS, x, 0.035); }, 8, 6, OFF);
    both(glass, ws);
    var dwTop = lin(2.86, 0.66, 1.95, 0.80);
    var dw = patch(FUS, 2.84, 1.94, function (x) { return thAtZ(FUS, x, Z(1.36)); },
                   function (x) { return Math.min(thAtY(FUS, x, dwTop(x)), thAtZ(FUS, x, Z(2.36))); }, 6, 5, OFF);
    both(glass, dw);
    var cwn = patch(FUS, 2.98, 2.64, function (x) { return thAtZ(FUS, x, Z(0.95)); },
                    function (x) { return thAtZ(FUS, x, Z(1.28)); }, 3, 3, OFF + 0.015);
    both(glass, cwn);
    var cdw = patch(FUS, 1.43, 0.72, function (x) { return thAtZ(FUS, x, Z(1.33)); },
                    function (x) { return thAtZ(FUS, x, Z(1.96)); }, 3, 3, OFF);
    both(glass, cdw);
    /* the sliding door rails, top and bottom, running back past the door
       the length it slides. NASA Figure 2 draws the upper rail along the
       top of the door, 2.12 m up at its front falling to 1.93 m at its aft
       end, under the engine intake. */
    var railH = lin(1.84, 2.11, -0.90, 1.94);
    both(dark, patch(FUS, 1.84, -0.90, function (x) { return thAtZ(FUS, x, Z(railH(x) - 0.02)); },
                     function (x) { return thAtZ(FUS, x, Z(railH(x) + 0.02)); }, 6, 1, 0.018));
    both(dark, patch(FUS, 1.84, -0.45, function (x) { return thAtZ(FUS, x, Z(0.60)); },
                     function (x) { return thAtZ(FUS, x, Z(0.64)); }, 6, 1, 0.018));

    /* two pitot masts on the nose ahead of the windscreen */
    for (s = -1; s <= 1; s += 2) {
      var pb = fusAt(3.62).zt;
      dark.push(bar([3.62, s * 0.12, pb - 0.02], [3.64, s * 0.12, pb + 0.18], 0.016, 5, true));
      dark.push(bar([3.64, s * 0.12, pb + 0.18], [3.80, s * 0.12, pb + 0.18], 0.012, 5, true));
    }
    /* blade aerials under the belly and the boom */
    dark.push(box(0.26, 0.03, 0.18, -1.55, 0, fusAt(-1.55).zb - 0.07));
    dark.push(box(0.22, 0.03, 0.16, -3.40, 0, fusAt(-3.40).zb - 0.06));
    dark.push(box(0.22, 0.03, 0.16, -5.60, 0, fusAt(-5.60).zb - 0.06));
    /* a whip on the cowl, aft of the head */
    dark.push(bar([-1.55, 0, Z(2.52)], [-1.75, 0, Z(3.05)], 0.010, 4, true));

    /* ----------------------------------------------- the TOW launchers ---
       Eight TOW in two launchers, one each side, carried on an outrigger
       just behind the sliding door: four tubes in a 2 x 2 block, their
       collared mouths flush at the front frame and their narrower tails
       standing 0.4 m out of the rear frame, the whole about 2.05 m long.
       Measured off XZ615 (side-on) and XZ672 (from the front quarter). */
    var TF = 0.30, TRr = -1.74;                          /* front, rear x */
    var tubes = [[1.14, 1.00], [1.38, 1.00], [1.14, 0.72], [1.38, 0.72]];
    for (k = 0; k < 4; k++) {
      var ty = tubes[k][0], tz = Z(tubes[k][1]);
      both(store, cyl(0.130, 0.130, 0.26, 10, "x", TF - 0.13, ty, tz, true));
      both(dark, inward(cyl(0.118, 0.118, 0.10, 10, "x", TF - 0.05, ty, tz, true)));
      both(dark, disc(0.118, 10, [TF - 0.10, ty, tz], [1, 0, 0]));
      both(store, ring(0.118, 0.130, 10, [TF, ty, tz], [1, 0, 0]));
      both(store, ring(0.105, 0.130, 10, [TF - 0.26, ty, tz], [-1, 0, 0]));
      both(store, cyl(0.105, 0.105, TF - 0.26 + 1.34, 10, "x", (TF - 0.26 - 1.34) / 2, ty, tz, true));
      /* the tail step and the tube's tail, on the same ten facets as the
         tube so no sliver of its open inside shows past them */
      both(store, ring(0.080, 0.105, 10, [-1.34, ty, tz], [-1, 0, 0]));
      both(store, cyl(0.080, 0.080, 0.40, 10, "x", -1.34 - 0.20, ty, tz, true));
      both(dark, disc(0.080, 10, [TRr, ty, tz], [-1, 0, 0]));
    }
    /* the frames round the block at front, middle and rear, the beam
       between the rows, and the outrigger to the cabin side */
    [[0.02, 0.10], [-0.62, 0.16], [-1.30, 0.10]].forEach(function (fr) {
      both(store, box(fr[1], 0.58, 0.05, fr[0], 1.26, Z(1.14)));
      both(store, box(fr[1], 0.58, 0.05, fr[0], 1.26, Z(0.58)));
      both(store, box(fr[1], 0.05, 0.60, fr[0], 0.985, Z(0.86)));
      both(store, box(fr[1], 0.05, 0.60, fr[0], 1.535, Z(0.86)));
    });
    both(store, box(1.34, 0.50, 0.07, -0.64, 1.26, Z(0.86)));
    both(metal, box(0.26, 0.20, 0.14, -0.62, 0.90, Z(0.86)));
    both(metal, bar([-0.10, 1.00, Z(1.14)], [0.10, 0.86, Z(1.52)], 0.030, 6, true));
    both(metal, bar([-1.10, 1.00, Z(1.14)], [-1.00, 0.78, Z(1.55)], 0.030, 6, true));

    /* ------------------------------------------------- the roof sight ----
       The TOW sight head on its pedestal above the LEFT seat, where the
       observer who guides the missile sits; its windows look ahead over
       the windscreen. */
    var SX_ = 2.00, SY_ = 0.42, sRoof = fusAt(SX_).zt;
    sight.push(cyl(0.10, 0.12, 0.12, 12, "z", SX_ + 0.02, SY_, sRoof + 0.03));
    sight.push(box(0.50, 0.36, 0.28, SX_, SY_, sRoof + 0.22));
    sight.push(box(0.08, 0.40, 0.05, SX_ + 0.25, SY_, sRoof + 0.385));
    glass.push(box(0.02, 0.13, 0.15, SX_ + 0.25, SY_ + 0.085, sRoof + 0.22));
    glass.push(box(0.02, 0.13, 0.15, SX_ + 0.25, SY_ - 0.085, sRoof + 0.22));

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down: the top of the
       tailplane and a panel on the cabin roof between the windscreen and
       the cowl, laid 1 cm clear of the skin. A band round the tail boom,
       cut from the boom's own sections 3% oversize, reads from the side. */
    team.push(solid([[STAB_LE - 0.12, -0.50, Z(STAB_H) + 0.052], [STAB_LE - 0.55, -0.50, Z(STAB_H) + 0.040],
                     [STAB_LE - 0.34, -1.62, Z(STAB_H) + 0.030], [STAB_LE - 0.06, -1.62, Z(STAB_H) + 0.034]],
                    [[STAB_LE - 0.12, -0.50, Z(STAB_H) + 0.064], [STAB_LE - 0.55, -0.50, Z(STAB_H) + 0.052],
                     [STAB_LE - 0.34, -1.62, Z(STAB_H) + 0.042], [STAB_LE - 0.06, -1.62, Z(STAB_H) + 0.046]]));
    var roofT = function (x) { return thAtY(FUS, x, 0.62); };
    both(team, patch(FUS, 1.88, 1.42, roofT, function () { return PI / 2; }, 2, 3, 0.03));
    var bandSecs = [], bx = [-5.30, -5.90];
    for (i = 0; i < 2; i++) {
      var B0 = fusAt(bx[i]), zm = B0.zm;
      bandSecs.push({ x: bx[i], zm: zm, zb: zm - (zm - B0.zb) * 1.03, zt: zm + (B0.zt - zm) * 1.03,
                      wb: B0.wb * 1.03, wm: B0.wm * 1.03, wt: B0.wt * 1.03, e: B0.e, yc: 0 });
    }
    team.push(loft(bandSecs, 12, null, null)[0]);

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "tow");
    mesh(g, sight, T.sight, "roof_sight");
    mesh(g, team, T.team, "team");

    /* ======================================================= main rotor ==
       The shaft leans 4 degrees forward (NASA Table 1). The tilt group sits
       at the hub; the mast and the swashplate stay in it and do not turn. */
    var tilt = new V.Group();
    tilt.position.set(0, 0, Z(HUB_H));
    tilt.rotation.y = MAST_TILT;
    g.add(tilt);
    mesh(tilt, [cyl(0.12, 0.13, 0.26, 14, "z", 0, 0, -0.17),
                cyl(0.30, 0.30, 0.05, 18, "z", 0, 0, -0.16)], T.metal, "mast");

    /* The mount: +PI/2 about X puts the renderer's spin axis on the shaft
       pointing up, so the head turns counterclockwise from above; head
       undoes the turn so the head is authored in model axes. */
    var mnt = new V.Group();
    mnt.rotation.x = PI / 2;
    tilt.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);

    /* The titanium monobloc head: a squat centre with four stiff arms, each
       carrying a long pitch-bearing sleeve, the hydraulic lag damper on its
       trailing side (NASA: 0.81 to 1.37 m out), and the blade root clamp
       where the aerofoil begins, 1.81 m out. The vibration absorber sits
       on top of the head. */
    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.24, 0.26, 0.24, 16, "z", 0, 0, 0));
    hubM.push(cyl(0.16, 0.20, 0.10, 14, "z", 0, 0, 0.16));
    hubD.push(cyl(0.13, 0.13, 0.10, 12, "z", 0, 0, 0.25));
    /* Blade outline, blade along +X: counterclockwise from above, so the
       leading edge is on +Y. Chord 0.395 m with the quarter chord on the
       pitch axis, square tip (the rectangular blades of NASA TM 104000). */
    var LE = 0.25 * CHORD, TE = LE - CHORD;
    var BP = [[ROOT_CUT - 0.14, TE + 0.08], [ROOT_CUT, TE], [ROTOR_R - 0.05, TE], [ROTOR_R, TE + 0.04],
              [ROTOR_R, LE - 0.03], [ROTOR_R - 0.04, LE], [ROOT_CUT, LE], [ROOT_CUT - 0.14, LE - 0.04]];
    for (k = 0; k < 4; k++) {
      a = (45 + 90 * k) * D2R;
      var bl = M.slab(V, BP, 0.048);
      bl.translate(0, 0, -0.024);
      bl.rotateX(5 * D2R);                    /* collective: leading edge up */
      bl.rotateY(-PRECONE);                   /* coned: tips up             */
      bl.rotateZ(a);
      blades.push(bl);
      var parts = [[box(0.40, 0.22, 0.14, 0.36, 0, 0), hubM],
                   [cyl(0.075, 0.075, 0.62, 10, "x", 0.86, 0, 0), hubM],
                   [cyl(0.10, 0.10, 0.18, 10, "x", 0.72, 0, 0), hubM],
                   [cyl(0.05, 0.05, 0.50, 8, "x", 1.40, 0, 0), hubD],
                   [box(0.30, 0.18, 0.08, 1.74, -0.02, 0), hubM],
                   [cyl(0.035, 0.035, 0.56, 8, "x", 1.09, -0.12, 0.03), hubD],
                   [box(0.10, 0.10, 0.04, 0.60, 0.14, -0.02), hubD],
                   [cyl(0.018, 0.018, 0.22, 6, "z", 0.60, 0.17, -0.13), hubD]];
      for (i = 0; i < parts.length; i++) {
        parts[i][0].rotateY(-PRECONE); parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]);
      }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    /* One upward face is all a camera above the machine sees, and it casts
       no shadow (see the AH-64E file) */
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.12)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       asw_helo_fit.js tail mount at the hub, 0.50 m to port. VR.trSense is
       +1 for the AH.7's +PI/2 mount (the renderer's turn is then top blade
       aft, clockwise from the rotor side) and -1 for the AH.1's -PI/2 mount
       (top blade forward). In either mount local X is the model's X and the
       hub axis is local Z; od is the local Z sign that points outboard. One
       blade points straight aft: see WHAT SETS THE SCALE. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = VR.trSense * PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var od = VR.trSense > 0 ? -1 : 1;
    var trM = [cyl(0.085, 0.085, 0.16, 12, "z", 0, 0, 0),
               cyl(0.02, 0.07, 0.10, 10, "z", 0, 0, od * 0.13)];
    /* the cone points outboard: CylinderGeometry's r0 end is +z, so flip
       it when outboard is -z */
    if (od < 0) trM[1] = cyl(0.07, 0.02, 0.10, 10, "z", 0, 0, -0.13);
    var trB = [], R_ = VR.trR, cut = VR.trCut, tch = VR.trChord;
    for (k = 0; k < 4; k++) {
      var ang = (180 + 90 * k) * D2R;
      var tb = spanUV(box(R_ - cut, tch, 0.028, cut + (R_ - cut) / 2, 0, 0), cut, R_);
      tb.rotateX(VR.trSense * 8 * D2R);    /* pitch: thrust to starboard  */
      tb.rotateZ(ang);
      trB.push(tb);
      var sp = cyl(0.030, 0.030, cut - 0.06, 8, "x", 0.06 + (cut - 0.06) / 2, 0, 0);
      sp.rotateZ(ang);
      trM.push(sp);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.trblade, "tailrotor_blades");

    return g;
  }

  return {
    ah1: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.ah1); },
    ah7: function (THREE, M, C) { return build(THREE, M, C, VARIANTS.ah7); }
  };
})();

/* len is the MEASURED x extent, rotor disc front to the tip of the aft
   tail rotor blade; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["gbr_e80_gunship"] = { len: 15.16, build: HeroLynx.ah1 };
UNIT_MODELS["gbr_e90_gunship"] = { len: 15.23, build: HeroLynx.ah7 };
