/* ========== gb_misc_ground.js - HERO models: the remaining British ground rows ==========
   One file, one shared kit (HeroGBGroundKit), one module per vehicle:
     gbr_e50_spg            HeroGBSexton  Sexton 25-pdr SP (Sexton II, M4-pattern VVSS), SCC 15 olive drab
     gbr_e50_tankdestroyer  HeroGBHornet  FV1620 Hornet: the Humber 1-ton 4x4 with two Malkara, deep bronze green
     gbr_e90_spg            HeroGBAs90    AS-90, green with black disruptive patches
     gbr_e00_spg            HeroGBAs90    AS-90, desert sand (Basra 2008, A2/A3)
     gbr_e90_recon          HeroGBWmik    Land Rover 110 WMIK, green with black disruptive patches
     gbr_e00_recon          HeroGBJackal  Jackal 2 MWMIK, desert sand (Camp Bastion, J1-J4)
   This file calls nothing outside itself: it may load anywhere after three.js (index.html: put
   it beside gb_tanks.js).  The reused-row candidates (gbr_e80_mlrs, gbr_e90_mlrs, gbr_e80_spg,
   gbr_e00_mlrs) are NOT registered here: see ROWS LEFT UNDONE at the end of this header.

   References (Wikimedia Commons, thumb.php width 960-1600, cached in scratchpad/q_gbground_ref;
   published figures en.wikipedia raw, cached in scratchpad/q_gbground_wiki):
     S1 "Sexton self-propelled artillery (cropped).jpg" (sex_side, period B/W, a line of Sextons):
        right side 3/4: the casemate's tall side plates with the sloped front edge, the low rear
        compartment with its rail, three VVSS bogies, front sprocket, rear idler.
     S2 "Sexton S 287191 'Rufus'pic1.JPG" (sex_rufus1): head on: the three-piece transmission cover
        with its bolted flanges, the angled front mudguards, the driver's visor box on the
        vehicle's RIGHT, the gun's shield box on the LEFT of centre (0.08 of the track span).
     S3 "Sexton 0001.jpg" (sex_c, front right 3/4): the bogies with the trailing return roller
        on top (Sexton II), the spoked road wheels in pairs, the casemate side with the door and
        hinges, the rear rail, the gun level (muzzle about over the nose).
     S4 "Sexton self-propelled gun.jpg", S5 "Sexton SP gun.jpg", S6 "Sexton self-propelled gun at
        Musee des Blindes, Saumur ... (53323483700).jpg" (sex_a, sex_d, sex_g): the side plate's
        proportions (tall part / low rear part), the paint.
     H1 "FV1620 Humber Hornet (... Musee des Blindes, France, pic-5.JPG" (hor_side): LEFT side
        square on, nose left: THE measuring photograph (station table below).
     H2 "... pic-2.JPG" (hor_p2): the same side, an ordinary single frame: checks H1's ratios.
     H3 "Flickr - davehighbury - Bovington Tank Museum 345 humber hornet malkara.jpg" (hor_bov):
        head on: the louvred grille, the lamp boxes in mesh guards at the nose corners, the cab's
        vision blocks, the bronze-green paint; the boom RAISED over the cab, missiles forward.
     H4 "Hornet Malkara img 2363.jpg" (hor_2363): the right side, the boom lowered.
     A1 "AS-90 Howitzer 1.jpg" (as_h1): RIGHT side, near square on, gun slightly depressed: THE
        measuring photograph (station table below).
     A2 "AS-90 self-propelled artillery.JPG" and A3 "Flickr - DVIDSHUB - British Soldiers Calibrate
        Artillery.jpg" (as_a, as_iraq): 3 RHA, Basra, 28 Aug 2008 (file metadata): desert sand.
     A4 "AS90 Self-Propelled Gun MOD 45155082.jpg" (as_mod): head on: the turret face with the
        five-tube dischargers either side of the gun, the side bins with their sloped tops, the
        headlamps, the driver front left, the roof rack.
     A5 "British army artillery regiment conducts live-fire exercise at Grafenwoehr 140731-..."
        (as_graf): green with black patches.  A6 "British AS-90 on a trailer at Estonia-Latvia
        border in Ikla.jpg" (as_ikla): left side: seven road wheels, the raised sprocket and
        RAISED rear idler.
     W1 "BRITISH ARMY MOD SPEC LAND ROVER PATROL VECHICLE ALBERT DOCK LIVERPOOL MAY 2013
        (8817705446).jpg" (wm_liv) and W2 "Land Rover RWMIK (46221651722).jpg" (wm_rw): front right
        3/4: no doors or screen, the front hoop over the dash, the main hoop, the cage over the
        tub with the ring and its 12.7 mm, the spare wheel on the right of the tub, the snorkel on
        the right pillar, the GPMG pintle front left, the lamp guards.
     W3 "A Land Rover with Weapon Mounted Installation Kit (WMIK) ... Maysan Province, Iraq. MOD
        45147804.jpg" (wm_iraq): in service, side on but far off.
     J1 "A Jackal Armoured Vehicle is put through it's paces in the desert at Camp Bastion,
        Afghanistan MOD 45148137.jpg" (jk_45148137): RIGHT side, near square on: THE measuring
        photograph.  J2-J4 the same series (45148156, 45148178, 45148175, 45148155): rear 3/4, the
        cage, the rear stowage, the sand paint.
   Published: Sexton 20 ft 1 in (6.12 m) x 8 ft 11 in (2.72 m) x 8 ft (2.44 m), VVSS, 25-pdr
   (87.6 mm); Hornet 5.05 x 2.22 x 2.43 m (Humber Pig 4.93 x 2.04 x 2.12 m), Malkara 1.9 m long,
   203 mm, 0.80 m span; AS-90 9.9 m overall (the article's later list says 9.07), 7.2 m hull,
   3.4 m (list: 3.3) wide, 3.0 m high, L/39 6.022 m barrel, double-baffle brake; Land Rover
   110: 110 in (2.794 m) wheelbase, 181.1 in (4.60 m) long, 70.5 in (1.79 m) wide; Jackal 5.39 x
   2.00 x 1.97 m "not including weapon system".

   MEASURED, each at one station; DISAGREEMENTS and how they are settled:
     Sexton.  No square side photograph was found.  Heights at the first bogie in S1 (ratios to
       the published 2.44 m casemate top): track guard 0.45, sprocket centre 0.31 -> sponson
       1.06 m, sprocket 0.78 m.  Gun offset from S2: 0.22 m left.  Along the hull: bogie pitch
       1.55 m and the sprocket 1.05 m ahead of the first bogie (S1 says 0.68 pitch, S3 0.97: both
       oblique; the mean taken), idler 0.88 m behind the last bogie.  Casemate front corner at
       X 0.40, its foot X 1.30, the step to the low rear part X -1.75 (S6 and S3, corrected for
       the oblique view).
     Hornet.  H1 at 0.00395 m/px, from the published 5.05 m taken as the BODY (nose to rear
       plate, 1280 px).  Check: the near Malkara on the boom measures 486 px along its axis =
       1.90 m at that scale (published 1.9 m: 1 %).  So the published length is the body, and the
       boom and cradle stand 0.93 m behind it: the drawn X extent is 6.15 m.  H2 agrees on the
       ratios (wheelbase / body 0.63 vs H1 0.61; tyre / body 0.24 vs 0.23).  Wheelbase 3.09 m,
       tyres 1.17 m, wing line 1.46 m, bonnet 1.66 -> 1.86 m, cab roof 2.37 m, the ram on the boom
       2.43 m (= the published height).
     AS-90.  A1 at 0.00857 m/px from the published 7.2 m hull (840 px); ground at the track's
       foot.  Turret roof 3.04 m (published 3.0); turret tail with the bustle to the muzzle 9.92 m
       (published 9.9: the 9.07 of the list is not met by the photograph and is not used);
       road-wheel pitch 0.92 m, wheel 0.686 m (80 px, with the rubber; A6 reads the wheels nearer
       0.9 of the pitch, but it is a wide-angle view from below at the rear and is not used for
       sizes); deck 1.60 m, skirts 0.84-1.24 m, gun axis 1.92 m at the trunnion (X 0.04), the
       cradle housing X 0.39-1.30, the extractor sleeve X 1.30-2.36, the brake 0.69 m long.
     WMIK.  Wheelbase, track and length are the Defender 110's published figures; the tyre is the
       published 7.50R16 (0.80 m).  Bonnet 1.24 m and the cage 2.0 m come from W1's ratios to that
       tyre at the front and the rear wheel stations.
     Jackal.  J1 at 0.00468 m/px from the published 5.39 m (1151 px): wheelbase 2.78 m, tyres
       0.97 m (207 px mean of the two), deck 1.05 m, cab sides 1.74 m, roll hoops 1.95 m (published
       1.97 without the weapon), the ring at X -0.19, the M2 to 2.26 m.

   Recognition list (each drawn; source):
     Sexton  1. the open casemate on the Sherman-type hull, tall side plates with the sloped front
               edge, the low rear compartment with its rails - S1, S3, S6
             2. three VVSS bogies with the trailing return roller, front sprocket, rear idler - S1, S3
             3. the rounded three-piece transmission cover with flanges, the angled mudguards - S2
             4. the 25-pdr left of centre in its shield box, the double-baffle brake - S2, S3
     Hornet  5. the Humber 1-ton armoured truck: long sloping bonnet, high slab-sided cab, the big
               cross-country tyres, flat wings - H1, H2, H3
             6. the two Malkara (big long-chord cruciform wings) on the boom lying back over the
               tail, the ram on top, the cradle claws - H1, H2, H4
             7. the grille and the lamp boxes in mesh guards at the nose - H3
     AS-90   8. the big slab turret over the rear two thirds with the sloped upper face, the side
               bins with sloped tops, the louvred bustle box overhanging the tail - A1, A4
             9. the long tube, the corrugated extractor sleeve, the double-baffle brake - A1
            10. seven road wheels, raised front sprocket and raised rear idler, side skirts - A1, A6
     WMIK   11. the doorless, screenless Land Rover 110 with the cage, the ring and M2 over the tub,
               the spare on the side, the snorkel, the front GPMG - W1, W2
     Jackal 12. the open crew cab between armoured side panels, the long sloping engine cover, the
               roll hoops, the ring and M2 behind the cab, the high big-tyred stance - J1-J4
   Paint (no roundels, numbers, plates, tactical signs or unit markings anywhere; S2, A4, W1 and J1
   carry them: not drawn): Sexton SCC 15 olive drab as every surviving Sexton in S2-S6 wears it
   (#4a4a34); Hornet deep bronze green as H3 (Bovington) shows it and gb_tanks.js draws it
   (#3a3f2c; H1's black bands are a museum scheme, not drawn); AS-90 e90 and WMIK e90 the 1990s
   green with black disruptive patches (#4b5040 / #1d1f1a, gb_tanks.js's BAOR scheme; A5 shows it
   on an AS-90); AS-90 e00 and Jackal desert sand (#b9a47c; A2/A3 Basra 2008, J1-J4 Afghanistan).
   NOT CONFIRMED (proportion or judgement, no drawing or published figure):
     Sexton: every station along the hull (no square side photograph; see above); the widths
       (track centres 2.22 m, 0.42 m track, casemate 2.62 m at the foot leaning to 2.38 m at the
       top, the mudguards to the published 2.72 m); the bogie and arm shapes; the interior racks;
       the 1950s paint (no photograph of a Sexton in British service after 1945 is in hand: the
       surviving vehicles' olive drab is drawn, not a later deep bronze green).
     Hornet: all widths (track 1.68 m, body 1.92 m, wings to the published 2.22 m, cab top
       1.60 m); the cab hatches; the boom's arm spacing and the missiles' spacing across (0.76 m,
       from H3); the missile wings' chord (0.90 m read off H1) and the tail.  The boom is drawn in
       its TRAVEL position only: in action (H3) it swings its cradle up over the cab while the
       missiles keep pointing forward, a two-stage motion the renderer's single "podelev" pitch
       cannot show, so no podelev is drawn and the missiles do not move.
     AS-90: the rearmost two road wheels and the idler (dust in A1; idler raised as A6 shows it,
       X -3.50 z 0.95); all widths (track centres 2.84 m, 0.54 m track, skirts to the published 3.4
       m, turret 2.84 m at the base, bins to 3.24 m); the ring centre (X -1.30); the gun on the
       centreline (A4 is oblique); hatch, cupola, sight box and GPMG sizes; the roof rack (0.12 m
       high); the e00 vehicle is drawn as the e90 one in sand - A2/A3 show no visible add-on kit.
     WMIK: the overhangs (from the Defender's published length), the cage geometry (W1/W2 are 3/4
       views), the ring's place (X -1.05), the tub stowage; e90 paint: no photograph of a 1990s
       WMIK in hand (W1-W3 are 2000s sand), the period's green/black is drawn.
     Jackal: the widths (track 1.64 m, published 2.00 m body), the cab and engine-cover plan, the
       cage's cross members, the stowage; the tyre size (no published figure).
   Engine (js/damage3d.js ENGINE_AT, not edited): gbr_e50_spg "rear" (listed: the radial at the
   back) and gbr_e50_tankdestroyer "front" (listed: the B60 under the bonnet) both match.  The
   AS-90 rows (spg default "front": the engine-deck grilles front right, A1) and the WMIK and
   Jackal (recon default "front": the bonnet / engine cover, W1, J1) match their role default.
   No row's engine is somewhere other than where its role default or listing puts it.
   Materials: PAINT (canvas texture per scheme), DARK, GLASS, WHEEL (vertex colours: tyres, wheel
   discs, hubs) and the team colour exactly as handed in (C.team): strips on the casemate top
   edges / cab sides / turret bins / tub sides and one on the rear.
   Nodes: "turret" - AS-90 (origin on the ring centre at the deck, gun along +X), WMIK and Jackal
   (the ring mount with its M2, origin on the ring centre); the Sexton and the Hornet are
   turret:false rows and have none.  "roadwheel": Sexton six (one per wheel station, both sides),
   AS-90 seven, Hornet / WMIK / Jackal two (one per axle, both wheels; axle along Y).
   Drawn (L x W x H) against published:
     Sexton   6.11 x 2.72 x 2.44   (6.12 x 2.72 x 2.44)                12332 tris, 9 draw calls
     Hornet   6.15 x 2.22 x 2.43   (5.05 body x 2.22 x 2.43; body 5.05 drawn, boom to 6.15)
                                                                          5475 tris, 6 draw calls
     AS-90    9.93 x 3.40 x 3.39 to the GPMG; roof 3.04   (9.9 x 3.4 x 3.0; hull 7.2)
                                                                         17064 tris, 15 draw calls
     WMIK     4.56 x 2.05 (with the side spare) x 2.44 to the M2; cage 2.0  (Defender 110: 4.60 x
              1.79; no published WMIK figure)                             6224 tris, 7 draw calls
     Jackal   5.39 x 2.10 (tyres) x 2.26 to the M2; cage 1.99  (5.39 x 2.00 x 1.97 without weapon)
                                                                          6280 tris, 7 draw calls
   ROWS LEFT UNDONE (not registered; their generic models stand):
     gbr_e80_mlrs, gbr_e90_mlrs (M270) and gbr_e80_spg (M109A2): HeroUsMlrs and HeroPaladin draw
       the vehicles, but no photograph in hand shows the British M270 or M109 in their 1980s-91
       paint (Commons searches found only 2010s-2020s British M270B1/A2 photographs and an IWM
       Gulf War night photograph of a US launcher), so no British repaint is registered.
     gbr_e00_mlrs (M270B1): its armoured cab is not drawn by HeroUsMlrs and no reference in hand
       was measured for it.
   Model space: +X nose, +Y left (port), +Z up, metres, tracks / tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ======================================================================= shared kit */
