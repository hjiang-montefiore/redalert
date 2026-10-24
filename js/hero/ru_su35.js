/* ============ ru_su35.js - HERO model: Sukhoi Su-35S "Flanker-E" ============
   Registers pact_e00_fighter ("Su-35S", "Sukhoi Su-35S Flanker-E", service
   2014). One key, one variant: the series Su-35S of the Russian Air Force in
   its in-service grey-blue scheme. No other def registers or is changed by
   this file. (pla_e90_fighter, the Su-27SK, has no hero of its own and may
   borrow a fighter model by category; that is the renderer's choice and is
   unchanged here.)

   Full-quality redo, 2026-10-24. Model space: +X nose, +Y left (port), +Z
   up, metres. The tables are written in DRAWING units: s is metres aft of
   the radome tip, y metres off the centreline, h metres above a datum line
   through the nacelle tops at the intakes. X = 10.95 - s, Y = y, Z = h.

   References (Wikimedia Commons, fetched for this file at 960 px; Russian
   Wikipedia for the figures):
     A "Sukhoi Su-27 3-view line drawing.svg" - underside plan, front and
       side views of the Flanker airframe, which the Su-35S keeps. Scaled to
       the Su-35S length (21.9 m nose to sting = 24.75 px/m in its side
       view), the stations below were read off it on a metre grid. Its plan
       view gives 14.4 m over the wingtip rails against the published 14.7;
       planform y values are taken at x1.02.
     B "Russian Air Force, RF-81719, Sukhoi Su-35S (49581740157).jpg" - an
       in-service Su-35S banking away, upper surfaces: pale blue-grey body
       and wings, the fins dark grey-blue with a pale blotch, a darker grey
       panel round the windscreen and the IRST, mid-grey radome, red stars
       on the fins and a small one on each upper wing. No nose boom.
     C "Russian Air Force, RF-95475, Sukhoi Su-35S (37230419561).jpg" - from
       below: the pale lower surfaces, red stars under the wings, the dark
       fins, the long nozzles and the tail sting.
     D "Su-35S of the Russian Air Force.jpg" - head-on, parked: fin spacing
       (4.4 m) against the 15.3 m pod-to-pod span, the main gear track, the
       big square intakes under the LERX, the wingtip pods, the ventral fins.
     E "Russian Air Force, RF-81742, Sukhoi Su-35S (51523641832).jpg" and
       G "Russian Air Force, RF-95475, Sukhoi Su-35S (37372972745).jpg" -
       side-on in flight: the profile, the canopy, the sting, the pods.
     F "Su-35S - MAKS-2013Firstpixflights06.jpg" - taxiing, three-quarter
       front: the main legs outboard of the intakes, the canopy and IRST
       ball (its dark prototype paint is NOT used; its strong perspective
       is not used for gear stations).
     I "Sukhoi Su-35S ‘RF-95242 - 03 red’ (37309806592).jpg" - rolling
       out under its drag chute, seen
       side-on from the port side about 20 deg aft of the beam: the gear
       stations.
     H "Sukhoi Su-35S 07 RED PAS 2013 07.jpg" - the AL-41F1S nozzle close-
       up: a long bare-metal petal section with a pale lining inside, the
       stabilator root above it.
     ru.wikipedia "Су-35": length 21.9 m, wing span 14.75 m, height 5.9 m,
       wing area 62.04 m2, leading-edge sweep 42 deg; AL-41F1S engines with
       thrust vectoring of +-15 deg on canted axes; no canard foreplanes and
       no spine airbrake (both of the earlier Su-27M); short datalink strips
       on the cockpit sides, the fins and the wingtips. The row's 15.3 m
       span is taken over the wingtip pods.

   Recognition list (what makes it a Su-35S at RTS zoom; each shows here):
     1. The Flanker planform without canards: a curved ogival LERX from the
        cockpit sides into a 42 deg wing (A plan: LERX edge at s 6-10.6,
        straight leading edge s 10.6 -> 15.0, tip chord 2.45 m) - wing.
     2. Two widely spaced engine nacelles with a flat tunnel between them,
        hung under the wing (A plan and front, D) - NAC table.
     3. Big square intakes under the LERX, their mouths raked with the top
        lip forward (A side, D, F) - the raked first nacelle section.
     4. Twin fins on tail beams outboard of the nacelles, raked tips, and
        small ventral fins under the beams (A side, D) - FIN, beams.
     5. Low all-moving tailplanes on the beams, beside the nozzles (A, H).
     6. Long AL-41F1S thrust-vectoring nozzles: bare metal petals, a pale
        lining, dark seams (H, C) - nozzle().
     7. The central tail sting between the nozzles, longer than the beams
        (A side, C, G).
     8. The IRST ball ahead of the windscreen, offset to starboard, on a
        dark grey panel (B, F).
     9. A tall bubble canopy on a drooped nose, the dorsal spine falling
        away behind it - and NO spine airbrake (A, E, ru.wikipedia).
    10. Wingtip ECM pods in place of the Su-27's launch rails (B, D, E).
    11. The in-service scheme: pale blue-grey all over, dark grey-blue fins
        with a pale blotch, mid-grey radome (B, C, E).
   Paint, sampled from B and E and taken to about 0.8 of its level: body
   (156,177,186), fins (93,114,124), radome (133,137,139).
   Markings: the Russian red star with a white edge on the outer face of
   each fin, on each upper wing near the trailing edge and under each wing
   (B, C). No bort numbers, no flag, no lettering, no serial.
   Gear (I, D): it RETRACTS, so the group is named "gear". Twin-wheel nose
   leg between the intake mouths, behind the cockpit; single-wheel main
   legs outboard of the nacelles. Stations read off I, side-on: along the
   centreline (25.5 px/m nose tip to sting end) the nose wheels stand at
   s 8.0 and the mains (mean of the near and far wheel) at s 13.8, a
   5.81 m wheelbase against the published Flanker 5.88 m; the mains stand
   1.2 m ahead of the fin-root leading edge (s 15.2 here). Drawn at s 8.12
   and s 14.0: the published 5.88 m wheelbase, 4.34 m track.
   (The 2026-10-24 first issue had them at s 6.0 and 11.9, read off the
   three-quarter photograph F; that was 2 m too far forward.)
   Stores: the row names R-77-1 and R-73 (generations.js): two of each on
   wing pylons, as the old file had them; the Su-35S has twelve stations.
   Corrected from the old file: it drew a 1.2 m nose probe (the Su-35S has
   none, B, E, G); its main gear stood ahead of the wing root (A puts the
   wing root at s 10.6; I puts the main wheels at s 13.8-14.0); its
   trailing edge sat 1.5 m too far forward (A).
   Team colour exactly C.team: one modest strip on each upper outer wing.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu35 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  function X(s) { return 10.95 - s; }
  var GROUND = -1.45;                  /* fin tip h 4.45, height 5.9 m */

  /* ------------------------------------------------------- the tables -- */
  /* forebody and centre body: [s, half-width, crown h, keel h, upper exp, lower exp] (A side and plan) */
  var BODY = [
    [0.00, 0.02, 0.57, 0.53, 1.0, 1.0],
    [0.30, 0.14, 0.71, 0.43, 1.0, 1.0],
    [0.70, 0.25, 0.86, 0.37, 1.0, 1.0],
    [1.20, 0.36, 1.03, 0.30, 1.0, 1.0],
    [1.80, 0.47, 1.22, 0.24, 1.0, 1.0],
    [2.50, 0.56, 1.43, 0.19, 1.0, 0.95],
    [3.10, 0.60, 1.60, 0.16, 1.0, 0.9],      /* radome joint */
    [3.70, 0.63, 1.72, 0.13, 0.95, 0.85],
    [4.30, 0.66, 1.79, 0.12, 0.9, 0.8],      /* windscreen base */
    [5.00, 0.70, 1.82, 0.14, 0.85, 0.8],
    [6.00, 0.78, 1.86, 0.18, 0.85, 0.75],
    [7.00, 0.86, 1.93, 0.25, 0.85, 0.75],
    [8.00, 0.93, 2.04, 0.33, 0.85, 0.7],
    [9.00, 0.98, 2.05, 0.42, 0.85, 0.7],
    [10.0, 1.02, 1.95, 0.48, 0.85, 0.7],
    [11.0, 1.05, 1.81, 0.50, 0.85, 0.7],
    [12.0, 1.05, 1.66, 0.52, 0.85, 0.7],
    [13.0, 1.02, 1.51, 0.52, 0.85, 0.7],
    [14.0, 0.98, 1.39, 0.52, 0.85, 0.7],
    [15.0, 0.92, 1.28, 0.52, 0.85, 0.7],
    [16.0, 0.84, 1.20, 0.52, 0.85, 0.7],
    [17.0, 0.72, 1.13, 0.52, 0.85, 0.75],
    [18.0, 0.52, 1.06, 0.50, 0.9, 0.8],
    [18.8, 0.36, 1.01, 0.44, 0.95, 0.9]
  ];
  var RADOME_N = 7;                          /* the first 7 rows are the grey radome */
  /* tail sting (A side and plan, C, G): [s, half-width, top h, bottom h] */
  var STING = [[18.8, 0.36, 1.01, 0.44], [19.6, 0.29, 0.92, 0.36], [20.4, 0.23, 0.82, 0.40],
               [21.1, 0.15, 0.72, 0.45], [21.6, 0.08, 0.64, 0.50], [21.9, 0.02, 0.58, 0.55]];
  /* canopy (A side): [s, half-width, top h]; the glazing sits on a sill at h 1.70 */
  var CANOPY = [[4.30, 0.30, 1.86], [4.70, 0.45, 2.20], [5.20, 0.50, 2.45], [5.80, 0.51, 2.57],
                [6.50, 0.50, 2.55], [7.10, 0.46, 2.42], [7.60, 0.38, 2.25]];
  /* nacelles, each side (A plan, front, side): [s, centre y, centre h, half-width, upper, lower, exp].
     The first row is the intake mouth, raked 1.45 m per metre of height, top lip forward. */
  var NAC = [
    [9.60, 0.97, -0.07, 0.59, 0.53, 0.53, 0.30],
    [10.8, 0.97, 0.00, 0.60, 0.75, 0.60, 0.40],
    [13.0, 0.97, 0.05, 0.62, 0.75, 0.65, 0.50],
    [15.0, 0.97, 0.10, 0.62, 0.70, 0.70, 0.60],
    [16.5, 0.97, 0.20, 0.62, 0.65, 0.72, 0.75],
    [17.5, 0.97, 0.27, 0.61, 0.62, 0.67, 0.85],
    [18.5, 0.97, 0.35, 0.59, 0.58, 0.60, 0.95],
    [19.15, 0.97, 0.42, 0.57, 0.56, 0.56, 1.0]
  ];
  var RAKE = 1.45;
  /* tail beams carrying fins and tailplanes (A plan and side, D): [s, centre y, centre h, half-width, half-height] */
  var BEAM = [[14.5, 1.95, 0.72, 0.30, 0.28], [16.5, 1.95, 0.60, 0.30, 0.32], [18.5, 1.97, 0.55, 0.26, 0.30],
              [19.8, 1.98, 0.50, 0.19, 0.22], [20.5, 1.98, 0.48, 0.11, 0.13], [20.85, 1.98, 0.47, 0.03, 0.04]];
  /* wing planform (A plan, y at x1.02): the LERX edge, then the 42 degree leading edge */
  var WLE = [[0.70, 5.0], [0.85, 6.15], [0.95, 7.0], [1.15, 8.0], [1.43, 9.0], [1.76, 10.0], [2.04, 10.6], [7.04, 15.0]];
  var WST = [0.70, 0.85, 0.95, 1.15, 1.43, 1.76, 2.04, 2.9, 3.8, 4.7, 5.6, 6.4, 7.04];
  var TIPY = 7.04;
  function wLE(y) {
    for (var i = 0; i < WLE.length - 1; i++) {
      if (y <= WLE[i + 1][0]) { var f = (y - WLE[i][0]) / (WLE[i + 1][0] - WLE[i][0]); return WLE[i][1] + f * (WLE[i + 1][1] - WLE[i][1]); }
    }
    return WLE[WLE.length - 1][1];
  }
  function wTE(y) { return y <= 2.14 ? 16.0 : 16.0 + (y - 2.14) * 0.299; }       /* tip 17.47 */
  function wH(y) { return y <= 2.04 ? 0.95 : 0.95 - (y - 2.04) * 0.035; }        /* 2 deg anhedral (A front, D) */
  function wT(y) { return y <= 2.04 ? 0.30 : 0.30 - (y - 2.04) / (TIPY - 2.04) * 0.21; }
  /* fin (A side): root s 15.2 -> 18.5 at h 0.88, leading-edge tip s 17.6 at h 4.45, trailing-edge top s 18.5 h 4.12 */
  var FIN_Y = 2.12, FIN_R = 0.80, FIN_T = 4.45;

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -11.2, TW = 680;
  var YMAX = 8.0, TOPH = 480, ZTOP = 4.7, SIDEH = 190;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  var PAL = { body: "#9cb1ba", belly: "#a2b5bd", fin: "#5d727c", blot: "#93a9b3", glare: "#4f5a60", strip: "#6f7b81" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxS(s) { return pxX(X(s)); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  /* the Russian star: red with a white edge (as ru_su57.js) */
  function star(g, cx, cy, rx, ry) {
    function path(k) {
      g.beginPath();
      for (var i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, q = (i & 1) ? 0.40 : 1;
        var x = cx + Math.cos(a) * q * rx * k, y = cy + Math.sin(a) * q * ry * k;
        if (i) g.lineTo(x, y); else g.moveTo(x, y);
      }
      g.closePath();
    }
    g.fillStyle = "#d9dad6"; path(1.16); g.fill();
    g.fillStyle = "#b3261e"; path(1.0); g.fill();
  }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 35101, i, b, x, y, k;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    g.fillStyle = PAL.body; g.fillRect(0, 0, TW, B_BEL);
    g.fillStyle = PAL.belly; g.fillRect(0, B_BEL, TW, TOPH);
    /* fins, both faces of both: dark grey-blue with the pale blotch low on
       the fin (B). The side bands hold the fins by (s, h). */
    function finShape(band) {
      g.beginPath();
      g.moveTo(pxS(15.15), band + pxZ(0.80)); g.lineTo(pxS(17.62), band + pxZ(4.50));
      g.lineTo(pxS(18.58), band + pxZ(4.16)); g.lineTo(pxS(18.58), band + pxZ(0.80)); g.closePath();
    }
    for (b = 0; b < 3; b++) {
      var bd = [B_PORT, B_STBD, B_IN][b];
      g.fillStyle = PAL.fin; finShape(bd); g.fill();
      g.save(); finShape(bd); g.clip();
      g.fillStyle = PAL.blot;
      g.beginPath();
      g.ellipse(pxS(17.2), bd + pxZ(2.0), 0.75 * PXM, 0.55 * PXM, -0.5, 0, 2 * PI);
      g.ellipse(pxS(17.75), bd + pxZ(1.45), 0.45 * PXM, 0.40 * PXM, 0.3, 0, 2 * PI);
      g.fill();
      g.restore();
    }
    /* dark grey panel over the nose top from the radome joint, beside the canopy (B), and down the sides only ahead of the windscreen (E) */
    g.fillStyle = PAL.glare;
    g.beginPath();
    g.moveTo(pxS(3.12), pxY(0.62)); g.lineTo(pxS(7.4), pxY(0.80)); g.lineTo(pxS(7.4), pxY(-0.80)); g.lineTo(pxS(3.12), pxY(-0.62));
    g.closePath(); g.fill();
    for (b = 0; b < 2; b++) {
      var sb = [B_PORT, B_STBD][b];
      g.beginPath();
      g.moveTo(pxS(3.12), sb + pxZ(1.62)); g.lineTo(pxS(5.0), sb + pxZ(1.86)); g.lineTo(pxS(5.0), sb + pxZ(1.55)); g.lineTo(pxS(3.12), sb + pxZ(1.40));
      g.closePath(); g.fill();
      /* the datalink strips on the cockpit sides (ru.wikipedia) */
      g.fillStyle = PAL.strip;
      g.fillRect(pxS(4.6), sb + pxZ(1.55), 0.9 * PXM, 0.12 * PXM);
      g.fillStyle = PAL.glare;
    }
    /* panel lines: frames on every band, chordwise lines on the wings */
    g.strokeStyle = "rgba(0,0,0,0.15)"; g.lineWidth = 1;
    var FR = [3.1, 4.3, 5.9, 7.7, 9.0, 10.4, 11.8, 13.2, 14.6, 16.0, 17.3, 18.8, 20.0];
    for (i = 0; i < FR.length; i++) {
      x = pxS(FR[i]);
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    }
    /* flaperon, aileron and leading-edge flap hinge lines (A plan), top and belly */
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.beginPath();
        g.moveTo(pxS(15.25), ob + pxY(k * 2.14)); g.lineTo(pxS(16.75), ob + pxY(k * 7.0)); g.stroke();
        g.beginPath();
        g.moveTo(pxS(16.25), ob + pxY(k * 5.5)); g.lineTo(pxS(17.0), ob + pxY(k * 5.5)); g.stroke();
        g.beginPath();
        g.moveTo(pxS(10.95), ob + pxY(k * 2.3)); g.lineTo(pxS(15.0), ob + pxY(k * 6.85)); g.stroke();
      }
      /* the centreline seam */
      g.beginPath(); g.moveTo(pxS(4.5), ob + pxY(0)); g.lineTo(pxS(19), ob + pxY(0)); g.stroke();
    }
    /* rivet rows and a little weathering */
    g.fillStyle = "rgba(0,0,0,0.11)";
    for (i = 0; i < 90; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 24) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 50; i++) {
      g.fillStyle = "rgba(30,34,38," + (0.03 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 8 + R() * 40, 2 + R() * 6);
    }
    /* stars (B, C): outer face of each fin; upper wings near the trailing
       edge; under the wings. Not on the inner band. */
    star(g, pxS(17.55), B_PORT + pxZ(2.85), 0.36 * PXM, 0.36 * PXM);
    star(g, pxS(17.55), B_STBD + pxZ(2.85), 0.36 * PXM, 0.36 * PXM);
    star(g, pxS(15.75), pxY(4.7), 0.30 * PXM, 0.30 * PXM);
    star(g, pxS(15.75), pxY(-4.7), 0.30 * PXM, 0.30 * PXM);
    star(g, pxS(15.0), B_BEL + pxY(5.15), 0.42 * PXM, 0.42 * PXM);
    star(g, pxS(15.0), B_BEL + pxY(-5.15), 0.42 * PXM, 0.42 * PXM);
    _cv = cv;
    return cv;
  }

  var _tex = null;
  function skinTexture() {
    if (_tex !== null) return _tex;
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
     inner (a side face turned toward the centreline), belly */
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
      var cy = (p[t + 1] + p[t + 4] + p[t + 7]) / 3;
      var band;
      if (nz > 0.55) band = B_TOP;
      else if (nz < -0.55) band = B_BEL;
      else if (Math.abs(cy) > 0.3 && ny * cy < 0) band = B_IN;
      else band = ny >= 0 ? B_PORT : B_STBD;
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, W;
        if (band === B_TOP || band === B_BEL) { U = pxX(x); W = band + clamp(pxY(y), 1, TOPH - 1); }
        else { U = pxX(endOn ? x + y : x); W = band + clamp(pxZ(z), 1, SIDEH - 1); }
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C) {
    var tex = skinTexture(), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x9cb1ba);
    m.radome = new V.MeshStandardMaterial({ color: 0x85898b, roughness: 0.70, metalness: 0.08 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1a1d1f, roughness: 0.70, metalness: 0.25 });
    m.metal = new V.MeshStandardMaterial({ color: 0x67686a, roughness: 0.42, metalness: 0.65 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x77736a, roughness: 0.38, metalness: 0.62 });   /* H: bare petals, heat-tinted */
    m.glass = new V.MeshStandardMaterial({ color: 0x24363d, roughness: 0.10, metalness: 0.35 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xbfc4c3, roughness: 0.55, metalness: 0.15 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit -- */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  /* a cylinder along model x, y or z */
  function cyl(r0, r1, len, seg, axis, x, y, z) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, false);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
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
  /* one buffer per material: a single draw call for what would otherwise be dozens */
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
  /* a closed solid through a run of sections with the same number of
     corners, wound from the sections' own Newell normal (thin swept panels
     fool a centroid test) */
  function sloft(S) {
    var A = S[0], B = S[1], n = A.length, i, k, nx = 0, ny = 0, nz = 0, ax = 0, ay = 0, az = 0, out = [];
    for (i = 0; i < n; i++) {
      var p = A[i], q = A[(i + 1) % n];
      nx += (p[1] - q[1]) * (p[2] + q[2]); ny += (p[2] - q[2]) * (p[0] + q[0]); nz += (p[0] - q[0]) * (p[1] + q[1]);
      ax += B[i][0] - A[i][0]; ay += B[i][1] - A[i][1]; az += B[i][2] - A[i][2];
    }
    var sg = (nx * ax + ny * ay + nz * az) >= 0 ? 1 : -1;
    function q3(a, b, c) { if (sg > 0) out.push(a, b, c); else out.push(a, c, b); }
    var L = S[S.length - 1];
    for (i = 1; i < n - 1; i++) { q3(A[0], A[i + 1], A[i]); q3(L[0], L[i], L[i + 1]); }
    for (k = 0; k < S.length - 1; k++) {
      var P = S[k], Q = S[k + 1];
      for (i = 0; i < n; i++) {
        var j = (i + 1) % n;
        var d1 = (P[i][0] - Q[j][0]) * (P[i][0] - Q[j][0]) + (P[i][1] - Q[j][1]) * (P[i][1] - Q[j][1]) + (P[i][2] - Q[j][2]) * (P[i][2] - Q[j][2]);
        var d2 = (P[j][0] - Q[i][0]) * (P[j][0] - Q[i][0]) + (P[j][1] - Q[i][1]) * (P[j][1] - Q[i][1]) + (P[j][2] - Q[i][2]) * (P[j][2] - Q[i][2]);
        if (d1 <= d2) { q3(P[i], P[j], Q[j]); q3(P[i], Q[j], Q[i]); }
        else { q3(P[i], P[j], Q[i]); q3(P[j], Q[j], Q[i]); }
      }
    }
    return tris(out);
  }
  /* aerofoil section: leading edge, crest 15% back, after-body at 75%,
     sharp trailing edge; thickness t along the unit normal nrm */
  function foil(le, te, t, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(0, 0), p(0.06, t * 0.36), p(0.18, t / 2), p(0.45, t * 0.48), p(0.75, t * 0.32), p(1, 0),
            p(0.75, -t * 0.32), p(0.45, -t * 0.48), p(0.18, -t / 2), p(0.06, -t * 0.36)];
  }
  function blk(le, te, f0, f1, h, nrm) {
    function p(f, k) {
      return [le[0] + (te[0] - le[0]) * f + nrm[0] * k, le[1] + (te[1] - le[1]) * f + nrm[1] * k,
              le[2] + (te[2] - le[2]) * f + nrm[2] * k];
    }
    return [p(f0, h), p(f1, h), p(f1, -h), p(f0, -h)];
  }

  /* ---- the loft. A section is a superellipse with separate upper and
     lower half-heights and exponents (1 is round, lower is boxier). rake
     shifts each ring point along x by rake * (z - zc). Sections run nose to
     tail (decreasing x); the quads (a, c, b) then face outward. */
  function sec(x, yc, zc, w, hu, hl, eu, el, rake) {
    return { x: x, yc: yc, zc: zc, w: w, hu: hu, hl: hl, eu: eu || 1, el: el || eu || 1, rake: rake || 0 };
  }
  function sgn(v) { return v < 0 ? -1 : 1; }
  function ringOf(s, n) {
    var o = [], j, t, c, sn, e, z;
    for (j = 0; j < n; j++) {
      t = 2 * PI * j / n; c = Math.cos(t); sn = Math.sin(t);
      e = sn >= 0 ? s.eu : s.el;
      z = s.zc + (sn >= 0 ? s.hu : s.hl) * sgn(sn) * Math.pow(Math.abs(sn), e);
      o.push([s.x + s.rake * (z - s.zc), s.yc + s.w * sgn(c) * Math.pow(Math.abs(c), e), z]);
    }
    return o;
  }
  function loft(secs, n, noseDx, tailDx) {
    var pos = [], idx = [], i, j, r;
    for (i = 0; i < secs.length; i++) {
      r = ringOf(secs[i], n);
      for (j = 0; j < n; j++) pos.push(r[j][0], r[j][1], r[j][2]);
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
    if (noseDx !== null && noseDx !== undefined) out.push(capOf(secs[0], n, noseDx, true));
    if (tailDx !== null && tailDx !== undefined) out.push(capOf(secs[secs.length - 1], n, -tailDx, false));
    return out;
  }
  /* a cone (or flat disc, dx 0) closing a ring, facing forward or aft */
  function capOf(s, n, dx, front) {
    var rr = ringOf(s, n), t = [], cx = 0, cy = 0, cz = 0, j;
    for (j = 0; j < n; j++) { cx += rr[j][0]; cy += rr[j][1]; cz += rr[j][2]; }
    var o = [cx / n + dx, cy / n, cz / n];
    for (j = 0; j < n; j++) {
      var p0 = rr[j], p1 = rr[(j + 1) % n];
      if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
    }
    return tris(t);
  }
  /* a round body of revolution along x from [xFraction, radiusFraction], nose first */
  function revolve(prof, len, r, x, y, z, n) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(sec(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], r * prof[i][1], 1, 1));
    return loft(secs, n, 0, 0);
  }

  /* a pylon: a slim blade from the wing (zTop) down to zBot */
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.11) / 2, d = (x0 - x1) * 0.12;
    list.push(sloft([
      [[x0, y + h, zTop], [x1, y + h, zTop], [x1 + d * 0.5, y + h, zBot], [x0 - d, y + h, zBot]],
      [[x0, y - h, zTop], [x1, y - h, zTop], [x1 + d * 0.5, y - h, zBot], [x0 - d, y - h, zBot]]
    ]));
  }
  /* four fins round a store; ang 0 is +, PI/4 is x */
  function fins(list, x, y, z, chordR, chordT, sweep, span, ang, th) {
    for (var k = 0; k < 4; k++) {
      var a = ang + k * PI / 2, cy = Math.cos(a), cz = Math.sin(a);
      var A = [x, y, z], B = [x - chordR, y, z];
      var Cc = [x - sweep - chordT, y + cy * span, z + cz * span], D = [x - sweep, y + cy * span, z + cz * span];
      var nY = -cz * th, nZ = cy * th;
      list.push(sloft([[[A[0], A[1] + nY, A[2] + nZ], [B[0], B[1] + nY, B[2] + nZ], [Cc[0], Cc[1] + nY, Cc[2] + nZ], [D[0], D[1] + nY, D[2] + nZ]],
                       [[A[0], A[1] - nY, A[2] - nZ], [B[0], B[1] - nY, B[2] - nZ], [Cc[0], Cc[1] - nY, Cc[2] - nZ], [D[0], D[1] - nY, D[2] - nZ]]]));
    }
  }
  var P_R77 = [[0.50, 0.03], [0.44, 0.40], [0.36, 0.80], [0.28, 1.0], [-0.42, 1.0], [-0.50, 0.90]];
  var P_R73 = [[0.50, 0.05], [0.42, 0.50], [0.32, 0.90], [0.22, 1.0], [-0.44, 1.0], [-0.50, 0.85]];
  var P_POD = [[0.50, 0.04], [0.44, 0.45], [0.34, 0.85], [0.22, 1.0], [-0.36, 1.0], [-0.46, 0.80], [-0.50, 0.45]];
  function store(K, kind, x, y, zTop) {
    var len, r, zc, a;
    if (kind === "r77") {              /* R-77-1: 3.7 m, 0.2 m body, lattice tail fins */
      len = 3.7; r = 0.10; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_R77, len, r, x, y, zc, 12));
      for (a = 0; a < 4; a++) {
        var an = PI / 4 + a * PI / 2;
        K.dark.push(box(0.26, 0.015, 0.22, x - len * 0.40, y + Math.cos(an) * 0.17, zc + Math.sin(an) * 0.17, an, 0, 0));
      }
      fins(K.pale, x + 0.25, y, zc, 0.50, 0.30, 0.15, 0.13, PI / 4, 0.006);
    } else {                           /* R-73: 2.9 m, 0.17 m, canards and tail fins */
      len = 2.9; r = 0.085; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_R73, len, r, x, y, zc, 12));
      fins(K.pale, x + len * 0.30, y, zc, 0.18, 0.08, 0.06, 0.19, PI / 4, 0.006);
      fins(K.pale, x - len * 0.38, y, zc, 0.30, 0.16, 0.10, 0.27, PI / 4, 0.006);
    }
  }

  /* the AL-41F1S nozzle (H): the bare afterburner can, a shroud ring, a
     long petal cone with dark seams, the pale lining inside and a dark bore */
  function nozzle(K, y, h) {
    var s0 = 19.15, s1 = 19.45, s2 = 20.45;
    /* the bare-metal afterburner section aft of the tailplane root (H) */
    push(K.nozzle, loft([sec(X(18.55), y, h - 0.06, 0.612, 0.612, 0.612), sec(X(s0), y, h, 0.585, 0.585, 0.585)], 20, null, null));
    push(K.metal, loft([sec(X(s0), y, h, 0.575, 0.575, 0.575), sec(X(s1), y, h, 0.565, 0.565, 0.565)], 20, null, null));
    push(K.nozzle, loft([sec(X(s1), y, h, 0.565, 0.565, 0.565), sec(X(s1 + 0.02), y, h, 0.545, 0.545, 0.545), sec(X(s2), y, h, 0.475, 0.475, 0.475)], 20, null, null));
    /* the lining faces inward: sections in increasing x */
    push(K.pale, loft([sec(X(s2), y, h, 0.465, 0.465, 0.465), sec(X(s2 - 0.55), y, h, 0.40, 0.40, 0.40)], 20, null, null));
    K.dark.push(capOf(sec(X(s2 - 0.55), y, h, 0.40, 0.40, 0.40), 20, 0, false));
    for (var i = 0; i < 16; i++) {
      var a = (i + 0.5) * 2 * PI / 16;
      K.dark.push(bar([X(s1 + 0.04), y + Math.cos(a) * 0.548, h + Math.sin(a) * 0.548],
                      [X(s2 - 0.02), y + Math.cos(a) * 0.478, h + Math.sin(a) * 0.478], 0.010, 3));
    }
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "su35";
    var K = { skin: [], radome: [], dark: [], metal: [], glass: [], team: [], pale: [], nozzle: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, y, r;

    /* ---- radome (grey) and body, then the sting */
    var rs = [], bs = [];
    for (i = 0; i < BODY.length; i++) {
      r = BODY[i];
      var sc = sec(X(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, r[4], r[5]);
      if (i < RADOME_N) rs.push(sc);
      if (i >= RADOME_N - 1) bs.push(sc);
    }
    push(K.radome, loft(rs, 40, 0, null));
    var st = [];
    for (i = 0; i < STING.length; i++) {
      r = STING[i];
      st.push(sec(X(r[0]), 0, (r[2] + r[3]) / 2, r[1], (r[2] - r[3]) / 2, (r[2] - r[3]) / 2, i ? 1 : 0.95, i ? 1 : 0.9));
    }
    push(K.skin, loft(bs, 40, null, null));
    push(K.skin, loft(st, 32, null, 0));
    /* sting tip: a dark dielectric cap (G) */
    K.dark.push(box(0.05, 0.05, 0.05, X(21.88), 0, 0.565));

    /* ---- canopy on its sill, frames, the aft fairing and the spine */
    var cs = [];
    for (i = 0; i < CANOPY.length; i++) {
      r = CANOPY[i];
      cs.push(sec(X(r[0]), 0, 1.70, r[1], r[2] - 1.70, 0.12, 1.0, 1.0));
    }
    push(K.glass, loft(cs, 28, 0.04, 0.0));
    push(K.skin, loft([sec(X(7.35), 0, 1.80, 0.43, 0.48, 0.10, 0.9), sec(X(7.9), 0, 1.80, 0.44, 0.38, 0.10, 0.85),
                       sec(X(8.8), 0, 1.80, 0.46, 0.28, 0.10, 0.8), sec(X(9.8), 0, 1.78, 0.47, 0.18, 0.10, 0.8)], 24, null, 0));
    function arch(sv, rad) {
      var rr = ringOf(sv, 28);
      for (var j = 0; j <= 14; j++) {
        var a = rr[j], b = rr[(j + 1) % 28];
        if (j < 14) K.dark.push(bar(a, b, rad, 4));
      }
    }
    arch(sec(X(5.0), 0, 1.70, 0.495, 2.40 - 1.70 + 0.012, 0.12), 0.026);   /* windscreen arch */
    arch(sec(X(7.30), 0, 1.70, 0.44, 2.37 - 1.70 + 0.012, 0.12), 0.030);    /* canopy rear frame */
    /* IRST ball ahead of the windscreen, offset to starboard (B, F) */
    K.glass.push(new V.SphereGeometry(0.16, 14, 8).translate(X(3.95), -0.20, 1.80));
    push(K.dark, loft([sec(X(3.70), -0.20, 1.72, 0.08, 0.06, 0.04), sec(X(3.85), -0.20, 1.74, 0.19, 0.08, 0.06),
                       sec(X(4.20), -0.20, 1.74, 0.19, 0.08, 0.06), sec(X(4.30), -0.20, 1.76, 0.10, 0.05, 0.05)], 12, 0, 0));
    /* gun port on the starboard LERX root (GSh-30-1) */
    K.dark.push(box(0.30, 0.10, 0.08, X(7.35), -1.00, 0.97));
    /* small blade aerials on the spine and under the nose */
    K.dark.push(box(0.30, 0.02, 0.18, X(10.2), 0, 2.02, 0, 0, 0));
    K.dark.push(box(0.26, 0.02, 0.15, X(5.2), 0, 0.08, 0, 0, 0));

    /* ---- nacelles: raked intake mouth, dark duct face, splitter, nozzle */
    for (s = -1; s <= 1; s += 2) {
      var ns = [];
      for (i = 0; i < NAC.length; i++) {
        r = NAC[i];
        ns.push(sec(X(r[0]), s * r[1], r[2], r[3], r[4], r[5], r[6], r[6], i ? 0 : RAKE));
      }
      push(K.skin, loft(ns, 28, null, null));
      /* the duct face, set 0.14 m into the mouth, and a dark liner facing inward from the lip to it */
      var m0 = NAC[0];
      push(K.dark, loft([sec(X(m0[0] + 0.15), s * m0[1], m0[2], m0[3] - 0.01, m0[4] - 0.01, m0[5] - 0.01, m0[6], m0[6], RAKE),
                         sec(X(m0[0]) + 0.005, s * m0[1], m0[2], m0[3] - 0.01, m0[4] - 0.01, m0[5] - 0.01, m0[6], m0[6], RAKE)], 28, null, null));
      K.dark.push(capOf(sec(X(m0[0] + 0.14), s * m0[1], m0[2], m0[3] - 0.03, m0[4] - 0.03, m0[5] - 0.03, m0[6], m0[6], RAKE), 28, 0, true));
      /* the boundary-layer splitter between the mouth and the LERX */
      K.skin.push(box(1.8, 0.10, 0.36, X(9.75), s * 0.97, 0.66));
      /* the lip: a thin dark line round the mouth */
      var lip = ringOf(sec(X(m0[0]) + 0.01, s * m0[1], m0[2], m0[3] + 0.005, m0[4] + 0.005, m0[5] + 0.005, m0[6], m0[6], RAKE), 28);
      for (i = 0; i < 28; i += 2) K.dark.push(bar(lip[i], lip[(i + 2) % 28], 0.018, 3));
      nozzle(K, s * 0.97, 0.42);
    }

    /* ---- tail beams */
    for (s = -1; s <= 1; s += 2) {
      var be = [];
      for (i = 0; i < BEAM.length; i++) { r = BEAM[i]; be.push(sec(X(r[0]), s * r[1], r[2], r[3], r[4], r[4], 0.7, 0.8)); }
      push(K.skin, loft(be, 16, 0.7, 0));
    }

    /* ---- wing and LERX: one loft of aerofoil sections, root to tip */
    for (s = -1; s <= 1; s += 2) {
      var ws = [];
      for (i = 0; i < WST.length; i++) {
        y = WST[i];
        ws.push(foil([X(wLE(y)), s * y, wH(y)], [X(wTE(y)), s * y, wH(y)], wT(y), [0, 0, 1]));
      }
      K.skin.push(sloft(ws));
      /* leading-edge flap and flaperon gaps: thin dark lines on the upper skin */
      var yA = 2.3, yB = 6.85;
      K.dark.push(bar([X(wLE(yA) + 0.35), s * yA, wH(yA) + wT(yA) * 0.33], [X(wLE(yB) + 0.30), s * yB, wH(yB) + wT(yB) * 0.36], 0.012, 3));
      /* wingtip ECM pod (B, D, E): its outer face sets the 15.3 m span */
      var tz = wH(TIPY);
      push(K.skin, revolve(P_POD, 3.9, 0.19, X(15.85), s * 7.44, tz, 16));
      K.dark.push(box(0.12, 0.06, 0.05, X(17.82), s * 7.44, tz));
      K.skin.push(box(2.3, 0.44, 0.06, X(16.2), s * 7.22, tz));
      /* the team strip: a thin plate lying ON the upper skin of the outer wing */
      var ya = 5.55, yb = 6.25;
      function plate(yy) {
        var le = wLE(yy), te = wTE(yy), zc = wH(yy) + wT(yy) * 0.47 + 0.02;
        return blk([X(le), s * yy, zc], [X(te), s * yy, zc], 0.30, 0.62, 0.02, [0, 0, 1]);
      }
      K.team.push(sloft([plate(ya), plate(yb)]));
    }

    /* ---- tailplanes: low, all-moving, on the beams (A plan) */
    for (s = -1; s <= 1; s += 2) {
      var tp = [[2.14, 17.0, 20.7, 0.17], [4.28, 18.75, 20.95, 0.10], [5.40, 19.6, 19.78, 0.05]];
      var tps = [];
      for (i = 0; i < tp.length; i++) tps.push(foil([X(tp[i][1]), s * tp[i][0], 0.48 - (tp[i][0] - 2.14) * 0.02], [X(tp[i][2]), s * tp[i][0], 0.48 - (tp[i][0] - 2.14) * 0.02], tp[i][3], [0, 0, 1]));
      K.skin.push(sloft(tps));
      K.metal.push(cyl(0.09, 0.09, 0.22, 10, "y", X(18.9), s * 2.20, 0.48));
    }

    /* ---- fins on the beams, dark tip caps; ventral fins under the beams */
    for (s = -1; s <= 1; s += 2) {
      function finSec(h, f1) {
        var fr = (h - FIN_R) / (FIN_T - FIN_R);
        var le = 15.2 + fr * 2.4, te = 18.5, th = 0.19 - fr * 0.11;
        if (h > 4.12) te = Math.max(le + 0.08, 18.5 - (h - 4.12) / (FIN_T - 4.12) * 0.9);
        return foil([X(le), s * FIN_Y, h], [X(le + (te - le) * (f1 || 1)), s * FIN_Y, h], th, [0, 1, 0]);
      }
      K.skin.push(sloft([finSec(FIN_R), finSec(2.2), finSec(3.4), finSec(4.12)]));
      K.dark.push(sloft([finSec(4.12), finSec(4.30), finSec(FIN_T)]));
      /* rudder hinge line */
      K.dark.push(bar([X(17.4), s * (FIN_Y + 0.05), 1.3], [X(17.95), s * (FIN_Y + 0.035), 3.7], 0.012, 3));
      /* the small fillet ahead of the fin root */
      K.skin.push(sloft([foil([X(14.7), s * FIN_Y, 0.95], [X(15.6), s * FIN_Y, 0.95], 0.16, [0, 1, 0]),
                         foil([X(15.05), s * FIN_Y, 1.30], [X(15.6), s * FIN_Y, 1.30], 0.12, [0, 1, 0])]));
      /* ventral fin, canted out 10 degrees */
      var vy0 = s * 1.98, ca = 0.17 * s;
      function vSec(h, le, te, th) {
        return foil([X(le), vy0 + ca * (0.30 - h), h], [X(te), vy0 + ca * (0.30 - h), h], th, [0, 1, 0]);
      }
      K.skin.push(sloft([vSec(0.32, 16.1, 17.75, 0.10), vSec(-0.20, 16.6, 17.65, 0.07), vSec(-0.64, 16.95, 17.55, 0.05)]));
    }

    /* ---- stores: R-77-1 on the mid-wing pylons, R-73 outboard */
    for (s = -1; s <= 1; s += 2) {
      var y1 = 4.4, y2 = 6.0, z1 = wH(y1) - wT(y1) * 0.45, z2 = wH(y2) - wT(y2) * 0.45;
      pylon(K.skin, X(13.3), X(15.8), s * y1, z1 + 0.02, z1 - 0.28, 0.10);
      store(K, "r77", X(14.75), s * y1, z1 - 0.28);
      pylon(K.skin, X(14.5), X(16.5), s * y2, z2 + 0.02, z2 - 0.22, 0.09);
      store(K, "r73", X(15.6), s * y2, z2 - 0.22);
    }

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzles");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");

    /* ---- landing gear (I, D): it retracts, so the group is "gear";
       the tyres are the lowest opaque part. Nose leg s 8.12, mains s 14.0 */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nxs = X(8.12), nr = 0.34, nz = GROUND + nr;
    G.metal.push(bar([nxs + 0.08, 0, 0.45], [nxs, 0, nz + 0.10], 0.065, 10));
    G.metal.push(bar([nxs, -0.20, nz], [nxs, 0.20, nz], 0.04, 6));
    for (s = -1; s <= 1; s += 2) {
      G.tyre.push(cyl(nr, nr, 0.24, 24, "y", nxs, s * 0.21, nz));
      G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.25, 12, "y", nxs, s * 0.21, nz));
    }
    G.dark.push(box(0.78, 0.62, 0.03, nxs + 0.04, 0, nz + nr + 0.06));                  /* mudguard */
    G.metal.push(bar([nxs - 1.0, 0, 0.50], [nxs + 0.02, 0, -0.55], 0.035, 6));           /* drag brace */
    G.dark.push(box(1.6, 0.03, 0.40, nxs - 0.6, 0.28, 0.20));                            /* bay doors */
    G.dark.push(box(1.6, 0.03, 0.40, nxs - 0.6, -0.28, 0.20));
    var mxs = X(14.0), mr = 0.515, mz = GROUND + mr, my = 2.17;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mxs + 0.15, s * 1.70, 0.82], [mxs, s * (my - 0.22), mz + 0.12], 0.085, 10));
      G.metal.push(cyl(0.06, 0.06, 0.30, 8, "y", mxs, s * (my - 0.10), mz));
      G.tyre.push(cyl(mr, mr, 0.35, 28, "y", mxs, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.36, 14, "y", mxs, s * my, mz));
      G.metal.push(bar([mxs - 0.9, s * 1.70, 0.80], [mxs - 0.02, s * (my - 0.22), mz + 0.45], 0.04, 6));
      G.dark.push(box(1.3, 0.03, 0.55, mxs + 0.25, s * 1.60, 0.02));                     /* leg door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured x extent: radome tip (10.95) to the sting end (-10.95) */
UNIT_MODELS["pact_e00_fighter"] = { len: 21.9, build: HeroSu35.build };
