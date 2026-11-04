/* ============================================================================
   deu_cas.js  --  HERO models: the two Luftwaffe close-support jets
                   deu_e60_cas "Fiat G.91"     Fiat G.91 R/3          (HeroG91)
                   deu_e80_cas "Alpha Jet A"   Dassault/Dornier
                                               Alpha Jet A            (HeroAlphaJet)
   ----------------------------------------------------------------------------
   Full-quality hero models, 2026-11-04. Neither row had a model of its own
   (no G.91 or Alpha Jet in js/hero; both rows borrowed the A-10 "bomber_n"
   as their same-role peer). The kit is fr_jaguar.js's (lofted sections,
   spanwise aerofoil surfaces, canvas camouflage, merge by material), shared
   by the two builders below.

   ========================================================== FIAT G.91 R/3 ==
   References (Wikimedia Commons, fetched for this file, cached in the
   scratchpad q_deucas_ref folder):
     GD "Fiat G.91 R-3.svg" (1375 x 2518 px render): side view (nose left,
        ground line drawn tilted under the wheels), front view and plan
        (nose up). Every station is read off GD on a pixel grid:
          side   x = (687 - px) / 130.5   nose tip px 15 -> +5.15, tailplane
                                          tip px 1359 -> -5.15: 1344 px = the
                                          published 10.30 m
                 z = (300 - row) / 130.5  (z = 0 near the nose tip)
          front  the same 130.5 px/m gives a span of 8.61 m (published 8.56,
                 +0.6 %): side and front share one scale.
          plan   drawn smaller: nose tip row 1171 to tailplane tip row 2458
                 = 10.27 m at 125.3 px/m, and the wing tips 1076 px apart =
                 8.59 m at the same 125.3 px/m, so the plan is uniform and
                 x = 5.15 - (row - 1171) / 125.3, y = (687 - px) / 125.3.
                 (GD's plan also draws a spike behind the tail at row 2491
                 that no side-view part reaches; it is ignored.)
        Read off GD: the nose cone and the chin intake, the fuselage sides
        and depth, the canopy, the spine and dorsal fillet, the fin, the
        tailplane (flat, z 0.22), the wing planform (leading edge 41 deg,
        trailing edge 26 deg, 1.2 deg dihedral, root chord 2.40 m), the
        nozzle under the tail cone, the pylon stations (front view and plan
        agree: 2.03 / 2.05 m and 2.80 / 2.83 m out), the gun fairing, both
        wheels and the main track (+-1.25 m, front view).
     G1 "Fiat G-91-R3 3267 LEKG 43 CHIV 07.08.71 edited-2.jpg" - a Luftwaffe
        R/3 of LeKG 43 in 1971, near profile from port: the camouflage (grey
        and olive disruptive upper surfaces and flanks), the blunt camera
        nose with its dark side window, the single gun fairing low on the
        nose side ahead of the wing (the LOWER of the two blisters GD draws),
        a drop tank on the inboard pylon, the tall nose leg.
     G2 "Gatow Fiat G91 (2009).jpg" - head-on (Luftwaffenmuseum): the big
        oval chin intake wrapped under the round nose, the round forward
        camera window in the nose cone, the light aluminium undersides, a
        drop tank inboard and a 19-tube rocket pod outboard on each wing,
        the main legs and their doors, the near-flat wing.
     G3 "Fiat G91R DX.jpg" - an Italian R/1 (the same camera nose and
        airframe) in bare metal, very nearly side-on from starboard, flying
        condition: the stance (see NOT CONFIRMED), the nose window, the
        canopy and its fairing, the big main-leg fairing.
     G4 "Fiat G.91R 3 -32+77- (53728379279).jpg" - ex-Luftwaffe R/3 in
        Portugal from port front: the DEFA barrel stub ahead of the gun
        fairing, the intake lip, the tanks.
     G5 "Fiat G.91 R3 99+12 (11591996305).jpg" - preserved Luftwaffe R/3:
        the grey-green / olive scheme in colour (3/4 rear).
     en.wikipedia "Fiat G.91" (specs, G.91R, Profile Publications): length
        10.30 m, span 8.56 m, height 4.00 m, wing area 16.4 m2; one Orpheus
        803; R/3: two 30 mm DEFA cannon; four underwing pylons; nose "with
        three cameras"; air intake chin-mounted under the cockpit; rocket
        pods (Matra, 19 x SNEB), drop tanks.

   Recognition list (each in the model, source in brackets):
     1. small swept low-mid wing, leading edge 41 deg, straight trailing
        edge, oblique tips, 1.2 deg dihedral (GD plan and front, G2).
     2. the R/3 camera nose: a blunt round cone with the forward camera
        window in its tip and small side windows (GD, G1, G2, G3).
     3. the big oval chin intake under the nose (GD front, G2, G4).
     4. bubble canopy on a raised cockpit, the hood fairing back into the
        spine (GD, G1, G3).
     5. tall swept fin on a long dorsal fillet; flat tailplane low on the
        tail cone (GD, G1, G3).
     6. ONE jet pipe, at the bottom of the tail under the tail cone (GD, G3).
     7. tall tricycle gear: nose leg well forward, main wheels outboard in
        big leg fairings (GD, G2, G3).  [gear]
     8. one DEFA gun fairing and barrel low on each nose side (G1, G4).
     9. four pylons: drop tanks inboard, 19-tube rocket pods outboard (G2;
        G1 tank inboard).
    10. paint: olive and grey disruptive upper surfaces and flanks over
        light aluminium undersides (G1, G2, G5). No crosses, codes, badges.

   NOT CONFIRMED (G.91):
     - THE HEIGHT AND STANCE. GD draws the airframe level and the ground
       tilted under the wheels: on level ground the aircraft sits 3.2-3.5 deg
       nose-up (nose wheel 0.18 m lower than the main wheels in the airframe
       datum). Measured from GD, the fin top stands 4.02 m above the
       NOSE-wheel ground in the datum frame (= the published 4.00 m, which
       is evidently quoted that way), 3.88 m above the MAIN-wheel ground,
       and 3.61 m perpendicular to the tilted ground. Checked on G3 (truly
       near side-on), with ratios taken at one station so the camera drops
       out: nose-wheel station, belly-to-ground / fuselage depth G3 0.72,
       GD 0.77; wheel diameter / depth G3 0.33, GD 0.35; tail station, fin
       top over tailplane / tailplane over belly G3 1.99, G1 2.14, GD 2.16;
       fin top over ground / max depth at the cockpit G3 2.04, GD (tilted
       ground) 2.05, GD (level on the main wheels) 2.20. So GD's stance is
       right, the parked aircraft stands about 3.65 m, and the 4.00 m is a
       datum-level figure (fin top over the nose-wheel ground with the
       datum level). The model is built on GD's datum with both gear legs
       at their drawn lengths, then pitched nose-up about the main-wheel
       contact until both tyres touch one level ground: 3.5 deg from GD's
       drawn tyres (GD's ground line itself is 3.2 deg). It stands 3.55 m
       (fin top over the ground) and its X extent is 10.35 m.
     - Wing area from GD's plan is about 15.0 m2 against the published 16.4;
       GD is kept (the span and both sweeps are GD's).
     - The intake mouth's depth inside the lip and the duct are drawn dark,
       not modelled.
     - The tank (3.0 m x 0.52 m) and pod (2.4 m x 0.42 m) sizes are scaled
       off G1 and G2 only roughly; the pylon outline is GD's side view.
     - The upper of the two blisters GD draws on the nose side (the R/1's
       machine-gun troughs, as G3 shows two slots a side) is not drawn: G1
       and G4 show one gun fairing, low.
     - Camouflage pattern: generic disruptive blobs in G1 / G5's two
       colours, not a copy of a pattern drawing; demarcation from G2.
     Not drawn: the side-view panel lines GD draws, the airbrakes, the
     upper-wing marking GD shows at y 1.13 m (the front view shows nothing
     standing above the wing there, so it is not a fence), aerials.

   Paint (G.91): G1 olive ~(72,57,52) and grey-green ~(68,80,79) in wet
   light, G5 ~(128,136,108) / ~(121,108,88) at sunset; taken for the ACES
   pass as olive #5f5c43 and grey #5a6461; underside aluminium #aeb1ad (G2).

   ========================================================== ALPHA JET A ==
   References:
     AD "Dassault-Dornier Alpha Jet 3-view line drawing.svg" (1808 x 1473
        px render): side view (nose left, ground lines and wheel circles
        drawn faint), plan (nose left) and front view (drawn on its side,
        fin to the right). ONE scale for all three views: the plan's wing
        tips 972 px apart = the published 9.11 m -> 106.7 px/m;
          x = (700 - px) / 106.7, z = (400 - row) / 106.7 (z = 0 on the flat
          belly), y = (963 - row) / 106.7 in the plan.
        AD is the French Alpha Jet E: its nose is the rounded trainer nose
        (11.95 m long at that scale). Checked against the published height:
        fin top row 29 over the ground line row 475 = 4.18 m (published
        4.19). Read off AD: everything aft of the windscreen base - the
        tandem canopy, the slab-sided fuselage, the engine nacelles and
        their tall side intakes, the nozzles, the shoulder wing (leading
        edge 34 deg, the trailing edge swept 13 deg, rounded tips, 5.3 deg
        anhedral on the chord line from the front view), the tailplane
        (13 deg anhedral, front view), the fin, the tail cone, the spine
        aerial, the wheel places (nose x 4.55, main x -0.09, track
        +-1.34 m) and sizes (0.41 m and 0.60 m).
     A1 "40+48 Dassault-Dornier Alpha Jet A Luftwaffe. (6947597570).jpg" -
        from starboard: the three-tone wraparound camouflage, a drop tank
        on the inboard pylon, the long pod on the centreline between the
        main legs, the spine aerial, the stepped tandem canopy.
     A2 "40+56 ... RIAT 1993. (7005052450).jpg" - from starboard front: the
        A's long pointed nose with a short probe at the tip, the side
        intakes, two pylons a wing, tanks.
     A3 "German Air Force (41+71) Dassault-Dornier Alpha Jet A.jpg" - from
        port front, canopies open: the pointed nose, the nozzle at the end
        of the nacelle under the wing root, the drooping tailplane, the
        gear, the camouflage on the belly (wraparound).
     A4 "Alpha Jet der Luftwaffe.jpg" - museum, port front: the nose leg
        well behind the windscreen base, under the front cockpit.
     A5 "Dornier Alpha Jet A '15224' (53857024988).jpg" - an ex-Luftwaffe A
        in Portugal: the whole pointed nose in profile, the tank inboard.
     en.wikipedia "Dassault/Dornier Alpha Jet" (Jane's 1982-83 and Flight,
        close-support version): length 13.23 m, span 9.11 m, height 4.19 m,
        wing area 17.5 m2; two Larzac 04; five hardpoints (four under the
        wings, one centreline); the Mauser BK-27 in a centreline gun pod;
        two 310 L drop tanks; German aircraft "a sharp, pointed nose".

   Recognition list (Alpha Jet A):
     1. shoulder wing with marked anhedral, the leading edge swept, the tips
        rounded (AD, A1-A3, A5).
     2. tandem cockpits under a long stepped canopy, the rear seat raised
        (AD, A1, A3).
     3. the German A's long, sharp conical nose with a short probe (A2, A3,
        A5, published), not the E's round trainer nose.
     4. the engine nacelles on the fuselage sides under the wing roots, with
        tall D-shaped intakes ahead of the wing (AD, A2, A4) and a nozzle at
        the back of each nacelle under the wing trailing edge (AD, A3).
     5. tailplane with strong anhedral low on the tail cone (AD, A3).
     6. tall swept fin with the dorsal fillet (AD, A1, A3).
     7. the BK-27 gun pod on the centreline (published; A1).
     8. drop tanks on the inboard pylons, the outboard pylons bare (A1, A2,
        A5).
     9. short stalky tricycle gear, main wheels outboard of the nacelles
        (AD, A3).  [gear]
    10. paint: three-tone wraparound dark green / olive / grey (A1, A3,
        A4). No crosses, codes or badges.

   NOT CONFIRMED (Alpha Jet A):
     - THE NOSE. AD draws the E. The A's nose is drawn from AD's windscreen
       base forward as a straight cone with its tip at 0.30 of the depth
       above the belly (A3 0.31, AD's E 0.30, both measured at the
       windscreen station) and a 0.35 m probe (the probe is a short spike
       in A2 and A3). Its LENGTH is set by the published 13.23 m, not
       measured: no true profile of an A was found. Nose length / depth at
       the windscreen: model 2.73; A5 (from ahead of the beam, corrected
       for an estimated 35 deg yaw) about 2.9; A3 (yaw estimated 23 deg
       from the wheelbase) about 2.0. The two photographs disagree, so the
       published figure stands.
     - The pylon stations (1.95 and 2.95 m out) are estimated from A2;
       AD's plan does not draw pylons. Tank (3.0 m x 0.44 m) and gun pod
       (2.7 m x 0.40 m) sizes are estimated, not measured.
     - The main legs' geometry (A3, oblique) and the doors.
     - The camouflage pattern is generic, in A1 / A3's colours.
     - AD's two small leading-edge steps (dog-teeth) are painted lines only.
     Not drawn: the arrester hook, the airbrakes, the AoA vane on the
     nose, flap-track fairings, the anti-collision light on the fin.

   Paint (Alpha Jet A): A3 grey ~(115,128,148) in hard sun, nose green
   ~(65,70,61), A1 green ~(102,119,99) overcast; ACES pass: green #4b5643,
   olive #6c6b4c, grey #5d6568, wraparound.

   Materials (each): body, wing, fin (canvas skins), team, metal, hot, ink,
   glass, store; the gear group repeats its own.
   Nodes: "gear" (landing gear; the engine hides it in flight).
   Model space: +X nose, +Y port, +Z up, metres. G.91: built with z = 0
   GD's datum near the nose tip, then pitched 3.5 deg nose-up about the
   main-wheel contact (x -0.31, z -1.62); the wheels on z -1.62. Alpha Jet: z = 0
   is the flat belly, the wheels on z -0.70.
   ========================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroG91, HeroAlphaJet;

(function () {
  "use strict";

  var D2R = Math.PI / 180;
  var PI = Math.PI;
  var HALF_PI = PI / 2;
  var SKIN_R = 0.80, SKIN_M = 0.10;

  /* ============================================================ shared kit */
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvas(W, H) {
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H; return cv;
  }
  function texOf(THREE, cv) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    return t;
  }
  /* disruptive camouflage: a base field and soft-edged blobs of each
     further colour (stylised; the photographs give the colours) */
  function camo(g, x0, y0, W, H, R, cols, n, sc) {
    g.fillStyle = cols[0]; g.fillRect(x0, y0, W, H);
    for (var c = 1; c < cols.length; c++) {
      g.fillStyle = cols[c];
      for (var i = 0; i < n; i++) {
        var cx = x0 + R() * W, cy = y0 + R() * H, rx = (50 + R() * 90) * sc, ry = (26 + R() * 50) * sc;
        g.beginPath();
        for (var k = 0; k <= 14; k++) {
          var a = k / 14 * PI * 2, w = 0.75 + R() * 0.4;
          var px = cx + Math.cos(a) * rx * w, py = cy + Math.sin(a) * ry * w;
          px = Math.max(x0, Math.min(x0 + W, px)); py = Math.max(y0, Math.min(y0 + H, py));
          if (k === 0) g.moveTo(px, py); else g.lineTo(px, py);
        }
        g.closePath(); g.fill();
      }
    }
  }
  function seams(g, x0, y0, W, H, R, n) {
    var i;
    g.strokeStyle = "rgba(18,20,18,0.22)"; g.lineWidth = 1.2;
    for (i = 0; i < n; i++) {
      var px = x0 + R() * W, py = y0 + R() * H, L = 30 + R() * 110;
      g.beginPath();
      if (R() < 0.6) { g.moveTo(px, py); g.lineTo(Math.min(x0 + W, px + L), py); }
      else { g.moveTo(px, py); g.lineTo(px, Math.min(y0 + H, py + L * 0.5)); }
      g.stroke();
    }
    g.strokeStyle = "rgba(18,20,18,0.26)";
    for (i = 0; i < 14; i++) g.strokeRect(x0 + R() * W * 0.95, y0 + R() * H * 0.95, 10 + R() * 26, 8 + R() * 14);
  }

  /* fuselage sheet: u = (x0 - x) / L nose first; v = 0 port, 0.25 top,
     0.5 starboard, 0.75 belly. After flipY: port at canvas row H (and 0),
     top 0.75H, starboard 0.5H, belly 0.25H. P = the aircraft's paint. */
  function bodySheet(THREE, P) {
    if (P._body !== undefined) return P._body;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(P.seed);
      camo(g, 0, 0, W, H, R, P.cols, P.blobs, 1.0);
      if (P.under) {
        g.fillStyle = P.under;
        g.beginPath(); g.moveTo(0, H * P.dem0);
        for (var x = 0; x <= W; x += 32) g.lineTo(x, H * (P.dem0 + 0.015 * Math.sin(x * 0.03)));
        for (x = W; x >= 0; x -= 32) g.lineTo(x, H * (P.dem1 - 0.015 * Math.sin(x * 0.027)));
        g.closePath(); g.fill();
      }
      seams(g, 0, 0, W, H, R, 70);
      g.strokeStyle = "rgba(16,18,16,0.46)"; g.lineWidth = 2.0;
      P.breaks.forEach(function (bx) {
        var u = (P.x0 - bx) / P.len;
        g.beginPath(); g.moveTo(u * W, 0); g.lineTo(u * W, H); g.stroke();
      });
      if (P.soot) {
        var a = (P.x0 - P.soot[0]) / P.len * W, b = (P.x0 - P.soot[1]) / P.len * W;
        var s = g.createLinearGradient(a, 0, b, 0);
        s.addColorStop(0, "rgba(34,32,28,0)"); s.addColorStop(1, "rgba(34,32,28,0.42)");
        g.fillStyle = s; g.fillRect(a, 0, b - a, H);
      }
      /* a clean spot for small parts (pinUV) */
      g.fillStyle = P.under || P.cols[0]; g.fillRect(W * 0.975, H * 0.94, W * 0.025, H * 0.06);
      P._body = texOf(THREE, cv);
    } catch (e) { P._body = null; }
    return P._body;
  }
  /* wing / tailplane sheet: planform u over [wx0, wx1], upper surface in
     v 0.5-1, lower in 0-0.5 (span over [0, ws]). P.wlines(g, U, V) draws
     the control-surface lines. */
  function wingSheet(THREE, P) {
    if (P._wing !== undefined) return P._wing;
    try {
      var W = 1024, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(P.seed + 17);
      var U = function (x) { return (x - P.wx0) / (P.wx1 - P.wx0) * W; };
      var VU = function (y) { return (1 - (0.5 + 0.5 * y / P.ws)) * H; };
      var VL = function (y) { return (1 - 0.5 * y / P.ws) * H; };
      camo(g, 0, 0, W, H / 2, R, P.cols, Math.round(P.blobs * 0.6), 0.9);
      if (P.under) { g.fillStyle = P.under; g.fillRect(0, H / 2, W, H / 2); }
      else camo(g, 0, H / 2, W, H / 2, R, P.cols, Math.round(P.blobs * 0.6), 0.9);
      seams(g, 0, 0, W, H, R, 40);
      [VU, VL].forEach(function (V) { P.wlines(g, U, V); });
      g.fillStyle = P.under || P.cols[0]; g.fillRect(W * 0.975, H * 0.94, W * 0.025, H * 0.06);
      P._wing = texOf(THREE, cv);
    } catch (e) { P._wing = null; }
    return P._wing;
  }
  /* fin sheet: u along x over [fx0, fx1], v up z over [fz0, fz1] */
  function finSheet(THREE, P) {
    if (P._fin !== undefined) return P._fin;
    try {
      var W = 512, H = 512, cv = canvas(W, H), g = cv.getContext("2d"), R = rngFor(P.seed + 41);
      var U = function (x) { return (x - P.fx0) / (P.fx1 - P.fx0) * W; };
      var V = function (z) { return (1 - (z - P.fz0) / (P.fz1 - P.fz0)) * H; };
      camo(g, 0, 0, W, H, R, P.cols, 6, 0.9);
      seams(g, 0, 0, W, H, R, 18);
      P.flines(g, U, V);
      P._fin = texOf(THREE, cv);
    } catch (e) { P._fin = null; }
    return P._fin;
  }

  function materials(THREE, C, P) {
    function sk(tex, fall) {
      var m = new THREE.MeshStandardMaterial({
        color: 0xffffff, roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide });
      if (tex) m.map = tex; else m.color.set(fall);
      return m;
    }
    return {
      body: sk(bodySheet(THREE, P), P.cols[0]),
      wing: sk(wingSheet(THREE, P), P.cols[0]),
      fin: sk(finSheet(THREE, P), P.cols[0]),
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0xd03f3f),
        roughness: SKIN_R, metalness: SKIN_M, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({
        color: 0x666b6e, roughness: 0.50, metalness: 0.55, side: THREE.DoubleSide }),
      hot: new THREE.MeshStandardMaterial({
        color: 0x3b3733, roughness: 0.58, metalness: 0.50, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({
        color: 0x08090a, roughness: 0.95, metalness: 0.03, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x2a3a40, roughness: 0.12, metalness: 0.30, clearcoat: 0.35,
        transparent: true, opacity: 0.80, side: THREE.DoubleSide }),
      store: new THREE.MeshStandardMaterial({
        color: new THREE.Color(P.store), roughness: 0.62, metalness: 0.12, side: THREE.DoubleSide }),
    };
  }

  /* loft: sections {x, w, zt, zb, zw, e, yc}: half width w at height zw,
     top zt, bottom zb, each half a superellipse of exponent e. Nose
     first. bodyP: the paint whose fuselage u to use (else 0..1). */
  function loft(THREE, secs, segs, bodyP) {
    var pos = [], uv = [], idx = [];
    var x0 = secs[0].x, x1 = secs[secs.length - 1].x;
    for (var i = 0; i < secs.length; i++) {
      var s = secs[i], e = s.e || 1, zw = s.zw === undefined ? (s.zt + s.zb) / 2 : s.zw;
      for (var j = 0; j <= segs; j++) {
        var t = j / segs * PI * 2, cy = Math.cos(t), sz = Math.sin(t);
        var y = (s.yc || 0) + s.w * Math.sign(cy) * Math.pow(Math.abs(cy), e);
        var dz = (sz >= 0 ? (s.zt - zw) : (zw - s.zb)) * Math.sign(sz) * Math.pow(Math.abs(sz), e);
        pos.push(s.x, y, zw + dz);
        uv.push(bodyP ? (bodyP.x0 - s.x) / bodyP.len : (x1 === x0 ? 0 : (s.x - x0) / (x1 - x0)), j / segs);
      }
    }
    var ring = segs + 1;
    for (i = 0; i < secs.length - 1; i++)
      for (j = 0; j < segs; j++) {
        var a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function pinUV(geo) {
    var u = geo.attributes.uv;
    if (u) for (var j = 0; j < u.count; j++) u.setXY(j, 0.985, 0.97);
    return geo;
  }
  function S(x, zt, zb, w, zw, e) { return { x: x, w: w, zt: zt, zb: zb, zw: zw, e: e || 1 }; }
  function O(x, r, zc, yc) { return { x: x, w: r, zt: zc + r, zb: zc - r, zw: zc, e: 1, yc: yc || 0 }; }
  function Y(x, yc, w, zt, zb, zw, e) { return { x: x, yc: yc, w: w, zt: zt, zb: zb, zw: zw, e: e || 1 }; }
  function withYc(sec, yc) { var c = {}; for (var k in sec) c[k] = sec[k]; c.yc = yc; return c; }

  /* lifting surface lofted spanwise through stations {s, le, te, t, h};
     vert: span along +Z; mirror: Y -> -Y; split: upper surface in v 0.5-1 */
  function foil(xc) { return Math.pow(xc, 0.75) * (1 - xc) / 0.3027; }
  function surf(THREE, sts, opt) {
    var K = 10, pos = [], uv = [], idx = [], ring = 2 * K;
    var box = opt.box;
    for (var i = 0; i < sts.length; i++) {
      var st = sts[i];
      for (var k = 0; k < ring; k++) {
        var up = k <= K, kk = up ? k : 2 * K - k;
        var xc = (1 - Math.cos(PI * kk / K)) * 0.5;
        var ht = (Math.max(0.003, st.t * 0.5 * foil(xc)) + (st.pad || 0)) * (up ? 1 : -1);
        if (k === 0 || k === K) ht = 0;
        var X = st.le - xc * (st.le - st.te);
        var Sp = st.s, Z = st.h + ht;
        var v = (Math.abs(Sp) - box.s0) / (box.s1 - box.s0);
        if (opt.split) v = up ? 0.5 + 0.5 * v : 0.5 * v;
        uv.push((X - box.x0) / (box.x1 - box.x0), v);
        if (opt.vert) pos.push(X, -Z, Sp); else pos.push(X, Sp, Z);
      }
    }
    var flip = (sts[sts.length - 1].s < sts[0].s) !== !!opt.mirror;
    function tri(a, b, c) { if (flip) idx.push(a, c, b); else idx.push(a, b, c); }
    for (i = 0; i < sts.length - 1; i++)
      for (k = 0; k < ring; k++) {
        var a = i * ring + k, b = i * ring + (k + 1) % ring;
        var c = a + ring, d = b + ring;
        tri(a, c, b); tri(b, c, d);
      }
    var last = sts.length - 1, base = last * ring, cx = 0, cy = 0, cz = 0;
    for (k = 0; k < ring; k++) { cx += pos[(base + k) * 3]; cy += pos[(base + k) * 3 + 1]; cz += pos[(base + k) * 3 + 2]; }
    var ci = pos.length / 3;
    pos.push(cx / ring, cy / ring, cz / ring);
    uv.push(uv[base * 2], uv[base * 2 + 1]);
    for (k = 0; k < ring; k++) tri(ci, base + (k + 1) % ring, base + k);
    if (opt.mirror) for (i = 1; i < pos.length; i += 3) pos[i] = -pos[i];
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  var THREE_ = null;
  function add(g, geo, mat, x, y, z) {
    var m = new THREE_.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    g.add(m);
    return m;
  }
  function rod(g, mat, r, a, b, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE_.Mesh(new THREE_.CylinderGeometry(r, r, L, seg || 6), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE_.Vector3(0, 1, 0), new THREE_.Vector3(dx / L, dy / L, dz / L));
    g.add(m);
    return m;
  }
  /* a tube along X: r0 at the front end xf, r1 at the back xb */
  function xtube(g, mat, r0, r1, xf, xb, y, z, seg, open) {
    var m = new THREE_.Mesh(new THREE_.CylinderGeometry(r1, r0, xf - xb, seg, 1, !!open), mat);
    m.rotation.z = HALF_PI;
    m.position.set((xf + xb) / 2, y, z);
    g.add(m);
    return m;
  }
  /* a wheel: axle along Y */
  function wheel(g, T, x, y, z, r, w) {
    add(g, new THREE_.CylinderGeometry(r, r, w, 20), T.ink, x, y, z);
    add(g, new THREE_.CylinderGeometry(r * 0.52, r * 0.52, w + 0.01, 12), T.metal, x, y, z);
  }
  /* a flat plate in the XZ plane at y, outline [[x, z]...], twin at y + dy */
  function plate(g, mat, pts, y, dy) {
    var shp = new THREE_.Shape();
    shp.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) shp.lineTo(pts[i][0], pts[i][1]);
    shp.lineTo(pts[0][0], pts[0][1]);
    [0, dy].forEach(function (o) {
      var fg = new THREE_.ShapeGeometry(shp);
      fg.rotateX(HALF_PI);
      var u = fg.attributes.uv;
      for (var j = 0; j < u.count; j++) u.setXY(j, 0.985, 0.97);
      add(g, fg, mat, 0, y + o, 0);
    });
  }
  /* an ogive-nosed store along X: nose at xn, length L, radius R, centre
     (y, z); nf the fraction of the length in the nose, tf in the tail */
  function storeBody(THREE, g, mat, xn, L, R, y, z, nf, tf, blunt) {
    var secs = [], i;
    for (i = 0; i <= 6; i++) {
      var f = i / 6, r = R * Math.sqrt(1 - Math.pow(1 - f, 2));
      secs.push(O(xn - f * nf * L, Math.max(blunt || 0.01, r), z, y));
    }
    secs.push(O(xn - (1 - tf) * L, R, z, y));
    for (i = 1; i <= 4; i++) {
      var q = i / 4;
      secs.push(O(xn - (1 - tf + tf * q) * L, Math.max(0.02, R * (1 - 0.8 * q * q)), z, y));
    }
    g.add(new THREE.Mesh(loft(THREE, secs, 18), mat));
  }

  function mergeByMaterial(THREE, root, m0) {
    var main = { order: [], by: {} }, gear = { order: [], by: {} };
    (function walk(node, pm, inGear) {
      for (var i = 0; i < node.children.length; i++) {
        var c = node.children[i];
        c.updateMatrix();
        var m = pm.clone().multiply(c.matrix);
        var ing = inGear || c.name === "gear";
        if (c.isMesh) {
          var b = ing ? gear : main, key = c.material.uuid;
          if (!b.by[key]) { b.by[key] = { mat: c.material, parts: [] }; b.order.push(key); }
          var geo = c.geometry.index ? c.geometry.toNonIndexed() : c.geometry.clone();
          if (!geo.attributes.normal) geo.computeVertexNormals();
          geo.applyMatrix4(m);
          b.by[key].parts.push(geo);
        } else walk(c, m, ing);
      }
    })(root, m0 || new THREE.Matrix4(), false);
    function emit(bucket, into) {
      for (var i = 0; i < bucket.order.length; i++) {
        var e = bucket.by[bucket.order[i]], n = 0, k, o = 0;
        for (k = 0; k < e.parts.length; k++) n += e.parts[k].attributes.position.count;
        var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2);
        for (k = 0; k < e.parts.length; k++) {
          var a = e.parts[k].attributes;
          P.set(a.position.array, o * 3);
          N.set(a.normal.array, o * 3);
          if (a.uv) U.set(a.uv.array, o * 2);
          o += a.position.count;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
        geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
        geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
        into.add(new THREE.Mesh(geo, e.mat));
      }
    }
    var out = new THREE.Group();
    emit(main, out);
    var gr = new THREE.Group();
    gr.name = "gear";
    emit(gear, gr);
    out.add(gr);
    return out;
  }

  /* ====================================================================
     FIAT G.91 R/3
     ==================================================================== */
  var G = {};
  /* the wing (GD plan): leading edge from the root (y 0.72, x 1.40) to
     (4.25, -1.75); trailing edge from (0.72, -1.00) to the tip corner
     (4.09, -2.68); the oblique tip out to y 4.29; chord plane z -0.42 at
     the root (GD side: the wing lens, rows 344-361), 1.2 deg dihedral (GD
     front: upper surface 9 px up over 440 px); t/c 12 % root, 11 % tip
     (published NACA 65A112 / 65A111). */
  G.WZ = -0.42; G.TAN_DIH = Math.tan(1.2 * D2R); G.SEMI = 4.29;
  G.wle = function (y) { return 1.40 - 0.8924 * (y - 0.72); };
  G.wte = function (y) {
    if (y <= 4.09) return -1.00 - 0.4985 * (y - 0.72);
    return -2.68 + (y - 4.09) / 0.20 * 0.73;      /* the oblique tip */
  };
  G.wz = function (y) { return G.WZ + (Math.abs(y) - 0.72) * G.TAN_DIH; };
  G.PAINT = {
    seed: 9161, cols: ["#5f5c43", "#5a6461"], blobs: 22, under: "#aeb1ad",
    dem0: 0.10, dem1: 0.40, store: "#a9aca8",
    x0: 5.20, len: 10.4, breaks: [4.20, 3.70, 1.45, -1.48, -3.10], soot: [-3.6, -4.5],
    wx0: -5.3, wx1: 1.6, ws: 4.40,
    wlines: function (g, U, V) {
      /* flap (y 0.72-2.55) and aileron (2.55-4.0) hinge lines, a fifth of
         the chord ahead of the trailing edge (GD plan) */
      g.strokeStyle = "rgba(14,16,14,0.55)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(U(-0.55), V(0.72)); g.lineTo(U(-1.42), V(2.55)); g.lineTo(U(-2.05), V(4.0)); g.stroke();
      g.beginPath(); g.moveTo(U(-1.42), V(2.55)); g.lineTo(U(-1.92), V(2.55)); g.stroke();
      /* tailplane elevator hinge */
      g.beginPath(); g.moveTo(U(-4.10), V(0.35)); g.lineTo(U(-4.70), V(1.70)); g.stroke();
    },
    fx0: -5.3, fx1: -1.2, fz0: 0.2, fz1: 2.3,
    flines: function (g, U, V) {
      /* rudder hinge (GD side, px 1300-1345) */
      g.strokeStyle = "rgba(14,16,14,0.58)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(U(-4.62), V(0.45)); g.lineTo(U(-4.95), V(1.95)); g.stroke();
    },
  };

  /* BODY -- GD side (top, bottom) and plan half widths, from the intake
     lip plane (x 4.20, px 139) to the jet-pipe exit (x -4.45, px 1268).
     The front ring is the intake lip; the nose cone is a loft of its own. */
  G.BODY = [
    S( 4.20,  0.30, -0.72, 0.48, -0.30, 0.90),
    S( 4.04,  0.33, -0.75, 0.53, -0.28, 0.90),
    S( 3.80,  0.36, -0.77, 0.56, -0.25, 0.88),
    S( 3.64,  0.37, -0.78, 0.63, -0.22, 0.86),
    S( 3.00,  0.38, -0.82, 0.66, -0.20, 0.86),
    S( 2.40,  0.40, -0.86, 0.68, -0.20, 0.86),
    S( 1.40,  0.42, -0.88, 0.70, -0.20, 0.86),
    S( 0.50,  0.53, -0.88, 0.70, -0.20, 0.86),
    S(-0.50,  0.55, -0.88, 0.70, -0.20, 0.86),
    S(-1.48,  0.50, -0.85, 0.66, -0.18, 0.86),
    S(-2.40,  0.38, -0.80, 0.60, -0.18, 0.88),
    S(-3.20,  0.31, -0.77, 0.54, -0.20, 0.90),
    S(-3.60,  0.29, -0.66, 0.46, -0.20, 0.92),
    S(-4.00,  0.27, -0.60, 0.37, -0.20, 0.94),
    S(-4.30,  0.26, -0.56, 0.31, -0.20, 0.96),
    S(-4.45,  0.25, -0.53, 0.29, -0.20, 0.96),
  ];
  /* NOSE CONE -- GD side px 15-160 and plan; blunt round tip carrying the
     forward camera window (G2), its underside the intake's upper lip */
  G.NOSE = [
    S( 5.15,  0.08, -0.04, 0.05, 0.02),
    S( 5.12,  0.11, -0.10, 0.10, 0.01),
    S( 5.07,  0.13, -0.18, 0.14, -0.02),
    S( 4.96,  0.16, -0.25, 0.17, -0.04),
    S( 4.80,  0.19, -0.27, 0.21, -0.04),
    S( 4.65,  0.21, -0.29, 0.25, -0.04),
    S( 4.50,  0.24, -0.31, 0.29, -0.04),
    S( 4.34,  0.27, -0.34, 0.33, -0.04),
    S( 4.15,  0.30, -0.36, 0.38, -0.04),
    S( 3.95,  0.33, -0.38, 0.42, -0.04),
  ];
  /* TAIL CONE above the pipe (GD side px 1268-1320) */
  G.CONE = [
    S(-4.30, 0.26, -0.04, 0.30, 0.11, 0.94),
    S(-4.55, 0.25, -0.01, 0.26, 0.12, 0.96),
    S(-4.75, 0.21,  0.04, 0.17, 0.12),
    S(-4.90, 0.17,  0.08, 0.06, 0.12),
  ];
  G.PIPE_X = -4.45; G.PIPE_Z = -0.27; G.PIPE_R = 0.26;
  /* CANOPY -- GD side: windscreen base px 215 (x 3.62, z 0.37), hood crown
     z 0.87 at px 380, glazing to px 500 (x 1.45); half width 0.41 (plan) */
  G.CANOPY = [
    S( 3.62, 0.40, 0.35, 0.22, 0.37, 0.90),
    S( 3.40, 0.50, 0.35, 0.33, 0.38, 0.90),
    S( 3.15, 0.62, 0.35, 0.38, 0.40, 0.90),
    S( 2.95, 0.74, 0.35, 0.40, 0.42, 0.90),
    S( 2.70, 0.84, 0.35, 0.41, 0.44, 0.90),
    S( 2.35, 0.87, 0.36, 0.41, 0.45, 0.90),
    S( 1.90, 0.84, 0.37, 0.40, 0.46, 0.90),
    S( 1.45, 0.76, 0.39, 0.37, 0.47, 0.90),
  ];
  /* the metal fairing behind the hood down into the spine (GD px 500-620) */
  G.FAIRING = [
    S( 1.50, 0.765, 0.39, 0.375, 0.47, 0.90),
    S( 1.00, 0.66, 0.42, 0.30, 0.50, 0.90),
    S( 0.55, 0.565, 0.50, 0.15, 0.53, 0.90),
    S( 0.30, 0.54, 0.52, 0.03, 0.53),
  ];
  /* FIN (GD side), stations {z, le, te}; the dorsal fillet is its low part */
  G.FIN = [[0.30, -1.20, -4.66], [0.40, -1.48, -4.68], [0.55, -1.67, -4.71], [0.80, -2.77, -4.76],
           [1.10, -3.43, -4.85], [1.60, -3.92, -4.99], [2.00, -4.28, -5.08], [2.17, -4.53, -5.03],
           [2.21, -4.70, -4.98]];
  /* TAILPLANE (GD plan), flat at z 0.22 (GD side and front) */
  G.TZ = 0.22;
  G.TAIL = [[0.28, -3.20, -4.38], [0.52, -3.38, -4.42], [1.20, -3.97, -4.75], [1.70, -4.40, -5.07],
            [1.82, -4.55, -5.14], [1.88, -4.72, -5.09]];
  G.GROUND = -1.62;      /* GD main-wheel contact, row 512 */
  /* the wheels as GD draws them (datum frame): nose 0.43 m at x 2.74 with
     its tyre on z -1.808 (row 536), mains 0.60 m at x -0.31 on z -1.62
     (row 512). The airframe is built on GD's datum and then pitched
     nose-up about the main-wheel contact until both tyres touch one level
     ground: atan(0.188 / 3.05) = 3.5 deg (GD's ground line 3.2 deg). */
  G.NX = 2.74; G.NR = 0.215; G.NZB = -1.808;
  G.MX = -0.31; G.MR = 0.30;
  G.PITCH = Math.atan2(G.GROUND - G.NZB, G.NX - G.MX);

  function g91Body(THREE, g, T) {
    var P = G.PAINT;
    g.add(new THREE.Mesh(loft(THREE, G.BODY, 40, P), T.body));
    g.add(new THREE.Mesh(loft(THREE, G.NOSE, 32, P), T.body));
    g.add(new THREE.Mesh(loft(THREE, G.CONE, 24, P), T.body));
    /* the forward camera window in the nose tip (G2) and the side windows
       (GD px 75-85; G1, G3) */
    var fw = add(g, new THREE.CylinderGeometry(0.075, 0.075, 0.02, 16), T.ink, 5.15, 0, 0.02);
    fw.rotation.z = HALF_PI;
    for (var s = -1; s <= 1; s += 2) {
      add(g, new THREE.BoxGeometry(0.11, 0.02, 0.10), T.ink, 4.68, s * 0.235, 0.00).rotation.x = s * 0.25;
    }
    /* INTAKE: the rolled lip inside the body's front ring, the dark duct
       behind it (GD front: mouth y +-0.45, z -0.30 to -0.70; G2) */
    var L0 = G.BODY[0];
    g.add(new THREE.Mesh(loft(THREE, [
      S(4.10, L0.zt - 0.05, L0.zb + 0.05, L0.w - 0.05, L0.zw, L0.e),
      S(4.23, L0.zt - 0.01, L0.zb + 0.01, L0.w - 0.01, L0.zw, L0.e),
      S(4.20, L0.zt, L0.zb, L0.w, L0.zw, L0.e)], 36, P), T.body));
    g.add(new THREE.Mesh(loft(THREE, [
      S(4.10, L0.zt - 0.05, L0.zb + 0.05, L0.w - 0.05, L0.zw, L0.e),
      S(3.70, 0.10, -0.64, 0.36, -0.30, 0.9),
      S(3.20, -0.20, -0.40, 0.04, -0.30)], 32), T.ink));
    /* the single Orpheus pipe: lip ring, dark pipe, flame holder (GD, G3) */
    g.add(new THREE.Mesh(loft(THREE, [
      O(-4.30, G.PIPE_R + 0.01, G.PIPE_Z), O(G.PIPE_X - 0.05, G.PIPE_R, G.PIPE_Z),
      O(G.PIPE_X - 0.07, G.PIPE_R - 0.03, G.PIPE_Z), O(G.PIPE_X + 0.03, G.PIPE_R - 0.05, G.PIPE_Z)], 24), T.hot));
    xtube(g, T.ink, G.PIPE_R - 0.05, G.PIPE_R - 0.09, G.PIPE_X + 0.03, -3.90, 0, G.PIPE_Z, 22, true);
    add(g, new THREE.CylinderGeometry(0.08, 0.12, 0.22, 12), T.hot, -4.05, 0, G.PIPE_Z).rotation.z = HALF_PI;
    /* the DEFA gun fairing low on each nose side (GD's lower blister, px
       255-410, z -0.31; G1), the barrel stub at its front (G4) */
    for (s = -1; s <= 1; s += 2) {
      var yy = s * 0.555;
      g.add(new THREE.Mesh(loft(THREE, [
        O(3.32, 0.015, -0.31, yy), O(3.18, 0.05, -0.31, yy + s * 0.01), O(2.90, 0.065, -0.31, yy + s * 0.025),
        O(2.40, 0.06, -0.31, yy + s * 0.045), O(2.12, 0.02, -0.31, yy + s * 0.04)], 12, P), T.body));
      xtube(g, T.metal, 0.022, 0.022, 3.55, 3.10, yy - s * 0.01, -0.31, 8);
      xtube(g, T.ink, 0.012, 0.012, 3.56, 3.50, yy - s * 0.01, -0.31, 8);
    }
  }

  function g91Cockpit(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, G.CANOPY, 28), T.glass));
    g.add(new THREE.Mesh(loft(THREE, G.FAIRING, 28, G.PAINT), T.body));
    /* coaming and sight, seat and headrest through the glass */
    add(g, new THREE.BoxGeometry(0.36, 0.52, 0.10), T.ink, 3.30, 0, 0.42);
    add(g, new THREE.BoxGeometry(0.08, 0.12, 0.12), T.metal, 3.22, 0, 0.52);
    add(g, new THREE.BoxGeometry(0.45, 0.46, 0.32), T.ink, 2.20, 0, 0.52);
    add(g, new THREE.BoxGeometry(0.16, 0.30, 0.28), T.ink, 1.98, 0, 0.75);
    /* windscreen arch and the hood's rear frame (GD) */
    var arch = add(g, new THREE.TorusGeometry(0.33, 0.02, 5, 20, PI), T.metal, 3.0, 0, 0.42);
    arch.rotation.set(HALF_PI, HALF_PI, 0);
    arch.scale.set(1.21, 0.96, 1.0);
    for (var s = -1; s <= 1; s += 2) {
      rod(g, T.metal, 0.015, [3.60, s * 0.22, 0.38], [3.00, s * 0.40, 0.44]);
      add(g, new THREE.BoxGeometry(2.1, 0.03, 0.04), T.metal, 2.50, s * 0.405, 0.37);
    }
  }

  function g91Wings(THREE, g, T) {
    var P = G.PAINT, WB = { x0: P.wx0, x1: P.wx1, s0: 0, s1: P.ws };
    var st = [0.30, 0.72, 1.5, 2.5, 3.5, 4.0, 4.20, 4.29].map(function (y) {
      var le = y < 0.72 ? G.wle(0.72) : (y > 4.25 ? -1.85 : G.wle(y)), te = y < 0.72 ? G.wte(0.72) : G.wte(y);
      if (y > 4.20) te = Math.min(te, le - 0.12);
      var tc = 0.12 - 0.01 * Math.min(1, Math.max(0, (y - 0.72) / 3.5));
      return { s: y, le: le, te: te, t: (le - te) * tc, h: G.wz(Math.max(0.72, y)) };
    });
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, split: true }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, split: true, mirror: true }), T.wing));
  }

  function g91Tail(THREE, g, T) {
    var P = G.PAINT, fs = [];
    G.FIN.forEach(function (f) {
      fs.push({ s: f[0], le: f[1], te: f[2], t: Math.max(0.035, Math.min(0.10, (f[1] - f[2]) * 0.06)), h: 0 });
    });
    g.add(new THREE.Mesh(surf(THREE, fs, { vert: true, box: { x0: P.fx0, x1: P.fx1, s0: 2 * P.fz0 - P.fz1, s1: P.fz1 } }), T.fin));
    var ts = G.TAIL.map(function (t) { return { s: t[0], le: t[1], te: t[2], t: (t[1] - t[2]) * 0.07, h: G.TZ }; });
    var TB = { x0: P.wx0, x1: P.wx1, s0: 0, s1: P.ws };
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, split: true }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, split: true, mirror: true }), T.wing));
  }

  /* pylons at y 2.05 and 2.83 (GD plan / front); their noses stand ahead
     of the leading edge (GD plan rows 1650 and 1785) */
  G.PYL = [{ y: 2.05, x0: 1.30, x1: -0.35 }, { y: 2.83, x0: 0.25, x1: -1.20 }];
  function g91Stores(THREE, g, T) {
    G.PYL.forEach(function (p, k) {
      for (var s = -1; s <= 1; s += 2) {
        var h = G.wz(p.y) - 0.10;
        plate(g, T.wing, [[p.x0 - 0.15, h + 0.05], [p.x0, h - 0.10], [p.x0 - 0.30, h - 0.24], [p.x1 + 0.12, h - 0.24], [p.x1, h + 0.05]],
              s * p.y + s * 0.035, -s * 0.07);
        var zc;
        if (k === 0) {
          /* the drop tank (G1, G2) */
          zc = h - 0.24 - 0.27;
          storeBody(THREE, g, T.store, p.x0 + 0.85, 3.0, 0.26, s * p.y, zc, 0.33, 0.30);
        } else {
          /* the 19-tube rocket pod (G2): blunt front with the tube mouths,
             a cylinder, a short tail cone */
          zc = h - 0.24 - 0.22;
          var xn = p.x0 + 0.45;
          storeBody(THREE, g, T.store, xn, 2.4, 0.21, s * p.y, zc, 0.06, 0.12, 0.17);
          add(g, new THREE.CylinderGeometry(0.17, 0.17, 0.02, 16), T.ink, xn + 0.005, s * p.y, zc).rotation.z = HALF_PI;
        }
      }
    });
  }

  /* GEAR -- nose wheel 0.43 m at x 2.74 (GD px 330) on its drawn leg;
     main wheels 0.60 m at x -0.31 (GD px 728), track +-1.25 m (GD front),
     each under a big leg fairing outboard (GD, G3). */
  function g91Gear(THREE, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var NX = G.NX, nr = G.NR, nz = G.NZB + nr;
    rod(gr, T.metal, 0.05, [2.88, 0, -0.84], [2.84, 0, nz + 0.30], 8);
    rod(gr, T.metal, 0.04, [2.84, 0, nz + 0.32], [NX, 0, nz], 8);
    rod(gr, T.metal, 0.025, [3.10, 0, -0.86], [2.86, 0, nz + 0.50], 6);
    for (var f = -1; f <= 1; f += 2) rod(gr, T.metal, 0.02, [2.84, f * 0.09, nz + 0.18], [NX, f * 0.09, nz], 6);
    wheel(gr, T, NX, 0, nz, nr, 0.15);
    for (var d = -1; d <= 1; d += 2) {
      var nd = add(gr, pinUV(new THREE.BoxGeometry(0.90, 0.02, 0.30)), T.body, 2.95, d * 0.20, -1.00);
      nd.rotation.x = d * 0.15;
    }
    var MX = G.MX, mr = G.MR, mz = G.GROUND + mr, TR = 1.25;
    for (var s = -1; s <= 1; s += 2) {
      rod(gr, T.metal, 0.065, [MX + 0.05, s * 1.02, G.wz(1.02) - 0.08], [MX, s * 1.06, mz + 0.10], 8);
      rod(gr, T.metal, 0.04, [MX - 0.35, s * 0.85, -0.80], [MX, s * 1.04, mz + 0.40], 6);
      rod(gr, T.metal, 0.04, [MX, s * 1.04, mz], [MX, s * (TR + 0.10), mz], 6);
      wheel(gr, T, MX, s * TR, mz, mr, 0.17);
      /* the leg fairing outboard of the wheel (GD side px 680-790) */
      plate(gr, T.body, [[0.05, -0.95], [-0.25, -0.92], [-0.62, -0.98], [-0.80, -1.16], [-0.78, -1.40],
                         [-0.55, -1.48], [-0.10, -1.45], [0.08, -1.25]], s * (TR + 0.12), -s * 0.02);
      /* the bay door hanging from the fuselage side */
      var bd = add(gr, pinUV(new THREE.BoxGeometry(1.10, 0.02, 0.36)), T.body, MX - 0.05, s * 0.62, -1.02);
      bd.rotation.x = s * 0.30;
    }
  }

  function g91Team(THREE, g, T) {
    var P = G.PAINT, WB = { x0: P.wx0, x1: P.wx1, s0: 0, s1: P.ws }, band = [];
    [3.45, 3.75].forEach(function (y) {
      var le = G.wle(y), te = G.wte(y);
      band.push({ s: y, le: le + 0.03, te: te - 0.02, t: (le - te) * 0.115, pad: 0.016, h: G.wz(y) });
    });
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB }), T.team));
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB, mirror: true }), T.team));
  }

  function buildG91(THREE, M, C) {
    THREE_ = THREE;
    var T = materials(THREE, C, G.PAINT);
    var g = new THREE.Group();
    g91Body(THREE, g, T);
    g91Cockpit(THREE, g, T);
    g91Wings(THREE, g, T);
    g91Tail(THREE, g, T);
    g91Stores(THREE, g, T);
    g91Gear(THREE, g, T);
    g91Team(THREE, g, T);
    /* the stance: pitched nose-up about the main-wheel contact (header) */
    var pitch = new THREE.Matrix4().makeTranslation(G.MX, 0, G.GROUND)
      .multiply(new THREE.Matrix4().makeRotationY(-G.PITCH))
      .multiply(new THREE.Matrix4().makeTranslation(-G.MX, 0, -G.GROUND));
    var out = mergeByMaterial(THREE, g, pitch);
    out.name = "g91";
    return out;
  }

  /* ====================================================================
     ALPHA JET A
     ==================================================================== */
  var A = {};
  /* WING (AD plan): leading edge from the root (y 0.48, x 1.83) to (3.96,
     -0.54), the rounded tip out to y 4.555; trailing edge from (0.45,
     -0.98) to the tip corner (4.55, -1.92). Chord plane z 1.27 at y 0.48
     (AD front), 5.3 deg anhedral; t/c 10 %. */
  A.WZ = 1.27; A.TAN_ANH = Math.tan(5.3 * D2R);
  A.wle = function (y) {
    if (y <= 3.96) return 1.83 - 0.681 * (y - 0.48);
    var q = Math.min(1, (y - 3.96) / 0.595);
    return -0.54 - 1.30 * Math.pow(q, 2.2);       /* the rounded tip */
  };
  A.wte = function (y) { return -0.98 - 0.229 * (y - 0.45); };
  A.wz = function (y) { return A.WZ - (Math.abs(y) - 0.48) * A.TAN_ANH; };
  A.PAINT = {
    seed: 7843, cols: ["#5d6568", "#4b5643", "#6c6b4c"], blobs: 16, under: null,
    store: "#59604f",
    x0: 7.70, len: 13.4, breaks: [6.60, 4.87, 2.70, 1.31, -0.98, -2.40, -3.40], soot: [-1.9, -2.6],
    wx0: -5.5, wx1: 2.0, ws: 4.60,
    wlines: function (g, U, V) {
      /* flap (y 0.6-2.9) and aileron (2.9-4.2) hinges, the two leading-edge
         steps (AD plan rows 805 and 670) */
      g.strokeStyle = "rgba(14,16,14,0.55)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(U(-0.55), V(0.6)); g.lineTo(U(-0.98), V(2.9)); g.lineTo(U(-1.25), V(4.2)); g.stroke();
      g.beginPath(); g.moveTo(U(-0.98), V(2.9)); g.lineTo(U(-1.55), V(2.9)); g.stroke();
      g.strokeStyle = "rgba(14,16,14,0.40)"; g.lineWidth = 1.8;
      [1.48, 2.74].forEach(function (y) {
        var le = 1.83 - 0.681 * (y - 0.48);
        g.beginPath(); g.moveTo(U(le), V(y)); g.lineTo(U(le - 0.45), V(y)); g.stroke();
      });
      /* tailplane elevator hinge */
      g.beginPath(); g.moveTo(U(-4.60), V(0.45)); g.lineTo(U(-4.95), V(1.95)); g.stroke();
    },
    fx0: -5.7, fx1: -2.2, fz0: 1.3, fz1: 3.6,
    flines: function (g, U, V) {
      g.strokeStyle = "rgba(14,16,14,0.58)"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(U(-4.80), V(1.55)); g.lineTo(U(-5.20), V(3.10)); g.stroke();
      /* the dark fin-tip fairing AD draws as an ellipse near the top */
      g.fillStyle = "#3a3f3c"; g.fillRect(U(-5.6), V(3.50), U(-4.6) - U(-5.6), V(3.33) - V(3.50));
    },
  };

  /* BODY -- AD side (top / flat belly) and plan, from the windscreen base
     (px 185, x 4.83) aft; the A's nose ahead of it. Under the canopies
     the top is the sill; behind them the spine (AD px 560-940). */
  A.BODY = [
    S( 4.83, 0.89, 0.00, 0.37, 0.48, 0.80),
    S( 4.31, 0.95, 0.00, 0.42, 0.50, 0.78),
    S( 3.37, 0.99, 0.00, 0.49, 0.52, 0.76),
    S( 2.43, 1.03, 0.00, 0.52, 0.54, 0.76),
    S( 1.60, 1.07, 0.00, 0.52, 0.56, 0.76),
    S( 1.25, 1.76, 0.00, 0.52, 0.64, 0.78),
    S( 0.37, 1.72, 0.00, 0.52, 0.66, 0.78),
    S(-0.56, 1.66, 0.02, 0.51, 0.68, 0.78),
    S(-1.31, 1.61, 0.08, 0.50, 0.72, 0.80),
    S(-2.06, 1.56, 0.20, 0.49, 0.78, 0.82),
    S(-2.62, 1.53, 0.42, 0.47, 0.90, 0.84),
    S(-3.37, 1.48, 0.58, 0.40, 0.98, 0.86),
    S(-4.12, 1.44, 0.72, 0.30, 1.06, 0.88),
    S(-4.87, 1.42, 0.86, 0.22, 1.12, 0.90),
    S(-5.20, 1.38, 0.96, 0.17, 1.16, 0.92),
    S(-5.34, 1.25, 1.06, 0.05, 1.16),
  ];
  /* the A's NOSE: a straight cone from the windscreen-base section to the
     tip at z 0.28 (0.30 of the depth, A3 / AD) at x 7.30, the probe to
     the published overall 13.23 m (header) */
  A.NOSE_TIP = 7.30;
  A.noseSecs = function () {
    var b = A.BODY[0], out = [], xs = [7.30, 7.22, 7.05, 6.75, 6.40, 6.00, 5.60, 5.20, 4.83];
    xs.forEach(function (x) {
      var f = (A.NOSE_TIP - x) / (A.NOSE_TIP - b.x), k = Math.pow(f, 0.92);
      var zc = 0.28 + (b.zw - 0.28) * f;
      out.push(S(x, Math.max(zc + 0.004, 0.28 + (b.zt - 0.28) * k), Math.min(zc - 0.004, 0.28 + (b.zb - 0.28) * k),
                 Math.max(0.006, b.w * k), zc, 1 - 0.20 * f));
    });
    return out;
  };
  /* NACELLES (AD side and plan; front view for the intake): the lip at x
     2.62 (px 420), the tall D intake y 0.46-0.84, z 0.12-1.00; the nozzle
     at x -2.39 (px 955), centre y 0.58, z 0.46 */
  A.NAC = [
    Y( 2.62, 0.66, 0.24, 1.03, 0.10, 0.56, 0.72),
    Y( 2.30, 0.68, 0.26, 1.06, 0.06, 0.56, 0.74),
    Y( 1.40, 0.68, 0.27, 1.06, 0.03, 0.55, 0.76),
    Y( 0.20, 0.67, 0.27, 1.02, 0.03, 0.53, 0.78),
    Y(-0.90, 0.64, 0.26, 0.92, 0.08, 0.50, 0.80),
    Y(-1.75, 0.60, 0.24, 0.76, 0.18, 0.47, 0.85),
    Y(-2.25, 0.58, 0.21, 0.66, 0.26, 0.46, 0.90),
    Y(-2.35, 0.58, 0.20, 0.64, 0.28, 0.46, 0.92),
  ];
  A.NOZ_X = -2.39; A.NOZ_R = 0.17;
  /* CANOPY (AD side): windscreen base px 185, the front hood to px 420,
     the raised rear hood to px 560 (x 1.31); half width 0.40 (plan) */
  A.CANOPY = [
    S( 4.83, 0.91, 0.87, 0.12, 0.89, 0.90),
    S( 4.45, 1.10, 0.88, 0.30, 0.92, 0.90),
    S( 4.03, 1.39, 0.90, 0.36, 0.96, 0.88),
    S( 3.75, 1.53, 0.92, 0.38, 0.98, 0.88),
    S( 3.37, 1.65, 0.94, 0.40, 1.00, 0.88),
    S( 2.81, 1.76, 0.97, 0.40, 1.04, 0.88),
    S( 2.25, 1.79, 1.00, 0.40, 1.08, 0.88),
    S( 1.69, 1.78, 1.03, 0.39, 1.12, 0.88),
    S( 1.31, 1.77, 1.06, 0.37, 1.16, 0.88),
  ];
  /* FIN (AD side) {z, le, te} with the dorsal fillet low down */
  A.FIN = [[1.40, -2.30, -5.02], [1.52, -2.62, -5.04], [1.75, -3.19, -5.11], [2.06, -3.56, -5.19],
           [2.43, -3.94, -5.29], [2.78, -4.31, -5.38], [3.15, -4.69, -5.47], [3.40, -4.99, -5.55],
           [3.48, -5.15, -5.58]];
  /* TAILPLANE (AD plan; side and front for its height): root z 0.97, 13
     deg anhedral */
  A.TZ = 0.97; A.TAN_TANH = Math.tan(13 * D2R);
  A.TAIL = [[0.30, -3.42, -4.84], [0.40, -3.51, -4.87], [1.00, -3.90, -5.05], [1.60, -4.28, -5.23],
            [1.92, -4.50, -5.32], [2.05, -4.75, -5.34]];
  A.GROUND = -0.70;     /* AD ground line row 475 */

  function ajBody(THREE, g, T) {
    var P = A.PAINT;
    g.add(new THREE.Mesh(loft(THREE, A.noseSecs().concat(A.BODY.slice(1)), 40, P), T.body));
    /* the probe at the nose tip (A2, A3) */
    xtube(g, T.metal, 0.008, 0.022, 7.65, 7.28, 0, 0.28, 8);
    /* the brake-chute cap at the end of the tail cone */
    var Lc = A.BODY[A.BODY.length - 1];
    g.add(new THREE.Mesh(loft(THREE, [Lc, S(-5.38, 1.20, 1.10, 0.02, 1.16)], 16), T.hot));
    /* the spine aerial (AD px 605; A1) */
    plate(g, T.metal, [[0.98, 1.72], [0.92, 1.95], [0.86, 1.95], [0.78, 1.72]], 0.008, -0.016);
  }

  function ajNacelles(THREE, g, T) {
    var P = A.PAINT;
    for (var s = -1; s <= 1; s += 2) {
      var sec = A.NAC.map(function (q) { return withYc(q, s * q.yc); });
      g.add(new THREE.Mesh(loft(THREE, sec, 28, P), T.body));
      var a = sec[0];
      /* the lip rolled in and the dark duct behind it */
      g.add(new THREE.Mesh(loft(THREE, [
        Y(2.56, a.yc, a.w - 0.03, a.zt - 0.03, a.zb + 0.03, a.zw, a.e),
        Y(2.65, a.yc, a.w - 0.01, a.zt - 0.01, a.zb + 0.01, a.zw, a.e),
        Y(2.62, a.yc, a.w, a.zt, a.zb, a.zw, a.e)], 28, P), T.body));
      g.add(new THREE.Mesh(loft(THREE, [
        Y(2.56, a.yc, a.w - 0.03, a.zt - 0.03, a.zb + 0.03, a.zw, a.e),
        Y(2.10, s * 0.62, 0.18, 0.92, 0.18, 0.55, 0.8),
        Y(1.70, s * 0.60, 0.02, 0.60, 0.50, 0.55)], 24), T.ink));
      /* the nozzle: a short pipe beyond the nacelle end, lip and dark inside */
      var py = s * 0.58, pz = 0.46;
      g.add(new THREE.Mesh(loft(THREE, [
        O(-2.30, A.NOZ_R + 0.02, pz, py), O(A.NOZ_X - 0.10, A.NOZ_R, pz, py),
        O(A.NOZ_X - 0.12, A.NOZ_R - 0.03, pz, py), O(A.NOZ_X - 0.02, A.NOZ_R - 0.04, pz, py)], 20), T.hot));
      xtube(g, T.ink, A.NOZ_R - 0.04, A.NOZ_R - 0.07, A.NOZ_X - 0.02, -1.95, py, pz, 18, true);
      add(g, new THREE.CylinderGeometry(0.05, 0.08, 0.16, 10), T.hot, -2.10, py, pz).rotation.z = HALF_PI;
    }
  }

  function ajCockpit(THREE, g, T) {
    g.add(new THREE.Mesh(loft(THREE, A.CANOPY, 28), T.glass));
    /* the frame between the hoods (AD px 400-440) and the windscreen arch */
    [4.03, 2.70].forEach(function (x, k) {
      var r = add(g, new THREE.TorusGeometry(0.36, 0.022, 5, 20, PI), T.metal, x, 0, k ? 1.06 : 0.96);
      r.rotation.set(HALF_PI, HALF_PI, 0);
      r.scale.set(k ? 1.95 : 1.20, 1.04, 1.0);
    });
    for (var s = -1; s <= 1; s += 2) add(g, new THREE.BoxGeometry(3.5, 0.03, 0.04), T.metal, 3.05, s * 0.395, 0.98);
    /* coamings, seats and headrests, the rear seat raised */
    [[4.15, 0.95, 3.35, 1.05], [2.95, 1.10, 2.05, 1.30]].forEach(function (c) {
      add(g, new THREE.BoxGeometry(0.30, 0.50, 0.10), T.ink, c[0], 0, c[1]);
      add(g, new THREE.BoxGeometry(0.42, 0.44, 0.32), T.ink, c[2], 0, c[3]);
      add(g, new THREE.BoxGeometry(0.14, 0.30, 0.28), T.ink, c[2] - 0.20, 0, c[3] + 0.28);
    });
  }

  function ajWings(THREE, g, T) {
    var P = A.PAINT, WB = { x0: P.wx0, x1: P.wx1, s0: 0, s1: P.ws };
    var st = [0.30, 0.48, 1.40, 2.40, 3.40, 3.96, 4.25, 4.45, 4.555].map(function (y) {
      var yy = Math.max(0.48, y), le = A.wle(yy), te = A.wte(yy);
      if (y > 4.45) te = Math.max(te, le - 0.30);
      return { s: y, le: le, te: te, t: (le - te) * 0.10, h: A.wz(yy) };
    });
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, split: true }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, st, { box: WB, split: true, mirror: true }), T.wing));
  }

  function ajTail(THREE, g, T) {
    var P = A.PAINT, fs = [];
    A.FIN.forEach(function (f) {
      fs.push({ s: f[0], le: f[1], te: f[2], t: Math.max(0.04, Math.min(0.12, (f[1] - f[2]) * 0.06)), h: 0 });
    });
    g.add(new THREE.Mesh(surf(THREE, fs, { vert: true, box: { x0: P.fx0, x1: P.fx1, s0: 2 * P.fz0 - P.fz1, s1: P.fz1 } }), T.fin));
    var ts = A.TAIL.map(function (t) {
      return { s: t[0], le: t[1], te: t[2], t: (t[1] - t[2]) * 0.07, h: A.TZ - Math.max(0, t[0] - 0.30) * A.TAN_TANH };
    });
    var TB = { x0: P.wx0, x1: P.wx1, s0: 0, s1: P.ws };
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, split: true }), T.wing));
    g.add(new THREE.Mesh(surf(THREE, ts, { box: TB, split: true, mirror: true }), T.wing));
  }

  /* pylons at y 1.95 and 2.95 (estimated from A2), the drop tank inboard
     (A1, A2, A5); the BK-27 pod on the centreline (published; A1) */
  A.PYL = [{ y: 1.95, x0: 1.10, x1: -0.55 }, { y: 2.95, x0: 0.45, x1: -0.95 }];
  function ajStores(THREE, g, T) {
    A.PYL.forEach(function (p, k) {
      for (var s = -1; s <= 1; s += 2) {
        var h = A.wz(p.y) - 0.06;
        plate(g, T.wing, [[p.x0 - 0.15, h + 0.05], [p.x0, h - 0.10], [p.x0 - 0.30, h - 0.26], [p.x1 + 0.12, h - 0.26], [p.x1, h + 0.05]],
              s * p.y + s * 0.035, -s * 0.07);
        if (k === 0) storeBody(THREE, g, T.store, p.x0 + 0.95, 3.0, 0.22, s * p.y, h - 0.26 - 0.23, 0.32, 0.30);
      }
    });
    /* the gun pod: a fairing on a short pylon under the belly, the barrel
       stub at its nose */
    plate(g, T.body, [[1.10, 0.0], [1.0, -0.12], [-0.90, -0.12], [-1.10, 0.0]], 0.02, -0.04);
    storeBody(THREE, g, T.store, 1.45, 2.7, 0.20, 0, -0.33, 0.22, 0.25);
    xtube(g, T.metal, 0.03, 0.03, 1.62, 1.35, 0, -0.36, 8);
    xtube(g, T.ink, 0.016, 0.016, 1.63, 1.58, 0, -0.36, 8);
  }

  /* GEAR -- AD: nose wheel 0.41 m at x 4.55 (0.28 m behind the windscreen
     base, as A3 and A4 show), main wheels 0.60 m at x -0.09, track
     +-1.34 m (AD front); legs from the belly and from under the nacelles
     (A3). */
  function ajGear(THREE, g, T) {
    var gr = new THREE.Group();
    gr.name = "gear";
    g.add(gr);
    var NX = 4.55, nr = 0.205, nz = A.GROUND + nr;
    rod(gr, T.metal, 0.05, [4.62, 0, 0.02], [4.62, 0, nz + 0.18], 8);
    rod(gr, T.metal, 0.04, [4.62, 0, nz + 0.20], [NX, 0, nz], 8);
    rod(gr, T.metal, 0.025, [4.30, 0, 0.02], [4.60, 0, nz + 0.30], 6);
    for (var f = -1; f <= 1; f += 2) rod(gr, T.metal, 0.02, [4.62, f * 0.08, nz + 0.12], [NX, f * 0.08, nz], 6);
    wheel(gr, T, NX, 0, nz, nr, 0.15);
    for (var d = -1; d <= 1; d += 2) {
      var nd = add(gr, pinUV(new THREE.BoxGeometry(0.80, 0.02, 0.26)), T.body, 4.70, d * 0.19, -0.12);
      nd.rotation.x = d * 0.20;
    }
    var MX = -0.09, mr = 0.30, mz = A.GROUND + mr, TR = 1.34;
    for (var s = -1; s <= 1; s += 2) {
      rod(gr, T.metal, 0.06, [MX + 0.25, s * 0.80, 0.10], [MX + 0.12, s * 1.10, mz + 0.18], 8);
      rod(gr, T.metal, 0.045, [MX + 0.12, s * 1.10, mz + 0.18], [MX, s * 1.18, mz], 8);
      rod(gr, T.metal, 0.03, [MX - 0.30, s * 0.75, 0.08], [MX + 0.10, s * 1.08, mz + 0.30], 6);
      rod(gr, T.metal, 0.04, [MX, s * 1.15, mz], [MX, s * (TR + 0.08), mz], 6);
      wheel(gr, T, MX, s * TR, mz, mr, 0.17);
      plate(gr, T.body, [[MX + 0.55, 0.12], [MX - 0.25, 0.10], [MX - 0.15, -0.20], [MX + 0.40, -0.20]], s * 0.92, -s * 0.02);
    }
  }

  function ajTeam(THREE, g, T) {
    var P = A.PAINT, WB = { x0: P.wx0, x1: P.wx1, s0: 0, s1: P.ws }, band = [];
    [3.40, 3.70].forEach(function (y) {
      var le = A.wle(y), te = A.wte(y);
      band.push({ s: y, le: le + 0.03, te: te - 0.02, t: (le - te) * 0.10, pad: 0.016, h: A.wz(y) });
    });
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB }), T.team));
    g.add(new THREE.Mesh(surf(THREE, band, { box: WB, mirror: true }), T.team));
  }

  function buildAlphaJet(THREE, M, C) {
    THREE_ = THREE;
    var T = materials(THREE, C, A.PAINT);
    var g = new THREE.Group();
    ajBody(THREE, g, T);
    ajNacelles(THREE, g, T);
    ajCockpit(THREE, g, T);
    ajWings(THREE, g, T);
    ajTail(THREE, g, T);
    ajStores(THREE, g, T);
    ajGear(THREE, g, T);
    ajTeam(THREE, g, T);
    var out = mergeByMaterial(THREE, g);
    out.name = "alphajet";
    return out;
  }

  HeroG91 = { build: buildG91, G: G };
  HeroAlphaJet = { build: buildAlphaJet, A: A };
})();

/* len: the measured X extents. G.91, as pitched: nose tip (5.05) to the
   tailplane tips (-5.29) = 10.35 m (10.30 m, the published length, on
   the level datum). Alpha Jet A: probe tip (7.65)
   to the fin's top trailing corner (-5.58) = 13.23 m, the published
   close-support length. */
UNIT_MODELS["deu_e60_cas"] = { len: 10.35, build: HeroG91.build };
UNIT_MODELS["deu_e80_cas"] = { len: 13.23, build: HeroAlphaJet.build };
