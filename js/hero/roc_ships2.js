/* ==================== js/hero/roc_ships2.js ===========================
   HERO MODELS -- Republic of China Navy small combatants and submarines, one self-contained module
   (HeroRocShips2) with seven builders, the geometry kit copied from js/hero/ru_osa_boat.js.

   ROWS (eras.js names) AND BUILDERS
     roc_e60_missileboat, roc_e80_missileboat, roc_e90_missileboat  "Hai Ou"        -> haiOu()
     roc_e00_missileboat   "Kuang Hua VI"                                           -> kuangHua6()
     roc_e80_corvette      "Lung Chiang PGG" (PSMM Mk 5 derivative)                 -> lungChiang()
     roc_e90_corvette      "Chin Chiang PGG"                                         -> chinChiang()
     roc_e00_corvette      "Tuo Chiang" (stealth catamaran, the Flight 0 ship PGG-618) -> tuoChiang()
     roc_e60_sub           "Hai Shih SSK" (ex-USN Tench class, GUPPY II)            -> haiShih()
     roc_e80_sub, roc_e90_sub, roc_e00_sub  "Hai Lung SSK" (Zwaardvis-derived)      -> haiLung()
   One builder serves the three Hai Ou rows and one the three Hai Lung rows: no photograph shows an
   outside difference between the eras, so there is no VARIANTS table.
   REUSE CHECKED: js/hero has no Dvora, PSMM, Tench / fleet-boat or Zwaardvis build to call.
   us_nautilus_ssn571.js only borrows a GUPPY-style hull for a nuclear boat with its own sail, and
   pla_houbei.js is the Type 022, a different catamaran. Each hull here is drawn new.

   DETAIL PASS (2026-11-12, review policy rule 10; the station tables and every measured part unchanged):
     the fittings the profile measurements left out, as the same photographs show them -- stanchion rails
     with two wires round the house roofs, open bridges and mast platforms (the deck-edge rails of the
     Lung Chiang now run past the house, as [L1] shows); bitts, fairleads, the anchors in their hawses and
     the chain pipes; round and square hatches; mushroom vents; ladders between the levels and up the masts;
     raft canisters and life rings ([K1][L1][H1] show them on the houses); whips and searchlights; the
     scuttles under the Hai Ou's house; a toe rail, a dark waterway and a rubbing strake along every
     monohull's deck edge; a black boot-topping line 0 - 0.28 m on every surface hull; the box launchers'
     frames and cable runs; the Tuo Chiang's anchor pockets and hawse [T1], flush door and louvre outlines,
     bridge-face lights, masthead balls and flight-deck tie-downs; the submarines' casing slat lines,
     hatches, cleats, sail windows, housed mast tops and sail rungs.  The hull plans are tapered toward the
     transom (it was nearly a parallel box aft) and the topsides carry a little flare everywhere: Hai Ou
     transom half-breadth 2.55 -> 2.38, Kuang Hua VI 3.55 -> 3.3, Lung Chiang 3.3 -> 3.05, Chin Chiang
     4.3 -> 3.95; maximum beam unchanged.  NOT CONFIRMED: the exact positions and counts of these small
     fittings (placed where the photographs show them, or where such boats carry them); the canisters and
     rings drawn at their usual sizes.  The paint canvas now carries frame lines, rust runs and waterline
     grime.  Draw calls stay 8 - 15 (new materials: boot top, white canisters, life-ring orange).
     MEASURED after it: Hai Ou 21.6 x 5.61 x 10.15, KH6 34.2 x 7.63 x 11.6 (the long whip aft of the
     house, [K1]), Lung Chiang 50.1 x 7.43, Chin Chiang 61.4 x 9.62 (the rubbing strakes stand 0.05 m
     proud of the published beam), Hai Lung 13.32 high (the housed mast tops 0.12 m over the fin).

   REFERENCES (Wikimedia Commons, fetched one at a time through thumb.php into the scratchpad
   q_rocships2_ref; d = metres forward of the transom / after end throughout):
     [H1] "Hai Ou Class missile boat.jpg": three Hai Ou boats moored, the nearest from the starboard
          quarter. Shows the two Hsiung Feng I boxes side by side on the after deck rising toward the bow,
          the four-legged lattice mast with the round director and the bar antenna on its head, the
          wheelhouse forward of the mast, the 20 mm on the foredeck with its barrel raised, the hard
          chine and the raked stem. The hull number is on the transom.
     [H2] "Hai Ou class missile boats.jpg": four boats moored stern-to. The transom face is 50 px tall
          by about 160 px wide (beam 5.5 m): 1.55 m stern freeboard. The two launchers are 2.5 m apart
          centre to centre and 1.6 m wide, their after ends on legs, the mast top and yard, the rails.
     [K1] "ROCN FACG 68 Passing through Exercise Water in High Speed 20141123a.jpg": a true starboard
          broadside of a Kuang Hua VI, 1125 px over 34.2 m (32.9 px/m), the master for that boat. Read off
          it: deck 1.9 m aft to 2.05 m at the stem head, knuckle 1.1 - 1.8 m, the forefoot at d 32.1,
          the faceted house d 7.3 - 25.5 (roof 4.6 m, bridge 5.3 m), the raked enclosed mast (foot d 19.0
          - 21.4, head d 18.7 at 9.0 m), the twin boxes on the roof, the 20 mm aft at d 3.9, the darker
          grey band from the waterline to the knuckle.
     [K2] "Left View of ROCN FACG 65 and 69 ...20141123.jpg": from the port quarter: the house sides
          leaning in, the walkway outboard of it, the canister boxes on the roof, the quarterdeck.
     [K3] "FACG-74 in No.13 Pier Right Front View 20130504.jpg": the house face and bow.
     [L1] "ROCN Sui Chiang PG-602 20050525.jpg": a true port broadside of a Lung Chiang, 1250 px over
          50.1 m (24.9 px/m), the master for that ship. Read off it: deck 2.2 m aft to 4.3 m at the stem
          head, forefoot d 47.0, house d 14.2 - 33.6 (sloped after end, roof 5.55 m, bridge 5.95 m, open
          bridge screen 6.65 m), lattice mast d 22.4 - 25.0 with its head platform at 12.5 m and the
          radome over it (top 15.0 m), the pole forward of it (15.7 m), the tripod with the flat search
          array (9.3 - 10.0 m) at d 19.8, the uptake at d 25.9, two tandem pairs of Hsiung Feng I boxes
          rising forward at d 5.4 and 9.3, the round after mount at d 2.9 (2.5 m across, top 4.9 m), the
          76 mm cupola at d 38.4 (2.5 m across, 1.9 m tall).
     [L2] "%E9%BE%8D%E6%B1%9F%E7%B4%9A%E5%B7%A1%E9%82%8F%E8%89%A6.jpg": two of the class at a pier from the bow: the house front,
          the 76 mm's smooth cupola, the radome on the lattice mast.
     [C1] "PGG-606%E5%8F%B3%E5%81%B4.jpg": a starboard broadside of a Chin Chiang at sea, 1010 px over 61.4 m
          (16.45 px/m), the master for that ship: deck 2.85 m aft to 4.4 m at the stem head, the forefoot
          d 58.4, the two-tier house d 15.8 - 47.1 (roof 7.9 - 8.1 m) with the raised louvred block
          d 26.1 - 33.4 (10.6 m), the two small radomes over the bridge, the lattice main mast d 32.8 -
          36.5 to 19.5 m, the box racks abaft the house rising forward, the 40 mm cupola at d 50.3.
     [C2] "ROCN PGG-608 in Port of Keelung 20100131.jpg": the class in 2010 from above: the same house,
          mast and domes, and NO after radar tower (see NOT CONFIRMED).
     [T1] "%E6%B5%B7%E8%BB%8D%E6%B2%B1%E6%B1%9F%E8%BB%8D%E8%89%A6.jpg" (PGG-618 underway, bow quarter): the two wave-piercing bows reaching forward
          at the waterline, the high wet deck between them, the topsides leaning in, the faceted 76 mm
          shield, the bridge house with its window row, the four-sided mast, the ball director on its
          post, the Phalanx dome aft.
     [T2] "%E6%B2%B1%E6%B1%9F%E7%B4%9A%E8%89%A6%E5%87%BA%E6%B8%AF.jpg" (PGG-619, the Flight I ship, used only for the bows and foredeck plan).
     [T3] "ROCN PGG-618 model at RF5 20171022.jpg": a 1/72 builder-style model of PGG-618 near side-on,
          1072 px over 60.4 m (17.75 px/m), the master for heights (near-side edges only): flight deck
          4.0 m (d 0 - 13.2), superstructure sides 8.1 m, foredeck 7.3 - 7.0 m, bridge roof 12.0 m,
          mast head 16.8 m and pole 18.6 m, the open launcher well d 17.5 - 30.5 with canister banks,
          the Phalanx block d 13.2 - 17.0, the 76 mm at d 50.2.
     [T4] "%E4%BF%AF%E8%A6%96%E6%B2%B1%E6%B1%9F%E8%BB%8D%E8%89%A6.jpg" (PGG-618 from the air): the plan -- full-width hull, the stern deck with its
          rails and pad, the launcher well, the bow.
     [S1] "ROCN SS-791 left side in Keelung 20190928a.jpg": Hai Shih broadside, 1257 px over 93.6 m
          (13.43 px/m), the master for that boat: casing 2.6 m over the water, the sail d 51.4 - 63.1 at
          the foot and d 52.9 - 62.5 at the top (9.5 m), the casing falling to 1.3 m aft.
     [S2] "ROCS Hai Shih (SS-791).jpg": at sea from the air: the flat narrow casing, the blunt bow, the
          sail's flat sides and round nose, one whip on the sail, black paint.
     [S3] "ROCN SS-791 model at RF7 20191102.jpg": a 1/350 model, side-on: the underwater body (keel
          4.3 m under the water, 6.9 m from casing to keel), the chin sonar dome under the bow, the bow
          planes high on the casing, the twin screws, stern planes and rudder, the rows of holes and the
          guard rails on the casing, red anti-fouling below the waterline.
     [Z1] "Hai Lung class submarine SS-794.jpg": Hai Hu at a pier from the bow: the round bow, the tall
          fin with its planes high near the leading edge, the black finish.
     [Z2] "SS793 Submarines1.jpg": Hai Lung at speed from above: the fin's round nose and tapering tail,
          the plane span about 0.9 of the beam.
     [Z3] "ROCN SS-793 model 20201107a.jpg" (1/700): the teardrop, the fin's leading edge 0.295 L abaft
          the bow and its 11.6 m foot, the cruciform tail, the single screw.
     [Z4] "ROCN SS-794 model 20190928.jpg": the fin 4.9 m over the crown (88 px against the 8.4 m hull's
          150 px), the upper and lower rudders and stern planes, a five-bladed screw, the slots.
     [Z5] "ROCN SS-793 model 20220108.jpg": a second model in dock, the same tail and fin.
   PUBLISHED FIGURES (en.wikipedia raw pages fetched for Kuang Hua VI, Tuo Chiang, Hai Lung and Tench;
   the Hai Ou, Lung Chiang, Chin Chiang and Hai Shih pages answered HTTP 429 every time, so those use the
   game's own rows in warship_specs.js / sub_specs.js):
     Hai Ou 21.6 x 5.5 m (warship_specs).  Kuang Hua VI 34.2 x 7.6 m, draught 3 m.  Lung Chiang 50.1 x
     7.3 m (warship_specs).  Chin Chiang 61.4 x 9.5 m (warship_specs).  Tuo Chiang 60.4 m (on cushion)
     x 14.0 m, draught 2.3 m.  Tench 95.0 m as built, beam 8.3 m, draught 17 ft max; the GUPPY II row
     is 93.6 m (sub_specs).  Hai Lung 66.9 x 8.4 m, draught 6.7 m.

   MEASURED (dump.js, L x beam x height keel-to-top) against the figures:
     Hai Ou       21.6 x 5.5 x 10.15  (5.5 published; draught 1.0 m drawn at the keel, the shafts 1.25)
     Kuang Hua VI 34.2 x 7.6 x 11.4   (keel 1.8 m: the published 3 m draught is probably to the jets /
                                       screws, never seen; mast top 9.6 m over the water)
     Lung Chiang  50.1 x 7.3 x 18.0   (keel 2.3 m, pole top 15.7 m)
     Chin Chiang  61.4 x 9.5 x 22.2   (keel 2.7 m, mast top 19.5 m)
     Tuo Chiang   60.4 x 14.0 x 20.9  (draught 2.3 m as published, pole top 18.6 m)
     Hai Shih     93.6 x 8.3 x 17.7   (keel 4.3 m per [S3], chin dome to 5.1 m, whip top 12.6 m)
     Hai Lung     66.9 x 8.4 x 13.2   (draught 6.7 m as published, fin top 6.5 m)
   No height was fitted: each comes from the photographs at the scale the published length gives.

   NOT CONFIRMED (drawn plainly, or as noted):
     - Hai Ou: no side-on photograph; the freeboard rise to 2.3 m at the stem, the house length and
       roof height (2.45 m over the deck), the mast height (head 7.2 m) and the launcher length (4.6 m)
       are from the two quarter / stern views scaled by the 5.5 m transom, so they are estimates. The
       underwater body (two shafts, rudders) is a Dvora's in outline, never photographed.
     - Kuang Hua VI: the training of the four canister boxes (drawn fore-and-aft, 5 deg up); what is
       under the transom (nothing drawn).
     - Lung Chiang / Chin Chiang: house half-widths (2.75 / 3.6 m) are from the bow views only; shafts,
       screws and rudders (two each, drawn plainly); the exact count of canisters per rack.
     - Chin Chiang era: the e90 row is the 1990s ship. [C2] (2010) shows no after radar tower, so the
       dome tower that [C1] (2019) shows abaft the racks is NOT drawn. The racks are drawn as [C1]
       photographs them; the original Hsiung Feng I fit is not photographed.
     - Tuo Chiang: the canister banks in the well (count and training), the wet-deck height (3.0 m),
       the demi-hull width (3.4 m) and bow rake; the two-tone zig-zag paint is NOT drawn (no camouflage
       patterns): plain light grey topsides over a plain darker demi-hull band.
     - Hai Shih: casing width (3.6 m) and sail width (3.0 m) from [S2]'s angle only; screw size and
       stern-plane span from the model; draught 4.3 m off the model against the published 5.2 m max.
     - Hai Lung: fin plane span and chord; the underwater colour (black as the rest; no photograph);
       masts are drawn housed, as [Z1] shows. sub_specs.js calls the tail an X; every reference shows
       a cruciform tail, so a cruciform is drawn.
   No hull numbers, names, flags, ensigns or deck lettering anywhere.

   PAINT (sampled, taken to about 0.8 of the sunlit value): ROC haze grey -- Hai Ou 0x9a9e9d, Lung
   Chiang 0xa2a5a3, Chin Chiang 0x8f9597 (the 2019 darker grey), KH6 0x9da2a5 over a 0x80868a band,
   Tuo Chiang 0xa6aaad over 0x62686c; red-brown anti-fouling under the monohulls; the submarines black
   (0x1d1f21 Hai Shih with red-brown below the water [S3]; 0x232629 Hai Lung all over). Team colour:
   two small strips per hull on up-facing roofs or decks.

   NODES: the three corvette rows are turret:true, and the gun on the forecastle is the group named
   "turret" (origin on its ring, gun along +X): the 76 mm (Lung Chiang, Tuo Chiang), the 40 mm (Chin
   Chiang). Tuo Chiang also carries a hidden "helipad" node over the middle of its stern deck. The
   missile boats and submarines are not turret:true and have no named nodes.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0 (the submarines at their surfaced trim);
   everything else baked, one mesh per material. ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRocShips2 = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI;

  /* ------------------------------------------------------------ geometry kit (the ru_osa_boat.js kit) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function tbl(T, d) {
    if (d <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (d <= T[i][0]) {
      var t = (d - T[i - 1][0]) / ((T[i][0] - T[i - 1][0]) || 1);
      return lerp(T[i - 1][1], T[i][1], t);
    }
    return T[T.length - 1][1];
  }

  /* a bin per material; box-mapped metre UVs (textures repeat every 16 m) */
  var UVS = 1 / 16;
  function Bin(mat) { this.mat = mat; this.P = []; this.N = []; this.U = []; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f], i, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      this.P.push(v[i][0], v[i][1], v[i][2]); this.N.push(n[i][0], n[i][1], n[i][2]);
      if (az >= ax && az >= ay) this.U.push(v[i][0] * UVS, v[i][1] * UVS);
      else if (ay >= ax) this.U.push(v[i][0] * UVS, v[i][2] * UVS);
      else this.U.push(v[i][1] * UVS, v[i][2] * UVS);
    }
  };
  function okTri(bin, a, b, c) {
    var cc = cross(sub(b, a), sub(c, a));
    if (dot(cc, cc) > 1e-12) bin.tri(a, b, c);
  }
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      var cc = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function cyl(bin, A, B, r0, r1, seg) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    base = V.length; na = [-ax[0], -ax[1], -ax[2]];
    V.push(A, B); N.push(na, ax);
    rA = base + 2; rB = base + 2 + seg;
    for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
    for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    solid(bin, V, F, N);
  }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  /* loft through rings of equal point count, flat-capped */
  function loft(bin, rings, noCap) {
    var n = rings[0].length, V = [], F = [], k, r, a, b, c0, c1, Lr;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    if (!noCap) {
      for (k = 1; k + 1 < n; k++) F.push([0, k + 1, k]);
      Lr = (rings.length - 1) * n;
      for (k = 1; k + 1 < n; k++) F.push([Lr, Lr + k, Lr + k + 1]);
    }
    var vol = 0, i, f;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      var p = V[f[0]], q = vol < 0 ? V[f[2]] : V[f[1]], s2 = vol < 0 ? V[f[1]] : V[f[2]];
      var cc = cross(sub(q, p), sub(s2, p));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(p, q, s2);
    }
  }
  /* ellipsoid with smooth normals; lo..hi latitude (radians), centre C, radii rx ry rz */
  function ellipsoid(bin, C, rx, ry, rz, rings, seg, lo, hi) {
    var i, k, R = [], NR = [], a0 = lo === undefined ? -PI / 2 : lo, a1 = hi === undefined ? PI / 2 : hi;
    for (i = 0; i <= rings; i++) {
      var a = a0 + (a1 - a0) * i / rings, ca = Math.cos(a), sa = Math.sin(a), ring = [], nr = [];
      for (k = 0; k < seg; k++) {
        var t = k / seg * TAU, ct = Math.cos(t), st = Math.sin(t);
        ring.push([C[0] + rx * ca * ct, C[1] + ry * ca * st, C[2] + rz * sa]);
        nr.push(unit([ca * ct / rx, ca * st / ry, sa / rz]));
      }
      R.push(ring); NR.push(nr);
    }
    for (i = 0; i + 1 < R.length; i++) for (k = 0; k < seg; k++) {
      var j = (k + 1) % seg, A = R[i][k], B = R[i][j], C2 = R[i + 1][j], D2 = R[i + 1][k];
      var c1 = cross(sub(B, A), sub(C2, A));
      if (dot(c1, c1) > 1e-12) bin.tri(A, B, C2, NR[i][k], NR[i][j], NR[i + 1][j]);
      var c2 = cross(sub(C2, A), sub(D2, A));
      if (dot(c2, c2) > 1e-12) bin.tri(A, C2, D2, NR[i][k], NR[i + 1][j], NR[i + 1][k]);
    }
    if (a0 > -PI / 2 + 1e-3) {                      /* flat bottom cap */
      var zb = R[0][0][2], cb = [C[0], C[1], zb];
      for (k = 0; k < seg; k++) bin.tri(cb, R[0][(k + 1) % seg], R[0][k], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
    }
  }
  /* box in an oriented frame: origin P, axes u (along), v (across), w (up-ish) */
  function obox(bin, P, u, v, w, a0, a1, b0, b1, c0, c1) {
    var V = [], A = [a0, a1], Bq = [b0, b1], Cq = [c0, c1], i, j, o = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    for (i = 0; i < 8; i++) {
      j = o[i];
      V.push([P[0] + u[0] * A[j[0]] + v[0] * Bq[j[1]] + w[0] * Cq[j[2]],
              P[1] + u[1] * A[j[0]] + v[1] * Bq[j[1]] + w[1] * Cq[j[2]],
              P[2] + u[2] * A[j[0]] + v[2] * Bq[j[1]] + w[2] * Cq[j[2]]]);
    }
    hexa(bin, V);
  }
  /* a prism: plan polygon (x, y) pairs, extruded z0..z1, optional top inset k (tumblehome, metres) */
  function prism(bin, pts, z0, z1, k) {
    var n = pts.length, cx = 0, cy = 0, i, r0 = [], r1 = [];
    for (i = 0; i < n; i++) { cx += pts[i][0] / n; cy += pts[i][1] / n; }
    for (i = 0; i < n; i++) {
      var p = pts[i], dx = p[0] - cx, dy = p[1] - cy, l = Math.sqrt(dx * dx + dy * dy) || 1, kk = k || 0;
      r0.push([p[0], p[1], z0]); r1.push([p[0] - dx / l * kk, p[1] - dy / l * kk, z1]);
    }
    loft(bin, [r0, r1]);
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      var me = new THREE.Mesh(geo, b.mat); me.castShadow = true; me.receiveShadow = true;
      group.add(me);
    }
  }

  /* ------------------------------------------------------------ canvas paint (the ru_osa_boat.js kit) */
  var TEX = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (TEX[key]) return TEX[key];
    if (typeof document === "undefined" || !document.createElement) return null;
    var cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
    var g = cv.getContext && cv.getContext("2d");
    if (!g) return null;
    draw(g, 512);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    TEX[key] = t;
    return t;
  }
  /* plating, 16 m square: strakes every 1 m, butts every 2.5 m staggered, light weathering and streaks */
  function drawPlate(g, S) {
    var R = rng(581), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#8a949a" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 3) * m, (0.3 + R() * 1.0) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 16; k++) {
      var y = Math.round(k * m);
      g.fillStyle = "rgba(70,80,86,0.2)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.22)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 7; i++) { var x = Math.round(((i * 2.5 + (k % 2) * 1.25) % 16) * m); g.fillStyle = "rgba(70,80,86,0.16)"; g.fillRect(x, y, 1.5, m); }
    }
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.2) * m);
    }
    /* the detail pass: frame lines every 0.5 m shown faintly through the paint (welding distortion), rust
       runs from fittings, and grime collecting in the lowest metre of every tile (side faces map z to v, so
       the bottom rows lie along the waterline and the foot of every house) */
    for (i = 0; i < 32; i++) { g.fillStyle = "rgba(60,66,70,0.07)"; g.fillRect(Math.round(i * 0.5 * m), 0, 1, S); }
    for (i = 0; i < 70; i++) {
      var rx = R() * S, ry = R() * S, rl = (0.3 + R() * 1.6) * m;
      g.globalAlpha = 0.05 + R() * 0.09; g.fillStyle = R() < 0.5 ? "#6b4a36" : "#4a4440";
      g.fillRect(rx, ry, 1 + R() * 2, rl);
      g.globalAlpha *= 0.5; g.fillRect(rx - 1, ry, 4, rl * 0.4);
    }
    var gr = g.createLinearGradient ? g.createLinearGradient(0, S - 1.2 * m, 0, S) : null;
    if (gr) { gr.addColorStop(0, "rgba(40,44,40,0)"); gr.addColorStop(1, "rgba(40,44,40,0.22)"); g.globalAlpha = 1; g.fillStyle = gr; g.fillRect(0, S - 1.2 * m, S, 1.2 * m); }
    for (i = 0; i < 160; i++) { g.globalAlpha = 0.04 + R() * 0.06; g.fillStyle = R() < 0.6 ? "#3e4446" : "#d8dcdc"; g.fillRect(R() * S, R() * S, 1 + R() * 3, 1 + R() * 3); }
    g.globalAlpha = 1;
  }
  /* deck: painted plate, seams every 1.5 x 2 m, scuffed walkways */
  function drawDeck(g, S) {
    var R = rng(6021), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(30,30,30,0.26)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
    for (i = 0; i < 40; i++) { g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = "#ffffff"; g.fillRect(R() * S, R() * S, (0.5 + R()) * m, 0.3 * m); }
    /* non-skid grit, oil and boot stains */
    for (i = 0; i < 1800; i++) { g.globalAlpha = 0.1 + R() * 0.12; g.fillStyle = R() < 0.7 ? "#000000" : "#ffffff"; g.fillRect(R() * S, R() * S, 1.5, 1.5); }
    for (i = 0; i < 22; i++) { g.globalAlpha = 0.04 + R() * 0.06; g.fillStyle = "#2a2622"; g.beginPath && g.arc ? (g.beginPath(), g.arc(R() * S, R() * S, (0.2 + R() * 0.6) * m, 0, 6.283), g.fill()) : g.fillRect(R() * S, R() * S, 0.6 * m, 0.6 * m); }
    g.globalAlpha = 1;
  }
  /* materials from a palette: hull (topsides and houses), band (lower topsides where the boat has one), deck,
     boot (under the waterline), dark (recesses, doors, slots), metal (rails, barrels, poles, screws), glass,
     light (launchers, domes), team (C.team exactly as handed in) */
  function materials(THREE, C, P) {
    var plate = canvasTex(THREE, "rs2plate", drawPlate), deckT = canvasTex(THREE, "rs2deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(P.hull, P.rough || 0.8, 0.08, plate),
      band: mk(P.band === undefined ? P.hull : P.band, P.rough || 0.8, 0.08, plate),
      deck: mk(P.deck, 0.92, 0.04, deckT),
      boot: mk(P.boot, 0.86, 0.04),
      dark: mk(P.dark || 0x23282b, 0.75, 0.3),
      metal: mk(P.metal || 0x50575c, 0.5, 0.55),
      glass: mk(0x141c22, 0.15, 0.4),
      light: mk(P.light === undefined ? P.hull : P.light, 0.78, 0.08, plate),
      btop: mk(P.btop || 0x1c1e20, 0.85, 0.05, plate),            /* the boot-topping line at the waterline */
      white: mk(P.white || 0xd8dbd8, 0.7, 0.05, plate),           /* life-raft canisters, the boats */
      ring: mk(0xc8582e, 0.7, 0.04),                              /* life rings */
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }
  var BIN_NAMES = ["hull", "band", "deck", "boot", "btop", "dark", "metal", "glass", "light", "white", "ring", "team"];
  function bins(T) { var B = {}; BIN_NAMES.forEach(function (n) { B[n] = new Bin(T[n]); }); return B; }
  /* a trained mount: its own bins, flushed into a group named "turret" at P, gun along local +X */
  function turretGroup(THREE, T, P, draw) {
    var tg = new THREE.Group(), TB = bins(T);
    tg.name = "turret";
    draw(TB);
    flush(THREE, tg, TB);
    tg.position.set(P[0], P[1], P[2]);
    return tg;
  }

  /* ------------------------------------------------------------ a hard-chine monohull from station tables
     (the ru_osa_boat.js hull, generalised).  H: L, ZD deck edge z, HD deck half-breadth, CH / CZ chine
     half-breadth and z, KZ keel / stem z, all against d = metres forward of the transom; ds the stations;
     flare(d) 0..1 how far the topside bulges out between deck and chine; bandZ (optional) the z under which
     the topside takes the band colour. */
  function hullFns(H) {
    H.X = function (d) { return d - H.L / 2; };
    H.zD = function (d) { return tbl(H.ZD, d); };
    H.hD = function (d) { return tbl(H.HD, d); };
    return H;
  }
  function halfSec(H, d) {
    var zd = H.zD(d), hd = H.hD(d), hc = tbl(H.CH, d), zc = tbl(H.CZ, d), kz = tbl(H.KZ, d);
    if (zc < kz + 0.02) zc = kz + 0.02;
    if (zc > zd - 0.03) zc = zd - 0.03;
    var fl = H.flare ? H.flare(d) : 0;
    var P = [[hd, zd], [lerp(hc, hd, 0.5) + fl, lerp(zc, zd, 0.5)], [hc, zc],
             [hc * 0.55, lerp(kz, zc, 0.52) - 0.08 * Math.min(1, hc / 3)], [0.0, kz]];
    var out = [], i, bt = H.bt === undefined ? 0.28 : H.bt, cuts = [bt, 0], c;
    for (i = 0; i < P.length; i++) {
      out.push(P[i]);
      for (c = 0; c < 2; c++) {
        var zc2 = cuts[c];
        if (i + 1 < P.length && P[i][1] > zc2 && P[i + 1][1] <= zc2 && out.length < NSEC) {
          var t = (P[i][1] - zc2) / (P[i][1] - P[i + 1][1]);
          out.push([lerp(P[i][0], P[i + 1][0], t), zc2]);
        }
      }
    }
    while (out.length < NSEC) out.push(out[out.length - 1].slice());
    return out;
  }
  var NSEC = 8;
  /* the hull's half-breadth at height z on station d (for fittings that sit on the shell) */
  function sideY(H, d, z) {
    var P = halfSec(H, d), i;
    if (z >= P[0][1]) return P[0][0];
    for (i = 0; i + 1 < P.length; i++) if (z <= P[i][1] && z >= P[i + 1][1] && P[i][1] - P[i + 1][1] > 1e-6)
      return lerp(P[i][0], P[i + 1][0], (P[i][1] - z) / (P[i][1] - P[i + 1][1]));
    return P[P.length - 1][0];
  }
  function monoHull(B, H) {
    var ds = H.ds, i, k, s, X = H.X;
    var Hs = ds.map(function (d) { return halfSec(H, d); });
    function pick(a, b, c, d) {
      var z = (a[2] + b[2] + c[2]) / 3;
      if (z < -0.005) return B.boot;
      if (z < (H.bt === undefined ? 0.28 : H.bt) - 0.005) return B.btop;
      if (H.bandZ && z < H.bandZ(d)) return B.band;
      return B.hull;
    }
    for (i = 0; i + 1 < ds.length; i++) {
      var xa = X(ds[i]), xb = X(ds[i + 1]), A = Hs[i], Bq = Hs[i + 1], dm = (ds[i] + ds[i + 1]) / 2;
      for (s = -1; s <= 1; s += 2) for (k = 0; k + 1 < NSEC; k++) {
        var p = [xa, s * A[k][0], A[k][1]], q = [xa, s * A[k + 1][0], A[k + 1][1]],
            r = [xb, s * Bq[k + 1][0], Bq[k + 1][1]], t = [xb, s * Bq[k][0], Bq[k][1]];
        var tris = s > 0 ? [[p, r, q], [p, t, r]] : [[p, q, r], [p, r, t]];
        tris.forEach(function (T) { okTri(pick(T[0], T[1], T[2], dm), T[0], T[1], T[2]); });
      }
      var cA = H.zD(ds[i]) + 0.08 * Math.min(1, A[0][0] / 2), cB = H.zD(ds[i + 1]) + 0.08 * Math.min(1, Bq[0][0] / 2);
      for (s = -1; s <= 1; s += 2) {
        var e0 = [xa, s * A[0][0], A[0][1]], e1 = [xb, s * Bq[0][0], Bq[0][1]], m0 = [xa, 0, cA], m1 = [xb, 0, cB];
        var D = s > 0 ? [[e0, m1, e1], [e0, m0, m1]] : [[e0, e1, m1], [e0, m1, m0]];
        D.forEach(function (T) { okTri(B.deck, T[0], T[1], T[2]); });
      }
    }
    /* the transom: a fan per material from the centre line */
    var T0 = Hs[0], x0 = X(ds[0]), s2;
    for (s2 = -1; s2 <= 1; s2 += 2) for (k = 0; k + 1 < NSEC; k++) {
      var a = [x0, s2 * T0[k][0], T0[k][1]], b = [x0, s2 * T0[k + 1][0], T0[k + 1][1]];
      var zm = (T0[k][1] + T0[k + 1][1]) / 2;
      var c = [x0, 0, zm > 0 ? H.zD(ds[0]) : T0[NSEC - 1][1]];
      if (T0[k][1] > 0.001 && T0[k + 1][1] < -0.001) c = [x0, 0, 0];
      var cc = cross(sub(b, a), sub(c, a));
      if (dot(cc, cc) < 1e-12) continue;
      var bn = zm < -0.005 ? B.boot : B.hull;
      if (cc[0] < 0) bn.tri(a, b, c); else bn.tri(a, c, b);
    }
    var tq = [[x0, T0[0][0], T0[0][1]], [x0, -T0[0][0], T0[0][1]], [x0, 0, 0]];
    var cq = cross(sub(tq[1], tq[0]), sub(tq[2], tq[0]));
    if (cq[0] < 0) B.hull.tri(tq[0], tq[1], tq[2]); else B.hull.tri(tq[0], tq[2], tq[1]);
    /* the detail pass: the toe rail standing on the deck edge, the dark waterway (gutter) inside it, and the
       rubbing strake a little under the deck edge */
    for (s = -1; s <= 1; s += 2) {
      var tr = [], gw = [], rs = [];
      for (i = 0; i < ds.length; i++) {
        var d = Math.min(ds[i], H.L - 0.35), P = halfSec(H, d), y = s * P[0][0], z = P[0][1], yr = s * sideY(H, d, z - 0.35);
        if (P[0][0] < 0.35) continue;
        tr.push([[X(d), y - s * 0.06, z - 0.02], [X(d), y + s * 0.005, z - 0.02], [X(d), y + s * 0.005, z + 0.1], [X(d), y - s * 0.06, z + 0.1]]);
        gw.push([[X(d), y - s * 0.3, z + 0.005], [X(d), y - s * 0.06, z + 0.005], [X(d), y - s * 0.06, z + 0.035], [X(d), y - s * 0.3, z + 0.035]]);
        rs.push([[X(d), yr - s * 0.02, z - 0.43], [X(d), yr + s * 0.07, z - 0.41], [X(d), yr + s * 0.07, z - 0.31], [X(d), yr - s * 0.02, z - 0.29]]);
      }
      if (tr.length > 1) { loft(B.hull, tr); loft(B.dark, gw); if (!H.noStrake) loft(B.hull, rs); }
    }
  }
  /* lifelines: stanchions about every 1.4 m inside the deck edge, two wires */
  function rails(B, H, da, db, inset, h) {
    var s, d, hh = h || 0.9, X = H.X;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.4) {
        var dn = Math.min(d + 1.4, db), y0 = s * Math.max(0.3, H.hD(d) - inset), y1 = s * Math.max(0.3, H.hD(dn) - inset);
        cyl(B.metal, [X(d), y0, H.zD(d) + hh], [X(dn), y1, H.zD(dn) + hh], 0.02, 0.02, 4);
        cyl(B.metal, [X(d), y0, H.zD(d) + hh * 0.5], [X(dn), y1, H.zD(dn) + hh * 0.5], 0.014, 0.014, 3);
        box(B.metal, X(d) - 0.025, X(d) + 0.025, y0 - 0.025, y0 + 0.025, H.zD(d), H.zD(d) + hh);
      }
    }
  }
  /* a deckhouse: plan half-width hw at the foot, tumblehome tk at the roof (m), d0..d1 aft..fore, foot z0
     (number or fn(d)), roof z1; the fore face raked back by rk (m) at the roof, the after face by ra. */
  function house(bin, H, d0, d1, hw, z0, z1, tk, rk, ra) {
    var X = H.X, zf = typeof z0 === "function" ? z0 : function () { return z0; }, t = tk || 0, r1 = rk || 0, r0 = ra || 0;
    var V = [[X(d0), -hw, zf(d0) - 0.05], [X(d1), -hw, zf(d1) - 0.05], [X(d1), hw, zf(d1) - 0.05], [X(d0), hw, zf(d0) - 0.05],
             [X(d0 + r0), -hw + t, z1], [X(d1 - r1), -hw + t, z1], [X(d1 - r1), hw - t, z1], [X(d0 + r0), hw - t, z1]];
    hexa(bin, V);
  }
  /* a square lattice tower: centre (xc, yc), legs a0 (foot) to a1 (head) from the centre, z0..z1, n bays */
  function lattice(bin, xc, yc, z0, z1, ax0, ay0, ax1, ay1, n, r) {
    var lg, bay, sgn, rr = r || 0.04;
    for (lg = 0; lg < 4; lg++) {
      var sx = lg < 2 ? -1 : 1, sy = (lg % 2) ? -1 : 1;
      cyl(bin, [xc + sx * ax0, yc + sy * ay0, z0], [xc + sx * ax1, yc + sy * ay1, z1], rr, rr, 4);
    }
    for (bay = 0; bay < n; bay++) {
      var f0 = bay / n, f1 = (bay + 1) / n, qx0 = lerp(ax0, ax1, f0), qx1 = lerp(ax0, ax1, f1), qy0 = lerp(ay0, ay1, f0), qy1 = lerp(ay0, ay1, f1);
      var zz0 = lerp(z0, z1, f0), zz1 = lerp(z0, z1, f1);
      for (sgn = -1; sgn <= 1; sgn += 2) {
        cyl(bin, [xc - qx0, yc + sgn * qy0, zz0], [xc + qx1, yc + sgn * qy1, zz1], rr * 0.6, rr * 0.6, 3);
        cyl(bin, [xc + sgn * qx0, yc - qy0, zz0], [xc + sgn * qx1, yc + qy1, zz1], rr * 0.6, rr * 0.6, 3);
        cyl(bin, [xc - qx1, yc + sgn * qy1, zz1], [xc + qx1, yc + sgn * qy1, zz1], rr * 0.6, rr * 0.6, 3);
        cyl(bin, [xc + sgn * qx1, yc - qy1, zz1], [xc + sgn * qx1, yc + qy1, zz1], rr * 0.6, rr * 0.6, 3);
      }
    }
  }
  /* an inclined box launcher: after end centre A on the deck side, length len, half-width w, height h,
     elevation el (rad) toward heading hd (rad, 0 = ahead); an end plate in dark at the mouth */
  function boxLauncher(B, bin, A, len, w, h, el, hd) {
    var u = [Math.cos(el) * Math.cos(hd), Math.cos(el) * Math.sin(hd), Math.sin(el)];
    var v = [-Math.sin(hd), Math.cos(hd), 0], wv = cross(u, v);
    obox(bin, A, u, v, wv, 0, len, -w, w, 0, h);
    obox(B.dark, A, u, v, wv, len - 0.02, len + 0.02, -w * 0.85, w * 0.85, h * 0.1, h * 0.9);
    /* the detail pass: the end frames and a mid frame standing proud, the blow-out cover's rim, the cable run */
    [0.06, len * 0.5, len - 0.08].forEach(function (a) { obox(bin, A, u, v, wv, a - 0.05, a + 0.05, -w - 0.03, w + 0.03, -0.03, h + 0.03); });
    obox(B.metal, A, u, v, wv, len + 0.02, len + 0.05, -w * 0.9, w * 0.9, h * 0.06, h * 0.12);
    obox(B.metal, A, u, v, wv, len * 0.15, len * 0.85, -0.06, 0.06, h + 0.03, h + 0.08);
  }

  /* ------------------------------------------------------------ deck fittings (the detail pass, 2026-11-12)
     Small fittings the profile drawings leave out but every photograph shows: stanchion rails round the
     house roofs and platforms, bitts, fairleads, hatches, mushroom vents, ladders, raft canisters, life
     rings, the anchor in its hawse, the scuttles.  All merged into the boat's bins. */
  /* stanchions about every step m along a polyline of foot points, two wires (top and middle) */
  function railLine(bin, pts, h, step) {
    var st = step || 1.3, i, k, hh = h || 0.9;
    for (i = 0; i + 1 < pts.length; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.sqrt(dot(sub(b, a), sub(b, a))), n = Math.max(1, Math.round(L / st));
      for (k = i ? 1 : 0; k <= n; k++) {
        var t = k / n, x = lerp(a[0], b[0], t), y = lerp(a[1], b[1], t), z = lerp(a[2], b[2], t);
        box(bin, x - 0.022, x + 0.022, y - 0.022, y + 0.022, z, z + hh);
      }
      cyl(bin, [a[0], a[1], a[2] + hh], [b[0], b[1], b[2] + hh], 0.02, 0.02, 3);
      cyl(bin, [a[0], a[1], a[2] + hh * 0.5], [b[0], b[1], b[2] + hh * 0.5], 0.013, 0.013, 3);
    }
  }
  /* rails round a flat roof x0..x1 (model x), half width hw, at z; open (no rail) on the side given by gap
     ("f" the fore edge, "a" the after edge) */
  function roofRail(bin, x0, x1, hw, z, h, gap) {
    var P = [[x0, -hw, z], [x1, -hw, z], [x1, hw, z], [x0, hw, z]];
    if (gap === "f") railLine(bin, [P[1], P[0], P[3], P[2]], h);
    else if (gap === "a") railLine(bin, [P[0], P[1], P[2], P[3]], h);
    else railLine(bin, [P[0], P[1], P[2], P[3], P[0]], h);
  }
  /* a pair of bitts on a base plate, along X */
  function bitts(bin, x, y, z, r) {
    var rr = r || 0.09;
    box(bin, x - 0.36 * rr / 0.09, x + 0.36 * rr / 0.09, y - 0.13, y + 0.13, z - 0.02, z + 0.05);
    for (var k = -1; k <= 1; k += 2) {
      cylZ(bin, x + k * 0.2 * rr / 0.09, y, z, z + 3.6 * rr, rr, 8);
      cylZ(bin, x + k * 0.2 * rr / 0.09, y, z + 3.6 * rr, z + 3.6 * rr + 0.04, rr * 1.35, 8);
    }
  }
  /* an open fairlead (chock) on the toe rail at the deck edge: two horns and a roller */
  function fairlead(bin, x, y, z, s) {
    box(bin, x - 0.26, x + 0.26, y - s * 0.16, y, z - 0.02, z + 0.06);
    for (var k = -1; k <= 1; k += 2) box(bin, x + k * 0.2 - 0.05, x + k * 0.2 + 0.05, y - s * 0.14, y - s * 0.02, z, z + 0.24);
    cyl(bin, [x - 0.15, y - s * 0.08, z + 0.1], [x + 0.15, y - s * 0.08, z + 0.1], 0.05, 0.05, 6);
  }
  /* a hatch: the coaming, the lid a shade lower inside it, the hinge bar and a handwheel */
  function hatch(B, x, y, z, lx, ly, round) {
    if (round) {
      cylZ(B.hull, x, y, z - 0.02, z + 0.12, lx / 2, 14);
      cylZ(B.metal, x, y, z + 0.12, z + 0.16, lx / 2 - 0.05, 14);
      cylZ(B.metal, x, y, z + 0.16, z + 0.22, 0.04, 5);
      cyl(B.metal, [x - 0.15, y, z + 0.22], [x + 0.15, y, z + 0.22], 0.02, 0.02, 3);
      return;
    }
    box(B.hull, x - lx / 2, x + lx / 2, y - ly / 2, y + ly / 2, z - 0.02, z + 0.14);
    box(B.metal, x - lx / 2 + 0.05, x + lx / 2 - 0.05, y - ly / 2 + 0.05, y + ly / 2 - 0.05, z + 0.14, z + 0.17);
    cyl(B.dark, [x - lx / 2 + 0.02, y - ly / 2 + 0.08, z + 0.16], [x - lx / 2 + 0.02, y + ly / 2 - 0.08, z + 0.16], 0.03, 0.03, 4);
    cylZ(B.metal, x + lx * 0.15, y, z + 0.17, z + 0.24, 0.03, 4);
    cyl(B.metal, [x + lx * 0.15, y - 0.12, z + 0.24], [x + lx * 0.15, y + 0.12, z + 0.24], 0.018, 0.018, 3);
  }
  /* a mushroom vent: the trunk and its cap */
  function vent(bin, x, y, z, r, h) {
    cylZ(bin, x, y, z - 0.02, z + h, r * 0.6, 8);
    cyl(bin, [x, y, z + h], [x, y, z + h + r * 0.45], r, r * 0.7, 10);
  }
  /* a gooseneck / cowl vent opening toward f (+1 ahead, -1 astern) */
  function cowl(B, x, y, z, r, h, f) {
    cylZ(B.hull, x, y, z - 0.02, z + h, r, 8);
    cyl(B.hull, [x, y, z + h], [x + f * r * 1.2, y, z + h + r * 1.1], r, r * 1.15, 8);
    cyl(B.dark, [x + f * r * 1.15, y, z + h + r * 1.05], [x + f * r * 1.25, y, z + h + r * 1.15], r * 1.0, r * 1.0, 8);
  }
  /* a vertical or inclined ladder from foot A to head Bp, w wide across Y (or across X if ax) */
  function ladder(bin, A, Bp, w, ax) {
    var o = ax ? [w / 2, 0, 0] : [0, w / 2, 0], k, L = Math.abs(Bp[2] - A[2]), n = Math.max(2, Math.round(L / 0.3));
    for (k = -1; k <= 1; k += 2) cyl(bin, [A[0] + k * o[0], A[1] + k * o[1], A[2]], [Bp[0] + k * o[0], Bp[1] + k * o[1], Bp[2]], 0.02, 0.02, 3);
    for (k = 1; k < n; k++) {
      var t = k / n, c = [lerp(A[0], Bp[0], t), lerp(A[1], Bp[1], t), lerp(A[2], Bp[2], t)];
      cyl(bin, [c[0] - o[0], c[1] - o[1], c[2]], [c[0] + o[0], c[1] + o[1], c[2]], 0.014, 0.014, 3);
    }
  }
  /* a life-raft canister on its cradle, axis along X (or Y if ay), centre x,y, cradle foot z */
  function raft(B, x, y, z, ay, r) {
    var rr = r || 0.3, L = rr * 3.4, a = ay ? [0, L / 2, 0] : [L / 2, 0, 0], k;
    box(B.metal, x - (ay ? rr : L * 0.4), x + (ay ? rr : L * 0.4), y - (ay ? L * 0.4 : rr), y + (ay ? L * 0.4 : rr), z, z + 0.1);
    cyl(B.white, [x - a[0], y - a[1], z + 0.12 + rr], [x + a[0], y + a[1], z + 0.12 + rr], rr, rr, 10);
    for (k = -1; k <= 1; k += 2) {
      var c = [x + k * a[0] * 0.55, y + k * a[1] * 0.55, z + 0.12 + rr];
      cyl(B.metal, [c[0] - a[0] * 0.04, c[1] - a[1] * 0.04, c[2]], [c[0] + a[0] * 0.04, c[1] + a[1] * 0.04, c[2]], rr * 1.06, rr * 1.06, 10);
    }
  }
  /* a life ring hung flat on a vertical face at (x, y), facing s (+1 port, -1 starboard) */
  function lifeRing(bin, x, y, z, s, R) {
    var r = R || 0.32, k, n = 10;
    for (k = 0; k < n; k++) {
      var a0 = k / n * TAU, a1 = (k + 1) / n * TAU;
      cyl(bin, [x + Math.cos(a0) * r, y + s * 0.05, z + Math.sin(a0) * r], [x + Math.cos(a1) * r, y + s * 0.05, z + Math.sin(a1) * r], 0.055, 0.055, 4);
    }
  }
  /* round scuttles along a hull side: on station d, at height z, a dark glass disc and its rim */
  function scuttle(B, H, d, z, s, r) {
    var y = s * sideY(H, d, z), x = H.X(d), rr = r || 0.17;
    cyl(B.metal, [x, y - s * 0.01, z], [x, y + s * 0.035, z], rr * 1.25, rr * 1.25, 8);
    cyl(B.glass, [x, y + s * 0.03, z], [x, y + s * 0.045, z], rr, rr, 8);
  }
  /* the anchor stowed in its hawse on the bow flank at station d: the hawse pipe, the shank lying down the
     shell, the crown and flukes; the chain pipe and its cover on the deck inboard */
  function anchor(B, H, d, s, sz) {
    var k = sz || 1, x = H.X(d), zt = H.zD(d) - 0.25 * k, zb = zt - 0.9 * k, yt = s * (sideY(H, d, zt) + 0.06), yb = s * (sideY(H, d, zb) + 0.08);
    cyl(B.dark, [x, yt - s * 0.08, zt], [x, yt + s * 0.02, zt], 0.2 * k, 0.24 * k, 10);
    cyl(B.metal, [x, yt, zt], [x - 0.05, yb, zb], 0.06 * k, 0.06 * k, 5);
    box(B.metal, x - 0.45 * k, x + 0.4 * k, Math.min(yb, yb + s * 0.12) - 0.01, Math.max(yb, yb + s * 0.12) + 0.01, zb - 0.12 * k, zb + 0.06 * k);
    for (var j = -1; j <= 1; j += 2) obox(B.metal, [x + j * 0.35 * k, yb + s * 0.05, zb], [j * 0.5, 0, 0.86], [0, 1, 0], [-0.86, 0, j * 0.5], 0, 0.45 * k, -0.06, 0.06, -0.08, 0.08);
    var yd = s * (H.hD(d) - 0.55);
    cyl(B.metal, [x - 0.3, yd, H.zD(d) - 0.02], [x - 0.3, yd, H.zD(d) + 0.16], 0.17 * k, 0.17 * k, 10);
    cyl(B.dark, [x - 0.3, yd, H.zD(d) + 0.16], [x - 0.3, yd, H.zD(d) + 0.18], 0.1 * k, 0.1 * k, 8);
  }
  /* a whip aerial on a short base, height h */
  function whip(B, x, y, z, h, lean) {
    cyl(B.metal, [x, y, z - 0.02], [x, y, z + 0.25], 0.07, 0.06, 6);
    cyl(B.metal, [x, y, z + 0.25], [x + (lean || 0), y, z + h], 0.03, 0.012, 4);
  }
  /* a searchlight on a short post */
  function searchlight(B, x, y, z, f) {
    cylZ(B.metal, x, y, z, z + 0.35, 0.05, 5);
    cyl(B.light, [x - f * 0.2, y, z + 0.5], [x + f * 0.2, y, z + 0.5], 0.2, 0.22, 10);
    cyl(B.glass, [x + f * 0.2, y, z + 0.5], [x + f * 0.22, y, z + 0.5], 0.18, 0.18, 10);
  }

  /* ------------------------------------------------------------ small guns */
  /* 20 mm on a pedestal (T-75 on KH6 [K4]; the Hai Ou mount [H1]): local frame, barrel along +X raised el */
  function gun20(B, x, y, z, f, el) {
    function P(a, b, c) { return [x + f * a, y + f * b, z + c]; }
    cyl(B.hull, P(0, 0, 0), P(0, 0, 0.75), 0.22, 0.16, 10);
    obox(B.hull, P(0, 0, 0.75), [f, 0, 0], [0, f, 0], [0, 0, 1], -0.35, 0.3, -0.28, 0.28, 0, 0.42);
    var ce = Math.cos(el), se = Math.sin(el);
    obox(B.metal, P(0.1, 0, 0.95), [f * ce, 0, se], [0, f, 0], [-f * se, 0, ce], -0.5, 0.45, -0.12, 0.12, -0.12, 0.14);
    cyl(B.metal, P(0.5 * ce, 0, 0.95 + 0.5 * se), P(1.9 * ce, 0, 0.95 + 1.9 * se), 0.04, 0.035, 6);
    obox(B.hull, P(0, 0, 0.75), [f, 0, 0], [0, f, 0], [0, 0, 1], -0.55, -0.45, -0.5, 0.5, 0.1, 0.75);   /* shield */
  }
  /* smooth gun cupola (OTO Melara 76 mm on Lung Chiang [L1]; 40 mm on Chin Chiang [C1]) built round the
     origin: radius r, height h, barrel length bl at elevation el; fwd = +X */
  function cupola(B, r, h, bl, el, br) {
    cylZ(B.hull, 0, 0, -0.25, 0.02, r * 0.9, 16);
    cyl(B.light, [0, 0, 0], [0, 0, h * 0.4], r, r, 18);
    ellipsoid(B.light, [0, 0, h * 0.4], r * 1.06, r, h * 0.6, 5, 18, 0, PI / 2);
    var ce = Math.cos(el), se = Math.sin(el), z0 = h * 0.42;
    obox(B.dark, [r * 0.85, 0, z0], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0, 0.3, -0.32, 0.32, -0.3, 0.42);
    cyl(B.metal, [r * 0.9, 0, z0], [r * 0.9 + bl * ce, 0, z0 + bl * se], br, br * 0.8, 8);
    cyl(B.metal, [r * 0.9 + bl * 0.55 * ce, 0, z0 + bl * 0.55 * se], [r * 0.9 + bl * 0.7 * ce, 0, z0 + bl * 0.7 * se], br * 1.7, br * 1.7, 8);
  }

  /* ============================================================ HAI OU (Dvora derivative) [H1][H2]
     d = metres forward of the transom; L 21.6. */
  var HO = hullFns({ L: 21.6,
    ZD: [[0, 1.55], [8, 1.6], [13, 1.7], [17, 1.95], [21.6, 2.3]],
    HD: [[0, 2.38], [2.5, 2.55], [6, 2.7], [12, 2.75], [15, 2.6], [17.5, 2.2], [19.5, 1.5], [20.8, 0.8], [21.6, 0.05]],
    CH: [[0, 2.22], [2.5, 2.4], [6, 2.56], [12, 2.6], [15, 2.4], [17.5, 1.95], [19.5, 1.2], [20.8, 0.55], [21.6, 0.02]],
    CZ: [[0, -0.15], [10, -0.2], [14, -0.05], [17, 0.3], [19.5, 0.8], [21, 1.5], [21.6, 2.3]],
    KZ: [[0, -0.8], [8, -0.95], [13, -1.0], [16, -0.85], [18.5, -0.4], [19.8, 0.1], [20.8, 0.9], [21.6, 2.3]],
    ds: [0, 0.6, 2, 4, 6, 8, 10, 12, 13.5, 15, 16, 17, 18, 18.8, 19.5, 20.1, 20.6, 21.0, 21.3, 21.6],
    flare: function (d) { return 0.04 + 0.06 * clamp((d - 14) / 6, 0, 1); }
  });
  function buildHaiOu(THREE, M, C) {
    var T = materials(THREE, C, { hull: 0x9a9e9d, deck: 0x6b6f70, boot: 0x4c2a24, light: 0xa6aaa8 });
    var g = new THREE.Group(), B = bins(T), X = HO.X, zD = HO.zD, s, k;
    monoHull(B, HO);
    /* wheelhouse forward of the mast [H1]: d 10.6 - 14.6, roof 2.45 m over the deck, raked front, side
       windows; its front screen and windows */
    house(B.hull, HO, 10.6, 14.6, 1.55, zD, 4.2, 0.12, 0.45, 0.05);
    for (k = -1; k <= 1; k++) box(B.glass, X(14.42) - 0.05, X(14.42) + 0.03, k * 0.5 - 0.2, k * 0.5 + 0.2, 3.45, 3.85);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 3; k++) box(B.glass, X(11.4 + k * 0.95) - 0.3, X(11.4 + k * 0.95) + 0.3, s * 1.49 - 0.03, s * 1.49 + 0.03, 3.4, 3.8);
      box(B.dark, X(10.9), X(11.55), s * 1.5 - 0.03, s * 1.5 + 0.03, zD(11) + 0.1, 3.1);
    }
    box(B.hull, X(10.7), X(13.8), -1.3, 1.3, 4.2, 4.28);
    /* lattice mast on the after end of the house [H1][H2]: four legs tapering to a head platform at 7.2 m, a
       wide yard on the way up, the round director on the head and the bar antenna over it */
    var xm = X(10.9);
    lattice(B.light, xm, 0, 4.2, 7.2, 0.62, 0.62, 0.32, 0.32, 3, 0.05);
    box(B.metal, xm - 0.05, xm + 0.05, -1.3, 1.3, 6.25, 6.32);
    box(B.deck, xm - 0.55, xm + 0.55, -0.55, 0.55, 7.15, 7.22);
    cylZ(B.light, xm, 0, 7.22, 7.45, 0.18, 10);
    ellipsoid(B.light, [xm, 0, 7.98], 0.58, 0.55, 0.55, 6, 14);
    cylZ(B.metal, xm, 0, 8.5, 8.75, 0.05, 6);
    box(B.light, xm - 0.12, xm + 0.12, -0.75, 0.75, 8.75, 8.9);
    /* the two Hsiung Feng I boxes side by side on the after deck [H1][H2]: after ends on short legs 0.55 m
       up, rising 12 deg toward the bow, 1.6 m wide, about 4.6 m long */
    for (s = -1; s <= 1; s += 2) {
      var yl = s * 1.25, A = [X(1.2), yl, zD(1.2) + 0.55];
      var u = [Math.cos(0.21), 0, Math.sin(0.21)], v = [0, 1, 0], w = cross(u, v);
      obox(B.light, A, u, v, w, 0, 4.6, -0.78, 0.78, -0.05, 1.25);
      ellipsoid(B.light, [A[0] + 4.5 * u[0] + 0.62 * w[0], yl, A[2] + 4.5 * u[2] + 0.62 * w[2]], 0.35, 0.74, 0.66, 4, 12, -PI / 2, PI / 2);
      obox(B.dark, A, u, v, w, -0.02, 0.02, -0.55, 0.55, 0.15, 1.0);           /* after door */
      for (k = 0; k < 4; k++) obox(B.light, A, u, v, w, 0.5 + k * 1.15 - 0.06, 0.5 + k * 1.15 + 0.06, -0.81, 0.81, -0.08, 1.28);   /* frames */
      obox(B.metal, A, u, v, w, 0.2, 4.2, -0.2, 0.2, 1.25, 1.3);                  /* the cable run on the roof */
      for (k = 0; k < 2; k++) cyl(B.metal, [X(1.6 + k * 2.6), yl, zD(1.6)], [X(1.6 + k * 2.6), yl, zD(1.6) + 0.55 + (0.5 + k * 2.6) * Math.tan(0.21)], 0.06, 0.06, 5);
    }
    /* 20 mm forward of the house, its barrel raised as photographed [H1] */
    gun20(B, X(16.4), 0, zD(16.4), 1, 1.1);
    rails(B, HO, 0.3, 10.4, 0.1, 0.8);
    rails(B, HO, 14.8, 20.6, 0.1, 0.8);
    /* fenders are not drawn (they hang only in harbour); a jack staff and the two shafts under the stern */
    cyl(B.metal, [X(21.3), 0, zD(21.3)], [X(21.3), 0, zD(21.3) + 1.0], 0.025, 0.02, 4);
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(5.5), s * 0.9, -0.95], [X(0.4), s * 0.9, -0.95], 0.05, 0.05, 6);
      cyl(B.metal, [X(0.5), s * 0.9, -0.95], [X(0.25), s * 0.9, -0.95], 0.28, 0.28, 10);
      box(B.metal, X(0.0), X(0.35), s * 0.9 - 0.04, s * 0.9 + 0.04, -1.25, -0.3);
    }
    /* the detail pass [H1][H2]: rails round the house roof, the ladder up its after face, life rings and a
       raft pair, whips at the roof's after corners and a searchlight, the bitts, fairleads and the anchors,
       the foredeck and after hatches, vents, a short row of scuttles under the house */
    roofRail(B.metal, X(10.75), X(13.9), 1.38, 4.28, 0.75, "f");
    roofRail(B.metal, xm - 0.55, xm + 0.55, 0.55, 7.22, 0.6);           /* the mast-head platform's rail */
    ladder(B.metal, [xm - 0.62, 0, 4.28], [xm - 0.36, 0, 7.15], 0.35);
    ladder(B.metal, [X(10.5), -0.9, zD(10.5)], [X(10.5), -0.9, 4.25], 0.4);
    raft(B, X(13.0), 0.7, 4.28, false, 0.24); raft(B, X(13.0), -0.7, 4.28, false, 0.24);
    searchlight(B, X(13.95), 0, 4.28, 1);
    for (s = -1; s <= 1; s += 2) {
      whip(B, X(10.9), s * 1.2, 4.28, 4.4, -0.3);
      lifeRing(B.ring, X(14.05), s * 1.42, 3.0, s, 0.3);
      bitts(B.metal, X(0.9), s * 1.75, zD(0.9), 0.07);
      bitts(B.metal, X(8.6), s * 2.25, zD(8.6), 0.07);
      bitts(B.metal, X(19.0), s * 0.85, zD(19.0), 0.07);
      fairlead(B.metal, X(0.5), s * (HO.hD(0.5) - 0.04), zD(0.5), s);
      fairlead(B.metal, X(19.6), s * (HO.hD(19.6) - 0.04), zD(19.6), s);
      anchor(B, HO, 19.9, s, 0.55);
      vent(B.hull, X(15.3), s * 1.05, zD(15.3), 0.16, 0.45);
      vent(B.hull, X(9.6), s * 1.4, zD(9.6), 0.14, 0.4);
      for (k = 0; k < 4; k++) scuttle(B, HO, 11.2 + k * 1.1, 0.95, s, 0.12);
    }
    hatch(B, X(8.0), 0, zD(8.0), 0.8, 0.8);
    hatch(B, X(18.0), 0, zD(18.0), 0.6, 0.6, true);
    hatch(B, X(0.6) + 0.35, 0, zD(0.6), 0.6, 0.9);
    /* team: two strips on the house roof and across the launcher backs */
    box(B.team, X(12.0), X(13.2), -0.6, 0.6, 4.28, 4.3);
    box(B.team, X(7.0), X(7.6), -2.0, 2.0, zD(7.3) + 0.01, zD(7.3) + 0.03);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ KUANG HUA VI [K1][K2][K3]  L 34.2 */
  var KH = hullFns({ L: 34.2,
    ZD: [[0, 1.9], [22, 1.92], [28, 1.98], [34.2, 2.05]],
    HD: [[0, 3.3], [3, 3.55], [8, 3.7], [22, 3.7], [26, 3.45], [29, 2.8], [31.5, 1.9], [33.2, 0.9], [34.2, 0.05]],
    CH: [[0, 3.45], [3, 3.68], [8, 3.8], [22, 3.8], [26, 3.58], [29, 2.95], [31.5, 2.0], [33.2, 0.95], [34.2, 0.02]],
    CZ: [[0, 1.1], [20, 1.15], [27, 1.25], [31, 1.45], [33.5, 1.8], [34.2, 2.05]],
    KZ: [[0, -1.2], [8, -1.6], [22, -1.8], [27, -1.6], [30, -0.9], [31.8, 0.0], [33.2, 1.0], [34.2, 2.05]],
    ds: [0, 0.6, 2, 4, 7, 10, 13, 16, 19, 22, 24, 26, 27.5, 29, 30, 31, 31.8, 32.5, 33.2, 33.7, 34.2],
    bandZ: function () { return 1.0; }
  });
  function buildKH6(THREE, M, C) {
    var T = materials(THREE, C, { hull: 0x9da2a5, band: 0x80868a, deck: 0x6a6f72, boot: 0x3d2a26, light: 0xa3a8ab });
    var g = new THREE.Group(), B = bins(T), X = KH.X, zD = KH.zD, s, k;
    monoHull(B, KH);
    /* the faceted deckhouse [K1][K2]: d 7.3 - 25.5, sides leaning in (3.1 m half-width at the foot, 2.6 m at
       the roof), roof 4.6 m aft, the bridge block 5.3 m forward of d 17.3, raked fore face */
    house(B.hull, KH, 7.3, 17.4, 3.1, zD, 4.6, 0.5, 0, 0.3);
    house(B.hull, KH, 17.2, 25.5, 3.1, zD, 5.3, 0.55, 1.0, 0);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, X(23.1), X(24.3), s * 2.62 - 0.04, s * 2.62 + 0.04, 4.6, 4.95);          /* bridge side windows */
      box(B.dark, X(11.6), X(12.4), s * 2.98 - 0.03, s * 2.98 + 0.03, zD(12) + 0.15, 3.7);  /* doors */
      box(B.dark, X(19.0), X(19.8), s * 2.98 - 0.03, s * 2.98 + 0.03, zD(19) + 0.15, 3.7);
    }
    obox(B.glass, [X(24.75), 0, 4.75], unit([0.6, 0, 1]), [0, 1, 0], unit([1, 0, -0.6]), -0.28, 0.28, -1.6, 1.6, -0.03, 0.03);
    /* the raked enclosed mast on the bridge [K1]: foot d 19.0 - 21.4, head d 18.4 - 19.2 at 9.0 m */
    hexa(B.hull, [[X(19.0), -0.95, 5.25], [X(21.4), -0.95, 5.25], [X(21.4), 0.95, 5.25], [X(19.0), 0.95, 5.25],
                  [X(18.4), -0.38, 9.0], [X(19.2), -0.38, 9.0], [X(19.2), 0.38, 9.0], [X(18.4), 0.38, 9.0]]);
    cylZ(B.metal, X(18.8), 0, 9.0, 9.6, 0.08, 6);
    box(B.light, X(19.6), X(20.4), -0.35, 0.35, 5.3, 5.7);
    /* the mast's fittings [K1]: the navigation radar's bar on a bracket at its fore face, the small dome on
       the head, the yard, the step rungs up the after edge */
    box(B.light, X(19.7), X(20.3), -0.3, 0.3, 7.6, 7.75);
    box(B.light, X(19.85), X(20.15), -1.0, 1.0, 7.8, 7.95);
    ellipsoid(B.light, [X(18.8), 0, 9.0], 0.36, 0.36, 0.32, 3, 10, 0, PI / 2);
    box(B.metal, X(18.95), X(19.05), -1.2, 1.2, 8.3, 8.36);
    for (k = 0; k < 8; k++) { var zr = 5.6 + k * 0.42, xr = lerp(X(19.0), X(18.4), (zr - 5.25) / 3.75) - 0.06; box(B.metal, xr - 0.03, xr + 0.03, -0.2, 0.2, zr, zr + 0.03); }
    /* Hsiung Feng II: twin boxes on the roof, an after pair and a forward pair a side [K1][K3] (as seen; the
       training of the boxes is NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) {
      boxLauncher(B, B.light, [X(9.9), s * 1.35, 4.6], 3.0, 0.62, 1.1, 0.05, 0);
      boxLauncher(B, B.light, [X(14.0), s * 1.35, 4.6], 2.6, 0.62, 0.95, 0.05, 0);
    }
    /* the 20 mm T-75 on the quarterdeck [K1][K4], barrel laid aft */
    gun20(B, X(3.9), 0, zD(3.9), -1, 0.35);
    box(B.hull, X(1.0), X(2.5), -2.8, -1.6, zD(1.5), zD(1.5) + 0.35);
    box(B.hull, X(1.0), X(2.5), 1.6, 2.8, zD(1.5), zD(1.5) + 0.35);
    rails(B, KH, 0.3, 7.0, 0.12, 0.9);
    rails(B, KH, 25.8, 33.0, 0.12, 0.9);
    cyl(B.metal, [X(33.8), 0, zD(33.8)], [X(33.8), 0, zD(33.8) + 1.6], 0.03, 0.02, 4);
    /* waterjets / screws are not seen; nothing drawn under the transom */
    /* the detail pass [K1][K2][K3]: rails round both roofs, ladders, the life rings on the house sides,
       raft canisters and whips on the after roof, searchlights and whips on the bridge roof, the bitts,
       fairleads, anchors and hatches on the two open decks */
    roofRail(B.metal, X(7.75), X(17.1), 2.5, 4.6, 0.85, "f");
    roofRail(B.metal, X(17.5), X(24.3), 2.45, 5.3, 0.85);
    ladder(B.metal, [X(7.05), 1.9, zD(7.1)], [X(7.5), 1.9, 4.6], 0.45);
    ladder(B.metal, [X(17.05), -1.6, 4.6], [X(17.3), -1.6, 5.3], 0.45);
    for (s = -1; s <= 1; s += 2) {
      lifeRing(B.ring, X(8.6), s * 2.84, 3.3, s, 0.32);
      lifeRing(B.ring, X(9.5), s * 2.86, 3.25, s, 0.32);
      lifeRing(B.ring, X(20.6), s * 2.76, 4.0, s, 0.32);
      raft(B, X(8.3), s * 1.9, 4.6, false, 0.28);
      whip(B, X(7.8), s * 2.4, 4.6, 5.2, -0.6);
      whip(B, X(23.9), s * 2.0, 5.3, 3.4, 0);
      searchlight(B, X(22.6), s * 2.1, 5.3, 1);
      vent(B.hull, X(16.4), s * 2.1, 4.6, 0.18, 0.35);
      bitts(B.metal, X(0.8), s * 2.7, zD(0.8), 0.08);
      bitts(B.metal, X(6.2), s * 3.05, zD(6.2), 0.08);
      bitts(B.metal, X(29.2), s * 1.9, zD(29.2), 0.08);
      fairlead(B.metal, X(0.4), s * (KH.hD(0.4) - 0.05), zD(0.4), s);
      fairlead(B.metal, X(30.3), s * (KH.hD(30.3) - 0.05), zD(30.3), s);
      anchor(B, KH, 32.0, s, 0.7);
    }
    hatch(B, X(27.6), 0, zD(27.6), 0.7, 0.7, true);
    hatch(B, X(26.4), 0, zD(26.4), 0.9, 1.1);
    hatch(B, X(5.6), 0, zD(5.6), 0.9, 1.2);
    for (s = -1; s <= 1; s += 2) {                                       /* the round port on the house side [K1] */
      cyl(B.metal, [X(13.6), s * 2.86, 3.3], [X(13.6), s * 2.93, 3.3], 0.24, 0.24, 10);
      cyl(B.glass, [X(13.6), s * 2.92, 3.3], [X(13.6), s * 2.95, 3.3], 0.19, 0.19, 10);
      box(B.dark, X(15.0), X(16.6), s * 2.86 - 0.02, s * 2.86 + 0.02, 2.4, 3.3);              /* the panel door [K1] */
    }
    box(B.team, X(10.4), X(12.6), -0.5, 0.5, 4.6, 4.63);
    box(B.team, X(21.8), X(23.4), -0.6, 0.6, 5.3, 5.33);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ LUNG CHIANG (PSMM Mk 5) [L1][L2]  L 50.1 */
  var LC = hullFns({ L: 50.1,
    ZD: [[0, 2.2], [15, 2.2], [25, 2.45], [33.5, 3.1], [39, 3.5], [44, 3.8], [50.1, 4.3]],
    HD: [[0, 3.05], [3, 3.35], [6, 3.52], [15, 3.65], [30, 3.65], [36, 3.4], [41, 2.9], [45, 2.1], [48, 1.15], [50.1, 0.05]],
    CH: [[0, 2.88], [3, 3.18], [6, 3.42], [15, 3.5], [30, 3.45], [36, 3.1], [41, 2.5], [45, 1.6], [48, 0.8], [50.1, 0.02]],
    CZ: [[0, -0.4], [20, -0.5], [32, -0.3], [38, 0.2], [44, 1.0], [48, 2.0], [50.1, 4.3]],
    KZ: [[0, -1.1], [6, -1.8], [15, -2.2], [32, -2.3], [40, -2.1], [44, -1.4], [46.5, -0.4], [47.3, 0.0], [48.6, 1.5], [50.1, 4.3]],
    ds: [0, 0.6, 2, 4, 7, 10, 14, 18, 22, 26, 30, 33, 36, 38.5, 40.5, 42.5, 44, 45.5, 46.5, 47.3, 48.0, 48.6, 49.2, 49.7, 50.1],
    flare: function (d) { return 0.05 + 0.12 * clamp((d - 34) / 10, 0, 1); }
  });
  function buildLungChiang(THREE, M, C) {
    var T = materials(THREE, C, { hull: 0xa2a5a3, deck: 0x6a6e6f, boot: 0x5a2e24, light: 0xadb0ae });
    var g = new THREE.Group(), B = bins(T), X = LC.X, zD = LC.zD, s, k;
    monoHull(B, LC);
    /* the long deckhouse [L1]: d 14.2 - 33.6, sloped after end rising to the roof at d 17.1, roof 5.6 m, the
       bridge block d 25.5 - 33.6 at 5.9 m with its raked front and the screen of the open bridge */
    var HW = 2.75;
    house(B.hull, LC, 14.2, 25.8, HW, zD, 5.55, 0.05, 0, 2.7);
    house(B.hull, LC, 25.5, 33.6, HW, zD, 5.95, 0.08, 0.35, 0);
    house(B.hull, LC, 27.5, 33.2, HW - 0.15, 5.9, 6.65, 0.02, 0.2, 0);
    box(B.deck, X(27.7), X(32.8), -HW + 0.3, HW - 0.3, 6.6, 6.68);
    for (k = -2; k <= 2; k++) box(B.glass, X(33.42) - 0.04, X(33.42) + 0.06, k * 0.95 - 0.38, k * 0.95 + 0.38, 4.95, 5.55);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) box(B.glass, X(26.6 + k * 1.6) - 0.35, X(26.6 + k * 1.6) + 0.35, s * HW - 0.03, s * HW + 0.03, 4.75, 5.3);
      box(B.dark, X(16.2), X(17.0), s * HW - 0.03, s * HW + 0.03, zD(16.5) + 0.15, 4.4);
      box(B.dark, X(22.4), X(23.2), s * HW - 0.03, s * HW + 0.03, zD(23) + 0.15, 4.5);
      for (k = 0; k < 3; k++) box(B.glass, X(18.6 + k * 1.2) - 0.25, X(18.6 + k * 1.2) + 0.25, s * HW - 0.03, s * HW + 0.03, 4.1, 4.5);
    }
    /* the uptake abaft the bridge (d 25.8, to 8.4 m) [L1] */
    cyl(B.hull, [X(25.9), 0.9, 5.5], [X(25.9), 0.9, 8.4], 0.42, 0.38, 12);
    cylZ(B.dark, X(25.9), 0.9, 8.38, 8.42, 0.32, 12);
    /* the lattice mast [L1][L2]: legs d 22.4 - 25.0 on the roof, head platform at 12.5 m, the round radome on
       it (top 15.0 m), the yards, the pole forward of the dome to 15.7 m */
    var xm = X(23.7);
    lattice(B.light, xm, 0, 5.55, 12.4, 1.3, 1.25, 0.55, 0.5, 5, 0.06);
    box(B.deck, xm - 0.75, xm + 0.75, -0.75, 0.75, 12.4, 12.5);
    box(B.metal, xm - 0.05, xm + 0.05, -2.2, 2.2, 11.5, 11.58);
    box(B.metal, xm - 0.05, xm + 0.05, -1.4, 1.4, 9.4, 9.48);
    cylZ(B.light, xm, 0, 12.5, 13.1, 0.55, 14);
    cylZ(B.light, xm, 0, 13.1, 14.2, 0.8, 18);
    ellipsoid(B.light, [xm, 0, 14.2], 0.8, 0.8, 0.8, 5, 18, 0, PI / 2);
    cyl(B.metal, [xm + 1.2, 0, 9.4], [xm + 1.2, 0, 15.7], 0.06, 0.04, 6);
    box(B.metal, xm + 1.15, xm + 1.25, -0.6, 0.6, 14.9, 14.96);
    /* the tripod and the search radar's flat array aft of the mast [L1] (d 19.8, array 9.3 - 10.0 m) */
    var xt = X(19.8);
    for (s = -1; s <= 1; s += 2) cyl(B.light, [xt - 0.9, s * 0.9, 5.55], [xt, s * 0.12, 8.8], 0.06, 0.05, 5);
    cyl(B.light, [xt + 1.1, 0, 5.55], [xt, 0, 8.8], 0.06, 0.05, 5);
    box(B.deck, xt - 0.5, xt + 0.5, -0.5, 0.5, 7.0, 7.06);
    cylZ(B.light, xt, 0, 8.8, 9.3, 0.15, 8);
    box(B.light, xt - 0.12, xt + 0.12, -1.9, 1.9, 9.3, 10.0);
    box(B.dark, xt + 0.12, xt + 0.14, -1.8, 1.8, 9.35, 9.95);
    /* four Hsiung Feng I boxes in two tandem pairs abaft the house, rising forward [L1] */
    for (s = -1; s <= 1; s += 2) {
      boxLauncher(B, B.light, [X(5.4), s * 1.55, zD(5.4) + 0.75], 3.8, 0.55, 0.9, 0.38, 0);
      boxLauncher(B, B.light, [X(9.3), s * 1.55, zD(9.3) + 0.6], 3.8, 0.55, 0.9, 0.45, 0);
      cyl(B.metal, [X(6.6), s * 1.55, zD(6.6)], [X(6.6), s * 1.55, zD(6.6) + 1.2], 0.12, 0.12, 6);
      cyl(B.metal, [X(10.5), s * 1.55, zD(10.5)], [X(10.5), s * 1.55, zD(10.5) + 1.2], 0.12, 0.12, 6);
    }
    /* the round after gun mount on the quarterdeck [L1] (d 2.9, 2.5 m across, top 4.9 m) */
    cylZ(B.hull, X(2.9), 0, zD(2.9), zD(2.9) + 0.35, 1.0, 16);
    ellipsoid(B.light, [X(2.9), 0, zD(2.9) + 0.35], 1.25, 1.25, 2.3, 6, 18, 0, PI / 2);
    /* the deck-edge rails run the whole length, past the house as well [L1] */
    rails(B, LC, 0.3, 49.5, 0.12, 0.9);
    /* the detail pass [L1][L2]: rails on the house roof, round the open bridge, the radar platform and the
       mast head; ladders; the life rings on the house sides; raft canisters on the roof; the long whips at
       the after end of the house; the bitts, fairleads, anchors, hatches and vents of the open decks */
    roofRail(B.metal, X(17.0), X(25.4), 2.65, 5.55, 0.85, "f");
    railLine(B.metal, [[X(27.7), -2.45, 6.65], [X(32.9), -2.45, 6.65], [X(33.1), 0, 6.65], [X(32.9), 2.45, 6.65], [X(27.7), 2.45, 6.65]], 0.5);
    roofRail(B.metal, xt - 0.5, xt + 0.5, 0.5, 7.06, 0.6);
    roofRail(B.metal, xm - 0.75, xm + 0.75, 0.75, 12.5, 0.7);
    ladder(B.metal, [xm - 1.05, 0, 5.55], [xm - 0.5, 0, 12.4], 0.4);
    for (s = -1; s <= 1; s += 2) {
      ladder(B.metal, [X(24.3), s * 2.8, zD(24.3)], [X(24.3), s * 2.8, 5.55], 0.45, true);
      lifeRing(B.ring, X(17.6), s * 2.75, 3.7, s, 0.32);
      lifeRing(B.ring, X(31.9), s * 2.75, 4.25, s, 0.32);
      raft(B, X(21.8), s * 1.55, 5.55, false, 0.3);
      whip(B, X(16.4), s * 2.4, 5.55, 7.0, -1.6);
      searchlight(B, X(32.4), s * 2.0, 6.65, 1);
      vent(B.hull, X(34.8), s * 2.1, zD(34.8), 0.2, 0.5);
      vent(B.hull, X(13.6), s * 2.75, zD(13.6), 0.18, 0.45);
      bitts(B.metal, X(1.1), s * 2.6, zD(1.1), 0.09);
      bitts(B.metal, X(12.9), s * 2.95, zD(12.9), 0.09);
      bitts(B.metal, X(40.8), s * 2.1, zD(40.8), 0.09);
      bitts(B.metal, X(44.6), s * 1.25, zD(44.6), 0.08);
      fairlead(B.metal, X(0.5), s * (LC.hD(0.5) - 0.05), zD(0.5), s);
      fairlead(B.metal, X(45.0), s * (LC.hD(45.0) - 0.05), zD(45.0), s);
      anchor(B, LC, 46.6, s, 0.85);
    }
    hatch(B, X(42.6), 0, zD(42.6), 0.75, 0.75, true);
    hatch(B, X(35.6), 0, zD(35.6), 1.0, 1.2);
    hatch(B, X(13.5), 0, zD(13.5), 0.9, 0.9);
    whip(B, X(33.2), 1.4, 6.65, 3.2, 0);
    cyl(B.metal, [X(49.7), 0, zD(49.7)], [X(49.7), 0, zD(49.7) + 1.6], 0.03, 0.02, 4);
    /* underwater: the PSMM's three shafts are NOT CONFIRMED by a photograph; two rudders and two screws
       drawn plainly as a small boat's */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(9), s * 1.4, -1.8], [X(1.4), s * 1.4, -1.5], 0.08, 0.08, 6);
      cyl(B.metal, [X(1.5), s * 1.4, -1.5], [X(1.1), s * 1.4, -1.5], 0.6, 0.6, 12);
      box(B.metal, X(0.1), X(0.8), s * 1.4 - 0.05, s * 1.4 + 0.05, -2.1, -0.6);
    }
    box(B.team, X(28.4), X(30.0), -0.8, 0.8, 6.68, 6.71);
    box(B.team, X(18.0), X(20.0), -0.8, 0.8, 5.55, 5.58);
    flush(THREE, g, B);
    /* the trained mount: OTO Melara 76 mm on the forecastle [L1][L2], d 38.4 */
    g.add(turretGroup(THREE, T, [X(38.4), 0, zD(38.4) + 0.1], function (TB) { cupola(TB, 1.25, 1.85, 4.0, 0.12, 0.09); }));
    return g;
  }

  /* ============================================================ CHIN CHIANG [C1][C2]  L 61.4 */
  var CC = hullFns({ L: 61.4,
    ZD: [[0, 2.85], [20, 2.85], [36, 3.0], [45, 3.4], [52, 3.8], [57, 4.1], [61.4, 4.4]],
    HD: [[0, 3.95], [3, 4.35], [8, 4.62], [20, 4.75], [38, 4.75], [46, 4.4], [52, 3.6], [56, 2.6], [59, 1.4], [61.4, 0.05]],
    CH: [[0, 3.78], [3, 4.18], [8, 4.46], [20, 4.55], [38, 4.5], [46, 4.0], [52, 3.0], [56, 2.0], [59, 1.0], [61.4, 0.02]],
    CZ: [[0, -0.6], [25, -0.7], [40, -0.4], [48, 0.3], [55, 1.4], [59, 2.6], [61.4, 4.4]],
    KZ: [[0, -1.3], [8, -2.3], [20, -2.7], [40, -2.7], [50, -2.2], [54, -1.3], [56.5, -0.4], [58.4, 0.0], [60, 2.0], [61.4, 4.4]],
    ds: [0, 0.6, 2, 5, 9, 13, 18, 23, 28, 33, 38, 42, 45, 48, 50.5, 52.5, 54.5, 56, 57.3, 58.4, 59.3, 60.1, 60.8, 61.4],
    flare: function (d) { return 0.06 + 0.15 * clamp((d - 42) / 12, 0, 1); }
  });
  function buildChinChiang(THREE, M, C) {
    var T = materials(THREE, C, { hull: 0x8f9597, deck: 0x60666a, boot: 0x4a2b25, light: 0xa3a8aa });
    var g = new THREE.Group(), B = bins(T), X = CC.X, zD = CC.zD, s, k;
    monoHull(B, CC);
    /* the deckhouse [C1]: two tiers d 15.8 - 47.1 at 7.9 m, the raised middle block d 26.1 - 33.4 to 10.6 m,
       the bridge forward with its raked face; half-width 3.6 */
    var HW = 3.6;
    house(B.hull, CC, 15.8, 26.6, HW, zD, 7.9, 0.08, 0, 0.2);
    house(B.hull, CC, 26.1, 33.6, HW - 0.3, zD, 10.6, 0.1, 0, 0);
    house(B.hull, CC, 33.2, 47.1, HW, zD, 8.1, 0.1, 0.9, 0);
    box(B.hull, X(26.0), X(33.7), -2.6, 2.6, 10.6, 10.75);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) box(B.dark, X(27.0 + k * 1.6) - 0.5, X(27.0 + k * 1.6) + 0.5, s * (HW - 0.3) - 0.03, s * (HW - 0.3) + 0.03, 8.6, 10.2);   /* louvres */
      for (k = 0; k < 5; k++) box(B.glass, X(40.6 + k * 1.1) - 0.35, X(40.6 + k * 1.1) + 0.35, s * HW - 0.03, s * HW + 0.03, 6.9, 7.5);
      box(B.dark, X(18.5), X(19.4), s * HW - 0.03, s * HW + 0.03, zD(19) + 0.2, 5.1);
      box(B.dark, X(36.0), X(36.9), s * HW - 0.03, s * HW + 0.03, zD(36) + 0.2, 5.3);
      for (k = 0; k < 6; k++) box(B.dark, X(21 + k * 3.8) - 0.25, X(21 + k * 3.8) + 0.25, s * HW - 0.03, s * HW + 0.03, 4.4, 4.9);
    }
    obox(B.glass, [X(46.75), 0, 7.4], unit([0.6, 0, 1]), [0, 1, 0], unit([1, 0, -0.6]), -0.3, 0.3, -2.8, 2.8, -0.03, 0.03);
    /* the two small radomes on posts over the bridge [C1][C2] */
    [[39.6, 1.0], [42.2, -1.0]].forEach(function (p) {
      cylZ(B.light, X(p[0]), p[1], 8.1, 9.6, 0.18, 8);
      ellipsoid(B.light, [X(p[0]), p[1], 9.6], 0.62, 0.62, 0.75, 5, 14, -0.3, PI / 2);
    });
    /* the main lattice mast [C1][C2]: legs d 32.8 - 36.5 on the roof, platform 14.7 m, yards, top 19.5 m */
    var xm = X(34.7);
    lattice(B.light, xm, 0, 8.1, 16.8, 1.8, 1.6, 0.55, 0.5, 5, 0.07);
    box(B.deck, xm - 0.9, xm + 0.9, -0.9, 0.9, 14.6, 14.7);
    box(B.metal, xm - 0.06, xm + 0.06, -2.6, 2.6, 16.8, 16.9);
    box(B.metal, xm - 0.06, xm + 0.06, -1.8, 1.8, 18.2, 18.28);
    cyl(B.metal, [xm, 0, 16.8], [xm, 0, 19.5], 0.08, 0.05, 6);
    box(B.light, xm + 0.3, xm + 0.6, -1.2, 1.2, 15.0, 15.7);
    /* Hsiung Feng box racks abaft the house, port and starboard, rising forward [C1] (the 1990s Hsiung
       Feng I fit is NOT CONFIRMED; drawn as photographed) */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        boxLauncher(B, B.light, [X(10.2), s * (1.2 + k * 1.15), zD(10.2) + 0.8], 5.0, 0.5, 0.95, 0.6, 0);
        boxLauncher(B, B.light, [X(10.2) - 0.55, s * (1.2 + k * 1.15), zD(10.2) + 0.8 + 1.05], 5.0, 0.5, 0.95, 0.6, 0);
      }
      box(B.metal, X(10.6), X(13.2), s * 1.1 - 0.06, s * 3.6, zD(11), zD(11) + 0.9);
    }
    box(B.hull, X(5.0), X(7.0), -1.0, 1.0, zD(6), zD(6) + 1.1);
    rails(B, CC, 0.3, 15.5, 0.12, 0.95);
    rails(B, CC, 47.4, 60.8, 0.12, 0.95);
    /* the detail pass [C1][C2]: rails round all three roofs and the mast platform, ladders between the
       levels, life rings, raft canisters on the after roof, whips, searchlights, the bitts, fairleads,
       anchors, hatches and vents of the forecastle and quarterdeck */
    roofRail(B.metal, X(16.0), X(26.1), 3.45, 7.9, 0.9, "f");
    roofRail(B.metal, X(26.2), X(33.5), 3.15, 10.6, 0.9);
    roofRail(B.metal, X(33.7), X(46.1), 3.45, 8.1, 0.9, "a");
    roofRail(B.metal, xm - 0.9, xm + 0.9, 0.9, 14.7, 0.7);
    ladder(B.metal, [xm - 1.5, 0, 8.1], [xm - 0.75, 0, 14.6], 0.4);
    ladder(B.metal, [X(15.6), 2.4, zD(15.6)], [X(15.85), 2.4, 7.9], 0.45);
    ladder(B.metal, [X(25.9), -2.0, 7.9], [X(26.05), -2.0, 10.6], 0.45);
    for (s = -1; s <= 1; s += 2) {
      ladder(B.metal, [X(32.4), s * 3.62, zD(32.4)], [X(32.4), s * 3.62, 8.1], 0.45, true);
      lifeRing(B.ring, X(17.4), s * 3.62, 5.6, s, 0.34);
      lifeRing(B.ring, X(44.2), s * 3.62, 5.8, s, 0.34);
      raft(B, X(18.6), s * 2.4, 7.9, false, 0.32);
      raft(B, X(22.4), s * 2.4, 7.9, false, 0.32);
      whip(B, X(16.4), s * 3.0, 7.9, 6.0, -1.2);
      whip(B, X(45.6), s * 3.0, 8.1, 4.0, 0);
      searchlight(B, X(45.2), s * 2.4, 8.1, 1);
      vent(B.hull, X(48.0), s * 2.9, zD(48.0), 0.22, 0.55);
      vent(B.hull, X(14.8), s * 3.8, zD(14.8), 0.2, 0.5);
      bitts(B.metal, X(1.3), s * 3.3, zD(1.3), 0.1);
      bitts(B.metal, X(8.4), s * 3.9, zD(8.4), 0.1);
      bitts(B.metal, X(53.6), s * 2.1, zD(53.6), 0.1);
      bitts(B.metal, X(56.6), s * 1.3, zD(56.6), 0.09);
      fairlead(B.metal, X(0.5), s * (CC.hD(0.5) - 0.05), zD(0.5), s);
      fairlead(B.metal, X(56.9), s * (CC.hD(56.9) - 0.05), zD(56.9), s);
      anchor(B, CC, 57.6, s, 1.0);
    }
    hatch(B, X(54.2), 0, zD(54.2), 0.8, 0.8, true);
    hatch(B, X(47.9), 0, zD(47.9), 1.0, 1.2);
    hatch(B, X(3.2), 0, zD(3.2), 1.0, 1.2);
    cyl(B.metal, [X(61.0), 0, zD(61.0)], [X(61.0), 0, zD(61.0) + 1.8], 0.03, 0.02, 4);
    /* underwater: two shafts and rudders, plainly (NOT CONFIRMED) */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(12), s * 1.8, -2.4], [X(2.0), s * 1.8, -1.9], 0.1, 0.1, 6);
      cyl(B.metal, [X(2.1), s * 1.8, -1.9], [X(1.6), s * 1.8, -1.9], 0.8, 0.8, 12);
      box(B.metal, X(0.2), X(1.1), s * 1.8 - 0.06, s * 1.8 + 0.06, -2.6, -0.8);
    }
    box(B.team, X(28.0), X(31.5), -1.0, 1.0, 10.75, 10.78);
    box(B.team, X(43.0), X(45.0), -1.0, 1.0, 8.1, 8.13);
    flush(THREE, g, B);
    /* the trained mount: the 40 mm in its round cupola on the forecastle [C1][C2] (d 50.3) */
    g.add(turretGroup(THREE, T, [X(50.3), 0, zD(50.3) + 0.2], function (TB) { cupola(TB, 1.05, 2.0, 2.8, 0.18, 0.07); }));
    return g;
  }

  /* ============================================================ TUO CHIANG (PGG-618) [T1][T2][T3][T4]
     wave-piercing catamaran, L 60.4 (length on cushion), beam 14.0; d = metres forward of the transom */
  var TL = 60.4;
  function TX(d) { return d - TL / 2; }
  /* the upper body's top: the low flight deck aft (4.0 m), the superstructure sides (8.1 m), the foredeck
     (7.2 m) [T3 model, near-side edges at 17.75 px/m] */
  function tTop(d) { return d < 13.2 ? 4.0 : d < 41.7 ? 8.1 : lerp(7.3, 7.0, (d - 41.7) / 17.8); }
  /* the plan: full 7.0 m half-breadth at the wet deck, the topside leaning in 0.6 m, the bow tapering to a
     point at d 59.5 [T4] */
  function tHw(d) { return d < 50 ? 7.0 : d < 57 ? lerp(7.0, 5.6, (d - 50) / 7) : lerp(5.6, 0.6, Math.min(1, (d - 57) / 2.5)); }
  function buildTuoChiang(THREE, M, C) {
    var T = materials(THREE, C, { hull: 0xa6aaad, band: 0x62686c, deck: 0x7a7f82, boot: 0x3b3233, light: 0xb4b8ba, dark: 0x1e2224 });
    var g = new THREE.Group(), B = bins(T), s, k, i;
    /* the two demi-hulls [T1][T2]: centred 5.0 m off the centreline, 3.4 m wide at the water, keel 2.3 m
       under it, the wave-piercing bows reaching forward to the full 60.4 m at the waterline */
    for (s = -1; s <= 1; s += 2) {
      var R = [], dsH = [0, 0.5, 3, 8, 16, 26, 36, 44, 50, 54, 57, 59, 60.4];
      dsH.forEach(function (d) {
        var f = d > 50 ? Math.pow(Math.max(0, (60.4 - d) / 10.4), 0.7) : 1, a = d < 3 ? 0.85 + 0.05 * d : 1;
        var hw = Math.max(0.04, 1.7 * f * a), kz = d > 52 ? lerp(-2.3, 0.4, Math.pow((d - 52) / 8.4, 1.6)) : (d < 4 ? lerp(-1.6, -2.3, d / 4) : -2.3);
        var zt = d > 57 ? lerp(3.1, 0.5, (d - 57) / 3.4) : 3.1, yc = s * 5.0;
        R.push([[TX(d), yc - hw, zt], [TX(d), yc - hw * 1.02, 0], [TX(d), yc - hw * 0.75, kz * 0.55], [TX(d), yc, kz],
                [TX(d), yc + hw * 0.75, kz * 0.55], [TX(d), yc + hw * 1.02, 0], [TX(d), yc + hw, zt]]);
      });
      /* split above / below water by lofting the two bands into separate bins */
      var up = R.map(function (r) { return [r[6], r[0], r[1], r[5]]; }), lo = R.map(function (r) { return [r[1], r[2], r[3], r[4], r[5]]; });
      loft(B.band, up);
      loft(B.boot, lo);
      /* the boot-topping line along both faces of the demi-hull, 0 - 0.28 m (the detail pass) */
      [-1, 1].forEach(function (f) {
        var bt = [];
        dsH.forEach(function (d, j) {
          if (d > 59.6) return;
          var r = R[j], yw = r[f < 0 ? 1 : 5][1], yt = r[f < 0 ? 0 : 6][1], zt = r[0][2], y0 = yw, y1 = lerp(yw, yt, 0.28 / zt), o = (yw - s * 5.0) > 0 ? 0.012 : -0.012;
          bt.push([[TX(d), y0 + o * 0.2, -0.01], [TX(d), y0 + o, -0.01], [TX(d), y1 + o, 0.28], [TX(d), y1 + o * 0.2, 0.28]]);
        });
        loft(B.btop, bt);
      });
    }
    /* the upper body: wet deck at 3.0 m, sides leaning in 0.6 m, top stepping as tTop() */
    (function () {
      var ds = [0, 6, 13.2, 13.21, 20, 30, 41.7, 41.71, 46, 50, 53.5, 57, 58.3, 59.5], rings = [];
      ds.forEach(function (d, j) {
        var zt = tTop(d), hw = tHw(d), zb = d > 53 ? lerp(3.0, 6.4, (d - 53) / 6.5) : 3.0;
        if (j === 2) zt = 4.0;
        if (j === 6) zt = 8.1;
        var tk = Math.min(0.6, hw * 0.5);
        rings.push([[TX(d), -hw, zb], [TX(d), hw, zb], [TX(d), hw - tk, zt], [TX(d), -hw + tk, zt]]);
      });
      /* sides and wet deck: hull bin; the top faces of the rings: deck bin */
      var n = rings.length;
      for (i = 0; i + 1 < n; i++) {
        var A = rings[i], Bq = rings[i + 1];
        okTri(B.hull, A[1], Bq[2], Bq[1]); okTri(B.hull, A[1], A[2], Bq[2]);      /* port side (+Y) */
        okTri(B.hull, A[0], Bq[3], A[3]); okTri(B.hull, A[0], Bq[0], Bq[3]);      /* starboard */
        okTri(B.deck, A[3], Bq[2], A[2]); okTri(B.deck, A[3], Bq[3], Bq[2]);      /* top */
        okTri(B.dark, A[0], Bq[1], Bq[0]); okTri(B.dark, A[0], A[1], Bq[1]);      /* wet deck */
      }
      var a = rings[0];
      okTri(B.hull, a[0], a[2], a[1]); okTri(B.hull, a[0], a[3], a[2]);           /* transom */
      var b = rings[n - 1];
      okTri(B.hull, b[0], b[1], b[2]); okTri(B.hull, b[0], b[2], b[3]);           /* bow face */
    })();
    /* the open stern: flight deck d 0 - 13.2 at 4.0 m with rails [T3][T4]; a hidden "helipad" node marks it */
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 10; k++) {
      var dk = 0.4 + k * 1.4, yk = s * (6.25);
      box(B.metal, TX(dk) - 0.03, TX(dk) + 0.03, yk - 0.03, yk + 0.03, 4.0, 5.0);
      if (k < 9) { cyl(B.metal, [TX(dk), yk, 5.0], [TX(dk + 1.4), yk, 5.0], 0.022, 0.022, 4); cyl(B.metal, [TX(dk), yk, 4.5], [TX(dk + 1.4), yk, 4.5], 0.015, 0.015, 3); }
    }
    for (k = 0; k < 9; k++) box(B.metal, TX(0.25) - 0.03, TX(0.25) + 0.03, -6.0 + k * 1.5 - 0.03, -6.0 + k * 1.5 + 0.03, 4.0, 5.0);
    cyl(B.metal, [TX(0.25), -6.25, 5.0], [TX(0.25), 6.25, 5.0], 0.022, 0.022, 4);
    /* the superstructure sides run up flush from the hull to 8.1 m between d 13.2 and 41.7: the launcher well
       open on top d 17.5 - 30.5 [T3][T4], its floor at 5.6 m, 4.9 m either side of the centre */
    box(B.dark, TX(17.5), TX(30.5), -5.6, 5.6, 8.08, 8.12);
    box(B.deck, TX(17.6), TX(30.4), -5.5, 5.5, 8.12, 8.14);
    for (k = 0; k < 2; k++) for (s = -1; s <= 1; s += 2) {
      /* two banks a side of Hsiung Feng canisters standing in the well, drawn as box clusters as photographed;
         their exact training and count per bank are NOT CONFIRMED */
      var dc = 19.2 + k * 6.0;
      boxLauncher(B, B.light, [TX(dc), s * 1.6, 8.14], 4.4, 1.2, 1.5, 0.35, 0);
      for (i = 0; i < 4; i++) box(B.dark, TX(dc + 0.6 + i * 0.95), TX(dc + 0.68 + i * 0.95), s * 1.6 - 1.21, s * 1.6 + 1.21, 8.3 + i * 0.32, 9.6 + i * 0.32);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, TX(21.8), TX(23.3), s * 6.75 - 0.03, s * 6.75 + 0.03, 4.4, 6.6);            /* side doors [T1][T3] */
      box(B.dark, TX(28.0), TX(29.5), s * 6.75 - 0.03, s * 6.75 + 0.03, 4.4, 6.6);
      box(B.dark, TX(15.2), TX(16.0), s * 6.7 - 0.03, s * 6.7 + 0.03, 5.0, 6.4);
    }
    /* the Phalanx block abaft the well (d 13.2 - 17.0, 9.3 m) and the mount on it [T1][T3][T4] */
    hexa(B.hull, [[TX(13.2), -4.6, 8.0], [TX(17.4), -4.6, 8.0], [TX(17.4), 4.6, 8.0], [TX(13.2), 4.6, 8.0],
                  [TX(13.5), -4.1, 9.3], [TX(17.0), -4.1, 9.3], [TX(17.0), 4.1, 9.3], [TX(13.5), 4.1, 9.3]]);
    var xp = TX(14.9);
    cylZ(B.light, xp, 0, 9.3, 10.0, 0.75, 14);
    box(B.light, xp - 0.5, xp + 0.6, -0.65, 0.65, 10.0, 10.9);
    ellipsoid(B.light, [xp + 0.05, 0, 11.3], 0.6, 0.6, 0.85, 6, 14);
    cylZ(B.light, xp + 0.05, 0, 10.9, 11.3, 0.6, 14);
    cyl(B.metal, [xp + 0.4, 0, 10.55], [xp + 1.9, 0, 10.55], 0.11, 0.1, 8);
    /* the bridge house [T1][T3]: d 31.5 - 41.7, roof 12.0 m, its face raked back 1.7 m, sides leaning in,
       a row of windows round the front */
    hexa(B.hull, [[TX(31.3), -5.6, 8.0], [TX(41.7), -5.6, 7.2], [TX(41.7), 5.6, 7.2], [TX(31.3), 5.6, 8.0],
                  [TX(31.6), -4.4, 12.0], [TX(40.0), -4.4, 12.0], [TX(40.0), 4.4, 12.0], [TX(31.6), 4.4, 12.0]]);
    for (k = -2; k <= 2; k++) {
      var yw = k * 1.25;
      obox(B.glass, [TX(40.35), yw, 11.0], unit([-1.7, 0, 4.8]), [0, 1, 0], unit([4.8, 0, 1.7]), -0.4, 0.4, -0.45, 0.45, -0.03, 0.07);
    }
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 3; k++) box(B.glass, TX(37.0 + k * 1.1) - 0.38, TX(37.0 + k * 1.1) + 0.38, s * 4.62 - 0.03, s * 4.62 + 0.05, 10.7, 11.3);
    /* the integrated mast [T1][T3]: a tapering four-sided tower d 32.4 - 35.6 off the roof to 16.8 m, a pole
       and yard over it to 18.6 m; the ball director on its post abaft it [T1] */
    hexa(B.hull, [[TX(32.4), -1.6, 12.0], [TX(35.6), -1.6, 12.0], [TX(35.6), 1.6, 12.0], [TX(32.4), 1.6, 12.0],
                  [TX(33.4), -0.55, 16.8], [TX(34.6), -0.55, 16.8], [TX(34.6), 0.55, 16.8], [TX(33.4), 0.55, 16.8]]);
    box(B.metal, TX(33.9), TX(34.1), -1.3, 1.3, 15.6, 15.68);
    cylZ(B.light, TX(34.0), 0, 16.8, 17.4, 0.3, 10);
    cyl(B.metal, [TX(34.0), 0, 17.4], [TX(34.0), 0, 18.6], 0.07, 0.04, 6);
    cylZ(B.light, TX(31.9), -1.2, 12.0, 13.6, 0.32, 10);
    ellipsoid(B.light, [TX(31.9), -1.2, 14.05], 0.55, 0.55, 0.55, 6, 14);
    /* bow: the dark recess between the two bows under the foredeck [T1][T2] */
    box(B.dark, TX(56.0), TX(56.5), -3.2, 3.2, 3.0, 4.2);
    cyl(B.metal, [TX(58.8), 0, 7.0], [TX(58.8), 0, 8.4], 0.03, 0.02, 4);
    /* the detail pass [T1][T3][T4]: the anchors in their pockets on the bow flanks and the hawse above them,
       the jack staff, flush door and hatch outlines and louvres on the leaning superstructure sides, the
       bridge-face lights, whips, the masthead fittings, the flight deck's tie-downs, bitts and deck lights */
    function tSideY(d, z) { var hw = tHw(d), zt = tTop(d), tk = Math.min(0.6, hw * 0.5); return hw - tk * clamp((z - 3.0) / (zt - 3.0), 0, 1); }
    function sidePanel(bin, d0, d1, z0, z1, sg, o) {    /* a flush frame on the side: four thin bars */
      var w = 0.06, oo = o || 0.03;
      [[d0, d1, z0, z0 + w], [d0, d1, z1 - w, z1], [d0, d0 + w, z0, z1], [d1 - w, d1, z0, z1]].forEach(function (q) {
        var ya = sg * (tSideY((q[0] + q[1]) / 2, q[2]) + oo), yb = sg * (tSideY((q[0] + q[1]) / 2, q[3]) + oo);
        hexa(bin, [[TX(q[0]), ya - sg * 0.03, q[2]], [TX(q[1]), ya - sg * 0.03, q[2]], [TX(q[1]), ya, q[2]], [TX(q[0]), ya, q[2]],
                   [TX(q[0]), yb - sg * 0.03, q[3]], [TX(q[1]), yb - sg * 0.03, q[3]], [TX(q[1]), yb, q[3]], [TX(q[0]), yb, q[3]]]);
      });
    }
    for (s = -1; s <= 1; s += 2) {
      /* anchor pocket and anchor [T1]: d 54.4 - 56.0 at 4.4 - 5.6 m */
      var ya0 = s * (tSideY(55.2, 5.0) + 0.02);
      box(B.dark, TX(54.3), TX(56.1), ya0 - 0.04, ya0 + 0.02 * s, 4.3, 5.7);
      obox(B.metal, [TX(55.2), ya0 + s * 0.05, 5.4], [0, 0, -1], [1, 0, 0], [0, s, 0], 0, 0.95, -0.07, 0.07, 0, 0.1);
      obox(B.metal, [TX(55.2), ya0 + s * 0.05, 4.5], [1, 0, 0], [0, 0, 1], [0, s, 0], -0.55, 0.55, -0.08, 0.08, 0, 0.12);
      for (k = -1; k <= 1; k += 2) obox(B.metal, [TX(55.2) + k * 0.5, ya0 + s * 0.05, 4.5], [k * 0.45, 0, 0.9], [k * 0.9, 0, -0.45], [0, s, 0], 0, 0.45, -0.07, 0.07, 0, 0.1);
      cyl(B.dark, [TX(57.4), s * (tSideY(57.4, 6.3) - 0.06), 6.3], [TX(57.4), s * (tSideY(57.4, 6.3) + 0.03), 6.3], 0.3, 0.3, 12);   /* hawse [T1] */
      /* flush doors, hatches and louvres in the superstructure side [T1][T3] */
      sidePanel(B.dark, 44.0, 45.4, 4.4, 6.4, s);
      sidePanel(B.dark, 19.0, 20.6, 4.4, 6.6, s);
      sidePanel(B.dark, 33.0, 34.6, 4.6, 6.8, s);
      sidePanel(B.dark, 38.0, 41.0, 3.5, 4.4, s);
      for (k = 0; k < 5; k++) { var dl = 25.2 + k * 0.35, yl = s * (tSideY(dl, 7.2) + 0.02); box(B.dark, TX(dl) - 0.06, TX(dl) + 0.06, yl - 0.03, yl + 0.02 * s, 6.8, 7.6); }
      /* the bridge-face lights and the wing fittings [T1] */
      box(B.light, TX(40.2), TX(40.6), s * 3.2 - 0.15, s * 3.2 + 0.15, 9.6, 9.9);
      cylZ(B.metal, TX(38.8), s * 4.0, 12.0, 12.35, 0.08, 6);
      ellipsoid(B.light, [TX(38.8), s * 4.0, 12.45], 0.18, 0.18, 0.16, 3, 10);
      /* the two long whips at the after corners of the bridge roof [T1] */
      whip(B, TX(32.0), s * 4.1, 12.0, 6.0, -0.8);
      /* masthead: the yard's sensor balls and lights [T1] */
      ellipsoid(B.light, [TX(34.0), s * 1.25, 15.85], 0.16, 0.16, 0.16, 3, 10);
      box(B.metal, TX(33.85), TX(34.15), s * 0.55 - 0.15, s * 0.55 + 0.15, 16.3, 16.55);
      /* the flight deck: bitts in its corners, the deck-edge lights */
      bitts(B.metal, TX(1.4), s * 5.4, 4.0, 0.1);
      bitts(B.metal, TX(11.6), s * 5.4, 4.0, 0.1);
      for (k = 0; k < 3; k++) box(B.light, TX(2.5 + k * 4.0) - 0.1, TX(2.5 + k * 4.0) + 0.1, s * 5.9 - 0.08, s * 5.9 + 0.08, 4.0, 4.07);
    }
    /* tie-downs on the flight deck: a grid of dark studs */
    for (k = 0; k < 6; k++) for (i = -3; i <= 3; i++) box(B.dark, TX(2.0 + k * 1.8) - 0.06, TX(2.0 + k * 1.8) + 0.06, i * 1.4 - 0.06, i * 1.4 + 0.06, 4.0, 4.015);
    hatch(B, TX(11.8), 0, 4.0, 1.0, 1.2);
    box(B.dark, TX(13.17), TX(13.21), -2.6, -1.0, 4.05, 6.2);            /* the hangar-side door outline in the step */
    hatch(B, TX(47.0), 0, tTop(47.0), 0.9, 0.9, true);
    box(B.team, TX(36.0), TX(38.4), -1.0, 1.0, 12.0, 12.03);
    box(B.team, TX(14.0), TX(16.6), -2.6, -1.4, 9.3, 9.33);
    flush(THREE, g, B);
    /* the trained mount: Otobreda 76 mm in its faceted shield on the foredeck [T1][T2][T3], d 50.2 */
    g.add(turretGroup(THREE, T, [TX(50.2), 0, tTop(50.2)], function (TB) {
      hexa(TB.light, [[-1.7, -1.5, 0], [1.2, -1.5, 0], [1.2, 1.5, 0], [-1.7, 1.5, 0], [-1.4, -1.1, 1.9], [0.4, -1.1, 1.9], [0.4, 1.1, 1.9], [-1.4, 1.1, 1.9]]);
      hexa(TB.light, [[1.2, -1.5, 0], [2.0, -0.6, 0], [2.0, 0.6, 0], [1.2, 1.5, 0], [0.4, -1.1, 1.9], [0.9, -0.5, 1.5], [0.9, 0.5, 1.5], [0.4, 1.1, 1.9]]);
      cylZ(TB.hull, 0, 0, -0.2, 0.02, 1.4, 16);
      cyl(TB.metal, [1.3, 0, 1.15], [5.2, 0, 1.6], 0.09, 0.075, 8);
      cyl(TB.metal, [3.3, 0, 1.38], [3.9, 0, 1.45], 0.15, 0.15, 8);
    }));
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(TX(6.6), 0, 4.0); g.add(hp);
    return g;
  }

  /* ------------------------------------------------------------ submarine kit: a lofted body of rings, each a
     superellipse (exponent nE) with its own half-width, centre z, height above and depth below the centre;
     triangles go to the hull bin above the waterline and the boot bin under it */
  function bodyLoft(B, X, st, seg, nE, above, below) {
    var rings = st.map(function (q) {
      var r = [], j;
      for (j = 0; j < seg; j++) {
        var a = j / seg * TAU, c = Math.cos(a), s = Math.sin(a), e = 2 / nE;
        var y = q.hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e), h = s >= 0 ? q.up : q.dn;
        r.push([X(q.d), y, q.zc + h * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), e)]);
      }
      return r;
    });
    var i, j, n = seg;
    function put(a, b, c) { var z = (a[2] + b[2] + c[2]) / 3; okTri(z < -0.02 ? below : above, a, b, c); }
    var vol = 0;   /* winding: rings run aft to fore, points counter-clockwise seen from ahead */
    for (i = 0; i + 1 < rings.length; i++) for (j = 0; j < n; j++) {
      var A = rings[i][j], Bq = rings[i][(j + 1) % n], Cq = rings[i + 1][(j + 1) % n], D = rings[i + 1][j];
      put(A, Cq, D); put(A, Bq, Cq);
    }
    var r0 = rings[0], rL = rings[rings.length - 1], c0 = [r0[0][0], 0, st[0].zc], cL = [rL[0][0], 0, st[st.length - 1].zc];
    for (j = 0; j < n; j++) { put(c0, r0[(j + 1) % n], r0[j]); put(cL, rL[j], rL[(j + 1) % n]); }
  }
  /* a fin / sail: plan teardrop (round nose radius hw, tail half-width tw) lofted between z levels */
  function finPlan(xa, xf, hw, tw, n) {
    var P = [], k, L = xf - xa;
    for (k = 0; k <= n; k++) { var a = -PI / 2 + k / n * PI; P.push([xf - hw + Math.cos(a) * hw, Math.sin(a) * hw]); }
    P.push([xa + 0.15 * L, hw * 0.75], [xa, tw], [xa, -tw], [xa + 0.15 * L, -hw * 0.75]);
    /* order: starboard nose ... port nose, then down the port side aft and back up the starboard side */
    return P;
  }
  function finLoft(bin, levels, n) {
    var rings = levels.map(function (lv) { return finPlan(lv[0], lv[1], lv[2], lv[3], n).map(function (p) { return [p[0], p[1], lv[4]]; }); });
    loft(bin, rings);
  }
  /* a screw: hub on the X axis at (x, y, z), nb blades of radius r */
  function screw(bin, x, y, z, r, nb, ph) {
    cyl(bin, [x - 0.35, y, z], [x + 0.35, y, z], r * 0.18, r * 0.22, 10);
    for (var k = 0; k < nb; k++) {
      var an = k / nb * TAU + (ph || 0), cy = Math.cos(an), cz = Math.sin(an);
      var tv = unit([0.45, -cz * 0.9, cy * 0.9]), tu = cross(tv, [0, cy, cz]);
      obox(bin, [x, y, z], tu, tv, [0, cy, cz], -0.04, 0.04, -r * 0.26, r * 0.26, r * 0.15, r);
    }
  }
  /* a control surface: a thin tapered plate from root (chord xa..xb at point P0) to tip (chord ta..tb at P1) */
  function plate(bin, xa, xb, ta, tb, P0, P1, t) {
    var n = unit(cross([1, 0, 0], sub(P1, P0))), h = (t || 0.25) / 2;
    hexa(bin, [[xa, P0[1] - n[1] * h, P0[2] - n[2] * h], [xb, P0[1] - n[1] * h, P0[2] - n[2] * h], [tb, P1[1] - n[1] * h * 0.5, P1[2] - n[2] * h * 0.5], [ta, P1[1] - n[1] * h * 0.5, P1[2] - n[2] * h * 0.5],
               [xa, P0[1] + n[1] * h, P0[2] + n[2] * h], [xb, P0[1] + n[1] * h, P0[2] + n[2] * h], [tb, P1[1] + n[1] * h * 0.5, P1[2] + n[2] * h * 0.5], [ta, P1[1] + n[1] * h * 0.5, P1[2] + n[2] * h * 0.5]]);
  }

  /* the detail pass, submarines: windows round the nose of a sail whose nose circle has centre xc and
     radius r at height z; housed mast tops standing just proud of the sail top */
  function sailWindows(B, xc, r, z, n, spread) {
    for (var k = 0; k < n; k++) {
      var a = (n > 1 ? -spread / 2 + spread * k / (n - 1) : 0), c = Math.cos(a), sn = Math.sin(a);
      obox(B.glass, [xc + c * (r + 0.005), sn * (r + 0.005), z], [c, sn, 0], [-sn, c, 0], [0, 0, 1], -0.03, 0.03, -0.17, 0.17, -0.2, 0.2);
    }
  }
  function mastTops(B, x0, zt, list) {
    list.forEach(function (m) { cylZ(B.metal, x0 + m[0], m[1], zt - 0.1, zt + m[2], m[3], 8); cylZ(B.dark, x0 + m[0], m[1], zt + m[2], zt + m[2] + 0.04, m[3] * 0.7, 8); });
  }

  /* ============================================================ HAI SHIH: Tench class, GUPPY II [S1][S2][S3]
     L 93.6, d = metres forward of the after end */
  var GL = 93.6;
  function GX(d) { return d - GL / 2; }
  var G_HB = [[0, 0.25], [2, 0.7], [6, 1.6], [12, 2.7], [20, 3.6], [30, 4.1], [38, 4.15], [72, 4.15], [80, 3.95], [85, 3.5], [89, 2.8], [91.5, 2.0], [93, 1.1], [93.6, 0.3]];
  var G_KZ = [[0, -1.3], [3, -2.0], [8, -3.1], [15, -3.9], [22, -4.3], [80, -4.3], [86, -4.1], [90, -3.4], [92.5, -2.3], [93.6, -0.9]];
  var G_TZ = [[0, -0.3], [6, 0.5], [15, 1.0], [85, 1.0], [91, 0.9], [93.6, 0.3]];
  var G_CZ = [[0, 1.3], [6, 1.8], [14, 2.4], [22, 2.6], [84, 2.6], [90, 2.5], [93.6, 2.2]];
  var G_CW = [[0, 0.25], [6, 0.9], [14, 1.5], [22, 1.8], [80, 1.8], [88, 1.6], [92, 1.1], [93.6, 0.45]];
  function buildHaiShih(THREE, M, C) {
    var T = materials(THREE, C, { hull: 0x1d1f21, deck: 0x2b2e30, boot: 0x4e2420, light: 0x24272a, dark: 0x0b0c0d, metal: 0x3a3632, rough: 0.7 });
    var g = new THREE.Group(), B = bins(T), s, k, X = GX;
    var ds = [0, 0.8, 2, 4, 6, 9, 12, 16, 20, 25, 30, 38, 50, 62, 72, 78, 82, 85, 87.5, 89.5, 91, 92.2, 93.0, 93.6];
    /* the hull: pressure hull and saddle tanks as one rounded section, keel 4.3 m under the water [S1][S3] */
    bodyLoft(B, X, ds.map(function (d) {
      var kz = tbl(G_KZ, d), tz = tbl(G_TZ, d), zc = lerp(kz, tz, 0.48);
      return { d: d, hw: tbl(G_HB, d), zc: zc, up: tz - zc, dn: zc - kz };
    }), 20, 2.3, B.hull, B.boot);
    /* the free-flooding casing: flat deck 2.6 m over the water, sides falling to the hull [S1][S2] */
    (function () {
      var rings = ds.map(function (d) {
        var cz = tbl(G_CZ, d), cw = tbl(G_CW, d), zb = tbl(G_TZ, d) - 0.6;
        return [[X(d), -cw * 1.12, zb], [X(d), cw * 1.12, zb], [X(d), cw, cz], [X(d), -cw, cz]];
      }), i;
      for (i = 0; i + 1 < rings.length; i++) {
        var A = rings[i], Q = rings[i + 1];
        okTri(B.hull, A[1], Q[2], Q[1]); okTri(B.hull, A[1], A[2], Q[2]);
        okTri(B.hull, A[0], Q[3], A[3]); okTri(B.hull, A[0], Q[0], Q[3]);
        okTri(B.deck, A[3], Q[2], A[2]); okTri(B.deck, A[3], Q[3], Q[2]);
      }
      var a = rings[0], b = rings[rings.length - 1];
      okTri(B.hull, a[0], a[2], a[1]); okTri(B.hull, a[0], a[3], a[2]);
      okTri(B.hull, b[0], b[1], b[2]); okTri(B.hull, b[0], b[2], b[3]);
      /* the limber holes: a row low on the casing side [S3] */
      for (s = -1; s <= 1; s += 2) for (var d = 10; d < 88; d += 1.3) {
        if (d > 49.5 && d < 64.5) continue;
        var cw = tbl(G_CW, d) * 1.06, zh = tbl(G_TZ, d) + 0.05;
        box(B.dark, X(d) - 0.35, X(d) + 0.35, s * cw - 0.03, s * cw + 0.03, zh, zh + 0.32);
      }
    })();
    /* the sail [S1][S2][S3]: base d 51.4 - 63.1, top d 52.9 - 62.5 at 9.5 m, round nose, tapering tail,
       flat sides; the bridge cockpit at the forward top */
    finLoft(B.light, [[51.4, 63.1, 1.5, 0.5, 2.4], [52.0, 62.85, 1.48, 0.48, 6.0], [52.9, 62.5, 1.4, 0.42, 9.5]].map(function (l) { return [X(l[0]), X(l[1]), l[2], l[3], l[4]]; }), 8);
    box(B.dark, X(59.6), X(61.9), -0.85, 0.85, 9.42, 9.52);
    cyl(B.metal, [X(58.0), 0, 9.5], [X(58.0), 0, 12.6], 0.05, 0.03, 5);           /* the whip [S2] */
    cyl(B.metal, [X(58.0), 0, 10.1], [X(56.6), -0.6, 10.1], 0.03, 0.03, 4);
    /* guard rails on the casing fore and aft of the sail [S3] */
    for (s = -1; s <= 1; s += 2) [[66, 82], [30, 49]].forEach(function (r) {
      for (var d2 = r[0]; d2 <= r[1]; d2 += 2.0) box(B.metal, X(d2) - 0.03, X(d2) + 0.03, s * 1.55 - 0.03, s * 1.55 + 0.03, 2.6, 3.4);
      cyl(B.metal, [X(r[0]), s * 1.55, 3.4], [X(r[1]), s * 1.55, 3.4], 0.02, 0.02, 4);
    });
    /* the folding bow planes against the casing side, high forward [S3] */
    for (s = -1; s <= 1; s += 2) obox(B.light, [X(86.0), s * (tbl(G_CW, 86) * 1.12 + 0.02), 1.0], [1, 0, 0], [0, s, 0], [0, 0, 1], -1.2, 1.2, 0, 0.12, 0, 1.3);
    /* the BQR-2 chin dome under the bow [S3] */
    ellipsoid(B.boot, [X(86.2), 0, -4.25], 2.3, 1.05, 0.85, 4, 14);
    /* the stern [S3]: two shafts on struts, two screws, the stern planes abaft them, the rudder */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.metal, [X(14), s * 1.9, -2.7], [X(3.0), s * 2.1, -2.6], 0.14, 0.14, 8);
      cyl(B.metal, [X(5.5), s * 2.05, -2.6], [X(5.5), s * 1.2, -1.7], 0.08, 0.08, 5);
      screw(B.metal, X(2.8), s * 2.1, -2.6, 1.2, 4, s * 0.4);
      plate(B.light, X(0.3), X(2.0), X(0.5), X(1.7), [0, s * 0.4, -1.6], [0, s * 3.6, -1.6], 0.22);
    }
    plate(B.light, X(0.0), X(2.4), X(0.05), X(1.9), [0, 0, -1.4], [0, 0, -4.2], 0.25);
    /* the detail pass [S1][S2][S3]: the casing's slat lines and its hatches, cleats and the capstan, the
       sail's bridge windows, the housed periscope and mast tops, the step rungs up the sail's side, the
       navigation lights, the stern light, and the after rails carried round to the stern */
    for (var dl = 8; dl < 90; dl += 0.75) {
      if (dl > 51 && dl < 63.4) continue;
      var cwl = tbl(G_CW, dl), czl = tbl(G_CZ, dl);
      box(B.dark, X(dl) - 0.02, X(dl) + 0.02, -cwl + 0.08, cwl - 0.08, czl, czl + 0.012);
    }
    for (s = -1; s <= 1; s += 2) cyl(B.dark, [X(8), s * 0.6, tbl(G_CZ, 8) + 0.012], [X(90), s * 0.6, tbl(G_CZ, 90) + 0.012], 0.02, 0.02, 3);
    [[83.5, 1.1, 0.9, false], [76.0, 0.75, 0.75, true], [66.2, 0.75, 0.75, true], [47.5, 0.75, 0.75, true], [37.0, 1.1, 0.9, false], [24.0, 0.75, 0.75, true]].forEach(function (h) {
      hatch(B, X(h[0]), 0, tbl(G_CZ, h[0]), h[1], h[2], h[3]);
    });
    for (s = -1; s <= 1; s += 2) [88.5, 72.0, 34.0, 14.0].forEach(function (d) {
      var cz = tbl(G_CZ, d), yc = s * (tbl(G_CW, d) - 0.3);
      box(B.metal, X(d) - 0.25, X(d) + 0.25, yc - 0.05, yc + 0.05, cz, cz + 0.08);
      for (var q = -1; q <= 1; q += 2) box(B.metal, X(d) + q * 0.2 - 0.04, X(d) + q * 0.2 + 0.04, yc - 0.04, yc + 0.04, cz, cz + 0.2);
    });
    cylZ(B.metal, X(90.0), 0, tbl(G_CZ, 90) - 0.02, tbl(G_CZ, 90) + 0.3, 0.28, 12);
    sailWindows(B, X(63.1) - 1.5, 1.5, 8.85, 5, 1.6);
    mastTops(B, X(57.0), 9.5, [[1.6, 0, 0.6, 0.17], [0.4, 0, 0.45, 0.2], [-1.0, 0.25, 0.35, 0.14], [-2.2, -0.2, 0.3, 0.22]]);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 9; k++) box(B.metal, X(55.4) - 0.2, X(55.4) + 0.2, s * 1.47 - 0.02, s * 1.47 + 0.05 * s, 2.9 + k * 0.7, 2.94 + k * 0.7);
      box(B.light, X(62.0), X(62.5), s * 1.35 - 0.06, s * 1.35 + 0.06, 8.9, 9.15);         /* side lights */
      railLine(B.metal, [[X(30), s * 1.55, 2.6], [X(15), s * 1.4, tbl(G_CZ, 15)], [X(8), s * 1.0, tbl(G_CZ, 8)]], 0.8, 2.0);
      railLine(B.metal, [[X(82), s * 1.55, 2.6], [X(88), s * 1.3, tbl(G_CZ, 88)]], 0.8, 2.0);
    }
    cylZ(B.light, X(3.0), 0, tbl(G_CZ, 3.0) - 0.05, tbl(G_CZ, 3.0) + 0.5, 0.06, 6);
    /* team: two strips on the casing deck fore and aft of the sail */
    box(B.team, X(68.0), X(70.0), -0.7, 0.7, 2.6, 2.63);
    box(B.team, X(44.0), X(46.0), -0.7, 0.7, 2.6, 2.63);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ HAI LUNG: Zwaardvis derivative [Z1][Z2][Z3][Z4]
     L 66.9, d = metres forward of the screw's after face */
  var ZL = 66.9;
  function ZX(d) { return d - ZL / 2; }
  var Z_R = [[0.6, 0.35], [1.6, 0.65], [4, 1.45], [9, 2.6], [15, 3.5], [22, 4.0], [28, 4.2], [50, 4.2], [56, 4.05], [60, 3.7], [63, 3.0], [65.2, 2.0], [66.4, 1.0], [66.9, 0.15]];
  var ZC = -2.5;
  function buildHaiLung(THREE, M, C) {
    var T = materials(THREE, C, { hull: 0x232629, deck: 0x2c3033, boot: 0x232629, light: 0x2a2d30, dark: 0x0c0d0e, metal: 0x6e6450, rough: 0.72 });
    var g = new THREE.Group(), B = bins(T), s, k, X = ZX;
    var ds = [0.6, 1.0, 1.6, 2.6, 4, 6, 9, 12, 15, 18, 22, 28, 35, 42, 50, 56, 60, 62, 63.6, 64.8, 65.6, 66.2, 66.6, 66.9];
    /* the teardrop body: 8.4 m beam, axis 2.5 m under the water, surfaced crown 1.7 m over it [Z1][Z2] */
    bodyLoft(B, X, ds.map(function (d) { var r = tbl(Z_R, d); return { d: d, hw: r, zc: ZC, up: r, dn: r }; }), 22, 2.0, B.hull, B.boot);
    /* the narrow flat walkway on the crown d 34 - 61 [Z3][Z4] */
    (function () {
      var rings = [34, 40, 50, 56, 60, 61].map(function (d) {
        var r = tbl(Z_R, d), zt = ZC + Math.sqrt(Math.max(0, r * r - 0.81)) + 0.1;
        return [[X(d), -0.95, zt - 0.3], [X(d), 0.95, zt - 0.3], [X(d), 0.9, zt], [X(d), -0.9, zt]];
      });
      loft(B.deck, rings);
    })();
    /* slots: a row along the upper hull either side, d 24 - 60 [Z3][Z4] */
    for (s = -1; s <= 1; s += 2) for (var d = 24; d < 60; d += 1.6) {
      if (d > 34.5 && d < 47.5) continue;
      var r = tbl(Z_R, d), zz = 0.4, yy = Math.sqrt(Math.max(0, r * r - (zz - ZC) * (zz - ZC)));
      box(B.dark, X(d) - 0.4, X(d) + 0.4, s * yy - 0.06, s * yy + 0.04 * s, zz, zz + 0.12);
    }
    /* the fin [Z1][Z2][Z3]: base d 35.6 - 47.2, top d 37.0 - 46.5 at 6.5 m, round nose, tapering tail */
    finLoft(B.light, [[35.6, 47.2, 1.2, 0.35, 1.2], [36.3, 46.9, 1.2, 0.33, 4.0], [37.0, 46.5, 1.15, 0.3, 6.5]].map(function (l) { return [X(l[0]), X(l[1]), l[2], l[3], l[4]]; }), 8);
    box(B.dark, X(42.0), X(45.3), -0.45, 0.45, 6.45, 6.55);
    /* the fin planes, high on the fin near its leading edge, 7.6 m span [Z1][Z2] */
    for (s = -1; s <= 1; s += 2) plate(B.light, X(43.9), X(46.2), X(44.2), X(45.8), [0, s * 1.0, 4.5], [0, s * 3.8, 4.5], 0.3);
    /* the cruciform tail [Z3][Z4]: upper and lower rudders and the two stern planes, one five-bladed screw */
    var zr = ZC;
    plate(B.light, X(1.4), X(5.4), X(1.7), X(4.1), [0, 0, zr + 1.2], [0, 0, zr + 3.9], 0.3);
    plate(B.light, X(1.4), X(5.4), X(1.7), X(4.1), [0, 0, zr - 1.2], [0, 0, zr - 3.9], 0.3);
    for (s = -1; s <= 1; s += 2) plate(B.light, X(1.4), X(5.4), X(1.7), X(4.1), [0, s * 1.2, zr], [0, s * 3.9, zr], 0.3);
    screw(B.metal, X(0.36), 0, zr, 1.7, 5, 0.3);
    /* the detail pass [Z1][Z2][Z3][Z4]: the walkway's tread lines, its hatches and the retractable cleats,
       the fin's bridge windows and the housed mast tops, rungs up the fin, the fin's side lights, the
       three retractable cleats a side (housed masts drawn just proud of the fin top, as [Z1] shows) */
    for (var dw = 34.5; dw < 61; dw += 0.6) {
      if (dw > 35.2 && dw < 47.6) continue;
      var rw = tbl(Z_R, dw), zw = ZC + Math.sqrt(Math.max(0, rw * rw - 0.81)) + 0.1;
      box(B.dark, X(dw) - 0.02, X(dw) + 0.02, -0.85, 0.85, zw, zw + 0.01);
    }
    [[57.0, 0.8, 0.8, true], [51.0, 0.75, 0.75, true], [33.0, 0.8, 0.8, true], [25.0, 1.0, 0.75, false]].forEach(function (h) {
      var rh = tbl(Z_R, h[0]), zh = ZC + Math.sqrt(Math.max(0, rh * rh - 0.36)) + (h[0] > 34 && h[0] < 61 ? 0.1 : 0);
      hatch(B, X(h[0]), 0, zh, h[1], h[2], h[3]);
    });
    sailWindows(B, X(46.5) - 1.15, 1.15, 5.95, 5, 1.6);
    mastTops(B, X(42.0), 6.5, [[1.9, 0, 0.12, 0.16], [0.8, 0, 0.1, 0.2], [-0.4, 0.2, 0.08, 0.14], [-1.6, -0.2, 0.08, 0.2], [-2.9, 0, 0.06, 0.18]]);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 7; k++) box(B.metal, X(38.4) - 0.18, X(38.4) + 0.18, s * 1.16 - 0.02, s * 1.16 + 0.05 * s, 1.6 + k * 0.65, 1.64 + k * 0.65);
      box(B.light, X(45.6), X(46.0), s * 0.95 - 0.06, s * 0.95 + 0.06, 5.9, 6.1);
      [52.0, 44.0, 30.0].forEach(function (d) {
        var r = tbl(Z_R, d), zc2 = 0.75, yy = Math.sqrt(Math.max(0, r * r - (zc2 - ZC) * (zc2 - ZC)));
        box(B.metal, X(d) - 0.2, X(d) + 0.2, s * (yy - 0.08) - 0.05, s * (yy - 0.08) + 0.05, zc2, zc2 + 0.12);
      });
    }
    box(B.team, X(38.5), X(40.5), -0.5, 0.5, 6.5, 6.53);
    box(B.team, X(52.0), X(54.0), -0.5, 0.5, ZC + 4.2 + 0.08, ZC + 4.2 + 0.1);
    flush(THREE, g, B);
    return g;
  }

  return { haiOu: buildHaiOu, kuangHua6: buildKH6, lungChiang: buildLungChiang, chinChiang: buildChinChiang,
           tuoChiang: buildTuoChiang, haiShih: buildHaiShih, haiLung: buildHaiLung };
})();

