/* ======= de_bo105.js - HERO model: MBB Bo 105 P / PAH-1 (HOT) =======
   The deu_e80_gunship def: the Bundeswehr's first armed helicopter, the
   Panzerabwehrhubschrauber 1. Until this file render3d.js drew it with the
   AH-64E mesh, because modelKeyFor falls back to the first gunship peer that
   has a model (helo_n) when a def has none of its own: a 2.5-tonne Bo 105
   was drawn as a Longbow Apache with a chin gun, which it never carried.
   Registering a model under the def id is the whole fix; modelKeyFor
   returns the def's own id first.

   Reference: MBB Bo 105 P, German Army designation PAH-1, 212 ordered in
   1979 and delivered by 1984, flown by the Heeresflieger until the PAH-1A1
   conversion from 1991. The published figures (MBB Bo 105 maintenance
   manual ch. 01-1 "Dimensions"; de.wikipedia "Boelkow Bo 105" technical
   data; panzerbaer.de "Panzerabwehrhubschrauber BO 105 P PAH-1"):
     length           11.86 m   rotors turning
     fuselage         8.56 m    nose to tail, tail boom included (the CB
                                cabin; the stretched CBS is 8.81)
     width            1.58 m    cabin; 3.56 m over the HOT launchers
     height           3.02 m    to the top of the rotor head
     main rotor       9.84 m    four hingeless blades of 0.27 m chord on a
                                titanium hub, turning ANTI-clockwise seen
                                from above, the American way
     tail rotor       1.90 m    two blades of 0.18 m chord, on the LEFT
                                (port) side of the fin, turning clockwise
                                seen from the left, so the advancing blade
                                is the lower one; 3.80 m to the upper blade
                                tip when a blade stands upright
     skids            track 2.53 m, 2.70 m long; the belly 0.35 m clear
                                of the ground, the tail skid 1.35 m
     powerplant       two Allison 250-C20B side by side on the cabin roof
                                behind the main gearbox, 420 shp each
   The tail rotor is on the LEFT, and the fin is what decides it: in the
   port-side views of 86+19 (2008) and 87+28 (2014) the hub, its pitch
   links and the forward blade are drawn OVER the fin tip, and in the
   starboard-side view of 87+17 (Tempelhof, 6 June 1992, Andre Gerwing
   Collection) the fin hides the root of the forward blade, which comes out
   from behind it. thisdayinaviation.com gives the rotor's sense "as seen
   from the helicopter's left side", and the left is where the tail rotor
   sits on the UH-1 and the AH-64 too, against the same anti-clockwise
   main rotor.
   Stations along the airframe were measured off the telephoto side view
   "MBB Bo 105P - PAH-1 (c-n 6019, 86+19) 2008-05-30" (Andre Gerwing
   Collection, Wikimedia Commons), scaled on 5.99 m hub to hub, which is
   what makes the 11.86 m overall with both rotors turning; on that scale
   the skids come out 2.68 m long against the published 2.70. It puts the
   nose 2.57 m ahead of the main hub and the rear of the cabin pod 1.70 m
   behind it; the rear doors 1.20 to 0.54 m ahead of the hub, their windows
   about 0.64 to 1.10 m; the door sills 0.82 m and the door handles 1.25 m
   above the ground; the skid crosstubes 1.40 m ahead of the hub and 0.27 m
   behind it; the fin leading edge leaving the boom 4.95 m behind it, and
   the tail ending at the tail rotor hub over the fin tip. Nose to tail is
   then 8.59 m, against the manual's 8.56 m. The port-side view "(c-n 6128,
   87+28) 2014-08-23" gives the same fin. The head-on "Boelkow Bo 105
   (Bundeswehr) 15" gives the 1.58 m cabin against the 3.02 m height, and
   the fit of the launchers.

   WHICH PAH-1. The def runs e80 to e90 and build() is not told the era
   (render3d.js caches one model per key and team when the key is the def's
   own id), so one mesh serves both. It is the PAH-1 the def is named for,
   as delivered and flown through the 1980s: THREE HOT tubes a side side by
   side in a HORIZONTAL row on an outrigger, square-tipped blades. The
   Bundesarchiv's photographs of the "Fraenkischer Schild" exercise of 23
   September 1986 (B 145 Bild-F073468-0003, -0018, -0032) and the 1983
   photograph of a PAH 1 of Regiment 26 at Bad Mergentheim ("PAH 1 (MBB
   Bo 105), Panzerabwehrhubschrauberregimente 26 Roth (2)") show the row;
   de.wikipedia and panzerbaer.de describe it ("horizontal angeordnete
   Startrohre"). The PAH-1A1 that came into service from 1991 is known by
   its STEPPED launchers (the three tubes each a step lower and further
   out) and its rounded blade tips, and had a new intake guard and forward
   engine cowlings (de.wikipedia); it is NOT what this model shows. The
   1983 photograph shows the same short endplates as 86+19 does in 2008,
   so the later airframes still give the size of the tail.
   Sight: the gyro-stabilised SFIM APX M397 on the cabin roof above the
   commander on the LEFT, a squat drum with its window facing ahead and a
   long rounded housing behind it (86+49 "front-view" 2013, 87+13 RAF
   Northolt 2006). There is no gun, no armour and no night sight.
   Paint: the Heeresflieger three-tone camouflage of dark green, a lighter
   olive green and black, all over, belly included. The 1983 Roth
   photograph already shows it on a PAH-1 with the row launchers, and the
   1992 colour photographs of 87+17 (Tempelhof) and the Bo 105 M 80+54 give
   the colours. The black-and-white national cross is on the tail boom.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   the point the aircraft is flown at, under the mast at about the height of
   its centre of mass; the skids stand 1.20 m below it on GROUND. render3d.js
   stands the model up with rotation.x = -PI/2 and rescales it by the
   measured X extent.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent, and every node
   counts. The faint main rotor disc reaches 4.92 m ahead of the hub and one
   tail rotor blade is built pointing straight aft, 0.95 m behind its hub
   5.99 m aft. The extent is therefore 11.86 m, the published length with
   both rotors turning. The four main blades sit at 45 degrees, so blade
   phase never sets it.

   NAMED NODES, built exactly as nato_e20_gunship_ah64e.js builds them:
     rotor      render3d.js turns it with rotateOnWorldAxis(scene up), which
                three.js applies in the PARENT's frame. The head therefore
                hangs in the asw_helo_fit.js mount, turned +PI/2 about X, so
                the renderer's axis lands on the model's upward mast and the
                head turns anti-clockwise seen from above, as the Bo 105's
                does. Inside the mount a -PI/2 group puts the head back into
                model axes, so it is authored like everything else.
     rotordisc  inside the rotor, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     tailrotor  the asw_helo_fit.js tail mount (+PI/2 about X). Hub axis
                along local Z, which is the model's lateral axis; local +Z is
                the model's right, so outboard of the fin, on the left, is
                local -Z. The renderer turns it positively about local +Z,
                which is clockwise seen from the left, as the real one turns
                (right only at headings 0 and 180 degrees, as for every
                tail rotor in the game; see nato_e20_gunship_ah64e.js).
   The skids are NOT named "gear": they are fixed and stay down in flight,
   and the renderer hides a "gear" node above 18 m.

   Materials are the house tiers: SKIN (one procedural CanvasTexture,
   roughness 0.86, metalness 0.08), METAL and DARK fittings, the BLADE
   composite, the STORES olive of the HOT tubes, GLASS, the TEAM flash and
   the DISC. Eight in all. The skin UVs are projected from model space by
   face normal (top, port, starboard, belly bands of one sheet), so a
   camouflage patch is the same size in metres on the boom as on the cabin.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBo105P = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* Every number two parts must agree on lives here. x is measured from
     the main rotor hub, forward positive; heights are above the ground. */
  var GROUND   = -1.20;                    /* skid contact plane          */
  function Z(h) { return GROUND + h; }     /* height above ground -> z    */
  var X_NOSE   =  2.57;                    /* front of the nose glazing   */
  var HUB_H    =  2.86;                    /* blade plane; head top 3.02  */
  var ROTOR_R  =  4.92;                    /* 9.84 m disc                 */
  var CHORD    =  0.27;                    /* main blade chord            */
  var TR_R     =  0.95;                    /* 1.90 m tail rotor           */
  var TR_C     =  0.18;                    /* tail rotor blade chord      */
  /* 5.99 m hub to hub and 2.78 m up, in the middle of the gearbox at the
     fin tip as the telephoto side view has it (the manual's 3.80 m to an
     upright blade tip is 2.85); the hub stands 0.30 m out to the LEFT */
  var TR_X = -5.99, TR_Y = 0.30, TR_H = 2.78;
  var SKID_Y   =  1.265;                   /* 2.53 m track                */
  var SKID_R   =  0.045;
  var XT_F = 1.40, XT_R = -0.27;           /* crosstube stations          */
  /* HOT: three 1.30 m tubes a side in one horizontal row, 3.56 m across
     the outer tubes. The row's axis is 1.00 m up: between the door sills
     (0.82 m) and the door handles (1.25 m), a little nearer the sills, in
     the 1983 Roth photograph and in the 1986 "Fraenkischer Schild" one
     (B 145 Bild-F073468-0032), both taken from about the height of the
     cabin roof, which puts the nearer tubes a touch LOW in the picture. */
  var HOT_X = -0.37, HOT_L = 1.30, HOT_R = 0.09, HOT_H = 1.00;
  var HOT_Y = [1.145, 1.415, 1.685];
  /* the tailplane: 2.3 m over the endplates, at the boom's lower half */
  var STAB_H = 1.64, STAB_Y1 = 1.12, STAB_LE = -4.28, STAB_TE = -4.74;

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     projUV() below picks the band from each triangle's face normal.

     The scheme is the Heeresflieger three-tone: a dark green ground broken
     by hard-edged patches of a lighter olive green and of black, sprayed
     over the belly as well. The hexes sit darker than the paint chips,
     because the ACES pass lifts untextured mid tones by about 1.8x. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -7.0, UX1 = 2.9;               /* x covered across the sheet  */
  var QY = 1.9;                            /* |y| covered by top/belly    */
  var QZ0 = Z(-0.05), QZ1 = Z(3.10);       /* z covered by the side bands */
  var SX = TW / (UX1 - UX0);               /* px per metre along x        */
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  var BASE = "#37412f", OLIVE = "#5b6643", BLACK = "#1c1f1c";

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* one hard-edged camouflage patch: an irregular polygon, longer along x */
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
      var x = cx + pts[i][0] * c - pts[i][1] * s;
      var y = cy + pts[i][0] * s + pts[i][1] * c;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath();
    g.fill();
  }

  /* The Bundeswehr cross: a black cross with flared arm ends on a white
     border, as the Heeresflieger carried it on the tail boom. */
  function kreuz(g, cx, cy, r) {
    function path(rr, w0, w1) {
      g.beginPath();
      var q = [[w0, w0], [w1, rr], [-w1, rr], [-w0, w0], [-rr, w1], [-rr, -w1],
               [-w0, -w0], [-w1, -rr], [w1, -rr], [w0, -w0], [rr, -w1], [rr, w1]];
      for (var i = 0; i < q.length; i++) {
        if (i) g.lineTo(cx + q[i][0], cy + q[i][1]); else g.moveTo(cx + q[i][0], cy + q[i][1]);
      }
      g.closePath();
    }
    g.fillStyle = "#e4e4dc"; path(r * 1.14, r * 0.26, r * 0.50); g.fill();
    g.fillStyle = "#101010"; path(r, r * 0.18, r * 0.40); g.fill();
  }

  function skinCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(1051);
    var i, b, x, y;
    var SQ = BAND / (2 * QY), SZ = BAND / (QZ1 - QZ0);   /* px per metre */

    g.fillStyle = BASE; g.fillRect(0, 0, TW, TH);

    /* ---- the camouflage, band by band, so the two sides are not mirror
       images of each other, which a sprayed scheme never is. Patches are
       0.6-1.4 m, hard-edged, olive and black in about equal measure. */
    for (b = 0; b < 4; b++) {
      g.save();
      g.beginPath(); g.rect(0, b * BAND, TW, BAND); g.clip();
      for (i = 0; i < 30; i++) {
        var r = 0.34 + R() * 0.40;
        x = UX0 + R() * (UX1 - UX0);
        var cy = (b === 0) ? pyTop((R() * 2 - 1) * QY)
               : (b === 3) ? pyBelly((R() * 2 - 1) * QY)
               : pySide(QZ0 + R() * (QZ1 - QZ0), b);
        g.fillStyle = (i & 1) ? OLIVE : BLACK;
        blob(g, pxX(x), cy, r * 1.6 * SX, r * ((b === 0 || b === 3) ? SQ : SZ), (R() - 0.5) * 1.1, R);
      }
      g.restore();
    }

    /* ---- sun on the top band, grime down the sides, a dirtier belly ---- */
    g.fillStyle = "rgba(255,255,236,0.045)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 150; i++) {
      g.fillStyle = "rgba(20,20,16," + (0.04 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 8 + R() * 34);
    }
    g.fillStyle = "rgba(0,0,0,0.12)"; g.fillRect(0, 3 * BAND, TW, BAND);

    /* ---- exhaust soot: the Allison stacks blow up and aft, so the stain
       lies on the cowling tail and the top of the boom behind it ---- */
    var sg = g.createLinearGradient(pxX(-0.9), 0, pxX(-3.4), 0);
    sg.addColorStop(0, "rgba(16,15,13,0.45)");
    sg.addColorStop(1, "rgba(16,15,13,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-3.4), pyTop(0.55), pxX(-0.9) - pxX(-3.4), pyTop(-0.55) - pyTop(0.55));
    for (b = 1; b <= 2; b++) {
      g.fillRect(pxX(-3.4), pySide(Z(2.40), b), pxX(-0.9) - pxX(-3.4),
                 pySide(Z(1.80), b) - pySide(Z(2.40), b));
    }

    /* ---- panel seams: frames across the cabin and boom at real stations */
    var frames = [1.74, 1.64, 0.00, -0.60, -1.25, -1.62, -2.30, -3.00, -3.70, -4.40, -5.10];
    g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.32)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    /* the doors, as the telephoto of 86+19 measures them. Front door: its
       forward edge is the glazing frame at 1.74, its rear edge 1.22; the
       rear door runs from 1.18 back to 0.54 m ahead of the hub. Both from
       the sill line 0.82 m up to the roof at 1.92 m, with a handle 1.25 m
       up near each door's rear edge; the sill line runs on under both
       doors. The clamshell split runs up the middle of the rounded tail of
       the pod (painted on the belly and top bands, where the rear of the
       pod projects) */
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.2;
      g.strokeRect(pxX(1.22), pySide(Z(1.92), b), pxX(1.70) - pxX(1.22), pySide(Z(0.82), b) - pySide(Z(1.92), b));
      g.strokeRect(pxX(0.54), pySide(Z(1.92), b), pxX(1.18) - pxX(0.54), pySide(Z(0.82), b) - pySide(Z(1.92), b));
      g.beginPath(); g.moveTo(pxX(-0.40), pySide(Z(0.80), b)); g.lineTo(pxX(1.74), pySide(Z(0.80), b)); g.stroke();
      g.fillStyle = "rgba(170,170,160,0.55)";
      g.fillRect(pxX(1.26), pySide(Z(1.25), b), 7, 2);
      g.fillRect(pxX(0.58), pySide(Z(1.25), b), 7, 2);
      /* the louvred oil cooler outlet on the cowling side, 0.46-0.82 m
         behind the hub (both side photographs) */
      g.fillStyle = "rgba(0,0,0,0.55)";
      for (i = 0; i < 7; i++)
        g.fillRect(pxX(-0.82), pySide(Z(1.84 - i * 0.045), b), pxX(-0.46) - pxX(-0.82), 2);
      /* the stiffening ribs down the console's side face, which the 1983
         and 2013 photographs both show as a row of short uprights */
      g.fillStyle = "rgba(0,0,0,0.45)";
      for (x = 0.55; x < 1.55; x += 0.13)
        g.fillRect(pxX(x), pySide(Z(2.14), b), 2, pySide(Z(1.98), b) - pySide(Z(2.14), b));
      /* the national cross on the boom, 3.1 m behind the hub */
      kreuz(g, pxX(-3.10), pySide(Z(1.70), b), 0.15 * SZ);
    }
    /* the clamshell split and hinge line on the rounded rear */
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(pxX(-1.72), pyBelly(0)); g.lineTo(pxX(-1.10), pyBelly(0)); g.stroke();
    /* walkway lines along the cowling top */
    g.strokeStyle = "rgba(10,10,8,0.40)"; g.lineWidth = 1.2;
    [-0.42, 0.42].forEach(function (q) {
      g.beginPath(); g.moveTo(pxX(-1.2), pyTop(q)); g.lineTo(pxX(0.3), pyTop(q)); g.stroke();
    });
    /* access hatches and inspection panels */
    g.lineWidth = 1.2;
    for (i = 0; i < 50; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 10 + R() * 26, hh = 8 + R() * 18;
      g.strokeStyle = "rgba(0,0,0,0.32)"; g.strokeRect(hx, hy, hw, hh);
    }
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
     or aft (the nose, the rear of the pod, the fin and endplate edges) would
     collapse to a line under an x projection, so they are laid out along
     x + y. */
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x37412f);
    m.metal  = new V.MeshStandardMaterial({ color: 0x575d60, roughness: 0.48, metalness: 0.60 });
    /* skids, crosstubes, exhaust mouths and the sight window frame: the
       Heeresflieger painted the skid gear black */
    m.dark   = new V.MeshStandardMaterial({ color: 0x1b1d1d, roughness: 0.66, metalness: 0.30 });
    /* glass-fibre blades, painted a flat dark grey */
    m.blade  = new V.MeshStandardMaterial({ color: 0x2a2d2c, roughness: 0.80, metalness: 0.06 });
    /* the HOT launch tubes: ordnance olive, not the camouflage */
    m.store  = new V.MeshStandardMaterial({ color: 0x4a5037, roughness: 0.80, metalness: 0.10 });
    /* the big curved nose glazing and the door windows: dark, with a hard
       coat, as they read from above in every photograph */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1b2a31, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    /* The flash is exactly C.team, the same as every hero gunship. The
       emissive keeps it from greying out under ACES. */
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
  /* A convex solid from its faces (each a convex polygon of corners). Each
     face is wound so its normal points away from the solid's centre, so the
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
     each a convex polygon: a fin, a stabiliser, a blade, an endplate. */
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* A six-cornered aerofoil section: leading edge, crest 15% back, the
     after-body at 75%, a sharp trailing edge. le and te are [x, z]; the
     thickness t is laid out by at(x, z, k), which turns chord-plane
     coordinates into a model-space point. */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners:
     flat-sided boxes where e is low, round tubes where it nears 1.
       zb, zt   belly and top          zm   height of the widest point
       wb, wt   half-widths at belly and top corners, wm the widest
     Heights are given ABOVE GROUND and converted here. Sections run from
     nose to tail (decreasing x), and each quad is wound (a, c, b), which
     for that order puts every normal outward; the signed volume of every
     closed piece is checked positive with the model tool. */
  function sec(x, zb, zt, zm, wb, wm, wt, e) {
    return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e };
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
    return pts;
  }
  /* The loft, smooth-shaded, with its quads sorted into two lists by a
     test on each quad's centre: pick(x, y, h) true sends the quad to the
     second list. That is how the cabin pod's glazing is cut out of the one
     surface, so glass and skin share their edges and nothing z-fights. */
  function loft(secs, n, noseDx, tailDx, pick) {
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
    var nor = geo.attributes.normal.array;
    var A = { p: [], n: [] }, B = { p: [], n: [] }, q, k;
    for (q = 0; q < idx.length; q += 6) {
      var cx = 0, cy = 0, cz = 0;
      for (k = 0; k < 6; k++) { cx += pos[idx[q + k] * 3]; cy += pos[idx[q + k] * 3 + 1]; cz += pos[idx[q + k] * 3 + 2]; }
      var dst = (pick && pick(cx / 6, cy / 6, cz / 6 - GROUND)) ? B : A;
      for (k = 0; k < 6; k++) {
        var v = idx[q + k];
        dst.p.push(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]);
        dst.n.push(nor[v * 3], nor[v * 3 + 1], nor[v * 3 + 2]);
      }
    }
    function out(L) {
      if (!L.p.length) return null;
      var gg = new V.BufferGeometry();
      gg.setAttribute("position", new V.Float32BufferAttribute(L.p, 3));
      gg.setAttribute("normal", new V.Float32BufferAttribute(L.n, 3));
      return gg;
    }
    var res = { skin: [], pick: [] };
    if (out(A)) res.skin.push(out(A));
    if (out(B)) res.pick.push(out(B));
    /* domed end caps: a fan to a centre point pushed out along x */
    function cap(kk, dx, front, toPick) {
      var s = secs[kk], rr = ringOf(s, n), t = [], sy = 0, sz = 0;
      for (j = 0; j < rl; j++) { sy += rr[j][0]; sz += rr[j][1]; }
      var o = [s.x + dx, sy / rl, sz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, rr[j][0], rr[j][1]], p1 = [s.x, rr[(j + 1) % rl][0], rr[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      (toPick ? res.pick : res.skin).push(tris(t));
    }
    if (noseDx !== null) cap(0, noseDx, true, pick && pick(secs[0].x, 0, secs[0].zm - GROUND));
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false, false);
    return res;
  }
  function lerpSec(S, x) {
    for (var q = 0; q < S.length - 1; q++) {
      var A = S[q], B = S[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = {};
        ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e"].forEach(function (kk) {
          o[kk] = A[kk] + (B[kk] - A[kk]) * f;
        });
        return o;
      }
    }
    return null;
  }
  /* the point on a section at ring angle th (radians, -90 belly .. +90 top),
     on the port side */
  function onSec(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [s.x, W * Math.pow(Math.abs(c), s.e), z];
  }

  /* ========================================================= the build == */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "bo105p";
    var i, k, s, a;
    var skin = [], glass = [], dark = [], metal = [], store = [], team = [];

    /* ------------------------------------------------- the cabin pod ----
       The Bo 105's egg: a rounded nose that is nearly all glass, the cabin
       1.58 m across at elbow height and flat-bellied 0.35 m off the ground,
       the roof at 1.97 m, and behind the rear doors a rounded tail made by
       the two clamshell cargo doors, under the boom. The profile was traced
       off the side-on telephoto of 86+19; the widths off the head-on one.
       The nose is 2.57 m ahead of the hub, so the glazed bow ahead of the
       door pillar is 0.83 m deep.
                x      zb    zt    zm    wb    wm    wt    e              */
    var POD = [
      sec( 2.52, 0.88, 1.30, 1.08, 0.18, 0.24, 0.17, 0.80),
      sec( 2.43, 0.72, 1.50, 1.08, 0.32, 0.42, 0.30, 0.72),
      sec( 2.29, 0.58, 1.66, 1.08, 0.44, 0.55, 0.40, 0.66),
      sec( 2.11, 0.47, 1.79, 1.09, 0.52, 0.65, 0.47, 0.62),
      sec( 1.93, 0.41, 1.88, 1.10, 0.57, 0.72, 0.52, 0.60),
      sec( 1.74, 0.38, 1.94, 1.10, 0.60, 0.76, 0.56, 0.58),
      sec( 1.64, 0.37, 1.95, 1.10, 0.61, 0.77, 0.57, 0.58),
      sec( 1.27, 0.36, 1.97, 1.10, 0.62, 0.79, 0.58, 0.56),
      sec( 1.10, 0.35, 1.97, 1.10, 0.62, 0.79, 0.58, 0.56),
      sec( 0.66, 0.35, 1.97, 1.10, 0.62, 0.79, 0.58, 0.56),
      sec( 0.00, 0.35, 1.97, 1.11, 0.62, 0.79, 0.58, 0.56),
      sec(-0.60, 0.35, 1.97, 1.12, 0.61, 0.77, 0.57, 0.57),
      sec(-0.90, 0.39, 1.96, 1.14, 0.58, 0.74, 0.55, 0.58),
      sec(-1.15, 0.47, 1.95, 1.18, 0.53, 0.69, 0.52, 0.60),
      sec(-1.35, 0.60, 1.94, 1.24, 0.45, 0.61, 0.47, 0.64),
      sec(-1.50, 0.76, 1.92, 1.32, 0.35, 0.50, 0.40, 0.68),
      sec(-1.62, 0.96, 1.88, 1.40, 0.24, 0.36, 0.30, 0.74),
      sec(-1.70, 1.18, 1.80, 1.46, 0.12, 0.20, 0.17, 0.82),
    ];
    /* Glazing: the whole nose ahead of the door pillar at 1.74 m, down to
       the sill of the chin windows 0.80 m up (below it the nose is painted,
       as 86+19 shows it); the front door windows (1.27-1.64 m, 1.14-1.84 m
       up) and the rear door windows (0.66-1.10 m, 1.30-1.84 m up), both
       sides. */
    function isGlass(x, y, h) {
      if (x > 1.74) return h > 0.80;
      var side = Math.abs(y) > 0.45;
      if (side && x > 1.27 && x < 1.64 && h > 1.14 && h < 1.84) return true;
      if (side && x > 0.66 && x < 1.10 && h > 1.30 && h < 1.84) return true;
      return false;
    }
    var pod = loft(POD, 14, X_NOSE - POD[0].x, 0.03, isGlass);
    for (i = 0; i < pod.skin.length; i++) skin.push(pod.skin[i]);
    for (i = 0; i < pod.pick.length; i++) glass.push(pod.pick[i]);
    /* The glazing frames: the centre post of the windscreen and the frame
       that runs round the nose 1.20 m up, between the windscreen and the
       chin windows (86+19), each a bar laid along the pod's own surface.
       The pillar between the nose glazing and the front door is the band
       of skin the loft leaves between 1.74 and 1.64 m. */
    var fr = 0.028;
    /* the ring angle at which a section's upper half passes height h */
    function thAt(sc, h) {
      var f = Math.max(0, Math.min(1, (Z(h) - sc.zm) / (sc.zt - sc.zm)));
      return Math.asin(Math.pow(f, 1 / sc.e));
    }
    function along(xs, h, side) {
      var pts = xs.map(function (x) {
        var sc = lerpSec(POD, x), p = onSec(sc, h === null ? PI / 2 : thAt(sc, h));
        return [p[0], side * p[1], p[2]];
      });
      for (var q = 0; q < pts.length - 1; q++) skin.push(bar(pts[q], pts[q + 1], fr, 4, true));
    }
    var noseXs = [2.52, 2.43, 2.29, 2.11, 1.93, 1.74];
    along(noseXs, 1.20, 1); along(noseXs, 1.20, -1);            /* windscreen sill */
    along([2.43, 2.29, 2.11, 1.93, 1.74], null, 1);             /* centre post   */
    /* the two windscreen wipers, parked upright */
    for (s = -1; s <= 1; s += 2) {
      var w0 = onSec(lerpSec(POD, 2.22), 30 * D2R), w1 = onSec(lerpSec(POD, 1.98), 62 * D2R);
      dark.push(bar([w0[0], s * w0[1] * 0.55, w0[2]], [w1[0], s * w1[1] * 0.60, w1[2]], 0.010, 4, true));
    }

    /* ------------------------------------------------- the upper deck ----
       Everything above the cabin roof in one piece: the equipment console
       across the front of the roof (1.64 to 0.40 m ahead of the hub, its
       top 2.17 m), which carries the sight; the main gearbox fairing under
       the mast with the engine air intake in its forward face; and the
       cowling over the two Allisons, its top 2.36 m, which falls away into
       the top of the tail boom 2 m behind the hub. Its bottom lies inside
       the pod, and its sides meet the pod's shoulders. */
    var DECK = [
      sec( 1.64, 1.72, 2.08, 1.95, 0.36, 0.40, 0.34, 0.40),
      sec( 1.56, 1.72, 2.17, 2.00, 0.46, 0.50, 0.46, 0.34),
      sec( 0.46, 1.72, 2.17, 2.00, 0.48, 0.52, 0.48, 0.34),
      sec( 0.40, 1.72, 2.18, 2.00, 0.48, 0.52, 0.47, 0.34),
      sec( 0.36, 1.72, 2.30, 2.02, 0.46, 0.50, 0.42, 0.40),
      sec( 0.20, 1.72, 2.36, 2.04, 0.48, 0.52, 0.42, 0.42),
      sec(-0.95, 1.72, 2.36, 2.04, 0.48, 0.52, 0.42, 0.42),
      sec(-1.25, 1.72, 2.28, 2.02, 0.44, 0.47, 0.38, 0.46),
      sec(-1.55, 1.74, 2.12, 1.96, 0.34, 0.37, 0.30, 0.52),
      sec(-1.85, 1.76, 1.98, 1.88, 0.22, 0.24, 0.20, 0.62),
      sec(-2.00, 1.80, 1.93, 1.87, 0.14, 0.16, 0.12, 0.75),
    ];
    var deck = loft(DECK, 10, 0.02, 0.02, null);
    for (i = 0; i < deck.skin.length; i++) skin.push(deck.skin[i]);
    /* the engine air intake: a dark grille in the step up to the gearbox
       fairing, framed, facing forward */
    dark.push(box(0.03, 0.62, 0.10, 0.395, 0, Z(2.24)));
    metal.push(box(0.05, 0.66, 0.02, 0.39, 0, Z(2.295)));
    /* and the side intakes of the gearbox fairing, either side of the mast
       (the 1986 photograph shows the dark opening under the head) */
    both(dark, box(0.26, 0.02, 0.14, 0.18, 0.505, Z(2.19)));

    /* ---- the APX M397 sight, above the commander's seat on the LEFT: the
       head, a squat drum with its window facing ahead, and the long rounded
       housing of the stabilised mirror and relay optics behind it; the
       head's lid is 2.48 m above the ground. */
    var SY = 0.26, SGX = 1.10;
    skin.push(cyl(0.15, 0.16, 0.30, 14, "z", SGX, SY, Z(2.32)));
    skin.push(cyl(0.155, 0.155, 0.02, 14, "z", SGX, SY, Z(2.475)));
    var HSG = [
      sec( 1.04, 2.15, 2.30, 2.22, 0.13, 0.15, 0.12, 0.60),
      sec( 0.90, 2.15, 2.37, 2.24, 0.15, 0.17, 0.14, 0.55),
      sec( 0.66, 2.15, 2.35, 2.23, 0.15, 0.17, 0.14, 0.55),
      sec( 0.54, 2.15, 2.26, 2.20, 0.12, 0.13, 0.10, 0.65),
    ];
    var hsg = loft(HSG, 8, 0.02, 0.04, null);
    for (i = 0; i < hsg.skin.length; i++) { hsg.skin[i].translate(0, SY, 0); skin.push(hsg.skin[i]); }
    glass.push(box(0.03, 0.16, 0.10, SGX + 0.145, SY, Z(2.35)));
    dark.push(box(0.05, 0.20, 0.03, SGX + 0.15, SY, Z(2.425)));
    /* the blade aerial on the console, abreast of the sight on the right */
    dark.push(box(0.20, 0.02, 0.36, 1.26, -0.30, Z(2.34), 0, -0.25, 0));
    /* pitot head on the roof front */
    metal.push(bar([1.70, 0.12, Z(2.00)], [1.95, 0.12, Z(2.02)], 0.012, 5, true));

    /* ---- engine exhausts: two stacks along each edge of the cowling top,
       a short round one and behind it a curved pipe whose mouth faces up,
       aft and outboard. 87+13 at Northolt (2006) shows both on each side
       with their orange covers on, and the 1983 photograph the curved pipes. */
    both(dark, cyl(0.075, 0.075, 0.16, 10, "z", -0.58, 0.40, Z(2.36)));
    both(metal, cyl(0.082, 0.082, 0.03, 10, "z", -0.58, 0.40, Z(2.44)));
    var ex = [bar([-0.98, 0.36, Z(2.26)], [-0.98, 0.40, Z(2.40)], 0.095, 10, true),
              bar([-0.98, 0.40, Z(2.40)], [-1.12, 0.47, Z(2.48)], 0.095, 10, true)];
    both(skin, ex[0]); both(skin, ex[1]);
    both(dark, disc(0.080, 10, [-1.15, 0.485, Z(2.50)], [-0.60, 0.33, 0.73]));

    /* ------------------------------------------------------ tail boom ----
       A tapered round tube from the top of the pod's rear, 0.50 m across at
       its root and 0.29 m at the fin, run almost level at 1.70 m. */
    function tube(x, r, h) { return sec(x, h - r, h + r, h, r, r, r, 1.0); }
    var BOOM = [tube(-1.45, 0.25, 1.68), tube(-2.00, 0.235, 1.69), tube(-2.60, 0.205, 1.70),
                tube(-3.20, 0.180, 1.70), tube(-4.20, 0.165, 1.71), tube(-5.00, 0.155, 1.72),
                tube(-5.30, 0.148, 1.72), tube(-5.46, 0.10, 1.72)];
    var boom = loft(BOOM, 10, null, 0.02, null);
    for (i = 0; i < boom.skin.length; i++) skin.push(boom.skin[i]);
    /* the rounded blister and the flat box under the boom that the side
       photographs of 80+54 (1992) and 87+28 show */
    skin.push(sph(0.13, 12, 6, -3.62, 0, Z(1.53), 1.3, 1, 0.9));
    skin.push(box(0.34, 0.24, 0.10, -4.10, 0, Z(1.54)));

    /* -------------------------------------------------------- the fin ----
       Its leading edge leaves the top of the boom 4.95 m behind the hub
       and sweeps back about 42 degrees; the trailing edge rises from the
       foot of the fin 5.45 m behind the hub, level with the underside of
       the boom, where the boom ends, and sweeps back about 24 degrees to
       the tip over the tail rotor hub, which is where 86+19 and 87+28 show
       the airframe ending, 8.59 m from the nose. The tail rotor gearbox
       sits on the tip. */
    function finAt(x, z, kk) { return [x, kk, z]; }
    var finRoot = foil([-4.95, Z(1.86)], [-5.45, Z(1.52)], 0.16, finAt);
    var finTip = foil([-5.76, Z(2.76)], [-6.00, Z(2.76)], 0.11, finAt);
    skin.push(solid(finRoot, finTip));
    /* the tail rotor gearbox fairing over the fin tip, rounded ahead; the
       shaft comes out on the LEFT to the hub, under a bulge on that face */
    var CAP = [
      sec(-5.60, 2.74, 2.88, 2.80, 0.05, 0.07, 0.05, 0.80),
      sec(-5.72, 2.70, 2.93, 2.81, 0.09, 0.11, 0.08, 0.62),
      sec(-5.92, 2.70, 2.94, 2.81, 0.09, 0.11, 0.08, 0.62),
      sec(-6.00, 2.74, 2.90, 2.81, 0.06, 0.08, 0.05, 0.75),
    ];
    var fcap = loft(CAP, 8, 0.05, 0.02, null);
    for (i = 0; i < fcap.skin.length; i++) skin.push(fcap.skin[i]);
    skin.push(sph(0.10, 10, 6, TR_X, 0.09, Z(TR_H), 1.2, 0.8, 1.1));
    metal.push(cyl(0.040, 0.040, 0.20, 10, "y", TR_X, 0.19, Z(TR_H)));
    /* the anti-collision light on the fin tip */
    dark.push(cyl(0.035, 0.035, 0.06, 8, "z", -5.80, 0, Z(2.96)));
    /* the tail skid: a bent tube from under the boom just ahead of the fin,
       running back under it to keep the rotor off the ground in a flare,
       its lowest point 1.35 m up (86+19 shows where it starts) */
    metal.push(bar([-4.90, 0, Z(1.56)], [-5.76, 0, Z(1.34)], 0.022, 6, true));
    metal.push(bar([-5.76, 0, Z(1.34)], [-5.92, 0, Z(1.38)], 0.022, 6, true));

    /* ----------------------------------------------- the tailplane ----
       A fixed stabiliser through the boom 4.28-4.74 m behind the hub, with
       a tall endplate at each tip 0.43 m in chord and 1.28 to 1.98 m high,
       the stabiliser's trailing edge showing just behind it (86+19). */
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + kk]; }; }
    var stR = foil([STAB_LE, 0], [STAB_TE, 0], 0.070, stabAt(0.10));
    var stT = foil([STAB_LE - 0.01, 0], [STAB_TE, 0], 0.060, stabAt(STAB_Y1));
    both(skin, solid(stR, stT));
    function plate(y0, y1) {
      var o = [[-4.26, 1.36], [-4.29, 1.94], [-4.34, 1.98], [-4.64, 1.98], [-4.69, 1.93],
               [-4.69, 1.32], [-4.64, 1.28], [-4.34, 1.28]];
      return solid(o.map(function (p) { return [p[0], y0, Z(p[1])]; }),
                   o.map(function (p) { return [p[0], y1, Z(p[1])]; }));
    }
    both(skin, plate(STAB_Y1 - 0.01, STAB_Y1 + 0.025));

    /* ------------------------------------------------------ the skids ----
       Two crosstubes, 1.40 m ahead of the hub and 0.27 m behind it, each
       leaving the belly almost level and bending down to a skid 2.53 m
       track. The skids run 2.7 m and turn up at the toe. */
    function crosstube(x) {
      var pA = [x, 0.30, Z(0.40)], pB = [x, 0.78, Z(0.33)], pC = [x, SKID_Y - 0.02, Z(0.08)];
      both(dark, bar(pA, pB, 0.042, 6, true));
      both(dark, bar(pB, pC, 0.042, 6, true));
      both(dark, sph(0.045, 6, 3, pB[0], pB[1], pB[2]));
      /* the saddle clamp on the skid */
      both(dark, box(0.14, 0.07, 0.06, x, SKID_Y, Z(0.10)));
    }
    crosstube(XT_F); crosstube(XT_R);
    var sk = [[-0.45, Z(SKID_R)], [1.95, Z(SKID_R)], [2.16, Z(0.09)], [2.30, Z(0.20)]];
    for (k = 0; k < sk.length - 1; k++)
      both(dark, bar([sk[k][0], SKID_Y, sk[k][1]], [sk[k + 1][0], SKID_Y, sk[k + 1][1]], SKID_R, 6, true));
    both(dark, sph(SKID_R, 6, 3, -0.45, SKID_Y, Z(SKID_R)));

    /* ------------------------------------------------ the HOT launchers --
       Three 1.30 m launch tubes a side, side by side in one level row on an
       outrigger at the rear of the cabin: the PAH-1 as built. The outrigger
       is two tubular arms from the lower fuselage under a rail plate that
       carries the tubes, with a stay from the cabin side above. Each tube
       has a flared ring at either end and a dark mouth. */
    var hx0 = HOT_X + HOT_L / 2, hx1 = HOT_X - HOT_L / 2;
    for (k = 0; k < 3; k++) {
      var ty = HOT_Y[k];
      both(store, cyl(HOT_R, HOT_R, HOT_L - 0.08, 10, "x", HOT_X, ty, Z(HOT_H), true));
      both(store, cyl(HOT_R + 0.012, HOT_R + 0.012, 0.06, 10, "x", hx0 - 0.03, ty, Z(HOT_H), true));
      both(store, cyl(HOT_R + 0.012, HOT_R + 0.012, 0.06, 10, "x", hx1 + 0.03, ty, Z(HOT_H), true));
      both(dark, disc(HOT_R + 0.012, 10, [hx0 - 0.004, ty, Z(HOT_H)], [1, 0, 0]));
      both(dark, disc(HOT_R + 0.012, 10, [hx1 + 0.004, ty, Z(HOT_H)], [-1, 0, 0]));
    }
    /* the rail plate under the row, and the two straps over it */
    var rowY = (HOT_Y[0] + HOT_Y[2]) / 2, rowW = HOT_Y[2] - HOT_Y[0] + 2 * HOT_R + 0.04;
    both(metal, box(1.02, rowW, 0.05, HOT_X + 0.04, rowY, Z(HOT_H - HOT_R - 0.03)));
    both(metal, box(0.06, rowW, 0.05, HOT_X + 0.38, rowY, Z(HOT_H + HOT_R + 0.01)));
    both(metal, box(0.06, rowW, 0.05, HOT_X - 0.36, rowY, Z(HOT_H + HOT_R + 0.01)));
    /* the outrigger arms and the stay */
    var RB = HOT_H - HOT_R - 0.06;
    both(metal, bar([HOT_X + 0.25, 0.58, Z(0.62)], [HOT_X + 0.25, HOT_Y[1], Z(RB)], 0.035, 6, true));
    both(metal, bar([HOT_X - 0.25, 0.58, Z(0.62)], [HOT_X - 0.25, HOT_Y[1], Z(RB)], 0.035, 6, true));
    both(metal, bar([HOT_X + 0.25, 0.58, Z(0.62)], [HOT_X - 0.25, HOT_Y[1], Z(RB)], 0.022, 6, true));
    both(metal, bar([HOT_X - 0.05, 0.52, Z(1.80)], [HOT_X - 0.05, HOT_Y[0] - 0.02, Z(HOT_H + HOT_R + 0.02)], 0.020, 6, true));

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down: the tops of the
       two tailplane halves, as a thin plate laid 1 cm clear of the
       aerofoil's upper surface between 18% and 72% chord, and a band right
       round the boom ahead of the tailplane, cut from the boom's own
       sections 3% oversize, so it reads from the side as well. Those two
       are 4-5 m behind the cabin, and once the renderer has scaled every
       gunship to one length they would come to about 60% of the team
       colour the AH-64E shows. So there is a third flash where the eye
       goes first: a panel on the flat top of the engine cowling, behind
       the mast and between the exhaust stacks, laid 1-2 cm clear of it.
       With it the upward-facing team colour is 86% of the Apache's. */
    function flashStab(y0, y1) {
      function top(f, y, kk) {
        var t = 0.070 + (0.060 - 0.070) * (y - 0.10) / (STAB_Y1 - 0.10);
        return [STAB_LE + (STAB_TE - STAB_LE) * f, y, Z(STAB_H) + t * (0.5 - 0.12 * (f - 0.15) / 0.6) + kk];
      }
      var lo = [top(0.18, y0, 0.010), top(0.72, y0, 0.010), top(0.72, y1, 0.010), top(0.18, y1, 0.010)];
      var hi = [top(0.18, y0, 0.024), top(0.72, y0, 0.024), top(0.72, y1, 0.024), top(0.18, y1, 0.024)];
      return solid(lo, hi);
    }
    both(team, flashStab(0.24, 1.06));
    var bandSecs = [], bx = [-3.66, -4.10];
    for (i = 0; i < 2; i++) {
      var B0 = lerpSec(BOOM, bx[i]);
      var rr = (B0.zt - B0.zm) * 1.03;
      bandSecs.push({ x: bx[i], zm: B0.zm, zb: B0.zm - rr, zt: B0.zm + rr, wb: rr, wm: rr, wt: rr, e: 1.0 });
    }
    team.push(loft(bandSecs, 10, null, null, null).skin[0]);
    var CT = Z(2.36);
    team.push(box(0.62, 0.48, 0.012, -0.59, 0, CT + 0.016));

    /* --------------------------------------------- airframe meshes ---- */
    /* the mast, the swashplate and its fixed ring: they do not turn with
       the head, so they go in the fixed fittings */
    metal.push(cyl(0.070, 0.080, HUB_H - 2.30, 12, "z", 0, 0, Z((HUB_H + 2.30) / 2)));
    metal.push(cyl(0.22, 0.22, 0.04, 16, "z", 0, 0, Z(2.52)));
    dark.push(cyl(0.12, 0.16, 0.10, 12, "z", 0, 0, Z(2.44)));
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "stores");
    mesh(g, team, T.team, "team");

    /* ======================================================= main rotor ==
       The mount. Its +PI/2 about X puts the renderer's spin axis (scene
       up, taken in this frame) on the mast pointing UP, so the rotor turns
       anti-clockwise from above, as the Bo 105's does. head undoes the turn
       so the head is authored in model axes, origin at the blade plane. */
    var mnt = new V.Group();
    mnt.position.set(0, 0, Z(HUB_H));
    mnt.rotation.x = PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);

    /* The hingeless head: a solid titanium hub, and at each arm the long
       pitch-bearing housing the blade is bolted to. Near each root hang
       the pair of pendulum vibration absorbers, the round weights on
       stalks that every photograph of a Bo 105 head shows. */
    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.17, 0.19, 0.18, 12, "z", 0, 0, 0));
    hubM.push(cyl(0.09, 0.12, 0.08, 10, "z", 0, 0, 0.12));      /* top 3.02 m */
    hubM.push(cyl(0.05, 0.05, 0.02, 6, "z", 0, 0, 0.15));
    hubM.push(cyl(0.21, 0.21, 0.03, 12, "z", 0, 0, -0.23));      /* turning ring */
    /* Blade outline, blade along +X. The rotor turns anti-clockwise from
       above, so the leading edge is on the +Y side, the quarter chord on
       the pitch axis; square tips on the PAH-1's original blades. */
    var LE = CHORD * 0.25, TE = LE - CHORD, BT = 0.016;
    var bo = [[0.62, LE - 0.06], [0.88, LE], [ROTOR_R, LE], [ROTOR_R, TE], [0.88, TE], [0.62, TE + 0.06]];
    for (k = 0; k < 4; k++) {
      /* 45, 135, 225 and 315 degrees: no blade along the fuselage */
      a = (45 + 90 * k) * D2R;
      var bl = solid(bo.map(function (p) { return [p[0], p[1], BT]; }),
                     bo.map(function (p) { return [p[0], p[1], -BT]; }));
      bl.rotateX(6 * D2R);                    /* collective pitch */
      bl.rotateZ(a);
      blades.push(bl);
      var parts = [[cyl(0.055, 0.065, 0.52, 8, "x", 0.42, 0, 0), hubM],
                   [box(0.20, 0.14, 0.08, 0.72, 0, 0), hubM],
                   [bar([0.62, 0.10, -0.02], [0.62, 0.10, -0.14], 0.010, 3, true), hubD],
                   [bar([0.62, -0.10, -0.02], [0.62, -0.10, -0.14], 0.010, 3, true), hubD],
                   [sph(0.045, 6, 3, 0.62, 0.10, -0.16), hubD],
                   [sph(0.045, 6, 3, 0.62, -0.10, -0.16), hubD],
                   [bar([0.30, 0.12, -0.03], [0.30, 0.12, -0.22], 0.015, 4, true), hubD]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_absorbers");
    mesh(head, blades, T.blade, "blades");
    /* One upward face is all a camera above the machine ever sees. It
       also casts no shadow: under the PCF shadow map three draws a
       FrontSide material with its BACK faces, and this disc's back faces
       away from the sun. */
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       asw_helo_fit.js tail mount: +PI/2 about X, so inside it local X is
       the model's X, local Y the model's up and local Z the model's
       right-hand side. The hub axis runs along local Z, and the rotor is on
       the LEFT of the fin, so outboard is local -Z. Two blades of 0.18 m
       chord, built fore and aft: the aft one is the back of the box (see
       WHAT SETS THE SCALE). The renderer turns the node positively about
       local +Z: clockwise seen from the left, the forward blade rising and
       the lower one advancing, so each blade's leading edge is the side it
       moves toward and the 8 degrees of pitch raise it toward +Z, a thrust
       to the right against the fuselage's torque from an anti-clockwise
       main rotor. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.06, 0.07, 0.12, 10, "z", 0, 0, 0), cyl(0.035, 0.02, 0.06, 8, "z", 0, 0, -0.09),
               box(0.30, 0.07, 0.06, 0, 0, 0)];
    var trB = [];
    var tAng = [0, 180];
    for (k = 0; k < 2; k++) {
      var tb = box(TR_R - 0.14, TR_C, 0.025, 0.14 + (TR_R - 0.14) / 2, 0, -0.01);
      tb.rotateX(8 * D2R);                    /* blade pitch */
      tb.rotateZ(tAng[k] * D2R);
      trB.push(tb);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");

    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent, main rotor disc front to the tip of the
   aft tail rotor blade; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["deu_e80_gunship"] = { len: 11.86, build: HeroBo105P.build };
