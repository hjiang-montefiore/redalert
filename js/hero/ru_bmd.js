/* ============ ru_bmd.js - HERO models: the BMD-2 and BMD-3 airborne combat vehicles ============
   Two rows, two different hulls.  Redo of 2026-10-24 to the full-quality procedure.
     pact_e80_lighttank   BMD-2 (service 1985)  the small aluminium BMD-1 hull with the boat bow, five
                                                road wheels, four return rollers, the raised front idler,
                                                the rear sprocket; the one-man turret with the 30 mm 2A42
                                                and the 9P135M launcher for the Konkurs / Fagot
     pact_e90_lighttank   BMD-3 (service 1990)  the larger new hull (Object 950), tall flat sides over
                                                the tracks, long shallow glacis, five road wheels, four
                                                return rollers; the BMP-2-type two-man turret with the
                                                2A42, the 9P135M launcher cradle and three smoke
                                                dischargers a side; the two bow weapon ports
   (pact_e00_lighttank, the 2S25 Sprut-SD on the BMD-3 chassis family, is in ru_sprut.js.)

   Sources (Wikimedia Commons, fetched at width 960 with a generic agent string; cached in
   scratchpad/q_bmd_ref).  No line drawing of either vehicle exists on Commons; the procedure's
   minimum of near-orthogonal photographs plus published figures is used.
     B1  "BMD-2 - 137AirborneRegiment01.jpg": LEFT side, in service, wheels on the ground.  The side
         station table is measured off it (yaw about 17 deg, read from the rear plate showing; along
         the side the ratios hold): 129 px/m along the side, 140 px/m vertical, scaled on the hull
         length 5.40 m and the placard height (B4).
     B2  "VDVHistorymuseum-16.jpg" (V. Kuzmin): right side, trim vane raised: the boat bow, the raised
         front idler, the small rear sprocket, the disc road wheels with their hole ring, the sloped
         upper side plate and its raked rear edge, the trailing suspension arms.
     B3  "VDVHistorymuseum-14.jpg" (front), "-17.jpg" (right front 3/4), "-15.jpg" (right rear 3/4),
         "BMD-2 airborne combat vehicle.jpg" (left front 3/4): the cross-section (upper sides sloped
         in, the hull narrowing to the nose, the head lamps on the front cheek plates), the bow PKT
         port, the turret, the stern (sloped louvred upper plate, the raised rear hatch box, the
         water-jet outlets under it).
     B4  "VDVHistorymuseum-13.jpg": the museum placard: length 5910 mm with the gun forward, height
         1615...1965 mm over the clearance range, clearance 100...450 (adjustable), track gauge
         2380 mm.
     B5  "BMD-2.jpg" (show vehicle with parachute stowage): side, wheel count.
     C1  "BMD-3 3.jpg": RIGHT side, running: the BMD-3 station table (97 px/m on the 6.0 m hull),
         FIVE fluted road wheels, FOUR return rollers under the upper run, the raised front idler,
         the large rear sprocket, the 9P135M cradle on the turret roof (empty), three smoke
         dischargers on the turret side, two whip aerials.
     C2  "BMD-3 1.jpg" (left front 3/4), "BMD-3 2.jpg" (front), "BMD-3 4.jpg": the bow with a round
         ball-mount port to starboard and a hooded port to port, lamps on the front corners, the
         driver's and bow gunners' hatches, the turret front with the drum lamp and the sight head.
     C3  "Soviet and Russian vehicles in Kubinka tank museum 214.jpg": left front 3/4 close up: the
         2A42 in its box cradle, the launcher cradle, the smoke-discharger cluster, the long shallow
         glacis; "...213.jpg", the placard: Object 950, in service 1990, 2A42, PKT, RPKS-74,
         AGS-17, 9M111 / 9M113 launcher, 12.9-13.2 t.
     en.wikipedia: BMD-1 hull 5.40 x 2.63 m; BMD-3 6.0 x 3.13 x 2.25 m.  (Kept from the old header;
     the photographs agree.)

   Recognition list (what makes each read at game zoom, and its source)
     BMD-2
       1  a small, low hull with the upper side plates sloped in and a sharp boat bow, the folded
          trim vane lying on the short glacis [B1, B2, B3]
       2  five small disc road wheels evenly spaced, FOUR small return rollers, the front idler raised
          to the upper run, the small toothed sprocket at the rear [B1, B2]
       3  the hull narrowing to the nose in plan, a head lamp on each front cheek plate [B3]
       4  the little one-man turret amidships with the long thin 2A42 and its jacket [B1, B2, B3]
       5  the 9P135M launcher on the turret roof [old file: parade photograph "Ukrainian BMD-2
          tank (3).JPG"; B1 shows its pintle]
       6  three crew hatches across the bow deck, the bow PKT port to starboard [B3]
       7  the stern: a sloped louvred upper plate, the raised rear hatch box, two water-jet outlets
          [B1, B3]
     BMD-3
       8  a longer, wider, taller box hull with tall flat sides overhanging the tracks [C1, C2]
       9  the long shallow glacis to a sharp nose, two bow weapon ports [C2, C3]
      10  five fluted road wheels, four return rollers, a raised idler, a large rear sprocket [C1]
      11  the wider two-man turret, the 2A42 in its box cradle, three smoke dischargers a side, the
          launcher cradle on the roof, the drum lamp [C1, C2, C3]
      12  two tall whip aerials behind the turret [C1, C2]

   Side station tables (metres; x from the hull middle, + forward; z above the ground)
     BMD-2  hull -2.70..2.70; belly 0.42; track-guard bottom 0.95; belt 1.04 (half width 1.30, over
            the tracks 2.63 m); roof 1.49 (roof edge half width 1.06).  Nose z 1.32 at x 2.70; the
            glacis meets the roof at x 2.05; the lower bow plate meets the belly at x 2.00; the
            cheeks narrow the hull from x 1.80 to half widths 0.86 / 0.80 at the nose.  Stern: the
            roof breaks into the sloped upper rear plate at x -2.28, down to z 1.08 at x -2.70; the
            vertical rear plate to z 0.58; the lower rear to the belly at x -2.52.
            road wheels x 1.30 0.55 -0.20 -0.95 -1.70 (pitch 0.75), centre z 0.29, r 0.25
            return rollers x 0.875 0.125 -0.625 -1.375, z 0.77, r 0.07
            idler x 2.08 z 0.72 r 0.21; sprocket x -2.36 z 0.52 r 0.21; gauge 2.38 (B4), track 0.25
            turret ring x 0.10; roof 0.47 above the hull roof (total 1.96, B4 1.965 at full height);
            gun axis 0.24 above the roof; muzzle x 3.21 (5.91 overall, B4)
     BMD-3  hull -3.00..3.00; belly 0.45; side-plate bottom 1.24, crease 1.30 (half width 1.565, the
            3.13 width), roof 1.82 (half width 1.50).  Nose z 1.48 at x 3.00; the glacis meets the
            roof at x 1.70; the lower bow plate meets the belly at x 2.35; front corners cut from x
            2.50.  Vertical stern plate.
            road wheels x 1.42 0.635 -0.15 -0.935 -1.72 (pitch 0.785), centre z 0.33, r 0.295
            return rollers x 0.90 0.12 -0.65 -1.45, z 0.95, r 0.08
            idler x 2.00 z 0.88 r 0.22; sprocket x -2.33 z 0.66 r 0.28; track centre 1.36
            turret ring x -0.10; roof 0.45 above the hull roof (2.27, published 2.25); muzzle x 3.05

   Paint (sampled, taken to about 0.85): plain green, as the Soviet 1980s and the Russian 1990s
   vehicles were finished; the multi-tone schemes in B1-B3 and C1-C3 are later repaints and are not
   copied.  BMD-2 #4a5034 (from the hull green of B3 #505753 and C3 #515740), BMD-3 #454a37 (C3
   #515740 x 0.85).  No numbers, no VDV emblem, no unit shields.

   Corrections to the old file: BOTH vehicles have FOUR return rollers a side (B1 counts four on the
   BMD-2, the old file drew two; C1 shows four on the BMD-3, the old file drew none); the BMD-2
   front idler is raised to the upper run (z 0.72, the old file had it at 0.34); the BMD-2 hull roof
   is 1.49 m with sloped upper side plates (the old file 1.22 with the turret on a riser); the BMD-3
   turret is the wider two-man BMP-2-type turret with the smoke dischargers on its sides and the
   launcher cradle on its roof (C1, C3; the old file drew the BMD-2 turret enlarged and no
   launcher); the BMD-3 sides are tall and nearly vertical with the roof at 1.82 m (old 1.38).
   NOT drawn: the BMD-3 missile container (the cradle is empty in every photograph), a BMD-3 trim
   vane (none seen), the BMD-2 snorkel and the side machine gun (armour_specs extras; no photograph),
   the stowage tarps, the whip aerials of the BMD-2 (one base only), any marking.  Which BMD-3 bow
   port is the AGS-17 and which the RPKS-74 is not confirmed; both are drawn as photographed.

   Nodes: "turret" (ring centre on the hull roof, guns along +X), five "roadwheel" groups (the wheel
   discs of a station, both sides; the tyres are rings of revolution and stay in the hull).  Team
   colour is the plain C.team material on two small strips: the turret rear box lid and the rear
   hatch (BMD-2) or the engine-deck centre strip (BMD-3).  len is the measured X extent: BMD-2
   5.97 m (stern to muzzle; placard 5.91 with the gun forward), BMD-3 6.20 m (stern housings to
   muzzle; hull 6.00).  Model space +X bow, +Y left, +Z up,
   metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBMD = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  var VARIANTS = {
    A: { name: "BMD-2", paint: { base: "#4a5034", tone: ["#535a3c", "#40452e"], seed: 1985 },
         XS: -2.70, XN: 2.70, ZB: 0.42, ZG: 0.95, ZC: 1.04, ZD: 1.49, WB: 1.00, WO: 1.30, WR: 1.06,
         ZN: 1.32, XG: 2.05, XL: 2.00, XK: 2.00, WON: 1.02, WRN: 0.94,
         XRU: -2.28, ZRT: 1.08, ZRB: 0.58, XRL: -2.52,
         XW: [1.30, 0.55, -0.20, -0.95, -1.70], ZW: 0.29, RW: 0.25,
         XR: [0.875, 0.125, -0.625, -1.375], ZR: 0.77, RR: 0.07,
         IDL: [2.08, 0.72, 0.21], SPR: [-2.36, 0.52, 0.21], TYC: 1.19, TH: 0.125, PITCH: 0.115,
         TX: 0.10, GZ: 0.24, MUZ: 3.21 },
    B: { name: "BMD-3", paint: { base: "#454a37", tone: ["#4e543f", "#3c4130"], seed: 1990 },
         XS: -3.00, XN: 3.00, ZB: 0.45, ZG: 1.16, ZC: 1.22, ZD: 1.82, WB: 1.15, WO: 1.565, WR: 1.50,
         ZN: 1.60, XG: 1.95, XL: 2.10, XK: 2.60, WON: 1.40, WRN: 1.30,
         XRU: -3.00, ZRT: 1.82, ZRB: 0.62, XRL: -2.80,
         XW: [1.42, 0.635, -0.15, -0.935, -1.72], ZW: 0.33, RW: 0.295,
         XR: [0.90, 0.12, -0.65, -1.45], ZR: 0.95, RR: 0.08,
         IDL: [2.00, 0.88, 0.22], SPR: [-2.33, 0.66, 0.28], TYC: 1.36, TH: 0.16, PITCH: 0.13,
         TX: -0.10, GZ: 0.30, MUZ: 3.05 }
  };

  /* -------------------------------------------------------- geometry kit (as ru_sprut.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  /* one bin of triangles per material; a painted bin gets planar metre UVs */
  function Bin(mat, uv, k) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.k = k || 0.25; this.o = [0, 0, 0]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, k = this.k, o = this.o, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push((q[0] + o[0]) * k, (q[1] + o[1]) * k);
        else if (ay >= ax) this.U.push((q[0] + o[0]) * k, (q[2] + o[2]) * k);
        else this.U.push((q[1] + o[1]) * k, (q[2] + o[2]) * k);
      }
    }
  };
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
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
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz) || 1, nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  function cyl(bin, A, B, r0, r1, seg) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    base = V.length; na = [-ax[0], -ax[1], -ax[2]];
    V.push(A, B); N.push(na, ax);
    rA = base + 2; rB = base + 2 + seg;
    for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
    for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 14); }
  /* LOFT along X: sections {x, p:[[y,z]...], c:[y,z]} of equal point count, fan caps */
  function loft(bin, S) {
    var V = [], F = [], n = S[0].p.length, m = S.length, i, k, k1, c0, c1;
    for (i = 0; i < m; i++) for (k = 0; k < n; k++) V.push([S[i].x, S[i].p[k][0], S[i].p[k][1]]);
    for (i = 0; i + 1 < m; i++) for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      F.push([i * n + k, i * n + k1, (i + 1) * n + k1], [i * n + k, (i + 1) * n + k1, (i + 1) * n + k]);
    }
    c0 = V.length; V.push([S[0].x, S[0].c[0], S[0].c[1]]);
    c1 = V.length; V.push([S[m - 1].x, S[m - 1].c[0], S[m - 1].c[1]]);
    for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      F.push([c0, k1, k]);
      F.push([c1, (m - 1) * n + k, (m - 1) * n + k1]);
    }
    solid(bin, V, F);
  }
  /* LOFT up Z for the turrets: rings of 3D points; faceted (flat normals) so the plates read */
  function loftZ(bin, rings) {
    var n = rings[0].length, V = [], F = [], r, k, a, b, L;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n;
      F.push([a, b, b + n], [a, b + n, a + n]);
    }
    for (k = 1; k + 1 < n; k++) F.push([0, k + 1, k]);
    L = (rings.length - 1) * n;
    for (k = 1; k + 1 < n; k++) F.push([L, L + k, L + k + 1]);
    solid(bin, V, F);
  }
  /* a turret ring in plan: polygon of (x, y) corners at height z */
  function ringAt(z, P, sx, sy, dx) {
    var out = [], i;
    for (i = 0; i < P.length; i++) out.push([P[i][0] * sx + (dx || 0), P[i][1] * sy, z]);
    return out;
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      draw(cv.getContext("2d"));
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  /* plain green: soft tonal mottling, plate seams, rivet rows, dust and rain streaks; 4 m a tile */
  function paintTex(THREE, V) {
    var P = V.paint;
    return canvasTex(THREE, "bmd" + P.base + P.seed, function (q) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.tone.length; k++) {
        q.fillStyle = P.tone[k];
        for (i = 0; i < 8; i++) {
          x = R() * 256; y = R() * 256; w = 26 + R() * 56;
          q.globalAlpha = 0.38; q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
        }
      }
      q.globalAlpha = 1;
      q.strokeStyle = "rgba(18,20,14,0.32)"; q.lineWidth = 1.2;
      for (i = 0; i < 4; i++) {
        q.beginPath(); q.moveTo(i * 64 + 20.5, 0); q.lineTo(i * 64 + 20.5, 256); q.stroke();
        q.beginPath(); q.moveTo(0, i * 64 + 44.5); q.lineTo(256, i * 64 + 44.5); q.stroke();
      }
      q.fillStyle = "rgba(12,12,10,0.35)";
      for (i = 0; i < 64; i++) q.fillRect((i % 16) * 16 + 6, Math.floor(i / 16) * 64 + 42, 2, 2);
      for (i = 0; i < 100; i++) {
        q.fillStyle = (i % 3) ? "rgba(18,18,12,0.07)" : "rgba(214,206,178,0.06)";
        q.fillRect(R() * 256, R() * 256, 1 + R() * 3, 8 + R() * 40);
      }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.8, metalness: 0.3 });
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ---------------------------------------------------------------- hull */
  function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
  /* the hull at station x: belly, track guard, belt crease, roof edge (station table in the header) */
  function hsec(V, x) {
    var zb = V.ZB, zt = V.ZD, zc = V.ZC, zg = V.ZG, wo = V.WO, wr = V.WR, wb = V.WB;
    if (x > V.XL) zb = lerp(V.ZB, V.ZN - 0.06, (x - V.XL) / (V.XN - V.XL));          /* lower bow plate */
    if (x < V.XRL) zb = lerp(V.ZRB, V.ZB, (x - V.XS) / (V.XRL - V.XS));              /* lower stern */
    if (x > V.XG) zt = lerp(V.ZD, V.ZN, (x - V.XG) / (V.XN - V.XG));                 /* upper glacis */
    if (x < V.XRU) zt = lerp(V.ZRT, V.ZD, (x - V.XS) / (V.XRU - V.XS));              /* upper rear plate */
    if (x > V.XK) { wo = lerp(V.WO, V.WON, (x - V.XK) / (V.XN - V.XK)); wr = lerp(V.WR, V.WRN, (x - V.XK) / (V.XN - V.XK)); }
    zc = Math.min(zc, zt - 0.04);
    zg = Math.max(zg, zb + 0.01); zc = Math.max(zc, zg + 0.01);
    wb = Math.min(wb, wo - 0.02);
    return { x: x, c: [0, (zb + zt) / 2],
             p: [[-wb, zb], [wb, zb], [wb, zg], [wo, zg], [wo, zc], [wr, zt], [-wr, zt], [-wo, zc], [-wo, zg], [-wb, zg]] };
  }
  function hullLoft(V, B) {
    var X = [V.XS, V.XS + 0.06, V.XRL, V.XRU + 0.001, -1.5, -0.5, 0.5, 1.5, V.XK, V.XL, V.XG,
             V.XN - 0.45, V.XN - 0.25, V.XN - 0.10, V.XN], S = [], i;
    X.sort(function (a, b) { return a - b; });
    for (i = 0; i < X.length; i++) if (i === 0 || X[i] - X[i - 1] > 0.005) S.push(hsec(V, X[i]));
    loft(B.paint, S);
  }

  /* ---------------------------------------------------- running gear */
  function trackLoop(V) {
    var pts = [], i, k, c, a, circ = [[V.IDL[0], V.IDL[1], V.IDL[2] + 0.035], [V.SPR[0], V.SPR[1], V.SPR[2] + 0.035]];
    for (i = 0; i < V.XW.length; i++) circ.push([V.XW[i], V.ZW, V.RW + 0.035]);
    for (i = 0; i < V.XR.length; i++) circ.push([V.XR[i], V.ZR, V.RR + 0.035]);
    for (i = 0; i < circ.length; i++) for (k = 0; k < 28; k++) {
      a = k / 28 * TAU; c = circ[i];
      pts.push([c[0] + c[2] * Math.cos(a), c[1] + c[2] * Math.sin(a)]);
    }
    pts.sort(function (u, v) { return u[0] - v[0] || u[1] - v[1]; });
    function cr(o, a2, b2) { return (a2[0] - o[0]) * (b2[1] - o[1]) - (a2[1] - o[1]) * (b2[0] - o[0]); }
    var lo = [], up = [];
    for (i = 0; i < pts.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 1e-9) lo.pop(); lo.push(pts[i]); }
    for (i = pts.length - 1; i >= 0; i--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 1e-9) up.pop(); up.push(pts[i]); }
    lo.pop(); up.pop();
    var all = lo.concat(up), out = [];
    for (i = 0; i < all.length; i++) {
      var pv = out.length ? out[out.length - 1] : all[all.length - 1];
      if (Math.abs(all[i][0] - pv[0]) + Math.abs(all[i][1] - pv[1]) > 1e-4) out.push(all[i]);
    }
    return out;
  }
  /* steel links with a centre guide horn every other link */
  function addTrack(V, B, side) {
    var H = trackLoop(V), n = H.length, len = [], tot = 0, i, j, a, b, d, nl, p, t, pos, seg, ang, cx, cz, hl, th = 0.04;
    for (i = 0; i < n; i++) { a = H[i]; b = H[(i + 1) % n]; d = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])); len.push(d); tot += d; }
    nl = Math.round(tot / V.PITCH); p = tot / nl;
    var ya = side * (V.TYC - V.TH), yb = side * (V.TYC + V.TH);
    if (ya > yb) { t = ya; ya = yb; yb = t; }
    for (j = 0; j < nl; j++) {
      pos = (j + 0.5) * p; seg = 0;
      while (seg < n - 1 && pos > len[seg]) { pos -= len[seg]; seg++; }
      a = H[seg]; b = H[(seg + 1) % n]; t = pos / len[seg];
      cx = a[0] + (b[0] - a[0]) * t; cz = a[1] + (b[1] - a[1]) * t;
      ang = Math.atan2(b[1] - a[1], b[0] - a[0]); hl = p / 2 - 0.01;
      var ux = Math.cos(ang), uz = Math.sin(ang), nx = -uz * th / 2, nz = ux * th / 2;
      var ox = cx + nx, oz = cz + nz;
      hexa(B, [[ox - ux * hl - nx, ya, oz - uz * hl - nz], [ox + ux * hl - nx, ya, oz + uz * hl - nz], [ox + ux * hl - nx, yb, oz + uz * hl - nz], [ox - ux * hl - nx, yb, oz - uz * hl - nz],
               [ox - ux * hl + nx, ya, oz - uz * hl + nz], [ox + ux * hl + nx, ya, oz + uz * hl + nz], [ox + ux * hl + nx, yb, oz + uz * hl + nz], [ox - ux * hl + nx, yb, oz - uz * hl + nz]]);
      if (j % 2 === 0) {
        var gx = cx + nx * 2.5, gz = cz + nz * 2.5, gy = side * V.TYC;
        box(B, gx - 0.022, gx + 0.022, gy - 0.014, gy + 0.014, gz - 0.02, gz + 0.03);
      }
    }
  }
  /* a holed disc (idler face) */
  function holedDisc(V, B, x, z, r, side, holes) {
    var k, a, yo = side * (V.TYC + V.TH - 0.02), yi = side * (V.TYC - V.TH + 0.02);
    cylY(B.dark, x, yi, yo, z, r, 20);
    cylY(B.paint, x, yo, yo + side * 0.025, z, r * 0.80, 18);
    cylY(B.paint, x, yo + side * 0.025, yo + side * 0.06, z, r * 0.30, 12);
    for (k = 0; k < holes; k++) {
      a = k / holes * TAU + 0.3;
      cylY(B.dark, x + Math.cos(a) * r * 0.54, yo + side * 0.02, yo + side * 0.03, z + Math.sin(a) * r * 0.54, r * 0.13, 8);
    }
  }
  function addRunning(V, B, WBins, fluted) {
    var side, k, i, a, S = V.SPR;
    for (side = -1; side <= 1; side += 2) {
      addTrack(V, B.dark, side);
      /* road-wheel tyres: rings of revolution, static */
      for (i = 0; i < V.XW.length; i++) cylY(B.dark, V.XW[i], side * (V.TYC - V.TH + 0.01), side * (V.TYC + V.TH - 0.06), V.ZW, V.RW, 20);
      /* return rollers on stub axles from the hull side */
      for (i = 0; i < V.XR.length; i++) {
        cylY(B.dark, V.XR[i], side * (V.WB - 0.02), side * (V.TYC + 0.07), V.ZR, V.RR, 12);
        cylY(B.paint, V.XR[i], side * (V.TYC + 0.07), side * (V.TYC + 0.095), V.ZR, V.RR * 0.6, 10);
      }
      /* front idler, raised (B1, B2, C1) */
      holedDisc(V, B, V.IDL[0], V.IDL[1], V.IDL[2] - 0.02, side, 6);
      /* rear sprocket: holed drum with teeth */
      holedDisc(V, B, S[0], S[1], S[2] - 0.05, side, 6);
      for (k = 0; k < 14; k++) {
        a = k / 14 * TAU;
        (function (cx, cz, an) {
          var c = Math.cos(an), sn = Math.sin(an), r0 = S[2] - 0.07, r1 = S[2] + 0.02, w = 0.035, q = [], dd, e;
          var ya = side * (V.TYC - V.TH * 0.6), yb = side * (V.TYC + V.TH * 0.6);
          for (dd = 0; dd < 2; dd++) { e = dd ? yb : ya; q.push([cx + r0 * c + sn * w, e, cz + r0 * sn - c * w], [cx + r1 * c + sn * w * 0.5, e, cz + r1 * sn - c * w * 0.5], [cx + r1 * c - sn * w * 0.5, e, cz + r1 * sn + c * w * 0.5], [cx + r0 * c - sn * w, e, cz + r0 * sn + c * w]); }
          solid(B.dark, q, HEXF);
        })(S[0], S[1], a);
      }
      /* hydropneumatic trailing arms inboard of each wheel (B2) */
      for (i = 0; i < V.XW.length; i++) {
        belt(B.dark, V.XW[i], V.ZW, V.XW[i] + 0.30, V.ZW + 0.20, side > 0 ? V.WB - 0.02 : -(V.TYC - V.TH - 0.01), side > 0 ? V.TYC - V.TH - 0.01 : -(V.WB - 0.02), 0.08);
      }
    }
    /* road-wheel discs, one group per station */
    for (i = 0; i < V.XW.length; i++) {
      for (side = -1; side <= 1; side += 2) {
        var Bw = WBins[i], yo = side * (V.TYC + V.TH - 0.062), RW = V.RW;
        Bw.o = [V.XW[i], 0, V.ZW];
        cyl(Bw, [0, yo, 0], [0, yo + side * 0.04, 0], RW * 0.88, RW * 0.32, 20);
        cylY(Bw, 0, yo + side * 0.03, yo + side * 0.075, 0, RW * 0.24, 12);
        if (fluted) {
          /* BMD-3: a dished disc with sixteen radial flutes (C1) */
          for (k = 0; k < 16; k++) {
            a = k / 16 * TAU + 0.1;
            (function (an) {
              var c = Math.cos(an), sn = Math.sin(an), r0 = RW * 0.32, r1 = RW * 0.84, w = 0.014;
              var y0 = yo + side * 0.036, y1 = yo + side * 0.008, ys = side * 0.016;
              hexa(Bw, [[r0 * c - sn * w, y0, r0 * sn + c * w], [r1 * c - sn * w, y1, r1 * sn + c * w],
                        [r1 * c + sn * w, y1, r1 * sn - c * w], [r0 * c + sn * w, y0, r0 * sn - c * w],
                        [r0 * c - sn * w, y0 + ys, r0 * sn + c * w], [r1 * c - sn * w, y1 + ys, r1 * sn + c * w],
                        [r1 * c + sn * w, y1 + ys, r1 * sn - c * w], [r0 * c + sn * w, y0 + ys, r0 * sn - c * w]]);
            })(a);
          }
        } else {
          /* BMD-2: a plain disc with a ring of eight lightening holes (B2) */
          for (k = 0; k < 8; k++) {
            a = k / 8 * TAU + 0.2;
            cylY(Bw, Math.cos(a) * RW * 0.58, yo + side * 0.018, yo + side * 0.03, Math.sin(a) * RW * 0.58, RW * 0.11, 8);
          }
        }
      }
    }
  }

  /* ---- shared hull fittings ---- */
  function hatch(B, x, y, z, r, peri) {
    cylZ(B.paint, x, y, z - 0.03, z + 0.05, r, 16);
    cylZ(B.paint, x, y, z + 0.05, z + 0.075, r * 0.72, 14);
    cylZ(B.dark, x - r * 0.75, y, z + 0.03, z + 0.09, 0.03, 6);
    if (peri) box(B.glass, x + r + 0.01, x + r + 0.04, y - 0.06, y + 0.06, z, z + 0.05);
  }

  /* ---- BMD-2 hull ---- */
  function addHull2(V, B) {
    var ZD = V.ZD, s, k, x;
    hullLoft(V, B);
    /* bow: the trim vane folded back on the glacis (B1), its hinge blocks at the nose */
    belt(B.paint, 2.10, ZD - 0.02 + 0.035, 2.66, V.ZN + 0.035, -0.74, 0.74, 0.035);
    belt(B.paint, 2.06, ZD + 0.02, 2.10, ZD + 0.07, -0.74, 0.74, 0.03);
    for (s = -1; s <= 1; s += 2) box(B.dark, 2.56, 2.70, s * 0.55 - 0.07, s * 0.55 + 0.07, V.ZN - 0.03, V.ZN + 0.06);
    /* bow PKT ball mount, low on the starboard side of the nose (B3) */
    cylX(B.dark, 2.40, 2.60, -0.42, 1.06, 0.08, 0.07, 12);
    cylX(B.dark, 2.60, 2.74, -0.42, 1.06, 0.018, 0.016, 6);
    /* towing hooks under the nose */
    for (s = -1; s <= 1; s += 2) box(B.dark, 2.40, 2.56, s * 0.50 - 0.06, s * 0.50 + 0.06, 0.80, 0.88);
    /* three hatches across the bow deck: driver on the centre line, commander left, bow gunner right */
    hatch(B, 1.78, 0.0, ZD, 0.22, true);
    hatch(B, 1.62, 0.62, ZD, 0.20, true);
    hatch(B, 1.62, -0.62, ZD, 0.20, true);
    for (s = -1; s <= 1; s += 2) {
      /* head lamp on the front cheek plate, in a guard (B3) */
      box(B.paint, 1.98, 2.14, s * 1.08 - 0.06, s * 1.08 + 0.06, 1.30, 1.40);
      cylX(B.dark, 2.04, 2.20, s * 1.08, 1.47, 0.07, 0.07, 12);
      cylX(B.glass, 2.20, 2.215, s * 1.08, 1.47, 0.055, 0.055, 12);
      /* front mudguard over the track, ahead of the hull side (B2) */
      belt(B.paint, 1.80, V.ZG + 0.02, 2.38, V.ZG - 0.12, s > 0 ? 1.06 : -1.30, s > 0 ? 1.30 : -1.06, 0.03);
      /* belt lip along the bottom of the upper side plate, lifting eyes along the roof edge */
      box(B.paint, -2.40, 1.75, s * V.WO - 0.01, s * V.WO + 0.015, V.ZC - 0.05, V.ZC);
      for (k = 0; k < 4; k++) {
        x = -1.9 + k * 1.15;
        box(B.dark, x, x + 0.08, s * (V.WR + 0.02) - 0.015, s * (V.WR + 0.02) + 0.015, ZD - 0.08, ZD + 0.02);
      }
      /* round firing-port covers on the upper side plate (B1) */
      cyl(B.paint, [0.0, s * 1.18, 1.27], [0.0, s * 1.215, 1.285], 0.10, 0.10, 14);
      cyl(B.paint, [1.35, s * 1.20, 1.22], [1.35, s * 1.235, 1.235], 0.09, 0.09, 14);
    }
    /* deck behind the turret: the troop hatch and the engine grille */
    box(B.paint, -1.40, -0.90, -0.40, 0.40, ZD - 0.02, ZD + 0.05);
    box(B.dark, -2.22, -1.55, -0.90, -0.15, ZD - 0.01, ZD + 0.015);
    box(B.dark, -2.22, -1.55, 0.15, 0.90, ZD - 0.01, ZD + 0.015);
    for (k = 0; k < 6; k++) {
      x = -2.18 + k * 0.11;
      box(B.paint, x, x + 0.04, -0.90, -0.15, ZD + 0.015, ZD + 0.03);
      box(B.paint, x, x + 0.04, 0.15, 0.90, ZD + 0.015, ZD + 0.03);
    }
    /* stern: the raised rear hatch box on the sloped upper plate (B1, B3), louvres, outlets, lamps */
    hexa(B.paint, [[-2.62, -0.48, 1.10], [-2.24, -0.48, 1.46], [-2.24, 0.48, 1.46], [-2.62, 0.48, 1.10],
                   [-2.66, -0.48, 1.20], [-2.24, -0.48, 1.52], [-2.24, 0.48, 1.52], [-2.66, 0.48, 1.20]]);
    box(B.dark, -2.30, -2.24, -0.44, 0.44, 1.44, 1.53);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) belt(B.dark, -2.40 - k * 0.07, 1.36 - k * 0.07, -2.43 - k * 0.07, 1.33 - k * 0.07, s * 0.58, s * 1.00, 0.02);
      box(B.dark, -2.73, -2.69, s * 0.55 - 0.18, s * 0.55 + 0.18, 0.66, 0.86);     /* water-jet outlet */
      box(B.paint, -2.75, -2.70, s * 0.55 - 0.22, s * 0.55 + 0.22, 0.86, 0.90);
      box(B.dark, -2.74, -2.70, s * 1.05 - 0.05, s * 1.05 + 0.05, 0.98, 1.06);     /* tail lamp */
      box(B.dark, -2.76, -2.70, s * 0.22 - 0.04, s * 0.22 + 0.04, 0.60, 0.70);     /* tow hook */
    }
    box(B.team, -1.32, -0.98, -0.30, 0.30, ZD + 0.05, ZD + 0.065);   /* team colour on the troop hatch */
  }

  /* ---- BMD-3 hull ---- */
  function addHull3(V, B) {
    var ZD = V.ZD, s, k, x, zg;
    hullLoft(V, B);
    function glacisZ(xx) { return lerp(ZD, V.ZN, (xx - V.XG) / (V.XN - V.XG)); }
    /* bow ports (C2, C3): round ball mount to starboard, a hooded port to port */
    cylX(B.dark, 2.45, 2.62, -0.72, glacisZ(2.55) + 0.02, 0.11, 0.09, 14);
    cylX(B.dark, 2.62, 2.80, -0.72, glacisZ(2.55) + 0.03, 0.022, 0.02, 6);
    hexa(B.paint, [[2.30, 0.56, glacisZ(2.30) - 0.01], [2.62, 0.56, glacisZ(2.62) - 0.01], [2.62, 0.88, glacisZ(2.62) - 0.01], [2.30, 0.88, glacisZ(2.30) - 0.01],
                   [2.30, 0.58, glacisZ(2.30) + 0.16], [2.56, 0.58, glacisZ(2.56) + 0.10], [2.56, 0.86, glacisZ(2.56) + 0.10], [2.30, 0.86, glacisZ(2.30) + 0.16]]);
    box(B.dark, 2.54, 2.58, 0.62, 0.82, glacisZ(2.56) + 0.0, glacisZ(2.56) + 0.07);
    /* plate seam across the glacis and the lower bow edge strip */
    belt(B.paint, 2.86, V.ZN + 0.01, 2.96, V.ZN - 0.01, -1.15, 1.15, 0.03);
    /* hatches on the deck behind the glacis: driver centre, bow gunners each side (C1, C2) */
    hatch(B, 1.48, 0.0, ZD, 0.24, true);
    hatch(B, 1.50, 0.80, ZD, 0.22, true);
    hatch(B, 1.50, -0.80, ZD, 0.22, true);
    for (k = -2; k <= 2; k++) box(B.glass, 1.74, 1.77, k * 0.18 - 0.05, k * 0.18 + 0.05, glacisZ(1.76) - 0.01, glacisZ(1.76) + 0.05);
    for (s = -1; s <= 1; s += 2) {
      /* lamps on the front corners (C2) */
      box(B.paint, 2.52, 2.70, s * 1.24 - 0.08, s * 1.24 + 0.08, glacisZ(2.6) - 0.05, glacisZ(2.6) + 0.06);
      cylX(B.dark, 2.58, 2.76, s * 1.24, glacisZ(2.6) + 0.12, 0.075, 0.075, 12);
      cylX(B.glass, 2.76, 2.775, s * 1.24, glacisZ(2.6) + 0.12, 0.06, 0.06, 12);
      /* towing eyes on the lower bow plate */
      box(B.dark, 2.62, 2.80, s * 0.70 - 0.06, s * 0.70 + 0.06, 0.98, 1.08);
      /* side: crease lip, lifting eyes, the hand rail and a round port cover (C1) */
      box(B.paint, -2.95, 2.50, s * V.WO - 0.01, s * V.WO + 0.015, V.ZG, V.ZG + 0.05);
      for (k = 0; k < 5; k++) {
        x = -2.6 + k * 1.2;
        box(B.dark, x, x + 0.09, s * (V.WR + 0.02) - 0.015, s * (V.WR + 0.02) + 0.015, ZD - 0.09, ZD + 0.02);
      }
      box(B.dark, 0.40, 1.60, s * (V.WO + 0.03) - 0.012, s * (V.WO + 0.03) + 0.012, 1.48, 1.51);
      for (k = 0; k < 3; k++) box(B.dark, 0.45 + k * 0.55, 0.48 + k * 0.55, s * V.WO, s * (V.WO + 0.03), 1.48, 1.51);
      cyl(B.paint, [-0.30, s * (V.WO - 0.01), 1.52], [-0.30, s * (V.WO + 0.02), 1.52], 0.12, 0.12, 14);
      /* stowage boxes low on the side at the rear */
      box(B.paint, -2.70, -1.70, s * V.WO - 0.01, s * (V.WO + 0.03), 1.32, 1.54);
      /* front mudguard */
      belt(B.paint, 2.40, V.ZG + 0.02, 2.90, V.ZG - 0.18, s > 0 ? 1.20 : -1.53, s > 0 ? 1.53 : -1.20, 0.03);
      /* two whip aerials behind the turret (C1, C2): base and a thin rod */
      cylZ(B.dark, -1.45, s * 1.20, ZD, ZD + 0.14, 0.05, 8);
      cyl(B.dark, [-1.45, s * 1.20, ZD + 0.14], [-1.60, s * 1.20, ZD + 1.45], 0.012, 0.006, 5);
    }
    /* engine deck: two louvred panels, a filler and the cover between them */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -2.85, -1.85, s * 0.12, s * 1.25, ZD - 0.01, ZD + 0.03);
      for (k = 0; k < 8; k++) {
        x = -2.80 + k * 0.12;
        box(B.dark, x, x + 0.06, s > 0 ? 0.18 : -1.18, s > 0 ? 1.18 : -0.18, ZD + 0.03, ZD + 0.045);
      }
    }
    cylZ(B.paint, -1.50, 0.0, ZD - 0.02, ZD + 0.06, 0.16, 12);
    box(B.team, -2.80, -2.55, -0.10, 0.10, ZD - 0.01, ZD + 0.035);   /* team colour on the deck strip */
    /* stern plate (C1): door outline, two water-jet housings, lamps, tow hooks */
    box(B.paint, -3.03, -3.00, -0.42, 0.42, 0.90, 1.70);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -3.14, -3.00, s * 0.95 - 0.24, s * 0.95 + 0.24, 0.70, 1.60);
      box(B.dark, -3.15, -3.13, s * 0.95 - 0.18, s * 0.95 + 0.18, 0.76, 1.00);
      box(B.dark, -3.05, -3.00, s * 1.42 - 0.06, s * 1.42 + 0.06, 1.62, 1.74);
      box(B.dark, -3.07, -3.00, s * 0.30 - 0.05, s * 0.30 + 0.05, 0.66, 0.78);
    }
  }

  /* -------------------------------------------------------------- turrets */
  /* the 9P135M launcher: pedestal, cradle and (BMD-2) the 9M113 container on it */
  function launcher(B, x, y, z, withTube) {
    cylZ(B.dark, x, y, z - 0.02, z + 0.16, 0.05, 10);
    box(B.dark, x - 0.12, x + 0.12, y - 0.08, y + 0.08, z + 0.14, z + 0.22);
    belt(B.dark, x - 0.40, z + 0.27, x + 0.45, z + 0.33, y - 0.05, y + 0.05, 0.05);        /* cradle rail */
    box(B.dark, x + 0.20, x + 0.30, y - 0.11, y - 0.05, z + 0.20, z + 0.36);               /* sight on the left of it */
    box(B.glass, x + 0.30, x + 0.315, y - 0.10, y - 0.06, z + 0.28, z + 0.34);
    if (withTube) {
      cyl(B.paint, [x - 0.55, y, z + 0.36], [x + 0.60, y, z + 0.43], 0.075, 0.075, 14);
      cyl(B.dark, [x - 0.62, y, z + 0.356], [x - 0.55, y, z + 0.36], 0.085, 0.085, 14);
      cyl(B.dark, [x + 0.60, y, z + 0.43], [x + 0.66, y, z + 0.434], 0.085, 0.085, 14);
    }
  }
  /* BMD-2: the small one-man turret (B1-B3): a low truncated cone of flat plates */
  function addTurret2(V, B) {
    var P = [], k, a;
    for (k = 0; k < 12; k++) { a = k / 12 * TAU; P.push([Math.cos(a), Math.sin(a)]); }
    var rings = [ringAt(-0.03, P, 0.80, 0.70, 0), ringAt(0.06, P, 0.80, 0.70, 0),
                 ringAt(0.30, P, 0.66, 0.60, -0.04), ringAt(0.47, P, 0.50, 0.48, -0.08)];
    loftZ(B.paint, rings);
    var GZ = V.GZ;
    /* gun mount: the cast mantlet block in the front plate and the 2A42 jacket */
    box(B.paint, 0.58, 0.86, -0.20, 0.20, GZ - 0.15, GZ + 0.14);
    cylX(B.dark, 0.84, 0.98, 0, GZ, 0.12, 0.10, 16);
    cylX(B.dark, 0.96, 1.42, 0, GZ, 0.068, 0.058, 14);
    cylX(B.dark, 1.42, 3.00, 0, GZ, 0.034, 0.031, 12);
    cylX(B.dark, 3.00, V.MUZ - V.TX, 0, GZ, 0.048, 0.044, 12);
    cylX(B.dark, 1.36, 1.44, 0, GZ, 0.070, 0.070, 12);
    /* coaxial PKT to the right of the gun */
    cylX(B.dark, 0.80, 1.06, -0.24, GZ - 0.04, 0.02, 0.018, 6);
    /* sight head front left, a drum lamp beside it, the hatch to the rear left (B1, B3) */
    box(B.paint, 0.08, 0.34, 0.12, 0.38, 0.44, 0.58);
    box(B.glass, 0.34, 0.355, 0.16, 0.34, 0.48, 0.56);
    cylX(B.dark, 0.14, 0.40, 0.46, 0.56, 0.08, 0.08, 12);
    cylX(B.glass, 0.40, 0.41, 0.46, 0.56, 0.065, 0.065, 12);
    cylZ(B.paint, -0.22, 0.18, 0.44, 0.52, 0.22, 16);
    cylZ(B.paint, -0.22, 0.18, 0.52, 0.55, 0.16, 14);
    for (k = 0; k < 3; k++) box(B.glass, -0.02 + k * -0.12, 0.04 + k * -0.12, 0.38, 0.42, 0.47, 0.52);
    cylZ(B.dark, -0.30, -0.36, 0.40, 0.56, 0.035, 8);              /* aerial base */
    /* the 9P135M on the roof, centre line at the rear, missile container on it */
    launcher(B, -0.40, -0.05, 0.46, true);
    /* stowage boxes on the turret rear */
    box(B.paint, -0.86, -0.60, -0.36, 0.36, 0.06, 0.30);
    box(B.team, -0.82, -0.64, -0.30, 0.30, 0.30, 0.315);          /* team colour on the box lid */
  }
  /* BMD-3: the wider two-man turret of the BMP-2 type (C1-C3) */
  function addTurret3(V, B) {
    var P = [[1.00, 0.0], [0.82, 0.62], [0.30, 1.00], [-0.55, 1.00], [-1.00, 0.70], [-1.00, -0.70], [-0.55, -1.00], [0.30, -1.00], [0.82, -0.62]];
    var rings = [ringAt(-0.03, P, 0.98, 0.98, 0), ringAt(0.10, P, 0.98, 0.98, 0),
                 ringAt(0.34, P, 0.80, 0.84, -0.04), ringAt(0.50, P, 0.60, 0.68, -0.08)];
    loftZ(B.paint, rings);
    var GZ = V.GZ, s, k, i, gy;
    /* mantlet and the 2A42 in its box cradle (C3), the barrel and muzzle */
    box(B.paint, 0.72, 0.98, -0.24, 0.24, GZ - 0.18, GZ + 0.16);
    box(B.dark, 0.96, 1.60, -0.10, 0.10, GZ - 0.10, GZ + 0.08);
    for (k = 0; k < 4; k++) box(B.dark, 1.05 + k * 0.13, 1.12 + k * 0.13, -0.105, 0.105, GZ - 0.02, GZ + 0.03);
    cylX(B.dark, 1.60, 2.95, 0, GZ, 0.034, 0.031, 12);
    cylX(B.dark, 2.95, V.MUZ - V.TX, 0, GZ, 0.048, 0.044, 12);
    cylX(B.dark, 1.50, 1.60, 0, GZ, 0.058, 0.05, 12);
    cylX(B.dark, 0.86, 1.18, -0.30, GZ - 0.05, 0.02, 0.018, 6);     /* coaxial PKT */
    /* three 902V smoke dischargers on each turret side, raked forward and out (C1, C3) */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 0.10, 0.50, s * 0.82 - 0.04, s * 0.82 + 0.04, 0.16, 0.24);
      for (i = 0; i < 3; i++) {
        gy = s * 0.84;
        cyl(B.dark, [0.08 + i * 0.15, gy, 0.20], [0.20 + i * 0.15, gy + s * 0.08, 0.40], 0.045, 0.045, 10);
        cyl(B.paint, [0.20 + i * 0.15, gy + s * 0.08, 0.40], [0.21 + i * 0.15, gy + s * 0.083, 0.42], 0.05, 0.05, 10);
      }
    }
    /* drum lamp front right on the roof, the gunner's sight head centre front (C2, C3) */
    cylX(B.dark, 0.32, 0.62, -0.42, 0.60, 0.11, 0.11, 14);
    cylX(B.glass, 0.62, 0.635, -0.42, 0.60, 0.09, 0.09, 14);
    box(B.paint, 0.20, 0.44, -0.02, 0.26, 0.48, 0.70);
    box(B.glass, 0.44, 0.455, 0.02, 0.22, 0.56, 0.66);
    /* two hatches: commander right, gunner left (BMP-2 layout), periscopes */
    cylZ(B.paint, -0.30, -0.36, 0.47, 0.55, 0.24, 16);
    cylZ(B.paint, -0.30, -0.36, 0.55, 0.58, 0.18, 14);
    cylZ(B.paint, -0.30, 0.36, 0.47, 0.54, 0.23, 16);
    for (k = 0; k < 3; k++) box(B.glass, -0.04 - k * 0.1, 0.02 - k * 0.1, -0.62, -0.58, 0.51, 0.55);
    /* the 9P135M cradle on the roof, empty in every photograph (C1, C3) */
    launcher(B, -0.55, -0.02, 0.48, false);
    /* stowage on the turret rear */
    box(B.paint, -1.02, -0.80, -0.50, 0.50, 0.10, 0.34);
    box(B.team, -0.98, -0.84, -0.44, 0.44, 0.34, 0.355);          /* team colour on the box lid */
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T), TB = bins(T), WBins = [], i, wg, tg, hull;
    g.name = "ru_bmd_" + which;
    for (i = 0; i < V.XW.length; i++) WBins.push(new Bin(T.paint, true));
    if (which === "B") addHull3(V, HB); else addHull2(V, HB);
    addRunning(V, HB, WBins, which === "B");
    hull = new THREE.Group(); hull.name = "hull";
    flush(THREE, hull, HB);
    g.add(hull);
    for (i = 0; i < V.XW.length; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(V.XW[i], 0, V.ZW);
      flush(THREE, wg, { paint: WBins[i] });
      g.add(wg);
    }
    TB.paint.o = [V.TX, 0, V.ZD];
    if (which === "B") addTurret3(V, TB); else addTurret2(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(V.TX, 0, V.ZD);
    flush(THREE, tg, TB);
    g.add(tg);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

UNIT_MODELS["pact_e80_lighttank"] = {
  len: 5.97,
  build: function (THREE, M, C) { return HeroBMD.build(THREE, M, C, "A"); }
};
UNIT_MODELS["pact_e90_lighttank"] = {
  len: 6.2,
  build: function (THREE, M, C) { return HeroBMD.build(THREE, M, C, "B"); }
};
