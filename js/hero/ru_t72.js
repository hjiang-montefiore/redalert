/* ========== ru_t72.js - HERO models: the T-72 family ========================
   pact_e60_t72     T-72 'Ural' (Object 172M, 1973)  round cast turret, TPD-2-49
                    coincidence rangefinder, fold-out gill panels, no smoke dischargers
   pact_e80_t72a    T-72A (Object 176, 1979)         thickened ("sand-filled") cheeks,
                    TPD-K1 laser sight, 902B smoke dischargers, rubber side skirts
   pact_e80_t72b    T-72B (Object 184, 1985)         bigger cheeks under Kontakt-1
   pact_e90_t72b89  T-72B obr. 1989                  Kontakt-5 on turret and glacis
   pact_e00_t72b3   T-72B3 (2011/2013)               Kontakt-5, Sosna-U sight box, drums
   pact_e20_t72b3m  T-72B3 obr. 2016                 Relikt side screens, slat screens
                    over the engine bay, a slat grille round the turret bustle
   One builder, a VARIANTS table. The hull, running gear and gun are shared (the T-72
   hull is the hull the T-90 kept: the station table HS and the running gear are the ones
   measured for js/hero/ru_t90.js off the T-90 side drawing, re-checked here against the
   T-72B1 side photograph P4); each row draws its own turret armour, sights and skirts.

   REDO 2026-10-24 (full-quality procedure). References, Wikimedia Commons, width 960,
   cached in scratchpad/q_t72_ref:
     D1  "T-90 tank.svg" - side drawing of the T-72B-derived hull (the T-90 redo's D1):
         hull profile, glacis, raised idler and sprocket, wheel pitch 0.85 m.
     P1  "Syrian army T-72 Ural in exercises, circa 1980-90s.jpg" - two T-72 Urals head
         on: the four fold-out gill panels each side, swung out over the front of the
         track; no skirts; round turret; IR searchlight right of the gun.
     P2  "T-72A tank on parade.jpg" - (despite its name) an early T-72 from above, front
         left: gill panels lying on the front fenders, round cast turret with NO smoke
         dischargers, the sight head on the left of the roof, the searchlight right of the
         gun, the commander's cupola right rear, a long tank on the right fender, the
         splash board on the glacis.
     P3  "T-72A - Patriot Museum, Kubinka (37756848074).jpg" - T-72A, starboard 3/4:
         full-length rubber skirts, the 902B tubes on the turret front, the cupola with
         its 12.7 mm gun, the fender tanks.
     P3b "Russian T-72A Main Battle Tank (Ank Kumar, Infosys Limited) 01.jpg" - T-72A,
         port front 3/4: the thickened cheek, the tube bank on the left front.
     P4  "T-72B1 - Patriot Museum, Kubinka (38471725101).jpg" - T-72B1, starboard side
         (dead side-on): hull and fender line, wheel pitch, gun length; Kontakt-1 boxes
         in rows along the cheeks and over the roof; Kontakt-1 rows on the glacis.
     P5  "T-72B mod. 1985.jpg" - T-72B, front left: Kontakt-1 boxes in two tiers round
         the cheek fronts and a rank on the roof, the round L-4 searchlight right of the
         gun, the tube bank on the left front, and a grid of Kontakt-1 boxes over the
         whole side skirt.
     P6  "T-72B mod. 1989 01.jpg" - T-72B obr. 1989, starboard rear 3/4 (skirts off):
         turret rear stowage, rolled tarpaulin, cupola and gun mount.
     P7  "T-72B3 - TankBiathlon2013-09.jpg" - T-72B3, port side 3/4: a line of four big
         flat-faced Kontakt-5 boxes along each cheek, roof plates behind them, the boxy
         Sosna-U head on the left of the roof, a cluster of four 902B tubes on the port
         side behind the cheek boxes, two fuel drums across the rear, plain skirts.
     P8  "T-72B3 (41072270245).jpg" - T-72B3 obr. 2016, port side: Relikt side screens
         (a band of flat panels over a row of trapezoid "teeth"), a slat grille over the
         rear of the hull side, the same Kontakt-5 cheek boxes, the tube cluster, and a
         slat grille round the turret bustle.
     P9  "T-72B3 mod. 2016 at the Zapad-2017 exercise 01.jpg" - from above: the bustle
         box inside its slat grille, the Sosna-U head.
   Published figures (ru/en Wikipedia T-72): hull length 6.86 m, length gun forward
   9.53 m, width 3.46 m over the skirts (3.37 m over the tracks), height 2.19 m to the
   turret roof, ground clearance 0.47 m, six 750 mm road wheels and three return rollers a
   side, track 580 mm. The old header's figures are kept; the references agree.

   CORRECTIONS against the previous model (the references do not support it):
   - hull deck 1.24 m -> 1.48 m, turret ring 1.19 m -> 1.48 m: the old turret roof sat at
     1.94 m against the published 2.19 m (P4: fender line at 2/3 of the roof height);
   - road-wheel pitch 0.775 m -> 0.85 m, idler and sprocket raised (D1, P4);
   - the Ural DID carry the 12.7 mm NSVT on the cupola (facts.js lists it; P2 shows the
     mount); the old model left it off;
   - the Ural's coincidence rangefinder: ONE armoured window on the right front of the
     turret plus the sight head on the left (P2), not two symmetric "ears";
   - T-72B: P5 shows Kontakt-1 boxes over the whole side skirt; drawn (the old model
     called it a later refit with no source);
   - the B3's front 902B banks and the T-72B's glacis trim vane are gone (P5, P7).

   Recognition list (what makes each one read at game zoom, and its source):
     1. six big road wheels at a wide pitch, raised idler and sprocket - D1, P4
     2. low hull, long glacis falling to a blunt nose, flat fenders level with the
        deck - D1, P4
     3. the low cast turret, its commander's cupola on the right rear with the 12.7 mm
        gun - P2, P3, P6
     4. long 125 mm gun with the thermal sleeve, two clamp bands, bore evacuator - P2, P4
     5. Ural: round dome, four gill panels a side swung out over the track front, no
        skirts, no smoke tubes, the rangefinder window right front - P1, P2
     6. T-72A: fuller, flat-fronted cheeks, the 902B tube banks on the front, full
        rubber skirts - P3, P3b
     7. T-72B: Kontakt-1 boxes in tiers round the cheeks, over the roof, on the glacis
        and in a grid over the skirts; round searchlight right of the gun - P4, P5
     8. obr. 1989 and B3: four big flat-faced Kontakt-5 boxes along each cheek, roof
        plates, the bolted Kontakt-5 glacis package - P7, P8
     9. B3: the boxy Sosna-U head on the left of the roof; one cluster of four tubes on
        each cheek's rear corner; two drums across the rear - P7
    10. B3 obr. 2016: Relikt side screens with their row of teeth, slat grille over the
        engine-bay side and across the stern, slat grille round the turret bustle - P8, P9
   Paint (sampled, then taken to about 0.8 of level for the ACES pass): Ural and A in the
   Soviet olive of the period (P3 museum green #5a6658 lit); B olive #555c42 (P5) ->
   #4a5138; obr. 1989 dusty olive #515144 (P6) -> #4a4c3a; B3 grey-green #545150 (P7) ->
   #4b5145; B3 obr. 2016 grey-green (P8, lit #90948c, shade #2c3533) -> #525a50. No
   numbers, flags, parade stripes or markings (P2, P5, P8 carry them: not drawn).
   NOT CONFIRMED, drawn as judgement calls: the 902B count on the A and B (six a side, in a
   fan; P3/P5 show four to five of each bank); the B3 tube cluster on the starboard cheek
   (P7 shows the port one; drawn the same both sides); Kontakt-1 box counts (approximate);
   the obr. 1989's skirts (P6 has them off; drawn as the B's plain rubber, as the old
   header's obr. 1989 photo showed); the B3 obr. 2016 stern slat screen (from the old
   header's Army-2022 photograph, not re-fetched). The B3's IR searchlight is NOT drawn
   (no photograph shows one). No commander's sight mast on the B3 obr. 2016 (unconfirmed).
   Wartime kit (cope cages, markings, numbers) is NOT drawn.

   Materials: PAINT (canvas texture: base, mottling, weld seams, bolt rows), DARK (track,
   fittings, sights, slats), RUBBER (skirts), ERA (canvas texture of bolted plates, metre
   UVs), WHEEL (tyres, discs and recesses by vertex colour) and the team colour exactly as
   handed in (C.team): three small strips (rear deck, left rear fender box, turret roof).
   Nodes: "turret" (trains, origin on the ring centre, gun along +X), six "roadwheel"
   groups (axle along local Y, each holding both sides).
   Draw calls: hull 5 + turret 5 + 6 wheels = 16 at most.
   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroT72 = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------- variant table
     dome: cast turret plan radii (AF front, AR rear, AY across), front droop, cheek
     bulge ch (the thickened fronts of the A and B); turretEra: null | "k1" | "k5";
     glacis: "vane" | "k1" | "k5"; skirts: "gills" | "rubber" | "k1" | "steel" | "relikt" */
  var VARIANTS = {
    ural: { paint: { base: "#4f5a3a", blots: ["#465031", "#58633f"], seed: 72 }, era: "#4a5236",
            dome: { AF: 1.40, AR: 1.36, AY: 1.10, drop: 0.10, ch: 0.00, H: 0.71 },
            sight: "tpd249", rfWindow: true, light: true, smoke: 0, cluster: 0, aaMg: true,
            turretEra: null, glacis: "vane", skirts: "gills", sosna: false, drums: 0,
            bustleGrille: false, deckSlat: false },
    a:    { paint: { base: "#4e5b3b", blots: ["#454f31", "#58653f"], seed: 176 }, era: "#4a5236",
            dome: { AF: 1.46, AR: 1.36, AY: 1.10, drop: 0.02, ch: 0.10, H: 0.73 },
            sight: "tpdk1", rfWindow: false, light: true, smoke: 6, cluster: 0, aaMg: true,
            turretEra: null, glacis: "vane", skirts: "rubber", sosna: false, drums: 0,
            bustleGrille: false, deckSlat: false },
    b:    { paint: { base: "#4a5138", blots: ["#414830", "#555d42"], seed: 184 }, era: "#4c5439",
            dome: { AF: 1.50, AR: 1.36, AY: 1.10, drop: -0.04, ch: 0.16, H: 0.74 },
            sight: "tpdk1", rfWindow: false, light: true, smoke: 6, cluster: 0, aaMg: true,
            turretEra: "k1", glacis: "k1", skirts: "k1", sosna: false, drums: 0,
            bustleGrille: false, deckSlat: false },
    b89:  { paint: { base: "#4a4c3a", blots: ["#424433", "#545642"], seed: 189 }, era: "#4d4f3c",
            dome: { AF: 1.50, AR: 1.36, AY: 1.10, drop: -0.04, ch: 0.16, H: 0.74 },
            sight: "tpdk1", rfWindow: false, light: true, smoke: 6, cluster: 0, aaMg: true,
            turretEra: "k5", glacis: "k5", skirts: "rubber", sosna: false, drums: 0,
            bustleGrille: false, deckSlat: false },
    b3:   { paint: { base: "#4b5145", blots: ["#42483d", "#565c4f"], seed: 203 }, era: "#4e5448",
            dome: { AF: 1.50, AR: 1.36, AY: 1.10, drop: -0.04, ch: 0.16, H: 0.74 },
            sight: "box", rfWindow: false, light: false, smoke: 0, cluster: 4, aaMg: true,
            turretEra: "k5", glacis: "k5", skirts: "steel", sosna: true, drums: 2,
            bustleGrille: false, deckSlat: false },
    b3m:  { paint: { base: "#525a50", blots: ["#495148", "#5c6459"], seed: 2016 }, era: "#535b51",
            dome: { AF: 1.50, AR: 1.36, AY: 1.10, drop: -0.04, ch: 0.16, H: 0.74 },
            sight: "box", rfWindow: false, light: false, smoke: 0, cluster: 4, aaMg: true,
            turretEra: "k5", glacis: "k5", skirts: "relikt", sosna: true, drums: 0,
            bustleGrille: true, deckSlat: true }
  };

  /* running gear (D1, P4): pitch 0.85 m, 750 mm wheels, idler and sprocket raised */
  var TY = 1.395, TW = 0.29;
  var XW = [2.19, 1.34, 0.49, -0.36, -1.21, -2.06], ZW = 0.455, RW = 0.375;
  var XR = [1.76, 0.07, -1.64], ZR = 0.90, RR = 0.085;
  var IDL = { x: 2.96, z: 0.70, r: 0.30 }, SPR = { x: -2.88, z: 0.72, r: 0.33 };
  var DECK = 1.48, RING = 1.48, FW = 1.70, TX = 0.15;   /* deck, ring, fender edge half width, turret x */

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
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg); }

  /* a closed solid lofted through LEVELS, each a ring of [x, y, z] points with the same count,
     every ring convex in its own plane; the end rings are capped with fans */
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
  /* half plan [x, y] (y >= 0, front to rear) to a full closed ring at height z (y scaled by s) */
  function ringAt(H, z, dx) {
    var Q = [], i;
    dx = dx || 0;
    for (i = 0; i < H.length; i++) Q.push([H[i][0] + dx, H[i][1], H[i].length > 2 ? H[i][2] : z]);
    for (i = H.length - 1; i >= 0; i--) Q.push([H[i][0] + dx, -H[i][1], H[i].length > 2 ? H[i][2] : z]);
    return Q;
  }
  function mirrorY(P, s) { return P.map(function (q) { return [q[0], q[1] * s, q[2]]; }); }

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
  /* hull and turret paint: one tile is 1 / 0.34 = 2.9 m. Base, soft mottling, weld seams and
     bolt rows at plate edges, rain and exhaust grime (photographs P2, P4, P6) */
  function paintTex(THREE, P) {
    return canvasTex(THREE, "p" + P.base + P.seed, 512, function (q, S) {
      var R = rng(P.seed), i, k, x, y, w;
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (k = 0; k < P.blots.length; k++) {
        q.fillStyle = P.blots[k];
        for (i = 0; i < 14; i++) { q.globalAlpha = 0.35 + R() * 0.4; q.fillRect(R() * S, R() * S, 30 + R() * 120, 20 + R() * 80); }
      }
      q.globalAlpha = 1;
      for (i = 0; i < 6; i++) {                 /* weld seams / plate joints */
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 90 + R() * 220;
        q.fillStyle = "rgba(20,22,16,0.30)";
        if (i % 2) q.fillRect(x, y, w, 2); else q.fillRect(x, y, 2, w);
        q.fillStyle = "rgba(235,235,215,0.10)";
        if (i % 2) q.fillRect(x, y + 2, w, 1); else q.fillRect(x + 2, y, 1, w);
        q.fillStyle = "rgba(18,18,14,0.45)";
        for (k = 6; k < w; k += 14) { if (i % 2) q.fillRect(x + k, y - 5, 3, 3); else q.fillRect(x - 5, y + k, 3, 3); }
      }
      for (i = 0; i < 90; i++) {                /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      for (i = 0; i < 24; i++) { q.fillStyle = "rgba(25,22,15,0.06)"; q.fillRect(R() * S, R() * S, 2 + R() * 4, 30 + R() * 90); }
    });
  }
  /* ERA cover plates: one tile is 1 m (us 1.0); 4 x 4 plates of 0.25 m, each with an edge
     shadow and four bolt heads (P4 glacis, P7 Relikt plates) */
  function eraTex(THREE, base) {
    return canvasTex(THREE, "e" + base, 128, function (q, S) {
      var i, j, c = S / 4;
      q.fillStyle = base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) {
        q.fillStyle = "rgba(12,12,8,0.55)"; q.fillRect(i * c, j * c, c, 2); q.fillRect(i * c, j * c, 2, c);
        q.fillStyle = "rgba(230,230,210,0.12)"; q.fillRect(i * c + 2, j * c + 2, c - 4, 1);
        q.fillStyle = "rgba(15,15,10,0.6)";
        q.fillRect(i * c + 5, j * c + 5, 3, 3); q.fillRect(i * c + c - 8, j * c + 5, 3, 3);
        q.fillRect(i * c + 5, j * c + c - 8, 3, 3); q.fillRect(i * c + c - 8, j * c + c - 8, 3, 3);
      }
    });
  }
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint), te = eraTex(THREE, V.era);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.rubber = new THREE.MeshStandardMaterial({ color: 0x33362f, roughness: 0.95, metalness: 0.0 });
    T.era = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.08 });
    if (te) T.era.map = te; else T.era.color.set(V.era);
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), rubber: new Bin(T.rubber, false),
             era: new Bin(T.era, true, false, 1.0), team: new Bin(T.team, false) };
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
  /* station table, measured off D1 (scale from the 750 mm wheel, heights checked against P3):
     x, belly half width, belly z, side half width, roof z.  Rear plate leaning in at the
     bottom; flat deck at 1.42 m; the upper glacis falls at about 19 deg to the nose at 1.0 m;
     the lower glacis runs back down to the belly by x = 2.65. */
  var HS = [
    [-3.43, 0.98, 0.76, 1.04, 1.37],
    [-3.415, 1.01, 0.64, 1.07, 1.43],
    [-3.38, 1.03, 0.55, 1.09, 1.465],
    [-3.30, 1.04, 0.49, 1.10, 1.48],
    [-2.80, 1.05, 0.47, 1.10, 1.48],
    [-2.00, 1.05, 0.47, 1.10, 1.48],
    [-1.20, 1.05, 0.47, 1.10, 1.48],
    [-0.40, 1.05, 0.47, 1.10, 1.48],
    [ 0.40, 1.05, 0.47, 1.10, 1.48],
    [ 1.20, 1.05, 0.47, 1.10, 1.48],
    [ 2.15, 1.05, 0.47, 1.10, 1.48],
    [ 2.40, 1.05, 0.47, 1.10, 1.385],
    [ 2.65, 1.05, 0.475, 1.10, 1.29],
    [ 2.90, 1.04, 0.52, 1.10, 1.195],
    [ 3.10, 1.02, 0.61, 1.09, 1.119],
    [ 3.25, 1.00, 0.72, 1.08, 1.062],
    [ 3.36, 0.98, 0.84, 1.07, 1.02],
    [ 3.43, 0.96, 0.93, 1.06, 0.994]
  ];
  function glacisZ(x) { return x <= 2.15 ? DECK : DECK - 0.38 * (x - 2.15); }
  function hullRing(S) {
    var x = S[0], wb = S[1], zB = S[2], ws = S[3], zT = S[4], e = Math.min(0.03, (zT - zB) / 4);
    return [[x, wb, zB], [x, ws, Math.min(zB + 0.10, zT - 2 * e)], [x, ws, zT - e], [x, ws - e, zT],
            [x, -(ws - e), zT], [x, -ws, zT - e], [x, -ws, Math.min(zB + 0.10, zT - 2 * e)], [x, -wb, zB]];
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
      var yi = p * 1.08, yo = p * FW, ylo = Math.min(yi, yo), yhi = Math.max(yi, yo);
      /* fender shelf level with the deck, its rolled outer lip */
      box(B.paint, -3.40, 2.30, ylo, yhi, DECK - 0.035, DECK);
      box(B.paint, -3.40, 2.30, p > 0 ? FW - 0.03 : -FW, p > 0 ? FW : -FW + 0.03, DECK - 0.09, DECK + 0.02);
      /* the front mudguard falling to the nose over the idler (D1, P4) */
      belt(B.paint, 2.30, DECK - 0.02, 2.95, 1.29, ylo, yhi, 0.04);
      belt(B.paint, 2.95, 1.29, 3.40, 1.04, ylo + (p > 0 ? 0.04 : 0), yhi - (p > 0 ? 0 : 0.04), 0.04);
      belt(B.paint, 3.40, 1.04, 3.50, 0.92, ylo + (p > 0 ? 0.08 : 0), yhi - (p > 0 ? 0 : 0.08), 0.04);
      /* rear fender end and mud flap */
      box(B.paint, -3.46, -3.40, p > 0 ? 1.10 : -FW, p > 0 ? FW : -1.10, 1.02, DECK + 0.02);
      /* inner track guard under the shelf */
      box(B.dark, -3.0, 2.25, p > 0 ? 1.08 : -1.12, p > 0 ? 1.12 : -1.08, 1.05, DECK - 0.04);
    }

    /* --- what hangs from the fender edge ------------------------------------ */
    var ZS0 = 0.80, ZS1 = DECK + 0.01, yy, xa, xb;
    var PAN = [[2.30, 1.62], [1.60, 0.92], [0.90, 0.22], [0.20, -0.48], [-0.50, -1.18], [-1.20, -1.88], [-1.90, -2.58], [-2.60, -3.30]];
    if (V.skirts === "gills") {
      /* Ural (P1, P2): four fold-out gill panels a side over the front of the track, hinged at
         the fender edge and swung out about 60 deg; nothing else on the side */
      var th = 0.80, sv, cv;
      for (p = -1; p <= 1; p += 2) {
        sv = Math.sin(th); cv = Math.cos(th);
        for (i = 0; i < 4; i++) {
          x = 2.14 - i * 0.31;
          slab(B.paint, [x, p * (FW + sv * 0.19), DECK - 0.04 - cv * 0.19], [1, 0, 0], [0, p * sv, -cv], [0, p * cv, sv], 0.125, 0.19, 0.012);
          slab(B.dark, [x, p * (FW + sv * 0.19) + p * cv * 0.02, DECK - 0.04 - cv * 0.19 + sv * 0.02], [1, 0, 0], [0, p * sv, -cv], [0, p * cv, sv], 0.02, 0.17, 0.012);
          box(B.dark, x - 0.10, x + 0.10, p > 0 ? FW - 0.02 : -FW - 0.03, p > 0 ? FW + 0.03 : -FW + 0.02, DECK - 0.07, DECK - 0.01);
        }
      }
    } else if (V.skirts === "relikt") {
      /* B3 obr. 2016 (P8): a band of flat Relikt panels hung from the fender over the front 2/3,
         a row of trapezoid "teeth" below it between the wheel tops, then a slat grille over the
         engine-bay side */
      var ZT = 1.06;
      for (p = -1; p <= 1; p += 2) {
        var yI = p * FW, yO = p * (FW + 0.12), yO2 = p * (FW + 0.10);
        for (i = 0; i < 6; i++) {
          xa = 2.32 - i * 0.70; xb = xa - 0.68;
          blk(B.era, [(xa + xb) / 2, p * (FW + 0.06), (ZT + ZS1) / 2], [1, 0, 0], [0, p, 0], [0, 0, 1], 0.34, 0.06, (ZS1 - ZT) / 2);
          loftN(B.era, [
            [[xa - 0.02, yI, ZT], [xb + 0.02, yI, ZT], [xb + 0.02, yO2, ZT], [xa - 0.02, yO2, ZT]],
            [[xa - 0.16, yI, ZT - 0.30], [xb + 0.16, yI, ZT - 0.30], [xb + 0.16, yO2, ZT - 0.26], [xa - 0.16, yO2, ZT - 0.26]]]);
          box(B.dark, xb - 0.012, xb + 0.012, p > 0 ? FW : -FW - 0.125, p > 0 ? FW + 0.125 : -FW, ZT - 0.02, ZS1);
        }
        var g0 = -1.90, g1 = -3.32, yg = p * (FW + 0.08);
        box(B.dark, g1, g0, yg - 0.015, yg + 0.015, ZS1 - 0.04, ZS1);
        box(B.dark, g1, g0, yg - 0.015, yg + 0.015, ZS0 + 0.06, ZS0 + 0.10);
        box(B.dark, g1, g0, yg - 0.012, yg + 0.012, (ZS0 + ZS1) / 2 + 0.03, (ZS0 + ZS1) / 2 + 0.06);
        for (x = g1; x <= g0 + 1e-6; x += 0.118) box(B.dark, x - 0.012, x + 0.012, yg - 0.02, yg + 0.02, ZS0 + 0.06, ZS1);
        for (x = g1 + 0.2; x < g0; x += 0.7) box(B.dark, x - 0.02, x + 0.02, p > 0 ? FW : yg, p > 0 ? yg : -FW, ZS1 - 0.06, ZS1);
      }
    } else {
      /* full-length skirts of eight panels: rubber (A, obr. 1989), painted steel plates with
         hinge brackets (B3, P7), rubber under a grid of Kontakt-1 boxes (B, P5) */
      for (p = -1; p <= 1; p += 2) {
        yy = p * (FW + 0.02);
        for (i = 0; i < PAN.length; i++) {
          xa = PAN[i][0]; xb = PAN[i][1];
          var z0 = i === 0 ? ZS0 + 0.10 : ZS0;
          box(V.skirts === "steel" ? B.paint : B.rubber, xb, xa, yy - 0.016, yy + 0.016, z0, ZS1);
          box(B.dark, xb + 0.02, xb + 0.05, yy + p * 0.016 - 0.008, yy + p * 0.016 + 0.008, z0 + 0.06, ZS1);
          if (V.skirts === "steel") {
            for (j = 0; j < 2; j++) box(B.dark, xb + 0.15 + j * 0.36, xb + 0.21 + j * 0.36, yy + p * 0.016 - 0.01, yy + p * 0.016 + 0.01, ZS1 - 0.16, ZS1 - 0.02);
            box(B.dark, xb + 0.02, xa - 0.02, yy + p * 0.016 - 0.006, yy + p * 0.016 + 0.006, ZS1 - 0.20, ZS1 - 0.18);
          }
          if (V.skirts === "k1") {
            /* three rows of Kontakt-1 boxes on each panel, four across */
            for (j = 0; j < 3; j++)
              for (k = 0; k < 4; k++)
                blk(B.era, [xb + 0.10 + k * 0.165, p * (FW + 0.06), z0 + 0.13 + j * ((ZS1 - z0 - 0.08) / 3)],
                    [1, 0, 0], [0, p, 0], [0, 0, 1], 0.07, 0.026, (ZS1 - z0 - 0.08) / 6 - 0.012);
          }
        }
      }
    }

    /* --- glacis ----------------------------------------------------------------- */
    var ang = Math.atan(0.38), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    if (V.glacis === "k5") {
      /* the bolted Kontakt-5 package (P7, P8; the T-90's): two wide plates with a centre block,
         a notch at the top centre for the driver's vision block */
      for (s = -1; s <= 1; s += 2) {
        slab(B.era, [2.84, s * 0.57, glacisZ(2.84) + 0.055], u, [0, 1, 0], w, 0.52, 0.42, 0.055);
        slab(B.era, [2.31, s * 0.62, glacisZ(2.31) + 0.045], u, [0, 1, 0], w, 0.10, 0.37, 0.045);
      }
      slab(B.era, [2.98, 0, glacisZ(2.98) + 0.055], u, [0, 1, 0], w, 0.38, 0.16, 0.055);
    } else if (V.glacis === "k1") {
      /* T-72B (P4, P5): rows of flat Kontakt-1 boxes across the glacis, staggered */
      for (j = 0; j < 4; j++) {
        x = 2.36 + j * 0.25;
        for (k = -3; k <= 3; k++) {
          if (j === 0 && k === 0) continue;
          blk(B.era, [x, k * 0.27 + (j % 2) * 0.13 - 0.065, glacisZ(x) + 0.03], u, [0, 1, 0], w, 0.10, 0.12, 0.03);
        }
      }
    } else {
      /* Ural and A: the plain glacis with its splash board (trim vane) across it (P2) */
      var va = Math.atan2(0.17, 0.10), vu = [Math.sin(va), 0, Math.cos(va)], vw = [Math.cos(va), 0, -Math.sin(va)];
      slab(B.paint, [2.55, 0, glacisZ(2.55) + 0.08], vu, [0, 1, 0], vw, 0.09, 0.62, 0.012);
      for (s = -1; s <= 1; s += 2) slab(B.paint, [2.58, s * 0.66, glacisZ(2.58) + 0.06], [Math.cos(0.5), s * Math.sin(0.5), 0], [0, 0, 1], [-s * Math.sin(0.5), Math.cos(0.5), 0], 0.10, 0.07, 0.012);
      /* the glacis' welded joint and the lifting eyes */
      slab(B.dark, [2.95, 0, glacisZ(2.95) + 0.006], u, [0, 1, 0], w, 0.012, 0.95, 0.006);
    }
    /* driver's hatch behind the glacis and his periscope */
    cylZ(B.paint, 1.92, 0.0, DECK, DECK + 0.07, 0.24, 16);
    cylZ(B.dark, 1.92, 0.0, DECK + 0.07, DECK + 0.09, 0.19, 12);
    slab(B.dark, [2.24, 0, glacisZ(2.24) + 0.05], u, [0, 1, 0], w, 0.06, 0.12, 0.04);
    /* lower glacis: the dozer blade and tow hooks (D1, P4) */
    var la = Math.atan2(3.36 - 2.90, 0.84 - 0.52), lu = [Math.sin(la), 0, Math.cos(la)], lw = [Math.cos(la), 0, -Math.sin(la)];
    slab(B.paint, [3.16, 0, 0.70], lu, [0, 1, 0], lw, 0.20, 0.98, 0.03);
    for (i = -3; i <= 3; i++) slab(B.dark, [3.18, i * 0.30, 0.71], lu, [0, 1, 0], lw, 0.17, 0.02, 0.045);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, 3.38, 3.50, s * 0.60 - 0.06, s * 0.60 + 0.06, 0.86, 0.98);
      /* headlamps in their guards on the glacis corners */
      cyl(B.dark, [2.55, s * 0.96, 1.36], [2.66, s * 0.96, 1.35], 0.075, 0.075, 10);
      box(B.paint, 2.45, 2.52, s * 0.96 - 0.10, s * 0.96 + 0.10, 1.31, 1.46);
    }
    /* tow cables along the glacis edges */
    cyl(B.dark, [2.30, 1.02, DECK + 0.03], [3.30, 1.02, 1.07 + 0.01], 0.025, 0.025, 6);
    cyl(B.dark, [2.30, -1.02, DECK + 0.03], [3.30, -1.02, 1.07 + 0.01], 0.025, 0.025, 6);

    /* --- fender stowage: tool boxes left; the fuel tanks along the right fender (P2, P3) --- */
    box(B.paint, -0.30, 0.85, 1.36, 1.64, DECK, DECK + 0.15);
    box(B.dark, 0.0, 0.06, 1.35, 1.65, DECK + 0.15, DECK + 0.17);
    box(B.paint, -2.45, -1.55, 1.40, 1.64, DECK, DECK + 0.17);
    box(B.paint, 1.00, 1.75, -1.64, -1.36, DECK, DECK + 0.20);
    box(B.paint, 0.10, 0.90, -1.64, -1.36, DECK, DECK + 0.20);
    box(B.dark, 0.92, 0.98, -1.64, -1.36, DECK, DECK + 0.20);
    box(B.paint, -1.40, -0.10, -1.64, -1.36, DECK, DECK + 0.20);
    box(B.dark, -0.08, -0.02, -1.64, -1.36, DECK, DECK + 0.20);
    box(B.paint, -2.55, -1.55, -1.64, -1.40, DECK, DECK + 0.18);

    /* --- engine deck: radiator grilles across the rear, access plates, exhaust on the left ---- */
    box(B.dark, -3.32, -2.25, -0.90, 0.90, DECK - 0.01, DECK + 0.015);
    for (i = 0; i < 8; i++) box(B.paint, -3.29 + i * 0.13, -3.24 + i * 0.13, -0.88, 0.88, DECK + 0.015, DECK + 0.04);
    box(B.paint, -2.15, -1.30, -0.62, 0.62, DECK, DECK + 0.04);
    box(B.paint, -2.10, -1.35, -0.95, -0.70, DECK, DECK + 0.03);
    box(B.dark, -2.40, -1.95, 1.10, 1.14, 1.18, 1.36);
    box(B.team, -2.10, -1.30, -0.125, 0.125, DECK + 0.04, DECK + 0.06);
    box(B.team, -2.45, -1.55, 1.40, 1.64, DECK + 0.17, DECK + 0.19);
    /* stern: tow hooks */
    box(B.dark, -3.52, -3.43, 0.66, 0.82, 0.62, 0.74);
    box(B.dark, -3.52, -3.43, -0.82, -0.66, 0.62, 0.74);
    /* B3 (P7): two fuel drums across the rear deck */
    for (i = 0; i < V.drums; i++) {
      var dyr = i ? -0.47 : 0.47, dxr = -3.15, dzr = DECK + 0.25;
      cylY(B.paint, dxr, dyr - 0.44, dyr + 0.44, dzr, 0.29, 18);
      cylY(B.dark, dxr, dyr - 0.45, dyr - 0.40, dzr, 0.295, 18);
      cylY(B.dark, dxr, dyr + 0.40, dyr + 0.45, dzr, 0.295, 18);
      cylY(B.dark, dxr, dyr - 0.15, dyr - 0.12, dzr, 0.296, 18);
      cylY(B.dark, dxr, dyr + 0.12, dyr + 0.15, dzr, 0.296, 18);
      box(B.dark, dxr - 0.24, dxr + 0.24, dyr - 0.30, dyr - 0.26, DECK - 0.02, dzr - 0.18);
      box(B.dark, dxr - 0.24, dxr + 0.24, dyr + 0.26, dyr + 0.30, DECK - 0.02, dzr - 0.18);
    }
    if (V.deckSlat) {
      /* B3 obr. 2016: the slat screen hung across the stern (old header's Army-2022 photograph) */
      box(B.dark, -3.58, -3.53, -1.20, 1.20, 1.30, 1.34);
      box(B.dark, -3.58, -3.53, -1.20, 1.20, 0.66, 0.70);
      for (i = 0; i <= 19; i++) box(B.dark, -3.59, -3.54, -1.20 + i * 0.1263 - 0.012, -1.20 + i * 0.1263 + 0.012, 0.68, 1.32);
      for (s = -1; s <= 1; s += 2) box(B.dark, -3.54, -3.43, s * 1.0 - 0.03, s * 1.0 + 0.03, 1.20, 1.26);
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
    cnt = Math.round(tot / 0.30); step = tot / cnt;
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
        /* the link plate with its grouser, and the centre guide horn on the inside of the run */
        belt(B.dark, px - dx * 0.075, pz - dz * 0.075, px + dx * 0.075, pz + dz * 0.075, y - TW - 0.01, y + TW + 0.01, 0.085);
        belt(B.dark, px - dx * 0.03 + dz * 0.07, pz - dz * 0.03 - dx * 0.07, px + dx * 0.03 + dz * 0.07, pz + dz * 0.03 - dx * 0.07, y - 0.025, y + 0.025, 0.06);
      }
      /* sprocket (rear) with its teeth ring, idler (front), three return rollers */
      cylY(B.dark, SPR.x, y - 0.22, y + 0.22, SPR.z, SPR.r, 18);
      cylY(B.paint, SPR.x, y + s * 0.20, y + s * 0.27, SPR.z, 0.20, 12);
      cylY(B.dark, SPR.x, y + s * 0.27, y + s * 0.31, SPR.z, 0.08, 8);
      cylY(B.paint, IDL.x, y - 0.22, y + 0.22, IDL.z, IDL.r, 18);
      cylY(B.dark, IDL.x, y + s * 0.21, y + s * 0.28, IDL.z, 0.12, 10);
      box(B.dark, IDL.x - 0.30, IDL.x, y + s * 0.30 - 0.03, y + s * 0.30 + 0.03, IDL.z - 0.04, IDL.z + 0.04);
      for (i = 0; i < XR.length; i++) {
        cylY(B.dark, XR[i], y - 0.18, y + 0.18, ZR, RR, 10);
        cylY(B.paint, XR[i], y + s * 0.17, y + s * 0.22, ZR, 0.05, 8);
      }
    }
  }

  /* road wheel (P3): twin discs with the dark tyre band, the dished face with eight dark recesses
     between the ribs, and the hub cap */
  var TYRE = [0.13, 0.135, 0.125], HOLE = [0.20, 0.21, 0.18];
  function addWheel(W, V) {
    var s, y, i, a, c = V.paint.base, rr = parseInt(c.substr(1, 2), 16) / 255, gg = parseInt(c.substr(3, 2), 16) / 255, bb = parseInt(c.substr(5, 2), 16) / 255;
    var BODY = [rr * 1.14, gg * 1.14, bb * 1.14];
    for (s = -1; s <= 1; s += 2) {
      y = s * TY;
      W.col = TYRE;
      cylY(W, 0, y - 0.255, y - 0.15, 0, RW, 18);
      cylY(W, 0, y + 0.15, y + 0.255, 0, RW, 18);
      W.col = BODY;
      cylY(W, 0, y - 0.15, y + 0.15, 0, 0.31, 18);
      cyl(W, [0, y + s * 0.255, 0], [0, y + s * 0.275, 0], 0.30, 0.16, 18);
      cylY(W, 0, y + s * 0.27, y + s * 0.30, 0, 0.11, 10);
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = (i + 0.5) / 8 * TAU;
        slab(W, [Math.cos(a) * 0.225, y + s * 0.262, Math.sin(a) * 0.225], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.045, 0.012, 0.05);
      }
      W.col = TYRE;
      cylY(W, 0, y + s * 0.295, y + s * 0.315, 0, 0.05, 8);
    }
  }

  /* --------------------------------------------------------------- turret */
  /* an oriented block without its underside (ERA boxes, slats): centre c, half sizes along u, v, w */
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

  /* the cast T-72 dome: rings of the profile table PROF (radius factor, height); plan radii AF
     forward, AR aft, AY across, as a superellipse; "drop" lowers (or raises) the front, and
     "ch" swells the two cheeks either side of the gun - the thickened, flat-fronted cast front
     of the A (filler inserts) and the bigger one of the B (P3b, P4, P5). The Ural has none (P2). */
  var PROF = [[1.00, 0.00], [1.02, 0.12], [1.00, 0.30], [0.93, 0.46], [0.80, 0.59],
              [0.58, 0.68], [0.32, 0.73], [0.0, 0.75]];
  var DP = 2 / 2.4;
  function domeAt(D, a, rf, hz) {
    /* a: plan angle from the gun line toward +Y; rf: radius factor; hz: profile height (0..0.75) */
    var c = Math.cos(a), s = Math.sin(a), cf = Math.max(c, 0), aa = Math.abs(Math.atan2(s, c));
    var g = c > 0 ? Math.exp(-Math.pow((aa - 0.72) / 0.40, 2)) * (aa > 0.22 ? 1 : aa / 0.22) : 0;
    var wz = hz < 0.55 ? 1 : Math.max(0.35, 1 - (hz - 0.55) * 3);
    var fk = 1 + D.ch * g * wz;
    var sx = (c >= 0 ? D.AF : D.AR) * rf * fk * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), DP);
    var sy = D.AY * rf * fk * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), DP);
    var z = hz * (D.H / 0.75) * (1 - D.drop * cf) * (1 + D.ch * 0.6 * g * (hz > 0.2 ? 1 : 0));
    return [sx, sy, z];
  }
  function addDome(B, D) {
    var NS = 44, G = [], rI, j, V = [], Nacc = [], tris = [], ctr = [0, 0, 0.05];
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
  /* a point on the dome pushed out (or in) along the plan radius by dr */
  function onDome(D, a, rf, hz, dr) {
    var P = domeAt(D, a, rf, hz), l = Math.sqrt(P[0] * P[0] + P[1] * P[1]) || 1;
    return [P[0] + P[0] / l * dr, P[1] + P[1] / l * dr, P[2]];
  }

  var MUZ = 5.98;                                       /* muzzle, turret frame: 9.6 m overall (D1, P4) */
  function addGun(B, GZ, x0, cover) {
    var M = MUZ;
    cylX(B.paint, x0 - 0.40, x0 + 0.04, 0, GZ, 0.30, 0.27, 18);
    if (cover) cylX(B.dark, x0 + 0.02, x0 + 0.20, 0, GZ, 0.20, 0.15, 14);
    /* thermal sleeve with its two clamp bands, the bore evacuator, the plain muzzle tube */
    cylX(B.paint, x0, M - 1.64, 0, GZ, 0.105, 0.098, 16);
    if (M - 3.44 > x0 + 0.2) cylX(B.dark, M - 3.44, M - 3.38, 0, GZ, 0.112, 0.112, 14);
    cylX(B.dark, M - 2.59, M - 2.53, 0, GZ, 0.108, 0.108, 14);
    cylX(B.paint, M - 1.64, M - 1.50, 0, GZ, 0.098, 0.125, 16);
    cylX(B.paint, M - 1.50, M - 1.20, 0, GZ, 0.125, 0.125, 16);
    cylX(B.dark, M - 1.42, M - 1.39, 0, GZ, 0.130, 0.130, 14);
    cylX(B.dark, M - 1.32, M - 1.29, 0, GZ, 0.130, 0.130, 14);
    cylX(B.paint, M - 1.20, M - 1.06, 0, GZ, 0.125, 0.082, 16);
    cylX(B.paint, M - 1.06, M, 0, GZ, 0.082, 0.075, 14);
    cylX(B.dark, M - 0.09, M, 0, GZ, 0.078, 0.078, 14);
    /* coaxial machine gun port, right of the gun */
    cylX(B.dark, x0 - 0.20, x0 + 0.12, -0.24, GZ - 0.08, 0.022, 0.022, 8);
  }
  function cupolaAA(B, CX, CY, RZ, aa) {
    var i, a;
    cylZ(B.paint, CX, CY, RZ - 0.06, RZ + 0.05, 0.31, 20);
    for (i = 0; i < 6; i++) {
      a = i * TAU / 6 + 0.5;
      box(B.dark, CX + Math.cos(a) * 0.30 - 0.035, CX + Math.cos(a) * 0.30 + 0.035,
          CY + Math.sin(a) * 0.30 - 0.035, CY + Math.sin(a) * 0.30 + 0.035, RZ + 0.0, RZ + 0.08);
    }
    cylZ(B.paint, CX, CY, RZ + 0.05, RZ + 0.11, 0.25, 16);
    box(B.dark, CX + 0.12, CX + 0.36, CY - 0.10, CY + 0.10, RZ + 0.05, RZ + 0.20);
    if (aa) {
      /* the 12.7 mm AA gun on its pedestal mount (P1, P2) */
      cylZ(B.dark, CX - 0.05, CY, RZ + 0.11, RZ + 0.26, 0.04, 8);
      box(B.dark, CX - 0.25, CX + 0.25, CY - 0.06, CY + 0.06, RZ + 0.24, RZ + 0.34);
      box(B.dark, CX - 0.22, CX + 0.08, CY + 0.06, CY + 0.18, RZ + 0.22, RZ + 0.36);
      cylX(B.dark, CX + 0.25, CX + 1.20, CY, RZ + 0.30, 0.022, 0.020, 8);
      cylX(B.dark, CX + 0.55, CX + 0.80, CY, RZ + 0.30, 0.034, 0.034, 8);
    }
  }


  /* smoke tube: base point P, pointing out along the plan radius, forward and up */
  function tube(B, P, s, fw, len) {
    var l = Math.sqrt(P[0] * P[0] + P[1] * P[1]) || 1, nx = P[0] / l, ny = P[1] / l;
    var d = unit([nx * 0.45 + fw, ny * 0.45, 0.85]);
    cyl(B.dark, P, [P[0] + d[0] * len, P[1] + d[1] * len, P[2] + d[2] * len], 0.04, 0.04, 8);
  }

  function turretT72(V, B) {
    var D = V.dome, H = D.H, GZ = 0.33, s, i, j, a, a1, a2, P, Q, x;
    addDome(B, D);
    addGun(B, GZ, D.AF - 0.04, true);

    if (V.turretEra === "k1") {
      /* Kontakt-1 (P4, P5): a lower tier of boxes standing round each cheek front, a second tier
         set back above it, and a rank across the roof ahead of the hatches */
      for (s = -1; s <= 1; s += 2) {
        for (i = 0; i < 6; i++) {
          a = 0.36 + i * 0.19;
          P = onDome(D, s * a, 0.97, 0.36, 0.05);
          Q = onDome(D, s * (a + 0.02), 0.97, 0.36, 0.05);
          var t = unit([Q[0] - P[0], Q[1] - P[1], 0]), n = [t[1] * s, -t[0] * s, 0];
          if (dot(n, [P[0], P[1], 0]) < 0) n = [-n[0], -n[1], 0];
          blk(B.era, [P[0], P[1], 0.34], t, n, [0, 0, 1], 0.095, 0.055, 0.13);
        }
        for (i = 0; i < 5; i++) {
          a = 0.44 + i * 0.19;
          P = onDome(D, s * a, 0.86, 0.55, 0.02);
          Q = onDome(D, s * (a + 0.02), 0.86, 0.55, 0.02);
          var t2 = unit([Q[0] - P[0], Q[1] - P[1], 0]), n2 = [t2[1] * s, -t2[0] * s, 0];
          if (dot(n2, [P[0], P[1], 0]) < 0) n2 = [-n2[0], -n2[1], 0];
          blk(B.era, [P[0], P[1], P[2] + 0.07], t2, n2, [0, 0, 1], 0.095, 0.05, 0.10);
        }
        /* the roof ranks: three rows of boxes over each side of the front roof (P5) */
        for (i = 0; i < 3; i++)
          for (j = 0; j < 3; j++)
            blk(B.era, [0.86 - j * 0.27, s * (0.40 + i * 0.18), H - 0.02 - j * 0.005 + (j === 0 ? -0.03 : 0)], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.12, 0.08, 0.035);
      }
    }
    if (V.turretEra === "k5") {
      /* Kontakt-5 (P7, P8): four big flat-faced boxes in a line round each cheek, each a wedge
         with a near-vertical outer face and a top sloping up and back to the roof; behind them
         a flat plate over each side of the roof front */
      for (s = -1; s <= 1; s += 2) {
        for (i = 0; i < 4; i++) {
          a1 = 0.27 + i * 0.215; a2 = a1 + 0.195;
          var o1 = onDome(D, s * a1, 1.0, 0.30, 0.17), o2 = onDome(D, s * a2, 1.0, 0.30, 0.17);
          var i1 = onDome(D, s * a1, 1.0, 0.30, -0.30), i2 = onDome(D, s * a2, 1.0, 0.30, -0.30);
          loftN(B.era, [
            [[o1[0], o1[1], 0.08], [o2[0], o2[1], 0.08], [i2[0], i2[1], 0.08], [i1[0], i1[1], 0.08]],
            [[o1[0], o1[1], 0.54], [o2[0], o2[1], 0.54], [i2[0], i2[1], H + 0.02], [i1[0], i1[1], H + 0.02]]]);
          /* the dark joint line along the box's top front edge and its lifting lug */
          slab(B.dark, [(o1[0] + o2[0]) / 2, (o1[1] + o2[1]) / 2, 0.545], unit([o2[0] - o1[0], o2[1] - o1[1], 0]), [0, 0, 1],
               unit([o1[1] - o2[1], o2[0] - o1[0], 0]), 0.13, 0.012, 0.014);
        }
        loftN(B.era, [
          mirrorY([[1.05, 0.34, H - 0.06], [0.98, 0.98, H - 0.10], [0.30, 1.02, H - 0.06], [0.30, 0.34, H - 0.04]], s),
          mirrorY([[1.00, 0.34, H + 0.03], [0.94, 0.96, H - 0.01], [0.30, 1.00, H + 0.03], [0.30, 0.34, H + 0.05]], s)]);
      }
    }

    if (V.light) {
      /* the L-4 IR searchlight in its cradle right of the gun (P1, P2, P5) */
      var lx = D.AF - 0.20 + (V.turretEra ? 0.18 : 0);
      cylX(B.paint, lx, lx + 0.30, -0.66, GZ + 0.16, 0.17, 0.17, 16);
      cylX(B.dark, lx + 0.30, lx + 0.32, -0.66, GZ + 0.16, 0.15, 0.15, 16);
      box(B.dark, lx + 0.02, lx + 0.26, -0.70, -0.62, GZ - 0.06, GZ);
      box(B.paint, lx - 0.05, lx + 0.05, -0.72, -0.60, GZ - 0.04, GZ + 0.30);
    }
    if (V.sight === "tpd249") {
      /* Ural (P2): the TPD-2-49 sight head on the left of the roof, and the coincidence base's
         right-hand window in its armoured blister on the right front */
      box(B.paint, 0.55, 0.90, 0.38, 0.66, H - 0.12, H + 0.14);
      box(B.dark, 0.90, 0.93, 0.42, 0.62, H - 0.04, H + 0.10);
      box(B.paint, 0.98, 1.24, -1.00, -0.74, 0.30, 0.54);
      box(B.dark, 1.24, 1.26, -0.95, -0.79, 0.36, 0.48);
    } else if (V.sight === "tpdk1") {
      /* TPD-K1 laser sight head on the left of the roof, its window forward (P3b, P5) */
      box(B.paint, 0.58, 1.02, 0.32, 0.68, H - 0.14, H + 0.17);
      box(B.dark, 1.02, 1.05, 0.37, 0.63, H - 0.04, H + 0.12);
      box(B.dark, 0.62, 0.98, 0.36, 0.64, H + 0.17, H + 0.19);
    }
    if (V.sosna) {
      /* the Sosna-U head on the left of the roof (P7, P8, P9): a tall box, its round window
         forward, a cover hood over it */
      box(B.paint, 0.40, 0.92, 0.34, 0.80, H - 0.06, H + 0.32);
      cylX(B.dark, 0.92, 0.96, 0.57, H + 0.16, 0.10, 0.10, 14);
      box(B.paint, 0.88, 1.00, 0.36, 0.78, H + 0.28, H + 0.33);
      box(B.dark, 0.44, 0.88, 0.38, 0.76, H + 0.32, H + 0.34);
    }
    for (s = -1; s <= 1; s += 2) {
      if (V.smoke) {
        /* 902B tubes in a fan on each front quarter (P3, P3b, P5) */
        var a0 = V.turretEra ? 1.12 : 0.74;
        for (i = 0; i < V.smoke; i++) {
          P = onDome(D, s * (a0 + i * 0.085), 0.93, 0.46, 0.02);
          tube(B, P, s, 0.30, 0.24);
        }
        P = onDome(D, s * (a0 + 0.21), 0.93, 0.40, 0.0);
        box(B.dark, P[0] - 0.24, P[0] + 0.24, P[1] - 0.05, P[1] + 0.05, P[2] - 0.04, P[2] + 0.04);
      }
      if (V.cluster) {
        /* B3 (P7, P8): one cluster of four tubes, two by two, at the rear corner of the cheek boxes */
        for (i = 0; i < V.cluster; i++) {
          P = onDome(D, s * (1.20 + (i % 2) * 0.10), 0.92, 0.44 + Math.floor(i / 2) * 0.13, 0.06);
          tube(B, P, s, 0.55, 0.26);
        }
        P = onDome(D, s * 1.25, 0.92, 0.40, 0.0);
        box(B.dark, P[0] - 0.14, P[0] + 0.14, P[1] - 0.07, P[1] + 0.07, P[2] - 0.06, P[2] + 0.02);
      }
    }
    /* commander's cupola, right rear, with the 12.7 mm NSVT (P2, P3, P6, P7) */
    cupolaAA(B, -0.25, -0.52, H - 0.02, V.aaMg);
    /* gunner's hatch, left */
    cylZ(B.paint, -0.10, 0.55, H - 0.10, H + 0.02, 0.25, 16);
    box(B.dark, -0.15, 0.00, 0.44, 0.66, H + 0.02, H + 0.05);
    /* roof ventilator, antenna bases */
    cylZ(B.paint, -0.75, 0.15, H - 0.12, H - 0.02, 0.12, 10);
    cylZ(B.dark, -0.95, 0.72, H - 0.25, H - 0.11, 0.045, 8);
    cylZ(B.dark, -0.95, -0.72, H - 0.25, H - 0.11, 0.045, 8);
    /* turret-rear stowage box and the snorkel tube carried over it (P2, P6) */
    box(B.paint, -1.62, -1.22, -0.78, 0.78, 0.16, 0.48);
    box(B.dark, -1.64, -1.62, -0.74, 0.74, 0.20, 0.44);
    cylY(B.paint, -1.40, -0.70, 0.70, 0.58, 0.085, 12);
    if (V.bustleGrille) {
      /* B3 obr. 2016 (P8, P9): a slat grille round the bustle, behind and down both sides */
      var gx = -1.98, gy = 1.00, gz0 = 0.10, gz1 = 0.66;
      box(B.dark, gx - 0.02, gx + 0.02, -gy, gy, gz1 - 0.04, gz1);
      box(B.dark, gx - 0.02, gx + 0.02, -gy, gy, gz0, gz0 + 0.04);
      box(B.dark, gx - 0.015, gx + 0.015, -gy, gy, (gz0 + gz1) / 2 - 0.015, (gz0 + gz1) / 2 + 0.015);
      for (i = 0; i <= 16; i++) box(B.dark, gx - 0.02, gx + 0.02, -gy + i * (2 * gy / 16) - 0.012, -gy + i * (2 * gy / 16) + 0.012, gz0, gz1);
      for (s = -1; s <= 1; s += 2) {
        box(B.dark, gx, -0.95, s * gy - 0.02, s * gy + 0.02, gz1 - 0.04, gz1);
        box(B.dark, gx, -0.95, s * gy - 0.02, s * gy + 0.02, gz0, gz0 + 0.04);
        for (x = gx + 0.11; x <= -0.95; x += 0.11) box(B.dark, x - 0.012, x + 0.012, s * gy - 0.02, s * gy + 0.02, gz0, gz1);
      }
      box(B.paint, -1.92, -1.62, -0.90, 0.90, 0.14, 0.56);
    }
    box(B.team, -0.70, 0.10, -0.125, 0.125, H - 0.03, H + 0.01);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.a, T = materials(THREE, C, V), g = new THREE.Group();
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
    turretT72(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(TX, 0, RING);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len: the measured X extent of each build (models3d convention); published 9.53 m gun forward */
UNIT_MODELS["pact_e60_t72"] = {
  len: 9.65,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "ural"); }
};
UNIT_MODELS["pact_e80_t72a"] = {
  len: 9.65,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "a"); }
};
UNIT_MODELS["pact_e80_t72b"] = {
  len: 9.65,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "b"); }
};
UNIT_MODELS["pact_e90_t72b89"] = {
  len: 9.65,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "b89"); }
};
UNIT_MODELS["pact_e00_t72b3"] = {
  len: 9.65,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "b3"); }
};
UNIT_MODELS["pact_e20_t72b3m"] = {
  len: 9.72,
  build: function (THREE, M, C) { return HeroT72.build(THREE, M, C, "b3m"); }
};
