/* ============ gb_lightning.js - HERO model: English Electric Lightning F.6 ======
   One row:
     gbr_e60_fighter  "Lightning F.6"   single-seat interceptor, two Red Top   1965
   There was no Lightning hero model before this file (grep -i lightning
   js/hero: only the F-35 Lightning II files); the row was drawn as a
   same-role peer (fighter_n, the F-16C). Nothing here is built on it.

   References (Wikimedia Commons / Wikipedia, fetched for this file):
     A "BAC Lightning F Mk.6 3-view line drawing.svg" (1400 px render): side
       view, plan (nose left) and front view (drawn on its side). Measured
       column by column at 57.2 px/m, the scale at which the plan's span
       (606 px) gives 10.59 m against the published 10.62 m and its overall
       length from the pitot tip to the tailplane tips (966 px) gives
       16.89 m against the published 16.84 m. Everything on the airframe
       below is read off A: the round nose intake and its centre-body cone,
       the pitot boom under the lip, the deep fuselage with the ventral pack
       under it, the canopy and the dorsal spine, the 60 deg wing with its
       notched, kinked leading edge, the swept inner trailing edge and the
       ailerons across the tips, the wing anhedral (front view), the low
       tailplane whose tips stand behind the jet pipes, the square-cut fin,
       the two splayed ventral strakes (side and front views), the two jet
       pipes ending together, the wheel sizes and places (nose 0.52 m at
       x 3.74; mains 0.83 m at x -1.50, y +-2.05 off the front view), and
       the refuelling probe under the port wing.
     B "XS925 EE Lightning F6.jpg" (RAF Museum, port side): Red Top on its
       launcher on the forward fuselage side, below the wing root; the
       ventral pack; the tall main legs; the single nose wheel; the overwing
       ferry tanks (not drawn, see below). Its dark grey is a late scheme.
     C "English Electric Lightning F6 AN0314264.jpg" - three F.6s parked, the
       nearest in plain light grey all over with a bronze-coloured intake
       cone: the paint this model takes. Also the missile pylons on the
       fuselage sides, the main wheel-bay door standing down under the wing
       outboard of and behind the main leg, the long main legs.
     D "English Electric Lightning F6, UK - Air Force AN0748949.jpg" (XS899,
       port side): Red Top on its pylon below the windscreen line, the main
       leg and its fairing door, the wheel-bay door behind it, a ventral
       strake hanging below the rear fuselage.
     E "EE Lightning F6 XS904 BQ (7173110636).jpg" - the tail from the port
       quarter: the two jet pipes stacked one over the other, of one size,
       ending together; the square-cut fin; both ventral strakes.
     F "English Electric Lightning F6, UK - Air Force AN1102766.jpg" (XS904
       taxiing): ventral pack, wheel-bay door, the strakes, the nose leg.
     G en.wikipedia "English Electric Lightning": length 55 ft 3 in
       (16.84 m), span 34 ft 10 in (10.62 m), height 19 ft 7 in (5.97 m);
       60 deg wing sweep with the tailplane below the wing; the F.6's
       610 gal non-jettisonable ventral tank, kinked, conically cambered
       leading edge and 260 gal overwing ferry tanks; F.6 first without
       cannon, the gun pack in the front of the ventral pack later; Red Top.
       "Red Top (missile)": 3.32 m, diameter 0.23 m, span 0.91 m.

   Recognition list (each in the model, with the reference it rests on):
     1. round nose intake with its centre-body radar cone (A, C)  [radome]
     2. pitot boom under the intake lip (A)
     3. the deep fuselage: two Avons one above the other (G), the deep oval
        section of A's side view, and the two stacked jet pipes of one size
        ending together at the tail (A, E)
     4. the large ventral fuel pack under the belly (A, B, F)
     5. small bubble canopy on top and the dorsal spine running back to
        the fin (A, C)
     6. 60 deg wing, notched at the kink, the outer leading edge less swept
        (the cambered F.6 wing), the swept inner trailing edge with flaps,
        ailerons across the tips, anhedral (A, G)
     7. all-moving tailplane set low on the rear fuselage, below the wing,
        its tips behind the jet pipes (A, G)
     8. the square-cut fin (A, B, C, E)
     9. two ventral strakes, splayed (A side and front, D, E, F)
    10. tall narrow-track main gear folding outward into the thin wing, the
        wheel-bay door standing down outboard (A, C, D, F); single nose wheel
    11. two Red Top on launchers on the forward fuselage sides (B, D)
    12. refuelling probe under the port wing (A)
    13. paint: light grey all over, bronze cone (C). No roundels, fin
        flashes, codes or squadron marks.
   Team colour exactly C.team, on two small strips on the upper outer wings.

   NOT CONFIRMED (estimated from proportions or from photographs, not
   measured or published):
     - the standing height: A's wheels stand 6.1-6.2 m under the fin tip
       (uncompressed legs); the published 5.97 m is used, so the gear legs
       are 0.16 m shorter than A draws them.
     - the half-breadths of the ventral pack (front view of A only) and the
       section shape of the fuselage between the views.
     - wing, fin and tailplane thicknesses; the size of the leading-edge
       droop on the outer panel.
     - the Red Top launchers' places along the fuselage (scaled off B and D,
       which are 3/4 views), the missile's rear wings' chord, and that it
       carries no forward fins in this model.
     - the wheel-bay door's size and place (C, D, F; A shows only the bay
       outline under the wing).
     - the probe's support and its height under the wing.
   Not drawn: the overwing ferry tanks (B shows them on a museum aircraft;
   G: they were ferry tanks, not the interceptor fit), the later gun pack
   (G: the F.6 entered service without cannon), the airbrakes, aerials and
   the arrestor hook (too small or not clear in A).

   Materials: skin (painted canvas, projected top / port / starboard /
   belly), radome (the cone), dark, metal, glass, team, stores (Red Top),
   pale (seeker domes), and in "gear": metal, tyres, doors.
   Nodes: "gear" (the landing gear and its doors; hidden in flight).
   Model space: +X nose, +Y port, +Z up, metres; z = 0 is drawing A's
   datum line through the wing root (px row 225), tyres at z = -2.19 so the
   fin tip at 3.78 stands the published 5.97 m. x = 0 is midway between the
   pitot tip (8.44) and the tailplane tips (-8.42).
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroLightning = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var GROUND = -2.19;                 /* 5.97 m under the fin tip (G) */
  var FIN_TOP = 3.78;                 /* A */
  var XOFF = 0;

  /* ---- canvas layout for the projected skin */
  var PXM = 40, XMIN = -8.7, TW = 720;
  var PYM = 28, YMAX = 5.5;
  var TOPH = 308, SIDEH = 170, TH = TOPH + 2 * SIDEH + TOPH;
  var ZTOP = 3.95, ZSPAN = 6.3;

  /* the finish of C's nearest aircraft, sampled #9aa9af lit, taken to about
     0.85 for the renderer's ACES lift; the cone #8d865d */
  var PAL = { top: "#7f8b90", side: "#86939a", belly: "#8f9ba0", radome: 0x77714f };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxY(y) { return (YMAX - y) * PYM; }

  /* ------------------------------------------------------------ planform --
     Wing (A plan, port side). Inner leading edge 59.7 deg from (3.00, 0.67)
     at the fuselage side to the notch at y 3.56; the outer, cambered leading
     edge starts 0.075 m further forward and runs at 53.4 deg to the tip
     corner (-4.14, 5.24). Trailing edge: the swept inner part from (-2.65,
     0.67) to (-5.51, 2.78), then the aileron edge nearly square across to
     (-5.39, 5.30). Anhedral off the front view: 0.38 m over 4.6 m. */
  var WROOT = 0.67, WKINK_TE = 2.78, WNOTCH = 3.56, WCORNER = 5.24, WTIP = 5.30;
  function wLE(y) { return y <= WNOTCH ? 3.00 - (y - WROOT) * 1.712 : -1.88 - (y - WNOTCH) * 1.345; }
  function wTE(y) { return y <= WKINK_TE ? -2.65 - (y - WROOT) * 1.355 : -5.51 + (y - WKINK_TE) * 0.048; }
  function wZ(y)  { return 0.08 - (y - WROOT) * 0.082; }
  function wT(y)  { return Math.max(0.045, (wLE(y) - wTE(y)) * 0.048); }

  /* tailplane (A): leading edge 59 deg from (-5.48, 0.60); trailing edge
     from the fuselage (-7.36, 0.55) out and back to (-8.16, 1.00), then the
     outer edge to the rounded tip (-8.40, 2.05); set at z -0.98 (A side) */
  var TZ = -0.98;
  function tLE(y) { return -5.48 - (y - 0.60) * 1.67; }
  function tTE(y) { return y <= 1.0 ? -7.36 - (y - 0.55) * 1.78 : -8.16 - (y - 1.0) * 0.229; }

  /* fin (A): leading edge from (-4.48, 0.98) at the spine to the square top
     front corner (-7.40, 3.78); top edge to (-8.28, 3.78); trailing edge
     down to (-7.78, 0.72) on the fuselage top */
  function finLE(z) { return -4.48 - (z - 0.98) * 1.043; }
  function finTE(z) { return -7.78 - (z - 0.72) * 0.163; }
  function finT(z)  { return 0.24 - (z - 0.72) / (FIN_TOP - 0.72) * 0.16; }

  /* ---- station tables, nose to tail, from A's side view
     (x = (499 - px) / 57.2, z = (225 - py) / 57.2) and plan.
       x       top    bottom  half-width
      5.97    0.43   -0.70    0.565   intake lip, round
      4.72    0.62                    windscreen base
      3.40    1.31                    canopy roof
      2.6..-8 0.72                    fuselage top under the spine
      2.0    -1.22                    ventral pack starts
     -1.5    -1.79                    deepest point of the pack
     -4.0    -1.55                    pack ends, rear fuselage
     -8.05    0.72   -1.00    0.47    tail, the jet pipes                  */
  var FUS = [[5.97, 0.43, -0.70, 0.565, 1.0], [5.60, 0.49, -0.78, 0.59, 0.95],
             [5.00, 0.57, -0.92, 0.62, 0.90], [4.40, 0.63, -1.05, 0.65, 0.86],
             [3.60, 0.68, -1.15, 0.665, 0.82], [2.60, 0.71, -1.20, 0.67, 0.80],
             [1.00, 0.72, -1.22, 0.67, 0.80], [-1.00, 0.72, -1.24, 0.67, 0.80],
             [-3.00, 0.72, -1.30, 0.65, 0.80], [-4.00, 0.72, -1.50, 0.63, 0.80],
             [-5.00, 0.72, -1.47, 0.60, 0.80], [-6.00, 0.72, -1.35, 0.56, 0.82],
             [-7.00, 0.72, -1.18, 0.51, 0.85], [-8.05, 0.72, -1.00, 0.47, 0.88]];
  /* the ventral pack: [x, bottom, half-width]; its top runs inside the body */
  var PACK = [[2.15, -1.18, 0.25], [1.50, -1.40, 0.47], [1.00, -1.53, 0.52],
              [0.00, -1.71, 0.54], [-1.50, -1.79, 0.55], [-2.50, -1.78, 0.55],
              [-3.30, -1.70, 0.53], [-4.00, -1.55, 0.45], [-4.40, -1.42, 0.22]];
  /* canopy glass [x, zc, w, h] and the dorsal spine behind it */
  var CAN = [[4.75, 0.62, 0.28, 0.03], [4.40, 0.66, 0.37, 0.24], [3.95, 0.70, 0.41, 0.50],
             [3.40, 0.70, 0.42, 0.61], [2.95, 0.70, 0.41, 0.57]];
  var SPINE = [[2.97, 0.70, 0.41, 0.55], [2.45, 0.70, 0.37, 0.42], [2.00, 0.70, 0.34, 0.37],
               [0.00, 0.70, 0.30, 0.33], [-2.00, 0.70, 0.27, 0.315], [-4.00, 0.70, 0.22, 0.30],
               [-4.60, 0.70, 0.17, 0.28], [-5.30, 0.70, 0.08, 0.06]];

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var P = PAL;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 4242, i, b, x, y;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    var bandH = [TOPH, SIDEH, SIDEH, TOPH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }
    g.fillStyle = P.top; g.fillRect(0, 0, TW, TOPH);
    g.fillStyle = P.side; g.fillRect(0, TOPH, TW, 2 * SIDEH);
    g.fillStyle = P.belly; g.fillRect(0, TOPH + 2 * SIDEH, TW, TOPH);
    /* fuselage frames (A) */
    g.strokeStyle = "rgba(0,0,0,0.16)"; g.lineWidth = 1;
    var FR = [5.55, 4.75, 2.45, 1.40, 0.10, -1.00, -2.30, -3.60, -4.70, -6.10, -7.45];
    for (b = 0; b < 4; b++) for (i = 0; i < FR.length; i++) {
      x = pxX(FR[i]);
      g.beginPath(); g.moveTo(x, bandY[b] + (b === 0 || b === 3 ? TOPH * 0.40 : 0));
      g.lineTo(x, bandY[b] + (b === 0 || b === 3 ? TOPH * 0.60 : bandH[b])); g.stroke();
    }
    /* the flap hinge along the swept inner trailing edge and the aileron
       hinge across the tip (A), both wings, top and belly */
    g.strokeStyle = "rgba(0,0,0,0.22)";
    for (b = 0; b <= 3; b += 3) for (var sg = -1; sg <= 1; sg += 2) {
      var Yb = function (yy) { return bandY[b] + clamp(pxY(sg * yy), 2, TOPH - 2); };
      g.beginPath(); g.moveTo(pxX(wTE(0.9) + 0.75), Yb(0.9)); g.lineTo(pxX(wTE(2.70) + 0.75), Yb(2.70)); g.stroke();
      g.beginPath(); g.moveTo(pxX(wTE(2.85) + 0.70), Yb(2.85)); g.lineTo(pxX(wTE(5.20) + 0.70), Yb(5.20)); g.stroke();
      g.beginPath(); g.moveTo(pxX(wTE(2.85) + 0.70), Yb(2.85)); g.lineTo(pxX(wTE(2.85)), Yb(2.85)); g.stroke();
      /* the leading-edge tank line and the notch */
      g.beginPath(); g.moveTo(pxX(wLE(1.2) - 0.55), Yb(1.2)); g.lineTo(pxX(wLE(WNOTCH) - 0.45), Yb(WNOTCH)); g.stroke();
      /* the main wheel bay under the wing (A plan) */
      if (b === 3) g.strokeRect(pxX(-3.55), Yb(sg > 0 ? 3.75 : -2.55) , 0.95 * PXM, 1.2 * PYM);
    }
    /* access panels on the sides */
    g.strokeStyle = "rgba(0,0,0,0.12)";
    for (b = 1; b <= 2; b++) for (i = 0; i < 18; i++) {
      x = pxX(5.0 - i * 0.72 + R() * 0.3); y = sideZ(0.5 - R() * 1.4, b);
      g.strokeRect(x, y, 0.36 * PXM + R() * 8, 0.25 * SIDEH / ZSPAN + R() * 4);
    }
    /* the ventral pack's ribs (B, F) */
    g.strokeStyle = "rgba(0,0,0,0.18)";
    for (b = 1; b <= 3; b++) for (i = 0; i < 6; i++) {
      x = pxX(1.2 - i * 0.85);
      if (b === 3) { g.beginPath(); g.moveTo(x, bandY[3] + pxY(0.5)); g.lineTo(x, bandY[3] + pxY(-0.5)); g.stroke(); }
      else { g.beginPath(); g.moveTo(x, sideZ(-1.25, b)); g.lineTo(x, sideZ(-1.80, b)); g.stroke(); }
    }
    /* the rudder hinge */
    g.strokeStyle = "rgba(0,0,0,0.25)";
    for (b = 1; b <= 2; b++) {
      g.beginPath(); g.moveTo(pxX(finTE(1.2) + 0.55), sideZ(1.2, b));
      g.lineTo(pxX(finTE(3.55) + 0.55), sideZ(3.55, b)); g.stroke();
    }
    /* soot at the tail and light weathering */
    var sx = pxX(-8.3), gr = g.createLinearGradient(sx, 0, pxX(-6.8), 0);
    gr.addColorStop(0, "rgba(22,18,14,0.45)"); gr.addColorStop(1, "rgba(22,18,14,0)");
    g.fillStyle = gr; g.fillRect(sx, TOPH, pxX(-6.8) - sx, TH - TOPH);
    for (i = 0; i < 60; i++) {
      g.fillStyle = "rgba(24,20,16," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 10 + R() * 40, 2 + R() * 6);
    }
    _cv = cv;
    return cv;
  }

  var _tex;
  function skinTexture() {
    if (_tex !== undefined) return _tex;
    var t = false;
    try {
      t = new V.CanvasTexture(paint());
      t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
      t.anisotropy = 4;
      if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    } catch (e) { t = false; }
    _tex = t;
    return t;
  }

  /* each face takes the band its normal looks into: top, port, starboard,
     belly */
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
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (band === 0) { U = pxX(x); W = clamp(pxY(y), 2, TOPH - 2); }
        else if (band === 3) { U = pxX(x); W = TOPH + 2 * SIDEH + clamp(pxY(y), 2, TOPH - 2); }
        else {
          U = pxX(endOn ? x + y : x);
          W = TOPH + (band - 1) * SIDEH + clamp((ZTOP - z) / ZSPAN * SIDEH, 2, SIDEH - 2);
        }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C) {
    var tex = skinTexture(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.70, metalness: 0.18 });
    if (tex) m.skin.map = tex; else m.skin.color.set(PAL.side);
    m.radome = new V.MeshStandardMaterial({ color: PAL.radome, roughness: 0.55, metalness: 0.10 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5f6467, roughness: 0.46, metalness: 0.62 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x34505a, roughness: 0.10, metalness: 0.30 });
    m.pale  = new V.MeshStandardMaterial({ color: 0x9a8a62, roughness: 0.25, metalness: 0.30 });
    m.msl   = new V.MeshStandardMaterial({ color: 0xb4b8b6, roughness: 0.45, metalness: 0.30 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (ru_su24.js's kit) */
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
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
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
    if (XOFF) geo.translate(XOFF, 0, 0);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  function push(list, geos) {
    if (geos instanceof Array) for (var i = 0; i < geos.length; i++) list.push(geos[i]);
    else list.push(geos);
  }
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* a convex solid from its faces, each wound away from the centre */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0], fc = [0, 0, 0];
      for (j = 0; j < f.length; j++) { fc[0] += f[j][0] / f.length; fc[1] += f[j][1] / f.length; fc[2] += f[j][2] / f.length; }
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var o = (fc[0] - c[0]) * nx + (fc[1] - c[1]) * ny + (fc[2] - c[2]) * nz;
        if (o >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }
  function ls(x, yc, zc, w, h, e) { return { x: x, yc: yc, zc: zc, w: w, h: h, e: e || 1 }; }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      o.push([s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), s.e), s.zc + s.h * sgn(sn) * Math.pow(Math.abs(sn), s.e)]);
    }
    return o;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = (i + 1) * n + j, d = (i + 1) * n + (j + 1) % n;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var s = secs[k], rr = ringOf(s, n), t = [], cy = 0, cz = 0;
      for (j = 0; j < n; j++) { cy += rr[j][0]; cz += rr[j][1]; }
      var o = [s.x + dx, cy / n, cz / n];
      for (j = 0; j < n; j++) {
        var p0 = [s.x, rr[j][0], rr[j][1]], p1 = [s.x, rr[(j + 1) % n][0], rr[(j + 1) % n][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null && noseDx !== undefined) cap(0, noseDx, true);
    if (tailDx !== null && tailDx !== undefined) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  function revolve(prof, len, r, x, y, z, n, capNose, capTail) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(ls(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], 1));
    return loft(secs, n, capNose === undefined ? 0 : capNose, capTail === undefined ? 0 : capTail);
  }
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.11) / 2, d = (x0 - x1) * 0.12;
    list.push(convex([
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1, y + h, zTop], [x0, y + h, zTop]],
      [[x0 - d, y - h, zBot], [x1 + d * 0.5, y - h, zBot], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]],
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x0, y + h, zTop], [x0 - d, y + h, zBot], [x0 - d, y - h, zBot]],
      [[x1, y - h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x1 + d * 0.5, y - h, zBot]]
    ]));
  }
  /* four fins round a store; ang 0 is +, PI/4 is x */
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th, r0) {
    for (var k = 0; k < 4; k++) {
      var a = ang + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a), q0 = r0 || 0, q1 = span;
      var A = [x, y + cy * q0, z + cz * q0], B = [x - chordR, y + cy * q0, z + cz * q0];
      var Cc = [x - sweep - chordT, y + cy * q1, z + cz * q1], D = [x - sweep, y + cy * q1, z + cz * q1];
      var nY = -cz * th, nZ = cy * th;
      list.push(solid([[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                      [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]));
    }
  }
  function aftDisc(r, seg, x, y, z) {
    var g = new V.CircleGeometry(r, seg);
    g.rotateY(-PI / 2);
    g.translate(x, y, z);
    return g;
  }
  function secAt(secs, x) {
    for (var i = 0; i < secs.length - 1; i++) {
      var a = secs[i], b = secs[i + 1];
      if (x <= a.x && x >= b.x) {
        var t = (a.x - x) / ((a.x - b.x) || 1);
        var L = function (p, q) { return p + (q - p) * t; };
        return ls(x, L(a.yc, b.yc), L(a.zc, b.zc), L(a.w, b.w), L(a.h, b.h), L(a.e, b.e));
      }
    }
    return secs[secs.length - 1];
  }
  /* a frame bar over the canopy at x, above the sill */
  function arch(list, CAN, x, zMin, r) {
    var s = secAt(CAN, x), q = ls(s.x, s.yc, s.zc, s.w * 1.015, s.h * 1.015, s.e), ring = ringOf(q, 32), j, prev = null;
    for (j = 0; j <= 16; j++) {
      var p = ring[j % 32];
      if (p[1] < zMin) { prev = null; continue; }
      var P = [x, p[0], p[1]];
      if (prev) list.push(bar(prev, P, r, 6));
      prev = P;
    }
  }


  /* a wing / tail section with its leading edge drooped by `droop` (the
     F.6's cambered outer leading edge) */
  function foilD(le, te, t, droop) {
    var f = foil(le, te, t, [0, 0, 1]);
    f[0][2] -= droop; f[1][2] -= droop * 0.6; f[5][2] -= droop * 0.6;
    return f;
  }
  function wSec(y, s, droop) {
    return foilD([wLE(y), s * y, wZ(y)], [wTE(y), s * y, wZ(y)], wT(y), droop || 0);
  }
  function tSec(y, s, le, te, t) {
    return foil([le, s * y, TZ], [te, s * y, TZ], t, [0, 0, 1]);
  }
  function finSec(z, le, te) {
    return foil([le, 0, z], [te, 0, z], finT(z), [0, 1, 0]);
  }
  function tab(t) {
    var out = [];
    for (var i = 0; i < t.length; i++) {
      var r = t[i];
      out.push(ls(r[0], 0, (r[1] + r[2]) / 2, r[3], (r[1] - r[2]) / 2, r[4]));
    }
    return out;
  }

  /* Red Top (G: 3.32 m, 0.23 m, span 0.91 m): round-nosed body, the big
     clipped-delta wings at the tail (B, D); the wings' chord is estimated */
  var P_RT = [[0.50, 0.04], [0.49, 0.45], [0.465, 0.78], [0.43, 0.96], [0.39, 1.0], [-0.48, 1.0], [-0.50, 0.85]];
  function redTop(K, x, y, zc) {
    var len = 3.32, r = 0.115;
    push(K.msl, revolve(P_RT, len, r, x, y, zc, 16, 0, 0));
    push(K.pale, revolve([[0.50, 0.04], [0.49, 0.45], [0.465, 0.78], [0.44, 0.93]], len, r * 1.01, x, y, zc, 16, 0, 0));
    fins(K.msl, x - len * 0.5 + 0.62, y, zc, 0.58, 0.22, 0.30, 0.455, PI / 4, 0.010, r * 0.9);
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "lightning";
    var K = { skin: [], dark: [], metal: [], glass: [], team: [], pale: [], msl: [], radome: [] };
    var G = { metal: [], tyre: [], skin: [] };
    var s, i, y;

    /* ---- fuselage, ventral pack, canopy, spine (A) */
    var BODY = tab(FUS);
    push(K.skin, loft(BODY, 40, null, 0));
    var pk = [];
    for (i = 0; i < PACK.length; i++) {
      var bt = PACK[i][1], top = -0.95;
      pk.push(ls(PACK[i][0], 0, (top + bt) / 2, PACK[i][2], (top - bt) / 2, 0.9));
    }
    push(K.skin, loft(pk, 28, 0.05, 0.10));
    var cs = [], sp = [];
    for (i = 0; i < CAN.length; i++) cs.push(ls(CAN[i][0], 0, CAN[i][1], CAN[i][2], CAN[i][3], 1));
    for (i = 0; i < SPINE.length; i++) sp.push(ls(SPINE[i][0], 0, SPINE[i][1], SPINE[i][2], SPINE[i][3], 0.9));
    push(K.glass, loft(cs, 28, 0.02, null));
    push(K.skin, loft(sp, 24, null, 0.03));
    /* windscreen frame and the canopy arch (A, C) */
    arch(K.dark, cs, 3.95, 0.66, 0.026);
    arch(K.dark, cs, 2.99, 0.66, 0.026);
    for (s = -1; s <= 1; s += 2)
      K.dark.push(bar([4.74, s * 0.24, 0.63], [3.95, s * 0.38, 1.06], 0.022, 6));

    /* ---- the nose intake (A): lip ring at x 5.97 round the centre z -0.135,
       the dark duct, the centre-body cone from its tip at 7.35 */
    var IZ = -0.135;
    var lip = new V.TorusGeometry(0.525, 0.045, 8, 36);
    lip.rotateY(PI / 2);
    lip.translate(5.97, 0, IZ);
    K.skin.push(lip);
    push(K.dark, loft([ls(5.98, 0, IZ, 0.50, 0.50, 1), ls(5.40, 0, IZ, 0.46, 0.46, 1)], 32, null, 0));
    push(K.radome, revolve([[0.50, 0.0], [0.30, 0.42], [0.10, 0.80], [-0.05, 1.0], [-0.50, 1.0]], 1.75, 0.31, 6.48, 0, -0.12, 28, 0, 0));
    /* pitot boom under the lip (A) */
    K.metal.push(bar([5.90, 0, -0.69], [8.44, 0, -0.75], 0.022, 8));
    K.skin.push(box(0.30, 0.06, 0.10, 6.00, 0, -0.67));

    /* ---- wing (A): root inside the body, the inner panel to the trailing-
       edge kink, to the notch, the drooped outer panel, the tip */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(wSec(0.40, s), wSec(WKINK_TE, s)));
      K.skin.push(solid(wSec(WKINK_TE, s), wSec(WNOTCH - 0.001, s)));
      K.skin.push(solid(wSec(WNOTCH, s, 0.035), wSec(WCORNER, s, 0.035)));
      K.skin.push(solid(wSec(WCORNER, s, 0.035),
                        foilD([-4.62, s * WTIP, wZ(WTIP)], [-5.38, s * WTIP, wZ(WTIP)], 0.035, 0.02)));
      /* team strips on the upper outer wings */
      var tb = function (yy) {
        var le = wLE(yy), te = wTE(yy), zz = wZ(yy), h = wT(yy) * 0.47 + 0.012;
        return blk([le, s * yy, zz], [te, s * yy, zz], 0.25, 0.60, h, [0, 0, 1]);
      };
      K.team.push(solid(tb(4.30), tb(4.75)));
    }

    /* ---- tailplane, low on the rear fuselage (A) */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(tSec(0.40, s, tLE(0.40), -7.0, 0.12), tSec(1.0, s, tLE(1.0), tTE(1.0), 0.09)));
      K.skin.push(solid(tSec(1.0, s, tLE(1.0), tTE(1.0), 0.09), tSec(2.05, s, tLE(2.05), tTE(2.05), 0.05)));
      K.skin.push(solid(tSec(2.05, s, tLE(2.05), tTE(2.05), 0.05), tSec(2.16, s, -8.18, -8.37, 0.03)));
      K.metal.push(cyl(0.10, 0.10, 0.08, 12, "y", -6.30, s * 0.55, TZ));
    }

    /* ---- square-cut fin with the rudder (A, E) */
    K.skin.push(solid(finSec(0.60, -4.10, finTE(0.60)), finSec(0.98, finLE(0.98), finTE(0.98))));
    K.skin.push(solid(finSec(0.98, finLE(0.98), finTE(0.98)), finSec(FIN_TOP, finLE(FIN_TOP), finTE(FIN_TOP))));

    /* ---- ventral strakes (A side and front views; D, E, F): root along the
       belly from x -3.32 to -5.26, splayed 30 deg out of the vertical */
    for (s = -1; s <= 1; s += 2) {
      var sn = 0.5, cs30 = 0.866, th = 0.015;
      var r0 = [-3.32, s * 0.35, -1.62], r1 = [-5.26, s * 0.32, -1.36];
      var t0 = [-3.73, s * (0.35 + 0.47 * sn), -1.62 - 0.47 * cs30], t1 = [-5.35, s * (0.32 + 0.12 * sn), -1.36 - 0.12 * cs30];
      var ny = s * cs30 * th, nz = sn * th;
      K.skin.push(solid([[r0[0], r0[1] + ny, r0[2] + nz], [r1[0], r1[1] + ny, r1[2] + nz], [t1[0], t1[1] + ny, t1[2] + nz], [t0[0], t0[1] + ny, t0[2] + nz]],
                        [[r0[0], r0[1] - ny, r0[2] - nz], [r1[0], r1[1] - ny, r1[2] - nz], [t1[0], t1[1] - ny, t1[2] - nz], [t0[0], t0[1] - ny, t0[2] - nz]]));
    }

    /* ---- the two jet pipes one above the other, of one size, ending
       together (A, E): centres z 0.30 and -0.55, radius 0.40 */
    var JZ = [0.30, -0.55];
    for (i = 0; i < 2; i++) {
      push(K.metal, loft([ls(-7.95, 0, JZ[i], 0.41, 0.41, 1), ls(-8.20, 0, JZ[i], 0.39, 0.39, 1)], 28, null, null));
      K.dark.push(aftDisc(0.37, 24, -8.10, 0, JZ[i]));
      K.metal.push(aftDisc(0.16, 14, -8.12, 0, JZ[i]));
    }

    /* ---- Red Top on its launcher on each forward fuselage side (B, D) */
    for (s = -1; s <= 1; s += 2) {
      pylon(K.skin, 3.45, 2.10, s * 0.82, -0.50, -0.62, 0.12);
      K.skin.push(box(1.45, 0.20, 0.07, 2.78, s * 0.70, -0.52));
      redTop(K, 2.85, s * 1.02, -0.70);
    }

    /* ---- refuelling probe under the port wing (A plan and front views) */
    K.metal.push(bar([0.30, 1.90, -0.33], [4.70, 1.90, -0.33], 0.045, 8));
    K.metal.push(cyl(0.020, 0.045, 0.25, 8, "x", 4.82, 1.90, -0.33));
    K.skin.push(solid([[0.85, 1.86, wZ(1.9) - 0.04], [-0.10, 1.86, wZ(1.9) - 0.06], [-0.10, 1.94, wZ(1.9) - 0.06], [0.85, 1.94, wZ(1.9) - 0.04]],
                      [[0.95, 1.86, -0.30], [0.00, 1.86, -0.30], [0.00, 1.94, -0.30], [0.95, 1.94, -0.30]]));

    /* small details: the aerial on the spine, the wing-root fairing line */
    K.skin.push(box(0.26, 0.03, 0.16, -1.30, 0, 1.10));

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.msl, T.msl, "stores");
    mesh(g, K.pale, T.pale, "seekers");

    /* ---- landing gear (A, C, D, F): single nose wheel 0.52 m at x 3.74;
       mains 0.83 m at x -1.50, y +-2.05 on long legs from the wing, the
       wheel-bay door standing down behind and outboard; group "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 3.74, nr = 0.26, nz = GROUND + nr;
    G.metal.push(bar([3.95, 0, -1.08], [nx + 0.02, 0, nz + 0.06], 0.060, 10));
    G.metal.push(bar([nx - 0.02, 0.10, nz], [nx - 0.02, -0.10, nz], 0.035, 8));
    G.metal.push(bar([3.30, 0, -1.10], [3.92, 0, nz + 0.60], 0.030, 6));
    G.tyre.push(cyl(nr, nr, 0.17, 20, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.18, 12, "y", nx, 0, nz));
    for (s = -1; s <= 1; s += 2)
      G.skin.push(box(0.80, 0.02, 0.22, 4.15, s * 0.20, -1.20));          /* nose bay doors */
    var mx = -1.50, mr = 0.415, mz = GROUND + mr, my = 2.05;
    for (s = -1; s <= 1; s += 2) {
      var top = wZ(1.95) - wT(1.95) * 0.4;
      G.metal.push(bar([-1.30, s * 1.95, top], [mx + 0.02, s * 1.92, mz + 0.05], 0.075, 10));    /* leg */
      G.metal.push(bar([-2.20, s * 1.98, top + 0.02], [mx - 0.02, s * 1.93, mz + 0.85], 0.035, 6)); /* drag brace */
      G.metal.push(bar([mx, s * 1.90, mz], [mx, s * 2.12, mz], 0.045, 8));                         /* axle */
      G.tyre.push(cyl(mr, mr, 0.17, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.18, 14, "y", mx, s * my, mz));
      /* the fairing door on the leg (D) and the wheel-bay door (C, D, F) */
      G.skin.push(solid([[-1.10, s * 1.83, top - 0.05], [-1.55, s * 1.83, top - 0.05], [mx - 0.10, s * 1.80, mz + 0.50], [mx + 0.35, s * 1.80, mz + 0.50]],
                        [[-1.10, s * 1.81, top - 0.05], [-1.55, s * 1.81, top - 0.05], [mx - 0.10, s * 1.78, mz + 0.50], [mx + 0.35, s * 1.78, mz + 0.50]]));
      var dz = wZ(3.45) - wT(3.45) * 0.45;
      G.skin.push(box(0.95, 0.025, 0.80, -3.20, s * 3.45, dz - 0.40));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.skin, T.skin, "gear_doors", true);
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured x extent: pitot tip (8.44) to the tailplane tips
   (-8.40) */
UNIT_MODELS["gbr_e60_fighter"] = { len: 16.84, build: function (THREE, M, C) { return HeroLightning.build(THREE, M, C); } };
