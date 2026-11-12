/* ===== eu_land_skirmish.js - HERO models: the British, French and German skirmish land rows =====
   These rows had no model of their own and drew the American row of the same role (a HEMTT, a
   Humvee, a Stryker, an M109, an M1A2, a TPQ-53, HIMARS).  Each now has its own, built here or
   reused from the hero module that already draws the vehicle.

   KEY               VEHICLE (row)                       HOW                                      PAINT
   recon_g           Fennek                              NEW  fennek()                            deu
   atgmv_g           Wiesel 1 TOW                        NEW  wiesel1Tow()                        deu
   spaag_g           Wiesel 2 Ozelot (LeFlaSys)          NEW  wiesel2Ozelot()                     deu
   spg_g             PzH 2000                            NEW  pzh2000()                           deu
   mlrs_g            MARS II (M270A2 standard)           REUSED HeroUsMlrs + a row in its table,  module "carc"
                                                         the A2 cab drawn over the A1 one        (near-plain)
   mlrs_b            M270A2 with GMLRS                   the same                                 the same
   sam_g             Patriot (German launcher)           REUSED HeroNatoLaunchersEu.buildPatriot, deu
                                                         repainted plain; PAC-2-type load (below)
   supply_g          MAN KAT I 7 t mil gl 6x6            NEW  kat1()                              deu
   lt_b              Ajax                                NEW  ajax()                              gbr
   hvy_b             Challenger 3                        REUSED HeroGBTanks.challenger("cr2") hull, module "nato"
                                                         a NEW turret drawn into its turret group
   spg_b             Archer (FH77BW L52)                 NEW  archer()                            gbr
   sam_b             Sky Sabre iLauncher (MAN HX 8x8)    NEW  skySabre()                          gbr
   lt_f              EBRC Jaguar                         NEW  ebrcJaguar()                        fra
   mbt_f             Leclerc XLR                         REUSED HeroLeclerc.build as it stands: the
                                                         XLR kit is NOT drawn (no reference found)
   recon_f           VBL Ultima                          REUSED HeroFrArmour2.vbl as it stands: no
                                                         Ultima difference was found in a photograph
   deu_e60_radarv    M113 A1 G Green Archer              REUSED HeroM113 hull (a row added to its
                                                         VARIANTS), NEW radar in its turret group deu
   deu_e90_radarv    M113 ABRA with RATAC-S              the same, NEW mast and antenna           deu
   HELD (registration below commented out, keeps its borrowed model):
   deu_e80_radarv    ABRA with the first RATAC           no photograph or drawing of the RATAC antenna found
   supply_b          MAN SV 9 t                          no photograph of an SV cargo truck could be fetched
   supply_f          PPLOG (Renault Kerax 8x8)           no photograph of the PPLOG found (the one Commons
                                                         file named "PPLOG - PPT" shows an Iveco Trakker PPT)
   gbr_e80_coastssm  Excalibur (MM38, Gibraltar)         no photograph or drawing found
   fra_e90_tel (Hades) is not this file's: it is held in js/hero/eu_tels_radars.js.

   REFERENCES (Wikimedia Commons, width 960, cached in scratchpad q_eulsk_ref; Wikipedia figures)
     [FN1] "Spaehwagen Fennek (4x4).JPG", [FN2] "Spaehwagen Fennek (Bundeswehr).jpg" - front 3/4
           both sides: the faceted body, lamp pods, screen, mast head at the rear port corner, the
           weapon station; [FN3] "Fennek Spaehfahrzeug durchfaehrt Amelinghausen.jpg".
           en.wikipedia "KNDS Fennek": 5.58 x 2.55 x 2.29 m.
     [W1]  "Wiesel 1 TOW.jpg" - near side-on: the X stations (189 px/m over 3.55 m).
     [W2]  "Verschiedene Wiesel-Typen der Bundeswehr.jpg" - distant line-up: heights (80 px/m).
     [OZ1] "Wiesel2 Ozelot LeFlaSys.jpg", [OZ2] "LeFlaSys Ozelot.jpg" - 3/4: five road wheels, the
           launcher with two four-round pods, the raised rear superstructure.
           en.wikipedia "Wiesel (weapons carrier)": W1 3.55 x 1.82 x 1.82, W2 4.78 x 1.87 x 2.17 m.
     [PZ1] "ILUe 2012 - Pzh 2000.jpg" - side-on: THE STATION TABLE (54.4 px/m over the 7.87 m hull).
           en.wikipedia "Panzerhaubitze 2000": 11.7 x 3.6 x 3.1 m.
     [MA2] "M270A2.png" - side drawing of the M270A2: the A2 cab (135.7 px/m over 7.00 m).
     [PS17] "Patriot Startgeraett@20170610.jpg" (scratchpad q_natoeu_ref) - a German launcher on
           the MAN, 2 x 2 canisters.
     [KT1] "MAN KAT 1 6x6 (6).jpg" - front 3/4 of a KAT I 6x6 cargo truck with tilt.
     [AJ1] "AJAX, the Future Armoured Fighting Vehicle for the British Army MOD 45159443.jpg" - 3/4.
           en.wikipedia "General Dynamics Ajax": 7.62 x 3.35 x 3.00 m.
     [CR3a] "Challenger 3.jpg" (head on), [CR3b] "Challenger 3 ATD.jpg" (front 3/4).
     [AR1] "Archerside commons.jpg" - near side-on, set up.  en.wikipedia "Archer artillery system".
     [SS1] "ILauncher (within Sky Sabre).jpg", [SS2] "Royal Artillery Sky Sabre system.jpg".
     [JG1] "EBRC Jaguar side profile.jpg", [JG2] "EBRC Jaguar armoured reconnaissance vehicle.jpg".
           en.wikipedia "EBRC Jaguar": 7.1 (7.8 with gun) x 2.99 x 2.8 m.
     [GA1] "M113 Field Surveillance radar in Aalborg Forsvars- og Garnisonsmuseum, pic3.JPG" (the
           photograph en.wikipedia "Green Archer (radar)" carries).
     [RS1] "Dynamic Front 25 - M113A1 GE ABRA - RATAC-S radar - Bundeswehr.webp" - head on, mast up.
     [AB1] "M113 A1 GE Dresden.JPG" - an M113 A1 G with the raised rear roof box.

   AS DRAWN (tools/model3d/dump.js; L x W x H, H to the top of the aerials where there are any)
     see the registration table at the foot for each len; heights against published are in the
     final report.  NOT CONFIRMED: listed in each builder's own header.

   PAINT: plain, one coat per army (no markings, numbers or camouflage): a canvas texture with
     soft mottling, plate seams and panel lines, rain streaks, chips and grime.  Team colour:
     small strips in C.team.  Reused builds keep their module's paint unless noted.
   NODES: "turret" (trained), one "roadwheel" group per axle (both sides), "podelev" +
     "deploypose" / "travelpose" on sam_b (render3d.poseLauncher raises the pack to 90 deg).
   ENGINE SMOKE (js/damage3d.js ENGINE_AT / REAR_ENGINE, for the reviewer): see the report.
   LOAD ORDER: after js/hero/us_m113.js, us_m270_himars.js, nato_launchers_eu.js, gb_tanks.js,
     fr_tanks.js and fr_armour2.js (it calls HeroM113, HeroUsMlrs, HeroNatoLaunchersEu,
     HeroGBTanks, HeroLeclerc, HeroFrArmour2, and adds rows to HeroUsMlrs.rows and
     HeroM113.variants).
   +X nose, +Y port, +Z up, metres, ground at z = 0.  ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEuLandSkirmish = (function () {
  "use strict";
  var TAU = Math.PI * 2, D2R = Math.PI / 180;

  /* ------------------------------------------------------------ geometry kit
     (the kit of js/hero/pla_type63_apc.js: Bin, solid, box, slab, belt, cyl, prismY, loftN) */
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
        if (az >= ax && az >= ay) this.U.push(q[0] * 0.34, q[1] * 0.34);
        else if (ay >= ax) this.U.push(q[0] * 0.34, q[2] * 0.34);
        else this.U.push(q[1] * 0.34, q[2] * 0.34);
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
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function bar(bin, A, B, r) { cyl(bin, A, B, r, r, 6, false); }
  /* a convex prism: profile in the XZ plane, from y0 to y1 */
  function prismY(bin, pts, y0, y1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([pts[i][0], y0, pts[i][1]], [pts[i][0], y1, pts[i][1]]);
    for (i = 0; i < n; i++) { j = (i + 1) % n; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    for (i = 1; i < n - 1; i++) F.push([0, 2 * i + 2, 2 * i], [1, 2 * i + 1, 2 * i + 3]);
    solid(bin, V, F);
  }
  /* a convex prism: profile in the YZ plane, from x0 to x1 */
  function prismX(bin, pts, x0, x1) {
    var V = [], F = [], n = pts.length, i, j;
    for (i = 0; i < n; i++) V.push([x0, pts[i][0], pts[i][1]], [x1, pts[i][0], pts[i][1]]);
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
  /* a hull section at station x, symmetric: [y, z] pairs for the port half, bottom to top */
  function ring(x, half) {
    var R = [], i;
    for (i = 0; i < half.length; i++) R.push([x, half[i][0], half[i][1]]);
    for (i = half.length - 1; i >= 0; i--) R.push([x, -half[i][0], half[i][1]]);
    return R;
  }
  function hull2(P) {
    P = P.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    function cr(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var L = [], U = [], i;
    for (i = 0; i < P.length; i++) { while (L.length >= 2 && cr(L[L.length - 2], L[L.length - 1], P[i]) <= 0) L.pop(); L.push(P[i]); }
    for (i = P.length - 1; i >= 0; i--) { while (U.length >= 2 && cr(U[U.length - 2], U[U.length - 1], P[i]) <= 0) U.pop(); U.push(P[i]); }
    U.pop(); L.pop();
    return L.concat(U);
  }

  /* ----------------------------------------------------------- materials
     PLAIN paint, one coat per army (no markings, numbers or camouflage pattern): the
     Bundeswehr's RAL 6031 bronze green, British Army NATO green, French vert armee; a
     coarse grime and seam texture over it.  "sand" is the tan of the Archer's photographs. */
  var PAINTS = {
    deu:  { base: "#3e4733", seed: 6031 },
    gbr:  { base: "#474e34", seed: 1985 },
    fra:  { base: "#4b5137", seed: 1789 },
    sand: { base: "#8c8263", seed: 3030 }
  };
  var _tex = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* the coat: a canvas tile in the army's one colour, worked over as the older hero files'
     paint is (js/hero/us_m113.js): soft mottling of the same colour, plate seams and panel
     lines, rain streaks and chips, grime; tiled seamlessly */
  function paintTex(THREE, key) {
    if (_tex[key] !== undefined) return _tex[key];
    var P = PAINTS[key], t = null;
    try {
      var cv = document.createElement("canvas"), S = 256, q, R = rng(P.seed), i, k, x, y, w, ox, oy, rr;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      /* soft mottling, light and dark of the base, drawn with its wrapped copies */
      for (k = 0; k < 2; k++) {
        q.fillStyle = k ? "rgba(255,250,225,0.06)" : "rgba(10,12,6,0.08)";
        for (i = 0; i < 14; i++) {
          x = R() * S; y = R() * S; rr = 20 + R() * 40;
          for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) { q.beginPath(); q.ellipse(x + ox, y + oy, rr * 1.4, rr, R() * 3, 0, 6.2832); q.fill(); }
        }
      }
      /* plate seams and panel lines, a few rivet rows along them */
      q.strokeStyle = "rgba(16,18,12,0.32)"; q.lineWidth = 1.1;
      for (i = 0; i < 3; i++) { q.beginPath(); q.moveTo(i * 85 + 30.5, 0); q.lineTo(i * 85 + 30.5, S); q.stroke(); }
      for (i = 0; i < 2; i++) { q.beginPath(); q.moveTo(0, i * 128 + 60.5); q.lineTo(S, i * 128 + 60.5); q.stroke(); }
      q.fillStyle = "rgba(14,14,10,0.30)";
      for (i = 0; i < 3; i++) for (k = 0; k < 16; k++) q.fillRect(i * 85 + 33, k * 16 + 4, 1.5, 1.5);
      /* rain streaks, chips and scuffs, grime */
      for (i = 0; i < 140; i++) {
        q.fillStyle = (i % 3) ? "rgba(16,16,10,0.08)" : "rgba(235,230,205,0.06)";
        q.fillRect(R() * S, R() * S, 1 + R() * 3, 8 + R() * 36);
      }
      for (i = 0; i < 60; i++) { q.fillStyle = (i % 2) ? "rgba(10,10,8,0.20)" : "rgba(200,195,170,0.12)"; q.fillRect(R() * S, R() * S, 2 + R() * 2, 1.5 + R()); }
      for (i = 0; i < 6; i++) {
        x = Math.floor(R() * S); y = Math.floor(R() * S); w = 50 + R() * 120;
        q.fillStyle = "rgba(40,32,22,0.10)"; q.fillRect(x, y, w, 10 + R() * 20);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }
  function std(THREE, hex, r, m) { return new THREE.MeshStandardMaterial({ color: hex, roughness: r, metalness: m }); }
  function materials(THREE, C, key) {
    var T = {}, tx = paintTex(THREE, key), P = PAINTS[key];
    T.key = key;
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.06 });
    if (tx) T.paint.map = tx; else T.paint.color.set(P.base);
    T.dark = std(THREE, 0x25272a, 0.78, 0.3);
    T.glass = std(THREE, 0x1d2a33, 0.14, 0.35);
    T.team = std(THREE, (C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06);
    T.canvas = std(THREE, 0x4c5040, 0.95, 0.0);
    T.wheel = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88, metalness: 0.05, vertexColors: THREE.VertexColors !== undefined ? THREE.VertexColors : true });
    var r = parseInt(P.base.substr(1, 2), 16) / 255, g = parseInt(P.base.substr(3, 2), 16) / 255, b = parseInt(P.base.substr(5, 2), 16) / 255;
    T.rim = [r * 1.1, g * 1.1, b * 1.1];
    T.rib = [r * 1.3, g * 1.3, b * 1.3];
    return T;
  }
  function bins(T) { return { paint: new Bin(T.paint, true), dark: new Bin(T.dark, false), glass: new Bin(T.glass, false), team: new Bin(T.team, false), canvas: new Bin(T.canvas, false) }; }
  function flush(THREE, group, B) {
    var k, b, geo, m;
    for (k in B) {
      b = B[k];
      if (!b || !b.P || !b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      if (b.C) geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(b.C), 3));
      m = new THREE.Mesh(geo, b.mat);
      m.castShadow = true; m.receiveShadow = true;
      group.add(m);
    }
  }
  function grp(THREE, name, B, x, y, z) {
    var g = new THREE.Group();
    if (name) g.name = name;
    g.position.set(x || 0, y || 0, z || 0);
    if (B) flush(THREE, g, B);
    return g;
  }

  /* ------------------------------------------------------- running gear */
  var TYRE = [0.11, 0.115, 0.11], HOLE = [0.15, 0.16, 0.14];
  /* a pneumatic tyre pair on one axle (group origin on the axle centre): tread, sidewall,
     a dished rim in the paint colour and a hub, both sides at +-yc */
  function tyrePair(T, W, r, w, yc, rimR, lugs) {
    var s, y, i, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * yc;
      W.col = TYRE;
      cylY(W, 0, y - w / 2, y + w / 2, 0, r - 0.01, 32);
      /* the sidewall bulge and the tread lugs, staggered across the crown */
      cyl(W, [0, y + s * (w / 2 - 0.02), 0], [0, y + s * (w / 2 + 0.01), 0], r - 0.03, rimR + 0.04, 28);
      if (lugs) for (i = 0; i < 24; i++) {
        a = (i + 0.5) / 24 * TAU;
        slab(W, [Math.cos(a) * (r - 0.005), y + (i % 2 ? 0.25 : -0.25) * w, Math.sin(a) * (r - 0.005)], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.025, w * 0.24, 0.045);
      }
      W.col = T.rim;
      cylY(W, 0, y + s * (w / 2 + 0.005), y + s * (w / 2 + 0.025), 0, rimR, 20);
      W.col = T.rib;
      cylY(W, 0, y + s * (w / 2 + 0.02), y + s * (w / 2 + 0.06), 0, rimR * 0.42, 14);
      /* the wheel nuts round the hub, the hub cap */
      W.col = HOLE;
      for (i = 0; i < 8; i++) {
        a = i / 8 * TAU;
        cylY(W, Math.cos(a) * rimR * 0.62, y + s * (w / 2 + 0.02), y + s * (w / 2 + 0.05), Math.sin(a) * rimR * 0.62, 0.022, 6);
      }
      cylY(W, 0, y + s * (w / 2 + 0.06), y + s * (w / 2 + 0.08), 0, rimR * 0.20, 10);
    }
  }
  /* a tracked road wheel pair (group origin on the axle centre): rubber tyre, disc, hub */
  function roadPair(T, W, r, w, yc, holes) {
    var s, y, i, a;
    for (s = -1; s <= 1; s += 2) {
      y = s * yc;
      W.col = TYRE;
      cylY(W, 0, y - w / 2, y + w / 2, 0, r, 20);
      W.col = T.rim;
      cyl(W, [0, y + s * w / 2, 0], [0, y + s * (w / 2 + 0.03), 0], r - 0.04, r * 0.45, 20);
      if (holes) {
        W.col = HOLE;
        for (i = 0; i < holes; i++) {
          a = (i + 0.5) / holes * TAU;
          slab(W, [Math.cos(a) * r * 0.55, y + s * (w / 2 + 0.022), Math.sin(a) * r * 0.55], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], r * 0.13, 0.010, r * 0.12);
        }
      }
      W.col = T.rib;
      cylY(W, 0, y + s * (w / 2 + 0.02), y + s * (w / 2 + 0.05), 0, r * 0.22, 10);
      W.col = HOLE;
      for (i = 0; i < 6; i++) { a = i / 6 * TAU; cylY(W, Math.cos(a) * r * 0.15, y + s * (w / 2 + 0.04), y + s * (w / 2 + 0.065), Math.sin(a) * r * 0.15, 0.015, 6); }
    }
  }
  function wheelGroups(THREE, T, g, xs, z, fn) {
    for (var i = 0; i < xs.length; i++) {
      var W = new Bin(T.wheel, false, true);
      fn(W);
      g.add(grp(THREE, "roadwheel", { wheel: W }, xs[i], 0, z));
    }
  }
  /* the track: a belt round the convex hull of the wheels (C = [x, z, r] circles), shoes
     every `pitch` m, both sides at +-ty, half width tw */
  function track(B, C, ty, tw, pitch) {
    var pts = [], i, k, n, a, b, l, tot = 0, segs = [], q, rem, d, t, px, pz, s, y, step, cnt, dx, dz;
    for (i = 0; i < C.length; i++) for (k = 0; k < 24; k++) pts.push([C[i][0] + Math.cos(k / 24 * TAU) * (C[i][2] + 0.03), C[i][1] + Math.sin(k / 24 * TAU) * (C[i][2] + 0.03)]);
    pts = hull2(pts);
    n = pts.length;
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      l = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
      if (l < 1e-4) continue;
      segs.push([a, b, l]); tot += l;
    }
    n = segs.length;
    cnt = Math.round(tot / pitch); step = tot / cnt;
    for (s = -1; s <= 1; s += 2) {
      y = s * ty;
      for (i = 0; i < n; i++) if (segs[i][2] > 0.02) belt(B.dark, segs[i][0][0], segs[i][0][1], segs[i][1][0], segs[i][1][1], y - tw, y + tw, 0.04);
      q = 0; rem = 0;
      for (k = 0; k < cnt; k++) {
        d = (k + 0.5) * step;
        while (q < n - 1 && rem + segs[q][2] < d) { rem += segs[q][2]; q++; }
        t = (d - rem) / segs[q][2];
        a = segs[q][0]; b = segs[q][1];
        dx = (b[0] - a[0]) / segs[q][2]; dz = (b[1] - a[1]) / segs[q][2];
        px = a[0] + (b[0] - a[0]) * t; pz = a[1] + (b[1] - a[1]) * t;
        belt(B.dark, px - dx * pitch * 0.3, pz - dz * pitch * 0.3, px + dx * pitch * 0.3, pz + dz * pitch * 0.3, y - tw - 0.01, y + tw + 0.01, 0.06);
      }
    }
  }
  /* a toothed sprocket or a plain idler, both sides */
  function sprocket(B, x, z, r, ty, w, teeth) {
    for (var s = -1; s <= 1; s += 2) {
      var y = s * ty, i, ta, ca, sa;
      cylY(B.dark, x, y - w / 2, y + w / 2, z, r - 0.04, 18);
      if (teeth) for (i = 0; i < teeth; i++) {
        ta = i / teeth * TAU; ca = Math.cos(ta); sa = Math.sin(ta);
        slab(B.dark, [x + ca * (r - 0.02), y, z + sa * (r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.035, w / 2, 0.025);
      }
      cylY(B.paint, x, y + s * w / 2, y + s * (w / 2 + 0.04), z, r * 0.5, 12);
    }
  }
  /* a gun tube from x0 to x1 along +X at (y, z), tapering r0 to r1 */
  function tube(B, x0, x1, y, z, r0, r1, seg) { cyl(B, [x0, y, z], [x1, y, z], r0, r1, seg || 14); }

  /* ------------------------------------------------------------ fittings
     the small parts every photograph shows (AGENT_POLICY rule 10), merged into the paint,
     dark, glass and canvas bins; s is the side (+1 port, -1 starboard) where it matters */
  /* a headlamp: housing, lens, and the guard cage round it; facing +X (dir 1) or -X (dir -1) */
  function lamp(B, x, y, z, dir, r) {
    r = r || 0.08;
    cyl(B.dark, [x - dir * 0.10, y, z], [x, y, z], r + 0.02, r + 0.02, 12);
    cyl(B.glass, [x, y, z], [x + dir * 0.012, y, z], r, r, 12);
    var gx = x + dir * 0.06;
    bar(B.dark, [x - dir * 0.08, y, z + r + 0.05], [gx, y, z + r + 0.05], 0.012);
    bar(B.dark, [gx, y - r - 0.03, z - r], [gx, y - r - 0.03, z + r + 0.05], 0.012);
    bar(B.dark, [gx, y + r + 0.03, z - r], [gx, y + r + 0.03, z + r + 0.05], 0.012);
    bar(B.dark, [gx, y - r - 0.03, z + r + 0.05], [gx, y + r + 0.03, z + r + 0.05], 0.012);
  }
  /* a small tail-light or marker block */
  function marker(B, x, y, z, dir) {
    box(B.dark, x - (dir > 0 ? 0.05 : 0), x + (dir > 0 ? 0 : 0.05), y - 0.07, y + 0.07, z - 0.05, z + 0.05);
    box(B.glass, x + dir * 0.002 - 0.004, x + dir * 0.002 + 0.004, y - 0.05, y + 0.05, z - 0.035, z + 0.035);
  }
  /* a tow hook or shackle on a plate, facing dir along X */
  function towHook(B, x, y, z, dir) {
    box(B.dark, x - (dir > 0 ? 0.04 : 0), x + (dir > 0 ? 0 : 0.04), y - 0.09, y + 0.09, z - 0.09, z + 0.09);
    cyl(B.dark, [x, y, z], [x + dir * 0.08, y, z], 0.035, 0.035, 8);
    cyl(B.dark, [x + dir * 0.08, y, z - 0.06], [x + dir * 0.08, y, z + 0.06], 0.035, 0.035, 8);
  }
  /* a grab handle (a U of bar) from A to B, standing off the surface by n (unit normal) */
  function grab(B, A, C, n) {
    var o = 0.06, a2 = [A[0] + n[0] * o, A[1] + n[1] * o, A[2] + n[2] * o], c2 = [C[0] + n[0] * o, C[1] + n[1] * o, C[2] + n[2] * o];
    bar(B.dark, A, a2, 0.012); bar(B.dark, a2, c2, 0.014); bar(B.dark, c2, C, 0.012);
  }
  /* pioneer tools on a flank, along X from x0, at height z on side s (wall at y = s * yw):
     the shovel, the pick, the crowbar, each in its clamps */
  function tools(B, x0, yw, z, s) {
    var y = s * (yw + 0.03), i;
    bar(B.paint, [x0, y, z], [x0 + 0.85, y, z], 0.018);
    box(B.dark, x0 + 0.85, x0 + 1.10, y - 0.01, y + 0.01, z - 0.10, z + 0.10);
    bar(B.paint, [x0 + 1.25, y, z + 0.02], [x0 + 2.05, y, z + 0.02], 0.02);
    box(B.dark, x0 + 1.15, x0 + 1.25, y - 0.015, y + 0.015, z - 0.18, z + 0.20);
    bar(B.dark, [x0 + 0.10, y, z - 0.14], [x0 + 1.60, y, z - 0.14], 0.016);
    for (i = 0; i < 3; i++) box(B.dark, x0 + 0.20 + i * 0.65, x0 + 0.24 + i * 0.65, s > 0 ? yw : y - 0.03, s > 0 ? y + 0.03 : -yw, z - 0.18, z + 0.06);
  }
  /* a round hatch on a roof at z: the lid, its hinge block on the -X side, the handle */
  function hatch(B, x, y, z, r) {
    cylZ(B.paint, x, y, z, z + 0.04, r + 0.04, 16);
    cylZ(B.paint, x, y, z + 0.04, z + 0.08, r, 16);
    box(B.dark, x - r - 0.10, x - r + 0.06, y - 0.12, y + 0.12, z + 0.02, z + 0.11);
    cylY(B.dark, x - r - 0.04, y - 0.14, y + 0.14, z + 0.10, 0.03, 8);
    grab(B, [x + r * 0.5, y - 0.10, z + 0.08], [x + r * 0.5, y + 0.10, z + 0.08], [0, 0, 1]);
  }
  /* a square hatch: lid, two hinges on the -X edge */
  function hatchSq(B, x0, x1, y0, y1, z) {
    box(B.paint, x0, x1, y0, y1, z, z + 0.05);
    for (var k = 0; k < 2; k++) {
      var yc = y0 + (k + 0.5) * (y1 - y0) / 2;
      cylY(B.dark, x0 - 0.02, yc - 0.08, yc + 0.08, z + 0.05, 0.03, 8);
    }
    grab(B, [x1 - 0.12, (y0 + y1) / 2 - 0.10, z + 0.05], [x1 - 0.12, (y0 + y1) / 2 + 0.10, z + 0.05], [0, 0, 1]);
  }
  /* vision blocks round a cupola or on a plate: n periscope heads in an arc about (x, y) */
  function periscopes(B, x, y, z, r, n, a0, a1) {
    for (var i = 0; i < n; i++) {
      var a = a0 + (a1 - a0) * (n > 1 ? i / (n - 1) : 0.5), cx = x + Math.cos(a) * r, cy = y + Math.sin(a) * r;
      slab(B.dark, [cx, cy, z + 0.05], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.05, 0.08, 0.05);
      slab(B.glass, [cx + Math.cos(a) * 0.052, cy + Math.sin(a) * 0.052, z + 0.06], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], 0.004, 0.065, 0.03);
    }
  }
  /* a stowage bag or rolled tarpaulin (canvas), a soft box between the bounds */
  function bag(B, x0, x1, y0, y1, z0, z1) {
    var yc = (y0 + y1) / 2, hy = (y1 - y0) / 2, zc = (z0 + z1) / 2, hz = (z1 - z0) / 2;
    loftN(B.canvas, [
      ring(x0, [[hy * 0.80, z0 + hz * 0.05], [hy * 0.90, zc], [hy * 0.70, z1 - hz * 0.10]]).map(function (p) { return [p[0], p[1] + yc, p[2]]; }),
      ring(x0 + 0.06, [[hy, z0], [hy, zc], [hy * 0.90, z1]]).map(function (p) { return [p[0], p[1] + yc, p[2]]; }),
      ring(x1 - 0.06, [[hy, z0], [hy, zc], [hy * 0.90, z1]]).map(function (p) { return [p[0], p[1] + yc, p[2]]; }),
      ring(x1, [[hy * 0.80, z0 + hz * 0.05], [hy * 0.90, zc], [hy * 0.70, z1 - hz * 0.10]]).map(function (p) { return [p[0], p[1] + yc, p[2]]; })]);
    for (var k = 0; k < 2; k++) {
      var xs = x0 + (x1 - x0) * (0.25 + k * 0.5);
      box(B.dark, xs - 0.02, xs + 0.02, y0 - 0.01, y1 + 0.01, z1 - 0.005, z1 + 0.005);
    }
  }
  /* a jerrycan in its bracket, standing, face along Y on side s */
  function jerry(B, x, y, z, s) {
    box(B.paint, x - 0.17, x + 0.17, y - 0.08, y + 0.08, z, z + 0.46);
    box(B.dark, x - 0.06, x + 0.06, y - 0.03, y + 0.03, z + 0.46, z + 0.51);
    box(B.dark, x - 0.19, x + 0.19, s > 0 ? y - 0.09 : y + 0.08, s > 0 ? y - 0.08 : y + 0.09, z + 0.10, z + 0.14);
  }
  /* a whip aerial on its base */
  function aerial(B, x, y, z, h) {
    cylZ(B.dark, x, y, z, z + 0.10, 0.05, 8);
    cyl(B.dark, [x, y, z + 0.10], [x, y, z + Math.min(h, 1.1)], 0.012, 0.006, 5);
  }
  /* a mudguard / flap over a wheel: the arc of plate, the rubber flap behind */
  function mudguard(B, x, r, w, yc, z, s) {
    var i, a0, a1;
    for (i = 0; i < 6; i++) {
      a0 = Math.PI * (0.10 + i * 0.13); a1 = a0 + Math.PI * 0.13;
      belt(B.paint, x + Math.cos(a0) * (r + 0.10), z + Math.sin(a0) * (r + 0.10), x + Math.cos(a1) * (r + 0.10), z + Math.sin(a1) * (r + 0.10), yc - w / 2, yc + w / 2, 0.02);
    }
    box(B.dark, x - r - 0.14, x - r - 0.11, yc - w / 2, yc + w / 2, z - 0.35, z + 0.15);
  }

  /* ================================================================ AJAX
     [AJ1] front 3/4 (MOD, 2015): the tall box hull with its deep add-on side armour, an upper
     panel standing out over a lower skirt that hides most of the seven road wheels, the
     short steep nose and the long flat roof, the low turret ahead of the hull's middle with
     the 40 mm CTA cannon, the commander's sight on its tall post at the turret's rear right,
     the gunner's sight box at its left, the RWS behind.  Published 7.62 x 3.35 x 3.00 m; the
     proportions are taken off [AJ1] (a 3/4 view: heights NOT CONFIRMED to better than about
     10 cm; the running gear is hidden and drawn on seven even stations). */
  var AJ = { X0: -3.81, X1: 3.81, BELLY: 0.48, ROOF: 2.15, HW: 1.67, LW: 1.20, TY: 1.30, TW: 0.27,
             XW: [2.55, 1.72, 0.89, 0.06, -0.77, -1.60, -2.43], ZW: 0.40, RW: 0.36,
             SPR: { x: 3.30, z: 0.85, r: 0.30 }, IDL: { x: -3.25, z: 0.70, r: 0.30 }, TX: 0.75 };
  function ajax(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), A = AJ, s, i, C2 = [];
    g.name = "eu_ajax";
    /* the hull: belly, the short lower nose and the steep upper glacis, a flat roof, the
       rear plate */
    prismY(B.paint, [[A.X0, 0.70], [A.X0 + 0.20, A.BELLY], [A.X1 - 0.60, A.BELLY], [A.X1, 1.25], [A.X1 - 0.35, 1.95],
                     [A.X1 - 1.05, A.ROOF], [A.X0, A.ROOF]], -A.LW, A.LW);
    for (s = -1; s <= 1; s += 2) {
      /* the upper side armour standing out over the tracks, its lower edge stepped [AJ1] */
      prismY(B.paint, [[A.X0 - 0.05, 1.35], [A.X1 - 0.60, 1.35], [A.X1 - 0.20, 1.55], [A.X1 - 0.45, 2.00], [A.X1 - 1.05, A.ROOF], [A.X0 - 0.05, A.ROOF]],
             s > 0 ? A.LW : -A.HW, s > 0 ? A.HW : -A.LW);
      /* the lower skirt, set in, down over the wheels */
      prismY(B.paint, [[A.X0 + 0.15, 0.62], [A.X1 - 0.95, 0.62], [A.X1 - 0.55, 1.00], [A.X1 - 0.55, 1.36], [A.X0 + 0.15, 1.36]],
             s > 0 ? A.HW - 0.12 : -A.HW + 0.04, s > 0 ? A.HW - 0.04 : -A.HW + 0.12);
      for (i = 1; i < 5; i++) box(B.dark, A.X0 + i * 1.40 - 0.01, A.X0 + i * 1.40 + 0.01, s > 0 ? A.HW - 0.01 : -A.HW - 0.01, s > 0 ? A.HW + 0.01 : -A.HW + 0.01, 1.40, 2.10);
      /* headlamp boxes on the nose corners, the rear lamps */
      box(B.dark, A.X1 - 0.40, A.X1 - 0.15, s * 1.30 - 0.12, s * 1.30 + 0.12, 1.40, 1.60);
      box(B.dark, A.X0 - 0.07, A.X0 - 0.04, s * 1.25 - 0.08, s * 1.25 + 0.08, 1.80, 1.95);
    }
    /* the driver's hatch front left, the engine deck grille front right, the rear door */
    box(B.paint, 2.25, 2.80, 0.45, 1.05, A.ROOF, A.ROOF + 0.06);
    box(B.dark, 1.90, 2.70, -1.25, -0.45, A.ROOF, A.ROOF + 0.012);
    box(B.dark, A.X0 - 0.02, A.X0, -0.55, 0.55, 0.75, 1.85);
    box(B.team, A.X0 - 0.006 - 0.02, A.X0 - 0.02, -1.10, -0.70, 1.95, 2.05);
    for (i = 0; i < A.XW.length; i++) C2.push([A.XW[i], A.ZW, A.RW]);
    C2.push([A.SPR.x, A.SPR.z, A.SPR.r], [A.IDL.x, A.IDL.z, A.IDL.r]);
    track(B, C2, A.TY, A.TW, 0.16);
    sprocket(B, A.SPR.x, A.SPR.z, A.SPR.r, A.TY, 2 * A.TW - 0.06, 12);
    sprocket(B, A.IDL.x, A.IDL.z, A.IDL.r, A.TY, 2 * A.TW - 0.06, 0);
    wheelGroups(THREE, T, g, A.XW, A.ZW, function (W) { roadPair(T, W, A.RW, 2 * A.TW - 0.06, A.TY, 0); });
    /* the turret (origin on the ring): a low faceted box, the 40 mm CTA in a mantlet, the
       sights and the RWS [AJ1] */
    var TB = bins(T);
    loftN(TB.paint, [
      ring(-1.35, [[1.05, 0.0], [1.10, 0.30], [0.95, 0.60]]),
      ring(0.70, [[1.15, 0.0], [1.20, 0.30], [1.05, 0.60]]),
      ring(1.20, [[0.85, 0.05], [0.95, 0.30], [0.75, 0.50]])]);
    box(TB.paint, 1.10, 1.40, -0.30, 0.30, 0.10, 0.45);
    tube(TB.dark, 1.40, 3.05, 0, 0.28, 0.07, 0.055, 12);
    tube(TB.dark, 3.05, 3.30, 0, 0.28, 0.065, 0.065, 10);
    /* the gunner's sight box at the front left, window forward */
    box(TB.paint, 0.25, 0.75, 0.45, 0.85, 0.60, 0.95);
    box(TB.glass, 0.75, 0.77, 0.50, 0.80, 0.68, 0.88);
    /* the commander's sight on its tall post at the rear right [AJ1] */
    cylZ(TB.dark, -0.90, -0.65, 0.60, 1.05, 0.06, 8);
    box(TB.paint, -1.05, -0.65, -0.85, -0.45, 1.05, 1.30);
    box(TB.glass, -0.65, -0.63, -0.80, -0.50, 1.10, 1.25);
    /* the hatches, the smoke dischargers on the front cheeks */
    cylZ(TB.paint, -0.55, 0.40, 0.60, 0.66, 0.30, 14);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++)
      cyl(TB.dark, [0.90, s * (0.85 + i * 0.05), 0.35 + i * 0.08], [1.15, s * (0.95 + i * 0.05), 0.42 + i * 0.08], 0.045, 0.045, 8);
    ajaxDetail(B, TB);
    flush(THREE, g, B);
    g.add(grp(THREE, "turret", TB, A.TX, 0.0, A.ROOF));
    return g;
  }

  /* ================================================================ ARCHER
     [AR1] near side-on (Swedish, set up to fire, gun raised): the articulated Volvo A30D 6x6
     - the front unit with its short bonnet, the armoured cab over the front axle, the RWS on
     its roof; the rear unit on a tandem bogie with the box behind the joint; the gun mount
     trained about a point over the bogie, its big armoured cradle housing and the L52 tube.
     Scaled at 58 px a metre over a 10.3 m chassis (NOT CONFIRMED: no published chassis length
     was found; the published overall 14.1 m is gun forward).  Drawn in travel, the housing
     and gun laid level forward over the cab, so the "turret" trains it. */
  var AR = { X0: -5.15, X1: 5.15, AX: [3.98, -0.76, -2.18], RT: 0.75, TW: 0.62, YT: 1.05,
             CAB0: 1.65, CAB1: 4.45, CROOF: 2.76, TX: -1.47, TZ: 1.95 };
  function archer(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), A = AR, s, i;
    g.name = "eu_archer";
    /* the frames: front unit, the articulation, the rear unit to the tail */
    box(B.dark, A.X0, A.X1 - 0.40, -0.55, 0.55, 0.85, 1.20);
    /* the bonnet ahead of the cab and its grille [AR1] */
    prismY(B.paint, [[A.CAB1, 1.00], [A.X1, 1.00], [A.X1, 1.45], [A.X1 - 0.15, 1.60], [A.CAB1, 1.65]], -1.15, 1.15);
    box(B.dark, A.X1, A.X1 + 0.02, -0.80, 0.80, 1.08, 1.42);
    /* the armoured cab, its faces leaning in to the roof [AR1] */
    loftN(B.paint, [
      ring(A.CAB0, [[1.25, 1.00], [1.30, 1.90], [1.10, A.CROOF]]),
      ring(A.CAB1 - 0.40, [[1.25, 1.00], [1.30, 1.90], [1.10, A.CROOF]]),
      ring(A.CAB1, [[1.25, 1.00], [1.28, 1.70], [1.05, A.CROOF - 0.25]])]);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, A.CAB1 - 1.30, A.CAB1 - 0.55, s > 0 ? 1.27 : -1.31, s > 0 ? 1.31 : -1.27, 2.00, 2.45);
      box(B.glass, A.CAB1 - 0.10, A.CAB1 + 0.02, s * 0.55 - 0.35, s * 0.55 + 0.35, 1.95, 2.30);
      /* the mirrors on their frames ahead of the cab [AR1] */
      bar(B.dark, [A.CAB1, s * 1.20, 2.40], [A.CAB1 + 0.25, s * 1.45, 2.50], 0.025);
      box(B.dark, A.CAB1 + 0.22, A.CAB1 + 0.28, s * 1.45 - 0.10, s * 1.45 + 0.10, 2.25, 2.60);
      /* the mudguards over the front wheels and over the bogie */
      box(B.paint, A.AX[0] - 0.85, A.AX[0] + 0.85, s > 0 ? 0.80 : -1.42, s > 0 ? 1.42 : -0.80, 1.55, 1.62);
      box(B.paint, A.AX[2] - 0.85, A.AX[1] + 0.85, s > 0 ? 0.80 : -1.42, s > 0 ? 1.42 : -0.80, 1.55, 1.62);
      /* the spades folded up at the tail [AR1] */
      prismY(B.dark, [[A.X0, 0.60], [A.X0 + 0.80, 0.90], [A.X0 + 0.80, 1.40], [A.X0, 1.40]], s * 0.55 - 0.10, s * 0.55 + 0.10);
    }
    /* the box on the rear unit behind the joint, the frame under the mount [AR1] */
    box(B.paint, -0.90, 1.55, -1.25, 1.25, 1.10, 1.95);
    box(B.paint, -4.20, -0.90, -1.00, 1.00, 1.10, 1.60);
    box(B.team, A.CAB0 + 0.30, A.CAB0 + 0.60, -0.80, 0.80, A.CROOF, A.CROOF + 0.012);
    /* the remote weapon station on the cab roof */
    cylZ(B.paint, 2.55, 0.35, A.CROOF, A.CROOF + 0.10, 0.25, 12);
    box(B.dark, 2.35, 2.75, 0.20, 0.50, A.CROOF + 0.10, A.CROOF + 0.40);
    tube(B.dark, 2.75, 3.45, 0.35, A.CROOF + 0.28, 0.03, 0.03, 8);
    archerDetail(B);
    flush(THREE, g, B);
    wheelGroups(THREE, T, g, A.AX, A.RT, function (W) { tyrePair(T, W, A.RT, A.TW, A.YT, 0.42, true); });
    /* the mount: the slewing base over the bogie, the armoured cradle housing laid level,
       the L52 tube with its muzzle brake */
    var TB = bins(T);
    cylZ(TB.paint, 0, 0, 0.0, 0.20, 0.90, 18);
    loftN(TB.paint, [
      ring(-2.00, [[1.00, 0.20], [1.15, 0.80], [0.95, 1.35]]),
      ring(2.40, [[1.00, 0.20], [1.15, 0.80], [0.95, 1.35]]),
      ring(3.10, [[0.55, 0.65], [0.65, 1.00], [0.50, 1.30]])]);
    tube(TB.paint, 3.10, 9.00, 0, 1.05, 0.11, 0.10, 14);
    tube(TB.dark, 9.00, 9.45, 0, 1.05, 0.16, 0.16, 12);
    box(TB.team, -1.80, -1.50, -0.70, 0.70, 1.35, 1.36);
    /* the housing's panels and hatches, its lifting eyes, the cradle's slides [AR1] */
    for (var q = -1; q <= 1; q += 2) {
      for (i = 0; i < 4; i++) box(TB.dark, -1.80 + i * 1.05, -1.78 + i * 1.05, q > 0 ? 1.145 : -1.16, q > 0 ? 1.16 : -1.145, 0.30, 1.25);
      hatchSq(TB, -1.40, -0.60, q > 0 ? 0.20 : -0.80, q > 0 ? 0.80 : -0.20, 1.35);
      cylY(TB.dark, 2.20, q * 0.85 - 0.04, q * 0.85 + 0.04, 1.40, 0.06, 8);
      box(TB.dark, 2.40, 3.10, q > 0 ? 0.50 : -0.62, q > 0 ? 0.62 : -0.50, 0.85, 0.95);
    }
    for (i = 0; i < 6; i++) box(TB.dark, 9.05 + i * 0.07, 9.09 + i * 0.07, -0.17, 0.17, 0.99, 1.11);
    g.add(grp(THREE, "turret", TB, A.TX, 0, A.TZ));
    return g;
  }

  /* ================================================================ DETAIL PASSES
     the fittings of each build (rule 10): lamps and guards, tow hooks, grab handles, tools,
     hatches and their hinges, vision blocks, stowage, aerials, mudguards.  Where each one sits
     is taken off the same photographs as the build; the fittings' own sizes are typical of the
     class and NOT CONFIRMED individually. */
  function sideHandles(B, xs, y, z, s) {
    for (var i = 0; i < xs.length; i++) grab(B, [xs[i] - 0.12, y, z], [xs[i] + 0.12, y, z], [0, s, 0]);
  }
  function fennekDetail(B) {
    var F = FN, s, x;
    for (s = -1; s <= 1; s += 2) {
      lamp(B, F.X1 - 0.08, s * (F.HW - 0.30), 1.08, 1, 0.075);
      marker(B, F.X1 - 0.09, s * (F.HW - 0.55), 1.10, 1);
      towHook(B, F.X1 - 0.08, s * 0.45, 0.70, 1);
      towHook(B, F.X0, s * 0.55, 0.95, -1);
      marker(B, F.X0, s * 0.85, 1.15, -1);
      /* the door handles, the grab handles along the roof edge */
      grab(B, [-0.30, s * (F.HW + 0.0), 1.15], [-0.05, s * F.HW, 1.15], [0, s, 0]);
      sideHandles(B, [-2.20, -1.40], s * (F.RHW + 0.12), 1.95, s);
      /* the mudguard flaps behind each wheel */
      for (x = 0; x < 2; x++) box(B.dark, F.AX[x] - F.RT - 0.12, F.AX[x] - F.RT - 0.09, s * F.YT - 0.20, s * F.YT + 0.20, 0.30, 0.95);
      /* the stowage bin on the rear quarter */
      box(B.paint, -2.70, -1.95, s > 0 ? F.HW : -F.HW - 0.12, s > 0 ? F.HW + 0.12 : -F.HW, 1.25, 1.60);
      box(B.dark, -2.40, -2.25, s > 0 ? F.HW + 0.12 : -F.HW - 0.125, s > 0 ? F.HW + 0.125 : -F.HW - 0.12, 1.42, 1.50);
    }
    /* the roof hatches with hinges, vision blocks round the commander's, aerials, a jerrycan */
    hatchSq(B, -0.90, -0.30, 0.15, 0.75, F.ROOF);
    periscopes(B, -0.60, 0.45, F.ROOF, 0.42, 4, 0.3, 2.6);
    hatchSq(B, -1.85, -1.30, -0.70, -0.15, F.ROOF);
    aerial(B, -2.55, -0.75, F.ROOF, 1.8);
    aerial(B, -2.55, 0.20, F.ROOF, 1.3);
    box(B.dark, F.X0 - 0.05, F.X0, -0.75, 0.05, 1.00, 1.60);
    jerry(B, F.X0 + 0.20, -F.HW - 0.08, 1.15, -1);
    bag(B, -2.65, -1.95, -0.10, 0.45, F.ROOF, F.ROOF + 0.25);
    /* the roof rail round the rear deck, the window frames and the wiper arms [FN1][FN2] */
    for (s = -1; s <= 1; s += 2) {
      for (x = 0; x < 4; x++) bar(B.dark, [-2.70 + x * 0.55, s * (F.RHW - 0.05), F.ROOF], [-2.70 + x * 0.55, s * (F.RHW - 0.05), F.ROOF + 0.12], 0.012);
      bar(B.dark, [-2.70, s * (F.RHW - 0.05), F.ROOF + 0.12], [-1.05, s * (F.RHW - 0.05), F.ROOF + 0.12], 0.014);
      box(B.dark, -0.58, 0.18, s > 0 ? F.RHW + 0.05 : -F.RHW - 0.10, s > 0 ? F.RHW + 0.10 : -F.RHW - 0.05, 1.59, 1.62);
      box(B.dark, -0.58, 0.18, s > 0 ? F.RHW + 0.05 : -F.RHW - 0.10, s > 0 ? F.RHW + 0.10 : -F.RHW - 0.05, 1.88, 1.91);
      bar(B.dark, [F.SCR0 - 0.02, s * 0.20, 1.50], [F.SCR0 - 0.30, s * 0.55, 1.88], 0.010);
      /* the lifting eyes on the bonnet, the bolted armour plates' heads along the waist */
      cylY(B.dark, F.X1 - 0.85, s * 0.55 - 0.03, s * 0.55 + 0.03, 1.26, 0.05, 8);
      for (x = 0; x < 9; x++) cylY(B.dark, -2.50 + x * 0.55, s * F.HW, s * (F.HW + 0.015), F.WAIST - 0.05, 0.018, 6);
    }
  }
  function wieselDetail(B, W, two) {
    var s, X0 = -W.L / 2, X1 = W.L / 2;
    for (s = -1; s <= 1; s += 2) {
      lamp(B, X1 - 0.26, s * (W.HW - 0.15), W.NOSEZ + 0.37, 1, 0.06);
      towHook(B, X1 - 0.02, s * 0.35, W.NOSEZ - 0.05, 1);
      towHook(B, X0, s * 0.40, 0.55, -1);
      grab(B, [X0 + 0.40, s * (W.HW - 0.05), W.ROOF], [X0 + 0.80, s * (W.HW - 0.05), W.ROOF], [0, 0, 1]);
      /* the front mudflaps of the track guards */
      box(B.dark, X1 - 0.25, X1 - 0.22, s * W.TY - W.TW, s * W.TY + W.TW, W.SIDE - 0.25, W.SIDE);
    }
    /* the shovel and crowbar on the starboard sponson, the driver's hatch and periscopes */
    tools(B, X0 + 0.40, W.HW, W.SIDE + 0.12, -1);
    hatch(B, 0.30, 0.45, W.ROOF, 0.24);
    periscopes(B, 0.62, 0.45, W.ROOF - 0.02, 0.10, 3, -0.7, 0.7);
    aerial(B, X0 + 0.25, -0.65, W.ROOF + (two ? 0.25 : 0), 1.6);
    bag(B, X0 + 0.15, X0 + 0.75, -0.60, 0.10, W.ROOF + (two ? 0.25 : 0), W.ROOF + (two ? 0.48 : 0.22));
    jerry(B, X0 + 0.30, W.HW + 0.08, W.SIDE + 0.02, 1);
  }
  function pzhDetail(B, TB) {
    var P = PZ, s;
    for (s = -1; s <= 1; s += 2) {
      lamp(B, P.X1 - 0.24, s * 1.45, 1.36, 1, 0.07);
      towHook(B, P.X1, s * 0.75, 0.95, 1);
      towHook(B, P.X0, s * 0.80, 1.00, -1);
      marker(B, P.X0, s * 1.30, 1.70, -1);
      /* tools along the top of the skirts, grab handles on the turret sides */
      tools(B, -2.60, P.HW - 0.02, 1.36, s);
      sideHandles(TB, [-2.60, -1.60, -0.60], s * 1.47, 0.95, s);
      /* the bags strapped on the turret's rear corners */
      bag(TB, -3.45, -2.90, s > 0 ? 0.30 : -1.30, s > 0 ? 1.30 : -0.30, P.TROOF, P.TROOF + 0.28);
    }
    /* the driver's hatch and periscopes, the turret's hatches with their vision blocks */
    periscopes(B, 1.95, -0.82, P.DECK, 0.22, 3, -0.6, 0.6);
    hatch(TB, -1.10, 0.70, P.TROOF + 0.06, 0.30);
    hatch(TB, -1.10, -0.70, P.TROOF + 0.06, 0.30);
    periscopes(TB, -1.10, -0.70, P.TROOF + 0.06, 0.38, 5, -1.2, 1.2);
    aerial(TB, -3.10, 1.10, P.TROOF + 0.06, 2.2);
    aerial(TB, -3.10, -1.10, P.TROOF + 0.06, 2.2);
    grab(TB, [-3.48, -0.90, 0.80], [-3.48, 0.90, 0.80], [-1, 0, 0]);
  }
  function ajaxDetail(B, TB) {
    var A = AJ, s;
    for (s = -1; s <= 1; s += 2) {
      lamp(B, A.X1 - 0.14, s * 1.30, 1.50, 1, 0.07);
      towHook(B, A.X1 - 0.30, s * 0.70, 1.00, 1);
      towHook(B, A.X0, s * 0.85, 0.90, -1);
      marker(B, A.X0 - 0.04, s * 1.45, 1.95, -1);
      tools(B, -2.80, A.HW, 1.85, s);
      sideHandles(B, [-3.0, -1.6, 0.2], s * A.HW, 2.08, s);
      bag(B, A.X0 + 0.10, A.X0 + 0.90, s > 0 ? 0.30 : -1.20, s > 0 ? 1.20 : -0.30, A.ROOF, A.ROOF + 0.30);
    }
    periscopes(B, 2.85, 0.75, A.ROOF, 0.30, 3, -0.7, 0.7);
    hatchSq(B, -2.70, -1.90, -0.40, 0.40, A.ROOF);
    aerial(B, -3.40, 1.25, A.ROOF, 2.0);
    aerial(B, -3.40, -1.25, A.ROOF, 2.0);
    periscopes(TB, -0.55, 0.40, 0.60, 0.36, 5, -1.0, 1.0);
    sideHandles(TB, [-0.90, 0.20], 1.12, 0.50, 1);
    sideHandles(TB, [-0.90, 0.20], -1.12, 0.50, -1);
    bag(TB, -1.70, -1.30, -0.70, 0.70, 0.10, 0.45);
  }
  function jaguarDetail(B, TB) {
    var J = JG, s;
    for (s = -1; s <= 1; s += 2) {
      lamp(B, J.X1 - 0.22, s * 1.05, 1.36, 1, 0.07);
      towHook(B, J.X1 - 0.30, s * 0.60, 0.95, 1);
      towHook(B, J.X0, s * 0.70, 0.95, -1);
      marker(B, J.X0, s * 1.25, 1.60, -1);
      tools(B, -3.20, J.HW + 0.04, 1.49, s);
      sideHandles(B, [-2.0, 1.2], s * 1.36, 1.93, s);
      mudguard(B, J.AX[0], J.RT, J.TW + 0.10, s * J.YT, J.RT, s);
      bag(TB, -1.60, -1.25, s > 0 ? 0.10 : -0.90, s > 0 ? 0.90 : -0.10, 0.10, 0.55);
    }
    periscopes(B, 1.85, 0.65, J.ROOF - 0.08, 0.30, 3, -0.6, 0.6);
    hatch(TB, -0.55, -0.55, 0.82, 0.28);
    periscopes(TB, -0.55, -0.55, 0.82, 0.36, 4, -1.0, 1.0);
    aerial(TB, -1.10, 0.85, 0.82, 2.0);
    aerial(B, -3.30, -1.20, J.ROOF, 1.8);
  }
  function archerDetail(B) {
    var A = AR, s, k;
    for (s = -1; s <= 1; s += 2) {
      lamp(B, A.X1 + 0.02, s * 0.95, 1.28, 1, 0.08);
      towHook(B, A.X1 + 0.02, s * 0.40, 0.95, 1);
      marker(B, A.X0, s * 0.95, 1.05, -1);
      /* the cab steps and the door's grab handle, a ladder on the left */
      for (k = 0; k < 2; k++) box(B.dark, A.CAB1 - 1.00, A.CAB1 - 0.55, s > 0 ? 1.25 : -1.38, s > 0 ? 1.38 : -1.25, 0.65 + k * 0.32, 0.69 + k * 0.32);
      grab(B, [A.CAB1 - 1.40, s * 1.31, 1.30], [A.CAB1 - 1.40, s * 1.31, 2.20], [0, s, 0]);
      mudguard(B, A.AX[0], A.RT, A.TW + 0.10, s * A.YT, A.RT, s);
      jerry(B, -3.60, s * 1.08, 1.60, s);
      jerry(B, -3.20, s * 1.08, 1.60, s);
    }
    aerial(B, A.CAB0 + 0.20, -0.90, A.CROOF, 2.2);
    hatchSq(B, A.CAB0 + 0.15, A.CAB0 + 0.70, 0.10, 0.65, A.CROOF);
    bag(B, -0.80, 0.30, -1.20, -0.30, 1.95, 2.25);
    for (s = -1; s <= 1; s += 2) {
      /* the bolt heads along the cab's armour panels, the spade arms' rams, the side lockers */
      for (k = 0; k < 7; k++) cylY(B.dark, A.CAB0 + 0.15 + k * 0.38, s * 1.29, s * 1.31, 1.92, 0.02, 6);
      bar(B.dark, [A.X0 + 0.40, s * 0.55, 1.35], [A.X0 + 1.40, s * 0.55, 1.10], 0.04);
      box(B.paint, -2.90, -1.10, s > 0 ? 1.00 : -1.30, s > 0 ? 1.30 : -1.00, 1.10, 1.50);
      for (k = 0; k < 3; k++) box(B.dark, -2.80 + k * 0.60, -2.40 + k * 0.60, s > 0 ? 1.30 : -1.305, s > 0 ? 1.305 : -1.30, 1.15, 1.45);
      grab(B, [-2.60, s * 1.30, 1.40], [-2.30, s * 1.30, 1.40], [0, s, 0]);
    }
  }
  function truckDetail(B, X1, X0, zf, hw, cabRoof, cabX0, ax0, rt, tw, yt) {
    var s, k;
    for (s = -1; s <= 1; s += 2) {
      lamp(B, X1 + 0.15, s * (hw - 0.30), zf - 0.25, 1, 0.08);
      towHook(B, X1 + 0.15, s * 0.45, zf - 0.30, 1);
      towHook(B, X0, s * 0.45, zf - 0.40, -1);
      marker(B, X0, s * (hw - 0.20), zf - 0.15, -1);
      marker(B, X0, s * (hw - 0.40), zf - 0.15, -1);
      /* the cab steps, the grab handles by the doors */
      for (k = 0; k < 2; k++) box(B.dark, X1 - 1.10, X1 - 0.55, s > 0 ? hw - 0.30 : -hw, s > 0 ? hw : -hw + 0.30, 0.55 + k * 0.32, 0.59 + k * 0.32);
      grab(B, [X1 - 1.20, s * hw, zf + 0.30], [X1 - 1.20, s * hw, cabRoof - 0.60], [0, s, 0]);
      grab(B, [X1 - 0.45, s * hw, zf + 0.30], [X1 - 0.45, s * hw, cabRoof - 0.60], [0, s, 0]);
      /* rear mudflaps behind the last axle */
      box(B.dark, X0 + 0.25, X0 + 0.28, s * yt - tw / 2 - 0.05, s * yt + tw / 2 + 0.05, 0.30, zf);
    }
    hatchSq(B, cabX0 + 0.30, cabX0 + 0.90, -0.30, 0.30, cabRoof);
    aerial(B, cabX0 + 0.10, -hw + 0.15, cabRoof, 2.2);
  }
  function cr3Detail(B) {
    var s;
    for (s = -1; s <= 1; s += 2) {
      sideHandles(B, [-2.20, -1.00, 0.40], s * 1.60, 0.70, s);
      /* the bustle bins at the turret's rear, the bags on them */
      box(B.paint, -3.30, -2.95, s > 0 ? 0.10 : -1.25, s > 0 ? 1.25 : -0.10, 0.20, 0.75);
      grab(B, [-3.30, s * 0.40, 0.60], [-3.30, s * 0.90, 0.60], [-1, 0, 0]);
      bag(B, -3.25, -2.75, s > 0 ? 0.15 : -1.20, s > 0 ? 1.20 : -0.15, 0.86, 1.10);
      aerial(B, -2.60, s * 1.05, 0.86, 2.4);
    }
    periscopes(B, -0.65, -0.55, 0.95, 0.44, 6, -2.6, 2.6);
    periscopes(B, -0.10, 0.70, 0.95, 0.40, 2, 0.0, 0.8);
    cylY(B.dark, -0.95, -0.70, -0.40, 1.04, 0.03, 8);
  }

  /* ================================================================ FENNEK
     [FN1][FN2] front 3/4 (both sides of the type), [FN3] side: the faceted body, the long low
     bonnet with the lamp pods on its front corners, the big raked screen, the flat roof, the
     sensor head on its mast at the rear port corner, the weapon station on the roof front
     starboard, four big tyres at the ends.  Published 5.58 x 2.55 x 2.29 m. */
  var FN = { L: 5.58, X0: -2.79, X1: 2.79, AX: [1.62, -1.68], RT: 0.58, TW: 0.40, YT: 0.98,
             BELLY: 0.52, WAIST: 1.22, ROOF: 2.05, HW: 1.20, RHW: 0.95, SCR0: 0.95, SCR1: 0.20 };
  function fennek(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), s, F = FN;
    g.name = "eu_fennek";
    /* the body: bonnet from the nose (0.95 m up) to the screen foot, the screen raked back
       to the roof front, the flat roof to the rear plate; the sides lean in above the waist */
    loftN(B.paint, [
      ring(F.X0, [[F.HW - 0.05, 0.95], [F.HW, F.WAIST], [F.RHW, F.ROOF]]),
      ring(F.SCR1, [[F.HW, 0.95], [F.HW, F.WAIST], [F.RHW, F.ROOF]]),
      ring(F.SCR0, [[F.HW, 0.95], [F.HW, F.WAIST], [F.HW - 0.10, 1.48]]),
      ring(F.X1 - 0.25, [[F.HW - 0.10, 0.92], [F.HW - 0.05, 1.08], [F.HW - 0.20, 1.24]]),
      ring(F.X1, [[F.HW - 0.30, 0.80], [F.HW - 0.20, 0.95], [F.HW - 0.35, 1.08]])]);
    /* the narrow lower hull between the wheels, the belly 0.52 m up; the wheel arches open
       under the body's lower edge [FN1][FN2] */
    prismY(B.paint, [[F.X0 + 0.15, 0.95], [F.X0 + 0.40, F.BELLY], [F.X1 - 0.50, F.BELLY], [F.X1 - 0.05, 0.80], [F.X1 - 0.05, 0.95]], -0.72, 0.72);
    /* the windscreen panes and the side windows of the crew compartment [FN1][FN2] */
    var sa = Math.atan2(F.ROOF - 1.48, F.SCR0 - F.SCR1), cx = (F.SCR0 + F.SCR1) / 2, cz = (F.ROOF + 1.48) / 2;
    for (s = -1; s <= 1; s += 2)
      slab(B.glass, [cx + Math.sin(sa) * 0.012, s * 0.45, cz + Math.cos(sa) * 0.012], [-Math.cos(sa), 0, Math.sin(sa)], [0, 1, 0], [Math.sin(sa), 0, Math.cos(sa)], 0.40, 0.40, 0.012);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, -0.55, 0.15, s > 0 ? F.RHW + 0.06 : -F.RHW - 0.09, s > 0 ? F.RHW + 0.09 : -F.RHW - 0.06, 1.62, 1.88);
      /* the lamp pods on the bonnet's front corners, with the headlamp [FN1][FN2] */
      box(B.paint, F.X1 - 0.70, F.X1 - 0.10, s * (F.HW - 0.30) - 0.20, s * (F.HW - 0.30) + 0.20, 1.00, 1.18);
      /* wheel arches and the step plates between them */
      box(B.dark, -1.05, 1.05, s > 0 ? F.HW - 0.04 : -F.HW - 0.02, s > 0 ? F.HW + 0.02 : -F.HW + 0.04, 0.95, 1.00);
      /* the big mirrors on their arms at the screen's foot [FN1][FN2] */
      bar(B.dark, [F.SCR0, s * (F.HW - 0.05), 1.55], [F.SCR0 + 0.05, s * (F.HW + 0.02), 1.80], 0.025);
      box(B.dark, F.SCR0, F.SCR0 + 0.06, s * (F.HW - 0.02) - 0.09, s * (F.HW - 0.02) + 0.09, 1.70, 2.00);
      /* the side doors' outline */
      box(B.dark, 0.15, 0.17, s > 0 ? F.HW : -F.HW - 0.01, s > 0 ? F.HW + 0.01 : -F.HW, 0.97, F.WAIST);
      /* the lamp clusters on the rear plate */
      box(B.dark, F.X0 - 0.02, F.X0 + 0.01, s * 0.85 - 0.08, s * 0.85 + 0.08, 0.90, 1.05);
    }
    /* the towing eyes and the nose plate [FN1][FN2] */
    box(B.dark, F.X1 - 0.12, F.X1 + 0.05, -0.65, 0.65, 0.62, 0.78);
    /* the sensor mast at the rear port corner, retracted: the column and its two-window
       head [FN1][FN2] */
    cylZ(B.paint, -2.25, 0.70, F.ROOF, F.ROOF + 0.20, 0.12, 12);
    box(B.paint, -2.42, -2.08, 0.55, 0.85, F.ROOF + 0.20, F.ROOF + 0.48);
    box(B.dark, -2.08, -2.06, 0.60, 0.80, F.ROOF + 0.28, F.ROOF + 0.42);
    box(B.team, -1.40, -0.80, -0.50, 0.30, F.ROOF, F.ROOF + 0.012);
    fennekDetail(B);
    flush(THREE, g, B);
    wheelGroups(THREE, T, g, F.AX, F.RT, function (W) { tyrePair(T, W, F.RT, F.TW, F.YT, 0.34, true); });
    /* the weapon station on the roof front starboard: the ring, the cradle and the 12.7 mm */
    var TB = bins(T);
    cylZ(TB.paint, 0, 0, 0, 0.10, 0.30, 14);
    box(TB.dark, -0.25, 0.20, -0.15, 0.15, 0.10, 0.32);
    tube(TB.dark, 0.20, 1.10, 0, 0.24, 0.03, 0.028, 8);
    box(TB.dark, -0.10, 0.15, 0.15, 0.30, 0.10, 0.30);
    g.add(grp(THREE, "turret", TB, -0.20, -0.40, F.ROOF));
    return g;
  }

  /* ================================================================ EBRC JAGUAR
     [JG1] starboard side (Paris, 14 July): the box hull, the long glacis down to a wedge nose,
     axle 1 well forward and axles 2 and 3 closer together behind, the big 6x6 tyres, the
     turret over the rear half with the 40 mm CTA and the MMP launcher box on its side, the
     sight heads on the roof; [JG2] front 3/4: the wedge nose with the lamps in its upper face,
     the vertical sides.  Scaled at 81.7 px a metre over the published 7.1 m chassis (with
     the perspective of a near view: axle spacings NOT CONFIRMED to better than 0.2 m).
     Published 7.1 (7.8 with gun) x 2.99 x 2.8 m. */
  var JG = { X0: -3.55, X1: 3.55, AX: [2.55, 0.50, -1.15], RT: 0.66, TW: 0.48, YT: 1.20,
             BELLY: 0.70, SIDE: 1.70, ROOF: 2.08, HW: 1.49, LW: 1.25, TX: -0.10 };
  function ebrcJaguar(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), J = JG, s, i;
    g.name = "eu_ebrc_jaguar";
    /* REWORKED (visual review, 2026-11): the hull was one slab prism with a wedge cut on it; it
       is now two lofted bodies off [JG1][JG2] at 81.7 px a metre, as the photographs show it:
       - the lower hull BETWEEN the wheel rows, 1.84 m wide, its belly a shallow V (the
         mine-protected floor, [JG2] under the nose) and the lower nose plate raked up to the
         lamp line;
       - the upper body OVER the wheels, the full 2.98 m, its sides upright to the chine at
         1.66 m and then leaning in to the roof edge (the faceted upper side, [JG1]), the long
         glacis from 2.20 m forward down to the nose, its corners taken in so the nose narrows
         ([JG2] head on);
       - the arches: the upper body stops 0.62 m off the ground only BETWEEN the wheels (side
         panels between axles 1-2 and behind axle 3, [JG1]), so each tyre sits in its own arch.
       NOT CONFIRMED: the belly V depth (read off one 3/4 view); the chine height to +-0.05 m. */
    var LOWH = [[0.50, 0.58], [0.92, 0.80], [0.92, 1.34]];
    loftN(B.paint, [ring(J.X0, LOWH), ring(2.60, LOWH),
                    ring(3.30, [[0.62, 0.98], [0.92, 1.08], [0.92, 1.34]]),
                    ring(3.52, [[0.62, 1.12], [0.84, 1.16], [0.84, 1.34]])]);
    function up(x, zt, hw, zb, ti) { return ring(x, [[hw - 0.06, zb], [hw, zb + 0.10], [hw, Math.min(1.66, zt - 0.22)], [hw - ti, zt]]); }
    loftN(B.paint, [up(J.X0, 2.02, J.HW - 0.02, 1.30, 0.19), up(J.X0 + 0.08, 2.08, J.HW, 1.30, 0.20),
                    up(2.20, 2.08, J.HW, 1.30, 0.20), up(2.90, 1.78, 1.46, 1.24, 0.22),
                    up(3.40, 1.52, 1.30, 1.20, 0.18), up(3.55, 1.42, 1.15, 1.20, 0.12)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s > 0 ? J.HW : -J.HW, yi = s > 0 ? 0.90 : -0.90;
      /* the side panels that close the body down between the arches [JG1] */
      prismY(B.paint, [[1.26, 0.86], [1.84, 0.86], [1.84, 1.34], [1.26, 1.34]], Math.min(yi, yo), Math.max(yi, yo));
      prismY(B.paint, [[J.X0, 0.80], [-1.86, 0.80], [-1.86, 1.34], [J.X0, 1.34]], Math.min(yi, yo * 0.99), Math.max(yi, yo * 0.99));
      /* the chine line and the wheel-arch lips */
      box(B.dark, J.X0 + 0.05, 2.25, s > 0 ? J.HW : -J.HW - 0.02, s > 0 ? J.HW + 0.02 : -J.HW, 1.645, 1.675);
      for (i = 0; i < 3; i++) box(B.dark, J.AX[i] - 0.72, J.AX[i] + 0.72, s > 0 ? J.HW - 0.30 : -J.HW - 0.01, s > 0 ? J.HW + 0.01 : -J.HW + 0.30, 1.27, 1.31);
      /* the bolted add-on panels on the upper side, three a side, and their seams [JG1] */
      for (i = 0; i < 3; i++) {
        var px0 = -3.25 + i * 1.75;
        box(B.paint, px0, px0 + 1.55, s > 0 ? J.HW : -J.HW - 0.04, s > 0 ? J.HW + 0.04 : -J.HW, 1.36, 1.62);
        box(B.dark, px0 + 1.55, px0 + 1.58, s > 0 ? J.HW : -J.HW - 0.045, s > 0 ? J.HW + 0.045 : -J.HW, 1.34, 1.64);
      }
      /* the stowage box between axles 1 and 2 [JG1], its lid seam */
      box(B.paint, 1.30, 1.80, s > 0 ? J.HW - 0.01 : -J.HW - 0.07, s > 0 ? J.HW + 0.07 : -J.HW + 0.01, 0.92, 1.28);
      box(B.dark, 1.30, 1.80, s > 0 ? J.HW + 0.07 : -J.HW - 0.075, s > 0 ? J.HW + 0.075 : -J.HW - 0.07, 1.20, 1.215);
      /* the lamps set into the glacis' outer corners [JG2], the rear lamps */
      box(B.dark, 3.18, 3.42, s * 1.02 - 0.15, s * 1.02 + 0.15, 1.42, 1.58);
      box(B.glass, 3.40, 3.43, s * 1.02 - 0.11, s * 1.02 + 0.11, 1.44, 1.54);
      box(B.dark, J.X0 - 0.02, J.X0 + 0.01, s * 1.10 - 0.08, s * 1.10 + 0.08, 1.75, 1.90);
    }
    /* the driver's hatch and its periscope hood on the glacis top, the rear door and steps */
    box(B.paint, 1.70, 2.20, 0.35, 0.95, J.ROOF - 0.04, J.ROOF + 0.04);
    box(B.dark, J.X0 - 0.02, J.X0, -0.50, 0.50, 0.95, 1.90);
    box(B.dark, J.X0 - 0.12, J.X0, -0.45, 0.45, 0.62, 0.66);
    box(B.team, J.X0 - 0.03, J.X0 - 0.02, -1.15, -0.75, 1.95, 2.02);
    wheelGroups(THREE, T, g, J.AX, J.RT, function (W) { tyrePair(T, W, J.RT, J.TW, J.YT, 0.40, true); });
    /* the turret (origin on the ring).  REWORKED off [JG1]: it reaches from 1.6 m behind the
       ring to over the glacis; the roof runs flat to just ahead of the ring and then the whole
       front rakes down to the mantlet; the sides stand upright to a chine and lean in above
       it; the bustle overhangs the hull roof behind. */
    var TB = bins(T);
    function tr(x, hw, zc, zt, ti) { return ring(x, [[hw - 0.05, 0.0], [hw, zc], [hw - ti, zt]]); }
    loftN(TB.paint, [tr(-1.60, 1.00, 0.42, 0.80, 0.14), tr(0.25, 1.10, 0.45, 0.84, 0.14),
                     tr(1.40, 1.02, 0.38, 0.60, 0.17), tr(2.20, 0.70, 0.22, 0.38, 0.14)]);
    /* the bustle rack behind, on the turret's rear face */
    box(TB.dark, -1.95, -1.62, -0.85, 0.85, 0.30, 0.33);
    for (i = 0; i < 5; i++) bar(TB.dark, [-1.93, -0.84 + i * 0.42, 0.32], [-1.93, -0.84 + i * 0.42, 0.62], 0.015);
    bar(TB.dark, [-1.93, -0.84, 0.62], [-1.93, 0.84, 0.62], 0.015);
    bag(TB, -1.92, -1.64, -0.75, 0.15, 0.33, 0.58);
    /* the mantlet and the 40 mm CTA: the thick thermal sleeve, then the bare barrel */
    box(TB.paint, 2.05, 2.40, -0.30, 0.30, 0.10, 0.44);
    tube(TB.dark, 2.40, 3.25, 0, 0.27, 0.095, 0.085, 14);
    tube(TB.dark, 3.25, 4.18, 0, 0.27, 0.058, 0.055, 12);
    tube(TB.dark, 4.18, 4.25, 0, 0.27, 0.075, 0.075, 12);
    /* the MMP launcher box on the right of the turret, sloped up at its front [JG1] */
    prismY(TB.paint, [[-0.80, 0.50], [0.60, 0.50], [0.90, 0.80], [0.70, 0.98], [-0.80, 0.98]], -1.30, -1.02);
    box(TB.dark, 0.66, 0.94, -1.28, -1.04, 0.72, 0.92);
    cylX(TB.dark, 0.84, 0.92, -1.16, 0.82, 0.08, 12);
    /* the commander's panoramic sight (left rear) and the gunner's sight (front right) */
    cylZ(TB.dark, -0.55, 0.55, 0.82, 0.94, 0.08, 8);
    box(TB.paint, -0.75, -0.35, 0.35, 0.75, 0.94, 1.14);
    box(TB.glass, -0.35, -0.33, 0.42, 0.68, 0.98, 1.10);
    box(TB.paint, 0.60, 1.05, -0.80, -0.40, 0.70, 0.94);
    box(TB.glass, 1.05, 1.07, -0.75, -0.45, 0.74, 0.90);
    /* the small RWS on the roof [JG1], smoke dischargers on the front corners */
    cylZ(TB.paint, -0.10, -0.20, 0.82, 0.90, 0.18, 10);
    box(TB.dark, -0.25, 0.10, -0.32, -0.08, 0.90, 1.06);
    tube(TB.dark, 0.10, 0.55, -0.20, 0.98, 0.02, 0.02, 6);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) cyl(TB.dark, [1.30 - i * 0.14, s * 0.98, 0.46], [1.46 - i * 0.14, s * 1.06, 0.56], 0.045, 0.045, 8);
    box(TB.team, -1.40, -0.90, -0.50, 0.50, 0.81, 0.83);
    jaguarDetail(B, TB);
    flush(THREE, g, B);
    g.add(grp(THREE, "turret", TB, J.TX, 0, J.ROOF));
    return g;
  }

  /* ================================================================ PzH 2000
     [PZ1] side-on (Bergen-Hohne, ILUE 2012), measured at 54.4 px a metre over the hull's
     published 7.87 m: deck 1.84, turret roof 2.98, gun axis 2.85, the turret face 3.82 m behind
     the nose and its rear 0.40 m past the hull's, the road wheels at the stations below.  Seven road wheels, the front sprocket and rear idler, the skirts over the top run, the long low glacis with the
     powerpack forward, the big slab-sided turret over the rear two thirds, its roof armour,
     the L52 with its pepperpot brake laid forward over the travel lock.
     Published 11.7 x 3.6 x 3.1 m (gun forward), hull 7.87 m.  The travel lock, the roof
     sights and the smoke dischargers are NOT CONFIRMED in detail (too small in [PZ1]). */
  var PZ = { X0: -3.94, X1: 3.93, BELLY: 0.45, DECK: 1.84, HW: 1.74, LW: 1.25, TY: 1.42, TW: 0.27,
             XW: [2.68, 1.85, 1.06, 0.27, -0.72, -1.49, -2.28], ZW: 0.40, RW: 0.36,
             SPR: { x: 3.42, z: 0.80, r: 0.32 }, IDL: { x: -3.30, z: 0.64, r: 0.30 },
             TX: -0.85, TROOF: 1.08, GX: 0.09, GZ: 1.01, BL: 8.06 };
  function pzh2000(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), P = PZ, s, i, C2 = [];
    g.name = "eu_pzh2000";
    /* the tub: belly, nose plate, the long upper glacis to the deck, vertical rear */
    prismY(B.paint, [[P.X0, 0.75], [P.X0 + 0.20, P.BELLY], [P.X1 - 0.70, P.BELLY], [P.X1, 1.05], [P.X1 - 0.05, 1.20],
                     [1.30, P.DECK], [P.X0, P.DECK]], -P.LW, P.LW);
    /* the sponsons over the tracks and the skirts hung outboard, over the top run */
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[P.X0, 1.25], [P.X1 - 0.30, 1.25], [P.X1 - 0.10, 1.30], [1.30, P.DECK], [P.X0, P.DECK]],
             s > 0 ? P.LW : -P.HW, s > 0 ? P.HW : -P.LW);
      prismY(B.paint, [[P.X0 + 0.10, 0.82], [P.X1 - 0.55, 0.82], [P.X1 - 0.25, 1.10], [P.X1 - 0.25, 1.28], [P.X0 + 0.10, 1.28]],
             s > 0 ? P.HW : -P.HW - 0.04, s > 0 ? P.HW + 0.04 : -P.HW);
      for (i = 1; i < 6; i++) box(B.dark, P.X0 + 0.10 + i * 1.22 - 0.01, P.X0 + 0.10 + i * 1.22 + 0.01, s > 0 ? P.HW + 0.04 : -P.HW - 0.05, s > 0 ? P.HW + 0.05 : -P.HW - 0.04, 0.85, 1.25);
      /* headlamp guards on the glacis corners, rear lamps */
      box(B.dark, P.X0 - 0.02, P.X0 + 0.01, s * 1.30 - 0.08, s * 1.30 + 0.08, 1.45, 1.60);
    }
    /* the powerpack grilles on the front left, the driver's hatch front right */
    for (i = 0; i < 6; i++) box(B.dark, 1.45 + i * 0.30, 1.60 + i * 0.30, 0.20, 1.20, P.DECK - 0.24 * (i + 0.5) / 2.0 * 0.90 - 0.01, P.DECK - 0.24 * (i + 0.5) / 2.0 * 0.90 + 0.005);
    box(B.paint, 1.35, 1.85, -1.10, -0.55, P.DECK - 0.06, P.DECK + 0.04);
    /* the barrel's travel lock on the glacis, folded down when the gun is in action */
    for (s = -1; s <= 1; s += 2) bar(B.dark, [3.20, s * 0.18, 1.32], [3.45, s * 0.10, 2.20], 0.04);
    box(B.dark, 3.38, 3.52, -0.22, 0.22, 2.16, 2.30);
    box(B.team, P.X0 - 0.006, P.X0, -0.60, 0.60, 1.62, 1.72);
    track(B, (function () { for (i = 0; i < P.XW.length; i++) C2.push([P.XW[i], P.ZW, P.RW]); C2.push([P.SPR.x, P.SPR.z, P.SPR.r], [P.IDL.x, P.IDL.z, P.IDL.r]); return C2; })(), P.TY, P.TW, 0.16);
    sprocket(B, P.SPR.x, P.SPR.z, P.SPR.r, P.TY, 2 * P.TW - 0.06, 12);
    sprocket(B, P.IDL.x, P.IDL.z, P.IDL.r, P.TY, 2 * P.TW - 0.06, 0);
    wheelGroups(THREE, T, g, P.XW, P.ZW, function (W) { roadPair(T, W, P.RW, 2 * P.TW - 0.06, P.TY, 0); });

    /* the turret (origin on the ring at the deck): slab sides, the front faces leaning back,
       a long overhang behind the hull, the add-on roof armour */
    var TB = bins(T);
    loftN(TB.paint, [
      ring(-3.48, [[1.35, 0.00], [1.45, 0.25], [1.40, P.TROOF]]),
      ring(0.60, [[1.42, 0.00], [1.50, 0.25], [1.45, P.TROOF]]),
      ring(0.96, [[1.20, 0.10], [1.30, 0.30], [1.20, P.TROOF - 0.15]])]);
    box(TB.paint, -3.30, 0.50, -1.30, 1.30, P.TROOF, P.TROOF + 0.06);
    /* the cradle housing tapering forward of the face [PZ1], the thick sleeve */
    cyl(TB.paint, [0.96, 0, P.GZ], [1.50, 0, P.GZ], 0.40, 0.22, 14);
    tube(TB.paint, 1.50, 3.20, 0, P.GZ, 0.19, 0.17, 16);
    /* the L52 (8.06 m from the breech; muzzle 11.6 m from the turret's rear face, [PZ1]):
       the tube and the pepperpot muzzle brake */
    tube(TB.paint, 3.20, P.GX + P.BL - 0.55, 0, P.GZ, 0.12, 0.10, 14);
    tube(TB.dark, P.GX + P.BL - 0.55, P.GX + P.BL, 0, P.GZ, 0.15, 0.15, 12);
    for (i = 0; i < 4; i++) box(TB.dark, P.GX + P.BL - 0.50 + i * 0.12, P.GX + P.BL - 0.45 + i * 0.12, -0.16, 0.16, P.GZ - 0.05, P.GZ + 0.05);
    for (s = -1; s <= 1; s += 2) {
      /* the commander's and the gunner's sights, the hatches, smoke dischargers on the front corners */
      box(TB.paint, -0.10, 0.40, s * 0.85 - 0.25, s * 0.85 + 0.25, P.TROOF + 0.06, P.TROOF + 0.26);
      box(TB.dark, 0.40, 0.42, s * 0.85 - 0.18, s * 0.85 + 0.18, P.TROOF + 0.10, P.TROOF + 0.22);
      cylZ(TB.paint, -1.10, s * 0.70, P.TROOF + 0.06, P.TROOF + 0.12, 0.33, 14);
      for (i = 0; i < 4; i++) cyl(TB.dark, [0.35, s * (1.35 + i * 0.03), 0.95 + i * 0.10], [0.60, s * (1.42 + i * 0.03), 1.05 + i * 0.10], 0.045, 0.045, 8);
      /* the ammunition hatch frame on the rear face's side, stowage boxes */
      box(TB.paint, -3.20, -1.80, s > 0 ? 1.45 : -1.58, s > 0 ? 1.58 : -1.45, 0.35, 0.80);
      box(TB.team, -2.80, -2.20, s > 0 ? 1.58 : -1.60, s > 0 ? 1.60 : -1.58, 0.85, 0.95);
    }
    pzhDetail(B, TB);
    flush(THREE, g, B);
    g.add(grp(THREE, "turret", TB, P.TX, 0, P.DECK));
    return g;
  }

  /* ================================================================ REUSED BUILDERS
     helpers for working on the group another hero module returns (the js/hero/deu_us_pattern.js
     idea): find a named child, repaint the textured coat in this file's plain paint */
  function child(g, name) {
    var r = null;
    g.traverse(function (o) { if (!r && o.name === name) r = o; });
    return r;
  }
  /* every mesh whose material carries a painted canvas (the module's coat) gets this file's
     plain coat instead; dark, glass, team and vertex-coloured wheels are left alone */
  function repaint(THREE, g, key) {
    var tx = paintTex(THREE, key), done = {}, mat = null;
    g.traverse(function (o) {
      if (!o.isMesh || !o.material || o.material.vertexColors || !o.material.map) return;
      if (!mat) {
        mat = o.material.clone();
        if (tx) { mat.map = tx; mat.color.setHex(0xffffff); } else { mat.map = null; mat.color.set(PAINTS[key].base); }
      }
      o.material = mat;
    });
    return mat;
  }

  /* append a bin's triangles to an existing mesh of the module (same material), so a fitting
     costs no draw call: the mesh's geometry is rebuilt non-indexed with the bin's triangles
     added (attributes the bin lacks are filled: uv 0, colour white) */
  function mergeInto(THREE, mesh, bin) {
    if (!bin.P.length) return;
    var geo = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry, out = new THREE.BufferGeometry();
    var n = bin.P.length / 3, names = ["position", "normal", "uv", "color"], k, a, arr, src, i;
    for (k = 0; k < names.length; k++) {
      a = geo.attributes[names[k]];
      if (!a) continue;
      arr = new Float32Array(a.array.length + n * a.itemSize);
      arr.set(a.array);
      src = names[k] === "position" ? bin.P : names[k] === "normal" ? bin.N : names[k] === "uv" ? bin.U : bin.C;
      for (i = 0; i < n * a.itemSize; i++) arr[a.array.length + i] = src ? src[i] : (names[k] === "color" ? 1 : 0);
      out.setAttribute(names[k], new THREE.BufferAttribute(arr, a.itemSize));
    }
    mesh.geometry = out;
  }
  /* the first direct-child mesh of g whose material passes the test */
  function meshOf(g, test) {
    for (var i = 0; i < g.children.length; i++) { var o = g.children[i]; if (o.isMesh && o.material && test(o.material)) return o; }
    return null;
  }

  /* ---------------------------------------------------------------- M270A2 / MARS II
     HeroUsMlrs (js/hero/us_m270_himars.js) draws the M270A1: its rows are added to the module's
     own table (as js/hero/deu_us_pattern.js and js/hero/gb_retry.js do), in its near-plain
     "carc" green, with the A1/A2 louvred panel.  The A2's new armoured cab [MA2] is drawn here
     as a shell over the A1 cab (which the module bakes into the hull mesh): measured off the
     side drawing [MA2] at 135.7 px a metre (7.00 m hull): the cab from 1.95 m behind the nose
     to the nose, roof 2.56 m, the front upright to 1.70 m, then raked back to 0.44 m behind
     the nose at the roof.  Every point of the A1 cab lies inside it (checked against the dump
     of mlrs_n: the A1's raked front is 3.21 m forward at 2.0 m up, the A2's 3.37). */
  function m270a2(THREE, M, C, key) {
    var g = HeroUsMlrs.build(key, THREE, M, C), T = materials(THREE, C, "gbr"), B = bins(T), s;
    var skinM = meshOf(g, function (m) { return !!m.map && !m.vertexColors; });
    var darkM = meshOf(g, function (m) { return !m.map && !m.vertexColors && m.color && m.color.r < 0.2 && m.color.g < 0.2; });
    var P = new Bin(skinM ? skinM.material : T.paint, true), D = new Bin(darkM ? darkM.material : T.dark, false);
    prismY(P, [[1.57, 1.10], [3.49, 1.10], [3.49, 1.70], [3.38, 2.00], [3.08, 2.56], [1.57, 2.56]], -1.51, 1.51);
    var sa = Math.atan2(2.56 - 2.00, 3.38 - 3.08);
    for (s = -1; s <= 1; s += 2) {
      /* the two front windows in the raked upper face, the door and rear windows [MA2]
         (dark: the module's glass is not one of its root meshes) */
      slab(D, [3.23 + Math.sin(sa) * 0.012, s * 0.70, 2.28 + Math.cos(sa) * 0.012], [-Math.cos(sa), 0, Math.sin(sa)],
           [0, 1, 0], [Math.sin(sa), 0, Math.cos(sa)], 0.20, 0.45, 0.012);
      box(D, 2.55, 2.95, s > 0 ? 1.51 : -1.52, s > 0 ? 1.52 : -1.51, 1.95, 2.35);
      box(D, 1.95, 2.25, s > 0 ? 1.51 : -1.52, s > 0 ? 1.52 : -1.51, 2.00, 2.30);
      /* the door's edges */
      box(D, 2.40, 2.42, s > 0 ? 1.51 : -1.52, s > 0 ? 1.52 : -1.51, 1.20, 2.45);
      box(D, 3.05, 3.07, s > 0 ? 1.51 : -1.52, s > 0 ? 1.52 : -1.51, 1.20, 2.45);
      /* the lamp guards at the bottom of the front */
      box(D, 3.49, 3.53, s * 1.20 - 0.10, s * 1.20 + 0.10, 1.15, 1.35);
    }
    if (skinM && darkM) { mergeInto(THREE, skinM, P); mergeInto(THREE, darkM, D); }
    else { var hg = new THREE.Group(); hg.name = "a2cab"; flush(THREE, hg, { paint: P, dark: D }); g.add(hg); }
    return g;
  }

  /* ---------------------------------------------------------------- CHALLENGER 3
     the Challenger 2 hull, running gear and paint of HeroGBTanks.challenger("cr2", "nato")
     (js/hero/gb_tanks.js), its turret group emptied and the new turret drawn into it [CR3a]
     head-on, [CR3b] front 3/4 (the ATD).  Turret frame: the CR2's (X 0.45 on the ring, the
     deck 1.57 m).  What the photographs show: the slab-sided turret as wide as the hull, a
     raised centre block round the mantlet with the cheek armour stepped back either side of
     it, a four-tube smoke discharger on each cheek face, the gunner's sight box at the front
     of the roof on the right, the commander's tall sight head behind it right of centre, the
     loader's flat hatch on the left, the 120 mm smoothbore in its thick thermal shroud with no
     fume extractor.  Proportions are taken off [CR3a] against the hull's published 3.52 m
     width (track to track): turret roof 0.95 m over the deck, the cheeks 1.62 m out. */
  function cr3Turret(B) {
    var s, i;
    loftN(B.paint, [
      ring(-3.00, [[1.25, 0.10], [1.32, 0.40], [1.25, 0.86]]),
      ring(-2.55, [[1.45, 0.02], [1.58, 0.40], [1.52, 0.95]]),
      ring(1.30, [[1.48, 0.02], [1.62, 0.40], [1.55, 0.95]]),
      ring(1.95, [[1.40, 0.10], [1.58, 0.35], [1.45, 0.70]])]);
    cylZ(B.dark, 0, 0, -0.03, 0.04, 1.10, 24);
    /* the centre block over the mantlet, standing proud of the cheeks [CR3a][CR3b] */
    box(B.paint, 1.30, 2.30, -0.60, 0.60, 0.15, 0.85);
    box(B.dark, 2.30, 2.32, -0.58, -0.56, 0.20, 0.80);
    box(B.dark, 2.30, 2.32, 0.56, 0.58, 0.20, 0.80);
    box(B.paint, 2.30, 2.48, -0.32, 0.32, 0.25, 0.62);
    for (s = -1; s <= 1; s += 2) {
      /* the four-tube smoke dischargers on the cheek faces, aimed out and up */
      box(B.dark, 1.88, 1.98, s * 1.05 - 0.16, s * 1.05 + 0.16, 0.40, 0.58);
      for (i = 0; i < 4; i++) {
        var y = s * (0.93 + (i % 2) * 0.24), z = 0.50 + (i < 2 ? 0 : 0.14);
        cyl(B.dark, [1.95, y, z], [2.25, y + s * 0.06, z + 0.10], 0.055, 0.055, 8);
      }
      box(B.team, -2.40, -1.80, s > 0 ? 1.57 : -1.60, s > 0 ? 1.60 : -1.57, 0.55, 0.65);
    }
    /* the gunner's sight box at the front right of the roof, its window forward */
    box(B.paint, 1.00, 1.60, -1.05, -0.55, 0.95, 1.22);
    box(B.glass, 1.60, 1.62, -0.98, -0.62, 1.00, 1.16);
    /* the commander's sight head right of centre behind it, on its column [CR3a] */
    cylZ(B.paint, 0.10, -0.30, 0.95, 1.12, 0.22, 14);
    box(B.paint, -0.10, 0.35, -0.52, -0.08, 1.12, 1.50);
    box(B.glass, 0.35, 0.37, -0.45, -0.15, 1.24, 1.44);
    /* the commander's hatch behind, the loader's flat hatch on the left [CR3a] */
    cylZ(B.paint, -0.65, -0.55, 0.95, 1.02, 0.36, 16);
    box(B.paint, -0.10, 0.70, 0.35, 1.05, 0.95, 1.01);
    /* the 120 mm L55A1 smoothbore: the shroud, the tube (muzzle 7.52 m, as the CR2's) */
    tube(B.paint, 2.48, 3.35, 0, 0.44, 0.17, 0.17, 16);
    tube(B.paint, 3.35, 7.07, 0, 0.44, 0.13, 0.115, 16);
    tube(B.dark, 7.03, 7.08, 0, 0.44, 0.10, 0.10, 12);
  }
  function challenger3(THREE, M, C) {
    var g = HeroGBTanks.challenger(THREE, M, C, "cr2", "nato"), tg = child(g, "turret"), T = materials(THREE, C, "gbr");
    var skin = null, dk = null, i;
    for (i = 0; i < tg.children.length; i++) {
      var m = tg.children[i].material;
      if (m && m.map && !skin) skin = m;
      else if (m && !m.map && m.color && m.color.r < 0.2 && !dk) dk = m;
    }
    while (tg.children.length) tg.remove(tg.children[0]);
    var B = bins(T);
    if (skin) B.paint = new Bin(skin, true);
    if (dk) B.dark = new Bin(dk, false);
    cr3Turret(B);
    cr3Detail(B);
    flush(THREE, tg, B);
    g.name = "eu_challenger3";
    return g;
  }

  /* ---------------------------------------------------------------- PATRIOT (sam_g)
     the German launcher on the MAN Kat I A1 of HeroNatoLaunchersEu.buildPatriot
     (js/hero/nato_launchers_eu.js: the Bundeswehr's launcher rides a MAN truck, not the US
     M983/M860 of js/hero/us_patriot.js, which has no plain paint either), its three-colour
     coat replaced by this file's plain bronze green.  The load is the module's 2 x 2 canister
     stack, as on the 2017 German launcher [PS17]; the PAC-3 MSE load of the row (twelve
     single canisters) is NOT drawn: no photograph of a German MSE launcher was found. */
  function patriotDe(THREE, M, C) {
    var g = HeroNatoLaunchersEu.buildPatriot(THREE, C, { paint: "de3" });
    repaint(THREE, g, "deu");
    g.name = "eu_patriot_de";
    return g;
  }

  /* ---------------------------------------------------------------- M113 RADARS
     the M113 hull of js/hero/us_m113.js (HeroM113), built from a row added to its exposed
     VARIANTS table in this file's plain bronze green; the module's turret group (the variant
     falls through to its VADS turret) is emptied and the radar drawn into it, moved to the
     radar's own station. */
  function m113Radar(THREE, M, C, which, fn, x, y) {
    var g = HeroM113.build(THREE, M, C, which), tg = child(g, "turret"), hull = child(g, "hull");
    var T = materials(THREE, C, "deu"), skin = null, dk = null;
    if (hull) hull.children.forEach(function (o) {
      if (o.material && o.material.map && !skin) skin = o.material;
      else if (o.material && !o.material.map && o.material.color && o.material.color.r < 0.2 && !dk) dk = o.material;
    });
    while (tg.children.length) tg.remove(tg.children[0]);
    tg.position.set(x, y, 1.87);
    var B = bins(T);
    if (skin) B.paint = new Bin(skin, true);
    if (dk) B.dark = new Bin(dk, false);
    fn(B);
    flush(THREE, tg, B);
    return g;
  }
  /* Green Archer [GA1] (the Danish set in the Aalborg museum, the photograph en.wikipedia's
     "Green Archer (radar)" carries): the radar cabinet on the rear roof, its louvred side
     panels, the big curved reflector standing over it, the hand rail.  Sizes proportioned
     off [GA1] against the M113's 2.69 m width: NOT CONFIRMED to better than about 15 cm. */
  function greenArcher(B) {
    var s, i, pts = [];
    cylZ(B.dark, 0, 0, 0, 0.06, 0.55, 16);
    box(B.paint, -0.70, 0.55, -0.80, 0.80, 0.06, 0.90);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++)
      box(B.dark, -0.55 + i * 0.35, -0.35 + i * 0.35, s > 0 ? 0.80 : -0.81, s > 0 ? 0.81 : -0.80, 0.40, 0.75);
    /* the reflector: a curved sheet 1.7 m wide, open face forward, from the cabinet's top
       to 2.7 m over the roof, ribbed behind [GA1] */
    for (i = 0; i <= 6; i++) { var a = -0.15 + i * 0.13; pts.push([0.55 - 1.9 * (1 - Math.cos(a)) - 0.40 * i / 6, 0.95 + 1.9 * (Math.sin(a) + 0.15) * 0.95]); }
    for (i = 0; i < 6; i++) {
      belt(B.paint, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], -0.85, 0.85, 0.04);
      belt(B.dark, pts[i][0] - 0.05, pts[i][1], pts[i + 1][0] - 0.05, pts[i + 1][1], -0.03, 0.03, 0.08);
    }
    /* the feed arm out in front of the dish, its struts to the cabinet */
    bar(B.dark, [0.45, 0, 0.92], [0.95, 0, 1.75], 0.035);
    box(B.dark, 0.88, 1.04, -0.10, 0.10, 1.70, 1.86);
    for (s = -1; s <= 1; s += 2) bar(B.dark, [0.50, s * 0.75, 0.90], [pts[3][0], s * 0.80, pts[3][1]], 0.03);
    /* the hand rail round the roof behind [GA1] */
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [-0.70, s * 0.85, 0.90], [-0.70, s * 0.85, 1.40], 0.02);
      bar(B.dark, [-0.70, s * 0.85, 1.40], [0.55, s * 0.85, 1.40], 0.02);
    }
  }
  /* RATAC-S [RS1] (Bundeswehr ABRA, Dynamic Front 2025, head on, set up): the telescopic
     mast at the rear on the port side, raised (its top 4.7 m up, scaled at 312 px a metre off
     the hull's 2.69 m), the antenna and its electronics box hung on a bracket from the mast
     head toward the centre line, the flat antenna face 1.0 x 0.85 m.  Drawn raised, as the
     only photograph shows it; the "turret" is the mast, which trains the head. */
  function ratacS(B) {
    cylZ(B.paint, 0, 0, 0.0, 1.60, 0.12, 14);
    cylZ(B.paint, 0, 0, 1.60, 2.40, 0.10, 14);
    cylZ(B.paint, 0, 0, 2.40, 2.83, 0.085, 12);
    cylZ(B.paint, 0, 0, 2.83, 2.86, 0.16, 14);
    /* the bracket down the mast's side and across to the head */
    box(B.dark, 0.10, 0.16, -0.10, 0.10, 2.05, 2.75);
    box(B.dark, 0.00, 0.20, -0.62, 0.00, 2.62, 2.70);
    /* the electronics box and the antenna above it, face forward */
    box(B.paint, -0.25, 0.20, -0.82, -0.42, 2.70, 3.05);
    box(B.paint, -0.10, 0.25, -0.80, -0.44, 3.05, 3.30);
    box(B.paint, 0.25, 0.32, -1.12, -0.12, 3.20, 4.05);
    box(B.dark, 0.32, 0.33, -1.08, -0.16, 3.24, 4.01);
  }
  function abraBox(THREE, g, C) {
    /* the raised box over the rear of the roof [RS1][AB1] */
    var B = bins(materials(THREE, C, "deu")), hull = child(g, "hull"), skin = null;
    hull.children.forEach(function (o) { if (o.material && o.material.map && !skin) skin = o.material; });
    if (skin) B.paint = new Bin(skin, true);
    box(B.paint, -2.30, -0.30, -1.05, 1.05, 1.86, 2.20);
    var m = meshOf(hull, function (q) { return q === skin; });
    if (m) mergeInto(THREE, m, B.paint); else flush(THREE, hull, B);
  }

  /* ================================================================ TRUCKS
     One chassis kit for the forward-control MAN trucks: the frame, the axles as "roadwheel"
     groups, mudguards; a cab per family; a body per row. */
  function truckFrame(B, x0, x1, zf, hw) {
    box(B.dark, x0, x1, -hw, -hw + 0.12, zf - 0.28, zf);
    box(B.dark, x0, x1, hw - 0.12, hw, zf - 0.28, zf);
    box(B.dark, x0 - 0.05, x0, -1.15, 1.15, zf - 0.45, zf - 0.30);
  }
  function guards(B, xa, xb, z, yo, w) {
    for (var s = -1; s <= 1; s += 2) box(B.paint, xa, xb, s > 0 ? yo - w : -yo, s > 0 ? yo : -yo + w, z, z + 0.05);
  }
  /* the KAT I cab [KT1]: forward control, flat face, the upper corners cut away (front and
     sides), two screens, the grille band and the bumper; x0 its rear, x1 its face */
  function katCab(B, x0, x1, zf, zr, hw) {
    var c = 0.30, s;
    loftN(B.paint, [
      ring(x0, [[hw, zf], [hw, zr - c], [hw - c, zr]]),
      ring(x1 - c, [[hw, zf], [hw, zr - c], [hw - c, zr]]),
      ring(x1, [[hw, zf], [hw, zr - c - 0.05], [hw - c, zr - c]])]);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, x1, x1 + 0.015, s * 0.58 - 0.50, s * 0.58 + 0.50, zr - 0.95, zr - 0.38);
      box(B.glass, x1 - 1.05, x1 - 0.45, s > 0 ? hw : -hw - 0.015, s > 0 ? hw + 0.015 : -hw, zr - 0.95, zr - 0.45);
      box(B.dark, x1 - 1.15, x1 - 1.13, s > 0 ? hw : -hw - 0.01, s > 0 ? hw + 0.01 : -hw, zf + 0.05, zr - 0.40);
      /* the mirrors on their arms */
      bar(B.dark, [x1 - 0.05, s * hw, zr - 0.50], [x1 + 0.05, s * (hw + 0.20), zr - 0.40], 0.02);
      box(B.dark, x1 + 0.02, x1 + 0.08, s * (hw + 0.20) - 0.08, s * (hw + 0.20) + 0.08, zr - 0.80, zr - 0.35);
      box(B.dark, x1 - 0.02, x1 + 0.06, s * (hw - 0.30) - 0.10, s * (hw - 0.30) + 0.10, zf + 0.40, zf + 0.52);
    }
    /* the grille band, the bumper and the roof rack [KT1] */
    box(B.dark, x1, x1 + 0.01, -0.80, 0.80, zf + 0.10, zf + 0.38);
    box(B.dark, x1 - 0.10, x1 + 0.15, -hw + 0.05, hw - 0.05, zf - 0.40, zf - 0.10);
    box(B.dark, x1 - 1.20, x1 - 0.40, -0.85, 0.85, zr, zr + 0.04);
  }
  /* the MAN HX cab [SS1][SS2]: a squarer box, the big flat screen, a short rake over it */
  function hxCab(B, x0, x1, zf, zr, hw) {
    var s;
    prismY(B.paint, [[x0, zf], [x1, zf], [x1, zr - 0.45], [x1 - 0.18, zr], [x0, zr]], -hw, hw);
    for (s = -1; s <= 1; s += 2) {
      box(B.glass, x1 - 0.06, x1 + 0.005, s * 0.58 - 0.52, s * 0.58 + 0.52, zr - 1.05, zr - 0.50);
      box(B.glass, x1 - 1.00, x1 - 0.40, s > 0 ? hw : -hw - 0.015, s > 0 ? hw + 0.015 : -hw, zr - 1.00, zr - 0.50);
      bar(B.dark, [x1 - 0.10, s * hw, zr - 0.55], [x1, s * (hw + 0.22), zr - 0.45], 0.02);
      box(B.dark, x1 - 0.03, x1 + 0.03, s * (hw + 0.22) - 0.08, s * (hw + 0.22) + 0.08, zr - 0.90, zr - 0.40);
      box(B.dark, x1 - 0.02, x1 + 0.06, s * (hw - 0.30) - 0.12, s * (hw - 0.30) + 0.12, zf + 0.15, zf + 0.30);
    }
    box(B.dark, x1, x1 + 0.01, -0.85, 0.85, zf + 0.35, zf + 0.75);
    box(B.dark, x1 - 0.10, x1 + 0.18, -hw + 0.05, hw - 0.05, zf - 0.35, zf - 0.05);
  }

  /* ----------------------------------------- MAN KAT I 7 t mil gl 6x6 (supply_g)
     [KT1] front 3/4 of a KAT I 6x6 cargo truck with its tilt: the cab over axle 1, the spare
     wheel standing behind the cab, the drop-side body under the tilt over the rear tandem.
     The truck's dimensions are NOT CONFIRMED (no published figure found for the 6x6): drawn
     8.0 x 2.5 x 2.95 m on 14.00 R 20 tyres (1.24 m, the size js/hero/nato_launchers_eu.js
     quotes for the Kat I), the stations proportioned off [KT1]. */
  var KT = { X0: -4.00, X1: 4.00, AX: [3.00, -1.45, -2.95], RT: 0.62, TW: 0.38, YT: 0.98, ZF: 1.20, HW: 1.25 };
  function kat1(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), K = KT, s;
    g.name = "eu_kat1_6x6";
    truckFrame(B, K.X0, K.X1 - 0.30, K.ZF, 0.55);
    katCab(B, 2.15, K.X1, K.ZF + 0.05, 2.95, K.HW - 0.02);
    /* the spare wheel standing behind the cab on the left, its carrier [KT1] */
    cylY(B.dark, 1.90, 0.20, 0.58, 2.05, K.RT, 18);
    cylY(B.paint, 1.90, 0.58, 0.60, 2.05, 0.33, 12);
    /* the cargo body: floor, drop sides, the tilt on its bows [KT1] */
    box(B.paint, K.X0, 1.70, -K.HW, K.HW, K.ZF + 0.05, K.ZF + 0.20);
    for (s = -1; s <= 1; s += 2) box(B.paint, K.X0, 1.70, s > 0 ? K.HW - 0.05 : -K.HW, s > 0 ? K.HW : -K.HW + 0.05, K.ZF + 0.20, K.ZF + 0.75);
    box(B.paint, K.X0, K.X0 + 0.05, -K.HW, K.HW, K.ZF + 0.20, K.ZF + 0.75);
    loftN(B.canvas, [
      ring(K.X0 + 0.02, [[K.HW - 0.03, K.ZF + 0.74], [K.HW - 0.03, 2.70], [K.HW - 0.35, 2.95], [0.50, 3.00]]),
      ring(1.68, [[K.HW - 0.03, K.ZF + 0.74], [K.HW - 0.03, 2.70], [K.HW - 0.35, 2.95], [0.50, 3.00]])]);
    guards(B, K.AX[0] - 0.70, K.AX[0] + 0.70, 1.55, K.HW, 0.45);
    guards(B, K.AX[2] - 0.70, K.AX[1] + 0.70, K.ZF + 0.02, K.HW, 0.45);
    /* the fuel tank and the battery box between the axles [KT1] */
    box(B.paint, 0.20, 1.30, -1.15, -0.60, 0.70, 1.10);
    box(B.dark, -0.60, 0.10, 0.60, 1.10, 0.70, 1.05);
    box(B.team, 2.40, 3.20, -0.60, 0.60, 2.95, 2.962);
    truckDetail(B, K.X1, K.X0, K.ZF, K.HW - 0.02, 2.95, 2.15, K.AX[0], K.RT, K.TW, K.YT);
    for (s = -1; s <= 1; s += 2) mudguard(B, K.AX[0], K.RT, K.TW + 0.10, s * K.YT, K.RT, s);
    for (s = -1; s <= 1; s += 2) for (var r = 0; r < 4; r++) bar(B.dark, [K.X0 + 0.6 + r * 1.35, s * (K.HW - 0.02), K.ZF + 0.74], [K.X0 + 0.6 + r * 1.35, s * (K.HW - 0.02), 2.70], 0.01);
    flush(THREE, g, B);
    wheelGroups(THREE, T, g, K.AX, K.RT, function (W) { tyrePair(T, W, K.RT, K.TW, K.YT, 0.36, true); });
    return g;
  }

  /* ----------------------------------------- SKY SABRE iLauncher (sam_b)
     [SS1] the launcher set up, its pack raised upright behind the cab, the jacks down, the
     MAN HX 8x8 (two pairs of axles), [SS2] the battery's HX trucks side on.  The pack: two
     rows of four canisters (the row's eight rounds), built lying and raised to the vertical
     by render3d (podelev, el 90 deg); the jacks shown when set up.  Dimensions NOT CONFIRMED
     (no published launcher figure found): drawn 10.0 x 2.55 x 3.3 m in travel on 1.30 m
     tyres, proportioned off [SS1][SS2]. */
  var SS = { X0: -5.00, X1: 5.00, AX: [3.85, 2.35, -1.70, -3.10], RT: 0.65, TW: 0.40, YT: 1.00, ZF: 1.30, HW: 1.27,
             HX: -4.25, HZ: 2.25, PL: 4.00, PC: 0.40, EL: Math.PI / 2 };
  function skySabre(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), S = SS, s, i, j, k;
    g.name = "eu_sky_sabre_ilauncher";
    truckFrame(B, S.X0, S.X1 - 0.30, S.ZF, 0.55);
    hxCab(B, 2.60, S.X1, S.ZF + 0.05, 3.20, S.HW);
    /* the bed: the equipment boxes behind the cab, the deck, the pack's cradle and hinge [SS1] */
    box(B.paint, 1.20, 2.50, -1.20, 1.20, S.ZF, 2.80);
    box(B.paint, S.X0, 1.20, -1.20, 1.20, S.ZF, S.ZF + 0.12);
    box(B.paint, -1.10, -0.70, -0.85, 0.85, S.ZF + 0.12, S.HZ - 0.05);
    box(B.paint, S.HX - 0.30, S.HX + 0.30, -0.90, 0.90, S.ZF + 0.12, S.HZ - 0.08);
    cylY(B.dark, S.HX, -0.95, 0.95, S.HZ, 0.10, 12);
    /* the antenna mast lying along the bed's right side (up in [SS1]) */
    cyl(B.dark, [-3.5, -1.05, S.ZF + 0.30], [0.9, -1.05, S.ZF + 0.30], 0.07, 0.06, 8);
    guards(B, S.AX[1] - 0.70, S.AX[0] + 0.70, 1.62, S.HW, 0.45);
    guards(B, S.AX[3] - 0.70, S.AX[2] + 0.70, S.ZF + 0.02, S.HW, 0.45);
    for (s = -1; s <= 1; s += 2) box(B.dark, S.X0 - 0.02, S.X0, s * 1.05 - 0.12, s * 1.05 + 0.12, 0.95, 1.10);
    box(B.team, 3.10, 4.20, -0.55, 0.55, 3.20, 3.212);
    truckDetail(B, S.X1, S.X0, S.ZF, S.HW, 3.20, 2.60, S.AX[0], S.RT, S.TW, S.YT);
    for (s = -1; s <= 1; s += 2) { jerry(B, 1.05, s * 1.05, S.ZF + 0.12, s); bag(B, -0.65, 0.95, s > 0 ? 0.20 : -1.15, s > 0 ? 1.15 : -0.20, S.ZF + 0.12, S.ZF + 0.45); }
    flush(THREE, g, B);
    wheelGroups(THREE, T, g, S.AX, S.RT, function (W) { tyrePair(T, W, S.RT, S.TW, S.YT, 0.38, true); });
    /* the jacks: down when set up, up in travel [SS1] */
    function jacks(J, down) {
      var xs = [S.X0 + 0.25, 0.70], zb = down ? 0.0 : 0.45, yj = down ? 1.40 : 1.12;
      for (i = 0; i < 2; i++) for (s = -1; s <= 1; s += 2) {
        box(J.paint, xs[i] - 0.08, xs[i] + 0.08, s > 0 ? 0.55 : -yj - 0.05, s > 0 ? yj + 0.05 : -0.55, 1.00, 1.15);
        cylZ(J.dark, xs[i], s * yj, zb + 0.04, 1.10, 0.06, 8);
        box(J.dark, xs[i] - 0.15, xs[i] + 0.15, s * yj - 0.15, s * yj + 0.15, zb, zb + 0.04);
      }
    }
    var DP = bins(T), TP = bins(T);
    jacks(DP, true); jacks(TP, false);
    var dp = grp(THREE, "deploypose", DP); dp.visible = false; g.add(dp);
    g.add(grp(THREE, "travelpose", TP));
    /* the pack, lying with its mouths forward; x from the hinge */
    var PB = bins(T), cells = [];
    for (i = 0; i < 4; i++) for (j = 0; j < 2; j++) {
      var y = (i - 1.5) * S.PC, z = 0.10 + (j + 0.5) * S.PC;
      box(PB.paint, 0.10, S.PL, y - S.PC / 2 + 0.015, y + S.PC / 2 - 0.015, z - S.PC / 2 + 0.015, z + S.PC / 2 - 0.015);
      box(PB.dark, S.PL, S.PL + 0.02, y - S.PC / 2 + 0.05, y + S.PC / 2 - 0.05, z - S.PC / 2 + 0.05, z + S.PC / 2 - 0.05);
      cells.push([S.PL + 0.02, y, z, 0.10]);
    }
    /* the frame: end frames, the side beams and the cradle arms [SS1] */
    box(PB.dark, 0.0, 0.12, -0.86, 0.86, 0.05, 0.95);
    box(PB.dark, S.PL - 0.12, S.PL, -0.86, 0.86, 0.05, 0.95);
    for (s = -1; s <= 1; s += 2) {
      box(PB.paint, 0.0, S.PL, s > 0 ? 0.80 : -0.88, s > 0 ? 0.88 : -0.80, 0.05, 0.20);
      for (k = 0; k < 3; k++) bar(PB.dark, [0.3 + k * 1.2, s * 0.86, 0.15], [0.9 + k * 1.2, s * 0.86, 0.85], 0.03);
    }
    box(PB.dark, 0.0, S.PL, -0.80, 0.80, 0.0, 0.05);
    var pg = grp(THREE, "podelev", PB, S.HX, 0, S.HZ);
    pg.userData.el = S.EL; pg.userData.cells = cells;
    g.add(pg);
    return g;
  }

  /* ================================================================ WIESEL
     Wiesel 1 TOW (atgmv_g) and Wiesel 2 Ozelot (spaag_g).  Stations in metres from the hull
     centre, +X nose.  W1: [W1] side-on (the X stations: 189 px a metre over the published
     3.55 m) and [W2] the distant line-up (the heights, 80 px a metre: hull roof 1.17 m, the
     TOW's top 1.89 m).  W2: [OZ1][OZ2] 3/4 views only, scaled from the published 4.78 m. */
  var WS1 = { L: 3.55, HW: 0.91, TY: 0.70, TW: 0.13, ROOF: 1.17, SIDE: 0.95, NOSEZ: 0.62,
              XW: [0.93, 0.21, -0.50], RW: 0.24, IDL: { x: -1.22, z: 0.31, r: 0.30 }, SPR: { x: 1.46, z: 0.62, r: 0.21 } };
  var WS2 = { L: 4.78, HW: 0.935, TY: 0.72, TW: 0.14, ROOF: 1.36, SIDE: 1.02, NOSEZ: 0.66,
              XW: [1.30, 0.66, 0.02, -0.62, -1.26], RW: 0.25, IDL: { x: -1.95, z: 0.52, r: 0.22 }, SPR: { x: 2.02, z: 0.60, r: 0.22 } };
  function wieselHull(B, W, glacisTo, rearBox) {
    var X0 = -W.L / 2, X1 = W.L / 2, s;
    /* the tub over the tracks: belly 0.30, the nose wedge, the long glacis up to glacisTo */
    prismY(B.paint, [[X0, 0.38], [X0 + 0.10, 0.30], [X1 - 0.45, 0.30], [X1, W.NOSEZ], [X1 - 0.08, W.NOSEZ + 0.12],
                     [glacisTo, W.ROOF], [X0, W.ROOF]], -W.HW + 0.20, W.HW - 0.20);
    /* the sponsons out over the tracks, from the side ledge to the roof */
    for (s = -1; s <= 1; s += 2) {
      prismY(B.paint, [[X0, W.SIDE], [X1 - 0.20, W.SIDE], [X1 - 0.10, W.NOSEZ + 0.30], [glacisTo, W.ROOF], [X0, W.ROOF]],
             s > 0 ? W.HW - 0.20 : -W.HW, s > 0 ? W.HW : -W.HW + 0.20);
      /* track guard ledge and the skirt rail */
      box(B.dark, X0 + 0.05, X1 - 0.25, s > 0 ? W.HW - 0.02 : -W.HW - 0.02, s > 0 ? W.HW + 0.02 : -W.HW + 0.02, W.SIDE - 0.04, W.SIDE);
      /* headlamp boxes on the front corners */
      /* the rear lamp clusters */
      box(B.dark, X0 - 0.02, X0 + 0.02, s * (W.HW - 0.12) - 0.06, s * (W.HW - 0.12) + 0.06, W.ROOF - 0.25, W.ROOF - 0.12);
    }
    if (rearBox) box(B.paint, X0, X0 + rearBox, -W.HW + 0.10, W.HW - 0.10, W.ROOF, W.ROOF + 0.10);
    /* the engine grille on the right of the glacis, the driver's hatch on the left */
    var gx = (glacisTo + X1) / 2, gz = W.ROOF - (gx - glacisTo) / (X1 - 0.08 - glacisTo) * (W.ROOF - W.NOSEZ - 0.12);
    var ga = Math.atan2(W.ROOF - W.NOSEZ - 0.12, X1 - 0.08 - glacisTo);
    slab(B.dark, [gx, -0.40, gz + 0.01], [Math.cos(ga), 0, -Math.sin(ga)], [0, 1, 0], [Math.sin(ga), 0, Math.cos(ga)], 0.30, 0.25, 0.012);
    box(B.paint, glacisTo - 0.40, glacisTo + 0.05, 0.20, 0.60, W.ROOF, W.ROOF + 0.06);
    box(B.team, X0 - 0.006, X0, -0.30, 0.30, W.ROOF - 0.12, W.ROOF - 0.04);
  }
  function wieselRunning(B, W) {
    var C = [], i;
    for (i = 0; i < W.XW.length; i++) C.push([W.XW[i], W.RW, W.RW]);
    C.push([W.IDL.x, W.IDL.z, W.IDL.r], [W.SPR.x, W.SPR.z, W.SPR.r]);
    track(B, C, W.TY, W.TW, 0.12);
    sprocket(B, W.SPR.x, W.SPR.z, W.SPR.r, W.TY, 2 * W.TW - 0.04, 11);
    sprocket(B, W.IDL.x, W.IDL.z, W.IDL.r, W.TY, 2 * W.TW - 0.04, 0);
  }
  function wieselWheels(THREE, T, g, W, idlerIsWheel) {
    wheelGroups(THREE, T, g, W.XW, W.RW, function (Wb) { roadPair(T, Wb, W.RW, 2 * W.TW - 0.04, W.TY, 6); });
  }
  /* the TOW on its pedestal [W1][W2]: origin on the pedestal top; the tube along +X */
  function towLauncher(B) {
    cylZ(B.dark, 0, 0, -0.12, 0.0, 0.07, 10);
    box(B.paint, -0.20, 0.20, -0.16, 0.16, 0.0, 0.18);
    /* the launch tube, its front flare and rear blast cone */
    tube(B.paint, -0.75, 0.90, 0, 0.30, 0.11, 0.11, 14);
    tube(B.paint, 0.90, 1.00, 0, 0.30, 0.13, 0.13, 14);
    tube(B.dark, -0.95, -0.75, 0, 0.30, 0.13, 0.10, 12);
    /* the sight and its night sight above the tube's rear [W1] */
    box(B.paint, -0.30, 0.20, -0.11, 0.11, 0.42, 0.58);
    box(B.dark, 0.20, 0.22, -0.08, 0.08, 0.45, 0.55);
    tube(B.paint, -0.30, 0.25, 0.19, 0.52, 0.07, 0.07, 10);
    /* the traverse handles and the shield-less cradle sides */
    box(B.dark, -0.55, -0.30, -0.20, 0.20, 0.10, 0.14);
  }
  function wiesel1Tow(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), W = WS1;
    g.name = "eu_wiesel1_tow";
    wieselHull(B, W, 0.10, 0);
    wieselRunning(B, W);
    /* the pedestal base on the roof behind the glacis, right of centre [W1] */
    cylZ(B.paint, -0.55, -0.10, W.ROOF, W.ROOF + 0.10, 0.22, 14);
    /* stowage box on the rear deck, the reload rounds' rack [W1] */
    box(B.paint, -1.70, -1.05, 0.25, 0.85, W.ROOF, W.ROOF + 0.18);
    wieselDetail(B, W, false);
    flush(THREE, g, B);
    wieselWheels(THREE, T, g, W);
    var TB = bins(T);
    towLauncher(TB);
    g.add(grp(THREE, "turret", TB, -0.55, -0.10, W.ROOF + 0.12));
    return g;
  }
  /* the Ozelot launcher [OZ1][OZ2]: a pedestal, the sensor head, and a pod of four Stingers
     (2 x 2) on each side, with the folding covers */
  function ozelotTurret(B) {
    var s, i, j;
    cylZ(B.paint, 0, 0, 0.0, 0.18, 0.30, 16);
    box(B.paint, -0.25, 0.25, -0.18, 0.18, 0.18, 0.63);
    /* the sensor head: the FLIR and laser box between the pods */
    box(B.paint, -0.15, 0.35, -0.16, 0.16, 0.63, 0.88);
    box(B.dark, 0.35, 0.37, -0.12, 0.12, 0.67, 0.84);
    for (s = -1; s <= 1; s += 2) {
      /* the trunnion arm, and the pod: a box of four tubes, mouths forward */
      box(B.paint, -0.10, 0.10, s * 0.16, s * 0.34, 0.53, 0.68);
      box(B.paint, -0.70, 0.55, s > 0 ? 0.34 : -0.70, s > 0 ? 0.70 : -0.34, 0.45, 0.95);
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++)
        cylX(B.dark, 0.55, 0.57, s * (0.43 + i * 0.18), 0.58 + j * 0.24, 0.07, 10);
      /* the opened lower cover plate [OZ1] */
      slab(B.paint, [0.05, s * 0.52, 0.35], [1, 0, 0], [0, 1, 0], [0, 0, 1], 0.55, 0.19, 0.012);
    }
  }
  function wiesel2Ozelot(THREE, M, C, key) {
    var T = materials(THREE, C, key), g = new THREE.Group(), B = bins(T), W = WS2, s;
    g.name = "eu_wiesel2_ozelot";
    wieselHull(B, W, 0.05, 0);
    wieselRunning(B, W);
    /* the raised rear superstructure with the door, the mesh grilles on its sides [OZ1][OZ2] */
    box(B.paint, -2.39, -1.55, -0.80, 0.80, W.ROOF, W.ROOF + 0.25);
    box(B.paint, -1.55, -0.30, -0.70, 0.70, W.ROOF, W.ROOF + 0.12);
    for (s = -1; s <= 1; s += 2) box(B.dark, -1.70, -0.40, s > 0 ? W.HW : -W.HW - 0.02, s > 0 ? W.HW + 0.02 : -W.HW, W.SIDE + 0.08, W.SIDE + 0.26);
    /* the front mirrors on their arms */
    for (s = -1; s <= 1; s += 2) {
      bar(B.dark, [1.75, s * 0.75, W.NOSEZ + 0.50], [1.75, s * 0.85, W.NOSEZ + 0.90], 0.02);
      box(B.dark, 1.72, 1.78, s * 0.85 - 0.08, s * 0.85 + 0.08, W.NOSEZ + 0.85, W.NOSEZ + 1.05);
    }
    wieselDetail(B, W, true);
    flush(THREE, g, B);
    wieselWheels(THREE, T, g, W);
    var TB = bins(T);
    ozelotTurret(TB);
    g.add(grp(THREE, "turret", TB, -0.90, 0, W.ROOF + 0.12));
    return g;
  }

  return { patriotDe: patriotDe, m113Radar: m113Radar, greenArcher: greenArcher, ratacS: ratacS, abraBox: abraBox, kat1: kat1, skySabre: skySabre, ebrcJaguar: ebrcJaguar, ajax: ajax, archer: archer, challenger3: challenger3, m270a2: m270a2, fennek: fennek, pzh2000: pzh2000, wiesel1Tow: wiesel1Tow, wiesel2Ozelot: wiesel2Ozelot };
})();

