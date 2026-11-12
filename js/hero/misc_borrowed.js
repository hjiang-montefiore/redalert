/* ========== misc_borrowed.js - HERO models for rows that drew another army's or another role's model ==========
   Every row here had no model of its own and was drawn as the first model render3d.js modelKeyFor found
   (an American Stryker ATGM, the MH-60R, the Mk VI patrol boat, the DF-16 TEL, the S-75, the HQ-9, ...).
   Each now has its own.  Rows, what draws them, reused or new:
     pla_e00_df21d          DF-21D on its 10-wheel TEL                     NEW   buildTel("df21d")
     pla_e00_df26           DF-26 on its 12-wheel TEL                      NEW   buildTel("df26")
     pla_e90_tankdestroyer  PTZ-89                                         REUSED hull: HeroPlz83.build (js/hero/pla_plz83.js) + NEW turret
     kpa_e60_tankdestroyer  9P133 (Susong-po) on the BRDM-2                REUSED HeroRuBrdm.brdm2 (js/hero/ru_brdm.js) + NEW launcher
     roc_e50_tankdestroyer  M18 Hellcat                                    NEW   buildM18
     roc_e80_aswhelo        Hughes 500MD/ASW Defender, ROC Navy            REUSED HeroKpaAir.md500d (js/hero/kpa_air.js) + NEW ASW fit, repaint
     nato_e60_aswhelo       Sikorsky SH-3 Sea King                         NEW   buildSh3 (see POLICY 5 in its block)
     nato_e60_lamps         Kaman SH-2F Seasprite                          NEW   buildSh2f
     nato_e50_patrol        PC-461 class                                   NEW   buildPc461
     roc_e50_patrol         Qing Jiang class = ex-USN PC-461 (eras.js)     the same builder
     nato_e60_patrol        PCF Mk I Swift boat                            NEW   buildPcf
     nato_e90_patrol        Cyclone class PC                               NEW   buildCyclone
     pla_e50_patrol         Type 6604 = Soviet Project 122bis Kronshtadt   REUSED HeroKronshtadt.build (js/hero/ru_kronshtadt.js), as it comes
     pla_e60_patrol         Type 062 Shanghai II                           NEW   buildShanghai
     pla_e00_patrol         Type 037 Hainan                                NEW   buildHainan (js/hero/pla_houjian.js is the Type 037-II
                                                                                 Houjian missile boat: another hull, not called)
     pla_e80_coastssm       HY-2A on its towed rail launcher               NEW   buildHy2
     pla_e00_coastssm       YJ-62 on the WS2400                            NEW   buildYj62
     nato_e20_coastssm      NMESIS (NSM on the ROGUE-Fires JLTV)           NEW   buildNmesis
   HELD, NOT REGISTERED (the borrowed models stand; the searches at the foot of the file):
     pla_e80_tankdestroyer  Type 63 with the HJ-73: no photograph of the launcher on the vehicle
     pla_e00_tankdestroyer  AFT-9 on the WZ-550: one 3/4 photograph, no published dimension of the 4x4
     pla_e20_coastssm       YJ-12B: no photograph of the shore launcher
     kpa_e00_coastssm       Kumsong-3: no photograph of the launcher

   REFERENCES (cached in scratchpad q_misc_ref; Wikimedia Commons through thumb.php unless marked):
     [HB]   U.S. Marine Corps Intelligence Activity, "North Korea Country Handbook" (1998, public domain;
            Commons "MarinesDPRKCountryHandbook.pdf", as js/hero/kpa_ships2.js uses it), the recognition
            sheets rendered at 600 dpi: A-174 HAINAN PC, A-177 SHANGHAI II PC (profile line drawings with
            LOA / beam / draught), A-201 CSSC-3 SEERSUCKER (the round in two views).
     [DF1]  "Dongfeng-21D.JPG", [DF2] "Dong-Feng 26.JPG" - the 2015 parade, near side-on, same street corner.
     [Y1]   "YJ-62 Anti-ship missiles 20170716.jpg".
     [H1]   "HY-2A Missile 20170919.jpg"; [H2] the PLA Navy Museum's HY-2 launcher (Commons, Chinese title: the Navy
            Museum's "HY-2 ship-to-shore missile launcher"); "Iraqi HY-2 Silkworm missile during Operation Desert Storm.JPEG" (the round).
     [N1]   "Navy-Marine Expeditionary Ship Interdiction System Transported on Okinawa (9764067).jpg";
     [N2]   "12th Marine Littoral Regiment conducts ... Training (9845688).jpg".
     [K1]   "9P133 in Piestany v1.jpg" (the vehicle's own placard); [K2] "Polish 9P133 Malutka-P ... launching
            ... 12 Brygada Zmechanizowana..JPG" (the launcher raised, firing).
     [N]    the ROC Navy 500MD/ASW photograph (Commons, Chinese title; cached by js/hero/roc_air.js).
     [D]    "Westland Sea King drawing.svg" (cached by js/hero/gb_misc2.js); [S3] "SH-3H Sea King HS-2 in
            flight 1987.JPEG".
     [K3]   "Kaman SH-2F Seasprite 3-view line drawing.png" (NAVAIR, dimensioned).
     [PC1]  "PC-546.png"; [PC2] "U.S. Navy submarine chaser PC-612 underway, circa in 1943 (PR09879).jpg".
     [SW1]  "Swift boat PCF-1.jpg".
     [CY1]  "USS Cyclone (PC-1) underway in Chesapeake Bay on 1 August 1993.jpeg"; [CY2] "US Navy
            110929-N-OY799-162 ... USS Whirlwind (PC 11) transits the Arabian Gulf.jpg".
     [M1]   "M18 hellcat side.jpg"; [M2] "M18 Hellcat side.jpeg".
     [T1]   "PTZ-89.jpg"; [T2] "50th anniversary of PRC 3.jpg" (cached by js/hero/pla_plz83.js).
     Published figures: en.wikipedia (raw wikitext) "Type 037 corvette", "PC-461-class submarine chaser",
     "Patrol Craft Fast", "Cyclone-class patrol ship", "DF-21", "DF-26", "YJ-62", "Naval Strike Missile",
     "Joint Light Tactical Vehicle", "M18 Hellcat", "Kaman SH-2 Seasprite", "Type 89 (tank destroyer)",
     "9M14 Malyutka"; ru.wikipedia "HY-2" (the article titled Khaiin-2 in Cyrillic; HY-2: 7.36 m, 0.76 m).  Each block names what it took.

   DRAWN (dump.js L x W x H, tris, draw calls) against the published figures:
     DF-21D TEL      11.65 x 3.58 x 2.73   10.5k  15   round 10.70 m as scaled (published 10.7 x 1.4 m)
     DF-26 TEL       13.13 x 3.58 x 2.93   12.1k  15   no figure published; round 12.44 m as measured
     PTZ-89           7.97 x 3.40 x 4.15   14.0k  12   5.6 x 2.8 x 3.12 published (hull reused, see block)
     9P133            5.75 x 2.37 x 2.59   10.9k  14   BRDM-2 5.75 x 2.37 x 2.31 (+ the launcher raised)
     M18 Hellcat      6.79 x 2.88 x 2.82    9.6k  15   6.65 over the gun, 2.87, 2.57 over the AA gun
     500MD/ASW        9.18 x 8.03 x 2.90    4.7k  15   9.24 with rotors (kpa_air.js's airframe)
     SH-3            22.41 x 18.90 x 5.73   5.6k  12   rotor 62 ft (18.9), fuselage 54 ft 9 in; H 16 ft 10 in (see block)
     SH-2F           15.87 x 13.41 x 5.03   5.4k  13   52.6 ft operating (16.03), rotor 44 ft; 15.1 ft over the tail rotor
     PC-461          52.90 x 7.06 x 16.89  10.4k  10   173 ft 8 in x 23 ft 2 in (52.93 x 7.06)
     PCF Mk I        15.24 x 4.10 x 8.01    4.1k   8   50 ft x 13 ft (3.96; the rubbing strake outside it)
     Cyclone         54.60 x 7.62 x 19.49  10.1k  10   179 ft x 25 ft (54.56 x 7.62)
     Type 6604       52.43 x 6.55 x 21.18  16.0k  12   ru_kronshtadt.js as it comes
     Shanghai II     38.80 x 5.47 x 11.60   9.8k  10   127.3 ft x 17.7 ft (38.80 x 5.40)
     Hainan          58.80 x 7.23 x 18.10  15.3k  11   58.77 x 7.2
     HY-2A launcher   8.28 x 2.69 x 4.32    6.8k  11   round 7.36 x 0.76 (launcher: no figure)
     YJ-62 TEL       11.86 x 3.72 x 3.40   10.4k  13   WS2400 11.44 x 3.05 x 2.97 (the pack laid level over the tail;
                                                        3.72 over the mirrors)
     NMESIS           6.64 x 2.84 x 3.85    4.3k   9   JLTV 6.25 x 2.50 x 2.59 nominal (mast and whips, the canisters' overhang)
     Heights are never fitted: each block says why its height differs.
   PAINT: every build wears a weathered canvas (paintTex: faded patches, panel seams, bolt rows, grime streaks
   down the vertical faces, dust), in plain colours: PLA green, US olive drab, Marine green with grey
   canisters, haze grey and deck grey for the ships, light gull grey for the two Navy helicopters, the ROC
   Navy's blue for the 500MD.  No markings, stars, numbers, pennants or roundels (most references carry
   them; none is drawn).  The team colour as small strips.
   NODES: ships - one "turret" (the forward mount) on the turret:true rows, waterline z = 0; ground
   vehicles - "roadwheel" axle groups, "turret" where the row is turret:true; the launchers - "podelev"
   (render3d poseLauncher: userData.el, userData.cells = [mouth x, y, z, rear x]); the HY-2A also
   "travelpose" / "deploypose" (jacks); helicopters - "rotor" (unrotated, local +Z up the mast, turning
   anti-clockwise from above as US heads do) with "rotordisc", "tailrotor" (local Y the shaft), "gear".
   No row here names a round ("ord"): js/fx3d.js ORD holds only the M26, GMLRS, ATACMS, PrSM and Trident.
   LOAD ORDER: after js/hero/ru_kronshtadt.js, ru_brdm.js, kpa_air.js and pla_plz83.js (the builders are
   looked up when a model is built, so after them in index.html is enough).
   Model space: +X nose / bow, +Y port, +Z up, metres.  ASCII only.  One mesh per material per group.
   ===================================================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMiscBorrowed = (function () {
  "use strict";
  var PI = Math.PI, TAU = PI * 2, D2R = PI / 180;
  var V = null;

  /* ------------------------------------------------------------ geometry kit
     js/hero/pla_ground_modern.js's (itself js/hero/pla_type63_apc.js's), copied: those modules keep their
     kits private.  Bin.k is the planar UV scale (texture tiles per metre) so one canvas serves a 5 m car
     and a 58 m ship. */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function Bin(mat, uv, vc, k) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.C = vc ? [] : null; this.col = [1, 1, 1]; this.k = k || 0.25; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.k;
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
  function solid(bin, Vt, F, Nv, smooth) {
    var vol = 0, i, f, a, b, c, fn, k, q, flip;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(Vt[f[0]], cross(Vt[f[1]], Vt[f[2]])); }
    flip = vol < 0;
    if (smooth) {
      Nv = [];
      for (i = 0; i < Vt.length; i++) Nv.push([0, 0, 0]);
      for (i = 0; i < F.length; i++) {
        f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
        fn = cross(sub(Vt[b], Vt[a]), sub(Vt[c], Vt[a])); q = [a, b, c];
        for (k = 0; k < 3; k++) { Nv[q[k]][0] += fn[0]; Nv[q[k]][1] += fn[1]; Nv[q[k]][2] += fn[2]; }
      }
      for (i = 0; i < Nv.length; i++) Nv[i] = unit(Nv[i]);
    }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = flip ? f[2] : f[1]; c = flip ? f[1] : f[2];
      fn = cross(sub(Vt[b], Vt[a]), sub(Vt[c], Vt[a]));
      if (dot(fn, fn) < 1e-16) continue;
      bin.tri(Vt[a], Vt[b], Vt[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box centred on (x, y, z) of full sizes */
  function boxc(bin, x, y, z, sx, sy, sz) { box(bin, x - sx / 2, x + sx / 2, y - sy / 2, y + sy / 2, z - sz / 2, z + sz / 2); }
  function sideBox(bin, s, y, t, x0, x1, z0, z1) { box(bin, x0, x1, s > 0 ? y : -y - t, s > 0 ? y + t : -y, z0, z1); }
  function slab(bin, c, u, v, w, hu, hv, hw) {
    var P = [], i, s = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    for (i = 0; i < 8; i++) {
      var sx = s[i][0] * hu, sy = s[i][1] * hv, sz = s[i][2] * hw;
      P.push([c[0] + u[0] * sx + v[0] * sy + w[0] * sz, c[1] + u[1] * sx + v[1] * sy + w[1] * sz, c[2] + u[2] * sx + v[2] * sy + w[2] * sz]);
    }
    hexa(bin, P);
  }
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), Vt = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      Vt.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      Vt.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = Vt.length; na = [-ax[0], -ax[1], -ax[2]];
      Vt.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { Vt.push(Vt[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { Vt.push(Vt[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, Vt, F, N);
  }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg || 10); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg || 10); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg || 10); }
  function bar(bin, A, B, r, seg) { cyl(bin, A, B, r, r, seg || 5); }
  function prismY(bin, pts, y0, y1) {
    var Vt = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) Vt.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, Vt, F);
  }
  function prismX(bin, pts, x0, x1) {
    var Vt = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) Vt.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, Vt, F);
  }
  /* a prism with its profile in the XY plane (plan), from z0 to z1 */
  function prismZ(bin, pts, z0, z1) {
    var Vt = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) Vt.push([pts[i][0], pts[i][1], z0], [pts[i][0], pts[i][1], z1]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, Vt, F);
  }
  /* a closed solid lofted through convex rings of [x, y, z] points; ends capped */
  function loftN(bin, L, smooth) {
    var Vt = [], F = [], n = L[0].length, m = L.length, i, k;
    for (k = 0; k < m; k++) for (i = 0; i < n; i++) Vt.push(L[k][i]);
    for (k = 0; k + 1 < m; k++)
      for (i = 0; i < n; i++) {
        var a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + (i + 1) % n, d = (k + 1) * n + i;
        F.push([a, b, c], [a, c, d]);
      }
    for (i = 1; i + 1 < n; i++) { F.push([0, i + 1, i]); F.push([(m - 1) * n, (m - 1) * n + i, (m - 1) * n + i + 1]); }
    solid(bin, Vt, F, null, smooth);
  }
  /* a body of revolution about +X from a profile of [x, r] */
  function lathe(bin, prof, seg, y, z) {
    var Vt = [], F = [], n = prof.length, i, k, a, b, c, d;
    y = y || 0; z = z || 0;
    for (k = 0; k < n; k++) for (i = 0; i < seg; i++) {
      a = i / seg * TAU;
      Vt.push([prof[k][0], y + Math.cos(a) * prof[k][1], z + Math.sin(a) * prof[k][1]]);
    }
    for (k = 0; k + 1 < n; k++) for (i = 0; i < seg; i++) {
      a = k * seg + i; b = k * seg + (i + 1) % seg; c = (k + 1) * seg + (i + 1) % seg; d = (k + 1) * seg + i;
      F.push([a, b, c], [a, c, d]);
    }
    for (i = 1; i + 1 < seg; i++) { F.push([0, i + 1, i]); F.push([(n - 1) * seg, (n - 1) * seg + i, (n - 1) * seg + i + 1]); }
    solid(bin, Vt, F, null, true);
  }
  /* a superelliptic section ring at station x: centre (yc, zc), half width w, half heights up / down, exponent e */
  function sring(x, yc, zc, w, hu, hd, e, n) {
    var P = [], i, a, c, s;
    for (i = 0; i < n; i++) {
      a = i / n * TAU; c = Math.cos(a); s = Math.sin(a);
      P.push([x, yc + w * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), e), zc + (s < 0 ? hd : hu) * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), e)]);
    }
    return P;
  }
  /* a body lofted through superelliptic sections [x, zc, w, hu, hd, e] (yc 0) */
  function body(bin, S, n, smooth) {
    loftN(bin, S.map(function (s) { return sring(s[0], s[6] || 0, s[1], Math.max(s[2], 0.004), Math.max(s[3], 0.004), Math.max(s[4], 0.004), s[5], n); }), smooth !== false);
  }
  /* a thin flat plate from a convex outline in the XZ plane at y, thickness t (fins, fins of missiles) */
  function finY(bin, pts, y, t) { prismY(bin, pts, y - t / 2, y + t / 2); }
  function finZ(bin, pts, z, t) { prismZ(bin, pts, z - t / 2, z + t / 2); }

  /* ------------------------------------------------------------ paint: weathered canvas
     One 512 px canvas per palette: the base colour, broad faded blots, panel seams and rivet rows,
     streaked grime that runs down the vertical faces (planar UVs put z on the canvas's v), edge wear
     and dust (rule 10; the canvases of js/hero/ru_riga.js and js/hero/pla_ground_modern.js). */
  var TEX = {};
  function rng(seed) { var s = (seed >>> 0) || 7; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function paintTex(THREE, P) {
    if (TEX[P.key] !== undefined) return TEX[P.key];
    TEX[P.key] = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(P.seed), i, x, y, w, h;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      for (i = 0; i < 28; i++) {                                    /* faded and darkened patches */
        q.globalAlpha = 0.10 + R() * 0.18; q.fillStyle = (i % 2) ? P.light : P.dark;
        q.fillRect(R() * S, R() * S, 40 + R() * 150, 30 + R() * 110);
      }
      q.globalAlpha = 1;
      q.strokeStyle = "rgba(10,10,8,0.30)"; q.lineWidth = 1.4;          /* panel seams */
      for (i = 0; i < (P.ship ? 7 : 5); i++) {
        y = Math.floor((i + 0.5) * S / (P.ship ? 7 : 5) + (R() - 0.5) * 20);
        q.beginPath(); q.moveTo(0, y); q.lineTo(S, y); q.stroke();
      }
      for (i = 0; i < 9; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); h = 60 + R() * 180;
        q.beginPath(); q.moveTo(x, y); q.lineTo(x, y + h); q.stroke();
      }
      q.fillStyle = "rgba(15,15,12,0.30)";                              /* rivet / bolt rows */
      for (i = 0; i < 6; i++) {
        y = Math.floor(R() * S); x = Math.floor(R() * S * 0.6);
        for (w = 0; w < 18; w++) q.fillRect(x + w * 9, y, 2, 2);
      }
      for (i = 0; i < (P.ship ? 70 : 45); i++) {                        /* grime / rust streaks running down */
        x = R() * S; y = R() * S; h = 20 + R() * (P.ship ? 120 : 70);
        var gr = q.createLinearGradient(0, y, 0, y + h);
        gr.addColorStop(0, P.streak || "rgba(30,26,18,0.22)"); gr.addColorStop(1, "rgba(30,26,18,0)");
        q.fillStyle = gr; q.fillRect(x, y, 1 + R() * 3, h);
      }
      for (i = 0; i < 160; i++) {                                       /* dust and chipped edges */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.08)" : "rgba(235,230,205,0.07)";
        q.fillRect(R() * S, R() * S, 2 + R() * 22, 1 + R() * 12);
      }
      var t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
      TEX[P.key] = t;
    } catch (e) { TEX[P.key] = null; }
    return TEX[P.key];
  }
  /* palettes (each sampled or taken as the reference shows; see each block) */
  var PAL = {
    pla:   { key: "mb_pla", base: "#525c3a", dark: "#454e30", light: "#646e4a", seed: 101 },
    kpa:   { key: "mb_kpa", base: "#4e5838", dark: "#41492e", light: "#5f6948", seed: 102 },
    od:    { key: "mb_od", base: "#4b5034", dark: "#3e422b", light: "#5b6042", seed: 103 },
    usmc:  { key: "mb_usmc", base: "#4a5236", dark: "#3d4430", light: "#5a6244", seed: 104 },
    can:   { key: "mb_can", base: "#8e9294", dark: "#7c8082", light: "#a0a4a6", seed: 105 },
    navy:  { key: "mb_navy", base: "#7f868a", dark: "#6c7276", light: "#9198a0", seed: 106, ship: true, streak: "rgba(90,60,35,0.22)" },
    plan:  { key: "mb_plan", base: "#8a9096", dark: "#767c82", light: "#9ca2a8", seed: 107, ship: true, streak: "rgba(90,60,35,0.22)" },
    usn42: { key: "mb_usn42", base: "#646c72", dark: "#545b60", light: "#767e84", seed: 108, ship: true, streak: "rgba(80,55,35,0.24)" },
    blue:  { key: "mb_blue", base: "#34507a", dark: "#2a4266", light: "#3f5d88", seed: 109 },
    gull:  { key: "mb_gull", base: "#9fa3a6", dark: "#8b8f92", light: "#b1b5b8", seed: 110 },
    sh2:   { key: "mb_sh2", base: "#868c90", dark: "#74797d", light: "#989ea2", seed: 111 }
  };
  function mats(THREE, C, P, extra) {
    var T = {}, tx = paintTex(THREE, P), tc = (C && C.team !== undefined) ? C.team : 0x3f7fd0;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.metal = new THREE.MeshStandardMaterial({ color: 0x5c6264, roughness: 0.5, metalness: 0.55 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1e2a30, roughness: 0.12, metalness: 0.45 });
    T.lamp = new THREE.MeshStandardMaterial({ color: 0xd8d2b0, roughness: 0.3, metalness: 0.2, emissive: 0x302c1c });
    T.red = new THREE.MeshStandardMaterial({ color: 0x9a3a30, roughness: 0.6, metalness: 0.05 });
    T.rubber = new THREE.MeshStandardMaterial({ color: 0x18191a, roughness: 0.95, metalness: 0.0 });
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    T.team = new THREE.MeshStandardMaterial({ color: tc, roughness: 0.6, metalness: 0.1, emissive: tc, emissiveIntensity: 0.10 });
    if (extra) for (var k in extra) T[k] = extra[k](THREE);
    return T;
  }
  function bins(T, k) {
    var B = {}, n;
    for (n in T) B[n] = new Bin(T[n], n === "paint" || n === "deck" || n === "skin2", n === "wheel", k);
    return B;
  }
  function flush(THREE, group, B) {
    var n, b, geo;
    for (n in B) {
      b = B[n];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      var m = new THREE.Mesh(geo, b.mat); m.name = n;
      group.add(m);
    }
  }
  function grp(THREE, parent, name, x, y, z) {
    var g = new THREE.Group(); if (name) g.name = name; g.position.set(x || 0, y || 0, z || 0); parent.add(g); return g;
  }

  /* ------------------------------------------------------------ fittings shared by every build */
  function triOut(bin, a, b, c, hint) {
    var n = cross(sub(b, a), sub(c, a));
    if (dot(n, n) < 1e-14) return;
    if (dot(n, hint) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
  function quadOut(bin, a, b, c, d, hint) { triOut(bin, a, b, c, hint); triOut(bin, a, c, d, hint); }
  /* a polyline of guard rail: posts every `step` metres, two wires (rule 10) */
  function rail(bin, pts, h, step) {
    var i, k, n, L, ax, p, q;
    step = step || 1.5;
    for (i = 0; i + 1 < pts.length; i++) {
      p = pts[i]; q = pts[i + 1];
      L = Math.sqrt(Math.pow(q[0] - p[0], 2) + Math.pow(q[1] - p[1], 2) + Math.pow(q[2] - p[2], 2));
      n = Math.max(1, Math.round(L / step));
      for (k = (i === 0 ? 0 : 1); k <= n; k++) {
        ax = [p[0] + (q[0] - p[0]) * k / n, p[1] + (q[1] - p[1]) * k / n, p[2] + (q[2] - p[2]) * k / n];
        box(bin, ax[0] - 0.025, ax[0] + 0.025, ax[1] - 0.025, ax[1] + 0.025, ax[2], ax[2] + h);
      }
      bar(bin, [p[0], p[1], p[2] + h], [q[0], q[1], q[2] + h], 0.018, 4);
      bar(bin, [p[0], p[1], p[2] + h * 0.5], [q[0], q[1], q[2] + h * 0.5], 0.014, 4);
    }
  }
  function bollard(bin, x, y, z) {
    box(bin, x - 0.28, x + 0.28, y - 0.12, y + 0.12, z, z + 0.05);
    cylZ(bin, x - 0.15, y, z, z + 0.32, 0.075, 8); cylZ(bin, x + 0.15, y, z, z + 0.32, 0.075, 8);
    cylZ(bin, x - 0.15, y, z + 0.32, z + 0.35, 0.10, 8); cylZ(bin, x + 0.15, y, z + 0.32, z + 0.35, 0.10, 8);
  }
  function fairlead(bin, x, y, z) { box(bin, x - 0.22, x + 0.22, y - 0.08, y + 0.08, z, z + 0.20); cylY(bin, x, y - 0.09, y + 0.09, z + 0.20, 0.07, 8); }
  function mushroomVent(bin, x, y, z, r) { cylZ(bin, x, y, z, z + 0.55, r * 0.6, 10); cylZ(bin, x, y, z + 0.55, z + 0.68, r, 12); }
  function gooseneck(bin, x, y, z, r, dir) {
    cylZ(bin, x, y, z, z + 0.6, r, 8);
    bar(bin, [x, y, z + 0.6], [x + dir * 0.25, y, z + 0.72], r, 8);
    bar(bin, [x + dir * 0.25, y, z + 0.72], [x + dir * 0.35, y, z + 0.55], r, 8);
  }
  function hatch(bin, x, y, z, sx, sy) { box(bin, x - sx / 2, x + sx / 2, y - sy / 2, y + sy / 2, z, z + 0.14); box(bin, x - sx / 2 + 0.06, x + sx / 2 - 0.06, y - sy / 2 + 0.06, y + sy / 2 - 0.06, z + 0.14, z + 0.18); }
  /* an inflatable life-raft canister on its cradle */
  function raft(binP, binD, x, y, z, along) {
    var L = 1.25, r = 0.30;
    if (along) {
      box(binD, x - 0.45, x + 0.45, y - 0.32, y + 0.32, z, z + 0.10);
      cyl(binP, [x - L / 2, y, z + 0.10 + r], [x + L / 2, y, z + 0.10 + r], r, r, 12);
      for (var k = -1; k <= 1; k += 2) cyl(binD, [x + k * 0.3, y, z + 0.10 + r], [x + k * 0.3 + 0.04, y, z + 0.10 + r], r + 0.02, r + 0.02, 12);
    } else {
      box(binD, x - 0.32, x + 0.32, y - 0.45, y + 0.45, z, z + 0.10);
      cyl(binP, [x, y - L / 2, z + 0.10 + r], [x, y + L / 2, z + 0.10 + r], r, r, 12);
      for (var j = -1; j <= 1; j += 2) cyl(binD, [x, y + j * 0.3, z + 0.10 + r], [x, y + j * 0.3 + 0.04, z + 0.10 + r], r + 0.02, r + 0.02, 12);
    }
  }
  /* a vertical ladder against a face at y (rungs along x) */
  function ladderX(bin, x, y, z0, z1) {
    bar(bin, [x - 0.22, y, z0], [x - 0.22, y, z1], 0.02, 4); bar(bin, [x + 0.22, y, z0], [x + 0.22, y, z1], 0.02, 4);
    for (var z = z0 + 0.25; z < z1; z += 0.3) bar(bin, [x - 0.22, y, z], [x + 0.22, y, z], 0.015, 4);
  }
  function ladderY(bin, x, y, z0, z1) {
    bar(bin, [x, y - 0.22, z0], [x, y - 0.22, z1], 0.02, 4); bar(bin, [x, y + 0.22, z0], [x, y + 0.22, z1], 0.02, 4);
    for (var z = z0 + 0.25; z < z1; z += 0.3) bar(bin, [x, y - 0.22, z], [x, y + 0.22, z], 0.015, 4);
  }
  /* a whip aerial on a base */
  function whip(bin, x, y, z, h) { cylZ(bin, x, y, z, z + 0.12, 0.05, 6); cyl(bin, [x, y, z + 0.12], [x, y, z + h], 0.012, 0.006, 4); }
  /* a vehicle headlamp in its guard, facing +x (dir 1) or -x (dir -1) */
  function headlamp(BL, BD, x, y, z, r, dir) {
    cyl(BD, [x - dir * 0.10, y, z], [x, y, z], r * 1.1, r * 1.2, 10);
    cyl(BL, [x, y, z], [x + dir * 0.015, y, z], r, r, 10);
    bar(BD, [x - dir * 0.05, y - r * 1.4, z - r * 1.3], [x + dir * 0.05, y - r * 1.4, z + r * 1.3], 0.012, 4);
    bar(BD, [x - dir * 0.05, y + r * 1.4, z - r * 1.3], [x + dir * 0.05, y + r * 1.4, z + r * 1.3], 0.012, 4);
    bar(BD, [x + dir * 0.05, y - r * 1.4, z + r * 1.3], [x + dir * 0.05, y + r * 1.4, z + r * 1.3], 0.012, 4);
  }
  function towHook(bin, x, y, z, dir) { box(bin, x - 0.06, x + 0.06, y - 0.08, y + 0.08, z - 0.06, z + 0.06); cyl(bin, [x + dir * 0.04, y, z - 0.07], [x + dir * 0.04, y, z + 0.07], 0.06, 0.06, 8); }
  /* a shovel and a pick stowed flat on a face at y (s side), along x */
  function tools(bin, s, y, x0, z) {
    var yy = s * y;
    bar(bin, [x0, yy, z], [x0 + 1.0, yy, z], 0.018, 5); box(bin, x0 + 1.0, x0 + 1.25, yy - 0.02 * s, yy + 0.02 * s, z - 0.10, z + 0.10);
    bar(bin, [x0 + 0.1, yy, z + 0.16], [x0 + 0.95, yy, z + 0.16], 0.018, 5); box(bin, x0 + 0.05, x0 + 0.12, yy - 0.02 * s, yy + 0.02 * s, z + 0.05, z + 0.30);
    box(bin, x0 + 0.2, x0 + 0.26, yy - 0.03 * s, yy + 0.03 * s, z - 0.03, z + 0.22); box(bin, x0 + 0.75, x0 + 0.81, yy - 0.03 * s, yy + 0.03 * s, z - 0.03, z + 0.22);
  }
  function jerrycan(bin, x, y, z) { box(bin, x - 0.08, x + 0.08, y - 0.18, y + 0.18, z, z + 0.46); box(bin, x - 0.03, x + 0.03, y - 0.10, y + 0.10, z + 0.46, z + 0.50); }
  function grab(bin, x0, x1, y, z, up) { bar(bin, [x0, y, z], [x0, y, z + up], 0.015, 4); bar(bin, [x1, y, z], [x1, y, z + up], 0.015, 4); bar(bin, [x0, y, z + up], [x1, y, z + up], 0.015, 4); }

  /* ------------------------------------------------------------ truck tyres (js/hero/pla_ground_modern.js)
     lugged tyre, dished painted wheel, the hub on the outer face; one "roadwheel" group per axle */
  function rgb(h, k) { return [parseInt(h.substr(1, 2), 16) / 255 * k, parseInt(h.substr(3, 2), 16) / 255 * k, parseInt(h.substr(5, 2), 16) / 255 * k]; }
  var TYRE = [0.11, 0.115, 0.12];
  function tyre(W, yc, s, R, H, base) {
    var N = 16, kr = R / 0.75, kh = H / 0.30;
    var P = [[-0.30, 0.47, 0, 0], [-0.30, 0.64, 0, 0], [-0.25, 0.73, 1, 0], [-0.10, 0.75, 1, 0], [-0.02, 0.75, 1, 1],
             [0.02, 0.75, 1, 0], [0.10, 0.75, 1, 1], [0.25, 0.73, 1, 1], [0.30, 0.64, 0, 0], [0.30, 0.47, 0, 0]];
    var Vt = [], F = [], i, j, k, r, a, m = P.length, RIM = rgb(base, 1.05), HUB = rgb(base, 1.2);
    for (i = 0; i < m; i++) for (j = 0; j < N; j++) {
      r = P[i][1] * kr;
      if (P[i][2] && ((j + P[i][3]) % 2)) r -= 0.04 * kr;
      a = j / N * TAU;
      Vt.push([r * Math.cos(a), yc + P[i][0] * kh, r * Math.sin(a)]);
    }
    for (i = 0; i < m - 1; i++) for (j = 0; j < N; j++) {
      k = (j + 1) % N;
      F.push([i * N + j, i * N + k, (i + 1) * N + k], [i * N + j, (i + 1) * N + k, (i + 1) * N + j]);
    }
    Vt.push([0, yc + P[0][0] * kh, 0], [0, yc + P[m - 1][0] * kh, 0]);
    for (j = 0; j < N; j++) { k = (j + 1) % N; F.push([m * N, k, j], [m * N + 1, (m - 1) * N + j, (m - 1) * N + k]); }
    W.col = TYRE;
    solid(W, Vt, F, null, true);
    W.col = RIM;
    cyl(W, [0, yc + s * 0.29 * kh, 0], [0, yc + s * 0.33 * kh, 0], 0.46 * kr, 0.40 * kr, 16, false);
    W.col = HUB;
    cylY(W, 0, yc + s * 0.33 * kh, yc + s * 0.40 * kh, 0, 0.17 * kr, 10);
    W.col = [0.12, 0.12, 0.12];
    for (i = 0; i < 8; i++) { a = i / 8 * TAU; cylY(W, Math.cos(a) * 0.27 * kr, yc + s * 0.33 * kh, yc + s * 0.36 * kh, Math.sin(a) * 0.27 * kr, 0.025 * kr, 5); }
  }
  function addAxles(THREE, g, T, AX, R, H, TY, base, dual) {
    var i, wg, W;
    for (i = 0; i < AX.length; i++) {
      W = new Bin(T.wheel, false, true);
      tyre(W, TY, 1, R, H, base);
      tyre(W, -TY, -1, R, H, base);
      if (dual && dual[i]) { tyre(W, TY - 2.1 * H, 1, R, H, base); tyre(W, -TY + 2.1 * H, -1, R, H, base); }
      W.col = [0.14, 0.15, 0.16];
      cylY(W, 0, -(TY - 0.25), TY - 0.25, 0, 0.09, 8);
      box(W, -0.18, 0.18, -0.26, 0.26, -0.16, 0.16);
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(AX[i], 0, R);
      flush(THREE, wg, { wheel: W });
      g.add(wg);
    }
  }
  /* a mudguard arch over a tyre: a thin curved plate from angle a0 to a1 (0 = forward), at side s */
  function mudguard(bin, x, s, y0, y1, zc, r, a0, a1) {
    var n = 6, i, A, B2;
    for (i = 0; i < n; i++) {
      A = a0 + (a1 - a0) * i / n; B2 = a0 + (a1 - a0) * (i + 1) / n;
      var p0 = [x + Math.cos(A) * r, zc + Math.sin(A) * r], p1 = [x + Math.cos(B2) * r, zc + Math.sin(B2) * r];
      prismY(bin, [[p0[0], p0[1]], [p1[0], p1[1]], [p1[0] + Math.cos(B2) * 0.02, p1[1] + Math.sin(B2) * 0.02], [p0[0] + Math.cos(A) * 0.02, p0[1] + Math.sin(A) * 0.02]], s * y0, s * y1);
    }
  }

  /* ------------------------------------------------------------ ship hull
     A station table H.sta of rows [x, deck z, half beam at the deck, half beam at the waterline, keel z,
     bilge exponent]; between waterline and deck the side flares out (exponent 1.4), below it a
     super-ellipse bilge (js/hero/ru_riga.js's W(x, z)).  Rings at every row; the band under BOOT goes in the
     boot-topping bin; the deck is laid in its own bin; the transom is capped.  WATERLINE z = 0. */
  function hpick(sta, x, k) {
    var i;
    if (x <= sta[0][0]) return sta[0][k];
    for (i = 1; i < sta.length; i++) if (x <= sta[i][0]) {
      var a = sta[i - 1], b = sta[i], f = (x - a[0]) / (b[0] - a[0]);
      return a[k] + (b[k] - a[k]) * f;
    }
    return sta[sta.length - 1][k];
  }
  function hullW(sta, x, z) {
    var zd = hpick(sta, x, 1), bd = hpick(sta, x, 2), bw = hpick(sta, x, 3), zb = hpick(sta, x, 4), n = hpick(sta, x, 5);
    if (z >= zd) return bd;
    if (z <= zb) return 0;
    if (z >= 0 || zb >= 0) {
      var z0 = Math.max(0, zb), f = (z - z0) / Math.max(0.01, zd - z0);
      if (zb >= 0) return bd * Math.pow(Math.max(0, f), 0.55);
      return bw + (bd - bw) * Math.pow(f, 1.4);
    }
    var t = Math.min(1, z / zb);
    return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
  }
  function shipHull(B, sta, BOOT) {
    var rings = [], i, j, s, zs, k;
    for (i = 0; i < sta.length; i++) {
      var x = sta[i][0], zd = sta[i][1], zb = sta[i][4], r = [];
      zs = [zb, zb * 0.8, zb * 0.55, zb * 0.3, zb * 0.1, 0, BOOT, BOOT + (zd - BOOT) * 0.35, BOOT + (zd - BOOT) * 0.7, zd];
      for (j = 0; j < zs.length; j++) {
        var z = Math.min(zd, Math.max(zb, zs[j]));
        if (zb >= 0 && zs[j] < zb) z = zb;
        r.push([x, hullW(sta, x, z + 1e-6), z]);
      }
      rings.push(r);
    }
    for (i = 0; i + 1 < rings.length; i++) {
      var A = rings[i], Bq = rings[i + 1];
      for (j = 0; j + 1 < A.length; j++) for (s = -1; s <= 1; s += 2) {
        var a0 = [A[j][0], s * A[j][1], A[j][2]], a1 = [A[j + 1][0], s * A[j + 1][1], A[j + 1][2]];
        var b0 = [Bq[j][0], s * Bq[j][1], Bq[j][2]], b1 = [Bq[j + 1][0], s * Bq[j + 1][1], Bq[j + 1][2]];
        var zm = (a0[2] + a1[2] + b0[2] + b1[2]) / 4, bin = zm < BOOT - 0.01 ? B.boot : B.paint;
        quadOut(bin, a0, b0, b1, a1, [0, s, zm < 0 ? -0.6 : 0.1]);
      }
      /* the deck */
      var d0 = A[A.length - 1], d1 = Bq[Bq.length - 1];
      quadOut(B.deck, [d0[0], -d0[1], d0[2]], [d1[0], -d1[1], d1[2]], [d1[0], d1[1], d1[2]], [d0[0], d0[1], d0[2]], [0, 0, 1]);
    }
    /* the transom (and the stem's last ring if it is not closed) */
    [[rings[0], -1], [rings[rings.length - 1], 1]].forEach(function (q) {
      var R = q[0], c = [R[0][0], 0, (R[0][2] + R[R.length - 1][2]) / 2];
      for (k = 0; k + 1 < R.length; k++) for (s = -1; s <= 1; s += 2) {
        triOut(R[k][2] < BOOT ? B.boot : B.paint, c, [R[k][0], s * R[k][1], R[k][2]], [R[k + 1][0], s * R[k + 1][1], R[k + 1][2]], [q[1], 0, 0]);
      }
      triOut(B.paint, c, [R[R.length - 1][0], R[R.length - 1][1], R[R.length - 1][2]], [R[R.length - 1][0], -R[R.length - 1][1], R[R.length - 1][2]], [q[1], 0, 0]);
    });
  }
  function deckAt(sta, x) { return hpick(sta, x, 1); }
  function beamAt(sta, x) { return hpick(sta, x, 2); }
  /* the deck edge as a polyline from x0 to x1 on side s, `inset` inboard, n points */
  function edgeLine(sta, x0, x1, s, inset, n) {
    var P = [], i, x;
    for (i = 0; i <= n; i++) { x = x0 + (x1 - x0) * i / n; P.push([x, s * Math.max(0.05, beamAt(sta, x) - inset), deckAt(sta, x)]); }
    return P;
  }
  /* scuttles: small dark discs on the hull side at height z */
  function scuttles(bin, sta, xs, z) {
    xs.forEach(function (x) {
      for (var s = -1; s <= 1; s += 2) {
        var y = hullW(sta, x, z) + 0.005;
        cyl(bin, [x, s * y, z], [x, s * (y + 0.02), z], 0.16, 0.16, 8);
      }
    });
  }
  /* an anchor in its hawse on each bow at station x */
  function anchors(BD, BP, sta, x, z) {
    for (var s = -1; s <= 1; s += 2) {
      var y = hullW(sta, x, z);
      cyl(BD, [x, s * (y - 0.05), z], [x, s * (y + 0.04), z], 0.20, 0.24, 10);
      box(BD, x - 0.10, x + 0.10, s > 0 ? y : -y - 0.10, s > 0 ? y + 0.10 : -y, z - 0.75, z - 0.15);
      box(BD, x - 0.35, x + 0.35, s > 0 ? y : -y - 0.10, s > 0 ? y + 0.10 : -y, z - 0.85, z - 0.72);
    }
  }
  /* a lattice of four legs between two square frames (masts) */
  function lattice(bin, x, y, z0, z1, w0, w1, levels) {
    var i, k, h, c = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
    for (k = 0; k < 4; k++) bar(bin, [x + c[k][0] * w0, y + c[k][1] * w0, z0], [x + c[k][0] * w1, y + c[k][1] * w1, z1], 0.035, 5);
    for (i = 0; i <= levels; i++) {
      h = z0 + (z1 - z0) * i / levels; var w = w0 + (w1 - w0) * i / levels;
      for (k = 0; k < 4; k++) bar(bin, [x + c[k][0] * w, y + c[k][1] * w, h], [x + c[(k + 1) % 4][0] * w, y + c[(k + 1) % 4][1] * w, h], 0.02, 4);
      if (i < levels) {
        var h2 = z0 + (z1 - z0) * (i + 1) / levels, w2 = w0 + (w1 - w0) * (i + 1) / levels;
        for (k = 0; k < 4; k++) bar(bin, [x + c[k][0] * w, y + c[k][1] * w, h], [x + c[(k + 1) % 4][0] * w2, y + c[(k + 1) % 4][1] * w2, h2], 0.015, 4);
      }
    }
  }

  /* ====================================================================== REUSED HULLS AND AIRFRAMES */
  function need(name, file) {
    var o = (typeof window !== "undefined" && window[name]) || (typeof globalThis !== "undefined" && globalThis[name]);
    if (!o) { try { o = eval(name); } catch (e) { o = null; } }
    if (!o) throw new Error("misc_borrowed.js: load " + file + " first (" + name + ")");
    return o;
  }
  function dropNamed(root, name) {
    var f = []; root.traverse(function (o) { if (o.name === name) f.push(o); });
    f.forEach(function (o) { o.parent.remove(o); });
    return f.length;
  }
  function count(root) {
    var n = 0; root.traverse(function (o) { if (o.isMesh) n++; }); return n;
  }

  /* ---------------------------------------------------------------------- pla_e50_patrol (Type 6604)
     Project 122bis: js/hero/ru_kronshtadt.js draws it (HeroKronshtadt.build), called as it comes. */
  function buildType6604(THREE, M, C) {
    var g = need("HeroKronshtadt", "js/hero/ru_kronshtadt.js").build(THREE, M, C);
    g.name = "pla_e50_patrol";
    return g;
  }

  /* ---------------------------------------------------------------------- kpa_e60_tankdestroyer (9P133)
     js/hero/ru_brdm.js's BRDM-2 (HeroRuBrdm.brdm2), its BPU-1 turret taken off (the 9P133 has none: [K1],
     [K2]) and the 9P133 launcher added as the "turret": the column out of the roof, the armoured lid, six
     9M14 on their rails under it, raised as [K2] shows it firing.  Measured off [K2] against the BRDM-2's
     1.40 m roof width (ru_brdm.js): the lid 1.46 m long x 1.30 m wide, 0.62 m over the roof, the rounds
     hanging 0.16 m under it, three a side of the column.  9M14: 0.86 m long, 125 mm, 393 mm span
     (en.wikipedia "9M14 Malyutka"). */
  function malyutka(B, x, y, z) {
    var L = 0.86, r = 0.0625;
    lathe(B.paint, [[x - L / 2, 0.001], [x - L / 2, r * 0.9], [x - L / 2 + 0.05, r], [x + L / 2 - 0.20, r], [x + L / 2 - 0.05, r * 0.75], [x + L / 2, 0.02]], 10, y, z);
    for (var k = 0; k < 4; k++) {
      var a = (45 + 90 * k) * D2R, c = Math.cos(a), s = Math.sin(a), rr = 0.393 / 2;
      slab(B.dark, [x - 0.30, y + c * (r + rr) / 2, z + s * (r + rr) / 2], [1, 0, 0], [0, c, s], [0, -s, c], 0.10, (rr - r) / 2, 0.004);
    }
  }
  function build9p133(THREE, M, C) {
    var g = need("HeroRuBrdm", "js/hero/ru_brdm.js").brdm2(THREE, M, C);
    dropNamed(g, "turret");
    var T = mats(THREE, C, PAL.kpa), ZR = 1.92, XC = -0.20, s, k;
    borrowPaint(g, T);
    var HB = bins(T, 0.5), TB = bins(T, 0.5);
    /* the launcher well's hatch frame in the roof, its two doors folded open to the sides [K2] */
    box(HB.dark, XC - 0.78, XC + 0.78, -0.62, 0.62, ZR - 0.01, ZR + 0.02);
    for (s = -1; s <= 1; s += 2) {
      box(HB.paint, XC - 0.76, XC + 0.76, s * 0.66, s * 0.72, ZR, ZR + 0.30);
      cylX(HB.dark, XC - 0.70, XC + 0.70, s * 0.64, ZR + 0.02, 0.025, 6);
    }
    var tg = grp(THREE, g, "turret", XC, 0, ZR);
    /* the column and its turntable */
    cylZ(TB.dark, 0, 0, 0.0, 0.10, 0.32, 16);
    cylZ(TB.metal, 0, 0, 0.10, 0.62, 0.11, 12);
    for (s = -1; s <= 1; s += 2) bar(TB.dark, [0, s * 0.10, 0.10], [0, s * 0.30, 0.58], 0.03, 6);
    /* the armoured lid: a flat plate with its turned-down front edge and the rail beams under it */
    box(TB.paint, -0.73, 0.73, -0.65, 0.65, 0.62, 0.66);
    box(TB.paint, 0.70, 0.76, -0.65, 0.65, 0.54, 0.66);
    box(TB.paint, -0.10, 0.10, -0.58, 0.58, 0.58, 0.62);
    box(TB.team, -0.40, 0.40, -0.12, 0.12, 0.66, 0.672);
    for (k = 0; k < 6; k++) {
      var y = (k < 3 ? 1 : -1) * (0.20 + (k % 3) * 0.20);
      box(TB.dark, -0.42, 0.42, y - 0.02, y + 0.02, 0.50, 0.58);
      malyutka(TB, 0.02, y, 0.41);
    }
    flush(THREE, g, HB);
    flush(THREE, tg, TB);
    g.name = "kpa_e60_tankdestroyer";
    return g;
  }
  /* the painted material of a called builder, so what is added here wears the same paint */
  function borrowPaint(g, T) {
    var f = null;
    g.traverse(function (o) { if (!f && o.isMesh && o.material && o.material.map && !o.material.transparent) f = o.material; });
    if (f) T.paint = f;
  }

  /* ---------------------------------------------------------------------- roc_e80_aswhelo (500MD/ASW)
     js/hero/kpa_air.js's Hughes 500D (HeroKpaAir.md500d) - the airframe of js/hero/roc_air.js's 500MD/TOW,
     called the same way - repainted in the ROC Navy's blue of [N] and carrying the ASW fit [N] shows: the
     search radar's nose radome, the MAD bird on its pylon on the starboard side aft of the cabin, the float
     bags along both skids.  Frame (roc_air.js): s metres aft of the pod nose, h above the skid bottom;
     x = 3.20 - s, z = h - 1.20.  Radome 0.78 m across and 0.95 m long (against the pod's 1.75 m depth in
     [N]); the MAD bird 1.15 m long, 0.26 m across, 1.15 m out from the centreline; the floats 2.30 m x
     0.28 m on the skids (1.87 m track, kpa_air.js). */
  function mdx(s) { return 3.20 - s; }
  function mdz(h) { return h - 1.20; }
  function build500mdAsw(THREE, M, C) {
    var root = need("HeroKpaAir", "js/hero/kpa_air.js").md500d(THREE, M, C);
    root.name = "roc_e80_aswhelo";
    var T = mats(THREE, C, PAL.blue, { orange: function (TT) { return new TT.MeshStandardMaterial({ color: 0xd8862a, roughness: 0.55, metalness: 0.1 }); } });
    var paintD = T.paint.clone(); paintD.side = THREE.DoubleSide;
    /* repaint: the pod (its own sheet) and the boom / tail skin take the blue canvas */
    root.traverse(function (o) {
      if (!o.isMesh || !o.material || o.material.transparent) return;
      var m = o.material;
      if (m.map || (m.side === THREE.DoubleSide && Math.abs(m.roughness - 0.72) < 1e-6 && !m.clearcoat)) o.material = paintD;
    });
    var B = bins(T, 0.6), s;
    /* the radome on the nose, a little to starboard [N] */
    body(B.paint, [[mdx(-0.48), mdz(0.92), 0.02, 0.02, 0.02, 1, -0.10], [mdx(-0.40), mdz(0.92), 0.22, 0.22, 0.22, 1, -0.10],
                   [mdx(-0.20), mdz(0.92), 0.37, 0.37, 0.37, 1, -0.10], [mdx(0.10), mdz(0.92), 0.39, 0.39, 0.39, 1, -0.10],
                   [mdx(0.40), mdz(0.92), 0.30, 0.30, 0.30, 1, -0.10]], 16);
    box(B.dark, mdx(0.42), mdx(0.30), -0.25, 0.05, mdz(0.80), mdz(1.04));
    /* the MAD pylon and the bird on its cradle, starboard side aft of the door [N] */
    bar(B.paint, [mdx(2.30), -0.60, mdz(1.05)], [mdx(2.30), -1.10, mdz(1.10)], 0.05, 8);
    bar(B.metal, [mdx(2.10), -0.62, mdz(0.95)], [mdx(2.30), -1.10, mdz(1.08)], 0.025, 6);
    box(B.paint, mdx(2.55), mdx(2.05), -1.25, -0.98, mdz(1.10), mdz(1.22));
    lathe(B.orange, [[mdx(2.95), 0.02], [mdx(2.88), 0.10], [mdx(2.70), 0.13], [mdx(2.00), 0.13], [mdx(1.85), 0.08], [mdx(1.80), 0.02]], 14, -1.15, mdz(0.97));
    for (var k = 0; k < 4; k++) {
      var a = (45 + 90 * k) * D2R;
      slab(B.dark, [mdx(2.85), -1.15 + Math.cos(a) * 0.20, mdz(0.97) + Math.sin(a) * 0.20], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)], 0.08, 0.08, 0.008);
    }
    /* the float bags packed along the skids [N] */
    for (s = -1; s <= 1; s += 2) {
      body(B.dark, [[mdx(0.15), mdz(0.17), 0.04, 0.04, 0.04, 1, s * 0.935], [mdx(0.30), mdz(0.17), 0.13, 0.12, 0.10, 1, s * 0.935],
                    [mdx(2.20), mdz(0.17), 0.14, 0.12, 0.10, 1, s * 0.935], [mdx(2.45), mdz(0.17), 0.04, 0.04, 0.04, 1, s * 0.935]], 10);
    }
    /* team: a band round the radome's back */
    cyl(B.team, [mdx(0.36), -0.10, mdz(0.92)], [mdx(0.40), -0.10, mdz(0.92)], 0.33, 0.31, 16);
    flush(THREE, grp(THREE, root, "asw_fit"), B);
    return root;
  }

  /* ====================================================================== SHIP PIECES */
  var DECKPAL = {
    plan: { key: "mb_deck_plan", base: "#5d6164", dark: "#4f5356", light: "#6c7073", seed: 201, ship: true },
    usn:  { key: "mb_deck_usn", base: "#4a4f53", dark: "#3e4246", light: "#575c60", seed: 202, ship: true },
    alu:  { key: "mb_deck_alu", base: "#6e7266", dark: "#5f6358", light: "#7c8074", seed: 203, ship: true }
  };
  function shipMats(THREE, C, P, D, boot) {
    return mats(THREE, C, P, {
      deck: function (TT) { var m = new TT.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92, metalness: 0.05 }); var t = paintTex(TT, D); if (t) m.map = t; else m.color.set(D.base); return m; },
      boot: function (TT) { return new TT.MeshStandardMaterial({ color: boot || 0x1f2122, roughness: 0.8, metalness: 0.1 }); }
    });
  }
  /* a gun mount, built about (x, y, z) on its deck, the barrels toward dir (+1 forward, -1 aft).
     o: base [r, h], sh [length, width, height] the shield or gunhouse, open (an open-backed shield),
     n barrels of length bl, radius br, sep apart, at height bz over the deck, elevation el (deg) */
  function gunMount(B, x, y, z, dir, o) {
    var r = o.base[0], h = o.base[1], L = o.sh[0], W = o.sh[1], H = o.sh[2], i, k;
    cylZ(B.paint, x, y, z, z + h, r, 16);
    cylZ(B.dark, x, y, z + h, z + h + 0.04, r * 0.92, 16);
    var x0 = x - dir * L * 0.45, x1 = x + dir * L * 0.55, zb = z + h + 0.04, zt = zb + H;
    var xa = Math.min(x0, x1), xb = Math.max(x0, x1);
    if (o.open) {
      /* an open shield: front plate leaning back, cheeks; the trunnion pedestal and the layer's seats inside */
      var xf = dir > 0 ? xb : xa, xs = xf - dir * L * 0.55;
      prismY(B.paint, [[xf, zb], [xf - dir * 0.08, zt], [xf - dir * 0.16, zt], [xf - dir * 0.08, zb]].map(function (p) { return p; }), y - W / 2, y + W / 2);
      for (k = -1; k <= 1; k += 2) box(B.paint, Math.min(xf, xs), Math.max(xf, xs), y + k * W / 2 - 0.03, y + k * W / 2 + 0.03, zb, zt - 0.15);
      box(B.dark, x - 0.25, x + 0.25, y - 0.22, y + 0.22, zb, zb + o.bz - 0.10);
      for (k = -1; k <= 1; k += 2) { box(B.dark, x - dir * 0.55 - 0.15, x - dir * 0.55 + 0.15, y + k * 0.35 - 0.12, y + k * 0.35 + 0.12, zb + 0.35, zb + 0.42); cylZ(B.dark, x - dir * 0.55, y + k * 0.35, zb, zb + 0.35, 0.03, 5); }
    } else {
      /* an enclosed gunhouse: sloped front and roof edges, the sighting hoods on the roof, rear door */
      var xr = dir > 0 ? xa : xb, xfr = dir > 0 ? xb : xa;
      prismY(B.paint, [[xr, zb], [xfr, zb], [xfr, zb + H * 0.45], [xfr - dir * L * 0.25, zt], [xr + dir * 0.10, zt], [xr, zt - 0.12]], y - W / 2, y + W / 2);
      for (k = -1; k <= 1; k += 2) {
        box(B.paint, x - 0.18, x + 0.18, y + k * W * 0.28 - 0.14, y + k * W * 0.28 + 0.14, zt, zt + 0.22);
        box(B.glass, x + dir * 0.17 - 0.025, x + dir * 0.17 + 0.025, y + k * W * 0.28 - 0.10, y + k * W * 0.28 + 0.10, zt + 0.08, zt + 0.17);
      }
      sideBox(B.dark, 1, W / 2 + y, 0.01, x - L * 0.2, x + L * 0.05, zb + 0.15, zt - 0.25);
      box(B.dark, xr - dir * 0.01 - 0.01, xr + 0.01, y - 0.35, y + 0.35, zb + 0.10, zt - 0.20);
      grab(B.dark, x - L * 0.3, x + L * 0.1, y, zt, 0.08);
    }
    /* the barrels, each with its jacket and flash hider */
    var ce = Math.cos(o.el * D2R), se = Math.sin(o.el * D2R), zg = zb + o.bz, xm = dir > 0 ? (o.open ? xb - 0.10 : xb) : (o.open ? xa + 0.10 : xa);
    for (i = 0; i < o.n; i++) {
      var yy = y + (o.n > 1 ? (i - (o.n - 1) / 2) * o.sep : 0);
      var A = [xm - dir * 0.30 * ce, yy, zg - 0.30 * se], E = [xm + dir * o.bl * ce, yy, zg + o.bl * se];
      cyl(B.dark, A, E, o.br, o.br * 0.85, 8);
      cyl(B.dark, A, [A[0] + dir * 0.9 * ce, yy, A[2] + 0.9 * se], o.br * 1.7, o.br * 1.6, 10);
      cyl(B.dark, [E[0] - dir * 0.28 * ce, yy, E[2] - 0.28 * se], E, o.br * 1.5, o.br * 1.4, 8);
    }
  }
  /* RBU-1200: five tubes in a block on a trainable pedestal (NOT CONFIRMED in detail; drawn from the
     launcher's published form, five tubes in two rows) */
  function rbu1200(B, x, y, z) {
    cylZ(B.paint, x, y, z, z + 0.45, 0.30, 12);
    box(B.paint, x - 0.30, x + 0.30, y - 0.40, y + 0.40, z + 0.45, z + 0.62);
    var t = [[-0.24, 0.85], [0, 0.85], [0.24, 0.85], [-0.12, 1.08], [0.12, 1.08]];
    for (var i = 0; i < 5; i++) cyl(B.dark, [x - 0.55, y + t[i][0], z + t[i][1] - 0.22], [x + 0.75, y + t[i][0], z + t[i][1] + 0.12], 0.10, 0.10, 10);
    box(B.paint, x - 0.35, x + 0.35, y - 0.36, y + 0.36, z + 0.62, z + 0.80);
  }
  /* a depth-charge rail at the stern: two rails and the charges on them */
  function dcRail(B, x0, x1, y, z) {
    for (var k = -1; k <= 1; k += 2) box(B.dark, x0, x1, y + k * 0.28 - 0.03, y + k * 0.28 + 0.03, z, z + 0.45);
    for (var x = x0 + 0.35; x < x1 - 0.2; x += 0.62) cylY(B.dark, x, y - 0.24, y + 0.24, z + 0.55, 0.26, 10);
  }
  /* a slotted surface-search antenna on its pedestal, trained ahead */
  function radarBar(B, x, y, z, span) {
    cylZ(B.dark, x, y, z, z + 0.35, 0.10, 8);
    box(B.dark, x - 0.10, x + 0.10, y - span / 2, y + span / 2, z + 0.35, z + 0.55);
    box(B.dark, x + 0.10, x + 0.18, y - span / 2, y + span / 2, z + 0.38, z + 0.52);
  }
  /* a deckhouse with tumblehome-free walls and windows along its sides (s: both sides) */
  function house(B, x0, x1, hw, z0, z1, win) {
    box(B.paint, x0, x1, -hw, hw, z0, z1);
    box(B.paint, x0 - 0.04, x1 + 0.04, -hw - 0.04, hw + 0.04, z1, z1 + 0.06);
    if (win) for (var x = x0 + win[0]; x < x1 - 0.3; x += win[1]) for (var s = -1; s <= 1; s += 2) sideBox(B.dark, s, hw, 0.015, x, x + 0.32, z1 - 0.75, z1 - 0.35);
  }
  /* a doorway on a side (dark panel with its frame) */
  function door(B, s, y, x, z) { sideBox(B.dark, s, y, 0.015, x - 0.35, x + 0.35, z, z + 1.75); sideBox(B.paint, s, y + 0.015, 0.01, x - 0.40, x - 0.35, z, z + 1.80); }

  /* ====================================================================== pla_e00_patrol: TYPE 037 HAINAN
     Measured off [HB-A174] (the MCIA handbook's Hainan PC profile, rendered at 600 dpi): stern 37 px to
     the stem head 2073 px = the published 58.77 m (en.wikipedia "Type 037 corvette"; the sheet's 192.9 ft
     agrees), 34.6 px/m; the drawing's bottom line is taken as the waterline.  x is metres from amidships
     (+ forward), z over the waterline.  Beam 7.2 m, draught 2.2 m (en.wikipedia; the sheet's 14.1 ft is
     taken as a misprint). */
  var HAI = [
    [-29.40, 2.50, 3.05, 2.80, -0.90, 2.4], [-28.0, 2.52, 3.35, 3.10, -1.60, 2.5], [-25.0, 2.55, 3.52, 3.30, -1.95, 2.6],
    [-15.0, 2.62, 3.60, 3.45, -2.20, 2.8], [0.0, 2.80, 3.60, 3.48, -2.20, 3.0], [8.0, 3.05, 3.56, 3.38, -2.20, 2.9],
    [12.0, 3.30, 3.45, 3.20, -2.18, 2.7], [16.0, 3.70, 3.20, 2.80, -2.10, 2.4], [20.0, 4.10, 2.80, 2.15, -1.95, 2.1],
    [23.0, 4.40, 2.25, 1.45, -1.70, 1.9], [25.0, 4.58, 1.75, 0.80, -1.10, 1.7], [26.6, 4.70, 1.25, 0.05, 0.10, 1.5],
    [28.0, 4.82, 0.70, 0.0, 2.30, 1.3], [29.40, 4.95, 0.08, 0.0, 4.60, 1.2]
  ];
  function buildHainan(THREE, M, C) {
    var T = shipMats(THREE, C, PAL.plan, DECKPAL.plan), B = bins(T, 0.10), TB = bins(T, 0.25), g = new THREE.Group(), s, k, x;
    var sta = HAI, dz = function (xx) { return deckAt(sta, xx); };
    shipHull(B, sta, 0.30);
    /* the rubbing strake [HB] and the scuttles [HB: three aft, eight forward] */
    for (s = -1; s <= 1; s += 2) {
      var P = []; for (x = -21; x <= 5; x += 2) P.push([x, s * (hullW(sta, x, 1.30) + 0.04), 1.30]);
      for (k = 0; k + 1 < P.length; k++) bar(B.paint, P[k], P[k + 1], 0.06, 5);
    }
    scuttles(B.dark, sta, [-25.6, -23.8, -22.8, 3.8, 5.6, 7.3, 9.0, 10.8, 12.6, 14.4, 16.2], 1.55);
    anchors(B.dark, B.paint, sta, 25.4, 3.9);
    /* guard rails round every exposed deck edge, bollards, fairleads, hatches, vents */
    for (s = -1; s <= 1; s += 2) {
      rail(B.dark, edgeLine(sta, -29.2, 28.6, s, 0.06, 40), 0.95, 1.5);
      [-27.0, -19.5, 9.5, 23.5].forEach(function (xx) { bollard(B.dark, xx, s * (beamAt(sta, xx) - 0.55), dz(xx)); fairlead(B.dark, xx + 0.8, s * (beamAt(sta, xx + 0.8) - 0.18), dz(xx + 0.8)); });
    }
    rail(B.dark, [[-29.2, 2.6, dz(-29.2)], [-29.2, -2.6, dz(-29.2)]], 0.95, 1.3);
    [[-22.8, 0], [-13.6, 0.8], [14.5, 0], [23.0, 0]].forEach(function (h) { hatch(B.paint, h[0], h[1], dz(h[0]), 1.0, 0.9); });
    [[-14.5, -1.6], [-4.5, 2.7], [-4.5, -2.7], [13.2, 1.4], [13.2, -1.4]].forEach(function (v) { mushroomVent(B.paint, v[0], v[1], dz(v[0]), 0.25); });
    /* the depth-charge rails on the quarterdeck [HB "d.c."] */
    for (s = -1; s <= 1; s += 2) dcRail(B, -29.2, -25.1, s * 1.75, dz(-27));
    /* the small after deckhouse with its vent [HB] */
    house(B, -24.7, -21.1, 1.55, dz(-23), dz(-23) + 0.85, null);
    gooseneck(B.paint, -21.6, 0, dz(-23) + 0.85, 0.12, -1);
    /* the after twin 57 mm, trained aft [HB] */
    gunMount(B, -17.3, 0, dz(-17.3), -1, { base: [1.05, 0.40], sh: [2.6, 2.2, 1.30], open: false, n: 2, bl: 3.7, br: 0.06, sep: 0.55, bz: 0.80, el: 5 });
    /* the after deckhouse and the after twin 25 mm on its roof [HB] */
    var za = dz(-10) + 2.1;
    house(B, -12.1, -8.4, 1.85, dz(-10), za, [0.4, 0.9]);
    for (s = -1; s <= 1; s += 2) { door(B, s, 1.85, -11.0, dz(-10)); rail(B.dark, [[-12.0, s * 1.8, za + 0.06], [-8.5, s * 1.8, za + 0.06]], 0.9, 1.2); ladderX(B.dark, -12.2, s * 1.2, dz(-12), za); }
    gunMount(B, -10.6, 0, za + 0.06, -1, { base: [0.55, 0.25], sh: [1.0, 1.4, 0.75], open: true, n: 2, bl: 2.3, br: 0.03, sep: 0.34, bz: 0.62, el: 14 });
    cylZ(B.paint, -7.2, 0, dz(-7.2), 7.4, 0.11, 8);                             /* the derrick post [HB] */
    bar(B.dark, [-7.2, 0, dz(-7.2) + 0.8], [-9.6, 0, 6.2], 0.06, 6);
    /* the superstructure: the long lower block, the bridge on it, the wings [HB] */
    var zl = dz(2), zr1 = 5.20, zr2 = 8.00;
    house(B, -2.9, 7.2, 2.55, zl, zr1, [0.5, 1.1]);
    prismY(B.paint, [[4.2, zr1], [7.2, zr1], [7.5, zr1 - 0.6], [7.2, zl], [4.2, zl]], -2.55, 2.55);
    house(B, -3.5, 4.2, 2.20, zr1, zr2, null);
    prismY(B.paint, [[1.8, zr2 - 1.0], [4.2, zr2 - 1.0], [4.55, zr2 - 0.15], [4.4, zr2], [1.8, zr2]], -3.40, 3.40);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) box(B.glass, 4.42 + 0.04 * k * 0, 4.52, s * (0.15 + k * 0.62), s * (0.15 + k * 0.62) + s * 0.48, zr2 - 0.75, zr2 - 0.25);
      sideBox(B.glass, s, 3.40, 0.015, 2.2, 3.9, zr2 - 0.70, zr2 - 0.30);
      door(B, s, 2.55, -1.6, zl); door(B, s, 2.20, -2.6, zr1);
      raft(B.paint, B.dark, -1.2 + 0, s * 2.15, zr1 + 0.06, true);
      raft(B.paint, B.dark, 0.6, s * 2.15, zr1 + 0.06, true);
      rail(B.dark, [[-2.85, s * 2.5, zr1 + 0.06], [7.1, s * 2.5, zr1 + 0.06]], 0.9, 1.3);
      rail(B.dark, [[1.8, s * 3.35, zr2], [4.3, s * 3.35, zr2]], 0.9, 1.2);
      ladderX(B.dark, -3.05, s * 1.6, zl, zr1);
      ladderX(B.dark, -3.65, s * 1.3, zr1, zr2);
    }
    box(B.paint, -3.4, 1.6, -2.1, 2.1, zr2, zr2 + 0.08);
    box(B.team, -3.0, -1.6, -0.6, 0.6, zr2 + 0.08, zr2 + 0.095);
    box(B.team, -2.2, -1.0, -0.7, 0.7, za + 0.06, za + 0.075);
    /* the funnel-less roof: the uptake grilles aft on the lower block, the searchlights on the wings */
    for (s = -1; s <= 1; s += 2) { box(B.dark, -2.6, -1.2, s * 1.2 - 0.4, s * 1.2 + 0.4, zr1, zr1 + 0.35); cylZ(B.dark, 3.6, s * 3.1, zr2, zr2 + 0.35, 0.18, 10); cyl(B.lamp, [3.75, s * 3.1, zr2 + 0.35], [3.80, s * 3.1, zr2 + 0.35], 0.15, 0.15, 10); }
    /* the tripod mast on the bridge roof with its yard and the round radar dome, the two pole masts [HB] */
    lattice(B.dark, -1.5, 0, zr2, 14.2, 0.85, 0.22, 5);
    cylZ(B.dark, -1.5, 0, 14.2, 15.9, 0.07, 6);
    bar(B.dark, [-1.5, -1.9, 13.2], [-1.5, 1.9, 13.2], 0.05, 6);
    box(B.dark, -2.2, -0.8, -0.7, 0.7, 12.2, 12.3);
    cylZ(B.paint, -1.5, 0, 12.3, 12.9, 0.52, 16); cylZ(B.paint, -1.5, 0, 12.9, 13.0, 0.40, 16);
    cylZ(B.dark, -2.6, 0, 10.9, 11.4, 0.06, 6); radarBar(B, -2.6, 0, 11.4, 1.6);
    cylZ(B.dark, 2.1, 1.3, zr2, 11.6, 0.06, 6); cylZ(B.dark, 3.1, -1.3, zr2, 14.9, 0.07, 6);
    /* the forward twin 25 mm on the lower block's roof ahead of the bridge [HB] */
    gunMount(B, 5.9, 0, zr1 + 0.06, 1, { base: [0.55, 0.25], sh: [1.0, 1.4, 0.75], open: true, n: 2, bl: 2.3, br: 0.03, sep: 0.34, bz: 0.62, el: 14 });
    /* the RBU-1200s, two a side on the forecastle [HB] */
    for (s = -1; s <= 1; s += 2) { rbu1200(B, 19.4, s * 1.2, dz(19.4)); rbu1200(B, 21.1, s * 1.05, dz(21.1)); }
    /* jackstaff and ensign staff */
    cylZ(B.dark, 29.0, 0, dz(29), 8.1, 0.04, 6); cylZ(B.dark, -29.2, 0, dz(-29.2), 4.7, 0.04, 6);
    flush(THREE, g, B);
    /* "turret": the forward twin 57 mm (row turret:true), origin on its ring at the deck */
    var tz = dz(10.7), tg = grp(THREE, g, "turret", 10.7, 0, tz);
    gunMount(TB, 0, 0, 0, 1, { base: [1.05, 0.40], sh: [2.6, 2.2, 1.30], open: false, n: 2, bl: 3.7, br: 0.06, sep: 0.55, bz: 0.80, el: 5 });
    box(TB.team, -0.6, 0.2, -0.5, 0.5, 1.74 + 0.22, 1.76 + 0.22);
    flush(THREE, tg, TB);
    g.name = "pla_e00_patrol";
    return g;
  }

  /* ====================================================================== pla_e60_patrol: TYPE 062 SHANGHAI II
     Measured off [HB-A177] (the handbook's Shanghai II PC profile, 600 dpi): stern 30 px to the stem
     head 1770 px = the published 127.3 ft (38.80 m), 44.85 px/m; the bottom line the waterline.  Beam
     17.7 ft (5.40 m), draught 5.3 ft (1.62 m). */
  var SHA = [
    [-19.40, 1.22, 2.10, 1.95, -0.45, 2.2], [-17.5, 1.25, 2.50, 2.35, -1.05, 2.4], [-14.0, 1.32, 2.65, 2.55, -1.35, 2.6],
    [-5.0, 1.48, 2.70, 2.62, -1.55, 2.8], [3.0, 1.58, 2.70, 2.60, -1.60, 2.8], [7.0, 1.70, 2.62, 2.45, -1.58, 2.6],
    [10.0, 1.90, 2.45, 2.15, -1.52, 2.3], [13.0, 2.20, 2.10, 1.60, -1.40, 2.0], [15.5, 2.45, 1.60, 0.85, -1.00, 1.7],
    [17.6, 2.65, 0.95, 0.05, 0.05, 1.4], [18.6, 2.75, 0.50, 0.0, 1.40, 1.3], [19.40, 2.82, 0.07, 0.0, 2.75, 1.2]
  ];
  function buildShanghai(THREE, M, C) {
    var T = shipMats(THREE, C, PAL.plan, DECKPAL.plan), B = bins(T, 0.14), TB = bins(T, 0.3), g = new THREE.Group(), s, k, x;
    var sta = SHA, dz = function (xx) { return deckAt(sta, xx); };
    shipHull(B, sta, 0.25);
    for (s = -1; s <= 1; s += 2) {
      var P = []; for (x = -18; x <= 14; x += 2) P.push([x, s * (hullW(sta, x, 0.95) + 0.03), 0.95]);
      for (k = 0; k + 1 < P.length; k++) bar(B.paint, P[k], P[k + 1], 0.05, 5);
    }
    scuttles(B.dark, sta, [-4.8, -3.4, 1.4], 0.55);
    anchors(B.dark, B.paint, sta, 16.2, 2.1);
    for (s = -1; s <= 1; s += 2) {
      rail(B.dark, edgeLine(sta, -18.8, 18.6, s, 0.05, 30), 0.9, 1.4);
      [-17.0, -9.5, 12.5, 16.8].forEach(function (xx) { bollard(B.dark, xx, s * (beamAt(sta, xx) - 0.45), dz(xx)); });
      fairlead(B.dark, 17.6, s * 0.55, dz(17.6));
    }
    rail(B.dark, [[-18.85, 1.9, dz(-18.8)], [-18.85, -1.9, dz(-18.8)]], 0.9, 1.3);
    /* depth charges and the mine rails aft (row "Mines, d.c."; [HB] draws the small posts on the quarterdeck) */
    for (s = -1; s <= 1; s += 2) dcRail(B, -18.8, -15.8, s * 1.30, dz(-17));
    /* the after twin 37 mm, trained aft [HB] */
    gunMount(B, -12.0, 0, dz(-12), -1, { base: [0.70, 0.30], sh: [1.30, 1.55, 1.10], open: true, n: 2, bl: 2.75, br: 0.045, sep: 0.42, bz: 0.80, el: 10 });
    /* the vents and the engine-room hatches between the mounts [HB: x -9.1, -7.0] */
    mushroomVent(B.paint, -9.1, 0.9, dz(-9.1), 0.24); mushroomVent(B.paint, -9.1, -0.9, dz(-9.1), 0.24);
    box(B.paint, -7.5, -6.5, -0.65, 0.65, dz(-7), dz(-7) + 0.95); gooseneck(B.paint, -6.6, 0, dz(-7) + 0.95, 0.10, 1);
    hatch(B.paint, -14.4, 0, dz(-14.4), 0.9, 0.9); hatch(B.paint, -5.6, 1.4, dz(-5.6), 0.8, 0.7); hatch(B.paint, 11.0, 0, dz(11), 0.8, 0.8);
    /* the twin 25 mm port and starboard on their platform ahead of the mast [HB] */
    var zp = dz(-3.8) + 0.85;
    box(B.paint, -4.6, -3.0, -2.4, 2.4, dz(-3.8), zp);
    for (s = -1; s <= 1; s += 2) gunMount(B, -3.8, s * 1.40, zp, 1, { base: [0.45, 0.22], sh: [0.90, 1.10, 0.62], open: true, n: 2, bl: 2.1, br: 0.028, sep: 0.30, bz: 0.55, el: 18 });
    /* the deckhouse and the wheelhouse on it with its raked front [HB] */
    var zl = dz(2), zh = 3.60, zw = 4.90;
    house(B, -1.95, 5.10, 1.95, zl, zh, [0.5, 0.95]);
    prismY(B.paint, [[2.2, zh], [4.35, zh], [3.95, zw], [2.2, zw]], -1.55, 1.55);
    box(B.paint, 2.15, 4.05, -1.62, 1.62, zw, zw + 0.06);
    for (s = -1; s <= 1; s += 2) {
      slab(B.glass, [4.17, s * 0.78, zh + 0.85], unit([-0.4, 0, 1.3]), [0, 1, 0], unit([1.3, 0, 0.4]), 0.30, 0.60, 0.015);
      sideBox(B.glass, s, 1.55, 0.015, 2.6, 3.7, zh + 0.55, zh + 1.05);
      door(B, s, 1.95, 0.4, zl);
      rail(B.dark, [[-1.9, s * 1.9, zh + 0.06], [2.1, s * 1.9, zh + 0.06]], 0.85, 1.2);
      ladderX(B.dark, -2.1, s * 1.0, zl, zh);
      raft(B.paint, B.dark, -0.8, s * 1.55, zh + 0.06, true);
      cylZ(B.dark, 3.4, s * 1.45, zw, zw + 0.25, 0.14, 10); cyl(B.lamp, [3.52, s * 1.45, zw + 0.25], [3.56, s * 1.45, zw + 0.25], 0.12, 0.12, 10);
    }
    box(B.team, 2.6, 3.6, -0.6, 0.6, zw + 0.06, zw + 0.075);
    /* the two pole masts on the wheelhouse [HB: x 2.1 and 3.2, 8.5 m] */
    cylZ(B.dark, 2.1, 0.6, zw, 8.5, 0.05, 6); cylZ(B.dark, 3.2, -0.6, zw, 8.6, 0.05, 6);
    /* the latticed tripod mast behind the wheelhouse: three legs, the radar platform, the yard [HB] */
    var mx = -0.7, legs = [[mx - 0.75, 0.95], [mx - 0.75, -0.95], [mx + 0.85, 0]];
    for (k = 0; k < 3; k++) bar(B.dark, [legs[k][0], legs[k][1], zh], [mx, 0, 8.6], 0.05, 6);
    for (k = 0; k < 5; k++) {
      var f = k / 5, zz = zh + (8.6 - zh) * f, zz2 = zh + (8.6 - zh) * (f + 0.2);
      for (var j = 0; j < 3; j++) {
        var a = legs[j], b = legs[(j + 1) % 3];
        bar(B.dark, [a[0] + (mx - a[0]) * f, a[1] * (1 - f), zz], [b[0] + (mx - b[0]) * (f + 0.2), b[1] * (1 - f - 0.2), zz2], 0.02, 4);
      }
    }
    box(B.dark, mx - 0.6, mx + 0.6, -0.65, 0.65, 7.2, 7.28);
    rail(B.dark, [[mx - 0.6, -0.65, 7.28], [mx + 0.6, -0.65, 7.28], [mx + 0.6, 0.65, 7.28], [mx - 0.6, 0.65, 7.28]], 0.6, 0.6);
    radarBar(B, mx, 0, 7.28, 1.2);
    cylZ(B.dark, mx, 0, 8.6, 10.0, 0.05, 6);
    bar(B.dark, [mx, -1.3, 9.1], [mx, 1.3, 9.1], 0.04, 5);
    /* jackstaff [HB] and ensign staff */
    cylZ(B.dark, 19.1, 0, dz(19.1), 5.6, 0.035, 6); cylZ(B.dark, -18.8, 0, dz(-18.8), 3.1, 0.035, 6);
    flush(THREE, g, B);
    /* "turret": the forward twin 37 mm [HB] */
    var tg = grp(THREE, g, "turret", 9.0, 0, dz(9.0));
    gunMount(TB, 0, 0, 0, 1, { base: [0.70, 0.30], sh: [1.30, 1.55, 1.10], open: true, n: 2, bl: 2.75, br: 0.045, sep: 0.42, bz: 0.80, el: 10 });
    box(TB.team, -0.30, 0.30, -0.70, -0.62, 0.40, 1.0); box(TB.team, -0.30, 0.30, 0.62, 0.70, 0.40, 1.0);
    flush(THREE, tg, TB);
    g.name = "pla_e60_patrol";
    return g;
  }

  /* small arms of the US boats */
  function oerlikon(B, x, y, z, dir) {
    cylZ(B.paint, x, y, z, z + 0.85, 0.12, 8);
    box(B.paint, x - dir * 0.05 - 0.04, x - dir * 0.05 + 0.04, y - 0.45, y + 0.45, z + 0.85, z + 1.55);
    cyl(B.dark, [x - dir * 0.30, y, z + 1.20], [x + dir * 1.60, y, z + 1.42], 0.03, 0.025, 6);
    box(B.dark, x - dir * 0.35 - 0.10, x - dir * 0.35 + 0.10, y - 0.08, y + 0.08, z + 1.15, z + 1.40);
    cylZ(B.dark, x + dir * 0.10, y, z + 1.32, z + 1.52, 0.11, 10);
  }
  function mk38(B, x, y, z, dir) {
    cylZ(B.paint, x, y, z, z + 0.20, 0.45, 12);
    cylZ(B.paint, x, y, z + 0.20, z + 0.85, 0.16, 10);
    box(B.paint, x - 0.40, x + 0.45, y - 0.22, y + 0.22, z + 0.85, z + 1.15);
    box(B.dark, x - 0.20, x + 0.20, y + 0.25, y + 0.55, z + 0.80, z + 1.12);
    cyl(B.dark, [x - dir * 0.30, y, z + 1.00], [x + dir * 2.05, y, z + 1.06], 0.035, 0.03, 8);
    cyl(B.dark, [x + dir * 0.40, y, z + 1.01], [x + dir * 0.95, y, z + 1.03], 0.06, 0.06, 8);
    box(B.dark, x - dir * 0.55 - 0.15, x - dir * 0.55 + 0.15, y - 0.25, y + 0.25, z + 0.45, z + 0.55);
    box(B.dark, x - dir * 0.75 - 0.05, x - dir * 0.75 + 0.05, y - 0.25, y + 0.25, z + 0.55, z + 1.05);
  }
  function m2(B, x, y, z, dir, L) {
    box(B.dark, x - dir * 0.20 - 0.18, x - dir * 0.20 + 0.18, y - 0.07, y + 0.07, z - 0.07, z + 0.08);
    cyl(B.dark, [x, y, z], [x + dir * (L || 1.15), y, z], 0.025, 0.025, 6);
    cyl(B.dark, [x, y, z], [x + dir * 0.45, y, z], 0.04, 0.04, 8);
    box(B.dark, x - dir * 0.20 - 0.06, x - dir * 0.20 + 0.06, y + 0.07, y + 0.22, z - 0.12, z + 0.02);
  }

  /* ====================================================================== nato_e50_patrol, roc_e50_patrol: PC-461
     Measured off [PC1] ("PC-546.png", USS PC-546 from starboard, near side-on): stern 35 px to the stem
     head 748 px = the published 173 ft 8 in (52.93 m, en.wikipedia "PC-461-class submarine chaser"),
     13.48 px/m; the waterline taken at the boot line amidships.  Beam 23 ft 2 in (7.06 m); draught
     6 ft 2.5 in (1.89 m, the infobox; 10 ft 10 in is the design figure with the gear).  The 1950s fit:
     one 3"/50 forward, the 40 mm aft, 20 mm on the bridge wings and the quarterdeck, two K-guns and the
     stern racks ([PC1] [PC2], en.wikipedia "Armament").  The roc row (Qing Jiang class, ex-USN PC-461,
     eras.js) is the same ship. */
  var PC4 = [
    [-26.45, 1.15, 3.00, 2.90, -0.70, 2.4], [-24.5, 1.20, 3.30, 3.20, -1.30, 2.6], [-18.0, 1.45, 3.50, 3.42, -1.75, 2.8],
    [-6.0, 1.75, 3.53, 3.45, -1.89, 3.0], [4.0, 2.00, 3.53, 3.42, -1.89, 3.0], [11.0, 2.40, 3.40, 3.15, -1.85, 2.7],
    [16.0, 2.85, 3.05, 2.55, -1.75, 2.3], [20.0, 3.20, 2.45, 1.70, -1.55, 2.0], [23.0, 3.45, 1.75, 0.85, -1.10, 1.7],
    [25.3, 3.60, 1.05, 0.06, 0.05, 1.4], [26.45, 3.70, 0.08, 0.0, 2.60, 1.2]
  ];
  function buildPc461(THREE, M, C, key) {
    var T = shipMats(THREE, C, PAL.navy, DECKPAL.usn), B = bins(T, 0.10), TB = bins(T, 0.3), g = new THREE.Group(), s, k, x;
    var sta = PC4, dz = function (xx) { return deckAt(sta, xx); };
    shipHull(B, sta, 0.30);
    scuttles(B.dark, sta, [-9.5, -8.0, 13.0, 14.6], 1.15);
    anchors(B.dark, B.paint, sta, 22.8, 2.8);
    for (s = -1; s <= 1; s += 2) {
      rail(B.dark, edgeLine(sta, -26.3, 25.8, s, 0.05, 40), 0.95, 1.5);
      [-24.5, -11.0, 13.5, 22.0].forEach(function (xx) { bollard(B.dark, xx, s * (beamAt(sta, xx) - 0.5), dz(xx)); fairlead(B.dark, xx + 0.8, s * (beamAt(sta, xx + 0.8) - 0.16), dz(xx + 0.8)); });
    }
    rail(B.dark, [[-26.35, 2.7, dz(-26.3)], [-26.35, -2.7, dz(-26.3)]], 0.95, 1.4);
    /* the stern racks, the K-guns abreast the 40 mm [PC1] */
    for (s = -1; s <= 1; s += 2) {
      dcRail(B, -26.3, -22.0, s * 1.9, dz(-24));
      var kx = -19.5, ky = s * (beamAt(sta, kx) - 0.7), kz = dz(kx);
      box(B.dark, kx - 0.3, kx + 0.3, ky - 0.3, ky + 0.3, kz, kz + 0.25);
      cyl(B.dark, [kx, ky, kz + 0.25], [kx, ky + s * 0.35, kz + 0.95], 0.15, 0.15, 10);
      cylY(B.dark, kx, ky + s * 0.30, ky + s * 0.75, kz + 0.95, 0.24, 10);
    }
    [[-21.0, 0], [-8.5, 1.8], [14.5, 0]].forEach(function (h) { hatch(B.paint, h[0], h[1], dz(h[0]), 0.9, 0.9); });
    [[-15.5, 1.5], [-15.5, -1.5], [12.6, 1.6], [12.6, -1.6]].forEach(function (v) { mushroomVent(B.paint, v[0], v[1], dz(v[0]), 0.22); });
    /* the 40 mm in its tub and the after 20 mm [PC1] */
    var z40 = dz(-13.5);
    cyl(B.paint, [-13.5, 0, z40], [-13.5, 0, z40 + 1.0], 1.45, 1.45, 18, true);
    cyl(B.paint, [-13.5, 0, z40 + 1.0], [-13.5, 0, z40], 1.38, 1.38, 18, true);
    gunMount(B, -13.5, 0, z40, -1, { base: [0.60, 0.45], sh: [0.9, 1.4, 0.55], open: true, n: 1, bl: 2.3, br: 0.045, sep: 0, bz: 0.65, el: 20 });
    oerlikon(B, -17.6, 0, dz(-17.6), -1);
    /* the deckhouse, the false funnel, the boat deck with the dinghy and its boom [PC1] [PC2] */
    var zh = dz(4), zr = 4.20, zb2 = 6.50;
    house(B, -3.8, 11.9, 2.60, dz(0), zr, [0.6, 1.2]);
    prismY(B.paint, [[10.6, zr], [11.9, zr], [12.4, zr - 0.9], [11.9, dz(11.5)], [10.6, dz(11.5)]], -2.6, 2.6);
    body(B.paint, [[-3.1, 4.9, 0.50, 0.70, 0.70, 2.4], [-3.0, 4.9, 0.62, 0.72, 0.72, 2.4], [-0.6, 4.9, 0.75, 0.72, 0.72, 2.4], [-0.5, 4.9, 0.68, 0.70, 0.70, 2.4]], 16, false);
    box(B.dark, -3.1, -0.4, -0.78, 0.78, 5.55, 5.70);
    box(B.paint, -9.2, -4.0, -2.0, 2.0, dz(-6), dz(-6) + 0.7);
    body(B.paint, [[-8.6, dz(-6) + 1.15, 0.05, 0.10, 0.25, 2], [-8.2, dz(-6) + 1.15, 0.60, 0.28, 0.40, 2], [-5.4, dz(-6) + 1.15, 0.70, 0.28, 0.45, 2], [-4.7, dz(-6) + 1.15, 0.30, 0.25, 0.35, 2]], 12);
    cylZ(B.paint, -7.9, 0, dz(-7.9), dz(-7.9) + 0.6, 0.12, 8);
    bar(B.dark, [-7.9, 0, dz(-7.9) + 0.4], [-3.4, 0, 5.6], 0.07, 6);
    bar(B.dark, [-3.4, 0, 5.6], [-6.4, 0, dz(-6) + 1.6], 0.015, 4);
    for (s = -1; s <= 1; s += 2) {
      door(B, s, 2.60, -2.5, dz(-2.5)); door(B, s, 2.60, 9.6, dz(9.6));
      /* the Carley floats stood on the deckhouse sides [PC1] */
      body(B.paint, [[2.1, 2.95, 0.12, 0.85, 0.85, 1.4, s * 2.72], [2.3, 2.95, 0.14, 0.95, 0.95, 1.4, s * 2.72], [4.9, 2.95, 0.14, 0.95, 0.95, 1.4, s * 2.72], [5.1, 2.95, 0.12, 0.85, 0.85, 1.4, s * 2.72]], 12);
      ladderX(B.dark, -4.0, s * 1.6, dz(-4), zr);
      rail(B.dark, [[-3.7, s * 2.55, zr + 0.06], [5.6, s * 2.55, zr + 0.06]], 0.95, 1.3);
      oerlikon(B, 9.0, s * 2.9, zr + 0.06, 1);
      box(B.paint, 8.0, 10.6, s * 2.55, s * 3.25, zr, zr + 0.08);
    }
    /* the pilothouse and the open bridge over it [PC1] */
    house(B, 5.8, 10.6, 1.80, zr, zb2 - 0.9, null);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 3; k++) sideBox(B.glass, s, 1.80, 0.015, 7.0 + k * 1.0, 7.6 + k * 1.0, zb2 - 1.6, zb2 - 1.15);
    for (k = 0; k < 5; k++) box(B.glass, 10.60, 10.63, -1.5 + k * 0.62, -1.05 + k * 0.62, zb2 - 1.6, zb2 - 1.15);
    box(B.paint, 5.6, 10.9, -1.95, 1.95, zb2 - 0.9, zb2 - 0.82);
    prismY(B.paint, [[5.6, zb2 - 0.82], [10.9, zb2 - 0.82], [11.05, zb2 + 0.25], [10.85, zb2 + 0.25]], 1.85, 1.95);
    prismY(B.paint, [[5.6, zb2 - 0.82], [10.9, zb2 - 0.82], [11.05, zb2 + 0.25], [10.85, zb2 + 0.25]], -1.95, -1.85);
    prismX(B.paint, [[-1.95, zb2 - 0.82], [1.95, zb2 - 0.82], [1.95, zb2 + 0.25], [-1.95, zb2 + 0.25]], 10.85, 11.05);
    box(B.team, 6.5, 8.5, -0.8, 0.8, zb2 - 0.82, zb2 - 0.80);
    box(B.team, -12.6, -12.0, -1.0, 1.0, dz(-12.3), dz(-12.3) + 0.02);
    /* the radome on its pedestal behind the bridge, the mast with its yard and lookout platform [PC1] [PC2] */
    cylZ(B.paint, 6.6, 0, zb2 - 0.82, 7.6, 0.30, 10);
    lathe(B.paint, [[6.6 - 0.78, 0.01], [6.6 - 0.70, 0.45], [6.6 - 0.40, 0.70], [6.6, 0.78], [6.6 + 0.40, 0.70], [6.6 + 0.70, 0.45], [6.6 + 0.78, 0.01]], 14, 0, 8.3);
    cyl(B.dark, [4.5, 0, zr], [4.5, 0, 15.0], 0.13, 0.06, 8);
    bar(B.dark, [4.5, -2.0, 12.4], [4.5, 2.0, 12.4], 0.05, 6);
    cylZ(B.paint, 4.5, 0, 11.0, 11.6, 0.45, 12);
    cylZ(B.lamp, 4.85, 0, 11.6, 11.8, 0.15, 8);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [4.5, 0, 13.5], [-4.0, s * 1.5, zr], 0.012, 3);
    bar(B.dark, [4.5, 0, 14.5], [-26.0, 0, 2.6], 0.010, 3);
    /* jackstaff and ensign staff */
    cylZ(B.dark, 26.2, 0, dz(26.2), 6.2, 0.04, 6); cylZ(B.dark, -26.3, 0, dz(-26.3), 3.9, 0.04, 6);
    flush(THREE, g, B);
    /* "turret": the forward 3"/50 on its Mk 22 mount with the open shield [PC1] */
    var tg = grp(THREE, g, "turret", 15.5, 0, dz(15.5));
    gunMount(TB, 0, 0, 0, 1, { base: [0.75, 0.40], sh: [1.6, 1.9, 1.45], open: true, n: 1, bl: 3.8, br: 0.065, sep: 0, bz: 1.05, el: 6 });
    box(TB.team, -0.2, 0.4, -0.96, -0.93, 0.9, 1.5); box(TB.team, -0.2, 0.4, 0.93, 0.96, 0.9, 1.5);
    flush(THREE, tg, TB);
    g.name = key || "nato_e50_patrol";
    return g;
  }

  /* ====================================================================== nato_e90_patrol: CYCLONE PC
     Measured off [CY1] ("USS Cyclone (PC-1) underway in Chesapeake Bay on 1 August 1993", port side, near
     side-on, bow left): stem head 168 px to the transom 1262 px = the published 179 ft (54.56 m,
     en.wikipedia "Cyclone-class patrol ship"), 20.05 px/m; waterline y 630.  Beam 25 ft (7.62 m),
     draught 7.5 ft (2.29 m).  [CY2] ("... USS Whirlwind (PC 11) transits the Arabian Gulf", 2011) for
     the after deckhouse and the stern ramp.  Fit: Mk 38 forward and aft, .50s, the RHIB on its stern ramp. */
  var CYC = [
    [-27.3, 2.55, 3.55, 3.45, -0.80, 2.6], [-24.0, 2.60, 3.75, 3.65, -1.60, 2.8], [-12.0, 2.75, 3.81, 3.72, -2.20, 3.0],
    [2.0, 2.90, 3.81, 3.70, -2.29, 3.0], [10.0, 3.05, 3.70, 3.45, -2.25, 2.7], [16.0, 3.25, 3.30, 2.80, -2.10, 2.3],
    [20.0, 3.40, 2.60, 1.80, -1.80, 2.0], [23.0, 3.50, 1.80, 0.70, -1.10, 1.6], [24.3, 3.55, 1.35, 0.05, 0.05, 1.4],
    [27.3, 3.70, 0.10, 0.0, 3.40, 1.2]
  ];
  function buildCyclone(THREE, M, C) {
    var T = shipMats(THREE, C, PAL.navy, DECKPAL.usn), B = bins(T, 0.10), TB = bins(T, 0.3), g = new THREE.Group(), s, k;
    var sta = CYC, dz = function (xx) { return deckAt(sta, xx); };
    shipHull(B, sta, 0.30);
    /* the engine exhausts low in the hull sides [CY1: x -2.9 and -10.6] */
    for (s = -1; s <= 1; s += 2) [-2.9, -10.6].forEach(function (xx) { var y = hullW(sta, xx, 0.75); box(B.dark, xx - 0.6, xx + 0.6, s > 0 ? y - 0.02 : -y - 0.06, s > 0 ? y + 0.06 : -y + 0.02, 0.62, 0.90); });
    anchors(B.dark, B.paint, sta, 22.0, 2.9);
    for (s = -1; s <= 1; s += 2) {
      rail(B.dark, edgeLine(sta, -27.1, 26.6, s, 0.05, 40), 1.0, 1.6);
      [-24.0, -16.0, 15.0, 21.5].forEach(function (xx) { bollard(B.dark, xx, s * (beamAt(sta, xx) - 0.5), dz(xx)); });
    }
    /* the stern launch ramp and the RHIB on it, the crane [CY1] [CY2] */
    box(B.dark, -27.3, -21.0, -1.3, 1.3, dz(-24) - 0.25, dz(-24) + 0.02);
    body(B.dark, [[-25.3, 3.45, 0.30, 0.25, 0.30, 2], [-24.9, 3.45, 1.05, 0.30, 0.40, 2], [-20.5, 3.45, 1.10, 0.32, 0.40, 2], [-19.4, 3.60, 0.45, 0.20, 0.25, 2]], 12);
    box(B.paint, -23.6, -21.0, -0.7, 0.7, 3.65, 3.90);
    cylZ(B.paint, -21.6, -2.6, dz(-21.6), 5.4, 0.16, 8);
    bar(B.paint, [-21.6, -2.6, 5.4], [-24.5, -1.0, 5.8], 0.09, 6);
    /* the after deckhouse with the Stinger lockers and the after Mk 38 on its roof [CY1] [CY2] */
    var za = 5.25;
    house(B, -18.2, -4.2, 2.70, dz(-10), za, [0.8, 2.0]);
    box(B.paint, -15.0, -11.5, -2.2, 2.2, za, za + 1.0);
    for (s = -1; s <= 1; s += 2) {
      rail(B.dark, [[-18.1, s * 2.65, za], [-4.3, s * 2.65, za]], 1.0, 1.4);
      door(B, s, 2.70, -8.0, dz(-8)); ladderX(B.dark, -18.4, s * 1.4, dz(-18), za);
      box(B.paint, -10.6, -9.0, s * 2.70, s * 2.95, dz(-10) + 0.6, dz(-10) + 1.6);
      raft(B.paint, B.dark, -6.0, s * 3.1, dz(-6), true);
    }
    rail(B.dark, [[-18.1, -2.65, za], [-18.1, 2.65, za]], 1.0, 1.4);
    mk38(B, -16.6, 0, za, -1);
    m2(B, -6.0, 2.3, za + 1.1, 1); m2(B, -6.0, -2.3, za + 1.1, 1);
    for (s = -1; s <= 1; s += 2) cylZ(B.dark, -6.0, s * 2.3, za, za + 1.1, 0.05, 6);
    /* the forward superstructure: the sloped front of the lower house, the bridge block on it [CY1] */
    var zl = dz(6), z1 = 6.0, z2 = 8.0;
    prismY(B.paint, [[-4.2, zl], [12.3, zl], [11.0, z1], [-4.2, z1]], -2.85, 2.85);
    prismY(B.paint, [[-4.2, z1], [7.6, z1], [7.3, z2], [1.3, z2], [-0.5, z2 - 0.8], [-4.2, z2 - 0.8]], -2.2, 2.2);
    for (k = 0; k < 6; k++) slab(B.glass, [7.46, -1.75 + k * 0.70, z1 + 1.35], unit([-0.15, 0, 1]), [0, 1, 0], unit([1, 0, 0.15]), 0.30, 0.30, 0.012);
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.glass, s, 2.2, 0.015, 3.0, 6.6, z1 + 1.05, z1 + 1.60);
      door(B, s, 2.85, 2.2, zl); door(B, s, 2.85, 9.0, zl);
      rail(B.dark, [[-4.1, s * 2.8, z1], [10.9, s * 2.8, z1]], 1.0, 1.4);
      box(B.paint, 0.5, 3.0, s * 2.2, s * 3.6, z1 + 0.85, z1 + 0.95);
      rail(B.dark, [[0.5, s * 3.55, z1 + 0.95], [3.0, s * 3.55, z1 + 0.95]], 0.9, 1.0);
      cylZ(B.dark, 6.5, s * 1.9, z2, z2 + 0.35, 0.16, 10); cyl(B.lamp, [6.65, s * 1.9, z2 + 0.35], [6.70, s * 1.9, z2 + 0.35], 0.13, 0.13, 10);
      ladderX(B.dark, -4.4, s * 1.5, z1, z2 - 0.8);
    }
    rail(B.dark, [[1.3, -2.15, z2], [7.2, -2.15, z2], [7.2, 2.15, z2], [1.3, 2.15, z2]], 0.9, 1.3);
    box(B.team, 2.0, 4.5, -1.0, 1.0, z2, z2 + 0.02);
    /* the lattice mast with its platforms, yards and the radars [CY1] */
    lattice(B.dark, -2.0, 0, z2 - 0.8, 16.0, 1.30, 0.35, 6);
    [[10.0, 1.6], [12.0, 1.2], [13.6, 0.9]].forEach(function (p) {
      box(B.dark, -2.0 - p[1], -2.0 + p[1], -p[1], p[1], p[0], p[0] + 0.06);
      rail(B.dark, [[-2.0 + p[1], -p[1], p[0] + 0.06], [-2.0 + p[1], p[1], p[0] + 0.06]], 0.6, 0.8);
    });
    radarBar(B, -1.6, 0, 13.66, 2.4); radarBar(B, -1.8, 0, 12.06, 1.8);
    cylZ(B.dark, -2.0, 0, 16.0, 17.2, 0.06, 6);
    bar(B.dark, [-2.0, -2.4, 14.8], [-2.0, 2.4, 14.8], 0.05, 6);
    cylZ(B.paint, -1.2, 0, z1, z1 + 1.4, 0.35, 12);
    /* jackstaff and ensign staff */
    cylZ(B.dark, 27.0, 0, dz(27), 6.6, 0.04, 6); cylZ(B.dark, -27.1, 0, dz(-27), 5.0, 0.04, 6);
    flush(THREE, g, B);
    /* "turret": the forward Mk 38 [CY1] */
    var tg = grp(THREE, g, "turret", 16.5, 0, dz(16.5));
    mk38(TB, 0, 0, 0, 1);
    box(TB.team, -0.4, 0.4, -0.24, 0.24, 1.15, 1.17);
    flush(THREE, tg, TB);
    g.name = "nato_e90_patrol";
    return g;
  }

  /* ====================================================================== nato_e60_patrol: PCF SWIFT BOAT (Mk I)
     [SW1] "Swift boat PCF-1.jpg" (PCF-1, the Mk I at the Washington Navy Yard, port bow quarter, a little
     below): the hard-chined aluminium hull with its flared bow, the pilothouse forward with the door and
     the square windows, the gun tub for the twin .50 on its roof, the mast and radar behind the tub, the
     low after cabin with its two long windows, the open after deck with the piggyback .50 / 81 mm on its
     stand and the rails.  Scale: the published 50 ft x 13 ft (15.24 x 3.96 m) and 5 ft draught
     (en.wikipedia "Patrol Craft Fast"); heights from [SW1] against the hull's depth at the pilothouse
     (NOT CONFIRMED: one oblique photograph).  Paint: haze grey, the boot red below. */
  var PCF = [
    [-7.62, 1.20, 1.85, 1.78, -0.55, 6.0], [-6.0, 1.22, 1.95, 1.90, -0.80, 6.0], [-2.0, 1.32, 1.98, 1.92, -0.95, 6.0],
    [2.0, 1.48, 1.98, 1.85, -1.00, 5.0], [4.5, 1.65, 1.88, 1.55, -0.95, 3.0], [6.0, 1.80, 1.62, 1.05, -0.70, 2.2],
    [7.0, 1.92, 1.25, 0.40, -0.10, 1.6], [7.62, 2.00, 0.30, 0.0, 1.20, 1.2]
  ];
  function buildPcf(THREE, M, C) {
    var T = shipMats(THREE, C, PAL.navy, DECKPAL.alu, 0x8a3b2a), B = bins(T, 0.3), TB = bins(T, 0.5), g = new THREE.Group(), s, k;
    var sta = PCF, dz = function (xx) { return deckAt(sta, xx); };
    shipHull(B, sta, 0.20);
    /* the rubbing strake along the gunwale and the chine [SW1] */
    for (s = -1; s <= 1; s += 2) {
      var P = [], Q = [], x;
      for (x = -7.6; x <= 7.2; x += 0.8) { P.push([x, s * (beamAt(sta, x) + 0.03), dz(x) - 0.08]); Q.push([x, s * (hullW(sta, x, 0.35) + 0.02), 0.35]); }
      for (k = 0; k + 1 < P.length; k++) { bar(B.paint, P[k], P[k + 1], 0.045, 5); if (Q[k][1] * s > 0.3) bar(B.paint, Q[k], Q[k + 1], 0.025, 4); }
    }
    /* the pilothouse with its raked front, the door and windows; the after cabin [SW1] */
    var zd0 = dz(1.0), zp = 2.95, zc = 2.20;
    prismY(B.paint, [[-0.8, zd0], [4.2, zd0], [4.2, zp - 0.55], [3.7, zp], [-0.8, zp]], -1.55, 1.55);
    box(B.paint, -0.9, 3.8, -1.60, 1.60, zp, zp + 0.06);
    for (s = -1; s <= 1; s += 2) {
      sideBox(B.glass, s, 1.55, 0.015, 1.9, 2.6, zp - 0.75, zp - 0.30);
      sideBox(B.glass, s, 1.55, 0.015, 2.9, 3.6, zp - 0.75, zp - 0.30);
      sideBox(B.dark, s, 1.55, 0.012, 0.8, 1.6, zd0 + 0.10, zp - 0.15);
      sideBox(B.glass, s, 1.555, 0.012, 0.95, 1.45, zp - 0.75, zp - 0.35);
      sideBox(B.dark, s, 1.56, 0.03, 1.40, 1.48, zd0 + 0.9, zd0 + 1.0);
      slab(B.glass, [3.96, s * 0.75, zp - 0.30], unit([-0.5, 0, 0.55]), [0, 1, 0], unit([0.55, 0, 0.5]), 0.22, 0.55, 0.012);
      box(B.paint, -5.2, -0.8, s * 1.55 - 0.03, s * 1.55 + 0.03, dz(-3), zc);
      sideBox(B.glass, s, 1.55, 0.015, -4.2, -2.6, zc - 0.55, zc - 0.20);
      sideBox(B.glass, s, 1.55, 0.015, -2.4, -1.1, zc - 0.55, zc - 0.20);
      ladderX(B.dark, -0.95, s * 0.9, zc, zp);
      grab(B.dark, -4.8, -1.2, s * 1.4, zc + 0.02, 0.10);
    }
    box(B.paint, -5.2, -0.8, -1.55, 1.55, dz(-3), zc);
    box(B.paint, -5.25, -0.75, -1.60, 1.60, zc, zc + 0.05);
    box(B.team, -4.0, -2.2, -0.6, 0.6, zc + 0.05, zc + 0.065);
    /* the gun tub on the pilothouse roof [SW1], the mast and the radar behind it */
    cyl(B.paint, [1.9, 0, zp + 0.06], [1.9, 0, zp + 0.78], 0.62, 0.62, 18, true);
    cyl(B.paint, [1.9, 0, zp + 0.78], [1.9, 0, zp + 0.06], 0.58, 0.58, 18, true);
    cylZ(B.dark, 0.5, 0, zp + 0.06, zp + 1.25, 0.06, 6);
    bar(B.dark, [0.5, 0, zp + 1.25], [0.9, 0, zp + 1.65], 0.04, 5);
    box(B.dark, 0.75, 1.05, -0.35, 0.35, zp + 1.55, zp + 1.70);
    whip(B.dark, 0.2, 1.2, zp + 0.06, 4.0); whip(B.dark, 0.2, -1.2, zp + 0.06, 3.2);
    rail(B.dark, [[-0.7, 1.5, zp + 0.06], [0.9, 1.5, zp + 0.06]], 0.55, 0.8);
    rail(B.dark, [[-0.7, -1.5, zp + 0.06], [0.9, -1.5, zp + 0.06]], 0.55, 0.8);
    /* the after deck: rails, the piggyback .50 / 81 mm on its stand, the mortar ammunition box [SW1] */
    for (s = -1; s <= 1; s += 2) rail(B.dark, edgeLine(sta, -7.5, -5.2, s, 0.06, 4), 0.75, 0.8);
    rail(B.dark, [[-7.5, -1.7, dz(-7.5)], [-7.5, 1.7, dz(-7.5)]], 0.75, 0.8);
    var mz = dz(-6.3);
    cylZ(B.paint, -6.3, 0, mz, mz + 0.9, 0.14, 8);
    cyl(B.dark, [-6.6, 0, mz + 0.95], [-5.3, 0, mz + 1.35], 0.07, 0.07, 10);
    m2(B, -6.0, 0, mz + 1.25, 1, 1.15);
    box(B.paint, -7.4, -6.9, -0.6, 0.6, mz, mz + 0.55);
    bollard(B.dark, 6.0, 0, dz(6.0)); bollard(B.dark, -7.0, 1.4, dz(-7)); bollard(B.dark, -7.0, -1.4, dz(-7));
    rail(B.dark, edgeLine(sta, 4.5, 7.4, 1, 0.06, 4).concat(edgeLine(sta, 7.4, 4.5, -1, 0.06, 4)), 0.6, 0.9);
    hatch(B.paint, 5.2, 0, dz(5.2), 0.6, 0.6);
    cylZ(B.dark, -7.4, 0, dz(-7.4), 2.8, 0.03, 6);
    flush(THREE, g, B);
    /* "turret": the twin .50 in the tub over the pilothouse [SW1] (en.wikipedia) */
    var tg = grp(THREE, g, "turret", 1.9, 0, zp + 0.06);
    cylZ(TB.dark, 0, 0, 0, 0.65, 0.07, 8);
    box(TB.dark, -0.25, 0.10, -0.30, 0.30, 0.65, 0.80);
    m2(TB, 0.05, 0.20, 0.95, 1, 1.15); m2(TB, 0.05, -0.20, 0.95, 1, 1.15);
    box(TB.team, -0.30, -0.20, -0.30, 0.30, 0.80, 0.90);
    flush(THREE, tg, TB);
    g.name = "nato_e60_patrol";
    return g;
  }

  /* ====================================================================== HELICOPTER KIT */
  /* a fuselage section: bottom zb, top zt, widest at zm; half widths wb (at the bottom), wm, wt (top), exponent e */
  function fring(x, zb, zt, zm, wb, wm, wt, e, n) {
    var P = [], i, th, c, sn, zn, z, W;
    for (i = 0; i < n; i++) {
      th = -PI / 2 + TAU * i / n; c = Math.cos(th); sn = Math.sin(th);
      zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), e);
      z = zm + zn * (sn > 0 ? zt - zm : zm - zb);
      W = wm + ((sn > 0 ? wt : wb) - wm) * Math.abs(zn);
      P.push([x, (c < 0 ? -1 : 1) * W * Math.pow(Math.abs(c), e), z]);
    }
    return P;
  }
  function fus(bin, S0, n) {
    var S = [], i, j, k;
    for (i = 0; i + 1 < S0.length; i++) for (j = 0; j < 3; j++) { var r = []; for (k = 0; k < 8; k++) r.push(S0[i][k] + (S0[i + 1][k] - S0[i][k]) * j / 3); S.push(r); }
    S.push(S0[S0.length - 1]);
    loftN(bin, S.map(function (s) { return fring(s[0], s[1], s[2], s[3], Math.max(s[4], 0.01), Math.max(s[5], 0.01), Math.max(s[6], 0.01), s[7], n || 18); }), true); }
  /* the port-side skin y of a fuselage table at station x, height z (linear between sections) */
  function fusY(S, x, z) {
    var i, a, b, f;
    for (i = 0; i + 1 < S.length; i++) if (x <= S[i][0] && x >= S[i + 1][0]) { a = S[i]; b = S[i + 1]; f = (a[0] - x) / ((a[0] - b[0]) || 1); break; }
    if (!a) { a = b = S[x > S[0][0] ? 0 : S.length - 1]; f = 0; }
    var s = a.map(function (v, k) { return v + (b[k] - v) * f; });
    var t = Math.max(-1, Math.min(1, (z - s[3]) / ((z > s[3] ? s[2] - s[3] : s[3] - s[1]) || 1)));
    var W = s[5] + ((t > 0 ? s[6] : s[4]) - s[5]) * Math.abs(t);
    return W * Math.pow(Math.max(0, 1 - Math.pow(Math.abs(t), 2 / s[7])), s[7] / 2);
  }
  /* a window or panel laid on the port (s 1) or starboard skin */
  function skinPanel(bin, S, s, x0, x1, z0, z1, off) {
    var a = [], i, j, xs = [x0, x1], zs = [z0, z1];
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) a.push([xs[i], s * (fusY(S, xs[i], zs[j]) + off), zs[j]]);
    var b = a.map(function (p) { return [p[0], p[1] + s * 0.02, p[2]]; });
    hexa(bin, [a[0], a[2], a[3], a[1], b[0], b[2], b[3], b[1]]);
  }
  function discMat(THREE) { return new THREE.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.4, metalness: 0.08, transparent: true, opacity: 0.05, depthWrite: false, side: THREE.DoubleSide }); }
  /* main rotor: an unrotated group named "rotor" at the hub (local +Z the mast, up: it turns anti-clockwise
     from above, as the Sikorsky and Kaman heads do), the blades in its XY plane, "rotordisc" inside */
  function mainRotor(THREE, root, T, o) {
    var rg = grp(THREE, root, "rotor", o.x, 0, o.z), B = bins(T, 0.5), k, a, c, sn;
    cylZ(B.metal, 0, 0, -0.30, 0.05, o.hub * 0.45, 12);
    cylZ(B.metal, 0, 0, 0.0, 0.12, o.hub, 14);
    if (o.dome) cylZ(B.metal, 0, 0, 0.12, 0.22, o.hub * 0.75, 14);
    for (k = 0; k < o.nb; k++) {
      a = (o.phase + 360 / o.nb * k) * D2R; c = Math.cos(a); sn = Math.sin(a);
      var r0 = o.root, L = o.R - r0;
      slab(B.blade, [c * (r0 + L / 2), sn * (r0 + L / 2), 0.02], [c, sn, 0], [-sn, c, 0], [0, 0, 1], L / 2, o.chord / 2, 0.025);
      slab(B.metal, [c * (o.hub + (r0 - o.hub) / 2), sn * (o.hub + (r0 - o.hub) / 2), 0.04], [c, sn, 0], [-sn, c, 0], [0, 0, 1], (r0 - o.hub) / 2 + 0.05, 0.10, 0.07);
      if (o.tip) slab(B.red, [c * (o.R - 0.20), sn * (o.R - 0.20), 0.021], [c, sn, 0], [-sn, c, 0], [0, 0, 1], 0.20, o.chord / 2 + 0.002, 0.027);
      if (o.flap) {
        /* Kaman: the servo flap on its two arms behind the blade's trailing edge at about 3/4 span */
        var rf = o.R * 0.72, tx = -sn * (o.chord / 2 + 0.22), ty = c * (o.chord / 2 + 0.22);
        slab(B.blade, [c * rf - tx, sn * rf - ty, 0.02], [c, sn, 0], [-sn, c, 0], [0, 0, 1], 0.40, 0.11, 0.02);
        bar(B.metal, [c * (rf - 0.3), sn * (rf - 0.3), 0.02], [c * (rf - 0.3) - tx, sn * (rf - 0.3) - ty, 0.02], 0.015, 4);
        bar(B.metal, [c * (rf + 0.3), sn * (rf + 0.3), 0.02], [c * (rf + 0.3) - tx, sn * (rf + 0.3) - ty, 0.02], 0.015, 4);
      }
    }
    flush(THREE, rg, B);
    var dm = new THREE.Mesh(new THREE.CircleGeometry(o.R, 48), T.disc); dm.position.z = 0.04; dm.name = "rotordisc"; rg.add(dm);
    return rg;
  }
  /* tail rotor: an unrotated group "tailrotor" at the hub, local Y the shaft, the blades in its XZ plane */
  function tailRotor(THREE, root, T, o) {
    var tg = grp(THREE, root, "tailrotor", o.x, o.y, o.z), B = bins(T, 0.5), k, a;
    cylY(B.metal, 0, -o.s * 0.10, o.s * 0.12, 0, 0.10, 10);
    cyl(B.metal, [0, o.s * 0.12, 0], [0, o.s * 0.22, 0], 0.08, 0.02, 8);
    for (k = 0; k < o.nb; k++) {
      a = (o.phase + 360 / o.nb * k) * D2R;
      slab(B.blade, [Math.cos(a) * (o.R / 2 + 0.08), o.s * 0.05, Math.sin(a) * (o.R / 2 + 0.08)], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], o.R / 2 - 0.08, 0.012, o.chord / 2);
    }
    flush(THREE, tg, B);
    return tg;
  }
  function heliMats(THREE, C, P) {
    return mats(THREE, C, P, {
      blade: function (TT) { return new TT.MeshStandardMaterial({ color: 0x2c2f2b, roughness: 0.75, metalness: 0.12, side: TT.DoubleSide }); },
      disc: discMat
    });
  }

  /* ====================================================================== nato_e60_aswhelo: SIKORSKY SH-3 SEA KING
     POLICY 5: js/hero/gb_misc2.js's HeroGbSeaKing.hc4 draws the Westland Commando / HC4 - the stub sponsons
     with single legs baked into the airframe mesh, no floats, olive - and has no option for the SH-3's
     float sponsons, so the SH-3 is built here.  It is measured off the same drawing that file measures, [D]
     ("Westland Sea King drawing.svg", en.wikipedia's three-view of the SH-3 / Sea King, 46.0 px/m on the
     published 54 ft 9 in fuselage), and its station table is that file's own (the boat hull, the engine
     fairing, the tail cone and pylon); what is the SH-3's: the float sponsons on their struts with the
     main wheels under them [D side, front and top: float 3.2 m long, centres 1.89 m out, 0.82 m deep, the
     wheel 1.35 m ahead of the hub], NO dorsal radome (the hump of [D] is the Westland HAS's), the light
     gull grey of [S3] ("SH-3H Sea King HS-2 in flight 1987.JPEG": the float and its V strut, the twin
     intakes on the roof front, the five blades, the tail wheel).  x metres ahead of the hub, z over the
     ground (wheels on z = 0). */
  var SK = [
    [4.93, 1.55, 1.60, 1.57, 0.05, 0.08, 0.05, 0.8], [4.78, 1.20, 2.00, 1.60, 0.20, 0.55, 0.40, 0.7],
    [4.35, 0.85, 2.60, 1.50, 0.30, 0.86, 0.66, 0.6], [3.91, 0.65, 3.00, 1.40, 0.34, 0.98, 0.80, 0.5],
    [3.26, 0.61, 3.80, 1.40, 0.36, 1.02, 0.86, 0.45], [1.96, 0.61, 3.85, 1.40, 0.36, 1.02, 0.86, 0.4],
    [-1.52, 0.61, 3.75, 1.40, 0.36, 1.02, 0.86, 0.4], [-2.90, 0.61, 3.52, 1.40, 0.36, 1.02, 0.84, 0.4],
    [-5.85, 0.61, 3.52, 1.45, 0.36, 1.00, 0.80, 0.4], [-5.95, 1.48, 3.52, 2.20, 0.50, 0.92, 0.76, 0.5],
    [-7.83, 1.85, 3.50, 2.55, 0.32, 0.55, 0.46, 0.6], [-9.35, 2.24, 3.48, 2.80, 0.20, 0.35, 0.30, 0.7],
    [-10.0, 2.50, 3.98, 3.10, 0.16, 0.26, 0.20, 0.7], [-11.09, 3.50, 4.35, 3.85, 0.12, 0.20, 0.14, 0.7],
    [-11.74, 3.82, 4.30, 4.05, 0.08, 0.14, 0.08, 0.8]
  ];
  function buildSh3(THREE, M, C) {
    var T = heliMats(THREE, C, PAL.gull), B = bins(T, 0.25), G = bins(T, 0.5), g = new THREE.Group(), s, k;
    fus(B.paint, SK, 32);
    /* the engine fairing with the two round intakes at its front and the exhausts [D][S3] */
    fus(B.paint, [[0.80, 3.80, 3.86, 3.82, 0.60, 0.62, 0.40, 0.6], [0.20, 3.78, 4.30, 4.00, 0.70, 0.74, 0.50, 0.5],
                  [-0.20, 3.76, 4.57, 4.10, 0.72, 0.76, 0.52, 0.5], [-1.90, 3.70, 4.57, 4.05, 0.72, 0.76, 0.52, 0.5],
                  [-2.40, 3.62, 4.20, 3.90, 0.62, 0.66, 0.42, 0.5], [-2.83, 3.50, 3.60, 3.55, 0.50, 0.52, 0.30, 0.6]], 14);
    for (s = -1; s <= 1; s += 2) {
      cylX(B.paint, 0.55, 1.00, s * 0.34, 4.02, 0.24, 14); cylX(B.dark, 1.00, 1.02, s * 0.34, 4.02, 0.19, 12);
      cylY(B.dark, 0.0, s * 0.74, s * 0.80, 3.65, 0.20, 12); cylY(B.paint, 0.0, s * 0.70, s * 0.76, 3.65, 0.25, 12);
    }
    /* the glazing: the stepped windscreen, the cockpit side and chin windows, the cabin windows [D][S3] */
    for (s = -1; s <= 1; s += 2) {
      slab(B.glass, [4.24, s * 0.43, 2.68], unit([-0.6, 0, 0.55]), [0, 1, 0], unit([0.55, 0, 0.6]), 0.40, 0.33, 0.012);
      skinPanel(B.glass, SK, s, 3.05, 3.85, 2.30, 2.95, 0.005);
      skinPanel(B.glass, SK, s, 4.10, 4.55, 1.45, 2.05, 0.005);
      [[0.10, 0.87], [-0.98, -0.33], [-4.7, -4.0]].forEach(function (w) { skinPanel(B.glass, SK, s, w[0], w[1], 2.17, 2.72, 0.005); });
      skinPanel(B.dark, SK, s, 1.85, 2.80, 0.95, 2.95, 0.0);
      skinPanel(B.glass, SK, s, 2.05, 2.65, 2.35, 2.75, 0.01);
      /* the float sponson, its V strut and the stub, the main wheel under it [D][S3] */
      var fy = s * 1.89;
      body(B.paint, [[1.85, 0.98, 0.05, 0.05, 0.05, 1, fy], [1.65, 0.98, 0.30, 0.30, 0.28, 1, fy], [1.00, 1.00, 0.42, 0.36, 0.34, 1, fy],
                     [-0.40, 1.02, 0.40, 0.34, 0.32, 1, fy], [-1.20, 1.08, 0.22, 0.20, 0.18, 1, fy], [-1.37, 1.10, 0.05, 0.05, 0.05, 1, fy]], 14);
      prismX(B.paint, [[s * 0.95, 1.00], [s * 0.95, 1.40], [s * 1.60, 1.30], [s * 1.60, 1.05]], 1.25, -0.25);
      bar(B.paint, [0.9, s * 0.92, 3.10], [0.9, s * 1.82, 1.30], 0.07, 8);
      bar(B.paint, [-0.4, s * 0.92, 3.05], [0.4, s * 1.82, 1.30], 0.06, 8);
      box(B.dark, 1.10, 1.60, fy - 0.16, fy + 0.16, 0.62, 0.70);
      bar(G.metal, [1.35, fy, 0.75], [1.35, fy, 0.29], 0.06, 8);
      cylY(G.rubber, 1.35, fy - 0.11, fy + 0.11, 0.29, 0.29, 16);
      cylY(G.metal, 1.35, fy - 0.12, fy + 0.12, 0.29, 0.12, 10);
      box(B.team, -0.30, 0.40, fy - 0.15, fy + 0.15, 1.33, 1.345);
    }
    /* the tail wheel at the step [D][S3] */
    bar(G.metal, [-5.78, 0, 0.70], [-5.93, 0, 0.25], 0.06, 8);
    cylY(G.rubber, -5.93, -0.07, 0.07, 0.20, 0.20, 14);
    /* the tailplane (port side of the pylon in [D]'s top view; the tail rotor on the starboard side, as gb_misc2.js reads [D]), the gearbox fairing, aerials, the hoist */
    prismZ(B.paint, [[-10.95, 0.12], [-11.80, 0.12], [-11.70, 2.10], [-11.20, 2.10]], 3.92, 4.04);
    cylY(B.paint, -11.63, -0.10, -0.30, 4.20, 0.18, 12);
    whip(B.dark, -3.5, 0, 3.52, 0.6); whip(B.dark, -7.0, 0, 3.48, 0.5);
    box(B.dark, 2.6, 3.2, -0.95, -0.80, 3.30, 3.55); bar(B.dark, [2.9, -0.95, 3.40], [2.9, -1.30, 3.40], 0.04, 5);
    box(B.dark, 4.60, 4.75, -0.05, 0.05, 0.95, 1.10);
    cylZ(B.red, -7.5, 0, 3.49, 3.60, 0.07, 8); cylZ(B.red, 1.0, 0, 0.55, 0.62, 0.07, 8);
    box(B.team, -4.2, -3.0, -0.5, 0.5, 3.52, 3.535);
    /* panel seams along the boat hull and round the cabin */
    for (s = -1; s <= 1; s += 2) [3.26, 1.96, 0.40, -1.52, -2.9, -4.4, -5.85].forEach(function (x) { skinPanel(B.dark, SK, s, x - 0.015, x + 0.015, 0.80, 3.40, 0.0); });
    flush(THREE, g, B);
    var gear = grp(THREE, g, "gear"); flush(THREE, gear, G);
    mainRotor(THREE, g, T, { x: 0, z: 4.83, R: 9.45, chord: 0.46, nb: 5, phase: 36, root: 1.10, hub: 0.42, dome: true });
    tailRotor(THREE, g, T, { x: -11.63, y: -0.42, z: 4.20, R: 1.58, chord: 0.19, nb: 5, phase: 0, s: -1 });
    g.name = "nato_e60_aswhelo";
    return g;
  }

  /* ====================================================================== nato_e60_lamps: KAMAN SH-2F SEASPRITE
     [K3] "Kaman SH-2F Seasprite 3-view line drawing.png" (NAVAIR "Descriptive arrangement", dimensioned in
     feet): THE MEASURING DRAWING.  Side view 53.9 px/m on its printed 40.5 ft fuselage, plan 53.5 px/m on
     its 38.3 ft folded length, front 64 px/m on its 10 ft main track.  Printed: rotor 44 ft (13.41 m), tail
     rotor 8.2 ft, operating length 52.6 ft, height 13.6 ft to the rotor head, wheelbase 16.7 ft, stabiliser
     9.8 ft.  x metres ahead of the main hub, z over the ground. */
  var KS = [
    [3.80, 1.70, 1.82, 1.76, 0.04, 0.06, 0.04, 0.9], [3.65, 1.30, 2.15, 1.70, 0.30, 0.45, 0.30, 0.7],
    [3.30, 1.05, 2.65, 1.65, 0.50, 0.70, 0.45, 0.6], [2.80, 0.95, 3.15, 1.70, 0.62, 0.86, 0.62, 0.5],
    [2.20, 0.93, 3.30, 1.80, 0.66, 0.90, 0.70, 0.45], [1.00, 0.93, 3.40, 1.90, 0.66, 0.90, 0.75, 0.45],
    [-0.80, 0.95, 3.40, 1.95, 0.62, 0.88, 0.75, 0.45], [-1.35, 1.15, 3.20, 2.10, 0.45, 0.70, 0.55, 0.5],
    [-2.00, 1.35, 2.95, 2.20, 0.30, 0.48, 0.40, 0.6], [-4.50, 1.55, 2.62, 2.10, 0.20, 0.30, 0.24, 0.7],
    [-6.40, 1.70, 2.45, 2.10, 0.14, 0.20, 0.16, 0.7], [-6.90, 1.80, 2.95, 2.40, 0.12, 0.16, 0.12, 0.7],
    [-7.60, 2.40, 3.85, 3.20, 0.10, 0.13, 0.10, 0.75], [-8.20, 3.50, 4.10, 3.80, 0.06, 0.10, 0.06, 0.8]
  ];
  function buildSh2f(THREE, M, C) {
    var T = heliMats(THREE, C, PAL.gull), B = bins(T, 0.3), G = bins(T, 0.5), g = new THREE.Group(), s, k;
    fus(B.paint, KS, 32);
    /* the transmission and engine hump [K3 side 400-560 px] */
    fus(B.paint, [[1.60, 3.30, 3.35, 3.32, 0.55, 0.58, 0.40, 0.6], [1.10, 3.30, 3.85, 3.55, 0.62, 0.66, 0.45, 0.5],
                  [0.40, 3.30, 4.07, 3.60, 0.62, 0.66, 0.45, 0.5], [-1.30, 3.20, 3.95, 3.50, 0.58, 0.62, 0.40, 0.5],
                  [-1.90, 3.05, 3.15, 3.10, 0.40, 0.42, 0.30, 0.6]], 14);
    /* the two T58 nacelles on the cabin roof shoulders [K3 front: 0.92 m out, 3.05 m up] */
    for (s = -1; s <= 1; s += 2) {
      body(B.paint, [[1.20, 3.05, 0.08, 0.08, 0.08, 1, s * 0.92], [1.05, 3.05, 0.32, 0.32, 0.32, 1, s * 0.92], [-0.60, 3.05, 0.35, 0.35, 0.35, 1, s * 0.92], [-1.20, 3.05, 0.22, 0.22, 0.22, 1, s * 0.92], [-1.30, 3.05, 0.18, 0.18, 0.18, 1, s * 0.92]], 14);
      cylX(B.dark, 1.08, 1.12, s * 0.92, 3.05, 0.26, 12);
      cylX(B.dark, -1.35, -1.28, s * 0.92, 3.05, 0.16, 10);
      bar(B.paint, [0.4, s * 0.55, 3.05], [0.4, s * 0.70, 3.05], 0.12, 8);
    }
    /* glazing: the windscreen, the side windows, the chin windows; the cabin door [K3] */
    for (s = -1; s <= 1; s += 2) {
      slab(B.glass, [3.30, s * 0.38, 2.70], unit([-0.65, 0, 0.6]), [0, 1, 0], unit([0.6, 0, 0.65]), 0.42, 0.30, 0.012);
      skinPanel(B.glass, KS, s, 2.35, 3.05, 2.30, 3.05, 0.005);
      skinPanel(B.glass, KS, s, 3.20, 3.62, 1.35, 1.85, 0.005);
      skinPanel(B.dark, KS, s, 0.75, 1.65, 1.10, 3.05, 0.0);
      skinPanel(B.glass, KS, s, 1.05, 1.40, 2.35, 2.85, 0.01);
      [2.2, 1.7, 0.75, -0.80, -1.35].forEach(function (x) { skinPanel(B.dark, KS, s, x - 0.015, x + 0.015, 1.00, 3.30, 0.0); });
    }
    /* the main gear on its outriggers, the strut to the nacelle; the tail wheel [K3: 10 ft track, 16.7 ft base] */
    for (s = -1; s <= 1; s += 2) {
      var wy = s * 1.525;
      box(B.paint, 0.80, 1.30, s * 0.80, s * 1.40, 1.05, 1.30);
      bar(G.metal, [1.06, s * 1.30, 1.12], [1.06, wy, 0.32], 0.06, 8);
      bar(G.metal, [1.06, s * 0.90, 2.60], [1.06, s * 1.40, 1.20], 0.04, 6);
      cylY(G.rubber, 1.06, wy - 0.18, wy - 0.02, 0.30, 0.30, 14); cylY(G.rubber, 1.06, wy + 0.02, wy + 0.18, 0.30, 0.30, 14);
      cylY(G.metal, 1.06, wy - 0.19, wy + 0.19, 0.30, 0.11, 10);
    }
    bar(G.metal, [-4.0, 0, 1.52], [-4.2, 0, 0.22], 0.05, 8);
    cylY(G.rubber, -4.2, -0.07, 0.07, 0.21, 0.21, 14);
    /* the MAD bird on its pylon, starboard [K3 plan and front]; the torpedo on the port side [K3 side] */
    bar(B.paint, [0.0, -0.85, 2.10], [0.2, -1.75, 1.95], 0.06, 8);
    lathe(B.red, [[-0.95, 0.02], [-0.85, 0.12], [-0.60, 0.15], [0.60, 0.15], [0.85, 0.10], [0.95, 0.02]], 14, -1.83, 1.00);
    bar(B.metal, [0.2, -1.75, 1.95], [0.2, -1.83, 1.15], 0.03, 5);
    lathe(B.dark, [[-2.90, 0.03], [-2.70, 0.16], [0.80, 0.16], [0.95, 0.12], [1.00, 0.02]], 14, 0.85, 0.80);
    for (k = 0; k < 4; k++) { var a = (45 + 90 * k) * D2R; slab(B.dark, [-2.75, 0.85 + Math.cos(a) * 0.22, 0.80 + Math.sin(a) * 0.22], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)], 0.12, 0.08, 0.008); }
    box(B.paint, -1.4, -0.6, 0.65, 0.80, 0.95, 1.15);
    /* the stabiliser [K3 plan: 9.8 ft at x -7.25], the fin's tail-rotor gearbox, aerials, the nose probe */
    prismZ(B.paint, [[-7.00, -1.50], [-7.50, -1.50], [-7.50, 1.50], [-7.00, 1.50]], 2.30, 2.38);
    for (s = -1; s <= 1; s += 2) prismX(B.paint, [[s * 1.49, 2.10], [s * 1.53, 2.10], [s * 1.53, 2.70], [s * 1.49, 2.70]], -7.05, -7.45);
    cylY(B.paint, -7.93, 0.05, 0.25, 3.80, 0.15, 10);
    whip(B.dark, -2.6, 0, 2.95, 0.6); whip(B.dark, -5.0, 0, 2.6, 0.45);
    cylZ(B.red, -3.0, 0, 2.90, 3.00, 0.06, 8);
    box(B.team, -3.8, -2.8, -0.22, 0.22, 2.75, 2.76);
    for (s = -1; s <= 1; s += 2) box(B.team, -7.4, -7.1, s * 1.1 - 0.25, s * 1.1 + 0.25, 2.38, 2.39);
    flush(THREE, g, B);
    var gear = grp(THREE, g, "gear"); flush(THREE, gear, G);
    mainRotor(THREE, g, T, { x: 0, z: 4.26, R: 6.705, chord: 0.62, nb: 4, phase: 45, root: 0.80, hub: 0.32, dome: false, flap: true });
    tailRotor(THREE, g, T, { x: -7.93, y: 0.35, z: 3.80, R: 1.25, chord: 0.18, nb: 4, phase: 15, s: 1 });
    g.name = "nato_e60_lamps";
    return g;
  }

  /* ====================================================================== TRUCK AND LAUNCHER PIECES */
  /* a forward-control cab: rear wall x0, front face x1, half width w, floor zf, roof zr; the windscreen band
     from zw to zr - 0.12; wins: side windows [[xa, xb], ...]; lamps at zl */
  function cabFC(B, o) {
    var s, k, x0 = o.x0, x1 = o.x1, w = o.w, zf = o.zf, zr = o.zr, zw = o.zw;
    prismY(B.paint, [[x0, zf], [x1 - 0.05, zf], [x1, zf + 0.10], [x1, zw], [x1 - 0.22, zr - 0.06], [x1 - 0.30, zr], [x0, zr]], -w, w);
    box(B.paint, x0 + 0.10, x1 - 0.40, -w + 0.12, w - 0.12, zr, zr + 0.06);
    var ang = Math.atan2(0.22, zr - 0.06 - zw), L = (zr - 0.12 - zw) / Math.cos(ang);
    for (s = -1; s <= 1; s += 2) {
      slab(B.glass, [x1 - 0.11 + 0.035, s * w * 0.48, zw + 0.03 + L * 0.5 * Math.cos(ang)], [-Math.sin(ang), 0, Math.cos(ang)], [0, 1, 0], [Math.cos(ang), 0, Math.sin(ang)], L * 0.5 - 0.04, w * 0.44, 0.012);
      bar(B.dark, [x1 + 0.01, s * w * 0.15, zw + 0.05], [x1 - 0.02, s * w * 0.75, zw + 0.30], 0.012, 4);
      (o.wins || []).forEach(function (q) { sideBox(B.glass, s, w, 0.012, q[0], q[1], zw - 0.05, zr - 0.22); sideBox(B.dark, s, w, 0.008, q[0] - 0.04, q[1] + 0.04, zw - 0.09, zr - 0.18); });
      /* the door seam, its handle, the steps under it, the mirror on its arm */
      var xd = o.door || (x1 - 0.95);
      sideBox(B.dark, s, w, 0.010, xd - 0.01, xd + 0.01, zf + 0.10, zr - 0.10);
      sideBox(B.dark, s, w, 0.03, xd + 0.10, xd + 0.24, zw - 0.25, zw - 0.20);
      for (k = 0; k < 2; k++) box(B.dark, xd + 0.05, xd + 0.65, s * (w - 0.18) - 0.10, s * (w - 0.18) + 0.10, zf - 0.32 - k * 0.30, zf - 0.27 - k * 0.30);
      bar(B.dark, [x1 - 0.20, s * w, zr - 0.25], [x1 + 0.05, s * (w + 0.25), zr - 0.10], 0.02, 4);
      box(B.dark, x1, x1 + 0.08, s * (w + 0.18), s * (w + 0.34), zw - 0.10, zr - 0.15);
      /* lamp clusters at the front corners, amber marker lamps above, their guards */
      headlamp(B.lamp, B.dark, x1 + 0.02, s * (w - 0.30), o.zl, 0.11, 1);
      cyl(B.red, [x1, s * (w - 0.10), o.zl + 0.25], [x1 + 0.03, s * (w - 0.10), o.zl + 0.25], 0.05, 0.05, 8);
      sideBox(B.team, s, w, 0.012, x0 + 0.15, x0 + 0.55, zr - 0.30, zr - 0.18);
    }
    /* grille, bumper and its tow hooks, the roof beacon and box */
    box(B.dark, x1 - 0.01, x1 + 0.015, -w * 0.45, w * 0.45, o.zl - 0.18, zw - 0.10);
    for (k = 0; k < 6; k++) box(B.paint, x1 + 0.01, x1 + 0.035, -w * 0.43, w * 0.43, o.zl - 0.15 + k * (zw - o.zl - 0.05) / 6, o.zl - 0.13 + k * (zw - o.zl - 0.05) / 6);
    box(B.paint, x1 - 0.05, x1 + 0.18, -w + 0.02, w - 0.02, zf - 0.20, zf + 0.22);
    for (s = -1; s <= 1; s += 2) towHook(B.dark, x1 + 0.22, s * 0.55, zf - 0.05, 1);
    cylZ(B.red, x1 - 0.70, 0, zr + 0.06, zr + 0.20, 0.08, 8);
    box(B.dark, x1 - 0.90, x1 - 0.45, -0.40, 0.40, zr + 0.06, zr + 0.16);
  }
  /* chassis rails, the axle housings under them, mudguards over every tyre */
  function chassis(B, x0, x1, zr, AX, RT, TY, w) {
    for (var s = -1; s <= 1; s += 2) box(B.dark, x0, x1, s * 0.45 - 0.08, s * 0.45 + 0.08, zr - 0.30, zr);
    AX.forEach(function (ax) {
      box(B.dark, ax - 0.14, ax + 0.14, -0.50, 0.50, RT - 0.10, zr - 0.30);
      for (var s2 = -1; s2 <= 1; s2 += 2) mudguard(B.paint, ax, s2, TY - 0.20, Math.min(w, TY + 0.22), RT, RT + 0.08, 0.35, PI - 0.35);
    });
  }
  /* an equipment box on a side with its door, hinges, handle and louvres */
  function locker(B, s, y, x0, x1, z0, z1, louvres) {
    sideBox(B.dark, s, y, 0.010, x0, x1, z0, z1);
    sideBox(B.paint, s, y + 0.010, 0.010, x0 + 0.03, x1 - 0.03, z0 + 0.03, z1 - 0.03);
    sideBox(B.dark, s, y + 0.020, 0.025, x1 - 0.14, x1 - 0.06, (z0 + z1) / 2 - 0.03, (z0 + z1) / 2 + 0.03);
    sideBox(B.dark, s, y + 0.020, 0.02, x0 + 0.04, x0 + 0.08, z1 - 0.15, z1 - 0.06); sideBox(B.dark, s, y + 0.020, 0.02, x0 + 0.04, x0 + 0.08, z0 + 0.06, z0 + 0.15);
    if (louvres) for (var k = 0; k < louvres; k++) sideBox(B.dark, s, y + 0.020, 0.012, x0 + 0.10, x1 - 0.20, z1 - 0.12 - k * 0.07, z1 - 0.09 - k * 0.07);
  }
  /* a ballistic round lying along +x in its own frame from tail x 0 to the tip x L, radius r: the body, the
     joint bands, the nose cone of length nl to a rounded tip */
  function ballisticRound(B, L, r, nl, bands) {
    lathe(B.paint, [[-0.02, 0.01], [0, r * 0.92], [0.06, r], [L - nl, r], [L - nl * 0.55, r * 0.74], [L - nl * 0.18, r * 0.32], [L - 0.03, r * 0.08], [L, 0.01]], 24);
    (bands || []).forEach(function (b) { cyl(B.dark, [b, 0, 0], [b + 0.05, 0, 0], r + 0.012, r + 0.012, 24); });
    cyl(B.dark, [-0.03, 0, 0], [0.0, 0, 0], r * 0.85, r * 0.85, 20);
  }
  /* a laid launcher: a "podelev" group hinged at (hx, hz), userData.el and cells (render3d poseLauncher) */
  function podGroup(THREE, g, hx, hz, el, cells) {
    var E = grp(THREE, g, "podelev", hx, 0, hz);
    E.userData.el = el * D2R; E.userData.cells = cells;
    return E;
  }

  /* ====================================================================== pla_e00_df21d, pla_e00_df26: THE TELs
     [DF1] "Dongfeng-21D.JPG" and [DF2] "Dong-Feng 26.JPG" (the 2015 parade, both from the same street corner
     as the columns passed: the traffic warden in both stands in the same place), near side-on, starboard.
     SCALE: [DF1]'s round, canister tail to the tip of the exposed nose (185 to 1015 px), is taken as the
     published 10.7 m DF-21 (en.wikipedia "DF-21"; NOT CONFIRMED that the canister ends at the round's tail):
     77.6 px/m.  [DF2], taken from the same place of a vehicle in the same lane, is read at the same scale
     (NOT CONFIRMED; no DF-26 or carrier dimension is published - en.wikipedia "DF-26" leaves them blank).
     That gives the tyre 1.22 m in both photographs, which agrees.  Measured: DF-21D TEL 11.28 m, five axles
     (three aft, two forward under the cab), the round's canister lying 3 degrees nose-up between the body
     sides, its pale nose cone out ahead over the cab; DF-26 TEL 12.76 m, six axles (four aft, two forward),
     the round (12.4 m) lying bare on top, 1.6 degrees nose-up, the tip over the cab.  The cab roofs read
     2.06 m and 2.14 m off the photographs; they are drawn so, though they look low for these trucks (the
     cabs are farther from the camera than the rounds: NOT CONFIRMED).  Nodes: the "roadwheel" axle groups;
     "podelev" (the round and its cradle, hinged at the rear of the frame; userData.el raises it upright).
     Not drawn (no photograph): jacks, the erector's rams, the cab's far side. */
  var TELV = {
    df21d: { key: "pla_e00_df21d", L: 11.28, AX: [-4.67, -3.00, -1.19, 2.16, 3.96], RT: 0.61, TY: 1.17, W: 1.45,
             cab: { x0: 3.30, x1: 5.64, zf: 1.05, zr: 2.06, zw: 1.45, zl: 1.15, wins: [[3.55, 4.05], [4.25, 4.55]] },
             body: { x0: -5.64, x1: 3.25, top: 1.93, foot: 1.03 }, hx: -5.40, hz: 1.45, pitch: 3.1,
             rd: { tail: -5.64, L: 10.70, r: 0.70, can: 0.85, canL: 10.0, nl: 1.30, zt: 1.34 } },
    df26:  { key: "pla_e00_df26", L: 12.76, AX: [-4.70, -3.54, -2.32, -0.97, 2.06, 3.61], RT: 0.61, TY: 1.17, W: 1.45,
             cab: { x0: 3.92, x1: 6.38, zf: 1.05, zr: 2.14, zw: 1.50, zl: 1.15, wins: [[4.10, 4.60], [4.80, 5.30]] },
             body: { x0: -6.38, x1: 3.88, top: 2.36, foot: 1.26 }, hx: -6.10, hz: 1.80, pitch: 1.6,
             rd: { tail: -6.38, L: 12.44, r: 0.70, can: 0, nl: 2.40, zt: 1.92 } }
  };
  function buildTel(THREE, M, C, v) {
    var V = TELV[v], T = mats(THREE, C, PAL.pla), B = bins(T, 0.25), g = new THREE.Group(), s, k, b = V.body, R = V.rd;
    cabFC(B, Object.assign({ w: V.W }, V.cab));
    chassis(B, b.x0 + 0.10, V.cab.x0, 1.05, V.AX, V.RT, V.TY, V.W);
    /* the body: the long equipment sides with their lockers, the ladders, the deck between them [DF1][DF2] */
    var segs = [], xa = b.x0;
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, b.x0, b.x1, s > 0 ? V.W - 0.55 : -V.W, s > 0 ? V.W : -V.W + 0.55, b.foot + 0.25, b.top);
      for (k = 0; k < V.AX.length; k++) if (V.AX[k] < V.cab.x0) box(B.dark, V.AX[k] - 0.72, V.AX[k] + 0.72, s > 0 ? V.W - 0.56 : -V.W - 0.01, s > 0 ? V.W + 0.01 : -V.W + 0.56, b.foot - 0.10, b.foot + 0.26);
      var nx = Math.floor((b.x1 - b.x0 - 0.4) / 1.25);
      for (k = 0; k < nx; k++) {
        var x0 = b.x0 + 0.2 + k * 1.25;
        locker(B, s, V.W, x0, x0 + 1.15, b.foot + 0.32, b.top - 0.12, k % 3 === 1 ? 4 : 0);
      }
      ladderX(B.dark, b.x1 - 0.55, s * (V.W + 0.06), b.foot - 0.3, b.top);
      grab(B.dark, b.x0 + 1.0, b.x1 - 1.0, s * (V.W - 0.08), b.top, 0.10);
      sideBox(B.team, s, V.W, 0.015, b.x0 + 2.5, b.x0 + 3.6, b.top - 0.10, b.top - 0.02);
      box(B.red, b.x0 - 0.02, b.x0 + 0.01, s * 1.20 - 0.07, s * 1.20 + 0.07, b.foot + 0.10, b.foot + 0.22);
    }
    box(B.paint, b.x0, b.x1, -V.W + 0.55, V.W - 0.55, b.foot + 0.25, b.foot + 0.45);
    box(B.paint, b.x0 - 0.02, b.x0 + 0.08, -V.W, V.W, b.foot, b.top - 0.20);
    for (k = 0; k < 2; k++) box(B.dark, b.x0 - 0.04, b.x0, -0.9 + k * 1.2, -0.3 + k * 1.2, b.foot + 0.15, b.top - 0.40);
    /* hinge brackets at the rear of the frame */
    for (s = -1; s <= 1; s += 2) { box(B.dark, V.hx - 0.25, V.hx + 0.25, s * 0.55 - 0.08, s * 0.55 + 0.08, b.foot + 0.45, V.hz + 0.05); cylY(B.dark, V.hx, s * 0.45, s * 0.65, V.hz, 0.10, 10); }
    flush(THREE, g, B);
    addAxles(THREE, g, T, V.AX, V.RT, 0.22, V.TY, PAL.pla.base);
    /* the round on its cradle, in the "podelev" frame (origin on the hinge) */
    var p = V.pitch * D2R, axz = R.zt - V.hz, xt = R.tail - V.hx;
    var E = podGroup(THREE, g, V.hx, V.hz, 90 - V.pitch, [[xt + 1.5 * Math.cos(p), 0, axz + 1.5 * Math.sin(p), xt - 0.3]]);
    var RG = new THREE.Group(); RG.position.set(xt, 0, axz); RG.rotation.y = -p; E.add(RG);
    var NB = bins(T, 0.25), rr = R.can || R.r;
    if (R.can) {
      /* DF-21D: the canister, its hoops and end ring; the pale nose cone out of its front [DF1] */
      lathe(NB.paint, [[0, 0.01], [0, R.can], [R.canL, R.can], [R.canL, R.can * 0.75], [R.canL + 0.01, 0.01]], 24);
      for (k = 0; k < 7; k++) cyl(NB.dark, [0.6 + k * 1.45, 0, 0], [0.68 + k * 1.45, 0, 0], R.can + 0.02, R.can + 0.02, 24);
      lathe(NB.lamp, [[R.canL, R.can * 0.70], [R.canL + 0.25, R.can * 0.66], [R.L - 0.45, 0.22], [R.L - 0.08, 0.07], [R.L, 0.01]], 20);
      for (s = -1; s <= 1; s += 2) box(NB.dark, 0.3, R.canL - 0.3, s * (R.can + 0.02) - 0.03, s * (R.can + 0.02) + 0.03, -0.30, 0.10);
      box(NB.team, 4.0, 5.2, -0.25, 0.25, R.can - 0.02, R.can + 0.01);
    } else {
      /* DF-26: the bare round - the two stages' joint bands, the long nose; the cradle clamps [DF2] */
      ballisticRound(NB, R.L, R.r, R.nl, [3.4, 6.9, 9.6]);
      for (k = 0; k < 4; k++) { var cx = 1.0 + k * 2.8; cyl(NB.dark, [cx, 0, 0], [cx + 0.18, 0, 0], R.r + 0.04, R.r + 0.04, 24); box(NB.dark, cx, cx + 0.18, -R.r - 0.05, R.r + 0.05, -R.r - 0.25, -R.r + 0.05); }
      box(NB.team, 5.0, 6.0, -0.22, 0.22, R.r - 0.03, R.r + 0.005);
    }
    /* the cradle beam under the round, down to the hinge (in the round's frame) */
    box(NB.dark, 0.0, R.L * 0.8, -0.35, 0.35, -rr - 0.25, -rr - 0.02);
    for (s = -1; s <= 1; s += 2) bar(NB.paint, [-xt, s * 0.45, -axz], [1.0, s * 0.35, -rr - 0.12], 0.08, 6);
    cylY(NB.dark, -xt, -0.45, 0.45, -axz, 0.11, 12);
    flush(THREE, RG, NB);
    g.name = V.key;
    return g;
  }

  /* ====================================================================== pla_e00_coastssm: YJ-62 ON THE WS2400
     [Y1] "YJ-62 Anti-ship missiles 20170716.jpg" (Beijing Military Museum, the shore launcher, port front 3/4;
     cached for js/hero/pla_phl03.js): the WS2400 8x8 with its full-width cab, the bar guard and the grille,
     two axles close under and behind the cab, the long gap, two close at the rear; the tall equipment cabin
     behind the cab; the canister pack over the rear - two canisters side by side low with one over them,
     their banded bodies, round ends.  Scale: the published WS2400 11.44 x 3.05 x 2.97 m (en.wikipedia
     "WS2400", as js/hero/pla_ground_modern.js gives it).  The canister 7.05 m x 0.80 m (from the frame's end to the cabin's back, where [Y1] has its caps) (the round is 7 m with
     its booster, 0.28 m without wings, 2.9 m span folded in it: en.wikipedia "YJ-62"; the canister's own size
     NOT CONFIRMED, from [Y1]'s proportions).  The pack is drawn level for the road and laid to 15 degrees to
     fire (NOT CONFIRMED: no photograph raised); the hinge at the rear of the frame. */
  function buildYj62(THREE, M, C) {
    var T = mats(THREE, C, PAL.pla), B = bins(T, 0.25), g = new THREE.Group(), s, k;
    var AX = [3.55, 2.10, -2.60, -4.05], W = 1.52, ZF = 1.05;
    cabFC(B, { x0: 3.40, x1: 5.72, w: W, zf: ZF, zr: 2.97, zw: 2.05, zl: 1.30, wins: [[3.65, 4.20]], door: 4.55 });
    chassis(B, -5.70, 3.40, 1.05, AX, 0.60, 1.20, W);
    /* the equipment cabin behind the cab, its roof chamfered down at the front, the air conditioner [Y1] */
    prismY(B.paint, [[1.40, ZF], [3.35, ZF], [3.35, 2.75], [3.05, 3.05], [1.40, 3.05]], -W, W);
    for (s = -1; s <= 1; s += 2) { locker(B, s, W, 1.55, 2.35, 1.30, 2.85, 0); locker(B, s, W, 2.45, 3.25, 1.30, 2.85, 5); ladderX(B.dark, 1.30, s * (W + 0.05), 0.5, 3.05); }
    box(B.dark, 1.70, 2.60, -0.55, 0.55, 3.05, 3.40);
    /* the rear deck, its side lockers and the cradle posts [Y1] */
    box(B.paint, -5.72, 1.40, -W, W, ZF, 1.40);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) locker(B, s, W, -5.4 + k * 1.45, -4.1 + k * 1.45, ZF + 0.03, 1.37, 0);
      box(B.dark, -5.70, -5.45, s * 1.0 - 0.10, s * 1.0 + 0.10, 1.40, 1.75);
      box(B.dark, 0.90, 1.20, s * 1.1 - 0.10, s * 1.1 + 0.10, 1.40, 1.60);
      box(B.red, -5.74, -5.70, s * 1.25 - 0.07, s * 1.25 + 0.07, 1.10, 1.22);
      sideBox(B.team, s, W, 0.015, 2.0, 2.9, 2.92, 3.00);
    }
    flush(THREE, g, B);
    addAxles(THREE, g, T, AX, 0.60, 0.22, 1.20, PAL.pla.base);
    /* the pack: canisters along +x from the hinge, two low and one high [Y1] */
    var CL = 7.05, CR = 0.40, hx = -5.72, hz = 1.75, cy = [[0.45, CR + 0.05], [-0.45, CR + 0.05], [0, CR * 2.7 + 0.10]];
    var E = podGroup(THREE, g, hx, hz, 15, cy.map(function (c) { return [CL + 0.05, c[0], c[1], -0.10]; }));
    var EB = bins(T, 0.25);
    cy.forEach(function (c) {
      lathe(EB.paint, [[-0.05, 0.01], [-0.02, CR * 0.85], [0.05, CR], [CL - 0.05, CR], [CL, CR * 0.85], [CL + 0.03, 0.01]], 20, c[0], c[1]);
      for (k = 0; k < 8; k++) cyl(EB.dark, [0.30 + k * 0.85, c[0], c[1]], [0.36 + k * 0.85, c[0], c[1]], CR + 0.02, CR + 0.02, 20);
    });
    box(EB.dark, 0.2, CL - 0.2, -0.85, 0.85, 0.0, 0.06);
    for (k = 0; k < 3; k++) { var x = 0.8 + k * 3.0; box(EB.paint, x, x + 0.25, -0.95, 0.95, 0.0, CR * 2 + 0.15); box(EB.paint, x, x + 0.25, -0.40, 0.40, CR * 2, CR * 3.7 + 0.10); }
    cylY(EB.dark, 0, -0.9, 0.9, 0, 0.10, 12);
    box(EB.team, 3.4, 4.4, -0.2, 0.2, CR * 3.7 + 0.08, CR * 3.7 + 0.10);
    flush(THREE, E, EB);
    g.name = "pla_e00_coastssm";
    return g;
  }

  /* ====================================================================== pla_e80_coastssm: HY-2A ON ITS TOWED LAUNCHER
     [H1] "HY-2A Missile 20170919.jpg" (Beijing Military Museum, the HY-2A from the port side, near side-on):
     the round - the long cylinder with the rounded radome, the delta wings mid-body, the swept fin on top
     of the tail, the solid booster slung under the rear.  Ratios off [H1] scaled to the published 7.36 m x
     0.76 m (ru.wikipedia, the HY-2 article): radome 0.85 m, wing root 2.7 m from 4.6 m ahead of the tail, booster
     1.9 m x 0.50 m under the rear.  [H2] the PLA Navy Museum's HY-2 launcher (Commons, its title in Chinese):
     the towed launcher, port front 3/4 - two axles on twin tyres, the deck with its cabinets and the
     elevating mechanism, the long box-girder rail laid up at about 15 degrees with the round on it and the
     forward cradle with its blast-deflecting plates; the screw jacks down on their pads.  [HB-A201]
     ("CSSC-3 SEERSUCKER", the handbook's two-view of the round) agrees on the layout of the round.  The
     launcher's size: NOT CONFIRMED (no figure; set to the round: 7.9 m over the rail, 2.6 m wide, from [H2]'s
     proportions).  Poses: "travelpose" jacks up, "deploypose" jacks down on pads [H2] (render3d shows one by
     e.deployed); "podelev" the rail and round, laid to 15 degrees [H2].  No tractor is drawn: no photograph. */
  function hy2Round(B, x0, z0) {
    var L = 7.36, r = 0.38;
    lathe(B.paint, [[x0, 0.01], [x0, r * 0.80], [x0 + 0.12, r * 0.95], [x0 + L - 0.85, r], [x0 + L - 0.45, r * 0.86], [x0 + L - 0.15, r * 0.50], [x0 + L, 0.02]], 22, 0, z0);
    lathe(B.lamp, [[x0 + L - 0.86, r * 1.01], [x0 + L - 0.80, r * 1.01], [x0 + L - 0.79, 0.01]], 22, 0, z0);
    /* the delta wings, flat either side */
    for (var s2 = -1; s2 <= 1; s2 += 2) prismZ(B.paint, [[x0 + 4.6, s2 * r * 0.9], [x0 + 1.9, s2 * r * 0.9], [x0 + 2.0, s2 * 1.20], [x0 + 2.4, s2 * 1.20]], z0 - 0.03, z0 + 0.03);
    /* the tail fin on top, the two tailplanes */
    prismY(B.paint, [[x0 + 0.05, z0 + r * 0.8], [x0 + 0.85, z0 + r * 0.8], [x0 + 0.30, z0 + r + 0.62], [x0 + 0.05, z0 + r + 0.62]], -0.025, 0.025);
    for (var s3 = -1; s3 <= 1; s3 += 2) prismZ(B.paint, [[x0 + 0.70, s3 * r * 0.8], [x0 + 0.05, s3 * r * 0.8], [x0 + 0.02, s3 * 0.90], [x0 + 0.30, s3 * 0.90]], z0 - 0.02, z0 + 0.02);
    /* the booster under the rear, its nozzle and fins */
    lathe(B.dark, [[x0 - 0.15, 0.10], [x0, 0.25], [x0 + 0.1, 0.25], [x0 + 1.9, 0.25], [x0 + 2.05, 0.12], [x0 + 2.1, 0.01]], 14, 0, z0 - r - 0.27);
    cyl(B.dark, [x0 - 0.35, 0, z0 - r - 0.27], [x0 - 0.10, 0, z0 - r - 0.27], 0.17, 0.12, 12);
  }
  function buildHy2(THREE, M, C) {
    var T = mats(THREE, C, PAL.pla);
    var B = bins(T, 0.3), g = new THREE.Group(), s, k, AX = [2.35, -2.10], ZD = 1.25, W = 1.30;
    /* the trailer: the deck, the drawbar, the cabinets, the turntable and the elevating gear [H2] */
    box(B.paint, -3.30, 3.20, -W, W, ZD - 0.30, ZD);
    for (s = -1; s <= 1; s += 2) box(B.dark, -3.30, 3.20, s * 0.55 - 0.10, s * 0.55 + 0.10, ZD - 0.55, ZD - 0.30);
    bar(B.dark, [3.20, 0.45, ZD - 0.40], [4.40, 0, 0.75], 0.07, 8); bar(B.dark, [3.20, -0.45, ZD - 0.40], [4.40, 0, 0.75], 0.07, 8);
    cyl(B.dark, [4.40, 0, 0.75], [4.55, 0, 0.75], 0.10, 0.10, 10);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -0.20, 1.60, s * W - (s > 0 ? 0.55 : 0), s * W + (s > 0 ? 0 : 0.55), ZD, ZD + 1.15);
      locker(B, s, W, -0.15, 0.70, ZD + 0.06, ZD + 1.10, 0); locker(B, s, W, 0.72, 1.55, ZD + 0.06, ZD + 1.10, 0);
      box(B.paint, -2.8, -1.4, s * W - (s > 0 ? 0.45 : 0), s * W + (s > 0 ? 0 : 0.45), ZD, ZD + 0.55);
      AX.forEach(function (ax) { mudguard(B.paint, ax, s, 0.60, W + 0.02, 0.55, 0.62, 0.3, PI - 0.3); });
      sideBox(B.team, s, W, 0.015, -2.7, -1.6, ZD + 0.40, ZD + 0.50);
      box(B.red, -3.32, -3.30, s * 1.0 - 0.07, s * 1.0 + 0.07, ZD - 0.25, ZD - 0.12);
    }
    cylZ(B.paint, -0.6, 0, ZD, ZD + 0.35, 1.00, 20);
    for (s = -1; s <= 1; s += 2) { box(B.paint, -2.0, -1.4, s * 0.62 - 0.12, s * 0.62 + 0.12, ZD + 0.35, ZD + 1.25); bar(B.metal, [-0.2, s * 0.40, ZD + 0.35], [-0.8, s * 0.40, ZD + 1.20], 0.08, 8); }
    flush(THREE, g, B);
    addAxles(THREE, g, T, AX, 0.55, 0.20, 1.05, PAL.pla.base, [true, true]);
    /* the jacks: up on the march, down on their pads set up [H2] */
    var trv = grp(THREE, g, "travelpose"), dep = grp(THREE, g, "deploypose"), JT = bins(T, 0.3), JD = bins(T, 0.3);
    [[3.0, 1.05], [-3.1, 1.05]].forEach(function (j) {
      for (s = -1; s <= 1; s += 2) {
        cylZ(JT.dark, j[0], s * j[1], ZD - 0.40, ZD + 0.10, 0.08, 8);
        cylZ(JD.dark, j[0], s * j[1], 0.10, ZD + 0.10, 0.08, 8); cylZ(JD.dark, j[0], s * j[1], 0.0, 0.10, 0.25, 12);
      }
    });
    flush(THREE, trv, JT); flush(THREE, dep, JD); dep.visible = false;
    /* the rail and the round on it, hinged at the rear of the elevating gear */
    var hx = -1.70, hz = ZD + 1.25, E = podGroup(THREE, g, hx, hz, 15, [[7.0, 0, 0.82, 0.2]]), EB = bins(T, 0.3);
    box(EB.paint, -0.30, 6.10, -0.30, 0.30, 0.0, 0.32);
    box(EB.dark, -0.30, 6.10, -0.10, 0.10, 0.32, 0.38);
    for (k = 0; k < 5; k++) for (s = -1; s <= 1; s += 2) sideBox(EB.dark, s, 0.30, 0.01, 0.3 + k * 1.2, 0.6 + k * 1.2, 0.04, 0.28);
    /* the forward cradle with its flared blast plates [H2] */
    for (s = -1; s <= 1; s += 2) prismX(EB.paint, [[s * 0.30, 0.0], [s * 0.85, 0.15], [s * 0.85, 1.05], [s * 0.30, 0.80]], 4.40, 5.90);
    box(EB.paint, 4.40, 5.90, -0.85, 0.85, -0.10, 0.02);
    cylY(EB.dark, 0, -0.5, 0.5, 0, 0.12, 12);
    hy2Round(EB, -0.70, 0.82);
    flush(THREE, E, EB);
    g.name = "pla_e80_coastssm";
    return g;
  }

  /* ====================================================================== nato_e20_coastssm: NMESIS
     [N1] "Navy-Marine Expeditionary Ship Interdiction System Transported on Okinawa (9764067).jpg" (DVIDS,
     public domain; port front 3/4): the cabless ROGUE-Fires carrier on the JLTV's running gear - the JLTV's
     bonnet with its grille, lamp clusters and brush bar, the big tyres, the electronics box and the antenna
     masts where the cab would be, the flat bed with the launcher, two grey NSM canisters side by side.
     [N2] "12th Marine Littoral Regiment conducts ... Training (9845688).jpg": head-on from ahead, the two
     canisters spanning the bed.  Published (en.wikipedia "Joint Light Tactical Vehicle"): 20.5 ft x 8.2 ft
     x 8.5 ft nominal (6.25 x 2.50 x 2.59 m); NSM 3.96 m with its booster (en.wikipedia "Naval Strike
     Missile").  Canister 4.30 x 1.05 x 0.95 m from [N1] against the 2.50 m width (NOT CONFIRMED).  The tyre
     1.10 m off [N1] against the width (NOT CONFIRMED).  "podelev": the canisters, laid to 30 degrees to fire
     (NOT CONFIRMED). */
  function buildNmesis(THREE, M, C) {
    var T = mats(THREE, C, PAL.usmc, { can: function (TT) { var m = new TT.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, metalness: 0.15 }); var t = paintTex(TT, PAL.can); if (t) m.map = t; else m.color.set(PAL.can.base); return m; } });
    var B = bins(T, 0.4), g = new THREE.Group(), s, k, AX = [1.85, -1.75], RT = 0.55, W = 1.25;
    /* the bonnet: the sloped top, the grille with the louvres, the lamp clusters, the brush bar [N1][N2] */
    prismY(B.paint, [[1.05, 0.70], [3.05, 0.70], [3.12, 0.95], [3.05, 1.42], [2.70, 1.62], [1.05, 1.72]], -0.95, 0.95);
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[1.10, 0.95], [2.95, 0.95], [3.02, 1.10], [2.90, 1.45], [1.10, 1.55]], s > 0 ? 0.95 : -W, s > 0 ? W : -0.95);
      headlamp(B.lamp, B.dark, 3.06, s * 0.70, 1.20, 0.08, 1);
      cyl(B.red, [3.04, s * 0.92, 1.20], [3.07, s * 0.92, 1.20], 0.04, 0.04, 8);
      towHook(B.dark, 3.15, s * 0.45, 0.85, 1);
      mudguard(B.paint, AX[0], s, 0.80, W + 0.05, RT, RT + 0.12, 0.30, PI - 0.25);
      mudguard(B.paint, AX[1], s, 0.80, W + 0.05, RT, RT + 0.12, 0.25, PI - 0.30);
    }
    for (k = 0; k < 6; k++) box(B.dark, 3.06, 3.09, -0.45, 0.45, 1.00 + k * 0.06, 1.03 + k * 0.06);
    bar(B.dark, [3.30, -0.85, 0.80], [3.30, 0.85, 0.80], 0.06, 8);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [3.10, s * 0.75, 0.80], [3.30, s * 0.75, 0.80], 0.05, 6);
    box(B.dark, 2.10, 2.70, -0.60, 0.60, 1.62, 1.68);
    /* where the cab would be: the electronics box, its hatch, the mast with its sensors, whips [N1] */
    box(B.paint, 0.20, 1.10, -0.70, 0.70, 0.95, 2.05);
    box(B.dark, 0.25, 1.05, -0.72, 0.72, 1.85, 1.90);
    hatch(B.paint, 0.65, 0, 2.05, 0.6, 0.9);
    cylZ(B.dark, 0.95, 0.45, 2.05, 2.75, 0.05, 6); box(B.dark, 0.85, 1.05, 0.30, 0.60, 2.75, 2.95);
    whip(B.dark, 0.35, 0.65, 2.05, 1.8); whip(B.dark, 0.35, -0.65, 2.05, 1.5); whip(B.dark, 1.0, -0.55, 2.05, 0.9);
    for (s = -1; s <= 1; s += 2) { box(B.dark, 1.15, 1.45, s * 1.20, s * 1.42, 1.40, 1.75); bar(B.dark, [1.10, s * 1.0, 1.70], [1.30, s * 1.25, 1.70], 0.02, 4); }
    /* the bed, its sides, the launcher frame [N1] */
    box(B.paint, -3.10, 0.15, -W, W, 0.85, 1.05);
    box(B.dark, -3.0, 0.1, -0.45, 0.45, 0.55, 0.85);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 3; k++) locker(B, s, W, -2.95 + k * 1.0, -2.05 + k * 1.0, 0.62, 1.02, 0);
      box(B.dark, -3.0, -2.6, s * 0.75 - 0.08, s * 0.75 + 0.08, 1.05, 1.45);
      box(B.red, -3.12, -3.09, s * 1.05 - 0.06, s * 1.05 + 0.06, 0.88, 0.98);
      sideBox(B.team, s, W, 0.015, -1.0, 0.0, 0.95, 1.03);
      jerrycan(B.dark, -0.20, s * 1.0, 1.05);
    }
    towHook(B.dark, -3.18, 0, 0.75, -1);
    flush(THREE, g, B);
    addAxles(THREE, g, T, AX, RT, 0.20, 0.98, PAL.usmc.base);
    /* the canisters, hinged at the rear of the frame */
    var hx = -2.80, hz = 1.45, CW = 0.52, CH = 0.95, CL = 4.30;
    var E = podGroup(THREE, g, hx, hz, 30, [[CL + 0.02, CW, CH * 0.55, -0.05], [CL + 0.02, -CW, CH * 0.55, -0.05]]), EB = bins(T, 0.4);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * 0.03, y1 = s * (CW * 2 - 0.02);
      prismX(EB.can, [[Math.min(y0, y1), 0.08], [Math.max(y0, y1), 0.08], [Math.max(y0, y1), CH], [Math.min(y0, y1), CH]], -0.05, CL);
      for (k = 0; k < 4; k++) box(EB.dark, 0.4 + k * 1.15, 0.48 + k * 1.15, Math.min(y0, y1) - 0.015, Math.max(y0, y1) + 0.015, 0.07, CH + 0.015);
      box(EB.dark, CL - 0.01, CL + 0.02, Math.min(y0, y1) + 0.06, Math.max(y0, y1) - 0.06, 0.15, CH - 0.07);
    }
    box(EB.dark, -0.10, CL - 0.3, -1.0, 1.0, 0.0, 0.08);
    cylY(EB.dark, 0, -0.9, 0.9, 0, 0.09, 10);
    flush(THREE, E, EB);
    g.name = "nato_e20_coastssm";
    return g;
  }

  /* ====================================================================== pla_e90_tankdestroyer: PTZ-89
     POLICY 5: js/hero/pla_plz83.js draws the Type 321 tracked chassis (its header: the PTZ-89 runs on the
     same chassis, and that file took its running gear off the PTZ-89 photographs), so HeroPlz83.build is
     called, its 152 mm turret taken off, and the PTZ-89's turret and 120 mm gun put on the hull as it comes.
     [T1] "PTZ-89.jpg" and [T2] "50th anniversary of PRC 3.jpg" (the 1999 parade; the same frame, [T2]
     enlarged): MEASURED against the hull (730 px from the track's rear to the nose): the big boxy turret
     over the rear 0.575 of the hull, its face 0.44 of the hull behind the nose, overhanging the tail a
     little; the long plain 120 mm tube reaching 0.20 of the hull past the nose with a fume extractor about
     two thirds out; the turret roof 0.27 of the hull over the deck, the commander's cupola with the 12.7 mm
     at its rear left.  On pla_plz83.js's 6.50 m hull (NOT CONFIRMED there) that is a 3.74 m turret, its
     face 2.86 m behind the nose, the roof 3.30 m up, the muzzle 1.30 m ahead of the nose (7.85 m overall).
     Published (en.wikipedia "Type 89 (tank destroyer)", from a forum source): 5.6 x 2.8 x 3.12 m, 31 t -
     the 5.6 m is not reached with the reused hull; the 3.12 m height is 0.18 m under the drawn roof.
     NOT CONFIRMED: the turret's plan and side slopes (one small oblique photograph), the gun's length inside,
     the fume extractor's place, the cupola, the smoke dischargers (not seen; not drawn). */
  function buildPtz89(THREE, M, C) {
    var g = need("HeroPlz83", "js/hero/pla_plz83.js").build(THREE, M, C);
    dropNamed(g, "turret");
    var T = mats(THREE, C, PAL.pla), s, k;
    borrowPaint(g, T);
    var DECK = 1.55, TXc = -1.48, tg = grp(THREE, g, "turret", TXc, 0, DECK), B = bins(T, 0.4);
    var xf = 3.25 - 2.86 - TXc, xr = -3.35 - TXc, H = 1.75, hw = 1.40, tw = 1.10;
    /* the turret: the sloped face with the angled cheeks, the near-upright sides leaning in, the flat roof */
    loftN(B.paint, [
      [[xr, -hw, 0.02], [xr, hw, 0.02], [xr, tw, H - 0.05], [xr, -tw, H - 0.05]],
      [[xr + 0.25, -hw, 0.0], [xr + 0.25, hw, 0.0], [xr + 0.25, tw, H], [xr + 0.25, -tw, H]],
      [[xf - 0.80, -hw, 0.0], [xf - 0.80, hw, 0.0], [xf - 0.80, tw, H], [xf - 0.80, -tw, H]],
      [[xf, -hw * 0.75, 0.0], [xf, hw * 0.75, 0.0], [xf - 0.45, tw * 0.80, H - 0.05], [xf - 0.45, -tw * 0.80, H - 0.05]]
    ], false);
    /* the mantlet and the 120 mm tube with its fume extractor [T1][T2] */
    var gz = 0.85, mx = xf - 0.10;
    box(B.paint, mx - 0.10, mx + 0.32, -0.42, 0.42, gz - 0.38, gz + 0.36);
    var mz = 3.25 + 1.30 - TXc;
    cyl(B.paint, [mx + 0.30, 0, gz], [mx + 1.10, 0, gz], 0.16, 0.13, 14);
    cyl(B.paint, [mx + 1.10, 0, gz], [mz, 0, gz], 0.085, 0.075, 14);
    cyl(B.paint, [mx + 2.40, 0, gz], [mx + 3.10, 0, gz], 0.13, 0.13, 14);
    cyl(B.dark, [mz - 0.02, 0, gz], [mz, 0, gz], 0.06, 0.06, 12);
    /* the roof: the commander's cupola and the 12.7 mm at the rear left, the loader's hatch, sights, vents */
    cylZ(B.paint, xr + 0.90, 0.55, H, H + 0.22, 0.38, 16);
    cylZ(B.dark, xr + 0.90, 0.55, H + 0.22, H + 0.27, 0.30, 16);
    cylZ(B.dark, xr + 0.90, 0.55, H + 0.27, H + 0.62, 0.035, 6);
    m2(B, xr + 1.05, 0.55, H + 0.68, 1, 1.40);
    box(B.dark, xr + 0.70, xr + 1.10, 0.45, 0.65, H + 0.60, H + 0.85);
    cylZ(B.paint, xr + 1.10, -0.55, H, H + 0.08, 0.32, 14); cylZ(B.dark, xr + 1.32, -0.55, H + 0.08, H + 0.12, 0.05, 6);
    box(B.paint, xf - 1.30, xf - 0.90, -0.70, -0.30, H, H + 0.35); box(B.glass, xf - 0.90, xf - 0.88, -0.65, -0.35, H + 0.10, H + 0.30);
    for (k = 0; k < 4; k++) box(B.dark, xr + 1.8 + k * 0.30, xr + 1.95 + k * 0.30, -0.20, 0.20, H, H + 0.04);
    /* the sides: the stowage bins, grab rails, the rear basket [T1] */
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, xr + 0.30, xr + 1.60, s * (hw - 0.05), s * (hw + 0.30), 0.50, 1.05);
      grab(B.dark, xr + 1.8, xf - 1.0, s * (hw - 0.06), 1.30, 0.08);
      sideBox(B.team, s, hw - 0.12, 0.015, xr + 1.9, xr + 2.9, 1.45, 1.60);
      box(B.dark, xf - 0.70, xf - 0.40, s * 0.95 - 0.10, s * 0.95 + 0.10, H - 0.30, H + 0.05);
    }
    for (k = 0; k < 3; k++) bar(B.dark, [xr - 0.05, -1.0 + k * 1.0, 0.40], [xr - 0.05, -1.0 + k * 1.0, 1.10], 0.02, 4);
    bar(B.dark, [xr - 0.05, -1.0, 1.10], [xr - 0.05, 1.0, 1.10], 0.02, 4);
    flush(THREE, tg, B);
    g.name = "pla_e90_tankdestroyer";
    return g;
  }

  /* ====================================================================== roc_e50_tankdestroyer: M18 HELLCAT
     [M1] "M18 hellcat side.jpg" (a running M18, starboard, a little ahead of square) and [M2] "M18 Hellcat
     side.jpeg" (starboard front 3/4): five big road wheels a side on torsion arms, the toothed sprocket high
     at the front, the idler at the rear, four return rollers; the long low hull with the sloped upper sides,
     the rounded transmission cover at the nose, the glacis with the two drivers' hatches, the lamp guards on
     its corners; the open-topped turret with its long sloped sides, the deep bustle with the stowage and the
     .50 on its ring at the rear; the 76 mm with the muzzle brake (the M1A2 of [M1]).  Published (en.wikipedia
     "M18 Hellcat"): 17 ft 4 in hull (5.28 m), 21 ft 10 in over the gun (6.65 m), 9 ft 5 in wide (2.87 m), 8 ft
     5 in over the AA gun (2.57 m).  Scale: the hull length; heights off [M1] against its road wheel (0.66 m,
     taken from the wheel pitch: NOT CONFIRMED), the photographs being 3/4 views.  Drawn: hull roof 1.62,
     turret top 2.24, the .50 at 2.62 (published 2.57).  Paint: olive drab; no stars, numbers or markings
     (both photographs carry them).  Nodes: "turret" (origin on the ring), five "roadwheel" axle groups. */
  var M18 = { XW: [-1.62, -0.95, -0.28, 0.39, 1.06], RW: 0.33, ZW: 0.36, TRK: 1.15, TW: 0.36, HW: 1.10, SW: 1.43, DECK: 1.62 };
  function m18Wheel(W) {
    var s, k, i, a, y;
    for (s = -1; s <= 1; s += 2) {
      y = s * M18.TRK;
      W.col = [0.10, 0.10, 0.10];
      cylY(W, 0, y - 0.13, y + 0.13, 0, M18.RW, 18);
      W.col = rgb(PAL.od.base, 1.0);
      cylY(W, 0, y + s * 0.13, y + s * 0.15, 0, M18.RW - 0.05, 18);
      W.col = rgb(PAL.od.base, 0.8);
      for (i = 0; i < 6; i++) { a = i / 6 * TAU; cylY(W, Math.cos(a) * 0.17, y + s * 0.15, y + s * 0.17, Math.sin(a) * 0.17, 0.05, 6); }
      W.col = rgb(PAL.od.base, 1.15);
      cylY(W, 0, y + s * 0.15, y + s * 0.20, 0, 0.09, 10);
    }
  }
  function buildM18(THREE, M, C) {
    var T = mats(THREE, C, PAL.od), B = bins(T, 0.4), TB = bins(T, 0.4), g = new THREE.Group(), s, k, i, x;
    var HW = M18.HW, SW = M18.SW, D = M18.DECK, XR = -2.64, XN = 2.64;
    /* the lower hull between the tracks, the transmission cover at the nose, the rear plate */
    box(B.paint, XR + 0.05, 2.10, -HW + 0.25, HW - 0.25, 0.40, 1.10);
    body(B.paint, [[1.95, 0.88, 0.85, 0.30, 0.42, 2.2], [2.30, 0.86, 0.85, 0.30, 0.40, 2.2], [2.55, 0.86, 0.75, 0.24, 0.30, 2.0], [2.64, 0.86, 0.55, 0.12, 0.18, 2.0]], 16);
    /* the upper hull: the sponsons over the tracks with their sloped sides, the glacis, the engine deck */
    prismX(B.paint, [[-SW, 1.10], [SW, 1.10], [SW - 0.25, D], [-SW + 0.25, D]], XR, 1.05);
    prismY(B.paint, [[1.05, 1.10], [2.25, 1.10], [1.05, D]], -SW, SW);
    box(B.paint, XR, XR + 0.10, -SW + 0.10, SW - 0.10, 0.55, D - 0.02);
    for (s = -1; s <= 1; s += 2) {
      /* the drivers' hatches with their periscopes, the lamp guards, the front mudguards and tow shackles [M1][M2] */
      var gx = 1.55, gz = 1.10 + (2.25 - gx) / 1.20 * (D - 1.10);
      slab(B.paint, [gx, s * 0.50, gz + 0.04], unit([-1.2, 0, 0.52]), [0, 1, 0], unit([0.52, 0, 1.2]), 0.30, 0.30, 0.04);
      box(B.dark, gx - 0.25, gx - 0.12, s * 0.50 - 0.08, s * 0.50 + 0.08, gz + 0.06, gz + 0.20);
      headlamp(B.lamp, B.dark, 2.15, s * 1.05, 1.32, 0.09, 1);
      for (k = 0; k < 3; k++) bar(B.dark, [2.0, s * (0.88 + k * 0.17), 1.18], [2.30, s * (0.88 + k * 0.17), 1.50], 0.012, 4);
      towHook(B.dark, 2.62, s * 0.55, 0.80, 1);
      box(B.paint, 1.90, 2.45, s > 0 ? SW - 0.28 : -SW, s > 0 ? SW : -SW + 0.28, 1.05, 1.10);
      box(B.paint, XR - 0.05, XR + 0.35, s > 0 ? SW - 0.28 : -SW, s > 0 ? SW : -SW + 0.28, 1.05, 1.10);
      /* stowage on the hull side: tools, the long bar, jerrycans; the hull's side seams */
      tools(B.dark, s, SW - 0.10, -1.6, 1.38);
      bar(B.dark, [-2.4, s * (SW - 0.05), 1.22], [0.6, s * (SW - 0.05), 1.22], 0.025, 5);
      box(B.dark, -1.55, -1.45, s * (SW - 0.08), s * (SW - 0.02), 1.15, 1.28);
      sideBox(B.dark, s, SW, 0.01, 0.98, 1.02, 1.12, 1.58);
      /* the exhaust over the rear plate */
      cylY(B.dark, XR - 0.05, s * 0.55 - 0.30, s * 0.55 + 0.30, 1.30, 0.09, 10);
      box(B.red, XR - 0.02, XR, s * 1.10 - 0.06, s * 1.10 + 0.06, 1.30, 1.42);
    }
    /* the engine deck's grilles and hatch behind the turret [M1] */
    for (k = 0; k < 7; k++) box(B.dark, -2.45 + k * 0.12, -2.40 + k * 0.12, -0.80, 0.80, D, D + 0.02);
    hatch(B.paint, -1.55, 0, D, 0.70, 1.20);
    /* the running gear: track belt (top run on the return rollers, the ground run), sprocket, idler */
    var TRK = M18.TRK, TW2 = M18.TW / 2;
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * TRK - TW2, y1 = s * TRK + TW2;
      box(B.rubber, -2.10, 1.40, y0, y1, 0.0, 0.05);
      box(B.rubber, -2.20, 1.75, y0, y1, 0.92, 0.97);
      /* the shoes' grousers and end connectors along both runs [M1] */
      for (x = -2.08; x < 1.38; x += 0.155) { box(B.metal, x, x + 0.05, y0 - 0.01, y1 + 0.01, 0.0, 0.07); box(B.metal, x + 0.06, x + 0.10, y0 - 0.025, y0, 0.005, 0.045); box(B.metal, x + 0.06, x + 0.10, y1, y1 + 0.025, 0.005, 0.045); }
      for (x = -2.18; x < 1.72; x += 0.155) { box(B.metal, x, x + 0.05, y0 - 0.01, y1 + 0.01, 0.95, 0.99); box(B.metal, x + 0.06, x + 0.10, y0 - 0.025, y0, 0.925, 0.965); box(B.metal, x + 0.06, x + 0.10, y1, y1 + 0.025, 0.925, 0.965); }
      bar(B.rubber, [1.40, s * TRK, 0.03], [2.05, s * TRK, 0.62], 0.035, 4);
      bar(B.rubber, [-2.10, s * TRK, 0.03], [-2.50, s * TRK, 0.45], 0.035, 4);
      cylY(B.metal, 1.75, y0, y1, 0.62, 0.30, 14);
      for (i = 0; i < 12; i++) { var a = i / 12 * TAU; box(B.metal, 1.75 + Math.cos(a) * 0.33 - 0.03, 1.75 + Math.cos(a) * 0.33 + 0.03, y0, y1, 0.62 + Math.sin(a) * 0.33 - 0.03, 0.62 + Math.sin(a) * 0.33 + 0.03); }
      cylY(B.paint, -2.20, y0, y1, 0.48, 0.28, 14);
      for (k = 0; k < 4; k++) cylY(B.paint, -1.28 + k * 0.67, y0 + 0.04, y1 - 0.04, 0.84, 0.10, 8);
      for (i = 0; i < 5; i++) bar(B.dark, [M18.XW[i] + 0.35, s * (TRK - 0.30), 0.55], [M18.XW[i], s * (TRK - 0.30), M18.ZW], 0.04, 5);
    }
    box(B.team, -2.40, -2.00, -0.60, 0.60, D + 0.02, D + 0.035);
    flush(THREE, g, B);
    for (i = 0; i < M18.XW.length; i++) {
      var W = new Bin(T.wheel, false, true); m18Wheel(W);
      var wg = grp(THREE, g, "roadwheel", M18.XW[i], 0, M18.ZW); flush(THREE, wg, { wheel: W });
    }
    /* the turret: open top, long sloped sides, the bustle, the gun with its mantlet and brake, the .50 [M1][M2] */
    var tg = grp(THREE, g, "turret", -0.10, 0, D), TH = 0.62, TF = 1.15, TR = -1.55;
    for (s = -1; s <= 1; s += 2) {
      prismX(TB.paint, [[s * 1.18, 0.0], [s * 1.25, 0.0], [s * 1.07, TH], [s * 1.00, TH]], TR + 0.3, TF - 0.25);
      prismY(TB.paint, [[TF - 0.25, 0.0], [TF, 0.05], [TF - 0.10, TH], [TF - 0.25, TH]], s > 0 ? 0.42 : -1.18, s > 0 ? 1.18 : -0.42);
      sideBox(TB.team, s, 1.14, 0.015, -0.6, 0.2, TH - 0.12, TH - 0.04);
    }
    /* the bustle: its walls and floor, the stowage on it, the .50 on its ring */
    prismX(TB.paint, [[-1.05, 0.05], [1.05, 0.05], [1.05, TH], [-1.05, TH]], TR, TR + 0.32);
    box(TB.paint, TR - 0.30, TR, -1.05, 1.05, 0.10, 0.20);
    body(TB.dark, [[TR - 0.25, TH + 0.12, 0.90, 0.12, 0.10, 2], [TR + 0.45, TH + 0.12, 0.95, 0.14, 0.10, 2]], 10);
    cylZ(TB.dark, TR + 0.10, 0, TH, TH + 0.08, 0.40, 16);
    cylZ(TB.dark, TR + 0.10, 0.30, TH, TH + 0.45, 0.03, 6);
    m2(TB, TR + 0.35, 0.30, TH + 0.50, 1, 1.15);
    /* the gun: the mantlet, the 76 mm tube to 6.65 m overall, the double-baffle brake */
    var gz = 0.42, mzx = (XR + 6.65) - (-0.10);
    box(TB.paint, TF - 0.10, TF + 0.18, -0.30, 0.30, gz - 0.25, gz + 0.22);
    cyl(TB.paint, [TF + 0.15, 0, gz], [TF + 0.55, 0, gz], 0.13, 0.11, 14);
    cyl(TB.paint, [TF + 0.55, 0, gz], [mzx - 0.30, 0, gz], 0.06, 0.055, 12);
    cyl(TB.dark, [mzx - 0.30, 0, gz], [mzx, 0, gz], 0.085, 0.085, 12);
    box(TB.dark, mzx - 0.22, mzx - 0.10, -0.09, 0.09, gz - 0.06, gz + 0.06);
    box(TB.paint, TF - 0.15, TF - 0.05, -0.18, 0.18, gz + 0.20, TH + 0.02);
    flush(THREE, tg, TB);
    g.name = "roc_e50_tankdestroyer";
    return g;
  }

  return {
    type6604: buildType6604, brdm9p133: build9p133, md500asw: build500mdAsw, hainan: buildHainan, shanghai: buildShanghai,
    pc461: function (T, M, C) { return buildPc461(T, M, C, "nato_e50_patrol"); }, pc461roc: function (T, M, C) { return buildPc461(T, M, C, "roc_e50_patrol"); },
    cyclone: buildCyclone, pcf: buildPcf, sh3: buildSh3, sh2f: buildSh2f,
    df21d: function (T, M, C) { return buildTel(T, M, C, "df21d"); }, df26: function (T, M, C) { return buildTel(T, M, C, "df26"); },
    yj62: buildYj62, hy2a: buildHy2, nmesis: buildNmesis, ptz89: buildPtz89, m18: buildM18
  };
})();

