/* ============ us_m113.js - HERO models: the M113 family in US Army service ============
   One aluminium box hull, four builds, six rows (REDO 2026-10-24, full-quality procedure):
     nato_e60_ifv           M113 ACAV            (Vietnam, 1966-)  olive drab           turret:true  (the .50 shield)
     nato_e60_tankdestroyer M113A1 with M220 TOW (1973)            olive drab           turret:false (fixed launcher)
     nato_e80_tankdestroyer M901 ITV             (1979-)           MERDC woodland       turret:true  (M27 cupola)
     nato_e90_tankdestroyer M901A1 ITV           (1991)            desert tan CARC      turret:true
     nato_e60_spaag         M163 VADS            (1968-)           olive drab           turret:true  (M168 turret)
     nato_e80_spaag         M163 VADS            (1980s)           MERDC woodland       turret:true

   REFERENCES (Wikimedia Commons, width 960, cached in scratchpad q_m113_ref / q_m113_ref2):
     D1 "M113A3 side.gif" - US Government side drawing (bow LEFT): the hull profile, measured into the
        station table below: one 44 deg glacis plane from the nose edge to the roof, the short rounded
        lower nose, the flat roof, the horizontal ledge along the side, the skirt down to just above
        the road wheels, five road wheels, the sprocket under the nose, the idler at the rear.  The
        A3's external rear fuel tanks are NOT drawn (no row is an A3); the A1 rear plate is put at
        the published 4.863 m, where the drawing's side panel ends.
     D2 "M113.svg" - a Commons side outline (also an A3): used only to confirm D1's glacis line.
     A1 "Troop A, 11th Armored Cavalry Regiment M113 ACAV near Long Binh.jpg" - front 3/4: the trim vane
        folded over the glacis, the lamp clusters on its top corners, the .50 shield (a flat front plate,
        side plates swept back) right of the centre line behind the engine deck, a side gunner's shield.
     A2 "1st Squadron, 11th Armored Cavalry Regiment soldier keeps watch as an M113 ACAV crosses a ditch.jpg"
        - the side: five road wheels, no return rollers, the plain flank and its ledge, the shields.
     A3 "US M113 ACAV Vietnam.jpg" - 3/4 from the right front: both side M60 shields at the front corners of
        the cargo hatch, the commander's shield, the whip aerial at the rear.
     V1 "M163 VADS.JPEG" (desert-tan M163 at the NTC) - the M168 turret over the rear half of the roof: the
        six-barrel gun on its right, the gunner centre under a tube frame, the ranging radar dish and an
        upright cylinder high at the turret's rear, a box on the rear deck.
     V2 "M163 VADS in transit during exercise REFORGER '85, Germany.jpg" - MERDC woodland on the M163 in
        1985; the trim vane with the driver's window; the turret under covers (shape not used).
     V3 "NARA 111-CCV-50-CC58293 M163 Vulcan carriers ... Vietnam 1969.jpg" - olive drab in 1969.
     V4 "M163-VADS-fort-bliss-1.jpg" - the radar dish high at the turret rear, the gun forward.
     T1 "U.S. Army M-901 Improved TOW Vehicle (ITV, aka Hammerhead) starboard forward quarter" (museum) and
        T4 "An M901 improved TOW vehicle ... Georgia National Guard ... COMPANY TEAM DEFENSE.jpg" - the
        launcher STOWED: the head folded back and down behind the cupola, the two round hatch lids.
     T2 "Two M901 Improved TOW Vehicles deployed into firing positions during exercise REFORGER '85.jpg" and
        T3 "M901 TOW missile vehicle (1985).JPEG" - the head RAISED on its arm over the cupola: the
        "hammerhead", a launch box each side of the sight, on the centre line; MERDC paint in 1985.
     T5 "TOW missile vehicles.jpg" - the M220 TOW on its pedestal over the rear of an M113 roof, tube forward.

   RECOGNITION LIST (each one drawn, where it shows):
     1  the tall slab-sided box with ONE long glacis plane from the nose to the roof (D1, A1)      -> STATIONS loft
     2  the trim vane folded flat over the glacis, hinge brackets at its foot; the 1980s vane with the
        driver's window (A1, V2, V1)                                                                -> trimVane()
     3  two-lamp clusters in guards on the top corners of the glacis (A1, V1, T4)                  -> lamps
     4  five road wheels, no return rollers, the toothed sprocket at the FRONT under the nose, the
        idler at the rear; the track resting on the wheel tops (D1, A2, T4)                        -> running()
     5  the side ledge and the skirt hanging to just above the wheels (D1, T1, T4)                 -> loft + lip
     6  driver's hatch front LEFT with its periscopes, the engine grille front RIGHT (D1, A1)        -> roof()
     7  the vertical tail with the ramp and its inset door (D1, T5)                                -> tail()
     8  ACAV: the .50 behind its swept shield on the commander's cupola, a shielded M60 each side of
        the cargo hatch (A1, A2, A3)                                                               -> "turret"
     9  M113A1 TOW: the M220 on its pedestal over the rear roof, tube forward (T5)                  -> towLauncher()
     10 M901: the hammerhead (sight between two launch boxes) on its arm, STOWED behind the cupola on
        the march, RAISED over it to fire (T1-T4)                                                  -> "podelev"
     11 M163: the low M168 turret with the six-barrel cluster on its right, the gunner's frame, the
        radar dish high at its rear (V1, V4)                                                       -> "turret"
     12 paint by period: olive drab (A1-A3, V3), MERDC woodland (V2, T3), desert tan (V1)

   STATIONS (from D1 scaled at the published 4.863 m; x from mid-length, +X nose, z from the ground):
        x       belly z   floor z (track tunnel roof)   skirt foot z   roof/glacis z
      +2.43     0.72      0.96                            0.96           0.99     nose edge, foot of the glacis
      +2.36     0.58      0.95                            0.95           1.06
      +2.25     0.50      0.92                            0.92           1.16     over the sprocket
      +2.02     0.43      0.86                            0.70           1.38     skirt starts (D1)
      +1.50     0.41      0.76                            0.69           1.87     the glacis meets the roof
      -1.97     0.41      0.76                            0.69           1.87     skirt ends (D1)
      -2.30     0.43      0.80                            0.80           1.87
      -2.43     0.56      0.80                            0.80           1.87     rear plate
     Lower hull 1.72 m across between the tracks; sides 2.62 m, the ledge lip 2.69 m (published width
     2.686 m); roof 1.87 m (D1; 2.50 m over the .50, published); clearance 0.41 m (published).
     Road wheels x 1.40 .. -1.28 every 0.67 m (D1: 0.68; the published 2.67 m track on the ground),
     r 0.29; sprocket x 2.19 z 0.58; idler x -1.99 z 0.40 (D1); track 0.38 m wide on 2.16 m centres
     (published 15 in and 85 in).
     Turret positions: the commander's cupola x 0.55, 0.32 right of the centre line (D1 x; A1 the side);
     the M27 cupola on the centre line (T2) at mid-length (T4); the M168 turret at x -0.50 (V1, V4);
     the M220 pedestal at x -1.10, about a third of the hull from the stern (T5 by eye).
   AS DRAWN: X extent 4.92 m on every build (4.863 m published; the track round the sprocket and the ramp
     fittings add 6 cm), width 2.69 m; ACAV 2.65 m over the shield (2.50 m over the .50 published for the
     plain M113); M901 head top 2.93 m stowed and 3.42 m raised (2.94 / 3.41 published); M163 2.91 m over
     the dish (2.92 m, 115 in, the old header's figure, not re-checked).  11,490-11,822 triangles; 11
     (TOW), 14 (ACAV, M163) or 17 (M901: the head is its own node) draw calls; 4 materials.

   M901 LAUNCHER: render3d poseLauncher can only turn "podelev" about its own Y, so the head's swing from
     stowed (behind the cupola, its top 2.94 m) to raised (over the cupola, its top 3.41 m: both published)
     is drawn as a turn of 0.06 rad about a VIRTUAL hinge, placed so that turn carries the head 1.15 m
     forward and 0.47 m up (ru_shturm.js does the same).  Raised it ends 3.4 deg nose-up (T2, T3 show it
     level; a smaller turn would put the hinge further off and the raise would be no slower).  Nothing is
     drawn at the hinge.  userData.cells: one cell per launch box (mouth x, y, z, rear x in that frame).

   NOT CONFIRMED, drawn by judgement and flagged: the radar dish on the LEFT of the M163 turret (V1 shows it
     high at the rear, the side is not certain); the M163's published 2.855 m width is not explained by
     anything the photographs show, so its hull is the M113's; the cupola's lateral offset (A1 by eye);
     the M220 pedestal x (T5 by eye); the M901A1 desert tan (the row's 1991 text, no dated photograph of
     an M901A1 was found; V1 shows the family in that tan).  NOT DRAWN: the A2/A3 features, smoke
     dischargers, stowage, crew, markings, numbers and bumper codes.
   CORRECTED against the old model: the glacis now runs in one plane from the nose edge at 0.99 m to the
     roof at x 1.50 (old: a second step at the nose); the skirt hangs to 0.69 m and the track rests on the
     wheel tops (old: the hull box sat on a 0.95 m ledge with the track loop floating); the ACAV shield
     is a flat front with swept side plates (A1), not a ring of facets; the M901 launcher is stowed on
     the march and raised to fire (old: always raised); the M163 radar is a dish high at the turret rear
     (V1, V4), not a cylinder at the front; the cargo hatch is one lid (old: two).

   PAINT (taken to about 0.8 of the sampled level for the ACES pass): olive drab #4a5235 (the US redo
     family, us_pershing.js; A1's colour slide has faded magenta and was not sampled); MERDC woodland
     forest green, field drab, sand and black as us_m270_himars.js draws it (V2, T3: 1985); desert tan
     #9a8862 from V1 (#c0af9a sunlit, #91816e shade).  No markings.
   Nodes: "turret" (ring centre, gun or launcher along +X) on the turret:true rows; "podelev" inside the
     M901 turret; seven "roadwheel" groups (five wheel stations, the sprocket, the idler; both sides each).
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM113 = (function () {
  "use strict";

  var TAU = Math.PI * 2;
  var ROOF = 1.87, HW = 1.31, HB = 0.86, XN = 2.43, XR = -2.37;
  var XW = [1.40, 0.73, 0.06, -0.61, -1.28], RW = 0.29, ZB = 0.06, ZW = ZB + RW;
  var SPR = { x: 2.14, z: 0.58, r: 0.23 }, IDL = { x: -1.99, z: 0.40, r: 0.25 };
  var TYC = 1.08, THW = 0.19;
  /* the glacis: one plane from the nose edge (XN, 0.99) to the roof (1.50, ROOF) */
  var GX0 = XN, GZ0 = 0.99, GX1 = 1.50;
  var GT = (function () { var dx = GX1 - GX0, dz = ROOF - GZ0, l = Math.sqrt(dx * dx + dz * dz); return [dx / l, 0, dz / l]; })();
  var GN = [-GT[2], 0, GT[0]];
  if (GN[0] < 0) GN = [-GN[0], 0, -GN[2]];
  var GL = Math.sqrt((GX1 - GX0) * (GX1 - GX0) + (ROOF - GZ0) * (ROOF - GZ0));
  function gz(x) { return GZ0 + (GX0 - x) * (ROOF - GZ0) / (GX0 - GX1); }

  /* paint: olive drab, MERDC woodland, CARC desert tan */
  var OD = { key: "m113_od", base: "#4a5235", blots: [["#525a3c", 9, 55], ["#40472e", 9, 45]], seed: 1966, soft: true };
  var MERDC = { key: "m113_merdc", base: "#4a5537", blots: [["#6b5b40", 9, 34], ["#a7946c", 7, 20], ["#1d1d19", 9, 10]], seed: 1979 };
  var TAN = { key: "m113_tan", base: "#9a8862", blots: [["#a39169", 9, 50], ["#8c7b57", 9, 40]], seed: 1991, soft: true };

  var VARIANTS = {
    ACAV:   { kind: "acav", paint: OD,    vane80: false },
    TOW:    { kind: "tow",  paint: OD,    vane80: false },
    ITV:    { kind: "itv",  paint: MERDC, vane80: true },
    ITV2:   { kind: "itv",  paint: TAN,   vane80: true },
    VADS60: { kind: "vads", paint: OD,    vane80: false },
    VADS80: { kind: "vads", paint: MERDC, vane80: true }
  };
  var CUP = { x: 0.55, y: -0.32 };          /* the commander's cupola (ACAV, TOW) */
  var ITVP = { x: 0.0, y: 0.0 };            /* the M27 cupola */
  var VADP = { x: -0.50, y: 0.0 };          /* the M168 turret ring */

  /* -------------------------------------------------------- geometry kit (ru_shturm.js) */
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

  /* ------------------------------------------------------------------ paint */
  var _tex = {};
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
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.07 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }

  /* ------------------------------------------------------------------ hull */
  /* one station ring: the belly between the tracks, up the tunnel wall to its roof (the floor of the
     upper box), out over the track, down the skirt, back up the flank to the roof (or the glacis) */
  function ring(x, zb, zf, zs, zt) {
    var half = [[HB, zb], [HB, zf], [HW - 0.02, zf], [HW - 0.02, zs], [HW, zs], [HW, zt - 0.025], [HW - 0.025, zt]], r = [], i;
    for (i = 0; i < half.length; i++) r.push([x, -half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) r.push([x, half[i][0], half[i][1]]);
    return r;
  }
  var STATIONS = [[XR, 0.56, 0.80, 0.80], [-2.30, 0.43, 0.80, 0.80], [-1.97, 0.41, 0.76, 0.69], [GX1, 0.41, 0.76, 0.69],
                  [2.02, 0.43, 0.86, 0.70], [2.25, 0.50, 0.92, 0.92], [2.36, 0.58, 0.95, 0.95], [XN, 0.72, 0.96, 0.96]];

  /* the track: a rope round the idler, the five wheels' bottoms, the sprocket and back over the wheel tops */
  function trackPath() {
    var C = [], k, p = [], i, A, B, d, L, rp, ph, n, n0 = null, nIn, a0, a1, da, s, m;
    for (k = XW.length - 1; k >= 0; k--) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: SPR.x, z: SPR.z, r: SPR.r + 0.02 });
    for (k = 0; k < XW.length; k++) C.push({ x: XW[k], z: ZW, r: RW });
    C.push({ x: IDL.x, z: IDL.z, r: IDL.r });
    var T = [];
    for (i = 0; i < C.length; i++) {
      A = C[i]; B = C[(i + 1) % C.length];
      d = [B.x - A.x, B.z - A.z]; L = Math.sqrt(d[0] * d[0] + d[1] * d[1]); d = [d[0] / L, d[1] / L];
      rp = [d[1], -d[0]];                                   /* right of travel = outside, for a CCW loop */
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
    /* the path runs through the wheel rims: shift it so the grousers stand on z = 0 */
    belt(B.dark, path, TYC - THW, TYC + THW);
    belt(B.dark, path, -TYC - THW, -TYC + THW);
    for (s = -1; s <= 1; s += 2) {
      /* the road wheels' rubber tyres (the discs turn in the roadwheel groups), the axle arms */
      for (k = 0; k < XW.length; k++) {
        cylY(B.dark, XW[k], s * (TYC - 0.17), s * (TYC - 0.03), ZW, RW, 18);
        cylY(B.dark, XW[k], s * (TYC + 0.03), s * (TYC + 0.17), ZW, RW, 18);
        cylY(B.dark, XW[k], s * HB, s * (TYC - 0.17), ZW, 0.06, 8);
        bar(B.dark, [XW[k], s * (HB + 0.04), ZW], [XW[k] + 0.32, s * (HB + 0.04), ZW + 0.12], 0.07);
      }
      /* sprocket hub to the final drive, idler arm */
      cylY(B.dark, SPR.x, s * (HB - 0.02), s * (TYC - 0.12), SPR.z, 0.13, 12);
      bar(B.dark, [IDL.x, s * (HB + 0.04), IDL.z], [IDL.x + 0.34, s * (HB + 0.04), IDL.z + 0.14], 0.08);
    }
  }
  /* a road-wheel station: both wheels' outer and inner discs with hub and bolts (A2, T4) */
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

  function hull(B, V) {
    var s, k, i, st = [], x, y;
    for (i = 0; i < STATIONS.length; i++) {
      x = STATIONS[i][0];
      st.push(ring(x, STATIONS[i][1], STATIONS[i][2], STATIONS[i][3], x > GX1 ? gz(x) : ROOF));
    }
    loft(B.paint, st);
    running(B);
    for (s = -1; s <= 1; s += 2) {
      /* the side ledge, a lip standing 3.5 cm off the flank (D1, T1) */
      box(B.paint, -1.97, 2.02, s > 0 ? HW - 0.01 : -HW - 0.035, s > 0 ? HW + 0.035 : -HW + 0.01, 0.965, 1.005);
      box(B.dark, -1.95, 2.00, s > 0 ? HW + 0.034 : -HW - 0.037, s > 0 ? HW + 0.037 : -HW - 0.034, 0.97, 0.98);
      /* lifting eyes along the roof edge */
      for (k = 0; k < 2; k++) box(B.dark, k ? -2.20 : 1.25, k ? -2.08 : 1.37, s * HW - 0.02, s * HW + 0.02, ROOF - 0.06, ROOF + 0.03);
      /* a row of bolt heads where the skirt meets the ledge */
      for (k = 0; k < 12; k++) {
        x = -1.85 + k * 0.33;
        box(B.dark, x - 0.02, x + 0.02, s > 0 ? HW : -HW - 0.012, s > 0 ? HW + 0.012 : -HW, 0.92, 0.95);
      }
    }
    roof(B, V);
    glacis(B, V);
    tail(B, V);
  }

  /* the glacis: the trim vane folded flat on it, its hinge brackets, the lamp clusters, the tow eyes */
  function glacis(B, V) {
    var s, k, w;
    /* the vane: a plate over most of the glacis, a stiffening rib along its top and two straps (A1) */
    onGlacis(B.paint, 0.16, GL - 0.20, -1.06, 1.06, 0.0, 0.045);
    onGlacis(B.paint, GL - 0.26, GL - 0.20, -1.04, 1.04, 0.045, 0.075);
    for (s = -1; s <= 1; s += 2) {
      onGlacis(B.dark, 0.08, 0.22, s * 0.70 - 0.08, s * 0.70 + 0.08, 0.0, 0.07);
      onGlacis(B.dark, 0.30, GL - 0.28, s * 0.40 - 0.03, s * 0.40 + 0.03, 0.045, 0.055);
    }
    /* the 1980s vane: the driver's window on the left (V1, V2) */
    if (V.vane80) {
      onGlacis(B.dark, GL - 0.62, GL - 0.34, 0.42, 0.78, 0.040, 0.052);
      onGlacis(B.glass, GL - 0.58, GL - 0.38, 0.46, 0.74, 0.052, 0.056);
    }
    /* the lamp clusters in their guards on the glacis' top corners (A1, V1, T4) */
    for (s = -1; s <= 1; s += 2) {
      w = s * (HW - 0.17);
      onGlacis(B.paint, GL - 0.34, GL - 0.02, w - 0.15, w + 0.15, 0.0, 0.10);
      for (k = 0; k < 2; k++) {
        var c = gpt(GL - 0.18, w + (k ? 0.07 : -0.07), 0.10);
        cyl(B.dark, c, [c[0] + GN[0] * 0.09, c[1], c[2] + GN[2] * 0.09], 0.068, 0.068, 12);
        cyl(B.glass, [c[0] + GN[0] * 0.09, c[1], c[2] + GN[2] * 0.09], [c[0] + GN[0] * 0.10, c[1], c[2] + GN[2] * 0.10], 0.056, 0.056, 12);
      }
      bar(B.dark, gpt(GL - 0.36, w - 0.17, 0.0), gpt(GL - 0.36, w - 0.17, 0.20), 0.018);
      bar(B.dark, gpt(GL - 0.36, w + 0.17, 0.0), gpt(GL - 0.36, w + 0.17, 0.20), 0.018);
      bar(B.dark, gpt(GL - 0.36, w - 0.17, 0.20), gpt(GL - 0.36, w + 0.17, 0.20), 0.018);
      /* tow eyes on the lower nose */
      box(B.dark, XN - 0.06, XN + 0.02, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.74, 0.84);
      cylY(B.dark, XN - 0.025, s * 0.62 - 0.065, s * 0.62 + 0.065, 0.79, 0.04, 8);
    }
    /* the seam between the glacis and the lower nose */
    box(B.dark, XN - 0.005, XN + 0.012, -HW + 0.05, HW - 0.05, 0.955, 0.975);
  }

  /* the roof: driver's hatch and periscopes front LEFT, the engine grille front RIGHT, the cargo hatch */
  function roof(B, V) {
    var k, a, s;
    /* driver's hatch (A1): a raised ring, the cover, four periscopes facing forward and to the left */
    cylZ(B.paint, 1.12, 0.62, ROOF - 0.01, ROOF + 0.08, 0.31, 18);
    cylZ(B.paint, 1.08, 0.62, ROOF + 0.08, ROOF + 0.12, 0.25, 16);
    box(B.dark, 0.80, 0.88, 0.50, 0.74, ROOF + 0.05, ROOF + 0.12);
    for (k = 0; k < 4; k++) {
      a = -0.9 + k * 0.6;
      rbox(B.glass, 1.12 + Math.cos(a) * 0.30, 0.62 + Math.sin(a) * 0.30, 0.025, 0.06, a, ROOF + 0.06, ROOF + 0.14);
    }
    /* the engine access and its grille over the front right (D1, A1) */
    box(B.paint, 0.98, 1.46, -1.20, -0.10, ROOF - 0.01, ROOF + 0.02);
    box(B.dark, 1.04, 1.40, -1.12, -0.62, ROOF + 0.02, ROOF + 0.035);
    for (k = 0; k < 6; k++) box(B.paint, 1.07 + k * 0.055, 1.095 + k * 0.055, -1.12, -0.62, ROOF + 0.035, ROOF + 0.05);
    box(B.dark, 0.99, 1.03, -1.10, -0.20, ROOF + 0.02, ROOF + 0.04);
    /* team colour: a strip along each roof edge, facing up for the RTS camera (modest) */
    for (s = -1; s <= 1; s += 2) box(B.team, -1.90, -0.20, s > 0 ? HW - 0.17 : -HW + 0.04, s > 0 ? HW - 0.04 : -HW + 0.17, ROOF, ROOF + 0.012);
    /* the cargo hatch: one lid hinged at its rear edge (D1, A3) */
    if (V.kind !== "vads") {
      box(B.paint, -2.28, -0.78, -0.80, 0.80, ROOF - 0.01, ROOF + 0.035);
      box(B.dark, -2.30, -0.76, -0.82, -0.80, ROOF, ROOF + 0.03);
      box(B.dark, -2.30, -0.76, 0.80, 0.82, ROOF, ROOF + 0.03);
      box(B.dark, -0.78, -0.76, -0.82, 0.82, ROOF, ROOF + 0.03);
      for (k = -1; k <= 1; k += 2) box(B.dark, -2.32, -2.18, k * 0.55 - 0.10, k * 0.55 + 0.10, ROOF, ROOF + 0.07);
      box(B.dark, -0.98, -0.88, -0.06, 0.06, ROOF + 0.035, ROOF + 0.06);
    }
    /* the whip aerial at the left rear; the M163 carries a second on the right (V1, V2) */
    cylZ(B.dark, -2.18, HW - 0.16, ROOF, ROOF + 0.12, 0.05, 8);
    cylZ(B.dark, -2.18, HW - 0.16, ROOF + 0.12, ROOF + 1.60, 0.010, 4);
    if (V.kind === "vads") {
      cylZ(B.dark, -2.18, -HW + 0.16, ROOF, ROOF + 0.12, 0.05, 8);
      cylZ(B.dark, -2.18, -HW + 0.16, ROOF + 0.12, ROOF + 1.60, 0.010, 4);
    }
  }

  /* the tail: the ramp standing a hair proud, its inset door on the left, hinges, lamps, pintle (D1, T5) */
  function tail(B, V) {
    var s, k;
    box(B.paint, XR - 0.035, XR, -0.92, 0.92, 0.60, 1.80);
    box(B.dark, XR - 0.045, XR - 0.035, 0.12, 0.76, 0.72, 1.66);
    box(B.paint, XR - 0.055, XR - 0.045, 0.16, 0.72, 0.76, 1.62);
    box(B.dark, XR - 0.07, XR - 0.04, 0.22, 0.32, 1.16, 1.22);
    for (k = 0; k < 3; k++) box(B.dark, XR - 0.06, XR + 0.0, -0.78 + k * 0.70, -0.62 + k * 0.70, 0.55, 0.64);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, XR - 0.06, XR, s * (HW - 0.20) - 0.10, s * (HW - 0.20) + 0.10, 1.60, 1.78);
      cylX(B.glass, XR - 0.065, XR - 0.06, s * (HW - 0.20) - 0.045, 1.69, 0.035, 8);
      cylX(B.glass, XR - 0.065, XR - 0.06, s * (HW - 0.20) + 0.045, 1.69, 0.035, 8);
      box(B.dark, XR - 0.10, XR, s * 1.02 - 0.05, s * 1.02 + 0.05, 0.62, 0.72);
    }
    box(B.dark, XR - 0.06, XR, -0.07, 0.07, 0.50, 0.60);
    cylZ(B.dark, XR - 0.02, 0, 0.60, 0.66, 0.035, 8);
  }

  /* ------------------------------------------------------------------ crew-served guns and the cupola */
  /* an M2 .50 on its pintle: receiver, barrel jacket, barrel, flash hider; muzzle along +X */
  function m2gun(D, ox, oy, gz0) {
    cylZ(D, ox + 0.10, oy, gz0 - 0.30, gz0 - 0.06, 0.03, 6);
    box(D, ox - 0.05, ox + 0.38, oy - 0.055, oy + 0.055, gz0 - 0.07, gz0 + 0.07);
    box(D, ox - 0.16, ox - 0.05, oy - 0.04, oy + 0.04, gz0 - 0.05, gz0 + 0.03);
    cylX(D, ox + 0.38, ox + 0.62, oy, gz0, 0.036, 8);
    cylX(D, ox + 0.62, ox + 1.18, oy, gz0, 0.021, 6);
    cylX(D, ox + 1.12, ox + 1.22, oy, gz0, 0.03, 6);
    box(D, ox + 0.05, ox + 0.25, oy + 0.055, oy + 0.17, gz0 - 0.14, gz0 + 0.0);
  }
  /* an M60 on its pintle, along direction (fx, fy) */
  function m60gun(D, ox, oy, oz, fx, fy) {
    cylZ(D, ox, oy, oz - 0.30, oz - 0.03, 0.022, 6);
    cyl(D, [ox - fx * 0.25, oy - fy * 0.25, oz], [ox + fx * 0.22, oy + fy * 0.22, oz], 0.035, 0.035, 6);
    cyl(D, [ox + fx * 0.22, oy + fy * 0.22, oz], [ox + fx * 0.78, oy + fy * 0.78, oz], 0.014, 0.014, 5);
    box(D, ox - 0.03, ox + 0.03, oy - 0.03, oy + 0.03, oz - 0.15, oz - 0.03);
  }
  /* the M113A1 commander's cupola: a low ring with vision blocks and its hatch cover; origin on its centre */
  function cupola(P, D, G, ox, oy, oz) {
    var k, a;
    cylZ(P, ox, oy, oz - 0.01, oz + 0.16, 0.40, 22);
    cylZ(D, ox, oy, oz + 0.16, oz + 0.18, 0.34, 20);
    for (k = 0; k < 5; k++) {
      a = -1.4 + k * 0.7;
      rbox(G, ox + Math.cos(a) * 0.395, oy + Math.sin(a) * 0.395, 0.012, 0.07, a, oz + 0.06, oz + 0.13);
    }
    cylZ(P, ox - 0.30, oy, oz + 0.16, oz + 0.19, 0.12, 10);
  }

  /* ACAV turret: the commander's cupola, the .50, its shield: a flat front plate and two side plates
     swept back (A1, A3).  Origin on the ring centre, gun along +X. */
  function turretACAV(TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, s, sw = 0.50, dx, dy;
    cupola(P, D, G, 0, 0, 0);
    /* the front plate, standing in front of the ring, the gun slot in it */
    box(P, 0.40, 0.44, -0.40, -0.05, 0.10, 0.78);
    box(P, 0.40, 0.44, 0.05, 0.40, 0.10, 0.78);
    box(P, 0.40, 0.44, -0.05, 0.05, 0.10, 0.36);
    box(P, 0.40, 0.44, -0.05, 0.05, 0.62, 0.78);
    /* the side plates, swept back 25 deg */
    for (s = -1; s <= 1; s += 2) {
      /* from the front plate's corner back and out, 25 deg off the axis */
      dx = -Math.cos(0.44); dy = s * Math.sin(0.44);
      rbox(P, 0.42 + dx * sw / 2, s * 0.40 + dy * sw / 2, sw / 2, 0.018, Math.atan2(dy, dx), 0.10, 0.72);
      /* a brace from the plate down to the ring */
      bar(D, [0.30, s * 0.45, 0.14], [0.15, s * 0.30, 0.02], 0.03);
    }
    m2gun(D, 0.10, 0, 0.50);
  }

  /* ACAV: the shielded M60 stations at the front corners of the cargo hatch (A1, A3): an outboard plate,
     a forward cheek, the gun on a pintle */
  function acavStations(B) {
    var s, P = B.paint, D = B.dark, fx = Math.cos(0.5), fy = Math.sin(0.5);
    for (s = -1; s <= 1; s += 2) {
      box(P, -1.42, -0.78, s > 0 ? 0.98 : -1.02, s > 0 ? 1.02 : -0.98, ROOF + 0.02, ROOF + 0.64);
      rbox(P, -0.80, s * 0.86, 0.15, 0.018, s * 0.5 + Math.PI / 2, ROOF + 0.02, ROOF + 0.60);
      box(D, -1.40, -0.80, s > 0 ? 0.90 : -0.98, s > 0 ? 0.98 : -0.90, ROOF + 0.02, ROOF + 0.06);
      m60gun(D, -1.02, s * 0.88, ROOF + 0.48, fx, s * fy);
    }
  }

  /* M113A1 TOW: the M220 on a pedestal over the rear of the roof, tube forward, the sight on its left,
     the missile guidance set behind (T5).  Into the hull bins: the row does not train. */
  function towLauncher(B) {
    var P = B.paint, D = B.dark, G = B.glass, X = -1.10, Z = ROOF + 0.80;
    cylZ(D, X, 0, ROOF, ROOF + 0.05, 0.24, 12);
    cylZ(P, X, 0, ROOF + 0.05, Z - 0.20, 0.07, 10);
    box(P, X - 0.14, X + 0.14, -0.12, 0.12, Z - 0.22, Z - 0.10);
    /* the traversing unit and cradle */
    box(D, X - 0.20, X + 0.20, -0.09, 0.09, Z - 0.12, Z - 0.06);
    /* the launch tube with its front and rear rings */
    cylX(P, X - 0.62, X + 0.92, 0, Z, 0.11, 16);
    cylX(P, X + 0.80, X + 0.94, 0, Z, 0.125, 16);
    cylX(P, X - 0.66, X - 0.52, 0, Z, 0.13, 16);
    cylX(D, X + 0.94, X + 0.95, 0, Z, 0.10, 14);
    /* the optical sight on the left, its window forward */
    box(P, X - 0.06, X + 0.30, 0.13, 0.30, Z - 0.10, Z + 0.10);
    box(G, X + 0.30, X + 0.31, 0.16, 0.27, Z - 0.05, Z + 0.07);
    /* the missile guidance set on the roof behind the pedestal */
    box(P, X - 0.85, X - 0.45, -0.28, 0.28, ROOF, ROOF + 0.30);
    box(D, X - 0.86, X - 0.44, -0.20, 0.20, ROOF + 0.30, ROOF + 0.32);
    /* the tripod legs stowed beside it */
    for (var s = -1; s <= 1; s += 2) bar(D, [X - 0.78, s * 0.40, ROOF + 0.03], [X + 0.20, s * 0.40, ROOF + 0.03], 0.04);
  }

  /* M901: the M27 cupola (the trained part).  Origin on its centre, on the roof. */
  function turretITV(TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, k, a, s;
    cylZ(P, 0, 0, -0.01, 0.22, 0.58, 24);
    cylZ(D, 0, 0, 0.22, 0.24, 0.50, 22);
    cylZ(P, 0, 0, 0.24, 0.30, 0.46, 22);
    for (k = 0; k < 6; k++) {
      a = 0.6 + k * 0.55;
      rbox(G, Math.cos(a) * 0.575, Math.sin(a) * 0.575, 0.012, 0.07, a, 0.08, 0.17);
    }
    /* the two round hatch lids, standing open as T1 and T4 show them */
    for (s = -1; s <= 1; s += 2) {
      cyl(P, [0.05, s * 0.50, 0.30], [0.05, s * 0.53, 0.30], 0.25, 0.25, 18);
      cyl(D, [0.05, s * 0.53, 0.30], [0.05, s * 0.545, 0.30], 0.08, 0.08, 8);
      box(D, 0.0, 0.10, s * 0.48 - 0.02, s * 0.48 + 0.02, 0.24, 0.32);
    }
    /* the arm's base block at the rear of the ring */
    box(P, -0.62, -0.30, -0.24, 0.24, 0.0, 0.34);
    for (s = -1; s <= 1; s += 2) cylY(D, -0.48, s * 0.24, s * 0.30, 0.24, 0.07, 10);
  }
  /* the M901 hammerhead and its arm, drawn STOWED in turret coordinates; returns the cells
     (each launch box: mouth x, y, z, rear x).  The caller shifts it to the hinge frame. */
  var HEAD = { x: -0.95, z: 0.76 };     /* stowed head centre (turret frame, above the roof) */
  function itvHead(EB) {
    var P = EB.paint, D = EB.dark, G = EB.glass, s, hx = HEAD.x, hz = HEAD.z, hl = 0.74, cells = [];
    /* the sight housing in the middle: a tall box, its window forward */
    box(P, hx - 0.50, hx + 0.56, -0.24, 0.24, hz - 0.24, hz + 0.24);
    box(D, hx + 0.56, hx + 0.58, -0.17, 0.17, hz - 0.12, hz + 0.16);
    box(G, hx + 0.58, hx + 0.59, -0.13, 0.13, hz - 0.08, hz + 0.12);
    box(P, hx - 0.30, hx + 0.30, -0.18, 0.18, hz + 0.24, hz + 0.30);
    /* a launch box each side: square section, the round tube mouths at the front, rear caps */
    for (s = -1; s <= 1; s += 2) {
      box(P, hx - hl, hx + hl, s * 0.26, s * 0.62, hz - 0.20, hz + 0.16);
      cylX(D, hx + hl, hx + hl + 0.02, s * 0.44, hz - 0.02, 0.15, 16);
      cylX(D, hx - hl - 0.02, hx - hl, s * 0.44, hz - 0.02, 0.15, 16);
      box(D, hx - 0.05, hx + 0.05, s * 0.25, s * 0.63, hz - 0.21, hz + 0.17);
      cells.push([hx + hl + 0.03, s * 0.44, hz - 0.02, hx - hl - 0.03]);
    }
    /* the arm under the sight: a box beam down into the roof (raised, it stands on the cupola) */
    box(P, hx - 0.16, hx + 0.16, -0.17, 0.17, hz - 0.95, hz - 0.24);
    box(D, hx - 0.18, hx + 0.18, -0.19, 0.19, hz - 0.36, hz - 0.30);
    return cells;
  }

  /* M163: the M168 turret.  Origin on the ring centre, gun along +X.  The low armoured body, the
     six-barrel cluster on its right, the gunner's tube frame, the radar dish high at the rear (V1, V4). */
  function turretVADS(TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, k, s, a;
    cylZ(D, 0, 0, -0.01, 0.06, 0.80, 24);
    /* the body: a faceted tub, sloped front */
    var body = [[-0.74, -0.72], [0.42, -0.72], [0.70, -0.40], [0.70, 0.40], [0.42, 0.72], [-0.74, 0.72], [-0.84, 0.44], [-0.84, -0.44]];
    prism(P, body, 0.05, 0.44);
    prism(P, [[-0.66, -0.62], [0.34, -0.62], [0.58, -0.34], [0.58, 0.34], [0.34, 0.62], [-0.66, 0.62], [-0.76, 0.38], [-0.76, -0.38]], 0.44, 0.52);
    /* the gunner's seat well and the sight in front of him */
    cylZ(D, -0.10, 0.05, 0.49, 0.51, 0.30, 16);
    box(P, -0.30, 0.10, -0.10, 0.22, 0.50, 0.66);
    box(D, 0.10, 0.26, -0.02, 0.16, 0.56, 0.74);
    box(G, 0.26, 0.27, 0.01, 0.13, 0.60, 0.70);
    /* the tube frame over the gunner (V1) */
    bar(D, [0.30, 0.38, 0.50], [0.10, 0.36, 1.02], 0.04);
    bar(D, [0.30, -0.30, 0.50], [0.10, -0.28, 1.02], 0.04);
    bar(D, [0.10, 0.36, 1.02], [0.10, -0.28, 1.02], 0.04);
    bar(D, [0.10, 0.36, 1.02], [-0.40, 0.38, 0.92], 0.035);
    bar(D, [0.10, -0.28, 1.02], [-0.40, -0.30, 0.92], 0.035);
    /* the gun: cradle and drive housing on the turret's right, the six barrels and their clamps */
    var gy = -0.46, gzz = 0.62;
    box(P, -0.20, 0.62, gy - 0.16, gy + 0.16, 0.30, 0.78);
    box(D, 0.62, 0.92, gy - 0.12, gy + 0.12, gzz - 0.12, gzz + 0.12);
    cylX(D, 0.92, 1.12, gy, gzz, 0.10, 14);
    for (k = 0; k < 6; k++) {
      a = k / 6 * TAU;
      cylX(D, 1.12, 2.10, gy + Math.cos(a) * 0.058, gzz + Math.sin(a) * 0.058, 0.019, 6);
    }
    cylX(D, 1.12, 2.06, gy, gzz, 0.03, 6);
    cylX(D, 1.55, 1.60, gy, gzz, 0.09, 12);
    cylX(D, 2.00, 2.06, gy, gzz, 0.085, 12);
    /* the feed chute from the hull up to the gun */
    bar(D, [0.0, gy + 0.14, 0.40], [0.66, gy + 0.10, gzz - 0.06], 0.08);
    /* the radar: a round dish facing forward high at the left rear, an upright cylinder beside it (V1, V4) */
    box(P, -0.74, -0.46, 0.20, 0.52, 0.50, 0.60);
    cylZ(P, -0.58, 0.36, 0.60, 0.80, 0.08, 10);
    cyl(P, [-0.48, 0.40, 0.78], [-0.42, 0.40, 0.78], 0.26, 0.24, 20);
    cyl(D, [-0.42, 0.40, 0.78], [-0.40, 0.40, 0.78], 0.22, 0.09, 18);
    cylX(D, -0.58, -0.48, 0.40, 0.78, 0.08, 10);
    cylZ(P, -0.62, 0.02, 0.50, 1.00, 0.09, 12);
    cylZ(D, -0.62, 0.02, 1.00, 1.03, 0.07, 10);
  }

  /* --------------------------------------------------------------- build */
  /* the virtual hinge for the M901 head: a turn of EL about it carries the head DX forward, DZ up */
  var EL = 0.06, DX = 1.15, DZ = 0.47;
  var HG = (function () {
    /* solve (R(EL) - I) p = (DX, DZ) for p, the head's offset from the hinge, R the podelev turn */
    var c = Math.cos(EL), s = Math.sin(EL), a = c - 1, b = -s, d = s, e = c - 1, det = a * e - b * d;
    var px = (DX * e - b * DZ) / det, pz = (a * DZ - d * DX) / det;
    return { x: HEAD.x - px, z: HEAD.z - pz };
  })();

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.ACAV, T = materials(THREE, C, V), g = new THREE.Group();
    var HBn = bins(T), i, wg, tg, TB, EB, E, cells, key, b, k, pos;
    hull(HBn, V);
    if (V.kind === "acav") acavStations(HBn);
    if (V.kind === "tow") {
      cupola(HBn.paint, HBn.dark, HBn.glass, CUP.x, CUP.y, ROOF);
      m2gun(HBn.dark, CUP.x + 0.10, CUP.y, ROOF + 0.50);
      towLauncher(HBn);
    }
    if (V.kind === "vads") {
      /* the M163's box on the rear deck behind the turret (V1) */
      box(HBn.paint, -2.30, -1.70, -0.55, 0.55, ROOF - 0.01, ROOF + 0.26);
      box(HBn.paint, -2.31, -1.69, -0.56, 0.56, ROOF + 0.26, ROOF + 0.285);
      box(HBn.dark, -2.312, -1.688, -0.562, 0.562, ROOF + 0.245, ROOF + 0.26);
    }
    var hg = new THREE.Group(); hg.name = "hull";
    flush(THREE, hg, HBn);
    g.add(hg);
    /* the road-wheel stations, the sprocket and the idler: each both sides, spun about their axles */
    pos = XW.map(function (x) { return [x, ZW, 0]; }).concat([[SPR.x, SPR.z, 1], [IDL.x, IDL.z, 2]]);
    for (i = 0; i < pos.length; i++) {
      var WB = { w: new Bin(pos[i][2] === 1 ? T.dark : T.paint, pos[i][2] !== 1) };
      if (pos[i][2] === 0) wheelDiscs(WB.w); else if (pos[i][2] === 1) sprocketDiscs(WB.w); else idlerDiscs(WB.w);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(pos[i][0], 0, pos[i][1]);
      flush(THREE, wg, WB);
      g.add(wg);
    }
    if (V.kind !== "tow") {
      TB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false) };
      tg = new THREE.Group();
      tg.name = "turret";
      if (V.kind === "acav") { turretACAV(TB); tg.position.set(CUP.x, CUP.y, ROOF); }
      else if (V.kind === "itv") { turretITV(TB); tg.position.set(ITVP.x, ITVP.y, ROOF); }
      else { turretVADS(TB); tg.position.set(VADP.x, VADP.y, ROOF); }
      flush(THREE, tg, TB);
      if (V.kind === "itv") {
        EB = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false) };
        cells = itvHead(EB);
        for (key in EB) { b = EB[key]; for (k = 0; k < b.P.length; k += 3) { b.P[k] -= HG.x; b.P[k + 2] -= HG.z; } }
        for (k = 0; k < cells.length; k++) { cells[k][0] -= HG.x; cells[k][2] -= HG.z; cells[k][3] -= HG.x; }
        E = new THREE.Group();
        E.name = "podelev";
        E.position.set(HG.x, 0, HG.z);
        flush(THREE, E, EB);
        E.userData.cells = cells;
        E.userData.el = EL;
        tg.add(E);
        /* the draw-call budget: the head's one sight window (a 0.26 x 0.20 m pane) with its dark
           metal, one vertex-coloured material keeping both colours (Armour3D.tint) */
        if (typeof Armour3D !== "undefined" && Armour3D.tint && Armour3D.pack) {
          Armour3D.tint(THREE, E, [[T.dark], [T.glass]]);
          Armour3D.pack(THREE, E);
        }
      }
      g.add(tg);
    }
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len is the measured X extent of each build (tools/model3d/dump.js) */
UNIT_MODELS["nato_e60_ifv"] = {
  len: 4.92,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "ACAV"); }
};
UNIT_MODELS["nato_e60_tankdestroyer"] = {
  len: 4.92,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "TOW"); }
};
UNIT_MODELS["nato_e80_tankdestroyer"] = {
  len: 4.92,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "ITV"); }
};
UNIT_MODELS["nato_e90_tankdestroyer"] = {
  len: 4.92,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "ITV2"); }
};
UNIT_MODELS["nato_e60_spaag"] = {
  len: 4.92,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "VADS60"); }
};
UNIT_MODELS["nato_e80_spaag"] = {
  len: 4.92,
  build: function (THREE, M, C) { return HeroM113.build(THREE, M, C, "VADS80"); }
};
