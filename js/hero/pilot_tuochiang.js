/* ====================== js/hero/pilot_tuochiang.js =======================
   HERO MODEL (pipeline pilot) -- Tuo Chiang-class corvette, drawn as the
   60.4 m prototype Tuo Chiang (PGG-618): a wave-piercing CATAMARAN.

   KEYS  roc_e00_corvette  and  corvette_r  (the skirmish row; the same hull,
         js/hero/skirmish_reuse.js copies the era row onto it).
   SPEC  tools/model3d/specs/roc_e00_corvette.json (and corvette_r.json):
         published figures, references, must_show, not_confirmed.  Every
         station below is in the spec's model space: +X bow, +Y port, +Z up,
         metres, WATERLINE at z = 0, prow at X +30.2, transom at X -30.2.
   LOAD  after js/hero_kit.js, js/hero/roc_ships2.js (the model it replaces)
         and js/hero/skirmish_reuse.js (which would otherwise copy the old
         builder over corvette_r again).

   REFERENCES (tools/model3d/specs/ref/roc_e00_corvette/, see the spec):
     [N2] hf3_firing_port_broadside.jpg  a sea-level port broadside, 14.2 px/m
          (prow x 250, waterline row 646).  THE source for the forward 32 m:
          prow 5.2 m up, foredeck crown 5.6 - 6.0, the 76 mm shield X 13.2 -
          16.75 (top 8.1), bridge foot X 12.6 and its raked face (0.35 m per
          m), bridge roof 11.1, the block's top 9.65, the facet line at 6.9,
          director ball top 14.2 at X 8.7, mast foot X 3.6 - 7.1, yard 15.6 -
          15.85, radar bar 17.1 - 17.5, pole 18.2, the dome abaft the bridge
          (X 2.95, 10.5 m), the shutter X -4.3 .. -1.7 between 2.5 and 6.7 m,
          the centre bow's stem (2.8 m up at X 29.6, 1.7 m at X 28.8).
     [A1] pgg618_from_above.jpg  the aerial, 15.2 px/m on 60.4 m: gun 14.8 m
          and bridge foot 18.4 m abaft the prow (the cross-check of [N2]'s
          scale), launcher well 30.6 - 43.4, Phalanx 44.7, the step down to
          the flight deck 47.2; the pointed foredeck plan.
     [B1] pgg618_bow_quarter.jpg  the two stem blades, the tunnel, the centre
          bow and its anchor, the chine and the leaning sides, the bridge
          windows, the ears on the roof, the sensor ball at the bridge foot.
     [M1] pgg618_model_1_72.jpg  the well's canister banks, the Phalanx block,
          the flight deck and its landing square, the shutters, the waterjet
          housings standing out of the transoms.
     [B2] pgg619_leaving_port.jpg  (the 65 m production ship) the foredeck's
          fall to the sides only.
   PUBLISHED  60.4 m (length on cushion) x 14.0 m, draught 2.3 m.
   MEASURED   (dump.js) 60.405 x 14.06 x 20.59 m: keel -2.3, pole 18.29; the 0.06 m
     over the beam is the seam strip standing proud of the chine.  14 261
     triangles, 13 draw calls.

   CORRECTIONS against the model this replaces (js/hero/roc_ships2.js):
     - it had the 76 mm 4.6 m too far forward (X +20; [N2] and [A1] both give
       +15.4), the superstructure 1.5 m too low (8.1; [N2] 9.65) and the bridge
       roof at 12.0 ([N2] 11.1), a flat foredeck at 7.0 - 7.3 m ([N2]: a turtle
       deck falling from 6.0 to 5.2 m at the prow) and a box-section upper body;
     - the raised centre bow was missing; the demihull stems rake back from a thin
       blade at the waterline, whose tip [B1] puts within about 1 m of the prow
       (the hull proper meets the water about 3.2 m abaft it, [N2]);
     - (review 2) the bow under the deck edge is a bluff shell: the chine keeps
       4.7 m of half breadth to X +27, outside the deck edge, and the demihull's
       side runs up into it [B1][B2]; plan fill rises to 93.7 % with it;
     - the hull sides were one leaning slab: they flare OUT to a chine 2.6 m up
       and lean in above it, with a second facet line at 6.9 m.
   PAINT  plain light grey over a darker grey lower hull, black boot line, red-
     brown anti-fouling, dark grey non-skid decks; the chevron camouflage and the
     number of the photographs are NOT drawn.  Team colour: two small patches.
   NODES  "turret" (the 76 mm; origin on its ring, gun along +X) and the hidden
     "helipad" marker on the flight deck (same place as the old model).
   KIT GAPS (built here from kit primitives; see the report): no multihull loft
     (loftHull is a monohull about y = 0 with no lateral offset), so the two
     demihulls, the tunnel, the centre bow and the turtle deck are gridSkin
     bands from the tables below; no box-launcher fitting; no CIWS fitting; no
     louvred shutter; no deck-edge / well cut-out in facetedHouse (the launcher
     well is assembled from five houses); gunHouse has no sloped-roof shield.
   NOT CONFIRMED: see the spec's not_confirmed list.   ASCII only.
========================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPilotTuoChiang = (function () {
  "use strict";
  var PI = Math.PI;
  var XB = 30.2, XS = -30.2;                 /* prow and transom */
  var XH = -29.55;                           /* the demihulls' own transoms: the jet housings stand out of them [M1] */
  var XTIP = 29.5;                           /* the stem blades' tips at the waterline: [B1] puts them 0.4 - 1 m abaft the prow */
  var CH = 2.6;                              /* the chine = the wet deck (tunnel roof) height */
  var ZF = 4.0;                              /* flight deck [M1] */
  var ZK = 6.9, ZT = 9.65, ZR = 11.1;        /* facet line, block top, bridge roof [N2] */
  var ZP = 8.55;                             /* the Phalanx block's top, 1.1 m under the well walls' [B1][A1][M1] */
  var ZW = 6.6;                              /* the launcher well's floor */
  var XA0 = -17.0;                           /* the step up from the flight deck [A1] */
  var WX0 = -13.2, WX1 = -0.4;               /* the launcher well [A1] */
  var RAKE = 0.352;                          /* bridge face, m of set-back per m of height [N2] */

  /* ---- tables (x ascending).  [N2] unless marked */
  var T_SIL = [[12.0, 6.0], [16.96, 5.92], [23.16, 5.56], [30.2, 5.21]];          /* foredeck crown = the silhouette's top */
  var T_HE = [[12.0, 6.6], [13.0, 6.6], [16.0, 6.5], [18.0, 6.3], [20.0, 5.95], [22.0, 5.45], [24.0, 4.8], [26.0, 3.95],
              [28.0, 2.9], [29.5, 1.85], [30.2, 1.35]];                           /* deck-edge half breadth [A1][B1] */
  var T_HC = [[12.0, 7.0], [14.0, 6.95], [16.0, 6.75], [18.0, 6.5], [20.0, 6.2], [22.0, 5.8], [24.0, 5.4], [26.0, 4.95],
              [27.0, 4.7], [28.0, 3.95], [29.0, 2.9], [29.8, 1.75], [30.2, 1.2]];   /* half breadth at the chine: [B1] a bluff shell, about 4.6 m as far forward as X 27, then closing to the prow (review 2) */
  var T_ZCH = [[12.0, 2.6], [26.0, 2.6], [27.5, 2.8], [29.0, 3.4], [29.8, 4.0], [30.2, 4.5]];   /* the chine lifts into the prow */
  var T_ZC = [[12.0, 2.6], [17.0, 2.6], [20.0, 2.2], [24.0, 1.6], [27.0, 1.5], [28.8, 1.7], [29.64, 2.82], [30.2, 4.1]];   /* centre bow keel */
  /* demihull: outer and inner waterline, keel, top */
  var T_DH = [[-29.55, 6.85, 3.6, -1.15, 2.6], [-28.0, 6.85, 3.6, -1.7, 2.6], [-25.0, 6.85, 3.6, -2.3, 2.6], [12.0, 6.85, 3.6, -2.3, 2.6],
              [14.0, 6.76, 3.64, -2.3, 2.6], [16.0, 6.6, 3.7, -2.22, 2.6], [20.0, 6.0, 4.0, -2.0, 2.6], [22.0, 5.68, 4.2, -1.7, 2.6],
              [23.0, 5.47, 4.3, -1.5, 2.6], [24.0, 5.27, 4.4, -1.3, 2.6], [25.5, 4.98, 4.5, -1.0, 2.6], [26.3, 4.82, 4.55, -0.9, 2.6],
              [27.0, 4.68, 4.6, -0.8, 2.6], [27.5, 4.76, 4.66, -0.7, 2.15], [27.9, 4.8, 4.7, -0.6, 1.5], [28.3, 4.8, 4.71, -0.5, 0.95],
              [28.7, 4.8, 4.72, -0.4, 0.66], [29.5, 4.775, 4.765, -0.1, 0.5]];

  function build(THREE, M, C, key) {
    var HK = HeroKit, lin = HK.lin, V = HK.vec, lerp = V.lerp;
    var K = HK.begin(THREE, M, C, { category: "ship", key: key || "roc_e00_corvette", len: 60.4,
      paint: { hull: 0xa7acaf, plate: 0xa9aeb1, band: 0x687076, deck: 0x666d71, tunnel: 0x3b4044, under: 0x5a2019, boot: 0x17191b,
               can: 0x9aa0a3, canDark: 0x555b5f, raft: 0xd4d6d2, dome: 0xd9dbd8, shade: 0x8d9397, line: 0x4c5256 } });
    K.contract(["turret", "helipad"]);
    /* the hull plating: the stock sheet's seams drawn harder, so the facets read at the game camera */
    K.material("hull", { vcol: true, rough: 0.86, metal: 0.06, uv: { mode: "tile", su: 1 / 20, sv: 1 / 8 },
      map: { key: "tuo_hull", w: 512, h: 256, seed: 618, panels: { cols: 7, rows: 4, alpha: 0.24, lit: 0.08, width: 1.4, stagger: 16 },
             blots: { n: 30, size: [10, 60], alpha: 0.018 }, streaks: { n: 110, len: [0.06, 0.32], alpha: 0.06 }, rust: { n: 22, strength: 0.5 },
             grime: { n: 24, alpha: 0.05 } } });
    K.material("plate", { vcol: true, rough: 0.86, metal: 0.06, uv: { mode: "tile", su: 0.2, sv: 0.2 },
      map: { key: "tuo_plate", w: 256, h: 256, seed: 619, panels: { cols: 3, rows: 3, alpha: 0.22, lit: 0.08, width: 1.4, stagger: 0 },
             blots: { n: 20, size: [12, 50], alpha: 0.02, dark: 0.5 }, hatches: { n: 3 }, streaks: { n: 50, len: [0.05, 0.25], alpha: 0.05 },
             rust: { n: 12, strength: 0.5 } } });
    /* non-skid deck: the stock sheet's seams with far less mottling (it read as camouflage at the game camera) */
    K.material("deck", { vcol: true, rough: 0.95, metal: 0.04, uv: { mode: "tile", su: 0.25, sv: 0.25 },
      map: { key: "tuo_deck", w: 256, h: 256, seed: 621, panels: { cols: 3, rows: 4, alpha: 0.2, lit: 0.05, width: 1, stagger: 30 },
             blots: { n: 26, size: [14, 44], alpha: 0.022 }, grime: { n: 14, alpha: 0.035 }, streaks: { n: 40, len: [0.04, 0.2], alpha: 0.04 } } });
    /* the flight deck is one sheet mapped in plan: the landing square and its dashed line [M1][A1] (lines only) */
    var FP = { x0: XS, x1: XA0 + 0.4, y0: -7.0, y1: 7.0 };
    K.material("fdeck", { vcol: true, rough: 0.95, metal: 0.04, uv: { mode: "plan", x0: FP.x0, x1: FP.x1, y0: FP.y0, y1: FP.y1 },
      map: { key: "tuo_fdeck", w: 512, h: 512, seed: 620, plan: FP, base: "#74797d",      /* the sheet carries the deck grey: the pen is near white so the lines can be lighter than the deck */
             panels: { cols: 5, rows: 5, alpha: 0.2, lit: 0.04, width: 1, stagger: 20 },
             blots: { n: 30, size: [10, 46], alpha: 0.025 }, grime: { n: 16, alpha: 0.04 }, oil: { n: 8 },
             deckMarkings: function (g, w, h, m) {
               var W = "rgba(236,236,226,0.9)";
               m.line([[-27.6, -3.9], [-19.6, -3.9], [-19.6, 3.9], [-27.6, 3.9], [-27.6, -3.9]], 0.22, W);       /* the landing square */
               m.line([[-23.0, -6.3], [-23.0, 6.3]], 0.2, W, [0.55, 0.45]);                                         /* the dashed line, athwartships [M1][A1] */
               m.line([[-29.9, -6.35], [-17.3, -6.35]], 0.1, "rgba(236,236,226,0.55)");                           /* deck-edge lines */
               m.line([[-29.9, 6.35], [-17.3, 6.35]], 0.1, "rgba(236,236,226,0.55)");
               m.rect(-21.6, -6.0, -19.9, -4.4, "rgba(20,22,24,0.25)");                                          /* the darker panels [M1] */
               m.rect(-27.4, 4.4, -25.6, 6.0, "rgba(20,22,24,0.25)");
             } } });

    var pHull = K.pen("hull", "hull"), pBand = K.pen("hull", "band"), pBoot = K.pen("hull", "boot"), pUnder = K.pen("hull", "under"),
        pTun = K.pen("hull", "tunnel"), pDeck = K.pen("deck", "deck"), pPl = K.pen("plate", "plate"), pShade = K.pen("plate", "shade"),
        pDark = K.pen("dull", "dark"), pInk = K.pen("dull", "ink"), pLine = K.pen("dull", "line"), pMet = K.pen("metal", "metal"),
        pSteel = K.pen("metal", "dark"), pGlass = K.pen("glass"), pDome = K.pen("plate", "dome"), pCan = K.pen("plate", "can"),
        pCanD = K.pen("dull", "canDark"), pFd = K.pen("fdeck", 0xdcdcd4), pShut = K.pen("hull", "shade");
    var s, i, k;

    /* ================================================== the two demihulls
       (KIT GAP: loftHull cannot be offset from the centre line).  One closed
       section per station, skinned band by band so the waterline, the boot
       line and the top edge stay crisp.                                   */
    K.part("demihulls");
    function dsec(x) {
      var v = lin(T_DH, x), yo = v[0], yi = v[1], kz = v[2], zt = v[3], yc = (yo + yi) / 2, b = (yo - yi) / 2, f = zt / CH;
      var zb = Math.min(0.3, zt - 0.02);
      return { x: x, yc: yc, kz: kz, zt: zt,
               P: [[yi - 0.3 * f, zt], [yi - 0.3 * f * zb / zt, zb], [yi, 0], [yc - b * 0.78, kz * 0.55], [yc, kz], [yc + b * 0.78, kz * 0.55], [yo, 0],
                   [yo + 0.15 * f * zb / zt, zb], [yo + 0.15 * f, zt]] };
    }
    var DX = HK.stations(XH, 12.0, 3.4, [-28.0, -25.0]).concat([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 23.6, 24.2, 24.8, 25.4, 25.9, 26.3, 26.65, 27.0, 27.25, 27.5, 27.9, 28.3, 28.7, 29.1, XTIP]);
    for (s = -1; s <= 1; s += 2) {
      var SEC = DX.map(dsec), AX = SEC.map(function (q) { return [q.x, s * q.yc, q.zt * 0.4]; });
      var G = function (a, b) { return SEC.map(function (q) { var r = [], j; for (j = a; j <= b; j++) r.push([q.x, s * q.P[j][0], q.P[j][1]]); return r; }); };
      K.gridSkin(pUnder, G(2, 6), AX);                               /* under water */
      K.gridSkin(pBoot, G(1, 2), AX); K.gridSkin(pBoot, G(6, 7), AX);
      K.gridSkin(pBand, G(7, 8), AX);                                /* the outer side, darker grey to the chine */
      K.gridSkin(pTun, G(0, 1), AX);                                 /* the inner side, in the tunnel */
      /* the top of the blade where it comes out from under the body (X > 21) */
      var top = [], tax = [];
      SEC.forEach(function (q) { if (q.x >= 20.9) { top.push([[q.x, s * q.P[0][0], q.zt], [q.x, s * q.P[8][0], q.zt]]); tax.push([q.x, s * q.yc, q.zt - 1]); } });
      K.gridSkin(pBand, top, tax);
      /* the transom: a fan in the band's colours */
      var q0 = SEC[0], cen = [q0.x, s * q0.yc, 0.6], ref = [q0.x + 1, s * q0.yc, 0.6];
      for (i = 0; i < 9; i++) {
        var a = q0.P[i], b = q0.P[(i + 1) % 9], zm = (a[1] + b[1]) / 2;
        K.tri(zm < 0.01 ? pUnder : (zm < 0.3 ? pBoot : pBand), cen, [q0.x, s * a[0], a[1]], [q0.x, s * b[0], b[1]], ref);
      }
      /* the waterjets [M1]: two housings a hull standing out of the transom, the nozzle and its steering bucket */
      [-0.72, 0.72].forEach(function (o) {
        var jy = s * (q0.yc + o), jz = 0.42;
        K.cylX(pSteel, XH - 0.02, XH - 0.36, jy, jz, 0.56, 12, 0.5);
        K.tube(pSteel, [XH - 0.36, jy, jz], [XS + 0.1, jy, jz - 0.05], 0.44, 0.36, 12, false);
        K.disc(pInk, [XS + 0.14, jy, jz - 0.05], [-1, 0, 0], 0.34, 12);
        K.box(pSteel, XH - 0.5, XH - 0.02, jy - 0.07, jy + 0.07, jz + 0.5, jz + 0.95);                  /* the bucket's ram */
        K.bar(pMet, [XH - 0.1, jy, jz + 0.9], [XS + 0.2, jy, jz + 0.46], 0.06);
        K.tube(pMet, [XH - 0.36, jy, jz], [XH - 0.3, jy, jz], 0.6, 0.6, 12, false);                      /* the flange */
      });
      K.box(pSteel, XH - 0.3, XH + 0.02, s * q0.yc - 0.08, s * q0.yc + 0.08, -0.5, 0.2);                 /* the plate between the jets */
    }

    /* ========================================= the bridging hull, aft and bow
       hw(x, z): the shell's half breadth.  Abaft X 12 the sides flare from the
       demihull's waterline out to the chine (7.0 m at 2.6 m) and lean in
       above it; forward they follow the tables.                           */
    K.part("hull");
    function hwMid(z) { return z <= ZK ? lerp(7.0, 6.45, (z - CH) / (ZK - CH)) : lerp(6.45, 5.9, (z - ZK) / (ZT - ZK)); }
    /* aft body X -30.2 .. -16.9: chine -> flight-deck edge, the tunnel roof, the transom */
    (function () {
      var xs = [XS, -27, -23.5, -20, XA0 + 0.1], hf = hwMid(ZF);
      for (s = -1; s <= 1; s += 2) {
        K.gridSkin(pHull, xs.map(function (x) { return [[x, s * 7.0, CH], [x, s * hf, ZF]]; }), xs.map(function (x) { return [x, 0, 3.2]; }), { flat: true });
      }
      K.quad(pFd, [XS, -hf, ZF], [XA0 + 0.4, -hf, ZF], [XA0 + 0.4, hf, ZF], [XS, hf, ZF], [0, 0, 0]);
      K.quad(pHull, [XS, -7.0, CH], [XS, 7.0, CH], [XS, hf, ZF], [XS, -hf, ZF], [0, 0, 3]);                /* the transom */
    })();
    /* the tunnel roof (wet deck) from the transom to where the centre bow begins */
    K.quad(pTun, [XS, -3.4, CH], [XS, 3.4, CH], [12.0, 3.4, CH], [12.0, -3.4, CH], [0, 0, 5]);
    K.quad(pTun, [XS, 3.25, CH], [XS, 7.0, CH], [XH, 7.0, CH], [XH, 3.25, CH], [0, 0, 5]);                 /* the overhang abaft the hull transoms */
    K.quad(pTun, [XS, -7.0, CH], [XS, -3.25, CH], [XH, -3.25, CH], [XH, -7.0, CH], [0, 0, 5]);
    /* the bow X 12 .. 30.2: centre bow keel -> chine -> deck edge -> crown shoulder -> centre line */
    var FX = HK.stations(12.0, XB, 1.0, [29.64, 29.9]);
    function fsec(x) {
      var hE = lin(T_HE, x)[0], hC = lin(T_HC, x)[0], zs = lin(T_SIL, x)[0], zE = zs - 0.35 * Math.min(1, hE / 3), w = Math.min(1.5, hE * 0.55);
      return { x: x, zc: lin(T_ZC, x)[0], zch: lin(T_ZCH, x)[0], hC: hC, hE: hE, zE: zE, zs: zs, hS: hE - w };
    }
    var FS = FX.map(fsec);
    for (s = -1; s <= 1; s += 2) {
      var ax = FS.map(function (q) { return [q.x, 0, (q.zch + q.zE) / 2]; });
      K.gridSkin(pTun, FS.map(function (q) { return [[q.x, 0, q.zc], [q.x, s * q.hC * 0.5, lerp(q.zc, q.zch, 0.62)], [q.x, s * q.hC, q.zch]]; }), ax);       /* the V underside */
      K.gridSkin(pHull, FS.map(function (q) { return [[q.x, s * q.hC, q.zch], [q.x, s * q.hE, q.zE]]; }), ax, { flat: true });                              /* the flank */
      K.gridSkin(pDeck, FS.map(function (q) { return [[q.x, s * q.hE, q.zE], [q.x, s * q.hS, q.zs]]; }), ax, { flat: true });                               /* the turtle deck's side facet */
      K.gridSkin(pDeck, FS.map(function (q) { return [[q.x, s * q.hS, q.zs], [q.x, 0, q.zs]]; }), ax, { flat: true });                                      /* its crown */
    }
    (function () {                                                    /* the prow's blunt face */
      var q = FS[FS.length - 1], ref = [q.x - 1, 0, 4.8];
      var P = [[q.x, 0, q.zc], [q.x, -q.hC, q.zch], [q.x, -q.hE, q.zE], [q.x, -q.hS, q.zs], [q.x, q.hS, q.zs], [q.x, q.hE, q.zE], [q.x, q.hC, q.zch]];
      for (i = 1; i + 1 < P.length; i++) K.tri(pHull, P[0], P[i], P[i + 1], ref);
    })();
    function deckZ(x, y) {                                            /* the foredeck's surface */
      var q = fsec(x), ay = Math.abs(y);
      return ay <= q.hS ? q.zs : lerp(q.zs, q.zE, Math.min(1, (ay - q.hS) / Math.max(0.05, q.hE - q.hS)));
    }
    function edgeF(x, sd, inset) { var q = fsec(x); return [x, sd * (q.hE - (inset || 0.14)), q.zE + 0.02]; }

    /* =================================================== the superstructure
       One full-width base from the chine to the well's floor, then the
       Phalanx block, the two well walls and the forward block with the
       bridge on it (KIT GAP: facetedHouse has no cut-out for the well).   */
    K.part("superstructure");
    function xf(z) { return 12.6 - (z - 6.0) * RAKE; }                 /* the raked face: foot X 12.6 at the 6.0 m deck [N2] */
    function xa(z) { return XA0 + (z - ZF) * 0.088; }                  /* the after face leans forward a little [M1] */
    function rect(x0, x1, hw) { return [[x0, -hw], [x1, -hw], [x1, hw], [x0, hw]]; }       /* faces: 0 stbd, 1 front, 2 port, 3 aft */
    var BASE = K.facetedHouse(pHull, [{ z: CH, poly: rect(xa(CH), xf(CH), 7.0) }, { z: ZW, poly: rect(xa(ZW), xf(ZW), hwMid(ZW)) }]);
    var AFTB = K.facetedHouse(pHull, [{ z: ZW, poly: rect(xa(ZW), WX0, hwMid(ZW)) }, { z: ZK, poly: rect(xa(ZK), WX0, hwMid(ZK)) }, { z: ZP, poly: rect(xa(ZP), WX0, hwMid(ZP)) }]);
    var FWDB = K.facetedHouse(pHull, [{ z: ZW, poly: rect(WX1, xf(ZW), hwMid(ZW)) }, { z: ZK, poly: rect(WX1, xf(ZK), hwMid(ZK)) }, { z: ZT, poly: rect(WX1, xf(ZT), hwMid(ZT)) }]);
    var WALL = [];
    [1, -1].forEach(function (sd) {
      function wp(z) { var a = sd * hwMid(z), b = sd * 5.25; return [[WX0, Math.min(a, b)], [WX1, Math.min(a, b)], [WX1, Math.max(a, b)], [WX0, Math.max(a, b)]]; }
      WALL.push(K.facetedHouse(pHull, [{ z: ZW, poly: wp(ZW) }, { z: ZK, poly: wp(ZK) }, { z: ZT, poly: wp(ZT) }]));
    });
    /* decks: the block tops and the well's floor in non-skid */
    function deckPlate(x0, x1, y0, y1, z) { K.quad(pDeck, [x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], [0, 0, 0]); }
    deckPlate(WX0 + 0.02, WX1 - 0.02, -5.23, 5.23, ZW + 0.02);
    deckPlate(xa(ZP) + 0.25, WX0 - 0.25, -hwMid(ZP) + 0.3, hwMid(ZP) - 0.3, ZP + 0.02);
    K.box(pHull, WX0 - 0.16, WX0, -5.25, 5.25, ZP, ZT);                      /* the well's after bulkhead standing over the lower block */
    deckPlate(WX1 + 0.25, 3.4, -hwMid(ZT) + 0.3, hwMid(ZT) - 0.3, ZT + 0.02);
    [1, -1].forEach(function (sd) { deckPlate(WX0, WX1, sd > 0 ? 5.33 : -hwMid(ZT) + 0.12, sd > 0 ? hwMid(ZT) - 0.12 : -5.33, ZT + 0.02); });
    /* the bridge: the block's faces carried on up to the roof, the front corners cut off [B1] */
    function bpoly(z) { var h = hwMid(ZT) - (z - ZT) * 0.2, f = xf(z), c = 1.5; return [[3.45, -h], [f - c, -h], [f, -h + c], [f, h - c], [f - c, h], [3.45, h]]; }
    var BR = K.facetedHouse(pHull, [{ z: ZT, poly: bpoly(ZT) }, { z: ZR, poly: bpoly(ZR) }]);          /* faces: 0 stbd, 1 stbd corner, 2 front, 3 port corner, 4 port, 5 aft */
    (function () {
      var z0 = ZT + 0.42, z1 = ZR - 0.33, n, j;
      [[2, 5], [1, 2], [3, 2], [0, 4], [4, 4]].forEach(function (f) {
        n = f[1];
        var a = f[0] === 0 ? 0.42 : (f[0] === 4 ? 0.04 : 0.04), b = f[0] === 0 ? 0.96 : (f[0] === 4 ? 0.58 : 0.96);
        BR.panel(pInk, f[0], a - 0.012, b + 0.012, z0 - 0.07, z1 + 0.07, 0.025);                          /* the window band's dark frame */
        for (j = 0; j < n; j++) BR.panel(pGlass, f[0], a + (b - a) * (j + 0.07) / n, a + (b - a) * (j + 0.93) / n, z0, z1, 0.05);
      });
      /* the eyebrow over the windows and the wipers' rail */
      BR.panel(pShade, 2, 0.0, 1.0, ZR - 0.2, ZR - 0.06, 0.16); BR.panel(pShade, 1, 0.0, 1.0, ZR - 0.2, ZR - 0.06, 0.14); BR.panel(pShade, 3, 0.0, 1.0, ZR - 0.2, ZR - 0.06, 0.14);
      BR.door(0, 0.12, ZT + 0.05, 0.75, 1.3); BR.door(4, 0.8, ZT + 0.05, 0.75, 1.3); BR.door(5, 0.3, ZT + 0.05, 0.75, 1.3);
    })();
    /* the facet line at 6.9 m and the chine: seam strips so both read from the game camera */
    [1, -1].forEach(function (sd) {
      K.ribbon(pLine, [[xa(ZK) + 0.1, sd * hwMid(ZK), ZK], [xf(ZK) - 0.1, sd * hwMid(ZK), ZK]], [0, sd, 0.15], 0.07, 0.02);
      K.ribbon(pLine, [[XS + 0.1, sd * 7.0, CH + 0.02], [12.0, sd * 7.0, CH + 0.02]], [0, sd, 0.1], 0.07, 0.025);
    });
    /* the recess where the bridge face meets the lower face [B1]: a dark sill line across the front */
    FWDB.panel(pLine, 1, 0.03, 0.97, ZK - 0.04, ZK + 0.04, 0.02);

    /* ---- side details on the base and blocks: the louvred shutters, doors, hatches, lights [B1][M1][N2] */
    K.part("side details");
    function SP(x, z, sd, off) { return [x, sd * (hwMid(z) + off), z]; }       /* a point on the block's leaning side */
    function sidePanel(pen, sd, x0, x1, z0, z1, off) {                  /* a plate on the side, its edges plumb */
      var a = SP(x0, z0, sd, off), b = SP(x1, z0, sd, off), c = SP(x1, z1, sd, off), d = SP(x0, z1, sd, off), ref = [(x0 + x1) / 2, 0, (z0 + z1) / 2];
      K.quad(pen, a, b, c, d, ref);
      if (off > 0.025) { var a0 = SP(x0, z0, sd, 0), b0 = SP(x1, z0, sd, 0), c0 = SP(x1, z1, sd, 0), d0 = SP(x0, z1, sd, 0);
        K.quad(pen, a0, b0, b, a, ref); K.quad(pen, b0, c0, c, b, ref); K.quad(pen, c0, d0, d, c, ref); K.quad(pen, d0, a0, a, d, ref); }
    }
    function shutter(sd, x0, x1, z0, z1, slats) {                       /* KIT GAP: a roller shutter - a flush panel a step darker than the hull, fine slat lines, a thin dark frame */
      var j, h = (z1 - z0) / slats;
      sidePanel(pShut, sd, x0, x1, z0, z1, 0.03);     /* the hull sheet: the plate sheet's hatch outlines showed inside it */
      for (j = 1; j < slats; j++) sidePanel(pLine, sd, x0 + 0.06, x1 - 0.06, z0 + j * h - 0.025, z0 + j * h + 0.025, 0.045);
      framed(sd, x0 - 0.07, x1 + 0.07, z0 - 0.07, z1 + 0.07);
    }
    function framed(sd, x0, x1, z0, z1) {                               /* a flush panel outline: four seam strips */
      var w = 0.07;
      sidePanel(pLine, sd, x0, x1, z0, z0 + w, 0.02); sidePanel(pLine, sd, x0, x1, z1 - w, z1, 0.02);
      sidePanel(pLine, sd, x0, x0 + w, z0, z1, 0.02); sidePanel(pLine, sd, x1 - w, x1, z0, z1, 0.02);
    }
    function sideDoor(sd, x, z0) {                                      /* a watertight door on the leaning side */
      sidePanel(pDark, sd, x - 0.06, x + 0.86, z0, z0 + 1.92, 0.02); sidePanel(pHull, sd, x, x + 0.8, z0 + 0.04, z0 + 1.86, 0.06);
      K.tube(pMet, SP(x + 0.68, z0 + 0.8, sd, 0.1), SP(x + 0.68, z0 + 1.3, sd, 0.1), 0.02, 0.02, 3, false);
      [0.3, 1.5].forEach(function (h) { K.box(pSteel, x - 0.03, x + 0.07, SP(x, z0 + h, sd, 0.06)[1] - 0.03, SP(x, z0 + h, sd, 0.06)[1] + 0.03, z0 + h, z0 + h + 0.14); });
    }
    [-1, 1].forEach(function (sd) {
      shutter(sd, -4.3, -1.4, 3.45, 6.8, 11);                           /* [N2] the open bay X -4.3 .. -1.7, 3.45 - 6.8 m; [A1][M1] its after edge */
      shutter(sd, -10.3, -7.4, 3.45, 6.8, 11);                          /* [A1] 37.5 - 40.5 m, [M1] 37.0 - 39.8 m abaft the prow */
      framed(sd, -15.2, -13.5, 3.3, 5.0);                               /* the small flush side hatch [A1][M1] */
      framed(sd, 8.2, 9.6, 3.2, 5.2);
      sideDoor(sd, sd < 0 ? 6.2 : 7.0, 4.4);
      /* upper facet: flush doors, vents, the dark port under the bridge windows [N2] */
      framed(sd, 0.6, 2.4, 7.2, 9.2); framed(sd, -16.0, -14.4, 7.1, 8.3);
      sidePanel(pInk, sd, 5.2, 6.2, 8.5, 8.95, 0.03); sidePanel(pInk, sd, 7.8, 8.25, 8.5, 8.95, 0.03);
      [-12.0, -6.6, -5.6, -0.9].forEach(function (x) { sidePanel(pLine, sd, x - 0.035, x + 0.035, ZK + 0.1, ZT - 0.1, 0.02); });   /* stiffener lines on the well walls */
      /* deck lights along the block's top edge */
      [-9.0, -3.0, 3.0, 8.0].forEach(function (x) { var q = SP(x, 9.3, sd, 0.03); K.box(K.pen("lamp", "lampWhite"), x - 0.12, x + 0.12, q[1] - 0.04, q[1] + 0.04, 9.25, 9.38); });
    });
    /* the after face of the Phalanx block: the hangar-less step, a door and two lockers [M1] */
    AFTB.door(3, 0.2, ZW + 0.5, 0.8, 1.8);
    BASE.door(3, 0.3, ZF + 0.05, 0.8, 1.8); BASE.door(3, 0.66, ZF + 0.05, 0.8, 1.8);
    BASE.panel(pDark, 3, 0.44, 0.56, ZF + 0.3, ZF + 1.9, 0.05);
    BASE.panel(pShade, 3, 0.05, 0.14, ZF + 0.1, ZF + 1.2, 0.35); BASE.panel(pShade, 3, 0.86, 0.95, ZF + 0.1, ZF + 1.2, 0.35);

    /* ====================================================== the launcher well
       8 HF-2 and 8 HF-3 box launchers in four transverse banks of 2 x 2,
       alternate banks firing to port and to starboard [M1][A1]
       (KIT GAP: no box-launcher fitting).                                 */
    K.part("launchers");
    function bank(xc, dir, sec, len, gapX, ribbed) {
      var el = 0.14, ce = Math.cos(el), se = Math.sin(el), ay = [0, dir * ce, se], up = [0, -dir * se, ce], ex = [1, 0, 0], r, c;
      var base = [xc, -dir * 0.5, ZW + 0.5];
      for (r = 0; r < 2; r++) for (c = 0; c < 2; c++) {
        var o = V.add(V.add(base, ex, (c - 0.5) * (sec + gapX)), up, sec / 2 + r * (sec + 0.08));
        var cen = V.add(o, ay, 0);
        K.obox(pCan, cen, ex, ay, up, sec, len, sec);
        K.obox(pCanD, V.add(cen, ay, len / 2 + 0.03), ex, ay, up, sec * 0.9, 0.06, sec * 0.9);              /* the muzzle cover */
        K.obox(pCanD, V.add(cen, ay, -len / 2 - 0.03), ex, ay, up, sec * 0.8, 0.06, sec * 0.8);             /* the efflux door */
        (ribbed ? [-0.42, -0.3, -0.18, -0.06, 0.06, 0.18, 0.3, 0.42] : [-0.3, 0.36]).forEach(function (f) { K.obox(pCanD, V.add(cen, ay, f * len), ex, ay, up, sec + 0.07, 0.09, sec + 0.07); });   /* the bands */
      }
      /* the cradle: two frames and the rear legs */
      [-0.28, 0.3].forEach(function (f) {
        var p = V.add(base, ay, f * len), zt = p[2];
        K.box(pSteel, xc - sec - gapX / 2 - 0.1, xc + sec + gapX / 2 + 0.1, p[1] - 0.09, p[1] + 0.09, ZW + 0.02, zt + 0.02);
      });
      K.box(pCanD, xc - 0.12, xc + 0.12, -dir * 0.5 - len * 0.42, -dir * 0.5 + len * 0.42, ZW + 0.02, ZW + 0.16);   /* the cable trunk */
    }
    /* fore to aft [M1][A1]: ribbed racks (HF-3), plain boxes (HF-2), ribbed racks, plain boxes */
    bank(-1.65, -1, 1.08, 6.9, 0.16, true);                              /* HF-3 */
    bank(-4.1, 1, 0.92, 6.3, 0.14, false);                              /* HF-2 */
    bank(-7.2, -1, 1.08, 6.9, 0.16, true);                              /* HF-3 */
    bank(-10.0, 1, 0.92, 6.3, 0.14, false);                             /* HF-2 */
    /* blast deflector plates on the well walls and the ladders down into it [M1] */
    [1, -1].forEach(function (sd) {
      [-10.0, -4.1].forEach(function (x, n) {                           /* the two roofed bays in the wall, abreast the plain boxes [M1][A1] */
        K.box(pDark, x - 1.25, x + 1.25, sd * 5.2 - 0.03, sd * 5.2 + 0.03, ZW + 0.35, ZT - 0.35);
        K.box(pMet, x - 1.33, x + 1.33, sd * 5.16 - 0.03, sd * 5.16 + 0.03, ZT - 0.3, ZT - 0.2);
      });
      K.ship.ladder([WX0 + 0.35, sd * 4.6, ZW + 0.02], [WX0 + 0.06, sd * 4.6, ZT], [0, 1, 0], 0.5);
      K.ship.ladder([WX0 - 0.45, sd * 3.9, ZP + 0.02], [WX0 - 0.2, sd * 3.9, ZT], [0, 1, 0], 0.5);
      K.ship.ladder([WX1 - 0.35, sd * 4.6, ZW + 0.02], [WX1 - 0.06, sd * 4.6, ZT], [0, 1, 0], 0.5);
    });

    /* ============================================================ the Phalanx
       on the block abaft the well, X -14.6 [A1][M1] (KIT GAP: no CIWS)    */
    K.part("phalanx");
    (function () {
      var x = -14.7, z = ZP, bw;
      K.box(pPl, x - 1.3, x + 1.3, -1.5, 1.5, z, z + 0.35);                                       /* its plinth */
      /* the low bulwark round the mount [A1][M1] */
      [[x - 1.75, x + 1.5, -2.3, -2.2], [x - 1.75, x + 1.5, 2.2, 2.3], [x - 1.75, x - 1.65, -2.3, 2.3]].forEach(function (q) { K.box(pHull, q[0], q[1], q[2], q[3], z, z + 0.55); });
      K.cylZ(pSteel, x, 0, z + 0.35, z + 0.75, 1.0, 16);
      K.box(pDome, x - 0.75, x + 0.55, -0.85, 0.85, z + 0.75, z + 1.75);                           /* the mount's body */
      K.box(pSteel, x - 1.25, x - 0.75, -0.6, 0.6, z + 0.8, z + 1.6);                              /* the electronics enclosure */
      [-1, 1].forEach(function (e) { K.box(pDome, x - 0.45, x + 0.4, e * 0.85 - 0.12, e * 0.85 + 0.12, z + 1.2, z + 2.9); });   /* the yoke arms */
      K.cylZ(pDome, x, 0, z + 2.5, z + 3.75, 0.62, 14);                                            /* the radome's barrel */
      K.sphere(pDome, [x, 0, z + 3.75], [0.62, 0.62, 0.8], 14, 5, 0, PI / 2);                      /* and its cap */
      K.cylX(pDome, x - 0.3, x + 0.75, 0, z + 2.15, 0.42, 10);                                     /* the gun's cradle */
      K.revolve(pSteel, [[0, 0.2], [0.5, 0.2], [0.52, 0.13], [1.75, 0.12], [1.76, 0.15], [1.86, 0.15]], { at: [x + 0.75, 0, z + 2.15], axis: "x", seg: 8 });
      K.box(pSteel, x - 0.35, x + 0.3, -0.4, 0.4, z + 1.75, z + 2.0);
      K.cylY(pSteel, x - 0.15, 0.85, 1.25, z + 2.0, 0.34, 10);                                     /* the ammunition drum */
    })();

    /* ====================================================== mast and sensors */
    K.part("mast");
    var MAST = K.facetedHouse(pPl, [{ z: ZR, poly: rect(3.6, 7.1, 1.55) }, { z: 15.6, poly: rect(3.6, 5.0, 0.62) }]);
    K.box(pPl, 5.0, 6.3, -0.3, 0.3, 15.56, 15.85);                                                /* its forward arm [N2] */
    K.box(pPl, 3.3, 5.35, -1.9, 1.9, 15.56, 15.85);                                               /* the yard platform [N2] */
    [1, -1].forEach(function (sd) {
      K.box(pPl, 3.6, 5.0, sd * 1.9 - (sd > 0 ? 0 : 0.5), sd * 1.9 + (sd > 0 ? 0.5 : 0), 15.6, 15.8);
      K.sphere(pDome, [4.3, sd * 2.15, 16.05], 0.2, 8, 4);                                        /* the yard's sensor balls [B1] */
      K.air.lamp([4.3, sd * 2.4, 15.9], 0.07, sd > 0 ? "lampRed" : "lampGreen");
      K.box(pSteel, 4.0, 4.6, sd * 1.2 - 0.2, sd * 1.2 + 0.2, 15.85, 16.2);                       /* ESM boxes */
      MAST.panel(pShade, sd > 0 ? 2 : 0, 0.25, 0.8, 12.2, 13.6, 0.05);                            /* flat array faces on the mast's sides [B1] */
      MAST.panel(pLine, sd > 0 ? 2 : 0, 0.1, 0.9, 14.3, 14.38, 0.02);
    });
    MAST.panel(pShade, 1, 0.2, 0.8, 12.0, 13.4, 0.05); MAST.panel(pLine, 1, 0.1, 0.9, 14.3, 14.38, 0.02);
    MAST.door(3, 0.35, ZR + 0.05, 0.7, 1.7);
    K.facetedHouse(pPl, [{ z: 15.85, poly: rect(3.72, 4.68, 0.42) }, { z: 17.1, poly: rect(3.72, 4.64, 0.3) }]);     /* the upper mast */
    K.ship.radar(4.2, 0, 17.1, { type: "bar", w: 2.0, h: 0.2, ped: 0.0, yaw: 0.74 });               /* the navigation radar's bar [N2] */
    K.tube(pMet, [2.95, 0, 15.85], [2.95, 0, 18.2], 0.05, 0.03, 5, false);                         /* the pole abaft the head [N2] */
    K.air.lamp([2.95, 0, 18.22], 0.07, "lampWhite");
    K.bar(pMet, [2.95, 0, 16.2], [3.72, 0, 16.2], 0.06);
    K.ship.ladder([3.56, 0, ZR + 0.1], [3.56, 0, 15.5], [0, 1, 0], 0.45);
    /* the director: a ball on a conical post forward of the mast [N2][B1] */
    K.revolve(pPl, [[0, 0.82], [1.86, 0.4], [1.9, 0.5], [2.0, 0.5]], { at: [8.68, 0, ZR], axis: "z", seg: 12 });
    K.sphere(pPl, [8.65, 0, 13.63], 0.6, 14, 7);                                                 /* grey, as the foot balls [B1][N2] */
    K.cylX(pInk, 9.18, 9.27, 0, 13.63, 0.22, 8);                                                   /* its window */
    /* the dome abaft the bridge, port side [N2][B1] */
    K.cylZ(pPl, 2.6, 3.4, ZT, ZT + 0.5, 0.5, 12);
    K.sphere(pDome, [2.6, 3.4, 10.5], 0.62, 14, 7);
    /* the ears on the roof's edge [N2][B1]: small four-sided pyramids */
    [[10.3, 3.3], [10.3, -3.3], [10.5, 1.1], [10.5, -1.1], [7.0, 4.6], [7.0, -4.6]].forEach(function (q) {
      K.facetedHouse(pPl, [{ z: ZR, poly: rect(q[0] - 0.3, q[0] + 0.3, 0.3) }, { z: ZR + 0.52, poly: rect(q[0] - 0.05, q[0] + 0.05, 0.05) }], { y: q[1] });
    });
    /* the sensor balls at the bridge foot, one a side [N2][B1] */
    [1, -1].forEach(function (sd) {
      var bz = deckZ(11.9, 4.3);
      K.cylZ(pPl, 11.9, sd * 4.3, bz - 0.1, 7.7, 0.3, 8, 0.22);
      K.sphere(pPl, [11.9, sd * 4.3, 8.2], 0.6, 12, 6);
      /* whips at the after corners of the bridge roof and beside the mast [N2][B1] */
      K.ship.whip(4.0, sd * 4.9, ZR, 6.2); K.ship.whip(1.6, sd * 5.2, ZT, 5.0);
      K.ship.whip(9.6, sd * 2.6, ZR, 2.6, 0.02);
      /* searchlights on the bridge wings */
      K.cylZ(pMet, 9.3, sd * 4.5, ZR, ZR + 0.4, 0.05, 5); K.cylX(pSteel, 9.15, 9.5, sd * 4.5, ZR + 0.52, 0.17, 8); K.disc(K.pen("lamp", "lampWhite"), [9.51, sd * 4.5, ZR + 0.52], [1, 0, 0], 0.14, 8);
      K.air.lamp([9.9, sd * 5.0, ZR - 0.5], 0.08, sd > 0 ? "lampRed" : "lampGreen");
    });
    K.teamPatch([6.0, -3.0, ZR + 0.005], [1, 0, 0], [0, 1, 0], 1.6, 1.0);

    /* =============================================================== fittings */
    K.part("fittings");
    var hf = hwMid(ZF);
    /* rails: round the flight deck, the block tops, the well's rim, the bridge roof, the foredeck's edge */
    [1, -1].forEach(function (sd) {
      K.ship.rail([[XS + 0.12, sd * (hf - 0.14), ZF], [XA0 - 0.25, sd * (hf - 0.14), ZF]], { step: 1.4 });
      K.ship.rail([[xa(ZP) + 0.2, sd * (hwMid(ZP) - 0.16), ZP], [WX0 - 0.25, sd * (hwMid(ZP) - 0.16), ZP]], { step: 1.2 });
      K.ship.rail([[WX0 + 0.1, sd * (hwMid(ZT) - 0.16), ZT], [3.3, sd * (hwMid(ZT) - 0.16), ZT]], { step: 1.6 });
      K.ship.rail([[WX0 + 0.1, sd * 5.3, ZT], [WX1 - 0.1, sd * 5.3, ZT]], { step: 1.6, h: 0.9 });
      K.ship.rail([[3.6, sd * 5.3, ZR], [9.0, sd * 5.3, ZR]], { step: 1.35, h: 0.9 });
      var e = [], x;
      for (x = 13.4; x <= 29.61; x += 1.8) e.push(edgeF(x, sd));
      K.ship.rail(e, { step: 1.8, h: 0.95 });
      K.ship.toeRail([[XS + 0.1, sd * (hf - 0.04), ZF + 0.04], [XA0, sd * (hf - 0.04), ZF + 0.04]], 0.04);
      /* bitts and fairleads */
      K.ship.bollard(-28.6, sd * 5.7, ZF, 0); K.ship.bollard(-18.6, sd * 5.7, ZF, 0);
      K.ship.fairlead(-29.6, sd * 6.3, ZF, 0, 0.9); K.ship.fairlead(-19.6, sd * 6.35, ZF, 0, 0.9);
      K.ship.bollard(19.0, sd * 4.6, deckZ(19.0, 4.6), sd * -0.2, 0.9); K.ship.bollard(26.2, sd * 2.2, deckZ(26.2, 2.2), sd * -0.5, 0.8);
      K.ship.fairlead(24.0, sd * 4.45, deckZ(24, 4.45), sd * -0.42, 0.8); K.ship.cleat(15.0, sd * 5.6, deckZ(15, 5.6), 0);
      K.ship.cleat(-24.0, sd * 6.2, ZF, 0); K.ship.cleat(21.5, sd * 4.6, deckZ(21.5, 4.6), sd * -0.3);
      /* life-raft canisters on the block top abreast the Phalanx and on the forward block [M1] */
      K.ship.raft(-15.6, sd * 4.4, ZP + 0.02, 0, 1.25, 0.32); K.ship.raft(-14.0, sd * 4.4, ZP + 0.02, 0, 1.25, 0.32);
      K.ship.raft(1.0, sd * 4.1, ZT + 0.02, 0, 1.25, 0.32); K.ship.raft(2.5, sd * 1.4, ZT + 0.02, PI / 2, 1.25, 0.32);
      /* vents and lockers */
      K.ship.vent(0.3, sd * 2.6, ZT + 0.02, { type: "mushroom", r: 0.22, h: 0.5 }); K.ship.vent(-16.0, sd * 3.1, ZP + 0.02, { type: "mushroom", r: 0.2, h: 0.45 });
      K.ship.vent(-16.0, sd * 5.2, ZP + 0.02, { type: "goose", r: 0.11, h: 0.7, yaw: sd * 1.4 });
      K.box(pPl, 0.0, 1.6, sd * 2.0 - 0.45, sd * 2.0 + 0.45, ZT + 0.02, ZT + 0.75);
      K.box(pShade, -13.95, -13.4, sd * 3.2 - 0.5, sd * 3.2 + 0.5, ZP + 0.02, ZP + 0.9);
      K.ship.hatch(-0.9 + 1.0, sd * 4.9, ZT + 0.02, 0.8, 0.8, 0);
      /* the decoy launchers each side abaft the bridge [M1]: six tubes on a frame */
      for (i = 0; i < 6; i++) K.tube(pSteel, [1.6 + (i % 3) * 0.3, sd * 3.2, ZT + 0.35 + Math.floor(i / 3) * 0.28], [1.6 + (i % 3) * 0.3, sd * 4.0, ZT + 0.85 + Math.floor(i / 3) * 0.28], 0.11, 0.11, 6, true);
      K.box(pSteel, 1.4, 2.4, sd * 3.4 - 0.25, sd * 3.4 + 0.25, ZT + 0.02, ZT + 0.4);
      /* flight-deck edge lights and the stern light */
      [-28.0, -24.5, -21.0].forEach(function (x) { K.box(K.pen("lamp", "lampAmber"), x - 0.1, x + 0.1, sd * 6.05 - 0.08, sd * 6.05 + 0.08, ZF, ZF + 0.07); });
      /* foredeck: hatches, vents, the breakwater strips of the turtle deck's knuckle */
      K.ship.hatch(17.6, sd * 3.2, deckZ(17.6, 3.2) - 0.02, 0.8, 0.8, 0); K.ship.vent(13.6, sd * 3.4, deckZ(13.6, 3.4), { type: "mushroom", r: 0.18, h: 0.45 });
      var kn = [];
      for (x = 13.2; x <= 29.3; x += 2.3) { var q = fsec(x); kn.push([x, sd * q.hS, q.zs]); }
      K.ribbon(pLine, kn, [0, sd * 0.2, 1], 0.07, 0.02);
      /* flush panel lines on the flank of the bow, the hawse and the draught marks' plates */
      var fl = [], fn = [];
      for (x = 13.6; x <= 28.9; x += 1.7) { var q2 = fsec(x), t = 0.55; fl.push([x, sd * lerp(q2.hC, q2.hE, t), lerp(q2.zch, q2.zE, t)]); fn.push(V.unit([0.25, sd, (q2.hC - q2.hE) / (q2.zE - q2.zch)])); }
      K.ribbon(pLine, fl, fn, 0.06, 0.03);
      var qh = fsec(27.6); K.disc(pInk, [27.6, sd * (lerp(qh.hC, qh.hE, 0.7) + 0.03), lerp(qh.zch, qh.zE, 0.7)], [0.3, sd, 0.1], 0.2, 8);
      /* draught marks plates and the rubbing pads on the demihull by the stern */
      K.box(pSteel, -27.0, -24.0, sd * 6.9 - 0.02, sd * 6.9 + 0.03, 2.0, 2.3);
      K.box(pSteel, 2.0, 5.0, sd * 6.9 - 0.02, sd * 6.9 + 0.03, 2.0, 2.3);
    });
    K.ship.rail([[XS + 0.12, -hf + 0.14, ZF], [XS + 0.12, hf - 0.14, ZF]], { step: 1.4 });           /* across the stern */
    K.ship.rail([[xa(ZP) + 0.2, -hwMid(ZP) + 0.16, ZP], [xa(ZP) + 0.2, hwMid(ZP) - 0.16, ZP]], { step: 1.5 });
    K.ship.rail([[3.6, -5.3, ZR], [3.6, -1.7, ZR]], { step: 1.3, h: 0.9 }); K.ship.rail([[3.6, 1.7, ZR], [3.6, 5.3, ZR]], { step: 1.3, h: 0.9 });
    /* the flight deck: tie-down studs, the hatch, the nets' stowed frames along the edge [M1] */
    for (k = 0; k < 6; k++) for (i = -3; i <= 3; i++) K.box(pInk, -28.6 + k * 2.0 - 0.07, -28.6 + k * 2.0 + 0.07, i * 1.5 - 0.07, i * 1.5 + 0.07, ZF, ZF + 0.02);
    K.ship.hatch(-18.2, 4.6, ZF, 1.0, 1.0, 0); K.ship.hatch(-18.2, -4.6, ZF, 1.0, 1.0, 0);
    K.tube(pMet, [XS + 0.1, 0, ZF], [XS + 0.1, 0, ZF + 2.4], 0.035, 0.025, 4, false);               /* the ensign staff */
    K.air.lamp([XS + 0.1, 0, ZF + 1.3], 0.07, "lampWhite");
    K.ship.ladder([xa(ZF) - 0.3, 5.9, ZF], [xa(ZP) - 0.02, 5.7, ZP], [1, 0, 0], 0.5);               /* up the step to the block */
    /* the foredeck: the gun's blast ring, the capstan, the jack staff, the hatches on the crown */
    K.tube(pLine, [15.4, 0, deckZ(15.4, 0) + 0.0], [15.4, 0, deckZ(15.4, 0) + 0.03], 2.6, 2.6, 24, false);
    K.cylZ(pSteel, 24.6, 0, deckZ(24.6, 0), deckZ(24.6, 0) + 0.5, 0.3, 10); K.cylZ(pSteel, 24.6, 0, deckZ(24.6, 0) + 0.5, deckZ(24.6, 0) + 0.58, 0.38, 10);
    K.ship.hatch(21.0, 0, deckZ(21, 0), 0.9, 0.9, 0); K.ship.hatch(27.4, 0, deckZ(27.4, 0), 0.7, 0.7, 0); K.ship.hatch(19.0, 1.6, deckZ(19, 1.6), 0.7, 0.7, 0);
    K.tube(pMet, [29.7, 0, deckZ(29.7, 0)], [29.7, 0, deckZ(29.7, 0) + 1.9], 0.03, 0.02, 4, false);
    K.air.lamp([29.7, 0, deckZ(29.7, 0) + 1.92], 0.06, "lampWhite");
    K.bar(pSteel, [24.9, 0, deckZ(25, 0) + 0.05], [28.6, 0, deckZ(28.6, 0) + 0.05], 0.1, 0.06);     /* the anchor chain's run */
    /* the anchor on the centre bow's stem [B1][N2] */
    (function () {
      var x = 29.45, z = 3.4;
      K.ship.anchor(x, 0, z, [1, 0, -0.25], 0.9);
      K.disc(pInk, [XB + 0.005, 0, 4.75], [1, 0, 0], 0.22, 8);                                        /* the bull-nose fairlead */
    })();
    /* bridge front: the lamps under the windows [B1] and the horn */
    [1.6, -1.6].forEach(function (y) { var q = BR.faceAt(2, 0.5, ZT + 0.2, 0.06); K.box(K.pen("lamp", "lampWhite"), q[0] - 0.04, q[0] + 0.1, y - 0.15, y + 0.15, ZT + 0.1, ZT + 0.3); });

    /* ============================================================ the 76 mm
       in its faceted stealth shield [N2]: X 13.25 .. 16.75, deck 6.06, front
       top 7.5, rear top 8.1 (KIT GAP: gunHouse has a level roof).         */
    K.part("gun");
    var gz = lin(T_SIL, 15.4)[0], T = K.group("turret", { at: [15.4, 0, gz] });
    var tp = T.pen("plate", "plate"), tm = T.pen("metal", "dark"), tl = T.pen("dull", "line");
    T.cylZ(tm, 15.4, 0, gz, gz + 0.14, 1.55, 20);
    var z0 = gz + 0.14;
    T.solid(tp, [[13.25, -1.3, z0], [16.2, -1.3, z0], [16.75, -0.65, z0], [16.75, 0.65, z0], [16.2, 1.3, z0], [13.25, 1.3, z0],
                 [13.3, -1.0, 8.05], [14.0, -1.0, 8.1], [16.2, -0.85, 7.6], [16.6, -0.45, 7.46], [16.6, 0.45, 7.46], [16.2, 0.85, 7.6], [14.0, 1.0, 8.1], [13.3, 1.0, 8.05]],
      [[0, 1, 8], [0, 8, 7], [0, 7, 6], [1, 2, 9], [1, 9, 8], [2, 3, 10], [2, 10, 9], [3, 4, 11], [3, 11, 10], [4, 5, 12], [4, 12, 11], [5, 13, 12],
       [5, 0, 6], [5, 6, 13], [6, 7, 12], [6, 12, 13], [7, 8, 11], [7, 11, 12], [8, 9, 10], [8, 10, 11], [0, 5, 4], [0, 4, 1], [1, 4, 3], [1, 3, 2]]);
    T.box(T.pen("dull", "ink"), 16.7, 16.8, -0.22, 0.22, 6.75, 7.3);                                 /* the barrel's port */
    T.revolve(tm, [[0, 0.17], [0.7, 0.15], [0.72, 0.1], [4.25, 0.075], [4.26, 0.1], [4.5, 0.1]], { at: [16.72, 0, 7.02], axis: [Math.cos(0.05), 0, Math.sin(0.05)], seg: 10 });
    T.sphere(T.pen("dull", "canvas"), [16.78, 0, 7.02], [0.22, 0.26, 0.26], 8, 5);
    T.box(tl, 13.22, 13.26, -0.45, 0.45, 6.5, 7.9);                                                  /* the rear access door */
    T.ribbon(tl, [[13.4, -1.02, 8.07], [13.4, 1.02, 8.07]], [0, 0, 1], 0.06, 0.02);
    T.ribbon(tl, [[14.0, -1.0, 8.11], [14.0, 1.0, 8.11]], [0, 0, 1], 0.06, 0.02);
    T.box(tm, 14.3, 14.9, -0.3, 0.3, 8.02, 8.16);                                                    /* the roof hatch */
    T.teamPatch([15.3, 0, 7.83], [1, 0, -0.227], [0, 1, 0], 0.9, 0.6);

    K.node("helipad", [-23.6, 0, ZF]);
    return K.finish();
  }
  return { build: build };
})();

UNIT_MODELS["roc_e00_corvette"] = { len: 60.4, build: function (THREE, M, C) { return HeroPilotTuoChiang.build(THREE, M, C, "roc_e00_corvette"); } };
UNIT_MODELS["corvette_r"] = { len: 60.4, build: function (THREE, M, C) { return HeroPilotTuoChiang.build(THREE, M, C, "corvette_r"); } };
