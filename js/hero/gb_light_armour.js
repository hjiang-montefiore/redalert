/* ========== gb_light_armour.js - HERO models: British armoured carriers and armoured cars ==========
   One file, four modules (one per vehicle family):
     HeroFv430   gbr_e60_ifv            FV432 armoured personnel carrier (the box hull, five road wheels, the
                                        commander's cupola as the "turret", the rear door)
                 gbr_e60_spg            FV433 Abbot, the 105 mm turret at the back of the FV430 running gear
                 gbr_e60_tankdestroyer  FV438 Swingfire: the FV432 hull with the raised launcher box
     HeroWarrior gbr_e80_ifv            FV510 Warrior as fielded (six road wheels, the 30 mm RARDEN turret)
                 gbr_e90_ifv            the same with the Gulf-war applique panels on the hull sides
                 gbr_e00_ifv            the same in the TES fit: the add-on side armour, the lower skirt
                                        plates, the bar armour cages at the nose and the tail
     HeroAlvis6  gbr_e50_lighttank      FV601 Saladin, 6x6 with the 76 mm turret (engine at the BACK)
                 gbr_e50_ifv            FV603 Saracen, 6x6 APC with the small MG turret (engine at the FRONT)
     HeroDaimler gbr_e50_recon          Daimler Ferret Mk 2 scout car, 4x4, the small MG turret
                 gbr_e60_recon          FV721 Fox, 4x4 with the 30 mm RARDEN turret

   BUILT ON: js/hero/eu_tels_radars.js already draws an FV432/FV436 hull for the Cymbeline radar (HeroCymbeline).
   It was read and NOT reused: its hull is a single box prism with the front plate guessed from two 3/4 photographs
   (BOW 2.625, ROOF 1.88, wheel pitch 0.70 m, single road wheels); the side-on photograph F1 below gives a different
   glacis (one straight 58 deg plate from the nose to the roof), a roof 1.73 m up, a 0.66 m wheel pitch, two return
   rollers and DUAL road wheels (F3).  Its file is not edited.  The geometry kit (Bin, solid, box, slab, belt, cyl,
   prismY, prismX, loftN, the canvas paint, flush, the tracked running gear) is copied from js/hero/deu_recon.js,
   which copied it from js/hero/pla_type63_apc.js; "roadwheel" per axle or station and the "turret" group follow
   deu_recon.js.

   REFERENCES (Wikimedia Commons, fetched through commons.wikimedia.org/w/thumb.php, cached in
   scratchpad/q_gblt_ref; published figures from en.wikipedia raw, cached in scratchpad/q_gblt_wiki):
     F1  "GKN Sankey FV432 pic2.JPG" (fv_side.jpg) - FV432 from the LEFT, square on, nose left, 1600 px: the five
         dual road wheels, two return rollers, the toothed FRONT sprocket and the rear idler, the single straight
         glacis from the nose to the roof, the vertical side plate from the fender to the roof, the bins on the rear
         plate, the black box on the left front, the exhaust pipe along the left side with its silencer guard,
         rising up the rear corner.  Its roof carries an odd bracket (a museum fit): not drawn.
     F2  "GKN Sankey FV432 pic8.JPG" (fv_side2.jpg) - a Bulldog from the right, long lens: wheel pitch 1.08 D (F1
         1.06 D).  Its add-on armour is not drawn.
     F3  "FV432 RAF Duxford.jpg" - front left 3/4: the glacis with its access plate, the lamp clusters in grilled
         guards at the top corners, the dual road wheels.
     F4  "Houplines Char FV432.JPG" (fv_rear.jpg) - head on: the glacis 2.55 m wide over the hull, the lower nose
         plate narrowing to the belly, the lamps, the smoke dischargers at the top corners.
     F5  "GKN Sankey FV432 pic11.JPG" (fv_front.jpg) - front: the driver front RIGHT, the commander behind him,
         the engine grille on the left front of the roof, the box on the left.
     F6  "GKN Sankey FV432 pic1.JPG" (fv_34r.jpg) - front right 3/4: the glacis, the sprocket, the hull side.
     A1  "FV433 Abbot (55023472779).jpg" (ab_side3.jpg) - Abbot from the LEFT, long lens, a little from the front:
         heights at road wheel 3, the gun forward, the mesh baskets, the turret's tall square box with the canvas
         bin on its side.
     A2  "FV433 Abbot self-propelled 105mm gun pic-002.JPG" (ab_side.jpg) - Abbot from the RIGHT, square on but
         wide angle: the shallow front deck, the cupola and the second hatch on the turret, the turret's rear box,
         the rear plate and mudflap, the nose 0.78 D ahead of the sprocket.
     A3  "FV433 Abbot (55023472744).jpg" (ab_side2.jpg) - front right 3/4: the louvred engine deck on the front,
         the lamp clusters, the smoke dischargers on the turret front corners, the mesh baskets.
     S1  "FV438 Vehicle.JPG" - the only FV438 on Commons, a museum 3/4 from the left: the FV432 hull, the raised
         box over the rear of the roof, the sight on its mast, the round hatch outline on the hull side.
     W1  "FV510 Warrior IFV.jpg" (wa_side.jpg) - front left 3/4: the long glacis with the driver's hatch on its
         left, the engine grille on the right, the turret, the skirt plates, six road wheels.
     W2  "Warrior (3666150410).jpg" (wa_side2.jpg) - from the RIGHT, long lens, square on (front cut off): the
         heights at one station, the rear idler set high, the return rollers, the mesh baskets on the upper side,
         the bins on the rear corners.
     W3  "FV510 Warrior - side view.JPEG" (wa_gulf.jpg) - Gulf 1991, from the left, close: the applique panels
         bolted along the hull side, the wheel pitch pattern.
     W4  "Warrior Light Tank with Increased Armour MOD 45149018.jpg" (wa_tes.jpg) - TES Warrior from the left, long
         lens: the add-on armour in three rows of blocks on the upper side, the lower skirt plates, the bar armour
         cages at the nose and tail, the wheel pitch pattern.
     W5  "Warrior (3665533971).jpg" (wa_rear.jpg) - rear left 3/4: the rear door, the big bins on the rear
         corners, the long bins along the roof edge, the mudflaps.
     L1  "Saladin (3666495282).jpg" (sl_side2.jpg) - Saladin from the RIGHT, long lens, square on: the axle pitch
         1.45 D, the overhangs, the turret with the round bin on its rear, the stowage boxes on the hull sides,
         the front mudguards, the gun; the ground line is hidden behind a bank.
     L2  "Saladin (50122316861).jpg" (sl_side.jpg) - front right 3/4: the faceted hull, the turret with the
         smoke dischargers on its side, the headlamps on the front mudguards.
     L3  "Saladin (3666324684).jpg" (sl_rear.jpg) - rear left 3/4: the engine deck at the back.
     R1  "Port side of the Alvis Saracen at the Army Museum of WA September 2025.jpg" (sr_side.jpg) - Saracen
         from the LEFT, square on: the louvred bonnet in front (engine FRONT), the tall troop box, the small turret,
         the Bren ring at the back, the vision flaps, the triangular plates on the lower hull, the rear doors.
     R2  "Alvis Saracen picture-001.JPG" (sr_side2.jpg) - from the RIGHT: the same, the door on the other side.
     K1  "Daimler Ferret, Car, Scout, 4x4, FV700 Series.png" (fe_sheet.png) - Mick Bell's 1/76 four-view sheet
         (CC BY 4.0): the FV701(H) Mk 2/3 side and end views measured below.
     X1  "Fox Armoured Car CVR(W) FV721 pic1.JPG" (fx_side.jpg) - Fox from the LEFT, near square on: the low hull,
         the turret with the long RARDEN, the smoke dischargers, the rear engine grille, the exhaust silencer.
     X2  "FV721 Fox armoured fighting vehicle (2008-08-09).jpg" (fx_34.jpg) - front right 3/4.
   PUBLISHED (en.wikipedia infoboxes): FV432 5.25 x 2.55 x 2.28 m (FV430 page: width 2.8 m), "engine at the front
   and the driving position to the right.  Directly behind the driver's position is the vehicle commander's hatch.
   There is a large round opening in the passenger compartment roof ... and a (right hand) side-hinged door in the
   rear", "two three-barrel smoke dischargers at the front".  Abbot: length (gun forward) 5.8 m, 2.6 m, 2.5 m,
   "a fully rotating turret at the rear", 5 road wheels.  FV438: 5.1 x 3 x 2.7 m, two Swingfire launchers.
   Warrior: 6.3 x 3.03 x 2.8 m, "the driver, seated in the front hull and the gunner and commander in the
   turret", rear door.  Saladin: 4.93 x 2.54 x 2.39 m.  Saracen: 4.8 x 2.54 x 2.46 m.  Ferret: 3.7 x 1.91 x
   1.88 m, wheelbase 2.29 m, 9.00x16 tyres.  Fox: 5.08 x 2.13 x 2.2 m.

   SCALES - how the photographs were settled against the published figures (ratios read at ONE station each):
     FV430 family.  F1 square on: the overall length (nose tip to the rear bins) 1188 px; the wheel diameter D
       143 px; the pitch 1.06 D (F2 1.08 D).  At the published 5.25 m, 226 px/m: D 0.63 m, pitch 0.66-0.69 m, the
       roof 1.73 m (F1 at wheel 3: 2.69 D).  With the cupola and its GPMG the drawn top is 2.25 m against the
       published 2.28 m, so the two published figures agree at that scale.  F4 head on: hull 2.55 m over the
       glacis, tracks to 2.80 m: both published widths are drawn (hull 2.55, over tracks 2.80).
       Abbot (A1 at road wheel 3, long lens): the hull deck 2.5 D, the guard 1.6 D, the turret roof 3.85 D: at the
       FV432's D (shared running gear) 1.60 / 1.03 / 2.45 m against the published 2.5 m.  A1 gives muzzle to rear
       plate 9.16 D = 5.84 m at that D: the published "5.8 m gun forward" agrees.  The Abbot hull is then 4.95 m
       long, so the "hull 5.709 m" sometimes quoted is NOT drawn.
       FV438 (S1, 3/4): the launcher box top 1.49 x the hull roof height at the rear station -> 2.57 m; the
       launcher bins on it reach 2.69 m against the published 2.7 m.
     Warrior.  The road wheel pitch is not even: read front to rear in W3, W4 and W2 (reversed), the five pitches
       are 1.03 / 0.94 / 1.11 / 0.93 / 1.00 of their mean P (the means drawn).  W4 gives the hull 8.4 P over the
       nose and the tail; at the published 6.3 m P = 0.752 m.  W2 at one station gives the hull roof 2.87 P (2.16
       m) and the turret roof 3.62 P (2.72 m; the turret stands inboard, about 2.78 m) against the published 2.8 m.
       The two figures agree within 1 %.
     Saladin / Saracen (one chassis).  R1 square on with the ground visible, at the middle axle: D 304 px, the axle
       pitch 1.44 D (L1 1.45 D), front overhang 0.58 D, rear 0.72 D: 4.18 D = 4.80 m (published) gives D = 1.148 m;
       the turret top then stands 2.18 D = 2.50 m against the published 2.46 m.  L1: front overhang 0.69 D, rear
       0.73 D: 4.31 D = 4.95 m at the same D against the published 4.93 m.  Both lengths agree at one scale, so D
       = 1.148 m (tyre 0.574 m) and the axles 1.66 m apart.  The Saladin's turret roof is 1.655 D above the hub in
       L1: 2.47 m (published 2.39 m, 3 % over: L1 hides the ground, so its hub height is taken from the tyre).
     Ferret.  K1 (Mk 2/3 side view): at the published 2.29 m wheelbase, 181 px/m: width over the tyres 1.93 m
       (published 1.91), the turret roof 1.83 m (published 1.88), the tyres 0.89 m (9.00x16).  The length comes out
       3.87 m against the published 3.7 m (K1's front stowage and rear plate are drawn as K1 draws them).
     Fox.  X1: wheelbase 2.23 D, the turret roof 2.18 D above the ground (read from the front hub plus the tyre's
       vertical radius), the muzzle to the rear plate 5.1 D.  D = 1.0 m makes the published 2.2 m height and the
       5.08 m length agree within 2 %.

   RECOGNITION LIST (each drawn; source):
     FV432  1. the tall plain box with one straight glacis from the nose to the roof, vertical sides - F1, F3, F4
            2. five dual road wheels, two return rollers, the toothed front sprocket, the rear idler - F1, F3
            3. the lamp clusters in grilled guards at the glacis's top corners, the triple smoke dischargers - F3, F4
            4. the exhaust pipe along the left side and up the rear corner, the box on the left front - F1, F5
            5. the driver's hatch front right, the cupola behind it with the GPMG, the engine grille front left,
               the big round concertina hatch over the troop compartment - F5, published
            6. the rear door hinged on the right, the bins on the rear plate either side - F1, published
     Abbot  7. the low hull with the shallow louvred front deck, the mesh baskets along the sides - A1, A2, A3
            8. the tall square turret at the back with the cupola, the 105 mm with its double-baffle muzzle brake and
               fume extractor, the canvas bin on the turret side - A1, A2, A3
     FV438  9. the FV432 hull with the raised box over the rear roof, the twin launcher bins, the sight mast - S1
     Warrior 10. the long low glacis, the vertical sides with skirt plates over the track, six road wheels unevenly
               spaced, front sprocket, the high rear idler, three return rollers - W1, W2, W3, W4
            11. the turret behind mid-length with the long thin RARDEN, the two sight heads - W1, W2
            12. the bins on the rear corners and along the roof edges, the rear door - W2, W5
            13. e90: the bolted applique panels along the side - W3;  e00: the add-on side blocks, the lower skirt
                plates and the bar armour cages - W4
     Saladin 14. six big tyres equally spaced, the faceted hull with the chine, the stowage boxes on the sloping
               upper sides, the front mudguards with the headlamps - L1, L2
            15. the big turret over the middle axle with the 76 mm, the round bin on its rear - L1, L2
     Saracen 16. the louvred bonnet in front, the tall troop box behind it with the vision flaps, the small turret,
               the Bren ring at the rear, the twin rear doors - R1, R2
     Ferret 17. the small boat hull on four big wheels, the raised fighting compartment with the small turret,
               the spare wheel on the side - K1
     Fox    18. the low hull with the sloped upper body, the turret with the long RARDEN and the smoke
               dischargers, the louvred rear grille and the silencer - X1, X2
   PAINT: the 1950s-60s rows (Saladin, Saracen, Ferret, FV432, Abbot, FV438) are drawn plain deep bronze green (BS
   381C 224 taken as #353f2d); F1 and R1 show plain green restorations, A1 / A2 the later black-and-green.  The Fox
   (1973) and the Warrior rows are drawn in the black-on-green disruptive scheme of the 1970s-2000s (W1, W2, W5 wear
   it; NATO green taken as #4b5236, black #1e201c).  The e00 Warrior's add-on blocks are sand, as W4 shows.  X1's
   desert sand Fox and W3's desert Warrior are not followed.  No roundels, flags, numbers, plates or tactical signs.
   NOT CONFIRMED (proportion or judgement):
     FV432: all widths below the glacis (the lower hull +-1.04 between the tracks, the belly 0.41 m); the hatch and
     cupola sizes; the rear door's size; the depth of the bins and the left box.  Abbot: the turret's width (2.1 m)
     and its side slopes (from A3's head-on angle only), the cupola's place across, the front deck's louvre area.
     FV438: the box's width and length (S1 is a 3/4), the launcher bins' shape and place, the sight mast's height.
     Warrior: all widths (track 0.46 m, skirts at the published 3.03 m), the glacis angle (22 deg, from W3's armour
     line), the turret's width (2.0 m) and sides, the sight heads, the bar cages' depth, the applique thickness.
     Saladin / Saracen: all widths (tyres 0.33 m, track 2.12 m, chine at the published 2.54 m), the belly (0.50 m),
     the turret widths, the bonnet louvres.  Ferret: the spare wheel's side (K1 draws it on the left).  Fox: all
     widths; the rear overhang (X1 shows the tail a little obliquely); the turret's width (1.55 m).
   ENGINE (js/damage3d.js ENGINE_AT, not edited): no row needs a new entry.  gbr_e60_ifv (FV432, front right) and
     gbr_e80/e90/e00_ifv (Warrior, front right) take the ifv default "front"; gbr_e60_spg (Abbot, engine front)
     the spg default "front"; gbr_e60_tankdestroyer is listed "front"; gbr_e50_lighttank (Saladin, engine at the
     back: L3's louvred rear deck) takes the lighttank default "rear"; gbr_e50_ifv (Saracen, engine under the
     front bonnet: R1) takes the ifv default "front"; gbr_e50_recon (Ferret) and gbr_e60_recon (Fox) are listed
     "rear" and both have the engine at the back (K1's rear louvres, X1's rear grille).
   NOT BUILT HERE (rows still to do): gbr_e50_spg Sexton, gbr_e50_tankdestroyer Hornet Malkara, gbr_e90_recon Land
     Rover WMIK, gbr_e00_recon Jackal, gbr_e90_spg and gbr_e00_spg AS-90.
   Materials: PAINT (canvas texture), DARK, WHEEL (vertex colours: tyres, rims, glass, lamps), SAND (e00 add-on
   blocks), team colour (C.team): small strips on the roofs / turret roofs.
   Nodes: "turret" (origin on the ring at the roof, gun along +X; the FV432's is its cupola with the GPMG; the
   FV438 has none: its launcher is fixed); "roadwheel": tracked - one group per road-wheel station holding both
   sides; wheeled - one group per axle holding both tyres; origin on the axle centre, axle along Y.
   DRAWN (dump.js, L x W x H, against published): FV432 5.22 x 2.87 (tracks 2.80, hull 2.55) x 2.26 m (5.25 x 2.55 /
     2.8 x 2.28), 15 draw calls; Abbot 5.94 x 2.90 x 2.74 m to the cupola, turret roof 2.45 (5.8 gun forward x 2.6 x
     2.5), 15; FV438 5.22 x 2.87 x 2.78 m to the sight head, launcher bins 2.69 (5.1 x 3 x 2.7), 11; Warrior 6.49 x
     3.00 x 3.08 m to the sight heads, turret roof 2.78 (6.3 x 3.03 x 2.8), 16; e90 6.49 x 3.22 (applique), 16; e00
     7.27 (bar cages) x 3.48 (add-on blocks) x 3.10, 18; Saladin 4.99 x 2.58 x 2.73 m to the Browning, turret roof
     2.47 (4.93 x 2.54 x 2.39), 10; Saracen 4.91 x 2.60 x 2.53 m (4.8 x 2.54 x 2.46), 10; Ferret 3.91 x 1.94 x
     1.91 m (3.7 x 1.91 x 1.88), 9; Fox 5.07 x 2.14 x 2.30 m to the sight head, turret roof 2.17 (5.08 x 2.13 x
     2.2), 10.
   DETAIL PASS (Ferret and Fox only; HeroDaimler's ferretDetail / foxDetail and the turret details): Ferret 3.91 x
     1.94 x 1.93 m (the turret periscope), 10 draw calls, 6.9k triangles; Fox 5.07 x 2.14 x 2.38 m (the turret
     searchlight, X2), 10, 8.5k.  Both now carry the kit's detailTex (seams, bolt rows, panels, streaks, grime,
     chips; the Fox keeps its black bands) instead of paintTex.  The parts added are listed above ferretDetail;
     their sizes are NOT CONFIRMED (proportions of K1, X1, X2).
   Model space: +X nose, +Y left, +Z up, metres, ground at z = 0.  ASCII only.
   DETAIL PASS 2 (the owner: the models looked plainer than the old ones): HeroAlvis6: Saladin (gbr_e50_lighttank) 7188 -> 9936 tris, 10 -> 11 draw calls (the cupola's vision
     blocks bring the glass bin into the turret); Saracen (gbr_e50_ifv) 6884 -> 9500, 10.  saladinDetail,
     saladinTurretDetail, saracenDetail, saracenTurretDetail on the kit's new dp (dpKit); both take detailTex.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroGbLightKit = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  var GLASS = [0.10, 0.12, 0.13], LAMP = [0.85, 0.82, 0.70], RED = [0.55, 0.10, 0.08], AMBER = [0.75, 0.45, 0.10];

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
  /* a box from its centre with half sizes: shorthand */
  function cbox(bin, x, y, z, hx, hy, hz) { box(bin, x - hx, x + hx, y - hy, y + hy, z - hz, z + hz); }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a square bar from A to B, t thick */
  function bar(bin, A, B, t) {
    var ax = unit(sub(B, A)), r = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(ax, r)), w = cross(ax, u);
    var L = Math.sqrt(dot(sub(B, A), sub(B, A)));
    slab(bin, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2], ax, u, w, L / 2, t / 2, t / 2);
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
  /* a convex prism: profile [x, z] in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a convex prism: profile [y, z] in the YZ plane, from x0 to x1 */
  function prismX(bin, pts, x0, x1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
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
  /* a horizontal section ring: a rectangle with chamfered corners at height z (for turrets) */
  function oct(x0, x1, w, c, z) {
    return [[x1 - c, -w, z], [x1, -w + c, z], [x1, w - c, z], [x1 - c, w, z], [x0 + c, w, z], [x0, w - c, z], [x0, -w + c, z], [x0 + c, -w, z]];
  }
  /* a slab lying on a plane sloping down toward +X at angle a (rad) from horizontal */
  function onSlope(bin, x, y, z, a, hu, hv, hw) {
    var ca = Math.cos(a), sa = Math.sin(a), n = [sa, 0, ca];
    slab(bin, [x + n[0] * hw, y, z + n[2] * hw], [ca, 0, -sa], [0, 1, 0], n, hu, hv, hw);
  }
  /* a slab on a vertical side face (y = ys, normal s*Y) */
  function onSide(bin, s, ys, x, z, hx, hz, t) { box(bin, x - hx, x + hx, s > 0 ? ys : ys - t, s > 0 ? ys + t : ys, z - hz, z + hz); }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* PAINT: { base, blots, seed, dis: disruptive black bands (the 1970s-2000s scheme), sand } */
  function paintTex(THREE, PAINT) {
    var key = PAINT.base + PAINT.seed + (PAINT.dis ? "d" : "");
    if (_tex[key] !== undefined) return _tex[key];
    _tex[key] = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PAINT.seed), i, k, x, y, w, ox, oy;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PAINT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PAINT.blots.length; k++) {
        q.fillStyle = PAINT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      if (PAINT.dis) {
        /* the black disruptive bands: big irregular blobs, a third of the area, wrapped so the tile repeats */
        q.fillStyle = "#1e201c";
        for (i = 0; i < 5; i++) {
          var cx = R() * S, cy = R() * S, rx = 70 + R() * 70, ry = 35 + R() * 45, rot = R() * Math.PI, pts = [];
          for (k = 0; k < 9; k++) {
            var a = k / 9 * TAU, rr = 0.75 + R() * 0.5;
            pts.push([Math.cos(a) * rx * rr, Math.sin(a) * ry * rr]);
          }
          for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
            q.beginPath();
            for (k = 0; k < pts.length; k++) {
              var px = cx + ox + pts[k][0] * Math.cos(rot) - pts[k][1] * Math.sin(rot);
              var py = cy + oy + pts[k][0] * Math.sin(rot) + pts[k][1] * Math.cos(rot);
              if (k === 0) q.moveTo(px, py); else q.lineTo(px, py);
            }
            q.closePath(); q.fill();
          }
        }
      }
      for (i = 0; i < 6; i++) {                 /* weld seams and plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      _tex[key] = t;
    } catch (e) { _tex[key] = null; }
    return _tex[key];
  }
  var __DTEX = {};
  /* DETAIL PAINT (the detail pass): a 512 px tile over 2.94 m of surface (UVs 0.34 a metre, 174 px a
     metre).  Over the base colour and its soft blots: plate seams with a lit edge, bolt rows along some
     of them, access-panel outlines with corner screws, rain streaks, grime, dust, chipped paint and oil
     spots.  Plain paint - no markings, numbers or camouflage. */
  function detailTex(THREE, P) {
    var key = "detail" + P.seed + P.base;
    if (__DTEX[key] !== undefined) return __DTEX[key];
    var t = null;
    try {
      var S = 512, cv = document.createElement("canvas"), q, R = rng(P.seed * 7 + 13), i, k, x, y, w, h, ox, oy, a, xs, n;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      /* soft mottling in the base's own shades, drawn wrapped so the tile repeats without a seam */
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 20; i++) {
          x = R() * S; y = R() * S; w = 26 + R() * 90; h = 16 + R() * 60; a = R() * Math.PI;
          q.globalAlpha = 0.22 + R() * 0.3;
          for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
            if (x + ox < -w - 4 || x + ox > S + w + 4 || y + oy < -w - 4 || y + oy > S + w + 4) continue;
            q.beginPath(); q.ellipse(x + ox, y + oy, w, h, a, 0, TAU); q.fill();
          }
        }
      }
      /* the black disruptive bands where the scheme has them (as paintTex) */
      if (P.dis) {
        q.globalAlpha = 1; q.fillStyle = "#1e201c";
        var RB = rng(P.seed), cx, cy, rx, ry, rot, pts, kk, aa, rr, px, py;
        for (i = 0; i < 5; i++) {
          cx = RB() * S; cy = RB() * S; rx = 70 + RB() * 70; ry = 35 + RB() * 45; rot = RB() * Math.PI; pts = [];
          for (kk = 0; kk < 9; kk++) { aa = kk / 9 * TAU; rr = 0.75 + RB() * 0.5; pts.push([Math.cos(aa) * rx * rr, Math.sin(aa) * ry * rr]); }
          for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
            q.beginPath();
            for (kk = 0; kk < pts.length; kk++) {
              px = cx + ox + pts[kk][0] * Math.cos(rot) - pts[kk][1] * Math.sin(rot);
              py = cy + oy + pts[kk][0] * Math.sin(rot) + pts[kk][1] * Math.cos(rot);
              if (kk === 0) q.moveTo(px, py); else q.lineTo(px, py);
            }
            q.closePath(); q.fill();
          }
        }
      }
      /* plate seams: four vertical butts across the tile, horizontal seams staggered between them */
      xs = [];
      for (i = 0; i < 4; i++) xs.push(Math.floor(i * 128 + 20 + R() * 80) + 0.5);
      for (i = 0; i < 4; i++) {
        q.globalAlpha = 1; q.strokeStyle = "rgba(14,15,10,0.42)"; q.lineWidth = 2;
        q.beginPath(); q.moveTo(xs[i], 0); q.lineTo(xs[i], S); q.stroke();
        q.strokeStyle = "rgba(255,250,225,0.12)"; q.lineWidth = 1;
        q.beginPath(); q.moveTo(xs[i] + 2, 0); q.lineTo(xs[i] + 2, S); q.stroke();
        y = Math.floor(60 + R() * 120) + 0.5;
        for (k = 0; k < 2; k++) {
          var xa = xs[i], xb = i < 3 ? xs[i + 1] : xs[0] + S;
          q.strokeStyle = "rgba(14,15,10,0.38)"; q.lineWidth = 2;
          q.beginPath(); q.moveTo(xa, y); q.lineTo(xb, y); q.stroke();
          q.beginPath(); q.moveTo(xa - S, y); q.lineTo(xb - S, y); q.stroke();
          q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1;
          q.beginPath(); q.moveTo(xa, y + 2); q.lineTo(xb, y + 2); q.stroke();
          /* a bolt row along every other seam */
          if ((i + k) % 2 === 0) for (x = xa + 8; x < xb - 4; x += 15) {
            q.fillStyle = "rgba(12,12,8,0.45)"; q.fillRect(x % S, y - 6, 3, 3);
            q.fillStyle = "rgba(255,250,225,0.18)"; q.fillRect(x % S, y - 7, 2, 1);
          }
          y = (y + 200 + Math.floor(R() * 60)) % S;
        }
      }
      /* access panels: outlined, a screw at each corner */
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * (S - 90)) + 10.5; y = Math.floor(R() * (S - 70)) + 10.5; w = 26 + Math.floor(R() * 60); h = 18 + Math.floor(R() * 44);
        q.strokeStyle = "rgba(14,15,10,0.36)"; q.lineWidth = 1.5; q.strokeRect(x, y, w, h);
        q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1; q.strokeRect(x + 1.5, y + 1.5, w, h);
        q.fillStyle = "rgba(12,12,8,0.5)";
        q.fillRect(x + 3, y + 3, 2, 2); q.fillRect(x + w - 5, y + 3, 2, 2); q.fillRect(x + 3, y + h - 5, 2, 2); q.fillRect(x + w - 5, y + h - 5, 2, 2);
      }
      q.globalAlpha = 1;
      /* rain streaks down the plates (side faces carry v along z) */
      for (i = 0; i < 260; i++) {
        q.fillStyle = (i % 4) ? "rgba(18,16,10,0.08)" : "rgba(230,225,200,0.06)";
        q.fillRect(R() * S, R() * S, 1 + R() * 2, 8 + R() * 54);
      }
      /* grime and dust patches */
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(30,25,15,0.08)" : "rgba(150,135,100,0.08)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 8 + R() * 46, 4 + R() * 22, R() * Math.PI, 0, TAU); q.fill();
      }
      /* chipped paint and scratches */
      for (i = 0; i < 180; i++) {
        q.fillStyle = (i % 2) ? "rgba(205,200,175,0.22)" : "rgba(10,10,8,0.30)";
        n = 1 + Math.floor(R() * 3); q.fillRect(R() * S, R() * S, n, n);
      }
      q.strokeStyle = "rgba(210,205,180,0.14)"; q.lineWidth = 1;
      for (i = 0; i < 14; i++) { x = R() * S; y = R() * S; q.beginPath(); q.moveTo(x, y); q.lineTo(x + (R() - 0.5) * 40, y + (R() - 0.5) * 14); q.stroke(); }
      /* oil and fuel spots */
      for (i = 0; i < 8; i++) {
        q.fillStyle = "rgba(12,10,6,0.16)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 5 + R() * 12, 4 + R() * 9, 0, 0, TAU); q.fill();
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    __DTEX[key] = t;
    return t;
  }
  function materials(THREE, C, PAINT) {
    var T = {}, tx = paintTex(THREE, PAINT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PAINT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.sand = new THREE.MeshStandardMaterial({ color: 0xb59c72, roughness: 0.9, metalness: 0.04 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false), vc: new Bin(T.wheel, false, true), sand: new Bin(T.sand, false) }; }
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
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); g.name = name; g.position.set(x, y, z); return g; }
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function baseCols(base) {
    var rr = parseInt(base.substr(1, 2), 16) / 255, gg = parseInt(base.substr(3, 2), 16) / 255, bb = parseInt(base.substr(5, 2), 16) / 255;
    return { body: [rr * 1.12, gg * 1.12, bb * 1.12], rib: [rr * 1.3, gg * 1.3, bb * 1.3] };
  }

  /* ------------------------------------------------- tracked running gear */
  /* G: XW road wheels, ZW, RW; RR return rollers at RRZ, RRR; SPR sprocket (toothed), IDL idler;
     TY track centre, TW track half width */
  function addTracks(B, G) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], TO = 0.03;
    for (i = 0; i < G.XW.length; i++) C.push([G.XW[i], G.ZW, G.RW + TO]);
    for (i = 0; i < G.RR.length; i++) C.push([G.RR[i], G.RRZ, G.RRR + TO]);
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
    cnt = Math.round(tot / 0.16); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - G.TW, y + G.TW, 0.04);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - G.TW - 0.005, y + G.TW + 0.005, 0.06);
        belt(B.dark, px - dx * 0.025 - dz * 0.05, pz - dz * 0.025 + dx * 0.05, px + dx * 0.025 - dz * 0.05, pz + dz * 0.025 + dx * 0.05, y - 0.025, y + 0.025, 0.04);
      }
      cylY(B.dark, G.SPR.x, y - 0.10, y + 0.10, G.SPR.z, G.SPR.r - 0.04, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [G.SPR.x + ca * (G.SPR.r - 0.02), y, G.SPR.z + sa * (G.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.025);
      }
      cylY(B.paint, G.SPR.x, y + s * 0.10, y + s * G.TW * 0.9, G.SPR.z, G.SPR.r * 0.55, 14);
      cylY(B.dark, G.SPR.x, y + s * G.TW * 0.9, y + s * G.TW * 1.0, G.SPR.z, 0.06, 10);
      cylY(B.paint, G.IDL.x, y - G.TW * 0.85, y + G.TW * 0.85, G.IDL.z, G.IDL.r, 18);
      cylY(B.dark, G.IDL.x, y + s * G.TW * 0.85, y + s * (G.TW * 0.85 + 0.03), G.IDL.z, 0.07, 10);
      for (i = 0; i < G.RR.length; i++) {
        cylY(B.paint, G.RR[i], y - G.TW * 0.8, y + G.TW * 0.8, G.RRZ, G.RRR, 12);
        cylY(B.dark, G.RR[i], y + s * G.TW * 0.8, y + s * (G.TW * 0.8 + 0.03), G.RRZ, 0.04, 8);
      }
    }
  }
  /* road wheel: dual rubber-tyred discs either side of the guide horns (F3, W5), the dished face with the bolt
     circle and the hub; axle along Y, both sides */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14];
  function addRoadWheel(W, G, base) {
    var s, y, i, a, dy, K = baseCols(base), R = G.RW, w = G.TW * 0.42;
    for (s = -1; s <= 1; s += 2) {
      y = s * G.TY;
      for (dy = -1; dy <= 1; dy += 2) {
        var yc = y + dy * (0.035 + w / 2);
        W.col = TYRE; cylY(W, 0, yc - w / 2, yc + w / 2, 0, R, 18);
        W.col = K.body; cylY(W, 0, yc - w / 2 - 0.004, yc + w / 2 + 0.004, 0, R - 0.045, 18);
      }
      var yf = y + s * (0.035 + w + 0.004);
      W.col = K.body; cyl(W, [0, yf, 0], [0, yf + s * 0.02, 0], R - 0.045, R * 0.55, 18);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        box(W, Math.cos(a) * R * 0.5 - 0.013, Math.cos(a) * R * 0.5 + 0.013, Math.min(yf + s * 0.012, yf + s * 0.024), Math.max(yf + s * 0.012, yf + s * 0.024), Math.sin(a) * R * 0.5 - 0.013, Math.sin(a) * R * 0.5 + 0.013);
      }
      W.col = K.rib; cylY(W, 0, yf + s * 0.015, yf + s * 0.04, 0, R * 0.28, 10);
      W.col = HOLE; cylY(W, 0, yf + s * 0.04, yf + s * 0.052, 0, R * 0.12, 8);
    }
  }
  /* one axle of a wheeled car: two big cross-country tyres with a chunky tread, the dished steel disc with its
     ring of nuts and the hub; O: { r, ty (tyre centre), th (half width), rim, nuts } */
  var LUG = [0.11, 0.115, 0.105], NUT = [0.20, 0.21, 0.18];
  function addAxle(W, O, base) {
    var s, y, i, a, ca, sa, K = baseCols(base), R = O.r, TH = O.th, nl = O.lugs || 26;
    for (s = -1; s <= 1; s += 2) {
      y = s * O.ty;
      W.col = TYRE;
      cylY(W, 0, y - TH, y + TH, 0, R - 0.02, 26);
      cyl(W, [0, y + s * TH, 0], [0, y + s * (TH + 0.03), 0], R - 0.05, R * 0.7, 26, true);
      cyl(W, [0, y - s * TH, 0], [0, y - s * (TH + 0.03), 0], R - 0.05, R * 0.7, 26, true);
      W.col = LUG;
      for (i = 0; i < nl; i++) {
        a = i / nl * TAU; ca = Math.cos(a); sa = Math.sin(a);
        var off = (i % 2 ? 0.35 : -0.35) * TH;
        slab(W, [ca * (R - 0.01), y + off, sa * (R - 0.01)], [ca, 0, sa], [-sa, 0, ca], [0, 1, 0], 0.022, R * 0.075, TH * 0.6);
      }
      W.col = K.body;
      cyl(W, [0, y + s * (TH - 0.03), 0], [0, y + s * (TH + 0.005), 0], O.rim, O.rim - 0.03, 22);
      W.col = K.rib;
      cyl(W, [0, y + s * TH, 0], [0, y + s * (TH + 0.04), 0], O.rim * 0.42, O.rim * 0.34, 14);
      W.col = NUT;
      for (i = 0; i < O.nuts; i++) {
        a = i / O.nuts * TAU;
        cylY(W, Math.cos(a) * O.rim * 0.8, y + s * TH, y + s * (TH + 0.012), Math.sin(a) * O.rim * 0.8, 0.016, 6);
      }
      W.col = HOLE; cylY(W, 0, y + s * (TH + 0.04), y + s * (TH + 0.052), 0, O.rim * 0.16, 8);
    }
  }
  /* headlamp: a short drum facing +X with its glass */
  function lamp(B, x, y, z, r) {
    cylX(B.paint, x - 0.10, x, y, z, r, r * 1.05, 12);
    B.vc.col = LAMP; cylX(B.vc, x, x + 0.012, y, z, r * 0.85, r * 0.85, 12);
  }
  /* a lamp cluster in its grilled guard (F3, F4: two lamps side by side, the bars in front) */
  function lampCluster(B, x, y, z) {
    var i;
    box(B.paint, x - 0.14, x - 0.02, y - 0.20, y + 0.20, z - 0.14, z + 0.12);
    B.vc.col = LAMP;
    cylX(B.vc, x - 0.02, x - 0.01, y - 0.09, z, 0.075, 0.075, 12);
    cylX(B.vc, x - 0.02, x - 0.01, y + 0.09, z, 0.075, 0.075, 12);
    for (i = 0; i < 6; i++) box(B.dark, x + 0.05, x + 0.07, y - 0.19 + i * 0.076, y - 0.175 + i * 0.076, z - 0.12, z + 0.12);
    box(B.dark, x - 0.02, x + 0.07, y - 0.205, y + 0.205, z + 0.11, z + 0.13);
    box(B.dark, x - 0.02, x + 0.07, y - 0.205, y + 0.205, z - 0.15, z - 0.13);
  }
  /* a GPMG / Browning on its own axis along +X, breech at x0 */
  function mg(B, x0, y, z, len) {
    box(B.dark, x0, x0 + 0.36, y - 0.04, y + 0.04, z - 0.05, z + 0.05);
    cylX(B.dark, x0 + 0.36, x0 + len, y, z, 0.016, 0.016, 8);
    box(B.dark, x0 + 0.10, x0 + 0.22, y - 0.015, y + 0.015, z - 0.16, z - 0.05);
  }
  /* smoke discharger cluster: n tubes raked forward and up */
  function smoke(B, x, y, z, n, dy, s) {
    for (var i = 0; i < n; i++) cyl(B.dark, [x - 0.06, y + (i - (n - 1) / 2) * dy, z], [x + 0.08, y + (i - (n - 1) / 2) * dy + (s || 0) * 0.03, z + 0.10], 0.038, 0.038, 8);
  }

  /* ---------------------------------------------------------------- DETAIL PASS 2: the fittings kit
     Built on this module's own box(bin, x0, x1, y0, y1, z0, z1) and cyl(bin, A, B, r0, r1, seg); every
     part lands in the bin it is handed, so the draw calls do not grow.  s = +1 the left (+Y) side, a
     part on a side face stands off the face y = ys outward.  Sizes are by proportion (NOT CONFIRMED):
     the 20 l jerrycan 0.345 x 0.165 x 0.47 m, tool handles 0.03-0.04 m, tow cable 0.028 m. */
  function dpKit(box, cyl) {
    var TAU = 2 * Math.PI;
    function oy(s, ys, t0, t1) { return s > 0 ? [ys + t0, ys + t1] : [ys - t1, ys - t0]; }
    function bar(b, A, B, r, seg) { cyl(b, A, B, r, r, seg || 6); }
    var D = {
      bar: bar, oy: oy,
      /* a bolt row along X on the side face ys */
      bolts: function (b, x0, x1, n, ys, z, s, r) {
        r = r || 0.013; var i, x, q = oy(s, ys, -0.004, r * 1.1);
        for (i = 0; i < n; i++) { x = n > 1 ? x0 + (x1 - x0) * i / (n - 1) : x0; box(b, x - r, x + r, q[0], q[1], z - r, z + r); }
      },
      /* a bolt row along X on a top face z, or along Y when y1 is given */
      boltsTop: function (b, x0, x1, n, y0, y1, z, r) {
        r = r || 0.013; var i, t;
        for (i = 0; i < n; i++) { t = n > 1 ? i / (n - 1) : 0; var x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t; box(b, x - r, x + r, y - r, y + r, z - 0.004, z + r * 1.1); }
      },
      /* a door hinge on a side face: the barrel up the face and its two leaves */
      hinge: function (b, x, ys, z0, z1, s) {
        var q = oy(s, ys, 0, 0.022);
        cyl(b, [x, (q[0] + q[1]) / 2, z0], [x, (q[0] + q[1]) / 2, z1], 0.02, 0.02, 8);
        box(b, x - 0.09, x, q[0], q[1], z0 + (z1 - z0) * 0.15, z0 + (z1 - z0) * 0.35);
        box(b, x - 0.09, x, q[0], q[1], z0 + (z1 - z0) * 0.65, z0 + (z1 - z0) * 0.85);
      },
      /* a hatch hinge on a roof: the barrel along X or Y */
      hingeTop: function (b, x0, x1, y0, y1, z) { cyl(b, [x0, y0, z + 0.02], [x1, y1, z + 0.02], 0.022, 0.022, 8); },
      /* a U grab handle standing off the side face ys, along X */
      grab: function (b, s, ys, x0, x1, z) {
        var q = oy(s, ys, 0, 0.055), yf = s > 0 ? q[1] - 0.012 : q[0] + 0.012;
        bar(b, [x0, ys, z], [x0, yf, z], 0.011, 5); bar(b, [x1, ys, z], [x1, yf, z], 0.011, 5);
        bar(b, [x0, yf, z], [x1, yf, z], 0.011, 5);
      },
      /* a U grab handle on a top face z, along X (or Y with y1) */
      grabTop: function (b, x0, x1, y0, y1, z) {
        bar(b, [x0, y0, z], [x0, y0, z + 0.055], 0.011, 5); bar(b, [x1, y1, z], [x1, y1, z + 0.055], 0.011, 5);
        bar(b, [x0, y0, z + 0.055], [x1, y1, z + 0.055], 0.011, 5);
      },
      /* a U grab handle on a face across X (front or rear), dir = +1 the face looks to +X */
      grabX: function (b, xs, dir, y0, y1, z) {
        var xf = xs + dir * 0.05;
        bar(b, [xs, y0, z], [xf, y0, z], 0.011, 5); bar(b, [xs, y1, z], [xf, y1, z], 0.011, 5);
        bar(b, [xf, y0, z], [xf, y1, z], 0.011, 5);
      },
      /* a wire guard over a lamp on a face across X (dir +1 looks forward): three bars and two hoops */
      guard: function (b, x, y, z, r, dir) {
        var i, xf = x + dir * (r * 0.9);
        for (i = -1; i <= 1; i++) bar(b, [x, y + i * r * 0.65, z + r * 1.2], [xf, y + i * r * 0.65, z], 0.008, 4);
        for (i = -1; i <= 1; i++) bar(b, [xf, y + i * r * 0.65, z], [x, y + i * r * 0.65, z - r * 1.2], 0.008, 4);
        bar(b, [x, y - r * 1.25, z + r * 1.2], [x, y + r * 1.25, z + r * 1.2], 0.009, 4);
        bar(b, [x, y - r * 1.25, z - r * 1.2], [x, y + r * 1.25, z - r * 1.2], 0.009, 4);
        bar(b, [xf, y - r * 0.7, z], [xf, y + r * 0.7, z], 0.008, 4);
      },
      /* a 20 l jerrycan standing in its bracket against the side face ys (x its centre, z0 its foot) */
      jerry: function (bP, bD, x, ys, z0, s) {
        var q = oy(s, ys, 0.012, 0.177), yf = s > 0 ? q[1] : q[0];
        box(bP, x - 0.172, x + 0.172, q[0], q[1], z0, z0 + 0.47);
        /* the pressed X on its face and the rim */
        var yr = s > 0 ? [yf, yf + 0.006] : [yf - 0.006, yf];
        bar(bP, [x - 0.14, (yr[0] + yr[1]) / 2, z0 + 0.05], [x + 0.14, (yr[0] + yr[1]) / 2, z0 + 0.36], 0.012, 4);
        bar(bP, [x + 0.14, (yr[0] + yr[1]) / 2, z0 + 0.05], [x - 0.14, (yr[0] + yr[1]) / 2, z0 + 0.36], 0.012, 4);
        /* the three handles and the spout on top */
        var yc = (q[0] + q[1]) / 2, i;
        for (i = -1; i <= 1; i++) box(bD, x + i * 0.07 - 0.012, x + i * 0.07 + 0.012, yc - 0.05, yc + 0.05, z0 + 0.47, z0 + 0.50);
        cyl(bD, [x + 0.13, yc, z0 + 0.47], [x + 0.13, yc, z0 + 0.52], 0.022, 0.022, 6);
        /* the bracket: a foot tray and the strap round it */
        box(bD, x - 0.19, x + 0.19, s > 0 ? ys : q[0] - 0.01, s > 0 ? q[1] + 0.01 : ys, z0 - 0.025, z0);
        box(bD, x - 0.19, x + 0.19, s > 0 ? q[1] : q[0] - 0.008, s > 0 ? q[1] + 0.008 : q[0], z0 + 0.30, z0 + 0.33);
      },
      /* a pioneer tool clipped along X on the side face ys (kind: "shovel", "pick", "axe", "bar") */
      tool: function (bH, bM, kind, x0, x1, ys, z, s) {
        var q = oy(s, ys, 0.01, 0.06), y = (q[0] + q[1]) / 2, L = x1 - x0, dir = L > 0 ? 1 : -1;
        bar(bH, [x0, y, z], [x1, y, z], kind === "bar" ? 0.016 : 0.02, 6);
        if (kind === "shovel") {
          box(bM, Math.min(x1, x1 + dir * 0.28), Math.max(x1, x1 + dir * 0.28), y - 0.008, y + 0.008, z - 0.11, z + 0.11);
          bar(bH, [x0, y, z - 0.06], [x0, y, z + 0.06], 0.014, 5);
        } else if (kind === "pick") {
          bar(bM, [x1, y, z - 0.30], [x1, y, z + 0.30], 0.022, 5);
        } else if (kind === "axe") {
          box(bM, x1 - 0.06, x1 + 0.06, y - 0.012, y + 0.012, z - 0.04, z + 0.15);
        }
        /* the clamps */
        var c, qa = oy(s, ys, 0, 0.07);
        for (c = 0; c < 2; c++) { var xc = x0 + L * (0.22 + c * 0.5); box(bM, xc - 0.025, xc + 0.025, qa[0], qa[1], z - 0.035, z + 0.035); }
      },
      /* the same lying flat on a top face z, the handle along X at y (the blade and the pick head flat) */
      toolTop: function (bH, bM, kind, x0, x1, y, z) {
        var L = x1 - x0, dir = L > 0 ? 1 : -1, zc = z + 0.022;
        bar(bH, [x0, y, zc], [x1, y, zc], kind === "bar" ? 0.016 : 0.02, 6);
        if (kind === "shovel") {
          box(bM, Math.min(x1, x1 + dir * 0.28), Math.max(x1, x1 + dir * 0.28), y - 0.11, y + 0.11, z + 0.004, z + 0.02);
          bar(bH, [x0, y - 0.06, zc], [x0, y + 0.06, zc], 0.014, 5);
        } else if (kind === "pick") {
          bar(bM, [x1, y - 0.30, zc], [x1, y + 0.30, zc], 0.022, 5);
        } else if (kind === "axe") {
          box(bM, x1 - 0.06, x1 + 0.06, y - 0.04, y + 0.15, z + 0.01, z + 0.034);
        }
        for (var c = 0; c < 2; c++) { var xc = x0 + L * (0.22 + c * 0.5); box(bM, xc - 0.025, xc + 0.025, y - 0.035, y + 0.035, z, z + 0.05); }
      },
      /* a tow cable along X on the side face ys: two strands, the eyes and three clips */
      cable: function (b, x0, x1, ys, z, s) {
        var q = oy(s, ys, 0.01, 0.07), y = (q[0] + q[1]) / 2, i, a, k;
        bar(b, [x0 + 0.08, y, z + 0.025], [x1 - 0.08, y, z + 0.025], 0.016, 6);
        bar(b, [x0 + 0.08, y, z - 0.025], [x1 - 0.08, y, z - 0.025], 0.016, 6);
        for (k = 0; k < 2; k++) {
          var xe = k ? x1 - 0.06 : x0 + 0.06;
          for (i = 0; i < 6; i++) { a = i / 6 * TAU; var b2 = (i + 1) / 6 * TAU;
            bar(b, [xe + Math.cos(a) * 0.06, y, z + Math.sin(a) * 0.06], [xe + Math.cos(b2) * 0.06, y, z + Math.sin(b2) * 0.06], 0.014, 4); }
        }
        for (i = 1; i <= 3; i++) { var xc = x0 + (x1 - x0) * i / 4; box(b, xc - 0.03, xc + 0.03, s > 0 ? ys : q[0] - 0.01, s > 0 ? q[1] + 0.01 : ys, z - 0.06, z + 0.06); }
      },
      /* a stowage bin: the box, its lid's lip, the hinge along the top and two latches on the face s */
      stow: function (bP, bD, x0, x1, y0, y1, z0, z1, s) {
        box(bP, x0, x1, y0, y1, z0, z1);
        box(bP, x0 - 0.015, x1 + 0.015, y0 - 0.015, y1 + 0.015, z1 - 0.035, z1 + 0.012);
        var yi = s > 0 ? y0 : y1, yf = s > 0 ? y1 : y0, k;
        cyl(bD, [x0 + 0.05, yi, z1 + 0.012], [x1 - 0.05, yi, z1 + 0.012], 0.018, 0.018, 6);
        for (k = 0; k < 2; k++) { var xl = x0 + (x1 - x0) * (0.25 + k * 0.5);
          box(bD, xl - 0.025, xl + 0.025, s > 0 ? yf : yf - 0.02, s > 0 ? yf + 0.02 : yf, z1 - 0.13, z1 - 0.04); }
      },
      /* a rolled tarpaulin or camouflage net along X, with three straps */
      roll: function (bP, bD, x0, x1, y, z, r) {
        cyl(bP, [x0, y, z], [x1, y, z], r, r, 12);
        for (var i = 0; i < 3; i++) { var x = x0 + (x1 - x0) * (0.15 + i * 0.35); cyl(bD, [x - 0.025, y, z], [x + 0.025, y, z], r + 0.012, r + 0.012, 12); }
      },
      /* the same rolled across Y */
      rollY: function (bP, bD, x, y0, y1, z, r) {
        cyl(bP, [x, y0, z], [x, y1, z], r, r, 12);
        for (var i = 0; i < 3; i++) { var y = y0 + (y1 - y0) * (0.15 + i * 0.35); cyl(bD, [x, y - 0.025, z], [x, y + 0.025, z], r + 0.012, r + 0.012, 12); }
      },
      /* an aerial base: the mount, the spring and the stub of the mast (h, at most 0.5 m: the
         engine's era kit and sling clearances read the model's height, so no full-length whip) */
      whip: function (b, x, y, z, h) {
        h = Math.min(h || 0.4, 0.5);
        cyl(b, [x, y, z], [x, y, z + 0.09], 0.05, 0.042, 8);
        cyl(b, [x, y, z + 0.09], [x, y, z + 0.22], 0.024, 0.024, 6);
        cyl(b, [x, y, z + 0.22], [x, y, z + h], 0.011, 0.008, 4);
      },
      /* a mudflap hanging across X behind a wheel */
      flap: function (b, x, y0, y1, z0, z1) { box(b, x - 0.008, x + 0.008, y0, y1, z0, z1); },
      /* hub nuts round a wheel centre on the outer face y (axis along Y), ring radius R */
      nuts: function (b, x, y, z, R, n, s, r) {
        r = r || 0.018; var i, a;
        for (i = 0; i < n; i++) { a = i / n * TAU; cyl(b, [x + Math.cos(a) * R, y, z + Math.sin(a) * R], [x + Math.cos(a) * R, y + s * 0.025, z + Math.sin(a) * R], r, r, 6); }
      },
      /* grille slats across a top face, n of them along X */
      slats: function (b, x0, x1, y0, y1, z, n) {
        for (var i = 0; i < n; i++) { var x = x0 + (x1 - x0) * (i + 0.5) / n; box(b, x - 0.012, x + 0.012, y0, y1, z, z + 0.025); }
        box(b, x0 - 0.02, x1 + 0.02, y0 - 0.02, y0, z, z + 0.03); box(b, x0 - 0.02, x1 + 0.02, y1, y1 + 0.02, z, z + 0.03);
      },
      /* louvres on a side face ys: n slats along Z */
      louvres: function (b, x0, x1, ys, z0, z1, n, s) {
        var q = oy(s, ys, 0, 0.022);
        for (var i = 0; i < n; i++) { var z = z0 + (z1 - z0) * (i + 0.5) / n; box(b, x0, x1, q[0], q[1], z - 0.012, z + 0.012); }
        box(b, x0 - 0.02, x0, q[0], q[1], z0, z1); box(b, x1, x1 + 0.02, q[0], q[1], z0, z1);
      },
      /* a round hatch on a roof: the lid, the hinge and the handle */
      hatch: function (bP, bD, x, y, z, r, hy) {
        cyl(bP, [x, y, z], [x, y, z + 0.045], r, r * 0.97, 16);
        cyl(bD, [x, y, z + 0.045], [x, y, z + 0.055], r * 0.55, r * 0.5, 12);
        var h = hy || 1;
        cyl(bD, [x - r * 0.5, y + h * (r + 0.02), z + 0.03], [x + r * 0.5, y + h * (r + 0.02), z + 0.03], 0.028, 0.028, 8);
        bar(bD, [x - r * 0.3, y - h * r * 0.3, z + 0.06], [x + r * 0.3, y - h * r * 0.3, z + 0.06], 0.012, 5);
      },
      /* a periscope / vision block on a roof looking along dir (+1 forward): body and glass */
      vblock: function (bD, bG, x, y, z, w, dir) {
        box(bD, x - 0.07, x + 0.07, y - w / 2, y + w / 2, z, z + 0.09);
        var xf = x + dir * 0.07;
        box(bG, Math.min(xf, xf + dir * 0.008), Math.max(xf, xf + dir * 0.008), y - w / 2 + 0.015, y + w / 2 - 0.015, z + 0.02, z + 0.07);
        box(bD, x - 0.09, x + 0.09, y - w / 2 - 0.01, y + w / 2 + 0.01, z + 0.09, z + 0.11);
      },
      /* a towing hook or pintle on a face across X (dir +1 looks forward) */
      /* (L, default 0.19 m, the reach in front of the face; kept inside the model's old length) */
      hook: function (b, xs, y, z, dir, L) {
        var k = (L || 0.19) / 0.19;
        box(b, Math.min(xs, xs + dir * 0.05 * k), Math.max(xs, xs + dir * 0.05 * k), y - 0.09, y + 0.09, z - 0.10, z + 0.10);
        cyl(b, [xs + dir * 0.05 * k, y, z], [xs + dir * 0.16 * k, y, z], 0.035, 0.035, 8);
        cyl(b, [xs + dir * 0.16 * k, y, z - 0.07], [xs + dir * 0.16 * k, y, z + 0.05], 0.03, 0.03, 8);
        cyl(b, [xs + dir * 0.12 * k, y - 0.05, z + 0.06], [xs + dir * 0.12 * k, y + 0.05, z + 0.06], 0.015, 0.015, 5);
      },
      /* a lifting eye on a top face */
      eye: function (b, x, y, z, alongY) {
        if (alongY) box(b, x - 0.012, x + 0.012, y - 0.04, y + 0.04, z - 0.005, z + 0.06);
        else box(b, x - 0.04, x + 0.04, y - 0.012, y + 0.012, z - 0.005, z + 0.06);
      },
      /* an exhaust: the pipe from A to B with its silencer drum part way and a cap */
      exhaust: function (b, A, B, r, at) {
        var t = at === undefined ? 0.5 : at, M = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t];
        cyl(b, A, B, r, r, 8);
        var d = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]), k = Math.min(0.2, l * 0.25) / l;
        cyl(b, [M[0] - d[0] * k, M[1] - d[1] * k, M[2] - d[2] * k], [M[0] + d[0] * k, M[1] + d[1] * k, M[2] + d[2] * k], r * 2.1, r * 2.1, 10);
        cyl(b, B, [B[0] + d[0] / l * 0.03, B[1] + d[1] / l * 0.03, B[2] + d[2] / l * 0.03], r * 1.3, r * 1.3, 8);
      },
      /* a rack of rails standing on a top face: frame posts and two rails (a basket) */
      basket: function (b, x0, x1, y0, y1, z0, h) {
        var i, n = Math.max(2, Math.round((x1 - x0) / 0.3) + 1), x;
        for (i = 0; i < n; i++) { x = x0 + (x1 - x0) * i / (n - 1);
          bar(b, [x, y0, z0], [x, y0, z0 + h], 0.012, 4); bar(b, [x, y1, z0], [x, y1, z0 + h], 0.012, 4); }
        bar(b, [x0, y0, z0 + h], [x1, y0, z0 + h], 0.013, 4); bar(b, [x0, y1, z0 + h], [x1, y1, z0 + h], 0.013, 4);
        bar(b, [x0, y0, z0 + h * 0.5], [x1, y0, z0 + h * 0.5], 0.01, 4); bar(b, [x0, y1, z0 + h * 0.5], [x1, y1, z0 + h * 0.5], 0.01, 4);
        bar(b, [x0, y0, z0 + h], [x0, y1, z0 + h], 0.013, 4); bar(b, [x1, y0, z0 + h], [x1, y1, z0 + h], 0.013, 4);
      },
      /* kit bags / rucksacks stowed in a basket: lumpy boxes, strapped */
      bags: function (bP, bD, x0, x1, y0, y1, z0, h, seed) {
        var r = (seed || 7) >>> 0, n = Math.max(2, Math.round((x1 - x0) / 0.45)), i;
        function R() { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; return r / 4294967296; }
        for (i = 0; i < n; i++) {
          var a = x0 + (x1 - x0) * i / n + 0.02, c = x0 + (x1 - x0) * (i + 1) / n - 0.02, hh = h * (0.6 + R() * 0.4), w = (y1 - y0) * (0.75 + R() * 0.2), yc = (y0 + y1) / 2 + (R() - 0.5) * 0.06;
          box(bP, a, c, yc - w / 2, yc + w / 2, z0, z0 + hh);
          box(bD, (a + c) / 2 - 0.02, (a + c) / 2 + 0.02, yc - w / 2 - 0.006, yc + w / 2 + 0.006, z0, z0 + hh + 0.006);
        }
      }
    };
    return D;
  }
  return { TAU: TAU, GLASS: GLASS, LAMP: LAMP, RED: RED, AMBER: AMBER, Bin: Bin, box: box, cbox: cbox, slab: slab, belt: belt,
           bar: bar, cyl: cyl, cylX: cylX, cylY: cylY, cylZ: cylZ, prismY: prismY, prismX: prismX, loftN: loftN, oct: oct,
           onSlope: onSlope, onSide: onSide, materials: materials, bins: bins, flush: flush, group: group,
           addTracks: addTracks, addRoadWheel: addRoadWheel, addAxle: addAxle, lamp: lamp, lampCluster: lampCluster,
           mg: mg, smoke: smoke, cross: cross, detailTex: detailTex,
           dp: dpKit(box, cyl) };   /* DETAIL PASS 2 (HeroAlvis6) */
})();

