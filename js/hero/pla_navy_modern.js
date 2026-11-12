/* ==================== js/hero/pla_navy_modern.js ========================
   HERO MODELS -- the modern PLA Navy: four ships and a submarine in one
   file, sharing one kit (copied from js/hero/pla_type056.js) and one
   lofted-hull builder.  Keys and what each draws:

     destroyer_c   Type 052D (Luyang III) destroyer, drawn as Guiyang (119),
                   an original short-deck 052D (not the lengthened 052DL).
     cruiser_c     Type 055 (Renhai) large destroyer, drawn as Nanchang (101)
                   and Lhasa (102).
     ssbn_c        Type 094 (Jin) SSBN, drawn as the ORIGINAL 094 (the row
                   says "094A from 2018"; every reference found shows the
                   094: a sail with a straight vertical leading edge and no
                   fairing at its foot, a hump with twelve hatches).
     carrier_c     Type 003 Fujian (CV-18) aircraft carrier.
     pla_e80_lst   Type 072 (Yukan) tank landing ship: HELD UNREGISTERED,
                   see the foot of the file.

   The 052D is a different ship from the 052B that js/hero/pla_e00_destroyer.js
   draws (flat array faces, 64 cells, the 130 mm gun), and that file exports
   only build(), so the 052D is built new here (policy 5 has nothing to reuse).

   PUBLISHED FIGURES (en.wikipedia, raw wikitext read 2026-11-04):
     052D  length 156 m (CCTV) - 157 m (Jane's 2015-16), beam 17 m (Jane's)
           - 18 m (CCTV), draught 6 m, 7,500 t; 1 x 130 mm gun, 64 VLS cells,
           HHQ-10 (24 cells), Type 730 CIWS, Type 346A AESA, a Z-9 hangar.
     055   length 180 m, beam 20 m, draught 6.6 m, 12-13,000 t full load;
           112 VLS cells, 130 mm gun, H/PJ-11 CIWS, HHQ-10, Type 346B,
           hangar for two helicopters.
     094   length 137 m, beam 13 m, 8,000 t surfaced (SCMP 2025); 12 JL-2 or
           JL-3 SLBM.
     003   length 316 m, beam 76 m (CSIS estimate), 80-85,000 t; three
           electromagnetic catapults, an angled deck, two starboard lifts,
           HHQ-10 and Type 1130 CIWS.

   REFERENCES (Wikimedia Commons, fetched at 900-1600 px; grids laid over
   them with PIL, scratchpad/q_plnm_ref):
     [D1] "PLANS Guiyang (DDG-119) 20200428.jpg" (Japan MoD) -- 052D, PORT
          broadside from slightly above, bow left, 1600 x 507.  Stem x 38,
          transom x 1545: 1507 px = 157 m, 9.6 px/m.  The camera is about
          12.4 deg up (the pad shows 33 px deep on 16 m), so a roof's top
          silhouette is its FAR edge; heights are read at the NEAR walls'
          top edges instead (see the 052D block).  Waterline from the boot
          topping, rows 417.5 (x 300) to 428 (x 1500).  Every 052D station
          and height is read off it.
     [D2] "PLANS Taiyuan (DDG-131) 20210427.png" -- a 052DL from starboard:
          the starboard side is the port side mirrored; not used for the
          stations (the 052DL is longer aft).
     [D3] "CNS Kunming (DDG-172) docks at a harbor on Changxing Island 2.jpg"
          -- 052D from the starboard bow, level: the forward array face is a
          flat panel on the forward CORNER of the bridge block directly
          under the bridge windows, its lower corner rounded; the big black
          anchor recess in the bow flare; the bulwark round the forecastle.
     [C1] "PLANS Nanchang (DDG-101) 20210427.jpg" (Japan MoD) -- 055,
          STARBOARD broadside from about 19 deg up, bow right, 1600 x 488.
          Transom x 105, stem x 1545: 1440 px = 180 m, 8.0 px/m.  Stations.
     [C2] "PLANS Lhasa (DDG-102) 20240701.jpg" (Japan MoD) -- 055, port
          broadside, nearly level (about 9 deg), soft, 887 x 251: bow x 30,
          stern x 830, 4.44 px/m.  Too soft to read wall edges: used for the
          order and the outline only; the 055's heights come off [C1]'s
          near walls (policy 2: one photograph), see the 055 block.
     [S1] "Jin class SSBN.svg" -- the en.wikipedia profile of the 094 at
          1404 px: screw tip x 0 to bow x 1389 = 137 m, 10.14 px/m; the
          green/red boot line (row 149 aft to 157 forward) is taken as the
          surfaced waterline.  The hull's top and keel, the hump, the sail,
          the rudders and the screw are read column by column.
     [S2] "Jin (Type 094) Class Ballistic Missile Submarine.JPG" -- two 094s
          alongside at Xiaopingdao: matt black all over, the twelve hatches
          in two rows of six (open in the photo; drawn shut), the sail planes
          high on the forward half of the sail, the free-flood holes along
          the side of the hump, the sail's straight front.
     [F1] "Type 003 Aircraft Carrier Fujian (18).svg" -- plan view, bow up,
          464 x 1449 px.  1447 px = 316 m (published): 4.58 px/m.  The deck
          outline, island, lifts, angled deck, wires, catapults and spots.
          At that scale its main deck is 80.6 m across, not the published
          76: the two published figures disagree with the drawing's own
          ratio and the published LENGTH is used (see the carrier notes).
     [F2] "PLAN CV-18 Fujian 20250911.jpg" (Japan MoD) -- PORT broadside,
          bow left, about 4.5 deg up, 1852 x 515: deck front x 65, stern
          x 1778, 5.42 px/m.  Every height on the carrier: the flight deck,
          the island tiers, the array face, the mast, the bow overhang.

   NOT CONFIRMED (all ships) -- estimated from proportions, not measured:
     - every plan width of a superstructure block (the photographs are side
       views); the chamfers are what the 3/4 views [D3][C1] suggest;
     - every underwater part (keel lines, bilges, shafts, screws, rudders):
       only the published draughts are known;
     - heights carry about +-0.7 m (reading a wall's top edge on a
       photograph taken from above); the 130 mm gun houses (2.0 / 2.3 m
       over the deck) read low and are drawn as measured.
   No pennant numbers, names, flags, stars or deck lettering on any ship.

   MODEL SPACE: +X bow, +Y port, +Z up, metres, WATERLINE z = 0 (the
   submarine at its surfaced trim, as js/hero/ru_kilo.js and pla_yuan.js).
   The two rows with turret:true (destroyer_c, cruiser_c) have the 130 mm
   gun as the group named "turret"; the rest is baked one mesh per
   material.  The surface combatants carry a hidden "helipad" node on the
   middle of the pad, as pla_type056.js does.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPLANModern = (function () {
  "use strict";
  var PI = Math.PI;

  /* ================================================================ KIT
     (from js/hero/pla_type056.js: textures, materials, primitives, the
     faceted frustum, the chamfered plan, the ring loft and the baker) */
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
  /* hull plating: one tile is 24 m x 8 m; a welded stealth hull shows few seams */
  function hullTex(THREE) {
    return canvasTex(THREE, "pnmHull", 512, 256, function (g, w, h) {
      var R = rng(5205), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.08; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke(); }
      for (i = 0; i < 4; i++) { var xx = i * w / 4 + (i % 2) * 22; g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke(); }
      g.globalAlpha = 0.06;
      for (i = 0; i < 40; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 2 + R() * 4, 16 + R() * 70); }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "pnmPlate", 256, 256, function (g, w, h) {
      var R = rng(5217), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.06;
      for (i = 0; i < 26; i++) { g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000"; g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30); }
      g.globalAlpha = 1;
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "pnmDeck", 256, 256, function (g, w, h) {
      var R = rng(5211), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.10; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, i * h / 6); g.lineTo(w, i * h / 6); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  /* louvres, glazing backs, cell covers, recesses: dark grille bars */
  function grilleTex(THREE) {
    return canvasTex(THREE, "pnmGrille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }
  /* the submarine's anechoic tiles: a staggered grid, faint on matt black [S2] */
  function tileTex(THREE) {
    return canvasTex(THREE, "pnmTile", 256, 256, function (g, w, h) {
      var i, j;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (j = 0; j < 8; j++) {
        g.beginPath(); g.moveTo(0, j * h / 8); g.lineTo(w, j * h / 8); g.stroke();
        for (i = 0; i < 6; i++) {
          var xx = i * w / 6 + (j % 2) * w / 12;
          g.beginPath(); g.moveTo(xx, j * h / 8); g.lineTo(xx, (j + 1) * h / 8); g.stroke();
        }
      }
      g.globalAlpha = 1;
    });
  }

  /* paint: the light PLAN grey of [D1][C1] (as pla_type056.js), the carrier
     a shade darker [F2]; red boot topping and bottom [D1][C1] */
  var PAINT = { hull: 0x8c959b, sup: 0x959ea3, deck: 0x50575c };
  function makeMats(THREE, C, P) {
    P = P || PAINT;
    var team = (C && C.team) || 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:  skin(P.hull, hullTex(THREE), 0.86),
      under: skin(0x4a1c16, hullTex(THREE), 0.9),
      sup:   skin(P.sup, plateTex(THREE), 0.86),
      deck:  skin(P.deck, deckTex(THREE), 0.95),
      dark:  skin(0xffffff, grilleTex(THREE), 0.9),
      white: skin(0xc9ccca, plateTex(THREE), 0.8),
      array: skin(0x6c757b, plateTex(THREE), 0.7),
      tile:  skin(0x2a2c2e, tileTex(THREE), 0.95),
      team:  skin(team, plateTex(THREE), 0.84),
      metal: metal(0x5c636a, 0.52, 0.55),
      gun:   metal(0x6d757a, 0.48, 0.45),
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

  /* ------------------------------------------------------------ helpers */
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
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  function sphere(THREE, p, r, m, x, y, z, ws, hs) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, ws || 12, hs || 8), m);
    s.position.set(x, y, z); p.add(s); return s;
  }
  /* a faceted solid between two convex polygons (CCW from above) */
  function frustum(THREE, p, m, lo, z0, hi, z1) {
    var pos = [], uv = [], n = lo.length, i, a, b, c, d;
    function tri(P, Q, R, side) {
      var v = [P, Q, R], k;
      for (k = 0; k < 3; k++) {
        pos.push(v[k][0], v[k][1], v[k][2]);
        if (side) uv.push((v[k][0] + v[k][1]) * 0.16, v[k][2] * 0.16); else uv.push(v[k][0] * 0.16, v[k][1] * 0.16);
      }
    }
    for (i = 1; i < n - 1; i++) {
      tri([hi[0][0], hi[0][1], z1], [hi[i][0], hi[i][1], z1], [hi[i + 1][0], hi[i + 1][1], z1], false);
      tri([lo[0][0], lo[0][1], z0], [lo[i + 1][0], lo[i + 1][1], z0], [lo[i][0], lo[i][1], z0], false);
    }
    for (i = 0; i < n; i++) {
      a = [lo[i][0], lo[i][1], z0]; b = [lo[(i + 1) % n][0], lo[(i + 1) % n][1], z0];
      c = [hi[(i + 1) % n][0], hi[(i + 1) % n][1], z1]; d = [hi[i][0], hi[i][1], z1];
      tri(a, b, c, true); tri(a, c, d, true);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  /* a plan rectangle x0..x1, half width hw, corners chamfered (cfa aft,
     cff forward); CCW from above.  Edge k runs from point k to k+1:
     0 starboard side, 1 starboard-forward corner, 2 front, 3 port-forward
     corner, 4 port side, 5 port-aft corner, 6 after face, 7 starboard-aft */
  function chamf(x0, x1, hw, cfa, cff) {
    return [[x0 + cfa, -hw], [x1 - cff, -hw], [x1, -hw + cff], [x1, hw - cff],
            [x1 - cff, hw], [x0 + cfa, hw], [x0, hw - cfa], [x0, -hw + cfa]];
  }
  /* a patch lying ON face k of a frustum (lo at z0, hi at z1), from
     fraction s0 to s1 along the edge and from height za to zb, stood off
     the face by off: the flat array faces, the glazing, the louvres */
  function facePatch(THREE, p, m, lo, z0, hi, z1, k, s0, s1, za, zb, off) {
    var n = lo.length, k1 = (k + 1) % n;
    function at(s, z) {
      var f = (z - z0) / (z1 - z0);
      var ax = lo[k][0] + (hi[k][0] - lo[k][0]) * f, ay = lo[k][1] + (hi[k][1] - lo[k][1]) * f;
      var bx = lo[k1][0] + (hi[k1][0] - lo[k1][0]) * f, by = lo[k1][1] + (hi[k1][1] - lo[k1][1]) * f;
      return [ax + (bx - ax) * s, ay + (by - ay) * s, z];
    }
    var ex = lo[k1][0] - lo[k][0], ey = lo[k1][1] - lo[k][1], L = Math.hypot(ex, ey) || 1;
    var nx = ey / L * off, ny = -ex / L * off;
    var A = at(s0, za), B = at(s1, za), Cc = at(s1, zb), D = at(s0, zb), pos = [], uv = [];
    [A, B, Cc, D].forEach(function (P) { P[0] += nx; P[1] += ny; });
    function q(P, Q, R) { pos.push(P[0], P[1], P[2], Q[0], Q[1], Q[2], R[0], R[1], R[2]); uv.push(0, 0, 1, 0, 1, 1); }
    q(A, B, Cc); q(A, Cc, D); q(A, Cc, B); q(A, D, Cc);
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  /* rings lofted along X (each ring a closed list of [y,z]); capped ends */
  function ringLoft(THREE, p, m, xs, rings, cap, uvs) {
    var pos = [], uv = [], idx = [], n = rings[0].length, i, j;
    for (i = 0; i < xs.length; i++) for (j = 0; j < n; j++) {
      pos.push(xs[i], rings[i][j][0], rings[i][j][1]); uv.push(xs[i] * (uvs || 0.2), j / n * (uvs ? 40 * uvs : 1));
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
  /* a flat plate in the XY plane from a plan polygon, at height z (both
     faces), and its edge band down to z - th */
  function plate(THREE, p, m, poly, z, th, mSide) {
    var shp = new THREE.Shape(), i, n = poly.length;
    shp.moveTo(poly[0][0], poly[0][1]);
    for (i = 1; i < n; i++) shp.lineTo(poly[i][0], poly[i][1]);
    var gT = new THREE.ShapeGeometry(shp); gT.translate(0, 0, z);
    var mT = new THREE.Mesh(gT, m); p.add(mT);
    if (th > 0) {
      var gB = new THREE.ShapeGeometry(shp); gB.rotateX(PI); gB.scale(1, -1, 1); gB.translate(0, 0, z - th);
      /* rotateX(PI) flips z and y; scale y back so the plan matches; the
         winding is now reversed, so the face looks down */
      p.add(new THREE.Mesh(gB, mSide || m));
      var pos = [], uv = [], s = 0;
      for (i = 0; i < n; i++) {
        var a = poly[i], b = poly[(i + 1) % n], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
        pos.push(a[0], a[1], z - th, b[0], b[1], z - th, b[0], b[1], z,
                 a[0], a[1], z - th, b[0], b[1], z, a[0], a[1], z);
        uv.push(s / 8, 0, (s + L) / 8, 0, (s + L) / 8, th / 8, s / 8, 0, (s + L) / 8, th / 8, s / 8, th / 8);
        s += L;
      }
      p.add(new THREE.Mesh(geoOf(THREE, pos, uv), mSide || m));
    }
    return mT;
  }
  function polyCCW(poly) {
    var a = 0, i;
    for (i = 0; i < poly.length; i++) { var p = poly[i], q = poly[(i + 1) % poly.length]; a += p[0] * q[1] - q[0] * p[1]; }
    return a >= 0 ? poly : poly.slice().reverse();
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
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 14, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    if (tilt) dg.rotateY(-tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }
  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 3.0));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.03, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.022, 3);
    }
  }

  /* ======================================================= LOFTED HULL
     The pla_type056.js hull generalised.  H.STA rows: x, half beam at the
     deck edge, half beam at the waterline, bottom z on the centreline,
     bilge fullness; H.deckZ(x) the deck-edge height; XS0/XS1 the transom
     and the stem head, XWL the stem at the waterline, XST the transom's
     foot; H.fl the flare exponent above the water (1 straight, >1 the
     concave flare that opens out near the deck), H.stemP the stem's. */
  function makeHull(H) {
    var STA = H.STA, deckZ = H.deckZ, XS0 = H.XS0, XS1 = H.XS1, XWL = H.XWL, XST = H.XST;
    function pick(x, k) {
      var i;
      if (x <= STA[0][0]) return STA[0][k];
      for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * f;
      }
      return STA[STA.length - 1][k];
    }
    function zBot(x) {
      if (x > XWL) return deckZ(XS1) * (x - XWL) / (XS1 - XWL);
      if (x < XST) return pick(XS0, 3) + (pick(XST, 3) - pick(XS0, 3)) * (x - XS0) / (XST - XS0);
      return pick(x, 3);
    }
    function W(x, z) {
      var zd = deckZ(x), bk = pick(x, 1), bw = pick(x, 2), zb = zBot(x);
      if (z > zd) z = zd;
      if (z <= zb) return 0;
      if (x > XWL) return bk * Math.pow((z - zb) / (zd - zb), H.stemP || 0.62);
      if (z >= 0) return bw + (bk - bw) * Math.pow(z / zd, H.fl || 1);
      var n = pick(x, 4), t = Math.min(1, z / zb);
      return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    }
    function halfTop(x) { return W(x, deckZ(x)); }
    function xs() {
      var a = [], x, i, st = H.step || 2.0;
      for (x = XS0; x < XS1 - 0.01; x += st) a.push(x);
      for (i = 0; i < STA.length; i++) a.push(STA[i][0]);
      for (x = XWL - 8; x < XS1; x += st / 2.5) a.push(x);
      (H.extra || []).forEach(function (v) { a.push(v); });
      a.push(XS1, XST);
      a.sort(function (p, q) { return p - q; });
      return a.filter(function (v, k) { return v >= XS0 && v <= XS1 && (k === 0 || v - a[k - 1] > 0.05); });
    }
    function shellBand(THREE, m, zlo, zhi, rows) {
      var X = xs(), pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
      for (s = -1; s <= 1; s += 2) {
        var base = pos.length / 3;
        for (i = 0; i < X.length; i++) {
          var x = X[i], zb = zBot(x), zd = deckZ(x);
          var a0 = Math.min(Math.max(zlo, zb), zd), b0 = Math.min(Math.max(zhi, zb), zd);
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
        if (cx * cx + cy * cy + cz * cz > 1e-8) keep.push(idx[i], idx[i + 1], idx[i + 2]);
      }
      return new THREE.Mesh(geoOf(THREE, pos, uv, keep), m);
    }
    function deckSheet(THREE, m, xa, xb) {
      var X = xs().filter(function (v) { return v >= xa - 1e-6 && v <= xb + 1e-6; });
      var pos = [], uv = [], idx = [], i, j, NC = 4;
      for (i = 0; i < X.length; i++) {
        var x = X[i], w = halfTop(x), z = deckZ(x);
        for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC)) / 8); }
      }
      for (i = 0; i < X.length - 1; i++) for (j = 0; j < NC; j++) {
        var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
      return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
    }
    function transom(THREE, g, mHull, mUnder) {
      var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, k;
      var P = { hi: [[], []], lo: [[], []] };
      for (j = 0; j < N; j++) {
        var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
        var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1), L = (z0 + z1) / 2 >= -0.3 ? P.hi : P.lo;
        L[0].push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
        for (k = 0; k < 6; k++) L[1].push(L[0][L[0].length - 18 + k * 3 + 1] / 24, L[0][L[0].length - 18 + k * 3 + 2] / 8);
      }
      if (P.hi[0].length) g.add(new THREE.Mesh(geoOf(THREE, P.hi[0], P.hi[1]), mHull));
      if (P.lo[0].length) g.add(new THREE.Mesh(geoOf(THREE, P.lo[0], P.lo[1]), mUnder || mHull));
    }
    function edgeY(x) { return Math.max(0.1, halfTop(x) - 0.12); }
    function railRun(THREE, g, T, x0, x1, step, hgt) {
      var n = Math.max(2, Math.round(Math.abs(x1 - x0) / step)), s, i, prev, x, y, z;
      for (s = -1; s <= 1; s += 2) {
        prev = null;
        for (i = 0; i <= n; i++) {
          x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x);
          strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
          if (prev) strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt, x, y, z + hgt, 0.024, 3);
          prev = [x, y, z];
        }
      }
    }
    return { W: W, zBot: zBot, deckZ: deckZ, halfTop: halfTop, shellBand: shellBand,
             deckSheet: deckSheet, transom: transom, railRun: railRun, edgeY: edgeY, pick: pick };
  }

  /* ======================================================== WEAPONS */
  /* 130 mm H/PJ-38 at rest pointing +X, origin on the ring at the deck: a
     faceted gun house of length L, half width hw, height h [D1][C1] */
  function gun130(THREE, g, T, L, hw, h, bar) {
    cylZ(THREE, g, hw * 0.85, hw * 0.9, 0.3, 18, T.sup, -0.2, 0, 0.15);
    var lo = [[-L * 0.48, -hw], [L * 0.12, -hw], [L * 0.42, -hw * 0.55], [L * 0.42, hw * 0.55], [L * 0.12, hw], [-L * 0.48, hw], [-L * 0.55, hw * 0.75], [-L * 0.55, -hw * 0.75]];
    var hi = [[-L * 0.42, -hw * 0.7], [-L * 0.05, -hw * 0.7], [L * 0.18, -hw * 0.38], [L * 0.18, hw * 0.38], [-L * 0.05, hw * 0.7], [-L * 0.42, hw * 0.7], [-L * 0.5, hw * 0.5], [-L * 0.5, -hw * 0.5]];
    frustum(THREE, g, T.sup, lo, 0.3, hi, h);
    box(THREE, g, 0.2, 0.9, 1.0, T.dark, L * 0.36, 0, h * 0.45);
    var b = new THREE.Group(); b.position.set(L * 0.36, 0, h * 0.45); b.rotation.y = -0.04;
    cylX(THREE, b, 0.24, 0.28, 1.0, 12, T.gun, 0.45, 0, 0);
    cylX(THREE, b, 0.1, 0.12, bar, 10, T.gun, 0.9 + bar / 2, 0, 0, true);
    g.add(b);
    box(THREE, g, 1.2, 0.8, 0.04, T.team, -L * 0.25, 0, h + 0.02);
    return g;
  }
  /* a gatling CIWS at rest pointing +X (Type 730 / H/PJ-11): a round
     base, a box housing with the gun in its nose, an EO box on its side */
  function ciws(THREE, g, T, sc) {
    sc = sc || 1;
    cylZ(THREE, g, 1.2 * sc, 1.3 * sc, 0.6, 14, T.sup, 0, 0, 0.3);
    frustum(THREE, g, T.white, chamf(-1.3 * sc, 1.1 * sc, 0.95 * sc, 0.3, 0.5), 0.6, chamf(-1.2 * sc, 0.8 * sc, 0.75 * sc, 0.25, 0.4), 2.3 * sc);
    cylX(THREE, g, 0.22, 0.24, 2.2 * sc, 8, T.gun, 1.9 * sc, 0, 1.25 * sc);
    box(THREE, g, 0.5, 0.35, 0.45, T.white, 0, 1.05 * sc, 1.8 * sc);
    return g;
  }
  /* HHQ-10 box launcher, its 24 cells (4 x 6) facing aft [D1] */
  function hhq10(THREE, g, T) {
    cylZ(THREE, g, 1.1, 1.2, 0.4, 14, T.sup, 0, 0, 0.2);
    box(THREE, g, 1.0, 1.0, 0.9, T.white, 0, 0, 0.85);
    var bx = new THREE.Group(); bx.position.set(0, 0, 1.9); g.add(bx);
    box(THREE, bx, 2.6, 2.4, 1.7, T.white, 0, 0, 0);
    var i, k;
    for (i = 0; i < 4; i++) for (k = 0; k < 6; k++) {
      var c = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.06, 8), T.dark);
      c.rotation.z = PI / 2; c.position.set(-1.32, -1.0 + k * 0.4, -0.6 + i * 0.4); bx.add(c);
    }
    return g;
  }
  /* a field of VLS hatches: nx along X by ny across, pitch px / py, on a
     plate at z [D1][C1] */
  function vls(THREE, g, T, x0, nx, ny, px, py, z) {
    var i, j, L = nx * px + 0.6, Wd = ny * py + 0.6;
    box(THREE, g, L, Wd, 0.25, T.deck, x0 + L / 2 - 0.3, 0, z + 0.12);
    for (i = 0; i < nx; i++) for (j = 0; j < ny; j++)
      box(THREE, g, px * 0.8, py * 0.8, 0.04, T.dark, x0 + (i + 0.5) * px, (j - (ny - 1) / 2) * py, z + 0.26);
  }

  /* ================================================== Type 052D [D1-D3]
     Stations off [D1] (x = 78.5 - (px - 38) / 9.6).  Heights off [D1] by
     its NEAR walls: a wall's top edge (where the lit side meets the roof
     seen from above) is at (waterline - row - 2.06 px a metre inboard of
     the near deck edge) / 9.38; the waterline runs from row 417.5 (x 300)
     to 427 (x 950) and 428 aft; the camera is 12.4 deg up (the pad shows
     33 px deep on 16 m).  Where only a top silhouette shows, it is the far
     edge and is corrected as such.
       stem head 78.5 (9.7 m), forecastle deck edge 8.5 at the gun, the
       anchor recess 67.7-72.6 (z 3-6); the gun 48.1-53.3 (top 10.2); the
       forward cells 34-45; the forward deckhouse 22.4-30.0 (10.8) with
       the Type 730 on it (top 13.1); the bridge block from its foot at
       22.4, its front top 20.5, glazing 16.2-17.1, roof 17.8; the forward
       array panels 9.2-15.6 directly under the glazing [D3]; the mast
       block 4.0-11.6 (20.7), the pyramid tower to 27.5 and its dome
       (centre 27.8), the pole to 34.8; the after array faces 2.6-8.0;
       the low box 1.2..-5.8 (14.1); the funnel -7.1..-15.5 (14.7, the
       black uptake -7.1..-10.3 to 16.5, louvres 11.3-14.1); a pair of
       domes -20.4 (centre 11.2); the Type 517 tower -24.4..-27.6 (14.4)
       and its Yagi (15.6-19.2, -22..-29); two small domes -30.4; the
       after cells -33.1..-40.9; the hangar -40.5..-58.2 (13.4) with the
       HHQ-10 on it (top 15.0) and decoy launchers in the recess along its
       sides (9.3-10.3); the boat bays -48.1..-55.6 (z 4.6-8.0); then the
       hull steps down to the pad, 4.8 m, to the transom.
     Deck edge 8.2 amidships, 8.5 at the gun, 9.7 at the stem; the pad
     4.8.  Drawn length 157.0 m (Jane's); beam 17.2 at the deck edge
     (published 17-18), 16.2 at the waterline; draught 6.0 (published). */
  var H52 = {
    XS0: -78.5, XS1: 78.5, XWL: 72.6, XST: -77.6, step: 2.0, fl: 1.0, extra: [-58.5, -58.2, 22.4, 30],
    deckZ: function (x) {
      if (x < -58.5) return 4.8;
      if (x < -58.2) return 4.8 + 3.4 * (x + 58.5) / 0.3;
      return x < 30 ? 8.2 : 8.2 + 1.5 * Math.pow((x - 30) / 48.5, 1.8);
    },
    STA: [
      [-78.5, 7.70, 6.60, -0.60, 3.0],
      [-77.6, 7.80, 6.80, -1.20, 3.0],
      [-70.0, 8.30, 7.60, -3.60, 3.0],
      [-50.0, 8.60, 8.05, -5.70, 3.2],
      [-10.0, 8.60, 8.10, -6.00, 3.4],
      [ 10.0, 8.60, 8.10, -6.00, 3.2],
      [ 30.0, 8.30, 7.40, -5.90, 2.6],
      [ 45.0, 7.60, 6.00, -5.60, 2.1],
      [ 58.0, 6.30, 4.00, -5.00, 1.8],
      [ 66.0, 5.00, 2.40, -4.00, 1.6],
      [ 72.6, 3.60, 0.00,  0.00, 1.3],
      [ 76.0, 2.00, 0.00,  0.00, 1.2],
      [ 78.5, 0.15, 0.00,  0.00, 1.2]
    ]
  };
  function build052D(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), Hh = makeHull(H52), s, i, x;
    var DK = 8.2, PADZ = 4.8;
    g.add(Hh.shellBand(THREE, T.under, -7, -0.3, 5));
    g.add(Hh.shellBand(THREE, T.hull, -0.3, 10.5, 7));
    Hh.transom(THREE, g, T.hull, T.under);
    g.add(Hh.deckSheet(THREE, T.deck, H52.XS0, H52.XS1));

    /* bow: the big dark anchor recess [D1][D3], the rail round the
       forecastle [D1], breakwater, jackstaff, windlasses */
    for (s = -1; s <= 1; s += 2) {
      var ar = box(THREE, g, 2.4, 0.12, 2.4, T.dark, 70.2, s * (Hh.W(70.2, 4.5) + 0.03), 4.5);
      ar.rotation.y = PI / 4; ar.rotation.z = -s * 0.42;
      strut(THREE, g, T.sup, 46.0, s * 4.2, Hh.deckZ(46) + 0.35, 49.5, s * 0.2, Hh.deckZ(49.5) + 0.35, 0.35, 4);
      cylZ(THREE, g, 0.4, 0.45, 0.5, 8, T.metal, 62.0, s * 1.4, Hh.deckZ(62) + 0.25);
    }
    Hh.railRun(THREE, g, T, 22.6, 77.6, 2.6, 1.0);
    Hh.railRun(THREE, g, T, -77.8, -59.0, 2.6, 1.0);
    strut(THREE, g, T.metal, 77.6, 0, Hh.deckZ(77.6), 77.6, 0, Hh.deckZ(77.6) + 2.4, 0.05, 4);

    /* forward cells: 32, eight along by four across, ahead of the deckhouse */
    vls(THREE, g, T, 34.3, 8, 4, 1.3, 1.3, Hh.deckZ(34.3) + 0.05);

    /* forward deckhouse 22.4..30.0, roof 10.8, the Type 730 on it [D1] */
    var fdLo = chamf(21.8, 30.0, 6.6, 0.4, 2.4), fdHi = chamf(21.8, 29.2, 6.0, 0.3, 2.0);
    frustum(THREE, g, T.sup, fdLo, DK - 0.05, fdHi, 10.8);
    var cw = new THREE.Group(); cw.position.set(26.8, 0, 10.8); ciws(THREE, cw, T, 0.95); g.add(cw);
    roofRail(THREE, g, T, [[22.2, 5.6], [27.4, 5.6], [29.0, 3.6], [29.0, -3.6], [27.4, -5.6], [22.2, -5.6]], 10.8, 0.9);

    /* the forward block (bridge): foot 2.6..22.4, top 3.0..20.5 at 17.8 */
    var ZB = 17.8;
    var bLo = chamf(2.6, 22.4, 8.0, 3.0, 3.6), bHi = chamf(3.2, 20.5, 6.4, 2.4, 2.6);
    frustum(THREE, g, T.sup, bLo, DK - 0.05, bHi, ZB);
    [1, 2, 3].forEach(function (k) { facePatch(THREE, g, T.glass, bLo, DK - 0.05, bHi, ZB, k, 0.04, 0.96, 16.2, 17.1, 0.12); });
    [0, 4].forEach(function (k) { facePatch(THREE, g, T.glass, bLo, DK - 0.05, bHi, ZB, k, 0.70, 0.97, 16.2, 17.1, 0.12); });
    /* the four Type 346A faces on the block's corners [D1][D3], 9.2-15.6 */
    [1, 3, 5, 7].forEach(function (k) { facePatch(THREE, g, T.array, bLo, DK - 0.05, bHi, ZB, k, 0.07, 0.93, 9.2, 15.6, 0.15); });
    [1, 3, 5, 7].forEach(function (k) { facePatch(THREE, g, T.sup, bLo, DK - 0.05, bHi, ZB, k, 0.02, 0.98, 8.95, 9.2, 0.14); });
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) box(THREE, g, 1.0, 0.06, 2.0, T.dark, 9 + i * 3.4, s * 7.85, DK + 1.1);
    /* the bridge-roof dome [D1], EO directors, whip aerials */
    cylZ(THREE, g, 0.9, 1.1, 0.6, 12, T.sup, 14.8, 0, ZB + 0.3);
    sphere(THREE, g, 1.6, T.white, 14.8, 0, ZB + 1.5, 16, 10);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.35, 0.4, 1.0, 8, T.white, 18.6, s * 3.4, ZB + 0.5);
      sphere(THREE, g, 0.42, T.white, 18.6, s * 3.4, ZB + 1.2);
      strut(THREE, g, T.metal, 19.4, s * 1.6, ZB, 19.4, s * 1.6, ZB + 4.6, 0.04, 4);
    }
    roofRail(THREE, g, T, [[3.6, 6.0], [17.8, 6.0], [20.2, 3.6], [20.2, -3.6], [17.8, -6.0], [3.6, -6.0]], ZB, 0.9);

    /* mast block 4.0..11.6 (20.7), the pyramid tower (27.5), dome, pole */
    var mLo = chamf(4.0, 11.6, 5.4, 1.0, 1.4), mHi = chamf(4.4, 11.1, 4.4, 0.8, 1.1);
    frustum(THREE, g, T.sup, mLo, ZB - 0.05, mHi, 20.7);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 2.2, 0.06, 1.0, T.dark, 7.8, s * 4.9, 19.3);
    frustum(THREE, g, T.sup, chamf(3.3, 8.0, 2.6, 0.6, 0.6), 20.65, chamf(4.6, 7.0, 1.0, 0.3, 0.3), 26.6);
    cylZ(THREE, g, 0.8, 0.9, 0.6, 12, T.sup, 5.7, 0, 26.6);
    sphere(THREE, g, 1.55, T.white, 5.7, 0, 27.8, 16, 10);
    box(THREE, g, 0.2, 5.4, 0.18, T.metal, 6.2, 0, 23.2);
    box(THREE, g, 0.2, 3.8, 0.16, T.metal, 6.0, 0, 25.0);
    strut(THREE, g, T.metal, 3.6, 0, 22.0, 3.6, 0, 34.8, 0.12, 6);
    box(THREE, g, 0.12, 2.2, 0.12, T.metal, 3.6, 0, 33.4);
    cylZ(THREE, g, 0.3, 0.3, 0.6, 8, T.white, 3.6, 0, 31.4);
    for (s = -1; s <= 1; s += 2) { cylZ(THREE, g, 0.4, 0.5, 1.1, 8, T.white, 10.0, s * 2.8, 21.25); sphere(THREE, g, 0.45, T.white, 10.0, s * 2.8, 22.1); }

    /* the low box abaft the block, 1.2..-5.8, roof 14.1 */
    frustum(THREE, g, T.sup, chamf(-5.8, 2.8, 5.0, 0.6, 0.6), DK - 0.05, chamf(-5.5, 2.5, 4.4, 0.5, 0.5), 14.1);
    /* funnel -15.5..-7.1 (14.7), louvres 11.3-14.1, the black uptake to 16.5 */
    var fLo = chamf(-15.5, -5.8, 4.6, 0.6, 0.8), fHi = chamf(-15.2, -6.1, 3.8, 0.5, 0.6);
    frustum(THREE, g, T.sup, fLo, DK - 0.05, fHi, 14.7);
    [0, 4].forEach(function (k) { facePatch(THREE, g, T.dark, fLo, DK - 0.05, fHi, 14.7, k, 0.55, 0.85, 11.3, 14.1, 0.12); });
    frustum(THREE, g, T.dark, chamf(-10.3, -7.1, 1.8, 0.3, 0.3), 14.65, chamf(-10.2, -7.2, 1.6, 0.3, 0.3), 16.5);
    /* the low casing amidships -15.5..-33.0 (9.8), doors in its sides */
    var adLo = chamf(-33.0, -15.4, 7.8, 0.8, 0.4), adHi = chamf(-32.9, -15.4, 7.5, 0.7, 0.3);
    frustum(THREE, g, T.sup, adLo, DK - 0.05, adHi, 9.8);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 4; i++) box(THREE, g, 0.9, 0.06, 1.2, T.dark, -30 + i * 4.2, s * 7.75, 9.0);
    /* a pair of domes -20.4 [D1] */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.6, 0.7, 0.6, 10, T.sup, -20.4, s * 3.0, 10.1);
      sphere(THREE, g, 1.15, T.white, -20.4, s * 3.0, 11.2, 14, 10);
    }
    /* the Type 517 tower and its Yagi [D1] */
    frustum(THREE, g, T.sup, chamf(-27.6, -24.2, 1.9, 0.3, 0.3), 9.75, chamf(-26.6, -25.2, 0.8, 0.2, 0.2), 14.4);
    strut(THREE, g, T.metal, -25.9, 0, 14.4, -25.9, 0, 16.0, 0.12, 6);
    box(THREE, g, 7.0, 0.14, 0.14, T.metal, -25.5, 0, 16.0);
    for (i = 0; i < 6; i++) {
      x = -28.5 + i * 1.2;
      strut(THREE, g, T.metal, x, 0, 15.6, x, 0, 19.2, 0.04, 3);
    }
    box(THREE, g, 7.2, 0.08, 0.08, T.metal, -25.5, 0, 19.1);
    /* two small domes on posts -30.4, a pole -32.3 */
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.18, 0.22, 0.8, 6, T.metal, -30.4, s * 2.5, 10.2);
      sphere(THREE, g, 0.7, T.white, -30.4, s * 2.5, 11.2, 12, 8);
    }
    strut(THREE, g, T.metal, -32.3, 0, 9.8, -32.3, 0, 12.7, 0.06, 4);

    /* after cells: 32, four along by eight across, on the main deck */
    vls(THREE, g, T, -39.9, 4, 8, 1.3, 1.3, DK + 0.05);

    /* hangar -58.2..-40.5 (13.4), the door down to the pad, the HHQ-10 */
    var hLo = chamf(-58.2, -40.4, 8.25, 0.3, 1.0), hHi = chamf(-58.0, -40.7, 7.4, 0.3, 0.8);
    frustum(THREE, g, T.sup, hLo, DK - 0.05, hHi, 13.4);
    box(THREE, g, 0.3, 5.2, 5.0, T.dark, -58.42, 0, PADZ + 2.5);
    var hq = new THREE.Group(); hq.position.set(-43.6, 0, 13.4); hq.scale.set(1, 1, 0.75); hhq10(THREE, hq, T); g.add(hq);
    roofRail(THREE, g, T, [[-40.9, 7.0], [-57.8, 7.0], [-57.8, -7.0], [-40.9, -7.0]], 13.4, 0.9);
    /* the recess along the hangar sides with the decoy launchers [D1] */
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 16.0, 0.06, 1.0, T.dark, -49.4, s * 8.2, 9.8);
      [-47.4, -51.8].forEach(function (dx) {
        box(THREE, g, 1.6, 0.9, 1.0, T.white, dx, s * 7.75, 9.8);
        box(THREE, g, 0.06, 0.8, 0.8, T.dark, dx + 0.82, s * 7.75, 9.8);
      });
    }
    /* the boat bays in the hull side under the hangar [D1] */
    for (s = -1; s <= 1; s += 2) {
      var by = s * (Hh.W(-51.8, 6.3) + 0.02);
      box(THREE, g, 7.5, 0.08, 3.4, T.dark, -51.8, by, 6.3);
      var bt = cylX(THREE, g, 0.75, 0.75, 6.2, 10, T.white, -51.8, by - s * 0.6, 5.6);
      bt.scale.set(1, 1, 0.75);
    }

    /* the pad [D1]: touchdown circle, lines, rails */
    var tc = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.1, 3, 32), T.white);
    tc.scale.z = 0.25; tc.position.set(-68.5, 0, PADZ + 0.03); g.add(tc);
    box(THREE, g, 18.0, 0.16, 0.03, T.white, -68.6, 0, PADZ + 0.02);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 18.8, 0.14, 0.03, T.white, -68.6, s * 7.0, PADZ + 0.02);
    roofRail(THREE, g, T, [[-78.2, 7.3], [-78.2, -7.3]], PADZ, 1.0);

    /* underwater gear: two shafts, screws, two rudders, bilge keels (NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.24, 0.24, 18.0, 8, T.metal, -58.0, s * 3.2, -4.4);
      strut(THREE, g, T.metal, -64.0, s * 3.2, -4.4, -64.0, s * 2.0, -2.6, 0.14, 4);
      cylX(THREE, g, 0.34, 0.48, 1.0, 8, T.metal, -67.4, s * 3.2, -4.4);
      for (i = 0; i < 5; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 1.6), T.metal);
        bl.position.set(-67.4, s * 3.2, -4.4); bl.rotation.x = i * 2 * PI / 5 + 0.3;
        bl.translateZ(0.95); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, 3.0, 0.26, 3.2, T.metal, -71.0, s * 3.2, -3.0);
      box(THREE, g, 34.0, 0.08, 0.6, T.under, -10.0, s * (Hh.W(-10, -4.6) + 0.15), -4.6);
    }

    /* team: small strips on up-facing roofs */
    box(THREE, g, 2.4, 1.0, 0.04, T.team, 7.0, 0, 20.72);
    box(THREE, g, 2.4, 1.0, 0.04, T.team, -50.0, 0, 13.42);
    box(THREE, g, 1.6, 0.8, 0.04, T.team, -76.0, 0, PADZ + 0.03);

    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(50.7, 0, Hh.deckZ(50.7)); gun130(THREE, tw, T, 5.2, 2.0, 1.9, 5.6);
    return finish(THREE, g, tw, [-68.5, 0, PADZ]);
  }

  /* bake the hull, then the turret on its own, add the hidden pad marker */
  function finish(THREE, g, tw, pad) {
    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    if (tw) {
      var tb = bake(THREE, tw);
      tw.children.slice().forEach(function (c) { tw.remove(c); });
      tb.children.slice().forEach(function (c) { tw.add(c); });
      root.add(tw);
    }
    if (pad) {
      var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
      hp.position.set(pad[0], pad[1], pad[2]); root.add(hp);
    }
    return root;
  }

  /* ================================================== Type 055 [C1][C2]
     Stations off [C1] (x = -90 + (px - 105) / 8.0): the pad -90..-63.5;
     the hangar -63.5..-43.1 (two doors); the after cells -43.1..-29.4; a
     lower step -29.4..-20.6 with a dome on a post; the funnel block
     -20.6..0.6 with its two black uptakes (-19.9..-15.3, -6.6..-2.5); the
     forward block 0.6..25.6 with the bridge glazing over its front; the
     integrated mast on its roof, 5.2..15.6 at the foot and 8.8..11.9 at
     the top; the forward deckhouse 25.6..35.5 with the H/PJ-11; the
     forward cells 36.9..55.6; the gun 56.5..61.9; the stem 90.
     Heights off [C1] too, by its NEAR walls (as the 052D's; 19 deg up,
     2.64 px a metre inboard, 7.56 px/m vertical, waterline row 391-393):
     pad 4.8, deck 7.1 amidships rising to 8.4 at the stem, hangar 10.7,
     forward deckhouse 10.6 (the H/PJ-11's top 12.8), the step abaft the
     funnel block 14.8, the funnel block 17.5 (uptakes 18.5), the bridge
     roof 20.5, the mast's top 33.7, the pole 36.  [C2] is too soft to
     read walls: its top silhouettes give the same order of heights but
     1-2 m lower on the hangar and the funnel block, which is put down to
     its unknown elevation (policy 2: [C1] is the one photograph used).
     Drawn 180.0 m long (published), beam 20.0 at the deck edge
     (published 20), draught 6.6 (published). */
  var H55 = {
    XS0: -90, XS1: 90, XWL: 83.0, XST: -89.0, step: 2.2, fl: 1.0, extra: [-63.5, -63.2, 25.6, 35.5],
    deckZ: function (x) {
      if (x < -63.5) return 4.8;
      if (x < -63.2) return 4.8 + 2.3 * (x + 63.5) / 0.3;
      return x < 35 ? 7.1 : 7.1 + 1.3 * Math.pow((x - 35) / 55, 1.8);
    },
    STA: [
      [-90.0,  9.00, 7.60, -0.60, 3.0],
      [-89.0,  9.10, 7.90, -1.40, 3.0],
      [-80.0,  9.60, 8.90, -4.00, 3.0],
      [-60.0, 10.00, 9.30, -6.20, 3.2],
      [-10.0, 10.00, 9.30, -6.60, 3.4],
      [ 15.0, 10.00, 9.30, -6.60, 3.2],
      [ 35.0,  9.70, 8.60, -6.50, 2.6],
      [ 52.0,  8.80, 6.90, -6.20, 2.1],
      [ 66.0,  7.20, 4.60, -5.40, 1.8],
      [ 76.0,  5.60, 2.40, -4.20, 1.6],
      [ 83.0,  4.00, 0.00,  0.00, 1.3],
      [ 87.0,  2.00, 0.00,  0.00, 1.2],
      [ 90.0,  0.15, 0.00,  0.00, 1.2]
    ]
  };
  function build055(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), Hh = makeHull(H55), s, i;
    var DK = 7.1, PADZ = 4.8;
    g.add(Hh.shellBand(THREE, T.under, -8, -0.3, 5));
    g.add(Hh.shellBand(THREE, T.hull, -0.3, 11, 7));
    Hh.transom(THREE, g, T.hull, T.under);
    g.add(Hh.deckSheet(THREE, T.deck, H55.XS0, H55.XS1));

    for (s = -1; s <= 1; s += 2) {
      var ar = box(THREE, g, 2.6, 0.12, 2.6, T.dark, 82.0, s * (Hh.W(82.0, 4.8) + 0.03), 4.8);
      ar.rotation.y = PI / 4; ar.rotation.z = -s * 0.45;
      strut(THREE, g, T.sup, 54.0, s * 4.6, Hh.deckZ(54) + 0.35, 57.6, s * 0.2, Hh.deckZ(57.6) + 0.35, 0.35, 4);
      cylZ(THREE, g, 0.4, 0.45, 0.5, 8, T.metal, 70.0, s * 1.5, Hh.deckZ(70) + 0.25);
    }
    Hh.railRun(THREE, g, T, 26.0, 89.0, 2.8, 1.0);
    Hh.railRun(THREE, g, T, -89.6, -64.0, 2.8, 1.0);
    strut(THREE, g, T.metal, 89.2, 0, Hh.deckZ(89.2), 89.2, 0, Hh.deckZ(89.2) + 2.4, 0.05, 4);

    /* forward cells 64: sixteen along by four across [C1] */
    vls(THREE, g, T, 37.4, 16, 4, 1.12, 1.3, Hh.deckZ(37.4) + 0.05);
    /* forward deckhouse 25.6..35.5, sloped front, roof 10.6; the H/PJ-11 */
    var fdLo = chamf(25.0, 35.5, 8.6, 0.4, 3.2), fdHi = chamf(25.0, 33.6, 7.6, 0.3, 2.6);
    frustum(THREE, g, T.sup, fdLo, DK - 0.05, fdHi, 10.6);
    var cw = new THREE.Group(); cw.position.set(31.0, 0, 10.6); ciws(THREE, cw, T, 0.95); g.add(cw);
    roofRail(THREE, g, T, [[25.4, 7.4], [30.8, 7.4], [33.4, 4.8], [33.4, -4.8], [30.8, -7.4], [25.4, -7.4]], 10.6, 0.9);

    /* forward block 0.6..25.6, roof 20.5: glazing 18.6-19.8, the four
       Type 346B S-band faces on its corners 10.4-17.6 [C1] */
    var ZB = 20.5;
    var bLo = chamf(0.6, 25.6, 9.6, 3.6, 4.4), bHi = chamf(1.4, 23.2, 7.6, 2.6, 3.2);
    frustum(THREE, g, T.sup, bLo, DK - 0.05, bHi, ZB);
    [1, 2, 3].forEach(function (k) { facePatch(THREE, g, T.glass, bLo, DK - 0.05, bHi, ZB, k, 0.04, 0.96, 18.6, 19.8, 0.12); });
    [1, 3, 5, 7].forEach(function (k) {
      facePatch(THREE, g, T.array, bLo, DK - 0.05, bHi, ZB, k, 0.07, 0.93, 10.4, 17.6, 0.15);
      facePatch(THREE, g, T.sup, bLo, DK - 0.05, bHi, ZB, k, 0.02, 0.98, 10.15, 10.4, 0.14);
    });
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) box(THREE, g, 1.0, 0.06, 2.0, T.dark, 8.0 + i * 4.0, s * 9.55, DK + 1.1);
    roofRail(THREE, g, T, [[2.0, 7.4], [20.0, 7.4], [22.9, 4.4], [22.9, -4.4], [20.0, -7.4], [2.0, -7.4]], ZB, 0.9);
    /* the integrated mast: X-band faces high on its four corners (their
       height NOT CONFIRMED), the top, a yard and the pole [C1][C2] */
    var tLo = chamf(4.6, 16.2, 4.8, 2.4, 2.4), tHi = chamf(8.8, 11.9, 1.4, 0.5, 0.5);
    frustum(THREE, g, T.sup, tLo, ZB - 0.05, tHi, 33.7);
    [1, 3, 5, 7].forEach(function (k) { facePatch(THREE, g, T.array, tLo, ZB - 0.05, tHi, 33.7, k, 0.1, 0.9, 25.0, 28.0, 0.12); });
    box(THREE, g, 0.2, 5.0, 0.18, T.metal, 10.3, 0, 29.6);
    cylZ(THREE, g, 0.55, 0.65, 1.2, 10, T.white, 10.3, 0, 34.3);
    strut(THREE, g, T.metal, 10.3, 0, 34.9, 10.3, 0, 36.0, 0.09, 5);
    box(THREE, g, 0.12, 2.0, 0.12, T.metal, 10.3, 0, 35.5);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.38, 0.45, 1.0, 8, T.white, 20.2, s * 4.2, ZB + 0.5);
      sphere(THREE, g, 0.45, T.white, 20.2, s * 4.2, ZB + 1.3);
      strut(THREE, g, T.metal, 3.0, s * 6.0, ZB, 3.0, s * 6.0, ZB + 4.6, 0.04, 4);
    }

    /* funnel block -20.6..0.6 (17.5): louvres, the two black uptakes [C1] */
    var fLo = chamf(-20.6, 0.6, 9.6, 1.0, 1.4), fHi = chamf(-20.3, 0.2, 8.0, 0.8, 1.0);
    frustum(THREE, g, T.sup, fLo, DK - 0.05, fHi, 17.5);
    [0, 4].forEach(function (k) {
      facePatch(THREE, g, T.dark, fLo, DK - 0.05, fHi, 17.5, k, 0.10, 0.30, 11.5, 15.5, 0.12);
      facePatch(THREE, g, T.dark, fLo, DK - 0.05, fHi, 17.5, k, 0.62, 0.82, 11.5, 15.5, 0.12);
    });
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) box(THREE, g, 1.0, 0.06, 2.0, T.dark, -18 + i * 7.0, s * 9.55, DK + 1.1);
    [[-19.9, -15.3], [-6.6, -2.5]].forEach(function (q) {
      frustum(THREE, g, T.sup, chamf(q[0], q[1], 2.6, 0.3, 0.3), 17.45, chamf(q[0] + 0.1, q[1] - 0.1, 2.4, 0.3, 0.3), 18.1);
      frustum(THREE, g, T.dark, chamf(q[0] + 0.1, q[1] - 0.1, 2.4, 0.3, 0.3), 18.05, chamf(q[0] + 0.2, q[1] - 0.2, 2.2, 0.3, 0.3), 18.5);
    });
    sphere(THREE, g, 0.85, T.white, -11.0, 3.0, 18.3, 12, 8);
    sphere(THREE, g, 0.85, T.white, -11.0, -3.0, 18.3, 12, 8);
    roofRail(THREE, g, T, [[-20.0, 7.8], [-0.2, 7.8]], 17.5, 0.9);
    roofRail(THREE, g, T, [[-20.0, -7.8], [-0.2, -7.8]], 17.5, 0.9);
    /* the step -29.4..-20.6 (14.8), the dome on its post at -28.0 */
    frustum(THREE, g, T.sup, chamf(-29.4, -20.4, 9.0, 0.8, 0.4), DK - 0.05, chamf(-29.2, -20.4, 7.8, 0.6, 0.3), 14.8);
    cylZ(THREE, g, 0.45, 0.55, 1.6, 8, T.sup, -27.6, 0, 15.6);
    sphere(THREE, g, 1.1, T.white, -27.6, 0, 17.2, 14, 10);

    /* after cells 48: twelve along by four across [C1] */
    vls(THREE, g, T, -42.6, 12, 4, 1.1, 1.3, DK + 0.05);

    /* hangar -63.5..-43.1 (10.7), two doors down to the pad; two domes and
       the HHQ-10 on its roof [C1] */
    var hLo = chamf(-63.5, -43.1, 9.75, 0.3, 1.0), hHi = chamf(-63.3, -43.4, 9.0, 0.3, 0.8);
    frustum(THREE, g, T.sup, hLo, DK - 0.05, hHi, 10.7);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.3, 5.4, 5.2, T.dark, -63.62, s * 3.6, PADZ + 2.6);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.55, 0.65, 0.8, 10, T.sup, -45.4, s * 3.4, 11.1);
      sphere(THREE, g, 1.15, T.white, -45.4, s * 3.4, 12.3, 14, 10);
    }
    var hq = new THREE.Group(); hq.position.set(-51.5, 0, 10.7); hhq10(THREE, hq, T); g.add(hq);
    roofRail(THREE, g, T, [[-43.8, 8.6], [-63.0, 8.6], [-63.0, -8.6], [-43.8, -8.6]], 10.7, 0.9);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 7.0, 0.08, 2.8, T.dark, -54.0, s * (Hh.W(-54, 5.0) + 0.02), 5.0);

    /* the pad [C1] */
    var tc = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.11, 3, 32), T.white);
    tc.scale.z = 0.25; tc.position.set(-77.0, 0, PADZ + 0.03); g.add(tc);
    box(THREE, g, 24.0, 0.16, 0.03, T.white, -77.0, 0, PADZ + 0.02);
    box(THREE, g, 0.16, 12.0, 0.03, T.white, -70.0, 0, PADZ + 0.02);
    roofRail(THREE, g, T, [[-89.7, 8.6], [-89.7, -8.6]], PADZ, 1.0);

    /* underwater: four shafts in two pairs, two rudders (NOT CONFIRMED) */
    [[2.6, -4.6], [6.0, -3.6]].forEach(function (q) {
      for (s = -1; s <= 1; s += 2) {
        cylX(THREE, g, 0.26, 0.26, 20.0, 8, T.metal, -62.0, s * q[0], q[1]);
        cylX(THREE, g, 0.36, 0.5, 1.0, 8, T.metal, -72.4, s * q[0], q[1]);
        for (i = 0; i < 5; i++) {
          var bl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 1.6), T.metal);
          bl.position.set(-72.4, s * q[0], q[1]); bl.rotation.x = i * 2 * PI / 5 + 0.3;
          bl.translateZ(0.95); bl.rotation.y = 0.45; g.add(bl);
        }
      }
    });
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 3.4, 0.28, 3.4, T.metal, -76.0, s * 4.3, -3.2);
      box(THREE, g, 40.0, 0.08, 0.6, T.under, -10.0, s * (Hh.W(-10, -5.0) + 0.15), -5.0);
    }

    box(THREE, g, 2.6, 1.2, 0.04, T.team, 3.0, 0, ZB + 0.02);
    box(THREE, g, 2.6, 1.2, 0.04, T.team, -58.0, 0, 10.72);
    box(THREE, g, 1.8, 0.8, 0.04, T.team, -88.0, 0, PADZ + 0.03);

    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(59.2, 0, Hh.deckZ(59.2)); gun130(THREE, tw, T, 5.4, 2.0, 2.3, 5.8);
    return finish(THREE, g, tw, [-77.0, 0, PADZ]);
  }

  /* ================================================= Type 094 [S1][S2]
     X = px / 10.14 - 68.5 off [S1]; z from the boot line (the surfaced
     waterline): rows [X, top z, keel z].  The top is the casing (aft),
     the missile hump (-17..+30, flat at 6.2), and the forward casing
     falling into the bow; X -68.5 is the screw tip.  Read off [S1]: the
     hull's depth abaft the hump 11.8 m (keel -8.5), the hump 6.2 m over
     the waterline, the sail 30.1..45.6 with its top at 9.9 (3.7 m over
     the hump, as [S2] also shows it: the ratio sail-over-hump to
     hump-over-water reads 0.55 there, 0.60 on [S1]), the fillet at the
     sail's foot 28.9..47.1, the upper rudder -60.2..-54.7 to 4.8, the
     lower fin to -9.9, the stern planes' root on the axis at -3.0,
     the screw 4.9 m across, the hatches 1.0..23.0, a mast to 13.9.
     Drawn 137.0 m (published), beam 13.0 (published; the section is
     capped at it), draught 8.5 at the boot line.
     WHICH BOAT: the original Type 094.  Both references are of it: the
     094A of 2018 adds a fairing at the sail's forward foot and a raised
     casing behind the sail, which neither shows; nothing is drawn of it.
     NOT CONFIRMED: the sail's plan width (2.9 m) and rounded nose; the
     sail planes' span (3.0 m) and height (8.3, from [S2]'s 40 per cent);
     the stern planes' span (6.6 m from the axis) and planform; the
     hull's section (a round lower hull under a superellipse upper part,
     neither seen end-on); the hatch diameter (2.5 m); the masts. */
  var JIN = [
    [-66.0, -1.40, -4.60], [-63.6, -1.98, -4.06], [-60.6, -1.38, -4.63], [-52.8, 0.14, -5.95],
    [-48.8, 0.95, -6.62], [-44.9, 1.37, -7.18], [-40.9, 1.88, -7.65], [-37.0, 2.30, -8.01],
    [-33.1, 2.62, -8.19], [-29.1, 2.84, -8.36], [-25.2, 2.97, -8.53], [-21.3, 3.09, -8.50],
    [-17.3, 3.22, -8.57], [-15.4, 3.72, -8.56], [-13.4, 4.23, -8.55], [-11.4, 4.73, -8.53],
    [-9.4, 5.14, -8.52], [-7.5, 5.55, -8.51], [-5.5, 5.95, -8.49], [-3.5, 6.16, -8.48],
    [0.4, 6.19, -8.45], [10.2, 6.26, -8.39], [20.1, 6.32, -8.32], [28.0, 6.28, -8.27],
    [29.9, 6.19, -8.26], [31.5, 5.20, -8.24], [34.0, 4.30, -8.22], [38.0, 3.90, -8.20],
    [46.7, 3.55, -8.15], [49.6, 3.37, -8.03], [53.5, 3.10, -8.00], [57.5, 2.80, -7.78],
    [61.4, 2.27, -7.36], [63.4, 1.79, -6.95], [65.4, 1.21, -6.25], [66.3, 0.72, -5.65],
    [67.3, -0.06, -4.76], [67.8, -0.54, -4.07], [68.3, -1.50, -3.10], [68.5, -2.60, -2.70]
  ];
  var JIN_BEAM = 6.5;        /* half of the published 13 m */
  function jinRow(x) {
    var i;
    if (x <= JIN[0][0]) return JIN[0];
    for (i = 1; i < JIN.length; i++) if (x <= JIN[i][0]) {
      var a = JIN[i - 1], b = JIN[i], f = (x - a[0]) / (b[0] - a[0]);
      return [x, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
    }
    return JIN[JIN.length - 1];
  }
  /* the section: a full round lower hull (half height hl up to 5.9 m, the
     pressure hull's 11.8 m depth abaft the hump [S1]) under a superellipse
     upper part that runs up to the casing or the hump top.  Width: the
     lower half-height, capped at the published half beam (NOT CONFIRMED). */
  function jinSec(x) {
    var r = jinRow(x), top = r[1], kz = r[2], hl = Math.min(5.9, (top - kz) / 2);
    var zc = kz + hl, w = Math.min(JIN_BEAM, hl * 1.1), hu = top - zc;
    var n = hu > hl * 1.15 ? 2.8 : 2.0;
    return { zc: zc, hl: hl, hu: hu, w: w, n: n };
  }
  function jinY(x, z) {
    var q = jinSec(x), t;
    if (z >= q.zc) { t = (z - q.zc) / q.hu; if (t >= 1) return 0; return q.w * Math.pow(1 - Math.pow(t, q.n), 1 / q.n); }
    t = (q.zc - z) / q.hl; if (t >= 1) return 0; return q.w * Math.pow(1 - t * t, 0.5);
  }
  function build094(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C)), s, i, x;
    var NR = 28, xs = [];
    for (x = -66.0; x < 68.5; x += (x > 60 || x < -58 ? 1.0 : 2.2)) xs.push(x);
    xs.push(-17.3, -3.5, 28.0, 29.9, 68.5);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.2; });
    /* the hull: one loft of the whole section, its faces then split by
       height at the boot line (z = -0.15): tiles above, anti-fouling below [S1] */
    var ZB = -0.15;
    var full = xs.map(function (xx) {
      var q = jinSec(xx), o = [], k;
      for (k = 0; k < NR * 2; k++) {
        var a = -PI / 2 + 2 * PI * k / (NR * 2), c = Math.cos(a), sn = Math.sin(a), y, z;
        if (sn >= 0) { y = q.w * Math.sign(c) * Math.pow(Math.abs(c), 2 / q.n); z = q.zc + q.hu * Math.pow(sn, 2 / q.n); }
        else { y = q.w * c; z = q.zc + q.hl * sn; }
        o.push([y, z]);
      }
      return o;
    });
    var hullM = ringLoft(THREE, new THREE.Group(), T.tile, xs, full, true, 0.12);
    /* split by face height */
    (function split() {
      var geo = hullM.geometry.toNonIndexed(), P = geo.attributes.position.array, U = geo.attributes.uv.array;
      var A = { p: [], u: [] }, B = { p: [], u: [] }, f, k;
      for (f = 0; f < P.length / 9; f++) {
        var zm = (P[f * 9 + 2] + P[f * 9 + 5] + P[f * 9 + 8]) / 3, D = zm >= ZB ? A : B;
        for (k = 0; k < 9; k++) D.p.push(P[f * 9 + k]);
        for (k = 0; k < 6; k++) D.u.push(U[f * 6 + k]);
      }
      g.add(new THREE.Mesh(geoOf(THREE, A.p, A.u), T.tile));
      g.add(new THREE.Mesh(geoOf(THREE, B.p, B.u), T.under));
    })();

    /* the sail 30.1..45.6, flat top 9.9, straight vertical front, fillet
       at its foot 28.9..47.1 [S1][S2]; plan width NOT CONFIRMED (2.9 m) */
    function sailPlan(x0, x1, hw) {
      var o = [], k, L = x1 - x0;
      for (k = 0; k <= 8; k++) { var a = -PI / 2 + PI * k / 8; o.push([x1 - hw * 1.6 + hw * 1.6 * Math.cos(a), hw * Math.sin(a)]); }
      o.push([x0 + 1.2, hw * 0.92]); o.push([x0, hw * 0.4]); o.push([x0, -hw * 0.4]); o.push([x0 + 1.2, -hw * 0.92]);
      return polyCCW(o.map(function (p) { return [p[0], -p[1]]; }));
    }
    frustum(THREE, g, T.tile, sailPlan(28.9, 47.1, 2.2), 2.8, sailPlan(30.1, 45.6, 1.45), 4.2);
    frustum(THREE, g, T.tile, sailPlan(30.1, 45.6, 1.45), 4.15, sailPlan(30.2, 45.5, 1.4), 9.9);
    /* sail planes high on the forward half [S2]: span NOT CONFIRMED */
    for (s = -1; s <= 1; s += 2) {
      var sp = new THREE.Shape();
      sp.moveTo(44.0, 0); sp.lineTo(38.6, 0); sp.lineTo(39.4, s * 3.0); sp.lineTo(42.2, s * 3.0); sp.lineTo(44.0, 0);
      var sg = new THREE.ExtrudeGeometry(sp, { depth: 0.24, bevelEnabled: false });
      sg.translate(0, s * 1.4, 8.3);
      g.add(new THREE.Mesh(sg, T.tile));
    }
    /* masts on the sail [S1]: the housing to 10.9, a whip to 13.9 */
    box(THREE, g, 2.8, 0.9, 1.0, T.tile, 42.0, 0, 10.4);
    strut(THREE, g, T.metal, 42.8, 0, 10.9, 42.8, 0, 13.9, 0.08, 5);
    strut(THREE, g, T.metal, 41.2, 0, 10.9, 41.2, 0, 12.0, 0.16, 6);
    box(THREE, g, 0.6, 2.4, 0.06, T.dark, 44.6, 0, 9.92);

    /* the twelve hatches, two rows of six, 1.0..23.0 [S1][S2]: shut */
    for (i = 0; i < 6; i++) for (s = -1; s <= 1; s += 2) {
      x = 2.6 + i * 3.75;
      var zt = jinRow(x)[1];
      cylZ(THREE, g, 1.25, 1.25, 0.08, 18, T.dark, x, s * 1.6, zt + 0.02);
      cylZ(THREE, g, 1.1, 1.1, 0.1, 18, T.tile, x, s * 1.6, zt + 0.05);
    }
    /* the free-flood holes along the hump's flanks [S1][S2] */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 9; i++) {
        x = -12.5 + i * 4.8;
        var zh = 2.2, yh = jinY(x, zh);
        var lh = box(THREE, g, 4.0, 0.06, 1.5, T.dark, x, s * (yh + 0.02), zh);
        lh.rotation.x = -s * 0.35;
      }
    }

    /* cruciform stern [S1]: upper rudder to 4.8, lower fin to -9.9; stern
       planes on the shaft axis (z -3.0), span NOT CONFIRMED */
    function fin(pts, th, m) {
      var sh = new THREE.Shape(); sh.moveTo(pts[0][0], pts[0][1]);
      for (var k = 1; k < pts.length; k++) sh.lineTo(pts[k][0], pts[k][1]);
      var fg = new THREE.ExtrudeGeometry(sh, { depth: th, bevelEnabled: false });
      fg.translate(0, 0, -th / 2); fg.rotateX(PI / 2);
      g.add(new THREE.Mesh(fg, m)); return fg;
    }
    fin([[-60.2, -1.6], [-54.0, -1.6], [-54.7, 4.8], [-60.0, 4.8]], 0.5, T.tile);
    fin([[-59.6, -4.0], [-53.0, -4.0], [-54.4, -9.9], [-59.4, -9.9]], 0.5, T.under);
    for (s = -1; s <= 1; s += 2) {
      var pl = new THREE.Shape();
      pl.moveTo(-62.6, 0); pl.lineTo(-51.9, 0); pl.lineTo(-56.0, s * 6.6); pl.lineTo(-60.6, s * 6.6); pl.lineTo(-62.6, 0);
      var pg = new THREE.ExtrudeGeometry(pl, { depth: 0.45, bevelEnabled: false });
      pg.translate(0, 0, -3.2);
      g.add(new THREE.Mesh(pg, T.under));
    }
    /* the screw: hub and seven blades, 4.9 m across [S1] */
    cylX(THREE, g, 0.35, 0.8, 1.6, 12, T.metal, -67.7, 0, -3.05);
    for (i = 0; i < 7; i++) {
      var bl = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.0, 2.0), T.metal);
      bl.position.set(-67.6, 0, -3.05); bl.rotation.x = i * 2 * PI / 7;
      bl.translateZ(1.35); bl.rotation.y = 0.5; g.add(bl);
    }

    /* team: two small strips on the sail top and the hump */
    box(THREE, g, 2.4, 0.9, 0.04, T.team, 35.0, 0, 9.92);
    box(THREE, g, 3.0, 1.0, 0.04, T.team, -10.0, 0, jinRow(-10)[1] + 0.03);
    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  /* ================================================== Type 003 [F1][F2]
     The deck outline off [F1] (X = 158 - row / 4.58, Y = (266 - col) /
     4.58, port +): the narrow bow, the angled deck's sponson out to 41.5
     m, the island strip and the two starboard lifts, the stern quarters.
     Heights off [F2] (5.42 px/m, waterline row 403, a feature's height
     corrected for its distance beyond the near (port) deck edge at 0.43
     px a metre): flight deck 16.1, the deck's fascia 2.4 deep; the island's
     lower block 7.6 m over the deck (23.7), the upper block to 41.3, the
     big array face on its side 23.7-33.7 and a second band 34.4-37.0, the
     mast to 50 with its dome (52.6) and the pole (55.9); the bow's stem at
     the waterline 22 m behind the deck's front; the port forward sponson
     low (10.5) at X 80-102 with a launcher on it.  The flight deck reads
     16.1 at the island and 16.8 at the bow: it is drawn flat at 16.1.
     The island's stations are [F1]'s (X -6..-40); [F2] puts it about 5 m
     further aft against the deck's ends, inside what the two drawings'
     scales allow, and [F1] is used because it also places the lifts.
     BEAM: [F1] at 316 m gives an 80.6 m main deck (83.1 over the
     sponsons), against the CSIS estimate of 76 m; the drawing is not
     stretched to the published beam (policy 3's spirit), the difference
     is reported.
     NOT CONFIRMED on the carrier: the hull under the deck (waterline beam
     40 m, the flare up to the gallery deck and the 11 m draught, none of
     them published or visible); the sponson mounts' types and places
     (an HHQ-10 on each forward sponson, a Type 1130 on each after
     quarter, from [F1]'s symbols and [F2]'s forward port sponson); the
     catapult tracks, wires and spots are painted from [F1] into the
     deck's texture, not modelled; the island's fore and aft array faces
     (not visible in [F2]; only the side faces are drawn).  No aircraft
     are parked on deck (neither template, ru_kuznetsov.js nor
     pla_lhd_type075.js, draws any); no hull number on the deck. */
  /* (detail pass) fitting sinks out as meshes, for bake to merge */
  function sinkOut(THREE, g, list) {
    list.forEach(function (q) { var gg = q[0].geo(THREE); if (gg) g.add(new THREE.Mesh(gg, q[1])); });
  }
  var FD = 16.1, FDB = 13.7;
  var DECK003 = [
    [158.0, 14.6], [136.2, 17.0], [114.3, 18.6], [103.4, 17.7], [98.0, 20.5], [92.5, 23.6],
    [87.0, 24.0], [81.6, 25.5], [76.1, 33.0], [70.7, 41.5], [48.8, 41.5], [43.4, 39.8],
    [-82.2, 39.8], [-120.4, 39.5], [-125.8, 34.5], [-136.8, 30.1], [-147.7, 27.7],
    [-153.1, 22.3], [-158.0, 15.5], [-158.0, -14.0], [-155.5, -18.8], [-147.7, -28.6],
    [-136.8, -30.6], [-131.3, -33.8], [-125.8, -33.8], [-120.4, -40.6], [-87.6, -40.6],
    [-82.2, -38.9], [-71.3, -38.9], [-65.8, -41.0], [10.6, -41.0], [16.1, -39.5],
    [32.5, -39.5], [38.0, -41.6], [43.4, -41.6], [48.8, -38.6], [54.2, -36.2],
    [70.7, -36.2], [76.1, -32.3], [81.6, -30.6], [87.0, -25.3], [98.0, -24.0],
    [103.4, -19.0], [114.3, -19.7], [136.2, -16.8], [158.0, -14.0]
  ];
  var LIFTS003 = [[15.0, 34.6], [-90.9, -70.2]];       /* X ranges, Y -23.1..-38.0 */
  var H03 = {
    XS0: -156.0, XS1: 156.0, XWL: 136.0, XST: -151.0, step: 6.0, fl: 2.0, stemP: 1.7,
    deckZ: function () { return FDB; },
    STA: [
      [-156.0, 12.5, 11.5, -0.8, 4.0],
      [-151.0, 17.5, 15.0, -4.5, 4.0],
      [-145.0, 24.0, 18.0, -7.0, 4.0],
      [-136.0, 28.0, 19.5, -9.5, 4.0],
      [-122.0, 33.0, 20.0, -10.5, 4.0],
      [-100.0, 35.0, 20.0, -11.0, 4.0],
      [  40.0, 35.0, 20.0, -11.0, 4.0],
      [  60.0, 33.0, 19.0, -11.0, 3.5],
      [  72.0, 28.0, 17.0, -10.8, 3.0],
      [  82.0, 22.0, 15.0, -10.4, 2.6],
      [ 100.0, 16.5, 11.0, -9.5, 2.2],
      [ 114.0, 16.0, 7.0, -7.5, 1.8],
      [ 125.0, 15.0, 3.5, -5.0, 1.6],
      [ 136.0, 13.0, 0.0, 0.0, 1.4],
      [ 148.0, 11.0, 0.0, 0.0, 1.3],
      [ 156.0, 7.0, 0.0, 0.0, 1.2]
    ]
  };
  /* the flight deck canvas: X -160..160 -> u, Y -46..46 -> v */
  function fdeckTex(THREE) {
    return canvasTex(THREE, "pnmFdeck003", 1024, 296, function (g, w, h) {
      function U(x) { return (x + 160) / 320 * w; }
      function V(y) { return (46 - y) / 92 * h; }
      var R = rng(3003), i;
      g.fillStyle = "#5b5d5f"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.07;
      for (i = 0; i < 260; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 6 + R() * 30, 2 + R() * 6); }
      g.globalAlpha = 1;
      function line(x0, y0, x1, y1, col, lw) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.moveTo(U(x0), V(y0)); g.lineTo(U(x1), V(y1)); g.stroke(); }
      /* the angled deck [F1]: its axis from (-156, -5.2) at 7.5 deg to port,
         the two white edge lines 13 m either side, dashed yellow axis */
      var ca = Math.cos(7.5 * PI / 180), sa = Math.sin(7.5 * PI / 180);
      function la(s, o) { return [-156 + s * ca - o * sa, -5.2 + s * sa + o * ca]; }
      [-13, 13].forEach(function (o) { var a = la(4, o), b = la(236, o); line(a[0], a[1], b[0], b[1], "#d8d8d2", 2); });
      [-12, 12].forEach(function (o) { var a = la(4, o), b = la(236, o); line(a[0], a[1], b[0], b[1], "#a8473c", 1.2); });
      for (i = 0; i < 20; i++) { var a = la(10 + i * 11, 0), b = la(16 + i * 11, 0); line(a[0], a[1], b[0], b[1], "#d6c23c", 2); }
      /* the four arresting wires across the axis [F1] */
      [52, 65, 78, 91].forEach(function (sx) {      /* X -104 .. -66 */
        var a = la(sx, -13), b = la(sx, 13);
        line(a[0], a[1], b[0], b[1], "#202020", 2.2);
      });
      /* the axial deck's centreline, white, from the bow to the island */
      for (i = 0; i < 14; i++) line(150 - i * 9, 0, 145 - i * 9, 0, "#d8d8d2", 1.6);
      /* the three catapult tracks [F1]: two in the bow, one in the waist */
      [[36, 154, 8.0], [44, 120, -13.5]].forEach(function (c) {
        line(c[0], c[2] - 0.4, c[1], c[2] - 0.4, "#2e3032", 1.4); line(c[0], c[2] + 0.4, c[1], c[2] + 0.4, "#2e3032", 1.4);
      });
      line(-60, 31.8, 70, 31.8, "#2e3032", 1.4); line(-60, 32.6, 70, 32.6, "#2e3032", 1.4);
      /* deck-edge line */
      g.strokeStyle = "#d0cec6"; g.lineWidth = 1.2; g.beginPath();
      DECK003.forEach(function (p, k) { var xx = U(p[0] - Math.sign(p[0]) * 0.8), yy = V(p[1] - Math.sign(p[1]) * 0.8); if (k) g.lineTo(xx, yy); else g.moveTo(xx, yy); });
      g.closePath(); g.stroke();
      /* the lifts, outlined yellow [F1] */
      LIFTS003.forEach(function (L) {
        g.strokeStyle = "#d6c23c"; g.lineWidth = 1.4;
        g.strokeRect(U(Math.min(L[0], L[1])), V(-23.1), U(Math.max(L[0], L[1])) - U(Math.min(L[0], L[1])), V(-38.0) - V(-23.1));
      });
      /* (detail pass) the wear of a working deck: tyre skid marks down the
         landing area and off the catapults, oil and exhaust stains, the
         tie-down grid of the parking areas, a little grime; paint only, the
         deck stays clear of anything standing on it */
      for (i = 0; i < 70; i++) {
        var s0 = 20 + R() * 120, o0 = (R() - 0.5) * 14, p0 = la(s0, o0), p1 = la(s0 + 6 + R() * 18, o0 + (R() - 0.5) * 1.5);
        g.globalAlpha = 0.10 + R() * 0.12; line(p0[0], p0[1], p1[0], p1[1], "#1a1a1a", 1 + R() * 1.6);
      }
      for (i = 0; i < 30; i++) {
        var cx0 = 40 + R() * 110, cy0 = (R() < 0.5 ? 8.0 : -13.5) + (R() - 0.5) * 2;
        g.globalAlpha = 0.08 + R() * 0.1; line(cx0, cy0, cx0 + 4 + R() * 10, cy0 + (R() - 0.5), "#202020", 1.2);
      }
      g.globalAlpha = 1;
      g.fillStyle = "rgba(20,20,20,0.35)";
      for (var tx = -150; tx < 150; tx += 4) for (var ty = -36; ty <= 36; ty += 4) {
        if (Math.abs(ty) < 18 && tx > -110 && tx < 20) continue;
        g.fillRect(U(tx), V(ty), 1.2, 1.2);
      }
      FK.weather(g, w, h, 3004, 60, 0.5);
      /* landing spots, yellow circles [F1] */
      [[116.5, -2.6], [-29.8, 23.1], [-130.0, 6.8], [76.0, 25.5], [40.0, 25.0]].forEach(function (c) {
        g.strokeStyle = "#d6c23c"; g.lineWidth = 1.5; g.beginPath();
        g.arc(U(c[0]), V(c[1]), 4.5 / 320 * w, 0, 2 * PI); g.stroke();
      });
    });
  }
  function build003(THREE, M, C) {
    var P = { hull: 0x7f878d, sup: 0x8c949a, deck: 0x50575c };
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C, P)), Hh = makeHull(H03), s, i, x;
    T.fdeck = new THREE.MeshStandardMaterial({ color: 0xffffff, map: fdeckTex(THREE), roughness: 0.95, metalness: 0.04 });
    T.fdeck.userData = { _srgbDone: true };
    /* (detail pass) a black boot-topping band at the waterline between the
       red bottom and the grey topsides */
    T.boot = new THREE.MeshStandardMaterial({ color: 0x16191c, map: hullTex(THREE), roughness: 0.9, metalness: 0.06 });
    T.boot.userData = { _srgbDone: true };
    g.add(Hh.shellBand(THREE, T.under, -11.5, -0.4, 6));
    g.add(Hh.shellBand(THREE, T.boot, -0.4, 0.7, 1));
    g.add(Hh.shellBand(THREE, T.hull, 0.7, FDB + 0.1, 7));
    Hh.transom(THREE, g, T.hull, T.under);
    /* the hull's top under the deck: a dark deckhead (the gallery deck) */
    g.add(Hh.deckSheet(THREE, T.dark, H03.XS0, H03.XS1));

    /* the flight deck: a slab, its top textured, fascia and underside grey */
    var dk = polyCCW(DECK003);
    var top = plate(THREE, g, T.fdeck, dk, FD, FD - FDB, T.sup);
    /* planar UVs on the deck top */
    (function () {
      var pa = top.geometry.attributes.position, uv = [], k;
      for (k = 0; k < pa.count; k++) uv.push((pa.getX(k) + 160) / 320, (pa.getY(k) + 46) / 92);
      top.geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    })();
    /* the gallery's dark band under the deck edge, all round [F2] */
    for (s = -1; s <= 1; s += 2) {
      for (x = -150; x < 150; x += 30) box(THREE, g, 29.6, 0.1, 1.6, T.dark, x + 15, s * (Hh.W(x + 15, FDB) - 0.2), FDB - 1.0);
    }
    /* the two starboard lifts: plates a hair proud of the deck */
    LIFTS003.forEach(function (L) {
      var x0 = Math.min(L[0], L[1]), x1 = Math.max(L[0], L[1]);
      box(THREE, g, x1 - x0, 14.9, 0.06, T.deck, (x0 + x1) / 2, -30.55, FD + 0.02);
    });

    /* the island on the starboard edge [F1][F2]: the lower block X -6..-40
       (Y -19..-37) to 23.7; the upper block, -9.3..-35.6 at its foot and
       -13.4..-32.6 at its top, to 41.3; arrays; the mast -14.9..-20.8 */
    var YC = -28.0;
    function sh(poly) { return poly.map(function (p) { return [p[0], p[1] + YC]; }); }
    var lLo = sh(chamf(-40.0, -6.0, 9.0, 1.5, 2.5)), lHi = sh(chamf(-39.8, -6.2, 8.8, 1.4, 2.4));
    frustum(THREE, g, T.sup, lLo, FD - 0.05, lHi, 23.7);
    var uLo = sh(chamf(-35.6, -9.3, 7.6, 2.0, 3.2)), uHi = sh(chamf(-32.6, -13.4, 5.4, 1.4, 2.2));
    frustum(THREE, g, T.sup, uLo, 23.65, uHi, 41.3);
    /* the array faces on the port and starboard sides of the upper block,
       23.7..33.7, and the band above them 34.4..37.0 [F2] (fore and aft
       faces NOT CONFIRMED and not drawn) */
    [0, 4].forEach(function (k) {
      facePatch(THREE, g, T.array, uLo, 23.65, uHi, 41.3, k, 0.22, 0.62, 24.2, 33.7, 0.15);
      facePatch(THREE, g, T.dark, uLo, 23.65, uHi, 41.3, k, 0.22, 0.62, 34.4, 37.0, 0.12);
    });
    /* bridge glazing on the upper block's front [F2] */
    [1, 2, 3].forEach(function (k) { facePatch(THREE, g, T.glass, uLo, 23.65, uHi, 41.3, k, 0.04, 0.96, 38.6, 40.0, 0.12); });
    /* windows in the lower block's sides */
    [0, 4].forEach(function (k) { facePatch(THREE, g, T.dark, lLo, FD - 0.05, lHi, 23.7, k, 0.1, 0.9, 20.6, 21.6, 0.12); });
    /* the bridge-wing platforms fore and aft [F2] */
    box(THREE, g, 10.0, 15.0, 0.5, T.sup, -3.0, YC, 27.8);
    box(THREE, g, 10.0, 15.0, 0.5, T.sup, -43.0, YC, 27.0);
    roofRail(THREE, g, T, [[2.0, YC + 7.5], [2.0, YC - 7.5]], 28.05, 1.0);
    roofRail(THREE, g, T, [[-48.0, YC + 7.5], [-48.0, YC - 7.5]], 27.25, 1.0);
    /* the mast on the roof, its yards, the dome and the pole [F2] */
    frustum(THREE, g, T.sup, sh(chamf(-21.0, -14.6, 2.6, 0.6, 0.6)), 41.25, sh(chamf(-19.8, -15.8, 1.4, 0.4, 0.4)), 50.0);
    box(THREE, g, 0.3, 9.0, 0.25, T.metal, -17.8, YC, 46.8);
    cylZ(THREE, g, 0.7, 0.8, 1.2, 10, T.sup, -17.8, YC, 50.6);
    sphere(THREE, g, 1.4, T.white, -17.8, YC, 52.4, 16, 10);
    strut(THREE, g, T.metal, -19.6, YC, 50.0, -19.6, YC, 55.9, 0.12, 5);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.5, 0.6, 1.4, 10, T.sup, -15.0, YC + s * 4.2, 42.0);
      sphere(THREE, g, 0.9, T.white, -15.0, YC + s * 4.2, 43.4, 12, 8);
    }
    roofRail(THREE, g, T, [[-32.4, YC + 5.2], [-13.6, YC + 5.2], [-13.6, YC - 5.2], [-32.4, YC - 5.2], [-32.4, YC + 5.2]], 41.3, 1.0);

    /* the weapons sponsons [F1][F2]: the port forward one low at 10.5 with
       an HHQ-10 (type NOT CONFIRMED), its mirror to starboard; Type 1130
       mounts on the after quarters (places NOT CONFIRMED); the white dome
       on the port deck edge at X -112 [F2] */
    function sponson(x0, x1, yIn, yOut, z) {
      var sg = yOut > 0 ? 1 : -1;
      box(THREE, g, x1 - x0, Math.abs(yOut - yIn), 0.6, T.sup, (x0 + x1) / 2, (yIn + yOut) / 2, z - 0.3);
      strut(THREE, g, T.sup, (x0 + x1) / 2, yOut - sg * 1.0, z - 0.6, (x0 + x1) / 2, yIn, z - 4.6, 0.5, 4);
      roofRail(THREE, g, T, [[x0 + 0.5, yOut - sg * 0.3], [x1 - 0.5, yOut - sg * 0.3]], z, 1.0);
    }
    sponson(80.0, 102.0, 20.0, 29.5, 10.5);
    var h1 = new THREE.Group(); h1.position.set(91.0, 25.0, 10.5); hhq10(THREE, h1, T); h1.rotation.z = PI; g.add(h1);
    sponson(84.0, 100.0, -21.0, -30.0, 10.5);
    var h2 = new THREE.Group(); h2.position.set(92.0, -25.5, 10.5); hhq10(THREE, h2, T); h2.rotation.z = PI; g.add(h2);
    sponson(-150.0, -136.0, 26.0, 33.0, FDB - 0.6);
    var c1 = new THREE.Group(); c1.position.set(-143.0, 29.6, FDB - 0.6); ciws(THREE, c1, T, 1.1); c1.rotation.z = 2.4; g.add(c1);
    sponson(-150.0, -136.0, -27.0, -34.0, FDB - 0.6);
    var c2 = new THREE.Group(); c2.position.set(-143.0, -30.6, FDB - 0.6); ciws(THREE, c2, T, 1.1); c2.rotation.z = -2.4; g.add(c2);
    cylZ(THREE, g, 0.6, 0.7, 1.2, 10, T.sup, -112.0, 38.6, FD + 0.6);
    sphere(THREE, g, 1.3, T.white, -112.0, 38.6, FD + 1.9, 14, 10);
    /* deck-edge catwalk rails round the bow (a few, as [F2] shows) */
    roofRail(THREE, g, T, [[150.0, 15.2], [114.3, 19.2]], FD, 0.9);
    roofRail(THREE, g, T, [[150.0, -14.6], [114.3, -20.3]], FD, 0.9);

    /* hawse pipes high in the bow flare [F2] */
    for (s = -1; s <= 1; s += 2) {
      var hz = 8.5, hx = 143.0, hy = s * (Hh.W(hx, hz) + 0.05);
      var ha = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.3, 12), T.dark);
      ha.position.set(hx, hy, hz); g.add(ha);
    }
    /* four shafts, screws, two rudders (NOT CONFIRMED) */
    [[5.0, -8.5], [12.0, -7.8]].forEach(function (q) {
      for (s = -1; s <= 1; s += 2) {
        cylX(THREE, g, 0.45, 0.45, 30.0, 8, T.metal, -118.0, s * q[0], q[1]);
        cylX(THREE, g, 0.6, 0.8, 1.2, 8, T.metal, -133.6, s * q[0], q[1]);
        for (i = 0; i < 5; i++) {
          var bl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.0, 2.6), T.metal);
          bl.position.set(-133.6, s * q[0], q[1]); bl.rotation.x = i * 2 * PI / 5 + 0.4;
          bl.translateZ(1.5); bl.rotation.y = 0.45; g.add(bl);
        }
      }
    });
    for (s = -1; s <= 1; s += 2) box(THREE, g, 5.0, 0.6, 6.0, T.metal, -140.0, s * 8.5, -4.5);

    /* (detail pass) fittings, none of them on the flight deck itself:
       - the safety nets all round the deck edge, sloping out and down
         from 0.4 m under the deck, with the gallery rail along their
         outer edge, still under the deck's level;
       - raft canisters in racks along the hull side under the overhang;
       - the anchors in their hawses, the cables up to the deck edge;
       - on the island: louvres and doors in the lower block, ladders up
         its after face, whips on the platforms, guys on the mast;
       - scuttles in rows along the hull side forward and aft            */
    var fm = new FK.Sink(), fd = new FK.Sink(), fw = new FK.Sink(), fg = new FK.Sink();
    (function () {
      var P = dk, n = P.length, q, ar = 0;
      for (q = 0; q < n; q++) ar += P[q][0] * P[(q + 1) % n][1] - P[(q + 1) % n][0] * P[q][1];
      var sg = ar > 0 ? 1 : -1;                         /* CCW: outward is right of the edge */
      for (q = 0; q < n; q++) {
        var a = P[q], b = P[(q + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
        if (L < 2.0) continue;
        var ox = sg * dy / L, oy = -sg * dx / L, w = 1.6, zi = FD - 0.4, zo = FD - 0.85;
        if (Math.abs(ox) > 0.45 || Math.max(Math.abs(a[0]), Math.abs(b[0])) > 156.0) continue;   /* none past the round-downs */
        var A = [a[0] + ox * 0.05, a[1] + oy * 0.05, zi], Bq = [b[0] + ox * 0.05, b[1] + oy * 0.05, zi];
        var Cq = [b[0] + ox * w, b[1] + oy * w, zo], Dq = [a[0] + ox * w, a[1] + oy * w, zo];
        FK.quad(fd, A, Bq, Cq, Dq, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, zi - 3]);
        FK.quad(fd, A, Dq, Cq, Bq, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, zi + 3]);
        FK.rail(fm, [Dq, Cq], 0.55, 2.2, 0.035);
      }
    })();
    for (s = -1; s <= 1; s += 2) {
      for (x = -110; x <= 40; x += 10.0) {
        if (x > -95 && x < -66 && s < 0) continue;
        if (x > 12 && x < 38 && s < 0) continue;
        var ry = s * (Hh.W(x, 11.2) + 0.45);
        FK.raft(fw, fm, x, ry, 10.6, 0, 1.5, 0.36);
        FK.raft(fw, fm, x + 2.0, ry, 10.6, 0, 1.5, 0.36);
        FK.boxZ(fm, x + 1.0, s * (Hh.W(x + 1.0, 10.4) + 0.2), 10.35, 3.8, 0.9, 0.18, 0);
      }
      var ahz = 8.5, ahx = 143.0, ahy = Hh.W(ahx, ahz);
      FK.anchor(fm, ahx, s * (ahy + 0.06), ahz, [0.45, s, 0.3], 2.2);
      FK.tube(fd, [ahx - 0.5, s * (Hh.W(ahx - 0.5, FDB) - 0.4), FDB + 0.2], [ahx - 0.5, s * (ahy + 0.1), ahz + 0.9], 0.12, 0.12, 4, false);
      for (x = -140; x <= 125; x += 4.5) {
        if (x > -100 && x < 60) continue;
        var sz = x > 0 ? 7.2 : 5.6, sy = Hh.W(x, sz);
        if (sy > 1) FK.disc(fg, [x, s * (sy + 0.04), sz], [0, s, 0], 0.22, 8);
      }
      /* island: louvres and a door on each long face of the lower block */
      FK.boxZ(fd, -30.0, YC + s * 9.03, FD + 0.6, 4.0, 0.1, 2.2, 0);
      FK.boxZ(fd, -12.0, YC + s * 9.03, FD + 0.6, 3.0, 0.1, 1.6, 0);
      FK.boxZ(fd, -20.0, YC + s * 9.03, FD, 1.1, 0.1, 2.1, 0);
      FK.ladder(fm, [-40.15, YC + s * 5.0, FD], [-40.15, YC + s * 5.0, 23.8], [0, 1, 0], 0.6, 0.35);
      FK.ladder(fm, [-36.0, YC + s * 5.5, 23.7], [-35.0, YC + s * 5.5, 27.0], [0, 1, 0], 0.6, 0.35);
      FK.whip(fm, -3.0, YC + s * 7.0, 28.05, 7.0, 0.06);
      FK.whip(fm, -43.0, YC + s * 7.0, 27.25, 6.0, 0.06);
      FK.tube(fm, [-19.6, YC, 55.0], [-21.0, YC + s * 5.0, 41.35], 0.03, 0.03, 3, false);
    }
    sinkOut(THREE, g, [[fm, T.metal], [fd, T.dark], [fw, T.white], [fg, T.glass]]);

    /* team: strips on the island roofs */
    box(THREE, g, 3.0, 1.4, 0.05, T.team, -9.0, YC, 23.73);
    box(THREE, g, 3.0, 1.4, 0.05, T.team, -28.0, YC, 41.33);
    box(THREE, g, 3.0, 1.4, 0.05, T.team, -36.0, YC, 23.73);
    g.updateMatrixWorld(true);
    return bake(THREE, g);
  }

  return { build052D: build052D, build055: build055, build094: build094, build003: build003 };
})();

/* Registration: len is each ship's drawn overall length. */
UNIT_MODELS["destroyer_c"] = {
  len: 157.0,
  build: function (THREE, M, C) { return HeroPLANModern.build052D(THREE, M, C); }
};
UNIT_MODELS["cruiser_c"] = {
  len: 180.0,
  build: function (THREE, M, C) { return HeroPLANModern.build055(THREE, M, C); }
};
UNIT_MODELS["ssbn_c"] = {
  len: 137.0,
  build: function (THREE, M, C) { return HeroPLANModern.build094(THREE, M, C); }
};
UNIT_MODELS["carrier_c"] = {
  len: 316.0,
  build: function (THREE, M, C) { return HeroPLANModern.build003(THREE, M, C); }
};

/* pla_e80_lst (Type 072 "Yukan", 1979-1995): HELD UNREGISTERED -- no reference found.
   Commons searches ("Type 072 landing ship", "Yukan", "072 tank landing ship" in Chinese,
   "Yukan-class tank landing ship") return only the later Type 072A (Yuting III), a different
   ship; no photograph or drawing of a Yukan was found, so (policy 1) nothing is drawn and the
   row keeps its generic model.
UNIT_MODELS["pla_e80_lst"] = { len: 120.0, build: ... };
*/
