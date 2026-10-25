/* ============ us_m103.js - HERO models: the M103 heavy tank ============
   The only heavy tank the US Army and Marine Corps fielded after 1945, in the two guises
   the era tables ask for:
     nato_e50_heavy   M103     (1957)  Army standard: gasoline AV-1790, two coaxial .30s,
                                       the stereoscopic rangefinder
     nato_e60_heavy   M103A2   (1964)  Marine Corps rebuild: the M60's AVDS-1790 diesel and
                                       its rear (louvred grille doors, fender boxes), one
                                       coaxial, the M24 coincidence rangefinder
   One builder, a VARIANTS table; build() takes the row name.  HeroM103 is kept as the name.

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons at width 960,
   cached in scratchpad/q_m103_ref:
     D1  "TM 9-2800, Tank, 120-mm gun, T43E1 (G-256).png" (TM 9-2800, 16 Feb 1954): the
         T43E1 (the tank rebuilt as the M103) from the left front, and the cut-off side and
         front elevations: 173-7/8 in from the rear road wheel's centre to the front one's
         (six pitches, 0.736 m each), "27x" in hull length (the last digit is cut off:
         6.86-7.11 m), 445 in overall, 113-3/8 in (2.88 m) to the turret roof; the rear
         sprocket, the turret's long sloped front, the canvas-covered mantlet.
     D2  "M103A1-crew.svg" (2019 drawing of an M103A1, right front 3/4): seven wheel pairs,
         six return rollers, the cupola at the right rear with the .50 on its post, the
         loader's hatch, the box at the right rear of the turret, two whips, the travel
         lock on the rear deck, the headlight groups on the glacis corners.
     P1  "M103 Heavy Tank armed with 120-mm Main Gun, 3rd Cavalry Museum, Fort Hood,
         Texas (1).jpg": PURE PORT SIDE, measured on a 2x grid (188 px/m from the 0.736 m
         wheel pitch; the hull then measures 6.95 m, agreeing with D1): wheel axles 0.40 m,
         idler and sprocket centres 0.86 m, six return rollers at 1.13 m between the wheel
         pairs, fender 1.44 m, deck 1.68 m, turret roof 2.86 m at the rear falling to 2.41 m
         at the mantlet, gun axis 2.14 m, cupola 1.2 m ahead of the bustle face, the
         rangefinder boss 3.3 m from the tail, the bustle's undercut 0.37 m over the deck.
     P2  "Amerikaans-Spaanse marine-oefeningen, Bestanddeelnr 917-0691.jpg" (USMC, 28 Oct
         1964): the M103A1/A2 in service, starboard front 3/4: the muzzle end, the cupola
         with the .50 on its mount, the box at the right rear of the turret.
     P3  "Tank approaches ramp of USS Saginaw (LST-1188) c1973.jpg": an M103A2 in service,
         1973, from the rear quarter, gun in the travel lock.
     P4  "M103 Coleman Barracks.jpg" (US Army, Germany, 1960/61): the Army tank's
         silhouette on a trailer.
     P5  "M103 heavy tank.jpg" (45th Infantry Division Museum, M103A2), starboard 3/4.
     P6  "Fort Lewis Museum 071.JPG" and "M103 Heavy Tank.jpg" (Fort Lewis M103A2), front
         right 3/4: the BARE cast mantlet, the tube with the bore evacuator and the blast
         deflector at its end, the bulbous cast nose, the two headlight groups in round
         guards near the glacis corners, the down-turned front fenders.
     P7  "M103A2 'USMC 233097 A12' (49917581541).jpg", "M103A2 museum.jpg", "M103A2 Heavy
         Tank (4536685064).jpg" (Bovington A2, starboard and port front 3/4): the cupola
         and pintle .50, the angled canister at each rear corner of the roof, the single
         coaxial port right of the gun, the rangefinder bosses, seven rubber-tyred wheel
         pairs.
     P8  "M103A2 Heavy Tank (4536686648).jpg" (Bovington A2, LEFT REAR 3/4): the M60-type
         rear - two big louvred grille doors standing proud of the rear plate - the curved
         rear mudguards over the sprockets, the box on the rear fender, the travel lock
         folded on the rear deck, the hand rail round the bustle, the bustle's deep undercut.
     P9  "US M103 (3666465598).jpg" (A2 running, head on): the turret's width against the
         tracks, the headlight groups, the rangefinder bosses, the canisters.
     P10 "M103 at AAF Museum.jpg" (A2, starboard side).
   Published (en.wikipedia M103 heavy tank, its Hunnicutt 1988 table): length gun forward
   448.6 in (11.39 m) M103/A1, 442.2 in (11.23 m) A2; width over tracks 143.0 in (3.63 m);
   height over the MG 140.1 in (3.56 m); ground clearance 15.4 in (0.39 m); 28 in track;
   seven road wheels a side on torsion bars; 120 mm M58; crew 5 with TWO loaders; the A1
   "removed one coaxial machine gun"; the A2: AVDS-1790 diesel from the M60, the M15
   stereoscopic rangefinder replaced by the M24 coincidence one.

   CORRECTIONS against the previous model (and its header):
   - hull 6.99 m (D1 "27x in", P1 against the D1 wheel pitch), not 7.7 m; the gun hangs
     4.4 m past the nose; road wheels at the D1 pitch 0.736 m (was 0.69), the idler and
     sprocket lower (0.86 m, P1), the return rollers BETWEEN the wheel pairs (P1);
   - the turret 2.85 m wide (P9 against the 3.63 m tracks), not 3.44 m;
   - the bore evacuator AND the blast deflector at the muzzle end (P2, P6), not a swelling;
   - the cupola at the right rear 1.2 m ahead of the bustle face (P1, P7), the loader's
     hatches either side of the breech (D2, P1);
   - the M103 gets its two coaxial ports, the A2 one (en.wikipedia; P7, P9);
   - the A2 gets its M60-type rear (P8); the old model put the diesel grilles on both.

   Recognition list (what makes it read at game zoom, and its source):
     1. the enormous 120 mm gun, 4.4 m past the nose, with the thick bore evacuator and the
        blast deflector at its end - D1, P2, P6, P7
     2. the long low cast turret: a long sloped front, widest at the ring, the big rounded
        bustle overhanging the engine deck on a deep undercut - P1, P8, D1
     3. the bare round cast mantlet of the M89 mount - P6, P1
     4. seven rubber-tyred wheel pairs nearly touching, six return rollers between them,
        the raised idler forward, the sprocket aft - P1, D1, D2
     5. flat fenders the full length, down-turned at the front, curved mudguards over the
        sprockets - P1, P6, P8
     6. the bulbous cast nose under a 30-degree glacis, two headlight groups in round
        guards near its corners, the driver's hatch at its top - P6, P9, D2
     7. the low cupola at the right rear with the .50 on its pintle - P1, P2, P7, D2
     8. the rangefinder end bosses high on both turret sides - P1, P7, P9
     9. the hand rail round the bustle, the whips at the rear - P8, D2
    10. M103: the box at the right rear of the turret, two coaxial ports - D2, P2
        M103A2: the canister at each rear corner, one coaxial, the louvred grille doors on
        the rear plate and the boxes on the rear fenders - P7, P8, P9
   Paint: US olive drab.  Every dated photograph of either tank (P2 1964, P3 1973, P4
   1960/61) is black and white; no dated colour photograph shows a USMC forest green, so
   both are drawn in the period olive drab (the M60A1 benchmark's #4f5436, about 0.8 of a
   lit olive drab).  No markings, numbers, stars or bumper codes.
   NOT CONFIRMED, drawn as judgement calls: the M103's rear plate (no photograph of the
   petrol tank's rear: drawn plain with its tow fittings, NOT with the A2's grilles); the
   engine-deck grille layout; where the A2's 6.4 in shorter published length sits (both are
   drawn on the same hull and gun, at the M103's 11.39 m); the road wheel size (0.63 m off
   P1); the turret plan (no plan view: P1 side, P9 front); the gunner's periscope; what the
   rear-corner box and canisters are (drawn as photographed).
   NOT DRAWN: the canvas mantlet cover (on some photographs, not others), stowage loads,
   the IR searchlight (no M103 photograph shows one).

   Materials: PAINT (canvas texture: base, mottling, cast pitting, weld seams, grime; metre
   UVs), DARK (track, rubber, fittings), LENS (vision blocks, lamps, by vertex colour), WHEEL
   (tyres, discs, hubs by vertex colour) and the team colour exactly as handed in (C.team):
   two small plates (engine deck, turret roof).  Nodes: "turret" (trains; origin on the
   ring centre at the deck, gun along +X), seven "roadwheel" groups (axle along local Y,
   each holding both sides).  Draw calls: hull 4 + turret 4 + 7 wheels = 15.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroM103 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table */
  var VARIANTS = {
    M103: { paint: { base: "#4f5436", blots: ["#474b30", "#59603e"], seed: 571 }, coax: 2, a2: false },
    A2:   { paint: { base: "#4f5436", blots: ["#464a2f", "#5a613f"], seed: 643 }, coax: 1, a2: true }
  };

  /* hull and running gear (D1: 0.736 m wheel pitch, hull 27x in; P1 side: heights;
     published: 3.63 m over the 28 in tracks, 0.39 m clearance) */
  var XT = -3.495, NOSE = 3.49;
  var TY = 1.46, TW = 0.355;
  var XW = [2.176, 1.44, 0.704, -0.032, -0.768, -1.504, -2.24], ZW = 0.40, RW = 0.315;
  var IDL = { x: 3.05, z: 0.84, r: 0.33 }, SPR = { x: -3.20, z: 0.86, r: 0.33 };
  var ROL = [1.808, 1.072, 0.336, -0.40, -1.136, -1.872], ZR = 1.13, RR = 0.14;
  var DECK = 1.68, FEND = 1.44, FW = 1.815, WS = 1.45, GL0 = 1.95, GK = 0.577;
  var TX = 0.05;                                /* turret ring centre (P1) */
  var REAR = -3.725;                             /* the mudguards' rear edge */
  var MUZ = REAR + 11.39 - TX;                  /* muzzle in the turret frame: 448.6 in overall */
  var GZ = 0.46;                                /* gun axis over the deck (P1: 2.14 m) */

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var cr = cross(sub(b, a), sub(c, a));
    if (Math.abs(cr[0]) + Math.abs(cr[1]) + Math.abs(cr[2]) < 1e-9) return;
    var f = unit(cr), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
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
  function triN(bin, a, b, c, hint) {
    var n = cross(sub(b, a), sub(c, a));
    if (dot(n, hint) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
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
  /* an oriented slab: centre c, half sizes along unit axes u, v, w */
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
    if (nocap) {
      /* an open tube has no volume to orient by: wind each face away from the axis */
      for (i = 0; i < seg; i++) {
        j = (i + 1) % seg;
        var h = [N[2 * i][0] + N[2 * j][0], N[2 * i][1] + N[2 * j][1], N[2 * i][2] + N[2 * j][2]];
        var f1 = cross(sub(V[2 * j], V[2 * i]), sub(V[2 * j + 1], V[2 * i]));
        if (dot(f1, h) >= 0) { bin.tri(V[2 * i], V[2 * j], V[2 * j + 1], N[2 * i], N[2 * j], N[2 * j + 1]); bin.tri(V[2 * i], V[2 * j + 1], V[2 * i + 1], N[2 * i], N[2 * j + 1], N[2 * i + 1]); }
        else { bin.tri(V[2 * i], V[2 * j + 1], V[2 * j], N[2 * i], N[2 * j + 1], N[2 * j]); bin.tri(V[2 * i], V[2 * i + 1], V[2 * j + 1], N[2 * i], N[2 * i + 1], N[2 * j + 1]); }
      }
      return;
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg, nocap) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg, nocap); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }
  /* a closed solid lofted through LEVELS, each a convex ring of [x, y, z] with the same count */
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
  /* a cast body: rings along x (each convex in y-z, same count) with smoothed normals,
     the end rings capped flat; normals pointed away from the ring's own centre */
  function castLoft(bin, L) {
    var n = L[0].length, m = L.length, NA = [], k, i, a, b, c, d;
    var ctr = L.map(function (R) { var s = [0, 0, 0]; R.forEach(function (p) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; }); return [s[0] / n, s[1] / n, s[2] / n]; });
    for (k = 0; k < m; k++) { NA.push([]); for (i = 0; i < n; i++) NA[k].push([0, 0, 0]); }
    function acc(k, i, f) { NA[k][i][0] += f[0]; NA[k][i][1] += f[1]; NA[k][i][2] += f[2]; }
    var Q = [];
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var i1 = (i + 1) % n;
        a = L[k][i]; b = L[k][i1]; c = L[k + 1][i1]; d = L[k + 1][i];
        var f = cross(sub(c, a), sub(d, b)), mid = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2];
        var cc = [(ctr[k][0] + ctr[k + 1][0]) / 2, (ctr[k][1] + ctr[k + 1][1]) / 2, (ctr[k][2] + ctr[k + 1][2]) / 2];
        if (dot(f, sub(mid, cc)) < 0) f = [-f[0], -f[1], -f[2]];
        f = unit(f);
        acc(k, i, f); acc(k, i1, f); acc(k + 1, i1, f); acc(k + 1, i, f);
        Q.push([k, i, i1, f]);
      }
    Q.forEach(function (q) {
      var k = q[0], i = q[1], i1 = q[2], f = q[3];
      var A = L[k][i], B = L[k][i1], Cc = L[k + 1][i1], Dd = L[k + 1][i];
      var nA = unit(NA[k][i]), nB = unit(NA[k][i1]), nC = unit(NA[k + 1][i1]), nD = unit(NA[k + 1][i]);
      var t = cross(sub(B, A), sub(Cc, A));
      if (dot(t, f) >= 0) { bin.tri(A, B, Cc, nA, nB, nC); bin.tri(A, Cc, Dd, nA, nC, nD); }
      else { bin.tri(A, Cc, B, nA, nC, nB); bin.tri(A, Dd, Cc, nA, nD, nC); }
    });
    [0, m - 1].forEach(function (k) {
      var hint = k === 0 ? [-1, 0, 0] : [1, 0, 0], R = L[k];
      for (i = 1; i + 1 < n; i++) triN(bin, R[0], R[i], R[i + 1], hint);
    });
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function canvasTex(THREE, key, size, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      draw(cv.getContext("2d"), size);
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* paint: one tile is 1 / 0.34 = 2.9 m. Olive drab base, soft mottling, the orange-peel
     pitting of the cast turret and nose, weld seams with bolt rows, dust and rain streaks
     (P1, P2, P6) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "m103" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.28 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 1100; i++) {
        q.fillStyle = (i % 2) ? "rgba(18,20,12,0.15)" : "rgba(230,232,205,0.07)";
        q.fillRect(R() * S, R() * S, 1 + R() * 3, 1 + R() * 2);
      }
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.45)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(200,190,160,0.06)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), VC = THREE.VertexColors !== undefined ? THREE.VertexColors : true;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x252623, roughness: 0.8, metalness: 0.28 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: VC });
    T.lens = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.2, vertexColors: VC });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), lens: new Bin(T.lens, false, true), team: new Bin(T.team, false) }; }
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
  var GLASS = [0.30, 0.42, 0.46], LAMP = [0.80, 0.78, 0.66], RED = [0.55, 0.12, 0.08];

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

  /* ---------------------------------------------------------------- hull */
  /* deck height along the hull: flat to the glacis break, then the upper glacis at 30 deg
     (published: 5 in at 60 deg from the vertical) down to the cast nose */
  function deckZ(x) { return x <= GL0 ? DECK : DECK - GK * (x - GL0); }
  /* station table (D1 hull length and wheel base, P1 side, P6/P9 front): x, lower-hull
     half width, belly z, sponson half width.  The sponson floor and the fender sit at
     FEND; forward of where the glacis crosses the fender line the hull is the narrow cast
     nose, rounded in plan and swelling forward under the glacis (P6, P9); the belly rises
     in the lower nose plate (published 4.5 in at 50 deg). */
  var HS = [
    [-3.495, 1.02, 0.70, 1.42],
    [-3.45, 1.05, 0.56, 1.44],
    [-3.38, 1.06, 0.45, 1.45],
    [-3.20, 1.06, 0.39, 1.45],
    [-1.50, 1.06, 0.39, 1.45],
    [ 0.20, 1.06, 0.39, 1.45],
    [ 1.95, 1.06, 0.39, 1.45],
    [ 2.20, 1.06, 0.39, 1.44],
    [ 2.33, 1.06, 0.39, 1.40],
    [ 2.38, 1.06, 0.39, 1.06],
    [ 2.85, 1.06, 0.39, 1.06],
    [ 3.04, 1.04, 0.41, 1.04],
    [ 3.18, 1.00, 0.50, 1.00],
    [ 3.30, 0.94, 0.59, 0.94],
    [ 3.40, 0.84, 0.67, 0.84],
    [ 3.46, 0.70, 0.73, 0.70],
    [ 3.49, 0.52, 0.76, 0.52]
  ];
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = Math.max(deckZ(x), zB + 0.06), e = Math.min(0.03, (zT - zB) / 4);
    var zS = Math.min(FEND, zT - 2 * e);
    if (x < XT + 0.09) zT = Math.min(zT, DECK - (x < XT + 0.04 ? 0.08 : 0.025));
    return [[x, wb, zB], [x, wb, zS], [x, ws, zS], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, zS], [x, -wb, zS], [x, -wb, zB]];
  }

  function addHull(B, V) {
    var R = HS.map(hullRing), i, k, k1, a, b, c, d, e, dy, dz, s, x, n = R[0].length;
    for (i = 0; i + 1 < R.length; i++)
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) { dy = c[1] - d[1]; dz = c[2] - d[2]; }
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        e = [0, dz, -dy];
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    [[0, -1], [R.length - 1, 1]].forEach(function (q) {
      var r = R[q[0]], h = [q[1], 0, 0];
      triN(B.paint, r[0], r[1], r[8], h); triN(B.paint, r[0], r[8], r[9], h);
      triN(B.paint, r[2], r[3], r[6], h); triN(B.paint, r[2], r[6], r[7], h);
      triN(B.paint, r[3], r[4], r[5], h); triN(B.paint, r[3], r[5], r[6], h);
    });

    for (s = -1; s <= 1; s += 2) {
      var yi = s * 1.02, yo = s * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      var wlo = s > 0 ? WS - 0.02 : -FW, whi = s > 0 ? FW : -(WS - 0.02);
      /* the flat fender the full length (P1), its turned-down outer lip, and forward of the
         sponson the front fender over the idler, bent down at its end (P6) */
      box(B.paint, -3.12, 3.00, wlo, whi, FEND, FEND + 0.035);
      box(B.paint, -3.12, 3.00, s > 0 ? FW - 0.025 : -FW, s > 0 ? FW : -FW + 0.025, FEND - 0.06, FEND + 0.035);
      box(B.paint, 2.28, 3.00, ylo, yhi, FEND, FEND + 0.035);
      belt(B.paint, 3.00, FEND + 0.018, 3.34, FEND - 0.04, ylo, yhi, 0.035);
      belt(B.paint, 3.34, FEND - 0.04, 3.44, FEND - 0.30, ylo + 0.01, yhi - 0.01, 0.045);
      box(B.paint, 3.10, 3.42, ylo + 0.01, ylo + 0.045, FEND - 0.26, FEND - 0.02);
      box(B.paint, 3.10, 3.42, yhi - 0.045, yhi - 0.01, FEND - 0.26, FEND - 0.02);
      /* the curved rear mudguard over the sprocket (P8), with its outer lip */
      var MC = [-3.12, 0.90], MR = FEND + 0.018 - 0.90, prev = null, j, ang, pt;
      for (j = 0; j <= 7; j++) {
        ang = Math.PI / 2 + (Math.PI / 2) * j / 7;
        pt = [MC[0] + Math.cos(ang) * MR, MC[1] + Math.sin(ang) * MR];
        if (prev) {
          belt(B.paint, prev[0], prev[1], pt[0], pt[1], s > 0 ? WS - 0.02 : -FW, s > 0 ? FW : -(WS - 0.02), 0.035);
          belt(B.paint, prev[0], prev[1], pt[0], pt[1], s > 0 ? FW - 0.025 : -FW, s > 0 ? FW : -FW + 0.025, 0.09);
        }
        prev = pt;
      }
      /* fender brackets down to the hull side under the shelf */
      for (i = 0; i < 5; i++) box(B.dark, -2.6 + i * 1.25, -2.55 + i * 1.25, s > 0 ? 1.05 : -1.12, s > 0 ? 1.12 : -1.05, FEND - 0.16, FEND);
      /* the joint where the sponson wall meets the fender */
      box(B.dark, -3.10, 2.30, s > 0 ? WS - 0.012 : -WS - 0.012, s > 0 ? WS + 0.012 : -WS + 0.012, FEND + 0.035, FEND + 0.05);

      /* headlight group in its round brush guard near the glacis corner (P6, P9, D2) */
      x = 2.72; var yh = s * 0.66, zh = deckZ(x);
      box(B.paint, x - 0.14, x + 0.10, yh - 0.17, yh + 0.17, zh - 0.06, zh + 0.12);
      B.lens.col = LAMP;
      cylX(B.lens, x + 0.10, x + 0.13, yh - 0.07, zh + 0.05, 0.065, 0.065, 12);
      cylX(B.lens, x + 0.10, x + 0.13, yh + 0.07, zh + 0.05, 0.05, 0.05, 10);
      var NG = 10, gp = null, gg;
      for (gg = 0; gg <= NG; gg++) {
        var ga = Math.PI * gg / NG, GP = [x + 0.20, yh + Math.cos(ga) * 0.24, zh + 0.03 + Math.sin(ga) * 0.24];
        if (gp) cyl(B.dark, gp, GP, 0.018, 0.018, 5, true);
        gp = GP;
      }
      cyl(B.dark, [x - 0.05, yh - 0.24, zh + 0.03], [x + 0.20, yh - 0.24, zh + 0.03], 0.018, 0.018, 5, true);
      cyl(B.dark, [x - 0.05, yh + 0.24, zh + 0.03], [x + 0.20, yh + 0.24, zh + 0.03], 0.018, 0.018, 5, true);
      /* the two big tow clevises on the lower nose (P6) and the rear tow hooks */
      box(B.dark, 3.28, 3.50, s * 0.46 - 0.07, s * 0.46 + 0.07, 0.62, 0.76);
      cylY(B.dark, 3.45, s * 0.46 - 0.10, s * 0.46 + 0.10, 0.69, 0.04, 8);
      box(B.dark, XT - 0.12, XT, s * 0.78 - 0.07, s * 0.78 + 0.07, 0.74, 0.90);
      /* lifting eyes on the glacis edge */
      x = 2.15; box(B.dark, x - 0.06, x + 0.06, s * 1.30 - 0.02, s * 1.30 + 0.02, deckZ(x), deckZ(x) + 0.08);
      /* tool stowage clamped to the sponson wall over the fender */
      cylX(B.dark, -2.00, -0.20, s * (WS + 0.04), FEND + 0.15, 0.022, 0.022, 6);
      box(B.paint, -1.85, -0.35, s > 0 ? WS : -(WS + 0.06), s > 0 ? WS + 0.06 : -WS, FEND + 0.05, FEND + 0.12);
    }

    /* driver's hatch on the centre line at the top of the glacis, its three periscopes (D2) */
    x = 2.36;
    cyl(B.paint, [x, 0, deckZ(x) - 0.03], [x, 0, deckZ(x) + 0.05], 0.34, 0.34, 18);
    cyl(B.paint, [x, 0, deckZ(x) + 0.05], [x, 0, deckZ(x) + 0.08], 0.29, 0.26, 16);
    for (i = -1; i <= 1; i++) {
      var px = 2.66 - Math.abs(i) * 0.04, py = i * 0.20;
      box(B.paint, px - 0.06, px + 0.06, py - 0.08, py + 0.08, deckZ(px) - 0.02, deckZ(px) + 0.08);
      B.lens.col = GLASS;
      box(B.lens, px + 0.06, px + 0.075, py - 0.06, py + 0.06, deckZ(px) + 0.01, deckZ(px) + 0.06);
    }
    /* the casting's parting line round the nose, below the glacis (P6) */
    slab(B.dark, [3.20, 0, deckZ(3.20) + 0.004], unit([1, 0, -GK]), [0, 1, 0], unit([GK, 0, 1]), 0.012, 0.98, 0.006);

    /* --- engine deck: the louvred grille doors either side of the centre plate, the access
       plates ahead of them, the fuel caps (judgement, after D2); team strip --- */
    for (s = -1; s <= 1; s += 2) {
      var ya = s > 0 ? 0.12 : -1.30, yb = s > 0 ? 1.30 : -0.12;
      box(B.dark, -3.30, -1.95, ya, yb, DECK - 0.01, DECK + 0.012);
      for (i = 0; i < 12; i++) box(B.paint, -3.28 + i * 0.112, -3.23 + i * 0.112, ya + 0.02, yb - 0.02, DECK + 0.012, DECK + 0.04);
      box(B.paint, -1.88, -1.30, s > 0 ? 0.08 : -1.30, s > 0 ? 1.30 : -0.08, DECK, DECK + 0.03);
      cylZ(B.paint, -1.60, s * 1.30, DECK, DECK + 0.05, 0.09, 10);
    }
    box(B.paint, -3.30, -1.95, -0.12, 0.12, DECK, DECK + 0.05);
    box(B.team, -2.90, -2.30, -0.10, 0.10, DECK + 0.05, DECK + 0.065);

    /* --- the gun travel lock, folded flat on the rear deck (D2, P8) --- */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -3.42, -3.30, s * 0.30 - 0.05, s * 0.30 + 0.05, DECK - 0.02, DECK + 0.10);
      cyl(B.dark, [-3.36, s * 0.30, DECK + 0.07], [-2.62, s * 0.16, DECK + 0.08], 0.035, 0.035, 8);
    }
    box(B.dark, -2.70, -2.56, -0.24, 0.24, DECK + 0.04, DECK + 0.12);

    /* --- rear plate --- */
    box(B.paint, XT - 0.10, XT, -0.13, 0.13, 0.78, 0.96);
    cylZ(B.dark, XT - 0.14, 0, 0.76, 0.98, 0.05, 8);
    if (V.a2) {
      /* the M60-type rear (P8): two big louvred grille doors standing proud of the upper
         rear plate, their slats raked down and outward */
      for (s = -1; s <= 1; s += 2) {
        var g0 = s > 0 ? 0.05 : -1.05, g1 = s > 0 ? 1.05 : -0.05;
        box(B.paint, XT - 0.18, XT, g0, g1, 1.00, 1.04);
        box(B.paint, XT - 0.18, XT, g0, g1, 1.60, 1.64);
        box(B.paint, XT - 0.18, XT, s > 0 ? g0 : g1 - 0.04, s > 0 ? g0 + 0.04 : g1, 1.00, 1.64);
        box(B.paint, XT - 0.18, XT, s > 0 ? g1 - 0.04 : g0, s > 0 ? g1 : g0 + 0.04, 1.00, 1.64);
        box(B.dark, XT - 0.10, XT, g0, g1, 1.04, 1.60);
        for (i = 0; i < 10; i++) {
          var zz = 1.07 + i * 0.054;
          slab(B.paint, [XT - 0.12, (g0 + g1) / 2, zz], unit([0.6, 0, -0.8]), [0, 1, 0], unit([0.8, 0, 0.6]), 0.07, 0.48, 0.008);
        }
        /* the box on each rear fender (P8, P10) */
        var fy0 = s > 0 ? WS + 0.03 : -FW + 0.04, fy1 = s > 0 ? FW - 0.04 : -(WS + 0.03);
        box(B.paint, -3.32, -2.82, fy0, fy1, FEND + 0.035, FEND + 0.27);
        box(B.dark, -3.33, -2.81, fy0 - 0.005, fy1 + 0.005, FEND + 0.255, FEND + 0.268);
        box(B.dark, -3.10, -3.02, s > 0 ? fy1 : fy0 - 0.01, s > 0 ? fy1 + 0.01 : fy0, FEND + 0.12, FEND + 0.20);
      }
    } else {
      /* the petrol tank's rear plate: no photograph - plain, with its access plate */
      box(B.paint, XT - 0.03, XT, -0.90, 0.90, 1.10, 1.50);
    }
  }

  /* ------------------------------------------------------------ running gear */
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts;
    var TH = 0.045;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + TH]);
    for (i = 0; i < ROL.length; i++) C.push([ROL[i], ZR, RR + TH]);
    C.push([IDL.x, IDL.z, IDL.r + TH], [SPR.x, SPR.z, SPR.r + TH]);
    pts = [];
    for (i = 0; i < C.length; i++) for (k = 0; k < 28; k++) pts.push([C[i][0] + Math.cos(k / 28 * TAU) * C[i][2], C[i][1] + Math.sin(k / 28 * TAU) * C[i][2]]);
    pts = hull2(pts);
    /* the top run droops a little between the return rollers (P1) */
    pts = pts.map(function (pt) {
      if (pt[1] < ZR) return pt;
      var j, sag = 0, X = [SPR.x].concat(ROL.slice().reverse(), [IDL.x]);
      for (j = 0; j + 1 < X.length; j++) {
        var x0 = X[j], x1 = X[j + 1];
        if (pt[0] > x0 + 0.15 && pt[0] < x1 - 0.15) { var u = (pt[0] - x0) / (x1 - x0); sag = 0.03 * 4 * u * (1 - u); }
      }
      return [pt[0], pt[1] - sag];
    });
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / 0.176); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      /* the web of the 28 in track, then each steel-backed rubber chevron shoe, the end
         connectors, the guide horn inside (en.wikipedia; P1, P8) */
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW + 0.05, y + TW - 0.05, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.074, pz - dz * 0.074, px + dx * 0.074, pz + dz * 0.074, y - TW, y + TW, 0.085);
        if (k % 2 === 0) belt(B.dark, px - dx * 0.03 - dz * 0.07, pz - dz * 0.03 + dx * 0.07, px + dx * 0.03 - dz * 0.07, pz + dz * 0.03 + dx * 0.07, y - 0.025, y + 0.025, 0.06);
      }
      /* rear drive sprocket: two big-toothed rings on a hub (P1, P8) */
      for (k = -1; k <= 1; k += 2) {
        var yr0 = y + k * 0.12, yr1 = y + k * 0.21;
        cylY(B.dark, SPR.x, Math.min(yr0, yr1), Math.max(yr0, yr1), SPR.z, SPR.r - 0.03, 18);
        for (i = 0; i < 12; i++) {
          var ta = (i + 0.5 * (k + 1)) / 12 * TAU;
          slab(B.dark, [SPR.x + Math.cos(ta) * (SPR.r - 0.005), (yr0 + yr1) / 2, SPR.z + Math.sin(ta) * (SPR.r - 0.005)],
               [Math.cos(ta), 0, Math.sin(ta)], [0, 1, 0], [-Math.sin(ta), 0, Math.cos(ta)], 0.04, 0.045, 0.035);
        }
      }
      cylY(B.paint, SPR.x, y - 0.12, y + 0.12, SPR.z, 0.22, 14);
      cylY(B.paint, SPR.x, y + s * 0.21, y + s * 0.27, SPR.z, 0.18, 12);
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.30, SPR.z, 0.07, 8);
      cylY(B.paint, SPR.x, s * 1.02, s * 1.20, SPR.z, 0.20, 12);
      /* front idler: a dual disc wheel on its crank (P1) */
      cylY(B.dark, IDL.x, y - 0.27, y - 0.10, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + 0.10, y + 0.27, IDL.z, IDL.r, 18);
      cylY(B.paint, IDL.x, y - 0.10, y + 0.10, IDL.z, IDL.r - 0.06, 14);
      cyl(B.paint, [IDL.x, y + s * 0.27, IDL.z], [IDL.x, y + s * 0.29, IDL.z], IDL.r - 0.04, 0.12, 16);
      cylY(B.dark, IDL.x, y + s * 0.29, y + s * 0.32, IDL.z, 0.07, 8);
      box(B.dark, IDL.x - 0.40, IDL.x, s * 1.06 - 0.04, s * 1.06 + 0.04, IDL.z - 0.05, IDL.z + 0.05);
      /* six return rollers between the wheel pairs (P1, D2) */
      for (i = 0; i < ROL.length; i++) {
        cylY(B.dark, ROL[i], y - 0.26, y - 0.04, ZR, RR, 12);
        cylY(B.dark, ROL[i], y + 0.04, y + 0.26, ZR, RR, 12);
        cylY(B.paint, ROL[i], s * 1.06, y + s * 0.27, ZR, 0.045, 8);
      }
      /* the long torsion arms and bump stops; shock absorbers at the end stations (P1) */
      for (i = 0; i < XW.length; i++) {
        box(B.dark, XW[i] - 0.02, XW[i] + 0.42, s > 0 ? 1.06 : -1.16, s > 0 ? 1.16 : -1.06, ZW - 0.05, ZW + 0.05);
        box(B.paint, XW[i] + 0.30, XW[i] + 0.44, s > 0 ? 1.06 : -1.12, s > 0 ? 1.12 : -1.06, ZW + 0.30, ZW + 0.40);
      }
      [0, 1, 5, 6].forEach(function (w) {
        cyl(B.dark, [XW[w] + 0.10, s * 1.10, ZW + 0.06], [XW[w] + 0.44, s * 1.10, FEND - 0.10], 0.04, 0.04, 8);
      });
    }
  }

  /* road wheel (P1, P7): dual 0.63 m wheels, black rubber tyres, dished discs in body
     colour, a hub cap with its bolt ring */
  var TYRE = [0.10, 0.10, 0.095], HUB = [0.16, 0.16, 0.14];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], DISH = [rr * 0.85, gg * 0.85, bb * 0.85];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.29, y - 0.13, 0, RW, 18);
      cylY(W, 0, y + 0.13, y + 0.29, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.13, y + 0.13, 0, 0.25, 12);
      cyl(W, [0, y + s * 0.29, 0], [0, y + s * 0.305, 0], 0.255, 0.19, 16);
      cyl(W, [0, y - s * 0.29, 0], [0, y - s * 0.305, 0], 0.255, 0.19, 16);
      W.col = DISH;
      cylY(W, 0, Math.min(y + s * 0.305, y + s * 0.32), Math.max(y + s * 0.305, y + s * 0.32), 0, 0.135, 14);
      W.col = HUB;
      for (i = 0; i < 6; i++) {
        a = i / 6 * TAU;
        box(W, Math.cos(a) * 0.095 - 0.015, Math.cos(a) * 0.095 + 0.015, s > 0 ? y + 0.32 : y - 0.335, s > 0 ? y + 0.335 : y - 0.32, Math.sin(a) * 0.095 - 0.015, Math.sin(a) * 0.095 + 0.015);
      }
      cylY(W, 0, Math.min(y + s * 0.32, y + s * 0.345), Math.max(y + s * 0.32, y + s * 0.345), 0, 0.06, 10);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* The big cast turret (P1 side, P9 front, P8 rear).  Stations: u over the ring centre,
     bottom z, half width at the bottom, greatest half width and its height, roof-edge half
     width and roof z.  The bustle (u < -1.4) stands 0.37 m over the deck on its undercut
     (P1, P8); forward of the ring the long sloped front closes onto the mantlet. */
  var TS = [
    [-2.13, 0.42, 0.66, 0.76, 0.80, 0.44, 1.02],
    [-2.09, 0.38, 0.92, 1.00, 0.78, 0.62, 1.12],
    [-1.97, 0.37, 1.10, 1.17, 0.76, 0.80, 1.17],
    [-1.72, 0.37, 1.22, 1.30, 0.74, 0.90, 1.18],
    [-1.44, 0.33, 1.28, 1.36, 0.70, 0.95, 1.18],
    [-1.30, 0.06, 1.28, 1.39, 0.64, 0.97, 1.18],
    [-0.60, 0.00, 1.30, 1.42, 0.62, 0.97, 1.18],
    [ 0.10, 0.00, 1.28, 1.39, 0.58, 0.93, 1.12],
    [ 0.70, 0.03, 1.16, 1.27, 0.54, 0.80, 1.04],
    [ 1.20, 0.06, 0.94, 1.03, 0.48, 0.62, 0.90],
    [ 1.50, 0.09, 0.74, 0.81, 0.44, 0.47, 0.80],
    [ 1.62, 0.13, 0.62, 0.68, 0.42, 0.38, 0.74]
  ];
  function tRing(S) {
    var x = S[0], zb = S[1], wl = S[2], wm = S[3], zm = S[4], wt = S[5], zt = S[6], R = [], i, t;
    var arc = [];
    for (i = 1; i <= 3; i++) { t = i / 4 * Math.PI / 2; arc.push([wt + (wm - wt) * Math.cos(t), zm + (zt - zm) * Math.sin(t)]); }
    R.push([x, wl, zb], [x, wm, zm]);
    arc.forEach(function (p) { R.push([x, p[0], p[1]]); });
    R.push([x, wt, zt], [x, -wt, zt]);
    arc.slice().reverse().forEach(function (p) { R.push([x, -p[0], p[1]]); });
    R.push([x, -wm, zm], [x, -wl, zb]);
    return R;
  }
  function tHalf(x, z) {
    var k, S0, S1, u, w0, w1;
    function wAt(S, z) {
      if (z <= S[4]) return S[2] + (S[3] - S[2]) * Math.max(0, (z - S[1]) / ((S[4] - S[1]) || 1));
      var v = Math.min(1, (z - S[4]) / ((S[6] - S[4]) || 1));
      return S[5] + (S[3] - S[5]) * Math.cos(Math.asin(Math.min(1, v)));
    }
    for (k = 0; k + 1 < TS.length; k++) if (x >= TS[k][0] && x <= TS[k + 1][0]) break;
    if (k + 1 >= TS.length) k = TS.length - 2;
    S0 = TS[k]; S1 = TS[k + 1]; u = Math.max(0, Math.min(1, (x - S0[0]) / (S1[0] - S0[0])));
    w0 = wAt(S0, z); w1 = wAt(S1, z);
    return w0 + (w1 - w0) * u;
  }
  function roofAt(x) {
    var k, u;
    for (k = 0; k + 1 < TS.length; k++) if (x >= TS[k][0] && x <= TS[k + 1][0]) { u = (x - TS[k][0]) / (TS[k + 1][0] - TS[k][0]); return TS[k][6] + (TS[k + 1][6] - TS[k][6]) * u; }
    return x < TS[0][0] ? TS[0][6] : TS[TS.length - 1][6];
  }

  function addGun(B, V) {
    var M = MUZ;
    /* the M89 mount's bare cast mantlet: a big rounded block round the gun (P6, P1) */
    var MS = [[1.36, 0.62, 0.40], [1.64, 0.62, 0.41], [1.84, 0.56, 0.38], [1.97, 0.44, 0.31], [2.05, 0.26, 0.22]];
    castLoft(B.paint, MS.map(function (S) {
      var R = [], i, a, c, sn;
      for (i = 0; i < 18; i++) {
        a = i / 18 * TAU; c = Math.cos(a); sn = Math.sin(a);
        R.push([S[0], S[1] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 0.7), GZ - 0.02 + S[2] * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), 0.7)]);
      }
      return R;
    }));
    /* 120 mm M58: the root collar, the long tube, then at its end the bore evacuator and
       the blast deflector with a groove between (P2, P6, P7: the last fifth) */
    var E1 = M - 0.50, E0 = M - 1.15;
    cylX(B.paint, 2.02, 2.32, 0, GZ, 0.17, 0.14, 18);
    cylX(B.paint, 2.32, E0 - 0.06, 0, GZ, 0.122, 0.100, 18);
    cylX(B.paint, E0 - 0.06, E0, 0, GZ, 0.100, 0.145, 18);
    cylX(B.paint, E0, E1, 0, GZ, 0.145, 0.145, 18);
    cylX(B.dark, E0 + 0.20, E0 + 0.23, 0, GZ, 0.148, 0.148, 16);
    cylX(B.paint, E1, E1 + 0.04, 0, GZ, 0.130, 0.130, 16);
    cylX(B.paint, E1 + 0.04, M - 0.03, 0, GZ, 0.152, 0.152, 18);
    cylX(B.paint, M - 0.03, M, 0, GZ, 0.152, 0.140, 18);
    cylX(B.dark, M - 0.004, M + 0.003, 0, GZ, 0.068, 0.068, 12);
    /* coaxial .30s in the mantlet face: two on the M103, one (right of the gun) after the
       A1 dropped the other (en.wikipedia; P7, P9) */
    cylX(B.dark, 1.90, 2.06, -0.32, GZ - 0.04, 0.035, 0.035, 8);
    if (V.coax > 1) cylX(B.dark, 1.90, 2.06, 0.32, GZ - 0.04, 0.035, 0.035, 8);
  }

  function addTurret(B, V) {
    var s, i, a, x, y, z, P, k;
    castLoft(B.paint, TS.map(tRing));
    cylZ(B.paint, 0, 0, -0.05, 0.04, 1.14, 36);
    addGun(B, V);

    /* commander's cupola at the right rear (P1, P7, D2): the base ring, the drum with its
       vision blocks, the hatch, and the .50 on its pintle over it (P2, P7) */
    var CX = -1.15, CY = -0.36, CZ = roofAt(CX);
    cylZ(B.paint, CX, CY, CZ - 0.16, CZ + 0.06, 0.47, 24);
    cyl(B.paint, [CX, CY, CZ + 0.06], [CX, CY, CZ + 0.22], 0.43, 0.41, 24);
    B.lens.col = GLASS;
    for (i = 0; i < 8; i++) {
      a = (i + 0.5) / 8 * TAU;
      slab(B.lens, [CX + Math.cos(a) * 0.415, CY + Math.sin(a) * 0.415, CZ + 0.14], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.02, 0.08, 0.045);
    }
    cyl(B.paint, [CX, CY, CZ + 0.22], [CX, CY, CZ + 0.30], 0.40, 0.30, 22);
    box(B.dark, CX - 0.44, CX - 0.36, CY - 0.10, CY + 0.10, CZ + 0.20, CZ + 0.28);
    /* the pintle and cradle, the M2's receiver, barrel and ammunition box */
    var MX = CX + 0.12, MY = CY - 0.05, MZ = CZ + 0.62;
    cylZ(B.dark, MX, MY, CZ + 0.28, MZ - 0.06, 0.035, 8);
    box(B.dark, MX - 0.10, MX + 0.12, MY - 0.07, MY + 0.07, MZ - 0.08, MZ - 0.04);
    box(B.dark, MX - 0.30, MX + 0.26, MY - 0.06, MY + 0.06, MZ - 0.04, MZ + 0.08);
    cylX(B.dark, MX + 0.26, MX + 1.40, MY, MZ + 0.02, 0.022, 0.022, 8);
    cylX(B.dark, MX + 0.26, MX + 0.70, MY, MZ + 0.02, 0.034, 0.034, 8);
    box(B.dark, MX - 0.06, MX + 0.16, MY + 0.06, MY + 0.20, MZ - 0.12, MZ + 0.06);
    box(B.dark, MX - 0.40, MX - 0.30, MY - 0.03, MY + 0.03, MZ - 0.06, MZ + 0.04);

    /* the two loaders' hatches either side of the breech (D2, P1), each with its periscope */
    for (s = -1; s <= 1; s += 2) {
      x = -0.25; y = s * 0.54; z = roofAt(x);
      cylZ(B.paint, x, y, z - 0.10, z + 0.05, 0.30, 18);
      cyl(B.paint, [x, y, z + 0.05], [x, y, z + 0.08], 0.27, 0.22, 16);
      box(B.dark, x - 0.34, x - 0.28, y - 0.10, y + 0.10, z + 0.02, z + 0.09);
      box(B.paint, x + 0.34, x + 0.50, y - 0.08, y + 0.08, z - 0.02, z + 0.09);
      B.lens.col = GLASS;
      box(B.lens, x + 0.50, x + 0.51, y - 0.06, y + 0.06, z + 0.01, z + 0.07);
    }
    /* gunner's periscope head, front right (judgement after D2) and the roof ventilator */
    x = 0.72; y = -0.46; z = roofAt(x) - 0.03;
    box(B.paint, x - 0.14, x + 0.12, y - 0.12, y + 0.12, z - 0.02, z + 0.15);
    B.lens.col = GLASS;
    box(B.lens, x + 0.12, x + 0.13, y - 0.08, y + 0.08, z + 0.04, z + 0.12);
    z = roofAt(-0.55);
    cylZ(B.paint, -0.62, 0.0, z - 0.02, z + 0.06, 0.16, 12);
    cyl(B.paint, [-0.62, 0.0, z + 0.06], [-0.62, 0.0, z + 0.10], 0.17, 0.08, 12);

    /* the rangefinder end bosses high on both sides (P1, P7, P9), the hand rail round the
       bustle (P8, P1), the whips at the rear (D2, P7) */
    for (s = -1; s <= 1; s += 2) {
      x = -0.21; z = 0.98; var w = tHalf(x, z);
      cyl(B.paint, [x, s * (w - 0.10), z], [x, s * (w + 0.10), z], 0.15, 0.13, 16);
      cyl(B.dark, [x, s * (w + 0.10), z], [x, s * (w + 0.115), z], 0.09, 0.09, 12);
      var RZ = 0.92, rp = null, rx;
      for (k = 0; k <= 7; k++) {
        rx = -0.95 - (1.05 * k / 7);
        P = [rx, s * (tHalf(rx, RZ) + 0.07), RZ];
        if (rp) cyl(B.dark, rp, P, 0.016, 0.016, 5, true);
        rp = P;
      }
      cyl(B.dark, [-0.95, s * (tHalf(-0.95, RZ) - 0.02), RZ], [-0.95, s * (tHalf(-0.95, RZ) + 0.07), RZ], 0.015, 0.015, 5, true);
      cyl(B.dark, rp, [-2.20, s * 0.40, RZ], 0.016, 0.016, 5, true);
      x = -1.80; y = s * 0.72; z = roofAt(x) - 0.06;
      cylZ(B.dark, x, y, z - 0.03, z + 0.12, 0.055, 8);
      cyl(B.dark, [x, y, z + 0.12], [x, y, z + 1.05], 0.011, 0.006, 4, true);
      /* lifting eyes front and rear */
      box(B.dark, 1.00, 1.10, s * 0.45 - 0.02, s * 0.45 + 0.02, roofAt(1.05) - 0.02, roofAt(1.05) + 0.07);
      box(B.dark, -1.95, -1.85, s * 0.55 - 0.02, s * 0.55 + 0.02, roofAt(-1.9) - 0.02, roofAt(-1.9) + 0.07);
    }
    cyl(B.dark, [-2.20, 0.40, 0.92], [-2.20, -0.40, 0.92], 0.016, 0.016, 5, true);

    /* the rear-corner fittings, as photographed: the box at the right rear (M103: D2, P2);
       an angled canister at each rear corner (M103A2: P7, P9, P8) */
    if (V.a2) {
      for (s = -1; s <= 1; s += 2) {
        x = -1.62; y = s * 1.18; z = 0.98;
        cyl(B.paint, [x - 0.18, y - s * 0.06, z - 0.12], [x + 0.18, y + s * 0.10, z + 0.16], 0.10, 0.10, 14);
        cyl(B.dark, [x + 0.18, y + s * 0.10, z + 0.16], [x + 0.20, y + s * 0.115, z + 0.18], 0.07, 0.07, 10);
        box(B.dark, x - 0.10, x + 0.06, y - s * 0.12 - 0.03, y - s * 0.12 + 0.03, z - 0.14, z + 0.02);
      }
    } else {
      slab(B.paint, [-1.62, -1.16, 0.98], unit([0.5, 0, 0.87]), unit([0, 1, 0.25]), unit([-0.87, -0.12, 0.5]), 0.22, 0.13, 0.11);
      slab(B.dark, [-1.62, -1.295, 0.98], unit([0.5, 0, 0.87]), [0, 1, 0], [-0.87, 0, 0.5], 0.16, 0.005, 0.06);
    }

    /* team colour: a modest plate on the roof behind the loaders' hatches */
    box(B.team, -0.82, -0.40, 0.10, 0.50, roofAt(-0.6) - 0.01, roofAt(-0.6) + 0.02);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.M103, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), i, wg, WB, tg, TB = bins(T);
    addHull(HB, V);
    addRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, V);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    addTurret(TB, V);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (models3d convention, dump.js): from the rear
   mudguards to the muzzle: the published 448.6 in (11.39 m) on both, see the header */
UNIT_MODELS["nato_e50_heavy"] = {
  len: 11.391,
  build: function (THREE, M, C) { return HeroM103.build(THREE, M, C, "M103"); }
};
UNIT_MODELS["nato_e60_heavy"] = {
  len: 11.391,
  build: function (THREE, M, C) { return HeroM103.build(THREE, M, C, "A2"); }
};