/* ==================================================================================================== FV430 family */
var HeroFv430 = (function () {
  "use strict";
  var K = HeroGbLightKit, TAU = K.TAU;
  var DBG = { base: "#353f2d", blots: ["#2f3828", "#3c4633"], seed: 432 };
  /* running gear (F1 at 226 px/m: X = (766 - px) / 226, z = (838 - py) / 226) */
  var G = { XW: [1.403, 0.739, 0.088, -0.562, -1.257], ZW: 0.36, RW: 0.31, RR: [1.097, -0.969], RRZ: 0.76, RRR: 0.11,
            SPR: { x: 2.159, z: 0.566, r: 0.29 }, IDL: { x: -1.92, z: 0.64, r: 0.29 }, TY: 1.23, TW: 0.17 };
  /* hull: nose tip, glacis top, rear plate, fender, roof, half widths (glacis 2.55 m, lower hull between tracks) */
  var NOSE = 2.615, NZ = 0.765, GX = 2.02, REAR = -2.25, FEN = 1.02, ROOF = 1.73, HW = 1.275, LW = 1.04, BELLY = 0.41;
  var GSL = (GX - NOSE) / (ROOF - NZ);          /* dx per dz along the glacis */
  function glX(z) { return NOSE + (z - NZ) * GSL; }
  var GA = Math.atan2(ROOF - NZ, NOSE - GX);     /* glacis angle from horizontal (58 deg) */

  /* the FV430 lower hull and running gear fittings, shared by all three */
  function lowerHull(B, nose, nz) {
    var P = B.paint, D = B.dark, s;
    /* between the tracks: the lower nose plate raking back to the belly (F4), the tail */
    K.prismY(P, [[nose, nz], [2.25, BELLY], [-2.12, BELLY], [REAR, 0.56], [REAR, FEN], [nose - (FEN - nz) * 0.6, FEN]], -LW, LW);
    /* the towing eyes on the nose (F4) */
    for (s = -1; s <= 1; s += 2) K.box(D, nose - 0.20, nose + 0.04, s * 0.72 - 0.06, s * 0.72 + 0.06, nz - 0.20, nz - 0.06);
    /* the rear mudflaps behind the tracks (F1) */
    for (s = -1; s <= 1; s += 2) K.slab(D, [REAR - 0.13, s * G.TY, 0.93], unit2(-0.6, -0.8), [0, 1, 0], unit2(0.8, -0.6), 0.14, G.TW + 0.02, 0.01);
  }
  function unit2(x, z) { var l = Math.sqrt(x * x + z * z); return [x / l, 0, z / l]; }

  /* ------------------------------------------------------------------ FV432 hull */
  function fv432Hull(B, raised) {
    var P = B.paint, D = B.dark, s, i, x, y, z;
    lowerHull(B, NOSE, NZ);
    /* the upper box over the tracks: vertical sides, the one straight glacis (F1, F3) */
    K.prismY(P, [[glX(FEN), FEN], [REAR, FEN], [REAR, ROOF], [GX, ROOF]], -HW, HW);
    K.prismY(P, [[NOSE, NZ], [glX(FEN), FEN], [glX(FEN) - 0.16, FEN]], -HW, HW);
    /* the fender lip along the side's foot (F1) */
    for (s = -1; s <= 1; s += 2) K.box(D, REAR, glX(FEN) - 0.05, s > 0 ? HW - 0.01 : -HW - 0.035, s > 0 ? HW + 0.035 : -HW + 0.01, FEN - 0.02, FEN + 0.03);
    /* the glacis: the big access plate in the middle (F3, F4), the lamp clusters in their guards and the triple
       smoke dischargers at the top corners (F3, F4, published) */
    var n = [Math.sin(GA), 0, Math.cos(GA)];
    K.onSlope(P, glX(1.20), 0.0, 1.20, GA, 0.30, 0.48, 0.012);
    K.onSlope(D, glX(1.47), 0.0, 1.47, GA, 0.015, 0.40, 0.016);
    for (s = -1; s <= 1; s += 2) {
      z = 1.48; x = glX(z) + 0.05;
      K.lampCluster(B, x + 0.04, s * 1.02, z);
      K.smoke(B, glX(1.66) - 0.02, s * 0.70, 1.66, 3, 0.09, s);
      K.box(D, glX(1.66) - 0.10, glX(1.66) + 0.02, s * 0.70 - 0.16, s * 0.70 + 0.16, 1.60, 1.66);
    }
    K.box(B.team, GX - 0.10, GX - 0.02, -0.30, 0.30, ROOF, ROOF + 0.012);
    /* the roof: the driver's hatch front RIGHT (F5, published), his periscopes; the engine grille front LEFT
       (F5); the round concertina hatch over the troop compartment (published) */
    K.cylZ(P, 1.72, -0.70, ROOF, ROOF + 0.06, 0.30, 16);
    K.box(D, 1.46, 1.52, -0.92, -0.48, ROOF + 0.06, ROOF + 0.09);
    for (i = -1; i <= 1; i++) { B.vc.col = K.GLASS; K.box(B.vc, 1.98, 2.02, -0.70 + i * 0.13 - 0.045, -0.70 + i * 0.13 + 0.045, ROOF, ROOF + 0.07); }
    for (i = 0; i < 9; i++) { x = 1.85 - i * 0.11; K.box(D, x - 0.035, x + 0.035, 0.15, 1.10, ROOF, ROOF + 0.025); }
    K.box(P, 0.80, 1.92, 0.10, 1.15, ROOF, ROOF + 0.01);
    if (!raised) {
      K.cylZ(P, -1.00, 0.10, ROOF, ROOF + 0.05, 0.72, 24);
      K.cylZ(D, -1.00, 0.10, ROOF + 0.05, ROOF + 0.065, 0.62, 24);
      for (i = 0; i < 4; i++) { var a = i / 4 * TAU + 0.3; K.bar(D, [-1.00, 0.10, ROOF + 0.07], [-1.00 + Math.cos(a) * 0.62, 0.10 + Math.sin(a) * 0.62, ROOF + 0.07], 0.03); }
      K.box(B.team, -2.10, -1.96, -0.45, 0.45, ROOF, ROOF + 0.012);
    }
    /* the box on the left front (F1, F5): X 1.80 to 0.49, z 1.05 to 1.63, standing out 0.12, inside the track's outer edge (F5) */
    K.box(D, 0.49, 1.80, HW, HW + 0.12, 1.05, 1.63);
    K.box(D, 1.10, 1.14, HW + 0.12, HW + 0.13, 1.06, 1.62);
    /* the exhaust along the LEFT side: the silencer, its mesh guard, the pipe back and up the rear corner (F1) */
    y = HW + 0.10;
    K.cylX(D, 0.18, 0.49, y, 1.28, 0.07, 0.07, 10);
    K.box(D, -1.04, 0.18, HW, HW + 0.09, 1.21, 1.41);
    K.cylX(D, -2.30, -1.04, y, 1.30, 0.05, 0.05, 8);
    K.cyl(D, [-2.30, y, 1.30], [-2.42, y, 1.45], 0.05, 0.05, 8);
    K.cylZ(D, -2.42, y, 1.45, 2.12, 0.05, 8);
    K.box(D, -2.40, -2.30, y - 0.03, y + 0.03, 1.55, 1.62);
    /* grab rails and the side's plate seams (F1) */
    for (s = -1; s <= 1; s += 2) {
      K.box(D, -2.15, -0.20, s > 0 ? HW : -HW - 0.02, s > 0 ? HW + 0.02 : -HW, ROOF - 0.06, ROOF - 0.03);
      K.onSide(D, s, s * HW, -0.20, 1.40, 0.008, 0.34, 0.006);
    }
    /* the rear plate: the door hinged on the RIGHT (published), its hinges and handle; the bins either side
       (F1: X -2.27 to -2.55, z 1.30 to 1.70); the tail lamps */
    K.box(P, REAR - 0.05, REAR, -0.62, 0.46, 0.60, 1.62);
    for (i = 0; i < 3; i++) K.box(D, REAR - 0.08, REAR - 0.04, -0.68, -0.58, 0.70 + i * 0.40, 0.84 + i * 0.40);
    K.box(D, REAR - 0.09, REAR - 0.05, 0.30, 0.40, 1.05, 1.10);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? 0.55 : -1.25, y1 = s > 0 ? 1.25 : -0.72;
      K.box(P, -2.55, REAR, y0, y1, 1.30, 1.70);
      K.box(D, -2.56, -2.54, y0 + 0.05, y1 - 0.05, 1.62, 1.66);
      B.vc.col = K.RED; K.box(B.vc, REAR - 0.03, REAR, s * 1.18 - 0.05, s * 1.18 + 0.05, 1.12, 1.20);
    }
  }
  /* the commander's cupola as the "turret" (published: behind the driver; F5): origin on its ring at the roof */
  function cupola(B) {
    var P = B.paint, D = B.dark, i, a;
    K.cylZ(P, 0, 0, 0, 0.18, 0.40, 18);
    K.cylZ(P, 0, 0, 0.18, 0.24, 0.36, 18);
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      K.slab(P, [Math.cos(a) * 0.37, Math.sin(a) * 0.37, 0.12], [-Math.sin(a), Math.cos(a), 0], [Math.cos(a), Math.sin(a), 0], [0, 0, 1], 0.07, 0.04, 0.05);
      B.vc.col = K.GLASS; K.box(B.vc, Math.cos(a) * 0.41 - 0.03, Math.cos(a) * 0.41 + 0.03, Math.sin(a) * 0.41 - 0.03, Math.sin(a) * 0.41 + 0.03, 0.10, 0.15);
    }
    /* the hatch lid, closed */
    K.cylZ(P, -0.04, 0, 0.24, 0.28, 0.30, 16);
    K.box(D, -0.30, -0.24, -0.12, 0.12, 0.28, 0.31);
    /* the GPMG on its pintle (published height 2.28 m to the gun) */
    K.cylZ(D, 0.22, 0, 0.24, 0.40, 0.025, 8);
    K.mg(B, 0.02, 0, 0.47, 1.12);
    K.box(D, 0.08, 0.20, 0.04, 0.16, 0.40, 0.48);
    K.box(B.team, -0.20, -0.08, -0.15, 0.15, 0.24, 0.252);
  }

  /* ------------------------------------------------------------------ Abbot hull */
  /* A1 / A2 at D = 0.637 m: deck 1.60, guard 1.03; the nose 0.52 ahead of the sprocket; the shallow front deck
     rising from the nose plate's top (z 1.15) to the deck at X 1.91 (A2: 0.44 m in 0.78 m) */
  var AB = { NOSE: 2.69, NT: 1.15, DX: 1.91, DECK: 1.60, REAR: -2.25 };
  function abTop(x) { return x > AB.DX ? AB.DECK - (x - AB.DX) * (AB.DECK - AB.NT) / (AB.NOSE - AB.DX) : AB.DECK; }
  function abbotHull(B) {
    var P = B.paint, D = B.dark, s, i, x, z;
    K.prismY(P, [[AB.NOSE, 0.98], [2.25, BELLY], [-2.12, BELLY], [AB.REAR, 0.56], [AB.REAR, FEN], [AB.NOSE, FEN]], -LW, LW);
    /* the upper body: vertical sides over the tracks, the front deck sloping down to the nose plate */
    K.prismY(P, [[AB.NOSE, 0.98], [AB.NOSE, AB.NT], [AB.DX, AB.DECK], [AB.REAR, AB.DECK], [AB.REAR, FEN], [2.50, FEN], [2.62, 0.94]], -HW, HW);
    for (s = -1; s <= 1; s += 2) {
      K.box(D, AB.REAR, 2.55, s > 0 ? HW - 0.01 : -HW - 0.035, s > 0 ? HW + 0.035 : -HW + 0.01, FEN - 0.02, FEN + 0.03);
      K.box(B.dark, 2.62, 2.72, s * 0.75 - 0.06, s * 0.75 + 0.06, 0.82, 0.94);
      /* the mesh stowage baskets along the upper side (A1, A2), their frames */
      K.box(D, AB.REAR + 0.05, 1.75, s > 0 ? HW + 0.005 : -HW - 0.16, s > 0 ? HW + 0.16 : -HW - 0.005, 1.12, 1.52);
      K.box(P, AB.REAR + 0.03, 1.77, s > 0 ? HW + 0.15 : -HW - 0.175, s > 0 ? HW + 0.175 : -HW - 0.15, 1.10, 1.14);
      K.box(P, AB.REAR + 0.03, 1.77, s > 0 ? HW + 0.15 : -HW - 0.175, s > 0 ? HW + 0.175 : -HW - 0.15, 1.50, 1.54);
      for (i = 0; i < 8; i++) { x = 1.75 - i * 0.57; K.box(P, x - 0.025, x + 0.025, s > 0 ? HW + 0.15 : -HW - 0.175, s > 0 ? HW + 0.175 : -HW - 0.15, 1.10, 1.54); }
      /* the lamp clusters at the front corners on the nose plate's top (A1, A3) */
      K.lampCluster(B, AB.NOSE + 0.02, s * 0.95, 1.05);
      B.vc.col = K.RED; K.box(B.vc, AB.REAR - 0.03, AB.REAR, s * 1.15 - 0.05, s * 1.15 + 0.05, 1.42, 1.50);
    }
    /* the louvred engine deck on the front (A3), the driver's hatch front RIGHT with its periscopes */
    var a = Math.atan2(AB.DECK - AB.NT, AB.NOSE - AB.DX);
    for (i = 0; i < 10; i++) { x = 2.55 - i * 0.065; K.onSlope(D, x, 0.30, abTop(x), a, 0.02, 0.62, 0.012); }
    for (i = 0; i < 8; i++) { x = 1.80 - i * 0.09; K.box(D, x - 0.03, x + 0.03, -0.05, 0.95, AB.DECK, AB.DECK + 0.02); }
    K.cylZ(P, 1.45, -0.70, AB.DECK, AB.DECK + 0.05, 0.28, 16);
    for (i = -1; i <= 1; i++) { B.vc.col = K.GLASS; K.box(B.vc, 1.74, 1.78, -0.70 + i * 0.12 - 0.04, -0.70 + i * 0.12 + 0.04, AB.DECK, AB.DECK + 0.07); }
    /* the exhaust along the left side under the baskets (A1: the silencer) */
    K.cylX(D, -0.30, 0.90, HW + 0.08, 1.30, 0.08, 0.08, 10);
    /* the travel lock on the front deck (A1) */
    K.box(D, 2.20, 2.28, -0.20, 0.20, abTop(2.24), abTop(2.24) + 0.30);
    K.box(D, 2.18, 2.30, -0.22, 0.22, abTop(2.24) + 0.28, abTop(2.24) + 0.34);
    /* the rear plate: the big door, its hinges, the mudflaps (A2) */
    K.box(P, AB.REAR - 0.05, AB.REAR, -0.60, 0.50, 0.62, 1.50);
    for (i = 0; i < 2; i++) K.box(D, AB.REAR - 0.08, AB.REAR - 0.04, -0.66, -0.56, 0.75 + i * 0.50, 0.90 + i * 0.50);
    K.box(B.team, 1.00, 1.20, 0.30, 0.90, AB.DECK, AB.DECK + 0.012);
  }
  /* the Abbot turret (A1, A2, A3): a tall square box, its sides sloping in a little, the front face raked back
     above the gun; the ring centre X -0.40, roof 2.45 m; the 105 mm with the fume extractor and the double-baffle
     muzzle brake (A1: muzzle 3.61 m); the cupola on the right rear, a second hatch on the left; the smoke
     dischargers on the front corners (A3); the canvas bin on the left side and the box on the rear (A1, A2) */
  var ATX = -0.40, ATZ = 1.60, AGZ = 0.38;
  function abbotTurret(B) {
    var P = B.paint, D = B.dark, s;
    var T = 0.85;                                  /* roof 0.85 above the deck: 2.45 m */
    K.loftN(P, [K.oct(-1.26, 1.30, 1.06, 0.12, 0.0), K.oct(-1.26, 1.36, 1.04, 0.14, 0.42), K.oct(-1.24, 1.10, 0.96, 0.14, T)]);
    /* the mantlet and the gun: cradle, fume extractor, the long barrel, the double-baffle brake */
    K.box(P, 1.30, 1.52, -0.30, 0.30, AGZ - 0.24, AGZ + 0.22);
    K.cylX(D, 1.52, 2.10, 0, AGZ, 0.11, 0.10, 14);
    K.cylX(D, 2.10, 2.60, 0, AGZ, 0.075, 0.075, 12);
    K.cylX(D, 2.60, 3.02, 0, AGZ, 0.10, 0.10, 12);
    K.cylX(D, 3.02, 3.72, 0, AGZ, 0.068, 0.064, 12);
    K.cylX(D, 3.72, 4.01, 0, AGZ, 0.10, 0.10, 12);
    K.box(D, 3.80, 3.86, -0.13, 0.13, AGZ - 0.06, AGZ + 0.06);
    /* the cupola, right rear (A2), the hatch on the left */
    K.cylZ(P, -0.55, -0.48, T, T + 0.18, 0.34, 18);
    K.cylZ(D, -0.55, -0.48, T + 0.18, T + 0.22, 0.28, 16);
    K.box(D, -0.62, -0.50, -0.52, -0.44, T + 0.22, T + 0.28);
    K.cylZ(P, 0.10, 0.50, T, T + 0.10, 0.26, 16);
    K.box(P, 0.40, 0.70, -0.40, -0.05, T, T + 0.12);
    B.vc.col = K.GLASS; K.box(B.vc, 0.70, 0.71, -0.35, -0.10, T + 0.03, T + 0.10);
    for (s = -1; s <= 1; s += 2) {
      K.smoke(B, 1.05, s * 1.00, 0.48, 3, 0.10, s);
      /* the canvas bin hung on the left side (A1, A2: both sides), the stowage box on the rear */
      K.box(P, -1.10, 0.10, s > 0 ? 1.04 : -1.30, s > 0 ? 1.30 : -1.04, 0.20, 0.72);
      K.box(D, -1.10, 0.10, s > 0 ? 1.28 : -1.31, s > 0 ? 1.31 : -1.28, 0.66, 0.70);
    }
    K.box(P, -1.60, -1.24, -0.90, 0.90, 0.10, 0.78);
    K.box(D, -1.62, -1.58, -0.85, 0.85, 0.40, 0.44);
    K.box(B.team, -1.00, -0.85, -0.10, 0.60, T, T + 0.012);
  }

  /* ------------------------------------------------------------------ FV438 launcher box */
  /* S1: the box over the rear roof, its top 2.57 m, its front face sloping; on it the twin launcher bins lying
     fore and aft (to 2.69 m, published 2.7 m); the sight head (lowered, its mast retracted) at the box's front left; the round hatch
     outline on the left side */
  function fv438Top(B) {
    var P = B.paint, D = B.dark, s, BT = 2.57;
    K.prismY(P, [[-0.20, ROOF], [-2.22, ROOF], [-2.22, BT], [-0.62, BT]], -1.02, 1.02);
    for (s = -1; s <= 1; s += 2) K.box(D, -2.24, -0.60, s > 0 ? 0.99 : -1.04, s > 0 ? 1.04 : -0.99, BT - 0.04, BT);
    K.box(D, -2.24, -2.20, -1.04, 1.04, BT - 0.04, BT);
    for (s = -1; s <= 1; s += 2) {
      K.box(P, -2.05, -0.75, s * 0.45 - 0.20, s * 0.45 + 0.20, BT, BT + 0.10);
      K.box(D, -0.77, -0.73, s * 0.45 - 0.18, s * 0.45 + 0.18, BT + 0.01, BT + 0.09);
      K.box(D, -2.08, -0.72, s * 0.45 - 0.20, s * 0.45 + 0.20, BT + 0.10, BT + 0.12);
    }
    K.cylZ(D, -0.70, 0.80, BT, BT + 0.06, 0.10, 10);
    K.box(P, -0.82, -0.56, 0.68, 0.92, BT + 0.06, BT + 0.20);
    B.vc.col = K.GLASS; K.box(B.vc, -0.56, -0.55, 0.72, 0.88, BT + 0.09, BT + 0.17);
    K.cylY(D, -0.60, HW, HW + 0.02, 1.38, 0.30, 18);
    K.cylY(P, -0.60, HW, HW + 0.012, 1.38, 0.27, 18);
    K.box(B.team, -1.80, -1.60, -0.30, 0.30, BT + 0.12, BT + 0.132);
  }

  function build(THREE, C, which) {
    var T = K.materials(THREE, C, DBG), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T), RB = K.bins(T), i, wg, WB, tg;
    if (which === "abbot") abbotHull(HB); else fv432Hull(HB, which === "fv438");
    if (which === "fv438") fv438Top(HB);
    K.flush(THREE, g, HB);
    K.addTracks(RB, G);
    K.flush(THREE, g, RB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new K.Bin(T.wheel, false, true);
      K.addRoadWheel(WB, G, DBG.base);
      wg = K.group(THREE, "roadwheel", G.XW[i], 0, G.ZW);
      K.flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (which === "abbot") { abbotTurret(TB); tg = K.group(THREE, "turret", ATX, 0, ATZ); }
    else if (which === "fv432") { cupola(TB); tg = K.group(THREE, "turret", 1.05, -0.62, ROOF); }
    if (tg) { K.flush(THREE, tg, TB); g.add(tg); }
    return g;
  }
  return {
    fv432: function (THREE, M, C) { return build(THREE, C, "fv432"); },
    abbot: function (THREE, M, C) { return build(THREE, C, "abbot"); },
    fv438: function (THREE, M, C) { return build(THREE, C, "fv438"); }
  };
})();

