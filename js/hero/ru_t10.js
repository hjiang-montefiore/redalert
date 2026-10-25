/* ============ ru_t10.js - HERO models: the T-10 heavy tank family ============
   The last Soviet heavy tank, in the two guises the era tables ask for:
     pact_e50_heavy   T-10 (Object 730)    1953   122 mm D-25TA, double-baffle brake, no
                                                  ejector, 2 x 12.7 mm DShKM, no IR
     pact_e60_heavy   T-10M (Object 272)   1957   122 mm M-62-T2 (2A17), ejector and
                                                  multi-baffle brake, 2 x 14.5 mm KPVT, IR
   One builder, a VARIANTS table; build() takes the row name.  HeroT10 is kept as the name.

   REDO 2026-10-24 (full-quality procedure).  References, Wikimedia Commons at width 960,
   cached in scratchpad/q_t10_ref:
     D1  "Tes3&t10m.png" - a T-10M side elevation drawn beside the TES-3 (port side): seven
         road wheels, three return rollers, front idler, rear sprocket, the fender line,
         the stowage boxes on the upper hull side, the low saucer turret (its cylindrical
         tank on the rear sponson is NOT on the museum tanks, see P1-P3, and is not drawn).
         Scaled to the published 7.41 m hull (0.0144 m a px).
     P1  "T-10 Heavy Tank (23752171808).jpg" - the Kubinka T-10 (1953 gun), starboard
         front 3/4: the plain tapered tube with NO ejector and the box-like double-baffle
         brake with two big windows a side, the DShK on its post over the loader's hatch
         at the right rear of the roof, the tow cable on the upper hull side, the long
         flat fenders with boxes, the seven wheel pairs.
     P2  "T-10M Heavy Tank (37573039866).jpg" - the Kubinka T-10M, starboard front 3/4:
         the ejector part way down the tube, the ribbed multi-baffle brake, the round IR
         searchlight drum on the right of the mantlet, the IR lamp on the commander's
         cupola, the tow cable.
     P3  "T10-M in the Kubinka Museum 01.jpg" / "...02.jpg" - the same tank from the port
         and starboard front: the pike nose, the big ribbed box mudguards with rubber
         flaps, the headlamp in its wire guard on the LEFT front of the glacis, the empty
         AA cradle on the right rear of the roof, the cupola on the left.
     P4  "Soviet and Russian vehicles in Kubinka tank museum 167.jpg" - the T-10M head-on:
         the pike glacis, the mudguards, the IR drum right of the gun, the lamp left.
     P5  "T-10 tank.jpg", "Heavy tank T-10 turret.jpg", "T-10 Kiyv 1/2.jpg", "Soviet heavy
         tank T10 ... Kiev" - the Kyiv T-10M (the plaque says T-10 "1955"; the gun is the
         M-62-T2): the saucer turret's undercut foot, the mantlet, the IR drum right of the
         gun, the cupola with the OU-3 lamp, the boxes on the front fenders, the ejector and
         brake proportions.
     P6  "Panzermuseum Munster 2010 0333.JPG" - a museum scale model of the T-10 from above
         (plan only): the egg-shaped turret, narrow at the front, the louvred engine deck
         (its cylindrical rear tanks are not on the museum tanks either: not drawn).
   Published (ru.wikipedia T-10, from Pavlov et al. 2009): length gun forward 9.715 m (T-10),
   10.56 m (T-10M); hull 7.41 m (en.wikipedia); width 3.518 m; height 2.46 m (T-10), 2.585 m
   (T-10M); track centres 2.66 m; base 4.55 m; ground clearance 0.456 / 0.46 m; track
   720 mm, 160 mm pitch; seven double road wheels with metal rims and three return rollers
   a side, rear drive sprockets; the "pike nose" glacis; upper hull sides sloped; the cast
   turret "like an upturned saucer"; the D-25TA with a two-chamber muzzle brake (the
   ejector came with the D-25TS of the T-10A, 1956); two DShKM (coaxial and AA) on the
   T-10, two KPVT on the T-10M; night sights for all crew but the loader on the T-10M.
   The brief's "fume extractor" for the 1953 T-10 is NOT drawn: ru.wikipedia dates the
   ejector to the T-10A, and P1 shows a plain tube.

   CORRECTIONS against the previous model (and its header):
   - the commander's cupola is on the LEFT and the loader's hatch with the AA gun on the
     RIGHT (P1, P3, P4, P5); the old model had them the other way round;
   - the T-10M's IR searchlight drum is on the RIGHT of the mantlet (P2, P4, P5), not the left;
   - the old r1/r2 photographs were starboard views, not "left side";
   - hull 7.41 m long (was 7.40, kept), the deck at 1.48 m, the wheels 0.55 m at 0.758 m
     pitch (base 4.55 m published; the old wheels were 0.68 m at 0.76 m), return rollers
     over the 2nd, 4th and 6th gaps (D1);
   - the upper hull sides slope in to the deck (ru.wikipedia, P1, P5), they were vertical;
   - the T-10M's IR fit is drawn as photographed (the IR drum, the lamp on the cupola);
     the T-10 has none of it; both carry the one guarded headlamp on the left of the glacis
     and the splash board across it (P1, P4);
   - the T-10M's cupola lamp and AA mount set its 2.585 m published height.

   Recognition list (what makes it read at game zoom, and its source):
     1. long low hull with the pike nose - the two upper glacis plates meeting in a ridge -
        and the sloped upper hull sides - P3, P4, P5, ru.wikipedia
     2. seven wheel pairs a side with three return rollers, front idler, rear sprocket,
        the wide 720 mm track - D1, P1, P2
     3. the big ribbed box mudguards at the front with their rubber flaps - P3, P4, P5
     4. long flat fenders with stowage boxes; boxes on the front fenders - D1, P1, P5
     5. the low cast "upturned saucer" turret, narrow at the front, undercut at the foot -
        P1, P5, P6
     6. T-10: the plain tapered 122 mm tube and the box double-baffle brake - P1
        T-10M: the longer tube with the ejector and the ribbed multi-baffle brake - P2, P5
     7. the AA machine gun over the loader's hatch at the right rear of the roof (DShK on
        the T-10, KPVT on the T-10M) - P1, D1, ru.wikipedia
     8. the commander's cupola at the left rear; on the T-10M the IR lamp on it - P2, P5
     9. T-10M: the IR searchlight drum right of the mantlet - P2, P4, P5
    10. tow cables slung along the upper hull sides - P1, P2, P3
    11. the row of flat box tanks with sloped faces along the rear sponsons, and the
        spoked road wheels - P1, P2, P3 (crops of the rear hull)
   Paint: Soviet green as photographed (P1 lit #676d4e, shade #585e48; P2 #747849), taken
   to about 0.8 of level for the ACES pass -> base #505a38.  No numbers, stars, museum
   stripes or emblems (P5 carries the Kyiv museum's white edging: not drawn).
   NOT CONFIRMED, judgement calls: the number and size of the side boxes (D1, P1-P3: three
   box tanks on each rear sponson, then four boxes and a lidded box on the front fender); the engine deck louvres; the T-10's headlamp (drawn on the
   left front as on the T-10M, P3); the turret's plan (P6 model, P1/P5 3/4 views; 3.1 m
   long, 2.4 m wide); the spoke count (twelve; the photographs resolve the pattern, not the count); the coaxial guns are short stubs
   in their ports.  NOT DRAWN: the snorkel, radio whips, unditching gear, spare links.

   Materials: PAINT (canvas texture: base, mottling, weld seams, cast texture, grime; metre
   UVs), DARK (track, rims, fittings, guns' bores, lenses), WHEEL (discs, holes and rims by
   vertex colour) and the team colour exactly as handed in (C.team): two small plates
   (turret roof, rear deck).  Nodes: "turret" (trains; origin on the ring centre at the deck,
   gun along +X), seven "roadwheel" groups (axle along local Y, each holding both sides).
   Draw calls: hull 3 + turret 3 + 7 wheels = 13.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT10 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table
     dome: turret plan radii AF fore, AR aft, AY across, height H, front droop;
     muz: the muzzle, turret frame (the published length gun forward from the tail plate) */
  var XT = -3.70, NOSE = 3.71, TX = 0.50, DECK = 1.48;
  var VARIANTS = {
    T10:  { paint: { base: "#505a38", blots: ["#474f32", "#5a6441"], seed: 53 },
            dome: { AF: 1.55, AR: 1.52, AY: 1.20, H: 0.86, drop: 0.24 },
            muz: XT + 9.715 - TX, brake: "double", ir: false, mg: "dshk" },
    T10M: { paint: { base: "#505a38", blots: ["#474f32", "#5a6441"], seed: 57 },
            dome: { AF: 1.60, AR: 1.55, AY: 1.24, H: 0.90, drop: 0.24 },
            muz: XT + 10.56 - TX, brake: "multi", ir: true, mg: "kpvt" }
  };

  /* running gear (D1 scaled to the hull; published base 4.55 m, track centres 2.66 m,
     720 mm track, 550 mm wheels) */
  var TY = 1.33, TW = 0.36;
  var XW = [2.29, 1.53, 0.77, 0.02, -0.74, -1.50, -2.26], ZW = 0.36, RW = 0.275;
  var IDL = { x: 3.12, z: 0.62, r: 0.27 }, SPR = { x: -3.10, z: 0.62, r: 0.32 };
  var XROLL = [1.15, -0.37, -1.88], ZROLL = 0.78, RROLL = 0.13;
  var FZ = 1.06, FW = 1.76, WS = 1.62, WD = 1.20;   /* sponson / fender z, fender edge, slope foot, deck edge */

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
  /* a closed solid: the signed volume says whether the faces point out; they are turned if
     not.  Crease slits (zero-area faces) are dropped. */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c, n;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      n = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(n, n) < 1e-14) continue;
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
  /* a closed solid lofted through convex rings of [x, y, z] (same count); ends capped */
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
  /* ear clipping for the hull's end plates (the sponson makes them non-convex) */
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
  /* a hull skin through rings in the YZ plane (any order, same count), capped by ear clipping */
  function loftHull(bin, rings) {
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
  /* hull and turret paint: one tile is 1 / 0.34 = 2.9 m.  Base, soft mottling of the brushed
     green, the pitted cast texture of the turret and nose castings, weld seams with their
     bead highlight, rain streaks and grime (P1, P2, P5) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "p" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 16; i++) { q.globalAlpha = 0.30 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 900; i++) {               /* cast pitting */
        q.fillStyle = (i % 2) ? "rgba(20,22,14,0.10)" : "rgba(220,225,190,0.06)";
        q.fillRect(R() * S, R() * S, 1 + R() * 2, 1 + R() * 2);
      }
      for (i = 0; i < 6; i++) {                 /* weld seams / plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.32)";
        if (i % 2) q.fillRect(x, y, w, 3); else q.fillRect(x, y, 3, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 3, w, 1); else q.fillRect(x + 3, y, 1, w);
      }
      for (i = 0; i < 110; i++) {               /* grime and chipped wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 26; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), team: new Bin(T.team, false) }; }
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
  /* station table, measured off D1 (scaled to the 7.41 m hull) and the head-on P4:
     x, belly half width, belly z, lower side half width, sponson z, slope foot half width,
     deck edge half width, deck z, ridge z.  The lower sides stand inside the tracks; over
     the track the sponson floor runs out to the slope foot and the upper side plates lean
     in at about 45 deg to the deck (ru.wikipedia: upper sides sloped, lower sides bent).
     The nose is the "pike": in plan the hull closes to a point, and the two upper glacis
     plates meet in a ridge on the centre line (P3, P4). */
  var HS = [
    [-3.700, 0.90, 0.80, 0.92, 1.06, 1.62, 1.20, 1.38, 1.38],
    [-3.660, 0.90, 0.64, 0.92, 1.06, 1.62, 1.20, 1.45, 1.45],
    [-3.520, 0.90, 0.50, 0.92, 1.06, 1.62, 1.20, 1.48, 1.48],
    [-3.320, 0.90, 0.456, 0.92, 1.06, 1.62, 1.20, 1.48, 1.48],
    [ 0.000, 0.90, 0.456, 0.92, 1.06, 1.62, 1.20, 1.48, 1.48],
    [ 2.300, 0.90, 0.456, 0.92, 1.06, 1.62, 1.20, 1.48, 1.48],
    [ 2.700, 0.88, 0.456, 0.90, 1.04, 1.42, 1.02, 1.33, 1.37],
    [ 3.050, 0.80, 0.54, 0.82, 1.00, 1.10, 0.74, 1.17, 1.24],
    [ 3.380, 0.56, 0.70, 0.58, 0.96, 0.70, 0.42, 1.04, 1.10],
    [ 3.600, 0.28, 0.84, 0.30, 0.94, 0.34, 0.16, 0.97, 1.00],
    [ 3.710, 0.05, 0.90, 0.06, 0.92, 0.07, 0.03, 0.93, 0.94]
  ];
  function hullRing(S) {
    var x = S[0], P = [[S[1], S[2]], [S[3], S[4] - 0.012], [S[5], S[4]], [S[6], S[7]], [0, S[8]],
                       [-S[6], S[7]], [-S[5], S[4]], [-S[3], S[4] - 0.012], [-S[1], S[2]]];
    return P.map(function (p) { return [x, p[0], p[1]]; });
  }
  /* the deck height under the glacis, and the upper side plate's y at a height z */
  function deckZ(x) {
    var i, a, b, f;
    for (i = 0; i + 1 < HS.length; i++) {
      a = HS[i]; b = HS[i + 1];
      if (x <= b[0]) { f = (x - a[0]) / (b[0] - a[0] || 1); return a[8] + (b[8] - a[8]) * f; }
    }
    return HS[HS.length - 1][8];
  }
  function slopeY(z) { return WS - (z - FZ) / (DECK - FZ) * (WS - WD); }

  function addHull(B, V) {
    var i, k, p, x, y, z, yi, yo, ylo, yhi;
    loftHull(B.paint, HS.map(hullRing));

    for (p = -1; p <= 1; p += 2) {
      yi = p * WS; yo = p * FW; ylo = Math.min(yi, yo); yhi = Math.max(yi, yo);
      /* the fender shelf over the track and its turned-down outer edge (P1, P5) */
      box(B.paint, XT - 0.02, 2.96, ylo, yhi, FZ - 0.03, FZ);
      box(B.paint, XT - 0.02, 2.96, p > 0 ? FW - 0.025 : -FW, p > 0 ? FW : -FW + 0.025, FZ - 0.06, FZ + 0.01);
      /* the big box mudguard over the idler (P3, P4, P5): its top falls from the fender to
         the nose; deep side cheeks, ribs, and the rubber flap hanging from its front edge */
      var MG = [], yA = p * 0.96, yB = p * (FW + 0.005), ya = Math.min(yA, yB), yb = Math.max(yA, yB), tt;
      for (i = 0; i <= 6; i++) { tt = i / 6; MG.push([2.96 + 0.72 * tt, FZ + 0.01 - 0.10 * tt * tt]); }
      for (i = 0; i + 1 < MG.length; i++) {
        belt(B.paint, MG[i][0], MG[i][1], MG[i + 1][0], MG[i + 1][1], ya, yb, 0.035);
        belt(B.paint, MG[i][0], MG[i][1] - 0.20, MG[i + 1][0], MG[i + 1][1] - 0.20, p > 0 ? FW - 0.03 : -FW - 0.005, p > 0 ? FW + 0.005 : -FW + 0.03, 0.40);
        belt(B.paint, MG[i][0], MG[i][1] - 0.15, MG[i + 1][0], MG[i + 1][1] - 0.15, p > 0 ? 0.92 : -0.95, p > 0 ? 0.95 : -0.92, 0.30);
      }
      for (k = 0; k < 5; k++) {
        y = p * (1.04 + k * 0.165);
        for (i = 0; i + 1 < MG.length; i++) belt(B.paint, MG[i][0], MG[i][1] + 0.022, MG[i + 1][0], MG[i + 1][1] + 0.022, y - 0.022, y + 0.022, 0.035);
      }
      box(B.paint, 3.64, 3.70, p > 0 ? 0.92 : -FW - 0.005, p > 0 ? FW + 0.005 : -0.92, MG[6][1] - 0.40, MG[6][1] + 0.01);
      box(B.dark, 3.66, 3.69, ya + 0.02, yb - 0.02, 0.30, MG[6][1] - 0.38);
      /* the rear fender end, turned down */
      belt(B.paint, XT - 0.02, FZ, XT - 0.12, FZ - 0.18, ylo, yhi, 0.03);
      /* the joint strip where the upper side plate meets the sponson */
      box(B.dark, XT + 0.05, 2.30, p > 0 ? WS - 0.015 : -WS - 0.012, p > 0 ? WS + 0.012 : -WS + 0.015, FZ, FZ + 0.02);

      /* stowage boxes on the fender against the side plate, four a side (D1, P1), and the
         lidded box on each front fender (P5) */
      [[0.86, 1.47], [0.14, 0.75], [-0.82, -0.18], [-1.32, -0.88], [2.10, 2.88]].forEach(function (r, j) {
        var h = j === 4 ? 0.30 : 0.25, zt = FZ + h, yin = slopeY(zt) - 0.02, yout = FW - 0.04;
        box(B.paint, r[0], r[1], p > 0 ? yin : -yout, p > 0 ? yout : -yin, FZ, zt);
        box(B.paint, r[0] - 0.015, r[1] + 0.015, p > 0 ? yin : -yout - 0.015, p > 0 ? yout + 0.015 : -yin, zt - 0.035, zt);
        /* hasps */
        box(B.dark, (r[0] + r[1]) / 2 - 0.10, (r[0] + r[1]) / 2 - 0.06, p > 0 ? yout : -yout - 0.008, p > 0 ? yout + 0.008 : -yout, zt - 0.10, zt - 0.03);
        box(B.dark, (r[0] + r[1]) / 2 + 0.06, (r[0] + r[1]) / 2 + 0.10, p > 0 ? yout : -yout - 0.008, p > 0 ? yout + 0.008 : -yout, zt - 0.10, zt - 0.03);
      });
      /* the rear sponson's row of flat box tanks with sloped outer faces (P1, P2, P3 rear crops;
         D1's and P6's cylinders are not on the Kubinka tanks) */
      [[-3.56, -2.86], [-2.82, -2.12], [-2.08, -1.40]].forEach(function (r) {
        var zt = FZ + 0.28, yin = slopeY(zt) - 0.02, yo1 = FW - 0.03, yo2 = FW - 0.16, Q = [];
        [r[0], r[1]].forEach(function (xx) {
          Q.push([[xx, p * yin, FZ], [xx, p * yo1, FZ], [xx, p * yo1, FZ + 0.12], [xx, p * yo2, zt], [xx, p * yin, zt]]);
        });
        loftN(B.paint, Q);
        box(B.dark, (r[0] + r[1]) / 2 - 0.03, (r[0] + r[1]) / 2 + 0.03, p > 0 ? yin + 0.05 : -yo2 + 0.02, p > 0 ? yo2 - 0.02 : -yin - 0.05, zt, zt + 0.012);
      });

      /* the tow cable slung along the upper side plate (P1, P2, P3): eye at the front,
         a sag, and up to the hooks by the engine deck */
      var CP = [[2.25, 1.38], [1.40, 1.25], [0.40, 1.18], [-0.60, 1.20], [-1.40, 1.30]], c0, c1;
      for (i = 0; i + 1 < CP.length; i++) {
        c0 = [CP[i][0], p * (slopeY(CP[i][1]) + 0.035), CP[i][1]];
        c1 = [CP[i + 1][0], p * (slopeY(CP[i + 1][1]) + 0.035), CP[i + 1][1]];
        cyl(B.dark, c0, c1, 0.026, 0.026, 6, true);
      }
      c0 = [CP[0][0], p * (slopeY(CP[0][1]) + 0.035), CP[0][1]];
      cylY(B.dark, CP[0][0] + 0.06, c0[1] - 0.02, c0[1] + 0.02, CP[0][1], 0.06, 8);
    }

    /* --- glacis: the pike ridge weld, driver's hatch and periscope, tow hooks ---- */
    for (i = 0; i < 6; i++) {
      var xa = 2.30 + i * 0.235, xb = xa + 0.235;
      cyl(B.dark, [xa, 0, deckZ(xa) + 0.004], [xb, 0, deckZ(xb) + 0.004], 0.014, 0.014, 6, true);
    }
    z = deckZ(2.42);
    cylZ(B.paint, 2.12, 0, DECK - 0.02, DECK + 0.05, 0.30, 18);
    cylZ(B.paint, 2.12, 0, DECK + 0.05, DECK + 0.075, 0.24, 16);
    box(B.paint, 2.40, 2.56, -0.12, 0.12, z - 0.04, z + 0.07);
    box(B.dark, 2.56, 2.565, -0.10, 0.10, z, z + 0.05);
    for (p = -1; p <= 1; p += 2) {
      box(B.dark, 3.52, 3.70, p * 0.36 - 0.05, p * 0.36 + 0.05, 0.84, 0.92);
      box(B.dark, 3.64, 3.74, p * 0.36 - 0.05, p * 0.36 + 0.05, 0.76, 0.86);
      /* lifting eyes on the glacis */
      x = 2.95; z = deckZ(x);
      box(B.dark, x - 0.05, x + 0.05, p * 0.55 - 0.015, p * 0.55 + 0.015, z - 0.06, z + 0.05);
    }
    /* the headlamp in its wire guard on the left front of the glacis (P3, P4) */
    function lamp(px, py, guard) {
      var pz = deckZ(px) + 0.12;
      cyl(B.paint, [px - 0.10, py, pz], [px + 0.05, py, pz], 0.085, 0.095, 14);
      cyl(B.dark, [px + 0.05, py, pz], [px + 0.065, py, pz], 0.08, 0.08, 14);
      box(B.paint, px - 0.06, px - 0.02, py - 0.025, py + 0.025, pz - 0.15, pz - 0.06);
      if (guard) {
        var g = [[px + 0.13, py - 0.15, pz - 0.15], [px + 0.13, py - 0.15, pz + 0.13], [px + 0.13, py + 0.15, pz + 0.13], [px + 0.13, py + 0.15, pz - 0.15]], j;
        for (j = 0; j + 1 < g.length; j++) cyl(B.dark, g[j], g[j + 1], 0.012, 0.012, 5, true);
        cyl(B.dark, [px - 0.10, py - 0.15, pz + 0.13], g[1], 0.012, 0.012, 5, true);
        cyl(B.dark, [px - 0.10, py + 0.15, pz + 0.13], g[2], 0.012, 0.012, 5, true);
      }
    }
    lamp(2.40, 0.64, true);
    /* the splash board across the upper glacis, a chevron following the pike (P1, P4) */
    function glZ(x, y) {
      var i, a, b, f, zr, ze, w;
      for (i = 0; i + 1 < HS.length; i++) if (x <= HS[i + 1][0]) break;
      a = HS[i]; b = HS[Math.min(i + 1, HS.length - 1)]; f = (x - a[0]) / (b[0] - a[0] || 1);
      zr = a[8] + (b[8] - a[8]) * f; ze = a[7] + (b[7] - a[7]) * f; w = a[6] + (b[6] - a[6]) * f;
      return zr - (zr - ze) * Math.min(1, Math.abs(y) / (w || 1));
    }
    for (p = -1; p <= 1; p += 2) {
      for (i = 0; i < 4; i++) {
        var f0 = i / 4, f1 = (i + 1) / 4, xa0 = 2.95 - 0.33 * f0, xa1 = 2.95 - 0.33 * f1, ya0 = p * 0.92 * f0, ya1 = p * 0.92 * f1;
        var za0 = glZ(xa0, ya0), za1 = glZ(xa1, ya1), nx = -0.33, ny = -p * 0.92, nl = Math.sqrt(nx * nx + ny * ny), tx = -ny / nl * 0.008, ty2 = nx / nl * 0.008;
        hexa(B.paint, [[xa0 - tx, ya0 - ty2, za0 - 0.01], [xa1 - tx, ya1 - ty2, za1 - 0.01], [xa1 + tx, ya1 + ty2, za1 - 0.01], [xa0 + tx, ya0 + ty2, za0 - 0.01],
                       [xa0 - tx + 0.03, ya0 - ty2, za0 + 0.085], [xa1 - tx + 0.03, ya1 - ty2, za1 + 0.085], [xa1 + tx + 0.03, ya1 + ty2, za1 + 0.085], [xa0 + tx + 0.03, ya0 + ty2, za0 + 0.085]]);
      }
    }

    /* --- engine deck: louvred intakes either side, the radiator grille across the rear,
       the access plates (P6, D1) ---------------------------------------------------- */
    box(B.paint, -1.45, -0.95, -0.80, 0.80, DECK, DECK + 0.04);
    for (p = -1; p <= 1; p += 2) {
      box(B.dark, -3.05, -1.70, p > 0 ? 0.30 : -0.95, p > 0 ? 0.95 : -0.30, DECK - 0.01, DECK + 0.012);
      for (i = 0; i < 9; i++) box(B.paint, -3.02 + i * 0.145, -2.97 + i * 0.145, p > 0 ? 0.32 : -0.93, p > 0 ? 0.93 : -0.32, DECK + 0.012, DECK + 0.04);
    }
    box(B.paint, -3.05, -1.70, -0.20, 0.20, DECK, DECK + 0.05);
    box(B.dark, -3.62, -3.20, -0.95, 0.95, deckZ(-3.40) - 0.005, deckZ(-3.40) + 0.012);
    for (i = 0; i < 5; i++) box(B.paint, -3.60 + i * 0.085, -3.565 + i * 0.085, -0.93, 0.93, deckZ(-3.40) + 0.012, deckZ(-3.40) + 0.032);
    box(B.team, -2.80, -2.20, -0.13, 0.13, DECK + 0.05, DECK + 0.065);
    /* stern: exhaust louvres, tow hooks */
    box(B.dark, XT - 0.03, XT, -0.60, 0.60, 0.95, 1.20);
    for (p = -1; p <= 1; p += 2) {
      box(B.dark, XT - 0.12, XT, p * 0.70 - 0.07, p * 0.70 + 0.07, 0.70, 0.82);
      box(B.dark, XT - 0.16, XT - 0.10, p * 0.70 - 0.07, p * 0.70 + 0.07, 0.62, 0.74);
    }
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
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.04]);
    for (i = 0; i < XROLL.length; i++) C.push([XROLL[i], ZROLL, RROLL + 0.04]);
    C.push([IDL.x, IDL.z, IDL.r + 0.04], [SPR.x, SPR.z, SPR.r + 0.04]);
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
    /* the 160 mm small-link track (ru.wikipedia), drawn as every other link */
    cnt = Math.round(tot / 0.32); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.06);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        /* the link with its grouser, and the centre guide horn inside the run */
        belt(B.dark, px - dx * 0.07, pz - dz * 0.07, px + dx * 0.07, pz + dz * 0.07, y - TW - 0.01, y + TW + 0.01, 0.08);
        belt(B.dark, px - dx * 0.035 - dz * 0.085, pz - dz * 0.035 + dx * 0.085, px + dx * 0.035 - dz * 0.085, pz + dz * 0.035 + dx * 0.085, y - 0.03, y + 0.03, 0.07);
      }
      /* rear drive sprocket: the two toothed rings and the hub (D1, P1) */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 14; i++) {
        var ta = i / 14 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y - s * 0.14, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.05, 0.035, 0.035);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.01), y + s * 0.14, SPR.z + sa * (SPR.r - 0.01)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.05, 0.035, 0.035);
      }
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.27, SPR.z, 0.22, 16);
      for (i = 0; i < 8; i++) {
        var tb = i / 8 * TAU;
        cylY(B.dark, SPR.x + Math.cos(tb) * 0.15, y + s * 0.27, y + s * 0.29, SPR.z + Math.sin(tb) * 0.15, 0.025, 6);
      }
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.32, SPR.z, 0.08, 10);
      /* front idler: a double disc and its crank to the hull */
      cylY(B.paint, IDL.x, y - 0.24, y + 0.24, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y - 0.03, y + 0.03, IDL.z, IDL.r + 0.012, 18);
      cylY(B.dark, IDL.x, y + s * 0.24, y + s * 0.30, IDL.z, 0.10, 10);
      box(B.dark, IDL.x - 0.36, IDL.x, y + s * 0.32 - 0.035, y + s * 0.32 + 0.035, IDL.z - 0.045, IDL.z + 0.045);
      /* return rollers on their brackets (D1) */
      for (i = 0; i < XROLL.length; i++) {
        cylY(B.dark, XROLL[i], y - 0.20, y + 0.20, ZROLL, RROLL, 14);
        cylY(B.paint, XROLL[i], y + s * 0.20, y + s * 0.24, ZROLL, 0.07, 10);
        box(B.dark, XROLL[i] - 0.05, XROLL[i] + 0.05, s > 0 ? 0.92 : -1.13, s > 0 ? 1.13 : -0.92, ZROLL - 0.04, ZROLL + 0.04);
      }
      /* torsion arm hubs on the hull side, behind each wheel pair */
      for (i = 0; i < XW.length; i++) box(B.dark, XW[i] - 0.06, XW[i] + 0.20, s > 0 ? 0.92 : -1.02, s > 0 ? 1.02 : -0.92, ZW + 0.02, ZW + 0.10);
    }
  }

  /* road wheel pair (D1, P1, P2): two pressed steel discs with metal rims (ru.wikipedia:
     internal shock absorption, no rubber tyres), a spoked face (P1-P3), the hub */
  var RIM = [0.20, 0.21, 0.19], HOLE = [0.10, 0.11, 0.08];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.16, gg * 1.16, bb * 1.16];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = RIM;
      cylY(W, 0, y - 0.30, y - 0.20, 0, RW, 16);
      cylY(W, 0, y + 0.20, y + 0.30, 0, RW, 16);
      W.col = BODY;
      cylY(W, 0, y - 0.20, y + 0.20, 0, 0.22, 10);
      cyl(W, [0, y + s * 0.30, 0], [0, y + s * 0.325, 0], 0.255, 0.15, 16);
      cylY(W, 0, y + s * 0.32, y + s * 0.35, 0, 0.085, 10);
      /* the spoked face: twelve dark slots between twelve spokes (P1, P2 rear crops) */
      W.col = HOLE;
      for (i = 0; i < 12; i++) {
        a = (i + 0.5) / 12 * TAU;
        slab(W, [Math.cos(a) * 0.165, y + s * 0.31, Math.sin(a) * 0.165], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.065, 0.014, 0.034);
      }
      W.col = RIM;
      cylY(W, 0, y + s * 0.345, y + s * 0.365, 0, 0.045, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* the cast "upturned saucer" (ru.wikipedia; P1, P5): rings of PROF (radius factor, height)
     with an undercut foot; in plan narrower forward than aft (P6), the front lower. */
  var PROF = [[0.93, 0.00], [0.985, 0.05], [1.00, 0.11], [0.99, 0.19], [0.955, 0.29], [0.89, 0.40],
              [0.79, 0.50], [0.65, 0.59], [0.47, 0.66], [0.27, 0.71], [0.10, 0.735], [0.0, 0.74]];
  var EF = 1.22, ER = 0.86, EY = 0.90;
  function domeAt(D, a, rf, hz) {
    var c = Math.cos(a), s = Math.sin(a);
    var sx = (c >= 0 ? D.AF : D.AR) * rf * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), c >= 0 ? EF : ER);
    var sy = D.AY * rf * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), EY);
    var z = hz * (D.H / 0.74) * (1 - D.drop * Math.max(sx, 0) / D.AF);
    return [sx, sy, z];
  }
  /* the roof height over a plan point (u, v): walk the profile from the crown outwards */
  function domeZ(D, u, v) {
    var a = Math.atan2(v / D.AY, u / (u >= 0 ? D.AF : D.AR)), P = domeAt(D, a, 1, 0), R = Math.sqrt(P[0] * P[0] + P[1] * P[1]) || 1;
    var rho = Math.sqrt(u * u + v * v) / R, i, f, hz = 0;
    for (i = PROF.length - 1; i > 0; i--) {
      if (rho <= PROF[i - 1][0] && PROF[i - 1][0] > PROF[i][0]) {
        f = (rho - PROF[i][0]) / (PROF[i - 1][0] - PROF[i][0]);
        hz = PROF[i][1] + (PROF[i - 1][1] - PROF[i][1]) * Math.max(0, Math.min(1, f));
        break;
      }
    }
    return hz * (D.H / 0.74) * (1 - D.drop * Math.max(u, 0) / D.AF);
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
      var A = V[t[0]], Bv = V[t[1]], Cv = V[t[2]], n = cross(sub(Bv, A), sub(Cv, A));
      if (dot(n, n) < 1e-14) return;
      B.paint.tri(A, Bv, Cv, NN[t[0]], NN[t[1]], NN[t[2]]);
    });
    /* the floor under the undercut, so the foot reads closed from a low camera */
    for (j = 0; j < NS; j++) {
      var p0 = domeAt(D, j / NS * TAU, PROF[0][0], 0), p1 = domeAt(D, (j + 1) / NS * TAU, PROF[0][0], 0);
      B.dark.tri([0, 0, 0.004], [p1[0], p1[1], 0.004], [p0[0], p0[1], 0.004], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
    }
  }
  function onDome(D, a, rf, hz, dr) {
    var P = domeAt(D, a, rf, hz), l = Math.sqrt(P[0] * P[0] + P[1] * P[1]) || 1;
    return [P[0] + P[0] / l * dr, P[1] + P[1] / l * dr, P[2]];
  }

  var GZ = 0.33;                                         /* gun axis over the deck (D1) */
  function sRing(u, wy, wz, zc, n, pw) {                 /* a superellipse ring across X */
    var r = [], i, a, c, s;
    for (i = 0; i < n; i++) {
      a = i / n * TAU; c = Math.cos(a); s = Math.sin(a);
      r.push([u, wy * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), pw), zc + wz * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), pw)]);
    }
    return r;
  }
  function addGun(B, V) {
    var M = V.muz, D = V.dome, k, x0, xb, L;
    if (V.brake === "double") {
      /* T-10 (P1): the cast mantlet, a squared boss round the gun root */
      L = [sRing(D.AF - 0.30, 0.44, 0.30, GZ - 0.02, 20, 0.6), sRing(D.AF + 0.05, 0.42, 0.29, GZ - 0.02, 20, 0.6),
           sRing(D.AF + 0.30, 0.38, 0.26, GZ - 0.01, 20, 0.62), sRing(D.AF + 0.48, 0.30, 0.21, GZ, 20, 0.7),
           sRing(D.AF + 0.56, 0.20, 0.17, GZ, 20, 0.85)];
      loftN(B.paint, L);
      x0 = D.AF + 0.56;
      /* the plain tapered tube, no ejector (ru.wikipedia: it came with the T-10A) */
      cylX(B.paint, x0 - 0.05, x0 + 0.40, 0, GZ, 0.135, 0.120, 18);
      xb = M - 0.58;
      cylX(B.paint, x0 + 0.40, xb, 0, GZ, 0.112, 0.090, 18);
      /* the double-baffle brake: a box with rounded top and bottom, two big windows a side */
      L = [];
      [xb, xb + 0.02, M - 0.02, M].forEach(function (u, j) {
        var e = (j === 0 || j === 3) ? 0.93 : 1;
        L.push(sRing(u, 0.165 * e, 0.165 * e, GZ, 20, 0.55));
      });
      loftN(B.paint, L);
      for (k = 0; k < 2; k++) box(B.dark, xb + 0.10 + k * 0.23, xb + 0.26 + k * 0.23, -0.172, 0.172, GZ - 0.095, GZ + 0.095);
      cylX(B.dark, M - 0.004, M + 0.003, 0, GZ, 0.062, 0.062, 12);
      /* the 12.7 mm coaxial DShKM's port right of the gun, the sight port left */
      cylX(B.dark, D.AF + 0.30, D.AF + 0.55, -0.33, GZ - 0.03, 0.03, 0.03, 8);
      cylX(B.dark, D.AF + 0.25, D.AF + 0.42, 0.30, GZ + 0.08, 0.045, 0.045, 10);
    } else {
      /* T-10M (P2, P5): the larger rounded mantlet casting */
      L = [sRing(D.AF - 0.30, 0.50, 0.33, GZ - 0.02, 22, 0.75), sRing(D.AF + 0.08, 0.48, 0.32, GZ - 0.02, 22, 0.75),
           sRing(D.AF + 0.32, 0.42, 0.28, GZ - 0.01, 22, 0.8), sRing(D.AF + 0.50, 0.32, 0.22, GZ, 22, 0.9),
           sRing(D.AF + 0.58, 0.21, 0.18, GZ, 22, 1.0)];
      loftN(B.paint, L);
      x0 = D.AF + 0.58;
      cylX(B.paint, x0 - 0.05, x0 + 0.45, 0, GZ, 0.145, 0.125, 18);
      /* the tube with the ejector part way down (P2, P5): about 0.50 to 0.64 of the way out */
      var E0 = x0 + (M - x0) * 0.50, E1 = x0 + (M - x0) * 0.64;
      xb = M - 0.74;
      cylX(B.paint, x0 + 0.45, E0, 0, GZ, 0.118, 0.105, 18);
      cylX(B.paint, E0, E0 + 0.10, 0, GZ, 0.105, 0.150, 18);
      cylX(B.paint, E0 + 0.10, E1 - 0.06, 0, GZ, 0.150, 0.150, 18);
      cylX(B.dark, E0 + 0.18, E0 + 0.21, 0, GZ, 0.153, 0.153, 18);
      cylX(B.paint, E1 - 0.06, E1, 0, GZ, 0.150, 0.110, 18);
      cylX(B.paint, E1, xb, 0, GZ, 0.100, 0.095, 18);
      cylX(B.paint, xb - 0.10, xb, 0, GZ, 0.112, 0.112, 16);
      /* the multi-baffle brake: a core and a stack of ribs (P2, P5: seven) */
      cylX(B.dark, xb, M, 0, GZ, 0.10, 0.10, 14);
      for (k = 0; k < 7; k++) cylX(B.paint, xb + 0.03 + k * 0.10, xb + 0.085 + k * 0.10, 0, GZ, 0.150, 0.150, 16);
      cylX(B.dark, M - 0.004, M + 0.003, 0, GZ, 0.062, 0.062, 12);
      /* the 14.5 mm coaxial KPVT right of the gun, the sight port left */
      cylX(B.dark, D.AF + 0.30, D.AF + 0.60, -0.36, GZ - 0.03, 0.04, 0.04, 8);
      cylX(B.dark, D.AF + 0.25, D.AF + 0.45, 0.33, GZ + 0.08, 0.05, 0.05, 10);
      /* the IR searchlight drum on its bracket right of the mantlet (P2, P4, P5) */
      var lx = D.AF + 0.12, ly = -0.62, lz = GZ + 0.10;
      box(B.paint, lx - 0.10, lx + 0.10, ly + 0.10, ly + 0.26, lz - 0.05, lz + 0.03);
      cylX(B.paint, lx - 0.16, lx + 0.18, ly, lz, 0.165, 0.165, 18);
      cylX(B.dark, lx + 0.18, lx + 0.20, ly, lz, 0.14, 0.14, 18);
      cylX(B.paint, lx - 0.22, lx - 0.16, ly, lz, 0.10, 0.10, 12);
    }
  }
  function addTurret(V, B) {
    var D = V.dome, H = D.H, s, i, a, P, z;
    addDome(B, D);
    addGun(B, V);
    /* the grab handles on the turret sides (P5) */
    for (s = -1; s <= 1; s += 2) {
      [1.05, 1.75, 2.30].forEach(function (aa) {
        var A0 = onDome(D, s * (aa - 0.12), 1.0, 0.30, 0.0), A1 = onDome(D, s * (aa - 0.12), 1.0, 0.30, 0.06),
            B0 = onDome(D, s * (aa + 0.12), 1.0, 0.30, 0.0), B1 = onDome(D, s * (aa + 0.12), 1.0, 0.30, 0.06);
        cyl(B.dark, A0, A1, 0.015, 0.015, 6, true); cyl(B.dark, A1, B1, 0.015, 0.015, 6, true); cyl(B.dark, B1, B0, 0.015, 0.015, 6, true);
      });
    }
    /* commander's cupola, left rear (P2, P3, P5): the raised ring with vision blocks, the
       domed hatch and the sight in front; the T-10M's IR lamp on it (P2, P5) */
    var CX = -0.30, CY = 0.56, RZ = domeZ(D, CX, CY);
    cylZ(B.paint, CX, CY, RZ - 0.10, RZ + 0.10, 0.33, 22);
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU + 0.2;
      box(B.dark, CX + Math.cos(a) * 0.32 - 0.035, CX + Math.cos(a) * 0.32 + 0.035,
          CY + Math.sin(a) * 0.32 - 0.035, CY + Math.sin(a) * 0.32 + 0.035, RZ + 0.03, RZ + 0.08);
    }
    cyl(B.paint, [CX, CY, RZ + 0.10], [CX, CY, RZ + 0.15], 0.29, 0.22, 20);
    box(B.paint, CX + 0.18, CX + 0.36, CY - 0.08, CY + 0.08, RZ + 0.08, RZ + 0.21);
    box(B.dark, CX + 0.36, CX + 0.37, CY - 0.06, CY + 0.06, RZ + 0.12, RZ + 0.19);
    if (V.ir) {
      var ox = CX + 0.40, oy = CY - 0.02, oz = RZ + 0.20;
      box(B.dark, ox - 0.03, ox + 0.03, oy - 0.03, oy + 0.03, RZ + 0.02, oz - 0.08);
      cylX(B.paint, ox - 0.10, ox + 0.08, oy, oz, 0.10, 0.10, 16);
      cylX(B.dark, ox + 0.08, ox + 0.095, oy, oz, 0.085, 0.085, 16);
    }
    /* loader's hatch, right rear, with the AA machine gun on its mount behind it (P1, P3) */
    var LX = -0.35, LY = -0.56, LZ = domeZ(D, LX, LY);
    cylZ(B.paint, LX, LY, LZ - 0.06, LZ + 0.05, 0.30, 18);
    cyl(B.paint, [LX, LY, LZ + 0.05], [LX, LY, LZ + 0.08], 0.27, 0.22, 16);
    box(B.dark, LX + 0.20, LX + 0.30, LY - 0.06, LY + 0.06, LZ + 0.02, LZ + 0.10);
    var kp = V.mg === "kpvt", GX = LX - 0.40, GY = LY - 0.02, PZ = domeZ(D, GX, GY), GZ2 = PZ + (kp ? 0.40 : 0.36);
    /* the post and cradle */
    cylZ(B.dark, GX, GY, PZ - 0.02, GZ2 - 0.06, 0.045, 10);
    cylZ(B.paint, GX, GY, PZ - 0.02, PZ + 0.06, 0.12, 14);
    box(B.dark, GX - 0.12, GX + 0.14, GY - 0.09, GY + 0.09, GZ2 - 0.10, GZ2 - 0.05);
    if (!kp) {
      /* 12.7 mm DShKM: the receiver, the finned barrel, the muzzle brake, the box (P1) */
      box(B.dark, GX - 0.28, GX + 0.26, GY - 0.06, GY + 0.06, GZ2 - 0.05, GZ2 + 0.06);
      box(B.dark, GX - 0.05, GX + 0.18, GY + 0.06, GY + 0.20, GZ2 - 0.13, GZ2 + 0.06);
      cylX(B.dark, GX - 0.42, GX - 0.28, GY, GZ2, 0.03, 0.03, 8);
      cylX(B.dark, GX + 0.26, GX + 1.35, GY, GZ2 + 0.01, 0.025, 0.023, 8);
      for (i = 0; i < 4; i++) cylX(B.dark, GX + 0.30 + i * 0.07, GX + 0.33 + i * 0.07, GY, GZ2 + 0.01, 0.04, 0.04, 8);
      cylX(B.dark, GX + 1.30, GX + 1.42, GY, GZ2 + 0.01, 0.042, 0.042, 8);
    } else {
      /* 14.5 mm KPVT: the long receiver, the barrel in its perforated jacket (D1) */
      box(B.dark, GX - 0.40, GX + 0.30, GY - 0.07, GY + 0.07, GZ2 - 0.05, GZ2 + 0.08);
      box(B.dark, GX - 0.05, GX + 0.22, GY + 0.07, GY + 0.22, GZ2 - 0.14, GZ2 + 0.06);
      cylX(B.dark, GX + 0.30, GX + 1.05, GY, GZ2 + 0.015, 0.045, 0.045, 10);
      cylX(B.dark, GX + 1.05, GX + 1.62, GY, GZ2 + 0.015, 0.028, 0.026, 8);
      cylX(B.dark, GX + 1.58, GX + 1.70, GY, GZ2 + 0.015, 0.04, 0.04, 8);
    }
    /* the gunner's periscope ahead of the cupola (T-10M: the TPN night sight's head) */
    z = domeZ(D, 0.62, 0.42);
    box(B.paint, 0.50, 0.74, 0.32, 0.52, z - 0.06, z + (V.ir ? 0.14 : 0.08));
    box(B.dark, 0.74, 0.75, 0.35, 0.49, z + (V.ir ? 0.03 : 0.0), z + (V.ir ? 0.11 : 0.06));
    /* the ventilator dome on the roof and the antenna base, left rear */
    z = domeZ(D, 0.20, -0.10);
    cyl(B.paint, [0.20, -0.10, z - 0.04], [0.20, -0.10, z + 0.06], 0.17, 0.14, 16);
    z = domeZ(D, -0.95, 0.70);
    cylZ(B.dark, -0.95, 0.70, z - 0.04, z + 0.10, 0.05, 8);
    box(B.team, -0.85, -0.45, -0.12, 0.12, domeZ(D, -0.65, 0) - 0.02, domeZ(D, -0.65, 0) + 0.012);
    /* lifting eyes */
    for (s = -1; s <= 1; s += 2) {
      P = onDome(D, s * 1.25, 0.72, 0.58, 0.0);
      box(B.dark, P[0] - 0.05, P[0] + 0.05, P[1] - 0.015, P[1] + 0.015, P[2] - 0.01, P[2] + 0.06);
      P = onDome(D, Math.PI + s * 0.45, 0.72, 0.58, 0.0);
      box(B.dark, P[0] - 0.05, P[0] + 0.05, P[1] - 0.015, P[1] + 0.015, P[2] - 0.01, P[2] + 0.06);
    }
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.T10, T = materials(THREE, C, V), g = new THREE.Group();
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
    addTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (models3d convention): the stern tow hooks at
   -3.86 m to the muzzle (published length gun forward is from the tail plate at -3.70 m) */
UNIT_MODELS["pact_e50_heavy"] = {
  len: 9.88,
  build: function (THREE, M, C) { return HeroT10.build(THREE, M, C, "T10"); }
};
UNIT_MODELS["pact_e60_heavy"] = {
  len: 10.72,
  build: function (THREE, M, C) { return HeroT10.build(THREE, M, C, "T10M"); }
};
