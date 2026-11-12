/* ===== us_early_light.js - HERO models: three early US Army light vehicles ======================
   Full-quality redo (owner 2026-10-24, the US ground set).  Three keys, kept, one builder object:
     nato_e50_ifv    "M59 APC" / "M59 Armored Personnel Carrier", e50, service 1954, turret:true, cargo 5,
                     weapon w_e50_nato_ifv ".50 cal M2HB on an open pintle mount" (js/eras.js); armour_specs:
                     5.6 x 3.3 x 2.8 m, five road wheels, three rollers, front sprocket, extras aaMg, trimvane.
     nato_e50_recon  "M8 Greyhound" / "M8 Greyhound 6x6 armoured car", e50, service 1943, turret:true,
                     weapon w_e50_nato_recon ".30 cal Browning in a small manual turret".  (armour_specs
                     carries a Ferret row under this key; generations.js notes it and gives the M8's
                     published 4.70 x 2.31 m.)
     nato_e60_recon  "M151 MUTT" / "M151A1 Military Utility Tactical Truck", e60, service 1960,
                     turret:true, weapon w_e60_nato_recon "M60 GPMG".
   Build names kept: HeroEarlyLight.m59 / .m8 / .m151, read by nothing else.

   References (Wikimedia Commons at width 960, cached in the scratchpad q_earlylight_ref):
     [TM]  "TM 9-2800, Carrier, personnel, full tracked, armored, M59 (G-280).png" - the Army's own
           standard-vehicles manual photograph, front-right three-quarter of an early M59: the tall box,
           the steep glacis, the trim vane stowed on the nose, the commander's cupola with the .50 carried
           OPEN on a cradle above it, the roof hatches, five dual road wheels.
     [DC]  "M59 APC D-cisive.JPG" - a square port side (nose right): the slab side plate overhanging the
           track, the raised front sprocket and rear idler, five dual road wheels, three return rollers,
           the mudguard brackets at both ends of the side plate.
     [A1]  "M59 (APC) 1.JPG", [B2] "M59 Armored Personnel Carrier (2).jpg" - two front views: the glacis
           with its access plate, the lamp groups in guards at the top corners, the ledge at about 1.3 m
           and the stowed trim vane below it with chamfered lower corners, two tow hooks under it.
     [B4]  "M59 Armored Personnel Carrier (4).jpg" - port side three-quarter (a later domed M13 cupola).
     [W63] "M59 amphibious landing.png" (1963) - swimming, the trim vane raised.
     [P48] "M8-Greyhound-parade-19480407.jpg" - a DATED POSTWAR M8 (Washington, 7 April 1948): the sloped
           nose with the two hatch boxes, the flat front mudguards, the ribbed bin and the long rear box,
           the open turret with the 37 mm and NO ring mount, olive drab.
     [M8S] "M8 armored car side view.jpg" - port side (nose left): axle stations, deck and nose heights,
           the whip behind the turret.
     [J67] "Gun jeep secures landing zone, Operation Junction City, April 1967.jpg" - an M151 of F Troop,
           17th Cavalry with the M60 on a tall post behind the front seats, the spare on the tail, the
           whip at the rear on the port side, no windscreen standing.
     [JS]  "JeepRightTopDownM151.jpg" - a square starboard side (nose right) of an M151A1: wheel stations,
           the flat bonnet, the arches, the spare standing against the tail.
   Published figures (en.wikipedia infoboxes, kept from the old header and confirmed):
     M59 220.9 x 128.3 x 109 in = 5.61 x 3.26 x 2.77 m; two GMC 302 petrol engines, one in each side
       sponson; "five road wheels per side, along with three return rollers", drive sprocket at the front;
       "a trim vane is provided"; "a ramp at the rear of the vehicle, which has an escape door set into
       it"; "hatches on the top"; the driver front left, the commander to his right.
     M8 4.70-5.00 m long, 2.31-2.54 m wide (sources disagree; see the old header's note), 37 mm M6 and a
       coaxial .30 M1919A4; 9.00-20 tyres.
     M151 132.7 x 64.3 in (3.37 x 1.63 m), 85 in (2.16 m) wheelbase, 7.00-16 tyres.

   CORRECTED against the old file:
     M59: the old cupola had no vision blocks and the gun sat low on the ring; [TM] shows the .50 high on
       its cradle above a cupola with vision blocks.  The trim vane IS shown by [TM][A1][B2][W63] (the old
       header said no photograph showed one): now drawn stowed on the lower nose.  The old team panels
       covered half the roof (now two short strips on the roof hatch).  The rear ramp with its escape door
       is drawn (Wikipedia); the tracks are the published 21 in wide, not 0.40 m; the road wheels are dual.
     M8: the old ring mount with a .50 is gone.  The dated postwar photograph [P48] shows the M8 without
       it, and the row's weapon is the .30 (the M49 ring mount was a wartime field fit on some cars; [M8S],
       undated, shows one).  The bins no longer cut through the tyres.
     M151: the windscreen is drawn folded flat on the bonnet ([J67] shows none standing); the whip moves
       from the front right fender (the [JS] museum truck) to the rear port corner, where the dated 1967
       photograph [J67] has it.  The M60's post is much taller than the old one: measured on [J67] against
       the spare wheel (0.75 m across) the gun stands about 1.9 m above the ground, not 1.4 m; the post
       head is drawn at 1.82 m, the gun axis at 1.94 m.

   Recognition list (what each rests on; where it is in the code):
     M59
      1. The tall slab-sided box, side plates hanging over the tracks to about 1.0 m [DC][B4]: m59Hull.
      2. The steep glacis to a ledge at 1.3 m with the access plate, the lower nose under it [A1][B2]: m59Hull.
      3. The trim vane stowed on the lower nose, chamfered lower corners, two tow hooks [TM][A1][B2]: m59Front.
      4. The lamp groups in guards on the top front corners [A1][B2][TM]: m59Front.
      5. Five dual road wheels, the raised front sprocket and rear idler, three return rollers [DC]: m59Run.
      6. The commander's cupola front right with vision blocks and the .50 high on its cradle [TM]: m59Cupola.
      7. The driver's hatch with periscopes front left, the troop hatch on the rear roof [TM]: m59Roof.
      8. The rear ramp with its escape door (Wikipedia; no rear photograph found): m59Rear.
     M8
      1. Six big 9.00-20 tyres, the long gap behind the front axle and the close rear pair [M8S][P48].
      2. The low hull, its nose a wedge: upper glacis with the two hatch boxes, the plate under it [P48].
      3. The flat front mudguards sloping down over the front tyres [P48][M8S]: m8Side.
      4. The ribbed bin ahead of the middle tyre and the long plain box over the rear pair [P48][M8S].
      5. The open-topped round turret amidships, the 37 mm M6 in its mantlet, the coaxial .30 [P48].
      6. The engine deck with its grille behind the turret, the whip on the port deck [M8S].
     M151
      1. The flat bonnet level with the flat-topped fenders, the horizontal-slat grille with the round
         headlamps set in it [JS][J67]: m151Body.
      2. The slab sides with the round-topped arches and the low open tub [JS].
      3. The folding windscreen, here folded flat forward on the bonnet [J67].
      4. The M60 on the tall post behind the front seats [J67]; the spare wheel on the tail [J67][JS].
      5. Four 7.00-16 tyres with the bar tread on plain disc wheels [JS].
   Paint: US Army olive drab (FS 24087), the period colour of all three ([P48] 1948, [J67] 1967, [TM]);
     the black-and-white photographs give no hue and the museum ones are repainted or faded ([DC] samples
     at 112,114,116 under grey sky), so the colour is the 24087 the redone M41 and M48 heroes use
     (#545437), the same paint of the same years.  No stars, bumper codes, registration numbers or unit
     marks ([P48]'s "USA" number, [DC]'s star and name, [JS]'s "U.S. ARMY 02B43073" are not drawn).

   Drawn (L x W x H, dump.js): M59 5.63 x 3.25 x 2.78 m (published 5.61 x 3.26 x 2.77); M8 5.08 x 2.59 m,
     turret top 1.90 m (TM 9-743's 6 ft 3 in, 1.91 m), 3.20 m to the whip; M151 3.39 x 1.62 m (published
     3.37 x 1.63), the M60 to 2.0 m, 3.0 m to the whip.
   Station tables (model x, m; +X nose).
     M59 hull: tail -2.70; roof 2.24 to x 1.98, the glacis down to the knuckle (2.64, 1.08) [DC]; side
       plates z 1.02-2.24 at +-1.60; lower nose (2.64, 1.07) to (2.36, 0.42); belly 0.42, +-1.04; the
       trim vane on the glacis plane from 1.32 m (the ledge of [B2]) down past the knuckle to 0.84 m.
       Road wheels x 1.40 / 0.62 / -0.16 / -0.94 / -1.72 (r 0.32), sprocket (2.22, 0.66), idler
       (-2.30, 0.64), return rollers 1.02 / -0.12 / -1.28; track centre +-1.33, 0.53 wide.
     M8 hull: tail -2.50; deck 1.40 from x -2.28 to 1.00, nose glacis 1.00 -> 1.86 (1.40 -> 1.31) and
       1.86 -> 2.45 (1.31 -> 1.00), lower nose to (2.10, 0.32); upper sides lean in 22 deg; axles
       1.69 / -0.44 / -1.82 (from [M8S] at 0.16 / 0.59 / 0.86 of the length), tyre r 0.45, track
       +-1.00; turret ring at x 0.16.
     M151: axles 1.30 / -0.86 (2.16 m), tyre r 0.37, track +-0.673 (53 in); body sides +-0.79, belt 0.90,
       bonnet 1.08 (both off [JS] at 178 px a metre on the wheelbase), grille face 1.66, bumper 1.72,
       tail -1.41, the spare's hub to -1.67; the M60 post at x -0.40, head 1.82 m [J67].
   NOT CONFIRMED (drawn as stated): the M59's ramp outline, the escape door's side (drawn to the right of
     centre) and the troop hatch's exact layout; the M59's "twin side exhausts" were not found in any
     photograph used here and are NOT drawn; the M8 coaxial .30's side (right); the M151's spare wheel
     side (drawn on the port half) and the post's own design (a plain post with a swivel head).
     DRAW_M151_MG switches the M151's weapon off (the "turret" node then stays an empty group).

   Budget: M59 12,424 triangles, 13 draw calls; M8 8,860, 10; M151 7,280, 10; six materials each.
   Nodes: "turret" on each (origin on the cupola ring, turret ring or post head; gun along +X); one
   "roadwheel" group per axle (both sides, local Y the axle): five on the M59, three on the M8, two on
   the M151.  Materials: paint (canvas texture, planar metre UVs), dark, lamp, glass, team (exactly
   C.team, short top-facing strips), wheel (vertex colours: rubber, painted disc, nuts).
   +X nose, +Y left, +Z up, metres, wheels and tracks on z = 0.  Colours in sRGB, linearised by
   prepModel(); the wheel's vertex colours are linear.  ASCII only.
   DETAIL PASS 2 (the owner: the models looked plainer than the old ones): m8Detail(), m8TurretDetail() and m151Detail() on dpKit; the M8 and M151 paint takes dpWeather.  M8
     8860 -> 11548 tris (10 draw calls); M151 7280 -> 7968 (10).  The M59 (m59) is unchanged.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEarlyLight = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI;

  /* see the header: the M60 is the row's weapon, its post is from [J67] */
  var DRAW_M151_MG = true;

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* one bin of triangles per material; the painted bin gets planar metre UVs from each face's
     dominant axis (0.34 a metre), so the paint never stretches */
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
  /* a vertex-coloured bin (wheels: rubber, painted disc and nuts in one draw call) */
  function VBin(mat) { Bin.call(this, mat, false); this.C = []; this.col = [0.02, 0.02, 0.02]; }
  VBin.prototype.tri = function (a, b, c, na, nb, nc) {
    Bin.prototype.tri.call(this, a, b, c, na, nb, nc);
    var k = this.col;
    this.C.push(k[0], k[1], k[2], k[0], k[1], k[2], k[0], k[1], k[2]);
  };
  function lin(hex) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    return [f((hex >> 16) & 255), f((hex >> 8) & 255), f(hex & 255)];
  }

  /* a closed solid; the signed volume says whether the faces point out, and turns them if not.
     smooth: average the face normals at shared corners */
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
    var t;
    if (x0 > x1) { t = x0; x0 = x1; x1 = t; }
    if (y0 > y1) { t = y0; y0 = y1; y1 = t; }
    if (z0 > z1) { t = z0; z0 = z1; z1 = t; }
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* the same box on both sides: y0..y1 given for the left, mirrored right */
  function boxm(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y0, -y1, z0, z1); }
  /* a box on a tilted plane: origin P0, in-plane axes U and W, normal N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a trapezoid plate on a plane through the x axis direction U (no y part): half-width hw0 at u0,
     hw1 at u1, centred on y = yc */
  function trap(bin, P0, U, N, u0, u1, hw0, hw1, h0, h1, yc) {
    var c = yc || 0;
    function pt(u, w, h) { return [P0[0] + U[0] * u + N[0] * h, c + w, P0[2] + U[2] * u + N[2] * h]; }
    hexa(bin, [pt(u0, -hw0, h0), pt(u1, -hw1, h0), pt(u1, hw1, h0), pt(u0, hw0, h0),
               pt(u0, -hw0, h1), pt(u1, -hw1, h1), pt(u1, hw1, h1), pt(u0, hw0, h1)]);
  }
  /* a capped cylinder or cone between two centres, smooth round the side */
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
  /* a thin bar between two points, square section */
  function bar(bin, A, B, w) {
    var d = sub(B, A), ax = unit(d), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), h = w / 2, V = [], i, c = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (i = 0; i < 8; i++) {
      var e = c[i % 4], P = i < 4 ? A : B;
      V.push([P[0] + (u[0] * e[0] + v[0] * e[1]) * h, P[1] + (u[1] * e[0] + v[1] * e[1]) * h, P[2] + (u[2] * e[0] + v[2] * e[1]) * h]);
    }
    hexa(bin, V);
  }
  /* a hoop (torus) about the axis through C along A (unit), radius R, tube r */
  function hoop(bin, C, A, R, r, seg, tseg) {
    var t = Math.abs(A[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(A, t)), v = cross(A, u), V = [], F = [], i, j;
    for (i = 0; i < seg; i++) {
      var a = i / seg * TAU, d = [u[0] * Math.cos(a) + v[0] * Math.sin(a), u[1] * Math.cos(a) + v[1] * Math.sin(a), u[2] * Math.cos(a) + v[2] * Math.sin(a)];
      for (j = 0; j < tseg; j++) {
        var b = j / tseg * TAU, cr = R + r * Math.cos(b), sz = r * Math.sin(b);
        V.push([C[0] + d[0] * cr + A[0] * sz, C[1] + d[1] * cr + A[1] * sz, C[2] + d[2] * cr + A[2] * sz]);
      }
    }
    for (i = 0; i < seg; i++) for (j = 0; j < tseg; j++) {
      var i2 = (i + 1) % seg, j2 = (j + 1) % tseg;
      F.push([i * tseg + j, i2 * tseg + j, i2 * tseg + j2], [i * tseg + j, i2 * tseg + j2, i * tseg + j2]);
    }
    solid(bin, V, F, true);
  }

  /* ear clipping, for the end caps of the lofts and the prisms */
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
    while (idx.length > 3 && guard++ < 600) {
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
  /* a skin lofted through cross-section rings ([x, y, z], the same count each), capped at both ends */
  function loft(bin, rings, smooth) {
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
    solid(bin, V, F, smooth);
  }
  /* an (x, z) outline extruded across y0..y1 (side profiles: arches, fenders, mudguards) */
  function prism(bin, pts0, y0, y1) {
    var pts = [], i, n, area = 0, V = [], F = [], T;
    for (i = 0; i < pts0.length; i++) {
      var q = pts0[i], l = pts[pts.length - 1];
      if (!l || Math.abs(q[0] - l[0]) + Math.abs(q[1] - l[1]) > 1e-6) pts.push(q);
    }
    n = pts.length;
    if (Math.abs(pts[0][0] - pts[n - 1][0]) + Math.abs(pts[0][1] - pts[n - 1][1]) < 1e-6) { pts.pop(); n--; }
    for (i = 0; i < n; i++) area += pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1];
    if (area < 0) pts.reverse();
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]]);
    for (i = 0; i < n; i++) V.push([pts[i][0], y1, pts[i][1]]);
    T = earclip(pts);
    for (i = 0; i < T.length; i++) {
      F.push([T[i][0], T[i][1], T[i][2]]);
      F.push([n + T[i][0], n + T[i][2], n + T[i][1]]);
    }
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      F.push([i, n + j, j], [i, n + i, n + j]);
    }
    solid(bin, V, F, false);
  }
  /* points of a circular arch about (cx, cz), from angle a0 to a1 (degrees), n steps */
  function arc(cx, cz, r, a0, a1, n) {
    var out = [], i, a;
    for (i = 0; i <= n; i++) { a = (a0 + (a1 - a0) * i / n) * PI / 180; out.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]); }
    return out;
  }

  /* ----------------------------------------------------------- paint */
  /* US Army olive drab, FS 24087 (#545437, as the redone M41 and M48): a brushed single coat gone
     patchy, weld and plate seams, rain streaks running down, a few chips.  Planar UVs at 0.34 a metre,
     so the 256 px tile spans 2.9 m and repeats.  Cached per vehicle: build() runs per key, team, era. */
  var _tex = {};
  function paintTex(THREE, base, seed) {
    var key = base + seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = seed >>> 0, i, a, x, y, rr, ang, rd, k;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = base; q.fillRect(0, 0, 256, 256);
      var blots = ["rgba(66,66,40,0.45)", "rgba(96,96,66,0.30)", "rgba(74,78,46,0.40)"];
      for (k = 0; k < blots.length; k++) {
        q.fillStyle = blots[k];
        for (i = 0; i < 9; i++) {
          x = R() * 256; y = R() * 256; rr = 14 + R() * 34;
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.3, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(22,22,12,0.07)" : "rgba(200,190,150,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 16 + R() * 56);
      }
      q.fillStyle = "rgba(20,20,10,0.18)";
      q.fillRect(0, 98, 256, 2); q.fillRect(150, 0, 2, 256);
      q.fillStyle = "rgba(20,20,10,0.13)";
      for (i = 0; i < 32; i++) { q.fillRect(i * 8 + 3, 104, 2, 2); q.fillRect(156, i * 8 + 2, 2, 2); }
      q.fillStyle = "rgba(150,140,110,0.20)";
      for (i = 0; i < 26; i++) q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 1 + R() * 2);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  var OD = "#545437";
  function materials(THREE, C, seed) {
    var T = {}, tx = paintTex(THREE, OD, seed);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(OD);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x27291f, roughness: 0.78, metalness: 0.3 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xd2ccb0, roughness: 0.3, metalness: 0.2, emissive: 0x1a1810 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1b2a30, roughness: 0.12, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.9, metalness: 0.04 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), lamp: new Bin(T.lamp, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
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
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      var mesh = new THREE.Mesh(geo, b.mat);
      mesh.castShadow = true; mesh.receiveShadow = true;
      group.add(mesh);
    }
  }

  /* ----------------------------------------------------------- wheels */
  var RUB = lin(0x1d1d1b), HUB = lin(0x4a4a31), NUT = lin(0x2c2e24);
  /* a tyre lathed about the Y axis at (0, yc, 0): radius R, width W; lugs > 0 cuts a bar tread into
     the crown (alternate columns sunk by lugH), studs: the bolt circle; dish: the disc's inset */
  function tyre(VB, yc, s, R, W, lugs, lugH, rim, studs, dish, ph, seg) {
    var N = lugs ? lugs * 2 : (seg || 24), hw = W / 2, ds = seg ? 14 : 18;
    var prof = seg ? [[rim, -1.0, 0], [0.93, -1.0, 0], [1.0, -0.62, 0], [1.0, 0.62, 0], [0.93, 1.0, 0], [rim, 1.0, 0]]
                   : [[rim, -1.0, 0], [rim + 0.06, -1.0, 0], [0.84, -0.97, 0], [0.95, -0.80, 0], [1.0, -0.45, 1],
                      [1.0, 0.45, 1], [0.95, 0.80, 0], [0.84, 0.97, 0], [rim + 0.06, 1.0, 0], [rim, 1.0, 0]];
    var V = [], F = [], i, j, k, m = prof.length, r, a;
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = prof[i][0] * R;
      if (lugs && prof[i][2] && ((j + (i > 4 ? 1 : 0)) % 2)) r -= lugH;
      a = (j + (ph || 0)) / N * TAU;
      V.push([r * Math.cos(a), yc + prof[i][1] * hw, r * Math.sin(a)]);
    }
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N; var i2 = (i + 1) % m;
      F.push([i * N + j, i * N + k, i2 * N + k], [i * N + j, i2 * N + k, i2 * N + j]);
    }
    VB.col = RUB;
    solid(VB, V, F, true);
    VB.col = HUB;
    var yf = yc + s * hw * (0.95 - dish);
    cyl(VB, [0, yf, 0], [0, yc - s * hw * 0.85, 0], rim * R, rim * R, ds);
    if (studs < 0) return;
    cyl(VB, [0, yf, 0], [0, yf + s * 0.02, 0], rim * R * 0.92, rim * R * 0.86, ds);
    cyl(VB, [0, yf, 0], [0, yf + s * 0.05, 0], 0.30 * rim * R + 0.03, 0.26 * rim * R + 0.03, 12);
    VB.col = NUT;
    cyl(VB, [0, yf + s * 0.05, 0], [0, yf + s * 0.075, 0], 0.16 * rim * R + 0.02, 0.12 * rim * R + 0.02, 10);
    for (i = 0; i < studs; i++) {
      a = i / studs * TAU;
      var rr = 0.52 * rim * R;
      cyl(VB, [rr * Math.cos(a), yf, rr * Math.sin(a)], [rr * Math.cos(a), yf + s * 0.025, rr * Math.sin(a)], 0.016, 0.016, seg ? 4 : 6);
    }
  }
  /* one axle as a "roadwheel" group, origin on the axle, both sides in one mesh */
  function axleGroup(THREE, T, x, z, fill) {
    var VB = new VBin(T.wheel);
    fill(VB);
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(VB.P), 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(VB.N), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(VB.C), 3));
    var wg = new THREE.Group();
    wg.name = "roadwheel";
    wg.position.set(x, 0, z);
    var mesh = new THREE.Mesh(geo, T.wheel);
    mesh.castShadow = true; mesh.receiveShadow = true;
    wg.add(mesh);
    return wg;
  }

  /* ----------------------------------------------------------- the M2HB .50 (receiver on (x0, 0, z0)) */
  function m2hb(B, x0, z0) {
    var d = B.dark;
    box(d, x0 - 0.20, x0 + 0.20, -0.055, 0.055, z0 - 0.07, z0 + 0.075);              /* receiver        */
    box(d, x0 - 0.06, x0 + 0.15, -0.048, 0.048, z0 + 0.075, z0 + 0.10);              /* feed cover      */
    box(d, x0 - 0.27, x0 - 0.20, -0.05, 0.05, z0 - 0.05, z0 + 0.055);                /* back plate      */
    cylZ(d, x0 - 0.30, 0.06, z0 - 0.05, z0 + 0.04, 0.014, 6);                        /* spade grips     */
    cylZ(d, x0 - 0.30, -0.06, z0 - 0.05, z0 + 0.04, 0.014, 6);
    cylX(d, x0 + 0.20, x0 + 0.38, 0, z0 + 0.01, 0.03, 10);                            /* barrel sleeve   */
    cylX(d, x0 + 0.38, x0 + 1.24, 0, z0 + 0.01, 0.016, 8);                            /* barrel          */
    cylX(d, x0 + 1.24, x0 + 1.31, 0, z0 + 0.01, 0.024, 8);                            /* flash hider     */
    box(B.paint, x0 - 0.10, x0 + 0.12, 0.07, 0.20, z0 - 0.20, z0 + 0.0);             /* ammunition can  */
    box(d, x0 - 0.02, x0 + 0.08, 0.055, 0.075, z0 - 0.03, z0 + 0.06);                /* feed chute      */
  }

  /* ======================================================================
     M59 Armored Personnel Carrier
     ====================================================================== */
  var M59 = { tail: -2.70, xg: 1.98, xk: 2.64, zr: 2.24, zk: 1.08, zs: 1.02, hw: 1.60, hb: 1.04,
              WX: [1.40, 0.62, -0.16, -0.94, -1.72], RW: 0.32, ZW: 0.39, TY: 1.33, TW: 0.533,
              SPX: 2.22, SPZ: 0.66, IDX: -2.30, IDZ: 0.64, RS: 0.30, CX: 1.55, CY: -0.62 };
  function m59Z(x) { return x <= M59.xg ? M59.zr : lerp(M59.zr, M59.zk, (x - M59.xg) / (M59.xk - M59.xg)); }
  function m59Hull(B) {
    var c = 0.035, rings = [], X = [M59.tail, -1.0, M59.xg, 2.31, M59.xk], i, h = M59.hw, zs = M59.zs;
    /* the slab box over the tracks, roof edges eased, the glacis running down to the ledge */
    for (i = 0; i < X.length; i++) {
      var x = X[i], zt = m59Z(x);
      var cc = Math.min(c, (zt - zs) * 0.4);
      rings.push([[x, -h, zs], [x, h, zs], [x, h, zt - cc], [x, h - cc, zt], [x, -h + cc, zt], [x, -h, zt - cc]]);
    }
    loft(B.paint, rings, false);
    /* the hull between the tracks: belly at 0.42, the lower nose plate leaning back 22 deg */
    prism(B.paint, [[M59.tail, 1.04], [M59.tail, 0.56], [M59.tail + 0.18, 0.42], [2.36, 0.42], [M59.xk, M59.zk - 0.01], [M59.xk - 0.04, 1.04]],
          -M59.hb, M59.hb);
    /* the lip along the foot of each side plate, the mudguard brackets at both ends [DC] */
    var s;
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, M59.tail - 0.02, M59.xk - 0.04, s * (h - 0.02), s * (h + 0.025), zs - 0.03, zs + 0.03);
      prism(B.paint, [[M59.tail - 0.02, zs], [M59.tail - 0.02, 0.80], [M59.tail + 0.30, 0.86], [M59.tail + 0.42, zs]],
            s > 0 ? 1.08 : -1.58, s > 0 ? 1.58 : -1.08);
      prism(B.paint, [[2.36, zs], [2.62, 0.80], [M59.xk + 0.02, 0.84], [M59.xk + 0.02, zs]],
            s > 0 ? 1.08 : -1.58, s > 0 ? 1.58 : -1.08);
      /* the weld seam under the roof edge [DC] */
      box(B.dark, M59.tail + 0.05, M59.xg - 0.05, s * (h - 0.002), s * (h + 0.006), 2.17, 2.18);
    }
  }
  function m59Front(B) {
    var s, i, h = M59.hw;
    var gU = unit([M59.xk - M59.xg, 0, M59.zk - M59.zr]), gN = unit([M59.zr - M59.zk, 0, M59.xk - M59.xg]);
    var gL = Math.sqrt((M59.xk - M59.xg) * (M59.xk - M59.xg) + (M59.zr - M59.zk) * (M59.zr - M59.zk));
    var G0 = [M59.xg, 0, M59.zr];
    /* the glacis access plate, bolted [A1][B2] */
    trap(B.paint, G0, gU, gN, 0.16, 0.88, 0.62, 0.62, 0.0, 0.025, 0.18);
    for (i = 0; i < 8; i++) {
      trap(B.dark, G0, gU, gN, 0.20 + i * 0.088, 0.22 + i * 0.088, 0.012, 0.012, 0.025, 0.035, 0.18 + 0.58);
      trap(B.dark, G0, gU, gN, 0.20 + i * 0.088, 0.22 + i * 0.088, 0.012, 0.012, 0.025, 0.035, 0.18 - 0.58);
    }
    /* the lamp groups on the top front corners, each a headlamp and a blackout lamp on a bracket in a
       bar guard [A1][B2][TM] */
    for (s = -1; s <= 1; s += 2) {
      var ly = s * 1.36, lz = 2.02, lx = M59.xg + (M59.zr - lz) / (M59.zr - M59.zk) * (M59.xk - M59.xg);
      box(B.paint, lx - 0.10, lx + 0.12, ly - 0.17, ly + 0.17, lz - 0.14, lz + 0.03);
      cylX(B.dark, lx + 0.12, lx + 0.20, s * 1.30, lz + 0.06, 0.085, 14);
      cylX(B.lamp, lx + 0.20, lx + 0.215, s * 1.30, lz + 0.06, 0.072, 14);
      box(B.dark, lx + 0.12, lx + 0.19, s * 1.47 - 0.04, s * 1.47 + 0.04, lz - 0.02, lz + 0.06);
      box(B.lamp, lx + 0.19, lx + 0.20, s * 1.47 - 0.03, s * 1.47 + 0.03, lz + 0.0, lz + 0.045);
      var gx = lx + 0.30;
      bar(B.dark, [lx + 0.02, s * 1.16, lz - 0.08], [gx, s * 1.16, lz + 0.10], 0.025);
      bar(B.dark, [lx + 0.02, s * 1.56, lz - 0.08], [gx, s * 1.56, lz + 0.10], 0.025);
      bar(B.dark, [gx, s * 1.16, lz + 0.10], [gx, s * 1.56, lz + 0.10], 0.025);
      bar(B.dark, [gx, s * 1.36, lz + 0.10], [gx - 0.02, s * 1.36, lz - 0.06], 0.02);
    }
    /* the trim vane, stowed: a broad plate lying on the glacis from 1.32 m (the ledge of [B2]) and
       running on past the knuckle, standing off the lower nose; chamfered lower corners, two
       stiffeners, its hinge along the top edge [TM][A1][B2] */
    var dz = M59.zr - M59.zk, u0 = (M59.zr - 1.32) / dz * gL, u2 = (M59.zr - 0.84) / dz * gL, u1 = u2 - 0.24;
    trap(B.paint, G0, gU, gN, u0, u1, 1.50, 1.50, 0.03, 0.07);
    trap(B.paint, G0, gU, gN, u1, u2, 1.50, 1.18, 0.03, 0.07);
    for (i = 0; i < 2; i++) trap(B.paint, G0, gU, gN, u0 + 0.16 + i * 0.26, u0 + 0.21 + i * 0.26, 1.42, 1.42, 0.07, 0.10);
    trap(B.dark, G0, gU, gN, u0 - 0.02, u0 + 0.05, 1.10, 1.10, 0.0, 0.09);
    for (s = -1; s <= 1; s += 2) {
      /* the vane's two struts back to the lower nose */
      bar(B.dark, [2.50, s * 0.70, 0.84], [G0[0] + gU[0] * (u2 - 0.06) + gN[0] * 0.03, s * 0.70, G0[2] + gU[2] * (u2 - 0.06) + gN[2] * 0.03], 0.05);
      /* the two tow hooks under the vane [A1][B2] */
      box(B.dark, 2.38, 2.56, s * 0.88 - 0.05, s * 0.88 + 0.05, 0.50, 0.60);
      cylY(B.dark, 2.52, s * 0.88 - 0.07, s * 0.88 + 0.07, 0.55, 0.045, 8);
    }
  }
  function m59Roof(B) {
    var zr = M59.zr, s, i;
    /* the driver's hatch front left, its periscopes looking forward and to the left */
    box(B.paint, 1.30, 1.86, 0.30, 0.94, zr, zr + 0.06);
    cylY(B.dark, 1.34, 0.36, 0.88, zr + 0.06, 0.03, 8);
    for (i = 0; i < 3; i++) {
      box(B.paint, 1.86, 1.96, 0.36 + i * 0.19, 0.50 + i * 0.19, zr - 0.02, zr + 0.11);
      box(B.glass, 1.96, 1.965, 0.38 + i * 0.19, 0.48 + i * 0.19, zr + 0.03, zr + 0.09);
    }
    box(B.paint, 1.42, 1.62, 0.95, 1.05, zr - 0.02, zr + 0.11);
    box(B.glass, 1.45, 1.59, 1.05, 1.055, zr + 0.03, zr + 0.09);
    /* the cupola's base ring on the roof (the cupola itself is the turret) */
    cylZ(B.dark, M59.CX, M59.CY, zr - 0.01, zr + 0.04, 0.46, 20);
    /* the troop hatch on the rear roof, two leaves on side hinges [TM]; C.team: a short strip on each */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -2.50, -0.95, s * 0.03, s * 0.92, zr, zr + 0.035);
      cylX(B.dark, -2.40, -1.05, s * 0.96, zr + 0.03, 0.03, 8);
      box(B.dark, -1.80, -1.66, s * 0.14, s * 0.26, zr + 0.035, zr + 0.06);
      box(B.team, -2.32, -2.02, s * 0.25, s * 0.75, zr + 0.036, zr + 0.05);
    }
    box(B.dark, -2.52, -0.93, -0.02, 0.02, zr, zr + 0.04);
  }
  function m59Rear(B) {
    var x = M59.tail, s;
    /* the ramp, hinged at its foot, the escape door set into it, a handle and the ramp's lock lugs */
    box(B.paint, x - 0.035, x, -1.02, 1.02, 0.52, 2.02);
    cylY(B.dark, x - 0.04, -0.95, 0.95, 0.56, 0.05, 10);
    box(B.dark, x - 0.045, x - 0.035, -0.32, -0.30, 0.74, 1.86);
    box(B.dark, x - 0.045, x - 0.035, 0.34, 0.36, 0.74, 1.86);
    box(B.dark, x - 0.045, x - 0.035, -0.32, 0.36, 1.84, 1.86);
    box(B.dark, x - 0.045, x - 0.035, -0.32, 0.36, 0.74, 0.76);
    box(B.dark, x - 0.07, x - 0.035, 0.20, 0.30, 1.28, 1.32);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, x - 0.06, x - 0.035, s * 0.88, s * 0.98, 1.88, 1.96);
    }
  }
  function m59Run(B) {
    var s, i, yc, h = M59.TW / 2, xs = M59.SPX, xi = M59.IDX;
    /* the track's run: bottom over the road wheels, round the sprocket (front) and idler (rear), the
       top run carried on the three return rollers [DC]; shoes as blocks with the centre guide teeth */
    var zb = 0.035, zt = 0.955, rr = M59.RS + 0.035;
    var path = [[M59.WX[4] - 0.12, zb], [M59.WX[0] + 0.15, zb]];
    var k, a, ps = [];
    for (k = 0; k <= 6; k++) { a = (-70 + k * 160 / 6) * PI / 180; ps.push([xs + rr * Math.cos(a), M59.SPZ + rr * Math.sin(a)]); }
    path = path.concat(ps);
    path.push([1.02, zt], [-1.28, zt]);
    for (k = 0; k <= 6; k++) { a = (100 + k * 160 / 6) * PI / 180; path.push([xi + rr * Math.cos(a), M59.IDZ + rr * Math.sin(a)]); }
    for (s = -1; s <= 1; s += 2) {
      yc = s * M59.TY;
      var outer = [], inner = [];
      for (i = 0; i < path.length; i++) {
        var p0 = path[(i + path.length - 1) % path.length], p1 = path[i], p2 = path[(i + 1) % path.length];
        var tx = p2[0] - p0[0], tz = p2[1] - p0[1], l = Math.sqrt(tx * tx + tz * tz) || 1;
        var nx = tz / l, nz = -tx / l;
        outer.push([p1[0] + nx * 0.035, p1[1] + nz * 0.035]);
        inner.push([p1[0] - nx * 0.035, p1[1] - nz * 0.035]);
      }
      /* the band as quads between the outer and inner outlines */
      for (i = 0; i < path.length; i++) {
        var j = (i + 1) % path.length;
        hexa(B.dark, [[outer[i][0], yc - h, outer[i][1]], [outer[j][0], yc - h, outer[j][1]], [inner[j][0], yc - h, inner[j][1]], [inner[i][0], yc - h, inner[i][1]],
                      [outer[i][0], yc + h, outer[i][1]], [outer[j][0], yc + h, outer[j][1]], [inner[j][0], yc + h, inner[j][1]], [inner[i][0], yc + h, inner[i][1]]]);
      }
      /* track shoes: grousers on the ground run and the top run, guide teeth inside */
      for (i = 0; i < 22; i++) {
        var x = M59.WX[4] - 0.10 + i * 0.155;
        box(B.dark, x - 0.03, x + 0.03, yc - h - 0.008, yc + h + 0.008, 0.0, 0.025);
        box(B.dark, x - 0.025, x + 0.025, yc - 0.035, yc + 0.035, 0.07, 0.16);
      }
      for (i = 0; i < 15; i++) {
        var xt = -1.28 + i * 0.155;
        box(B.dark, xt - 0.03, xt + 0.03, yc - h - 0.008, yc + h + 0.008, zt + 0.035, zt + 0.055);
      }
      /* the drive sprocket (front, raised) with its teeth, the idler (rear, raised), the return rollers */
      cylY(B.dark, xs, yc - 0.20, yc + 0.20, M59.SPZ, 0.10, 12);
      for (k = 0; k < 2; k++) {
        var yy = yc + (k ? 0.11 : -0.11);
        cylY(B.paint, xs, yy - 0.04, yy + 0.04, M59.SPZ, 0.25, 16);
        for (i = 0; i < 10; i++) {
          a = i / 10 * TAU;
          box(B.dark, xs + 0.27 * Math.cos(a) - 0.035, xs + 0.27 * Math.cos(a) + 0.035, yy - 0.035, yy + 0.035,
              M59.SPZ + 0.27 * Math.sin(a) - 0.035, M59.SPZ + 0.27 * Math.sin(a) + 0.035);
        }
      }
      cylY(B.paint, xi, yc - 0.21, yc - 0.06, M59.IDZ, 0.29, 18);
      cylY(B.paint, xi, yc + 0.06, yc + 0.21, M59.IDZ, 0.29, 18);
      cylY(B.dark, xi, yc - 0.24, yc + 0.24, M59.IDZ, 0.08, 10);
      var RX = [1.02, -0.12, -1.28];
      for (i = 0; i < 3; i++) {
        cylY(B.dark, RX[i], yc - 0.20, yc + 0.20, zt - 0.115, 0.08, 10);
        cylY(B.dark, RX[i], s * 1.06, yc, zt - 0.115, 0.03, 6);
      }
      /* road-wheel arms and the shock absorbers on the first and last stations (en.wikipedia) */
      for (i = 0; i < 5; i++) box(B.dark, M59.WX[i] + 0.0, M59.WX[i] + 0.30, s * 1.05, s * 1.12, M59.ZW - 0.04, M59.ZW + 0.16);
      bar(B.dark, [M59.WX[0] + 0.06, s * 1.10, M59.ZW + 0.06], [M59.WX[0] + 0.40, s * 1.10, 0.92], 0.05);
      bar(B.dark, [M59.WX[4] + 0.06, s * 1.10, M59.ZW + 0.06], [M59.WX[4] - 0.28, s * 1.10, 0.92], 0.05);
    }
  }
  /* the commander's cupola with the .50 high on its cradle [TM]: origin on the roof ring */
  function m59Cupola(B) {
    var i, a;
    cyl(B.paint, [0, 0, 0.04], [0, 0, 0.26], 0.42, 0.38, 20);
    cyl(B.paint, [0, 0, 0.26], [0, 0, 0.30], 0.38, 0.30, 20);
    /* the vision blocks round its wall */
    for (i = 0; i < 6; i++) {
      a = (i + 0.5) / 6 * TAU;
      var cx = Math.cos(a), sy = Math.sin(a);
      planeBox(B.paint, [cx * 0.36, sy * 0.36, 0.12], [-sy, cx, 0], [0, 0, 1], [cx, sy, 0], -0.08, 0.08, 0.0, 0.11, 0.0, 0.07);
      planeBox(B.glass, [cx * 0.36, sy * 0.36, 0.12], [-sy, cx, 0], [0, 0, 1], [cx, sy, 0], -0.06, 0.06, 0.025, 0.085, 0.07, 0.075);
    }
    /* the hatch lid, shut, and its hinge */
    cylZ(B.paint, -0.03, 0, 0.30, 0.34, 0.24, 16);
    box(B.dark, -0.30, -0.22, -0.10, 0.10, 0.29, 0.35);
    /* the cradle: two posts from the cupola's front rim, the cross trunnion, the gun over it */
    for (var s = -1; s <= 1; s += 2) bar(B.dark, [0.16, s * 0.10, 0.28], [0.0, s * 0.08, 0.36], 0.035);
    cylY(B.dark, 0.0, -0.12, 0.12, 0.36, 0.025, 8);
    box(B.dark, -0.14, 0.10, -0.07, 0.07, 0.33, 0.37);
    m2hb(B, -0.12, 0.44);
  }
  function m59(THREE, M, C) {
    var T = materials(THREE, C, 5901), g = new THREE.Group(), B = bins(T), k;
    g.name = "m59_apc";
    m59Hull(B); m59Front(B); m59Roof(B); m59Rear(B); m59Run(B);
    flush(THREE, g, B);
    /* five axles of dual rubber-tyred road wheels */
    for (k = 0; k < M59.WX.length; k++) {
      g.add(axleGroup(THREE, T, M59.WX[k], M59.ZW, function (VB) {
        var s;
        for (s = -1; s <= 1; s += 2) {
          tyre(VB, s * (M59.TY + 0.11), s, M59.RW, 0.15, 0, 0, 0.80, 8, 0.10, 0, 12);
          tyre(VB, s * (M59.TY - 0.11), -s, M59.RW, 0.15, 0, 0, 0.80, -1, 0.10, 0, 12);
        }
      }));
    }
    var tt = new THREE.Group(), TB = bins(T);
    tt.name = "turret";
    tt.position.set(M59.CX, M59.CY, M59.zr);
    m59Cupola(TB);
    flush(THREE, tt, TB);
    g.add(tt);
    return g;
  }

  /* ======================================================================
     M8 Greyhound
     ====================================================================== */
  var M8 = { tail: -2.50, deck: 1.40, nose: 2.45, AX: [1.69, -0.44, -1.82], R: 0.45, TW: 0.25, TRK: 1.00, TX: 0.16 };
  /* the upper hull at station x: top z and half-widths at its foot (z 0.98) and at the deck edge */
  function m8Top(x) {
    if (x < -2.28) return lerp(1.18, M8.deck, (x + 2.50) / 0.22);
    if (x <= 1.00) return M8.deck;
    if (x <= 1.86) return lerp(M8.deck, 1.31, (x - 1.00) / 0.86);
    return lerp(1.31, 1.00, (x - 1.86) / (M8.nose - 1.86));
  }
  function m8Hull(B) {
    var X = [M8.tail, -2.28, -1.20, 0.0, 1.00, 1.40, 1.86, 2.15, M8.nose], rings = [], i;
    for (i = 0; i < X.length; i++) {
      var x = X[i], zt = m8Top(x), wb = 1.00, wt = 1.00 - (zt - 0.97) * 0.40;
      if (x > 2.0) { wb = lerp(1.00, 0.92, (x - 2.0) / 0.45); wt = Math.min(wt, wb - 0.02); }
      var zb = 0.97;
      if (zt - zb < 0.02) zt = zb + 0.02;
      rings.push([[x, -wb, zb], [x, wb, zb], [x, wt, zt], [x, -wt, zt]]);
    }
    loft(B.paint, rings, false);
    /* the lower hull between the wheels: the nose plate under the wedge, the tail plate */
    prism(B.paint, [[M8.tail, 0.98], [M8.tail, 0.46], [-2.30, 0.32], [2.10, 0.32], [M8.nose, 0.98]], -0.80, 0.80);
    /* the hull floor shelf over the wheels (the bins and mudguards stand on it) */
    box(B.paint, M8.tail + 0.02, 1.13, -1.03, 1.03, 0.93, 0.98);
  }
  function m8Side(B) {
    var s, i, j, a;
    for (s = -1; s <= 1; s += 2) {
      var yi = s * 1.00, yo = s * 1.27;
      /* the ribbed bin ahead of the middle tyre and the long plain box over the rear pair [P48][M8S] */
      box(B.paint, 0.06, 1.13, yi, yo, 0.70, 1.36);
      for (j = 0; j < 5; j++) box(B.paint, 0.08, 1.11, yo, yo + s * 0.016, 0.79 + j * 0.115, 0.82 + j * 0.115);
      box(B.dark, 0.06, 1.13, yo - s * 0.002, yo + s * 0.01, 1.34, 1.36);
      box(B.paint, -2.46, 0.02, yi, yo, 0.96, 1.36);
      box(B.dark, -1.23, -1.21, yo - s * 0.002, yo + s * 0.008, 0.98, 1.34);
      box(B.dark, -2.46, 0.02, yo - s * 0.002, yo + s * 0.008, 1.32, 1.335);
      for (i = 0; i < 4; i++) box(B.dark, -2.25 + i * 0.62, -2.13 + i * 0.62, yo, yo + s * 0.025, 1.25, 1.29);   /* catches */
      /* the arch skirts over the rear pair, under the box */
      prism(B.paint, [[-2.46, 0.96], [-2.46, 0.82], [-2.32, 0.84]].concat(arc(M8.AX[2], 0.45, 0.52, 160, 20, 6))
            .concat([[-1.13, 0.90]]).concat(arc(M8.AX[1], 0.45, 0.52, 160, 20, 6)).concat([[0.02, 0.84], [0.02, 0.96]]),
            s > 0 ? 1.20 : -1.27, s > 0 ? 1.27 : -1.20);
      /* the front mudguard: a flat plate sloping down from the bin top over the front tyre, its front
         edge turned down [P48][M8S] */
      var top = [[1.13, 1.36], [1.70, 1.22], [2.14, 1.06], [2.24, 0.84]];
      var Pm = top.concat([[2.18, 0.82], [2.08, 1.02], [1.68, 1.16], [1.13, 1.28]]);
      prism(B.paint, Pm, s > 0 ? 0.92 : -1.27, s > 0 ? 1.27 : -0.92);
      bar(B.paint, [1.13, s * 1.27, 1.345], [2.14, s * 1.27, 1.045], 0.03);
      /* the headlamp in its guard on the front of the mudguard */
      box(B.dark, 2.14, 2.20, s * 0.98 - 0.03, s * 0.98 + 0.03, 1.00, 1.08);
      cylX(B.dark, 2.14, 2.24, s * 0.98, 1.14, 0.07, 12);
      cylX(B.lamp, 2.24, 2.25, s * 0.98, 1.14, 0.06, 12);
      bar(B.dark, [2.12, s * 0.88, 1.06], [2.30, s * 0.88, 1.20], 0.018);
      bar(B.dark, [2.12, s * 1.08, 1.06], [2.30, s * 1.08, 1.20], 0.018);
      bar(B.dark, [2.30, s * 0.88, 1.20], [2.30, s * 1.08, 1.20], 0.018);
      /* the driver's (left) and assistant driver's (right) hatch boxes on the nose, each with a vision
         port facing forward [P48] */
      var hz0 = m8Top(1.82), hz1 = m8Top(1.24);
      hexa(B.paint, [[1.24, s * 0.12, hz1 - 0.02], [1.84, s * 0.12, hz0 - 0.02], [1.84, s * 0.68, hz0 - 0.02], [1.24, s * 0.68, hz1 - 0.02],
                     [1.24, s * 0.12, hz1 + 0.14], [1.84, s * 0.12, hz0 + 0.14], [1.84, s * 0.68, hz0 + 0.14], [1.24, s * 0.68, hz1 + 0.14]]);
      box(B.glass, 1.84, 1.85, s * 0.22, s * 0.58, hz0 + 0.04, hz0 + 0.10);
      box(B.dark, 1.84, 1.87, s * 0.18, s * 0.62, hz0 + 0.11, hz0 + 0.13);
      cylY(B.dark, 1.26, s * 0.16, s * 0.64, hz1 + 0.14, 0.025, 8);
      /* the two tow shackles on the lower nose (no bumper bar in [P48]) */
      box(B.dark, 2.36, 2.48, s * 0.43 - 0.05, s * 0.43 + 0.05, 0.56, 0.68);
      cyl(B.dark, [2.48, s * 0.43, 0.56], [2.48, s * 0.43, 0.68], 0.05, 0.05, 8);
            
    }
    /* the nose plate's seam and the transmission access plate on the glacis */
    var gU = unit([M8.nose - 1.86, 0, 0.99 - 1.36]), gN = unit([1.36 - 0.99, 0, M8.nose - 1.86]);
    trap(B.paint, [1.86, 0, 1.36], gU, gN, 0.08, 0.50, 0.52, 0.52, 0.0, 0.02);
    for (i = 0; i < 4; i++) trap(B.dark, [1.86, 0, 1.36], gU, gN, 0.12 + i * 0.11, 0.135 + i * 0.11, 0.45, 0.45, 0.02, 0.03);
  }
  function m8Deck(B) {
    var D = M8.deck, i, s;
    /* the engine deck: the grille over the radiator at the tail, the hatch ahead of it */
    box(B.paint, -2.20, -1.30, -0.66, 0.66, D, D + 0.04);
    for (i = 0; i < 7; i++) box(B.dark, -2.14 + i * 0.12, -2.08 + i * 0.12, -0.60, 0.60, D + 0.04, D + 0.05);
    box(B.paint, -1.22, -0.72, -0.56, 0.56, D, D + 0.035);
    box(B.dark, -1.22, -0.72, -0.01, 0.01, D + 0.035, D + 0.045);
    /* C.team: a short strip on the hatch lid */
    box(B.team, -1.16, -0.80, 0.12, 0.48, D + 0.036, D + 0.05);
    /* the rear plate's tail lamps and the tow pintle */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, M8.tail - 0.04, M8.tail, s * 0.62 - 0.06, s * 0.62 + 0.06, 1.06, 1.14);
      box(B.lamp, M8.tail - 0.045, M8.tail - 0.04, s * 0.62 - 0.04, s * 0.62 + 0.04, 1.08, 1.12);
    }
    /* the turret ring's base on the deck */
    cylZ(B.dark, M8.TX, 0, D - 0.01, D + 0.03, 0.78, 24);
    /* the whip antenna on the port deck behind the turret [M8S] */
    cylZ(B.dark, -0.88, 0.80, D, D + 0.08, 0.05, 8);
    bar(B.dark, [-0.88, 0.80, D + 0.08], [-0.94, 0.80, 3.20], 0.012);
  }
  function m8Under(B) {
    var s, i, x;
    for (i = 0; i < 3; i++) {
      x = M8.AX[i];
      cylY(B.dark, x, -M8.TRK + 0.14, M8.TRK - 0.14, M8.R, 0.06, 10);
      box(B.dark, x - 0.16, x + 0.16, -0.18, 0.18, M8.R - 0.16, M8.R + 0.12);
    }
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, M8.AX[2] - 0.10, M8.AX[1] + 0.10, s * 0.62, s * 0.72, M8.R + 0.08, M8.R + 0.16);
      box(B.dark, M8.AX[0] - 0.45, M8.AX[0] + 0.45, s * 0.62, s * 0.72, M8.R + 0.10, M8.R + 0.16);
    }
  }
  /* the open turret: a round sloped wall, the mantlet with the 37 mm M6 and the coaxial .30 (right),
     the breech and seats inside; origin on the ring centre at deck level */
  function m8Turret(B) {
    var N = 24, rb = 0.74, rt = 0.64, H = 0.50, tk = 0.03, i, rings = [];
    var outer = [], inner = [];
    for (i = 0; i < N; i++) {
      var a = (i + 0.5) / N * TAU, c = Math.cos(a), s = Math.sin(a);
      /* the front is flatter: pull the forward facets back toward a chord */
      var fb = c > 0.80 ? (0.80 / c) : 1;
      outer.push([c * rb * fb, s * rb * fb, c * rt * fb, s * rt * fb]);
    }
    for (i = 0; i < N; i++) {
      var o = outer[i], o2 = outer[(i + 1) % N];
      hexa(B.paint, [[o[0], o[1], 0], [o2[0], o2[1], 0], [o2[0] * (1 - tk / rb), o2[1] * (1 - tk / rb), 0], [o[0] * (1 - tk / rb), o[1] * (1 - tk / rb), 0],
                     [o[2], o[3], H], [o2[2], o2[3], H], [o2[2] * (1 - tk / rt), o2[3] * (1 - tk / rt), H], [o[2] * (1 - tk / rt), o[3] * (1 - tk / rt), H]]);
    }
    /* the turret floor and the crew's seats, seen through the open top */
    cylZ(B.dark, 0, 0, 0.02, 0.05, rb - 0.04, 20);
    box(B.paint, -0.35, -0.10, 0.18, 0.42, 0.05, 0.28);
    box(B.paint, -0.35, -0.10, -0.42, -0.18, 0.05, 0.28);
    /* the mantlet (the M23A1 combination mount's shield) and the gun */
    box(B.paint, 0.50, 0.74, -0.24, 0.24, 0.14, 0.44);
    cyl(B.paint, [0.74, 0, 0.29], [0.86, 0, 0.29], 0.10, 0.08, 14);
    cylX(B.dark, 0.86, 1.10, 0, 0.29, 0.048, 12);
    cylX(B.dark, 1.10, 2.18, 0, 0.29, 0.030, 12);
    cylX(B.dark, 2.18, 2.24, 0, 0.29, 0.036, 12);
    box(B.dark, -0.20, 0.50, -0.10, 0.10, 0.20, 0.38);
    /* the coaxial .30 M1919A4, right of the 37 mm */
    cylX(B.dark, 0.74, 1.14, -0.15, 0.30, 0.016, 8);
    cylX(B.dark, 0.74, 0.80, -0.15, 0.30, 0.03, 8);
    box(B.dark, 0.10, 0.50, -0.19, -0.11, 0.24, 0.34);
    /* the sight and the ammunition racks on the inside wall */
    box(B.dark, 0.48, 0.60, 0.14, 0.20, 0.30, 0.42);
    box(B.paint, -0.62, -0.40, -0.22, 0.22, 0.10, 0.38);
  }
  function m8(THREE, M, C) {
    var T = materials(THREE, C, 8801), g = new THREE.Group(), B = bins(T), i, dw = dpWeather(THREE, T.paint.map, OD, 8801);
    if (dw) T.paint.map = dw;
    g.name = "m8_greyhound";
    m8Hull(B); m8Side(B); m8Deck(B); m8Under(B); m8Detail(B);
    flush(THREE, g, B);
    for (i = 0; i < 3; i++) {
      g.add(axleGroup(THREE, T, M8.AX[i], M8.R, function (VB) {
        tyre(VB, M8.TRK, 1, M8.R, M8.TW, 16, 0.035, 0.57, 8, 0.15, 0);
        tyre(VB, -M8.TRK, -1, M8.R, M8.TW, 16, 0.035, 0.57, 8, 0.15, 0.5);
      }));
    }
    var tt = new THREE.Group(), TB = bins(T);
    tt.name = "turret";
    tt.position.set(M8.TX, 0, M8.deck);
    m8Turret(TB);
    m8TurretDetail(TB);
    flush(THREE, tt, TB);
    g.add(tt);
    return g;
  }

  /* ======================================================================
     M151A1 MUTT
     ====================================================================== */
  var J = { XF: 1.30, XR: -0.86, R: 0.37, HW: 0.79, TR: 0.673, tail: -1.41, grille: 1.66, bon: 1.08, belt: 0.90, cowl: 0.77, MX: -0.40, MZ: 1.82 };
  function m151Body(B) {
    var s, i, k, h = J.HW;
    /* the body sides: one pressed panel each, both arches cut round-topped, belt line 0.86, the
       bonnet side up to 1.05 [JS] */
    var pts = [[J.tail, 0.40]].concat(arc(J.XR, 0.40, 0.44, 180, 0, 10)).concat(arc(J.XF, 0.40, 0.44, 180, 30, 8))
              .concat([[J.grille, 0.62], [J.grille, 0.98], [J.grille - 0.04, J.bon], [J.cowl, J.bon], [J.cowl, J.belt], [J.tail, J.belt]]);
    for (s = -1; s <= 1; s += 2) {
      prism(B.paint, pts, s > 0 ? h - 0.035 : -h, s > 0 ? h : -h + 0.035);
      /* the rolled top edge of the tub and the side's pressed stiffening rib */
      cylX(B.paint, J.tail, J.cowl, s * (h - 0.01), J.belt, 0.022, 8);
      box(B.paint, -0.40, 0.88, s * (h - 0.002), s * (h + 0.012), 0.60, 0.635);
      /* the step notch's grab handle on the cowl side */
      bar(B.dark, [0.62, s * (h + 0.0), 0.95], [0.62, s * (h + 0.02), 0.95], 0.022);
    }
    /* floor, tail panel, cowl bulkhead and dash */
    box(B.dark, J.tail, J.cowl, -h, h, 0.40, 0.45);
    box(B.paint, J.tail - 0.035, J.tail, -h, h, 0.40, J.belt);
    box(B.paint, J.cowl - 0.07, J.cowl, -h, h, 0.45, J.bon - 0.02);
    box(B.dark, 0.60, J.cowl - 0.07, -0.74, 0.74, 0.82, 0.98);
    /* the flat bonnet and fender tops, one plane, a slight crown on the bonnet panel, its hinge and
       hold-down catches; the vent strip at its rear edge */
    var rings = [], X = [J.cowl, 1.20, J.grille - 0.04];
    for (i = 0; i < X.length; i++) {
      var x = X[i];
      rings.push([[x, -h, 0.95], [x, h, 0.95], [x, h, J.bon - 0.01], [x, h - 0.03, J.bon], [x, 0.40, J.bon + 0.012],
                  [x, -0.40, J.bon + 0.012], [x, -h + 0.03, J.bon], [x, -h, J.bon - 0.01]]);
    }
    loft(B.paint, rings, false);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.80, 1.62, s * 0.455, s * 0.465, J.bon + 0.005, J.bon + 0.016);
      box(B.dark, 1.10, 1.16, s * 0.79, s * 0.805, 0.98, 1.06);
    }
    /* the grille panel: a dark recess with horizontal slats, the round headlamps set in it at the
       ends, the small A1 turn lamps on the fender tops */
    box(B.paint, J.grille - 0.04, J.grille, -h, h, 0.58, J.bon - 0.01);
    box(B.dark, J.grille, J.grille + 0.01, -0.40, 0.40, 0.64, 0.98);
    for (i = 0; i < 6; i++) box(B.paint, J.grille + 0.01, J.grille + 0.03, -0.38, 0.38, 0.665 + i * 0.054, 0.69 + i * 0.054);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.paint, J.grille, J.grille + 0.04, s * 0.58, 0.82, 0.10, 16);
      cylX(B.dark, J.grille + 0.04, J.grille + 0.05, s * 0.58, 0.82, 0.085, 16);
      cylX(B.lamp, J.grille + 0.035, J.grille + 0.045, s * 0.58, 0.82, 0.075, 16);
      box(B.lamp, 1.50, 1.58, s * 0.70 - 0.035, s * 0.70 + 0.035, J.bon, J.bon + 0.035);
      box(B.lamp, J.grille, J.grille + 0.03, s * 0.58 - 0.03, s * 0.58 + 0.03, 0.66, 0.70);
    }
    /* the bumper: a channel across the frame horns, its ends, two lifting shackles; the tail's
       bumperettes and the towing pintle */
    box(B.dark, J.grille + 0.02, 1.72, -0.79, 0.79, 0.42, 0.55);
    for (s = -1; s <= 1; s += 2) {
      cyl(B.dark, [1.69, s * 0.46, 0.55], [1.69, s * 0.46, 0.63], 0.035, 0.035, 8);
      box(B.dark, J.tail - 0.08, J.tail, s * 0.52, s * 0.72, 0.42, 0.52);
    }
    box(B.dark, J.tail - 0.12, J.tail, -0.05, 0.05, 0.44, 0.52);
    /* chassis cross-members and the independent suspension's lower arms */
    for (k = 0; k < 2; k++) {
      var ax = [J.XF, J.XR][k];
      box(B.dark, ax - 0.10, ax + 0.10, -0.50, 0.50, 0.30, 0.40);
      for (s = -1; s <= 1; s += 2) bar(B.dark, [ax, s * 0.30, 0.33], [ax, s * 0.58, J.R], 0.05);
    }
  }
  function m151Interior(B) {
    var s;
    /* two front bucket seats (cushion and back), the rear bench across the tail */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.10, 0.20, s * 0.10, s * 0.60, 0.45, 0.58);
      box(B.dark, -0.10, 0.22, s * 0.12, s * 0.58, 0.58, 0.66);
      hexa(B.dark, [[-0.16, s * 0.12, 0.62], [-0.08, s * 0.12, 0.62], [-0.08, s * 0.58, 0.62], [-0.16, s * 0.58, 0.62],
                    [-0.24, s * 0.12, 1.02], [-0.16, s * 0.12, 1.02], [-0.16, s * 0.58, 1.02], [-0.24, s * 0.58, 1.02]]);
      box(B.paint, -0.20, -0.14, s * 0.14, s * 0.56, 0.45, 0.62);
    }
    box(B.paint, -1.32, -0.95, -0.66, 0.66, 0.45, 0.58);
    box(B.dark, -1.32, -0.95, -0.64, 0.64, 0.58, 0.64);
    box(B.dark, -1.40, -1.32, -0.64, 0.64, 0.64, 0.92);
    /* the wheel arches inside the tub (the rear ones under the bench ends) */
    for (s = -1; s <= 1; s += 2) box(B.paint, J.XR - 0.42, J.XR + 0.42, s * 0.52, s * 0.76, 0.45, 0.84);
    /* steering wheel and column, driver on the left */
    cyl(B.dark, [0.48, 0.36, 0.95], [0.495, 0.36, 0.965], 0.18, 0.18, 16, true, true);
    bar(B.dark, [0.64, 0.36, 0.80], [0.49, 0.36, 0.955], 0.035);
    box(B.dark, 0.44, 0.52, 0.34, 0.38, 0.93, 0.98);
    /* the gear levers in the tunnel between the seats */
    box(B.dark, 0.05, 0.60, -0.10, 0.10, 0.45, 0.58);
    bar(B.dark, [0.40, 0.0, 0.58], [0.34, 0.03, 0.82], 0.02);
  }
  function m151Fitments(B) {
    var s, i;
    /* the windscreen folded forward flat on the bonnet [J67]: frame, two panes, the hinges at the cowl
       and its rubber stops on the bonnet */
    var z = J.bon + 0.045;
    box(B.dark, J.cowl + 0.02, J.cowl + 0.50, -0.76, -0.72, z - 0.02, z + 0.02);
    box(B.dark, J.cowl + 0.02, J.cowl + 0.50, 0.72, 0.76, z - 0.02, z + 0.02);
    box(B.dark, J.cowl + 0.02, J.cowl + 0.50, -0.02, 0.02, z - 0.02, z + 0.02);
    box(B.dark, J.cowl + 0.46, J.cowl + 0.50, -0.76, 0.76, z - 0.02, z + 0.02);
    box(B.dark, J.cowl + 0.02, J.cowl + 0.06, -0.76, 0.76, z - 0.02, z + 0.02);
    box(B.glass, J.cowl + 0.06, J.cowl + 0.46, -0.72, 0.72, z - 0.01, z + 0.005);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, J.cowl - 0.03, J.cowl + 0.04, s * 0.70, s * 0.78, J.bon - 0.02, z + 0.02);
      box(B.dark, J.cowl + 0.52, J.cowl + 0.58, s * 0.62, s * 0.70, J.bon, J.bon + 0.03);
    }
    /* the spare wheel on the tail (port half) on its carrier */
    box(B.dark, J.tail - 0.06, J.tail, 0.20, 0.56, 0.62, 0.70);
    /* the whip on its bracket at the rear port corner [J67] */
    box(B.dark, J.tail - 0.10, J.tail, 0.66, 0.78, 0.70, 0.84);
    cylZ(B.dark, J.tail - 0.06, 0.72, 0.84, 0.94, 0.04, 8);
    bar(B.dark, [J.tail - 0.06, 0.72, 0.94], [J.tail - 0.10, 0.72, 3.00], 0.012);
    /* the post that carries the M60, from the floor behind the front seats [J67], braced to the floor */
    box(B.dark, J.MX - 0.12, J.MX + 0.12, -0.12, 0.12, 0.45, 0.48);
    if (DRAW_M151_MG) {
      cylZ(B.dark, J.MX, 0, 0.48, J.MZ, 0.035, 10);
      for (i = 0; i < 3; i++) {
        var a = i / 3 * TAU + 0.5;
        bar(B.dark, [J.MX + Math.cos(a) * 0.20, Math.sin(a) * 0.20, 0.47], [J.MX, 0, 0.80], 0.025);
      }
    }
  }
  function m151Spare(VB) {
    /* the spare, lathed about Y, turned onto the tail by the caller */
    tyre(VB, 0, 1, J.R, 0.19, 18, 0.025, 0.52, 5, 0.4, 0);
  }
  function m151Gun(B) {
    var d = B.dark, x0 = 0.0, z0 = 0.12;
    /* the swivel head and cradle on the post */
    cylZ(d, 0, 0, -0.04, 0.05, 0.05, 10);
    box(d, -0.08, 0.14, -0.045, 0.045, 0.04, 0.08);
    /* the M60: receiver, feed cover, butt stock, pistol grip, barrel with its gas cylinder, bipod
       folded, the flash hider, the ammunition box on the left */
    box(d, x0 - 0.12, x0 + 0.22, -0.045, 0.045, z0 - 0.05, z0 + 0.05);
    box(d, x0 - 0.02, x0 + 0.15, -0.042, 0.042, z0 + 0.05, z0 + 0.075);
    box(d, x0 - 0.48, x0 - 0.12, -0.026, 0.026, z0 - 0.06, z0 + 0.03);
    box(d, x0 - 0.06, x0 - 0.02, -0.02, 0.02, z0 - 0.13, z0 - 0.05);
    cylX(d, x0 + 0.22, x0 + 0.78, 0, z0 + 0.01, 0.012, 8);
    cylX(d, x0 + 0.22, x0 + 0.58, 0, z0 - 0.025, 0.010, 6);
    cylX(d, x0 + 0.78, x0 + 0.85, 0, z0 + 0.01, 0.018, 8);
    bar(d, [x0 + 0.62, 0.01, z0 - 0.025], [x0 + 0.40, 0.03, z0 - 0.05], 0.012);
    bar(d, [x0 + 0.62, -0.01, z0 - 0.025], [x0 + 0.40, -0.03, z0 - 0.05], 0.012);
    box(B.paint, x0 - 0.02, x0 + 0.16, 0.05, 0.14, z0 - 0.14, z0 + 0.04);
  }
  function m151(THREE, M, C) {
    var T = materials(THREE, C, 15101), g = new THREE.Group(), B = bins(T), dw = dpWeather(THREE, T.paint.map, OD, 15101);
    if (dw) T.paint.map = dw;
    g.name = "m151a1_mutt";
    m151Body(B); m151Interior(B); m151Fitments(B); m151Detail(B);
    /* C.team: a short strip on the bonnet's rear, facing up */
    box(B.team, 1.30, 1.56, -0.30, 0.30, J.bon + 0.013, J.bon + 0.026);
    flush(THREE, g, B);
    /* the spare wheel, standing against the tail panel (static) */
    var VS = new VBin(T.wheel);
    m151Spare(VS);
    var gs = new THREE.BufferGeometry(), P = VS.P, i;
    var P2 = new Float32Array(P.length), N2 = new Float32Array(VS.N.length);
    for (i = 0; i < P.length; i += 3) {
      /* local Y (axle) -> -X; then put it at the tail */
      P2[i] = -P[i + 1] + J.tail - 0.125; P2[i + 1] = P[i] + 0.38; P2[i + 2] = P[i + 2] + 1.00;
      N2[i] = -VS.N[i + 1]; N2[i + 1] = VS.N[i]; N2[i + 2] = VS.N[i + 2];
    }
    gs.setAttribute("position", new THREE.BufferAttribute(P2, 3));
    gs.setAttribute("normal", new THREE.BufferAttribute(N2, 3));
    gs.setAttribute("color", new THREE.BufferAttribute(new Float32Array(VS.C), 3));
    var sm = new THREE.Mesh(gs, T.wheel);
    sm.castShadow = true; sm.receiveShadow = true;
    g.add(sm);
    var k;
    for (k = 0; k < 2; k++) {
      g.add(axleGroup(THREE, T, [J.XF, J.XR][k], J.R, function (VB) {
        tyre(VB, J.TR, 1, J.R, 0.19, 18, 0.025, 0.52, 5, 0.4, 0);
        tyre(VB, -J.TR, -1, J.R, 0.19, 18, 0.025, 0.52, 5, 0.4, 0.5);
      }));
    }
    var tt = new THREE.Group(), TB = bins(T);
    tt.name = "turret";
    tt.position.set(J.MX, 0, J.MZ);
    if (DRAW_M151_MG) m151Gun(TB);
    flush(THREE, tt, TB);
    g.add(tt);
    return g;
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
  /* DETAIL PASS 2: the weathered paint.  The module's own paint canvas (or a flat base colour) drawn
     onto a 512 px tile, then plate seams with a lit edge, bolt rows along some of them, access-panel
     outlines with corner screws, rain streaks, grime and dust, chipped paint and oil spots.  Plain
     paint: no markings, numbers or camouflage.  Cached per source. */
  var __DPW = {};
  function dpWeather(THREE, src, base, seed) {
    var key = (src && src.uuid ? src.uuid : "flat") + "|" + base + "|" + seed;
    if (__DPW[key] !== undefined) return __DPW[key];
    var t = null;
    try {
      var S = 512, cv = document.createElement("canvas"), q, i, k, x, y, w, h, n, xs = [];
      var rs = (seed * 7 + 13) >>> 0, R = function () { rs = (Math.imul(rs, 1664525) + 1013904223) >>> 0; return rs / 4294967296; };
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = base || "#555544"; q.fillRect(0, 0, S, S);
      if (src && src.image) { try { q.drawImage(src.image, 0, 0, S, S); } catch (e) { /* flat base */ } }
      /* plate seams: four vertical butts, horizontal seams staggered between them, a bolt row on some */
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
          if ((i + k) % 2 === 0) for (x = xa + 8; x < xb - 4; x += 15) {
            q.fillStyle = "rgba(12,12,8,0.45)"; q.fillRect(x % S, y - 6, 3, 3);
            q.fillStyle = "rgba(255,250,225,0.18)"; q.fillRect(x % S, y - 7, 2, 1);
          }
          y = (y + 200 + Math.floor(R() * 60)) % S;
        }
      }
      /* access panels, a screw at each corner */
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * (S - 90)) + 10.5; y = Math.floor(R() * (S - 70)) + 10.5; w = 26 + Math.floor(R() * 60); h = 18 + Math.floor(R() * 44);
        q.strokeStyle = "rgba(14,15,10,0.36)"; q.lineWidth = 1.5; q.strokeRect(x, y, w, h);
        q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1; q.strokeRect(x + 1.5, y + 1.5, w, h);
        q.fillStyle = "rgba(12,12,8,0.5)";
        q.fillRect(x + 3, y + 3, 2, 2); q.fillRect(x + w - 5, y + 3, 2, 2); q.fillRect(x + 3, y + h - 5, 2, 2); q.fillRect(x + w - 5, y + h - 5, 2, 2);
      }
      /* rain streaks, grime and dust, chips and scratches, oil spots */
      for (i = 0; i < 260; i++) { q.fillStyle = (i % 4) ? "rgba(18,16,10,0.08)" : "rgba(230,225,200,0.06)"; q.fillRect(R() * S, R() * S, 1 + R() * 2, 8 + R() * 54); }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 3) ? "rgba(30,25,15,0.08)" : "rgba(150,135,100,0.08)";
        q.beginPath(); q.ellipse(R() * S, R() * S, 8 + R() * 46, 4 + R() * 22, R() * Math.PI, 0, 2 * Math.PI); q.fill();
      }
      for (i = 0; i < 180; i++) { q.fillStyle = (i % 2) ? "rgba(205,200,175,0.22)" : "rgba(10,10,8,0.30)"; n = 1 + Math.floor(R() * 3); q.fillRect(R() * S, R() * S, n, n); }
      q.strokeStyle = "rgba(210,205,180,0.14)"; q.lineWidth = 1;
      for (i = 0; i < 14; i++) { x = R() * S; y = R() * S; q.beginPath(); q.moveTo(x, y); q.lineTo(x + (R() - 0.5) * 40, y + (R() - 0.5) * 14); q.stroke(); }
      for (i = 0; i < 8; i++) { q.fillStyle = "rgba(12,10,6,0.16)"; q.beginPath(); q.ellipse(R() * S, R() * S, 5 + R() * 12, 4 + R() * 9, 0, 0, 2 * Math.PI); q.fill(); }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (src && src.repeat && t.repeat) t.repeat.copy(src.repeat);
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    __DPW[key] = t;
    return t;
  }
  /* ======================================================================
     DETAIL PASS 2 (M8 and M151 only; the M59 is untouched).  The fittings the first pass left out,
     classes [P48][M8S][JS][J67] show on these types (places and sizes by proportion, NOT CONFIRMED):
     M8 - the bedrolls strapped on the side boxes, the boxes' lid hinges and handles, grab handles, the
     engine deck's hinges and lifting eyes, the hatches' handles, the bolt ring round the turret's rim,
     the pick and shovel on the glacis sides, the guards over the tail lamps.  M151 - the jerrycan on its
     bracket at the tail, the folded canvas top rolled behind the bench, a rucksack on the rear floor,
     the axe and shovel on the body side, the mirrors, tie-down rings and the hood's catches.  The paint
     takes dpWeather.
     ====================================================================== */
  var DPK = dpKit(box, cyl);
  function m8Detail(B) {
    var DP = DPK, P = B.paint, D = B.dark, s, i;
    for (s = -1; s <= 1; s += 2) {
      var yo = s * 1.27;
      /* the bedrolls on the rear box and the lid hinge, its handles */
      DP.roll(P, D, -2.35, -0.15, s * 1.12, 1.46, 0.10);
      DP.hingeTop(D, -2.42, -0.02, s * 1.02, s * 1.02, 1.36);
      DP.grab(D, s, yo, -1.90, -1.65, 1.18);
      DP.grab(D, s, yo, -0.70, -0.45, 1.18);
      /* the ribbed bin's lid hinge and catch */
      DP.hingeTop(D, 0.10, 1.10, s * 1.02, s * 1.02, 1.36);
      box(D, 0.55, 0.62, s > 0 ? 1.27 : -1.30, s > 0 ? 1.30 : -1.27, 1.22, 1.32);
      /* lifting eyes on the deck corners, grab handles on the deck edge */
      DP.eye(D, -2.20, s * 0.85, M8.deck); DP.eye(D, 0.95, s * 0.85, M8.deck);
      DP.grabTop(D, -1.60, -1.30, s * 0.80, s * 0.80, M8.deck);
      /* the guards over the tail lamps */
      DP.guard(D, M8.tail + 0.01, s * 0.62, 1.10, 0.05, -1);
      /* the pick and shovel on the mudguards */
      DP.toolTop(P, D, s > 0 ? "shovel" : "axe", 1.20, 1.85, s * 1.10, 1.30);
    }
    /* the engine deck hatch's hinges and handle, the grille's frame bolts */
    DP.hingeTop(D, -0.74, -0.74, -0.50, 0.50, M8.deck + 0.035);
    DP.grabTop(D, -1.15, -0.95, -0.30, -0.30, M8.deck + 0.035);
    DP.boltsTop(D, -2.18, -1.32, 8, 0.64, 0.64, M8.deck + 0.04, 0.012);
    DP.boltsTop(D, -2.18, -1.32, 8, -0.64, -0.64, M8.deck + 0.04, 0.012);
    /* the drivers' hatches' handles */
    for (s = -1; s <= 1; s += 2) DP.grabTop(D, 1.50, 1.65, s * 0.40, s * 0.40, m8Top(1.57) + 0.14);
  }
  function m8TurretDetail(B) {
    var D = B.dark, P = B.paint, i, a;
    /* the bolt ring round the rim and the wall's lifting eyes */
    for (i = 0; i < 20; i++) { a = (i + 0.5) / 20 * TAU; if (Math.cos(a) > 0.80) continue; cylZ(D, Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0.50, 0.52, 0.014, 6); }
    for (i = 0; i < 18; i++) { a = (i + 0.5) / 18 * TAU; if (Math.cos(a) > 0.80) continue; cylZ(D, Math.cos(a) * 0.72, Math.sin(a) * 0.72, 0.03, 0.05, 0.014, 6); }
    /* the bedroll strapped round the rear of the wall */
    DPK.rollY(P, D, -0.74, -0.40, 0.40, 0.30, 0.08);
  }
  function m151Detail(B) {
    var DP = DPK, P = B.paint, D = B.dark, s, h = J.HW;
    /* the jerrycan in its bracket on the tail, right half */
    box(P, J.tail - 0.20, J.tail - 0.035, -0.56, -0.22, 0.52, 0.99);
    box(D, J.tail - 0.21, J.tail - 0.035, -0.58, -0.20, 0.72, 0.75);
    for (var k = 0; k < 3; k++) box(D, J.tail - 0.16, J.tail - 0.08, -0.45 + k * 0.08, -0.43 + k * 0.08, 0.99, 1.02);
    /* the folded top rolled on the bench back, a rucksack on the rear floor */
    DP.rollY(P, D, -1.36, -0.62, 0.62, 0.98, 0.07);
    DP.bags(P, D, -0.90, -0.40, 0.20, 0.60, 0.45, 0.38, 41);
    for (s = -1; s <= 1; s += 2) {
      /* the mirrors on the cowl, tie-down rings, the hood catches' straps */
      DP.bar(D, [J.cowl - 0.02, s * h, 0.95], [J.cowl - 0.02, s * (h + 0.12), 1.20], 0.012, 4);
      box(D, J.cowl - 0.05, J.cowl + 0.01, s * (h + 0.08) - 0.07, s * (h + 0.08) + 0.07, 1.16, 1.28);
      DP.eye(D, J.tail + 0.10, s * (h - 0.05), J.belt, true);
      DP.bolts(D, J.cowl + 0.05, J.grille - 0.10, 7, s * h, J.bon - 0.03, s, 0.010);
    }
    /* the axe and shovel on the left side below the tub's edge */
    DP.tool(P, D, "shovel", -1.20, -0.30, h, 0.70, 1);
    DP.tool(P, D, "axe", 0.00, 0.55, h, 0.72, 1);
  }
  return { m59: m59, m8: m8, m151: m151 };
})();

/* len is the measured X extent of each (dump.js): the M59 from the ramp hinge to the trim vane (5.63;
   published 5.61), the M8 from the tail lamps to the tow shackles (5.08), the M151 from the spare wheel's
   hub to the front bumper (3.39; published 3.37). */
UNIT_MODELS["nato_e50_ifv"] = { len: 5.63, build: HeroEarlyLight.m59 };
UNIT_MODELS["nato_e50_recon"] = { len: 5.08, build: HeroEarlyLight.m8 };
UNIT_MODELS["nato_e60_recon"] = { len: 3.39, build: HeroEarlyLight.m151 };
