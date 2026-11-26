/* ========================= js/hero/_kit_demo.js ==========================
   DEMO ONLY -- not wired into index.html, not a real unit.  Three small,
   GENERIC models built entirely from js/hero_kit.js (HeroKit), to prove the
   kit and to show how a hero file reads when its tables are the model:

     demo_ship   a 42 m patrol boat   (loftHull, facetedHouse, ship kit,
                                       K.deckSheet markings lighter than the
                                       deck, funnel, VLS, shafts / screws /
                                       rudders, sonar dome, rounded and
                                       plumb panels, plain stock sheets)
     demo_air    a 15.0 m jet         (loftBody with a two-colour split,
                                       aerofoil lower pen and a cut leading
                                       edge (root intakes, K.air.duct), a
                                       ground stance, gear on the stood
                                       ground, wingfold groups, sheet areas)
     demo_veh    a 7.5 m 8x8 APC      (archBody, mirrors, steps, strut
                                       suspension, plain lamp guards)
     demo_cat    a 40 m catamaran     (loftHull y0 / pair, bridgingDeck,
                                       facetedHouse well, box launchers,
                                       CIWS, shutters, stealth shield, nets,
                                       a flight deck by deckSheet, panels
                                       across a knuckle)
     demo_helo   a 15 m helicopter    (loftBody split, K.air.rotor with a
                                       leaning clockwise head and its disc,
                                       tailRotor, jetPipe, rotated groups)

   None of the shapes is measured off a real vehicle: every table below is
   made up.  In a real hero file the tables come from the unit's spec
   (tools/model3d/specs/<key>.json) and each row cites its reference.
   Load after js/hero_kit.js:
     node jscnode.js tools/model3d/dump.js -- unit demo_ship nato OUT.json \
          --extra js/hero_kit.js --extra js/hero/_kit_demo.js
   ASCII only.
========================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

(function () {
  "use strict";
  var PI = Math.PI;

  /* ================================================================ demo_ship */
  var SHIP_STATIONS = [
    { x: -21.0, keel: -0.4, sheer: 2.60, bDk: 3.00, bWl: 2.70, bilge: 3.5 },
    { x: -17.0, keel: -1.3, sheer: 2.60, bDk: 3.30, bWl: 3.00, bilge: 3.2 },
    { x: -8.0, keel: -1.8, sheer: 2.70, bDk: 3.50, bWl: 3.20, knuckle: 1.9, bKn: 3.40 },
    { x: 2.0, keel: -1.8, sheer: 2.90, bDk: 3.50, bWl: 3.10, knuckle: 2.0, bKn: 3.35 },
    { x: 10.0, keel: -1.7, sheer: 3.30, bDk: 3.10, bWl: 2.20, knuckle: 2.3, bKn: 2.80, bilge: 2.0, bulwark: 0.0 },
    { x: 12.0, keel: -1.6, sheer: 3.45, bDk: 2.85, bWl: 1.80, knuckle: 2.4, bKn: 2.50, bilge: 1.8, bulwark: 0.55 },
    { x: 16.0, keel: -1.4, sheer: 3.80, bDk: 2.00, bWl: 1.00, knuckle: 2.7, bKn: 1.60, bilge: 1.6, bulwark: 0.55 },
    { x: 19.5, keel: -0.2, sheer: 4.20, bDk: 0.80, bWl: 0.12, knuckle: 3.0, bKn: 0.50, bilge: 1.4, bulwark: 0.55 },
    { x: 21.0, keel: 3.0, sheer: 4.40, bDk: 0.0, bWl: 0.0, bKn: 0.0, bulwark: 0.55 }
  ];
  function buildShip(THREE, M, C) {
    var K = HeroKit.begin(THREE, M, C, { category: "ship", key: "demo_ship", len: 42 });   /* stock sheets: plain (the default) */
    K.contract(["turret"]);
    /* the deck is ONE sheet mapped in plan (K.deckSheet): the canvas carries
       the deck's grey and the pen is white, so the lines can be LIGHTER than
       the deck.  The grey is authored darker than it should read
       (HeroKit.authorFor: the renderer lifts it). */
    var PLAN = { x0: -21.5, x1: 21.5, y0: -3.8, y1: 3.8 };
    var pDeck = K.deckSheet("deck", { key: "demo_ship_deck", w: 1024, h: 256, seed: 41, plan: PLAN, color: HeroKit.authorFor(0x8a9095),
      panels: { cols: 14, rows: 3, alpha: 0.16, lit: 0.04, width: 1, stagger: 20 }, grime: { n: 40, alpha: 0.05 },
      markings: function (g, w, h, m) {
        m.line([[-20.5, 2.5], [9.5, 2.9]], 0.10, "rgba(236,236,226,0.8)");               /* the walkway lines */
        m.line([[-20.5, -2.5], [9.5, -2.9]], 0.10, "rgba(236,236,226,0.8)");
        m.circle(-17.2, 0, 1.9, 0.14, "rgba(240,240,232,0.95)");                          /* a working circle aft */
        m.line([[-19.1, 0], [-15.3, 0]], 0.10, "rgba(240,240,232,0.9)", [0.5, 0.35]);
        m.rect(11.6, -1.2, 14.6, 1.2, "rgba(20,22,24,0.22)");                             /* the gun's blast area */
      } });

    K.part("hull");
    var H = K.loftHull({ stations: SHIP_STATIONS, boot: 0.3, pens: { deck: pDeck } });

    /* ---- superstructure: rows are the model */
    K.part("deckhouse");
    var pl = K.pen("plate"), glass = K.pen("glass");
    var DH = K.facetedHouse(pl, [
      { z: 2.6, x0: -9.0, x1: 6.5, hw: 2.75, ca: 0.3, cf: 0.9 },
      { z: 5.2, lean: { side: 0.12, front: 0.35, aft: 0.05 } }]);
    var BR = K.facetedHouse(pl, [
      { z: 5.2, x0: -1.5, x1: 5.4, hw: 2.45, ca: 0.3, cf: 0.8 },
      { z: 6.2, lean: { side: 0.0, front: 0.0, aft: 0.0 } },
      { z: 7.5, lean: { side: 0.14, front: -0.25, aft: 0.05 } }]);      /* the windows rake forward */
    [0, 1, 2, 3, 4].forEach(function (k) {                               /* the bridge windows */
      var n = k === 2 ? 5 : (k === 0 || k === 4 ? 4 : 1), i;
      for (i = 0; i < n; i++) BR.panel(glass, k, (i + 0.12) / n, (i + 0.88) / n, 6.45, 7.25, 0.03);
    });
    DH.door(0, 0.30, 2.95); DH.door(4, 0.62, 2.95); DH.door(6, 0.40, 2.95);
    BR.door(6, 0.35, 5.25, 0.7, 1.75);
    /* rounded access panels, plumb on the leaning deckhouse sides */
    [0, 4].forEach(function (k) { DH.panel(K.pen("plate", 0x7f888d), k, 0.62, 0.74, 3.3, 4.4, 0.03, { round: 0.18, plumb: true }); });
    /* the funnel: raked casing, black cap, grille and uptakes */
    var FN = K.ship.funnel({ x0: -7.4, x1: -4.2, hw: 1.0, z0: 5.2, z1: 7.3, rake: 0.18, cap: 0.4, pipes: 2 });
    [0, 4].forEach(function (k) { FN.panel(K.pen("dull", "dark"), k, 0.25, 0.75, 5.6, 6.5, 0.03, { plumb: true }); });   /* louvres */

    /* ---- mast and sensors */
    K.part("mast");
    var top = K.ship.latticeMast({ base: [-1.2, 0.6, 0.9], z0: 7.5, top: [-0.7, 0.2, 0.4], z1: 11.6, bays: 4 });
    K.ship.radar(top[0], 0, top[2], { type: "bar", w: 2.2, h: 0.35, ped: 0.35, yaw: 0.4 });
    K.ship.radar(3.6, 0, 7.5, { type: "dome", r: 0.45, ped: 0.3 });
    K.ship.radar(-2.6, 0, 5.2, { type: "dish", r: 0.6, ped: 0.9, yaw: PI, tilt: 0.25 });
    K.ship.whip(1.2, 2.0, 7.5, 5.0); K.ship.whip(1.2, -2.0, 7.5, 5.0); K.ship.whip(-8.4, 2.2, 5.2, 4.0);
    K.air.lamp([4.9, 2.36, 7.6], 0.07, "lampRed"); K.air.lamp([4.9, -2.36, 7.6], 0.07, "lampGreen"); K.air.lamp([top[0], 0, top[2] + 1.0], 0.07, "lampWhite");
    K.tube(K.pen("metal"), [top[0], 0, top[2]], [top[0], 0, top[2] + 1.0], 0.04, 0.03, 5, false);

    /* ---- the gun, in the engine's "turret" frame */
    K.part("gun");
    var gz = H.deckZ(13.2), T = K.group("turret", { at: [13.2, 0, gz] });
    var GH = T.ship.gunHouse(13.2, 0, gz, { len: 2.3, w: 1.9, h: 1.45, cal: 0.045, blen: 2.9, elev: 0.06 });
    T.teamPatch([13.0, 0, GH.z1], [1, 0, 0], [0, 1, 0], 0.9, 0.5);

    /* ---- fittings */
    K.part("fittings");
    [1, -1].forEach(function (s) {
      K.ship.rail(H.edge(-20.6, 11.6, { side: s, step: 1.6 }), { step: 1.6 });
      K.ship.bollard(-19.0, s * 2.4, H.deckZ(-19), 0); K.ship.bollard(8.0, s * 2.7, H.deckZ(8), 0); K.ship.bollard(15.0, s * 1.5, H.deckZ(15), 0.2 * -s, 0.8);
      K.ship.fairlead(-20.3, s * 2.55, H.deckZ(-20.3), 0, 0.8); K.ship.fairlead(17.2, s * 1.25, H.deckZ(17.2), -s * 0.35, 0.8);
      K.ship.cleat(-12.0, s * 3.1, H.deckZ(-12), 0); K.ship.cleat(4.0, s * 3.15, H.deckZ(4), 0);
      K.ship.anchor(17.6, s * H.W(17.6, 3.15), 3.15, H.normal(17.6, 3.15, s), 0.7);
      var row = H.line(-6.5, 8.5, function (x) { return H.deckZ(x) - 0.75; }, { side: s, step: 1.9 });
      K.ship.scuttles(row.pts, row.nrm, 0.14);
      K.ship.raft(-2.6, s * 2.25, 5.2, 0, 1.2, 0.3); K.ship.raft(-4.0, s * 2.25, 5.2, 0, 1.2, 0.3);
      K.ship.vent(-8.2, s * 1.6, 5.2, { type: "mushroom", r: 0.18, h: 0.45 });
      K.ship.vent(7.6, s * 1.4, H.deckZ(7.6), { type: "goose", r: 0.11, h: 0.7, yaw: s * 1.2 });
      K.ship.ladder([-9.25, s * 1.4, 2.62], [-9.02, s * 1.4, 5.2], [0, 1, 0], 0.5);
    });
    K.ship.rail([[-20.85, -2.75, 2.6], [-20.85, 2.75, 2.6]], { step: 1.4 });                   /* across the transom */
    DH.roofEdge(0.12, [0, 4, 5, 6, 7]).forEach(function (e) { K.ship.rail(e, { step: 1.4 }); });
    BR.roofEdge(0.12).forEach(function (e) { K.ship.rail(e, { h: 0.9, step: 1.3 }); });
    K.ship.vls(9.3, 0, H.deckZ(9.3), { rows: 2, cols: 3, cell: 0.62 }); K.ship.hatch(16.2, 0, H.deckZ(16.2), 0.7, 0.7, 0); K.ship.hatch(-11.5, 1.4, H.deckZ(-11.5), 1.0, 0.8, 0);
    K.ship.boat(-14.2, -1.1, H.deckZ(-14.2) + 0.12, 0, 5.2, 2.0, { type: "rib" });
    K.ship.davit(-12.4, -2.6, H.deckZ(-12.4), PI * 0.75, 2.7, 1.5); K.ship.davit(-16.0, -2.6, H.deckZ(-16), PI * 0.75, 2.7, 1.5);
    K.ship.boat(-14.2, 1.5, H.deckZ(-14.2) + 0.12, 0, 4.6, 1.6, { type: "whaler" });
    K.cylZ(K.pen("metal", "dark"), 18.3, 0, H.deckZ(18.3), H.deckZ(18.3) + 0.5, 0.28, 10);       /* the capstan */
    /* shafts with A-brackets, screws and rudders (K.ship.shaft / rudder), a bow sonar dome */
    [1, -1].forEach(function (s) {
      K.ship.shaft([-12.0, s * 1.3, -1.25], [-18.6, s * 1.3, -1.35], { r: 0.07, hullZ: -0.7, bracket: 0.88, screw: { r: 0.6, blades: 4, phase: s * 0.4 } });
      K.ship.rudder(-19.7, s * 1.3, -0.45, { h: 1.1, c: 0.9 });
    });
    K.ship.sonarDome(10.5, 15.5, -1.55, { h: 0.9, w: 0.55 });
    /* team colour: one small patch on the bridge roof */
    K.teamPatch([1.6, 0, 7.5], [1, 0, 0], [0, 1, 0], 1.6, 0.8);
    return K.finish();
  }

  /* ================================================================= demo_air */
  var BODY = [
    { x: 7.0, w: 0.0, top: 1.70, bot: 1.70 },
    { x: 6.3, w: 0.22, top: 1.95, bot: 1.48 },
    { x: 5.0, w: 0.42, top: 2.22, bot: 1.30 },
    { x: 3.6, w: 0.55, top: 2.40, bot: 1.22, eL: 2.6 },
    { x: 1.5, w: 0.72, top: 2.42, bot: 1.15, eL: 3.0 },
    { x: -1.5, w: 0.78, top: 2.40, bot: 1.15, eL: 3.0 },
    { x: -4.5, w: 0.68, top: 2.32, bot: 1.25 },
    { x: -6.6, w: 0.50, top: 2.24, bot: 1.30 }
  ];
  /* the wing: a thick root with an intake mouth cut into its leading edge
     (cutLE), the fixed panel to the fold at s 2.6, the outer panel beyond */
  var WING_IN = [{ s: 0.60, le: 1.6, c: 4.3, t: 0.09, z: 1.66, cutLE: 0.05 }, { s: 1.00, le: 1.263, c: 3.984, t: 0.07, z: 1.654, cutLE: 0.03 },
                 { s: 1.40, le: 0.926, c: 3.668, t: 0.05, z: 1.647 }, { s: 2.60, le: -0.084, c: 2.721, t: 0.045, z: 1.628 }];
  var WING_OUT = [{ s: 2.60, le: -0.084, c: 2.721, t: 0.045, z: 1.628 }, { s: 4.40, le: -1.6, c: 1.3, t: 0.04, z: 1.60 }];
  var STAB = [{ s: 0.45, le: -4.6, c: 2.0, t: 0.045, z: 1.80 }, { s: 2.50, le: -6.1, c: 0.8, t: 0.04, z: 1.80 }];
  var FIN = [{ s: 2.25, le: -3.7, c: 2.7, t: 0.05 }, { s: 4.70, le: -6.0, c: 1.0, t: 0.04 }];
  var CANOPY = [{ x: 5.25, w: 0.0, sill: 2.17, top: 2.19 }, { x: 4.7, w: 0.30, sill: 2.22, top: 2.60 }, { x: 3.9, w: 0.37, sill: 2.30, top: 2.86 },
                { x: 3.0, w: 0.35, sill: 2.36, top: 2.82 }, { x: 2.0, w: 0.0, sill: 2.40, top: 2.43 }];
  var MAIN = [-0.96, 0], NOSE = [4.48, -0.22];          /* the wheel contacts in the build datum: it sits 2.3 deg nose-up */
  function buildAir(THREE, M, C) {
    var K = HeroKit.begin(THREE, M, C, { category: "air", key: "demo_air", len: 14.95, paint: { skin: 0x3c4636, under: 0xa3abae },
                                         stance: { main: MAIN, nose: NOSE }, name: "demo_air" });
    K.contract(["gear", "wingfold"]);
    K.paintSheet({ key: "demo_air2", seed: 1543, bounds: { x0: -7.6, x1: 7.3, ymax: 4.8, z0: 0, z1: 4.9 }, seam: 0.5, grime: 200,
                   frames: [[6.3, 0.3], [5.4, 0.45], [2.0, 0.8], [0.4, 0.8], [-1.2, 0.8], [-2.8, 0.8], [-4.4, 0.75], [-5.8, 0.6]],
                   top: [[[-4.9, 0.6], [-6.3, 2.3]]], bot: [[[4.0, 0.3], [-5.0, 0.3]]],
                   side: [[[5.6, 1.9], [-6.2, 1.9]]],
                   walk: [[[1.2, 0.75], [-1.6, 0.75], [-1.6, 1.3], [0.6, 1.3]]],
                   areas: [{ band: "top", poly: [[6.4, 0.0], [5.3, 0.33], [5.3, -0.33]], color: 0x2a2e31, alpha: 0.55 }],   /* an anti-glare panel ahead of the hood */
                   soot: [[-6.9, 0, 1.8, 0.8, 0.4]] });
    var skin = K.pen("skin"), low = K.pen("skin", "under"), dome = K.pen("skin", "radome");

    K.part("fuselage");
    /* two colours with a crisp, straight line: dark above, light below a
       demarcation 1.55 m up, held level forward of the nose cap */
    var B = K.loftBody(skin, BODY, { n: 24, capA: true, split: { z: 1.55, below: low, minDeg: 10, maxDeg: 60, hold: 5.0 } });
    K.loftBody(dome, [{ x: 7.0, w: 0.0, top: 1.70, bot: 1.70 }, { x: 6.65, w: 0.125, top: 1.845, bot: 1.575 }, { x: 6.3, w: 0.225, top: 1.955, bot: 1.475 }], { n: 20, step: 0.12 });
    [1, -1].forEach(function (s) { K.air.seam(B.demarcation(s, -6.5, 6.2, 24), 0.02); });
    K.part("flying surfaces");
    var W = K.aerofoil(skin, WING_IN, { frame: "wing", lower: low, wrap: 0.03, openLE: true, sub: 1 });
    var ST = K.aerofoil(skin, STAB, { frame: "wing", lower: low });
    var F = K.aerofoil(skin, FIN, { frame: "fin" });
    /* the outer panels fold up about a hinge along the chord line at s 2.6 */
    var FOLD = {};
    [1, -1].forEach(function (s) {
      var G = K.air.wingfold({ hinge: [0, s * 2.6, 1.628], axis: [s, 0, 0], angleDeg: 105 });
      FOLD[s] = G.aerofoil(G.pen("skin"), WING_OUT, { frame: "wing", side: s, lower: G.pen("skin", "under"), wrap: 0.03 });
      G.air.lamp(FOLD[s].at(4.38, 0.35, 1, s), 0.05, s > 0 ? "lampRed" : "lampGreen");
    });
    K.part("propulsion");
    [1, -1].forEach(function (s) { var m = W.mouth(s); K.air.duct(m.up, m.lo, { depth: 1.1 }); });
    K.air.nozzle({ x: -6.6, y: 0, z: 1.78, r0: 0.47, r1: 0.37, len: 0.75, petals: 16 });
    K.part("canopy");
    K.air.canopy(CANOPY, { frames: [4.55, 3.15], spine: false });
    K.part("gear");
    /* the legs are drawn to the stood ground (K.ground): the nose leg comes out longer */
    var G = K.group("gear");
    G.air.gearLeg({ x: 4.4, y: 0, top: 1.36, r: 0.24, w: 0.16, side: 0, rake: 0.08, door: { len: 0.9, h: 0.5, side: 1 }, brace: [3.7, 0, 1.32] });
    [1, -1].forEach(function (s) {
      G.air.gearLeg({ x: -0.9, y: s * 1.35, top: 1.60, r: 0.34, w: 0.22, side: s, rake: -0.06, door: { len: 1.1, h: 0.7, side: -s }, brace: [-0.9, s * 0.85, 1.3] });
    });
    K.part("details");
    [5.4, 2.0, -1.2, -4.4].forEach(function (x) { K.air.hoop(B, x, 0, PI * 2, 0.025); });
    [1, -1].forEach(function (s) {
      K.air.seam(W.line(0.72, 1.4, 2.55, 4, 1, s), 0.03); K.air.seam(W.line(0.72, 1.4, 2.55, 4, -1, s), 0.03);
      K.air.seam({ pts: [W.at(2.6, 0.02, 1, s), W.at(2.6, 0.5, 1, s), W.at(2.6, 0.98, 1, s)], nrm: [0, 0, 1] }, 0.035);   /* the fold joint */
      K.air.seam(ST.line(0.30, 0.6, 2.4, 4, 1, s), 0.03);
      K.air.pylon({ x: W.at(1.9, 0.3, -1, s)[0] + 0.8, y: s * 1.9, z: W.at(1.9, 0.3, -1, s)[2], len: 1.7, h: 0.3 });
    });
    K.air.seam(F.line(0.70, 2.5, 4.5, 4, 1), 0.03); K.air.seam(F.line(0.70, 2.5, 4.5, 4, -1), 0.03);
    K.air.lamp(F.at(4.68, 0.9, 1), 0.05, "lampWhite");
    K.air.pitot([7.0, 0, 1.70], [1, 0, 0], 0.6);
    K.air.aerial(B.pt(0.5, PI / 2), [0, 0, 1], 0.26, 0.24); K.air.aerial(B.pt(-2.5, -PI / 2), [0, 0, -1], 0.2, 0.22); K.air.aerial(B.pt(3.2, -PI / 2), [0, 0, -1], 0.18, 0.2);
    /* team colour: a band across the fin (both faces) and a spine strip */
    [1, -1].forEach(function (f) { var l = F.line(0.5, 3.9, 3.9, 1, f); K.teamStrip([F.at(3.9, 0.08, f), F.at(3.9, 0.92, f)], l.nrm, 0.42, 0.006); });
    K.teamStrip(B.line(PI / 2, -0.4, -1.5, 3).pts, [0, 0, 1], 0.3, 0.012);
    K.node("aar_recept", B.pt(1.2, PI / 2));
    return K.finish();
  }


  /* ================================================================= demo_veh */
  function buildVeh(THREE, M, C) {
    var K = HeroKit.begin(THREE, M, C, { category: "vehicle", key: "demo_veh", len: 7.48, paint: { paint: 0x55603d } });
    K.contract(["turret", "roadwheel"]);
    var FP = HeroKit.footprint, paint = K.pen("paint"), R = 0.56, TY = 1.17, AX = [2.55, 1.20, -0.95, -2.30];
    K.part("hull");
    /* the lower hull: ONE faceted body with the four wheel arches cut into
       it (round, lipped, a dark well inboard), its nose and tail raked */
    K.veh.archBody({ x0: -3.62, x1: 3.30, hw: 1.36, z0: 0.50, top: [[-3.62, 0.86], [-3.66, 1.30], [3.70, 1.30], [3.30, 0.62]],
                     arches: AX.map(function (x) { return { x: x, z: R, r: R, clear: 0.06, seg: 12 }; }), liner: 0.5 });
    var UP = K.facetedHouse(paint, [
      { z: 1.28, poly: FP(-3.66, 3.70, 1.38, 1.30, 0.06, 0.30) },
      { z: 1.46, poly: FP(-3.70, 3.50, 1.40, 1.30, 0.06, 0.30) },
      { z: 2.02, poly: FP(-3.52, 1.55, 1.12, 1.02, 0.10, 0.22) }]);
    K.part("running gear");
    K.veh.wheels({ axles: AX, r: R, hw: 0.19, y: TY, col: "paint" });
    K.veh.suspension({ type: "strut", axles: AX, y: 0.5, hubY: 0.92, axleZ: R, frameZ: 0.9 });
    [1, -1].forEach(function (s) { K.veh.mudflap(-3.05, s > 0 ? 0.95 : -1.38, s > 0 ? 1.38 : -0.95, 0.72, 1.2); });
    K.part("turret");
    var T = K.group("turret", { at: [0.3, 0, 2.02] });
    T.cylZ(T.pen("dull", "dark"), 0.3, 0, 2.02, 2.07, 0.78, 20);
    var TU = T.facetedHouse(T.pen("paint"), [
      { z: 2.07, poly: FP(-0.55, 1.20, 0.80, 0.62, 0.22, 0.20) },
      { z: 2.34, poly: FP(-0.58, 1.26, 0.78, 0.50, 0.22, 0.16) },
      { z: 2.58, poly: FP(-0.45, 0.95, 0.60, 0.40, 0.18, 0.12) }]);
    T.revolve(T.pen("dull", "dark"), [[0, 0.085], [0.5, 0.075], [0.52, 0.05], [2.25, 0.042], [2.26, 0.06], [2.5, 0.06], [2.5, 0.0]], { at: [1.2, 0, 2.32], axis: "x", seg: 10 });
    T.sphere(T.pen("dull", "canvas"), [1.22, 0, 2.32], [0.2, 0.2, 0.17], 8, 5);
    T.veh.hatch(0.05, 0.28, 2.58, { r: 0.24, yaw: PI });
    T.veh.smoke(0.85, 0.66, 2.24, 0.75, { n: 3 }); T.veh.smoke(0.85, -0.66, 2.24, -0.75, { n: 3 });
    T.veh.handle([-0.3, 0.52, 2.58], [0.1, 0.5, 2.58], 0.05); T.veh.handle([-0.3, -0.52, 2.58], [0.1, -0.5, 2.58], 0.05);
    T.veh.stowage(-1.12, -0.6, -0.6, 0.6, 2.12, 2.5, { basket: true });
    T.teamStrip([[-0.2, -0.3, 2.58], [0.5, -0.3, 2.58]], [0, 0, 1], 0.18, 0.012);
    K.part("fittings");
    K.veh.hatch(2.45, 0.55, 1.90, { lx: 0.55, ly: 0.5, scopes: 3, yaw: 0 });                       /* the driver */
    K.veh.hatch(-1.6, 0.5, 2.02, { lx: 0.9, ly: 0.5, yaw: 0 }); K.veh.hatch(-1.6, -0.5, 2.02, { lx: 0.9, ly: 0.5, yaw: 0 });
    [1, -1].forEach(function (s) {
      K.veh.lamp([3.58, s * 1.0, 1.40], [1, 0, 0], { r: 0.09, guard: "plain" });
      K.veh.mirror({ at: [3.2, s * 1.30, 1.62], side: s, arm: 0.26, span: 0.5, h: 0.3, w: 0.18 });
      K.veh.lamp([-3.71, s * 1.1, 1.36], [-1, 0, 0], { r: 0.05, col: "lampRed" });
      K.veh.stowage(-3.2, -2.0, s > 0 ? 1.41 : -1.63, s > 0 ? 1.63 : -1.41, 1.30, 1.62, { straps: true });
      K.veh.visionBlock(-0.9, s * 1.19, 1.86, s * PI / 2, {}); K.veh.visionBlock(-2.3, s * 1.19, 1.86, s * PI / 2, {});
      K.veh.handle([3.0, s * 0.9, 1.63], [3.0, s * 1.15, 1.63], 0.06, [0.5, 0, 0.87]);
      K.veh.bolts([-3.4, s * 1.41, 1.33], [3.3, s * 1.41, 1.33], 22, [0, s, 0]);
      K.veh.mudflap(3.35, s > 0 ? 0.95 : -1.3, s > 0 ? 1.3 : -0.95, 0.9, 1.2);
    });
    K.veh.tool("shovel", 0.9, 1.22, 1.74, PI, 1.0); K.veh.tool("pick", -0.2, -1.22, 1.74, 0, 0.9); K.veh.tool("bar", 1.2, -1.2, 1.74, 0, 1.3);
    K.veh.towCable([[3.3, -0.7, 1.52], [3.42, -0.3, 1.47], [3.42, 0.3, 1.47], [3.3, 0.7, 1.52]], 0.016);
    /* the rear door, an exhaust and the trim vane's frame */
    UP.panel(K.pen("paint", "shade"), 6, 0.28, 0.72, 1.28, 1.92, 0.03);
    K.veh.handle([-3.72, -0.25, 1.6], [-3.72, -0.25, 1.75], 0.05, [-1, 0, 0]);
    K.veh.steps(-0.05, 0.40, -1.44, 1.28, { treads: [0.98, 0.66], depth: 0.16 });     /* the crew step between the axles */
    K.tube(K.pen("metal", "burnt"), [-1.0, 1.44, 1.5], [-2.4, 1.44, 1.5], 0.07, 0.07, 8, true);
    K.veh.handle([3.52, -0.9, 1.3], [3.52, 0.9, 1.3], 0.08, [1, 0, 0.2]);
    K.teamPatch([-2.9, 0, 2.02], [1, 0, 0], [0, 1, 0], 0.5, 0.9);
    return K.finish();
  }

  /* ================================================================= demo_cat
     a 40 m catamaran: two demihulls (loftHull y0 + pair), the bridging
     deck over them with a centre bow and a turtle foredeck, a deckhouse
     with a launcher WELL in its roof, box launchers, a CIWS, shutters, a
     stealth gun shield, a flight deck with nets and markings.           */
  var CAT_DEMI = [
    { x: -19.6, keel: -0.9, sheer: 2.2, bDk: 1.30, bWl: 1.20, bilge: 3.0 },
    { x: -15.0, keel: -1.6, sheer: 2.2, bDk: 1.35, bWl: 1.25, bilge: 2.6 },
    { x: 8.0, keel: -1.6, sheer: 2.2, bDk: 1.35, bWl: 1.20, bilge: 2.4 },
    { x: 15.0, keel: -1.2, sheer: 2.2, bDk: 1.00, bWl: 0.70, bilge: 2.0 },
    { x: 18.5, keel: -0.3, sheer: 2.2, bDk: 0.45, bWl: 0.15, bilge: 1.6 },
    { x: 19.6, keel: 1.2, sheer: 2.2, bDk: 0.0, bWl: 0.0, bKn: 0.0 }
  ];
  var CAT_DECK = [
    { x: -20.0, wet: 2.2, bCh: 5.7, sheer: 4.0, bDk: 5.5 },
    { x: 8.0, wet: 2.2, bCh: 5.7, sheer: 4.0, bDk: 5.5 },
    { x: 12.0, wet: 2.2, bCh: 5.5, sheer: 4.0, bDk: 5.3, crown: 4.3 },
    { x: 16.0, wet: 2.2, keel: 1.3, chine: 2.4, bCh: 4.6, sheer: 4.1, bDk: 4.2, crown: 4.5 },
    { x: 19.0, wet: 2.2, keel: 1.6, chine: 3.0, bCh: 2.6, sheer: 4.3, bDk: 2.4, crown: 4.6 },
    { x: 20.0, wet: 2.2, keel: 3.0, chine: 3.6, bCh: 1.2, sheer: 4.5, bDk: 1.0, crown: 4.6 }
  ];
  function buildCat(THREE, M, C) {
    var K = HeroKit.begin(THREE, M, C, { category: "ship", key: "demo_cat", len: 40,
      paint: { hull: 0x9aa1a5, plate: 0x9ca3a7, shade: 0x7d858a, line: 0x4c5256, can: 0x8f979b } });
    K.contract(["turret", "helipad"]);
    K.part("demihulls");
    K.loftHull({ stations: CAT_DEMI, y0: 4.2, pair: true, deck: false, boot: 0.3 });
    K.part("bridging deck");
    var FD = { x0: -20.5, x1: 20.5, y0: -6, y1: 6 };
    var pFd = K.deckSheet("fdeck", { key: "demo_cat_deck", w: 1024, h: 320, seed: 77, plan: FD, color: HeroKit.authorFor(0x8c9296),
      markings: function (g, w, h, m) {
        var W = "rgba(240,240,232,0.95)";
        m.line([[-18.6, -3.4], [-13.4, -3.4], [-13.4, 3.4], [-18.6, 3.4], [-18.6, -3.4]], 0.2, W);    /* the landing square */
        m.circle(-16.0, 0, 2.2, 0.16, "rgba(236,200,60,0.95)");                                   /* the touchdown circle */
        m.line([[-16.0, -5.0], [-16.0, 5.0]], 0.16, W, [0.5, 0.4]);
        m.line([[-19.8, 5.2], [-12.2, 5.2]], 0.1, "rgba(240,240,232,0.6)"); m.line([[-19.8, -5.2], [-12.2, -5.2]], 0.1, "rgba(240,240,232,0.6)");
      } });
    var D = K.bridgingDeck({ stations: CAT_DECK, pens: { deck: pFd } });
    K.node("helipad", [-16.0, 0, 4.0]);

    K.part("deckhouse");
    var pH = K.pen("plate"), pS = K.pen("plate", "shade"), pL = K.pen("dull", "line"), pG = K.pen("glass"), PI2 = PI / 2;
    /* one house with the launcher well cut into its roof */
    var MH = K.facetedHouse(pH, [
      { z: 4.0, x0: -12.0, x1: 9.0, hw: 5.0, ca: 0.3, cf: 1.8 },
      { z: 5.4, lean: { side: 0.15, front: 0.4, aft: 0.0 } },
      { z: 6.8, lean: { side: 0.25, front: 0.6, aft: 0.05 } }], { well: { x0: -8.6, x1: -2.6, hw: 3.4, floor: 4.6, floorPen: K.pen("deck") } });
    [0, 4].forEach(function (k) {
      K.ship.shutter(MH, k, 0.12, 0.24, 4.3, 5.3, { slats: 9 });                     /* louvred shutters, plumb on the leaning side */
      K.ship.shutter(MH, k, 0.30, 0.42, 4.3, 5.3, { slats: 9 });
      MH.panel(pL, k, 0.66, 0.70, 4.25, 6.4, 0.025, {});                            /* a seam that follows the knuckle at 5.4 */
      MH.panel(pS, k, 0.74, 0.79, 4.25, 6.2, 0.04, {});                             /* a door across the knuckle */
      MH.panel(pS, k, 0.84, 0.88, 5.8, 6.4, 0.03, { round: 0.2, plumb: true });     /* a rounded hatch */
    });
    MH.door(6, 0.3, 4.05); MH.door(6, 0.62, 4.05);
    /* the bridge, its windows plumb on the raked front */
    var BR = K.facetedHouse(pH, [{ z: 6.8, x0: 1.5, x1: 7.8, hw: 4.1, ca: 0.3, cf: 1.3 }, { z: 8.6, lean: { side: 0.4, front: 0.7, aft: 0.05 } }]);
    [[2, 6], [1, 1], [3, 1]].forEach(function (f) {
      var j;
      BR.panel(K.pen("dull", "ink"), f[0], 0.03, 0.97, 7.55, 8.35, 0.02, { plumb: true });
      for (j = 0; j < f[1]; j++) BR.panel(pG, f[0], 0.05 + 0.9 * (j + 0.08) / f[1], 0.05 + 0.9 * (j + 0.92) / f[1], 7.62, 8.28, 0.04, { plumb: true });
    });
    var MS = K.facetedHouse(pH, [{ z: 8.6, x0: 2.4, x1: 5.0, hw: 1.3, ca: 0.2, cf: 0.4 }, { z: 12.6, lean: { side: 0.85, front: 0.9, aft: 0.6 } }]);
    K.ship.radar(3.6, 0, 12.6, { type: "panel", w: 1.2, h: 0.9, ped: 0.15, tilt: 0.25 });
    K.ship.radar(3.6, 0, 11.0, { type: "bar", w: 1.8, h: 0.2, ped: 0.0, yaw: 0.6 });
    K.ship.whip(2.0, 3.0, 8.6, 4.5); K.ship.whip(2.0, -3.0, 8.6, 4.5);
    K.air.lamp([7.4, 3.85, 8.4], 0.07, "lampRed"); K.air.lamp([7.4, -3.85, 8.4], 0.07, "lampGreen");
    MS.panel(pS, 1, 0.2, 0.8, 9.2, 10.4, 0.04, { plumb: true });
    K.teamPatch([3.0, 2.0, 8.6], [1, 0, 0], [0, 1, 0], 1.2, 0.8);

    K.part("weapons");
    /* two banks of box launchers in the well, firing to port and to starboard */
    K.ship.boxLauncher(-7.0, 0, 4.6, { yaw: PI2, rows: 2, cols: 2, sec: 0.8, len: 5.0, ribs: 3, col: "can" });
    K.ship.boxLauncher(-4.2, 0, 4.6, { yaw: -PI2, rows: 2, cols: 2, sec: 0.8, len: 5.0, ribs: 3, col: "can" });
    K.ship.ciws(-10.8, 0, 6.8, { k: 0.7, yaw: PI });
    var gz = D.deckZ(14.2, 0), T = K.group("turret", { at: [14.2, 0, gz] });
    var SH = T.ship.shield(14.2, 0, gz, { len: 3.2, w: 2.4, hRear: 1.7, hFront: 1.15, blen: 3.6, cal: 0.06 });
    T.teamPatch([13.6, 0, SH.hz(13.6) + 0.01], [1, 0, (SH.hz(14.6) - SH.hz(13.6))], [0, 1, 0], 0.8, 0.5);

    K.part("fittings");
    [1, -1].forEach(function (s) {
      K.ship.rail([9.4, 12, 15, 18, 19.4].map(function (x) { return D.edge(x, s); }), { step: 1.5 });   /* round the foredeck */
      K.ship.nets([D.edge(-19.8, s, 0), D.edge(-12.2, s, 0)], s, { out: 0.9, drop: 0.25 });
      K.ship.bollard(10.5, s * 4.2, D.deckZ(10.5, 4.2), 0); K.ship.bollard(-12.6, s * 4.8, 4.0, 0);
      K.ship.shaft([-12.0, s * 4.2, -1.35], [-17.6, s * 4.2, -1.35], { r: 0.07, hullZ: -0.95, screw: { r: 0.55, blades: 5, phase: s * 0.3 } });
      K.ship.rudder(-18.6, s * 4.2, -0.6, { h: 1.0, c: 0.8 });
      var fl = D.flank(-6, 0.5, s); K.ship.scuttles([fl.p, D.flank(-3, 0.5, s).p, D.flank(0, 0.5, s).p], fl.n, 0.15);
      K.ship.raft(-10.6, s * 3.6, 6.8, 0, 1.2, 0.3);
    });
    K.ship.rail([[-19.9, -5.3, 4.0], [-19.9, 5.3, 4.0]], { step: 1.5 });
    K.ship.anchor(19.6, 0, 3.8, [1, 0, -0.3], 0.6);
    K.ship.hatch(17.0, 0, D.deckZ(17, 0), 0.7, 0.7, 0);
    return K.finish();
  }

  /* ================================================================ demo_helo
     a twin-engined helicopter: a two-colour fuselage (loftBody split), a
     clockwise four-blade head on a mast leaning 3 deg forward (K.air.rotor,
     sense -1: the rotor frame is turned so its +Z points down the mast),
     its blur disc, a port-side tail rotor, plain jet pipes.             */
  var HELO = [
    { x: 4.3, w: 0.0, top: 1.30, bot: 1.30 },
    { x: 4.0, w: 0.42, top: 1.62, bot: 0.92 },
    { x: 3.4, w: 0.74, top: 2.00, bot: 0.72, eU: 2.4, eL: 3.0 },
    { x: 2.4, w: 0.95, top: 2.32, bot: 0.62, eU: 3.2, eL: 3.4 },
    { x: -1.6, w: 0.95, top: 2.35, bot: 0.62, eU: 3.2, eL: 3.4 },
    { x: -2.8, w: 0.62, top: 2.25, bot: 1.25, eU: 2.6 },
    { x: -4.0, w: 0.30, top: 2.10, bot: 1.70 },
    { x: -7.6, w: 0.17, top: 2.06, bot: 1.86 },
    { x: -8.1, w: 0.10, top: 2.04, bot: 1.92 }
  ];
  function buildHelo(THREE, M, C) {
    var K = HeroKit.begin(THREE, M, C, { category: "air", key: "demo_helo", len: 15.94, paint: { skin: 0x3d4535, under: 0x8f989c } });
    K.contract(["rotor", "rotordisc", "tailrotor"]);
    var skin = K.pen("skin"), low = K.pen("skin", "under"), pg = K.pen("glass");
    K.part("fuselage");
    var B = K.loftBody(skin, HELO, { n: 24, capA: true, split: { z: 1.25, below: low, minDeg: 5, maxDeg: 65, hold: 3.4 } });
    [1, -1].forEach(function (s) { K.air.seam(B.demarcation(s, -7.8, 3.9, 24), 0.02); });
    K.loftBody(skin, [{ x: 1.4, w: 0.0, top: 2.32, bot: 2.30 }, { x: 0.9, w: 0.55, top: 2.85, bot: 2.25 }, { x: -1.6, w: 0.6, top: 2.95, bot: 2.25 },
                      { x: -2.7, w: 0.35, top: 2.62, bot: 2.2 }, { x: -3.3, w: 0.0, top: 2.3, bot: 2.25 }], { n: 16 });       /* the engine deck */
    K.air.canopy([{ x: 4.05, w: 0.0, sill: 1.45, top: 1.5 }, { x: 3.7, w: 0.62, sill: 1.40, top: 1.95 }, { x: 3.0, w: 0.86, sill: 1.55, top: 2.28 },
                  { x: 2.5, w: 0.0, sill: 2.1, top: 2.33 }], { frames: [3.35], spine: true, e: 2.6 });
    [1, -1].forEach(function (s) {
      [[1.6, 0.5], [0.2, 0.5], [-1.0, 0.5]].forEach(function (q) { K.disc(pg, B.pt(q[0], s > 0 ? 0.35 : PI - 0.35, 0.01), B.nrm(q[0], s > 0 ? 0.35 : PI - 0.35), 0.24, 10); });
      K.air.seam(B.line(s > 0 ? 0.05 : PI - 0.05, -1.5, 2.0, 4), 0.03);                                 /* the cabin door's sill */
      K.air.jetPipe({ x: -2.55, y: s * 0.5, z: 2.6, r: 0.15, dir: [-1, s * 0.45, 0.1] });
      K.air.gearLeg({ x: -0.6, y: s * 1.25, top: 1.0, r: 0.3, w: 0.18, side: s, rake: 0.0 });            /* fixed gear: not a "gear" node */
      K.bar(K.pen("metal", "strut"), [-0.6, s * 0.7, 0.9], [-0.6, s * 1.22, 0.62], 0.08, 0.06);
    });
    K.air.gearLeg({ x: 3.0, y: 0, top: 0.8, r: 0.2, w: 0.12, side: 0 });
    K.part("tail");
    var F = K.aerofoil(skin, [{ s: 1.95, le: -6.9, c: 1.4, t: 0.12 }, { s: 3.55, le: -7.85, c: 0.85, t: 0.1 }], { frame: "fin" });
    K.aerofoil(skin, [{ s: 0.12, le: -6.3, c: 0.75, t: 0.1, z: 1.98 }, { s: 1.15, le: -6.45, c: 0.55, t: 0.08, z: 1.98 }], { frame: "wing", lower: low });
    K.teamStrip(B.line(PI / 2, -6.8, -5.4, 3).pts, [0, 0, 1], 0.22, 0.01);
    K.air.lamp(F.at(3.5, 0.6, 1), 0.04, "lampWhite");
    K.part("rotors");
    K.air.rotor({ at: [0.35, 0, 3.4], r: 6.6, blades: 4, chord: 0.42, sense: -1, leanDeg: 3, mast: { z0: 2.9 } });
    K.air.tailRotor({ at: [-7.95, 0.26, 3.05], r: 1.05, blades: 4, side: 1, chord: 0.18 });
    return K.finish();
  }

  UNIT_MODELS["demo_cat"] = { len: 40, build: buildCat };
  UNIT_MODELS["demo_helo"] = { len: 15.94, build: buildHelo };

  UNIT_MODELS["demo_ship"] = { len: 42, build: buildShip };
  UNIT_MODELS["demo_air"] = { len: 14.95, build: buildAir };
  UNIT_MODELS["demo_veh"] = { len: 7.48, build: buildVeh };
})();