/* Hai Ou: one builder for the three rows (the same fifty boats; no difference between them is shown) */
UNIT_MODELS["roc_e60_missileboat"] = { len: 21.6, build: function (THREE, M, C) { return HeroRocShips2.haiOu(THREE, M, C); } };
UNIT_MODELS["roc_e80_missileboat"] = { len: 21.6, build: function (THREE, M, C) { return HeroRocShips2.haiOu(THREE, M, C); } };
UNIT_MODELS["roc_e90_missileboat"] = { len: 21.6, build: function (THREE, M, C) { return HeroRocShips2.haiOu(THREE, M, C); } };
UNIT_MODELS["roc_e00_missileboat"] = { len: 34.2, build: function (THREE, M, C) { return HeroRocShips2.kuangHua6(THREE, M, C); } };
UNIT_MODELS["roc_e80_corvette"] = { len: 50.1, build: function (THREE, M, C) { return HeroRocShips2.lungChiang(THREE, M, C); } };
UNIT_MODELS["roc_e90_corvette"] = { len: 61.4, build: function (THREE, M, C) { return HeroRocShips2.chinChiang(THREE, M, C); } };
UNIT_MODELS["roc_e00_corvette"] = { len: 60.4, build: function (THREE, M, C) { return HeroRocShips2.tuoChiang(THREE, M, C); } };
UNIT_MODELS["roc_e60_sub"] = { len: 93.6, build: function (THREE, M, C) { return HeroRocShips2.haiShih(THREE, M, C); } };
/* Hai Lung: one builder for the three rows; the references show no outside difference, so no VARIANTS */
UNIT_MODELS["roc_e80_sub"] = { len: 66.89, build: function (THREE, M, C) { return HeroRocShips2.haiLung(THREE, M, C); } };
UNIT_MODELS["roc_e90_sub"] = { len: 66.89, build: function (THREE, M, C) { return HeroRocShips2.haiLung(THREE, M, C); } };
UNIT_MODELS["roc_e00_sub"] = { len: 66.89, build: function (THREE, M, C) { return HeroRocShips2.haiLung(THREE, M, C); } };
