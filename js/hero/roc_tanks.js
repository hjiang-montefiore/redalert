/* ================= roc_tanks.js - HERO models: the Taiwanese (ROC Army) Patton family =================
   Five rows, four vehicles, all built from the two redone US Pattons, whose kits and tables are
   COPIED into this file (us_m48.js HeroM48 = the M48A2; nato_e60_mbt.js HeroM60 = the M60A1).
   Neither of those files is edited or called; nothing outside this file reads this builder.

     roc_e60_mbt        M48A3          the M48 hull (five return rollers), M1 cupola, 90 mm M41
     roc_e80_mbt        M48A5          the M48 hull (three rollers), M1 cupola, 105 mm M68
     roc_e90_lighttank  M60A3 TTS      the M60A1 hull and turret, M68 with thermal sleeve, M239s
     roc_e90_mbt        CM-11 (M48H)   the M60 hull with the M48 turret, M68 with thermal sleeve,
     roc_e00_mbt        CM-11 (M48H)     Urdan cupola, M239s (the two rows are the same tank: same
                                         name and "full" in js/eras.js, e00 desc "Unchanged")
   No other roc_* row names an M48, M60, CM-11 or CM-12 (grep of js/eras.js, 2026-11-04).

   REFERENCES (Wikimedia Commons, width 1280, cached in scratchpad/q_roctk_ref):
     R1  "ROCA M48A3 in Conscription Park 20140107a.jpg"  ROC M48A3, port rear 3/4 with the turret
         traversed over the deck: FIVE return rollers, front idler with the A2-type curved
         mudguard, rear sprocket, the M1 cupola sitting straight on the dome (no vision-block
         riser), the rangefinder blister, the grab rail, the stowage basket, plain dark green.
     R2  "M48A3 at Armor School 20130302b.JPG"  ROC M48A3, port front 3/4: five return rollers,
         the T-shaped blast deflector, the fender boxes, headlight groups in brush guards, the
         low M1 cupola, plain dark green.
     R3  "M48A3 beside Armor School Ground 20130302.jpg" and R3b "M48A3 and Fire hydrant in
         Chengkungling 20121006.JPG"  ROC M48A3s head-on: the boat nose, the headlight groups,
         the T-deflector (cross tube), the M1 cupola, plain dark green (the roundel on the nose is
         a national marking: not drawn).
     R4  "CM-12 Tank Rear View in ROCA Infantry School 20120211.JPG"  the ROC M48A3 HULL (the CM-12
         is the M48A3 with the CM-11 turret kit) from dead astern: the rear plate with the armoured
         taillight boxes at its upper corners, the infantry phone box, the two tow shackles and the
         pintle, the two louvred exhaust hoods on the rear corners of the deck.  Measured at the
         rear plate (lower hull 2.12 m = 530 px): deck 0.16 m above the fender, the hoods 0.28 m
         wide and 0.16 m tall.  The three-colour camouflage it wears is the 2010s scheme.
     R5  "CM-12 Tank Side View in ROCA Infantry School 20120211a.JPG"  port side, level camera:
         an M48 hull with THREE return rollers and the M48 turret with ROC fittings.
     R6  "CM-11 Tank Side View in Chengkungling 20111009.jpg"  CM-11, port side: the M60 hull
         (flat fenders at track-top level, three rollers, raised idler), the M48 dome turret, the
         M68 with the segmented thermal sleeve, the Urdan cupola with the .50 and the loader's
         M240, the bustle basket, three-colour camouflage.
     R7  "CM-11 Tank Turret Side View 20111105.jpg"  CM-11 turret, port side, close: the M239
         six-tube smoke launcher on its bracket ahead of the cheek, a stowage box, the plate with
         clamps under the rangefinder blister, the jerrycan in its bracket, the cylindrical
         canister at the left rear of the roof with the sensor mast on it, the loader's M240 on a
         curved rail ahead of the loader's hatch, the .50 on the commander's cupola, the basket
         with its mesh.  Fittings placed by their distance from the rangefinder blister (scale
         242 px/m from the gun shield face to the blister, both at the same depth).
     R8  "ROCA CM-11 Front View in Hukou Camp 20111105.jpg"  CM-11 port front 3/4: the M60 nose
         and headlights, the .50 on the RIGHT (commander), the M240 on the LEFT (loader), the
         M239 tubes beside the mantlet.
     R9  "ROCA M60A3 TTS Tank Side View 20111009.jpg"  ROC M60A3 TTS, port side: the M60A1 hull
         and needle-nose turret unchanged, the thermal sleeve, the M239 on the turret front cheek,
         a stowage box high on the turret side and a jerrycan behind it (measured from the
         blister at ~185 px/m: box x -0.20..0.30, jerrycan -0.62..-0.28 and 0.47 m tall), the
         crosswind sensor mast with its ball head at the rear of the roof (0.70 m), the loader's
         MG on a pintle, the M19 cupola, the bustle rack WITH MESH, a tow cable on the turret
         side, NO searchlight, three-colour camouflage.
     R10 "M48A5 dozer Team Spirit 1984.jpg"  a US M48A5 (1984): the M68 with its bore evacuator
         and plain muzzle in the M48 mantlet; the cupola is hidden under grass.
   Published figures:
     M48A3 (Hunnicutt 1984 p.436 via en.wikipedia "M48 Patton"): 341.8 in = 8.68 m gun forward,
       143 in = 3.63 m wide, 129.3 in = 3.28 m over the cupola periscope, 16.5 in clearance.
     M48A5 (Hunnicutt p.438): 366.4 in = 9.31 m gun forward, 3.63 m wide, 120.5 in = 3.06 m over
       the cupola periscope.
     M60A3 (Foss 2005 p.166 via en.wikipedia "M60 tank"): hull 6.946 m, 9.309 m gun forward,
       3.631 m wide, 3.27 m high, 0.463 m clearance.  (Hunnicutt gives the M60A1 9.436 m.)
     CM-11 (en.wikipedia "CM11 Brave Tiger"): hull 6.95 m, 9.30 m gun forward, 3.63 m wide,
       3.09 m high; M60A3 hull, M48A3 turret, M68A1, Urdan low-profile cupola with the M2, the
       loader's M240, an M239 on each side of the turret.

   DISAGREEMENTS AND HOW THEY WERE SETTLED:
   - M48A3 height: Hunnicutt's 3.28 m is the US late fit, the M1E1 cupola on the G305 vision
     block riser.  The ROC A3s (R1, R2, R3) show the M1 cupola straight on the dome: on R2 the
     hatch top stands 0.38 of the cupola's width above its foot on the dome (the A2 kit without
     a riser gives 0.54 side-on, with a 0.19 m riser 0.74; R2 looks down at ~15 deg, which
     shortens heights, so the no-riser cupola is the one that fits).  Drawn without the riser:
     3.09 m over the periscope, as the A2.
   - M48A5 cupola: the brief asks for "the low cupola or the Israeli-style hatch as ROC photos
     show".  No photograph of a ROC M48A5 with its turret could be found on Commons (only the
     M48A5 AVLB, which has none).  Hunnicutt's 3.06 m over the cupola periscope is the A2's
     3.09 m within an inch, i.e. the M1 cupola without a riser, not a low cupola (an Urdan would
     give ~2.75 m on this hull).  The published figure is followed: M1 cupola.  NOT CONFIRMED for
     ROC tanks.
   - M60A3 gun forward: Foss's 9.309 m against Hunnicutt's 9.436 m for the A1.  The A3 has the
     same turret and the same M68 as the A1; no photograph shows a shorter gun or a turret moved
     back, so the copied A1 geometry is kept (9.436 m) and the 0.13 m is NOT reshaped away.
   - CM-11 gun forward (9.30 m) and M48A5 (9.31 m) agree: the M68 muzzle is put 5.64 m ahead of
     the ring in the M48 turret for both.

   WHAT WAS COPIED, WHAT WAS CHANGED (per row):
   roc_e60_mbt  M48A3: copied from us_m48.js - hull station table and loft, fenders, mudguards,
       headlights, fender boxes, taillight boxes, driver's hatch, engine deck doors, running gear,
       track, road wheels, the whole turret (dome, mantlet, 90 mm M41 with the T deflector, M1
       cupola, blisters, hatches, grab rails, basket).  CHANGED: five return rollers in place of
       three (R1, R2: over the gaps behind wheels 1-5, at 0.62 of the gap, measured on the
       Chengkungling M48 side view, and drawn at the A2 heights); the two louvred exhaust hoods on
       the deck's rear corners and the infantry phone box and tow shackles on the rear plate (R4);
       paint ROC dark olive (R1-R3).
   roc_e80_mbt  M48A5: the same copied M48 hull and turret with the A2's three rollers (R5 shows a
       ROC M48 hull with three; the A5 conversions had either, en.wikipedia).  CHANGED: the deck
       and rear plate as the A3 (R4); the gun is the M68 of nato_e60_mbt.js (tube, bore evacuator
       at 0.17-0.36 of the exposed length, plain muzzle) in the M48 mantlet, muzzle at the
       published 9.31 m; paint ROC dark olive.
   roc_e90_lighttank  M60A3 TTS: copied from nato_e60_mbt.js - the whole hull, running gear,
       wheels, the A1 turret, gun, M19 cupola, rangefinder housings, rack.  CHANGED: no
       searchlight (R9); the thermal sleeve on the M68 (R9); the M239 on each front cheek (R9; the
       starboard one by symmetry); the stowage box, jerrycan and tow cable on the port side of the
       turret (R9, port side only: the starboard side is not seen); the crosswind sensor mast
       (R9, en.wikipedia "M60 tank" caption); the loader's MG on a pintle (R9); mesh in the rack
       (R9); three-colour camouflage (R9).
   roc_e90_mbt / roc_e00_mbt  CM-11: hull, running gear and wheels copied from nato_e60_mbt.js
       unchanged (R6, R8: the M60 hull); the turret is the copied M48 dome, mantlet, blisters,
       grab rails, hatches and basket from us_m48.js, set on the M60 ring (R6).  CHANGED: the M68
       with the thermal sleeve, muzzle at the published 9.30 m (R6); the Urdan low cupola with
       the M2 in place of the M1 (R6-R8, en.wikipedia); the loader's M240 on its curved rail
       (R7, R8); the M239 on each side ahead of the cheek (R7, R8, en.wikipedia); the stowage
       box ahead of the blister on both sides (R7 port, R8 starboard); the clamp plate under the
       port blister and the jerrycan behind it (R7, port only); the canister at the left rear of
       the roof with the sensor mast (R7); mesh in the basket (R7); camouflage (R6-R8).

   Recognition list (what makes each read at game zoom, and its source):
     M48A3/A5: the boat-shaped cast hull with the rounded nose (R2, R3), six dual wheels with five
       (A3) or three (A5) return rollers (R1, R5), the big dome turret with the M1 cupola (R1-R3),
       the 90 mm with the T deflector (A3: R2, R3) or the long plain 105 mm (A5: R10), the fender
       boxes (R2), the basket (R1).
     M60A3 TTS: the long flat hull with the high top run (R9), the needle-nose turret with the
       rack (R9), the sleeved 105 mm (R9), the M19 cupola and the crosswind mast (R9).
     CM-11: the M60 hull under the round M48 dome (R6), the sleeved 105 mm (R6), the low Urdan
       cupola and two roof MGs (R6-R8), the M239 clusters at the turret front (R7, R8).
   Paint: the ROC M48A3s of R1-R3 wear a plain dark green (sampled: lit turret #3b4543, a
     museum repaint); drawn as a dark olive #474f37 for the e60 and e80 rows.  Every ROC
     photograph of an M60A3 TTS or a CM-11 (R6-R9, 2011-2014) shows the three-colour scheme:
     green, brown and black bands (sampled R7: green #596952 / #7c8976 lit, brown #70645b,
     black #2b2e37) - drawn as base #55613f with brown #6a5841 and black #2c2f2c bands.
   NOT CONFIRMED: the colour of the 1990s CM-11 and M60A3 (no photograph earlier than 2011 was
     found; the camouflage is used for both e90 rows); the M48A5's ROC fit as a whole (no ROC
     photograph; the cupola, the three rollers and the plain olive follow the published figure
     and US fits); the return-roller positions of the A3 (from an unlabelled ROC M48 side view);
     the length of the exhaust hoods (R4 is a rear view); the starboard fittings of the M60A3
     turret (port side only seen); the y position of the M60A3 crosswind mast; the canister's
     purpose on the CM-11; the size of the clamp plate; the T142 track on the A5 (drawn as the
     A2's T97 kit, the difference is the shoe pattern).
   NOT DRAWN: national roundels and hull/turret numbers (R1-R9 carry them), the Blazer/CSIST ERA
     of 2012, canvas covers, crew stowage in the baskets, the open hatches.

   Materials: PAINT (canvas texture: olive or camouflage, mottling, weld seams, grime), DARK
   (track, fittings, MGs), LENS (vision blocks, lamps, by vertex colour), WHEEL (by vertex
   colour) and the team colour exactly as handed in (C.team): two small strips per tank.
   Nodes: "turret" (trains; origin on the ring centre at the deck/roof, gun along +X), six
   "roadwheel" groups (axle along local Y, both sides).  Draw calls: M60 hull 4 (M48 hull 5: its
   idlers, rollers and sprockets are in the wheel material) + turret 4 + 6 wheels = 14 / 15.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.               */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroROCTanks = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var OLIVE = { base: "#474f37", blots: ["#40472f", "#505a3e"], seed: 7311 };
  var CAMO = { base: "#55613f", blots: ["#4d5939", "#5d6a46"], seed: 7390, camo: ["#6a5841", "#2c2f2c"] };
  var VARIANTS = {
    m48a3: { hull: "m48", turret: "m48", rol: "a3", gun: "m41", cupola: "m1", paint: OLIVE },
    m48a5: { hull: "m48", turret: "m48", rol: "a2", gun: "m68", cupola: "m1", paint: OLIVE },
    m60a3: { hull: "m60", turret: "m60", gun: "m68", sleeve: true, a3: true, searchlight: false, paint: CAMO },
    cm11:  { hull: "m60", turret: "m48", gun: "m68", sleeve: true, cupola: "urdan", cm11: true, paint: CAMO }
  };

  /* ------------------------------------------------------------ geometry kit
     (copied from nato_e60_mbt.js HeroM60; smooth, loft, mbox and prismXZ from us_m48.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var cr = cross(sub(b, a), sub(c, a));
    if (Math.abs(cr[0]) + Math.abs(cr[1]) + Math.abs(cr[2]) < 1e-9) return;
    var f = unit(cr), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };
  function triN(bin, a, b, c, hint) {
    var n = cross(sub(b, a), sub(c, a));
    if (dot(n, hint) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  /* smooth vertex normals over the faces meeting at each vertex; a vertex listed twice keeps a crease */
  function smooth(bin, V, F) {
    var vol = 0, i, f, n, k, N = [];
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    if (vol < 0) for (i = 0; i < F.length; i++) { f = F[i]; F[i] = [f[0], f[2], f[1]]; }
    for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; n = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      for (k = 0; k < 3; k++) { N[f[k]][0] += n[0]; N[f[k]][1] += n[1]; N[f[k]][2] += n[2]; }
    }
    for (i = 0; i < N.length; i++) { k = Math.sqrt(dot(N[i], N[i])); N[i] = k > 1e-12 ? [N[i][0] / k, N[i][1] / k, N[i][2] / k] : [0, 0, 1]; }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      n = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      if (dot(n, n) < 1e-14) continue;
      bin.tri(V[f[0]], V[f[1]], V[f[2]], N[f[0]], N[f[1]], N[f[2]]);
    }
  }
  /* a loft of closed rings (same count), capped; crease[j] doubles ring point j */
  function loft(bin, rings, crease) {
    var nr = rings.length, n = rings[0].length, V = [], F = [], id = [], i, j, j2, a, b, c, d, base, ci, cen, q;
    for (i = 0; i < nr; i++) {
      id.push([]);
      for (j = 0; j < n; j++) { a = V.push(rings[i][j]) - 1; b = a; if (crease && crease[j]) b = V.push(rings[i][j]) - 1; id[i].push([a, b]); }
    }
    for (i = 0; i + 1 < nr; i++)
      for (j = 0; j < n; j++) {
        j2 = (j + 1) % n;
        a = id[i][j][1]; b = id[i][j2][0]; c = id[i + 1][j2][0]; d = id[i + 1][j][1];
        F.push([a, b, c], [a, c, d]);
      }
    function cap(ri, dir) {
      base = V.length; cen = [0, 0, 0];
      for (j = 0; j < n; j++) { q = rings[ri][j]; V.push(q); cen[0] += q[0] / n; cen[1] += q[1] / n; cen[2] += q[2] / n; }
      ci = V.push(cen) - 1;
      for (j = 0; j < n; j++) { j2 = (j + 1) % n; F.push(dir > 0 ? [ci, base + j, base + j2] : [ci, base + j2, base + j]); }
    }
    cap(0, -1); cap(nr - 1, 1);
    smooth(bin, V, F);
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function mbox(bin, s, x0, x1, ya, yb, z0, z1) { box(bin, x0, x1, s > 0 ? ya : -yb, s > 0 ? yb : -ya, z0, z1); }
  /* an oriented slab: centre c, half sizes along unit axes u, v, w */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    if (nocap) {
      /* an open tube has no volume to orient by: wind each face away from the axis */
      for (i = 0; i < seg; i++) {
        j = (i + 1) % seg;
        var h = [N[2 * i][0] + N[2 * j][0], N[2 * i][1] + N[2 * j][1], N[2 * i][2] + N[2 * j][2]];
        var f1 = cross(sub(V[2 * j], V[2 * i]), sub(V[2 * j + 1], V[2 * i]));
        if (dot(f1, h) >= 0) { bin.tri(V[2 * i], V[2 * j], V[2 * j + 1], N[2 * i], N[2 * j], N[2 * j + 1]); bin.tri(V[2 * i], V[2 * j + 1], V[2 * i + 1], N[2 * i], N[2 * j + 1], N[2 * i + 1]); }
        else { bin.tri(V[2 * i], V[2 * j + 1], V[2 * j], N[2 * i], N[2 * j + 1], N[2 * j]); bin.tri(V[2 * i], V[2 * i + 1], V[2 * j + 1], N[2 * i], N[2 * i + 1], N[2 * j + 1]); }
      }
      return;
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
  function cylY(bin, x, y0, y1, z, r, seg, nocap) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg, nocap); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* an outline in the XZ plane (star shaped round its centroid), extruded across y0..y1 */
  function prismXZ(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], k, k2, cx = 0, cz = 0;
    for (k = 0; k < n; k++) { V.push([pts[k][0], y0, pts[k][1]]); cx += pts[k][0] / n; cz += pts[k][1] / n; }
    for (k = 0; k < n; k++) V.push([pts[k][0], y1, pts[k][1]]);
    V.push([cx, y0, cz], [cx, y1, cz]);
    for (k = 0; k < n; k++) { k2 = (k + 1) % n; F.push([k, k2, n + k2], [k, n + k2, n + k], [2 * n, k2, k], [2 * n + 1, n + k, n + k2]); }
    solid(bin, V, F);
  }
  /* a cast body: rings along x (each convex in y-z, same count) with smoothed normals */
  function castLoft(bin, L) {
    var n = L[0].length, m = L.length, NA = [], k, i, a, b, c, d;
    var ctr = L.map(function (R) { var s = [0, 0, 0]; R.forEach(function (p) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; }); return [s[0] / n, s[1] / n, s[2] / n]; });
    for (k = 0; k < m; k++) { NA.push([]); for (i = 0; i < n; i++) NA[k].push([0, 0, 0]); }
    function acc(k, i, f) { NA[k][i][0] += f[0]; NA[k][i][1] += f[1]; NA[k][i][2] += f[2]; }
    var Q = [];
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var i1 = (i + 1) % n;
        a = L[k][i]; b = L[k][i1]; c = L[k + 1][i1]; d = L[k + 1][i];
        var f = cross(sub(c, a), sub(d, b)), mid = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2];
        var cc = [(ctr[k][0] + ctr[k + 1][0]) / 2, (ctr[k][1] + ctr[k + 1][1]) / 2, (ctr[k][2] + ctr[k + 1][2]) / 2];
        if (dot(f, sub(mid, cc)) < 0) f = [-f[0], -f[1], -f[2]];
        f = unit(f);
        acc(k, i, f); acc(k, i1, f); acc(k + 1, i1, f); acc(k + 1, i, f);
        Q.push([k, i, i1, f]);
      }
    Q.forEach(function (q) {
      var k = q[0], i = q[1], i1 = q[2], f = q[3];
      var A = L[k][i], B = L[k][i1], Cc = L[k + 1][i1], Dd = L[k + 1][i];
      var nA = unit(NA[k][i]), nB = unit(NA[k][i1]), nC = unit(NA[k + 1][i1]), nD = unit(NA[k + 1][i]);
      var t = cross(sub(B, A), sub(Cc, A));
      if (dot(t, f) >= 0) { bin.tri(A, B, Cc, nA, nB, nC); bin.tri(A, Cc, Dd, nA, nC, nD); }
      else { bin.tri(A, Cc, B, nA, nC, nB); bin.tri(A, Dd, Cc, nA, nD, nC); }
    });
    [0, m - 1].forEach(function (k) {
      var hint = k === 0 ? [-1, 0, 0] : [1, 0, 0], R = L[k];
      for (i = 1; i + 1 < n; i++) triN(bin, R[0], R[i], R[i + 1], hint);
    });
  }
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function canvasTex(THREE, key, size, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      draw(cv.getContext("2d"), size);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* paint (the M60 file's texture): one tile is 1 / 0.34 = 2.9 m.  Base, soft mottling, cast
     pitting, weld seams with bolt rows, dust and rain streaks.  With P.camo the ROC Army's
     three-colour scheme is laid under the weathering: wavy brown and black bands 0.3-0.6 m wide
     across the green (R6-R9), each drawn three times across the seam so the tile repeats. */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "roc" + P.base + P.seed + (P.camo ? "c" : ""), 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w, ox, oy;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.28 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      if (P.camo) {
        P.camo.forEach(function (col, ci) {
          for (var b = 0; b < 2; b++) {
            var x0 = R() * S, y0 = R() * S, ang = (ci ? -0.6 : 0.5) + (R() - 0.5) * 0.9, len = S * (0.7 + R() * 0.5);
            var wd = (ci ? 22 : 30) + R() * (ci ? 24 : 30), n = 9, top = [], bot = [], j, t, cx, cy, ww;
            for (j = 0; j <= n; j++) {
              t = j / n; cx = x0 + Math.cos(ang) * len * t; cy = y0 + Math.sin(ang) * len * t;
              ww = wd * (0.55 + 0.45 * Math.sin(t * Math.PI)) * (0.8 + R() * 0.4);
              top.push([cx - Math.sin(ang) * ww, cy + Math.cos(ang) * ww]);
              bot.push([cx + Math.sin(ang) * ww, cy - Math.cos(ang) * ww]);
            }
            q.fillStyle = col;
            for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
              q.beginPath();
              q.moveTo(top[0][0] + ox, top[0][1] + oy);
              for (j = 1; j <= n; j++) q.lineTo(top[j][0] + ox, top[j][1] + oy);
              for (j = n; j >= 0; j--) q.lineTo(bot[j][0] + ox, bot[j][1] + oy);
              q.closePath(); q.fill();
            }
          }
        });
      }
      for (i = 0; i < 1100; i++) {
        q.fillStyle = (i % 2) ? "rgba(18,20,12,0.15)" : "rgba(230,232,205,0.07)";
        q.fillRect(R() * S, R() * S, 1 + R() * 3, 1 + R() * 2);
      }
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.45)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(200,190,160,0.06)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), VC = THREE.VertexColors !== undefined ? THREE.VertexColors : true;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x252623, roughness: 0.8, metalness: 0.28 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: VC });
    T.lens = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.2, vertexColors: VC });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), lens: new Bin(T.lens, false, true), team: new Bin(T.team, false) }; }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  var GLASS = [0.30, 0.42, 0.46], LAMP = [0.80, 0.78, 0.66], RED = [0.55, 0.12, 0.08];
  function rgb(hex, k) { return [parseInt(hex.substr(1, 2), 16) / 255 * k, parseInt(hex.substr(3, 2), 16) / 255 * k, parseInt(hex.substr(5, 2), 16) / 255 * k]; }

  /* ============================================ shared ROC fittings (R6-R9) */
  /* the M68 tube from x0 to the muzzle M at height gz (the M60 file's gun: the bore evacuator at
     0.17-0.36 of the exposed length, a plain muzzle with a thin collar).  sleeve: the thermal
     sleeve of the M60A3 and CM-11 (R6, R9): the tube and the evacuator jacketed, a clamp band
     every 0.45 m, the muzzle left bare. */
  function tubeM68(B, x0, M, gz, sleeve) {
    var L = M - 2.10, e0 = 2.10 + 0.17 * L, e1 = 2.10 + 0.36 * L, j = sleeve ? 0.016 : 0, x;
    cylX(B.paint, x0, e0, 0, gz, 0.112 + j, 0.104 + j, 18);
    cylX(B.paint, e0, e0 + 0.08, 0, gz, 0.104 + j, 0.150 + j, 18);
    cylX(B.paint, e0 + 0.08, e1 - 0.08, 0, gz, 0.150 + j, 0.150 + j, 18);
    cylX(B.paint, e1 - 0.08, e1, 0, gz, 0.150 + j, 0.098 + j, 18);
    if (!sleeve) cylX(B.dark, e0 + 0.20, e0 + 0.23, 0, gz, 0.153, 0.153, 16);
    cylX(B.paint, e1, M - 0.10, 0, gz, 0.098 + j, 0.088 + j, 16);
    cylX(B.paint, M - 0.10, M, 0, gz, 0.100, 0.100, 16);
    cylX(B.dark, M - 0.005, M + 0.002, 0, gz, 0.062, 0.062, 12);
    if (sleeve) {
      for (x = x0 + 0.40; x < M - 0.35; x += 0.45) {
        var r = x < e0 || x > e1 ? 0.112 + j - (0.024 * (x - x0) / L) : 0.150 + j;
        if (x > e0 - 0.06 && x < e0 + 0.10) continue;
        if (x > e1 - 0.10 && x < e1 + 0.06) continue;
        cylX(B.dark, x, x + 0.03, 0, gz, r + 0.006, r + 0.006, 14);
      }
    }
  }
  /* M239 smoke grenade launcher (R7, R8, R9): six 66 mm tubes, two rows of three, on a base
     plate, pointing forward, out and up.  (x, y, z) the base centre, s the side. */
  function m239(B, x, y, z, s) {
    var d = unit([0.86, s * 0.30, 0.42]), u = unit(cross([0, 0, 1], d)), w = cross(d, u), i, k, c, a;
    slab(B.paint, [x - d[0] * 0.03, y - d[1] * 0.03, z - d[2] * 0.03], d, u, w, 0.03, 0.17, 0.11);
    for (i = -1; i <= 1; i++) for (k = 0; k < 2; k++) {
      c = [x + u[0] * i * 0.10 + w[0] * (k - 0.5) * 0.10, y + u[1] * i * 0.10 + w[1] * (k - 0.5) * 0.10, z + u[2] * i * 0.10 + w[2] * (k - 0.5) * 0.10];
      a = [c[0] + d[0] * 0.24, c[1] + d[1] * 0.24, c[2] + d[2] * 0.24];
      cyl(B.paint, c, a, 0.042, 0.042, 10);
      cyl(B.dark, a, [a[0] + d[0] * 0.005, a[1] + d[1] * 0.005, a[2] + d[2] * 0.005], 0.033, 0.033, 10);
    }
  }
  /* a 20 l jerrycan in its bracket against a turret side, x0..x1 along the hull (R7, R9) */
  function jerry(B, x0, x1, yin, s, z0, z1) {
    var y0 = s > 0 ? yin : -yin - 0.17, y1 = s > 0 ? yin + 0.17 : -yin;
    box(B.paint, x0, x1, y0, y1, z0, z1);
    box(B.paint, x0 + 0.03, x0 + 0.13, y0 + 0.03, y1 - 0.03, z1, z1 + 0.04);
    box(B.dark, (x0 + x1) / 2 - 0.02, (x0 + x1) / 2 + 0.02, y0 - 0.005, y1 + 0.005, z0 + 0.02, z1 - 0.02);
    box(B.dark, x0 - 0.02, x1 + 0.02, s > 0 ? yin - 0.04 : -yin, s > 0 ? yin : -yin + 0.04, z0 - 0.03, z0);
  }
  /* an M2HB .50 (body, barrel with its jacket) along +x from (x, y, z), elevation el */
  function m2(B, x, y, z, el) {
    var c = Math.cos(el), s = Math.sin(el), d = [c, 0, s];
    slab(B.dark, [x + c * 0.28, y, z + s * 0.28], d, [0, 1, 0], [-s, 0, c], 0.32, 0.06, 0.08);
    cyl(B.dark, [x + c * 0.60, y, z + s * 0.60], [x + c * 1.66, y, z + s * 1.66], 0.024, 0.022, 8);
    cyl(B.dark, [x + c * 0.58, y, z + s * 0.58], [x + c * 0.80, y, z + s * 0.80], 0.04, 0.04, 8);
    slab(B.dark, [x + c * 0.30, y - 0.12, z + s * 0.30 - 0.02], d, [0, 1, 0], [-s, 0, c], 0.10, 0.06, 0.07);
  }
  /* an M240 (body, barrel, flash hider, butt) along +x from (x, y, z), elevation el */
  function m240(B, x, y, z, el) {
    var c = Math.cos(el), s = Math.sin(el), d = [c, 0, s];
    slab(B.dark, [x + c * 0.20, y, z + s * 0.20], d, [0, 1, 0], [-s, 0, c], 0.25, 0.04, 0.06);
    cyl(B.dark, [x + c * 0.45, y, z + s * 0.45], [x + c * 1.02, y, z + s * 1.02], 0.016, 0.016, 6);
    cyl(B.dark, [x + c * 0.98, y, z + s * 0.98], [x + c * 1.08, y, z + s * 1.08], 0.024, 0.024, 6);
    slab(B.dark, [x - c * 0.12, y, z - s * 0.12 - 0.02], d, [0, 1, 0], [-s, 0, c], 0.10, 0.025, 0.05);
    slab(B.dark, [x + c * 0.18, y + 0.08, z + s * 0.18 - 0.02], d, [0, 1, 0], [-s, 0, c], 0.08, 0.04, 0.06);
  }
  /* the crosswind sensor mast (R7, R9): a thin pole with a ball head, h tall from (x, y, z) */
  function mast(B, x, y, z, h) {
    cylZ(B.dark, x, y, z - 0.02, z + 0.08, 0.05, 8);
    cyl(B.dark, [x, y, z + 0.08], [x, y, z + h - 0.06], 0.022, 0.018, 6);
    B.lens.col = [0.55, 0.58, 0.60];
    cyl(B.lens, [x, y, z + h - 0.10], [x, y, z + h], 0.05, 0.05, 10);
    cylZ(B.dark, x, y, z + h, z + h + 0.012, 0.035, 8);
  }
  /* mesh panel between two points at heights z0..z1 (the baskets of R7, R9) */
  function mesh(B, a, b, z0, z1) {
    var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy);
    if (l < 1e-3) return;
    slab(B.dark, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (z0 + z1) / 2], [dx / l, dy / l, 0], [-dy / l, dx / l, 0], [0, 0, 1], l / 2, 0.006, (z1 - z0) / 2);
  }

  /* ======================================================= M48 (us_m48.js) */
  var K48 = (function () {
    /* dimensions (copied) */
    var TKY = 1.46, TKW = 0.355;
    var RW = 0.33, ZW = 0.44;
    var WX = [1.78, 1.01, 0.24, -0.53, -1.30, -2.07];
    /* return rollers: the A2's three (us_m48.js, R5) or the A1-hull five of the ROC M48A3s (R1,
       R2): one over each of the first five gaps at 0.62 of the gap behind the wheel ahead,
       measured off the Chengkungling M48 side view (0.59-0.67), at the A2's heights */
    var ROLS = {
      a2: [[1.42, 1.02], [-0.15, 1.04], [-2.50, 1.07]],
      a3: [[1.30, 1.02], [0.53, 1.03], [-0.24, 1.04], [-1.01, 1.05], [-1.78, 1.06]]
    };
    var ROL = ROLS.a2;
    var IDL = { x: 2.62, z: 0.70, r: 0.31 };
    var SPR = { x: -2.98, z: 0.80, r: 0.33 };
    var ZF = 1.32, FW = 1.815;
    var TRX = 0.15, ZR = 1.50;
    var GZ = 0.50;
    var MUZ68 = 5.64;          /* the M68's muzzle over the ring: 9.31 m (A5) / 9.30 m (CM-11) gun forward */
    var ST = [
      [-3.45, 0.98, 1.06, 0.96, 1.22, 0.62],
      [-3.41, 1.02, 1.13, 1.02, 1.33, 0.49],
      [-3.30, 1.04, 1.16, 1.04, 1.39, 0.44],
      [-2.60, 1.06, 1.17, 1.05, 1.42, 0.42],
      [-1.35, 1.06, 1.17, 1.05, 1.46, 0.42],
      [-1.05, 1.06, 1.17, 1.05, ZR, 0.42],
      [ 1.20, 1.06, 1.17, 1.05, ZR, 0.42],
      [ 1.55, 1.06, 1.16, 1.02, 1.46, 0.42],
      [ 1.95, 1.06, 1.13, 0.97, 1.37, 0.42],
      [ 2.35, 1.05, 1.06, 0.92, 1.25, 0.43],
      [ 2.70, 1.02, 1.02, 0.88, 1.13, 0.46],
      [ 3.00, 0.97, 0.97, 0.84, 1.02, 0.51],
      [ 3.22, 0.90, 0.90, 0.78, 0.94, 0.57],
      [ 3.38, 0.80, 0.80, 0.68, 0.87, 0.63],
      [ 3.48, 0.66, 0.66, 0.56, 0.82, 0.68],
      [ 3.54, 0.46, 0.46, 0.38, 0.79, 0.72],
      [ 3.565, 0.22, 0.22, 0.18, 0.775, 0.745]
    ];
    function lerpST(x, k) {
      var i, f;
      if (x <= ST[0][0]) return ST[0][k];
      for (i = 0; i + 1 < ST.length; i++)
        if (x <= ST[i + 1][0]) { f = (x - ST[i][0]) / (ST[i + 1][0] - ST[i][0]); return ST[i][k] + f * (ST[i + 1][k] - ST[i][k]); }
      return ST[ST.length - 1][k];
    }
    function hullZ(x) { return lerpST(x, 4); }
    /* turret dome (copied) */
    var TXC = -0.05, TAF = 1.85, TAR = 1.78, TWM = 1.50, THM = 0.92, TE = 2.3;
    function tu(x) { return (x - TXC) / (x >= TXC ? TAF : TAR); }
    function tw(x) { var u = Math.abs(tu(x)); return TWM * Math.pow(Math.max(0, 1 - Math.pow(Math.min(1, u), 2.4)), 1 / 2.4); }
    function th(x) { var u = Math.min(1, Math.abs(tu(x))); return THM * (1 - (x >= TXC ? 0.48 : 0.62) * Math.pow(u, 2.0)); }
    function tz(x, y) {
      var w = tw(x), r;
      if (w <= 0.01) return 0;
      r = Math.min(1, Math.abs(y) / w);
      return th(x) * Math.pow(1 - Math.pow(r, TE), 1 / TE);
    }
    function twAt(x, z) { var h = th(x); if (z >= h) return 0; return tw(x) * Math.pow(1 - Math.pow(Math.max(0, z) / h, TE), 1 / TE); }

    /* ---------------- hull (copied; ROC: exhaust hoods, phone box, shackles - R4) */
    function hullRing(s) {
      var x = s[0], wl = s[1], wu = s[2], wr = s[3], zt = s[4], zb = s[5], h = zt - zb, ring = [], j;
      var zf = Math.min(ZF - 0.02, zt - 0.10), half;
      if (zf < zb + 0.35 * h) zf = zb + 0.35 * h;
      half = [[0, zt], [wr, zt], [wr + (wu - wr) * 0.7, zt - Math.min(0.05, 0.2 * h)], [wu, zt - Math.min(0.12, 0.3 * h)], [wu, zf], [wl, zf - 0.005],
              [wl, zb + 0.34 * (zf - zb)], [wl * 0.94, zb + 0.13 * (zf - zb)], [wl * 0.78, zb + 0.025 * (zf - zb)], [wl * 0.5, zb], [0, zb]];
      for (j = 0; j < half.length; j++) ring.push([x, half[j][0], half[j][1]]);
      for (j = half.length - 2; j >= 1; j--) ring.push([x, -half[j][0], half[j][1]]);
      return ring;
    }
    function addHull(B, V) {
      var P = B.paint, D = B.dark, G = B.lens, TM = B.team;
      var rings = [], i, k, s, x, z, y0, y1, zt0, zt1, cr = [];
      ROL = ROLS[V.rol] || ROLS.a2;
      G.col = GLASS;
      for (i = 0; i < ST.length; i++) rings.push(hullRing(ST[i]));
      for (k = 0; k < rings[0].length; k++) cr.push(k === 1 || k === rings[0].length - 1 || k === 4 || k === 5 || k === rings[0].length - 4 || k === rings[0].length - 5);
      loft(P, rings, cr);
      cyl(P, [3.47, 0.62, 0.81], [3.47, -0.62, 0.81], 0.05, 0.05, 10);

      for (s = -1; s <= 1; s += 2) {
        mbox(P, s, -3.40, 2.42, 1.10, FW, ZF - 0.035, ZF);
        mbox(P, s, -3.40, 2.42, FW - 0.035, FW, ZF - 0.12, ZF + 0.02);
        y0 = s > 0 ? 1.04 : -FW; y1 = s > 0 ? FW : -1.04;
        belt(P, 2.42, ZF - 0.017, 3.30, 0.90, y0, y1, 0.035);
        belt(P, 2.42, ZF - 0.08, 3.30, 0.84, s > 0 ? FW - 0.035 : -FW, s > 0 ? FW : -FW + 0.035, 0.13);
        belt(P, 3.29, 0.90, 3.33, 0.78, y0, y1, 0.035);
        belt(P, -3.40, ZF - 0.017, -3.52, ZF - 0.22, y0, y1, 0.03);
        for (i = 0; i < WX.length; i++) {
          mbox(P, s, WX[i] + 0.02, WX[i] + 0.30, 1.04, 1.18, ZW - 0.04, ZW + 0.10);
          mbox(D, s, WX[i] + 0.25, WX[i] + 0.37, 1.04, 1.14, ZW + 0.22, ZW + 0.32);
        }
        for (i = 0; i < ROL.length; i++) mbox(P, s, ROL[i][0] - 0.06, ROL[i][0] + 0.06, 1.04, 1.24, ROL[i][1] - 0.05, ROL[i][1] + 0.05);
        belt(P, IDL.x, IDL.z, WX[0] + 0.25, ZW + 0.12, s > 0 ? 1.04 : -1.20, s > 0 ? 1.20 : -1.04, 0.12);
        cylY(P, SPR.x, s * 1.04, s * 1.16, SPR.z, 0.22, 12);

        var hx = 2.72, hy = s * 0.96, hz = hullZ(2.72);
        box(P, hx - 0.10, hx + 0.08, hy - 0.13, hy + 0.13, hz - 0.02, hz + 0.16);
        G.col = LAMP;
        for (k = -1; k <= 1; k += 2) {
          cylX(P, hx + 0.06, hx + 0.14, hy + k * 0.065, hz + 0.10, 0.055, 0.06, 10);
          cylX(G, hx + 0.14, hx + 0.15, hy + k * 0.065, hz + 0.10, 0.048, 0.048, 10);
        }
        cyl(D, [hx - 0.06, hy - 0.17, hz], [hx + 0.24, hy - 0.17, hz + 0.24], 0.015, 0.015, 5);
        cyl(D, [hx - 0.06, hy + 0.17, hz], [hx + 0.24, hy + 0.17, hz + 0.24], 0.015, 0.015, 5);
        cyl(D, [hx + 0.24, hy - 0.17, hz + 0.24], [hx + 0.24, hy + 0.17, hz + 0.24], 0.015, 0.015, 5);

        mbox(P, s, 1.15, 2.30, 1.24, 1.76, ZF, ZF + 0.30);
        mbox(D, s, 1.15, 2.30, 1.235, 1.765, ZF + 0.30, ZF + 0.315);
        mbox(P, s, -3.05, -1.20, 1.24, 1.76, ZF, ZF + 0.32);
        mbox(D, s, -3.05, -1.20, 1.235, 1.765, ZF + 0.32, ZF + 0.335);
        for (k = 0; k < 3; k++) mbox(D, s, -2.75 + k * 0.6, -2.70 + k * 0.6, 1.76, 1.775, ZF + 0.10, ZF + 0.24);
        mbox(TM, s, -2.55, -1.75, 1.36, 1.64, ZF + 0.335, ZF + 0.35);
        /* armoured taillight box at the rear corner (R4 shows them on the ROC hull) */
        box(P, -3.52, -3.36, s > 0 ? 1.20 : -1.48, s > 0 ? 1.48 : -1.20, ZF - 0.06, ZF + 0.16);
        G.col = RED;
        box(G, -3.53, -3.52, s > 0 ? 1.26 : -1.42, s > 0 ? 1.42 : -1.26, ZF + 0.02, ZF + 0.10);
        G.col = GLASS;
        box(D, 3.30, 3.48, s * 0.52 - 0.05, s * 0.52 + 0.05, 0.66, 0.78);
        /* ROC: the two tow shackles low on the rear plate (R4) in place of the A2's hooks */
        box(D, -3.52, -3.42, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.62, 0.80);
        cylY(D, -3.55, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.66, 0.035, 8);
        /* ROC M48A3 hull: the louvred exhaust hood on each rear corner of the deck (R4: 0.28 m
           wide, 0.16 m over the deck; its length is not seen - drawn 0.45 m) */
        var hy0 = s * 0.86, hz0 = hullZ(-3.10);
        cyl(P, [-3.36, hy0, hz0], [-2.91, hy0, hz0], 0.15, 0.15, 12);
        for (k = 0; k < 4; k++) box(D, -3.33 + k * 0.105, -3.29 + k * 0.105, hy0 - 0.13, hy0 + 0.13, hz0 + 0.10, hz0 + 0.155);
        box(P, -3.38, -3.33, hy0 - 0.16, hy0 + 0.16, hz0 - 0.01, hz0 + 0.17);
      }

      z = hullZ(1.70);
      cylZ(P, 1.70, 0, z - 0.04, z + 0.05, 0.31, 18);
      cylZ(P, 1.70, 0, z + 0.05, z + 0.08, 0.26, 18);
      for (k = -1; k <= 1; k++) box(G, 1.98, 2.04, k * 0.17 - 0.05, k * 0.17 + 0.05, z - 0.01, z + 0.07);
      for (s = -1; s <= 1; s += 2) slab(D, [2.30, s * 0.62, hullZ(2.30) + 0.04], [1, 0, -0.33], [0, 1, 0], [0.33, 0, 1], 0.06, 0.015, 0.05);

      /* engine deck doors (copied; the A3/A5 conversions kept the A2 deck, en.wikipedia) */
      for (s = -1; s <= 1; s += 2) {
        y0 = s > 0 ? 0.05 : -0.98; y1 = s > 0 ? 0.98 : -0.05;
        zt0 = hullZ(-2.95); zt1 = hullZ(-1.45);
        hexa(P, [[-2.95, y0, zt0 - 0.01], [-1.45, y0, zt1 - 0.01], [-1.45, y1, zt1 - 0.01], [-2.95, y1, zt0 - 0.01],
                 [-2.95, y0, zt0 + 0.04], [-1.45, y0, zt1 + 0.04], [-1.45, y1, zt1 + 0.04], [-2.95, y1, zt0 + 0.04]]);
        for (k = 0; k < 9; k++) {
          x = -2.85 + k * 0.155;
          box(D, x, x + 0.06, y0 + 0.08, y1 - 0.08, hullZ(x) + 0.035, hullZ(x) + 0.06);
        }
        box(D, -2.40, -2.30, s * 0.03 - 0.03, s * 0.03 + 0.03, hullZ(-2.35) + 0.04, hullZ(-2.35) + 0.07);
        box(D, -1.75, -1.65, s * 0.03 - 0.03, s * 0.03 + 0.03, hullZ(-1.70) + 0.04, hullZ(-1.70) + 0.07);
      }
      box(P, -3.32, -3.02, -0.70, 0.70, hullZ(-3.17) - 0.01, hullZ(-3.17) + 0.03);
      for (k = 0; k < 3; k++) box(D, -3.28 + k * 0.09, -3.24 + k * 0.09, -0.66, 0.66, hullZ(-3.17) + 0.03, hullZ(-3.17) + 0.045);
      for (s = -1; s <= 1; s += 2) mbox(P, s, -1.38, -1.08, 0.70, 1.02, hullZ(-1.2), hullZ(-1.2) + 0.18);
      /* rear plate: the grille band across its top, the phone box on the left (R4), the pintle */
      box(D, -3.47, -3.43, -0.80, 0.80, 0.98, 1.20);
      for (k = 0; k < 4; k++) box(P, -3.49, -3.46, -0.82, 0.82, 1.00 + k * 0.055, 1.02 + k * 0.055);
      box(P, -3.50, -3.43, 0.25, 0.62, 0.74, 0.94);
      cylX(D, -3.62, -3.45, 0, 0.66, 0.06, 0.06, 8);
    }

    /* ---------------- running gear (copied; roller table by variant) */
    function addRunning(B) {
      var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts, W = B.wheel;
      for (i = 0; i < WX.length; i++) C.push([WX[i], ZW, RW + 0.065]);
      for (i = 0; i < ROL.length; i++) C.push([ROL[i][0], ROL[i][1], 0.105 + 0.045]);
      C.push([IDL.x, IDL.z, IDL.r + 0.045], [SPR.x, SPR.z, SPR.r + 0.045]);
      pts = [];
      for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
      pts = hull2(pts);
      n = pts.length;
      for (i = 0; i < n; i++) {
        a = pts[i]; b = pts[(i + 1) % n];
        l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        if (l < 1e-4) continue;
        segs.push([a, b, l]); tot += l;
      }
      n = segs.length;
      cnt = Math.round(tot / 0.305); step = tot / cnt;
      for (s = -1; s <= 1; s += 2) {
        y = s * TKY;
        for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TKW, y + TKW, 0.05);
        q = 0; rem = 0;
        for (k = 0; k < cnt; k++) {
          d = (k + 0.5) * step;
          while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
          t = (d - rem) / segs[q][2];
          a = segs[q][0]; b = segs[q][1];
          dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
          px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
          belt(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y - TKW, y - 0.04, 0.085);
          belt(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y + 0.04, y + TKW, 0.085);
          belt(B.dark, px - dx * 0.04 - dz * 0.08, pz - dz * 0.04 + dx * 0.08, px + dx * 0.04 - dz * 0.08, pz + dz * 0.04 + dx * 0.08, y - 0.03, y + 0.03, 0.07);
        }
        for (i = 0; i < ROL.length; i++) {
          W.col = [0.13, 0.135, 0.125];
          cylY(W, ROL[i][0], y - 0.20, y - 0.06, ROL[i][1], 0.105, 12);
          cylY(W, ROL[i][0], y + 0.06, y + 0.20, ROL[i][1], 0.105, 12);
          W.col = [0.34, 0.34, 0.22];
          cylY(W, ROL[i][0], y + s * 0.20, y + s * 0.24, ROL[i][1], 0.06, 8);
        }
        W.col = [0.13, 0.135, 0.125];
        cylY(W, IDL.x, y - 0.23, y - 0.06, IDL.z, IDL.r, 18);
        cylY(W, IDL.x, y + 0.06, y + 0.23, IDL.z, IDL.r, 18);
        W.col = [0.36, 0.36, 0.24];
        cyl(W, [IDL.x, y + s * 0.23, IDL.z], [IDL.x, y + s * 0.25, IDL.z], IDL.r - 0.04, 0.17, 16);
        cylY(W, IDL.x, y + s * 0.24, y + s * 0.29, IDL.z, 0.09, 10);
        var pt = [];
        for (k = 0; k < 22; k++) { a = k / 22 * TAU; pt.push([SPR.x + Math.cos(a) * (k % 2 ? 0.30 : 0.375), SPR.z + Math.sin(a) * (k % 2 ? 0.30 : 0.375)]); }
        W.col = [0.30, 0.30, 0.20];
        prismXZ(W, pt, y - 0.20, y - 0.10);
        prismXZ(W, pt, y + 0.10, y + 0.20);
        W.col = [0.36, 0.36, 0.24];
        cylY(W, SPR.x, y - 0.10, y + 0.10, SPR.z, 0.27, 14);
        cyl(W, [SPR.x, y + s * 0.20, SPR.z], [SPR.x, y + s * 0.26, SPR.z], 0.25, 0.14, 14);
        W.col = [0.2, 0.2, 0.15];
        cylY(W, SPR.x, y + s * 0.25, y + s * 0.30, SPR.z, 0.07, 8);
      }
    }
    function addWheelPair(W) {
      var s, y, BODY = [0.34, 0.37, 0.25], RIM = [0.40, 0.43, 0.30], TYRE = [0.13, 0.135, 0.125], HUB = [0.28, 0.31, 0.21];
      for (s = -1; s <= 1; s += 2) {
        y = s * TKY;
        W.col = TYRE;
        cylY(W, 0, y - 0.24, y - 0.08, 0, RW, 18);
        cylY(W, 0, y + 0.08, y + 0.24, 0, RW, 18);
        W.col = BODY;
        cylY(W, 0, y - 0.08, y + 0.08, 0, 0.28, 14);
        cyl(W, [0, y + s * 0.24, 0], [0, y + s * 0.255, 0], RW - 0.035, RW - 0.06, 20);
        cyl(W, [0, y - s * 0.24, 0], [0, y - s * 0.255, 0], RW - 0.035, RW - 0.06, 20);
        W.col = RIM;
        cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.29, 0], 0.15, 0.11, 14);
        W.col = HUB;
        cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.268, 0], 0.17, 0.17, 14, true);
        cylY(W, 0, y + s * 0.29, y + s * 0.31, 0, 0.06, 8);
      }
    }

    /* ---------------- turret (copied; gun, cupola and the CM-11 fittings by variant) */
    function addTurret(B, V) {
      var P = B.paint, D = B.dark, G = B.lens, TM = B.team;
      var rings = [], US = [-0.985, -0.95, -0.89, -0.80, -0.68, -0.53, -0.37, -0.20, -0.03, 0.14, 0.31, 0.48, 0.63, 0.76, 0.86, 0.93, 0.97, 0.99];
      var ex = 2 / TE, NS = 22, crease = [], i, k, u, x, w, h, ring, an, cs, sn, z0, cx, cy, s;
      G.col = GLASS;
      for (i = 0; i < US.length; i++) {
        u = US[i]; x = TXC + (u >= 0 ? TAF : TAR) * u; w = tw(x); h = th(x); ring = [];
        for (k = 0; k <= NS; k++) {
          an = Math.PI * k / NS; cs = Math.cos(an); sn = Math.sin(an);
          ring.push([x, w * (cs < 0 ? -1 : 1) * Math.pow(Math.abs(cs), ex), h * Math.pow(Math.abs(sn), ex)]);
        }
        rings.push(ring);
      }
      for (k = 0; k <= NS; k++) crease.push(k === 0 || k === NS);
      loft(P, rings, crease);
      for (i = 0; i < 40; i++) {
        var a0 = i / 40 * TAU, a1 = (i + 1) / 40 * TAU;
        var p0 = [TXC + Math.cos(a0) * (Math.cos(a0) >= 0 ? TAF : TAR) * 0.985, Math.sin(a0) * TWM * 0.99, 0.0];
        var p1 = [TXC + Math.cos(a1) * (Math.cos(a1) >= 0 ? TAF : TAR) * 0.985, Math.sin(a1) * TWM * 0.99, 0.0];
        p0[1] = (p0[1] < 0 ? -1 : 1) * Math.min(Math.abs(p0[1]), tw(p0[0])); p1[1] = (p1[1] < 0 ? -1 : 1) * Math.min(Math.abs(p1[1]), tw(p1[0]));
        cyl(D, [p0[0], p0[1], 0.015], [p1[0], p1[1], 0.015], 0.02, 0.02, 4, true);
      }
      /* the cast mantlet (copied) */
      rings = [];
      for (i = 1; i <= 8; i++) {
        an = Math.PI * i / 9; ring = [];
        for (k = 0; k < 16; k++) {
          u = k / 16 * TAU;
          ring.push([1.72 + 0.30 * Math.cos(an), 0.50 * Math.sin(an) * Math.cos(u), GZ - 0.03 + 0.40 * Math.sin(an) * Math.sin(u)]);
        }
        rings.push(ring);
      }
      loft(P, rings, null);
      cylX(P, 1.95, 2.12, 0, GZ, 0.17, 0.14, 16);

      if (V.gun === "m41") {
        /* the 90 mm M41 with the T-shaped blast deflector (copied; R2, R3 on ROC A3s) */
        cylX(P, 2.12, 4.02, 0, GZ, 0.098, 0.082, 16);
        cylX(P, 4.02, 4.1, 0, GZ, 0.082, 0.112, 16);
        cylX(P, 4.1, 4.62, 0, GZ, 0.112, 0.112, 16);
        cylX(P, 4.62, 4.68, 0, GZ, 0.112, 0.080, 16);
        cylX(P, 4.68, 4.78, 0, GZ, 0.078, 0.078, 14);
        cylX(P, 4.78, 4.86, 0, GZ, 0.10, 0.10, 14);
        cylY(P, 4.93, -0.27, 0.27, GZ, 0.085, 14);
        box(P, 4.85, 5.01, -0.09, 0.09, GZ - 0.075, GZ + 0.075);
        cylY(D, 4.93, -0.275, -0.255, GZ, 0.07, 12);
        cylY(D, 4.93, 0.255, 0.275, GZ, 0.07, 12);
        cylX(D, 5.008, 5.015, 0, GZ, 0.05, 0.05, 12);
      } else {
        /* the M68 105 mm (nato_e60_mbt.js) in the M48 mantlet, muzzle at the published 9.31 m
           (M48A5) / 9.30 m (CM-11) gun forward; the CM-11's with the thermal sleeve (R6) */
        tubeM68(B, 2.12, MUZ68, GZ, V.sleeve);
      }
      cylX(D, 1.98, 2.08, 0.27, GZ - 0.05, 0.035, 0.035, 8);
      cylX(D, 1.95, 2.04, -0.30, GZ + 0.08, 0.05, 0.05, 10);

      for (s = -1; s <= 1; s += 2) {
        x = 0.70; z0 = 0.50; w = twAt(x, z0);
        cyl(P, [x, s * (w - 0.10), z0], [x, s * (w + 0.06), z0], 0.12, 0.10, 14);
        cylY(D, x, s * (w + 0.06), s * (w + 0.075), z0, 0.065, 10);
      }

      cx = -0.40; cy = -0.56; z0 = tz(cx, cy) - 0.06;
      if (V.cupola === "urdan") {
        /* the Urdan low-profile cupola (R6-R8, en.wikipedia "CM11 Brave Tiger"): a squat drum
           on the M1's ring with vision blocks all round, a flat hatch, the M2 .50 on a pintle
           at its front (R8: on the commander's, RIGHT, side) */
        cylZ(P, cx, cy, z0 - 0.02, z0 + 0.10, 0.47, 22);
        cyl(P, [cx, cy, z0 + 0.10], [cx, cy, z0 + 0.27], 0.44, 0.41, 22);
        for (i = 0; i < 8; i++) {
          an = (i + 0.5) / 8 * TAU;
          slab(G, [cx + Math.cos(an) * 0.425, cy + Math.sin(an) * 0.425, z0 + 0.19], [Math.cos(an), Math.sin(an), 0], [-Math.sin(an), Math.cos(an), 0], [0, 0, 1], 0.02, 0.08, 0.04);
        }
        cylZ(P, cx - 0.04, cy, z0 + 0.27, z0 + 0.31, 0.32, 18);
        cyl(P, [cx - 0.04, cy, z0 + 0.31], [cx - 0.04, cy, z0 + 0.34], 0.30, 0.22, 16);
        box(D, cx + 0.30, cx + 0.40, cy - 0.04, cy + 0.04, z0 + 0.27, z0 + 0.42);
        m2(B, cx + 0.32, cy, z0 + 0.48, 0.06);
      } else {
        /* the M1 cupola straight on the dome, no riser (copied; R1-R3) */
        var CPR = [[0.0, 0.44], [0.13, 0.45], [0.28, 0.43], [0.41, 0.38], [0.50, 0.30], [0.55, 0.18], [0.56, 0.0]];
        rings = [];
        for (i = 0; i < CPR.length - 1; i++) {
          ring = [];
          for (k = 0; k < 20; k++) { an = k / 20 * TAU; ring.push([cx + Math.cos(an) * CPR[i][1] * 1.05, cy + Math.sin(an) * CPR[i][1], z0 + CPR[i][0]]); }
          rings.push(ring);
        }
        loft(P, rings, null);
        cylZ(P, cx, cy, z0 + 0.50, z0 + 0.57, 0.25, 16);
        for (i = 0; i < 6; i++) {
          an = (i < 4 ? -2.2 + i * 1.1 : 2.6 + (i - 4) * 1.08);
          slab(G, [cx + Math.cos(an) * 0.42, cy + Math.sin(an) * 0.40, z0 + 0.34], [Math.cos(an), Math.sin(an), 0], [-Math.sin(an), Math.cos(an), 0], [0, 0, 1], 0.03, 0.07, 0.04);
        }
        box(P, cx - 0.10, cx + 0.08, cy - 0.06, cy + 0.06, z0 + 0.57, z0 + 0.795);
        box(G, cx + 0.08, cx + 0.09, cy - 0.045, cy + 0.045, z0 + 0.66, z0 + 0.74);
        box(P, cx + 0.36, cx + 0.50, cy - 0.02, cy + 0.20, z0 + 0.08, z0 + 0.26);
        cylX(D, cx + 0.50, cx + 1.30, cy + 0.09, z0 + 0.18, 0.024, 0.022, 6);
        cylX(D, cx + 0.50, cx + 0.72, cy + 0.09, z0 + 0.18, 0.04, 0.04, 8);
        cylX(D, cx + 1.24, cx + 1.36, cy + 0.09, z0 + 0.18, 0.032, 0.032, 6);
        box(P, cx - 0.10, cx + 0.22, cy - 0.58, cy - 0.40, z0 + 0.02, z0 + 0.22);
      }

      /* loader's hatch, left (copied) */
      cx = -0.50; cy = 0.60; z0 = tz(cx, cy);
      cylZ(P, cx, cy, z0 - 0.10, z0 + 0.07, 0.30, 16);
      cylZ(P, cx, cy, z0 + 0.07, z0 + 0.10, 0.27, 16);
      box(D, cx - 0.05, cx + 0.05, cy - 0.30, cy - 0.24, z0 + 0.05, z0 + 0.10);
      cx = 0.80; cy = -0.42; z0 = tz(cx, cy);
      box(P, cx - 0.09, cx + 0.09, cy - 0.11, cy + 0.11, z0 - 0.03, z0 + 0.10);
      box(G, cx + 0.09, cx + 0.10, cy - 0.08, cy + 0.08, z0 + 0.02, z0 + 0.08);
      if (!V.cm11) {
        cx = -0.95; z0 = tz(cx, 0);
        cylZ(P, cx, 0.05, z0 - 0.05, z0 + 0.08, 0.17, 14);
        cylZ(P, cx, 0.05, z0 + 0.08, z0 + 0.11, 0.12, 12);
      }
      for (s = -1; s <= 1; s += 2) {
        cx = -1.30; cy = s * 0.80; z0 = tz(cx, cy);
        cylZ(P, cx, cy, z0 - 0.06, z0 + 0.10, 0.065, 8);
      }
      cyl(D, [-1.30, -0.80, tz(-1.30, -0.80) + 0.10], [-1.30, -0.80, tz(-1.30, -0.80) + 1.05], 0.012, 0.006, 5);
      for (s = -1; s <= 1; s += 2) { cx = 1.15; cy = s * 0.70; z0 = tz(cx, cy); cylY(P, cx, cy - 0.04, cy + 0.04, z0 + 0.03, 0.07, 8); }
      var RZ = 0.46, RX = [-1.10, -0.80, -0.50, -0.20, 0.10, 0.40], RY = [], pa, pb;
      for (i = 0; i < RX.length; i++) RY.push(twAt(RX[i], RZ));
      for (s = -1; s <= 1; s += 2) {
        for (i = 0; i + 1 < RX.length; i++) {
          pa = [RX[i], s * (RY[i] + 0.05), RZ]; pb = [RX[i + 1], s * (RY[i + 1] + 0.05), RZ];
          cyl(D, pa, pb, 0.014, 0.014, 5, true);
        }
        for (i = 0; i < RX.length; i += 2) mbox(D, s, RX[i] - 0.02, RX[i] + 0.02, RY[i] - 0.02, RY[i] + 0.06, RZ - 0.025, RZ + 0.025);
      }

      /* the stowage basket round the turret rear (copied; R1, R6, R7) */
      var BA = [], na = 12, ang, bx, by, wz, R0 = 0.11;
      for (i = 0; i <= na; i++) {
        ang = Math.PI * 0.68 + (Math.PI * 0.64) * i / na;
        bx = TXC + Math.cos(ang) * TAR * 0.92; by = Math.sin(ang) * TWM;
        by = (by < 0 ? -1 : 1) * Math.min(Math.abs(by), twAt(bx, 0.20));
        BA.push([bx + Math.cos(ang) * R0, by + Math.sin(ang) * R0]);
      }
      [0.20, 0.42, 0.66].forEach(function (zz, j) {
        for (i = 0; i < na; i++) cyl(j === 0 ? D : P, [BA[i][0], BA[i][1], zz], [BA[i + 1][0], BA[i + 1][1], zz], 0.017, 0.017, 5, true);
      });
      for (i = 0; i <= na; i += 2) {
        cyl(P, [BA[i][0], BA[i][1], 0.18], [BA[i][0], BA[i][1], 0.68], 0.016, 0.016, 5, true);
        wz = 0.20; bx = BA[i][0] - Math.cos(Math.PI * 0.68 + (Math.PI * 0.64) * i / na) * (R0 + 0.02); by = BA[i][1] - Math.sin(Math.PI * 0.68 + (Math.PI * 0.64) * i / na) * (R0 + 0.02);
        cyl(D, [bx, by, wz], [BA[i][0], BA[i][1], wz], 0.015, 0.015, 4, true);
      }
      /* CM-11: mesh lining the basket (R7) */
      if (V.cm11) for (i = 0; i < na; i++) mesh(B, BA[i], BA[i + 1], 0.22, 0.64);

      if (V.cm11) {
        /* --- CM-11 fittings (R7 placed against the rangefinder blister at x 0.70) --- */
        for (s = -1; s <= 1; s += 2) {
          /* the M239 on a bracket ahead of each cheek, beside the mantlet (R7, R8) */
          w = twAt(1.40, 0.40);
          box(P, 1.30, 1.95, s > 0 ? w - 0.25 : -w - 0.05, s > 0 ? w + 0.05 : -w + 0.25, 0.30, 0.36);
          m239(B, 2.02, s * (w - 0.08), 0.46, s);
          /* the stowage box ahead of the blister (R7 port, R8 starboard) */
          w = twAt(1.25, 0.36);
          box(P, 0.98, 1.58, s > 0 ? w - 0.12 : -w - 0.20, s > 0 ? w + 0.20 : -w + 0.12, 0.18, 0.54);
          box(D, 1.02, 1.54, s > 0 ? w + 0.20 : -w - 0.205, s > 0 ? w + 0.205 : -w - 0.20, 0.47, 0.49);
        }
        /* the plate with its clamps under the port blister (R7) */
        w = twAt(0.70, 0.24);
        box(D, 0.18, 1.22, w - 0.03, w + 0.04, 0.10, 0.40);
        for (k = 0; k < 3; k++) box(P, 0.26 + k * 0.40, 0.36 + k * 0.40, w + 0.04, w + 0.10, 0.14, 0.36);
        /* the jerrycan behind it (R7: x -0.39..-0.93 from the blister) */
        jerry(B, -0.84, -0.50, twAt(-0.67, 0.40) - 0.06, 1, 0.20, 0.67);
        /* the canister at the left rear of the roof with the sensor mast on it (R7, R4) */
        cx = -1.18; cy = 0.50; z0 = tz(cx, cy);
        cylZ(P, cx, cy, z0 - 0.35, z0 + 0.10, 0.24, 18);
        cylZ(P, cx, cy, z0 + 0.10, z0 + 0.15, 0.29, 18);
        mast(B, cx, cy, z0 + 0.15, 0.62);
        /* the loader's M240 on its curved rail ahead of the loader's hatch (R7, R8) */
        cx = -0.10; cy = 0.55; z0 = tz(cx, cy) + 0.18;
        var RA = [], ra;
        for (i = 0; i <= 8; i++) { ra = -1.1 + 2.2 * i / 8; RA.push([cx + Math.cos(ra) * 0.45, cy + Math.sin(ra) * 0.45]); }
        for (i = 0; i < 8; i++) cyl(D, [RA[i][0], RA[i][1], z0], [RA[i + 1][0], RA[i + 1][1], z0], 0.02, 0.02, 5, true);
        [0, 8].forEach(function (j) { cyl(D, [RA[j][0], RA[j][1], tz(RA[j][0], RA[j][1]) - 0.02], [RA[j][0], RA[j][1], z0], 0.02, 0.02, 5, true); });
        box(D, cx + 0.40, cx + 0.50, cy - 0.04, cy + 0.04, z0, z0 + 0.12);
        m240(B, cx + 0.28, cy, z0 + 0.18, 0.08);
      }

      z0 = tz(0.12, 0);
      box(TM, -0.06, 0.30, -0.15, 0.15, z0 - 0.015, z0 + 0.012);
    }

    return { addHull: addHull, addRunning: addRunning, addWheelPair: addWheelPair, addTurret: addTurret, WX: WX, ZW: ZW, TRX: TRX, ZR: ZR };
  })();

  /* ================================================ M60 (nato_e60_mbt.js) */
  var K60 = (function () {
    var NOSE = 3.473, TAIL = -3.473;
    var TY = 1.46, TW = 0.355;
    var XW = [2.03, 1.198, 0.366, -0.466, -1.298, -2.13], ZW = 0.42, RW = 0.33;
    var IDL = { x: 2.98, z: 0.80, r: 0.31 }, SPR = { x: -3.07, z: 0.86, r: 0.32 };
    var ROL = [1.55, -0.05, -1.70], ZR = 1.20, RR = 0.12;
    var DECK = 1.72, FEND = 1.42, FW = 1.815, WS = 1.50, GL0 = 1.75, GK = 0.50;
    var TX = 0.20;
    var MUZ = TAIL + 9.436 - TX;
    var GZ = 0.42;

    function deckZ(x) { return x <= GL0 ? DECK : DECK - GK * (x - GL0); }
    var HS = [
      [-3.473, 1.02, 0.68, 1.47],
      [-3.43, 1.05, 0.56, 1.49],
      [-3.36, 1.06, 0.48, 1.50],
      [-3.20, 1.06, 0.46, 1.50],
      [-1.50, 1.06, 0.46, 1.50],
      [ 0.20, 1.06, 0.46, 1.50],
      [ 1.75, 1.06, 0.46, 1.50],
      [ 2.05, 1.06, 0.46, 1.49],
      [ 2.32, 1.06, 0.46, 1.45],
      [ 2.38, 1.06, 0.46, 1.06],
      [ 2.75, 1.06, 0.47, 1.06],
      [ 2.85, 1.05, 0.50, 1.05],
      [ 3.05, 1.02, 0.56, 1.02],
      [ 3.22, 0.97, 0.62, 0.97],
      [ 3.36, 0.88, 0.69, 0.88],
      [ 3.44, 0.78, 0.74, 0.78],
      [ 3.473, 0.66, 0.78, 0.66]
    ];
    function hullRing(S) {
      var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = Math.max(deckZ(x), zB + 0.06), e = Math.min(0.03, (zT - zB) / 4);
      var zS = Math.min(FEND, zT - 2 * e);
      if (x < -3.40) zT = Math.min(zT, DECK - (x < -3.45 ? 0.08 : 0.025));
      return [[x, wb, zB], [x, wb, zS], [x, ws, zS], [x, ws, zT - e], [x, ws - e, zT],
              [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, zS], [x, -wb, zS], [x, -wb, zB]];
    }

    /* ---------------- hull (copied whole: R6, R8, R9 show it unchanged) */
    function addHull(B) {
      var R = HS.map(hullRing), i, k, k1, a, b, c, d, e, dy, dz, s, x, n = R[0].length;
      for (i = 0; i + 1 < R.length; i++)
        for (k = 0; k < n; k++) {
          k1 = (k + 1) % n;
          a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
          dy = b[1] - a[1]; dz = b[2] - a[2];
          if (Math.abs(dy) + Math.abs(dz) < 1e-6) { dy = c[1] - d[1]; dz = c[2] - d[2]; }
          if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
          e = [0, dz, -dy];
          triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
        }
      [[0, -1], [R.length - 1, 1]].forEach(function (q) {
        var r = R[q[0]], h = [q[1], 0, 0];
        triN(B.paint, r[0], r[1], r[8], h); triN(B.paint, r[0], r[8], r[9], h);
        triN(B.paint, r[2], r[3], r[6], h); triN(B.paint, r[2], r[6], r[7], h);
        triN(B.paint, r[3], r[4], r[5], h); triN(B.paint, r[3], r[5], r[6], h);
      });

      for (s = -1; s <= 1; s += 2) {
        var yi = s * 1.02, yo = s * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
        box(B.paint, -3.43, 2.95, s > 0 ? WS - 0.02 : -FW, s > 0 ? FW : -(WS - 0.02), FEND, FEND + 0.035);
        box(B.paint, -3.43, 2.95, s > 0 ? FW - 0.025 : -FW, s > 0 ? FW : -FW + 0.025, FEND - 0.06, FEND + 0.035);
        box(B.paint, 2.28, 2.95, ylo, yhi, FEND, FEND + 0.035);
        belt(B.paint, 2.95, FEND + 0.018, 3.36, FEND - 0.05, ylo, yhi, 0.035);
        belt(B.paint, 3.36, FEND - 0.05, 3.46, FEND - 0.34, ylo + 0.01, yhi - 0.01, 0.045);
        box(B.paint, 3.12, 3.44, ylo + 0.01, ylo + 0.045, FEND - 0.30, FEND - 0.02);
        box(B.paint, 3.12, 3.44, yhi - 0.045, yhi - 0.01, FEND - 0.30, FEND - 0.02);
        belt(B.dark, 3.46, FEND - 0.34, 3.48, FEND - 0.56, ylo + 0.06, yhi - 0.06, 0.03);
        belt(B.paint, -3.43, FEND + 0.018, -3.56, FEND - 0.05, s > 0 ? WS : -FW, s > 0 ? FW : -WS, 0.035);
        belt(B.dark, -3.56, FEND - 0.05, -3.58, FEND - 0.32, s > 0 ? WS + 0.04 : -FW + 0.04, s > 0 ? FW - 0.04 : -WS - 0.04, 0.03);
        for (i = 0; i < 4; i++) box(B.dark, -2.6 + i * 1.6, -2.55 + i * 1.6, s > 0 ? 1.05 : -1.12, s > 0 ? 1.12 : -1.05, FEND - 0.16, FEND);

        x = 2.16; var yh = s * 1.17, zh = deckZ(x);
        box(B.paint, x - 0.14, x + 0.10, yh - 0.17, yh + 0.17, zh - 0.06, zh + 0.12);
        B.lens.col = LAMP;
        cylX(B.lens, x + 0.10, x + 0.13, yh - 0.07, zh + 0.05, 0.065, 0.065, 12);
        cylX(B.lens, x + 0.10, x + 0.13, yh + 0.07, zh + 0.05, 0.05, 0.05, 10);
        var NG = 10, prev = null, gg;
        for (gg = 0; gg <= NG; gg++) {
          var ang = Math.PI * gg / NG, P = [x + 0.20, yh + Math.cos(ang) * 0.24, zh + 0.03 + Math.sin(ang) * 0.24];
          if (prev) cyl(B.dark, prev, P, 0.018, 0.018, 5, true);
          prev = P;
        }
        cyl(B.dark, [x - 0.05, yh - 0.24, zh + 0.0], [x + 0.20, yh - 0.24, zh + 0.03], 0.018, 0.018, 5, true);
        cyl(B.dark, [x - 0.05, yh + 0.24, zh + 0.0], [x + 0.20, yh + 0.24, zh + 0.03], 0.018, 0.018, 5, true);
        box(B.dark, 3.30, 3.48, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.70, 0.84);
        cylY(B.dark, 3.44, s * 0.55 - 0.10, s * 0.55 + 0.10, 0.77, 0.035, 8);
        box(B.dark, -3.56, -3.46, s * 0.72 - 0.07, s * 0.72 + 0.07, 0.72, 0.88);
        x = 2.20; box(B.dark, x - 0.06, x + 0.06, s * 1.30 - 0.02, s * 1.30 + 0.02, deckZ(x), deckZ(x) + 0.08);
        box(B.paint, -3.54, -3.47, s * 1.28 - 0.10, s * 1.28 + 0.10, 1.46, 1.64);
        B.lens.col = RED;
        box(B.lens, -3.555, -3.54, s * 1.28 - 0.07, s * 1.28 + 0.07, 1.50, 1.60);
      }

      x = 1.86;
      cylZ(B.paint, x, 0, deckZ(x) - 0.02, deckZ(x) + 0.05, 0.36, 18);
      cylZ(B.paint, x, 0, deckZ(x) + 0.05, deckZ(x) + 0.08, 0.30, 16);
      for (i = -1; i <= 1; i++) {
        var px = 2.16 - Math.abs(i) * 0.04, py = i * 0.20;
        box(B.paint, px - 0.06, px + 0.06, py - 0.08, py + 0.08, deckZ(px) - 0.02, deckZ(px) + 0.08);
        B.lens.col = GLASS;
        box(B.lens, px + 0.06, px + 0.075, py - 0.06, py + 0.06, deckZ(px) + 0.01, deckZ(px) + 0.06);
      }
      slab(B.dark, [2.79, 0, deckZ(2.79) + 0.004], unit([1, 0, -GK]), [0, 1, 0], unit([GK, 0, 1]), 0.012, 1.04, 0.006);

      for (s = -1; s <= 1; s += 2) {
        var y0 = s > 0 ? WS + 0.02 : -FW + 0.03, y1 = s > 0 ? FW - 0.03 : -(WS + 0.02);
        box(B.paint, 0.55, 1.55, y0, y1, FEND + 0.035, FEND + 0.30);
        box(B.dark, 0.55, 1.55, y0 - 0.005, y1 + 0.005, FEND + 0.29, FEND + 0.305);
        box(B.dark, 0.95, 1.05, s > 0 ? y1 : y0 - 0.01, s > 0 ? y1 + 0.01 : y0, FEND + 0.15, FEND + 0.22);
        box(B.paint, -3.30, -2.30, y0, y1, FEND + 0.035, FEND + 0.30);
        box(B.paint, -3.26, -2.34, y0 + 0.02, y1 - 0.02, FEND + 0.30, FEND + 0.33);
        box(B.dark, -2.95, -2.65, s > 0 ? WS - 0.04 : -(WS + 0.04), s > 0 ? WS + 0.04 : -(WS - 0.04), FEND + 0.10, FEND + 0.24);
        for (i = 0; i < 2; i++) box(B.dark, -3.31, -2.29, s > 0 ? y1 - 0.005 : y0 - 0.005, s > 0 ? y1 + 0.005 : y0 + 0.005, FEND + 0.08 + i * 0.13, FEND + 0.10 + i * 0.13);
        cylX(B.dark, -2.10, -0.20, s * (WS + 0.04), FEND + 0.17, 0.022, 0.022, 6);
        box(B.paint, -1.95, -0.35, s > 0 ? WS : -(WS + 0.06), s > 0 ? WS + 0.06 : -WS, FEND + 0.06, FEND + 0.13);
      }

      box(B.dark, -3.40, -2.62, -1.30, 1.30, DECK - 0.01, DECK + 0.012);
      for (i = 0; i < 8; i++) box(B.paint, -3.38 + i * 0.096, -3.33 + i * 0.096, -1.28, 1.28, DECK + 0.012, DECK + 0.04);
      box(B.paint, -3.40, -3.36, -1.30, 1.30, DECK, DECK + 0.05);
      box(B.paint, -2.56, -1.42, -1.25, -0.05, DECK, DECK + 0.03);
      box(B.paint, -2.56, -1.42, 0.05, 1.25, DECK, DECK + 0.03);
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, -2.50, -2.40, s * 0.62 - 0.12, s * 0.62 + 0.12, DECK + 0.03, DECK + 0.05);
        cylZ(B.paint, -1.62, s * 1.30, DECK, DECK + 0.05, 0.09, 10);
      }
      box(B.team, -2.30, -1.70, -0.14, 0.14, DECK + 0.03, DECK + 0.05);

      box(B.dark, -3.50, -3.47, -1.10, 1.10, 1.30, 1.62);
      for (i = 0; i < 6; i++) box(B.paint, -3.53, -3.47, -1.08, 1.08, 1.32 + i * 0.054, 1.34 + i * 0.054);
      box(B.paint, -3.58, -3.47, -0.13, 0.13, 0.86, 1.04);
      cylZ(B.dark, -3.62, 0, 0.84, 1.04, 0.05, 8);
      box(B.paint, -3.56, -3.47, -1.00, -0.76, 1.00, 1.22);
    }

    /* ---------------- running gear (copied whole) */
    function addRunning(B) {
      var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts;
      var TH = 0.045;
      for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + TH]);
      for (i = 0; i < ROL.length; i++) C.push([ROL[i], ZR, RR + TH]);
      C.push([IDL.x, IDL.z, IDL.r + TH], [SPR.x, SPR.z, SPR.r + TH]);
      pts = [];
      for (i = 0; i < C.length; i++) for (k = 0; k < 28; k++) pts.push([C[i][0] + Math.cos(k / 28 * TAU) * C[i][2], C[i][1] + Math.sin(k / 28 * TAU) * C[i][2]]);
      pts = hull2(pts);
      pts = pts.map(function (pt) {
        if (pt[1] < ZR) return pt;
        var j, sag = 0, X = [SPR.x].concat(ROL.slice().reverse(), [IDL.x]);
        for (j = 0; j + 1 < X.length; j++) {
          var x0 = X[j], x1 = X[j + 1];
          if (pt[0] > x0 + 0.15 && pt[0] < x1 - 0.15) { var u = (pt[0] - x0) / (x1 - x0); sag = 0.035 * 4 * u * (1 - u); }
        }
        return [pt[0], pt[1] - sag];
      });
      n = pts.length;
      for (i = 0; i < n; i++) {
        a = pts[i]; b = pts[(i + 1) % n];
        l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        if (l < 1e-4) continue;
        segs.push([a, b, l]); tot += l;
      }
      n = segs.length;
      cnt = Math.round(tot / 0.176); step = tot / cnt;
      for (s = -1; s <= 1; s += 2) {
        y = s * TY;
        for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW + 0.05, y + TW - 0.05, 0.05);
        q = 0; rem = 0;
        for (k = 0; k < cnt; k++) {
          d = (k + 0.5) * step;
          while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
          t = (d - rem) / segs[q][2];
          a = segs[q][0]; b = segs[q][1];
          dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
          px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
          belt(B.dark, px - dx * 0.074, pz - dz * 0.074, px + dx * 0.074, pz + dz * 0.074, y - TW, y + TW, 0.085);
          if (k % 2 === 0) belt(B.dark, px - dx * 0.03 - dz * 0.07, pz - dz * 0.03 + dx * 0.07, px + dx * 0.03 - dz * 0.07, pz + dz * 0.03 + dx * 0.07, y - 0.025, y + 0.025, 0.06);
        }
        for (k = -1; k <= 1; k += 2) {
          var yr0 = y + k * 0.12, yr1 = y + k * 0.21;
          cylY(B.dark, SPR.x, Math.min(yr0, yr1), Math.max(yr0, yr1), SPR.z, SPR.r - 0.03, 18);
          for (i = 0; i < 11; i++) {
            var ta = (i + 0.5 * (k + 1)) / 11 * TAU;
            slab(B.dark, [SPR.x + Math.cos(ta) * (SPR.r - 0.005), (yr0 + yr1) / 2, SPR.z + Math.sin(ta) * (SPR.r - 0.005)],
                 [Math.cos(ta), 0, Math.sin(ta)], [0, 1, 0], [-Math.sin(ta), 0, Math.cos(ta)], 0.035, 0.045, 0.035);
          }
        }
        cylY(B.paint, SPR.x, y - 0.12, y + 0.12, SPR.z, 0.22, 14);
        cylY(B.paint, SPR.x, y + s * 0.21, y + s * 0.27, SPR.z, 0.17, 12);
        cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.30, SPR.z, 0.07, 8);
        cylY(B.paint, SPR.x, s * 1.02, s * 1.20, SPR.z, 0.20, 12);
        cylY(B.dark, IDL.x, y - 0.27, y - 0.10, IDL.z, IDL.r, 18);
        cylY(B.dark, IDL.x, y + 0.10, y + 0.27, IDL.z, IDL.r, 18);
        cylY(B.paint, IDL.x, y - 0.10, y + 0.10, IDL.z, IDL.r - 0.06, 14);
        cyl(B.paint, [IDL.x, y + s * 0.27, IDL.z], [IDL.x, y + s * 0.29, IDL.z], IDL.r - 0.04, 0.12, 16);
        cylY(B.dark, IDL.x, y + s * 0.29, y + s * 0.32, IDL.z, 0.07, 8);
        box(B.dark, IDL.x - 0.40, IDL.x, s * 1.06 - 0.04, s * 1.06 + 0.04, IDL.z - 0.05, IDL.z + 0.05);
        for (i = 0; i < ROL.length; i++) {
          cylY(B.dark, ROL[i], y - 0.26, y - 0.04, ZR, RR, 12);
          cylY(B.dark, ROL[i], y + 0.04, y + 0.26, ZR, RR, 12);
          cylY(B.paint, ROL[i], s * 1.06, y + s * 0.27, ZR, 0.04, 8);
        }
        for (i = 0; i < XW.length; i++) {
          box(B.dark, XW[i] - 0.02, XW[i] + 0.40, s > 0 ? 1.06 : -1.16, s > 0 ? 1.16 : -1.06, ZW - 0.05, ZW + 0.05);
          box(B.paint, XW[i] + 0.30, XW[i] + 0.44, s > 0 ? 1.06 : -1.12, s > 0 ? 1.12 : -1.06, ZW + 0.30, ZW + 0.42);
        }
        [0, 1, 5].forEach(function (w) {
          cyl(B.dark, [XW[w] + 0.10, s * 1.10, ZW + 0.06], [XW[w] + 0.42, s * 1.10, FEND - 0.08], 0.04, 0.04, 8);
        });
      }
    }
    /* road wheel (copied): the disc in the base green of the paint (the camouflage leaves the
       wheels green, R6, R9) */
    var TYRE = [0.10, 0.10, 0.095], HUB = [0.16, 0.16, 0.14];
    function addWheel(W, V) {
      var s, y, i, a, c = V.paint.base, BODY = rgb(c, 1.12), DISH = rgb(c, 0.85);
      for (s = -1; s <= 1; s += 2) {
        y = s * TY;
        W.col = TYRE;
        cylY(W, 0, y - 0.29, y - 0.13, 0, RW, 18);
        cylY(W, 0, y + 0.13, y + 0.29, 0, RW, 18);
        W.col = BODY;
        cylY(W, 0, y - 0.13, y + 0.13, 0, 0.26, 12);
        cyl(W, [0, y + s * 0.29, 0], [0, y + s * 0.305, 0], 0.27, 0.20, 16);
        cyl(W, [0, y - s * 0.29, 0], [0, y - s * 0.305, 0], 0.27, 0.20, 16);
        W.col = DISH;
        cylY(W, 0, Math.min(y + s * 0.305, y + s * 0.32), Math.max(y + s * 0.305, y + s * 0.32), 0, 0.14, 14);
        W.col = HUB;
        for (i = 0; i < 6; i++) {
          a = i / 6 * TAU;
          box(W, Math.cos(a) * 0.10 - 0.015, Math.cos(a) * 0.10 + 0.015, s > 0 ? y + 0.32 : y - 0.335, s > 0 ? y + 0.335 : y - 0.32, Math.sin(a) * 0.10 - 0.015, Math.sin(a) * 0.10 + 0.015);
        }
        cylY(W, 0, Math.min(y + s * 0.32, y + s * 0.345), Math.max(y + s * 0.32, y + s * 0.345), 0, 0.06, 10);
      }
    }

    /* ---------------- the A1 turret (copied) */
    var TS = [
      [-1.80, 0.20, 0.92, 0.98, 0.40, 0.66, 0.80],
      [-1.70, 0.12, 1.00, 1.08, 0.38, 0.76, 0.87],
      [-1.40, 0.05, 1.10, 1.24, 0.34, 0.88, 0.92],
      [-0.90, 0.00, 1.18, 1.36, 0.30, 0.98, 0.95],
      [-0.30, 0.00, 1.21, 1.41, 0.30, 1.02, 0.95],
      [ 0.25, 0.00, 1.16, 1.36, 0.30, 0.95, 0.95],
      [ 0.75, 0.02, 1.00, 1.18, 0.30, 0.78, 0.92],
      [ 1.15, 0.04, 0.80, 0.95, 0.32, 0.58, 0.86],
      [ 1.42, 0.06, 0.64, 0.73, 0.34, 0.42, 0.79],
      [ 1.56, 0.10, 0.56, 0.62, 0.36, 0.34, 0.73]
    ];
    function tRing(S) {
      var x = S[0], zb = S[1], wl = S[2], wm = S[3], zm = S[4], wt = S[5], zt = S[6], R = [], i, t;
      var arc = [];
      for (i = 1; i <= 3; i++) { t = i / 4 * Math.PI / 2; arc.push([wt + (wm - wt) * Math.cos(t), zm + (zt - zm) * Math.sin(t)]); }
      R.push([x, wl, zb], [x, wm, zm]);
      arc.forEach(function (p) { R.push([x, p[0], p[1]]); });
      R.push([x, wt, zt], [x, -wt, zt]);
      arc.slice().reverse().forEach(function (p) { R.push([x, -p[0], p[1]]); });
      R.push([x, -wm, zm], [x, -wl, zb]);
      return R;
    }
    function tHalf(x, z) {
      var k, S0, S1, u, w0, w1;
      function wAt(S, z) {
        if (z <= S[4]) return S[2] + (S[3] - S[2]) * Math.max(0, (z - S[1]) / ((S[4] - S[1]) || 1));
        var v = Math.min(1, (z - S[4]) / ((S[6] - S[4]) || 1));
        return S[5] + (S[3] - S[5]) * Math.cos(Math.asin(Math.min(1, v)));
      }
      for (k = 0; k + 1 < TS.length; k++) if (x >= TS[k][0] && x <= TS[k + 1][0]) break;
      if (k + 1 >= TS.length) k = TS.length - 2;
      S0 = TS[k]; S1 = TS[k + 1]; u = Math.max(0, Math.min(1, (x - S0[0]) / (S1[0] - S0[0])));
      w0 = wAt(S0, z); w1 = wAt(S1, z);
      return w0 + (w1 - w0) * u;
    }
    function roofAt(x) {
      var k, u;
      for (k = 0; k + 1 < TS.length; k++) if (x >= TS[k][0] && x <= TS[k + 1][0]) { u = (x - TS[k][0]) / (TS[k + 1][0] - TS[k][0]); return TS[k][6] + (TS[k + 1][6] - TS[k][6]) * u; }
      return x < TS[0][0] ? TS[0][6] : TS[TS.length - 1][6];
    }
    function addGun(B, V) {
      var MS = [[1.40, 0.56, 0.00, 0.83], [1.70, 0.55, 0.02, 0.81], [1.93, 0.46, 0.08, 0.75], [2.07, 0.30, 0.18, 0.65]];
      castLoft(B.paint, MS.map(function (S) {
        var R = [], i, a, c, sn, zc = (S[2] + S[3]) / 2, hz = (S[3] - S[2]) / 2;
        for (i = 0; i < 16; i++) {
          a = i / 16 * TAU; c = Math.cos(a); sn = Math.sin(a);
          R.push([S[0], S[1] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 0.6), zc + hz * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 0.6)]);
        }
        return R;
      }));
      cylX(B.paint, 2.04, 2.18, 0, GZ, 0.19, 0.125, 16);
      tubeM68(B, 2.12, MUZ, GZ, V.sleeve);
      cylX(B.dark, 1.95, 2.08, 0.30, GZ + 0.06, 0.03, 0.03, 8);
    }

    function addTurret(B, V) {
      var s, i, a, x, y, z, P, k;
      castLoft(B.paint, TS.map(tRing));
      cylZ(B.paint, 0, 0, -0.05, 0.03, 1.12, 36);
      addGun(B, V);
      /* the AN/VSS-1 searchlight: NOT on the ROC M60A3 (R9) */
      if (V.searchlight) {
        var SX = 1.72, SZ = 1.05;
        box(B.paint, SX - 0.26, SX + 0.20, -0.32, 0.32, SZ - 0.27, SZ + 0.27);
        cylX(B.paint, SX + 0.20, SX + 0.27, 0, SZ, 0.27, 0.27, 22);
        B.lens.col = LAMP;
        cylX(B.lens, SX + 0.27, SX + 0.285, 0, SZ, 0.235, 0.235, 22);
      }
      /* M19 cupola (copied; R9) */
      var CX = -0.38, CY = -0.62, CZ = roofAt(CX);
      cylZ(B.paint, CX, CY, CZ - 0.04, CZ + 0.08, 0.50, 24);
      cyl(B.paint, [CX, CY, CZ + 0.08], [CX, CY, CZ + 0.36], 0.47, 0.44, 24);
      B.lens.col = GLASS;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        if (Math.cos(a) > 0.8) continue;
        slab(B.lens, [CX + Math.cos(a) * 0.455, CY + Math.sin(a) * 0.455, CZ + 0.22], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.02, 0.09, 0.055);
        slab(B.paint, [CX + Math.cos(a) * 0.47, CY + Math.sin(a) * 0.47, CZ + 0.29], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.04, 0.11, 0.015);
      }
      cyl(B.paint, [CX - 0.02, CY, CZ + 0.36], [CX - 0.02, CY, CZ + 0.47], 0.42, 0.30, 22);
      cylZ(B.paint, CX - 0.04, CY, CZ + 0.47, CZ + 0.52, 0.24, 16);
      box(B.dark, CX - 0.48, CX - 0.38, CY - 0.10, CY + 0.10, CZ + 0.36, CZ + 0.44);
      box(B.paint, CX + 0.30, CX + 0.58, CY - 0.13, CY + 0.13, CZ + 0.12, CZ + 0.38);
      cylX(B.dark, CX + 0.58, CX + 1.12, CY, CZ + 0.26, 0.032, 0.026, 8);
      cylX(B.dark, CX + 1.00, CX + 1.12, CY, CZ + 0.26, 0.04, 0.04, 8);
      box(B.dark, CX + 0.20, CX + 0.42, CY + 0.13, CY + 0.30, CZ + 0.12, CZ + 0.28);

      x = 0.40; y = -0.62; z = roofAt(x);
      box(B.paint, x - 0.14, x + 0.12, y - 0.13, y + 0.13, z - 0.02, z + 0.16);
      B.lens.col = GLASS;
      box(B.lens, x + 0.12, x + 0.13, y - 0.09, y + 0.09, z + 0.04, z + 0.13);
      x = -0.45; y = 0.62; z = roofAt(x);
      cylZ(B.paint, x, y, z - 0.02, z + 0.05, 0.37, 20);
      cylZ(B.paint, x, y, z + 0.05, z + 0.08, 0.31, 18);
      box(B.dark, x - 0.40, x - 0.34, y - 0.12, y + 0.12, z + 0.02, z + 0.10);
      box(B.paint, x + 0.42, x + 0.62, y - 0.10, y + 0.10, z - 0.02, z + 0.10);
      box(B.lens, x + 0.62, x + 0.63, y - 0.07, y + 0.07, z + 0.02, z + 0.08);
      cylZ(B.paint, -1.10, 0.10, roofAt(-1.10) - 0.02, roofAt(-1.10) + 0.08, 0.16, 12);
      cyl(B.paint, [-1.10, 0.10, roofAt(-1.10) + 0.08], [-1.10, 0.10, roofAt(-1.10) + 0.12], 0.17, 0.07, 12);
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, -1.55, -1.45, s * 0.70 - 0.02, s * 0.70 + 0.02, roofAt(-1.5) - 0.02, roofAt(-1.5) + 0.07);
        box(B.dark, 0.85, 0.95, s * 0.70 - 0.02, s * 0.70 + 0.02, roofAt(0.9) - 0.02, roofAt(0.9) + 0.07);
      }
      for (s = -1; s <= 1; s += 2) {
        x = 0.62; z = 0.70; var w = tHalf(x, z);
        cyl(B.paint, [x, s * (w - 0.10), z], [x, s * (w + 0.06), z], 0.13, 0.11, 14);
        cyl(B.dark, [x, s * (w + 0.06), z], [x, s * (w + 0.075), z], 0.085, 0.085, 12);
        var NG = 6, prev = null, rx0 = -1.15, rx1 = -0.05, rz = 0.52;
        for (k = 0; k <= NG; k++) {
          var rx = rx0 + (rx1 - rx0) * k / NG;
          P = [rx, s * (tHalf(rx, rz) + 0.07), rz];
          if (prev) cyl(B.dark, prev, P, 0.016, 0.016, 5, true);
          prev = P;
        }
        [rx0, rx1].forEach(function (rx) { cyl(B.dark, [rx, s * (tHalf(rx, rz) - 0.02), rz], [rx, s * (tHalf(rx, rz) + 0.07), rz], 0.015, 0.015, 5, true); });
        x = -1.50; y = s * 0.92; z = roofAt(x);
        cylZ(B.dark, x, y, z - 0.03, z + 0.14, 0.06, 8);
        cyl(B.dark, [x, y, z + 0.14], [x, y, z + 1.00], 0.012, 0.006, 4, true);
      }
      var BX0 = -1.78, BX1 = -2.30, BY = 1.02, Z0 = 0.22, Z1 = 0.72;
      box(B.dark, BX1, BX0, -BY, BY, Z0 - 0.02, Z0 + 0.01);
      for (s = -1; s <= 1; s += 2) {
        var xs = -1.10;
        [Z0, (Z0 + Z1) / 2, Z1].forEach(function (zz) {
          cyl(B.dark, [BX1, s * BY, zz], [xs, s * BY, zz], 0.017, 0.017, 5, true);
        });
        for (k = 0; k <= 6; k++) {
          x = BX1 + (xs - BX1) * k / 6;
          cyl(B.dark, [x, s * BY, Z0], [x, s * BY, Z1], 0.014, 0.014, 4, true);
        }
        cyl(B.dark, [xs, s * BY, Z0], [xs, s * (tHalf(xs, Z0) - 0.02), Z0], 0.017, 0.017, 5, true);
        /* ROC M60A3: the rack lined with mesh (R9) */
        if (V.a3) mesh(B, [BX1, s * BY], [xs, s * BY], Z0 + 0.02, Z1 - 0.04);
      }
      [Z0, (Z0 + Z1) / 2, Z1].forEach(function (zz) { cyl(B.dark, [BX1, -BY, zz], [BX1, BY, zz], 0.017, 0.017, 5, true); });
      for (k = 0; k <= 10; k++) { y = -BY + 2 * BY * k / 10; cyl(B.dark, [BX1, y, Z0], [BX1, y, Z1], 0.014, 0.014, 4, true); }
      if (V.a3) mesh(B, [BX1, -BY], [BX1, BY], Z0 + 0.02, Z1 - 0.04);

      if (V.a3) {
        /* --- ROC M60A3 TTS fittings (R9; x measured from the rangefinder boss at 0.62) --- */
        for (s = -1; s <= 1; s += 2) {
          /* the M239 on each front cheek (R9 port; the starboard by symmetry, en.wikipedia) */
          x = 1.30; w = tHalf(x, 0.55);
          m239(B, x, s * (w + 0.04), 0.55, s);
        }
        /* port side: the stowage box high on the side, the jerrycan behind it, the tow cable */
        w = tHalf(0.05, 0.78);
        box(B.paint, -0.20, 0.30, w - 0.10, w + 0.16, 0.64, 0.90);
        box(B.dark, -0.18, 0.28, w + 0.16, w + 0.165, 0.80, 0.82);
        jerry(B, -0.62, -0.28, tHalf(-0.45, 0.60) - 0.02, 1, 0.40, 0.87);
        var CB = [], cx2;
        for (k = 0; k <= 8; k++) { cx2 = 1.20 - 2.60 * k / 8; CB.push([cx2, tHalf(cx2, 0.30) + 0.03, 0.30]); }
        for (k = 0; k < 8; k++) cyl(B.dark, CB[k], CB[k + 1], 0.016, 0.016, 5, true);
        /* the crosswind sensor mast at the rear of the roof (R9: 0.70 m with its ball head) */
        mast(B, -0.95, 0.55, roofAt(-0.95), 0.70);
        /* the loader's MG on a pintle ahead of his hatch, cocked up (R9) */
        x = 0.10; y = 0.62; z = roofAt(x);
        cylZ(B.dark, x, y, z - 0.02, z + 0.28, 0.025, 6);
        m240(B, x - 0.10, y, z + 0.32, 0.75);
      }

      box(B.team, -1.30, -0.80, -0.30, 0.30, roofAt(-1.05) - 0.01, roofAt(-1.05) + 0.02);
    }

    return { addHull: addHull, addRunning: addRunning, addWheel: addWheel, addTurret: addTurret, XW: XW, ZW: ZW, TX: TX, DECK: DECK };
  })();

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.m48a3, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), i, wg, WB, tg, WXs, ZWs, tx, tz;
    HB.wheel = new Bin(T.wheel, false, true);
    if (V.hull === "m48") {
      K48.addHull(HB, V); K48.addRunning(HB);
      WXs = K48.WX; ZWs = K48.ZW; tx = K48.TRX; tz = K48.ZR;
    } else {
      K60.addHull(HB); K60.addRunning(HB);
      WXs = K60.XW; ZWs = K60.ZW; tx = K60.TX; tz = K60.DECK;
    }
    flush(THREE, g, HB);
    for (i = 0; i < WXs.length; i++) {
      WB = new Bin(T.wheel, false, true);
      if (V.hull === "m48") K48.addWheelPair(WB); else K60.addWheel(WB, V);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(WXs[i], 0, ZWs);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (V.turret === "m48") K48.addTurret(TB, V); else K60.addTurret(TB, V);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(tx, 0, tz);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (dump.js) */
UNIT_MODELS["roc_e60_mbt"] = { len: 8.785, build: function (THREE, M, C) { return HeroROCTanks.build(THREE, M, C, "m48a3"); } };
UNIT_MODELS["roc_e80_mbt"] = { len: 9.412, build: function (THREE, M, C) { return HeroROCTanks.build(THREE, M, C, "m48a5"); } };
UNIT_MODELS["roc_e90_lighttank"] = { len: 9.635, build: function (THREE, M, C) { return HeroROCTanks.build(THREE, M, C, "m60a3"); } };
UNIT_MODELS["roc_e90_mbt"] = { len: 9.512, build: function (THREE, M, C) { return HeroROCTanks.build(THREE, M, C, "cm11"); } };
UNIT_MODELS["roc_e00_mbt"] = { len: 9.512, build: function (THREE, M, C) { return HeroROCTanks.build(THREE, M, C, "cm11"); } };
