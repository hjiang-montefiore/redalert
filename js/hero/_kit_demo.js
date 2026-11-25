/* ========================= js/hero/_kit_demo.js ==========================
   DEMO ONLY -- not wired into index.html, not a real unit.  Three small,
   GENERIC models built entirely from js/hero_kit.js (HeroKit), to prove the
   kit and to show how a hero file reads when its tables are the model:

     demo_ship   a 42 m patrol boat   (loftHull, facetedHouse, ship kit,
                                       a plan-mapped deck with markings)
     demo_air    a 15.0 m jet         (loftBody, aerofoil, air kit, sheet)
     demo_veh    a 7.5 m 8x8 APC      (facetedHouse, vehicle kit)

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
    var K = HeroKit.begin(THREE, M, C, { category: "ship", key: "demo_ship", len: 42 });
    K.contract(["turret"]);
    /* the deck is ONE sheet mapped in plan, so it can carry painted lines */
    var PLAN = { x0: -21.5, x1: 21.5, y0: -3.8, y1: 3.8 };
    K.material("deck", { vcol: true, rough: 0.95, metal: 0.04, uv: { mode: "plan", x0: PLAN.x0, x1: PLAN.x1, y0: PLAN.y0, y1: PLAN.y1 },
      map: { key: "demo_ship_deck", w: 1024, h: 256, seed: 41, plan: PLAN, panels: { cols: 14, rows: 3, alpha: 0.16, lit: 0.04, width: 1, stagger: 20 },
             blots: { n: 60, size: [10, 50], alpha: 0.07 }, grime: { n: 40, alpha: 0.06 }, rust: { n: 16, strength: 0.5, runs: 0.3 },
             deckMarkings: function (g, w, h, m) {
               m.line([[-20.5, 2.5], [9.5, 2.9]], 0.10, "rgba(230,228,215,0.55)");             /* the walkway lines */
               m.line([[-20.5, -2.5], [9.5, -2.9]], 0.10, "rgba(230,228,215,0.55)");
               m.circle(-17.2, 0, 1.9, 0.14, "rgba(232,230,218,0.75)");                         /* a working circle aft */
               m.line([[-19.1, 0], [-15.3, 0]], 0.10, "rgba(232,230,218,0.6)", [0.5, 0.35]);
               m.rect(11.6, -1.2, 14.6, 1.2, "rgba(20,22,24,0.22)");                            /* the gun's blast area */
             } } });

    K.part("hull");
    var H = K.loftHull({ stations: SHIP_STATIONS, boot: 0.3 });

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
    var FN = K.facetedHouse(K.pen("plate", "plate"), [
      { z: 5.2, x0: -7.4, x1: -4.2, hw: 1.0, ca: 0.35, cf: 0.35 },
      { z: 7.1, lean: { side: 0.18, front: 0.35, aft: -0.25 } }]);
    K.box(K.pen("dull", "ink"), -7.0, -4.6, -0.55, 0.55, 7.1, 7.2);       /* the funnel cap */
    [3, 5].forEach(function (k) { FN.panel(K.pen("dull", "dark"), k === 3 ? 4 : 0, 0.25, 0.75, 5.6, 6.5, 0.03); });   /* louvres */

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
    K.ship.hatch(9.4, 0, H.deckZ(9.4), 0.9, 0.9, 0); K.ship.hatch(16.2, 0, H.deckZ(16.2), 0.7, 0.7, 0); K.ship.hatch(-11.5, 1.4, H.deckZ(-11.5), 1.0, 0.8, 0);
    K.ship.boat(-14.2, -1.1, H.deckZ(-14.2) + 0.12, 0, 5.2, 2.0, { type: "rib" });
    K.ship.davit(-12.4, -2.6, H.deckZ(-12.4), PI * 0.75, 2.7, 1.5); K.ship.davit(-16.0, -2.6, H.deckZ(-16), PI * 0.75, 2.7, 1.5);
    K.ship.boat(-14.2, 1.5, H.deckZ(-14.2) + 0.12, 0, 4.6, 1.6, { type: "whaler" });
    K.cylZ(K.pen("metal", "dark"), 18.3, 0, H.deckZ(18.3), H.deckZ(18.3) + 0.5, 0.28, 10);       /* the capstan */
    /* shafts, brackets, screws and rudders: nothing fancy, but under water */
    [1, -1].forEach(function (s) {
      var pm = K.pen("metal", "steel");
      K.tube(pm, [-12.0, s * 1.3, -1.25], [-18.6, s * 1.3, -1.35], 0.07, 0.07, 6, false);
      K.tube(pm, [-18.6, s * 1.3, -1.35], [-18.6, s * 1.3, -0.55], 0.05, 0.05, 4, false);
      for (var b = 0; b < 4; b++) K.blade(K.pen("metal", 0x8a6a2c), [-18.85, s * 1.3, -1.35], [0, Math.cos(b * PI / 2), Math.sin(b * PI / 2)], [0.5, -Math.sin(b * PI / 2), Math.cos(b * PI / 2)], 0.55, 0.3, 0.2, 0.03, 0);
      K.blade(K.pen("hull", "under"), [-19.9, s * 1.3, -0.45], [0, 0, -1], [1, 0, 0], 1.1, 0.9, 0.7, 0.1, 0.05);
    });
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
  var WING = [{ s: 0.60, le: 1.6, c: 4.3, t: 0.05, z: 1.66 }, { s: 4.40, le: -1.6, c: 1.3, t: 0.04, z: 1.60 }];
  var STAB = [{ s: 0.45, le: -4.6, c: 2.0, t: 0.045, z: 1.80 }, { s: 2.50, le: -6.1, c: 0.8, t: 0.04, z: 1.80 }];
  var FIN = [{ s: 2.25, le: -3.7, c: 2.7, t: 0.05 }, { s: 4.70, le: -6.0, c: 1.0, t: 0.04 }];
  var CANOPY = [{ x: 5.25, w: 0.0, sill: 2.17, top: 2.19 }, { x: 4.7, w: 0.30, sill: 2.22, top: 2.60 }, { x: 3.9, w: 0.37, sill: 2.30, top: 2.86 },
                { x: 3.0, w: 0.35, sill: 2.36, top: 2.82 }, { x: 2.0, w: 0.0, sill: 2.40, top: 2.43 }];
  function buildAir(THREE, M, C) {
    var K = HeroKit.begin(THREE, M, C, { category: "air", key: "demo_air", len: 14.95 });
    K.contract(["gear"]);
    function wl(u, a, b) { var p0 = WING[0], p1 = WING[1], out = [], k; for (k = 0; k <= 4; k++) { var s = a + (b - a) * k / 4, f = (s - p0.s) / (p1.s - p0.s); out.push([p0.le + (p1.le - p0.le) * f - u * (p0.c + (p1.c - p0.c) * f), s]); } return out; }
    K.paintSheet({ key: "demo_air", seed: 1543, bounds: { x0: -7.6, x1: 7.3, ymax: 4.8, z0: 0, z1: 4.9 }, seam: 0.5, grime: 200,
                   frames: [[6.3, 0.3], [5.4, 0.45], [2.0, 0.8], [0.4, 0.8], [-1.2, 0.8], [-2.8, 0.8], [-4.4, 0.75], [-5.8, 0.6]],
                   top: [wl(0.15, 0.9, 4.3), wl(0.45, 0.9, 4.3), wl(0.72, 0.9, 4.2), [[-4.9, 0.6], [-6.3, 2.3]]],
                   bot: [wl(0.30, 0.9, 4.3), wl(0.72, 0.9, 4.2), [[4.0, 0.3], [-5.0, 0.3]]],
                   rivets: [wl(0.30, 0.9, 4.3), wl(0.60, 0.9, 4.2)],
                   side: [[[5.6, 1.9], [-6.2, 1.9]], [[1.5, 1.45], [-5.0, 1.5]]],
                   walk: [[[1.2, 0.75], [-1.6, 0.75], [-1.6, 1.3], [0.6, 1.3]]],
                   soot: [[-6.9, 0, 1.8, 0.8, 0.4]] });
    var skin = K.pen("skin"), dome = K.pen("skin", "radome");

    K.part("fuselage");
    var B = K.loftBody(skin, BODY, { n: 20, capA: true });
    K.loftBody(dome, [{ x: 7.0, w: 0.0, top: 1.70, bot: 1.70 }, { x: 6.65, w: 0.125, top: 1.845, bot: 1.575 }, { x: 6.3, w: 0.225, top: 1.955, bot: 1.475 }], { n: 20, step: 0.12 });
    K.part("flying surfaces");
    var W = K.aerofoil(skin, WING, { frame: "wing" });
    var ST = K.aerofoil(skin, STAB, { frame: "wing" });
    var F = K.aerofoil(skin, FIN, { frame: "fin" });
    K.part("propulsion");
    [1, -1].forEach(function (s) {
      K.air.intake({ x: 2.7, y: s * 0.98, z: 1.72, w: 0.27, h: 0.40, e: 3, len: 2.9, y1: s * 0.62, z1: 1.72, w1: 0.30, h1: 0.46, rake: 0.25, depth: 1.3,
                     splitter: { gap: 0.07, fwd: 0.35, len: 1.0 } });
    });
    K.air.nozzle({ x: -6.6, y: 0, z: 1.78, r0: 0.47, r1: 0.37, len: 0.75, petals: 16 });
    K.part("canopy");
    K.air.canopy(CANOPY, { frames: [4.55, 3.15], spine: false });
    K.part("gear");
    var G = K.group("gear");
    G.air.gearLeg({ x: 4.4, y: 0, top: 1.36, r: 0.24, w: 0.16, side: 0, rake: 0.08, door: { len: 0.9, h: 0.5, side: 1 }, brace: [3.7, 0, 1.32] });
    [1, -1].forEach(function (s) {
      G.air.gearLeg({ x: -0.9, y: s * 1.35, top: 1.60, r: 0.34, w: 0.22, side: s, rake: -0.06, door: { len: 1.1, h: 0.7, side: -s }, brace: [-0.9, s * 0.85, 1.3] });
    });
    K.part("details");
    [5.4, 2.0, -1.2, -4.4].forEach(function (x) { K.air.hoop(B, x, 0, PI * 2, 0.025); });
    [1, -1].forEach(function (s) {
      K.air.seam(W.line(0.72, 1.0, 4.2, 6, 1, s), 0.03); K.air.seam(W.line(0.72, 1.0, 4.2, 6, -1, s), 0.03);
      K.air.seam(ST.line(0.30, 0.6, 2.4, 4, 1, s), 0.03);
      K.air.lamp(W.at(4.38, 0.35, 1, s), 0.05, s > 0 ? "lampRed" : "lampGreen");
      var u = W.at(2.6, 0.30, -1, s);
      K.air.pylon({ x: u[0] + 0.7, y: u[1], z: u[2], len: 1.5, h: 0.28 });
      K.air.pylon({ x: W.at(1.6, 0.3, -1, s)[0] + 0.8, y: s * 1.6, z: W.at(1.6, 0.3, -1, s)[2], len: 1.7, h: 0.3 });
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
    /* the lower hull between the wheels, then the upper hull over them */
    K.facetedHouse(paint, [
      { z: 0.46, poly: FP(-3.30, 2.70, 0.80, 0.80, 0.05, 0.05) },
      { z: 0.80, poly: FP(-3.55, 3.35, 0.86, 0.86, 0.05, 0.05) },
      { z: 1.22, poly: FP(-3.62, 3.62, 0.88, 0.88, 0.05, 0.05) }], { bottom: true });
    var UP = K.facetedHouse(paint, [
      { z: 1.20, poly: FP(-3.66, 3.70, 1.38, 1.30, 0.06, 0.30) },
      { z: 1.46, poly: FP(-3.70, 3.50, 1.40, 1.30, 0.06, 0.30) },
      { z: 2.02, poly: FP(-3.52, 1.55, 1.12, 1.02, 0.10, 0.22) }]);
    K.part("running gear");
    K.veh.wheels({ axles: AX, r: R, hw: 0.19, y: TY, col: "paint" });
    /* wheel-arch lips and mud flaps */
    AX.forEach(function (x) {
      [1, -1].forEach(function (s) { K.box(K.pen("paint", "shade"), x - 0.66, x + 0.66, s > 0 ? 0.9 : -1.42, s > 0 ? 1.42 : -0.9, 1.20, 1.235); });
    });
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
      K.veh.lamp([3.58, s * 1.0, 1.36], [1, 0, 0], { r: 0.09, guard: true });
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
    K.tube(K.pen("metal", "burnt"), [-1.0, 1.44, 1.5], [-2.4, 1.44, 1.5], 0.07, 0.07, 8, true);
    K.veh.handle([3.52, -0.9, 1.3], [3.52, 0.9, 1.3], 0.08, [1, 0, 0.2]);
    K.teamPatch([-2.9, 0, 2.02], [1, 0, 0], [0, 1, 0], 0.5, 0.9);
    return K.finish();
  }

  UNIT_MODELS["demo_ship"] = { len: 42, build: buildShip };
  UNIT_MODELS["demo_air"] = { len: 14.95, build: buildAir };
  UNIT_MODELS["demo_veh"] = { len: 7.48, build: buildVeh };
})();