var HeroGBGroundKit = (function () {
  "use strict";
  var TAU = Math.PI * 2;
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
    var t;
    if (x1 < x0) { t = x0; x0 = x1; x1 = t; }
    if (y1 < y0) { t = y0; y0 = y1; y1 = t; }
    if (z1 < z0) { t = z0; z0 = z1; z1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* an oriented box: centre c, unit axes u v w, half sizes */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a plate in the XZ plane from (x0, z0) to (x1, z1), th thick, from y0 to y1 */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a round bar between two points (any direction) */
  function bar(bin, A, B, r, seg) { cyl(bin, A, B, r, r, seg || 6); }
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 12); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg || 12); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg || 12); }
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
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  /* a track run wrapped round circles [x, z, r] (the wheels, sprocket, idler, rollers):
     the belt on the convex hull, a shoe every `pitch`, a guide horn inside; one side at y */
  function track(bin, circles, y, tw, pitch) {
    /* the circles are the wheels' own rims: the belt and the shoes lie outside them, the shoes'
       outer face 0.07 out (so a road wheel stands RW + 0.07 over the ground) */
    var pts = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, dx, dz, cnt, step, ox, oz;
    for (i = 0; i < circles.length; i++)
      for (k = 0; k < 24; k++) pts.push([circles[i][0] + Math.cos(k / 24 * TAU) * circles[i][2], circles[i][1] + Math.sin(k / 24 * TAU) * circles[i][2]]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    for (i = 0; i < n; i++) {
      if (segs[i][2] < 0.02) continue;
      dx = (segs[i][1][0] - segs[i][0][0]) / segs[i][2]; dz = (segs[i][1][1] - segs[i][0][1]) / segs[i][2];
      ox = dz * 0.025; oz = -dx * 0.025;
      belt(bin, segs[i][0][0] + ox, segs[i][0][1] + oz, segs[i][1][0] + ox, segs[i][1][1] + oz, y - tw, y + tw, 0.045);
    }
    cnt = Math.round(tot / pitch); step = tot / cnt; q = 0; rem = 0;
    for (k = 0; k < cnt; k++) {
      d = (k + 0.5) * step;
      while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
      t = (d - rem) / segs[q][2];
      a = segs[q][0]; b = segs[q][1];
      dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
      px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
      ox = dz * 0.035; oz = -dx * 0.035;
      belt(bin, px + ox - dx * pitch * 0.32, pz + oz - dz * pitch * 0.32, px + ox + dx * pitch * 0.32, pz + oz + dz * pitch * 0.32, y - tw - 0.01, y + tw + 0.01, 0.07);
      belt(bin, px - dx * 0.025 - dz * 0.03, pz - dz * 0.025 + dx * 0.03, px + dx * 0.025 - dz * 0.03, pz + dz * 0.025 + dx * 0.03, y - 0.025, y + 0.025, 0.05);
    }
  }
  /* a toothed sprocket at (x, z) on the side at y (s = side sign), its hub painted */
  function sprocket(D, P, x, z, r, y, s, teeth, half) {
    var i, ta, ca, sa;
    cylY(D, x, y - half, y + half, z, r - 0.05, 18);
    for (i = 0; i < teeth; i++) {
      ta = i / teeth * TAU; ca = Math.cos(ta); sa = Math.sin(ta);
      slab(D, [x + ca * (r - 0.02), y, z + sa * (r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, half * 0.8, 0.028);
    }
    cylY(P, x, y + s * half, y + s * (half + 0.05), z, r * 0.55, 14);
  }

  /* ------------------------------------------------------------------- paint */
  /* British schemes (as gb_tanks.js draws them, which see for the photographs): the 1980s-
     2000s green with black disruptive patches and desert sand; plus the SCC 15 olive drab the
     surviving Sextons wear and deep bronze green (1950s-60s). One tile is 3.4 m of plate. */
  var SCHEMES = {
    olive:  { base: "#4a4a34", blots: ["#424230", "#52523b"], seed: 1944 },
    bronze: { base: "#3a3f2c", blots: ["#343928", "#41462f"], seed: 1955 },
    nato:   { base: "#4b5040", dis: "#1d1f1a", seed: 1983 },
    sand:   { base: "#b9a47c", blots: ["#ad9872", "#c4b088"], seed: 1991 }
  };
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintCanvas(key) {
    var P = SCHEMES[key], cv = document.createElement("canvas"), S = 512, q, R = rng(P.seed), i, k, x, y, w, n, a, dx, dy;
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
      for (i = 0; i < 6; i++) {
        var cx = R() * S, cy = R() * S, rx = 60 + R() * 70, ry = 30 + R() * 40, rr = [];
        n = 7 + ((R() * 4) | 0);
        for (k = 0; k < n; k++) rr.push(0.6 + R() * 0.5);
        for (dx = -1; dx <= 1; dx++) for (dy = -1; dy <= 1; dy++) patch(P.dis, cx + dx * S, cy + dy * S, rx, ry, rr);
      }
    } else {
      for (i = 0; i < 14; i++) {
        var bx = R() * S, by = R() * S, brr = [];
        for (k = 0; k < 8; k++) brr.push(0.7 + R() * 0.4);
        for (dx = -1; dx <= 1; dx++) for (dy = -1; dy <= 1; dy++) patch(P.blots[i % 2], bx + dx * S, by + dy * S, 30 + R() * 50, 20 + R() * 30, brr);
      }
    }
    for (i = 0; i < 5; i++) {
      x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
      q.fillStyle = "rgba(15,16,12,0.28)";
      if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
    }
    for (i = 0; i < 130; i++) {
      q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(200,190,160,0.05)";
      q.fillRect(R() * S, R() * S, 3 + R() * 30, 2 + R() * 20);
    }
    return cv;
  }
  function paintTex(THREE, key) {
    if (_tex[key] !== undefined) return _tex[key];
    _tex[key] = null;
    try {
      var t = new THREE.CanvasTexture(paintCanvas(key));
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      _tex[key] = t;
    } catch (e) { _tex[key] = null; }
    return _tex[key];
  }
  function materials(THREE, C, key) {
    var T = {}, tx = paintTex(THREE, key);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(SCHEMES[key].base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.8, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) }; }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b || !b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      var m = new THREE.Mesh(geo, b.mat);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  /* an sRGB hex as a linear vertex colour, times f */
  function lin(hex, f) {
    var h = typeof hex === "string" ? parseInt(hex.slice(1), 16) : hex;
    return [(h >> 16) & 255, (h >> 8) & 255, h & 255].map(function (c) {
      c /= 255; c = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); return Math.min(1, c * (f || 1));
    });
  }
  /* a node group with origin o, its bins flushed */
  function node(THREE, name, o, B) {
    var g = new THREE.Group(); g.name = name; g.position.set(o[0], o[1], o[2]);
    flush(THREE, g, B); return g;
  }
  /* a wheel on a road vehicle, in a group's frame (axle along Y through the origin), one side
     at y (s the side sign): the tyre with its tread blocks, the rim and the hub, in vertex
     colours on W.  r tyre radius, w half width, rr rim radius, hub the painted rim colour. */
  function tyre(W, y, s, r, w, rr, hub, lugs) {
    var i, a, TY = [0.035, 0.036, 0.034], TD = [0.02, 0.021, 0.02], rb = lugs ? r * 0.955 : r;
    W.col = TY;
    cylY(W, 0, y - w * 0.82, y + w * 0.82, 0, rb, 24);
    cyl(W, [0, y + s * w * 0.82, 0], [0, y + s * w, 0], rb * 0.98, rr * 1.08, 24);
    cyl(W, [0, y - s * w * 0.82, 0], [0, y - s * w, 0], rb * 0.98, rr * 1.08, 24);
    W.col = TD;
    for (i = 0; i < (lugs || 0); i++) {
      a = i / lugs * TAU;
      var rc = (rb + r) / 2;
      slab(W, [Math.cos(a) * rc, y + s * w * 0.18 * (i % 2 ? 1 : -1), Math.sin(a) * rc], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], (r - rb) / 2, w * 0.62, r * 0.07);
    }
    W.col = hub;
    cyl(W, [0, y + s * (w - 0.03), 0], [0, y + s * (w + 0.008), 0], rr, rr * 0.92, 18);
    W.col = [hub[0] * 0.7, hub[1] * 0.7, hub[2] * 0.7];
    cylY(W, 0, y + s * (w + 0.008), y + s * (w + 0.05), 0, rr * 0.36, 12);
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      cylY(W, Math.cos(a) * rr * 0.6, y + s * (w + 0.008), y + s * (w + 0.025), Math.sin(a) * rr * 0.6, 0.018, 6);
    }
  }
  /* a 12.7 mm M2 on its cradle, axis along +X at (x, y, z): receiver, barrel with the
     perforated jacket and flash hider, spade grips, the ammunition box on the left */
  function m2(D, x, y, z) {
    box(D, x - 0.42, x + 0.20, y - 0.07, y + 0.07, z - 0.09, z + 0.08);
    cylX(D, x + 0.20, x + 0.48, y, z, 0.045, 0.045, 10);
    cylX(D, x + 0.48, x + 1.30, y, z, 0.022, 0.020, 8);
    cylX(D, x + 1.24, x + 1.34, y, z, 0.03, 0.03, 8);
    box(D, x - 0.52, x - 0.42, y - 0.08, y + 0.08, z - 0.06, z + 0.02);
    box(D, x - 0.20, x + 0.10, y + 0.08, y + 0.24, z - 0.20, z - 0.02);
    box(D, x - 0.10, x + 0.06, y - 0.04, y + 0.04, z - 0.30, z - 0.09);
  }
  /* a 7.62 mm GPMG on a pintle arm, axis along +X */
  function gpmg(D, x, y, z) {
    box(D, x - 0.35, x + 0.12, y - 0.04, y + 0.04, z - 0.06, z + 0.05);
    box(D, x - 0.62, x - 0.35, y - 0.03, y + 0.03, z - 0.08, z + 0.03);
    cylX(D, x + 0.12, x + 0.72, y, z, 0.016, 0.016, 6);
    box(D, x - 0.08, x + 0.10, y + 0.04, y + 0.14, z - 0.14, z - 0.02);
  }
  return { m2: m2, gpmg: gpmg, TAU: TAU, Bin: Bin, solid: solid, hexa: hexa, box: box, slab: slab, belt: belt, bar: bar, cyl: cyl,
           cylX: cylX, cylY: cylY, cylZ: cylZ, prismY: prismY, prismX: prismX, loftN: loftN, track: track,
           sprocket: sprocket, SCHEMES: SCHEMES, paintTex: paintTex, paintCanvas: paintCanvas, materials: materials,
           bins: bins, flush: flush, lin: lin, node: node, tyre: tyre };
})();

