/* ============ gb_hunter.js - HERO model: Hawker Hunter F.6 ======================
   One row:
     gbr_e50_fighter  "Hunter F.6"   single-seat day fighter, four 30 mm Aden   1956
   There was no Hunter model before this file (grep -i hunter js/hero: only
   the Mi-28N "Night Hunter"), and gbr_e50_fighter has no row in air_specs.js;
   the row was drawn as its same-role peer fighter_n (the F-16C). Nothing
   here is built on that. The kit is gb_lightning.js's (itself ru_su24.js's);
   the layout of the file follows nato_e50_fighter.js and gb_lightning.js.

   References (Wikimedia Commons / Wikipedia, fetched for this file):
     A "Hawker Hunter 3-view line drawing.svg" (rendered 1800 x 1391 px):
       side view, plan (from above, nose left, port wing below) and front
       view (drawn on its side, fin to the right). Every station below is
       read off A in drawing pixels and converted by px(), pz(), py():
         x = (697 - px) / 96.57     nose tip px 22 -> +6.99, tailplane tips
                                    px 1372 -> -6.99: 1350 px = the
                                    published 13.98 m
         y = (row - 886.5) / 95.03  plan centreline row 886.5; wing tips at
                                    +-487.5 px = the published 10.26 m span
         z = (265 - row) / 96.57    side view, row 265 = the fuselage axis
       A's own aspect is 1.6 % longer than wide at that (length 14.21 m at
       the span scale), so x and y take separate scales. Read off A: the
       nose and the fuselage sections (side top / bottom, plan half-widths),
       the canopy, the wing-root intake fairings (plan, side, front), the
       wing planform (leading edge 44 deg, trailing edge 25 deg: 35.5 deg at
       mid-chord; root chord 4.45 m, tip 1.92 m, area 32.7 m2 against the
       published 32.4), the root trailing-edge fillet, the anhedral and the
       8.5 % thickness (front view), the Sabrina blisters, the gun troughs,
       the ventral airbrake, the fin and dorsal fillet, the tailplane part
       way up the fin and its bullet fairing, the single jet pipe, the pitot
       boom off the port wing tip, the main track (front view, +-2.19 m) and
       the wheel places and sizes (side view: nose 0.44 m at x 4.98, mains
       0.70 m at x 0.45) and the ground line (row 433).
     B "Hawker Hunter F.6 XG131 41.229 OCU CHIV 23.08.69.jpg": an RAF F.6 in
       Dark Green / Dark Sea Grey disruptive camouflage over silver, tanks
       under the wings, the Sabrinas, the long main legs with their leg
       doors, the nose leg, the tailplane bullet, the root intakes.
     C "Hawker Hunter F.6 XG189 92 Sqn SCUL 19.05.62 edited-3.jpg": near
       profile (starboard); one tank on the inboard pylon, the stance (its
       Blue Diamonds display blue is NOT the paint used).
     D "Hawker Hunter F6 gun ports (4604290964).jpg": the two long gun
       troughs on each lower nose flank, the LOWER one further AFT; the nose
       leg and its side door; the camouflage coming down to about mid-flank
       over light undersides.
     E "Hawker Hunter F6, UK - Air Force AN2253953.jpg" (XE509): the drop
       tank on the inboard pylon, nose well ahead of the leading edge, small
       fins at its tail, the main wheel under its front third; the wing-root
       intake; the nose leg.
     F "Hawker Hunter F6 (cn 41H-680000) ... ID 009200.jpg" (Speyer, banked
       on a pole): the upper starboard wing with the F.6 dog-tooth step in
       the leading edge, and the anhedral.
     G "Hawker Hunter F6A XG160 U (G-BWAF) (6888691841).jpg": profile, the
       tank inboard, the stance.
     K "Gatow Hawker Hunter (2009).jpg" (XG152, F.6A, port side): the tail
       and the nose-wheel station for the fin and stance ratios; the Dark
       Green / Dark Sea Grey over light grey scheme.
     H en.wikipedia "Hawker Hunter": length 45 ft 10.5 in (13.98 m), span
       33 ft 8 in (10.26 m), height 13 ft 2 in (4.01 m), wing area 349 sq ft,
       Hawker 8.5 % symmetrical aerofoil; "triangular air intakes in the
       wing roots", "a single jetpipe", "leading edge sweep of 35 deg and
       slight anhedral"; the Sabrinas (link collectors under the cockpit,
       from the F.4); the F.6's dog-tooth leading-edge extension (Mod 533)
       and four wet hardpoints; 2 x 100 gal drop tanks; four 30 mm ADEN in
       a removable pack; the single ventral airbrake.

   Recognition list (each in the model, with the reference it rests on):
     1. the long, pointed, gently drooped nose with no intake in it (A, B)
     2. triangular wing-root intakes in bulged fairings on the fuselage
        sides, tall at the fuselage, tapering to a point on the wing (A, E, H)
     3. 35 deg (mid-chord) swept mid wing, 4 deg anhedral, streamwise tips
        (A, F, H), with the F.6 dog-tooth step (F, H)
     4. the swept fin with its long curving dorsal fillet and the tailplane
        set part way up it, crossed by a bullet fairing (A, B, C)
     5. the bubble canopy behind a framed windscreen, faired into the
        spine (A, B, D)
     6. the four Aden muzzles: two long gun troughs a side on the lower nose
        (A, D); the gun pack's outline in the paint (A)
     7. the two Sabrina blisters under the cockpit (A, B, H)
     8. the single Avon jet pipe, under the fin (A, B, H)
     9. the ventral airbrake under the rear fuselage, closed (A, H)
    10. tall tricycle gear: single nose wheel well forward, the mains on long
        legs at a wide 4.4 m track, leg doors (A, B, D, E)  [gear]
    11. 100 gal drop tanks with small tail fins on the inboard pylons (E, C,
        G, H)
    12. the pitot boom forward of the port wing tip (A)
    13. paint: Dark Green / Dark Sea Grey disruptive upper surfaces and
        upper flanks, silver undersides (B, D). No roundels, fin flashes,
        codes or squadron marks.
   Team colour exactly C.team, on two small strips on the upper outer wings.

   NOT CONFIRMED (estimated from proportions or from photographs, not
   measured or published):
     - THE FIN HEIGHT, settled from photographs, not fitted to a figure.
       A's fin tip stands 4.34 m above A's own ground line; H says 4.01 m.
       No photograph used is truly side-on (all are taken from near the nose,
       so nose-to-tail length ratios come out 20-30 % short and were not
       used). Instead two scale-free ratios were measured where both ends
       lie at the same station, so neither yaw nor distance enters:
       (a) at the TAIL, fin-top height above the jet pipe's top / the jet
           pipe's outside diameter:
             C 2.98   G 3.08   K 3.02   (mean 3.03)
             A as drawn 3.35 (+11 %); A with the fin cut to fit 4.01 m 2.84
             (-6 %); the photographs want the fin above the spine (z 0.725)
             scaled by 0.871 / 0.906 / 0.886, mean 0.889.
       (b) at the NOSE WHEEL, belly-to-ground / fuselage depth (sill to
           belly):  C 1.03 (in service, 1962)   G 0.94   K 0.76 (museum,
           nose oleo visibly short); A 1.02. Nose-wheel diameter / depth:
           A 0.38, G 0.38, K 0.38, C 0.46.
       So the in-service stance agrees with A and the fin is the part A
       overdraws. Only the fin, dorsal fillet and tailplane height above
       the spine are changed, by the measured 0.889 (tailplane z 0.98, A
       1.02); A's gear and ground are kept. The model stands 4.12 m against
       the published 4.01 m (+3 %): the remainder is within the spread of
       the stance measurements (G sits 0.09 m lower than A) and of where the
       published figure is taken to.
     - the dog-tooth: A does not draw it (A is the earlier wing). Its place
       (y 2.60, about 40 % of the exposed semi-span) is judged from the
       foreshortened photograph F, and the extension (0.15 m of chord
       forward of A's leading edge, carried out to the tip) from the size
       of the step in F.
     - the 4 deg anhedral is A's front view (wing mid-thickness falls 22.5
       px over 320 px); H says only "slight".
     - the wing-root intake mouths' exact outline (A's side and front views
       disagree on their height; the front view's hatched mouth is used).
     - the gun troughs' fore-and-aft stagger is D's (A draws the lower one
       forward); their length (0.75 m) is A's.
     - the Sabrinas' half-breadth (front view of A only).
     - the drop tank: span station y 2.35 (inboard pylon, from E and C
       relative to the main wheel), length 2.9 m and diameter 0.55 m scaled
       off E; pylon shape. The outboard pylons A draws in its side view are
       not drawn: no photograph used shows them on a one-tank fit.
     - the main legs' attachment and the leg doors' size (B, E); the leg
       stands inboard of the tank with the wheel outboard of it.
     - which wing carries the pitot: A puts it on the port tip; not
       checked against a photograph.
     - the camouflage pattern itself (generic disruptive blobs, not an RAF
       pattern drawing) and the demarcation height (z -0.12).
   Not drawn: the gun camera port, the ranging radar window, aerials, the
   brake parachute fairing, flap and aileron gaps (only painted lines), the
   outboard pylons and 230 gal tanks of later fits.

   Materials: skin (painted canvas, projected top / port / starboard /
   belly), dark, metal, glass, team, and in "gear": metal, tyres, doors.
   Nodes: "gear" (the landing gear and its doors; hidden in flight).
   Model space: +X nose, +Y port, +Z up, metres; z = 0 is A's fuselage axis
   (side view row 265), tyres at z = -1.74 (A's ground line, row 433); the
   fin tip at 2.38 stands 4.12 m (published 4.01). x = 0 is midway between the
   nose tip (6.99) and the tailplane tips (-7.03).
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHunter = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;

  /* ---- drawing A -> model space (see the header) */
  var SX = 96.57, SY = 95.03, PX0 = 697, ROW0 = 265, YC = 886.5;
  function px(p) { return (PX0 - p) / SX; }
  function pz(r) { return (ROW0 - r) / SX; }
  function py(hw) { return hw / SY; }

  var GROUND = pz(433);                 /* -1.740, A's ground line */
  var SPINE = 0.725;                    /* A row 195, the spine ahead of the fin */
  /* the fin, dorsal fillet and tailplane height above the spine are scaled
     by the factor MEASURED off photographs C, G and K (scale-free ratios at
     the tail, see the header): 0.889. Not fitted to the published height. */
  var FK = 0.889;
  function fz(r) { return SPINE + (pz(r) - SPINE) * FK; }
  var FIN_TOP = fz(14);                 /* 2.391 at A row 14; the drawn tip rib (row 15) stands 4.12 m */

  /* ---- canvas layout for the projected skin */
  var PXM = 40, XMIN = -7.3, TW = 592;
  var PYM = 28, YMAX = 5.5;
  var TOPH = 308, SIDEH = 176, TH = TOPH + 2 * SIDEH + TOPH;
  var ZTOP = 2.45, ZSPAN = 4.4;
  var Z_DEM = -0.12;                    /* camouflage / silver demarcation (B, D) */

  /* Dark Green, Dark Sea Grey and High Speed Silver as B and D show them,
     taken down a little for the renderer's ACES lift */
  var PAL = { green: "#46502f", grey: "#565e63", silver: "#a3a8aa" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 2, TW - 2); }
  function pxY(y) { return (YMAX - y) * PYM; }

  /* ------------------------------------------------------------ planform --
     Wing (A plan, port wing). Leading edge from x 3.90 on the centreline
     (extrapolated) at 44 deg; trailing edge from -0.557 at 25 deg; tip
     streamwise at y 5.13 with its leading-edge corner rounded back 0.25 m.
     The root trailing-edge fillet runs out to -1.48 at the fuselage side.
     F.6 dog-tooth: outboard of y 2.60 the leading edge stands 0.15 m
     further forward (F; NOT CONFIRMED). */
  var WROOT = 0.45, WTIP = 5.13, DT = 2.60, EXT = 0.15;
  function le0(y) { return 3.90 - 0.9615 * y; }
  function wLE(y) { return y < DT ? le0(y) : le0(y) + EXT; }
  function wTE(y) { return -0.557 - 0.4658 * y; }
  function wZ(y)  { return 0.10 - 0.0699 * (y - 0.60); }          /* 4 deg anhedral */
  function wT(y)  { return (wLE(y) - wTE(y)) * (0.085 - 0.015 * (y - 0.6) / 4.53); }

  /* tailplane (A plan): leading edge 48 deg from -4.14 on the centreline,
     trailing edge 25 deg from -6.25; tip at y 1.68, its trailing corner the
     aft-most point of the aeroplane (-7.03). Flat, at the scaled height. */
  var TZ = fz(167), TTIP = 1.68;
  function tLE(y) { return -4.138 - 1.1267 * y; }
  function tTE(y) { return -6.245 - 0.4674 * y; }

  /* ---- station tables, nose to tail, from A in drawing pixels
     [px, side top row, side bottom row, plan half-width px] */
  var FUS = [
    [24, 262, 268, 3], [30, 255, 278, 8], [40, 250, 285, 13.5], [60, 241, 293, 22],
    [80, 233, 299, 29], [100, 227, 304, 35.5], [125, 221, 310, 40], [150, 216, 314, 44],
    [175, 213, 317, 47.5], [200, 211, 320, 50.5], [250, 210, 325, 54.5], [300, 210, 328, 57.5],
    [350, 207, 330, 60], [400, 200, 332, 62], [450, 196, 333, 62], [550, 195, 334, 62],
    [650, 195, 334, 62], [750, 195, 334, 63], [850, 195, 334, 63.5], [950, 195, 326, 63],
    [1000, 195, 322, 61.5], [1050, 196, 318, 60], [1100, 197, 312, 56.5], [1150, 203, 307, 54.5],
    [1200, 214, 302, 48], [1250, 221, 294, 40], [1290, 224, 289, 35], [1330, 225, 288, 33]];
  /* canopy: [px, top row, half-width px]; it closes on the sill at row 211 */
  var SILL = pz(211);
  var CANOPY = [[165, 213, 4], [185, 203, 14], [205, 192, 24], [225, 181, 31], [245, 172, 36],
                [275, 170, 38], [305, 170, 38], [330, 174, 37], [350, 180, 34]];
  var FAIRING = [[345, 181, 34], [370, 186, 27], [400, 191, 17], [432, 196, 5]];
  /* fin (A side): [row, leading edge px, trailing edge px, thickness m];
     the dorsal fillet's curve is the leading edge from row 205 to 118 */
  var FIN = [[205, 930, 1278, 0.10], [194, 952, 1281, 0.11], [182, 985, 1283, 0.12],
             [170, 1020, 1286, 0.12], [155, 1058, 1291, 0.12], [140, 1083, 1295, 0.115],
             [118, 1110, 1303, 0.105], [70, 1194, 1318, 0.085], [30, 1264, 1330, 0.065],
             [15, 1292, 1330, 0.05]];

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var P = PAL;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), s = 51956, i, b, x, sg;
    function R() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var bandY = [0, TOPH, TOPH + SIDEH, TOPH + 2 * SIDEH];
    function sideZ(z, band) { return bandY[band] + clamp((ZTOP - z) / ZSPAN * SIDEH, 0, SIDEH); }

    /* a soft-edged blob for the disruptive pattern */
    function blob(cx, cy, rx, ry) {
      var n = 12, pts = [], k;
      for (k = 0; k < n; k++) {
        var a = 2 * PI * k / n, f = 0.70 + 0.45 * R();
        pts.push([cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f]);
      }
      g.beginPath();
      g.moveTo((pts[0][0] + pts[n - 1][0]) / 2, (pts[0][1] + pts[n - 1][1]) / 2);
      for (k = 0; k < n; k++) {
        var q = pts[(k + 1) % n];
        g.quadraticCurveTo(pts[k][0], pts[k][1], (pts[k][0] + q[0]) / 2, (pts[k][1] + q[1]) / 2);
      }
      g.closePath(); g.fill();
    }

    /* ---- upper surfaces: Dark Sea Grey with Dark Green patches (B) */
    g.fillStyle = P.grey; g.fillRect(0, 0, TW, TOPH);
    g.fillStyle = P.green;
    for (i = 0; i < 16; i++)
      blob(pxX(-7 + i * 0.95 + R() * 0.4), (0.15 + 0.7 * R()) * TOPH, (0.9 + R() * 0.8) * PXM, (1.0 + R() * 1.4) * PYM);
    /* ---- flanks: the same above the demarcation, silver below (B, D) */
    for (b = 1; b <= 2; b++) {
      var zd = sideZ(Z_DEM, b);
      g.fillStyle = P.grey; g.fillRect(0, bandY[b], TW, zd - bandY[b]);
      g.fillStyle = P.green;
      for (i = 0; i < 12; i++) {
        var cyy = bandY[b] + (0.15 + R() * 0.40) * SIDEH;
        blob(pxX(-7 + i * 1.25 + R() * 0.5), Math.min(cyy, zd - 6), (0.8 + R() * 0.6) * PXM, (0.10 + R() * 0.10) * SIDEH);
      }
      g.fillStyle = P.silver; g.fillRect(0, zd, TW, bandY[b] + SIDEH - zd);
      g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, zd, TW, 2);
    }
    g.fillStyle = P.silver; g.fillRect(0, bandY[3], TW, TOPH);

    /* ---- fuselage frames (A) */
    g.strokeStyle = "rgba(0,0,0,0.18)"; g.lineWidth = 1;
    var FR = [100, 228, 400, 450, 580, 845, 1000, 1210, 1240];
    for (b = 1; b <= 2; b++) for (i = 0; i < FR.length; i++) {
      x = pxX(px(FR[i]));
      g.beginPath(); g.moveTo(x, sideZ(0.75, b)); g.lineTo(x, sideZ(-0.72, b)); g.stroke();
    }
    /* ---- the gun pack's outline under the cockpit (A: px 228-400) and
       the ventral airbrake (A: px 930-1055), on the flanks and the belly */
    g.strokeStyle = "rgba(0,0,0,0.30)";
    for (b = 1; b <= 2; b++) {
      g.strokeRect(pxX(px(228)), sideZ(pz(302), b), (px(228) - px(400)) * PXM, (pz(302) - pz(330)) / ZSPAN * SIDEH);
    }
    g.strokeRect(pxX(px(228)), bandY[3] + pxY(0.45), (px(228) - px(400)) * PXM, 0.9 * PYM);
    g.strokeRect(pxX(px(1055)), bandY[3] + pxY(0.30), (px(930) - px(1055)) * PXM, 0.6 * PYM);
    /* ---- flap and aileron hinges (A plan), top and belly, both wings */
    g.strokeStyle = "rgba(0,0,0,0.24)";
    for (b = 0; b <= 3; b += 3) for (sg = -1; sg <= 1; sg += 2) {
      var Yb = function (yy) { return bandY[b] + clamp(pxY(sg * yy), 2, TOPH - 2); };
      g.beginPath(); g.moveTo(pxX(wTE(1.0) + 0.55), Yb(1.0)); g.lineTo(pxX(wTE(3.0) + 0.50), Yb(3.0)); g.stroke();
      g.beginPath(); g.moveTo(pxX(wTE(3.1) + 0.45), Yb(3.1)); g.lineTo(pxX(wTE(5.0) + 0.38), Yb(5.0)); g.stroke();
      g.beginPath(); g.moveTo(pxX(wTE(3.05) + 0.50), Yb(3.05)); g.lineTo(pxX(wTE(3.05)), Yb(3.05)); g.stroke();
      /* the main spar line A draws across each wing */
      g.beginPath(); g.moveTo(pxX(le0(1.5) - 1.30), Yb(1.5)); g.lineTo(pxX(le0(5.0) - 0.70), Yb(5.0)); g.stroke();
      /* elevator hinge */
      g.beginPath(); g.moveTo(pxX(tTE(0.2) + 0.40), Yb(0.2)); g.lineTo(pxX(tTE(1.6) + 0.30), Yb(1.6)); g.stroke();
    }
    /* ---- rudder hinge (A) */
    g.strokeStyle = "rgba(0,0,0,0.26)";
    for (b = 1; b <= 2; b++) {
      g.beginPath(); g.moveTo(pxX(px(1262)), sideZ(fz(150), b)); g.lineTo(pxX(px(1300)), sideZ(fz(28), b)); g.stroke();
    }
    /* ---- access panels on the flanks */
    g.strokeStyle = "rgba(0,0,0,0.13)";
    for (b = 1; b <= 2; b++) for (i = 0; i < 16; i++) {
      x = pxX(5.5 - i * 0.75 + R() * 0.3);
      g.strokeRect(x, sideZ(0.55 - R() * 1.0, b), 0.30 * PXM + R() * 8, 0.20 * SIDEH / ZSPAN + R() * 3);
    }
    /* ---- gun gas staining aft of the troughs (D) and soot at the tail */
    for (b = 1; b <= 2; b++) {
      var gg = g.createLinearGradient(pxX(4.6), 0, pxX(3.2), 0);
      gg.addColorStop(0, "rgba(28,24,20,0.35)"); gg.addColorStop(1, "rgba(28,24,20,0)");
      g.fillStyle = gg; g.fillRect(pxX(4.6), sideZ(-0.25, b), pxX(3.2) - pxX(4.6), 0.35 / ZSPAN * SIDEH);
    }
    var sx = pxX(-6.9), gr = g.createLinearGradient(sx, 0, pxX(-5.6), 0);
    gr.addColorStop(0, "rgba(22,18,14,0.45)"); gr.addColorStop(1, "rgba(22,18,14,0)");
    g.fillStyle = gr; g.fillRect(sx, TOPH, pxX(-5.6) - sx, TH - TOPH);
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.72, metalness: 0.15 });
    if (tex) m.skin.map = tex; else m.skin.color.set(PAL.grey);
    m.dark  = new V.MeshStandardMaterial({ color: 0x151719, roughness: 0.72, metalness: 0.28 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6f72, roughness: 0.46, metalness: 0.62 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.glass = new V.MeshStandardMaterial({ color: 0x34505a, roughness: 0.10, metalness: 0.30 });
    m.door  = new V.MeshStandardMaterial({ color: 0x9a9fa1, roughness: 0.55, metalness: 0.35 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (gb_lightning.js's, from ru_su24.js) */
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

  function wSec(y, s, le) {
    var L = le === undefined ? wLE(y) : le;
    return foil([L, s * y, wZ(y)], [wTE(y), s * y, wZ(y)], wT(y), [0, 0, 1]);
  }
  function tSec(y, s, le, te, t) {
    return foil([le, s * y, TZ], [te, s * y, TZ], t, [0, 0, 1]);
  }

  /* 100 gal drop tank (E): round nose, long taper aft, small tail fins */
  var P_TANK = [[0.50, 0.05], [0.47, 0.55], [0.40, 0.88], [0.28, 1.0], [0.0, 1.0],
                [-0.25, 0.86], [-0.42, 0.52], [-0.50, 0.12]];

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "hunter";
    var K = { skin: [], dark: [], metal: [], glass: [], team: [] };
    var G = { metal: [], tyre: [], door: [] };
    var s, i;

    /* ---- fuselage (A side and plan) */
    var body = [];
    for (i = 0; i < FUS.length; i++) {
      var r = FUS[i], top = pz(r[1]), bot = pz(r[2]);
      body.push(ls(px(r[0]), 0, (top + bot) / 2, py(r[3]), (top - bot) / 2, 0.95));
    }
    push(K.skin, loft(body, 40, 0.03, null));

    /* ---- canopy and the fairing behind it (A) */
    var cs = [], fs = [];
    for (i = 0; i < CANOPY.length; i++)
      cs.push(ls(px(CANOPY[i][0]), 0, SILL, py(CANOPY[i][2]), Math.max(0.01, pz(CANOPY[i][1]) - SILL), 1));
    for (i = 0; i < FAIRING.length; i++)
      fs.push(ls(px(FAIRING[i][0]), 0, SILL, py(FAIRING[i][2]), pz(FAIRING[i][1]) - SILL, 0.95));
    push(K.glass, loft(cs, 28, 0.01, null));
    push(K.skin, loft(fs, 24, null, 0.02));
    /* windscreen arch, the hood's rear frame, windscreen side posts (A, D) */
    arch(K.dark, cs, px(240), SILL, 0.026);
    arch(K.dark, cs, px(346), SILL, 0.022);
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(bar([px(172), s * 0.10, SILL + 0.02], [px(236), s * 0.22, pz(176)], 0.020, 6));
      K.dark.push(box(px(165) - px(350), 0.03, 0.03, (px(165) + px(350)) / 2, s * 0.36, SILL + 0.01));
    }

    /* ---- the wing-root intake fairings (A plan, side, front; E):
       a bulged glove from the fuselage side (y 0.55) out to the wing at
       y 1.49. Inner section: top lip x 3.10 z 0.52, bottom lip x 2.86
       z -0.30, back to the root fillet at -1.48; the dark triangular mouth
       between the lips tapers to a point at y 1.40 (A front view) */
    var GI = 0.55, GO = 1.49, zo = wZ(GO), to = wT(GO);
    for (s = -1; s <= 1; s += 2) {
      var gin = [[3.10, s * GI, 0.52], [2.40, s * GI, 0.50], [-1.48, s * GI, 0.02], [1.60, s * GI, -0.48], [2.86, s * GI, -0.30]];
      var gout = [[wLE(GO), s * GO, zo + 0.02], [2.00, s * GO, zo + to * 0.5], [wTE(GO), s * GO, zo],
                  [2.00, s * GO, zo - to * 0.5], [wLE(GO), s * GO, zo - 0.02]];
      K.skin.push(solid(gin, gout));
      var mo = function (dx) {
        return [[3.10 + dx, s * (GI + 0.02), 0.44], [2.88 + dx, s * (GI + 0.02), -0.22],
                [wLE(1.40) + dx + 0.02, s * 1.40, wZ(1.40) - 0.01], [wLE(1.40) + dx + 0.02, s * 1.40, wZ(1.40) + 0.01]];
      };
      K.dark.push(solid(mo(0.012), mo(-0.30)));
    }

    /* ---- wing (A): root inside the glove, the inner panel to the
       dog-tooth, the extended outer panel, the rounded tip */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(wSec(WROOT, s), wSec(GO, s)));
      K.skin.push(solid(wSec(GO, s), wSec(DT - 0.001, s)));
      K.skin.push(solid(wSec(DT, s), wSec(4.90, s)));
      K.skin.push(solid(wSec(4.90, s), wSec(WTIP, s, wLE(WTIP) - 0.25)));
      /* team strips on the upper outer wings */
      var tb = function (yy) {
        var le = wLE(yy), te = wTE(yy), zz = wZ(yy), h = wT(yy) * 0.47 + 0.012;
        return blk([le, s * yy, zz], [te, s * yy, zz], 0.28, 0.62, h, [0, 0, 1]);
      };
      K.team.push(solid(tb(3.95), tb(4.40)));
    }

    /* ---- tailplane, flat, part way up the fin (A plan, side) */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(solid(tSec(0.08, s, tLE(0.08), tTE(0.08), 0.085), tSec(0.90, s, tLE(0.90), tTE(0.90), 0.065)));
      K.skin.push(solid(tSec(0.90, s, tLE(0.90), tTE(0.90), 0.065), tSec(1.56, s, tLE(1.56), tTE(1.56), 0.045)));
      K.skin.push(solid(tSec(1.56, s, tLE(1.56), tTE(1.56), 0.045), tSec(TTIP, s, tLE(TTIP) - 0.15, tTE(TTIP), 0.03)));
    }
    /* the bullet fairing through the fin-tailplane junction (A: px 1125
       to the spike at 1366) */
    push(K.skin, revolve([[0.50, 0.05], [0.42, 0.75], [0.30, 1.0], [-0.20, 0.95], [-0.38, 0.55], [-0.50, 0.04]],
                         px(1125) - px(1366), 0.095, (px(1125) + px(1366)) / 2, 0, TZ, 16, 0, 0));

    /* ---- fin and dorsal fillet (A, height above the spine x 0.889 measured off C, G, K: see NOT CONFIRMED) */
    for (i = 0; i < FIN.length - 1; i++) {
      var a = FIN[i], c2 = FIN[i + 1];
      K.skin.push(solid(foil([px(a[1]), 0, fz(a[0])], [px(a[2]), 0, fz(a[0])], a[3], [0, 1, 0]),
                        foil([px(c2[1]), 0, fz(c2[0])], [px(c2[2]), 0, fz(c2[0])], c2[3], [0, 1, 0])));
    }

    /* ---- the single jet pipe (A: exit px 1342, centre row 256, r 0.33) */
    var JX = px(1342), JZ = pz(256);
    push(K.metal, loft([ls(px(1328), 0, JZ, 0.335, 0.335, 1), ls(JX, 0, JZ, 0.325, 0.325, 1)], 28, null, null));
    K.dark.push(aftDisc(0.31, 24, JX + 0.04, 0, JZ));

    /* ---- Sabrinas (A, B, H): two blisters under the cockpit, px 300-470,
       deepest (z -0.92) at px 380; [x, bottom z, half-width] */
    var SAB = [[px(300), -0.62, 0.05], [px(315), -0.80, 0.13], [px(345), -0.89, 0.17], [px(380), -0.92, 0.18],
               [px(420), -0.88, 0.165], [px(450), -0.79, 0.12], [px(470), -0.66, 0.05]];
    for (s = -1; s <= 1; s += 2) {
      var sb = [];
      for (i = 0; i < SAB.length; i++) sb.push(ls(SAB[i][0], s * 0.36, (SAB[i][1] - 0.45) / 2, SAB[i][2], (-0.45 - SAB[i][1]) / 2, 0.95));
      push(K.skin, loft(sb, 18, 0.02, 0.02));
    }

    /* ---- the four Aden muzzles: two long troughs each side of the lower
       nose (A, D), the lower one aft of the upper (D) */
    for (s = -1; s <= 1; s += 2) {
      K.dark.push(box(0.75, 0.06, 0.075, 5.32, s * 0.385, pz(302), -s * 0.75));
      K.dark.push(box(0.75, 0.06, 0.075, 4.92, s * 0.255, pz(313), -s * 1.05));
    }

    /* ---- ventral airbrake, closed (A: px 930-1055) */
    K.skin.push(convex([
      [[px(930), -0.30, pz(324)], [px(930), 0.30, pz(324)], [px(1055), 0.30, pz(318)], [px(1055), -0.30, pz(318)]],
      [[px(930), -0.30, pz(326)], [px(930), 0.30, pz(326)], [px(1055), 0.30, pz(329)], [px(1055), -0.30, pz(329)]]]));

    /* ---- drop tanks on the inboard pylons (E, C, G; H: 2 x 100 gal) */
    var TY = 2.35, TKZ = -0.60, TKX = 0.80, TKL = 2.9, TKR = 0.275;
    for (s = -1; s <= 1; s += 2) {
      push(K.skin, revolve(P_TANK, TKL, TKR, TKX, s * TY, TKZ, 18, 0, 0));
      var wl = wZ(TY) - wT(TY) * 0.40;
      K.skin.push(convex([
        [[1.45, s * TY - 0.05, wl + 0.06], [-0.20, s * TY - 0.05, wl + 0.06], [-0.20, s * TY + 0.05, wl + 0.06], [1.45, s * TY + 0.05, wl + 0.06]],
        [[1.25, s * TY - 0.05, TKZ + 0.22], [0.10, s * TY - 0.05, TKZ + 0.22], [0.10, s * TY + 0.05, TKZ + 0.22], [1.25, s * TY + 0.05, TKZ + 0.22]]]));
      /* the small tail fins (E) */
      for (var k = 0; k < 3; k++) {
        var an = -PI / 2 + k * 2 * PI / 3, cy = Math.cos(an), cz = Math.sin(an);
        var x0 = TKX - TKL * 0.32, x1 = TKX - TKL * 0.50;
        K.skin.push(solid([[x0, s * TY + cy * 0.15, TKZ + cz * 0.15], [x1, s * TY + cy * 0.05, TKZ + cz * 0.05],
                           [x1 - 0.06, s * TY + cy * 0.30, TKZ + cz * 0.30]].map(function (p) { return [p[0], p[1] - cz * 0.01, p[2] + cy * 0.01]; }),
                          [[x0, s * TY + cy * 0.15, TKZ + cz * 0.15], [x1, s * TY + cy * 0.05, TKZ + cz * 0.05],
                           [x1 - 0.06, s * TY + cy * 0.30, TKZ + cz * 0.30]].map(function (p) { return [p[0], p[1] + cz * 0.01, p[2] - cy * 0.01]; })));
      }
    }

    /* ---- pitot boom ahead of the port wing tip (A plan: y 4.72) */
    var PY = 4.72, PZ = wZ(4.72);
    K.metal.push(bar([wLE(PY) - 0.10, PY, PZ], [px(641), PY, PZ], 0.024, 8));
    K.metal.push(cyl(0.012, 0.024, 0.10, 8, "x", px(641) + 0.03, PY, PZ));

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");

    /* ---- landing gear (A side and front views; B, D, E): single nose
       wheel 0.44 m at x 4.98; mains 0.70 m at x 0.45, y +-2.19, on long
       legs from the wing inboard of the tank; group "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 4.98, nr = 0.22, nz = GROUND + nr;
    G.metal.push(bar([5.06, 0, pz(318) + 0.08], [nx + 0.06, 0, nz + 0.30], 0.055, 10));   /* oleo */
    G.metal.push(bar([nx + 0.06, 0, nz + 0.32], [nx, 0, nz], 0.040, 8));                  /* fork */
    G.metal.push(bar([nx, 0.09, nz], [nx, -0.09, nz], 0.030, 8));
    G.metal.push(bar([4.55, 0, pz(320) + 0.05], [5.04, 0, nz + 0.70], 0.026, 6));         /* drag stay */
    G.tyre.push(cyl(nr, nr, 0.15, 20, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.16, 12, "y", nx, 0, nz));
    for (s = -1; s <= 1; s += 2)
      G.door.push(box(0.70, 0.02, 0.36, 5.05, s * 0.17, pz(318) - 0.16, s * 0.18));        /* nose doors (D) */
    var mx = 0.45, mr = 0.35, mz = GROUND + mr, my = 2.19, LY = 1.95;
    for (s = -1; s <= 1; s += 2) {
      var wb = wZ(LY) - wT(LY) * 0.38;
      G.metal.push(bar([mx + 0.08, s * LY, wb], [mx, s * (LY + 0.01), mz + 0.05], 0.070, 10));  /* leg */
      G.metal.push(bar([mx - 0.65, s * (LY - 0.05), wb], [mx, s * LY, mz + 0.70], 0.032, 6));    /* drag brace */
      G.metal.push(bar([mx, s * (LY - 0.02), mz], [mx, s * (my + 0.10), mz], 0.045, 8));        /* axle */
      G.tyre.push(cyl(mr, mr, 0.20, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.21, 14, "y", mx, s * my, mz));
      /* the fairing door on the leg (B) */
      G.door.push(solid([[mx + 0.32, s * (LY - 0.09), wb - 0.04], [mx - 0.30, s * (LY - 0.09), wb - 0.04],
                         [mx - 0.22, s * (LY - 0.09), mz + 0.42], [mx + 0.26, s * (LY - 0.09), mz + 0.42]],
                        [[mx + 0.32, s * (LY - 0.11), wb - 0.04], [mx - 0.30, s * (LY - 0.11), wb - 0.04],
                         [mx - 0.22, s * (LY - 0.11), mz + 0.42], [mx + 0.26, s * (LY - 0.11), mz + 0.42]]));
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.door, T.door, "gear_doors");
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured x extent: nose tip (6.99) to the tailplane tips
   (-7.03), 14.03 m as dumped */
UNIT_MODELS["gbr_e50_fighter"] = { len: 14.03, build: function (THREE, M, C) { return HeroHunter.build(THREE, M, C); } };
