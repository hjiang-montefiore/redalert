/* ============ deu_us_pattern.js - HERO models: the American-pattern vehicles of the Bundeswehr
   (and the French M47).  LOAD AFTER js/hero/us_m41.js, js/hero/us_paladin.js and
   js/hero/us_m270_himars.js: this file calls HeroM41, HeroPaladin and HeroUsMlrs.

   Rows and what draws them:
     deu_e50_lighttank  M41 Walker Bulldog      REUSED  HeroM41.build(..., "M41"), unchanged
     deu_e50_spaag      Flakpanzer M42 Duster   REUSED  HeroM41.build(..., "M42"), unchanged
     deu_e50_spg        M44 155 mm SPH          REUSED  HeroM41.build(..., "M44"), unchanged
     deu_e60_spg        M109G                   REUSED  HeroPaladin.build(..., "e60") + Gelboliv
                                                        repaint + the three smoke dischargers a side
     deu_e80_spg        M109A3G                 REUSED  HeroPaladin.build(..., "e80") with the
                                                        Rheinmetall barrel's round muzzle brake
     deu_e90_mlrs       MARS (M270)             REUSED  HeroUsMlrs.build("deu_e90_mlrs", ...), a row
                                                        added to the exposed HeroUsMlrs.rows table
     deu_e50_mbt        M47 Patton              NEW     HeroM47.build (this file)
     fra_e50_mbt        M47 Patton (MDAP)       NEW     HeroM47.build (this file), same paint

   Nothing here edits another file.  The reused modules expose build() and their tables
   (HeroPaladin.variants, HeroUsMlrs.rows); everything else is done on the group a builder
   returns: a material's colour is scaled (repaint), a mesh is added to a named node, or the
   meshes of the named "barrel" node are replaced (M109A3G).  The materials a builder returns
   are made fresh for every build, and the shared canvas textures are never touched, so the US
   rows drawn by the same modules do not change.

   References (Wikimedia Commons, width 960, cached in scratchpad/q_deuus_ref):
     G1  "PzH M 109 G, 3. PzArtBtl 365 Walldurn, Marz 1970.jpg" (dated colour slide): Bundeswehr
         M109Gs side on: the SHORT tube under a muzzle cover, seven road wheels, and on the
         turret roof's front corner a bracket with THREE discharger tubes pointing up and forward.
     G2  "M109 der Bundeswehr.jpg" (en.wikipedia: an M109G in 1982), firing: the short tube with
         the fat fume extractor right behind a round brake drum with a side window - the same
         layout and, at this size, the same outline as the module's M126 (so it is kept).
     G3  "M109 G - Bundeswehr 1982.jpg": a battery in plain single-colour olive, short tubes.
     G4  "19880105-15 munster M109G 02.jpg" (1988, file named M109G, B/W): a LONG tube with its
         evacuator and a cylindrical brake cut with windows, a box on the turret tail.
     G5  "155mm Panzerhaubitze M 109 A3 GE A2 - Militarhistorisches Museum ... Dresden.jpg" and
     G6  "Frieden - Spinnenetz an der Feuermundungsbremse - ... M 109 A3 GE A2 ... Bild 001.jpg":
         the German long tube's brake close up: a round BOTTLE, about 1.7 times the tube's
         collar, a short taper from the tube, two big windows a side between three walls.
     M1  "Heeresgeschichtliches Museum - M47 Patton.jpg" (Vienna): left side SQUARE ON, turret
         reversed: the station table below is measured off it (the 26 in road wheel, 76 px, and
         the gun-forward 8.51 m published, see the M47 notes).
     M2  "M47 Patton II - Dresden.jpg" (Bundeswehr M47, Dresden): right side, turret forward:
         six EVENLY spaced road wheels (pitch 1.16 wheel diameters), three return rollers, the
         big front idler, the small tension idler ahead of the rear sprocket; the long lozenge
         turret with the bustle box; the plain tube with a short fat muzzle piece.
     M3  "West German Bundeswehr 1960.jpg" / "German M47 tank in 1960.jpg" (dated, B/W): a
         Bundeswehr M47 in service: the same gun, no bore evacuator, the same running gear.
     M4  "M47 Bundeswehr front.jpg" (Bundeswehr museum, head on): the wide flat glacis, the
         ball-mounted bow machine gun on the vehicle's RIGHT, lamp groups in guards at the
         glacis top corners, the angled front mudguards, the rangefinder ears.
     M5  "M47 Bundeswehr Turm.jpg": the turret's right flank: the ear dome, the grab rails, the
         .50 on the commander's cupola at the right, the stowage box on the bustle.
     M6  "M47.jpg" (Fort Hood, en.wikipedia lead image): left front 3/4: the hull and turret in
         plan, the cupola's place, the front mudguards, the rear fender mufflers.
     M7  "Manover Sudwind der Bundeswehr (Kiel 13.779).jpg" (2 Oct 1957): a Bundeswehr M41 with
         its US registration stencils still on the glacis - the US-pattern vehicles were used in
         the paint they were delivered in, so the e50 rows keep the US olive drab.
   Text: en.wikipedia "M47 Patton" (TM 9-2350-200-12 1958 and Hunnicutt p.425: 335.0 in
   = 8.51 m gun forward, 138.25 in = 3.51 m wide, 132.0 in = 3.35 m over the MG, 18.5 in =
   0.47 m clearance; the M46 hull "with redesigned glacis, reduction from five to three track
   return rollers per side, longer mufflers on rear fenders"; the bow .30 at the right front;
   the M36 90 mm; the T42 turret with the needle nose, elongated bustle and storage bin,
   sloped sides, the M12 stereoscopic rangefinder); "M109 howitzer" (M109G: Rheinmetall
   breech, "three smoke dischargers mounted on either side of the turret"; M109A3G 1983: "a
   new gun barrel developed by Rheinmetall", "three forward firing 76 mm smoke grenade
   launchers on either side of the turret", Foss 2011); "M270 MLRS" (the M270 built in Europe
   for Germany, France and Britain; the M270B1 is the British M270A1 "with an enhanced armor
   package").

   PAINT.  e50 rows (M41, M42, M44, M47): US olive drab as delivered (M7), which is what the
   reused M41 module and the M47 here draw (#545437, the FS 24087 base of us_m48.js / us_m41.js).
   The French M47 (fra_e50_mbt, MDAP deliveries 1953): the same olive drab - no reference in
   hand shows a French scheme, so none is drawn.  M109G (1966): RAL 6014 Gelboliv, the
   Bundeswehr single colour to the mid 1980s, as the other German heroes take it (#4c4b36,
   nato_launchers_eu.js "gelb", deu_leopard1.js; G1/G3 show a plain single olive), made by
   scaling the module's olive-drab material (its texture detail stays).  M109A3G (1985) and
   MARS (1990): the post-1984 NATO three-colour green / brown / black, which the reused e80
   and "nato3" paints already are (G4 is B/W; the scheme is the one the Leopard 2 hero draws).
   No crosses, numbers, plates or tactical signs anywhere (G1, M2-M5 carry them: not drawn).

   NOT CONFIRMED, and so left as the module draws it or left off:
     M109G: the Rheinmetall brake's exact shape (G1 covered; G2 too small to tell from the
       M126's drum, so the module's M126 brake and extractor are kept); the dischargers'
       angles and sizes (G1 shows three tubes on a bracket at the roof's front corner; the
       other side from the text).  The German optics (internal) are not drawn.
     M109A3G: the tube length (the module's 39-calibre 5.25 m tube is kept - no German figure
       in hand) and the evacuator's place (G4 shows one; the module's is kept); the brake's
       size from G6's proportions (r 0.19 m, 0.62 m long); the smoke launchers (text only, no
       photograph of an A3G shows where: NOT drawn); the A3GEA2 front boxes of G5 (a later
       standard: not drawn); the bustle rack (the module's A2 rack kept; G4 shows a box there).
     MARS: anything German-specific (G-type radios and lamps are not visible at game scale).
   ROWS LEFT FOR THE REVIEWER (not registered here; see the report):
     gbr_e80_mlrs, gbr_e90_mlrs (M270, Royal Artillery) and gbr_e80_spg (M109A2): the same
       vehicles as HeroUsMlrs' M270 and HeroPaladin "e80", but the modules only carry US paints
       (MERDC, NATO three-colour, CARC / NATO three-colour) and no reference in hand shows the
       British scheme of 1989-1991; gbr_e00_mlrs (M270B1) is NOT the module's vehicle: its
       cab armour package is not drawn by HeroUsMlrs.

   ---------------------------------------------------------------- the M47 (new)
   Station table off M1 (left side square on, nose right, turret REVERSED for display).  Scale:
   the dual road wheels are 76 px (the 26 in M26/M46 wheel, 0.66 m) -> 116 px/m; the hull
   then runs 6.41 m from the rear plate to the front mudguard tips.  The ring centre comes from
   M1 and M2 together (turret reversed in one, forward in the other): 0.457 of the hull from the
   nose, X +0.27.  The gun lies on the centre plane, farther from the camera than the hull side,
   so its length is not read off the pixels: the published 8.51 m gun forward, taken from the
   rear plate, sets the muzzle at X 5.31 (5.04 m ahead of the ring; M1's pixels say 4.12 m at
   the hull-side scale, which a camera 7.8 m from the hull side makes 5.04).
     hull rear plate X -3.20, nose mudguard tips X +3.21; deck z 1.46; fender z 1.22;
     road wheels (six, even pitch 0.768 m, M2) X -1.89 ... +1.95, centre z 0.39, r 0.33;
     front idler X 2.53 z 0.77 r 0.33 (as big as a road wheel, M1); rear sprocket X -2.77 z 0.76
     r 0.345 at the teeth; tension idler X -2.40 z 0.33 r 0.17; three return rollers X -1.56,
     -0.10, +1.37, z 0.95, r 0.17 (M1, M2, text).
     turret (turret-local x, + forward; M1/M2 x 1.05 for the flank's depth): mantlet front
     +1.48, ear domes +0.98 at z 2.27, roof z 2.39, the widest crease z 1.98, cupola +0.28 on
     the right, top 2.71, the body's tail -1.44, the bustle box to -2.51 (z 1.66 to 2.37).
     gun axis z 1.98; the .50 on the cupola tops out at 3.33 (published 3.35 over the MG).
   Recognition list (M47):
     1. the M46 hull: flat deck, one long sloped glacis, the angled front mudguards - M1, M4, M6
     2. six dual road wheels, big front idler, rear sprocket with the small tension idler
        ahead of it, THREE return rollers - M1, M2, text
     3. the long lozenge turret: needle nose, sloped upper and lower flanks, long bustle with
        the stowage box hung on its tail, overhanging the engine deck - M1, M2, M5, text
     4. the round rangefinder ears on both flanks ahead of the middle - M1, M2, M4, M5
     5. the long plain 90 mm tube with the short fat muzzle piece, no evacuator - M2, M3, M4
     6. the bow machine gun ball on the glacis RIGHT, driver's and bow gunner's hatches - M4, text
     7. the commander's cupola on the right with the .50 - M5, M6
     8. lamp groups in guards at the glacis corners - M4, M6
     9. the long mufflers on the rear fenders, the stowage boxes on the fenders - M1, M6, text
   NOT CONFIRMED (M47): widths (hull 2.70 m between the sponson sides, turret 2.80 m at the
   crease, track centres 2.88 m, 0.58 m track - only the 3.51 m overall is published); the
   turret's plan (from M6's oblique view and the published width); the glacis angle (30 deg off
   the horizontal, from the 60 deg armour figure); the muzzle piece's size; the M2 museum
   tank's smoke dischargers (a later German fit of unknown date: NOT drawn); the canvas mantlet
   covers (M1, M2, M5: not drawn); the gun travel lock (not drawn); the hull length (6.41 m
   from the wheel scale; nothing published in hand).
   Materials: PAINT (canvas texture, olive drab), DARK, GLASS, WHEEL (vertex colours), TEAM
   (exactly C.team): strips on the two fender boxes and one on the turret roof.
   Nodes: "turret" (origin on the ring centre at the deck, gun along +X), six "roadwheel"
   groups (axle along local Y, both sides).  Model space +X nose, +Y left, +Z up, metres,
   tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM47 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- dimensions (m) */
  var TKY = 1.44, TKW = 0.29;                      /* track centre line, half track width     */
  var RW = 0.33, ZW = 0.39;                        /* road wheel, axle height (M1)              */
  var WX = [1.95, 1.182, 0.414, -0.354, -1.122, -1.89];   /* six stations, even pitch (M2)      */
  var ROL = [[1.37, 0.95], [-0.10, 0.95], [-1.56, 0.95]]; /* return rollers (M1)               */
  var IDL = { x: 2.53, z: 0.77, r: 0.33 };         /* front idler (M1)                          */
  var TEN = { x: -2.40, z: 0.33, r: 0.17 };        /* tension idler ahead of the sprocket (M1)  */
  var SPR = { x: -2.77, z: 0.76, r: 0.30 };        /* rear sprocket (M1)                        */
  var XR = -3.20, ZD = 1.46, ZF = 1.22, FW = 1.755, WU = 1.35, WL = 1.08, ZB = 0.47;
  var TRX = 0.27;                                  /* ring centre                               */
  var GZ = 1.98 - ZD;                              /* gun axis above the deck                   */
  var MUZ = 5.04;                                  /* ring to muzzle (8.51 m gun forward)       */

  /* ------------------------------------------------------- geometry kit (from us_m48.js) */
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
  /* a loft of closed rings (same count), capped, flat shaded: plate armour and a cast turret
     drawn as facets.  Each ring is a list of [x, y, z]. */
  function loft(bin, rings) {
    var nr = rings.length, n = rings[0].length, V = [], F = [], i, j, j2, c0, c1, cen, q;
    for (i = 0; i < nr; i++) for (j = 0; j < n; j++) V.push(rings[i][j]);
    for (i = 0; i + 1 < nr; i++)
      for (j = 0; j < n; j++) {
        j2 = (j + 1) % n;
        F.push([i * n + j, i * n + j2, (i + 1) * n + j2], [i * n + j, (i + 1) * n + j2, (i + 1) * n + j]);
      }
    function centre(ri) { var k, c = [0, 0, 0]; for (k = 0; k < n; k++) { q = rings[ri][k]; c[0] += q[0] / n; c[1] += q[1] / n; c[2] += q[2] / n; } return V.push(c) - 1; }
    c0 = centre(0); c1 = centre(nr - 1);
    for (j = 0; j < n; j++) { j2 = (j + 1) % n; F.push([c0, j2, j], [c1, (nr - 1) * n + j, (nr - 1) * n + j2]); }
    /* drop zero-area faces (rings that close to a point) before winding */
    var G = [], a;
    for (i = 0; i < F.length; i++) {
      a = cross(sub(V[F[i][1]], V[F[i][0]]), sub(V[F[i][2]], V[F[i][0]]));
      if (dot(a, a) > 1e-14) G.push(F[i]);
    }
    solid(bin, V, G);
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function mbox(bin, s, x0, x1, ya, yb, z0, z1) { box(bin, x0, x1, s > 0 ? ya : -yb, s > 0 ? yb : -ya, z0, z1); }
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
  /* a dome (half sphere) facing along unit vector d from centre c */
  function dome(bin, c, d, r, seg) {
    var rings = [], i, k, a, b, t = Math.abs(d[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], u = unit(cross(d, t)), v = cross(d, u), ring;
    for (i = 0; i <= 4; i++) {
      a = i / 4 * Math.PI / 2; ring = [];
      for (k = 0; k < seg; k++) {
        b = k / seg * TAU;
        ring.push([c[0] + (u[0] * Math.cos(b) + v[0] * Math.sin(b)) * r * Math.cos(a) + d[0] * r * Math.sin(a),
                   c[1] + (u[1] * Math.cos(b) + v[1] * Math.sin(b)) * r * Math.cos(a) + d[1] * r * Math.sin(a),
                   c[2] + (u[2] * Math.cos(b) + v[2] * Math.sin(b)) * r * Math.cos(a) + d[2] * r * Math.sin(a)]);
      }
      rings.push(ring);
    }
    loft(bin, rings);
  }
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
  /* US olive drab (FS 24087 base #545437, as us_m48.js / us_m41.js): one tile 2.9 m; brushed
     mottling, weld seams with their highlight, rain streaks and grime */
  function paintTex(THREE) {
    if (_texDone) return _tex;
    _texDone = true;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(1951), i, x, y, w;
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
  /* side profile of the upper hull (top) and the lower hull (belly), nose to tail (M1):
     the long glacis from the deck edge at X 2.15 to its foot at X 3.00, the lower nose plate
     back down to the belly; the rear plate upright from the deck to z 0.92, the rounded tail
     under it to the belly */
  var PROF = [
    /* x,    top,  bottom */
    [3.02, 0.98, 0.90],
    [2.95, 1.02, 0.76],
    [2.70, 1.17, 0.52],
    [2.45, 1.31, ZB],
    [2.15, ZD, ZB],
    [-3.00, ZD, ZB],
    [-3.12, ZD - 0.03, 0.56],
    [-3.20, ZD - 0.08, 0.92]
  ];
  function hullRing(p, wu, wl) {
    /* upper hull out to the sponson sides (wu) down to the fender, the lower hull (wl)
       between the tracks down to the belly */
    var x = p[0], zt = p[1], zb = p[2], zf = Math.max(zb + 0.02, Math.min(ZF - 0.01, zt - 0.02));
    return [[x, 0, zt], [x, wu - 0.04, zt], [x, wu, zt - 0.04], [x, wu, zf], [x, wl, zf], [x, wl, zb + 0.08], [x, wl - 0.08, zb],
            [x, -(wl - 0.08), zb], [x, -wl, zb + 0.08], [x, -wl, zf], [x, -wu, zf], [x, -wu, zt - 0.04], [x, -(wu - 0.04), zt]];
  }
  function addHull(B) {
    var P = B.paint, D = B.dark, G = B.glass, TM = B.team, rings = [], i, s, k, x, y0, y1, hx, hy, hz;
    for (i = 0; i < PROF.length; i++) {
      /* the glacis narrows a little to its foot (M4) */
      var t = PROF[i][0] > 2.15 ? (PROF[i][0] - 2.15) / 0.87 : 0;
      rings.push(hullRing(PROF[i], WU - 0.10 * t, WL - 0.06 * t));
    }
    loft(P, rings);

    for (s = -1; s <= 1; s += 2) {
      y0 = s > 0 ? WU - 0.02 : -FW; y1 = s > 0 ? FW : -(WU - 0.02);
      /* fender over the track from the tail to the front mudguard, its outer lip */
      box(P, -3.22, 2.55, y0, y1, ZF - 0.035, ZF);
      mbox(P, s, -3.22, 2.55, FW - 0.035, FW, ZF - 0.10, ZF + 0.02);
      /* the angled front mudguard down to the tips (M1, M4, M6) */
      belt(P, 2.55, ZF - 0.017, 3.21, 0.82, y0, y1, 0.035);
      belt(P, 2.55, ZF - 0.06, 3.21, 0.79, s > 0 ? FW - 0.035 : -FW, s > 0 ? FW : -FW + 0.035, 0.10);
      /* rear mudguard turned down */
      belt(P, -3.22, ZF - 0.017, -3.32, ZF - 0.20, y0, y1, 0.03);
      /* suspension arms and bump stops to each station */
      for (i = 0; i < WX.length; i++) {
        mbox(P, s, WX[i] - 0.30, WX[i] - 0.02, WL - 0.02, WL + 0.14, ZW - 0.04, ZW + 0.10);
        mbox(D, s, WX[i] - 0.38, WX[i] - 0.26, WL - 0.02, WL + 0.08, ZW + 0.22, ZW + 0.32);
      }
      for (i = 0; i < ROL.length; i++) mbox(P, s, ROL[i][0] - 0.06, ROL[i][0] + 0.06, WL - 0.02, WL + 0.16, ROL[i][1] - 0.05, ROL[i][1] + 0.05);
      /* compensating idler link to the front wheel; final drive; tension idler arm */
      belt(P, IDL.x, IDL.z, WX[0] + 0.20, ZW + 0.12, s > 0 ? WL - 0.02 : -(WL + 0.14), s > 0 ? WL + 0.14 : -(WL - 0.02), 0.11);
      cylY(P, SPR.x, s * (WL - 0.02), s * (WL + 0.10), SPR.z, 0.22, 12);
      belt(P, TEN.x, TEN.z, WX[5] - 0.10, ZW + 0.10, s > 0 ? WL - 0.02 : -(WL + 0.12), s > 0 ? WL + 0.12 : -(WL - 0.02), 0.09);

      /* the long muffler on the rear fender with its guard (text; M1, M6) */
      cylX(D, -3.05, -1.55, s * 1.52, ZF + 0.15, 0.12, 0.12, 12);
      cylX(D, -3.20, -3.05, s * 1.52, ZF + 0.15, 0.06, 0.06, 8);
      box(P, -3.00, -1.60, s > 0 ? 1.38 : -1.70, s > 0 ? 1.70 : -1.38, ZF + 0.29, ZF + 0.31);
      for (k = 0; k < 3; k++) mbox(P, s, -2.90 + k * 0.6, -2.86 + k * 0.6, 1.38, 1.70, ZF, ZF + 0.30);
      /* stowage boxes along the fender amidships (M1), lids dark-edged, team strip on one */
      mbox(P, s, -1.45, 1.55, 1.40, 1.72, ZF, ZF + 0.22);
      mbox(D, s, -1.45, 1.55, 1.395, 1.725, ZF + 0.22, ZF + 0.232);
      mbox(TM, s, -0.60, 0.40, 1.46, 1.66, ZF + 0.232, ZF + 0.246);
      for (k = 0; k < 4; k++) mbox(D, s, -1.20 + k * 0.80, -1.16 + k * 0.80, 1.72, 1.735, ZF + 0.06, ZF + 0.18);

      /* lamp group in its guard at the glacis top corner (M4, M6) */
      hx = 2.42; hy = s * 1.12; hz = 1.30;
      box(P, hx - 0.10, hx + 0.08, hy - 0.14, hy + 0.14, hz - 0.02, hz + 0.14);
      for (k = -1; k <= 1; k += 2) {
        cylX(P, hx + 0.06, hx + 0.14, hy + k * 0.07, hz + 0.08, 0.055, 0.06, 10);
        cylX(G, hx + 0.14, hx + 0.15, hy + k * 0.07, hz + 0.08, 0.048, 0.048, 10);
      }
      cyl(D, [hx - 0.06, hy - 0.18, hz], [hx + 0.22, hy - 0.18, hz + 0.20], 0.015, 0.015, 5);
      cyl(D, [hx - 0.06, hy + 0.18, hz], [hx + 0.22, hy + 0.18, hz + 0.20], 0.015, 0.015, 5);
      cyl(D, [hx + 0.22, hy - 0.18, hz + 0.20], [hx + 0.22, hy + 0.18, hz + 0.20], 0.015, 0.015, 5);
      /* tow clevises on the lower nose, tow hooks on the tail, tail lamps */
      box(D, 2.90, 3.06, s * 0.75 - 0.05, s * 0.75 + 0.05, 0.74, 0.88);
      box(D, -3.30, -3.16, s * 0.70 - 0.06, s * 0.70 + 0.06, 0.78, 0.92);
      box(P, -3.24, -3.18, s * 1.18 - 0.10, s * 1.18 + 0.10, ZD - 0.28, ZD - 0.14);
      box(G, -3.25, -3.24, s * 1.18 - 0.06, s * 1.18 + 0.06, ZD - 0.25, ZD - 0.17);
    }

    /* driver's (left, +Y) and bow gunner's (right, -Y) hatches on the deck ahead of the
       turret, a periscope each; the bow MG ball on the glacis right (M4, text) */
    for (s = -1; s <= 1; s += 2) {
      cylZ(P, 1.80, s * 0.62, ZD - 0.01, ZD + 0.05, 0.30, 16);
      cylZ(P, 1.80, s * 0.62, ZD + 0.05, ZD + 0.07, 0.25, 16);
      box(G, 2.02, 2.08, s * 0.62 - 0.07, s * 0.62 + 0.07, ZD + 0.0, ZD + 0.09);
      /* lifting eyes on the glacis */
      cylY(D, 2.62, s * 0.30 - 0.03, s * 0.30 + 0.03, 1.18, 0.06, 8);
    }
    var bx = 2.62, by = -0.62, bz = 1.13, gl = unit([0.5, 0, 0.866]);   /* glacis normal at 30 deg */
    cyl(P, [bx - gl[0] * 0.05, by, bz - gl[2] * 0.05], [bx + gl[0] * 0.08, by, bz + gl[2] * 0.08], 0.16, 0.13, 14);
    cylX(D, bx + 0.05, bx + 0.42, by, bz + 0.06, 0.022, 0.022, 6);
    cylX(D, bx + 0.05, bx + 0.16, by, bz + 0.06, 0.04, 0.04, 8);

    /* engine deck behind the turret: the louvred grilles and the access doors, a seam down the
       middle (M1, M6) */
    for (s = -1; s <= 1; s += 2) {
      y0 = s > 0 ? 0.06 : -1.10; y1 = s > 0 ? 1.10 : -0.06;
      box(P, -2.95, -1.55, y0, y1, ZD - 0.01, ZD + 0.03);
      for (k = 0; k < 8; k++) { x = -2.86 + k * 0.165; box(D, x, x + 0.07, y0 + 0.08, y1 - 0.08, ZD + 0.03, ZD + 0.05); }
    }
    box(D, -3.15, -3.02, -1.10, 1.10, ZD - 0.01, ZD + 0.03);
    /* the rear plate: the grille over the transmission and the pintle */
    box(D, -3.215, -3.20, -0.80, 0.80, 1.02, 1.30);
    cylX(D, -3.40, -3.20, 0, 0.85, 0.06, 0.06, 8);
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(Pts) {
    var P = Pts.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts, W = B.wheel, pt;
    for (i = 0; i < WX.length; i++) C.push([WX[i], ZW, RW + 0.06]);
    for (i = 0; i < ROL.length; i++) C.push([ROL[i][0], ROL[i][1], 0.21]);
    C.push([IDL.x, IDL.z, IDL.r + 0.045], [SPR.x, SPR.z, SPR.r + 0.06], [TEN.x, TEN.z, TEN.r + 0.045]);
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
    /* the steel track: a band with the links standing proud and the centre guides */
    cnt = Math.round(tot / 0.30); step = tot / cnt;
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
        belt(B.dark, px - dx * 0.08, pz - dz * 0.08, px + dx * 0.08, pz + dz * 0.08, y - TKW, y + TKW, 0.085);
        belt(B.dark, px - dx * 0.04 - dz * 0.08, pz - dz * 0.04 + dx * 0.08, px + dx * 0.04 - dz * 0.08, pz + dz * 0.04 + dx * 0.08, y - 0.03, y + 0.03, 0.07);
      }
      /* return rollers: dual rollers on stub axles */
      for (i = 0; i < ROL.length; i++) {
        W.col = [0.13, 0.135, 0.125];
        cylY(W, ROL[i][0], y - 0.20, y - 0.05, ROL[i][1], 0.17, 12);
        cylY(W, ROL[i][0], y + 0.05, y + 0.20, ROL[i][1], 0.17, 12);
        W.col = [0.34, 0.34, 0.22];
        cylY(W, ROL[i][0], y + s * 0.20, y + s * 0.24, ROL[i][1], 0.09, 8);
      }
      /* front idler: a dual wheel as big as the road wheels (M1) */
      W.col = [0.13, 0.135, 0.125];
      cylY(W, IDL.x, y - 0.23, y - 0.06, IDL.z, IDL.r, 18);
      cylY(W, IDL.x, y + 0.06, y + 0.23, IDL.z, IDL.r, 18);
      W.col = [0.36, 0.36, 0.24];
      cyl(W, [IDL.x, y + s * 0.23, IDL.z], [IDL.x, y + s * 0.25, IDL.z], IDL.r - 0.04, 0.17, 16);
      cylY(W, IDL.x, y + s * 0.24, y + s * 0.29, IDL.z, 0.09, 10);
      /* tension idler: a small dual wheel ahead of the sprocket (M1) */
      W.col = [0.13, 0.135, 0.125];
      cylY(W, TEN.x, y - 0.20, y - 0.06, TEN.z, TEN.r, 12);
      cylY(W, TEN.x, y + 0.06, y + 0.20, TEN.z, TEN.r, 12);
      W.col = [0.34, 0.34, 0.22];
      cylY(W, TEN.x, y + s * 0.20, y + s * 0.24, TEN.z, 0.08, 8);
      /* rear sprocket: two toothed rings (13 teeth) on a drum, the hub (M1) */
      pt = [];
      for (k = 0; k < 26; k++) { a = k / 26 * TAU; pt.push([SPR.x + Math.cos(a) * (k % 2 ? 0.29 : 0.345), SPR.z + Math.sin(a) * (k % 2 ? 0.29 : 0.345)]); }
      W.col = [0.30, 0.30, 0.20];
      prismXZ(W, pt, y - 0.20, y - 0.10);
      prismXZ(W, pt, y + 0.10, y + 0.20);
      W.col = [0.36, 0.36, 0.24];
      cylY(W, SPR.x, y - 0.10, y + 0.10, SPR.z, 0.26, 14);
      cyl(W, [SPR.x, y + s * 0.20, SPR.z], [SPR.x, y + s * 0.26, SPR.z], 0.24, 0.13, 14);
      W.col = [0.2, 0.2, 0.15];
      cylY(W, SPR.x, y + s * 0.25, y + s * 0.30, SPR.z, 0.07, 8);
    }
  }
  /* road wheel pair (M1): dual pressed wheels, rubber tyres, a dished face and a raised hub
     with its nut ring, both sides of the tank on one axle node */
  function addWheelPair(W) {
    var s, y, BODY = [0.36, 0.36, 0.24], RIM = [0.42, 0.42, 0.28], TYRE = [0.13, 0.135, 0.125], HUB = [0.30, 0.30, 0.20];
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
      cylY(W, 0, y + s * 0.29, y + s * 0.31, 0, 0.06, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the lozenge turret (M1, M2, M5, M6; text): stations along turret-local x (ring centre 0,
     + toward the gun), each a ring with the base (half width wb at height zb above the deck),
     the widest crease (wc at zc), the roof edge (wr at zr).  Heights above the deck. */
  var TS = [
    /* x,    wb,   zb,   wc,   zc,   wr,   zr  */
    [1.30, 0.40, 0.18, 0.52, 0.48, 0.34, 0.72],
    [1.10, 0.75, 0.04, 0.95, 0.50, 0.66, 0.86],
    [0.80, 0.98, 0.00, 1.26, 0.52, 0.86, 0.93],
    [0.30, 1.06, 0.00, 1.40, 0.52, 0.95, 0.93],
    [-0.40, 1.04, 0.00, 1.38, 0.52, 0.94, 0.93],
    [-1.00, 0.88, 0.14, 1.24, 0.52, 0.84, 0.92],
    [-1.36, 0.66, 0.22, 1.00, 0.52, 0.66, 0.89],
    [-1.44, 0.52, 0.26, 0.82, 0.52, 0.52, 0.85]
  ];
  function tRing(s) {
    var x = s[0], r = [], half = [[0, s[2]], [s[1], s[2]], [s[3], s[4]], [s[5], s[6]], [0, s[6]]], j;
    for (j = 0; j < half.length; j++) r.push([x, half[j][0], half[j][1]]);
    for (j = half.length - 2; j >= 1; j--) r.push([x, -half[j][0], half[j][1]]);
    return r;
  }
  function addTurret(B) {
    var P = B.paint, D = B.dark, G = B.glass, TM = B.team, rings = [], i, k, s, x, a, cx, cy, z0, ZR = 0.93;
    for (i = 0; i < TS.length; i++) rings.push(tRing(TS[i]));
    loft(P, rings);
    /* the turret ring's collar on the deck */
    cylZ(D, 0, 0, -0.02, 0.03, 0.98, 28);

    /* the cast mantlet: a squat rounded shield across the needle nose (M2, M4) */
    cyl(P, [1.32, -0.50, GZ], [1.32, 0.50, GZ], 0.25, 0.25, 16);
    box(P, 1.20, 1.32, -0.50, 0.50, GZ - 0.25, GZ + 0.25);
    cylX(P, 1.50, 1.62, 0, GZ, 0.16, 0.13, 14);
    /* the 90 mm M36: a long plain tapered tube, the short fat muzzle piece (M2, M3, M4) */
    cylX(P, 1.62, MUZ - 0.28, 0, GZ, 0.100, 0.078, 16);
    cylX(P, MUZ - 0.28, MUZ - 0.25, 0, GZ, 0.078, 0.105, 16);
    cylX(P, MUZ - 0.25, MUZ, 0, GZ, 0.105, 0.105, 16);
    cylX(D, MUZ - 0.005, MUZ + 0.002, 0, GZ, 0.055, 0.055, 12);
    /* coaxial MG port and the gunner's sight port in the mantlet */
    cylX(D, 1.45, 1.55, 0.30, GZ - 0.04, 0.035, 0.035, 8);
    cylX(D, 1.42, 1.52, -0.32, GZ + 0.10, 0.05, 0.05, 10);

    /* the rangefinder ears: round domes on both upper flanks ahead of the middle (M1, M2, M5) */
    for (s = -1; s <= 1; s += 2) {
      dome(P, [0.98, s * 1.05, 0.81], [0, s, 0], 0.17, 14);
      cylY(D, 0.98, s * 1.20, s * 1.225, 0.81, 0.07, 10);
    }

    /* the commander's cupola on the right (M5, M6), vision blocks, the .50 on its pintle,
       topping out at 3.33 m (published 3.35 over the MG) */
    cx = 0.28; cy = -0.55; z0 = ZR;
    cylZ(P, cx, cy, z0 - 0.02, z0 + 0.22, 0.42, 20);
    cylZ(P, cx, cy, z0 + 0.22, z0 + 0.32, 0.36, 18);
    for (i = 0; i < 6; i++) {
      a = i * TAU / 6 + 0.3;
      box(G, cx + Math.cos(a) * 0.40 - 0.04, cx + Math.cos(a) * 0.40 + 0.04, cy + Math.sin(a) * 0.40 - 0.06, cy + Math.sin(a) * 0.40 + 0.06, z0 + 0.10, z0 + 0.18);
    }
    cyl(D, [cx, cy, z0 + 0.32], [cx, cy, z0 + 0.77], 0.03, 0.03, 6);
    box(D, cx - 0.22, cx + 0.28, cy - 0.07, cy + 0.07, z0 + 0.77, z0 + 0.94);
    cylX(D, cx + 0.28, cx + 1.40, cy, z0 + 0.86, 0.022, 0.022, 6);
    cylX(D, cx + 0.28, cx + 0.50, cy, z0 + 0.86, 0.04, 0.04, 8);
    box(D, cx - 0.12, cx + 0.12, cy + 0.08, cy + 0.24, z0 + 0.67, z0 + 0.81);
    /* loader's hatch, left; the gunner's periscope hood ahead of the cupola */
    cylZ(P, -0.10, 0.55, z0 - 0.02, z0 + 0.06, 0.30, 16);
    cylZ(P, -0.10, 0.55, z0 + 0.06, z0 + 0.08, 0.25, 16);
    box(P, 0.85, 1.05, -0.45, -0.25, z0 - 0.05, z0 + 0.10);
    box(G, 1.05, 1.06, -0.42, -0.28, z0 + 0.0, z0 + 0.07);
    /* ventilator on the bustle roof, an aerial base and whip at the tail */
    cylZ(P, -0.85, 0.10, z0 - 0.02, z0 + 0.10, 0.16, 12);
    cylZ(P, -1.25, 0.45, z0 - 0.06, z0 + 0.06, 0.06, 8);
    cyl(D, [-1.25, 0.45, z0 + 0.06], [-1.27, 0.45, z0 + 0.95], 0.012, 0.006, 5);
    /* team flash on the roof */
    box(TM, -0.65, -0.25, -0.20, 0.25, z0 - 0.005, z0 + 0.012);
    /* grab rails along the crease on both flanks (M1, M5) */
    for (s = -1; s <= 1; s += 2) {
      cyl(D, [0.70, s * 1.36, 0.70], [-1.10, s * 1.32, 0.70], 0.016, 0.016, 5, true);
      for (k = 0; k < 4; k++) { x = 0.60 - k * 0.55; mbox(D, s, x - 0.02, x + 0.02, 1.20, 1.36, 0.68, 0.72); }
    }
    /* the stowage box hung on the bustle tail (M1, M2, M5, text) */
    box(P, -2.51, -1.42, -0.90, 0.90, 1.66 - ZD + 0.08, 2.37 - ZD);
    belt(P, -2.51, 1.66 - ZD + 0.08, -2.30, 1.66 - ZD - 0.02, -0.90, 0.90, 0.04);
    box(D, -2.52, -2.50, -0.85, 0.85, 1.85 - ZD, 1.88 - ZD);
    for (s = -1; s <= 1; s += 2) box(D, -2.30, -1.50, s > 0 ? 0.90 : -0.92, s > 0 ? 0.92 : -0.90, 2.20 - ZD, 2.23 - ZD);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C) {
    var T = materials(THREE, C), g = new THREE.Group(), i, wg, tg, WB, TB, HB = bins(T);
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
    tg.position.set(TRX, 0, ZD);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }
  return { build: build, kit: { Bin: Bin, box: box, cyl: cyl, cylX: cylX, flush: flush } };
})();

/* ------------------------------------------------- the reused builders, adapted by row */
var HeroDeuUsPattern = (function () {
  "use strict";
  var K = HeroM47.kit;

  /* sRGB <-> linear, per channel */
  function s2l(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function l2s(c) { return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; }
  function hex3(h) { return [parseInt(h.substr(1, 2), 16) / 255, parseInt(h.substr(3, 2), 16) / 255, parseInt(h.substr(5, 2), 16) / 255]; }
  /* REPAINT: scale every material the test picks so that the module's base colour "from"
     renders as "to".  The renderer linearises material colours (render3d.js prepModel) and
     multiplies them into the sRGB-decoded map, so the factor is taken in linear light and
     the colour written back in sRGB.  Works on a textured material (colour 1) and on the
     no-canvas fallback (colour = base) alike.  Each material once. */
  function repaint(root, test, from, to) {
    var a = hex3(from), b = hex3(to), f = [0, 1, 2].map(function (i) { return s2l(b[i]) / s2l(a[i]); }), seen = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var m = o.material;
      if (!m || !m.color || seen.indexOf(m) >= 0 || !test(m)) return;
      seen.push(m);
      m.color.setRGB(l2s(s2l(m.color.r) * f[0]), l2s(s2l(m.color.g) * f[1]), l2s(s2l(m.color.b) * f[2]));
    });
  }
  function named(root, name) { var r = null; root.traverse(function (o) { if (!r && o.name === name) r = o; }); return r; }
  /* the painted (textured) and the dark material of a node's own meshes */
  function mats(node) {
    var P = null, D = null, i, m;
    for (i = 0; i < node.children.length; i++) {
      if (!node.children[i].isMesh) continue;
      m = node.children[i].material;
      if (m.map || (P === null && m.color && m.color.r > 0.2)) P = P || m;
      else if (!m.map && m.color && m.color.r < 0.2) D = D || m;
    }
    return { paint: P, dark: D };
  }

  /* M109G (deu_e60_spg): the module's 1963 M109 (short M126, extractor, brake drum: G1, G2),
     Gelboliv for its olive drab, and the three smoke dischargers on a bracket at each front
     corner of the turret roof (G1; text: three a side).  The module's turret group sits at
     (TX -1.0, 0, ZD 1.69); its roof is at 2.70 and its face meets the roof at X 0.55, so in
     the turret frame the corners are at x 1.30..1.55, z 1.01, y +-1.05. */
  function m109g(THREE, M, C) {
    var g = HeroPaladin.build(THREE, M, C, "e60"), tur = named(g, "turret"), mm, B, s, k, y, a;
    repaint(g, function (m) { return !!m.map || (m.color && m.color.r > 0.2 && m.color.g > 0.2 && !m.vertexColors && m.roughness > 0.85); },
            HeroPaladin.variants.e60.paint.base, "#4c4b36");
    if (tur) {
      mm = mats(tur);
      B = { paint: new K.Bin(mm.paint || mm.dark, true), dark: new K.Bin(mm.dark || mm.paint, false) };
      for (s = -1; s <= 1; s += 2) {
        K.box(B.paint, 1.24, 1.50, s > 0 ? 0.90 : -1.20, s > 0 ? 1.20 : -0.90, 1.01, 1.07);
        for (k = 0; k < 3; k++) {
          y = s * (0.96 + k * 0.10); a = 0.72;
          K.cyl(B.paint, [1.34, y, 1.07], [1.34 + Math.cos(a) * 0.24, y + s * 0.04, 1.07 + Math.sin(a) * 0.24], 0.045, 0.045, 10);
          K.cyl(B.dark, [1.34 + Math.cos(a) * 0.24, y + s * 0.04, 1.07 + Math.sin(a) * 0.24], [1.34 + Math.cos(a) * 0.245, y + s * 0.04, 1.07 + Math.sin(a) * 0.245], 0.035, 0.035, 8);
        }
      }
      K.flush(THREE, tur, B);
    }
    return g;
  }

  /* M109A3G (deu_e80_spg): the module's M109A2 (39-calibre tube, M178 mount, bustle rack,
     NATO three-colour), with the German tube's brake: the meshes of the module's "barrel"
     node are replaced by the same tube and evacuator (the module's own figures: L 5.25,
     sleeve to 1.15, tube r 0.12 to 0.095, evacuator at 0.55 of the tube) ending in the round
     BOTTLE brake of G4/G6 (r 0.19, 0.62 m, a short taper from the tube, two windows a side
     between three walls), in the node's own materials. */
  function m109a3g(THREE, M, C) {
    var g = HeroPaladin.build(THREE, M, C, "e80"), br = named(g, "barrel"), mm, B, P, D, L, sl, t1, ev, i, s, w, r;
    if (!br) return g;
    mm = mats(br);
    P = new K.Bin(mm.paint || mm.dark, true); D = new K.Bin(mm.dark || mm.paint, false);
    for (i = br.children.length - 1; i >= 0; i--) if (br.children[i].isMesh) br.remove(br.children[i]);
    L = HeroPaladin.variants.e80.L; sl = 1.15; t1 = L - 0.70; r = 0.19;
    K.cylX(P, 0.40, sl, 0, 0, 0.20, 0.20, 22);
    K.cyl(P, [sl, 0, 0], [t1, 0, 0], 0.12, 0.095, 22);
    ev = sl + 0.55 * (t1 - sl);
    K.cyl(P, [ev - 0.40, 0, 0], [ev - 0.30, 0, 0], 0.108, 0.155, 22);
    K.cylX(P, ev - 0.30, ev + 0.30, 0, 0, 0.155, 0.155, 22);
    K.cyl(P, [ev + 0.30, 0, 0], [ev + 0.38, 0, 0], 0.155, 0.103, 22);
    /* the bottle: collar, taper, rear wall, two windows a side (dark), mid wall, front wall */
    K.cylX(P, t1, t1 + 0.08, 0, 0, 0.115, 0.115, 20);
    K.cyl(P, [t1 + 0.08, 0, 0], [t1 + 0.18, 0, 0], 0.115, r, 22);
    w = [[t1 + 0.18, t1 + 0.26], [t1 + 0.42, t1 + 0.48], [L - 0.06, L]];
    for (i = 0; i < w.length; i++) K.cylX(P, w[i][0], w[i][1], 0, 0, r, r, 22);
    for (i = 0; i < 2; i++) {
      var x0 = i ? w[1][1] : w[0][1], x1 = i ? w[2][0] : w[1][0];
      K.box(P, x0, x1, -r * 0.95, r * 0.95, r * 0.55, r * 0.95);
      K.box(P, x0, x1, -r * 0.95, r * 0.95, -r * 0.95, -r * 0.55);
      K.cylX(D, x0, x1, 0, 0, 0.10, 0.10, 12);
      for (s = -1; s <= 1; s += 2) K.box(D, x0, x1, s > 0 ? 0.0 : -r * 0.9, s > 0 ? r * 0.9 : 0.0, -r * 0.5, r * 0.5);
    }
    K.cylX(D, L - 0.008, L, 0, 0, 0.08, 0.08, 14);
    K.flush(THREE, br, { paint: P, dark: D });
    return g;
  }

  return { m109g: m109g, m109a3g: m109a3g, repaint: repaint };
})();

/* the MARS row in the M270 module's own table: the European-built M270 of 1990 as the
   module's 1991 M270 (two six-rocket M26 pods, NATO three-colour).  ord: the round its
   weapon is drawn as in flight, as nato_e90_mlrs. */
HeroUsMlrs.rows.deu_e90_mlrs = { veh: "m270", paint: "nato3", pods: "rocket", turret: true, louvre: false, ord: { w_e90_deu_mlrs: "m26" } };

/* len is the measured X extent of each build (dump.js) */
UNIT_MODELS["deu_e50_lighttank"] = { len: 8.15, build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M41"); } };
UNIT_MODELS["deu_e50_spaag"] = { len: 6.464, build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M42"); } };
UNIT_MODELS["deu_e50_spg"] = { len: 6.231, build: function (THREE, M, C) { return HeroM41.build(THREE, M, C, "M44"); } };
UNIT_MODELS["deu_e60_spg"] = { len: 6.62, build: function (THREE, M, C) { return HeroPaladin.pack(THREE, HeroDeuUsPattern.m109g(THREE, M, C)); } };
UNIT_MODELS["deu_e80_spg"] = { len: 9.12, build: function (THREE, M, C) { return HeroPaladin.pack(THREE, HeroDeuUsPattern.m109a3g(THREE, M, C)); } };
UNIT_MODELS["deu_e90_mlrs"] = { len: 7.00, ord: HeroUsMlrs.rows.deu_e90_mlrs.ord,
                                build: function (THREE, M, C) { return HeroUsMlrs.build("deu_e90_mlrs", THREE, M, C); } };
UNIT_MODELS["deu_e50_mbt"] = { len: 8.71, build: function (THREE, M, C) { return HeroM47.build(THREE, M, C); } };
UNIT_MODELS["fra_e50_mbt"] = { len: 8.71, build: function (THREE, M, C) { return HeroM47.build(THREE, M, C); } };
