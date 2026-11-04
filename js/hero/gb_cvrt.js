/* ========== gb_cvrt.js - HERO models: the CVR(T) family (Scorpion, Scimitar, Striker, Stormer HVM) ==========
   One aluminium hull and one builder, a VARIANTS table picking hull height, running gear, turret
   or launcher and paint:
     gbr_e60_lighttank, gbr_e80_lighttank  "scorpion"   FV101 Scorpion, the 76 mm L23 turret
     gbr_e80_recon, gbr_e90_lighttank      "scimitar"   FV107 Scimitar, the 30 mm RARDEN turret
     gbr_e00_lighttank                     "scimitar2"  FV107 Scimitar Mk 2: the Spartan-based
                                           taller hull, side armour and the bar-armour cage
     gbr_e80_tankdestroyer,
     gbr_e90_tankdestroyer                 "striker"    FV102 Striker: the raised (Spartan) rear
                                           hull, the five-round Swingfire bin that tilts up
     gbr_e90_spaag, gbr_e00_spaag          "stormer"    Stormer HVM: the stretched six-wheel
                                           hull, the eight-round Starstreak launcher turret
   CVR(T) layout (en.wikipedia "Combat Vehicle Reconnaissance (Tracked)"; every photo below):
   five road wheels a side, drive sprocket at the FRONT, idler at the rear, NO return rollers;
   engine front RIGHT under the louvred grille, driver front LEFT; turret at the rear.

   References (Wikimedia Commons; cached in scratchpad/q_cvrt_ref, measured on pixel grids):
     D1  "Scorpion recog.gif" - recognition line drawing, side (starboard, nose right), front and
         3/4 views, 600 px.  SCALE: 69.3 px/m from the published hull 4.79 m (rear mudguard lip
         px 135 to nose px 467 = 332 px); the published 2.10 m height then lands on the turret
         roof (145 px = 2.09 m): two published figures agree on one scale.  X = (px - 301) /
         69.3, Z = (175 - py) / 69.3.  Read off it: the wheel row (centres X -1.40 -0.75 -0.06
         0.59 1.28, an even 0.671 m pitch), deck 1.49 m, the long shallow glacis from X 0.78 to
         a nose bevel at X 1.99 / 1.25 m, nose plate 1.08-0.87 m, sponson ledge 1.08 m and its
         underside 0.94 m, turret base X -2.08..-0.05, roof 2.09 m from X -2.06 to -0.52 then
         the sloped front, mantlet X -0.09..0.30 / 1.59-1.95 m, gun axis 1.80 m, hatches 2.27 m.
         Front view: track centres at 0.785 and track width 0.205 of the overall width; deck
         0.82 of it; turret base 0.74, its waist 0.83 (at 0.39 of its height), roof 0.73;
         grille on the vehicle's RIGHT, driver's hatch LEFT; smoke banks at the turret's front
         top corners.
     D2  "Scorpion recog2.gif" - Spartan and Striker recognition drawing: the raised flat roof
         over the whole rear hull, the glacis running up to it, the Swingfire bin hinged at
         its REAR edge tilting its front up, the cupola ahead of it.  Roof 1.65 m at the
         wheel pitch's scale (94.1 px/m); cupola 2.18 m (published Striker 2.2 m).
     P1  "Scimitar upgraded.jpg" - an export Scimitar dead side-on, starboard (its raised hull
         and missile pods are NOT this file's rows; used only for the running gear): wheel
         diameter / pitch 105 / 118.75 = 0.88 (D1 40 / 46.5 = 0.86), wheel centre 0.57 pitch
         above the track's bottom, the idler 0.86 pitch behind wheel 1 and 0.94 up, the
         sprocket 1.19 pitch ahead of wheel 5 and 0.90 up, nose 1.62 pitch ahead of wheel 5.
         So: wheels 0.59 m on a 0.671 m pitch, axle 0.38 m, idler X -1.99 / 0.64 m r 0.23,
         sprocket X 2.08 / 0.60 m r 0.25 (D1's sprocket is hidden behind the mudguard).
     P2  "Philippine Army FV101 Right Side View.jpg" - Scorpion front right 3/4: the louvred
         grille on the glacis' right front, the second grille ahead of the turret on the right,
         the driver's hatch front left, the exhaust silencer along the hull's right top edge,
         the front sprocket and five wheels, no skirts, the short fat 76 mm.
     P3  "FV107 Scimitar IFV.jpg" - Scimitar in the 1990s, starboard rear: black / green
         disruptive paint, the silencer along the right top edge, the turret rear bin, RARDEN.
     P4  "Alvis FV102 Striker owned by Malcolm McMillan pic04.JPG" - Striker near side-on,
         starboard: the raised roof 2.08 wheel pitches above the axle (1.77 m; the camera
         stands a little above the roof, D2 says 1.65) -> 1.72 m drawn; the roof's front edge
         at X 0.76; the bin on the rear roof hinged at its rear, the commander's cupola with
         the GPMG ahead of it, the silencer on the right side, headlamps in guards.
     P5  "Combat Vehicle Reconnaissance (Tracked) (CVR(T)) Operating in Afghanistan MOD
         45153172.jpg" - Scimitar Mk 2 side-on, starboard, in plain sand with the full bar
         armour: five wheels on the same pitch (39.6 px).  Ratios at the turret station: gun
         axis 3.06 pitches above the axle -> 2.43 m (Mk 1: 1.80): the hull is 0.63 m taller;
         muzzle 1.88 pitches ahead of wheel 5 -> X 2.54; the bar cage 1.08 pitches ahead of
         the nose's station (X 2.83), its top 2.30 m, its foot 0.86 m.
     P6  "Combat Vehicle Reconnaissance (Tracked) (CVR(T)) Operating in Afghanistan MOD
         45153174.jpg" - Mk 2 head-on: the cage round the hull and around the turret sides.
     P7  "Alvis Stormer in 2009.jpg" - Stormer HVM side-on, starboard, black / green: SIX
         wheels, front sprocket, rear idler, the long overhang behind the idler, the flat roof
         over the whole hull, the long glacis, the side bins, the round outlet on the right
         front side, the launcher at the rear (two banks of 2 x 2 tubes, the sight between
         them under its two hoop guards).
     P8  "Stormer HVM Starstreak Launcher vehicle pic1/pic3/pic5.JPG" - front 3/4, head-on and
         front right: the grille panels across the glacis, the headlamps in guards low on the
         nose plate, the mudguard flaps, the launcher's eight tube mouths.
   Published (en.wikipedia): FV101 Scorpion 4.79 m (hull), 2.134 / 2.23 / 2.24 m wide (sources
   differ; the brief's 2.24 is drawn as the width over the mudguards), 2.102 m high, 8.07 t.
   FV107 Scimitar 4.9 m (Jane's via armour_specs 4.985 gun forward), 2.2 m, 2.1 m.  FV102
   Striker 4.8 x 2.4 x 2.2 m; "five missiles in a ready-to-fire bin at the back", "elevated to
   35 deg (622 mils)".  Alvis Stormer 5.27 x 2.76 x 2.49 m, 12.7 t, "0.48 m longer with a 6th
   set of road wheels" (CVR(T) article).  Starstreak 1.397 m long.  Scimitar Mk 2: "a new
   aluminium hull based on that of the Spartan"; no dimensions reachable (the Spartan article's
   5.16 x 2.48 x 2.63 m is the nearest published figure).

   CONFLICTS SETTLED (evidence recorded):
     - Scimitar muzzle: D1 puts it at X 2.76 (5.16 m overall), P1's export turret at X 2.14;
       published 4.985 m gun forward puts it at X 2.585 and P5 measures X 2.54.  Published and
       P5 agree: drawn at X 2.585.
     - Stormer scale: at the CVR(T) wheel pitch P7's hull (9.51 pitches long, roof 3.46
       pitches up) would be 6.38 m long and 2.32 m to the roof - against the published 5.27 m
       AND the published 2.49 m height (2.32 m roof plus the APC cupola would be 2.9 m).  At
       the published 5.27 m the roof is 1.92 m and the 2.49 m figure fits a cupola on it, so
       the two published figures agree with each other and the photograph's ratios: P7 is
       scaled by the published length (0.0071 m/px).  Its wheel pitch then reads 0.554 m and
       its wheels 0.50 m: SMALLER than the CVR(T)'s.  So the Stormer shares the layout and the
       builder, NOT the running gear dimensions; its hull is a separate (longer, taller,
       wider) shape in the same table.
     - Scimitar Mk 2 height: P5 says the hull is 0.63 m taller than the Mk 1's deck (2.12 m);
       armour_specs' 2.2 m overall is not a published figure and is not followed.
   Recognition list (each drawn; source):
     1. five road wheels, front sprocket, raised rear idler, no return rollers - D1, P1, P2
     2. the low hull with the long shallow glacis, the louvred grille front right, the
        driver's hatch front left, headlamps in guards on the nose corners - D1, P2, P4
     3. the turret at the rear with faceted sides, the smoke banks on its front corners, the
        commander's cupola on the left - D1, P3
     4. Scorpion: the short fat 76 mm in a big mantlet (D1 front view, P2); Scimitar: the long
        thin RARDEN with the slotted flash hider - D1, P3, P5
     5. the exhaust silencer along the right hull top - P2, P3, P4
     6. Striker: the raised roof, the Swingfire bin hinged at its rear edge - D2, P4
     7. Mk 2: the taller hull, the bar cage round hull and turret, plain sand - P5, P6
     8. Stormer: six wheels, the long flat roof, side bins, the launcher with two 2 x 2 banks
        either side of the sight and its hoops - P7, P8
   Paint: 1970s-90s British green with black disruptive patches (P3, P4, P7): drawn #4b5040 /
   #1d1f1a, as js/hero/gb_tanks.js draws CR1.  Scimitar Mk 2 in plain sand (P5, P6) #b9a47c.
   Stormer e00 keeps the green/black of P7 (2009) and P8: the photographs of the type in the
   2000s are green (armour_specs' "desert" is a guess).  No roundels, flags, numbers or signs.
   NOT CONFIRMED (proportion or judgement, no drawing or published figure):
     - the CVR(T) track width 0.43 m and centres 1.76 m apart (D1 front view's ratios against
       the published width), belly 0.36 m, the lower nose; the deck's half width 0.915 m;
     - the turret's plan (front narrowing to 1.3 m), the cupola, hatches, sights, smoke banks,
       rear bin sizes; the 76 mm's length (muzzle X 1.85, behind the nose, from P2's view);
       the RARDEN's sleeve length;
     - Striker: the roof 1.72 m (D2 1.65, P4 1.77), the bin's size (1.45 x 1.70 x 0.38 m), the
       cupola's place; Mk 2: the roof's front edge (X 0.70, as the Spartan's), the turret on
       the same ring as the Mk 1, the side armour plates, the cage's spacing and its rear;
     - Stormer: everything below the scale argument above - track centres 2.06 m, the bins
       out to the published 2.76 m, the launcher (1.42 m wide from P8's ratio to the roof,
       tubes 1.45 m from the published 1.397 m round), the hoops, the round outlet;
     - wheel and sprocket details.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours), team colour (C.team):
   strips on the rear deck and the turret roof (Striker: on the bin's lid).
   Nodes: "turret" (Scorpion, Scimitar, Mk 2: origin on the ring at the deck, gun along +X;
   Stormer: the launcher turret, holding "podelev" - the two banks hinged at the trunnion,
   userData.el = 0.35 rad, userData.cells the eight tube mouths); Striker has no turret (its
   row is turret:false): its "podelev" is a child of the root, hinged at the bin's rear edge,
   userData.el = 35 deg (published), five cells; one "roadwheel" group per wheel station.
   Drawn (L x W x H, published in brackets):
     Scorpion   4.80 x 2.25 x 2.26 m (4.79 x 2.24 x 2.10; turret roof 2.09, cupola sight 2.26)
     Scimitar   4.985 x 2.25 x 2.26 m (4.985 gun forward x 2.2 x 2.1; roof 2.09)
     Mk 2       5.50 x 2.93 x 2.89 m over the bar cage (none published; turret roof 2.72)
     Striker    4.80 x 2.25 x 2.17 m (4.8 x 2.4 x 2.2; the 2.4 m is not met: D1/D2 give the
                same hull as the Scorpion's and no reference shows anything wider)
     Stormer    5.28 x 2.77 x 3.30 m (5.27 x 2.76 x 2.49 for the APC; roof 2.00, the HVM
                launcher's hoops 3.28, P7 3.34)
   Draw calls: hull 3 + running gear 2 + wheels 5 (Stormer 6) + turret 3 (Striker: bin 3 +
   cradle 1; Stormer: + pod 2) = 13 to 16.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroCvrt = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ variants */
  /* GEAR: CVR(T) (D1, P1) and Stormer (P7 at the published length) */
  var GEAR = {
    cvrt: { XW: [-1.40, -0.73, -0.06, 0.61, 1.28], ZW: 0.38, RW: 0.295, TY: 0.88, TW: 0.215,
            IDL: { x: -1.99, z: 0.64, r: 0.23 }, SPR: { x: 2.06, z: 0.60, r: 0.25 } },
    stormer: { XW: [-1.115, -0.547, 0.007, 0.561, 1.122, 1.654], ZW: 0.33, RW: 0.25, TY: 1.03, TW: 0.215,
               IDL: { x: -1.63, z: 0.68, r: 0.22 }, SPR: { x: 2.28, z: 0.58, r: 0.23 } }
  };
  /* HULL: nose plate, rear plate, rear mudguard lip, belly, sponson underside / ledge / half
     width, deck (roof) height and half width, the glacis' top X, its foot (X, Z), the nose
     plate's top Z, the turret ring X */
  var HULL = {
    low:     { NOSE: 2.39, REAR: -2.22, LIP: -2.40, BELLY: 0.36, SPB: 0.95, SPT: 1.08, SPH: 1.12,
               DECK: 1.49, HWD: 0.915, GX0: 0.78, GX1: 1.99, GZ1: 1.25, NZ: 1.08, TX: -1.06 },
    spartan: { NOSE: 2.39, REAR: -2.22, LIP: -2.40, BELLY: 0.36, SPB: 0.95, SPT: 1.08, SPH: 1.12,
               DECK: 1.72, HWD: 0.915, GX0: 0.70, GX1: 1.99, GZ1: 1.25, NZ: 1.08, TX: -1.06 },
    mk2:     { NOSE: 2.39, REAR: -2.22, LIP: -2.40, BELLY: 0.36, SPB: 0.95, SPT: 1.08, SPH: 1.12,
               DECK: 2.12, HWD: 0.915, GX0: 0.70, GX1: 1.99, GZ1: 1.25, NZ: 1.08, TX: -1.06 },
    stormer: { NOSE: 2.635, REAR: -2.58, LIP: -2.635, BELLY: 0.40, SPB: 0.98, SPT: 1.12, SPH: 1.27,
               DECK: 2.00, HWD: 1.10, GX0: 0.79, GX1: 2.42, GZ1: 1.12, NZ: 1.00, TX: -1.59 }
  };
  var VARIANTS = {
    scorpion:  { gear: "cvrt", hull: "low", top: "l23", paint: "nato" },
    scimitar:  { gear: "cvrt", hull: "low", top: "rarden", paint: "nato" },
    scimitar2: { gear: "cvrt", hull: "mk2", top: "rarden", paint: "sand", cage: true },
    striker:   { gear: "cvrt", hull: "spartan", top: "bin", paint: "nato" },
    stormer:   { gear: "stormer", hull: "stormer", top: "hvm", paint: "nato" }
  };
  var SCHEMES = {
    nato: { base: "#4b5040", dis: "#1d1f1a", seed: 1972 },
    sand: { base: "#b9a47c", blots: ["#ad9872", "#c4b088"], seed: 2011 }
  };

  /* ------------------------------------------------------------ geometry kit */
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
  /* a box from the centre of one face (y on the side away from the hull) */
  function ybox(bin, x0, x1, ya, yb, z0, z1) { box(bin, x0, x1, Math.min(ya, yb), Math.max(ya, yb), z0, z1); }
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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1, seg); }
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

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, key) {
    if (_tex[key] !== undefined) return _tex[key];
    _tex[key] = null;
    var P = SCHEMES[key];
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(P.seed), i, k, x, y, w, n, a, dx, dy;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      var patch = function (col, cx, cy, rx, ry, rr) {
        q.fillStyle = col; q.beginPath();
        for (k = 0; k < rr.length; k++) {
          a = k / rr.length * TAU;
          var px = cx + Math.cos(a) * rx * rr[k], py = cy + Math.sin(a) * ry * rr[k];
          if (k === 0) q.moveTo(px, py); else q.lineTo(px, py);
        }
        q.closePath(); q.fill();
      };
      if (P.dis) {
        /* black disruptive patches, hard edged, about a third of the plate, repeated at the
           tile's wraps (P3, P4, P7); the texture repeats every 2.9 m on the hull */
        for (i = 0; i < 7; i++) {
          var cx = R() * S, cy = R() * S, rx = 50 + R() * 60, ry = 26 + R() * 34, rr = [];
          n = 7 + ((R() * 4) | 0);
          for (k = 0; k < n; k++) rr.push(0.6 + R() * 0.5);
          for (dx = -1; dx <= 1; dx++) for (dy = -1; dy <= 1; dy++) patch(P.dis, cx + dx * S, cy + dy * S, rx, ry, rr);
        }
      } else {
        for (i = 0; i < 14; i++) {              /* faint tonal blots: weathering, not camouflage */
          var bx = R() * S, by = R() * S, brr = [];
          for (k = 0; k < 8; k++) brr.push(0.7 + R() * 0.4);
          for (dx = -1; dx <= 1; dx++) for (dy = -1; dy <= 1; dy++) patch(P.blots[i % 2], bx + dx * S, by + dy * S, 30 + R() * 50, 20 + R() * 30, brr);
        }
      }
      for (i = 0; i < 5; i++) {                 /* plate seams */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(15,16,12,0.28)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
      }
      for (i = 0; i < 130; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(200,190,160,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 30, 2 + R() * 20);
      }
      _tex[key] = new THREE.CanvasTexture(cv);
      _tex[key].wrapS = _tex[key].wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _tex[key].encoding = THREE.sRGBEncoding;
      _tex[key].anisotropy = 4;
    } catch (e) { _tex[key] = null; }
    return _tex[key];
  }
  function materials(THREE, C, key) {
    var T = {}, tx = paintTex(THREE, key);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(SCHEMES[key].base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
  function flush(THREE, group, B, f) {
    var k, b, geo, j, q;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      if (f) for (j = 0; j < b.P.length; j += 3) { q = f(b.P[j], b.P[j + 1], b.P[j + 2]); b.P[j] = q[0]; b.P[j + 1] = q[1]; b.P[j + 2] = q[2]; }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); g.name = name; g.position.set(x, y, z); return g; }

  /* ---------------------------------------------------------------- hull */
  /* the top of the hull at x: deck / roof, then the glacis, then the nose bevel (D1) */
  function topZ(H, x) {
    if (x <= H.GX0) return H.DECK;
    if (x <= H.GX1) return H.DECK + (H.GZ1 - H.DECK) * (x - H.GX0) / (H.GX1 - H.GX0);
    return H.GZ1 + (H.NZ - H.GZ1) * Math.min(1, (x - H.GX1) / (H.NOSE - H.GX1));
  }
  function addHull(B, V, H, G) {
    var P = B.paint, D = B.dark, s, i, x, y, z, LW = G.TY - G.TW - 0.03, stormer = V.hull === "stormer";
    /* lower hull between the tracks: the belly, the lower nose leaning back to the sprocket,
       the rear plate (D1) */
    prismY(P, [[H.REAR, H.SPB + 0.05], [H.REAR, 0.62], [H.REAR + 0.28, H.BELLY], [H.NOSE - 0.42, H.BELLY],
               [H.NOSE, H.NZ - 0.24], [H.NOSE, H.SPB + 0.05]], -LW, LW);
    /* upper hull over the tracks: the sponson underside, the short vertical ledge, the side
       leaning in to the deck edge; lofted along the deck, glacis and nose bevel (D1) */
    function sec(xx) {
      var zt = topZ(H, xx), zl = Math.min(H.SPT, zt - 0.02), hw = zt - 0.02 > H.SPT ? H.HWD : H.SPH - 0.02;
      return [[xx, -H.SPH, H.SPB], [xx, H.SPH, H.SPB], [xx, H.SPH, zl], [xx, hw, zt], [xx, -hw, zt], [xx, -H.SPH, zl]];
    }
    loftN(P, [sec(H.NOSE), sec(H.GX1), sec(H.GX0), sec(H.REAR)]);
    /* the louvred engine grille on the glacis, front RIGHT (D1 front view, P2, P8) */
    var gx0 = H.GX0 + 0.20, gx1 = H.GX1 - 0.12, n = 9;
    for (i = 0; i < n; i++) {
      x = gx0 + (i + 0.5) * (gx1 - gx0) / n; z = topZ(H, x);
      box(D, x - 0.03, x + 0.03, stormer ? -0.95 : -0.80, -0.18, z - 0.01, z + 0.02);
    }
    if (stormer) {
      /* Stormer: the grille panels run right across the glacis (P8) */
      for (i = 0; i < n; i++) {
        x = gx0 + 0.6 + (i + 0.5) * (gx1 - gx0 - 0.6) / n; z = topZ(H, x);
        box(D, x - 0.03, x + 0.03, 0.18, 0.95, z - 0.01, z + 0.02);
      }
    } else {
      /* the driver's hatch and periscopes front LEFT (D1 front view, P2) */
      x = (H.GX0 + H.GX1) / 2 - 0.05; z = topZ(H, x);
      var hx0 = x - 0.22, hx1 = x + 0.22;
      prismY(P, [[hx0, topZ(H, hx0) - 0.02], [hx1, topZ(H, hx1) - 0.02], [hx1, topZ(H, hx1) + 0.05], [hx0, topZ(H, hx0) + 0.05]], 0.22, 0.70);
      for (i = 0; i < 3; i++) box(D, hx1 - 0.02, hx1 + 0.06, 0.28 + i * 0.15, 0.38 + i * 0.15, topZ(H, hx1) + 0.02, topZ(H, hx1) + 0.10);
    }
    if (V.hull === "low") {
      /* the second grille panel ahead of the turret, right (P2) */
      for (i = 0; i < 6; i++) { x = 0.12 + i * 0.10; box(D, x - 0.035, x + 0.035, -0.82, -0.25, H.DECK - 0.01, H.DECK + 0.02); }
    }
    /* headlamps in guards on the nose corners (P2, P4); Stormer: low on the nose plate (P8) */
    for (s = -1; s <= 1; s += 2) {
      var hy = s * (stormer ? 0.62 : 0.86), hX = stormer ? H.NOSE - 0.10 : H.GX1 + 0.10, hz = stormer ? H.NZ - 0.30 : topZ(H, hX) + 0.07;
      cyl(P, [hX - 0.10, hy, hz], [hX + 0.04, hy, hz], 0.075, 0.08, 12);
      cyl(D, [hX + 0.04, hy, hz], [hX + 0.05, hy, hz], 0.065, 0.065, 12);
      box(D, hX - 0.06, hX + 0.10, hy - 0.11, hy - 0.09, hz - 0.10, hz + 0.10);
      box(D, hX - 0.06, hX + 0.10, hy + 0.09, hy + 0.11, hz - 0.10, hz + 0.10);
      box(D, hX + 0.08, hX + 0.10, hy - 0.11, hy + 0.11, hz + 0.08, hz + 0.10);
      /* towing eyes on the nose plate and the rear plate */
      box(D, H.NOSE - 0.06, H.NOSE + 0.01, s * 0.42 - 0.04, s * 0.42 + 0.04, H.NZ - 0.20, H.NZ - 0.10);
      box(D, Math.max(H.LIP, H.REAR - 0.10), H.REAR + 0.02, s * 0.45 - 0.04, s * 0.45 + 0.04, 0.70, 0.80);
      /* front mudguards over the track ends, with their flaps (D1, P8) */
      y = s * G.TY;
      box(P, G.SPR.x - 0.10, H.NOSE, y - G.TW - 0.03, y + G.TW + 0.03, H.SPB - 0.02, H.SPB + 0.02);
      box(P, H.NOSE - 0.03, H.NOSE, y - G.TW - 0.03, y + G.TW + 0.03, H.SPB - (stormer ? 0.40 : 0.22), H.SPB);
      /* rear mudguards to the lip (D1) */
      box(P, H.LIP, H.REAR + 0.40, y - G.TW - 0.03, y + G.TW + 0.03, H.SPB - 0.02, H.SPB + 0.02);
      /* rear lamp clusters high on the rear plate */
      box(D, H.REAR - 0.05, H.REAR, s * 0.78 - 0.08, s * 0.78 + 0.08, H.DECK - 0.30, H.DECK - 0.18);
      /* the stowage rail along the upper hull side (D1 px 175-282) */
      ybox(D, -1.85, -0.30, s * (H.SPH - 0.05), s * (H.SPH - 0.01), H.SPT + 0.10, H.SPT + 0.13);
    }
    if (!stormer) {
      /* the exhaust silencer along the right top edge with its guard (P2, P3, P4) */
      var ey = -(H.HWD + 0.03), ez = H.DECK - 0.09, ex0 = V.hull === "low" ? -1.45 : -0.75, ex1 = V.hull === "low" ? 0.30 : 0.70;
      if (V.hull === "mk2") ez = H.DECK - 0.20;
      cylX(D, ex0, ex1, ey, ez, 0.085, 0.085, 12);
      cylX(D, ex1, ex1 + 0.25, ey + 0.02, ez - 0.03, 0.05, 0.05, 8);
      for (i = 0; i < 5; i++) { x = ex0 + 0.1 + i * (ex1 - ex0 - 0.2) / 4; box(P, x - 0.02, x + 0.02, ey - 0.10, ey + 0.08, ez - 0.10, ez + 0.10); }
    } else {
      /* Stormer: the round outlet on the right front side (P7, P8) */
      cylY(D, 1.50, -(H.SPH + 0.05), -(H.SPH - 0.05), 1.25, 0.21, 18);
      cylY(P, 1.50, -(H.SPH + 0.07), -(H.SPH + 0.04), 1.25, 0.12, 14);
      /* the side bins out to the published 2.76 m (P7 px 215-640) */
      for (s = -1; s <= 1; s += 2) {
        ybox(P, -1.80, 1.20, s * H.SPH, s * 1.38, 1.04, 1.60);
        [-0.80, 0.20].forEach(function (jx) { ybox(D, jx - 0.01, jx + 0.01, s * 1.38, s * 1.385, 1.06, 1.58); });
      }
      /* the commander's hatch mid-roof (P8) and the rear door */
      box(P, -0.25, 0.30, 0.10, 0.62, H.DECK, H.DECK + 0.10);
      box(D, -0.20, 0.25, 0.15, 0.57, H.DECK + 0.10, H.DECK + 0.12);
    }
    if (V.hull !== "low") {
      /* the rear door of the raised hulls (D2, P4) */
      box(D, H.REAR - 0.02, H.REAR, -0.42, 0.22, 0.60, H.DECK - 0.12);
      box(P, H.REAR - 0.05, H.REAR, 0.10, 0.18, 0.75, 1.25);
    } else {
      /* the rear stowage bin on the rear plate (P3) */
      box(P, H.REAR - 0.16, H.REAR, -0.70, 0.70, 1.05, 1.38);
    }
    /* team colour: a plate on the rear deck */
    box(B.team, H.REAR + 0.10, H.REAR + 0.35, -0.55, 0.55, H.DECK, H.DECK + 0.015);
  }

  /* Mk 2: the side armour plates on the upper hull and the bar cage round the hull (P5, P6) */
  function addCage(B, H) {
    var P = B.paint, D = B.dark, s, i, x, z, CY = 1.44, XF = 2.83, XR = -2.62, Z0 = 0.86, Z1 = 2.30;
    for (s = -1; s <= 1; s += 2) {
      ybox(P, -2.05, 1.35, s * (H.SPH - 0.02), s * (H.SPH + 0.06), H.SPT + 0.02, H.DECK - 0.15);
      /* horizontal bars down the side, the posts, and the brackets back to the hull */
      for (z = Z0; z <= Z1 + 1e-6; z += 0.12) ybox(D, XR, XF, s * (CY - 0.012), s * (CY + 0.012), z - 0.012, z + 0.012);
      for (x = XR; x <= XF + 1e-6; x += (XF - XR) / 8) ybox(P, x - 0.025, x + 0.025, s * (CY - 0.02), s * (CY + 0.02), Z0 - 0.02, Z1 + 0.02);
      for (i = 0; i < 4; i++) {
        x = -1.9 + i * 1.2;
        ybox(D, x - 0.02, x + 0.02, s * H.SPH, s * CY, Z1 - 0.06, Z1 - 0.02);
        ybox(D, x - 0.02, x + 0.02, s * H.SPH, s * CY, Z0 + 0.04, Z0 + 0.08);
      }
    }
    /* the front and rear faces of the cage */
    for (z = Z0; z <= 1.88 + 1e-6; z += 0.12) {
      box(D, XF - 0.012, XF + 0.012, -CY, CY, z - 0.012, z + 0.012);
    }
    for (z = Z0; z <= Z1 + 1e-6; z += 0.12) box(D, XR - 0.012, XR + 0.012, -CY, CY, z - 0.012, z + 0.012);
    for (i = -2; i <= 2; i++) {
      box(P, XF - 0.025, XF + 0.025, i * 0.70 - 0.025, i * 0.70 + 0.025, Z0 - 0.02, 1.90);
      box(P, XR - 0.025, XR + 0.025, i * 0.70 - 0.025, i * 0.70 + 0.025, Z0 - 0.02, Z1 + 0.02);
      /* the front cage's top rails back to the side cage's top (P5) */
      belt(D, XF, 1.88, 2.10, Z1, i * 0.70 - 0.012, i * 0.70 + 0.012, 0.025);
      box(D, H.NOSE, XF, i * 0.70 - 0.015, i * 0.70 + 0.015, 1.05, 1.09);
    }
    for (s = -1; s <= 1; s += 2) belt(P, XF, 1.90, 2.10, Z1 + 0.02, s * CY - 0.025, s * CY + 0.025, 0.05);
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
  function addRunning(B, G, H) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], TO = 0.045, TW = G.TW;
    for (i = 0; i < G.XW.length; i++) C.push([G.XW[i], G.ZW, G.RW + TO]);
    C.push([G.IDL.x, G.IDL.z, G.IDL.r + TO], [G.SPR.x, G.SPR.z, G.SPR.r + TO]);
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
    cnt = Math.round(tot / 0.14); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.04);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the shoes with their rubber pads and the centre guide horns */
        belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - TW - 0.01, y + TW + 0.01, 0.06);
        belt(B.dark, px - dx * 0.025 - dz * 0.05, pz - dz * 0.025 + dx * 0.05, px + dx * 0.025 - dz * 0.05, pz + dz * 0.025 + dx * 0.05, y - 0.025, y + 0.025, 0.045);
      }
      /* the toothed drive sprocket at the FRONT (P1, P2) */
      cylY(B.dark, G.SPR.x, y - 0.10, y + 0.10, G.SPR.z, G.SPR.r - 0.04, 18);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [G.SPR.x + ca * (G.SPR.r - 0.02), y, G.SPR.z + sa * (G.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.035, 0.09, 0.025);
      }
      cylY(B.paint, G.SPR.x, y + s * 0.10, y + s * 0.15, G.SPR.z, 0.15, 14);
      cylY(B.dark, G.SPR.x, y + s * 0.15, y + s * 0.18, G.SPR.z, 0.06, 10);
      /* the idler at the rear, raised (P1) */
      [-0.09, 0.09].forEach(function (dy) { cylY(B.paint, G.IDL.x, y + dy - 0.06, y + dy + 0.06, G.IDL.z, G.IDL.r, 18); });
      cylY(B.dark, G.IDL.x, y - 0.03, y + 0.03, G.IDL.z, G.IDL.r - 0.05, 14);
      cylY(B.dark, G.IDL.x, y + s * 0.15, y + s * 0.19, G.IDL.z, 0.07, 10);
      /* the hull's swing-arm bosses ahead of each wheel (trailing arms) */
      for (i = 0; i < G.XW.length; i++) cylY(B.dark, G.XW[i] + 0.20, s * (G.TY - G.TW - 0.08), s * (G.TY - G.TW - 0.01), G.ZW + 0.10, 0.06, 8);
    }
  }
  /* road wheel (P1, P2): dual rubber-tyred discs either side of the guide horns, the dished
     face with the bolt circle and hub; axle along Y, both sides */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14];
  function addWheel(W, G, base) {
    var s, y, i, a, dy, RW = G.RW, c = base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.1, gg * 1.1, bb * 1.1], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (dy = -1; dy <= 1; dy += 2) {
        var yc = y + dy * 0.10;
        W.col = TYRE;
        cylY(W, 0, yc - 0.07, yc + 0.07, 0, RW, 18);
        W.col = BODY;
        cylY(W, 0, yc - 0.075, yc + 0.075, 0, RW - 0.045, 18);
      }
      var yf = y + s * 0.175;
      W.col = BODY;
      cyl(W, [0, yf, 0], [0, yf + s * 0.02, 0], RW - 0.045, RW * 0.5, 20);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        var bx = Math.cos(a) * RW * 0.62, bz = Math.sin(a) * RW * 0.62;
        box(W, bx - 0.014, bx + 0.014, Math.min(yf + s * 0.012, yf + s * 0.024), Math.max(yf + s * 0.012, yf + s * 0.024), bz - 0.014, bz + 0.014);
      }
      W.col = RIB;
      cylY(W, 0, yf + s * 0.015, yf + s * 0.045, 0, RW * 0.32, 12);
      W.col = HOLE;
      cylY(W, 0, yf + s * 0.045, yf + s * 0.06, 0, 0.035, 8);
    }
  }

  /* ------------------------------------------------- CVR(T) turret (Mk 1 / Mk 2) */
  /* local: origin on the ring at the deck (Mk 1 X -1.06, Z 1.49), +X forward.  Sections from
     D1's side view [x, roof z, base / waist / roof half widths]; the waist at 0.39 of the
     height (D1 front view); the front narrows (D1 3/4 view) */
  var TS = [[-1.02, 0.55, 0.78, 0.86, 0.74], [-0.95, 0.60, 0.83, 0.935, 0.815], [0.54, 0.60, 0.83, 0.935, 0.815],
            [1.01, 0.26, 0.64, 0.72, 0.58]];
  function tsec(r) {
    var zm = 0.39 * r[1];
    return [[r[0], -r[2], 0], [r[0], r[2], 0], [r[0], r[3], zm], [r[0], r[4], r[1]], [r[0], -r[4], r[1]], [r[0], -r[3], zm]];
  }
  var GZL = 0.31;               /* gun axis above the deck (D1: 1.80 m) */
  function addTurret(B, V) {
    var P = B.paint, D = B.dark, s, i, x, y, l23 = V.top === "l23";
    loftN(P, TS.map(tsec));
    /* the mantlet (D1 px 295-322: X -0.09..0.30, 1.59-1.95 m); the 76 mm's is bigger (D1 front) */
    if (l23) prismX(P, [[-0.28, 0.06], [0.28, 0.06], [0.28, 0.48], [-0.28, 0.48]], 0.92, 1.30);
    else prismX(P, [[-0.22, 0.10], [0.22, 0.10], [0.22, 0.44], [-0.22, 0.44]], 0.96, 1.36);
    box(D, 1.20, 1.36, 0.14, 0.20, GZL - 0.05, GZL + 0.01);       /* coaxial MG port, left */
    if (l23) {
      /* L23A1 76 mm: the short fat barrel, the muzzle ring (P2; D1 front view) */
      cylX(D, 1.30, 1.50, 0, GZL, 0.09, 0.08, 14);
      cylX(D, 1.50, 2.80, 0, GZL, 0.062, 0.058, 14);
      cylX(D, 2.80, 2.91, 0, GZL, 0.075, 0.075, 14);
    } else {
      /* L21 RARDEN 30 mm: the sleeve, the thin barrel, the slotted flash hider; muzzle at the
         published gun-forward length (X 2.585, local 3.645) */
      cylX(D, 1.36, 1.91, 0, GZL, 0.058, 0.052, 12);
      cylX(D, 1.91, 3.53, 0, GZL, 0.032, 0.030, 10);
      cylX(D, 3.53, 3.645, 0, GZL, 0.045, 0.045, 10);
      for (i = 0; i < 2; i++) box(D, 3.55 + i * 0.05, 3.57 + i * 0.05, -0.05, 0.05, GZL - 0.008, GZL + 0.008);
    }
    /* roof: the commander's cupola LEFT with its periscope ring and sight (D1 front view);
       the gunner's hatch RIGHT and his sight box ahead of it */
    var cx = -0.15, cy = 0.42;
    cylZ(P, cx, cy, 0.58, 0.68, 0.30, 18);
    for (i = 0; i < 7; i++) {
      var pa = i / 7 * TAU;
      box(D, cx + Math.cos(pa) * 0.26 - 0.035, cx + Math.cos(pa) * 0.26 + 0.035, cy + Math.sin(pa) * 0.26 - 0.035, cy + Math.sin(pa) * 0.26 + 0.035, 0.66, 0.72);
    }
    cylZ(P, cx, cy, 0.68, 0.72, 0.22, 14);
    box(P, cx + 0.12, cx + 0.32, cy - 0.10, cy + 0.10, 0.60, 0.78);
    box(D, cx + 0.32, cx + 0.33, cy - 0.07, cy + 0.07, 0.66, 0.75);
    box(P, -0.55, -0.15, -0.62, -0.22, 0.58, 0.65);
    box(P, 0.12, 0.40, -0.52, -0.30, 0.55, 0.74);
    box(D, 0.40, 0.41, -0.49, -0.33, 0.62, 0.71);
    /* smoke banks at the turret's front top corners, four tubes each, firing forward and out
       (D1 front and side views: X -0.71..-0.42) */
    for (s = -1; s <= 1; s += 2) {
      box(D, 0.35, 0.68, s * 0.66 - 0.10, s * 0.66 + 0.10, 0.44, 0.50);
      for (i = 0; i < 4; i++) {
        x = 0.40 + (i % 2) * 0.13; y = s * (0.60 + ((i / 2) | 0) * 0.12);
        cyl(D, [x, y, 0.50], [x + 0.10, y + s * 0.06, 0.62], 0.035, 0.035, 8);
      }
    }
    /* the turret rear bin (P3, D1) and the antenna bases */
    box(P, -1.24, -1.00, -0.72, 0.72, 0.08, 0.46);
    box(D, -1.25, -1.24, -0.68, 0.68, 0.40, 0.42);
    cylZ(D, -0.85, 0.68, 0.58, 0.70, 0.035, 8);
    cylZ(D, -0.85, -0.68, 0.58, 0.70, 0.035, 8);
    /* team colour: two strips on the roof rear */
    box(B.team, -0.85, -0.62, -0.62, -0.18, 0.60, 0.615);
    box(B.team, -0.85, -0.62, 0.05, 0.40, 0.60, 0.615);
    if (V.cage) {
      /* Mk 2: the bar cage round the turret sides and rear (P5, P6) */
      for (s = -1; s <= 1; s += 2) {
        for (i = 0; i < 5; i++) { var bz = 0.05 + i * 0.12; ybox(D, -1.20, 0.80, s * 1.05, s * 1.075, bz - 0.012, bz + 0.012); }
        for (i = 0; i < 4; i++) { x = -1.15 + i * 0.63; ybox(P, x - 0.02, x + 0.02, s * 1.04, s * 1.085, 0.02, 0.56); ybox(D, x - 0.015, x + 0.015, s * 0.90, s * 1.05, 0.30, 0.33); }
      }
      for (i = 0; i < 5; i++) box(D, -1.32, -1.30, -1.06, 1.06, 0.05 + i * 0.12 - 0.012, 0.05 + i * 0.12 + 0.012);
    }
  }
  /* a convex prism: profile in the YZ plane, from x0 to x1 */
  function prismX(bin, pts, x0, x1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }

  /* --------------------------------------------- Striker: commander's station */
  function addStrikerTop(B, H) {
    var P = B.paint, D = B.dark, i, cx = 0.30, cy = 0.20, z = H.DECK;
    /* the cupola with its periscopes and the GPMG (D2, P4; published L7 GPMG) */
    cylZ(P, cx, cy, z, z + 0.18, 0.34, 18);
    for (i = 0; i < 7; i++) {
      var pa = i / 7 * TAU;
      box(D, cx + Math.cos(pa) * 0.30 - 0.035, cx + Math.cos(pa) * 0.30 + 0.035, cy + Math.sin(pa) * 0.30 - 0.035, cy + Math.sin(pa) * 0.30 + 0.035, z + 0.14, z + 0.22);
    }
    cylZ(P, cx, cy, z + 0.18, z + 0.24, 0.26, 14);
    box(D, cx - 0.10, cx + 0.30, cy - 0.04, cy + 0.04, z + 0.26, z + 0.34);
    cylX(D, cx + 0.30, cx + 0.85, cy, z + 0.31, 0.022, 0.022, 8);
    box(D, cx - 0.02, cx + 0.02, cy - 0.02, cy + 0.02, z + 0.22, z + 0.28);
    /* the missile sight block beside it (P4) */
    box(P, cx - 0.15, cx + 0.20, -0.45, -0.15, z, z + 0.28);
    box(D, cx + 0.20, cx + 0.21, -0.42, -0.18, z + 0.10, z + 0.24);
    /* the radio antenna bases at the roof rear */
    cylZ(D, -1.0, 0.75, z, z + 0.12, 0.035, 8);
    cylZ(D, -1.0, -0.75, z, z + 0.12, 0.035, 8);
  }
  /* Striker's bin: in the podelev frame, hinge at its rear lower edge, +X forward; five
     Swingfire side by side (published "five missiles in a ready-to-fire bin") */
  var BIN = { L: 1.45, HW: 0.85, H: 0.38 };
  function addBin(B) {
    var P = B.paint, D = B.dark, i, y, cells = [];
    box(P, 0, BIN.L, -BIN.HW, BIN.HW, 0.02, BIN.H);
    /* the lid's ribs and the front face with the five tube mouths */
    for (i = 0; i < 4; i++) box(P, 0.15 + i * 0.38, 0.19 + i * 0.38, -BIN.HW, BIN.HW, BIN.H, BIN.H + 0.03);
    box(D, BIN.L, BIN.L + 0.01, -BIN.HW + 0.04, BIN.HW - 0.04, 0.05, BIN.H - 0.03);
    for (i = 0; i < 5; i++) {
      y = -0.68 + i * 0.34;
      cylX(P, BIN.L, BIN.L + 0.03, y, 0.20, 0.10, 0.10, 12);
      cylX(D, BIN.L + 0.03, BIN.L + 0.035, y, 0.20, 0.075, 0.075, 12);
      cells.push([BIN.L + 0.035, y, 0.20, 0.0]);
    }
    /* the hinge knuckles and the elevating ram's head */
    cylY(D, 0, -BIN.HW + 0.05, -BIN.HW + 0.25, 0.02, 0.04, 8);
    cylY(D, 0, BIN.HW - 0.25, BIN.HW - 0.05, 0.02, 0.04, 8);
    box(D, 0.70, 0.85, -0.08, 0.08, -0.02, 0.02);
    box(B.team, 0.45, 0.95, -0.30, 0.30, BIN.H + 0.03, BIN.H + 0.045);
    return cells;
  }

  /* ------------------------------------------------- Stormer HVM launcher turret */
  /* local: origin on the ring at the roof; the sight body in the middle, the two banks of 2 x 2
     Starstreak tubes either side on the trunnion (P7, P8) */
  var HV = { TZ: 0.72, TUBE: 1.45, TR: 0.075, BY: 0.56 };
  function addHvmTurret(B) {
    var P = B.paint, D = B.dark, i, s;
    cylZ(P, 0, 0, 0, 0.12, 0.62, 20);
    cylZ(D, 0, 0, 0.12, 0.15, 0.55, 18);
    /* the sight body: a tall box with the sight window forward, the hoop guards on top */
    prismX(P, [[-0.32, 0.15], [0.32, 0.15], [0.32, 0.92], [0.24, 1.00], [-0.24, 1.00], [-0.32, 0.92]], -0.55, 0.40);
    box(D, 0.40, 0.42, -0.20, 0.20, 0.60, 0.86);
    box(P, -0.45, -0.10, -0.18, 0.18, 1.00, 1.10);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 8; i++) {
        var a0 = i / 8 * Math.PI, a1 = (i + 1) / 8 * Math.PI, R = 0.48;
        belt(D, -0.08 - Math.cos(a0) * R, 0.80 + Math.sin(a0) * R, -0.08 - Math.cos(a1) * R, 0.80 + Math.sin(a1) * R, s * 0.14 - 0.015, s * 0.14 + 0.015, 0.03);
      }
    }
    /* team colour: strips on the sight body's roof */
    box(B.team, -0.42, -0.12, -0.30, -0.20, 1.00, 1.015);
    box(B.team, -0.42, -0.12, 0.20, 0.30, 1.00, 1.015);
    /* the trunnion arms out to the banks */
    for (s = -1; s <= 1; s += 2) ybox(D, -0.15, 0.15, s * 0.32, s * 0.40, HV.TZ - 0.10, HV.TZ + 0.10);
  }
  function addHvmPod(B) {
    var P = B.paint, D = B.dark, s, j, k, y, z, cells = [], x0 = -0.55, x1 = x0 + HV.TUBE;
    for (s = -1; s <= 1; s += 2) {
      /* the bank's frame, then four canisters, 2 x 2 */
      ybox(P, -0.30, 0.20, s * 0.40, s * 0.72, -0.20, 0.20);
      for (j = 0; j < 2; j++) for (k = 0; k < 2; k++) {
        y = s * (HV.BY + (j - 0.5) * 0.165); z = (k - 0.5) * 0.165;
        cylX(P, x0, x1, y, z, HV.TR, HV.TR, 14);
        cylX(D, x1, x1 + 0.01, y, z, HV.TR - 0.015, HV.TR - 0.015, 12);
        cylX(D, x0 - 0.01, x0, y, z, HV.TR - 0.015, HV.TR - 0.015, 12);
        cells.push([x1 + 0.01, y, z, x0]);
      }
      /* the clamp bands */
      [x0 + 0.25, x1 - 0.30].forEach(function (bx) { ybox(D, bx - 0.03, bx + 0.03, s * 0.39, s * 0.73, -0.17, 0.17); });
    }
    return cells;
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, vk) {
    var V = VARIANTS[vk], G = GEAR[V.gear], H = HULL[V.hull], T = materials(THREE, C, V.paint), g = new THREE.Group();
    var HB = bins(T), RB = bins(T), TB, i, wg, WB, tg, pg, cells;
    addHull(HB, V, H, G);
    if (V.cage) addCage(HB, H);
    if (V.top === "bin") addStrikerTop(HB, H);
    flush(THREE, g, HB);
    addRunning(RB, G, H);
    flush(THREE, g, RB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, G, SCHEMES[V.paint].base);
      wg = group(THREE, "roadwheel", G.XW[i], 0, G.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (V.top === "l23" || V.top === "rarden") {
      TB = bins(T); addTurret(TB, V);
      tg = group(THREE, "turret", H.TX, 0, H.DECK);
      flush(THREE, tg, TB);
      g.add(tg);
    } else if (V.top === "hvm") {
      TB = bins(T); addHvmTurret(TB);
      tg = group(THREE, "turret", H.TX, 0, H.DECK);
      flush(THREE, tg, TB);
      var PB = bins(T);
      cells = addHvmPod(PB);
      pg = group(THREE, "podelev", 0, 0, HV.TZ);
      flush(THREE, pg, PB);
      pg.userData.el = 0.35; pg.userData.cells = cells;
      tg.add(pg);
      g.add(tg);
    } else if (V.top === "bin") {
      /* turret:false: the bin's podelev is a child of the root, hinged at its rear edge on
         the roof; elevates 35 deg (published 622 mils) */
      var BB = bins(T);
      cells = addBin(BB);
      pg = group(THREE, "podelev", H.REAR + 0.12, 0, H.DECK + 0.03);
      flush(THREE, pg, BB);
      pg.userData.el = 35 * Math.PI / 180; pg.userData.cells = cells;
      g.add(pg);
      /* the bin's cradle on the roof */
      var CB = bins(T);
      box(CB.dark, H.REAR + 0.10, H.REAR + 0.20, -0.80, 0.80, H.DECK, H.DECK + 0.06);
      box(CB.dark, H.REAR + 0.85, H.REAR + 1.00, -0.10, 0.10, H.DECK, H.DECK + 0.03);
      flush(THREE, g, CB);
    }
    return g;
  }

  return { build: function (vk) { return function (THREE, M, C) { return build(THREE, M, C, vk); }; }, VARIANTS: VARIANTS };
})();

/* len: the measured X extent of each build */
UNIT_MODELS["gbr_e60_lighttank"] = { len: 4.80, build: HeroCvrt.build("scorpion") };
UNIT_MODELS["gbr_e80_lighttank"] = { len: 4.80, build: HeroCvrt.build("scorpion") };
UNIT_MODELS["gbr_e80_recon"] = { len: 4.99, build: HeroCvrt.build("scimitar") };
UNIT_MODELS["gbr_e90_lighttank"] = { len: 4.99, build: HeroCvrt.build("scimitar") };
UNIT_MODELS["gbr_e00_lighttank"] = { len: 5.50, build: HeroCvrt.build("scimitar2") };
UNIT_MODELS["gbr_e80_tankdestroyer"] = { len: 4.80, build: HeroCvrt.build("striker") };
UNIT_MODELS["gbr_e90_tankdestroyer"] = { len: 4.80, build: HeroCvrt.build("striker") };
UNIT_MODELS["gbr_e90_spaag"] = { len: 5.28, build: HeroCvrt.build("stormer") };
UNIT_MODELS["gbr_e00_spaag"] = { len: 5.28, build: HeroCvrt.build("stormer") };
