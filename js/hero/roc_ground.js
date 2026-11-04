/* ============ roc_ground.js - HERO models: Taiwanese (ROC) carriers and wheeled vehicles ============
   Five vehicles, six builds, ten rows (2026-11-04, full-quality procedure):
     roc_e50_ifv            M3A1 half-track personnel carrier   olive drab     turret:true  (the M2 on the pulpit ring)
     roc_e50_spaag          M16 MGMC (M45 quad .50)             olive drab     turret:true  (the M45 mount)
     roc_e60_ifv            M113A1 APC                          olive drab     turret:true  (cupola and M2)
     roc_e80_ifv / e90_ifv  CM-21 (CM21A1) APC                  ROC green      turret:true  (cupola and M2)
     roc_e90_tankdestroyer  CM-25 TOW carrier (CM-21 hull)      ROC green      turret:true  (the TOW pedestal)
     roc_e80_recon / e90    Cadillac Gage V-150 Commando APC    ROC green      turret:true  (the M2 on the roof ring)
     roc_e00_ifv / e00_recon  CM-33 / CM-32 Yunpao 8x8          CM-32 green    turret:true  (remote weapon station)
   No markings, numbers or camouflage: every photograph below shows a three-colour scheme and numbers; each vehicle is
   painted in one plain colour (PAINT).

   COPIED: the geometry kit, the M113 hull (station table, glacis, roof, tail), the running gear, the M2, the cupola
   and the TOW launcher are copied from js/hero/us_m113.js (HeroM113), which is NOT edited.  The M113A1 build is
   that hull with the commander's cupola and M2 as us_m113.js draws them on its TOW build (no shield).  The CM-21
   and CM-25 change only the flank above the skirt, the glacis fittings and the rear (CM-21 STATIONS below); their
   running gear, belly, roof and tail are the M113's.  The V-150, the Yunpao and the half-tracks are new.
   Conventions follow js/hero/deu_recon.js and js/hero/gb_light_armour.js: one "roadwheel" group per axle holding
   both wheels on the wheeled builds, one per station holding both sides on the tracked ones.

   REFERENCES (Wikimedia Commons through commons.wikimedia.org/w/thumb.php, cached in scratchpad/q_rocg_ref;
   published figures from en.wikipedia raw, cached in scratchpad/q_rocg_wiki):
     P1  "CM-21A in Chengkungling Side View Oct2011.jpg" - CM21A1 from the LEFT, square on, nose left, 1600 px: the
         spaced plates on the side, the front plate leaning in with a knuckle, the troop compartment's steep upper
         plate with two vision blocks and two port covers, the external fuel tanks behind the rear plate, the M2,
         the round hatch lid standing open, the tubular hoop on the roof.  Measured (CM-21 STATIONS).
     P2  "CM-21A in Chengkungling Quarter View 20111009.jpg" - rear left 3/4, ramp down: the two sections of the side
         plate and the diagonal joint between them, the fuel tanks either side of the ramp, the open lid.
     P3  "CM-21A in Chengkungling Front View Oct2011.jpg" - head on: the spaced box over the upper glacis with its two
         notches, the lamp clusters further in than the M113's, the quad smoke banks splayed outward, the side
         plates leaning in, the M2 just right of the centre line.  Measured (CM-21 STATIONS).
     P4  "CM-21 near Hukou Camp Ground Close up 20140329.jpg" - front left 3/4: the same, the steep rear upper plate.
     P7  "M2 Machine Gun mounted on Top of CM-21A 20120324.jpg" - the M2 on its pintle with the hatch lid; NO gun
         shield.  No photograph found shows a CM-21 with a gun shield or a raised rear roof: neither is drawn.
     P5  "Left View of ROCMC CM-25 TOW Launcher Display at Zuoying Naval Base Ground 20151024.jpg" - CM-25 from the
         LEFT: one plain side plate from the glacis to the rear (no port section), the fuel tanks, the M2 forward,
         the TOW on its pedestal behind mid-length.  Measured (pedestal x, tank length).
     P6  "BGM-71 TOW and M2 Machine Gun on ROCMC CM-25 Top 20151024.jpg" - the TOW head and pedestal, the M2.
     P10 "ROC Military Police V-150 Commando in Headquarters.jpg" - ROC V-150 head on: the wedge nose, the lamps in
         hoop guards, the mirrors on posts, the front plate's vision blocks, the M2 on its pedestal at the front of
         the roof (no turret), the upper sides leaning in.  Measured (roof width).
     P11 "MP Commando1.jpeg" - a USAF V-150 APC from the LEFT, a little from the front: the hull profile, the wheel
         wells, the side door, the hatch over the rear wheel.  Measured (V-150 SCALE).  Its raised box behind the gun
         is a US fit and is NOT drawn (P10, P12, P14 show the ROC roof flat).
     P12 "ROC Military Police V-150S Display at CKS Memorial Hall Plaza 20130608.jpg" - ROC, front left 3/4.
     P13 "Cadillac Gage Commando.JPEG" - USAF, front right 3/4: the lamp guards, the shackles.
     P14 "ROC Military Police V-150s Commando Armored Cars in Camp 20160924.jpg" - ROC from above: the ring at the
         front of the roof, the hatches behind it, the side doors.
     P15 "ROC Military Police V-150 Commando Rear view.jpg" - ROC rear: the box on the rear deck, two jerrycans on
         the rear plate, the tail lamps in cups at the corners, no rear door.
     P20 "CM-32 Yunpao APC in Chengkungling Left View 20111009a.jpg" - from the LEFT, square on, 1600 px: the whole
         profile, the four axles, the bolted panels, the weapon station and the box behind it, the intake tube, the
         mirrors.  Measured (YUNPAO STATIONS).
     P21 "CM-32 Yunpao APC Display at Hsinchu AFB 20151121a.jpg" - front right 3/4: the nose wedge and the lamp
         housings on its corners, the glacis, the weapon station with the grenade launcher and the smoke banks.
     P30 "TM 9-2800, Carrier, Personnel, Half-Track, M3A1 (G-102).png" - US Army TM photograph, front left 3/4: the
         louvred radiator armour, the bonnet, the roller, the fenders, the pulpit over the right front seat, the
         raised sprocket and idler with the bogie between.  Ratios measured (HALF-TRACK LAYOUT).
     P31 "M-3A1 Ejercito espanol.jpg" (Commons title with an accent on the first e) - rear right 3/4: the rear door,
         the rail along the body, the pulpit, the bogie with its volute spring housing.
     P32 "M3A1 Halftrack.jpg" - a small copy of P30's view.
     P34 "TM 9-2800, Carriage, Motor, Multiple Gun, M16 (G-102).png" - M16, front right 3/4: the rear body's upper
         side plates folded down, the high bulkhead behind the cab, the M45 with four guns and the chests.
     P35 "Een White M16 Half track met een vierling.jpg" - a 1950s parade: the M45 in the rear body.
   PUBLISHED: en.wikipedia "M113 armored personnel carrier" 4.863 x 2.686 x 2.5 m; "CM21 armored vehicle" the same
   4.863 x 2.686 x 2.5 m (the M113's figures), 12.7 t without weapons, "spaced armour at the front and the sides",
   "a quad-mounted smoke grenade launcher on both sides of the front", CM25 "replaced the quad-mounted smoke grenade
   launcher with triple mounted ones ... omitted the firing ports and adding the spaced armor"; "Cadillac Gage
   Commando" V-150 5.69 x 2.26 m, 2.5 m high (the turreted V-150), clearance 0.38 m; "Clouded Leopard Armored
   Vehicle" 7 x 2.7 x 2.23 m, CM32/33 "40 mm grenade launcher and 7.62 mm machine gun in a remote weapon station";
   "M3 half-track" 20 ft 3 in (6.17 m) with roller, 7 ft 3.5 in (2.22 m) wide, 7 ft 5 in (2.26 m) high, wheelbase
   135.5 in (3.44 m); "M16 Multiple Gun Motor Carriage" 6.5 x 2.16 x 2.34 m, wheelbase 135.5 in.

   CM-21 STATIONS (P1 at 281.7 px/m: the five road wheels 188.75 px apart = the M113's 0.67 m; P3 at 374 px/m: the
     track outer faces 950 px apart = the M113's 2.54 m).  P1 puts the nose 1360 px (4.83 m) ahead of the end of
     the side plate, against the M113's 4.80 m nose to rear plate: the CM-21 hull IS the M113 hull, so the copied
     table stands and only the plates are added.  Plate foot on the ledge at 0.94 m (P1; drawn 0.965, the M113
     ledge), 2.71 m across at the foot and 2.39 m at the top (P3) - drawn +-1.355 and +-1.18.  Front section knuckle
     at 1.64 m (P1 line at 515 px), drawn; the plate above it leans 12 deg (judged from P3, NOT measured).  Rear
     section from x -1.10 (top) / -1.35 (knuckle) aft (P1): vertical to 1.38 m, the upper plate to 1.12 m out at
     the roof (P2 shows it far steeper; its angle is NOT measured).  Vision blocks x -1.42 / -1.84 at 1.73 m, port
     covers at 1.54 m (P1).  Glacis box 1.78 m wide (P3), notches at y -0.68..-0.52 and +0.35..+0.64.  Cupola
     x 0.45 (P1), y -0.12 (P3).  Fuel tanks: top 1.67 m, rear face down to 1.06 m, cut back to 0.78 m (P1 read at
     its own station, 290 px/m); length behind the rear plate 0.69 m on P1 and 0.82 m on P5 (P5 is wide-angle: its
     wheel 5 to idler distance reads 0.75 m against the M113's 0.71) - drawn 0.65 m (XT -3.02), NOT CONFIRMED.
     CM-25 TOW pedestal x -0.92 (P5 at 206.7 px/m), stands 0.62 m (P5), on the centre line (P6, by eye).
   V-150 SCALE (P11; no drawing found).  Ratios in tyre diameters D, heights read at the front-axle station: front
     overhang 1.50 D, wheelbase 2.06 D, rear overhang 1.02 D (each at its own local scale, the tyres 265 / 225 px)
     = 4.58 D; at the published 5.69 m D = 1.24 m (tyre radius 0.62).  Chine 1.13 D = 1.40 m, roof 1.55 D = 1.92 m,
     lower nose plate foot 0.79 D ahead of the axle at 0.56 D.  Roof 0.61 of the chine width (P10) = +-0.69, drawn
     0.72.  The chine is the published 2.26 m.  Track +-0.93 (tyre 0.38 wide under the chine) NOT CONFIRMED.
   YUNPAO STATIONS (P20 at 220.7 px/m: the published 7.0 m over the extreme 1545 px; the published 2.23 m height then
     falls exactly on the roof, 492 px - two published figures agree at one scale, nothing stretched).  Axles x 2.173,
     0.768, -1.090, -2.426 (pitches 1.405 / 1.858 / 1.336 m), tyres 1.10 m; nose edge 3.46 at 1.05-1.27 m, the
     lower plate back to 2.71 at 0.82 m; the upper glacis from 3.14 at 1.55 m to 2.23 at 1.93 m and 0.51 at the
     roof; belt 1.31 m (= the published 2.7 m across, +-1.35); rear plate -3.50; weapon station x -0.28; the box
     behind it -0.69..-1.28, 0.41 m high (its lateral place NOT CONFIRMED); the intake tube x 2.06 to 2.52 m.
   HALF-TRACK LAYOUT.  Fixed by published figures: the 6.17 m with roller (M3A1), the 3.44 m wheelbase taken from
     the front axle to the middle of the bogie, 2.22 m across the front fenders.  No side-on photograph or drawing
     was found: from P30, read at the rear track station in units of the body-top height (taken as 1.85 m): body
     bottom 0.88 m (drawn 0.85), sprocket centre 0.53 m, sprocket radius 0.23 m (drawn 0.25), track top 0.85 m
     (drawn 0.79); at the front axle in tyre diameters (8.25-20, 0.98 m): bonnet top 1.59 D.  The front overhang
     (1.15 m), the sprocket-to-idler length (1.70 m), the body and bonnet widths, the pulpit (0.76 m square, its
     armour 1.92-2.22 m) and the M45's proportions are NOT CONFIRMED (estimated from P30, P31, P34).  The M16 is
     drawn on the same chassis with its winch, 6.50 m long as published; its published 2.16 m width is not
     explained by the photographs and the M3's fenders (2.22 m) are kept.

   AS DRAWN (tools/model3d/dump.js, X extent / width / height): M3A1 6.20 x 2.22 x 2.58 (gun; 6.17 x 2.22 x 2.26
     published for the M3 without pulpit); M16 6.53 x 2.22 x 2.38 (6.5 x 2.16 x 2.34); M113A1 4.92 x 2.69 (4.863 x
     2.686; the track round the sprocket adds 6 cm); CM-21 and CM-25 5.53 x 2.72 (hull 4.92 as the M113 + the tanks;
     2.71 m measured on P3 against the M113's 2.686 published for the CM21); V-150 5.73 x 2.38 (5.69 x 2.26: the
     shackles and lamps add 4 cm, the mirrors make the 2.38); Yunpao 7.04 x 2.90 (7.0 x 2.7: the mirrors); the whip
     aerials make the 3.4 m heights; roofs: M113 1.87, V-150 1.92, Yunpao 2.23 (published 2.23).

   NOT CONFIRMED (drawn by judgement): the CM-32 / CM-33 difference - both rows carry the same build, as P20/P21 and
     the en.wikipedia text give both the same weapon station and nothing seen tells them apart; the V-150's rear
     deck box size, its hatch layout and the gun ring's x (0.70, P14 by eye); the M3A1's chassis proportions listed
     above, the M16's flap height; the CM-21 upper-plate angles; the CM-25 hoop; the plain paints.
   NOT DRAWN: markings, numbers, the camouflage, stowage, crews, the M113A3-style details, the US raised box of P11.
   PAINT: olive drab #4a5235 (us_m113.js) on the M3A1, M16 and M113A1, which the ROC received from US aid; ROC green
     #55633f on the CM-21, CM-25 and V-150, the green of their three-colour scheme in P1-P3 and P10 (judged, not
     sampled); #5d7a46 on the Yunpao (P20's sunlit green #729752-#789e5a taken to about 0.8).  Team colour: strips
     on the roof edges (the body-side tops on the half-tracks).
   ENGINE (js/damage3d.js ENGINE_AT, not edited): roc_e90_tankdestroyer (CM-25) has its engine FRONT RIGHT (the M113
     layout) but its role puts it at the rear and it is not listed; every other row here burns where its engine is.
   Nodes: "turret" on every build (origin on its ring or pedestal at the roof or floor, weapon along +X); "roadwheel":
     tracked - five wheel stations, the sprocket and the idler (M113 family), or the sprocket, the idler and four
     bogie stations plus the front axle (half-tracks); wheeled - one group per axle.
   Model space: +X nose, +Y left, +Z up, metres, ground at z = 0.  ASCII only.  */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRocGround = (function () {
  "use strict";
  var TAU = Math.PI * 2;
  /* -------------------------------------------------------- geometry kit (copied from us_m113.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
      }
    }
  };
  /* a closed solid: the signed volume says whether the faces point out, and they are turned if not */
  function solid(bin, V, F, smooth) {
    var vol = 0, i, f, a, b, c, N = null, fn, k, q;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var flip = vol < 0;
    if (smooth) {
      N = [];
      for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
      for (i = 0; i < F.length; i++) {
        f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
        fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
        q = [a, b, c];
        for (k = 0; k < 3; k++) { N[q[k]][0] += fn[0]; N[q[k]][1] += fn[1]; N[q[k]][2] += fn[2]; }
      }
      for (i = 0; i < N.length; i++) N[i] = unit(N[i]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
      fn = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(fn, fn) < 1e-16) continue;
      bin.tri(V[a], V[b], V[c], N && N[a], N && N[b], N && N[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function rbox(bin, cx, cy, hx, hy, ang, z0, z1) {
    var c = Math.cos(ang), s = Math.sin(ang), k, q = [[-hx, -hy], [hx, -hy], [hx, hy], [-hx, hy]], P = [];
    for (k = 0; k < 8; k++) {
      var e = q[k % 4];
      P.push([cx + e[0] * c - e[1] * s, cy + e[0] * s + e[1] * c, k < 4 ? z0 : z1]);
    }
    hexa(bin, P);
  }
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  function prism(bin, pts, z0, z1) {
    var n = pts.length, V = [], F = [], i, k;
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z0]);
    for (i = 0; i < n; i++) V.push([pts[i][0], pts[i][1], z1]);
    for (i = 1; i < n - 1; i++) { F.push([0, i + 1, i]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  function cyl(bin, A, B, r0, r1, seg, nocapA, nocapB) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), L = Math.sqrt(dot(sub(B, A), sub(B, A))) || 1;
    var k = (r0 - r1) / L, na = [-ax[0], -ax[1], -ax[2]], i, j, a0, a1, r0v, r1v, pa, pb, pc, pd, n0, n1, c0, s0, c1, s1;
    for (i = 0; i < seg; i++) {
      j = (i + 1) % seg;
      a0 = i / seg * TAU; a1 = j / seg * TAU;
      c0 = Math.cos(a0); s0 = Math.sin(a0); c1 = Math.cos(a1); s1 = Math.sin(a1);
      r0v = [u[0] * c0 + v[0] * s0, u[1] * c0 + v[1] * s0, u[2] * c0 + v[2] * s0];
      r1v = [u[0] * c1 + v[0] * s1, u[1] * c1 + v[1] * s1, u[2] * c1 + v[2] * s1];
      pa = [A[0] + r0v[0] * r0, A[1] + r0v[1] * r0, A[2] + r0v[2] * r0];
      pb = [A[0] + r1v[0] * r0, A[1] + r1v[1] * r0, A[2] + r1v[2] * r0];
      pc = [B[0] + r1v[0] * r1, B[1] + r1v[1] * r1, B[2] + r1v[2] * r1];
      pd = [B[0] + r0v[0] * r1, B[1] + r0v[1] * r1, B[2] + r0v[2] * r1];
      n0 = unit([r0v[0] + ax[0] * k, r0v[1] + ax[1] * k, r0v[2] + ax[2] * k]);
      n1 = unit([r1v[0] + ax[0] * k, r1v[1] + ax[1] * k, r1v[2] + ax[2] * k]);
      bin.tri(pa, pb, pc, n0, n1, n1);
      bin.tri(pa, pc, pd, n0, n1, n0);
      if (!nocapA) bin.tri(A, pb, pa, na, na, na);
      if (!nocapB) bin.tri(B, pd, pc, ax, ax, ax);
    }
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function bar(bin, A, B, w) {
    var d = sub(B, A), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
  }
  /* a toothed wheel standing on the Y axis: nt teeth between radii rr and rt */
  function gear(bin, cx, y0, y1, cz, rr, rt, nt) {
    var n = nt * 4, V = [], F = [], i, t, step = TAU / nt, a, r, kk, ph = [0.05, 0.30, 0.55, 0.80], rd = [rr, rt, rt, rr];
    for (i = 0; i < n; i++) {
      t = (i / 4) | 0; kk = i % 4; a = (t + ph[kk]) * step; r = rd[kk];
      V.push([cx + r * Math.cos(a), y0, cz + r * Math.sin(a)]);
    }
    for (i = 0; i < n; i++) V.push([V[i][0], y1, V[i][2]]);
    V.push([cx, y0, cz], [cx, y1, cz]);
    for (i = 0; i < n; i++) {
      t = (i + 1) % n;
      F.push([i, n + i, t], [t, n + i, n + t], [2 * n, i, t], [2 * n + 1, n + t, n + i]);
    }
    solid(bin, V, F);
  }
  function inTri(p, a, b, c) {
    var d1 = (p[0] - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (p[1] - b[1]);
    var d2 = (p[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (p[1] - c[1]);
    var d3 = (p[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (p[1] - a[1]);
    var neg = (d1 < -1e-12) || (d2 < -1e-12) || (d3 < -1e-12), pos = (d1 > 1e-12) || (d2 > 1e-12) || (d3 > 1e-12);
    return !(neg && pos);
  }
  function earclip(P) {
    var n = P.length, idx = [], out = [], i, k, m, area = 0, a, b, c, i0, i1, i2, ok, found, guard = 0, q;
    for (i = 0; i < n; i++) { a = P[i]; b = P[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; idx.push(i); }
    if (area < 0) idx.reverse();
    while (idx.length > 3 && guard++ < 400) {
      m = idx.length; found = false;
      for (i = 0; i < m && !found; i++) {
        i0 = idx[(i + m - 1) % m]; i1 = idx[i]; i2 = idx[(i + 1) % m];
        a = P[i0]; b = P[i1]; c = P[i2];
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) <= 1e-12) continue;
        ok = true;
        for (k = 0; k < m; k++) {
          q = idx[k];
          if (q === i0 || q === i1 || q === i2) continue;
          if (inTri(P[q], a, b, c)) { ok = false; break; }
        }
        if (ok) { out.push([i0, i1, i2]); idx.splice(i, 1); found = true; }
      }
      if (!found) break;
    }
    if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
    else for (i = 1; i < idx.length - 1; i++) out.push([idx[0], idx[i], idx[i + 1]]);
    return out;
  }
  /* a skin lofted through cross-section rings (same point count each), capped at both ends */
  function loft(bin, rings) {
    var m = rings.length, n = rings[0].length, V = [], F = [], i, j, k, R = [], area = 0, a, b, T, b0, ri, tr;
    for (j = 0; j < n; j++) { a = rings[0][j]; b = rings[0][(j + 1) % n]; area += a[1] * b[2] - b[1] * a[2]; }
    for (i = 0; i < m; i++) R.push(area < 0 ? rings[i].slice().reverse() : rings[i]);
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) V.push(R[i][j]);
    for (i = 0; i < m - 1; i++) for (j = 0; j < n; j++) {
      k = (j + 1) % n;
      F.push([i * n + j, i * n + k, (i + 1) * n + k], [i * n + j, (i + 1) * n + k, (i + 1) * n + j]);
    }
    for (ri = 0; ri < 2; ri++) {
      T = earclip(R[ri ? m - 1 : 0].map(function (p) { return [p[1], p[2]]; }));
      b0 = V.length;
      for (j = 0; j < n; j++) V.push(R[ri ? m - 1 : 0][j]);
      for (tr = 0; tr < T.length; tr++) {
        if (ri) F.push([b0 + T[tr][0], b0 + T[tr][1], b0 + T[tr][2]]);
        else F.push([b0 + T[tr][0], b0 + T[tr][2], b0 + T[tr][1]]);
      }
    }
    solid(bin, V, F);
  }
  /* a side profile in (x, z) thickened between y0 and y1 (need not be convex) */
  function profY(bin, pts, y0, y1) {
    var n, V = [], F = [], i, k, T, ar = 0, a, b;
    for (i = 0; i < pts.length; i++) { a = pts[i]; b = pts[(i + 1) % pts.length]; ar += a[0] * b[1] - b[0] * a[1]; }
    if (ar < 0) pts = pts.slice().reverse();
    n = pts.length;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    T = earclip(pts);
    for (i = 0; i < T.length; i++) { F.push([T[i][0], T[i][2], T[i][1]]); F.push([n + T[i][0], n + T[i][1], n + T[i][2]]); }
    for (i = 0; i < n; i++) { k = (i + 1) % n; F.push([i, k, n + k], [i, n + k, n + i]); }
    solid(bin, V, F);
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  /* on the glacis plane: u up the slope from the nose edge, w across (+Y), h off the plate */
  function onGlacis(bin, u0, u1, w0, w1, h0, h1) { planeBox(bin, [GX0, 0, GZ0], GT, [0, 1, 0], GN, u0, u1, w0, w1, h0, h1); }
  function gpt(u, w, h) { return [GX0 + GT[0] * u + GN[0] * h, w, GZ0 + GT[2] * u + GN[2] * h]; }

  /* ------------------------------------------------------------------ paint (plain, no camouflage) */
  var PAINT = {
    od:   { key: "rocg_od",   base: "#4a5235", blots: [["#525a3c", 9, 55], ["#40472e", 9, 45]], seed: 1951, soft: true },
    roc:  { key: "rocg_roc",  base: "#55633f", blots: [["#5c6b45", 9, 55], ["#4b5838", 9, 45]], seed: 1982, soft: true },
    cm32: { key: "rocg_cm32", base: "#5d7a46", blots: [["#64824c", 9, 55], ["#54703f", 9, 45]], seed: 2007, soft: true }
  };
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* one tile is 2.94 m of surface (UVs are 0.34 per metre): MERDC patches come out 0.5-1.5 m across */
  function paintTex(THREE, P) {
    if (_tex[P.key] !== undefined) return _tex[P.key];
    var t = null;
    try {
      var W = 256, cv = document.createElement("canvas");
      cv.width = W; cv.height = W;
      var q = cv.getContext("2d"), R = rng(P.seed), i, k, a, x, y, rr, ang, rd, j, ox, oy;
      q.fillStyle = P.base; q.fillRect(0, 0, W, W);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k][0];
        q.globalAlpha = P.soft ? 0.40 : 1;
        for (i = 0; i < P.blots[k][1]; i++) {
          x = R() * W; y = R() * W; rr = P.blots[k][2] * (0.7 + R() * 0.6);
          /* drawn on the tile and its wrapped copies so the pattern tiles without a seam */
          for (ox = -W; ox <= W; ox += W) for (oy = -W; oy <= W; oy += W) {
            if (x + ox < -rr * 2 || x + ox > W + rr * 2 || y + oy < -rr * 2 || y + oy > W + rr * 2) continue;
            q.beginPath();
            for (a = 0; a < 9; a++) {
              ang = a / 9 * TAU; rd = rr * (0.6 + ((Math.sin(a * 2.3 + i * 1.7 + k) + 1) * 0.3));
              j = [x + ox + Math.cos(ang) * rd * 1.5, y + oy + Math.sin(ang) * rd];
              if (a === 0) q.moveTo(j[0], j[1]); else q.lineTo(j[0], j[1]);
            }
            q.closePath(); q.fill();
          }
        }
      }
      q.globalAlpha = 1;
      /* plate seams and weathering: rain streaks, chips */
      q.strokeStyle = "rgba(18,20,14,0.28)"; q.lineWidth = 1.1;
      for (i = 0; i < 3; i++) { q.beginPath(); q.moveTo(i * 85 + 30.5, 0); q.lineTo(i * 85 + 30.5, W); q.stroke(); }
      for (i = 0; i < 110; i++) {
        q.fillStyle = (i % 3) ? "rgba(16,16,10,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * W, R() * W, 1 + R() * 3, 8 + R() * 36);
      }
      for (i = 0; i < 40; i++) { q.fillStyle = "rgba(10,10,8,0.18)"; q.fillRect(R() * W, R() * W, 2, 2); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[P.key] = t;
    return t;
  }

  var _tex = {};
  function materials(THREE, C, P) {
    var T = {}, tx = paintTex(THREE, P);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.07 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.tyre = new THREE.MeshStandardMaterial({ color: 0x1b1c1b, roughness: 0.95, metalness: 0.02 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false),
             team: new Bin(T.team, false), tyre: new Bin(T.tyre, false) };
  }
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); g.name = name; g.position.set(x, y, z); return g; }
  /* a box lying on an inclined face: P0 a point of the face, U along it (usually +X), W up the face, N out of it */
  function faceBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) { planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1); }
  /* the face frame of a side plate leaning in from (wA, zA) to (wB, zB) on side s */
  function sideFrame(s, wA, zA, wB, zB) {
    var W = unit([0, s * (wB - wA), zB - zA]), N = [0, W[2], -W[1]];
    if (N[1] * s < 0) N = [0, -N[1], -N[2]];
    return { P0: [0, s * wA, zA], W: W, N: N, L: Math.sqrt((wB - wA) * (wB - wA) + (zB - zA) * (zB - zA)) };
  }
  function onSide(bin, F, x0, x1, w0, w1, h0, h1) {
    planeBox(bin, F.P0, [1, 0, 0], F.W, F.N, x0, x1, w0, w1, h0, h1);
  }
  /* a pneumatic tyre pair on one axle, both sides, in the axle group's frame (origin on the axle centre):
     the carcass, a row of tread bars, the steel wheel disc with its hub and nuts */
  function tyrePair(TB, PB, DB, r, ty, hw, rim, nl, nn) {
    var s, i, a, ca, sa, off, y;
    for (s = -1; s <= 1; s += 2) {
      y = s * ty;
      cylY(TB, 0, y - hw * 0.86, y + hw * 0.86, 0, r - 0.025, 24);
      cyl(TB, [0, y + hw * 0.86, 0], [0, y + hw, 0], r - 0.04, r * 0.72, 24, true, false);
      cyl(TB, [0, y - hw * 0.86, 0], [0, y - hw, 0], r - 0.04, r * 0.72, 24, true, false);
      for (i = 0; i < nl; i++) {
        a = i / nl * TAU; ca = Math.cos(a); sa = Math.sin(a); off = (i % 2 ? 0.3 : -0.3) * hw;
        planeBox(TB, [ca * (r - 0.03), y + off, sa * (r - 0.03)], [-sa, 0, ca], [0, 1, 0], [ca, 0, sa],
                 -0.025, 0.025, -hw * 0.55, hw * 0.55, 0, 0.03);
      }
      cyl(PB, [0, y + s * (hw - 0.04), 0], [0, y + s * (hw + 0.005), 0], rim, rim - 0.03, 20, true, false);
      cyl(PB, [0, y + s * hw, 0], [0, y + s * (hw + 0.05), 0], rim * 0.45, rim * 0.36, 14, true, false);
      cyl(DB, [0, y + s * (hw + 0.05), 0], [0, y + s * (hw + 0.07), 0], rim * 0.18, rim * 0.12, 8, true, false);
      for (i = 0; i < nn; i++) {
        a = i / nn * TAU;
        cylY(DB, Math.cos(a) * rim * 0.62, y + s * hw, y + s * (hw + 0.015), Math.sin(a) * rim * 0.62, 0.017, 6);
      }
    }
  }
  /* a full-ring loft from half profiles: each station [x, [[y, z], ...]] from the bottom centre up the side to the
     roof edge; mirrored to both sides */
  function loftHalf(bin, stations) {
    var rings = [], i, k, h, r;
    for (i = 0; i < stations.length; i++) {
      h = stations[i][1]; r = [];
      for (k = 0; k < h.length; k++) r.push([stations[i][0], -h[k][0], h[k][1]]);
      for (k = h.length - 1; k >= 0; k--) r.push([stations[i][0], h[k][0], h[k][1]]);
      rings.push(r);
    }
    loft(bin, rings);
  }
  /* clamp a half profile under a top height zt (points above it are pulled down, keeping the order) */
  function clampHalf(h, zt) {
    var o = [], k, z, prev = -1;
    for (k = 0; k < h.length; k++) {
      z = Math.min(h[k][1], zt - (k === h.length - 1 ? 0 : 0.02 * (h.length - 1 - k) / h.length));
      if (z < prev) z = prev;
      prev = z;
      o.push([h[k][0], z]);
    }
    return o;
  }
  /* an M2 .50 on its pintle: receiver, barrel jacket, barrel, flash hider, ammunition can; muzzle along +X
     (us_m113.js m2gun) */
  function m2gun(D, ox, oy, gz0) {
    cylZ(D, ox + 0.10, oy, gz0 - 0.30, gz0 - 0.06, 0.03, 6);
    box(D, ox - 0.05, ox + 0.38, oy - 0.055, oy + 0.055, gz0 - 0.07, gz0 + 0.07);
    box(D, ox - 0.16, ox - 0.05, oy - 0.04, oy + 0.04, gz0 - 0.05, gz0 + 0.03);
    cylX(D, ox + 0.38, ox + 0.62, oy, gz0, 0.036, 8);
    cylX(D, ox + 0.62, ox + 1.18, oy, gz0, 0.021, 6);
    cylX(D, ox + 1.12, ox + 1.22, oy, gz0, 0.03, 6);
    box(D, ox + 0.05, ox + 0.25, oy + 0.055, oy + 0.17, gz0 - 0.14, gz0 + 0.0);
  }
  /* a .30 / 7.62 mm machine gun along +X from its breech at x0 */
  function lightMG(D, x0, y, z, len) {
    box(D, x0, x0 + 0.34, y - 0.035, y + 0.035, z - 0.045, z + 0.045);
    box(D, x0 - 0.20, x0, y - 0.025, y + 0.025, z - 0.06, z + 0.02);
    cylX(D, x0 + 0.34, x0 + len, y, z, 0.014, 0.014, 6);
  }
  /* a headlamp drum facing +X with its glass */
  function lamp(B, x, y, z, r) {
    cylX(B.dark, x - 0.10, x, y, z, r, r * 1.05, 12);
    cylX(B.glass, x, x + 0.012, y, z, r * 0.85, r * 0.85, 12);
  }
  /* a smoke-grenade bank: n tubes in a 2-row block, pointing along d from base point p */
  function smokeBank(D, p, d, s, n) {
    var k, q, e = unit(cross(d, [0, 0, 1])), up = unit(cross(e, d));
    for (k = 0; k < n; k++) {
      var a = (k % 2) * 0.085 - 0.04, b = Math.floor(k / 2) * 0.085 - (n > 2 ? 0.04 : 0);
      q = [p[0] + e[0] * a + up[0] * b, p[1] + e[1] * a + up[1] * b, p[2] + e[2] * a + up[2] * b];
      cyl(D, q, [q[0] + d[0] * 0.26, q[1] + d[1] * 0.26, q[2] + d[2] * 0.26], 0.042, 0.042, 10);
    }
    box(D, p[0] - 0.10, p[0] + 0.06, p[1] - 0.10, p[1] + 0.10, p[2] - 0.12, p[2] - 0.05);
  }

  /* ================================================================ the M113 hull (copied from us_m113.js) */
  var ROOF = 1.87, HW = 1.31, HB = 0.86, XN = 2.43, XR = -2.37;
  var XW = [1.40, 0.73, 0.06, -0.61, -1.28], RW = 0.29, ZB = 0.06, ZW = ZB + RW;
  var SPR = { x: 2.14, z: 0.58, r: 0.23 }, IDL = { x: -1.99, z: 0.40, r: 0.25 };
  var TYC = 1.08, THW = 0.19;
  var GX0 = XN, GZ0 = 0.99, GX1 = 1.50;
  var GT = (function () { var dx = GX1 - GX0, dz = ROOF - GZ0, l = Math.sqrt(dx * dx + dz * dz); return [dx / l, 0, dz / l]; })();
  var GN = [-GT[2], 0, GT[0]];
  if (GN[0] < 0) GN = [-GN[0], 0, -GN[2]];
  var GL = Math.sqrt((GX1 - GX0) * (GX1 - GX0) + (ROOF - GZ0) * (ROOF - GZ0));
  function gz(x) { return GZ0 + (GX0 - x) * (ROOF - GZ0) / (GX0 - GX1); }
  var STATIONS = [[XR, 0.56, 0.80, 0.80], [-2.30, 0.43, 0.80, 0.80], [-1.97, 0.41, 0.76, 0.69], [GX1, 0.41, 0.76, 0.69],
                  [2.02, 0.43, 0.86, 0.70], [2.25, 0.50, 0.92, 0.92], [2.36, 0.58, 0.95, 0.95], [XN, 0.72, 0.96, 0.96]];
  /* the belly, floor and skirt-foot heights of the M113 station table at any x (linear between its stations) */
  function lowerAt(x) {
    var S = STATIONS, i, t;
    if (x <= S[0][0]) return [S[0][1], S[0][2], S[0][3]];
    for (i = 0; i < S.length - 1; i++) {
      if (x <= S[i + 1][0]) {
        t = (x - S[i][0]) / (S[i + 1][0] - S[i][0]);
        return [S[i][1] + (S[i + 1][1] - S[i][1]) * t, S[i][2] + (S[i + 1][2] - S[i][2]) * t, S[i][3] + (S[i + 1][3] - S[i][3]) * t];
      }
    }
    i = S.length - 1;
    return [S[i][1], S[i][2], S[i][3]];
  }

  /* CM-21 spaced armour, as measured (header, CM-21 STATIONS): the plate stands on the side ledge at 0.965 m,
     1.355 m out, and leans in to the roof edge.  FRONT section: a knuckle at 1.64 m, the roof edge 1.18 m out.
     REAR section (the troop compartment, behind x -1.35): a near-vertical lower plate to 1.38 m and a steep
     upper plate carrying the vision blocks, the roof edge 1.12 m out. */
  var CMF = { w0: 1.355, zk: 1.64, w1: 1.25, w2: 1.18 };
  var CMR = { w0: 1.355, zk: 1.38, w1: 1.345, w2: 1.12 };
  /* one station ring (us_m113.js ring, with the flank above the skirt replaced when a plate profile P is given) */
  function ring(x, zb, zf, zs, zt, P) {
    var h, k, r = [], prev;
    if (!P) h = [[HB, zb], [HB, zf], [HW - 0.02, zf], [HW - 0.02, zs], [HW, zs], [HW, zs + 0.01], [HW, zs + 0.02],
                 [HW, zs + 0.03], [HW, zt - 0.025], [HW - 0.025, zt]];
    else h = [[HB, zb], [HB, zf], [HW - 0.02, zf], [HW - 0.02, zs], [HW, zs], [HW, 0.955], [P.w0, 0.965], [P.w1, P.zk],
              [P.w2, zt - 0.025], [P.w2 - 0.025, zt]];
    prev = h[4][1];
    for (k = 5; k < 9; k++) { h[k][1] = Math.max(prev, Math.min(h[k][1], zt - 0.025)); prev = h[k][1]; }
    for (k = 0; k < h.length; k++) r.push([x, -h[k][0], h[k][1]]);
    for (k = h.length - 1; k >= 0; k--) r.push([x, h[k][0], h[k][1]]);
    return r;
  }

  /* the track: a rope round the idler, the five wheels' bottoms, the sprocket and back over the wheel tops */
  function trackPath() {
    var C = [], k, p = [], i, A, B, d, L, rp, ph, n, a0, a1, da, s, m;
    for (k = XW.length - 1; k >= 0; k--) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: SPR.x, z: SPR.z, r: SPR.r + 0.02 });
    for (k = 0; k < XW.length; k++) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: IDL.x, z: IDL.z, r: IDL.r });
    var T = [];
    for (i = 0; i < C.length; i++) {
      A = C[i]; B = C[(i + 1) % C.length];
      d = [B.x - A.x, B.z - A.z]; L = Math.sqrt(d[0] * d[0] + d[1] * d[1]); d = [d[0] / L, d[1] / L];
      rp = [d[1], -d[0]];
      ph = Math.asin((A.r - B.r) / L);
      n = [rp[0] * Math.cos(ph) + d[0] * Math.sin(ph), rp[1] * Math.cos(ph) + d[1] * Math.sin(ph)];
      T.push({ n: n, a: [A.x + A.r * n[0], A.z + A.r * n[1]], b: [B.x + B.r * n[0], B.z + B.r * n[1]] });
    }
    function line(P, Q) {
      var l = Math.sqrt((Q[0] - P[0]) * (Q[0] - P[0]) + (Q[1] - P[1]) * (Q[1] - P[1])), j, nn = Math.max(1, Math.round(l / 0.076));
      for (j = 1; j <= nn; j++) p.push([P[0] + (Q[0] - P[0]) * j / nn, P[1] + (Q[1] - P[1]) * j / nn]);
    }
    for (i = 0; i < C.length; i++) {
      var tin = T[(i + C.length - 1) % C.length], tout = T[i], c = C[i];
      a0 = Math.atan2(tin.n[1], tin.n[0]); a1 = Math.atan2(tout.n[1], tout.n[0]);
      da = a1 - a0;
      while (da > Math.PI) da -= TAU;
      while (da < -Math.PI) da += TAU;
      m = Math.max(1, Math.round(Math.abs(da) * c.r / 0.076));
      for (s = 0; s <= m; s++) p.push([c.x + c.r * Math.cos(a0 + da * s / m), c.z + c.r * Math.sin(a0 + da * s / m)]);
      line(tout.a, tout.b);
      p.pop();
    }
    return p;
  }
  function belt(bin, path, y0, y1) {
    var n = path.length, V = [], F = [], i, k, a, b, c, tx, tz, l, nx, nz, to, ti = 0.035, A, B, a0, a1, b0, b1;
    for (i = 0; i < n; i++) {
      a = path[(i + n - 1) % n]; b = path[i]; c = path[(i + 1) % n];
      tx = c[0] - a[0]; tz = c[1] - a[1]; l = Math.sqrt(tx * tx + tz * tz) || 1;
      nx = tz / l; nz = -tx / l;
      to = (i % 2) ? 0.030 : 0.060;
      V.push([b[0] + nx * to, y1, b[1] + nz * to], [b[0] + nx * to, y0, b[1] + nz * to],
             [b[0] - nx * ti, y0, b[1] - nz * ti], [b[0] - nx * ti, y1, b[1] - nz * ti]);
    }
    for (i = 0; i < n; i++) {
      A = i * 4; B = ((i + 1) % n) * 4;
      for (k = 0; k < 4; k++) {
        a0 = A + k; a1 = A + (k + 1) % 4; b0 = B + k; b1 = B + (k + 1) % 4;
        F.push([a0, b0, a1], [a1, b0, b1]);
      }
    }
    solid(bin, V, F);
  }
  function running(B) {
    var s, k, path = trackPath();
    belt(B.dark, path, TYC - THW, TYC + THW);
    belt(B.dark, path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < XW.length; k++) {
        cylY(B.dark, XW[k], s * (TYC - 0.17), s * (TYC - 0.03), ZW, RW, 18);
        cylY(B.dark, XW[k], s * (TYC + 0.03), s * (TYC + 0.17), ZW, RW, 18);
        cylY(B.dark, XW[k], s * HB, s * (TYC - 0.17), ZW, 0.06, 8);
        bar(B.dark, [XW[k], s * (HB + 0.04), ZW], [XW[k] + 0.32, s * (HB + 0.04), ZW + 0.12], 0.07);
      }
      cylY(B.dark, SPR.x, s * (HB - 0.02), s * (TYC - 0.12), SPR.z, 0.13, 12);
      bar(B.dark, [IDL.x, s * (HB + 0.04), IDL.z], [IDL.x + 0.34, s * (HB + 0.04), IDL.z + 0.14], 0.08);
    }
  }
  function wheelDiscs(bin) {
    var s, k, a, o, side;
    for (s = -1; s <= 1; s += 2) {
      for (side = -1; side <= 1; side += 2) {
        o = s * TYC + side * 0.17;
        cyl(bin, [0, o, 0], [0, o + side * 0.02, 0], RW - 0.035, RW - 0.06, 18, false, false);
        cyl(bin, [0, o + side * 0.02, 0], [0, o + side * 0.05, 0], 0.13, 0.11, 12, true, false);
      }
      o = s * (TYC + 0.17);
      cyl(bin, [0, o + s * 0.05, 0], [0, o + s * 0.08, 0], 0.065, 0.05, 8, true, false);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU;
        box(bin, 0.18 * Math.cos(a) - 0.016, 0.18 * Math.cos(a) + 0.016, o + s * 0.015 - 0.01, o + s * 0.035,
            0.18 * Math.sin(a) - 0.016, 0.18 * Math.sin(a) + 0.016);
      }
    }
  }
  function sprocketDiscs(bin) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      gear(bin, 0, s * TYC - 0.15, s * TYC - 0.07, 0, SPR.r - 0.03, SPR.r + 0.035, 10);
      gear(bin, 0, s * TYC + 0.07, s * TYC + 0.15, 0, SPR.r - 0.03, SPR.r + 0.035, 10);
      cyl(bin, [0, s * (TYC - 0.07), 0], [0, s * (TYC + 0.07), 0], 0.15, 0.15, 14);
      cyl(bin, [0, s * (TYC + 0.15), 0], [0, s * (TYC + 0.21), 0], 0.10, 0.08, 10);
    }
  }
  function idlerDiscs(bin) {
    var s, k, a, side, o;
    for (s = -1; s <= 1; s += 2) {
      for (side = -1; side <= 1; side += 2) {
        o = s * TYC + side * 0.17;
        cyl(bin, [0, o - side * 0.10, 0], [0, o, 0], IDL.r - 0.01, IDL.r - 0.01, 18);
        for (k = 0; k < 6; k++) {
          a = (k + 0.5) / 6 * TAU;
          box(bin, 0.15 * Math.cos(a) - 0.045, 0.15 * Math.cos(a) + 0.045, side > 0 ? o : o - 0.006, side > 0 ? o + 0.006 : o,
              0.15 * Math.sin(a) - 0.045, 0.15 * Math.sin(a) + 0.045);
        }
      }
      cyl(bin, [0, s * (TYC + 0.17), 0], [0, s * (TYC + 0.22), 0], 0.08, 0.065, 8);
    }
  }

  /* the hull loft: the M113 table; the CM-21 and CM-25 add stations where their plate profile changes */
  function hullLoft(B, V) {
    var xs, i, x, lo, P, st = [];
    if (V.kind === "m113") xs = STATIONS.map(function (q) { return q[0]; });
    else if (V.rearPorts) xs = [XR, -2.30, -1.97, -1.35, -1.10, GX1, 2.02, 2.25, 2.30, 2.36, XN];
    else xs = [XR, -2.30, -1.97, GX1, 2.02, 2.25, 2.30, 2.36, XN];
    for (i = 0; i < xs.length; i++) {
      x = xs[i]; lo = lowerAt(x);
      P = null;
      if (V.kind !== "m113" && x <= 2.25) P = (V.rearPorts && x <= -1.35) ? CMR : CMF;
      st.push(ring(x, lo[0], lo[1], lo[2], x > GX1 ? gz(x) : ROOF, P));
    }
    loft(B.paint, st);
  }

  function hull113(B, V) {
    var s, k, x, cm = V.kind !== "m113";
    hullLoft(B, V);
    running(B);
    for (s = -1; s <= 1; s += 2) {
      if (!cm) {
        /* the side ledge, a lip standing 3.5 cm off the flank (us_m113.js) */
        box(B.paint, -1.97, 2.02, s > 0 ? HW - 0.01 : -HW - 0.035, s > 0 ? HW + 0.035 : -HW + 0.01, 0.965, 1.005);
        box(B.dark, -1.95, 2.00, s > 0 ? HW + 0.034 : -HW - 0.037, s > 0 ? HW + 0.037 : -HW - 0.034, 0.97, 0.98);
        for (k = 0; k < 2; k++) box(B.dark, k ? -2.20 : 1.25, k ? -2.08 : 1.37, s * HW - 0.02, s * HW + 0.02, ROOF - 0.06, ROOF + 0.03);
        for (k = 0; k < 12; k++) {
          x = -1.85 + k * 0.33;
          box(B.dark, x - 0.02, x + 0.02, s > 0 ? HW : -HW - 0.012, s > 0 ? HW + 0.012 : -HW, 0.92, 0.95);
        }
      } else {
        /* the dark seam where the spaced plates stand on the ledge (P1, P2) */
        box(B.dark, XR + 0.02, 2.22, s > 0 ? CMF.w0 - 0.01 : -CMF.w0 - 0.006, s > 0 ? CMF.w0 + 0.006 : -CMF.w0 + 0.01, 0.955, 0.975);
        /* lifting eyes on the roof edge, front and rear (P1, P3) */
        for (k = 0; k < 2; k++) {
          x = k ? -2.18 : 1.30;
          cyl(B.dark, [x - 0.07, s * (CMF.w2 - 0.06), ROOF + 0.02], [x + 0.07, s * (CMF.w2 - 0.06), ROOF + 0.02], 0.05, 0.05, 8);
        }
      }
    }
    roof113(B, V);
    glacis113(B, V);
    tail113(B, V);
    if (cm) cmPlates(B, V);
  }

  /* the glacis: M113A1 - the trim vane folded on it and the lamp clusters (us_m113.js); CM-21 / CM-25 - the
     spaced-armour box over its upper part with the two notches, the lamps further in, the smoke-grenade banks */
  function glacis113(B, V) {
    var s, k, w, c, cm = V.kind !== "m113";
    if (!cm) {
      onGlacis(B.paint, 0.16, GL - 0.20, -1.06, 1.06, 0.0, 0.045);
      onGlacis(B.paint, GL - 0.26, GL - 0.20, -1.04, 1.04, 0.045, 0.075);
      for (s = -1; s <= 1; s += 2) {
        onGlacis(B.dark, 0.08, 0.22, s * 0.70 - 0.08, s * 0.70 + 0.08, 0.0, 0.07);
        onGlacis(B.dark, 0.30, GL - 0.28, s * 0.40 - 0.03, s * 0.40 + 0.03, 0.045, 0.055);
      }
    } else {
      /* the box, 1.78 m across (P3: 660 px at 374 px/m), its lower band, the hinge brackets along its foot */
      onGlacis(B.paint, GL - 1.02, GL - 0.05, -0.89, 0.89, 0.0, 0.15);
      onGlacis(B.paint, 0.12, GL - 1.02, -0.95, 0.95, 0.0, 0.05);
      for (k = -1; k <= 1; k += 2) onGlacis(B.dark, GL - 1.10, GL - 0.96, k * 0.55 - 0.07, k * 0.55 + 0.07, 0.03, 0.10);
      /* the notches (P3): vehicle right 0.16 m wide, vehicle left (the driver's) 0.29 m wide, the driver's periscope */
      onGlacis(B.dark, GL - 0.52, GL - 0.04, -0.68, -0.52, 0.06, 0.153);
      onGlacis(B.dark, GL - 0.62, GL - 0.04, 0.35, 0.64, 0.06, 0.153);
      onGlacis(B.glass, GL - 0.40, GL - 0.30, 0.40, 0.58, 0.153, 0.16);
    }
    /* the lamp clusters in their guards on the top corners (M113A1 at 1.14 m out; CM-21 at 1.05, P3) */
    for (s = -1; s <= 1; s += 2) {
      w = s * (cm ? 1.05 : HW - 0.17);
      onGlacis(B.paint, GL - 0.34, GL - 0.02, w - 0.15, w + 0.15, cm ? 0.10 : 0.0, cm ? 0.22 : 0.10);
      for (k = 0; k < 2; k++) {
        c = gpt(GL - 0.18, w + (k ? 0.07 : -0.07), cm ? 0.22 : 0.10);
        cyl(B.dark, c, [c[0] + GN[0] * 0.09, c[1], c[2] + GN[2] * 0.09], 0.068, 0.068, 12);
        cyl(B.glass, [c[0] + GN[0] * 0.09, c[1], c[2] + GN[2] * 0.09], [c[0] + GN[0] * 0.10, c[1], c[2] + GN[2] * 0.10], 0.056, 0.056, 12);
      }
      bar(B.dark, gpt(GL - 0.36, w - 0.17, cm ? 0.10 : 0.0), gpt(GL - 0.36, w - 0.17, cm ? 0.32 : 0.20), 0.018);
      bar(B.dark, gpt(GL - 0.36, w + 0.17, cm ? 0.10 : 0.0), gpt(GL - 0.36, w + 0.17, cm ? 0.32 : 0.20), 0.018);
      bar(B.dark, gpt(GL - 0.36, w - 0.17, cm ? 0.32 : 0.20), gpt(GL - 0.36, w + 0.17, cm ? 0.32 : 0.20), 0.018);
      /* tow eyes on the lower nose */
      box(B.dark, XN - 0.06, XN + 0.02, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.74, 0.84);
      cylY(B.dark, XN - 0.025, s * 0.62 - 0.065, s * 0.62 + 0.065, 0.79, 0.04, 8);
      /* CM-21: four smoke tubes each side below the lamps, splayed out and up (P3, P4); CM-25: three (CM21 text) */
      if (cm) smokeBank(B.dark, gpt(GL - 0.62, s * 1.04, 0.16), unit([0.70, s * 0.55, 0.45]), s, V.smoke);
    }
    box(B.dark, XN - 0.005, XN + 0.012, -HW + 0.05, HW - 0.05, 0.955, 0.975);
  }

  /* the roof: driver's hatch front LEFT, the engine grille front RIGHT, the cargo hatch, the aerial (us_m113.js) */
  function roof113(B, V) {
    var k, a, s, rw = V.kind === "m113" ? HW : CMF.w2;
    cylZ(B.paint, 1.12, 0.62, ROOF - 0.01, ROOF + 0.08, 0.31, 18);
    cylZ(B.paint, 1.08, 0.62, ROOF + 0.08, ROOF + 0.12, 0.25, 16);
    box(B.dark, 0.80, 0.88, 0.50, 0.74, ROOF + 0.05, ROOF + 0.12);
    for (k = 0; k < 4; k++) {
      a = -0.9 + k * 0.6;
      rbox(B.glass, 1.12 + Math.cos(a) * 0.30, 0.62 + Math.sin(a) * 0.30, 0.025, 0.06, a, ROOF + 0.06, ROOF + 0.14);
    }
    box(B.paint, 0.98, 1.46, -1.08, -0.10, ROOF - 0.01, ROOF + 0.02);
    box(B.dark, 1.04, 1.40, -1.02, -0.62, ROOF + 0.02, ROOF + 0.035);
    for (k = 0; k < 6; k++) box(B.paint, 1.07 + k * 0.055, 1.095 + k * 0.055, -1.02, -0.62, ROOF + 0.035, ROOF + 0.05);
    box(B.dark, 0.99, 1.03, -1.00, -0.20, ROOF + 0.02, ROOF + 0.04);
    /* team colour: a strip along each roof edge, facing up */
    for (s = -1; s <= 1; s += 2) box(B.team, -1.90, -0.20, s > 0 ? rw - 0.17 : -rw + 0.04, s > 0 ? rw - 0.04 : -rw + 0.17, ROOF, ROOF + 0.012);
    /* the cargo hatch: one lid hinged at its rear edge */
    box(B.paint, -2.28, -0.78, -0.80, 0.80, ROOF - 0.01, ROOF + 0.035);
    box(B.dark, -2.30, -0.76, -0.82, -0.80, ROOF, ROOF + 0.03);
    box(B.dark, -2.30, -0.76, 0.80, 0.82, ROOF, ROOF + 0.03);
    box(B.dark, -0.78, -0.76, -0.82, 0.82, ROOF, ROOF + 0.03);
    for (k = -1; k <= 1; k += 2) box(B.dark, -2.32, -2.18, k * 0.55 - 0.10, k * 0.55 + 0.10, ROOF, ROOF + 0.07);
    cylZ(B.dark, -2.18, rw - 0.16, ROOF, ROOF + 0.12, 0.05, 8);
    cylZ(B.dark, -2.18, rw - 0.16, ROOF + 0.12, ROOF + 1.60, 0.010, 4);
  }

  /* the tail: the ramp, its inset door, hinges, lamps, pintle (us_m113.js); on the CM-21 and CM-25 the lamps are
     on the rear faces of the fuel tanks, which stand where the M113's lamp boxes are */
  function tail113(B, V) {
    var s, k;
    box(B.paint, XR - 0.035, XR, -0.92, 0.92, 0.60, 1.80);
    box(B.dark, XR - 0.045, XR - 0.035, 0.12, 0.76, 0.72, 1.66);
    box(B.paint, XR - 0.055, XR - 0.045, 0.16, 0.72, 0.76, 1.62);
    box(B.dark, XR - 0.07, XR - 0.04, 0.22, 0.32, 1.16, 1.22);
    for (k = 0; k < 3; k++) box(B.dark, XR - 0.06, XR + 0.0, -0.78 + k * 0.70, -0.62 + k * 0.70, 0.55, 0.64);
    for (s = -1; s <= 1; s += 2) {
      if (V.kind === "m113") {
        box(B.dark, XR - 0.06, XR, s * (HW - 0.20) - 0.10, s * (HW - 0.20) + 0.10, 1.60, 1.78);
        cylX(B.glass, XR - 0.065, XR - 0.06, s * (HW - 0.20) - 0.045, 1.69, 0.035, 8);
        cylX(B.glass, XR - 0.065, XR - 0.06, s * (HW - 0.20) + 0.045, 1.69, 0.035, 8);
        box(B.dark, XR - 0.10, XR, s * 1.02 - 0.05, s * 1.02 + 0.05, 0.62, 0.72);
      }
    }
    box(B.dark, XR - 0.06, XR, -0.07, 0.07, 0.50, 0.60);
    cylZ(B.dark, XR - 0.02, 0, 0.60, 0.66, 0.035, 8);
  }

  /* CM-21 / CM-25 plates and fittings that the M113 has not got */
  var XT = -3.02;       /* the rear end of the external fuel tanks (header: 0.65 m behind the rear plate) */
  function cmPlates(B, V) {
    var P = B.paint, D = B.dark, G = B.glass, s, k, F, x;
    for (s = -1; s <= 1; s += 2) {
      /* the external fuel tanks either side of the ramp (P1, P2, P5): flat top, vertical rear face, the lower
         rear corner cut back; the round filler plate on the outer face; the tail lamps on the rear face */
      profY(P, [[XR + 0.05, 1.67], [XT, 1.67], [XT, 1.06], [XT + 0.45, 0.78], [XR + 0.05, 0.78]],
            s > 0 ? 0.95 : -1.30, s > 0 ? 1.30 : -0.95);
      cylY(D, XT + 0.33, s * 1.30, s * 1.315, 1.36, 0.14, 16);
      cylY(P, XT + 0.33, s * 1.315, s * 1.322, 1.36, 0.11, 16);
      box(D, XT - 0.05, XT, s * 1.12 - 0.08, s * 1.12 + 0.08, 1.46, 1.60);
      cylX(G, XT - 0.055, XT - 0.05, s * 1.12, 1.53, 0.04, 8);
      box(D, XT - 0.02, XT + 0.02, s > 0 ? 0.95 : -1.30, s > 0 ? 1.30 : -0.95, 1.665, 1.68);
      /* the vision blocks and the two port covers on the steep upper plate of the troop compartment (P1, P2) */
      if (V.rearPorts) {
        F = sideFrame(s, CMR.w1, CMR.zk, CMR.w2, ROOF);
        for (k = 0; k < 2; k++) {
          x = k ? -1.84 : -1.42;
          onSide(D, F, x - 0.13, x + 0.13, 0.36, 0.44, 0.003, 0.03);
          onSide(G, F, x - 0.10, x + 0.10, 0.375, 0.425, 0.03, 0.035);
          onSide(D, F, x - 0.09, x + 0.07, 0.12, 0.24, 0.003, 0.025);
        }
      }
    }
    /* the tubular hoop on the roof, left of the cargo hatch's front (P1, P2, P4; on the CM-25 by the pedestal, P6) */
    var hx = V.rearPorts ? -0.70 : -0.40, hy = 0.62;
    bar(D, [hx, hy, ROOF], [hx - 0.04, hy, ROOF + 0.30], 0.035);
    bar(D, [hx - 0.04, hy, ROOF + 0.30], [hx - 0.30, hy, ROOF + 0.30], 0.035);
    bar(D, [hx - 0.30, hy, ROOF + 0.30], [hx - 0.34, hy, ROOF], 0.035);
  }

  /* the commander's cupola (us_m113.js): a low ring with vision blocks and its hatch cover; origin on its centre */
  function cupola(P, D, G, ox, oy, oz, lid) {
    var k, a;
    cylZ(P, ox, oy, oz - 0.01, oz + 0.16, 0.40, 22);
    cylZ(D, ox, oy, oz + 0.16, oz + 0.18, 0.34, 20);
    for (k = 0; k < 5; k++) {
      a = -1.4 + k * 0.7;
      rbox(G, ox + Math.cos(a) * 0.395, oy + Math.sin(a) * 0.395, 0.012, 0.07, a, oz + 0.06, oz + 0.13);
    }
    if (!lid) cylZ(P, ox - 0.30, oy, oz + 0.16, oz + 0.19, 0.12, 10);
    else {
      /* the CM-21's round hatch lid standing open, upright behind the gun (P1, P3, P4) */
      cyl(P, [ox - 0.36, oy, oz + 0.46], [ox - 0.40, oy, oz + 0.46], 0.30, 0.30, 20);
      box(D, ox - 0.40, ox - 0.33, oy - 0.08, oy + 0.08, oz + 0.12, oz + 0.20);
    }
  }
  /* the M220 TOW on its pedestal in the turret frame (us_m113.js towLauncher, moved to the pedestal's own origin;
     on the CM-25 the pedestal stands 0.62 m: P5, P6), tube level along +X */
  function towTurret(TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, Z = 0.62;
    cylZ(D, 0, 0, 0, 0.05, 0.24, 12);
    cylZ(D, 0, 0, 0.05, Z - 0.20, 0.09, 12);
    box(P, -0.14, 0.14, -0.12, 0.12, Z - 0.22, Z - 0.10);
    box(D, -0.20, 0.20, -0.09, 0.09, Z - 0.12, Z - 0.06);
    cylX(P, -0.62, 0.92, 0, Z, 0.11, 16);
    cylX(P, 0.80, 0.94, 0, Z, 0.125, 16);
    cylX(P, -0.66, -0.52, 0, Z, 0.13, 16);
    cylX(D, 0.94, 0.95, 0, Z, 0.10, 14);
    box(P, -0.06, 0.30, 0.13, 0.30, Z - 0.10, Z + 0.10);
    box(G, 0.30, 0.31, 0.16, 0.27, Z - 0.05, Z + 0.07);
  }

  /* VARIANTS of this hull */
  var V113 = {
    m113a1: { kind: "m113", paint: "od" },
    cm21:   { kind: "cm21", paint: "roc", rearPorts: true, smoke: 4 },
    cm25:   { kind: "cm25", paint: "roc", rearPorts: false, smoke: 3 }
  };
  var CUP = { x: 0.55, y: -0.32 };          /* the M113A1 commander's cupola (us_m113.js) */
  var CUPC = { x: 0.45, y: -0.12 };         /* the CM-21's (P1: x; P3: just right of the centre line) */
  var TOWP = { x: -0.92, y: 0.0 };          /* the CM-25 TOW pedestal (P5) */
  function build113(THREE, C, which) {
    var V = V113[which], T = materials(THREE, C, PAINT[V.paint]), g = new THREE.Group(), HBn = bins(T), i, wg, tg, TB, pos;
    hull113(HBn, V);
    if (V.kind === "cm25") {
      cupola(HBn.paint, HBn.dark, HBn.glass, CUPC.x, CUPC.y, ROOF, false);
      m2gun(HBn.dark, CUPC.x + 0.10, CUPC.y, ROOF + 0.42);
    }
    var hg = new THREE.Group(); hg.name = "hull";
    flush(THREE, hg, HBn);
    g.add(hg);
    pos = XW.map(function (x) { return [x, ZW, 0]; }).concat([[SPR.x, SPR.z, 1], [IDL.x, IDL.z, 2]]);
    for (i = 0; i < pos.length; i++) {
      var WB = { w: new Bin(pos[i][2] === 1 ? T.dark : T.paint, pos[i][2] !== 1) };
      if (pos[i][2] === 0) wheelDiscs(WB.w); else if (pos[i][2] === 1) sprocketDiscs(WB.w); else idlerDiscs(WB.w);
      wg = group(THREE, "roadwheel", pos[i][0], 0, pos[i][1]);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false) };
    if (V.kind === "m113") {
      /* the M113A1's commander's station as us_m113.js draws it on the TOW build: cupola and M2, no shield */
      cupola(TB.paint, TB.dark, TB.glass, 0, 0, 0, false);
      m2gun(TB.dark, 0.10, 0, 0.50);
      tg = group(THREE, "turret", CUP.x, CUP.y, ROOF);
    } else if (V.kind === "cm21") {
      cupola(TB.paint, TB.dark, TB.glass, 0, 0, 0, true);
      m2gun(TB.dark, 0.10, 0, 0.42);
      tg = group(THREE, "turret", CUPC.x, CUPC.y, ROOF);
    } else {
      towTurret(TB);
      tg = group(THREE, "turret", TOWP.x, TOWP.y, ROOF);
    }
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  /* ================================================================ V-150 Commando (ROC Military Police APC) */
  /* scale (header, V-150 SCALE): tyre D = 1.24 m from the published 5.69 m over the measured 4.58 D */
  var VC = { NOSE: 2.845, TAIL: -2.845, AX: [0.985, -1.57], R: 0.62, TY: 0.93, THW: 0.19,
             CZ: 1.40, CW: 1.13, RZ: 1.92, RWD: 0.72, MG: 0.70 };
  /* half profiles: [belly], [lower knee], [chine underside], [chine], [roof edge] */
  function vSec(zb, bw, lz, lw, cz, cw, rz, rw) { return [[bw, zb], [lw, lz], [cw, cz - 0.03], [cw, cz], [rw, rz]]; }
  var VST = [
    [2.845, vSec(1.30, 0.80, 1.33, 0.95, 1.40, 1.04, 1.42, 1.02)],      /* the nose edge */
    [2.55,  vSec(1.05, 0.72, 1.18, 0.90, 1.40, 1.08, 1.47, 0.98)],
    [1.97,  vSec(0.69, 0.55, 1.10, 0.88, 1.40, 1.13, 1.58, 0.92)],      /* foot of the lower nose plate (P11) */
    [1.60,  vSec(0.62, 0.48, 1.22, 0.66, 1.40, 1.13, 1.62, 0.88)],      /* front wheel well; the deck meets the front plate */
    [1.15,  vSec(0.60, 0.45, 1.22, 0.66, 1.40, 1.13, 1.92, 0.72)],      /* the front plate meets the roof */
    [0.30,  vSec(0.60, 0.45, 1.22, 0.66, 1.40, 1.13, 1.92, 0.72)],
    [0.12,  vSec(0.60, 0.45, 0.95, 0.95, 1.40, 1.13, 1.92, 0.72)],      /* between the wheels the lower side bulges out */
    [-0.70, vSec(0.60, 0.45, 0.95, 0.95, 1.40, 1.13, 1.92, 0.72)],
    [-0.88, vSec(0.60, 0.45, 1.22, 0.66, 1.40, 1.13, 1.92, 0.72)],      /* rear wheel well */
    [-2.10, vSec(0.62, 0.48, 1.22, 0.66, 1.40, 1.13, 1.92, 0.72)],
    [-2.40, vSec(0.72, 0.55, 1.15, 0.85, 1.40, 1.12, 1.80, 0.80)],
    [-2.845, vSec(1.30, 0.80, 1.33, 0.95, 1.40, 1.02, 1.62, 0.90)]      /* the tail edge, the rear plate sloping above it */
  ];
  function vFrame(s) { return sideFrame(s, VC.CW, VC.CZ, VC.RWD, VC.RZ); }
  function v150Hull(B) {
    var P = B.paint, D = B.dark, G = B.glass, s, k, F, x, y;
    loftHalf(P, VST);
    /* the chine edge strip */
    for (s = -1; s <= 1; s += 2) {
      box(D, -2.70, 2.70, s > 0 ? VC.CW - 0.01 : -VC.CW - 0.012, s > 0 ? VC.CW + 0.012 : -VC.CW + 0.01, VC.CZ - 0.035, VC.CZ - 0.02);
      F = vFrame(s);
      /* the side door between the axles, its upper leaf on the upper plate with a vision block (P11, P14) */
      onSide(D, F, -0.62, 0.05, 0.02, 0.62, 0.008, 0.025);
      onSide(P, F, -0.59, 0.02, 0.05, 0.59, 0.025, 0.04);
      onSide(G, F, -0.40, -0.18, 0.42, 0.50, 0.04, 0.06);
      box(D, -0.60, 0.04, s > 0 ? 0.94 : -0.965, s > 0 ? 0.965 : -0.94, 1.00, 1.34);
      /* the hatch over the rear wheel (P11) and the vision blocks ahead of the door (P12, P14) */
      onSide(D, F, -2.10, -1.30, 0.10, 0.52, 0.008, 0.03);
      onSide(G, F, 0.45, 0.75, 0.40, 0.48, 0.008, 0.04);
      /* rear corner tail lamps in their cups (P15) */
      cylX(D, -2.86, -2.72, s * 0.80, 1.52, 0.09, 12);
      cylX(G, -2.87, -2.86, s * 0.80, 1.52, 0.06, 10);
    }
    /* the front plate's vision blocks (P10, P12): three across */
    for (k = -1; k <= 1; k++) {
      y = k * 0.42;
      x = 1.38;
      box(D, x - 0.04, x + 0.10, y - 0.15, y + 0.15, 1.72, 1.82);
      box(G, x + 0.06, x + 0.12, y - 0.12, y + 0.12, 1.74, 1.80);
    }
    /* the deck: headlamps in hoop guards at the front corners, the tow shackles and the stowed tow chain, the
       mirrors on posts (P10, P12, P13) */
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.78;
      lamp(B, 2.40, y - 0.08, 1.56, 0.07); lamp(B, 2.40, y + 0.08, 1.56, 0.07);
      box(D, 2.22, 2.32, y - 0.16, y + 0.16, 1.46, 1.62);
      bar(D, [2.20, y - 0.18, 1.48], [2.46, y - 0.18, 1.70], 0.02);
      bar(D, [2.20, y + 0.18, 1.48], [2.46, y + 0.18, 1.70], 0.02);
      bar(D, [2.46, y - 0.18, 1.70], [2.46, y + 0.18, 1.70], 0.02);
      box(D, 2.80, 2.86, s * 0.42 - 0.04, s * 0.42 + 0.04, 1.10, 1.24);
      bar(D, [1.95, s * 0.98, 1.47], [2.05, s * 1.06, 1.90], 0.025);
      cyl(D, [2.05, s * 1.06, 1.98], [2.07, s * 1.06, 1.98], 0.11, 0.11, 14);
    }
    box(D, 2.70, 2.86, -0.30, -0.10, 1.32, 1.40);
    /* the rear deck: the raised box over the engine (P15), the two jerrycans on the rear plate */
    box(P, -2.62, -2.08, -0.80, 0.12, 1.85, 2.12);
    box(D, -2.63, -2.07, -0.81, 0.13, 2.12, 2.13);
    for (k = 0; k < 2; k++) {
      y = -0.55 + k * 0.32;
      box(P, -2.86, -2.70, y - 0.12, y + 0.12, 1.20, 1.62);
    }
    /* the roof: the troop hatches behind the gun ring, the aerial at the left rear */
    box(P, -1.70, -0.30, -0.50, 0.50, VC.RZ - 0.01, VC.RZ + 0.03);
    box(D, -1.72, -0.28, -0.52, -0.50, VC.RZ, VC.RZ + 0.03);
    box(D, -1.72, -0.28, 0.50, 0.52, VC.RZ, VC.RZ + 0.03);
    box(D, -1.01, -0.99, -0.50, 0.50, VC.RZ + 0.03, VC.RZ + 0.04);
    cylZ(D, -1.95, 0.55, VC.RZ, VC.RZ + 0.10, 0.045, 8);
    cylZ(D, -1.95, 0.55, VC.RZ + 0.10, VC.RZ + 1.50, 0.010, 4);
    /* team colour along the roof edges */
    for (s = -1; s <= 1; s += 2) box(B.team, -2.0, -0.2, s > 0 ? VC.RWD - 0.14 : -VC.RWD + 0.03, s > 0 ? VC.RWD - 0.03 : -VC.RWD + 0.14, VC.RZ, VC.RZ + 0.012);
  }
  /* the gun ring at the front of the roof with the M2 on its pedestal (P10, P12): origin on the ring centre */
  function v150Turret(TB) {
    var P = TB.paint, D = TB.dark;
    cylZ(P, 0, 0, -0.01, 0.10, 0.42, 22);
    cylZ(D, 0, 0, 0.10, 0.12, 0.36, 20);
    cylZ(P, -0.20, 0, 0.12, 0.15, 0.16, 12);
    box(P, -0.05, 0.12, -0.10, 0.10, 0.10, 0.42);
    bar(P, [0.05, 0, 0.42], [0.20, 0, 0.55], 0.10);
    m2gun(D, 0.10, 0, 0.62);
  }
  function buildV150(THREE, C) {
    var T = materials(THREE, C, PAINT.roc), g = new THREE.Group(), B = bins(T), i, wg, tg, TB;
    v150Hull(B);
    var hg = new THREE.Group(); hg.name = "hull"; flush(THREE, hg, B); g.add(hg);
    for (i = 0; i < VC.AX.length; i++) {
      var WB = { tyre: new Bin(T.tyre, false), paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
      tyrePair(WB.tyre, WB.paint, WB.dark, VC.R, VC.TY, VC.THW, 0.30, 26, 10);
      wg = group(THREE, "roadwheel", VC.AX[i], 0, VC.R);
      flush(THREE, wg, WB); g.add(wg);
    }
    TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    v150Turret(TB);
    tg = group(THREE, "turret", VC.MG, 0, VC.RZ);
    flush(THREE, tg, TB); g.add(tg);
    return g;
  }

  /* ================================================================ CM-32 / CM-33 Yunpao 8x8 */
  /* P20 at 220.7 px/m (published 7.0 m over the extreme length; the published 2.23 m height then falls on the roof) */
  var YC = { AX: [2.173, 0.768, -1.090, -2.426], R: 0.55, TY: 1.08, THW: 0.20, BZ: 1.31, BW: 1.35, RZ: 2.23, RWD: 1.24,
             RWS: -0.28 };
  function ySec(zt, belt) {
    /* V belly, lower side under the belt, the belt, the upper side, the roof edge */
    var h = [[0.15, 0.48], [0.60, 0.66], [0.84, 1.15], [1.30, 1.26], [belt, YC.BZ], [YC.RWD + 0.02, YC.RZ - 0.06], [YC.RWD - 0.04, YC.RZ]];
    return clampHalf(h, zt);
  }
  function yTop(x) {
    if (x >= 3.14) return 1.30;
    if (x >= 2.23) return 1.55 + (3.14 - x) / 0.91 * 0.38;
    if (x >= 0.51) return 1.93 + (2.23 - x) / 1.72 * 0.30;
    return YC.RZ;
  }
  function yHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, st = [], s, k, x, y, i, h;
    /* the lower nose: a wedge whose leading edge is at 3.46 m (P20), the lower plate running back under it */
    var nose = [[3.46, [[0.70, 1.05], [0.80, 1.10], [0.95, 1.18], [1.00, 1.22], [1.02, 1.25], [1.02, 1.26], [1.00, 1.27]]],
                [3.30, [[0.60, 0.98], [0.80, 1.06], [1.05, 1.16], [1.20, 1.22], [1.25, 1.27], [1.24, 1.29], [1.20, 1.30]]]];
    for (i = 0; i < nose.length; i++) st.push(nose[i]);
    var xs = [3.141, 3.139, 2.71, 2.55, 2.23, 0.51, -3.10, -3.30, -3.50];
    var zv = [0.90, 0.90, 0.82, 0.55, 0.48, 0.48, 0.48, 0.62, 0.89];
    for (i = 0; i < xs.length; i++) {
      x = xs[i];
      h = ySec(x > 3.14 ? 1.30 : yTop(x), YC.BW);
      if (zv[i] > h[0][1]) {
        for (k = 0; k < 3; k++) h[k][1] = Math.max(h[k][1], zv[i] + k * 0.02);
        for (k = 3; k < h.length; k++) h[k][1] = Math.max(h[k][1], h[k - 1][1]);
      }
      if (x > 3.0) { for (k = 0; k < h.length; k++) h[k][0] = Math.min(h[k][0], 1.26); }
      st.push([x, h]);
    }
    st.sort(function (a, b) { return a[0] - b[0]; });
    loftHalf(P, st);
    for (s = -1; s <= 1; s += 2) {
      /* the belt ledge along the side (P20) */
      box(D, -3.45, 3.10, s > 0 ? YC.BW - 0.01 : -YC.BW - 0.015, s > 0 ? YC.BW + 0.015 : -YC.BW + 0.01, YC.BZ - 0.025, YC.BZ - 0.005);
      /* the wheel-arch rims over each axle pair (P20) */
      for (k = 0; k < 4; k++) {
        x = YC.AX[k];
        box(D, x - 0.70, x + 0.70, s > 0 ? 1.28 : -1.33, s > 0 ? 1.33 : -1.28, 1.20, 1.24);
      }
      /* the joints of the bolted armour panels on the upper side (P20: eight seams) */
      var seams = [2.18, 1.22, 0.35, -0.40, -0.73, -1.75, -2.24, -3.10];
      for (k = 0; k < seams.length; k++) {
        x = seams[k];
        box(D, x - 0.012, x + 0.012, s > 0 ? YC.BW - 0.04 : -YC.BW + 0.03, s > 0 ? YC.BW - 0.03 : -YC.BW + 0.04, YC.BZ + 0.02, yTop(x) - 0.08);
      }
      /* bolt heads along the panels, two rows (P20) */
      for (k = 0; k < 22; k++) {
        x = 2.9 - k * 0.30;
        for (i = 0; i < 2; i++) {
          var zz = i ? 1.48 : Math.min(2.02, yTop(x) - 0.18);
          if (x > 2.6 && i) continue;
          cylY(D, x, s * (YC.BW - 0.02 - (i ? 0 : 0.05)), s * (YC.BW + 0.0 - (i ? 0 : 0.05)), zz, 0.025, 6);
        }
      }
      /* the lamp housings on the nose corners (P20, P21) */
      y = s * 0.88;
      box(D, 3.15, 3.50, y - 0.20, y + 0.20, 1.27, 1.52);
      lamp(B, 3.50, y - 0.08, 1.40, 0.065); lamp(B, 3.50, y + 0.08, 1.40, 0.065);
      box(G, 3.495, 3.505, y + 0.14, y + 0.19, 1.36, 1.44);
      /* tow eyes on the nose and the tail */
      box(D, 3.40, 3.50, s * 0.45 - 0.05, s * 0.45 + 0.05, 1.00, 1.12);
      box(D, -3.53, -3.48, s * 0.70 - 0.05, s * 0.70 + 0.05, 0.92, 1.04);
      /* the mirrors on posts at the front corners (P20, P21) */
      bar(D, [2.55, s * 1.15, 1.80], [2.65, s * 1.32, 2.30], 0.025);
      cyl(D, [2.62, s * 1.34, 2.38], [2.66, s * 1.34, 2.38], 0.11, 0.11, 12);
      /* the rear lamps */
      box(D, -3.53, -3.49, s * 1.05 - 0.10, s * 1.05 + 0.10, 1.85, 2.00);
    }
    /* the driver's raised hatch on the left of the glacis top with its periscopes (P20, P21) */
    box(P, 1.42, 1.78, 0.30, 0.82, yTop(1.6) - 0.05, yTop(1.6) + 0.12);
    for (k = 0; k < 3; k++) box(G, 1.78, 1.80, 0.36 + k * 0.15, 0.46 + k * 0.15, yTop(1.6) + 0.04, yTop(1.6) + 0.10);
    /* the air intake tube rising on the left behind it, and its run back to the roof (P20) */
    cylZ(D, 2.06, 0.95, yTop(2.06) - 0.05, 2.52, 0.045, 10);
    cyl(D, [2.06, 0.95, 2.44], [1.75, 0.95, 2.30], 0.04, 0.04, 8);
    /* the engine deck: the grille panel on the right of the glacis (P21) */
    for (k = 0; k < 7; k++) {
      x = 1.05 + k * 0.13;
      box(D, x, x + 0.07, -1.05, -0.25, yTop(x + 0.035) - 0.005, yTop(x + 0.035) + 0.015);
    }
    /* the roof: two troop hatches over the rear, the box behind the weapon station (P20) */
    for (k = -1; k <= 1; k += 2) {
      box(P, -2.95, -1.95, k > 0 ? 0.15 : -0.95, k > 0 ? 0.95 : -0.15, YC.RZ - 0.01, YC.RZ + 0.04);
      box(D, -2.97, -1.93, k > 0 ? 0.13 : -0.97, k > 0 ? 0.15 : -0.95, YC.RZ, YC.RZ + 0.035);
      box(D, -2.97, -1.93, k > 0 ? 0.95 : -0.97, k > 0 ? 0.97 : -0.95, YC.RZ, YC.RZ + 0.035);
    }
    box(P, -1.28, -0.69, -0.45, 0.10, YC.RZ - 0.01, YC.RZ + 0.41);
    box(D, -1.29, -0.68, -0.46, 0.11, YC.RZ + 0.41, YC.RZ + 0.42);
    /* the rear ramp's outline and hinges on the rear plate */
    box(D, -3.515, -3.50, -0.72, 0.72, 0.95, 1.00);
    box(D, -3.515, -3.50, -0.72, -0.68, 1.00, 2.05);
    box(D, -3.515, -3.50, 0.68, 0.72, 1.00, 2.05);
    box(D, -3.515, -3.50, -0.72, 0.72, 2.05, 2.09);
    /* team colour along the roof edges */
    for (s = -1; s <= 1; s += 2) box(B.team, -3.2, -1.5, s > 0 ? YC.RWD - 0.20 : -YC.RWD + 0.06, s > 0 ? YC.RWD - 0.06 : -YC.RWD + 0.20, YC.RZ, YC.RZ + 0.012);
  }
  /* the remote weapon station (P20, P21): a low base on its ring, the cradle with the 40 mm grenade launcher
     and the 7.62 mm machine gun above it, the sight box, a bank of four smoke tubes each side; origin on the ring */
  function yRws(TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, s;
    cylZ(D, 0, 0, 0, 0.06, 0.40, 20);
    box(D, -0.30, 0.26, -0.28, 0.28, 0.06, 0.34);
    box(D, -0.18, 0.16, -0.20, 0.20, 0.34, 0.40);
    /* the cradle */
    box(D, -0.22, 0.30, -0.14, 0.14, 0.40, 0.60);
    /* the 40 mm grenade launcher: the heavy receiver, the short thick barrel */
    box(D, -0.15, 0.25, -0.10, 0.08, 0.42, 0.58);
    cylX(D, 0.25, 0.62, -0.01, 0.50, 0.045, 10);
    cylX(D, 0.55, 0.63, -0.01, 0.50, 0.055, 10);
    /* the 7.62 mm above it, its butt behind the station */
    lightMG(D, -0.35, 0.06, 0.66, 0.95);
    box(D, -0.62, -0.35, 0.04, 0.08, 0.60, 0.66);
    /* the sight box on the left of the cradle */
    box(D, -0.10, 0.22, 0.15, 0.30, 0.42, 0.60);
    box(G, 0.22, 0.225, 0.18, 0.27, 0.48, 0.56);
    for (s = -1; s <= 1; s += 2) smokeBank(D, [0.20, s * 0.34, 0.16], unit([0.85, s * 0.30, 0.42]), s, 4);
  }
  function buildYunpao(THREE, C) {
    var T = materials(THREE, C, PAINT.cm32), g = new THREE.Group(), B = bins(T), i, wg, tg, TB;
    yHull(B);
    var hg = new THREE.Group(); hg.name = "hull"; flush(THREE, hg, B); g.add(hg);
    for (i = 0; i < YC.AX.length; i++) {
      var WB = { tyre: new Bin(T.tyre, false), paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
      tyrePair(WB.tyre, WB.paint, WB.dark, YC.R, YC.TY, YC.THW, 0.27, 26, 10);
      wg = group(THREE, "roadwheel", YC.AX[i], 0, YC.R);
      flush(THREE, wg, WB); g.add(wg);
    }
    TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false) };
    yRws(TB);
    tg = group(THREE, "turret", YC.RWS, 0, YC.RZ);
    flush(THREE, tg, TB); g.add(tg);
    return g;
  }

  /* ================================================================ M3A1 half-track and M16 MGMC */
  /* stations (header, HALF-TRACK LAYOUT): the published 6.17 m with the roller and the 135.5 in wheelbase; the
     rest in front-tyre diameters from P30/P31/P32 (tyre 0.98 m) */
  var HT = { FRONT: 3.085, REAR: -3.085, AXF: 1.935, RF: 0.49, TYF: 0.81, THF: 0.12,
             SPR: { x: -0.655, z: 0.53, r: 0.25 }, IDL: { x: -2.355, z: 0.52, r: 0.26 },
             BOG: [-1.05, -1.30, -1.71, -1.96], RB: 0.12, TYC: 0.82, THW: 0.155,
             BZ0: 0.85, BZ1: 1.85, BW: 1.00, CAB: 0.92, HOODF: 2.52 };
  /* a closed rope round circles given in order (CCW seen from +Y), sampled every 7.6 cm (trackPath, generalised) */
  function loopPath(C) {
    var p = [], i, A, B, d, L, rp, ph, n, a0, a1, da, s, m, T = [];
    for (i = 0; i < C.length; i++) {
      A = C[i]; B = C[(i + 1) % C.length];
      d = [B.x - A.x, B.z - A.z]; L = Math.sqrt(d[0] * d[0] + d[1] * d[1]); d = [d[0] / L, d[1] / L];
      rp = [d[1], -d[0]];
      ph = Math.asin((A.r - B.r) / L);
      n = [rp[0] * Math.cos(ph) + d[0] * Math.sin(ph), rp[1] * Math.cos(ph) + d[1] * Math.sin(ph)];
      T.push({ n: n, a: [A.x + A.r * n[0], A.z + A.r * n[1]], b: [B.x + B.r * n[0], B.z + B.r * n[1]] });
    }
    function line(P, Q) {
      var l = Math.sqrt((Q[0] - P[0]) * (Q[0] - P[0]) + (Q[1] - P[1]) * (Q[1] - P[1])), j, nn = Math.max(1, Math.round(l / 0.076));
      for (j = 1; j <= nn; j++) p.push([P[0] + (Q[0] - P[0]) * j / nn, P[1] + (Q[1] - P[1]) * j / nn]);
    }
    for (i = 0; i < C.length; i++) {
      var tin = T[(i + C.length - 1) % C.length], tout = T[i], c = C[i];
      a0 = Math.atan2(tin.n[1], tin.n[0]); a1 = Math.atan2(tout.n[1], tout.n[0]);
      da = a1 - a0;
      while (da > Math.PI) da -= TAU;
      while (da < -Math.PI) da += TAU;
      m = Math.max(1, Math.round(Math.abs(da) * c.r / 0.076));
      for (s = 0; s <= m; s++) p.push([c.x + c.r * Math.cos(a0 + da * s / m), c.z + c.r * Math.sin(a0 + da * s / m)]);
      line(tout.a, tout.b);
      p.pop();
    }
    return p;
  }
  function htTrack(B) {
    var C = [], k, s, path;
    /* under the bogie wheels front to back, round the idler, over the top roller, round the sprocket */
    for (k = 0; k < HT.BOG.length; k++) C.push({ x: HT.BOG[k], z: HT.RB + 0.035, r: HT.RB });
    C.push({ x: HT.IDL.x, z: HT.IDL.z, r: HT.IDL.r + 0.01 });
    C.push({ x: -1.505, z: 0.72, r: 0.07 });
    C.push({ x: HT.SPR.x, z: HT.SPR.z, r: HT.SPR.r + 0.01 });
    C.reverse();
    path = loopPath(C);
    for (s = -1; s <= 1; s += 2) belt(B.dark, path, s * HT.TYC - HT.THW, s * HT.TYC + HT.THW);
    for (s = -1; s <= 1; s += 2) {
      /* the bogie frame and its volute spring housing, the support roller, the idler arm (P31, P31) */
      box(B.paint, -2.02, -0.98, s > 0 ? 0.60 : -0.66, s > 0 ? 0.66 : -0.60, 0.16, 0.40);
      box(B.paint, -1.62, -1.38, s > 0 ? 0.58 : -0.70, s > 0 ? 0.70 : -0.58, 0.30, 0.62);
      cylY(B.dark, -1.505, s * 0.60, s * (HT.TYC - 0.05), 0.72, 0.07, 10);
      bar(B.dark, [HT.IDL.x, s * 0.62, HT.IDL.z], [HT.IDL.x + 0.45, s * 0.62, 0.30], 0.08);
      bar(B.dark, [HT.SPR.x, s * 0.62, HT.SPR.z], [HT.SPR.x - 0.40, s * 0.62, 0.30], 0.08);
      cylY(B.dark, HT.SPR.x, s * 0.50, s * (HT.TYC - 0.10), HT.SPR.z, 0.10, 10);
    }
  }
  /* the sprocket: a spoked drum with its teeth; the idler: a spoked wheel; a bogie station: two pairs of small
     rubber-tyred wheels each side (P31, P31) */
  function htSprocket(bin, r, teeth) {
    var s, k, a, y;
    for (s = -1; s <= 1; s += 2) {
      y = s * HT.TYC;
      if (teeth) gear(bin, 0, y - 0.03, y + 0.03, 0, r - 0.04, r + 0.03, 16);
      cylY(bin, 0, y - 0.13, y - 0.10, 0, r - 0.02, 18);
      cylY(bin, 0, y + 0.10, y + 0.13, 0, r - 0.02, 18);
      cylY(bin, 0, y - 0.15, y + 0.15, 0, 0.09, 10);
      for (k = 0; k < 8; k++) {
        a = k / 8 * TAU;
        bar(bin, [Math.cos(a) * 0.08, y + s * 0.13, Math.sin(a) * 0.08], [Math.cos(a) * (r - 0.04), y + s * 0.13, Math.sin(a) * (r - 0.04)], 0.035);
      }
    }
  }
  function htBogieWheel(bin, tb) {
    var s, side, y;
    for (s = -1; s <= 1; s += 2) for (side = -1; side <= 1; side += 2) {
      y = s * HT.TYC + side * 0.075;
      cylY(tb, 0, y - 0.06, y + 0.06, 0, HT.RB, 14);
      cylY(bin, 0, y + side * 0.06, y + side * 0.075, 0, HT.RB * 0.6, 10);
    }
  }
  /* the open armoured body: thin plates so the troop space shows from above */
  function htBody(B, V) {
    var P = B.paint, D = B.dark, G = B.glass, s, k, x, y, wallTop = V.m16 ? 1.45 : HT.BZ1, t = 0.012;
    /* the frame rails and the front axle beam */
    for (s = -1; s <= 1; s += 2) box(D, -2.95, 2.85, s * 0.45 - 0.06, s * 0.45 + 0.06, 0.55, 0.72);
    box(D, HT.AXF - 0.07, HT.AXF + 0.07, -0.72, 0.72, HT.RF - 0.05, HT.RF + 0.05);
    cylZ(D, HT.AXF, 0, HT.RF - 0.14, HT.RF + 0.06, 0.16, 12);
    /* the floor of the rear body and the cab */
    box(P, HT.REAR, HT.CAB, -HT.BW + t, HT.BW - t, HT.BZ0, HT.BZ0 + 0.12);
    for (s = -1; s <= 1; s += 2) {
      y = s > 0 ? HT.BW - t : -HT.BW;
      /* the body side: cab door to the rear corner; on the M16 the rear part only to 1.45 m with the
         upper flaps folded down outside it (P34) */
      box(P, -0.20, HT.CAB, y, y + t, HT.BZ0, HT.BZ1);
      box(P, HT.REAR, -0.20, y, y + t, HT.BZ0, wallTop);
      if (V.m16) {
        box(P, HT.REAR + 0.05, -0.25, s > 0 ? HT.BW : -HT.BW - 0.012, s > 0 ? HT.BW + 0.012 : -HT.BW, 1.05, 1.43);
        for (k = 0; k < 4; k++) box(D, -2.9 + k * 0.85, -2.82 + k * 0.85, s > 0 ? HT.BW + 0.012 : -HT.BW - 0.02, s > 0 ? HT.BW + 0.02 : -HT.BW - 0.012, 1.38, 1.46);
      }
      /* the cab door outline and its vision flap (P30, P32) */
      box(D, 0.12, 0.88, s > 0 ? HT.BW : -HT.BW - 0.008, s > 0 ? HT.BW + 0.008 : -HT.BW, 1.00, 1.03);
      box(D, 0.10, 0.13, s > 0 ? HT.BW : -HT.BW - 0.008, s > 0 ? HT.BW + 0.008 : -HT.BW, 1.00, 1.84);
      box(D, 0.30, 0.70, s > 0 ? HT.BW : -HT.BW - 0.008, s > 0 ? HT.BW + 0.008 : -HT.BW, 1.55, 1.62);
      /* the troop benches along the sides (P31 interior) */
      if (!V.m16) box(P, -2.95, -0.25, s > 0 ? HT.BW - 0.45 : -HT.BW + t, s > 0 ? HT.BW - t : -HT.BW + 0.45, HT.BZ0 + 0.12, 1.30);
      /* the stowage rail along the outside of the body (P31) */
      box(D, -2.95, -0.30, s > 0 ? HT.BW + t : -HT.BW - 0.05, s > 0 ? HT.BW + 0.05 : -HT.BW - t, V.m16 ? 1.00 : 1.30, V.m16 ? 1.03 : 1.33);
      /* the front fender: the mudguard arching over the tyre, the step behind it (P30, P32) */
      profY(P, [[2.62, 0.95], [2.45, 1.12], [2.10, 1.17], [1.70, 1.15], [1.35, 1.02], [1.05, 0.80], [0.92, 0.80],
                [0.92, 0.86], [1.30, 1.08], [1.70, 1.21], [2.10, 1.23], [2.48, 1.17], [2.66, 0.98]],
            s > 0 ? 0.70 : -1.11, s > 0 ? 1.11 : -0.70);
      box(P, 0.20, 0.92, s > 0 ? HT.BW : -1.11, s > 0 ? 1.11 : -HT.BW, 0.81, 0.85);
      /* headlamps on the front corners in their guards (P30, P32) */
      lamp(B, 2.66, s * 0.82, 1.24, 0.08);
      cylZ(D, 2.58, s * 0.82, 1.10, 1.17, 0.025, 6);
    }
    /* the rear plate with its door (P31) */
    box(P, HT.REAR, HT.REAR + t, -HT.BW, HT.BW, HT.BZ0, wallTop);
    box(D, HT.REAR - 0.008, HT.REAR, -0.35, 0.35, HT.BZ0 + 0.05, wallTop - 0.08);
    for (s = -1; s <= 1; s += 2) {
      box(D, HT.REAR - 0.02, HT.REAR, s * 0.80 - 0.08, s * 0.80 + 0.08, 0.95, 1.05);
      box(G, HT.REAR - 0.025, HT.REAR - 0.02, s * 0.80 - 0.04, s * 0.80 + 0.04, 0.97, 1.03);
    }
    /* the bulkhead behind the cab, high, on the M16 (P34) */
    if (V.m16) box(P, -0.22, -0.20, -HT.BW, HT.BW, HT.BZ0, HT.BZ1);
    /* the armoured windscreen shutter, upright, with its two vision slits (P30, P32) */
    box(P, HT.CAB - 0.02, HT.CAB, -HT.BW, HT.BW, 1.55, 1.97);
    for (s = -1; s <= 1; s += 2) box(D, HT.CAB, HT.CAB + 0.006, s * 0.45 - 0.22, s * 0.45 + 0.22, 1.80, 1.84);
    box(G, HT.CAB - 0.05, HT.CAB - 0.03, -0.92, 0.92, 1.58, 1.78);
    /* the bonnet: the armoured louvre plate in front, the sloped side plates, the top plate rising to the screen */
    var hood = [[[0.62, 0.80], [0.66, 1.00], [0.54, 1.42]], [[0.66, 0.80], [0.70, 1.00], [0.56, 1.52]], [[0.70, 0.80], [0.74, 1.00], [0.60, 1.60]]];
    loftHalf(P, [[HT.HOODF, hood[0]], [1.80, hood[1]], [HT.CAB, hood[2]]]);
    for (k = 0; k < 6; k++) {
      var zl = 0.88 + k * 0.09;
      box(D, HT.HOODF - 0.005, HT.HOODF + 0.035, -0.50, 0.50, zl, zl + 0.04);
    }
    /* the bumper and, on the M3A1, the unditching roller; on the M16 the winch drum, further out (P30, P34) */
    box(D, 2.62, 2.90, -1.00, 1.00, 0.55, 0.74);
    if (!V.m16) {
      cylY(P, 2.94, -0.50, 0.50, 0.66, 0.15, 16);
      for (s = -1; s <= 1; s += 2) box(D, 2.80, 3.09, s * 0.54 - 0.03, s * 0.54 + 0.03, 0.52, 0.80);
    } else {
      cylY(D, 3.10, -0.45, 0.45, 0.66, 0.16, 16);
      cylY(P, 3.10, -0.30, 0.30, 0.66, 0.19, 16);
      for (s = -1; s <= 1; s += 2) box(P, 2.80, 3.42, s * 0.50 - 0.04, s * 0.50 + 0.04, 0.48, 0.86);
    }
    /* team colour along the body sides' top edges (on the M3A1) or the folded flaps (M16) */
    for (s = -1; s <= 1; s += 2) box(B.team, -2.80, -0.60, s > 0 ? HT.BW - 0.03 : -HT.BW - 0.01, s > 0 ? HT.BW + 0.01 : -HT.BW + 0.03, wallTop, wallTop + 0.012);
    htTrack(B);
  }
  /* the M3A1 pulpit: the armoured box on posts over the commander's seat, front right (P30, P31, P31) */
  var PUL = { x: 0.50, y: -0.58, z: 2.22 };
  function htPulpit(B) {
    var P = B.paint, D = B.dark, x0 = PUL.x - 0.38, x1 = PUL.x + 0.38, y0 = PUL.y - 0.40, y1 = PUL.y + 0.40, z0 = 1.92, z1 = 2.22, t = 0.012;
    box(P, x0, x1, y0, y0 + t, z0, z1); box(P, x0, x1, y1 - t, y1, z0, z1);
    box(P, x1 - t, x1, y0, y1, z0, z1); box(P, x0, x0 + t, y0, y1, z0, z1);
    var k;
    for (k = 0; k < 4; k++) cylZ(D, k < 2 ? x0 + 0.05 : x1 - 0.05, k % 2 ? y0 + 0.05 : y1 - 0.05, HT.BZ0 + 0.12, z0, 0.03, 6);
    cylZ(D, PUL.x, PUL.y, z1 - 0.02, z1 + 0.02, 0.36, 18);
  }
  function htPulpitGun(TB) {
    var D = TB.dark;
    box(D, -0.40, -0.30, -0.04, 0.04, 0.0, 0.12);
    m2gun(D, -0.25, 0, 0.26);
  }
  /* the M45 quadruple mount (P34, P35): pedestal, the gunner's armoured shield in front, two M2s each side,
     stacked, the four ammunition chests outboard; origin on the pedestal at the floor */
  function htQuad(TB) {
    var P = TB.paint, D = TB.dark, s, k, gy, gzz;
    cylZ(D, 0, 0, 0, 0.30, 0.45, 18);
    box(P, -0.40, 0.25, -0.30, 0.30, 0.30, 0.86);
    box(D, -0.50, -0.25, -0.18, 0.18, 0.55, 0.62);
    /* the shield: a front plate and two wings swept back past the guns */
    box(P, 0.26, 0.29, -0.34, 0.34, 0.70, 1.38);
    for (s = -1; s <= 1; s += 2) rbox(P, 0.18, s * 0.42, 0.13, 0.012, s * 0.55, 0.70, 1.30);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        gy = s * 0.56; gzz = 0.98 + k * 0.22;
        box(D, -0.30, 0.22, gy - 0.05, gy + 0.05, gzz - 0.06, gzz + 0.06);
        cylX(D, 0.22, 0.48, gy, gzz, 0.034, 8);
        cylX(D, 0.48, 1.30, gy, gzz, 0.021, 6);
        cylX(D, 1.24, 1.34, gy, gzz, 0.03, 6);
      }
      box(P, -0.34, 0.10, s > 0 ? 0.64 : -0.86, s > 0 ? 0.86 : -0.64, 0.86, 1.34);
      box(D, -0.35, 0.11, s > 0 ? 0.64 : -0.86, s > 0 ? 0.86 : -0.64, 1.34, 1.36);
    }
    /* the reflex sight behind the shield's top edge */
    box(D, 0.10, 0.22, -0.05, 0.05, 1.22, 1.34);
  }
  function buildHalftrack(THREE, C, which) {
    var V = { m16: which === "m16" }, T = materials(THREE, C, PAINT.od), g = new THREE.Group(), B = bins(T), i, wg, tg, TB;
    var dx = V.m16 ? -0.165 : 0;
    htBody(B, V);
    if (!V.m16) htPulpit(B);
    var hg = new THREE.Group(); hg.name = "hull"; flush(THREE, hg, B); hg.position.x = dx; g.add(hg);
    /* the front axle */
    var WB = { tyre: new Bin(T.tyre, false), paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    tyrePair(WB.tyre, WB.paint, WB.dark, HT.RF, HT.TYF, HT.THF, 0.27, 22, 6);
    wg = group(THREE, "roadwheel", HT.AXF + dx, 0, HT.RF); flush(THREE, wg, WB); g.add(wg);
    /* the sprocket and the idler (both sides each), the four bogie wheel stations */
    var parts = [[HT.SPR.x, HT.SPR.z, 1], [HT.IDL.x, HT.IDL.z, 2]];
    for (i = 0; i < HT.BOG.length; i++) parts.push([HT.BOG[i], HT.RB + 0.035, 3]);
    for (i = 0; i < parts.length; i++) {
      var RB = { paint: new Bin(T.paint, true), tyre: new Bin(T.tyre, false) };
      if (parts[i][2] === 1) htSprocket(RB.paint, HT.SPR.r, true);
      else if (parts[i][2] === 2) htSprocket(RB.paint, HT.IDL.r, false);
      else htBogieWheel(RB.paint, RB.tyre);
      wg = group(THREE, "roadwheel", parts[i][0] + dx, 0, parts[i][1]); flush(THREE, wg, RB); g.add(wg);
    }
    TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false) };
    if (V.m16) { htQuad(TB); tg = group(THREE, "turret", -1.30 + dx, 0, HT.BZ0 + 0.12); }
    else { htPulpitGun(TB); tg = group(THREE, "turret", PUL.x, PUL.y, PUL.z); }
    flush(THREE, tg, TB); g.add(tg);
    return g;
  }

  return { build113: build113, buildV150: buildV150, buildYunpao: buildYunpao, buildHalftrack: buildHalftrack };
})();

