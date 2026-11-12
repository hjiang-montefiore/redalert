/* ==================== js/hero/pla_destroyers_redo.js =====================
   HERO MODELS -- the PLA Navy's three modern destroyer rows, rebuilt as
   ships (the owner: "the PLA Navy models are bad, like 055").  Keys:

     cruiser_c          Type 055 (Renhai) large destroyer, drawn as Nanchang
                        (101) / Anshan (103) / Wuxi (104).          180.0 m
     destroyer_c        Type 052D (Luyang III), drawn as Guiyang (119), an
                        original short-deck 052D.                    157.0 m
     pla_e00_destroyer  the row is "Type 052C / 052D", service 2004: the
                        052C (Luyang II), drawn as Lanzhou (170) / Xi'an
                        (153); the 052D is destroyer_c.               155.0 m

   REPLACES: cruiser_c and destroyer_c of js/hero/pla_navy_modern.js and
   pla_e00_destroyer of js/hero/pla_e00_destroyer.js.  This file loads AFTER
   both and overwrites those three UNIT_MODELS keys; neither file is edited
   (their other keys -- ssbn_c, carrier_c -- are untouched).  The old models
   stood boxes on a plain hull: no knuckle, a pyramid for the 055's mast,
   flat VLS patches.  What is new here:
     - ONE hull generator with a real section: a superellipse bilge, the
       flare from the waterline to a KNUCKLE, the upper strake above it
       (leaning in on the 055), a raked stem, a bulwark round the bow where
       the photographs show one, a transom, the 055's bow sonar dome;
     - superstructure blocks that stand FLUSH on the hull's upper strake
       and lean in with it, as every broadside shows [A1][C1][D1][P1]; the
       052s keep the narrow side walkways their photographs show;
     - the 055's integrated mast as the photographs give it: one tower
       rising out of the forward block, its four broad corner faces carrying
       the Type 346B arrays, the X-band faces above them, the cap, the ESM
       drum and the pole [A1][A2][C1];
     - VLS fields drawn as hatch grids, cell by cell (64 + 48 on the 055,
       32 + 32 on the 052D), HHQ-9 six-round revolvers and YJ-62 launchers
       on the 052C;
     - the guns (H/PJ-38 130 mm, H/PJ-87 100 mm), H/PJ-11 and Type 730 CIWS,
       HHQ-10, the Type 517 Yagi, domes, EO directors;
     - rule-10 fittings: guard rails on every exposed deck and roof edge,
       boats in their bays with davits, anchors in their pockets, raft
       canisters, bollards and fairleads, hatches, vents, ladders, doors,
       scuttles, whips, the boot-topping; plating, grime and rust-run
       canvas textures.
   ONE BUILDER for the two sisters (052C and 052D share the hull, measured
   on the 052D and drawn at each one's published length) with a VARIANTS
   table; the 055 is its own ship.

   PUBLISHED FIGURES (en.wikipedia "Type 055 destroyer", "Type 052D
   destroyer", "Type 052C destroyer", raw wikitext; the 055/052D figures as
   read for pla_navy_modern.js, the 052C's for pla_e00_destroyer.js):
     055   180 m x 20 m x 6.6 m, 12-13,000 t; 112 VLS (64 fore, 48 aft),
           1 x 130 mm H/PJ-38, 1 x H/PJ-11, 1 x HHQ-10 (24), Type 346B dual-
           band radar, hangar for two helicopters.
     052D  156-157 m x 17-18 m x 6 m, 7,500 t; 64 VLS (32 + 32), 130 mm,
           Type 730, HHQ-10, Type 346A, one Z-9 hangar.
     052C  155 m x 17 m x 6 m, 7,000 t; 1 x 100 mm H/PJ-87, 48 HHQ-9 in
           eight six-round revolvers (six fore, two aft), 8 YJ-62, 2 x Type
           730, Type 346, Type 517, a hangar.

   REFERENCES (Wikimedia Commons; scratchpad/q_plnm_ref, q_reb3/ref and,
   new for this file, q_pdr/ref; grids laid over them with PIL):
     [C1] "PLANS Nanchang (DDG-101) 20210427.jpg" (Japan MoD) -- 055,
          starboard broadside 19 deg up, 1600 x 488: transom x 105, stem
          x 1545, 8.0 px/m.  Every 055 STATION.
     [C2] "PLANS Lhasa (DDG-102) 20240701.jpg" -- 055, port, nearly level,
          soft: the order of the blocks, the mast's taper, the sides of hull
          and superstructure as one face.
     [A1] "PLANS Anshan (DDG-103) 20230605.jpg" (Japan MoD) -- 055, PORT
          broadside, LEVEL, 1600 x 449, soft: bow x 48, stern x 1576,
          8.47 px/m, waterline rows 376-382.  Every 055 HEIGHT (below).
     [A2] "PLANS Anshan (DDG-103) and helicopters 20241015.jpg" -- 055 from
          the port bow, level: the tower rising out of the forward block, the
          block's sloping front and chamfered corners.
     [A3] "PLANS Wuxi (DDG-104) 20230828.jpg", "... 20250527.jpg" -- 055
          from above: the forecastle cell field, the hangar roof, the pad.
     [D1] "PLANS Guiyang (DDG-119) 20200428.jpg" (Japan MoD) -- 052D, port
          broadside 12.4 deg up, 9.6 px/m: every 052D station and height.
     [D3] "CNS Kunming (DDG-172) docks at a harbor on Changxing Island
          2.jpg" -- 052D from the starboard bow: the array faces under the
          bridge glazing with their lower corners rounded, the bow bulwark,
          the anchor pocket, the flush sides.
     [P1] "Type 052C destroyer.jpg" -- Lanzhou (170), port side, long lens:
          every 052C station; its heights at the [D1] scale.
     [P2] "Luyang II (Type 052C) Class Destroyer.JPG" -- Lanzhou from the
          port bow, high: the four array faces, the 01 deckhouse and its
          Type 730, the oval black funnel cap, the Yagi tower, the hangar.
     [P3] "Chinese Navy Guided-Missile Destroyer Xian (153) Departs Joint
          Base Pearl Harbor-Hickam ... 160804-N-IU636-106.jpg" -- Xi'an from
          the port bow: the YJ-62 launchers trained athwartships, the
          revolvers' round hatches, raft canisters, a boat at the 01 level,
          the anchor pocket, rails along the walkways.
     [P4] "CNS Haikou (DDG-171) in Rim of the Pacific (RIMPAC) Exercise
          2014.jpg" -- 052C nearly bow-on: the superstructure's lean.

   HEIGHTS OF THE 055 [A1], read again for this file.  pla_navy_modern.js
   read them off [C1] (19 deg up) and put the centre-line items high: a
   point on the centre line sits 10 m behind the near waterline, which
   [C1] shows 26 px lower than a point at the ship's side.  The level
   broadside [A1] gives: main deck 7.1 amidships, 8.4 at the stem; the
   forward deckhouse 9.6; the bridge roof 18.4; the tower's top 27.2, the
   ESM drum 30.4, the pole 34.0 (was 33.7 / 36); the funnel block 15.2
   (was 17.5); the step abaft it 9.6 (was 14.8); the hangar 10.4; the pad
   4.8 ([A1] reads 5.2-5.7 off a soft waterline; [C1]'s 4.8 kept).  The
   tower: 7.6..17.6 at its foot, 9.8..16.2 at its top [A1][C1] (it was a
   pyramid narrowing to 3 m).  The forward block 7.6..29.5 at the deck,
   its front back to 25.4 at the bridge roof [A1]; the hangar's forward
   end and the dome on its post at -44.8 [A1][C1]; the HHQ-10 at its after
   end [A1].

   NOT CONFIRMED -- estimated, not measured:
     - every plan width of a superstructure block (the photographs are side
       and 3/4 views); the lean of the sides (7 deg) and the chamfers;
     - on the 055: the arrays' heights on the tower (the photographs are
       too soft to read the faces: the S-band faces are put on the tower's
       broad lower corners, the X-band above); the cells' layout in plan
       (sixteen by four fore, twelve by four aft, as the fields' measured
       extents allow); the boats in the step's side bays (the bays are dark
       openings in [C1]); the gun house's height (2.9 m; [A1] reads 3.9, the
       old reading was 2.3); the bow dome's size;
     - on the 052D: the gun house's height (2.7 m; [D1]'s 1.9 "reads low");
       the cells' layout in plan;
     - on the 052C: the revolvers' layout in plan, the two after revolvers
       placed between the YJ-62 launchers, the launchers' training and
       elevation, the boats in bays in the 01 casing's sides;
     - everything under water (keels, bilge keels, shafts, A-brackets,
       screws, rudders) beyond the published draughts;
     - the small fittings (rails, bollards, fairleads, hatches, vents, rafts,
       doors, ladders, whips, scuttles): typical, placed by eye.
   No pennant numbers, names, flags, stars or deck lettering.  The team
   colour is small strips on the bridge roof, the hangar roof, the pad and
   the gun house.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0.  The main
   gun is the group named "turret" (all three rows are turret:true; origin
   on its ring at the deck, gun along +X); a hidden "helipad" node marks
   the middle of the pad, as pla_navy_modern.js does.  Everything else is
   baked one mesh per material: 14 draw calls (10 + 4 for the turret).
   The fittings kit (FK) is pla_navy_modern.js's, copied (it exports only
   its builders); the textures, the faceted blocks, the hull and the
   weapons are this file's own.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPLADestroyersRedo = (function () {
  "use strict";
  var PI = Math.PI;

  /* ------------------------------------------------------- FITTINGS KIT
     (detail pass) the small deck fittings every photograph shows and a
     profile drawing leaves out: rails and lifelines, bollards, fairleads,
     hatches, vents, raft canisters, ladders, the anchor in its hawse,
     scuttles, whips, davits and boats.  Each one is emitted as outward-
     wound triangles into a SINK, anything with a tri(a, b, c) method, so it
     merges into the material bins already here and costs no draw call.
     FK.Sink() is a sink of its own whose geo(THREE) gives a flat-shaded
     BufferGeometry for the kit's mesh batches.  All sizes in metres.    */
  var FK = (function () {
    var TW = Math.PI * 2;
    function sb(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function cr(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function dt(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
    function nz(v) { var l = Math.sqrt(dt(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
    function ad(a, b, k) { return [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; }
    /* a triangle; with ref given it is turned to face away from ref     */
    function tri(s, a, b, c, ref) {
      var n = cr(sb(b, a), sb(c, a));
      if (dt(n, n) < 1e-14) return;
      if (ref) {
        var m = [(a[0] + b[0] + c[0]) / 3 - ref[0], (a[1] + b[1] + c[1]) / 3 - ref[1], (a[2] + b[2] + c[2]) / 3 - ref[2]];
        if (dt(n, m) < 0) { s.tri(a, c, b); return; }
      }
      s.tri(a, b, c);
    }
    function quad(s, a, b, c, d, ref) { tri(s, a, b, c, ref); tri(s, a, c, d, ref); }
    /* a tube A -> B, radius ra at A and rb at B, n sides, optional caps */
    function tube(s, A, B, ra, rb, n, caps) {
      var d = sb(B, A); if (dt(d, d) < 1e-10) return;
      var ax = nz(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
      var u = nz(cr(ax, t)), v = cr(ax, u), RA = [], RB = [], i, j;
      for (i = 0; i < n; i++) {
        var c = Math.cos(i / n * TW + 0.5), sn = Math.sin(i / n * TW + 0.5);
        var r = [u[0] * c + v[0] * sn, u[1] * c + v[1] * sn, u[2] * c + v[2] * sn];
        RA.push(ad(A, r, ra)); RB.push(ad(B, r, rb));
      }
      for (i = 0; i < n; i++) {
        j = (i + 1) % n;
        if (ra > 0) tri(s, RA[i], RA[j], RB[j]);
        if (rb > 0) tri(s, RA[i], RB[j], RB[i]);
        if (caps) { if (rb > 0) tri(s, B, RB[i], RB[j]); if (ra > 0) tri(s, A, RA[j], RA[i]); }
      }
    }
    /* an oriented box: centre c, the frame (ex along, ey across, ez up)  */
    function obox(s, c, ex, ey, ez, lx, ly, lz) {
      var V = [], i, F = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
      for (i = 0; i < 8; i++) {
        var a = (i & 1 ? 0.5 : -0.5) * lx, b = (i & 2 ? 0.5 : -0.5) * ly, e = (i & 4 ? 0.5 : -0.5) * lz;
        V.push([c[0] + ex[0] * a + ey[0] * b + ez[0] * e, c[1] + ex[1] * a + ey[1] * b + ez[1] * e, c[2] + ex[2] * a + ey[2] * b + ez[2] * e]);
      }
      F.forEach(function (f) { quad(s, V[f[0]], V[f[1]], V[f[2]], V[f[3]], c); });
    }
    /* a box standing on z0, yawed about Z                               */
    function boxZ(s, x, y, z0, lx, ly, lz, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      obox(s, [x, y, z0 + lz / 2], [c, sn, 0], [-sn, c, 0], [0, 0, 1], lx, ly, lz);
    }
    function cylZ(s, x, y, z0, h, r, n, r2) { tube(s, [x, y, z0], [x, y, z0 + h], r, r2 === undefined ? r : r2, n, true); }
    /* a flat disc (scuttle, port, hawse mouth) facing nrm               */
    function disc(s, c, nrm, r, n) {
      var a = nz(nrm), t = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = nz(cr(a, t)), v = cr(a, u), P = [], i;
      for (i = 0; i < n; i++) P.push(ad(ad(c, u, Math.cos(i / n * TW) * r), v, Math.sin(i / n * TW) * r));
      var back = ad(c, a, -1);
      for (i = 1; i < n - 1; i++) tri(s, P[0], P[i], P[i + 1], back);
    }
    /* guard rail along a polyline of deck points [x, y, z]: stanchions
       every `step`, a top rail at h and a lifeline at h / 2              */
    function rail(s, pts, h, step, rp) {
      var i, k, carry = 0; rp = rp || 0.024; h = h || 1.0; step = step || 1.5;
      function post(p) { tube(s, p, [p[0], p[1], p[2] + h], rp, rp, 3, false); }
      for (i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1], d = sb(b, a), L = Math.sqrt(dt(d, d));
        if (L < 1e-3) continue;
        tube(s, [a[0], a[1], a[2] + h], [b[0], b[1], b[2] + h], rp * 0.8, rp * 0.8, 3, false);
        tube(s, [a[0], a[1], a[2] + h * 0.5], [b[0], b[1], b[2] + h * 0.5], rp * 0.55, rp * 0.55, 3, false);
        for (k = carry; k < L; k += step) post(ad(a, d, k / L));
        carry = k - L;
      }
      post(pts[pts.length - 1]);
    }
    /* a toe-rail / deck-edge gutter: a low bar along the deck edge       */
    function toe(s, pts, r) {
      for (var i = 0; i < pts.length - 1; i++) tube(s, pts[i], pts[i + 1], r || 0.04, r || 0.04, 3, false);
    }
    /* double bollard on its base plate, k = scale (1 = a 1.2 m frigate pair) */
    function bollard(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, 0.9 * k, 0.36 * k, 0.05 * k, yaw);
      [-1, 1].forEach(function (e) {
        var px = x + c * e * 0.26 * k, py = y + sn * e * 0.26 * k;
        cylZ(s, px, py, z + 0.05 * k, 0.36 * k, 0.12 * k, 6);
        cylZ(s, px, py, z + 0.41 * k, 0.05 * k, 0.15 * k, 6);
      });
    }
    function cleat(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      [-1, 1].forEach(function (e) { cylZ(s, x + c * e * 0.09 * k, y + sn * e * 0.09 * k, z, 0.1 * k, 0.035 * k, 4); });
      boxZ(s, x, y, z + 0.1 * k, 0.42 * k, 0.07 * k, 0.05 * k, yaw);
    }
    /* a roller fairlead at the deck edge, yaw = the line of the edge     */
    function fairlead(s, x, y, z, yaw, k) {
      k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, 0.8 * k, 0.32 * k, 0.07 * k, yaw);
      [-1, 1].forEach(function (e) { cylZ(s, x + c * e * 0.22 * k, y + sn * e * 0.22 * k, z + 0.07 * k, 0.26 * k, 0.09 * k, 6); });
    }
    /* a deck hatch: coaming, lid, hinge bar and dogs                     */
    function hatch(s, x, y, z, lx, ly, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      boxZ(s, x, y, z, lx, ly, 0.10, yaw);
      boxZ(s, x, y, z + 0.10, lx - 0.08, ly - 0.08, 0.04, yaw);
      var hx = x - c * lx * 0.5, hy = y - sn * lx * 0.5;
      tube(s, [hx + sn * ly * 0.4, hy - c * ly * 0.4, z + 0.12], [hx - sn * ly * 0.4, hy + c * ly * 0.4, z + 0.12], 0.035, 0.035, 4, true);
      [-1, 1].forEach(function (e) {
        boxZ(s, x + c * lx * 0.5 - sn * e * ly * 0.3, y + sn * lx * 0.5 + c * e * ly * 0.3, z + 0.03, 0.08, 0.06, 0.1, yaw);
      });
    }
    /* a mushroom vent and a gooseneck vent                               */
    function mushroom(s, x, y, z, r, h) {
      cylZ(s, x, y, z, h, r, 8);
      cylZ(s, x, y, z + h, r * 0.5, r * 1.7, 8, r * 0.6);
    }
    function goose(s, x, y, z, r, h, yaw) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
      tube(s, [x, y, z], [x, y, z + h], r, r, 6, false);
      tube(s, [x, y, z + h - r], [x + c * r * 2.4, y + sn * r * 2.4, z + h - r * 2.2], r * 1.05, r * 1.15, 6, true);
    }
    /* a life-raft canister on its cradle, axis along yaw: shell to sW,
       the cradle and bands to sM                                         */
    function raft(sW, sM, x, y, z, yaw, L, r) {
      L = L || 1.25; r = r || 0.32;
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0), zc = z + r + 0.08;
      tube(sW, [x - c * L / 2, y - sn * L / 2, zc], [x + c * L / 2, y + sn * L / 2, zc], r, r, 8, true);
      [-0.3, 0.3].forEach(function (f) {
        var px = x + c * L * f, py = y + sn * L * f;
        tube(sM, [px - c * 0.04, py - sn * 0.04, zc], [px + c * 0.04, py + sn * 0.04, zc], r * 1.06, r * 1.06, 8, false);
        boxZ(sM, px, py, z, 0.1, r * 1.8, 0.22, yaw);
      });
    }
    /* an inclined or vertical ladder from foot A to head B; side = the
       horizontal unit vector across it                                  */
    function ladder(s, A, B, side, w, step) {
      w = (w || 0.5) / 2; step = step || 0.3;
      var e = [side[0] * w, side[1] * w, 0], d = sb(B, A), L = Math.sqrt(dt(d, d)), n = Math.max(1, Math.floor(L / step)), i;
      tube(s, ad(A, e, 1), ad(B, e, 1), 0.025, 0.025, 4, false);
      tube(s, ad(A, e, -1), ad(B, e, -1), 0.025, 0.025, 4, false);
      for (i = 1; i <= n; i++) { var p = ad(A, d, i / (n + 0.5)); tube(s, ad(p, e, 1), ad(p, e, -1), 0.016, 0.016, 3, false); }
    }
    /* a stockless anchor stowed in its hawse on a hull side; (x, y, z) the
       hawse mouth on the plating, out = outward unit normal [nx, ny, nz] */
    function anchor(s, x, y, z, out, k) {
      k = k || 1;
      var o = nz(out), ez = [0, 0, 1], ex = nz(cr(ez, o)), p = ad([x, y, z], o, 0.10 * k);
      tube(s, [x, y, z], ad([x, y, z], o, 0.14 * k), 0.30 * k, 0.34 * k, 10, true);       /* hawse lip */
      obox(s, ad(p, ez, -0.62 * k), ex, o, ez, 0.17 * k, 0.12 * k, 1.0 * k);             /* shank     */
      obox(s, ad(p, ez, -1.12 * k), ex, o, ez, 0.75 * k, 0.16 * k, 0.16 * k);            /* crown     */
      [-1, 1].forEach(function (e) {
        tube(s, ad(ad(p, ez, -1.12 * k), ex, e * 0.36 * k), ad(ad(p, ez, -0.72 * k), ex, e * 0.24 * k), 0.09 * k, 0.04 * k, 4, true);
      });
    }
    /* a whip aerial, tapering, with a small base insulator               */
    function whip(s, x, y, z, h, r) {
      r = r || 0.03;
      cylZ(s, x, y, z, 0.3, r * 2.5, 6);
      tube(s, [x, y, z + 0.3], [x, y, z + h], r, r * 0.3, 4, false);
    }
    /* a boat davit: post, curved arm reaching out along yaw, the fall    */
    function davit(s, x, y, z, yaw, h, reach) {
      var c = Math.cos(yaw), sn = Math.sin(yaw), t = [x, y, z + h], e = [x + c * reach, y + sn * reach, z + h - 0.2];
      tube(s, [x, y, z], t, 0.07, 0.06, 6, false);
      tube(s, t, [x + c * reach * 0.55, y + sn * reach * 0.55, z + h + 0.2], 0.06, 0.05, 6, false);
      tube(s, [x + c * reach * 0.55, y + sn * reach * 0.55, z + h + 0.2], e, 0.05, 0.045, 6, true);
      tube(s, e, [e[0], e[1], e[2] - 0.9], 0.012, 0.012, 3, false);
    }
    /* a rigid-hull inflatable: grey sponson tubes to sT, floor/console to sH */
    function rib(sT, sH, x, y, z, yaw, L, B) {
      var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0), r = B * 0.2;
      function P(a, b, h) { return [x + c * a - sn * b, y + sn * a + c * b, z + h]; }
      [-1, 1].forEach(function (e) {
        tube(sT, P(-L / 2, e * (B / 2 - r), r), P(L * 0.22, e * (B / 2 - r), r), r, r, 7, true);
        tube(sT, P(L * 0.22, e * (B / 2 - r), r), P(L / 2, e * r * 0.3, r * 1.4), r, r * 0.6, 7, true);
      });
      obox(sH, P(-L * 0.04, 0, r * 0.5), [c, sn, 0], [-sn, c, 0], [0, 0, 1], L * 0.86, B - 2 * r, r * 0.9);
      boxZ(sH, x - c * L * 0.08, y - sn * L * 0.08, z + r, L * 0.16, B * 0.35, r * 2.2, yaw);
    }
    /* a sink of the kit's own                                            */
    function Sink() { this.p = []; }
    Sink.prototype.tri = function (a, b, c) { this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); };
    Sink.prototype.geo = function (THREE, tile) {
      if (!this.p.length) return null;
      var P = this.p, U = [], i, q = 1 / (tile || 4);
      for (i = 0; i < P.length; i += 9) {
        var n = cr(sb([P[i + 3], P[i + 4], P[i + 5]], [P[i], P[i + 1], P[i + 2]]), sb([P[i + 6], P[i + 7], P[i + 8]], [P[i], P[i + 1], P[i + 2]]));
        var ax = Math.abs(n[0]), ay = Math.abs(n[1]), az = Math.abs(n[2]);
        for (var k = 0; k < 9; k += 3) {
          if (az >= ax && az >= ay) U.push(P[i + k] * q, P[i + k + 1] * q);
          else if (ay >= ax) U.push(P[i + k] * q, P[i + k + 2] * q);
          else U.push(P[i + k + 1] * q, P[i + k + 2] * q);
        }
      }
      var g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
      g.computeVertexNormals();
      return g;
    };
    /* weathering laid over a painted canvas: rust runs from fittings,
       salt bloom, grime patches, drips.  w x h the canvas, n the density */
    function weather(g, w, h, seed, n, strength) {
      var s = (seed >>> 0) || 11, i, a = strength || 1;
      function R() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
      n = n || 30;
      for (i = 0; i < n; i++) {
        var x = R() * w, y = R() * h, l = h * (0.05 + R() * 0.22), gr = g.createLinearGradient(0, y, 0, y + l);
        gr.addColorStop(0, "rgba(92,52,30," + (0.30 * a).toFixed(3) + ")"); gr.addColorStop(1, "rgba(92,52,30,0)");
        g.fillStyle = gr; g.fillRect(x, y, 1 + R() * 2.2, l);
      }
      for (i = 0; i < n * 0.6; i++) {
        var x2 = R() * w, y2 = R() * h, l2 = h * (0.04 + R() * 0.14), g2 = g.createLinearGradient(0, y2, 0, y2 + l2);
        g2.addColorStop(0, "rgba(20,22,24," + (0.22 * a).toFixed(3) + ")"); g2.addColorStop(1, "rgba(20,22,24,0)");
        g.fillStyle = g2; g.fillRect(x2, y2, 1 + R() * 3, l2);
      }
      g.fillStyle = "#ffffff";
      for (i = 0; i < n * 0.4; i++) { g.globalAlpha = 0.04 * a + R() * 0.04 * a; g.fillRect(R() * w, R() * h, w * (0.03 + R() * 0.08), h * (0.02 + R() * 0.06)); }
      g.fillStyle = "#1a1c1e";
      for (i = 0; i < n * 0.4; i++) { g.globalAlpha = 0.04 * a + R() * 0.05 * a; g.fillRect(R() * w, R() * h, w * (0.04 + R() * 0.1), h * (0.01 + R() * 0.04)); }
      g.globalAlpha = 1;
    }
    return { tri: tri, quad: quad, tube: tube, obox: obox, boxZ: boxZ, cylZ: cylZ, disc: disc, rail: rail, toe: toe,
             bollard: bollard, cleat: cleat, fairlead: fairlead, hatch: hatch, mushroom: mushroom, goose: goose,
             raft: raft, ladder: ladder, anchor: anchor, whip: whip, davit: davit, rib: rib, Sink: Sink, weather: weather };
  })();

  /* ------------------------------------------------------------- PAINT
     The light PLAN grey of [D1][C1][P1]: hull and superstructure in two
     close shades, the decks a dark non-slip grey, the bottom and the boot
     topping the PLAN's red [D1][C1].  Canvas textures carry the plating
     seams, the weathering and the grime (FK.weather).                   */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvasTex(THREE, key, W0, H0, draw) {
    if (TEX[key]) return TEX[key];
    var cv = document.createElement("canvas"); cv.width = W0; cv.height = H0;
    draw(cv.getContext("2d"), W0, H0);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }
  /* hull plating: a tile is 24 m x 8 m; welded strakes, frames, rust runs */
  function hullTex(THREE) {
    return canvasTex(THREE, "PDR_HULL", 512, 256, function (g, w, h) {
      var R = rng(9055), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.09; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke(); }
      for (i = 0; i < 6; i++) { var xx = i * w / 6 + (i % 2) * 18; g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke(); }
      g.globalAlpha = 0.05;
      for (i = 0; i < 44; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 2 + R() * 4, 16 + R() * 70); }
      g.globalAlpha = 1;
      FK.weather(g, w, h, 9056, 28, 0.6);
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "PDR_PLATE", 256, 256, function (g, w, h) {
      var R = rng(9057), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1.4;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.05;
      for (i = 0; i < 26; i++) { g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000"; g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30); }
      g.globalAlpha = 1;
      FK.weather(g, w, h, 9058, 18, 0.7);
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "PDR_DECK", 256, 256, function (g, w, h) {
      var R = rng(9059), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, i * h / 6); g.lineTo(w, i * h / 6); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 40; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
      FK.weather(g, w, h, 9060, 14, 0.6);
    });
  }
  /* louvres, recesses, cell seams, funnel caps: dark grille bars */
  function grilleTex(THREE) {
    return canvasTex(THREE, "PDR_GRILLE", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }
  /* an active array: the tiled radiating face under its cover, a fine
     grid of modules and the frame [D3][P2] */
  function arrayTex(THREE) {
    return canvasTex(THREE, "PDR_ARRAY", 128, 128, function (g, w, h) {
      var i, j;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.16; g.fillStyle = "#000000";
      for (i = 0; i < 16; i++) for (j = 0; j < 16; j++) if ((i + j) % 2 === 0) g.fillRect(i * 8 + 1, j * 8 + 1, 6, 6);
      g.globalAlpha = 0.22; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 0; i <= 4; i++) {
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
      }
      g.globalAlpha = 1;
    });
  }
  var PAINT = { hull: 0xa2abb0, sup: 0xa8b0b4, deck: 0x585f64 };
  function makeMats(THREE, C) {
    var P = PAINT, team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    return {
      hull:  skin(P.hull, hullTex(THREE), 0.86),
      under: skin(0x5a1e18, hullTex(THREE), 0.9),
      sup:   skin(P.sup, plateTex(THREE), 0.86),
      deck:  skin(P.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      white: skin(0xcfd2d0, plateTex(THREE), 0.8),
      array: skin(0x737d83, arrayTex(THREE), 0.7),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: new THREE.MeshStandardMaterial({ color: 0x5f666c, roughness: 0.52, metalness: 0.5, side: THREE.DoubleSide }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x0b1114, roughness: 0.12, metalness: 0.1 })
    };
  }
  function sealMats(M) {
    for (var k in M) if (M.hasOwnProperty(k)) { M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true; }
    return M;
  }
  /* one sink per material (FK.Sink): every hand-built triangle goes in one */
  var SINK_KEYS = ["hull", "under", "sup", "deck", "dark", "white", "array", "team", "metal", "glass"];
  function sinks() { var S = {}; SINK_KEYS.forEach(function (k) { S[k] = new FK.Sink(); }); return S; }
  function sinkOut(THREE, g, S, T) {
    SINK_KEYS.forEach(function (k) {
      var gg = S[k].geo(THREE, k === "hull" || k === "under" ? 8 : 4);
      if (gg) g.add(new THREE.Mesh(gg, T[k]));
    });
  }

  /* ------------------------------------------------------------ helpers */
  function geoOf(THREE, pos, uv, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    if (idx) g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function sphere(THREE, p, r, m, x, y, z, ws, hs, cut) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, ws || 12, cut ? Math.max(3, Math.round((hs || 8) * 0.6)) : (hs || 8), 0, PI * 2, 0, cut || PI), m);
    s.rotation.x = PI / 2; s.position.set(x, y, z); p.add(s); return s;
  }
  /* a faceted solid between two convex polygons (CCW from above), flat-shaded */
  function frustum(S, lo, z0, hi, z1, noBottom) {
    var n = lo.length, i;
    var c = [0, 0, (z0 + z1) / 2];
    for (i = 0; i < n; i++) { c[0] += (lo[i][0] + hi[i][0]) / (2 * n); c[1] += (lo[i][1] + hi[i][1]) / (2 * n); }
    for (i = 1; i < n - 1; i++) {
      FK.tri(S, [hi[0][0], hi[0][1], z1], [hi[i][0], hi[i][1], z1], [hi[i + 1][0], hi[i + 1][1], z1], c);
      if (!noBottom) FK.tri(S, [lo[0][0], lo[0][1], z0], [lo[i + 1][0], lo[i + 1][1], z0], [lo[i][0], lo[i][1], z0], c);
    }
    /* the sides in rows and columns of a metre or two, so that whatever
       lies on them (doors, arrays, glazing) sorts in front of them */
    var nr = Math.max(1, Math.ceil((z1 - z0) / 1.5)), r, q;
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n, Le = Math.hypot(lo[j][0] - lo[i][0], lo[j][1] - lo[i][1]), nc = Math.max(1, Math.ceil(Le / 3.2));
      for (r = 0; r < nr; r++) for (q = 0; q < nc; q++) {
        var fa = r / nr, fb = (r + 1) / nr, ga = q / nc, gb = (q + 1) / nc;
        FK.quad(S, sidePt(lo, hi, i, j, fa, ga, z0, z1), sidePt(lo, hi, i, j, fa, gb, z0, z1),
                   sidePt(lo, hi, i, j, fb, gb, z0, z1), sidePt(lo, hi, i, j, fb, ga, z0, z1), c);
      }
    }
  }
  function sidePt(lo, hi, i, j, f, gq, z0, z1) {
    var ax = lo[i][0] + (hi[i][0] - lo[i][0]) * f, ay = lo[i][1] + (hi[i][1] - lo[i][1]) * f;
    var bx = lo[j][0] + (hi[j][0] - lo[j][0]) * f, by = lo[j][1] + (hi[j][1] - lo[j][1]) * f;
    return [ax + (bx - ax) * gq, ay + (by - ay) * gq, z0 + (z1 - z0) * f];
  }
  /* a plan rectangle x0..x1 with half widths hwA aft and hwF forward and
     chamfered corners (ca aft, cf forward); CCW from above.  Edge k runs
     from point k to k+1: 0 starboard side, 1 starboard-forward corner,
     2 front, 3 port-forward corner, 4 port side, 5 port-aft corner,
     6 after face, 7 starboard-aft corner */
  function chamf2(x0, x1, hwA, hwF, ca, cf) {
    ca = Math.max(ca, 0.04); cf = Math.max(cf, 0.04);
    return [[x0 + ca, -hwA], [x1 - cf, -hwF], [x1, -hwF + cf], [x1, hwF - cf],
            [x1 - cf, hwF], [x0 + ca, hwA], [x0, hwA - ca], [x0, -hwA + ca]];
  }
  /* a superstructure block: base plan at z0, top plan at z1 drawn in by
     the tumblehome tin, the front set back ff and the after face fa */
  function blk(S, x0, x1, z0, z1, o) {
    var lo = chamf2(x0, x1, o.hwA, o.hwF === undefined ? o.hwA : o.hwF, o.ca || 0, o.cf || 0);
    var tin = o.tin === undefined ? (z1 - z0) * 0.12 : o.tin;
    var hi = chamf2(x0 + (o.fa || 0), x1 - (o.ff || 0), o.hwA - tin, (o.hwF === undefined ? o.hwA : o.hwF) - tin,
                    o.caT === undefined ? (o.ca || 0) : o.caT, o.cfT === undefined ? (o.cf || 0) : o.cfT);
    frustum(S, lo, z0, hi, z1, o.noBottom);
    return { lo: lo, hi: hi, z0: z0, z1: z1 };
  }
  /* a point on face k of block B at fraction s along it and height z,
     stood off the face by off along its outward (horizontal) normal */
  function faceAt(B, k, s, z, off) {
    var n = B.lo.length, k1 = (k + 1) % n, f = (z - B.z0) / (B.z1 - B.z0);
    var ax = B.lo[k][0] + (B.hi[k][0] - B.lo[k][0]) * f, ay = B.lo[k][1] + (B.hi[k][1] - B.lo[k][1]) * f;
    var bx = B.lo[k1][0] + (B.hi[k1][0] - B.lo[k1][0]) * f, by = B.lo[k1][1] + (B.hi[k1][1] - B.lo[k1][1]) * f;
    var ex = B.lo[k1][0] - B.lo[k][0], ey = B.lo[k1][1] - B.lo[k][1], L = Math.hypot(ex, ey) || 1;
    off = off || 0;
    return [ax + (bx - ax) * s + ey / L * off, ay + (by - ay) * s - ex / L * off, z];
  }
  function faceLen(B, k) {
    var n = B.lo.length, k1 = (k + 1) % n;
    return Math.hypot(B.lo[k1][0] - B.lo[k][0], B.lo[k1][1] - B.lo[k][1]);
  }
  /* a raised panel on face k: s0..s1 along it, za..zb up it, standing
     off by off, its lower corners rounded with radius rnd (m): the array
     faces, doors, louvres, glazing.  Built in rows and columns no bigger
     than a metre or so, and stood off a little more on a leaning face,
     so that it stays in front of the face it lies on however it is drawn */
  function panel(S, B, k, s0, s1, za, zb, off, rnd, Sside) {
    var L = faceLen(B, k) || 1, r = Math.min(rnd || 0, (zb - za) / 2, (s1 - s0) * L / 2), rs = r / L, i, j;
    var pa = faceAt(B, k, 0.5, B.z0, 0), pb = faceAt(B, k, 0.5, B.z1, 0);
    var lean = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]) / Math.max(0.1, B.z1 - B.z0);
    var nr = Math.max(1, Math.ceil((zb - za) / 0.8)), nc = Math.max(1, Math.ceil((s1 - s0) * L / 1.4));
    var o = off + 0.05 + lean * Math.min(0.4, (zb - za) / (2 * nr));
    function lim(z) {
      if (r <= 0 || z >= za + r) return [s0, s1];
      var dz = Math.min(r, za + r - z), ds = rs * (1 - Math.sqrt(Math.max(0, 1 - (dz / r) * (dz / r))));
      return [s0 + ds, s1 - ds];
    }
    var ref = faceAt(B, k, (s0 + s1) / 2, (za + zb) / 2, -3), zs = [];
    for (i = 0; i <= nr; i++) zs.push(za + (zb - za) * i / nr);
    if (r > 0) { zs = zs.filter(function (z) { return z >= za + r - 1e-6; }); for (i = 3; i >= 0; i--) zs.unshift(za + r * (1 - Math.sin(i / 4 * PI / 2 + PI / 8 * (i === 0 ? 0 : 0)))); zs.sort(function (p, q) { return p - q; }); }
    var rows = zs.map(function (z) { var l = lim(z), row = []; for (j = 0; j <= nc; j++) row.push(faceAt(B, k, l[0] + (l[1] - l[0]) * j / nc, z, o)); return { z: z, l: l, P: row }; });
    for (i = 0; i < rows.length - 1; i++) for (j = 0; j < nc; j++)
      FK.quad(S, rows[i].P[j], rows[i].P[j + 1], rows[i + 1].P[j + 1], rows[i + 1].P[j], ref);
    if (off > 0.035) {
      var SS = Sside || S, cin = faceAt(B, k, (s0 + s1) / 2, (za + zb) / 2, o * 0.5);
      for (i = 0; i < rows.length - 1; i++) [0, nc].forEach(function (jj, e) {
        var a0 = rows[i].P[jj], a1 = rows[i + 1].P[jj];
        var b0 = faceAt(B, k, rows[i].l[e], rows[i].z, 0), b1 = faceAt(B, k, rows[i + 1].l[e], rows[i + 1].z, 0);
        FK.quad(SS, b0, b1, a1, a0, cin);
      });
      [0, rows.length - 1].forEach(function (ii) {
        for (j = 0; j < nc; j++) {
          var R = rows[ii], f0 = R.l[0] + (R.l[1] - R.l[0]) * j / nc, f1 = R.l[0] + (R.l[1] - R.l[0]) * (j + 1) / nc;
          FK.quad(SS, faceAt(B, k, f0, R.z, 0), faceAt(B, k, f1, R.z, 0), R.P[j + 1], R.P[j], cin);
        }
      });
    }
  }
  /* a door on face k at fraction f: its dark frame and the leaf standing
     a little proud of it, a grab bar beside it */
  function door(S, B, k, f, z0, w, h) {
    var L = faceLen(B, k) || 1, dw = (w || 0.9) / L, fr = 0.07 / L;
    panel(S.dark, B, k, f - fr, f + dw + fr, z0, z0 + (h || 1.9) + 0.07, 0.03, 0);
    panel(S.sup, B, k, f, f + dw, z0 + 0.02, z0 + (h || 1.9), 0.13, 0.12);
    FK.tube(S.metal, faceAt(B, k, f + dw + 2 * fr, z0 + 0.9, 0.12), faceAt(B, k, f + dw + 2 * fr, z0 + 1.6, 0.12), 0.025, 0.025, 3, false);
  }
  /* rails along the edge of a roof: the top polygon hi of block B drawn
     in by d, only the edges listed */
  function roofRail(S, B, d, edges, h) {
    var c = [0, 0], n = B.hi.length, i;
    for (i = 0; i < n; i++) { c[0] += B.hi[i][0] / n; c[1] += B.hi[i][1] / n; }
    function pin(p) {
      var dx = c[0] - p[0], dy = c[1] - p[1], L = Math.hypot(dx, dy) || 1;
      return [p[0] + dx / L * d, p[1] + dy / L * d, B.z1];
    }
    edges.forEach(function (k) { FK.rail(S, [pin(B.hi[k]), pin(B.hi[(k + 1) % n])], h || 1.0, 2.0, 0.025); });
  }
  /* One mesh per material: bake every mesh under root into merged geometry */
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      var id = o.material.uuid;
      if (!bins[id]) { bins[id] = { m: o.material, P: [], N: [], U: [] }; order.push(id); }
      var b = bins[id], pa = geo.attributes.position.array, na = geo.attributes.normal.array;
      var ua = geo.attributes.uv ? geo.attributes.uv.array : null, i;
      for (i = 0; i < pa.length; i++) { b.P.push(pa[i]); b.N.push(na[i]); }
      for (i = 0; i < pa.length / 3; i++) b.U.push(ua ? ua[i * 2] : 0, ua ? ua[i * 2 + 1] : 0);
    });
    var out = new THREE.Group();
    order.forEach(function (id) {
      var b = bins[id], g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.P, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.N, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.U, 2));
      var me = new THREE.Mesh(g, b.m); me.castShadow = true; me.receiveShadow = true; out.add(me);
    });
    return out;
  }
  /* bake the ship, then the turret on its own; add the hidden pad marker */
  function finish(THREE, g, tw, pad) {
    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    if (tw) {
      var tb = bake(THREE, tw);
      tw.children.slice().forEach(function (c) { tw.remove(c); });
      tb.children.slice().forEach(function (c) { tw.add(c); });
      root.add(tw);
    }
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(pad[0], pad[1], pad[2]); root.add(hp);
    return root;
  }

  /* ========================================================= THE HULL
     A lofted hull with a knuckle.  H.STA rows [x, keel z on the centre
     line, half beam at the waterline, half beam at the knuckle, half beam
     at the deck edge, bilge fullness]; H.deckZ(x) the deck edge; H.kd(x)
     the knuckle's depth under it; H.bul(x) a bulwark's height over it.
     Between the waterline and the knuckle the side flares out (exponent
     H.fl); above the knuckle it runs straight to the deck edge (drawn in
     where the upper strake leans inboard, as on the 055); below the water
     a superellipse bilge.  Forward of XWL the stem rakes up to the stem
     head XS1; abaft XST the run lifts to the transom XS0.  Each band is
     its own mesh so the knuckle, the deck edge and the boot line stay
     crisp.  H.k scales every x (the 052C is the 052D's hull at 155 m).  */
  function makeHull(H0) {
    var k = H0.k || 1, STA = H0.STA.map(function (r) { return [r[0] * k].concat(r.slice(1)); });
    var XS0 = H0.XS0 * k, XS1 = H0.XS1 * k, XWL = H0.XWL * k, XST = H0.XST * k;
    function deckZ(x) { return H0.deckZ(x / k); }
    function kd(x) { return H0.kd ? H0.kd(x / k) : 0.6; }
    function bul(x) { return H0.bul ? H0.bul(x / k) : 0; }
    function pick(x, c) {
      var i;
      if (x <= STA[0][0]) return STA[0][c];
      for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
        return a[c] + (b[c] - a[c]) * f;
      }
      return STA[STA.length - 1][c];
    }
    function zBot(x) {
      if (x > XWL) return deckZ(XS1) * Math.pow((x - XWL) / (XS1 - XWL), 1.15);
      if (x < XST) return pick(XS0, 1) + (pick(XST, 1) - pick(XS0, 1)) * (x - XS0) / (XST - XS0);
      return pick(x, 1);
    }
    function zKn(x) { var zd = deckZ(x); return Math.max(zd - kd(x), Math.max(zBot(x), 0) + 0.25 * (zd - Math.max(zBot(x), 0))); }
    function top(x) { return deckZ(x) + bul(x); }
    function W(x, z) {
      var zd = deckZ(x), zb = zBot(x), bw = pick(x, 2), bk = pick(x, 3), bd = pick(x, 4), zk = zKn(x);
      if (z <= zb) return 0;
      if (z >= zd) return Math.max(0.05, bd - (z - zd) * 0.08);
      if (z >= zk) return bk + (bd - bk) * (z - zk) / (zd - zk);
      if (x > XWL) return bk * Math.pow(Math.max(0, (z - zb) / (zk - zb)), H0.stemP || 0.62);
      if (z >= 0) return bw + (bk - bw) * Math.pow(z / zk, H0.fl || 1);
      var n = pick(x, 5), t = Math.min(1, z / zb);
      return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    }
    function halfDeck(x) { return W(x, deckZ(x)) - (bul(x) > 0.02 ? 0.2 : 0); }
    function xs() {
      var a = [], x, i, st = 2.0;
      for (x = XS0; x < XS1 - 0.01; x += st) a.push(x);
      for (i = 0; i < STA.length; i++) a.push(STA[i][0]);
      for (x = XWL - 10; x < XS1; x += 0.9) a.push(x);
      for (x = XS0; x < XS0 + 3; x += 1.0) a.push(x);
      (H0.extra || []).forEach(function (v) { a.push(v * k); });
      a.push(XS1, XST, XWL);
      a.sort(function (p, q) { return p - q; });
      return a.filter(function (v, j) { return v >= XS0 && v <= XS1 && (j === 0 || v - a[j - 1] > 0.05); });
    }
    var X = xs();
    /* a band of the shell between zlo(x) and zhi(x), both sides */
    function band(THREE, g, m, zlo, zhi, rows) {
      var pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
      for (s = -1; s <= 1; s += 2) {
        var base = pos.length / 3;
        for (i = 0; i < X.length; i++) {
          var x = X[i], zb = zBot(x), zt = top(x);
          var a0 = Math.min(Math.max(zlo(x), zb), zt), b0 = Math.min(Math.max(zhi(x), zb), zt);
          for (j = 0; j < NR; j++) {
            var z = a0 + (b0 - a0) * j / rows;
            pos.push(x, s * W(x, z), z); uv.push(x / 24, z / 8);
          }
        }
        for (i = 0; i < X.length - 1; i++) for (j = 0; j < rows; j++) {
          var p0 = base + i * NR + j, p1 = p0 + 1, p2 = p0 + NR, p3 = p2 + 1;
          if (s > 0) idx.push(p0, p1, p2, p1, p3, p2); else idx.push(p0, p2, p1, p1, p2, p3);
        }
      }
      var keep = [];
      for (i = 0; i < idx.length; i += 3) {
        var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
        var ux = pos[B] - pos[A], uy = pos[B + 1] - pos[A + 1], uz = pos[B + 2] - pos[A + 2];
        var vx = pos[Cc] - pos[A], vy = pos[Cc + 1] - pos[A + 1], vz = pos[Cc + 2] - pos[A + 2];
        var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
        if (cx * cx + cy * cy + cz * cz > 1e-6) keep.push(idx[i], idx[i + 1], idx[i + 2]);
      }
      if (keep.length) g.add(new THREE.Mesh(geoOf(THREE, pos, uv, keep), m));
    }
    /* the whole shell, the deck, the bulwark's inner face and cap, the transom */
    function build(THREE, g, T, S, BOOT) {
      BOOT = BOOT || 0.35;
      band(THREE, g, T.under, function (x) { return zBot(x); }, function () { return BOOT; }, 4);
      band(THREE, g, T.hull, function () { return BOOT; }, zKn, 3);
      band(THREE, g, T.hull, zKn, deckZ, 2);
      band(THREE, g, T.hull, deckZ, top, 1);
      /* deck */
      var pos = [], uv = [], idx = [], i, j, NC = 6, D = X.filter(function (x) { return x <= XS1 - 0.3; });
      for (i = 0; i < D.length; i++) {
        var x = D[i], w = halfDeck(x), z = deckZ(x);
        for (j = 0; j <= NC; j++) { var y = w * (1 - 2 * j / NC); pos.push(x, y, z); uv.push(x / 8, y / 8); }
      }
      for (i = 0; i < D.length - 1; i++) for (j = 0; j < NC; j++) {
        var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv, idx), T.deck));
      /* the bulwark: inner face and capping */
      for (i = 0; i < X.length - 1; i++) {
        var x0 = X[i], x1 = X[i + 1];
        if (bul(x0) < 0.02 && bul(x1) < 0.02) continue;
        [-1, 1].forEach(function (s) {
          var o0 = [x0, s * W(x0, top(x0)), top(x0)], o1 = [x1, s * W(x1, top(x1)), top(x1)];
          var i0 = [x0, s * halfDeck(x0), top(x0)], i1 = [x1, s * halfDeck(x1), top(x1)];
          var d0 = [x0, s * halfDeck(x0), deckZ(x0)], d1 = [x1, s * halfDeck(x1), deckZ(x1)];
          FK.quad(S.hull, o0, o1, i1, i0, [x0, s * W(x0, top(x0)), top(x0) - 2]);
          FK.quad(S.hull, i0, i1, d1, d0, [x0, s * (halfDeck(x0) + 1), deckZ(x0)]);
        });
      }
      /* transom */
      var zb = zBot(XS0 + 0.001), zt = top(XS0), N = 12, kk;
      for (kk = 0; kk < N; kk++) {
        var za = zb + (zt - zb) * kk / N, zc = zb + (zt - zb) * (kk + 1) / N;
        var wa = W(XS0 + 0.001, za), wc = W(XS0 + 0.001, zc), sk = (za + zc) / 2 < BOOT ? S.under : S.hull;
        FK.quad(sk, [XS0, -wa, za], [XS0, wa, za], [XS0, wc, zc], [XS0, -wc, zc], [XS0 + 3, 0, (za + zc) / 2]);
      }
    }
    /* a point on the shell: x, the side s (+1 port), height z, off outward */
    function onSide(x, s, z, off) {
      var dz = 0.25, w0 = W(x, z - dz), w1 = W(x, z + dz), dw = (w1 - w0) / (2 * dz);
      var L = Math.hypot(1, dw);
      return { p: [x, s * (W(x, z) + (off || 0) / L), z + (off || 0) * -dw / L], n: [0, s / L, -dw / L] };
    }
    /* rails along the deck edge between x0 and x1, both sides */
    function edgeRail(S, x0, x1, h, sides) {
      (sides || [-1, 1]).forEach(function (s) {
        var pts = [], n = Math.max(1, Math.round(Math.abs(x1 - x0) / 4.0)), i;
        for (i = 0; i <= n; i++) {
          var x = x0 + (x1 - x0) * i / n;
          pts.push([x, s * (halfDeck(x) - 0.12), top(x)]);
        }
        FK.rail(S, pts, h || 1.0, 2.0, 0.026);
        FK.toe(S, pts.map(function (p) { return [p[0], p[1], p[2] + 0.06]; }), 0.05);
      });
    }
    return { W: W, zBot: zBot, deckZ: deckZ, top: top, halfDeck: halfDeck, zKn: zKn, pick: pick,
             build: build, onSide: onSide, edgeRail: edgeRail, XS0: XS0, XS1: XS1, XWL: XWL, k: k };
  }

  /* the bow sonar dome: an ellipsoid at the forefoot [C1 bow wave; the
     published bow sonar]; its size is NOT CONFIRMED */
  function sonarDome(THREE, g, m, x, z, rx, ry, rz) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 9), m);
    s.scale.set(rx, ry, rz); s.position.set(x, 0, z); g.add(s);
  }
  /* the anchor pocket: a dark recess on the bow flare with the stockless
     anchor housed in its hawse [D1][D3][P3] */
  function anchorPocket(S, Hh, s, xa, xf, zt, zb) {
    var A = Hh.onSide(xa, s, zt, 0.12).p, B = Hh.onSide(xf, s, zt, 0.12).p, C = Hh.onSide(xa + (xf - xa) * 0.45, s, zb, 0.12).p;
    var ref = [(A[0] + B[0] + C[0]) / 3, 0, (A[2] + B[2] + C[2]) / 3];
    FK.tri(S.dark, A, B, C, ref);
    var hx = xa + (xf - xa) * 0.5, hz = zt - (zt - zb) * 0.3, q = Hh.onSide(hx, s, hz, 0.14);
    FK.anchor(S.metal, q.p[0], q.p[1], q.p[2], q.n, 1.25);
  }
  /* scuttles: small dark discs on the shell */
  function scuttle(S, Hh, x, s, z, r) {
    var q = Hh.onSide(x, s, z, 0.03);
    FK.disc(S.dark, q.p, q.n, r || 0.22, 8);
    FK.tube(S.metal, Hh.onSide(x, s, z + (r || 0.22) + 0.08, 0.02).p, Hh.onSide(x, s, z + (r || 0.22) + 0.08, 0.1).p, 0.03, 0.03, 3, false);
  }

  /* ======================================================== WEAPONS
     Each built at the origin pointing +X into the sinks S (and THREE
     meshes into g where a smooth round shape is wanted), then placed. */

  /* the gun house of a stealth naval gun at rest, origin on its ring at
     the deck: two faceted tiers (the lower with the strong front chamfers,
     the upper drawn in), the gun port, the barrel.  o.L length, o.hw half
     width, o.h height, o.bar barrel beyond the house, o.br bore radius.
     H/PJ-38 130 mm [D1][C1]; H/PJ-87 100 mm [P1][P3]                  */
  function navalGun(THREE, g, S, o) {
    var L = o.L, hw = o.hw, h = o.h, i;
    FK.cylZ(S.sup, -0.15 * L, 0, 0, 0.32, hw * 0.92, 20);
    var lo1 = [[-0.5 * L, -hw], [0.12 * L, -hw], [0.46 * L, -0.42 * hw], [0.46 * L, 0.42 * hw], [0.12 * L, hw], [-0.5 * L, hw], [-0.56 * L, 0.72 * hw], [-0.56 * L, -0.72 * hw]];
    var hi1 = [[-0.5 * L, -0.92 * hw], [0.1 * L, -0.92 * hw], [0.36 * L, -0.4 * hw], [0.36 * L, 0.4 * hw], [0.1 * L, 0.92 * hw], [-0.5 * L, 0.92 * hw], [-0.55 * L, 0.66 * hw], [-0.55 * L, -0.66 * hw]];
    frustum(S.sup, lo1, 0.3, hi1, 0.5 * h);
    var hi2 = [[-0.46 * L, -0.66 * hw], [-0.02 * L, -0.66 * hw], [0.16 * L, -0.3 * hw], [0.16 * L, 0.3 * hw], [-0.02 * L, 0.66 * hw], [-0.46 * L, 0.66 * hw], [-0.52 * L, 0.46 * hw], [-0.52 * L, -0.46 * hw]];
    frustum(S.sup, hi1, 0.5 * h, hi2, h, true);
    /* the gun port: a dark slot up the front facets, the mantlet */
    var zp = 0.5 * h;
    FK.obox(S.dark, [0.39 * L, 0, zp], [Math.cos(0.35), 0, Math.sin(0.35)], [0, 1, 0], [-Math.sin(0.35), 0, Math.cos(0.35)], 0.12, 0.62, 1.2);
    FK.tube(S.sup, [0.36 * L, 0, zp], [0.36 * L + 0.7, 0, zp], 0.42, 0.36, 12, true);
    /* the barrel: the sleeve, the tube, the muzzle */
    var x0 = 0.36 * L + 0.7, br = o.br || 0.1;
    FK.tube(S.metal, [x0, 0, zp], [x0 + 0.9, 0, zp], br * 2.3, br * 2.0, 12, true);
    FK.tube(S.metal, [x0 + 0.9, 0, zp], [x0 + o.bar, 0, zp], br * 1.5, br * 1.15, 12, true);
    FK.tube(S.metal, [x0 + o.bar - 0.35, 0, zp], [x0 + o.bar, 0, zp], br * 1.45, br * 1.45, 12, true);
    /* roof: an access hatch, the ventilators, the lifting eyes; the
       firing-cutout sensor at the back; team strip */
    FK.hatch(S.sup, -0.3 * L, 0.25 * hw, h, 0.9, 0.8, 0);
    FK.mushroom(S.metal, -0.38 * L, -0.35 * hw, h, 0.1, 0.25);
    for (i = -1; i <= 1; i += 2) FK.tube(S.metal, [-0.1 * L, i * 0.5 * hw, h], [-0.1 * L, i * 0.5 * hw, h + 0.12], 0.06, 0.06, 4, true);
    FK.boxZ(S.team, -0.15 * L, 0, h, 1.1, 0.7, 0.03, 0);
    /* side doors on the house (dark panels) and grab rails */
    for (i = -1; i <= 1; i += 2) {
      FK.obox(S.dark, [-0.3 * L, i * 0.97 * hw, 0.3 + 0.24 * h], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.8, 0.04, 0.48 * h);
      FK.tube(S.metal, [-0.42 * L, i * 1.0 * hw, 0.45 * h], [-0.18 * L, i * 1.0 * hw, 0.45 * h], 0.025, 0.025, 3, false);
    }
  }

  /* a gatling CIWS at rest pointing +X: o.k scale, o.type "730" (the
     Type 730 / 1130 family: round base, box housing, EO box on an arm)
     or "pj11" (the H/PJ-11: a taller faceted housing with the radar
     cupola on its back) [D1][C1][P2] */
  function ciws(THREE, g, S, o) {
    var k = o.k || 1;
    FK.cylZ(S.sup, 0, 0, 0, 0.6 * k, 1.25 * k, 16);
    FK.cylZ(S.metal, 0, 0, 0.6 * k, 0.12 * k, 1.05 * k, 16);
    if (o.type === "pj11") {
      var lo = chamf2(-1.5 * k, 1.3 * k, 1.05 * k, 1.05 * k, 0.4 * k, 0.6 * k), hi = chamf2(-1.3 * k, 0.9 * k, 0.8 * k, 0.8 * k, 0.3 * k, 0.45 * k);
      frustum(S.white, lo, 0.72 * k, hi, 2.6 * k);
      frustum(S.white, chamf2(-1.2 * k, 0.1 * k, 0.6 * k, 0.6 * k, 0.25 * k, 0.3 * k), 2.6 * k, chamf2(-1.05 * k, -0.15 * k, 0.45 * k, 0.45 * k, 0.2 * k, 0.2 * k), 3.3 * k, false);
      FK.tube(S.metal, [1.1 * k, 0, 1.5 * k], [3.1 * k, 0, 1.5 * k], 0.3 * k, 0.26 * k, 11, true);
      FK.tube(S.dark, [3.1 * k, 0, 1.5 * k], [3.16 * k, 0, 1.5 * k], 0.24 * k, 0.24 * k, 11, true);
      FK.boxZ(S.white, -0.2 * k, 1.05 * k, 1.6 * k, 0.6 * k, 0.4 * k, 0.5 * k, 0);
      FK.disc(S.dark, [0.11 * k, 1.05 * k, 1.85 * k], [1, 0, 0], 0.13 * k, 8);
    } else {
      var lo2 = chamf2(-1.3 * k, 1.1 * k, 0.95 * k, 0.95 * k, 0.3 * k, 0.5 * k), hi2 = chamf2(-1.2 * k, 0.8 * k, 0.75 * k, 0.75 * k, 0.25 * k, 0.4 * k);
      frustum(S.white, lo2, 0.72 * k, hi2, 2.3 * k);
      FK.tube(S.metal, [0.9 * k, 0, 1.3 * k], [2.9 * k, 0, 1.3 * k], 0.24 * k, 0.2 * k, 7, true);
      FK.tube(S.metal, [2.5 * k, 0, 1.3 * k], [2.9 * k, 0, 1.3 * k], 0.27 * k, 0.27 * k, 7, true);
      FK.tube(S.metal, [-0.2 * k, 0.75 * k, 1.6 * k], [-0.2 * k, 1.1 * k, 1.6 * k], 0.06 * k, 0.06 * k, 4, false);
      FK.boxZ(S.white, -0.2 * k, 1.25 * k, 1.35 * k, 0.55 * k, 0.35 * k, 0.45 * k, 0);
      FK.disc(S.dark, [0.08 * k, 1.25 * k, 1.58 * k], [1, 0, 0], 0.12 * k, 8);
    }
    FK.hatch(S.white, -0.9 * k, 0, (o.type === "pj11" ? 2.6 : 2.3) * k, 0.4 * k, 0.5 * k, 0);
  }

  /* HHQ-10 (FL-3000N) launcher: pedestal, cradle and the 24-cell box,
     cells facing aft as it lies at rest [D1][C1]; the sensor head on top */
  function hhq10(THREE, g, S, k) {
    k = k || 1;
    FK.cylZ(S.sup, 0, 0, 0, 0.45 * k, 1.2 * k, 16);
    FK.cylZ(S.white, 0, 0, 0.45 * k, 0.9 * k, 0.55 * k, 12);
    var i, j;
    for (i = -1; i <= 1; i += 2) FK.boxZ(S.white, 0, i * 1.32 * k, 0.9 * k, 0.6 * k, 0.16 * k, 1.4 * k, 0);
    FK.boxZ(S.white, 0, 0, 1.0 * k, 2.6 * k, 2.4 * k, 1.75 * k, 0);
    FK.boxZ(S.dark, -1.31 * k, 0, 1.1 * k, 0.02 * k, 2.2 * k, 1.55 * k, 0);
    for (i = 0; i < 4; i++) for (j = 0; j < 6; j++)
      FK.disc(S.white, [-1.33 * k, (-0.95 + j * 0.38) * k, (1.3 + i * 0.38) * k], [-1, 0, 0], 0.15 * k, 8);
    FK.cylZ(S.white, 0.7 * k, 0, 2.75 * k, 0.3 * k, 0.32 * k, 10);
    FK.disc(S.dark, [1.03 * k, 0, 2.9 * k], [1, 0, 0], 0.14 * k, 8);
  }

  /* a VLS field: nx cells along X by ny across at pitch px x py, the
     field's after edge at x0, on the deck at z: a dark seam plate, a
     hatch lid per cell with its hinge bar, a coaming, module seams every
     mod cells along [D1][C1] */
  function vlsField(S, x0, nx, ny, px, py, z, mod) {
    var L = nx * px + 0.5, Wd = ny * py + 0.5, i, j, xc = x0 + L / 2 - 0.25, zf = z + 0.16, g = 0.08;
    var ya = -Wd / 2 + 0.25, yb = Wd / 2 - 0.25, up = [xc, 0, zf - 1];
    FK.boxZ(S.metal, xc, 0, z, L + 0.3, Wd + 0.3, 0.12, 0);
    for (i = 0; i < nx; i++) for (j = 0; j < ny; j++) {
      var ax = x0 + i * px, bx = ax + px, ay = ya + j * py, by = ay + py;
      FK.quad(S.dark, [ax, ay, zf], [bx, ay, zf], [bx, by, zf], [ax, by, zf], up);
      FK.quad(S.deck, [ax + g, ay + g, zf + 0.05], [bx - g, ay + g, zf + 0.05], [bx - g, by - g, zf + 0.05], [ax + g, by - g, zf + 0.05], up);
    }
    FK.quad(S.metal, [x0 - 0.25, ya - 0.25, zf], [x0 + nx * px + 0.25, ya - 0.25, zf], [x0 + nx * px + 0.25, ya, zf], [x0 - 0.25, ya, zf], up);
    FK.quad(S.metal, [x0 - 0.25, yb, zf], [x0 + nx * px + 0.25, yb, zf], [x0 + nx * px + 0.25, yb + 0.25, zf], [x0 - 0.25, yb + 0.25, zf], up);
    FK.quad(S.metal, [x0 - 0.25, ya, zf], [x0, ya, zf], [x0, yb, zf], [x0 - 0.25, yb, zf], up);
    FK.quad(S.metal, [x0 + nx * px, ya, zf], [x0 + nx * px + 0.25, ya, zf], [x0 + nx * px + 0.25, yb, zf], [x0 + nx * px, yb, zf], up);
    for (i = 0; i < nx; i++) FK.tube(S.metal, [x0 + (i + 0.18) * px, ya + 0.2, zf + 0.08], [x0 + (i + 0.18) * px, yb - 0.2, zf + 0.08], 0.03, 0.03, 3, false);
    if (mod) for (i = mod; i < nx; i += mod) FK.boxZ(S.metal, x0 + i * px, 0, zf, 0.12, Wd - 0.3, 0.09, 0);
  }
  /* a six-round HHQ-9 revolver hatch (052C): the round plate, the six
     lids on their ring and the centre plug [P2][P3] */
  function revolver(S, x, y, z) {
    var i;
    FK.cylZ(S.metal, x, y, z, 0.1, 1.3, 14);
    FK.disc(S.dark, [x, y, z + 0.11], [0, 0, 1], 1.2, 14);
    for (i = 0; i < 6; i++) {
      var a = i / 6 * PI * 2 + 0.52;
      FK.cylZ(S.deck, x + Math.cos(a) * 0.74, y + Math.sin(a) * 0.74, z + 0.1, 0.07, 0.34, 8);
    }
    FK.cylZ(S.deck, x, y, z + 0.1, 0.06, 0.22, 6);
  }
  /* a YJ-62 twin launcher (052C): two big square canisters on a cradle,
     trained athwartships (s = +1 port) and elevated [P3] */
  function yj62(S, x, y, z, s) {
    var el = 0.3, L = 6.6, c = Math.cos(el), sn = Math.sin(el), i;
    FK.boxZ(S.sup, x, y, z, 2.6, 1.6, 0.9, 0);
    for (i = -1; i <= 1; i += 2) {
      var cx = x + i * 0.62, cy = y + s * (L / 2 - 1.0) * c, cz = z + 1.3 + (L / 2 - 1.0) * sn;
      FK.obox(S.sup, [cx, cy, cz], [0, s * c, sn], [1, 0, 0], [0, -s * sn, c], L, 1.1, 1.0);
      FK.obox(S.dark, [cx, cy + s * (L / 2 + 0.01) * c, cz + (L / 2 + 0.01) * sn], [0, s * c, sn], [1, 0, 0], [0, -s * sn, c], 0.04, 0.9, 0.8);
      FK.tube(S.metal, [cx, y, z + 0.9], [cx, cy - s * 1.0 * c, cz - 1.0 * sn - 0.5], 0.09, 0.09, 4, false);
    }
  }
  /* a white radome on its drum */
  function dome(THREE, g, S, T, x, y, z, r, post) {
    if (post > 0) FK.cylZ(S.sup, x, y, z, post, r * 0.5, 8, r * 0.42);
    FK.cylZ(S.white, x, y, z + post, r * 0.35, r * 0.95, 12);
    sphere(THREE, g, r, T.white, x, y, z + post + r * 0.35, 12, 7, PI / 2);
  }
  /* an EO director: post, yoke, the sensor box with its windows */
  function eo(S, x, y, z) {
    FK.cylZ(S.white, x, y, z, 0.7, 0.18, 8);
    FK.boxZ(S.white, x, y, z + 0.7, 0.5, 0.7, 0.55, 0);
    FK.disc(S.dark, [x + 0.26, y + 0.15, z + 1.0], [1, 0, 0], 0.11, 8);
    FK.disc(S.dark, [x + 0.26, y - 0.15, z + 1.0], [1, 0, 0], 0.08, 8);
  }
  /* the Type 517 long-range air-search Yagi on its tower [D1][P2] */
  function yagi517(S, x, z0, ztow, za, zt) {
    frustum(S.sup, chamf2(x - 1.7, x + 1.7, 1.9, 1.9, 0.3, 0.3), z0, chamf2(x - 0.7, x + 0.7, 0.8, 0.8, 0.2, 0.2), ztow);
    FK.tube(S.metal, [x, 0, ztow], [x, 0, za], 0.16, 0.14, 8, true);
    var i, j, h = zt - za;
    FK.tube(S.metal, [x - 3.6, 0, za], [x + 3.6, 0, za], 0.08, 0.08, 4, true);
    FK.tube(S.metal, [x - 3.6, 0, zt], [x + 3.6, 0, zt], 0.06, 0.06, 4, true);
    for (i = 0; i < 6; i++) {
      var ex = x - 3.0 + i * 1.2;
      FK.tube(S.metal, [ex, 0, za], [ex, 0, zt], 0.04, 0.04, 3, false);
      for (j = 0; j < 4; j++) FK.tube(S.metal, [ex, -0.9, za + h * (j + 0.6) / 4.2], [ex, 0.9, za + h * (j + 0.6) / 4.2], 0.02, 0.02, 3, false);
    }
    FK.rail(S.metal, [[x - 1.5, -1.6, z0 + 0.01], [x + 1.5, -1.6, z0 + 0.01]], 0.9, 1.0, 0.02);
  }
  /* a rigid-hull boat in a side bay: the dark recess, the boat on its
     cradle, the davit arm [D1 the 052D's bays][C1] */
  function boatBay(S, B, k, s0, s1, za, zb, s) {
    panel(S.dark, B, k, s0, s1, za, zb, 0.02, 0.6);
    var a = faceAt(B, k, s0, za, -1.05), b = faceAt(B, k, s1, za, -1.05);
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, Lb = Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.86;
    FK.rib(S.white, S.sup, mx, my, za + 0.25, 0, Lb, 2.3);
    FK.davit(S.metal, mx - Lb * 0.35, my - s * 0.4, zb - 0.6, s > 0 ? PI / 2 : -PI / 2, 0.4, 1.2);
    FK.davit(S.metal, mx + Lb * 0.35, my - s * 0.4, zb - 0.6, s > 0 ? PI / 2 : -PI / 2, 0.4, 1.2);
  }
  /* a row of life-raft canisters along x at (y, z) on a rack */
  function rafts(S, x0, x1, y, z, n) {
    var i;
    FK.boxZ(S.metal, (x0 + x1) / 2, y, z, Math.abs(x1 - x0) + 0.4, 0.9, 0.1, 0);
    for (i = 0; i < n; i++) FK.raft(S.white, S.metal, x0 + (x1 - x0) * (i + 0.5) / n, y, z + 0.1, PI / 2, 1.25, 0.32);
  }
  /* mooring fittings: bollards and fairleads paired down both deck edges */
  function moor(S, Hh, xsB, xsF) {
    xsB.forEach(function (x) { [-1, 1].forEach(function (s) { FK.bollard(S.metal, x, s * (Hh.halfDeck(x) - 1.0), Hh.deckZ(x), 0, 1.15); }); });
    xsF.forEach(function (x) { [-1, 1].forEach(function (s) { FK.fairlead(S.metal, x, s * (Hh.halfDeck(x) - 0.45), Hh.deckZ(x), 0, 1.0); }); });
  }

  /* the face where the main deck steps down to the pad, across the hull
     at x from z0 to z1 (the hangar's door wall below its own block) */
  function stepFace(S, Hh, x, z0, z1, dx) {
    var N = 6, j;
    for (j = 0; j < N; j++) {
      var za = z0 + (z1 - z0) * j / N, zb = z0 + (z1 - z0) * (j + 1) / N;
      var wa = Hh.W(x + 0.35, za) - 0.02, wb = Hh.W(x + 0.35, zb) - 0.02, xx = x - (dx || 0);
      FK.quad(S.sup, [xx, -wa, za], [xx, wa, za], [xx, wb, zb], [xx, -wb, zb], [xx + 3, 0, (za + zb) / 2]);
    }
  }
  /* the pad's painted marks: the touchdown circle (as a ring of short
     flat bars), the centre line, the cross line at xc2 */
  function padMarks(S, xc, z, r, Lc, Wc, xc2) {
    var n = 36, i;
    for (i = 0; i < n; i++) {
      var a0 = i / n * PI * 2, a1 = (i + 1) / n * PI * 2;
      var p0 = [xc + Math.cos(a0) * r, Math.sin(a0) * r], p1 = [xc + Math.cos(a1) * r, Math.sin(a1) * r];
      var q0 = [xc + Math.cos(a0) * (r - 0.25), Math.sin(a0) * (r - 0.25)], q1 = [xc + Math.cos(a1) * (r - 0.25), Math.sin(a1) * (r - 0.25)];
      FK.quad(S.white, [p0[0], p0[1], z + 0.025], [p1[0], p1[1], z + 0.025], [q1[0], q1[1], z + 0.025], [q0[0], q0[1], z + 0.025], [xc, 0, z - 1]);
    }
    FK.boxZ(S.white, xc, 0, z, Lc, 0.18, 0.025, 0);
    FK.boxZ(S.white, xc2, 0, z, 0.18, Wc, 0.025, 0);
  }
  /* below the water: shafts on A-brackets, five-bladed screws, rudders,
     bilge keels.  o.xs screw station, o.y shaft offset, o.z shaft height,
     o.L shaft length, o.rx rudder station, o.keel bilge keel x range */
  function underwater(THREE, g, S, Hh, o) {
    var s, i;
    for (s = -1; s <= 1; s += 2) {
      var y = s * o.y;
      FK.tube(S.metal, [o.xs, y, o.z], [o.xs + o.L, y * 0.55, o.z - 0.6], 0.24, 0.24, 8, true);
      FK.tube(S.metal, [o.xs + 4.0, y, o.z], [o.xs + 4.0, y * 0.6, Hh.zBot(o.xs + 4) + 1.2], 0.12, 0.12, 4, false);
      FK.tube(S.metal, [o.xs + 4.0, y, o.z], [o.xs + 4.0, y * 1.25, Hh.zBot(o.xs + 4) + 1.6], 0.12, 0.12, 4, false);
      FK.tube(S.metal, [o.xs - 0.5, y, o.z], [o.xs + 0.6, y, o.z], 0.38, 0.5, 10, true);
      for (i = 0; i < 5; i++) {
        var a = i / 5 * PI * 2 + 0.3, ca = Math.cos(a), sa = Math.sin(a);
        FK.obox(S.metal, [o.xs, y + ca * 1.15, o.z + sa * 1.15], [0.94, -0.33 * sa, 0.33 * ca], [0, ca, sa], [0, -sa, ca], 0.1, 1.6, 0.9);
      }
      FK.boxZ(S.metal, o.rx, y, o.z - 1.4, 3.2, 0.3, 3.6, 0);
      FK.tube(S.metal, [o.rx, y, o.z + 2.2], [o.rx, y, Hh.zBot(o.rx) + 0.2], 0.16, 0.16, 6, false);
      var bk = [];
      for (i = 0; i <= 8; i++) {
        var xk = o.keel[0] + (o.keel[1] - o.keel[0]) * i / 8, q = Hh.onSide(xk, s, o.kz, 0.0);
        bk.push(q.p);
      }
      for (i = 0; i < bk.length - 1; i++) {
        var A = bk[i], B = bk[i + 1];
        FK.quad(S.under, A, B, [B[0], B[1] + s * 0.55, B[2] - 0.35], [A[0], A[1] + s * 0.55, A[2] - 0.35], [A[0], 0, A[2] + 2]);
        FK.quad(S.under, A, B, [B[0], B[1] + s * 0.55, B[2] - 0.35], [A[0], A[1] + s * 0.55, A[2] - 0.35], [A[0], 0, A[2] - 2]);
      }
    }
  }

  /* ================================================ Type 055 [C1][A1]
     Stations off [C1] (x = -90 + (px - 105) / 8.0) and [A1] (x = 90 -
     (px - 48) / 8.47), heights off [A1] (see the header):
       the pad -90..-63.6 (4.8) with its marks; the hangar -63.6..-43.1
       (10.4), its two doors, the dome on its post at its forward end, the
       HHQ-10 at its after end; the gap -43.1..-28.8 with the after cells on
       the main deck; the step -28.8..-19.4 (9.6) with the boat bays and a
       dome on a post; the funnel block -19.4..7.6 (15.2) with its two black
       uptakes; the forward block 7.6..29.5 (bridge roof 18.4, glazing
       16.8-17.9) and the integrated mast rising out of it, its after face
       from the funnel block's roof; the forward deckhouse 28.4..36.8 (9.6)
       with the H/PJ-11; the forward cells 37.4..55.6; the gun on 59.2 (its
       muzzle at 68.2: [A1] 68.5); the stem at 90 (XWL 83.0: [A1] 82.3),
       its head 8.4 + the bulwark round the bow.
     [C2][A1] show the sides of the hull and of the superstructure as ONE
     flat face from the forward block to the hangar: the superstructure
     stands flush on the hull's knuckled upper strake and leans in with it
     (drawn 7 deg).  Drawn 180.0 m (published), 20.0 m beam at the knuckle
     (published 20), draught 6.6 (published). */
  var H55 = {
    XS0: -90, XS1: 90, XWL: 83.0, XST: -89.0, fl: 1.25, stemP: 0.6, extra: [-63.6, -63.3, 62, 64],
    deckZ: function (x) {
      if (x < -63.6) return 4.8;
      if (x < -63.3) return 4.8 + 2.3 * (x + 63.6) / 0.3;
      return x < 35 ? 7.1 : 7.1 + 1.3 * Math.pow((x - 35) / 55, 1.8);
    },
    kd: function (x) { return x < -63.5 ? 1.0 : 1.7; },
    bul: function (x) { return x < 62 ? 0 : (x < 64 ? 0.35 * (x - 62) / 2 : 0.35 + 0.8 * (x - 64) / 26); },
    STA: [
      [-90.0, -0.60, 7.60, 9.00, 8.80, 3.0],
      [-89.0, -1.40, 7.90, 9.10, 8.90, 3.0],
      [-80.0, -4.00, 8.90, 9.75, 9.55, 3.0],
      [-60.0, -6.20, 9.30, 10.00, 9.78, 3.2],
      [-10.0, -6.60, 9.30, 10.00, 9.78, 3.4],
      [ 15.0, -6.60, 9.30, 10.00, 9.78, 3.2],
      [ 35.0, -6.50, 8.60,  9.80, 9.60, 2.6],
      [ 52.0, -6.20, 6.90,  8.95, 8.80, 2.1],
      [ 66.0, -5.40, 4.60,  7.35, 7.25, 1.8],
      [ 76.0, -4.20, 2.40,  5.60, 5.55, 1.6],
      [ 83.0,  0.00, 0.00,  3.90, 3.90, 1.3],
      [ 87.0,  0.00, 0.00,  2.00, 2.02, 1.2],
      [ 90.0,  0.00, 0.00,  0.15, 0.15, 1.2]
    ]
  };
  function build055(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), S = sinks(), Hh = makeHull(H55), s, i, x;
    var DK = 7.1, PADZ = 4.8, TH = 0.12;          /* TH: the tumblehome, m per m */
    Hh.build(THREE, g, T, S);
    sonarDome(THREE, g, T.under, 79.0, -4.2, 7.0, 1.5, 2.1);
    function hw(x) { return Hh.halfDeck(x) - 0.08; }

    /* ---- the forecastle: bulwark round the bow, rails abaft it, the
       anchor pockets, mooring gear, hatches over the enclosed cable deck */
    Hh.edgeRail(S.metal, 36.0, 62.5, 1.0);
    for (s = -1; s <= 1; s += 2) {
      anchorPocket(S, Hh, s, 75.0, 82.0, 6.9, 3.4);
      FK.fairlead(S.metal, 70.0, s * (Hh.halfDeck(70) - 0.4), Hh.deckZ(70), 0, 1.1);
      FK.fairlead(S.metal, 50.0, s * (Hh.halfDeck(50) - 0.4), Hh.deckZ(50), 0, 1.0);
      [40, 44, 48].forEach(function (xx) { scuttle(S, Hh, xx, s, 5.2, 0.2); });
    }
    moor(S, Hh, [67.0, 46.0], []);
    FK.hatch(S.sup, 78.0, 0, Hh.deckZ(78), 1.6, 1.4, 0);
    FK.hatch(S.sup, 66.0, 1.6, Hh.deckZ(66), 1.2, 1.2, 0);
    FK.mushroom(S.metal, 72.0, -1.8, Hh.deckZ(72), 0.16, 0.5);
    FK.mushroom(S.metal, 72.0, 1.8, Hh.deckZ(72), 0.16, 0.5);
    FK.tube(S.metal, [89.0, 0, Hh.top(89.0)], [89.0, 0, Hh.top(89.0) + 2.6], 0.06, 0.04, 6, false);

    /* ---- the forward cells: 64, sixteen along by four across [C1] */
    vlsField(S, 37.4, 16, 4, 1.12, 1.3, Hh.deckZ(37.4) + 0.02, 4);

    /* ---- the forward deckhouse 28.6..36.8 (9.6) [A1][C1], the H/PJ-11 */
    var FDh = blk(S.sup, 28.4, 36.8, DK - 0.05, 9.6, { hwA: 8.6, hwF: 7.0, ca: 0.3, cf: 3.0, ff: 1.2, tin: 0.4, cfT: 2.6 });
    for (s = -1; s <= 1; s += 2) door(S, FDh, s < 0 ? 0 : 4, 0.3, DK, 0.9, 1.9);
    roofRail(S.metal, FDh, 0.25, [0, 1, 2, 3, 4], 1.0);
    FK.ladder(S.metal, [35.6, -3.2, DK], [34.6, -3.2, 9.6], [0, 1, 0], 0.6, 0.4);
    var cw = new THREE.Group(), Scw = sinks(); cw.position.set(32.4, 0, 9.6);
    ciws(THREE, cw, Scw, { type: "pj11", k: 1.0 }); sinkOut(THREE, cw, Scw, T); g.add(cw);
    Hh.edgeRail(S.metal, 28.8, 36.4, 1.0);

    /* ---- the forward block 7.6..29.5, flush with the hull's upper strake,
       its front sloping back to 25.4 at the bridge roof (18.4) [A1]; the
       bridge glazing 16.8-17.9 round the front */
    var ZB = 18.4;
    var FB = blk(S.sup, 7.6, 29.5, DK - 0.05, ZB, { hwA: hw(7.6), hwF: hw(29.5), ca: 0.4, cf: 4.0, ff: 4.1, fa: 0.0, tin: (ZB - DK) * TH, caT: 0.4, cfT: 2.8 });
    [1, 2, 3].forEach(function (k) {
      var n = k === 2 ? 9 : 4, j;
      for (j = 0; j < n; j++) panel(S.glass, FB, k, 0.04 + j * 0.92 / n, 0.04 + (j + 0.86) * 0.92 / n, 16.8, 17.9, 0.06, 0);
    });
    for (s = -1; s <= 1; s += 2) {
      var kS = s < 0 ? 0 : 4;
      door(S, FB, kS, 0.35, DK, 0.9, 1.9);
      door(S, FB, kS, 0.62, DK, 0.9, 1.9);
      [0.25, 0.36, 0.47].forEach(function (f) { panel(S.dark, FB, kS, f, f + 0.04, 13.4, 14.8, 0.04, 0); });
    }
    roofRail(S.metal, FB, 0.3, [0, 1, 2, 3, 4], 1.0);
    for (s = -1; s <= 1; s += 2) {
      eo(S, 22.0, s * 3.6, ZB);
      FK.whip(S.metal, 19.0, s * 6.0, ZB, 5.0, 0.04);
      FK.cylZ(S.white, 23.4, s * 5.2, ZB, 0.5, 0.35, 8);              /* searchlight */
      FK.tube(S.dark, [23.4, s * 5.2, ZB + 0.75], [23.8, s * 5.2, ZB + 0.75], 0.3, 0.3, 8, true);
    }

    /* ---- the integrated mast [A1][C1]: one tower rising from the funnel
       block's roof (15.2) at its after face and through the bridge roof,
       7.6..17.6 at its foot, 9.8..16.2 at its top (27.2).  On its four
       broad corner faces the Type 346B S-band arrays (18.8-23.6), above
       them on the narrowing corners the X-band arrays (24.2-26.4): their
       heights NOT CONFIRMED (the photographs are too soft to read the
       faces); then the cap, the ESM drum (top 30.4) and the pole (34.0) */
    var MT = blk(S.sup, 7.6, 17.6, 15.15, 27.2, { hwA: 5.0, hwF: 5.0, ca: 3.2, cf: 3.2, fa: 2.2, ff: 1.4, tin: 2.3, caT: 1.1, cfT: 1.1 });
    [1, 3, 5, 7].forEach(function (k) {
      panel(S.sup, MT, k, 0.03, 0.97, 18.6, 23.8, 0.12, 0.5);
      panel(S.array, MT, k, 0.07, 0.93, 18.85, 23.55, 0.3, 0.4);
      panel(S.sup, MT, k, 0.06, 0.94, 24.1, 26.5, 0.1, 0.2);
      panel(S.array, MT, k, 0.12, 0.88, 24.25, 26.35, 0.24, 0.15);
    });
    [2, 6].forEach(function (k) { panel(S.dark, MT, k, 0.3, 0.7, 19.0, 19.8, 0.04, 0); });
    blk(S.sup, 9.4, 16.6, 27.15, 27.6, { hwA: 3.0, ca: 1.2, cf: 1.2, tin: -0.1 });
    FK.rail(S.metal, [[9.5, -2.9, 27.6], [16.5, -2.9, 27.6], [16.5, 2.9, 27.6], [9.5, 2.9, 27.6], [9.5, -2.9, 27.6]], 0.8, 1.6, 0.02);
    FK.cylZ(S.white, 13.0, 0, 27.6, 2.4, 1.15, 14);
    FK.cylZ(S.sup, 13.0, 0, 30.0, 0.4, 1.25, 14);
    FK.tube(S.metal, [13.0, 0, 30.4], [13.0, 0, 34.0], 0.12, 0.05, 6, false);
    FK.tube(S.metal, [13.0, -1.8, 31.6], [13.0, 1.8, 31.6], 0.05, 0.05, 4, true);
    FK.cylZ(S.white, 13.0, 0, 32.6, 0.5, 0.26, 8);
    for (s = -1; s <= 1; s += 2) {
      FK.tube(S.metal, [15.0, 0, 26.0], [15.0, s * 3.8, 26.0], 0.07, 0.05, 4, true);
      FK.cylZ(S.white, 15.0, s * 3.6, 26.05, 0.3, 0.12, 6);
      dome(THREE, g, S, T, 10.6, s * 2.0, 27.6, 0.55, 0.3);
    }
    FK.ladder(S.metal, [8.6, 0, 15.2], [9.6, 0, 27.15], [0, 1, 0], 0.5, 0.4);

    /* ---- the funnel block -19.4..7.6 (15.2) [A1][C1], flush; louvres,
       the two black uptakes, two satcom domes, whips */
    var FN = blk(S.sup, -19.4, 7.6, DK - 0.05, 15.2, { hwA: hw(-19.4), hwF: hw(7.6), ca: 0.6, cf: 0.1, tin: (15.2 - DK) * TH, caT: 0.6, cfT: 0.1 });
    for (s = -1; s <= 1; s += 2) {
      var kF = s < 0 ? 0 : 4;
      [[0.03, 0.17], [0.56, 0.7]].forEach(function (q) { panel(S.dark, FN, kF, q[0], q[1], 11.2, 14.2, 0.1, 0); });
      door(S, FN, kF, 0.3, DK, 0.9, 1.9);
      door(S, FN, kF, 0.82, DK, 0.9, 1.9);
    }
    [[-18.6, -14.6], [-6.4, -2.4]].forEach(function (q) {
      frustum(S.sup, chamf2(q[0], q[1], 2.6, 2.6, 0.4, 0.4), 15.15, chamf2(q[0] + 0.15, q[1] - 0.15, 2.4, 2.4, 0.35, 0.35), 15.9);
      frustum(S.dark, chamf2(q[0] + 0.3, q[1] - 0.3, 2.2, 2.2, 0.3, 0.3), 15.85, chamf2(q[0] + 0.3, q[1] - 0.3, 2.2, 2.2, 0.3, 0.3), 15.95);
      for (i = 1; i < 6; i++) FK.boxZ(S.metal, q[0] + (q[1] - q[0]) * i / 6, 0, 15.9, 0.08, 4.3, 0.1, 0);
    });
    for (s = -1; s <= 1; s += 2) {
      dome(THREE, g, S, T, -10.4, s * 3.0, 15.2, 0.85, 0.4);
      FK.whip(S.metal, -12.5, s * 6.5, 15.2, 6.0, 0.04);
      FK.whip(S.metal, 3.0, s * 6.6, 15.2, 5.0, 0.04);
    }
    roofRail(S.metal, FN, 0.3, [0, 4, 6], 1.0);
    FK.ladder(S.metal, [-19.4, 5.0, DK], [-19.4, 5.0, 9.6], [0, 1, 0], 0.6, 0.4);

    /* ---- the step -28.8..-19.4 (9.6) [A1]: the boat bays in its sides
       (the dark openings of [C1]; the boats in them NOT CONFIRMED), the
       dome on its tall post [C1] */
    var ST = blk(S.sup, -28.8, -19.3, DK - 0.05, 9.6, { hwA: hw(-28.8), hwF: hw(-19.3), ca: 1.2, cf: 0.1, tin: (9.6 - DK) * TH, caT: 1.0, cfT: 0.1 });
    for (s = -1; s <= 1; s += 2) boatBay(S, ST, s < 0 ? 0 : 4, 0.12, 0.9, DK + 0.12, 9.3, s);
    FK.cylZ(S.sup, -26.4, 0, 9.6, 3.0, 0.45, 8, 0.35);
    sphere(THREE, g, 1.1, T.white, -26.4, 0, 13.6, 12, 7);
    roofRail(S.metal, ST, 0.25, [0, 4, 6, 7, 5], 1.0);
    FK.ladder(S.metal, [-28.8, -4.0, DK], [-28.8, -4.0, 9.6], [0, 1, 0], 0.6, 0.4);

    /* ---- the after cells: 48, twelve along by four across, on the main
       deck in the gap -43.1..-28.8; rails at the deck edge [C1] */
    vlsField(S, -42.4, 12, 4, 1.06, 1.3, DK + 0.02, 4);
    Hh.edgeRail(S.metal, -43.0, -28.9, 1.0);
    for (s = -1; s <= 1; s += 2) {
      FK.mushroom(S.metal, -29.8, s * 6.5, DK, 0.18, 0.6);
      FK.goose(S.metal, -42.0, s * 6.8, DK, 0.12, 0.7, 0);
      FK.hatch(S.sup, -35.6, s * 6.6, DK, 1.0, 1.0, 0);
    }

    /* ---- the hangar -63.6..-43.1 (10.4) [A1][C1]: two doors down to the
       pad; on its roof the dome on its post at the front, the HHQ-10 aft */
    var HG = blk(S.sup, -63.6, -43.1, DK - 0.05, 10.4, { hwA: hw(-63.0), hwF: hw(-43.1), ca: 0.3, cf: 1.2, tin: (10.4 - DK) * TH, caT: 0.3, cfT: 0.9 });
    stepFace(S, Hh, -63.6, PADZ - 0.02, DK, 0.0);
    for (s = -1; s <= 1; s += 2) {
      FK.boxZ(S.dark, -63.66, s * 3.7, PADZ, 0.1, 5.6, 5.0, 0);
      for (i = 0; i < 6; i++) FK.boxZ(S.metal, -63.74, s * 3.7, PADZ + 0.45 + i * 0.8, 0.06, 5.5, 0.06, 0);
      door(S, HG, s < 0 ? 0 : 4, 0.85, DK, 0.9, 1.9);
      rafts(S, -55.0, -50.6, s * 7.4, 10.4, 3);
      FK.whip(S.metal, -48.0, s * 7.6, 10.4, 5.0, 0.04);
      dome(THREE, g, S, T, -47.0, s * 4.6, 10.4, 0.7, 0.4);
    }
    FK.cylZ(S.sup, -44.8, 0, 10.4, 3.4, 0.55, 8, 0.4);
    sphere(THREE, g, 1.2, T.white, -44.8, 0, 14.6, 12, 7);
    var hq = new THREE.Group(), Shq = sinks(); hq.position.set(-59.4, 0, 10.4);
    hhq10(THREE, hq, Shq, 1.0); sinkOut(THREE, hq, Shq, T); g.add(hq);
    roofRail(S.metal, HG, 0.25, [0, 4, 6, 2], 1.0);
    FK.ladder(S.metal, [-43.0, -5.5, DK], [-43.4, -5.5, 10.4], [0, 1, 0], 0.6, 0.4);

    /* ---- the pad -90..-63.6 [C1]: the touchdown circle, the lines, the
       rail across the stern, the ensign staff, the stern fittings */
    padMarks(S, -77.0, PADZ, 3.8, 24.0, 12.0, -70.0);
    FK.rail(S.metal, [[-89.6, -(Hh.halfDeck(-89.6) - 0.2), PADZ], [-89.6, Hh.halfDeck(-89.6) - 0.2, PADZ]], 1.0, 1.6, 0.026);
    for (s = -1; s <= 1; s += 2) {
      FK.toe(S.metal, [[-89.5, s * (Hh.halfDeck(-89.5) - 0.1), PADZ + 0.06], [-63.6, s * (Hh.halfDeck(-63.6) - 0.1), PADZ + 0.06]], 0.06);
      FK.bollard(S.metal, -86.5, s * (Hh.halfDeck(-86.5) - 0.8), PADZ, 0, 1.1);
      FK.fairlead(S.metal, -88.8, s * (Hh.halfDeck(-88.8) - 0.35), PADZ, 0, 1.0);
      FK.cleat(S.metal, -66.0, s * (Hh.halfDeck(-66) - 0.5), PADZ, 0, 1.2);
    }
    FK.tube(S.metal, [-89.7, 0, PADZ], [-89.7, 0, PADZ + 3.0], 0.06, 0.04, 6, false);

    /* ---- below the water: two shafts on brackets, two screws, two
       rudders, bilge keels (published: two shafts; the rest NOT CONFIRMED) */
    underwater(THREE, g, S, Hh, { xs: -74.0, y: 3.4, z: -4.6, L: 22, rx: -79.0, keel: [-30, 22], kz: -5.2 });

    /* ---- team colour: strips on the bridge roof, the hangar roof, the pad */
    FK.boxZ(S.team, 21.0, 0, ZB, 2.6, 1.2, 0.03, 0);
    FK.boxZ(S.team, -53.0, 0, 10.4, 2.6, 1.2, 0.03, 0);
    FK.boxZ(S.team, -88.0, 0, PADZ, 1.8, 0.8, 0.03, 0);

    sinkOut(THREE, g, S, T);
    var tw = new THREE.Group(), Stw = sinks(); tw.name = "turret";
    tw.position.set(59.2, 0, Hh.deckZ(59.2));
    navalGun(THREE, tw, Stw, { L: 5.4, hw: 2.0, h: 2.9, bar: 6.4, br: 0.1 });
    sinkOut(THREE, tw, Stw, T);
    return finish(THREE, g, tw, [-77.0, 0, PADZ]);
  }

  /* ========================================= Type 052C / 052D [D1][P1]
     ONE HULL for both sisters, measured off the 052D broadside [D1]
     (x = 78.5 - (px - 38) / 9.6; heights by its near walls, 9.38 px/m,
     the camera 12.4 deg up): stem head 78.5 (9.7), forecastle deck edge
     8.5 at the gun, 8.2 amidships, the anchor pocket 67.7-72.6 (z 3-6),
     the pad 4.8.  The 052C is the same hull drawn at its published 155 m
     (k = 155/157); its pad starts further aft, at -61.5 [P1], which the
     variant's stepX carries.  Beam 17.2 at the knuckle (published 17-18),
     draught 6.0 (published).  The hull side flares straight to a low
     knuckle 0.5 m under the deck edge [P3][P4].
     VARIANTS hold what the references show changed: the gun, the forward
     weapons, the forward deckhouse, the arrays, the mast, the funnel, the
     after weapons and the hangar.  Stations of each are in its own block
     below, in the variant's own length frame. */
  function H52(stepX, bow) {
    return {
      XS0: -78.5, XS1: 78.5, XWL: 72.6, XST: -77.6, fl: 1.2, stemP: 0.6, extra: [stepX, stepX + 0.3, 30, 63, 65],
      deckZ: function (x) {
        if (x < stepX) return 4.8;
        if (x < stepX + 0.3) return 4.8 + 3.4 * (x - stepX) / 0.3;
        return x < 30 ? 8.2 : 8.2 + 1.5 * Math.pow((x - 30) / 48.5, 1.8);
      },
      kd: function (x) { return x < stepX + 0.1 ? 0.4 : 0.5; },
      bul: function (x) { return bow && x > 63 ? Math.min(0.95, 0.25 + 0.7 * (x - 65) / 13.5) * Math.min(1, (x - 63) / 2) : 0; },
      STA: [
        [-78.5, -0.60, 6.60, 7.75, 7.70, 3.0],
        [-77.6, -1.20, 6.80, 7.85, 7.80, 3.0],
        [-70.0, -3.60, 7.60, 8.35, 8.30, 3.0],
        [-50.0, -5.70, 8.05, 8.65, 8.60, 3.2],
        [-10.0, -6.00, 8.10, 8.65, 8.60, 3.4],
        [ 10.0, -6.00, 8.10, 8.65, 8.60, 3.2],
        [ 30.0, -5.90, 7.40, 8.35, 8.30, 2.6],
        [ 45.0, -5.60, 6.00, 7.65, 7.60, 2.1],
        [ 58.0, -5.00, 4.00, 6.35, 6.30, 1.8],
        [ 66.0, -4.00, 2.40, 5.05, 5.00, 1.6],
        [ 72.6,  0.00, 0.00, 3.65, 3.60, 1.3],
        [ 76.0,  0.00, 0.00, 2.05, 2.00, 1.2],
        [ 78.5,  0.00, 0.00, 0.15, 0.15, 1.2]
      ]
    };
  }
  var VARIANTS = {
    /* Type 052D, Guiyang (119) [D1][D3]: drawn 157.0 m */
    "052D": { L: 157.0, stepX: -58.5, bow: true, gun: { x: 50.7, L: 5.2, hw: 2.0, h: 2.7, bar: 6.2, br: 0.1 } },
    /* Type 052C, Lanzhou (170) [P1-P4]: drawn 155.0 m */
    "052C": { L: 155.0, stepX: -61.5 * 157 / 155, bow: false, gun: { x: 44.6, L: 4.4, hw: 1.65, h: 2.4, bar: 4.6, br: 0.08 } }
  };

  function build052(THREE, M, C, key) {
    var V = VARIANTS[key], g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), S = sinks(), s, i, x;
    var H = H52(V.stepX, V.bow); H.k = V.L / 157.0;
    var Hh = makeHull(H), PADZ = 4.8, DK = Hh.deckZ(0), X0 = Hh.XS0, X1 = Hh.XS1, is52D = key === "052D";
    Hh.build(THREE, g, T, S);
    function hw(x, ins) { return Hh.halfDeck(x) - (ins === undefined ? 0.6 : ins); }

    /* ---- forecastle: the anchor pockets [D1][D3][P3], mooring gear, the
       052D's bulwark round the bow [D3] and rails, the jackstaff */
    var ka = Hh.k;
    for (s = -1; s <= 1; s += 2) {
      anchorPocket(S, Hh, s, 67.4 * ka, 72.8 * ka, 7.2, 3.0);
      [34, 38, 42].forEach(function (xx) { scuttle(S, Hh, xx * ka, s, 6.2, 0.2); });
      [-6, -2, 2].forEach(function (xx) { scuttle(S, Hh, xx * ka, s, 6.4, 0.2); });
      FK.fairlead(S.metal, 64.0 * ka, s * (Hh.halfDeck(64 * ka) - 0.4), Hh.deckZ(64 * ka), 0, 1.0);
      FK.fairlead(S.metal, 40.0 * ka, s * (Hh.halfDeck(40 * ka) - 0.4), Hh.deckZ(40 * ka), 0, 1.0);
    }
    moor(S, Hh, [58.0 * ka, 30.5 * ka], []);
    Hh.edgeRail(S.metal, 22.5 * ka, (V.bow ? 64.0 : 77.2) * ka, 1.0);
    FK.hatch(S.sup, 68.0 * ka, 0, Hh.deckZ(68 * ka), 1.4, 1.2, 0);
    FK.hatch(S.sup, 56.0 * ka, 1.4, Hh.deckZ(56 * ka), 1.0, 1.0, 0);
    for (s = -1; s <= 1; s += 2) {
      FK.cylZ(S.metal, 62.0 * ka, s * 1.4, Hh.deckZ(62 * ka), 0.55, 0.45, 10);     /* capstans */
      FK.cylZ(S.metal, 62.0 * ka, s * 1.4, Hh.deckZ(62 * ka) + 0.55, 0.12, 0.55, 10);
      FK.mushroom(S.metal, 60.0 * ka, s * 3.0, Hh.deckZ(60 * ka), 0.15, 0.5);
    }
    FK.tube(S.metal, [X1 - 0.9, 0, Hh.top(X1 - 0.9)], [X1 - 0.9, 0, Hh.top(X1 - 0.9) + 2.4], 0.06, 0.04, 6, false);

    var ZB, BB, cw, Scw;
    if (is52D) {
      /* ================= 052D [D1][D3] (157 m frame) ================= */
      /* forward cells: 32, eight along by four across */
      vlsField(S, 34.3, 8, 4, 1.3, 1.3, Hh.deckZ(34.3) + 0.02, 2);
      /* forward deckhouse 21.8..30.0 (10.8), the Type 730 on it */
      var FD = blk(S.sup, 21.8, 30.0, DK - 0.05, 10.8, { hwA: 6.6, hwF: 6.0, ca: 0.4, cf: 2.4, ff: 0.8, tin: 0.45, cfT: 2.0 });
      roofRail(S.metal, FD, 0.25, [0, 1, 2, 3, 4], 1.0);
      for (s = -1; s <= 1; s += 2) door(S, FD, s < 0 ? 0 : 4, 0.32, DK, 0.9, 1.9);
      cw = new THREE.Group(); Scw = sinks(); cw.position.set(26.6, 0, 10.8);
      ciws(THREE, cw, Scw, { type: "730", k: 0.95 }); sinkOut(THREE, cw, Scw, T); g.add(cw);
      FK.ladder(S.metal, [29.4, -3.0, DK], [28.8, -3.0, 10.8], [0, 1, 0], 0.6, 0.3);

      /* the bridge block: foot 2.6..22.4, roof 17.8, the glazing 16.2-17.1,
         the four Type 346A faces on its corners 9.2-15.6 under the glazing,
         their lower corners rounded [D1][D3] */
      ZB = 17.8;
      BB = blk(S.sup, 2.6, 22.4, DK - 0.05, ZB, { hwA: hw(2.6), hwF: hw(22.4), ca: 3.0, cf: 3.6, ff: 1.9, fa: 0.6, tin: 1.5, caT: 2.4, cfT: 2.6 });
      [1, 2, 3].forEach(function (k) {
        var n = k === 2 ? 7 : 3, j;
        for (j = 0; j < n; j++) panel(S.glass, BB, k, 0.04 + j * 0.92 / n, 0.04 + (j + 0.86) * 0.92 / n, 16.2, 17.1, 0.06, 0);
      });
      [0, 4].forEach(function (k) { panel(S.glass, BB, k, k === 0 ? 0.8 : 0.04, k === 0 ? 0.96 : 0.2, 16.2, 17.1, 0.06, 0); });
      [1, 3, 5, 7].forEach(function (k) {
        panel(S.sup, BB, k, 0.03, 0.97, 8.95, 15.85, 0.09, 1.3);
        panel(S.array, BB, k, 0.07, 0.93, 9.2, 15.6, 0.32, 1.1);
      });
      roofRail(S.metal, BB, 0.3, [0, 1, 2, 3, 4], 1.0);
      for (s = -1; s <= 1; s += 2) {
        [0.15, 0.6].forEach(function (f) { door(S, BB, s < 0 ? 0 : 4, f, DK, 0.9, 1.9); });
      }
      dome(THREE, g, S, T, 14.8, 0, ZB, 1.6, 0.4);
      for (s = -1; s <= 1; s += 2) {
        eo(S, 18.6, s * 3.4, ZB);
        FK.whip(S.metal, 19.4, s * 1.6, ZB, 4.6, 0.04);
        FK.whip(S.metal, 4.0, s * 5.2, ZB, 5.0, 0.04);
      }
      /* the mast: its block 4.0..11.6 (20.7), the stepped pyramid to 26.6,
         the dome (centre 27.8), the yards, the pole to 34.8 [D1] */
      var MB = blk(S.sup, 4.0, 11.6, ZB - 0.05, 20.7, { hwA: 5.4, ca: 1.0, cf: 1.4, tin: 0.6, caT: 0.8, cfT: 1.1 });
      for (s = -1; s <= 1; s += 2) panel(S.dark, MB, s < 0 ? 0 : 4, 0.3, 0.7, 18.6, 19.8, 0.04, 0);
      roofRail(S.metal, MB, 0.2, [0, 2, 4, 6], 0.9);
      blk(S.sup, 3.3, 8.0, 20.65, 23.6, { hwA: 2.6, ca: 0.6, cf: 0.6, fa: 0.4, ff: 0.4, tin: 0.6 });
      blk(S.metal, 3.0, 8.4, 23.6, 23.8, { hwA: 2.4, ca: 0.4, cf: 0.4, tin: 0 });
      FK.rail(S.metal, [[3.1, -2.3, 23.8], [8.3, -2.3, 23.8], [8.3, 2.3, 23.8], [3.1, 2.3, 23.8], [3.1, -2.3, 23.8]], 0.8, 1.0, 0.02);
      blk(S.sup, 3.8, 7.6, 23.75, 26.6, { hwA: 1.9, ca: 0.5, cf: 0.5, fa: 0.6, ff: 0.5, tin: 0.8 });
      FK.cylZ(S.sup, 5.7, 0, 26.6, 0.6, 0.9, 12, 0.8);
      sphere(THREE, g, 1.55, T.white, 5.7, 0, 27.8, 14, 9);
      FK.tube(S.metal, [6.2, -2.7, 23.2], [6.2, 2.7, 23.2], 0.08, 0.08, 4, true);
      FK.tube(S.metal, [6.0, -1.9, 25.0], [6.0, 1.9, 25.0], 0.07, 0.07, 4, true);
      FK.tube(S.metal, [3.6, 0, 22.0], [3.6, 0, 34.8], 0.12, 0.06, 6, false);
      FK.tube(S.metal, [3.6, -1.1, 33.4], [3.6, 1.1, 33.4], 0.05, 0.05, 4, true);
      FK.cylZ(S.white, 3.6, 0, 31.1, 0.6, 0.3, 8);
      for (s = -1; s <= 1; s += 2) dome(THREE, g, S, T, 10.0, s * 2.8, 20.7, 0.45, 0.6);
      /* the low box abaft the block -5.8..2.8 (14.1) */
      var LB = blk(S.sup, -5.8, 2.8, DK - 0.05, 14.1, { hwA: 5.0, ca: 0.6, cf: 0.6, tin: 0.6 });
      roofRail(S.metal, LB, 0.2, [0, 4, 6], 0.9);
      /* the funnel -15.5..-5.8 (14.7): louvres, the black uptake to 16.5 */
      var FN = blk(S.sup, -15.5, -5.8, DK - 0.05, 14.7, { hwA: 4.6, ca: 0.6, cf: 0.8, tin: 0.8, caT: 0.5, cfT: 0.6 });
      for (s = -1; s <= 1; s += 2) [0.1, 0.55].forEach(function (f) { panel(S.dark, FN, s < 0 ? 0 : 4, f, f + 0.32, 11.3, 14.1, 0.1, 0); });
      frustum(S.dark, chamf2(-10.3, -7.1, 1.8, 1.8, 0.3, 0.3), 14.65, chamf2(-10.2, -7.2, 1.6, 1.6, 0.3, 0.3), 16.5);
      FK.boxZ(S.metal, -8.7, 0, 16.5, 3.0, 3.1, 0.08, 0);
      /* the 01 casing amidships -33.0..-15.4 (9.8): doors, rafts */
      var CS = blk(S.sup, -33.0, -15.3, DK - 0.05, 9.8, { hwA: hw(-33.0, 0.8), ca: 0.8, cf: 0.4, tin: 0.25 });
      for (s = -1; s <= 1; s += 2) {
        [0.12, 0.6].forEach(function (f) { door(S, CS, s < 0 ? 0 : 4, f, DK, 0.9, 1.5); });
        dome(THREE, g, S, T, -20.4, s * 3.0, 9.8, 1.15, 0.6);
        dome(THREE, g, S, T, -30.4, s * 2.5, 9.8, 0.7, 0.9);
        rafts(S, -32.4, -28.0, s * 6.6, 9.8, 3);
      }
      roofRail(S.metal, CS, 0.25, [0, 4, 6], 1.0);
      yagi517(S, -25.9, 9.75, 14.4, 15.6, 19.2);
      FK.tube(S.metal, [-32.3, 0, 9.8], [-32.3, 0, 12.7], 0.06, 0.04, 4, false);
      /* after cells: 32, four along by eight across, on the main deck */
      vlsField(S, -39.9, 4, 8, 1.3, 1.3, DK + 0.02, 0);
      Hh.edgeRail(S.metal, -40.4, -33.1, 1.0);
      /* the hangar -58.2..-40.5 (13.4), flush with the hull [D1]: the door,
         the HHQ-10, the recess with the decoy launchers along its sides,
         the boat bays under it in the hull side [D1] */
      var HG = blk(S.sup, -58.2, -40.5, DK - 0.05, 13.4, { hwA: hw(-58.0, 0.06), hwF: hw(-40.5, 0.06), ca: 0.3, cf: 1.0, tin: 0.65, caT: 0.3, cfT: 0.8 });
      stepFace(S, Hh, -58.5, PADZ - 0.02, DK, 0.0);
      FK.boxZ(S.dark, -58.56, 0, PADZ, 0.1, 5.4, 5.4, 0);
      for (i = 0; i < 6; i++) FK.boxZ(S.metal, -58.64, 0, PADZ + 0.5 + i * 0.85, 0.06, 5.3, 0.06, 0);
      for (s = -1; s <= 1; s += 2) {
        var kH = s < 0 ? 0 : 4;
        panel(S.dark, HG, kH, 0.08, 0.92, 9.3, 10.3, 0.1, 0);
        [-47.4, -51.8].forEach(function (dx) {
          var p = faceAt(HG, kH, (dx + 58.2) / 17.7, 9.3, -0.2);
          FK.boxZ(S.white, p[0], p[1], 9.3, 1.6, 0.9, 1.0, 0);
          FK.disc(S.dark, [p[0] + 0.81, p[1], 9.8], [1, 0, 0], 0.32, 8);
        });
        var bp = Hh.onSide(-51.8, s, 6.3, 0.05), ba = Hh.onSide(-55.6, s, 4.9, 0.05), bf = Hh.onSide(-48.0, s, 7.9, 0.05);
        FK.quad(S.dark, [ba.p[0], ba.p[1], ba.p[2]], [bf.p[0], ba.p[1], ba.p[2]], [bf.p[0], bf.p[1], bf.p[2]], [ba.p[0], bf.p[1], bf.p[2]], [bp.p[0], 0, bp.p[2]]);
        FK.rib(S.white, S.sup, -51.8, s * (Hh.W(-51.8, 5.4) - 0.7), 4.95, 0, 6.4, 2.2);
        FK.davit(S.metal, -54.2, s * (Hh.W(-54.2, 7.8) - 1.1), 7.4, s > 0 ? PI / 2 : -PI / 2, 0.3, 0.6);
        FK.davit(S.metal, -49.4, s * (Hh.W(-49.4, 7.8) - 1.1), 7.4, s > 0 ? PI / 2 : -PI / 2, 0.3, 0.6);
        FK.whip(S.metal, -41.5, s * 7.0, 13.4, 5.0, 0.04);
      }
      var hq = new THREE.Group(), Shq = sinks(); hq.position.set(-44.0, 0, 13.4);
      hhq10(THREE, hq, Shq, 0.85); sinkOut(THREE, hq, Shq, T); g.add(hq);
      roofRail(S.metal, HG, 0.25, [0, 4, 6, 2], 1.0);
      FK.ladder(S.metal, [-40.4, -5.6, DK], [-40.8, -5.6, 13.4], [0, 1, 0], 0.6, 0.3);
      /* the pad [D1] */
      padMarks(S, -68.5, PADZ, 3.4, 18.0, 13.0, -60.6);
    } else {
      /* ================= 052C [P1-P4] (155 m frame) ================== */
      /* six HHQ-9 revolvers forward, two rows of three (their layout NOT
         CONFIRMED in plan) */
      [30.6, 33.6, 36.6].forEach(function (xx) { for (s = -1; s <= 1; s += 2) revolver(S, xx, s * 1.55, Hh.deckZ(xx) + 0.01); });
      /* the 01 deckhouse 19.7..28.7 (11.8) and the Type 730 on its raised
         platform 21.3..25.3 (top 15.7) [P1][P2] */
      var FD2 = blk(S.sup, 19.5, 28.7, DK - 0.05, 11.8, { hwA: 6.6, hwF: 5.4, ca: 0.4, cf: 2.6, ff: 0.6, tin: 0.45, cfT: 2.2 });
      roofRail(S.metal, FD2, 0.25, [0, 1, 2, 3, 4], 1.0);
      for (s = -1; s <= 1; s += 2) door(S, FD2, s < 0 ? 0 : 4, 0.25, DK, 0.9, 1.9);
      blk(S.sup, 21.3, 25.3, 11.75, 13.4, { hwA: 1.7, ca: 0.4, cf: 0.4, tin: 0.15 });
      cw = new THREE.Group(); Scw = sinks(); cw.position.set(23.3, 0, 13.4);
      ciws(THREE, cw, Scw, { type: "730", k: 0.95 }); sinkOut(THREE, cw, Scw, T); g.add(cw);
      FK.ladder(S.metal, [28.2, -2.6, DK], [27.6, -2.6, 11.8], [0, 1, 0], 0.6, 0.3);
      /* the bridge block -3.4..19.7 (18.5): the glazing 17.0-17.8, the four
         Type 346 faces 11.3-16.4 on its corners, their lower ends rounded
         [P1][P2][P3] */
      ZB = 18.5;
      BB = blk(S.sup, -3.4, 19.7, DK - 0.05, ZB, { hwA: hw(-3.4, 0.5), hwF: hw(19.7, 0.5), ca: 3.2, cf: 5.0, ff: 1.6, fa: 0.4, tin: 1.4, caT: 2.6, cfT: 4.2 });
      [1, 2, 3].forEach(function (k) {
        var n = k === 2 ? 6 : 4, j;
        for (j = 0; j < n; j++) panel(S.glass, BB, k, 0.05 + j * 0.9 / n, 0.05 + (j + 0.84) * 0.9 / n, 17.0, 17.8, 0.06, 0);
      });
      [1, 3, 5, 7].forEach(function (k) {
        panel(S.sup, BB, k, 0.06, 0.94, 11.05, 16.6, 0.09, 1.9);
        panel(S.array, BB, k, 0.1, 0.9, 11.3, 16.4, 0.32, 1.7);
      });
      roofRail(S.metal, BB, 0.3, [0, 1, 2, 3, 4], 1.0);
      for (s = -1; s <= 1; s += 2) {
        [0.12, 0.42].forEach(function (f) { door(S, BB, s < 0 ? 0 : 4, f, DK, 0.9, 1.9); });
        eo(S, 16.2, s * 3.6, ZB);
        FK.whip(S.metal, 0.0, s * 5.0, ZB, 5.0, 0.04);
      }
      /* the roof dome 8.2..11.9 (top 22.0) and the mast tower -2.3..5.2
         with its yards, platform domes, the top dome (top 30.2) and the
         pole to 35.8 [P1][P2][P3] */
      dome(THREE, g, S, T, 10.05, 0, ZB, 1.85, 1.0);
      blk(S.sup, -2.3, 5.2, ZB - 0.05, 22.6, { hwA: 2.8, ca: 0.8, cf: 0.8, fa: 0.4, ff: 0.6, tin: 0.6 });
      blk(S.metal, -2.4, 5.4, 22.6, 22.8, { hwA: 2.6, ca: 0.6, cf: 0.6, tin: 0 });
      FK.rail(S.metal, [[-2.3, -2.5, 22.8], [5.3, -2.5, 22.8], [5.3, 2.5, 22.8], [-2.3, 2.5, 22.8], [-2.3, -2.5, 22.8]], 0.8, 1.0, 0.02);
      blk(S.sup, -1.4, 4.6, 22.75, 26.9, { hwA: 1.7, ca: 0.4, cf: 0.4, fa: 1.0, ff: 0.8, tin: 0.6 });
      FK.cylZ(S.sup, 2.55, 0, 26.9, 0.5, 0.9, 12, 0.8);
      sphere(THREE, g, 1.65, T.white, 2.55, 0, 28.55, 14, 9);
      FK.tube(S.metal, [2.6, -3.5, 25.6], [2.6, 3.5, 25.6], 0.08, 0.08, 4, true);
      FK.tube(S.metal, [2.4, -2.4, 24.4], [2.4, 2.4, 24.4], 0.06, 0.06, 4, true);
      FK.tube(S.metal, [0.2, 0, 23.0], [0.2, 0, 35.8], 0.12, 0.06, 6, false);
      FK.tube(S.metal, [0.2, -1.2, 33.8], [0.2, 1.2, 33.8], 0.05, 0.05, 4, true);
      for (s = -1; s <= 1; s += 2) {
        dome(THREE, g, S, T, 4.2, s * 2.0, 22.8, 0.5, 0.4);
        FK.cylZ(S.white, 2.6, s * 3.3, 25.65, 0.4, 0.12, 6);
      }
      /* the funnel -15.7..-7.3 (14.4), its black oval uptake (17.0) */
      var FN2 = blk(S.sup, -15.7, -7.3, DK - 0.05, 14.4, { hwA: 4.8, ca: 0.6, cf: 1.4, tin: 0.6, caT: 0.5, cfT: 1.1 });
      for (s = -1; s <= 1; s += 2) panel(S.dark, FN2, s < 0 ? 0 : 4, 0.45, 0.85, 11.4, 13.8, 0.1, 0);
      var ov = [], ovt = [];
      for (i = 0; i < 14; i++) { var a = i / 14 * PI * 2; ov.push([-11.15 + Math.cos(a) * 2.95, Math.sin(a) * 2.2]); ovt.push([-11.15 + Math.cos(a) * 2.85, Math.sin(a) * 2.1]); }
      frustum(S.dark, ov, 14.35, ovt, 17.0);
      /* the 01 casing -34.3..-3.4 (10.2), the domes -24.55 (centre 11.7),
         the Type 517 tower -29.2..-33.9 (14.3) and its Yagi 14.1-18.9 */
      var CS2 = blk(S.sup, -34.3, -3.3, DK - 0.05, 10.2, { hwA: hw(-34.3, 0.9), ca: 0.8, cf: 0.3, tin: 0.25 });
      for (s = -1; s <= 1; s += 2) {
        [0.08, 0.3].forEach(function (f) { door(S, CS2, s < 0 ? 0 : 4, f, DK, 0.9, 1.8); });
        boatBay(S, CS2, s < 0 ? 0 : 4, 0.52, 0.76, DK + 0.15, 10.0, s);
        dome(THREE, g, S, T, -24.55, s * 3.2, 10.2, 1.35, 0.15);
        rafts(S, -33.6, -29.6, s * 6.2, 10.2, 3);
      }
      roofRail(S.metal, CS2, 0.25, [0, 4, 6], 1.0);
      yagi517(S, -31.55, 10.15, 12.9, 14.1, 18.9);
      /* the YJ-62 launchers, two a side, trained athwartships, and the two
         after HHQ-9 revolvers between them (NOT CONFIRMED in plan) [P3] */
      [-37.4, -43.4].forEach(function (xx) {
        for (s = -1; s <= 1; s += 2) yj62(S, xx, s * 2.4, DK, s);
        revolver(S, xx, 0, DK + 0.01);
      });
      Hh.edgeRail(S.metal, -45.9, -34.4, 1.0);
      /* the hangar -61.5..-45.9 (11.6), flush [P1]: the door, the Type 730
         on its pedestal -48.9..-51.9 (top 15.3), domes */
      var HG2 = blk(S.sup, -61.5, -45.9, DK - 0.05, 11.6, { hwA: hw(-61.3, 0.06), hwF: hw(-45.9, 0.06), ca: 0.3, cf: 0.8, tin: 0.4, caT: 0.3, cfT: 0.7 });
      stepFace(S, Hh, -61.5, PADZ - 0.02, DK, 0.0);
      FK.boxZ(S.dark, -61.56, 0, PADZ, 0.1, 5.2, 5.4, 0);
      for (i = 0; i < 6; i++) FK.boxZ(S.metal, -61.64, 0, PADZ + 0.5 + i * 0.85, 0.06, 5.1, 0.06, 0);
      blk(S.sup, -52.0, -48.8, 11.55, 13.0, { hwA: 1.7, ca: 0.4, cf: 0.4, tin: 0.15 });
      cw = new THREE.Group(); Scw = sinks(); cw.position.set(-50.4, 0, 13.0); cw.rotation.z = PI;
      ciws(THREE, cw, Scw, { type: "730", k: 0.95 }); sinkOut(THREE, cw, Scw, T); g.add(cw);
      for (s = -1; s <= 1; s += 2) {
        dome(THREE, g, S, T, -56.5, s * 4.0, 11.6, 0.8, 0.5);
        door(S, HG2, s < 0 ? 0 : 4, 0.85, DK, 0.9, 1.9);
        FK.whip(S.metal, -47.0, s * 6.6, 11.6, 5.0, 0.04);
      }
      roofRail(S.metal, HG2, 0.25, [0, 4, 6], 1.0);
      FK.ladder(S.metal, [-45.8, -5.0, DK], [-46.1, -5.0, 11.6], [0, 1, 0], 0.6, 0.3);
      padMarks(S, -69.5, PADZ, 3.2, 14.0, 12.0, -63.6);
    }

    /* ---- the pad's stern fittings, rails across the stern */
    FK.rail(S.metal, [[X0 + 0.4, -(Hh.halfDeck(X0 + 0.4) - 0.2), PADZ], [X0 + 0.4, Hh.halfDeck(X0 + 0.4) - 0.2, PADZ]], 1.0, 1.6, 0.026);
    for (s = -1; s <= 1; s += 2) {
      FK.toe(S.metal, [[X0 + 0.5, s * (Hh.halfDeck(X0 + 0.5) - 0.1), PADZ + 0.06], [V.stepX * Hh.k - 0.2, s * (Hh.halfDeck(V.stepX * Hh.k - 0.2) - 0.1), PADZ + 0.06]], 0.06);
      FK.bollard(S.metal, X0 + 3.0, s * (Hh.halfDeck(X0 + 3) - 0.8), PADZ, 0, 1.0);
      FK.fairlead(S.metal, X0 + 1.0, s * (Hh.halfDeck(X0 + 1) - 0.35), PADZ, 0, 0.9);
    }
    FK.tube(S.metal, [X0 + 0.25, 0, PADZ], [X0 + 0.25, 0, PADZ + 2.8], 0.06, 0.04, 6, false);

    /* ---- below the water (published: two shafts; the rest NOT CONFIRMED) */
    underwater(THREE, g, S, Hh, { xs: -67.4 * Hh.k, y: 3.2, z: -4.4, L: 18, rx: -71.0 * Hh.k, keel: [-28 * Hh.k, 20 * Hh.k], kz: -4.6 });

    /* ---- team colour: strips on the bridge roof, the hangar roof, the pad */
    FK.boxZ(S.team, is52D ? 7.0 : 6.0, 0, is52D ? 20.7 : ZB, 2.4, 1.0, 0.03, 0);
    FK.boxZ(S.team, is52D ? -50.0 : -57.0, 0, is52D ? 13.4 : 11.6, 2.4, 1.0, 0.03, 0);
    FK.boxZ(S.team, X0 + 2.0, 0, PADZ, 1.6, 0.8, 0.03, 0);

    sinkOut(THREE, g, S, T);
    var tw = new THREE.Group(), Stw = sinks(); tw.name = "turret";
    tw.position.set(V.gun.x, 0, Hh.deckZ(V.gun.x));
    navalGun(THREE, tw, Stw, V.gun);
    sinkOut(THREE, tw, Stw, T);
    var padX = is52D ? -68.5 : -69.5;
    return finish(THREE, g, tw, [padX, 0, PADZ]);
  }

  return { build055: build055, build052: build052, VARIANTS: VARIANTS };
})();

/* Registration: len is each ship's drawn overall length.  These keys are
   also registered by js/hero/pla_navy_modern.js (cruiser_c, destroyer_c)
   and js/hero/pla_e00_destroyer.js (pla_e00_destroyer); this file loads
   after both and replaces them. */
UNIT_MODELS["cruiser_c"] = {
  len: 180.0,
  build: function (THREE, M, C) { return HeroPLADestroyersRedo.build055(THREE, M, C); }
};
UNIT_MODELS["destroyer_c"] = {
  len: 157.0,
  build: function (THREE, M, C) { return HeroPLADestroyersRedo.build052(THREE, M, C, "052D"); }
};
UNIT_MODELS["pla_e00_destroyer"] = {
  len: 155.0,
  build: function (THREE, M, C) { return HeroPLADestroyersRedo.build052(THREE, M, C, "052C"); }
};
