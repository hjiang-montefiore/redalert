/* ======= nato_e20_gunship_ah64e.js - HERO model: Boeing AH-64E Apache Guardian =======
   The helo_n key: the most-built NATO aircraft, 5-36 of them in a match,
   flown at 46 m right under the camera. render3d.js also draws this key
   for the British Army's AH-64E (helo_b) and the WAH-64D Apache AH.1
   (gbr_e00_gunship), which are Apaches too, and it stands in, repainted
   by ERA_KIT, for eleven other gunship defs (see ONE MESH below).

   The hand-built units3d.js entry it replaces had four things wrong:
     - a rotor hung straight under the model root, so the renderer turned
       it about the lateral axis and it windmilled on its side;
     - box blades set fore and aft, so a blade tip set the in-game scale;
     - a fuselage loft wound inside out (its sections ran tail to nose);
     - no disc for the renderer to fade, and no side avionics bays, so the
       nose read as a thin pencil rather than the Apache's broad chest.

   Reference: AH-64E Apache Guardian (and the AH-64D Longbow it is
   remanufactured from; outside, the two differ in nothing a camera at
   this distance can see). The published dimensions:
     length           17.73 m   rotors turning; main rotor tip to tail
                                rotor tip, 9.03 m hub to hub
     main rotor       14.63 m   four blades of 0.533 m chord, 20 degree
                                swept tips, turning ANTI-clockwise seen from
                                above, as American rotors do
     tail rotor        2.79 m   four blades of 0.254 m chord, on the LEFT of
                                the fin, set as two two-blade rotors crossing
                                at 55 and 125 degrees (the "scissor" rotor)
     height            3.87 m   ground to the top of the rotor head
                       4.95 m   ground to the top of the Longbow radome
     stub wing span    5.23 m   over the rounded tip caps; four stores
                                stations
     stabilator span   3.40 m   all-moving, at the foot of the fin
     undercarriage     track 2.03 m, wheelbase 10.59 m, all fixed
     powerplant        two T700-GE-701D turboshafts in nacelles either side
                       of the main gearbox, 1.9 m apart
   Stations along the airframe were measured off two near-orthographic
   in-flight side views on Wikimedia Commons: the US Army AH-64E "53"
   over the desert ("AH-64E Apache-Guardian-0006") and the British
   Army's ZM713 at Farnborough 2024 ("FRBR 240726 ... ZM713 02"), scaled
   on the 9.03 m between the hubs. Both put the rotor hub 5.0 m behind
   the front of the sight turret, the main axle 3.9 m and the tail rotor
   hub 14.0 m behind it. Widths are from a head-on telephoto view of an
   Apache in flight ("AH-64E Apache-Guardian-0002"), scaled on the
   5.23 m wing: inner stations 1.57 m and outer 2.30 m out from the
   centreline, the nacelles 0.96 m, the side avionics bays 0.95 m. The
   ground-level views of a Taiwanese AH-64E ("ROCA AH-64E 810"), a US
   AH-64E ("Boeing AH-64E Apache (30874933072)") and one at ILA 2024
   ("AH-64 Apache, ILA 2024, Schoenefeld (ILA44641)") give the shape of
   the nose, the bays, the nacelles and the exhausts. Each station and
   width was checked by warping those photographs onto the model's side
   and front planes and tracing its silhouette over them.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin
   is the point the aircraft is flown at, under the mast at about the
   height of its centre of mass; the wheels stand 1.80 m below it on
   GROUND. render3d.js stands the model up with rotation.x = -PI/2 and
   rescales it by the measured X extent. It parks an aircraft with this
   origin 1.2 world units above the ground whatever the model, so on the
   apron the Apache stands about 1.2 m deep in it, belly, wheels and gun,
   as every helicopter in the roster does; that is for render3d.js to put
   right (seat a parked machine on its lowest point), not for this origin.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent, and every node
   counts. The faint main rotor disc reaches 7.32 m ahead of the hub and
   one tail rotor blade is built pointing straight aft, 1.40 m behind its
   hub. The extent is therefore 17.74 m: the published length with both
   rotors turning, which is also the room the machine takes up in flight.
   The four main blades sit at 45 degrees, so blade phase never sets it.

   NAMED NODES, and why each mount is built the way it is:
     rotor      render3d.js turns it positively about whichever of its own
                axes lies along the mast. The head hangs in the
                asw_helo_fit.js mount, turned +PI/2 about X, which points
                that axis, its local +Y, up the mast, so the head turns
                anti-clockwise seen from above. Inside the mount a -PI/2
                group puts the head back into model axes, so it is authored
                like everything else.
     rotordisc  inside the rotor, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     tailrotor  the asw_helo_fit.js tail mount (+PI/2 about X). Hub axis
                along local Z, which is the model's lateral axis. The
                renderer turns it positively about local +Z. (It used to take
                the aircraft's lateral axis in the parent's frame, which
                matched the hub only at headings 0 and 180 degrees; no mount
                could undo that, because the error turned with the heading.)
   The Longbow radome and the mast under it are NOT in the rotor: the
   radar sits on a fixed mast that runs up through the hollow rotor shaft,
   and it does not turn.
   The chin gun is NOT named "turret". helo_n has no def.turret, so tang is
   never steered, and the renderer would slew the gun by whatever heading
   the aircraft had accumulated since it spawned.
   The undercarriage is NOT named "gear". The Apache's wheels are fixed and
   stay down in flight, and the renderer hides a "gear" node above 18 m;
   pact_e20_gunship_mi28n.js leaves its fixed wheels unnamed for the same
   reason.

   Materials are the house tiers: SKIN (one procedural CanvasTexture,
   roughness 0.84, metalness 0.08), METAL and DARK fittings, RUBBER, the
   BLADE composite, a STORES olive, GLASS, the TEAM flash and the DISC.
   Nine in all. The skin UVs are projected from model space by face normal
   (top, port, starboard, belly bands of one sheet), so a panel line is
   the same width in metres on a wing as on the fuselage.

   ONE MESH FOR EVERY DEF THAT SHARES THE KEY. build() is handed only the
   team colour (render3d.js getModel), never the def or the era, so the
   same geometry is drawn for all fourteen defs that resolve here. It is
   the Longbow-equipped AH-64D/E, which is right for the three Apache defs
   (helo_n, helo_b and the AH.1, which carried the same radome). The other
   eleven are not Apaches: the Alouette II, Scout, Gazelle, Lynx, Bo 105
   PAH-1 and Tiger, e50 to e20. They were drawn as a radar Apache before
   this file (the units3d.js model had the radome, the stub wings and four
   Hellfire racks), and they still are; they now also show what this model
   adds, the side avionics bays, the two Hydra pods, the IR jammer and the
   fin whip. Nothing in this file can tell them apart. That needs
   render3d.js to hand the def or the era to build(), or a model of their
   own registered under each def id. They keep the ERA_KIT repaint they
   had: the team flash is exactly C.team and emissive, so the repaint
   leaves it alone. Nothing specific to the E, or to any one operator, is
   modelled: no national markings, no serials, no MUM-T antennas.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAH64E = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* Every number two parts must agree on lives here. x is measured from
     the rotor hub, forward positive; heights are above the ground. */
  var GROUND   = -1.80;                    /* wheel contact plane         */
  function Z(h) { return GROUND + h; }     /* height above ground -> z    */
  var X_NOSE   =  5.03;                    /* front of the sight turret   */
  var HUB_X    =  0.00;
  /* The blade plane: 0.23 m under the top of the head, which puts the
     head top at the published 3.87 m and the blade roots where both side
     photographs show them, 1.31 m under the top of the radome. */
  var HUB_H    =  3.64;
  var ROTOR_R  =  7.315;                   /* 14.63 m disc                */
  var CHORD    =  0.533;                   /* main blade chord            */
  var TR_R     =  1.395;                   /* 2.79 m tail rotor           */
  var TR_X = -9.03, TR_Y = 0.44, TR_H = 3.44;
  var NAC_Y    =  0.96;                    /* engine nacelle centreline   */
  var NAC_H    =  2.28;
  var WING_H   =  1.70;                    /* stub wing mid-plane         */
  /* 5.23 m over the tips: the aerofoil ends at 2.545 and the rounded tip
     caps (sph 0.08 x 0.9 across) carry it the last 0.07 m to 2.615 */
  var WING_ROOT = 0.45, TIP_Y = 2.545;
  var PYL_IN   =  1.57, PYL_OUT = 2.30;    /* stores stations, each side  */
  var MW_X = 1.10, MW_Y = 1.015, MW_R = 0.33, MW_W = 0.21;   /* main wheels */
  var TW_X = -9.49, TW_R = 0.19, TW_W = 0.13;               /* tailwheel   */
  /* The fin, as its outline in the XZ plane (heights above ground). The
     leading edge leaves the boom top 12.7 m behind the nose and sweeps
     back 26 degrees; the trailing edge stands almost upright over the
     tailwheel. The tip, at 3.82 m, carries the tail rotor gearbox. */
  var FIN_LE0 = [-7.62, 1.61], FIN_LE1 = [-8.72, 3.80];
  var FIN_TE0 = [-9.58, 1.45], FIN_TE1 = [-9.70, 3.80];
  var FIN_HT  =  0.13;                     /* half its thickness at root  */
  /* the stabilator: both sides of the boom end, under the fin */
  var STAB_H = 1.50, STAB_Y0 = 0.10, STAB_Y1 = 1.70;

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     projUV() below picks the band from each triangle's face normal.

     The scheme is the single dark, low-reflectance aircraft green the US
     and British armies paint the Apache all over, top and belly alike. It
     is not camouflaged: what breaks it up in photographs is weathering,
     panel lines, the dark exhaust staining and the bare-metal fasteners.
     The hex sits darker than a paint chip, because the ACES pass lifts
     untextured mid tones by about 1.8x. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -10.8, UX1 = 5.4;              /* x covered across the sheet  */
  var QY = 2.8;                            /* |y| covered by top/belly    */
  var QZ0 = -1.9, QZ1 = 3.3;               /* z covered by the side bands */
  var SX = TW / (UX1 - UX0);               /* px per metre along x        */
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  var BASE = "#40463a", LIGHT = "#4b5244", DARKP = "#353b30";

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function skinCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(6401);
    var i, b, x, y;

    g.fillStyle = BASE; g.fillRect(0, 0, TW, TH);

    /* ---- panel-to-panel colour: a single-colour scheme is never one
       colour on a working aircraft. Repainted access panels come up a
       shade lighter or darker than their neighbours, in rectangles. */
    for (i = 0; i < 150; i++) {
      var pw = (0.4 + R() * 1.4) * SX, ph = 12 + R() * 34;
      g.fillStyle = (i & 1) ? LIGHT : DARKP;
      g.globalAlpha = 0.25 + R() * 0.35;
      g.fillRect(R() * TW, R() * TH, pw, ph);
    }
    g.globalAlpha = 1;
    /* sun-faded top, grime down the sides */
    g.fillStyle = "rgba(255,255,236,0.045)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 180; i++) {
      g.fillStyle = "rgba(20,20,16," + (0.04 + R() * 0.08).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 42);
    }

    /* ---- exhaust staining. The Black Hole suppressors turn the gas out
       and up from the back of each nacelle, so the soot lies on the
       nacelle tails and the upper boom behind them, x -2.6 to -6. */
    var sg = g.createLinearGradient(pxX(-2.5), 0, pxX(-6.2), 0);
    sg.addColorStop(0, "rgba(18,17,15,0.50)");
    sg.addColorStop(1, "rgba(18,17,15,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-6.2), pyTop(1.45), pxX(-2.5) - pxX(-6.2), pyTop(-1.45) - pyTop(1.45));
    for (b = 1; b <= 2; b++) {
      g.fillRect(pxX(-6.2), pySide(Z(2.75), b), pxX(-2.5) - pxX(-6.2),
                 pySide(Z(1.85), b) - pySide(Z(2.75), b));
    }

    /* ---- panel seams: frames across the airframe at real stations ---- */
    var frames = [4.62, 4.20, 3.84, 3.30, 2.80, 2.22, 1.60, 1.00, 0.45, -0.20,
                  -0.85, -1.60, -2.35, -3.10, -3.80, -4.60, -5.40, -6.20, -7.00,
                  -7.80, -8.60, -9.30];
    g.lineWidth = 1.6;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.32)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.06)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      /* fastener rows beside the frame: bare metal, so a touch lighter */
      g.fillStyle = "rgba(150,150,140,0.20)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.6, 1.6);
    }
    /* stringers: side bands at real heights, the top band either side of
       the spine and along the nacelle tops */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    [0.95, 1.30, 1.62, 2.05, 2.45, 2.85].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
      }
    });
    [-1.20, -0.72, -0.30, 0.30, 0.72, 1.20, -2.0, 2.0].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
    });
    /* access hatches and inspection panels, with their fasteners */
    g.lineWidth = 1.3;
    for (i = 0; i < 80; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 12 + R() * 36, hh = 10 + R() * 22;
      g.strokeStyle = "rgba(0,0,0,0.36)"; g.strokeRect(hx, hy, hw, hh);
      g.fillStyle = "rgba(160,160,150,0.22)";
      g.fillRect(hx + 2, hy + 2, 2, 2); g.fillRect(hx + hw - 4, hy + hh - 4, 2, 2);
      g.fillRect(hx + hw - 4, hy + 2, 2, 2); g.fillRect(hx + 2, hy + hh - 4, 2, 2);
    }
    /* the louvred cooling grilles on the outer faces of the side avionics
       bays, both sides, over the bays' rear halves */
    for (b = 1; b <= 2; b++) {
      g.fillStyle = "rgba(0,0,0,0.40)";
      for (i = 0; i < 5; i++)
        g.fillRect(pxX(1.55) - 10, pySide(Z(1.30 - i * 0.08), b), 20, 3);
      g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 1.5;
      g.strokeRect(pxX(0.40), pySide(Z(1.48), b), pxX(1.30) - pxX(0.40), pySide(Z(0.95), b) - pySide(Z(1.48), b));
    }
    /* the top edge of each side avionics bay, where its shelf meets the
       upright outer face: a hard shadow line with the sunlit lip under it,
       which is what picks the bays out in every side-on photograph */
    for (b = 1; b <= 2; b++) {
      var eb = [[4.10, 1.40], [3.30, 1.33], [0.80, 1.48], [0.35, 1.62], [-0.80, 1.66], [-1.10, 1.60]];
      g.lineWidth = 2.2; g.strokeStyle = "rgba(0,0,0,0.50)";
      g.beginPath();
      for (i = 0; i < eb.length; i++) {
        if (i) g.lineTo(pxX(eb[i][0]), pySide(Z(eb[i][1]), b)); else g.moveTo(pxX(eb[i][0]), pySide(Z(eb[i][1]), b));
      }
      g.stroke();
      g.lineWidth = 1.4; g.strokeStyle = "rgba(255,255,236,0.12)";
      g.beginPath();
      for (i = 0; i < eb.length; i++) {
        if (i) g.lineTo(pxX(eb[i][0]), pySide(Z(eb[i][1]), b) + 3); else g.moveTo(pxX(eb[i][0]), pySide(Z(eb[i][1]), b) + 3);
      }
      g.stroke();
    }
    /* walkway and no-step lines along the tops of the nacelles and bays */
    g.strokeStyle = "rgba(10,10,8,0.45)"; g.lineWidth = 1.2;
    [NAC_Y - 0.26, NAC_Y + 0.26, -NAC_Y - 0.26, -NAC_Y + 0.26].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(pxX(-2.3), yy); g.lineTo(pxX(-1.0), yy); g.stroke();
    });

    /* ---- the belly: the same green, dirtier ---- */
    for (i = 0; i < 110; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.04 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }
    /* oil and hydraulic weep under the gearbox and engine bays */
    var zb = g.createLinearGradient(pxX(0.8), 0, pxX(-5.0), 0);
    zb.addColorStop(0, "rgba(22,20,16,0.30)");
    zb.addColorStop(1, "rgba(22,20,16,0)");
    g.fillStyle = zb; g.fillRect(pxX(-5.0), 3 * BAND, pxX(0.8) - pxX(-5.0), BAND);
    return cv;
  }

  var _cv = null, _tex = null;             /* module scope: built once   */
  function skinTexture() {
    if (_tex !== null) return _tex;
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
     or aft (the nose, intake faces, wing leading edges) would collapse to
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

  /* ========================================================= materials == */
  function makeMats(C) {
    var tex = skinTexture();
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x40463a);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5a6064, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1d2022, roughness: 0.64, metalness: 0.35 });
    /* composite blades, painted the airframe green and weathered flat */
    m.blade  = new V.MeshStandardMaterial({ color: 0x2c302a, roughness: 0.82, metalness: 0.08 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    /* Hellfires, launchers and Hydra pods: ordnance olive drab */
    m.store  = new V.MeshStandardMaterial({ color: 0x484d38, roughness: 0.80, metalness: 0.10 });
    /* flat-plate canopy panels: dark, with a hard coat */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1b2a31, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    /* The flash is exactly C.team, so eraPaint's team test leaves it alone
       when this key stands in for another def. The emissive keeps it from
       greying out under ACES. */
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
  /* flat-shaded triangles from a list of corners, three per triangle */
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* A convex solid from its faces (each a polygon of corners). Each face
     is wound so its normal points away from the solid's centre, so the
     caller does not have to get the order right. */
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
  /* A closed solid between two sections with the same number of corners,
     each a convex polygon: a wing, a stabilator, an avionics bay. */
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* A six-cornered aerofoil section: leading edge, crest 15% back, the
     after-body at 75%, a sharp trailing edge. le and te are [x, z] (or a
     chord line tilted in XZ, as at the fin root); the thickness t is laid
     out by at(x, z, k), which turns chord-plane coordinates into a
     model-space point. */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners:
     flat-sided armour boxes where e is low, round tubes where it nears 1.
       zb, zt   belly and top          zm   height of the widest point
       wb, wt   half-widths at belly and top corners, wm the widest
       yc       centreline offset (engine nacelles)
     Heights are given ABOVE GROUND and converted here. Sections run from
     nose to tail (decreasing x), and the quads are wound (a, c, b), which
     for that order puts every normal outward. The signed volume of every
     closed piece is checked positive with the model tool. */
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

  /* ========================================================= the build == */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "ah64e";
    var i, k, s, a;
    var skin = [], dark = [], metal = [], store = [], rubber = [], team = [], glass = [];

    /* --------------------------------------------------- the fuselage ----
       A narrow armoured spine, no wider than a man's shoulders at the
       cockpits: the Apache's breadth up front is all in the side avionics
       bays, which are separate boxes below. The nose carries the sight
       turret and rises to the gunner's windscreen at 1.88 m. Under the
       canopies the top of the loft is the sill line, stepping up at the
       pilot's station; behind the pilot it climbs into the main gearbox
       fairing at 3.0 m, carries on between the nacelles, and falls to the
       tail boom 4.3 m behind the mast. The belly runs straight at 0.72 m
       and the boom bottom rises gently to the tailwheel. The boom ends
       inside the fin root, over the tailwheel.
                x      zb    zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 4.62, 1.00, 1.62, 1.30, 0.16, 0.24, 0.16, 0.75),
      sec( 4.48, 0.90, 1.72, 1.28, 0.26, 0.34, 0.26, 0.60),
      sec( 4.20, 0.82, 1.82, 1.26, 0.34, 0.42, 0.33, 0.48),
      sec( 3.92, 0.77, 1.88, 1.26, 0.37, 0.45, 0.37, 0.42),
      sec( 3.76, 0.75, 1.62, 1.24, 0.40, 0.47, 0.44, 0.40),
      sec( 3.00, 0.73, 1.72, 1.24, 0.42, 0.48, 0.46, 0.40),
      sec( 2.30, 0.72, 1.80, 1.25, 0.43, 0.49, 0.47, 0.40),
      sec( 2.20, 0.72, 1.94, 1.28, 0.43, 0.49, 0.47, 0.40),
      sec( 1.10, 0.72, 2.03, 1.30, 0.44, 0.50, 0.47, 0.40),
      sec( 0.95, 0.72, 2.80, 1.40, 0.46, 0.54, 0.44, 0.42),
      sec( 0.70, 0.72, 2.98, 1.45, 0.48, 0.58, 0.44, 0.42),
      sec(-0.40, 0.72, 3.00, 1.50, 0.50, 0.62, 0.44, 0.42),
      sec(-1.25, 0.73, 2.96, 1.52, 0.50, 0.62, 0.42, 0.42),
      sec(-1.60, 0.73, 2.76, 1.52, 0.49, 0.60, 0.42, 0.44),
      sec(-2.70, 0.72, 2.66, 1.50, 0.45, 0.55, 0.38, 0.46),
      sec(-3.20, 0.71, 2.30, 1.42, 0.40, 0.48, 0.32, 0.50),
      sec(-3.70, 0.70, 2.02, 1.34, 0.34, 0.40, 0.28, 0.56),
      sec(-4.30, 0.70, 1.88, 1.28, 0.30, 0.34, 0.26, 0.60),
      sec(-6.00, 0.77, 1.80, 1.28, 0.27, 0.30, 0.24, 0.62),
      sec(-7.00, 0.82, 1.74, 1.27, 0.25, 0.28, 0.22, 0.63),
      sec(-7.70, 0.85, 1.65, 1.25, 0.23, 0.26, 0.20, 0.64),
      sec(-8.80, 0.88, 1.55, 1.22, 0.19, 0.22, 0.17, 0.66),
      sec(-9.40, 0.93, 1.48, 1.22, 0.15, 0.17, 0.13, 0.70),
      sec(-9.75, 1.02, 1.40, 1.22, 0.08, 0.10, 0.07, 0.80),
    ];
    /* the section at any x, for the parts that must sit on the skin */
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
    var fl = loft(FUS, 12, 0.08, 0.06);
    for (i = 0; i < fl.length; i++) skin.push(fl[i]);

    /* ------------------------------------------ side avionics bays ------
       The enlarged forward avionics bays the Longbow conversion added: two
       flat-sided boxes along the lower fuselage from the sight turret back
       under the wing roots, 1.9 m across the pair. Their tops are broad
       shelves that meet the canopy sills and rise toward the wing; their
       outer faces stand upright and carry the cooling louvres. Each is a
       tapered nose piece, a main box and a short tail, all convex.
       Ahead of the wing the shelf keeps the line traced off the photographs;
       over the last half metre it climbs into the wing root, and under the
       wing its top sits 2-5 cm up inside the aerofoil, so the stub wing is
       seen to rest on the bay as it does on the aircraft, with no daylight
       or dark step between them. */
    function bay(x, it, ot, ol, ob, ib) {
      /* corners: inner-top, outer-top, outer-lower, bottom-outer, inner-bottom */
      return [[x, it[0], Z(it[1])], [x, ot[0], Z(ot[1])], [x, ol[0], Z(ol[1])],
              [x, ob[0], Z(ob[1])], [x, ib[0], Z(ib[1])]];
    }
    var BAY0 = bay(4.12, [0.34, 1.44], [0.50, 1.40], [0.52, 1.02], [0.44, 0.90], [0.32, 0.86]);
    var BAY1 = bay(3.30, [0.42, 1.40], [0.93, 1.33], [0.95, 0.94], [0.82, 0.78], [0.40, 0.74]);
    var BAY1B = bay(0.80, [0.43, 1.56], [0.94, 1.48], [0.95, 0.94], [0.82, 0.78], [0.40, 0.74]);
    var BAY1C = bay(0.35, [0.44, 1.70], [0.95, 1.62], [0.95, 0.94], [0.82, 0.78], [0.40, 0.74]);
    var BAY2 = bay(-0.80, [0.44, 1.72], [0.95, 1.66], [0.95, 0.94], [0.82, 0.78], [0.40, 0.74]);
    var BAY3 = bay(-1.10, [0.44, 1.66], [0.80, 1.60], [0.80, 1.00], [0.70, 0.86], [0.40, 0.76]);
    both(skin, solid(BAY0, BAY1));
    both(skin, solid(BAY1, BAY1B));
    both(skin, solid(BAY1B, BAY1C));
    both(skin, solid(BAY1C, BAY2));
    both(skin, solid(BAY2, BAY3));

    /* ---------------------------------------------- engine nacelles ----
       The T700s sit either side of the main gearbox, 1.92 m between their
       centrelines, in long round-cornered cowls. At the front a bell-mouth
       stands proud of the nacelle face with the engine's bullet-shaped
       inlet fairing inside it, the air going in round the bullet; at the
       back each nacelle ends in the Black Hole suppressor, a deeper box
       whose underside sweeps up to a raked tail. */
    var NAC = [
      sec(-0.80, 1.94, 2.62, 2.28, 0.28, 0.33, 0.28, 0.55, NAC_Y),
      sec(-1.00, 1.88, 2.69, 2.28, 0.34, 0.38, 0.33, 0.42, NAC_Y),
      sec(-2.25, 1.88, 2.69, 2.28, 0.34, 0.38, 0.33, 0.42, NAC_Y),
      sec(-2.45, 1.88, 2.71, 2.30, 0.35, 0.40, 0.34, 0.40, NAC_Y),
      sec(-2.95, 2.02, 2.71, 2.36, 0.33, 0.38, 0.33, 0.44, NAC_Y),
      sec(-3.14, 2.26, 2.68, 2.46, 0.24, 0.29, 0.25, 0.55, NAC_Y),
    ];
    var nac = loft(NAC, 10, 0.03, 0.03);
    for (i = 0; i < nac.length; i++) both(skin, nac[i]);
    /* the inlet: the bell-mouth drum and its rolled lip, the dark annulus
       the air goes in by, and the bullet standing out of it */
    var IN_Y = NAC_Y - 0.05, IN_H = 2.34;
    both(skin, cyl(0.27, 0.29, 0.30, 16, "x", -0.66, IN_Y, Z(IN_H), true));
    both(skin, place(new V.TorusGeometry(0.235, 0.045, 4, 14), -0.505, IN_Y, Z(IN_H), 0, PI / 2, 0));
    both(dark, disc(0.26, 14, [-0.60, IN_Y, Z(IN_H)], [1, 0, 0]));
    both(dark, inward(cyl(0.262, 0.262, 0.12, 14, "x", -0.56, IN_Y, Z(IN_H), true)));
    both(skin, sph(0.15, 10, 5, -0.60, IN_Y, Z(IN_H), 1.35, 1, 1));
    /* the fairing that carries each nacelle on the fuselage side, and the
       lower cowl that closes the nacelle down onto the wing root under the
       inlet; its flat front face shows as a pale block either side of the
       canopy in head-on photographs */
    both(skin, box(2.10, 0.30, 0.52, -1.95, 0.56, Z(2.28)));
    both(skin, box(0.88, 0.52, 0.26, -0.96, NAC_Y - 0.02, Z(1.93)));
    /* the Black Hole outlet: a dark mouth on the raked tail of the
       suppressor, taller than it is wide, turned 20 degrees outboard. The
       ellipse is built facing +Z, stood on end to face aft, then swung. */
    var outlet = new V.CircleGeometry(1, 14);
    outlet.scale(0.19, 0.13, 1);
    outlet.rotateY(-PI / 2);                 /* faces aft, major axis up  */
    outlet.rotateZ(-20 * D2R);               /* and a little outboard     */
    outlet.translate(-3.19, NAC_Y + 0.05, Z(2.47));
    both(dark, outlet);
    /* the IR jammer lantern on its short post over the aft fuselage. Both
       side photographs put it 3.7-4.0 m behind the mast, a slatted lantern
       about 0.19 m across whose foot stands 0.1 m clear of the skin. */
    var JX = -3.90, bt4 = fusAt(JX).zt;
    metal.push(bar([JX, 0, bt4 - 0.02], [JX, 0, bt4 + 0.11], 0.03, 6, true));
    dark.push(cyl(0.095, 0.095, 0.19, 10, "z", JX, 0, bt4 + 0.195));
    metal.push(cyl(0.10, 0.10, 0.02, 10, "z", JX, 0, bt4 + 0.30));

    /* --------------------------------------------------- stub wings ----
       5.23 m over the tips, low under the nacelles, square in planform
       with a slight taper and no dihedral. Root chord 1.44 m, tip 1.20. */
    var WT_ROOT = 0.24, WT_TIP = 0.16;
    function wingT(y) { return WT_ROOT + (WT_TIP - WT_ROOT) * (y - WING_ROOT) / (TIP_Y - WING_ROOT); }
    function wLE(y) { return 0.38 + (0.22 - 0.38) * (y - WING_ROOT) / (TIP_Y - WING_ROOT); }
    function wTE(y) { return -1.06 + (-0.98 + 1.06) * (y - WING_ROOT) / (TIP_Y - WING_ROOT); }
    var wingRoot = foil([wLE(WING_ROOT), 0], [wTE(WING_ROOT), 0], WT_ROOT, function (x, z, kk) {
      return [x, WING_ROOT, Z(WING_H) + kk]; });
    var wingTip = foil([wLE(TIP_Y), 0], [wTE(TIP_Y), 0], WT_TIP, function (x, z, kk) {
      return [x, TIP_Y, Z(WING_H) + kk]; });
    both(skin, solid(wingRoot, wingTip));
    /* the rounded tip caps */
    both(skin, sph(0.08, 8, 4, (wLE(TIP_Y) + wTE(TIP_Y)) / 2, TIP_Y, Z(WING_H), 7.4, 0.9, 1.0));
    /* pylons: a deep beam under each station, its top buried in the wing */
    var WBOT = WING_H - WT_ROOT * 0.40;         /* underside, near enough */
    both(skin, box(0.78, 0.12, 0.24, -0.26, PYL_IN, Z(WBOT - 0.10)));
    both(skin, box(0.78, 0.12, 0.24, -0.30, PYL_OUT, Z(WBOT - 0.10)));
    /* the pylon articulation fairing at the back of each beam */
    both(metal, cyl(0.05, 0.05, 0.16, 8, "y", -0.58, PYL_IN, Z(WBOT - 0.14)));
    both(metal, cyl(0.05, 0.05, 0.16, 8, "y", -0.62, PYL_OUT, Z(WBOT - 0.14)));

    /* ---- inboard: M299 launchers, four AGM-114 Hellfires each. The
       launcher is a spine under the pylon with a rail each side at two
       levels; the missiles are 1.63 m long and 0.178 m across, with a
       rounded seeker dome, a cruciform of mid-body wings and tail fins. */
    var LH = WBOT - 0.22;                      /* launcher top             */
    both(store, box(1.50, 0.10, 0.42, -0.34, PYL_IN, Z(LH - 0.21)));
    both(store, box(1.30, 0.40, 0.04, -0.34, PYL_IN, Z(LH - 0.04)));
    both(store, box(1.30, 0.40, 0.04, -0.34, PYL_IN, Z(LH - 0.30)));
    var MR = 0.089, ML = 1.40;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      var my = PYL_IN + s * 0.145, mz = Z(LH - 0.15 - k * 0.26), mx = -0.30;
      both(store, cyl(MR, MR, ML, 8, "x", mx, my, mz, true));
      both(dark, sph(MR, 8, 3, mx + ML / 2, my, mz, 1.9, 1, 1));   /* seeker dome */
      both(store, disc(MR, 8, [mx - ML / 2, my, mz], [-1, 0, 0]));
      /* the wings and fins, as two crossed plates each */
      both(store, box(0.12, 0.34, 0.012, mx + 0.30, my, mz, 0.785, 0, 0));
      both(store, box(0.12, 0.34, 0.012, mx + 0.30, my, mz, -0.785, 0, 0));
      both(store, box(0.10, 0.26, 0.012, mx - 0.64, my, mz, 0.785, 0, 0));
      both(store, box(0.10, 0.26, 0.012, mx - 0.64, my, mz, -0.785, 0, 0));
    }

    /* ---- outboard: M261 pods, nineteen 70 mm Hydra tubes each. 1.55 m
       long, 0.40 m across, a flat front showing the tube mouths in a
       hexagon, the tail tapering a little. */
    var PH = WBOT - 0.24 - 0.20;               /* pod axis                 */
    both(store, latheX([[0.28, 0.0], [0.28, 0.185], [0.265, 0.20], [-0.95, 0.20],
                        [-1.20, 0.175], [-1.27, 0.12], [-1.27, 0.0]], 14, PYL_OUT, Z(PH)));
    both(metal, cyl(0.205, 0.205, 0.05, 14, "x", 0.10, PYL_OUT, Z(PH), true));
    both(metal, cyl(0.205, 0.205, 0.05, 14, "x", -0.85, PYL_OUT, Z(PH), true));
    both(store, box(0.30, 0.08, 0.10, -0.32, PYL_OUT, Z(PH + 0.22)));
    var tubes = [[0, 0]];
    for (k = 0; k < 6; k++) {
      a = k * PI / 3;
      tubes.push([Math.cos(a) * 0.082, Math.sin(a) * 0.082]);
      tubes.push([Math.cos(a) * 0.164, Math.sin(a) * 0.164]);
      tubes.push([Math.cos(a + PI / 6) * 0.142, Math.sin(a + PI / 6) * 0.142]);
    }
    for (k = 0; k < tubes.length; k++)
      both(dark, disc(0.032, 6, [0.285, PYL_OUT + tubes[k][0], Z(PH) + tubes[k][1]], [1, 0, 0]));

    /* ------------------------------------------------------ the nose ----
       The M-TADS sight turret hangs from the nose: an azimuth drum under
       the nose, carrying an elevation housing each side (the day sensors
       on the left, the thermal imager on the right) with their windows
       facing ahead. On top of the nose, in front of the gunner, the
       smaller PNVS head the pilot flies by at night. */
    var TX = X_NOSE - 0.33, TH_ = 1.22;
    skin.push(cyl(0.24, 0.24, 0.22, 16, "z", TX - 0.02, 0, Z(1.52)));
    for (s = -1; s <= 1; s += 2) {
      skin.push(cyl(0.33, 0.33, 0.24, 16, "y", TX, s * 0.20, Z(TH_)));
      skin.push(sph(0.33, 12, 5, TX, s * 0.32, Z(TH_), 1, 0.30, 1));
    }
    skin.push(box(0.46, 0.18, 0.50, TX - 0.05, 0, Z(TH_ + 0.04)));
    /* windows: two on the day side, one round thermal window */
    glass.push(box(0.04, 0.12, 0.16, X_NOSE - 0.02, 0.26, Z(TH_ + 0.07)));
    glass.push(box(0.04, 0.10, 0.12, X_NOSE - 0.02, 0.13, Z(TH_ - 0.08)));
    glass.push(disc(0.10, 12, [X_NOSE - 0.005, -0.21, Z(TH_)], [1, 0, 0]));
    /* PNVS head and its window */
    skin.push(cyl(0.16, 0.18, 0.24, 14, "z", 4.60, 0, Z(1.72)));
    skin.push(box(0.26, 0.24, 0.10, 4.52, 0, Z(1.63)));
    glass.push(box(0.03, 0.14, 0.12, 4.765, 0, Z(1.73)));

    /* ------------------------------------------------ the chin gun ------
       The M230 30 mm chain gun on its turret under the gunner's cockpit,
       between the main gear legs. The long barrel reaches 1.5 m ahead of
       the turret, a little depressed. */
    var GX = 2.48, GH = 0.50;
    dark.push(cyl(0.25, 0.27, 0.10, 16, "z", GX, 0, Z(0.69)));
    both(dark, box(0.34, 0.05, 0.26, GX, 0.14, Z(0.55)));
    var gunDip = -3 * D2R;
    var gun = [box(0.66, 0.20, 0.22, -0.06, 0, 0),
               cyl(0.055, 0.055, 0.30, 10, "x", 0.42, 0, 0),
               cyl(0.034, 0.034, 0.92, 8, "x", 1.01, 0, 0),
               cyl(0.050, 0.050, 0.14, 8, "x", 1.47, 0, 0),
               box(0.60, 0.05, 0.05, 0.50, 0, -0.10)];
    for (i = 0; i < gun.length; i++) {
      gun[i].rotateY(-gunDip);
      gun[i].translate(GX, 0, Z(GH));
      dark.push(gun[i]);
    }
    /* the ammunition chute from the magazine above */
    dark.push(bar([GX - 0.25, 0.10, Z(0.52)], [GX - 0.40, 0.22, Z(0.74)], 0.05, 6, true));

    /* ---------------------------------------------------- the cockpits --
       Flat-plate glazing in heavy frames. The gunner sits forward and
       low behind a small raked windscreen, with big side panels that come
       down to the bay shelves; the pilot sits behind and 0.5 m higher
       under his own windscreen, and the canopy roof line rises in one
       slope from the gunner's windscreen to the pilot's head. */
    function pane(pts) {
      /* pts: [x, y, h] with y >= 0; mirrored to make the solid */
      var P = pts.map(function (p) { return [p[0], p[1], Z(p[2])]; });
      var S = pts.map(function (p) { return [p[0], -p[1], Z(p[2])]; });
      return { P: P, S: S };
    }
    /* gunner: sill front, windscreen base, windscreen top, roof rear, sill rear */
    var cg = pane([[3.84, 0.44, 1.60], [3.92, 0.30, 1.88], [3.15, 0.27, 2.22],
                   [2.20, 0.29, 2.62], [2.20, 0.47, 1.78]]);
    /* pilot: sill front, front top (under the CPG roof), windscreen top,
       roof rear, sill rear */
    var cp = pane([[2.22, 0.47, 1.92], [2.22, 0.29, 2.58], [1.85, 0.27, 2.80],
                   [1.02, 0.28, 2.86], [0.98, 0.47, 2.02]]);
    function canopy(c) {
      var P = c.P, S = c.S;
      glass.push(convex([
        [P[0], P[1], P[2], P[3], P[4]], [S[0], S[1], S[2], S[3], S[4]],
        [P[0], S[0], S[1], P[1]], [P[1], S[1], S[2], P[2]], [P[2], S[2], S[3], P[3]],
        [P[3], S[3], S[4], P[4]], [P[4], S[4], S[0], P[0]]]));
      var fr = 0.032, e, edges = [];
      for (e = 0; e < 5; e++) { edges.push([P[e], P[(e + 1) % 5]]); edges.push([S[e], S[(e + 1) % 5]]); }
      edges.push([P[1], S[1]], [P[2], S[2]], [P[3], S[3]]);
      for (e = 0; e < edges.length; e++) skin.push(bar(edges[e][0], edges[e][1], fr, 4, true));
      /* the door frame half way along each side */
      for (e = 0; e < 2; e++) {
        var Q = e ? S : P;
        var pb = [(Q[0][0] + Q[4][0]) / 2, (Q[0][1] + Q[4][1]) / 2, (Q[0][2] + Q[4][2]) / 2];
        var pt = [(Q[2][0] + Q[3][0]) / 2, (Q[2][1] + Q[3][1]) / 2, (Q[2][2] + Q[3][2]) / 2];
        skin.push(bar(pb, pt, fr * 0.9, 4, true));
      }
    }
    canopy(cg);
    canopy(cp);
    /* the wire strike cutters: one on the canopy roof ahead of the
       pilot, one under the chin ahead of the gun */
    dark.push(box(0.36, 0.03, 0.20, 1.90, 0, Z(2.90), 0, -0.35, 0));
    dark.push(box(0.32, 0.03, 0.20, 3.74, 0, Z(0.68), 0, 0.45, 0));

    /* ------------------------------------------------ fin and stabilator --
       The fin is a thick swept aerofoil carrying the tail rotor drive to
       the gearbox at its tip. Its root aerofoil lies along the boom, from
       the top of the boom at the leading edge down to its end at the
       trailing edge, so the fin and the boom end are one piece. */
    function finAt(x, z, kk) { return [x, kk, z]; }
    var finRoot = foil([FIN_LE0[0], Z(FIN_LE0[1])], [FIN_TE0[0], Z(FIN_TE0[1])], FIN_HT * 2, finAt);
    var finTip = foil([FIN_LE1[0], Z(FIN_LE1[1])], [FIN_TE1[0], Z(FIN_TE1[1])], FIN_HT * 1.4, finAt);
    skin.push(solid(finRoot, finTip));
    /* the tip fairing over the tail gearbox */
    var CAP = [
      sec(-8.66, 3.74, 3.86, 3.80, 0.06, 0.09, 0.06, 0.80),
      sec(-8.85, 3.70, 3.92, 3.81, 0.12, 0.15, 0.11, 0.60),
      sec(-9.45, 3.70, 3.92, 3.81, 0.12, 0.15, 0.11, 0.60),
      sec(-9.76, 3.74, 3.86, 3.80, 0.07, 0.09, 0.06, 0.80),
    ];
    var cap = loft(CAP, 8, 0.06, 0.04);
    for (i = 0; i < cap.length; i++) skin.push(cap[i]);
    /* the tail rotor gearbox bulge on the LEFT face, under the rotor hub */
    skin.push(sph(0.24, 12, 6, TR_X, 0.10, Z(TR_H), 1.35, 0.75, 1.15));
    /* The stabilator: all-moving, geared to airspeed and collective, set
       here at its cruise angle. 3.40 m across, 1.10 m chord at the root
       and 0.86 m at the squared-off tips. */
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + kk]; }; }
    var stRoot = foil([-8.76, 0], [-9.86, 0], 0.11, stabAt(STAB_Y0));
    var stTip = foil([-9.00, 0], [-9.86, 0], 0.08, stabAt(STAB_Y1));
    both(skin, solid(stRoot, stTip));

    /* ---------------------------------------------- the undercarriage ----
       Fixed, tailwheel type, 10.59 m from the main axles to the tailwheel,
       2.03 m track. Each main wheel is on a trailing arm hinged under the
       front of the side bay, with its shock strut rising from the arm
       into the bay. The tailwheel trails on a yoke under the fin. */
    var arm0 = [2.20, 0.66, Z(0.82)], axle = [MW_X + 0.04, MW_Y - MW_W / 2 - 0.02, Z(MW_R + 0.02)];
    both(metal, bar(arm0, axle, 0.065, 8, true));
    both(metal, bar([MW_X + 0.16, 0.86, Z(0.40)], [MW_X + 0.34, 0.80, Z(1.00)], 0.075, 8, true));
    both(metal, bar([MW_X + 0.26, 0.82, Z(0.72)], [MW_X + 0.30, 0.80, Z(0.95)], 0.095, 8, true));
    both(metal, box(0.26, 0.14, 0.12, 2.22, 0.62, Z(0.82)));
    both(metal, cyl(0.05, 0.05, 0.20, 8, "y", MW_X, MW_Y - 0.12, Z(MW_R)));
    both(rubber, cyl(MW_R, MW_R, MW_W, 18, "y", MW_X, MW_Y, Z(MW_R)));
    both(metal, cyl(0.16, 0.16, MW_W + 0.01, 12, "y", MW_X, MW_Y, Z(MW_R)));
    metal.push(bar([-9.02, 0, Z(0.90)], [TW_X + 0.08, 0, Z(0.42)], 0.055, 8, true));
    metal.push(box(0.12, TW_W + 0.10, 0.07, TW_X + 0.06, 0, Z(0.44)));
    both(metal, box(0.07, 0.03, 0.26, TW_X + 0.02, TW_W / 2 + 0.03, Z(0.31)));
    metal.push(cyl(0.035, 0.035, TW_W + 0.10, 8, "y", TW_X, 0, Z(TW_R)));
    rubber.push(cyl(TW_R, TW_R, TW_W, 14, "y", TW_X, 0, Z(TW_R)));

    /* ------------------------------------------------------ small kit ---- */
    /* whip aerial on the fin tip and blade aerials under the belly, each
       rooted in the skin at its own station (fusAt gives model z) */
    dark.push(bar([-9.10, 0, Z(3.90)], [-9.12, 0, Z(5.30)], 0.012, 4));
    dark.push(box(0.28, 0.03, 0.20, -1.6, 0, fusAt(-1.6).zb - 0.08));
    dark.push(box(0.24, 0.03, 0.18, -5.4, 0, fusAt(-5.4).zb - 0.07));
    dark.push(box(0.26, 0.03, 0.18, -3.0, 0, fusAt(-3.0).zt + 0.07, 0, 0.30, 0));

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down: the outer wing
       panels and the tops of the stabilator. Each flash is a thin plate
       laid 1 cm clear of the aerofoil's own upper surface between 18% and
       72% chord, so it follows the camber and cannot z-fight with the
       skin at map distance. There is also a band right round the tail
       boom, cut from the boom's own sections 3% oversize, so it reads
       from the side as well as from above. */
    function flash(le, te, mid, th, y0, y1) {
      function top(f, y, kk) {
        var x = le(y) + (te(y) - le(y)) * f;
        return [x, y, mid(y) + th(y) * (0.5 - 0.12 * (f - 0.15) / 0.6) + kk];
      }
      var lo = [top(0.18, y0, 0.010), top(0.72, y0, 0.010), top(0.72, y1, 0.010), top(0.18, y1, 0.010)];
      var hi = [top(0.18, y0, 0.024), top(0.72, y0, 0.024), top(0.72, y1, 0.024), top(0.18, y1, 0.024)];
      return solid(lo, hi);
    }
    function lerpY(p, q, y0, y1) { return function (y) { return p + (q - p) * (y - y0) / (y1 - y0); }; }
    both(team, flash(wLE, wTE, function () { return Z(WING_H); }, wingT, 1.78, 2.50));
    both(team, flash(lerpY(-8.76, -9.00, STAB_Y0, STAB_Y1), lerpY(-9.86, -9.86, STAB_Y0, STAB_Y1),
                     function () { return Z(STAB_H); }, lerpY(0.11, 0.08, STAB_Y0, STAB_Y1), 0.70, 1.60));
    var bandSecs = [], bx = [-6.35, -6.95];
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
    mesh(g, store, T.store, "stores");
    mesh(g, rubber, T.rubber, "tyres");
    mesh(g, team, T.team, "team");

    /* ======================================================= main rotor ==
       Fixed parts first, in model axes: the mast above the gearbox
       fairing, the swashplate's fixed ring, and the Longbow fire control
       radar on its own stalk above the head. The radome is a broad,
       flattened drum 1.36 m across and 0.55 m deep, its top 4.95 m above
       the ground: a lathe of a superellipse. */
    var HZ = Z(HUB_H), fixedM = [], fixedS = [];
    fixedM.push(cyl(0.13, 0.15, HUB_H - 3.00 - 0.12, 14, "z", HUB_X, 0, Z(3.00) + (HUB_H - 3.12) / 2));
    fixedM.push(cyl(0.35, 0.35, 0.05, 18, "z", HUB_X, 0, Z(HUB_H - 0.38)));
    /* the stalk runs from inside the head top up into the radome's belly */
    var STALK0 = HUB_H + 0.20, STALK1 = 4.47;
    fixedM.push(cyl(0.12, 0.12, STALK1 - STALK0, 12, "z", HUB_X, 0, Z((STALK0 + STALK1) / 2)));
    fixedM.push(cyl(0.19, 0.16, 0.10, 14, "z", HUB_X, 0, Z(4.02)));
    /* the rim is squarer than an ellipse (exponent 0.42 across) and the
       crown a gentle dome (0.6 up); the underside is a little shallower */
    var FCR_R = 0.68, FCR_HH = 0.275, FCR_C = 4.95 - FCR_HH, prof = [];
    for (i = 0; i <= 10; i++) {
      var th = -PI / 2 + PI * i / 10, cth = Math.cos(th), sth = Math.sin(th);
      prof.push([(sth < 0 ? -0.85 : 1) * Math.pow(Math.abs(sth), 0.6) * FCR_HH,
                 FCR_R * Math.pow(Math.abs(cth), 0.42)]);
    }
    /* latheX lays an (x, r) profile along model x; the radome stands on
       z, so it is built along x and turned upright */
    var fcr = latheX(prof.slice().reverse(), 18, 0, 0);
    fcr.rotateY(-PI / 2);
    fcr.translate(HUB_X, 0, Z(FCR_C));
    fixedS.push(fcr);
    mesh(g, fixedM, T.metal, "mast");
    mesh(g, fixedS, T.skin, "radome", true);

    /* The mount. Its +PI/2 about X points the rotor node's local +Y - the
       one of its own axes along the mast, which render3d.js turns it
       positively about - UP the mast, so the rotor turns anti-clockwise
       from above. head undoes the turn so the head is authored in model
       axes, with its origin at the hub centre. */
    var mnt = new V.Group();
    mnt.position.set(HUB_X, 0, HZ);
    mnt.rotation.x = PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);

    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.22, 0.24, 0.24, 16, "z", 0, 0, 0));
    hubM.push(cyl(0.30, 0.30, 0.05, 16, "z", 0, 0, 0.12));
    hubM.push(cyl(0.30, 0.30, 0.05, 16, "z", 0, 0, -0.12));
    hubM.push(cyl(0.17, 0.20, 0.10, 14, "z", 0, 0, 0.18));
    hubM.push(cyl(0.37, 0.37, 0.05, 18, "z", 0, 0, -0.33));     /* turning ring */
    /* Blade outline, blade along +X. The rotor turns anti-clockwise from
       above, so the leading edge is on the +Y side. Chord 0.533 m with
       the quarter chord on the pitch axis; the tip sweeps back 20 degrees
       over its last 0.47 m, its trailing edge eased to meet it. */
    var LE = 0.133, TE = LE - CHORD, SW0 = ROTOR_R - 0.47;
    var BP = [[0.95, TE + 0.06], [1.40, TE], [ROTOR_R - 0.20, TE], [ROTOR_R, TE + 0.10],
              [ROTOR_R, LE - 0.47 * Math.tan(20 * D2R)], [SW0, LE], [1.40, LE], [0.95, LE - 0.04]];
    for (k = 0; k < 4; k++) {
      /* 45, 135, 225 and 315 degrees: the head sits as the photographs of
         parked aircraft show it, and no blade lies along the fuselage */
      a = (45 + 90 * k) * D2R;
      var bl = M.slab(V, BP, 0.035);
      bl.translate(0, 0, -0.0175);
      bl.rotateZ(a);
      blades.push(bl);
      /* the pitch housing, the blade grip, the elastomeric lead-lag damper
         on the trailing side and the pitch link down to the swashplate */
      var parts = [[cyl(0.085, 0.085, 0.70, 10, "x", 0.60, 0, 0), hubD],
                   [box(0.44, 0.22, 0.12, 1.12, -0.02, 0), hubM],
                   [cyl(0.05, 0.05, 0.52, 8, "x", 0.60, -0.17, 0.05), hubD],
                   [box(0.10, 0.06, 0.06, 0.34, -0.17, 0.05), hubD],
                   [cyl(0.024, 0.024, 0.30, 6, "z", 0.46, 0.18, -0.18), hubD],
                   [box(0.16, 0.05, 0.05, 0.46, 0.13, -0.03), hubM]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    /* One upward face is all a camera above the machine ever sees. It
       also casts no shadow: under the PCF shadow map three draws a
       FrontSide material with its BACK faces, and this disc's back faces
       away from the sun. */
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       asw_helo_fit.js tail mount: +PI/2 about X, so inside it local X is
       the model's X, local Y the model's up and local Z the model's
       right-hand side. The hub axis runs along local Z; the rotor is on
       the LEFT of the fin, so outboard is local -Z. The two two-blade
       rotors cross at 55 and 125 degrees, the outer pair further out
       along the shaft. One blade of the inner pair points straight aft
       as built: see WHAT SETS THE SCALE. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.10, 0.12, 0.30, 12, "z", 0, 0, 0.06), cyl(0.07, 0.03, 0.10, 10, "z", 0, 0, -0.14)];
    var trB = [];
    var tAng = [180, 0, 235, 55];
    for (k = 0; k < 4; k++) {
      var zoff = k < 2 ? 0.02 : -0.07;
      var tb = box(TR_R - 0.18, 0.254, 0.03, 0.18 + (TR_R - 0.18) / 2, 0, 0);
      tb.rotateX(8 * D2R);                    /* blade pitch */
      tb.rotateZ(tAng[k] * D2R);
      tb.translate(0, 0, zoff);
      trB.push(tb);
      var cuff = box(0.24, 0.10, 0.08, 0.17, 0, 0);
      cuff.rotateZ(tAng[k] * D2R);
      cuff.translate(0, 0, zoff);
      trM.push(cuff);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");

    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent, main rotor disc front to the tip of the
   aft tail rotor blade; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["helo_n"] = { len: 17.74, build: HeroAH64E.build };
