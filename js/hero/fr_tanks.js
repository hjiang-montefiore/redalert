/* ========== fr_tanks.js - HERO models: the French tanks and the AMX-13 family ==========
   Rows and modules:
     fra_e60_mbt        HeroAMX30    AMX-30 (B): the cast turret, the 105 mm CN-105-F1 in its thermal
                                     sleeve, the coaxial 20 mm on the LEFT of the gun, five double
                                     road wheels, the skirt rail along the track.
     fra_e80_mbt        HeroAMX30    AMX-30 B2: the same tank plus the one outside change the photos
                                     show (below); the new gearbox has no outside sign.
     fra_e90_mbt        HeroLeclerc  Leclerc serie 1: the 120 mm CN120-26, the angular turret with
                                     its long bustle (the autoloader), six road wheels under the
                                     skirts, the commander's and gunner's sights.
     fra_e00_mbt        HeroLeclerc  Leclerc serie 2: drawn as serie 1 (no outside difference found).
     fra_e50_lighttank  HeroAMX13    AMX-13/75 Modele 51, FL-10 oscillating turret, 75 mm SA 50.
     fra_e60_lighttank  HeroAMX13    AMX-13/90: the same FL-10 with the 90 mm CN-90 F3.
     fra_e50_ifv        HeroAMX13    AMX-VTT Modele 56: the AMX-13 hull with the troop box.
     fra_e50_spg        HeroAMX13    AMX Mk 61 (105 Auto): the AMX-13 hull with the rear casemate.
     fra_e60_spaag,
     fra_e80_spaag      HeroAMX13    AMX-13 DCA: twin 30 mm turret with the Oeil Noir radar.
   BUILT ON: no French tank existed in js/hero/.  eu_sams.js (HeroRoland) and eu_tels_radars.js
   (HeroPluton) draw the AMX-30 RUNNING GEAR on other hulls; they were read, not used, and the
   running gear was measured again here (below) - the two disagree with each other in detail.

   REFERENCES (Wikimedia Commons, cached in scratchpad/q_frtk_ref; the brief's thumb.php route):
     A1 "AMX-30 Roland img 2306.jpg" (q_eusam_ref/ro1.jpg) - ORTHOGONAL left side of the AMX-30R
        chassis: THE AMX-30 RUNNING GEAR TABLE (below).
     A2 "AMX 30B.jpg" - AMX-30B from the right front, gun forward: plain olive, the long cast
        turret, the bustle basket, the cupola with the searchlight, the rear sprocket raised.
     A3 "AMX30 side.jpg" (Spanish AMX-30E, right rear) - the hull side: the skirt rail with its
        brackets over the track, the louvred grille high on the rear of the hull side, the
        smoke discharger pairs on the turret sides, the basket rails, the big cupola on the right.
     A4 "AMX-30B U.S. Army Armor & Cavalry Collection.jpg" - head on: the long shallow glacis,
        the boxy front mudguards, the lamp clusters in guards at the glacis corners, the
        rangefinder heads on the turret roof corners, the cupola with its lamp.
     A5 "AMX-30 1 Bovington.jpg", "AMX-30 2 Bovington.jpg" - AMX-30B from the left front: the
        thermal sleeve with its band joints, the 20 mm in its own housing LEFT of the mantlet,
        the driver's hatch on the glacis centreline; NO box above the 20 mm.
     B1 "AMX-30 B2 au 501e RCC a Mourmelon le Grand.jpg", B2 "AMX-30B2 '2940 0173' ... Saumur
        (53334731254).jpg", B3 "AMX-30B2 '624-0184 231' ... (53367379685).jpg" - B2s: the same
        hull and turret; B1 and B2 both carry a square box on the turret front LEFT, over the
        20 mm housing, that A5 (a B) does not: drawn on the B2 only, read as the COTAC low-light
        TV camera box (identification NOT CONFIRMED; its presence is).  B3 is a Daguet tank with
        added side armour and stowage: not drawn.
     L1 "Leclerc p1040703 cropped.jpg" - Leclerc DEAD SIDE-ON (right side, nose right), Paris
        parade: THE LECLERC TABLE (below).
     L2 "Leclerc-0013.jpg" - head on: the lamp clusters at the glacis corners, the skirt fronts,
        the gunner's sight box with its big window on the turret front.
     L3 "Char Leclerc Rivetoile Strasbourg 2010 - 1.JPG" - left front: the wedge turret front,
        the commander's sight head on its column, the smoke launcher banks at the turret rear.
     M1 "AMX-13-latrun-5.jpg" - AMX-13 side-on from above (right side, nose right): THE AMX-13
        TABLE (below).
     M2 "Swedish Tank Trials French AMX-13 1952.jpg" - AMX-13/75 near side-on (right side):
        the slim 75 mm with its small double-baffle brake, the heights (below).
     M3 "AMX-13 img 2323.jpg", "AMX-13-latrun-2.jpg" - the FL-10 from the front left: the upper
        turret's tapered nose round the gun collar, the cupola dome on the left, the bustle.
     M4 "AMX-13 90 at Musee des Blindes, Saumur (53361749302).jpg" - AMX-13/90 head on: the
        thicker 90 mm with the thermal sleeve and the big single-baffle box muzzle brake; the
        rounded lower nose, the spare road wheel on the glacis, the lamps in guards.
     V1 "AMX 13 pantserrups infanterie (pri) pic4.JPG" - Dutch AMX-VCI DEAD SIDE-ON (left side):
        the troop box from over the third road wheel to the rear, the cupola at its front left.
     V2 "AMX-13 VCI at Musee des Blindes (53362799118).jpg", V3 "AMX-13 img 2326.jpg",
        V4 "AMX-VCI-latrun-2.jpg" - VTTs with the OPEN MG ring mount (an arc rail and cradle) on
        the cupola, the sloped upper sides of the box with hatch panels, the louvred side grille.
     S1 "AMX-13-105mm img 2334.jpg" - French Mk 61, front left: the box casemate at the rear,
        flush with the hull rear, the canvas-covered mantlet, the short 105 mm with a double-
        baffle brake, the cupola dome, the three return rollers.
     S2 "Een op een parkeerplaats opgestelde AMX 105 mm PRA houwitser (2155 007537).jpg" -
        Dutch Mk 61, left side: the casemate's vertical sides and chamfered front, the slab
        mantlet (the Dutch L/30 gun: NOT this row's gun).
     D1 "AMX-13 DCA img 2328.jpg" (head on), D2 "AMX-13 DCA img 2327.jpg" (front left): the
        rounded box turret almost the hull's width, the twin 30 mm close together in a slot in
        the front, the Oeil Noir dish on its post at the turret rear (right of centre), the side
        panels and handrails.

   PUBLISHED FIGURES (en.wikipedia raw, fetched; fr/de wikipedia are blocked from this session):
     AMX-30: 9.48 m gun forward, 3.10 m wide, 2.28 m high, "five double, aluminum-alloy, rubber-
       tyred road wheels on either side", 570 mm tracks; coaxial 20 mm from 1972; elevation -8 to
       +20 deg; magnesium alloy thermal sleeve.  Hull 6.59 m: js/armour_specs.js (not on the
       fetched page).  B2: laser rangefinder and LLTV in the COTAC, new transmission, suspension.
     Leclerc: 9.87 m gun forward, 6.88 m hull, 3.60 m wide, 2.53 m high; 22-round bustle magazine.
     AMX-13: 6.36 m with gun, 4.88 m hull, 2.51 m wide, 2.35 m high; "five road wheels and two
       return rollers"; FL-10 "the gun is fixed to the turret and the entire upper turret changes
       elevation", turret at the rear; engine front right, driver front left.
     AMX-VCI/VTT: 5.70 x 2.67 x 2.41 m.  Mk 61: 6.4 x 2.6 x 2.7 m, "front drive sprocket, rear
       idler and three return rollers", casemate at the rear, cupola with a ring mount, L/23
       (French) or L/30 (Dutch) barrel, traverse 20 deg either side.  DCA: twin 30 mm, radar.

   MEASURED (ratios at ONE station each; scale from one published figure):
     AMX-30 TABLE (A1, hull 6.59 m = 850 px, 129 px/m; X = (490 - px) / 129): road wheels even
       pitch 0.93 m about X -0.42 (A1 reads 1.47 0.51 -0.47 -1.35 -2.26 through the slight
       perspective), wheel 100 px = 0.78 m, the wheel row's centre 0.46; idler X 2.48, 0.29 m
       above the wheel centres, r 0.33; sprocket X -3.07, 0.44 m above them, r 0.30; five return
       rollers X 0.89 0.08 -0.85 -1.71 -2.48 at 0.58 m above the wheel centres.  Turret roof at
       the published 2.28 m (no side photograph of a gun tank sharp enough to measure heights).
     LECLERC TABLE (L1, hull 6.88 m = 785 px, 114 px/m; X = (px - 787.5) / 114): nose 3.44, rear
       -3.44; skirt 0.48-1.62 m; turret front 1.73, bustle end -2.79; turret roof 2.37 m read
       (the camera is low and the tank moving): the published 2.53 is drawn; track on the ground
       from X -2.5 to 2.3; idler X 2.82, sprocket X -2.98.  Six wheels evenly spaced over that
       contact: pitch 0.82 m.
     AMX-13 TABLE (M1, hull 4.88 m = 1105 px; X = (px - 657.5) x 0.004416): idler X -2.29 (at
       the wheel height), wheels -1.65 -0.96 -0.25 0.45 1.15 (pitch 0.70), wheel 139 px =
       0.61 m, sprocket 1.95 raised ~0.12 m, lower turret 1.70 m across centred X -0.66, upper
       turret from the hull rear (-2.44) to its gun collar at 0.41.  M2, at the fourth wheel's
       station: turret roof 3.47 wheel diameters = 2.12 m, the fender top 1.90 = 1.16 m.
     DISAGREEMENTS, settled from the photos:
       AMX-VTT length: the published 5.70 m is NOT met.  V1 (dead side-on) puts the hull at 7.27
         wheel pitches against the tank's 6.96 in M1: the troop box hull is 0.34 m longer at the
         rear (idler to rear plate 0.49 m against 0.16 m), so 5.22 m is drawn.  Nothing was
         stretched to reach 5.70 (the figure may count the open rear doors and stowage).
       Mk 61 length: S1 shows the French L/23 muzzle brake just past the hull nose.  S2 (the
         wheel pitch, 95 px = 0.70 m, as the scale at the wheel row) puts the casemate's front
         plate from X 0.67 at the deck to 0.30 at the roof and the trunnion over X 0.45; the
         L/23 then ends at X 2.78: 5.22 m from the hull rear (5.41 m over the idler).  The
         published 6.4 m fits the Dutch L/30 of S2 (0.7 m longer barrel): not this row's gun.
       AMX-13 tank height: published 2.35 m; M2 gives the turret roof 2.12 m, the cupola dome
         then reaches 2.33 m: drawn so, nothing reshaped.
   RECOGNITION LIST (each drawn; source):
     AMX-30: 1. five double road wheels, front idler, the sprocket high at the rear, five return
       rollers - A1, A2;  2. the long shallow glacis, the lamp clusters in guards at its corners,
       the boxy front mudguards - A4, A5;  3. the long low cast turret, its rear basket, the big
       cupola on the right with the lamp - A2, A3, A4;  4. the 105 mm in its sleeve with band
       joints, no fume extractor - A2, A5;  5. the 20 mm in its own housing on the gun's left -
       A5, B2;  6. the skirt rail with brackets along the track, the rear side grille - A3.
       B2 adds the box over the 20 mm - B1, B2.
     Leclerc: 1. six road wheels behind full skirts, the thicker front skirt panels - L1;  2. the
       flat-topped angular turret with the wedge front and the long bustle - L1, L3;  3. the
       commander's sight head on its column, the gunner's sight box - L2, L3;  4. the long 120 mm
       with its sleeve - L1;  5. smoke launcher banks at the bustle sides - L1, L3.
     AMX-13: 1. front sprocket, five road wheels, rear idler at the wheels' height - M1, M2;
       2. the turret at the rear, the upper turret overhanging the hull rear - M1;  3. the
       oscillating two-part turret: the round lower collar and the long upper turret with the
       gun collar - M1, M3;  4. the rounded lower nose, the spare road wheel on the glacis, the
       lamps in guards, the round fan grille on the right of the deck - M1, M4, D1;
       5. 75 mm slim with a small double baffle (M2) / 90 mm sleeved with a box brake (M4).
     VTT: the tall box with sloped upper sides behind the engine deck; the cupola with the open
       MG ring mount - V1-V4.   Mk 61: the box casemate flush at the rear, the covered mantlet,
       the short howitzer with its brake, the cupola - S1, S2.   DCA: the rounded box turret,
       twin 30 mm in a slot, the elliptical dish on its post at the rear - D1, D2.
   PAINT: French olive.  A4 (indoors, museum) samples #666336, taken to about 0.8 of level ->
     #525230; the blots and wear are the kit's.  B1-B3, L1-L3, A1 wear the 1980s+ three-colour
     camouflage or desert sand: not drawn.  No roundels, numbers, names or tactical signs (M1,
     M2, A3, B1 carry them).  Team colour: C.team on small strips on the deck and turret roofs.
   NOT CONFIRMED (proportion or judgement, no drawing found):
     AMX-30: every height but the published roof (deck 1.52, fender 1.16, belly 0.45), the
       turret plan (front 1.60, rear -2.00, half width 1.15), the cupola size, the 20 mm housing
       size, the B2 box's identity and size.  Leclerc: the wheel size (0.70 m) and pitch, the
       turret's plan widths (front 1.35, middle 1.60 half widths), the sight positions (commander
       left, gunner right), the 635 mm track.  AMX-13: the 0.35 m track, the hull widths
       between the tracks, the trunnion's place (X -0.21, z 1.62), the upper turret's half widths
       (0.66-0.78), the return rollers' places (two, at X -1.30 and 0.10; S1 shows three on the
       Mk 61: drawn three there), the VTT box's roof width and the MG mount, the Mk 61 casemate
       width (to the published 2.6 m), roof (2.40 m; the cupola dome then meets the published 2.7)
       and gun axis (1.97 m), the DCA turret's size (1.84 m wide from D1's ratio to the
       2.51 m hull at the nose plane), the dish (0.85 x 0.48 m) and its height (top 2.98 m: the
       published SPAAG height in armour_specs.js is 3.0).
   NOT DRAWN: crews, nets, the Daguet and Brennus add-ons, canvas turret skirts (M2, M3), the
     DCA radar folded, the 7.62 MGs on the AMX-30 and Leclerc roofs (photos show them only now
     and then), antennas.
   NODES and POSES:
     "turret" (every row): origin on the turret ring at the deck, gun along +X.  AMX-30, Leclerc
       and DCA: the whole turret with its gun(s).  AMX-13 tank: the LOWER turret (the collar) and,
       inside it, a group "oscillating" holding the upper turret AND the gun, with its origin on
       the trunnion axis (along local Y): rotating "oscillating" about its local Y elevates the
       whole upper turret with the gun, as the FL-10 does; render3d animates only "turret", so
       it sits level.  VTT: the MG ring mount on the cupola.  Mk 61 (casemate, +-20 deg):
       ONLY the howitzer and its covered mantlet, on the trunnion, as ru_su100.js does.
     "roadwheel": one per wheel station, both sides, axle along local Y.
   ENGINE (js/damage3d.js ENGINE_AT, not edited): fra_e50_lighttank, fra_e60_lighttank,
     fra_e60_spaag, fra_e80_spaag already say "front"; fra_e50_ifv (role ifv) and fra_e50_spg
     (role spg) are not in REAR_ENGINE, so they already burn at the front; the AMX-30 and
     Leclerc rows are rear by role, as built.  No entry is missing.
   AS DRAWN (tools/model3d/dump.js; L x W x H, triangles, draw calls) against the published:
     fra_e60/e80_mbt  9.59 x 3.14 x 2.90 m (turret roof 2.28 = published 2.28; the cupola lamp
                      2.90); published 9.48 x 3.10: +1.2 % (the idler and track ahead of the
                      nose), +1.4 % (hubs).  13652 / 13676 tris, 11 calls.
     fra_e90/e00_mbt  9.98 x 3.62 x 3.11 m (roof 2.53 = published; the commander's sight head
                      3.11); published 9.87 x 3.60: +1.1 %, +0.7 %.  13300 tris, 12 calls.
     fra_e50_lighttank 6.55 x 2.58 x 2.33 m; published 6.36 (hull rear to muzzle: 6.36 drawn,
                      the idler and track stand 0.19 m behind the hull, as M1 shows) x 2.51 x
                      2.35.  12036 tris, 13 calls.   fra_e60_lighttank 6.67 x 2.58 x 2.33 m
                      (the 90's box brake 0.12 m further).  12260 tris, 13 calls.
     fra_e50_ifv      5.38 x 2.58 x 2.48 m (hull 5.22); published 5.70 x 2.67 x 2.41 (above).
                      11616 tris, 10 calls.
     fra_e50_spg      5.41 x 2.64 x 2.71 m; published 6.4 (Dutch L/30, above) x 2.6 x 2.7.
                      11656 tris, 10 calls.
     fra_e60/e80_spaag 5.15 x 2.58 x 2.98 m (dish top); no published size on the fetched page
                      (armour_specs.js: 5.4 x 2.51 x 3.0).  11788 tris, 10 calls.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroFrKit = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ geometry kit (pla_type63_apc.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
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
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
  function loftN(bin, L) {
    var V = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) V.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, V, F);
  }
  /* a cross-section ring at station x: foot half width w0 at z0, shoulder half width w1 at z1,
     roof half width w2 at z2 (an octagon, convex) */
  function ring(x, z0, w0, z1, w1, z2, w2) {
    return [[x, -w0, z0], [x, w0, z0], [x, w1, z1], [x, w2, z2], [x, -w2, z2], [x, -w1, z1]];
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, PAINT) {
    if (_tex[PAINT.seed] !== undefined) return _tex[PAINT.seed];
    var tx = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      tx = new THREE.CanvasTexture(cv);
      tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) tx.encoding = THREE.sRGBEncoding;
      tx.anisotropy = 4;
    } catch (e) { tx = null; }
    _tex[PAINT.seed] = tx;
    return tx;
  }
  function materials(THREE, C, PAINT) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.base = PAINT.base;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
  /* off: the group's origin in model space; vertices are moved into the group's frame */
  function flush(THREE, group, B, off) {
    var k, b, geo, i, P;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      P = new Float32Array(b.P);
      if (off) for (i = 0; i < P.length; i += 3) { P[i] -= off[0]; P[i + 1] -= off[1]; P[i + 2] -= off[2]; }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  function group(THREE, name, pos) {
    var g = new THREE.Group();
    if (name) g.name = name;
    if (pos) g.position.set(pos[0], pos[1], pos[2]);
    return g;
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  /* RG: xw (wheel stations), zw, rw, ty (track centre |y|), tw (track half width), spr, idl
     {x, z, r}, rr (return roller x list), rrz, rrr, teeth, pitch (link pitch) */
  function addRunning(B, RG) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < RG.xw.length; i++) C.push([RG.xw[i], RG.zw, RG.rw + 0.035]);
    C.push([RG.idl.x, RG.idl.z, RG.idl.r + 0.035], [RG.spr.x, RG.spr.z, RG.spr.r + 0.035]);
    for (i = 0; i < RG.rr.length; i++) C.push([RG.rr[i], RG.rrz, RG.rrr + 0.035]);
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
    cnt = Math.round(tot / RG.pitch); step = tot / cnt;
    var TW = RG.tw;
    for (s = -1; s <= 1; s += 2) {
      y = s * RG.ty;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the grouser across the shoe, and the centre guide horn inside */
        belt(B.dark, px - dx * 0.04, pz - dz * 0.04, px + dx * 0.04, pz + dz * 0.04, y - TW - 0.01, y + TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      /* the toothed drive sprocket */
      var SP = RG.spr;
      cylY(B.dark, SP.x, y - TW * 0.8, y + TW * 0.8, SP.z, SP.r - 0.05, 18);
      for (i = 0; i < RG.teeth; i++) {
        var ta = i / RG.teeth * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SP.x + ca * (SP.r - 0.02), y, SP.z + sa * (SP.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, TW * 0.55, 0.03);
      }
      cylY(B.paint, SP.x, y + s * TW * 0.8, y + s * (TW * 0.8 + 0.05), SP.z, SP.r * 0.5, 14);
      /* the idler, double like the wheels */
      var ID = RG.idl;
      cylY(B.paint, ID.x, y - TW * 0.9, y - 0.04, ID.z, ID.r, 18);
      cylY(B.paint, ID.x, y + 0.04, y + TW * 0.9, ID.z, ID.r, 18);
      cylY(B.dark, ID.x, y + s * TW * 0.9, y + s * (TW * 0.9 + 0.05), ID.z, ID.r * 0.3, 10);
      /* return rollers */
      for (i = 0; i < RG.rr.length; i++) {
        cylY(B.paint, RG.rr[i], y - TW * 0.7, y + TW * 0.7, RG.rrz, RG.rrr, 12);
        cylY(B.dark, RG.rr[i], y + s * TW * 0.7, y + s * (TW * 0.7 + 0.08), RG.rrz, 0.035, 8);
      }
    }
  }
  /* a DOUBLE road wheel (all four hulls: A1, A5, M1, V2): two rubber tyres either side of the
     track's guide horns, dished discs with six lightening holes, hub */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.17, 0.18, 0.15];
  function addWheel(W, RG, base) {
    var s, y, i, a, k, r = RG.rw, hw = RG.tw, c = base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    var tw = (hw - 0.045) * 0.95;
    for (s = -1; s <= 1; s += 2) {
      y = s * RG.ty;
      for (k = -1; k <= 1; k += 2) {
        var yc = y + k * (0.045 + tw / 2);
        W.col = TYRE;
        cylY(W, 0, yc - tw / 2, yc + tw / 2, 0, r, 20);
        W.col = BODY;
        var yo = yc + k * tw / 2;
        cyl(W, [0, yo, 0], [0, yo + k * 0.025, 0], r - 0.05, r * 0.35, 20);
        if (k === s) {
          W.col = HOLE;
          for (i = 0; i < 6; i++) {
            a = (i + 0.5) / 6 * TAU;
            slab(W, [Math.cos(a) * r * 0.55, yo + k * 0.016, Math.sin(a) * r * 0.55], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], r * 0.13, 0.010, r * 0.12);
          }
          W.col = RIB;
          cylY(W, 0, yo, yo + k * 0.03, 0, r * 0.22, 10);
        }
      }
    }
  }
  function wheels(THREE, g, T, RG) {
    for (var i = 0; i < RG.xw.length; i++) {
      var WB = new Bin(T.wheel, false, true);
      addWheel(WB, RG, T.base);
      var wg = group(THREE, "roadwheel", [RG.xw[i], 0, RG.zw]);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
  }
  /* a lamp cluster in its wire guard (A4, L2, D1, M4) */
  function lamps(B, x, y, z, n) {
    var i, dy;
    for (i = 0; i < n; i++) {
      dy = (i - (n - 1) / 2) * 0.17;
      cyl(B.paint, [x - 0.12, y + dy, z], [x, y + dy, z], 0.07, 0.075, 12);
      cyl(B.dark, [x, y + dy, z], [x + 0.01, y + dy, z], 0.065, 0.065, 12);
    }
    var w = n * 0.085 + 0.04;
    box(B.dark, x + 0.04, x + 0.06, y - w, y + w, z + 0.06, z + 0.08);
    box(B.dark, x + 0.04, x + 0.06, y - w, y + w, z - 0.08, z - 0.06);
    box(B.dark, x - 0.14, x + 0.06, y - w, y - w + 0.02, z - 0.08, z + 0.08);
    box(B.dark, x - 0.14, x + 0.06, y + w - 0.02, y + w, z - 0.08, z + 0.08);
    box(B.dark, x - 0.16, x - 0.10, y - 0.04, y + 0.04, z - 0.20, z - 0.06);
  }

  return { TAU: TAU, Bin: Bin, solid: solid, hexa: hexa, box: box, slab: slab, belt: belt, cyl: cyl, cylX: cylX, cylY: cylY,
           cylZ: cylZ, prismY: prismY, loftN: loftN, ring: ring, materials: materials, bins: bins, flush: flush,
           group: group, addRunning: addRunning, wheels: wheels, lamps: lamps };
})();

