/* ======= pact_e20_gunship_mi28n.js - HERO model: Mil Mi-28N Night Hunter =======
   The helo_p key: the Russian gunship every NATO player fights in the
   default match. It is built 27-57 times in a half-hour game and flies at
   46 m, right under the camera, so it gets a hero build of its own.

   The hand-built units3d.js entry had four things wrong:
     - a TWIN-barrel chin gun. The 2A42 is a single 30 mm barrel;
     - a fuselage loft wound inside out;
     - box blades on a rotor hung straight under the model root, so the
       renderer spun it about the lateral axis and it windmilled on its side;
     - no disc for the renderer to fade.

   Reference: Mil Mi-28N as built by Rostvertol and flown by Russian Army
   Aviation from 2009 to date. Dimensions from the Mi-28NE technical
   description and the published data sheets:
     fuselage length  17.01 m   with the cannon; nose sight to fin trailing
                                edge 16.85 m, so the muzzle stands 0.16 m proud
     main rotor       17.20 m   five blades of 0.67 m chord, turning CLOCKWISE
                                seen from above, as every Mil rotor does
     tail rotor        3.84 m   four blades of 0.24 m chord, set as two
                                two-blade rotors crossing at 45 degrees, on the
                                RIGHT side of the fin
     stub wing span    4.88 m   over the wingtip pods
     height            3.82 m   ground to the top of the hub
                       4.81 m   ground to the top of the N025 radar ball
     undercarriage     track 2.29 m, wheelbase 11.0 m, main tyres 720 x 320,
                       tailwheel 480 x 200, all fixed
     powerplant        two Klimov TV3-117VMA, one in each of two nacelles set
                       wide apart so a single hit cannot take both
     crew              two, in separate armoured cockpits stepped in tandem:
                       the gunner forward and low, the pilot behind and high
   Stations along the airframe were measured off two in-flight side views
   of Russian Air Force Mi-28Ns on Wikimedia Commons (RF-95324 "07" and
   RF-13492 "52"), whose long lens makes them almost orthographic. Scaled
   on the 11.0 m wheelbase, both put the main axle 4.2 m, the main hub
   5.4 m, the tail rotor hub 15.9 m and the tailwheel 15.2 m behind the
   nose sight. Heights at the tail were measured against the 480 mm
   tailwheel in ground photographs of "15", "38", "82" and RF-95345: tail
   rotor hub 3.3 m, boom top at the fin root 1.6-1.7 m, boom bottom
   0.6-0.8 m. The Mi-28's long tail boom is deep and LOW, carried almost
   level with the belly, and the tall swept fin rises from its end with
   the tailwheel on a short fork right under it. A rear view (HeliRussia)
   shows the single braced stabiliser on the left of the fin tip, and a
   head-on view (MAKS 2017) the stub wings, thick at the root and drooping
   about 6 degrees to the tips.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   the point the aircraft is flown at, near the wing root. The wheels stand
   2.05 m below it on GROUND. render3d.js stands the model up with
   rotation.x = -PI/2 and rescales it by the measured X extent.

   WHAT SETS THE SCALE. The renderer scales by Box3 X extent, and every node
   counts. The faint rotor disc reaches 8.6 m ahead of the hub, so it (and
   not the fuselage) is the front of the box; the port stabiliser's
   trailing edge is the back of it. The measured extent, about 20.1 m, is
   the airframe plus the turning rotor ahead of the nose, which is the
   size the machine actually occupies in flight. Blade phase no longer
   matters: the five blades sit symmetrically at +-36, +-108 and 180
   degrees, the nearest a five-blade head can come to 45. The tail rotor
   has no disc of its own. A second 3.84 m disc would add a further 0.8 m
   behind the fin for a blur that the top-down camera sees edge-on.

   NAMED NODES, and why each mount is built the way it is:
     rotor      render3d.js turns it positively about whichever of its own
                axes lies along the mast. The head hangs in a mount turned
                -PI/2 about X, which points that axis, its local +Y, DOWN
                the mast, so the head turns clockwise seen from above, as a
                Mil rotor does. (The asw_helo_fit.js mount uses +PI/2 and
                turns the American way.) Inside the mount, a +PI/2 group
                puts the head back into model axes, so it is authored like
                everything else.
     rotordisc  inside the rotor, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     tailrotor  the asw_helo_fit.js tail mount (+PI/2 about X). Hub axis
                along local Z, which is the model's lateral axis.
   The chin gun is NOT named "turret". helo_p has no def.turret, so tang is
   never steered, and the renderer would slew the gun by whatever heading
   the aircraft had accumulated since it spawned.
   The undercarriage is NOT named "gear". The Mi-28's wheels are fixed and
   stay down in flight, and the renderer hides a "gear" node above 18 m.

   Materials are the house tiers: SKIN (one procedural CanvasTexture,
   roughness 0.86, metalness 0.08), METAL and DARK fittings, RUBBER, the
   BLADE composite, a STORES olive, GLASS, the TEAM flash and the DISC.
   Nine in all. The skin UVs are projected from model space by face normal
   (top, port, starboard, belly bands of one sheet), so a camouflage blob
   is the same size in metres on a wing as on the fuselage, and every
   downward-facing surface picks up the pale belly colour without a
   second material.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMi28N = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* Every number two parts must agree on lives here. */
  var GROUND   = -2.05;                    /* wheel contact plane         */
  function Z(h) { return GROUND + h; }     /* height above ground -> z    */
  var X_NOSE   =  5.68;                    /* front of the nose sight     */
  var HUB_X    =  0.20;                    /* 5.48 m behind the nose      */
  var HUB_H    =  3.60;                    /* hub centre; cap top at 3.84 */
  var ROTOR_R  =  8.60;                    /* 17.2 m disc                 */
  var CHORD    =  0.67;                    /* main blade chord            */
  var MAST_TILT = 4.5 * D2R;               /* shaft leans forward         */
  var TR_R     =  1.92;                    /* 3.84 m tail rotor           */
  /* 15.9-16.1 m behind the nose sight: the photographs give 15.9, and
     10.5 m hub to hub keeps the 21.16 m length with rotors turning */
  var TR_X = -10.32, TR_Y = -0.40, TR_H = 3.30;
  var NAC_Y    =  1.02;                    /* engine nacelle centreline   */
  var NAC_H    =  2.55;
  /* Stub wing: mid-plane WING_H at the root, drooping WING_ANH to the
     tip; 0.36 m thick at the root and 0.19 m at the tip. */
  var WING_H   =  1.86, WING_ROOT = 0.50, WING_ANH = 6 * D2R;
  var WT_ROOT  =  0.36, WT_TIP = 0.19;
  var PYL_IN   =  1.38, PYL_OUT = 2.00;    /* pylon stations, each side   */
  var TIP_Y    =  2.26;                    /* wing ends; pods out to 2.43 */
  function wingMid(y) { return WING_H - (y - WING_ROOT) * Math.tan(WING_ANH); }
  function wingT(y) { return WT_ROOT + (WT_TIP - WT_ROOT) * (y - WING_ROOT) / (TIP_Y - WING_ROOT); }
  /* The fin, as its outline in the XZ plane (heights above ground). The
     leading edge leaves the boom top 14.6 m behind the nose, the trailing
     edge meets the boom bottom over the tailwheel, and both sweep back
     about 33 degrees to a tip at 3.40 m. */
  var FIN_LE0 = [-8.78, 1.45], FIN_LE1 = [-10.08, 3.40];
  var FIN_TE0 = [-9.72, 0.90], FIN_TE1 = [-11.26, 3.40];
  var FIN_HT  =  0.14;                     /* half its thickness          */
  /* the stabiliser: port side only, high on the fin, opposite the rotor */
  var STAB_H = 3.36, STAB_Y0 = 0.06, STAB_Y1 = 1.97;

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, each a projection of the
     airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     projUV() below picks the band from each triangle's face normal.

     The scheme is the Russian Army Aviation disruptive camouflage that
     Rostvertol delivers the Mi-28N in: olive green broken with a darker
     green and a brown, hard-edged, over a pale blue-grey underside. The
     hexes sit darker than the paint chips, because the ACES pass lifts
     untextured mid tones by about 1.8x. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -12.0, UX1 = 6.4;              /* x covered across the sheet  */
  var QY = 2.8;                            /* |y| covered by top/belly    */
  var QZ0 = -2.3, QZ1 = 3.1;               /* z covered by the side bands */
  var SX = TW / (UX1 - UX0);               /* px per metre along x        */
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyBelly(y)   { return 3 * BAND + (QY - y) / (2 * QY) * BAND; }

  var BASE = "#4c5534", DARKG = "#323a25", BROWN = "#574832", BELLY = "#76858c";

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* one hard-edged camouflage blob: an irregular polygon, longer along x */
  function blob(g, cx, cy, rx, ry, rot, R) {
    var n = 14, i, a, k, pts = [];
    for (i = 0; i < n; i++) {
      a = i / n * PI * 2;
      k = 0.72 + R() * 0.46;
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

  /* the red star, white-bordered as on current Russian military aircraft */
  function star(g, cx, cy, r) {
    function path(rr) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? rr * 0.40 : rr;
        var x = cx + Math.cos(a) * q, y = cy + Math.sin(a) * q;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#b22a22"; path(r * 1.22); g.fill();
    g.fillStyle = "#e6e6e0"; path(r * 1.08); g.fill();
    g.fillStyle = "#b22a22"; path(r); g.fill();
  }

  function skinCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(2809);
    var i, b, x, y, zb;
    var SQ = BAND / (2 * QY), SZ = BAND / (QZ1 - QZ0);   /* px per metre */

    g.fillStyle = BASE; g.fillRect(0, 0, TW, 3 * BAND);

    /* ---- disruptive pattern, band by band. Each band gets its own blobs,
       so the two sides are not mirror images of each other, which a
       sprayed scheme never is. Blobs are 0.5-1.3 m, hard-edged. */
    for (b = 0; b < 3; b++) {
      g.save();
      g.beginPath(); g.rect(0, b * BAND, TW, BAND); g.clip();
      for (i = 0; i < 34; i++) {
        var r = 0.50 + R() * 0.80;
        x = UX0 + R() * (UX1 - UX0);
        var cy = b === 0 ? pyTop((R() * 2 - 1) * QY)
                         : pySide(QZ0 + R() * (QZ1 - QZ0), b);
        g.fillStyle = (i % 3 === 0) ? BROWN : DARKG;
        blob(g, pxX(x), cy, r * 1.45 * SX, r * (b === 0 ? SQ : SZ), (R() - 0.5) * 0.9, R);
      }
      g.restore();
    }

    /* ---- sun on the top band, a little grime down the sides ---- */
    g.fillStyle = "rgba(255,255,240,0.05)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 160; i++) {
      g.fillStyle = "rgba(24,22,18," + (0.04 + R() * 0.08).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 10 + R() * 40);
    }

    /* ---- exhaust soot. The suppressors turn the gas DOWN and aft, so the
       stain runs back along the sides of the tail boom, behind the outlets
       at x -2.5. */
    for (b = 1; b <= 2; b++) {
      var sg = g.createLinearGradient(pxX(-2.3), 0, pxX(-6.5), 0);
      sg.addColorStop(0, "rgba(22,20,18,0.42)");
      sg.addColorStop(1, "rgba(22,20,18,0)");
      g.fillStyle = sg;
      g.fillRect(pxX(-6.5), pySide(Z(2.25), b), pxX(-2.3) - pxX(-6.5),
                 pySide(Z(1.05), b) - pySide(Z(2.25), b));
    }

    /* ---- panel seams: frames across the airframe at real stations ---- */
    var frames = [5.10, 4.47, 3.90, 3.30, 2.70, 2.10, 1.50, 1.05, 0.55, -0.20,
                  -0.90, -1.60, -2.40, -3.30, -4.20, -5.20, -6.20, -7.20,
                  -8.20, -9.20, -10.10];
    g.lineWidth = 1.6;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.07)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      /* rivet rows beside the frame */
      g.fillStyle = "rgba(0,0,0,0.24)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.6, 1.6);
    }
    /* stringers: side bands at real heights, top band either side of the
       spine and along the nacelle tops */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    [1.05, 1.45, 1.95, 2.40, 2.85].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
      }
    });
    [-1.02, -0.35, 0.35, 1.02, -1.9, 1.9].forEach(function (q) {
      var yy = pyTop(q);
      g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
    });
    /* access hatches and inspection panels */
    g.lineWidth = 1.3;
    for (i = 0; i < 70; i++) {
      var hx = R() * TW, hy = R() * 3 * BAND, hw = 12 + R() * 34, hh = 10 + R() * 22;
      g.strokeStyle = "rgba(0,0,0,0.34)"; g.strokeRect(hx, hy, hw, hh);
      g.fillStyle = "rgba(0,0,0,0.26)";
      g.fillRect(hx + 2, hy + 2, 2, 2); g.fillRect(hx + hw - 4, hy + hh - 4, 2, 2);
    }

    /* ---- the hatch of the small cabin behind the cockpits, PORT side
       only: the Mi-28 carries it to pick up the crew of a downed
       helicopter (js/facts.js). */
    g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 2.4;
    g.strokeRect(pxX(-2.25), pySide(Z(1.78), 1), pxX(-1.35) - pxX(-2.25),
                 pySide(Z(0.98), 1) - pySide(Z(1.78), 1));
    g.fillStyle = "rgba(0,0,0,0.45)";
    g.fillRect(pxX(-1.52), pySide(Z(1.40), 1), 6, 3);

    /* ---- national marking on the tail boom, both sides, just behind the
       hump over the engine bay, where every current Mi-28N carries it
       (the fin is left plain) ---- */
    star(g, pxX(-3.95), pySide(Z(1.32), 1), 0.22 * SZ);
    star(g, pxX(-3.95), pySide(Z(1.32), 2), 0.22 * SZ);

    /* ---- the pale belly, painted LAST so no blob spills into it ---- */
    g.fillStyle = BELLY; g.fillRect(0, 3 * BAND, TW, BAND);
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }
    g.strokeStyle = "rgba(0,0,0,0.28)"; g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.beginPath(); g.moveTo(x, 3 * BAND); g.lineTo(x, TH); g.stroke();
    }
    /* oil and exhaust grime under the engine bay and boom */
    zb = g.createLinearGradient(pxX(0.6), 0, pxX(-6.0), 0);
    zb.addColorStop(0, "rgba(30,28,24,0.30)");
    zb.addColorStop(1, "rgba(30,28,24,0)");
    g.fillStyle = zb; g.fillRect(pxX(-6.0), 3 * BAND, pxX(0.6) - pxX(-6.0), BAND);
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
     or aft (the nose cap, intake rims, wing leading edges) would collapse
     to a line under an x projection, so they are laid out along x + y. */
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
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x4c5534);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5c6367, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.64, metalness: 0.35 });
    /* composite blades weather to a flat charcoal */
    m.blade  = new V.MeshStandardMaterial({ color: 0x2a2d2e, roughness: 0.82, metalness: 0.08 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    /* Ataka containers and B-8V20 pods: ordnance olive, not the camouflage */
    m.store  = new V.MeshStandardMaterial({ color: 0x4a513b, roughness: 0.80, metalness: 0.10 });
    /* flat armoured glass: thick, green-tinted and dark from any distance */
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1f3136, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    /* The flash is exactly C.team, so eraPaint's team test leaves it alone
       if this key is ever stood in for another def. The emissive keeps it
       from greying out under ACES. */
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
     face is wound so its normal points away from the solid's centre, so
     the caller does not have to get the order right. */
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
     each a convex polygon: a wing, a stabiliser or the fin between its
     root and tip aerofoils. convex() winds every face outward. */
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* A six-cornered aerofoil section: leading edge, crest 15% back, the
     after-body at 75%, a sharp trailing edge. le and te are [x, z] (or a
     chord line tilted in XZ, as at the fin root); the thickness t is laid
     along the unit normal nrm. at(x, z, k) turns chord-plane coordinates
     into a model-space point. */
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
     for that order puts every normal outward. The signed volume is checked
     positive in the tool. */
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
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "mi28n";
    var i, k, s, a;

    /* --------------------------------------------------- the fuselage ----
       Ahead of the gunner the nose narrows and its underside lifts, so the
       sight turret hangs clear below it with the radome ball on top.
       Narrow armoured boxes for the two cockpits. The gunner's sill is at
       1.74 m, and the fuselage steps up at x 2.7 to the pilot's sill at
       2.16 m. That step, not the glass, is what makes the stepped tandem
       profile. Behind the pilot the top climbs into the main gearbox
       fairing under the mast, and a hump over the engine bay runs back to
       x -3.3. Under all of it the belly runs almost straight, and it goes
       on straight into the tail boom: a deep beam, 1.0 m deep behind the
       hump and 0.85 m at the fin, whose top falls from 1.86 m to 1.62 m.
       The boom ends inside the fin root, over the tailwheel.
                x      zb    zt    zm    wb    wm    wt    e              */
    var FUS = [
      sec( 5.30, 1.28, 1.64, 1.46, 0.16, 0.22, 0.14, 0.78),
      sec( 5.10, 1.16, 1.68, 1.42, 0.26, 0.34, 0.24, 0.68),
      sec( 4.80, 1.02, 1.72, 1.36, 0.36, 0.45, 0.35, 0.60),
      sec( 4.45, 0.88, 1.74, 1.30, 0.45, 0.55, 0.49, 0.50),
      sec( 4.00, 0.81, 1.74, 1.28, 0.51, 0.63, 0.56, 0.42),
      sec( 3.20, 0.80, 1.75, 1.28, 0.55, 0.67, 0.59, 0.40),
      sec( 2.86, 0.80, 1.76, 1.30, 0.56, 0.68, 0.60, 0.40),
      sec( 2.66, 0.80, 2.14, 1.36, 0.56, 0.69, 0.60, 0.40),
      sec( 2.00, 0.81, 2.16, 1.38, 0.57, 0.71, 0.61, 0.40),
      sec( 1.05, 0.83, 2.20, 1.42, 0.58, 0.74, 0.60, 0.40),
      sec( 0.80, 0.84, 2.62, 1.50, 0.59, 0.76, 0.52, 0.42),
      sec( 0.20, 0.86, 3.10, 1.56, 0.60, 0.78, 0.42, 0.45),
      sec(-0.60, 0.86, 3.14, 1.60, 0.60, 0.78, 0.40, 0.45),
      sec(-1.60, 0.86, 3.00, 1.62, 0.58, 0.75, 0.40, 0.46),
      sec(-2.50, 0.85, 2.84, 1.60, 0.54, 0.70, 0.40, 0.48),
      sec(-3.20, 0.84, 2.62, 1.54, 0.48, 0.60, 0.36, 0.52),
      sec(-3.70, 0.83, 2.12, 1.40, 0.40, 0.48, 0.31, 0.58),
      sec(-4.40, 0.82, 1.86, 1.34, 0.34, 0.40, 0.29, 0.62),
      sec(-6.00, 0.79, 1.78, 1.29, 0.30, 0.35, 0.26, 0.66),
      sec(-7.60, 0.77, 1.68, 1.23, 0.27, 0.31, 0.23, 0.70),
      sec(-8.90, 0.75, 1.62, 1.19, 0.24, 0.28, 0.21, 0.72),
      sec(-9.45, 0.76, 1.52, 1.15, 0.20, 0.24, 0.18, 0.74),
      sec(-9.78, 0.84, 1.30, 1.08, 0.13, 0.16, 0.12, 0.80),
    ];
    /* the section at any x, for the parts that must sit on the skin */
    function fusAt(x) {
      for (var q = 0; q < FUS.length - 1; q++) {
        var A = FUS[q], B = FUS[q + 1];
        if (x <= A.x && x >= B.x) {
          var f = (A.x - x) / (A.x - B.x), o = {};
          ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e", "yc"].forEach(function (k) {
            o[k] = A[k] + (B[k] - A[k]) * f;
          });
          return o;
        }
      }
      return null;
    }
    var skin = loft(FUS, 14, 0.10, 0.10);

    /* ---------------------------------------------- engine nacelles ----
       The TV3-117VMAs sit in two nacelles set well outboard on the wing
       roots, 2.8 m across the pair. Each is faired to the fuselage side,
       has a round intake with its central fairing behind the pilot, and
       ends in the downward-turned exhaust suppressor. */
    var NAC = [
      sec( 1.10, 2.26, 2.84, 2.55, 0.26, 0.30, 0.26, 0.90, NAC_Y),
      sec( 0.95, 2.18, 2.92, 2.55, 0.33, 0.37, 0.32, 0.80, NAC_Y),
      sec( 0.40, 2.14, 2.97, 2.56, 0.35, 0.39, 0.33, 0.58, NAC_Y),
      sec(-0.80, 2.14, 2.97, 2.56, 0.35, 0.39, 0.33, 0.58, NAC_Y),
      sec(-1.70, 2.18, 2.92, 2.55, 0.32, 0.36, 0.30, 0.64, NAC_Y),
      sec(-2.25, 2.28, 2.82, 2.55, 0.25, 0.28, 0.24, 0.85, NAC_Y),
    ];
    var nac = loft(NAC, 10, null, 0.02);
    for (i = 0; i < nac.length; i++) both(skin, nac[i]);
    var dark = [], metal = [], store = [], rubber = [], team = [], glass = [];
    /* the intake: a lip, the dark duct face, and the central fairing
       standing proud of it */
    both(skin, place(new V.TorusGeometry(0.295, 0.040, 5, 16), 1.10, NAC_Y, Z(NAC_H), 0, PI / 2, 0));
    both(dark, cyl(0.30, 0.30, 0.03, 18, "x", 1.06, NAC_Y, Z(NAC_H)));
    both(skin, sph(0.17, 10, 6, 1.12, NAC_Y, Z(NAC_H), 1.25, 1, 1));
    /* the fairing that carries each nacelle on the fuselage side */
    both(skin, box(3.00, 0.26, 0.46, -0.55, 0.62, Z(2.42)));
    /* Exhaust suppressor: the duct leaves the nacelle heading aft and
       turns DOWN through about 105 degrees, so the hot gas and the hot
       metal face the ground rather than a heat-seeker above. A torus arc
       in the XZ plane, started at the top of its circle. */
    var elbow = new V.TorusGeometry(0.40, 0.235, 10, 9, 105 * D2R);
    elbow.rotateZ(PI / 2);                  /* the arc starts at the top */
    elbow.rotateX(PI / 2);                  /* and lies in the XZ plane  */
    elbow.translate(-2.14, NAC_Y + 0.04, Z(NAC_H) - 0.40);
    both(skin, elbow);
    /* the soot-black outlet facing down and slightly forward */
    var ox = -2.14 - 0.40 * Math.sin(105 * D2R), oz = Z(NAC_H) - 0.40 + 0.40 * Math.cos(105 * D2R);
    var outlet = cyl(0.215, 0.215, 0.03, 14, "z", 0, 0, 0);
    outlet.rotateY(-15 * D2R);
    outlet.translate(ox + 0.01, NAC_Y + 0.04, oz - 0.005);
    both(dark, outlet);

    /* --------------------------------------------------- stub wings ----
       4.88 m over the pods. Root chord 1.8 m, tip 1.4 m, a slight sweep on
       the leading edge, mid-set under the nacelles. Seen from ahead the
       wing is thick at the root and droops to the tip: the top surface
       falls about 8 degrees, the flatter underside about 4. */
    var wingRoot = foil([0.62, 0], [-1.16, 0], wingT(WING_ROOT), function (x, z, k) {
      return [x, WING_ROOT, Z(wingMid(WING_ROOT)) + k]; });
    var wingTip = foil([0.44, 0], [-0.96, 0], wingT(TIP_Y), function (x, z, k) {
      return [x, TIP_Y, Z(wingMid(TIP_Y)) + k]; });
    both(skin, solid(wingRoot, wingTip));
    /* wingtip pods: the countermeasures dispensers */
    var TPY = TIP_Y + 0.06, TPZ = Z(wingMid(TPY));
    var tipPod = cyl(0.13, 0.13, 1.25, 12, "x", -0.20, TPY, TPZ);
    tipPod.scale(1, 0.85, 1); tipPod.translate(0, TPY * 0.15, 0);
    both(skin, tipPod);
    both(skin, sph(0.13, 10, 6, 0.425, TPY, TPZ, 1.6, 0.85, 1));
    both(dark, cyl(0.10, 0.10, 0.03, 10, "x", -0.83, TPY, TPZ, false));
    /* pylons, each hung square under the drooping wing: its top buried in
       the lower surface at its own station */
    function wingBot(y) { return wingMid(y) - wingT(y) / 2; }
    var PH_IN = wingBot(PYL_IN) - 0.09, PH_OUT = wingBot(PYL_OUT) - 0.09;
    both(skin, box(0.84, 0.09, 0.22, -0.20, PYL_IN, Z(PH_IN)));
    both(skin, box(0.84, 0.09, 0.22, -0.28, PYL_OUT, Z(PH_OUT)));

    /* ---- inboard: B-8V20 pods, twenty 80 mm S-8 rockets each. About
       2 m long and 0.52 m across, a blunt front showing the tube mouths and
       a tapered tail. */
    var podH = PH_IN - 0.11 - 0.26;
    var prof = [[0.001, -1.02], [0.12, -0.98], [0.21, -0.84], [0.26, -0.60], [0.26, 0.80],
                [0.245, 0.93], [0.22, 0.96], [0.001, 0.96]];
    var lp = [];
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(prof[i][0], prof[i][1]));
    var pod = new V.LatheGeometry(lp, 14);
    pod.rotateZ(-PI / 2);                   /* lathe axis Y -> model +X  */
    pod.translate(-0.10, PYL_IN, Z(podH));
    both(store, pod);
    both(dark, cyl(0.215, 0.215, 0.02, 16, "x", 0.87, PYL_IN, Z(podH)));
    both(metal, cyl(0.265, 0.265, 0.06, 14, "x", 0.55, PYL_IN, Z(podH), true));
    both(metal, cyl(0.265, 0.265, 0.06, 14, "x", -0.55, PYL_IN, Z(podH), true));

    /* ---- outboard: the 9M120 Ataka launcher. Two four-round packs of
       1.85 m containers, one either side of the pylon beam: eight a side,
       sixteen in all. */
    var beamH = PH_OUT - 0.11 - 0.07;
    both(metal, box(1.50, 0.07, 0.14, -0.20, PYL_OUT, Z(beamH)));
    var TR = 0.068, tubeLen = 1.85;
    for (s = -1; s <= 1; s += 2) {
      var py = PYL_OUT + s * 0.195;
      for (i = 0; i < 4; i++) {
        var ty = py + ((i & 1) ? 0.074 : -0.074);
        var tz = Z(beamH) - 0.02 - ((i & 2) ? 0.225 : 0.077);
        both(store, cyl(TR, TR, tubeLen, 8, "x", -0.20, ty, tz));
      }
      /* the two clamp frames round each pack */
      for (k = -1; k <= 1; k += 2)
        both(metal, box(0.07, 0.33, 0.33, -0.20 + k * 0.55, py, Z(beamH) - 0.17));
    }

    /* ------------------------------------------------------ the nose ----
       Two sensor housings stacked on the nose, both in their own olive
       rather than the camouflage. On top and furthest forward, the 0.5 m
       ball of the Ataka command-link antenna. Under it and 0.8 m further
       back, the big drum of the gyro-stabilised day/thermal sight, 0.8 m
       across, hanging below the nose with its flat window facing ahead.
       Under the gunner is the NPPU-28 mount with the SINGLE 30 mm 2A42.
       The gun is fed from two ammunition boxes carried on the mount either
       side of it, which slew with the gun. */
    store.push(sph(0.24, 14, 10, X_NOSE - 0.24, 0, Z(1.60)));
    store.push(cyl(0.14, 0.18, 0.22, 12, "x", X_NOSE - 0.46, 0, Z(1.55)));
    var DX = 4.62, DR = 0.38;
    store.push(cyl(DR, DR, 0.56, 20, "z", DX, 0, Z(0.92)));
    store.push(cyl(DR, DR * 0.82, 0.06, 20, "z", DX, 0, Z(0.61)));
    /* the window stands just proud of the drum's front, or the drum's own
       curve would cover the middle of it */
    glass.push(box(0.06, 0.40, 0.26, DX + DR - 0.015, 0, Z(0.95)));
    /* gun mount: the ring under the belly and the turret shell below it */
    var GX = 3.55, GH = 0.60;
    skin.push(cyl(0.32, 0.34, 0.16, 18, "z", GX, 0, Z(0.76)));
    skin.push(sph(0.30, 12, 6, GX, 0, Z(GH + 0.02), 1.25, 1.0, 0.60));
    both(skin, box(0.78, 0.18, 0.34, GX - 0.06, 0.28, Z(GH)));
    /* the gun: receiver, barrel jacket, the long barrel and its muzzle
       brake, which stands 0.18 m ahead of the nose ball (17.01 m overall
       with the cannon against 16.85 m without) */
    var gunDip = -3 * D2R;
    var gun = [box(0.95, 0.15, 0.20, -0.10, 0, 0),
               cyl(0.065, 0.065, 0.40, 12, "x", 0.55, 0, 0),
               cyl(0.036, 0.036, 1.29, 10, "x", 1.37, 0, 0),
               cyl(0.055, 0.055, 0.22, 10, "x", 2.01, 0, 0)];
    for (i = 0; i < gun.length; i++) {
      gun[i].rotateY(-gunDip);
      gun[i].translate(GX + 0.20, 0, Z(GH - 0.05));
      dark.push(gun[i]);
    }

    /* ---------------------------------------------------- the cockpits --
       Flat armoured glass, as on the real aircraft: each cockpit is a
       faceted box of flat panes (windscreen, two side doors and a roof)
       in a heavy painted frame. The gunner's canopy ends against the
       foot of the pilot's windscreen. */
    function canopy(xf0, xr0, w0f, w0r, h0, xf1, xr1, w1f, w1r, h1) {
      var b = [[xf0, w0f, Z(h0)], [xf0, -w0f, Z(h0)], [xr0, -w0r, Z(h0)], [xr0, w0r, Z(h0)]];
      var t = [[xf1, w1f, Z(h1)], [xf1, -w1f, Z(h1)], [xr1, -w1r, Z(h1)], [xr1, w1r, Z(h1)]];
      glass.push(convex([b, t, [b[0], b[1], t[1], t[0]], [b[1], b[2], t[2], t[1]],
                          [b[2], b[3], t[3], t[2]], [b[3], b[0], t[0], t[3]]]));
      var fr = 0.034, edges = [[b[0], t[0]], [b[1], t[1]], [t[0], t[1]], [t[1], t[2]],
                               [t[2], t[3]], [t[3], t[0]], [b[3], t[3]], [b[2], t[2]],
                               [b[0], b[3]], [b[1], b[2]]];
      for (var e = 0; e < edges.length; e++) skin.push(bar(edges[e][0], edges[e][1], fr, 6));
      /* the door frame half way along each side */
      for (var q = 0; q < 2; q++) {
        var sgn = q ? -1 : 1, f = 0.45;
        var pb = [xf0 + (xr0 - xf0) * f, sgn * (w0f + (w0r - w0f) * f), Z(h0)];
        var pt = [xf1 + (xr1 - xf1) * f, sgn * (w1f + (w1r - w1f) * f), Z(h1)];
        skin.push(bar(pb, pt, fr * 0.9, 6));
      }
    }
    /* gunner: sill 1.70, roof 2.40, windscreen raked about 50 degrees */
    canopy(4.47, 2.64, 0.50, 0.60, 1.70, 3.93, 2.66, 0.37, 0.42, 2.40);
    /* pilot: 0.45 m higher, the classic step */
    canopy(2.74, 1.00, 0.58, 0.60, 2.10, 2.20, 1.12, 0.40, 0.42, 2.86);

    /* ------------------------------------------------ fin and stabiliser --
       The fin is the Mi-28's "keel beam": a thick swept pylon carrying the
       tail rotor drive up to a gearbox at its tip, rising 1.8 m above the
       end of the boom. Its root aerofoil lies along the boom, from the top
       of the boom at the leading edge down to the bottom at the trailing
       edge, so the fin and the boom end are one piece. */
    function finAt(x, z, k) { return [x, k, z]; }
    var finRoot = foil([FIN_LE0[0], Z(FIN_LE0[1])], [FIN_TE0[0], Z(FIN_TE0[1])], FIN_HT * 2, finAt);
    var finTip = foil([FIN_LE1[0], Z(FIN_LE1[1])], [FIN_TE1[0], Z(FIN_TE1[1])], FIN_HT * 1.7, finAt);
    skin.push(solid(finRoot, finTip));
    /* the tip fairing over the tail gearbox, rounded at the front where
       the tail rotor shaft comes out on the right */
    var CAP = [
      sec( -9.96, 3.30, 3.50, 3.40, 0.07, 0.10, 0.06, 0.80),
      sec(-10.10, 3.24, 3.58, 3.40, 0.15, 0.19, 0.14, 0.62),
      sec(-10.55, 3.24, 3.60, 3.40, 0.16, 0.20, 0.15, 0.58),
      sec(-11.00, 3.26, 3.55, 3.40, 0.14, 0.17, 0.13, 0.62),
      sec(-11.32, 3.31, 3.48, 3.40, 0.08, 0.10, 0.08, 0.80),
    ];
    var cap = loft(CAP, 10, 0.06, 0.04);
    for (i = 0; i < cap.length; i++) skin.push(cap[i]);
    /* the tail gearbox bulge on the right-hand face, under the rotor hub */
    skin.push(sph(0.22, 10, 6, TR_X, -0.14, Z(TR_H), 1.30, 0.85, 1.1));
    /* The stabiliser: ONE panel, on the LEFT of the fin tip, opposite the
       tail rotor so it sits out of the rotor's wash, and braced by a strut
       from the fin. It is all-moving, geared to the collective. 1.9 m
       from the fin to the tip, 0.64 m chord at the root, over the back of
       the fin tip: 16.4-17.0 m behind the nose in the side-on photographs. */
    function stabAt(y) { return function (x, z, k) { return [x, y, Z(STAB_H) + k]; }; }
    var stRoot = foil([-10.72, 0], [-11.36, 0], 0.10, stabAt(STAB_Y0));
    var stTip = foil([-10.80, 0], [-11.32, 0], 0.07, stabAt(STAB_Y1));
    skin.push(solid(stRoot, stTip));
    /* the brace, from under the stabiliser near half span to the fin face */
    metal.push(bar([-11.02, 0.98, Z(STAB_H) - 0.03], [-10.52, 0.09, Z(2.66)], 0.028, 6));

    /* ---------------------------------------------- the undercarriage ----
       Fixed, tailwheel type, 11.0 m from the main axles to the tailwheel.
       Each main wheel is on a long trailing arm hinged under the gunner's
       cockpit, with its oleo standing almost upright above the axle, so the
       wheel sits under the pilot. The tailwheel is on a short fork right
       under the end of the boom. */
    var MW_X = 1.50, MW_Y = 1.14, MW_R = 0.36, MW_W = 0.32;
    var arm0 = [2.45, 0.58, Z(0.96)], axle = [MW_X, MW_Y - MW_W / 2 - 0.01, Z(MW_R)];
    both(metal, bar(arm0, axle, 0.06, 8));
    both(metal, bar([1.72, 0.62, Z(1.58)], [1.56, 0.95, Z(0.60)], 0.075, 8));
    both(metal, bar([1.72, 0.60, Z(1.58)], [2.40, 0.60, Z(1.18)], 0.05, 6));
    both(skin, box(0.40, 0.10, 0.30, 2.40, 0.60, Z(1.05)));
    both(metal, cyl(0.05, 0.05, 0.24, 8, "y", MW_X, MW_Y - 0.10, Z(MW_R)));
    both(rubber, cyl(MW_R, MW_R, MW_W, 18, "y", MW_X, MW_Y, Z(MW_R)));
    both(metal, cyl(0.17, 0.17, MW_W + 0.01, 12, "y", MW_X, MW_Y, Z(MW_R)));
    var TW_X = -9.50, TW_R = 0.24, TW_W = 0.20;
    metal.push(bar([-9.30, 0, Z(0.82)], [TW_X + 0.03, 0, Z(0.47)], 0.055, 8));
    metal.push(box(0.12, TW_W + 0.10, 0.07, TW_X + 0.02, 0, Z(0.45)));
    both(metal, box(0.07, 0.03, 0.26, TW_X, TW_W / 2 + 0.03, Z(0.33)));
    metal.push(cyl(0.035, 0.035, TW_W + 0.10, 8, "y", TW_X, 0, Z(TW_R)));
    rubber.push(cyl(TW_R, TW_R, TW_W, 16, "y", TW_X, 0, Z(TW_R)));

    /* ------------------------------------------------------ small kit ---- */
    /* whip and blade aerials on top of the boom, blade aerials under the
       belly, each rooted in the skin at its own station (fusAt gives
       model z, not height) */
    var bt5 = fusAt(-5.2).zt, bt7 = fusAt(-7.4).zt;
    dark.push(bar([-5.2, 0, bt5 - 0.02], [-5.5, 0, bt5 + 0.62], 0.012, 4));
    dark.push(box(0.30, 0.03, 0.22, -7.4, 0, bt7 + 0.09, 0, 0.35, 0));
    dark.push(box(0.26, 0.03, 0.20, -0.9, 0, fusAt(-0.9).zb - 0.08));
    dark.push(box(0.26, 0.03, 0.18, -3.9, 0, fusAt(-3.9).zb - 0.07));

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down: the outer wing
       panels and the top of the stabiliser. Each flash is a thin plate
       laid 1 cm clear of the aerofoil's own upper surface between 18% and
       72% chord, so it follows the droop and the camber and cannot
       z-fight with the skin at map distance. There is also a band right
       round the tail boom, cut from the boom's own sections 3% oversize,
       so it reads from the side as well as from above. */
    function flash(le, te, mid, th, y0, y1) {
      function top(f, y, k) {
        var x = le(y) + (te(y) - le(y)) * f;
        return [x, y, mid(y) + th(y) * (0.5 - 0.12 * (f - 0.15) / 0.6) + k];
      }
      var lo = [top(0.18, y0, 0.010), top(0.72, y0, 0.010), top(0.72, y1, 0.010), top(0.18, y1, 0.010)];
      var hi = [top(0.18, y0, 0.024), top(0.72, y0, 0.024), top(0.72, y1, 0.024), top(0.18, y1, 0.024)];
      return solid(lo, hi);
    }
    function lerpY(a, b, y0, y1) { return function (y) { return a + (b - a) * (y - y0) / (y1 - y0); }; }
    both(team, flash(lerpY(0.62, 0.44, WING_ROOT, TIP_Y), lerpY(-1.16, -0.96, WING_ROOT, TIP_Y),
                     function (y) { return Z(wingMid(y)); }, wingT, 1.50, 2.16));
    team.push(flash(lerpY(-10.72, -10.80, STAB_Y0, STAB_Y1), lerpY(-11.36, -11.32, STAB_Y0, STAB_Y1),
                    function () { return Z(STAB_H); }, lerpY(0.10, 0.07, STAB_Y0, STAB_Y1), 1.00, 1.86));
    var bandSecs = [], bx = [-5.85, -6.55];
    for (i = 0; i < 2; i++) {
      var B0 = fusAt(bx[i]), zm = B0.zm;
      bandSecs.push({ x: bx[i], zm: zm, zb: zm - (zm - B0.zb) * 1.03, zt: zm + (B0.zt - zm) * 1.03,
                      wb: B0.wb * 1.03, wm: B0.wm * 1.03, wt: B0.wt * 1.03, e: B0.e, yc: 0 });
    }
    team.push(loft(bandSecs, 14, null, null)[0]);

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "stores");
    mesh(g, rubber, T.rubber, "tyres");
    mesh(g, team, T.team, "team");

    /* ======================================================= main rotor ==
       Tilt group at the hub, leaning the shaft forward. The mast, the
       swashplate's fixed ring, the radar stalk and the N025 ball stay in
       it and do not turn: the radar sits on a fixed mast that runs up
       through the hollow rotor shaft. */
    var tilt = new V.Group();
    tilt.position.set(HUB_X, 0, Z(HUB_H));
    tilt.rotation.y = MAST_TILT;
    g.add(tilt);
    mesh(tilt, [cyl(0.17, 0.19, 0.72, 14, "z", 0, 0, -0.46),
                cyl(0.42, 0.42, 0.06, 18, "z", 0, 0, -0.36),
                cyl(0.075, 0.075, 0.42, 8, "z", 0, 0, 0.38)], T.metal, "mast");
    /* N025 radome: 0.9 m across, a little flattened, on a stalk clear of
       the hub; its top is 4.81 m above the ground, the Mi-28N's published
       overall height */
    mesh(tilt, [sph(0.45, 16, 10, 0, 0, 0.83, 1, 1, 0.84)], T.skin, "radome", true);

    /* The mount. Its -PI/2 about X points the rotor node's local +Y - the
       one of its own axes along the mast, which render3d.js turns it
       positively about - DOWN the tilted mast, so the rotor turns clockwise
       from above. head undoes the turn so the head is authored in model
       axes. */
    var mnt = new V.Group();
    mnt.rotation.x = -PI / 2;
    tilt.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);

    var hubM = [], hubD = [], blades = [];
    hubM.push(cyl(0.30, 0.34, 0.30, 18, "z", 0, 0, 0));
    hubM.push(cyl(0.20, 0.28, 0.10, 18, "z", 0, 0, 0.19));
    hubM.push(cyl(0.44, 0.44, 0.06, 18, "z", 0, 0, -0.29));     /* turning ring */
    /* Blade outline, blade along +X. The rotor turns clockwise from
       above, so the leading edge is on the -Y side. Tip swept back over
       the last 0.55 m, chord 0.67 m, 0.06 m thick after the bevel. */
    var BP = [[1.05, -0.12], [1.55, -0.16], [8.05, -0.16], [ROTOR_R, 0.10],
              [ROTOR_R, 0.35], [8.38, CHORD - 0.16], [1.55, CHORD - 0.16], [1.05, 0.32]];
    for (k = 0; k < 5; k++) {
      /* +-36, +-108 and 180 degrees: symmetric about the nose, and as near
         45 degrees as a five-blade head allows */
      a = (36 + 72 * k) * D2R;
      var bl = M.slab(V, BP, 0.035);
      bl.translate(0, 0, -0.0175);
      bl.rotateZ(a);
      blades.push(bl);
      /* hub arm, the blade sleeve, the lag damper on the trailing side
         and the pitch link down to the swashplate */
      var parts = [[box(0.80, 0.22, 0.16, 0.62, 0, 0), hubM],
                   [box(0.50, 0.30, 0.15, 1.18, 0.07, 0), hubM],
                   [cyl(0.05, 0.05, 0.56, 8, "x", 0.66, 0.22, 0.03), hubD],
                   [cyl(0.026, 0.026, 0.30, 6, "z", 0.52, -0.20, -0.17), hubD]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dampers");
    mesh(head, blades, T.blade, "blades");
    /* One upward face is all a camera above the machine ever sees. It
       also casts no shadow: under the PCF shadow map three draws a
       FrontSide material with its BACK faces, and this disc's back faces
       away from the sun. A closed cylinder here would lay a solid 17 m
       disc of shadow on the ground under a blur that is 95% clear. */
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       asw_helo_fit.js tail mount: +PI/2 about X, so inside it local X is
       the model's X, local Y the model's up and local Z the model's
       right-hand side. The hub axis runs along local Z. The two two-blade
       rotors cross at 45 degrees (the technical description sets the
       blades at 45 and 135 degrees to each other); the outer pair sits
       further out along the shaft. Blades 0.24 m in chord. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.10, 0.12, 0.34, 12, "z", 0, 0, -0.02), cyl(0.06, 0.06, 0.12, 8, "z", 0, 0, 0.19)];
    var trB = [];
    var tAng = [67.5, 247.5, 112.5, 292.5];
    for (k = 0; k < 4; k++) {
      var tb = box(TR_R - 0.20, 0.24, 0.035, 0.20 + (TR_R - 0.20) / 2, 0, 0);
      tb.rotateX(9 * D2R);                    /* blade pitch */
      tb.rotateZ(tAng[k] * D2R);
      tb.translate(0, 0, k < 2 ? 0.08 : -0.05);
      trB.push(tb);
      var cuff = box(0.24, 0.12, 0.10, 0.18, 0, 0);
      cuff.rotateZ(tAng[k] * D2R);
      cuff.translate(0, 0, k < 2 ? 0.08 : -0.05);
      trM.push(cuff);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");

    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent, rotor disc front to the trailing edge of
   the stabiliser; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["helo_p"] = { len: 20.14, build: HeroMi28N.build };
