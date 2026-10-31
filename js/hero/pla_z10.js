/* ======= pla_z10.js - HERO model: CAIC (Changhe) Z-10 attack helicopter =======
   One row: pla_e00_gunship, "CAIC Z-10 attack helicopter" (js/eras.js),
   in PLA Army Aviation service from 2012. Built as the first-production
   Z-10 of that period: WZ-9 engines with the SIDE-facing round exhausts
   (the later upward-facing nozzles and the applique armour came with the
   2018-2020 upgrade, EN-wiki "Variants"), the WXG1006 sight in the nose,
   no mast-mounted radar (that is a Z-10ME fit). Before this file the row
   fell through to a 2,156-triangle rotor_specs row (53 draw calls).

   REFERENCES (Wikimedia Commons; copies in the scratchpad's
   q_pla_e00_gunship_ref/):
     P1  "WZ-10 at Military Museum of the Chinese People's Revolution.jpg"
         LH90003 parked, a near-broadside view of the STARBOARD side from
         about wheel-hub height. EVERY station and height in this file was
         measured off it (see SCALE below): nose, canopies, gearbox
         fairing, nacelle, exhaust, wing root, boom, fin, tail rotor hub,
         both wheels; also the tail rotor's side and its scissor angle.
     P2  "Changhe Z-10.jpg"  in flight, from below and to port: the wing
         planform (tapered, swept leading edge), the four empty pylons, the
         round exhaust facing aft and outboard, the long-legged trailing-arm
         mains, the tailplane at the foot of the fin, the ventral fin and
         the tailwheel on its strut.
     P3  "Changhe Z-10 helicopter armament.jpg"  Zhuhai 2024, a front
         three-quarter of an upgraded Z-10: the hexagonal fuselage, the
         stepped flat-panel canopies, the nose sight drum over the chin gun
         turret, the nacelles standing outboard of the rear canopy, the
         wing load (a 19-tube rocket pod inboard, a four-round missile
         launcher outboard), and the paint.
   Published figures (EN-wiki "Changhe Z-10", specification and Design):
     length 14.2 m, height 3.85 m, main rotor 13.0 m with FIVE blades,
     tail rotor FOUR blades as two two-blade sets in a non-orthogonal
     (scissor) arrangement; tandem stepped cockpit, front seat flies, rear
     seat fights; 23 mm PX-10A in a chin mount with 180 deg traverse; four
     hardpoints, up to four missiles each; AKD-10 / HJ-10 anti-tank
     missiles, 57/70/90 mm rocket pods; WXG1006 electro-optical package in
     the nose.

   SCALE. P1 was scaled at 71 px/m (on its 1280 px copy) so that the nose
   sight to the fin trailing edge is the published 14.2 m (P1: 1050 to
   45 px). The rotor hub then stands 3.77 m up and the top of the head
   3.85 m, the published height, which checks the scale; the ground line
   was taken midway between the near and far main tyres (553 px), since the
   camera stands a little forward of the wheels. Measured off P1, from the
   front of the nose sight: hub 4.72 m, main axle 3.1 m (midway between the
   near and far wheel, which perspective puts 0.9 m apart), tailwheel
   11.3 m, tail rotor hub 13.9 m, fin trailing edge 14.2 m. Heights: belly
   0.58, side chine 1.69 (aft of the wing), front windscreen base 1.80, front roof
   2.34, rear roof 3.04, gearbox fairing 3.45, nacelle 2.0-2.93, exhaust
   centre 2.27 and 0.7 m across, boom top 2.37, tail rotor hub 3.8 m,
   tailplane 1.55 m, main tyre radius 0.29 m.

   RECOGNITION LIST, each with the reference it rests on:
     1  the slim fuselage of HEXAGONAL section: a sharp side chine, the
        upper and lower halves canted in (EN-wiki Design; P1, P3)
     2  stepped tandem cockpits of flat panes in heavy frames, the rear
        one 0.7 m higher (P1, P3)
     3  the nose: a squat faceted nose carrying the sight drum in front,
        the boxy chin gun mount under it with the 23 mm barrel (P1, P3)
     4  two engine nacelles high on the shoulders, outboard of the rear
        canopy, a domed mesh intake on the outboard face of each nose and
        a big round exhaust aft facing out and back (P1, P2, P3)
     5  the tall gearbox fairing behind the rear canopy and the five-blade
        head on a short mast (P1)
     6  short tapered stub wings with anhedral at the chine, two pylons a
        side (P1 edge on, P2 from below, P3)
     7  the long boom, its belly rising to the tail, the swept fin, the
        tailplane low at its foot, a small ventral fin (P1, P2)
     8  the four-blade scissor tail rotor on the STARBOARD face of the fin
        (P1: hub and all four blades stand in front of the fin)
     9  fixed tailwheel undercarriage: trailing-arm mains on long oleos
        from the fuselage side, the tailwheel on a strut under the boom
        (P1, P2, P3)

   PAINT. A plain dark grey with a faint blue-green cast on every machine
   photographed (P1 lit sides about #39414a, shade #1f2322; P2, P3 alike),
   so it is drawn plain, at about 0.8 of the lit level the way the other
   PLA heroes are; panel seams and some weathering only. The rotor_specs
   row had it "darkgrey" too. No star, no serial, no unit marks.

   NOT CONFIRMED (estimated from proportions, or chosen, not measured):
     - all WIDTHS: the fuselage half-widths (0.56-0.58 m at the chine),
        the roof, the nacelle spacing (centres 0.66 m out), the wing span
        (4.4 m over the tips), pylon stations (1.20 and 1.85 m out) and
        the main wheel track (2.0 m) are proportioned off the oblique P3
        and P2; there is no front view or three-view on Commons.
     - the main rotor SENSE: no published figure. Drawn CLOCKWISE seen
        from above. Reasons: the swept tip of the forward blade in P1 reads
        that way at 1280 px, and with the tail rotor on the starboard face
        a clockwise rotor makes it a pusher, as on the Tiger and the Mi-28.
     - main blade chord 0.45 m, tail rotor 2.9 m across (P1 at 1.45 m
        radius, near the camera so perhaps a little large), its chord
        0.22 m, the scissor angle 50 deg (P1, roughly).
     - the tailplane span (2.6 m) and planform, the ventral fin outline.
     - the store load is the one P3 shows (a 2024 machine) put on the 2012
        airframe: a 19-tube rocket pod on each inner pylon, four AKD-10 on
        each outer one. Pod 1.6 m x 0.44 m and missile 1.75 m x 0.17 m are
        estimates.
     - the wingtip boxes (countermeasure fits are visible on the tips in P2
        but not resolved).

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   under the mast 1.70 m above the wheel contact plane (GROUND). render3d.js
   stands the model up and rescales it by the measured X extent, which the
   faint rotor disc ahead (6.50 m) and the aft scissor blade behind set.

   NAMED NODES, after eu_tiger.js and pact_e20_gunship_mi28n.js:
     rotor      the head hangs in a mount turned -PI/2 about X, which points
                the rotor node's local +Y (the axis render3d.js rotorShafts()
                picks as the one along the mast, and turns positively) DOWN
                the mast: the head turns clockwise from above. Inside, a
                +PI/2 group puts the head back into model axes.
     rotordisc  inside the rotor, transparent, depthWrite:false.
     tailrotor  the asw_helo_fit.js tail mount (+PI/2 about X): hub axis on
                local Z, the model's lateral axis; the rotor is on the
                starboard face, so outboard is local +Z.
   The chin gun is NOT named "turret" (no def.turret: the renderer would
   slew it by the accumulated heading) and the fixed wheels are NOT named
   "gear" (the renderer hides a "gear" node above 18 m).

   Materials: SKIN (one CanvasTexture), METAL, DARK, RUBBER, BLADE,
   STORES, GLASS, TEAM, DISC: nine, in thirteen draw calls.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroZ10 = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* ------------------------------------------------------------ datums
     x from the rotor hub, forward positive; heights above the ground,
     through Z(). Off P1 at 71 px/m: x = (px - 715) / 71, h = (553 - py) / 71. */
  var GROUND   = -1.70;
  function Z(h) { return GROUND + h; }
  var X_NOSE   =  4.72;                    /* front of the nose sight     */
  var HUB_H    =  3.77;                    /* blade plane; head top 3.85  */
  var ROTOR_R  =  6.50;                    /* 13.0 m disc                 */
  var CHORD    =  0.45;
  var TR_R     =  1.45;
  var TR_X = -9.20, TR_Y = -0.30, TR_H = 3.80;
  var NAC_Y    =  0.66;                    /* nacelle centreline          */
  /* stub wing: root at the chine, 8 deg anhedral */
  var WING_H = 1.75, WING_ROOT = 0.55, TIP_Y = 2.20, WING_ANH = 8 * D2R;
  function wingH(y) { return WING_H - (y - WING_ROOT) * Math.tan(WING_ANH); }
  var PYL_IN = 1.20, PYL_OUT = 1.85;
  var MW_X = 1.62, MW_Y = 1.00, MW_R = 0.29, MW_W = 0.17;
  var TW_X = -6.55, TW_R = 0.18, TW_W = 0.10;
  /* the fin outline in XZ (heights above ground) */
  var FIN_LE0 = [-7.05, 2.10], FIN_TE0 = [-8.75, 1.75];
  var FIN_LE1 = [-8.62, 3.36], FIN_TE1 = [-9.35, 3.36];
  var FIN_LE2 = [-9.02, 4.05], FIN_TE2 = [-9.48, 4.05];
  var STAB_H = 1.55, STAB_Y1 = 1.30;

  /* =================================================== the painted skin ===
     One 1024 x 1024 sheet in four 256-pixel bands, model metres:
       band 0 TOP (x across, y down), 1 PORT side (x, z), 2 STARBOARD (x, z),
       3 BELLY (x, y). projUV() picks the band from each face normal. */
  var TW = 1024, TH = 1024, BAND = 256;
  var UX0 = -10.0, UX1 = 5.0, QY = 2.4;
  var QZ0 = Z(0.2), QZ1 = Z(4.2);
  var SX = TW / (UX1 - UX0);
  function pxX(x)       { return (x - UX0) * SX; }
  function pyTop(y)     { return (QY - y) / (2 * QY) * BAND; }
  function pySide(z, b) { return b * BAND + (QZ1 - z) / (QZ1 - QZ0) * BAND; }
  var PAINT = { base: "#40484c", belly: "#3b4245", seed: 1012 };

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function skinCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(PAINT.seed), i, b, x, y;
    g.fillStyle = PAINT.base; g.fillRect(0, 0, TW, TH);
    g.fillStyle = PAINT.belly; g.fillRect(0, 3 * BAND, TW, BAND);
    /* sun on the top band; faded and touched-up panels everywhere */
    g.fillStyle = "rgba(255,255,240,0.05)"; g.fillRect(0, 0, TW, BAND);
    for (i = 0; i < 140; i++) {
      g.fillStyle = (i & 1) ? "rgba(255,255,245,0.035)" : "rgba(0,0,0,0.06)";
      g.fillRect(R() * TW, R() * TH, (0.3 + R() * 1.2) * SX, 8 + R() * 24);
    }
    /* exhaust soot: the round nozzles blow out and aft at x -2.6, so the
       soot lies along the nacelle tails and the boom sides behind them */
    for (b = 1; b <= 2; b++) {
      var sg = g.createLinearGradient(pxX(-2.6), 0, pxX(-6.0), 0);
      sg.addColorStop(0, "rgba(14,13,12,0.45)"); sg.addColorStop(1, "rgba(14,13,12,0)");
      g.fillStyle = sg;
      g.fillRect(pxX(-6.0), pySide(Z(2.6), b), pxX(-2.6) - pxX(-6.0), pySide(Z(1.7), b) - pySide(Z(2.6), b));
    }
    /* frames across the airframe at real stations */
    var frames = [4.05, 3.62, 2.40, 1.50, 0.95, 0.10, -1.10, -1.90, -2.70,
                  -3.50, -4.40, -5.30, -6.20, -7.10, -8.00];
    g.lineWidth = 1.6;
    for (i = 0; i < frames.length; i++) {
      x = pxX(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.32)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.05)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.6, 1.6);
    }
    /* stringers along the side bands, the chine seam the darkest */
    g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.4;
    [1.10, 1.69, 2.20, 2.70].forEach(function (h) {
      for (var bb = 1; bb <= 2; bb++) {
        var yy = pySide(Z(h), bb);
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
      }
    });
    /* access hatches and their fasteners: the Z-10's sides are a grid of
       small square panels (P1, P2) */
    g.lineWidth = 1.3;
    for (i = 0; i < 90; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 10 + R() * 30, hh = 10 + R() * 22;
      g.strokeStyle = "rgba(0,0,0,0.34)"; g.strokeRect(hx, hy, hw, hh);
      g.fillStyle = "rgba(0,0,0,0.26)";
      g.fillRect(hx + 2, hy + 2, 2, 2); g.fillRect(hx + hw - 4, hy + hh - 4, 2, 2);
    }
    /* the big avionics bay doors under the cockpits, both sides */
    for (b = 1; b <= 2; b++) {
      g.strokeStyle = "rgba(0,0,0,0.45)"; g.lineWidth = 2;
      g.strokeRect(pxX(1.10), pySide(Z(1.62), b), pxX(2.30) - pxX(1.10), pySide(Z(1.05), b) - pySide(Z(1.62), b));
      g.strokeRect(pxX(2.60), pySide(Z(1.62), b), pxX(3.50) - pxX(2.60), pySide(Z(1.05), b) - pySide(Z(1.62), b));
    }
    /* belly grime */
    for (i = 0; i < 80; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 20 + R() * 90, 6 + R() * 20);
    }
    return cv;
  }
  var _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    try {
      var t = new V.CanvasTexture(skinCanvas());
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
      _tex = t;
    } catch (e) { _tex = false; }
    return _tex;
  }

  /* ========================================================= materials == */
  function makeMats(C) {
    var tex = skinTexture();
    var m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.10 });
    if (tex) m.skin.map = tex; else m.skin.color.set(PAINT.base);
    m.metal  = new V.MeshStandardMaterial({ color: 0x5a6064, roughness: 0.46, metalness: 0.62 });
    m.dark   = new V.MeshStandardMaterial({ color: 0x1b1e20, roughness: 0.62, metalness: 0.35 });
    m.blade  = new V.MeshStandardMaterial({ color: 0x2c3032, roughness: 0.80, metalness: 0.08 });
    m.rubber = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    /* pods and launchers: a lighter grey than the airframe (P3) */
    m.store  = new V.MeshStandardMaterial({ color: 0x5a6062, roughness: 0.70, metalness: 0.15 });
    m.glass  = new V.MeshPhysicalMaterial({ color: 0x1d2b33, roughness: 0.08, metalness: 0.20,
                                            clearcoat: 1.0, clearcoatRoughness: 0.05 });
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    m.team   = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                            emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.disc   = new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                            transparent: true, opacity: 0.05, depthWrite: false });
    return m;
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft (the nose, intake faces, leading edges) would collapse to a line
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
        else if (band === 3) { U = pxX(x); W = 3 * BAND + pyTop(y); }
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
  /* a round bar from p to q, capped */
  function bar(p, q, r, seg) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, false);
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
     each a convex polygon: a wing, the tailplane, the fin, an endplate.
     convex() cannot be trusted with these. It winds each face by its side
     of the solid's centre, and on a plate 5 cm thick that is swept and
     tapered over a metre, a side triangle's own tilt can outweigh the
     half-thickness and flip it: the first cut of the endplates came out
     with a third of their faces inside out. Here the winding follows from
     the sections instead: both are put in the same turning sense about
     the axis from A's centre to B's, and every side quad is then wound
     outward by construction, the caps facing away from each other. */
  function solid(A, B) {
    var n = A.length, i, j, cA = [0, 0, 0], cB = [0, 0, 0], nA = [0, 0, 0], out = [];
    for (i = 0; i < n; i++) for (j = 0; j < 3; j++) { cA[j] += A[i][j] / n; cB[j] += B[i][j] / n; }
    for (i = 0; i < n; i++) {                /* Newell normal of A */
      var p = A[i], q = A[(i + 1) % n];
      nA[0] += (p[1] - q[1]) * (p[2] + q[2]);
      nA[1] += (p[2] - q[2]) * (p[0] + q[0]);
      nA[2] += (p[0] - q[0]) * (p[1] + q[1]);
    }
    if (nA[0] * (cB[0] - cA[0]) + nA[1] * (cB[1] - cA[1]) + nA[2] * (cB[2] - cA[2]) < 0) {
      A = A.slice().reverse(); B = B.slice().reverse();
    }
    for (i = 0; i < n; i++) {
      var k = (i + 1) % n;
      out.push(A[i], A[k], B[k], A[i], B[k], B[i]);
    }
    for (i = 1; i < n - 1; i++) { out.push(A[0], A[i + 1], A[i]); out.push(B[0], B[i], B[i + 1]); }
    return tris(out);
  }
  /* A six-cornered aerofoil section: leading edge, crest 15% back, the
     after-body at 75%, a sharp trailing edge. le and te are [x, z] (or a
     chord line tilted in XZ, as at the fin root); at(x, z, k) turns
     chord-plane coordinates and the thickness offset k into a point. */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }

  /* ---- the loft. A section is a trapezoid with superelliptic corners:
     faceted where e is low, round where it nears 1.
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

  /* ---- the hexagonal loft. The Z-10's fuselage is a hexagon in section
     (EN-wiki Design; P1, P3): a flat belly, the lower sides canted in up
     to a sharp chine, the upper sides canted in again to a narrow roof.
     A section is
       x; zb, wb  belly height and half-width; zc, wc  the chine;
       zt, wt     the roof; yc  centreline offset
     heights ABOVE GROUND. The faces are flat-shaded triangles (tris), so
     the chine stays a hard edge, and each is wound away from the
     section's centre line, which a convex section makes safe. */
  function hsec(x, zb, wb, zc, wc, zt, wt, yc) {
    return { x: x, zb: Z(zb), wb: wb, zc: Z(zc), wc: wc, zt: Z(zt), wt: wt, yc: yc || 0 };
  }
  function hring(s) {
    var c = s.yc;
    return [[c + s.wb, s.zb], [c + s.wc, s.zc], [c + s.wt, s.zt],
            [c - s.wt, s.zt], [c - s.wc, s.zc], [c - s.wb, s.zb]];
  }
  function hexLoft(secs, capFront, capBack) {
    var out = [], i, j;
    function push(a, b, c, ax) {
      var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var cx = (a[0] + b[0] + c[0]) / 3 - ax[0], cy = (a[1] + b[1] + c[1]) / 3 - ax[1],
          cz = (a[2] + b[2] + c[2]) / 3 - ax[2];
      if (nx * cx + ny * cy + nz * cz >= 0) out.push(a, b, c); else out.push(a, c, b);
    }
    for (i = 0; i < secs.length - 1; i++) {
      var A = secs[i], B = secs[i + 1], rA = hring(A), rB = hring(B);
      var mx = (A.x + B.x) / 2;
      var ax = [mx, (A.yc + B.yc) / 2, (A.zb + A.zt + B.zb + B.zt) / 4];
      for (j = 0; j < 6; j++) {
        var k = (j + 1) % 6;
        var a = [A.x, rA[j][0], rA[j][1]], b = [A.x, rA[k][0], rA[k][1]];
        var c = [B.x, rB[j][0], rB[j][1]], d = [B.x, rB[k][0], rB[k][1]];
        push(a, b, d, ax); push(a, d, c, ax);
      }
    }
    function cap(s, dx) {
      var r = hring(s), o = [s.x + dx, s.yc, (s.zb + s.zt) / 2];
      var ax = [s.x - (dx > 0 ? 1 : -1), s.yc, o[2]];
      for (j = 0; j < 6; j++) {
        var k = (j + 1) % 6;
        push(o, [s.x, r[j][0], r[j][1]], [s.x, r[k][0], r[k][1]], ax);
      }
    }
    if (capFront !== null) cap(secs[0], capFront);
    if (capBack !== null) cap(secs[secs.length - 1], -capBack);
    return tris(out);
  }
  function hexAt(secs, x) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = {};
        ["x", "zb", "wb", "zc", "wc", "zt", "wt", "yc"].forEach(function (kk) {
          o[kk] = A[kk] + (B[kk] - A[kk]) * f;
        });
        return o;
      }
    }
    return null;
  }

  /* ========================================================= the stores ==
     Each builder hangs one station's load, port side, under a pylon whose
     lower face is at height top; the caller mirrors it. */

  /* Four AKD-10 on a launcher of two rails a side at two levels (P3: two
     red seeker caps over two, each side of a spine). The round is taken
     as 1.75 m long and 0.17 m across, with a cruciform of wings and fins. */
  function akd10(L, y0, top) {
    var s, k;
    L.store.push(box(1.40, 0.09, 0.46, 0.00, y0, Z(top - 0.23)));
    L.store.push(box(1.25, 0.42, 0.04, 0.00, y0, Z(top - 0.05)));
    L.store.push(box(1.25, 0.42, 0.04, 0.00, y0, Z(top - 0.33)));
    var MR = 0.085, ML = 1.62;
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) {
      var my = y0 + s * 0.16, mz = Z(top - 0.17 - k * 0.28), mx = 0.10;
      L.store.push(cyl(MR, MR, ML, 8, "x", mx, my, mz, true));
      L.dark.push(sph(MR, 8, 3, mx + ML / 2, my, mz, 1.6, 1, 1));
      L.store.push(disc(MR, 8, [mx - ML / 2, my, mz], [-1, 0, 0]));
      L.store.push(box(0.14, 0.32, 0.012, mx + 0.25, my, mz, 0.785, 0, 0));
      L.store.push(box(0.14, 0.32, 0.012, mx + 0.25, my, mz, -0.785, 0, 0));
      L.store.push(box(0.12, 0.26, 0.012, mx - 0.70, my, mz, 0.785, 0, 0));
      L.store.push(box(0.12, 0.26, 0.012, mx - 0.70, my, mz, -0.785, 0, 0));
    }
  }
  /* A round 19-tube rocket pod (P3): ogival fairing at the back, the tube
     mouths in rings of one, six and twelve on a flat front face. */
  function pod19(L, y0, top) {
    var PR = 0.22, pz = Z(top - 0.05 - PR), k, a;
    L.store.push(box(0.50, 0.08, 0.10, 0.00, y0, Z(top - 0.03)));
    L.store.push(latheX([[0.80, 0.0], [0.80, 0.20], [0.78, PR], [-0.50, PR],
                         [-0.68, 0.18], [-0.80, 0.10], [-0.84, 0.0]], 16, y0, pz));
    L.metal.push(cyl(PR + 0.008, PR + 0.008, 0.05, 16, "x", 0.55, y0, pz, true));
    L.metal.push(cyl(PR + 0.008, PR + 0.008, 0.05, 16, "x", -0.30, y0, pz, true));
    var mouths = [[0, 0]];
    for (k = 0; k < 6; k++) { a = k * PI / 3; mouths.push([Math.cos(a) * 0.075, Math.sin(a) * 0.075]); }
    for (k = 0; k < 12; k++) { a = k * PI / 6 + PI / 12; mouths.push([Math.cos(a) * 0.150, Math.sin(a) * 0.150]); }
    for (k = 0; k < mouths.length; k++)
      L.dark.push(disc(0.032, 6, [0.805, y0 + mouths[k][0], pz + mouths[k][1]], [1, 0, 0]));
  }

  /* ========================================================= the build == */
  function build(THREE, M, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "z10";
    var i, k, a;
    var skin = [], dark = [], metal = [], store = [], rubber = [], team = [], glass = [];
    var L = { skin: skin, dark: dark, metal: metal, store: store, glass: glass };

    /* --------------------------------------------------- the fuselage ----
       Traced over P1 (heights) with the widths proportioned off P3. The
       nose is a faceted block ending in a flat face that carries the sight
       drum; the sill steps up 0.25 m at the rear cockpit; behind the rear
       canopy the top stands at 2.95 m between the nacelles, under the
       gearbox fairing, then falls to the boom, whose top stays at
       2.35 m all the way to the fin while its belly climbs from 0.6 m to
       1.6 m. The chine runs at 1.5 m under the cockpits and 1.7 m aft.
                 x     zb    wb    zc    wc    zt    wt                    */
    var FUS = [
      hsec( 4.30, 0.98, 0.14, 1.38, 0.30, 1.72, 0.20),
      hsec( 4.08, 0.88, 0.19, 1.42, 0.42, 1.77, 0.25),
      hsec( 3.62, 0.80, 0.22, 1.47, 0.51, 1.81, 0.29),
      hsec( 2.40, 0.68, 0.24, 1.52, 0.56, 1.85, 0.31),
      hsec( 2.37, 0.68, 0.24, 1.52, 0.56, 2.08, 0.31),
      hsec( 1.00, 0.60, 0.25, 1.60, 0.58, 2.17, 0.31),
      hsec( 0.94, 0.60, 0.25, 1.60, 0.58, 2.95, 0.28),
      hsec(-1.50, 0.60, 0.25, 1.68, 0.57, 2.95, 0.28),
      hsec(-2.40, 0.66, 0.24, 1.69, 0.50, 2.58, 0.24),
      hsec(-3.20, 0.76, 0.21, 1.69, 0.42, 2.38, 0.20),
      hsec(-4.50, 0.88, 0.18, 1.70, 0.34, 2.36, 0.16),
      hsec(-5.85, 1.03, 0.15, 1.74, 0.28, 2.34, 0.13),
      hsec(-7.10, 1.40, 0.12, 1.80, 0.22, 2.24, 0.10),
      hsec(-8.00, 1.55, 0.09, 1.84, 0.16, 2.12, 0.07),
      hsec(-8.75, 1.64, 0.05, 1.82, 0.08, 1.98, 0.04)
    ];
    /* two extra stations where the team band sits, so the band's facets
       lie exactly over the boom's (a twisted quad bulges on its diagonal) */
    FUS.splice(11, 0, hexAt(FUS, -5.20), hexAt(FUS, -5.80));
    skin.push(hexLoft(FUS, 0.04, 0.10));

    /* the gearbox fairing behind the rear canopy (P1: 3.45 m high, from
       0.8 m ahead of the hub to 1.1 m behind), narrower than the fuselage */
    skin.push(hexLoft([
      hsec( 0.86, 2.90, 0.26, 3.10, 0.30, 3.28, 0.24),
      hsec( 0.70, 2.90, 0.30, 3.20, 0.38, 3.45, 0.30),
      hsec(-1.00, 2.90, 0.30, 3.20, 0.38, 3.45, 0.30),
      hsec(-1.30, 2.90, 0.26, 3.05, 0.30, 3.12, 0.20)
    ], 0.02, 0.10));

    /* ---------------------------------------------- engine nacelles ----
       Long round-nosed pods high on the shoulders (P1: 2.0-2.93 m, the
       nose 0.85 m ahead of the hub), outboard of the rear canopy (P3),
       fairing into the boom 3.4 m behind the hub. */
    var NAC = [
      sec( 0.86, 2.20, 2.72, 2.46, 0.16, 0.22, 0.15, 0.70, NAC_Y),
      sec( 0.70, 2.06, 2.86, 2.46, 0.25, 0.33, 0.23, 0.60, NAC_Y),
      sec( 0.35, 2.00, 2.92, 2.46, 0.29, 0.37, 0.27, 0.55, NAC_Y),
      sec(-1.20, 1.99, 2.93, 2.46, 0.29, 0.37, 0.27, 0.55, NAC_Y),
      sec(-2.30, 2.00, 2.86, 2.43, 0.27, 0.35, 0.25, 0.55, NAC_Y),
      sec(-2.95, 2.06, 2.64, 2.35, 0.19, 0.25, 0.17, 0.60, NAC_Y - 0.05),
      sec(-3.45, 2.16, 2.44, 2.30, 0.07, 0.09, 0.06, 0.75, NAC_Y - 0.18)
    ];
    var nac = loft(NAC, 10, 0.07, 0.04);
    for (i = 0; i < nac.length; i++) both(skin, nac[i]);
    /* the intake: a domed mesh screen on the outboard face of the nacelle
       nose (P1, 0.05-0.38 m ahead of the hub), in a rolled lip */
    var lip = place(new V.TorusGeometry(0.27, 0.035, 4, 18), 0, 0, 0, 0, PI / 2, 0);
    lip.rotateZ(-62 * D2R);
    lip.translate(0.30, NAC_Y + 0.25, Z(2.46));
    both(skin, lip);
    var scr = sph(0.27, 12, 6, 0, 0, 0, 0.42, 1, 1);
    scr.rotateZ(-62 * D2R);
    scr.translate(0.28, NAC_Y + 0.24, Z(2.46));
    both(metal, scr);
    /* the exhaust: a big round nozzle in the nacelle tail, 0.7 m across,
       facing aft and outboard (P1 centre 2.6 m behind the hub, 2.27 m up;
       P2) */
    var EXX = -2.62, EXH = 2.30;
    var nz = cyl(0.30, 0.34, 0.30, 16, "x", 0, 0, 0);
    nz.rotateZ(-140 * D2R);
    nz.translate(EXX, NAC_Y + 0.26, Z(EXH));
    both(skin, nz);
    var nd = disc(0.29, 16, [0, 0, 0], [-1, 0, 0]);
    nd.rotateZ(-40 * D2R);
    nd.translate(EXX - 0.13, NAC_Y + 0.37, Z(EXH));
    both(dark, nd);

    /* --------------------------------------------------- stub wings ----
       From the chine, 8 deg anhedral, tapered, the leading edge swept
       (P2): root chord 1.9 m with its fillet, tip chord 0.75 m. */
    function wingAt(y) { return function (x, z, kk) { return [x, y, Z(wingH(y)) + kk]; }; }
    var wRoot = foil([0.95, 0], [-1.00, 0], 0.30, wingAt(WING_ROOT));
    var wMid  = foil([0.55, 0], [-0.70, 0], 0.22, wingAt(1.10));
    var wTip  = foil([0.20, 0], [-0.55, 0], 0.15, wingAt(TIP_Y));
    both(skin, solid(wRoot, wMid));
    both(skin, solid(wMid, wTip));
    /* tip boxes (countermeasure fits in P2, not resolved) */
    both(dark, box(0.40, 0.10, 0.16, -0.15, TIP_Y + 0.02, Z(wingH(TIP_Y) + 0.02)));
    /* pylons, their tops buried in the wing */
    function pyl(y, len) {
      var h = wingH(y);
      both(skin, box(len, 0.09, 0.20, -0.05, y, Z(h - 0.12)));
      return h - 0.20;
    }
    var inTop = pyl(PYL_IN, 0.80), outTop = pyl(PYL_OUT, 0.66);
    var P = { skin: [], dark: [], metal: [], store: [], glass: [] };
    pod19(P, PYL_IN, inTop);
    akd10(P, PYL_OUT, outTop);
    ["skin", "dark", "metal", "store", "glass"].forEach(function (kk) {
      for (var q = 0; q < P[kk].length; q++) both(L[kk], P[kk][q]);
    });

    /* ------------------------------------------------------ the nose ----
       The sight drum stands on a vertical axis in front of the flat nose
       face (P1: 0.76 m tall, 0.94-1.70 m up, its front 4.72 m ahead of the
       hub; P3: a large round window low on its face). */
    var SDX = 4.46, SDH = 1.31;
    dark.push(cyl(0.27, 0.27, 0.72, 18, "z", SDX, 0, Z(SDH)));
    dark.push(sph(0.27, 18, 6, SDX, 0, Z(SDH + 0.36), 1, 1, 0.25));
    dark.push(sph(0.27, 18, 6, SDX, 0, Z(SDH - 0.36), 1, 1, 0.25));
    glass.push(disc(0.13, 14, [SDX + 0.272, -0.06, Z(SDH - 0.12)], [1, 0, 0]));
    glass.push(box(0.03, 0.14, 0.12, SDX + 0.262, 0.12, Z(SDH + 0.16)));
    glass.push(disc(0.05, 10, [SDX + 0.272, 0.12, Z(SDH - 0.10)], [1, 0, 0]));
    /* its collar on the nose face */
    skin.push(box(0.16, 0.36, 0.16, 4.28, 0, Z(SDH + 0.10)));

    /* ------------------------------------------------- the chin gun ----
       A boxy mount under the nose (P1: 3.6-4.6 m ahead of the hub, its
       bottom 0.32 m off the ground), the 23 mm PX-10A in a cradle on its
       front, the muzzle 5.45 m ahead of the hub. */
    var GX = 4.05, GH = 0.60;
    dark.push(cyl(0.24, 0.26, 0.16, 14, "z", GX, 0, Z(0.86)));
    dark.push(box(0.80, 0.46, 0.36, GX - 0.05, 0, Z(0.58)));
    both(dark, box(0.46, 0.05, 0.28, GX + 0.30, 0.18, Z(GH)));
    var gun = [box(0.70, 0.18, 0.18, 0.30, 0, 0),
               cyl(0.055, 0.055, 0.30, 10, "x", 0.80, 0, 0),
               cyl(0.030, 0.030, 0.90, 8, "x", 1.35, 0, 0),
               cyl(0.042, 0.042, 0.12, 8, "x", 1.76, 0, 0)];
    for (i = 0; i < gun.length; i++) {
      gun[i].rotateY(-3 * D2R);
      gun[i].translate(GX - 0.40, 0, Z(GH));
      dark.push(gun[i]);
    }

    /* ---------------------------------------------------- the cockpits --
       Flat panes in heavy frames, stepped in tandem (P1): the front
       windscreen from 1.80 m at 3.62 m ahead of the hub to the roof at
       2.34 m; the rear canopy from 2.38 m up to its roof at 3.04 m,
       ending against the gearbox fairing 1.0 m ahead of the hub. */
    function pane(pts) {
      return { P: pts.map(function (p) { return [p[0], p[1], Z(p[2])]; }),
               S: pts.map(function (p) { return [p[0], -p[1], Z(p[2])]; }) };
    }
    /* sill front, windscreen base, windscreen top, roof rear, sill rear */
    var cf = pane([[3.62, 0.29, 1.80], [3.60, 0.25, 1.84], [3.15, 0.21, 2.34],
                   [2.40, 0.22, 2.36], [2.40, 0.31, 1.84]]);
    var cr = pane([[2.40, 0.31, 2.08], [2.37, 0.23, 2.38], [2.04, 0.21, 3.04],
                   [0.96, 0.23, 3.04], [0.96, 0.31, 2.17]]);
    function canopy(c) {
      var Pp = c.P, Sp = c.S;
      glass.push(convex([
        [Pp[0], Pp[1], Pp[2], Pp[3], Pp[4]], [Sp[0], Sp[1], Sp[2], Sp[3], Sp[4]],
        [Pp[0], Sp[0], Sp[1], Pp[1]], [Pp[1], Sp[1], Sp[2], Pp[2]], [Pp[2], Sp[2], Sp[3], Pp[3]],
        [Pp[3], Sp[3], Sp[4], Pp[4]], [Pp[4], Sp[4], Sp[0], Pp[0]]]));
      var fr = 0.035, e, edges = [];
      for (e = 0; e < 5; e++) { edges.push([Pp[e], Pp[(e + 1) % 5]]); edges.push([Sp[e], Sp[(e + 1) % 5]]); }
      edges.push([Pp[1], Sp[1]], [Pp[2], Sp[2]], [Pp[3], Sp[3]]);
      for (e = 0; e < edges.length; e++) skin.push(bar(edges[e][0], edges[e][1], fr, 4));
      for (e = 0; e < 2; e++) {
        var Q = e ? Sp : Pp;
        var pb = [(Q[0][0] + Q[4][0]) / 2, (Q[0][1] + Q[4][1]) / 2, (Q[0][2] + Q[4][2]) / 2];
        var pt = [(Q[2][0] + Q[3][0]) / 2, (Q[2][1] + Q[3][1]) / 2, (Q[2][2] + Q[3][2]) / 2];
        skin.push(bar(pb, pt, fr * 0.9, 4));
      }
    }
    canopy(cf);
    canopy(cr);

    /* ------------------------------------------------ fin and tailplane --
       The fin (P1): its leading edge leaves the boom top 7.05 m behind the
       hub and sweeps up to a tip at 4.05 m; the trailing edge stands
       nearly upright 9.35-9.48 m back. The tail gearbox bulges on its
       starboard face under the rotor hub. */
    function finAt(x, z, kk) { return [x, kk, z]; }
    var fin0 = foil([FIN_LE0[0], Z(FIN_LE0[1])], [FIN_TE0[0], Z(FIN_TE0[1])], 0.24, finAt);
    var fin1 = foil([FIN_LE1[0], Z(FIN_LE1[1])], [FIN_TE1[0], Z(FIN_TE1[1])], 0.18, finAt);
    var fin2 = foil([FIN_LE2[0], Z(FIN_LE2[1])], [FIN_TE2[0], Z(FIN_TE2[1])], 0.10, finAt);
    skin.push(solid(fin0, fin1));
    skin.push(solid(fin1, fin2));
    skin.push(sph(0.20, 12, 6, TR_X, -0.10, Z(TR_H), 1.40, 0.80, 1.15));
    dark.push(sph(0.04, 6, 3, -9.30, 0, Z(4.08)));
    /* the ventral fin under the end of the boom (P2) */
    var VF = [[-7.20, 1.42], [-7.70, 1.00], [-8.30, 0.98], [-8.55, 1.60]];
    skin.push(solid(VF.map(function (p) { return [p[0], 0.05, Z(p[1])]; }),
                    VF.map(function (p) { return [p[0], -0.05, Z(p[1])]; })));
    /* the tailplane, low at the foot of the fin (P1 1.55 m up; P2) */
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(STAB_H) + kk]; }; }
    both(skin, solid(foil([-7.40, 0], [-8.55, 0], 0.10, stabAt(0.08)),
                     foil([-7.85, 0], [-8.60, 0], 0.07, stabAt(STAB_Y1))));

    /* ---------------------------------------------- the undercarriage ----
       Fixed, tailwheel type (P1, P2, P3): each main wheel on a trailing
       arm from under the chine, with a long oleo leaning forward up to the
       fuselage side under the front cockpit; the tailwheel trails on a
       strut under the boom ahead of the ventral fin. */
    var axle = [MW_X, MW_Y - MW_W / 2 - 0.03, Z(MW_R)];
    both(metal, bar([2.05, 0.30, Z(0.66)], axle, 0.055, 8));
    both(metal, bar([MW_X + 0.10, MW_Y - 0.12, Z(0.42)], [2.35, 0.50, Z(1.20)], 0.065, 8));
    both(metal, bar([2.35, 0.50, Z(1.20)], [2.55, 0.48, Z(1.48)], 0.085, 8));
    both(metal, box(0.30, 0.10, 0.14, 2.55, 0.46, Z(1.48)));
    both(metal, cyl(0.045, 0.045, 0.20, 8, "y", MW_X, MW_Y - 0.12, Z(MW_R)));
    both(rubber, cyl(MW_R, MW_R, MW_W, 18, "y", MW_X, MW_Y, Z(MW_R)));
    both(metal, cyl(0.15, 0.15, MW_W + 0.01, 12, "y", MW_X, MW_Y, Z(MW_R)));
    metal.push(bar([-6.10, 0, Z(1.28)], [TW_X + 0.04, 0, Z(TW_R + 0.06)], 0.05, 8));
    both(metal, box(0.06, 0.03, 0.22, TW_X + 0.02, TW_W / 2 + 0.03, Z(TW_R + 0.06)));
    metal.push(cyl(0.03, 0.03, TW_W + 0.10, 8, "y", TW_X, 0, Z(TW_R)));
    rubber.push(cyl(TW_R, TW_R, TW_W, 14, "y", TW_X, 0, Z(TW_R)));

    /* ------------------------------------------------------ small kit ---- */
    var b0 = hexAt(FUS, -4.0);
    dark.push(box(0.03, 0.18, 0.30, -4.0, 0, b0.zb - 0.12, 0, 0.35, 0));    /* blade aerial */
    dark.push(box(0.26, 0.03, 0.16, -1.8, 0, Z(2.95) + 0.08, 0, 0.30, 0));

    /* ------------------------------------------------- team flashes ----
       Upper surfaces, because the RTS camera looks down: the outer wing
       and the tailplane, as thin plates 1 cm over the aerofoil, and a band
       round the boom cut from the boom's own sections, 3% oversize. */
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
    both(team, flash(lerpY(0.55, 0.20, 1.10, TIP_Y), lerpY(-0.70, -0.55, 1.10, TIP_Y),
                     function (y) { return Z(wingH(y)); }, lerpY(0.22, 0.15, 1.10, TIP_Y), 1.40, 2.10));
    both(team, flash(lerpY(-7.40, -7.85, 0.08, STAB_Y1), lerpY(-8.55, -8.60, 0.08, STAB_Y1),
                     function () { return Z(STAB_H); }, lerpY(0.10, 0.07, 0.08, STAB_Y1), 0.40, 1.22));
    var band = [], bxs = [-5.20, -5.80];
    for (i = 0; i < 2; i++) {
      var B = hexAt(FUS, bxs[i]), zm = (B.zb + B.zt) / 2;
      band.push({ x: bxs[i], zb: zm - (zm - B.zb) * 1.03, wb: B.wb * 1.03, zc: zm + (B.zc - zm) * 1.03,
                  wc: B.wc * 1.03, zt: zm + (B.zt - zm) * 1.03, wt: B.wt * 1.03, yc: 0 });
    }
    team.push(hexLoft(band, null, null));

    /* ======================================================= main rotor ==
       Fixed parts in model axes: the mast out of the gearbox fairing and
       the swashplate's fixed ring. */
    var HZ = Z(HUB_H);
    metal.push(cyl(0.13, 0.15, HUB_H - 3.40, 14, "z", 0, 0, Z((HUB_H + 3.40) / 2)));
    metal.push(cyl(0.28, 0.28, 0.05, 18, "z", 0, 0, Z(HUB_H - 0.20)));

    mesh(g, skin, T.skin, "airframe", true);
    mesh(g, glass, T.glass, "glass");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, store, T.store, "stores");
    mesh(g, rubber, T.rubber, "tyres");
    mesh(g, team, T.team, "team");

    /* The mount. Its -PI/2 about X points the rotor node's local +Y DOWN
       the mast, so render3d.js turns the head clockwise from above (see
       NOT CONFIRMED). head undoes the turn: authored in model axes, origin
       at the hub. */
    var mnt = new V.Group();
    mnt.position.set(0, 0, HZ);
    mnt.rotation.x = -PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);

    var hubM = [], hubD = [], blades = [];
    /* the hub: a five-armed plate under a low domed cap (P1: the cap's top
       at the published 3.85 m) */
    hubM.push(cyl(0.22, 0.25, 0.18, 15, "z", 0, 0, -0.01));
    hubM.push(cyl(0.34, 0.34, 0.05, 15, "z", 0, 0, 0.02));
    hubM.push(cyl(0.28, 0.28, 0.05, 18, "z", 0, 0, -0.15));   /* turning ring */
    hubD.push(sph(0.30, 15, 6, 0, 0, 0.04, 1, 1, 0.16));
    /* Blade outline, blade along +X. Clockwise from above: the leading
       edge is on the -Y side; the tip sweeps the leading edge back over
       its last 0.6 m (EN-wiki: "swept tips"). */
    var LE = -0.11, TE = LE + CHORD, RR = ROTOR_R;
    var BP = [[0.90, LE + 0.03], [1.30, LE], [RR - 0.60, LE], [RR - 0.35, LE + 0.03],
              [RR - 0.15, LE + 0.09], [RR - 0.03, LE + 0.19], [RR, LE + 0.29],
              [RR, TE - 0.04], [RR - 0.04, TE], [1.30, TE], [0.90, TE - 0.04]];
    for (k = 0; k < 5; k++) {
      /* 18 + 72k degrees: no blade lies along the fuselage */
      a = (18 + 72 * k) * D2R;
      var bl = M.slab(V, BP, 0.032);
      bl.translate(0, 0, -0.016);
      bl.rotateZ(a);
      blades.push(bl);
      /* the blade sleeve, the lead-lag damper on the trailing side, the
         pitch horn on the leading side and its link (P1) */
      var parts = [[box(0.62, 0.17, 0.10, 0.65, 0.01, 0), hubM],
                   [cyl(0.04, 0.04, 0.40, 8, "x", 0.50, 0.16, 0.04), hubD],
                   [box(0.18, 0.05, 0.05, 0.38, -0.15, -0.04), hubD],
                   [cyl(0.02, 0.02, 0.14, 6, "z", 0.32, -0.18, -0.10), hubD]];
      for (i = 0; i < parts.length; i++) { parts[i][0].rotateZ(a); parts[i][1].push(parts[i][0]); }
    }
    mesh(head, hubM, T.metal, "hub");
    mesh(head, hubD, T.dark, "hub_dark");
    mesh(head, blades, T.blade, "blades");
    mesh(head, [place(new V.CircleGeometry(ROTOR_R, 48), 0, 0, 0.03)], T.disc, "rotordisc");

    /* ======================================================= tail rotor ==
       asw_helo_fit.js tail mount: +PI/2 about X, so inside it local X is
       the model's X, local Y the model's up and local Z the model's
       starboard side. On the STARBOARD face of the fin (P1), so outboard
       is local +Z. Two two-blade sets crossing at 50 and 130 deg (P1), the
       outer set further out along the shaft, the X standing upright as
       P1 shows it parked. */
    var tm = new V.Group();
    tm.position.set(TR_X, TR_Y, Z(TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.09, 0.11, 0.30, 12, "z", 0, 0, 0.02), cyl(0.06, 0.03, 0.10, 10, "z", 0, 0, 0.21)];
    var trB = [];
    var tAng = [65, 245, 115, 295];
    for (k = 0; k < 4; k++) {
      var zoff = k < 2 ? 0.06 : 0.15;
      var tb = box(TR_R - 0.16, 0.22, 0.03, 0.16 + (TR_R - 0.16) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(tAng[k] * D2R);
      tb.translate(0, 0, zoff);
      trB.push(tb);
      var cuff = box(0.22, 0.10, 0.08, 0.15, 0, 0);
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

/* len is the MEASURED x extent: the rotor disc's front to the tail of the
   aft scissor blade; render3d.js normalises on the measurement anyway. */
UNIT_MODELS["pla_e00_gunship"] = { len: 16.41, build: HeroZ10.build };