/* len: the measured X extent of each build (dump.js) */
UNIT_MODELS["pla_e50_patrol"] = { len: 52.43, build: HeroMiscBorrowed.type6604 };
UNIT_MODELS["kpa_e60_tankdestroyer"] = { len: 5.75, build: HeroMiscBorrowed.brdm9p133 };
UNIT_MODELS["roc_e80_aswhelo"] = { len: 9.18, build: HeroMiscBorrowed.md500asw };
UNIT_MODELS["pla_e00_patrol"] = { len: 58.8, build: HeroMiscBorrowed.hainan };
UNIT_MODELS["pla_e60_patrol"] = { len: 38.8, build: HeroMiscBorrowed.shanghai };
UNIT_MODELS["nato_e50_patrol"] = { len: 52.9, build: HeroMiscBorrowed.pc461 };
UNIT_MODELS["roc_e50_patrol"] = { len: 52.9, build: HeroMiscBorrowed.pc461roc };
UNIT_MODELS["nato_e90_patrol"] = { len: 54.6, build: HeroMiscBorrowed.cyclone };
UNIT_MODELS["nato_e60_patrol"] = { len: 15.24, build: HeroMiscBorrowed.pcf };
UNIT_MODELS["nato_e60_aswhelo"] = { len: 22.41, build: HeroMiscBorrowed.sh3 };
UNIT_MODELS["nato_e60_lamps"] = { len: 15.87, build: HeroMiscBorrowed.sh2f };
UNIT_MODELS["pla_e00_df21d"] = { len: 11.65, build: HeroMiscBorrowed.df21d };
UNIT_MODELS["pla_e00_df26"] = { len: 13.13, build: HeroMiscBorrowed.df26 };
UNIT_MODELS["pla_e00_coastssm"] = { len: 11.86, build: HeroMiscBorrowed.yj62 };
UNIT_MODELS["pla_e80_coastssm"] = { len: 8.28, build: HeroMiscBorrowed.hy2a };
UNIT_MODELS["nato_e20_coastssm"] = { len: 6.64, build: HeroMiscBorrowed.nmesis };
UNIT_MODELS["pla_e90_tankdestroyer"] = { len: 7.97, build: HeroMiscBorrowed.ptz89 };
UNIT_MODELS["roc_e50_tankdestroyer"] = { len: 6.79, build: HeroMiscBorrowed.m18 };

