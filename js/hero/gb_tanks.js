/* ========== gb_tanks.js - HERO models: the British main battle tanks, 1950-2010 ==========
   One file, one shared kit, a module per family (HeroGBTanks.centurion / .conqueror /
   .chieftain / .challenger):
     gbr_e50_mbt    Centurion Mk 3: the 20-pounder (plain tube), the Horstmann suspension in
                    three two-wheel bogies a side, the side plates ("bazooka plates").
     gbr_e50_heavy  FV214 Conqueror: the 120 mm L1 with its fume extractor, the big cast turret
                    with the commander's fire control turret and rangefinder at its rear, the
                    long hull, eight wheels in four bogies, the side bins and skirts.
     gbr_e60_mbt    Chieftain Mk 2 (the row's 1967 service model): the long shallow glacis
                    with the reclined driver's hatch on the centreline, the 120 mm L11 with
                    its thermal sleeve and the 12.7 mm ranging gun above it, the IR searchlight
                    box on the left of the turret, the NBC pack across the turret rear.
     gbr_e80_mbt    Challenger 1, green with black disruptive patches (1980s BAOR).
     gbr_e90_mbt    Challenger 1, desert sand (the row's text is the 1991 Gulf war).
     gbr_e90_heavy  Challenger 2 (1998), green/black.  gbr_e00_mbt Challenger 2, desert sand
                    (Basra 2003).  Both: the L30A1, the slab-sided turret and its sights.
     gbr_e00_heavy  Challenger 2 TES "Megatron", desert sand: the side armour packs, the bar
                    armour on the rear third, across the back and round the turret bustle, the
                    glacis block, the turret side armour, the RWS and the mast.
   Challenger 1 and 2 share the hull plan and running gear (one table, measured on P-K1); the
   deck heights differ, see DISAGREEMENTS.

   References, Wikimedia Commons, cached in scratchpad/q_gbmbt_ref (file in brackets):
     P-C1 "Centurion cfb borden 3.JPG" (cent_borden) - Canadian Centurion, left side, square on,
          WITH the side plates: their three panels, the lower edge rising at both ends, the
          long cylinder on each rear track guard.  Its gun is traversed (see below).
     P-C2 "Centurion Tank RAF Museum Cosford (1).jpg" (cent_cosford) - square side-on, NO side
          plates: THE measuring photograph for the Centurion (below).
     P-C3 "Centurion Mk 3 front-left 2017 Bovington.jpg" (cent_fl) - Mk 3 with the 20-pdr:
          the plain tube without fume extractor, the beak of the two glacis plates, the turned
          down track guard ends, the bins, the mantlet cover, the smoke dischargers, the bogies.
     P-C4 "Centurion MK III Seite - Schweizer Armee - Steel Parade 2006.jpg" (cent_side_ch) -
          a running Mk III with the side plates, oblique: plates and turret shapes only.
     P-Q1 "British Army of the Rhine Conqueror Tank in 1962.jpg" (con_1962) - in service,
          front left: eight small road wheels, the side bins over the skirt, the wedge front
          track guards, the headlamps, the fume extractor, the dischargers.
     P-Q2 "Conqueror in the Kubinka Museum.jpg" (con_kub) - front: glacis, headlamps in guards,
          the wedge guards, the cast turret and mantlet, the cupola.
     P-Q3 "FV214 Conqueror Mk.1 at Musee des Blindes, Saumur ... (53352006784).jpg"
          (con_saumur1), P-Q4 "Bovington 154 Conqueror 1.jpg" (con_bov) - front left: the
          turret's shape, the six-tube dischargers at its rear flanks, the gun.
     P-Q5 "FV214 Tank Heavy Gun, Conqueror Mark 1.jpg" (con_mk1a) - the turret from above
          and behind: the fire control turret, the louvred engine deck.
     P-Q6 "Conqueror FV214 tank.jpg" (con_side) - oblique side: wheel spacing (paired).
     P-F1 "Chieftain Tank on Heavy Vehicle Trailer.jpg" (chf_trailer) - early Chieftain, right
          side about 35 deg off square, turret reversed: the six wheels in three pairs, the
          raised idler and sprocket, three return rollers, the turret's length.
     P-F2 "Chieftain MkII of the Royal Scots Dragoon Guards pic2.JPG" (chf_mk2) - a Mk 2 from
          the rear left: the side plates, the rear silencer box, the deck louvres.
     P-F3 "Chieftain tank outside Ashchurch depot.jpg" (chf_ash) - left side, oblique: the
          searchlight box, the L11 with its sleeve and extractor 0.50-0.74 out.
     P-F4 "Een colonne Engelse Chieftain tanks.jpg" (chf_col) - Chieftains in service, side
          plates fitted, the NBC pack, the paint.
     P-K1 "Challenger 1 Tank, Bovington Tank Museum - Dorset..jpg" (cr1_bov) - CR1, left side,
          square on, gun forward: THE measuring photograph for the Challenger hull.
     P-K2 "Challenger tank side view, near Clouds Hill - geograph.org.uk - 1759960.jpg"
          (cr2_side) - CR2, right side, gun forward, a little ahead of square and nose-up
          about 6 deg on a bump: the turret, the skirts, the fuel drums, the gun.
     P-T1 "Challenger 2-Megatron MOD 45161491.jpg" (tes_1), P-T2 "Challenger 2-Megatron MOD
          45161488.jpg" (tes_2) - TES from the rear left and the front right.
   Published (en.wikipedia raw): Centurion (Handbook Mk 3/5/6): hull 24 ft 9.5 in (7.556 m),
   gun forward 32 ft 3 in (9.83 m), width 11 ft 1 in (3.38 m) with side plates / 10 ft 9 in
   (3.28 m) without, height 9 ft 7.75 in (2.94 m), clearance 1 ft 8 in (0.51 m); six wheels in
   three Horstmann bogies.  Conqueror: hull 25 ft 4 in (7.72 m), gun forward 38 ft (11.58 m),
   width 13 ft 1 in (3.99 m), height 10 ft 5 in (3.18 m).  Chieftain: hull 7.5 m, gun forward
   35 ft 4 in (10.77 m), width 12 ft (3.66 m), height 2.9 m, clearance 1 ft 10 in (0.56 m),
   glacis 72 deg; "Centurion 31.6 in diameter road wheels" (0.803 m, interchangeable); Mk 2:
   NBC pack at the turret rear, searchlight on the left, 12.7 mm ranging gun.  Challenger 1:
   11.56 m gun forward, 3.51 m wide, 2.95 m to the top of the commander's sight.  Challenger
   2: hull 8.3 m, "13.5 m gun forward", 3.5 m (4.2 m with add-on armour), height 2.49 m,
   clearance 0.5 m.

   MEASURED.
   Centurion, P-C2 at ONE station (the wheel row): hull over the track guards 1118 px = the
   published 7.556 m, 0.006758 m/px; check: the published 0.803 m wheels are 120 px there
   (0.00669 m/px, 1% off).  Wheels at X 2.372, 1.534 | 0.507, -0.385 | -1.250, -2.115 (pitch
   in a bogie 0.85 m, the gap between wheels 2 and 3 1.20 of a pitch: P-C1 measures the same
   1.20, independently), centres 0.46 m; idler 3.24/0.91, sprocket -3.03/0.85; six return
   rollers at 1.11 m; track guard 1.30 m, bins 1.30-1.62, turret base 1.62, roof 2.43-2.54,
   cupola 2.65 m.  Side plates from P-C1 (ratios to its own hull length): panel joints at X 0.90
   and -0.95, bottom 0.61 m mid, 0.73 m at X 3.08, rising to 1.27 m at the tail; top 1.45 m.
   Conqueror, P-Q1 at the near rear track run: wheel height / skirt top / turret roof =
   77 / 250 / 370 px; with the roof 2.82 m that is 0.59 m wheels, the skirt and bins to
   1.93 m, the skirt's lower edge 0.74 m.  Wheel spacing about one diameter, even (P-Q1),
   paired by the bogies (P-Q6).  Fume extractor 0.28-0.42 of the visible barrel out from the
   mantlet: P-Q1 0.33-0.47, P-Q3 0.24-0.41, P-Q4 0.19-0.40 (ratios hold under foreshortening).
   Chieftain, P-F1 at its wheel station, in units of the published 0.803 m wheel: wheels in
   pairs at a 0.82 m pitch, 1.02 m between pairs; idler 0.76 m ahead of wheel 1 at 0.94 m,
   sprocket 0.78 m behind wheel 6 at 0.91 m; three return rollers at 1.02 m; turret length with
   the NBC pack 5.4 m (0.72 of the hull).  L11 fume extractor 0.52-0.70 out (P-F3 0.50-0.74,
   P-K1 0.53-0.75).
   Challenger, P-K1 at ONE station: 0.0066 m/px from the published 2.95 m to the top of the
   commander's sight (447 px).  Hull 1225 px = 8.09 m; wheels 124 px = 0.82 m, centres X 2.01,
   1.03, 0.12, -0.91, -1.69, -2.64 (uneven as photographed: the trailing arms sit at
   different angles parked), 0.495 m up; idler 3.03/1.03 (raised), sprocket -3.36/0.90; two
   return rollers visible at -0.48 and -2.25; side panels 1.50-1.85 m; glacis from X 2.60
   at 1.85 m to 3.77 at 1.56 m; raised rear deck X -2.56 to -3.85, top 1.98 m; turret front
   tip X 2.54 at 1.95 m, roof edge X 0.91, roof 2.57 m, bustle to X -2.62.
   CR2 turret, P-K2 (as fractions of the near-side hull, which P-K1 scales): rear X -2.54, the
   mantlet 2.92; depth of the turret side / roof height 0.37 (118 / 318 px); the hull side's
   top / roof 0.57; wheels' diameter / pitch 0.83 (P-K1: 0.88), so 0.79 m on the shared pitch.
   L30 extractor 0.49-0.64 out.  The TES side packs end between wheels 5 and 6 (P-T1).
   DISAGREEMENTS, and how they are settled:
     - Centurion and Chieftain heights: P-C1 and P-C2 agree (cupola / hull 0.363 and 0.351)
       and put the cupola at 2.65 m, not the published 2.94 m; P-F1 puts the Chieftain cupola
       at 2.62 m, not 2.9 m.  The scale is confirmed twice over (hull and wheel) for the
       Centurion, so the photographs stand; the published heights presumably include fittings
       on the cupola.  Nothing was stretched to reach them.
     - Centurion gun: P-C1's gun measures 3.5 m out of the mantlet against about 4.5 m:
       its turret is traversed (foreshortened), so P-C1 is not used for the gun; the muzzle
       comes from the published 9.83 m.
     - Challenger hull length: P-K1 at the published 2.95 m gives 8.09 m, not CR2's
       published 8.3 m.  Taken from the photograph (its wheel then comes out 0.82 m, the
       Chieftain's 0.803 m wheel within 2%); CR2's fuel drums carry its overall to 8.6 m.
     - CR1 vs CR2 deck: P-K1 puts the hull side top at 0.72 of the roof height, P-K2 at 0.57,
       and P-K2's turret side is 0.37 of the roof height against CR1's 0.24.  Both roofs are
       published at about 2.5 m.  Settled from the photographs: the CR2 hull is drawn with its
       deck at 1.57 m and skirts 0.80-1.44 m outboard over the top run (P-K2), the CR1 hull
       with its deck at 1.85 m and the track's top run showing below the side panels (P-K1).
       So the two share the plan and the running gear but not the deck height.
     - CR2 gun forward: en.wikipedia's 13.5 m cannot be met by a 55-calibre gun on this hull;
       the L30 and L11 are both 55 calibres and the turret ring is shared, so CR2 takes CR1's
       11.56 m to the hull's rear plate (P-K2's foreshortened station gives 11.8 m).
     - Chieftain overall: the published 10.77 m is taken to the rear of the silencer box.
   Recognition list (each drawn; source):
     1. Centurion: six big wheels in three bogies with the wider middle gap; the side plates
        with their rising ends; the track guard bins; the plain 20-pdr - P-C1 to P-C3
     2. Conqueror: eight small wheels; the high hull with the long side bins and skirts; the
        huge cast turret; the rear fire control turret with its rangefinder; the extractor
        a third of the way out - P-Q1 to P-Q5
     3. Chieftain: the long shallow glacis, the low hull, the long pointed turret, the side
        plates, the searchlight box, the NBC pack, the sleeved L11 - P-F1 to P-F4
     4. Challenger 1: the flat Chobham turret with its long sloped front, the side panels with
        the track's top run below, the raised idler - P-K1
     5. Challenger 2: the tall slab-sided turret, the gunner's sight box on the front right,
        the five-tube dischargers, the skirts, the rear drums, the extractor and muzzle box - P-K2
     6. TES: the side packs, bar armour, the RWS and mast - P-T1, P-T2
   Paint: deep bronze green (Centurion, Conqueror, Chieftain Mk 2): P-Q2 #393c28, #30352d,
   P-C2 #484644 (grey indoor light), P-F4 dark green; drawn #3a3f2c.  1980s green with black
   disruptive patches (CR1 e80, CR2 e90_heavy): P-K1 #686b64 lit / #534f46, drawn #4b5040 with
   #1d1f1a patches (P-K1 itself is museum plain green with an orange stripe, not drawn).  Desert
   sand (CR1 e90, CR2 e00, TES): P-F3 #d9c6a3 lit, P-K2 dust #8b8975; drawn #b9a47c.  P-T1/T2
   wear the later Barracuda covers: not drawn.  No roundels, flags, numbers, signs or names.
   NOT CONFIRMED (judgement, no drawing or published figure):
     - every turret ring position (X 0.20 Centurion, 0.30 Conqueror, 0.25 Chieftain, 0.45
       Challenger): from the turret's place over the hull, not measured; the muzzles then come
       from the published gun-forward lengths;
     - turret plans and widths (Centurion 2.4 m, Conqueror 3.0 m, Chieftain 2.9 m, CR1 3.2 m,
       CR2 3.2 m), the bore heights, the mantlets, hatch and cupola sizes;
     - the Conqueror's wheel size (0.59 m), pitch (0.66 m) and the wheel row's place; its hull
       and turret heights from P-Q1's ratios with a 2.82 m roof, the fire control turret's
       height chosen so its MG reaches the published 3.18 m; no return rollers drawn (none
       seen); track widths (Centurion and Chieftain 0.61 m, Conqueror 0.79 m, Challenger
       0.66 m);
     - the Chieftain's hull heights (deck 1.49 m) and its turret's height (roof 2.39 m, P-F1),
       wheel and roller positions from P-F1's oblique ratios;
     - Challenger: the CR2 skirt panel joints; the TES packs' depth (0.35 m, from the
       published 4.2 m) and height, the bar armour's stand-off, the RWS and mast sizes (mast
       platform 0.58 m and cage 1.1 m over the roof from P-T1's ratios).
   NOT DRAWN: engine-deck grilles of the Centurion (no photograph of its deck), the Centurion's
   monowheel trailer, CR1's TOGS barbette and smoke dischargers (not visible in P-K1),
   aerials' whips, tow cables, crew stowage, the TES Barracuda covers.
   Materials: PAINT (canvas texture per scheme), DARK (tracks, bars, louvres, bores), WHEEL
   (vertex colours) and the team colour exactly as handed in (C.team): small strips on the
   turret sides or bins and on the rear plate.
   Nodes: "turret" (origin on the ring at the deck, gun along +X) and one "roadwheel" group per
   axle position (both sides; axle along Y): 6 / 8 / 6 / 6.
   Drawn (L x W x H, tail to muzzle) against published:
     Centurion Mk 3   9.84 x 3.40 x 2.65   (9.83 x 3.38 x 2.94; hull 7.556)
     Conqueror        11.59 x 4.00 x 3.18  (11.58 x 3.99 x 3.18; hull 7.72)
     Chieftain Mk 2   10.79 x 3.66 x 2.67  (10.77 x 3.66 x 2.90; hull 7.5)
     Challenger 1     11.58 x 3.51 x 2.95  (11.56 x 3.51 x 2.95)
     Challenger 2     12.15 x 3.53 x 2.75 over the drums; 11.56 to the rear plate; roof 2.49
                      (13.5 [sic] x 3.5 x 2.49; hull 8.3)
     Challenger 2 TES 11.99 x 4.22 x 3.61 to the mast (width 4.2 published)
   Draw calls: hull 3 + turret 3 + one per wheel position = 12 (Conqueror 14).
   Engine at the rear on every one (js/damage3d.js ENGINE_AT's default for the role).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroGBTanks = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ============================================================ geometry kit */
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
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.30, q[1] * 0.30);
        else if (ay >= ax) this.U.push(q[0] * 0.30, q[2] * 0.30);
        else this.U.push(q[1] * 0.30, q[2] * 0.30);
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
  /* a box mirrored to both sides: y0..y1 given for the left (+Y) side */
  function box2(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y1, -y0, z0, z1); }
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
  function prismY2(bin, pts, y0, y1) { prismY(bin, pts, y0, y1); prismY(bin, pts, -y1, -y0); }
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
  /* a turret / hull cross-section ring at x: bottom half width wb at zb, widest w at zm,
     roof edge half width wt at zt (six points, convex) */
  function ring(x, wb, w, wt, zb, zm, zt) {
    return [[x, -wb, zb], [x, wb, zb], [x, w, zm], [x, wt, zt], [x, -wt, zt], [x, -w, zm]];
  }
  /* a straight section of a hull: full width hw from zb to the top, chamfered roof edge */
  function hsec(x, hw, zb, top) {
    var e = 0.04;
    return [[x, -hw, zb], [x, hw, zb], [x, hw, top - e], [x, hw - e, top], [x, -hw + e, top], [x, -hw, top - e]];
  }

  /* ============================================================ materials */
  /* British schemes as photographed (see the header): deep bronze green, the 1980s green
     with black disruptive patches, and desert sand.  One tile is 3.4 m of plate. */
  var SCHEMES = {
    bronze: { base: "#3a3f2c", blots: ["#343928", "#41462f"], seed: 1955 },
    nato:   { base: "#4b5040", dis: "#1d1f1a", seed: 1983 },
    sand:   { base: "#b9a47c", blots: ["#ad9872", "#c4b088"], seed: 1991 }
  };
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
      function patch(col, cx, cy, rx, ry, rr) {
        q.fillStyle = col; q.beginPath();
        for (k = 0; k < rr.length; k++) {
          a = k / rr.length * TAU;
          var px = cx + Math.cos(a) * rx * rr[k], py = cy + Math.sin(a) * ry * rr[k];
          if (k === 0) q.moveTo(px, py); else q.lineTo(px, py);
        }
        q.closePath(); q.fill();
      }
      if (P.dis) {
        /* the black disruptive pattern: large hard-edged patches, about a third of the plate;
           each drawn at the tile wraps too so it repeats without seams */
        for (i = 0; i < 6; i++) {
          var cx = R() * S, cy = R() * S, rx = 60 + R() * 70, ry = 30 + R() * 40, rr = [];
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
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.8, metalness: 0.3 });
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

  /* ============================================================ running gear (shared) */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  /* R: { XW, ZW, RW, IDL, SPR, RET, RZ, RR, TY, TW, LW, link, th } - the track run is the
     convex hull around the wheels, idler, sprocket and rollers; links at the link pitch */
  function addRunning(B, R) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], th = Math.max(0.04, R.ZW - R.RW), hc = th / 2;
    for (i = 0; i < R.XW.length; i++) C.push([R.XW[i], R.ZW, R.RW + hc]);
    for (i = 0; i < R.RET.length; i++) C.push([R.RET[i], R.RZ, R.RR + hc]);
    C.push([R.IDL.x, R.IDL.z, R.IDL.r + hc], [R.SPR.x, R.SPR.z, R.SPR.r + hc]);
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
    cnt = Math.round(tot / R.link); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * R.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - R.TW + 0.03, y + R.TW - 0.03, th * 0.6);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the link's raised grouser bar across the track, and the end connectors */
        belt(B.dark, px - dx * 0.03, pz - dz * 0.03, px + dx * 0.03, pz + dz * 0.03, y - R.TW + 0.02, y + R.TW - 0.02, th);
        belt(B.dark, px - dx * 0.025, pz - dz * 0.025, px + dx * 0.025, pz + dz * 0.025, y - R.TW, y + R.TW, th * 0.8);
      }
      /* the rear drive sprocket: hub and teeth */
      cylY(B.dark, R.SPR.x, y - 0.18, y + 0.18, R.SPR.z, R.SPR.r - 0.04, 18);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [R.SPR.x + ca * (R.SPR.r - 0.01), y, R.SPR.z + sa * (R.SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.045, 0.18, 0.03);
      }
      cylY(B.paint, R.SPR.x, y + s * 0.18, y + s * 0.23, R.SPR.z, R.SPR.r * 0.55, 14);
      /* the front idler (twin disc) */
      cylY(B.paint, R.IDL.x, y - R.TW + 0.03, y - 0.04, R.IDL.z, R.IDL.r, 18);
      cylY(B.paint, R.IDL.x, y + 0.04, y + R.TW - 0.03, R.IDL.z, R.IDL.r, 18);
      cylY(B.dark, R.IDL.x, y + s * (R.TW - 0.03), y + s * (R.TW + 0.02), R.IDL.z, 0.09, 10);
      for (i = 0; i < R.RET.length; i++) cylY(B.dark, R.RET[i], y - R.TW + 0.05, y + R.TW - 0.05, R.RZ, R.RR, 12);
      /* final drive housing */
      cylY(B.paint, R.SPR.x, s * (R.LW + 0.01), s * (R.TY - R.TW - 0.02), R.SPR.z, 0.22, 12);
    }
  }
  /* a road wheel pair (one axle position, both sides): twin rubber-tyred discs straddling
     the track's guide horns, dished face, a ring of bolts, hub cap.  holes: CR2's ring of
     lightening holes (drawn dark bosses) */
  var TYRE = [0.13, 0.135, 0.13], DISC = [0.36, 0.40, 0.29], RIM = [0.28, 0.31, 0.22], HUB = [0.42, 0.46, 0.34];
  function wheelCols(key) {
    if (key === "sand") return { disc: [0.62, 0.56, 0.43], rim: [0.52, 0.47, 0.36], hub: [0.70, 0.64, 0.50] };
    if (key === "nato") return { disc: [0.27, 0.29, 0.23], rim: [0.20, 0.21, 0.17], hub: [0.32, 0.34, 0.27] };
    return { disc: [0.21, 0.23, 0.16], rim: [0.16, 0.17, 0.12], hub: [0.26, 0.28, 0.20] };
  }
  function addWheel(W, R, key, bolts, holes) {
    var s, y, i, a, e, r = R.RW, h = R.TW - 0.03, cc = wheelCols(key);
    for (s = -1; s <= 1; s += 2) {
      y = s * R.TY;
      W.col = TYRE;
      cylY(W, 0, y - h, y - 0.05, 0, r, 18);
      cylY(W, 0, y + 0.05, y + h, 0, r, 18);
      W.col = cc.disc;
      cylY(W, 0, y - 0.05, y + 0.05, 0, r - 0.07, 12);
      e = y + s * h;
      cyl(W, [0, e, 0], [0, e + s * 0.025, 0], r - 0.06, r - 0.10, 18);
      cyl(W, [0, e + s * 0.02, 0], [0, e + s * 0.05, 0], r * 0.48, r * 0.34, 12);
      W.col = holes ? [0.10, 0.10, 0.09] : cc.rim;
      for (i = 0; i < bolts; i++) {
        a = i / bolts * TAU;
        var rr = holes ? r * 0.66 : r * 0.42, bs = holes ? 0.045 : 0.018;
        box(W, Math.cos(a) * rr - bs, Math.cos(a) * rr + bs, Math.min(e, e + s * 0.035), Math.max(e, e + s * 0.035), Math.sin(a) * rr - bs, Math.sin(a) * rr + bs);
      }
      W.col = cc.hub;
      cylY(W, 0, e + s * 0.04, e + s * 0.10, 0, 0.08, 10);
    }
  }
  /* the Horstmann bogie units (Centurion, Conqueror, Chieftain): the horizontal spring
     housing between the two wheels of a pair, inboard of the outer discs, and its bracket
     to the hull side.  Seen between the wheels in every side photograph. */
  function addBogies(B, R, pairs) {
    var s, i, x0, x1;
    for (i = 0; i < pairs.length; i++) {
      x0 = R.XW[pairs[i][0]]; x1 = R.XW[pairs[i][1]];
      for (s = -1; s <= 1; s += 2) {
        var ya = s * (R.LW + 0.01), yb = s * (R.TY - 0.05);
        box(B.paint, Math.min(x0, x1) + 0.05, Math.max(x0, x1) - 0.05, Math.min(ya, yb), Math.max(ya, yb), R.ZW + 0.04, R.ZW + R.RW * 0.62);
        cylX(B.dark, Math.min(x0, x1) + 0.12, Math.max(x0, x1) - 0.12, s * (R.TY - 0.12), R.ZW + R.RW * 0.33, 0.07, 0.07, 10);
        box(B.paint, (x0 + x1) / 2 - 0.16, (x0 + x1) / 2 + 0.16, Math.min(s * R.LW, s * (R.TY - 0.1)), Math.max(s * R.LW, s * (R.TY - 0.1)), R.ZW + 0.04, R.ZW + R.RW + 0.14);
      }
    }
  }

  /* ============================================================ guns (shared) */
  /* along +X at (y, z) in turret space, from the mantlet face x0 to the muzzle m.
     G: { r0 base radius, r1 muzzle radius, ext [f0, f1] fume extractor as fractions of the
     visible barrel, er its radius, bands (thermal sleeve clamp bands), mrs (CR2's muzzle
     reference box), swell (a muzzle swelling: the 20-pdr) } */
  function addGun(B, x0, m, y, z, G) {
    var L = m - x0, e0 = x0 + G.ext[0] * L, e1 = x0 + G.ext[1] * L, x, rAt = function (xx) { return G.r0 + (G.r1 - G.r0) * (xx - x0) / L; };
    if (G.ext[1] > G.ext[0]) {
      cylX(B.paint, x0, e0 - 0.08, y, z, G.r0, rAt(e0 - 0.08), 16);
      cylX(B.paint, e0 - 0.08, e0, y, z, rAt(e0 - 0.08), G.er, 16);
      cylX(B.paint, e0, e1, y, z, G.er, G.er, 16);
      cylX(B.paint, e1, e1 + 0.08, y, z, G.er, rAt(e1 + 0.08), 16);
      cylX(B.paint, e1 + 0.08, m - (G.swell ? 0.18 : 0.02), y, z, rAt(e1 + 0.08), G.r1, 16);
    } else {
      cylX(B.paint, x0, m - (G.swell ? 0.18 : 0.02), y, z, G.r0, G.r1, 16);
    }
    if (G.swell) cylX(B.paint, m - 0.18, m, y, z, G.r1 + 0.02, G.r1 + 0.02, 16);
    else cylX(B.paint, m - 0.02, m, y, z, G.r1 + 0.005, G.r1 + 0.005, 16);
    cylX(B.dark, m - 0.005, m + 0.004, y, z, G.r1 * 0.55, G.r1 * 0.55, 12);
    if (G.bands) for (x = x0 + 0.55; x < m - 0.4; x += 1.05) if (x < e0 - 0.15 || x > e1 + 0.15) cylX(B.dark, x, x + 0.05, y, z, rAt(x) + 0.018, rAt(x) + 0.018, 12);
    if (G.mrs) { box(B.dark, m - 0.30, m - 0.04, y - 0.06, y + 0.06, z + G.r1, z + G.r1 + 0.09); }
  }
  /* a cluster of smoke discharger tubes on a plate: n tubes in rows, pointing out (s) and up */
  function dischargers(B, x, y, z, s, cols, rows, fwd) {
    var i, j;
    box(B.paint, x - 0.06 - cols * 0.06, x + 0.06 + cols * 0.06, s > 0 ? y - 0.02 : y - 0.06, s > 0 ? y + 0.06 : y + 0.02, z - 0.10, z + rows * 0.11);
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var px = x - (cols - 1) * 0.06 + i * 0.12, pz = z + j * 0.11, D = unit([fwd, s * 0.6, 0.55]);
      cyl(B.dark, [px, y + s * 0.04, pz], [px + D[0] * 0.24, y + s * 0.04 + D[1] * 0.24, pz + D[2] * 0.24], 0.042, 0.042, 8);
    }
  }

  /* ======================================================================
     CENTURION Mk 3 (gbr_e50_mbt).  Hull scale: P-C2 (Cosford, square side-on, no skirts)
     at 0.006758 m/px from the published 7.556 m hull over the track guards; the 0.803 m
     road wheels (published) measure 120 px = 0.00669 m/px there: the two agree to 1%.
     ====================================================================== */
  var CEN = {
    NOSE: 3.778, TAIL: -3.778, BELLY: 0.51, FEND: 1.30, DECK: 1.58, LW: 1.00, FW: 1.64, SKO: 1.69,
    R: { XW: [2.372, 1.534, 0.507, -0.385, -1.250, -2.115], ZW: 0.46, RW: 0.40,
         IDL: { x: 3.237, z: 0.905, r: 0.30 }, SPR: { x: -3.034, z: 0.85, r: 0.31 },
         RET: [2.72, 1.98, 0.84, -0.22, -1.12, -1.71], RZ: 1.11, RR: 0.09,
         TY: 1.305, TW: 0.305, LW: 1.00, link: 0.16, th: 0.06 },
    TX: 0.20, MUZ: 6.052
  };
  function cenHull(B) {
    var H = CEN, s, i, y;
    /* the hull between the tracks: belly at the published 0.51 m clearance, the beak of the
       lower and upper glacis plates (P-C3), flat roof, the rear plate leaning in at the top */
    prismY(B.paint, [[H.TAIL, 1.42], [H.TAIL, 0.86], [H.TAIL + 0.36, H.BELLY], [3.24, H.BELLY], [3.70, 0.98],
                     [2.55, H.DECK], [H.TAIL + 0.24, H.DECK]], -H.LW, H.LW);
    for (s = -1; s <= 1; s += 2) {
      /* the track guards over the tracks, full length; the front ends turn down (P-C3) */
      box(B.paint, H.TAIL + 0.02, 3.30, s > 0 ? H.LW : -H.FW, s > 0 ? H.FW : -H.LW, H.FEND - 0.03, H.FEND);
      slab(B.paint, [3.54, s * (H.LW + H.FW) / 2, 1.215], unit([0.48, 0, -0.17]), [0, 1, 0], unit([0.17, 0, 0.48]), 0.255, (H.FW - H.LW) / 2, 0.015);
      /* stowage bins on the front track guards, between the turret and the nose (P-C2, P-C3) */
      for (i = 0; i < 3; i++) {
        var b0 = -0.76 + i * 1.15, b1 = b0 + 1.12;
        box(B.paint, b0, b1, s > 0 ? H.LW + 0.06 : -H.FW + 0.02, s > 0 ? H.FW - 0.02 : -H.LW - 0.06, H.FEND, 1.60);
        box(B.dark, b1 - 0.01, b1 + 0.02, s > 0 ? H.FW - 0.03 : -H.FW + 0.01, s > 0 ? H.FW - 0.01 : -H.FW + 0.03, H.FEND + 0.02, 1.58);
      }
      /* the long cylinder carried on each rear track guard (P-C1 Borden, P-C2) on brackets */
      y = s * 1.36;
      cylX(B.paint, -3.15, -1.10, y, 1.60, 0.125, 0.125, 14);
      box(B.dark, -2.95, -2.85, y - 0.08, y + 0.08, H.FEND, 1.50);
      box(B.dark, -1.40, -1.30, y - 0.08, y + 0.08, H.FEND, 1.50);
      /* tow hooks on the nose (P-C3) and the rear plate */
      box(B.dark, 3.42, 3.62, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.70, 0.82);
      box(B.dark, H.TAIL - 0.005, H.TAIL + 0.08, s * 0.70 - 0.06, s * 0.70 + 0.06, 0.95, 1.08);
      /* rear lights */
      box(B.dark, H.TAIL - 0.005, H.TAIL + 0.03, s * 0.85 - 0.06, s * 0.85 + 0.06, 1.28, 1.38);
    }
    /* the driver's hatch at the front right of the roof, the periscope ahead of it */
    box(B.paint, 1.95, 2.45, -0.80, -0.30, H.DECK, H.DECK + 0.05);
    box(B.dark, 2.40, 2.50, -0.62, -0.48, H.DECK, H.DECK + 0.10);
    /* the engine deck: the raised louvred covers behind the turret are NOT drawn (no photo
       here shows the deck from above); a plain plate seam line only */
    box(B.dark, -1.62, -1.58, -0.95, 0.95, H.DECK, H.DECK + 0.01);
    /* team strip on the rear plate */
    box(B.team, H.TAIL - 0.006, H.TAIL, -0.45, 0.45, 1.28, 1.36);
  }
  /* the side plates ("bazooka plates") as P-C1 shows them: three panels hung from the track
     guard edge; the front one's lower edge rising to the nose, the rear one's rising steeply
     to the tail */
  function cenSkirts(B) {
    var H = CEN, s, yo, yi;
    for (s = -1; s <= 1; s += 2) {
      yo = s > 0 ? H.SKO : -H.FW + 0.01; yi = s > 0 ? H.FW - 0.01 : -H.SKO;
      prismY(B.paint, [[0.92, 0.61], [3.08, 0.73], [3.76, 0.92], [3.76, 1.45], [0.92, 1.45]], yo < yi ? yo : yi, yo < yi ? yi : yo);
      prismY(B.paint, [[-0.93, 0.60], [0.88, 0.61], [0.88, 1.45], [-0.93, 1.45]], yo < yi ? yo : yi, yo < yi ? yi : yo);
      prismY(B.paint, [[-3.38, 1.27], [-0.97, 0.58], [-0.97, 1.45], [-3.38, 1.45]], yo < yi ? yo : yi, yo < yi ? yi : yo);
      /* the hangers along the top edge */
      for (var i = 0; i < 6; i++) box(B.dark, -3.0 + i * 1.2, -2.94 + i * 1.2, s > 0 ? H.SKO : -H.SKO - 0.01, s > 0 ? H.SKO + 0.01 : -H.SKO, 1.30, 1.44);
    }
  }
  /* turret-local: x forward of the axis (X 0.20), z above the roof (1.58) */
  function cenTurret(B) {
    var s, i, aa;
    /* the cast and welded turret (P-C2, P-C3): flat roof at 0.89 (2.47 m), the front
       narrowing to the mantlet, the sides flaring out behind it, a rounded rear */
    loftN(B.paint, [ring(-1.32, 0.90, 1.00, 0.80, 0.16, 0.45, 0.84), ring(-0.95, 1.08, 1.18, 0.98, 0.04, 0.40, 0.89),
                    ring(0.60, 1.08, 1.18, 0.98, 0.04, 0.40, 0.89), ring(1.08, 0.85, 0.95, 0.72, 0.04, 0.36, 0.89),
                    ring(1.36, 0.58, 0.68, 0.44, 0.08, 0.32, 0.72)]);
    cylZ(B.dark, 0, 0, -0.03, 0.05, 1.02, 24);
    /* the mantlet with its canvas cover (P-C3) */
    slab(B.paint, [1.42, 0, 0.38], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.12, 0.42, 0.24);
    /* stowage bins along both turret sides and the bin across the rear (P-C2, P-C3) */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.92, 0.70, s > 0 ? 1.16 : -1.38, s > 0 ? 1.38 : -1.16, 0.18, 0.66);
      box(B.dark, -0.13, -0.10, s > 0 ? 1.38 : -1.385, s > 0 ? 1.385 : -1.38, 0.20, 0.64);
      /* the smoke dischargers on the front corners (P-C3, P-C4) */
      dischargers(B, 0.92, s * 1.04, 0.74, s, 3, 2, 0.6);
      /* team strip on the bin */
      box(B.team, -0.85, -0.35, s > 0 ? 1.38 : -1.395, s > 0 ? 1.395 : -1.38, 0.50, 0.60);
    }
    box(B.paint, -1.62, -1.30, -0.92, 0.92, 0.22, 0.70);
    /* the commander's cupola on the right (P-C2 top 2.65 m), its vision blocks; the loader's
       hatch on the left; aerial bases at the rear */
    cylZ(B.paint, -0.30, -0.55, 0.89, 1.02, 0.38, 18);
    cylZ(B.paint, -0.30, -0.55, 1.02, 1.07, 0.30, 16);
    for (i = 0; i < 7; i++) {
      aa = i / 7 * TAU;
      box(B.dark, -0.30 + Math.cos(aa) * 0.35 - 0.045, -0.30 + Math.cos(aa) * 0.35 + 0.045, -0.55 + Math.sin(aa) * 0.35 - 0.045, -0.55 + Math.sin(aa) * 0.35 + 0.045, 0.93, 1.00);
    }
    cylZ(B.paint, -0.35, 0.55, 0.89, 0.95, 0.30, 16);
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, -1.10, s * 0.75, 0.89, 1.02, 0.05, 8);
    /* the 20-pounder: plain tube, no fume extractor (P-C3, P-C4), the slight muzzle swell */
    addGun(B, 1.54, CEN.MUZ - CEN.TX, 0, 0.37, { r0: 0.105, r1: 0.082, ext: [0, 0], er: 0, swell: true });
  }

  /* ======================================================================
     CONQUEROR (gbr_e50_heavy).  No square side-on photograph was found: the published
     hull 7.72 m, 11.58 m gun forward, 3.99 m wide, 3.18 m high carry the scale; P-Q1
     (the 1962 BAOR photograph) gives ratios at ONE station, the near rear track run.
     ====================================================================== */
  var CON = {
    NOSE: 3.86, TAIL: -3.86, BELLY: 0.50, FEND: 1.22, DECK: 1.80, LW: 1.10, HW: 1.15, SKO: 1.995,
    R: { XW: [1.82, 1.16, 0.50, -0.16, -0.82, -1.48, -2.14, -2.80], ZW: 0.35, RW: 0.295,
         IDL: { x: 2.78, z: 0.80, r: 0.30 }, SPR: { x: -3.45, z: 0.82, r: 0.34 },
         RET: [], RZ: 1.0, RR: 0.09, TY: 1.54, TW: 0.39, LW: 1.10, link: 0.16, th: 0.06 },
    TX: 0.30, MUZ: 7.72
  };
  function conHull(B) {
    var H = CON, s, i, y;
    /* the tub: belly, the lower nose plate, the big upper glacis (P-Q2, P-Q4), roof, the
       rear plate */
    prismY(B.paint, [[H.TAIL, 1.55], [H.TAIL, 0.85], [H.TAIL + 0.40, H.BELLY], [3.20, H.BELLY], [3.86, 1.05],
                     [2.40, H.DECK], [H.TAIL + 0.25, H.DECK]], -H.HW, H.HW);
    for (s = -1; s <= 1; s += 2) {
      var ya = s > 0 ? H.HW : -H.SKO, yb = s > 0 ? H.SKO : -H.HW;
      /* track guards and the long armoured side bins above them (P-Q1: four bins a side,
         flush outer face, top 1.93 m) */
      box(B.paint, H.TAIL + 0.10, 2.62, ya, yb, H.FEND - 0.03, H.FEND);
      prismY(B.paint, [[H.TAIL + 0.30, H.FEND], [2.55, H.FEND], [2.55, 1.86], [H.TAIL + 0.30, 1.86]], s > 0 ? H.HW : -H.SKO + 0.02, s > 0 ? H.SKO - 0.02 : -H.HW);
      prismY(B.paint, [[H.TAIL + 0.30, 1.86], [2.55, 1.86], [2.45, 1.93], [H.TAIL + 0.40, 1.93]], s > 0 ? H.HW : -H.SKO + 0.15, s > 0 ? H.SKO - 0.15 : -H.HW);
      for (i = 1; i < 4; i++) {
        var bx = H.TAIL + 0.30 + i * (2.55 - H.TAIL - 0.30) / 4;
        box(B.dark, bx - 0.012, bx + 0.012, s > 0 ? H.SKO - 0.02 : -H.SKO + 0.01, s > 0 ? H.SKO - 0.01 : -H.SKO + 0.02, H.FEND + 0.02, 1.90);
      }
      /* the skirt plate below the bins hiding the top run (P-Q1, P-Q3): 0.74-1.22 m */
      box(B.paint, H.TAIL + 0.35, 2.55, s > 0 ? H.SKO - 0.04 : -H.SKO + 0.01, s > 0 ? H.SKO - 0.01 : -H.SKO + 0.04, 0.74, H.FEND);
      /* the wedge-shaped front track guards over the idlers (P-Q2, P-Q4) */
      prismY(B.paint, [[2.55, 1.20], [3.10, 1.05], [3.84, 1.30], [3.80, 1.58], [2.55, 1.86]], s > 0 ? H.HW : -H.SKO + 0.02, s > 0 ? H.SKO - 0.02 : -H.HW);
      /* the headlamps in their guards on the glacis (P-Q2, P-Q4) */
      y = s * 0.55;
      var gz = 1.05 + (3.86 - 3.30) / (3.86 - 2.40) * (H.DECK - 1.05);
      cylX(B.paint, 3.22, 3.38, y, gz + 0.14, 0.09, 0.09, 12);
      cylX(B.dark, 3.38, 3.40, y, gz + 0.14, 0.075, 0.075, 12);
      box(B.dark, 3.18, 3.42, y - 0.14, y - 0.12, gz, gz + 0.28);
      box(B.dark, 3.18, 3.42, y + 0.12, y + 0.14, gz, gz + 0.28);
      /* tow eyes, front and rear */
      box(B.dark, 3.62, 3.80, s * 0.70 - 0.07, s * 0.70 + 0.07, 0.72, 0.86);
      box(B.dark, H.TAIL - 0.005, H.TAIL + 0.08, s * 0.80 - 0.07, s * 0.80 + 0.07, 0.95, 1.10);
    }
    /* the louvred engine deck behind the turret (P-Q5 shows the grilles from above) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) {
        var gx0 = -3.45 + i * 1.05;
        box(B.dark, gx0, gx0 + 0.92, s > 0 ? 0.12 : -0.98, s > 0 ? 0.98 : -0.12, H.DECK, H.DECK + 0.015);
        for (var k = 0; k < 8; k++) box(B.paint, gx0 + 0.04 + k * 0.11, gx0 + 0.08 + k * 0.11, s > 0 ? 0.14 : -0.96, s > 0 ? 0.96 : -0.14, H.DECK, H.DECK + 0.03);
      }
    }
    /* the driver's hatch at the front right */
    box(B.paint, 1.70, 2.20, -0.85, -0.35, H.DECK - 0.02, H.DECK + 0.05);
    box(B.team, H.TAIL - 0.006, H.TAIL, -0.45, 0.45, 1.40, 1.48);
  }
  /* turret-local: x forward of the axis (X 0.30), z above the roof (1.80) */
  function conTurret(B) {
    var s, i, aa;
    /* the big cast turret (P-Q3, P-Q4, P-Q5): roof 1.02 (2.82 m), 3.0 m across at its
       widest, the long rounded rear holding the fire control turret */
    loftN(B.paint, [ring(-2.35, 0.78, 0.88, 0.62, 0.16, 0.45, 0.84), ring(-1.80, 1.10, 1.30, 0.95, 0.05, 0.45, 0.98),
                    ring(-0.80, 1.30, 1.50, 1.10, 0.02, 0.45, 1.02), ring(0.60, 1.30, 1.45, 1.05, 0.02, 0.45, 1.02),
                    ring(1.30, 0.95, 1.05, 0.75, 0.10, 0.45, 0.95), ring(1.62, 0.55, 0.62, 0.45, 0.30, 0.55, 0.80)]);
    cylZ(B.dark, 0, 0, -0.03, 0.05, 1.15, 24);
    /* the cast mantlet block (P-Q4) */
    slab(B.paint, [1.66, 0, 0.58], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.12, 0.40, 0.26);
    /* the commander's fire control turret at the rear: its own cast dome, the rangefinder
       across it with the armoured heads at both ends, the MG on top (P-Q5) */
    var fx = -1.35, fy = -0.30;
    cylZ(B.paint, fx, fy, 0.92, 1.18, 0.62, 20);
    cyl(B.paint, [fx, fy, 1.18], [fx, fy, 1.30], 0.60, 0.45, 18);
    cylY(B.paint, fx + 0.15, fy - 0.92, fy + 0.92, 1.12, 0.09, 12);
    box(B.paint, fx + 0.02, fx + 0.30, fy - 1.02, fy - 0.86, 1.02, 1.24);
    box(B.paint, fx + 0.02, fx + 0.30, fy + 0.86, fy + 1.02, 1.02, 1.24);
    for (i = 0; i < 6; i++) {
      aa = i / 6 * TAU + 0.5;
      box(B.dark, fx + Math.cos(aa) * 0.50 - 0.05, fx + Math.cos(aa) * 0.50 + 0.05, fy + Math.sin(aa) * 0.50 - 0.05, fy + Math.sin(aa) * 0.50 + 0.05, 1.18, 1.27);
    }
    box(B.dark, fx - 0.05, fx + 0.45, fy + 0.15, fy + 0.25, 1.30, 1.38);
    cylX(B.dark, fx + 0.45, fx + 0.95, fy + 0.20, 1.34, 0.02, 0.02, 6);
    /* the loader's hatch, front left */
    cylZ(B.paint, 0.10, 0.60, 1.02, 1.08, 0.32, 16);
    for (s = -1; s <= 1; s += 2) {
      /* the six-tube smoke dischargers high on the rear flanks (P-Q1, P-Q3, P-Q4) */
      dischargers(B, -1.70, s * 1.28, 0.68, s, 3, 2, 0.1);
      /* lifting eyes, team strip */
      box(B.dark, 0.85, 0.95, s > 0 ? 1.38 : -1.44, s > 0 ? 1.44 : -1.38, 0.62, 0.72);
      box(B.team, -0.70, -0.10, s > 0 ? 1.48 : -1.51, s > 0 ? 1.51 : -1.48, 0.55, 0.63);
      cylZ(B.dark, -2.05, s * 0.55, 0.85, 1.00, 0.05, 8);
    }
    /* the 120 mm L1: the fume extractor 0.28-0.42 of the barrel out from the mantlet (P-Q1,
       P-Q3, P-Q4 agree) */
    addGun(B, 1.78, CON.MUZ - CON.TX, 0, 0.58, { r0: 0.15, r1: 0.115, ext: [0.28, 0.42], er: 0.20 });
  }

  /* ======================================================================
     CHIEFTAIN Mk 2 (gbr_e60_mbt).  Published hull 7.5 m, 10.77 m gun forward, 3.66 m
     wide, clearance 0.56 m, the 0.803 m Centurion road wheels.  P-F1 (on the transporter,
     turret reversed) gives the running gear's ratios at its wheel station.
     ====================================================================== */
  var CHF = {
    NOSE: 3.75, TAIL: -3.75, BELLY: 0.56, FEND: 1.33, DECK: 1.49, LW: 1.05, HW: 1.45, FW: 1.73, SKO: 1.83,
    GLX: 1.60, NZT: 0.92,
    R: { XW: [2.10, 1.28, 0.26, -0.56, -1.58, -2.40], ZW: 0.46, RW: 0.40,
         IDL: { x: 2.86, z: 0.94, r: 0.30 }, SPR: { x: -3.18, z: 0.91, r: 0.31 },
         RET: [1.69, -0.15, -1.99], RZ: 1.02, RR: 0.09, TY: 1.40, TW: 0.305, LW: 1.05, link: 0.16, th: 0.06 },
    TX: 0.25, MUZ: 6.66
  };
  function chfGlz(x) { return x <= CHF.GLX ? CHF.DECK : CHF.DECK - (x - CHF.GLX) / (CHF.NOSE - CHF.GLX) * (CHF.DECK - CHF.NZT); }
  function chfHull(B) {
    var H = CHF, s, i, y;
    /* the low hull with the very long shallow glacis (published 72 deg from the vertical;
       drawn 75: 0.57 m of rise in 2.15 m), the lower nose plate, belly 0.56 m */
    prismY(B.paint, [[H.TAIL, 1.40], [H.TAIL, 0.95], [H.TAIL + 0.30, H.BELLY], [3.05, H.BELLY], [H.NOSE, H.NZT],
                     [H.GLX, H.DECK], [H.TAIL + 0.15, H.DECK]], -H.LW, H.LW);
    loftN(B.paint, [hsec(H.TAIL + 0.05, H.HW, 1.30, 1.42), hsec(H.TAIL + 0.20, H.HW, 1.30, H.DECK), hsec(H.GLX, H.HW, 1.30, H.DECK),
                    hsec(3.30, H.HW, 0.98, chfGlz(3.30))]);
    for (s = -1; s <= 1; s += 2) {
      /* track guards; the front ends turn down over the idler */
      box(B.paint, H.TAIL + 0.02, 3.30, s > 0 ? H.HW : -H.FW, s > 0 ? H.FW : -H.HW, H.FEND - 0.03, H.FEND);
      slab(B.paint, [3.52, s * 1.55, 1.18], unit([0.45, 0, -0.30]), [0, 1, 0], unit([0.30, 0, 0.45]), 0.27, 0.20, 0.015);
      /* headlamps with guards at the glacis corners */
      y = s * 1.28;
      cylX(B.paint, 3.30, 3.42, y, chfGlz(3.36) + 0.10, 0.08, 0.08, 12);
      box(B.dark, 3.28, 3.46, y - 0.12, y - 0.10, chfGlz(3.36), chfGlz(3.36) + 0.20);
      box(B.dark, 3.28, 3.46, y + 0.10, y + 0.12, chfGlz(3.36), chfGlz(3.36) + 0.20);
      /* tow eyes */
      box(B.dark, 3.55, 3.75, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.70, 0.82);
      box(B.dark, H.TAIL - 0.005, H.TAIL + 0.08, s * 1.10 - 0.06, s * 1.10 + 0.06, 0.95, 1.08);
      /* engine deck louvres, both sides of the centre (P-F2) */
      for (i = 0; i < 6; i++) box(B.dark, -3.40 + i * 0.22, -3.28 + i * 0.22, s > 0 ? 0.15 : -1.15, s > 0 ? 1.15 : -0.15, H.DECK, H.DECK + 0.012);
    }
    /* the reclined driver's hatch on the centreline at the top of the glacis, and his
       periscope (P-F2, P-F3) */
    box(B.paint, 1.62, 2.12, -0.30, 0.30, H.DECK - 0.01, H.DECK + 0.05);
    box(B.dark, 2.12, 2.22, -0.14, 0.14, chfGlz(2.17), chfGlz(2.17) + 0.09);
    /* the exhaust silencers in their armoured box on the rear plate (published: Mk 1 on) */
    box(B.paint, H.TAIL - 0.36, H.TAIL, -0.95, 0.95, 0.96, 1.38);
    for (i = 0; i < 6; i++) box(B.dark, H.TAIL - 0.37, H.TAIL - 0.35, -0.85 + i * 0.33, -0.70 + i * 0.33, 1.02, 1.32);
    box(B.team, H.TAIL - 0.38, H.TAIL - 0.36, -0.40, 0.40, 1.33, 1.37);
  }
  /* the side plates on the track guards (P-F2, P-F4): five panels, bottom 0.92 m */
  function chfSkirts(B) {
    var H = CHF, s, i, x0 = -3.55, x1 = 3.25, n = 5;
    for (s = -1; s <= 1; s += 2) {
      var ya = s > 0 ? H.SKO - 0.03 : -H.SKO, yb = s > 0 ? H.SKO : -H.SKO + 0.03;
      for (i = 0; i < n; i++) {
        var a = x0 + (x1 - x0) * i / n, b = x0 + (x1 - x0) * (i + 1) / n;
        if (i === n - 1) prismY(B.paint, [[a + 0.01, 0.92], [b - 0.45, 0.92], [b, 1.18], [b, 1.42], [a + 0.01, 1.42]], ya, yb);
        else box(B.paint, a + 0.01, b - 0.01, ya, yb, i === 0 ? 1.05 : 0.92, 1.42);
      }
      box(B.paint, x0, x1, s > 0 ? H.FW : -H.SKO, s > 0 ? H.SKO : -H.FW, 1.30, 1.33);
    }
  }
  /* turret-local: x forward of the axis (X 0.25), z above the roof (1.49) */
  function chfTurret(B) {
    var s, i, aa;
    /* the cast turret: the pointed nose at gun height, the long sloped upper front, roof at
       0.90 (2.39 m), the sides curving in to the rear plate (P-F1, P-F3) */
    loftN(B.paint, [ring(-2.30, 0.95, 1.10, 0.85, 0.10, 0.40, 0.84), ring(-1.90, 1.15, 1.30, 1.00, 0.05, 0.40, 0.88),
                    ring(-0.60, 1.30, 1.45, 1.10, 0.02, 0.40, 0.90), ring(0.60, 1.25, 1.40, 1.05, 0.02, 0.40, 0.90),
                    ring(1.40, 0.95, 1.10, 0.75, 0.04, 0.35, 0.66), ring(2.05, 0.40, 0.50, 0.30, 0.18, 0.32, 0.42)]);
    cylZ(B.dark, 0, 0, -0.03, 0.05, 1.05, 24);
    /* the canvas mantlet cover at the nose */
    slab(B.paint, [2.08, 0, 0.30], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.08, 0.26, 0.14);
    /* the NBC pack across the turret rear (Mk 2, published) and the stowage basket behind */
    box(B.paint, -2.72, -2.26, -0.95, 0.95, 0.18, 0.72);
    box(B.dark, -2.73, -2.71, -0.80, 0.80, 0.25, 0.65);
    for (s = -1; s <= 1; s += 2) box(B.dark, -3.08, -2.72, s > 0 ? 1.02 : -1.06, s > 0 ? 1.06 : -1.02, 0.25, 0.70);
    box(B.dark, -3.10, -3.06, -1.06, 1.06, 0.25, 0.70);
    box(B.dark, -3.08, -2.72, -1.06, 1.06, 0.25, 0.28);
    /* the IR searchlight in its box on the left of the turret (published; P-F3) */
    box(B.paint, -1.35, -0.15, 1.30, 1.72, 0.42, 0.92);
    box(B.dark, -0.15, -0.12, 1.36, 1.66, 0.48, 0.86);
    for (s = -1; s <= 1; s += 2) {
      /* six-tube smoke dischargers on the cheeks (P-F1, P-F2) */
      dischargers(B, 0.70, s * 1.32, 0.55, s, 3, 2, 0.5);
      box(B.team, -1.85, -1.35, s > 0 ? 1.27 : -1.31, s > 0 ? 1.31 : -1.27, 0.45, 0.55);
      cylZ(B.dark, -1.95, s * 0.80, 0.86, 1.00, 0.05, 8);
    }
    /* the commander's cupola on the right with its MG, the loader's hatch on the left */
    cylZ(B.paint, -0.65, -0.62, 0.90, 1.05, 0.40, 18);
    cylZ(B.paint, -0.65, -0.62, 1.05, 1.11, 0.32, 16);
    for (i = 0; i < 8; i++) {
      aa = i / 8 * TAU;
      box(B.dark, -0.65 + Math.cos(aa) * 0.37 - 0.045, -0.65 + Math.cos(aa) * 0.37 + 0.045, -0.62 + Math.sin(aa) * 0.37 - 0.045, -0.62 + Math.sin(aa) * 0.37 + 0.045, 0.96, 1.03);
    }
    box(B.dark, -0.55, -0.10, -0.68, -0.58, 1.11, 1.18);
    cylX(B.dark, -0.10, 0.30, -0.63, 1.145, 0.02, 0.02, 6);
    cylZ(B.paint, -0.55, 0.62, 0.90, 0.96, 0.30, 16);
    /* the 120 mm L11: thermal sleeve and bands, fume extractor 0.52-0.70 out (P-F3); the
       12.7 mm ranging gun above the mantlet (published, Mk 1 and Mk 2) */
    addGun(B, 2.12, CHF.MUZ - CHF.TX, 0, 0.30, { r0: 0.14, r1: 0.11, ext: [0.52, 0.70], er: 0.165, bands: true });
    cylX(B.dark, 1.90, 2.75, 0.24, 0.47, 0.03, 0.025, 8);
    box(B.paint, 1.80, 2.05, 0.16, 0.32, 0.40, 0.54);
  }

  /* ======================================================================
     CHALLENGER 1 / 2 / 2 TES.  One hull, measured on P-K1 (CR1, Bovington, square side-on,
     gun forward) at 0.0066 m/px: the published 2.95 m to the top of the commander's sight
     = 447 px.  Road wheels 124 px = 0.82 m there.
     ====================================================================== */
  var CHL = {
    NOSE: 4.04, TAIL: -4.04, BELLY: 0.50, DECK: 1.85, SIDE: 1.50, LW: 1.00, HW: 1.72, SKO: 1.755,
    R: { XW: [2.01, 1.03, 0.12, -0.91, -1.69, -2.64], ZW: 0.495, RW: 0.41,
         IDL: { x: 3.03, z: 1.03, r: 0.33 }, SPR: { x: -3.36, z: 0.90, r: 0.34 },
         RET: [-0.48, -2.25], RZ: 1.13, RR: 0.09, TY: 1.355, TW: 0.33, LW: 1.00, link: 0.16, th: 0.07 },
    TX: 0.45, MUZ: 7.52
  };
  /* per variant: the deck and nose heights differ (see the header: P-K1 vs P-K2), the plan
     and the running gear are the same */
  var CHLV = {
    cr1: { turret: "cr1", rw: 0.41, holes: false, drums: false, deck: 1.85, nzt: 1.56, side: 1.50, box: true },
    cr2: { turret: "cr2", rw: 0.395, holes: true, drums: true, deck: 1.57, nzt: 1.30, skirt: [0.80, 1.44] },
    tes: { turret: "cr2", rw: 0.395, holes: true, drums: false, deck: 1.57, nzt: 1.30, skirt: [0.80, 1.44], tes: true }
  };
  var _chlV = CHLV.cr1;
  function chlGlz(x) { var V = _chlV; return x <= 2.60 ? V.deck : V.deck - (x - 2.60) / (3.77 - 2.60) * (V.deck - V.nzt); }
  function chlHull(B, V) {
    var H = CHL, s, i, D = V.deck;
    _chlV = V;
    /* the tub: the long glacis from 2.60 m forward down to the nose top, the short nose face,
       the lower plate to the belly (published clearance 0.50 m) */
    prismY(B.paint, [[H.TAIL, D], [H.TAIL, 0.95], [H.TAIL + 0.35, H.BELLY], [3.35, H.BELLY], [4.00, 1.15],
                     [3.77, V.nzt], [2.60, D]], -H.LW, H.LW);
    if (V.side) {
      /* CR1: the upper hull across the tracks, the Chobham side panels 1.50-1.85 m (P-K1:
         the top run of the track shows below them) */
      loftN(B.paint, [hsec(H.TAIL, H.HW, V.side, D), hsec(2.60, H.HW, V.side, D), hsec(3.70, H.HW, V.side, chlGlz(3.70) - 0.02)]);
    } else {
      /* CR2: the sponsons over the tracks up to the lower deck, and the side skirts hung
         outboard of them, covering the top run (P-K2) */
      loftN(B.paint, [hsec(H.TAIL, H.HW - 0.08, 1.30, D), hsec(2.60, H.HW - 0.08, 1.30, D), hsec(3.70, H.HW - 0.08, 1.20, chlGlz(3.70) - 0.02)]);
      for (s = -1; s <= 1; s += 2) {
        var ya = s > 0 ? H.HW - 0.08 : -H.SKO, yb = s > 0 ? H.SKO : -H.HW + 0.08;
        prismY(B.paint, [[-3.70, 1.05], [-3.30, V.skirt[0]], [3.00, V.skirt[0]], [3.44, 1.05], [3.44, V.skirt[1]], [-3.70, V.skirt[1]]], ya, yb);
        for (i = 1; i < 5; i++) {
          var jx = -3.70 + i * 7.14 / 5;
          box(B.dark, jx - 0.012, jx + 0.012, s > 0 ? H.SKO : -H.SKO - 0.01, s > 0 ? H.SKO + 0.01 : -H.SKO, V.skirt[0] + 0.03, V.skirt[1] - 0.03);
        }
      }
    }
    for (s = -1; s <= 1; s += 2) {
      /* the front track guard boxes, sloped front (P-K1, P-K2) */
      prismY(B.paint, [[3.55, 1.12], [3.95, 1.20], [4.04, 1.40], [3.98, Math.min(1.60, V.nzt + 0.04)], [3.55, Math.min(1.60, V.nzt + 0.04)]], s > 0 ? 1.06 : -H.HW, s > 0 ? H.HW : -1.06);
      if (V.side) box(B.dark, 0.88, 0.91, s > 0 ? H.HW : -H.HW - 0.01, s > 0 ? H.HW + 0.01 : -H.HW, V.side + 0.02, D - 0.02);
      /* tow eyes and rear lights */
      box(B.dark, 3.80, 4.02, s * 0.62 - 0.07, s * 0.62 + 0.07, 0.80, 0.94);
      box(B.dark, H.TAIL - 0.02, H.TAIL + 0.06, s * 1.10 - 0.07, s * 1.10 + 0.07, 1.00, 1.14);
      box(B.dark, H.TAIL - 0.02, H.TAIL + 0.01, s * 1.20 - 0.07, s * 1.20 + 0.07, D - 0.22, D - 0.12);
    }
    /* CR1: the raised rear deck box over the engine (P-K1: X -2.56 to -3.85, top 1.98 m);
       the louvres on top of it */
    if (V.box) {
      box(B.paint, -3.85, -2.56, -1.25, 1.25, D, D + 0.13);
      for (i = 0; i < 7; i++) box(B.dark, -3.75 + i * 0.17, -3.67 + i * 0.17, -1.10, 1.10, D + 0.13, D + 0.14);
    } else {
      for (i = 0; i < 7; i++) box(B.dark, -3.75 + i * 0.17, -3.67 + i * 0.17, -1.10, 1.10, D, D + 0.012);
    }
    /* the driver's hatch on the centreline at the top of the glacis */
    box(B.paint, 2.15, 2.65, -0.30, 0.30, D - 0.01, D + 0.05);
    box(B.dark, 2.65, 2.75, -0.14, 0.14, chlGlz(2.70), chlGlz(2.70) + 0.09);
    /* CR2: the two jettisonable fuel drums on the rear plate (P-K2) */
    if (V.drums) for (s = -1; s <= 1; s += 2) cylY(B.paint, H.TAIL - 0.30, s * 0.10, s * 0.95, 1.20, 0.29, 16);
    box(B.team, H.TAIL - 0.006, H.TAIL, -0.40, 0.40, D - 0.11, D - 0.03);
    if (V.tes) chlTesHull(B);
  }
  /* the Theatre Entry Standard hull fit (P-T1, P-T2): the deep add-on armour boxes over the
     front two thirds of each side, the bar (slat) armour on the rear third and across the
     back, the thick add-on block on the glacis and nose; published width 4.2 m */
  function chlTesHull(B) {
    var H = CHL, s, i, y0, y1, x;
    for (s = -1; s <= 1; s += 2) {
      y0 = s > 0 ? H.HW : -2.10; y1 = s > 0 ? 2.10 : -H.HW;
      prismY(B.paint, [[-1.95, 0.62], [3.70, 0.62], [4.05, 0.95], [4.05, 1.62], [-1.95, 1.70]], y0, y1);
      for (i = 1; i < 4; i++) box(B.dark, -1.95 + i * 1.45 - 0.012, -1.95 + i * 1.45 + 0.012, s > 0 ? 2.10 : -2.11, s > 0 ? 2.11 : -2.10, 0.66, 1.66);
      /* the bar armour on the rear third: frame and vertical bars standing off the side */
      y0 = s * 2.05;
      box(B.dark, -4.05, -1.95, y0 - 0.02, y0 + 0.02, 1.70, 1.75);
      box(B.dark, -4.05, -1.95, y0 - 0.02, y0 + 0.02, 0.72, 0.77);
      for (x = -3.98; x < -1.95; x += 0.14) box(B.dark, x, x + 0.025, y0 - 0.015, y0 + 0.015, 0.77, 1.70);
      for (i = 0; i < 4; i++) box(B.dark, -3.9 + i * 0.6, -3.86 + i * 0.6, s > 0 ? H.HW : y0, s > 0 ? y0 : -H.HW, 1.55, 1.59);
    }
    /* across the back, standing 0.40 m off the rear plate */
    box(B.dark, -4.47, -4.43, -2.05, 2.05, 1.75, 1.80);
    box(B.dark, -4.47, -4.43, -2.05, 2.05, 0.65, 0.70);
    for (y0 = -2.0; y0 < 2.05; y0 += 0.14) box(B.dark, -4.465, -4.435, y0, y0 + 0.025, 0.70, 1.75);
    for (s = -1; s <= 1; s += 2) box(B.dark, -4.45, H.TAIL, s * 1.95 - 0.02, s * 1.95 + 0.02, 1.70, 1.74);
    /* the add-on block over the glacis and nose (P-T2) */
    var ga = Math.atan2(_chlV.deck - _chlV.nzt, 3.77 - 2.60);
    slab(B.paint, [3.18, 0, chlGlz(3.18) + 0.10], [Math.cos(ga), 0, -Math.sin(ga)], [0, 1, 0], [Math.sin(ga), 0, Math.cos(ga)], 0.62, 1.20, 0.10);
    box(B.paint, 3.78, 4.18, -1.20, 1.20, 1.05, 1.42);
  }
  /* turret-local: x forward of the axis (X 0.45), z above the roof (1.85) */
  function chlTurretCR1(B) {
    var s, i, aa;
    /* the Chobham turret (P-K1): the front tip low at 2.09, the long flat sloped upper face
       up to the roof edge at 0.46, flat roof 0.72 (2.57 m), slab sides, the bustle */
    loftN(B.paint, [ring(-2.78, 1.20, 1.30, 1.15, 0.20, 0.45, 0.68), ring(-2.40, 1.45, 1.60, 1.40, 0.12, 0.50, 0.72),
                    ring(0.46, 1.45, 1.60, 1.40, 0.10, 0.50, 0.72), ring(1.60, 1.25, 1.42, 1.22, 0.10, 0.30, 0.38),
                    ring(2.09, 0.55, 0.60, 0.50, 0.10, 0.16, 0.22)]);
    cylZ(B.dark, 0, 0, -0.03, 0.10, 1.10, 24);
    /* the bustle stowage (P-K1) */
    box(B.paint, -3.07, -2.75, -1.15, 1.15, 0.25, 0.60);
    box(B.dark, -3.08, -3.06, -1.05, 1.05, 0.30, 0.55);
    /* the mantlet slot */
    box(B.paint, 1.70, 2.12, -0.32, 0.32, 0.17, 0.47);
    /* the commander's No. 15 cupola on the right, top of its sight 1.10 (the published 2.95 m) */
    cylZ(B.paint, -0.84, -0.62, 0.72, 0.86, 0.42, 18);
    cylZ(B.paint, -0.84, -0.62, 0.86, 0.92, 0.34, 16);
    for (i = 0; i < 8; i++) {
      aa = i / 8 * TAU;
      box(B.dark, -0.84 + Math.cos(aa) * 0.39 - 0.045, -0.84 + Math.cos(aa) * 0.39 + 0.045, -0.62 + Math.sin(aa) * 0.39 - 0.045, -0.62 + Math.sin(aa) * 0.39 + 0.045, 0.78, 0.85);
    }
    box(B.paint, -0.70, -0.45, -0.70, -0.50, 0.92, 1.10);
    box(B.dark, -0.45, -0.44, -0.67, -0.53, 0.96, 1.06);
    /* the loader's hatch on the left */
    cylZ(B.paint, -0.60, 0.62, 0.72, 0.78, 0.32, 16);
    for (s = -1; s <= 1; s += 2) {
      box(B.team, -2.20, -1.60, s > 0 ? 1.58 : -1.61, s > 0 ? 1.61 : -1.58, 0.35, 0.45);
      cylZ(B.dark, -2.30, s * 0.95, 0.72, 0.86, 0.05, 8);
    }
    /* the 120 mm L11: thermal sleeve, bands, fume extractor 0.52-0.70 out (P-K1) */
    addGun(B, 2.12, CHL.MUZ - CHL.TX, 0, 0.33, { r0: 0.14, r1: 0.11, ext: [0.52, 0.70], er: 0.165, bands: true });
  }
  function chlTurretCR2(B, V) {
    var s, i, aa, x, y0;
    /* the CR2 turret (P-K2, P-K3): the near-vertical face leaning back from 2.17 to 1.99,
       the slab sides with their lower edge stepped in, roof 0.64 (published 2.49 m), long
       bustle to -2.99 */
    loftN(B.paint, [ring(-2.99, 1.15, 1.40, 1.20, 0.12, 0.40, 0.86), ring(-2.60, 1.30, 1.60, 1.35, 0.02, 0.40, 0.92),
                    ring(1.99, 1.30, 1.55, 1.30, 0.02, 0.40, 0.92), ring(2.17, 0.95, 1.10, 0.90, 0.02, 0.36, 0.80)]);
    cylZ(B.dark, 0, 0, -0.03, 0.04, 1.10, 24);
    /* the mantlet */
    box(B.paint, 2.15, 2.42, -0.34, 0.34, 0.26, 0.62);
    /* the gunner's sight housing on the front right of the roof (P-K2) */
    box(B.paint, 1.45, 2.05, -0.98, -0.48, 0.92, 1.18);
    box(B.dark, 2.05, 2.07, -0.92, -0.54, 0.98, 1.14);
    /* the commander's sight head ahead of his hatch, the hatches */
    cylZ(B.paint, 0.55, -0.45, 0.92, 1.08, 0.15, 12);
    box(B.paint, 0.45, 0.75, -0.58, -0.32, 1.08, 1.18);
    cylZ(B.paint, -0.45, -0.62, 0.92, 1.00, 0.38, 18);
    cylZ(B.paint, -0.45, 0.62, 0.92, 0.97, 0.32, 16);
    for (i = 0; i < 6; i++) {
      aa = i / 6 * TAU;
      box(B.dark, -0.45 + Math.cos(aa) * 0.36 - 0.04, -0.45 + Math.cos(aa) * 0.36 + 0.04, -0.62 + Math.sin(aa) * 0.36 - 0.04, -0.62 + Math.sin(aa) * 0.36 + 0.04, 0.95, 1.02);
    }
    for (s = -1; s <= 1; s += 2) {
      /* the five-tube smoke dischargers at the front corners of the roof (P-K2) */
      dischargers(B, 1.75, s * 1.30, 0.94, s, 5, 1, 0.8);
      box(B.team, -2.30, -1.70, s > 0 ? 1.60 : -1.63, s > 0 ? 1.63 : -1.60, 0.62, 0.72);
      cylZ(B.dark, -2.55, s * 0.95, 0.92, 1.06, 0.05, 8);
    }
    if (V.tes) {
      /* TES (P-T1, P-T2): the add-on armour on the front half of each turret side, the
         remote weapon station over the loader, the slat cage round the bustle, the mast
         with its platform at the rear */
      for (s = -1; s <= 1; s += 2) {
        prismY(B.paint, [[-0.20, 0.10], [1.95, 0.10], [2.10, 0.35], [1.95, 0.85], [-0.20, 0.85]], s > 0 ? 1.55 : -1.85, s > 0 ? 1.85 : -1.55);
        y0 = s * 1.88;
        box(B.dark, -3.30, -0.30, y0 - 0.02, y0 + 0.02, 0.84, 0.88);
        box(B.dark, -3.30, -0.30, y0 - 0.02, y0 + 0.02, 0.18, 0.22);
        for (x = -3.25; x < -0.30; x += 0.14) box(B.dark, x, x + 0.025, y0 - 0.015, y0 + 0.015, 0.22, 0.84);
      }
      box(B.dark, -3.32, -3.28, -1.88, 1.88, 0.84, 0.88);
      box(B.dark, -3.32, -3.28, -1.88, 1.88, 0.18, 0.22);
      for (y0 = -1.85; y0 < 1.88; y0 += 0.14) box(B.dark, -3.315, -3.285, y0, y0 + 0.025, 0.22, 0.84);
      /* the RWS: pedestal, cradle, the weapon and its sight box */
      cylZ(B.dark, 0.10, 0.62, 0.92, 1.12, 0.12, 10);
      box(B.dark, -0.15, 0.40, 0.42, 0.82, 1.12, 1.32);
      cylX(B.dark, 0.40, 1.10, 0.66, 1.23, 0.04, 0.035, 8);
      box(B.dark, 0.05, 0.35, 0.82, 0.95, 1.15, 1.30);
      /* the mast: four legs, the platform at 0.62 m over the roof, the cage on top */
      for (i = 0; i < 4; i++) cylZ(B.dark, -1.90 + (i % 2 ? 0.25 : -0.25), (i < 2 ? 0.25 : -0.25), 0.92, 1.50, 0.035, 6);
      cylZ(B.paint, -1.90, 0, 1.50, 1.54, 0.48, 16);
      cyl(B.dark, [-1.90, 0, 1.54], [-1.90, 0, 1.86], 0.14, 0.10, 8);
      cylZ(B.dark, -1.90, 0, 1.54, 2.04, 0.035, 6);
    }
    /* the 120 mm L30A1: thermal sleeve, bands, fume extractor 0.49-0.64 out, the muzzle
       reference box (P-K2) */
    addGun(B, 2.42, CHL.MUZ - CHL.TX, 0, 0.44, { r0: 0.14, r1: 0.11, ext: [0.49, 0.64], er: 0.165, bands: true, mrs: true });
  }

  /* ============================================================ build */
  function assemble(THREE, C, key, hullFn, R, wheelArgs, TX, TZ, turretFn) {
    var T = materials(THREE, C, key), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    hullFn(HB);
    addRunning(HB, R);
    flush(THREE, g, HB);
    for (i = 0; i < R.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, R, key, wheelArgs[0], wheelArgs[1]);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(R.XW[i], 0, R.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    turretFn(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, TZ);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  function centurion(THREE, M, C) {
    return assemble(THREE, C, "bronze", function (B) { cenHull(B); cenSkirts(B); addBogies(B, CEN.R, [[0, 1], [2, 3], [4, 5]]); },
                    CEN.R, [10, false], CEN.TX, CEN.DECK, cenTurret);
  }
  function conqueror(THREE, M, C) {
    return assemble(THREE, C, "bronze", function (B) { conHull(B); addBogies(B, CON.R, [[0, 1], [2, 3], [4, 5], [6, 7]]); },
                    CON.R, [8, false], CON.TX, CON.DECK, conTurret);
  }
  function chieftain(THREE, M, C) {
    return assemble(THREE, C, "bronze", function (B) { chfHull(B); chfSkirts(B); addBogies(B, CHF.R, [[0, 1], [2, 3], [4, 5]]); },
                    CHF.R, [10, false], CHF.TX, CHF.DECK, chfTurret);
  }
  function challenger(THREE, M, C, which, key) {
    var V = CHLV[which], R = {}, k;
    for (k in CHL.R) R[k] = CHL.R[k];
    R.RW = V.rw;
    return assemble(THREE, C, key, function (B) { chlHull(B, V); }, R, [V.holes ? 8 : 5, V.holes], CHL.TX, V.deck,
                    function (B) { if (V.turret === "cr1") chlTurretCR1(B); else chlTurretCR2(B, V); });
  }
  return { centurion: centurion, conqueror: conqueror, chieftain: chieftain, challenger: challenger };
})();

