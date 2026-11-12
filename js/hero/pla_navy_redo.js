/* ==================== js/hero/pla_navy_redo.js =========================
   HERO MODELS -- the PLA Navy rebuild round: three rows the owner called
   "bad", rebuilt from the references and REGISTERED OVER the earlier
   entries (this file loads after every PLA navy hero file and after
   js/hero/skirmish_reuse.js, and replaces these keys):

     lhd_c              Type 075 (Yushen) landing helicopter dock, Hainan
                        class.  Replaces js/hero/pla_lhd_type075.js's entry.
     pla_e00_corvette   Type 056 (Jiangdao) corvette, the original 056.
                        Replaces js/hero/pla_type056.js's entry.
     corvette_c         Type 056A, the same hull (skirmish_reuse.js copied
                        the e00 entry; it is registered here on its own
                        variant).  See "WHICH VARIANT" in the 056 block.
     ssbn_c             Type 094 (Jin) SSBN.  Replaces the entry in
                        js/hero/pla_navy_modern.js.

   POLICY 5 (reuse): no other hero draws these hulls; the three earlier
   files are what is being replaced, so nothing is called from them.  The
   geometry kit (FK, the textures, the materials) is copied from
   js/hero/roc_ships1.js (Tan Yang), with a lofted-hull builder, a faceted
   frustum and a polygon cap added.  Every part is emitted straight into
   one triangle sink per material, so each ship is one mesh per material
   (the 076/056 turret and the 075 well gate are their own groups).

   ---------------------------------------------------------------- 075
   PUBLISHED (en.wikipedia "Type 075 landing helicopter dock", raw
   wikitext read 2026-11-12): length 232 m, beam 36.8 m (MSA notice);
   flight deck 226 x 36 m; seven spots, six to port and one aft of the
   island; a forward lift for one medium helicopter and a larger stern
   lift; two weapons lifts forward; a 20 m well gate, an 80-90 m well;
   an opening each side to the vehicle deck; 2 x HHQ-10 and 2 x 11-barrel
   CIWS (the article calls them "H/PJ-14" and links Type 730; the brief
   calls them H/PJ-11: drawn as an 11-barrel gun house either way).
   REFERENCES (Wikimedia Commons, fetched 2026-11-12, scratchpad/q_plnr/ref):
     [A1] "Type 075 LHD-33 Anhui.png" -- straight down at sea, bow right,
          island on the starboard (lower) edge.  Stern corners x 245, bow
          x 1360 at 1600 px: 4.81 px/m on the 232 m; deck 375..555 = 37.4
          m across.  The deck outline and the stern notches, the spots and
          their lines, the dashed line, the stern lift (x 260-340, across
          the centreline), the forward lift (x 945-1045, to starboard of
          the centreline, just forward of the island), the weapons lift,
          the island strip (x 600-950 = X -42..+31, 11 m wide from the
          starboard edge), the edge sponsons.
     [A2] "PLANS Anhui (LHD-33) 20250516.jpg" (Japan MoD) -- starboard
          broadside, nearly level, 1600 x 452: stern x 190, deck front x
          1548, 5.85 px/m; waterline row 386.  Every height: deck edge
          19.5 m (row 272); island, X = -116 + (px - 190) / 5.85:
            after tower      X -36.5..-22.8, roof 30.6, its mast 37.4
            low deckhouse    roof 24.6 (5 m over the deck)
            glazed block     X -14.3..+1.4, top 32.3, two window rows
            forward tower    X +5.4..+14.0, 36.9; mast 50, pole 55
            bridge block     X +14.0..+22.5, 31.8, domes on its roof
            forward block    X +22.5..+30.0, 25.0, HHQ-10 on it
          the rows of windows in the topsides (rows 290 and 310: 16.5 and
          13 m), the balconies along the deck edge.
     [H1] "PLANS Hainan (LHD-31) starboard bow view.jpg" and [H2] "CNS
          Hainan.jpg" -- the bow: the flight deck runs out square over a
          deep fascia and the hull under it flares hard in to a raked stem
          about 13 m behind the deck front ([A2]: stem at the waterline at
          px 1470); the anchor high on the flare; the bridge with its wings,
          the domes, the deck-edge crane forward of the island with rafts
          under it; balconies and doors along the side.
     [H3] "PLANS Hainan (LHD-31) starboard aft view.jpg" -- the transom:
          flat, the ribbed 20 m gate in two rows of panels with a dark slot
          over it, a big open recess under the flight deck with a balcony
          rail, the port corner platform with the HHQ-10 box launcher, the
          starboard one with the CIWS; scuttles in the transom.
     ("Type 075.jpg" on Commons is an artist's render: not used.)
   NOT CONFIRMED (075): the draught (7.2 m, as the earlier model reasoned
   from the displacement) and everything under water (forefoot, two
   shafts, rudders); the island's plan widths (side views only; the
   overhead fixes its outer and inner edges); the port side (no port
   photograph: its balconies and door mirror the starboard ones); the two
   boats on port sponsons (boat-shaped objects on [A1], identity not
   seen); the forward CIWS on the port sponson (the only remaining mount
   on [A1]); the big array's size on the mast.  No hull number, spot
   numbers or flag.  The flight deck is one clean flat surface: spots,
   lifts and lines are paint in its texture, nothing stands on it.
   CONTRACT kept from the earlier model: X extent -116..+116 (232 m); the
   transom at X -112.9 (eras.js wellPts lhd_c [232, 85, 112.9]); a real
   well cavity 20 m wide, floor 0.2, deckhead 9.9, forward end X -28;
   root.userData.wellExit {x -112.9, z 0.2} and wellInner {x -80, z 0.2};
   the gate as the group "wellgate", hinged at its foot in a mount turned
   PI about X, so +rotation.y swings it aft and down (render3d.js
   swingGates, tools/jsc/wellgate3d_check.js).  No "helipad" node (the
   earlier model had none: a carrier's level is found by render3d deckOf).

   ---------------------------------------------------------------- 056
   PUBLISHED (en.wikipedia "Type 056 corvette"): 89-90 m, beam 11.14 m,
   draught 4 m; 1 x 76 mm H/PJ-26, 2 x 30 mm H/PJ-17, 2 x 2 YJ-83, 1 x 8
   HHQ-10, a helicopter deck and no hangar; the 056A adds a towed array
   and a variable-depth sonar.
   REFERENCES (Commons; the first four were fetched for the earlier model,
   scratchpad/q_pla_e00_corvette_ref; the rest 2026-11-12, q_plnr/ref):
     [C1] "596 Huizhou.jpg" -- a 056 (596) on a level port broadside, bow
          left, little perspective.  Stem head x 154.7, transom x 1173
          (orig. px): 1018 px = 89 m, 11.44 px/m; waterline row 815.7.
          EVERY STATION AND HEIGHT of the 056 is read off it, X = 44.5 -
          (px - 154.7) / 11.44:
            stem at the waterline X 40.3; stem head 5.6 m
            forecastle deck 4.9 (bulwark top 5.1)
            76 mm house X 24.6..28.3, top 7.0
            main superstructure front slope X 23.1 (foot) .. 20.2 (top);
            its roof (the integrated hull side) 6.6, to X -22.2, then a
            curve down to the pad by X -24.8; pad 5.9
            bridge block X 21.5..11.4, roof 8.6
            mast block X 11.4..5.3, roof 10.55; pyramid tower to 13.3;
            radar platform 14.2; the Type 360 to 16.3; masthead 18.2
            YJ-83 launchers X 4.3..1.0, 7.0..9.8
            funnel X -0.8..-6.7, top 11.9, its upper 3 m dark
            two radomes X -8.4 and -10.6, 8.3..9.6
            after mast X -12.2..-14.4, 11.7; two whips to 17.6
            HHQ-10 X -18.0..-20.7, 9.7..11.0, on a column
            knuckle line 3.2 m; quarter grilles X -36.8..-42.8, 4.5..5.0
     [C2] "Type 056 corvette anti-ship missiles.jpg" -- the YJ-83s: two
          launchers of two canisters stacked, crossed in an X on braced
          pedestals; the louvred funnel; the fire-control dish forward of
          the tower; a 30 mm remote mount low at the mast block's corner;
          oval openings in the bulwark; lockers on the funnel's sides.
     [C3] "Type 056 corvette FL-3000N 8-round SAM launcher.jpg" -- the
          HHQ-10 box on a side arm off a column, the after mast with a
          yard, a radome before it, railings round the roof.
     [C4] "Type 056 corvette ?.jpg" (title ends in a full-width question
          mark) -- port broadside, the order of everything, the anchor
          pocket, a Z-9 on the pad.
     [C5] "PLANS Suqian.jpg" -- a 056A (pennant 666) bow close up: the
          flared bow with the knuckle line, the anchor hawse high on the
          flare near the stem, the bulwark round the forecastle with its
          fairleads, the Type 360 back-to-back array, the bridge glazing.
     [C6] "PLANS Huangshi (FSG-502) 20170815.jpg" (Japan MoD) -- a 056A
          from the air: the pad over the stern with its white edge line
          and the folded safety nets round it, two grilles in each quarter,
          small square scuttles, the red boot topping.
   WHICH VARIANT: pla_e00_corvette (service 2013, the year the first 056
   commissioned) is the original 056; corvette_c is called "Type 056A" in
   js/warship_specs.js.  Above water the two photographs [C5][C6] of 056As
   show the same ship as [C1]; the 056A's difference is at the transom
   (the towed array and VDS openings), and NO photograph or drawing of
   a 056A's transom was found (Commons searches "Type 056A", "056A
   corvette", "Jiangdao", "Type 056A corvette stern", "PLANS FFL
   Jiangdao"; en.wikipedia's images on "Type 056 corvette").  Policy 1:
   the VDS and the towed-array door are NOT DRAWN; corvette_c is the same
   ship, registered on the "056A" variant (which differs only in the
   bow sonar dome being left off: the 056A's sonar is the towed one, and
   "the basic Type 056 is equipped with ... bow-mounted sonar").
   NOT CONFIRMED (056): the plan widths of the superstructure blocks (side
   views; chamfers from [C2][C3][C5]); the YJ-83 launchers' yaw (32 deg);
   the underwater body (draught 4 m published; keel 3.2 m and a bow dome
   to 4.0 m, two shafts and rudders from the two diesels); the raft
   canisters (white canisters are on every PLAN escort; none resolved on
   these photographs, placed abreast the funnel); the triple torpedo tubes
   (behind side doors on no reference: not drawn); no boats are drawn (no
   boat or davit shows on any reference).
   CONTRACT kept: the row is turret:true, the 76 mm is the group "turret"
   (origin on its ring, barrel along +X); a hidden "helipad" node on the
   middle of the pad.

   ---------------------------------------------------------------- 094
   PUBLISHED: length 137 m, beam 13 m; 12 JL-2 / JL-3 tubes.
   REFERENCES (q_plnm_ref, fetched for the earlier model):
     [S1] "Jin class SSBN.svg" -- the en.wikipedia profile, 1404 px:
          screw tip x 0 to bow x 1389 = 137 m, 10.14 px/m, X = px / 10.14
          - 68.5; the boot line (row 149..157) the surfaced waterline.  The
          hull top and keel table JIN below is the earlier model's reading
          of it, re-used; read again here: the SIX hatch pairs in profile
          at px 705-930 (X 1.0..23.2, pitch 3.8 m); the limber holes in
          about five rows on the hump flank in two groups, px 575-930 and
          937-1090 (X -11.8..23.2 and 23.9..39.0), rows 117-137 (z 1.6..
          3.5); the long dark casing lines (X -43..-27.6 at z 1.6; -21..
          -11.3 at 2.2; 36.5..57.7 falling from 2.2 to -0.5 forward); the
          sail's windows (three at its forward top, two at its after top);
          the upper and lower rudders with their hinged after parts, the
          stern planes on the axis, the 7-bladed skewed screw; a small post
          on the forward casing (X 60).
     [S2] "Jin (Type 094) Class Ballistic Missile Submarine.JPG" -- two
          094s alongside: matt black, the hatches in two rows of six (open
          in the photo: drawn shut), the sail planes on the forward half
          of the sail, the grid of free-flood holes on the hump's flank.
   The tail is CRUCIFORM ([S1]: upper and lower rudders and horizontal
   stern planes), not an X.  Anechoic tiles are a texture (a tile grid
   with some lifted and patched tiles); the hatch outlines, the limber
   holes, the casing lines and the windows are geometry.
   NOT CONFIRMED (094): the sail's plan width (2.9 m) and its rounded
   nose; the sail planes' span (3.0 m each) and their height (8.3, from
   [S2]); the stern planes' span (6.6 m from the axis); the hull section
   (no end view); the hatch diameter (2.5 m); the masts.  WHICH BOAT: the
   original 094 (the row says 094A from 2018; both references show the
   094, whose sail has no fairing at its forward foot).
   CONTRACT kept: len 137; no named nodes (the earlier entry had none, and
   the SSBN rows fire from the unit, tools/jsc/ssbn_ai_check.js).

   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0 (the
   submarine at its surfaced trim).  Plain PLAN light grey (the 094 matt
   black), red anti-fouling, no numbers, names, flags or stars.  The team
   colour C.team as small strips.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPLANavyRedo = (function () {
  "use strict";
  var PI = Math.PI, TW = PI * 2;

  /* ================================================================ KIT
     (FK from js/hero/roc_ships1.js; frustum, capPoly, dome and the hull
     loft added).  Everything is emitted as outward-wound triangles into a
     Sink; one Sink per material becomes one mesh.                       */
  function sb(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cr(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dt(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function nz(v) { var l = Math.sqrt(dt(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function ad(a, b, k) { return [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function tri(s, a, b, c, ref) {
    var n = cr(sb(b, a), sb(c, a));
    if (dt(n, n) < 1e-12) return;
    if (ref) {
      var m = [(a[0] + b[0] + c[0]) / 3 - ref[0], (a[1] + b[1] + c[1]) / 3 - ref[1], (a[2] + b[2] + c[2]) / 3 - ref[2]];
      if (dt(n, m) < 0) { s.tri(a, c, b); return; }
    }
    s.tri(a, b, c);
  }
  function quad(s, a, b, c, d, ref) { tri(s, a, b, c, ref); tri(s, a, c, d, ref); }
  function tube(s, A, B, ra, rb, n, caps) {
    var d = sb(B, A); if (dt(d, d) < 1e-10) return;
    var ax = nz(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = nz(cr(ax, t)), v = cr(ax, u), RA = [], RB = [], i, j, mid = ad(A, d, 0.5);
    for (i = 0; i < n; i++) {
      var c = Math.cos(i / n * TW + 0.5), sn = Math.sin(i / n * TW + 0.5);
      var r = [u[0] * c + v[0] * sn, u[1] * c + v[1] * sn, u[2] * c + v[2] * sn];
      RA.push(ad(A, r, ra)); RB.push(ad(B, r, rb));
    }
    for (i = 0; i < n; i++) {
      j = (i + 1) % n;
      if (ra > 0) tri(s, RA[i], RA[j], RB[j], mid);
      if (rb > 0) tri(s, RA[i], RB[j], RB[i], mid);
      if (caps) { if (rb > 0) tri(s, B, RB[i], RB[j], A); if (ra > 0) tri(s, A, RA[j], RA[i], B); }
    }
  }
  function lerp3(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
  function obox(s, c, ex, ey, ez, lx, ly, lz) {
    var V = [], i, F = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
    for (i = 0; i < 8; i++) {
      var a = (i & 1 ? 0.5 : -0.5) * lx, b = (i & 2 ? 0.5 : -0.5) * ly, e = (i & 4 ? 0.5 : -0.5) * lz;
      V.push([c[0] + ex[0] * a + ey[0] * b + ez[0] * e, c[1] + ex[1] * a + ey[1] * b + ez[1] * e, c[2] + ex[2] * a + ey[2] * b + ez[2] * e]);
    }
    F.forEach(function (f) { quad(s, V[f[0]], V[f[1]], V[f[2]], V[f[3]], c); });
  }
  function boxZ(s, x, y, z0, lx, ly, lz, yaw) {
    var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    obox(s, [x, y, z0 + lz / 2], [c, sn, 0], [-sn, c, 0], [0, 0, 1], lx, ly, lz);
  }
  /* an axis-aligned box from its extents */
  function bx(s, x0, x1, y0, y1, z0, z1) { boxZ(s, (x0 + x1) / 2, (y0 + y1) / 2, z0, Math.abs(x1 - x0), Math.abs(y1 - y0), z1 - z0, 0); }
  function cylZ(s, x, y, z0, h, r, n, r2) { tube(s, [x, y, z0], [x, y, z0 + h], r, r2 === undefined ? r : r2, n, true); }
  function disc(s, c, nrm, r, n, ry) {
    var a = nz(nrm), t = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = nz(cr(a, t)), v = cr(a, u), P = [], i;
    for (i = 0; i < n; i++) P.push(ad(ad(c, u, Math.cos(i / n * TW) * (ry || r)), v, Math.sin(i / n * TW) * r));
    var back = ad(c, a, -1);
    for (i = 1; i < n - 1; i++) tri(s, P[0], P[i], P[i + 1], back);
  }
  /* a flat rectangle (window, door, grille) on a plane through c facing
     nrm, w across (horizontal) and h up                                  */
  function panel(s, c, nrm, w, h) {
    var a = nz(nrm), u = nz(cr([0, 0, 1], a));
    if (dt(u, u) < 0.5) u = [1, 0, 0];
    var v = cr(a, u), hw = w / 2, hh = h / 2;
    quad(s, ad(ad(c, u, -hw), v, -hh), ad(ad(c, u, hw), v, -hh), ad(ad(c, u, hw), v, hh), ad(ad(c, u, -hw), v, hh), ad(c, a, -1));
  }
  function rail(s, pts, h, step, rp) {
    var i, k, carry = 0; rp = rp || 0.03; h = h || 1.0; step = step || 1.5;
    function post(p) { tube(s, p, [p[0], p[1], p[2] + h], rp, rp, 3, false); }
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], d = sb(b, a), L = Math.sqrt(dt(d, d));
      if (L < 1e-3) continue;
      tube(s, [a[0], a[1], a[2] + h], [b[0], b[1], b[2] + h], rp * 0.9, rp * 0.9, 3, false);
      tube(s, [a[0], a[1], a[2] + h * 0.5], [b[0], b[1], b[2] + h * 0.5], rp * 0.6, rp * 0.6, 3, false);
      for (k = carry; k < L; k += step) post(ad(a, d, k / L));
      carry = k - L;
    }
    post(pts[pts.length - 1]);
  }
  function bollard(s, x, y, z, yaw, k) {
    k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    boxZ(s, x, y, z, 0.9 * k, 0.36 * k, 0.05 * k, yaw);
    [-1, 1].forEach(function (e) {
      var px = x + c * e * 0.26 * k, py = y + sn * e * 0.26 * k;
      cylZ(s, px, py, z + 0.05 * k, 0.36 * k, 0.12 * k, 8);
      cylZ(s, px, py, z + 0.41 * k, 0.05 * k, 0.15 * k, 8);
    });
  }
  function fairlead(s, x, y, z, yaw, k) {
    k = k || 1; var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    boxZ(s, x, y, z, 0.8 * k, 0.32 * k, 0.07 * k, yaw);
    [-1, 1].forEach(function (e) { cylZ(s, x + c * e * 0.22 * k, y + sn * e * 0.22 * k, z + 0.07 * k, 0.26 * k, 0.09 * k, 8); });
  }
  function hatch(s, x, y, z, lx, ly, yaw) {
    var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    boxZ(s, x, y, z, lx, ly, 0.10, yaw);
    boxZ(s, x, y, z + 0.10, lx - 0.08, ly - 0.08, 0.04, yaw);
    var hx = x - c * lx * 0.5, hy = y - sn * lx * 0.5;
    tube(s, [hx + sn * ly * 0.4, hy - c * ly * 0.4, z + 0.12], [hx - sn * ly * 0.4, hy + c * ly * 0.4, z + 0.12], 0.035, 0.035, 4, true);
  }
  function mushroom(s, x, y, z, r, h) {
    cylZ(s, x, y, z, h, r, 8);
    cylZ(s, x, y, z + h, r * 0.5, r * 1.7, 8, r * 0.6);
  }
  function goose(s, x, y, z, r, h, yaw) {
    var c = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    tube(s, [x, y, z], [x, y, z + h], r, r, 6, false);
    tube(s, [x, y, z + h - r], [x + c * r * 2.4, y + sn * r * 2.4, z + h - r * 2.2], r * 1.05, r * 1.15, 6, true);
  }
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
  function ladder(s, A, B, side, w, step) {
    w = (w || 0.5) / 2; step = step || 0.3;
    var e = [side[0] * w, side[1] * w, 0], d = sb(B, A), L = Math.sqrt(dt(d, d)), n = Math.max(1, Math.floor(L / step)), i;
    tube(s, ad(A, e, 1), ad(B, e, 1), 0.025, 0.025, 4, false);
    tube(s, ad(A, e, -1), ad(B, e, -1), 0.025, 0.025, 4, false);
    for (i = 1; i <= n; i++) { var p = ad(A, d, i / (n + 0.5)); tube(s, ad(p, e, 1), ad(p, e, -1), 0.016, 0.016, 3, false); }
  }
  function anchor(s, x, y, z, out, k) {
    k = k || 1;
    var o = nz(out), ez = [0, 0, 1], ex = nz(cr(ez, o)), p = ad([x, y, z], o, 0.10 * k);
    tube(s, [x, y, z], ad([x, y, z], o, 0.14 * k), 0.30 * k, 0.34 * k, 10, true);
    obox(s, ad(p, ez, -0.62 * k), ex, o, ez, 0.17 * k, 0.12 * k, 1.0 * k);
    obox(s, ad(p, ez, -1.12 * k), ex, o, ez, 0.75 * k, 0.16 * k, 0.16 * k);
    [-1, 1].forEach(function (e) {
      tube(s, ad(ad(p, ez, -1.12 * k), ex, e * 0.36 * k), ad(ad(p, ez, -0.72 * k), ex, e * 0.24 * k), 0.09 * k, 0.04 * k, 4, true);
    });
  }
  function whip(s, x, y, z, h, r) {
    r = r || 0.03;
    cylZ(s, x, y, z, 0.3, r * 2.5, 6);
    tube(s, [x, y, z + 0.3], [x, y, z + h], r, r * 0.3, 4, false);
  }
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
  /* a sphere or a dome (part of one: top half when half is set)         */
  function sphere(s, c, r, n, half, sz) {
    var m = Math.max(3, n >> 1), i, j, k0 = half ? m >> 1 : 0;
    sz = sz || 1;
    function P(i, j) {
      var th = PI * i / m, ph = TW * j / n;
      return [c[0] + r * Math.sin(th) * Math.cos(ph), c[1] + r * Math.sin(th) * Math.sin(ph), c[2] + r * sz * Math.cos(th)];
    }
    var top = half ? Math.ceil(m / 2) : m;
    for (i = 0; i < top; i++) for (j = 0; j < n; j++) quad(s, P(i, j), P(i + 1, j), P(i + 1, j + 1), P(i, j + 1), c);
    if (half) for (j = 1; j < n - 1; j++) tri(s, P(top, 0), P(top, j), P(top, j + 1), [c[0], c[1], c[2] + r]);
    return k0;
  }
  /* a faceted block: polygon A (CCW from above) at z0 to polygon B at
     z1, the same vertex count; o.top / o.bot: sinks for the caps (false
     leaves a cap off); o.face(i): the sink for side face i              */
  function frustum(s, A, z0, B, z1, o) {
    o = o || {};
    var n = A.length, i, cx = 0, cy = 0;
    for (i = 0; i < n; i++) { cx += A[i][0] + B[i][0]; cy += A[i][1] + B[i][1]; }
    cx /= 2 * n; cy /= 2 * n;
    var ref = [cx, cy, (z0 + z1) / 2];
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n, fs = o.face ? (o.face(i) || s) : s;
      quad(fs, [A[i][0], A[i][1], z0], [A[j][0], A[j][1], z0], [B[j][0], B[j][1], z1], [B[i][0], B[i][1], z1], null);   /* CCW: outward */
    }
    if (o.top !== false) for (i = 1; i < n - 1; i++) tri(o.top || s, [B[0][0], B[0][1], z1], [B[i][0], B[i][1], z1], [B[i + 1][0], B[i + 1][1], z1], [cx, cy, z1 - 1]);
    if (o.bot) for (i = 1; i < n - 1; i++) tri(o.bot, [A[0][0], A[0][1], z0], [A[i][0], A[i][1], z0], [A[i + 1][0], A[i + 1][1], z0], [cx, cy, z0 + 1]);
  }
  function prism(s, P, z0, z1, o) { frustum(s, P, z0, P, z1, o); }
  function chamf(x0, x1, y0, y1, c) {
    return [[x0 + c, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0 + c, y1], [x0, y1 - c], [x0, y0 + c]];
  }
  /* a convex CCW polygon offset inward by d                              */
  function inset(P, d) {
    var n = P.length, out = [], i;
    for (i = 0; i < n; i++) {
      var a = P[(i + n - 1) % n], b = P[i], c = P[(i + 1) % n];
      var e1 = nz([b[0] - a[0], b[1] - a[1], 0]), e2 = nz([c[0] - b[0], c[1] - b[1], 0]);
      var n1 = [-e1[1], e1[0]], n2 = [-e2[1], e2[0]];          /* inward normals of a CCW polygon */
      var k = 1 + n1[0] * n2[0] + n1[1] * n2[1];
      out.push([b[0] + d * (n1[0] + n2[0]) / k, b[1] + d * (n1[1] + n2[1]) / k]);
    }
    return out;
  }
  /* a flat polygon (any shape, CCW from above) at height z, facing up or
     down; holes optional                                                 */
  function capPoly(THREE, s, P, z, up, holes) {
    var V = P.map(function (p) { return new THREE.Vector2(p[0], p[1]); });
    var H = (holes || []).map(function (h) { return h.map(function (p) { return new THREE.Vector2(p[0], p[1]); }); });
    var all = V.slice(); H.forEach(function (h) { all = all.concat(h); });
    var T = THREE.ShapeUtils.triangulateShape(V, H);
    T.forEach(function (t) {
      var a = all[t[0]], b = all[t[1]], c = all[t[2]];
      tri(s, [a.x, a.y, z], [b.x, b.y, z], [c.x, c.y, z], [(a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3, z + (up ? -1 : 1)]);
    });
  }
  /* weathering over a painted canvas (roc_ships1.js FK.weather)          */
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

  /* ------------------------------------------------------------- sinks */
  function Sink() { this.p = []; }
  Sink.prototype.tri = function (a, b, c) { this.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); };
  /* uv by box projection at `tile` metres a repeat, or by uvf(x, y, z)  */
  Sink.prototype.geo = function (THREE, tile, uvf) {
    if (!this.p.length) return null;
    var P = this.p, U = [], i, k, q = 1 / (tile || 4);
    for (i = 0; i < P.length; i += 9) {
      var n = cr(sb([P[i + 3], P[i + 4], P[i + 5]], [P[i], P[i + 1], P[i + 2]]), sb([P[i + 6], P[i + 7], P[i + 8]], [P[i], P[i + 1], P[i + 2]]));
      var ax = Math.abs(n[0]), ay = Math.abs(n[1]), az = Math.abs(n[2]);
      for (k = 0; k < 9; k += 3) {
        if (uvf) { var uv = uvf(P[i + k], P[i + k + 1], P[i + k + 2]); U.push(uv[0], uv[1]); }
        else if (az >= ax && az >= ay) U.push(P[i + k] * q, P[i + k + 1] * q);
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
  function sinks(keys) { var S = {}; keys.forEach(function (k) { S[k] = new Sink(); }); return S; }
  /* the sinks out as one mesh each under parent                          */
  function emit(THREE, parent, S, T, TILE, UVF) {
    Object.keys(S).forEach(function (k) {
      var g = S[k].geo(THREE, (TILE && TILE[k]) || 4, UVF && UVF[k]);
      if (!g) return;
      var m = new THREE.Mesh(g, T[k]); m.castShadow = true; m.receiveShadow = true;
      parent.add(m);
    });
  }

  /* -------------------------------------------------------- hull loft
     xs: stations; sec(x) -> array of [y, z] from the keel (y = 0) up the
     port side to the top edge, the same count at every station; band(z)
     -> the sink key for a face whose middle is at z; zc(x) the height of
     the section's middle (to turn the faces outward).  Both sides.      */
  function hullLoft(S, xs, sec, band, zc) {
    var R = xs.map(function (x) { return sec(x); }), i, j, e;
    for (i = 0; i < xs.length - 1; i++) {
      var A = R[i], B = R[i + 1], x0 = xs[i], x1 = xs[i + 1], zr = (zc(x0) + zc(x1)) / 2;
      for (j = 0; j < A.length - 1; j++) for (e = -1; e <= 1; e += 2) {
        var zm = (A[j][1] + A[j + 1][1] + B[j][1] + B[j + 1][1]) / 4;
        /* wound by the ring's own direction (keel up the side): outward */
        var qa = [x0, e * A[j][0], A[j][1]], qb = [x1, e * B[j][0], B[j][1]], qc = [x1, e * B[j + 1][0], B[j + 1][1]], qd = [x0, e * A[j + 1][0], A[j + 1][1]];
        if (e > 0) quad(S[band(zm)], qa, qd, qc, qb); else quad(S[band(zm)], qa, qb, qc, qd);
      }
    }
    return R;
  }
  /* y at height z on a list of [z, y] control points (rising z)          */
  function yAt(C, z) {
    if (z <= C[0][0]) return C[0][1];
    for (var i = 1; i < C.length; i++) if (z <= C[i][0]) return lerp(C[i - 1][1], C[i][1], (z - C[i - 1][0]) / Math.max(1e-6, C[i][0] - C[i - 1][0]));
    return C[C.length - 1][1];
  }
  /* a station table [[x, a, b, ...], ...] read at x, linearly           */
  function tab(T, x) {
    if (x <= T[0][0]) return T[0].slice();
    for (var i = 1; i < T.length; i++) if (x <= T[i][0]) {
      var a = T[i - 1], b = T[i], f = (x - a[0]) / (b[0] - a[0]);
      return a.map(function (v, k) { return lerp(v, b[k], f); });
    }
    return T[T.length - 1].slice();
  }
  /* the levels of a section: under water from the keel up (bilge points
     packed near the bottom), the boot lines, then the levels above        */
  var UNDER_S = [0, 0.015, 0.04, 0.08, 0.14, 0.22, 0.33, 0.47, 0.62, 0.78, 0.9];

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
    t.anisotropy = 4;
    TEX[key] = t; return t;
  }
  /* hull plating: strakes, staggered butts, weld beads, streaks, rust    */
  function hullTex(THREE) {
    return canvasTex(THREE, "pnrHull", 512, 256, function (g, w, h) {
      var R = rng(9050), i, j;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.16; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke(); }
      for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) {
        var xx = i * w / 4 + (j % 2) * w / 8;
        g.beginPath(); g.moveTo(xx, j * h / 4); g.lineTo(xx, (j + 1) * h / 4); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 50; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 2 + R() * 5, 18 + R() * 80); }
      g.globalAlpha = 1;
      g.fillStyle = "rgba(0,0,0,0.12)";
      for (i = 1; i < 4; i++) for (j = 0; j < 128; j++) g.fillRect(j * 4 + 1, i * h / 4 + 2, 1, 1);
      weather(g, w, h, 9051, 50, 1.0);
    });
  }
  /* superstructure plating: panels, seams, rivet lines, grime          */
  function plateTex(THREE) {
    return canvasTex(THREE, "pnrPlate", 256, 256, function (g, w, h) {
      var R = rng(9017), i, j;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.15; g.strokeStyle = "#000000"; g.lineWidth = 1.4;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 26; i++) { g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000"; g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30); }
      g.globalAlpha = 1;
      g.fillStyle = "rgba(0,0,0,0.18)";
      for (i = 1; i < 4; i++) for (j = 0; j < 32; j++) { g.fillRect(j * 8 + 3, i * h / 4 + 3, 1.4, 1.4); g.fillRect(i * w / 4 + 3, j * 8 + 3, 1.4, 1.4); }
      weather(g, w, h, 9018, 24, 0.8);
    });
  }
  /* weather deck: non-skid squares, seams, scuffs                       */
  function deckTex(THREE) {
    return canvasTex(THREE, "pnrDeck", 256, 256, function (g, w, h) {
      var R = rng(9011), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 40; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
      weather(g, w, h, 9012, 16, 0.6);
    });
  }
  /* anechoic tiles: a grid of 0.6 m tiles (8 to a 4.8 m repeat), a few
     lifted or patched, salt and grime                                   */
  function tileTex(THREE) {
    return canvasTex(THREE, "pnrTile", 256, 256, function (g, w, h) {
      var R = rng(9094), i, j, n = 8, c = w / n;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
        var v = 0.9 + R() * 0.1;
        if (R() < 0.04) v = 0.7;
        var k = Math.round(255 * v);
        g.fillStyle = "rgb(" + k + "," + k + "," + k + ")";
        g.fillRect(i * c + (j % 2) * c * 0.5, j * c, c, c);
      }
      g.strokeStyle = "rgba(0,0,0,0.38)"; g.lineWidth = 1.4;
      for (j = 0; j <= n; j++) { g.beginPath(); g.moveTo(0, j * c); g.lineTo(w, j * c); g.stroke(); }
      for (j = 0; j < n; j++) for (i = 0; i <= n; i++) {
        var xx = i * c + (j % 2) * c * 0.5;
        g.beginPath(); g.moveTo(xx, j * c); g.lineTo(xx, (j + 1) * c); g.stroke();
      }
      g.fillStyle = "rgba(0,0,0,0.55)";
      for (i = 0; i < 4; i++) g.fillRect(R() * w, R() * h, c * 0.9, c * 0.9);
      weather(g, w, h, 9095, 20, 0.5);
    });
  }
  /* a louvre / grille panel                                              */
  function grilleTex(THREE) {
    return canvasTex(THREE, "pnrGrille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#3a3e41"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#0e1011";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
    });
  }
  /* the 075's well: dark plating with ribs, wet floor                    */
  function wellTex(THREE) {
    return canvasTex(THREE, "pnrWell", 256, 256, function (g, w, h) {
      var i;
      g.fillStyle = "#4c5154"; g.fillRect(0, 0, w, h);
      g.fillStyle = "rgba(0,0,0,0.35)";
      for (i = 0; i < 8; i++) g.fillRect(i * w / 8, 0, 4, h);
      g.fillRect(0, h / 2, w, 3);
      weather(g, w, h, 9301, 30, 1.2);
    });
  }

  /* materials: PLAN light grey, red anti-fouling, a dark grey boot top   */
  function makeMats(THREE, C, P) {
    var team = (C && C.team !== undefined) ? C.team : 0x3f7fd0;
    function skin(col, tex, r, ds) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06, side: ds ? THREE.DoubleSide : THREE.FrontSide });
    }
    function plain(col, r, m, ds) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: ds ? THREE.DoubleSide : THREE.FrontSide });
    }
    P = P || {};
    var T = {
      hull:  skin(P.hull || 0x9ca3a8, hullTex(THREE), 0.86),
      under: skin(P.under || 0x6e2b24, hullTex(THREE), 0.9),
      boot:  skin(P.boot || 0x34383b, hullTex(THREE), 0.9),
      sup:   skin(P.sup || 0xa4abb0, plateTex(THREE), 0.84),
      deck:  skin(P.deck || 0x666d72, deckTex(THREE), 0.95),
      dark:  plain(0x15181a, 0.35, 0.2, true),
      grille: skin(0xffffff, grilleTex(THREE), 0.8),
      soot:  plain(0x232628, 0.8, 0.2),
      metal: plain(P.metal || 0x7b8389, 0.55, 0.45, true),
      white: plain(0xe2e5e4, 0.6, 0.05),
      team:  new THREE.MeshStandardMaterial({ color: new THREE.Color(team), roughness: 0.6, metalness: 0.08 })
    };
    Object.keys(T).forEach(function (k) { T[k].userData = T[k].userData || {}; T[k].userData._srgbDone = true; });
    return T;
  }
  var TILE = { hull: 8, under: 8, boot: 8, sup: 6, deck: 5, grille: 1.6, tile: 4.8, well: 8 };

  /* ===================================================== COMMON MOUNTS */
  /* HHQ-10 (FL-3000N) box launcher, cells facing +X before yaw; on a
     column with a side arm [C3]/[H1]; cells rows x cols                  */
  function hhq10(S, x, y, z, yaw, rows, cols, col) {
    var c = Math.cos(yaw), sn = Math.sin(yaw), h = col ? 1.6 : 0.5;
    cylZ(S.sup, x, y, z, 0.35, 1.0, 12);
    cylZ(S.sup, x, y, z + 0.35, h, 0.42, 10);
    var W = cols * 0.42 + 0.3, H = rows * 0.42 + 0.3, zc = z + 0.35 + h + H / 2 - 0.2;
    obox(S.sup, [x - c * 0.2, y - sn * 0.2, zc], [c, sn, 0], [-sn, c, 0], [0, 0, 1], 2.4, W, H);
    var i, j;
    for (i = 0; i < rows; i++) for (j = 0; j < cols; j++) {
      var yy = -W / 2 + 0.36 + j * 0.42 + 0.0, zz = zc - H / 2 + 0.36 + i * 0.42 - 0.0;
      var px = x - c * 0.2 + c * 1.21 - sn * yy, py = y - sn * 0.2 + sn * 1.21 + c * yy;
      disc(S.dark, [px, py, zz], [c, sn, 0], 0.16, 8);
    }
    obox(S.metal, [x - c * 1.5, y - sn * 1.5, zc], [c, sn, 0], [-sn, c, 0], [0, 0, 1], 0.3, W * 0.6, H * 0.6);
  }
  /* an 11-barrel CIWS gun house (H/PJ-11 / -14 class): a faceted house
     on a ring, the barrel cluster forward, optronic head beside          */
  function ciws11(S, x, y, z, yaw) {
    var c = Math.cos(yaw), sn = Math.sin(yaw);
    function P(a, b) { return [x + c * a - sn * b, y + sn * a + c * b]; }
    cylZ(S.sup, x, y, z, 0.5, 1.6, 14);
    var A = [P(-1.6, -1.2), P(1.2, -1.2), P(1.7, -0.7), P(1.7, 0.7), P(1.2, 1.2), P(-1.6, 1.2)];
    var B = [P(-1.4, -0.9), P(0.9, -0.9), P(1.3, -0.5), P(1.3, 0.5), P(0.9, 0.9), P(-1.4, 0.9)];
    frustum(S.sup, A, z + 0.5, B, z + 2.3, {});
    var g0 = [x + c * 1.6, y + sn * 1.6, z + 1.3], g1 = [x + c * 4.2, y + sn * 4.2, z + 1.3];
    tube(S.metal, g0, g1, 0.36, 0.3, 11, true);
    tube(S.dark, g1, [g1[0] + c * 0.05, g1[1] + sn * 0.05, g1[2]], 0.31, 0.31, 11, true);
    boxZ(S.sup, x - sn * 1.3, y + c * 1.3, z + 1.9, 0.7, 0.5, 0.6, yaw);
    disc(S.dark, [x - sn * 1.3 + c * 0.36, y + c * 1.3 + sn * 0.36, z + 2.2], [c, sn, 0], 0.18, 8);
  }

  /* ================================================================= 075 */
  var L5 = {
    XB: 116.0, XS: -116.0, HX0: -112.9, FT: 19.6, FB: 15.2, KEEL: -7.2, DHW: 18.0,
    WZ0: 0.2, WZ1: 9.9, WHW: 10.0, WX1: -28.0, GATE: 7.8, ZP: 17.1
  };
  /* the flight deck's outline, CCW from above [A1]: the bow square with
     small chamfers, the two stern notches where the corner platforms sit */
  var DECK5 = [
    [116.0, -16.8], [116.0, 16.8], [114.8, 18.0], [-107.6, 18.0], [-107.6, 15.1], [-112.9, 15.1],
    [-112.9, -7.4], [-109.4, -7.4], [-109.4, -18.0], [114.8, -18.0]
  ];
  var SPOTS5 = [[96.7, 9.9], [59.5, 9.9], [23.1, 9.9], [-13.3, 9.9], [-50.5, 10.0], [-88.1, 10.2]];
  var SPOT57 = [-74.7, -10.4];
  var LIFT5A = [-112.9, -97.3, -7.5, 7.8], LIFT5F = [29.6, 49.5, -9.35, -1.7], LIFT5W = [69.4, 75.0, -5.2, 2.2];
  /* hull stations [x, keel z, half-beam at the waterline, half-beam at
     15.2, flare exponent, bilge exponent] [A1][A2][H1][H2]: slab sides
     amidships to the deck's 18.0, the bow flaring out from a fine
     entrance to the full-width fascia, the stem 13 m behind the deck    */
  var ST5 = [
    [-112.9, -1.6, 15.8, 18.0, 1.4, 4.5],
    [-106.0, -3.8, 16.4, 18.0, 1.4, 4.5],
    [ -96.0, -5.8, 16.7, 18.0, 1.4, 4.5],
    [ -80.0, -7.0, 16.8, 18.0, 1.4, 4.5],
    [  50.0, -7.2, 16.8, 18.0, 1.4, 4.5],
    [  64.0, -7.2, 16.2, 18.0, 1.4, 4.0],
    [  76.0, -7.1, 14.4, 17.8, 1.5, 3.2],
    [  85.0, -6.8, 12.0, 17.3, 1.6, 2.6],
    [  92.0, -6.0, 9.2, 16.4, 1.7, 2.2],
    [  97.0, -4.6, 6.2, 15.3, 1.8, 2.0],
    [ 100.5, -2.4, 3.2, 14.0, 1.6, 2.0],
    [ 103.0, 0.0, 0.0, 12.6, 1.3, 2.0],
    [ 106.0, 4.5, 0.0, 10.6, 1.2, 2.0],
    [ 109.5, 9.5, 0.0, 7.6, 1.15, 2.0],
    [ 112.0, 13.4, 0.0, 4.0, 1.1, 2.0],
    [ 113.2, 15.2, 0.0, 0.2, 1.0, 2.0]
  ];
  var ABOVE5 = [0.6, 1.8, 3.5, 5.5, 8.0, 10.5, 13.0, 15.2];
  function sec5(x) {
    var r = tab(ST5, x), kz = r[1], hwl = r[2], htop = r[3], p = r[4], n = r[5], out = [];
    UNDER_S.forEach(function (s) {
      if (kz >= -0.6) { out.push([0, kz]); return; }
      var z = kz * (1 - s) + (-0.6) * s * 0;          /* from the keel up to the boot line */
      z = kz + (-0.6 - kz) * s;
      var t = Math.min(1, Math.abs(z / kz));
      out.push([s === 0 ? 0 : hwl * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n), z]);
    });
    [-0.6, 0.0].forEach(function (z) {
      if (kz >= z) { out.push([0, kz]); return; }
      var t = Math.abs(z / kz); out.push([hwl * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n), z]);
    });
    ABOVE5.forEach(function (z0) {
      var z = Math.max(z0, kz);
      if (kz >= 0) out.push([htop * Math.pow((z - kz) / Math.max(0.01, L5.FB - kz), p), z]);
      else out.push([hwl + (htop - hwl) * Math.pow(z / L5.FB, p), z]);
    });
    return out;
  }
  function band5(z) { return z < -0.6 ? "under" : z < 0.6 ? "boot" : "hull"; }

  /* the flight deck canvas: X -116..116 -> u, Y -18.4..18.4 -> v (port
     at the canvas top); spots, lines and lifts off [A1]                  */
  var FDW = 2048, FDH = 325;
  function fdeckTex(THREE) {
    return canvasTex(THREE, "pnrFdeck075", FDW, FDH, function (g, w, h) {
      function U(x) { return (x + 116) / 232 * w; }
      function V(y) { return (18.4 - y) / 36.8 * h; }
      var K = w / 232, R = rng(7505), i;
      g.fillStyle = "#5d6063"; g.fillRect(0, 0, w, h);
      /* non-skid panels: a seam every 12 m, patches of fresher coating */
      g.globalAlpha = 0.06;
      for (i = 0; i < 260; i++) { g.fillStyle = R() < 0.55 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 10 + R() * 50, 3 + R() * 10); }
      g.globalAlpha = 0.18; g.strokeStyle = "#1e2022"; g.lineWidth = 1;
      for (i = -110; i < 116; i += 12) { g.beginPath(); g.moveTo(U(i), 0); g.lineTo(U(i), h); g.stroke(); }
      g.globalAlpha = 1;
      function line(x0, y0, x1, y1, col, lw, dash) {
        g.strokeStyle = col; g.lineWidth = lw * K; g.setLineDash ? g.setLineDash(dash ? [dash[0] * K, dash[1] * K] : []) : 0;
        g.beginPath(); g.moveTo(U(x0), V(y0)); g.lineTo(U(x1), V(y1)); g.stroke();
        if (g.setLineDash) g.setLineDash([]);
      }
      var WH = "#d9dad4", YE = "#d8b03a";
      /* the deck-edge lines and the dashed line down the deck [A1]     */
      line(-108, 17.3, 115, 17.3, WH, 0.35); line(-108, -17.3, 115, -17.3, WH, 0.35);
      line(-112, -5.2, 115, -5.2, WH, 0.3, [3, 2.5]);
      line(115.2, -16.6, 115.2, 16.6, WH, 0.35);
      /* the six spots to port and the seventh aft of the island: a
         circle, its lineup bar across to the port edge, two fan lines,
         a short fore-and-aft tick [A1]                                  */
      function spot(x, y, side) {
        g.strokeStyle = WH; g.lineWidth = 0.35 * K;
        g.beginPath(); g.arc(U(x), V(y), 4.7 * K, 0, TW); g.stroke();
        g.lineWidth = 0.25 * K; g.beginPath(); g.arc(U(x), V(y), 2.2 * K, 0, TW); g.stroke();
        var ye = side > 0 ? 17.3 : -17.3;
        line(x, y + side * 4.7, x, ye, WH, 0.35);
        line(x - 7.5, y, x + 7.5, y, WH, 0.25);
        line(x, y, x - (ye - y) * 0.85, ye, WH, 0.22);
        line(x, y, x + (ye - y) * 0.85, ye, WH, 0.22);
        line(x - 3.0, y - side * 6.0, x + 3.0, y - side * 6.0, YE, 0.3);
      }
      SPOTS5.forEach(function (p) { spot(p[0], p[1], 1); });
      spot(SPOT57[0], SPOT57[1], -1);
      /* the lifts, dashed yellow outlines and a seam inside           */
      [LIFT5A, LIFT5F, LIFT5W].forEach(function (L, k) {
        g.strokeStyle = YE; g.lineWidth = 0.3 * K; if (g.setLineDash) g.setLineDash([1.6 * K, 1.0 * K]);
        g.strokeRect(U(L[0]), V(L[3]), (L[1] - L[0]) * K, (L[3] - L[2]) * h / 36.8);
        if (g.setLineDash) g.setLineDash([]);
        g.strokeStyle = "rgba(15,15,15,0.7)"; g.lineWidth = 0.12 * K;
        g.strokeRect(U(L[0] + 0.4), V(L[3] - 0.4), (L[1] - L[0] - 0.8) * K, (L[3] - L[2] - 0.8) * h / 36.8);
        if (k === 0) { g.globalAlpha = 0.12; g.fillStyle = "#000000"; g.fillRect(U(L[0]), V(L[3]), (L[1] - L[0]) * K, (L[3] - L[2]) * h / 36.8); g.globalAlpha = 1; }
      });
      /* wear: rotor-wash scrubbing round each spot, oil, tyre marks;
         tie-down points in rows; grime                                 */
      SPOTS5.concat([SPOT57]).forEach(function (p) {
        for (var q = 0; q < 14; q++) {
          var a = R() * TW, rr = (1 + R() * 3.5) * K;
          g.globalAlpha = 0.08 + R() * 0.08; g.fillStyle = "#151617";
          g.beginPath(); g.arc(U(p[0]) + Math.cos(a) * rr, V(p[1]) + Math.sin(a) * rr, (0.3 + R() * 0.9) * K, 0, TW); g.fill();
        }
      });
      for (i = 0; i < 60; i++) {
        var x0 = -100 + R() * 210, y0 = (R() - 0.5) * 30;
        g.globalAlpha = 0.07 + R() * 0.09; line(x0, y0, x0 + 3 + R() * 9, y0 + (R() - 0.5) * 1.5, "#141414", 0.15 + R() * 0.15);
      }
      g.globalAlpha = 1; g.fillStyle = "rgba(15,15,15,0.4)";
      for (var tx = -108; tx < 114; tx += 3) for (var ty = -15; ty <= 15; ty += 3) g.fillRect(U(tx), V(ty), 1.1, 1.1);
      weather(g, w, h, 7506, 90, 0.45);
    });
  }

  function build075(THREE, M, C) {
    var root = new THREE.Group(), PI2 = PI / 2;
    var T = makeMats(THREE, C, { hull: 0x9aa1a6, sup: 0xa2a9ae });
    T.fdeck = new THREE.MeshStandardMaterial({ color: 0xffffff, map: fdeckTex(THREE), roughness: 0.95, metalness: 0.04 });
    T.well = new THREE.MeshStandardMaterial({ color: 0xffffff, map: wellTex(THREE), roughness: 0.85, metalness: 0.1, side: THREE.DoubleSide });
    [T.fdeck, T.well].forEach(function (m) { m.userData = { _srgbDone: true }; });
    var S = sinks(["hull", "under", "boot", "sup", "deck", "fdeck", "well", "dark", "grille", "soot", "metal", "white", "team"]);
    var L = L5, i, j, s, x;

    /* ------------------------------------------------------- the hull */
    var xs = [];
    for (x = L.HX0; x < 113.2; x += (x > 70 ? 1.5 : x < -95 ? 2.0 : 6.0)) xs.push(x);
    xs.push(113.2);
    var rings = hullLoft(S, xs, sec5, band5, function () { return 4.0; });
    /* the transom, with the well opening cut out [H3]                    */
    (function () {
      var R0 = rings[0], P = [], k;
      for (k = 0; k < R0.length; k++) P.push([-R0[k][0], R0[k][1]]);
      for (k = R0.length - 1; k >= 0; k--) P.push([R0[k][0], R0[k][1]]);
      P = P.filter(function (p, q) { return q === 0 || Math.abs(p[0] - P[q - 1][0]) + Math.abs(p[1] - P[q - 1][1]) > 1e-4; });
      /* P is in (y, z) going round; triangulate in the transom plane    */
      var hole = [[-L.WHW, L.WZ0], [-L.WHW, L.WZ1], [L.WHW, L.WZ1], [L.WHW, L.WZ0]];
      var V2 = P.map(function (p) { return new THREE.Vector2(p[0], p[1]); });
      if (THREE.ShapeUtils.isClockWise(V2)) { P.reverse(); V2.reverse(); }
      var H2 = hole.map(function (p) { return new THREE.Vector2(p[0], p[1]); });
      if (!THREE.ShapeUtils.isClockWise(H2)) { hole.reverse(); H2.reverse(); }
      var all = V2.concat(H2);
      THREE.ShapeUtils.triangulateShape(V2, [H2]).forEach(function (t) {
        var a = all[t[0]], b = all[t[1]], c = all[t[2]], zm = (a.y + b.y + c.y) / 3;
        tri(S[band5(zm)], [L.HX0, a.x, a.y], [L.HX0, b.x, b.y], [L.HX0, c.x, c.y], [L.HX0 + 1, (a.x + b.x + c.x) / 3, zm]);
      });
    })();

    /* --------------------------------------- the flight-deck block
       The topsides from 15.2 to the deck (19.6) follow the deck outline:
       flush with the hull aft, the deep fascia over the flared bow [H1].
       Its top is the flight deck itself: ONE flat surface, painted.     */
    prism(S.hull, DECK5, L.FB, L.FT, { top: false, bot: false });
    capPoly(THREE, S.fdeck, DECK5, L.FT, true);
    capPoly(THREE, S.hull, DECK5, L.FB, false);
    /* a drip strip under the fascia's lower edge, a rubbing band        */
    for (i = 0; i < DECK5.length; i++) {
      var a = DECK5[i], b = DECK5[(i + 1) % DECK5.length];
      if (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) < 3) continue;
      var e = nz([b[0] - a[0], b[1] - a[1], 0]), on = [e[1], -e[0], 0];
      tube(S.metal, [a[0] - on[0] * 0.12, a[1] - on[1] * 0.12, L.FB + 0.15], [b[0] - on[0] * 0.12, b[1] - on[1] * 0.12, L.FB + 0.15], 0.1, 0.1, 4, false);
      tube(S.metal, [a[0] - on[0] * 0.08, a[1] - on[1] * 0.08, L.FT - 0.1], [b[0] - on[0] * 0.08, b[1] - on[1] * 0.08, L.FT - 0.1], 0.07, 0.07, 3, false);
    }
    /* the catwalk safety nets just below the deck edge, both sides,
       folded out [A1] (nothing stands up off the flight deck)           */
    for (s = -1; s <= 1; s += 2) {
      for (x = -104; x < 112; x += 4.0) {
        if (s < 0 && x > -44 && x < 32) continue;         /* the island */
        var x2 = Math.min(x + 3.8, 113);
        quad(S.metal, [x, s * 18.0, L.FT - 0.35], [x2, s * 18.0, L.FT - 0.35], [x2, s * 19.3, L.FT - 0.05], [x, s * 19.3, L.FT - 0.05], [x + 1.9, s * 17.0, L.FT - 2]);
        tube(S.metal, [x, s * 18.0, L.FT - 0.35], [x, s * 19.3, L.FT - 0.05], 0.05, 0.05, 3, false);
      }
      tube(S.metal, [-104, s * 19.3, L.FT - 0.05], [112, s * 19.3, L.FT - 0.05], 0.05, 0.05, 3, false);
    }

    /* --------------------------------------------------- the well
       a real cavity behind the gate: floor, wing walls, deckhead and its
       forward end [H3]; the walkways down each side                      */
    var WL = L.WX1 - L.HX0;
    quad(S.well, [L.HX0, -L.WHW, L.WZ0], [L.WX1, -L.WHW, L.WZ0], [L.WX1, L.WHW, L.WZ0], [L.HX0, L.WHW, L.WZ0], [-70, 0, L.WZ0 - 1]);
    quad(S.well, [L.HX0, -L.WHW, L.WZ1], [L.WX1, -L.WHW, L.WZ1], [L.WX1, L.WHW, L.WZ1], [L.HX0, L.WHW, L.WZ1], [-70, 0, L.WZ1 + 1]);
    for (s = -1; s <= 1; s += 2) quad(S.well, [L.HX0, s * L.WHW, L.WZ0], [L.WX1, s * L.WHW, L.WZ0], [L.WX1, s * L.WHW, L.WZ1], [L.HX0, s * L.WHW, L.WZ1], [-70, s * (L.WHW + 1), 5]);
    quad(S.well, [L.WX1, -L.WHW, L.WZ0], [L.WX1, L.WHW, L.WZ0], [L.WX1, L.WHW, L.WZ1], [L.WX1, -L.WHW, L.WZ1], [L.WX1 + 1, 0, 5]);
    for (x = L.HX0 + 4; x < L.WX1; x += 4) {
      bx(S.metal, x - 0.15, x + 0.15, -L.WHW, L.WHW, L.WZ1 - 0.5, L.WZ1);
      for (s = -1; s <= 1; s += 2) bx(S.metal, x - 0.15, x + 0.15, s * (L.WHW - 0.25), s * L.WHW, L.WZ0, L.WZ1);
    }
    for (s = -1; s <= 1; s += 2) {
      bx(S.deck, L.HX0 + 1, L.WX1, s * (L.WHW - 1.3), s * L.WHW, 4.4, 4.6);
      rail(S.metal, [[L.HX0 + 1, s * (L.WHW - 1.3), 4.6], [L.WX1, s * (L.WHW - 1.3), 4.6]], 1.0, 2.0, 0.03);
    }
    /* the sill and the dark slot over the gate [H3]                      */
    bx(S.dark, L.HX0 - 0.05, L.HX0 + 0.2, -L.WHW, L.WHW, L.WZ0 + L.GATE + 0.1, L.WZ1);
    bx(S.metal, L.HX0 - 0.25, L.HX0 + 0.3, -L.WHW - 0.4, L.WHW + 0.4, L.WZ1, L.WZ1 + 0.35);
    for (s = -1; s <= 1; s += 2) bx(S.metal, L.HX0 - 0.3, L.HX0 + 0.1, s * L.WHW, s * (L.WHW + 0.5), L.WZ0, L.WZ1);
    root.userData.wellExit = { x: L.HX0, y: 0, z: L.WZ0 };
    root.userData.wellInner = { x: -80.0, y: 0, z: L.WZ0 };

    /* --------------------------------------------------- the transom
       the big open recess under the flight deck with its balcony rail,
       scuttles, the stern lights and fairleads [H3]                       */
    bx(S.dark, L.HX0 - 0.02, L.HX0 + 6.0, -6.6, 12.0, 15.6, 19.0);
    bx(S.deck, L.HX0 - 1.0, L.HX0 + 0.1, -6.6, 12.0, 15.5, 15.7);
    rail(S.metal, [[L.HX0 - 1.0, -6.6, 15.7], [L.HX0 - 1.0, 12.0, 15.7]], 1.1, 1.5, 0.03);
    [[-13.6, 12.6], [-13.6, 6.2], [13.0, 12.6], [13.6, 6.2], [-13.0, 3.0], [13.0, 3.0]].forEach(function (p) {
      disc(S.dark, [L.HX0 - 0.03, p[0], p[1]], [-1, 0, 0], 0.32, 10);
    });
    for (s = -1; s <= 1; s += 2) {
      fairlead(S.metal, L.HX0 - 0.1, s * 12.0, L.FB + 0.0, PI2, 1.2);
      panel(S.dark, [L.HX0 - 0.03, s * 15.0, 9.5], [-1, 0, 0], 1.6, 1.1);
    }

    /* ------------------------------ the stern corner platforms [H3][A1]:
       HHQ-10 to PORT, the CIWS to STARBOARD, lower than the deck          */
    bx(S.sup, L.XS, -107.6, 9.0, 18.0, L.ZP - 1.3, L.ZP);
    bx(S.sup, L.XS, -109.4, -18.0, -8.0, L.ZP - 1.3, L.ZP);
    quad(S.sup, [L.XS, 9.0, L.ZP - 1.3], [L.HX0, 9.0, L.ZP - 4.5], [L.HX0, 18.0, L.ZP - 4.5], [L.XS, 18.0, L.ZP - 1.3], [L.HX0 + 1, 13, L.ZP]);
    quad(S.sup, [L.XS, -18.0, L.ZP - 1.3], [L.HX0, -18.0, L.ZP - 4.5], [L.HX0, -8.0, L.ZP - 4.5], [L.XS, -8.0, L.ZP - 1.3], [L.HX0 + 1, -13, L.ZP]);
    rail(S.metal, [[-107.8, 9.2, L.ZP], [L.XS + 0.2, 9.2, L.ZP], [L.XS + 0.2, 17.8, L.ZP], [-107.8, 17.8, L.ZP]], 1.1, 1.4, 0.03);
    rail(S.metal, [[-109.6, -8.2, L.ZP], [L.XS + 0.2, -8.2, L.ZP], [L.XS + 0.2, -17.8, L.ZP], [-109.6, -17.8, L.ZP]], 1.1, 1.4, 0.03);
    hhq10(S, -112.0, 13.4, L.ZP, PI, 3, 6, false);
    ciws11(S, -112.0, -13.4, L.ZP, -PI + 0.6);
    /* a decoy launcher and a satcom dome on the starboard quarter [H3]  */
    for (i = 0; i < 2; i++) for (j = 0; j < 3; j++) tube(S.metal, [-104 + i * 0.4, -18.6, 17.2 + j * 0.35], [-104 + i * 0.4, -19.6, 17.6 + j * 0.35], 0.13, 0.13, 6, true);
    bx(S.sup, -106, -101, -19.8, -18.0, 16.6, 17.0);
    rail(S.metal, [[-106, -19.8, 17.0], [-101, -19.8, 17.0]], 1.0, 1.25, 0.03);

    /* ------------------------------------------------- the island [A2]
       on the starboard edge, X -42..+29, from the deck edge (-17.9) in
       to about -8; a low deckhouse the length of it carrying the after
       tower, the glazed middle block, the forward tower with the mast,
       the bridge and the forward block with the HHQ-10                    */
    var Z0 = L.FT, YO = -17.9;
    function block(x0, x1, y0, y1, z0, z1, c, ins, o) {
      var A = chamf(x0, x1, y0, y1, c);
      frustum(S.sup, A, z0, inset(A, ins || 0), z1, o || {});
    }
    block(-42.0, 29.0, YO, -8.0, Z0, 24.8, 1.2, 0.15);                 /* low deckhouse */
    block(-38.0, -23.0, -17.4, -8.6, 24.8, 30.6, 1.0, 0.35);           /* after tower   */
    block(-14.3, 1.4, -16.4, -9.2, 24.8, 31.5, 0.8, 0.1);              /* glazed block  */
    frustum(S.soot, inset(chamf(-14.3, 1.4, -16.4, -9.2, 0.8), 0.1), 31.5, inset(chamf(-14.3, 1.4, -16.4, -9.2, 0.8), 0.3), 32.3, {});
    block(4.5, 14.5, -17.0, -8.4, 24.8, 36.9, 1.0, 0.9);               /* forward tower */
    block(14.0, 22.8, -17.6, -8.2, 24.8, 29.6, 1.2, 0.1);              /* bridge base   */
    block(22.5, 29.0, -17.2, -8.8, 24.8, 26.0, 1.0, 0.1);              /* forward block */
    /* the bridge: glazing leaning out over the front and its chamfers,
       a roof, the wings out over the deck edge [H1][H2]                  */
    (function () {
      var A = chamf(14.0, 22.8, -17.6, -8.2, 1.2), B = chamf(14.0, 23.4, -17.9, -7.9, 1.2);
      frustum(S.sup, A, 29.6, B, 31.2, { top: false, face: function (k) { return (k >= 1 && k <= 4) ? S.dark : S.sup; } });
      frustum(S.sup, B, 31.2, inset(B, 0.15), 31.8, {});
      bx(S.sup, 15.0, 19.5, -19.6, -17.6, 29.6, 31.0);
      bx(S.sup, 15.0, 19.5, -8.2, -6.6, 29.6, 31.0);
      panel(S.dark, [19.53, -18.6, 30.4], [1, 0, 0], 1.6, 0.8);
      panel(S.dark, [19.53, -7.4, 30.4], [1, 0, 0], 1.2, 0.8);
      rail(S.metal, [[15.0, -19.6, 31.0], [19.5, -19.6, 31.0]], 0.9, 1.1, 0.03);
      sphere(S.white, [17.0, -11.0, 32.6], 0.9, 12, false);
      cylZ(S.sup, 17.0, -11.0, 31.8, 0.4, 0.5, 8);
      sphere(S.white, [17.6, -15.4, 32.5], 0.75, 12, false);
      cylZ(S.sup, 17.6, -15.4, 31.8, 0.35, 0.4, 8);
      rail(S.metal, [[14.2, -17.7, 31.8], [23.2, -17.7, 31.8], [23.2, -8.1, 31.8], [14.2, -8.1, 31.8]], 0.9, 1.3, 0.025);
    })();
    /* the glazed block's two rows of windows, sides and ends [A2]        */
    for (i = 0; i < 7; i++) for (j = 0; j < 2; j++) {
      var wx = -12.6 + i * 2.0, wz = 26.6 + j * 2.4;
      panel(S.dark, [wx, -16.43, wz], [0, -1, 0], 1.4, 1.5);
      panel(S.dark, [wx, -9.17, wz], [0, 1, 0], 1.4, 1.5);
    }
    for (j = 0; j < 2; j++) for (i = 0; i < 3; i++) {
      panel(S.dark, [1.43, -14.4 + i * 2.0, 26.6 + j * 2.4], [1, 0, 0], 1.3, 1.5);
      panel(S.dark, [-14.33, -14.4 + i * 2.0, 26.6 + j * 2.4], [-1, 0, 0], 1.3, 1.5);
    }
    /* the forward tower's after face black from the deckhouse roof to its
       top, where the uptakes come out [H3]; louvres on its side          */
    quad(S.soot, [4.45, -16.3, 25.5], [4.45, -9.1, 25.5], [5.33, -9.1 + 0.8, 36.5], [5.33, -16.3 - 0.0 + 0.8, 36.5], [8, -12.7, 31]);
    quad(S.soot, [4.45, -16.3, 25.5], [5.33, -15.5, 36.5], [5.33, -9.9, 36.5], [4.45, -9.1, 25.5], [8, -12.7, 31]);
    for (i = 0; i < 3; i++) panel(S.grille, [6.5 + i * 2.6, -17.02 + 0.1 + (25.8 + 2 - 24.8) * 0.9 / 12.1 * 0, 27.0], [0, -1, 0], 2.0, 1.6);
    /* the mast on the forward tower: a tapered square column, platforms
       on its flanks with domes, a long yard, the big planar array and a
       pole [A2][H1]                                                       */
    (function () {
      var A = chamf(6.8, 12.2, -15.6, -9.8, 0.6), B = chamf(7.8, 11.2, -14.2, -11.2, 0.4);
      frustum(S.sup, A, 36.9, B, 45.0, {});
      bx(S.deck, 5.8, 13.2, -16.8, -8.6, 36.9, 37.15);
      rail(S.metal, [[5.9, -16.7, 37.15], [13.1, -16.7, 37.15], [13.1, -8.7, 37.15], [5.9, -8.7, 37.15], [5.9, -16.7, 37.15]], 1.0, 1.3, 0.025);
      sphere(S.white, [12.4, -16.0, 38.0], 0.75, 12, false); cylZ(S.sup, 12.4, -16.0, 37.15, 0.3, 0.35, 8);
      sphere(S.white, [12.4, -9.4, 38.0], 0.75, 12, false); cylZ(S.sup, 12.4, -9.4, 37.15, 0.3, 0.35, 8);
      bx(S.deck, 7.0, 12.0, -15.2, -9.8, 45.0, 45.25);
      rail(S.metal, [[7.1, -15.1, 45.25], [11.9, -15.1, 45.25], [11.9, -9.9, 45.25], [7.1, -9.9, 45.25], [7.1, -15.1, 45.25]], 0.9, 1.2, 0.02);
      tube(S.metal, [9.5, -18.3, 46.4], [9.5, -6.8, 46.4], 0.12, 0.12, 6, true);
      for (var k = -1; k <= 1; k += 2) { tube(S.metal, [9.5, -12.5 + k * 4.5, 46.4], [9.5, -12.5 + k * 4.5, 45.6], 0.04, 0.04, 3, false); }
      cylZ(S.sup, 9.5, -12.5, 45.25, 2.2, 0.6, 10, 0.45);
      /* the H/LJQ-382 planar array, back to back, on its turntable     */
      cylZ(S.metal, 9.5, -12.5, 47.4, 0.4, 1.0, 12);
      obox(S.sup, [9.5, -12.5, 49.6], [1, 0, 0], [0, 1, 0], [0, 0, 1], 1.0, 5.6, 3.8);
      panel(S.dark, [10.02, -12.5, 49.6], [1, 0, 0], 5.2, 3.4);
      panel(S.dark, [8.98, -12.5, 49.6], [-1, 0, 0], 5.2, 3.4);
      tube(S.metal, [9.5, -12.5, 51.5], [9.5, -12.5, 55.0], 0.1, 0.04, 6, false);
      tube(S.metal, [8.0, -14.5, 45.25], [8.0, -14.5, 52.0], 0.06, 0.03, 4, false);
      sphere(S.white, [11.2, -14.6, 46.0], 0.5, 10, false);
    })();
    /* the after tower: two domes on its roof, a small lattice mast with a
       platform and a yard [A2]                                            */
    (function () {
      sphere(S.white, [-35.0, -12.0, 31.9], 1.3, 14, false); cylZ(S.sup, -35.0, -12.0, 30.6, 0.3, 0.8, 10);
      sphere(S.white, [-26.2, -14.8, 31.6], 1.0, 12, false); cylZ(S.sup, -26.2, -14.8, 30.6, 0.2, 0.6, 10);
      rail(S.metal, [[-37.6, -17.0, 30.6], [-23.4, -17.0, 30.6], [-23.4, -9.0, 30.6], [-37.6, -9.0, 30.6], [-37.6, -17.0, 30.6]], 1.0, 1.4, 0.025);
      var m0 = [-30.5, -12.0];
      for (var k = 0; k < 4; k++) {
        var dx = (k & 1 ? 0.6 : -0.6), dy = (k & 2 ? 0.6 : -0.6);
        tube(S.metal, [m0[0] + dx * 1.6, m0[1] + dy * 1.6, 30.6], [m0[0] + dx * 0.6, m0[1] + dy * 0.6, 34.4], 0.09, 0.07, 4, false);
      }
      for (var h = 31.6; h < 34.4; h += 0.9) bx(S.metal, m0[0] - 0.8, m0[0] + 0.8, m0[1] - 0.8, m0[1] + 0.8, h, h + 0.06);
      bx(S.deck, m0[0] - 1.2, m0[0] + 1.2, m0[1] - 1.2, m0[1] + 1.2, 34.4, 34.6);
      tube(S.metal, [m0[0], m0[1] - 2.6, 35.4], [m0[0], m0[1] + 2.6, 35.4], 0.07, 0.07, 4, true);
      cylZ(S.white, m0[0], m0[1], 34.6, 1.2, 0.35, 10);
      tube(S.metal, [m0[0], m0[1], 35.8], [m0[0], m0[1], 37.4], 0.05, 0.02, 4, false);
    })();
    /* the HHQ-10 on the island's forward end [A2][H1], facing forward    */
    hhq10(S, 26.0, -13.0, 26.0, 0, 3, 6, false);
    rail(S.metal, [[22.7, -17.1, 26.0], [28.8, -17.1, 26.0], [28.8, -8.9, 26.0], [22.7, -8.9, 26.0]], 1.0, 1.3, 0.025);
    /* the low deckhouse: doors, rails round its roof, vents, the bridge
       ladder, scuttles along its outer face                               */
    rail(S.metal, [[-41.8, -17.8, 24.8], [-38.2, -17.8, 24.8]], 1.0, 1.2, 0.025);
    rail(S.metal, [[-22.8, -17.8, 24.8], [-14.5, -17.8, 24.8]], 1.0, 1.2, 0.025);
    rail(S.metal, [[1.6, -17.8, 24.8], [4.3, -17.8, 24.8]], 1.0, 1.2, 0.025);
    rail(S.metal, [[-41.8, -8.1, 24.8], [-38.2, -8.1, 24.8]], 1.0, 1.2, 0.025);
    rail(S.metal, [[-22.8, -8.1, 24.8], [-14.5, -8.1, 24.8]], 1.0, 1.2, 0.025);
    [[-40.0, 1.0], [-20.0, 1.0], [-3.0, 1.0], [20.0, 1.0]].forEach(function (d) {
      panel(S.dark, [d[0], -8.0 + 0.04 - 0.15 * 0, Z0 + 1.1], [0, 1, 0], d[1], 2.0);
    });
    for (x = -40; x < 28; x += 3.4) panel(S.dark, [x, YO - 0.03, 23.2], [0, -1, 0], 0.55, 0.45);
    [-30, -18, -6, 3, 16].forEach(function (xv) { mushroom(S.metal, xv, -10.5, 24.8, 0.25, 0.5); goose(S.metal, xv + 1.2, -15.8, 24.8, 0.15, 0.7, PI2); });
    ladder(S.metal, [-22.8, -9.0, 24.8], [-21.0, -9.0, 30.6], [0, 1, 0], 0.6, 0.3);
    ladder(S.metal, [2.0, -9.0, 24.8], [3.8, -9.0, 31.0], [0, 1, 0], 0.6, 0.3);
    /* whips on the island                                                */
    whip(S.metal, -41.0, -17.0, 24.8, 9.0, 0.04);
    whip(S.metal, -16.0, -16.6, 32.3, 7.0, 0.04);
    whip(S.metal, 0.0, -16.6, 32.3, 7.0, 0.04);
    whip(S.metal, 28.4, -17.0, 26.0, 6.0, 0.035);

    /* ---------------- the deck-edge crane forward of the island, its jib
       folded aft on an A-frame rest, the life-raft racks under it [H1]   */
    bx(S.sup, 31.0, 40.0, -20.6, -17.9, 18.1, 19.1);
    cylZ(S.sup, 37.5, -19.3, 19.1, 2.0, 0.7, 10);
    boxZ(S.sup, 37.5, -19.3, 21.1, 2.2, 1.3, 1.2, 0);
    tube(S.sup, [37.0, -19.3, 21.9], [31.4, -19.3, 21.5], 0.35, 0.25, 6, true);
    tube(S.metal, [32.0, -19.9, 19.1], [32.0, -19.3, 21.3], 0.08, 0.08, 4, false);
    tube(S.metal, [32.0, -18.7, 19.1], [32.0, -19.3, 21.3], 0.08, 0.08, 4, false);
    rail(S.metal, [[31.0, -20.6, 19.1], [40.0, -20.6, 19.1]], 1.0, 1.2, 0.025);
    for (i = 0; i < 5; i++) for (j = 0; j < 2; j++) raft(S.white, S.metal, 32.0 + i * 1.6, -20.0, 15.6 + j * 0.9, PI2, 1.3, 0.34);
    bx(S.metal, 31.0, 40.0, -20.7, -18.0, 15.5, 15.6);

    /* --------------------- balconies, doors and windows on the topsides
       starboard off [A2]; port mirrored (NOT CONFIRMED)                   */
    var BALC = [-92.0, -69.8, -56.0, -28.8, -10.0, 15.6, 53.2, 70.0];
    for (s = -1; s <= 1; s += 2) {
      BALC.forEach(function (bxv, k) {
        var w = k % 3 === 0 ? 6.0 : 4.0, y0 = s * 18.0, y1 = s * 19.7;
        bx(S.sup, bxv - w / 2, bxv + w / 2, Math.min(y0, y1), Math.max(y0, y1), 14.4, 14.7);
        bx(S.sup, bxv - w / 2, bxv + w / 2, Math.min(y0, y1), Math.max(y0, y1), 14.7, 15.4);
        rail(S.metal, [[bxv - w / 2, y1, 15.4], [bxv + w / 2, y1, 15.4]], 1.0, 1.3, 0.025);
        panel(S.dark, [bxv, s * 18.03, 16.4], [0, s, 0], 1.0, 2.0);
        quad(S.sup, [bxv - w / 2, y1, 14.4], [bxv + w / 2, y1, 14.4], [bxv + w / 2, y0, 12.6], [bxv - w / 2, y0, 12.6], [bxv, s * 15, 15]);
      });
      /* the rows of small windows [A2] at 16.5 and 13 m                 */
      [[-104, 4], [-80, 3], [-62, 2], [-44, 4], [-20, 3], [-2, 2], [24, 3], [40, 4], [62, 2], [82, 3]].forEach(function (c) {
        for (var q = 0; q < c[1]; q++) {
          panel(S.dark, [c[0] + q * 1.3, s * 18.03, 16.6], [0, s, 0], 0.8, 0.6);
          panel(S.dark, [c[0] + 4 + q * 1.3, s * 18.03, 13.0], [0, s, 0], 0.8, 0.6);
        }
      });
      /* the vehicle-deck side door (the published opening each side)    */
      panel(S.dark, [-4.0, s * 18.04, 9.0], [0, s, 0], 9.0, 5.5);
      bx(S.metal, -8.8, 0.8, s * 18.0, s * 18.15, 6.1, 6.25);
      /* grilles high in the side abaft amidships [H3]                   */
      panel(S.grille, [-38.0, s * 18.04, 11.5], [0, s, 0], 3.0, 2.2);
      panel(S.grille, [24.0, s * 18.04, 11.5], [0, s, 0], 2.2, 1.6);
      /* fender/rubbing band and the scuttles low down                  */
      for (x = -96; x < 80; x += 6.5) disc(S.dark, [x, s * (yAt([[0, 16.8], [15.2, 18.0]], 4.6) + 0.02 + (x > 64 ? -1.2 : 0)), 4.6], [0, s, 0], 0.22, 8);
    }
    /* boats on the port sponsons [A1] (identity NOT CONFIRMED)           */
    [[-67.0], [81.5]].forEach(function (b) {
      bx(S.sup, b[0] - 6.5, b[0] + 6.5, 18.0, 21.0, 14.0, 14.3);
      rib(S.sup, S.dark, b[0], 19.6, 14.3, 0, 9.0, 2.8);
      rail(S.metal, [[b[0] - 6.5, 21.0, 14.3], [b[0] + 6.5, 21.0, 14.3]], 1.0, 1.4, 0.025);
      [-4, 4].forEach(function (dx) {
        tube(S.metal, [b[0] + dx, 18.2, 14.3], [b[0] + dx, 18.2, 18.6], 0.1, 0.09, 6, false);
        tube(S.metal, [b[0] + dx, 18.2, 18.6], [b[0] + dx, 19.8, 18.4], 0.09, 0.08, 6, true);
      });
    });
    /* the forward CIWS on the port sponson (NOT CONFIRMED, see header)    */
    bx(S.sup, 47.0, 55.0, 18.0, 21.4, 16.6, 17.4);
    quad(S.sup, [47.0, 21.4, 16.6], [55.0, 21.4, 16.6], [55.0, 18.0, 13.6], [47.0, 18.0, 13.6], [51, 16, 17]);
    rail(S.metal, [[47.0, 21.4, 17.4], [55.0, 21.4, 17.4]], 1.0, 1.3, 0.025);
    ciws11(S, 51.0, 19.8, 17.4, 0);

    /* ------------------------------------------------------------ bow
       anchors in pockets high on the flare [H1][H2]; the stem fitting; a
       jack staff and lights under the deck front                          */
    for (s = -1; s <= 1; s += 2) {
      var ax0 = 104.0, az0 = 9.0, ay0 = sec5(ax0).reduce(function (m, p) { return Math.abs(p[1] - az0) < Math.abs(m[1] - az0) ? p : m; })[0];
      disc(S.dark, [ax0, s * (ay0 + 0.05), az0], [0.25, s, -0.35], 1.1, 12);
      anchor(S.metal, ax0, s * (ay0 + 0.2), az0 - 0.3, [0.25, s, -0.35], 1.9);
      bx(S.metal, 108.0, 110.0, s * 3.0, s * 4.2, L.FB - 0.6, L.FB);
    }
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) bollard(S.metal, 108.5 - i * 6, s * 16.6, L.FB - 0.01 - 0.0 + 0.0 * i - 0.05 + 0.0, 0, 1.4);
    panel(S.dark, [116.004, 0, 17.4], [1, 0, 0], 2.4, 1.2);

    /* --------------------------------------- under water [NOT CONFIRMED]
       two shafts with their brackets, two rudders, bilge keels             */
    for (s = -1; s <= 1; s += 2) {
      tube(S.metal, [-40, s * 7.5, -5.4], [-98, s * 7.5, -3.8], 0.6, 0.55, 10, false);
      tube(S.metal, [-98, s * 7.5, -3.8], [-100.5, s * 7.5, -3.7], 0.9, 0.4, 10, true);
      for (i = 0; i < 5; i++) {
        var ang = i * TW / 5;
        obox(S.metal, [-99.2, s * 7.5 + Math.cos(ang) * 1.5, -3.75 + Math.sin(ang) * 1.5], [1, 0, 0],
             [0, Math.cos(ang), Math.sin(ang)], [0, -Math.sin(ang), Math.cos(ang)], 0.9, 2.2, 0.12);
      }
      obox(S.under, [-104.5, s * 7.5, -4.6], [1, 0, 0], [0, 1, 0], [0, 0, 1], 4.6, 0.5, 5.0);
      tube(S.metal, [-88, s * 7.5, -2.6], [-88, s * 7.5, -3.7], 0.2, 0.2, 6, false);
      obox(S.under, [-20, s * 14.8, -6.0], [1, 0, 0], [0, 0.6, -0.8], [0, 0.8, 0.6], 40, 1.2, 0.15);
    }

    /* ---------------------------------------- team: a band round the mast
       head, a flash on the bow and on the after tower's roof               */
    bx(S.team, 7.9, 11.1, -14.1, -11.3, 44.0, 44.6);
    bx(S.team, 112.0, 114.5, -6.0, 6.0, L.FT, L.FT + 0.04);
    bx(S.team, -36.0, -33.5, -16.4, -15.0, 30.6, 30.64);

    var UVF = { fdeck: function (px, py) { return [(px + 116) / 232, (py + 18.4) / 36.8]; } };
    emit(THREE, root, S, T, TILE, UVF);

    /* ----------------------------------------- the gate, which opens
       Hinged on its bottom outer edge, built upright about that hinge,
       turned PI about X into a mount also turned PI about X: shut, the two
       cancel; +rotation.y on "wellgate" then swings its top AFT and down
       (the same arrangement as the earlier model, kept for the check).
       Two rows of ten ribbed panels [H3].                                  */
    var gMount = new THREE.Group();
    gMount.position.set(L.HX0 - 0.3, 0, L.WZ0);
    gMount.rotation.x = PI;
    var gate = new THREE.Group(); gate.name = "wellgate";
    gMount.add(gate); root.add(gMount);
    var GS = sinks(["sup", "metal"]), G = L.GATE, WH2 = L.WHW;
    bx(GS.sup, 0.0, 0.6, -WH2 + 0.05, WH2 - 0.05, 0, G);
    for (j = 0; j <= 10; j++) bx(GS.sup, -0.28, 0.02, -WH2 + 0.25 + j * (2 * WH2 - 0.8) / 10, -WH2 + 0.55 + j * (2 * WH2 - 0.8) / 10, 0.3, G - 0.3);
    [0.35, G * 0.5, G - 0.35].forEach(function (zz) { bx(GS.sup, -0.32, 0.02, -WH2 + 0.1, WH2 - 0.1, zz - 0.21, zz + 0.21); });
    for (j = 0; j < 10; j++) for (var rr = 0; rr < 2; rr++) {
      var yc = -WH2 + 0.4 + (j + 0.5) * (2 * WH2 - 0.8) / 10, zc = rr ? G * 0.75 : G * 0.25;
      for (var rb = 0; rb < 4; rb++) bx(GS.metal, -0.08, 0.0, yc - 0.6, yc + 0.6, zc - 1.2 + rb * 0.8, zc - 1.0 + rb * 0.8);
    }
    tube(GS.metal, [0, -WH2, 0], [0, WH2, 0], 0.28, 0.28, 8, true);
    for (s = -1; s <= 1; s += 2) bx(GS.metal, -0.2, 0.3, s * (WH2 - 1.25), s * (WH2 - 0.75), G - 0.4, G + 0.1);
    /* flip it into the mount's frame                                     */
    Object.keys(GS).forEach(function (k) {
      var P = GS[k].p;
      for (var q = 0; q < P.length; q += 3) { P[q + 1] = -P[q + 1]; P[q + 2] = -P[q + 2]; }
    });
    emit(THREE, gate, GS, T, TILE);

    root.userData.heroLen = 232;
    return root;
  }

  /* ================================================================= 056 */
  var H6 = { XS0: -44.5, XS1: 44.5, XWL: 40.3, ZK: 3.2, ROOF: 6.6, PAD: 5.9, FC: 4.9 };
  /* stations [x, keel z, half-beam at the waterline, at the knuckle
     (3.2 m), at the top edge, top z] [C1][C5][C6]: a transom stern, a
     hard knuckle the length of her, the sides above it leaning in; the
     forecastle low (4.9 at the gun, 5.6 at the stem head), the hull side
     carried up to the integrated superstructure's roof (6.6) amidships  */
  var ST6 = [
    [-44.5, -0.7, 4.75, 5.30, 5.08, 5.9],
    [-40.0, -1.6, 4.95, 5.45, 5.22, 5.9],
    [-34.0, -2.5, 5.05, 5.53, 5.30, 5.9],
    [-26.0, -3.1, 5.10, 5.57, 5.34, 5.9],
    [  8.0, -3.2, 5.10, 5.57, 5.34, 5.9],
    [ 16.0, -3.2, 4.85, 5.45, 5.24, 5.9],
    [ 23.0, -3.2, 4.30, 5.10, 4.94, 5.9],
    [ 23.2, -3.2, 4.28, 5.09, 4.95, 4.9],
    [ 28.0, -3.1, 3.55, 4.55, 4.50, 5.0],
    [ 32.0, -2.9, 2.75, 3.85, 3.92, 5.1],
    [ 35.5, -2.5, 1.85, 3.05, 3.25, 5.25],
    [ 38.5, -1.6, 0.85, 2.15, 2.45, 5.4],
    [ 40.3,  0.0, 0.0, 1.45, 1.85, 5.45],
    [ 42.2,  2.4, 0.0, 0.0, 1.10, 5.5],
    [ 43.6,  4.3, 0.0, 0.0, 0.50, 5.55],
    [ 44.5,  5.55, 0.0, 0.0, 0.05, 5.6]
  ];
  var ABOVE6 = [0.4, 1.4, 2.4, 3.2, 4.0, 4.9, 5.4, 5.9];
  function sec6(x) {
    var r = tab(ST6, x), kz = r[1], hwl = r[2], hk = r[3], ht = r[4], zt = r[5], out = [], n = x < -30 ? 3.2 : x > 25 ? 2.0 : 3.6;
    UNDER_S.forEach(function (s) {
      if (kz >= -0.5) { out.push([0, Math.min(kz, zt)]); return; }
      var z = kz + (-0.5 - kz) * s, t = Math.min(1, Math.abs(z / kz));
      out.push([s === 0 ? 0 : hwl * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n), z]);
    });
    [-0.5, 0.0].forEach(function (z) {
      if (kz >= z) { out.push([0, Math.min(kz, zt)]); return; }
      var t = Math.abs(z / kz); out.push([hwl * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n), z]);
    });
    var Cp = kz >= 0 ? [[kz, 0], [Math.max(kz + 0.01, H6.ZK), Math.max(hk, ht * 1.02)], [zt, ht]] : [[0, hwl], [H6.ZK, hk], [zt, ht]];
    if (kz >= 0 && kz >= H6.ZK) Cp = [[kz, 0], [zt, ht]];
    ABOVE6.forEach(function (z0, k) {
      var z = k === ABOVE6.length - 1 ? zt : Math.min(Math.max(z0, kz), zt);
      out.push([yAt(Cp, z), z]);
    });
    return out;
  }
  function band6(z) { return z < 0.35 ? "under" : "hull"; }
  function hw6(x, z) { return yAt(sec6(x).map(function (p) { return [p[1], p[0]]; }).filter(function (p, k, a) { return k === 0 || p[0] > a[k - 1][0]; }), z); }

  /* the 76 mm H/PJ-26 in its faceted house, the group "turret" [C1][C4] */
  function hpj26(S) {
    frustum(S.sup, [[-2.0, -1.55], [1.2, -1.55], [2.3, -0.7], [2.3, 0.7], [1.2, 1.55], [-2.0, 1.55]], 0.15,
            [[-1.8, -1.05], [0.8, -1.05], [1.5, -0.5], [1.5, 0.5], [0.8, 1.05], [-1.8, 1.05]], 2.1, {});
    cylZ(S.sup, 0, 0, -0.05, 0.2, 1.55, 16);
    tube(S.sup, [2.0, 0, 1.05], [2.5, 0, 1.05], 0.4, 0.32, 10, true);
    tube(S.metal, [2.5, 0, 1.05], [4.0, 0, 1.05], 0.16, 0.15, 10, false);
    tube(S.metal, [4.0, 0, 1.05], [6.6, 0, 1.05], 0.09, 0.085, 8, false);
    tube(S.metal, [6.6, 0, 1.05], [7.0, 0, 1.05], 0.13, 0.13, 8, true);
    tube(S.dark, [7.0, 0, 1.05], [7.02, 0, 1.05], 0.07, 0.07, 6, true);
    bx(S.metal, -1.6, -0.6, -0.4, 0.4, 2.1, 2.25);
    panel(S.dark, [-1.5, -1.33, 1.2], [0, -1, 0], 0.8, 0.9);
    panel(S.dark, [-1.5, 1.33, 1.2], [0, 1, 0], 0.8, 0.9);
    bx(S.team, -1.4, -0.4, -0.6, 0.6, 2.1, 2.14);
  }
  /* a YJ-83 twin launcher: two canisters stacked on a braced pedestal [C2] */
  function yj83(S, x, y, z, yaw) {
    var c = Math.cos(yaw), sn = Math.sin(yaw), i;
    for (i = 0; i < 4; i++) {
      var dx = (i & 1 ? 1.4 : -1.4), dy = (i & 2 ? 0.45 : -0.45);
      tube(S.metal, [x + c * dx - sn * dy, y + sn * dx + c * dy, z], [x + c * dx * 0.5 - sn * dy * 0.6, y + sn * dx * 0.5 + c * dy * 0.6, z + 1.1], 0.06, 0.06, 4, false);
    }
    boxZ(S.metal, x, y, z + 1.0, 3.2, 0.9, 0.12, yaw);
    for (i = 0; i < 2; i++) {
      var zc = z + 1.12 + 0.45 + i * 0.95;
      obox(S.sup, [x, y, zc], [c, sn, 0], [-sn, c, 0], [0, 0, 1], 6.2, 0.95, 0.9);
      [-2.0, 0, 2.0].forEach(function (b) {
        obox(S.metal, [x + c * b, y + sn * b, zc], [c, sn, 0], [-sn, c, 0], [0, 0, 1], 0.12, 1.0, 0.95);
      });
      panel(S.metal, [x + c * 3.11, y + sn * 3.11, zc], [c, sn, 0], 0.8, 0.75);
    }
  }
  /* the 30 mm H/PJ-17 remote mount [C2]                                   */
  function hpj17(S, x, y, z, yaw) {
    var c = Math.cos(yaw), sn = Math.sin(yaw);
    cylZ(S.sup, x, y, z, 0.5, 0.45, 10);
    boxZ(S.sup, x, y, z + 0.5, 1.2, 0.8, 0.6, yaw);
    tube(S.metal, [x + c * 0.6, y + sn * 0.6, z + 0.82], [x + c * 2.4, y + sn * 2.4, z + 0.82], 0.05, 0.045, 6, true);
    boxZ(S.metal, x - sn * 0.5, y + c * 0.5, z + 0.75, 0.4, 0.2, 0.3, yaw);
  }

  function build056(THREE, M, C, v) {
    var root = new THREE.Group(), PI2 = PI / 2;
    var T = makeMats(THREE, C, { hull: 0xa3aaae, sup: 0xa7aeb2, under: 0x7a2c25 });
    var S = sinks(["hull", "under", "sup", "deck", "dark", "grille", "soot", "metal", "white", "team"]);
    var H = H6, i, j, s, x;

    /* ------------------------------------------------------ the hull */
    var xs = [];
    for (x = H.XS0; x < 44.5; x += (x > 36 ? 0.6 : x > 22 ? 1.0 : x < -38 ? 1.0 : 2.0)) xs.push(x);
    xs.push(23.0, 23.2, 40.3, 44.5);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (q, k) { return k === 0 || q - xs[k - 1] > 0.1; });
    var rings = hullLoft(S, xs, sec6, band6, function () { return 1.5; });
    /* the transom                                                          */
    (function () {
      var R0 = rings[0], k;
      for (k = 0; k < R0.length - 1; k++) {
        quad(S[band6((R0[k][1] + R0[k + 1][1]) / 2)], [H.XS0, -R0[k][0], R0[k][1]], [H.XS0, R0[k][0], R0[k][1]],
             [H.XS0, R0[k + 1][0], R0[k + 1][1]], [H.XS0, -R0[k + 1][0], R0[k + 1][1]], [H.XS0 + 1, 0, 2]);
      }
    })();
    /* the decks: the forecastle and the pad as strips between stations  */
    for (i = 0; i < xs.length - 1; i++) {
      var x0 = xs[i], x1 = xs[i + 1];
      if (!(x0 >= 23.2 || x1 <= -24.8)) continue;
      var a0 = rings[i][rings[i].length - 1], a1 = rings[i + 1][rings[i + 1].length - 1];
      quad(x1 <= -24.8 ? S.deck : S.deck, [x0, -a0[0], a0[1]], [x1, -a1[0], a1[1]], [x1, a1[0], a1[1]], [x0, a0[0], a0[1]], [(x0 + x1) / 2, 0, a0[1] - 1]);
    }
    /* the bulwark round the forecastle, its fairleads [C5]; the knuckle
       rubbing strake, the boot line                                        */
    (function () {
      var P = [], k;
      for (k = 0; k < xs.length; k++) if (xs[k] >= 23.2) P.push([xs[k], rings[k][rings[k].length - 1][0], rings[k][rings[k].length - 1][1]]);
      for (s = -1; s <= 1; s += 2) {
        for (k = 0; k < P.length - 1; k++) {
          var h0 = P[k][0] > 34 ? 0.75 : 0.25, h1 = P[k + 1][0] > 34 ? 0.75 : 0.25;
          quad(S.hull, [P[k][0], s * P[k][1], P[k][2]], [P[k + 1][0], s * P[k + 1][1], P[k + 1][2]],
               [P[k + 1][0], s * (P[k + 1][1] - 0.04), P[k + 1][2] + h1], [P[k][0], s * (P[k][1] - 0.04), P[k][2] + h0], [P[k][0], 0, P[k][2] + 0.3]);
          quad(S.hull, [P[k][0], s * (P[k][1] - 0.12), P[k][2]], [P[k][0], s * (P[k][1] - 0.16), P[k][2] + h0],
               [P[k + 1][0], s * (P[k + 1][1] - 0.16), P[k + 1][2] + h1], [P[k + 1][0], s * (P[k + 1][1] - 0.12), P[k + 1][2]], [P[k][0], s * 9, P[k][2] + 0.3]);
          quad(S.hull, [P[k][0], s * (P[k][1] - 0.04), P[k][2] + h0], [P[k + 1][0], s * (P[k + 1][1] - 0.04), P[k + 1][2] + h1],
               [P[k + 1][0], s * (P[k + 1][1] - 0.16), P[k + 1][2] + h1], [P[k][0], s * (P[k][1] - 0.16), P[k][2] + h0], [P[k][0], s * (P[k][1] - 0.1), P[k][2]]);
        }
        var rp = P.filter(function (p) { return p[0] < 34.5; }).map(function (p) { return [p[0], s * (p[1] - 0.15), p[2] + 0.25]; });
        rail(S.metal, rp, 0.85, 1.4, 0.025);
        fairlead(S.metal, 42.0, s * 0.85, hw6(42, 5.5) * 0 + 5.5, 0.25 * s, 0.7);
        fairlead(S.metal, 30.0, s * 3.9, 4.95, 0.1 * s, 0.8);
        bollard(S.metal, 37.0, s * 1.6, 5.25, 0, 0.8);
        bollard(S.metal, 31.5, s * 2.6, 5.0, 0, 0.8);
        /* the knuckle: a thin strake along it                            */
        var KN = [];
        for (k = 0; k < xs.length; k++) if (xs[k] < 41.5) KN.push([xs[k], s * (hw6(xs[k], H.ZK) + 0.03), H.ZK]);
        for (k = 0; k < KN.length - 1; k++) tube(S.hull, KN[k], KN[k + 1], 0.07, 0.07, 3, false);
      }
      /* the windlass and cable gear on the forecastle, a breakwater     */
      for (s = -1; s <= 1; s += 2) {
        cylZ(S.metal, 35.0, s * 1.0, 5.15, 0.5, 0.45, 10);
        tube(S.metal, [35.0, s * 1.0, 5.4], [41.0, s * 0.6, 5.4], 0.07, 0.07, 4, false);
        boxZ(S.metal, 39.0, s * 0.8, 5.3, 0.6, 0.6, 0.25, 0);
      }
      hatch(S.metal, 32.8, 0, 5.05, 1.2, 1.0, 0);
      quad(S.sup, [30.6, -3.6, 4.95], [30.6, 3.6, 4.95], [30.3, 3.6, 5.75], [30.3, -3.6, 5.75], [29, 0, 5]);
      whip(S.metal, 44.2, 0, 5.6, 2.2, 0.035);
    })();
    /* the anchors in hawses high on the bow flare near the stem [C5][C4] */
    for (s = -1; s <= 1; s += 2) {
      var ay = hw6(39.6, 3.8);
      disc(S.dark, [39.6, s * (ay + 0.03), 3.8], [0.3, s, -0.2], 0.42, 10);
      anchor(S.metal, 39.6, s * (ay + 0.08), 3.7, [0.3, s, -0.2], 0.8);
    }
    /* scuttles in a row along the side, the quarter grilles [C1][C6]    */
    for (s = -1; s <= 1; s += 2) {
      for (x = -21; x < 21; x += 4.2) panel(S.dark, [x, s * (hw6(x, 4.4) + 0.02), 4.4], [0, s, 0.12], 0.4, 0.4);
      for (x = -36; x <= -30; x += 3) panel(S.dark, [x, s * (hw6(x, 4.4) + 0.02), 4.4], [0, s, 0.12], 0.35, 0.35);
      panel(S.grille, [-38.2, s * (hw6(-38.2, 4.75) + 0.02), 4.75], [0, s, 0.12], 2.4, 0.55);
      panel(S.grille, [-41.6, s * (hw6(-41.6, 4.75) + 0.02), 4.75], [0, s, 0.12], 2.0, 0.55);
      /* the oval openings in the waist bulwark [C2]                     */
      [2.5, -1.5].forEach(function (xo) { disc(S.dark, [xo, s * (hw6(xo, 6.2) + 0.0) - s * 0.05, 6.15], [0, s, 0.1], 0.18, 10, 0.4); });
      /* mooring openings in the transom quarter [C4]                    */
      panel(S.dark, [H.XS0 - 0.004, s * 3.6, 5.1], [-1, 0, 0], 0.7, 0.55);
    }

    /* ------------------------- the integrated superstructure [C1][C2]
       the hull side carried straight on up (leaning in) to the roof at
       6.6, from the sloped front (foot X 23.1, top 20.2) to the curve down
       to the pad (top -22.2, foot -24.8)                                   */
    (function () {
      var A = [], B = [], xx = [], k;
      for (k = 0; k < xs.length; k++) if (xs[k] > -24.8 && xs[k] < 23.1) xx.push(xs[k]);
      xx = [-24.8].concat(xx, [23.1]);
      xx.forEach(function (q) { A.push([q, -hw6(Math.min(q, 23.0), 5.9)]); });
      for (k = xx.length - 1; k >= 0; k--) A.push([xx[k], hw6(Math.min(xx[k], 23.0), 5.9)]);
      A.forEach(function (p) {
        var q = Math.max(-22.2, Math.min(20.2, p[0])), w = hw6(q, 5.9) - 0.1;
        B.push([q, Math.sign(p[1]) * Math.min(Math.abs(p[1]), w) * (q > 18 ? (1 - (q - 18) * 0.04) : 1)]);
      });
      frustum(S.hull, A, 4.85, B, H.ROOF, { top: S.deck });
      /* the roof's edge bulwark and rails                                */
      var EP = B.slice(0, xx.length);
      [EP, B.slice(xx.length)].forEach(function (L1) {
        rail(S.metal, L1.map(function (p) { return [p[0], p[1] * 0.985, H.ROOF]; }), 1.0, 1.5, 0.025);
      });
    })();
    /* the bridge block: chamfered, raked glazing over the front, its
       roof, wings [C1][C5]                                                 */
    (function () {
      var A = chamf(11.4, 21.5, -4.6, 4.6, 1.4), B = chamf(11.4, 21.1, -4.45, 4.45, 1.3);
      frustum(S.sup, A, H.ROOF, B, 7.5, { top: false });
      var Cg = chamf(11.4, 20.6, -4.3, 4.3, 1.2);
      frustum(S.sup, B, 7.5, Cg, 8.3, { top: false, face: function (k) { return (k >= 1 && k <= 4) || k === 0 || k === 5 ? (k === 0 || k === 5 ? S.sup : S.dark) : S.sup; } });
      frustum(S.sup, Cg, 8.3, inset(Cg, 0.1), 8.6, {});
      for (i = 0; i < 4; i++) for (s = -1; s <= 1; s += 2) panel(S.dark, [17.8 - i * 1.4, s * 4.33, 7.9], [0, s, 0], 0.9, 0.55);
      rail(S.metal, [[11.6, -4.2, 8.6], [20.4, -4.2, 8.6], [20.4, 4.2, 8.6], [11.6, 4.2, 8.6]], 0.9, 1.2, 0.022);
      /* bridge-roof fittings: searchlights, a small dome, whips          */
      for (s = -1; s <= 1; s += 2) { cylZ(S.metal, 19.4, s * 3.4, 8.6, 0.4, 0.12, 6); tube(S.metal, [19.2, s * 3.4, 9.15], [19.7, s * 3.4, 9.15], 0.22, 0.22, 8, true); }
      sphere(S.white, [16.0, 2.6, 9.0], 0.4, 10, false);
      /* the optronic director and the Type 347G dish on the mast block's
         forward roof [C2]                                                 */
    })();
    /* the mast block and its pyramid tower, the radar platform, the Type
       360 back-to-back array, the topmast [C1][C2][C5]                    */
    (function () {
      var A = chamf(5.3, 11.4, -4.0, 4.0, 1.2), B = chamf(5.5, 11.2, -3.6, 3.6, 1.1);
      frustum(S.sup, A, H.ROOF, B, 10.55, {});
      for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) panel(S.grille, [6.8 + i * 2.4, s * 3.83, 8.6], [0, s, 0.05], 1.6, 1.4);
      var Pb = chamf(6.0, 10.4, -2.4, 2.4, 0.7), Pt = chamf(6.9, 8.9, -1.1, 1.1, 0.3);
      frustum(S.sup, Pb, 10.55, Pt, 13.3, {});
      tube(S.sup, [7.9, 0, 13.3], [7.9, 0, 14.2], 0.7, 0.6, 8, false);
      bx(S.deck, 6.2, 9.6, -1.6, 1.6, 14.2, 14.35);
      rail(S.metal, [[6.25, -1.55, 14.35], [9.55, -1.55, 14.35], [9.55, 1.55, 14.35], [6.25, 1.55, 14.35], [6.25, -1.55, 14.35]], 0.9, 1.0, 0.02);
      cylZ(S.metal, 7.9, 0, 14.35, 0.5, 0.35, 10);
      obox(S.sup, [7.9, 0, 15.6], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.6, 2.4, 1.6);
      panel(S.dark, [8.22, 0, 15.6], [1, 0.0, 0.08], 2.2, 1.4);
      panel(S.dark, [7.58, 0, 15.6], [-1, 0, 0.08], 2.2, 1.4);
      tube(S.metal, [7.4, 0, 14.35], [7.4, 0, 18.2], 0.09, 0.04, 6, false);
      tube(S.metal, [7.4, -1.9, 17.0], [7.4, 1.9, 17.0], 0.05, 0.05, 4, true);
      sphere(S.white, [7.4, 0, 18.25], 0.12, 6, false);
      /* the 347G dish forward of the tower, on its pedestal [C2]          */
      cylZ(S.sup, 10.2, 0, 10.55, 0.9, 0.45, 10, 0.35);
      sphere(S.white, [10.55, 0, 12.0], 0.85, 14, false, 0.95);
      bx(S.metal, 9.6, 10.2, -0.35, 0.35, 11.45, 12.4);
      /* the optronic director on the roof to starboard; whips; the
         platforms' ladders                                                */
      cylZ(S.metal, 10.0, -2.6, 10.55, 0.4, 0.3, 8);
      boxZ(S.sup, 10.0, -2.6, 10.95, 0.7, 0.6, 0.5, 0);
      rail(S.metal, [[5.5, -3.5, 10.55], [11.1, -3.5, 10.55], [11.1, 3.5, 10.55], [5.5, 3.5, 10.55]], 0.9, 1.3, 0.022);
      ladder(S.metal, [5.6, 2.2, 10.55], [6.9, 1.0, 13.9], [1, 0, 0], 0.5, 0.3);
      /* the two H/PJ-17 at the mast block's after corners [C2]           */
      hpj17(S, 5.0, -3.4, H.ROOF, -PI2 - 0.4);
      hpj17(S, 5.0, 3.4, H.ROOF, PI2 + 0.4);
    })();
    /* the two YJ-83 twin launchers crossed in the waist [C2][C1]         */
    yj83(S, 2.6, -1.3, H.ROOF, 32 * PI / 180);
    yj83(S, 2.6, 1.3, H.ROOF, -32 * PI / 180);
    /* the funnel: tapered, louvred, its upper part dark; lockers [C1][C2] */
    (function () {
      var A = chamf(-6.7, -0.8, -2.4, 2.4, 0.9), B = chamf(-6.4, -1.1, -2.0, 2.0, 0.8);
      var Bm = [];
      for (var k = 0; k < A.length; k++) Bm.push([lerp(A[k][0], B[k][0], 0.65), lerp(A[k][1], B[k][1], 0.65)]);
      frustum(S.sup, A, H.ROOF, Bm, 9.4, { top: false });
      frustum(S.soot, Bm, 9.4, B, 11.9, { top: S.soot });
      for (var q = 0; q < 2; q++) for (s = -1; s <= 1; s += 2) panel(S.grille, [-2.6 - q * 2.2, s * 2.3, 8.2], [0, s, 0.07], 1.6, 1.6);
      for (s = -1; s <= 1; s += 2) bx(S.sup, -5.6, -3.4, s * 2.4, s * 2.9, H.ROOF, 8.0);
      tube(S.metal, [-3.0, 0.8, 11.9], [-3.0, 0.8, 12.4], 0.25, 0.25, 8, false);
      tube(S.metal, [-4.6, -0.8, 11.9], [-4.6, -0.8, 12.6], 0.3, 0.3, 8, false);
    })();
    /* raft canisters abreast the funnel (NOT CONFIRMED, see header)      */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) raft(S.white, S.metal, -8.0 - i * 1.6, s * 4.4, H.ROOF, PI2, 1.2, 0.3);
    /* the radomes, the after mast with its yard, the two whips, the two
       upright pipes, the HHQ-10 on its column facing aft [C1][C3]         */
    sphere(S.white, [-8.4, 1.4, 9.0], 0.65, 12, false); cylZ(S.sup, -8.4, 1.4, H.ROOF, 1.8, 0.4, 8);
    sphere(S.white, [-10.6, -1.4, 9.0], 0.65, 12, false); cylZ(S.sup, -10.6, -1.4, H.ROOF, 1.8, 0.4, 8);
    (function () {
      var A = chamf(-14.4, -12.2, -1.2, 1.2, 0.4), B = chamf(-14.0, -12.6, -0.6, 0.6, 0.2);
      frustum(S.sup, A, H.ROOF, B, 11.7, {});
      tube(S.metal, [-13.3, -2.0, 10.8], [-13.3, 2.0, 10.8], 0.06, 0.06, 4, true);
      tube(S.metal, [-13.3, 0, 11.7], [-13.3, 0, 13.4], 0.06, 0.03, 4, false);
      whip(S.metal, -10.0, 3.6, H.ROOF, 11.0, 0.04);
      whip(S.metal, -15.6, -3.6, H.ROOF, 11.0, 0.04);
      tube(S.white, [-15.4, 2.2, H.ROOF], [-15.4, 2.2, 10.2], 0.15, 0.15, 8, true);
      tube(S.white, [-16.2, 2.2, H.ROOF], [-16.2, 2.2, 10.0], 0.15, 0.15, 8, true);
    })();
    bx(S.sup, -21.2, -17.6, -1.6, 1.6, H.ROOF, 7.4);
    hhq10(S, -19.4, 0, 7.4, PI, 2, 4, true);
    /* hatches, vents and lockers on the roof                              */
    [[-6, 3.6], [14, -3.0], [-17, 3.6]].forEach(function (p) { hatch(S.metal, p[0], p[1], H.ROOF, 1.0, 0.8, 0); });
    [[-1.5, -4.0], [-11.5, 4.0], [-16.0, -4.0], [12.0, 3.9]].forEach(function (p) { mushroom(S.metal, p[0], p[1], H.ROOF, 0.18, 0.45); });
    goose(S.metal, -20.5, -3.6, H.ROOF, 0.12, 0.6, -PI2);
    ladder(S.metal, [-22.4, 3.0, H.PAD], [-21.0, 3.0, H.ROOF], [0, 1, 0], 0.5, 0.3);

    /* ----------------------------------------- the pad over the stern:
       no hangar, the edge line and touchdown circle in paint (a light
       stripe), the folded safety nets round it [C6], tie-downs           */
    (function () {
      var x0 = -44.4, x1 = -25.0, hw = 4.9, z = H.PAD + 0.02;
      function ring(cx, cy, r0, r1, n) {
        for (var k = 0; k < n; k++) {
          var a = k / n * TW, b = (k + 1) / n * TW;
          quad(S.white, [cx + r0 * Math.cos(a), cy + r0 * Math.sin(a), z], [cx + r1 * Math.cos(a), cy + r1 * Math.sin(a), z],
               [cx + r1 * Math.cos(b), cy + r1 * Math.sin(b), z], [cx + r0 * Math.cos(b), cy + r0 * Math.sin(b), z], [cx, cy, z - 1]);
        }
      }
      ring(-34.6, 0, 3.6, 3.85, 32);
      bx(S.white, x0 + 0.4, x1 - 0.4, -hw, -hw + 0.2, H.PAD, z);
      bx(S.white, x0 + 0.4, x1 - 0.4, hw - 0.2, hw, H.PAD, z);
      bx(S.white, x0 + 0.4, x0 + 0.6, -hw, hw, H.PAD, z);
      bx(S.white, -38.5, -30.7, -0.06, 0.06, H.PAD, z + 0.001);
      for (var tx = -42; tx < -26; tx += 2.2) for (var ty = -3.6; ty <= 3.6; ty += 2.4) bx(S.dark, tx - 0.1, tx + 0.1, ty - 0.1, ty + 0.1, H.PAD, z + 0.002);
      /* nets: a frame of tubes, the net as a dark mesh panel, folded out
         at the deck edge                                                   */
      for (s = -1; s <= 1; s += 2) {
        for (var nx = x0 + 0.5; nx < x1 - 0.5; nx += 2.4) {
          var nx2 = Math.min(nx + 2.3, x1 - 0.5), ye = s * (hw6(nx, 5.9) - 0.05);
          quad(S.grille, [nx, ye, H.PAD], [nx2, ye, H.PAD], [nx2, ye + s * 1.1, H.PAD + 0.3], [nx, ye + s * 1.1, H.PAD + 0.3], [nx, 0, 3]);
          tube(S.metal, [nx, ye, H.PAD], [nx, ye + s * 1.1, H.PAD + 0.3], 0.03, 0.03, 3, false);
        }
        tube(S.metal, [x0 + 0.5, s * (hw6(x0, 5.9) + 1.05), H.PAD + 0.3], [x1 - 0.5, s * (hw6(x1, 5.9) + 1.05), H.PAD + 0.3], 0.035, 0.035, 3, false);
        bollard(S.metal, -43.2, s * 3.6, H.PAD, 0, 0.7);
        bollard(S.metal, -27.0, s * 4.2, H.PAD, 0, 0.7);
        fairlead(S.metal, -44.2, s * 4.4, H.PAD, PI2, 0.7);
      }
      /* the hidden helipad node on the middle of the pad                    */
      var pad = new THREE.Object3D(); pad.name = "helipad"; pad.visible = false;
      pad.position.set(-34.6, 0, H.PAD); root.add(pad);
    })();

    /* ----------------------- under water: the 056's bow sonar dome (not
       on the 056A), two shafts, brackets, screws, two rudders, bilge keels
       (NOT CONFIRMED beyond the published draught and the two diesels)    */
    if (!v.towed) {
      sphere(S.under, [33.0, 0, -3.3], 0.7, 12, false);
      obox(S.under, [34.8, 0, -3.0], [1, 0, 0.12], [0, 1, 0], [-0.12, 0, 1], 3.6, 0.5, 1.4);
    }
    for (s = -1; s <= 1; s += 2) {
      tube(S.metal, [-14, s * 2.4, -2.6], [-38.0, s * 2.4, -1.75], 0.18, 0.17, 8, false);
      tube(S.metal, [-38.0, s * 2.4, -1.75], [-38.8, s * 2.4, -1.72], 0.3, 0.12, 8, true);
      for (i = 0; i < 4; i++) {
        var an = i * TW / 4 + 0.4;
        obox(S.metal, [-38.4, s * 2.4 + Math.cos(an) * 0.55, -1.74 + Math.sin(an) * 0.55], [1, 0, 0], [0, Math.cos(an), Math.sin(an)], [0, -Math.sin(an), Math.cos(an)], 0.35, 0.8, 0.06);
      }
      tube(S.metal, [-34.0, s * 2.4, -1.85], [-34.0, s * 1.8, -0.9], 0.08, 0.08, 4, false);
      obox(S.under, [-41.0, s * 2.4, -1.4], [1, 0, 0], [0, 1, 0], [0, 0, 1], 1.8, 0.2, 1.8);
      obox(S.under, [-6, s * 4.3, -2.6], [1, 0, 0], [0, 0.55, -0.83], [0, 0.83, 0.55], 18, 0.6, 0.08);
    }

    /* team: strips on the bridge roof, the funnel and the pad's edge      */
    bx(S.team, 13.0, 15.0, -1.5, 1.5, 8.6, 8.64);
    bx(S.team, -6.0, -2.0, -2.45, -2.3, 10.0, 10.6);
    bx(S.team, -6.0, -2.0, 2.3, 2.45, 10.0, 10.6);

    emit(THREE, root, S, T, TILE);

    /* the 76 mm, the row's turret, on its ring on the forecastle         */
    cylZ(S.sup, 26.4, 0, 4.9, 0.25, 1.7, 16);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(26.4, 0, H.FC + 0.2);
    var TS = sinks(["sup", "metal", "dark", "team"]);
    hpj26(TS);
    emit(THREE, tw, TS, T, TILE);
    root.add(tw);
    var ringS = sinks(["sup"]); cylZ(ringS.sup, 26.4, 0, H.FC - 0.05, 0.25, 1.75, 16); emit(THREE, root, ringS, T, TILE);
    root.userData.heroLen = 89.0;
    return mergeSame(THREE, root);
  }
  /* meshes of the same material directly under root merged into one      */
  function mergeSame(THREE, root) {
    var by = {}, out = [];
    root.children.slice().forEach(function (c) {
      if (!c.isMesh) return;
      var k = c.material.uuid;
      if (!by[k]) { by[k] = []; }
      by[k].push(c);
    });
    Object.keys(by).forEach(function (k) {
      var L1 = by[k];
      if (L1.length < 2) return;
      var P = [], N = [], U = [];
      L1.forEach(function (m) {
        var g = m.geometry, p = g.attributes.position.array, n = g.attributes.normal.array, u = g.attributes.uv.array, q;
        for (q = 0; q < p.length; q++) { P.push(p[q]); N.push(n[q]); }
        for (q = 0; q < u.length; q++) U.push(u[q]);
        root.remove(m);
      });
      var g2 = new THREE.BufferGeometry();
      g2.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
      g2.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
      g2.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2));
      var me = new THREE.Mesh(g2, L1[0].material); me.castShadow = true; me.receiveShadow = true;
      root.add(me);
    });
    return root;
  }

  /* ================================================================= 094
     JIN: [X, top z, keel z] off [S1] (the earlier model's reading, kept):
     the casing aft, the missile hump flat at about 6.2 (-17..+30), the
     forward casing falling into the bow; the screw tip at X -68.5.      */
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
  var JIN_BEAM = 6.5;
  function jinRow(x) { var r = tab(JIN, x); return [x, r[1], r[2]]; }
  /* the section: a round lower hull (half height up to 5.9 m) under a
     superellipse upper part up to the casing or the hump top; the width
     capped at the published half beam (NOT CONFIRMED)                     */
  function jinSec(x) {
    var r = jinRow(x), top = r[1], kz = r[2], hl = Math.min(5.9, (top - kz) / 2);
    var zc = kz + hl, w = Math.min(JIN_BEAM, hl * 1.1), hu = top - zc;
    var n = hu > hl * 1.15 ? 2.8 : 2.0;
    return { zc: zc, hl: hl, hu: hu, w: w, n: n, top: top };
  }
  function jinY(x, z) {
    var q = jinSec(x), t;
    if (z >= q.zc) { t = (z - q.zc) / q.hu; if (t >= 1) return 0; return q.w * Math.pow(1 - Math.pow(t, q.n), 1 / q.n); }
    t = (q.zc - z) / q.hl; if (t >= 1) return 0; return q.w * Math.pow(1 - t * t, 0.5);
  }
  var NR94 = 26;
  /* half a section, keel (y 0) round the port side to the top (y 0);
     the waterline (z -0.15, the boot line of [S1]) is one of the points */
  function sec94(x) {
    var q = jinSec(x), o = [], k;
    for (k = 0; k <= NR94; k++) {
      var a = -PI / 2 + PI * k / NR94, c = Math.cos(a), sn = Math.sin(a), y, z;
      if (sn >= 0) { y = q.w * Math.pow(Math.abs(c), 2 / q.n); z = q.zc + q.hu * Math.pow(sn, 2 / q.n); }
      else { y = q.w * c; z = q.zc + q.hl * sn; }
      o.push([Math.max(0, y), z]);
    }
    o[0][0] = 0; o[NR94][0] = 0;
    return o;
  }

  function build094(THREE, M, C) {
    var root = new THREE.Group(), i, j, s, x;
    var T = makeMats(THREE, C, { under: 0x3b2420 });
    T.tile = new THREE.MeshStandardMaterial({ color: 0x2a2d2f, map: tileTex(THREE), roughness: 0.93, metalness: 0.02 });
    T.under = new THREE.MeshStandardMaterial({ color: 0x40271f, map: tileTex(THREE), roughness: 0.93, metalness: 0.02 });
    T.metal = new THREE.MeshStandardMaterial({ color: 0x6c5f45, roughness: 0.4, metalness: 0.7, side: THREE.DoubleSide });
    T.dark = new THREE.MeshStandardMaterial({ color: 0x08090a, roughness: 0.6, metalness: 0.1, side: THREE.DoubleSide });
    T.grey = new THREE.MeshStandardMaterial({ color: 0x3d4144, roughness: 0.7, metalness: 0.3 });
    ["tile", "under", "metal", "dark", "grey"].forEach(function (k) { T[k].userData = { _srgbDone: true }; });
    var S = sinks(["tile", "under", "dark", "metal", "grey", "white", "team"]);
    var ZB = -0.15;

    /* ------------------------------------------------- the hull [S1] */
    var xs = [];
    for (x = -66.0; x < 68.5; x += (x > 60 || x < -58 ? 0.8 : x > 26 && x < 34 ? 1.0 : x > -20 && x < -2 ? 1.2 : 2.4)) xs.push(x);
    xs.push(-17.3, -3.5, 28.0, 29.9, 68.5);
    xs.sort(function (a, b) { return a - b; });
    xs = xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.2; });
    hullLoft(S, xs, sec94, function (z) { return z >= ZB ? "tile" : "under"; }, function (xx) { return jinSec(xx).zc; });
    /* the tail cone's end, closed round the shaft                           */
    (function () {
      var R0 = sec94(xs[0]), k;
      for (k = 0; k < R0.length - 1; k++) for (s = -1; s <= 1; s += 2)
        tri(S.under, [xs[0], s * R0[k][0], R0[k][1]], [xs[0], s * R0[k + 1][0], R0[k + 1][1]], [xs[0] - 0.4, 0, -3.0], [xs[0] + 2, 0, -3.0]);
    })();

    /* ----------------- the casing lines [S1]: the long dark slots low on
       the sides, the free-flood openings at the bow                        */
    function slot(x0, z0, x1, z1, hgt) {
      for (s = -1; s <= 1; s += 2) {
        var n = Math.max(2, Math.ceil(Math.abs(x1 - x0) / 1.5)), k;
        for (k = 0; k < n; k++) {
          var xa = lerp(x0, x1, k / n), xb = lerp(x0, x1, (k + 1) / n), za = lerp(z0, z1, k / n), zb = lerp(z0, z1, (k + 1) / n);
          var ya = jinY(xa, za) + 0.03, yb = jinY(xb, zb) + 0.03;
          quad(S.dark, [xa, s * ya, za - hgt / 2], [xb, s * yb, zb - hgt / 2], [xb, s * yb, zb + hgt / 2], [xa, s * ya, za + hgt / 2], [(xa + xb) / 2, 0, (za + zb) / 2]);
        }
      }
    }
    slot(-43.0, 1.6, -27.6, 2.1, 0.22);
    slot(-21.0, 2.2, -11.3, 2.2, 0.22);
    slot(36.5, 2.2, 57.7, -0.4, 0.22);
    slot(-11.3, 0.95, 23.2, 0.95, 0.16);
    /* the limber holes: about five rows on the hump flank, in two groups
       [S1][S2], following the flank, the rows lifting at the ends          */
    function holes(x0, x1) {
      var r, n = Math.floor((x1 - x0) / 0.78), k;
      for (r = 0; r < 5; r++) for (k = 0; k < n; k++) {
        x = x0 + 0.39 + k * 0.78;
        var f = (x - x0) / (x1 - x0), lift = 0.7 * Math.pow(Math.abs(f - 0.5) * 2, 3);
        var z = 1.55 + r * 0.42 + lift;
        for (s = -1; s <= 1; s += 2) {
          var y = jinY(x, z) + 0.03;
          var y2 = jinY(x, z + 0.24) + 0.03;
          quad(S.dark, [x - 0.27, s * y, z], [x + 0.27, s * y, z], [x + 0.27, s * y2, z + 0.24], [x - 0.27, s * y2, z + 0.24], [x, 0, z]);
        }
      }
    }
    holes(-11.8, 23.2);
    holes(23.9, 39.0);

    /* ------------------------------------------------ the twelve hatches
       two rows of six at X 2.6 .. 21.4 [S1][S2]: drawn shut, each a raised
       rim with a dark seam, a lid with its hinge and lugs                   */
    for (i = 0; i < 6; i++) for (s = -1; s <= 1; s += 2) {
      x = 2.6 + i * 3.78;
      var yh = s * 1.6, zt = jinRow(x)[1] - 0.12;
      for (var k = 0; k < 20; k++) {
        var a0 = k / 20 * TW, a1 = (k + 1) / 20 * TW;
        quad(S.grey, [x + 1.33 * Math.cos(a0), yh + 1.33 * Math.sin(a0), zt + 0.155], [x + 1.14 * Math.cos(a0), yh + 1.14 * Math.sin(a0), zt + 0.155],
             [x + 1.14 * Math.cos(a1), yh + 1.14 * Math.sin(a1), zt + 0.155], [x + 1.33 * Math.cos(a1), yh + 1.33 * Math.sin(a1), zt + 0.155], [x, yh, zt]);
      }
      cylZ(S.tile, x, yh, zt, 0.15, 1.42, 20, 1.38);
      cylZ(S.tile, x, yh, zt + 0.15, 0.1, 1.12, 20, 1.08);
      tube(S.grey, [x - 0.7, yh + s * 1.25, zt + 0.25], [x + 0.7, yh + s * 1.25, zt + 0.25], 0.12, 0.12, 6, true);
      bx(S.grey, x - 0.15, x + 0.15, yh - s * 1.3, yh - s * 1.1, zt + 0.1, zt + 0.3);
    }
    /* the hump's flat top between the rows: a walkway of non-slip strips  */
    for (x = 0.6; x < 23.5; x += 1.6) bx(S.grey, x - 0.6, x + 0.6, -0.25, 0.25, jinRow(x)[1] - 0.04, jinRow(x)[1] + 0.01);
    /* retractable cleats and the post on the casing [S1]                    */
    [-40, -30, 48, 56].forEach(function (xc) { bx(S.dark, xc - 0.5, xc + 0.5, -0.2, 0.2, jinRow(xc)[1] - 0.05, jinRow(xc)[1] + 0.02); });
    cylZ(S.tile, 59.9, 0, jinRow(59.9)[1] - 0.1, 1.6, 0.18, 8, 0.12);
    /* the bow: the sonar window seam and the torpedo-tube shutter lines   */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) {
      var tx = 62.0, tz = -1.6 - i * 1.4;
      panel(S.dark, [tx, s * (jinY(tx, tz) + 0.05), tz], [0.3, s, 0], 1.2, 0.7);
    }

    /* -------------------------------------------- the sail [S1][S2]
       30.1..45.6, flat top 9.9, straight vertical front, a fillet at its
       foot 28.9..47.1; plan width NOT CONFIRMED (2.9 m)                    */
    function sailPlan(x0, x1, hw) {
      var o = [], k;
      o.push([x0, -hw * 0.45]); o.push([x0 + 1.2, -hw * 0.92]);
      for (k = 0; k <= 8; k++) { var a = -PI / 2 + PI * k / 8; o.push([x1 - hw * 1.6 + hw * 1.6 * Math.cos(a), hw * Math.sin(a)]); }
      o.push([x0 + 1.2, hw * 0.92]); o.push([x0, hw * 0.45]);
      return o;
    }
    frustum(S.tile, sailPlan(28.9, 47.1, 2.2), 2.8, sailPlan(30.1, 45.6, 1.45), 4.3, { top: false });
    frustum(S.tile, sailPlan(30.1, 45.6, 1.45), 4.25, sailPlan(30.25, 45.5, 1.38), 9.9, {});
    /* the windows: three at the forward top, two at the after top [S1]  */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) panel(S.dark, [44.4 - i * 0.55 + 0.0, s * 1.39, 9.25], [0.1, s, 0], 0.38, 0.32);
      for (i = 0; i < 2; i++) panel(S.dark, [30.5, s * (0.42 + i * 0.0) * 1.0 + s * 0.0, 9.1 - i * 0.8], [-1, s * 0.4, 0], 0.32, 0.3);
      /* the bridge cockpit cut into the sail top forward                  */
    }
    bx(S.dark, 43.2, 45.0, -0.75, 0.75, 9.86, 9.94);
    rail(S.grey, [[43.0, -0.9, 9.9], [45.2, -0.9, 9.9], [45.2, 0.9, 9.9], [43.0, 0.9, 9.9]], 0.9, 0.7, 0.02);
    /* the sail planes high on its forward half [S2]: a tapered foil with
       its root fairing, span NOT CONFIRMED (3.0 m)                         */
    for (s = -1; s <= 1; s += 2) {
      var z0p = 8.3;
      var Pr = [[38.6, s * 1.4, z0p], [44.0, s * 1.4, z0p], [42.4, s * 4.4, z0p], [39.4, s * 4.4, z0p]];
      var th = 0.17;
      quad(S.tile, [Pr[0][0], Pr[0][1], z0p + th], [Pr[1][0], Pr[1][1], z0p + th * 1.3], [Pr[2][0], Pr[2][1], z0p + th * 0.6], [Pr[3][0], Pr[3][1], z0p + th * 0.5], [41, s * 2.9, z0p - 1]);
      quad(S.tile, [Pr[0][0], Pr[0][1], z0p - th], [Pr[1][0], Pr[1][1], z0p - th * 1.3], [Pr[2][0], Pr[2][1], z0p - th * 0.6], [Pr[3][0], Pr[3][1], z0p - th * 0.5], [41, s * 2.9, z0p + 1]);
      quad(S.tile, [Pr[1][0], Pr[1][1], z0p - th * 1.3], [Pr[2][0], Pr[2][1], z0p - th * 0.6], [Pr[2][0], Pr[2][1], z0p + th * 0.6], [Pr[1][0], Pr[1][1], z0p + th * 1.3], [41, s * 2.9, z0p]);
      quad(S.tile, [Pr[3][0], Pr[3][1], z0p - th * 0.5], [Pr[0][0], Pr[0][1], z0p - th], [Pr[0][0], Pr[0][1], z0p + th], [Pr[3][0], Pr[3][1], z0p + th * 0.5], [41, s * 2.9, z0p]);
      quad(S.tile, [Pr[2][0], Pr[2][1], z0p - th * 0.6], [Pr[3][0], Pr[3][1], z0p - th * 0.5], [Pr[3][0], Pr[3][1], z0p + th * 0.5], [Pr[2][0], Pr[2][1], z0p + th * 0.6], [41, s * 2.9, z0p]);
      bx(S.dark, 42.5, 42.6, s * 1.45, s * 4.35, z0p - 0.18, z0p + 0.2);
    }
    /* the masts in the sail top: two periscopes, the snort, the radar and
       the communications masts, the whip (housing to 10.9, whip to 13.9)
       [S1]                                                                 */
    cylZ(S.tile, 41.8, 0.0, 9.9, 1.0, 0.5, 10, 0.42);
    cylZ(S.grey, 41.8, 0.0, 10.9, 3.0, 0.11, 6, 0.05);
    cylZ(S.tile, 40.6, 0.35, 9.9, 1.5, 0.3, 8, 0.24);
    cylZ(S.tile, 39.4, -0.3, 9.9, 1.1, 0.42, 4, 0.3);
    bx(S.tile, 37.8, 38.8, -0.4, 0.4, 9.9, 11.6);
    tube(S.grey, [37.8, -0.9, 11.4], [37.8, 0.9, 11.4], 0.06, 0.06, 4, true);
    cylZ(S.tile, 36.2, 0, 9.9, 0.6, 0.35, 8);
    for (i = 0; i < 4; i++) bx(S.dark, 35.0 + i * 2.3, 35.0 + i * 2.3 + 1.6, -0.55, 0.55, 9.88, 9.92);

    /* ---------------------------------- the cruciform stern [S1]: the
       upper rudder to 4.8 and the lower to -9.9, each with its hinged
       after part; the stern planes on the axis with their trailing flaps
       (span NOT CONFIRMED)                                                  */
    function fin(x0, x1, x2, x3, zr, zt, th, sk, flip) {
      /* a vertical fin: root x0..x1 at zr, tip x3..x2 at zt, th thick     */
      var a = [x0, 0, zr], b = [x1, 0, zr], c = [x2, 0, zt], d = [x3, 0, zt], k;
      var P = [a, b, c, d], L1 = [], R1 = [];
      P.forEach(function (p, q) { var t = q < 2 ? th : th * 0.6; L1.push([p[0], t / 2, p[2]]); R1.push([p[0], -t / 2, p[2]]); });
      var ref = [(x0 + x1) / 2, 0, (zr + zt) / 2];
      quad(sk, L1[0], L1[1], L1[2], L1[3], [ref[0], -1, ref[2]]);
      quad(sk, R1[0], R1[1], R1[2], R1[3], [ref[0], 1, ref[2]]);
      for (k = 0; k < 4; k++) { var k2 = (k + 1) % 4; quad(sk, L1[k], L1[k2], R1[k2], R1[k], ref); }
    }
    fin(-60.2, -54.0, -54.7, -60.0, -1.6, 4.8, 0.55, S.tile);
    fin(-59.6, -53.0, -54.4, -59.4, -4.0, -9.9, 0.55, S.under);
    for (s = -1; s <= 1; s += 2) {
      panel(S.dark, [-57.2, s * 0.29, 1.6], [0, s, 0], 0.08, 6.2);
      panel(S.dark, [-57.0, s * 0.29, -7.0], [0, s, 0], 0.08, 5.8);
    }
    bx(S.tile, -60.4, -58.2, -0.32, 0.32, 4.5, 4.85);
    /* the stern planes: horizontal fins on the shaft axis at -3.0       */
    for (s = -1; s <= 1; s += 2) {
      var Q = [[-62.6, s * 0.0], [-51.9, s * 0.0], [-56.0, s * 6.6], [-60.6, s * 6.6]], zp = -3.0, tp = 0.5;
      var U1 = Q.map(function (p, q) { return [p[0], p[1], zp + (q < 2 ? tp : tp * 0.6) / 2]; });
      var D1 = Q.map(function (p, q) { return [p[0], p[1], zp - (q < 2 ? tp : tp * 0.6) / 2]; });
      var rf = [-57.5, s * 3.3, zp];
      quad(S.under, U1[0], U1[1], U1[2], U1[3], [rf[0], rf[1], zp - 1]);
      quad(S.under, D1[0], D1[1], D1[2], D1[3], [rf[0], rf[1], zp + 1]);
      for (var q2 = 0; q2 < 4; q2++) { var q3 = (q2 + 1) % 4; quad(S.under, U1[q2], U1[q3], D1[q3], D1[q2], rf); }
      bx(S.dark, -60.0, -59.9, s * 2.6, s * 6.4, zp - 0.27, zp + 0.27);
      /* the end plates at the planes' tips                               */
      obox(S.under, [-58.3, s * 6.7, zp], [1, 0, 0], [0, 1, 0], [0, 0, 1], 4.4, 0.2, 1.4);
    }
    /* the screw [S1]: a hub, a cone and seven skewed blades, 4.9 m
       across, bronze                                                        */
    tube(S.metal, [-66.3, 0, -3.05], [-67.5, 0, -3.05], 0.55, 0.5, 14, false);
    tube(S.metal, [-67.5, 0, -3.05], [-68.5, 0, -3.05], 0.5, 0.05, 14, true);
    for (i = 0; i < 7; i++) {
      var ang = i * TW / 7, k2;
      var P0 = [], P1 = [];
      for (k2 = 0; k2 <= 5; k2++) {
        var rr = 0.5 + (2.45 - 0.5) * k2 / 5, sk = ang + 0.5 * Math.pow(k2 / 5, 1.6), wch = 0.55 * (1 - Math.pow(k2 / 5, 2) * 0.6);
        P0.push([-67.0 - wch * 0.6, Math.cos(sk - 0.12) * rr, -3.05 + Math.sin(sk - 0.12) * rr]);
        P1.push([-67.0 + wch * 0.6, Math.cos(sk + 0.12) * rr, -3.05 + Math.sin(sk + 0.12) * rr]);
      }
      for (k2 = 0; k2 < 5; k2++) {
        quad(S.metal, P0[k2], P0[k2 + 1], P1[k2 + 1], P1[k2], null);
      }
    }

    /* team: small strips on the sail top and the hump                     */
    bx(S.team, 32.0, 34.4, -0.45, 0.45, 9.9, 9.94);
    bx(S.team, -14.0, -11.0, -0.5, 0.5, jinRow(-12.5)[1] - 0.05, jinRow(-12.5)[1] + 0.06);

    emit(THREE, root, S, T, { tile: 4.8, under: 4.8, grey: 2, dark: 2, metal: 2, white: 2, team: 2 });
    root.userData.heroLen = 137.0;
    return root;
  }

  return { build075: build075, build056: build056, build094: build094 };
})();

/* Registration: len is each model's measured X extent.  This file must
   load AFTER js/hero/pla_lhd_type075.js, pla_type056.js, pla_navy_modern.js
   and skirmish_reuse.js (it replaces their entries for these keys).      */
UNIT_MODELS["lhd_c"] = {
  len: 232.0,
  build: function (THREE, M, C) { return HeroPLANavyRedo.build075(THREE, M, C); }
};
UNIT_MODELS["pla_e00_corvette"] = {
  len: 89.0,
  build: function (THREE, M, C) { return HeroPLANavyRedo.build056(THREE, M, C, { towed: false }); }
};
UNIT_MODELS["corvette_c"] = {
  len: 89.0,
  build: function (THREE, M, C) { return HeroPLANavyRedo.build056(THREE, M, C, { towed: true }); }
};
UNIT_MODELS["ssbn_c"] = {
  len: 137.0,
  build: function (THREE, M, C) { return HeroPLANavyRedo.build094(THREE, M, C); }
};