/* ===================================================================== Sexton (S1-S7) */
var HeroGBSexton = (function () {
  "use strict";
  var K = HeroGBGroundKit, TAU = K.TAU, box = K.box, cyl = K.cyl, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ, belt = K.belt;
  /* running gear (M4 VVSS: three bogies of two 20 in wheels a side, sprocket front, idler rear) */
  var TY = 1.11, TW = 0.21, RW = 0.254, ZW = 0.324;
  var BOG = [1.38, -0.17, -1.72], WO = 0.28;
  var XW = [BOG[0] + WO, BOG[0] - WO, BOG[1] + WO, BOG[1] - WO, BOG[2] + WO, BOG[2] - WO];
  var SPR = { x: 2.43, z: 0.78, r: 0.32 }, IDL = { x: -2.60, z: 0.40, r: 0.25 }, RZ = 0.90, RR = 0.11;
  /* hull stations */
  var XR = -3.02, XN = 3.02, ZBELLY = 0.45, ZF = 1.06, ZS = 1.45, ZTOP = 2.44, ZREAR = 2.05;
  var CF0 = 1.30, CF1 = 0.40, CSTEP = -1.75, HWB = 1.31, HWT = 1.19;
  var GUN = { x: 0.55, y: 0.22, z: 1.95, L: 2.47 };

  /* a plate leaning in: a convex profile [x, z] whose outer face is at y(z) = yb .. yt between
     zb and zt; th thick inward; s the side sign */
  function lean(bin, pts, s, yb, yt, zb, zt, th) {
    var V = [], F = [], n = pts.length, i, j, y;
    for (i = 0; i < n; i++) {
      y = yb + (yt - yb) * (pts[i][1] - zb) / (zt - zb);
      V.push([pts[i][0], s * y, pts[i][1]], [pts[i][0], s * (y - th), pts[i][1]]);
    }
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    K.solid(bin, V, F);
  }
  function hwAt(z) { return HWB + (HWT - HWB) * (z - ZS) / (ZTOP - ZS); }
  /* the front plate's x at height z (it slopes as the side plates' front edge) */
  function xFront(z) { return CF0 + (CF1 - CF0) * (z - 1.55) / (ZTOP - 1.55); }

  function addHull(B) {
    var P = B.paint, D = B.dark, s, i, x, y;
    /* lower hull between the tracks and the sponsons over them (S3, S6) */
    K.prismY(P, [[XR, 0.62], [XR + 0.15, ZBELLY], [2.30, ZBELLY], [2.30, ZF], [XR, ZF]], -0.88, 0.88);
    box(P, XR, 2.05, -HWB, HWB, ZF, ZS);
    /* the rounded three-piece transmission cover at the nose with its bolted flanges (S5) */
    K.prismY(P, [[2.05, 0.45], [2.70, 0.45], [2.95, 0.60], [XN, 0.84], [2.97, 1.06], [2.78, 1.22], [2.40, 1.32], [2.05, 1.32]], -0.92, 0.92);
    for (s = -1; s <= 1; s += 2) {
      K.prismY(D, [[2.68, 0.47], [2.96, 0.62], [XN + 0.02, 0.84], [2.99, 1.07], [2.80, 1.24], [2.68, 1.24]], s * 0.40 - 0.03, s * 0.40 + 0.03);
    }
    /* the upper front plate rising to the casemate, driver's visor on the right (S5, S3) */
    K.loftN(P, [[[2.36, -HWB, ZF], [2.36, HWB, ZF], [2.36, HWB, 1.30], [2.36, -HWB, 1.30]],
                [[CF0, -HWB, ZF], [CF0, HWB, ZF], [CF0, HWB, 1.62], [CF0, -HWB, 1.62]]]);
    /* front mudguards, angled down over the sprockets (S5) */
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      K.prismY(P, [[2.05, ZF], [2.93, 0.98], [2.93, 1.16], [2.10, 1.34]], y - 0.25, y + 0.25);
      box(D, 2.91, 2.95, y - 0.24, y + 0.24, 0.92, 1.00);
      /* track guards along the sponson */
      box(P, XR + 0.05, 2.05, s > 0 ? HWB : -HWB - 0.03, s > 0 ? HWB + 0.03 : -HWB, ZF - 0.03, ZF + 0.02);
    }
    /* tow shackles on the nose (S5) */
    for (s = -1; s <= 1; s += 2) { box(D, 2.88, 3.00, s * 0.70 - 0.05, s * 0.70 + 0.05, 0.58, 0.70); }

    /* the casemate: side plates leaning in, the tall front part and the low rear part (S2, S3, S6) */
    for (s = -1; s <= 1; s += 2) {
      lean(P, [[CF0, ZS], [CF1, ZTOP], [CSTEP, ZTOP], [CSTEP, ZS]], s, HWB, HWT, ZS, ZTOP, 0.03);
      lean(P, [[CSTEP + 0.01, ZS], [CSTEP + 0.01, ZREAR], [XR, ZREAR], [XR, ZS]], s, HWB, HWB + (HWT - HWB) * (ZREAR - ZS) / (ZTOP - ZS), ZS, ZREAR, 0.03);
      /* the lower front side plates closing the casemate to the upper front plate */
      lean(P, [[CF0, ZS], [CF0 + 0.25, ZS], [CF0, 1.62]], s, HWB, HWB - 0.01, ZS, 1.62, 0.03);
      /* a stowage door and the plate hinges on the side (S3, S6) */
      x = -0.55;
      box(D, x - 0.40, x + 0.40, s * (hwAt(1.75) + 0.005), s * (hwAt(1.75) - 0.005), 1.62, 1.66);
      box(D, -1.30, -1.26, s * (hwAt(1.9) + 0.012), s * (hwAt(1.9) - 0.0), 1.55, 2.30);
      box(D, -0.95, -0.80, s * (hwAt(2.0) + 0.02), s * (hwAt(2.0) - 0.0), 1.95, 1.99);
      box(D, -0.45, -0.30, s * (hwAt(2.0) + 0.02), s * (hwAt(2.0) - 0.0), 1.95, 1.99);
    }
    /* the front plate across the casemate, with the driver's visor box on the right and the
       gun's opening on the left (S2, S5) */
    var zs = [1.55, 2.44], fx = [xFront(zs[0]), xFront(zs[1])];
    K.loftN(P, [[[fx[0], -hwAt(ZS) + 0.03, zs[0]], [fx[0], GUN.y - 0.32, zs[0]], [fx[1], GUN.y - 0.32, zs[1]], [fx[1], -hwAt(ZTOP) + 0.03, zs[1]]],
                [[fx[0] - 0.03, -hwAt(ZS) + 0.03, zs[0]], [fx[0] - 0.03, GUN.y - 0.32, zs[0]], [fx[1] - 0.03, GUN.y - 0.32, zs[1]], [fx[1] - 0.03, -hwAt(ZTOP) + 0.03, zs[1]]]]);
    K.loftN(P, [[[fx[0], GUN.y + 0.32, zs[0]], [fx[0], hwAt(ZS) - 0.03, zs[0]], [fx[1], hwAt(ZTOP) - 0.03, zs[1]], [fx[1], GUN.y + 0.32, zs[1]]],
                [[fx[0] - 0.03, GUN.y + 0.32, zs[0]], [fx[0] - 0.03, hwAt(ZS) - 0.03, zs[0]], [fx[1] - 0.03, hwAt(ZTOP) - 0.03, zs[1]], [fx[1] - 0.03, GUN.y + 0.32, zs[1]]]]);
    /* below the gun opening */
    K.loftN(P, [[[fx[0], GUN.y - 0.32, zs[0]], [fx[0], GUN.y + 0.32, zs[0]], [xFront(1.80), GUN.y + 0.32, 1.80], [xFront(1.80), GUN.y - 0.32, 1.80]],
                [[fx[0] - 0.03, GUN.y - 0.32, zs[0]], [fx[0] - 0.03, GUN.y + 0.32, zs[0]], [xFront(1.80) - 0.03, GUN.y + 0.32, 1.80], [xFront(1.80) - 0.03, GUN.y - 0.32, 1.80]]]);
    /* driver's visor box (S5: the hooded box with the slit, vehicle's right) */
    x = xFront(2.05);
    box(P, x - 0.05, x + 0.20, -0.75, -0.35, 1.88, 2.18);
    box(D, x + 0.20, x + 0.21, -0.70, -0.40, 1.98, 2.08);
    box(P, x - 0.02, x + 0.26, -0.78, -0.32, 2.18, 2.21);
    /* the open fighting compartment: floor, the rear compartment deck, the rear wall */
    box(D, CF0 - 0.30, CSTEP, -hwAt(ZS) + 0.03, hwAt(ZS) - 0.03, ZS, ZS + 0.04);
    box(P, XR, CSTEP, -hwAt(ZREAR) + 0.02, hwAt(ZREAR) - 0.02, ZS, ZREAR - 0.20);
    box(P, XR, XR + 0.04, -hwAt(ZREAR), hwAt(ZREAR), ZS, ZREAR);
    box(P, CSTEP - 0.03, CSTEP + 0.01, -hwAt(ZTOP) + 0.03, hwAt(ZTOP) - 0.03, ZS, 2.30);
    /* the ammunition racks along the inside walls (dark) */
    for (s = -1; s <= 1; s += 2) box(D, -1.65, 0.20, s * (hwAt(1.7) - 0.03), s * (hwAt(1.7) - 0.28), ZS, 1.95);
    /* the rails round the rear compartment (S1, S2, S6) */
    for (s = -1; s <= 1; s += 2) {
      y = s * (hwAt(ZREAR) - 0.04);
      K.bar(D, [CSTEP - 0.02, y, ZREAR + 0.27], [XR + 0.03, y, ZREAR + 0.27], 0.017, 6);
      for (i = 0; i < 4; i++) { x = CSTEP - 0.05 - i * (CSTEP - XR - 0.1) / 3; K.bar(D, [x, y, ZREAR], [x, y, ZREAR + 0.27], 0.015, 6); }
    }
    K.bar(D, [XR + 0.03, -hwAt(ZREAR) + 0.04, ZREAR + 0.27], [XR + 0.03, hwAt(ZREAR) - 0.04, ZREAR + 0.27], 0.017, 6);
    /* the rear plate: the engine doors and the exhaust deflector (the radial at the back) */
    box(D, XR - 0.02, XR, -0.70, 0.70, 0.75, 1.35);
    box(P, XR - 0.05, XR, -0.95, 0.95, 0.55, 0.72);
    /* team colour: strips along the casemate top edges and on the rear wall */
    for (s = -1; s <= 1; s += 2) box(B.team, -1.60, -0.30, s * (HWT + 0.002), s * (HWT - 0.03), ZTOP - 0.10, ZTOP - 0.02);
    box(B.team, XR - 0.012, XR, -0.45, 0.45, 1.80, 1.95);
  }

  function addRunning(B) {
    var D = B.dark, P = B.paint, s, i, y, C = [], bx;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW]);
    for (i = 0; i < BOG.length; i++) C.push([BOG[i] - 0.30, RZ, RR]);
    C.push([SPR.x, SPR.z, SPR.r - 0.04], [IDL.x, IDL.z, IDL.r]);
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      K.track(D, C, y, TW, 0.16);
      K.sprocket(D, P, SPR.x, SPR.z, SPR.r, y, s, 13, 0.13);
      cylY(P, IDL.x, y - 0.15, y + 0.15, IDL.z, IDL.r, 18);
      cylY(D, IDL.x, y + s * 0.15, y + s * 0.19, IDL.z, 0.08, 10);
      /* the VVSS bogies: bracket bolted to the hull, the volute spring housing, the trailing
         return roller on top (S1, S3, S6) */
      for (i = 0; i < BOG.length; i++) {
        bx = BOG[i];
        box(P, bx - 0.30, bx + 0.30, y - 0.06, y + 0.06, 0.62, 0.86);
        K.prismY(P, [[bx - 0.22, 0.86], [bx + 0.22, 0.86], [bx + 0.14, ZF], [bx - 0.14, ZF]], s * (HWB - 0.10) - 0.02, s * (HWB - 0.10) + 0.02);
        box(P, bx - 0.07, bx + 0.07, y - 0.12, y + 0.12, 0.42, 0.86);
        box(D, bx - 0.075, bx + 0.075, y - 0.125, y + 0.125, 0.50, 0.52);
        box(D, bx - 0.075, bx + 0.075, y - 0.125, y + 0.125, 0.62, 0.64);
        cylY(P, bx - 0.30, y - 0.09, y + 0.09, RZ, RR, 12);
        box(P, bx - 0.34, bx - 0.10, y - 0.05, y + 0.05, RZ - 0.04, RZ + 0.02);
        /* the two wheel arms */
        K.belt(P, bx - 0.04, 0.62, bx - WO, ZW, y - 0.11, y + 0.11, 0.07);
        K.belt(P, bx + 0.04, 0.62, bx + WO, ZW, y - 0.11, y + 0.11, 0.07);
      }
    }
  }
  /* the road wheels: 20 in pressed-steel spoked wheels in pairs with rubber tyres (S3) */
  function addWheel(W, hub) {
    var s, y, i, a, TYc = [0.03, 0.03, 0.028];
    for (s = -1; s <= 1; s += 2) {
      for (var d = -1; d <= 1; d += 2) {
        y = s * TY + d * 0.06;
        W.col = TYc; cylY(W, 0, y - 0.045, y + 0.045, 0, RW, 18);
        W.col = hub; cylY(W, 0, y + d * 0.045, y + d * 0.052, 0, RW - 0.05, 16);
        W.col = [hub[0] * 0.55, hub[1] * 0.55, hub[2] * 0.55];
        for (i = 0; i < 5; i++) {
          a = (i + 0.5) / 5 * TAU;
          K.slab(W, [Math.cos(a) * 0.13, y + d * 0.054, Math.sin(a) * 0.13], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.04, 0.004, 0.03);
        }
      }
      W.col = hub; cylY(W, 0, s * TY - 0.10, s * TY + 0.10, 0, 0.06, 10);
    }
  }
  /* the 25-pounder: barrel with the double-baffle brake, the cradle with the recuperator
     below, the shield box over the mounting (S2, S5) and the breech inside */
  function addGun(B) {
    var P = B.paint, D = B.dark, x0 = GUN.x, y = GUN.y, z = GUN.z, L = GUN.L, xf = xFront(z);
    cylX(P, x0 - 0.10, x0 + L - 0.22, y, z, 0.068, 0.058, 14);
    cylX(P, x0 + 0.95, x0 + 1.25, y, z, 0.085, 0.085, 14);
    cylX(P, x0 + L - 0.24, x0 + L, y, z, 0.10, 0.10, 14);
    box(D, x0 + L - 0.20, x0 + L - 0.12, y - 0.105, y + 0.105, z - 0.06, z + 0.06);
    box(D, x0 + L - 0.09, x0 + L - 0.03, y - 0.105, y + 0.105, z - 0.06, z + 0.06);
    cylX(D, x0 + L - 0.005, x0 + L + 0.002, y, z, 0.045, 0.045, 10);
    /* cradle and recuperator */
    box(P, x0 - 0.45, xf + 0.32, y - 0.13, y + 0.13, z - 0.24, z - 0.06);
    cylX(P, xf, xf + 0.40, y, z - 0.15, 0.08, 0.08, 12);
    /* breech and the layer's seat */
    box(D, x0 - 0.75, x0 - 0.10, y - 0.15, y + 0.15, z - 0.12, z + 0.12);
    box(D, x0 - 0.40, x0 - 0.10, y + 0.25, y + 0.45, ZS, 1.85);
    /* the shield box over the mounting, standing proud of the front plate (S5) */
    box(P, xf - 0.10, xf + 0.20, y - 0.31, y + 0.31, z + 0.08, ZTOP);
    box(P, xf - 0.30, xf + 0.20, y - 0.31, y - 0.28, z - 0.25, ZTOP);
    box(P, xf - 0.30, xf + 0.20, y + 0.28, y + 0.31, z - 0.25, ZTOP);
    box(D, xf + 0.05, xf + 0.16, y - 0.27, y + 0.27, z - 0.25, z + 0.08);
  }

  function build(THREE, M, C) {
    var T = K.materials(THREE, C, "olive"), g = new THREE.Group(), HB = K.bins(T), i, W, hub = K.lin(K.SCHEMES.olive.base, 1.1);
    g.name = "gbr_sexton";
    addHull(HB); addRunning(HB); addGun(HB);
    K.flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      W = new K.Bin(T.wheel, false, true);
      addWheel(W, hub);
      g.add(K.node(THREE, "roadwheel", [XW[i], 0, ZW], { wheel: W }));
    }
    return g;
  }
  return { build: build };
})();