/* ===================================================================== AMX-30 and AMX-30 B2 */
var HeroAMX30 = (function () {
  "use strict";
  var K = HeroFrKit, box = K.box, cyl = K.cyl, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ;
  var PAINT = { base: "#525230", blots: ["#4a4a2b", "#5a5a37"], seed: 1966 };
  /* the AMX-30 TABLE (A1): pitch 0.93 about X -0.42, 0.78 m wheels, rear sprocket high */
  var RG = { xw: [1.44, 0.51, -0.42, -1.35, -2.28], zw: 0.46, rw: 0.39, ty: 1.265, tw: 0.285,
             idl: { x: 2.48, z: 0.75, r: 0.33 }, spr: { x: -3.02, z: 0.88, r: 0.30 },
             rr: [0.89, 0.08, -0.85, -1.71, -2.48], rrz: 1.04, rrr: 0.085, teeth: 13, pitch: 0.17 };
  var NOSE = 3.30, REAR = -3.29, BELLY = 0.45, FEN = 1.16, DECK = 1.52, HW = 1.50, LW = 0.98;
  var TX = 0.30;                       /* turret ring centre */
  var GZ = 1.93, ROOF = 2.28;          /* gun axis; turret roof (published height) */

  function addHull(B) {
    var P = B.paint, D = B.dark, s, i, x;
    /* lower hull between the tracks: belly, the lower nose plate leaning back under the glacis,
       the rear plate */
    K.prismY(P, [[REAR, 0.62], [REAR + 0.22, BELLY], [2.85, BELLY], [NOSE, 1.02], [NOSE, FEN], [REAR, FEN]], -LW, LW);
    /* the upper hull over the tracks: vertical sides at +-HW from the fender to the deck; the
       long shallow glacis from the nose to the deck in front of the turret (A4, A5); the engine
       deck falling a little to the rear plate */
    function sec(x, top, hw) { return [[x, -HW, FEN], [x, HW, FEN], [x, hw, top - 0.04], [x, hw - 0.04, top], [x, -hw + 0.04, top], [x, -hw, top - 0.04]]; }
    K.loftN(P, [sec(REAR, DECK - 0.10, HW), sec(REAR + 0.10, DECK - 0.04, HW), sec(-1.2, DECK, HW), sec(1.60, DECK, HW),
                sec(NOSE - 0.02, FEN + 0.06, HW - 0.12)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * HW, ya = Math.min(yo, yo + s * 0.04), yb = Math.max(yo, yo + s * 0.04);
      /* the skirt rail along the track, with its brackets (A3): a narrow plate hung from the
         fender edge, X -2.95 to 2.55 */
      box(P, -2.95, 2.55, s > 0 ? yo + 0.005 : yo - 0.035, s > 0 ? yo + 0.035 : yo - 0.005, FEN - 0.13, FEN + 0.02);
      for (i = 0; i < 11; i++) {
        x = -2.80 + i * 0.52;
        box(D, x - 0.05, x + 0.05, s > 0 ? yo + 0.03 : yo - 0.055, s > 0 ? yo + 0.055 : yo - 0.03, FEN - 0.11, FEN - 0.01);
      }
      /* the boxy front mudguards over the track ends (A4, A5) */
      K.prismY(P, [[2.45, FEN], [NOSE + 0.05, FEN - 0.05], [NOSE + 0.12, FEN - 0.32], [NOSE + 0.02, FEN - 0.36], [2.45, FEN - 0.02]],
               s > 0 ? 0.98 : -1.55, s > 0 ? 1.55 : -0.98);
      /* the louvred grille high on the rear of the hull side (A3) */
      box(D, -3.15, -2.05, s > 0 ? yo : yo - 0.015, s > 0 ? yo + 0.015 : yo, FEN + 0.06, DECK - 0.06);
      for (i = 0; i < 9; i++) {
        x = -3.10 + i * 0.12;
        box(P, x, x + 0.05, s > 0 ? yo + 0.01 : yo - 0.03, s > 0 ? yo + 0.03 : yo - 0.01, FEN + 0.07, DECK - 0.07);
      }
      /* the stowage bins along the deck edge between grille and glacis (A2, A3) */
      box(P, -1.90, 1.05, s > 0 ? HW - 0.30 : -HW, s > 0 ? HW : -HW + 0.30, DECK, DECK + 0.14);
      box(D, -1.90, 1.05, s > 0 ? HW - 0.005 : -HW - 0.01, s > 0 ? HW + 0.01 : -HW + 0.005, DECK + 0.05, DECK + 0.065);
      /* the lamp clusters in their guards on the glacis corners (A4, A5) */
      K.lamps(B, 2.55, s * 1.22, 1.50, 2);
      /* towing eyes on the lower nose plate */
      box(D, NOSE - 0.12, NOSE + 0.06, s * 0.62 - 0.07, s * 0.62 + 0.07, 0.76, 0.90);
      /* rear plate: towing eyes and the lamps */
      box(D, REAR - 0.10, REAR, s * 0.75 - 0.07, s * 0.75 + 0.07, 0.68, 0.80);
      box(D, REAR - 0.06, REAR, s * 1.30 - 0.08, s * 1.30 + 0.08, 1.22, 1.32);
    }
    /* glacis: the driver's hatch on the centreline (A4, A5), the spare-link rack across the
       top of the lower nose plate */
    var ang = Math.atan2(DECK - (FEN + 0.06), (NOSE - 0.02) - 1.60), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    function gz(x) { return DECK - (x - 1.60) * Math.tan(ang); }
    K.slab(P, [2.15, 0, gz(2.15) + 0.03], u, [0, 1, 0], w, 0.30, 0.34, 0.03);
    K.slab(D, [2.42, 0, gz(2.42) + 0.06], u, [0, 1, 0], w, 0.03, 0.08, 0.02);
    for (i = 0; i < 5; i++) box(D, NOSE - 0.03, NOSE + 0.03, -0.80 + i * 0.40 - 0.13, -0.80 + i * 0.40 + 0.13, FEN - 0.02, FEN + 0.06);
    /* engine deck: the grilles and the two access panels */
    box(D, -3.00, -1.70, -0.95, 0.95, DECK - 0.04, DECK + 0.005);
    for (i = 0; i < 8; i++) box(P, -2.96 + i * 0.16, -2.90 + i * 0.16, -0.92, 0.92, DECK - 0.03, DECK + 0.01);
    box(P, -1.60, -1.05, -0.85, -0.10, DECK, DECK + 0.03);
    box(P, -1.60, -1.05, 0.10, 0.85, DECK, DECK + 0.03);
    box(B.team, -2.95, -2.55, -0.45, 0.45, DECK + 0.01, DECK + 0.025);
  }

  /* turret (A2-A5): long low cast body, its foot on the deck, the front narrowing to the mantlet,
     the bustle overhanging the deck; built in model space and moved to the ring by flush */
  function addTurret(B, b2) {
    var P = B.paint, D = B.dark, s, i, x;
    var Z0 = DECK;
    K.loftN(P, [K.ring(1.62, 1.66, 0.40, 1.84, 0.50, 2.00, 0.32),
                K.ring(1.20, Z0 + 0.02, 0.92, 1.92, 1.05, 2.18, 0.70),
                K.ring(0.50, Z0 + 0.02, 1.12, 2.00, 1.16, ROOF, 0.84),
                K.ring(-0.70, Z0 + 0.02, 1.08, 2.00, 1.12, ROOF, 0.86),
                K.ring(-1.45, Z0 + 0.10, 0.96, 2.00, 1.00, ROOF - 0.04, 0.78),
                K.ring(-2.00, 1.70, 0.80, 2.00, 0.84, ROOF - 0.12, 0.60)]);
    /* the mantlet: a cast collar round the gun (A4, A5) */
    cylX(P, 1.40, 1.86, 0, GZ, 0.30, 0.24, 18);
    /* the 105 mm CN-105-F1: the thermal sleeve with its band joints, the bare muzzle (A2, A5);
       9.48 m gun forward puts the muzzle at X 6.19 */
    cylX(P, 1.86, 2.30, 0, GZ, 0.125, 0.115, 16);
    cylX(P, 2.30, 5.45, 0, GZ, 0.105, 0.098, 14);
    for (i = 0; i < 4; i++) { x = 2.95 + i * 0.75; cylX(D, x, x + 0.06, 0, GZ, 0.112, 0.112, 14); }
    cylX(P, 5.45, 6.19, 0, GZ, 0.082, 0.080, 14);
    cylX(D, 6.17, 6.20, 0, GZ, 0.05, 0.05, 10);
    /* the coaxial 20 mm F2 in its own housing on the LEFT of the mantlet (A5, B2) */
    box(P, 1.30, 1.72, 0.40, 0.70, GZ - 0.20, GZ + 0.10);
    cylX(P, 1.72, 1.95, 0.55, GZ - 0.06, 0.07, 0.06, 12);
    cylX(D, 1.95, 2.85, 0.55, GZ - 0.06, 0.03, 0.026, 8);
    if (b2) {
      /* B2 (B1, B2 photos): the square box over the 20 mm housing on the turret front left */
      box(P, 1.10, 1.58, 0.42, 0.78, GZ + 0.10, GZ + 0.40);
      box(D, 1.58, 1.60, 0.48, 0.72, GZ + 0.18, GZ + 0.34);
    }
    /* the commander's cupola on the right, tall, with its vision band and the lamp on top (A2,
       A3, A4) */
    cylZ(P, -0.30, -0.48, ROOF - 0.02, ROOF + 0.24, 0.42, 20);
    cylZ(D, -0.30, -0.48, ROOF + 0.10, ROOF + 0.17, 0.425, 20);
    cylZ(P, -0.30, -0.48, ROOF + 0.24, ROOF + 0.32, 0.34, 18);
    box(D, -0.05, 0.05, -0.56, -0.40, ROOF + 0.32, ROOF + 0.40);
    cylX(P, -0.02, 0.18, -0.48, ROOF + 0.50, 0.11, 0.12, 14);
    cylX(D, 0.18, 0.19, -0.48, ROOF + 0.50, 0.10, 0.10, 14);
    /* the gunner's sight hood forward of it, the loader's hatch on the left */
    box(P, 0.55, 0.95, -0.62, -0.30, ROOF - 0.02, ROOF + 0.14);
    box(D, 0.95, 0.97, -0.58, -0.34, ROOF + 0.02, ROOF + 0.11);
    cylZ(P, -0.35, 0.48, ROOF - 0.02, ROOF + 0.05, 0.30, 16);
    box(D, -0.20, -0.08, 0.38, 0.58, ROOF + 0.05, ROOF + 0.10);
    for (s = -1; s <= 1; s += 2) {
      /* the rangefinder heads on the roof's front corners (A4) */
      box(P, 0.75, 1.05, s * 0.86 - 0.10, s * 0.86 + 0.10, 2.10, 2.30);
      cylY(D, 0.90, s * 0.96, s * 0.99, 2.20, 0.05, 10);
      /* a pair of smoke dischargers on each side behind the middle (A3, B2) */
      for (i = 0; i < 2; i++) cyl(D, [-0.85 - i * 0.16, s * 1.02, 2.06], [-0.70 - i * 0.16, s * 1.18, 2.32], 0.055, 0.055, 10);
      /* the basket rails round the turret sides and rear (A2, A3) */
      box(D, -2.30, 0.80, s * 1.20 - 0.015, s * 1.20 + 0.015, 2.12, 2.15);
      for (i = 0; i < 7; i++) { x = 0.65 - i * 0.45; box(D, x - 0.015, x + 0.015, s * 1.19 - 0.015, s * 1.19 + 0.015, 1.95, 2.13); }
    }
    box(D, -2.32, -2.29, -1.20, 1.20, 1.85, 2.15);
    box(D, -2.32, -1.95, -1.20, 1.20, 1.84, 1.86);
    box(B.team, -1.60, -1.20, -0.50, 0.50, ROOF - 0.035, ROOF - 0.02);
  }

  function build(THREE, M, C, b2) {
    var T = K.materials(THREE, C, PAINT), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T);
    addHull(HB);
    K.addRunning(HB, RG);
    K.flush(THREE, g, HB);
    K.wheels(THREE, g, T, RG);
    addTurret(TB, b2);
    var tg = K.group(THREE, "turret", [TX, 0, DECK]);
    K.flush(THREE, tg, TB, [TX, 0, DECK]);
    g.add(tg);
    return g;
  }
  return { build: function (THREE, M, C) { return build(THREE, M, C, false); },
           buildB2: function (THREE, M, C) { return build(THREE, M, C, true); } };
})();

