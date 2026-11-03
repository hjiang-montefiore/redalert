/* ============ pla_su76.js - HERO model: SU-76M light self-propelled gun (Soviet-supplied, PLA) ============
   Key: pla_e50_spg  "SU-76M self-propelled gun (Soviet-supplied)" (row service 1950, turret:true).
   Drawn as the SU-76M (GAZ SU-15M) of 1943-45 production as the PLA received it: the T-70
   derived hull lengthened by one road wheel, six small rubber-tyred road wheels a side on
   torsion bars, the FRONT drive sprocket, the rear idler identical to a road wheel, three
   return rollers; the engines and the driver up front under the long shallow upper glacis;
   the fighting compartment at the rear, open at the top and partly at the back, its plates
   sloped (front 25 deg, sides 25 deg, rear 20 deg); the 76.2 mm ZiS-3Sh in the front plate
   with its armoured cradle housing and the double-baffle muzzle brake.

   START: js/hero/pla_type63_apc.js / pla_t3485.js (their geometry kit, materials, flush and
   track wrap are copied).  All numbers below are new.

   NO LINE DRAWING of the SU-76 or SU-76M was found on Wikimedia Commons (searched "SU-76M",
   "SU-76 drawing / scheme / svg", "SU-76M nva", "intitle:SU-76", "intitle:SU-76 filemime:svg",
   cyrillic titles).  The model is therefore measured from three oblique side photographs by
   fitting a one-dimensional perspective (projective) map to the six road-wheel hubs of each,
   which assumes the six wheels are EVENLY spaced: that fit leaves at most 6 px of residual in
   P1 and 3.4 px in P2 and P3 (a fit with a wide middle gap is worse), so even spacing is taken.
   Every feature in the hull side plane is then read off in "wheel pitches" from the front
   wheel, and the three photographs averaged.  Heights are read as fractions between the ground,
   the fender and the casemate top, which the three photographs give alike to 0.02.  The metres
   come from the PUBLISHED figures, not from the photographs (see below).

   References (Wikimedia Commons, cached in scratchpad/q_pla_e50_spg_ref):
     P1  "SU-76M '76' - Patriot Museum, Kubinka (38319060981).jpg" (1920 px) - starboard side,
         front right 3/4, nose right.  Hubs x 297, 455, 610, 807, 1020, 1265 (rear to front);
         the rear idler hub 148, the toothed front sprocket hub 1478, three return rollers
         365 / 690 / 1090.  Shows: the six wheels (light dished disc, black tyre, hub with a
         nut and bolt ring), the idler like a road wheel and raised, the sprocket with its
         separate toothed ring and a hole in the disc, the fender over the track, the
         vertical upper hull side, the casemate's 25 deg sides, the gun's box cradle housing
         standing proud of the front plate with the curved mantlet drum behind it, the long
         tube and the double-baffle brake with two windows a side, the travel lock A-frame on
         the glacis, the long box on the right fender ahead of the casemate with a grille strip
         along its top, the box with vertical louvres on the right rear fender, the drooping
         front mudguard flaps, a fender strut.  (Star and number not drawn.)
     P2  "SU-76M at the Museum on Sapun Mountain Sevastopol 1.jpg" (960 px) - port side, front
         left 3/4, nose left: hubs 421, 531, 626, 707, 774, 833; sprocket 300, idler 888,
         rollers 493 / 669 / 807; the casemate side from 621 to 874 px, its front plate's foot
         at 564 px; four diagonal fender struts on the port side (469, 583, 717, 821 px);
         the travel lock; the upper glacis and the flaps.
     P3  "Su-76M MWP 01.jpg" (960 px) - port side, front left 3/4: hubs 364, 486, 584, 665,
         736, 795; sprocket 214, idler 862, rollers 448 / 632 / 773; the casemate side from
         623 to 841 px; the headlamp on the left front of the glacis.
     P4  "SU-76M MPTW 02.jpg" (960 px) - dead ahead: the widths.  Over the front mudguard flaps
         80..830 px = the published 2.72 m (0.00363 m a px in the nose plane); the tracks
         about 95 px (0.34 m; published 300 mm); track centres 600 px apart (2.18 m); the lower
         hull 205..715 px (1.85 m) between the tracks; the casemate 0.38 m narrower each side at
         its top than at its foot (its sides at 25 deg, as published); the gun's housing 0.38 m
         wide and tall, its centre 30-35 px LEFT of the hull's centre line (0.10-0.12 m); the
         big rounded driver's hatch on the centre line of the upper glacis; the rectangular
         access panel on the right of the lower glacis with two handles; two tow hooks on the
         lower nose plate 0.57 m either side of the centre.
     P5  "SU-76M in the CPLA Tank Museum 20131004.JPG" (960 px) - a PLA vehicle in Beijing,
         front left 3/4: the headlamp on the LEFT, the glacis hatch, the casemate's sloped
         rear top corner, the plain left fender with its struts.  (Number not drawn.)
     P6  "SU-76M (4535924027).jpg" (Bovington, 960 px) - front right 3/4: the grille panel on
         the right of the glacis (engine on the right), the box and the louvred box on the
         right fender, the brake's two windows.
     P7  "SU-76M at the Museum on Sapun Mountain Sevastopol 2.jpg" - port rear: the port rear
         fender is plain (the louvred box is on the right only), the fender struts.
   Published: en.wikipedia "SU-76" (Chubachin 2009): SU-76M 4.97 x 2.72 x 2.10 m, 10.5 t,
   clearance 0.30 m, ZiS-3 mod. 1942, -5..+15 deg elevation, 15 deg left and right traverse;
   "open at the top and partly behind"; late series: "a higher rear armor plate ... with two
   firing ports and a larger door".  ru.wikipedia "SU-76": upper front 25 mm at 60 deg, lower
   front 35 mm at 30 deg, hull sides 15 mm vertical; hull rear upper 20 deg, middle 0, lower
   30 deg; casemate front 25 deg, sides 25 deg, rear 20 deg; track 300 mm; 41.6 calibre
   barrel; "six road wheels of small diameter a side, ... the drive sprockets at the front, the
   idlers identical to the road wheels"; the engines right of the centre line, the driver in
   the bow.  ru.wikipedia "T-70": road wheels 550 mm with rubber tyres, three return rollers,
   sprockets with removable toothed rims.

   THE SCALE: the published 4.97 m is taken as the length over the tracks (idler to sprocket,
   the track wrapped round them); with the measured layout in pitches (idler 1.17 pitch behind
   the rear wheel, sprocket 0.88 ahead of the front wheel, mean of P1-P3) that makes the wheel
   pitch 0.615 m: the 550 mm wheels then stand 65 mm apart, which P2 shows (the tyres all but
   touch).  Heights: fender 1.02 m, hull deck 1.43 m, casemate top 2.10 m (published height),
   ground to fender and fender to deck in the photographs' ratio (P1 0.96 / 0.40, P2 0.97 /
   0.38).  Measured in pitches and turned into metres this way (x from the front wheel):
   sprocket +0.88 (P1 0.76, P2 0.89, P3 1.00), idler -6.17 (6.13, 6.06, 6.33), return rollers
   -0.65 / -2.55 / -4.57 (P1-P3 agree to 0.07), the casemate side's rear edge -5.80 (P2 5.77,
   P3 5.89), its front plate's foot -1.20 (P2 1.32, P3 1.14), the port struts -0.5 / -1.6 /
   -3.2 / -4.9; the right fender's long box -0.62..-2.87 and louvred box -3.87..-6.4 (P1);
   the glacis' top edge -0.25 (P2); sprocket hub 0.38-0.40 m above the wheel axles (P1, P2),
   the idler hub about 0.37 (P1); the return rollers' centres 0.72 / 0.75 of the way from the
   ground to the fender (P1 / P2).

   CORRECTIONS against the generic model (armour_specs "casemate", 6.6 m long, the gun at the
   back pointing aft, a closed box casemate over the whole hull, christie wheels): the SU-76M is
   5 m over the tracks; the gun points FORWARD from the front plate of an OPEN-topped fighting
   compartment over the rear half of the hull; the front half is the engine deck and the long
   shallow upper glacis; six small 550 mm wheels at a 0.615 m pitch with three return rollers,
   the sprocket at the front, the raised rear idler identical to a road wheel; the track 300 mm
   wide; the fenders flat at 1.02 m with drooping front flaps; casemate 2.10 m.

   Recognition list (what makes it read at game zoom, and its source):
     1. the open-topped, open-backed box at the rear with sides leaning in - P1, P2, P3, P5
     2. the gun's box housing and long 76 mm tube with the double-baffle brake, forward - P1, P2
     3. the low engine deck and long shallow glacis ahead of it - P1, P2, P4
     4. six small evenly spaced wheels, three return rollers, front sprocket, raised idler - P1-P3
     5. flat fenders with diagonal struts and drooping front flaps - P1-P5
     6. the boxes on the right fender (long box ahead, louvred box aft) - P1, P6
     7. the headlamp on the left of the glacis, the big round-cornered hatch on it - P3, P4, P5
     8. the travel lock A-frame on the glacis - P1, P2
   Paint: the PLA set's green as in pla_t3485.js (#505a39); P5 (the PLA vehicle, indoors) is
   a dark worn green.  No stars, numbers, slogans or museum markings (P1 carries a red star and
   "76", P5 "176": none drawn).

   NOT CONFIRMED, judgement calls: the wheel pitch (from the published length and the measured
   layout, not measured directly: the photographs' own wheel-ellipse widths scatter from 0.6 to
   0.8 m, see above); EVEN wheel spacing (from the fit's residuals); the hull's nose and tail
   positions (nose 0.15 m ahead of the sprocket hub, tail 0.22 m behind the idler hub, from
   the photographs' proportions; the hull plates then span 4.70 m inside the 4.97 m over the
   tracks); the nose joint height (0.95 m, from the published 60 deg glacis run to the measured
   glacis top); the casemate's plan (front foot 0.88 m ahead of mid-hull, rear 1.95 m behind;
   these are side-plane points and carry about 0.15 m of parallax); the rear plate's height
   (1.90 m; en.wiki: "partly open behind", the late higher plate) and its door outline; the
   sloped rear top corner of the sides (P5); the gun's housing length (0.72 m) and the exposed
   tube and brake (1.44 m), from the housing-to-tube ratio in P2 / P3 (2.05 : 1) - so the
   muzzle at 2.86 m ahead of mid-hull is ESTIMATED (no published length with the gun was
   found); the gun axis height (1.82 m, P2); the drum's radius (0.28 m); the breech and cradle
   inside the compartment (drawn plain: no view into the compartment); the sprocket's tooth
   count (13); the right fender boxes' depth outward (to 1.22 / 1.30 m) and the louvre count;
   the travel lock's position on the glacis; the access panel and hatch sizes; the track link
   pitch (0.118 m).  NOT DRAWN: crew, ammunition racks, the anti-aircraft MG tubes (en.wiki; only one
   ambiguous fitting in P1), radio aerial, tools, tow cable, spare track, exhausts (not seen).

   TURRET: the gun mount is the node "turret".  In reality it traverses only 15 deg either side
   inside the fixed fighting compartment (en.wiki); the engine trains the node like any turret.
   It holds the curved mantlet drum, the cradle housing, the tube and brake, and the breech and
   cradle behind the front plate; origin on the mount's pivot at the hull deck (x 0.70,
   y +0.10 - the gun sits 0.10 m left of the centre line, P4 - z 1.43), gun along +X.
   Nodes: "turret", six "roadwheel" groups (axle along local Y, both sides).
   Materials: PAINT (canvas texture: base, mottling, weld seams, grime; metre UVs), DARK
   (track, fittings, louvres, grille, bore, brake windows), WHEEL (road wheels, the idlers and
   the return rollers by vertex colour), and the team colour exactly as handed in (C.team): two small plates (the
   top rear lip of each casemate side) and one on the engine deck.
   Draw calls: hull 3 + idlers and return rollers 1 + turret 2 + 6 wheels = 12; 18980 triangles.
   Size as built: 5.37 m long (the idler's track wrap at -2.51 to the muzzle at +2.86; 4.97 m
   over the tracks as published), 2.72 m over the fenders (published 2.72), 2.11 m to the
   casemate top (published 2.10).
   Model space +X front, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSu76 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ---------------------------------------------------------- dimensions */
  var P = 0.615;                                  /* wheel pitch, m (see THE SCALE) */
  var XW6 = 1.615;                                /* front road wheel */
  function px(t) { return XW6 - t * P; }          /* pitches behind the front wheel -> x */
  var XW = [px(5), px(4), px(3), px(2), px(1), px(0)];
  var ZW = 0.315, RW = 0.275;                     /* 550 mm wheels on a 40 mm track */
  var SPR = { x: px(-0.88), z: 0.69, r: 0.25 }, IDL = { x: px(6.17), z: 0.68, r: RW };
  var ROL = [px(0.65), px(2.55), px(4.57)], ZR = 0.78, RR = 0.09;
  var TY = 1.10, TW = 0.15;                       /* track centre and half width (P4, 300 mm) */
  /* hull: nose and tail plates, belly, nose joint, deck, glacis top, half width, fender */
  var NOSE = SPR.x + 0.145, TAIL = IDL.x - 0.22, ZB = 0.30, NZ = 0.95, DECK = 1.43;
  var T60 = Math.tan(60 * Math.PI / 180), T30 = Math.tan(30 * Math.PI / 180), T20 = Math.tan(20 * Math.PI / 180);
  var T25 = Math.tan(25 * Math.PI / 180);
  var XG = NOSE - (DECK - NZ) * T60;              /* glacis top edge, 1.47 (P2 1.77-0.25P = 1.46) */
  var WH = 0.93, FZ = 1.02, FW = 1.36;            /* hull side, fender height, fender edge */
  var FX0 = TAIL - 0.04, FX1 = NOSE - 0.10;       /* fender ends */
  /* fighting compartment: front plate foot, top, rear; half widths at foot and top */
  var CF = px(1.20), CT = 2.10, CR = px(5.80), CW0 = WH, CW1 = WH - (CT - DECK) * T25, CRZ = 1.90;
  var CFT = CF - (CT - DECK) * T25;               /* front plate's top edge */
  /* the gun mount (turret node): pivot, gun axis above the deck, muzzle */
  var GX = 0.70, GY = 0.10, GZ = 1.82 - DECK, MUZ = 2.86 - GX;
  var PAINT = { base: "#505a39", blots: ["#465031", "#5a6441"], seed: 76 };

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var cr = cross(sub(b, a), sub(c, a));
    if (dot(cr, cr) < 1e-14) return;
    var f = unit(cr), v = [a, b, c], n = [na || f, nb || f, nc || f];
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
  function hexa(bin, P8) { solid(bin, P8, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* an oriented slab: centre c, half sizes along unit axes u, v, w */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var Q = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      Q.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, Q);
  }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a plate between any four corners (a quad) with thickness th along its normal */
  function quadPlate(bin, a, b, c, d, th) {
    var n = unit(cross(sub(b, a), sub(d, a))), h = mul(n, th / 2);
    hexa(bin, [sub(a, h), sub(b, h), sub(c, h), sub(d, h), add(a, h), add(b, h), add(c, h), add(d, h)]);
  }
  /* a convex planar polygon (corners in order) made a plate of thickness th */
  function polyPlate(bin, pts, th) {
    var n = unit(cross(sub(pts[1], pts[0]), sub(pts[pts.length - 1], pts[0]))), h = mul(n, th / 2), V = [], F = [], m = pts.length, i, j;
    for (i = 0; i < m; i++) V.push(sub(pts[i], h), add(pts[i], h));
    for (i = 0; i < m; i++) { j = (i + 1) % m; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < m - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a rod between two points */
  function rod(bin, A, B, r, seg) { cyl(bin, A, B, r, r, seg || 6); }
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }

  /* ----------------------------------------------------------- materials */
  var _tex;
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* hull paint: one tile is 1 / 0.34 = 2.9 m.  Base, soft mottling, weld seams with their
     bead highlight, rain streaks and grime */
  function paintTex(THREE) {
    if (_tex !== undefined) return _tex;
    _tex = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 7; i++) {                 /* weld seams / plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 3, w, 1); else q.fillRect(x + 3, y, 1, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and chipped wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
      _tex = new THREE.CanvasTexture(cv);
      _tex.wrapS = _tex.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) _tex.encoding = THREE.sRGBEncoding;
      _tex.anisotropy = 4;
    } catch (e) { _tex = null; }
    return _tex;
  }
  function materials(THREE, C) {
    var T = {}, tx = paintTex(THREE);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
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
  var BASE = (function () { var c = PAINT.base; return [parseInt(c.substr(1, 2), 16) / 255, parseInt(c.substr(3, 2), 16) / 255, parseInt(c.substr(5, 2), 16) / 255]; })();
  function tone(k) { return [BASE[0] * k, BASE[1] * k, BASE[2] * k]; }

  /* ---------------------------------------------------------------- hull */
  function glacisZ(x) { return NZ + (NOSE - x) / T60; }
  var UG = unit([-T60, 0, 1]), NG = unit([1, 0, T60]);          /* along / normal of the glacis */
  function onGlacis(x, y, h) { return add([x, y, glacisZ(x)], mul(NG, h || 0)); }
  function addHull(B) {
    var s, i, k, y, x;
    /* the hull: one width from belly to deck (P4: lower hull 1.85 m; the upper hull side is
       vertical above the fender, P1-P3).  Profile: lower rear plate 30 deg, vertical rear,
       upper rear 20 deg, flat deck, the 60 deg upper glacis to the nose joint, the lower nose
       plate at 30 deg back to the belly (ru.wiki) */
    var zr0 = 0.60, zr1 = 1.12;
    prismY(B.paint, [[TAIL + (zr0 - ZB) * T30, ZB], [NOSE - (NZ - ZB) * T30, ZB], [NOSE, NZ], [XG, DECK],
                     [TAIL + (DECK - zr1) * T20, DECK], [TAIL, zr1], [TAIL, zr0]], -WH, WH);

    for (s = -1; s <= 1; s += 2) {
      var yi = s * WH, yo = s * FW, ya = Math.min(yi, yo), yb = Math.max(yi, yo);
      /* the flat fender over the track, its outer lip turned down (P1-P5) */
      box(B.paint, FX0, FX1, ya, yb, FZ - 0.02, FZ + 0.01);
      box(B.paint, FX0, FX1, s > 0 ? FW - 0.02 : -FW, s > 0 ? FW : -FW + 0.02, FZ - 0.07, FZ);
      /* the front mudguard flap hanging forward and down from the fender's end (P1, P4) */
      belt(B.paint, FX1, FZ - 0.01, FX1 + 0.21, 0.63, ya + 0.01, yb - 0.01, 0.025);
      /* the rear fender end turned down a little (P7) */
      belt(B.paint, FX0, FZ - 0.01, FX0 - 0.06, FZ - 0.12, ya, yb, 0.02);
    }
    /* the diagonal fender struts, foot forward on the fender edge, head on the hull side:
       four on the port side (P2), two on the starboard side clear of its boxes (P1) */
    [[1, 1.31], [1, 0.63], [1, -0.35], [1, -1.40], [-1, 1.34], [-1, -0.45]].forEach(function (q) {
      var sg = q[0], xs = q[1];
      rod(B.dark, [xs + 0.13, sg * (FW - 0.05), FZ + 0.01], [xs - 0.10, sg * (WH + 0.01), FZ + 0.30], 0.014, 6);
      box(B.dark, xs - 0.13, xs - 0.07, sg > 0 ? WH : -WH - 0.02, sg > 0 ? WH + 0.02 : -WH, FZ + 0.27, FZ + 0.33);
    });

    /* --- the right (starboard) fender's two boxes (P1, P6): the long box ahead of the
       casemate with a grille strip along its top, the box with vertical louvres aft --- */
    var L0 = px(2.87), L1 = px(0.62);
    box(B.paint, L0, L1, -1.22, -WH + 0.005, FZ, DECK);
    box(B.dark, L0 + 0.04, L1 - 0.04, -1.20, -1.10, DECK, DECK + 0.012);
    box(B.paint, L0 + 0.10, L0 + 0.60, -1.08, -0.96, DECK, DECK + 0.02);
    box(B.dark, L1 - 0.30, L1 - 0.22, -1.223, -1.215, FZ + 0.18, FZ + 0.26);
    var R0 = FX0 + 0.08, R1 = px(3.87);
    box(B.paint, R0, R1, -1.30, -WH + 0.005, FZ, DECK - 0.01);
    for (i = 0; i < 26; i++) {
      x = R0 + 0.05 + i * (R1 - R0 - 0.10) / 25;
      box(B.dark, x - 0.012, x + 0.012, -1.315, -1.30, FZ + 0.04, DECK - 0.05);
    }
    box(B.paint, R0 - 0.01, R1 + 0.01, -1.31, -WH, DECK - 0.04, DECK - 0.005);

    /* --- the upper glacis (P4): the big round-cornered hatch on the centre line with its
       hinge, the access panel with two handles on the right of the lower glacis, the
       headlamp on the left (P3, P5), the travel lock A-frame (P1, P2) --- */
    var HV = [0, 1, 0];
    function along(x) { return (x - XG) / Math.cos(Math.atan(1 / T60)); }
    slab(B.paint, onGlacis(XG + 0.30, 0.0, 0.02), UG, HV, NG, 0.24, 0.24, 0.02);
    slab(B.paint, onGlacis(XG + 0.30, 0.0, 0.045), UG, HV, NG, 0.20, 0.20, 0.012);
    slab(B.dark, onGlacis(XG + 0.06, 0.0, 0.03), UG, HV, NG, 0.02, 0.18, 0.02);
    slab(B.dark, onGlacis(XG + 0.42, 0.0, 0.06), UG, HV, NG, 0.015, 0.06, 0.015);
    slab(B.paint, onGlacis(NOSE - 0.30, -0.52, 0.015), UG, HV, NG, 0.17, 0.33, 0.015);
    [-0.70, -0.34].forEach(function (yh) { slab(B.dark, onGlacis(NOSE - 0.28, yh, 0.04), UG, HV, NG, 0.05, 0.03, 0.02); });
    /* the grille panel on the right of the glacis behind the access panel (P6) */
    slab(B.dark, onGlacis(XG + 0.30, -0.58, 0.01), UG, HV, NG, 0.22, 0.26, 0.012);
    for (k = 0; k < 7; k++) slab(B.paint, onGlacis(XG + 0.12 + k * 0.06, -0.58, 0.022), UG, HV, NG, 0.008, 0.25, 0.006);
    /* headlamp on its bracket at the left front of the glacis */
    var hp = [1.70, WH - 0.05, glacisZ(1.70)];
    box(B.dark, hp[0] - 0.03, hp[0] + 0.03, hp[1] - 0.03, hp[1] + 0.03, hp[2], hp[2] + 0.11);
    cylX(B.paint, hp[0] - 0.05, hp[0] + 0.09, hp[1], hp[2] + 0.18, 0.085, 0.09, 14);
    cylX(B.dark, hp[0] + 0.09, hp[0] + 0.10, hp[1], hp[2] + 0.18, 0.075, 0.075, 14);
    /* the travel lock: an A-frame standing on the glacis, a cradle at its head under the tube */
    var xl = 1.92, zt = DECK + GZ - 0.09;
    for (s = -1; s <= 1; s += 2) rod(B.dark, [xl + 0.06, GY + s * 0.17, glacisZ(xl + 0.06) + 0.01], [xl, GY + s * 0.04, zt], 0.016, 6);
    box(B.dark, xl - 0.03, xl + 0.03, GY - 0.08, GY + 0.08, zt - 0.02, zt + 0.02);
    box(B.dark, xl - 0.02, xl + 0.02, GY - 0.08, GY - 0.05, zt, zt + 0.07);
    box(B.dark, xl - 0.02, xl + 0.02, GY + 0.05, GY + 0.08, zt, zt + 0.07);

    /* --- the lower nose (P4): two tow hooks and the central eye --- */
    for (s = -1; s <= 1; s += 2) {
      var zh = 0.62, xh = NOSE - (NZ - zh) * T30;
      box(B.dark, xh - 0.06, xh + 0.05, s * 0.57 - 0.05, s * 0.57 + 0.05, zh - 0.08, zh + 0.06);
      box(B.dark, xh + 0.02, xh + 0.08, s * 0.57 - 0.025, s * 0.57 + 0.025, zh - 0.16, zh - 0.04);
    }
    cylY(B.dark, NOSE - (NZ - 0.55) * T30 + 0.03, -0.12, 0.12, 0.55, 0.04, 8);

    /* --- engine deck between the casemate and the glacis: the team plate --- */
    box(B.team, CF + 0.14, CF + 0.34, 0.45, 0.75, DECK, DECK + 0.008);

    /* --- the rear hull below the compartment's open back: two tow hooks --- */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, TAIL - 0.08, TAIL + 0.02, s * 0.55 - 0.05, s * 0.55 + 0.05, zr0 + 0.02, zr0 + 0.14);
    }
  }

  /* -------------------------------------------- the open fighting compartment */
  /* four plates on the deck, open at the top: the front plate at 25 deg with the mount's
     opening, the sides leaning in at 25 deg, the lower rear plate at 20 deg with its door
     (ru.wiki, en.wiki); the sides' rear top corner cut down to the rear plate (P5) */
  function addCasemate(B) {
    var s, th = 0.03, k;
    var zc = CT, x0 = CF, x1 = CFT, xr = CR, xrt = CR + (CRZ - DECK) * T20, xc = xr + 0.20;
    for (s = -1; s <= 1; s += 2) {
      var yb = s * CW0, yt = s * CW1, yc = s * (CW0 - (CRZ - DECK) * T25);
      /* side: one plate from the front plate to the corner chamfer, then the chamfer piece */
      polyPlate(B.paint, [[x0, yb, DECK], [xr, yb, DECK], [xrt, yc, CRZ], [xc, yt, zc], [x1, yt, zc]], th);
      /* the top edge's stiffening lip */
      quadPlate(B.paint, [x1, yt, zc], [xc, yt, zc], [xc, yt - s * 0.05, zc - 0.005], [x1, yt - s * 0.05, zc - 0.005], 0.02);
      /* team colour: a short plate on the lip near the rear */
      box(B.team, xc + 0.05, xc + 0.40, Math.min(yt, yt - s * 0.05), Math.max(yt, yt - s * 0.05), zc - 0.004, zc + 0.012);
      /* the joint where the side meets the deck */
      box(B.dark, xr + 0.02, x0 - 0.02, s > 0 ? CW0 - 0.005 : -CW0 - 0.012, s > 0 ? CW0 + 0.012 : -CW0 + 0.005, DECK, DECK + 0.02);
    }
    /* the front plate: two side pieces and a strip above the mount's opening; the opening
       (0.66 m wide about the gun's pivot, P1/P4) is filled by the mount's drum */
    var w0 = GY - 0.33, w1 = GY + 0.33;
    function fz(x) { return DECK + (x0 - x) / T25; }
    function fy(z, side) { return side * (CW0 - (z - DECK) * T25); }
    quadPlate(B.paint, [x0, fy(DECK, 1), DECK], [x0, w1, DECK], [x1, w1, zc], [x1, fy(zc, 1), zc], th);
    quadPlate(B.paint, [x0, w0, DECK], [x0, fy(DECK, -1), DECK], [x1, fy(zc, -1), zc], [x1, w0, zc], th);
    var zo = DECK + 0.62, xo = x0 - (zo - DECK) * T25;
    quadPlate(B.paint, [xo, w0, zo], [xo, w1, zo], [x1, w1, zc], [x1, w0, zc], th);
    /* the rear plate, lower than the sides, with the door outline and its hinges */
    var yr = CW0 - 0.02;
    quadPlate(B.paint, [xr, -yr, DECK], [xr, yr, DECK], [xrt, yr - 0.17, CRZ], [xrt, -yr + 0.17, CRZ], th);
    var nR = unit([-1, 0, T20]), uR = unit([T20, 0, 1]);
    function onRear(z, y, h) { return add([xr + (z - DECK) * T20, y, z], mul(nR, h)); }
    slab(B.dark, onRear(DECK + 0.25, 0.0, 0.02), uR, [0, 1, 0], nR, 0.22, 0.30, 0.008);
    slab(B.paint, onRear(DECK + 0.25, 0.0, 0.028), uR, [0, 1, 0], nR, 0.20, 0.28, 0.01);
    [0.08, 0.40].forEach(function (zz) { slab(B.dark, onRear(DECK + zz, 0.30, 0.04), uR, [0, 1, 0], nR, 0.03, 0.05, 0.015); });
    /* the two firing ports' flaps either side of the door (en.wiki) */
    for (k = -1; k <= 1; k += 2) slab(B.paint, onRear(DECK + 0.30, k * 0.58, 0.025), uR, [0, 1, 0], nR, 0.06, 0.08, 0.012);
    /* the compartment floor (the hull deck, seen from above) */
    box(B.dark, xr + 0.04, x0 - 0.30, -CW0 + 0.05, CW0 - 0.05, DECK + 0.004, DECK + 0.014);
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(Pts) {                                   /* convex hull of 2D points, CCW */
    Pts = Pts.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < Pts.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], Pts[i]) <= 0) L.pop(); L.push(Pts[i]); }
    for (i = Pts.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], Pts[i]) <= 0) U.pop(); U.push(Pts[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  /* the track path: the convex hull of the wheels, idler and sprocket, then the upper run
     let down onto the three return rollers between the sprocket and the idler (P1-P3) */
  function trackPath() {
    var C = [], i, k, pts = [], out = [], tag;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.02, 0]);
    C.push([IDL.x, IDL.z, IDL.r + 0.02, 1], [SPR.x, SPR.z, SPR.r + 0.02, 2]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 32; k++) pts.push([C[i][0] + Math.cos(k / 32 * TAU) * C[i][2], C[i][1] + Math.sin(k / 32 * TAU) * C[i][2], C[i][3]]);
    pts = hull2(pts);
    for (i = 0; i < pts.length; i++) {
      out.push(pts[i]);
      var a = pts[i], b = pts[(i + 1) % pts.length];
      if (a[2] === 2 && b[2] === 1 && a[0] > b[0]) {         /* the long upper run, front to back */
        for (k = ROL.length - 1; k >= 0; k--) {
          var t = (ROL[k] - a[0]) / (b[0] - a[0]), zl = a[1] + (b[1] - a[1]) * t, zt = ZR + RR + 0.02;
          tag = Math.min(zl, zt);
          out.push([ROL[k] + 0.10, (zl * 0.6 + tag * 0.4), 3], [ROL[k], tag, 3], [ROL[k] - 0.10, (zl * 0.6 + tag * 0.4), 3]);
        }
      }
    }
    return out;
  }
  function addRunning(B, IB) {
    var pts = trackPath(), i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, xx, zz, s, y, step, cnt, dx, dz;
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    /* small cast links of about 0.12 m pitch (P1: fine links with a centre guide horn) */
    cnt = Math.round(tot / 0.118); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW + 0.01, y + TW - 0.01, 0.03);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        xx = a[0] + (b[0] - a[0]) * t; zz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, xx - dx * 0.05, zz - dz * 0.05, xx + dx * 0.05, zz + dz * 0.05, y - TW, y + TW, 0.04);
        if (k % 2 === 0) belt(B.dark, xx - dx * 0.025 - dz * 0.06, zz - dz * 0.025 + dx * 0.06, xx + dx * 0.025 - dz * 0.06, zz + dz * 0.025 + dx * 0.06, y - 0.02, y + 0.02, 0.07);
      }
      /* the front drive sprocket: disc with a hole, the separate toothed ring (13), the hub
         and its nut (P1) */
      cylY(B.paint, SPR.x, y - 0.10, y + 0.10, SPR.z, SPR.r - 0.06, 20);
      for (i = 0; i < 13; i++) {
        var ta = i / 13 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.paint, [SPR.x + ca * (SPR.r - 0.03), y, SPR.z + sa * (SPR.r - 0.03)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.035, 0.035, 0.028);
      }
      cylY(B.dark, SPR.x + 0.10, y + s * 0.10, y + s * 0.105, SPR.z + 0.05, 0.035, 8);
      cylY(B.paint, SPR.x, y + s * 0.10, y + s * 0.15, SPR.z, 0.09, 12);
      cylY(B.dark, SPR.x, y + s * 0.15, y + s * 0.18, SPR.z, 0.04, 6);
      /* the final drive housing between the sprocket and the hull side */
      cylY(B.paint, SPR.x, s * WH, y - s * 0.10, SPR.z, 0.12, 12);
      /* three small return rollers on stub axles (P1-P3, ru.wiki T-70) */
      for (i = 0; i < ROL.length; i++) {
        IB.col = [0.13, 0.135, 0.125];
        cylY(IB, ROL[i], y - 0.07, y + 0.07, ZR, RR, 14);
        IB.col = tone(1.12);
        cylY(IB, ROL[i], y + s * 0.07, y + s * 0.085, ZR, RR - 0.03, 12);
        IB.col = tone(0.9);
        cylY(IB, ROL[i], s * WH, y - s * 0.07, ZR, 0.03, 6);
      }
      /* the rear idler: a road wheel (ru.wiki), on its crank arm from the hull (P1, P2) */
      wheelAt(IB, IDL.x, IDL.z, y, s);
      box(B.dark, IDL.x - 0.02, IDL.x + 0.30, s > 0 ? WH : -WH - 0.04, s > 0 ? WH + 0.04 : -WH, IDL.z - 0.05, IDL.z + 0.05);
    }
  }

  /* road wheel (P1, P2): a black rubber tyre, a pressed dished disc with a raised ring, the hub
     cap with its bolt ring and the axle nut */
  var TYRE = [0.12, 0.125, 0.115];
  function wheelAt(W, x, z, y, s) {
    var i, a, BODY = tone(1.15), RIM = tone(1.3), HUB = tone(0.95);
    W.col = TYRE;
    cylY(W, x, y - 0.065, y + 0.065, z, RW, 22);
    W.col = BODY;
    cyl(W, [x, y + s * 0.065, z], [x, y + s * 0.075, z], RW - 0.04, RW - 0.05, 22, true);
    cyl(W, [x, y + s * 0.075, z], [x, y + s * 0.095, z], RW - 0.05, 0.11, 22);
    W.col = RIM;
    cyl(W, [x, y + s * 0.075, z], [x, y + s * 0.082, z], RW - 0.035, RW - 0.035, 22);
    cyl(W, [x, y + s * 0.083, z], [x, y + s * 0.088, z], 0.17, 0.17, 18);
    W.col = BODY;
    cyl(W, [x, y + s * 0.09, z], [x, y + s * 0.12, z], 0.085, 0.07, 12);
    W.col = HUB;
    for (i = 0; i < 6; i++) {
      a = i / 6 * TAU;
      cyl(W, [x + Math.cos(a) * 0.06, y + s * 0.11, z + Math.sin(a) * 0.06], [x + Math.cos(a) * 0.06, y + s * 0.125, z + Math.sin(a) * 0.06], 0.012, 0.012, 5);
    }
    cyl(W, [x, y + s * 0.12, z], [x, y + s * 0.15, z], 0.035, 0.03, 6);
    /* the inner face */
    W.col = BODY;
    cyl(W, [x, y - s * 0.065, z], [x, y - s * 0.075, z], RW - 0.04, 0.12, 16);
  }
  function addWheel(W) {
    for (var s = -1; s <= 1; s += 2) wheelAt(W, 0, 0, s * TY, s);
  }

  /* ------------------------------------------------------- the gun mount */
  /* turret frame: origin on the pivot at the deck, gun along +X, z above the deck.  The
     curved mantlet drum standing in the front plate's opening, the box housing over the
     recoil gear standing proud of it (P1, P2, P4), the tube, the double-baffle brake with
     two windows a side (P1, P6), the breech and cradle inside the compartment */
  function addGun(B) {
    var k, s, zt = CT - DECK - 0.04, HX0 = 0.10, HX1 = 0.72;
    /* the drum: a vertical cylinder segment, its top rolled back (P1) */
    cylZ(B.paint, 0, 0, 0.02, zt - 0.06, 0.28, 24);
    cyl(B.paint, [0, 0, zt - 0.06], [0, 0, zt], 0.28, 0.24, 24);
    /* the housing: 0.38 m wide and tall in P4, from the drum to 0.72 m ahead of the pivot */
    box(B.paint, HX0, HX1, -0.19, 0.19, GZ - 0.17, GZ + 0.21);
    box(B.paint, HX0, HX1 - 0.06, -0.17, 0.17, GZ + 0.21, GZ + 0.25);
    box(B.dark, HX1 - 0.25, HX1 - 0.05, 0.19, 0.195, GZ - 0.05, GZ + 0.15);
    box(B.dark, HX1 - 0.25, HX1 - 0.05, -0.195, -0.19, GZ - 0.05, GZ + 0.15);
    for (s = -1; s <= 1; s += 2) box(B.dark, HX0 + 0.10, HX1 - 0.10, s * 0.19 - 0.005, s * 0.19 + 0.005, GZ + 0.19, GZ + 0.205);
    /* the sight's port on the left of the housing */
    box(B.dark, HX0 + 0.22, HX0 + 0.28, 0.19, 0.22, GZ + 0.10, GZ + 0.15);
    /* the tube: collar, a long taper, the brake */
    cylX(B.paint, HX1, HX1 + 0.10, 0, GZ, 0.095, 0.09, 16);
    cylX(B.paint, HX1 + 0.10, MUZ - 0.42, 0, GZ, 0.068, 0.055, 16);
    cylX(B.paint, MUZ - 0.42, MUZ - 0.33, 0, GZ, 0.06, 0.06, 16);
    /* double-baffle brake: body, two baffles, the windows each side, the front face */
    cylX(B.paint, MUZ - 0.33, MUZ - 0.30, 0, GZ, 0.085, 0.085, 16);
    cylX(B.paint, MUZ - 0.30, MUZ, 0, GZ, 0.075, 0.075, 16);
    for (k = 0; k < 2; k++) {
      var xw = MUZ - 0.24 + k * 0.13;
      for (s = -1; s <= 1; s += 2) box(B.dark, xw, xw + 0.08, s > 0 ? 0.05 : -0.077, s > 0 ? 0.077 : -0.05, GZ - 0.045, GZ + 0.045);
      cylX(B.paint, xw + 0.08, xw + 0.11, 0, GZ, 0.085, 0.085, 16);
    }
    cylX(B.dark, MUZ - 0.002, MUZ + 0.003, 0, GZ, 0.04, 0.04, 10);
    /* inside: the cradle and breech, the gunner's handwheels, the shield behind the drum */
    box(B.paint, -0.95, -0.05, -0.15, 0.15, GZ - 0.14, GZ + 0.12);
    box(B.dark, -1.10, -0.95, -0.13, 0.13, GZ - 0.12, GZ + 0.10);
    box(B.paint, -0.50, -0.05, -0.15, -0.12, -0.02, GZ - 0.14);
    box(B.paint, -0.50, -0.05, 0.12, 0.15, -0.02, GZ - 0.14);
    cylY(B.dark, -0.45, 0.15, 0.22, GZ - 0.10, 0.08, 10);
    cylY(B.dark, -0.30, -0.22, -0.15, GZ - 0.06, 0.08, 10);
    box(B.paint, -0.08, -0.04, -0.30, 0.30, 0.02, zt - 0.10);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), HB = bins(T), TB = bins(T), IB, i, wg, WB, tg;
    IB = new Bin(T.wheel, false, true);
    addHull(HB);
    addCasemate(HB);
    addRunning(HB, IB);
    flush(THREE, g, HB);
    flush(THREE, g, { wheel: IB });
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addGun(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(GX, GY, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len: the measured X extent of the build (dump.js) */
UNIT_MODELS["pla_e50_spg"] = { len: 5.37, build: HeroSu76.build };