/* ================================================================ Hornet Malkara (H1-H4) */
var HeroGBHornet = (function () {
  "use strict";
  var K = HeroGBGroundKit, TAU = K.TAU, box = K.box, cyl = K.cyl, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ;
  /* stations off H1 at 0.00395 m/px (see the header): X = (704 - px) * s, z = (660 - py) * s */
  var XN = 2.52, XR = -2.53, AX = [1.34, -1.75], RT = 0.585, ZA = 0.585, YT = 0.84, TWH = 0.14;
  var ZW = 1.46, ZBON0 = 1.66, ZBON1 = 1.86, XCF = 0.57, XCT = 0.41, ZROOF = 2.37, XCR = -0.93, ZRB = 1.92, XRB = -1.56;
  var HWB = 0.96, HWT = 0.80, HWW = 1.11;
  /* the missiles (Malkara: 1.9 m, 203 mm, 0.80 m span): nose and tail off H1, both sides */
  var MN = [-1.29, 2.21], MT = [-3.14, 1.72], MY = 0.38;

  function hw(z) { return HWB + (HWT - HWB) * Math.max(0, z - ZW) / (ZROOF - ZW); }

  function addHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, y, i, x, z;
    /* the chassis frame and belly between the wheels */
    box(D, XR + 0.15, XN - 0.25, -0.45, 0.45, 0.48, 0.62);
    /* the armoured body below the wing line: nose to tail, the side lockers between the wheels (H1, H2) */
    K.prismY(P, [[XN - 0.20, 0.72], [XN, 0.95], [XN, ZW], [XR, ZW], [XR, 0.67], [XR + 0.25, 0.62], [XN - 0.40, 0.62]], -0.70, 0.70);
    for (s = -1; s <= 1; s += 2) {
      K.prismY(P, [[AX[0] - RT - 0.10, 0.55], [AX[1] + RT + 0.10, 0.55], [AX[1] + RT + 0.18, ZW], [AX[0] - RT - 0.18, ZW]], s * 0.70, s * HWB);
      /* the locker doors and the step (H1) */
      box(D, -0.95, -0.40, s * (HWB + 0.004), s * HWB, 0.62, 0.97);
      box(D, 0.10, 0.45, s * (HWB + 0.004), s * HWB, 0.62, 0.85);
      box(P, -0.05, 0.50, s * HWB, s * (HWB + 0.10), 0.60, 0.64);
    }
    /* the bonnet: sloping up from the nose to the cab, its sides leaning in (H1, H3) */
    K.loftN(P, [[[XN, -0.92, ZW], [XN, 0.92, ZW], [XN - 0.12, 0.78, ZBON0], [XN - 0.12, -0.78, ZBON0]],
                [[XN - 0.37, -0.95, ZW], [XN - 0.37, 0.95, ZW], [XN - 0.37, 0.80, ZBON0 + 0.02], [XN - 0.37, -0.80, ZBON0 + 0.02]],
                [[XCF, -HWB, ZW], [XCF, HWB, ZW], [XCF, hw(ZBON1), ZBON1], [XCF, -hw(ZBON1), ZBON1]]]);
    /* the louvred grille across the nose (H3) */
    for (i = 0; i < 6; i++) box(D, XN, XN + 0.03, -0.40, 0.40, 1.00 + i * 0.075, 1.03 + i * 0.075);
    box(D, XN - 0.80, XN - 0.30, -0.35, 0.35, ZBON0 + 0.06, ZBON0 + 0.075);
    /* the front wings over the front wheels, angled down at the nose (H1, H3) */
    for (s = -1; s <= 1; s += 2) {
      y = s * HWW;
      K.prismY(P, [[XN + 0.05, 1.28], [XN + 0.05, ZW], [XCF - 0.02, ZW], [XCF - 0.02, ZW - 0.06], [XN - 0.25, ZW - 0.06]], s * 0.92, y);
      box(P, XCF - 0.02, XCF + 0.02, s * HWB, y, 0.85, ZW);
      /* the headlamp boxes in their mesh guards at the nose corners (H3) */
      box(P, XN - 0.10, XN + 0.12, s * 0.70, s * 1.02, 1.10, 1.40);
      cylX(G, XN + 0.12, XN + 0.14, s * 0.86, 1.30, 0.085, 0.085, 12);
      cylX(G, XN + 0.12, XN + 0.14, s * 0.86, 1.16, 0.06, 0.06, 12);
      for (i = 0; i < 4; i++) box(D, XN + 0.15, XN + 0.17, s * (0.71 + i * 0.10), s * (0.72 + i * 0.10), 1.08, 1.42);
      box(D, XN + 0.15, XN + 0.17, s * 0.70, s * 1.02, 1.24, 1.25);
      /* tow hooks */
      box(D, XN - 0.05, XN + 0.10, s * 0.45 - 0.05, s * 0.45 + 0.05, 0.75, 0.85);
    }
    /* the cab: the front sloping back, sides leaning in, flat roof (H1, H3) */
    K.loftN(P, [[[XCF, -HWB, ZW], [XCF, HWB, ZW], [XCF, hw(ZBON1), ZBON1], [XCT, hw(ZROOF), ZROOF], [XCT, -hw(ZROOF), ZROOF], [XCF, -hw(ZBON1), ZBON1]],
                [[XCR, -HWB, ZW], [XCR, HWB, ZW], [XCR, hw(ZBON1), ZBON1], [XCR, hw(ZROOF), ZROOF], [XCR, -hw(ZROOF), ZROOF], [XCR, -hw(ZBON1), ZBON1]]]);
    /* the vision blocks with their flaps on the cab front (H3) and the side ports */
    for (s = -1; s <= 1; s += 2) {
      x = XCF - (XCF - XCT) * 0.55; z = ZBON1 + (ZROOF - ZBON1) * 0.55;
      K.slab(G, [x + 0.012, s * 0.40, z], [0.25, 0, 0.97], [0, 1, 0], [0.97, 0, -0.25], 0.10, 0.22, 0.012);
      K.slab(P, [x + 0.05, s * 0.40, z + 0.14], [0.25, 0, 0.97], [0, 1, 0], [0.97, 0, -0.25], 0.03, 0.25, 0.02);
      /* the side doors with the hinges and the stowed jerricans (H1, H2) */
      box(D, XCF - 0.08, XCR + 0.40, s * (hw(1.9) + 0.006), s * (hw(1.9) - 0.01), 1.50, 2.20);
      box(P, -0.15, 0.30, s * (hw(1.6) + 0.12), s * (hw(1.6) - 0.0), 1.15, 1.62);
      box(P, -0.60, -0.10, s * (hw(2.2) + 0.12), s * (hw(2.2) - 0.0), 1.98, 2.35);
    }
    /* the hatches on the roof: commander's on the left with its lid, the gunner's on the right */
    cylZ(P, -0.20, 0.35, ZROOF, ZROOF + 0.05, 0.30, 16);
    box(P, -0.45, 0.05, -0.65, -0.10, ZROOF, ZROOF + 0.04);
    box(D, 0.20, 0.32, -0.15, 0.15, ZROOF, ZROOF + 0.05);
    /* the rear body behind the cab and the low rear deck under the boom (H1, H2) */
    box(P, XRB, XCR, -hw(ZRB), hw(ZRB), ZW, ZRB);
    box(P, XR, XRB, -HWB, HWB, ZW - 0.10, ZW + 0.06);
    /* the rear wings and the rear plate (H1) */
    for (s = -1; s <= 1; s += 2) {
      K.prismY(P, [[XR, ZW + 0.06], [XR, 0.95], [XR + 0.15, 0.80], [XCR + 0.10, ZW - 0.06], [XCR + 0.10, ZW + 0.06]], s * HWB, s * HWW);
      box(P, XCR + 0.06, XCR + 0.10, s * HWB, s * HWW, 0.95, ZW + 0.06);
      box(B.glass, XR - 0.01, XR, s * 0.80 - 0.06, s * 0.80 + 0.06, 1.25, 1.33);
    }
    box(P, XR - 0.04, XR, -HWB, HWB, 0.67, ZW);
    box(D, XR - 0.10, XR, -0.15, 0.15, 0.65, 0.80);
    /* team colour: strips on the cab sides' top edges and across the rear plate */
    for (s = -1; s <= 1; s += 2) box(B.team, XCR + 0.10, XCT - 0.05, s * (hw(2.30) + 0.003), s * (hw(2.30) - 0.01), 2.27, 2.33);
    box(B.team, XR - 0.045, XR - 0.04, -0.60, 0.60, 1.30, 1.40);
  }

  /* the launcher in its travel position (H1, H2): the pedestal on the rear body, the two box
     arms running back over the tail to the cradle, the ram on top, the two Malkara noses
     forward.  H4 shows the boom raised over the cab in action: not posed here (see header). */
  function addLauncher(B) {
    var P = B.paint, D = B.dark, s, y, i, a, ax = [MN[0] - MT[0], MN[1] - MT[1]], L = Math.sqrt(ax[0] * ax[0] + ax[1] * ax[1]);
    var u = [ax[0] / L, 0, ax[1] / L], w = [-u[2], 0, u[0]];
    box(P, -1.48, -1.12, -0.30, 0.30, ZRB, ZRB + 0.08);
    box(P, -1.40, -1.20, -0.22, 0.22, ZRB + 0.08, 2.00);
    cylY(D, -1.30, -0.50, 0.50, 2.02, 0.07, 12);
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.55;
      /* the box arm, deep at the pivot, tapering to the cradle (H1) */
      K.prismY(P, [[-1.22, 1.95], [-3.30, 2.02], [-3.38, 2.16], [-1.35, 2.24]], y - 0.05, y + 0.05);
      /* the cradle claw hanging from the arm's end */
      K.prismY(P, [[-3.25, 1.62], [-3.42, 1.55], [-3.46, 2.08], [-3.30, 2.12]], y - 0.04, y + 0.04);
      /* the missile: body, ogive nose, the four long-chord wings, the tail and its motor
         nozzles (H1; Malkara 1.9 m x 203 mm, 0.80 m span) */
      var c0 = [MT[0], s * MY, MT[1]], c1 = [MN[0] - u[0] * 0.25, s * MY, MN[1] - u[2] * 0.25];
      cyl(P, c0, c1, 0.1015, 0.1015, 14);
      cyl(P, c1, [MN[0], s * MY, MN[1]], 0.1015, 0.035, 14);
      var mid = [MT[0] + u[0] * 0.70, s * MY, MT[1] + u[2] * 0.70];
      for (i = 0; i < 4; i++) {
        a = i / 4 * TAU;
        var dir = [w[0] * Math.cos(a), Math.sin(a), w[2] * Math.cos(a)];
        var nrm = [u[1] * dir[2] - u[2] * dir[1], u[2] * dir[0] - u[0] * dir[2], u[0] * dir[1] - u[1] * dir[0]];
        K.slab(P, [mid[0] + dir[0] * 0.25, mid[1] + dir[1] * 0.25, mid[2] + dir[2] * 0.25], u, dir, nrm, 0.45, 0.15, 0.008);
      }
      cyl(D, [MT[0] - u[0] * 0.04, s * MY, MT[1] - u[2] * 0.04], c0, 0.07, 0.09, 10);
      /* the support shoes under the missile, on the arm's cross tube */
      K.bar(D, [MT[0] + u[0] * 0.15, s * MY, MT[1] + u[2] * 0.15 - 0.10], [MT[0] + u[0] * 0.15, y, 2.06], 0.025, 6);
      K.bar(D, [MT[0] + u[0] * 1.30, s * MY, MT[1] + u[2] * 1.30 - 0.10], [MT[0] + u[0] * 1.30, y, 2.13], 0.025, 6);
    }
    cylY(D, -3.36, -0.60, 0.60, 2.08, 0.05, 10);
    /* the ram lying on top of the boom (H1: the top line of the vehicle, published 2.43 m) */
    cylX(P, -2.37, -1.29, 0, 2.37, 0.06, 0.06, 12);
    box(D, -1.40, -1.28, -0.04, 0.04, 2.24, 2.37);
    box(D, -2.42, -2.30, -0.04, 0.04, 2.14, 2.37);
  }

  /* a road wheel pair on one axle: 11.00-20 cross-country tyres (H1: 1.17 m) on the
     bolted disc wheels */
  function addAxle(W, hub) {
    for (var s = -1; s <= 1; s += 2) K.tyre(W, s * YT, s, RT, TWH, 0.30, hub, 26);
    W.col = [0.03, 0.03, 0.03];
    cylY(W, 0, -YT + 0.1, YT - 0.1, -0.05, 0.06, 8);
  }

  function build(THREE, M, C) {
    var T = K.materials(THREE, C, "bronze"), g = new THREE.Group(), HB = K.bins(T), i, W, hub = K.lin(K.SCHEMES.bronze.base, 1.15);
    g.name = "gbr_hornet";
    addHull(HB); addLauncher(HB);
    K.flush(THREE, g, HB);
    for (i = 0; i < AX.length; i++) {
      W = new K.Bin(T.wheel, false, true);
      addAxle(W, hub);
      g.add(K.node(THREE, "roadwheel", [AX[i], 0, ZA], { wheel: W }));
    }
    return g;
  }
  return { build: build };
})();