/* len is the measured X extent of each build (tools/model3d/dump.js) */
UNIT_MODELS["roc_e50_ifv"] = { len: 6.2, build: function (THREE, M, C) { return HeroRocGround.buildHalftrack(THREE, C, "m3a1"); } };
UNIT_MODELS["roc_e50_spaag"] = { len: 6.53, build: function (THREE, M, C) { return HeroRocGround.buildHalftrack(THREE, C, "m16"); } };
UNIT_MODELS["roc_e60_ifv"] = { len: 4.92, build: function (THREE, M, C) { return HeroRocGround.build113(THREE, C, "m113a1"); } };
UNIT_MODELS["roc_e80_ifv"] = { len: 5.525, build: function (THREE, M, C) { return HeroRocGround.build113(THREE, C, "cm21"); } };
UNIT_MODELS["roc_e90_ifv"] = { len: 5.525, build: function (THREE, M, C) { return HeroRocGround.build113(THREE, C, "cm21"); } };
UNIT_MODELS["roc_e90_tankdestroyer"] = { len: 5.525, build: function (THREE, M, C) { return HeroRocGround.build113(THREE, C, "cm25"); } };
UNIT_MODELS["roc_e80_recon"] = { len: 5.73, build: function (THREE, M, C) { return HeroRocGround.buildV150(THREE, C); } };
UNIT_MODELS["roc_e90_recon"] = { len: 5.73, build: function (THREE, M, C) { return HeroRocGround.buildV150(THREE, C); } };
UNIT_MODELS["roc_e00_ifv"] = { len: 7.04, build: function (THREE, M, C) { return HeroRocGround.buildYunpao(THREE, C); } };
UNIT_MODELS["roc_e00_recon"] = { len: 7.04, build: function (THREE, M, C) { return HeroRocGround.buildYunpao(THREE, C); } };
