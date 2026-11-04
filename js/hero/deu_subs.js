/* ==================== js/hero/deu_subs.js ===========================
   HERO MODELS -- West German / German navy submarines and the Type 520 landing craft, one
   self-contained module (HeroDeuSubs) with five builders; the geometry kit is copied from
   js/hero/roc_ships2.js (itself the ru_osa_boat.js kit), the conventions from ru_kilo.js
   (waterline at the surfaced trim, true length in len) and us_lcu1610.js (landing craft).

   ROWS (eras.js / rules.js names) AND BUILDERS
     deu_e50_sub   "Hai (Type XXIII)"  U-Hai (S170), raised and rebuilt Type XXIII  -> hai()
     deu_e60_sub   "Type 205"          U-1 (S180)                                    -> t205()
     deu_e80_sub   "Type 206"          U-13 (S192)                                   -> t206("t206")
     deu_e90_sub   "Type 206A"         U-15 (S194)                                   -> t206("t206a")
     deu_e00_sub   "Type 212A"         U-31 (S181)                                   -> t212()
     sub_g         "Type 212A"         the same boat (rules.js), the same build      -> t212()
     deu_e60_lst   "Barbe Landing Craft", Type 520 Barbe-class utility landing craft -> barbe()
   The 206 and 206A share one builder. VARIANTS holds only what a reference shows to differ:
   the screw (five blades on the 206, seven on the 206A: en.wikipedia infobox) and the paint
   (the 1970s colour photograph [U18] is a dark grey, the 2007 photograph [U17] black).
   REUSE CHECKED: js/hero has no Type XXIII, 205, 206, 212 or Type 520 build; roc_ships2.js's
   Hai Lung is a Zwaardvis derivative and us_lcu1610.js the US LCU 1610, different hulls. Each
   hull here is drawn new.

   REFERENCES (Wikimedia Commons, fetched one at a time through thumb.php into the scratchpad
   q_deusubs_ref; d = metres forward of the after end throughout, px = the drawing as fetched):
     [X1] "Tipo XXIII.svg" at 1920 px: side elevation AND plan of the Type XXIII with a 0 - 30 m
          scale bar, 52.8 px/m; 34.66 m over 1830 px (published 34.68). The master for Hai: hull
          top and keel column by column, the plan half-breadths, the low exhaust fairing abaft the
          fin, the fin with its sloped top and pointed plan, the standard, the wooden walkway, the
          two vents on the foredeck, the keel box under the bow and the stem, the rudder frame with
          the screw in its window, the stern planes and stabilisers, the bow planes (low).
     [X2] "Bundesarchiv Bild 146-2008-0212, Uboot Hecht (S 171, ex U 2367 b).jpg": Hai's sister
          Hecht in service, bow quarter: the same fin and fairing as [X1], the casing a hand's
          breadth out of the water, light paint, one tall mast raised out of frame, a flagstaff.
     [F1] "Type 205 submarine.svg" at 1920 px: side elevation of the 205, 1904 px over the
          published 44.30 m (42.98 px/m). The master for the 205: hull, the two-tier fin, the
          four masts, the foredeck hump, the raised casing ahead of the fin, the housed bow plane,
          the box rudder, skeg and stern plane, the screw behind the cone.
     [F2] "German submarine U-9 in Speyer.JPG": U-9 (205) ashore, from the port bow: the flat
          blunt bow with four tube shutters a side, the round section, the housed bow plane, the
          hump forward, the fin; the stern planes with their upright end tubes, the rudder, a
          four-bladed screw.
     [S1] "Type 206A submarine.svg" at 1920 px: side elevation of the 206A, 1905 px over the
          published 48.49 m (39.29 px/m). The master for the 206/206A: hull with the raised bow
          sonar casing, the fin (low fairing, the high after block, the lower forward block with
          its round nose), the mast row, the small fin on the bow casing, the stern -- dorsal fin
          over the screw, the long skeg, the box rudder aft of the screw, the post between them.
     [S2] "U17KielerWoche2.jpg": U-15 (206A) at Kiel 2007: the fin's round nose and the lip round
          its top, black paint.
     [S3] "Bundesarchiv Bild 146-2008-0208, Uboot U 18 (S 197).jpg": U-18 (206) at sea in the
          1970s: the same stepped fin, the lip, dark grey paint, one mast raised.
     [T1] "Type 212 submarine.svg" at 1920 px: side elevation of the 212A, 1907 px over the
          published 56.0 m (34.05 px/m). The master for the 212A: hull, the keel strip, the fin
          with its big fillet forward and stepped after edge, the fin planes, the mast housings and
          the two raised aerials, the bridge window, the long flank-array fairing low on the side,
          the X tail in projection, the skewed screw.
     [T2] "U 34 in Fahrt.jpg": U-34 (212A) from the air, starboard bow: the wide rounded deck,
          the fin flaring into the hull, the planes high on the fin, purple-grey paint, about 1.9 m
          of freeboard, the upper X-tail fin tip clear of the water.
     [B1] "L769Zander Goetz-von-Mannheim Marinekameradschaft Hafenkran.jpg" (museum craft Zander,
          port side, near side-on): 1038 px over the published 40 m (25.95 px/m), the master for
          Barbe: the low stern platform, the sheer 2.85 m aft to 2.6 m at the bow, the raked bow
          (2.8 m of rake over 2.25 m), the starboard deckhouse d 11.6 - 23.3 (roof 4.55 m) and the
          wheelhouse d 23.3 - 26.8 (roof 6.3 m), the raft canisters d 15.4 - 22.7, the rubbing
          strake, the side scuttles.
     [B2] "MZL auf Abwegen.jpg" (Stoer beached, port bow, 1960s): the raised ramp IS the bow, with
          two grids of openings and a rounded lower lip; the wing walls either side; the wheelhouse
          on its deckhouse with a pole mast and yard, rails round its top; the jackstaff.
     [B3] "LCU Class520-Lachs-L762-20210202 1.jpg" (Lachs, starboard bow, ramp down): the wing
          blocks either side of the ramp with rails on top, the wheelhouse on the STARBOARD side
          forward of amidships, the railed platform ahead of it, the black boot-top.
     [B4] "Landungsboot LACHS (L 762) (Kiel 53.364).jpg" (bow-on, ramp down): the ramp opening
          about 4.9 m of the 8.8 m beam, the wheelhouse over the starboard wall.
     [B5] "Schlei.jpg": the wheelhouse from the side and the covered 20 mm on its pedestal just
          ahead of it on the starboard wall.
     [B6] "MZL 2.jpg", "MZL 17.jpg" (well deck forward and aft): the walls either side of the well.
   PUBLISHED FIGURES (en.wikipedia raw pages): Type XXIII 34.68 x 3.02 m, draught 3.66 m.
     Type 205 44.30 x 4.59 m, draught 3.80 m. Type 206A 48.49 x 4.58 m, draught 4.30 m, "single
     five (Type 206) or seven (Type 206A) blade propeller". Type 212A 56 x 6.80 m, draught 6.40 m,
     seven-blade skewback screw. Barbe class 40 x 8.8 m, draught 2.1 m. XXIII: "single
     three-bladed propeller ... single rudder", figure-of-eight hull.

   MEASURED (dump.js, L x beam x height keel-to-top) against the figures:
     Hai        34.66 x 4.00 x 12.3  (34.68 x 3.02 published: the hull is 3.02, the 4.0 is over the bow
                                      planes; draught 3.66 as published, fin top 4.1 m, the raised mast
                                      8.65 m over the water -- its length assumed, see NOT CONFIRMED)
     Type 205   44.32 x 4.94 x 12.3  (44.30 x 4.59: hull 4.59, the 4.94 over the stern-plane end tubes;
                                      draught 3.8, the whip top 8.5 m over the water)
     Type 206/A 48.49 x 4.60 x 12.7  (48.49 x 4.58; draught 4.3, the whip top 8.4 m)
     Type 212A  56.00 x 6.80 x 21.3  (56 x 6.80; draught 6.4 to the keel strip; the two aerials raised
                                      as [T1] draws them reach 14.9 m, the fin top 5.2 m)
     Barbe      40.00 x 9.04 x 15.9  (40 x 8.8: the hull 8.8, 9.04 over the rubbing strakes; draught 2.1
                                      as published, the mast top 13.8 m over the water)
   No height was fitted: every height comes off the drawing or photograph at the scale the published
   length gives; the waterline is put at the published draught over the drawn keel.

   NOT CONFIRMED (drawn plainly, or as noted):
     - All boats: no plan view except [X1], so the 205, 206 and 212A sections are taken round to the
       published beam (superellipse, the 212A a squarer one: "prismatic" in the article); fin widths
       (205 0.95 / 0.7 m, 206 0.95 / 0.78 m, 212A 1.7 m at the fillet to 0.95 m) are estimates from
       [F2], [S2], [T2]. Hai's lower hull lobe is narrowed 30 % for the figure-of-eight section, an
       estimate. Underwater colour: the hull colour all over (no photograph shows it afloat).
     - Hai: the paint tone (only B&W photographs); the raised mast height (out of frame in [X2],
       drawn 4 m over the standard); the stern-plane and stabiliser heights (plan only).
     - 205: the stern-plane span (2.3 m from the axis) and end tubes from the oblique [F2]; screw
       blades (four, as [F2] seems to show).
     - 206/206A: the screw diameter (1.6 m, the drawing shows it nearly edge-on); the stern-plane
       span (as the 205); the bow sonar casing is drawn on both, from the 206A drawing -- no
       reference shows a 206's bow. The 206 and 206A periscopes differ in service ("new periscopes")
       but no reference shows how, so both carry the [S1] mast row.
     - 212A: the X-tail span and the fin-plane span (2.6 m from the centreline) are read off the
       side view and [T2] only; the screw diameter 3.5 m (the drawing).
     - Barbe: the well-deck height (0.55 m), the wall thickness (1.95 m a side, so the well is the
       ramp's 4.9 m), the bottom (flat at the published 2.1 m draught, raked forefoot) and the
       deckhouse width (2.6 m; the wheelhouse 2.9 m) are estimates; NO screws or rudders are drawn
       (no reference shows them). The raft canisters sit on the port wall, as [B1] places them in
       front of the deckhouse. Radar: none (the 1960s fit of [B2]; [B3] is a 2021 refit).
   No hull numbers, names, flags, ensigns or badges anywhere.

   PAINT (sampled, taken to about 0.7 of the sunlit value): Hai 0x7b7f7e (B&W, estimated);
   205 0x38373a ([F2], weathered museum black); 206 0x3a393a ([S3]); 206A 0x262729 ([S2]);
   212A 0x4a4753 ([T2], purple-grey); Barbe 0x7d8993 ([B3], [B1]) over a black boot-top band.
   Team colour: small strips on the fin top and the casing / wheelhouse roof and wing tops.

   NODES: none of these rows is turret:true; nothing here is named. The Barbe's 20 mm is fixed.
   MODEL SPACE: +X bow, +Y port, +Z up, metres, waterline z = 0 (the submarines at their surfaced
   trim); everything baked, one mesh per material. ASCII only. Load after js/sub_specs.js and
   js/warship_specs.js (they register the era stand-ins for these keys).
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroDeuSubs = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI;

  /* ------------------------------------------------------------ geometry kit (the roc_ships2.js kit) */
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
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg || 8); }
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
  function ellipsoid(bin, C, rx, ry, rz, rings, seg) {
    var i, k, R = [], NR = [];
    for (i = 0; i <= rings; i++) {
      var a = -PI / 2 + PI * i / rings, ca = Math.cos(a), sa = Math.sin(a), ring = [], nr = [];
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
  }
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
  /* a side-profile outline (pairs [x, z], convex) extruded across y0..y1 */
  function sideExt(bin, pts, y0, y1) {
    loft(bin, [pts.map(function (p) { return [p[0], y0, p[1]]; }), pts.map(function (p) { return [p[0], y1, p[1]]; })]);
  }
  /* a control surface: a thin tapered plate from root (chord xa..xb at P0) to tip (chord ta..tb at P1) */
  function plate(bin, xa, xb, ta, tb, P0, P1, t) {
    var n = unit(cross([1, 0, 0], sub(P1, P0))), h = (t || 0.25) / 2;
    hexa(bin, [[xa, P0[1] - n[1] * h, P0[2] - n[2] * h], [xb, P0[1] - n[1] * h, P0[2] - n[2] * h], [tb, P1[1] - n[1] * h * 0.5, P1[2] - n[2] * h * 0.5], [ta, P1[1] - n[1] * h * 0.5, P1[2] - n[2] * h * 0.5],
               [xa, P0[1] + n[1] * h, P0[2] + n[2] * h], [xb, P0[1] + n[1] * h, P0[2] + n[2] * h], [tb, P1[1] + n[1] * h * 0.5, P1[2] + n[2] * h * 0.5], [ta, P1[1] + n[1] * h * 0.5, P1[2] + n[2] * h * 0.5]]);
  }
  /* a screw: hub on the X axis at (x, y, z), nb blades of radius r */
  function screw(bin, x, y, z, r, nb, ph) {
    cyl(bin, [x - 0.35, y, z], [x + 0.35, y, z], r * 0.18, r * 0.22, 10);
    for (var k = 0; k < nb; k++) {
      var an = k / nb * TAU + (ph || 0), cy = Math.cos(an), cz = Math.sin(an);
      var tv = unit([0.45, -cz * 0.9, cy * 0.9]), tu = cross(tv, [0, cy, cz]);
      obox(bin, [x, y, z], tu, tv, [0, cy, cz], -0.04, 0.04, -r * 0.24, r * 0.24, r * 0.15, r);
    }
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

  /* ------------------------------------------------------------ canvas paint (the roc_ships2.js kit) */
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
    var R = rng(5205), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#8a949a" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 3) * m, (0.3 + R() * 1.0) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 16; k++) {
      var y = Math.round(k * m);
      g.fillStyle = "rgba(70,80,86,0.16)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.16)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 7; i++) { var x = Math.round(((i * 2.5 + (k % 2) * 1.25) % 16) * m); g.fillStyle = "rgba(70,80,86,0.13)"; g.fillRect(x, y, 1.5, m); }
    }
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
  }
  /* deck: painted plate, seams every 1.5 x 2 m, scuffed walkways */
  function drawDeck(g, S) {
    var R = rng(5206), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(30,30,30,0.26)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
    for (i = 0; i < 40; i++) { g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = "#ffffff"; g.fillRect(R() * S, R() * S, (0.5 + R()) * m, 0.3 * m); }
    g.globalAlpha = 1;
  }
  /* materials from a palette: hull, deck, boot (boot-top band), dark (recesses, shutters, windows),
     metal (masts, rails), light (bright periscopes / raft canisters), glass, bronze (screws),
     team (C.team exactly as handed in) */
  function materials(THREE, C, P) {
    var plate = canvasTex(THREE, "dsplate", drawPlate), deckT = canvasTex(THREE, "dsdeck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(P.hull, P.rough || 0.8, 0.08, plate),
      deck: mk(P.deck, 0.9, 0.04, deckT),
      boot: mk(P.boot === undefined ? P.hull : P.boot, 0.86, 0.04),
      dark: mk(P.dark || 0x0d0e0f, 0.78, 0.25),
      metal: mk(P.metal || 0x3c3f42, 0.5, 0.55),
      light: mk(P.light || 0x8a8f93, 0.5, 0.45),
      glass: mk(0x141c22, 0.15, 0.4),
      bronze: mk(0x8a7140, 0.42, 0.7),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }
  var BIN_NAMES = ["hull", "deck", "boot", "dark", "metal", "light", "glass", "bronze", "team"];
  function bins(T) { var B = {}; BIN_NAMES.forEach(function (n) { B[n] = new Bin(T[n]); }); return B; }

  /* ------------------------------------------------------------ submarine kit
     A drawing is read as rows [px x, px top, px keel, half-breadth m (or null: round)] and turned
     into stations {d, zt, zb, hw}: d = (x - X0) / S, z = (YW - y) / S with YW the waterline,
     put at the published draught over the drawn keel. */
  function stations(D) {
    return D.rows.map(function (r) {
      var zt = (D.YW - r[1]) / D.S, zb = (D.YW - r[2]) / D.S;
      var hw = r[3] !== null && r[3] !== undefined ? r[3] : Math.min(D.HB, (zt - zb) / 2);
      return { d: (r[0] - D.X0) / D.S, zt: zt, zb: zb, hw: hw };
    });
  }
  function stAt(st, d) {
    if (d <= st[0].d) return st[0];
    for (var i = 1; i < st.length; i++) if (d <= st[i].d) {
      var a = st[i - 1], b = st[i], t = (d - a.d) / ((b.d - a.d) || 1);
      return { d: d, zt: lerp(a.zt, b.zt, t), zb: lerp(a.zb, b.zb, t), hw: lerp(a.hw, b.hw, t) };
    }
    return st[st.length - 1];
  }
  /* the section: a superellipse (exponent nE) on its own centre, the lower half narrowed by k
     toward the keel (the XXIII's figure-of-eight) */
  function secPt(q, a, nE, k) {
    var c = Math.cos(a), s = Math.sin(a), e = 2 / nE, zc = (q.zt + q.zb) / 2, h = (q.zt - q.zb) / 2;
    var y = q.hw * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e) * (s < 0 ? 1 - k * Math.abs(s) : 1);
    return [y, zc + h * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), e)];
  }
  /* half-breadth of the hull at (d, z) */
  function halfAt(st, d, z, nE, k) {
    var q = stAt(st, d), zc = (q.zt + q.zb) / 2, h = (q.zt - q.zb) / 2, v = (z - zc) / h;
    if (Math.abs(v) >= 1) return 0;
    var s = Math.pow(Math.abs(v), nE / 2);
    return q.hw * Math.pow(1 - Math.pow(Math.abs(v), nE), 1 / nE) * (v < 0 ? 1 - k * s : 1);
  }
  /* the body: rings at the stations (plus fill-ins), capped both ends */
  function bodyLoft(bin, X, st, seg, nE, k, step) {
    var ds = [], i, d;
    for (i = 0; i < st.length; i++) {
      ds.push(st[i].d);
      if (i + 1 < st.length) for (d = st[i].d + step; d < st[i + 1].d - step * 0.5; d += step) ds.push(d);
    }
    var rings = ds.map(function (dd) {
      var q = stAt(st, dd), r = [], j;
      for (j = 0; j < seg; j++) { var p = secPt(q, j / seg * TAU, nE, k); r.push([X(dd), p[0], p[1]]); }
      return r;
    });
    loft(bin, rings);
  }
  /* fin / fairing plan at one level: half-width hw with an elliptic after end over la metres and a
     round (pt false) or pointed (pt true) fore end over lf metres; CCW from above */
  function finRing(X, L, n) {
    var xa = L.xa, xf = L.xf, P = [], i, xs = [];
    for (i = 0; i <= n; i++) xs.push(xa + (xf - xa) * (0.5 - 0.5 * Math.cos(PI * i / n)));
    function w(x) {
      var a = x - xa, f = xf - x, v = 1;
      if (a < L.la) v = Math.min(v, Math.sqrt(Math.max(0, 1 - Math.pow(1 - a / L.la, 2))));
      if (f < L.lf) v = Math.min(v, L.pt ? f / L.lf : Math.sqrt(Math.max(0, 1 - Math.pow(1 - f / L.lf, 2))));
      return Math.max(0.015, L.hw * v);
    }
    for (i = 0; i <= n; i++) P.push([X(xs[i]), -w(xs[i]), L.z]);
    for (i = n; i >= 0; i--) P.push([X(xs[i]), w(xs[i]), L.z]);
    return P;
  }
  function finLoft(bin, X, levels, n) { loft(bin, levels.map(function (L) { return finRing(X, L, n || 14); })); }

  /* ============================================================ HAI: Type XXIII [X1][X2]
     52.8 px/m, the after edge of the rudder at x 36 px, the waterline at y 317.8 px
     (the published 3.66 m draught over the drawn keel at y 511). */
  var HAI = { S: 52.8, X0: 36, YW: 511 - 3.66 * 52.8, HB: 1.51, rows: [
    [145, 314, 494, 0.18], [190, 310, 499, 0.38], [240, 306, 503, 0.58], [280, 303, 505, 0.76],
    [320, 300, 507, 0.92], [360, 298, 508, 1.08], [400, 296, 508, 1.23], [440, 294, 509, 1.35],
    [480, 293, 510, 1.47], [520, 293, 511, 1.51], [1000, 292, 511, 1.51], [1590, 292, 511, 1.49],
    [1630, 292, 511, 1.42], [1690, 292, 511, 1.25], [1745, 292, 511, 1.06], [1752, 292, 470, 1.0],
    [1790, 292, 454, 0.71], [1830, 292, 439, 0.37], [1850, 294, 429, 0.19], [1860, 298, 419, 0.09],
    [1866, 306, 410, 0.03]] };
  function buildHai(THREE, M, C) {
    var D = HAI, S = D.S, L = (1866 - 36) / S;
    var T = materials(THREE, C, { hull: 0x7b7f7e, deck: 0x55524c, dark: 0x1a1b1c, metal: 0x505456, light: 0x8e9396, rough: 0.78 });
    var g = new THREE.Group(), B = bins(T), s, k;
    function X(d) { return d - L / 2; }
    function px(x) { return X((x - D.X0) / S); }                 /* drawing x -> model x */
    function pz(y) { return (D.YW - y) / S; }                    /* drawing y -> model z */
    var st = stations(D), NE = 2.2, KK = 0.3;
    /* the hull: tall in the side view, narrow in the plan, the lower lobe narrower [X1] */
    bodyLoft(B.hull, X, st, 22, NE, KK, 1.2);
    /* the wooden walkway on the foredeck, 0.72 m wide (plan [X1] x 1025 - 1585) */
    box(B.deck, px(1025), px(1585), -0.36, 0.36, pz(293), pz(287));
    /* the two vents on the foredeck [X1] x 1605, 1628 */
    [1605, 1628].forEach(function (x) { cylZ(B.metal, px(x), 0, pz(294), pz(274), 0.17, 10); });
    /* the exhaust fairing abaft the fin: low, round-ended, 1.3 m over the water [X1] */
    finLoft(B.hull, X, [[533, 300], [540, 286], [560, 267], [580, 254], [600, 249]].map(function (r) {
      return { xa: (r[0] - D.X0) / S, xf: (900 - D.X0) / S, hw: 0.59, z: pz(r[1]), la: 0.7, lf: 0.2, pt: false };
    }));
    /* the fin: upright after face at x 752, top sloping from y 127 to 103, pointed fore end [X1] */
    finLoft(B.hull, X, [[752, 300], [752, 140], [760, 127], [800, 115], [850, 105], [890, 103]].map(function (r) {
      return { xa: (r[0] - D.X0) / S, xf: (1032 - D.X0) / S, hw: 0.82, z: pz(r[1]), la: 0.35, lf: 1.36, pt: true };
    }));
    box(B.dark, px(925), px(1005), -0.5, 0.5, pz(103) - 0.05, pz(103) + 0.01);        /* the bridge well */
    for (s = -1; s <= 1; s += 2) {
      [805, 827, 848].forEach(function (x) {                                        /* three scuttles [X1] */
        box(B.dark, px(x) - 0.13, px(x) + 0.13, s * 0.82 - 0.03, s * 0.82 + 0.03, pz(146) - 0.13, pz(146) + 0.13);
      });
      box(B.dark, px(942), px(1000), s * 0.8 - 0.03, s * 0.8 + 0.03, pz(150), pz(137));  /* the slot */
      box(B.dark, px(882), px(910), s * 0.82 - 0.03, s * 0.82 + 0.03, pz(300), pz(275)); /* the low hatch */
    }
    for (k = 0; k < 6; k++) box(B.metal, px(1030), px(1036), -0.2, 0.2, pz(120 + k * 20) - 0.03, pz(120 + k * 20) + 0.03); /* rungs */
    /* the periscope standard [X1] and the mast raised in [X2] (its top out of frame: 4 m drawn) */
    cyl(B.hull, [px(871), 0, pz(110)], [px(873), 0, pz(72)], 0.26, 0.18, 12);
    cylZ(B.light, px(873), 0, pz(72), pz(72) + 4.0, 0.07, 8);
    cylZ(B.metal, px(990), 0.4, pz(103), pz(103) + 1.6, 0.03, 5);                      /* the flagstaff [X2] */
    /* the stern [X1]: the rudder blade aft, the frame round the screw window, one three-bladed screw */
    sideExt(B.hull, [[px(36), pz(332)], [px(62), pz(332)], [px(62), pz(472)], [px(36), pz(472)]], -0.09, 0.09);
    sideExt(B.hull, [[px(36), pz(332)], [px(150), pz(318)], [px(150), pz(347)], [px(36), pz(347)]], -0.09, 0.09);
    sideExt(B.hull, [[px(36), pz(462)], [px(150), pz(462)], [px(150), pz(494)], [px(36), pz(482)]], -0.09, 0.09);
    cyl(B.metal, [px(125), 0, pz(404)], [px(160), 0, pz(404)], 0.1, 0.1, 8);
    screw(B.bronze, px(122), 0, pz(404), 0.85, 3, 0.4);
    var zs = pz(404);
    for (s = -1; s <= 1; s += 2) {
      plate(B.hull, px(145), px(200), px(147), px(198), [0, s * 0.3, zs], [0, s * 1.79, zs], 0.14);   /* stern planes */
      plate(B.hull, px(238), px(285), px(250), px(262), [0, s * 0.5, zs], [0, s * 2.0, zs], 0.12);   /* stabilisers */
      /* the bow planes, low on the bow (side y 448, plan to 2.0 m) [X1] */
      plate(B.hull, px(1680), px(1745), px(1695), px(1735), [0, s * 1.0, pz(448)], [0, s * 2.0, pz(448)], 0.12);
    }
    /* team: a strip on the walkway forward and one on the fin top aft */
    box(B.team, px(1300), px(1360), -0.36, 0.36, pz(287), pz(287) + 0.03);
    box(B.team, px(775), px(840), -0.45, 0.45, pz(118), pz(118) + 0.05);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ TYPE 205 [F1][F2]
     42.98 px/m (44.30 m over 1904 px), the screw tip at x 8, the waterline at the published
     3.80 m draught over the drawn keel (y 538). */
  var F205 = { S: 1904 / 44.3, X0: 8, YW: 538 - 3.8 * 1904 / 44.3, HB: 2.295, rows: [
    [50, 437, 457, null], [80, 431, 461.5, null], [120, 420, 468, null], [160, 409, 474, null],
    [200, 399, 480, null], [260, 386, 491, null], [300, 379, 508, null], [340, 373, 527, null],
    [360, 370, 538, null], [400, 366, 538, null], [480, 357, 538, null], [560, 348, 538, null],
    [640, 339, 538, null], [680, 335, 538, null], [1620, 335, 538, null], [1640, 335, 532, null],
    [1880, 335, 530, null], [1900, 336, 516, 2.1], [1912, 345, 505, 1.75]] };
  function buildT205(THREE, M, C) {
    var D = F205, S = D.S, L = 44.3;
    var T = materials(THREE, C, { hull: 0x38373a, deck: 0x2e2e30, dark: 0x0c0c0d, metal: 0x2a2b2d, light: 0x8a8f93, rough: 0.74 });
    var g = new THREE.Group(), B = bins(T), s, k;
    function X(d) { return d - L / 2; }
    function px(x) { return X((x - D.X0) / S); }
    function pz(y) { return (D.YW - y) / S; }
    var st = stations(D), NE = 2.25;
    bodyLoft(B.hull, X, st, 24, NE, 0, 1.4);
    /* the raised casing ahead of the fin, x 1270 - 1585 at y 325 [F1] */
    box(B.deck, px(1270), px(1585), -0.7, 0.7, pz(336), pz(325));
    /* the hump on the foredeck, x 1585 - 1710 to y 307, round after end [F1][F2] */
    finLoft(B.hull, X, [[336, 0.9], [318, 0.88], [309, 0.8], [307, 0.7]].map(function (r) {
      return { xa: (1585 - D.X0) / S, xf: (1712 - D.X0) / S, hw: r[1], z: pz(r[0]), la: 0.6, lf: 0.35, pt: false };
    }));
    /* the fin: the low fairing (x 740 - 1300, top y 259) and the upper fin (x 912 - 1222, top 160) [F1] */
    finLoft(B.hull, X, [[345, 740, 1302], [329, 745, 1300], [311, 760, 1297], [294, 780, 1293], [281, 800, 1282],
                        [270, 820, 1272], [262, 840, 1262], [259, 860, 1245]].map(function (r) {
      return { xa: (r[1] - D.X0) / S, xf: (r[2] - D.X0) / S, hw: 0.95, z: pz(r[0]), la: 0.8, lf: 0.9, pt: false };
    }));
    finLoft(B.hull, X, [[262, 912, 1222], [175, 912, 1222], [165, 913, 1215], [160, 914, 1200]].map(function (r) {
      return { xa: (r[1] - D.X0) / S, xf: (r[2] - D.X0) / S, hw: 0.7, z: pz(r[0]), la: 0.2, lf: 0.7, pt: false };
    }));
    box(B.hull, px(1165), px(1212), -0.6, 0.6, pz(160), pz(146));                  /* the bridge screen */
    box(B.dark, px(1120), px(1160), -0.45, 0.45, pz(160) - 0.04, pz(160) + 0.01);  /* the bridge well */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, px(1068), px(1078), s * 0.7 - 0.03, s * 0.7 + 0.03, pz(235), pz(185));   /* side recesses [F1] */
      box(B.dark, px(1103), px(1120), s * 0.7 - 0.03, s * 0.7 + 0.03, pz(235), pz(185));
      box(B.dark, px(898), px(918), s * 0.95 - 0.03, s * 0.95 + 0.03, pz(330), pz(288));    /* fairing door */
      box(B.dark, px(1070), px(1088), s * 0.95 - 0.03, s * 0.95 + 0.03, pz(310), pz(272));
      box(B.dark, px(1104), px(1122), s * 0.95 - 0.03, s * 0.95 + 0.03, pz(310), pz(272));
    }
    /* the masts [F1]: snorkel tube, the light periscope with its head, a thin mast, the whip */
    cylZ(B.metal, px(996), 0, pz(160), pz(55), 0.1, 8);
    box(B.metal, px(990), px(1003), -0.12, 0.12, pz(58), pz(52));
    cylZ(B.light, px(1040), 0, pz(160), pz(20), 0.12, 10);
    cylZ(B.metal, px(1040), 0, pz(22), pz(8), 0.09, 8);
    cylZ(B.light, px(1060), 0, pz(160), pz(45), 0.07, 8);
    cyl(B.light, [px(1101), 0, pz(160)], [px(1101), 0, pz(12)], 0.12, 0.02, 8);
    /* four tube shutters a side on the flat bow [F2] */
    var xb = px(1912);
    for (s = -1; s <= 1; s += 2) [[0.55, -0.55, 0.5, 0.36], [1.3, -0.45, 0.32, 0.3], [0.55, -1.85, 0.5, 0.36], [1.3, -1.8, 0.32, 0.3]].forEach(function (p) {
      ellipsoid(B.dark, [xb - 0.02, s * p[0], p[1]], 0.06, p[2], p[3], 4, 10);
    });
    /* the housed bow plane, a curved strake low on the bow [F1][F2] */
    var BP = [[1672, 515], [1700, 509], [1725, 500], [1755, 487]];
    for (s = -1; s <= 1; s += 2) for (k = 0; k + 1 < BP.length; k++) {
      var a = BP[k], b = BP[k + 1], za = pz(a[1]), zb = pz(b[1]);
      var ya = halfAt(st, (a[0] - D.X0) / S, za, NE, 0), yb = halfAt(st, (b[0] - D.X0) / S, zb, NE, 0);
      hexa(B.hull, [[px(a[0]), s * (ya - 0.05), za - 0.12], [px(b[0]), s * (yb - 0.05), zb - 0.12], [px(b[0]), s * (yb + 0.16), zb - 0.12], [px(a[0]), s * (ya + 0.16), za - 0.12],
                    [px(a[0]), s * (ya - 0.05), za + 0.12], [px(b[0]), s * (yb - 0.05), zb + 0.12], [px(b[0]), s * (yb + 0.16), zb + 0.12], [px(a[0]), s * (ya + 0.16), za + 0.12]]);
    }
    /* the stern [F1][F2]: box rudder under the cone, the skeg, the low stern planes with end tubes */
    sideExt(B.hull, [[px(85), pz(437)], [px(160), pz(437)], [px(160), pz(500)], [px(85), pz(500)]], -0.18, 0.18);
    sideExt(B.hull, [[px(82), pz(515)], [px(160), pz(500)], [px(212), pz(487)], [px(197), pz(531)], [px(82), pz(531)]], -0.2, 0.2);
    var zp = pz(510);
    for (s = -1; s <= 1; s += 2) {
      plate(B.hull, px(70), px(195), px(85), px(170), [0, s * 0.2, zp], [0, s * 2.3, zp], 0.16);
      cylZ(B.hull, px(128), s * 2.3, zp - 0.25, zp + 1.05, 0.17, 10);
    }
    screw(B.bronze, px(24), 0, pz(447), 1.2, 4, 0.5);
    /* team: on the raised casing and the fin top */
    box(B.team, px(1400), px(1460), -0.5, 0.5, pz(325), pz(325) + 0.03);
    box(B.team, px(930), px(990), -0.4, 0.4, pz(160), pz(160) + 0.03);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ TYPE 206 / 206A [S1][S2][S3]
     39.29 px/m (48.49 m over 1905 px), the rudder's after edge at x 7, the waterline at the
     published 4.30 m draught over the drawn keel (y 506). */
  var F206 = { S: 1905 / 48.49, X0: 7, YW: 506 - 4.3 * 1905 / 48.49, HB: 2.29, rows: [
    [105, 417, 431, null], [150, 405, 444, null], [200, 391, 457, null], [260, 377, 465, null],
    [300, 368, 469, null], [360, 355, 474, null], [420, 348, 479, null], [500, 341, 487, null],
    [600, 333, 496, null], [700, 326, 504, null], [740, 322, 506, null], [800, 321, 506, null],
    [1540, 321, 506, null], [1580, 314, 506, null], [1620, 307, 506, null], [1660, 301, 506, null],
    [1700, 296, 506, null], [1740, 293, 504, null], [1780, 290, 500, null], [1820, 290, 493, null],
    [1860, 290, 481, null], [1880, 291, 471, 2.05], [1900, 299, 456, 1.6], [1909, 312, 440, 1.0],
    [1912, 330, 420, 0.45]] };
  var VARIANTS = {
    t206:  { blades: 5, hull: 0x3a393a },     /* [S3] 1970s; five blades (en.wikipedia) */
    t206a: { blades: 7, hull: 0x262729 }      /* [S2] 2007; seven blades (en.wikipedia) */
  };
  function buildT206(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.t206a;
    var D = F206, S = D.S, L = 48.49;
    var T = materials(THREE, C, { hull: V.hull, deck: 0x2b2b2d, dark: 0x0b0b0c, metal: 0x2a2b2d, light: 0x8a8f93, rough: 0.74 });
    var g = new THREE.Group(), B = bins(T), s;
    function X(d) { return d - L / 2; }
    function px(x) { return X((x - D.X0) / S); }
    function pz(y) { return (D.YW - y) / S; }
    var st = stations(D), NE = 2.25;
    bodyLoft(B.hull, X, st, 24, NE, 0, 1.4);
    /* the fin [S1]: the low fairing x 715 - 1272 (top y 268), the high after block x 920 - 1155
       (top y 172, the lip round it [S2][S3]) and the lower forward block to the round nose (top 207) */
    finLoft(B.hull, X, [[330, 715], [311, 740], [299, 760], [289, 780], [281, 800], [276, 820], [272, 840], [268, 870]].map(function (r) {
      return { xa: (r[1] - D.X0) / S, xf: (1272 - D.X0) / S, hw: 0.95, z: pz(r[0]), la: 0.9, lf: 0.6, pt: false };
    }));
    finLoft(B.hull, X, [[272, 920], [253, 920], [180, 935], [172, 940]].map(function (r) {
      return { xa: (r[1] - D.X0) / S, xf: (1160 - D.X0) / S, hw: 0.78, z: pz(r[0]), la: 0.3, lf: 0.05, pt: false };
    }));
    finLoft(B.hull, X, [[272, 1272], [225, 1272], [212, 1262], [207, 1250]].map(function (r) {
      return { xa: (1150 - D.X0) / S, xf: (r[1] - D.X0) / S, hw: 0.78, z: pz(r[0]), la: 0.05, lf: 0.78, pt: false };
    }));
    finLoft(B.hull, X, [[176, 925, 0.86], [170, 928, 0.86]].map(function (r) {           /* the lip */
      return { xa: (r[1] - D.X0) / S, xf: (1158 - D.X0) / S, hw: r[2], z: pz(r[0]), la: 0.3, lf: 0.05, pt: false };
    }));
    box(B.hull, px(1180), px(1215), -0.6, 0.6, pz(207), pz(190));                 /* the bridge screen */
    box(B.dark, px(1155), px(1240), -0.5, 0.5, pz(207) - 0.04, pz(207) + 0.01);   /* the bridge well */
    for (s = -1; s <= 1; s += 2) {
      [985, 1015, 1075, 1100].forEach(function (x) {                               /* panels low on the fin [S1] */
        box(B.dark, px(x - 8), px(x + 8), s * 0.95 - 0.03, s * 0.95 + 0.03, pz(312), pz(287));
      });
      box(B.dark, px(1205), px(1255), s * 0.95 - 0.03, s * 0.95 + 0.03, pz(320), pz(290));
      box(B.metal, px(930), px(1150), s * 0.79 - 0.03, s * 0.79 + 0.03, pz(208), pz(205));    /* rail [S2] */
    }
    /* the mast row [S1]: fin top at y 172 */
    var zt = pz(172);
    cylZ(B.metal, px(1003), 0, zt, pz(92), 0.13, 8);
    cylZ(B.metal, px(1003), 0, pz(92), pz(88), 0.17, 8);
    cylZ(B.light, px(1035), 0, zt, pz(47), 0.1, 8);
    box(B.metal, px(1012), px(1057), -0.08, 0.08, pz(49), pz(43));                 /* the yard on the periscope */
    cylZ(B.metal, px(1088), 0, zt, pz(110), 0.3, 12);                              /* snorkel and its head */
    box(B.metal, px(1074), px(1101), -0.3, 0.3, pz(110), pz(60));
    cylZ(B.metal, px(1105), 0, zt, pz(96), 0.08, 6);
    cyl(B.metal, [px(1105), 0, pz(96)], [px(1105), 0, pz(8)], 0.04, 0.015, 5);
    cylZ(B.metal, px(1113), 0, zt, pz(75), 0.07, 6);
    cylZ(B.light, px(1125), 0, zt, pz(85), 0.08, 8);
    /* the small fin on the bow sonar casing [S1] */
    sideExt(B.hull, [[px(1672), pz(300)], [px(1690), pz(277)], [px(1700), pz(282)], [px(1702), pz(300)]], -0.12, 0.12);
    /* tube shutters, two a side [S1], and the housed bow plane */
    for (s = -1; s <= 1; s += 2) {
      [[1878, 372], [1878, 410]].forEach(function (p) {
        var d = (p[0] - D.X0) / S, z = pz(p[1]);
        ellipsoid(B.dark, [X(d), s * (halfAt(st, d, z, NE, 0) - 0.02), z], 0.42, 0.05, 0.24, 4, 10);
      });
      var BP = [[1655, 490], [1690, 482], [1735, 462]], k;
      for (k = 0; k + 1 < BP.length; k++) {
        var a = BP[k], b = BP[k + 1], za = pz(a[1]), zb = pz(b[1]);
        var ya = halfAt(st, (a[0] - D.X0) / S, za, NE, 0), yb = halfAt(st, (b[0] - D.X0) / S, zb, NE, 0);
        hexa(B.hull, [[px(a[0]), s * (ya - 0.05), za - 0.12], [px(b[0]), s * (yb - 0.05), zb - 0.12], [px(b[0]), s * (yb + 0.15), zb - 0.12], [px(a[0]), s * (ya + 0.15), za - 0.12],
                      [px(a[0]), s * (ya - 0.05), za + 0.12], [px(b[0]), s * (yb - 0.05), zb + 0.12], [px(b[0]), s * (yb + 0.15), zb + 0.12], [px(a[0]), s * (ya + 0.15), za + 0.12]]);
      }
    }
    /* the stern [S1]: the dorsal fin over the screw, the long skeg, the box rudder aft of the screw,
       the post between them, the low stern planes, one screw */
    sideExt(B.hull, [[px(32), pz(368)], [px(32), pz(355)], [px(137), pz(355)], [px(192), pz(394)], [px(192), pz(408)], [px(110), pz(414)]], -0.18, 0.18);
    sideExt(B.hull, [[px(37), pz(483)], [px(200), pz(455)], [px(403), pz(480)], [px(392), pz(502)], [px(55), pz(502)], [px(37), pz(492)]], -0.2, 0.2);
    sideExt(B.hull, [[px(7), pz(369)], [px(67), pz(369)], [px(67), pz(483)], [px(7), pz(483)]], -0.17, 0.17);
    box(B.hull, px(83), px(95), -0.1, 0.1, pz(493), pz(361));
    var zp = pz(488);
    for (s = -1; s <= 1; s += 2) plate(B.hull, px(130), px(227), px(145), px(215), [0, s * 0.2, zp], [0, s * 2.3, zp], 0.16);
    screw(B.bronze, px(102), 0, pz(424), 0.8, V.blades, 0.3);
    /* team: on the bow casing and the fin top */
    box(B.team, px(1600), px(1660), -0.5, 0.5, pz(304), pz(304) + 0.04);
    box(B.team, px(960), px(1020), -0.4, 0.4, pz(170), pz(170) + 0.03);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ TYPE 212A [T1][T2]
     34.05 px/m (56.0 m over 1907 px), the screw's after end at x 6, the waterline at the published
     6.40 m draught over the keel strip (y 730): y 512, where [T1] draws its long hull line. */
  var F212 = { S: 1907 / 56.0, X0: 6, YW: 730 - 6.4 * 1907 / 56.0, HB: 3.4, rows: [
    [50, 582, 607, null], [80, 572, 621, null], [120, 559, 633, null], [180, 539, 656, null],
    [220, 526, 669, null], [260, 513, 681, null], [300, 500, 691, null], [340, 487, 700, null],
    [380, 477, 712, null], [400, 472, 720, null], [440, 464, 722, null], [500, 454, 722, null],
    [560, 449, 722, null], [600, 447, 722, null], [1520, 447, 722, null], [1600, 449, 722, null],
    [1660, 452, 722, null], [1700, 456, 722, null], [1740, 462, 721, null], [1780, 471, 720, null],
    [1800, 477, 717, null], [1840, 495, 708, null], [1860, 508, 699, null], [1880, 525, 684, null],
    [1900, 542, 656, 1.55], [1910, 565, 630, 0.9], [1913, 588, 606, 0.3]] };
  function buildT212(THREE, M, C) {
    var D = F212, S = D.S, L = 56.0;
    var T = materials(THREE, C, { hull: 0x4a4753, deck: 0x413e49, dark: 0x0d0d10, metal: 0x3a3842, light: 0x8a8578, rough: 0.7 });
    var g = new THREE.Group(), B = bins(T), s, t;
    function X(d) { return d - L / 2; }
    function px(x) { return X((x - D.X0) / S); }
    function pz(y) { return (D.YW - y) / S; }
    var st = stations(D), NE = 2.6;
    /* the hull: a squarer section ("prismatic") at the published 6.8 m, its top the wide deck [T1][T2] */
    bodyLoft(B.hull, X, st, 26, NE, 0, 1.6);
    box(B.hull, px(400), px(1680), -0.25, 0.25, pz(731), pz(721));               /* the keel strip */
    /* the long flank-array fairing low on each side, x 620 - 1615, y 656 - 686 [T1] */
    for (s = -1; s <= 1; s += 2) {
      var zf = pz(671), yh = halfAt(st, (1100 - D.X0) / S, zf, NE, 0);
      box(B.hull, px(620), px(1615), s * (yh - 0.25), s * (yh + 0.12), pz(686), pz(656));
      box(B.hull, px(605), px(620), s * (yh - 0.25), s * (yh + 0.04), pz(682), pz(660));
      box(B.hull, px(1615), px(1630), s * (yh - 0.25), s * (yh + 0.04), pz(682), pz(660));
    }
    /* the fin [T1][T2]: the stepped after edge (x 965 - 1040), the top at y 334, the big fillet
       forward (x 1260 - 1385); plan widening from 0.95 m to 1.7 m into the deck */
    finLoft(B.hull, X, [[458, 958, 1392, 1.75], [447, 965, 1380, 1.7], [442, 968, 1360, 1.5], [428, 975, 1340, 1.3],
                        [414, 980, 1330, 1.15], [385, 993, 1320, 1.0], [375, 1000, 1315, 1.0], [350, 1015, 1300, 0.97],
                        [340, 1030, 1282, 0.96], [334, 1040, 1262, 0.95]].map(function (r) {
      return { xa: (r[1] - D.X0) / S, xf: (r[2] - D.X0) / S, hw: r[3], z: pz(r[0]), la: 0.6, lf: r[3], pt: false };
    }));
    box(B.dark, px(1200), px(1255), -0.55, 0.55, pz(334) - 0.04, pz(334) + 0.01);    /* the bridge well */
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, px(1272), px(1306), s * 0.94, s * 1.0, pz(385), pz(366));        /* the bridge window [T1] */
      box(B.dark, px(1040), px(1190), s * 0.96 - 0.02, s * 0.96 + 0.03, pz(355), pz(350)); /* the rail recess */
      /* the fin planes, high on the fin near its leading edge [T1][T2]; span assumed */
      plate(B.hull, px(1175), px(1245), px(1190), px(1236), [0, s * 0.85, pz(398)], [0, s * 2.6, pz(398)], 0.2);
    }
    /* the mast housings and masts as [T1] draws them raised; fin top y 334 */
    var zt = pz(334);
    cylZ(B.hull, px(1081), 0, zt - 0.1, pz(243), 0.4, 12);
    cylZ(B.metal, px(1081), 0, pz(243), pz(126), 0.1, 8);
    cylZ(B.metal, px(1081), 0, pz(128), pz(122), 0.16, 8);
    cylZ(B.metal, px(1081), 0, pz(122), pz(6), 0.03, 5);
    cylZ(B.metal, px(1072), 0.25, zt, pz(207), 0.07, 6);
    cylZ(B.hull, px(1114), 0, zt - 0.1, pz(246), 0.4, 12);
    cylZ(B.hull, px(1145), 0, zt - 0.1, pz(247), 0.37, 12);
    cylZ(B.metal, px(1147), 0, pz(247), pz(225), 0.08, 6);
    cylZ(B.light, px(1167), 0, zt, pz(222), 0.09, 8);
    box(B.metal, px(1150), px(1185), -0.06, 0.06, pz(224), pz(219));
    cylZ(B.hull, px(1189), 0, zt - 0.1, pz(243), 0.33, 12);
    cylZ(B.metal, px(1189), 0, pz(246), pz(243), 0.36, 10);
    cylZ(B.metal, px(1184), 0, pz(243), pz(116), 0.07, 6);
    cylZ(B.metal, px(1184), 0, pz(116), pz(6), 0.03, 5);
    cylZ(B.metal, px(1194), 0, pz(243), pz(225), 0.06, 6);
    /* the X tail [T1][T2]: four fins at 45 deg, root chord x 96 - 177 on the cone, tip chord
       x 100 - 152 at 3.17 m out in each projection */
    var za = pz(597);
    for (s = -1; s <= 1; s += 2) for (t = -1; t <= 1; t += 2)
      plate(B.hull, px(96), px(177), px(100), px(152), [0, s * 0.85, za + t * 0.85], [0, s * 3.17, za + t * 3.17], 0.3);
    /* the screw: a seven-bladed skewback (en.wikipedia), 3.5 m across [T1], on its hub cone */
    cyl(B.metal, [px(6), 0, za], [px(52), 0, za], 0.3, 0.5, 12);
    screw(B.bronze, px(36), 0, za, 1.75, 7, 0.2);
    /* team: on the fin top aft and the deck forward of the fin */
    box(B.team, px(1050), px(1065), -0.55, 0.55, zt, zt + 0.03);
    box(B.team, px(1500), px(1570), -0.7, 0.7, pz(447), pz(447) + 0.04);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ BARBE: Type 520 [B1] - [B6]
     d = metres forward of the stern platform's after edge; L 40.0 (published); [B1] at 25.95 px/m.
     The bow is one raked plane from the sheer at d 40.0, z 2.6 to the waterline at d 37.2 ([B1]):
     the wing faces and the raised ramp both lie in it ([B2], [B3]). */
  var BL = 40.0;
  function BX(d) { return d - BL / 2; }
  function dBow(z) { return 37.2 + (z - 0.35) * (2.8 / 2.25); }
  function sheer(d) { return lerp(2.85, 2.6, clamp((d - 2.8) / 37.2, 0, 1)); }
  function buildBarbe(THREE, M, C) {
    var T = materials(THREE, C, { hull: 0x7d8993, deck: 0x50575c, boot: 0x16181a, dark: 0x1a1d20, metal: 0x5d666d, light: 0xd9dbdc, rough: 0.8 });
    var g = new THREE.Group(), B = bins(T), s, k, d, X = BX;
    var HB = 4.4, WI = 2.45, ZW = 0.55, ZB = -2.1;
    /* the lower hull: horizontal plan sections lofted up, square-sided with a chine radius, the
       stern corners chamfered, the forefoot in the bow plane; black boot to 0.45 m [B3] */
    function planRing(z, hb, da, ch) {
      var db = dBow(z);
      return [[X(da), -hb + ch, z], [X(da + ch), -hb, z], [X(db), -hb, z], [X(db), hb, z], [X(da + ch), hb, z], [X(da), hb - ch, z]];
    }
    loft(B.boot, [planRing(ZB, 3.75, 0.45, 0.45), planRing(ZB + 0.12, 4.2, 0.15, 0.6), planRing(-1.6, HB, 0, 0.6), planRing(0.45, HB, 0, 0.6)]);
    loft(B.hull, [planRing(0.45, HB, 0, 0.6), planRing(ZW, HB, 0, 0.6)]);
    /* the low stern platform aft of the gate, d 0 - 2.8, deck 0.92 m [B1] */
    loft(B.hull, [planRing(0.5, HB - 0.02, 0, 0.6), planRing(0.92, HB - 0.02, 0, 0.6)].map(function (r) {
      return r.map(function (p) { return [Math.min(p[0], X(2.85)), p[1], p[2]]; });
    }));
    box(B.deck, X(0.2), X(2.8), -3.9, 3.9, 0.92, 0.94);
    /* the wing walls, 1.95 m thick a side, from the stern gate to the bow plane, sheer 2.85 m aft
       to 2.6 m at the bow [B1][B3][B4] */
    for (s = -1; s <= 1; s += 2) {
      var yi = s * WI, yo = s * HB;
      loft(B.hull, [[[X(2.8), yi, ZW], [X(dBow(ZW)), yi, ZW], [X(dBow(ZW)), yo, ZW], [X(2.8), yo, ZW]],
                    [[X(2.8), yi, sheer(2.8)], [X(40), yi, 2.6], [X(40), yo, 2.6], [X(2.8), yo, sheer(2.8)]]]);
    }
    /* the stern gate across the well, the well deck, the ramp raised in the bow plane [B2][B6] */
    box(B.hull, X(2.8), X(3.1), -WI, WI, ZW, 2.3);
    box(B.deck, X(3.1), X(dBow(ZW) - 0.35), -WI, WI, ZW, ZW + 0.02);
    var rb = dBow(ZW), rt = dBow(2.55), RW = 2.42;
    hexa(B.hull, [[X(rb - 0.35), -RW, ZW], [X(rb), -RW, ZW], [X(rb), RW, ZW], [X(rb - 0.35), RW, ZW],
                  [X(rt - 0.35), -RW, 2.55], [X(rt), -RW, 2.55], [X(rt), RW, 2.55], [X(rt - 0.35), RW, 2.55]]);
    cyl(B.hull, [X(dBow(0.62) + 0.02), -RW, 0.62], [X(dBow(0.62) + 0.02), RW, 0.62], 0.2, 0.2, 10);   /* the rounded lip [B2] */
    /* the two grids of openings on the ramp face [B2]: 4 x 4 each */
    var up = unit([2.8 / 2.25, 0, 1]), nn = unit([1, 0, -2.25 / 2.8]);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 4; k++) for (var j = 0; j < 4; j++) {
      var zg = 1.25 + k * 0.33, yg = s * (0.75 + j * 0.42);
      obox(B.dark, [X(dBow(zg)), yg, zg], up, [0, 1, 0], nn, -0.13, 0.13, -0.16, 0.16, -0.03, 0.02);
    }
    /* the rubbing strake and the scuttles [B1][B3] */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(2.8), X(dBow(0.85) - 0.1), s * HB, s * (HB + 0.12), 0.78, 0.92);
      [[6.7, 1.5], [9.1, 1.9], [14.5, 1.8], [30.5, 1.4]].forEach(function (p) {
        cyl(B.dark, [X(p[0]), s * (HB - 0.02), p[1]], [X(p[0]), s * (HB + 0.03), p[1]], 0.17, 0.17, 10);
      });
    }
    /* the starboard deckhouse d 11.6 - 23.3 (roof 4.55 m) and the wheelhouse d 23.3 - 26.8 (roof 6.3 m),
       outboard face flush with the side, the wheelhouse 0.4 m wider inboard [B1][B3][B4][B5] */
    box(B.hull, X(11.6), X(23.3), -HB, -1.8, 2.6, 4.55);
    box(B.hull, X(23.3), X(26.8), -HB, -1.5, 2.6, 6.3);
    box(B.deck, X(11.7), X(23.2), -HB + 0.1, -1.9, 4.55, 4.57);
    box(B.dark, X(26.8), X(26.85), -3.2, -2.6, 2.9, 4.5);                               /* the door forward */
    [-3.95, -2.95, -1.95].forEach(function (y) { box(B.glass, X(26.8), X(26.85), y - 0.36, y + 0.36, 5.3, 6.0); });
    [24.2, 25.6].forEach(function (d2) {
      box(B.glass, X(d2 - 0.4), X(d2 + 0.4), -1.5, -1.45, 5.3, 6.0);
      box(B.glass, X(d2 - 0.4), X(d2 + 0.4), -HB - 0.05, -HB, 5.3, 6.0);
    });
    box(B.dark, X(23.25), X(23.3), -3.3, -2.5, 4.55, 6.0);                               /* the after door */
    /* rails: round the wheelhouse roof [B2], the deckhouse roof [B1][B3], along the bow wing tops [B3] */
    function rail(pts, z, h, sp) {
      for (var i = 0; i + 1 < pts.length; i++) {
        var a = pts[i], b = pts[i + 1], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / sp)), m;
        cyl(B.metal, [X(a[0]), a[1], z + h], [X(b[0]), b[1], z + h], 0.025, 0.025, 4);
        for (m = 0; m <= n; m++) cylZ(B.metal, X(lerp(a[0], b[0], m / n)), lerp(a[1], b[1], m / n), z, z + h, 0.025, 4);
      }
    }
    rail([[23.4, -1.6], [26.7, -1.6], [26.7, -4.3], [23.4, -4.3], [23.4, -1.6]], 6.3, 1.0, 1.2);
    rail([[11.7, -4.3], [11.7, -1.9], [23.2, -1.9]], 4.55, 1.0, 1.5);
    for (s = -1; s <= 1; s += 2) rail([[s < 0 ? 27.0 : 29.5, s * 4.3], [39.5, s * 4.3], [39.5, s * 2.6]], 2.6, 1.0, 1.5);
    /* the pole mast on the wheelhouse with its yard [B2][B3]; the jackstaff on the port bow wing [B2][B3] */
    cyl(B.metal, [X(25.2), -2.95, 6.3], [X(25.2), -2.95, 13.8], 0.09, 0.05, 8);
    cyl(B.metal, [X(25.2), -4.15, 12.1], [X(25.2), -1.75, 12.1], 0.04, 0.04, 5);
    cylZ(B.metal, X(38.6), 3.6, 2.6, 7.1, 0.04, 5);
    /* the 20 mm on its pedestal on the starboard wing ahead of the wheelhouse, under its cover [B5] */
    cylZ(B.metal, X(28.4), -3.3, 2.6, 3.6, 0.28, 10);
    ellipsoid(B.deck, [X(28.45), -3.3, 3.9], 0.75, 0.5, 0.42, 5, 12);
    cyl(B.metal, [X(29.0), -3.3, 3.98], [X(30.5), -3.3, 4.05], 0.06, 0.045, 6);
    /* the raft canisters on their rack on the port wall, d 15.4 - 22.7 [B1] */
    box(B.metal, X(15.4), X(22.7), 3.45, 4.3, 2.8, 3.55);
    [16.3, 18.1, 19.9, 21.7].forEach(function (d2) {
      cyl(B.light, [X(d2 - 0.8), 3.88, 4.05], [X(d2 + 0.8), 3.88, 4.05], 0.45, 0.45, 12);
    });
    /* team: on the wheelhouse roof and the bow wing tops */
    box(B.team, X(24.0), X(26.0), -3.9, -2.0, 6.3, 6.33);
    for (s = -1; s <= 1; s += 2) box(B.team, X(34.0), X(36.0), s * 2.8, s * 4.0, 2.62, 2.65);
    void d;
    flush(THREE, g, B);
    return g;
  }

  return { hai: buildHai, t205: buildT205, t206: buildT206, t212: buildT212, barbe: buildBarbe };
})();

UNIT_MODELS["deu_e50_sub"] = { len: 34.66, build: function (THREE, M, C) { return HeroDeuSubs.hai(THREE, M, C); } };
UNIT_MODELS["deu_e60_sub"] = { len: 44.32, build: function (THREE, M, C) { return HeroDeuSubs.t205(THREE, M, C); } };
UNIT_MODELS["deu_e80_sub"] = { len: 48.49, build: function (THREE, M, C) { return HeroDeuSubs.t206(THREE, M, C, "t206"); } };
UNIT_MODELS["deu_e90_sub"] = { len: 48.49, build: function (THREE, M, C) { return HeroDeuSubs.t206(THREE, M, C, "t206a"); } };
UNIT_MODELS["deu_e00_sub"] = { len: 56.0, build: function (THREE, M, C) { return HeroDeuSubs.t212(THREE, M, C); } };
/* sub_g is the same Type 212A (rules.js: U-31, S181), so the same build */
UNIT_MODELS["sub_g"]       = { len: 56.0, build: function (THREE, M, C) { return HeroDeuSubs.t212(THREE, M, C); } };
UNIT_MODELS["deu_e60_lst"] = { len: 40.0, build: function (THREE, M, C) { return HeroDeuSubs.barbe(THREE, M, C); } };
