/* ============ us_bradley.js - HERO models: the M2 Bradley family ============
   Four rows, one hull (FMC / United Defense M2 Bradley), drawn as the variant each row names:
     nato_e80_ifv   M2 Bradley (1981)        the original: plain aluminium hull sides with two firing
                                             ports a side and the bracket rows, the trim vane folded
                                             on the nose, the ISU sight, TOW launcher stowed;
                                             forest green as REFORGER 1985 shows it
     nato_e90_ifv   M2A2 ODS Bradley (1993)  the A2's spaced applique armour over hull sides and
                                             glacis (ports covered, no trim vane), the driver's
                                             thermal viewer, the ISU with the eye-safe laser
                                             rangefinder and the missile countermeasure device;
                                             NATO three-colour as Bosnia 1996 shows it
     nato_e00_ifv   M2A3 Bradley (2000)      the A3: the IBAS sight head and the commander's
                                             independent viewer; desert tan with the reactive tiles
                                             (armour_specs "era", camo "desert"; R1)
     ifv_n          M2A3, present day        the A3 in tan as the 2020 and 2023 photographs show it,
                                             TOW launcher raised as R2 photographs it, no tiles

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960, cached in
   scratchpad/q_bradley_ref:
     D1  "M2BRADLEY.png" - port side line drawing of an applique-armoured M2A2 (bow left). Scaled
         at 131 px a metre to the 6.55 m M2A2 length: the hull and glacis profile, the skirt line
         and its steps over sprocket and idler, the six road wheels and their uneven pitch (the gap
         behind the third wheel is the widest, 0.93 m against 0.75 m), the raised front sprocket
         and rear idler, the turret's sloped front, the gun axis at 2.40 m and the muzzle 2.79 m
         ahead of the ring, the smoke clusters, the ISU to 3.02 m, the TOW box on the turret's left
         rear, the bustle rack, the raised rear cargo hatch, the rear corner boxes and ramp.
     P1  "M2 Bradley Reforger 1985.JPEG" (US DoD, 1985) - M2, starboard front 3/4: glacis louvres
         and the right-shoulder grille, headlamp pairs in guards, trim vane on the nose, the side
         bracket rows, two whip aerials, forest-green paint.
     P2  "M2 Bradley Ramp Down Reforger 1985.JPEG" (US DoD, 1985) - M2, port rear 3/4: the stowed
         TOW box, the bustle rack, the ramp between the rear corner boxes, wheels and track.
     Q1  "M2A2 ODS-SA Bradley Fighting Vehicle.JPG" - ODS-SA (US Army) front-left 3/4: the
         applique side panels with lifting loops and bolt rows, the raised TOW launcher, the sight,
         the headlamp guards, the driver's viewer.
     Q2  "Two US Army ... M2A2 Bradley ... Route Arizona" (DoD, Bosnia, 1996) - NATO three-colour.
     R1  "M2a3-bradley07.jpg" (USAF, Iraq, 30 Oct 2004; an M2A2 per its caption) - head on: the
         tile grid on glacis and sides, the TOW box ends, the sight head.
     R2  "Combined Resolve XIII Live Fire 200116-A-KF690-1067.jpg" (US Army, 2020) - M2A3 side:
         wheels and their pitch, the raised TOW launcher, the CIV drum at the turret rear, tan.
     R5  "Carnivore Company Brings the Heat to eFP Battle Group Poland (7701843).jpg" (2023) - A3s in
         tan; R4 (2022, maintenance close-up) tan CARC.
   Published figures (en.wikipedia M2 Bradley): M2 6.45 m long, 3.20 m wide, 2.97 m high; M2A2 6.55
   m long, 3.28 m wide (3.61 m with tiles); 533 mm track, six road wheels, front drive, ground
   clearance 0.46 m. Kept from the old header: the driver front left, engine front right, the
   A2 covering the side firing ports, the A3's CIV; the old "turret offset 0.45 m to the right"
   is not measurable from these references (see NOT CONFIRMED).

   CORRECTIONS against the previous model: road wheels were evenly pitched at 0.66 m under a
   hull centred on them; now on D1's stations, with the 0.93 m gap behind the third wheel; the
   turret sat 0.30 m ahead of mid-length, it stands 0.45 m behind it (D1: mantlet 2.75 m from the
   nose); the turret roof stood 0.56-0.64 m over the hull, D1 gives 0.74 m; the gun reached 2.58
   m, now 2.79 m; the skirt line was flat, it now steps up over the idler and sweeps up over the
   sprocket (D1); the rear is now the ramp between two rear corner boxes (P2, D1), not a flat
   plate; the TOW box stood forward on the turret side, it is on the rear half (P2, D1); present
   day was olive with tiles, the 2020-2023 photographs show tan and no tiles; the M2 was drawn
   olive with blotches, the 1985 photographs show plain forest green.

   Recognition list (what makes it read at game zoom, and its source):
     1. tall slab-sided box hull with a flat roof at 1.95 m and one long glacis - D1, P1, P2
     2. flat side armour standing over the tracks to a skirt line at 0.72 m, stepping up over
        the idler and sprocket - D1, P2, Q1, R2
     3. six road wheels with the wide gap behind the third, raised front sprocket and rear
        idler, 533 mm track - D1, R2, P2
     4. turret aft of mid-length, sloped front, M242 25 mm on the centre line, long thin - D1, P1
     5. twin TOW box on the turret's LEFT rear, stowed (P2, D1) or raised (Q1, R2)
     6. four-tube smoke clusters on the turret's front corners - D1, Q1
     7. sight head on the roof front left; the A3's CIV drum at the right rear - D1, R2
     8. headlamp pairs in guards on the nose corners - P1, Q1
     9. louvred intake on the right glacis, grille on the right shoulder - P1
    10. ramp between the two rear corner boxes, the raised rear cargo hatch - P2, D1
    11. M2: firing ports and bracket rows, the trim vane on the nose - P1, en.wikipedia
    12. A2/A3: applique panels with lifting loops - D1, Q1; e00: the tile grid - R1
   Paint (sampled, then taken to about 0.8 of level for the ACES pass): M2 forest green P1
   #68706b (overcast, blue-cast) drawn #4c5442; NATO three-colour green / brown / black drawn
   #47512f / #4c4230 / #252522 (Q2 is too dark to sample: the CARC chips); tan Q1 #958c7d, R1
   #9d8467 (dust) drawn #988560 (e00, dusty) and #9b8b66 (present). No numbers, bumper codes,
   flags or unit marks (P1 carries a pennant, Q1 a sign; not drawn).
   NOT CONFIRMED, drawn as stated: the turret ring's side offset (no top view here: drawn 0.25 m
   to the right so the turret and its TOW box sit centred over the roof as the head-on views
   show); the missile countermeasure device's place on the ODS turret (drawn on the roof over the
   gun); the M2 firing-port stations (drawn at x -1.05 and -2.05); the return rollers (hidden by
   the skirt, three drawn); hatch outlines on the roof; the trim vane's exact shape on the nose.
   Triangles 16,280 (M2) / 15,812 (ODS) / 17,108 (A3 with tiles) / 16,176 (present, TOW raised);
   14 draw calls (hull 4, turret 4, six wheels); 5 materials. X extent 6.58 m (M2, the trim vane
   on the nose; published 6.45 m: the hull is D1's, scaled to the A2's 6.55 m) and 6.54 m (the
   others; published 6.55 m); W 3.29 / 3.33 / 3.55 / 3.33 m (published 3.20, 3.28, 3.61 with tiles).
   Model space +X bow, +Y left (port), +Z up, metres, tracks on z = 0. Nodes: "turret" (ring
   centre on the roof, gun along +X) and six "roadwheel" groups (axle on local Y, both sides in
   one mesh). Materials: PAINT (canvas texture, metre UVs), DARK, GLASS, WHEEL (vertex colours),
   and the team colour exactly as handed in (C.team) on two roof strips and the gunner's hatch.
   ASCII only: a stray byte in a hex literal has broken this project before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroBradley = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* mark: 0 the M2, 1 the A2 ODS, 2 the A3 */
  var VARIANTS = {
    M2:  { mark: 0, w: 1.60, vane: true, mcd: false, brat: false, towUp: false,
           paint: { base: "#4c5442", lo: "#3f4636", hi: "#5a624d", dust: "rgba(70,60,40,0.06)", seed: 1985, us: 0.30 } },
    A2:  { mark: 1, w: 1.64, vane: false, mcd: true, brat: false, towUp: false,
           paint: { base: "#47512f", lo: "#3d4629", hi: "#535d3a", camo: ["#4c4230", "#252522"], dust: "rgba(70,60,40,0.07)", seed: 1996, us: 0.30 } },
    A3:  { mark: 2, w: 1.64, vane: false, mcd: false, brat: true, towUp: false,
           paint: { base: "#988560", lo: "#8a7854", hi: "#a6936c", dust: "rgba(120,100,70,0.10)", seed: 2004, us: 0.30 } },
    A3N: { mark: 2, w: 1.64, vane: false, mcd: false, brat: false, towUp: true,
           paint: { base: "#9b8b66", lo: "#8e7e5b", hi: "#a89773", dust: "rgba(90,80,60,0.07)", seed: 2020, us: 0.30 } }
  };

  /* running gear (D1, 131 px a metre): six 0.60 m wheels, the wide gap behind the third */
  var XW = [1.98, 1.23, 0.47, -0.46, -1.21, -1.95], ZW = 0.365, RW = 0.30;
  var TY = 1.28, TW = 0.265;                                /* 533 mm track */
  var SPR = { x: 2.88, z: 0.66, r: 0.26 }, IDL = { x: -2.62, z: 0.64, r: 0.27 };
  var XR = [1.62, 0.0, -1.58], ZR = 0.86, RR = 0.075;       /* return rollers, behind the skirt */
  var ROOF = 1.95, XST = -2.85;
  var TX = -0.45, TYC = -0.25;                              /* turret ring on the roof */

  /* ------------------------------------------------------------ geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }

  function Bin(mat, uv, vc, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
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

  /* a closed solid lofted through LEVELS, each a convex ring of [x, y, z] points with the same
     count; the end rings are capped with fans */
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
  function ringAt(H, z, dx) {
    var Q = [], i;
    dx = dx || 0;
    for (i = 0; i < H.length; i++) Q.push([H[i][0] + dx, H[i][1], z]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0] + dx, -H[i][1], z]);
    return Q;
  }
  function pwl(T, x) {
    var i, t;
    if (x <= T[0][0]) return T[0][1];
    for (i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) { t = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * t; }
    return T[T.length - 1][1];
  }
  /* a rounded rectangle ring in the y-z plane at x: centre (yc, zc), half sizes hy, hz, corner r */
  function rrect(x, yc, zc, hy, hz, r, n) {
    var Q = [], k, i, a, cx, cz, C = [[hy - r, hz - r], [-(hy - r), hz - r], [-(hy - r), -(hz - r)], [hy - r, -(hz - r)]];
    for (k = 0; k < 4; k++) for (i = 0; i <= n; i++) {
      a = (k + i / n) * TAU / 4; cx = C[k][0]; cz = C[k][1];
      Q.push([x, yc + cx + Math.cos(a) * r, zc + cz + Math.sin(a) * r]);
    }
    return Q;
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
  /* a hard-edged camouflage patch, wrapped so the tile repeats without a seam */
  function patch(q, S, R, cx, cy, rx, ry, col) {
    var k, n = 11, pts = [], a, r, ox, oy;
    for (k = 0; k < n; k++) { a = k / n * TAU; r = 0.55 + R() * 0.6; pts.push([Math.cos(a) * rx * r, Math.sin(a) * ry * r]); }
    q.fillStyle = col;
    for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
      q.beginPath();
      for (k = 0; k < n; k++) q[k ? "lineTo" : "moveTo"](cx + ox + pts[k][0], cy + oy + pts[k][1]);
      q.closePath(); q.fill();
    }
  }
  /* one tile is 1 / P.us metres. Base coat, the period camouflage (NATO three-colour on the
     1990s row: hard-edged brown and black over green), plate seams with bolt rows (the
     applique hull is covered in bolt heads, D1, Q1), dust low down, rain streaks */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "bradley" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 22; i++) { q.globalAlpha = 0.12 + R() * 0.14; patch(q, S, R, R() * S, R() * S, 30 + R() * 70, 20 + R() * 50, i % 2 ? P.lo : P.hi); }
      q.globalAlpha = 1;
      if (P.camo) {
        for (k = 0; k < P.camo.length; k++)
          for (i = 0; i < (k ? 3 : 8); i++) patch(q, S, R, R() * S, R() * S, 70 + R() * 80, 26 + R() * 34, P.camo[k]);   /* NATO: about 50 / 35 / 15 per cent */
      }
      for (i = 0; i < 9; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 100 + R() * 240;
        q.fillStyle = "rgba(18,18,14,0.32)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(240,236,220,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(15,15,12,0.42)";
        for (k = 8; k < w; k += 22) { if (i % 2) q.fillRect(x + k, y - 9, 4, 4); else q.fillRect(x - 9, y + k, 4, 4); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.06)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = P.dust; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, V) {
    return { paint: new Bin(T.paint, true, false, V.paint.us), dark: new Bin(T.dark, false),
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
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  /* turn everything added to the bins since MARK about the Y axis through (px, pz) by ang
     (positive lifts +X up): the raised TOW launcher */
  function markBins(B) { var m = {}, k; for (k in B) m[k] = B[k].P.length; return m; }
  function pitchSince(B, M, px, pz, ang) {
    var k, b, i, c = Math.cos(ang), s = Math.sin(ang), x, z;
    for (k in B) {
      b = B[k];
      for (i = M[k]; i < b.P.length; i += 3) {
        x = b.P[i] - px; z = b.P[i + 2] - pz;
        b.P[i] = px + x * c - z * s; b.P[i + 2] = pz + x * s + z * c;
        x = b.N[i]; z = b.N[i + 2];
        b.N[i] = x * c - z * s; b.N[i + 2] = x * s + z * c;
      }
    }
  }

  /* ---------------------------------------------------------------- hull */
  /* side profile (D1, bow left, 131 px a metre, track foot z = 0): flat roof at 1.95 m to the
     glacis knee at x 1.62, the long glacis (about 26 deg) to the nose top at 1.22 m, a short
     nose face to 1.00 m, the lower nose back to the belly at 0.46 m (published clearance);
     the stern plate at x -2.85 with the two rear corner boxes and the ramp behind it */
  var TOP = [[XST, 1.93], [XST + 0.03, 1.95], [1.62, 1.95], [3.14, 1.22], [3.26, 1.12]];
  var UB = [[XST, 1.03], [3.00, 1.03], [3.26, 1.00]];
  var UXS = [XST, XST + 0.03, -2.0, -1.0, 0.0, 1.0, 1.62, 2.0, 2.4, 2.8, 3.14, 3.26];
  function wSide(V, x) { return x < 3.10 ? V.w : V.w - (x - 3.10) / 0.16 * 0.08; }
  function wRoof(V, x) { return x < 1.62 ? V.w - 0.20 : V.w - 0.20 + (x - 1.62) / 1.64 * 0.06; }
  function zKnee(x) { return Math.min(1.80, pwl(TOP, x) - 0.15); }
  function upperRing(V, x) {
    var zt = pwl(TOP, x), zb = pwl(UB, x), ws = wSide(V, x), wr = Math.min(wRoof(V, x), ws - 0.03);
    var zk = Math.max(zb + 0.006, zKnee(x));
    return [[x, ws, zb], [x, ws, zk], [x, wr, zt], [x, -wr, zt], [x, -ws, zk], [x, -ws, zb]];
  }
  var BOT = [[XST, 0.60], [XST + 0.13, 0.46], [2.55, 0.46], [3.24, 0.98]];
  var LXS = [XST, XST + 0.13, 0.0, 2.55, 2.9, 3.24];
  function lowerRing(x) {
    var zb = pwl(BOT, x), w = 1.0, zt = Math.max(1.06, zb + 0.08);
    return [[x, w - 0.05, zb], [x, w, zb + 0.05], [x, w, zt], [x, -w, zt], [x, -w, zb + 0.05], [x, -(w - 0.05), zb]];
  }
  /* the skirt line (D1): 0.72 m along the wheels, stepping up over the idler at the stern and
     sweeping up over the sprocket at the bow */
  var SKB = [[XST, 1.10], [-2.42, 1.08], [-2.30, 0.72], [2.40, 0.72], [2.64, 0.82], [2.92, 1.00], [3.12, 1.03]];
  var SKX = [XST, -2.42, -2.36, -2.30, -1.0, 0.0, 1.0, 2.40, 2.52, 2.64, 2.78, 2.92, 3.12];
  var GDIR = unit([-(3.14 - 1.62), 0, 1.95 - 1.22]);           /* up the glacis */
  var GN = unit([1.95 - 1.22, 0, 3.14 - 1.62]);                /* glacis outward normal */
  function glacisPt(x, y, lift) { var z = pwl(TOP, x); return [x + GN[0] * (lift || 0), y, z + GN[2] * (lift || 0)]; }

  function addHull(B, V) {
    var R = [], i, k, s, x, y, z, w, n, ws;
    for (i = 0; i < UXS.length; i++) R.push(upperRing(V, UXS[i]));
    loftN(B.paint, R);
    R = [];
    for (i = 0; i < LXS.length; i++) R.push(lowerRing(LXS[i]));
    loftN(B.paint, R);

    for (s = -1; s <= 1; s += 2) {
      ws = V.w;
      /* the skirt: a thin plate standing over the track, its own loft along x */
      R = [];
      for (i = 0; i < SKX.length; i++) {
        x = SKX[i]; z = pwl(SKB, x);
        var yo = s * wSide(V, x), yi = s * (wSide(V, x) - 0.035);
        R.push([[x, yi, z], [x, yo, z], [x, yo, 1.05], [x, yi, 1.05]]);
      }
      loftN(B.paint, R);
      /* panel joints down the skirt and side (D1: six side panels, Q1) */
      var PJ = [-1.98, -1.17, -0.36, 0.45, 1.26, 2.07];
      for (k = 0; k < PJ.length; k++) box(B.dark, PJ[k] - 0.012, PJ[k] + 0.012, s > 0 ? ws - 0.004 : -ws - 0.006, s > 0 ? ws + 0.006 : -ws + 0.004, 0.73, zKnee(PJ[k]) - 0.02);
      box(B.dark, XST + 0.10, 2.30, s > 0 ? ws - 0.004 : -ws - 0.006, s > 0 ? ws + 0.006 : -ws + 0.004, 1.035, 1.05);
      if (V.mark >= 1) {
        /* applique era: the lifting loops on the lower skirt panels (D1, Q1), a bead along the
           top of the side armour */
        for (k = 0; k + 1 < PJ.length; k++) {
          x = (PJ[k] + PJ[k + 1]) / 2;
          y = s * (ws + 0.012);
          belt(B.dark, x - 0.16, 0.92, x - 0.06, 0.86, y - 0.012, y + 0.012, 0.02);
          belt(B.dark, x - 0.06, 0.86, x + 0.06, 0.86, y - 0.012, y + 0.012, 0.02);
          belt(B.dark, x + 0.06, 0.86, x + 0.16, 0.92, y - 0.012, y + 0.012, 0.02);
        }
        box(B.paint, XST + 0.05, 1.60, s > 0 ? ws - 0.01 : -ws - 0.02, s > 0 ? ws + 0.02 : -ws + 0.01, 1.765, 1.795);
      } else {
        /* the M2: two firing ports a side in round mounts (en.wikipedia; the A2's armour covered
           them) and the row of brackets along the side (P1, P2) */
        for (k = 0; k < 2; k++) {
          x = -1.05 - k * 1.0;
          cylY(B.paint, x, s * ws, s * (ws + 0.035), 1.42, 0.11, 14);
          cylY(B.dark, x, s * (ws + 0.03), s * (ws + 0.045), 1.42, 0.055, 10);
        }
        for (k = 0; k < 11; k++) {
          x = -2.55 + k * 0.48;
          box(B.dark, x - 0.04, x + 0.04, s > 0 ? ws : -ws - 0.03, s > 0 ? ws + 0.03 : -ws, 1.16, 1.24);
          box(B.dark, x - 0.04, x + 0.04, s > 0 ? ws : -ws - 0.03, s > 0 ? ws + 0.03 : -ws, 1.58, 1.64);
        }
      }
      if (V.brat) {
        /* reactive tiles over the side armour, two rows (R1; armour_specs "era") */
        for (var r = 0; r < 2; r++) for (k = 0; k < 11; k++) {
          x = -2.62 + k * 0.455; z = 1.04 + r * 0.37;
          box(B.paint, x, x + 0.43, s > 0 ? ws : -ws - 0.13, s > 0 ? ws + 0.13 : -ws, z, z + 0.35);
          box(B.dark, x + 0.03, x + 0.40, s > 0 ? ws + 0.13 : -ws - 0.135, s > 0 ? ws + 0.135 : -ws - 0.13, z + 0.03, z + 0.05);
        }
      }
      addTrack(B, s);
    }

    /* glacis: the driver's hatch front left at the knee with his periscopes, the engine
       intake louvres on the right (P1), the exhaust grille on the right shoulder (P1) */
    cylZ(B.paint, 1.30, 0.80, 1.93, 2.01, 0.30, 18);
    cylZ(B.dark, 1.30, 0.80, 2.01, 2.025, 0.25, 16);
    for (k = 0; k < 4; k++) box(B.glass, 1.62, 1.66, 0.56 + k * 0.16, 0.68 + k * 0.16, 1.93, 1.99);
    if (V.mark >= 1) { box(B.dark, 1.66, 1.86, 0.70, 0.92, 1.86, 2.00); box(B.glass, 1.86, 1.87, 0.73, 0.89, 1.90, 1.97); }
    if (!V.brat) {   /* under the tiles on the e00 row (R1) */
      slab(B.dark, glacisPt(2.30, -0.72, 0.012), GDIR, [0, 1, 0], GN, 0.42, 0.42, 0.012);
      for (k = 0; k < 7; k++) slab(B.paint, glacisPt(1.98 + k * 0.105, -0.72, 0.03), GDIR, [0, 1, 0], GN, 0.022, 0.40, 0.022);
    }
    var sh = unit([0, -0.15, 0.20]), sp = unit([0, -0.20, -0.15]);
    var shp = function (x, d) { return [x, -V.w + 0.10 + sh[1] * d, 1.875 + sh[2] * d]; };
    slab(B.dark, shp(0.98, 0.006), [1, 0, 0], sp, sh, 0.56, 0.105, 0.008);
    for (k = 0; k < 10; k++) slab(B.paint, shp(0.48 + k * 0.111, 0.024), [1, 0, 0], sp, sh, 0.02, 0.10, 0.012);
    if (V.mark >= 1) {
      /* applique plates on the glacis (D1, Q1) */
      slab(B.paint, glacisPt(2.55, 0.62, 0.03), GDIR, [0, 1, 0], GN, 0.62, 0.66, 0.03);
      slab(B.paint, glacisPt(2.95, -0.70, 0.03), GDIR, [0, 1, 0], GN, 0.22, 0.62, 0.03);
    }
    if (V.brat) {
      for (k = 0; k < 3; k++) for (i = 0; i < 6; i++) {
        if (i < 3 && k === 0) continue;
        slab(B.paint, glacisPt(2.20 + k * 0.32, -1.25 + i * 0.47, 0.10), GDIR, [0, 1, 0], GN, 0.15, 0.22, 0.07);
      }
    }
    /* nose: headlamp pairs in guards at the corners (P1, Q1), tow eyes, the M2's folded trim
       vane across the nose face (P1) */
    for (s = -1; s <= 1; s += 2) {
      y = s * (V.w - 0.25); z = 1.22;
      box(B.dark, 3.02, 3.16, y - 0.16, y + 0.16, z - 0.02, z + 0.04);
      for (k = 0; k < 2; k++) {
        cylX(B.dark, 3.04, 3.17, y + (k ? 0.08 : -0.08), z + 0.12, 0.062, 0.066, 12);
        cylX(B.glass, 3.17, 3.18, y + (k ? 0.08 : -0.08), z + 0.12, 0.055, 0.055, 12);
      }
      belt(B.dark, 3.02, z, 3.02, z + 0.24, y - 0.19, y - 0.17, 0.02);
      belt(B.dark, 3.02, z, 3.02, z + 0.24, y + 0.17, y + 0.19, 0.02);
      belt(B.dark, 3.02, z + 0.23, 3.20, z + 0.21, y - 0.19, y + 0.19, 0.02);
      cylY(B.dark, 3.22, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.84, 0.07, 10);
      box(B.dark, 3.08, 3.20, s * 0.55 - 0.05, s * 0.55 + 0.05, 0.78, 0.90);
    }
    if (V.vane) {
      box(B.paint, 3.26, 3.30, -1.32, 1.32, 0.95, 1.18);
      box(B.dark, 3.29, 3.31, -1.30, 1.30, 1.10, 1.12);
      for (s = -1; s <= 1; s += 2) box(B.dark, 3.24, 3.33, s * 0.95 - 0.07, s * 0.95 + 0.07, 1.00, 1.08);
    } else {
      box(B.paint, 3.24, 3.29, -1.20, 1.20, 0.95, 1.14);
    }

    /* roof: the raised rear cargo hatch (D1), the team strips beside it, aerial bases */
    var cr = [[-2.10, 1.94], [-2.18, 2.09], [-2.72, 2.09], [-2.80, 1.94]];
    R = [];
    for (s = -1; s <= 1; s += 2) { var ring = []; for (k = 0; k < cr.length; k++) ring.push([cr[k][0], s * 0.62, cr[k][1]]); R.push(ring); }
    loftN(B.paint, R);
    box(B.dark, -2.70, -2.20, -0.58, 0.58, 2.09, 2.10);
    box(B.team, -2.74, -2.16, 0.70, 1.00, 1.95, 1.962);
    box(B.team, -2.74, -2.16, -1.00, -0.70, 1.95, 1.962);

    /* stern (P2, D1): the plate, the ramp between the two rear corner boxes, its door, lamps */
    box(B.paint, XST - 0.08, XST, -0.78, 0.78, 0.56, 1.88);
    box(B.dark, XST - 0.085, XST - 0.075, -0.80, 0.80, 1.86, 1.88);
    box(B.dark, XST - 0.09, XST - 0.08, 0.06, 0.62, 0.80, 1.72);
    box(B.paint, XST - 0.10, XST - 0.085, 0.10, 0.58, 0.84, 1.68);
    cylX(B.dark, XST - 0.12, XST - 0.08, 0.50, 1.26, 0.03, 0.03, 8);
    for (k = 0; k < 2; k++) cylZ(B.dark, XST - 0.12, k ? -0.62 : 0.62, 0.56, 0.74, 0.04, 8);
    var RC = [[XST, 1.05], [-3.10, 1.05], [-3.25, 1.84], [-3.17, 1.95], [XST, 1.95]];
    for (s = -1; s <= 1; s += 2) {
      var L1 = [], L2 = [], y0 = s * 0.82, y1 = s * (V.w - 0.03);
      for (k = 0; k < RC.length; k++) { L1.push([RC[k][0], y0, RC[k][1]]); L2.push([RC[k][0], y1, RC[k][1]]); }
      loftN(B.paint, [L1, L2]);
      box(B.dark, -3.235, -3.20, s * 1.25 - 0.08, s * 1.25 + 0.08, 1.60, 1.72);
      box(B.glass, -3.245, -3.235, s * 1.25 - 0.06, s * 1.25 + 0.06, 1.62, 1.70);
      box(B.dark, -3.19, -3.10, s * 1.10 - 0.05, s * 1.10 + 0.05, 1.05, 1.30);
      cylX(B.dark, -3.20, -3.10, s * 1.10, 1.00, 0.04, 0.04, 8);
    }
  }

  /* ------------------------------------------------------- running gear */
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  var _loop = null;
  function trackLoop() {
    if (_loop) return _loop;
    var C = [], i, k, pts = [], n, a, b, l, segs = [], tot = 0;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.03]);
    C.push([IDL.x, IDL.z, IDL.r + 0.035], [SPR.x, SPR.z, SPR.r + 0.035]);
    for (i = 0; i < XR.length; i++) C.push([XR[i], ZR, RR + 0.035]);
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * C[i][2], C[i][1] + Math.sin(k / 24 * TAU) * C[i][2]]);
    pts = hull2(pts); n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    _loop = { segs: segs, tot: tot };
    return _loop;
  }
  function addTrack(B, s) {
    var L = trackLoop(), segs = L.segs, n = segs.length, cnt = Math.round(L.tot / 0.155), step = L.tot / cnt;
    var y = s * TY, i, k, q = 0, rem = 0, d, t, a, b, dx, dz, px, pz;
    for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.05);
    for (k = 0; k < cnt; k++) {
      d = (k + 0.5) * step;
      while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
      t = (d - rem) / segs[q][2];
      a = segs[q][0]; b = segs[q][1];
      dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
      px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
      if (pz > 0.80 && px > -2.25 && px < 2.35) continue;        /* the top run behind the skirt */
      belt(B.dark, px - dx * 0.045, pz - dz * 0.045, px + dx * 0.045, pz + dz * 0.045, y - TW - 0.005, y + TW + 0.005, 0.065);
    }
    /* front drive sprocket: hub disc and teeth (P4, Q1) */
    cylY(B.dark, SPR.x, y - 0.14, y + 0.14, SPR.z, SPR.r - 0.03, 16);
    for (k = 0; k < 14; k++) {
      t = k / 14 * TAU;
      slab(B.dark, [SPR.x + Math.cos(t) * (SPR.r - 0.01), y, SPR.z + Math.sin(t) * (SPR.r - 0.01)], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.04, 0.10, 0.028);
    }
    cylY(B.paint, SPR.x, y + s * 0.13, y + s * 0.17, SPR.z, 0.17, 14);
    cylY(B.dark, SPR.x, y + s * 0.17, y + s * 0.19, SPR.z, 0.07, 10);
    /* rear idler: a spoked wheel (P2, D1) */
    cylY(B.dark, IDL.x, y - 0.14, y + 0.14, IDL.z, IDL.r, 18);
    cylY(B.paint, IDL.x, y + s * 0.13, y + s * 0.16, IDL.z, IDL.r - 0.05, 16);
    for (k = 0; k < 6; k++) { t = k / 6 * TAU; cylY(B.dark, IDL.x + Math.cos(t) * 0.14, y + s * 0.155, y + s * 0.165, IDL.z + Math.sin(t) * 0.14, 0.055, 8); }
    cylY(B.dark, IDL.x, y + s * 0.16, y + s * 0.19, IDL.z, 0.06, 10);
    for (k = 0; k < XR.length; k++) cylY(B.dark, XR[k], y - 0.09, y + 0.09, ZR, RR, 10);
    /* torsion-bar arms between the wheels and the hull */
    for (k = 0; k < XW.length; k++) slab(B.dark, [XW[k] - 0.18, s * (TY - 0.31), ZW + 0.12], unit([1, 0, -0.45]), [0, 1, 0], unit([0.45, 0, 1]), 0.20, 0.035, 0.04);
  }

  /* road wheel (D1, P2, Q1): twin dished aluminium discs on rubber tyres, a hub cap with its nuts */
  var TYRE = [0.13, 0.135, 0.125], NUT = [0.17, 0.18, 0.16];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.05, gg * 1.05, bb * 1.05];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.25, y - 0.07, 0, RW, 20);
      cylY(W, 0, y + 0.07, y + 0.25, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.07, y + 0.07, 0, RW - 0.06, 16);
      cyl(W, [0, y + s * 0.25, 0], [0, y + s * 0.27, 0], RW - 0.05, 0.15, 18);
      cylY(W, 0, y + s * 0.255, y + s * 0.272, 0, 0.21, 18);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.10, 12);
      W.col = NUT;
      for (i = 0; i < 8; i++) { a = i / 8 * TAU; cylY(W, Math.cos(a) * 0.075, y + s * 0.295, y + s * 0.31, Math.sin(a) * 0.075, 0.013, 6); }
      cylY(W, 0, y + s * 0.30, y + s * 0.315, 0, 0.04, 8);
    }
  }

  /* -------------------------------------------------------------- turret */
  /* Local frame: origin on the ring centre at roof height, gun along +X. Side profile from D1
     (front slope from 0.99 m ahead of the ring at the roof to 0.69 m at the turret roof,
     0.74 m over the hull roof = 2.69 m), plan from the photographs (Q1, R2) */
  var TPL = [
    { z: -0.02, H: [[1.00, 0.30], [0.96, 0.82], [0.74, 1.00], [-0.86, 1.00], [-0.92, 0.76], [-0.92, 0.30]] },
    { z: 0.28, H: [[0.88, 0.30], [0.85, 0.81], [0.64, 0.98], [-0.86, 0.98], [-0.92, 0.74], [-0.92, 0.28]] },
    { z: 0.74, H: [[0.69, 0.30], [0.64, 0.66], [0.44, 0.82], [-0.80, 0.82], [-0.86, 0.62], [-0.86, 0.26]] }
  ];
  var GZ = 0.45;                                               /* gun axis 2.40 m (D1) */
  function addTow(B, V) {
    /* the twin TOW launcher on the turret's LEFT side (P2, D1, Q1, R2): a box 1.2 m long, its
       armoured front doors closed when stowed, open on the two tubes when raised */
    var y0 = 1.00, y1 = 1.55, x0 = -1.42, x1 = -0.10, z0 = 0.12, z1 = 0.74, k, s, M = markBins(B);
    box(B.paint, x0, x1, y0, y1, z0, z1);
    box(B.dark, x0 + 0.10, x1 - 0.10, y1, y1 + 0.006, z0 + 0.05, z0 + 0.07);
    box(B.dark, x0 + 0.10, x1 - 0.10, y1, y1 + 0.006, z1 - 0.07, z1 - 0.05);
    box(B.paint, x0 + 0.20, x0 + 0.60, y0 + 0.06, y1 - 0.06, z1, z1 + 0.025);
    if (V.towUp) {
      for (k = 0; k < 2; k++) {
        cylX(B.dark, x1, x1 + 0.02, (y0 + y1) / 2, z0 + 0.14 + k * 0.26, 0.10, 0.10, 14);
        cylX(B.glass, x1 + 0.02, x1 + 0.025, (y0 + y1) / 2, z0 + 0.14 + k * 0.26, 0.07, 0.07, 12);
      }
      box(B.paint, x1, x1 + 0.03, y0 - 0.02, y0 + 0.02, z0, z1);
      box(B.paint, x1, x1 + 0.03, y1 - 0.02, y1 + 0.02, z0, z1);
      /* raised (Q1, R2): the box swings up on its arm until it stands clear over the turret
         roof, a little nose up */
      pitchSince(B, M, x0, z0, 0.12);
      for (k in B) for (s = M[k] + 2; s < B[k].P.length; s += 3) B[k].P[s] += 0.64;
      slab(B.dark, [x0 + 0.30, y0 + 0.12, 0.50], unit([0.25, 0, 1]), [0, 1, 0], unit([-1, 0, 0.25]), 0.30, 0.05, 0.05);
      slab(B.dark, [x0 + 0.95, y0 + 0.12, 0.62], unit([0.6, 0, 1]), [0, 1, 0], unit([-1, 0, 0.6]), 0.22, 0.04, 0.04);
    } else {
      box(B.dark, x1, x1 + 0.012, y0 + 0.03, y1 - 0.03, z0 + 0.03, z1 - 0.03);
      box(B.paint, x1 + 0.012, x1 + 0.03, y0 + 0.05, y1 - 0.05, z0 + 0.05, z1 - 0.05);
      for (s = 0; s < 2; s++) box(B.dark, x1 + 0.03, x1 + 0.045, y0 + 0.08 + s * 0.28, y0 + 0.12 + s * 0.28, (z0 + z1) / 2 - 0.03, (z0 + z1) / 2 + 0.03);
    }
    box(B.dark, x0 - 0.04, x0 + 0.10, y0 - 0.06, y0 + 0.02, z0 + 0.02, z0 + 0.18);
  }
  function addTurret(V, B) {
    var R = [], i, s, k, a, x, y;
    for (i = 0; i < TPL.length; i++) R.push(ringAt(TPL[i].H, TPL[i].z));
    loftN(B.paint, R);
    /* the mantlet and the M242 25 mm: sleeve, barrel, the thinner muzzle section and its flash
       hider reaching 2.79 m ahead of the ring (D1); the M240C coaxial on the right */
    box(B.paint, 0.80, 1.06, -0.26, 0.26, 0.24, 0.66);
    cylX(B.paint, 1.02, 1.30, 0, GZ, 0.13, 0.12, 16);
    cylX(B.paint, 1.30, 1.40, 0, GZ, 0.12, 0.07, 16);
    cylX(B.dark, 1.30, 1.42, 0, GZ, 0.06, 0.055, 12);
    cylX(B.dark, 1.42, 2.02, 0, GZ, 0.046, 0.044, 12);
    cylX(B.dark, 2.02, 2.46, 0, GZ, 0.031, 0.031, 10);
    cylX(B.dark, 2.46, 2.79, 0, GZ, 0.037, 0.037, 10);
    cylX(B.dark, 2.70, 2.79, 0, GZ, 0.045, 0.045, 10);
    cylX(B.dark, 1.14, 1.40, -0.18, GZ - 0.06, 0.022, 0.02, 6);
    /* M257 smoke launchers: a four-tube cluster on each front corner (D1, Q1) */
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.84;
      box(B.dark, 0.78, 0.92, y - 0.12, y + 0.12, 0.18, 0.40);
      for (k = 0; k < 4; k++) {
        var yy = y + (k % 2 ? 0.055 : -0.055), zz = 0.24 + (k < 2 ? 0 : 0.11);
        cyl(B.dark, [0.90, yy, zz], [1.08, yy + s * 0.03, zz + 0.05], 0.045, 0.045, 10);
        cyl(B.paint, [1.08, yy + s * 0.03, zz + 0.05], [1.09, yy + s * 0.032, zz + 0.053], 0.049, 0.049, 10);
      }
    }
    /* the gunner's sight head on the roof front, left of the gun (D1 to 3.02 m, Q1): the
       ISU on the M2, the ISU with the eye-safe laser rangefinder on the ODS, the larger IBAS
       head with its armoured doors on the A3 */
    var ib = V.mark >= 2;
    box(B.paint, 0.08, 0.60, 0.10, 0.54, 0.73, 0.86);
    box(B.paint, ib ? 0.06 : 0.12, ib ? 0.58 : 0.52, 0.14, 0.50, 0.86, ib ? 1.10 : 1.07);
    box(B.glass, ib ? 0.58 : 0.52, ib ? 0.595 : 0.535, 0.18, 0.30, 0.92, 1.02);
    box(B.glass, ib ? 0.58 : 0.52, ib ? 0.595 : 0.535, 0.34, 0.46, 0.92, 1.02);
    box(B.dark, ib ? 0.585 : 0.525, ib ? 0.60 : 0.54, 0.16, 0.48, 1.03, 1.05);
    if (V.mark === 1) { box(B.paint, 0.20, 0.50, 0.03, 0.14, 0.88, 1.02); box(B.glass, 0.50, 0.51, 0.05, 0.12, 0.92, 0.98); }
    if (ib) {
      for (s = 0; s < 2; s++) box(B.paint, 0.56, 0.62, s ? 0.32 : 0.12, s ? 0.52 : 0.32, 1.06, 1.09);
      box(B.dark, -0.04, 0.10, 0.20, 0.44, 0.86, 1.02);
    }
    /* the ODS's missile countermeasure device on the roof over the gun (NOT CONFIRMED where) */
    if (V.mcd) {
      box(B.paint, 0.28, 0.62, -0.42, -0.08, 0.73, 0.95);
      box(B.glass, 0.62, 0.635, -0.38, -0.12, 0.77, 0.91);
    }
    /* commander's hatch on the right with its periscopes, the gunner's hatch on the left */
    cylZ(B.paint, -0.30, -0.45, 0.72, 0.82, 0.32, 18);
    cylZ(B.dark, -0.30, -0.45, 0.82, 0.835, 0.27, 16);
    cylZ(B.paint, -0.30, -0.45, 0.835, 0.87, 0.25, 16);
    for (k = 0; k < 5; k++) {
      a = -1.2 + k * 0.6;
      x = -0.30 + Math.cos(a) * 0.32; y = -0.45 + Math.sin(a) * 0.32;
      box(B.glass, x - 0.045, x + 0.045, y - 0.045, y + 0.045, 0.76, 0.84);
    }
    cylZ(B.paint, -0.38, 0.42, 0.72, 0.80, 0.26, 16);
    cylZ(B.team, -0.38, 0.42, 0.80, 0.812, 0.22, 16);
    /* the A3's commander's independent viewer: a tall drum at the right rear of the roof with
       its head, window forward (R1, R2; en.wikipedia) */
    if (V.mark >= 2) {
      cylZ(B.paint, -0.64, -0.66, 0.72, 0.98, 0.21, 16);
      cylZ(B.dark, -0.64, -0.66, 0.98, 1.00, 0.17, 14);
      box(B.paint, -0.88, -0.40, -0.88, -0.44, 1.00, 1.30);
      box(B.glass, -0.40, -0.385, -0.82, -0.68, 1.08, 1.24);
      box(B.glass, -0.40, -0.385, -0.64, -0.50, 1.08, 1.24);
      box(B.dark, -0.90, -0.86, -0.86, -0.46, 1.04, 1.26);
    }
    /* the bustle rack at the turret rear (P2, D1) with its stowage */
    box(B.dark, -1.14, -0.80, -0.92, 0.88, 0.08, 0.11);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -1.14, -1.11, s * 0.88 - 0.015, s * 0.88 + 0.015, 0.11, 0.48);
      box(B.dark, -1.14, -0.80, s * 0.88 - 0.015, s * 0.88 + 0.015, 0.46, 0.48);
    }
    box(B.dark, -1.15, -1.11, -0.88, 0.88, 0.46, 0.48);
    box(B.dark, -1.15, -1.11, -0.88, 0.88, 0.27, 0.29);
    cylY(B.paint, -0.98, -0.80, 0.20, 0.25, 0.14, 12);
    box(B.paint, -1.08, -0.82, 0.24, 0.82, 0.11, 0.38);
    /* two whip aerials at the turret rear (P1, D1) */
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.dark, -0.72, s * 0.55, 0.74, 0.86, 0.045, 8);
      cylZ(B.dark, -0.72, s * 0.55, 0.86, 1.45, 0.008, 5);
    }
    addTow(B, V);
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A3N, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T, V), TB = bins(T, V), i, wg, WB;
    addHull(HB, V);
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
    addTurret(V, TB);
    wg = new THREE.Group();
    wg.name = "turret";
    wg.position.set(TX, TYC, ROOF);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (models3d convention) */
UNIT_MODELS["nato_e80_ifv"] = {
  len: 6.58,
  build: function (THREE, M, C) { return HeroBradley.build(THREE, M, C, "M2"); }
};
UNIT_MODELS["nato_e90_ifv"] = {
  len: 6.54,
  build: function (THREE, M, C) { return HeroBradley.build(THREE, M, C, "A2"); }
};
UNIT_MODELS["nato_e00_ifv"] = {
  len: 6.54,
  build: function (THREE, M, C) { return HeroBradley.build(THREE, M, C, "A3"); }
};
UNIT_MODELS["ifv_n"] = {
  len: 6.54,
  build: function (THREE, M, C) { return HeroBradley.build(THREE, M, C, "A3N"); }
};