/* ======================================================================== AS-90 (A1-A6) */
var HeroGBAs90 = (function () {
  "use strict";
  var K = HeroGBGroundKit, TAU = K.TAU, box = K.box, cyl = K.cyl, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ;
  /* stations off A1 at 0.00857 m/px (the published 7.2 m hull = 840 px): X = (px - 555) * s,
     z = (860 - py) * s; see the header */
  var TY = 1.42, TW = 0.27, RW = 0.343, ZW = 0.413;
  var XW = [2.31, 1.39, 0.47, -0.45, -1.37, -2.29, -3.21];
  var SPR = { x: 3.10, z: 0.66, r: 0.30 }, IDL = { x: -3.50, z: 0.95, r: 0.28 };
  var XR = -3.70, XN = 3.50, ZBELLY = 0.45, ZSK0 = 0.84, ZF = 1.24, ZD = 1.60, HWH = 1.10, HWS = 1.66;
  /* turret, model frame: ring centre X -1.30 on the deck; face foot X 0.39 to z 2.23, roof edge
     X -0.09, roof 3.04, tail -3.30, bustle box to -3.88 */
  var TX = -1.30, XTF = 0.39, ZTM = 2.23, XTR = -0.09, ZROOF = 3.04, XTT = -3.30, XBU = -3.88;
  var HTB = 1.42, HTT = 1.28;
  var GZ = 1.92, GX = 0.04, GL = 6.0;

  function addHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, i, y, x;
    /* the hull between the tracks: belly, the short lower nose, the long upper glacis (A1, A2) */
    K.prismY(P, [[XR, 0.62], [XR + 0.15, ZBELLY], [3.20, ZBELLY], [XN, 0.98], [2.20, ZD], [XR, ZD]], -HWH, HWH);
    /* the sponsons over the tracks */
    for (s = -1; s <= 1; s += 2) K.prismY(P, [[XR, ZF], [3.30, ZF], [3.30, 1.08 + 0.02], [2.20, ZD], [XR, ZD]], s * HWH, s * (HWS - 0.04));
    /* the side skirts over the top run, four panels, and the stowage rails above (A1) */
    for (s = -1; s <= 1; s += 2) {
      y = s * HWS;
      K.prismY(P, [[XR + 0.20, ZSK0], [3.05, ZSK0], [3.35, ZF - 0.02], [3.35, ZF + 0.02], [XR + 0.20, ZF + 0.02]], y - s * 0.04, y);
      for (i = 0; i < 3; i++) { x = 1.60 - i * 1.70; box(D, x - 0.015, x + 0.015, y, y + s * 0.006, ZSK0, ZF); }
      for (i = 0; i < 2; i++) box(D, -3.30 + i * 2.10, -1.40 + i * 2.10, s * (HWS - 0.02), s * (HWS + 0.02), 1.40 + i * 0.02, 1.44 + i * 0.02);
    }
    /* the glacis: headlamps, the driver's hatch front left, the folded travel lock (A1, A3) */
    for (s = -1; s <= 1; s += 2) {
      cylX(P, 3.00, 3.12, s * 0.95, 1.30, 0.10, 0.10, 12);
      cylX(G, 3.12, 3.14, s * 0.95, 1.30, 0.085, 0.085, 12);
      box(D, 3.22, 3.30, s * 1.45 - 0.08, s * 1.45 + 0.08, 1.14, 1.22);
      /* the travel lock's legs folded on the glacis */
      K.bar(D, [3.20, s * 0.30, 1.12], [2.40, s * 0.12, 1.56], 0.035, 6);
      box(D, 3.35, 3.48, s * 0.70 - 0.06, s * 0.70 + 0.06, 0.70, 0.80);
    }
    box(D, 2.36, 2.46, -0.16, 0.16, 1.50, 1.60);
    cylZ(P, 2.55, 0.62, ZD - 0.08, ZD + 0.04, 0.30, 14);
    box(D, 2.80, 2.86, 0.45, 0.80, 1.57, 1.62);
    /* the engine deck grilles on the front right (the Cummins forward) */
    for (i = 0; i < 6; i++) box(D, 1.10 + i * 0.16, 1.18 + i * 0.16, -1.30, -0.50, ZD, ZD + 0.012);
    /* the rear plate: the crew door, lamps, tow points */
    box(P, XR - 0.04, XR, -0.55, 0.55, 0.70, 1.50);
    box(D, XR - 0.05, XR - 0.04, -0.50, 0.50, 0.75, 1.45);
    for (s = -1; s <= 1; s += 2) {
      box(G, XR - 0.02, XR, s * 1.30 - 0.07, s * 1.30 + 0.07, 1.30, 1.40);
      box(D, XR - 0.12, XR, s * 0.85 - 0.06, s * 0.85 + 0.06, 0.62, 0.72);
    }
    box(B.team, XR - 0.012, XR, 0.62, 1.05, 1.48, 1.56);
  }

  function addRunning(B) {
    var D = B.dark, P = B.paint, s, i, y, C = [];
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW]);
    C.push([SPR.x, SPR.z, SPR.r - 0.04], [IDL.x, IDL.z, IDL.r]);
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      K.track(D, C, y, TW, 0.17);
      K.sprocket(D, P, SPR.x, SPR.z, SPR.r, y, s, 12, 0.14);
      cylY(P, IDL.x, y - 0.12, y + 0.12, IDL.z, IDL.r, 18);
      cylY(D, IDL.x, y + s * 0.12, y + s * 0.17, IDL.z, 0.09, 10);
      /* the hydropneumatic struts' arms from the hull to each wheel */
      for (i = 0; i < XW.length; i++) K.belt(P, XW[i] + 0.30, 0.70, XW[i], ZW, s * HWH, s * (HWH + 0.10), 0.10);
    }
  }
  /* a road wheel pair: the twin rubber-tyred discs with a bolted hub (A1, A6) */
  function addWheel(W, hub) {
    var s, d, y, TYc = [0.03, 0.03, 0.028], i, a;
    for (s = -1; s <= 1; s += 2) {
      for (d = -1; d <= 1; d += 2) {
        y = s * TY + d * 0.075;
        W.col = TYc; cylY(W, 0, y - 0.055, y + 0.055, 0, RW, 20);
        W.col = hub; cylY(W, 0, y + d * 0.055, y + d * 0.062, 0, RW - 0.05, 18);
      }
      W.col = [hub[0] * 0.6, hub[1] * 0.6, hub[2] * 0.6];
      cylY(W, 0, s * TY + s * 0.13, s * TY + s * 0.17, 0, 0.11, 12);
      for (i = 0; i < 8; i++) { a = i / 8 * TAU; cylY(W, Math.cos(a) * 0.17, s * TY + s * 0.13, s * TY + s * 0.15, Math.sin(a) * 0.17, 0.02, 6); }
    }
  }

  /* the turret, in its own frame (origin on the ring centre at the deck, x forward) */
  function addTurret(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, i, k, x, y, z, zd = ZD;
    function sec(xm, zt, hwt, hwm, zm) {
      x = xm - TX;
      return [[x, -HTB, 0], [x, HTB, 0], [x, hwm, zm - zd], [x, hwt, zt - zd], [x, -hwt, zt - zd], [x, -hwm, zm - zd]];
    }
    /* the slab-sided body: the near-upright lower face, the long sloped upper face (A1, A3) */
    K.loftN(P, [sec(XTF, ZTM + 0.02, HTB - 0.02, HTB - 0.01, ZTM), sec(XTR, ZROOF, HTT, HTB - 0.04, ZTM), sec(XTT, ZROOF - 0.04, HTT, HTB - 0.04, ZTM)]);
    /* the louvred bustle box overhanging the hull tail (A1) */
    box(P, XBU - TX, XTT - TX + 0.02, -1.10, 1.10, 1.55 - zd + 0.05, 2.82 - zd);
    for (i = 0; i < 9; i++) box(D, XBU - TX - 0.006, XBU - TX, -1.00, 1.00, 1.70 - zd + i * 0.12, 1.75 - zd + i * 0.12);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 9; i++) box(D, XBU - TX + 0.05, XTT - TX - 0.02, s * 1.10, s * 1.106, 1.70 - zd + i * 0.12, 1.75 - zd + i * 0.12);
    /* the side bins with their sloped tops (A1, A3) */
    for (s = -1; s <= 1; s += 2) {
      [[-3.26, -2.44], [-1.16, -0.34]].forEach(function (b) {
        K.prismX(P, [[s * (HTB - 0.05), 2.20 - zd], [s * 1.62, 2.20 - zd], [s * 1.62, 2.62 - zd], [s * 1.40, 2.86 - zd], [s * (HTB - 0.05), 2.86 - zd]], b[0] - TX, b[1] - TX);
        box(D, b[0] - TX + 0.04, b[1] - TX - 0.04, s * 1.62, s * 1.626, 2.30 - zd, 2.34 - zd);
      });
      /* the lower side stowage and its rail */
      box(D, -3.10 - TX, -0.30 - TX, s * HTB, s * (HTB + 0.02), 1.95 - zd, 1.99 - zd);
      /* five-tube smoke dischargers either side of the gun on the face (A3) */
      for (k = 0; k < 5; k++) {
        y = s * (0.62 + (k % 3) * 0.11); z = 2.36 + (k < 3 ? 0 : 0.11) - zd;
        cyl(D, [XTF - TX - 0.05, y + (k < 3 ? 0 : s * 0.05), z], [XTF - TX + 0.13, y + (k < 3 ? 0 : s * 0.05), z + 0.06], 0.045, 0.045, 8);
      }
    }
    /* the roof: the two hatches, the commander's ring and GPMG on the left, the sight box on
       the right front, the roof rack on the rear (A1, A3) */
    var zr = ZROOF - zd;
    cylZ(P, -0.80 - TX, 0.75, zr - 0.02, zr + 0.06, 0.36, 16);
    cylZ(P, -0.80 - TX, -0.70, zr - 0.02, zr + 0.05, 0.32, 16);
    box(D, -0.62 - TX, -0.55 - TX, 0.70, 0.80, zr + 0.06, zr + 0.26);
    cylX(D, -0.75 - TX, 0.45 - TX, 0.75, zr + 0.28, 0.03, 0.025, 8);
    box(D, -0.80 - TX, -0.45 - TX, 0.72, 0.78, zr + 0.22, zr + 0.34);
    box(P, -0.45 - TX, -0.10 - TX, -0.95, -0.65, zr - 0.02, zr + 0.22);
    box(G, -0.10 - TX, -0.09 - TX, -0.92, -0.68, zr + 0.06, zr + 0.18);
    for (s = -1; s <= 1; s += 2) K.bar(D, [-3.25 - TX, s * 1.05, zr + 0.12], [-1.95 - TX, s * 1.05, zr + 0.12], 0.02, 6);
    for (i = 0; i < 3; i++) K.bar(D, [-3.25 - TX + i * 0.65, -1.05, zr + 0.12], [-3.25 - TX + i * 0.65, 1.05, zr + 0.12], 0.02, 6);
    for (i = 0; i < 4; i++) { x = -3.25 - TX + i * 0.43; for (s = -1; s <= 1; s += 2) K.bar(D, [x, s * 1.05, zr - 0.02], [x, s * 1.05, zr + 0.12], 0.018, 6); }
    cylZ(D, -2.90 - TX, -1.10, zr, zr + 0.10, 0.04, 8);
    cylZ(D, -2.90 - TX, 1.10, zr, zr + 0.10, 0.04, 8);
    /* team colour: on the rear bins' sloped tops */
    for (s = -1; s <= 1; s += 2) K.slab(B.team, [-2.85 - TX, s * 1.51, 2.745 - zd], [1, 0, 0], [0, 0.73 * s, 0.68], [0, -0.68 * s, 0.73], 0.30, 0.10, 0.006);
    /* the gun: the armoured cradle housing on the face, the tube with the corrugated
       fume-extractor cover, the double-baffle brake (A1, A3) */
    var gx = GX - TX, gz = GZ - zd;
    box(P, XTF - TX - 0.05, 1.30 - TX, -0.40, 0.40, 1.45 - zd, 2.12 - zd);
    box(D, 1.30 - TX, 1.32 - TX, -0.30, 0.30, 1.55 - zd, 2.02 - zd);
    cylX(P, 1.28 - TX, gx + GL - 0.70, 0, gz, 0.105, 0.088, 16);
    cylX(P, 1.30 - TX, 1.38 - TX, 0, gz, 0.15, 0.15, 16);
    for (i = 0; i < 12; i++) cylX(i % 2 ? D : P, 1.38 - TX + i * 0.08, 1.46 - TX + i * 0.08, 0, gz, i % 2 ? 0.148 : 0.158, i % 2 ? 0.148 : 0.158, 16);
    cylX(P, 2.34 - TX, 2.42 - TX, 0, gz, 0.15, 0.11, 16);
    x = gx + GL;
    cylX(P, x - 0.72, x - 0.66, 0, gz, 0.12, 0.12, 16);
    cylX(P, x - 0.66, x - 0.58, 0, gz, 0.17, 0.17, 16);
    cylX(P, x - 0.36, x - 0.28, 0, gz, 0.17, 0.17, 16);
    cylX(P, x - 0.08, x, 0, gz, 0.17, 0.17, 16);
    box(P, x - 0.58, x - 0.08, -0.17, 0.17, gz + 0.09, gz + 0.15);
    box(P, x - 0.58, x - 0.08, -0.17, 0.17, gz - 0.15, gz - 0.09);
    cylX(D, x - 0.58, x - 0.08, 0, gz, 0.10, 0.10, 12);
    cylX(D, x - 0.004, x + 0.002, 0, gz, 0.078, 0.078, 12);
  }

  function build(THREE, M, C, scheme) {
    var T = K.materials(THREE, C, scheme), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T), i, W;
    var hub = K.lin(K.SCHEMES[scheme].base, scheme === "sand" ? 0.9 : 1.1);
    g.name = "gbr_as90_" + scheme;
    addHull(HB); addRunning(HB);
    K.flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      W = new K.Bin(T.wheel, false, true);
      addWheel(W, hub);
      g.add(K.node(THREE, "roadwheel", [XW[i], 0, ZW], { wheel: W }));
    }
    addTurret(TB);
    g.add(K.node(THREE, "turret", [TX, 0, ZD], TB));
    return g;
  }
  return { build: build };
})();