/* ==================================================================================================== Warrior */
var HeroWarrior = (function () {
  "use strict";
  var K = HeroGbLightKit;
  var GRN = { base: "#4b5236", blots: ["#434a30", "#535a3d"], seed: 510, dis: true };
  /* the pitch pattern 1.03 / 0.94 / 1.11 / 0.93 / 1.00 of P = 0.752 m (W2, W3, W4); front sprocket, the rear idler
     set high (W2, W5), three return rollers mid-pitch 1-2, 3-4, 5-6 (W2) */
  var G = { XW: [1.54, 0.765, 0.058, -0.777, -1.476, -2.225], ZW: 0.37, RW: 0.30, RR: [1.15, -0.36, -1.85], RRZ: 0.90, RRR: 0.10,
            SPR: { x: 2.44, z: 0.63, r: 0.30 }, IDL: { x: -2.82, z: 0.76, r: 0.28 }, TY: 1.21, TW: 0.23 };
  /* hull: nose 3.18 (W4: 2.16 P ahead of wheel 1), tail -3.145 (1.22 P behind wheel 6); roof 2.16, the skirt's
     foot 1.04, the side shelf 1.42 (W2); the glacis 22 deg (W3) from the nose top 1.15 m to the roof */
  var NOSE = 3.18, NT = 1.12, REAR = -3.145, ROOF = 2.16, SK0 = 1.04, SH = 1.42, HW = 1.42, LW = 1.00, BELLY = 0.46;
  var GA = 22 * Math.PI / 180, GX = NOSE - (ROOF - NT) / Math.tan(GA);
  function top(x) { return x > GX ? ROOF - (x - GX) * Math.tan(GA) : ROOF; }

  function hull(B, fit) {
    var P = B.paint, D = B.dark, s, i, x, y, z;
    /* lower hull between the tracks, the nose plate raking back under the glacis (W1) */
    K.prismY(P, [[NOSE, NT], [NOSE - 0.10, 0.90], [2.70, BELLY], [-2.80, BELLY], [REAR, 0.70], [REAR, SK0], [NOSE, SK0]], -LW, LW);
    /* the upper hull, full width over the tracks: the vertical sides, the long glacis (W1, W2) */
    K.prismY(P, [[NOSE, SK0], [NOSE, NT], [GX, ROOF], [REAR, ROOF], [REAR, SK0]], -HW, HW);
    /* the skirt plates over the track's top run and the side shelf (W1, W2) */
    for (s = -1; s <= 1; s += 2) {
      var yo = s * (HW + 0.07);
      K.box(P, -3.05, 2.95, s > 0 ? HW : yo, s > 0 ? yo : -HW, SK0, SH);
      K.box(D, -3.05, 2.95, s > 0 ? yo - 0.005 : yo - 0.01, s > 0 ? yo + 0.01 : yo + 0.005, SH - 0.03, SH + 0.01);
      for (i = 0; i < 4; i++) { x = 2.40 - i * 1.50; K.onSide(D, s, yo, x, (SK0 + SH) / 2, 0.006, 0.17, 0.006); }
      /* the mesh baskets on the upper side (W2), the side door outline (W1) */
      K.box(D, -2.10, 0.10, s > 0 ? HW : -HW - 0.07, s > 0 ? HW + 0.07 : -HW, 1.72, 2.04);
      K.box(P, -2.12, 0.12, s > 0 ? HW + 0.06 : -HW - 0.08, s > 0 ? HW + 0.08 : -HW - 0.06, 1.68, 1.72);
      K.box(P, -2.12, 0.12, s > 0 ? HW + 0.06 : -HW - 0.08, s > 0 ? HW + 0.08 : -HW - 0.06, 2.04, 2.08);
      for (i = 0; i < 6; i++) { x = -2.10 + i * 0.44; K.box(P, x - 0.02, x + 0.02, s > 0 ? HW + 0.06 : -HW - 0.08, s > 0 ? HW + 0.08 : -HW - 0.06, 1.68, 2.08); }
      K.onSide(D, s, s * HW, 0.95, 1.80, 0.40, 0.22, 0.008);
      /* the mudflaps at the tail (W5) */
      K.box(D, REAR - 0.04, REAR, s * G.TY - G.TW, s * G.TY + G.TW, 0.45, SK0);
      /* the lamps on the nose (W1) and the tail (W5) */
      K.lampCluster(B, NOSE + 0.02, s * 1.15, NT - 0.10);
      B.vc.col = K.RED; K.box(B.vc, REAR - 0.03, REAR, s * 1.20 - 0.06, s * 1.20 + 0.06, 1.68, 1.76);
      B.vc.col = K.AMBER; K.box(B.vc, REAR - 0.03, REAR, s * 1.06 - 0.05, s * 1.06 + 0.05, 1.68, 1.76);
      K.box(D, NOSE - 0.05, NOSE + 0.08, s * 0.60 - 0.07, s * 0.60 + 0.07, 0.80, 0.95);
    }
    /* the glacis: the driver's hatch and periscope front LEFT, the engine grille front RIGHT (W1) */
    x = GX + 0.55; K.onSlope(P, x, 0.62, top(x), GA, 0.30, 0.28, 0.025);
    B.vc.col = K.GLASS; K.onSlope(B.vc, GX + 0.18, 0.62, top(GX + 0.18) + 0.03, GA, 0.03, 0.18, 0.04);
    for (i = 0; i < 9; i++) { x = GX + 0.35 + i * 0.11; K.onSlope(D, x, -0.55, top(x), GA, 0.03, 0.55, 0.012); }
    K.onSlope(P, GX + 1.25, -0.55, top(GX + 1.25), GA, 0.10, 0.60, 0.03);
    /* the roof: the turret ring collar; the troop hatches behind it; the long bins along the roof edges and the
       big bins on the rear corners (W2, W5) */
    K.cylZ(P, TX, 0, ROOF, ROOF + 0.04, 0.95, 24);
    for (s = -1; s <= 1; s += 2) {
      K.box(P, -2.30, -1.30, s > 0 ? 0.05 : -0.80, s > 0 ? 0.80 : -0.05, ROOF, ROOF + 0.05);
      K.box(D, -1.34, -1.30, s > 0 ? 0.10 : -0.75, s > 0 ? 0.75 : -0.10, ROOF + 0.05, ROOF + 0.08);
      K.box(P, -2.40, -1.10, s > 0 ? 0.92 : -1.40, s > 0 ? 1.40 : -0.92, ROOF, ROOF + 0.30);
      K.box(D, -2.40, -1.10, s > 0 ? 0.92 : -1.40, s > 0 ? 1.40 : -0.92, ROOF + 0.30, ROOF + 0.32);
      K.box(P, REAR + 0.02, -2.42, s > 0 ? 0.55 : -1.42, s > 0 ? 1.42 : -0.55, ROOF - 0.62, ROOF + 0.36);
      K.bar(D, [REAR - 0.01, s * 0.62, ROOF - 0.55], [REAR - 0.01, s * 1.35, ROOF + 0.28], 0.03);
      K.bar(D, [REAR - 0.01, s * 1.35, ROOF - 0.55], [REAR - 0.01, s * 0.62, ROOF + 0.28], 0.03);
    }
    /* the rear door between the corner bins (published, W5) */
    K.box(P, REAR - 0.05, REAR, -0.50, 0.50, 0.70, 1.95);
    K.box(D, REAR - 0.07, REAR - 0.04, 0.38, 0.46, 1.20, 1.30);
    K.box(B.team, -2.20, -2.05, -0.55, 0.55, ROOF + 0.05, ROOF + 0.062);
    if (fit === "e90") gulfApplique(B);
    if (fit === "e00") tesFit(B);
  }
  /* e90: the bolted applique panels along the hull side (W3): from z 0.80 to 1.88, the front end following the
     glacis; 0.10 m thick; the bolt heads */
  function gulfApplique(B) {
    var P = B.paint, D = B.dark, s, i, j, yo;
    for (s = -1; s <= 1; s += 2) {
      yo = s * (HW + 0.18);
      K.prismY(P, [[2.55, 0.80], [-3.05, 0.80], [-3.05, 1.88], [1.70, 1.88]], s > 0 ? HW + 0.08 : yo, s > 0 ? yo : -HW - 0.08);
      for (i = 0; i < 9; i++) K.onSide(D, s, yo, 1.55 - i * 0.55, 1.34, 0.008, 0.52, 0.006);
      for (i = 0; i < 9; i++) for (j = 0; j < 3; j++) K.onSide(D, s, yo, 1.40 - i * 0.55, 0.95 + j * 0.40, 0.02, 0.02, 0.012);
    }
  }
  /* e00 TES (W4): the lower skirt plates (z 0.41 to 1.00), the add-on armour in three rows of blocks on the upper
     side (to 1.93 m), the bar armour cages round the nose and the tail */
  function tesFit(B) {
    var P = B.paint, D = B.dark, S = B.sand, s, i, j, x, yo;
    for (s = -1; s <= 1; s += 2) {
      yo = s * (HW + 0.12);
      K.box(P, -2.95, 2.60, s > 0 ? HW + 0.06 : yo, s > 0 ? yo : -HW - 0.06, 0.41, 1.00);
      for (i = 0; i < 3; i++) K.onSide(D, s, yo, 1.70 - i * 1.65, 0.70, 0.01, 0.28, 0.006);
      for (j = 0; j < 3; j++)
        for (i = 0; i < 12; i++) {
          x = 1.95 - i * 0.43;
          if (j === 2 && x > 1.60) continue;
          K.box(S, x - 0.20, x + 0.20, s > 0 ? HW + 0.07 : -HW - 0.32, s > 0 ? HW + 0.32 : -HW - 0.07, 1.00 + j * 0.31, 1.29 + j * 0.31);
        }
      /* the front blocks raked to follow the glacis */
      K.prismY(S, [[2.85, 1.00], [2.20, 1.00], [2.20, 1.60], [2.40, 1.60]], s > 0 ? HW + 0.07 : -HW - 0.32, s > 0 ? HW + 0.32 : -HW - 0.07);
    }
    /* bar cages: the nose (W4: 0.55 m deep) and the tail (0.35 m) */
    var bars = function (x0, x1, z0, z1, ys) {
      var k, n = 9;
      for (k = 0; k <= n; k++) { var yy = -ys + 2 * ys * k / n; K.bar(D, [x1, yy, z0], [x1, yy, z1], 0.025); }
      K.bar(D, [x1, -ys, z0], [x1, ys, z0], 0.04); K.bar(D, [x1, -ys, z1], [x1, ys, z1], 0.04);
      for (k = -1; k <= 1; k += 2) { K.bar(D, [x0, k * ys, z0], [x1, k * ys, z0], 0.04); K.bar(D, [x0, k * ys, z1], [x1, k * ys, z1], 0.04); }
    };
    bars(NOSE, NOSE + 0.55, 0.85, 1.75, 1.45);
    bars(REAR, REAR - 0.35, 0.90, 2.30, 1.45);
  }
  /* the turret (W1, W2, W4): ring centre X -0.45, roof 0.62 above the hull roof (2.78 m), the sides sloping in,
     the front raked; the RARDEN low on the front, its muzzle 3.1 m ahead of the ring; the commander's and
     gunner's sight heads; the smoke dischargers on the front cheeks; the rear basket */
  var TX = -0.45, TR = 0.62, GZ = 0.18;
  function turret(B, fit) {
    var P = B.paint, D = B.dark, s, i;
    K.loftN(P, [K.oct(-1.05, 1.05, 1.00, 0.25, 0.0), K.oct(-1.10, 1.15, 0.98, 0.28, 0.30), K.oct(-1.05, 0.70, 0.80, 0.22, TR)]);
    /* the mantlet and the RARDEN: the thick jacket, the long thin barrel, the flash hider */
    K.box(P, 1.05, 1.30, -0.22, 0.22, GZ - 0.14, GZ + 0.16);
    K.cylX(D, 1.30, 1.75, 0, GZ, 0.075, 0.07, 12);
    K.cylX(D, 1.75, 3.00, 0, GZ, 0.035, 0.035, 10);
    K.cylX(D, 3.00, 3.12, 0, GZ, 0.05, 0.05, 10);
    K.cylX(D, 1.30, 1.50, 0.26, GZ + 0.05, 0.03, 0.03, 8);
    /* the two sight heads: gunner's front left, commander's front right; the hatches */
    K.box(P, 0.10, 0.50, 0.25, 0.60, TR, TR + 0.26);
    B.vc.col = K.GLASS; K.box(B.vc, 0.50, 0.51, 0.30, 0.55, TR + 0.10, TR + 0.22);
    K.box(P, -0.05, 0.35, -0.65, -0.28, TR, TR + 0.30);
    B.vc.col = K.GLASS; K.box(B.vc, 0.35, 0.36, -0.60, -0.33, TR + 0.12, TR + 0.25);
    K.cylZ(P, -0.55, 0.40, TR, TR + 0.05, 0.30, 16);
    K.cylZ(P, -0.55, -0.45, TR, TR + 0.05, 0.30, 16);
    for (s = -1; s <= 1; s += 2) K.smoke(B, 0.80, s * 0.95, 0.30, 4, 0.08, s);
    /* the rear basket (W4) */
    K.box(D, -1.50, -1.08, -0.80, 0.80, 0.20, 0.24);
    for (i = 0; i < 5; i++) K.box(D, -1.50 + i * 0.10, -1.48 + i * 0.10, -0.80, 0.80, 0.24, 0.50);
    K.box(D, -1.50, -1.08, -0.82, -0.78, 0.20, 0.50); K.box(D, -1.50, -1.08, 0.78, 0.82, 0.20, 0.50);
    K.box(B.team, -0.90, -0.75, -0.30, 0.30, TR, TR + 0.012);
    if (fit === "e00") {
      /* the TES turret: add-on plates on the cheeks and the sights' armoured boxes (W4) */
      for (s = -1; s <= 1; s += 2) K.prismX(B.sand, [[s * 0.98, 0.05], [s * 1.12, 0.05], [s * 1.02, 0.55], [s * 0.88, 0.55]], -0.90, 0.95);
      K.box(D, -1.20, 0.60, -0.92, 0.92, TR + 0.30, TR + 0.32);
    }
  }
  function build(THREE, C, fit) {
    var T = K.materials(THREE, C, GRN), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T), RB = K.bins(T), i, wg, WB, tg;
    hull(HB, fit);
    K.flush(THREE, g, HB);
    K.addTracks(RB, G);
    K.flush(THREE, g, RB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new K.Bin(T.wheel, false, true);
      K.addRoadWheel(WB, G, GRN.base);
      wg = K.group(THREE, "roadwheel", G.XW[i], 0, G.ZW);
      K.flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    turret(TB, fit);
    tg = K.group(THREE, "turret", TX, 0, ROOF);
    K.flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return {
    e80: function (THREE, M, C) { return build(THREE, C, "e80"); },
    e90: function (THREE, M, C) { return build(THREE, C, "e90"); },
    e00: function (THREE, M, C) { return build(THREE, C, "e00"); }
  };
})();

/* ==================================================================================================== Alvis 6x6 */
var HeroAlvis6 = (function () {
  "use strict";
  var K = HeroGbLightKit;
  var DBG = { base: "#353f2d", blots: ["#2f3828", "#3c4633"], seed: 601 };
  /* one chassis (R1, L1; D = 1.148 m): axles 1.66 m apart, tyres 0.574 m drawn 0.565 under load, 0.33 m wide,
     their centres +-1.06 (outer faces +-1.23 inside the published 2.54 m) */
  var AX = [1.66, 0, -1.66], R = 0.565, TYC = 1.06;
  var AXLE = { r: R, ty: TYC, th: 0.165, rim: 0.33, nuts: 10, lugs: 28 };
  var CH = 1.27, CHZ = 1.45, BELLY = 0.50;
  /* the lower hull: from the chine (+-1.27 at 1.45 m) down and in to the belly (+-0.62 at 0.50), between and over
     the wheels; the triangular plates between the axles (R1, L1) */
  function lowerHull(B, nose, tail, nz, tz) {
    var P = B.paint, D = B.dark, s, i;
    function sec(x, zt, w) { return [[x, -0.62, BELLY], [x, 0.62, BELLY], [x, 0.95, 0.95], [x, w, zt], [x, -w, zt], [x, -0.95, 0.95]]; }
    K.loftN(P, [sec(nose, nz, 1.10), sec(nose - 0.25, CHZ, CH), sec(tail + 0.25, CHZ, CH), sec(tail, tz, 1.12)]);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        var xc = (AX[i] + AX[i + 1]) / 2;
        K.slab(D, [xc, s * 1.115, 1.13], [1, 0, 0], [0, 0.34 * s, -0.94], [0, 0.94 * s, 0.34], 0.42, 0.26, 0.012);
        K.slab(P, [xc, s * 1.10, 1.13], [1, 0, 0], [0, 0.34 * s, -0.94], [0, 0.94 * s, 0.34], 0.38, 0.22, 0.02);
      }
      /* the chine's edge strip */
      K.box(D, tail + 0.25, nose - 0.25, s > 0 ? CH - 0.01 : -CH - 0.02, s > 0 ? CH + 0.02 : -CH + 0.01, CHZ - 0.03, CHZ + 0.01);
    }
  }
  function wheels(THREE, g, T, base) {
    for (var i = 0; i < AX.length; i++) {
      var WB = new K.Bin(T.wheel, false, true);
      K.addAxle(WB, AXLE, base);
      var wg = K.group(THREE, "roadwheel", AX[i], 0, R);
      K.flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
  }
  /* front mudguards over the front tyres (L1, L2): the sloped guard with the headlamp on top */
  function mudguard(B, s, x0, x1, z0, z1) {
    var P = B.paint;
    K.prismY(P, [[x1, z0], [x1 - 0.10, z1], [x0, z1 + 0.05], [x0, z0]], s > 0 ? 0.88 : -1.27, s > 0 ? 1.27 : -0.88);
  }

  /* ------------------------------------------------------------------ Saladin */
  /* L1 (X = (px - 1272) / 222, z = 0.565 + (1032 - py) / 222): nose 2.45, tail -2.50; the chine 1.45, the deck
     1.77; the upper sides leaning in from the chine to the deck edge (+-0.98); the rear deck sloping down to 1.45
     at the tail; the turret ring centre X -0.22 */
  var SL = { NOSE: 2.45, TAIL: -2.50, DECK: 1.77, DW: 0.98, TX: -0.22 };
  function sTop(x) { return x < -1.20 ? SL.DECK - (-1.20 - x) / 1.30 * 0.32 : (x > 1.55 ? SL.DECK - (x - 1.55) / 0.90 * 0.22 : SL.DECK); }
  function saladinHull(B) {
    var P = B.paint, D = B.dark, s, i, x, z;
    lowerHull(B, SL.NOSE, SL.TAIL, 1.20, 1.25);
    /* the upper hull: chine to deck, sides leaning in */
    function up(x) { var zt = sTop(x); return [[x, -CH, CHZ], [x, CH, CHZ], [x, SL.DW, zt], [x, -SL.DW, zt]]; }
    K.loftN(P, [up(SL.NOSE - 0.25), up(1.55), up(-1.20), up(SL.TAIL + 0.25)]);
    /* the glacis plate down to the nose, the driver's visor in the middle (L2) */
    K.prismY(P, [[SL.NOSE, 1.20], [SL.NOSE, 1.38], [SL.NOSE - 0.25, sTop(SL.NOSE - 0.25)], [SL.NOSE - 0.25, CHZ]], -0.98, 0.98);
    K.box(P, 2.00, 2.30, -0.30, 0.30, sTop(2.15) - 0.05, sTop(2.15) + 0.12);
    B.vc.col = K.GLASS; K.box(B.vc, 2.30, 2.31, -0.22, 0.22, sTop(2.15) + 0.02, sTop(2.15) + 0.09);
    for (s = -1; s <= 1; s += 2) {
      /* the front mudguards and headlamps (L1, L2), the rear mudguards */
      mudguard(B, s, 1.10, SL.NOSE + 0.02, CHZ - 0.02, CHZ + 0.10);
      K.lamp(B, SL.NOSE - 0.05, s * 1.05, CHZ + 0.24, 0.09);
      K.cylZ(D, SL.NOSE - 0.12, s * 1.05, CHZ + 0.10, CHZ + 0.16, 0.03, 6);
      mudguard(B, s, SL.TAIL - 0.02, -1.10, CHZ - 0.05, CHZ + 0.02);
      /* the stowage boxes on the upper sides (L1: X 0.44 to 1.36 and -0.78 to 0.10, the bin over the rear axle) */
      K.box(P, -1.25, -0.10, s > 0 ? 0.95 : -1.22, s > 0 ? 1.22 : -0.95, CHZ, CHZ + 0.30);
      K.box(P, 0.45, 1.40, s > 0 ? 0.95 : -1.22, s > 0 ? 1.22 : -0.95, CHZ, CHZ + 0.28);
      K.box(D, -1.25, -0.10, s > 0 ? 1.21 : -1.23, s > 0 ? 1.23 : -1.21, CHZ + 0.24, CHZ + 0.26);
      K.box(D, 0.45, 1.40, s > 0 ? 1.21 : -1.23, s > 0 ? 1.23 : -1.21, CHZ + 0.22, CHZ + 0.24);
      B.vc.col = K.RED; K.box(B.vc, SL.TAIL - 0.02, SL.TAIL + 0.02, s * 0.90 - 0.05, s * 0.90 + 0.05, 1.32, 1.38);
    }
    /* the louvred engine deck at the back (L3), the rear plate */
    for (i = 0; i < 9; i++) { x = -1.35 - i * 0.11; K.onSlope(D, x, 0, sTop(x), -Math.atan(0.32 / 1.30), 0.03, 0.70, 0.012); }
    K.box(B.team, 1.70, 1.82, -0.40, 0.40, sTop(1.76), sTop(1.76) + 0.012);
  }
  /* the Saladin turret (L1, L2): measured from the ring centre the body runs -0.82 to 0.86, roof 0.70 above the deck
     (2.47 m), the sides sloping in; the mantlet to 1.12; the 76 mm with its muzzle
     2.57 m ahead of the ring; the round bin on the rear (L1); the smoke dischargers on each side (L2); the
     cupola on the right, the Browning */
  function saladinTurret(B) {
    var P = B.paint, D = B.dark, s, GZ = 0.39, T = 0.70;
    K.loftN(P, [K.oct(-0.82, 0.82, 0.86, 0.22, 0.0), K.oct(-0.84, 0.86, 0.84, 0.24, 0.32), K.oct(-0.78, 0.62, 0.68, 0.20, T)]);
    K.box(P, 0.80, 1.00, -0.28, 0.28, GZ - 0.20, GZ + 0.20);
    K.cylX(P, 1.00, 1.12, 0, GZ, 0.17, 0.15, 14);
    K.cylX(D, 1.12, 2.50, 0, GZ, 0.055, 0.05, 12);
    K.cylX(D, 2.50, 2.57, 0, GZ, 0.065, 0.065, 12);
    /* the round stowage bin on the turret rear (L1) */
    K.cylY(P, -0.98, -0.35, 0.35, 0.42, 0.20, 16);
    for (s = -1; s <= 1; s += 2) K.smoke(B, 0.20, s * 0.86, 0.30, 3, 0.10, s);
    K.cylZ(P, -0.25, -0.38, T, T + 0.10, 0.30, 16);
    K.box(D, -0.48, -0.42, -0.62, -0.14, T + 0.10, T + 0.20);
    K.mg(B, -0.10, -0.38, T + 0.20, 0.90);
    K.cylZ(P, -0.25, 0.38, T, T + 0.05, 0.26, 16);
    K.box(B.team, -0.70, -0.58, -0.25, 0.25, T, T + 0.012);
  }

  /* ------------------------------------------------------------------ Saracen */
  /* R1 at the middle axle (265 px/m, front 253, rear 279): nose 2.32, tail -2.49; the bonnet over the engine
     (z 1.60 at the nose, louvred), the troop box from X 0.645 (its front face sloping to 0.44 at the roof) to the
     tail, roof 2.15 m; its sides leaning in a little from the chine (+-1.18 at 1.45) to the roof (+-1.02);
     the turret over X -0.40; the Bren ring at X -1.55 */
  var SR = { NOSE: 2.32, TAIL: -2.49, BON: 1.60, FX: 0.645, FXT: 0.44, ROOF: 2.15, TX: -0.40 };
  function saracenHull(B) {
    var P = B.paint, D = B.dark, s, i, x;
    lowerHull(B, SR.NOSE, SR.TAIL, 1.22, 1.00);
    /* the bonnet: from the chine up to 1.60 with its sides leaning in (R1, R2) */
    function bon(x, z) { return [[x, -CH, CHZ], [x, CH, CHZ], [x, 0.95, z], [x, -0.95, z]]; }
    K.loftN(P, [bon(SR.NOSE - 0.25, 1.55), bon(SR.FX, SR.BON)]);
    K.prismY(P, [[SR.NOSE, 1.22], [SR.NOSE, 1.52], [SR.NOSE - 0.25, 1.55], [SR.NOSE - 0.25, CHZ]], -0.95, 0.95);
    for (i = 0; i < 10; i++) { x = SR.NOSE - 0.02 - i * 0.025; K.box(D, x - 0.008, x + 0.008, -0.80, 0.80, 1.27, 1.48); }
    for (i = 0; i < 8; i++) { x = 1.95 - i * 0.14; K.box(D, x - 0.04, x + 0.04, -0.80, 0.80, SR.BON - 0.01, SR.BON + 0.015); }
    /* the troop box (R1): sides leaning in, the front face sloping back */
    function tb(x, zt) { return [[x, -1.18, CHZ], [x, 1.18, CHZ], [x, 1.02, zt], [x, -1.02, zt]]; }
    K.loftN(P, [tb(SR.FX, SR.BON + 0.02), tb(SR.FXT, SR.ROOF), tb(SR.TAIL, SR.ROOF)]);
    K.prismY(P, [[SR.FX + 0.02, CHZ], [SR.FX + 0.02, SR.BON + 0.02], [SR.FX - 0.05, SR.BON + 0.02], [SR.FX - 0.05, CHZ]], -1.18, 1.18);
    /* the driver's and commander's vision flaps on the box's front face, the vision flaps on the sides (R1) */
    var fa = Math.atan2(SR.ROOF - SR.BON, SR.FX - SR.FXT);
    for (s = -1; s <= 1; s += 2) {
      K.slab(D, [0.555, s * 0.45, 1.88], [-Math.cos(fa), 0, Math.sin(fa)], [0, 1, 0], [Math.sin(fa), 0, Math.cos(fa)], 0.12, 0.25, 0.02);
      [0.12, -0.70, -1.80].forEach(function (fx) {
        K.box(D, fx - 0.20, fx + 0.20, s > 0 ? 1.06 : -1.10, s > 0 ? 1.10 : -1.06, 1.88, 2.02);
      });
      mudguard(B, s, 1.15, SR.NOSE + 0.02, CHZ - 0.02, CHZ + 0.06);
      K.lamp(B, SR.NOSE - 0.05, s * 1.02, CHZ + 0.20, 0.09);
      B.vc.col = K.RED; K.box(B.vc, SR.TAIL - 0.02, SR.TAIL + 0.02, s * 1.05 - 0.05, s * 1.05 + 0.05, 1.55, 1.62);
    }
    /* the twin rear doors (R1, R2), their hinges */
    for (s = -1; s <= 1; s += 2) {
      K.box(P, SR.TAIL - 0.05, SR.TAIL, s > 0 ? 0.03 : -0.85, s > 0 ? 0.85 : -0.03, 1.05, 2.00);
      K.box(D, SR.TAIL - 0.08, SR.TAIL - 0.04, s * 0.80 - 0.05, s * 0.80 + 0.05, 1.20, 1.30);
      K.box(D, SR.TAIL - 0.08, SR.TAIL - 0.04, s * 0.80 - 0.05, s * 0.80 + 0.05, 1.75, 1.85);
    }
    /* the Bren ring at the back of the roof (R1) */
    K.cylZ(P, -1.55, 0, SR.ROOF, SR.ROOF + 0.07, 0.42, 20);
    K.cylZ(D, -1.55, 0, SR.ROOF + 0.07, SR.ROOF + 0.09, 0.36, 20);
    K.box(B.team, -2.30, -2.18, -0.50, 0.50, SR.ROOF, SR.ROOF + 0.012);
  }
  /* the Saracen's small turret (R1: 0.35 m tall, 0.96 m long): the box with its sides sloping, the two-door rear,
     the Browning */
  function saracenTurret(B) {
    var P = B.paint, D = B.dark;
    K.loftN(P, [K.oct(-0.48, 0.48, 0.46, 0.10, 0.0), K.oct(-0.40, 0.40, 0.38, 0.08, 0.35)]);
    K.box(P, 0.40, 0.52, -0.12, 0.12, 0.08, 0.26);
    K.cylX(D, 0.52, 1.05, 0, 0.17, 0.018, 0.018, 8);
    K.box(D, -0.43, -0.41, -0.30, 0.30, 0.04, 0.30);
    K.box(D, -0.05, 0.05, -0.40, 0.40, 0.35, 0.37);
    K.box(B.team, -0.30, -0.18, -0.20, 0.20, 0.35, 0.362);
  }

  /* ------------------------------------------------------------------ DETAIL PASS 2 (Saladin, Saracen)
     The fittings the first pass left out (classes L1-L3 and R1-R2 show; places and sizes by proportion,
     NOT CONFIRMED): the bins' lid hinges, latches and handles, the guards over the headlamps, the tools
     on the deck, lifting eyes, grab handles, the bolt row along the chine strip, the mudflaps, the rear
     towing hook and the lamps' guards, the hatches' hinges and handles, the round bin's straps, the
     cupola's vision blocks, aerial bases; on the Saracen the roof's grab rails, the vision flaps'
     hinges, the doors' handles and step, the tarpaulin rolled on the bonnet.  Paint: detailTex. */
  function commonDetail(B, nose, tail) {
    var DP = K.dp, D = B.dark, s;
    for (s = -1; s <= 1; s += 2) {
      DP.bolts(D, tail + 0.30, nose - 0.30, 22, s * CH, CHZ - 0.01, s, 0.011);
      DP.flap(D, AX[2] - R - 0.12, s > 0 ? 0.85 : -CH + 0.02, s > 0 ? CH - 0.02 : -0.85, 0.75, CHZ - 0.02);
      DP.flap(D, AX[0] - R - 0.10, s > 0 ? 0.85 : -CH + 0.02, s > 0 ? CH - 0.02 : -0.85, 0.80, CHZ - 0.02);
      DP.guard(D, nose - 0.07, s * 1.04, CHZ + (nose > 2.40 ? 0.24 : 0.20), 0.09, 1);
      DP.guard(D, tail + 0.05, s * 0.97, 1.40, 0.06, -1);
    }
    DP.hook(D, tail + 0.20, 0, 1.12, -1, 0.19);
  }
  function saladinDetail(B) {
    var DP = K.dp, P = B.paint, D = B.dark, s, i;
    commonDetail(B, SL.NOSE, SL.TAIL);
    for (s = -1; s <= 1; s += 2) {
      /* the side bins: hinges along the lids' inner edges, two latches and a handle on each face */
      DP.hingeTop(D, -1.20, -0.15, s * 0.97, s * 0.97, CHZ + 0.30);
      DP.hingeTop(D, 0.50, 1.35, s * 0.97, s * 0.97, CHZ + 0.28);
      for (i = 0; i < 2; i++) {
        K.box(D, -1.05 + i * 0.70, -0.99 + i * 0.70, s > 0 ? 1.22 : -1.245, s > 0 ? 1.245 : -1.22, CHZ + 0.14, CHZ + 0.22);
        K.box(D, 0.62 + i * 0.60, 0.68 + i * 0.60, s > 0 ? 1.22 : -1.245, s > 0 ? 1.245 : -1.22, CHZ + 0.12, CHZ + 0.20);
      }
      DP.grab(D, s, s * 1.22, -0.80, -0.55, CHZ + 0.08);
      /* the pick and shovel on the front deck, lifting eyes at the deck corners */
      DP.toolTop(P, D, s > 0 ? "shovel" : "pick", 0.75, 1.40, s * 0.80, SL.DECK);
      DP.eye(D, 1.50, s * 0.88, SL.DECK); DP.eye(D, -1.15, s * 0.88, SL.DECK);
      DP.grabTop(D, 0.75, 0.95, s * 0.30, s * 0.30, SL.DECK);
    }
    /* the driver's hatch hinge and handle */
    DP.hingeTop(D, 2.00, 2.00, -0.28, 0.28, sTop(2.15) + 0.12);
  }
  function saladinTurretDetail(B) {
    var DP = K.dp, P = B.paint, D = B.dark, s, i, T = 0.70, a;
    /* the round bin's straps and catches */
    for (i = 0; i < 2; i++) K.cylY(D, -0.98, -0.20 + i * 0.36, -0.16 + i * 0.36, 0.42, 0.21, 16);
    K.box(D, -1.20, -1.17, -0.06, 0.06, 0.38, 0.48);
    /* the cupola's vision blocks and hatch hinge, the loader's hatch hinge and handle */
    B.vc.col = K.GLASS;
    for (i = 0; i < 6; i++) { a = (i + 0.5) / 6 * K.TAU; K.box(B.vc, -0.25 + Math.cos(a) * 0.29 - 0.03, -0.25 + Math.cos(a) * 0.29 + 0.03, -0.38 + Math.sin(a) * 0.29 - 0.03, -0.38 + Math.sin(a) * 0.29 + 0.03, T + 0.03, T + 0.07); }
    DP.hingeTop(D, -0.50, -0.50, 0.20, 0.56, T + 0.05);
    DP.grabTop(D, -0.05, -0.05, 0.30, 0.46, T + 0.05);
    /* lifting eyes, grab handles on the cheeks, aerial bases at the rear */
    for (s = -1; s <= 1; s += 2) {
      DP.eye(D, 0.45, s * 0.55, T); DP.eye(D, -0.65, s * 0.55, T);
      DP.grab(D, s, s * 0.80, -0.55, -0.25, 0.40);
      DP.whip(D, -0.72, s * 0.45, T, 0.25);
    }
    /* the mantlet's bolt ring */
    for (i = 0; i < 8; i++) { a = i / 8 * K.TAU; K.cylX(D, 1.00, 1.03, Math.cos(a) * 0.20, 0.39 + Math.sin(a) * 0.15, 0.014, 0.014, 6); }
  }
  function saracenDetail(B) {
    var DP = K.dp, P = B.paint, D = B.dark, s, i;
    commonDetail(B, SR.NOSE, SR.TAIL);
    /* the tarpaulin rolled across the bonnet in front of the troop box */
    DP.rollY(P, D, SR.FX + 0.20, -0.85, 0.85, SR.BON + 0.11, 0.10);
    for (s = -1; s <= 1; s += 2) {
      /* the roof's grab rails, lifting eyes at its corners */
      DP.bar(D, [-2.30, s * 0.92, SR.ROOF + 0.06], [0.20, s * 0.92, SR.ROOF + 0.06], 0.014, 5);
      for (i = 0; i < 4; i++) DP.bar(D, [-2.30 + i * 0.833, s * 0.92, SR.ROOF], [-2.30 + i * 0.833, s * 0.92, SR.ROOF + 0.06], 0.012, 4);
      DP.eye(D, 0.35, s * 0.85, SR.ROOF); DP.eye(D, -2.40, s * 0.85, SR.ROOF);
      /* the side vision flaps' hinges */
      [0.12, -0.70, -1.80].forEach(function (fx) { DP.hingeTop(D, fx - 0.18, fx + 0.18, s * 1.09, s * 1.09, 2.00); });
      /* the doors' handles, the rear step */
      K.box(D, SR.TAIL - 0.08, SR.TAIL - 0.05, s * 0.15 - 0.02, s * 0.15 + 0.02, 1.45, 1.60);
      /* the tools on the bonnet sides */
      DP.toolTop(P, D, s > 0 ? "shovel" : "pick", 0.80, 1.60, s * 0.70, SR.BON);
      DP.grab(D, s, s * 1.17, -1.30, -1.05, 1.70);
    }
    K.box(D, SR.TAIL - 0.08, SR.TAIL, -0.60, 0.60, 0.95, 0.99);
    /* the Bren ring's mounting bolts */
    for (i = 0; i < 12; i++) { var a = i / 12 * K.TAU; K.cylZ(D, -1.55 + Math.cos(a) * 0.40, Math.sin(a) * 0.40, SR.ROOF + 0.07, SR.ROOF + 0.09, 0.015, 6); }
  }
  function saracenTurretDetail(B) {
    var DP = K.dp, D = B.dark, s;
    for (s = -1; s <= 1; s += 2) { DP.eye(D, 0.25, s * 0.30, 0.30); DP.grab(D, s, s * 0.42, -0.30, -0.10, 0.18); }
    DP.hingeTop(D, -0.40, -0.40, -0.25, 0.25, 0.30);
  }
  function build(THREE, C, which) {
    var T = K.materials(THREE, C, DBG), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T), tg, dt = K.detailTex(THREE, DBG);
    if (dt) T.paint.map = dt;
    if (which === "saladin") { saladinHull(HB); saladinDetail(HB); saladinTurret(TB); saladinTurretDetail(TB); tg = K.group(THREE, "turret", SL.TX, 0, SL.DECK); }
    else { saracenHull(HB); saracenDetail(HB); saracenTurret(TB); saracenTurretDetail(TB); tg = K.group(THREE, "turret", SR.TX, 0, SR.ROOF); }
    K.flush(THREE, g, HB);
    wheels(THREE, g, T, DBG.base);
    K.flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return {
    saladin: function (THREE, M, C) { return build(THREE, C, "saladin"); },
    saracen: function (THREE, M, C) { return build(THREE, C, "saracen"); }
  };
})();

