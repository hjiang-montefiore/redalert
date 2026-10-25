/* ========== ru_t64.js - HERO model: T-64A main battle tank (pact_e60_t64a) ===
   The Kharkiv tank of the 1960s-70s, drawn as the T-64A (Object 434, production from
   1969, accepted 1973; the row's service date is 1968): the first 125 mm smoothbore
   (D-81T / 2A26) with the mechanised loader and three crew.  NOT the T-64B/BV (Kobra,
   laser sight, Kontakt-1) and NOT the 1980s refit with 902A smoke tubes and full-length
   rubber skirts.  One builder with a VARIANTS table, as before.

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons, width 960,
   cached in scratchpad/q_t64_ref:
     P1  "T-64A in the Kubinka Museum.jpg" - early T-64A ('34'), starboard front 3/4,
         indoors: the spring-loaded side screens ("gills") swung out in the combat
         position, ribbed steel with three vertical ribs, the front one with a rubber
         strip below; the big ribbed front mudguard wings over the idler; six small road
         wheels a side with no rubber tyres (dark steel rim, a ring of holes in the disc);
         the thin rubber-metal-hinge track; the cupola at the right rear with the round
         OU-3GK lamp on it; the canvas mantlet cover; the long plain gun.
     P2  "T-64A (Obiekt 434) Main Battle Tank '434' (37439429690).jpg" - early T-64A,
         starboard front 3/4: four gills a side (two together at the rear, one mid, one
         behind the wing); the cast turret with near-vertical lower sides, a rounded
         shoulder and a low flat roof; a hand rail along the turret side; the armoured
         housing of the rangefinder's right-hand window on the right shoulder ahead of
         the cupola; the antenna base.
     P3  "T-64A - Moscow Suvorov Military School (1)/(3).jpg" - a 1970s-built T-64A
         (with later skirts and smoke tubes, NOT drawn): the remote 12.7 mm NSVT mount on
         the commander's cupola; the round L-2G infra-red searchlight LEFT of the gun; the
         thermal sleeve with its clamp bands and the bore evacuator; the glacis with the
         row of KMT-6 plough lugs across the nose, headlamps in guards at its corners,
         the dozer blade under the nose; the ribbed front wings.
     P4  "T-64A - Moscow Suvorov Military School (4)/(5).jpg" - rear 3/4 views: the OPVT
         snorkel stowed ACROSS the turret rear on brackets; the transverse louvred grille
         along the rear edge of the engine deck; the flat rear plate with tow hooks; the
         long boxes along the fender tops; the louvred box on the left rear fender.
     D1  "Gora Filina Lahdenpohja T-64 vid sboku.png" (a later T-64 on the same hull and
         running gear, dead side-on) - used as the side drawing: scaled from the 550 mm
         road wheel (about 129 px/m in a 3x crop): wheel pitch 0.76 m, first wheel 1.6 m
         behind the nose, idler 0.9 m behind the nose and 0.55 m up, sprocket raised to
         about 0.75 m, fender line 1.25 m, gun axis 1.72 m, dome top 1.98 m, cupola
         top 2.2 m, evacuator 1.6-2.4 m behind the muzzle.
   Published figures (en Wikipedia T-64 infobox, citing KMDB, for the T-64A): length
   9.225 m gun forward, width 3.415 m, height 2.172 m; ru Wikipedia T-64A: 2A26 gun with
   the thermal sleeve, TPD-2-49 sight-rangefinder with "the housing of the stereoscopic
   rangefinder tube with a window at its end on the right of the turret", the remotely
   controlled AA machine gun, deep-wading (OPVT) kit, self-entrenching dozer blade, KMT-6
   plough fittings, and the "non-continuous spring-loaded side screens, spread out to the
   sides in the combat position, held by cables".  Six 550 mm road wheels (aluminium,
   internal shock absorption) and four return rollers a side, 580 mm track.  The old
   header's figures (hull about 6.5 m, 9.2 m gun forward, width 3.4 m, height 2.17 m,
   track 580 mm, six 550 mm wheels, four rollers, rear drive) are kept: the references
   agree.

   CORRECTIONS against the previous model (the references do not support it):
   - the side screens: the old model hung fixed skirt plates over the rear half (P3's
     later refit); the 1970s T-64A had four spring-loaded gills a side (P1, P2, ru
     Wikipedia), now drawn swung out in their combat position;
   - the NSVT: the old header left it off as "later production"; ru Wikipedia lists the
     remote AA gun among the T-64A's fittings and P3 shows the mount, so the 1970s tank
     carries it (the early tanks in P1/P2 show the bare cupola - see NOT CONFIRMED);
   - hull deck 1.08 m -> 1.40 m and fender 1.0 m -> 1.24 m (D1: the old turret roof sat
     at 1.9 m against the published 2.17 m to the cupola);
   - road-wheel pitch 0.77 m kept (0.76 m, D1); the idler raised to 0.54 m and the
     sprocket to 0.72 m (D1, P1);
   - the thermal sleeve, the rangefinder's right window housing, the turret hand rails,
     the snorkel across the turret rear, the KMT-6 lugs and the dozer blade were missing.

   Recognition list (what makes it read at game zoom, and its source):
     1. six SMALL closely spaced road wheels with no tyres, four return rollers, the thin
        track climbing to a raised rear sprocket - D1, P1
     2. low flat hull, long shallow glacis to a sharp nose, dozer blade under it - D1, P3
     3. the big ribbed front mudguard wings rounded over the idlers - P1, P3
     4. four spring-loaded gill screens a side, swung out from the fender edge - P1, P2
     5. low cast turret, steep lower sides and a flat roof, set mid-hull - P2, D1
     6. long 125 mm gun with the thermal sleeve, clamp bands and a mid-barrel bore
        evacuator, canvas mantlet cover - P1, P3, D1
     7. round IR searchlight left of the gun - P3
     8. commander's cupola right rear with the remote NSVT mount; the rangefinder's
        window housing on the right shoulder - P2, P3
     9. the OPVT snorkel lying across the turret rear - P4
    10. long boxes along the fender tops, the louvred grille across the rear deck - P4
   Paint: Soviet tank green of the period.  P1/P2 are indoors under cold light (turret
   sampled #4f4f49, hull #58544b); the outdoor survivors (P3, P4) wear later museum
   camouflage, not drawn.  Drawn in the same period olive as the T-72 Ural benchmark,
   #4c5739, about 0.85 of the lit level.  No numbers, stars or markings (P1, P2 carry
   turret numbers: not drawn).
   NOT CONFIRMED, drawn as judgement calls: the gills' swing angle (35 deg; P1 shows them
   at roughly that); the gill hinge positions (spaced evenly from behind the wing to the
   sprocket, P2 shows the rear two close together); the NSVT gun itself (museum mounts
   are empty); the year the NSVT mount came in (ru Wikipedia gives no date; the early
   P1/P2 tanks lack it); the fender box layout (P4 is a later tank); the snorkel's two
   sections (P4).  NOT drawn (no 1970s source): fuel drums (armour_specs lists them;
   no photograph shows them on a T-64A), unditching beam, smoke grenade launchers,
   rubber side skirts, the 30 mm glacis plate of 1984.

   Materials: PAINT (canvas texture: base, mottling, weld seams, bolt rows), DARK (track,
   fittings, sights), RUBBER (mantlet cover, gill strips, mud flaps), WHEEL (rims, discs,
   holes by vertex colour) and the team colour exactly as handed in (C.team): three small
   strips (rear deck, right fender box, turret roof).
   Nodes: "turret" (trains, origin on the ring centre, gun along +X) and six "roadwheel"
   groups (axle along local Y, each holding both sides).  Draw calls: hull 4 + turret 4
   + 6 wheels = 14.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT64 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* dome: cast turret plan radii (AF front, AR rear, AY across), height H, front droop;
     gills: swing angle of the side screens (rad); aaMg: the remote NSVT on the cupola */
  var VARIANTS = {
    A: { paint: { base: "#4c5739", blots: ["#434e32", "#56613f"], seed: 434 },
         dome: { AF: 1.30, AR: 1.30, AY: 1.10, H: 0.60, drop: 0.13 },
         gills: 0.61, aaMg: true, snorkel: true }
  };

  /* running gear (D1, P1): six 550 mm wheels at a 0.76 m pitch, four return rollers,
     idler front under the wing, drive sprocket rear and raised */
  var TY = 1.415, TW = 0.29;
  var XW = [1.68, 0.92, 0.16, -0.60, -1.36, -2.12], ZW = 0.335, RW = 0.275;
  var XR = [1.30, 0.54, -0.22, -0.98], ZR = 0.64, RR = 0.072;
  var IDL = { x: 2.36, z: 0.54, r: 0.26 }, SPR = { x: -2.86, z: 0.72, r: 0.29 };
  var DECK = 1.40, FEN = 1.24, FW = 1.71, TX = -0.10;  /* deck, fender, fender half width, turret x */
  var NOSE = 3.27, STERN = -3.27;

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
  function triN(bin, a, b, c, hint) {
    var n = cross(sub(b, a), sub(c, a));
    if (dot(n, hint) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
  function quadN(bin, a, b, c, d, hint) { triN(bin, a, b, c, hint); triN(bin, a, c, d, hint); }
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
  /* box mirrored to either side: ya..yb are given for the port side (positive) */
  function sbox(bin, x0, x1, ya, yb, z0, z1, p) {
    if (p > 0) box(bin, x0, x1, ya, yb, z0, z1); else box(bin, x0, x1, -yb, -ya, z0, z1);
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
  /* an oriented block without its underside: centre c, half sizes along u, v, w */
  function blk(bin, c, u, v, w, hu, hv, hw) {
    function Q(a, b, d) {
      return [c[0] + u[0] * a * hu + v[0] * b * hv + w[0] * d * hw, c[1] + u[1] * a * hu + v[1] * b * hv + w[1] * d * hw,
              c[2] + u[2] * a * hu + v[2] * b * hv + w[2] * d * hw];
    }
    var q = [Q(-1, -1, -1), Q(1, -1, -1), Q(1, 1, -1), Q(-1, 1, -1), Q(-1, -1, 1), Q(1, -1, 1), Q(1, 1, 1), Q(-1, 1, 1)];
    var F = [[[4, 5, 6, 7], w], [[1, 2, 6, 5], u], [[0, 4, 7, 3], [-u[0], -u[1], -u[2]]],
             [[3, 7, 6, 2], v], [[0, 1, 5, 4], [-v[0], -v[1], -v[2]]]], k, f;
    for (k = 0; k < F.length; k++) {
      f = F[k][0];
      triN(bin, q[f[0]], q[f[1]], q[f[2]], F[k][1]); triN(bin, q[f[0]], q[f[2]], q[f[3]], F[k][1]);
    }
  }
  /* a thin shell lofted through stations, each an OPEN polyline of [x, y, z] points with
     the same count; th is the thickness, pushed to the side away from "out" (a point the
     shell bulges away from is "inside": ctr(k) gives it per station) */
  function shell(bin, L, th, ctr) {
    var m = L.length, n = L[0].length, k, i, O = [], I = [], N = [];
    for (k = 0; k < m; k++) {
      O.push([]); I.push([]); N.push([]);
      var c = ctr(k);
      for (i = 0; i < n; i++) {
        var p = L[k][i], a = L[k][Math.max(0, i - 1)], b = L[k][Math.min(n - 1, i + 1)];
        var t = unit(sub(b, a)), d = sub(p, c), nn = unit([0, d[1] - t[1] * dot(d, t), d[2] - t[2] * dot(d, t)]);
        O[k].push(p); N[k].push(nn);
        I[k].push([p[0], p[1] - nn[1] * th, p[2] - nn[2] * th]);
      }
    }
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i + 1 < n; i++) {
        var h = unit([0, N[k][i][1] + N[k][i + 1][1], N[k][i][2] + N[k][i + 1][2]]);
        quadN(bin, O[k][i], O[k][i + 1], O[k + 1][i + 1], O[k + 1][i], h);
        quadN(bin, I[k][i], I[k][i + 1], I[k + 1][i + 1], I[k + 1][i], [-h[0], -h[1], -h[2]]);
      }
    for (k = 0; k + 1 < m; k++) {
      quadN(bin, O[k][0], I[k][0], I[k + 1][0], O[k + 1][0], unit(sub(L[k][0], L[k][1])));
      quadN(bin, O[k][n - 1], I[k][n - 1], I[k + 1][n - 1], O[k + 1][n - 1], unit(sub(L[k][n - 1], L[k][n - 2])));
    }
    for (i = 0; i + 1 < n; i++) {
      quadN(bin, O[0][i], O[0][i + 1], I[0][i + 1], I[0][i], unit(sub(L[0][0], L[1][0])));
      quadN(bin, O[m - 1][i], O[m - 1][i + 1], I[m - 1][i + 1], I[m - 1][i], unit(sub(L[m - 1][0], L[m - 2][0])));
    }
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
  /* hull and turret paint: one tile is 1 / 0.34 = 2.9 m.  Base, soft mottling, weld seams
     and bolt rows at plate edges, rain streaks and grime (P1, P2) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "p" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.35 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.45)";
        for (k = 6; k < w; k += 14) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.rubber = new THREE.MeshStandardMaterial({ color: 0x2f312c, roughness: 0.95, metalness: 0.0 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, metalness: 0.1, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), rubber: new Bin(T.rubber, false), team: new Bin(T.team, false) };
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
  /* station table, measured off D1 (scale from the 550 mm wheel) and the 9.225 m / 6.54 m
     published lengths: x, belly half width, belly z, side half width, roof z.  Flat deck at
     1.40 m from the stern to x = 2.10; the upper glacis falls at 22 deg (tan 0.404) to a
     sharp nose at 0.93 m; the lower glacis runs back to the belly by x = 2.75; vertical
     rear plate. */
  var HS = [
    [-3.27, 1.00, 0.66, 1.04, 1.35],
    [-3.255, 1.02, 0.56, 1.06, 1.385],
    [-3.21, 1.02, 0.50, 1.06, 1.40],
    [-3.00, 1.02, 0.48, 1.06, 1.40],
    [-2.00, 1.02, 0.48, 1.06, 1.40],
    [-1.00, 1.02, 0.48, 1.06, 1.40],
    [ 0.00, 1.02, 0.48, 1.06, 1.40],
    [ 1.00, 1.02, 0.48, 1.06, 1.40],
    [ 2.10, 1.02, 0.48, 1.06, 1.40],
    [ 2.35, 1.02, 0.48, 1.06, 1.299],
    [ 2.60, 1.02, 0.485, 1.06, 1.198],
    [ 2.78, 1.02, 0.50, 1.06, 1.125],
    [ 2.95, 1.01, 0.60, 1.055, 1.056],
    [ 3.10, 1.00, 0.70, 1.05, 0.996],
    [ 3.20, 0.99, 0.78, 1.045, 0.955],
    [ 3.27, 0.98, 0.86, 1.04, 0.927]
  ];
  function glacisZ(x) { return x <= 2.10 ? DECK : DECK - 0.404 * (x - 2.10); }
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
    return [[x, wb, zB], [x, ws, Math.min(zB + 0.10, zT - 2 * e)], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, Math.min(zB + 0.10, zT - 2 * e)], [x, -wb, zB]];
  }

  /* the front mudguard wing (P1, P3): a ribbed hood off the fender shelf, its crown rounded
     down over the idler to the nose, its outer edge curled down to a near-level lower edge
     just above the track (P1); stations along x, each an arc across from the hull side
     to the fender edge */
  var WING = [   /* x, crown z, outer-edge drop */
    [2.08, FEN + 0.005, 0.28], [2.42, FEN - 0.005, 0.30], [2.72, FEN - 0.04, 0.29],
    [2.96, FEN - 0.10, 0.25], [3.12, FEN - 0.17, 0.19], [3.23, FEN - 0.25, 0.12], [3.29, FEN - 0.32, 0.06]
  ];
  function wingArc(Wr, p) {
    var Q = [], i, t, y, z, NA = 7, y0 = 1.07, y1 = FW + 0.01;
    for (i = 0; i <= NA; i++) {
      t = i / NA;
      y = y0 + (y1 - y0) * (1 - Math.pow(1 - t, 1.6));
      z = Wr[1] - Wr[2] * Math.pow(t, 2.6) + 0.035 * Math.sin(t * Math.PI);
      Q.push([Wr[0], p * y, z]);
    }
    return Q;
  }

  function addHull(B, V) {
    var R = HS.map(hullRing), i, j, k, k1, a, b, c, d, e, dy, dz, p, s, x, n = R[0].length;
    for (i = 0; i + 1 < R.length; i++)
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        a = R[i][k]; b = R[i][k1]; c = R[i + 1][k1]; d = R[i + 1][k];
        dy = b[1] - a[1]; dz = b[2] - a[2];
        if (Math.abs(dy) + Math.abs(dz) < 1e-6) continue;
        e = [0, dz, -dy];
        triN(B.paint, a, b, c, e); triN(B.paint, a, c, d, e);
      }
    for (k = 1; k + 1 < n; k++) {
      triN(B.paint, R[0][0], R[0][k], R[0][k + 1], [-1, 0, 0]);
      triN(B.paint, R[R.length - 1][0], R[R.length - 1][k], R[R.length - 1][k + 1], [1, 0, 0]);
    }

    for (p = -1; p <= 1; p += 2) {
      /* fender shelf a step below the deck, its rolled outer lip; the rear fender end */
      sbox(B.paint, -3.32, 2.10, 1.04, FW, FEN - 0.03, FEN, p);
      sbox(B.paint, -3.32, 2.10, FW - 0.03, FW, FEN - 0.08, FEN + 0.01, p);
      sbox(B.paint, -3.36, -3.32, 1.04, FW, FEN - 0.24, FEN + 0.01, p);
      sbox(B.rubber, -3.37, -3.35, 1.10, FW - 0.02, 0.62, FEN - 0.22, p);   /* rear mud flap */
      /* inner track guard under the shelf */
      sbox(B.dark, -2.9, 2.10, 1.04, 1.08, 0.98, FEN - 0.03, p);
      /* the front wing and its four ribs (P1, P3) */
      var L = WING.map(function (W) { return wingArc(W, p); });
      shell(B.paint, L, 0.03, function (k) { return [WING[k][0], p * 1.30, WING[k][1] - 0.45]; });
      for (j = 1; j <= 4; j++) {
        var ti = [0.22, 0.42, 0.60, 0.78][j - 1], RB = [];
        for (k = 0; k < WING.length - 1; k++) {
          var A1 = wingArc(WING[k], p), A2 = wingArc(WING[k + 1], p), m = Math.round(ti * 7);
          var P1 = A1[m], P2 = A2[m];
          cyl(B.paint, [P1[0], P1[1], P1[2] + 0.005], [P2[0], P2[1], P2[2] + 0.005], 0.02, 0.02, 4);
        }
      }
      /* the wing's stay to the glacis and a hinge bracket */
      box(B.dark, 2.62, 2.70, p > 0 ? 1.00 : -1.10, p > 0 ? 1.10 : -1.00, 1.04, 1.15);
    }

    /* --- the gills: four spring-loaded screens a side, hinged at their front edge on the
       fender edge and swung out in the combat position (P1, P2, ru Wikipedia) ---------- */
    var GX = [2.10, 0.84, -0.42, -1.68], GL = 1.04, GZ0 = 0.48, GZ1 = FEN - 0.02, th = V.gills;
    for (p = -1; p <= 1; p += 2) {
      for (i = 0; i < GX.length; i++) {
        var u = [-Math.cos(th), p * Math.sin(th), 0], nrm = [Math.sin(th), p * Math.cos(th), 0];
        var hx = GX[i], hy = p * (FW + 0.02), cx0 = hx + u[0] * GL / 2, cy0 = hy + u[1] * GL / 2, zc = (GZ0 + GZ1) / 2;
        slab(B.paint, [cx0, cy0, zc], u, [0, 0, 1], nrm, GL / 2, (GZ1 - GZ0) / 2, 0.008);
        /* three vertical ribs and a bottom rib on the outer face (P1) */
        for (j = 0; j < 3; j++) {
          var f = 0.25 + j * 0.25;
          slab(B.paint, [hx + u[0] * GL * f + nrm[0] * 0.016, hy + u[1] * GL * f + nrm[1] * 0.016, zc + 0.02], u, [0, 0, 1], nrm, 0.014, (GZ1 - GZ0) / 2 - 0.10, 0.009);
        }
        slab(B.paint, [cx0 + nrm[0] * 0.016, cy0 + nrm[1] * 0.016, GZ0 + 0.05], u, [0, 0, 1], nrm, GL / 2 - 0.06, 0.012, 0.009);
        /* the front screen carries a rubber strip below it (P1) */
        if (i === 0) slab(B.rubber, [cx0, cy0, GZ0 - 0.11], u, [0, 0, 1], nrm, GL / 2 - 0.02, 0.11, 0.007);
        /* hinge post and the retaining cable to the fender */
        box(B.dark, hx - 0.03, hx + 0.03, hy - 0.03, hy + 0.03, GZ0 + 0.10, GZ1 + 0.02);
        cyl(B.dark, [hx + u[0] * GL * 0.9, hy + u[1] * GL * 0.9, GZ1 - 0.04], [hx - GL * 0.95, p * (FW - 0.01), FEN - 0.03], 0.007, 0.007, 4);
      }
    }

    /* --- glacis ----------------------------------------------------------------- */
    var ang = Math.atan(0.404), gu = [Math.cos(ang), 0, -Math.sin(ang)], gw = [Math.sin(ang), 0, Math.cos(ang)];
    /* the glacis weld line, driver's vision block at the top centre, his hatch behind */
    slab(B.dark, [2.70, 0, glacisZ(2.70) + 0.005], gu, [0, 1, 0], gw, 0.010, 0.98, 0.005);
    slab(B.paint, [2.22, 0, glacisZ(2.22) + 0.05], gu, [0, 1, 0], gw, 0.10, 0.17, 0.05);
    slab(B.dark, [2.31, 0, glacisZ(2.31) + 0.07], gu, [0, 1, 0], gw, 0.015, 0.13, 0.03);
    cylZ(B.paint, 1.82, 0.0, DECK, DECK + 0.06, 0.25, 18);
    cylZ(B.dark, 1.82, 0.0, DECK + 0.06, DECK + 0.08, 0.20, 14);
    box(B.dark, 1.76, 1.88, -0.32, -0.24, DECK + 0.02, DECK + 0.10);
    /* the row of KMT-6 plough lugs across the nose (P3) */
    for (i = -4; i <= 4; i++) {
      if (i === 0) continue;
      slab(B.dark, [3.13, i * 0.21, glacisZ(3.13) + 0.04], gu, [0, 1, 0], gw, 0.09, 0.025, 0.04);
    }
    /* headlamps in their guards on the glacis corners (P3) */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.dark, [2.36, s * 0.90, glacisZ(2.36) + 0.10], [2.47, s * 0.90, glacisZ(2.36) + 0.095], 0.07, 0.07, 10);
      box(B.paint, 2.26, 2.33, s * 0.90 - 0.11, s * 0.90 + 0.11, glacisZ(2.30), glacisZ(2.30) + 0.20);
      box(B.paint, 2.30, 2.50, s * 0.90 + (s > 0 ? 0.10 : -0.12), s * 0.90 + (s > 0 ? 0.12 : -0.10), glacisZ(2.45), glacisZ(2.33) + 0.18);
    }
    /* lower glacis: the dozer blade with its stiffeners, and the nose tow hooks (P3, ru Wikipedia) */
    var la = Math.atan2(3.27 - 2.78, 0.86 - 0.50), lu = [Math.sin(la), 0, Math.cos(la)], lw = [Math.cos(la), 0, -Math.sin(la)];
    slab(B.paint, [3.07, 0, 0.66], lu, [0, 1, 0], lw, 0.17, 0.96, 0.03);
    for (i = -3; i <= 3; i++) slab(B.dark, [3.09, i * 0.30, 0.67], lu, [0, 1, 0], lw, 0.14, 0.02, 0.045);
    for (s = -1; s <= 1; s += 2) box(B.dark, 3.22, 3.34, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.78, 0.90);

    /* --- fender boxes (P4): three long boxes along each fender top, the outer top edge
       chamfered; on the left rear a louvred box; on the right the boxes run to the stern */
    var FB = [[1.98, 0.92], [0.84, -0.86], [-0.94, -2.52]];
    for (p = -1; p <= 1; p += 2) {
      for (i = 0; i < FB.length; i++) {
        var xa = FB[i][0], xb = FB[i][1], yi = p * 1.17, yo = p * 1.64, ym = p * 1.56;
        hexa(B.paint, [[xb, yi, FEN], [xa, yi, FEN], [xa, yo, FEN], [xb, yo, FEN],
                       [xb, yi, FEN + 0.22], [xa, yi, FEN + 0.22], [xa, ym, FEN + 0.22], [xb, ym, FEN + 0.22]]);
        sbox(B.dark, xb + 0.06, xb + 0.10, 1.20, 1.60, FEN + 0.22, FEN + 0.23, p);
        sbox(B.dark, xa - 0.10, xa - 0.06, 1.20, 1.60, FEN + 0.22, FEN + 0.23, p);
        sbox(B.dark, (xa + xb) / 2 - 0.08, (xa + xb) / 2 + 0.08, 1.645, 1.66, FEN + 0.08, FEN + 0.14, p);
      }
    }
    /* left rear: the louvred box over the rear of the fender (P4) */
    box(B.paint, -3.22, -2.62, 1.16, 1.64, FEN, FEN + 0.20);
    for (i = 0; i < 6; i++) box(B.dark, -3.16 + i * 0.09, -3.12 + i * 0.09, 1.20, 1.60, FEN + 0.20, FEN + 0.215);
    /* right rear: a shorter box */
    box(B.paint, -3.22, -2.62, -1.64, -1.17, FEN, FEN + 0.20);

    /* --- engine deck: the louvred grille across the rear edge, access plates (P4) ------- */
    box(B.dark, -3.24, -2.90, -1.00, 1.00, DECK - 0.01, DECK + 0.015);
    for (i = 0; i < 5; i++) box(B.paint, -3.22 + i * 0.07, -3.19 + i * 0.07, -0.98, 0.98, DECK + 0.015, DECK + 0.04);
    box(B.paint, -2.80, -1.70, -0.75, 0.75, DECK, DECK + 0.035);
    box(B.dark, -2.78, -1.72, -0.02, 0.02, DECK + 0.035, DECK + 0.045);
    box(B.paint, -1.62, -1.38, -0.55, 0.55, DECK, DECK + 0.03);
    for (s = -1; s <= 1; s += 2) {
      /* the curved stowage hooks along the rear deck (P4) */
      for (i = 0; i < 2; i++) {
        var hy0 = s * (0.35 + i * 0.45);
        box(B.dark, -2.92, -2.84, hy0 - 0.02, hy0 + 0.02, DECK, DECK + 0.12);
        box(B.dark, -2.98, -2.84, hy0 - 0.02, hy0 + 0.02, DECK + 0.10, DECK + 0.13);
      }
    }
    box(B.team, -2.60, -1.90, -0.12, 0.12, DECK + 0.035, DECK + 0.05);
    box(B.team, 0.95, 1.60, -1.55, -1.25, FEN + 0.22, FEN + 0.235);
    /* stern: tow hooks and the rear lights */
    box(B.dark, -3.36, -3.26, 0.62, 0.78, 0.64, 0.76);
    box(B.dark, -3.36, -3.26, -0.78, -0.62, 0.64, 0.76);
    box(B.dark, -3.30, -3.26, 0.84, 0.96, 1.22, 1.30);
    box(B.dark, -3.30, -3.26, -0.96, -0.84, 1.22, 1.30);
  }

  /* ------------------------------------------------------------ running gear */
  function hull2(P) {                                   /* convex hull of 2D points, CCW */
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }
  function addRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts, j, an;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.04]);
    C.push([IDL.x, IDL.z, IDL.r + 0.04], [SPR.x, SPR.z, SPR.r + 0.04]);
    for (i = 0; i < XR.length; i++) C.push([XR[i], ZR, RR + 0.04]);
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
    /* the T-64's short-pitch track with rubber-metal hinges (P1): a link every 0.17 m */
    cnt = Math.round(tot / 0.17); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW + 0.02, y + TW - 0.02, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the link with its grouser bar, the pin ends standing proud at both edges, and the
           centre guide horn running between the twin road-wheel discs */
        belt(B.dark, px - dx * 0.055, pz - dz * 0.055, px + dx * 0.055, pz + dz * 0.055, y - TW - 0.025, y + TW + 0.025, 0.075);
        if (k % 2 === 0) belt(B.dark, px - dx * 0.03 + dz * 0.06, pz - dz * 0.03 - dx * 0.06, px + dx * 0.03 + dz * 0.06, pz + dz * 0.03 - dx * 0.06, y - 0.02, y + 0.02, 0.05);
      }
      /* rear drive sprocket with its toothed rings, front idler, four return rollers */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r, 18);
      for (j = 0; j < 12; j++) {
        an = (j + 0.5) / 12 * TAU;
        box(B.dark, SPR.x + Math.cos(an) * (SPR.r + 0.02) - 0.03, SPR.x + Math.cos(an) * (SPR.r + 0.02) + 0.03,
            y + s * 0.10 - 0.025, y + s * 0.10 + 0.025, SPR.z + Math.sin(an) * (SPR.r + 0.02) - 0.03, SPR.z + Math.sin(an) * (SPR.r + 0.02) + 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.26, SPR.z, 0.19, 12);
      cylY(B.dark, SPR.x, y + s * 0.26, y + s * 0.30, SPR.z, 0.07, 8);
      cylY(B.paint, IDL.x, y - 0.21, y + 0.21, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.20, y + s * 0.27, IDL.z, 0.10, 10);
      box(B.dark, IDL.x - 0.26, IDL.x, y + s * 0.27 - 0.03, y + s * 0.27 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
      for (i = 0; i < XR.length; i++) {
        cylY(B.dark, XR[i], y - 0.16, y + 0.16, ZR, RR, 10);
        cylY(B.paint, XR[i], y + s * 0.15, y + s * 0.20, ZR, 0.045, 8);
      }
    }
  }

  /* road wheel (P1, P3): no rubber tyre - a dark steel rim (the internal shock absorption
     sits inside it), the dished aluminium disc with a ring of ten holes, the hub cap; two
     discs a side with the gap for the guide horn */
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIM = [0.15, 0.155, 0.15], HOLE = [0.05, 0.05, 0.045];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = RIM;
      cylY(W, 0, y - 0.27, y - 0.04, 0, RW, 18);
      cylY(W, 0, y + 0.04, y + 0.27, 0, RW, 18);
      W.col = BODY;
      cyl(W, [0, y + s * 0.27, 0], [0, y + s * 0.295, 0], 0.235, 0.15, 18);
      cylY(W, 0, y + s * 0.29, y + s * 0.315, 0, 0.085, 10);
      W.col = HOLE;
      for (i = 0; i < 10; i++) {
        a = (i + 0.5) / 10 * TAU;
        blk(W, [Math.cos(a) * 0.165, y + s * 0.279, Math.sin(a) * 0.165], [Math.cos(a), 0, Math.sin(a)], [-Math.sin(a), 0, Math.cos(a)], [0, s, 0], 0.024, 0.024, 0.008);
      }
      W.col = RIM;
      cylY(W, 0, y + s * 0.31, y + s * 0.33, 0, 0.04, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the cast T-64A turret (P2, D1): near-vertical lower sides, a rounded shoulder and a low
     flat roof; plan radii AF forward, AR aft, AY across, an ellipse at the front (the
     cheeks taper to the gun) and fuller at the rear; "drop" lowers the front */
  var PROF = [[1.00, 0.00], [1.025, 0.08], [1.03, 0.25], [1.01, 0.38], [0.96, 0.47], [0.86, 0.54],
              [0.66, 0.585], [0.36, 0.60], [0.0, 0.60]];
  function domeAt(D, a, rf, hz) {
    var c = Math.cos(a), s = Math.sin(a), cf = Math.max(c, 0);
    var pf = c >= 0 ? 2 / 2.0 : 2 / 2.5;
    var sx = (c >= 0 ? D.AF : D.AR) * rf * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), pf);
    var sy = D.AY * rf * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), pf);
    var z = 0.02 + hz * (D.H / 0.60) * (1 - D.drop * cf * cf);
    return [sx, sy, z];
  }
  function addDome(B, D) {
    var NS = 48, G = [], rI, j, V = [], Nacc = [], tris = [], ctr = [0, 0, 0.05];
    for (rI = 0; rI < PROF.length; rI++) {
      G.push([]);
      for (j = 0; j < NS; j++) { G[rI].push(V.length); V.push(domeAt(D, j / NS * TAU, PROF[rI][0], PROF[rI][1])); Nacc.push([0, 0, 0]); }
    }
    function face(a, b, d) {
      var n = cross(sub(V[b], V[a]), sub(V[d], V[a])), m = [(V[a][0] + V[b][0] + V[d][0]) / 3 - ctr[0], (V[a][1] + V[b][1] + V[d][1]) / 3, (V[a][2] + V[b][2] + V[d][2]) / 3 - ctr[2]];
      if (dot(n, m) < 0) { var t = b; b = d; d = t; n = [-n[0], -n[1], -n[2]]; }
      n = unit(n);
      [a, b, d].forEach(function (i) { Nacc[i][0] += n[0]; Nacc[i][1] += n[1]; Nacc[i][2] += n[2]; });
      tris.push([a, b, d]);
    }
    for (rI = 0; rI + 1 < PROF.length; rI++)
      for (j = 0; j < NS; j++) {
        var j1 = (j + 1) % NS;
        face(G[rI][j], G[rI][j1], G[rI + 1][j1]); face(G[rI][j], G[rI + 1][j1], G[rI + 1][j]);
      }
    var NN = Nacc.map(unit);
    tris.forEach(function (t) {
      var A = V[t[0]], Bv = V[t[1]], Cv = V[t[2]];
      if (cross(sub(Bv, A), sub(Cv, A)).every(function (q) { return Math.abs(q) < 1e-9; })) return;
      B.paint.tri(A, Bv, Cv, NN[t[0]], NN[t[1]], NN[t[2]]);
    });
  }
  function onDome(D, a, rf, hz, dr) {
    var P = domeAt(D, a, rf, hz), l = Math.sqrt(P[0] * P[0] + P[1] * P[1]) || 1;
    return [P[0] + P[0] / l * dr, P[1] + P[1] / l * dr, P[2]];
  }

  /* the 2A26 (D1, P1, P3): canvas mantlet cover, thermal sleeve with three clamp bands,
     the bore evacuator 1.6-2.4 m behind the muzzle, the plain muzzle tube.  Muzzle at
     5.955 m in model space: 9.225 m gun forward over the 6.54 m hull. */
  var MUZ = 5.955 - TX;
  function addGun(B, GZ, x0) {
    var M = MUZ;
    cylX(B.rubber, x0 - 0.22, x0 + 0.06, 0, GZ, 0.33, 0.24, 16);
    cylX(B.rubber, x0 + 0.06, x0 + 0.20, 0, GZ, 0.24, 0.15, 14);
    box(B.rubber, x0 - 0.20, x0 + 0.02, -0.26, 0.26, GZ - 0.29, GZ - 0.10);
    cylX(B.paint, x0 + 0.10, M - 2.40, 0, GZ, 0.118, 0.110, 16);
    cylX(B.dark, M - 4.10, M - 4.04, 0, GZ, 0.124, 0.124, 14);
    cylX(B.dark, M - 3.30, M - 3.24, 0, GZ, 0.120, 0.120, 14);
    cylX(B.dark, M - 2.52, M - 2.46, 0, GZ, 0.118, 0.118, 14);
    cylX(B.paint, M - 2.40, M - 2.30, 0, GZ, 0.105, 0.132, 16);
    cylX(B.paint, M - 2.30, M - 1.70, 0, GZ, 0.132, 0.132, 16);
    cylX(B.paint, M - 1.70, M - 1.60, 0, GZ, 0.132, 0.085, 16);
    cylX(B.paint, M - 1.60, M, 0, GZ, 0.082, 0.076, 14);
    cylX(B.dark, M - 0.08, M, 0, GZ, 0.079, 0.079, 14);
    /* coaxial PKT port, right of the gun in the cover */
    cylX(B.dark, x0 - 0.10, x0 + 0.14, -0.25, GZ - 0.06, 0.022, 0.022, 8);
  }
  /* commander's cupola with the TKN-3 head, the OU-3GK lamp and the remote NSVT (P1, P3) */
  function cupola(B, CX, CY, RZ, aa) {
    var i, a;
    cylZ(B.paint, CX, CY, RZ - 0.06, RZ + 0.06, 0.34, 22);
    for (i = 0; i < 5; i++) {
      a = i * TAU / 5 + 2.2;
      box(B.dark, CX + Math.cos(a) * 0.33 - 0.035, CX + Math.cos(a) * 0.33 + 0.035,
          CY + Math.sin(a) * 0.33 - 0.035, CY + Math.sin(a) * 0.33 + 0.035, RZ + 0.0, RZ + 0.08);
    }
    cylZ(B.paint, CX, CY, RZ + 0.06, RZ + 0.13, 0.27, 18);
    box(B.paint, CX + 0.10, CX + 0.32, CY - 0.11, CY + 0.11, RZ + 0.06, RZ + 0.24);
    box(B.dark, CX + 0.32, CX + 0.335, CY - 0.08, CY + 0.08, RZ + 0.12, RZ + 0.21);
    cylX(B.paint, CX + 0.20, CX + 0.40, CY + 0.17, RZ + 0.30, 0.085, 0.085, 12);
    cylX(B.dark, CX + 0.40, CX + 0.41, CY + 0.17, RZ + 0.30, 0.07, 0.07, 12);
    box(B.dark, CX + 0.24, CX + 0.30, CY + 0.12, CY + 0.18, RZ + 0.13, RZ + 0.24);
    if (aa) {
      /* the remote mount (P3): a frame on the rear of the cupola carrying the cradle above
         the hatch, the ammunition box on its left, the 12.7 mm NSVT pointing forward */
      box(B.paint, CX - 0.30, CX - 0.12, CY - 0.16, CY + 0.16, RZ + 0.10, RZ + 0.40);
      box(B.paint, CX - 0.28, CX + 0.18, CY - 0.09, CY + 0.09, RZ + 0.40, RZ + 0.52);
      box(B.paint, CX - 0.24, CX + 0.06, CY + 0.09, CY + 0.25, RZ + 0.36, RZ + 0.56);
      box(B.dark, CX - 0.12, CX + 0.10, CY - 0.16, CY - 0.09, RZ + 0.42, RZ + 0.50);
      cylX(B.dark, CX + 0.18, CX + 1.12, CY, RZ + 0.47, 0.022, 0.020, 8);
      cylX(B.dark, CX + 0.40, CX + 0.66, CY, RZ + 0.47, 0.034, 0.034, 8);
      cylX(B.dark, CX + 1.06, CX + 1.14, CY, RZ + 0.47, 0.03, 0.03, 8);
    }
  }

  function turretT64(V, B) {
    var D = V.dome, H = D.H + 0.02, GZ = 0.32, s, i, a, P, Q, x;
    addDome(B, D);
    addGun(B, GZ, D.AF - 0.06);
    /* the L-2G infra-red searchlight in its cradle LEFT of the gun (P3) */
    P = onDome(D, 0.50, 1.0, 0.40, 0.10);
    cylX(B.paint, P[0] - 0.14, P[0] + 0.18, P[1], GZ + 0.10, 0.19, 0.19, 18);
    cylX(B.dark, P[0] + 0.18, P[0] + 0.20, P[1], GZ + 0.10, 0.165, 0.165, 18);
    box(B.dark, P[0] - 0.20, P[0] - 0.02, P[1] - 0.05, P[1] + 0.05, GZ - 0.12, GZ - 0.06);
    box(B.paint, P[0] - 0.24, P[0] - 0.10, P[1] - 0.12, P[1] + 0.12, GZ - 0.10, GZ + 0.04);
    /* TPD-2-49 sight head on the left of the roof, its window forward */
    box(B.paint, 0.44, 0.80, 0.30, 0.60, H - 0.16, H + 0.12);
    box(B.dark, 0.80, 0.83, 0.34, 0.56, H - 0.06, H + 0.07);
    box(B.paint, 0.74, 0.90, 0.30, 0.60, H + 0.08, H + 0.12);
    /* the armoured housing of the rangefinder's right-hand window on the right shoulder,
       the window at its forward end (P2, ru Wikipedia) */
    P = onDome(D, -1.18, 0.95, 0.40, -0.04);
    Q = onDome(D, -1.38, 0.95, 0.40, -0.04);
    var hu = unit([P[0] - Q[0], P[1] - Q[1], 0]), hn = [hu[1], -hu[0], 0];
    if (hn[1] > 0) hn = [-hn[0], -hn[1], 0];
    slab(B.paint, [(P[0] + Q[0]) / 2 + hn[0] * 0.06, (P[1] + Q[1]) / 2 + hn[1] * 0.06, P[2] + 0.04], hu, hn, [0, 0, 1], 0.20, 0.10, 0.09);
    slab(B.dark, [(P[0] + Q[0]) / 2 + hu[0] * 0.205 + hn[0] * 0.07, (P[1] + Q[1]) / 2 + hu[1] * 0.205 + hn[1] * 0.07, P[2] + 0.05], hu, hn, [0, 0, 1], 0.008, 0.06, 0.05);
    /* hand rails along both turret sides (P2) */
    for (s = -1; s <= 1; s += 2) {
      var RA = [s * 1.05, s * 1.45, s * 1.85, s * 2.25], pts = [];
      for (i = 0; i < RA.length; i++) pts.push(onDome(D, RA[i], 1.0, 0.30, 0.07));
      for (i = 0; i + 1 < pts.length; i++) cyl(B.dark, pts[i], pts[i + 1], 0.016, 0.016, 5);
      for (i = 0; i < pts.length; i++) {
        Q = onDome(D, RA[i], 1.0, 0.30, -0.02);
        cyl(B.dark, Q, pts[i], 0.014, 0.014, 4);
      }
    }
    /* commander's cupola right rear (P1, P2, P3) */
    cupola(B, -0.38, -0.52, H - 0.03, V.aaMg);
    /* gunner's hatch left, with its periscope */
    cylZ(B.paint, -0.24, 0.52, H - 0.06, H + 0.03, 0.26, 18);
    cylZ(B.paint, -0.24, 0.52, H + 0.03, H + 0.05, 0.21, 14);
    box(B.dark, 0.06, 0.16, 0.44, 0.60, H - 0.02, H + 0.05);
    /* roof ventilator and the antenna base on the left rear (P1, P2) */
    cylZ(B.paint, 0.20, -0.05, H - 0.03, H + 0.05, 0.11, 10);
    cylZ(B.dark, -0.82, 0.72, H - 0.12, H + 0.02, 0.05, 8);
    cylZ(B.dark, -0.82, 0.72, H + 0.02, H + 0.62, 0.008, 4);
    /* stowage boxes on the rear quarters (P2) */
    for (s = -1; s <= 1; s += 2) {
      P = onDome(D, s * 2.55, 1.0, 0.25, 0.10);
      var bu = unit([-P[1] * s, P[0] * s, 0]);
      if (bu[0] > 0) bu = [-bu[0], -bu[1], 0];
      blk(B.paint, [P[0], P[1], 0.24], bu, unit([P[0], P[1], 0]), [0, 0, 1], 0.30, 0.13, 0.15);
    }
    /* the OPVT snorkel stowed across the turret rear on two brackets (P4) */
    if (V.snorkel) {
      /* it rides high, its top above the roof line (P4: Suvorov (4) and (5)) */
      x = -D.AR - 0.10;
      cylY(B.paint, x, -1.18, 0.30, 0.50, 0.15, 16);
      cylY(B.paint, x, 0.30, 1.05, 0.50, 0.135, 16);
      cylY(B.dark, x, 0.27, 0.33, 0.50, 0.158, 16);
      cylY(B.dark, x, -1.20, -1.16, 0.50, 0.155, 16);
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, x - 0.02, x + 0.34, s * 0.55 - 0.03, s * 0.55 + 0.03, 0.16, 0.26);
        box(B.dark, x - 0.04, x + 0.04, s * 0.55 - 0.03, s * 0.55 + 0.03, 0.16, 0.37);
      }
    }
    box(B.team, -1.02, -0.62, -0.12, 0.12, H - 0.02, H + 0.01);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A, T = materials(THREE, C, V), g = new THREE.Group();
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
    turretT64(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of the build (models3d convention); published 9.225 m gun forward */
UNIT_MODELS["pact_e60_t64a"] = {
  len: 9.33,
  build: function (THREE, M, C) { return HeroT64.build(THREE, M, C, "A"); }
};