/* ===================================================== Land Rover 110 WMIK (W1-W4, published) */
var HeroGBWmik = (function () {
  "use strict";
  var K = HeroGBGroundKit, box = K.box, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ, bar = K.bar;
  /* the Defender 110's published plan: 110 in wheelbase, 58.5 in track, 7.50R16 tyres */
  var AX = [1.397, -1.397], YT = 0.743, RT = 0.40, TWH = 0.10, ZA = 0.40;
  var XB = 2.15, XG = 2.05, XBH = 0.62, XR = -2.40, ZSILL = 0.55, ZWING = 1.17, ZBON = 1.24, ZWAIST = 1.12, HW = 0.895;
  /* the cage: front hoop, main hoop, the ring on the rear (W2, W3) */
  var XH1 = 0.55, ZH1 = 1.85, XH2 = -0.45, ZH2 = 1.98, RING = { x: -1.05, z: 1.98, r: 0.45 };

  function addBody(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, y, i, x;
    /* chassis rails and the axles' casings */
    for (s = -1; s <= 1; s += 2) box(D, XR + 0.10, XB - 0.10, s * 0.40 - 0.05, s * 0.40 + 0.05, 0.42, 0.56);
    for (i = 0; i < 2; i++) { cylY(D, AX[i], -YT + 0.12, YT - 0.12, ZA, 0.07, 10); cylZ(D, AX[i], 0, ZA - 0.10, ZA + 0.10, 0.14, 12); }
    /* the front: bumper, the grille panel, bonnet, the flat-topped wings with the lamps in
       their guards (W1, W2) */
    box(D, XB - 0.10, XB, -0.90, 0.90, 0.45, 0.60);
    box(P, XG - 0.05, XG, -0.62, 0.62, 0.58, ZWING);
    for (i = 0; i < 8; i++) box(D, XG, XG + 0.01, -0.30 + i * 0.075, -0.27 + i * 0.075, 0.75, 1.10);
    K.prismY(P, [[XG, 0.80], [XG, ZBON - 0.02], [XG - 0.10, ZBON], [XBH, ZBON + 0.03], [XBH, 0.80]], -0.62, 0.62);
    for (s = -1; s <= 1; s += 2) {
      y = s * HW;
      /* the wing: flat top, its outer face down to the arch */
      K.prismY(P, [[XG, 0.98], [XG, ZWING], [XBH, ZWING], [XBH, 0.98]], s * 0.62, y);
      K.prismY(P, [[XG, 0.58], [XG, 0.85], [AX[0] + 0.48, 0.85], [AX[0] + 0.48, 0.58]], s * 0.62, s * (HW - 0.06));
      /* the wheel-arch eyebrows */
      K.belt(P, AX[0] + 0.50, 0.80, AX[0] + 0.30, 0.98, y, y + s * 0.04, 0.04);
      K.belt(P, AX[0] + 0.30, 0.98, AX[0] - 0.30, 0.98, y, y + s * 0.04, 0.04);
      K.belt(P, AX[0] - 0.30, 0.98, AX[0] - 0.50, 0.80, y, y + s * 0.04, 0.04);
      cylX(P, XG - 0.02, XG + 0.06, s * 0.70, 0.98, 0.09, 0.09, 12);
      cylX(G, XG + 0.06, XG + 0.07, s * 0.70, 0.98, 0.075, 0.075, 12);
      for (i = 0; i < 3; i++) box(D, XG + 0.08, XG + 0.10, s * (0.62 + i * 0.08), s * (0.63 + i * 0.08), 0.86, 1.10);
      /* the body sides: no doors (the WMIK runs open), the sill, the rear tub to the tail */
      box(P, XBH, XR, s * (HW - 0.04), y, ZSILL, ZSILL + 0.12);
      box(P, -0.55, XR, s * (HW - 0.04), y, ZSILL, ZWAIST);
      box(P, XBH - 0.30, XBH, s * (HW - 0.04), y, ZSILL, ZWAIST + 0.08);
      /* rear wheel arch eyebrow on the tub */
      K.belt(P, AX[1] + 0.50, 0.80, AX[1] + 0.30, 0.98, y, y + s * 0.04, 0.04);
      K.belt(P, AX[1] + 0.30, 0.98, AX[1] - 0.30, 0.98, y, y + s * 0.04, 0.04);
      K.belt(P, AX[1] - 0.30, 0.98, AX[1] - 0.50, 0.80, y, y + s * 0.04, 0.04);
      box(G, XR - 0.01, XR, s * 0.75 - 0.05, s * 0.75 + 0.05, 0.70, 0.86);
    }
    /* the floor, the tub's floor and tail board, the front seats, the dash under its cover */
    box(D, XR, XBH, -HW + 0.04, HW - 0.04, ZSILL, ZSILL + 0.05);
    box(P, XR, -0.55, -HW + 0.04, HW - 0.04, 0.80, 0.85);
    box(P, XR, XR + 0.04, -HW, HW, ZSILL, ZWAIST);
    for (s = -1; s <= 1; s += 2) {
      box(D, -0.25, 0.20, s * 0.45 - 0.22, s * 0.45 + 0.22, 0.75, 0.90);
      box(D, -0.30, -0.18, s * 0.45 - 0.22, s * 0.45 + 0.22, 0.90, 1.45);
    }
    box(P, XBH - 0.12, XBH, -HW + 0.04, HW - 0.04, ZSILL, ZBON + 0.08);
    box(D, XBH - 0.40, XBH - 0.10, -0.80, 0.80, 1.05, 1.30);
    /* the snorkel up the right front pillar (W1, W2) */
    bar(P, [XBH + 0.05, -0.92, 0.95], [XBH + 0.02, -0.92, 1.70], 0.06, 10);
    /* the spare wheel stood on the right of the tub (W1, W2) */
    cylY(D, -1.00, -HW - 0.21, -HW - 0.02, 1.10, 0.38, 18);
    cylY(P, -1.00, -HW - 0.22, -HW - 0.20, 1.10, 0.18, 12);
    /* the jerrican and ammunition stowage in the tub */
    for (i = 0; i < 3; i++) box(D, -2.30 + i * 0.30, -2.08 + i * 0.30, 0.45, 0.82, 0.85, 1.30);
    /* the cage: the front hoop over the dash, the main hoop behind the seats, the side rails
       running back over the tub and down to its corners (W1-W3) */
    var R = 0.028, yh = HW - 0.06;
    for (s = -1; s <= 1; s += 2) {
      bar(P, [XBH - 0.05, s * yh, ZWAIST], [XH1, s * (yh - 0.10), ZH1], R, 8);
      bar(P, [-0.40, s * yh, ZWAIST], [XH2, s * (yh - 0.05), ZH2], R, 8);
      bar(P, [XH1, s * (yh - 0.10), ZH1], [XH2, s * (yh - 0.05), ZH2], R, 8);
      bar(P, [XH2, s * (yh - 0.05), ZH2], [-1.60, s * (yh - 0.05), ZH2 - 0.02], R, 8);
      bar(P, [-1.60, s * (yh - 0.05), ZH2 - 0.02], [XR + 0.10, s * yh, ZWAIST], R, 8);
      bar(P, [XH2, s * (yh - 0.05), ZH2], [-1.00, s * yh, ZWAIST], R * 0.9, 8);
    }
    bar(P, [XH1, -yh + 0.10, ZH1], [XH1, yh - 0.10, ZH1], R, 8);
    bar(P, [XH2, -yh + 0.05, ZH2], [XH2, yh - 0.05, ZH2], R, 8);
    bar(P, [-1.60, -yh + 0.05, ZH2 - 0.02], [-1.60, yh - 0.05, ZH2 - 0.02], R, 8);
    /* the ring's race carried on the cage (the ring itself turns: "turret") */
    for (i = 0; i < 16; i++) {
      var a0 = i / 16 * K.TAU, a1 = (i + 1) / 16 * K.TAU;
      bar(D, [RING.x + Math.cos(a0) * RING.r, Math.sin(a0) * RING.r, RING.z - 0.03], [RING.x + Math.cos(a1) * RING.r, Math.sin(a1) * RING.r, RING.z - 0.03], 0.03, 6);
    }
    /* the front passenger's GPMG on its pintle at the dash, left (W1) */
    bar(D, [XBH - 0.05, 0.50, 1.20], [XBH + 0.05, 0.50, 1.42], 0.025, 6);
    K.gpmg(D, XBH + 0.10, 0.50, 1.47);
    /* team colour: strips on the tub's top edges and the bonnet */
    for (s = -1; s <= 1; s += 2) box(B.team, -2.20, -0.70, s * (HW + 0.002), s * (HW - 0.03), ZWAIST - 0.08, ZWAIST - 0.01);
    box(B.team, 1.40, 1.70, -0.08, 0.08, ZBON + 0.015, ZBON + 0.03);
  }
  /* the ring mount and its 12.7 mm M2 ("turret": origin on the ring centre) */
  function addRing(B) {
    var D = B.dark, i, a0, a1;
    for (i = 0; i < 16; i++) {
      a0 = i / 16 * K.TAU; a1 = (i + 1) / 16 * K.TAU;
      bar(D, [Math.cos(a0) * (RING.r - 0.04), Math.sin(a0) * (RING.r - 0.04), 0.02], [Math.cos(a1) * (RING.r - 0.04), Math.sin(a1) * (RING.r - 0.04), 0.02], 0.025, 6);
    }
    bar(D, [RING.r - 0.06, 0, 0.02], [0.05, 0, 0.18], 0.03, 6);
    bar(D, [0.05, 0, 0.18], [0.05, 0, 0.28], 0.035, 8);
    K.m2(D, 0.05, 0, 0.38);
  }
  function addAxle(W, hub) {
    for (var s = -1; s <= 1; s += 2) K.tyre(W, s * YT, s, RT, TWH, 0.20, hub, 22);
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, "nato"), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T), i, W, hub = K.lin(K.SCHEMES.nato.base, 1.2);
    g.name = "gbr_wmik";
    addBody(HB);
    K.flush(THREE, g, HB);
    for (i = 0; i < AX.length; i++) {
      W = new K.Bin(T.wheel, false, true);
      addAxle(W, hub);
      g.add(K.node(THREE, "roadwheel", [AX[i], 0, ZA], { wheel: W }));
    }
    addRing(TB);
    g.add(K.node(THREE, "turret", [RING.x, 0, RING.z], TB));
    return g;
  }
  return { build: build };
})();