/* ==================================================================================================== Ferret, Fox */
var HeroDaimler = (function () {
  "use strict";
  var K = HeroGbLightKit;
  var DBG = { base: "#353f2d", blots: ["#2f3828", "#3c4633"], seed: 701 };
  var GRN = { base: "#4b5236", blots: ["#434a30", "#535a3d"], seed: 721, dis: true };

  /* ------------------------------------------------------------------ Ferret Mk 2 */
  /* K1 at 181 px/m: X = (527.5 - px) / 181, z = (1821 - py) / 181: wheels +-1.146, r 0.447; nose 1.815, tail
     -2.058; the deck line 1.07; the lower hull's sides from the chine (1.02) to the belly (0.35); the fighting
     compartment X 1.0 to -0.77 rising to its roof (1.425) between X 0.666 and -0.511; the turret on it */
  var FE = { AX: [1.146, -1.146], R: 0.447, NOSE: 1.815, TAIL: -2.058, DECK: 1.07, CHZ: 1.02, BELLY: 0.35, RF: 1.425, TX: 0.06 };
  var FAXLE = { r: 0.447, ty: 0.80, th: 0.115, rim: 0.24, nuts: 8, lugs: 22 };
  function ferretHull(B) {
    var P = B.paint, D = B.dark, s, i, x;
    /* the lower boat hull: belly +-0.45, the chine +-0.75 under the deck */
    function lo(x, zb, zt) { return [[x, -0.45, zb], [x, 0.45, zb], [x, 0.75, FE.CHZ - 0.10], [x, 0.75, zt], [x, -0.75, zt], [x, -0.75, FE.CHZ - 0.10]]; }
    K.loftN(P, [lo(FE.NOSE, 0.76, 0.98), lo(1.59, 0.54, FE.DECK), lo(0.62, FE.BELLY, FE.DECK), lo(-0.66, FE.BELLY, FE.DECK), lo(-1.54, 0.41, FE.DECK + 0.02), lo(FE.TAIL, 0.95, 1.11)]);
    /* the mudguards and stowage bins over the wheels, out to the published width (K1 end views) */
    for (s = -1; s <= 1; s += 2) {
      K.prismY(P, [[1.82, 0.90], [1.30, 1.10], [0.70, 1.10], [0.70, 1.00], [1.75, 0.82]], s > 0 ? 0.74 : -0.955, s > 0 ? 0.955 : -0.74);
      K.prismY(P, [[-0.75, 1.10], [-1.60, 1.12], [-2.00, 1.00], [-0.75, 1.00]], s > 0 ? 0.74 : -0.955, s > 0 ? 0.955 : -0.74);
      K.box(P, -1.75, -0.90, s > 0 ? 0.74 : -0.96, s > 0 ? 0.96 : -0.74, 1.10, 1.32);
      K.box(D, -1.75, -0.90, s > 0 ? 0.95 : -0.97, s > 0 ? 0.97 : -0.95, 1.26, 1.28);
      K.lamp(B, 1.82, s * 0.62, 1.02, 0.08);
      B.vc.col = K.RED; K.box(B.vc, FE.TAIL - 0.02, FE.TAIL + 0.02, s * 0.62 - 0.04, s * 0.62 + 0.04, 0.98, 1.04);
    }
    /* the fighting compartment (K1): its faces sloping in to the roof */
    function fc(x, zt, w) { return [[x, -0.75, FE.DECK], [x, 0.75, FE.DECK], [x, w, zt], [x, -w, zt]]; }
    K.loftN(P, [fc(1.00, FE.DECK + 0.01, 0.73), fc(0.666, FE.RF, 0.56), fc(-0.511, FE.RF, 0.56), fc(-0.77, 1.18, 0.70)]);
    /* the driver's visor on the front face (K1), the engine louvres on the rear deck (K1 end view) */
    var a = Math.atan2(FE.RF - FE.DECK, 1.00 - 0.666);
    K.slab(P, [0.86, 0, 1.23], [-Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [Math.sin(a), 0, Math.cos(a)], 0.14, 0.30, 0.03);
    B.vc.col = K.GLASS; K.slab(B.vc, [0.89, 0, 1.25], [-Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [Math.sin(a), 0, Math.cos(a)], 0.03, 0.22, 0.03);
    for (i = 0; i < 10; i++) { x = -0.95 - i * 0.10; K.box(D, x - 0.03, x + 0.03, -0.60, 0.60, FE.DECK, FE.DECK + 0.02); }
    K.box(D, FE.TAIL - 0.02, FE.TAIL + 0.02, -0.55, 0.55, 0.98, 1.08);
    /* the spare wheel on the LEFT side (K1: hub X 0.04, z 0.74) */
    K.cylY(B.dark, 0.04, 0.75, 0.93, 0.74, 0.44, 22);
    K.cylY(P, 0.04, 0.93, 0.95, 0.74, 0.25, 16);
    K.box(B.team, -1.40, -1.25, -0.40, 0.40, FE.DECK + 0.02, FE.DECK + 0.032);
  }
  /* the Mk 2 turret (K1): base X 0.555 to -0.44 (+-0.495), roof 0.40 above the compartment roof (+-0.355), the
     front sloped; the .30 Browning on the front, muzzle at X 1.04 (0.98 ahead of the ring), 0.18 above the roof */
  function ferretTurret(B) {
    var P = B.paint, D = B.dark;
    K.loftN(P, [K.oct(-0.50, 0.50, 0.495, 0.12, 0.0), K.oct(-0.46, 0.42, 0.355, 0.09, 0.40)]);
    K.box(P, 0.40, 0.56, -0.12, 0.12, 0.10, 0.28);
    K.cylX(D, 0.56, 0.98, 0, 0.19, 0.017, 0.017, 8);
    K.cylZ(P, -0.10, 0, 0.40, 0.44, 0.24, 14);
    K.box(D, -0.36, -0.30, -0.20, 0.20, 0.44, 0.47);
    K.box(B.team, 0.10, 0.22, -0.18, 0.18, 0.40, 0.412);
  }

  /* ------------------------------------------------------------------ Fox */
  /* X1 at D = 1.0 m: X = (745 - px) / 285, z = (1138 - py) / 276: wheels +-1.14 (wheelbase 2.23 m), r 0.50; nose
     1.86; the tail plate -2.75 with the silencer across it; the deck line (the chine) 1.13; the upper body leaning
     in to its roof 1.59 from X 0.37 back; the front of it sloping from X 0.70 at 1.22; the engine deck raised at
     the back (1.66) with the louvred grille sloping down to the tail; the turret ring X -0.30 */
  var FX = { AX: [1.14, -1.14], R: 0.50, NOSE: 1.86, TAIL: -2.75, CHZ: 1.13, ROOF: 1.59, TX: -0.30 };
  var XAXLE = { r: 0.50, ty: 0.87, th: 0.15, rim: 0.28, nuts: 10, lugs: 24 };
  function foxHull(B) {
    var P = B.paint, D = B.dark, s, i, x;
    function lo(x, zb, zt) { return [[x, -0.52, zb], [x, 0.52, zb], [x, 0.72, FX.CHZ - 0.30], [x, 0.72, zt], [x, -0.72, zt], [x, -0.72, FX.CHZ - 0.30]]; }
    K.loftN(P, [lo(FX.NOSE, 0.86, 0.95), lo(1.60, 0.55, FX.CHZ), lo(0.55, 0.45, FX.CHZ), lo(-0.60, 0.45, FX.CHZ), lo(-1.70, 0.55, FX.CHZ), lo(FX.TAIL, 0.85, FX.CHZ)]);
    /* the deck over the wheels out to the published width, the mudguards (X1) */
    for (s = -1; s <= 1; s += 2) {
      K.prismY(P, [[1.86, 0.92], [1.60, FX.CHZ], [0.55, FX.CHZ], [0.55, FX.CHZ - 0.06], [1.55, FX.CHZ - 0.12]], s > 0 ? 0.70 : -1.06, s > 0 ? 1.06 : -0.70);
      K.prismY(P, [[-0.55, FX.CHZ], [-1.70, FX.CHZ], [-2.10, 0.95], [-0.55, FX.CHZ - 0.06]], s > 0 ? 0.70 : -1.06, s > 0 ? 1.06 : -0.70);
      /* the side panel between the wheels with its door (X1) */
      K.box(P, -0.55, 0.55, s > 0 ? 0.70 : -0.86, s > 0 ? 0.86 : -0.70, 0.45, FX.CHZ);
      K.box(D, -0.29, 0.29, s > 0 ? 0.86 : -0.87, s > 0 ? 0.87 : -0.86, 0.48, 1.06);
      K.lamp(B, 1.82, s * 0.66, 1.00, 0.08);
      /* the rear stowage bins over the rear wheels, the tail lamps (X1) */
      K.box(P, -2.70, -1.85, s > 0 ? 0.62 : -1.04, s > 0 ? 1.04 : -0.62, FX.CHZ, FX.CHZ + 0.28);
      B.vc.col = K.RED; K.box(B.vc, -2.72, -2.70, s * 0.90 - 0.04, s * 0.90 + 0.04, 1.20, 1.28);
    }
    /* the upper body: the front face sloping, the sides leaning in, the raised engine deck at the back */
    function up(x, zt, w) { return [[x, -0.98, FX.CHZ], [x, 0.98, FX.CHZ], [x, w, zt], [x, -w, zt]]; }
    K.loftN(P, [up(0.70, FX.CHZ + 0.09, 0.95), up(0.37, FX.ROOF, 0.80), up(-1.60, FX.ROOF, 0.80), up(-1.75, 1.66, 0.80), up(-2.35, 1.66, 0.80), up(-2.62, 1.30, 0.86)]);
    /* the driver's hatch on the front face (X2), the louvred grille on the rear slope (X1) */
    var a = Math.atan2(FX.ROOF - FX.CHZ - 0.09, 0.70 - 0.37);
    K.slab(P, [0.53, 0, 1.40], [-Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [Math.sin(a), 0, Math.cos(a)], 0.15, 0.32, 0.025);
    B.vc.col = K.GLASS; K.slab(B.vc, [0.62, 0, 1.30], [-Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [Math.sin(a), 0, Math.cos(a)], 0.02, 0.20, 0.03);
    var b = Math.atan2(1.66 - 1.30, 2.62 - 2.35);
    for (i = 0; i < 6; i++) { x = -2.40 - i * 0.04; K.slab(D, [x, 0, 1.66 - (-2.35 - x) * Math.tan(b) + 0.01], [Math.cos(b), 0, -Math.sin(b)].map(function (v) { return -v; }), [0, 1, 0], [-Math.sin(b), 0, Math.cos(b)], 0.015, 0.62, 0.012); }
    for (i = 0; i < 7; i++) { x = -1.80 - i * 0.075; K.box(D, x - 0.025, x + 0.025, -0.65, 0.65, 1.66, 1.68); }
    /* the exhaust silencer across the tail plate (X1) */
    K.cylY(D, FX.TAIL - 0.14, -0.70, 0.70, 1.05, 0.13, 14);
    K.box(B.team, -2.25, -2.10, -0.45, 0.45, 1.66, 1.672);
  }
  /* the Fox turret (X1, X2): base X 0.70 to -1.20 from the ring (+-0.78), roof 0.58 above the hull roof (2.17 m),
     sides sloping; the long RARDEN low on the front, muzzle 2.35 m ahead of the ring; the four smoke dischargers on
     each front cheek; the sight head, the commander's hatch; the rear basket */
  function foxTurret(B) {
    var P = B.paint, D = B.dark, s, GZ = 0.38, T = 0.58;
    K.loftN(P, [K.oct(-1.15, 0.85, 0.78, 0.22, 0.0), K.oct(-1.15, 0.90, 0.75, 0.24, 0.20), K.oct(-1.05, 0.55, 0.58, 0.18, T)]);
    K.box(P, 0.78, 0.98, -0.18, 0.18, GZ - 0.12, GZ + 0.12);
    K.cylX(D, 0.98, 1.40, 0, GZ, 0.065, 0.06, 12);
    K.cylX(D, 1.40, 2.25, 0, GZ, 0.033, 0.033, 10);
    K.cylX(D, 2.25, 2.35, 0, GZ, 0.048, 0.048, 10);
    for (s = -1; s <= 1; s += 2) K.smoke(B, 0.85, s * 0.72, 0.18, 4, 0.07, s);
    K.box(P, 0.05, 0.40, 0.20, 0.50, T, T + 0.12);
    B.vc.col = K.GLASS; K.box(B.vc, 0.40, 0.41, 0.25, 0.45, T + 0.03, T + 0.10);
    K.cylZ(P, -0.35, -0.30, T, T + 0.06, 0.30, 16);
    K.box(D, -1.55, -1.12, -0.60, 0.60, 0.16, 0.20);
    K.box(D, -1.57, -1.53, -0.60, 0.60, 0.20, 0.42);
    K.box(B.team, -0.85, -0.70, -0.25, 0.25, T, T + 0.012);
  }

  /* ------------------------------------------------------------------ DETAIL PASS
     The fittings the first pass left out, from K1 (Ferret Mk 2/3 four-view: the visor flaps on the
     compartment faces, the louvred tops of the mudguard bins, the bolted nose plate, the smoke dischargers
     and hatch on the turret, the lamps in their guards) and X1/X2 (Fox: the deep nose plate, the tow
     rope, lamps, indicators and mirrors on the front corners, the stowage boxes on the left deck, the door,
     the turret's searchlight, periscopes, stowage box and lifting eyes).  Sizes are from those views'
     proportions on the station tables above: NOT CONFIRMED. */
  var TAU = K.TAU, NUT = [0.20, 0.21, 0.18], TYREC = [0.13, 0.135, 0.125];
  var ROPE = [0.55, 0.45, 0.28], STEEL = [0.30, 0.31, 0.29], EXT = [0.45, 0.10, 0.08];
  /* a plate on a hull face leaning in from (yb, zb) to (yt, zt): centred at height z, x, out by off */
  function onLean(bin, s, x, z, yb, zb, yt, zt, hu, hv, hw, off) {
    var t = unit3([0, yt - yb, zt - zb]), n = [0, zt - zb, -(yt - yb)], y, f;
    n = unit3(n); f = (z - zb) / (zt - zb); y = yb + (yt - yb) * f;
    K.slab(bin, [x, s * (y + n[1] * (hw + off)), z + n[2] * (hw + off)], [1, 0, 0], [0, s * t[1], t[2]], [0, s * n[1], n[2]], hu, hv, hw);
  }
  function unit3(v) { var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  /* the guard round a headlamp: three bars over the face and a hoop */
  function lampGuard(B, x, y, z, r) {
    var i;
    for (i = -1; i <= 1; i++) K.box(B.dark, x + 0.002, x + 0.012, y + i * r * 0.6 - 0.006, y + i * r * 0.6 + 0.006, z - r * 1.1, z + r * 1.1);
    K.box(B.dark, x - 0.10, x + 0.012, y - r * 1.1, y + r * 1.1, z + r * 1.1, z + r * 1.1 + 0.012);
  }
  /* a lifting eye standing on a deck */
  function eye(B, x, y, z) { K.box(B.dark, x - 0.035, x + 0.035, y - 0.012, y + 0.012, z, z + 0.05); K.cylY(B.dark, x, y - 0.014, y + 0.014, z + 0.05, 0.03, 8); }
  /* a tyre's lug ring for a spare wheel carried with its axle along Y */
  function spareLugs(W, x, y, z, R, th, n) {
    var i, a, ca, sa;
    for (i = 0; i < n; i++) {
      a = i / n * TAU; ca = Math.cos(a); sa = Math.sin(a);
      K.slab(W, [x + ca * (R - 0.01), y + (i % 2 ? 0.35 : -0.35) * th, z + sa * (R - 0.01)], [ca, 0, sa], [-sa, 0, ca], [0, 1, 0], 0.022, R * 0.075, th * 0.6);
    }
  }
  function ferretDetail(B) {
    var P = B.paint, D = B.dark, s, i, x;
    for (s = -1; s <= 1; s += 2) {
      /* the visor flaps on the compartment's side faces, hinged along their tops (K1 top and side views) */
      [0.36, -0.22].forEach(function (vx) {
        onLean(P, s, vx, 1.26, 0.75, FE.DECK, 0.56, FE.RF, 0.15, 0.075, 0.018, 0.0);
        onLean(D, s, vx, 1.345, 0.75, FE.DECK, 0.56, FE.RF, 0.15, 0.012, 0.012, 0.02);
        onLean(D, s, vx, 1.21, 0.75, FE.DECK, 0.56, FE.RF, 0.11, 0.008, 0.006, 0.035);
      });
      /* a grab handle on each side face, bolt heads along the compartment's foot */
      onLean(D, s, 0.08, 1.30, 0.75, FE.DECK, 0.56, FE.RF, 0.10, 0.008, 0.008, 0.06);
      for (x = 0.92; x > -0.72; x -= 0.12) K.box(D, x - 0.012, x + 0.012, s * 0.745 - 0.012, s * 0.745 + 0.012, FE.DECK + 0.015, FE.DECK + 0.04);
      /* the louvred tops of the front mudguard bins (K1 top view) */
      for (i = 0; i < 7; i++) { x = 0.80 + i * 0.07; K.box(D, x - 0.015, x + 0.015, s > 0 ? 0.78 : -0.93, s > 0 ? 0.93 : -0.78, 1.10, 1.115); }
      /* the rear bin's lid hinge and two latches */
      K.box(D, -1.75, -0.90, s > 0 ? 0.74 : -0.80, s > 0 ? 0.80 : -0.74, 1.32, 1.335);
      K.box(D, -1.50, -1.44, s > 0 ? 0.955 : -0.97, s > 0 ? 0.97 : -0.955, 1.18, 1.27);
      K.box(D, -1.20, -1.14, s > 0 ? 0.955 : -0.97, s > 0 ? 0.97 : -0.955, 1.18, 1.27);
      /* the headlamp guards and the side lamps on the mudguards' front corners */
      lampGuard(B, 1.82, s * 0.62, 1.02, 0.08);
      B.vc.col = K.AMBER; K.box(B.vc, 1.30, 1.36, s * 0.90 - 0.03, s * 0.90 + 0.03, 1.10, 1.15);
      /* the front tow hooks under the nose, the lifting eyes on the deck corners */
      K.box(D, 1.70, 1.80, s * 0.36 - 0.03, s * 0.36 + 0.03, 0.62, 0.74);
      K.cylY(D, 1.78, s * 0.36 - 0.035, s * 0.36 + 0.035, 0.64, 0.04, 8);
      eye(B, 1.25, s * 0.66, FE.DECK);
      eye(B, -1.85, s * 0.62, FE.DECK + 0.02);
      /* the rear lamp's guard plate */
      K.box(D, FE.TAIL + 0.0, FE.TAIL + 0.06, s * 0.62 - 0.07, s * 0.62 + 0.07, 1.05, 1.06);
    }
    /* the bolted nose plate (K1 front view: two rows of bolt heads across it) */
    for (i = 0; i < 9; i++) for (s = 0; s < 2; s++) K.cylX(D, FE.NOSE - 0.02, FE.NOSE + 0.012, -0.48 + i * 0.12, 0.84 + s * 0.09, 0.02, 0.02, 6);
    /* the rear towing pintle */
    K.box(D, FE.TAIL + 0.02, FE.TAIL + 0.14, -0.05, 0.05, 0.90, 0.96);
    K.cylZ(D, FE.TAIL + 0.05, 0, 0.84, 0.96, 0.03, 8);
    /* the spare wheel's tread, nuts and clamp on the left (K1) */
    B.vc.col = TYREC; spareLugs(B.vc, 0.04, 0.84, 0.74, 0.44, 0.09, 22);
    B.vc.col = NUT;
    for (i = 0; i < 8; i++) { var a = i / 8 * TAU; K.cylY(B.vc, 0.04 + Math.cos(a) * 0.19, 0.95, 0.965, 0.74 + Math.sin(a) * 0.19, 0.016, 6); }
    K.cylY(D, 0.04, 0.95, 0.97, 0.74, 0.06, 10);
  }
  function ferretTurretDetail(B) {
    var P = B.paint, D = B.dark, s, i;
    for (s = -1; s <= 1; s += 2) {
      /* the three smoke dischargers on each front cheek (K1 Mk 2/3 front view) */
      K.smoke(B, 0.30, s * 0.44, 0.22, 3, 0.07, s);
      K.box(D, 0.20, 0.32, s * 0.36, s * 0.52, 0.16, 0.20);
      /* lifting eyes on the roof edge, a vision block in each side face */
      eye(B, -0.30, s * 0.30, 0.40);
      K.box(D, 0.05, 0.18, s * 0.43 - 0.012, s * 0.43 + 0.012, 0.26, 0.30);
    }
    /* the roof hatch's hinges and handle, a periscope ahead of it */
    K.cylY(D, -0.36, -0.16, 0.16, 0.47, 0.02, 8);
    K.box(D, 0.08, 0.12, -0.06, 0.06, 0.44, 0.47);
    K.box(D, 0.20, 0.30, -0.08, 0.08, 0.40, 0.48);
    B.vc.col = K.GLASS; K.box(B.vc, 0.30, 0.305, -0.06, 0.06, 0.42, 0.46);
    /* the Browning's cradle and ammunition box on the right */
    K.box(D, 0.56, 0.68, -0.05, 0.05, 0.14, 0.24);
    K.box(D, 0.40, 0.56, -0.24, -0.12, 0.14, 0.26);
    /* the rolled lip round the turret base */
    for (i = 0; i < 8; i++) {
      var o = K.oct(-0.50, 0.50, 0.495, 0.12, 0.0), A = o[i], Bb = o[(i + 1) % o.length];
      K.bar(P, [A[0], A[1], 0.015], [Bb[0], Bb[1], 0.015], 0.015);
    }
  }
  function foxDetail(B) {
    var P = B.paint, D = B.dark, s, i, x, k;
    for (s = -1; s <= 1; s += 2) {
      /* the lamps in their guards, the indicators beside them, the mirrors on stalks (X2) */
      lampGuard(B, 1.82, s * 0.66, 1.00, 0.08);
      B.vc.col = K.RED; K.cylX(B.vc, 1.70, 1.76, s * 0.88, 1.07, 0.035, 0.035, 10);
      B.vc.col = K.AMBER; K.cylX(B.vc, 1.70, 1.76, s * 0.88, 0.99, 0.03, 0.03, 10);
      K.box(D, 1.62, 1.70, s * 0.88 - 0.05, s * 0.88 + 0.05, 0.95, 1.12);
      K.cylZ(D, 1.45, s * 0.98, FX.CHZ - 0.04, 1.48, 0.012, 6);
      K.bar(D, [1.45, s * 0.98, 1.48], [1.38, s * 1.02, 1.56], 0.01);
      K.box(D, 1.35, 1.38, s * 0.94, s * 1.05, 1.50, 1.72);
      /* the door in the side panel: its frame, hinges and handle (X1) */
      K.box(P, -0.33, 0.33, s > 0 ? 0.865 : -0.88, s > 0 ? 0.88 : -0.865, 0.46, 0.49);
      K.box(P, -0.33, 0.33, s > 0 ? 0.865 : -0.88, s > 0 ? 0.88 : -0.865, 1.05, 1.08);
      K.box(P, 0.29, 0.33, s > 0 ? 0.865 : -0.88, s > 0 ? 0.88 : -0.865, 0.46, 1.08);
      K.box(P, -0.33, -0.29, s > 0 ? 0.865 : -0.88, s > 0 ? 0.88 : -0.865, 0.46, 1.08);
      for (k = 0; k < 2; k++) K.cylZ(D, 0.26, s * 0.885, 0.58 + k * 0.32, 0.68 + k * 0.32, 0.022, 8);
      K.box(D, -0.24, -0.20, s > 0 ? 0.87 : -0.91, s > 0 ? 0.91 : -0.87, 0.74, 0.84);
      /* the deep nose plate's ends and the tow hooks under it (X2) */
      K.box(D, 1.74, 1.84, s * 0.40 - 0.03, s * 0.40 + 0.03, 0.66, 0.78);
      K.cylY(D, 1.82, s * 0.40 - 0.04, s * 0.40 + 0.04, 0.68, 0.045, 8);
      /* lifting eyes on the deck, bolt heads along the upper body's foot */
      eye(B, 1.20, s * 0.80, FX.CHZ);
      eye(B, -2.05, s * 0.66, FX.CHZ + 0.28);
      for (x = 0.62; x > -2.55; x -= 0.15) K.box(D, x - 0.012, x + 0.012, s * 0.985 - 0.012, s * 0.985 + 0.012, FX.CHZ + 0.01, FX.CHZ + 0.035);
      /* the rear bins' lids: hinge strip and two latches each */
      K.box(D, -2.70, -1.85, s > 0 ? 0.62 : -0.68, s > 0 ? 0.68 : -0.62, FX.CHZ + 0.28, FX.CHZ + 0.295);
      K.box(D, -2.45, -2.39, s > 0 ? 1.04 : -1.06, s > 0 ? 1.06 : -1.04, FX.CHZ + 0.12, FX.CHZ + 0.22);
      K.box(D, -2.10, -2.04, s > 0 ? 1.04 : -1.06, s > 0 ? 1.06 : -1.04, FX.CHZ + 0.12, FX.CHZ + 0.22);
    }
    /* the deep plate across the nose (X2) */
    K.box(P, 1.80, 1.86, -1.02, 1.02, 0.80, 0.96);
    /* two stowage boxes on the left deck behind the turret, lids and latches (X2) */
    [[-1.78, -1.24], [-1.20, -0.66]].forEach(function (b) {
      K.box(P, b[0], b[1], 0.80, 1.04, FX.CHZ, FX.CHZ + 0.26);
      K.box(D, b[0] + 0.02, b[1] - 0.02, 0.80, 1.045, FX.CHZ + 0.22, FX.CHZ + 0.235);
      K.box(D, (b[0] + b[1]) / 2 - 0.04, (b[0] + b[1]) / 2 + 0.04, 1.04, 1.055, FX.CHZ + 0.14, FX.CHZ + 0.21);
    });
    /* the tow rope coiled on the front deck either side of the hatch (X2), the fire extinguisher (X2) */
    B.vc.col = ROPE;
    for (k = -1; k <= 1; k += 2) for (i = 0; i < 14; i++) {
      var a0 = i / 14 * TAU, a1 = (i + 1) / 14 * TAU, cx = 1.36, cy = k * 0.42, r = 0.20, z0 = FX.CHZ + 0.035;
      K.cyl(B.vc, [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r, z0], [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, z0], 0.03, 0.03, 6);
      K.cyl(B.vc, [cx + Math.cos(a0) * r * 0.75, cy + Math.sin(a0) * r * 0.75, z0 + 0.04], [cx + Math.cos(a1) * r * 0.75, cy + Math.sin(a1) * r * 0.75, z0 + 0.04], 0.03, 0.03, 6);
    }
    B.vc.col = EXT; K.cyl(B.vc, [1.05, -0.88, FX.CHZ + 0.04], [1.40, -0.92, FX.CHZ + 0.10], 0.055, 0.055, 10);
    /* the driver's hatch hinges and periscope (X2) */
    K.box(D, 0.36, 0.42, -0.30, 0.30, FX.ROOF - 0.01, FX.ROOF + 0.03);
    K.box(D, 0.40, 0.52, -0.10, 0.10, FX.ROOF - 0.10, FX.ROOF + 0.02);
    /* the rear towing pintle */
    K.box(D, FX.TAIL - 0.10, FX.TAIL + 0.02, -0.06, 0.06, 0.70, 0.78);
    K.cylZ(D, FX.TAIL - 0.08, 0, 0.64, 0.80, 0.035, 8);
  }
  function foxTurretDetail(B) {
    var P = B.paint, D = B.dark, s, i, T = 0.58;
    /* the searchlight on the roof's right (X2) */
    K.box(D, 0.10, 0.20, -0.53, -0.47, T, T + 0.06);
    K.cylX(P, 0.04, 0.26, -0.50, T + 0.12, 0.07, 0.075, 14);
    B.vc.col = K.LAMP; K.cylX(B.vc, 0.26, 0.27, -0.50, T + 0.12, 0.06, 0.06, 14);
    /* the commander's cupola periscopes and hatch hinge */
    for (i = 0; i < 5; i++) {
      var a = (i / 5) * TAU + 0.3, cx = -0.35 + Math.cos(a) * 0.27, cy = -0.30 + Math.sin(a) * 0.27;
      K.box(D, cx - 0.04, cx + 0.04, cy - 0.04, cy + 0.04, T + 0.06, T + 0.11);
    }
    K.cylY(D, -0.62, -0.45, -0.15, T + 0.07, 0.022, 8);
    /* the stowage box on the turret's left side, its lid strip (X2) */
    K.box(P, -0.95, -0.35, 0.74, 0.86, 0.06, 0.34);
    K.box(D, -0.95, -0.35, 0.74, 0.865, 0.31, 0.325);
    /* lifting eyes on the roof corners, the aerial bases at the rear */
    for (s = -1; s <= 1; s += 2) { eye(B, 0.30, s * 0.42, T); eye(B, -0.90, s * 0.45, T); }
    K.cylZ(D, -1.00, 0.30, T, T + 0.12, 0.04, 8);
    K.cylZ(D, -1.00, -0.10, T, T + 0.12, 0.04, 8);
    /* the RARDEN's cradle collar and the sight-head's armoured shutters */
    K.cylX(D, 0.98, 1.08, 0, 0.38, 0.09, 0.09, 12);
    K.box(D, 0.40, 0.42, 0.22, 0.48, T + 0.10, T + 0.12);
  }

  function build(THREE, C, which) {
    var fe = which === "ferret", PA = fe ? DBG : GRN, V = fe ? FE : FX, AXL = fe ? FAXLE : XAXLE;
    var T = K.materials(THREE, C, PA), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T), i, wg, WB, tg;
    var dt = K.detailTex(THREE, PA);
    if (dt) T.paint.map = dt;
    if (fe) { ferretHull(HB); ferretDetail(HB); ferretTurret(TB); ferretTurretDetail(TB); tg = K.group(THREE, "turret", FE.TX, 0, FE.RF); }
    else { foxHull(HB); foxDetail(HB); foxTurret(TB); foxTurretDetail(TB); tg = K.group(THREE, "turret", FX.TX, 0, FX.ROOF); }
    K.flush(THREE, g, HB);
    for (i = 0; i < V.AX.length; i++) {
      WB = new K.Bin(T.wheel, false, true);
      K.addAxle(WB, AXL, PA.base);
      wg = K.group(THREE, "roadwheel", V.AX[i], 0, V.R);
      K.flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    K.flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return {
    ferret: function (THREE, M, C) { return build(THREE, C, "ferret"); },
    fox: function (THREE, M, C) { return build(THREE, C, "fox"); }
  };
})();

/* len: the measured X extent of each build (dump.js) */
UNIT_MODELS["gbr_e60_ifv"] = { len: 5.22, build: HeroFv430.fv432 };
UNIT_MODELS["gbr_e60_spg"] = { len: 5.94, build: HeroFv430.abbot };
UNIT_MODELS["gbr_e60_tankdestroyer"] = { len: 5.22, build: HeroFv430.fv438 };
UNIT_MODELS["gbr_e80_ifv"] = { len: 6.49, build: HeroWarrior.e80 };
UNIT_MODELS["gbr_e90_ifv"] = { len: 6.49, build: HeroWarrior.e90 };
UNIT_MODELS["gbr_e00_ifv"] = { len: 7.27, build: HeroWarrior.e00 };
UNIT_MODELS["gbr_e50_lighttank"] = { len: 4.99, build: HeroAlvis6.saladin };
UNIT_MODELS["gbr_e50_ifv"] = { len: 4.91, build: HeroAlvis6.saracen };
UNIT_MODELS["gbr_e50_recon"] = { len: 3.91, build: HeroDaimler.ferret };
UNIT_MODELS["gbr_e60_recon"] = { len: 5.07, build: HeroDaimler.fox };