/* len: the measured X extent of each build (tail to muzzle, gun forward) */
UNIT_MODELS["gbr_e50_mbt"] = { len: 9.84, build: function (THREE, M, C) { return HeroGBTanks.centurion(THREE, M, C); } };
UNIT_MODELS["gbr_e50_heavy"] = { len: 11.59, build: function (THREE, M, C) { return HeroGBTanks.conqueror(THREE, M, C); } };
UNIT_MODELS["gbr_e60_mbt"] = { len: 10.79, build: function (THREE, M, C) { return HeroGBTanks.chieftain(THREE, M, C); } };
UNIT_MODELS["gbr_e80_mbt"] = { len: 11.58, build: function (THREE, M, C) { return HeroGBTanks.challenger(THREE, M, C, "cr1", "nato"); } };
UNIT_MODELS["gbr_e90_mbt"] = { len: 11.58, build: function (THREE, M, C) { return HeroGBTanks.challenger(THREE, M, C, "cr1", "sand"); } };
UNIT_MODELS["gbr_e90_heavy"] = { len: 12.15, build: function (THREE, M, C) { return HeroGBTanks.challenger(THREE, M, C, "cr2", "nato"); } };
UNIT_MODELS["gbr_e00_mbt"] = { len: 12.15, build: function (THREE, M, C) { return HeroGBTanks.challenger(THREE, M, C, "cr2", "sand"); } };
UNIT_MODELS["gbr_e00_heavy"] = { len: 11.99, build: function (THREE, M, C) { return HeroGBTanks.challenger(THREE, M, C, "tes", "sand"); } };
