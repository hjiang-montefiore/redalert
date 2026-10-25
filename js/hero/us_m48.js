/* ============================================================================
   us_m48.js  --  HERO MODEL: M48A2 Patton (nato_e50_mbt)

   The row is "M48A2 Patton", era e50, service 1953: drawn as the US Army M48A2 of the late
   1950s (production 1955-1959, en.wikipedia "M48 Patton"): the A2 hull with THREE return
   rollers a side and the two big louvred engine-deck doors, the Mod B turret with the M1
   commander's cupola, the 90 mm gun M41 with its T-shaped blast deflector and bore
   evacuator, olive drab, no markings.

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons at width 960,
   cached in scratchpad/q_m48_ref (US Army / DoD photographs are public domain):
     P1  "The M48 Patton tank is lifted gently aboard TS Nabob, NY - 1959" - a US M48A2 in
         colour, from the left front above: six dual road wheels, rear sprocket, the long
         fender boxes on the left fender, the big dome turret with the M1 cupola at the right
         rear, the rangefinder blister on the turret side, the tall stowage basket round the
         turret rear, the louvred deck.  The paint is sampled here.
     P2  "Two barges, each with 6 M48 Patton tanks are clear for loading - NY - 1959" - twelve
         A2s from above and behind: the turret's plan, the cupola at the right rear, the
         basket; none carries a searchlight.
     P3  "US Army tank at Checkpoint Charlie in 1961" - a US M48 from straight above: the
         T-shaped blast deflector seen as a cross bar at the muzzle, the louvred rear deck,
         the turret's place on the hull, the fender boxes.
     P4  "Medium Battletank M48 A2C" - a restored A2C (German, in US markings) from the left
         front: the three return rollers (over the 1-2 gap, the 3-4 gap and behind wheel 6),
         the big idler close ahead of the first wheel, the rubber chevron track pads, the front
         mudguards, the bore evacuator behind the muzzle.  Its cylindrical blast deflector is
         the German fit (en.wikipedia: "Kampfpanzer M48A2CGA1 ... with a cylindrical blast
         deflector") and is NOT drawn.
     P5  "M48A2 Patton III at Musee des Blindes, Saumur" - left front: the boat-shaped nose,
         the headlight groups at the front fender corners, the grab rail on the turret side,
         the rangefinder blister, the fender boxes.  (Its smoke dischargers are a later
         European fit, not drawn.)
     P6  "M48 Patton at 1st Cavalry Division Museum 1" - a US M48 head-on: the T-shaped
         deflector (a cross tube with an opening at each end), the round cast mantlet, the
         coaxial MG port LEFT of the gun, the cupola on the right of the roof, the wide curved
         glacis, the headlight groups with their brush guards inboard of the mudguards.
     D1  "Flame Thrower Tank M67A1" (US Army, side-on, port side): the M67A1 is the A2 hull
         with a flame gun.  Hull side, wheel stations, idler and sprocket measured off it
         (scale: the 26 in road wheel and the 6.9 m hull).
     D2  "Machine Gun Cupola M1" (US Army photograph): the M1 cupola's bulbous cast shell, the
         periscope head on the hatch, the side vision block covers, the .50 barrel low in front.
   Published (en.wikipedia "M48 Patton", Hunnicutt 1984 p.434 table for the M48A2): 341.8 in
   = 8.68 m gun forward, 143.0 in = 3.63 m wide, 121.6 in = 3.09 m over the cupola periscope,
   16.5 in = 0.42 m ground clearance, 28 in (0.71 m) T97 track, six road wheel pairs a side,
   rear drive sprocket; the A2: return rollers cut from five to three, the track tensioner
   arm deleted, two large louvred engine-deck doors, M1 cupola, the 90 mm M41 (T139); "a
   T-shaped deflector was used for production M48 tanks".

   CORRECTIONS against the previous model (and its header):
   - the muzzle device is the T-shaped blast deflector (en.wikipedia, P3, P6), not the plain
     cylinder of the German M48A2C photograph the old model followed;
   - the coaxial MG is LEFT of the gun (en.wikipedia; P6), it was on the right;
   - road wheel pitch 0.84 -> 0.77 m (D1; with the 26 in wheel; Hunnicutt's 11.9 psi at
     105,000 lb on two 28 in tracks gives ~4.0 m on the ground, consistent), the idler moved
     back to sit just ahead of the first wheel (D1, P4), the return rollers moved to the 1-2
     and 3-4 gaps and behind the sixth wheel (P4);
   - the stowage basket round the turret rear IS drawn: P1 and P2 show it on 1959 A2s;
   - the rangefinder blisters on both turret sides (P1, P4, P5) were missing;
   - the armoured taillight boxes are drawn: en.wikipedia lists them for the A2 hull;
   - kept: 8.68 m gun forward, 3.63 m wide, 3.09 m over the periscope, 0.42 m clearance,
     2.92 m track centres, the M1 cupola, the two louvred deck doors, three rollers.
   - the "five road wheels" in the brief is not what the photographs show: six pairs (P1, P4,
     D1, en.wikipedia).

   Recognition list (what makes it read at game zoom, and its source):
     1. the boat-shaped cast hull: the long curved glacis running into a rounded nose that
        projects ahead of the tracks - D1, P5, P6
     2. six dual road wheels a side, big front idler close ahead of wheel 1, rear sprocket,
        three return rollers - D1, P1, P4
     3. wide flat fenders over the tracks with the angled front mudguards and the long boxes
        on them - P1, P3, P4, P5
     4. the headlight groups in their brush guards at the front corners - P5, P6
     5. the big elongated cast dome turret overhanging the hull sides - P1, P2, P5
     6. the long 90 mm gun with the T-shaped blast deflector and the evacuator behind it -
        P3, P4, P6
     7. the M1 cupola at the right rear of the roof with its .50 barrel - P1, P2, P6, D2
     8. the rangefinder blisters on the turret flanks - P1, P4, P5
     9. the tall stowage basket round the turret rear - P1, P2
    10. the two big louvred engine-deck doors - P3, en.wikipedia
   Paint: olive drab.  Sampled: P1 (1959 Kodachrome, faded) turret lit #959083, shade
   #4b4c46, mean #858278; P6 mudguard in shade #5a5c56.  Drawn at about 0.7 of the mean,
   with the FS 24087 olive drab hue the faded slide has lost -> base #545437.  No stars,
   bumper codes or registration numbers (P1, P3-P6 carry them: not drawn).
   NOT CONFIRMED and so left out: the searchlight (none on the 1959 A2s of P1/P2; a 1961
   Berlin photograph of a dozer tank of unknown sub-variant shows one: not drawn), a canvas
   mantlet cover (P4 has one, P6 does not), tow cables, the right fender's box layout (P3 shows
   boxes on both fenders; drawn as the left), the hull length (drawn 7.02 m rear plate to nose,
   6.85 m over the fenders; the armour_specs row says 6.9 m; Hunnicutt's table gives none),
   the exact turret plan (3.63 m by 3.0 m kept, 0.92 m dome over the roof, D1).

   Materials: PAINT (canvas texture: olive drab, mottling, weld and casting seams, grime),
   DARK (track, fittings, gun bore, vision blocks), WHEEL (tyres, discs, hubs by vertex
   colour), GLASS, and the team colour exactly as handed in (C.team): two strips on the rear
   fender box lids and one on the turret crown.
   Nodes: "turret" (trains; origin on the ring centre at the roof, gun along +X), six
   "roadwheel" groups (axle along local Y, each holding both sides).
   Draw calls: hull 5 + turret 4 + 6 wheels = 15.  Drawn: 8.685 m gun forward from the taillight
   boxes, 3.63 m over the tracks, 3.09 m over the cupola periscope, 0.42 m under the belly.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM48 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- dimensions (m) */
  var TKY = 1.46, TKW = 0.355;                     /* track centre line, half track width   */
  var RW = 0.33, ZW = 0.44;                        /* 26 in road wheel, axle height          */
  var WX = [1.78, 1.01, 0.24, -0.53, -1.30, -2.07];  /* six stations at 0.77 m (D1)          */
  var ROL = [[1.42, 1.02], [-0.15, 1.04], [-2.50, 1.07]];  /* return rollers (P4)          */
  var IDL = { x: 2.62, z: 0.70, r: 0.31 };         /* front idler (D1, P4)                   */
  var SPR = { x: -2.98, z: 0.80, r: 0.33 };        /* rear drive sprocket (D1)               */
  var ZF = 1.32, FW = 1.815, HWL = 1.06;           /* fender top, fender edge, lower hull    */
  var TRX = 0.15, ZR = 1.50;                       /* turret ring centre, roof at the ring   */
  var GZ = 0.50;                                   /* gun axis above the roof                */

  /* hull station table (D1 side, P5/P6 for the nose, P3 for the plan): x, lower hull half
     width (below the fenders), upper hull half width, roof half width, roof height, belly. */
  var ST = [
    [-3.45, 0.98, 1.06, 0.96, 1.22, 0.62],
    [-3.41, 1.02, 1.13, 1.02, 1.33, 0.49],
    [-3.30, 1.04, 1.16, 1.04, 1.39, 0.44],
    [-2.60, 1.06, 1.17, 1.05, 1.42, 0.42],
    [-1.35, 1.06, 1.17, 1.05, 1.46, 0.42],
    [-1.05, 1.06, 1.17, 1.05, ZR, 0.42],
    [ 1.20, 1.06, 1.17, 1.05, ZR, 0.42],
    [ 1.55, 1.06, 1.16, 1.02, 1.46, 0.42],
    [ 1.95, 1.06, 1.13, 0.97, 1.37, 0.42],
    [ 2.35, 1.05, 1.06, 0.92, 1.25, 0.43],
    [ 2.70, 1.02, 1.02, 0.88, 1.13, 0.46],
    [ 3.00, 0.97, 0.97, 0.84, 1.02, 0.51],
    [ 3.22, 0.90, 0.90, 0.78, 0.94, 0.57],
    [ 3.38, 0.80, 0.80, 0.68, 0.87, 0.63],
    [ 3.48, 0.66, 0.66, 0.56, 0.82, 0.68],
    [ 3.54, 0.46, 0.46, 0.38, 0.79, 0.72],
    [ 3.565, 0.22, 0.22, 0.18, 0.775, 0.745]
  ];
  function lerpST(x, k) {
    var i, f;
    if (x <= ST[0][0]) return ST[0][k];
    for (i = 0; i + 1 < ST.length; i++)
      if (x <= ST[i + 1][0]) { f = (x - ST[i][0]) / (ST[i + 1][0] - ST[i][0]); return ST[i][k] + f * (ST[i + 1][k] - ST[i][k]); }
    return ST[ST.length - 1][k];
  }
  function hullZ(x) { return lerpST(x, 4); }

  /* turret dome (P1, P2, P5): turret-local x (ring centre 0), half width, height, section
     exponent; u runs -1 (tail) to +1 (face).  3.63 m long, 3.0 m wide, 1.08 m high. */
  var TXC = -0.05, TAF = 1.85, TAR = 1.78, TWM = 1.50, THM = 0.92, TE = 2.3;
  function tu(x) { return (x - TXC) / (x >= TXC ? TAF : TAR); }
  function tw(x) { var u = Math.abs(tu(x)); return TWM * Math.pow(Math.max(0, 1 - Math.pow(Math.min(1, u), 2.4)), 1 / 2.4); }
  function th(x) { var u = Math.min(1, Math.abs(tu(x))); return THM * (1 - (x >= TXC ? 0.48 : 0.62) * Math.pow(u, 2.0)); }
  function tz(x, y) {
    var w = tw(x), r;
    if (w <= 0.01) return 0;
    r = Math.min(1, Math.abs(y) / w);
    return th(x) * Math.pow(1 - Math.pow(r, TE), 1 / TE);
  }
  /* the dome's half width at height z above the roof, at turret-local x */
  function twAt(x, z) { var h = th(x); if (z >= h) return 0; return tw(x) * Math.pow(1 - Math.pow(Math.max(0, z) / h, TE), 1 / TE); }

  /* ------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = 0.34;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
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
  /* smooth vertex normals over the faces meeting at each vertex; a vertex listed twice keeps a crease */
  function smooth(bin, V, F) {
    var vol = 0, i, f, n, k, N = [];
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    if (vol < 0) for (i = 0; i < F.length; i++) { f = F[i]; F[i] = [f[0], f[2], f[1]]; }
    for (i = 0; i < V.length; i++) N.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; n = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      for (k = 0; k < 3; k++) { N[f[k]][0] += n[0]; N[f[k]][1] += n[1]; N[f[k]][2] += n[2]; }
    }
    for (i = 0; i < N.length; i++) { k = Math.sqrt(dot(N[i], N[i])); N[i] = k > 1e-12 ? [N[i][0] / k, N[i][1] / k, N[i][2] / k] : [0, 0, 1]; }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      n = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      if (dot(n, n) < 1e-14) continue;                      /* zero-area (collapsed ring point) */
      bin.tri(V[f[0]], V[f[1]], V[f[2]], N[f[0]], N[f[1]], N[f[2]]);
    }
  }
  /* a loft of closed rings (same count), capped; crease[j] doubles ring point j */
  function loft(bin, rings, crease) {
    var nr = rings.length, n = rings[0].length, V = [], F = [], id = [], i, j, j2, a, b, c, d, base, ci, cen, q;
    for (i = 0; i < nr; i++) {
      id.push([]);
      for (j = 0; j < n; j++) { a = V.push(rings[i][j]) - 1; b = a; if (crease && crease[j]) b = V.push(rings[i][j]) - 1; id[i].push([a, b]); }
    }
    for (i = 0; i + 1 < nr; i++)
      for (j = 0; j < n; j++) {
        j2 = (j + 1) % n;
        a = id[i][j][1]; b = id[i][j2][0]; c = id[i + 1][j2][0]; d = id[i + 1][j][1];
        F.push([a, b, c], [a, c, d]);
      }
    function cap(ri, dir) {
      base = V.length; cen = [0, 0, 0];
      for (j = 0; j < n; j++) { q = rings[ri][j]; V.push(q); cen[0] += q[0] / n; cen[1] += q[1] / n; cen[2] += q[2] / n; }
      ci = V.push(cen) - 1;
      for (j = 0; j < n; j++) { j2 = (j + 1) % n; F.push(dir > 0 ? [ci, base + j, base + j2] : [ci, base + j2, base + j]); }
    }
    cap(0, -1); cap(nr - 1, 1);
    smooth(bin, V, F);
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function mbox(bin, s, x0, x1, ya, yb, z0, z1) { box(bin, x0, x1, s > 0 ? ya : -yb, s > 0 ? yb : -ya, z0, z1); }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  /* a plate in the x-z plane from (x0, z0) to (x1, z1), spanning y0..y1, thickness th */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* an outline in the XZ plane (star shaped round its centroid), extruded across y0..y1 */
  function prismXZ(bin, pts, y0, y1) {
    var n = pts.length, V = [], F = [], k, k2, cx = 0, cz = 0;
    for (k = 0; k < n; k++) { V.push([pts[k][0], y0, pts[k][1]]); cx += pts[k][0] / n; cz += pts[k][1] / n; }
    for (k = 0; k < n; k++) V.push([pts[k][0], y1, pts[k][1]]);
    V.push([cx, y0, cz], [cx, y1, cz]);
    for (k = 0; k < n; k++) { k2 = (k + 1) % n; F.push([k, k2, n + k2], [k, n + k2, n + k], [2 * n, k2, k], [2 * n + 1, n + k, n + k2]); }
    solid(bin, V, F);
  }

  /* ----------------------------------------------------------- materials */
  var _tex = null, _texDone = false;
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* olive drab: one tile is 1 / 0.34 = 2.9 m.  Base, soft mottling of brushed paint, casting
     seams and weld beads with their highlight, rain streaks and grime (P1, P4, P6) */
  function paintTex(THREE) {
    if (_texDone) return _tex;
    _texDone = true;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(4802), i, x, y, w;
      cv.width = S; cv.height = S; q = cv.getContext("2d");
      q.fillStyle = "#545437"; q.fillRect(0, 0, S, S);
      ["#4d4d32", "#5b5b3e", "#50523a"].forEach(function (c) {
        q.fillStyle = c;
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.3 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      });
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(22,22,14,0.30)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
        q.fillStyle = "rgba(235,232,210,0.10)";
        if (i % 2) q.fillRect(x, y + 3, w, 1); else q.fillRect(x + 3, y, 1, w);
      }
      for (i = 0; i < 110; i++) { q.fillStyle = (i % 3) ? "rgba(22,20,12,0.07)" : "rgba(235,230,205,0.05)"; q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26); }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(28,24,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
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
    if (tx) T.paint.map = tx; else T.paint.color.set(0x545437);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.8, metalness: 0.28 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* one station ring: the roof, its rounded edge, the upper hull side down to the fender,
     the step in to the lower hull, which curves into the belly (the cast "boat") */
  function hullRing(s) {
    var x = s[0], wl = s[1], wu = s[2], wr = s[3], zt = s[4], zb = s[5], h = zt - zb, ring = [], j;
    var zf = Math.min(ZF - 0.02, zt - 0.10), half;
    if (zf < zb + 0.35 * h) zf = zb + 0.35 * h;
    half = [[0, zt], [wr, zt], [wr + (wu - wr) * 0.7, zt - Math.min(0.05, 0.2 * h)], [wu, zt - Math.min(0.12, 0.3 * h)], [wu, zf], [wl, zf - 0.005],
            [wl, zb + 0.34 * (zf - zb)], [wl * 0.94, zb + 0.13 * (zf - zb)], [wl * 0.78, zb + 0.025 * (zf - zb)], [wl * 0.5, zb], [0, zb]];
    for (j = 0; j < half.length; j++) ring.push([x, half[j][0], half[j][1]]);
    for (j = half.length - 2; j >= 1; j--) ring.push([x, -half[j][0], half[j][1]]);
    return ring;
  }

  function addHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, TM = B.team;
    var rings = [], i, k, s, x, z, y0, y1, zt0, zt1, cr = [];
    for (i = 0; i < ST.length; i++) rings.push(hullRing(ST[i]));
    for (k = 0; k < rings[0].length; k++) cr.push(k === 1 || k === rings[0].length - 1 || k === 4 || k === 5 || k === rings[0].length - 4 || k === rings[0].length - 5);
    loft(P, rings, cr);
    /* the rounded nose casting where glacis and lower hull meet (D1, P5, P6) */
    cyl(P, [3.47, 0.62, 0.81], [3.47, -0.62, 0.81], 0.05, 0.05, 10);

    for (s = -1; s <= 1; s += 2) {
      /* fender: a flat plate over the track from the tail to the mudguard, a rolled lip */
      mbox(P, s, -3.40, 2.42, 1.10, FW, ZF - 0.035, ZF);
      mbox(P, s, -3.40, 2.42, FW - 0.035, FW, ZF - 0.12, ZF + 0.02);
      /* front mudguard (the A2's redesigned guard, P4, P5, P6): an angled plate over the
         idler down to the front edge, its outer side lip and the front lip */
      y0 = s > 0 ? 1.04 : -FW; y1 = s > 0 ? FW : -1.04;
      belt(P, 2.42, ZF - 0.017, 3.30, 0.90, y0, y1, 0.035);
      belt(P, 2.42, ZF - 0.08, 3.30, 0.84, s > 0 ? FW - 0.035 : -FW, s > 0 ? FW : -FW + 0.035, 0.13);
      belt(P, 3.29, 0.90, 3.33, 0.78, y0, y1, 0.035);
      /* rear mudguard, turned down */
      belt(P, -3.40, ZF - 0.017, -3.52, ZF - 0.22, y0, y1, 0.03);
      /* suspension arms and bump stops out of the hull side to each wheel station */
      for (i = 0; i < WX.length; i++) {
        mbox(P, s, WX[i] + 0.02, WX[i] + 0.30, 1.04, 1.18, ZW - 0.04, ZW + 0.10);
        mbox(D, s, WX[i] + 0.25, WX[i] + 0.37, 1.04, 1.14, ZW + 0.22, ZW + 0.32);
      }
      /* return roller brackets */
      for (i = 0; i < ROL.length; i++) mbox(P, s, ROL[i][0] - 0.06, ROL[i][0] + 0.06, 1.04, 1.24, ROL[i][1] - 0.05, ROL[i][1] + 0.05);
      /* idler arm and the final drive housing */
      belt(P, IDL.x, IDL.z, WX[0] + 0.25, ZW + 0.12, s > 0 ? 1.04 : -1.20, s > 0 ? 1.20 : -1.04, 0.12);
      cylY(P, SPR.x, s * 1.04, s * 1.16, SPR.z, 0.22, 12);

      /* headlight group in its brush guard at the front corner, inboard of the mudguard
         (P5, P6): a bracket box, two lamps, a bent bar guard */
      var hx = 2.72, hy = s * 0.96, hz = hullZ(2.72);
      box(P, hx - 0.10, hx + 0.08, hy - 0.13, hy + 0.13, hz - 0.02, hz + 0.16);
      for (k = -1; k <= 1; k += 2) {
        cylX(P, hx + 0.06, hx + 0.14, hy + k * 0.065, hz + 0.10, 0.055, 0.06, 10);
        cylX(G, hx + 0.14, hx + 0.15, hy + k * 0.065, hz + 0.10, 0.048, 0.048, 10);
      }
      cyl(D, [hx - 0.06, hy - 0.17, hz], [hx + 0.24, hy - 0.17, hz + 0.24], 0.015, 0.015, 5);
      cyl(D, [hx - 0.06, hy + 0.17, hz], [hx + 0.24, hy + 0.17, hz + 0.24], 0.015, 0.015, 5);
      cyl(D, [hx + 0.24, hy - 0.17, hz + 0.24], [hx + 0.24, hy + 0.17, hz + 0.24], 0.015, 0.015, 5);

      /* fender boxes (P1, P3, P4, P5): a short box ahead of the turret, the long box behind */
      mbox(P, s, 1.15, 2.30, 1.24, 1.76, ZF, ZF + 0.30);
      mbox(D, s, 1.15, 2.30, 1.235, 1.765, ZF + 0.30, ZF + 0.315);
      mbox(P, s, -3.05, -1.20, 1.24, 1.76, ZF, ZF + 0.32);
      mbox(D, s, -3.05, -1.20, 1.235, 1.765, ZF + 0.32, ZF + 0.335);
      for (k = 0; k < 3; k++) mbox(D, s, -2.75 + k * 0.6, -2.70 + k * 0.6, 1.76, 1.775, ZF + 0.10, ZF + 0.24);
      mbox(TM, s, -2.55, -1.75, 1.36, 1.64, ZF + 0.335, ZF + 0.35);
      /* armoured taillight box at the rear corner (en.wikipedia, A2 hull) */
      box(P, -3.52, -3.36, s > 0 ? 1.20 : -1.48, s > 0 ? 1.48 : -1.20, ZF - 0.06, ZF + 0.16);
      box(G, -3.53, -3.52, s > 0 ? 1.26 : -1.42, s > 0 ? 1.42 : -1.26, ZF + 0.02, ZF + 0.10);
      /* tow hooks on the nose and the stern */
      box(D, 3.30, 3.48, s * 0.52 - 0.05, s * 0.52 + 0.05, 0.66, 0.78);
      box(D, -3.56, -3.42, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.82, 0.96);
    }

    /* driver's hatch at the top of the glacis (Mod B), its three periscopes */
    z = hullZ(1.70);
    cylZ(P, 1.70, 0, z - 0.04, z + 0.05, 0.31, 18);
    cylZ(P, 1.70, 0, z + 0.05, z + 0.08, 0.26, 18);
    for (k = -1; k <= 1; k++) box(G, 1.98, 2.04, k * 0.17 - 0.05, k * 0.17 + 0.05, z - 0.01, z + 0.07);
    /* lifting eyes on the glacis */
    for (s = -1; s <= 1; s += 2) slab(D, [2.30, s * 0.62, hullZ(2.30) + 0.04], [1, 0, -0.33], [0, 1, 0], [0.33, 0, 1], 0.06, 0.015, 0.05);

    /* engine deck (A2): two big louvred access doors side by side, hinges at the centre,
       the louvred grille door across the rear (P3, en.wikipedia) */
    for (s = -1; s <= 1; s += 2) {
      y0 = s > 0 ? 0.05 : -0.98; y1 = s > 0 ? 0.98 : -0.05;
      zt0 = hullZ(-2.95); zt1 = hullZ(-1.45);
      hexa(P, [[-2.95, y0, zt0 - 0.01], [-1.45, y0, zt1 - 0.01], [-1.45, y1, zt1 - 0.01], [-2.95, y1, zt0 - 0.01],
               [-2.95, y0, zt0 + 0.04], [-1.45, y0, zt1 + 0.04], [-1.45, y1, zt1 + 0.04], [-2.95, y1, zt0 + 0.04]]);
      for (k = 0; k < 9; k++) {
        x = -2.85 + k * 0.155;
        box(D, x, x + 0.06, y0 + 0.08, y1 - 0.08, hullZ(x) + 0.035, hullZ(x) + 0.06);
      }
      box(D, -2.40, -2.30, s * 0.03 - 0.03, s * 0.03 + 0.03, hullZ(-2.35) + 0.04, hullZ(-2.35) + 0.07);
      box(D, -1.75, -1.65, s * 0.03 - 0.03, s * 0.03 + 0.03, hullZ(-1.70) + 0.04, hullZ(-1.70) + 0.07);
    }
    box(P, -3.32, -3.02, -0.98, 0.98, hullZ(-3.17) - 0.01, hullZ(-3.17) + 0.03);
    for (k = 0; k < 3; k++) box(D, -3.28 + k * 0.09, -3.24 + k * 0.09, -0.92, 0.92, hullZ(-3.17) + 0.03, hullZ(-3.17) + 0.045);
    /* air cleaner boxes on the deck either side ahead of the doors */
    for (s = -1; s <= 1; s += 2) mbox(P, s, -1.38, -1.08, 0.70, 1.02, hullZ(-1.2), hullZ(-1.2) + 0.18);
    /* stern: louvred exhaust grille on the rear plate, the towing pintle */
    box(D, -3.47, -3.43, -0.80, 0.80, 0.98, 1.20);
    for (k = 0; k < 4; k++) box(P, -3.49, -3.46, -0.82, 0.82, 1.00 + k * 0.055, 1.02 + k * 0.055);
    cylX(D, -3.62, -3.45, 0, 0.86, 0.06, 0.06, 8);
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
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts, W = B.wheel;
    for (i = 0; i < WX.length; i++) C.push([WX[i], ZW, RW + 0.065]);
    for (i = 0; i < ROL.length; i++) C.push([ROL[i][0], ROL[i][1], 0.105 + 0.045]);
    C.push([IDL.x, IDL.z, IDL.r + 0.045], [SPR.x, SPR.z, SPR.r + 0.045]);
    pts = [];
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
    /* the T97 track: double-pin steel links with rubber chevron pads, 6 in pitch; drawn as a
       band with every other link standing proud and the centre guides inside the run (P4) */
    cnt = Math.round(tot / 0.305); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TKY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TKW, y + TKW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the link: two pads either side of the centre guide, and the end connectors */
        belt(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y - TKW, y - 0.04, 0.085);
        belt(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y + 0.04, y + TKW, 0.085);
        belt(B.dark, px - dx * 0.04 - dz * 0.08, pz - dz * 0.04 + dx * 0.08, px + dx * 0.04 - dz * 0.08, pz + dz * 0.04 + dx * 0.08, y - 0.03, y + 0.03, 0.07);
      }
      /* return rollers: small dual rollers on their stub axles */
      for (i = 0; i < ROL.length; i++) {
        W.col = [0.13, 0.135, 0.125];
        cylY(W, ROL[i][0], y - 0.20, y - 0.06, ROL[i][1], 0.105, 12);
        cylY(W, ROL[i][0], y + 0.06, y + 0.20, ROL[i][1], 0.105, 12);
        W.col = [0.34, 0.34, 0.22];
        cylY(W, ROL[i][0], y + s * 0.20, y + s * 0.24, ROL[i][1], 0.06, 8);
      }
      /* front idler: a dual wheel like the road wheels, hub cap (P4) */
      W.col = [0.13, 0.135, 0.125];
      cylY(W, IDL.x, y - 0.23, y - 0.06, IDL.z, IDL.r, 18);
      cylY(W, IDL.x, y + 0.06, y + 0.23, IDL.z, IDL.r, 18);
      W.col = [0.36, 0.36, 0.24];
      cyl(W, [IDL.x, y + s * 0.23, IDL.z], [IDL.x, y + s * 0.25, IDL.z], IDL.r - 0.04, 0.17, 16);
      cylY(W, IDL.x, y + s * 0.24, y + s * 0.29, IDL.z, 0.09, 10);
      /* rear drive sprocket: two toothed rings (11 teeth) on a drum, the hub (P1, P4) */
      var pt = [];
      for (k = 0; k < 22; k++) { a = k / 22 * TAU; pt.push([SPR.x + Math.cos(a) * (k % 2 ? 0.30 : 0.375), SPR.z + Math.sin(a) * (k % 2 ? 0.30 : 0.375)]); }
      W.col = [0.30, 0.30, 0.20];
      prismXZ(W, pt, y - 0.20, y - 0.10);
      prismXZ(W, pt, y + 0.10, y + 0.20);
      W.col = [0.36, 0.36, 0.24];
      cylY(W, SPR.x, y - 0.10, y + 0.10, SPR.z, 0.27, 14);
      cyl(W, [SPR.x, y + s * 0.20, SPR.z], [SPR.x, y + s * 0.26, SPR.z], 0.25, 0.14, 14);
      W.col = [0.2, 0.2, 0.15];
      cylY(W, SPR.x, y + s * 0.25, y + s * 0.30, SPR.z, 0.07, 8);
    }
  }

  /* road wheel pair (P1, P4): 26 in dual wheels with rubber tyres, a dished face, a raised
     hub with its bolt ring, both sides of the tank on one axle node */
  function addWheelPair(W) {
    var s, y, i, a, BODY = [0.36, 0.36, 0.24], RIM = [0.42, 0.42, 0.28], TYRE = [0.13, 0.135, 0.125], HUB = [0.30, 0.30, 0.20];
    for (s = -1; s <= 1; s += 2) {
      y = s * TKY;
      W.col = TYRE;
      cylY(W, 0, y - 0.24, y - 0.08, 0, RW, 18);
      cylY(W, 0, y + 0.08, y + 0.24, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.08, y + 0.08, 0, 0.28, 14);
      cyl(W, [0, y + s * 0.24, 0], [0, y + s * 0.255, 0], RW - 0.035, RW - 0.06, 20);
      cyl(W, [0, y - s * 0.24, 0], [0, y - s * 0.255, 0], RW - 0.035, RW - 0.06, 20);
      W.col = RIM;
      cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.29, 0], 0.15, 0.11, 14);
      W.col = HUB;
      cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.268, 0], 0.17, 0.17, 14, true);
      cylY(W, 0, y + s * 0.29, y + s * 0.31, 0, 0.06, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  function addTurret(B) {
    var P = B.paint, D = B.dark, G = B.glass, TM = B.team;
    var rings = [], US = [-0.985, -0.95, -0.89, -0.80, -0.68, -0.53, -0.37, -0.20, -0.03, 0.14, 0.31, 0.48, 0.63, 0.76, 0.86, 0.93, 0.97, 0.99];
    var ex = 2 / TE, NS = 22, crease = [], i, k, u, x, w, h, ring, an, cs, sn, z0, cx, cy, s;
    for (i = 0; i < US.length; i++) {
      u = US[i]; x = TXC + (u >= 0 ? TAF : TAR) * u; w = tw(x); h = th(x); ring = [];
      for (k = 0; k <= NS; k++) {
        an = Math.PI * k / NS; cs = Math.cos(an); sn = Math.sin(an);
        ring.push([x, w * (cs < 0 ? -1 : 1) * Math.pow(Math.abs(cs), ex), h * Math.pow(Math.abs(sn), ex)]);
      }
      rings.push(ring);
    }
    for (k = 0; k <= NS; k++) crease.push(k === 0 || k === NS);
    loft(P, rings, crease);
    /* the cast foot: a slight skirt where the dome meets the roof */
    for (i = 0; i < 40; i++) {
      var a0 = i / 40 * TAU, a1 = (i + 1) / 40 * TAU;
      var p0 = [TXC + Math.cos(a0) * (Math.cos(a0) >= 0 ? TAF : TAR) * 0.985, Math.sin(a0) * TWM * 0.99, 0.0];
      var p1 = [TXC + Math.cos(a1) * (Math.cos(a1) >= 0 ? TAF : TAR) * 0.985, Math.sin(a1) * TWM * 0.99, 0.0];
      p0[1] = (p0[1] < 0 ? -1 : 1) * Math.min(Math.abs(p0[1]), tw(p0[0])); p1[1] = (p1[1] < 0 ? -1 : 1) * Math.min(Math.abs(p1[1]), tw(p1[0]));
      cyl(D, [p0[0], p0[1], 0.015], [p1[0], p1[1], 0.015], 0.02, 0.02, 4, true);
    }

    /* the cast mantlet: a big rounded shield half sunk into the turret face (P5, P6) */
    rings = [];
    for (i = 1; i <= 8; i++) {
      an = Math.PI * i / 9; ring = [];
      for (k = 0; k < 16; k++) {
        u = k / 16 * TAU;
        ring.push([1.72 + 0.30 * Math.cos(an), 0.50 * Math.sin(an) * Math.cos(u), GZ - 0.03 + 0.40 * Math.sin(an) * Math.sin(u)]);
      }
      rings.push(ring);
    }
    loft(P, rings, null);
    /* gun shield collar */
    cylX(P, 1.95, 2.12, 0, GZ, 0.17, 0.14, 16);

    /* the 90 mm gun M41: tapered tube, the bore evacuator behind the muzzle, the T-shaped
       blast deflector: a short neck and a cross tube open at both ends (P3, P4, P6) */
    cylX(P, 2.12, 4.02, 0, GZ, 0.098, 0.082, 16);
    cylX(P, 4.02, 4.1, 0, GZ, 0.082, 0.112, 16);
    cylX(P, 4.1, 4.62, 0, GZ, 0.112, 0.112, 16);
    cylX(P, 4.62, 4.68, 0, GZ, 0.112, 0.080, 16);
    cylX(P, 4.68, 4.78, 0, GZ, 0.078, 0.078, 14);
    cylX(P, 4.78, 4.86, 0, GZ, 0.10, 0.10, 14);
    cylY(P, 4.93, -0.27, 0.27, GZ, 0.085, 14);
    box(P, 4.85, 5.01, -0.09, 0.09, GZ - 0.075, GZ + 0.075);
    cylY(D, 4.93, -0.275, -0.255, GZ, 0.07, 12);
    cylY(D, 4.93, 0.255, 0.275, GZ, 0.07, 12);
    cylX(D, 5.008, 5.015, 0, GZ, 0.05, 0.05, 12);
    /* coaxial .30 port LEFT of the gun (en.wikipedia; P6), the telescope port right */
    cylX(D, 1.98, 2.08, 0.27, GZ - 0.05, 0.035, 0.035, 8);
    cylX(D, 1.95, 2.04, -0.30, GZ + 0.08, 0.05, 0.05, 10);

    /* the rangefinder blisters on both flanks (P1, P4, P5): the M12/M17's end housings */
    for (s = -1; s <= 1; s += 2) {
      x = 0.70; z0 = 0.50; w = twAt(x, z0);
      cyl(P, [x, s * (w - 0.10), z0], [x, s * (w + 0.06), z0], 0.12, 0.10, 14);
      cylY(D, x, s * (w + 0.06), s * (w + 0.075), z0, 0.065, 10);
    }

    /* the commander's M1 cupola at the right rear (P1, P2, P6, D2): a bulbous cast shell,
       vision blocks round it, the hatch with the periscope head (Hunnicutt measures the A2's
       121.6 in over it: 3.09 m), the .50 M2HB inside with its barrel out of the front face,
       the ammunition chute box on the outside */
    cx = -0.40; cy = -0.56; z0 = tz(cx, cy) - 0.06;
    var CPR = [[0.0, 0.44], [0.13, 0.45], [0.28, 0.43], [0.41, 0.38], [0.50, 0.30], [0.55, 0.18], [0.56, 0.0]];
    rings = [];
    for (i = 0; i < CPR.length - 1; i++) {
      ring = [];
      for (k = 0; k < 20; k++) { an = k / 20 * TAU; ring.push([cx + Math.cos(an) * CPR[i][1] * 1.05, cy + Math.sin(an) * CPR[i][1], z0 + CPR[i][0]]); }
      rings.push(ring);
    }
    loft(P, rings, null);
    cylZ(P, cx, cy, z0 + 0.50, z0 + 0.57, 0.25, 16);
    for (i = 0; i < 6; i++) {
      an = (i < 4 ? -2.2 + i * 1.1 : 2.6 + (i - 4) * 1.08);
      slab(G, [cx + Math.cos(an) * 0.42, cy + Math.sin(an) * 0.40, z0 + 0.34], [Math.cos(an), Math.sin(an), 0], [-Math.sin(an), Math.cos(an), 0], [0, 0, 1], 0.03, 0.07, 0.04);
    }
    box(P, cx - 0.10, cx + 0.08, cy - 0.06, cy + 0.06, z0 + 0.57, z0 + 0.795);
    box(G, cx + 0.08, cx + 0.09, cy - 0.045, cy + 0.045, z0 + 0.66, z0 + 0.74);
    box(P, cx + 0.36, cx + 0.50, cy - 0.02, cy + 0.20, z0 + 0.08, z0 + 0.26);
    cylX(D, cx + 0.50, cx + 1.30, cy + 0.09, z0 + 0.18, 0.024, 0.022, 6);
    cylX(D, cx + 0.50, cx + 0.72, cy + 0.09, z0 + 0.18, 0.04, 0.04, 8);
    cylX(D, cx + 1.24, cx + 1.36, cy + 0.09, z0 + 0.18, 0.032, 0.032, 6);
    box(P, cx - 0.10, cx + 0.22, cy - 0.58, cy - 0.40, z0 + 0.02, z0 + 0.22);

    /* loader's hatch, left */
    cx = -0.50; cy = 0.60; z0 = tz(cx, cy);
    cylZ(P, cx, cy, z0 - 0.10, z0 + 0.07, 0.30, 16);
    cylZ(P, cx, cy, z0 + 0.07, z0 + 0.10, 0.27, 16);
    box(D, cx - 0.05, cx + 0.05, cy - 0.30, cy - 0.24, z0 + 0.05, z0 + 0.10);
    /* gunner's M20 periscope hood, right front */
    cx = 0.80; cy = -0.42; z0 = tz(cx, cy);
    box(P, cx - 0.09, cx + 0.09, cy - 0.11, cy + 0.11, z0 - 0.03, z0 + 0.10);
    box(G, cx + 0.09, cx + 0.10, cy - 0.08, cy + 0.08, z0 + 0.02, z0 + 0.08);
    /* ventilator on the crown, two antenna bases at the rear and one whip */
    cx = -0.95; z0 = tz(cx, 0);
    cylZ(P, cx, 0.05, z0 - 0.05, z0 + 0.08, 0.17, 14);
    cylZ(P, cx, 0.05, z0 + 0.08, z0 + 0.11, 0.12, 12);
    for (s = -1; s <= 1; s += 2) {
      cx = -1.30; cy = s * 0.80; z0 = tz(cx, cy);
      cylZ(P, cx, cy, z0 - 0.06, z0 + 0.10, 0.065, 8);
    }
    cyl(D, [-1.30, -0.80, tz(-1.30, -0.80) + 0.10], [-1.30, -0.80, tz(-1.30, -0.80) + 1.05], 0.012, 0.006, 5);
    /* lifting eyes on the front slope */
    for (s = -1; s <= 1; s += 2) { cx = 1.15; cy = s * 0.70; z0 = tz(cx, cy); cylY(P, cx, cy - 0.04, cy + 0.04, z0 + 0.03, 0.07, 8); }
    /* the grab rail along each flank on stand-offs (P5) */
    var RZ = 0.46, RX = [-1.10, -0.80, -0.50, -0.20, 0.10, 0.40], RY = [], pa, pb;
    for (i = 0; i < RX.length; i++) RY.push(twAt(RX[i], RZ));
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i + 1 < RX.length; i++) {
        pa = [RX[i], s * (RY[i] + 0.05), RZ]; pb = [RX[i + 1], s * (RY[i + 1] + 0.05), RZ];
        cyl(D, pa, pb, 0.014, 0.014, 5, true);
      }
      for (i = 0; i < RX.length; i += 2) mbox(D, s, RX[i] - 0.02, RX[i] + 0.02, RY[i] - 0.02, RY[i] + 0.06, RZ - 0.025, RZ + 0.025);
    }

    /* the stowage basket round the turret rear (P1, P2): two rails on stanchions following
       the dome at a hand's width, a floor bar, from one flank round the tail to the other */
    var BA = [], na = 12, ang, bx, by, wz, R0 = 0.11;
    for (i = 0; i <= na; i++) {
      ang = Math.PI * 0.68 + (Math.PI * 0.64) * i / na;
      bx = TXC + Math.cos(ang) * TAR * 0.92; by = Math.sin(ang) * TWM;
      by = (by < 0 ? -1 : 1) * Math.min(Math.abs(by), twAt(bx, 0.20));
      BA.push([bx + Math.cos(ang) * R0, by + Math.sin(ang) * R0]);
    }
    [0.20, 0.42, 0.66].forEach(function (zz, j) {
      for (i = 0; i < na; i++) cyl(j === 0 ? D : P, [BA[i][0], BA[i][1], zz], [BA[i + 1][0], BA[i + 1][1], zz], 0.017, 0.017, 5, true);
    });
    for (i = 0; i <= na; i += 2) {
      cyl(P, [BA[i][0], BA[i][1], 0.18], [BA[i][0], BA[i][1], 0.68], 0.016, 0.016, 5, true);
      wz = 0.20; bx = BA[i][0] - Math.cos(Math.PI * 0.68 + (Math.PI * 0.64) * i / na) * (R0 + 0.02); by = BA[i][1] - Math.sin(Math.PI * 0.68 + (Math.PI * 0.64) * i / na) * (R0 + 0.02);
      cyl(D, [bx, by, wz], [BA[i][0], BA[i][1], wz], 0.015, 0.015, 4, true);
    }

    /* team flash on the crown */
    z0 = tz(0.12, 0);
    box(TM, -0.06, 0.30, -0.15, 0.15, z0 - 0.015, z0 + 0.012);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), i, wg, tg, WB, TB;
    var HB = bins(T);
    HB.wheel = new Bin(T.wheel, false, true);
    addHull(HB);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < WX.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheelPair(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(WX[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    TB = bins(T);
    addTurret(TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TRX, 0, ZR);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent of the build: the stern pintle (-3.62) to the blast deflector
   (+5.165); the published 8.68 m gun forward runs from the taillight boxes (-3.52): 8.685 m. */
UNIT_MODELS["nato_e50_mbt"] = {
  len: 8.785,
  build: function (THREE, M, C) { return HeroM48.build(THREE, M, C); }
};
