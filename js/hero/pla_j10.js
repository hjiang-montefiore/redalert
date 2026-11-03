/* ============ pla_j10.js - HERO model: Chengdu J-10A "Firebird" ============
   Registers pla_e00_fighter ("J-10 / J-10B", "Chengdu J-10 (2004), J-10B
   (2014)"). One key, one variant: the J-10A, the production aircraft the
   row's 2004 service date names, with its ventral intake behind a splitter
   plate. It is the variant the references support: the only three-view
   found (D) is a J-10A, and both photographs are J-10As. The J-10B's DSI
   bump intake, longer radome, IRST ball ahead of the windscreen and fin-top
   pod are NOT drawn (no drawing of the B was found; see the foot).

   Full-quality redo, 2026-10-30. Model space: +X nose, +Y left (port), +Z
   up, metres. The tables are in model metres read straight off D:
     side view   X = (576 - px) / 66.05,  Z = (250 - py) / 66.05
     plan view   X = (576 - px) / 66.05,  Y = (705 - py) / 66.05
   66.05 px/m makes D's plan span (644 px tip to tip) the published 9.75 m.
   Z = 0 is the nose axis (the pitot line); x0 = 576 px puts the origin at
   mid-length.

   References (Wikimedia Commons at the widths given, cached in
   scratchpad/q_j10_ref; Wikipedia for the figures):
     D "Chengdu J-10.svg" (1552 px; captioned "Chengdu J-10A 3-view drawing"
       on en.wikipedia) - side, plan and head-on views (the head-on turned
       90 degrees, fin to the right). Every station table below is read off
       it on a pixel grid: the nose and radome, the canopy, the spine, the
       intake mouth raked back toward its lower lip with the splitter plate
       and its posts ahead of it, the canard-delta planform, the fin and its
       dorsal fillet, the brake-chute pod at the fin's foot, the flat rear
       fuselage shelves beside the nozzle, the two ventral fins under them
       (canted out about 38 deg: plan and head-on), the nozzle, the wing
       pylons (head-on: three a side at 1.86, 2.65, 3.75 m), the centreline
       pylon, the spine blade. Its two wheel circles on a ground line give
       the wheel stations, sizes and the ground: nose wheel X 2.87, 0.38 m;
       main wheels X -1.80, 0.73 m; ground Z -2.12.
     P1 "China - Air Force Chengdu J-10A.jpg" - a PLAAF J-10A rolling out
       side-on under its brake chute: the profile, the long nose leg behind
       the intake, the main wheels under the wing root (the stations agree
       with D's circles within 0.25 m), the tyre sizes, the paint (sunlit
       side 187,199,223; fin in shade 134,142,163), the black radome, the
       bare dark nozzle, the chute streaming from the pod at the fin's foot.
     P2 "PLAAF J-10A - 1.jpg" - a J-10A climbing out from below: the same
       pale blue-grey all over, the black radome, PL-8s on the outer wing
       pylons and a longer missile inboard, the dark bronze nozzle petals.
     P3 "J-10 AUG01 11 taxiing at CCAS2023 (20230724110755).jpg" - a display
       team J-10 taxiing, three-quarter front: the main legs splay out from
       the fuselage sides (used for the gear only; its intake and paint are
       a later variant's and are NOT used).
     en.wikipedia "Chengdu J-10": length 16.9 m, span 9.8 m, height 5.7 m,
       wing area 37 m2; the J-10B "features a lighter and stealthier
       diverterless supersonic inlet, a longer nose radome ... an electro-
       optic targeting sensor (IRST ...) and a new electronic warning or
       countermeasures pod atop the vertical stabiliser".
     ru.wikipedia "Chengdu J-10" (after Sinodefence): length 16.43 m, span
       9.75 m, height 5.43 m, wing area 33.05 m2; 11 hardpoints (4 under
       each wing, 3 under the fuselage); one AL-31FN.
   As drawn: 17.10 m over the pitot (8.56 to -8.54), 9.75 m span, 5.74 m
   high to the fin tip; D's own planform gives 37 m2 of wing (the en
   figure). D is about 1 to 4 % longer than the published lengths at the
   published span; the drawing is followed.

   Recognition list (what makes it a J-10 at RTS zoom; each shows here):
     1. Canard delta: a 52 deg delta wing (LE from X 0.94 at the root to the
        tip at -4.47, Y 4.89; TE nearly straight across at -5.07..-5.22)
        with all-moving canards high on the intake sides just behind the
        cockpit, swept 55 deg, with about 18 deg of dihedral (D side and
        head-on agree) - WING, CANARD.
     2. The single ventral intake under the cockpit: a wide rounded box
        mouth, its side walls raked back from the upper lip (X 4.48) to the
        lower lip (X 3.80), and the splitter plate standing off the belly
        ahead of it on posts (D side and head-on, P1) - TRUNK, splitter().
     3. One tall swept fin (LE 55 deg) on a dorsal fillet, square-topped,
        with the brake-chute pod at the foot of its trailing edge (D, P1).
     4. The two ventral fins, canted out, under the flat rear shelves that
        run back beside the nozzle (D side, plan, head-on; P1).
     5. One engine: one big nozzle, its petals closed to a 0.7 m exit (D,
        P1, P2) - nozzle().
     6. A slim drooped nose with a long pitot, the bubble canopy set high,
        the spine falling to the tail (D side, P1).
     7. PLAAF pale blue-grey all over, black radome (P1, P2).
   Paint: P1's sunlit side (187,199,223) and shade on the fin (134,142,163)
   taken to about 0.8 of level and between the two: #97a2b2 above, a touch
   paler below; radome #2e3035. No national markings, no bort numbers, no
   fin flash (P1 and P2 carry the star-and-bar and numbers: not drawn).
   Team colour exactly C.team: one strip on each upper outer wing.
   Stores: the row names PL-12 and PL-8 (generations.js): a PL-12 on each
   middle wing pylon, a PL-8 on each outer one, as P2 shows PL-8s outboard;
   the inner wing pylons and the centreline pylon are drawn empty.
   Gear: it retracts, so it is the group "gear". Nose leg at X 2.87 on the
   centreline behind the intake, single wheel; main legs at X -1.80 from the
   fuselage sides, single wheels, splayed out (P3).

   NOT CONFIRMED (estimated, not measured):
     - the main gear track (2.6 m) and the legs' splay: P3 only, in strong
       perspective; D shows no gear legs.
     - the cross-section shapes (superellipse exponents) and the rear
       fuselage widths hidden under the wing in D's plan (0.76-0.82 m half
       width): judged from D's head-on view and P1's shading; D's head-on
       view does not register vertically with its side view, so it was used
       for widths and angles only.
     - the wing's height on the fuselage (Z -0.45, flat) and the canard root
       height (Z 0.25): read off D side where the root lines are partly
       hidden by panel lines.
     - the depth of the dark duct inside the intake; the splitter's gap.
     - the pylons' fore-and-aft positions and lengths (D's head-on shows
       only their spanwise stations); the store choice per pylon.
     - the published length (16.43 / 16.9 m) against D's 17.1 m: D is drawn
       to its span; not rescaled.
   Not drawn (no reference shows it on this airframe, or the row forbids
   it): national markings and numbers, an IRST or DSI (the J-10B's), a
   fin-top pod, drop tanks, open airbrakes, the cannon port (not visible on
   D), the brake chute itself.

   Materials: SKIN (one painted canvas, projected), RADOME, DARK, METAL,
   NOZZLE, GLASS, PALE (stores), TEAM; the gear group METAL, TYRE, DARK.
   Nodes: "gear". Model space line: +X nose, +Y port, +Z up, metres; the
   tyres touch Z -2.12.
   ======================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJ10 = (function () {
  "use strict";

  var V = null;
  var PI = Math.PI;
  var D2R = PI / 180;
  var GROUND = -2.12;                       /* D: the wheel circles' ground line, py 390 */

  /* ------------------------------------------------------- the tables -- */
  /* body: [X, half-width, crown Z, keel Z, Z of max width, upper exp, lower exp]
     (D side for crown and keel, D plan for the half-width). Forward of X 4.48
     the keel is the nose's own; aft of it the intake trunk hangs below and
     the body's keel is hidden inside it until the trunk fairs in at -1.5. */
  var BODY = [
    [7.66, 0.025, 0.06, -0.06, 0.00, 1.0, 1.0],
    [7.51, 0.10, 0.14, -0.09, 0.02, 1.0, 1.0],
    [7.21, 0.26, 0.29, -0.17, 0.05, 1.0, 1.0],
    [6.75, 0.38, 0.45, -0.26, 0.07, 1.0, 1.0],
    [6.30, 0.47, 0.58, -0.27, 0.09, 1.0, 0.95],
    [6.15, 0.49, 0.61, -0.27, 0.10, 1.0, 0.9],     /* radome joint, px 170 */
    [5.69, 0.55, 0.71, -0.27, 0.12, 0.95, 0.85],   /* windscreen foot */
    [4.94, 0.57, 0.80, -0.28, 0.14, 0.9, 0.8],
    [4.48, 0.58, 0.83, -0.29, 0.14, 0.9, 0.75],
    [3.72, 0.62, 0.87, -0.30, 0.14, 0.9, 0.7],
    [3.42, 0.68, 0.91, -0.30, 0.12, 0.9, 0.7],
    [2.90, 0.70, 1.00, -0.30, 0.10, 0.9, 0.7],
    [2.66, 0.70, 1.11, -0.30, 0.10, 0.9, 0.7],     /* canopy's end, px 400 */
    [2.29, 0.70, 1.07, -0.30, 0.10, 0.9, 0.7],
    [1.53, 0.71, 1.07, -0.31, 0.10, 0.9, 0.7],
    [0.77, 0.73, 1.03, -0.34, 0.10, 0.9, 0.7],
    [0.02, 0.76, 0.94, -0.45, 0.08, 0.9, 0.6],
    [-0.74, 0.79, 0.85, -0.62, 0.05, 0.9, 0.55],
    [-1.50, 0.80, 0.77, -0.80, 0.02, 0.9, 0.5],
    [-2.26, 0.81, 0.76, -0.86, 0.00, 0.85, 0.45],
    [-3.39, 0.82, 0.76, -0.88, 0.00, 0.85, 0.45],
    [-4.53, 0.82, 0.76, -0.88, 0.00, 0.85, 0.45],
    [-5.28, 0.80, 0.76, -0.82, 0.00, 0.85, 0.5],
    [-5.90, 0.76, 0.75, -0.72, 0.00, 0.85, 0.6],
    [-6.46, 0.70, 0.70, -0.64, 0.00, 0.95, 0.8]    /* nozzle shroud, px 1003 */
  ];
  var RADOME_N = 6;                           /* the first six rows are the black radome */
  /* canopy (D side): [X, half-width, top Z]; the glazing sits on a sill at Z 0.70 */
  var CANOPY = [[5.69, 0.26, 0.74], [5.31, 0.38, 0.91], [4.94, 0.44, 1.10], [4.70, 0.46, 1.19],
                [4.18, 0.47, 1.35], [3.80, 0.46, 1.35], [3.42, 0.43, 1.30], [3.04, 0.37, 1.23],
                [2.75, 0.26, 1.15]];
  /* intake trunk (D side and head-on): [X at the section centre, half-width, top Z, bottom Z, exp].
     The mouth is raked: its side walls run back 1.31 m per metre of drop, from
     the upper lip at X 4.48 (Z -0.36) to the lower lip at X 3.80 (Z -0.89). */
  var TRUNK = [
    [4.14, 0.665, -0.36, -0.89, 0.35],
    [3.60, 0.68, -0.33, -0.89, 0.35],
    [2.50, 0.69, -0.32, -0.89, 0.38],
    [1.00, 0.70, -0.32, -0.89, 0.40],
    [-0.50, 0.72, -0.40, -0.89, 0.45],
    [-2.00, 0.74, -0.60, -0.88, 0.5]
  ];
  var RAKE = 1.31;
  /* wing (D plan): LE from (0.94, 0.70) swept 52 deg to the tip (-4.47, 4.89);
     TE from (-5.22, 0.70) to (-5.07, 4.89). Chord plane Z -0.45, flat (D head-on). */
  var WROOT = 0.70, WTIP = 4.89, WZ = -0.45;
  function wLE(y) { return 0.94 - (y - WROOT) * 1.290; }
  function wTE(y) { return -5.22 + (y - WROOT) * 0.036; }
  function wT(y) { return 0.30 - (y - WROOT) / (WTIP - WROOT) * 0.26; }    /* ~5 % root, 4 % tip */
  /* canards (D plan, side, head-on): root at Y 0.70, LE 3.42, TE 1.24, Z 0.25;
     tip at Y 2.21, LE 1.24, TE 0.77; 18 deg dihedral */
  var CAN = { y0: 0.66, y1: 2.21, le0: 3.47, te0: 1.22, le1: 1.24, te1: 0.77, z0: 0.24, dih: 18 * D2R };
  /* fin (D side): root Z 1.24, LE -4.00, TE -7.78; tip Z 3.62, LE -7.30, TE -8.54 */
  var FIN = { z0: 1.24, z1: 3.62, le0: -4.00, te0: -7.78, le1: -7.30, te1: -8.54 };
  /* nozzle (D side and plan): shroud -6.46..-6.73 r 0.66, petals to the exit at -7.92, r 0.35 */
  var NOZ = { x0: -6.46, x1: -6.73, x2: -7.92, r0: 0.68, r1: 0.65, r2: 0.355, z: -0.02 };

  /* ------------------------------------------------------------ paint -- */
  var PXM = 30, XMIN = -8.9, TW = 540;
  var YMAX = 5.2, TOPH = 312, ZTOP = 3.8, SIDEH = 186;
  var B_TOP = 0, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_IN = TOPH + 2 * SIDEH, B_BEL = TOPH + 3 * SIDEH;
  var TH = TOPH * 2 + SIDEH * 3;
  var PAL = { body: "#97a2b2", belly: "#a1abb8", fin: "#929daf", walk: "#8a95a5" };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pxX(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function pxY(y) { return (YMAX - y) * PXM; }
  function pxZ(z) { return (ZTOP - z) * PXM; }

  var _cv = null;
  function paint() {
    if (_cv) return _cv;
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), sd = 10104, i, b, x, y, k;
    function R() { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }
    g.fillStyle = PAL.body; g.fillRect(0, 0, TW, B_BEL);
    g.fillStyle = PAL.belly; g.fillRect(0, B_BEL, TW, TOPH);
    /* fins: a hair darker than the body (P1 in shade reads darker; the
       difference is mostly light, so it is kept small) */
    for (b = 0; b < 3; b++) {
      var bd = [B_PORT, B_STBD, B_IN][b];
      g.fillStyle = PAL.fin;
      g.beginPath();
      g.moveTo(pxX(FIN.le0), bd + pxZ(FIN.z0)); g.lineTo(pxX(FIN.le1), bd + pxZ(FIN.z1));
      g.lineTo(pxX(FIN.te1), bd + pxZ(FIN.z1)); g.lineTo(pxX(FIN.te0), bd + pxZ(FIN.z0));
      g.closePath(); g.fill();
      /* rudder hinge (D side: the line parallel to the TE about 0.6 m ahead of it) */
      g.strokeStyle = "rgba(0,0,0,0.30)"; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(pxX(-7.15), bd + pxZ(1.30)); g.lineTo(pxX(-7.95), bd + pxZ(3.45)); g.stroke();
    }
    /* panel lines: the frames D draws on the side view, on every band */
    g.strokeStyle = "rgba(0,0,0,0.15)"; g.lineWidth = 1;
    var FR = [6.15, 4.90, 3.70, 2.85, 1.73, 0.62, -0.69, -2.17, -2.86, -4.0, -4.53, -5.95, -6.46];
    for (i = 0; i < FR.length; i++) {
      x = pxX(FR[i]);
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
    }
    /* elevon hinge lines (D plan: X -4.48 from Y 1.1 to the tip) and the
       wing's spanwise panel line at Y 2.18, top and belly */
    for (b = 0; b < 2; b++) {
      var ob = b ? B_BEL : B_TOP;
      for (k = -1; k <= 1; k += 2) {
        g.strokeStyle = "rgba(0,0,0,0.26)"; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(pxX(-4.50), ob + pxY(k * 1.10)); g.lineTo(pxX(-4.45), ob + pxY(k * 4.85)); g.stroke();
        g.beginPath(); g.moveTo(pxX(-4.47), ob + pxY(k * 2.95)); g.lineTo(pxX(-5.17), ob + pxY(k * 2.95)); g.stroke();
        g.strokeStyle = "rgba(0,0,0,0.13)"; g.lineWidth = 1;
        g.beginPath(); g.moveTo(pxX(-1.0), ob + pxY(k * 2.18)); g.lineTo(pxX(-4.45), ob + pxY(k * 2.18)); g.stroke();
        g.beginPath(); g.moveTo(pxX(0.2), ob + pxY(k * 1.10)); g.lineTo(pxX(-4.45), ob + pxY(k * 1.30)); g.stroke();
      }
      g.beginPath(); g.moveTo(pxX(5.5), ob + pxY(0)); g.lineTo(pxX(-6.4), ob + pxY(0)); g.stroke();
    }
    /* the walkway-grey panel behind the canopy on the spine (P1: a slightly
       darker strip) and soot behind the gun-less belly vents */
    g.fillStyle = PAL.walk; g.globalAlpha = 0.5;
    g.fillRect(pxX(2.6), pxY(0.30), (2.6 - 0.2) * PXM, 0.6 * PXM);
    g.globalAlpha = 1;
    /* rivet rows and a little weathering */
    g.fillStyle = "rgba(0,0,0,0.10)";
    for (i = 0; i < 80; i++) {
      x = R() * TW * 0.95; y = R() * TH; k = 8 + ((R() * 22) | 0);
      for (b = 0; b < k; b++) g.fillRect(x + b * 4, y, 1.2, 1.2);
    }
    for (i = 0; i < 45; i++) {
      g.fillStyle = "rgba(30,34,40," + (0.03 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(R() * TW, R() * TH, 8 + R() * 36, 2 + R() * 5);
    }
    /* heat staining on the rear body ahead of the nozzle */
    var hs = g.createLinearGradient(pxX(-5.4), 0, pxX(-6.5), 0);
    hs.addColorStop(0, "rgba(40,36,32,0)"); hs.addColorStop(1, "rgba(40,36,32,0.30)");
    g.fillStyle = hs; g.fillRect(pxX(-6.5), 0, (6.5 - 5.4) * PXM, TH);
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
     inner (a side face turned toward the centreline), belly (as ru_su35.js) */
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
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.80, metalness: 0.08 });
    if (tex) m.skin.map = tex; else m.skin.color.setHex(0x97a2b2);
    m.radome = new V.MeshStandardMaterial({ color: 0x2e3035, roughness: 0.55, metalness: 0.10 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.75, metalness: 0.20 });
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6d70, roughness: 0.45, metalness: 0.60 });
    m.tyre  = new V.MeshStandardMaterial({ color: 0x141515, roughness: 0.95, metalness: 0.02 });
    m.nozzle = new V.MeshStandardMaterial({ color: 0x5f5852, roughness: 0.42, metalness: 0.60 });   /* P1, P2: dark bronze petals */
    m.glass = new V.MeshStandardMaterial({ color: 0x26353c, roughness: 0.10, metalness: 0.35 });
    m.pale  = new V.MeshStandardMaterial({ color: 0xd2d4d2, roughness: 0.55, metalness: 0.12 });
    var tc = (C && C.team !== undefined) ? C.team : "#c0392b";
    m.team  = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                           emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    return m;
  }

  /* ------------------------------------------------------ geometry kit --
     (the ru_su35.js kit: place, box, cyl, bar, merge, sloft, foil, loft) */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
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
  /* aerofoil section: thickness t along the unit normal nrm */
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
  function revolve(prof, len, r, x, y, z, n) {
    var secs = [], i;
    for (i = 0; i < prof.length; i++) secs.push(sec(x + prof[i][0] * len, y, z, r * prof[i][1], r * prof[i][1], r * prof[i][1], 1, 1));
    return loft(secs, n, 0, 0);
  }
  function bodySec(r) {
    return sec(r[0], 0, r[4], r[1], r[2] - r[4], r[4] - r[3], r[5], r[6]);
  }

  /* a pylon: a slim blade from the wing (zTop) down to zBot */
  function pylon(list, x0, x1, y, zTop, zBot, w) {
    var h = (w || 0.10) / 2, d = (x0 - x1) * 0.12;
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
  var P_PL12 = [[0.50, 0.03], [0.45, 0.45], [0.38, 0.85], [0.30, 1.0], [-0.48, 1.0], [-0.50, 0.85]];
  var P_PL8 = [[0.50, 0.05], [0.44, 0.55], [0.36, 0.92], [0.28, 1.0], [-0.47, 1.0], [-0.50, 0.85]];
  /* PL-12: 3.85 m, 0.203 m body, mid-body wings and tail fins;
     PL-8 (Python 3): 3.0 m, 0.16 m, double canards forward, swept tail wings */
  function store(K, kind, x, y, zTop) {
    var len, r, zc;
    if (kind === "pl12") {
      len = 3.85; r = 0.1015; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_PL12, len, r, x, y, zc, 12));
      fins(K.pale, x + 0.15, y, zc, 0.55, 0.30, 0.20, 0.14, PI / 4, 0.006);
      fins(K.pale, x - len * 0.38, y, zc, 0.36, 0.20, 0.14, 0.17, PI / 4, 0.006);
    } else {
      len = 3.0; r = 0.08; zc = zTop - 0.02 - r;
      push(K.pale, revolve(P_PL8, len, r, x, y, zc, 12));
      fins(K.pale, x + len * 0.33, y, zc, 0.14, 0.06, 0.05, 0.14, PI / 4, 0.006);
      fins(K.pale, x + len * 0.25, y, zc, 0.14, 0.06, 0.05, 0.14, PI / 4, 0.006);
      fins(K.pale, x - len * 0.32, y, zc, 0.42, 0.14, 0.26, 0.26, PI / 4, 0.006);
    }
  }

  /* the AL-31FN nozzle (D side and plan; P1, P2): the shroud ring, the long
     petal cone closed to a 0.7 m exit, dark seams, the dark bore */
  function nozzle(K) {
    var z = NOZ.z;
    push(K.metal, loft([sec(NOZ.x0, 0, z, NOZ.r0, NOZ.r0, NOZ.r0), sec(NOZ.x1, 0, z, NOZ.r1, NOZ.r1, NOZ.r1)], 24, null, null));
    push(K.nozzle, loft([sec(NOZ.x1, 0, z, NOZ.r1, NOZ.r1, NOZ.r1), sec(NOZ.x1 - 0.02, 0, z, NOZ.r1 - 0.02, NOZ.r1 - 0.02, NOZ.r1 - 0.02),
                         sec(-7.30, 0, z, 0.52, 0.52, 0.52), sec(NOZ.x2, 0, z, NOZ.r2, NOZ.r2, NOZ.r2)], 24, null, null));
    /* the lining faces inward: sections in increasing x */
    push(K.dark, loft([sec(NOZ.x2, 0, z, NOZ.r2 - 0.015, NOZ.r2 - 0.015, NOZ.r2 - 0.015), sec(NOZ.x2 + 0.5, 0, z, 0.40, 0.40, 0.40)], 20, null, null));
    K.dark.push(capOf(sec(NOZ.x2 + 0.5, 0, z, 0.40, 0.40, 0.40), 20, 0, false));
    for (var i = 0; i < 14; i++) {
      var a = (i + 0.5) * 2 * PI / 14;
      K.dark.push(bar([NOZ.x1 - 0.04, Math.cos(a) * (NOZ.r1 - 0.015), z + Math.sin(a) * (NOZ.r1 - 0.015)],
                      [NOZ.x2 + 0.03, Math.cos(a) * (NOZ.r2 + 0.005), z + Math.sin(a) * (NOZ.r2 + 0.005)], 0.010, 3));
    }
  }

  function buildAirframe(THREE, C) {
    V = THREE;
    var T = makeMats(C);
    var g = new V.Group();
    g.name = "j10";
    var K = { skin: [], radome: [], dark: [], metal: [], glass: [], team: [], pale: [], nozzle: [] };
    var G = { metal: [], tyre: [], dark: [] };
    var s, i, y, r;

    /* ---- radome (black) and body; the pitot ahead of the radome (D: px 11-70) */
    var rs = [], bs = [];
    for (i = 0; i < BODY.length; i++) {
      var sc = bodySec(BODY[i]);
      if (i < RADOME_N) rs.push(sc);
      if (i >= RADOME_N - 1) bs.push(sc);
    }
    push(K.radome, loft(rs, 40, 0, null));
    push(K.skin, loft(bs, 40, null, 0));          /* closed behind the nozzle shroud */
    K.metal.push(cyl(0.022, 0.045, 0.62, 8, "x", 7.97, 0, 0.0));
    K.metal.push(cyl(0.012, 0.022, 0.30, 6, "x", 8.42, 0, 0.0));
    K.dark.push(cyl(0.035, 0.035, 0.05, 8, "x", 8.05, 0, 0.0));

    /* ---- canopy on its sill, frames, the spine blade */
    var cs = [];
    for (i = 0; i < CANOPY.length; i++) {
      r = CANOPY[i];
      cs.push(sec(r[0], 0, 0.70, r[1], r[2] - 0.70, 0.10, 1.0, 1.0));
    }
    push(K.glass, loft(cs, 28, 0.04, 0.03));
    function arch(sv, rad) {
      var rr = ringOf(sv, 28);
      for (var j = 0; j < 14; j++) K.dark.push(bar(rr[j], rr[(j + 1) % 28], rad, 4));
    }
    arch(sec(4.68, 0, 0.70, 0.465, 1.19 - 0.70 + 0.012, 0.10), 0.024);   /* windscreen frame, D px 262-268 */
    arch(sec(2.86, 0, 0.70, 0.33, 1.19 - 0.70 + 0.010, 0.10), 0.026);    /* canopy rear frame */
    K.dark.push(box(0.12, 0.02, 0.20, 0.24, 0, 1.11));                    /* spine blade, D px 560-568 */
    K.dark.push(box(0.10, 0.02, 0.14, -2.0, 0, -0.95));                   /* belly blade aft of the trunk */

    /* ---- intake trunk: raked mouth, dark duct, splitter plate on posts */
    var ts = [];
    for (i = 0; i < TRUNK.length; i++) {
      r = TRUNK[i];
      var zc = (r[2] + r[3]) / 2, hh = (r[2] - r[3]) / 2;
      ts.push(sec(r[0], 0, zc, r[1], hh, hh, r[4], r[4], i ? 0 : RAKE));
    }
    push(K.skin, loft(ts, 32, null, null));
    var m0 = TRUNK[0], mzc = (m0[2] + m0[3]) / 2, mhh = (m0[2] - m0[3]) / 2;
    /* the duct: a dark liner facing inward from the lip to a dark face 0.45 m in */
    push(K.dark, loft([sec(m0[0] - 0.45, 0, mzc, m0[1] - 0.05, mhh - 0.05, mhh - 0.05, m0[4], m0[4], RAKE),
                       sec(m0[0] - 0.002, 0, mzc, m0[1] - 0.004, mhh - 0.004, mhh - 0.004, m0[4], m0[4], RAKE)], 32, null, null));
    K.dark.push(capOf(sec(m0[0] - 0.44, 0, mzc, m0[1] - 0.06, mhh - 0.06, mhh - 0.06, m0[4], m0[4], RAKE), 32, 0, true));
    /* the lip: a thin rolled edge round the mouth */
    var lip = ringOf(sec(m0[0] + 0.005, 0, mzc, m0[1] + 0.003, mhh + 0.003, mhh + 0.003, m0[4], m0[4], RAKE), 32);
    for (i = 0; i < 32; i++) K.skin.push(bar(lip[i], lip[(i + 1) % 32], 0.022, 4));
    /* the splitter plate (D side px 278-330, head-on): a thin plate as wide as
       the mouth, standing ahead of the upper lip below the nose keel, on posts */
    K.skin.push(sloft([[[4.56, 0.60, -0.325], [3.70, 0.66, -0.325], [3.70, 0.66, -0.355], [4.56, 0.60, -0.355]],
                       [[4.56, -0.60, -0.325], [3.70, -0.66, -0.325], [3.70, -0.66, -0.355], [4.56, -0.60, -0.355]]]));
    for (s = -1; s <= 1; s += 2) {
      K.metal.push(box(0.05, 0.03, 0.06, 4.40, s * 0.40, -0.30));
      K.metal.push(box(0.05, 0.03, 0.06, 4.05, s * 0.45, -0.30));
    }

    /* ---- wing: one loft of aerofoil sections, root (inside the body) to tip */
    for (s = -1; s <= 1; s += 2) {
      var ws = [], WST = [0.45, WROOT, 1.6, 2.6, 3.6, 4.4, WTIP];
      for (i = 0; i < WST.length; i++) {
        y = WST[i];
        var yy = Math.max(y, WROOT);
        ws.push(foil([wLE(yy), s * y, WZ], [wTE(yy), s * y, WZ], wT(yy), [0, 0, 1]));
      }
      K.skin.push(sloft(ws));
      /* the team strip: a thin plate lying ON the upper skin of the outer wing */
      function plate(yy) {
        var le = wLE(yy), te = wTE(yy), zz = WZ + wT(yy) * 0.47 + 0.02;
        return blk([le, s * yy, zz], [te, s * yy, zz], 0.25, 0.70, 0.02, [0, 0, 1]);
      }
      K.team.push(sloft([plate(3.55), plate(4.10)]));
    }

    /* ---- canards: all-moving, on the trunk sides, 18 deg dihedral */
    for (s = -1; s <= 1; s += 2) {
      var cn = [], CS = [0, 0.35, 0.7, 1];
      for (i = 0; i < CS.length; i++) {
        var f = CS[i], cy = CAN.y0 + (CAN.y1 - CAN.y0) * f;
        var cz = CAN.z0 + (cy - CAN.y0) * Math.tan(CAN.dih);
        var le = CAN.le0 + (CAN.le1 - CAN.le0) * f, te = CAN.te0 + (CAN.te1 - CAN.te0) * f;
        cn.push(foil([le, s * cy, cz], [te, s * cy, cz], 0.10 - 0.06 * f, [0, -s * Math.sin(CAN.dih), Math.cos(CAN.dih)]));
      }
      K.skin.push(sloft(cn));
      /* the pivot fairing on the trunk side */
      K.skin.push(sloft([foil([3.0, s * 0.64, CAN.z0], [1.0, s * 0.64, CAN.z0], 0.16, [0, 0, 1]),
                         foil([2.85, s * 0.72, CAN.z0], [1.15, s * 0.72, CAN.z0], 0.10, [0, 0, 1])]));
    }

    /* ---- fin, its dorsal fillet and box root, the brake-chute pod */
    function finSec(z, th) {
      var f = (z - FIN.z0) / (FIN.z1 - FIN.z0);
      var le = FIN.le0 + (FIN.le1 - FIN.le0) * f, te = FIN.te0 + (FIN.te1 - FIN.te0) * f;
      return foil([le, 0, z], [te, 0, z], th, [0, 1, 0]);
    }
    K.skin.push(sloft([finSec(FIN.z0 - 0.02, 0.24), finSec(2.2, 0.17), finSec(3.30, 0.10), finSec(FIN.z1 - 0.10, 0.08)]));
    K.dark.push(sloft([finSec(FIN.z1 - 0.10, 0.085), finSec(FIN.z1, 0.07)]));   /* dielectric cap, D's squared top */
    /* the fin's base box (D side: Z 0.76 to 1.24 from X -4.0 to -7.78), wider than the fin */
    K.skin.push(sloft([
      [[-2.71, 0.03, 0.74], [-4.00, 0.15, 1.25], [-7.40, 0.15, 1.25], [-7.40, 0.15, 0.62], [-2.71, 0.03, 0.62]],
      [[-2.71, -0.03, 0.74], [-4.00, -0.15, 1.25], [-7.40, -0.15, 1.25], [-7.40, -0.15, 0.62], [-2.71, -0.03, 0.62]]]));
    /* brake-chute pod at the fin's foot (D px 1065-1118, Z 0.9-1.29; P1) */
    push(K.skin, loft([sec(-7.20, 0, 1.08, 0.16, 0.17, 0.17), sec(-7.60, 0, 1.08, 0.19, 0.20, 0.20),
                       sec(-8.05, 0, 1.08, 0.18, 0.19, 0.19), sec(-8.20, 0, 1.08, 0.12, 0.13, 0.13)], 16, null, 0.06));

    /* ---- rear shelves beside the nozzle (D plan px 921-1064, Y to 1.09; side Z -0.40..-0.64) */
    for (s = -1; s <= 1; s += 2) {
      K.skin.push(sloft([
        [[-3.6, s * 0.70, -0.42], [-3.6, s * 0.95, -0.47], [-3.6, s * 0.95, -0.57], [-3.6, s * 0.70, -0.62]],
        [[-5.22, s * 0.70, -0.40], [-5.22, s * 1.09, -0.46], [-5.22, s * 1.09, -0.58], [-5.22, s * 0.70, -0.64]],
        [[-7.39, s * 0.62, -0.42], [-7.39, s * 1.02, -0.47], [-7.39, s * 1.02, -0.55], [-7.39, s * 0.62, -0.60]]]));
      /* ventral fin under the shelf, canted out 38 deg (D side, plan, head-on) */
      var ca = 38 * D2R, ry = 1.00, rz = -0.56;
      function vp(x, d) { return [x, s * (ry + d * Math.sin(ca)), rz - d * Math.cos(ca)]; }
      var nrm = [0, s * Math.cos(ca), Math.sin(ca)];
      K.skin.push(sloft([foil(vp(-5.28, 0), vp(-6.95, 0), 0.07, nrm),
                         foil(vp(-5.50, 0.50), vp(-6.95, 0.30), 0.05, nrm),
                         foil(vp(-5.66, 0.90), vp(-6.95, 0.52), 0.035, nrm)]));
    }

    nozzle(K);

    /* ---- pylons (D head-on: Y 1.86, 2.65, 3.75; centreline) and stores */
    var PY = [[1.86, -1.35, -3.15], [2.65, -2.05, -3.75], [3.75, -3.30, -4.45]];
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < PY.length; i++) {
        var zb = WZ - wT(PY[i][0]) * 0.40;
        pylon(K.skin, PY[i][1], PY[i][2], s * PY[i][0], zb + 0.02, zb - 0.26, 0.09);
        if (i === 1) store(K, "pl12", (PY[i][1] + PY[i][2]) / 2 + 0.20, s * PY[i][0], zb - 0.26);
        if (i === 2) store(K, "pl8", (PY[i][1] + PY[i][2]) / 2 + 0.05, s * PY[i][0], zb - 0.26);
      }
    }
    pylon(K.skin, -2.51, -3.85, 0, -0.86, -1.08, 0.10);                    /* centreline, D px 742-830 */

    mesh(g, K.skin, T.skin, "skin", true);
    mesh(g, K.radome, T.radome, "radome");
    mesh(g, K.dark, T.dark, "dark");
    mesh(g, K.metal, T.metal, "metal");
    mesh(g, K.nozzle, T.nozzle, "nozzle");
    mesh(g, K.glass, T.glass, "glass");
    mesh(g, K.team, T.team, "team");
    mesh(g, K.pale, T.pale, "stores");

    /* ---- landing gear (D's wheel circles, P1, P3): it retracts, so "gear" */
    var gr = new V.Group();
    gr.name = "gear";
    g.add(gr);
    var nx = 2.87, nr = 0.19, nz = GROUND + nr;
    G.metal.push(bar([nx + 0.10, 0, -0.85], [nx, 0, nz + 0.12], 0.055, 10));
    G.metal.push(bar([nx + 0.60, 0, -0.86], [nx + 0.03, 0, nz + 0.55], 0.03, 6));       /* drag brace */
    for (s = -1; s <= 1; s += 2) G.metal.push(box(0.08, 0.025, 0.30, nx, s * 0.10, nz + 0.12));   /* fork */
    G.tyre.push(cyl(nr, nr, 0.16, 20, "y", nx, 0, nz));
    G.metal.push(cyl(nr * 0.55, nr * 0.55, 0.17, 12, "y", nx, 0, nz));
    G.dark.push(box(0.90, 0.025, 0.30, nx + 0.15, 0.22, -1.02));                     /* bay doors */
    G.dark.push(box(0.90, 0.025, 0.30, nx + 0.15, -0.22, -1.02));
    var mx = -1.80, mr = 0.365, mz = GROUND + mr, my = 1.30;
    for (s = -1; s <= 1; s += 2) {
      G.metal.push(bar([mx + 0.05, s * 0.78, -0.72], [mx, s * (my - 0.14), mz + 0.10], 0.075, 10));
      G.metal.push(bar([mx - 0.80, s * 0.80, -0.70], [mx - 0.02, s * (my - 0.16), mz + 0.55], 0.035, 6));
      G.metal.push(cyl(0.05, 0.05, 0.22, 8, "y", mx, s * (my - 0.09), mz));
      G.tyre.push(cyl(mr, mr, 0.24, 26, "y", mx, s * my, mz));
      G.metal.push(cyl(mr * 0.55, mr * 0.55, 0.25, 14, "y", mx, s * my, mz));
      G.dark.push(place(new V.BoxGeometry(1.20, 0.025, 0.55), mx + 0.10, s * 0.92, -1.08, s * 0.35, 0, 0));   /* leg door */
    }
    mesh(gr, G.metal, T.metal, "gear_metal");
    mesh(gr, G.tyre, T.tyre, "gear_tyres");
    mesh(gr, G.dark, T.dark, "gear_dark");
    return g;
  }

  return { build: function (THREE, M, C) { return buildAirframe(THREE, C); } };
})();

/* len is the measured X extent: pitot tip (8.56) to the fin tip's trailing
   edge (-8.54). The J-10B (2014) of the row's name is not drawn separately:
   no three-view of it was found, and the brief forbids drawing what no
   reference shows; the J-10A airframe stands for the row. */
UNIT_MODELS["pla_e00_fighter"] = { len: 17.10, build: HeroJ10.build };