/* HELD - not registered; the borrowed models stand until a reference turns up (POLICY 1).
   pla_e80_tankdestroyer  Type 63 with the HJ-73.  The Type 63 is js/hero/pla_type63_apc.js (HeroType63Apc.build)
       and the round is photographed ("HJ-73 in Military Museum of the Chinese People's Revolution.jpg"), but
       no photograph or drawing of the launcher on the vehicle was found, so where and how the rails sit on
       the roof cannot be drawn.  Searched: Commons "HJ-73", "HJ-73 Type 63", "Type 63 armored personnel
       carrier missile"; the images of en.wikipedia "Type 63 (armoured personnel carrier)" and "9M14 Malyutka".
   //UNIT_MODELS["pla_e80_tankdestroyer"] -- no reference found
   pla_e00_tankdestroyer  AFT-9 (HJ-9) on the WZ-550.  One photograph ("HJ-9 mounted on WZ550.jpg", front 3/4,
       the four-tube launcher on its raised mast); js/hero/pla_wz551.js draws the 6x6 WZ-551 and cannot draw
       the 4x4 without being edited; no published length, wheelbase or tyre of the WZ-550 was found to scale
       a new hull by (en.wikipedia "WZ-551" and "HJ-9" give none; zh.wikipedia is not reachable from here).
       Searched: Commons "AFT-9", "HJ-9 missile vehicle", "WZ550", "WZ-550".
   //UNIT_MODELS["pla_e00_tankdestroyer"] -- no scale reference found
   pla_e20_coastssm  YJ-12B shore launcher.  Commons "YJ-12B", "YJ-12 launcher", "70th anniversary parade
       anti-ship missile"; en.wikipedia "YJ-12" images (the only launcher shown is a ship's, on a Type 052D).
   //UNIT_MODELS["pla_e20_coastssm"] -- no reference found
   kpa_e00_coastssm  Kumsong-3 four-canister launcher.  Commons "Kumsong-3" (only "KN-19-..." files, which are
       Korean road photographs); en.wikipedia "Kumsong-3" has no image.
   //UNIT_MODELS["kpa_e00_coastssm"] -- no reference found
*/
