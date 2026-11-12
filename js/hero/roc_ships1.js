/* ==================== js/hero/roc_ships1.js =============================
   HERO MODELS -- Republic of China Navy destroyers and escorts, four builds
   for five rows:

     roc_e50_destroyer  Tan Yang (DD-12), the ex-IJN Yukikaze, a Kagero class
                        destroyer, drawn as the ROC rearmed her in 1956.
     roc_e50_corvette   the PCE-842 class patrol craft escort (one builder,
     roc_e60_corvette   both eras: the references show no difference).
     roc_e90_destroyer  Cheng Kung class (PFG-1101), the licence-built long
                        hull Oliver Hazard Perry: HeroPerryFFG (us_perry_ffg.js)
                        is CALLED for the ship and only the ROC additions are
                        drawn here.
     roc_e00_destroyer  Kee Lung class (DDG-1801), the ex-USN Kidd: the hull,
                        weather deck and forward 5-inch mount come from
                        HeroSpruanceDD (us_spruance_dd.js), called; the Kidd
                        topsides are drawn here (see KEE LUNG below for why).

   Load order: after js/hero/us_perry_ffg.js and js/hero/us_spruance_dd.js.

   Model space for all four: +X bow, +Y port, +Z up, metres, WATERLINE at
   z = 0. Kit (geoOf, box, cyl*, strut, hexa, polyPrism, ringLoft, bake,
   dish, funnel, latticeMast, boat) copied from js/hero/ru_riga.js. Every
   static part is baked to one mesh per material; the first gun of each row
   is the group named "turret", origin on its ring, barrel along +X.
   Paint is plain grey, no hull numbers, names or flags; C.team in small
   roof strips only. ASCII only.

   ------------------------------------------------------------------------
   TAN YANG (roc_e50_destroyer)
   Published: 118.5 m overall, 10.8 m beam, 3.76 m draught (en.wikipedia
   "Japanese destroyer Yukikaze (1939)", Chesneau). Her ROC record, same
   article: unarmed training ship to 1952; 1953 twin Japanese 12.7 cm and
   10 cm mounts; "In 1956, Dan Yang had all the Japanese armaments removed
   and replaced with three open air mounted 5"/38 caliber guns, 3"/50
   caliber guns replaced the torpedo tubes, Bofors 40 mm guns, and newer
   depth charge launchers." The row is e50; she is drawn in that 1956 fit.
   References:
     [K1] Commons "Kagero class destroyer outline and drawing.png" (2400 px
          wide, the wartime ship, profile and plan). Hull 2160 px = 118.5 m
          (18.23 px/m), waterline row 613, keel row 678 (3.6 m). Read off
          it, x from amidships (+ forward): stem head 59.25 at 6.25 m, stem
          at the waterline 56.5, forefoot reaching the keel at about 52.5;
          main deck 2.75 m from the stern to the forecastle break at 22.4,
          forecastle deck 4.25 m at 23.4 rising to 6.25 m at the stem; the
          plan's half breadths (scaled to the published 10.8 m beam); the
          keel rising aft of -40 to the stern at about the waterline; A
          mount 38.5; bridge 24.2-30.0, pilot house roof 10.7 m, director
          12.2 m; foremast 20.2 (22 m); forward funnel 12.3-16.6 (top 11.6
          m), after funnel -4.2 to 0.1 (10.6 m), both raked aft; torpedo
          tube positions 5.5 and -13.0; the AA platform between the funnels
          with tubs each side at 0.7; boats at -4.9 on the deck edges;
          after deckhouse -31.5 to -17.8 (5.3 m), X mount -27.2 on it,
          mainmast -20.6 (14.9 m), Y mount -35.9.
     [P1] Commons "ROCS Dan Yang (DD-12).jpg" (her port side, bow left, in
          ROC service with the US guns): a shielded open single gun on the
          forecastle; a tub with a gun before the bridge; the tripod
          foremast with a small antenna at its head; two funnels with caps,
          a gun platform at the second; a gun where each torpedo mount was;
          the after deckhouse with a shielded mount on it, a thin mainmast,
          a shielded mount on the quarterdeck, gear crowding the stern.
     [P2] Commons "ROCS Dan Yang (DD-12) (1).jpg" (starboard bow, the 1953
          fit with the twin Japanese mounts): the hull, the bridge front
          and the scuttles; used for the hull only.
   RECOGNITION: the long 9:1 Japanese hull with the raised forecastle and
   its break abaft the bridge [K1][P2]; three single 5"/38 in open shields,
   one forward, X raised on the after deckhouse, Y on the quarterdeck [P1];
   two raked funnels, the first the fatter [K1][P1]; the tripod foremast
   [P1]; 3"/50 singles in the torpedo positions [P1, text]; 40 mm in the
   tubs [P1, text]; depth-charge gear aft [P1, text].
   NOT CONFIRMED: the mount types in the tubs (drawn as Bofors, from the
   text; twin in the bridge tub, single in the funnel tubs); the 3"/50 drawn
   as single open Mk 22 type (the photograph does not resolve twin or
   single); the foremast radar (a small bedspring, type unknown); the
   shield shapes (sized to the US Mk 30 practice, not measured); the
   depth-charge gear (two stern racks and two throwers, positions
   estimated); the boats (from [K1], not seen in [P1]). Wartime fittings
   [P1] does not show (searchlight towers, 25 mm, the torpedo reload
   lockers) are left off.

   ------------------------------------------------------------------------
   PCE-842 (roc_e50_corvette, roc_e60_corvette)
   Published: 184 ft 6 in (56.24 m) overall, 33 ft 1 in (10.08 m) beam,
   9 ft 5 in (2.87 m) draught; 1 x 3"/50, 3 twin 40 mm, 4 x 20 mm,
   Hedgehog, depth charges (en.wikipedia "PCE-842-class patrol craft").
   References:
     [E1] Commons "USS PCE-867.jpg" (starboard side, nearly square on):
          hull 1137 px = 56.24 m (20.2 px/m). Long forecastle from the bow
          to the break at -9.7, deck 4.1 m at the bow and 3.3 m at the
          break; quarterdeck 1.4-1.6 m; the 3"/50 at 18.0 on a low seat;
          the bridge block 4.6 to 12.8, its top 10.1 m; the pole mast at
          3.0, about 19 m; a gun on a seat at the break.
     [E2] Commons "Photo of USS PCE-877 in 1946 at sea.jpg" (port bow):
          the round tub with a twin 40 mm before the bridge, the bridge
          block and its round wing tubs, the stack with its sloped black cap
          beside the boat on the port side, the big tub with a twin 40 mm at
          the forecastle's after end, the drum on the quarterdeck, the small
          deckhouse with a twin 40 mm on it and the stern depth-charge racks.
     [E3] Commons "80-G-363480 Chinese Warships.jpg" (PCE-869 transferring
          to China, 1948, bow on): the bow, the bridge face with its row of
          scuttles, the pole mast with the radar drum at its head.
   NOT CONFIRMED: the quarterdeck layout (positions read off [E2], whose
   angle foreshortens the stern: the drum at -12, the deckhouse -13.5 to
   -18, racks from -20 aft); the drum's use; the boat on the starboard side
   (mirrored); 20 mm and the Hedgehog are not drawn (not resolved). No
   photograph of an ROC PCE or Auk was found, so the e60 row is the same
   ship as the e50 row.

   ------------------------------------------------------------------------
   CHENG KUNG (roc_e90_destroyer)
   Published: 455 ft 5 in (138.8 m) overall, 45 ft (13.7 m) beam; based on
   the long-hull Perry; "eight Hsiung Feng II SSMs placed in two box
   launchers located atop the superstructure aft of the bridge"; two
   Bofors 40 mm/L70; Phalanx (en.wikipedia "Cheng Kung-class frigate").
   HeroPerryFFG.build(..., { longHull: true, ciws: true }) draws the ship
   (its header: FFG-60 plan, Phalanx on the hangar roof). Added here:
     [C1] Commons "ROCN Tian Dan (PFG2-1110) Shipped at Zuoying Naval Base
          20161112a.jpg" (port side, square on; 1403 px = 138.8 m, 10.1
          px/m): the launchers standing between the SPS-49 foremast and the
          mainmast (frames 149-163 on the Perry plan); a domed Bofors 40 mm
          L/70 turret on the hangar roof just abaft the stack, to port
          (frame 294); the Phalanx at frame 322 (the Perry's 323).
     [C2] Commons "Hsiung Feng II and Hsiung Feng III Anti-Ship Missile
          Launchers aboard on Central Upper Deck of ROCN Pan Chao (PFG2-
          1108) 20150316.jpg": box canisters in a 2 x 2 stack on a trainable
          frame, elevated about 30 degrees, trained athwartships; the later
          HF-III boxes there are not drawn (the row is the 1990s ship).
     [C3] Commons "ROCN cheng kung class PFG2-1105 and PFG2-1101
          20050624.jpg": the Mk 92 radome on the bridge, the masts.
   NOT CONFIRMED: the second Bofors (the text lists two; [C1] shows only the
   port one, so only that one is drawn); the HF-II canister size (5.4 x
   0.75 m, scaled from the HF-III boxes in [C2]); which launcher faces which
   side.
   The Perry module was called with the options it already has (longHull,
   ciws); nothing in it had to change.

   ------------------------------------------------------------------------
   KEE LUNG (roc_e00_destroyer)
   Published: 563 ft (171.7 m), 55 ft (16.8 m) beam; 2 x 5"/54 Mk 45, 2 x
   Mk 26 twin-arm launchers, 2 Phalanx, 2 x 4 Harpoon, SPS-48E, SPS-49(V)5,
   2 x SPG-51D, SPQ-9A (en.wikipedia "Kidd-class destroyer").
   Why HeroSpruanceDD is only partly reused: its build() takes no options
   and always draws the Spruance fit - the Mk 41 VLS where the Kidd has her
   forward Mk 26, the Sea Sparrow house where she has the after Mk 26, the
   SPS-40 and Spruance masts where she has the SPS-48E and her own masts -
   all merged into one mesh per material, so nothing can be taken off. Its
   hull ("hull"), weather deck ("deck"), forward 5-inch ("turret", the same
   Mk 45 at the same station) and "helipad" node are separate nodes and are
   the same as the Kidd's (the Kidd is the Spruance hull), so this file
   calls it, keeps those four, keeps its materials, discards the rest and
   draws the Kidd topsides. The after Mk 45 is a clone of the same turret.
   The SQS-53 dome under the forefoot was in the discarded batch and is not
   redrawn (it is below the waterline).
     [K1] Commons "ROCS Keelung(DDG-1801).jpg" (starboard side, square on,
          1563 px = 171.7 m, 9.10 px/m): the forward Mk 45 51.2, forward Mk
          26 37.0, aft Mk 26 -61.4, aft Mk 45 -70.7 (the Spruance hero's
          stations agree to 1 m); the pilot house roof 19.5 m; the foremast
          17-24 at its foot, its top platform 40.5 m and pole 50 m, the
          SPQ-9 radome 28.6 m on its forward platform, the SPS-49 mesh 35-38
          m forward of it, an SPG-51 on the bridge roof forward of it and a
          Phalanx to starboard beside its foot; the mainmast -13 to -6 at
          its foot, top platform 44.5 m, pole 50 m, the SPS-48E 36-43 m on
          a platform ABAFT it; the after SPG-51 on a house abaft the
          mainmast (about 24 m); Harpoons abaft the forward stack; a second
          Phalanx amidships near -1 at about 18 m; both Mk 26 loaded.
     [K2] Commons "USS Kidd (DDG-993) underway in 1982.jpg" (port bow from
          above): the plan of the decks, the twin-arm launchers, the
          staggered stacks, the boat, the flight deck between hangar and the
          after launcher. (In 1982 her SPS-48 stood forward of the mainmast;
          [K1] is followed for the ROC ship.)
     [K3] Commons "Kidd class vs Spruance class.jpg": bow-on, Kidd and
          Peterson side by side; mast and director arrangement.
   The deck levels, deckhouse plans, stacks and hangar are the Spruance
   hero's measured values (its r06 at 5.52 px/m), which [K1] matches.
   NOT CONFIRMED: the sides the two Phalanx stand on (starboard forward as
   [K1] shows; the after one placed on the 03 roof to starboard); the
   SPS-48E orientation (it rotates; drawn facing to starboard as in [K1]);
   the boat station (kept at the Spruance's -13.5 though [K1] reads about
   -20); detail inside the deckhouse block abaft the mainmast.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRocShips1 = (function () {
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
      function post(p) { tube(s, p, [p[0], p[1], p[2] + h], rp, rp, 4, false); }
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
        cylZ(s, px, py, z + 0.05 * k, 0.36 * k, 0.12 * k, 8);
        cylZ(s, px, py, z + 0.41 * k, 0.05 * k, 0.15 * k, 8);
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
      [-1, 1].forEach(function (e) { cylZ(s, x + c * e * 0.22 * k, y + sn * e * 0.22 * k, z + 0.07 * k, 0.26 * k, 0.09 * k, 8); });
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
      tube(sW, [x - c * L / 2, y - sn * L / 2, zc], [x + c * L / 2, y + sn * L / 2, zc], r, r, 10, true);
      [-0.3, 0.3].forEach(function (f) {
        var px = x + c * L * f, py = y + sn * L * f;
        tube(sM, [px - c * 0.04, py - sn * 0.04, zc], [px + c * 0.04, py + sn * 0.04, zc], r * 1.06, r * 1.06, 10, false);
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

  /* ------------------------------------------------------- textures */
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
  /* hull plating, 24 m x 8 m a tile: strakes, staggered butts, streaks */
  function hullTex(THREE) {
    return canvasTex(THREE, "rocHull", 512, 256, function (g, w, h) {
      var R = rng(5050), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 5; i++) {
        var xx = i * w / 5 + (i % 2) * 18;
        g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 46; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, 2 + R() * 5, 18 + R() * 80);
      }
      g.globalAlpha = 1;
      /* detail pass: weld beads, rust runs from the scuttles, salt, grime */
      g.fillStyle = "rgba(0,0,0,0.12)";
      for (i = 1; i < 5; i++) for (var j = 0; j < 128; j++) g.fillRect(j * 4 + 1, i * h / 5 + 2, 1, 1);
      FK.weather(g, w, h, 5051, 46, 1.0);
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "rocPlate", 256, 256, function (g, w, h) {
      var R = rng(5017), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 26; i++) {
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30);
      }
      g.globalAlpha = 1;
      g.fillStyle = "rgba(0,0,0,0.18)";
      for (i = 1; i < 4; i++) for (var j = 0; j < 32; j++) { g.fillRect(j * 8 + 3, i * h / 4 + 3, 1.4, 1.4); g.fillRect(i * w / 4 + 3, j * 8 + 3, 1.4, 1.4); }
      FK.weather(g, w, h, 5018, 24, 0.8);
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "rocDeck", 256, 256, function (g, w, h) {
      var R = rng(5011), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
      FK.weather(g, w, h, 5012, 16, 0.6);
    });
  }
  function grilleTex(THREE) {
    return canvasTex(THREE, "rocGrille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* US-pattern haze grey on both WW2 ships ([P1], [E2] are monochrome:
     hull and houses one even mid grey, decks darker), at the level the
     accepted ROC Gearing and the US heroes use after the 0.9 rule */
  var PAINT = { hull: 0x737a80, sup: 0x7c8389, deck: 0x4b5156, soot: 0x26292c };
  function makeMats(THREE, C) {
    var team = (C && C.team !== undefined) ? C.team : 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(PAINT.hull, hullTex(THREE), 0.86),
      boot:  skin(0x0c0d0f, hullTex(THREE), 0.9),
      under: skin(0x3a1612, hullTex(THREE), 0.9),
      sup:   skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:  skin(PAINT.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      team:  new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.62, metalness: 0.08 }),
      metal: metal(0x5c636a, 0.52, 0.55),
      soot:  metal(PAINT.soot, 0.7, 0.35),
      gun:   metal(0x3b4146, 0.48, 0.60),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x05090b, roughness: 0.1, metalness: 0,
                                              transparent: true, opacity: 0.84 })
    };
  }
  function sealMats(M) {
    for (var k in M) if (M.hasOwnProperty(k)) {
      M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ----------------------------------------------- kit (ru_riga.js) */
  function geoOf(THREE, pos, uv, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    if (idx) g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function box(THREE, p, lx, ly, lz, m, x, y, z, rz) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (rz) b.rotation.z = rz; p.add(b); return b;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open); g.rotateZ(-PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylY(THREE, p, r, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg, 1), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  function sphere(THREE, p, r, m, x, y, z, sx, sy, sz) {
    var g = new THREE.SphereGeometry(r, 14, 9);
    var s = new THREE.Mesh(g, m); s.position.set(x, y, z);
    if (sx) s.scale.set(sx, sy, sz); p.add(s); return s;
  }
  function hemi(THREE, p, r, m, x, y, z) {
    var g = new THREE.SphereGeometry(r, 14, 5, 0, PI * 2, 0, PI / 2); g.rotateX(PI / 2);
    var s = new THREE.Mesh(g, m); s.position.set(x, y, z); p.add(s); return s;
  }
  /* box with 8 given corners (bottom 0-3, top 4-7, CCW from above) */
  function hexa(THREE, p, m, V) {
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16);
      else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  /* convex polygon (CCW from above) extruded z0..z1 */
  function polyPrism(THREE, p, m, pts, z0, z1) {
    var pos = [], uv = [], n = pts.length, i, a, b;
    function tri(P, Q, R, side) {
      var v = [P, Q, R], k;
      for (k = 0; k < 3; k++) {
        pos.push(v[k][0], v[k][1], v[k][2]);
        if (side) uv.push(v[k][0] * 0.16 + v[k][1] * 0.16, v[k][2] * 0.16); else uv.push(v[k][0] * 0.16, v[k][1] * 0.16);
      }
    }
    for (i = 1; i < n - 1; i++) {
      tri([pts[0][0], pts[0][1], z1], [pts[i][0], pts[i][1], z1], [pts[i + 1][0], pts[i + 1][1], z1], false);
      tri([pts[0][0], pts[0][1], z0], [pts[i + 1][0], pts[i + 1][1], z0], [pts[i][0], pts[i][1], z0], false);
    }
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      tri([a[0], a[1], z0], [b[0], b[1], z0], [b[0], b[1], z1], true);
      tri([a[0], a[1], z0], [b[0], b[1], z1], [a[0], a[1], z1], true);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  function rect(x0, y0, x1, y1) { return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]; }
  function chamf(x0, y0, x1, y1, c) {
    return [[x0, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0, y1]];
  }
  /* rings lofted along X (each ring a closed list of [y,z]); capped ends */
  function ringLoft(THREE, p, m, xs, rings, cap) {
    var pos = [], uv = [], idx = [], n = rings[0].length, i, j;
    for (i = 0; i < xs.length; i++) for (j = 0; j < n; j++) {
      pos.push(xs[i], rings[i][j][0], rings[i][j][1]); uv.push(xs[i] * 0.2, j / n);
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = a + n, d = b + n;
      idx.push(a, b, c, b, d, c);
    }
    if (cap) [0, xs.length - 1].forEach(function (i0, e) {
      var c0 = pos.length / 3, k, sy = 0, sz = 0;
      for (k = 0; k < n; k++) { sy += rings[i0][k][0]; sz += rings[i0][k][1]; }
      pos.push(xs[i0], sy / n, sz / n); uv.push(0, 0);
      for (k = 0; k < n; k++) {
        var q = i0 * n + k, r = i0 * n + (k + 1) % n;
        if (e === 0) idx.push(c0, r, q); else idx.push(c0, q, r);
      }
    });
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv, idx), m); p.add(mm); return mm;
  }
  function superRing(w, h, zc, e, n) {
    var r = [], j, t;
    for (j = 0; j < n; j++) {
      t = j / n * PI * 2;
      var c = Math.cos(t), s = Math.sin(t);
      r.push([w * Math.sign(c) * Math.pow(Math.abs(c), e), zc + h * Math.sign(s) * Math.pow(Math.abs(s), e)]);
    }
    return r;
  }
  /* One mesh per material: bake every mesh under root into merged
     geometry in root's frame. */
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
  /* bake a mount group in place: its children become one mesh per material */
  function bakeGroup(THREE, grp) {
    var pos = grp.position.clone(), rot = grp.rotation.clone();
    grp.position.set(0, 0, 0); grp.rotation.set(0, 0, 0);
    var b = bake(THREE, grp);
    grp.children.slice().forEach(function (c) { grp.remove(c); });
    b.children.slice().forEach(function (c) { grp.add(c); });
    grp.position.copy(pos); grp.rotation.copy(rot);
    return grp;
  }

  /* --------------------------------------------------------- fittings */
  function dish(THREE, g, m, rad, x, y, z, tilt, yaw) {
    var dg = new THREE.SphereGeometry(rad, 14, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    if (tilt) dg.rotateY(-tilt);
    if (yaw) dg.rotateZ(yaw);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }
  /* funnel: an oval casing raked aft, the top falling aft, a black cap */
  function funnel(THREE, g, T, cx, L, B, z0, zf, za, rake, capH) {
    var N = 22, j, ring = [], tr = Math.tan(rake);
    for (j = 0; j < N; j++) {
      var t = j / N * PI * 2, c = Math.cos(t), s = Math.sin(t);
      ring.push([L / 2 * Math.sign(c) * Math.pow(Math.abs(c), 0.6), B / 2 * Math.sign(s) * Math.pow(Math.abs(s), 0.6)]);
    }
    function xAt(px, z) { return cx + px - (z - z0) * tr; }
    function zt(px) { return za + (zf - za) * (px + L / 2) / L; }
    function band(m, lo, hi) {
      var pos = [], uv = [];
      for (j = 0; j < N; j++) {
        var a = ring[j], b = ring[(j + 1) % N];
        var a0 = lo(a[0]), a1 = hi(a[0]), b0 = lo(b[0]), b1 = hi(b[0]);
        pos.push(xAt(a[0], a0), a[1], a0, xAt(b[0], b0), b[1], b0, xAt(b[0], b1), b[1], b1,
                 xAt(a[0], a0), a[1], a0, xAt(b[0], b1), b[1], b1, xAt(a[0], a1), a[1], a1);
        var ua = (a[0] + a[1]) / 6, ub = (b[0] + b[1]) / 6;
        uv.push(ua, a0 / 6, ub, b0 / 6, ub, b1 / 6, ua, a0 / 6, ub, b1 / 6, ua, a1 / 6);
      }
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv), m));
    }
    var ch = capH || 0.95;
    band(T.sup, function () { return z0; }, function (px) { return zt(px) - ch; });
    band(T.soot, function (px) { return zt(px) - ch; }, function (px) { return zt(px); });
    var pos = [], uv = [], zc = zt(0) - 0.2;
    for (j = 0; j < N; j++) {
      var a = ring[j], b = ring[(j + 1) % N];
      pos.push(xAt(0, zc), 0, zc, xAt(a[0], zt(a[0]) - 0.2), a[1], zt(a[0]) - 0.2, xAt(b[0], zt(b[0]) - 0.2), b[1], zt(b[0]) - 0.2);
      uv.push(0.5, 0.5, a[0] / L + 0.5, a[1] / B + 0.5, b[0] / L + 0.5, b[1] / B + 0.5);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.dark));
  }
  /* four-legged lattice tower: base rectangle (xa..xf, +-w) at z0 to top
     rectangle (xta..xtf, +-wt) at zt, n bays */
  function latticeMast(THREE, g, m, xa, xf, w, z0, xta, xtf, wt, zt, n, rl, rb) {
    var legs = [[xa, -w, xta, -wt], [xf, -w, xtf, -wt], [xf, w, xtf, wt], [xa, w, xta, wt]], i, k;
    n = n || 5; rl = rl || 0.09; rb = rb || 0.04;
    function at(L, f) { return [L[0] + (L[2] - L[0]) * f, L[1] + (L[3] - L[1]) * f, z0 + (zt - z0) * f]; }
    for (i = 0; i < 4; i++) {
      var a = at(legs[i], 0), b = at(legs[i], 1);
      strut(THREE, g, m, a[0], a[1], a[2], b[0], b[1], b[2], rl, 5);
    }
    for (k = 0; k <= n; k++) {
      var f = k / n;
      for (i = 0; i < 4; i++) {
        var p = at(legs[i], f), q = at(legs[(i + 1) % 4], f);
        strut(THREE, g, m, p[0], p[1], p[2], q[0], q[1], q[2], rb, 3);
        if (k < n) {
          var r = at(legs[(i + 1) % 4], (k + 1) / n);
          strut(THREE, g, m, p[0], p[1], p[2], r[0], r[1], r[2], rb * 0.75, 3);
        }
      }
    }
    return function (f, sx, sy) {   /* point on the tower at fraction f */
      var L = legs[sx > 0 ? (sy > 0 ? 2 : 1) : (sy > 0 ? 3 : 0)];
      return at(L, f);
    };
  }
  function platform(THREE, g, T, x0, y0, x1, y1, z, rail) {
    box(THREE, g, x1 - x0, y1 - y0, 0.12, T.metal, (x0 + x1) / 2, (y0 + y1) / 2, z);
    if (rail) roofRail(THREE, g, T, [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], z, 0.9);
  }
  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 2.6));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.028, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.02, 3);
    }
  }
  /* small boat on chocks: lofted hull and canopy */
  function boat(THREE, g, T, x, y, z, L, B) {
    var xs = [], rings = [], i, n = 9;
    for (i = 0; i <= n; i++) {
      var t = i / n, xx = x - L / 2 + L * t;
      var wf = t > 0.65 ? Math.max(0.08, 1 - Math.pow((t - 0.65) / 0.35, 1.6)) : (t < 0.08 ? 0.75 + t * 3 : 1);
      xs.push(xx); rings.push(superRing(B / 2 * wf, 0.45, z + 0.45, 0.8, 12).map(function (p) { return [p[0] + y, p[1]]; }));
    }
    ringLoft(THREE, g, T.sup, xs, rings, true);
    box(THREE, g, L * 0.45, B * 0.62, 0.55, T.sup, x - L * 0.05, y, z + 1.15);
  }

  /* ------------------------------------------------ hull from a table
     Station table rows: x, deck z at the side, half beam at the deck edge,
     half beam at the waterline, bottom z on the centreline, bilge
     fullness. spec: STA, XS0 (stern), XS1 (stem head), XWL (stem at the
     waterline), XST (where the stern overhang starts), ZTR (bottom z at
     the transom), STEP (extra fine stations [x0, x1, dx]). */
  function makeHull(spec) {
    var STA = spec.STA, XS0 = spec.XS0, XS1 = spec.XS1, XWL = spec.XWL, XST = spec.XST;
    function pick(x, k) {
      var i;
      if (x <= STA[0][0]) return STA[0][k];
      for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * f;
      }
      return STA[STA.length - 1][k];
    }
    var H = {};
    H.deckZ = function (x) { return pick(x, 1); };
    H.halfB = function (x) { return pick(x, 2); };
    H.zBot = function (x) {
      if (x > XWL) return H.deckZ(XS1) * (x - XWL) / (XS1 - XWL);
      if (x < XST) { var zs = pick(XST, 4); return zs + (spec.ZTR - zs) * (XST - x) / (XST - XS0); }
      return pick(x, 4);
    };
    H.W = function (x, z) {
      var zd = H.deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = H.zBot(x);
      if (z >= zd) return bd;
      if (z <= zb) return 0;
      if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
      if (x < XST) {
        var f = (XST - x) / (XST - XS0);
        return bd * Math.pow((z - zb) / (zd - zb), 0.2 + 0.3 * f);
      }
      if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.5);
      var n = pick(x, 5), t = Math.min(1, z / zb);
      return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    };
    H.xs = function () {
      var xs = [], x, i;
      for (x = XS0; x < XS1 - 0.01; x += spec.DX || 2.2) xs.push(x);
      for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
      for (x = XS1 - spec.BOW; x < XS1; x += 0.6) xs.push(x);
      for (x = XS0; x < XST; x += 0.4) xs.push(x);
      (spec.STEP || []).forEach(function (s) { for (var q = s[0]; q <= s[1]; q += s[2]) xs.push(q); });
      xs.push(XS1);
      xs.sort(function (a, b) { return a - b; });
      return xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
    };
    H.edgeY = function (x) { return Math.max(0.1, H.halfB(x) - 0.15); };
    H.XS0 = XS0; H.XS1 = XS1;
    return H;
  }
  function shellBand(THREE, H, m, zlo, zhi, rows) {
    var xs = H.xs(), pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
    for (s = -1; s <= 1; s += 2) {
      var base = pos.length / 3;
      for (i = 0; i < xs.length; i++) {
        var x = xs[i], zb = H.zBot(x), zd = H.deckZ(x);
        var a = Math.min(Math.max(zlo, zb), zd), b = Math.min(Math.max(zhi, zb), zd);
        for (j = 0; j < NR; j++) {
          var z = a + (b - a) * j / rows;
          pos.push(x, s * H.W(x, z), z); uv.push(x / 24, z / 8);
        }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < rows; j++) {
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
      if (cx * cx + cy * cy + cz * cz > 1e-8) keep.push(idx[i], idx[i + 1], idx[i + 2]);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, keep), m);
  }
  function deckSheet(THREE, H, m) {
    var xs = H.xs(), pos = [], uv = [], idx = [], i, j, NC = 4;
    for (i = 0; i < xs.length; i++) {
      var x = xs[i], w = H.halfB(x), z = H.deckZ(x);
      for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC)) / 8); }
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
      var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
  }
  function transom(THREE, H, g, T) {
    var x = H.XS0, zb = H.zBot(x), zd = H.deckZ(x), N = 6, j, k;
    var pos = [], uv = [];
    for (j = 0; j < N; j++) {
      var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
      var w0 = H.W(x + 0.001, z0), w1 = H.W(x + 0.001, z1);
      pos.push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
      for (k = 0; k < 6; k++) uv.push(pos[pos.length - 18 + k * 3 + 1] / 24, pos[pos.length - 18 + k * 3 + 2] / 8);
    }
    g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.hull));
  }
  function railRun(THREE, H, g, T, x0, x1, step, hgt) {
    var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
    for (s = -1; s <= 1; s += 2) {
      prev = null;
      for (i = 0; i <= n; i++) {
        x = x0 + (x1 - x0) * i / n; y = s * H.edgeY(x); z = H.deckZ(x);
        strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
        if (prev) {
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.022, 3);
          strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.018, 3);
        }
        prev = [x, y, z];
      }
    }
  }
  function hullShell(THREE, H, g, T, zKeel, zTop) {
    g.add(shellBand(THREE, H, T.under, zKeel, -0.3, 5));
    g.add(shellBand(THREE, H, T.boot, -0.3, 0.45, 1));
    g.add(shellBand(THREE, H, T.hull, 0.45, zTop, 6));
    transom(THREE, H, g, T);
    g.add(deckSheet(THREE, H, T.deck));
  }

  /* ------------------------------------------------------- weapons */
  /* US 5"/38 single open mount (Mk 30 type with the light shield): base
     ring, shield open at the back, the 38-calibre barrel (4.8 m) */
  function gun5in38(THREE, g, T) {
    cylZ(THREE, g, 1.45, 1.55, 0.3, 18, T.sup, 0, 0, 0.15);
    var s, L0 = -1.55, L1 = 1.45;
    /* the shield: sloped front, two sides, a roof */
    hexa(THREE, g, T.sup, [[L1 - 0.25, -1.4, 0.3], [L1, -1.4, 0.3], [L1, 1.4, 0.3], [L1 - 0.25, 1.4, 0.3],
                           [L1 - 0.85, -1.3, 2.35], [L1 - 0.6, -1.3, 2.35], [L1 - 0.6, 1.3, 2.35], [L1 - 0.85, 1.3, 2.35]]);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * 1.4, y1 = s * 1.3;
      var V = [[L0, y0 - 0.04, 0.3], [L1 - 0.1, y0 - 0.04, 0.3], [L1 - 0.1, y0 + 0.04, 0.3], [L0, y0 + 0.04, 0.3],
               [L0 + 0.3, y1 - 0.04, 2.35], [L1 - 0.7, y1 - 0.04, 2.35], [L1 - 0.7, y1 + 0.04, 2.35], [L0 + 0.3, y1 + 0.04, 2.35]];
      if (s < 0) V = [V[1], V[0], V[3], V[2], V[5], V[4], V[7], V[6]];
      hexa(THREE, g, T.sup, V);
    }
    box(THREE, g, 2.4, 2.66, 0.1, T.sup, -0.15, 0, 2.38);
    box(THREE, g, 1.2, 1.4, 1.0, T.gun, -0.3, 0, 0.85);
    var bar = new THREE.Group(); bar.position.set(0.6, 0, 1.3); bar.rotation.y = -0.06;
    cylX(THREE, bar, 0.22, 0.26, 1.2, 10, T.gun, 0.2, 0, 0);
    cylX(THREE, bar, 0.085, 0.11, 4.0, 8, T.gun, 2.8, 0, 0, true);
    g.add(bar);
    return g;
  }
  /* US 3"/50 single open mount (Mk 22 type): pedestal, cradle, barrel 3.8 m */
  function gun3in50(THREE, g, T, shield) {
    cylZ(THREE, g, 0.45, 0.6, 0.9, 10, T.gun, 0, 0, 0.45);
    box(THREE, g, 1.1, 0.9, 0.5, T.gun, 0, 0, 1.15);
    var bar = new THREE.Group(); bar.position.set(0.1, 0, 1.35); bar.rotation.y = -0.12;
    cylX(THREE, bar, 0.17, 0.2, 1.3, 10, T.gun, -0.2, 0, 0);
    cylX(THREE, bar, 0.06, 0.08, 3.4, 8, T.gun, 2.1, 0, 0, true);
    g.add(bar);
    if (shield) box(THREE, g, 0.08, 1.8, 1.1, T.sup, 0.75, 0, 1.3);
    for (var s = -1; s <= 1; s += 2) box(THREE, g, 0.5, 0.06, 0.35, T.metal, -0.2, s * 0.62, 0.95);
    return g;
  }
  /* Bofors 40 mm/60: twin (n = 2) or single, on a pedestal, barrels 2.4 m */
  function bofors(THREE, g, T, n) {
    cylZ(THREE, g, 0.5, 0.65, 0.5, 10, T.gun, 0, 0, 0.25);
    box(THREE, g, 1.2, n === 2 ? 1.5 : 1.0, 0.45, T.gun, -0.1, 0, 0.75);
    var bar = new THREE.Group(); bar.position.set(0.2, 0, 1.05); bar.rotation.y = -0.25;
    for (var i = 0; i < n; i++) {
      var y = n === 2 ? (i ? 0.3 : -0.3) : 0;
      cylX(THREE, bar, 0.1, 0.12, 0.9, 8, T.gun, 0, y, 0);
      cylX(THREE, bar, 0.045, 0.05, 1.9, 6, T.gun, 1.35, y, 0, true);
      cylX(THREE, bar, 0.075, 0.075, 0.3, 6, T.gun, 2.3, y, 0);
    }
    g.add(bar);
    box(THREE, g, 0.08, n === 2 ? 1.6 : 1.1, 0.7, T.sup, 0.55, 0, 1.0);
    return g;
  }
  /* round gun tub */
  function tub(THREE, g, T, x, y, z, r, h) {
    var c = new THREE.CylinderGeometry(r, r, h, 18, 1, true); c.rotateX(PI / 2);
    var m = new THREE.Mesh(c, T.sup); m.position.set(x, y, z + h / 2); g.add(m);
    cylZ(THREE, g, r, r, 0.08, 18, T.deck, x, y, z + 0.04);
  }
  /* depth-charge thrower (K-gun) and a stern rack */
  function kgun(THREE, g, T, x, y, z, s) {
    cylZ(THREE, g, 0.22, 0.3, 0.4, 8, T.metal, x, y, z + 0.2);
    strut(THREE, g, T.gun, x, y, z + 0.35, x, y + s * 0.6, z + 1.1, 0.16, 8);
    cylY(THREE, g, 0.28, 0.5, 10, T.gun, x, y + s * 0.85, z + 1.2);
  }
  function rack(THREE, g, T, H, x0, x1, y) {
    var z = H.deckZ(x0), i, n = Math.max(2, Math.round((x1 - x0) / 0.75));
    box(THREE, g, x1 - x0, 0.1, 0.1, T.metal, (x0 + x1) / 2, y - 0.4, z + 0.55);
    box(THREE, g, x1 - x0, 0.1, 0.1, T.metal, (x0 + x1) / 2, y + 0.4, z + 0.55);
    for (i = 0; i <= 3; i++) {
      var xx = x0 + (x1 - x0) * i / 3;
      strut(THREE, g, T.metal, xx, y - 0.4, z, xx, y - 0.4, z + 0.55, 0.04, 4);
      strut(THREE, g, T.metal, xx, y + 0.4, z, xx, y + 0.4, z + 0.55, 0.04, 4);
    }
    for (i = 0; i < n; i++) cylY(THREE, g, 0.24, 0.62, 10, T.gun, x0 + 0.4 + i * 0.75, y, z + 0.82);
  }
  /* Phalanx Mk 15 on its own stand, gun along +X */
  function phalanx(THREE, g, T, M2) {
    var w = M2 || T;
    cylZ(THREE, g, 0.8, 0.86, 0.45, 14, w.sup, 0, 0, 0.22);
    cylZ(THREE, g, 0.62, 0.66, 0.55, 14, w.sup, 0, 0, 0.72);
    box(THREE, g, 0.9, 0.2, 0.95, w.sup, -0.05, 0.52, 1.4);
    box(THREE, g, 0.9, 0.2, 0.95, w.sup, -0.05, -0.52, 1.4);
    cylX(THREE, g, 0.17, 0.15, 1.95, 8, w.metal, 1.25, 0, 1.3);
    cylZ(THREE, g, 0.56, 0.56, 1.0, 16, w.rad, -0.2, 0, 2.28);
    hemi(THREE, g, 0.56, w.rad, -0.2, 0, 2.78);
  }

  /* ================================================== TAN YANG (DD-12) */
  var TY = makeHull({
    XS0: -59.25, XS1: 59.25, XWL: 56.5, XST: -57.6, ZTR: 0.15, BOW: 6, DX: 2.0,
    STEP: [[21.8, 24.0, 0.3]],
    /*  x       deck   hb deck  hb wl   bottom  bilge   [K1] */
    STA: [
      [-59.25, 2.75, 1.90, 1.20,  0.15, 2.0],
      [-57.6,  2.75, 2.70, 2.10, -0.25, 2.2],
      [-54.9,  2.75, 3.55, 2.95, -0.60, 2.4],
      [-49.4,  2.75, 4.30, 3.80, -1.75, 2.6],
      [-43.9,  2.75, 4.75, 4.30, -3.00, 2.8],
      [-38.4,  2.75, 5.00, 4.62, -3.58, 3.0],
      [-32.9,  2.75, 5.20, 4.85, -3.65, 3.0],
      [-21.9,  2.75, 5.35, 5.05, -3.65, 3.2],
      [  0.0,  2.75, 5.40, 5.12, -3.65, 3.2],
      [ 11.0,  2.75, 5.35, 5.05, -3.65, 3.0],
      [ 22.4,  2.80, 5.14, 4.78, -3.65, 2.8],
      [ 23.4,  4.25, 5.06, 4.68, -3.65, 2.7],
      [ 27.4,  4.35, 4.85, 4.45, -3.63, 2.6],
      [ 32.9,  4.50, 4.55, 4.05, -3.62, 2.4],
      [ 38.4,  4.65, 4.20, 3.45, -3.55, 2.2],
      [ 43.9,  4.90, 3.65, 2.70, -3.40, 2.0],
      [ 49.4,  5.25, 2.95, 1.75, -3.10, 1.8],
      [ 52.5,  5.50, 2.45, 1.10, -2.60, 1.6],
      [ 54.9,  5.75, 1.95, 0.50, -1.70, 1.4],
      [ 56.5,  5.95, 1.40, 0.00,  0.00, 1.2],
      [ 59.25, 6.25, 0.12, 0.00,  0.00, 1.2]
    ]
  });

  function buildTanYang(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), H = TY, s, i;
    var ZM = 2.75;
    hullShell(THREE, H, g, T, -4.0, 7.0);
    /* the forecastle break bulkhead, the scuttles, anchors [K1][P2] */
    polyPrism(THREE, g, T.hull, [[22.3, -H.edgeY(22.3)], [22.6, -H.edgeY(22.6)], [22.6, H.edgeY(22.6)], [22.3, H.edgeY(22.3)]], ZM - 0.05, 4.25);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 26; i++) {
        var sx = -50 + i * 3.6, sz = H.deckZ(sx) - 0.9;
        if (sx > 50) break;
        box(THREE, g, 0.28, 0.06, 0.28, T.dark, sx, s * (H.W(sx, sz) + 0.01), sz);
      }
      var ax = 54.6, az = H.deckZ(ax) - 0.9;
      box(THREE, g, 1.3, 0.1, 1.0, T.dark, ax, s * (H.W(ax, az) + 0.02), az, -s * 0.3);
      cylZ(THREE, g, 0.3, 0.35, 0.4, 8, T.metal, 52.5, s * 0.9, H.deckZ(52.5) + 0.2);
    }

    /* the bridge: deckhouse at the break, the bridge block, the pilot house
       and the director tower [K1]; the bridge-front tub [P1] */
    polyPrism(THREE, g, T.sup, rect(19.6, -2.2, 24.0, 2.2), ZM - 0.05, 5.0);
    polyPrism(THREE, g, T.sup, [[23.6, -2.7], [29.4, -2.7], [30.2, -1.9], [30.2, 1.9], [29.4, 2.7], [23.6, 2.7]], 4.2, 7.6);
    polyPrism(THREE, g, T.sup, [[24.2, -2.5], [29.2, -2.5], [29.9, -1.8], [29.9, 1.8], [29.2, 2.5], [24.2, 2.5]], 7.5, 9.4);
    polyPrism(THREE, g, T.sup, [[24.6, -2.0], [28.9, -2.0], [29.5, -1.4], [29.5, 1.4], [28.9, 2.0], [24.6, 2.0]], 9.35, 10.7);
    hexa(THREE, g, T.glass, [[29.48, -1.35, 9.75], [29.56, -1.35, 9.75], [29.56, 1.35, 9.75], [29.48, 1.35, 9.75],
                             [29.48, -1.35, 10.3], [29.56, -1.35, 10.3], [29.56, 1.35, 10.3], [29.48, 1.35, 10.3]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.6, 0.06, 0.5, T.glass, 27.6, s * 2.02, 10.0);
      box(THREE, g, 2.2, 1.6, 0.12, T.sup, 27.6, s * 3.2, 9.35);
      box(THREE, g, 2.2, 0.08, 0.9, T.sup, 27.6, s * 4.0, 9.8);
      for (i = 0; i < 3; i++) box(THREE, g, 0.3, 0.06, 0.3, T.dark, 24.6 + i * 1.9, s * 2.72, 6.2);
    }
    roofRail(THREE, g, T, [[24.8, 1.9], [29.0, 1.9], [29.4, 1.3], [29.4, -1.3], [29.0, -1.9], [24.8, -1.9], [24.8, 1.9]], 10.7, 0.9);
    polyPrism(THREE, g, T.sup, rect(24.8, -0.9, 26.6, 0.9), 10.65, 11.6);
    cylZ(THREE, g, 0.75, 0.8, 0.6, 12, T.sup, 25.7, 0, 11.9);
    box(THREE, g, 0.25, 2.6, 0.2, T.sup, 25.7, 0, 12.05);
    tub(THREE, g, T, 31.4, 0, H.deckZ(31.4), 1.5, 1.05);
    var bt = new THREE.Group(); bt.position.set(31.4, 0, H.deckZ(31.4) + 0.05); bofors(THREE, bt, T, 2); g.add(bt);

    /* the tripod foremast with its platform and the small bedspring [P1][K1] */
    strut(THREE, g, T.metal, 20.2, 0, 5.0, 20.2, 0, 21.5, 0.14, 6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 22.6, s * 1.6, 5.0, 20.3, s * 0.15, 15.0, 0.1, 5);
    platform(THREE, g, T, 19.3, -1.2, 21.4, 1.2, 15.0, true);
    box(THREE, g, 0.12, 5.0, 0.12, T.metal, 20.2, 0, 17.2);
    box(THREE, g, 0.3, 0.3, 0.7, T.metal, 20.2, 0, 19.4);
    box(THREE, g, 0.2, 2.4, 1.0, T.metal, 20.45, 0, 20.1);
    for (i = -2; i <= 2; i++) box(THREE, g, 0.06, 0.06, 1.0, T.dark, 20.6, i * 0.55, 20.1);

    /* the forward funnel and its base house, the after funnel, base house
       and the AA platform with its two tubs [K1][P1] */
    polyPrism(THREE, g, T.sup, rect(9.5, -2.0, 19.4, 2.0), ZM - 0.05, 4.5);
    funnel(THREE, g, T, 14.5, 4.3, 3.0, 4.45, 11.6, 11.2, 0.14, 1.1);
    polyPrism(THREE, g, T.sup, rect(-8.0, -2.2, 1.5, 2.2), ZM - 0.05, 4.5);
    funnel(THREE, g, T, -2.1, 4.3, 2.6, 4.45, 10.6, 10.2, 0.14, 1.1);
    polyPrism(THREE, g, T.sup, [[-1.6, -2.4], [3.0, -2.4], [3.4, -1.0], [3.4, 1.0], [3.0, 2.4], [-1.6, 2.4]], 6.2, 6.4);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.4, 1.4, 0.2, T.sup, 0.7, s * 3.0, 6.3);
      strut(THREE, g, T.metal, 0.7, s * 3.3, ZM, 0.7, s * 3.3, 6.2, 0.07, 5);
      tub(THREE, g, T, 0.7, s * 3.3, 6.4, 1.15, 0.95);
      var bs = new THREE.Group(); bs.position.set(0.7, s * 3.3, 6.45); bs.rotation.z = s * 0.5; bofors(THREE, bs, T, 1); g.add(bs);
      /* boats at the deck edge [K1] */
      boat(THREE, g, T, -4.9, s * 3.9, 3.7, 6.5, 1.8);
      for (i = -1; i <= 1; i += 2) {
        strut(THREE, g, T.metal, -4.9 + i * 2.5, s * 4.9, ZM, -4.9 + i * 2.5, s * 4.9, 6.2, 0.06, 4);
        strut(THREE, g, T.metal, -4.9 + i * 2.5, s * 4.9, 6.2, -4.9 + i * 2.5, s * 3.9, 6.5, 0.05, 4);
      }
    }

    /* the 3"/50 singles in the two torpedo positions [P1, text] */
    [5.5, -13.0].forEach(function (x3) {
      cylZ(THREE, g, 1.25, 1.35, 0.8, 16, T.sup, x3, 0, ZM + 0.4);
      var t3 = new THREE.Group(); t3.position.set(x3, 0, ZM + 0.8); t3.rotation.z = x3 > 0 ? 1.3 : -1.6;
      gun3in50(THREE, t3, T, true); g.add(t3);
    });

    /* the after deckhouse with X mount, the mainmast [K1][P1] */
    polyPrism(THREE, g, T.sup, [[-31.5, -2.2], [-30.8, -2.6], [-18.4, -2.6], [-17.8, -2.2], [-17.8, 2.2], [-18.4, 2.6], [-30.8, 2.6], [-31.5, 2.2]], ZM - 0.05, 5.3);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) box(THREE, g, 0.35, 0.06, 0.35, T.dark, -22.0 + i * 1.3, s * 2.62, 4.4);
    roofRail(THREE, g, T, [[-18.0, 2.4], [-24.6, 2.4]], 5.3, 0.9);
    roofRail(THREE, g, T, [[-18.0, -2.4], [-24.6, -2.4]], 5.3, 0.9);
    strut(THREE, g, T.metal, -20.6, 0, 5.3, -20.6, 0, 14.9, 0.1, 6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, -18.8, s * 1.3, 5.3, -20.55, s * 0.1, 11.0, 0.07, 5);
    box(THREE, g, 0.1, 3.6, 0.1, T.metal, -20.6, 0, 12.2);
    var xg = new THREE.Group(); xg.position.set(-27.2, 0, 5.3); xg.rotation.z = PI; gun5in38(THREE, xg, T); g.add(xg);

    /* Y mount on the quarterdeck, trained aft [K1][P1] */
    var yg = new THREE.Group(); yg.position.set(-35.9, 0, ZM); yg.rotation.z = PI; gun5in38(THREE, yg, T); g.add(yg);

    /* depth-charge gear: two throwers, two stern racks [P1, text] */
    for (s = -1; s <= 1; s += 2) {
      kgun(THREE, g, T, -47.5, s * 3.6, ZM, s);
      rack(THREE, g, T, H, -58.6, -54.4, s * 1.3);
    }
    /* deck fittings, rails, jack and ensign staffs */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, 45.0, s * 2.6, H.deckZ(45) + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, -52.0, s * 3.3, ZM + 0.22);
      cylZ(THREE, g, 0.16, 0.16, 0.45, 6, T.metal, 8.0, s * 4.9, ZM + 0.22);
    }
    railRun(THREE, H, g, T, -58.8, 22.0, 3.0, 0.95);
    railRun(THREE, H, g, T, 23.6, 58.6, 2.9, 0.95);
    strut(THREE, g, T.metal, 58.7, 0, H.deckZ(58.7), 58.7, 0, H.deckZ(58.7) + 2.6, 0.045, 4);
    strut(THREE, g, T.metal, -58.9, 0, ZM, -58.9, 0, ZM + 3.6, 0.05, 4);

    /* team: small strips on roofs */
    box(THREE, g, 2.0, 0.9, 0.04, T.team, -21.5, 0, 5.33);
    box(THREE, g, 1.8, 0.9, 0.04, T.team, 27.0, 0, 10.73);
    box(THREE, g, 2.0, 0.9, 0.04, T.team, -5.5, 0, 4.53);

    /* the forward 5"/38 on the forecastle: the row's turret [K1][P1] */
    cylZ(THREE, g, 1.6, 1.7, 0.4, 18, T.sup, 38.5, 0, H.deckZ(38.5) + 0.1);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(38.5, 0, H.deckZ(38.5) + 0.3); gun5in38(THREE, tw, T);

    var root = bake(THREE, g);
    bakeGroup(THREE, tw); root.add(tw);
    return root;
  }

  /* (detail pass) the fitting sinks out as meshes for bake to merge     */
  function sinkOut(THREE, g, list) {
    list.forEach(function (q) { var gg = q[0].geo(THREE); if (gg) g.add(new THREE.Mesh(gg, q[1])); });
  }

  /* ===================================================== PCE-842 class */
  var PCE = makeHull({
    XS0: -28.12, XS1: 28.12, XWL: 27.0, XST: -26.5, ZTR: 0.25, BOW: 3, DX: 1.2,
    STEP: [[-10.2, -9.0, 0.2]],
    /*  x       deck   hb deck  hb wl   bottom  bilge   [E1] */
    STA: [
      [-28.12, 1.55, 3.90, 3.30,  0.25, 2.0],
      [-26.5,  1.55, 4.35, 3.85, -0.45, 2.2],
      [-24.0,  1.55, 4.65, 4.25, -1.20, 2.4],
      [-18.0,  1.55, 4.95, 4.65, -2.40, 2.8],
      [-10.0,  1.55, 5.04, 4.80, -2.80, 3.0],
      [ -9.4,  3.30, 5.04, 4.80, -2.82, 3.0],
      [  0.0,  3.35, 5.04, 4.80, -2.87, 3.0],
      [  8.0,  3.45, 5.00, 4.70, -2.87, 2.8],
      [ 14.0,  3.60, 4.70, 4.20, -2.85, 2.5],
      [ 19.0,  3.75, 4.10, 3.30, -2.75, 2.2],
      [ 23.0,  3.90, 3.20, 2.00, -2.30, 1.8],
      [ 25.5,  4.00, 2.30, 0.90, -1.30, 1.5],
      [ 27.0,  4.08, 1.40, 0.00,  0.00, 1.2],
      [ 28.12, 4.15, 0.12, 0.00,  0.00, 1.2]
    ]
  });

  function buildPce(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), H = PCE, s, i;
    var ZQ = 1.55;
    hullShell(THREE, H, g, T, -3.2, 5.0);
    /* the break bulkhead at the forecastle's after end [E1][E2] */
    polyPrism(THREE, g, T.hull, [[-9.75, -H.edgeY(-9.75)], [-9.45, -H.edgeY(-9.45)], [-9.45, H.edgeY(-9.45)], [-9.75, H.edgeY(-9.75)]], ZQ - 0.05, 3.3);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 9; i++) {
        var sx = -6 + i * 3.1, sz = H.deckZ(sx) - 0.8;
        box(THREE, g, 0.3, 0.06, 0.3, T.dark, sx, s * (H.W(sx, sz) + 0.01), sz);
      }
      var ax = 25.6, az = H.deckZ(ax) - 0.8;
      box(THREE, g, 1.1, 0.1, 0.9, T.dark, ax, s * (H.W(ax, az) + 0.02), az, -s * 0.3);
    }

    /* the bridge block: the 01 house, the bridge, the pilot house with its
       scuttles, the round tub before it with a twin 40 mm [E1][E2][E3] */
    polyPrism(THREE, g, T.sup, rect(2.2, -3.6, 13.0, 3.6), 3.3, 5.8);
    polyPrism(THREE, g, T.sup, [[4.6, -3.0], [12.0, -3.0], [12.8, -2.3], [12.8, 2.3], [12.0, 3.0], [4.6, 3.0]], 5.75, 8.0);
    polyPrism(THREE, g, T.sup, [[6.4, -2.4], [11.6, -2.4], [12.3, -1.7], [12.3, 1.7], [11.6, 2.4], [6.4, 2.4]], 7.95, 9.4);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) box(THREE, g, 0.06, 0.4, 0.4, T.dark, 12.31, s * (0.4 + i * 0.5), 8.7);
      for (i = 0; i < 4; i++) box(THREE, g, 0.4, 0.06, 0.4, T.dark, 3.6 + i * 2.3, s * 3.62, 4.6);
      tub(THREE, g, T, 11.0, s * 3.4, 8.0, 0.75, 1.0);
    }
    box(THREE, g, 0.06, 2.6, 0.9, T.sup, 12.15, 0, 9.85);
    box(THREE, g, 5.0, 4.4, 0.06, T.metal, 9.0, 0, 10.05);
    roofRail(THREE, g, T, [[6.6, 2.3], [11.4, 2.3]], 9.4, 0.9);
    roofRail(THREE, g, T, [[6.6, -2.3], [11.4, -2.3]], 9.4, 0.9);
    tub(THREE, g, T, 14.4, 0, 5.8, 1.6, 1.0);
    polyPrism(THREE, g, T.sup, rect(13.0, -1.6, 15.2, 1.6), 3.4, 5.8);
    var b0 = new THREE.Group(); b0.position.set(14.4, 0, 5.85); bofors(THREE, b0, T, 2); g.add(b0);

    /* the pole mast with its yard and the radar drum at the head [E1][E3] */
    strut(THREE, g, T.metal, 3.0, 0, 5.8, 3.0, 0, 18.8, 0.13, 6);
    box(THREE, g, 0.12, 5.6, 0.12, T.metal, 3.0, 0, 14.2);
    platform(THREE, g, T, 2.3, -0.8, 3.7, 0.8, 16.2, true);
    cylZ(THREE, g, 0.55, 0.55, 1.0, 12, T.sup, 3.0, 0, 16.8);
    cylZ(THREE, g, 0.58, 0.58, 0.08, 12, T.metal, 3.0, 0, 17.32);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, 3.0, s * 0.2, 12.5, 3.0, s * 2.7, 14.2, 0.025, 3);

    /* the stack with its sloped black cap, beside the boats [E2] */
    funnel(THREE, g, T, -3.6, 1.7, 1.5, 3.3, 7.8, 7.0, 0.05, 0.9);
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T, -5.3, s * 3.3, 3.75, 6.0, 1.8);
      for (i = -1; i <= 1; i += 2) {
        strut(THREE, g, T.metal, -5.3 + i * 2.3, s * 4.5, 3.3, -5.3 + i * 2.3, s * 4.5, 6.0, 0.06, 4);
        strut(THREE, g, T.metal, -5.3 + i * 2.3, s * 4.5, 6.0, -5.3 + i * 2.3, s * 3.3, 6.3, 0.05, 4);
      }
    }

    /* the big tub with a twin 40 mm at the forecastle's after end [E1][E2] */
    tub(THREE, g, T, -8.2, 0, 3.3, 1.8, 1.25);
    var b1 = new THREE.Group(); b1.position.set(-8.2, 0, 3.35); b1.rotation.z = PI; bofors(THREE, b1, T, 2); g.add(b1);

    /* the quarterdeck: the drum, the small deckhouse with a twin 40 mm,
       the stern racks [E2] */
    cylZ(THREE, g, 0.9, 0.9, 1.6, 14, T.sup, -12.0, 0, ZQ + 0.8);
    polyPrism(THREE, g, T.sup, rect(-18.0, -2.0, -13.5, 2.0), ZQ - 0.05, 3.5);
    tub(THREE, g, T, -15.8, 0, 3.5, 1.5, 0.8);
    var b2 = new THREE.Group(); b2.position.set(-15.8, 0, 3.55); b2.rotation.z = PI; bofors(THREE, b2, T, 2); g.add(b2);
    for (s = -1; s <= 1; s += 2) {
      rack(THREE, g, T, H, -27.6, -20.5, s * 1.6);
      kgun(THREE, g, T, -19.5, s * 3.8, ZQ, s);
    }
    railRun(THREE, H, g, T, -27.9, -9.9, 2.4, 0.95);
    railRun(THREE, H, g, T, -9.2, 27.6, 2.4, 0.95);
    strut(THREE, g, T.metal, 27.8, 0, H.deckZ(27.8), 27.8, 0, H.deckZ(27.8) + 2.4, 0.04, 4);
    strut(THREE, g, T.metal, -27.9, 0, ZQ, -27.9, 0, ZQ + 3.0, 0.045, 4);

    /* (detail pass) fittings: the anchors in their hawses, bollards,
       fairleads and the toe rail along both decks, hatches and vents on
       the forecastle and the quarterdeck, Carley floats on the 01 house
       sides, ladders up the break and the bridge, whips, the mast's
       shrouds, a searchlight on the bridge                               */
    var fm = new FK.Sink(), fd = new FK.Sink(), fs = new FK.Sink();
    for (s = -1; s <= 1; s += 2) {
      var hz = H.deckZ(25.6) - 0.8;
      FK.anchor(fm, 25.6, s * (H.W(25.6, hz) + 0.03), hz, [0.45, s, 0.2], 0.7);
      FK.tube(fd, [25.4, s * (H.edgeY(25.4) - 0.3), H.deckZ(25.4) + 0.03], [22.6, s * 0.6, H.deckZ(22.6) + 0.3], 0.04, 0.04, 4, false);
      [[26.0, 0.5], [19.5, 0.6], [-12.5, 0.6], [-25.5, 0.6]].forEach(function (b) {
        FK.bollard(fm, b[0], s * (H.edgeY(b[0]) - b[1]), H.deckZ(b[0]), 0, 0.7);
      });
      [27.0, 21.0, -11.0, -27.0].forEach(function (fx) {
        FK.fairlead(fm, fx, s * (H.edgeY(fx) - 0.15), H.deckZ(fx), Math.atan2(s * (H.edgeY(fx + 0.5) - H.edgeY(fx)), 0.5), 0.6);
      });
      var tp = [], tq = [], xq;
      for (xq = -27.9; xq <= -9.9; xq += 1.0) tp.push([xq, s * (H.edgeY(xq) + 0.08), H.deckZ(xq) + 0.04]);
      for (xq = -9.2; xq <= 27.6; xq += 1.0) tq.push([xq, s * (H.edgeY(xq) + 0.08), H.deckZ(xq) + 0.04]);
      FK.toe(fd, tp, 0.045); FK.toe(fd, tq, 0.045);
      for (i = 0; i < 2; i++) FK.obox(fs, [4.2 + i * 2.6, s * 3.68, 4.6], [1, 0, 0], [0, s, 0], [0, 0, 1], 2.0, 0.3, 0.9);
      FK.ladder(fm, [-9.3, s * 2.6, ZQ], [-9.3, s * 2.6, 3.35], [0, 1, 0], 0.45, 0.3);
      FK.ladder(fm, [4.5, s * 2.0, 5.8], [4.5, s * 2.0, 8.05], [0, 1, 0], 0.45, 0.3);
      FK.mushroom(fs, 22.0, s * 1.6, H.deckZ(22.0), 0.12, 0.45);
      FK.goose(fs, -22.5, s * 3.2, ZQ, 0.08, 0.55, s * PI / 2);
      FK.whip(fm, 6.6, s * 2.9, 8.0, 5.0, 0.035);
      FK.tube(fm, [3.0, 0, 17.0], [3.0, s * 3.4, 5.85], 0.015, 0.015, 3, false);
    }
    FK.hatch(fs, 23.5, 0, H.deckZ(23.5), 0.9, 0.9, 0);
    FK.hatch(fs, -21.0, 0, ZQ, 1.0, 1.0, 0);
    FK.hatch(fs, 0.5, 2.0, H.deckZ(0.5), 0.9, 0.9, 0);
    FK.cylZ(fm, 10.8, -1.6, 9.4, 0.3, 0.06, 6);
    FK.tube(fm, [10.6, -1.6, 9.95], [11.05, -1.6, 9.95], 0.22, 0.24, 10, true);
    sinkOut(THREE, g, [[fm, T.metal], [fd, T.soot], [fs, T.sup]]);

    box(THREE, g, 1.8, 0.8, 0.04, T.team, 9.0, 0, 10.1);
    box(THREE, g, 1.6, 0.8, 0.04, T.team, -15.0, 1.2, 3.52);

    /* the 3"/50 on its low seat on the forecastle: the turret [E1][E2] */
    var zs = H.deckZ(18.0);
    cylZ(THREE, g, 1.2, 1.3, 0.7, 16, T.sup, 18.0, 0, zs + 0.3);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(18.0, 0, zs + 0.65); gun3in50(THREE, tw, T, false);

    var root = bake(THREE, g);
    bakeGroup(THREE, tw); root.add(tw);
    return root;
  }

  /* ================================= merging into a called module's meshes */
  function meshesByName(G) {
    var o = {};
    G.children.forEach(function (c) { if (c.isMesh && c.name) o[c.name] = c; });
    return o;
  }
  /* append a baked group's geometry onto the parent's mesh of the same
     material (both non-indexed), so the draw call count does not grow */
  function mergeInto(THREE, G, baked) {
    var byMat = {};
    G.children.forEach(function (c) { if (c.isMesh && !c.geometry.index) byMat[c.material.uuid] = c; });
    baked.children.slice().forEach(function (m) {
      var t = byMat[m.material.uuid];
      if (!t) { G.add(m); return; }
      ["position", "normal", "uv"].forEach(function (k) {
        var a = t.geometry.getAttribute(k), b = m.geometry.getAttribute(k);
        var n = new Float32Array(a.array.length + b.array.length);
        n.set(a.array, 0); n.set(b.array, a.array.length);
        t.geometry.setAttribute(k, new THREE.Float32BufferAttribute(n, a.itemSize));
      });
      t.geometry.computeBoundingBox(); t.geometry.computeBoundingSphere();
    });
  }

  /* ========================================== CHENG KUNG (Perry, called) */
  /* the Perry module's own plan convention, from its header: f = feet aft
     of the forward perpendicular (frame 195 is x = 0), heights in feet
     above the baseline, design waterline 14 ft 4 in; the deckhouse roof
     rises 48.35 ft at frame 329.5 to 51.0 ft at frame 100              */
  var FT = 0.3048;
  function PX(f) { return (195 - f) * FT; }
  function PZ(ft) { return (ft - 14.3) * FT; }
  function proof(f) { return PZ(48.35 + (329.5 - f) * (51.0 - 48.35) / 229.5); }

  /* HF-II quadruple box launcher, canisters 2 x 2, the open ends along +X,
     elevated EL [C2] */
  function hf2(THREE, g, T, EL) {
    box(THREE, g, 2.0, 2.2, 0.25, T.sup, 0, 0, 0.12);
    box(THREE, g, 0.4, 1.8, 1.6, T.metal, -0.9, 0, 1.0);
    box(THREE, g, 0.3, 1.8, 0.7, T.metal, 1.0, 0, 0.55);
    var c = new THREE.Group(); c.position.set(0.2, 0, 1.7); c.rotation.y = -EL;
    for (var a = -1; a <= 1; a += 2) for (var b = -1; b <= 1; b += 2) {
      box(THREE, c, 5.4, 0.74, 0.74, T.sup, 0.6, a * 0.4, b * 0.4);
      box(THREE, c, 0.06, 0.64, 0.64, T.dark, 3.31, a * 0.4, b * 0.4);
    }
    for (var r = 0; r < 3; r++) box(THREE, c, 0.12, 1.66, 1.66, T.metal, -1.4 + r * 2.0, 0, 0);
    g.add(c);
  }
  /* Bofors 40 mm L/70 in its domed cupola [C1] */
  function bofors70(THREE, g, T) {
    cylZ(THREE, g, 1.0, 1.1, 0.4, 16, T.sup, 0, 0, 0.2);
    var d = new THREE.SphereGeometry(1.15, 16, 8, 0, PI * 2, 0, PI / 2); d.rotateX(PI / 2); d.scale(1.15, 1.0, 1.0);
    var dm = new THREE.Mesh(d, T.sup); dm.position.set(0, 0, 0.4); g.add(dm);
    box(THREE, g, 0.5, 0.5, 0.5, T.dark, 1.15, 0, 0.75);
    cylX(THREE, g, 0.06, 0.07, 2.6, 8, T.gun, 2.5, 0, 0.8, true);
    cylX(THREE, g, 0.1, 0.1, 0.35, 8, T.gun, 3.7, 0, 0.8);
  }

  function buildChengKung(THREE, M, C) {
    var G = HeroPerryFFG.build(THREE, M, C, { longHull: true, ciws: true });
    var by = meshesByName(G);
    /* draw the additions in the Perry's own materials */
    var T = {
      sup: by.sup.material, metal: by.metal.material, dark: by.dark.material,
      gun: by.metal.material, rad: by.rad.material, team: by.team.material
    };
    var g = new THREE.Group();
    /* two HF-II quads between the SPS-49 foremast and the mainmast, one
       trained to starboard and one to port [C1][C2] */
    var la = new THREE.Group(); la.position.set(PX(151.5), 0, proof(151.5)); la.rotation.z = -PI / 2;
    hf2(THREE, la, T, 0.52); g.add(la);
    var lb = new THREE.Group(); lb.position.set(PX(159.5), 0, proof(159.5)); lb.rotation.z = PI / 2;
    hf2(THREE, lb, T, 0.52); g.add(lb);
    /* the Bofors 40 mm L/70 on the hangar roof, to port, abaft the stack */
    var XB = PX(294), bg = new THREE.Group(); bg.position.set(XB, 2.9, proof(294)); bg.rotation.z = 0.6;
    bofors70(THREE, bg, T); g.add(bg);
    box(THREE, g, 1.6, 0.9, 0.04, T.team, PX(160), 0, proof(160) + 0.03);
    mergeInto(THREE, G, bake(THREE, g));
    G.userData.len = 138.1;
    return G;
  }

  /* ============================================ KEE LUNG (Kidd topsides) */
  function buildKeeLung(THREE, M, C) {
    var S = HeroSpruanceDD.build(THREE, M, C);
    var by = meshesByName(S), keep = [], tw = null;
    S.children.forEach(function (c) {
      if (c.name === "hull" || c.name === "deck" || c.name === "helipad") keep.push(c);
      if (c.name === "turret") { keep.push(c); tw = c; }
    });
    var T = {
      sup: by.sup.material, pad: by.pad.material, rad: by.rad.material, dark: by.dark.material,
      metal: by.metal.material, gun: by.metal.material, team: by.team.material, glass: by.glass.material,
      deck: by.deck.material
    };
    /* the deck height along the centreline, read off the kept deck ribbon
       (7 points across each station, the middle one on the centreline) */
    var dp = by.deck.geometry.getAttribute("position"), DKX = [], i, s;
    for (i = 3; i < dp.count; i += 7) DKX.push([dp.getX(i), dp.getZ(i)]);
    function deckAt(x) {
      if (x <= DKX[0][0]) return DKX[0][1];
      for (var k = 1; k < DKX.length; k++) if (x <= DKX[k][0]) {
        var f = (x - DKX[k - 1][0]) / (DKX[k][0] - DKX[k - 1][0]);
        return DKX[k - 1][1] + (DKX[k][1] - DKX[k - 1][1]) * f;
      }
      return DKX[DKX.length - 1][1];
    }
    var G = new THREE.Group();
    keep.forEach(function (c) { S.remove(c); G.add(c); });
    var g = new THREE.Group();

    /* the levels and plans of the Spruance hero (its r06, matched by [K1]) */
    var Z01 = 10.5, Z02 = 13.1, Z03 = 15.6, Z3F = 16.3, ZBR = 19.6, ZF = 10.7;
    var FD0 = -58.6, FD1 = -36.0, FDW = 7.4;
    /* flight deck block, its after corners cut, the pad on its roof [K2] */
    var FDP = [[FD0, -FDW + 2.2], [FD0 + 2.2, -FDW], [FD1, -FDW], [FD1, FDW], [FD0 + 2.2, FDW], [FD0, FDW - 2.2]];
    polyPrism(THREE, g, T.sup, FDP, 6.6, ZF - 0.02);
    (function () {
      var pos = [], uv = [], q, c0 = [(FD0 + FD1) * 0.5, 0];
      function P(p) { pos.push(p[0], p[1], ZF); uv.push((p[0] - FD0) / (FD1 - FD0), (p[1] + FDW) / (2 * FDW)); }
      for (q = 0; q < FDP.length; q++) { P(c0); P(FDP[q]); P(FDP[(q + 1) % FDP.length]); }
      g.add(new THREE.Mesh(geoOf(THREE, pos, uv), T.pad));
    })();
    var rg = new THREE.RingGeometry(5.0, 5.65, 36);
    var rm = new THREE.Mesh(rg, T.team); rm.position.set(-48.6, 0, ZF + 0.03); g.add(rm);
    roofRail(THREE, g, { metal: T.metal }, [[FD0 + 2.4, FDW], [FD1, FDW]], ZF, 0.5);
    roofRail(THREE, g, { metal: T.metal }, [[FD0 + 2.4, -FDW], [FD1, -FDW]], ZF, 0.5);

    /* the hangar, the small house on its roof, the after stack (starboard) */
    polyPrism(THREE, g, T.sup, rect(FD1, -7.0, -17.4, 7.0), 6.6, Z03);
    box(THREE, g, 0.06, 9.6, 4.75, T.dark, FD1 - 0.02, 0, ZF + 2.4);
    for (i = 1; i < 10; i++) box(THREE, g, 0.08, 9.5, 0.06, T.metal, FD1 - 0.05, 0, ZF + i * 0.47);
    roofRail(THREE, g, { metal: T.metal }, [[FD1 + 0.2, 6.8], [-17.6, 6.8]], Z03, 0.9);
    roofRail(THREE, g, { metal: T.metal }, [[FD1 + 0.2, -6.8], [-17.6, -6.8]], Z03, 0.9);
    polyPrism(THREE, g, T.sup, rect(-27.0, 0.6, -17.6, 6.2), Z03, 18.0);
    function stack(x, y, ax, ay, z0, zb, z1) {
      var pts = [], k;
      for (k = 0; k < 16; k++) {
        var an = 2 * PI * k / 16, c = Math.cos(an), sn = Math.sin(an);
        pts.push([x + ax * Math.sign(c) * Math.pow(Math.abs(c), 0.35), y + ay * Math.sign(sn) * Math.pow(Math.abs(sn), 0.35)]);
      }
      polyPrism(THREE, g, T.sup, pts, z0, zb);
      polyPrism(THREE, g, T.dark, pts.map(function (p) { return [x + (p[0] - x) * 0.97, y + (p[1] - y) * 0.96]; }), zb, z1);
      [[-0.45, -0.42], [-0.45, 0.42], [0.45, -0.42], [0.45, 0.42]].forEach(function (p) {
        cylZ(THREE, g, 0.62, 0.66, 0.55, 12, T.dark, x + p[0] * ax * 1.15, y + p[1] * ay * 1.15, z1 + 0.22);
      });
    }
    stack(-22.4, -2.85, 4.1, 2.5, Z03, 22.4, 24.0);

    /* the 01 house, the boat notch, the 02 and 03 levels, the forward
       stack (port) */
    polyPrism(THREE, g, T.sup, rect(-9.4, -7.1, 16.2, 7.1), 6.6, Z01);
    polyPrism(THREE, g, T.sup, rect(-17.4, -5.3, -9.4, 5.3), 6.6, Z01);
    polyPrism(THREE, g, T.sup, rect(-9.2, -6.0, 16.2, 6.0), Z01, Z02);
    polyPrism(THREE, g, T.sup, rect(1.5, -5.4, 16.2, 6.0), Z02, Z3F);
    polyPrism(THREE, g, T.sup, rect(-0.6, -5.4, 1.6, -0.4), Z02, Z3F);
    roofRail(THREE, g, { metal: T.metal }, [[-9.0, 5.8], [1.4, 5.8]], Z02, 0.9);
    roofRail(THREE, g, { metal: T.metal }, [[-9.0, -5.8], [-0.7, -5.8]], Z02, 0.9);
    stack(7.4, 2.85, 4.3, 2.55, Z3F, 22.9, 24.6);

    /* the house abaft the mainmast that carries the after SPG-51 [K1] */
    polyPrism(THREE, g, T.sup, rect(-19.0, -3.2, -14.0, 3.2), Z01, 22.6);
    cylZ(THREE, g, 0.5, 0.6, 1.2, 10, T.sup, -16.5, 0, 23.2);
    var d51a = new THREE.Group(); d51a.position.set(-16.5, 0, 24.6); d51a.rotation.z = PI;
    box(THREE, d51a, 1.0, 1.3, 0.8, T.sup, 0, 0, 0);
    dish(THREE, d51a, T.rad, 1.3, 0.75, 0, 0.6, 0.1); g.add(d51a);

    /* the bridge block: one tall slab to the pilot house roof, window band,
       wings [K1] */
    var FB = chamf(16.2, -7.6, 31.0, 7.6, 0.9);
    polyPrism(THREE, g, T.sup, FB, 6.6, ZBR);
    hexa(THREE, g, T.glass, [[31.0, -5.6, 17.9], [31.07, -5.6, 17.9], [31.07, 5.6, 17.9], [31.0, 5.6, 17.9],
                             [31.0, -5.6, 18.8], [31.07, -5.6, 18.8], [31.07, 5.6, 18.8], [31.0, 5.6, 18.8]]);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 11.0, 0.07, 0.9, T.glass, 24.0, s * 7.62, 18.35);
      box(THREE, g, 2.6, 1.0, 0.22, T.sup, 27.6, s * 8.1, 17.5);
    }
    roofRail(THREE, g, { metal: T.metal }, [[16.4, 7.4], [30.1, 7.4], [30.8, 6.7], [30.8, -6.7], [30.1, -7.4], [16.4, -7.4]], ZBR, 1.0);

    /* the foremast: four-legged lattice off the pilot house roof [K1] */
    var fm = latticeMast(THREE, g, T.sup, 17.0, 24.0, 3.4, ZBR, 19.2, 22.6, 1.1, 40.5, 7, 0.14, 0.06);
    platform(THREE, g, T, 18.6, -4.2, 26.6, 4.2, 31.0, true);
    platform(THREE, g, T, 22.6, -1.9, 27.0, 1.9, 27.0, true);
    sphere(THREE, g, 1.4, T.rad, 25.0, 0, 28.6);                      /* SPQ-9A radome   */
    platform(THREE, g, T, 18.4, -3.6, 24.0, 3.6, 40.5, true);
    platform(THREE, g, T, 22.0, -1.6, 25.4, 1.6, 34.7, true);
    strut(THREE, g, T.sup, 20.9, 0, 40.5, 20.9, 0, 50.0, 0.2, 6);
    box(THREE, g, 0.14, 7.0, 0.14, T.metal, 20.9, 0, 43.5);
    cylZ(THREE, g, 0.4, 0.45, 0.8, 10, T.dark, 20.9, 0, 45.6);
    /* the SPS-49(V)5 open mesh on its pedestal forward of the mast [K1] */
    cylZ(THREE, g, 0.35, 0.45, 0.8, 10, T.metal, 23.7, 0, 35.1);
    (function () {
      var a = new THREE.Group(); a.position.set(23.7, 0, 36.6); a.rotation.z = 0.5;
      var q;
      for (q = -4; q <= 4; q++) box(THREE, a, 0.08, 0.06, 1.9, T.dark, 0.25 - 0.012 * q * q, q * 0.8, 0);
      for (q = -1; q <= 1; q++) box(THREE, a, 0.08, 7.0, 0.06, T.dark, 0.1, 0, q * 0.8);
      strut(THREE, a, T.dark, 0.2, 0, 0, 1.6, 0, -0.2, 0.05, 4);
      g.add(a);
    })();
    /* the forward SPG-51D on the bridge roof, ahead of the foremast */
    cylZ(THREE, g, 0.5, 0.65, 2.4, 10, T.sup, 29.0, 0, ZBR + 1.2);
    var d51f = new THREE.Group(); d51f.position.set(29.0, 0, ZBR + 2.8);
    box(THREE, d51f, 1.0, 1.3, 0.8, T.sup, 0, 0, 0);
    dish(THREE, d51f, T.rad, 1.3, 0.75, 0, 0.6, 0.1); g.add(d51f);
    /* the forward Phalanx on the pilot house roof, to starboard [K1] */
    cylZ(THREE, g, 1.1, 1.2, 1.4, 14, T.sup, 23.0, -5.6, ZBR + 0.7);
    var p1 = new THREE.Group(); p1.position.set(23.0, -5.6, ZBR + 1.4); p1.rotation.z = -0.5; phalanx(THREE, p1, T); g.add(p1);

    /* the mainmast: lattice off the 01 roof, the SPS-48E on its platform
       abaft it, the top platform and pole [K1] */
    latticeMast(THREE, g, T.sup, -13.1, -6.5, 3.6, Z01, -10.4, -6.8, 1.1, 44.5, 8, 0.14, 0.06);
    platform(THREE, g, T, -16.4, -2.8, -9.6, 2.8, 35.5, true);
    platform(THREE, g, T, -12.6, -4.6, -5.2, 4.6, 30.8, true);
    platform(THREE, g, T, -11.0, -3.0, -6.2, 3.0, 44.5, true);
    strut(THREE, g, T.sup, -8.6, 0, 44.5, -8.6, 0, 50.0, 0.2, 6);
    box(THREE, g, 0.14, 7.0, 0.14, T.metal, -8.6, 0, 46.8);
    cylZ(THREE, g, 0.42, 0.42, 1.0, 10, T.dark, -8.6, 0, 48.0);
    cylZ(THREE, g, 0.6, 0.75, 1.0, 10, T.sup, -13.0, 0, 36.0);
    (function () {
      var a = new THREE.Group(); a.position.set(-13.0, 0, 39.6); a.rotation.z = 0.25;
      var p = new THREE.Group(); p.rotation.x = 0.22;
      box(THREE, p, 5.4, 0.45, 6.2, T.dark, 0, 0, 0);
      box(THREE, p, 5.0, 0.6, 0.25, T.metal, 0, 0.1, -3.0);
      a.add(p);
      box(THREE, a, 1.2, 1.4, 1.2, T.sup, 0, 0.8, -2.8);
      g.add(a);
    })();

    /* Harpoons (2 x 4) on the 02 roof abaft the forward stack, trained
       outboard [K1][K2] */
    for (s = -1; s <= 1; s += 2) {
      var hp = new THREE.Group(); hp.position.set(-2.6, s * 3.0, Z02); hp.rotation.z = s > 0 ? PI / 2 - 0.45 : -PI / 2 + 0.45;
      box(THREE, hp, 2.4, 1.7, 0.2, T.sup, 0.3, 0, 0.1);
      box(THREE, hp, 0.22, 1.5, 1.85, T.metal, -0.75, 0, 1.0);
      var cn = new THREE.Group(); cn.position.set(0.6, 0, 2.2); cn.rotation.y = -0.61;
      for (var a2 = -1; a2 <= 1; a2 += 2) for (var b2 = -1; b2 <= 1; b2 += 2)
        cylX(THREE, cn, 0.27, 0.27, 4.6, 8, T.sup, 0, a2 * 0.36, b2 * 0.36);
      hp.add(cn); g.add(hp);
    }
    /* the after Phalanx on the 03 roof to starboard of the forward stack */
    var p2 = new THREE.Group(); p2.position.set(0.5, -3.0, Z3F); p2.rotation.z = -1.6; phalanx(THREE, p2, T); g.add(p2);

    /* the whaleboats in the notch under the mainmast */
    for (s = -1; s <= 1; s += 2) {
      boat(THREE, g, T, -13.5, s * 6.6, Z01 - 0.3, 7.6, 2.3);
      for (i = -1; i <= 1; i += 2) {
        strut(THREE, g, T.metal, -13.5 + i * 2.6, s * 5.0, Z01, -13.5 + i * 2.6, s * 5.3, 13.6, 0.12, 5);
        strut(THREE, g, T.metal, -13.5 + i * 2.6, s * 5.3, 13.5, -13.5 + i * 2.6, s * 6.6, 13.9, 0.09, 5);
      }
    }

    /* the Mk 26 twin-arm launchers: deck ring, trainer, two arms, both
       loaded as [K1] shows them; forward trained forward, after aft */
    function mk26(x, yaw) {
      var z = deckAt(x);
      cylZ(THREE, g, 2.3, 2.4, 0.3, 24, T.sup, x, 0, z + 0.1);
      cylZ(THREE, g, 1.7, 1.7, 0.06, 24, T.dark, x, 0, z + 0.28);
      var L = new THREE.Group(); L.position.set(x, 0, z + 0.3); L.rotation.z = yaw;
      cylZ(THREE, L, 0.75, 0.95, 1.5, 14, T.sup, 0, 0, 0.75);
      box(THREE, L, 1.2, 2.6, 0.7, T.sup, 0, 0, 1.75);
      for (var q = -1; q <= 1; q += 2) {
        var arm = new THREE.Group(); arm.position.set(0, q * 1.05, 1.95); arm.rotation.y = -1.13;
        box(THREE, arm, 3.6, 0.35, 0.5, T.sup, 0.8, 0, 0.3);
        cylX(THREE, arm, 0.17, 0.17, 4.5, 10, T.rad, 0.9, 0, -0.1);
        var cone = new THREE.CylinderGeometry(0.0, 0.17, 0.7, 10); cone.rotateZ(-PI / 2);
        var cm = new THREE.Mesh(cone, T.rad); cm.position.set(3.5, 0, -0.1); arm.add(cm);
        for (var f = 0; f < 4; f++) {
          var fin = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.5), T.rad);
          fin.position.set(-1.0, 0, -0.1); fin.rotation.x = f * PI / 4; arm.add(fin);
        }
        L.add(arm);
      }
      g.add(L);
    }
    mk26(37.0, 0);
    mk26(-62.4, PI);

    /* the after Mk 45: the same mount as the forward turret, a clone,
       trained aft on the fantail [K1][K2] */
    var aft = tw.clone(); aft.name = "gun_aft";
    aft.position.set(-71.3, 0, deckAt(-71.3)); aft.rotation.z = PI; g.add(aft);

    /* (detail pass) fittings round the called hull, which keeps only its
       hull, deck and pad here: the guard rails along both deck edges, the
       toe rail, bollards and fairleads, the anchors in their hawses and
       the windlasses, hatches and vents on the fo'c'sle and the fantail,
       raft canisters along the 01 level, ladders, whips on the wings.
       The deck edge is read off the kept deck ribbon (its outer points),
       the hull's half breadth below it off the kept hull's triangles.   */
    var EDG = [];
    for (i = 0; i + 6 < dp.count; i += 7) EDG.push([dp.getX(i), Math.abs(dp.getY(i)), dp.getZ(i)]);
    EDG.sort(function (a, b) { return a[0] - b[0]; });
    function edgeAt(x) {
      if (x <= EDG[0][0]) return EDG[0];
      for (var k = 1; k < EDG.length; k++) if (x <= EDG[k][0]) {
        var f = (x - EDG[k - 1][0]) / ((EDG[k][0] - EDG[k - 1][0]) || 1);
        return [x, EDG[k - 1][1] + (EDG[k][1] - EDG[k - 1][1]) * f, EDG[k - 1][2] + (EDG[k][2] - EDG[k - 1][2]) * f];
      }
      return EDG[EDG.length - 1];
    }
    var hp0 = by.hull.geometry.getAttribute("position");
    function hullY(x, z) {
      var best = 0, q, e;
      for (q = 0; q + 2 < hp0.count; q += 3) {
        var P = [0, 1, 2].map(function (o) { return [hp0.getX(q + o), hp0.getY(q + o), hp0.getZ(q + o)]; });
        var mnx = Math.min(P[0][0], P[1][0], P[2][0]), mxx = Math.max(P[0][0], P[1][0], P[2][0]);
        if (x < mnx || x > mxx || mxx - mnx < 1e-6) continue;
        var pts = [];
        for (e = 0; e < 3; e++) {
          var A = P[e], Bq = P[(e + 1) % 3];
          if ((A[0] - x) * (Bq[0] - x) <= 0 && A[0] !== Bq[0]) { var t = (x - A[0]) / (Bq[0] - A[0]); pts.push([A[1] + (Bq[1] - A[1]) * t, A[2] + (Bq[2] - A[2]) * t]); }
        }
        if (pts.length < 2) continue;
        var a = pts[0], b = pts[1];
        if ((a[1] - z) * (b[1] - z) > 0 || a[1] === b[1]) continue;
        var yy = Math.abs(a[0] + (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]));
        if (yy > best) best = yy;
      }
      return best;
    }
    var xa = EDG[0][0] + 0.6, xb = EDG[EDG.length - 1][0] - 1.5;
    var fm2 = new FK.Sink(), fd2 = new FK.Sink(), fs2 = new FK.Sink(), fw2 = new FK.Sink();
    for (s = -1; s <= 1; s += 2) {
      var rp = [], tp = [], xq, e2;
      for (xq = xa; xq <= xb; xq += 2.0) { e2 = edgeAt(xq); rp.push([xq, s * (e2[1] - 0.2), e2[2]]); tp.push([xq, s * (e2[1] - 0.05), e2[2] + 0.05]); }
      FK.rail(fm2, rp, 1.0, 1.8, 0.03);
      FK.toe(fd2, tp, 0.06);
      [76.0, 58.0, 40.0, -30.0, -66.0, -80.0].forEach(function (bx) {
        var eb = edgeAt(bx); FK.bollard(fm2, bx, s * (eb[1] - 0.9), eb[2], 0, 1.0);
      });
      [79.0, 61.0, 43.0, -33.0, -69.0, -83.0].forEach(function (fx) {
        var ef = edgeAt(fx), en = edgeAt(fx + 1);
        FK.fairlead(fm2, fx, s * (ef[1] - 0.3), ef[2], Math.atan2(s * (en[1] - ef[1]), 1), 1.0);
      });
      var ha = 68.0, hz = edgeAt(ha)[2] - 2.2, hy = hullY(ha, hz);
      if (hy > 0.5) {
        FK.anchor(fm2, ha, s * (hy + 0.03), hz, [0.3, s, 0.25], 1.3);
        FK.tube(fd2, [ha, s * (edgeAt(ha)[1] - 0.6), edgeAt(ha)[2] + 0.05], [63.5, s * 1.4, deckAt(63.5) + 0.5], 0.07, 0.07, 4, false);
        FK.cylZ(fm2, 63.5, s * 1.4, deckAt(63.5), 0.65, 0.55, 12);
      }
      [-6.0, -3.5, 3.0, 5.5, 8.0].forEach(function (rx) { FK.raft(fw2, fm2, rx, s * 6.55, Z01, 0, 1.3, 0.3); });
      FK.ladder(fm2, [16.3, s * 6.4, 6.6], [16.3, s * 6.4, Z01 + 0.1], [0, 1, 0], 0.55, 0.3);
      FK.ladder(fm2, [-9.3, s * 5.6, Z01], [-9.3, s * 5.6, Z02 + 0.1], [0, 1, 0], 0.5, 0.3);
      FK.whip(fm2, 27.8, s * 8.5, 17.6, 7.0, 0.05);
      FK.whip(fm2, -34.0, s * 6.6, Z03, 6.0, 0.05);
      FK.mushroom(fs2, 50.0, s * 3.5, deckAt(50.0), 0.22, 0.7);
      FK.mushroom(fs2, -76.0, s * 4.0, deckAt(-76.0), 0.2, 0.65);
    }
    FK.hatch(fs2, 55.0, 0, deckAt(55.0), 1.2, 1.2, 0);
    FK.hatch(fs2, 46.0, 2.6, deckAt(46.0), 1.0, 1.0, 0);
    FK.hatch(fs2, -79.0, 0, deckAt(-79.0), 1.2, 1.2, 0);
    sinkOut(THREE, g, [[fm2, T.metal], [fd2, T.dark], [fs2, T.sup], [fw2, T.rad]]);

    /* team strips */
    box(THREE, g, 2.0, 1.0, 0.04, T.team, 22.0, 3.6, ZBR + 0.03);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, -25.0, 3.4, 18.03);

    var root = bake(THREE, g);
    root.children.slice().forEach(function (c) { G.add(c); });
    S.children.slice().forEach(function (c) { S.remove(c); });
    G.userData.len = 171.7;
    return G;
  }

  return { tanYang: buildTanYang, pce: buildPce, chengKung: buildChengKung, keeLung: buildKeeLung };
})();

/* Registration. len is the measured X extent (the published overall
   length for each). */
UNIT_MODELS["roc_e50_destroyer"] = {
  len: 118.5,
  build: function (THREE, M, C) { return HeroRocShips1.tanYang(THREE, M, C); }
};
UNIT_MODELS["roc_e50_corvette"] = {
  len: 56.24,
  build: function (THREE, M, C) { return HeroRocShips1.pce(THREE, M, C); }
};
UNIT_MODELS["roc_e60_corvette"] = {
  len: 56.24,
  build: function (THREE, M, C) { return HeroRocShips1.pce(THREE, M, C); }
};
/* needs js/hero/us_perry_ffg.js loaded first */
if (typeof HeroPerryFFG !== "undefined") {
  UNIT_MODELS["roc_e90_destroyer"] = {
    len: 138.1,
    build: function (THREE, M, C) { return HeroRocShips1.chengKung(THREE, M, C); }
  };
}
/* needs js/hero/us_spruance_dd.js loaded first */
if (typeof HeroSpruanceDD !== "undefined") {
  UNIT_MODELS["roc_e00_destroyer"] = {
    len: 171.7,
    build: function (THREE, M, C) { return HeroRocShips1.keeLung(THREE, M, C); }
  };
}
