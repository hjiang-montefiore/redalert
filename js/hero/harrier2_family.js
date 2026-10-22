/* ================= harrier2_family.js  -  HERO MODEL =================
   The second-generation Harrier: McDonnell Douglas / BAe AV-8B Harrier II
   and its British cousins, one airframe in five guises:
       nato_e80_stovl    AV-8B Harrier II (USMC, 1985)      two-tone grey
       nato_e90_stovl    AV-8B Harrier II Plus (APG-65)     dark grey
       gbr_e80_cas       Harrier GR.5 (RAF)                 wraparound green
       gbr_e90_cas       Harrier GR7                        wraparound green
       gbr_e00_cfighter  Harrier GR9                        medium grey
   NOT drawn here, being a different first-generation airframe (smaller
   wing, no LERX, narrower body): GR.1/GR.3, AV-8A, Sea Harrier.

   Model space: +X nose, +Y left (port), +Z up, metres. h is height above
   the ground; the tyres stand on h = 0 (z = ZG).

   REFERENCES (Wikimedia Commons, small downloads)
     Drawing: "McDonnell Douglas AV-8B Harrier II 3-view line drawing.png"
       (574 x 385; the only scale drawing on Commons). Read by a pixel scan at
       20.58 px to the metre: nose-to-tail 290 px both in the plan and the
       profile = the published 14.12 m, plan half-span 95.8 px = 4.65 m
       (published span 9.25 m). Everything below marked "drawing" is from it.
     Photographs: GR5 ZD329 side ("British Aerospace Harrier GR5, UK - Air
       Force AN1703397"), GR7 pair on a runway ("British Aerospace Harrier
       II GR7"), GR7 and GR9 front three-quarters, a GR9 hung in a museum seen
       from below, a USMC AV-8B Plus front three-quarter at a show (WH 12)
       and its right rear three-quarter ("...Plus RSideRear SNF 30March2012"),
       a Spanish AV-8B Plus in a pure side view ("AV-8B Harrier II Plus
       spanish navy (cropped)"), a VMA-223 Plus from above ("AV-8B II
       Harrier, 5-10-26 at MCAS Cherry Point"), a USMC AV-8B from below
       ("Harrier AV-8B banking left, revealing under-fuselage section"), and
       the nozzles close up ("Harrier vectoring nozzles").
     Text: en.wikipedia "McDonnell Douglas AV-8B Harrier II" (NAVAIR and
       Nordeen figures): 14.12 m x 9.25 m x 3.55 m, shoulder wing with
       prominent anhedral, four vectorable nozzles, outrigger legs moved
       from the tip to mid-span, two fuselage stations for the GAU-12 pod
       and its ammunition pack, lift-improvement devices under the belly,
       FLIR on top of the nose from the Night Attack on, APG-65 in an
       extended nose on the Plus.

   ATTITUDE. The drawing is laid out about a datum about 6 deg nose-down of
   how the aeroplane sits. Pitched 6.25 deg nose-up about the spine at the
   intake (h 2.65 m), its own points land on what the ground photographs
   show: fin top 3.55 m (published 3.55), canopy top 3.03 (GR5 and GR7
   photographs 3.0), windscreen base 2.23 (2.2), radome tip 1.85 (1.8-1.9),
   tail-cone end 1.48 (GR7 1.5). The whole airframe is built in the
   drawing's frame and turned once (PITCH).

   RECOGNITION FEATURES (each drawn; where it rests)
     1. A deep, wide body built round the Pegasus: 2.5 m across the intake
        cowls against 0.98 m at the cockpit (drawing plan and front view;
        Cherry Point dorsal photo).
     2. A high cockpit on a short drooping nose under a big bubble canopy
        standing 0.24 m above the spine, framed windscreen (drawing profile,
        GR5 and Plus side photographs; Wikipedia: cockpit raised 10.5 in).
     3. Big semicircular side intakes, 1.17 m tall, with a thick lip and the
        auxiliary blow-in doors in a row on the cowl (drawing; GR5 and Plus
        photographs).
     4. Four swivelling nozzles on the body sides: the cold front pair under
        the cowls ahead of the wing, the hot rear pair under the wing root
        (Wikipedia; nozzle close-up; underside photograph).
     5. A one-piece shoulder wing on top of the body, LE swept 36 deg (37
        published), level over the body and 13 deg anhedral from its side,
        a long root chord with a small LERX, the tip fairing (drawing plan,
        profile and front view; Wikipedia).
     6. Bicycle gear: one nose wheel, twin main wheels on the centreline,
        and an outrigger leg under each wing at 2.66 m, stowed in a long
        fairing that runs past the trailing edge (drawing plan; Plus front
        photo; underside photo; Wikipedia).
     7. A tall swept fin with a dorsal fillet, the tail-cone boom running
        past it, a small ventral fin, and a low anhedral tailplane swept
        37 deg (drawing; GR7 and Plus rear photographs).
     8. Under the belly: the GAU-12 pod (port) and its ammunition pod
        (starboard) on the USMC rows, the plain lift-improvement strakes on
        the RAF rows (Wikipedia; underside photograph; GR photographs).
     9. Three pylons under each wing (drawing plan; underside photograph).
    10. The Plus: the big round APG-65 radome; the Plus, GR7 and GR9: the
        FLIR fairing on top of the nose ahead of the windscreen (Plus side
        and dorsal photographs, GR9 nose; Wikipedia).
   Paint: USMC day-attack two-tone grey and the Plus's dark grey (Cherry
   Point photograph); GR5 and GR7 wraparound dark green (GR5 and GR7
   photographs); GR9 medium grey (GR9 photographs). National insignia only,
   no serials or squadron marks.
   NOT drawn, because no reference here settles it: the RAF's extra
   Sidewinder pylons ahead of the outriggers, the TAV-8B, the Night Attack's
   other changes, the pitot (it would only shrink the model), stores.

   PLUS LENGTH. Wikipedia's specification block (headed AV-8B Plus) gives
   14.12 m. Measured on the pure-side Spanish Plus photograph, the radome tip
   to intake lip is 0.262 of the length against 0.236 on the day-attack
   drawing; with the rest of the airframe the same, the Plus nose is
   0.45-0.50 m longer (about 14.6 m overall), which agrees with the 47 ft
   9 in (14.55 m) often quoted. The radome is drawn 0.43 m longer.

   Merged: one mesh per material (skin, team, hot, ink, dark, metal,
   glass) and the gear one named group of three: 10 draw calls, 8
   materials. The team colour is exactly C.team.
   ================================================================== */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroHarrier2 = (function () {
  "use strict";

  var V = null;
  var D2R = Math.PI / 180;

  /* s: metres aft of the day-attack nose tip; hs: metres above the
     drawing's spine line (its level top line, y 290 px). The airframe is
     built at x = XN - s, z = Z(HP) + hs and then pitched about the pivot. */
  var XN = 7.06, ZG = -1.70, HP = 2.646, PS = 4.50, PITCH = 6.25 * D2R;
  var CP = Math.cos(PITCH), SP = Math.sin(PITCH);
  function X(s) { return XN - s; }
  function Z(h) { return h + ZG; }
  function Zd(hs) { return Z(HP) + hs; }
  /* where a drawing point (s, hs) lands after the pitch: [x, z] */
  function T(s, hs) {
    var px = PS - s, pz = hs;
    return [X(PS) + px * CP - pz * SP, Z(HP) + px * SP + pz * CP];
  }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function pl(p, k) {
    var n = p.length, i;
    if (k <= p[0][0]) return p[0][1];
    for (i = 1; i < n; i++) {
      if (k <= p[i][0]) return p[i - 1][1] + (k - p[i - 1][0]) * (p[i][1] - p[i - 1][1]) / (p[i][0] - p[i - 1][0]);
    }
    return p[n - 1][1];
  }

  var VARS = {
    A:  { id: "A",  plus: false, flir: false, gun: true,  us: true,  up: "#6c757a", lo: "#8f979b" },
    P:  { id: "P",  plus: true,  flir: true,  gun: true,  us: true,  up: "#5c6469", lo: "#666e73" },
    G5: { id: "G5", plus: false, flir: false, gun: false, us: false, up: "#4d5646", lo: "#535b4c" },
    G7: { id: "G7", plus: false, flir: true,  gun: false, us: false, up: "#4b5444", lo: "#51594a" },
    G9: { id: "G9", plus: false, flir: true,  gun: false, us: false, up: "#7a8388", lo: "#848c91", lowvis: true }
  };

  /* ========================================================= stations ==
     FOREBODY (nose and cockpit), superellipse sections:
       [s, half-width, height of max width, top, bottom]  (hs, drawing)
     The profile: nose tip 316.5 px, top 309.5/306.5/304 at 0.42/0.81/1.2 m,
     belly 320.5/322/323-325; plan half-width 0.29/0.44/0.49 at
     0.35/0.79/1.08 m, then 0.49 to the intake lip. The top under the
     canopy follows the canopy sill, which rises to the spine at 4 m. */
  var FORE = [
    [0.00, 0.035, -1.29, -1.265, -1.315],
    [0.12, 0.150, -1.27, -1.13, -1.42],
    [0.42, 0.290, -1.24, -0.95, -1.48],
    [0.81, 0.430, -1.20, -0.80, -1.55],
    [1.10, 0.480, -1.17, -0.72, -1.58],
    [1.40, 0.490, -1.15, -0.71, -1.61],
    [2.00, 0.490, -1.15, -0.69, -1.64],
    [2.50, 0.495, -1.13, -0.63, -1.65],
    [3.00, 0.505, -1.10, -0.50, -1.65],
    [3.50, 0.52, -1.05, -0.30, -1.66],
    [4.00, 0.55, -1.00, -0.08, -1.67],
    [4.50, 0.58, -0.95, 0.00, -1.68]
  ];
  /* the Plus's APG-65 radome: round, 0.43 m ahead of the day-attack tip,
     0.85-0.88 m across at its joint (Spanish Plus side photograph:
     70 px deep at 82 px/m), its axis level with the forebody's */
  var RADOME = [[-0.43, 0.030], [-0.41, 0.110], [-0.34, 0.200], [-0.20, 0.285],
                [0.00, 0.350], [0.22, 0.395], [0.48, 0.425], [0.75, 0.438]];
  var RAD_C = -1.17;

  /* CENTRE AND AFT BODY: port half sections, 12 points from the top centre
     round to the bottom centre, [y, hs]. The plan gives the cowl's outer
     line (1.12 at the lip, 1.17-1.26 from 3.7 to 5.9 m) and the lower body
     under the wing (0.97 to 7.2 m, 0.87 to 9 m, then 0.73, 0.63, 0.58,
     0.51, 0.42, 0.34, 0.24, 0.19 at 9.1-13 m); the profile the belly (323-
     325 px to 7 m, rising through 322/321/317/316/314.5/312.5/311/309/307
     at 8.2-13 m) and the intake mouth (298-322 px tall, 1.17 m). The first
     section is the intake lip: the gap between it and the forebody, which
     runs on inside, is the D-shaped mouth. */
  var BODY = [
    [3.42, [[0, -0.38], [0.26, -0.40], [0.46, -0.33], [0.80, -0.36], [1.06, -0.52], [1.20, -0.82],
            [1.20, -1.14], [1.08, -1.43], [0.82, -1.60], [0.48, -1.63], [0.26, -1.66], [0, -1.67]]],
    [3.75, [[0, -0.26], [0.30, -0.28], [0.56, -0.24], [0.86, -0.31], [1.09, -0.49], [1.21, -0.79],
            [1.21, -1.12], [1.10, -1.40], [0.87, -1.58], [0.58, -1.64], [0.28, -1.67], [0, -1.68]]],
    [4.15, [[0, -0.09], [0.32, -0.12], [0.60, -0.15], [0.86, -0.27], [1.08, -0.48], [1.21, -0.78],
            [1.21, -1.09], [1.12, -1.37], [0.90, -1.57], [0.60, -1.65], [0.28, -1.68], [0, -1.69]]],
    [4.65, [[0, 0.00], [0.32, -0.02], [0.62, -0.08], [0.89, -0.22], [1.10, -0.45], [1.24, -0.78],
            [1.25, -1.09], [1.16, -1.37], [0.94, -1.57], [0.62, -1.66], [0.28, -1.69], [0, -1.70]]],
    [5.40, [[0, -0.16], [0.32, -0.17], [0.62, -0.20], [0.90, -0.28], [1.11, -0.44], [1.25, -0.78],
            [1.26, -1.09], [1.16, -1.37], [0.94, -1.57], [0.62, -1.66], [0.28, -1.69], [0, -1.70]]],
    [6.20, [[0, -0.22], [0.34, -0.23], [0.64, -0.26], [0.90, -0.33], [1.07, -0.45], [1.15, -0.78],
            [1.14, -1.08], [1.05, -1.36], [0.88, -1.55], [0.60, -1.65], [0.28, -1.68], [0, -1.69]]],
    [7.00, [[0, -0.20], [0.34, -0.21], [0.62, -0.24], [0.85, -0.31], [0.99, -0.45], [1.03, -0.78],
            [1.02, -1.08], [0.95, -1.34], [0.81, -1.52], [0.58, -1.61], [0.28, -1.64], [0, -1.65]]],
    [8.00, [[0, -0.14], [0.33, -0.15], [0.58, -0.18], [0.78, -0.28], [0.91, -0.45], [0.95, -0.75],
            [0.93, -1.02], [0.86, -1.27], [0.74, -1.45], [0.54, -1.54], [0.26, -1.57], [0, -1.58]]],
    [9.00, [[0, -0.05], [0.30, -0.06], [0.52, -0.11], [0.68, -0.23], [0.78, -0.42], [0.80, -0.70],
            [0.78, -0.96], [0.72, -1.20], [0.62, -1.38], [0.46, -1.47], [0.23, -1.51], [0, -1.52]]],
    [10.0, [[0, -0.03], [0.26, -0.05], [0.44, -0.10], [0.57, -0.21], [0.62, -0.38], [0.63, -0.60],
            [0.61, -0.82], [0.56, -1.02], [0.48, -1.18], [0.36, -1.27], [0.18, -1.31], [0, -1.32]]],
    [11.0, [[0, -0.04], [0.22, -0.06], [0.37, -0.11], [0.47, -0.20], [0.51, -0.35], [0.52, -0.55],
            [0.50, -0.75], [0.46, -0.93], [0.39, -1.07], [0.29, -1.15], [0.15, -1.19], [0, -1.20]]],
    [12.0, [[0, -0.05], [0.17, -0.07], [0.28, -0.11], [0.35, -0.19], [0.38, -0.31], [0.38, -0.47],
            [0.37, -0.63], [0.33, -0.78], [0.28, -0.90], [0.21, -0.97], [0.11, -1.01], [0, -1.02]]],
    [13.0, [[0, -0.06], [0.12, -0.07], [0.19, -0.11], [0.23, -0.17], [0.25, -0.27], [0.25, -0.40],
            [0.24, -0.52], [0.22, -0.63], [0.18, -0.72], [0.13, -0.78], [0.07, -0.82], [0, -0.83]]],
    [13.55, [[0, -0.07], [0.10, -0.08], [0.16, -0.11], [0.19, -0.16], [0.21, -0.23], [0.21, -0.31],
             [0.20, -0.39], [0.18, -0.46], [0.15, -0.52], [0.11, -0.56], [0.06, -0.58], [0, -0.59]]]
  ];

  /* ============================================================ helpers == */
  function cr1(p0, p1, p2, p3, t) {
    var t2 = t * t, t3 = t2 * t;
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
      + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }
  function resample(tab, n) {
    var m = tab.length, cols = tab[0].length, out = [], i, c;
    for (i = 0; i < n; i++) {
      var u = i / (n - 1) * (m - 1), k = Math.min(m - 2, Math.floor(u)), t = u - k, row = [];
      for (c = 0; c < cols; c++) {
        row.push(cr1(tab[Math.max(0, k - 1)][c], tab[k][c], tab[k + 1][c], tab[Math.min(m - 1, k + 2)][c], t));
      }
      out.push(row);
    }
    return out;
  }
  function bridge(rings, capA, capB, open) {
    var nr = rings.length, N = rings[0].length, pos = [], idx = [], i, j;
    for (i = 0; i < nr; i++) for (j = 0; j < N; j++) pos.push(rings[i][j][0], rings[i][j][1], rings[i][j][2]);
    var lim = open ? N - 1 : N;
    for (i = 0; i < nr - 1; i++) {
      for (j = 0; j < lim; j++) {
        var a = i * N + j, b = i * N + (j + 1) % N, c = a + N, d = b + N;
        idx.push(a, c, b, b, c, d);
      }
    }
    function cap(r, first) {
      var cx = 0, cy = 0, cz = 0, base = pos.length / 3, k;
      for (k = 0; k < N; k++) { cx += r[k][0]; cy += r[k][1]; cz += r[k][2]; }
      pos.push(cx / N, cy / N, cz / N);
      for (k = 0; k < N; k++) pos.push(r[k][0], r[k][1], r[k][2]);
      for (k = 0; k < N; k++) {
        var p = base + 1 + k, q = base + 1 + (k + 1) % N;
        if (first) idx.push(base, p, q); else idx.push(base, q, p);
      }
    }
    if (capA) cap(rings[0], true);
    if (capB) cap(rings[nr - 1], false);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function orient(g) {
    var p = g.attributes.position.array, ix = g.index.array, v = 0, t;
    for (t = 0; t < ix.length; t += 3) {
      var a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
      v += p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
         - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
         + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c]);
    }
    if (v < 0) {
      for (t = 0; t < ix.length; t += 3) { var s = ix[t + 1]; ix[t + 1] = ix[t + 2]; ix[t + 2] = s; }
      g.index.needsUpdate = true;
      g.computeVertexNormals();
    }
    return g;
  }
  function yt(f, tc) {
    return tc * (1.4845 * Math.sqrt(f) - 0.6300 * f - 1.7580 * f * f + 1.4215 * f * f * f - 0.5075 * f * f * f * f);
  }
  /* aerofoil ring at span station y, chord plane at height zm (built z) */
  function foil(sLE, sTE, y, zm, tc, m, grow, inc) {
    var p = [], i, f, chord = sTE - sLE, g = grow || 0, pad = g ? 0.02 : 0, di = inc || 0;
    var xl = X(sLE) + g, c = chord + 2 * g;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, zm + (f - 0.5) * di + yt(f, tc) * c + (i === 0 ? 0.004 : 0) + pad]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      p.push([xl - f * c, y, zm + (f - 0.5) * di - yt(f, tc) * c - pad]);
    }
    return p;
  }
  /* aerofoil ring in a horizontal plane (fin, pylons, strakes): thickness
     along y about yc, at built height z */
  function foilH(sLE, sTE, z, yc, tc, m, grow) {
    var p = [], i, f, g = grow || 0, c = sTE - sLE + 2 * g, xl = X(sLE) + g, th;
    for (i = 0; i <= m; i++) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      th = Math.max(yt(f, tc) * c, 0.004) + (g ? 0.02 : 0);
      p.push([xl - f * c, yc + th, z]);
    }
    for (i = m - 1; i >= 1; i--) {
      f = 0.5 * (1 + Math.cos(Math.PI * i / m));
      th = Math.max(yt(f, tc) * c, 0.004) + (g ? 0.02 : 0);
      p.push([xl - f * c, yc - th, z]);
    }
    return p;
  }
  function mirrorRings(rings) {
    return rings.map(function (r) { return r.map(function (q) { return [q[0], -q[1], q[2]]; }); });
  }
  /* superellipse section in the y-z plane: half-width w at height zw, top
     zt, bottom zb; e is the exponent (2 = ellipse, larger = squarer) */
  function seRing(x, yc, zw, w, zt, zb, n, eu, el) {
    var p = [], i, a, c, s, e;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2; c = Math.cos(a); s = Math.sin(a);
      e = s >= 0 ? eu : el;
      p.push([x, yc + w * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), 2 / e),
              zw + (s >= 0 ? (zt - zw) : (zw - zb)) * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), 2 / e)]);
    }
    return p;
  }
  function circ(x, yc, zc, r, n) { return seRing(x, yc, zc, r, zc + r, zc - r, n, 2, 2); }
  var _m4 = null, _q = null, _v = null, _u = null;
  function boxG(sx, sy, sz, x, y, z) {
    var g = new V.BoxGeometry(sx, sy, sz);
    g.translate(x, y, z);
    return g;
  }
  function rod(a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
    var g = new V.CylinderGeometry(r, r, L, seg || 8);
    _q.setFromUnitVectors(_u.set(0, 1, 0), _v.set(dx / L, dy / L, dz / L));
    _m4.makeRotationFromQuaternion(_q);
    _m4.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    g.applyMatrix4(_m4);
    return g;
  }
  /* a round tube along a polyline (no caps): lips, frames, rails */
  function tube(path, r, seg) {
    var rings = [], i, k, n = path.length;
    for (i = 0; i < n; i++) {
      var a = path[Math.max(0, i - 1)], b = path[Math.min(n - 1, i + 1)];
      var tx = b[0] - a[0], ty = b[1] - a[1], tz = b[2] - a[2], tl = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1;
      tx /= tl; ty /= tl; tz /= tl;
      /* a side vector: across the tangent, from whichever axis is least parallel */
      var ax = Math.abs(tx) < 0.7 ? [1, 0, 0] : [0, 0, 1];
      var ux = ty * ax[2] - tz * ax[1], uy = tz * ax[0] - tx * ax[2], uz = tx * ax[1] - ty * ax[0];
      var ul = Math.sqrt(ux * ux + uy * uy + uz * uz) || 1; ux /= ul; uy /= ul; uz /= ul;
      var wx = ty * uz - tz * uy, wy = tz * ux - tx * uz, wz = tx * uy - ty * ux, ring = [];
      for (k = 0; k < seg; k++) {
        var c = Math.cos(k / seg * Math.PI * 2) * r, s = Math.sin(k / seg * Math.PI * 2) * r;
        ring.push([path[i][0] + ux * c + wx * s, path[i][1] + uy * c + wy * s, path[i][2] + uz * c + wz * s]);
      }
      rings.push(ring);
    }
    return bridge(rings, false, false);
  }
  function wheelG(r, w, x, y, z, seg) {
    var g = new V.CylinderGeometry(r, r, w, seg || 18);
    g.translate(x, y, z);
    return g;
  }
  /* a drawing point in built (pre-pitch) coordinates */
  function P3(s, y, hs) { return [X(s), y, Zd(hs)]; }

  /* ============================================================== paint ==
     One sheet, four plan views at 56 px to the metre, as on the F-35 hero:
     from above, from port, from starboard, from below. Every skin triangle
     takes its UVs by projection into the band its normal faces (projUV), in
     final (pitched) model metres. */
  var PXM = 56, XMIN = -8.0, TW = 1024;
  var YMAX = 4.90, TOPH = 549, ZTOP = 2.05, SIDEH = 214;
  var TH = 1536, B_PORT = TOPH, B_STBD = TOPH + SIDEH, B_BOT = TOPH + 2 * SIDEH;
  function cu(x) { return clamp((x - XMIN) * PXM, 1, TW - 1); }
  function rTop(y) { return clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rBot(y) { return B_BOT + clamp((YMAX - y) * PXM, 1, TOPH - 1); }
  function rSide(z, stbd) { return (stbd ? B_STBD : B_PORT) + clamp((ZTOP - z) * PXM, 1, SIDEH - 1); }
  var LINE = "rgba(30,36,40,0.55)";
  var _tex = {};

  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function trace(g, pts, col, lw) {
    var i;
    g.strokeStyle = col; g.lineWidth = lw;
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.stroke();
  }
  function disc(g, u, v, r, col) {
    g.fillStyle = col; g.beginPath(); g.arc(u, v, r, 0, Math.PI * 2); g.closePath(); g.fill();
  }
  /* national insignia, as the F-35 hero draws them: the US low-visibility
     star-and-bar a shade off the skin; the RAF roundel as photographed,
     dull red and blue on the green GR5/GR7, pale on the grey GR9 */
  function insignia(g, u, v, r, v0) {
    var i, a;
    if (!v0.us) {
      if (v0.lowvis) {
        disc(g, u, v, r, "rgba(120,140,170,0.80)"); disc(g, u, v, r * 0.45, "rgba(196,120,124,0.85)");
      } else {
        disc(g, u, v, r, "rgba(34,44,92,0.92)"); disc(g, u, v, r * 0.48, "rgba(150,34,36,0.92)");
      }
      return;
    }
    disc(g, u, v, r, "rgba(88,96,102,0.72)");
    g.fillStyle = "rgba(88,96,102,0.72)";
    g.fillRect(u - r * 2.0, v - r * 0.32, r * 4.0, r * 0.64);
    g.fillStyle = "rgba(160,166,170,0.62)";
    g.beginPath();
    for (i = 0; i < 10; i++) {
      a = -Math.PI / 2 + i * Math.PI / 5;
      var rr = i % 2 ? r * 0.38 : r * 0.92;
      if (i === 0) g.moveTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
      else g.lineTo(u + rr * Math.cos(a), v + rr * Math.sin(a));
    }
    g.closePath(); g.fill();
  }

  function paintSheet(v) {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d");
    var R = rngFor(7300 + v.id.charCodeAt(0) * 7 + (v.id.charCodeAt(1) || 0));
    var i, k, y, sd, ys, band;
    /* top/bottom views: (s, y) of a point on the wing or spine. The upper
       wing sits about at the spine, the lower surface 1.6 m down in front */
    function tp(s, yy, bot) {
      var hs = bot ? -1.0 : -0.1 - 0.21 * Math.abs(yy);
      return [cu(T(s, hs)[0]), bot ? rBot(yy) : rTop(yy)];
    }
    function sp(s, hs, stbd) { var q = T(s, hs); return [cu(q[0]), rSide(q[1], stbd)]; }

    g.fillStyle = v.up; g.fillRect(0, 0, TW, B_PORT + 2 * SIDEH);
    g.fillStyle = v.lo; g.fillRect(0, B_BOT, TW, TOPH);
    /* the two-tone sides: the lower colour below the chine line */
    if (v.up !== v.lo) {
      for (k = 0; k < 2; k++) {
        var top0 = k ? B_STBD : B_PORT;
        g.fillStyle = v.lo;
        g.beginPath();
        for (i = 0; i <= 28; i++) {
          var s0 = -0.5 + i * 0.55, q = sp(s0, -0.95 + 0.04 * Math.max(0, s0 - 9), k === 1);
          if (i === 0) g.moveTo(q[0], q[1]); else g.lineTo(q[0], q[1]);
        }
        g.lineTo(TW, top0 + SIDEH); g.lineTo(0, top0 + SIDEH); g.closePath(); g.fill();
      }
    }
    /* weathering: a faint mottle */
    var bands = [[0, TOPH], [B_PORT, SIDEH], [B_STBD, SIDEH], [B_BOT, TOPH]];
    for (k = 0; k < 4; k++) {
      for (i = 0; i < (k === 0 || k === 3 ? 26 : 10); i++) {
        disc(g, R() * TW, bands[k][0] + R() * bands[k][1], 12 + R() * 34,
             R() < 0.5 ? "rgba(40,46,40,0.08)" : "rgba(170,176,170,0.07)");
      }
    }

    /* wing and tailplane, both views: LE line, flaps, ailerons, tip */
    for (band = 0; band < 2; band++) {
      for (sd = -1; sd <= 1; sd += 2) {
        ys = []; for (y = 1.3; y <= 4.6; y += 0.2) ys.push(y);
        trace(g, ys.map(function (yy) { return tp(wLE(yy) + 0.16, sd * yy, band); }), LINE, 1.2);
        /* inboard flap to 2.62 m, aileron outboard of it */
        trace(g, ys.filter(function (yy) { return yy <= 2.62; }).map(function (yy) {
          return tp(wTE(yy) - 0.62, sd * yy, band); }), LINE, 1.3);
        trace(g, ys.filter(function (yy) { return yy >= 2.62; }).map(function (yy) {
          return tp(wTE(yy) - 0.45, sd * yy, band); }), LINE, 1.3);
        trace(g, [tp(wTE(2.62) - 0.62, sd * 2.62, band), tp(wTE(2.62), sd * 2.62, band)], LINE, 1.3);
        trace(g, [tp(wTE(1.30) - 0.62, sd * 1.30, band), tp(wTE(1.30), sd * 1.30, band)], LINE, 1.1);
        /* tailplane elevator-less slab: a pivot line */
        trace(g, [tp(12.30, sd * 0.40, band), tp(12.95, sd * 1.90, band)], LINE, 1.0);
      }
    }

    /* ---- from above ---- */
    function ST(s0, s1, a, b, lw, col) {
      var p0 = tp(s0, a, 0), p1 = tp(s1, b, 0);
      g.strokeStyle = col || LINE; g.lineWidth = lw || 1.2;
      g.strokeRect(Math.min(p0[0], p1[0]), Math.min(p0[1], p1[1]), Math.abs(p1[0] - p0[0]), Math.abs(p1[1] - p0[1]));
    }
    ST(4.70, 5.80, -0.32, 0.32, 1.2);                     /* the engine-change access panel */
    ST(9.10, 10.90, -0.28, 0.28, 1.1);
    for (sd = -1; sd <= 1; sd += 2) {
      trace(g, [tp(3.45, sd * 1.05, 0), tp(5.60, sd * 1.22, 0)], LINE, 1.0);   /* cowl seams */
    }
    /* insignia on the upper wing: US on the port wing only, RAF both */
    insignia(g, tp(wTE(3.55) - 0.75, 3.55, 0)[0], rTop(3.55), 20, v);
    if (!v.us) insignia(g, tp(wTE(3.55) - 0.75, -3.55, 0)[0], rTop(-3.55), 20, v);

    /* ---- from below ---- */
    function SB(s0, s1, a, b, lw, col) {
      var p0 = tp(s0, a, 1), p1 = tp(s1, b, 1);
      g.strokeStyle = col || LINE; g.lineWidth = lw || 1.2;
      g.strokeRect(Math.min(p0[0], p1[0]), Math.min(p0[1], p1[1]), Math.abs(p1[0] - p0[0]), Math.abs(p1[1] - p0[1]));
    }
    SB(2.75, 3.95, -0.24, 0.24, 1.4);                     /* nose gear well */
    SB(7.75, 10.00, -0.30, 0.30, 1.4);                    /* main gear well */
    SB(10.20, 11.30, -0.34, 0.34, 1.3);                   /* the ventral airbrake */
    if (v.us) insignia(g, tp(wTE(3.55) - 0.75, -3.55, 1)[0], rBot(-3.55), 20, v);
    else { insignia(g, tp(wTE(3.55) - 0.75, -3.55, 1)[0], rBot(-3.55), 18, v);
           insignia(g, tp(wTE(3.55) - 0.75, 3.55, 1)[0], rBot(3.55), 18, v); }

    /* ---- the sides ---- */
    for (k = 0; k < 2; k++) {
      var sg = k === 1;
      trace(g, [sp(3.46, -0.42, sg), sp(3.50, -1.58, sg)], LINE, 1.5);            /* intake lip */
      /* the auxiliary blow-in doors: a row of four on the cowl */
      g.fillStyle = "rgba(20,24,26,0.78)";
      for (i = 0; i < 4; i++) {
        var dq = sp(3.92, -0.50 - i * 0.24, sg);
        g.fillRect(dq[0] - 6, dq[1] - 5, 12, 10);
      }
      trace(g, [sp(1.10, -0.73, sg), sp(1.10, -1.57, sg)], LINE, 1.1);             /* nose bay joint */
      trace(g, [sp(0.62, -0.93, sg), sp(0.62, -1.50, sg)], LINE, 1.0);
      trace(g, [sp(1.25, -1.05, sg), sp(3.10, -1.05, sg)], LINE, 0.9);             /* avionics bay doors */
      trace(g, [sp(1.25, -1.05, sg), sp(1.25, -1.45, sg), sp(3.10, -1.45, sg), sp(3.10, -1.05, sg)], LINE, 0.9);
      trace(g, [sp(5.90, -1.30, sg), sp(8.80, -1.30, sg)], LINE, 0.9);
      trace(g, [sp(9.20, -0.18, sg), sp(13.20, -0.40, sg)], LINE, 0.9);
      trace(g, [sp(10.40, -0.25, sg), sp(10.40, -1.25, sg)], LINE, 0.9);
      trace(g, [sp(12.10, -0.12, sg), sp(12.10, -0.95, sg)], LINE, 0.9);
      /* exhaust staining behind the hot nozzles */
      for (i = 0; i < 7; i++) {
        var hq = sp(7.75 + i * 0.25, -1.30 - i * 0.02, sg);
        disc(g, hq[0], hq[1], 14 - i, "rgba(30,28,24," + (0.20 - i * 0.022).toFixed(3) + ")");
      }
      /* insignia on the intake cowl */
      var iq = sp(4.55, -0.95, sg);
      insignia(g, iq[0], iq[1], v.us ? 13 : 15, v);
    }
    var tex = new V.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = V.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    if (V.sRGBEncoding !== undefined) tex.encoding = V.sRGBEncoding;
    return tex;
  }
  function sheet(v) {
    if (_tex[v.id] !== undefined) return _tex[v.id];
    try { _tex[v.id] = paintSheet(v); } catch (e) { _tex[v.id] = false; }
    return _tex[v.id];
  }
  function projUV(geo) {
    var p = geo.attributes.position.array, uv = new Float32Array(p.length / 3 * 2), t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.5 ? 0 : nz < -0.5 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > 0.8;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], yy = p[t + 3 * k + 1], z = p[t + 3 * k + 2], U, Rr;
        U = cu(endOn ? x + yy : x);
        if (band === 0) Rr = rTop(yy);
        else if (band === 3) Rr = rBot(yy);
        else Rr = rSide(z, band === 2);
        uv[(t / 3 + k) * 2] = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - Rr / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  function makeMats(C, v) {
    var tex = sheet(v), m = {};
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84, metalness: 0.08, side: V.DoubleSide });
    if (tex) m.skin.map = tex; else m.skin.color.set(v.up);
    var tc = (C && C.team !== undefined) ? C.team : "#3f7fd0";
    m.team = new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.60, metalness: 0.12,
                                          emissive: new V.Color(tc), emissiveIntensity: 0.10 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5d6468, roughness: 0.48, metalness: 0.60 });
    m.hot = new V.MeshStandardMaterial({ color: 0x45403a, roughness: 0.60, metalness: 0.45, side: V.DoubleSide });
    m.ink = new V.MeshStandardMaterial({ color: 0x060708, roughness: 0.95, metalness: 0.03, side: V.DoubleSide });
    m.tyre = new V.MeshStandardMaterial({ color: 0x131414, roughness: 0.95, metalness: 0.02 });
    m.dark = new V.MeshStandardMaterial({ color: 0x17191b, roughness: 0.70, metalness: 0.30 });
    m.glass = new V.MeshStandardMaterial({ color: 0x2a3640, roughness: 0.10, metalness: 0.55,
                                           transparent: true, opacity: 0.80, side: V.DoubleSide });
    return m;
  }

  /* ============================================================ the wing ==
     Drawing plan (bottom view): LE 36.4 deg from 2.19 m out at 6.47 m aft
     to the tip at 8.30, a small LERX ahead of it on the cowl from 5.45 m;
     TE straight across at 8.95 m to 2.62 m out (the flap), then swept back
     to 9.27 at the tip; tip 4.62-4.66 m out with its fairing (drawn to
     4.64: span 9.28 m against the published 9.25). One piece over the body,
     its upper surface the dorsal line (profile y 290): level over the body
     to 0.8 m out, then 13 deg anhedral (the profile drops the tip to
     308-313 px; the front view reads 13-15 deg on its top edge, which
     includes the thickness taper). */
  var WLE = [[0.00, 5.10], [0.60, 5.22], [1.00, 5.36], [1.26, 5.50], [1.46, 5.74], [1.66, 6.00],
             [2.19, 6.47], [4.37, 8.08], [4.62, 8.30]];
  var WTE = [[0.00, 8.95], [2.62, 8.95], [4.62, 9.27]];
  function wLE(y) { return pl(WLE, Math.abs(y)); }
  function wTE(y) { return pl(WTE, Math.abs(y)); }
  var ANH = 13 * D2R, W0 = -0.18, YF = 0.80;
  /* chord plane at mid-chord, hs: level over the body, anhedral from its side */
  function wz(y) { return W0 - Math.max(0, Math.abs(y) - YF) * Math.tan(ANH); }
  /* the root's incidence against the drawing datum: its TE stands 0.24 m
     above its LE (so the TE meets the level aft spine, as the profile
     shows; pitched, the chord is 2.5 deg nose-up on the ground), washing
     out to 0.06 m at the tip */
  function winc(y) { return 0.24 - 0.18 * clamp(Math.abs(y) / 4.62, 0, 1); }
  function wtc(y) { return 0.115 - 0.040 * clamp(Math.abs(y) / 4.62, 0, 1); }
  var WY = [0.00, 0.50, 0.80, 1.10, 1.46, 1.80, 2.19, 2.62, 3.30, 3.90, 4.37, 4.60];
  function addWings(K, v) {
    var r = [], i, y;
    for (i = 0; i < WY.length; i++) {
      y = WY[i];
      r.push(foil(wLE(y), wTE(y), y, Zd(wz(y)), wtc(y), 10, 0, winc(y)));
    }
    /* the tip fairing: rounded, a little proud of the chord */
    var tipY = 4.64, tl = wLE(4.60) + 0.10, tt = wTE(4.60) - 0.06;
    r.push(foil(tl, tt, tipY, Zd(wz(4.64)), 0.07, 10, 0, winc(4.64)));
    K.skin.push(orient(bridge(r, false, true)));
    K.skin.push(orient(bridge(mirrorRings(r), false, true)));
  }

  /* tailplane: drawing LE from 0.39 m out at 11.72 m aft, swept 36.7 deg to
     the tip at 2.14 m (13.03-13.47), TE 13.19 at the root; root chord plane
     at profile y 296, anhedral 13.5 deg (profile tip at y 305) */
  function tLE(y) { return 11.62 + Math.max(0, y - 0.25) * 0.745; }
  function tTE(y) { return 13.19 + Math.max(0, y - 0.30) * 0.17; }
  function addTail(K, v) {
    var ys = [0.15, 0.50, 1.00, 1.50, 1.95, 2.10], r = [], i, y, th = 13.5 * D2R;
    for (i = 0; i < ys.length; i++) {
      y = ys[i];
      var le = tLE(y), te = tTE(y);
      if (y > 1.95) { le += 0.18; te -= 0.06; }
      r.push(foil(le, te, y, Zd(-0.30 - (y - 0.15) * Math.tan(th)), 0.065 - 0.015 * y / 2.1, 8));
    }
    K.skin.push(orient(bridge(r, true, true)));
    K.skin.push(orient(bridge(mirrorRings(r), true, true)));

    /* fin: drawing LE from the dorsal fillet at 10.3 m to 11.5 m at 0.44 m
       above the spine, then straight to the top, 1.90 m, at 13.3 m; TE
       13.45 at the root to 13.62 at the top (the rudder) */
    function fLE(h) { return h < 0.44 ? 10.30 + (h + 0.06) / 0.50 * 1.20 : 11.50 + (h - 0.44) * 1.241; }
    function fTE(h) { return 13.45 + (h + 0.06) / 1.96 * 0.17; }
    var hs = [-0.16, 0.10, 0.44, 1.00, 1.55, 1.78, 1.865], fr = [];
    for (i = 0; i < hs.length; i++) {
      var h = hs[i], le2 = fLE(h), te2 = fTE(h);
      if (h >= 1.86) { le2 = 13.30; te2 = 13.60; }
      fr.push(foilH(le2, te2, Zd(h), 0, h < 0.3 ? 0.07 : 0.055, 8));
    }
    K.skin.push(orient(bridge(fr, true, true)));
    /* team colour: a band round the fin top */
    var tr = [];
    [1.56, 1.72, 1.865].forEach(function (h) {
      var a = fLE(h), b = fTE(h);
      if (h >= 1.86) { a = 13.30; b = 13.60; }
      tr.push(foilH(a, b, Zd(h), 0, 0.055, 8, 0.015));
    });
    K.team.push(orient(bridge(tr, true, true)));

    /* ventral fin under the tail: profile 304-318 px, 12.0-13.2 m */
    var vr = [], vh = [-0.86, -1.05, -1.22, -1.31];
    for (i = 0; i < vh.length; i++) {
      var f = i / (vh.length - 1);
      vr.push(foilH(12.05 + f * 0.55, 13.20 - f * 0.10, Zd(vh[i]), 0, 0.06, 6));
    }
    K.skin.push(orient(bridge(vr, true, true)));
  }

  /* ============================================================ the body = */
  function ctrlRing(s, half) {
    var out = [], i;
    for (i = 0; i < half.length; i++) out.push([X(s), half[i][0], Zd(half[i][1])]);
    for (i = half.length - 2; i >= 1; i--) out.push([X(s), -half[i][0], Zd(half[i][1])]);
    return out;
  }
  function addBody(K, v) {
    var i, rings = [], sec;
    /* forebody: day-attack nose, or the Plus's radome joined to it */
    var fore = FORE;
    if (v.plus) fore = FORE.filter(function (r) { return r[0] >= 1.10; });
    sec = resample(fore, v.plus ? 12 : 19);
    if (v.plus) {
      var rad = resample(RADOME, 10);
      for (i = 0; i < rad.length; i++) rings.push(circ(X(rad[i][0]), 0, Zd(RAD_C - 0.03 * (0.75 - rad[i][0])), rad[i][1], 24));
      rings.push(seRing(X(0.95), 0, Zd(-1.17), 0.462, Zd(-0.745), Zd(-1.585), 24, 2.4, 2.6));
    }
    for (i = 0; i < sec.length; i++) {
      var q = sec[i], eu = q[0] < 1.0 ? 2.0 + q[0] * 0.4 : 2.4, el = q[0] < 1.0 ? 2.0 : 2.0 + clamp(q[0] - 2.8, 0, 1) * 0.5;
      rings.push(seRing(X(q[0]), 0, Zd(q[2]), q[1], Zd(q[3]), Zd(q[4]), 24, eu, el));
    }
    K.skin.push(orient(bridge(rings, true, true)));
    /* the nose tip's tracker window (ARBS on the AV-8B, the GR's laser
       tracker): a dark disc on the point */
    if (!v.plus) {
      var w = new V.SphereGeometry(0.075, 10, 6);
      w.scale(0.5, 1, 1); w.translate(X(0.01), 0, Zd(-1.29));
      K.ink.push(w);
    }

    /* centre and aft body from the intake lips; front open = the mouths */
    var tab = BODY.map(function (b) {
      var row = [b[0]];
      b[1].forEach(function (p) { row.push(p[0], p[1]); });
      return row;
    });
    sec = resample(tab, 31);
    rings = [];
    for (i = 0; i < sec.length; i++) {
      var half = [];
      for (var j = 0; j < 12; j++) half.push([sec[i][1 + 2 * j], sec[i][2 + 2 * j]]);
      rings.push(ctrlRing(sec[i][0], half));
    }
    K.skin.push(bridge(rings, false, true));
    /* the duct face: a dark plate 0.45 m inside each mouth */
    for (var sd = -1; sd <= 1; sd += 2) {
      var pts = [], k, n = 16;
      for (k = 0; k <= n; k++) {
        var a = -Math.PI / 2 + Math.PI * k / n;
        pts.push([X(3.95), sd * (0.46 + 0.68 * Math.cos(a)), Zd(-0.98 + 0.62 * Math.sin(a))]);
      }
      var pos = [], idx = [];
      var cx = X(3.95), cy = sd * 0.56, cz = Zd(-0.98);
      pos.push(cx, cy, cz);
      for (k = 0; k <= n; k++) pos.push(pts[k][0], pts[k][1], pts[k][2]);
      for (k = 1; k <= n; k++) idx.push(0, k, k + 1);
      idx.push(0, n + 1, 1);
      var pg = new V.BufferGeometry();
      pg.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
      pg.setIndex(idx); pg.computeVertexNormals();
      K.ink.push(pg);
      /* the compressor face's spinner seen down the duct */
      var sp = new V.SphereGeometry(0.16, 10, 6);
      sp.scale(0.6, 1, 1); sp.translate(X(3.91), sd * 0.52, Zd(-0.98));
      K.metal.push(sp);
      /* the thick intake lip: a rounded tube round the D */
      var lip = [];
      for (k = 0; k <= 14; k++) {
        var b2 = -Math.PI / 2 + Math.PI * k / 14;
        lip.push([X(3.44 + 0.05 * (1 - Math.sin(b2))), sd * (0.46 + 0.71 * Math.cos(b2)), Zd(-0.98 + 0.645 * Math.sin(b2))]);
      }
      K.skin.push(tube(lip, 0.06, 7));
      /* the boundary-layer splitter on the body side */
      K.skin.push(boxG(0.55, 0.03, 1.20, X(3.66), sd * 0.47, Zd(-0.98)));
    }

    /* the tail-cone boom past the fin, with its reaction-control fairing
       (profile y 289-296 at 13.4-14.1 m; plan half-width 0.19) */
    var boom = [[13.20, 0.20], [13.55, 0.19], [13.80, 0.18], [13.98, 0.165], [14.07, 0.12], [14.12, 0.05]];
    var br = boom.map(function (b) { return circ(X(b[0]), 0, Zd(-0.13), b[1], 16); });
    K.skin.push(orient(bridge(br, true, true)));
    var cap = new V.CylinderGeometry(0.06, 0.06, 0.02, 10);
    cap.rotateZ(Math.PI / 2); cap.translate(X(14.12), 0, Zd(-0.13));
    K.ink.push(cap);

    /* the FLIR fairing on the nose ahead of the windscreen (Plus, GR7, GR9) */
    if (v.flir) {
      var fl = [[0.70, 0.06, 0.03], [0.82, 0.15, 0.13], [1.00, 0.18, 0.19], [1.25, 0.18, 0.20], [1.45, 0.15, 0.14]];
      var fr = fl.map(function (f) {
        var top = pl([[0.42, -0.95], [0.81, -0.80], [1.10, -0.72], [1.40, -0.71]], f[0]);
        return seRing(X(f[0]), 0, Zd(top - 0.05), f[1], Zd(top + f[2]), Zd(top - 0.10), 14, 2.6, 2.0);
      });
      K.skin.push(orient(bridge(fr, true, true)));
      var win = new V.BoxGeometry(0.03, 0.20, 0.13);
      win.rotateY(-35 * D2R); win.translate(X(0.79), 0, Zd(-0.72));
      K.ink.push(win);
    }

    /* ventral: gun and ammunition pods (USMC), plain strakes (RAF) */
    for (sd = -1; sd <= 1; sd += 2) {
      if (v.gun) {
        var pod = [[4.95, 0.05, 0.06], [5.10, 0.14, 0.16], [5.40, 0.19, 0.21], [6.00, 0.20, 0.22],
                   [7.60, 0.20, 0.22], [8.00, 0.17, 0.18], [8.25, 0.08, 0.08]];
        var prs = pod.map(function (p) {
          return seRing(X(p[0]), sd * 0.50, Zd(-1.90), p[1], Zd(-1.90 + p[2] + 0.03), Zd(-1.90 - p[2]), 14, 2.6, 2.4);
        });
        K.skin.push(orient(bridge(prs, true, true)));
        if (sd > 0) {      /* the GAU-12's muzzle, port pod */
          var mz = new V.CylinderGeometry(0.05, 0.05, 0.10, 8);
          mz.rotateZ(Math.PI / 2); mz.translate(X(4.98), 0.50, Zd(-1.93));
          K.ink.push(mz);
        }
      } else {
        var st = [];
        [-1.66, -1.80, -1.93].forEach(function (h, ii) {
          st.push(foilH(5.00 + ii * 0.12, 8.20 - ii * 0.10, Zd(h), sd * 0.50, 0.012, 6));
        });
        K.skin.push(orient(bridge(st, true, true)));
      }
    }
  }

  /* ====================================================== the canopy ===
     Drawing profile: windscreen base at 1.35 m (y 305), the bubble's top
     y 285 (0.24 m above the spine) from 2.9 to 3.5 m, the rear meeting the
     spine near 4 m; the sill rises from y 305 to the spine behind the seat.
     Width 0.94 m at the sill (plan, cockpit 0.98 m wide). */
  var CAN = [
    [1.36, 0.28, -0.715, -0.69], [1.60, 0.40, -0.71, -0.50], [1.90, 0.45, -0.70, -0.26],
    [2.20, 0.47, -0.68, -0.05], [2.60, 0.48, -0.63, 0.14], [3.00, 0.48, -0.52, 0.235],
    [3.35, 0.47, -0.36, 0.24], [3.65, 0.42, -0.22, 0.18], [3.90, 0.33, -0.10, 0.07], [4.05, 0.20, -0.04, 0.00]
  ];
  function arcRing(st, n) {
    var p = [], k, a;
    for (k = 0; k <= n; k++) {
      a = Math.PI * k / n;
      p.push([X(st[0]), st[1] * Math.cos(a), Zd(st[2] + (st[3] - st[2]) * Math.pow(Math.sin(a), 0.80))]);
    }
    return p;
  }
  function addCanopy(K, v) {
    var i, r = [];
    var sec = resample(CAN, 16);
    for (i = 0; i < sec.length; i++) r.push(arcRing(sec[i], 14));
    K.glass.push(bridge(r, false, false, true));
    /* the windscreen arch and the canopy's sill rails */
    K.skin.push(tube(arcRing(pl2(2.20), 10), 0.042, 6));
    K.skin.push(tube(arcRing(pl2(3.78), 10), 0.030, 6));
    for (var sd = -1; sd <= 1; sd += 2) {
      K.skin.push(tube(sec.map(function (q) { return [X(q[0]), sd * q[1], Zd(q[2])]; }), 0.032, 5));
    }
    /* the cockpit: tub, coaming, seat, pilot's helmet */
    K.dark.push(boxG(1.60, 0.56, 0.20, X(2.80), 0, Zd(-0.62)));
    K.dark.push(boxG(0.30, 0.50, 0.16, X(1.95), 0, Zd(-0.60)));
    K.dark.push(boxG(0.18, 0.50, 0.85, X(3.55), 0, Zd(-0.40)));
    K.dark.push(boxG(0.40, 0.46, 0.36, X(3.30), 0, Zd(-0.62)));
    var helm = new V.SphereGeometry(0.15, 10, 7);
    helm.translate(X(3.22), 0, Zd(-0.10));
    K.metal.push(helm);
  }
  function pl2(s) {
    var i, c = CAN;
    for (i = 1; i < c.length; i++) {
      if (s <= c[i][0]) {
        var t = (s - c[i - 1][0]) / (c[i][0] - c[i - 1][0]), o = [s];
        for (var j = 1; j < 4; j++) o.push(c[i - 1][j] + t * (c[i][j] - c[i - 1][j]));
        o[1] += 0.01; o[3] += 0.02;
        return o;
      }
    }
    return c[c.length - 1];
  }

  /* ===================================================== the nozzles ====
     Four on the body sides (Wikipedia): the cold front pair under the cowl
     ahead of the wing, the hot rear pair under the wing root (nozzle close-
     up; underside photograph: centres at about 5.2 and 7.3 m). Parked, they
     point aft. Each is a swivel collar on the body and a bell turning aft,
     open at the back; the front pair has the cascade vanes. */
  function nozzle(K, sd, s0, s1, yc, hc, rr, hot) {
    var st = [[s0, 0.55, 0.70], [s0 + 0.12, 0.85, 0.95], [s0 + 0.35, 1.0, 1.0],
              [s1 - 0.25, 0.98, 0.94], [s1, 0.92, 0.86]];
    var rings = st.map(function (q) {
      return seRing(X(q[0]), sd * yc, Zd(hc), rr * q[1], Zd(hc + rr * q[2]), Zd(hc - rr * q[2]), 14, 2.6, 2.6);
    });
    (hot ? K.hot : K.skin).push(bridge(rings, true, false));
    /* the swivel collar: a ring on the body side */
    var col = new V.CylinderGeometry(rr * 1.06, rr * 1.12, 0.16, 14);
    col.translate(X(s0 + 0.35), sd * (yc - rr * 0.90), Zd(hc));
    K.dark.push(col);
    /* the joint between the swivelling bell and its fixed casing */
    K.dark.push(bridge([seRing(X(s0 + 0.52), sd * yc, Zd(hc), rr * 1.03, Zd(hc + rr * 1.03), Zd(hc - rr * 1.03), 14, 2.6, 2.6),
                        seRing(X(s0 + 0.58), sd * yc, Zd(hc), rr * 1.03, Zd(hc + rr * 1.03), Zd(hc - rr * 1.03), 14, 2.6, 2.6)], false, false));
    /* the exit: dark inside */
    var ex = seRing(X(s1 - 0.02), sd * yc, Zd(hc), rr * 0.84, Zd(hc + rr * 0.78), Zd(hc - rr * 0.78), 14, 2.6, 2.6);
    var ex2 = seRing(X(s1 - 0.40), sd * yc, Zd(hc), rr * 0.70, Zd(hc + rr * 0.64), Zd(hc - rr * 0.64), 14, 2.6, 2.6);
    K.ink.push(bridge([ex, ex2], false, true));
    if (!hot) {
      for (var k = -1; k <= 1; k++) {
        K.metal.push(boxG(0.16, rr * 1.60, 0.025, X(s1 - 0.08), sd * yc, Zd(hc + k * rr * 0.42)));
      }
    }
  }
  function addNozzles(K, v) {
    for (var sd = -1; sd <= 1; sd += 2) {
      nozzle(K, sd, 4.80, 5.80, 1.26, -1.10, 0.38, false);
      nozzle(K, sd, 6.85, 7.70, 1.08, -1.22, 0.33, true);
    }
  }

  /* ================================================= pylons, outriggers ==
     Drawing plan: pylons 1.93, 3.32 and 4.02 m out; the outrigger fairing
     2.66 m out from 7.3 to 10.05 m, past the trailing edge (underside
     photograph: its rear end is a dark cap). */
  function wingLow(y, s) {             /* lower-surface hs of the wing at (y, s) */
    var le = wLE(y), te = wTE(y), c = te - le, f = clamp((s - le) / c, 0.02, 0.98);
    return wz(y) + (f - 0.5) * winc(y) - yt(f, wtc(y)) * c;
  }
  var PYL = [[1.93, 6.65, 8.45, 0.30], [3.32, 7.55, 8.85, 0.26], [4.02, 7.95, 9.05, 0.22]];
  var OUT_Y = 2.66, OUT_S = [7.30, 10.05];
  function addStores(K, v) {
    for (var sd = -1; sd <= 1; sd += 2) {
      PYL.forEach(function (p) {
        var top = wingLow(p[0], (p[1] + p[2]) / 2) + 0.06, r = [];
        r.push(foilH(p[1] + 0.25, p[2], Zd(top - p[3]), sd * p[0], 0.05, 6));
        r.push(foilH(p[1] + 0.05, p[2], Zd(top - p[3] * 0.55), sd * p[0], 0.05, 6));
        r.push(foilH(p[1], p[2] + 0.05, Zd(top), sd * p[0], 0.05, 6));
        K.skin.push(orient(bridge(r, true, true)));
      });
      /* outrigger fairing */
      var a = OUT_S[0], b = OUT_S[1], top = wingLow(OUT_Y, 8.6) + 0.04;
      var of = [[a, 0.03, 0.03], [a + 0.25, 0.09, 0.10], [a + 0.80, 0.12, 0.16], [b - 0.70, 0.12, 0.17],
                [b - 0.25, 0.10, 0.13], [b, 0.05, 0.06]];
      var rs = of.map(function (q) {
        return seRing(X(q[0]), sd * OUT_Y, Zd(top - q[2]), q[1], Zd(top + 0.02), Zd(top - 2 * q[2]), 14, 2.2, 2.2);
      });
      K.skin.push(orient(bridge(rs, true, true)));
      var ec = new V.SphereGeometry(0.075, 10, 6);
      ec.scale(0.8, 1, 1); ec.translate(X(b - 0.02), sd * OUT_Y, Zd(top - 0.06));
      K.ink.push(ec);
    }
  }

  /* team colour: a band round each wing near the tip, read from above */
  function addFlash(K, v) {
    var r = [], ys = [4.05, 4.43], i;
    for (i = 0; i < ys.length; i++) r.push(foil(wLE(ys[i]), wTE(ys[i]), ys[i], Zd(wz(ys[i])), wtc(ys[i]) * 1.08, 10, 0.02, winc(ys[i])));
    K.team.push(orient(bridge(r, true, true)));
    K.team.push(orient(bridge(mirrorRings(r), true, true)));
  }

  /* =============================================================== gear ==
     Bicycle: one nose wheel at 4.25 m (GR5 photograph 4.3) on a long leg,
     twin main wheels on the centreline at 8.35 m (drawing main well 7.8-10
     m; photograph 8.0), an outrigger leg from each fairing at 9.35 m. Built
     in the final (pitched) frame: T() gives where the bays are. The tyres
     are the lowest solid thing on the aeroplane. */
  function addGear(G, v) {
    var n = T(4.25, -1.66), m = T(8.35, -1.56), k, sd;
    var nr = 0.30, mr = 0.335, orr = 0.19;
    var nx = n[0], mx = m[0];
    var zN = Z(nr), zM = Z(mr);
    /* nose leg, fork, wheel, doors */
    G.metal.push(rod([nx + 0.05, 0, n[1] + 0.05], [nx, 0, zN + 0.22], 0.075, 8));
    G.metal.push(rod([nx, 0.13, zN + 0.26], [nx, 0.13, zN], 0.035, 6));
    G.metal.push(rod([nx, -0.13, zN + 0.26], [nx, -0.13, zN], 0.035, 6));
    G.metal.push(boxG(0.12, 0.30, 0.08, nx, 0, zN + 0.28));
    G.metal.push(rod([nx + 0.55, 0, T(3.70, -1.65)[1]], [nx + 0.02, 0, zN + 0.50], 0.035, 6));
    G.tyre.push(wheelG(nr, 0.19, nx, 0, zN, 18));
    G.metal.push(wheelG(0.13, 0.21, nx, 0, zN, 10));
    var nd = T(3.35, -1.66);
    for (sd = -1; sd <= 1; sd += 2) G.skin.push(boxG(0.95, 0.03, 0.24, nd[0], sd * 0.23, nd[1] - 0.10));
    /* mains: a short leg, axle, two wheels side by side, the long doors */
    G.metal.push(rod([mx + 0.10, 0, m[1] + 0.06], [mx, 0, zM + 0.12], 0.10, 8));
    G.metal.push(rod([mx - 0.45, 0, T(8.9, -1.52)[1] + 0.05], [mx, 0, zM + 0.20], 0.045, 6));
    G.metal.push(rod([mx, -0.30, zM], [mx, 0.30, zM], 0.055, 8));
    for (sd = -1; sd <= 1; sd += 2) {
      G.tyre.push(wheelG(mr, 0.20, mx, sd * 0.17, zM, 20));
      G.metal.push(wheelG(0.17, 0.22, mx, sd * 0.17, zM, 12));
      var dd = T(8.95, -1.55);
      G.skin.push(boxG(1.60, 0.03, 0.22, dd[0], sd * 0.30, dd[1] - 0.09));
    }
    /* outriggers: leg from the fairing, angled a little out, small wheel */
    for (sd = -1; sd <= 1; sd += 2) {
      var top = wingLow(OUT_Y, 9.35) - 0.30, o = T(9.35, top), ox = o[0], zo = Z(orr);
      G.metal.push(rod([ox + 0.05, sd * OUT_Y, o[1] + 0.20], [ox - 0.04, sd * (OUT_Y + 0.06), zo + 0.10], 0.045, 6));
      G.metal.push(rod([ox + 0.30, sd * OUT_Y, o[1] + 0.15], [ox - 0.02, sd * (OUT_Y + 0.05), zo + 0.45], 0.025, 5));
      G.metal.push(rod([ox - 0.04, sd * (OUT_Y + 0.06), zo + 0.10], [ox - 0.04, sd * (OUT_Y + 0.06), zo], 0.03, 5));
      G.tyre.push(wheelG(orr, 0.10, ox - 0.04, sd * (OUT_Y + 0.06), zo, 14));
      G.metal.push(wheelG(0.08, 0.11, ox - 0.04, sd * (OUT_Y + 0.06), zo, 8));
    }
  }

  /* ============================================================== build == */
  function merge(list) {
    var pos = [], nor = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = list[i].index ? list[i].toNonIndexed() : list[i];
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(new Float32Array(pos.length / 3 * 2), 2));
    return out;
  }
  function emit(parent, lists, mats, order, pitch) {
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (!lists[key] || !lists[key].length) continue;
      var geo = merge(lists[key]);
      if (pitch) geo.applyMatrix4(pitch);
      if (key === "skin") projUV(geo);
      parent.add(new V.Mesh(geo, mats[key]));
    }
  }

  function build(THREE, M, C, which) {
    V = THREE;
    var v = VARS[which];
    _m4 = new V.Matrix4(); _q = new V.Quaternion(); _v = new V.Vector3(); _u = new V.Vector3();
    var K = { skin: [], team: [], hot: [], ink: [], dark: [], metal: [], glass: [] };
    var G = { skin: [], metal: [], tyre: [] };
    addBody(K, v);
    addCanopy(K, v);
    addWings(K, v);
    addTail(K, v);
    addNozzles(K, v);
    addStores(K, v);
    addFlash(K, v);
    addGear(G, v);

    /* the pitch: nose up about the pivot on the spine at the intake */
    var px = X(PS), pz = Z(HP);
    var pitch = new V.Matrix4().makeTranslation(px, 0, pz)
      .multiply(new V.Matrix4().makeRotationY(-PITCH))
      .multiply(new V.Matrix4().makeTranslation(-px, 0, -pz));

    var mats = makeMats(C, v);
    var root = new V.Group();
    emit(root, K, mats, ["skin", "team", "hot", "ink", "dark", "metal", "glass"], pitch);
    var gear = new V.Group();
    gear.name = "gear";
    emit(gear, G, mats, ["skin", "metal", "tyre"], null);
    root.add(gear);
    return root;
  }

  return { build: build, VARS: VARS };
})();

/* len is the measured X extent of the pitched airframe: nose (or radome)
   tip to the tail cone; 14.12 m along the drawing datum */
UNIT_MODELS["nato_e80_stovl"]   = { len: 14.21, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "A"); } };
UNIT_MODELS["nato_e90_stovl"]   = { len: 14.60, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "P"); } };
UNIT_MODELS["gbr_e80_cas"]      = { len: 14.21, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "G5"); } };
UNIT_MODELS["gbr_e90_cas"]      = { len: 14.21, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "G7"); } };
UNIT_MODELS["gbr_e00_cfighter"] = { len: 14.21, build: function (T, M, C) { return HeroHarrier2.build(T, M, C, "G9"); } };
