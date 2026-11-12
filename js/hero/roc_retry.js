/* ============ roc_retry.js - HERO models: ROC rows held for want of a reference, retried with Wikipedia ============
   ROW              VEHICLE                                        HOW                                          PAINT
   roc_e00_spaag    Antelope (TC-1L, 4 x Sky Sword I) on the       NEW  antelope(..., "old")                    rocp
                    earlier Toyota Dyna light truck [A2]
   spaag_r          Antelope on the 2011-on Dyna / Hino 300 wide   NEW  antelope(..., "new")                    rocp
                    cab truck [A1][A3][A4]
   atgmv_r          M1167 HMMWV with the M41A7 ITAS TOW [I1]       REUSED HeroHumvee.make("e00") (js/hero/      rocp (skin
                                                                   us_humvee.js), turret meshes replaced         swapped)
   lst_r            ROC Navy LCU, the 1610 class [L1]              REUSED HeroLCU1610.build (js/hero/            the module's
                                                                   us_lcu1610.js), called as it is               haze grey
   HELD (not registered here):
   missileboat_r    "HF-III Missile Craft": js/hero/roc_ships2.js's Kuang Hua VI (kuangHua6) is the only ROC missile
                    boat of the present day with a reference, but it carries four Hsiung Feng II (en.wikipedia;
                    roc_ships2.js [K1]), not the Hsiung Feng III the row names (rules.js ssm_hf3), and
                    warship_specs.js calls the row "Hai Ou class".  Which boat the row means is not settled by any
                    source read: not drawn, so as not to pair a boat with a missile it does not carry.
   sam_r            Sky Bow III (Tien Kung III) launcher: Commons has the launcher trailer only with its canisters
                    ERECTED, in 3/4 views ("Tien Kung III Missile Launcher Trailer Display at Military Academy
                    Ground 20140531.jpg", "TK-3 MEL.jpg"), no side view in travel order and no published size:
                    no station can be measured.  Left to js/sam3d.js's stand-in.

   SEARCHES (2026-11-04): en.wikipedia "Antelope air defence system" (one image, A2, and the Commons category
   "Antelope Air Defense System", ten files, read through); "List of Republic of China Navy ships" (the LCU
   table and L1); "BGM-71 TOW" and "Humvee" (no ROC M1167 image); Commons "M1167 HMMWV", "HMMWV TOW ITAS",
   "Taiwan TOW Humvee" (I1); "Sky Bow III launcher", "Tien Kung III".  zh.wikipedia could NOT be reached
   from this session (the proxy refuses the host), so no zh-only local file was seen.

   REFERENCES (Wikimedia Commons unless said; fetched at 960-1280 px into scratchpad q_rocretry_ref and
   q_rk2_ref):
     A1  "Antelope Air Defense System Display at Gangshan Air Force Base Apron 20170812.jpg" - the wide-cab
         truck from the RIGHT, near square on, two soldiers standing beside it: THE ANTELOPE STATION TABLE
         (antelope()).  The launcher is trained about 25 degrees (the two sides' noses 0.63 m apart in X).
     A2  "Antelope Air Defense System in Songshan Air Force Base 20110813a.jpg" (the image en.wikipedia
         "Antelope air defence system" uses) - front left: the EARLIER Dyna cab (square roof edges, a flat
         face), the same body and launcher.  Drawn on A1's stations: NOT CONFIRMED in length.
     A3  "Antelope Air Defense System Near View 20111015.jpg" - front right of the wide cab: the head, the
         drum, the sensor box on top, two rounds a side one over the other, the jacks at the body corners
         down; A4 "...Display at Armor School 20130302.jpg" and "...Tainan Air Froce Base Apron
         20130810.jpg": front left, the head and the box, the vents.
     I1  "Bilateral wire guided missile training conducted in Lithuania 150806-A-FJ979-004.jpg" (US Army,
         2015) - a US M1167 from the RIGHT, near square on, firing: the armoured HMMWV, the ITAS on its
         post in the open-backed shield tub, the fat rear and thin front of the launch tube, the TAS box
         over it.  139 px a metre on the 3.30 m wheelbase.  No photograph of an ROC M1167 was found: the
         vehicle is the same type; its ROC paint is NOT CONFIRMED (plain ROC green, as the ROC HMMWVs
         photographed on Commons, e.g. "M1045 Display at ROCA Taitung District Command Department
         20120324.jpg").
     L1  "2025.07.14 LCU 1610 (He Chao II) ROC Navy.jpg" (Office of the President; the image en.wikipedia
         "List of Republic of China Navy ships" uses for the class) - LCU-406 from the port bow at a slip:
         the high raised ramp, the hull and pilot house of the 1610 class, the ROC awning over the deckhouse
         (an awning, not drawn).
   PUBLISHED: en.wikipedia "Antelope air defence system": four Sky Sword I (TC-1) on "a wheeled vehicle
     (such as a Toyota Dyna truck ... or humvee)", crew two.  No size of the system, the round or the truck
     is published in any source read ("Sky Sword I" and "Sea Oryx" give none; "Toyota Dyna" and "Hino
     Dutro" give no dimension).  "Humvee" (via us_humvee.js): wheelbase 3.30 m.  "List of Republic of China
     Navy ships": twelve 1610-class LCUs (1979, 2011), 400 t.
   SCALE OF A1 (no published figure exists for it): the two soldiers beside the truck, 164 and 161 px tall,
     read at 1.72 m (a man's height, NOT a published figure) give 94-95 px a metre at their station, about
     half a metre nearer the camera than the truck's side: 92 px a metre is used at the truck.  The checks
     it passes: the round comes out 2.75 m (the AIM-9 it resembles is 2.87 m) and the tyre 0.74 m (a
     7.50-16 class tyre).  EVERY Antelope size is therefore NOT CONFIRMED to better than about 5 per cent.
     Width 2.00 m (the body as wide as the cab, A3): NOT CONFIRMED.
   WHERE A FIGURE AND A DRAWING DISAGREE: armour_specs.js gives the Antelope 4.9 x 2.2 x 2.6-2.7 m (game
     data, no source); A1 measures 5.44 m long (bumper to body tail) and 3.41 m to the sensor box top with the rounds level (the
     head and rounds stand that high in A1, A3, A4: drawn as measured).
   RECOGNITION
     Antelope: the small forward-control cab, the long box body on a dual-wheel rear axle, the square
       housing behind the cab with the head on it, two Sidewinder-like rounds a side one over the other on
       rails, the drum across the head and the angled sensor box on top (A1-A4).
     M1167: the armoured HMMWV, the shield tub on the roof, the long launch tube with the box sight over it
       (I1).
   PAINT: plain ROC green #55654b (rocp); the rounds dark green (msl), grey seeker domes - A1-A4 show the
     ROC three-colour and A1 orange seeker covers: neither drawn (rule 6; covers are not the round).  No
     markings, numbers, characters or plates (A1-A4 carry unit characters: not drawn).
   NOT CONFIRMED (beyond the scale above): the old cab's shape (A2 is a 3/4 view; drawn on the new cab's
     stations), the turret's housing and head sizes (A3/A4 proportions), the drum and sensor box sizes,
     the fin spans (0.64 / 0.45 m, the AIM-9's), the launch elevation (0.45 rad), the jacks' places, the
     M1167's ITAS dimensions (I1 at the wheelbase scale), its paint.
   NOT DRAWN: whips (A1 shows one 4 m whip), the remote control console, the seeker covers, I1's crew,
     the LCU's awning, flags and fenders.
   LAUNCHERS: Antelope "turret" (origin on the box roof at the azimuth axis, rounds along +X) holding
     "podelev" (origin on the drum's axis; userData.el 0.45, userData.cells = [nose x, y, z, tail x], four).
     M1167: "turret" is the module's own ring group, its contents replaced.  No row here carries "ord"
     (rules.js / eras.js), so tools/jsc/launcher3d_check.js's ORDS table needs nothing.
   ENGINE (js/damage3d.js ENGINE_AT, not edited): roc_e00_spaag, spaag_r and atgmv_r are listed "front": the
     Dyna's engine is under the cab and the HMMWV's in front - right.  lst_r: ships, not in ENGINE_AT.
   LOAD ORDER: after js/armour_specs.js and js/units3d_final.js (their generic registrations of these keys
     are replaced) and after js/hero/us_humvee.js and js/hero/us_lcu1610.js (atgmv_r and lst_r are
     registered only if those modules are loaded).
   Materials: PAINT (canvas, plain), DARK, RUB, GLASS, TEAM (exactly C.team: thin strips on the cab roof,
     the body and the turret), WHEEL (vertex colours), LAMP/AMBER/TAIL, MSL, NOSE.  Nodes: "turret",
     "podelev", "roadwheel" (one per axle).
   DETAIL PASS: the Antelope rows (antelopeDetail, antelopeTurretDetail, hubNuts: 4608 -> 7632 triangles,
     16 draw calls kept) and the M1167's ITAS turret (6660 -> 7388, 15); the paint canvas gains plate
     seams, bolt rows, panel outlines, chips and grime.  lst_r is HeroLCU1610 called as it is (its rails,
     bollards and fittings are that module's) and is not changed here.  Sizes NOT CONFIRMED (proportions).
   Model space: +X nose, +Y left (port), +Z up, metres, ground at z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroRocRetry = (function () {
  "use strict";
  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ geometry kit (pla_type63_apc.js) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.C) this.C.push(this.col[0], this.col[1], this.col[2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.30, q[1] * 0.30);
        else if (ay >= ax) this.U.push(q[0] * 0.30, q[2] * 0.30);
        else this.U.push(q[1] * 0.30, q[2] * 0.30);
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
  /* a box on both sides: y0 < y1 on +Y, mirrored */
  function box2(bin, x0, x1, y0, y1, z0, z1) { box(bin, x0, x1, y0, y1, z0, z1); box(bin, x0, x1, -y1, -y0, z0, z1); }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
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
  function cylX(bin, x0, x1, y, z, r0, r1, seg) { cyl(bin, [x0, y, z], [x1, y, z], r0, r1 === undefined ? r0 : r1, seg || 14); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg || 14); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg || 14); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
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
  /* a box turned about Y by angle a (radians, + raises its +X end), centre c, half sizes */
  function boxP(bin, c, a, hu, hv, hw) { slab(bin, c, [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], hu, hv, hw); }

  /* ---------------------------------------------------------------- paint */
  /* "rocp": the ROC Army's green as a PLAIN field (#55654b, the green of roc_artillery.js's "roc",
     sampled there off the same museum and display vehicles), with soft weathering only - the
     three-colour patches the photographs show are a camouflage pattern and are not drawn (policy
     rule 6); "msl": the dark green of the Sky Sword I rounds [A1-A4].  One canvas per scheme and
     tile size (metres). */
  var PAINTS = {
    rocp: { base: "#55654b", tone: ["#5b6b51", "#4e5d45"], seed: 2005, camo: false },
    msl:  { base: "#4a5340", tone: ["#50594a", "#444c3a"], seed: 1993, camo: false }
  };
  var _cv = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintCanvas(kind, tile) {
    var key = kind + "_" + tile;
    if (_cv[key] !== undefined) return _cv[key];
    var P = PAINTS[kind], cv = null;
    try {
      cv = document.createElement("canvas");
      var S = 256, q, R = rng(P.seed), i, k, x, y, w, pm = S / tile, ox, oy, j, n, a, r, pts;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      if (P.camo) {
        /* brown, then black over it, in patches 0.6-1.4 m across (T1, K1, A1) */
        for (k = 0; k < 2; k++) {
          q.fillStyle = P.tone[k];
          for (i = 0; i < Math.max(3, Math.round(tile * tile * (k ? 0.30 : 0.42))); i++) {
            x = R() * S; y = R() * S; w = (k ? 0.30 : 0.42) * pm * (0.7 + R() * 0.7);
            n = 9; pts = [];
            for (j = 0; j < n; j++) { a = j / n * TAU; r = 0.6 + R() * 0.5; pts.push([Math.cos(a) * w * 1.5 * r, Math.sin(a) * w * 0.8 * r]); }
            for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
              q.beginPath(); q.moveTo(x + ox + pts[0][0], y + oy + pts[0][1]);
              for (j = 1; j < n; j++) q.lineTo(x + ox + pts[j][0], y + oy + pts[j][1]);
              q.closePath(); q.fill();
            }
          }
        }
      } else {
        for (k = 0; k < P.tone.length; k++) {
          q.fillStyle = P.tone[k];
          for (i = 0; i < 7; i++) {
            x = R() * S; y = R() * S; w = 30 + R() * 60;
            q.globalAlpha = 0.45; q.beginPath(); q.ellipse(x, y, w, w * (0.4 + R() * 0.5), R() * 3, 0, TAU); q.fill();
          }
        }
        q.globalAlpha = 1;
      }
      for (i = 0; i < 80; i++) {          /* rain streaks, rubbed paint */
        q.fillStyle = (i % 3) ? "rgba(18,18,12,0.07)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 1 + R() * 3, 8 + R() * 36);
      }
      for (i = 0; i < 40; i++) { q.fillStyle = "rgba(10,10,8,0.15)"; q.fillRect(R() * S, R() * S, 2, 2); }
      /* DETAIL PASS: plate seams with a lit edge about a metre apart, bolt rows on some, access-panel
         outlines with corner screws, chipped paint and grime (tile-relative: pm pixels a metre) */
      var nx = Math.max(1, Math.round(tile / 1.1)), sx;
      for (i = 0; i < nx; i++) {
        sx = Math.floor((i + 0.3 + R() * 0.4) * S / nx) + 0.5;
        q.strokeStyle = "rgba(14,15,10,0.36)"; q.lineWidth = 1.5; q.beginPath(); q.moveTo(sx, 0); q.lineTo(sx, S); q.stroke();
        q.strokeStyle = "rgba(255,250,225,0.10)"; q.lineWidth = 1; q.beginPath(); q.moveTo(sx + 1.5, 0); q.lineTo(sx + 1.5, S); q.stroke();
        y = Math.floor(R() * S) + 0.5;
        q.strokeStyle = "rgba(14,15,10,0.32)"; q.lineWidth = 1.5; q.beginPath(); q.moveTo(sx, y); q.lineTo(sx + S / nx, y); q.stroke();
        if (i % 2 === 0) for (x = sx + 5; x < sx + S / nx - 3; x += Math.max(6, pm * 0.09)) { q.fillStyle = "rgba(12,12,8,0.42)"; q.fillRect(x, y - 4, 2, 2); }
      }
      for (i = 0; i < 3; i++) {
        x = Math.floor(R() * S * 0.8) + 0.5; y = Math.floor(R() * S * 0.8) + 0.5; w = pm * (0.25 + R() * 0.35);
        q.strokeStyle = "rgba(14,15,10,0.30)"; q.lineWidth = 1; q.strokeRect(x, y, w, w * (0.5 + R() * 0.5));
        q.fillStyle = "rgba(12,12,8,0.45)"; q.fillRect(x + 2, y + 2, 2, 2); q.fillRect(x + w - 4, y + 2, 2, 2);
      }
      for (i = 0; i < 90; i++) { q.fillStyle = (i % 2) ? "rgba(205,200,175,0.20)" : "rgba(10,10,8,0.25)"; q.fillRect(R() * S, R() * S, 1 + R() * 2, 1 + R() * 2); }
      for (i = 0; i < 30; i++) { q.fillStyle = "rgba(30,25,15,0.08)"; q.beginPath(); q.ellipse(R() * S, R() * S, 6 + R() * 24, 3 + R() * 12, R() * 3, 0, TAU); q.fill(); }
    } catch (e) { cv = null; }
    _cv[key] = cv;
    return cv;
  }
  function tex(THREE, kind, tile) {
    var cv = paintCanvas(kind, tile), t;
    if (!cv) return null;
    try {
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    return t;
  }
  function paintMat(THREE, kind) {
    var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05 }), t = tex(THREE, kind, 1 / 0.30);
    if (t) m.map = t; else m.color.set(PAINTS[kind].base);
    return m;
  }
  function materials(THREE, C, kind) {
    var T = {};
    T.paint = paintMat(THREE, kind);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.rub = new THREE.MeshStandardMaterial({ color: 0x1c1d1e, roughness: 0.95, metalness: 0.03 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.04, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    return T;
  }
  function bins(T) {
    return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), rub: new Bin(T.rub, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b || !b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }
  function group(THREE, name, x, y, z) { var g = new THREE.Group(); if (name) g.name = name; g.position.set(x || 0, y || 0, z || 0); return g; }
  function shadows(g) { g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return g; }
  function hexc(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }

  function tyrePair(W, base, ty, r, w, dual) {
    var s, y, k, a, TY = [0.11, 0.115, 0.11], SW = [0.15, 0.15, 0.145], RM = hexc(base, 1.0), H = hexc(base, 1.2);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < (dual ? 2 : 1); k++) {
        y = s * (ty + (dual ? (k ? 1 : -1) * (w * 0.5 + 0.015) : 0));
        W.col = TY; cylY(W, 0, y - w / 2, y + w / 2, 0, r, 22);
        for (a = 0; a < 16; a++) {   /* tread lugs */
          var ta = a / 16 * TAU;
          slab(W, [Math.cos(ta) * (r + 0.008), y, Math.sin(ta) * (r + 0.008)], [Math.cos(ta), 0, Math.sin(ta)], [0, 1, 0], [-Math.sin(ta), 0, Math.cos(ta)], 0.012, w * 0.42, r * 0.09);
        }
        if (dual && k === 0) continue;
        W.col = SW; cylY(W, 0, y + s * w / 2, y + s * (w / 2 + 0.012), 0, r * 0.93, 22);
        W.col = RM; cyl(W, [0, y + s * (w / 2 + 0.01), 0], [0, y + s * (w / 2 + 0.03), 0], r * 0.56, r * 0.50, 18);
        W.col = H; cylY(W, 0, y + s * (w / 2 + 0.02), y + s * (w / 2 + 0.09), 0, r * 0.20, 10);
      }
    }
  }
  function wheelGroups(THREE, g, T, list) {
    /* list: [x, z, fn(W)] - one "roadwheel" group per station/axle, both sides */
    for (var i = 0; i < list.length; i++) {
      var W = new Bin(T.wheel, false, true), wg = group(THREE, "roadwheel", list[i][0], 0, list[i][1]);
      list[i][2](W);
      flush(THREE, wg, { w: W });
      g.add(wg);
    }
  }


  /* ================================================ Antelope on the light truck (roc_e00_spaag, spaag_r) */
  /* STATION TABLE (A1 "...Gangshan Air Force Base Apron 20170812.jpg", right side, near square on, at
     92 px a metre - see the header for how that scale was got; X = (px - 479.5) / 92 forward, z =
     (555 - py) / 92 up): bumper 2.70, cab face 2.64, windscreen foot 2.49 / 1.45, roof front 2.34 /
     2.09, roof 2.20, cab back 0.59, front axle 0.98, rear axle -2.07 (dual), tyre r 0.37; the body box
     0.45 to -2.70, z 0.98-1.54, its vents at -2.49..-2.15, -1.27..-1.00 and -0.10..0.14; the launcher's
     azimuth axis -0.90 on the box roof, its base housing to 2.24, the head to 3.04, the upper missiles'
     axis 3.08 and the lower 2.63, the round 2.75 m long (tail -2.25 to nose 0.50 in A1, where the
     launcher is trained about 25 degrees: the two sides' noses stand 0.63 m apart in X). */
  var AN = { XB: 2.70, XC0: 0.59, AXF: 0.98, AXR: -2.07, R: 0.37, HW: 1.00, BX0: 0.45, BX1: -2.70,
             BZ0: 0.98, BZ1: 1.54, TX: -0.90, MY: 0.56, MZU: 0.22, MZL: -0.23, PZ: 1.32, ML: 2.75, EL: 0.45 };
  function cabRing(x, hw, z0, z1, ch) {
    return [[x, -hw, z0], [x, hw, z0], [x, hw, z1 - ch], [x, hw - ch, z1], [x, -hw + ch, z1], [x, -hw, z1 - ch]];
  }
  /* the cab: "new" is the 2011-on Dyna / Hino 300 wide cab of A1, A3, A4 (rounded roof edges, the big
     raked windscreen); "old" the earlier Dyna cab of A2 (square roof edges, a flatter face) */
  function cab(B, kind) {
    var s, hw = AN.HW, ch = kind === "old" ? 0.05 : 0.14, roof = kind === "old" ? 2.15 : 2.20;
    loftN(B.paint, [cabRing(AN.XC0, hw, 0.80, roof, ch), cabRing(2.05, hw, 0.80, roof, ch),
                    cabRing(kind === "old" ? 2.30 : 2.36, hw - 0.01, 0.80, kind === "old" ? 2.13 : 2.06, ch),
                    cabRing(2.50, hw - 0.03, 0.80, 1.45, 0.06), cabRing(2.64, hw - 0.05, 0.80, 1.38, 0.05)]);
    box(B.paint, 1.42, 2.64, -hw + 0.02, hw - 0.02, 0.52, 0.80);          /* below the doors, ahead of the arch */
    /* windscreen on the rake, the door windows, the black grille band, lamps */
    var x0 = kind === "old" ? 2.31 : 2.37, z0 = kind === "old" ? 2.08 : 2.02, x1 = 2.505, z1 = 1.48;
    var L = Math.sqrt((x1 - x0) * (x1 - x0) + (z1 - z0) * (z1 - z0)), u = [(x1 - x0) / L, 0, (z1 - z0) / L];
    slab(B.glass, [(x0 + x1) / 2 + 0.012, 0, (z0 + z1) / 2 + 0.004], u, [0, 1, 0], [-u[2], 0, u[0]], L / 2, hw - 0.12, 0.012);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, 1.62, 2.28, s > 0 ? hw - 0.005 : -hw - 0.005, s > 0 ? hw + 0.005 : -hw + 0.005, 1.45, 2.00);
      box(B.dark, 0.62, 0.66, s > 0 ? hw - 0.004 : -hw - 0.004, s > 0 ? hw + 0.004 : -hw + 0.004, 0.85, 2.05);   /* door seam */
      box(B.lamp, 2.62, 2.665, s * 0.72 - 0.17, s * 0.72 + 0.17, 0.92, 1.04);
      box(B.amber, 2.62, 2.665, s * 0.93 - 0.05, s * 0.93 + 0.05, 0.72, 0.80);
      /* the mirrors on their arms (A1, A3) */
      box(B.dark, 2.30, 2.34, s * hw, s * (hw + 0.22), 1.86, 1.89);
      box(B.dark, 2.30, 2.36, s * (hw + 0.18) - 0.06, s * (hw + 0.18) + 0.06, 1.55, 1.90);
      box(B.dark, 0.95, 1.60, s > 0 ? hw - 0.01 : -hw - 0.02, s > 0 ? hw + 0.02 : -hw + 0.01, 0.52, 0.56);   /* step */
    }
    box(B.dark, 2.63, 2.665, -0.55, 0.55, 1.00, 1.28);
    box(B.dark, 2.60, 2.72, -hw, hw, 0.36, 0.62);                              /* bumper */
    box(B.team, 1.10, 1.70, -0.06, 0.06, roof, roof + 0.012);
  }
  function antelopeTruck(B) {
    var s, x;
    /* chassis rails, the box behind the cab, tanks and lockers under the body (A1, A3, A4) */
    for (s = -1; s <= 1; s += 2) box(B.dark, AN.BX1 + 0.05, 2.55, s * 0.42 - 0.06, s * 0.42 + 0.06, 0.55, 0.78);
    box(B.paint, AN.BX0, AN.BX1, -AN.HW, AN.HW, AN.BZ0, AN.BZ1);
    box(B.paint, AN.BX0 - 0.02, AN.BX1 + 0.02, -AN.HW + 0.05, AN.HW - 0.05, 0.78, AN.BZ0);
    box(B.paint, 0.40, -1.55, -0.92, 0.92, 0.52, 0.78);                        /* lockers between the axles */
    cylX(B.dark, -0.10, 0.35, -0.70, 0.62, 0.17, 0.17, 12);                   /* fuel tank, right */
    for (s = -1; s <= 1; s += 2) {
      var yo = s > 0 ? AN.HW : -AN.HW - 0.01;
      [[-2.49, -2.15], [-1.27, -1.00], [-0.10, 0.14]].forEach(function (v) {
        box(B.dark, v[0], v[1], yo, yo + 0.01, 1.05, 1.45);
        for (x = v[0] + 0.04; x < v[1] - 0.02; x += 0.06) box(B.paint, x, x + 0.02, s > 0 ? yo + 0.01 : yo - 0.005, s > 0 ? yo + 0.02 : yo, 1.06, 1.44);
      });
      box(B.dark, AN.BX0 + 0.02, AN.BX1 - 0.02, s > 0 ? AN.HW : -AN.HW - 0.02, s > 0 ? AN.HW + 0.02 : -AN.HW, AN.BZ1 - 0.03, AN.BZ1);
      box(B.paint, -1.55, -2.62, s > 0 ? 0.60 : -0.98, s > 0 ? 0.98 : -0.60, 0.80, 0.84);   /* rear mudguards */
      /* the stabiliser jacks at the body's corners, stowed (A3 shows them down at a display) */
      [0.38, -2.62].forEach(function (xj) {
        box(B.dark, xj - 0.06, xj + 0.06, s * (AN.HW + 0.02) - 0.05, s * (AN.HW + 0.02) + 0.05, 0.42, 1.48);
        box(B.dark, xj - 0.10, xj + 0.10, s * (AN.HW + 0.02) - 0.09, s * (AN.HW + 0.02) + 0.09, 0.36, 0.42);
      });
      box(B.lampR, AN.BX1 - 0.01, AN.BX1, s * 0.82 - 0.08, s * 0.82 + 0.08, 1.05, 1.15);
    }
    box(B.team, -2.40, -1.80, -0.06, 0.06, AN.BZ1, AN.BZ1 + 0.012);
  }
  /* one Sky Sword I in the elevating frame's own coordinates: nose along +X */
  function tc1(MB, xc, y, z) {
    var xt = xc - AN.ML / 2, xn = xc + AN.ML / 2, k, a, r = 0.064;
    cylX(MB.msl, xt, xn - 0.24, y, z, r, r, 12);
    cylX(MB.nose, xn - 0.24, xn, y, z, r, 0.018, 12);
    for (k = 0; k < 4; k++) {
      a = (k + 0.5) * Math.PI / 2;
      var cy = Math.cos(a), cz = Math.sin(a);
      /* tail fins 0.64 m over the tips, canards 0.45 m (A1, A3: the AIM-9-like planform) */
      slab(MB.msl, [xt + 0.18, y + cy * (r + 0.13), z + cz * (r + 0.13)], [1, 0, 0], [0, cy, cz], [0, -cz, cy], 0.17, 0.13, 0.006);
      slab(MB.msl, [xn - 0.50, y + cy * (r + 0.08), z + cz * (r + 0.08)], [1, 0, 0], [0, cy, cz], [0, -cz, cy], 0.09, 0.08, 0.006);
    }
  }
  /* DETAIL PASS (A1-A4): the fittings the first pass left out - wipers, grille slats, the bumper's
     lamps and tow hooks, door handles and hinges, the roof's rain gutter, the nose-corner mirrors, the
     exhaust, the body's panel frames, locker doors and handles, the jacks' screws and pads, the rear
     bumper and lamp guards; the hub nuts on every wheel.  Sizes by proportion: NOT CONFIRMED. */
  function antelopeDetail(B, kind) {
    var s, i, hw = AN.HW, roof = kind === "old" ? 2.15 : 2.20;
    var x0 = kind === "old" ? 2.31 : 2.37, z0 = kind === "old" ? 2.08 : 2.02, x1 = 2.505, z1 = 1.48;
    var L = Math.sqrt((x1 - x0) * (x1 - x0) + (z1 - z0) * (z1 - z0)), u = [(x1 - x0) / L, 0, (z1 - z0) / L], n = [-u[2], 0, u[0]];
    for (s = -1; s <= 1; s += 2) {
      /* the wipers parked along the windscreen's foot, the arm and blade (A3) */
      var cx = x1 - u[0] * 0.10 + n[0] * 0.03, cz = z1 + 0.06 + n[2] * 0.03;
      slab(B.dark, [cx, s * 0.30, cz], [0, 1, 0], u, n, 0.30, 0.008, 0.008);
      slab(B.dark, [cx - u[0] * 0.03, s * 0.55, cz - u[2] * 0.03], u, [0, 1, 0], n, 0.06, 0.008, 0.008);
      /* door handle, two hinges at the door's front edge, a grab handle by the door (A3) */
      box(B.dark, 1.62, 1.72, s > 0 ? hw : -hw - 0.02, s > 0 ? hw + 0.02 : -hw, 1.33, 1.36);
      for (i = 0; i < 2; i++) box(B.dark, 2.24, 2.30, s > 0 ? hw - 0.005 : -hw - 0.015, s > 0 ? hw + 0.015 : -hw + 0.005, 1.00 + i * 0.55, 1.10 + i * 0.55);
      cylZ(B.dark, 0.66, s * (hw + 0.04), 1.20, 1.75, 0.012, 6);
      /* the rain gutter along the roof edge */
      box(B.dark, AN.XC0, 2.30, s > 0 ? hw - 0.03 : -hw - 0.005, s > 0 ? hw + 0.005 : -hw + 0.03, roof - 0.08, roof - 0.06);
      /* the small mirror on the cab's nose corner (A3) */
      cylZ(B.dark, 2.50, s * (hw - 0.08), 1.42, 1.58, 0.01, 6);
      box(B.dark, 2.48, 2.52, s * (hw - 0.08) - 0.07, s * (hw - 0.08) + 0.07, 1.56, 1.66);
      /* the bumper's lamps and tow hooks (A3) */
      box(B.amber, 2.705, 2.72, s * 0.80 - 0.07, s * 0.80 + 0.07, 0.42, 0.50);
      box(B.dark, 2.64, 2.70, s * 0.35 - 0.03, s * 0.35 + 0.03, 0.30, 0.38);
      cylY(B.dark, 2.68, s * 0.35 - 0.035, s * 0.35 + 0.035, 0.31, 0.03, 8);
      /* the body's frame rails round its side, the locker doors with handles, rivets along the top */
      box(B.dark, AN.BX1 + 0.02, AN.BX0 - 0.02, s > 0 ? hw : -hw - 0.012, s > 0 ? hw + 0.012 : -hw, AN.BZ0, AN.BZ0 + 0.03);
      [[-1.90, -1.35], [-0.92, -0.18]].forEach(function (d) {
        box(B.dark, d[0], d[0] + 0.02, s > 0 ? hw : -hw - 0.008, s > 0 ? hw + 0.008 : -hw, 1.05, 1.45);
        box(B.dark, d[1] - 0.02, d[1], s > 0 ? hw : -hw - 0.008, s > 0 ? hw + 0.008 : -hw, 1.05, 1.45);
        box(B.dark, (d[0] + d[1]) / 2 - 0.05, (d[0] + d[1]) / 2 + 0.05, s > 0 ? hw : -hw - 0.03, s > 0 ? hw + 0.03 : -hw, 1.24, 1.27);
      });
      for (i = 0; i < 16; i++) { var rx = AN.BX1 + 0.10 + i * 0.195; box(B.dark, rx - 0.01, rx + 0.01, s > 0 ? hw : -hw - 0.01, s > 0 ? hw + 0.01 : -hw, AN.BZ1 - 0.07, AN.BZ1 - 0.05); }
      /* the jacks' screws and feet (A3 shows them down) */
      [0.38, -2.62].forEach(function (xj) {
        cylZ(B.dark, xj, s * (AN.HW + 0.02), 1.48, 1.60, 0.03, 8);
        box(B.dark, xj - 0.03, xj + 0.03, s * (AN.HW + 0.02) - 0.10, s * (AN.HW + 0.02) + 0.10, 1.58, 1.61);
        box(B.dark, xj - 0.07, xj + 0.07, s > 0 ? AN.HW + 0.07 : -AN.HW - 0.075, s > 0 ? AN.HW + 0.075 : -AN.HW - 0.07, 0.60, 1.30);
      });
      /* the rear lamp's guard, the rear bumper's ends */
      box(B.dark, AN.BX1 - 0.02, AN.BX1, s * 0.82 - 0.10, s * 0.82 + 0.10, 1.16, 1.18);
      box(B.dark, AN.BX1 - 0.02, AN.BX1, s * 0.82 - 0.10, s * 0.82 + 0.10, 1.02, 1.04);
    }
    /* the grille's slats over the black band (A3) */
    for (i = 0; i < 4; i++) box(B.paint, 2.655, 2.672, -0.52, 0.52, 1.03 + i * 0.065, 1.05 + i * 0.065);
    /* the exhaust under the cab on the right, its tail pipe */
    cylX(B.dark, 0.70, 1.30, -0.62, 0.48, 0.07, 0.07, 10);
    cyl(B.dark, [0.70, -0.62, 0.48], [0.55, -0.80, 0.42], 0.035, 0.035, 8);
    /* the rear under-run bar, the fuel tank's straps */
    box(B.dark, AN.BX1 - 0.02, AN.BX1 + 0.08, -0.85, 0.85, 0.50, 0.58);
    for (i = 0; i < 2; i++) box(B.dark, -0.05 + i * 0.30, -0.02 + i * 0.30, -0.88, -0.52, 0.44, 0.80);
  }
  function antelopeTurretDetail(TB) {
    var s, i;
    /* the housing's access panels: hinges and latches; the sensor box's window; an aerial base (A3) */
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) box(TB.dark, -0.30 + i * 0.50, -0.20 + i * 0.50, s > 0 ? 0.45 : -0.465, s > 0 ? 0.465 : -0.45, 0.62, 0.66);
      box(TB.dark, -0.03, 0.03, s > 0 ? 0.45 : -0.47, s > 0 ? 0.47 : -0.45, 0.30, 0.44);
      box(TB.dark, -0.30, 0.22, s > 0 ? 0.27 : -0.28, s > 0 ? 0.28 : -0.27, 0.85, 0.87);
      box(TB.dark, -0.30, 0.22, s > 0 ? 0.27 : -0.28, s > 0 ? 0.28 : -0.27, 1.30, 1.32);
    }
    boxP(TB.dark, [0.29, 0, 1.66], 0.30, 0.012, 0.15, 0.06);
    cylZ(TB.dark, -0.42, 0.38, 0.70, 0.82, 0.03, 8);
    for (i = 0; i < 12; i++) { var a = i / 12 * TAU; cylZ(TB.dark, Math.cos(a) * 0.40, Math.sin(a) * 0.40, 0.05, 0.065, 0.018, 6); }
  }
  /* the hub nuts and the disc's holes on a single or the outer dual tyre (A3) */
  function hubNuts(W, ty, r, w, dual) {
    var s, k, y;
    for (s = -1; s <= 1; s += 2) {
      y = s * (ty + (dual ? (w * 0.5 + 0.015) : 0)) + s * (w / 2 + 0.03);
      W.col = [0.19, 0.19, 0.18];
      for (k = 0; k < 6; k++) { var a = k / 6 * TAU; cylY(W, Math.cos(a) * r * 0.30, y, y + s * 0.02, Math.sin(a) * r * 0.30, 0.016, 6); }
      W.col = [0.09, 0.09, 0.09];
      for (k = 0; k < 5; k++) { var b = (k + 0.5) / 5 * TAU; cylY(W, Math.cos(b) * r * 0.42, y - s * 0.004, y + s * 0.004, Math.sin(b) * r * 0.42, 0.03, 8); }
    }
  }
  function antelope(THREE, M, C, kind) {
    var T = materials(THREE, C, "rocp"), g = group(THREE, kind === "old" ? "roc_e00_spaag" : "spaag_r"), B = bins(T), s;
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xcfc9ac, roughness: 0.3, metalness: 0.1, emissive: 0x2a2814, emissiveIntensity: 0.7 });
    T.amber = new THREE.MeshStandardMaterial({ color: 0xc87a1a, roughness: 0.35, metalness: 0.1, emissive: 0x3a2206, emissiveIntensity: 0.7 });
    T.lampR = new THREE.MeshStandardMaterial({ color: 0xa01a10, roughness: 0.35, metalness: 0.1, emissive: 0x3c0a06, emissiveIntensity: 0.8 });
    B.lamp = new Bin(T.lamp, false); B.amber = new Bin(T.amber, false); B.lampR = new Bin(T.lampR, false);
    cab(B, kind);
    antelopeTruck(B);
    antelopeDetail(B, kind);
    var hg = group(THREE, "hull"); flush(THREE, hg, B); g.add(hg);
    wheelGroups(THREE, g, T, [
      [AN.AXF, AN.R, function (W) { tyrePair(W, PAINTS.rocp.base, 0.80, AN.R, 0.22, false); hubNuts(W, 0.80, AN.R, 0.22, false); }],
      [AN.AXR, AN.R, function (W) { tyrePair(W, PAINTS.rocp.base, 0.72, AN.R, 0.21, true); hubNuts(W, 0.72, AN.R, 0.21, true); }]]);
    /* "turret": the square base housing on the box roof, the upright head, the drum of the elevation
       trunnion across its front, the angled sensor box on top (A1-A4) */
    var tg = group(THREE, "turret", AN.TX, 0, AN.BZ1), TB = bins(T);
    cylZ(TB.dark, 0, 0, 0, 0.05, 0.42, 20);
    box(TB.paint, -0.50, 0.50, -0.45, 0.45, 0.05, 0.70);
    for (s = -1; s <= 1; s += 2) box(TB.dark, -0.22, 0.22, s > 0 ? 0.45 : -0.455, s > 0 ? 0.455 : -0.45, 0.22, 0.24);   /* hatch panel seams */
    for (s = -1; s <= 1; s += 2) box(TB.dark, -0.22, 0.22, s > 0 ? 0.45 : -0.455, s > 0 ? 0.455 : -0.45, 0.52, 0.54);
    box(TB.paint, -0.38, 0.30, -0.27, 0.27, 0.70, 1.50);
    cylY(TB.paint, 0.18, -0.30, 0.30, AN.PZ, 0.20, 18);
    boxP(TB.paint, [0.02, 0, 1.64], 0.30, 0.30, 0.22, 0.13);
    box(TB.dark, 0.30, 0.34, -0.15, 0.15, 1.58, 1.74);
    box(TB.team, -0.48, -0.40, -0.25, 0.25, 0.70, 0.712);
    antelopeTurretDetail(TB);
    flush(THREE, tg, TB);
    /* "podelev": the arms from the drum, a launch rail over each round, the four rounds */
    T.msl = paintMat(THREE, "msl");
    T.nose = new THREE.MeshStandardMaterial({ color: 0x8a8c84, roughness: 0.5, metalness: 0.3 });
    var pe = group(THREE, "podelev", 0.18, 0, AN.PZ), MB = { msl: new Bin(T.msl, true), nose: new Bin(T.nose, false), frame: new Bin(T.paint, true), dark: new Bin(T.dark, false) }, cells = [];
    for (s = -1; s <= 1; s += 2) {
      box(MB.frame, -0.12, 0.12, s > 0 ? 0.30 : -0.50, s > 0 ? 0.50 : -0.30, -0.06, 0.06);
      box(MB.frame, -0.16, 0.16, s > 0 ? 0.46 : -0.50, s > 0 ? 0.50 : -0.46, AN.MZL + 0.08, AN.MZU + 0.10);
      [AN.MZU, AN.MZL].forEach(function (z) {
        box(MB.dark, -0.95, 0.85, s * AN.MY - 0.03, s * AN.MY + 0.03, z + 0.064, z + 0.10);
        box(MB.frame, -0.16, 0.16, s > 0 ? 0.46 : s * AN.MY - 0.03, s > 0 ? s * AN.MY + 0.03 : -0.46, z + 0.064, z + 0.11);
        tc1(MB, 0.05, s * AN.MY, z);
        cells.push([0.05 + AN.ML / 2, s * AN.MY, z, 0.05 - AN.ML / 2]);
      });
    }
    flush(THREE, pe, MB);
    pe.userData.el = AN.EL; pe.userData.cells = cells;
    tg.add(pe);
    g.add(tg);
    return shadows(g);
  }

  /* ============================================== M1167 HMMWV with the M41A7 ITAS (atgmv_r) [I1] */
  /* HeroHumvee.make("e00") - the M1151 armoured body, which the M1167 shares (the ECV chassis; I1
     shows the same armoured doors, glass, louvred panel and slant-back) - is called as it is; its
     turret group (the GPK shield and the M2, at the module's ring station) has its meshes replaced
     by the ITAS turret I1 shows, and its skin gets this file's plain ROC green.  ITAS stations off I1
     (139 px a metre on the 3.30 m wheelbase), relative to the ring and the roof: the shield tub -0.48
     to +0.48 long, 1.20 wide, 0.38 high; the launch tube -0.46 to +1.04, axis 0.50 up, the rear
     0.62 m fat (0.25) and the front thin (0.16); the sight (TAS) -0.32 to +0.25, 0.58 to 0.92. */
  function m1167(THREE, M, C) {
    var g = HeroHumvee.make("e00")(THREE, M, C), tg = null, i, P = null, D = null, Gl = null;
    g.traverse(function (o) { if (!tg && o.name === "turret") tg = o; });
    reskinWorld(THREE, g, "rocp", 4.6);
    g.name = "atgmv_r";
    if (!tg) return g;
    for (i = tg.children.length - 1; i >= 0; i--) {
      var m = tg.children[i];
      if (!m.isMesh) continue;
      if (m.material.userData && m.material.userData.worldUV && !P) P = m.material;
      else if (m.material.metalness > 0.3 && !Gl) Gl = m.material;
      else if (!m.material.map && !D && m.material.color && m.material.color.r < 0.2) D = m.material;
      tg.remove(m);
    }
    var T = { paint: P || paintMat(THREE, "rocp"), dark: D || new THREE.MeshStandardMaterial({ color: 0x24261f, roughness: 0.78, metalness: 0.22 }),
              glass: Gl || new THREE.MeshStandardMaterial({ color: 0x1b2a30, roughness: 0.12, metalness: 0.35 }),
              team: new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.55, metalness: 0.18 }) };
    var B = { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false) }, s;
    /* the shield tub: front plate with the slight chamfer at its top, side plates, the low rear wall */
    box(B.paint, 0.42, 0.48, -0.60, 0.60, 0.04, 0.34);
    boxP(B.paint, [0.44, 0, 0.37], 0.35, 0.05, 0.60, 0.035);
    for (s = -1; s <= 1; s += 2) box(B.paint, -0.48, 0.42, s > 0 ? 0.56 : -0.60, s > 0 ? 0.60 : -0.56, 0.04, 0.38);
    box(B.paint, -0.48, -0.44, -0.56, 0.56, 0.04, 0.22);
    box(B.paint, -0.48, 0.48, -0.60, 0.60, 0.00, 0.06);
    box(B.glass, 0.483, 0.49, 0.12, 0.40, 0.24, 0.32);
    /* the ITAS on its traversing unit: the post, the tube (fat rear, thin front), the TAS box with its
       lens, the battery box under it (I1) */
    cylZ(B.dark, 0.08, 0, 0.06, 0.46, 0.05, 10);
    box(B.dark, -0.02, 0.18, -0.10, 0.10, 0.40, 0.50);
    cylX(B.paint, -0.46, 0.16, 0.18, 0.50, 0.125, 0.125, 16);
    cylX(B.paint, 0.16, 1.04, 0.18, 0.50, 0.08, 0.08, 14);
    cylX(B.dark, 1.02, 1.045, 0.18, 0.50, 0.06, 0.06, 10);
    box(B.paint, -0.32, 0.25, -0.13, 0.15, 0.58, 0.92);
    cylX(B.glass, 0.25, 0.30, -0.02, 0.80, 0.07, 0.07, 12);
    box(B.dark, -0.20, 0.10, -0.08, 0.08, 0.92, 0.97);
    box(B.dark, -0.30, -0.05, -0.14, 0.14, 0.46, 0.58);
    box(B.team, -0.40, 0.00, -0.60, -0.56, 0.38, 0.39);
    /* DETAIL PASS (I1): the tube's clamp bands and its rear cap, the TAS's carrying handles and lens
       hood, bolt heads along the shield's plates, the grab handles on the rear wall.  NOT CONFIRMED
       sizes (proportions of I1). */
    [-0.30, 0.05].forEach(function (x) { cylX(B.dark, x, x + 0.04, 0.18, 0.50, 0.132, 0.132, 16); });
    [0.55, 0.90].forEach(function (x) { cylX(B.dark, x, x + 0.03, 0.18, 0.50, 0.087, 0.087, 14); });
    cylX(B.dark, -0.49, -0.46, 0.18, 0.50, 0.11, 0.11, 14);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -0.20, 0.12, s > 0 ? 0.15 : -0.17, s > 0 ? 0.17 : -0.15, 0.93, 0.95);
      box(B.dark, -0.20, -0.18, s > 0 ? 0.15 : -0.17, s > 0 ? 0.17 : -0.15, 0.88, 0.95);
      box(B.dark, 0.10, 0.12, s > 0 ? 0.15 : -0.17, s > 0 ? 0.17 : -0.15, 0.88, 0.95);
      for (i = 0; i < 7; i++) box(B.dark, -0.40 + i * 0.13, -0.38 + i * 0.13, s > 0 ? 0.60 : -0.61, s > 0 ? 0.61 : -0.60, 0.30, 0.32);
    }
    box(B.dark, 0.25, 0.33, -0.10, 0.06, 0.88, 0.90);
    for (i = 0; i < 9; i++) box(B.dark, 0.48, 0.49, -0.52 + i * 0.13 - 0.01, -0.52 + i * 0.13 + 0.01, 0.30, 0.32);
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, -0.52, -0.48, s * 0.30 - 0.012, s * 0.30 + 0.012, 0.12, 0.16);
      box(B.dark, -0.52, -0.48, s * 0.30 - 0.012, s * 0.30 + 0.012, 0.04, 0.08);
      box(B.dark, -0.53, -0.51, s * 0.30 - 0.012, s * 0.30 + 0.012, 0.04, 0.16);
    }
    flush(THREE, tg, B);
    return g;
  }
  /* the module's skin is mapped by world position (userData.worldUV = 4.6 m to the canvas): a fresh
     material of this file's canvas for the same tile, so the US rows the module draws do not change */
  function reskinWorld(THREE, g, kind, tile) {
    var seen = [];
    g.traverse(function (o) {
      if (!o.isMesh) return;
      var m = o.material;
      if (!m || seen.indexOf(m) >= 0 || !m.map || !(m.userData && m.userData.worldUV)) return;
      seen.push(m);
      var t = tex(THREE, kind, tile);
      if (t) { m.map = t; m.color.setRGB(1, 1, 1); } else { m.map = null; m.color.set(PAINTS[kind].base); }
      m.needsUpdate = true;
    });
  }

  /* ======================================================== ROC LCU 1610 class (lst_r) [L1] */
  /* en.wikipedia "List of Republic of China Navy ships": the ROC Navy's landing craft utility are
     twelve of the 1610 class (built 1979 and 2011) and one of the 501 class; L1 is the 1610-class
     He Chao II.  js/hero/us_lcu1610.js draws the class at its real size: called as it is. */
  function lcu(THREE, M, C) { var g = HeroLCU1610.build(THREE, M, C); g.name = "lst_r"; return g; }

  return { antelope: antelope, m1167: m1167, lcu: lcu };
})();

/* ------------------------------------------------------------------ registration
   len is the measured X extent of each build (tools/model3d/dump.js). */
UNIT_MODELS["roc_e00_spaag"] = { len: 5.44, build: function (THREE, M, C) { return HeroRocRetry.antelope(THREE, M, C, "old"); } };
UNIT_MODELS["spaag_r"] = { len: 5.44, build: function (THREE, M, C) { return HeroRocRetry.antelope(THREE, M, C, "new"); } };
if (typeof HeroHumvee !== "undefined") UNIT_MODELS["atgmv_r"] = { len: 4.98, build: HeroRocRetry.m1167 };
if (typeof HeroLCU1610 !== "undefined") UNIT_MODELS["lst_r"] = { len: 41.1, build: HeroRocRetry.lcu };
