/* ======= pla_z9.js - HERO model: Harbin Z-9W armed helicopter (licence AS 365 N Dauphin) =======
   pla_e90_gunship  "Harbin Z-9W armed helicopter" (service 1995). Until this
   file the def drew the generic parametric helicopter (rotor_specs.js
   "fenestron" config): a round pod, a boom, a fan standing flat ACROSS the
   fin, no landing gear, no windows. There was no Dauphin, Panther or Z-9
   model anywhere in js/hero/ to build on (checked: no dauphin / panther /
   as365 / z9 file), so this one is new, written in the conventions of
   fr_gazelle.js (the other Fenestron machine, a redone model) and
   ru_mi8.js (rotor mounts), whose geometry kit it copies.

   REFERENCES (Commons, cached in scratchpad/q_pla_e90_gunship_ref)
     D1 "Eurocopter AS365 Dauphin orthographical image.svg" (the 1920 px
        PNG render): plan from above, front, and side from the left with
        the nose to the left. Every station, height and width below was
        read off it on a pixel grid (tools grid.py, scan of the line
        work per 0.25 m station). The side view is scaled on the
        published fuselage length, 12.11 m nose to the back of the fin,
        which makes it 80.6 px/m. That scale puts the mast 4.32 m behind
        the nose, so the 11.94 m disc reaches 1.65 m ahead of the nose:
        13.76 m with rotors turning against the published 13.73 m. The
        plan is drawn at 81.8 px/m (it is 1.5 % longer) and is a little
        rotated; widths come from it at its own scale, centred on its own
        centreline. Its front view is not at either scale (the stabiliser
        span reads 4 % wide), so only its proportions are used.
     P1 "PLAAF Harbin Z-9WA.jpg" - Z-9WA on the ground, front left 3/4:
        the drab olive paint, the twin nose wheels on one leg, the main
        wheel on its own leg out of the fuselage side, the two engine
        intakes (red covers) on the cowl's front shoulders, the front
        door and the sliding door with their windows, and the WEAPONS
        OUTRIGGER: a faired arm out of the lower fuselage behind the
        sliding door, carrying a straight beam well outboard with the
        launcher hung under its outer end. (Its chin FLIR turret and
        nose probe are the 2000s Z-9WA fit and are not drawn.)
     P2 "PLA Harbin Z-9W 2012 Hong Kong.JPG", and P3 the Commons file
        whose title is in Chinese, "Zhu Gang Bu Dui Hang Kong Bing Tuan -
        Zhi 9 - ZH.JPG" in pinyin (Hong Kong garrison, 2010s, far off): the Fenestron in its thick
        round shroud, the swept tailplane endplates, the fin. Both wear
        camouflage, which is not drawn.
     Published (en.wikipedia "Harbin Z-9", Gordon & Komissarov, Chinese
        Aircraft, 2008, for the Z-9B): length 12.11 m, height 4.01 m,
        main rotor 11.94 m, four blades; "11-blade Fenestron ... with
        wider-chord, all-composite blades replacing the 13-blade" (the
        Z-9B, 1992, from which the Z-9W is built); "two turboshaft
        engines mounted side by side on top of the cabin"; "retractable
        gear, and all flat bottom". Z-9W: "pylon-mounted armament, gyro
        stabilization and roof-mounted optical sight"; armament "rockets,
        gun pods ... HJ-8 anti-tank missiles". en.wikipedia "Eurocopter
        AS365 Dauphin": length 13.73 m rotors turning, height 4.06 m (N3);
        SA 365 N1 "improved 11-blade Fenestron", "retractable tricycle
        undercarriage". en.wikipedia "HJ-8": 1,566 mm long, 120 mm across;
        "standard anti-tank armament of the Z-9W".

   RECOGNITION LIST (and where each shows)
     1 the Dauphin's dolphin nose: a low pointed snout, chin windows each
       side of it, the big windscreen stepping up to a flat cabin roof (D1)
     2 the deep, flat-bottomed cabin with a front door and a sliding
       door, two big square windows a side                          (D1, P1)
     3 the engine cowl and the mast fairing on the roof, two intakes on
       the shoulders, two exhausts at the back                       (D1, P1)
     4 the deep tail cone tapering into the FENESTRON: a fan inside a
       thick round shroud at the foot of a swept fin              (D1, P2, P3)
     5 the tailplane just ahead of the shroud with big swept endplates (D1)
     6 four blades on a flat Starflex head under a dome             (D1)
     7 the outrigger beams behind the cabin, HJ-8 tubes under them   (P1, text)
     8 twin nose wheels and single main wheels                       (D1, P1)

   NOT CONFIRMED (judgement, not measured or published):
     - the WEAPON LOAD: two HJ-8 launch tubes side by side under each
       outrigger (four in all). The text says the Z-9W carries HJ-8 on
       pylons; no photograph of a 1990s Z-9W's launchers was found. The
       tube's 0.16 m outside diameter is a guess round the 120 mm missile
       and its 1.566 m length; where they hang is drawn from P1's
       launcher, which is a later rail launcher.
     - the outrigger's size: beam tip 1.92 m off the centreline, 0.36 m
       chord, at 1.12 m, read through P1's perspective against the
       fuselage width (no drawing shows it).
     - the ROOF SIGHT: the text names a "roof-mounted optical sight"; no
       reference shows it, so it is a modest drum on a pedestal over the
       LEFT seat (the Dauphin's captain sits on the right), behind the
       roof windows, as on the other roof-sighted machines of the time.
     - the height. D1, on the length scale, puts the fin top at 3.80 m
       (the highest point; the rotor head dome reaches 3.62 m), and that
       is what is drawn. The published height is 4.01 m (Z-9, Gordon &
       Komissarov; 4.06 m for the AS365 N3), 0.21 m more. The published
       figure may be measured to a different point (an antenna or beacon,
       the gear extended rather than compressed) or to a later fin; no
       reference shows what makes up the difference, so nothing is added
       to reach it.
     - section shapes (how round the cabin's corners are) are judged off
       D1's front view; the plan and the side set the widths and depths.
     - main blade chord 0.37 m is measured off D1's plan, not published.
     - the mast is drawn upright; D1's side view tilts the blades by
       about 3 degrees, which may be coning or drawing error.
     - there is no stator behind the fan (D1 shows spokes, which on the
       N2 are stator vanes; on the 11-blade N1 Fenestron they are not
       confirmed).

   PAINT: one flat PLA Army Aviation drab olive, from P1 (lit #5b5f45 on
   the cabin side in daylight, taken down to #454a35 for the renderer's
   ACES lift, as fr_gazelle.js does). No stars, bort numbers or the 2000s
   camouflage of P2/P3.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   under the mast 1.40 m above the wheel bottoms (GROUND). render3d.js
   stands the model up with rotation.x = -PI/2 and rescales it by the
   measured X extent.

   WHAT SETS THE SCALE: the rotor disc reaches 5.97 m ahead of the mast;
   the fin's top trailing corner is 7.79 m behind it: X extent 13.76 m,
   against the published 13.73 m rotors turning. The blades are parked in
   an X at 45 degrees, as D1's plan has them, inside the disc.

   NAMED NODES:
     rotor      fr_gazelle.js's mount: a group turned -PI/2 about X, so the
                head's local +Y - the axis render3d.js rotorShafts() picks,
                being the one of its own axes along the mast - points DOWN
                the mast and the head turns clockwise from above, as every
                Sud / Aerospatiale rotor does.
     rotordisc  inside the rotor, transparent, depthWrite:false.
     tailrotor  the Fenestron fan, in the asw_helo_fit.js / fr_gazelle.js
                tail mount (+PI/2 about X, so the fan's axis is its local
                Z, which lies along the model's Y, across the fin).
                rotorShafts() picks the local axis that lies ACROSS the
                machine for a "tailrotor", a fan in a shroud included, and
                turns it about that, so the fan spins in its duct plane at
                every heading and bank. Eleven blades (the Z-9B's).
     gear       the retractable tricycle undercarriage (published), which
                the engine hides in flight: nose leg with twin wheels and
                the two main legs with their wheels. The fairings over the
                main wheel wells stay with the airframe.
   There is no "turret": the HJ-8 tubes are fixed.

   MATERIALS: SKIN (one procedural CanvasTexture, roughness 0.86), METAL,
   DARK fittings (also the tyres), BLADE, STORES olive (HJ-8 tubes, sight
   head), GLASS, TEAM and DISC. Draw calls: six airframe meshes, two gear,
   three in the rotor head and one fan: twelve.
   ASCII only.                                                               */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZ9 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums */
  /* x is measured from the mast, forward positive; heights above the
     wheel bottoms. Every number two parts must agree on lives here. */
  var GROUND  = -1.40;
  function Z(h) { return GROUND + h; }
  var NOSE_X  =  4.32;                     /* D1: 12.11 m to the fin back */
  var HUB_H   =  3.45;                     /* blade plane; dome top 3.62  */
  var ROTOR_R =  5.97;                     /* 11.94 m disc (published)    */
  var CHORD   =  0.37;                     /* D1 plan                     */
  var TR_X = -6.55, TR_H = 1.52;           /* Fenestron axis, D1          */
  var TR_R    =  0.545;                    /* 1.09 m fan, D1 duct 1.10 m  */
  var SH_T    =  0.40;                     /* shroud thickness at the fan */
  var STAB_H  =  1.35, STAB_Y = 1.60;      /* tailplane, 3.20 m over plates */
  var NW_X = 3.12, NW_R = 0.18, NW_Y = 0.12;   /* nose wheels, D1 + P1 twins */
  var MW_X = -0.65, MW_R = 0.21, MW_Y = 0.93;  /* main wheels, track 1.86 m  */
  var OR_X = -1.10, OR_H = 1.12, OR_Y = 1.92;  /* outrigger beam (P1, est.)  */

  /* =================================================== the painted skin ===
     fr_gazelle.js's sheet: 1024 x 1024 in four 256-pixel bands, each a
     projection of the airframe in model metres:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band                      */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -8.0, UX1 = 4.5;
  var QY = 1.0;
  var QZ0 = GROUND - 0.10, QZ1 = GROUND + 4.10;
  var SX = TW / (UX1 - UX0);
  var SZ = BAND / (QZ1 - QZ0);
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  function pyH(h, b)    { return pySide(Z(h), b); }

  /* PLA Army Aviation drab olive (P1), darker than the chip for ACES */
  var OL = "#454a35", OL_L = "#4e533c", OL_D = "#3c412e";

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function skinCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(9095);
    var i, b, x;
    g.fillStyle = OL; g.fillRect(0, 0, TW, TH);
    /* repainted panels a shade off their neighbours */
    for (i = 0; i < 110; i++) {
      g.fillStyle = (i & 1) ? OL_L : OL_D;
      g.globalAlpha = 0.20 + R() * 0.28;
      g.fillRect(R() * TW, R() * TH, (0.3 + R() * 0.9) * SX, 10 + R() * 26);
    }
    g.globalAlpha = 1;
    /* sun on the top band, grime down the sides and the belly */
    g.fillStyle = "rgba(255,255,236,0.045)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 150; i++) {
      g.fillStyle = "rgba(20,20,16," + (0.04 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 8 + R() * 36);
    }
    for (i = 0; i < 80; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 80, 6 + R() * 18);
    }
    /* Arriel / WZ-8 soot: the two exhausts blow aft over the cone, so the
       stain lies along its top and upper flanks behind x -2.6 */
    var sg = g.createLinearGradient(pxX(-2.6), 0, pxX(-5.4), 0);
    sg.addColorStop(0, "rgba(16,15,13,0.55)");
    sg.addColorStop(1, "rgba(16,15,13,0)");
    g.fillStyle = sg;
    g.fillRect(pxX(-5.4), pyTop(0.45), pxX(-2.6) - pxX(-5.4), pyTop(-0.45) - pyTop(0.45));
    for (b = 1; b <= 2; b++)
      g.fillRect(pxX(-5.4), pyH(2.40, b), pxX(-2.6) - pxX(-5.4), pyH(1.75, b) - pyH(2.40, b));

    /* panel seams at D1's frames */
    var frames = [3.58, 2.62, 2.04, 0.80, -0.45, -1.62, -3.0, -4.4];
    g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.28)";
      g.beginPath(); g.moveTo(x, BAND); g.lineTo(x, 3 * BAND); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.20)";
      for (var y = BAND + 3; y < 3 * BAND; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    for (b = 1; b <= 2; b++) {
      /* D1's long seam from the cabin top aft along the shoulder of the
         cone, and the step line at the floor */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(pxX(2.0), pyH(2.02, b)); g.lineTo(pxX(-0.5), pyH(2.04, b));
      g.lineTo(pxX(-3.0), pyH(1.82, b)); g.lineTo(pxX(-5.0), pyH(1.65, b)); g.stroke();
      g.beginPath(); g.moveTo(pxX(3.0), pyH(0.74, b)); g.lineTo(pxX(-1.1), pyH(0.74, b)); g.stroke();
      /* doors (D1): front door between the windscreen post and x 2.04,
         sliding door 2.0 .. -0.45 on its rail */
      g.strokeStyle = "rgba(0,0,0,0.48)"; g.lineWidth = 2.0;
      g.strokeRect(pxX(2.04), pyH(2.06, b), pxX(2.66) - pxX(2.04), pyH(0.80, b) - pyH(2.06, b));
      g.strokeRect(pxX(-0.45), pyH(2.06, b), pxX(1.98) - pxX(-0.45), pyH(0.80, b) - pyH(2.06, b));
      g.beginPath(); g.moveTo(pxX(0.86), pyH(2.06, b)); g.lineTo(pxX(0.86), pyH(0.80, b)); g.stroke();
      g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 2.6;      /* sliding door rail */
      g.beginPath(); g.moveTo(pxX(1.9), pyH(0.82, b)); g.lineTo(pxX(-1.7), pyH(0.82, b)); g.stroke();
      g.fillStyle = "rgba(160,160,150,0.55)";                     /* handles */
      g.fillRect(pxX(1.05), pyH(1.20, b), 7, 2);
      g.fillRect(pxX(0.10), pyH(1.20, b), 7, 2);
      g.fillRect(pxX(-3.75), pyH(1.38, b), 0.55 * SX, 3);           /* D1 boom grab */
      /* access hatches on the aft fuselage and cone */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.2;
      for (i = 0; i < 18; i++) {
        var hx = pxX(-5.2 + R() * 4.4), hy = pyH(0.9 + R() * 1.0, b);
        g.strokeRect(hx, hy, 8 + R() * 20, 6 + R() * 12);
      }
    }
    return cv;
  }

  var _cv = null, _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    try {
      if (!_cv) _cv = skinCanvas();
      var t = new V.CanvasTexture(_cv);
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex = t;
    } catch (e) { _tex = false; }
    return _tex;
  }

  /* fr_gazelle.js: face-normal projection into the four bands */
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
        else if (band === 3) { U = pxX(x); W = 3 * BAND + (QY - y) / (2 * QY) * BAND; }
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
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x454a35);
    m.metal = new V.MeshStandardMaterial({ color: 0x5a6064, roughness: 0.46, metalness: 0.62 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1c1f21, roughness: 0.70, metalness: 0.25 });
    m.blade = new V.MeshStandardMaterial({ color: 0x33383a, roughness: 0.80, metalness: 0.08 });
    m.store = new V.MeshStandardMaterial({ color: 0x4d5440, roughness: 0.80, metalness: 0.10 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1e2c33, roughness: 0.06, metalness: 0.20,
                                           clearcoat: 1.0, clearcoatRoughness: 0.05 });
    var tc = (C && C.team !== undefined) ? C.team : "#5f7fd6";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                          transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* ============================================ geometry kit (fr_gazelle) == */
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
  function rail(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
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
  /* the starboard twin of a port part, winding restored */
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
  /* a convex solid from its faces, wound outward from its centre */
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
    g.rotateX(PI / 2);
    g.translate(0, (t - 2 * bv) / 2 + (y0 || 0), 0);
    return g;
  }

  /* ---- the loft (fr_gazelle.js). A section is a rounded trapezoid:
     superelliptic above its widest line with exponent e, below it with eb.
       zb, zt   belly and top          zm   height of the widest line
       wb, wt   half-widths toward the belly and the roof, wm the widest
     Heights ABOVE GROUND; sections run nose to tail. */
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
  function ringPt(s, th) {
    var c = Math.cos(th), sn = Math.sin(th);
    var ex = sn < 0 ? s.eb : s.e;
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), ex);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    return [W * Math.pow(Math.abs(c), ex), z];
  }
  /* the ring's port half, belly to roof, at equal arc length steps, then
     the starboard half back down */
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
  /* the loft as triangles, each handed to classify(centroid, normal),
     which names the list it goes to; domed end caps */
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
      /* both triangles of a quad go to the same list, judged at the
         quad's centre, so a window edge steps along the rings instead of
         zig-zagging across each quad's diagonal */
      var q0 = Math.floor(i / 6) * 6, qa = idx[q0], qb = idx[q0 + 2], qc = idx[q0 + 1], qd = idx[q0 + 5];
      var cen = [0, 0, 0];
      [qa, qb, qc, qd].forEach(function (w) { cen[0] += P[w * 3] / 4; cen[1] += P[w * 3 + 1] / 4; cen[2] += P[w * 3 + 2] / 4; });
      put(classify(cen, faceN(pts[0], pts[1], pts[2])), pts, nrm);
    }
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
  function allSkin() { return "skin"; }

  /* ========================================================= the build == */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "z9w";
    var i, k, a;
    var skin = [], glass = [], dark = [], metal = [], store = [], team = [];
    var gearM = [], gearD = [];

    /* --------------------------------------------------- the fuselage ----
       Off D1 station by station. The snout is low and pointed (tip 0.86 m
       up, 4.32 m ahead of the mast); the windscreen climbs from its top
       to the flat cabin roof at 2.31 m, which runs back over both doors.
       The belly is flat at 0.38-0.42 m under the cabin and sweeps up into
       the deep tail cone, which is still 1.1 m deep where the tailplane
       crosses it and runs into the Fenestron shroud. Widest 1.92 m at
       1.3 m up (D1 plan and front).
                    x     zb    zt    zm    wb    wm    wt    e     eb   */
    var CTL = [
      sec( 4.30, 0.80, 0.93, 0.86, 0.05, 0.07, 0.05, 0.90, 0.90),
      sec( 4.24, 0.72, 1.01, 0.86, 0.14, 0.19, 0.13, 0.80, 0.85),
      sec( 4.10, 0.67, 1.08, 0.87, 0.23, 0.30, 0.21, 0.70, 0.75),
      sec( 4.00, 0.64, 1.14, 0.88, 0.28, 0.36, 0.26, 0.65, 0.70),
      sec( 3.75, 0.60, 1.24, 0.92, 0.36, 0.45, 0.32, 0.58, 0.62),
      sec( 3.50, 0.56, 1.33, 0.96, 0.43, 0.52, 0.37, 0.54, 0.55),
      sec( 3.25, 0.52, 1.49, 1.02, 0.49, 0.58, 0.40, 0.52, 0.50),
      sec( 3.00, 0.48, 1.75, 1.10, 0.55, 0.65, 0.42, 0.50, 0.46),
      sec( 2.75, 0.46, 1.91, 1.16, 0.61, 0.72, 0.46, 0.49, 0.43),
      sec( 2.50, 0.43, 2.08, 1.22, 0.66, 0.80, 0.52, 0.48, 0.40),
      sec( 2.25, 0.41, 2.22, 1.26, 0.70, 0.86, 0.58, 0.47, 0.38),
      sec( 2.00, 0.39, 2.28, 1.28, 0.72, 0.90, 0.62, 0.46, 0.36),
      sec( 1.75, 0.38, 2.31, 1.30, 0.73, 0.93, 0.64, 0.45, 0.35),
      sec( 1.50, 0.38, 2.31, 1.30, 0.74, 0.95, 0.65, 0.45, 0.35),
      sec( 0.00, 0.40, 2.31, 1.30, 0.74, 0.96, 0.65, 0.45, 0.35),
      sec(-0.50, 0.42, 2.30, 1.30, 0.73, 0.95, 0.64, 0.45, 0.35),
      sec(-1.00, 0.43, 2.28, 1.32, 0.67, 0.88, 0.58, 0.47, 0.38),
      sec(-1.25, 0.48, 2.26, 1.36, 0.62, 0.84, 0.55, 0.48, 0.40),
      sec(-1.50, 0.50, 2.24, 1.38, 0.58, 0.80, 0.52, 0.50, 0.42),
      sec(-2.00, 0.56, 2.20, 1.42, 0.52, 0.74, 0.48, 0.52, 0.45),
      sec(-2.50, 0.63, 2.15, 1.45, 0.46, 0.68, 0.44, 0.55, 0.48),
      sec(-3.00, 0.71, 2.10, 1.48, 0.40, 0.60, 0.40, 0.58, 0.50),
      sec(-3.50, 0.78, 2.02, 1.45, 0.34, 0.52, 0.34, 0.60, 0.55),
      sec(-4.00, 0.86, 1.95, 1.42, 0.28, 0.44, 0.28, 0.62, 0.58),
      sec(-4.50, 0.94, 1.88, 1.42, 0.23, 0.37, 0.23, 0.65, 0.60),
      sec(-5.00, 1.00, 1.81, 1.42, 0.19, 0.31, 0.19, 0.68, 0.62),
      sec(-5.50, 1.06, 1.74, 1.42, 0.16, 0.25, 0.16, 0.70, 0.65),
      sec(-5.85, 1.10, 1.70, 1.42, 0.14, 0.21, 0.14, 0.70, 0.65),
    ];
    /* sections at every window edge, so the glazing's edges fall on
       section lines */
    var XS = [4.30, 4.24, 4.17, 4.10, 4.02, 3.92, 3.80, 3.70, 3.58, 3.50, 3.40, 3.30, 3.20,
              3.10, 3.00, 2.90, 2.80, 2.72, 2.66, 2.60, 2.52, 2.44, 2.36, 2.28, 2.20, 2.14,
              2.06, 2.00, 1.94, 1.80, 1.65, 1.50, 1.35, 1.20, 1.05, 0.94, 0.86, 0.80, 0.74,
              0.60, 0.45, 0.30, 0.15, 0.00, -0.07, -0.14, -0.30, -0.50, -0.75, -1.00, -1.25,
              -1.50, -1.75, -2.00, -2.50, -3.00, -3.50, -4.00, -4.50, -5.00, -5.50, -5.85];
    var FUS = [];
    for (i = 0; i < XS.length; i++) FUS.push(secAt(CTL, XS[i]));
    function fusAt(x) { return secAt(FUS, x); }

    /* Glazing, all off D1's side view (the black panes) and front view:
       the windscreen from the snout's top to the roof, split by a centre
       post; the chin windows down each side of the snout; the front door
       window over its small lower window; the two big windows of the
       sliding door and the cabin behind it; the eyebrow windows in the
       roof over the seats. Posts between them are left as skin. */
    /* the windscreen's lower frame and the chin windows' upper frame lie
       level (D1), so they follow the rings and step cleanly */
    function wsBase() { return 1.37; }
    function classify(c, n) {
      var h = c[2] - GROUND, x = c[0], ay = Math.abs(c[1]), sideN = Math.abs(n[1]);
      if (x >= 2.66 && x <= 3.58 && h >= wsBase(x) && ay >= 0.035) return "glass";
      if (x >= 3.00 && x <= 4.02 && h >= 0.86 && h <= 1.29 && ay >= 0.22 && sideN > 0.35) return "glass";
      if (x >= 2.06 && x <= 2.60 && h >= 1.50 && h <= 2.02 && sideN > 0.5) return "glass";
      if (x >= 2.14 && x <= 2.60 && h >= 0.88 && h <= 1.16 && sideN > 0.6) return "glass";
      if (x >= 2.06 && x <= 2.52 && n[2] > 0.6 && ay >= 0.06 && ay <= 0.55) return "glass";
      if (((x >= 0.86 && x <= 1.94) || (x >= -0.14 && x <= 0.74)) && h >= 1.32 && h <= 1.94 && sideN > 0.6) return "glass";
      return "skin";
    }
    var fl = loftInto(FUS, 18, 0.03, 0.05, classify);
    if (fl.skin) skin.push(fl.skin);
    if (fl.glass) glass.push(fl.glass);
    /* the y of the loft's port side at height h, read off the section's
       own ring, for parts that sit on the skin */
    function sideY(x, h) {
      var r = ringOf(fusAt(x), 18), z = Z(h), q;
      for (q = 0; q < 18; q++) {
        var A = r[q], B = r[q + 1];
        if ((A[1] - z) * (B[1] - z) <= 0 && A[1] !== B[1])
          return A[0] + (B[0] - A[0]) * (z - A[1]) / (B[1] - A[1]);
      }
      return fusAt(x).wm;
    }

    /* ---------------------------------------------- engine deck (D1) ----
       Two turboshafts side by side under one cowl on the cabin roof, from
       the roof step 1.62 m ahead of the mast back into the top of the
       cone; 2.78 m high and 1.5 m across at the intakes. On it the mast
       fairing, 0.8 m across, rising to 3.18 m round the mast and sloping
       away aft to the exhausts. */
    var COWL = [
      sec( 1.62, 2.22, 2.31, 2.28, 0.22, 0.26, 0.20, 0.80),
      sec( 1.50, 2.20, 2.42, 2.32, 0.48, 0.54, 0.36, 0.60),
      sec( 1.25, 2.20, 2.53, 2.36, 0.62, 0.68, 0.44, 0.50),
      sec( 1.00, 2.20, 2.63, 2.40, 0.67, 0.73, 0.48, 0.50),
      sec( 0.75, 2.20, 2.72, 2.44, 0.69, 0.75, 0.50, 0.50),
      sec( 0.25, 2.20, 2.78, 2.46, 0.70, 0.76, 0.52, 0.50),
      sec(-0.50, 2.20, 2.78, 2.46, 0.69, 0.75, 0.52, 0.50),
      sec(-1.00, 2.18, 2.73, 2.44, 0.62, 0.68, 0.48, 0.50),
      sec(-1.50, 2.15, 2.67, 2.40, 0.55, 0.60, 0.42, 0.55),
      sec(-2.00, 2.10, 2.59, 2.34, 0.46, 0.52, 0.36, 0.55),
      sec(-2.50, 2.04, 2.45, 2.24, 0.36, 0.42, 0.28, 0.60),
      sec(-3.00, 1.98, 2.25, 2.10, 0.27, 0.32, 0.20, 0.65),
      sec(-3.50, 1.92, 2.04, 1.98, 0.17, 0.20, 0.12, 0.70),
    ];
    skin.push(loftInto(COWL, 10, 0.02, 0.03, allSkin).skin);
    var MAST = [
      sec( 0.58, 2.60, 2.80, 2.70, 0.20, 0.24, 0.16, 0.70),
      sec( 0.50, 2.60, 3.00, 2.80, 0.33, 0.36, 0.26, 0.60),
      sec( 0.30, 2.60, 3.10, 2.85, 0.37, 0.40, 0.30, 0.55),
      sec( 0.00, 2.60, 3.18, 2.88, 0.38, 0.40, 0.30, 0.55),
      sec(-0.50, 2.60, 3.11, 2.86, 0.37, 0.39, 0.29, 0.55),
      sec(-1.00, 2.58, 3.11, 2.84, 0.34, 0.36, 0.27, 0.55),
      sec(-1.50, 2.55, 2.92, 2.75, 0.28, 0.30, 0.22, 0.60),
      sec(-2.00, 2.50, 2.72, 2.63, 0.18, 0.20, 0.14, 0.70),
    ];
    skin.push(loftInto(MAST, 10, 0.03, 0.03, allSkin).skin);
    /* the two intakes on the cowl's front shoulders (D1 side, P1: under
       the red covers): a short drum facing outboard, its grille dark */
    var IX = 0.42, IH = 2.56;
    both(skin, cyl(0.20, 0.20, 0.26, 16, "y", IX, 0.73, Z(IH)));
    both(dark, disc(0.165, 16, [IX, 0.862, Z(IH)], [0, 1, 0]));
    /* the two exhausts at the back of the cowl (D1 plan: side by side,
       splayed a little; side: 2.15-2.65 m aft at 2.15-2.6 m up) */
    [1].forEach(function () {
      var ex = cyl(0.15, 0.13, 0.55, 14, "x", 0, 0, 0, true);
      var em = disc(0.135, 14, [-0.28, 0, 0], [-1, 0, 0]);
      [ex, em].forEach(function (q) { q.rotateZ(9 * D2R); q.rotateY(-4 * D2R); q.translate(-2.38, 0.24, Z(2.38)); });
      both(metal, ex); both(dark, em);
    });

    /* main wheel fairings on the lower fuselage sides (D1 side: the
       blister at 0.4-1.15 m behind the mast, 0.45-0.6 m up; P1) */
    both(skin, solid(
      [[-0.30, 0.66, Z(0.66)], [-0.30, 0.82, Z(0.62)], [-0.30, 0.86, Z(0.50)], [-0.30, 0.70, Z(0.44)]],
      [[-1.15, 0.60, Z(0.70)], [-1.15, 0.76, Z(0.66)], [-1.15, 0.80, Z(0.56)], [-1.15, 0.64, Z(0.50)]]));
    both(skin, solid(
      [[-0.30, 0.66, Z(0.66)], [-0.30, 0.82, Z(0.62)], [-0.30, 0.86, Z(0.50)], [-0.30, 0.70, Z(0.44)]],
      [[-0.05, 0.70, Z(0.60)], [-0.05, 0.76, Z(0.58)], [-0.05, 0.77, Z(0.52)], [-0.05, 0.70, Z(0.48)]]));

    /* -------------------------------------------------------- the tail --
       D1: the shroud, a thick disc of fin round the duct, its top a
       straight line at 2.26 m; the fin rises from it, swept, to 3.80 m.
       The duct is a bell (the extrusion's bevel). */
    var BEV = 0.04, BT = 0.07;
    var outline = [[-5.50, 1.90], [-5.85, 2.26], [-7.45, 2.26], [-7.66, 1.75], [-7.74, 1.45],
                   [-7.55, 1.15], [-7.20, 0.95], [-6.70, 0.82], [-6.30, 0.82], [-5.80, 0.95],
                   [-5.55, 1.08]];
    var shp = new V.Shape();
    shp.moveTo(outline[0][0], Z(outline[0][1]));
    for (i = 1; i < outline.length; i++) shp.lineTo(outline[i][0], Z(outline[i][1]));
    shp.closePath();
    var hole = new V.Path(), HR = TR_R + 0.012 + BEV;
    for (i = 0; i < 24; i++) {
      var ha = -i * 2 * PI / 24;
      if (i) hole.lineTo(TR_X + HR * Math.cos(ha), Z(TR_H) + HR * Math.sin(ha));
      else hole.moveTo(TR_X + HR, Z(TR_H));
    }
    shp.holes.push(hole);
    var shroud = new V.ExtrudeGeometry(shp, { depth: SH_T - 2 * BT, bevelEnabled: true,
      bevelThickness: BT, bevelSize: BEV, bevelSegments: 2, curveSegments: 4 });
    shroud.rotateX(PI / 2);
    shroud.translate(0, (SH_T - 2 * BT) / 2, 0);
    skin.push(shroud);
    /* the fin: root chord 5.85-7.45 at 2.26 m, tip 7.10-7.79 at 3.80 m */
    function finAt(x, z, kk) { return [x, kk, z]; }
    skin.push(solid(foil([-5.80, Z(2.20)], [-7.47, Z(2.20)], 0.17, finAt),
                    foil([-7.10, Z(3.80)], [-7.79, Z(3.80)], 0.08, finAt)));
    /* the fan's gearbox, held by its arm across the duct from the front */
    dark.push(cyl(0.17, 0.17, 0.20, 16, "y", TR_X, -0.07, Z(TR_H)));
    dark.push(box(0.46, 0.06, 0.08, TR_X + 0.38, -0.07, Z(TR_H)));
    /* the tail bumper under the shroud (D1) */
    metal.push(rail([-6.05, 0, Z(0.86)], [-6.50, 0, Z(0.62)], 0.028));
    metal.push(rail([-6.50, 0, Z(0.62)], [-6.64, 0, Z(0.60)], 0.028));

    /* the tailplane: 3.20 m over the endplates, chord 5.02-5.68 aft of
       the mast, at 1.35 m (D1 plan and side) */
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + kk]; }; }
    both(skin, solid(foil([-5.00, 0], [-5.68, 0], 0.09, stabAt(0.12)),
                     foil([-5.04, 0], [-5.68, 0], 0.07, stabAt(STAB_Y - 0.02))));
    /* its big swept endplates (D1 side) */
    both(skin, plate([[-4.62, 0.98], [-4.92, 0.64], [-5.35, 0.70], [-5.95, 1.95], [-5.45, 2.00]], 0.04, STAB_Y));

    /* -------------------------------------------- weapons outriggers ----
       P1: a faired arm out of the lower fuselage behind the sliding door,
       a straight beam outboard, the launcher under its outer end. Drawn
       here with two HJ-8 tubes side by side under each beam end (see NOT
       CONFIRMED). */
    var rootY = sideY(OR_X, OR_H) - 0.04;
    both(skin, solid(
      [[OR_X + 0.42, rootY, Z(OR_H + 0.16)], [OR_X - 0.40, rootY, Z(OR_H + 0.16)],
       [OR_X - 0.46, rootY, Z(0.70)], [OR_X + 0.46, rootY, Z(0.70)]],
      [[OR_X + 0.20, 1.20, Z(OR_H + 0.07)], [OR_X - 0.18, 1.20, Z(OR_H + 0.07)],
       [OR_X - 0.18, 1.20, Z(OR_H - 0.07)], [OR_X + 0.20, 1.20, Z(OR_H - 0.07)]]));
    both(skin, solid(foil([OR_X + 0.19, 0], [OR_X - 0.17, 0], 0.13,
                          function (x, z, kk) { return [x, 1.18, Z(OR_H) + kk]; }),
                     foil([OR_X + 0.17, 0], [OR_X - 0.15, 0], 0.11,
                          function (x, z, kk) { return [x, OR_Y, Z(OR_H) + kk]; })));
    var LY = 1.64, TUBE_R = 0.08, TL = 1.566, TXc = OR_X + 0.10, THt = OR_H - 0.30;
    both(store, box(0.52, 0.10, 0.14, OR_X, LY, Z(OR_H - 0.11)));               /* pylon */
    both(store, box(1.10, 0.36, 0.05, TXc, LY, Z(THt + TUBE_R + 0.02)));        /* rack */
    [LY - 0.09, LY + 0.09].forEach(function (ty) {
      both(store, cyl(TUBE_R, TUBE_R, TL, 12, "x", TXc, ty, Z(THt)));
      both(store, cyl(TUBE_R + 0.01, TUBE_R + 0.01, 0.06, 12, "x", TXc + TL / 2 - 0.03, ty, Z(THt), true));
      both(store, cyl(TUBE_R + 0.01, TUBE_R + 0.01, 0.06, 12, "x", TXc - TL / 2 + 0.03, ty, Z(THt), true));
      both(dark, disc(TUBE_R - 0.008, 12, [TXc + TL / 2 + 0.001, ty, Z(THt)], [1, 0, 0]));
      both(dark, disc(TUBE_R - 0.008, 12, [TXc - TL / 2 - 0.001, ty, Z(THt)], [-1, 0, 0]));
    });

    /* ------------------------------------------------------ roof sight --
       "roof-mounted optical sight" (text); over the LEFT seat, behind the
       roof windows. Shape and place NOT CONFIRMED. */
    var SXp = 1.86, SYp = 0.36, SZr = Z(2.31);
    store.push(cyl(0.09, 0.11, 0.14, 12, "z", SXp, SYp, SZr + 0.06));
    store.push(cyl(0.16, 0.16, 0.22, 16, "z", SXp, SYp, SZr + 0.24));
    store.push(cyl(0.16, 0.13, 0.04, 16, "z", SXp, SYp, SZr + 0.37));
    glass.push(box(0.03, 0.17, 0.11, SXp + 0.15, SYp, SZr + 0.25));

    /* ----------------------------------------------------- team flashes --
       Upper surfaces: the tailplane tops and a strip along the top of the
       cone from the cowl's end to the shroud. */
    both(team, solid(
      [[-5.06, 0.16, Z(STAB_H) + 0.040], [-5.62, 0.16, Z(STAB_H) + 0.030], [-5.62, 0.16, Z(STAB_H) + 0.052], [-5.06, 0.16, Z(STAB_H) + 0.062]],
      [[-5.08, 1.50, Z(STAB_H) + 0.032], [-5.62, 1.50, Z(STAB_H) + 0.024], [-5.62, 1.50, Z(STAB_H) + 0.046], [-5.08, 1.50, Z(STAB_H) + 0.054]]));
    var strip = [-3.55, -4.0, -4.5, -5.0, -5.45];
    for (i = 0; i < strip.length - 1; i++) {
      var s0 = strip[i], s1 = strip[i + 1];
      var z0 = fusAt(s0).zt + 0.012, z1 = fusAt(s1).zt + 0.012;
      var ln = s0 - s1, ang = Math.atan2(z1 - z0, ln);
      team.push(box(ln + 0.02, 0.26, 0.02, (s0 + s1) / 2, 0, (z0 + z1) / 2, 0, ang, 0));
    }

    /* ---------------------------------------------- the rotor mast ---- */
    metal.push(cyl(0.10, 0.11, 0.36, 12, "z", 0, 0, Z(3.18)));
    metal.push(cyl(0.24, 0.24, 0.05, 18, "z", 0, 0, Z(3.24)));

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "stores");
    mesh(g, team, T.team, "team");

    /* ============================================== the undercarriage ===
       Retractable (published), so named "gear": the engine hides it in
       flight. Twin nose wheels on one leg (P1); the main wheels on legs
       out of the fuselage sides under their fairings, 1.86 m apart. */
    var gear = new V.Group();
    gear.name = "gear";
    g.add(gear);
    [NW_Y, -NW_Y].forEach(function (y) {
      gearD.push(cyl(NW_R, NW_R, 0.10, 18, "y", NW_X, y, Z(NW_R)));
      gearM.push(cyl(0.09, 0.09, 0.105, 12, "y", NW_X, y, Z(NW_R)));
    });
    gearM.push(cyl(0.03, 0.03, 2 * NW_Y + 0.02, 8, "y", NW_X, 0, Z(NW_R)));
    gearM.push(rail([NW_X, 0, Z(NW_R + 0.04)], [NW_X - 0.06, 0, Z(0.62)], 0.045, 8));
    gearM.push(rail([NW_X + 0.02, 0, Z(0.30)], [NW_X - 0.20, 0, Z(0.58)], 0.022, 6));
    [1, -1].forEach(function (sg) {
      var y = sg * MW_Y;
      gearD.push(cyl(MW_R, MW_R, 0.13, 20, "y", MW_X, y, Z(MW_R)));
      gearM.push(cyl(0.11, 0.11, 0.135, 12, "y", MW_X, y, Z(MW_R)));
      gearM.push(cyl(0.035, 0.035, 0.16, 8, "y", MW_X, sg * (MW_Y - 0.12), Z(MW_R)));
      gearM.push(rail([MW_X, sg * (MW_Y - 0.19), Z(MW_R)], [MW_X + 0.18, sg * 0.74, Z(0.60)], 0.05, 8));
      gearM.push(rail([MW_X, sg * (MW_Y - 0.19), Z(MW_R)], [MW_X - 0.30, sg * 0.70, Z(0.58)], 0.03, 6));
    });
    mesh(gear, gearM, T.metal, "gear_struts");
    mesh(gear, gearD, T.dark, "tyres");

    /* ======================================================= main rotor ==
       fr_gazelle.js's mount: -PI/2 about X points the rotor node's local
       +Y down the mast, so it turns clockwise from above; head undoes it
       so the head is authored in model axes, origin at the hub in the
       blade plane. */
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

    var hubM = [], blades = [];
    /* the Starflex star under its dome cap (D1: the cap 0.75 m across,
       its top 3.62 m), the swashplate below */
    hubM.push(cyl(0.36, 0.36, 0.07, 20, "z", 0, 0, 0.10));
    hubM.push(sph(0.34, 18, 6, 0, 0, 0.13, 1, 1, 0.12));
    hubM.push(cyl(0.12, 0.12, 0.16, 12, "z", 0, 0, 0.0));
    hubM.push(cyl(0.22, 0.22, 0.05, 16, "z", 0, 0, -0.16));
    /* Blade along +X; clockwise from above puts the leading edge on -Y */
    var LE = -CHORD / 4, TE = LE + CHORD;
    var BP = [[0.78, LE + 0.05], [1.00, LE], [ROTOR_R - 0.14, LE], [ROTOR_R, LE + 0.10],
              [ROTOR_R, TE], [1.00, TE], [0.78, TE - 0.06]];
    for (k = 0; k < 4; k++) {
      a = (45 + 90 * k) * D2R;
      var blg = solid(BP.map(function (q) { return [q[0], q[1], -0.018]; }),
                      BP.map(function (q) { return [q[0], q[1], 0.018]; }));
      blg.rotateZ(a);
      blades.push(blg);
      /* the star arm, the sleeve to the blade root, the pitch link */
      var parts = [box(0.42, 0.18, 0.05, 0.30, 0, 0.02), cyl(0.06, 0.05, 0.42, 8, "x", 0.62, 0, 0),
                   cyl(0.016, 0.016, 0.20, 6, "z", 0.30, -0.12, -0.08)];
      for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hubM.push(parts[i]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, blades, T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.04)], T.disc, "rotordisc");

    /* ===================================================== the Fenestron ==
       The tail mount: +PI/2 about X, so inside it local X is the model's
       X, local Y the model's up and local Z the model's right; the fan's
       axis is local Z. Eleven blades from the hub to the duct, pitched 22
       degrees, one mesh, turning in its duct. */
    var tm = new V.Group();
    tm.position.set(TR_X, 0, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var fan = [cyl(0.15, 0.15, 0.12, 14, "z", 0, 0, 0.02), sph(0.13, 12, 4, 0, 0, 0.08, 1, 1, 0.6)];
    for (k = 0; k < 11; k++) {
      var fb = box(TR_R - 0.14, 0.085, 0.014, 0.14 + (TR_R - 0.14) / 2, 0, 0.02);
      fb.rotateX(22 * D2R);
      fb.rotateZ(k * 2 * PI / 11);
      fan.push(fb);
    }
    mesh(trot, fan, T.blade, "tailrotor_fan");

    return g;
  }

  return { build: build };
})();

/* len is the MEASURED x extent: rotor disc front (5.97 m ahead of the
   mast) to the fin's top trailing corner (7.79 m behind it). */
UNIT_MODELS["pla_e90_gunship"] = { len: 13.76, build: function (T, M, C) { return HeroZ9.build(T, M, C); } };