/* ===================================================== Jackal 2 MWMIK (J1-J4) */
var HeroGBJackal = (function () {
  "use strict";
  var K = HeroGBGroundKit, box = K.box, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ, bar = K.bar;
  /* stations off J1 at 0.00468 m/px (the published 5.39 m = 1151 px): X = (px - 561.5) * s,
     z = (712 - py) * s */
  var AX = [1.39, -1.39], YT = 0.82, RT = 0.485, TWH = 0.18, ZA = 0.485;
  var XN = 3.02, XR = -2.34, ZB = 0.34, ZDK = 1.05, HW = 0.98, HWU = 0.90;
  var XCF = 1.72, XCR = -0.10, ZCAB = 1.74, XBN = 2.35, ZBN = 1.40;
  var RING = { x: -0.19, z: 1.75, r: 0.48 };

  function addBody(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, y, i, x;
    /* the hull tub: its slab sides from the belly up to the deck line; the dark underside (J1) */
    box(D, XR + 0.30, XN - 0.50, -0.55, 0.55, 0.22, ZB);
    K.prismY(P, [[XR, 0.62], [XR + 0.20, 0.50], [AX[1] - 0.55, ZB], [AX[0] + 0.60, ZB], [XN - 0.15, 0.62], [XN - 0.15, ZDK - 0.10], [XR, ZDK]], -0.62, 0.62);
    for (s = -1; s <= 1; s += 2) {
      y = s * HW;
      /* the side boxes between the wheels (louvred panel, J1) */
      box(P, AX[1] + 0.58, AX[0] - 0.62, s * 0.62, y, ZB, ZDK);
      for (i = 0; i < 9; i++) box(D, -0.65 + i * 0.05, -0.63 + i * 0.05, y, y + s * 0.005, 0.50, 0.70);
      /* wheel arches: the mudguards in front of and behind each wheel */
      [0, 1].forEach(function (k) {
        K.prismY(P, [[AX[k] - 0.55, ZDK], [AX[k] + 0.55, ZDK], [AX[k] + 0.62, 0.78], [AX[k] - 0.62, 0.78]], s * 0.62, s * (HW - 0.02));
      });
      /* the rear deck's sides */
      box(P, XR, AX[1] - 0.55, s * 0.62, y, 0.55, ZDK);
    }
    /* the crew cab: the armoured side panels standing up from the deck, its sloped front over
       the engine, the open top (J1, J2) */
    for (s = -1; s <= 1; s += 2) {
      y = s * HWU;
      K.prismY(P, [[XCR, ZDK], [XCF, ZDK], [XCF + 0.25, ZCAB - 0.12], [XCF, ZCAB], [XCR + 0.10, ZCAB], [XCR, ZCAB - 0.15]], y - s * 0.04, y);
      box(D, 0.30, 1.10, y, y + s * 0.006, 1.10, 1.70);
    }
    /* the engine cover sloping down from the cab to the nose with the lamp clusters and the
       grille guard (J1, J4) */
    K.loftN(P, [[[XCF, -HWU, ZDK], [XCF, HWU, ZDK], [XCF, HWU - 0.05, ZCAB - 0.30], [XCF, -HWU + 0.05, ZCAB - 0.30]],
                [[XBN, -HWU, ZDK - 0.05], [XBN, HWU, ZDK - 0.05], [XBN, HWU - 0.05, ZBN], [XBN, -HWU + 0.05, ZBN]],
                [[XN - 0.15, -0.80, 0.62], [XN - 0.15, 0.80, 0.62], [XN - 0.15, 0.78, 1.10], [XN - 0.15, -0.78, 1.10]]]);
    box(G, XCF - 0.04, XCF + 0.02, -0.75, 0.75, ZCAB - 0.30, ZCAB - 0.10);
    for (s = -1; s <= 1; s += 2) {
      box(P, XN - 0.20, XN - 0.05, s * 0.60, s * 0.92, 0.80, 1.18);
      cylX(G, XN - 0.05, XN - 0.04, s * 0.76, 1.05, 0.06, 0.06, 10);
      cylX(G, XN - 0.05, XN - 0.04, s * 0.76, 0.90, 0.05, 0.05, 10);
      /* the grille guard's side loops (J1) */
      bar(D, [XN - 0.15, s * 0.55, 0.75], [XN - 0.025, s * 0.55, 0.80], 0.025, 6);
      bar(D, [XN - 0.025, s * 0.55, 0.80], [XN - 0.025, s * 0.55, 1.15], 0.025, 6);
      bar(D, [XN - 0.025, s * 0.55, 1.15], [XN - 0.15, s * 0.55, 1.18], 0.025, 6);
      box(D, XN - 0.18, XN - 0.01, s * 0.25 - 0.06, s * 0.25 + 0.06, 0.48, 0.60);
    }
    bar(D, [XN - 0.025, -0.55, 1.00], [XN - 0.025, 0.55, 1.00], 0.025, 6);
    /* the floor, seats, the rear deck with its stowage and jerrican rack (J1, J2) */
    box(D, XCR - 0.60, XCF, -HWU + 0.04, HWU - 0.04, ZDK - 0.15, ZDK - 0.10);
    for (s = -1; s <= 1; s += 2) {
      box(D, 0.80, 1.20, s * 0.40 - 0.22, s * 0.40 + 0.22, ZDK - 0.10, ZDK + 0.10);
      box(D, 0.75, 0.85, s * 0.40 - 0.22, s * 0.40 + 0.22, ZDK + 0.10, ZDK + 0.65);
    }
    box(P, XR, XCR - 0.60, -HW + 0.02, HW - 0.02, ZDK - 0.05, ZDK);
    for (i = 0; i < 5; i++) box(D, -2.10 + i * 0.21, -1.93 + i * 0.21, -0.98, -0.82, ZDK, ZDK + 0.40);
    box(D, -2.25, -1.20, 0.10, 0.80, ZDK, ZDK + 0.35);
    box(D, XR - 0.02, XR + 0.02, -0.80, 0.80, 0.55, 0.80);
    /* the roll cage: two hoops behind the cab, the rails back over the deck and forward to the
       screen frame (J1, J2) */
    var R = 0.035;
    for (s = -1; s <= 1; s += 2) {
      y = s * (HWU - 0.05);
      bar(P, [0.25, y, ZCAB - 0.10], [0.30, y, 1.95], R, 8);
      bar(P, [0.60, y, ZCAB - 0.10], [0.55, y, 1.95], R, 8);
      bar(P, [0.30, y, 1.95], [0.55, y, 1.95], R, 8);
      bar(P, [0.70, y, 1.88], [2.33, y * 0.95, 1.55], R, 8);
      bar(P, [2.33, y * 0.95, 1.55], [XBN, y * 0.95, ZBN], R, 8);
      bar(P, [0.20, y, 1.80], [-1.22, y, 1.72], R, 8);
      bar(P, [-1.22, y, 1.72], [-1.50, y, ZDK], R, 8);
    }
    bar(P, [0.30, -0.85, 1.95], [0.30, 0.85, 1.95], R, 8);
    bar(P, [2.33, -0.81, 1.55], [2.33, 0.81, 1.55], R, 8);
    /* the ring's race on the cage over the rear of the crew compartment */
    for (i = 0; i < 16; i++) {
      var a0 = i / 16 * K.TAU, a1 = (i + 1) / 16 * K.TAU;
      bar(D, [RING.x + Math.cos(a0) * RING.r, Math.sin(a0) * RING.r, RING.z - 0.03], [RING.x + Math.cos(a1) * RING.r, Math.sin(a1) * RING.r, RING.z - 0.03], 0.03, 6);
    }
    /* the commander's GPMG on the front left of the cab (J1) */
    bar(D, [XCF - 0.05, 0.55, ZCAB - 0.30], [XCF + 0.02, 0.55, ZCAB - 0.08], 0.025, 6);
    K.gpmg(D, XCF + 0.08, 0.55, ZCAB - 0.02);
    /* antenna bases */
    cylZ(D, 0.70, -0.85, 1.90, 2.00, 0.03, 6); cylZ(D, -2.20, 0.85, ZDK, ZDK + 0.15, 0.03, 6);
    /* team colour: strips on the cab side panels' top edges and on the tail */
    for (s = -1; s <= 1; s += 2) box(B.team, 0.20, 1.50, s * (HWU + 0.002), s * (HWU - 0.03), ZCAB - 0.08, ZCAB - 0.01);
    box(B.team, XR - 0.025, XR - 0.02, -0.50, 0.50, 0.62, 0.74);
  }
  function addRing(B) {
    var D = B.dark, i, a0, a1;
    for (i = 0; i < 16; i++) {
      a0 = i / 16 * K.TAU; a1 = (i + 1) / 16 * K.TAU;
      bar(D, [Math.cos(a0) * (RING.r - 0.04), Math.sin(a0) * (RING.r - 0.04), 0.02], [Math.cos(a1) * (RING.r - 0.04), Math.sin(a1) * (RING.r - 0.04), 0.02], 0.025, 6);
    }
    bar(D, [RING.r - 0.06, 0, 0.02], [0.05, 0, 0.20], 0.03, 6);
    bar(D, [0.05, 0, 0.20], [0.05, 0, 0.33], 0.04, 8);
    K.m2(D, 0.05, 0, 0.43);
  }
  function addAxle(W, hub) {
    for (var s = -1; s <= 1; s += 2) K.tyre(W, s * YT, s, RT, TWH, 0.26, hub, 26);
  }
  function build(THREE, M, C) {
    var T = K.materials(THREE, C, "sand"), g = new THREE.Group(), HB = K.bins(T), TB = K.bins(T), i, W, hub = K.lin(K.SCHEMES.sand.base, 0.9);
    g.name = "gbr_jackal";
    addBody(HB);
    K.flush(THREE, g, HB);
    for (i = 0; i < AX.length; i++) {
      W = new K.Bin(T.wheel, false, true);
      addAxle(W, hub);
      g.add(K.node(THREE, "roadwheel", [AX[i], 0, ZA], { wheel: W }));
    }
    addRing(TB);
    g.add(K.node(THREE, "turret", [RING.x, 0, RING.z], TB));
    return g;
  }
  return { build: build };
})();


/* ======================================================================= registration
   len: the measured X extent of each build (dump.js) */
UNIT_MODELS["gbr_e50_tankdestroyer"] = { len: 6.15, build: function (THREE, M, C) { return HeroGBHornet.build(THREE, M, C); } };
UNIT_MODELS["gbr_e90_spg"] = { len: 9.93, build: function (THREE, M, C) { return HeroGBAs90.build(THREE, M, C, "nato"); } };
UNIT_MODELS["gbr_e00_spg"] = { len: 9.93, build: function (THREE, M, C) { return HeroGBAs90.build(THREE, M, C, "sand"); } };
UNIT_MODELS["gbr_e90_recon"] = { len: 4.56, build: function (THREE, M, C) { return HeroGBWmik.build(THREE, M, C); } };
UNIT_MODELS["gbr_e00_recon"] = { len: 5.39, build: function (THREE, M, C) { return HeroGBJackal.build(THREE, M, C); } };
UNIT_MODELS["gbr_e50_spg"] = { len: 6.11, build: function (THREE, M, C) { return HeroGBSexton.build(THREE, M, C); } };
