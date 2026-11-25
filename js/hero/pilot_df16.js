/* ========================= js/hero/pilot_df16.js ==========================
   HERO model, built on HeroKit (js/hero_kit.js) through the hero pipeline
   (tools/model3d/HERO_PIPELINE.md).  Spec: tools/model3d/specs/tel_c.json.

   Key registered (overrides js/hero/pla_ground_modern.js, load AFTER it):
     tel_c   "DF-16 (CSS-11) on a 10x10 TEL" - the Wanshan WS2500 10x10

   REFERENCES (Wikimedia Commons; copies in tools/model3d/specs/ref/tel_c/)
     T2  "Dongfeng-16.JPG" (1280 x 795) - 2015 Beijing parade, STARBOARD
         broadside from across a junction: THE MEASURING PHOTO.  The cab,
         the box behind it, the body, the shell and its pointed front end,
         five axles.
     T1  "DF-16 Ballistic Missile 20170919.jpg" (1280 x 853) - Beijing
         Military Museum, starboard front quarter: the cab front (grille,
         bar guards, lamps, bumper, steps, mirrors, windscreen), the cab
         side (two doors, a narrow rear window, the belt crease), the
         louvred box behind the cab, the shell's width against the body's,
         the skirt, the arches and fender panels, the tyres, the fitting
         on the tail.
     Both wear camouflage, a number and a badge: none of it is drawn.
     Commons holds no other photograph of the type (Category:DF-16 has
     these two; en and zh Wikipedia use the same two) and no drawing.
   PUBLISHED
     en.wikipedia "WS2500" (its infobox picture is T1, captioned "WS2500
     with DF-16"): 10x10, 15.5 m long, 3.05 m wide, 2.97 m high.
     zh.wikipedia DF-16 infobox: the round about 11.4 m, 1.2 m diameter.
   MEASURED off T2.  Scale: front of the bumper (x 1005) to the tail
     (x 150) = 855 px = the published 15.5 m, so 55.16 px/m; ground y 517.
     (js/hero/pla_ground_modern.js scaled the same photograph by a tyre
     borrowed from another vehicle and came to 12.8 m: that is 17 % short
     of the published length.)  x from the middle, z from the ground:
       axles           +4.41 +1.93 -3.04 -4.92 -6.79   (2 + 3)
       tyre            86 px = 1.56 m
       cab             front +7.62, rear +4.66, roof 3.14, belt 1.67
       cab windows     z 2.29 - 2.79; x 5.27-5.99 and 6.30-7.03
       box behind cab  +2.50 to +4.48, top 3.06 (a 0.18 m gap to the cab)
       body            top 2.85, underside 1.67, tail -7.75
       shell           -7.17 to +3.04 at full section, crown 3.53; its
                       front end tapers to a tip at +4.7, z 3.14
       hoops           -5.61 -0.37 +3.04
     Cross-checks: the cab roof comes out at 3.14 m against the published
     2.97 m (NOT fitted: the length sets the scale; the 2.97 is the figure
     the WS2400 article also carries); the shell is 11.9 m long over an
     11.4 m round.
   MUST SHOW (the spec's list): 2 + 3 axles on big tyres; ONE full-width
     forward-control cab; its front (grille, bar guards, lamps, bumper,
     steps); the long arched shell narrower than the body, with hoops; the
     shell's pointed front end over the box behind the cab; that louvred
     box; slab sides with a deep skirt and three arches; doors and the
     small port; mirrors, roof rail and two covered domes; the fitting on
     the tail.
   NOT CONFIRMED (also in the spec): the round (inside the shell in both
     photographs - no stages, fins or re-entry vehicle are drawn); how the
     shell opens and the round is raised (so NO "podelev": the model this
     replaces had none either); stabiliser jacks; the plan view (the
     shell's 0.95 m half width is an estimate from T1); the tail (behind
     leaves in T2); the port side (mirrored); the underside; whether the
     published length is the bare chassis.
   NODES: five "roadwheel" groups, one per axle, origin on the axle.  No
     turret, no podelev, no pose groups, no `ord` on the entry - exactly
     what the replaced model carried.
   PAINT: plain green, the kit's vehicle paint sheet (seams, rivets, chips,
     streaks).  No camouflage, numbers or badges.  Team colour: one roof
     patch, one strip on the box, one short strip a side.
   Model space: +X nose, +Y port, +Z up, metres, ground z = 0.  ASCII only.
   Needs js/hero_kit.js.
========================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPilotDf16 = (function () {
  "use strict";
  var PI = Math.PI;

  /* ---- the measured table (metres; see the header) ---- */
  var D = {
    LEN: 15.5, XF: 7.75, XT: -7.75,
    HW: 1.525,                                   /* half the published 3.05 m */
    AX: [4.41, 1.93, -3.04, -4.92, -6.79], R: 0.78, TH: 0.30, TY: 1.225,
    CABF: 7.62, CABR: 4.66, ROOF: 3.14, BELT: 1.67, SILL: 2.14, CABZ0: 0.94,
    BOXA: 2.50, BOXF: 4.48, BOXZ: 3.06,
    TOP: 2.85, UND: 1.67, SEAM: 0.92, SKIRT: 0.75, FEND: 0.85, ARCH: 1.62,
    SHA: -7.17, SHF: 3.04, TIP: 4.70, SW: 0.95, SH: 0.685, TIPZ: 3.14,
    HOOPS: [-5.61, -0.37, 3.04]
  };
  /* the body side seen from starboard: tail, three trapezoid arches with
     the fender panels between them, the deep skirt, the higher forward
     section over the second axle (T2, T1) */
  function bodyProfile() {
    var P = [[D.XT + 0.03, D.TOP], [D.XT + 0.03, D.FEND]], i, c;
    for (i = 4; i >= 2; i--) {
      c = D.AX[i];
      P.push([c - 0.88, D.FEND], [c - 0.62, D.ARCH], [c + 0.62, D.ARCH], [c + 0.88, D.FEND]);
    }
    P.push([D.AX[2] + 0.94, D.SKIRT], [D.SEAM, D.SKIRT], [D.SEAM, D.UND], [D.CABR - 0.02, D.UND], [D.CABR - 0.02, D.TOP]);
    return P;
  }
  /* the shell's section at x: a circular arc of radius 1 m standing on the
     shoulders (half width w, rise h), closed under the body's top */
  var A0 = Math.asin(0.315);
  function shellRing(x, w, h, n, grow) {
    var P = [], i, g = grow || 0;
    P.push([x, w + g, D.TOP - 0.05]);
    for (i = 0; i <= n; i++) {
      var a = A0 + (PI - 2 * A0) * i / n;
      P.push([x, (w + g) * Math.cos(a) / Math.cos(A0), D.TOP + (h + g) * (Math.sin(a) - Math.sin(A0)) / (1 - Math.sin(A0))]);
    }
    P.push([x, -(w + g), D.TOP - 0.05]);
    return P;
  }
  /* the pointed front end: t = 0 at the last hoop, 1 at the tip (T2: the
     crown falls 0.42 m, almost straight) */
  function noseAt(t) {
    return { x: D.SHF + (D.TIP - D.SHF) * t, w: 0.12 + (D.SW - 0.12) * (1 - Math.pow(t, 1.6)), h: D.SH - (D.TOP + D.SH - D.TIPZ) * Math.pow(t, 1.25) };
  }

  function build(THREE, M, C) {
    var K = HeroKit.begin(THREE, M, C, { category: "vehicle", key: "tel_c", len: D.LEN,
                                         paint: { paint: 0x566238, shade: 0x444e2d, light: 0x66733f, cover: 0x5a5c44 } });
    K.contract(["roadwheel"]);
    /* plain service paint: the kit's vehicle sheet without its mottling, which at this size reads as a
       camouflage pattern - plate seams, rivet rows, access panels, rain streaks, chips and a little grime */
    K.material("paint", { vcol: true, rough: 0.9, metal: 0.05, uv: { mode: "tile", su: 0.34, sv: 0.34 },
      map: { key: "pilot_df16_paint", w: 512, h: 512, seed: 2016, panels: { cols: 4, rows: 3, alpha: 0.40, lit: 0.12, width: 2 },
             rivets: { step: 15, alpha: 0.42 }, hatches: { n: 5 }, streaks: { n: 300, len: [0.02, 0.14], alpha: 0.08 },
             grime: { n: 30, alpha: 0.02 }, chips: { n: 200, alpha: 0.22 } } });
    var pa = K.pen("paint"), ps = K.pen("paint", "shade"), pl = K.pen("paint", "light");
    var pd = K.pen("dull", "dark"), pi = K.pen("dull", "ink"), pg = K.pen("dull", "paint"), pm = K.pen("metal", "steel"), gl = K.pen("glass");
    var HW = D.HW, s, i, k, x;
    /* a thin plate on the body side: s = +1 port, -1 starboard */
    function side(p, sd, x0, x1, z0, z1, t, off) {
      var a = sd * (HW + (off || 0)), b = sd * (HW + (off || 0) + t);
      K.box(p, x0, x1, Math.min(a, b), Math.max(a, b), z0, z1);
    }
    /* a door or hatch on the body side: the dark gap, the leaf, hinges, a handle */
    function door(sd, x0, x1, z0, z1, o) {
      o = o || {};
      side(pd, sd, x0, x1, z0, z1, 0.008);
      side(o.pen || pa, sd, x0 + 0.03, x1 - 0.03, z0 + 0.03, z1 - 0.03, 0.022);
      [0.2, 0.8].forEach(function (f) { side(pm, sd, x0 + 0.01, x0 + 0.09, z0 + (z1 - z0) * f - 0.05, z0 + (z1 - z0) * f + 0.05, 0.035); });
      side(pd, sd, x1 - 0.20, x1 - 0.08, (z0 + z1) / 2 - 0.02, (z0 + z1) / 2 + 0.02, 0.02, 0.022);
      K.veh.handle([x1 - 0.20, sd * (HW + 0.022), (z0 + z1) / 2 + 0.12], [x1 - 0.08, sd * (HW + 0.022), (z0 + z1) / 2 + 0.12], 0.04, [0, sd, 0]);
    }

    /* ================================================== chassis and wheels */
    K.part("chassis");
    [1, -1].forEach(function (sd) {
      K.box(ps, D.XT + 0.15, 7.30, sd > 0 ? 0.40 : -0.58, sd > 0 ? 0.58 : -0.40, 0.98, 1.32);            /* the frame rails */
    });
    K.box(ps, D.XT + 0.20, 7.25, -0.40, 0.40, 1.08, D.UND + 0.02);                                         /* the belly between them */
    [-7.45, -5.86, -3.98, -1.6, 0.3, 3.15, 5.6, 7.1].forEach(function (cx) { K.box(pd, cx - 0.07, cx + 0.07, -0.60, 0.60, 0.96, 1.10); });
    D.AX.forEach(function (ax) {
      [1, -1].forEach(function (sd) {
        /* the wishbones, the hub carrier and the strut of each wheel station */
        K.bar(pd, [ax - 0.22, sd * 0.56, 1.02], [ax, sd * (D.TY - D.TH - 0.08), 0.62], 0.07, 0.05);
        K.bar(pd, [ax + 0.22, sd * 0.56, 1.02], [ax, sd * (D.TY - D.TH - 0.08), 0.62], 0.07, 0.05);
        K.bar(pd, [ax - 0.18, sd * 0.56, 1.28], [ax, sd * (D.TY - D.TH - 0.08), 0.98], 0.06, 0.05);
        K.bar(pd, [ax + 0.18, sd * 0.56, 1.28], [ax, sd * (D.TY - D.TH - 0.08), 0.98], 0.06, 0.05);
        K.tube(pm, [ax, sd * 0.62, 1.45], [ax, sd * (D.TY - D.TH - 0.14), 0.70], 0.055, 0.045, 8, true);
        K.box(pd, ax - 0.12, ax + 0.12, sd > 0 ? D.TY - D.TH - 0.16 : -(D.TY - D.TH - 0.02), sd > 0 ? D.TY - D.TH - 0.02 : -(D.TY - D.TH - 0.16), 0.56, 1.02);
      });
    });
    K.part("wheels");
    K.veh.wheels({ axles: D.AX, r: D.R, hw: D.TH, y: D.TY, col: "paint", seg: 16 });

    /* ================================================================ body */
    K.part("body");
    K.prism(pa, bodyProfile(), "xz", -HW, HW);
    /* the plate seams the photographs show on the side, and the top edge's lip */
    [1, -1].forEach(function (sd) {
      [-6.02, -4.32, D.SEAM].forEach(function (sx) { side(pd, sd, sx - 0.012, sx + 0.012, sx === D.SEAM ? D.SKIRT : D.ARCH, D.TOP - 0.02, 0.006); });
      side(pl, sd, D.XT + 0.06, D.CABR - 0.06, D.TOP - 0.07, D.TOP - 0.01, 0.02);
      side(pl, sd, D.AX[2] + 0.98, D.SEAM - 0.02, D.SKIRT, D.SKIRT + 0.06, 0.02);                          /* the skirt's stiffened foot */
      side(pl, sd, D.SEAM + 0.02, D.CABR - 0.06, D.UND, D.UND + 0.06, 0.02);
      /* the lips round the three arches (T1) */
      for (i = 2; i <= 4; i++) {
        var c = D.AX[i], q = [[c - 0.88, D.FEND], [c - 0.62, D.ARCH], [c + 0.62, D.ARCH], [c + 0.88, D.FEND]];
        for (k = 0; k < 3; k++) K.bar(ps, [q[k][0], sd * (HW + 0.012), q[k][1]], [q[k + 1][0], sd * (HW + 0.012), q[k + 1][1]], 0.05, 0.03);
      }
      /* doors and hatches, tail to cab (T1): two on the after part, the tall one with the port, the big panel forward */
      door(sd, -5.92, -4.50, 1.78, 2.70);
      door(sd, -4.15, -3.45, 1.78, 2.70);
      door(sd, -1.38, -0.52, 0.92, 2.72);
      side(pd, sd, -1.16, -0.74, 2.10, 2.44, 0.012, 0.022);                                               /* the rounded port in it */
      side(gl, sd, -1.12, -0.78, 2.14, 2.40, 0.008, 0.034);
      door(sd, 1.18, 2.84, 1.82, 2.70, { pen: pa });
      side(pd, sd, -0.30, 0.55, 0.95, 1.55, 0.008);                                                        /* the low locker in the skirt */
      side(pa, sd, -0.27, 0.52, 0.98, 1.52, 0.02);
      /* small catches along the side (T1's row of fittings) */
      [-7.1, -6.5, -3.0, -2.2, 0.3].forEach(function (cx) { side(pm, sd, cx - 0.04, cx + 0.04, 2.50, 2.60, 0.025); });
      /* the stirrup under the skirt (T1) */
      K.veh.handle([-2.00, sd * (HW - 0.06), D.SKIRT], [-1.55, sd * (HW - 0.06), D.SKIRT], 0.22, [0, 0, -1]);
      /* the louvre slots at the front top, two columns of seven (T1) */
      for (k = 0; k < 7; k++) for (i = 0; i < 2; i++) side(pi, sd, 4.14 + i * 0.20, 4.28 + i * 0.20, 2.26 + k * 0.08, 2.30 + k * 0.08, 0.006);
      /* the amber marker by the cab (T1) */
      side(K.pen("lamp", "lampAmber"), sd, 4.50, 4.58, 1.86, 2.02, 0.02);
      /* the rail along the top edge (T2: the light line at the body's top) */
      var yr = sd * (HW - 0.06);
      K.tube(pm, [-7.20, yr, D.TOP + 0.10], [2.95, yr, D.TOP + 0.10], 0.018, 0.018, 5, false);
      for (x = -7.20; x <= 2.96; x += 1.45) K.tube(pm, [x, yr, D.TOP], [x, yr, D.TOP + 0.10], 0.016, 0.016, 4, false);
      /* tie-down brackets at the shell's foot (T2: the row of dots) */
      for (x = -6.6; x < 2.4; x += 1.9) K.box(pg, x - 0.06, x + 0.06, sd > 0 ? D.SW + 0.01 : -D.SW - 0.11, sd > 0 ? D.SW + 0.11 : -D.SW - 0.01, D.TOP, D.TOP + 0.05);
      /* tread strips on the shoulders */
      for (x = -6.9; x < 0.2; x += 2.3) K.box(ps, x, x + 1.9, sd > 0 ? 1.02 : -1.40, sd > 0 ? 1.40 : -1.02, D.TOP, D.TOP + 0.012);
      /* the equipment box under the frame between the first and second axles (T1) */
      K.veh.stowage(2.82, 3.52, sd > 0 ? 0.95 : -1.47, sd > 0 ? 1.47 : -0.95, 0.96, 1.56, {});
      K.teamPatch([3.9, sd * (HW + 0.004), 2.08], [1, 0, 0], [0, 0, 1], 0.42, 0.12);
    });
    /* the tail: lamps, tow eyes, the underrun bar */
    K.part("tail");
    [1, -1].forEach(function (sd) {
      K.veh.lamp([D.XT + 0.02, sd * 1.22, 1.95], [-1, 0, 0], { r: 0.07, col: "lampRed" });
      K.veh.lamp([D.XT + 0.02, sd * 1.04, 1.95], [-1, 0, 0], { r: 0.06, col: "lampAmber" });
      K.tube(pm, [D.XT + 0.10, sd * 0.48, 1.15], [D.XT, sd * 0.48, 1.15], 0.06, 0.06, 8, true);
      K.veh.handle([D.XT + 0.03, sd * 1.30, 2.30], [D.XT + 0.03, sd * 1.30, 2.60], 0.02, [-1, 0, 0]);
    });
    K.box(pd, D.XT + 0.02, D.XT + 0.14, -1.30, 1.30, 0.86, 1.00);
    K.box(pd, D.XT + 0.022, D.XT + 0.03, -0.70, 0.70, 1.80, 2.72);                                         /* the tail's access door */
    K.box(pa, D.XT, D.XT + 0.03, -0.67, 0.67, 1.83, 2.69);
    /* the fitting on the tail above the body (T1): two cheeks, a cross shaft, the bosses */
    [1, -1].forEach(function (sd) {
      K.prism(pg, [[-7.72, D.TOP], [-7.72, 3.12], [-7.60, 3.30], [-7.38, 3.30], [-7.22, 3.05], [-7.22, D.TOP]], "xz", sd * 0.52 - 0.04, sd * 0.52 + 0.04);
      K.tube(pg, [-7.49, sd * 0.56, 3.12], [-7.49, sd * 0.70, 3.12], 0.15, 0.15, 12, true);
      K.tube(pd, [-7.49, sd * 0.70, 3.12], [-7.49, sd * 0.74, 3.12], 0.07, 0.07, 8, true);
    });
    K.tube(pm, [-7.49, -0.52, 3.12], [-7.49, 0.52, 3.12], 0.08, 0.08, 10, false);

    /* ============================================================== shell */
    K.part("shell");
    var NS = 14, rings = [];
    [[-7.17, 0.30], [-7.15, 0.58], [-7.09, 0.82], [-6.98, 0.95], [-6.82, 1.0]].forEach(function (q) { rings.push(shellRing(q[0], D.SW * q[1], D.SH * q[1], NS)); });
    [-5.61, -3.0, -0.37, 1.4, D.SHF].forEach(function (sx) { rings.push(shellRing(sx, D.SW, D.SH, NS)); });
    for (i = 1; i <= 8; i++) { var nq = noseAt(i / 8); rings.push(shellRing(nq.x, nq.w, nq.h, NS)); }
    K.loft(pa, rings, { capA: true, capB: true });
    /* the hoops (T2) and the bands either side of them */
    D.HOOPS.forEach(function (hx) {
      K.loft(ps, [shellRing(hx - 0.05, D.SW, D.SH, NS, 0.006), shellRing(hx - 0.04, D.SW, D.SH, NS, 0.028), shellRing(hx + 0.04, D.SW, D.SH, NS, 0.028), shellRing(hx + 0.05, D.SW, D.SH, NS, 0.006)], { hard: true });
    });
    /* ================================================ the box behind the cab */
    K.part("box");
    var BX = K.facetedHouse(pa, [
      { z: D.TOP - 0.02, x0: D.BOXA, x1: D.BOXF, hw: HW, ca: 0.04, cf: 0.04 },
      { z: D.BOXZ - 0.10, x0: D.BOXA, x1: D.BOXF, hw: HW, ca: 0.04, cf: 0.04 },
      { z: D.BOXZ, x0: D.BOXA + 0.08, x1: D.BOXF, hw: HW - 0.12, ca: 0.04, cf: 0.04 }]);
    [1, -1].forEach(function (sd) {
      K.box(ps, D.BOXA + 0.25, D.BOXF - 0.20, sd > 0 ? 1.02 : -1.36, sd > 0 ? 1.36 : -1.02, D.BOXZ, D.BOXZ + 0.02);     /* its lids */
      K.veh.handle([3.55, sd * 1.19, D.BOXZ + 0.02], [3.85, sd * 1.19, D.BOXZ + 0.02], 0.04);
      K.veh.bolts([D.BOXA + 0.12, sd * (HW + 0.002), D.BOXZ - 0.16], [D.BOXF - 0.12, sd * (HW + 0.002), D.BOXZ - 0.16], 11, [0, sd, 0], 0.016);
    });
    K.teamPatch([3.87, 1.19, D.BOXZ + 0.02], [1, 0, 0], [0, 1, 0], 0.5, 0.2);

    /* ================================================================= cab */
    K.part("cab");
    var CB = K.facetedHouse(pa, [
      { z: D.CABZ0, x0: 5.42, x1: 7.42, hw: 1.40, ca: 0.04, cf: 0.20 },
      { z: D.BELT, x0: D.CABR, x1: D.CABF, hw: HW, ca: 0.04, cf: 0.30 },
      { z: D.SILL, x0: D.CABR, x1: D.CABF, hw: HW, ca: 0.04, cf: 0.30 },
      { z: 3.02, x0: D.CABR, x1: 7.42, hw: 1.50, ca: 0.04, cf: 0.30 },
      { z: D.ROOF, x0: D.CABR + 0.04, x1: 7.30, hw: 1.34, ca: 0.06, cf: 0.30 }], { bottom: true });
    /* a panel on a cab face between two x (side faces) or two y (the front) */
    function sAt(f, v, z, ax) { var a = CB.faceAt(f, 0, z)[ax], b = CB.faceAt(f, 1, z)[ax]; return (v - a) / (b - a); }
    function cabPanel(p, f, v0, v1, z0, z1, off) {
      var ax = f === 2 ? 1 : 0, zm = (z0 + z1) / 2, a = sAt(f, v0, zm, ax), b = sAt(f, v1, zm, ax);
      CB.panel(p, f, Math.min(a, b), Math.max(a, b), z0, z1, off);
    }
    function cabWindow(f, v0, v1, z0, z1) { cabPanel(pd, f, v0 - 0.04, v1 + 0.04, z0 - 0.04, z1 + 0.04, 0.008); cabPanel(gl, f, v0, v1, z0, z1, 0.016); }
    [0, 4].forEach(function (f) {
      var sd = f === 4 ? 1 : -1;
      cabWindow(f, 4.80, 5.03, 2.33, 2.76);                         /* the narrow rear window (T1) */
      cabWindow(f, 5.27, 5.99, 2.33, 2.78);                         /* the two door windows (T2: x 868-908, 925-965) */
      cabWindow(f, 6.30, 7.03, 2.33, 2.78);
      /* the door seams, in the three bands of the side, and the belt crease (T1) */
      [5.14, 6.12, 6.20, 7.14].forEach(function (dx) {
        cabPanel(pd, f, dx - 0.012, dx + 0.012, D.SILL, 2.92, 0.006);
        cabPanel(pd, f, dx - 0.012, dx + 0.012, D.BELT, D.SILL, 0.006);
        if (dx > 5.5) cabPanel(pd, f, dx - 0.012, dx + 0.012, 1.08, D.BELT, 0.006);
      });
      cabPanel(pd, f, 5.14, 7.14, 2.90, 2.925, 0.006);
      cabPanel(pl, f, D.CABR + 0.06, 7.30, D.BELT - 0.03, D.BELT + 0.04, 0.025);
      cabPanel(pl, f, D.CABR + 0.06, 7.30, D.SILL - 0.03, D.SILL + 0.02, 0.02);
      [5.86, 6.92].forEach(function (hx) { cabPanel(pd, f, hx - 0.11, hx + 0.11, 1.50, 1.56, 0.03); });       /* the door handles */
      /* grab handles by the doors */
      K.veh.handle([5.08, sd * (HW + 0.004), 1.95], [5.08, sd * (HW + 0.004), 2.55], 0.05, [0, sd, 0]);
      K.veh.handle([7.20, sd * (HW + 0.004), 1.80], [7.20, sd * (HW + 0.004), 2.10], 0.05, [0, sd, 0]);
      /* the folding step ladders under the cab (T1: two a side) */
      [[5.55, 6.08], [6.30, 6.83]].forEach(function (q) {
        var yo = sd * 1.44;
        [q[0], q[1]].forEach(function (lx) { K.tube(K.pen("metal", "light"), [lx, yo, D.CABZ0 + 0.02], [lx, yo, 0.44], 0.02, 0.02, 5, false); });
        [0.46, 0.70].forEach(function (lz) { K.box(K.pen("metal", "light"), q[0] - 0.02, q[1] + 0.02, sd > 0 ? yo - 0.09 : yo - 0.07, sd > 0 ? yo + 0.07 : yo + 0.09, lz - 0.015, lz + 0.015); });
      });
      /* the mirror frame at the corner (T1): a tall tube on two arms, two heads */
      var mx = 7.36, my = sd * (HW + 0.30);
      K.tube(pd, [mx, my, 2.12], [mx, my, 3.06], 0.016, 0.016, 5, false);
      K.tube(pd, [mx - 0.02, sd * (HW - 0.03), 2.20], [mx, my, 2.20], 0.014, 0.014, 4, false);
      K.tube(pd, [mx - 0.02, sd * (HW - 0.05), 3.00], [mx, my, 3.00], 0.014, 0.014, 4, false);
      K.box(pg, mx - 0.03, mx + 0.03, my - 0.11, my + 0.11, 2.52, 2.98);
      K.box(pg, mx - 0.03, mx + 0.03, my - 0.10, my + 0.10, 2.22, 2.46);
      K.box(K.pen("metal", "chrome"), mx - 0.034, mx - 0.03, my - 0.09, my + 0.09, 2.55, 2.95);
    });
    K.disc(pg, [7.44, -(HW + 0.12), 3.02], [1, 0, 0], 0.13, 10);                                          /* the round spot mirror, starboard (T1) */
    /* the quarter windows round the corners and the windscreen's two panes (T1) */
    [1, 3].forEach(function (f) { CB.panel(pd, f, 0.10, 0.90, 2.20, 2.97, 0.008); CB.panel(gl, f, 0.16, 0.84, 2.25, 2.93, 0.016); });
    CB.panel(pd, 2, 0.02, 0.98, 2.19, 2.99, 0.008);
    CB.panel(gl, 2, 0.045, 0.485, 2.24, 2.95, 0.016);
    CB.panel(gl, 2, 0.515, 0.955, 2.24, 2.95, 0.016);
    [-1, 1].forEach(function (sd) {                                                                       /* the wipers */
      var w0 = CB.faceAt(2, 0.5 + sd * 0.10, 2.25, 0.04), w1 = CB.faceAt(2, 0.5 + sd * 0.36, 2.62, 0.04);
      K.tube(pi, w0, w1, 0.012, 0.012, 4, false);
      var w2 = CB.faceAt(2, 0.5 + sd * 0.30, 2.25, 0.04), w3 = CB.faceAt(2, 0.5 + sd * 0.46, 2.50, 0.04);
      K.tube(pi, w2, w3, 0.012, 0.012, 4, false);
    });
    /* the front below the windscreen (T1): the grille with its V foot, the bar guards, the corner lamps */
    var XF = D.CABF;
    K.prism(pi, [[-0.46, 2.06], [0.46, 2.06], [0.46, 1.80], [0, 1.70], [-0.46, 1.80]], "yz", XF - 0.01, XF + 0.02);
    for (k = 0; k < 6; k++) K.box(pd, XF + 0.02, XF + 0.035, -0.44, 0.44, 1.83 + k * 0.04, 1.845 + k * 0.04);
    K.box(pl, XF, XF + 0.05, -1.22, 1.22, 2.07, 2.12);                                                     /* the ledge under the windscreen */
    [1, -1].forEach(function (sd) {
      var y0 = sd * 0.56, y1 = sd * 1.16, ym;
      K.box(pd, XF, XF + 0.012, Math.min(y0, y1), Math.max(y0, y1), 1.74, 2.05);
      [1.74, 2.04].forEach(function (bz) { K.box(pg, XF + 0.10, XF + 0.13, Math.min(y0, y1) - 0.03, Math.max(y0, y1) + 0.03, bz - 0.025, bz + 0.025); });
      for (k = 0; k < 3; k++) { ym = y0 + (y1 - y0) * (k + 0.5) / 3; K.box(pg, XF + 0.09, XF + 0.12, ym - 0.045, ym + 0.045, 1.74, 2.04); }
      [y0, y1].forEach(function (yy) { K.box(pg, XF, XF + 0.13, yy - 0.02, yy + 0.02, 1.86, 1.92); });
      /* the amber lamp in its wire guard on the corner */
      var lc = CB.faceAt(sd > 0 ? 3 : 1, 0.5, 1.90, 0.02), ln = CB.normal(sd > 0 ? 3 : 1, 1.90);
      K.veh.lamp(lc, ln, { r: 0.085, col: "lampAmber", guard: true });
    });
    /* the bumper standing forward of the cab, its apron, the lamp clusters in wire guards, the shackles (T1) */
    K.part("bumper");
    K.prism(pa, [[7.20, 1.12], [D.XF - 0.07, 1.12], [D.XF - 0.07, 0.80], [7.46, 0.62], [7.20, 0.62]], "xz", -1.49, 1.49);
    K.box(pl, 7.22, D.XF - 0.05, -1.50, 1.50, 1.10, 1.135);
    [1, -1].forEach(function (sd) {
      [0.86, 1.06].forEach(function (ly) { K.veh.lamp([D.XF - 0.045, sd * ly, 0.96], [1, 0, 0], { r: 0.075, guard: ly > 1 }); });
      K.box(pd, D.XF - 0.07, D.XF - 0.062, sd * 0.96 - 0.24, sd * 0.96 + 0.24, 0.86, 1.06);
      K.veh.lamp([D.XF - 0.062, sd * 0.60, 0.96], [1, 0, 0], { r: 0.05, col: "lampAmber" });
      K.box(pm, D.XF - 0.07, D.XF - 0.05, sd * 0.30 - 0.06, sd * 0.30 + 0.06, 0.88, 1.04);
      K.tube(pm, [D.XF - 0.07, sd * 0.30, 0.96], [D.XF, sd * 0.30, 0.96], 0.05, 0.05, 8, true);
      K.disc(K.pen("lamp", "lampRed"), [7.52, sd * 1.495, 0.92], [0, sd, 0], 0.05, 8);
      K.veh.mudflap(5.30, sd > 0 ? 0.95 : -1.45, sd > 0 ? 1.45 : -0.95, 0.52, 0.96);
    });
    /* the roof (T1): the rail, two covered domes, the hatch, a lamp */
    K.part("roof");
    var rz = D.ROOF, rail = [[4.86, -1.22], [7.10, -1.22], [7.22, -1.05], [7.22, 1.05], [7.10, 1.22], [4.86, 1.22]];
    for (i = 0; i + 1 < rail.length; i++) {
      K.tube(pm, [rail[i][0], rail[i][1], rz + 0.16], [rail[i + 1][0], rail[i + 1][1], rz + 0.16], 0.016, 0.016, 5, false);
      K.tube(pm, [rail[i][0], rail[i][1], rz], [rail[i][0], rail[i][1], rz + 0.16], 0.014, 0.014, 4, false);
    }
    K.tube(pm, [rail[5][0], rail[5][1], rz], [rail[5][0], rail[5][1], rz + 0.16], 0.014, 0.014, 4, false);
    [[5.95, -1.22], [5.95, 1.22]].forEach(function (q) { K.tube(pm, [q[0], q[1], rz], [q[0], q[1], rz + 0.16], 0.014, 0.014, 4, false); });
    var pc = K.pen("dull", "cover");
    [[5.25, -0.80, 0.24, 0.30], [6.72, 0.34, 0.27, 0.36]].forEach(function (q) {
      K.cylZ(pc, q[0], q[1], rz, rz + q[3] * 0.7, q[2], 12, q[2] * 0.92);
      K.sphere(pc, [q[0], q[1], rz + q[3] * 0.7], [q[2] * 0.92, q[2] * 0.92, q[3] * 0.3], 12, 4, 0, PI / 2);
      K.tube(pd, [q[0], q[1], rz + q[3] * 0.34], [q[0], q[1], rz + q[3] * 0.38], q[2] + 0.012, q[2] + 0.012, 12, false);
    });
    K.veh.hatch(6.05, 0.55, rz, { lx: 0.62, ly: 0.62, yaw: 0 });
    K.veh.hatch(6.05, -0.20, rz, { r: 0.28, yaw: PI });
    K.box(ps, 4.90, 5.60, 0.20, 1.05, rz, rz + 0.07);                                                      /* the roof unit */
    for (k = 0; k < 5; k++) K.box(pi, 4.96 + k * 0.125, 5.03 + k * 0.125, 0.28, 0.97, rz + 0.07, rz + 0.076);
    K.teamPatch([5.25, 0.02, rz], [1, 0, 0], [0, 1, 0], 0.55, 0.30);
    return K.finish();
  }
  return { build: build, D: D };
})();

/* len: the measured X extent (the published 15.5 m, bumper to tail) */
UNIT_MODELS["tel_c"] = { len: 15.5, build: HeroPilotDf16.build };
