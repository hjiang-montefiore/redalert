/* ========== deu_jpz_lars.js - HERO models: Raketenjagdpanzer 2 / Jaguar 1 and LARS 1 / LARS 2 ==========
   Two modules, one builder each:
     HeroJagdpanzer  one hull of the Kanonenjagdpanzer family, two fits:
       deu_e60_tankdestroyer  Raketenjagdpanzer 2 (SS.11), 1967: the bare hull, the two SS.11 launch
                              rails on their posts rising from the roof.
       deu_e80_tankdestroyer  Jaguar 1 (HOT), 1978: the same hull rebuilt with the add-on spaced armour
                              (the studded plates on the glacis and the casemate sides, the side boxes
                              over the tracks, the front mudguard boxes) and the HOT launcher on the roof.
     HeroLars        one truck family, one launcher:
       deu_e60_mlrs           LARS 1, 1969: the 36-round launcher on the BONNETED Magirus-Deutz Jupiter
                              6x6 with its armoured cab (see "Which truck" below).
       deu_e80_mlrs           LARS 2, 1980: the same launcher with its covers on the forward-control MAN
                              7 t gl 6x6 (Category 1).  The Fieldguard fire-control radar is a separate row
                              and is NOT drawn here.

   Which truck for LARS 1.  The brief names the MAN 7 t for both rows; the eras.js def of deu_e60_mlrs says
     "on a Magirus-Deutz Jupiter truck ... the MAN chassis ... belong[s] to LARS 2 in 1980", and en.wikipedia
     "Light Artillery Rocket System" says "a lightly armoured Magirus or MAN 6x6 truck".  Settled from the
     photograph: [B1] (Bundesarchiv, the 1969 NATO-jubilee parade, LARS 1 in service) shows a BONNETED truck
     with a long engine hood, separate front wings and a boxy armoured cab - the Jupiter, not the flat-fronted
     forward-control MAN of [M1]-[M3].  The MAN 7 t gl 6x6 cargo truck reached the Bundeswehr only from 1979
     (en.wikipedia "MAN KAT1").  So LARS 1 is drawn on the Jupiter; both rows share the launcher, the turntable,
     the rear chassis, the wheels and the stations behind the cab (one builder, cab chosen per row).

   References (Wikimedia Commons, cached in scratchpad/q_jpzlars_ref; thumbnails through thumb.php):
     J1  "Jaguar (Jagdpanzer).JPG" - Jaguar 1 from the RIGHT, near side-on (nose right), launcher removed:
         the station photo for the hull.  Ratios read at the road-wheel row: wheel diameter / pitch
         167 / 230 px = 0.73; rear end of the track behind wheel 5 = 1.22 pitches, front mudguard box ahead of
         wheel 1 = 1.44 pitches, so 4 + 1.22 + 1.44 = 6.66 pitches over all; the published 6.61 m gives a
         pitch of 0.99 m and wheels of 0.72 m.  The rear plate stands 0.98 pitches behind wheel 5 (X -3.00): the
         raised sprocket and the track round it reach 0.2 m past it, as J1 and R1 both show.  Heights at the middle station (224 px a pitch): casemate roof
         2.04 pitches (2.02 m; Kanonenjagdpanzer published 2.09 m), side-box top 1.36 m, its lower edge 0.72 m,
         cupola 2.30 m, the launcher column 2.6 m.  The casemate roof ends at X -0.45 m, the lower engine
         deck behind it; the glacis top edge at X 2.45 m.
     J2  "Jaguar 1 Panzer Y-200 003 pic2.JPG" - head-on: over the mudguard boxes 1047 px = 3.12 m published
         (335 px/m): the roof's front edge 1.67 m wide, the glacis add-on 2.48 m, the bow MG 0.66 m right of
         the centre, the headlamps on the mudguard boxes' inner corners at +-0.87 m, three periscope heads each
         side at the roof front, the gunner's sight box just right of the centre, the HOT launcher 0.36 m LEFT
         of it.  J3 "... pic5.JPG" (front left): the HOT launcher on its column, the tube cocked up, the sight
         box ahead of it, the studded add-on plates, the side box with its panel joints.
     J4  "L04 676 Jagdpanzer Jaguar 1.jpg" - front left: the add-on armour, the rear deck stowage, the front
         idler and the raised REAR sprocket, the mudguard boxes, the mirrors on arms.
     R1  "Duitse pantserwagens, Bestanddeelnr 921-5844.jpg" (Nationaal Archief) - Raketenjagdpanzer 2 from
         the LEFT, near side-on: five dual road wheels, the toothed sprocket at the REAR and raised, the idler
         at the front, THREE return rollers (between wheels 1-2, 3-4 and 4-5 counted from the rear: X -1.27,
         0.54, 1.62), the bump stops over the wheels; no side boxes, the track top open under the hull's
         sloped upper sides.
     R2  "Panzermuseum Munster 2010 0915.JPG" (the en.wikipedia infobox picture) - RakJPz 2, front right:
         the single broad glacis, the bow MG ball with the headlamp beside it, the two launch posts with their
         forked heads (one with a missile), the MG3 on the roof, the round mirrors.  The museum placard
         (Munster, photographed in the same set): length 6.24 m, width 2.98 m, height 2.75 m.
     R3  "RakJgPz (SS11) PzJgKp 360 Kuelsheim, 1978.jpg" - in service 1978, posts lowered to stubs near the
         roof's middle, plain single colour.
     B1  "Bundesarchiv B 145 Bild-F029231-0003, Nuerburgring, Bundeswehrparade zum NATO-Jubilaeum.jpg" - LARS 1
         on the Jupiter (above), front left 3/4: the pack covered over its rear part, tubes forward, the
         spare upright behind the cab on the port side, the box between cab and turntable.
     M1  "LARS 2 Seitenansicht.jpg" - a detailed scale model of LARS 2 dead side-on from the right: the station
         drawing for the MAN.  Scaled by the 14.00 R 20 tyre (1.24 m, 186 px/m): bumper 1.59 m ahead of the
         front axle, the bogie centre 4.62 m behind it, bogie 1.30 m, towing pintle 6.38 m behind the front
         axle; cab roof 3.0 m, pack 2.28-2.90 m, turntable 1.67-2.04 m, deck 1.59 m; pack 3.75 m long, tail
         0.96 m behind the trunnion; the spare upright on the engine compartment, starboard; the equipment
         box behind it; the fuel tank under it.  A model is weaker than a photograph, so every station it gives
         is checked against M2/M3 (real vehicles): the cab, the box and the pack sit the same.
     M2  "Meppen - WTD91 (TdBW) 060 ies.jpg" - a real LARS 2, front right, pack raised: the tube mouths counted
         per block, rows from the top 5, 6, 6, 1 = 18 (the single tube outboard), the mouth plate with its
         chamfered corners, the two blocks side by side with a gap.  M3 "Raketenwerfer der Bundeswehr
         (49919107693).jpg" - firing: the pack hinged at its REAR, mouths forward and up.  M4 "LARS 2.jpg",
         "LARS2 Vorderansicht.jpg", "LARS2 Werferstellung.jpg" (the scale model): the cab front, the roof MG
         ring, the two blocks from behind.
   Published: en.wikipedia "Raketenjagdpanzer 2": 6.61 x 2.98 x 2.10 m, 23 t, "two launch rails for the Nord
     SS.11", "two MG3 ... in the bow and as an anti-aircraft weapon on top".  en.wikipedia "Jaguar 1": 6.61 x
     3.12 x 2.55 m, 25.7 t, one HOT launcher, two MG3.  en.wikipedia "Kanonenjagdpanzer" (the same hull):
     hull 6.24 m, 2.98 m wide, 2.09 m high.  en.wikipedia "Light Artillery Rocket System" (LARS 1): 7.8 x 2.5 x
     2.9 m, 36 barrels of 110 mm, elevation 0 to 55, traverse 105, one roof MG3.  en.wikipedia "MAN KAT1": the 7 t
     6x6, "the engine is mounted inside the forward-control cab" (behind the driver).
   Where drawing and figure disagree (evidence recorded, nothing reshaped to a figure):
     Hull length.  J1 gives 6.66 pitches over the mudguard boxes; scaled to the Jaguar's 6.61 m (drawn 6.60).  The
       RakJPz 2 without the boxes measures 6.45 m, nose plate to the track round the sprocket (6.53 to the bow MG); its published figures
       disagree with each other (6.61 en.wiki, the same as the Jaguar; 6.24 the museum placard and the
       Kanonenjagdpanzer HULL).  R1 measures the nose 1.35 pitches ahead of the front wheel, the same as J1's
       plate behind the Jaguar's boxes, so the 6.24 is taken to be the hull without the track round the
       sprocket and the 6.61 to be the Jaguar's; nothing is stretched to either.
     Heights.  Roof 2.02 m drawn from J1 against the published 2.09/2.10 m (the cupola reaches 2.30 m).  RakJPz
       2: the placard's 2.75 m is taken as the top of the raised launch rails and drawn so.  Jaguar 1: 2.55 m is
       the gunner's sight box (J2: it stands higher than the launcher in travel).
     LARS.  B1 is 3/4 and gives no station, so the Jupiter's bonnet and cab stand on proportions; LARS 1 comes
       out 7.68 m against the published 7.8 m (not stretched).  LARS 2 8.03 m from M1, pintle to tow jaw (no published figure was
       reachable; armour_specs' 8.7 m is a game figure, not a source).

   Recognition list (what makes each read at game zoom; source; where in the code):
     Jagdpanzer  1. a long low casemate: one broad glacis, sides sloping in to a flat roof - J1, R1, R2: addHull
                 2. five dual road wheels, front idler, raised rear sprocket, three return rollers - J1, J4, R1
                 3. RakJPz 2: two tall launch posts with the SS.11 on its rail; MG3 on the roof - R2, R3
                 4. Jaguar 1: the studded spaced armour on glacis and casemate sides, the side boxes over the
                    tracks, the front mudguard boxes - J1-J4: addJaguarArmour
                 5. Jaguar 1: the HOT launcher on its column, the sight box ahead, left of it - J2, J3
                 6. the bow MG ball right of centre, the headlamps, the cupola - J2, R2
     LARS        1. a 6x6 with a big rotating pack over the rear bogie, mouths forward - B1, M1-M3: pack()
                 2. two 18-tube blocks side by side, 5/6/6/1 rows, the mouth plates - M2
                 3. the covers over the rear of the tubes - B1, M1, M4
                 4. LARS 1: the long bonnet and armoured cab of the Jupiter - B1: jupiterCab()
                 5. LARS 2: the flat-fronted MAN cab with the engine compartment behind it, the spare upright
                    on it, the MG ring on the roof - M1, M4: manCab()
   Paint (no crosses, numbers, plates or markings; no camouflage pattern):  the e60 rows in the Bundeswehr's
     single colour of the period, RAL 6014 Gelboliv #4c4b36, as the other German heroes take it (R3, B1 are
     single-colour black-and-white prints).  The e80 rows in plain RAL 6031 bronze green #3e4a37: Jaguar 1 and
     LARS 2 served mostly in the 1984 three-colour scheme (J1, J4, M1, M2), whose base colour this is; the
     pattern is not drawn.
   NOT CONFIRMED (proportion or judgement): the wheel size (0.72 m) rests on the J1 ratio and the published
     length, no drawing found; track width 0.45 m; the hull widths (roof 1.80 m from J2, lower hull 2.0 m); the
     RakJPz 2 nose shape under the glacis; the engine-deck drop behind the casemate; the cupola's station (J1)
     and side (taken right); the SS.11 posts' station (R2/R3 put them near the roof's middle, X 0.30 drawn) and
     spacing; the HOT launcher's exact column height; the side-box panel count; the rear plate fittings.
     LARS: the Jupiter's wheelbase and bonnet length (taken on the MAN's axle stations); the trunnion (M3 shows
     the hinge at the pack's rear, its height from M1); the drawn launch elevation 35 degrees (inside the
     published 0-55; M3 is foreshortened and shows at least 25); the blocks' spacing; the tyres' tread.
   NOT drawn: crosses, numbers, plates; the smoke dischargers (eight published, no photograph places them
     clearly); camouflage nets; the Fieldguard radar; the LARS stabiliser or rear jacks (none photographed).
   Materials: PAINT (canvas texture, per row), DARK, GLASS (trucks), WHEEL (vertex colours), team colour
     (C.team): a strip on the Jagdpanzer's engine deck, one on top of each LARS block.
   Nodes: "turret" (Jagdpanzer: the launcher - RakJPz 2 both posts together, Jaguar 1 the HOT column; origin
     on the roof, launch direction +X.  LARS: the turntable, origin on its ring at the deck) holding, on LARS,
     "podelev" (origin on the trunnion at the pack's rear; userData.el 0.61 rad, userData.cells the 36 tubes
     as [mouth x, y, z, tail x]).  "roadwheel": five on the Jagdpanzer (both sides each), three on each truck
     (one per axle, both wheels).
   Drawn (L x W x H): RakJPz 2 6.53 x 3.01 x 2.79 m (rails raised, missile wings on top; roof 2.02 m), 13728 tris,
     11 draw calls; Jaguar 1 6.60 x 3.13 x 2.56 m, 15288 tris, 11 draw calls (hull 4, wheels 5, launcher 2);
     LARS 1 7.68 x 2.96 x 2.98 m (mirrors; truck body 2.50 m), 12652 tris, 12 draw calls; LARS 2 8.03 x 2.96 x 3.47 m
     (to the MG3 on the cab ring; cab roof 3.00 m, pack 2.90 m), 12876 tris, 12 draw calls (hull 4, wheels 3,
     mount 2, pack 3; the hull's 4 are paint, dark, glass and the spare's wheel bin; empty bins are not flushed).
   Engine (js/damage3d.js ENGINE_AT, not edited): tankdestroyer's role default is "rear" - right for this hull
     (the MB 837 at the back, the sprocket at the rear: R1); mlrs defaults to "front" - right for both trucks
     (the Jupiter's bonnet; the KAT1's engine in the back of its forward cab).  No row needs listing.
   Model space: +X nose, +Y left (port), +Z up, metres, tracks / tyres on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroJagdpanzer, HeroLars;

(function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var e = cross(sub(b, a), sub(c, a));
    if (dot(e, e) < 1e-14) return;                        /* a slit: no zero-area triangles */
    var f = unit(e), v = [a, b, c], n = [na || f, nb || f, nc || f];
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
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; }
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    if (z0 > z1) { t = z0; z0 = z1; z1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box about centre c on axes u, v, w (unit), half sizes hu, hv, hw */
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a plate along a side-view line (x0,z0)-(x1,z1), across y0..y1, th thick */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a square bar between two points */
  function bar(bin, A, B, w) {
    var d = sub(B, A), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
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
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  /* a convex side profile [x, z] from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a convex cross-section [y, z] from x0 to x1 */
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

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, PT) {
    var key = PT.base + PT.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(PT.seed), i, k, x, y, w;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = PT.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < PT.blots.length; k++) {
        q.fillStyle = PT.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams and plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function materials(THREE, C, PT) {
    var T = {}, tx = paintTex(THREE, PT);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(PT.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2730, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) }; }
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
      var m = new THREE.Mesh(geo, b.mat);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  function rgb(hex, k) {
    return [parseInt(hex.substr(1, 2), 16) / 255 * k, parseInt(hex.substr(3, 2), 16) / 255 * k, parseInt(hex.substr(5, 2), 16) / 255 * k];
  }
  var GELB = { base: "#4c4b36", blots: ["#55543c", "#44432f"], seed: 1967 };      /* RAL 6014 Gelboliv */
  var BRONZE = { base: "#3e4a37", blots: ["#46523e", "#363f30"], seed: 1980 };    /* RAL 6031 bronze green */
  /* an MG3 along +X from the origin (receiver, barrel with its jacket, butt, the belt box) */
  function mg3(D, x, y, z) {
    box(D, x - 0.30, x + 0.18, y - 0.035, y + 0.035, z - 0.05, z + 0.05);
    cyl(D, [x + 0.18, y, z + 0.01], [x + 0.75, y, z + 0.01], 0.022, 0.02, 8);
    cyl(D, [x + 0.18, y, z + 0.01], [x + 0.52, y, z + 0.01], 0.032, 0.032, 8);
    box(D, x - 0.08, x + 0.06, y + 0.04, y + 0.12, z - 0.12, z + 0.0);
  }

  /* ===================================================================== HeroJagdpanzer
     Running gear (J1, R1): pitch 0.99 m, wheels 0.72 m, idler front, sprocket rear raised, three return
     rollers.  Track 0.45 m wide, its outer edge at the published 2.98 m.  */
  var JP = {
    XW: [1.98, 0.99, 0.0, -0.99, -1.98], ZW: 0.43, RW: 0.36, TY: 1.265, TW: 0.225,
    IDL: { x: 2.87, z: 0.60, r: 0.29 }, SPR: { x: -2.79, z: 0.78, r: 0.33 },
    RR: [1.62, 0.54, -1.27], RRZ: 0.98, RRR: 0.085
  };
  /* hull (J1, J2, R1, R2): belly, fender (the top of the track guard), its outer edge, the roof and its
     half width, the glacis top edge, the glacis foot, the nose, the rear plate, the engine deck */
  var JH = { BELLY: 0.46, FEN: 1.22, HWF: 1.49, ROOF: 2.02, RHW: 0.88, GX: 2.45, GFX: 3.10, GFZ: 1.30,
             NOSE: 3.26, REAR: -3.00, DECK: 1.88, CX: -0.45, LHW: 1.00 };
  /* the hull's upper side, from the fender edge up to the roof edge: y at height z */
  function sideY(z) { return JH.HWF - (z - JH.FEN) / (JH.ROOF - JH.FEN) * (JH.HWF - JH.RHW); }

  function addJpHull(B, jag) {
    var s, i, x;
    /* lower hull between the tracks: the belly, the lower nose plate sloping back to it (R1, J1), the rear
       plate's lower part */
    prismY(B.paint, [[JH.REAR, 0.80], [JH.REAR + 0.20, JH.BELLY], [2.70, JH.BELLY], [JH.NOSE, 1.00],
                     [JH.GFX + 0.02, JH.GFZ], [JH.REAR, JH.FEN + 0.02]], -JH.LHW, JH.LHW);
    /* upper hull: the casemate lofted through cross-sections - from the fender edge the sides lean in to the
       roof; the broad glacis at the front (R2), the roof running back to X -0.45 (J1), the engine deck lower
       behind it, the rear plate */
    function sec(x, zt, ht) { return [[x, -JH.HWF, JH.FEN], [x, JH.HWF, JH.FEN], [x, ht, zt], [x, -ht, zt]]; }
    var htD = sideY(JH.DECK);
    loftN(B.paint, [sec(JH.REAR, JH.DECK, htD), sec(JH.CX - 0.25, JH.DECK, htD), sec(JH.CX, JH.ROOF, JH.RHW),
                    sec(JH.GX, JH.ROOF, JH.RHW), sec(JH.GFX, JH.GFZ, sideY(JH.GFZ) - 0.02)]);
    /* the track guards' front: thin mudguards turned down over the idlers (R2), and at the rear */
    for (s = -1; s <= 1; s += 2) {
      var ya = s > 0 ? JH.LHW : -JH.HWF, yb = s > 0 ? JH.HWF : -JH.LHW;
      belt(B.paint, JH.GFX - 0.05, JH.FEN - 0.01, 3.24, 0.95, ya, yb, 0.02);
      belt(B.paint, JH.REAR + 0.02, JH.FEN - 0.01, JH.REAR - 0.08, 1.02, ya, yb, 0.02);
      /* the bump stops over the wheels (R1) */
      for (i = 0; i < JP.XW.length; i++) box(B.dark, JP.XW[i] - 0.18, JP.XW[i] - 0.06, s * 0.98, s * 1.06, 0.85, 0.93);
    }
    /* the engine deck: the louvred grille and the exhaust over the rear (J4), the step from the roof */
    for (i = 0; i < 9; i++) box(B.dark, -2.70 + i * 0.22, -2.62 + i * 0.22, -0.70, 0.70, JH.DECK, JH.DECK + 0.025);
    box(B.paint, -1.10, -0.75, -0.80, 0.80, JH.DECK, JH.DECK + 0.05);
    /* rear plate: the tail lamps, the towing eyes, the stowage rack across it */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, JH.REAR - 0.06, JH.REAR, s * 0.80 - 0.07, s * 0.80 + 0.07, 1.55, 1.68);
      box(B.dark, JH.REAR - 0.14, JH.REAR, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.70, 0.86);
    }
    box(B.paint, JH.REAR - 0.10, JH.REAR, -0.95, 0.95, 1.20, 1.26);
    box(B.paint, JH.REAR - 0.10, JH.REAR, -0.95, 0.95, 1.40, 1.46);
    /* roof: the commander's cupola on the right (J1, J2), its hatch and periscopes; the driver's and the
       crew's periscope heads at the roof front (J2, three each side); the hatch on the left */
    var CU = { x: 0.94, y: -0.48 };
    cylZ(B.paint, CU.x, CU.y, JH.ROOF, JH.ROOF + 0.20, 0.36, 18);
    cylZ(B.paint, CU.x, CU.y, JH.ROOF + 0.20, JH.ROOF + 0.26, 0.28, 16);
    for (i = 0; i < 8; i++) {
      var a = i / 8 * TAU;
      slab(B.dark, [CU.x + Math.cos(a) * 0.33, CU.y + Math.sin(a) * 0.33, JH.ROOF + 0.15], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.02, 0.06, 0.035);
    }
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) {
      var py = s * (0.30 + i * 0.18);
      box(B.dark, JH.GX - 0.20, JH.GX - 0.06, py - 0.06, py + 0.06, JH.ROOF, JH.ROOF + 0.09);
    }
    box(B.paint, 0.70, 1.40, 0.15, 0.80, JH.ROOF, JH.ROOF + 0.04);
    box(B.dark, 1.02, 1.08, 0.18, 0.77, JH.ROOF + 0.04, JH.ROOF + 0.055);
    box(B.paint, -0.40, 0.25, -0.20, 0.55, JH.ROOF, JH.ROOF + 0.04);
    /* the front corners: the mirrors on their arms (R2, J2, J4) */
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [JH.GX - 0.05, s * (JH.RHW - 0.05), JH.ROOF], [JH.GX + 0.05, s * (JH.RHW + 0.05), JH.ROOF + 0.32], 0.025);
      box(B.dark, JH.GX + 0.02, JH.GX + 0.06, s * (JH.RHW + 0.0), s * (JH.RHW + 0.16), JH.ROOF + 0.28, JH.ROOF + 0.46);
    }
    /* glacis: the bow MG3 ball right of centre (J2: 0.66 m), the headlamps (R2: on the glacis corners) */
    var ang = Math.atan2(JH.ROOF - JH.GFZ, JH.GFX - JH.GX), u = [Math.cos(ang), 0, -Math.sin(ang)], nrm = [Math.sin(ang), 0, Math.cos(ang)];
    function gp(t, y, h) {                                  /* a point on the glacis: t from the top edge */
      return [JH.GX + u[0] * t + nrm[0] * h, y, JH.ROOF + u[2] * t + nrm[2] * h];
    }
    var gl = Math.sqrt((JH.GFX - JH.GX) * (JH.GFX - JH.GX) + (JH.ROOF - JH.GFZ) * (JH.ROOF - JH.GFZ));
    var mgA = gp(gl * 0.72, -0.66, jag ? 0.20 : 0.0);
    cyl(B.dark, mgA, [mgA[0] + nrm[0] * 0.10, mgA[1], mgA[2] + nrm[2] * 0.10], 0.15, 0.13, 14);
    cyl(B.dark, [mgA[0] + nrm[0] * 0.08, mgA[1], mgA[2] + nrm[2] * 0.06], [mgA[0] + (jag ? 0.16 : 0.30), mgA[1], mgA[2] + 0.03], 0.03, 0.025, 8);
    if (!jag) {
      for (s = -1; s <= 1; s += 2) {
        var hp = gp(gl * 0.80, s * 0.92, 0.0);
        cyl(B.paint, hp, [hp[0] + 0.13, hp[1], hp[2]], 0.085, 0.09, 12);
        cyl(B.glass, [hp[0] + 0.13, hp[1], hp[2]], [hp[0] + 0.14, hp[1], hp[2]], 0.075, 0.075, 12);
        bar(B.dark, [hp[0] + 0.02, hp[1] - 0.12, hp[2] + 0.10], [hp[0] + 0.02, hp[1] + 0.12, hp[2] + 0.10], 0.02);
      }
      /* the towing eyes on the nose */
      for (s = -1; s <= 1; s += 2) box(B.dark, JH.NOSE - 0.06, JH.NOSE + 0.08, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.92, 1.04);
    }
    /* team colour: a strip on the engine deck */
    box(B.team, -2.95, -2.75, -0.60, 0.60, JH.DECK + 0.025, JH.DECK + 0.04);
  }

  /* the Jaguar's spaced armour (J1-J4): the studded add-on plates standing off the glacis and the casemate
     sides, the lower glacis block, the side boxes over the tracks with their panel joints, the mudguard
     boxes at the front with the headlamps on their inner corners */
  function addJaguarArmour(B) {
    var s, i, k, ang, u, nrm, c, gl, t;
    /* glacis: two stand-off plates on the slope (J2: the joint across at the foot of the upper one) */
    ang = Math.atan2(JH.ROOF - JH.GFZ, JH.GFX - JH.GX); u = [Math.cos(ang), 0, -Math.sin(ang)]; nrm = [Math.sin(ang), 0, Math.cos(ang)];
    gl = Math.sqrt((JH.GFX - JH.GX) * (JH.GFX - JH.GX) + (JH.ROOF - JH.GFZ) * (JH.ROOF - JH.GFZ));
    function gp(t, h) { return [JH.GX + u[0] * t + nrm[0] * h, 0, JH.ROOF + u[2] * t + nrm[2] * h]; }
    c = gp(gl * 0.5, 0.10);
    slab(B.paint, c, u, [0, 1, 0], nrm, gl * 0.5, 0.86, 0.05);
    for (k = 0; k < 2; k++) for (i = -2; i <= 2; i++) {
      t = gp(gl * (0.3 + k * 0.4), 0.155);
      cyl(B.dark, [t[0], i * 0.36, t[2]], [t[0] + nrm[0] * 0.02, i * 0.36, t[2] + nrm[2] * 0.02], 0.04, 0.03, 8);
    }
    /* the lower block in front of the nose (J2: 2.48 m wide band, then the nose plate) */
    prismY(B.paint, [[JH.GFX - 0.10, JH.GFZ + 0.06], [JH.GFX + 0.16, JH.GFZ + 0.02], [3.30, 1.00], [3.22, 0.86], [JH.GFX - 0.10, 0.86]], -1.0, 1.0);
    box(B.dark, 3.24, 3.27, -0.98, 0.98, 1.08, 1.10);
    for (s = -1; s <= 1; s += 2) {
      /* casemate side plates: two panels standing off the slope from X -0.45 to the glacis (J1), studded */
      var z0 = 1.40, z1 = JH.ROOF - 0.04, y0 = sideY(z0) + 0.07, y1 = sideY(z1) + 0.07;
      var sl = Math.atan2(z1 - z0, Math.abs(y1 - y0)), sv = [0, -s * Math.cos(sl), Math.sin(sl)], sn = [0, s * Math.sin(sl), Math.cos(sl)];
      var hlen = Math.sqrt((z1 - z0) * (z1 - z0) + (y1 - y0) * (y1 - y0)) / 2;
      [[JH.CX - 0.02, 1.00], [1.04, JH.GX - 0.02]].forEach(function (p) {
        slab(B.paint, [(p[0] + p[1]) / 2, s * (y0 + y1) / 2, (z0 + z1) / 2], [1, 0, 0], sv, sn, (p[1] - p[0]) / 2, hlen, 0.03);
        for (var a = 0; a < 3; a++) for (var b = 0; b < 3; b++) {
          var px = p[0] + (a + 0.5) / 3 * (p[1] - p[0]), f = (b + 0.5) / 3;
          var py = s * (y0 + (y1 - y0) * f + 0.035 * Math.sin(sl)), pz = z0 + (z1 - z0) * f + 0.035 * Math.cos(sl);
          cyl(B.dark, [px, py, pz], [px, py + s * sn[1] * 0.02, pz + sn[2] * 0.02], 0.035, 0.028, 8);
        }
      });
      /* the side box over the track (J1, J3): the outer plate with its lower edge curving up at both ends,
         the top cover, the panel joints and hinges */
      var yo = s * 1.545, yi = s * 1.515;
      prismY(B.paint, [[JH.REAR + 0.08, 1.00], [-2.55, 0.74], [2.40, 0.74], [2.92, 1.00], [2.92, 1.36], [JH.REAR + 0.08, 1.36]], Math.min(yo, yi), Math.max(yo, yi));
      box(B.paint, JH.REAR + 0.08, 2.92, s * (sideY(1.36) - 0.02), yi, 1.33, 1.36);
      for (i = 0; i < 5; i++) {
        var jx = -2.0 + i * 1.0;
        box(B.dark, jx - 0.015, jx + 0.015, yo, yo + s * 0.012, 0.80, 1.34);
        box(B.dark, jx + 0.30, jx + 0.40, yo, yo + s * 0.02, 1.12, 1.18);
      }
      box(B.dark, JH.REAR + 0.10, 2.90, yo, yo + s * 0.012, 1.26, 1.28);
      /* the mudguard box at the front (J2: from 0.97 m out to the edge; the headlamp on its inner corner) */
      prismY(B.paint, [[2.80, 0.82], [3.30, 0.82], [3.41, 1.02], [3.36, 1.30], [2.80, 1.36]], s > 0 ? 0.97 : -1.56, s > 0 ? 1.56 : -0.97);
      var hx = 3.18, hy = s * 0.88, hz = 1.42;
      cyl(B.paint, [hx, hy, hz], [hx + 0.13, hy, hz], 0.085, 0.09, 12);
      cyl(B.glass, [hx + 0.13, hy, hz], [hx + 0.14, hy, hz], 0.075, 0.075, 12);
      box(B.dark, hx - 0.04, hx + 0.04, hy - 0.03, hy + 0.03, 1.30, hz - 0.06);
      /* the blackout lamp on its guard at the glacis corner (J2) */
      box(B.dark, 2.62, 2.72, s * 1.02, s * 1.12, 1.62, 1.74);
      /* the towing eyes through the lower block */
      box(B.dark, 3.22, 3.36, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.84, 0.96);
    }
  }

  function addJpRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [], TO = 0.035;
    for (i = 0; i < JP.XW.length; i++) C.push([JP.XW[i], JP.ZW, JP.RW + TO]);
    for (i = 0; i < JP.RR.length; i++) C.push([JP.RR[i], JP.RRZ, JP.RRR + TO]);
    C.push([JP.IDL.x, JP.IDL.z, JP.IDL.r + TO], [JP.SPR.x, JP.SPR.z, JP.SPR.r + TO]);
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
    cnt = Math.round(tot / 0.17); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * JP.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - JP.TW, y + JP.TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the shoes with their end connectors (R1, J4) and the centre guide horns */
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - JP.TW - 0.015, y + JP.TW + 0.015, 0.07);
        belt(B.dark, px - dx * 0.03 - dz * 0.06, pz - dz * 0.03 + dx * 0.06, px + dx * 0.03 - dz * 0.06, pz + dz * 0.03 + dx * 0.06, y - 0.03, y + 0.03, 0.05);
      }
      /* the toothed drive sprocket at the REAR, raised (R1, J4) */
      cylY(B.dark, JP.SPR.x, y - 0.13, y + 0.13, JP.SPR.z, JP.SPR.r - 0.05, 18);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [JP.SPR.x + ca * (JP.SPR.r - 0.02), y, JP.SPR.z + sa * (JP.SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.045, 0.11, 0.03);
      }
      cylY(B.paint, JP.SPR.x, y + s * 0.13, y + s * 0.18, JP.SPR.z, 0.18, 14);
      cylY(B.dark, JP.SPR.x, y + s * 0.18, y + s * 0.22, JP.SPR.z, 0.07, 10);
      /* the idler at the front (R1, J4): a holed disc */
      [-0.11, 0.11].forEach(function (dy) { cylY(B.paint, JP.IDL.x, y + dy - 0.07, y + dy + 0.07, JP.IDL.z, JP.IDL.r, 18); });
      cylY(B.dark, JP.IDL.x, y + s * 0.18, y + s * 0.22, JP.IDL.z, 0.08, 10);
      /* three return rollers (R1) */
      for (i = 0; i < JP.RR.length; i++) {
        cylY(B.paint, JP.RR[i], y - 0.17, y + 0.17, JP.RRZ, JP.RRR, 12);
        cylY(B.dark, JP.RR[i], y + s * 0.17, y + s * 0.21, JP.RRZ, 0.04, 8);
      }
      /* the swing-arm bosses on the hull side ahead of each wheel */
      for (i = 0; i < JP.XW.length; i++) cylY(B.dark, JP.XW[i] + 0.20, s * JH.LHW, s * (JH.LHW + 0.06), JP.ZW + 0.12, 0.08, 8);
    }
  }
  /* road wheel (R1, J1): dual rubber-tyred discs, the dished outer face with its bolt ring and the hub */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.16, 0.17, 0.14];
  function addJpWheel(W, PT) {
    var s, y, i, a, dy, BODY = rgb(PT.base, 1.12), RIB = rgb(PT.base, 1.3);
    for (s = -1; s <= 1; s += 2) {
      y = s * JP.TY;
      for (dy = -1; dy <= 1; dy += 2) {
        var yc = y + dy * 0.11;
        W.col = TYRE;
        cylY(W, 0, yc - 0.075, yc + 0.075, 0, JP.RW, 18);
        W.col = BODY;
        cylY(W, 0, yc - 0.08, yc + 0.08, 0, JP.RW - 0.055, 18);
      }
      var yf = y + s * 0.15;
      W.col = BODY;
      cyl(W, [0, yf, 0], [0, yf + s * 0.025, 0], JP.RW - 0.055, 0.15, 20);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        box(W, Math.cos(a) * 0.12 - 0.015, Math.cos(a) * 0.12 + 0.015, yf + s * 0.018, yf + s * 0.03, Math.sin(a) * 0.12 - 0.015, Math.sin(a) * 0.12 + 0.015);
      }
      W.col = RIB;
      cylY(W, 0, yf + s * 0.02, yf + s * 0.045, 0, 0.085, 12);
      W.col = HOLE;
      cylY(W, 0, yf + s * 0.045, yf + s * 0.055, 0, 0.04, 8);
    }
  }

  /* RakJPz 2 launchers (R2, R3): two tubular posts rising from the roof, each with its forked head and a short
     launch rail carrying an SS.11 (two on the rails, published); "turret" origin on the roof between them */
  var SS = { x: 0.30, y: 0.40, top: 2.40 };
  function ss11(B, y) {
    var zt = SS.top - JH.ROOF, i, a;
    cylZ(B.paint, 0, y, 0, 0.08, 0.13, 12);                    /* the collar on the roof */
    cylZ(B.paint, 0, y, 0.08, zt - 0.10, 0.075, 12);           /* the post */
    cylZ(B.paint, 0, y, zt - 0.40, zt - 0.10, 0.095, 12);      /* its upper sleeve */
    box(B.paint, -0.10, 0.10, y - 0.10, y + 0.10, zt - 0.10, zt - 0.04);
    box(B.paint, -0.06, 0.06, y - 0.10, y - 0.07, zt - 0.04, zt + 0.08);
    box(B.paint, -0.06, 0.06, y + 0.07, y + 0.10, zt - 0.04, zt + 0.08);
    box(B.dark, -0.35, 0.40, y - 0.04, y + 0.04, zt + 0.06, zt + 0.10);   /* the rail */
    /* the SS.11: 1.19 m, 164 mm body, the cruciform wings at the tail (in X), the nose */
    var mz = zt + 0.19;
    cylX(B.dark, -0.55, 0.50, y, mz, 0.082, 12);
    cyl(B.dark, [0.50, y, mz], [0.64, y, mz], 0.082, 0.03, 12);
    for (i = 0; i < 4; i++) {
      a = (i + 0.5) / 4 * TAU;
      slab(B.dark, [-0.40, y + Math.cos(a) * 0.17, mz + Math.sin(a) * 0.17], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)], 0.13, 0.10, 0.006);
    }
  }
  /* Jaguar 1: the HOT launcher on its column (J2, J3), "turret" origin on the roof under the column; the tube
     laid level in travel, the guidance box at its side */
  var HT = { x: 0.40, y: 0.36 };
  function hotLauncher(B) {
    var zc = 2.38 - JH.ROOF;
    cylZ(B.paint, 0, 0, 0, 0.10, 0.16, 14);
    cylZ(B.paint, 0, 0, 0.10, zc - 0.05, 0.085, 12);
    box(B.paint, -0.14, 0.14, -0.12, 0.12, zc - 0.08, zc + 0.04);
    box(B.paint, -0.10, 0.10, -0.14, -0.10, zc - 0.02, zc + 0.12);
    box(B.paint, -0.10, 0.10, 0.10, 0.14, zc - 0.02, zc + 0.12);
    cylY(B.dark, 0, -0.15, 0.15, zc + 0.08, 0.045, 10);
    /* the launch tube (HOT container, 1.30 m) and its rear clamp */
    cylX(B.paint, -0.62, 0.68, 0, zc + 0.08, 0.085, 14);
    cylX(B.dark, 0.66, 0.70, 0, zc + 0.08, 0.07, 12);
    cylX(B.paint, -0.30, -0.18, 0, zc + 0.08, 0.10, 14);
    box(B.paint, -0.25, 0.10, -0.30, -0.12, zc - 0.02, zc + 0.16);
  }
  /* Jaguar 1: the gunner's sight box ahead of the launcher, just right of the centre (J2, J3), on its column */
  function hotSight(B) {
    var x = 1.62, y = -0.09;
    cylZ(B.paint, x, y, JH.ROOF, JH.ROOF + 0.10, 0.20, 14);
    box(B.paint, x - 0.14, x + 0.14, y - 0.14, y + 0.14, JH.ROOF + 0.10, 2.20);
    box(B.paint, x - 0.22, x + 0.22, y - 0.24, y + 0.24, 2.20, 2.55);
    box(B.glass, x + 0.22, x + 0.23, y - 0.17, y + 0.17, 2.30, 2.47);
    box(B.dark, x - 0.22, x + 0.24, y - 0.24, y + 0.24, 2.55, 2.56);
  }
  /* RakJPz 2: the AA MG3 on its pintle on the roof (R2) */
  function roofMg(B) {
    var x = -0.30, y = -0.55;
    cylZ(B.paint, x, y, JH.ROOF, JH.ROOF + 0.05, 0.12, 12);
    cylZ(B.dark, x, y, JH.ROOF + 0.05, JH.ROOF + 0.32, 0.03, 8);
    mg3(B.dark, x, y, JH.ROOF + 0.38);
  }

  function buildJp(THREE, C, key) {
    var jag = key === "deu_e80_tankdestroyer", PT = jag ? BRONZE : GELB;
    var T = materials(THREE, C, PT), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addJpHull(HB, jag);
    if (jag) { addJaguarArmour(HB); hotSight(HB); } else roofMg(HB);
    addJpRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < JP.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addJpWheel(WB, PT);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(JP.XW[i], 0, JP.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    tg = new THREE.Group();
    tg.name = "turret";
    if (jag) { hotLauncher(TB); tg.position.set(HT.x, HT.y, JH.ROOF); }
    else { ss11(TB, SS.y); ss11(TB, -SS.y); tg.position.set(SS.x, 0, JH.ROOF); }
    flush(THREE, tg, TB);
    g.add(tg);
    g.name = key;
    return g;
  }

  HeroJagdpanzer = { build: buildJp };

  /* ===================================================================== HeroLars
     Stations off M1 (the MAN, 186 px/m by the 1.24 m tyre), measured from the front axle and moved by +2.40
     so the truck centres on X 0.  The rear chassis, the axles and everything behind the cab are shared; the
     Jupiter's bonnet and cab stand on the same front axle (NOT CONFIRMED: B1 gives no station).  */
  var OX = 2.40;
  var LT = { AX: [OX, OX - 3.97, OX - 5.27], R: 0.62, W: 0.37, TY: 1.035, DECK: 1.59, FR: OX - 6.08, PIN: OX - 6.38 };
  var LA = { TX: OX - 4.50, PX: -0.75, PZ: 0.69, EL: 0.61 };      /* turntable; trunnion from its centre */

  /* a cross-country tyre on its disc wheel, axle along Y, at (0, yc, 0): the tyre with its lug bars across
     the crown, the dished disc and hub on the outer face (face = +1 or -1) */
  function addTyre(W, yc, face, PT, xf) {
    var R = LT.R, h = LT.W / 2, i, a, ca, sa, BODY = rgb(PT.base, 1.1), HUB = rgb(PT.base, 1.3);
    xf = xf || function (p) { return p; };
    function C(A, B, r0, r1, seg) { cyl(W, xf(A), xf(B), r0, r1, seg); }
    W.col = TYRE;
    C([0, yc - h, 0], [0, yc + h, 0], R - 0.035, R - 0.035, 22);
    C([0, yc - h - 0.01, 0], [0, yc - h + 0.06, 0], R - 0.09, R - 0.05, 22);
    C([0, yc + h - 0.06, 0], [0, yc + h + 0.01, 0], R - 0.05, R - 0.09, 22);
    for (i = 0; i < 26; i++) {
      a = i / 26 * TAU; ca = Math.cos(a); sa = Math.sin(a);
      var off = (i % 2) ? 0.06 : -0.06;
      var c = xf([ca * (R - 0.02), yc + off, sa * (R - 0.02)]), u = xf([ca, 0, sa]), v = xf([0, 1, 0]), o = xf([0, 0, 0]);
      u = sub(u, o); v = sub(v, o);
      slab(W, c, u, v, cross(u, v), 0.025, h * 0.62, 0.03);
    }
    W.col = BODY;
    C([0, yc + face * (h - 0.04), 0], [0, yc + face * (h + 0.005), 0], R * 0.56, R * 0.50, 18);
    W.col = HUB;
    C([0, yc + face * (h + 0.005), 0], [0, yc + face * (h + 0.07), 0], 0.15, 0.12, 12);
    W.col = HOLE;
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      C([Math.cos(a) * 0.21, yc + face * (h + 0.0), Math.sin(a) * 0.21], [Math.cos(a) * 0.21, yc + face * (h + 0.025), Math.sin(a) * 0.21], 0.022, 0.022, 6);
    }
  }

  /* the chassis behind the cab (M1, M2, B1): the frame rails, the deck under the turntable with its valance
     cut over the bogie, the rear mudguards, the rear cross member with the lamps and the pintle, the fuel tank
     and battery boxes under it; the equipment box and the turntable's base */
  function addChassis(B, man) {
    var s, i;
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, LT.FR, LT.AX[0] + 0.30, s * 0.42, s * 0.52, 0.80, 1.08);           /* frame rails */
      /* the deck sides: a deep box from behind the equipment box to the rear (M1) with the arches cut */
      prismY(B.paint, [[LT.FR, 1.32], [LT.FR, LT.DECK], [OX - 1.70, LT.DECK], [OX - 1.70, 1.32]], s * 1.15, s * 1.22);
      /* the rear mudguards over the bogie, rounded both ends (M1, M2) */
      var xa = LT.AX[1] + 0.85, xb = LT.AX[2] - 0.85;
      belt(B.paint, xa + 0.20, 1.02, xa, 1.30, s * 0.82, s * 1.24, 0.03);
      belt(B.paint, xa, 1.30, xb, 1.30, s * 0.82, s * 1.24, 0.03);
      belt(B.paint, xb, 1.30, xb - 0.20, 1.02, s * 0.82, s * 1.24, 0.03);
      /* the rear lamps and reflectors on the cross member (M4: Werferstellung) */
      box(B.dark, LT.FR - 0.04, LT.FR, s * 1.02, s * 1.14, 1.20, 1.36);
    }
    /* the deck under the turntable */
    box(B.paint, LT.FR, OX - 1.70, -1.22, 1.22, 1.50, LT.DECK);
    box(B.dark, LT.FR - 0.02, LT.FR, -1.20, 1.20, 1.12, 1.48);
    box(B.paint, LT.FR - 0.04, LT.FR, -1.22, 1.22, 1.00, 1.14);
    /* the towing pintle and its bracket at the rear (M1) */
    box(B.dark, LT.FR - 0.12, LT.FR, -0.12, 0.12, 0.86, 1.04);
    cylZ(B.dark, LT.PIN + 0.08, 0, 0.82, 1.02, 0.07, 10);
    box(B.dark, LT.PIN, LT.FR - 0.10, -0.05, 0.05, 0.88, 0.96);
    /* the fuel tank under the box, starboard (M1), and the battery boxes, port */
    cylX(B.paint, OX - 2.00, OX - 0.80, -0.92, 0.80, 0.24, 14);
    for (i = 0; i < 2; i++) box(B.paint, OX - 2.10 + i * 0.55, OX - 1.62 + i * 0.55, 0.70, 1.15, 0.62, 1.10);
    /* the axles' differentials */
    for (i = 0; i < 3; i++) {
      cylY(B.dark, LT.AX[i], -0.95, 0.95, LT.R, 0.08, 10);
      cylY(B.dark, LT.AX[i], -0.18, 0.18, LT.R, 0.20, 12);
    }
    /* the equipment box between the cab and the turntable (M1, B1, M4): its doors and hinges */
    var bx0 = OX - 2.31, bx1 = OX - 1.29;
    box(B.paint, bx0, bx1, -1.05, 1.05, LT.DECK - 0.40, man ? 2.80 : 2.45);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, bx0 + 0.08, bx1 - 0.08, s * 1.05, s * 1.06, LT.DECK - 0.30, (man ? 2.80 : 2.45) - 0.10);
      box(B.paint, bx0 + 0.10, bx1 - 0.10, s * 1.06, s * 1.075, LT.DECK - 0.28, (man ? 2.80 : 2.45) - 0.12);
      box(B.dark, (bx0 + bx1) / 2 - 0.10, (bx0 + bx1) / 2 + 0.10, s * 1.075, s * 1.09, 2.0, 2.06);
    }
    /* the step and handholds up to the deck behind the box, port */
    box(B.dark, OX - 2.60, OX - 2.35, 1.10, 1.25, 1.05, 1.08);
    box(B.dark, OX - 2.60, OX - 2.35, 1.10, 1.25, 1.30, 1.33);
  }

  /* LARS 2: the MAN 7 t gl cab (M1, M4): flat front, two-pane screen, the doors over the front wheel, the long
     cab back holding the engine compartment, the spare wheel upright on its starboard side, the MG ring with
     the MG3 over the co-driver */
  function manCab(B, WB, PT) {
    var s, x0 = OX - 0.05, x1 = OX + 1.53, zr = 3.00;
    /* the cab shell: a loft with the chamfered upper corners, slight rake to the screen */
    function sec(x, top, hw, zb) { return [[x, -hw, zb], [x, hw, zb], [x, hw, top - 0.12], [x, hw - 0.10, top], [x, -hw + 0.10, top], [x, -hw, top - 0.12]]; }
    loftN(B.paint, [sec(x0, zr, 1.24, 1.38), sec(x1 - 0.12, zr, 1.24, 1.38), sec(x1, zr - 0.12, 1.24, 1.38)]);
    /* the lower front face ahead of the wheels, the grille panel, the bumper and the lamps (M4) */
    box(B.paint, x1 - 0.40, x1, -1.24, 1.24, 0.98, 1.40);
    box(B.paint, x1 - 0.06, x1 + 0.06, -1.25, 1.25, 0.80, 1.02);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, x1 - 0.02, x1 + 0.04, s * 0.95, 1.12, 0.10, 12);
      cylX(B.glass, x1 + 0.04, x1 + 0.05, s * 0.95, 1.12, 0.085, 12);
      box(B.dark, x1, x1 + 0.10, s * 0.30 - 0.03, s * 0.30 + 0.03, 0.80, 1.02);
    }
    box(B.dark, x1 + 0.06, x1 + 0.10, -0.08, 0.08, 0.84, 0.98);
    /* the windscreen: two panes, the wipers; the door windows; the doors' outlines */
    var zs0 = 2.08, zs1 = 2.78;
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, x1, x1 + 0.015, s * 0.06, s * 1.10, zs0, zs1);
      box(B.dark, x1, x1 + 0.02, s * 1.10, s * 1.16, zs0 - 0.04, zs1 + 0.04);
      bar(B.dark, [x1 + 0.025, s * 0.30, zs0 + 0.02], [x1 + 0.025, s * 0.65, zs0 + 0.40], 0.02);
      box(B.glass, x1 - 0.95, x1 - 0.30, s * 1.24, s * 1.25, 2.05, 2.70);
      box(B.dark, x1 - 1.00, x1 - 0.98, s * 1.24, s * 1.255, 1.42, 2.75);
      box(B.dark, x1 - 0.25, x1 - 0.23, s * 1.24, s * 1.255, 1.42, 2.75);
      /* the mirrors on their arms (M4) */
      bar(B.dark, [x1 - 0.10, s * 1.24, 2.40], [x1 + 0.05, s * 1.42, 2.45], 0.03);
      box(B.dark, x1, x1 + 0.08, s * 1.38, s * 1.48, 2.15, 2.55);
      /* the step under the door, behind the front wheel */
      box(B.dark, x0 - 0.05, x0 + 0.40, s * 1.05, s * 1.22, 0.85, 0.89);
      /* the front mudguard: the arch under the cab over the front wheel */
      belt(B.paint, LT.AX[0] + 0.70, 1.20, LT.AX[0] + 0.50, 1.38, s * 0.82, s * 1.24, 0.03);
      belt(B.paint, LT.AX[0] - 0.55, 1.38, LT.AX[0] - 0.75, 1.20, s * 0.82, s * 1.24, 0.03);
    }
    /* the engine compartment at the cab's back, a little narrower and lower (en.wiki KAT1; M1) */
    box(B.paint, OX - 1.25, x0, -0.85, 1.12, 1.10, 2.72);
    for (var i = 0; i < 6; i++) box(B.dark, OX - 1.15 + i * 0.16, OX - 1.07 + i * 0.16, 1.12, 1.13, 1.40, 2.10);
    /* the spare wheel upright on its starboard face, in its carrier (M1) */
    addTyre(WB, 0, -1, PT, function (p) { return [p[0] + OX - 0.62, p[1] - 1.04, p[2] + 2.05]; });
    box(B.dark, OX - 0.70, OX - 0.54, -0.87, -0.85, 1.40, 2.70);
    /* the roof: the MG ring over the co-driver, starboard, with the MG3 (M1, M4; "one roof mounted MG3"), the roof rack */
    var mx = OX + 0.95, my = -0.55;
    cylZ(B.paint, mx, my, zr, zr + 0.10, 0.40, 18);
    cylZ(B.dark, mx, my, zr + 0.10, zr + 0.14, 0.42, 18);
    box(B.dark, mx - 0.05, mx + 0.05, my - 0.03, my + 0.03, zr + 0.14, zr + 0.36);
    mg3(B.dark, mx - 0.05, my, zr + 0.42);
    box(B.dark, OX + 0.10, OX + 0.55, 0.20, 1.00, zr, zr + 0.06);
  }

  /* LARS 1: the Magirus-Deutz Jupiter (B1): the long bonnet with its grille, separate front wings, the boxy
     armoured cab behind it with sloped upper plates and small screens, the spare upright on its port side */
  function jupiterCab(B, WB, PT) {
    var s, xb = OX + 1.30, xg = OX + 1.18, xc = OX - 0.35, xr = OX - 1.95;
    /* bonnet: a loft from the grille back to the cab, rounded shoulders */
    function bs(x, w, h) { return [[x, -w, 1.10], [x, w, 1.10], [x, w, h - 0.10], [x, w - 0.10, h], [x, -w + 0.10, h], [x, -w, h - 0.10]]; }
    loftN(B.paint, [bs(xg, 0.58, 1.80), bs(xc + 0.02, 0.66, 1.92)]);
    /* the grille of vertical bars on the front (B1) */
    box(B.dark, xg, xg + 0.02, -0.50, 0.50, 1.18, 1.72);
    for (var i = 0; i < 9; i++) box(B.paint, xg + 0.01, xg + 0.04, -0.46 + i * 0.115, -0.43 + i * 0.115, 1.18, 1.72);
    /* front wings over the wheels, flat-topped, the headlamps in them, the bumper */
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[xg + 0.06, 1.05], [xg, 1.30], [xc, 1.40], [xc, 1.10], [LT.AX[0] - 0.60, 0.95]], s * 0.70, s * 1.24);
      cylX(B.dark, xg - 0.10, xg + 0.06, s * 0.95, 1.22, 0.11, 12);
      cylX(B.glass, xg + 0.06, xg + 0.07, s * 0.95, 1.22, 0.095, 12);
      box(B.dark, xb - 0.20, xb, s * 0.40 - 0.04, s * 0.40 + 0.04, 0.80, 1.00);
    }
    box(B.paint, xb - 0.10, xb, -1.20, 1.20, 0.72, 0.96);
    /* the armoured cab: vertical lower sides, the upper plates sloping in to the roof; the front plate leaning
       back over the bonnet with two small screens (B1) */
    loftN(B.paint, [[[xr, -1.22, 1.15], [xr, 1.22, 1.15], [xr, 1.22, 2.20], [xr, 0.95, 2.72], [xr, -0.95, 2.72], [xr, -1.22, 2.20]],
                    [[xc + 0.10, -1.22, 1.15], [xc + 0.10, 1.22, 1.15], [xc + 0.10, 1.22, 2.20], [xc - 0.25, 0.95, 2.72], [xc - 0.25, -0.95, 2.72], [xc + 0.10, -1.22, 2.20]]]);
    for (s = -1; s <= 1; s += 2) {
      slab(B.glass, [xc - 0.07, s * 0.50, 2.45], unit([0.27, 0, 0.52]), [0, 1, 0], unit([0.52, 0, -0.27]), 0.16, 0.34, 0.012);
      box(B.glass, xc - 0.95, xc - 0.40, s * 1.22, s * 1.235, 1.95, 2.15);
      box(B.dark, xc - 1.00, xc - 0.98, s * 1.22, s * 1.235, 1.20, 2.18);
      box(B.dark, xc - 0.08, xc - 0.06, s * 1.22, s * 1.235, 1.20, 2.18);
      box(B.dark, xc - 0.20, xc + 0.30, s * 1.05, s * 1.22, 0.85, 0.89);
      bar(B.dark, [xc - 0.05, s * 1.22, 2.30], [xc + 0.15, s * 1.42, 2.40], 0.03);
      box(B.dark, xc + 0.10, xc + 0.18, s * 1.38, s * 1.48, 2.10, 2.45);
    }
    /* the roof hatch (B1: a man stands in it) */
    cylZ(B.paint, xc - 0.70, 0.45, 2.72, 2.80, 0.32, 16);
    /* the spare wheel upright behind the cab, port (B1) */
    addTyre(WB, 0, 1, PT, function (p) { return [p[0] + xr - 0.30, p[1] + 1.05, p[2] + 2.02]; });
    box(B.dark, xr - 0.40, xr - 0.20, 0.82, 0.86, 1.45, 2.60);
    box(B.paint, xr - 0.10, xr, -1.05, 1.05, 1.15, 2.45);
  }

  /* the turntable ("turret", origin on its ring on the deck): the ring, the drum under the cradle (M1: 1.67 to
     2.04 m), the trunnion brackets at the rear, the laying gear box at the side */
  function addMount(B) {
    var s;
    cylZ(B.dark, 0, 0, 0, 0.08, 0.86, 26);
    cylZ(B.paint, 0, 0, 0.08, 0.45, 0.80, 26);
    cylZ(B.dark, 0, 0, 0.44, 0.46, 0.82, 26);
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[LA.PX - 0.25, 0.45], [LA.PX + 0.45, 0.45], [LA.PX + 0.10, LA.PZ + 0.08], [LA.PX - 0.15, LA.PZ + 0.08]], s * 0.10, s * 0.20);
      cylY(B.dark, LA.PX, s * 0.06, s * 0.24, LA.PZ, 0.08, 10);
    }
    box(B.paint, 0.20, 0.60, -0.92, -0.70, 0.12, 0.50);
    cylY(B.dark, 0.40, -0.98, -0.92, 0.36, 0.12, 12);
    /* the laying ram from the drum's front up toward the pack */
    cyl(B.dark, [0.55, 0, 0.45], [0.75, 0, LA.PZ - 0.02], 0.07, 0.06, 10);
  }

  /* the pack ("podelev", origin on the trunnion): two blocks of 18 x 110 mm tubes side by side (M2: rows from
     the top 5, 6, 6, 1, the single tube outboard), the covers over their rear (B1, M1), the mouth plates with
     their chamfered corners, the tails' lids, the cradle under the blocks; cells pushed as they are drawn */
  var PK = { XT: -0.96, XC: 1.70, XM: 2.83, P: 0.14, YB: 0.56, Z0: 0.0, RT: 0.058 };
  function addPack(B, cells) {
    var s, i, j, y, z, yc, rows = [[1, 5], [0, 6], [0, 6], [4, 1]], zr = [0.54, 0.40, 0.26, 0.12];
    for (s = -1; s <= 1; s += 2) {
      yc = s * PK.YB;
      for (j = 0; j < 4; j++) for (i = 0; i < rows[j][1]; i++) {
        /* column 0 is inboard; the top row leaves out the outermost column, the bottom single sits under
           column 4 (one in from the outer edge) */
        var col = rows[j][0] + i;
        y = yc + s * (col - 2.5) * PK.P; z = zr[j];
        cylX(B.dark, PK.XC - 0.02, PK.XM - 0.03, y, z, PK.RT, 10);
        cylX(B.paint, PK.XM - 0.06, PK.XM, y, z, PK.RT + 0.010, 10);
        cylX(B.dark, PK.XM, PK.XM + 0.004, y, z, PK.RT - 0.008, 8);
        cells.push([PK.XM + 0.05, y, z, PK.XT]);
      }
      /* the mouth plate: an octagon round the tubes (M2) and the clamp band behind it */
      var hw = 3 * PK.P + 0.05, zb = zr[3] - 0.10, zt = zr[0] + 0.10, ch = 0.12;
      var oct = [[-hw + ch, zb], [hw - ch, zb], [hw, zb + ch], [hw, zt - ch], [hw - ch, zt], [-hw + ch, zt], [-hw, zt - ch], [-hw, zb + ch]];
      prismX(B.paint, oct.map(function (p) { return [yc + p[0], p[1]]; }), PK.XM - 0.12, PK.XM - 0.06);
      prismX(B.paint, oct.map(function (p) { return [yc + p[0] * 1.01, zb + (p[1] - zb) * 1.0]; }), 2.20, 2.27);
      /* the cover over the rear of the tubes: the same octagon, a little larger, from the tail to XC (B1, M1) */
      var cov = oct.map(function (p) { return [yc + p[0] * 1.06, (p[1] - 0.33) * 1.08 + 0.33]; });
      prismX(B.paint, cov, PK.XT, PK.XC);
      prismX(B.dark, cov.map(function (p) { return [yc + (p[0] - yc) * 0.96, (p[1] - 0.33) * 0.96 + 0.33]; }), PK.XT - 0.015, PK.XT);
      for (i = 0; i < 3; i++) {
        var bx = PK.XT + 0.55 + i * 0.85;
        prismX(B.dark, cov.map(function (p) { return [yc + (p[0] - yc) * 1.015, (p[1] - 0.33) * 1.03 + 0.33]; }), bx, bx + 0.035);
      }
      /* the team strip on top of the block's cover */
      box(B.team, 0.20, 1.20, yc - 0.18, yc + 0.18, zt * 1.08 - 0.33 * 0.08 + 0.012, zt * 1.08 - 0.33 * 0.08 + 0.03);
    }
    /* the cradle: the beam joining the blocks, the trunnion lugs, the arm the laying ram works on */
    box(B.paint, PK.XT + 0.10, 2.20, -0.20, 0.20, -0.06, 0.18);
    box(B.dark, PK.XT + 0.10, 2.20, -0.21, 0.21, -0.08, -0.06);
    for (s = -1; s <= 1; s += 2) box(B.paint, -0.18, 0.22, s * 0.08, s * 0.20, -0.12, 0.10);
    cylY(B.dark, 0, -0.26, 0.26, 0, 0.06, 10);
    box(B.dark, 1.40, 1.56, -0.08, 0.08, -0.24, 0.0);
  }

  function buildLars(THREE, C, key) {
    var man = key === "deu_e80_mlrs", PT = man ? BRONZE : GELB;
    var T = materials(THREE, C, PT), g = new THREE.Group(), HB = bins(T), WB = new Bin(T.wheel, false, true), i, wg, AW;
    addChassis(HB, man);
    if (man) manCab(HB, WB, PT); else jupiterCab(HB, WB, PT);
    HB.wheel = WB;
    flush(THREE, g, HB);
    /* three "roadwheel" groups, one per axle, both tyres (single tyres all round: M1, B1) */
    for (i = 0; i < 3; i++) {
      AW = new Bin(T.wheel, false, true);
      addTyre(AW, LT.TY, 1, PT);
      addTyre(AW, -LT.TY, -1, PT);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(LT.AX[i], 0, LT.R);
      flush(THREE, wg, { wheel: AW });
      g.add(wg);
    }
    var tur = new THREE.Group(), MB = bins(T), EB = bins(T), cells = [];
    addMount(MB);
    flush(THREE, tur, MB);
    addPack(EB, cells);
    var e = new THREE.Group();
    flush(THREE, e, EB);
    e.name = "podelev";
    e.position.set(LA.PX, 0, LA.PZ);
    e.userData.el = LA.EL;
    e.userData.cells = cells;
    tur.add(e);
    tur.name = "turret";
    tur.position.set(LA.TX, 0, LT.DECK);
    g.add(tur);
    g.name = key;
    return g;
  }

  HeroLars = { build: buildLars };
})();

/* len: the measured X extent of each build (Jagdpanzer: track round the sprocket to the bow MG's muzzle or the
   Jaguar's mudguard boxes; LARS: the towing pintle to the bumper or the MAN's tow jaw) */
UNIT_MODELS["deu_e60_tankdestroyer"] = { len: 6.53, build: function (THREE, M, C) { return HeroJagdpanzer.build(THREE, C, "deu_e60_tankdestroyer"); } };
UNIT_MODELS["deu_e80_tankdestroyer"] = { len: 6.60, build: function (THREE, M, C) { return HeroJagdpanzer.build(THREE, C, "deu_e80_tankdestroyer"); } };
UNIT_MODELS["deu_e60_mlrs"] = { len: 7.68, build: function (THREE, M, C) { return HeroLars.build(THREE, C, "deu_e60_mlrs"); } };
UNIT_MODELS["deu_e80_mlrs"] = { len: 8.03, build: function (THREE, M, C) { return HeroLars.build(THREE, C, "deu_e80_mlrs"); } };
