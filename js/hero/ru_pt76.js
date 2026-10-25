/* ============ ru_pt76.js - HERO models: the PT-76 amphibious light tank ============
   Two rows of the Soviet/Pact reconnaissance and bridgehead tank, each drawn as its own variant:
     pact_e50_lighttank   PT-76  (Object 740, adopted 6 Aug 1951)  D-56T gun with the LONG
                          MULTI-SLOTTED muzzle brake, no bore evacuator; the low hull of 1951-57;
                          no turret searchlight
     pact_e60_lighttank   PT-76B (Object 740B, 1959)  D-56TS with the DOUBLE-BAFFLE brake and the
                          bore evacuator; the hull 13 cm higher (from 1957); the spotlight on a
                          bracket at the right-hand edge of the turret roof; guarded headlamps

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960, cached in
   scratchpad/q_pt76_ref:
     D1  "PT-76.png" - three-view line drawing (port side, front, port 3/4) of a PT-76B (bore
         evacuator, double baffle): hull profile, glacis knee, deck and ledge lines, six wheels on
         0.81 m centres, raised front idler and rear sprocket, turret 2.28 m long at the base,
         1.47 m at the roof, 0.62 m tall, gun axis 0.39 m over the deck; front view: hull 2.92 m
         over the side plates, 2.31 m between the tracks, turret 2.25 m across the base.
     P1  "PT-76-os uszo harckocsi.jpg" (Fortepan, Budapest, 31 Oct 1956) - an early PT-76, port
         side: the long brake with no evacuator, gun 0.73 m ahead of the bow, low hull.
     P2  "ParkPatriot2015part2-46.jpg" (V. Kuzmin, PT-76B) - port side: slab side, ledge,
         sagging track on six spoked wheels, raised idler and sprocket, side water-jet louvre,
         the long tank on the port rear deck, the domed cover on the turret's port rear wall.
     P3  "ParkPatriot2015part2-44.jpg" (V. Kuzmin, PT-76B) - starboard front 3/4: the trim vane
         folded on the glacis (riveted rim), the headlamp cages, towing hooks, front mudguards,
         the spotlight at the right front of the turret roof, double-baffle brake.
     P4  "Pt-76 afv.jpg" (Kiev, PT-76B) - head on: lower bow plate, lamp cages, mantlet, the
         gunner's sight left of the gun and the MG port right of it, Soviet green.
     P5  "PT-76 (31356566712).jpg" - starboard rear 3/4: stern plate, the round water-jet outlet
         with its ribbed flap at the corner, the rear mudflap over the sprocket, side louvre.
     P6  "Right side view ... Soviet PT-76 ... DPLA" - starboard side (OPFOR paint, NOT followed
         for colour): wheel and turret proportions only.
     P7  "Legkiy plavayushchiy tank PT-76 -2.jpg", P8 "PT-76 (Verkhnyaya Pyshma).jpg",
         P9 "PT-76 National Museum of the Great Patriotic War.jpg" - glacis, vane and lamp
         cages from the front; paint.
   Text: en.wikipedia "PT-76" (variants: 1951 D-56T "long multi-slotted muzzle brake", no
   evacuator; 1957 D-56TM with double baffle and evacuator, hull raised 13 cm, new headlamps,
   spotlight on the right-hand edge of the turret roof; 1959 PT-76B; commander's cupola on the
   left of the double hatch, loader's MK-4 in front of it; six wheels, no return rollers, a thin
   horizontal skirt over each track; two hydrojets with outlets at the rear) and ru.wikipedia
   "PT-76" (6910 mm hull, 7625 mm with the gun, 3140 mm wide, 2195 mm high, track gauge
   2740 mm, track 360 mm, clearance 370 mm); en.wikipedia gives 2.325 m for the PT-76B.

   CORRECTIONS against the previous model (the references do not support it):
   - the 1951 row had the double-baffle brake; it now has the long multi-slotted brake (P1, text);
   - the turret was 2.10 x 1.94 m at the base, about 8-14 % small; it is now 2.28 x 2.25 (D1).
     js/hero/ru_shmel.js measured 2.67 m, 0.79 m and a 4.3 m gun reach for its copy; D1 and the
     published 7.625 m give 2.25-2.28 m, 0.62 m and 3.63 m, so the old turret was about 10 %
     small, not 20 %, and the Shmel figures run 17-27 % above the tank's own;
   - both rows had one hull height; the PT-76B hull is now 13 cm higher (text, P1 against P2);
   - the turret is a flat truncated cone (D1, P2, P4); the commander's cupola on the LEFT of a
     big double hatch, not a separate cupola and loader's hatch;
   - the spotlight sits at the RIGHT front of the roof (P3, text), and only on the PT-76B;
   - the track now sags onto the wheel tops (P2, P5), with the thin ledge above it;
   - the stern outlets are round with ribbed flaps at the plate's lower corners (P5).

   Recognition list (what makes it read at game zoom, and its source):
     1. long, flat, boat-shaped hull, slab sides, deck flat from the stern to the glacis - D1, P2
     2. one long shallow glacis to a sharp bow edge, a steep lower bow plate under it - D1, P3, P4
     3. the trim vane folded flat on the glacis, wide as the hull, riveted rim - P3, P7, P8
     4. six big spoked road wheels, no return rollers, raised idler and rear sprocket - D1, P2
     5. the track sagging onto the wheel tops under a thin ledge - P2, P5
     6. low flat truncated-cone turret just behind the glacis knee - D1, P2, P4
     7. the long thin 76 mm gun reaching 0.7 m past the bow - P1, P2, text
     8. muzzle: long multi-slotted brake (1951 row) / double baffle and evacuator (PT-76B) - P1, P3
     9. double hatch with the commander's cupola on its left - text, D1, P2
    10. glacis lamps (in cages on the PT-76B), towing hooks on the lower bow plate - P3, P4
    11. stern: two round water-jet outlets with flaps, rear mudflaps, side louvre - P5, P2
    12. PT-76B: spotlight on the right of the roof, long tank on the port rear deck - P2, P3
   Paint: Soviet green. Sampled (diffuse light) P7 #5e5f4e, P8 #506257, P4 sunlit turret
   #657069; taken to about 0.85 of the mean: #4d5244 (PT-76B), #4f5341 (1951 row, a little more
   olive). No numbers, slogans or the 1956 photograph's turret number (P1 carries one).
   NOT CONFIRMED, drawn plain or left off: the 1951 headlamps (P1 cannot show them; drawn as bare
   lamps, the cages only on the PT-76B), the slot count of the early brake (P1 is too small; 6
   rows of 5 drawn), stowage on the 1951 row, the deck grille layout (drawn as two louvred panels,
   D1 3/4), the domed cover on the 1951 turret (left off), any snorkel (no photograph shows one;
   the PT-76 swims with its engine deck sealed), DShK AA guns (PT-76A, not these rows).
   Materials: PAINT (canvas texture, metre UVs: base green, plate seams, bolt rows, grime),
   DARK (track, gun, fittings), GLASS, WHEEL (vertex colours), and the team colour exactly as
   handed in (C.team) on two 0.25 x 0.9 m strips on the rear deck.  Nodes: "turret" (ring centre
   on the deck, gun along +X at rest) and six "roadwheel" groups (axle on local Y, both sides in
   one mesh).  Model space +X bow, +Y left (port), +Z up, metres, tracks on z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroPT76 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table */
  var VARIANTS = {
    A: { paint: { base: "#4f5341", seed: 1951, us: 0.34 }, deck: 1.37, brake: "slot", evac: false, lamp: false, cage: false, tank: false, dome: false },
    B: { paint: { base: "#4d5244", seed: 1959, us: 0.34 }, deck: 1.50, brake: "baffle", evac: true, lamp: true, cage: true, tank: true, dome: true }
  };

  /* running gear (D1 at 0.0120 m a pixel, hull 6.91 m): six wheels on 0.806 m centres, 0.67 m
     across (D1 0.61, P1 0.76: the mean), the front idler and rear sprocket raised; track gauge 2.74 m, 360 mm track (ru.wikipedia) */
  var XW = [2.21, 1.40, 0.60, -0.21, -1.01, -1.82], ZW = 0.38, RW = 0.335;
  var TY = 1.37, TW = 0.18;
  var IDL = { x: 2.97, z: 0.58, r: 0.21 }, SPR = { x: -2.62, z: 0.52, r: 0.26 };
  var HL = 3.455, LEDGE = 1.00, WS = 1.46, WL = 1.16, TX = 0.54;
  var KNEE = 1.71, DROP = 0.25;            /* glacis: from the knee at x 1.71 it falls 0.25 m to the bow edge */

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
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, sx, sy, sz, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      sx = s[i][0] * hu; sy = s[i][1] * hv; sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
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
  /* a closed solid lofted through rings of the same count, the end rings capped with fans */
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
  /* smooth-sided loft (averaged normals), for the cast-looking turret cone */
  function loftS(bin, rings) {
    var n = rings[0].length, V = [], F = [], i, k, r, a, b, c0, c1, f, vol = 0;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    var ns = V.length;
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    var cA = [0, 0, 0], cB = [0, 0, 0];
    for (k = 0; k < n; k++) for (i = 0; i < 3; i++) { cA[i] += V[k][i] / n; cB[i] += V[ns - n + k][i] / n; }
    for (k = 0; k < n; k++) {
      vol += dot(cA, cross(V[(k + 1) % n], V[k]));
      vol += dot(cB, cross(V[ns - n + k], V[ns - n + (k + 1) % n]));
    }
    var sg = vol < 0 ? -1 : 1, Nv = [], t;
    for (i = 0; i < ns; i++) Nv.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; t = unit(cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]])));
      for (k = 0; k < 3; k++) { Nv[f[k]][0] += t[0] * sg; Nv[f[k]][1] += t[1] * sg; Nv[f[k]][2] += t[2] * sg; }
    }
    for (i = 0; i < ns; i++) Nv[i] = unit(Nv[i]);
    for (i = 0; i < F.length; i++) {
      f = F[i];
      if (sg > 0) bin.tri(V[f[0]], V[f[1]], V[f[2]], Nv[f[0]], Nv[f[1]], Nv[f[2]]);
      else bin.tri(V[f[0]], V[f[2]], V[f[1]], Nv[f[0]], Nv[f[2]], Nv[f[1]]);
    }
    for (k = 0; k < n; k++) {
      a = V[k]; b = V[(k + 1) % n]; c0 = V[ns - n + k]; c1 = V[ns - n + (k + 1) % n];
      if (sg > 0) { bin.tri(cA, b, a); bin.tri(cB, c0, c1); } else { bin.tri(cA, a, b); bin.tri(cB, c1, c0); }
    }
  }
  function pwl(T, x) {
    var i, t;
    if (x <= T[0][0]) return T[0][1];
    for (i = 0; i + 1 < T.length; i++) if (x <= T[i + 1][0]) { t = (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return T[i][1] + (T[i + 1][1] - T[i][1]) * t; }
    return T[T.length - 1][1];
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
  /* Soviet green, one tile 1 / 0.34 = 2.9 m: soft mottling of a hand-brushed finish, welded plate
     seams with bolt rows (P2, P3 show the riveted vane rim and bolted access plates), rain streaks
     and road grime low down (P2, P5) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "pt76" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 30; i++) {
        q.globalAlpha = 0.14 + R() * 0.16; q.fillStyle = i % 2 ? "#41463a" : "#5b5f4c";
        q.beginPath(); q.ellipse ? q.ellipse(R() * S, R() * S, 30 + R() * 70, 20 + R() * 50, R() * 3, 0, TAU) : q.rect(R() * S, R() * S, 60, 40); q.fill();
      }
      q.globalAlpha = 1;
      for (i = 0; i < 7; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.40)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
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

  /* ---------------------------------------------------------------- hull */
  /* side profile off D1 (bow at x +3.455): the deck flat from the stern to the glacis knee at
     x 1.71, the glacis falling 0.25 m to the bow edge; the slab sides 2.92 m apart stand on a
     sponson floor at 1.00 m (the ledge line); the lower hull between the tracks (2.31 m) has a
     0.37 m clearance belly, rising at the stern into the plate and at the bow into the steep
     lower bow plate that runs up to the bow edge (P3, P4, P8). */
  function topZ(V, x) { return x <= KNEE ? V.deck : V.deck - DROP * (x - KNEE) / (HL - KNEE); }
  var PLATE = [[2.62, 0.37], [2.86, 0.43], [3.42, 1.02]];        /* lower bow plate (side view) */
  function upperRing(V, x) {
    var zt = topZ(V, x), zb = x > 3.30 ? Math.min(zt - 0.03, pwl(PLATE, x) + 0.02) : LEDGE, w = x > 3.38 ? WS - 0.03 : WS, e = Math.min(0.025, (zt - zb) / 3);
    return [[x, w, zb], [x, w, zt - e], [x, w - e, zt], [x, -(w - e), zt], [x, -w, zt - e], [x, -w, zb]];
  }
  var UXS = [-3.455, -3.43, -2.5, -1.0, 0.5, 1.71, 2.3, 2.9, 3.30, 3.40, 3.455];
  var BOT = [[-3.455, 0.56], [-3.30, 0.42], [-3.05, 0.37], [2.62, 0.37], [2.86, 0.43], [3.42, 1.02]];
  var LXS = [-3.455, -3.30, -3.05, 2.62, 2.86, 3.10, 3.42];
  function lowerRing(x) {
    var zb = pwl(BOT, x), w = x > 2.9 ? WL - 0.03 : WL, wb = w - 0.07, zt = LEDGE + 0.03;
    return [[x, wb, zb], [x, w, Math.min(zb + 0.07, zt - 0.01)], [x, w, zt], [x, -w, zt], [x, -w, Math.min(zb + 0.07, zt - 0.01)], [x, -wb, zb]];
  }
  function addHull(B, V) {
    var R = [], i, k, s, x, y, z, D = V.deck;
    for (i = 0; i < UXS.length; i++) R.push(upperRing(V, UXS[i]));
    loftN(B.paint, R);
    R = [];
    for (i = 0; i < LXS.length; i++) R.push(lowerRing(LXS[i]));
    loftN(B.paint, R);

    /* trim vane folded on the glacis (P3, P7, P8): a board 2.6 m wide lying on the glacis from
       x 2.12 to just past the bow edge, a riveted rim round it, two hinge brackets at the bow */
    var gz = function (xx) { return topZ(V, xx); };
    belt(B.paint, 2.12, gz(2.12) + 0.04, 3.56, gz(3.56) + 0.03, -1.30, 1.30, 0.06);
    belt(B.paint, 2.10, gz(2.10) + 0.08, 2.20, gz(2.20) + 0.08, -1.31, 1.31, 0.05);
    belt(B.paint, 3.47, gz(3.47) + 0.07, 3.60, gz(3.60) + 0.06, -1.31, 1.31, 0.05);
    belt(B.paint, 3.585, gz(3.585) - 0.02, 3.60, gz(3.60) + 0.085, -1.31, 1.31, 0.03);
    for (s = -1; s <= 1; s += 2) {
      belt(B.paint, 2.12, gz(2.12) + 0.08, 3.56, gz(3.56) + 0.065, s * 1.25, s * 1.31, 0.05);
      for (k = 0; k < 9; k++) { x = 2.20 + k * 0.15; box(B.dark, x - 0.012, x + 0.012, s * 1.29 - 0.012, s * 1.29 + 0.012, gz(x) + 0.103, gz(x) + 0.116); }
      box(B.dark, 3.30, 3.50, s * 1.00 - 0.06, s * 1.00 + 0.06, gz(3.40) - 0.02, gz(3.40) + 0.09);
      cylY(B.dark, 3.44, s * 0.92, s * 1.08, gz(3.44) + 0.02, 0.045, 8);
      /* the vane's stays folded along its sides (P3) */
      belt(B.dark, 2.25, gz(2.25) + 0.09, 3.20, gz(3.20) + 0.09, s * 1.18, s * 1.22, 0.035);
    }
    for (k = 0; k < 16; k++) { y = -1.2 + k * 0.16; box(B.dark, 2.13, 2.16, y - 0.012, y + 0.012, gz(2.14) + 0.103, gz(2.14) + 0.116); }

    /* driver's hatch on the glacis centre ahead of the turret, three periscopes fanned forward */
    z = gz(1.92);
    box(B.paint, 1.74, 2.10, -0.33, 0.33, z - 0.02, z + 0.07);
    box(B.dark, 1.78, 1.96, -0.26, 0.26, z + 0.07, z + 0.085);
    for (k = -1; k <= 1; k++) {
      slab(B.paint, [2.04, k * 0.17, z + 0.11], unit([Math.cos(k * 0.35), Math.sin(k * 0.35), 0]), unit([-Math.sin(k * 0.35), Math.cos(k * 0.35), 0]), [0, 0, 1], 0.06, 0.07, 0.05);
      slab(B.glass, [2.105, k * 0.17 + Math.sin(k * 0.35) * 0.06, z + 0.12], unit([Math.cos(k * 0.35), Math.sin(k * 0.35), 0]), unit([-Math.sin(k * 0.35), Math.cos(k * 0.35), 0]), [0, 0, 1], 0.006, 0.055, 0.025);
    }

    for (s = -1; s <= 1; s += 2) {
      /* headlamps on the glacis behind the vane (P3, P4); the PT-76B's in wire cages */
      x = 1.95; z = gz(x); y = s * 0.98;
      box(B.dark, x - 0.08, x + 0.08, y - 0.08, y + 0.08, z - 0.01, z + 0.04);
      cylX(B.dark, x - 0.10, x + 0.06, y, z + 0.14, 0.085, 0.09, 12);
      cylX(B.glass, x + 0.06, x + 0.075, y, z + 0.14, 0.075, 0.075, 12);
      if (V.cage) {
        for (k = 0; k < 5; k++) {
          var a0 = k / 4 * Math.PI;
          belt(B.dark, x - 0.13, z + 0.14 + Math.sin(a0) * 0.14, x + 0.16, z + 0.14 + Math.sin(a0) * 0.14, y + Math.cos(a0) * 0.14 - 0.01, y + Math.cos(a0) * 0.14 + 0.01, 0.015);
        }
        belt(B.dark, x + 0.16, z, x + 0.16, z + 0.28, y - 0.15, y + 0.15, 0.015);
        belt(B.dark, x + 0.16, z + 0.14, x + 0.16, z + 0.155, y - 0.15, y + 0.15, 0.015);
        belt(B.dark, x - 0.13, z, x - 0.13, z + 0.28, y - 0.15, y + 0.15, 0.015);
      }
      /* towing hooks on the lower bow plate (P3, P4, P8) */
      z = pwl(PLATE, 3.12);
      slab(B.dark, [3.17, s * 0.62, z + 0.02], unit([0.72, 0, -0.69]), [0, 1, 0], unit([0.69, 0, 0.72]), 0.10, 0.05, 0.06);
      cylY(B.dark, 3.24, s * 0.62 - 0.05, s * 0.62 + 0.05, z - 0.02, 0.05, 8);
      /* front mudguard over the track front, standing down from the sponson (P3, P4) */
      box(B.paint, 3.20, 3.24, s * 1.18, s * 1.565, 0.72, LEDGE + 0.02);
      /* ledge: the thin horizontal skirt over the track (text, P2, P5) */
      box(B.paint, -3.30, 3.24, s * 1.45, s * 1.555, LEDGE - 0.025, LEDGE + 0.005);
      box(B.dark, -3.30, 3.24, s * 1.555, s * 1.57, LEDGE - 0.04, LEDGE + 0.005);
      /* rear mudflap angled down over the sprocket (P5, P2) */
      belt(B.paint, -3.30, LEDGE - 0.01, -3.50, 0.66, s * 1.18, s * 1.565, 0.03);
      /* side water-jet louvre low on the slab near the stern (P2, P5, D1) */
      y = s * WS;
      box(B.dark, -2.42, -2.08, y - 0.01 * s, y + 0.012 * s, LEDGE + 0.03, LEDGE + 0.20);
      for (k = 0; k < 4; k++) box(B.paint, -2.40 + k * 0.085, -2.36 + k * 0.085, Math.min(y, y + 0.03 * s), Math.max(y, y + 0.03 * s), LEDGE + 0.04, LEDGE + 0.19);
      /* vertical plate seam behind the louvre and a lifting eye at each deck corner (D1, P2) */
      box(B.dark, -2.48, -2.46, Math.min(y, y + 0.008 * s), Math.max(y, y + 0.008 * s), LEDGE + 0.02, D - 0.02);
      for (k = 0; k < 2; k++) cylY(B.dark, k ? -3.25 : 1.55, s * (WS - 0.10), s * (WS - 0.02), (k ? D : topZ(V, 1.55)) + 0.05, 0.045, 8);
      /* handrail along the deck edge abreast of the turret (D1, P2) */
      belt(B.dark, -1.30, D + 0.10, -0.10, D + 0.10, s * (WS - 0.10), s * (WS - 0.07), 0.025);
      belt(B.dark, -1.30, D, -1.30, D + 0.11, s * (WS - 0.10), s * (WS - 0.07), 0.025);
      belt(B.dark, -0.10, D, -0.10, D + 0.11, s * (WS - 0.10), s * (WS - 0.07), 0.025);
      /* tracks, sprocket, idler */
      addTrack(B, s);
    }
    /* PT-76B: the long box along the port deck edge abreast of the turret (P2) */
    if (V.tank) {
      box(B.paint, -0.55, 0.95, WS - 0.02, WS + 0.06, D - 0.17, D - 0.02);
      box(B.dark, -0.55, 0.95, WS + 0.06, WS + 0.07, D - 0.05, D - 0.03);
    }

    /* rear deck over the engine (D1 3/4): two louvred grille panels, the stern step */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -3.05, -1.75, s > 0 ? 0.20 : -1.05, s > 0 ? 1.05 : -0.20, D - 0.01, D + 0.02);
      for (k = 0; k < 8; k++) box(B.paint, -3.02 + k * 0.16, -2.95 + k * 0.16, s > 0 ? 0.22 : -1.03, s > 0 ? 1.03 : -0.22, D + 0.02, D + 0.045);
    }
    box(B.paint, -3.40, -3.12, -1.30, 1.30, D - 0.01, D + 0.03);
    box(B.team, -1.62, -1.37, 0.20, 1.10, D + 0.02, D + 0.032);
    box(B.team, -1.62, -1.37, -1.10, -0.20, D + 0.02, D + 0.032);
    /* PT-76B: the long cylindrical tank on the port rear deck (P2, D1), on two straps */
    if (V.tank) {
      cylX(B.paint, -3.10, -1.20, 0.98, D + 0.17, 0.16, 0.16, 16);
      cylX(B.dark, -3.13, -3.10, 0.98, D + 0.17, 0.10, 0.10, 10);
      for (k = 0; k < 2; k++) { x = [-2.70, -1.60][k]; cylX(B.dark, x - 0.03, x + 0.03, 0.98, D + 0.17, 0.17, 0.17, 16); box(B.dark, x - 0.04, x + 0.04, 0.78, 1.18, D, D + 0.03); }
    }

    /* stern plate (P5): the two round water-jet outlets with ribbed flaps at the lower corners,
       tail lamps, tow hooks; the plate itself is the hull's flat after face */
    for (s = -1; s <= 1; s += 2) {
      y = s * 0.80;
      cylX(B.dark, -3.49, -3.455, y, 0.72, 0.26, 0.26, 20);
      cylX(B.paint, -3.53, -3.49, y, 0.72, 0.24, 0.24, 20);
      for (k = 0; k < 6; k++) {
        var t = k / 6 * TAU;
        slab(B.paint, [-3.545, y + Math.cos(t) * 0.11, 0.72 + Math.sin(t) * 0.11], [1, 0, 0], [0, Math.cos(t), Math.sin(t)], [0, -Math.sin(t), Math.cos(t)], 0.015, 0.10, 0.012);
      }
      box(B.dark, -3.52, -3.46, y - 0.05, y + 0.05, 0.94, 1.02);
      box(B.dark, -3.50, -3.455, s * 1.20 - 0.06, s * 1.20 + 0.06, D - 0.22, D - 0.12);
      box(B.glass, -3.505, -3.50, s * 1.20 - 0.04, s * 1.20 + 0.04, D - 0.20, D - 0.14);
      slab(B.dark, [-3.52, s * 0.35, 0.55], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.07, 0.04, 0.06);
    }
    box(B.dark, -3.48, -3.455, -0.40, 0.40, D - 0.10, D - 0.06);
  }

  /* ------------------------------------------------------- running gear */
  /* the loop: round the idler, the wheel bottoms, the sprocket, then back along the TOP of the
     wheels - with no return rollers the top run sags onto them (P2, P5) */
  var _loop = null;
  function trackLoop() {
    if (_loop) return _loop;
    var P = [], i, k, a, n = 10, segs = [], tot = 0, l, b, th = 0.045;
    var rI = IDL.r + th, rS = SPR.r + 0.01, rW = RW + th;
    /* idler: from its top, round the front, to the bottom-rear (tangent to the ground run) */
    for (k = 0; k <= n; k++) { a = Math.PI / 2 - k / n * (Math.PI - 0.5); P.push([IDL.x + Math.cos(a) * rI, IDL.z + Math.sin(a) * rI]); }
    /* bottom run under the wheels */
    P.push([XW[0] + 0.12, 0.025]);                 /* link centre 2.5 cm up: the 5 cm links stand on z = 0 */
    P.push([XW[XW.length - 1] - 0.12, 0.025]);
    /* sprocket: from bottom-front, round the rear, to the top */
    for (k = 0; k <= n; k++) { a = (-Math.PI / 2 - 0.3) - k / n * (Math.PI - 0.3); P.push([SPR.x + Math.cos(a) * rS, SPR.z + Math.sin(a) * rS]); }
    /* top run: sprocket top, down onto each wheel top, up to the idler top */
    for (i = XW.length - 1; i >= 0; i--) { P.push([XW[i] - 0.10, ZW + rW - 0.005]); P.push([XW[i] + 0.10, ZW + rW - 0.005]); }
    for (i = 0; i < P.length; i++) {
      a = P[i]; b = P[(i + 1) % P.length];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    _loop = { segs: segs, tot: tot };
    return _loop;
  }
  function addTrack(B, s) {
    var L = trackLoop(), segs = L.segs, n = segs.length, cnt = 96, step = L.tot / cnt;
    var y = s * TY, i, k, q = 0, rem = 0, d, t, a, b, dx, dz, px, pz;
    for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.03);
    for (k = 0; k < cnt; k++) {
      d = (k + 0.5) * step;
      while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
      t = (d - rem) / segs[q][2];
      a = segs[q][0]; b = segs[q][1];
      dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
      px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
      /* the link plate with its outward grouser and the centre guide horn (P2) */
      belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.005, y + TW + 0.005, 0.05);
    }
    /* sprocket at the rear: toothed rim on a spoked disc with lightening holes (P2, P5) */
    cylY(B.dark, SPR.x, y - 0.16, y + 0.16, SPR.z, SPR.r - 0.03, 18);
    for (k = 0; k < 13; k++) {
      t = k / 13 * TAU;
      slab(B.dark, [SPR.x + Math.cos(t) * (SPR.r - 0.01), y, SPR.z + Math.sin(t) * (SPR.r - 0.01)], [Math.cos(t), 0, Math.sin(t)], [0, 1, 0], [-Math.sin(t), 0, Math.cos(t)], 0.035, 0.11, 0.028);
    }
    cylY(B.paint, SPR.x, y + s * 0.13, y + s * 0.17, SPR.z, SPR.r - 0.06, 16);
    cylY(B.dark, SPR.x, y + s * 0.17, y + s * 0.195, SPR.z, 0.08, 10);
    for (k = 0; k < 6; k++) { t = k / 6 * TAU + 0.3; cylY(B.dark, SPR.x + Math.cos(t) * 0.13, y + s * 0.165, y + s * 0.175, SPR.z + Math.sin(t) * 0.13, 0.05, 8); }
    /* idler at the bow: a smaller spoked disc */
    cylY(B.dark, IDL.x, y - 0.16, y + 0.16, IDL.z, IDL.r, 16);
    cylY(B.paint, IDL.x, y + s * 0.13, y + s * 0.17, IDL.z, IDL.r - 0.04, 14);
    cylY(B.dark, IDL.x, y + s * 0.17, y + s * 0.19, IDL.z, 0.06, 8);
    /* torsion-bar arms trailing from the hull to each wheel; the dampers on wheels 1 and 6 (text) */
    for (k = 0; k < XW.length; k++) slab(B.dark, [XW[k] + 0.18, s * (TY - 0.27), ZW + 0.12], unit([0.83, 0, 0.55]), [0, 1, 0], unit([-0.55, 0, 0.83]), 0.22, 0.04, 0.045);
    for (k = 0; k < 2; k++) { i = k ? XW.length - 1 : 0; cyl(B.dark, [XW[i] + 0.05, s * (WL + 0.03), ZW + 0.16], [XW[i] + 0.38, s * (WL + 0.03), LEDGE - 0.05], 0.035, 0.035, 8); }
  }
  /* road wheel (D1, P2, P5): a pressed hollow disc with twelve radial ribs dished to the hub, a
     narrow rubber tyre, a hub cap with nuts; both sides of the axle in one group */
  var TYRE = [0.13, 0.135, 0.125], NUT = [0.17, 0.18, 0.16];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.13, y + 0.13, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.135, y + 0.135, 0, RW - 0.05, 18);
      cyl(W, [0, y + s * 0.135, 0], [0, y + s * 0.165, 0], RW - 0.05, 0.10, 18);
      W.col = RIB;
      for (i = 0; i < 12; i++) {
        a = i / 12 * TAU;
        slab(W, [Math.cos(a) * 0.185, y + s * 0.148, Math.sin(a) * 0.185], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.095, 0.02, 0.018);
      }
      W.col = BODY;
      cylY(W, 0, y + s * 0.16, y + s * 0.185, 0, 0.085, 12);
      W.col = NUT;
      cylY(W, 0, y + s * 0.185, y + s * 0.20, 0, 0.04, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* a flat truncated cone (D1 side and front views, P2, P4): base 2.28 m long, 2.25 m across,
     roof 1.47 x 1.40 m, 0.65 m high (deck to roof, D1 side), the roof centred 4 cm ahead of the ring; the shoulder is
     rounded as the casting is (P2). Rows: z, forward, aft, half width, x shift. */
  var TR = [
    [-0.03, 1.15, 1.15, 1.135, 0.0],
    [0.00, 1.14, 1.14, 1.125, 0.0],
    [0.19, 1.04, 1.02, 1.01, 0.01],
    [0.38, 0.93, 0.90, 0.895, 0.02],
    [0.53, 0.84, 0.81, 0.80, 0.03],
    [0.605, 0.79, 0.76, 0.75, 0.04],
    [0.645, 0.74, 0.72, 0.70, 0.04],
    [0.66, 0.68, 0.67, 0.65, 0.04]
  ];
  function tring(r, n) {
    var pts = [], k, c, a;
    for (k = 0; k < n; k++) {
      a = k / n * TAU; c = Math.cos(a);
      pts.push([r[4] + (c >= 0 ? r[1] : r[2]) * c, r[3] * Math.sin(a), r[0]]);
    }
    return pts;
  }
  /* radius of the cone at height z in direction a (for seating fittings on its face) */
  function coneR(z, a) {
    var i, t, c = Math.cos(a), r0, r1;
    for (i = 0; i + 1 < TR.length; i++) if (z <= TR[i + 1][0]) break;
    if (i + 1 >= TR.length) i = TR.length - 2;
    t = Math.max(0, Math.min(1, (z - TR[i][0]) / (TR[i + 1][0] - TR[i][0])));
    function rr(R) { var rx = c >= 0 ? R[1] : R[2], ry = R[3], s = Math.sin(a); return 1 / Math.sqrt((c * c) / (rx * rx) + (s * s) / (ry * ry)); }
    r0 = rr(TR[i]); r1 = rr(TR[i + 1]);
    return r0 + (r1 - r0) * t;
  }
  var GZ = 0.39, MUZ = 3.63;                 /* gun axis over the deck (D1); muzzle 0.715 m past the bow */
  function addTurret(V, B) {
    var R = [], i, k, s, x, y, z, a, r;
    for (i = 0; i < TR.length; i++) R.push(tring(TR[i], 32));
    loftS(B.paint, R);
    var ROOF = 0.66;
    /* mantlet: a cast block let into the front of the cone, its face bevelled (P3, P4) */
    box(B.paint, 0.72, 1.00, -0.25, 0.25, GZ - 0.17, GZ + 0.15);
    belt(B.paint, 1.00, GZ - 0.15, 1.06, GZ + 0.10, -0.22, 0.22, 0.05);
    cylX(B.paint, 1.02, 1.18, 0, GZ, 0.13, 0.115, 16);
    /* the gun: jacket, tube, then the variant's muzzle */
    cylX(B.dark, 1.18, 1.62, 0, GZ, 0.098, 0.082, 16);
    cylX(B.dark, 1.62, 1.68, 0, GZ, 0.088, 0.088, 16);
    var tubeEnd = V.brake === "slot" ? MUZ - 0.62 : MUZ - 0.34;
    cylX(B.dark, 1.68, tubeEnd, 0, GZ, 0.068, 0.056, 14);
    if (V.evac) {
      /* bore evacuator about two-fifths of the way back from the muzzle (P2, P3, the Commons D-56T drawing) */
      cylX(B.dark, 1.94, 2.02, 0, GZ, 0.064, 0.092, 14);
      cylX(B.dark, 2.02, 2.58, 0, GZ, 0.092, 0.090, 14);
      cylX(B.dark, 2.58, 2.66, 0, GZ, 0.090, 0.060, 14);
    }
    if (V.brake === "slot") {
      /* D-56T, 1951: the long multi-slotted brake, a plain sleeve a little fatter than the tube
         with rows of narrow slots (P1, text); six rows of five slots drawn */
      cylX(B.dark, MUZ - 0.62, MUZ - 0.58, 0, GZ, 0.062, 0.076, 14);
      cylX(B.dark, MUZ - 0.58, MUZ, 0, GZ, 0.076, 0.076, 16);
      for (k = 0; k < 6; k++) {
        a = k / 6 * TAU + TAU / 12;
        for (i = 0; i < 5; i++) {
          x = MUZ - 0.52 + i * 0.10;
          slab(B.glass, [x, Math.cos(a) * 0.074, GZ + Math.sin(a) * 0.074], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)], 0.035, 0.006, 0.013);
        }
      }
    } else {
      /* double-baffle brake (P2, P3, P4): a collar, two thick baffles joined top and bottom by
         cheeks, open to the sides */
      cylX(B.dark, MUZ - 0.34, MUZ - 0.29, 0, GZ, 0.066, 0.074, 14);
      box(B.dark, MUZ - 0.29, MUZ - 0.20, -0.105, 0.105, GZ - 0.085, GZ + 0.085);
      box(B.dark, MUZ - 0.09, MUZ, -0.105, 0.105, GZ - 0.085, GZ + 0.085);
      box(B.dark, MUZ - 0.20, MUZ - 0.09, -0.07, 0.07, GZ + 0.065, GZ + 0.085);
      box(B.dark, MUZ - 0.20, MUZ - 0.09, -0.07, 0.07, GZ - 0.085, GZ - 0.065);
      cylX(B.glass, MUZ - 0.20, MUZ - 0.09, 0, GZ, 0.04, 0.04, 10);
    }
    /* coaxial MG port right of the gun, the gunner's sight aperture left of it (P4, text) */
    cylX(B.dark, 0.98, 1.10, -0.20, GZ - 0.06, 0.035, 0.03, 8);
    cylX(B.dark, 1.10, 1.16, -0.20, GZ - 0.06, 0.016, 0.016, 6);
    cylX(B.paint, 0.98, 1.04, 0.20, GZ + 0.06, 0.06, 0.06, 12);
    cylX(B.glass, 1.04, 1.05, 0.20, GZ + 0.06, 0.04, 0.04, 10);
    /* double hatch over the roof centre, its two leaves on the centre line; the commander's
       rotating cupola on its LEFT with three periscopes; the loader's MK-4 ahead of it (text) */
    box(B.paint, -0.42, 0.20, -0.48, 0.48, ROOF - 0.01, ROOF + 0.035);
    box(B.dark, -0.40, 0.18, -0.46, 0.46, ROOF + 0.035, ROOF + 0.042);
    box(B.paint, -0.38, 0.16, 0.012, 0.44, ROOF + 0.042, ROOF + 0.075);
    box(B.paint, -0.38, 0.16, -0.44, -0.012, ROOF + 0.042, ROOF + 0.075);
    for (s = -1; s <= 1; s += 2) box(B.dark, -0.06, 0.04, s * 0.42 - 0.03, s * 0.42 + 0.03, ROOF + 0.075, ROOF + 0.10);
    /* the cupola roof sets the published height: 2.195 m (1951 row), 2.325 m (PT-76B) */
    cylZ(B.paint, -0.12, 0.30, ROOF + 0.075, ROOF + 0.13, 0.22, 18);
    cylZ(B.paint, -0.12, 0.30, ROOF + 0.13, ROOF + 0.17, 0.17, 16);
    for (k = 0; k < 3; k++) {
      a = (k - 1) * 0.6;
      slab(B.paint, [-0.12 + Math.cos(a) * 0.17, 0.30 + Math.sin(a) * 0.17, ROOF + 0.15], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.04, 0.05, 0.03);
      slab(B.glass, [-0.12 + Math.cos(a) * 0.21, 0.30 + Math.sin(a) * 0.21, ROOF + 0.15], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.005, 0.04, 0.018);
    }
    box(B.paint, 0.28, 0.42, -0.36, -0.20, ROOF - 0.01, ROOF + 0.10);
    box(B.glass, 0.42, 0.425, -0.34, -0.22, ROOF + 0.04, ROOF + 0.08);
    /* ventilator on the roof rear (D1), aerial base on the left front edge with its whip (D1) */
    cylZ(B.paint, -0.55, 0.0, ROOF - 0.01, ROOF + 0.05, 0.13, 14);
    cylZ(B.dark, -0.55, 0.0, ROOF + 0.05, ROOF + 0.07, 0.10, 12);
    r = coneR(0.55, 1.35);
    cylZ(B.dark, 0.04 + Math.cos(1.35) * (r - 0.06), Math.sin(1.35) * (r - 0.06), 0.50, 0.66, 0.04, 8);
    cylZ(B.dark, 0.04 + Math.cos(1.35) * (r - 0.06), Math.sin(1.35) * (r - 0.06), 0.66, 1.45, 0.008, 5);
    /* gun-mount sight hood on the roof front, left of the gun (P3) */
    box(B.paint, 0.38, 0.62, 0.10, 0.34, ROOF - 0.05, ROOF + 0.06);
    box(B.glass, 0.62, 0.63, 0.13, 0.31, ROOF - 0.02, ROOF + 0.04);
    /* handholds round the cone wall (P2): bent bars standing off the face */
    var HA = [0.95, 1.55, 2.25, 2.75, 3.55, 4.05, 4.70, 5.30];
    for (k = 0; k < HA.length; k++) {
      a = HA[k]; r = coneR(0.42, a) + 0.05;
      slab(B.dark, [Math.cos(a) * r, Math.sin(a) * r, 0.42], [-Math.sin(a), Math.cos(a), 0], [Math.cos(a), Math.sin(a), 0], [0, 0, 1], 0.12, 0.012, 0.012);
      for (s = -1; s <= 1; s += 2) slab(B.dark, [Math.cos(a) * (r - 0.03) - Math.sin(a) * 0.12 * s, Math.sin(a) * (r - 0.03) + Math.cos(a) * 0.12 * s, 0.42], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.035, 0.012, 0.012);
    }
    /* PT-76B: the spotlight on its bracket at the right-hand front edge of the roof (P3, text) */
    if (V.lamp) {
      box(B.dark, 0.36, 0.46, -0.66, -0.56, ROOF - 0.02, ROOF + 0.04);
      cylX(B.dark, 0.34, 0.58, -0.61, ROOF + 0.11, 0.085, 0.095, 14);
      cylX(B.glass, 0.58, 0.595, -0.61, ROOF + 0.11, 0.08, 0.08, 14);
    }
    /* PT-76B: the domed cover on the cone's port rear wall (P2) */
    if (V.dome) {
      a = 2.35; r = coneR(0.34, a);
      cyl(B.paint, [Math.cos(a) * (r - 0.05), Math.sin(a) * (r - 0.05), 0.34], [Math.cos(a) * (r + 0.07), Math.sin(a) * (r + 0.07), 0.36], 0.17, 0.12, 16);
    }
  }

  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.B, T = materials(THREE, C, V), g = new THREE.Group();
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
    wg.position.set(TX, 0, V.deck);
    flush(THREE, wg, TB);
    g.add(wg);
    return g;
  }
  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent (hull 6.91 m, gun forward 7.625 m published; the rear mudflaps add
   a few centimetres behind the stern) */
UNIT_MODELS["pact_e50_lighttank"] = {
  len: 7.76,
  build: function (THREE, M, C) { return HeroPT76.build(THREE, M, C, "A"); }
};
UNIT_MODELS["pact_e60_lighttank"] = {
  len: 7.76,
  build: function (THREE, M, C) { return HeroPT76.build(THREE, M, C, "B"); }
};