/* ===================================================================== Leclerc */
var HeroLeclerc = (function () {
  "use strict";
  var K = HeroFrKit, box = K.box, cyl = K.cyl, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ;
  var PAINT = { base: "#525230", blots: ["#4a4a2b", "#5a5a37"], seed: 1992 };
  /* the LECLERC TABLE (L1): six wheels, pitch 0.82, front idler, rear sprocket */
  var RG = { xw: [1.95, 1.13, 0.32, -0.50, -1.31, -2.13], zw: 0.42, rw: 0.35, ty: 1.43, tw: 0.315,
             idl: { x: 2.82, z: 0.64, r: 0.30 }, spr: { x: -2.98, z: 0.70, r: 0.32 },
             rr: [], rrz: 0, rrr: 0, teeth: 13, pitch: 0.17 };
  var NOSE = 3.44, REAR = -3.44, BELLY = 0.50, SK0 = 0.48, DECK = 1.62, HW = 1.72, LW = 1.05, SKW = 1.80;
  var TX = 0.10, GZ = 2.10, ROOF = 2.53;

  function addHull(B) {
    var P = B.paint, D = B.dark, s, i, x;
    K.prismY(P, [[REAR, 0.70], [REAR + 0.25, BELLY], [2.90, BELLY], [NOSE, 1.00], [NOSE, 1.10], [REAR, 1.10]], -LW, LW);
    /* the upper hull: vertical sides inside the skirts, the glacis rising to the deck, a short
       flat ahead of the turret; vertical rear */
    function sec(x, top, hw) { return [[x, -hw, 1.10], [x, hw, 1.10], [x, hw, top - 0.04], [x, hw - 0.04, top], [x, -hw + 0.04, top], [x, -hw, top - 0.04]]; }
    K.loftN(P, [sec(REAR, DECK - 0.06, HW), sec(-2.0, DECK, HW), sec(2.20, DECK, HW), sec(NOSE, 1.12, HW - 0.04)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * SKW, yi = s * (SKW - 0.06);
      /* the skirts (L1): the heavy front panels to X 0.85, the thinner rear run; the front
         panel's lower edge rising toward the nose */
      K.prismY(P, [[0.85, SK0], [3.00, SK0 + 0.10], [NOSE - 0.02, 1.00], [NOSE - 0.02, DECK], [0.85, DECK]],
               Math.min(yo, s * (SKW - 0.12)), Math.max(yo, s * (SKW - 0.12)));
      box(P, REAR + 0.10, 0.85, Math.min(yo, yi), Math.max(yo, yi), SK0, DECK);
      for (i = 0; i < 6; i++) {
        x = -2.95 + i * 0.63;
        box(D, x, x + 0.02, s > 0 ? yo : yo - 0.01, s > 0 ? yo + 0.01 : yo, SK0 + 0.02, DECK - 0.02);
      }
      box(D, 0.85, 0.87, s > 0 ? yo : yo - 0.012, s > 0 ? yo + 0.012 : yo, SK0, DECK);
      /* the fender over the skirt top */
      box(P, REAR + 0.05, NOSE - 0.02, Math.min(s * HW, yo), Math.max(s * HW, yo), DECK - 0.03, DECK);
      /* lamp clusters at the glacis corners (L2) */
      K.lamps(B, NOSE - 0.30, s * 1.35, 1.32, 2);
      /* rear plate: towing eyes */
      box(D, REAR - 0.10, REAR, s * 0.80 - 0.07, s * 0.80 + 0.07, 0.80, 0.92);
    }
    /* glacis: the driver's hatch front left */
    box(P, 2.05, 2.55, 0.25, 0.85, DECK - 0.01, DECK + 0.04);
    box(D, 2.55, 2.60, 0.35, 0.75, DECK - 0.01, DECK + 0.06);
    /* engine deck grilles */
    box(D, -3.25, -1.85, -1.20, 1.20, DECK - 0.03, DECK + 0.005);
    for (i = 0; i < 10; i++) box(P, -3.22 + i * 0.14, -3.17 + i * 0.14, -1.18, 1.18, DECK - 0.02, DECK + 0.01);
    box(B.team, -1.75, -1.35, -0.60, 0.60, DECK, DECK + 0.015);
  }

  /* turret (L1, L3): flat-topped, angular; the front plates wedge back from the mantlet; the long
     bustle with the autoloader overhangs the engine deck */
  function addTurret(B) {
    var P = B.paint, D = B.dark, s, i, x, k;
    function sec(x, z0, w0, w1, wt) { return [[x, -w0, z0], [x, w0, z0], [x, w1, z0 + 0.35], [x, wt, ROOF], [x, -wt, ROOF], [x, -w1, z0 + 0.35]]; }
    K.loftN(P, [sec(1.73, 1.72, 0.95, 1.10, 0.95), sec(1.25, DECK + 0.02, 1.45, 1.55, 1.42), sec(-0.90, DECK + 0.02, 1.55, 1.60, 1.48),
                sec(-1.15, 1.78, 1.40, 1.45, 1.36), sec(-2.79, 1.80, 1.28, 1.32, 1.24)]);
    /* the mantlet slot and its narrow armour box round the gun */
    box(P, 1.65, 2.05, -0.30, 0.30, GZ - 0.28, GZ + 0.26);
    /* the 120 mm CN120-26: sleeve, bands, muzzle; 9.87 m gun forward puts the muzzle at X 6.43 */
    cylX(P, 2.05, 2.40, 0, GZ, 0.16, 0.15, 16);
    cylX(P, 2.40, 5.70, 0, GZ, 0.130, 0.120, 16);
    for (i = 0; i < 4; i++) { x = 3.00 + i * 0.75; cylX(D, x, x + 0.06, 0, GZ, 0.135, 0.135, 16); }
    cylX(P, 5.70, 6.43, 0, GZ, 0.105, 0.100, 14);
    cylX(D, 6.41, 6.44, 0, GZ, 0.06, 0.06, 12);
    /* the coaxial 12.7 mm port right of the gun */
    cylX(D, 1.95, 2.10, -0.42, GZ - 0.05, 0.03, 0.03, 8);
    /* the gunner's sight: a box on the roof front right with its big window (L2) */
    box(P, 0.95, 1.65, -1.05, -0.55, ROOF - 0.02, ROOF + 0.32);
    box(D, 1.65, 1.67, -0.98, -0.62, ROOF + 0.06, ROOF + 0.26);
    /* the commander's sight head on its column, roof left (L3) */
    cylZ(P, 0.55, 0.85, ROOF - 0.02, ROOF + 0.30, 0.13, 14);
    cylZ(P, 0.55, 0.85, ROOF + 0.30, ROOF + 0.58, 0.24, 18);
    box(D, 0.70, 0.80, 0.70, 1.00, ROOF + 0.36, ROOF + 0.52);
    /* the two hatches behind them */
    cylZ(P, -0.40, 0.75, ROOF - 0.02, ROOF + 0.07, 0.36, 16);
    cylZ(P, -0.40, -0.75, ROOF - 0.02, ROOF + 0.07, 0.36, 16);
    box(D, -0.15, -0.05, 0.60, 0.90, ROOF + 0.07, ROOF + 0.12);
    box(D, -0.15, -0.05, -0.90, -0.60, ROOF + 0.07, ROOF + 0.12);
    /* the bustle: the autoloader's ammunition hatch on the roof */
    box(P, -2.55, -1.40, -0.80, 0.80, ROOF - 0.02, ROOF + 0.04);
    box(D, -2.55, -1.40, -0.02, 0.02, ROOF + 0.04, ROOF + 0.05);
    for (s = -1; s <= 1; s += 2) {
      /* the smoke launcher banks at the bustle's sides (L1, L3): three rows of three */
      for (k = 0; k < 3; k++) for (i = 0; i < 3; i++) {
        x = -2.40 - i * 0.16;
        cyl(D, [x, s * 1.25, ROOF - 0.10 - k * 0.12], [x, s * 1.42, ROOF + 0.02 - k * 0.12], 0.05, 0.05, 8);
      }
      box(P, -2.70, -2.10, s > 0 ? 1.18 : -1.32, s > 0 ? 1.32 : -1.18, ROOF - 0.42, ROOF - 0.05);
      /* the side stowage on the turret flanks */
      box(P, -1.00, 0.70, s > 0 ? 1.55 : -1.68, s > 0 ? 1.68 : -1.55, DECK + 0.30, DECK + 0.62);
    }
    box(B.team, -2.40, -2.00, -0.55, 0.55, ROOF + 0.04, ROOF + 0.055);
  }

  function build(THREE, M, C) {
    var T = K.materials(THREE, C, PAINT), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T);
    addHull(HB);
    K.addRunning(HB, RG);
    K.flush(THREE, g, HB);
    K.wheels(THREE, g, T, RG);
    addTurret(TB);
    var tg = K.group(THREE, "turret", [TX, 0, DECK]);
    K.flush(THREE, tg, TB, [TX, 0, DECK]);
    g.add(tg);
    return g;
  }
  return { build: build };
})();

