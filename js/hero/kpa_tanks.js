/* ========== kpa_tanks.js - HERO models: the North Korean tanks of the T-62 line and the PT-85 ==========
   ROW                 BUILD     WHAT IS DRAWN
   kpa_e80_mbt         c1        Ch'onma (Ch'onma-ho I/II), the licence-built T-62 of 1978-89
   kpa_e90_mbt         c214      Ch'onma-214 (Western "Chonma-ho V"), the serial Ch'onma-98
   kpa_e00_mbt         pok       Pokpung-ho, as the Chonma-216 of the 2013 parade
   kpa_e00_heavy       son       Songun-915 (Songun-ho)
   kpa_e80_lighttank   pt85e80   PT-85 / Type 82 (Model 1981 "Shin'heung"), early: the 9M14 on the turret
   kpa_e90_lighttank   pt85e90   PT-85, later: the IR projector in place of the 9M14, new lamps
   kpa_e00_lighttank   pt85e00   PT-85 as seen from 2015: + three smoke mortars a side, MANPADS tube

   WHAT IS COPIED, AND FROM WHERE (no other file is edited):
   - geometry kit, paint canvas, materials, flush: js/hero/ru_t62.js (HeroT62) verbatim, plus
     prismY from js/hero/pla_type63_apc.js.
   - c1, c214, pok, son: the T-62's hull station table, fenders, ribbed front mudguards,
     splash board, headlamps, engine deck, sagging skeleton track, rear sprocket, front idler,
     830 mm road wheel, cast "egg" dome (domeAt/onDome/roofZ), 115 mm U-5TS, L-2 searchlight,
     cupola and handrails are ru_t62.js's, parameterised by hull length and wheel count.  The
     Ch'onma IS a T-62 built under licence (en.wikipedia: "license-produced T-62s with some
     minor differences"), so every part not listed as changed below is INHERITED from the T-62
     and is not separately confirmed on the Korean tank.  (Note: the "T-62" variant in
     js/hero/ru_t54.js is the Chinese Type 62 LIGHT tank, not the Soviet T-62; it is not used.)
   - pt85*: the Type 63 APC kit of js/hero/pla_type63_apc.js: box hull with the upper sides
     leaning in, front toothed sprocket, rear idler, no return rollers, the dished rubber-tyred
     0.74 m wheel and its 0.99 m pitch measured there.  js/hero/ru_pt76.js is NOT used: the
     PT-85 is not a PT-76 hull (en.wikipedia "based on the lengthened VTT-323 APC chassis";
     T1 "turret similar to PT-76 with several modifications").

   References (Wikimedia Commons / en.wikipedia, cached in scratchpad/q_kpa_tanks_ref):
     P1  "North Korea Victory Day 118 (9465927592).jpg" (2013 parade) - the leading tank from the
         front left, plain dark green, NO skirts: a Ch'onma with the T-62 egg turret, five road
         wheels with large holes, the ribbed front mudguards, the curved handrails, a heavy MG on
         the RIGHT (loader's) hatch ring, an ATGM on a post (a 2010s fit: not drawn on c1).
     P2  "North Korea Victory Day 122 (9465927866) (cropped).jpg" (en.wikipedia: "Chonma-216
         tanks ... 2013") - a Chonma-216 head-on: the band of ERA boxes across the upper glacis,
         the ribbed mudguards, deep panel skirts, the turret cheeks built up with boxes, smoke
         launchers on the sides, twin long launch tubes on a mast in the middle of the roof, the
         MG on the right hatch.  Measured at ONE station, the turret front: turret over its
         cheek boxes 740 px against 1135 px over the skirts = 0.65 -> 2.29 m on the 3.5 m
         published width (drawn 2.20 m shell + boxes); turret front height 200 px = 0.18 ->
         0.62 m over the deck (drawn 0.62).  The photograph shows camouflage: not drawn.
     P3  the left tank of the same frame, 3/4 front right: the skirt panels in sections, the road
         wheels low behind them (their count, six, from en/ru.wikipedia), the cheek boxes.
     P4  "North Korean Chonma-ho main battle tank.jpg" (en.wikipedia infobox; "Ch'onma-92 ...
         1992") - side 3/4: five road wheels, a plain skirt from the fender down to the wheel
         tops (skirt edge level with the tyre tops: drawn at 0.92 m against 0.905 m), boxes in
         rows on the turret side, the MG on the roof.  Grainy; camouflage not drawn.
     P5  "North Korean M1981 Shin'heung light tanks later production model.jpg" (en.wikipedia
         infobox) - PT-85s from the front left: SIX road wheels, the toothed sprocket at the
         FRONT (second tank), slab sides with a ledge over the track, the long glacis, the
         truncated-cone turret with a handrail, two hatches side by side, the IR projector right
         of the gun, the long plain tube.  Measured at ONE station, the turret: turret 120 px
         against 400 px from deck to ground = 0.30 (drawn 0.56 / 1.78 = 0.31).  Overall length
         over hull length reads 1.22 (perspective, uncorrected) against the published 9.4 m over
         the 7.44 m hull drawn = 1.26: consistent, so the published 9.4 m is kept.
     P6  "VTT-323 Sinhung - North Korea Victory Day-2013 01.jpg" - the VTT-323: FIVE wheels, front
         sprocket; with en.wikipedia (Type 63 article: "VTT-323 - North Korean version of the
         Type A531") this places the PT-85 one wheel station longer again.
     D1  "Ch'onma-ho Render.png" (Jason Biggs, a hobbyist side render: WEAK evidence, used for
         arrangement only, never for a dimension) - a Ch'onma-92/98: ERA bricks in rows on the
         turret side rear, the rangefinder box over the gun root, smoke dischargers on the turret
         front, a banded thermal sleeve, the long skirt, five wheels.
     T1  "MarinesDPRKCountryHandbook.pdf" (USMC, 1997): "T-62 (Ch'onma-ho) medium tank", 115 mm,
         "some may have 12.7mm machinegun"; "PT-85 (Type-82) ... based on the VTT-323 APC chassis
         ... AT-3 ... turret similar to PT-76 with several modifications", trench 2.9 m.  No
         drawing ("line diagram unavailable").
   Published figures:
     Ch'onma (en.wikipedia "Chonma-ho"): hull 6.63 m, width 3.52 m, height 2.4 m, 115 mm U-5TS,
       KPV 14.5 mm and coaxial 7.62 mm; Ch'onma-92: welded turret, ERA on the turret sides in
       3 rows of 3-4-4, thermal sleeve, external LRF, smoke launchers on the front turret, rubber
       side skirts; -98: "slightly larger turret of the same shape"; -214: add-on armour on the
       turret front "similar to the Soviet BDD", rubber flaps on the lower front hull.
     T-62 (ru_t62.js header): hull 6.63 m, 9.335 m gun forward, 3.30 m, 2.395 m to the roof.
     Pokpung-ho (en.wikipedia): hull ~7 m, width ~3.5 m, height ~2.2 m, 44.3 t; "a longer
       heavily modified version of the T-62"; Chonma-216: 125 mm, ERA on the turret front and
       the forward roof, Bulsae-3; ERA on the glacis; four smoke launchers each side; KPV;
       "panels along the tracks"; a meteorological mast.
     Songun-915 (ru.wikipedia "Songun (tank)", the Pyongyang museum plate): 44 t, width 3.502 m,
       height 2.416 m; cast dome turret, ERA on the glacis and turret front, four smoke launchers
       each side in pairs, 125 mm, KPVT, two Bulsae-3 over the mantlet, six road wheel pairs as
       the Chonma-215/216.  en.wikipedia has no Songun article (the name redirects).
     PT-85 (en.wikipedia "Model 1981 Shin'heung"): 9.4 m gun forward, 3.1 m wide, 2.8 m high,
       20 t; 85 mm, 14.5 mm AA MG; early tanks: 9M14 "directly above the main gun", two lamps
       each side of the front; later: an IR projector "linked to the gun with a brace", three
       lamps on the right of the glacis and one on the left side plate; 2015: MANPADS at the
       turret rear and three smoke mortars a side.

   CHANGED against the copied parts, row by row, and the evidence:
     c1   KPV on the loader's ring (P1, en.wikipedia, T1); a bolt row across the glacis
          (en.wikipedia "distinctive bolts on the front glacis"); KPA green.
     c214 turret shell 4 % larger (en.wikipedia -98); LRF box over the gun root (en.wikipedia,
          D1); brow blocks either side of the mantlet (en.wikipedia -214); side ERA 3-4-4
          (en.wikipedia -92, D1); four smoke tubes each side of the front (en.wikipedia, D1;
          the count is NOT CONFIRMED); sleeved 115 mm tube (en.wikipedia); rubber skirts to the
          wheel tops (P4) at the published 3.52 m; nose flaps (en.wikipedia).
     pok  hull 7.00 m (published ~7 m) with SIX wheels (en.wikipedia, ru.wikipedia; P3), the stretch put aft
          of the fighting compartment so the turret keeps the T-62's distance from the nose;
          panel skirts at the published ~3.5 m (P2, P3); two rows of glacis ERA (P2); new
          welded turret (P2, sized at its front station, above); 125 mm sleeved tube; twin
          Bulsae mast (P2); met mast (en.wikipedia).  No drums, fender stowage or IR lamp
          (none visible in P2/P3).
     son  pok's hull and running gear (ru.wikipedia); the cast dome sized to the published
          2.416 m roof and 3.502 m width (ru.wikipedia).
     pt85 six wheels, hull 7.44 m; ledge instead of the APC's fender bins (P5); the turret
          (P5, en.wikipedia); the gun to the published 9.4 m.

   Recognition list (what makes each read at game zoom, and its source):
     1. T-62 hull, five big wheels with the last three further apart, egg turret - c1/c214: P1, P4
     2. the long 115 mm tube with the evacuator (c1) or a banded sleeve (c214) - P1, D1
     3. the KPV on the right hatch ring - P1, P2
     4. c214: skirts over the wheel tops, ERA in rows on the turret sides, LRF box - P4, D1
     5. pok/son: six wheels behind deep panel skirts, ERA across the glacis - P2, P3
     6. pok: the low welded turret with built-up cheeks and the twin missile mast - P2
     7. son: the big cast dome with ERA on its front arc - ru.wikipedia (no photograph)
     8. pt85: long boat hull, six wheels, front sprocket, truncated turret aft of centre - P5
   Paint: KPA green, one shade for every row.  P1 (hazy, plain-painted Ch'onma, lit turret
   #556168: blue cast from the haze) and P5 (PT-85 hull side in daylight #5d5f51) read a dark
   grey-olive; drawn #4e5540 (P5 at about 0.85 of level).  No stars, numbers, slogans or the
   parade camouflage of P2-P4 (P5 carries white turret stripes: not drawn).

   NOT CONFIRMED (no photograph or drawing here settles it; say so plainly):
     - every T-62 part on c1/c214 not named above (fender tanks and boxes, rear drums, snorkel,
       engine deck, wheel hole count): inherited from the T-62, not seen on a Ch'onma here; the
       KPA "differently shaped loader's hatch" (en.wikipedia) is not drawn - its shape is
       unknown - the T-62 hatch ring carries the KPV instead;
     - c214: the brow block shape, the LRF box size, the smoke tube count and place, the
       gun: drawn as the sleeved 115 mm; the game's weapon row says 125 mm on later marks and
       en.wikipedia gives the U-5TS for the Ch'onma line - the tube length is the 115 mm's;
     - pok: the wheel pitch (six even 830 mm wheels over the T-62's end clearances: a 0.93 m
       pitch), the turret's plan behind its front, the bustle boxes, the 125 mm tube length
       (muzzle 6.15 m ahead of the ring, judgement), the engine deck (T-62's drawn);
     - son: EVERYTHING beyond the ru.wikipedia text and figures - no photograph of a Songun-915
       was found on Commons; the dome's plan radii, the ERA layout, the place of the twin
       Bulsae, the hull (pok's) are judgement;
     - pt85: the hull heights (deck 1.78 m, ledge 1.05 m) from P5's proportions, the turret
       place (0.45 m aft of centre, P5 through perspective), the gun has no muzzle brake in P5
       at its resolution, the engine position (the Type 63 family's front right is assumed for
       the deck grille), the hatch and lamp details, the 9M14 rail's form.
   ENGINE (js/damage3d.js ENGINE_AT, not edited): all rows fall to the role default "rear".
   Right for the Ch'onma, Pokpung-ho and Songun (T-62 layout).  For the PT-85 the Type 63
   family's engine is at the FRONT (front right, behind the driver), and P5 shows the turret
   aft of centre; the PT-85 rows are probably "front" - not listed in ENGINE_AT, so the burn
   source sits at the stern.

   Materials: PAINT (canvas texture), DARK (track, fittings, guns, vision blocks), WHEEL
   (vertex colours) and the team colour exactly as handed in (C.team): a strip on the engine
   deck and one on the turret roof.  Nodes: "turret" (trains; origin on the ring centre at the
   deck, gun along +X, the gun inside it), one "roadwheel" group per axle (five or six), axle
   along local Y, holding both sides.  Draw calls: hull 3 + turret 3 + wheels = 11 / 12.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaTanks = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* KPA green (see header): one paint for every row */
  var PAINT = { base: "#4e5540", blots: ["#454c38", "#585f48"], seed: 85 };

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
  /* paint: one tile is 1 / 0.34 = 2.9 m. Base, soft mottling, the pitted cast-steel grain
     of the turret and nose (P6), weld seams with bolt rows, grime and rain streaks (P2, P4) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "kpa" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.30 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 900; i++) {               /* cast-steel pitting */
        q.fillStyle = (i % 2) ? "rgba(18,20,12,0.16)" : "rgba(230,232,205,0.08)";
        q.fillRect(R() * S, R() * S, 1 + R() * 3, 1 + R() * 2);
      }
      for (i = 0; i < 6; i++) {                 /* weld seams / plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.45)";
        for (k = 6; k < w; k += 16) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {                /* grime and wear */
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
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
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
  /* a convex prism: profile in the XZ plane, from y0 to y1 (pla_type63_apc.js) */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
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

  /* ================================================================ T-62 FAMILY
     The hull station table, running gear, road wheel, cast dome and 115 mm gun below are
     COPIED from js/hero/ru_t62.js (HeroT62, REDO 2026-10-24) and parameterised by hull length
     and wheel count; the Ch'onma is a licence T-62, so every part not listed as changed in the
     header is the T-62's, inherited. */

  /* hull stations, ru_t62.js HS: x, belly half width, belly z, side half width, roof z.  The
     rear five and the front seven stations keep their offsets from the tail and the nose; the
     middle is stretched to the hull length (V.L). */
  var HS_REAR = [[0.000, 0.98, 0.66, 1.03, 1.30], [0.015, 1.00, 0.56, 1.05, 1.355], [0.055, 1.02, 0.48, 1.06, 1.385],
                 [0.135, 1.04, 0.44, 1.07, 1.40], [0.315, 1.05, 0.425, 1.07, 1.40]];
  var HS_FRONT = [[1.015, 1.05, 0.425, 1.07, 1.40], [0.765, 1.05, 0.425, 1.07, 1.267], [0.615, 1.05, 0.425, 1.07, 1.187],
                  [0.415, 1.04, 0.566, 1.07, 1.081], [0.215, 1.02, 0.708, 1.06, 0.974], [0.065, 1.00, 0.814, 1.05, 0.895],
                  [0.000, 0.98, 0.84, 1.04, 0.875]];
  var DECK = 1.40, RING = 1.40;
  function geom(V) {
    var G = { NOSE: V.L / 2, TAIL: -V.L / 2, FW: V.FW || 1.65 };
    G.GX = G.NOSE - 1.015;                              /* glacis knee */
    G.IDL = { x: G.NOSE - 0.415, z: 0.80, r: 0.30 };    /* front idler, rear sprocket (T-62) */
    G.SPR = { x: G.TAIL + 0.315, z: 0.76, r: 0.32 };
    /* road wheels: the T-62's five on its measured uneven pitch (ru_t62.js P1); six evenly
       spaced over the same end clearances for the stretched hull */
    if (V.wheels === 5) G.XW = [2.01, 1.02, 0.02, -1.10, -2.28];
    else {
      var x0 = G.NOSE - 1.305, x1 = G.TAIL + 1.035, i;
      G.XW = [];
      for (i = 0; i < V.wheels; i++) G.XW.push(x0 + (x1 - x0) * i / (V.wheels - 1));
    }
    G.TX = G.NOSE - 3.235;                              /* turret ring: the T-62's distance from the nose */
    G.HS = [];
    HS_REAR.forEach(function (s) { G.HS.push([G.TAIL + s[0], s[1], s[2], s[3], s[4]]); });
    var m0 = G.TAIL + 0.315, m1 = G.GX, n = 4, k;
    for (k = 1; k < n; k++) G.HS.push([m0 + (m1 - m0) * k / n, 1.05, 0.425, 1.07, 1.40]);
    HS_FRONT.forEach(function (s) { G.HS.push([G.NOSE - s[0], s[1], s[2], s[3], s[4]]); });
    G.glacisZ = function (x) { return x <= G.GX ? DECK : DECK - 0.532 * (x - G.GX); };
    return G;
  }
  var TY = 1.36, TW = 0.29, ZW = 0.49, RW = 0.415;
  var GA = Math.atan(0.532), GU = [Math.cos(GA), 0, -Math.sin(GA)], GW = [Math.sin(GA), 0, Math.cos(GA)];
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
    return [[x, wb, zB], [x, ws, Math.min(zB + 0.10, zT - 2 * e)], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, Math.min(zB + 0.10, zT - 2 * e)], [x, -wb, zB]];
  }

  function addHull(B, V, G) {
    var R = G.HS.map(hullRing), i, j, k, k1, a, b, c, d, e, dy, dz, p, s, x, n = R[0].length;
    var NOSE = G.NOSE, TAIL = G.TAIL, FW = G.FW, gz = G.glacisZ, GX = G.GX;
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
      var yi = p * 1.06, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* fender shelf level with the deck and its lip (T-62) */
      box(B.paint, TAIL + 0.015, GX, ylo, yhi, DECK - 0.035, DECK);
      box(B.paint, TAIL + 0.015, GX, p > 0 ? FW - 0.025 : -FW, p > 0 ? FW : -FW + 0.025, DECK - 0.08, DECK + 0.01);
      /* the big pressed front mudguard, five ribs (T-62; P2, P3 show it on the Chonma-216) */
      var MG = [[GX - 0.02, 1.40], [GX + 0.30, 1.37], [GX + 0.58, 1.29], [GX + 0.80, 1.17], [GX + 0.98, 1.02], [GX + 1.08, 0.86]], q, ya = p * 1.08, yb = p * (FW + 0.01);
      for (q = 0; q + 1 < MG.length; q++) {
        belt(B.paint, MG[q][0], MG[q][1], MG[q + 1][0], MG[q + 1][1], Math.min(ya, yb), Math.max(ya, yb), 0.04);
        for (j = 0; j < 5; j++) {
          var yr = p * (1.18 + j * (FW - 1.23) / 4);
          belt(B.paint, MG[q][0], MG[q][1] + 0.025, MG[q + 1][0], MG[q + 1][1] + 0.025, yr - 0.018, yr + 0.018, 0.03);
        }
      }
      loftN(B.paint, [
        [[GX, yb, 1.40], [GX + 1.06, yb, 0.90], [GX + 1.00, yb, 0.82], [GX + 0.65, yb, 1.06], [GX + 0.10, yb, 1.20]],
        [[GX, yb - p * 0.03, 1.40], [GX + 1.06, yb - p * 0.03, 0.90], [GX + 1.00, yb - p * 0.03, 0.82], [GX + 0.65, yb - p * 0.03, 1.06], [GX + 0.10, yb - p * 0.03, 1.20]]]);
      box(B.paint, TAIL - 0.045, TAIL + 0.015, p > 0 ? 1.06 : -FW, p > 0 ? FW : -1.06, 1.05, DECK + 0.01);
      box(B.dark, G.SPR.x, GX - 0.05, p > 0 ? 1.06 : -1.10, p > 0 ? 1.10 : -1.06, 1.05, DECK - 0.04);
      /* headlamp in its guard on the glacis corner (T-62; P2 shows lamps on the Chonma-216 glacis) */
      x = GX + 0.32;
      cyl(B.dark, [x, p * 0.92, gz(x) + 0.12], [x + 0.12, p * 0.92, gz(x) + 0.11], 0.075, 0.075, 12);
      cyl(B.paint, [x - 0.05, p * 0.92, gz(x) + 0.12], [x, p * 0.92, gz(x) + 0.12], 0.085, 0.085, 12);
      box(B.dark, x - 0.06, x + 0.02, p * 0.92 - 0.03, p * 0.92 + 0.03, gz(x), gz(x) + 0.08);
      /* side skirts.  rubber (Ch'onma-92 on, en.wikipedia): one plain sheet from the fender lip
         down to the wheel tops; panel (Pokpung-ho, P2, P3, en.wikipedia "panels along the
         tracks"): deep plates in sections over the upper half of the wheels */
      if (V.skirt) {
        var z0 = V.skirt === "panel" ? 0.70 : 0.92, sx0 = TAIL + 0.10, sx1 = GX + 0.05, ys = p * (FW + 0.005);
        box(B.paint, sx0, sx1, Math.min(ys, ys - p * 0.03), Math.max(ys, ys - p * 0.03), z0, DECK + 0.01);
        var nseg = V.skirt === "panel" ? Math.round((sx1 - sx0) / 0.95) : Math.round((sx1 - sx0) / 1.4);
        for (j = 1; j < nseg; j++) {
          var xs = sx0 + (sx1 - sx0) * j / nseg;
          box(B.dark, xs - 0.012, xs + 0.012, Math.min(ys, ys + p * 0.008), Math.max(ys, ys + p * 0.008), z0 + 0.02, DECK - 0.01);
        }
        if (V.skirt === "panel") box(B.dark, sx0, sx1, Math.min(ys, ys + p * 0.008), Math.max(ys, ys + p * 0.008), DECK - 0.06, DECK - 0.04);
      }
    }
    /* glacis: the splash board and its braces, nose joint, tow cable, tow hooks (T-62) */
    slab(B.paint, [GX + 0.56, 0, gz(GX + 0.56) + 0.085], unit([-0.35, 0, 1]), [0, 1, 0], unit([1, 0, 0.35]), 0.09, 0.74, 0.012);
    for (s = -1; s <= 1; s += 2) slab(B.paint, [GX + 0.53, s * 0.74, gz(GX + 0.53) + 0.06], [1, 0, 0], [0, 0, 1], [0, 1, 0], 0.10, 0.07, 0.012);
    slab(B.dark, [NOSE - 0.045, 0, gz(NOSE - 0.045) + 0.006], GU, [0, 1, 0], GW, 0.012, 0.98, 0.006);
    if (!V.glacisEra) {
      cyl(B.dark, [GX + 0.22, -0.70, gz(GX + 0.22) + 0.03], [GX + 0.40, -0.10, gz(GX + 0.40) + 0.03], 0.024, 0.024, 6);
      cyl(B.dark, [GX + 0.40, -0.10, gz(GX + 0.40) + 0.03], [GX + 0.22, 0.45, gz(GX + 0.22) + 0.03], 0.024, 0.024, 6);
      cyl(B.dark, [GX + 0.22, 0.45, gz(GX + 0.22) + 0.03], [GX + 0.75, 0.70, gz(GX + 0.75) + 0.03], 0.024, 0.024, 6);
    }
    /* the Ch'onma's "distinctive bolts on the front glacis" (en.wikipedia, from Tank
       Encyclopedia): a row of bolt heads across the plate below the splash board */
    if (V.bolts) for (j = -6; j <= 6; j++) { x = GX + 0.80; cylZ(B.dark, x, j * 0.13, gz(x) - 0.01, gz(x) + 0.025, 0.025, 6); }
    /* ERA on the upper glacis (Chonma-215/216, en.wikipedia "ERA ... fitted on the front
       glacis"; P2: a band of boxes across the plate under the turret, the hooks below) */
    if (V.glacisEra) {
      for (i = 0; i < 2; i++) for (j = -4; j <= 4; j++) {
        x = GX + 0.12 + i * 0.30;
        slab(B.paint, [x, j * 0.215, gz(x) + 0.06], GU, [0, 1, 0], GW, 0.13, 0.10, 0.05);
      }
      for (j = -4; j <= 4; j++) { x = GX + 0.12; box(B.dark, x - 0.01, x + 0.01, j * 0.215 - 0.09, j * 0.215 + 0.09, gz(x) + 0.11, gz(x) + 0.125); }
    }
    /* the rubber flaps hung under the nose (Ch'onma-214, en.wikipedia "rubber flaps on the
       lower front hull, similar to the T-80U") */
    if (V.flaps) slab(B.dark, [NOSE + 0.03, 0, 0.62], [0, 0, 1], [0, 1, 0], [1, 0, 0], 0.22, 0.95, 0.012);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, NOSE - 0.015, NOSE + 0.085, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.78, 0.90);
      box(B.dark, TAIL - 0.055, TAIL + 0.005, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.62, 0.72);
    }
    /* driver's hatch, front left, and his periscopes (T-62) */
    x = GX - 0.28;
    cylZ(B.paint, x, 0.52, DECK, DECK + 0.06, 0.25, 16);
    cylZ(B.paint, x, 0.52, DECK + 0.06, DECK + 0.08, 0.20, 14);
    box(B.dark, x + 0.22, x + 0.28, 0.40, 0.48, DECK - 0.01, DECK + 0.05);
    box(B.dark, x + 0.22, x + 0.28, 0.56, 0.64, DECK - 0.01, DECK + 0.05);

    /* fender stowage (T-62, inherited; NOT shown by any Chonma photograph here) */
    if (V.fender) {
      box(B.paint, GX - 0.95, GX - 0.10, 1.36, 1.62, DECK, DECK + 0.22);
      box(B.paint, 0.20, 1.10, 1.38, 1.62, DECK, DECK + 0.18);
      box(B.paint, -0.85, 0.00, 1.38, 1.62, DECK, DECK + 0.20);
      box(B.paint, TAIL + 0.115, TAIL + 0.665, 1.38, 1.62, DECK, DECK + 0.20);
      box(B.paint, GX - 0.95, GX - 0.10, -1.62, -1.36, DECK, DECK + 0.22);
      for (i = 0; i < 3; i++) {
        var tx0 = 0.95 - i * 1.18, tx1 = tx0 - 1.08;
        loftN(B.paint, [
          [[tx0, -1.62, DECK], [tx0, -1.62, DECK + 0.25], [tx0, -1.55, DECK + 0.31], [tx0, -1.43, DECK + 0.31], [tx0, -1.36, DECK + 0.25], [tx0, -1.36, DECK]],
          [[tx1, -1.62, DECK], [tx1, -1.62, DECK + 0.25], [tx1, -1.55, DECK + 0.31], [tx1, -1.43, DECK + 0.31], [tx1, -1.36, DECK + 0.25], [tx1, -1.36, DECK]]]);
        box(B.dark, tx1 + 0.14, tx1 + 0.20, -1.63, -1.35, DECK + 0.02, DECK + 0.325);
        box(B.dark, tx0 - 0.20, tx0 - 0.14, -1.63, -1.35, DECK + 0.02, DECK + 0.325);
      }
      cylX(B.dark, -2.40, 0.95, -1.34, DECK + 0.06, 0.025, 0.025, 6);
    }
    /* exhaust louvre on the left fender over the last wheel (T-62) */
    box(B.dark, TAIL + 0.765, TAIL + 1.465, 1.10, 1.40, DECK - 0.01, DECK + 0.03);
    for (i = 0; i < 7; i++) box(B.paint, TAIL + 0.795 + i * 0.10, TAIL + 0.845 + i * 0.10, 1.12, 1.38, DECK + 0.02, DECK + 0.05);

    /* engine deck: the louvred grille across the rear, access plates, team strip (T-62; the
       Pokpung-ho deck is not seen in any reference here and is drawn the same) */
    box(B.dark, TAIL + 0.095, TAIL + 1.065, -0.92, 0.92, DECK - 0.01, DECK + 0.012);
    for (i = 0; i < 9; i++) box(B.paint, TAIL + 0.115 + i * 0.11, TAIL + 0.165 + i * 0.11, -0.90, 0.90, DECK + 0.012, DECK + 0.04);
    box(B.paint, TAIL + 1.215, G.TX - 1.10, -0.70, 0.70, DECK, DECK + 0.035);
    cylZ(B.paint, TAIL + 1.765, 0.86, DECK, DECK + 0.05, 0.17, 12);
    box(B.team, TAIL + 1.40, TAIL + 2.20, -0.13, 0.13, DECK + 0.035, DECK + 0.055);

    /* the two ribbed 200 l drums across the rear plate (T-62 D1, P5; inherited, NOT shown by a
       Ch'onma photograph here) */
    if (V.drums) {
      var dxr = TAIL - 0.315, dzr = 1.68;
      for (s = -1; s <= 1; s += 2) {
        var dyr = s * 0.47;
        cylY(B.paint, dxr, dyr - 0.44, dyr + 0.44, dzr, 0.29, 20);
        for (j = 0; j < 4; j++) cylY(B.dark, dxr, dyr - 0.30 + j * 0.20 - 0.015, dyr - 0.30 + j * 0.20 + 0.015, dzr, 0.297, 20);
        belt(B.dark, TAIL + 0.005, 1.02, TAIL - 0.205, 1.12, s * 0.95 - 0.04, s * 0.95 + 0.04, 0.06);
        belt(B.dark, TAIL - 0.205, 1.12, TAIL - 0.345, 1.40, s * 0.95 - 0.04, s * 0.95 + 0.04, 0.06);
        belt(B.dark, TAIL + 0.005, 1.02, TAIL - 0.205, 1.12, s * 0.05 - 0.035, s * 0.05 + 0.035, 0.06);
        belt(B.dark, TAIL - 0.205, 1.12, TAIL - 0.305, 1.40, s * 0.05 - 0.035, s * 0.05 + 0.035, 0.06);
      }
    } else {
      /* stern plate fittings only: the rear lights and a stowage box (judgement) */
      for (s = -1; s <= 1; s += 2) box(B.dark, TAIL - 0.05, TAIL + 0.005, s * 0.80 - 0.06, s * 0.80 + 0.06, 1.18, 1.26);
    }
  }

  /* running gear (ru_t62.js, copied): sagging skeleton track, rear sprocket, front idler */
  function addRunning(B, V, G) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts, XW = G.XW, IDL = G.IDL, SPR = G.SPR;
    for (i = 0; i < XW.length; i++) C.push([XW[i], ZW, RW + 0.045]);
    C.push([IDL.x, IDL.z, IDL.r + 0.045], [SPR.x, SPR.z, SPR.r + 0.045]);
    pts = [];
    for (i = 0; i < C.length; i++) for (k = 0; k < 28; k++) pts.push([C[i][0] + Math.cos(k / 28 * TAU) * C[i][2], C[i][1] + Math.sin(k / 28 * TAU) * C[i][2]]);
    pts = hull2(pts);
    pts = pts.map(function (pt) {
      if (pt[1] < ZW + RW) return pt;
      var j, sag = 0;
      for (j = 0; j + 1 < XW.length; j++) {
        var x0 = XW[j + 1], x1 = XW[j];
        if (pt[0] > x0 + 0.12 && pt[0] < x1 - 0.12) { var u = (pt[0] - x0) / (x1 - x0); sag = (V.wheels === 5 ? 0.07 : 0.03) * 4 * u * (1 - u); }
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
    cnt = Math.round(tot / 0.137 / 2); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - TW, y + TW, 0.07);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - TW - 0.01, y + TW + 0.01, 0.09);
        belt(B.dark, px - dx * 0.03 + dz * 0.07, pz - dz * 0.03 - dx * 0.07, px + dx * 0.03 + dz * 0.07, pz + dz * 0.03 - dx * 0.07, y - 0.03, y + 0.03, 0.07);
      }
      cylY(B.dark, SPR.x, y - 0.22, y - 0.12, SPR.z, SPR.r, 18);
      cylY(B.dark, SPR.x, y + 0.12, y + 0.22, SPR.z, SPR.r, 18);
      cylY(B.paint, SPR.x, y - 0.12, y + 0.12, SPR.z, 0.22, 14);
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.27, SPR.z, 0.19, 12);
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.31, SPR.z, 0.08, 8);
      cylY(B.paint, IDL.x, y - 0.22, y + 0.22, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.21, y + s * 0.28, IDL.z, 0.12, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, y - s * 0.30 - 0.03, y - s * 0.30 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
      cyl(B.dark, [XW[0] + 0.30, s * 1.08, ZW + 0.05], [XW[0] + 0.55, s * 1.08, 1.20], 0.05, 0.05, 8);
      cyl(B.dark, [XW[XW.length - 1] - 0.30, s * 1.08, ZW + 0.05], [XW[XW.length - 1] - 0.55, s * 1.08, 1.20], 0.05, 0.05, 8);
    }
  }
  /* road wheel (ru_t62.js, copied; P1 shows the same big-holed discs on the Ch'onma) */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.10, 0.105, 0.09];
  function addWheel(W, paint) {
    var s, y, i, a, c = paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.14, gg * 1.14, bb * 1.14];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.255, y - 0.15, 0, RW, 20);
      cylY(W, 0, y + 0.15, y + 0.255, 0, RW, 20);
      W.col = BODY;
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.33, 18);
      cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.275, 0], 0.335, 0.17, 20);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.11, 10);
      W.col = HOLE;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.235, y + s * 0.264, Math.sin(a) * 0.235], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.055, 0.012, 0.065);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.315, 0, 0.05, 8);
    }
  }

  /* ------------------------------------------------------- cast dome turrets
     ru_t62.js domeAt / addDome / onDome / roofZ, copied, with the plan radii, height and
     profile taken from a dome record D so the same code draws the T-62 egg (Ch'onma), the
     slightly larger Ch'onma-214 shell and the Songun-915's big cast dome. */
  var PROF62 = [[1.00, 0.00], [1.012, 0.09], [1.00, 0.23], [0.965, 0.375], [0.90, 0.52],
                [0.79, 0.67], [0.62, 0.795], [0.38, 0.90], [0.0, 0.97]];
  var DP = 2 / 2.3;
  function Dome(D) {
    var PROF = D.prof.map(function (r) { return [r[0], r[1] * D.H / 0.97]; });
    function at(a, rf, hz) {
      var c = Math.cos(a), s = Math.sin(a), cf = Math.max(c, 0), cr = Math.max(-c, 0);
      var sx = (c >= 0 ? D.AF : D.AR) * rf * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), DP);
      var sy = D.AY * rf * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), DP);
      return [sx, sy, hz * (1 - D.drop * cf * cf - D.rdrop * cr * cr)];
    }
    function draw(bin) {
      var NS = 48, Gd = [], rI, j, Vv = [], Nacc = [], tris = [], ctr = [0, 0, 0.05];
      for (rI = 0; rI < PROF.length; rI++) {
        Gd.push([]);
        for (j = 0; j < NS; j++) { Gd[rI].push(Vv.length); Vv.push(at(j / NS * TAU, PROF[rI][0], PROF[rI][1])); Nacc.push([0, 0, 0]); }
      }
      function face(a, b, d) {
        var n = cross(sub(Vv[b], Vv[a]), sub(Vv[d], Vv[a])), m = [(Vv[a][0] + Vv[b][0] + Vv[d][0]) / 3 - ctr[0], (Vv[a][1] + Vv[b][1] + Vv[d][1]) / 3, (Vv[a][2] + Vv[b][2] + Vv[d][2]) / 3 - ctr[2]];
        if (dot(n, m) < 0) { var t = b; b = d; d = t; n = [-n[0], -n[1], -n[2]]; }
        n = unit(n);
        [a, b, d].forEach(function (i) { Nacc[i][0] += n[0]; Nacc[i][1] += n[1]; Nacc[i][2] += n[2]; });
        tris.push([a, b, d]);
      }
      for (rI = 0; rI + 1 < PROF.length; rI++)
        for (j = 0; j < NS; j++) {
          var j1 = (j + 1) % NS;
          face(Gd[rI][j], Gd[rI][j1], Gd[rI + 1][j1]); face(Gd[rI][j], Gd[rI + 1][j1], Gd[rI + 1][j]);
        }
      var NN = Nacc.map(unit);
      tris.forEach(function (t) {
        var A = Vv[t[0]], Bv = Vv[t[1]], Cv = Vv[t[2]];
        if (cross(sub(Bv, A), sub(Cv, A)).every(function (q) { return Math.abs(q) < 1e-9; })) return;
        bin.tri(A, Bv, Cv, NN[t[0]], NN[t[1]], NN[t[2]]);
      });
      cylZ(bin, 0, 0, -0.04, 0.02, D.ring, 36);
    }
    function on(a, hz, dr) {
      var lo = 0, hi = PROF.length - 1, k, P, l, u;
      for (k = 0; k + 1 < PROF.length; k++) if (hz >= PROF[k][1] && hz <= PROF[k + 1][1]) { lo = k; hi = k + 1; break; }
      u = (hz - PROF[lo][1]) / ((PROF[hi][1] - PROF[lo][1]) || 1);
      P = at(a, PROF[lo][0] + (PROF[hi][0] - PROF[lo][0]) * u, hz);
      l = Math.sqrt(P[0] * P[0] + P[1] * P[1]) || 1;
      return [P[0] + P[0] / l * dr, P[1] + P[1] / l * dr, P[2]];
    }
    function roofZ(x, y) {
      var a = Math.atan2(y, x), r = Math.sqrt(x * x + y * y), k, P, Q, rp, rq;
      for (k = PROF.length - 1; k > 0; k--) {
        P = at(a, PROF[k][0], PROF[k][1]); Q = at(a, PROF[k - 1][0], PROF[k - 1][1]);
        rp = Math.sqrt(P[0] * P[0] + P[1] * P[1]); rq = Math.sqrt(Q[0] * Q[0] + Q[1] * Q[1]);
        if (r >= rp && r <= rq) return P[2] + (Q[2] - P[2]) * (r - rp) / ((rq - rp) || 1);
      }
      return PROF[PROF.length - 1][1];
    }
    return { D: D, draw: draw, on: on, roofZ: roofZ, at: at };
  }

  /* --------------------------------------------------------------- guns
     115 mm U-5TS (ru_t62.js addGun, copied): evacuator 1.5-2.6 m back from the muzzle, plain
     muzzle.  The sleeved tubes: a thermal sleeve in banded sections with the evacuator inside
     it (Ch'onma-92 on, en.wikipedia "a thermal sleeve for the gun"; P2/P3 and the 2A46 on the
     T-72 for the 125 mm). */
  function addGun(B, x0, GZ, M, kind) {
    cylX(B.paint, x0 - 0.25, x0 + 0.10, 0, GZ, 0.36, 0.28, 20);
    cylX(B.dark, x0 + 0.08, x0 + 0.30, 0, GZ, 0.22, 0.155, 16);
    if (kind === "u5ts") {
      cylX(B.paint, x0 + 0.28, M - 2.62, 0, GZ, 0.115, 0.098, 18);
      cylX(B.paint, M - 2.62, M - 2.50, 0, GZ, 0.098, 0.130, 18);
      cylX(B.paint, M - 2.50, M - 1.62, 0, GZ, 0.130, 0.130, 18);
      cylX(B.dark, M - 2.40, M - 2.36, 0, GZ, 0.134, 0.134, 16);
      cylX(B.dark, M - 1.76, M - 1.72, 0, GZ, 0.134, 0.134, 16);
      cylX(B.paint, M - 1.62, M - 1.50, 0, GZ, 0.130, 0.088, 18);
      cylX(B.paint, M - 1.50, M, 0, GZ, 0.088, 0.078, 16);
      cylX(B.dark, M - 0.06, M + 0.005, 0, GZ, 0.082, 0.082, 16);
      return;
    }
    /* sleeved: kind "sleeve115" or "sleeve125"; r = sleeve radius */
    var r = kind === "sleeve125" ? 0.105 : 0.098, evA = kind === "sleeve125" ? 2.95 : 2.62, evB = kind === "sleeve125" ? 2.20 : 1.62;
    cylX(B.paint, x0 + 0.28, M - evA, 0, GZ, r + 0.012, r, 18);
    cylX(B.paint, M - evA, M - evA + 0.10, 0, GZ, r, 0.140, 18);
    cylX(B.paint, M - evA + 0.10, M - evB, 0, GZ, 0.140, 0.140, 18);
    cylX(B.paint, M - evB, M - evB + 0.10, 0, GZ, 0.140, r - 0.01, 18);
    cylX(B.paint, M - evB + 0.10, M - 0.12, 0, GZ, r - 0.01, r - 0.02, 16);
    var bands = [x0 + 0.70, x0 + 1.30, M - evA + 0.35, M - evB - 0.25, (M - evB + M) / 2, M - 0.55];
    bands.forEach(function (bx) { cylX(B.dark, bx - 0.02, bx + 0.02, 0, GZ, r + 0.018, r + 0.018, 16); });
    cylX(B.paint, M - 0.12, M, 0, GZ, 0.085, 0.085, 16);
    cylX(B.dark, M - 0.01, M + 0.005, 0, GZ, 0.07, 0.07, 14);
  }
  /* KPV 14.5 mm on a ring mount (en.wikipedia infoboxes: Ch'onma, Pokpung-ho; ru.wikipedia:
     Songun; P1 shows the heavy MG on the right-hand hatch ring of a 2013 Ch'onma).  Built at
     the ring centre (x, y, z): ring, cradle, receiver, the long perforated jacket, box. */
  function addKpv(B, x, y, z, yaw) {
    var c = Math.cos(yaw), s = Math.sin(yaw);
    function P(u, v, w) { return [x + u * c - v * s, y + u * s + v * c, z + w]; }
    cylZ(B.paint, x, y, z - 0.04, z + 0.06, 0.36, 22);
    cylZ(B.dark, x, y, z + 0.06, z + 0.09, 0.33, 22);
    cyl(B.dark, P(0.05, 0, 0.09), P(0.05, 0, 0.32), 0.035, 0.035, 8);
    slab(B.dark, P(-0.05, 0, 0.40), [c, s, 0], [-s, c, 0], [0, 0, 1], 0.32, 0.07, 0.07);
    cyl(B.dark, P(0.27, 0, 0.42), P(1.05, 0, 0.42), 0.045, 0.045, 10);
    cyl(B.dark, P(1.05, 0, 0.42), P(1.62, 0, 0.42), 0.022, 0.022, 8);
    cyl(B.dark, P(1.58, 0, 0.42), P(1.68, 0, 0.42), 0.035, 0.035, 8);
    slab(B.dark, P(-0.05, 0.16, 0.34), [c, s, 0], [-s, c, 0], [0, 0, 1], 0.15, 0.07, 0.10);
  }
  /* smoke grenade launchers: n tubes in a fan at (x, y, z), pointing out and up */
  function addSmoke(B, x, y, z, side, n, aimX) {
    for (var i = 0; i < n; i++) {
      var yy = y + side * i * 0.02, xx = x - i * 0.11, dir = unit([aimX, side * 0.55, 0.55]);
      cyl(B.dark, [xx, yy, z], [xx + dir[0] * 0.26, yy + dir[1] * 0.26, z + dir[2] * 0.26], 0.042, 0.042, 8);
    }
  }
  /* a twin Bulsae (Kornet-type) launcher on its post (P2, P3: two long tubes on a mast in the
     middle of the Chonma-216 roof; ru.wikipedia: the Songun's pair over the mantlet) */
  function addTwinAtgm(B, x, y, z, h) {
    cylZ(B.dark, x, y, z, z + h, 0.035, 8);
    box(B.dark, x - 0.10, x + 0.10, y - 0.20, y + 0.20, z + h - 0.03, z + h + 0.03);
    for (var s = -1; s <= 1; s += 2) {
      cylX(B.paint, x - 0.55, x + 0.70, y + s * 0.13, z + h + 0.12, 0.075, 0.075, 12);
      cylX(B.dark, x + 0.70, x + 0.72, y + s * 0.13, z + h + 0.12, 0.06, 0.06, 12);
      cylX(B.dark, x - 0.57, x - 0.55, y + s * 0.13, z + h + 0.12, 0.06, 0.06, 12);
    }
  }
  /* L-2 "Luna" IR searchlight on its bracket right of the gun (ru_t62.js, copied) */
  function addLuna(B, x, y, z, D, GZ) {
    box(B.dark, x - 0.12, x + 0.12, y - 0.06, y + 0.06, z - 0.06, z + 0.10);
    box(B.dark, x - 0.06, x + 0.06, y - 0.16, y + 0.16, z + 0.08, z + 0.12);
    cylX(B.paint, x - 0.18, x + 0.18, y, z + 0.30, 0.20, 0.20, 22);
    cylX(B.paint, x - 0.26, x - 0.18, y, z + 0.30, 0.15, 0.20, 18);
    cylX(B.dark, x + 0.18, x + 0.20, y, z + 0.30, 0.175, 0.175, 22);
    cyl(B.dark, [x + 0.05, y + 0.16, z + 0.12], [D.AF + 0.08, -0.20, GZ + 0.18], 0.02, 0.02, 6);
  }
  /* commander's cupola (ru_t62.js) at (CX, CY, CZ) */
  function addCupola(B, CX, CY, CZ) {
    var i, a;
    cylZ(B.paint, CX, CY, CZ - 0.08, CZ + 0.08, 0.33, 22);
    for (i = 0; i < 4; i++) {
      a = (i - 1.5) * 0.45;
      box(B.dark, CX + Math.cos(a) * 0.30 - 0.04, CX + Math.cos(a) * 0.30 + 0.04,
          CY + Math.sin(a) * 0.30 - 0.04, CY + Math.sin(a) * 0.30 + 0.04, CZ + 0.02, CZ + 0.09);
    }
    cylZ(B.paint, CX, CY, CZ + 0.08, CZ + 0.13, 0.28, 18);
    box(B.paint, CX + 0.16, CX + 0.34, CY - 0.09, CY + 0.09, CZ + 0.06, CZ + 0.17);
    box(B.dark, CX + 0.34, CX + 0.36, CY - 0.07, CY + 0.07, CZ + 0.09, CZ + 0.15);
  }
  /* curved handrails (ru_t62.js) */
  function addRails(B, T, RAILS) {
    var s, i, k, a, Q, prev;
    for (s = -1; s <= 1; s += 2)
      for (i = 0; i < RAILS.length; i++) {
        var a0 = RAILS[i][0], a1 = RAILS[i][1], hz = RAILS[i][2], NSG = 6;
        prev = null;
        for (k = 0; k <= NSG; k++) {
          a = s * (a0 + (a1 - a0) * k / NSG);
          Q = T.on(a, hz, 0.07);
          if (prev) cyl(B.dark, prev, Q, 0.018, 0.018, 5, true);
          prev = Q;
        }
        [a0, a1].forEach(function (aa) { cyl(B.dark, T.on(s * aa, hz, -0.02), T.on(s * aa, hz, 0.07), 0.016, 0.016, 5, true); });
      }
  }

  /* ------------------------------------------------- the four MBT turrets */
  /* Ch'onma (kpa_e80_mbt): the T-62 egg, as ru_t62.js draws it, with the KPV on the
     loader's hatch ring (P1) in place of the T-62's plain hatch */
  var EGG = { AF: 1.36, AR: 1.50, AY: 1.21, H: 0.97, drop: 0.02, rdrop: 0.10, prof: PROF62, ring: 1.16 };
  /* Ch'onma-214 (kpa_e90_mbt): "slightly larger" shell of the same shape (en.wikipedia), ~4 % */
  var EGG214 = { AF: 1.42, AR: 1.58, AY: 1.26, H: 0.99, drop: 0.02, rdrop: 0.10, prof: PROF62, ring: 1.16 };
  /* Songun-915 (kpa_e00_heavy): "a massive cast turret", dome-shaped (en/ru.wikipedia); sized
     so its roof stands at the published 2.416 m (ru.wikipedia, the Pyongyang museum plate):
     1.40 deck + 1.02.  Plan radii are judgement (no side photograph found) */
  var SONGUN = { AF: 1.52, AR: 1.70, AY: 1.36, H: 1.02, drop: 0.06, rdrop: 0.08,
                 prof: [[1.00, 0.00], [1.015, 0.10], [1.00, 0.26], [0.96, 0.42], [0.88, 0.57], [0.76, 0.71], [0.58, 0.83], [0.34, 0.92], [0.0, 0.97]], ring: 1.22 };

  function turretEgg(B, V, G, D) {
    var T = Dome(D), H = D.H, GZ = 0.38, x, y, z, s, i;
    T.draw(B.paint);
    addGun(B, D.AF - 0.10, GZ, V.muz - G.TX, V.gun);
    cylX(B.dark, D.AF - 0.20, D.AF + 0.12, -0.32, GZ - 0.04, 0.025, 0.025, 8);   /* coaxial PKT port */
    cylX(B.dark, D.AF - 0.22, D.AF + 0.06, 0.40, GZ + 0.10, 0.06, 0.06, 12);     /* gunner's sight port */
    if (V.luna) { x = D.AF - 0.38; y = -0.56; addLuna(B, x, y, T.roofZ(x, y), D, GZ); }
    var CX = 0.05, CY = 0.50;
    addCupola(B, CX, CY, T.roofZ(CX, CY));
    x = 0.62; y = 0.44; z = T.roofZ(x, y);
    box(B.paint, x - 0.14, x + 0.14, y - 0.12, y + 0.12, z - 0.04, z + 0.12);
    box(B.dark, x + 0.14, x + 0.16, y - 0.09, y + 0.09, z + 0.02, z + 0.10);
    /* the KPV on the loader's ring, right and further back (P1, en.wikipedia) */
    x = -0.35; y = -0.50;
    addKpv(B, x, y, T.roofZ(x, y), 0);
    /* ventilator dome on the rear roof (T-62) */
    x = -1.05; y = 0.36; z = T.roofZ(x, y);
    cylZ(B.paint, x, y, z - 0.05, z + 0.08, 0.15, 14);
    cyl(B.paint, [x, y, z + 0.08], [x, y, z + 0.12], 0.15, 0.06, 14);
    addRails(B, T, [[0.55, 1.35, 0.45], [1.70, 2.45, 0.50]]);
    /* the snorkel tube across the turret rear (T-62, inherited) */
    var sx = -D.AR - 0.02, sz = 0.36;
    cylY(B.paint, sx, -0.85, 0.80, sz, 0.09, 14);
    cylY(B.paint, sx, 0.80, 0.92, sz, 0.115, 14);
    for (s = -1; s <= 1; s += 2) box(B.dark, sx - 0.02, -D.AR + 0.14, s * 0.55 - 0.03, s * 0.55 + 0.03, sz - 0.10, sz - 0.04);
    cylZ(B.dark, -0.70, 0.78, T.roofZ(-0.70, 0.78) - 0.05, T.roofZ(-0.70, 0.78) + 0.12, 0.05, 8);
    box(B.team, -0.80, -0.30, 0.05, 0.25, T.roofZ(-0.55, 0.15) - 0.02, T.roofZ(-0.55, 0.15) + 0.02);

    if (V.turret !== "c214") return;
    /* --- Ch'onma-92/-98/-214 additions (en.wikipedia; P4 the 1992 parade; D2 side render) ---
       the external laser rangefinder in its box over the gun root, the BDD-type add-on blocks
       on the turret front either side of the mantlet (Ch'onma-214, "similar to the Soviet BDD
       on the T-55M and T-62M"), ERA bricks on the turret sides in three rows of 3-4-4 (from
       the Ch'onma-92), smoke grenade launchers on the front turret */
    z = T.roofZ(D.AF - 0.55, 0);
    box(B.paint, D.AF - 0.70, D.AF - 0.20, -0.20, 0.20, z - 0.02, z + 0.24);
    box(B.dark, D.AF - 0.20, D.AF - 0.18, -0.14, 0.14, z + 0.06, z + 0.18);
    for (s = -1; s <= 1; s += 2) {
      /* the brow block: a thick curved slab wrapped on the front quarter, 0.45-1.15 rad */
      var a0 = 0.30, a1 = 1.05, k, NSG = 4, prev = null;
      for (k = 0; k < NSG; k++) {
        var aa = s * (a0 + (a1 - a0) * (k + 0.5) / NSG), P0 = T.on(aa, 0.30, 0.10), u = unit([Math.cos(aa), Math.sin(aa), 0]);
        slab(B.paint, [P0[0], P0[1], 0.34], u, unit([-Math.sin(aa), Math.cos(aa), 0]), [0, 0, 1], 0.10, (a1 - a0) / NSG * 0.70, 0.26);
      }
      /* ERA: three rows of bricks (3, 4, 4) on the side from the middle back */
      var rows = [[0.62, 3], [0.40, 4], [0.18, 4]], r, c;
      for (r = 0; r < rows.length; r++)
        for (c = 0; c < rows[r][1]; c++) {
          var ang = s * (1.55 + c * 0.22 + (r === 0 ? 0.11 : 0)), P1 = T.on(ang, rows[r][0], 0.05);
          slab(B.paint, P1, unit([Math.cos(ang), Math.sin(ang), 0]), unit([-Math.sin(ang), Math.cos(ang), 0]), [0, 0, 1], 0.05, 0.13, 0.09);
        }
      /* smoke launchers: a fan of four each side of the front (Ch'onma-92 "smoke grenade
         launchers on the front turret"; the count is NOT CONFIRMED) */
      P = T.on(s * 0.95, 0.70, 0.02);
      addSmoke(B, P[0], P[1], P[2], s, 4, 0.75);
    }
    var P;
  }

  /* Pokpung-ho (Chonma-216, kpa_e00_mbt): a low welded turret, the cheeks built up with wedge
     armour/ERA boxes and the front of the roof with ERA (en.wikipedia), smoke launchers four a
     side (en.wikipedia), KPV on the loader's ring, the twin Bulsae launcher on a mast in the
     middle of the roof (P2, P3).  Plan and heights from P2 at the turret front station:
     2.30 m across the cheek boxes against the 3.5 m hull, roof 0.62 m over the deck. */
  function turretPok(B, V, G) {
    var H = 0.62, GZ = 0.36, s, i, j, x, y, z;
    /* the shell: lofted through plan polygons at three heights - a blunt pointed front, near
       vertical sides, the rear bustle overhanging and tapering */
    function plan(z, k) {
      return [[1.30 * k, 0.55 * k, z], [0.85 * k + 0.05, 1.05 * k, z], [-0.60, 1.10 * k, z], [-1.30 * k - 0.10, 1.00 * k, z],
              [-1.55 * k - 0.05, 0.62 * k, z], [-1.55 * k - 0.05, -0.62 * k, z], [-1.30 * k - 0.10, -1.00 * k, z], [-0.60, -1.10 * k, z],
              [0.85 * k + 0.05, -1.05 * k, z], [1.30 * k, -0.55 * k, z]];
    }
    function lift(L, z) { return L.map(function (p) { return [p[0], p[1], z]; }); }
    loftN(B.paint, [plan(-0.02, 0.96), plan(0.18, 1.00), plan(0.48, 0.95), lift(plan(0, 0.82), H)]);
    cylZ(B.paint, 0, 0, -0.04, 0.02, 1.16, 36);
    /* the cheek armour: two stacked wedge boxes each side of the mantlet, angled back */
    for (s = -1; s <= 1; s += 2) {
      for (j = 0; j < 2; j++) {
        var cx = 1.05 - j * 0.32, cy = s * (0.62 + j * 0.30), ang = s * 0.55;
        slab(B.paint, [cx, cy, 0.30], unit([Math.cos(ang), Math.sin(ang), 0]), unit([-Math.sin(ang), Math.cos(ang), 0]), [0, 0, 1], 0.17, 0.20, 0.26);
        slab(B.dark, [cx + Math.cos(ang) * 0.172, cy + Math.sin(ang) * 0.172, 0.30], unit([Math.cos(ang), Math.sin(ang), 0]), unit([-Math.sin(ang), Math.cos(ang), 0]), [0, 0, 1], 0.004, 0.18, 0.005);
      }
      /* ERA row on the front of the roof (Chonma-216) */
      for (i = 0; i < 3; i++) box(B.paint, 0.55, 0.92, s * (0.30 + i * 0.25) - 0.11, s * (0.30 + i * 0.25) + 0.11, H - 0.02, H + 0.07);
      /* four smoke launchers a side, on the side wall behind the cheeks */
      addSmoke(B, 0.40, s * 1.10, 0.45, s, 4, 0.65);
      /* stowage boxes along the bustle sides (P3, judgement on their number) */
      box(B.paint, -1.40, -0.55, s > 0 ? 1.04 : -1.20, s > 0 ? 1.20 : -1.04, 0.10, 0.40);
    }
    addGun(B, 1.30, GZ, V.muz - G.TX, V.gun);
    cylX(B.dark, 1.10, 1.40, -0.36, GZ - 0.04, 0.025, 0.025, 8);
    /* gunner's sight box on the left front of the roof, cupola left, KPV right */
    box(B.paint, 0.30, 0.62, 0.55, 0.82, H, H + 0.20);
    box(B.dark, 0.62, 0.64, 0.58, 0.79, H + 0.06, H + 0.17);
    addCupola(B, -0.20, 0.52, H + 0.04);
    addKpv(B, -0.30, -0.52, H + 0.02, 0);
    addTwinAtgm(B, -0.15, 0.0, H, 0.42);
    /* meteorological mast at the rear (en.wikipedia: "the presence of a meteorological mast") */
    cylZ(B.dark, -1.35, 0.30, H - 0.10, H + 0.55, 0.018, 6);
    box(B.dark, -1.39, -1.31, 0.26, 0.34, H + 0.55, H + 0.60);
    /* rear-wall stowage basket and the team strip */
    box(B.dark, -1.75, -1.62, -0.80, 0.80, 0.08, 0.10);
    box(B.dark, -1.75, -1.62, -0.80, 0.80, 0.38, 0.40);
    box(B.team, -1.15, -0.65, -0.10, 0.10, H, H + 0.02);
  }

  /* Songun-915 (kpa_e00_heavy): the big cast dome; ERA on its front arc (ru.wikipedia), four
     smoke launchers a side in pairs (ru.wikipedia), KPVT, the two Bulsae-3 tubes "above the
     gun mantlet" (ru.wikipedia), the cupola left */
  function turretSongun(B, V, G) {
    var D = SONGUN, T = Dome(D), GZ = 0.40, s, r, c, x, y, z;
    T.draw(B.paint);
    addGun(B, D.AF - 0.10, GZ, V.muz - G.TX, V.gun);
    cylX(B.dark, D.AF - 0.20, D.AF + 0.12, -0.34, GZ - 0.04, 0.025, 0.025, 8);
    for (s = -1; s <= 1; s += 2) {
      /* ERA: two rows of bricks over the front arc either side of the mantlet */
      for (r = 0; r < 2; r++)
        for (c = 0; c < 4; c++) {
          var ang = s * (0.42 + c * 0.20), P1 = T.on(ang, 0.26 + r * 0.26, 0.06);
          slab(B.paint, P1, unit([Math.cos(ang), Math.sin(ang), 0.25]), unit([-Math.sin(ang), Math.cos(ang), 0]), unit([-Math.cos(ang) * 0.25, -Math.sin(ang) * 0.25, 1]), 0.06, 0.13, 0.11);
        }
      /* four smoke launchers a side in two pairs */
      var P = T.on(s * 1.30, 0.62, 0.02);
      addSmoke(B, P[0], P[1], P[2], s, 2, 0.6);
      P = T.on(s * 1.55, 0.62, 0.02);
      addSmoke(B, P[0], P[1], P[2], s, 2, 0.6);
    }
    addTwinAtgm(B, D.AF - 0.55, 0, T.roofZ(D.AF - 0.55, 0), 0.20);
    var CX = -0.05, CY = 0.55;
    addCupola(B, CX, CY, T.roofZ(CX, CY));
    x = 0.60; y = 0.48; z = T.roofZ(x, y);
    box(B.paint, x - 0.16, x + 0.16, y - 0.13, y + 0.13, z - 0.04, z + 0.18);
    box(B.dark, x + 0.16, x + 0.18, y - 0.10, y + 0.10, z + 0.04, z + 0.15);
    x = -0.35; y = -0.55;
    addKpv(B, x, y, T.roofZ(x, y), 0);
    cylZ(B.dark, -1.30, 0.40, T.roofZ(-1.30, 0.40) - 0.05, T.roofZ(-1.30, 0.40) + 0.55, 0.018, 6);
    addRails(B, T, [[1.75, 2.45, 0.50]]);
    box(B.team, -0.95, -0.45, -0.10, 0.10, T.roofZ(-0.7, 0) - 0.02, T.roofZ(-0.7, 0) + 0.02);
  }

  function buildMbt(THREE, C, V) {
    var G = geom(V), T = materials(THREE, C, { paint: PAINT }), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    addHull(HB, V, G);
    addRunning(HB, V, G);
    flush(THREE, g, HB);
    for (i = 0; i < G.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      addWheel(WB, PAINT);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(G.XW[i], 0, ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    if (V.turret === "pok") turretPok(TB, V, G);
    else if (V.turret === "songun") turretSongun(TB, V, G);
    else turretEgg(TB, V, G, V.turret === "c214" ? EGG214 : EGG);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(G.TX, 0, RING);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  /* ================================================================ PT-85 (TYPE 82)
     Built on the Type 63 APC kit of js/hero/pla_type63_apc.js (HeroType63Apc): the box hull
     with the upper sides leaning in, the front drive sprocket, the rear idler, no return
     rollers, the dished rubber-tyred road wheels on the 0.99 m pitch measured there (its P1).
     CHANGED: SIX road wheels (P5: the "lengthened VTT-323"; the VTT-323 itself is the five
     wheel Type A531, en.wikipedia Type 63 article, P6), so the hull is 7.44 m (the Type 63's
     end overhangs over five pitches); no fender bins (P5 shows a plain side with a ledge);
     the deck lower and flat from the glacis to the stern; the turret. */
  var PT = {
    L: 7.44, TY: 1.33, TW: 0.19, ZW: 0.37, RW: 0.37,
    BELLY: 0.42, LEDGE: 1.05, DECK: 1.78, SIDE: 1.53, DW: 1.26, TX: -0.45
  };
  PT.NOSE = PT.L / 2; PT.REAR = -PT.L / 2;
  PT.XW = (function () { var a = [], i; for (i = 0; i < 6; i++) a.push(PT.NOSE - 1.31 - i * 0.99); return a; })();
  PT.SPR = { x: PT.NOSE - 0.47, z: 0.58, r: 0.27 };
  PT.IDL = { x: PT.REAR + 0.46, z: 0.48, r: 0.28 };
  PT.MUZ = 9.40 - PT.L / 2;                               /* muzzle: the published 9.4 m gun forward */

  function ptHull(B, V) {
    var s, i, x, NOSE = PT.NOSE, REAR = PT.REAR, DECK = PT.DECK, LEDGE = PT.LEDGE, SW = PT.SIDE, DW = PT.DW;
    /* lower hull between the tracks: belly, the lower nose plate leaning back, the rear plate */
    prismY(B.paint, [[REAR, 0.60], [REAR + 0.15, PT.BELLY], [NOSE - 0.85, PT.BELLY], [NOSE, 0.95], [NOSE, LEDGE + 0.02], [REAR, LEDGE + 0.02]], -1.10, 1.10);
    /* upper hull: the ledge over the track, the upper sides leaning in to the deck (P5), the
       long glacis falling to the bow, the near vertical stern */
    function sec(x, top, hw, w0) {
      return [[x, -w0, LEDGE], [x, w0, LEDGE], [x, w0, LEDGE + 0.12], [x, hw, top], [x, -hw, top], [x, -w0, LEDGE + 0.12]];
    }
    loftN(B.paint, [sec(REAR, DECK - 0.10, DW - 0.06, SW - 0.10), sec(REAR + 0.08, DECK, DW, SW - 0.10),
                    sec(NOSE - 1.75, DECK, DW, SW - 0.10), sec(NOSE, LEDGE + 0.14, DW + 0.08, SW - 0.10)]);
    var ang = Math.atan2(DECK - (LEDGE + 0.14), 1.75), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    function gz(x) { return DECK - (x - (NOSE - 1.75)) * Math.tan(ang); }
    for (s = -1; s <= 1; s += 2) {
      var yi = s * (SW - 0.12), yo = s * SW, ya = Math.min(yi, yo), yb = Math.max(yi, yo);
      /* the thin ledge along the track top (P5) and its lip */
      box(B.paint, REAR + 0.02, NOSE - 0.08, ya, yb, LEDGE, LEDGE + 0.04);
      box(B.dark, REAR + 0.02, NOSE - 0.08, s > 0 ? yb : ya - 0.012, s > 0 ? yb + 0.012 : ya, LEDGE + 0.005, LEDGE + 0.035);
      belt(B.paint, NOSE - 0.08, LEDGE, NOSE + 0.08, LEDGE - 0.22, ya, yb, 0.03);
      /* stowage box on the rear deck edge (P5, the dark block on the left rear) */
      box(B.paint, REAR + 0.25, REAR + 1.05, s * (DW - 0.05) - 0.16, s * (DW - 0.05) + 0.16, DECK, DECK + 0.20);
      /* tow eyes on the nose */
      box(B.dark, NOSE - 0.04, NOSE + 0.08, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.82, 0.92);
    }
    /* glacis: driver's hatch and periscopes in the front left of the deck (judgement), the
       lights.  e80: two lamps each side of the glacis (en.wikipedia, early tanks); e90/e00:
       three lamps on the right of the glacis and one on the left side plate (en.wikipedia) */
    x = NOSE - 1.95;
    cylZ(B.paint, x, 0.55, DECK, DECK + 0.05, 0.25, 16);
    box(B.dark, x + 0.22, x + 0.28, 0.42, 0.50, DECK - 0.01, DECK + 0.05);
    box(B.dark, x + 0.22, x + 0.28, 0.60, 0.68, DECK - 0.01, DECK + 0.05);
    var lamps = V.early ? [[1.00, 0.10], [1.00, -0.10], [-1.00, 0.10], [-1.00, -0.10]] : [[-1.00, 0.10], [-1.00, -0.10], [-0.75, 0.0]];
    lamps.forEach(function (L) {
      var lx = NOSE - 1.25 + L[1] * 0.0, ly = L[0] + L[1], lz = gz(NOSE - 1.25);
      cyl(B.dark, [lx, ly, lz + 0.10], [lx + 0.12, ly, lz + 0.09], 0.065, 0.065, 10);
      box(B.dark, lx - 0.06, lx + 0.02, ly - 0.03, ly + 0.03, lz, lz + 0.08);
    });
    if (!V.early) cyl(B.dark, [NOSE - 1.40, 1.55, LEDGE + 0.30], [NOSE - 1.28, 1.55, LEDGE + 0.30], 0.06, 0.06, 10);
    /* engine grille on the front right deck behind the glacis (the Type 63 family's engine
       sits front right; NOT CONFIRMED for the PT-85) */
    box(B.dark, NOSE - 2.35, NOSE - 1.80, -1.05, -0.35, DECK, DECK + 0.012);
    for (i = 0; i < 6; i++) box(B.paint, NOSE - 2.33 + i * 0.09, NOSE - 2.29 + i * 0.09, -1.03, -0.37, DECK + 0.012, DECK + 0.04);
    /* rear: plate, hydro-jet outlets low at the corners (amphibious, judgement), lights */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, REAR - 0.04, REAR + 0.01, s * 0.75, 0.75, 0.16, 0.16, 14);
      box(B.dark, REAR - 0.06, REAR, s * 0.95 - 0.06, s * 0.95 + 0.06, 1.45, 1.55);
    }
    box(B.team, REAR + 0.40, REAR + 1.10, -0.12, 0.12, DECK, DECK + 0.02);
  }
  function ptRunning(B) {
    var C = [], i, k, n, a, b, l, d, t, tot = 0, segs = [], q, rem, px, pz, s, y, step, cnt, dx, dz, pts = [];
    for (i = 0; i < PT.XW.length; i++) C.push([PT.XW[i], PT.ZW, PT.RW + 0.035]);
    C.push([PT.IDL.x, PT.IDL.z, PT.IDL.r + 0.035], [PT.SPR.x, PT.SPR.z, PT.SPR.r + 0.035]);
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
    cnt = Math.round(tot / 0.20); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * PT.TY;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - PT.TW, y + PT.TW, 0.05);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * 0.05, pz - dz * 0.05, px + dx * 0.05, pz + dz * 0.05, y - PT.TW - 0.01, y + PT.TW + 0.01, 0.07);
        belt(B.dark, px - dx * 0.025 - dz * 0.06, pz - dz * 0.025 + dx * 0.06, px + dx * 0.025 - dz * 0.06, pz + dz * 0.025 + dx * 0.06, y - 0.025, y + 0.025, 0.05);
      }
      var SPR = PT.SPR, IDL = PT.IDL;
      cylY(B.dark, SPR.x, y - 0.12, y + 0.12, SPR.z, SPR.r - 0.05, 18);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU, ca = Math.cos(ta), sa = Math.sin(ta);
        slab(B.dark, [SPR.x + ca * (SPR.r - 0.02), y, SPR.z + sa * (SPR.r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.04, 0.09, 0.03);
      }
      cylY(B.paint, SPR.x, y + s * 0.12, y + s * 0.17, SPR.z, 0.15, 14);
      cylY(B.paint, IDL.x, y - 0.15, y + 0.15, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.15, y + s * 0.20, IDL.z, 0.07, 10);
    }
  }
  /* road wheel (pla_type63_apc.js, copied; P5 shows the same dished discs with pale rims) */
  var HOLE63 = [0.17, 0.18, 0.15];
  function ptWheel(W) {
    var s, y, i, a, c = PAINT.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.12, gg * 1.12, bb * 1.12], RIB = [rr * 1.3, gg * 1.3, bb * 1.3];
    for (s = -1; s <= 1; s += 2) {
      y = s * PT.TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.15, y + 0.15, 0, PT.RW, 20);
      W.col = BODY;
      cyl(W, [0, y + s * 0.15, 0], [0, y + s * 0.18, 0], PT.RW - 0.055, 0.12, 20);
      W.col = HOLE63;
      for (i = 0; i < 6; i++) {
        a = (i + 0.5) / 6 * TAU;
        slab(W, [Math.cos(a) * 0.20, y + s * 0.168, Math.sin(a) * 0.20], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.06, 0.010, 0.055);
      }
      W.col = RIB;
      cylY(W, 0, y + s * 0.17, y + s * 0.20, 0, 0.09, 10);
    }
  }
  /* the turret (P5; en.wikipedia "a higher horseshoe-shaped turret ... hatches similar to
     those of a T-54"): a truncated cone, round in front and flat-backed, the sides sloping in
     about 30 deg; 2.50 m long and 2.25 m across at the base, 0.56 m tall (P5: 0.31 of the deck
     height at the turret station), two round hatches side by side, the cupola left; the long
     85 mm tube with no muzzle brake seen (P5); a handrail along each side. */
  function ptTurret(B, V) {
    var H = 0.56, GZ = 0.28, s, i, x, y;
    function ring(z, k) {
      var P = [], n = 24, a, c, sn, rx;
      for (i = 0; i < n; i++) {
        a = i / n * TAU; c = Math.cos(a); sn = Math.sin(a);
        rx = c >= 0 ? 1.20 * k : 1.10 * k;
        /* the flat back: clip the rear to a straight wall */
        var px = rx * c, py = 1.12 * k * sn;
        if (px < -0.95 * k) px = -0.95 * k;
        P.push([px, py, z]);
      }
      return P;
    }
    loftN(B.paint, [ring(-0.02, 1.00), ring(0.10, 1.00), ring(H, 0.74)]);
    cylZ(B.paint, 0, 0, -0.04, 0.02, 1.00, 30);
    /* mantlet and the 85 mm tube */
    var M = PT.MUZ - PT.TX;
    cylX(B.paint, 0.95, 1.30, 0, GZ, 0.24, 0.20, 18);
    cylX(B.dark, 1.28, 1.42, 0, GZ, 0.14, 0.11, 14);
    cylX(B.paint, 1.40, 2.60, 0, GZ, 0.075, 0.068, 16);
    cylX(B.paint, 2.60, M - 0.10, 0, GZ, 0.064, 0.058, 16);
    cylX(B.paint, M - 0.10, M, 0, GZ, 0.066, 0.066, 14);
    cylX(B.dark, M - 0.01, M + 0.005, 0, GZ, 0.045, 0.045, 12);
    cylX(B.dark, 0.95, 1.30, -0.28, GZ - 0.02, 0.022, 0.022, 8);
    /* the two hatches side by side behind the roof centre (P5): cupola left, loader right */
    addCupola(B, -0.20, 0.42, H + 0.02);
    cylZ(B.paint, -0.25, -0.42, H, H + 0.06, 0.30, 18);
    cyl(B.paint, [-0.25, -0.42, H + 0.06], [-0.25, -0.42, H + 0.10], 0.28, 0.18, 18);
    /* the 14.5 mm AA MG on the loader's hatch (en.wikipedia secondary armament) */
    addKpv(B, -0.25, -0.42, H + 0.02, 0);
    /* gunner's sight hood front left */
    box(B.paint, 0.35, 0.65, 0.30, 0.55, H, H + 0.16);
    box(B.dark, 0.65, 0.67, 0.33, 0.52, H + 0.04, H + 0.13);
    for (s = -1; s <= 1; s += 2) {
      /* handrail along the side (P5) */
      cyl(B.dark, [0.35, s * 1.02, 0.30], [-0.75, s * 0.98, 0.30], 0.016, 0.016, 5);
      cyl(B.dark, [0.35, s * 1.02, 0.30], [0.35, s * 0.94, 0.26], 0.014, 0.014, 5);
      cyl(B.dark, [-0.75, s * 0.98, 0.30], [-0.75, s * 0.90, 0.26], 0.014, 0.014, 5);
      /* e00: three smoke mortars a side (en.wikipedia, seen from 2015) */
      if (V.smoke) addSmoke(B, 0.10, s * 1.00, 0.42, s, 3, 0.5);
    }
    if (V.early) {
      /* the 9M14 Malyutka on its rail "on top of the turret directly above the main gun"
         (en.wikipedia, early tanks) */
      box(B.dark, 0.30, 0.95, -0.05, 0.05, H, H + 0.10);
      cylX(B.paint, 0.25, 1.11, 0, H + 0.20, 0.0625, 0.0625, 12);
      cylX(B.paint, 1.11, 1.30, 0, H + 0.20, 0.0625, 0.035, 12);
      for (s = -1; s <= 1; s += 2) slab(B.dark, [0.45, s * 0.12, H + 0.20], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.10, 0.08, 0.006);
    } else {
      /* the big IR projector right of the gun, braced to the mantlet (P5; en.wikipedia
         "possibly a reverse engineered copy of an L-2 Luna") */
      addLuna(B, 0.55, -0.62, H - 0.02, { AF: 1.10 }, GZ);
    }
    if (V.manpad) {
      /* the MANPADS tube at the turret rear (en.wikipedia, 2015) */
      cylZ(B.dark, -0.85, 0.0, H - 0.05, H + 0.30, 0.03, 6);
      cylX(B.paint, -1.40, -0.20, 0.0, H + 0.36, 0.04, 0.04, 10);
    }
    box(B.team, -0.75, -0.40, -0.10, 0.10, H, H + 0.02);
  }
  function buildPt85(THREE, C, V) {
    var T = materials(THREE, C, { paint: PAINT }), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, wg, WB, tg;
    ptHull(HB, V);
    ptRunning(HB);
    flush(THREE, g, HB);
    for (i = 0; i < PT.XW.length; i++) {
      WB = new Bin(T.wheel, false, true);
      ptWheel(WB);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(PT.XW[i], 0, PT.ZW);
      flush(THREE, wg, { wheel: WB });
      g.add(wg);
    }
    ptTurret(TB, V);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(PT.TX, 0, PT.DECK);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  /* ------------------------------------------------------------- variants */
  var ROWS = {
    /* Ch'onma (Ho I/II), the licence T-62: T-62 hull, wheels and egg turret; KPV on the
       loader's ring; the glacis bolt row; KPA green */
    c1:  { L: 6.63, wheels: 5, turret: "egg", gun: "u5ts", muz: 6.02, luna: true, fender: true, drums: true, bolts: true },
    /* Ch'onma-214 (Ho V): the slightly larger shell with LRF box, brow blocks, side ERA and
       smoke launchers; sleeved gun; rubber skirts to the published 3.52 m; nose flaps */
    c214: { L: 6.63, wheels: 5, turret: "c214", gun: "sleeve115", muz: 6.02, luna: true, fender: true, drums: true, bolts: true,
            skirt: "rubber", FW: 1.745, flaps: true },
    /* Pokpung-ho (Chonma-216): the hull stretched to the published ~7 m with a sixth wheel,
       the panel skirts to ~3.5 m, glacis ERA, the new turret, 125 mm */
    pok: { L: 7.00, wheels: 6, turret: "pok", gun: "sleeve125", muz: 6.415, skirt: "panel", FW: 1.75, glacisEra: true },
    /* Songun-915: the Pokpung-ho running gear (ru.wikipedia), the cast dome, 3.502 m wide */
    son: { L: 7.00, wheels: 6, turret: "songun", gun: "sleeve125", muz: 6.415, skirt: "panel", FW: 1.738, glacisEra: true }
  };
  var PTROWS = { e80: { early: true }, e90: {}, e00: { smoke: true, manpad: true } };
  return {
    c1: function (THREE, M, C) { return buildMbt(THREE, C, ROWS.c1); },
    c214: function (THREE, M, C) { return buildMbt(THREE, C, ROWS.c214); },
    pok: function (THREE, M, C) { return buildMbt(THREE, C, ROWS.pok); },
    son: function (THREE, M, C) { return buildMbt(THREE, C, ROWS.son); },
    pt85e80: function (THREE, M, C) { return buildPt85(THREE, C, PTROWS.e80); },
    pt85e90: function (THREE, M, C) { return buildPt85(THREE, C, PTROWS.e90); },
    pt85e00: function (THREE, M, C) { return buildPt85(THREE, C, PTROWS.e00); },
    rows: ROWS
  };
})();

/* len: the measured X extent of each build (models3d convention) */
UNIT_MODELS["kpa_e80_mbt"] = { len: 9.95, build: HeroKpaTanks.c1 };
UNIT_MODELS["kpa_e90_mbt"] = { len: 9.95, build: HeroKpaTanks.c214 };
UNIT_MODELS["kpa_e00_mbt"] = { len: 10.05, build: HeroKpaTanks.pok };
/* kpa_e00_heavy (Songun-915) is NOT registered: no photograph of it was
   found, so HeroKpaTanks.son rests on ru.wikipedia text and figures alone;
   the row keeps its stand-in until a photo is measured. */
/* UNIT_MODELS["kpa_e00_heavy"] = { len: 10.05, build: HeroKpaTanks.son }; */
UNIT_MODELS["kpa_e80_lighttank"] = { len: 9.47, build: HeroKpaTanks.pt85e80 };
UNIT_MODELS["kpa_e90_lighttank"] = { len: 9.47, build: HeroKpaTanks.pt85e90 };
UNIT_MODELS["kpa_e00_lighttank"] = { len: 9.47, build: HeroKpaTanks.pt85e00 };