/* the two M270A2 rows in the M270 module's own table; ord: the round the row's weapon "mlrs" is
   drawn as in flight (GMLRS, as mlrs_n) */
HeroUsMlrs.rows.mlrs_g = { veh: "m270", paint: "carc", pods: "rocket", turret: true, louvre: true, ord: { mlrs: "gmlrs" } };
HeroUsMlrs.rows.mlrs_b = { veh: "m270", paint: "carc", pods: "rocket", turret: true, louvre: true, ord: { mlrs: "gmlrs" } };

/* the M113 radar carriers: a plain bronze-green row in the M113 module's own VARIANTS table
   (its kind falls through to the VADS turret group, which this file empties) */
HeroM113.variants.EU_DEU_RADAR = { kind: "radar", paint: { key: "m113_eu_deu", base: "#3e4733", blots: [], seed: 6031 }, vane80: true };

(function () {
  var H = HeroEuLandSkirmish;
  var ROWS = {
    sam_g: { len: 10.00, f: function (T, M, C) { return H.patriotDe(T, M, C); } },
    deu_e60_radarv: { len: 4.92, f: function (T, M, C) { return H.m113Radar(T, M, C, "EU_DEU_RADAR", H.greenArcher, -1.30, 0); } },
    /* deu_e80_radarv (ABRA with the original RATAC): HELD - no photograph or drawing of the
       first RATAC antenna was found; it keeps its borrowed model */
    deu_e90_radarv: { len: 4.92, f: function (T, M, C) { var g = H.m113Radar(T, M, C, "EU_DEU_RADAR", H.ratacS, -1.90, 0.58); H.abraBox(T, g, C); return g; } },
    mbt_f: { len: 9.98, f: function (T, M, C) { return HeroLeclerc.build(T, M, C); } },
    recon_f: { len: 3.80, f: function (T, M, C) { return HeroFrArmour2.vbl(T, M, C); } },
    supply_g: { len: 8.38, f: function (T, M, C) { return H.kat1(T, M, C, "deu"); } },
    sam_b: { len: 10.38, f: function (T, M, C) { return H.skySabre(T, M, C, "gbr"); } },
    lt_f: { len: 7.82, f: function (T, M, C) { return H.ebrcJaguar(T, M, C, "fra"); } },
    lt_b: { len: 7.98, f: function (T, M, C) { return H.ajax(T, M, C, "gbr"); } },
    spg_b: { len: 13.14, f: function (T, M, C) { return H.archer(T, M, C, "gbr"); } },
    hvy_b: { len: 12.16, f: function (T, M, C) { return H.challenger3(T, M, C); } },
    mlrs_g: { len: 7.01, ord: HeroUsMlrs.rows.mlrs_g.ord, f: function (T, M, C) { return H.m270a2(T, M, C, "mlrs_g"); } },
    mlrs_b: { len: 7.01, ord: HeroUsMlrs.rows.mlrs_b.ord, f: function (T, M, C) { return H.m270a2(T, M, C, "mlrs_b"); } },
    spg_g: { len: 11.70, f: function (T, M, C) { return H.pzh2000(T, M, C, "deu"); } },
    recon_g: { len: 5.75, f: function (T, M, C) { return H.fennek(T, M, C, "deu"); } },
    atgmv_g: { len: 3.76, f: function (T, M, C) { return H.wiesel1Tow(T, M, C, "deu"); } },
    spaag_g: { len: 4.99, f: function (T, M, C) { return H.wiesel2Ozelot(T, M, C, "deu"); } }
  };
  /* HELD - no reference found (see the header); left on their borrowed models:
     supply_b: { len: ?, f: MAN SV 9 t },  supply_f: { len: ?, f: PPLOG Kerax 8x8 },
     gbr_e80_coastssm: { len: ?, f: Excalibur MM38 }, deu_e80_radarv: { len: 4.92, f: RATAC } */
  Object.keys(ROWS).forEach(function (k) { UNIT_MODELS[k] = { len: ROWS[k].len, build: ROWS[k].f };
    if (ROWS[k].ord) UNIT_MODELS[k].ord = ROWS[k].ord; });
})();