/* ===================================================================== the AMX-13 family */
var HeroAMX13 = (function () {
  "use strict";
  var K = HeroFrKit, box = K.box, cyl = K.cyl, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ;
  var PAINT = { base: "#525230", blots: ["#4a4a2b", "#5a5a37"], seed: 1951 };
  /* the AMX-13 TABLE (M1): front sprocket, five wheels pitch 0.70, rear idler at wheel height */
  function gear(rollers) {
    return { xw: [1.15, 0.45, -0.25, -0.96, -1.65], zw: 0.37, rw: 0.305, ty: 1.08, tw: 0.175,
             spr: { x: 1.95, z: 0.49, r: 0.30 }, idl: { x: -2.29, z: 0.37, r: 0.27 },
             rr: rollers, rrz: 0.80, rrr: 0.07, teeth: 12, pitch: 0.14 };
  }
  var NOSE = 2.44, REAR = -2.44, BELLY = 0.42, FEN = 0.96, DECK = 1.25, HW = 1.255, LW = 0.85;
  var TX = -0.66;                       /* turret ring centre (M1) */
  var TRX = -0.21, TRZ = 1.62;          /* the FL-10's trunnion axis */

  /* the hull: shared by every row; rearExt lengthens it at the rear (the VTT) */
  function addHull(B, o) {
    var P = B.paint, D = B.dark, s, i, R = REAR - o.rearExt;
    /* lower hull between the tracks; the rounded lower nose (M4, D1) */
    K.prismY(P, [[R, 0.60], [R + 0.18, BELLY], [1.95, BELLY], [2.30, 0.62], [NOSE, 0.74], [NOSE, FEN], [R, FEN]], -LW, LW);
    cylY(P, 2.10, -LW, LW, 0.66, 0.26, 18);
    /* the upper front plate and the glacis up to the deck; the deck to the rear */
    function sec(x, top, hw) { return [[x, -hw, FEN], [x, hw, FEN], [x, hw, top - 0.03], [x, hw - 0.03, top], [x, -hw + 0.03, top], [x, -hw, top - 0.03]]; }
    K.loftN(P, [sec(R, DECK - 0.05, HW - 0.02), sec(R + 0.08, DECK, HW - 0.02), sec(1.35, DECK, HW - 0.02), sec(NOSE - 0.02, FEN + 0.06, 1.00)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * HW;
      /* the fenders over the track, turned down at the front over the sprocket (M1, D1) */
      box(P, R + 0.02, 2.05, Math.min(s * 0.98, yo), Math.max(s * 0.98, yo), FEN - 0.03, FEN + 0.01);
      K.prismY(P, [[2.05, FEN - 0.03], [NOSE, FEN - 0.10], [NOSE + 0.02, FEN - 0.30], [2.30, FEN - 0.10], [2.05, FEN + 0.01]],
               Math.min(s * 0.98, yo), Math.max(s * 0.98, yo));
      /* the bins along the fender (M1) */
      box(P, R + 0.15, 1.30, s > 0 ? HW - 0.22 : -HW, s > 0 ? HW : -HW + 0.22, FEN + 0.01, DECK - 0.02);
      box(D, R + 0.15, 1.30, s > 0 ? HW - 0.005 : -HW - 0.01, s > 0 ? HW + 0.01 : -HW + 0.005, FEN + 0.12, FEN + 0.135);
      /* the lamps in their guards at the front corners (M4, D1) */
      K.lamps(B, 2.10, s * 0.92, DECK - 0.06, 2);
      /* towing eyes on the nose and the rear */
      box(D, NOSE - 0.05, NOSE + 0.08, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.78, 0.90);
      box(D, R - 0.08, R, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.70, 0.80);
    }
    /* the glacis: the spare road wheel lying on it, the spare track links on its right (M1, M4,
       D1); the driver's hatch front left; the round fan grille of the engine front right (M1) */
    var ang = Math.atan2(DECK - (FEN + 0.06), (NOSE - 0.02) - 1.35);
    var u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    function gz(x) { return DECK - (x - 1.35) * Math.tan(ang); }
    cyl(P, [1.95, -0.05, gz(1.95) + 0.02], [1.95 + w[0] * 0.15, -0.05, gz(1.95) + 0.02 + w[2] * 0.15], 0.30, 0.28, 18);
    cyl(D, [1.95 + w[0] * 0.15, -0.05, gz(1.95) + 0.02 + w[2] * 0.15], [1.95 + w[0] * 0.16, -0.05, gz(1.95) + 0.02 + w[2] * 0.16], 0.12, 0.12, 12);
    for (i = 0; i < 3; i++) K.slab(D, [1.75 + i * 0.22, -0.62, gz(1.75 + i * 0.22) + 0.05], u, [0, 1, 0], w, 0.08, 0.20, 0.04);
    box(P, 1.05, 1.45, 0.30, 0.80, DECK - 0.01, DECK + 0.05);
    box(D, 1.45, 1.48, 0.38, 0.72, DECK, DECK + 0.07);
    cylZ(D, 0.55, -0.55, DECK - 0.01, DECK + 0.03, 0.30, 20);
    for (i = 0; i < 5; i++) box(P, 0.31 + i * 0.12, 0.35 + i * 0.12, -0.83, -0.27, DECK + 0.03, DECK + 0.045);
    box(D, 0.20, 0.90, -1.00, -0.88, DECK - 0.01, DECK + 0.02);
  }

  /* --- the FL-10 oscillating turret.  Lower turret: the collar on the ring, carrying the
     trunnions (M1, M3).  Upper turret: from its gun collar at X 0.41 to the bustle over the hull
     rear at -2.44 (M1), the gun fixed in it.  gun: 75 or 90. */
  function addLowerTurret(B) {
    var P = B.paint, D = B.dark, s;
    cylZ(P, TX, 0, DECK - 0.01, DECK + 0.06, 0.90, 24);
    cyl(P, [TX, 0, DECK + 0.06], [TX, 0, 1.56], 0.86, 0.80, 24);
    for (s = -1; s <= 1; s += 2) {
      /* the trunnion bosses (the pivot of the upper turret) */
      cylY(P, TRX, s * 0.66, s * 0.80, TRZ, 0.15, 14);
      cylY(D, TRX, s * 0.80, s * 0.83, TRZ, 0.08, 10);
    }
  }
  function addUpperTurret(B, gun) {
    var P = B.paint, D = B.dark, s, i;
    K.loftN(P, [K.ring(0.41, 1.72, 0.26, 1.92, 0.30, 2.04, 0.22),
                K.ring(0.05, 1.50, 0.66, 1.88, 0.72, 2.12, 0.56),
                K.ring(-0.60, 1.46, 0.76, 1.90, 0.78, 2.12, 0.62),
                K.ring(-1.40, 1.42, 0.74, 1.90, 0.76, 2.11, 0.62),
                K.ring(-2.44, 1.42, 0.66, 1.88, 0.68, 2.06, 0.54)]);
    var GZ = 1.90;
    /* the gun collar (M3) */
    cylX(P, 0.20, 0.75, 0, GZ, 0.17, 0.15, 16);
    if (gun === 90) {
      /* the CN-90 F3: thicker, the thermal sleeve, the big single-baffle box brake (M4) */
      cylX(P, 0.75, 3.30, 0, GZ, 0.092, 0.088, 14);
      for (i = 0; i < 3; i++) cylX(D, 1.30 + i * 0.70, 1.35 + i * 0.70, 0, GZ, 0.097, 0.097, 14);
      cylX(P, 3.30, 3.80, 0, GZ, 0.072, 0.070, 12);
      box(P, 3.80, 4.04, -0.16, 0.16, GZ - 0.11, GZ + 0.11);
      box(D, 3.86, 3.98, -0.165, 0.165, GZ - 0.07, GZ + 0.07);
    } else {
      /* the 75 mm SA 50: long and slim with its small double-baffle brake (M2); 6.36 m with gun
         puts the muzzle at X 3.92 */
      cylX(P, 0.75, 3.72, 0, GZ, 0.065, 0.058, 12);
      box(P, 3.72, 3.92, -0.09, 0.09, GZ - 0.075, GZ + 0.075);
      box(D, 3.78, 3.86, -0.095, 0.095, GZ - 0.05, GZ + 0.05);
    }
    /* coaxial MG port left of the collar */
    cylX(D, 0.30, 0.50, 0.24, GZ - 0.04, 0.025, 0.025, 8);
    /* the commander's cupola dome on the left (M3); the gunner's hatch on the right */
    cylZ(P, -0.45, 0.40, 2.10, 2.18, 0.30, 18);
    cyl(P, [-0.45, 0.40, 2.18], [-0.45, 0.40, 2.33], 0.28, 0.16, 18);
    for (i = 0; i < 6; i++) {
      var a = i / 6 * K.TAU;
      box(D, -0.45 + Math.cos(a) * 0.27 - 0.03, -0.45 + Math.cos(a) * 0.27 + 0.03, 0.40 + Math.sin(a) * 0.27 - 0.03, 0.40 + Math.sin(a) * 0.27 + 0.03, 2.20, 2.24);
    }
    box(P, -0.75, -0.20, -0.58, -0.12, 2.11, 2.16);
    /* the bustle's reloading hatches on top (published: magazines reloaded from outside) */
    box(P, -2.20, -1.45, -0.50, 0.50, 2.08, 2.12);
    box(D, -2.20, -1.45, -0.02, 0.02, 2.12, 2.13);
    for (s = -1; s <= 1; s += 2) {
      /* a pair of smoke dischargers low on each front side (M1) */
      for (i = 0; i < 2; i++) cyl(D, [-0.05 - i * 0.14, s * 0.70, 1.70], [0.05 - i * 0.14, s * 0.86, 1.86], 0.045, 0.045, 8);
      /* the hand rails along the sides */
      box(D, -2.10, -0.10, s * 0.80 - 0.012, s * 0.80 + 0.012, 1.98, 2.00);
    }
    box(B.team, -1.30, -0.95, -0.40, 0.40, 2.115, 2.13);
  }

  /* --- the VTT's troop box (V1-V4): from over the third wheel to the rear; vertical lower sides
     over the fenders, upper sides sloping in to the roof; the cupola at its front left */
  var CUP = { x: -0.57, y: 0.42, z: 2.00 };
  function addVtt(B, rearExt) {
    var P = B.paint, D = B.dark, s, i, R = REAR - rearExt, RF = 2.00;
    function sec(x, zb, top) { var zs = Math.min(1.58, top - 0.02); return [[x, -1.20, zb], [x, 1.20, zb], [x, 1.20, zs], [x, 0.88, top], [x, -0.88, top], [x, -1.20, zs]]; }
    K.loftN(P, [sec(0.06, DECK, DECK + 0.05), sec(-0.25, DECK, RF), sec(R + 0.02, DECK, RF), sec(R, DECK, RF - 0.03)]);
    for (s = -1; s <= 1; s += 2) {
      /* the hatch panels and firing ports on the sloped upper sides (V2, V4) */
      for (i = 0; i < 3; i++) {
        var x = -0.70 - i * 0.70;
        /* a thin plate lying on the slope from (1.20, 1.58) to (0.88, 2.00), 0.012 proud of it */
        var q0 = [1.155, 1.64], q1 = [0.94, 1.92], o = 0.03, P0 = [];
        [0.004, o].forEach(function (d) {
          P0.push([x - 0.28, s * (q0[0] + 0.79 * d), q0[1] + 0.61 * d], [x + 0.28, s * (q0[0] + 0.79 * d), q0[1] + 0.61 * d],
                  [x + 0.28, s * (q1[0] + 0.79 * d), q1[1] + 0.61 * d], [x - 0.28, s * (q1[0] + 0.79 * d), q1[1] + 0.61 * d]);
        });
        K.hexa(P, P0);
        box(D, x - 0.12, x + 0.12, s > 0 ? 1.13 : -1.155, s > 0 ? 1.155 : -1.13, 1.63, 1.66);
      }
      /* the louvred grille on the front of the box side (V4) */
      box(D, -0.55, -0.10, s > 0 ? 1.20 : -1.215, s > 0 ? 1.215 : -1.20, DECK + 0.05, 1.52);
    }
    /* the two rear doors (V1) */
    box(P, R - 0.04, R, -1.05, -0.05, 0.80, 1.85);
    box(P, R - 0.04, R, 0.05, 1.05, 0.80, 1.85);
    box(D, R - 0.07, R - 0.04, -0.55, -0.45, 1.25, 1.35);
    box(D, R - 0.07, R - 0.04, 0.45, 0.55, 1.25, 1.35);
    /* roof hatches */
    box(P, -2.20, -1.20, -0.70, 0.70, RF, RF + 0.04);
    box(D, -1.72, -1.68, -0.68, 0.68, RF + 0.04, RF + 0.05);
    /* the cupola (V1-V4) */
    cylZ(P, CUP.x, CUP.y, RF - 0.02, CUP.z + 0.12, 0.38, 18);
    for (i = 0; i < 6; i++) {
      var a = i / 6 * K.TAU + 0.3;
      box(D, CUP.x + Math.cos(a) * 0.36 - 0.04, CUP.x + Math.cos(a) * 0.36 + 0.04, CUP.y + Math.sin(a) * 0.36 - 0.04, CUP.y + Math.sin(a) * 0.36 + 0.04, CUP.z + 0.03, CUP.z + 0.08);
    }
    box(B.team, -2.60, -2.25, -0.55, 0.55, RF, RF + 0.015);
  }
  /* the open ring mount with the 7.5 mm AA-52 (V2, V3): the arc rail, the cradle and the gun */
  function addVttMg(B) {
    var D = B.dark, P = B.paint, i, z = CUP.z + 0.12;
    for (i = 0; i <= 8; i++) {
      var a = Math.PI * (0.15 + 0.7 * i / 8), x = 0.0 - Math.sin(a) * 0.05, zz = z + Math.sin(a) * 0.32;
      box(D, -0.20 + Math.cos(a) * 0.30 - 0.03, -0.20 + Math.cos(a) * 0.30 + 0.03, CUP.y - 0.03 - 0.04 + 0.04, CUP.y + 0.03, zz - 0.03, zz + 0.03);
    }
    box(P, -0.12, 0.10, CUP.y - 0.10, CUP.y + 0.10, z, z + 0.20);
    box(D, -0.30, 0.25, CUP.y - 0.04, CUP.y + 0.04, z + 0.20, z + 0.30);
    cylX(D, 0.25, 0.85, CUP.y, z + 0.25, 0.018, 0.016, 8);
    box(D, -0.05, 0.08, CUP.y + 0.04, CUP.y + 0.14, z + 0.14, z + 0.26);
  }

  /* --- Mk 61 casemate (S1, S2): flush with the hull rear, the front plate from X 0.67 at the
     deck leaning back to 0.30 at the roof (S2), vertical sides over the tracks, chamfered front
     corners */
  var CRF = 2.40, MZ = 1.97, MTX = 0.45;
  function addCasemate(B) {
    var P = B.paint, D = B.dark, s, i;
    function sec(x, top, hw, ch) { return [[x, -hw, DECK], [x, hw, DECK], [x, hw, top], [x, -hw, top]].map(function (p) { return p; }); }
    var W = 1.30;
    K.loftN(P, [[[0.67, -W + 0.30, DECK], [0.67, W - 0.30, DECK], [0.30, W - 0.20, CRF], [0.30, -W + 0.20, CRF]],
                [[0.42, -W, DECK], [0.42, W, DECK], [0.05, W, CRF], [0.05, -W, CRF]],
                [[REAR, -W, DECK], [REAR, W, DECK], [REAR, W, CRF], [REAR, -W, CRF]]]);
    /* the cupola dome on the roof, right of centre in S1 at the left rear in S2: put on the left
       rear quarter (S2's side view) */
    cylZ(P, -1.05, 0.55, CRF - 0.02, CRF + 0.10, 0.32, 18);
    cyl(P, [-1.05, 0.55, CRF + 0.10], [-1.05, 0.55, 2.70], 0.30, 0.16, 18);
    for (i = 0; i < 6; i++) {
      var a = i / 6 * K.TAU;
      box(D, -1.05 + Math.cos(a) * 0.29 - 0.03, -1.05 + Math.cos(a) * 0.29 + 0.03, 0.55 + Math.sin(a) * 0.29 - 0.03, 0.55 + Math.sin(a) * 0.29 + 0.03, CRF + 0.12, CRF + 0.16);
    }
    /* roof hatch, vents (S1) */
    box(P, -2.15, -1.55, -0.85, -0.15, CRF, CRF + 0.04);
    box(D, -0.90, -0.75, -0.95, -0.80, CRF, CRF + 0.08);
    box(D, -0.90, -0.75, 0.10, 0.25, CRF, CRF + 0.08);
    for (s = -1; s <= 1; s += 2) {
      /* side seams and the stowage brackets (S2) */
      box(D, -1.30, -1.27, s > 0 ? W : -W - 0.01, s > 0 ? W + 0.01 : -W, DECK + 0.05, CRF - 0.05);
      box(D, -2.00, -1.60, s > 0 ? W : -W - 0.02, s > 0 ? W + 0.02 : -W, 1.70, 1.80);
    }
    /* the rear door */
    box(P, REAR - 0.03, REAR, -0.55, 0.55, DECK + 0.10, CRF - 0.15);
    box(B.team, -2.25, -1.95, -0.10, 0.70, CRF + 0.005, CRF + 0.02);
  }
  /* the howitzer and its canvas-covered mantlet (S1): the "turret" node, on the trunnion */
  function addHowitzer(B) {
    var P = B.paint, D = B.dark;
    /* the cover over the mantlet: a soft bulging block on the front plate */
    K.loftN(P, [K.ring(0.40, MZ - 0.42, 0.42, MZ, 0.48, MZ + 0.36, 0.38),
                K.ring(0.72, MZ - 0.32, 0.36, MZ, 0.40, MZ + 0.28, 0.30),
                K.ring(0.86, MZ - 0.18, 0.20, MZ, 0.22, MZ + 0.16, 0.16)]);
    /* the barrel (L/23, 2.4 m from its breech near the trunnion) and the recuperator under it,
       the double-baffle brake: the muzzle at X 2.78, just past the nose as S1 shows */
    cylX(P, 0.86, 2.55, 0, MZ, 0.072, 0.066, 12);
    cylX(P, 0.80, 1.55, 0, MZ - 0.14, 0.085, 0.085, 12);
    box(P, 2.55, 2.78, -0.13, 0.13, MZ - 0.10, MZ + 0.10);
    box(D, 2.62, 2.71, -0.135, 0.135, MZ - 0.07, MZ + 0.07);
  }

  /* --- the DCA turret (D1, D2): a rounded box nearly the hull's width, the twin 30 mm in a
     slot in its front, the Oeil Noir dish on its post at the rear right */
  var DR = 2.25, DGZ = 1.98;
  function addDca(B) {
    var P = B.paint, D = B.dark, s, i;
    function sec(x, w, top) { return [[x, -w, DECK + 0.02], [x, w, DECK + 0.02], [x, w, top - 0.30], [x, w - 0.12, top - 0.06], [x, w - 0.30, top], [x, -w + 0.30, top], [x, -w + 0.12, top - 0.06], [x, -w, top - 0.30]]; }
    K.loftN(P, [sec(0.42, 0.78, DR - 0.08), sec(0.30, 0.90, DR), sec(-1.55, 0.92, DR), sec(-1.75, 0.82, DR - 0.08)]);
    /* the slot in the front with the cradle */
    box(D, 0.40, 0.44, -0.30, 0.30, 1.62, 2.14);
    box(P, 0.20, 0.62, -0.28, 0.28, DGZ - 0.12, DGZ + 0.12);
    for (s = -1; s <= 1; s += 2) {
      var y = s * 0.13;
      /* the 30 mm HSS 831A barrels */
      cylX(P, 0.62, 0.95, y, DGZ, 0.060, 0.055, 12);
      cylX(D, 0.95, 2.30, y, DGZ, 0.032, 0.030, 10);
      cylX(D, 2.18, 2.32, y, DGZ, 0.042, 0.042, 10);
      /* side panels (doors) and handrails (D1, D2) */
      box(P, -1.25, -0.05, s > 0 ? 0.90 : -0.93, s > 0 ? 0.93 : -0.90, 1.45, 2.00);
      box(D, -1.45, 0.25, s * 0.97 - 0.012, s * 0.97 + 0.012, 2.00, 2.02);
      for (i = 0; i < 4; i++) box(D, 0.15 - i * 0.5, 0.17 - i * 0.5, s * 0.96 - 0.012, s * 0.96 + 0.012, 1.42, 2.02);
      /* periscopes on the roof */
      box(D, 0.05, 0.20, s * 0.55 - 0.08, s * 0.55 + 0.08, DR, DR + 0.08);
    }
    /* the radar post at the rear right and the elliptical dish facing forward (D1, D2) */
    var RX = -1.30, RY = -0.20, DZ = 2.74, DW = 0.425, DH = 0.24;
    box(P, RX - 0.28, RX + 0.28, RY - 0.30, RY + 0.30, DR - 0.02, 2.48);
    cylZ(P, RX, RY, 2.48, DZ - 0.10, 0.07, 10);
    for (i = -6; i < 6; i++) {
      var y0 = i / 6 * DW, y1 = (i + 1) / 6 * DW, ym = (y0 + y1) / 2, e = Math.sqrt(Math.max(0.05, 1 - (ym / DW) * (ym / DW)));
      var xo = RX + 0.06 - 0.20 * (ym / DW) * (ym / DW);
      box(P, xo - 0.03, xo + 0.01, RY + y0, RY + y1, DZ - DH * e, DZ + DH * e);
    }
    for (i = -2; i <= 2; i++) box(D, RX + 0.08, RX + 0.10, RY - DW * 0.9, RY + DW * 0.9, DZ + i * 0.09 - 0.008, DZ + i * 0.09 + 0.008);
    /* the stowage at the turret rear */
    box(P, -1.95, -1.75, -0.70, 0.70, 1.55, 2.00);
    box(B.team, -1.10, -0.60, 0.20, 0.70, DR, DR + 0.015);
  }

  function build(THREE, M, C, kind) {
    var T = K.materials(THREE, C, PAINT), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T), UB, tg, ug;
    var rearExt = kind === "vtt" ? 0.34 : 0;
    var RG = gear(kind === "spg" ? [0.80, -0.55, -1.30] : [0.10, -1.30]);
    addHull(HB, { rearExt: rearExt });
    K.addRunning(HB, RG);
    if (kind === "vtt") addVtt(HB, rearExt);
    if (kind === "spg") addCasemate(HB);
    if (kind === "tank75" || kind === "tank90") box(HB.team, 1.55, 1.85, -1.00, -0.70, DECK, DECK + 0.015);
    K.flush(THREE, g, HB);
    K.wheels(THREE, g, T, RG);
    if (kind === "tank75" || kind === "tank90") {
      /* "turret" = the lower turret, trained; "oscillating" inside it = the upper turret with
         the gun, origin on the trunnion axis (the FL-10's elevation is a rotation of this group
         about its local Y) */
      addLowerTurret(TB);
      tg = K.group(THREE, "turret", [TX, 0, DECK]);
      K.flush(THREE, tg, TB, [TX, 0, DECK]);
      UB = K.bins(T);
      addUpperTurret(UB, kind === "tank90" ? 90 : 75);
      ug = K.group(THREE, "oscillating", [TRX - TX, 0, TRZ - DECK]);
      K.flush(THREE, ug, UB, [TRX, 0, TRZ]);
      tg.add(ug);
    } else if (kind === "vtt") {
      addVttMg(TB);
      tg = K.group(THREE, "turret", [CUP.x, CUP.y, CUP.z + 0.12]);
      K.flush(THREE, tg, TB, [CUP.x, CUP.y, CUP.z + 0.12]);
    } else if (kind === "spg") {
      addHowitzer(TB);
      tg = K.group(THREE, "turret", [MTX, 0, MZ]);
      K.flush(THREE, tg, TB, [MTX, 0, MZ]);
    } else {
      addDca(TB);
      tg = K.group(THREE, "turret", [TX, 0, DECK]);
      K.flush(THREE, tg, TB, [TX, 0, DECK]);
    }
    g.add(tg);
    return g;
  }
  function make(kind) { return function (THREE, M, C) { return build(THREE, M, C, kind); }; }
  return { tank75: make("tank75"), tank90: make("tank90"), vtt: make("vtt"), spg: make("spg"), dca: make("dca") };
})();

/* len: the measured X extent of each build */
UNIT_MODELS["fra_e60_mbt"] = { len: 9.59, build: HeroAMX30.build };
UNIT_MODELS["fra_e80_mbt"] = { len: 9.59, build: HeroAMX30.buildB2 };
UNIT_MODELS["fra_e90_mbt"] = { len: 9.98, build: HeroLeclerc.build };
UNIT_MODELS["fra_e00_mbt"] = { len: 9.98, build: HeroLeclerc.build };
UNIT_MODELS["fra_e50_lighttank"] = { len: 6.55, build: HeroAMX13.tank75 };
UNIT_MODELS["fra_e60_lighttank"] = { len: 6.67, build: HeroAMX13.tank90 };
UNIT_MODELS["fra_e50_ifv"] = { len: 5.38, build: HeroAMX13.vtt };
UNIT_MODELS["fra_e50_spg"] = { len: 5.41, build: HeroAMX13.spg };
UNIT_MODELS["fra_e60_spaag"] = { len: 5.15, build: HeroAMX13.dca };
UNIT_MODELS["fra_e80_spaag"] = { len: 5.15, build: HeroAMX13.dca };
