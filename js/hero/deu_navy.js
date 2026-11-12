/* ==================== js/hero/deu_navy.js ===============================
   HERO MODELS -- the Bundesmarine / Deutsche Marine surface ships that had no model of their own and
   borrowed an American one (an LCS for the corvettes, an Arleigh Burke for every destroyer and frigate,
   the Mk VI patrol boat for the Schnellboote, the Soviet Molniya for the missile boats, the generic
   minesweeper).  One builder per class; rows of the same class share it (VARIANTS where a reference
   shows a change):
     buildK130          corvette_g, deu_e00_corvette     K130 Braunschweig          89.12 x 13.28 m
     buildF124          destroyer_g, deu_e00_destroyer   F124 Sachsen               143.0 x 17.44 m
     buildFrankenthal   minesweeper_g                    Type 332 Frankenthal       54.4 x 9.2 m
     buildSchnellboot   deu_e50_patrol  ("jaguar")       Type 140 Jaguar            42.6 x 7.1 m
                        deu_e60_patrol  ("zobel")        Type 142 Zobel             42.6 x 7.1 m
     buildFletcher      deu_e50_destroyer                Z-1, ex-USS Anthony        114.8 x 12.0 m
     buildKoln          deu_e60_corvette                 Type 120 Koeln             109.8 x 11 m
     buildLutjens       deu_e60_destroyer                Type 103 Luetjens          133.2 x 14.3 m
                        (HeroAdamsDDG.build() of js/hero/us_adams_ddg.js, with the German parts)
     buildBremen        deu_e80_destroyer                F122 Bremen (1982 fit)     130.5 x 14.6 m
     buildGepard        deu_e80_missileboat ("143")      Type 143 Albatros          57.6 x 7.8 m
                        deu_e90_missileboat ("143A")     Type 143A Gepard
                        deu_e00_missileboat ("143A")     Type 143A Gepard (late)
     buildBrandenburg   deu_e90_destroyer                F123 Brandenburg           138.85 x 16.7 m
   HELD: deu_e80_minesweeper (Type 351 Troika control ship): no photograph or drawing of a Type 351
   found (Commons searches "Troika Seehund drone", "Troika minesweeping Ulm Type 351", "Hohlstablenkboot",
   "Troika Minenabwehr", "Klasse 351", "Schleswig M1073", "Lindau class minesweeper"; en.wikipedia
   Lindau-class minehunter carries only "Lindau-Klasse.jpg", the Type 331 Weilheim): registration left
   commented out at the foot.
   Published figures are the en.wikipedia infoboxes (class articles; Z-1 from "USS Anthony (DD-515)"
   and "Zerstoerer 1-class destroyer").  Each builder's own header lists its references (Wikimedia
   Commons file names), how it was scaled and what is NOT CONFIRMED.
   COMMON NOT CONFIRMED: no body plan or underwater view of any class was found, so every underwater
   form (keel depth, bilge, run, forefoot) and every half-breadth other than the published beam is
   estimated from the bow and quarter photographs; no screws, shafts or rudders are drawn (never seen).
   Contract: +X bow, +Y port, +Z up, metres, waterline z = 0.  The main gun of every turret:true row is
   the group named "turret" (origin on its ring, gun along +X); the missile boats and the minesweeper are
   not turret:true and everything is baked (render3d trains a "turret" only on turret:true rows).  The
   flight-deck ships carry a hidden "helipad" node on the pad (js/hero/pla_navy_modern.js convention).
   Plain paint (Bundesmarine light grey over a black boot-top, antifouling red or black as photographed),
   no pennant numbers, crests, ensigns or flags; the team colour as small strips on roofs.  The paint is
   a canvas texture (plating, rust and grime streaks, deck plating); every exposed deck edge carries a
   two-wire lifeline; bitts, fairleads, anchors and hawses, hatches, vents, ladders, rafts, boats, whips.
   Kit: the geometry kit of js/hero/deu_type148.js (Bin, solid, loft, prism, flush), extended with a
   station-table hull lofter (class Hull) and per-part frames.  ASCII only.
   LOAD ORDER: after js/hero/us_adams_ddg.js (buildLutjens calls HeroAdamsDDG).
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroDeuNavy = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI, DEG = PI / 180;

  /* ------------------------------------------------------------ vector helpers (deu_type148.js kit) */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function tbl(T, d) {
    if (d <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (d <= T[i][0]) {
      var t = (d - T[i - 1][0]) / ((T[i][0] - T[i - 1][0]) || 1);
      return lerp(T[i - 1][1], T[i][1], t);
    }
    return T[T.length - 1][1];
  }

  /* a bin per material; box-mapped metre UVs (textures repeat every 16 m) */
  var UVS = 1 / 16;
  function Bin(mat) { this.mat = mat; this.P = []; this.N = []; this.U = []; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f], i, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]);
    for (i = 0; i < 3; i++) {
      this.P.push(v[i][0], v[i][1], v[i][2]); this.N.push(n[i][0], n[i][1], n[i][2]);
      if (az >= ax && az >= ay) this.U.push(v[i][0] * UVS, v[i][1] * UVS);
      else if (ay >= ax) this.U.push(v[i][0] * UVS, v[i][2] * UVS);
      else this.U.push(v[i][1] * UVS, v[i][2] * UVS);
    }
  };
  /* a placed frame over a bin: parts are drawn in their own frame (origin on the mount, +X its
     line of fire) and land in the bin trained az (rad, + to port) and moved to (ox, oy, oz) */
  function Frame(bin, ox, oy, oz, az) { this.b = bin; this.o = [ox, oy, oz]; this.c = Math.cos(az || 0); this.s = Math.sin(az || 0); }
  Frame.prototype.p = function (v) { return [this.o[0] + v[0] * this.c - v[1] * this.s, this.o[1] + v[0] * this.s + v[1] * this.c, this.o[2] + v[2]]; };
  Frame.prototype.n = function (v) { return v ? [v[0] * this.c - v[1] * this.s, v[0] * this.s + v[1] * this.c, v[2]] : v; };
  Frame.prototype.tri = function (a, b, c, na, nb, nc) { this.b.tri(this.p(a), this.p(b), this.p(c), this.n(na), this.n(nb), this.n(nc)); };
  /* the same frame over every bin of a set */
  function frames(B, x, y, z, az) { var F = {}, k; for (k in B) F[k] = new Frame(B[k], x, y, z, az); return F; }

  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i]; a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      var cc = cross(sub(V[b], V[a]), sub(V[c], V[a]));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
  }
  /* a convex solid from hand-listed faces: each face is turned to face away from the centroid */
  function csolid(bin, V, F) {
    var c = [0, 0, 0], i;
    for (i = 0; i < V.length; i++) c = add(c, V[i]);
    c = mul(c, 1 / V.length);
    for (i = 0; i < F.length; i++) {
      var f = F[i], a = V[f[0]], b = V[f[1]], d = V[f[2]], n = cross(sub(b, a), sub(d, a));
      if (dot(n, n) < 1e-12) continue;
      var m = mul(add(add(a, b), d), 1 / 3);
      if (dot(n, sub(m, c)) < 0) bin.tri(a, d, b); else bin.tri(a, b, d);
    }
  }
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { csolid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  function cyl(bin, A, B, r0, r1, seg) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    base = V.length; na = [-ax[0], -ax[1], -ax[2]];
    V.push(A, B); N.push(na, ax);
    rA = base + 2; rB = base + 2 + seg;
    for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
    for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    solid(bin, V, F, N);
  }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function bar(bin, A, B, r) { cyl(bin, A, B, r, r, 4); }
  /* loft through rings of equal point count, flat-capped */
  function loft(bin, rings, noCap) {
    var n = rings[0].length, V = [], F = [], k, r, a, b, c0, c1, Lr;
    for (r = 0; r < rings.length; r++) for (k = 0; k < n; k++) V.push(rings[r][k]);
    for (r = 0; r + 1 < rings.length; r++) for (k = 0; k < n; k++) {
      a = r * n + k; b = r * n + (k + 1) % n; c0 = a + n; c1 = b + n;
      F.push([a, b, c1], [a, c1, c0]);
    }
    if (!noCap) {
      for (k = 1; k + 1 < n; k++) F.push([0, k + 1, k]);
      Lr = (rings.length - 1) * n;
      for (k = 1; k + 1 < n; k++) F.push([Lr, Lr + k, Lr + k + 1]);
    }
    solid(bin, V, F);
  }
  /* ellipsoid with smooth normals; lo..hi latitude (radians) */
  function ellipsoid(bin, C, rx, ry, rz, rings, seg, lo, hi) {
    var i, k, R = [], NR = [], a0 = lo === undefined ? -PI / 2 : lo, a1 = hi === undefined ? PI / 2 : hi;
    for (i = 0; i <= rings; i++) {
      var a = a0 + (a1 - a0) * i / rings, ca = Math.cos(a), sa = Math.sin(a), ring = [], nr = [];
      for (k = 0; k < seg; k++) {
        var t = k / seg * TAU, ct = Math.cos(t), st = Math.sin(t);
        ring.push([C[0] + rx * ca * ct, C[1] + ry * ca * st, C[2] + rz * sa]);
        nr.push(unit([ca * ct / rx, ca * st / ry, sa / rz]));
      }
      R.push(ring); NR.push(nr);
    }
    for (i = 0; i + 1 < R.length; i++) for (k = 0; k < seg; k++) {
      var j = (k + 1) % seg, A = R[i][k], B = R[i][j], C2 = R[i + 1][j], D2 = R[i + 1][k];
      var c1 = cross(sub(B, A), sub(C2, A));
      if (dot(c1, c1) > 1e-12) bin.tri(A, B, C2, NR[i][k], NR[i][j], NR[i + 1][j]);
      var c2 = cross(sub(C2, A), sub(D2, A));
      if (dot(c2, c2) > 1e-12) bin.tri(A, C2, D2, NR[i][k], NR[i + 1][j], NR[i + 1][k]);
    }
  }
  function sphere(bin, x, y, z, r, seg) { ellipsoid(bin, [x, y, z], r, r, r, seg >> 1, seg); }
  /* box in an oriented frame: origin P, axes u (along), v (across), w (up-ish) */
  function obox(bin, P, u, v, w, a0, a1, b0, b1, c0, c1) {
    var V = [], A = [a0, a1], Bq = [b0, b1], Cq = [c0, c1], i, j, o = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    for (i = 0; i < 8; i++) {
      j = o[i];
      V.push([P[0] + u[0] * A[j[0]] + v[0] * Bq[j[1]] + w[0] * Cq[j[2]],
              P[1] + u[1] * A[j[0]] + v[1] * Bq[j[1]] + w[1] * Cq[j[2]],
              P[2] + u[2] * A[j[0]] + v[2] * Bq[j[1]] + w[2] * Cq[j[2]]]);
    }
    hexa(bin, V);
  }
  /* a convex (x, z) outline extruded across the ship about y = yc, each vertex at half-breadth hw(z)
     (a constant, or a function of z for the sloped sides of the modern hulls) */
  function prism(bin, poly, hw, yc) {
    var V = [], F = [], n = poly.length, i, f = typeof hw === "function" ? hw : function () { return hw; }, y0 = yc || 0;
    for (i = 0; i < n; i++) V.push([poly[i][0], y0 + f(poly[i][1]), poly[i][1]]);
    for (i = 0; i < n; i++) V.push([poly[i][0], y0 - f(poly[i][1]), poly[i][1]]);
    for (i = 1; i + 1 < n; i++) { F.push([0, i, i + 1]); F.push([n, n + i, n + i + 1]); }
    for (i = 0; i < n; i++) { var j = (i + 1) % n; F.push([i, j, n + j]); F.push([i, n + j, n + i]); }
    csolid(bin, V, F);
  }
  /* a deckhouse x0..x1 (front x1), z0..z1, half-breadth hb at the foot narrowing by sl metres per
     metre of height (0 for a plain house); fr and ar set the front and the after face back by that
     much at the roof (raked faces) */
  function house(bin, x0, x1, z0, z1, hb, sl, fr, ar, yc) {
    var s = sl || 0;
    prism(bin, [[x0, z0], [x1, z0], [x1 - (fr || 0), z1], [x0 + (ar || 0), z1]], function (z) { return Math.max(0.05, hb - (z - z0) * s); }, yc);
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      var me = new THREE.Mesh(geo, b.mat); me.castShadow = true; me.receiveShadow = true; me.name = k;
      group.add(me);
    }
  }

  /* ------------------------------------------------------------ canvas paint (deu_type148.js): plate with
     faint seams; the paint colour is the material colour */
  var TEX = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function canvasTex(THREE, key, draw) {
    if (TEX[key]) return TEX[key];
    if (typeof document === "undefined" || !document.createElement) return null;
    var cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
    var g = cv.getContext && cv.getContext("2d");
    if (!g) return null;
    draw(g, 512);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    TEX[key] = t;
    return t;
  }
  function drawPlate(g, S) {
    var R = rng(130), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#7c8488" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 3) * m, (0.3 + R() * 1.0) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 8; k++) {
      var y = Math.round(k * 2 * m);
      g.fillStyle = "rgba(70,80,86,0.20)"; g.fillRect(0, y, S, 1.5);
      for (i = 0; i < 4; i++) { var x = Math.round(((i * 4 + (k % 2) * 2) % 16) * m); g.fillStyle = "rgba(70,80,86,0.16)"; g.fillRect(x, y, 1.5, 2 * m); }
    }
    for (i = 0; i < 26; i++) {
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.2) * m);
    }
    g.globalAlpha = 1;
  }
  /* the hull side: strakes and butts, rust and grime streaks running down from the deck edge and
     the scuttles, a scuffed band at the waterline (UVs are metres / 16) */
  function drawHullTex(g, S) {
    var R = rng(1301), i, m = S / 16;
    drawPlate(g, S);
    for (i = 0; i < 70; i++) {
      var x = R() * S, y = R() * S, l = (0.6 + R() * 2.6) * m;
      var gr = g.createLinearGradient(0, y, 0, y + l);
      var c = R() < 0.35 ? "122,84,58" : "52,50,46";
      gr.addColorStop(0, "rgba(" + c + "," + (0.10 + R() * 0.12).toFixed(3) + ")"); gr.addColorStop(1, "rgba(" + c + ",0)");
      g.fillStyle = gr; g.fillRect(x, y, 0.05 * m + R() * 0.12 * m, l);
    }
    for (i = 0; i < 40; i++) { g.globalAlpha = 0.04 + R() * 0.05; g.fillStyle = "#3d3a35"; g.fillRect(R() * S, R() * S, (0.5 + R() * 2) * m, (0.2 + R() * 0.5) * m); }
    g.globalAlpha = 1;
  }
  function drawDeck(g, S) {
    var R = rng(1300), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(30,34,36,0.24)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
  }
  /* P = { hull, sup, deck, boot } paint colours for one ship */
  function materials(THREE, C, P) {
    var plate = canvasTex(THREE, "deuNavyPlate", drawPlate), deckT = canvasTex(THREE, "deuNavyDeck", drawDeck), hullT = canvasTex(THREE, "deuNavyHull", drawHullTex);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    return {
      hull: mk(P.hull, 0.8, 0.08, hullT),
      sup: mk(P.sup, 0.8, 0.08, plate),
      deck: mk(P.deck, 0.92, 0.04, deckT),
      boot: mk(P.boot, 0.86, 0.04, plate),
      dark: mk(0x23282b, 0.75, 0.3),
      metal: mk(0x4e555a, 0.5, 0.55),
      light: mk(P.light || 0xb4b8ba, 0.75, 0.06),
      glass: mk(0x141c22, 0.15, 0.4),
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
  }
  var KEYS = ["hull", "sup", "deck", "boot", "dark", "metal", "light", "glass", "team"];
  function bins(T) { var B = {}; KEYS.forEach(function (k) { B[k] = new Bin(T[k]); }); return B; }

  /* ------------------------------------------------------------ the hull from a station spec.
     H = { L, zd: [[d, z]] deck edge, hb: [[d, half-breadth]] at the deck, hw: [[d, hb]] at the
     waterline, kn: [[d, z]] knuckle (optional; the side is flat from the knuckle to the deck edge,
     tumbled in by tb metres for the shaped hulls), T keel depth, tz the transom's foot, aR the run
     length (keel reaches T), fF the forefoot start, dWL the stem's foot at the waterline,
     bk the bilge fraction of the waterline half-breadth }.  d = metres forward of the transom. */
  function Hull(H) {
    var L = H.L, X0 = -L / 2;
    this.H = H; this.L = L;
    this.X = function (d) { return X0 + d; };
    var self = this;
    this.zd = function (d) { return tbl(H.zd, d); };
    this.hb = function (d) { return tbl(H.hb, d); };
    this.kz = function (d) {
      if (d >= H.dWL) return lerp(0, self.zd(L), (d - H.dWL) / (L - H.dWL));
      if (d <= H.aR) return lerp(H.tz, -H.T, Math.sin(clamp(d / H.aR, 0, 1) * PI / 2));
      if (d <= H.fF) return -H.T;
      var t = (d - H.fF) / (H.dWL - H.fF);
      return -H.T * (1 - Math.pow(t, H.fp || 1.8));
    };
  }
  Hull.prototype.sec = function (d) {
    var H = this.H, zd = this.zd(d), hd = this.hb(d), hw = Math.min(tbl(H.hw, d), hd + 0.4), kz = this.kz(d), P;
    var tb = H.tb ? tbl(H.tb, d) : 0, zk = H.kn ? Math.min(tbl(H.kn, d), zd - 0.05) : zd * 0.55;
    var hk = H.kn ? hd : lerp(hd, hw, 0.3);
    if (kz >= -0.02) {
      /* forward of the stem foot: deck edge, knuckle, then the stem line */
      var zs = Math.min(kz, zd - 0.02), zk2 = Math.max(zk, zs + 0.01);
      P = [[hd - tb, zd], [hk * (zk2 - zs) / Math.max(0.01, zd - zs) * 0.98, zk2], [0, zs], [0, zs], [0, zs], [0, zs], [0, zs]];
      if (!H.kn) P[1] = [hd * (zk2 - zs) / Math.max(0.01, zd - zs) * 0.9, zk2];
      return P;
    }
    var bk = H.bk || 0.92, dr = H.dr || 0.55;
    var bt = Math.min(H.bt || 0.45, Math.max(zk, 0.1) - 0.04), zk1 = Math.max(zk, bt + 0.04);
    P = [[hd - tb, zd], [hk, zk1], [lerp(hw, hk, bt / zk1), bt], [hw, 0], [hw * bk, kz * dr], [hw * 0.45, kz * 0.93], [0, kz]];
    return P;
  };
  Hull.prototype.build = function (B, extra) {
    var H = this.H, L = this.L, X = this.X, self = this, ds = [], d, i, k, s;
    for (d = 0; d < L - 0.01; d += L / 44) ds.push(d);
    (H.zd.concat(H.hb, H.hw)).forEach(function (p) { if (p[0] > 0 && p[0] < L) ds.push(p[0]); });
    [H.dWL, H.fF, H.aR, L - 0.6, L - 0.25].forEach(function (v) { if (v > 0 && v < L) ds.push(v); });
    for (d = H.dWL; d < L; d += (L - H.dWL) / 6) ds.push(d);
    ds.push(L);
    ds.sort(function (a, b) { return a - b; });
    ds = ds.filter(function (v, j) { return j === 0 || v - ds[j - 1] > 0.05; });
    var S = ds.map(function (v) { return self.sec(v); });
    var btz = H.bt || 0.45;
    function pick(a, b, c) { var z = (a[2] + b[2] + c[2]) / 3; return z < -0.01 ? B.boot : (z < btz - 0.01 && Math.max(a[2], b[2], c[2]) < btz + 0.01 ? B.dark : B.hull); }
    for (i = 0; i + 1 < ds.length; i++) {
      var xa = X(ds[i]), xb = X(ds[i + 1]), A = S[i], Bq = S[i + 1];
      for (s = -1; s <= 1; s += 2) for (k = 0; k + 1 < 7; k++) {
        var p = [xa, s * A[k][0], A[k][1]], q = [xa, s * A[k + 1][0], A[k + 1][1]],
            r = [xb, s * Bq[k + 1][0], Bq[k + 1][1]], t = [xb, s * Bq[k][0], Bq[k][1]];
        var tris = s > 0 ? [[p, r, q], [p, t, r]] : [[p, q, r], [p, r, t]];
        tris.forEach(function (T) {
          var cc = cross(sub(T[1], T[0]), sub(T[2], T[0]));
          if (dot(cc, cc) > 1e-10) pick(T[0], T[1], T[2]).tri(T[0], T[1], T[2]);
        });
      }
      /* the deck, cambered */
      var cm = H.camber || 0.1, cA = A[0][1] + cm * Math.min(1, A[0][0] / 2), cB = Bq[0][1] + cm * Math.min(1, Bq[0][0] / 2);
      for (s = -1; s <= 1; s += 2) {
        var e0 = [xa, s * A[0][0], A[0][1]], e1 = [xb, s * Bq[0][0], Bq[0][1]], m0 = [xa, 0, cA], m1 = [xb, 0, cB];
        var D = s > 0 ? [[e0, m1, e1], [e0, m0, m1]] : [[e0, e1, m1], [e0, m1, m0]];
        D.forEach(function (T) {
          var cc = cross(sub(T[1], T[0]), sub(T[2], T[0]));
          if (dot(cc, cc) > 1e-10) B.deck.tri(T[0], T[1], T[2]);
        });
      }
    }
    /* the transom, fanned from its centroid, every triangle facing aft */
    var T0 = S[0], x0 = X(0), poly = [], zc = 0;
    for (k = 0; k < 7; k++) poly.push([x0, T0[k][0], T0[k][1]]);
    for (k = 5; k >= 1; k--) poly.push([x0, -T0[k][0], T0[k][1]]);
    poly.push([x0, -T0[0][0], T0[0][1]]);
    for (k = 0; k < poly.length; k++) zc += poly[k][2] / poly.length;
    var ctr = [x0, 0, zc];
    for (k = 0; k < poly.length; k++) {
      var a = poly[k], b = poly[(k + 1) % poly.length], cc = cross(sub(a, ctr), sub(b, ctr));
      if (dot(cc, cc) < 1e-12) continue;
      var bn = (a[2] + b[2] + ctr[2]) / 3 < -0.01 ? B.boot : B.hull;
      if (cc[0] < 0) bn.tri(ctr, a, b); else bn.tri(ctr, b, a);
    }
  };
  /* the deck edge point (port) at d, inset by ins */
  Hull.prototype.edge = function (d, ins) { var s = this.sec(d); return Math.max(0.2, s[0][0] - (ins || 0)); };
  /* lifelines along the deck edge from da to db (stanchions ~1.4 m apart) */
  Hull.prototype.rails = function (B, da, db, ins, h) {
    var s, d, hh = h || 1.0, X = this.X, self = this;
    for (s = -1; s <= 1; s += 2) {
      for (d = da; d < db - 0.01; d += 1.4) {
        var dn = Math.min(d + 1.4, db), y0 = s * self.edge(d, ins || 0.08), y1 = s * self.edge(dn, ins || 0.08);
        bar(B.metal, [X(d), y0, self.zd(d) + hh], [X(dn), y1, self.zd(dn) + hh], 0.025);
        bar(B.metal, [X(d), y0, self.zd(d) + hh * 0.5], [X(dn), y1, self.zd(dn) + hh * 0.5], 0.016);
        box(B.metal, X(d) - 0.025, X(d) + 0.025, y0 - 0.025, y0 + 0.025, self.zd(d), self.zd(d) + hh);
      }
    }
  };
  /* a rail round a rectangle at height z (roof edges, bridge wings) */
  function railRect(B, x0, x1, y0, y1, z, h) {
    var hh = h || 1.0, k, P = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    for (k = 0; k < 4; k++) {
      var a = P[k], b = P[(k + 1) % 4], len = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(len / 1.5)), j;
      bar(B.metal, [a[0], a[1], z + hh], [b[0], b[1], z + hh], 0.022);
      for (j = 0; j < n; j++) { var t = j / n, x = lerp(a[0], b[0], t), y = lerp(a[1], b[1], t); box(B.metal, x - 0.022, x + 0.022, y - 0.022, y + 0.022, z, z + hh); }
    }
  }

  /* ============================================================ parts, each drawn in its own frame
     (F = frames(B, x, y, z, az): origin on the mount's foot, +X its line of fire, +Z up) */

  /* OTO Melara 76/62 Compact (deu_type148.js oto76, the same gun): ribbed skirt, base ring, the loaf
     gunhouse 3.0 x 2.9 m and 2.2 m over the ring, the barrel out of a slot in the front */
  function oto76(F, el) {
    var zb = 0, zr = 0.5, k, e = (el === undefined ? 3 : el) * DEG;
    cyl(F.sup, [0, 0, zb], [0, 0, zb + 0.32], 1.75, 1.45, 20);
    for (k = 0; k < 12; k++) {
      var a = k / 12 * TAU, ca = Math.cos(a), sa = Math.sin(a);
      obox(F.dark, [0, 0, zb], [ca, sa, 0], [-sa, ca, 0], [0, 0, 1], 1.42, 1.78, -0.03, 0.03, 0.0, 0.3);
    }
    cylZ(F.light, 0, 0, zb + 0.32, zr, 1.5, 20);
    var as = [0, 0.04, 0.12, 0.25, 0.5, 0.75, 0.88, 0.96, 1.0];
    var rings = as.map(function (a) {
      var q2 = Math.sqrt(Math.max(0, 1 - Math.pow(2 * a - 1, 2))), x = lerp(-1.5, 1.5, a), w = 1.45 * (0.6 + 0.4 * q2),
          top = zr + 1.2 + 1.0 * q2, r = Math.min(0.9, w * 0.62, top - zr - 0.05), P = [], q, t;
      P.push([x, -w, zr], [x, w, zr]);
      for (q = 0; q <= 3; q++) { t = q / 3 * PI / 2; P.push([x, w - r * (1 - Math.cos(t)), top - r * (1 - Math.sin(t))]); }
      for (q = 0; q <= 3; q++) { t = q / 3 * PI / 2; P.push([x, -w + r * (1 - Math.sin(t)), top - r * (1 - Math.cos(t))]); }
      return P;
    });
    loft(F.light, rings);
    var zg = zr + 1.55, ce = Math.cos(e), se = Math.sin(e), x1 = 1.2;
    box(F.dark, 1.05, 1.45, -0.38, 0.38, zr + 0.2, zr + 1.7);
    cyl(F.metal, [x1, 0, zg], [x1 + 0.9 * ce, 0, zg + 0.9 * se], 0.2, 0.2, 10);
    cyl(F.metal, [x1 + 0.9 * ce, 0, zg + 0.9 * se], [x1 + 3.5 * ce, 0, zg + 3.5 * se], 0.1, 0.085, 8);
    cyl(F.metal, [x1 + 3.5 * ce, 0, zg + 3.5 * se], [x1 + 3.75 * ce, 0, zg + 3.75 * se], 0.13, 0.13, 8);
  }
  /* Bofors 40 mm L/70 on an open pedestal mount with a small shield (the 1950s - 60s boats) */
  function bofors40open(F, el) {
    var e = (el === undefined ? 12 : el) * DEG, ce = Math.cos(e), se = Math.sin(e);
    cylZ(F.sup, 0, 0, 0, 0.55, 0.75, 14);
    box(F.sup, -0.7, 0.6, -0.55, 0.55, 0.55, 1.35);
    obox(F.sup, [0.5, 0, 0.95], [ce, 0, se], [0, 1, 0], [-se, 0, ce], 0, 0.15, -0.75, 0.75, -0.3, 0.75);  /* shield */
    cyl(F.metal, [0.2, 0, 1.15], [0.2 + 1.1 * ce, 0, 1.15 + 1.1 * se], 0.13, 0.12, 8);
    cyl(F.metal, [0.2 + 1.1 * ce, 0, 1.15 + 1.1 * se], [0.2 + 3.1 * ce, 0, 1.15 + 3.1 * se], 0.06, 0.055, 7);
    cyl(F.metal, [0.2 + 3.1 * ce, 0, 1.15 + 3.1 * se], [0.2 + 3.45 * ce, 0, 1.15 + 3.45 * se], 0.09, 0.075, 7);
  }
  /* Bofors 40 mm L/70 in the enclosed glass-fibre cupola of the later boats (rounded house, the
     barrel through a slot), 2.6 m long */
  function bofors40house(F, el) {
    var e = (el === undefined ? 10 : el) * DEG, ce = Math.cos(e), se = Math.sin(e), hw = 0.95, zs = 0.85, k, t, R = [];
    cylZ(F.sup, 0, 0, 0, 0.3, 1.1, 16);
    function sec(x, sc) {
      var P = [[x, -hw * sc, 0.3], [x, hw * sc, 0.3]];
      for (k = 0; k <= 6; k++) { t = k / 6 * PI; P.push([x, hw * sc * Math.cos(t), zs + 0.3 + hw * 0.8 * Math.sin(t)]); }
      return P;
    }
    R.push(sec(-1.3, 0.85), sec(-0.6, 1), sec(0.7, 1), sec(1.2, 0.8));
    loft(F.sup, R);
    box(F.dark, 1.1, 1.3, -0.22, 0.22, 0.6, 1.7);
    cyl(F.metal, [0.9, 0, 1.25], [0.9 + 3.0 * ce, 0, 1.25 + 3.0 * se], 0.06, 0.055, 7);
    cyl(F.metal, [0.9 + 3.0 * ce, 0, 1.25 + 3.0 * se], [0.9 + 3.35 * ce, 0, 1.25 + 3.35 * se], 0.09, 0.075, 7);
  }
  /* a single enclosed gunhouse: length lg, half-breadth hw, roof h, sloped front (fs), rounded
     rear corners; the barrel r0/r1, length bl, out of the front at zg */
  function gunhouse(F, lg, hw, h, fs, zg, bl, r0, r1, el, twin) {
    var e = (el || 0) * DEG, ce = Math.cos(e), se = Math.sin(e), zb = 0.35;
    cylZ(F.sup, 0, 0, 0, zb, Math.min(hw, lg / 2) * 0.95, 18);
    prism(F.sup, [[-lg / 2, zb], [lg / 2, zb], [lg / 2, zb + h * 0.45], [lg / 2 - fs, zb + h], [-lg / 2 + 0.3, zb + h], [-lg / 2, zb + h - 0.3]],
          function (z) { return hw - Math.max(0, z - zb - h * 0.6) * 0.25; });
    var ys = twin ? [-twin, twin] : [0], i;
    for (i = 0; i < ys.length; i++) {
      var x1 = lg / 2 - fs * 0.4;
      box(F.dark, x1 - 0.05, x1 + 0.12, ys[i] - 0.25, ys[i] + 0.25, zb + zg - 0.35, zb + zg + 0.35);
      cyl(F.metal, [x1, ys[i], zb + zg], [x1 + bl * ce, ys[i], zb + zg + bl * se], r0, r1, 8);
    }
  }
  /* 5-inch/38 Mk 30 single enclosed mount (Fletcher [F1][F3]) */
  function mk30(F) { gunhouse(F, 4.6, 1.6, 2.4, 1.0, 1.15, 5.0, 0.16, 0.12, 2); cylZ(F.sup, -0.6, 0.9, 2.75, 3.0, 0.3, 8); cylZ(F.sup, -0.6, -0.9, 2.75, 3.0, 0.3, 8); }
  /* French 100 mm Mod 53 (Koeln [K1]): an angular gunhouse, one barrel */
  function mod53(F) { gunhouse(F, 4.4, 1.55, 2.3, 1.3, 1.05, 5.0, 0.14, 0.11, 3); }
  /* twin 3-inch/50 Mk 33, open, with a light shield (Fletcher, German fit [F3][F4]) */
  function twin3in50(F, el) {
    var e = (el === undefined ? 10 : el) * DEG, ce = Math.cos(e), se = Math.sin(e), s;
    cylZ(F.sup, 0, 0, 0, 0.5, 1.4, 16);
    box(F.sup, -0.9, 0.9, -1.0, 1.0, 0.5, 1.5);
    obox(F.sup, [0.9, 0, 0.8], [ce, 0, se], [0, 1, 0], [-se, 0, ce], 0, 0.12, -1.3, 1.3, -0.2, 1.0);
    for (s = -1; s <= 1; s += 2) cyl(F.metal, [0.5, s * 0.4, 1.25], [0.5 + 3.6 * ce, s * 0.4, 1.25 + 3.6 * se], 0.1, 0.08, 8);
  }
  /* twin 40 mm Breda in a small house (Koeln [K1]) */
  function breda40(F) { gunhouse(F, 2.6, 1.1, 1.6, 0.6, 0.85, 3.0, 0.07, 0.06, 6, 0.28); }
  /* RIM-116 RAM, Mk 49 launcher: pedestal, yoke, the 21-cell box elevated */
  function ram(F, el) {
    var e = (el === undefined ? 8 : el) * DEG, ce = Math.cos(e), se = Math.sin(e), u = [ce, 0, se], v = [0, 1, 0], w = [-se, 0, ce];
    cylZ(F.sup, 0, 0, 0, 0.9, 0.7, 14);
    box(F.sup, -0.5, 0.5, -1.05, 1.05, 0.9, 1.4);
    obox(F.light, [-1.1, 0, 1.9], u, v, w, 0, 2.6, -0.8, 0.8, -0.75, 0.75);
    obox(F.dark, [-1.1, 0, 1.9], u, v, w, 2.6, 2.63, -0.68, 0.68, -0.63, 0.63);
    obox(F.sup, [-1.1, 0, 1.9], u, v, w, 0.3, 2.3, -0.95, -0.8, -0.3, 0.3);
    obox(F.sup, [-1.1, 0, 1.9], u, v, w, 0.3, 2.3, 0.8, 0.95, -0.3, 0.3);
  }
  /* a bank of n canisters side by side (Harpoon, Exocet, RBS15): length lg, width cw, height ch,
     elevated el deg, on a stand of height sh */
  function canisters(F, n, lg, cw, ch, el, sh, round) {
    var e = el * DEG, ce = Math.cos(e), se = Math.sin(e), u = [ce, 0, se], v = [0, 1, 0], w = [-se, 0, ce], i;
    box(F.sup, -lg * 0.35, lg * 0.35, -n * cw / 2, n * cw / 2, 0, sh);
    for (i = 0; i < n; i++) {
      var yc = (i - (n - 1) / 2) * cw * 1.04, O = [-lg / 2 * ce, yc, sh + 0.1 + lg / 2 * se * 0];
      if (round) cyl(F.light, [O[0], yc, sh + ch / 2], [O[0] + lg * ce, yc, sh + ch / 2 + lg * se], cw * 0.48, cw * 0.48, 10);
      else obox(F.light, O, u, v, w, 0, lg, -cw * 0.48, cw * 0.48, 0, ch);
      if (!round) { obox(F.sup, O, u, v, w, 0.3, 0.45, -cw * 0.5, cw * 0.5, -0.02, ch + 0.02); obox(F.sup, O, u, v, w, lg - 0.45, lg - 0.3, -cw * 0.5, cw * 0.5, -0.02, ch + 0.02); }
    }
  }
  /* a radome: a sphere r on a pedestal of height ph */
  function radome(F, r, ph, pr) {
    cylZ(F.sup, 0, 0, 0, ph, pr || r * 0.35, 10);
    ellipsoid(F.light, [0, 0, ph + r * 0.9], r, r, r, 7, 16, -PI / 2 * 0.75, PI / 2);
  }
  /* a flat planar array w x h on a turning pedestal (TRS-3D, SMART-S, APAR-like boxes), facing +X */
  function planar(F, w, h, th, ph, tilt) {
    var t = (tilt || 15) * DEG, u = [Math.sin(t), 0, Math.cos(t)], v = [0, 1, 0], wv = [Math.cos(t), 0, -Math.sin(t)];
    cylZ(F.metal, 0, 0, 0, ph, 0.25, 8);
    obox(F.dark, [0, 0, ph + 0.15], u, v, wv, 0, h, -w / 2, w / 2, -th, 0);
    box(F.metal, -0.5, 0.2, -0.4, 0.4, ph - 0.05, ph + 0.4);
  }
  /* a bedspring / open-lattice air search antenna w x h (SPS-6, LW-08, SPS-40), slightly curved,
     facing +X, on a pedestal of height ph */
  function bedspring(F, w, h, ph, nx, nz, mat) {
    var i, j, M = mat || F.metal, cv = 0.08;
    cylZ(F.metal, 0, 0, 0, ph, 0.18, 8);
    function P(y, z) { return [-cv * w * Math.pow(2 * y / w, 2) * 0.5, y, ph + 0.2 + z]; }
    for (i = 0; i <= nx; i++) { var y = -w / 2 + w * i / nx; bar(M, P(y, 0), P(y, h), 0.03); }
    for (j = 0; j <= nz; j++) { var z = h * j / nz, k; for (k = 0; k < nx; k++) bar(M, P(-w / 2 + w * k / nx, z), P(-w / 2 + w * (k + 1) / nx, z), 0.03); }
    bar(F.metal, [0, 0, ph], [-0.6, 0, ph + h * 0.5], 0.06);
  }
  /* a dish of radius r facing +X on a stub */
  function dish(F, r, ph) {
    cylZ(F.metal, 0, 0, 0, ph, 0.12, 8);
    cyl(F.light, [0.15, 0, ph + r], [0.4, 0, ph + r], r, r * 0.75, 16);
    bar(F.metal, [0, 0, ph], [0.2, 0, ph + r], 0.05);
  }
  /* a rotating bar antenna (navigation radar) w long */
  function navbar(F, w, ph) { cylZ(F.metal, 0, 0, 0, ph, 0.08, 6); box(F.dark, -0.12, 0.12, -w / 2, w / 2, ph, ph + 0.25); }
  /* a lattice mast: four legs from a square foot (half-sides fx, fy at z0) to a square head
     (hx, hy at z1), braced at every lev, centred at the frame's origin */
  function lattice(F, fx, fy, hx, hy, z0, z1, lev, r, M) {
    var mat = M || F.metal, rr = r || 0.06, c = [[1, 1], [1, -1], [-1, -1], [-1, 1]], k, h;
    function at(i, z) { var t = (z - z0) / (z1 - z0); return [c[i][0] * lerp(fx, hx, t), c[i][1] * lerp(fy, hy, t), z]; }
    for (k = 0; k < 4; k++) bar(mat, at(k, z0), at(k, z1), rr);
    var L = [z0]; for (h = 1; h <= lev; h++) L.push(lerp(z0, z1, h / lev));
    for (h = 1; h < L.length; h++) for (k = 0; k < 4; k++) {
      var n = (k + 1) % 4;
      bar(mat, at(k, L[h]), at(n, L[h]), rr * 0.6);
      bar(mat, at(k, L[h - 1]), at(n, L[h]), rr * 0.45);
    }
  }
  /* an open boat (RHIB / cutter) lg x bw on chocks, its keel at the frame's z */
  function boat(F, lg, bw, bh) {
    var R = [], i, n = 7, h = bh || 0.9;
    for (i = 0; i <= n; i++) {
      var t = i / n, x = lerp(-lg / 2, lg / 2, t), w = bw / 2 * Math.sqrt(Math.max(0.05, 1 - Math.pow(Math.max(0, t - 0.55) / 0.45, 2))) * (t < 0.08 ? 0.92 : 1);
      R.push([[x, 0, 0], [x, w * 0.7, h * 0.35], [x, w, h], [x, -w, h], [x, -w * 0.7, h * 0.35]]);
    }
    loft(F.light, R);
    box(F.dark, -lg * 0.35, lg * 0.3, -bw * 0.38, bw * 0.38, h - 0.05, h + 0.02);
  }
  /* a torpedo tube lg long, radius r, on two saddles */
  function tube(F, lg, r, sh) {
    cylX(F.sup, -lg / 2, lg / 2, 0, sh + r, r, 12);
    box(F.sup, -lg * 0.3 - 0.2, -lg * 0.3 + 0.2, -r * 0.8, r * 0.8, 0, sh + r * 0.5);
    box(F.sup, lg * 0.3 - 0.2, lg * 0.3 + 0.2, -r * 0.8, r * 0.8, 0, sh + r * 0.5);
    cylX(F.dark, lg / 2, lg / 2 + 0.05, 0, sh + r, r * 0.85, 12);
  }
  /* raft canister */
  function raft(B, x, y, z, ax) { var d = ax === "y" ? [0, 0.75, 0] : [0.75, 0, 0]; cyl(B.light, [x - d[0], y - d[1], z], [x + d[0], y + d[1], z], 0.3, 0.3, 10); }
  function hidePad(THREE, root, x, y, z) {
    var hp = new THREE.Object3D(); hp.name = "helipad"; hp.visible = false;
    hp.position.set(x, y, z); root.add(hp);
  }
  /* the named mount: its own bins, flushed into a group named "turret" at (x, y, z) */
  function turretGroup(THREE, T, x, y, z, draw) {
    var Bt = bins(T), g = new THREE.Group();
    draw(frames(Bt, 0, 0, 0, 0));
    flush(THREE, g, Bt);
    g.name = "turret"; g.position.set(x, y, z);
    return g;
  }
  /* a window (or any small dark panel) on a face looking along +X at x */
  function win(bin, x, yc, zc, w, h) { box(bin, x - 0.03, x + 0.06, yc - w / 2, yc + w / 2, zc - h / 2, zc + h / 2); }

  /* ============================================================ deck fittings (rule 10), all baked */
  /* a pair of bitts (bollards) on a base plate at deck edge offset */
  function bitts(B, x, y, z) {
    box(B.metal, x - 0.45, x + 0.45, y - 0.18, y + 0.18, z, z + 0.06);
    cylZ(B.metal, x - 0.25, y, z, z + 0.45, 0.12, 8); cylZ(B.metal, x + 0.25, y, z, z + 0.45, 0.12, 8);
    cylZ(B.metal, x - 0.25, y, z + 0.42, z + 0.48, 0.16, 8); cylZ(B.metal, x + 0.25, y, z + 0.42, z + 0.48, 0.16, 8);
  }
  function fairlead(B, x, y, z) { box(B.metal, x - 0.25, x + 0.25, y - 0.12, y + 0.12, z, z + 0.3); box(B.dark, x - 0.13, x + 0.13, y - 0.13, y + 0.13, z + 0.1, z + 0.24); }
  function hatch(B, x, y, z, a, b) { box(B.sup, x - a / 2, x + a / 2, y - b / 2, y + b / 2, z, z + 0.25); box(B.dark, x - a / 2 + 0.08, x + a / 2 - 0.08, y - b / 2 + 0.08, y + b / 2 - 0.08, z + 0.25, z + 0.27); }
  function vent(B, x, y, z, r, h) { cylZ(B.sup, x, y, z, z + (h || 0.7), r || 0.18, 8); cylZ(B.sup, x, y, z + (h || 0.7), z + (h || 0.7) + 0.12, (r || 0.18) * 1.9, 10); }
  function ladder(B, x, y, z0, z1, along) {
    var k, n = Math.max(2, Math.round((z1 - z0) / 0.3)), dy = along ? 0 : 0.25, dx = along ? 0.25 : 0;
    bar(B.metal, [x - dx, y - dy, z0], [x - dx, y - dy, z1], 0.025); bar(B.metal, [x + dx, y + dy, z0], [x + dx, y + dy, z1], 0.025);
    for (k = 1; k < n; k++) { var z = lerp(z0, z1, k / n); bar(B.metal, [x - dx, y - dy, z], [x + dx, y + dy, z], 0.018); }
  }
  function whip(B, x, y, z, h) { cyl(B.metal, [x, y, z], [x, y, z + h], 0.05, 0.015, 4); box(B.metal, x - 0.12, x + 0.12, y - 0.12, y + 0.12, z, z + 0.25); }
  /* a liferaft canister in its cradle */
  function raftCradle(B, x, y, z, ax) {
    var A = ax === "y", d = A ? [0, 0.7, 0] : [0.7, 0, 0];
    box(B.metal, x - (A ? 0.35 : 0.8), x + (A ? 0.35 : 0.8), y - (A ? 0.8 : 0.35), y + (A ? 0.8 : 0.35), z, z + 0.12);
    cyl(B.light, [x - d[0], y - d[1], z + 0.45], [x + d[0], y + d[1], z + 0.45], 0.32, 0.32, 10);
    cyl(B.dark, [x - d[0] * 0.3, y - d[1] * 0.3, z + 0.45], [x - d[0] * 0.25, y - d[1] * 0.25, z + 0.45], 0.335, 0.335, 10);
  }
  /* a pair of gravity davits and their boat */
  function davits(B, x, y, z, lg, s) {
    var k;
    for (k = -1; k <= 1; k += 2) {
      var xd = x + k * lg * 0.32;
      bar(B.metal, [xd, y - s * 0.6, z], [xd, y + s * 0.2, z + 2.4], 0.08);
      bar(B.metal, [xd, y + s * 0.2, z + 2.4], [xd, y + s * 0.9, z + 2.3], 0.07);
    }
    boat(frames(B, x, y + s * 0.75, z + 0.7, 0), lg, 2.1, 0.85);
  }
  /* the anchor in its hawse pocket on each bow at d (bin set, hull) and the hawse pipe on deck */
  function anchors(B, H, d, zBelow) {
    var X = H.X, s, z = H.zd(d) - (zBelow || 1.6);
    for (s = -1; s <= 1; s += 2) {
      var y = s * (H.sec(d)[1][0] + 0.02), sec = H.sec(d), yE = s * sec[0][0];
      cylY(B.dark, X(d), y - s * 0.05, y + s * 0.06, z, 0.42, 12);
      box(B.metal, X(d) - 0.1, X(d) + 0.1, y, y + s * 0.12, z - 0.9, z + 0.15);
      box(B.metal, X(d) - 0.45, X(d) + 0.45, y, y + s * 0.12, z - 0.95, z - 0.75);
      cylZ(B.dark, X(d - 1.0), yE - s * 1.0, H.zd(d - 1.0), H.zd(d - 1.0) + 0.1, 0.3, 10);
      /* the cable run to the windlass */
      bar(B.metal, [X(d - 1.0), yE - s * 1.0, H.zd(d - 1) + 0.08], [X(d - 4.0), s * 0.7, H.zd(d - 4) + 0.08], 0.06);
      box(B.metal, X(d - 4.6), X(d - 3.6), s * 0.3, s * 1.1, H.zd(d - 4.1), H.zd(d - 4.1) + 0.55);
    }
  }
  /* scuttles along both sides from da to db at z (pitch p) */
  function scuttles(B, H, da, db, z, p, r) {
    var X = H.X, s, d;
    for (s = -1; s <= 1; s += 2) for (d = da; d <= db + 0.01; d += p) {
      var y = H.sec(d), hy = lerp(y[1][0], y[0][0], clamp((z - y[1][1]) / Math.max(0.1, y[0][1] - y[1][1]), 0, 1));
      cylY(B.glass, X(d), s * (hy - 0.03), s * (hy + 0.05), z, r || 0.17, 8);
    }
  }
  /* bollards, fairleads and a few deck vents along the deck at the stations listed */
  function deckGear(B, H, list) {
    var X = H.X;
    list.forEach(function (d) {
      for (var s = -1; s <= 1; s += 2) {
        var y = s * (H.edge(d) - 0.7);
        bitts(B, X(d), y, H.zd(d));
        fairlead(B, X(d + 1.0), s * (H.edge(d + 1.0) - 0.15), H.zd(d + 1.0));
      }
    });
  }

  /* ============================================================ F123 Brandenburg [R1][R2][R3]
     [R1] Commons "Fregatte Schleswig-Holstein.jpg" (F216, 830 px), near broadside from port, bow left:
     stem head x 80 to stern x 603 = 138.85 m, 3.76 px/m along the hull, d = (603 - x) / 3.76.  The
     ship lies a little angled away, so heights are read on a vertical scale of 5.4 px/m taken from the
     OTO 76 gunhouse (2.7 m ring to crown, as deu_type148.js measured it), against a waterline traced
     from y 333 at the stem to 318 at the stern: every height NOT CONFIRMED to perhaps 15 per cent.
     [R2] "BrandenburgF215 cropped.jpg" (starboard bow, close): the shaped hull, the pyramid foremast
     with SMART-S, the black pole mast, the funnel, the LW08 aft, the RAM ahead of the bridge.
     [R3] "German frigate Bayern (F217) underway in the Baltic Sea on 10 June 2008": port bow, the
     forward deck, the MM38 positions, the boats. */
  var BRAH = {
    L: 138.85, T: 4.35, tz: -0.8, aR: 16, fF: 110, dWL: 132.2, fp: 1.6,
    zd: [[0, 5.4], [16.6, 5.4], [17.1, 8.4], [100, 8.8], [138.85, 9.6]],
    hb: [[0, 7.3], [14, 8.1], [32, 8.35], [88, 8.35], [104, 7.6], [118, 5.6], [128, 3.4], [134.5, 1.5], [138.85, 0.1]],
    hw: [[0, 6.4], [14, 7.6], [32, 7.9], [84, 7.9], [100, 7.0], [114, 4.8], [124, 2.4], [132.2, 0.05]],
    kn: [[0, 4.4], [100, 5.0], [138.85, 6.0]], tb: [[0, 0.45], [138.85, 0.45]], camber: 0.14
  };
  function buildBrandenburg(THREE, M, C) {
    var T = materials(THREE, C, PAINT_K130), B = bins(T), g = new THREE.Group(), H = new Hull(BRAH), X = H.X, s, k;
    H.build(B);
    /* the hangar d 16.8 - 51 to 11.0, its door aft [R1][R2] */
    house(B.sup, X(16.8), X(51.5), 8.35, 11.0, 7.2, 0.1, 0, 0);
    house(B.sup, X(16.8), X(26.0), 5.35, 8.5, 7.6, 0.1, 0, 0);
    box(B.dark, X(16.8) - 0.05, X(16.8) + 0.02, -4.4, 4.4, 5.4, 10.2);
    /* the 01 deckhouse d 51 - 100.5 to 12.2, the forward block d 72 - 100.5 to 14.0, the bridge
       d 92 - 100.5 to 16.6 [R1][R2] */
    house(B.sup, X(51.0), X(104.0), 8.75, 12.2, 7.4, 0.1, 0.6, 0);
    house(B.sup, X(72.0), X(100.5), 12.15, 14.0, 6.0, 0.1, 0.4, 0);
    house(B.sup, X(90.5), X(100.5), 13.95, 16.6, 5.2, 0.1, 0.7, 0);
    for (k = -5; k <= 5; k++) win(B.glass, X(100.5) - 0.75, k * 0.85, 15.7, 0.6, 0.7);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 5; k++) box(B.glass, X(91.5 + k * 1.4), X(92.5 + k * 1.4), s * 4.95 - 0.05, s * 4.95 + 0.05, 15.4, 16.1);
    /* the pyramid foremast d 72.6 - 85.9 at 16.6 to d 76.5 - 83.2 at 28, SMART-S on top [R1][R2] */
    prism(B.sup, [[X(72.6), 13.95], [X(85.9), 13.95], [X(83.2), 28.0], [X(76.5), 28.0]], function (z) { return lerp(4.2, 1.7, (z - 13.95) / 14.05); });
    planar(frames(B, X(79.8), 0, 28.0, 0), 3.0, 1.6, 0.4, 0.9, 15);
    bar(B.metal, [X(79.0), -5.0, 25.0], [X(79.0), 5.0, 25.0], 0.07);
    for (s = -1; s <= 1; s += 2) { radome(frames(B, X(84.0), s * 4.0, 16.6, 0), 1.0, 0.4); radome(frames(B, X(74.2), s * 3.3, 20.5, 0), 0.6, 0.2); box(B.sup, X(73.0), X(75.6), s * 2.0, s * 4.0, 20.4, 20.55); }
    /* the black pole mast at d 64 to 33, its yard at 25.6 [R1][R2] */
    cyl(B.dark, [X(64.0), 0, 12.2], [X(64.0), 0, 30.0], 0.4, 0.25, 8);
    cyl(B.metal, [X(64.0), 0, 30.0], [X(64.0), 0, 33.0], 0.1, 0.05, 6);
    bar(B.dark, [X(64.0), -3.6, 25.6], [X(64.0), 3.6, 25.6], 0.12);
    /* the funnel d 48.7 - 67 to 19.3, sloped front, black top [R1][R2] */
    house(B.sup, X(50.5), X(66.0), 12.15, 18.6, 3.9, 0.08, 3.0, 0.6);
    house(B.dark, X(51.1), X(62.5), 18.55, 19.3, 3.3, 0.05, 0.6, 0);
    /* the LW08 on its tower aft d 38 - 47.3, the platform 20.8, the antenna 22.5 - 25.5 [R1][R2] */
    prism(B.sup, [[X(38.0), 10.95], [X(48.5), 10.95], [X(46.5), 20.8], [X(40.0), 20.8]], function (z) { return lerp(3.8, 2.0, (z - 10.95) / 9.85); });
    bedspring(frames(B, X(43.0), 0, 20.8, 0), 7.0, 3.0, 1.6, 12, 4);
    /* the boats d 54 - 64 [R1][R3] */
    for (s = -1; s <= 1; s += 2) davits(B, X(59.0), s * 6.6, 12.2, 7.5, s);
    /* MM38 Exocet, two pairs on the 01 roof abaft the bridge, trained across [R3] */
    canisters(frames(B, X(69.0), 2.6, 12.2, 32 * DEG), 2, 5.8, 1.0, 0.95, 8, 0.4);
    canisters(frames(B, X(69.0), -2.6, 12.2, -32 * DEG), 2, 5.8, 1.0, 0.95, 8, 0.4);
    /* the Mk 41 VLS before the bridge d 106 - 112 [R1][R2], the RAMs: on the 01 front d 103 and on
       the hangar roof d 19 [R1][R2] */
    box(B.sup, X(105.5), X(112.0), -2.6, 2.6, 8.75, 9.4);
    box(B.dark, X(106.0), X(111.5), -2.2, 2.2, 9.4, 9.43);
    ram(frames(B, X(102.6), 0, 12.2, 0), 8);
    ram(frames(B, X(21.5), 0, 8.5, PI), 8);
    /* fittings */
    H.rails(B, 0.3, 16.6, 0.5, 1.0);
    H.rails(B, 112.5, 137.4, 0.5, 1.0);
    railRect(B, X(26.3), X(51.2), -6.8, 6.8, 11.0, 1.0);
    railRect(B, X(51.5), X(72.0), -7.0, 7.0, 12.2, 1.0);
    railRect(B, X(16.9), X(25.9), -7.2, 7.2, 8.5, 1.0);
    deckGear(B, H, [2.0, 14.5, 114.0, 125.0]);
    anchors(B, H, 130.0, 4.0);
    hatch(B, X(121.0), 0, H.zd(121), 1.2, 1.0); hatch(B, X(13.0), 5.0, 5.4, 1.2, 1.0); hatch(B, X(13.0), -5.0, 5.4, 1.2, 1.0);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) raftCradle(B, X(76.0 + k * 2.2), s * 6.2, 12.2, "x");
      for (k = 0; k < 3; k++) raftCradle(B, X(30.0 + k * 2.2), s * 6.5, 11.0, "x");
      vent(B, X(113.5), s * 3.6, H.zd(113.5), 0.22, 0.7);
      ladder(B, X(51.8), s * 6.9, 11.0, 12.2, false);
      whip(B, X(50.0), s * 6.6, 12.2, 9.0);
      whip(B, X(99.0), s * 5.0, 16.6, 7.0);
    }
    cyl(B.metal, [X(138.3), 0, 9.6], [X(138.3), 0, 12.0], 0.04, 0.02, 5);
    box(B.team, X(30.0), X(34.0), -1.8, 1.8, 11.0, 11.03);
    box(B.team, X(92.5), X(95.5), -1.6, 1.6, 16.6, 16.63);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, X(116.8), 0, H.zd(116.8), function (F) { oto76(F, 3); }));
    hidePad(THREE, g, X(8.5), 0, 5.4 + 0.14);
    return g;
  }

  /* ============================================================ F122 Bremen [B1][B2][B3]
     [B1] Commons "Fregatte Bremen F207 7938.jpg", broadside from starboard, bow right: transom x 68 to
     stem head x 1478 = 130.5 m, 10.80 px/m; d = (x - 68) / 10.80; waterline y 683, z = (683 - y) / 10.8.
     [B2] "German frigate Bremen (F 207).jpg" (starboard bow from above, the 1980s fit) and [B3] "F207
     Bremen in Devonport.jpg" (starboard bow): the deck plan forward, the gun, the Harpoon banks.
     The row is the 1982 ship: the two RAM launchers [B1] carries (on the hangar and ahead of the bridge)
     came in the 1990s and are not drawn (eras.js: "RAM was NOT aboard in 1982"). */
  var BREH = {
    L: 130.5, T: 4.3, tz: -0.6, aR: 16, fF: 104, dWL: 127.0, fp: 1.7,
    zd: [[0, 5.3], [40, 5.55], [70, 5.65], [100, 6.0], [120, 6.4], [130.5, 6.75]],
    hb: [[0, 6.4], [12, 7.0], [30, 7.3], [80, 7.3], [98, 6.7], [112, 5.0], [122, 3.0], [127.5, 1.4], [130.5, 0.08]],
    hw: [[0, 5.6], [12, 6.6], [30, 7.0], [76, 7.0], [96, 6.0], [110, 3.9], [120, 1.6], [127, 0.05]],
    camber: 0.12, bk: 0.92, dr: 0.6
  };
  function buildBremen(THREE, M, C) {
    var T = materials(THREE, C, PAINT_K130), B = bins(T), g = new THREE.Group(), H = new Hull(BREH), X = H.X, s, k;
    H.build(B);
    /* the hangar d 28.9 - 47.9 to 11.7, its doors aft; the block d 47.9 - 54.4 to 10.6 [B1] */
    house(B.sup, X(28.9), X(48.2), 5.25, 11.7, 6.6, 0.02, 0, 0);
    box(B.dark, X(28.9) - 0.05, X(28.9) + 0.02, -5.4, 5.4, 5.4, 10.6);
    box(B.dark, X(28.95), X(29.0), -0.05, 0.05, 5.4, 10.6);
    house(B.sup, X(47.9), X(81.7), 5.6, 7.7, 6.4, 0.02, 0, 0);
    house(B.sup, X(47.9), X(54.6), 7.65, 10.6, 4.6, 0.02, 0, 0);
    /* the after director on its post d 47.5 to 19.7 [B1] */
    cylZ(B.dark, X(50.5), 0, 10.6, 16.5, 0.7, 10);
    box(B.dark, X(49.6), X(51.4), -0.9, 0.9, 16.5, 18.2);
    dish(frames(B, X(51.2), 0, 18.2, 0), 0.75, 0.0);
    /* the funnel d 54.8 - 64.1 to 14.4, its front sloped, black top; the central block d 54.4 - 81.7
       to 12.5 [B1][B3] */
    house(B.sup, X(54.4), X(81.7), 7.65, 12.5, 5.2, 0.04, 0.6, 0);
    house(B.sup, X(55.2), X(64.1), 12.45, 14.1, 3.0, 0.08, 2.4, 0);
    house(B.dark, X(55.4), X(61.4), 14.05, 14.4, 2.6, 0, 0, 0);
    /* the lattice main mast d 67.8 - 75.2 at 12.5 to d 70.5 - 73.3 at 28, the search set and the dome
       on top [B1][B2] */
    lattice(frames(B, X(71.6), 0, 0, 0), 3.7, 2.6, 1.3, 1.0, 12.5, 28.0, 7, 0.1);
    box(B.sup, X(70.0), X(73.2), -1.4, 1.4, 27.95, 28.1);
    bedspring(frames(B, X(71.6), 0, 28.1, 0), 4.6, 1.6, 0.6, 8, 2);
    radome(frames(B, X(71.0), 0, 30.4, 0), 0.6, 0.4);
    bar(B.metal, [X(72.0), -3.5, 24.0], [X(72.0), 3.5, 24.0], 0.06);
    /* the boats abreast the mast d 65 - 70.6 [B1] */
    for (s = -1; s <= 1; s += 2) davits(B, X(68.0), s * 5.6, 7.7, 6.5, s);
    /* Harpoon, two quadruple banks d 79 - 80.7, trained across [B1][B2] */
    canisters(frames(B, X(80.0), 2.0, 7.7, 35 * DEG), 4, 4.6, 0.75, 0.75, 8, 0.5);
    canisters(frames(B, X(80.0), -2.0, 7.7, -35 * DEG), 4, 4.6, 0.75, 0.75, 8, 0.5);
    /* the forward superstructure d 81.7 - 107.6: 01 to 8.0, 02 d 85 - 103.2 to 10.6, the bridge
       d 93.3 - 100.7 to 13.2; the WM25 radome tower at d 85.6, the dome r 1.6 at 22 [B1][B2] */
    house(B.sup, X(81.7), X(107.6), 5.9, 8.0, 6.2, 0.02, 0.3, 0);
    house(B.sup, X(84.0), X(103.2), 7.95, 10.6, 5.0, 0.03, 0.6, 0);
    house(B.sup, X(93.3), X(100.7), 10.55, 13.2, 4.0, 0.03, 0.6, 0);
    for (k = -4; k <= 4; k++) win(B.glass, X(100.7) - 0.6, k * 0.85, 12.4, 0.6, 0.6);
    railRect(B, X(93.6), X(100.0), -3.8, 3.8, 13.2, 1.0);
    house(B.sup, X(84.4), X(87.0), 10.55, 18.6, 1.4, 0.03, 0, 0);
    cylZ(B.sup, X(85.6), 0, 18.6, 20.4, 1.2, 12);
    ellipsoid(B.light, [X(85.6), 0, 21.9], 1.6, 1.6, 1.6, 7, 16, -PI / 2 * 0.8, PI / 2);
    /* the Mk 29 Sea Sparrow octuple launcher on the hangar roof d 37.5 [B1][B2] */
    (function (F) {
      cylZ(F.sup, 0, 0, 0, 0.8, 0.9, 12);
      obox(F.light, [-1.6, 0, 1.6], [Math.cos(0.3), 0, Math.sin(0.3)], [0, 1, 0], [-Math.sin(0.3), 0, Math.cos(0.3)], 0, 3.8, -1.3, 1.3, -0.7, 0.7);
      obox(F.dark, [-1.6, 0, 1.6], [Math.cos(0.3), 0, Math.sin(0.3)], [0, 1, 0], [-Math.sin(0.3), 0, Math.cos(0.3)], 3.8, 3.83, -1.2, 1.2, -0.6, 0.6);
    })(frames(B, X(40.0), 0, 11.7, PI));
    /* fittings */
    H.rails(B, 0.3, 28.8, 0.1, 1.0);
    H.rails(B, 104.0, 129.5, 0.1, 1.0);
    railRect(B, X(29.2), X(47.6), -6.4, 6.4, 11.7, 1.0);
    railRect(B, X(82.0), X(107.3), -6.0, 6.0, 8.0, 1.0);
    deckGear(B, H, [2.0, 22.0, 109.0, 119.0]);
    anchors(B, H, 124.0, 2.6);
    hatch(B, X(116.0), 0, H.zd(116), 1.2, 1.0); hatch(B, X(24.0), 4.4, H.zd(24), 1.2, 1.0); hatch(B, X(24.0), -4.4, H.zd(24), 1.2, 1.0);
    box(B.dark, X(0.2), X(0.3), -5.0, 5.0, 2.6, 4.6);                                         /* the transom openings [B1] */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) raftCradle(B, X(88.0 + k * 2.2), s * 5.6, 8.0, "x");        /* [B1] */
      for (k = 0; k < 2; k++) raftCradle(B, X(57.0 + k * 2.2), s * 5.8, 7.7, "x");
      vent(B, X(108.6), s * 3.4, H.zd(108.6), 0.2, 0.7);
      ladder(B, X(82.0), s * 5.8, 5.9, 8.0, false);
      ladder(B, X(48.2), s * 5.0, 7.7, 11.7, false);
      whip(B, X(47.0), s * 6.2, 11.7, 9.0);
      whip(B, X(98.0), s * 4.0, 13.2, 7.0);
    }
    cyl(B.metal, [X(130.0), 0, 6.75], [X(130.0), 0, 9.2], 0.04, 0.02, 5);
    box(B.team, X(33.0), X(36.0), -1.8, 1.8, 11.7, 11.73);
    box(B.team, X(94.5), X(97.5), -1.4, 1.4, 13.2, 13.23);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, X(113.6), 0, H.zd(113.6), function (F) { oto76(F, 3); }));
    hidePad(THREE, g, X(14.0), 0, 5.3 + 0.20);   /* at the pad surface the deck park stands the helicopter on (parked3d_check C) */
    return g;
  }

  /* ============================================================ F124 Sachsen [S1][S2][S3]
     [S1] broadside from port, bow left (Commons "Fregatte Sachsen (F 219) (cropped).jpg", the SM-2
     firing): stem head x 42 to transom x 1535 = 143.0 m, 10.44 px/m; d = (1535 - x) / 10.44. */
  var F124H = {
    L: 143.0, T: 5.0, tz: -1.0, aR: 18, fF: 112, dWL: 137.4, fp: 1.6,
    zd: [[0, 5.8], [23.3, 5.8], [23.7, 8.0], [120, 8.0], [143, 8.4]],
    hb: [[0, 7.6], [15, 8.4], [35, 8.72], [85, 8.72], [105, 8.1], [120, 6.6], [130, 4.6], [137, 2.6], [141, 0.9], [143, 0.1]],
    hw: [[0, 6.6], [15, 7.7], [35, 8.1], [80, 8.1], [100, 7.4], [115, 5.6], [127, 3.0], [134, 1.0], [137.4, 0.05]],
    kn: [[0, 4.6], [100, 5.6], [143, 6.2]], tb: [[0, 0.45], [143, 0.45]], camber: 0.14
  };
  function buildF124(THREE, M, C) {
    var T = materials(THREE, C, PAINT_K130), B = bins(T), g = new THREE.Group(), H = new Hull(F124H), X = H.X, s, k;
    H.build(B);
    /* the 01 block flush with the tumbled side, d 23.5 - 115.4, roof 11.0 [S1][S2] */
    house(B.hull, X(23.5), X(115.4), 7.95, 11.0, 8.25, 0.12, 0.5, 0);
    /* hangar d 23.5 - 48, roof 12.6, the door aft [S1][S3] */
    house(B.sup, X(23.5), X(48.0), 10.95, 12.6, 7.4, 0.12, 0, 0);
    box(B.dark, X(23.5) - 0.05, X(23.5) + 0.02, -4.6, 4.6, 5.8, 11.4);
    /* the long recess amidships over the boat deck d 64 - 79 [S1] */
    for (s = -1; s <= 1; s += 2) box(B.dark, X(64.0), X(79.5), s * 7.7, s * 7.95, 8.8, 10.0);
    /* the forward superstructure: 02 d 77 - 101 to 14.7 with the bridge in its front [S1][S2] */
    house(B.sup, X(76.5), X(101.0), 10.95, 14.7, 6.4, 0.12, 0.8, 0);
    for (k = -5; k <= 5; k++) win(B.glass, X(101.0) - 0.75, k * 1.0, 13.9, 0.75, 0.6);
    /* the APAR tower: a pyramid d 78.6 - 92.5 at 14.7 to d 80.5 - 90.0 at 20.8, the square tower to
       28.0 with a face on each side, the top to 30.8 and the mast to 35 [S1][S2][S3] */
    prism(B.sup, [[X(78.6), 14.65], [X(92.5), 14.65], [X(90.0), 20.8], [X(80.5), 20.8]], function (z) { return lerp(5.4, 3.6, (z - 14.65) / 6.15); });
    house(B.sup, X(83.2), X(89.6), 20.75, 28.0, 3.2, 0, 0, 0);
    prism(B.sup, [[X(83.2), 27.95], [X(89.6), 27.95], [X(88.3), 30.8], [X(84.5), 30.8]], function (z) { return lerp(3.2, 1.8, (z - 27.95) / 2.85); });
    /* the four APAR faces, square plates set into the tower's faces [S1][S2] */
    box(B.light, X(89.6) - 0.02, X(89.6) + 0.08, -1.5, 1.5, 22.8, 25.8);
    box(B.light, X(83.2) - 0.08, X(83.2) + 0.02, -1.5, 1.5, 22.8, 25.8);
    for (s = -1; s <= 1; s += 2) box(B.light, X(84.9), X(87.9), s * 3.2 - 0.05, s * 3.2 + 0.05, 22.8, 25.8);
    cyl(B.metal, [X(86.4), 0, 30.8], [X(86.4), 0, 35.0], 0.12, 0.05, 6);
    bar(B.metal, [X(86.4), -3.6, 32.0], [X(86.4), 3.6, 32.0], 0.06);
    radome(frames(B, X(86.4), 0, 30.8, 0), 0.5, 0.6);
    for (s = -1; s <= 1; s += 2) {
      radome(frames(B, X(84.0), s * 4.4, 14.7, 0), 1.0, 0.5);                           /* the domes abreast the tower */
      radome(frames(B, X(97.0), s * 4.6, 14.7, 0), 0.6, 0.3);
    }
    /* the Mk 41 VLS, flush on the forecastle d 104 - 114 [S2] */
    box(B.sup, X(103.5), X(114.0), -3.0, 3.0, 7.95, 8.55);
    box(B.dark, X(104.0), X(113.5), -2.6, 2.6, 8.55, 8.58);
    /* the lattice main mast d 69.0, 11.0 to 26 [S1][S3] */
    lattice(frames(B, X(69.0), 0, 0, 0), 1.0, 1.0, 0.4, 0.4, 11.0, 25.0, 5, 0.08);
    cyl(B.metal, [X(69.0), 0, 25.0], [X(69.0), 0, 28.5], 0.08, 0.04, 5);
    bar(B.metal, [X(69.0), -2.6, 23.5], [X(69.0), 2.6, 23.5], 0.06);
    /* Harpoon, two quadruple banks between the masts d 74 - 76, trained across [S1][S2] */
    canisters(frames(B, X(74.5), 1.6, 11.0, 30 * DEG), 4, 4.6, 0.75, 0.75, 8, 0.6);
    canisters(frames(B, X(74.5), -1.6, 11.0, -30 * DEG), 4, 4.6, 0.75, 0.75, 8, 0.6);
    /* the funnel d 58.9 - 67.5 to 19.1, black-capped [S1][S2] */
    house(B.sup, X(58.9), X(67.5), 10.95, 18.6, 3.8, 0.06, 0.3, 0.3);
    house(B.dark, X(59.2), X(67.2), 18.55, 19.1, 3.4, 0, 0, 0);
    /* the boats abreast the funnel d 50 - 62 [S1] */
    for (s = -1; s <= 1; s += 2) boat(frames(B, X(55.0), s * 6.0, 11.1, 0), 7.5, 2.6, 1.0);
    /* SMART-L: the tower d 44.5 - 51.2 at 12.6 narrowing to 20.4, the black antenna [S1][S2][S3] */
    prism(B.sup, [[X(44.5), 12.55], [X(51.2), 12.55], [X(50.0), 20.4], [X(45.7), 20.4]], function (z) { return lerp(3.6, 1.8, (z - 12.55) / 7.85); });
    cylZ(B.dark, X(47.8), 0, 20.4, 21.1, 1.6, 16);
    (function () {
      var F = frames(B, X(47.8), 0, 21.1, 35 * DEG);
      obox(F.dark, [0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], -0.7, 0.7, -4.0, 4.0, 0, 3.6);
    })();
    /* RAM: forward on the 01 roof d 108 (before the bridge), aft on the hangar roof d 34.5 [S2][S1] */
    ram(frames(B, X(105.5), 0, 11.0, 0), 8);
    ram(frames(B, X(34.5), 0, 12.6, PI), 8);
    /* rails, the flight-deck pad, the jack staff, team strips */
    H.rails(B, 0.3, 23.3, 0.5, 1.0);
    H.rails(B, 116, 141.5, 0.5, 1.0);
    cyl(B.metal, [X(142.4), 0, 8.4], [X(142.4), 0, 11.0], 0.05, 0.03, 5);
    /* fittings [S1][S2]: rails round the roofs, bitts and fairleads, the anchors in their pockets
       ([S2] x 1230), hatches, vents, rafts, ladders, whips */
    railRect(B, X(23.8), X(47.8), -7.0, 7.0, 12.6, 1.0);
    railRect(B, X(48.2), X(76.3), -7.8, 7.8, 11.0, 1.0);
    railRect(B, X(101.2), X(115.0), -7.4, 7.4, 11.0, 1.0);
    railRect(B, X(77.0), X(92.0), -6.0, 6.0, 14.7, 1.0);
    deckGear(B, H, [2.5, 19.5, 119.0, 131.0]);
    anchors(B, H, 136.0, 3.8);
    hatch(B, X(117.5), 0, 8.0, 1.4, 1.2); hatch(B, X(20.0), 4.8, 5.8, 1.2, 1.0); hatch(B, X(20.0), -4.8, 5.8, 1.2, 1.0);
    for (s = -1; s <= 1; s += 2) {
      vent(B, X(116.5), s * 3.6, 8.0, 0.22, 0.7);
      for (k = 0; k < 4; k++) raftCradle(B, X(38.0 + k * 2.2), s * 6.6, 12.6, "x");
      for (k = 0; k < 3; k++) raftCradle(B, X(83.0 + k * 2.2), s * 7.6, 11.0, "x");
      ladder(B, X(48.5), s * 7.6, 11.0, 12.6, false);
      ladder(B, X(76.8), s * 6.2, 11.0, 14.7, false);
      whip(B, X(47.0), s * 7.2, 12.6, 9.0);
      whip(B, X(100.0), s * 5.8, 14.7, 7.5);
      box(B.dark, X(110.0), X(112.0), s * (H.edge(111) - 0.0), s * (H.edge(111) + 0.05), 9.0, 10.2);    /* doors */
    }
    box(B.team, X(28.0), X(32.0), -2.2, 2.2, 12.6, 12.63);
    box(B.team, X(93.0), X(96.0), -1.6, 1.6, 14.7, 14.73);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, X(123.8), 0, H.zd(123.8), function (F) { oto76(F, 3); }));
    hidePad(THREE, g, X(11.5), 0, 5.8 + 0.14);
    return g;
  }

  /* ============================================================ Z-1 (ex-USS Anthony), Fletcher class [F1]-[F5]
     No Fletcher hull exists in js/hero (grep "Fletcher": none), so it is drawn here.
     [F1] Commons "Zerstoerer 4 D 178 W Kiel 08-1972.jpg" (Z-4, a sister in the same German fit),
          broadside from starboard, bow left, a crane across the bridge: stem head x 112 to stern
          x 1424 = 114.8 m (376 ft 6 in published), 11.43 px/m; d = (1424 - x) / 11.43; waterline
          y 599, z = (599 - y) / 11.43.  The MASTER for stations and heights.
     [F2] "Bundesarchiv B 145 Bild-F013260-0005, Kieler Woche, Zerstoerer Z 6 (D 180).jpg": Z-6 in the
          early 1960s, the forward half: mounts 51 and 52, the OPEN round bridge, the Mk 37 director and
          its dish, the tripod foremast with the bedspring air search antenna.
     [F3] "West German destroyer Z 5 (D 179) underway in the North Sea, in March 1981.jpg": the after
          deckhouse, the twin 3-inch/50 mounts, the stacks with their caps.
     [F4] "West German destroyer Z 2 (D171) at the Charleston Naval Shipyard ... 17 July 1959": from
          above, the forecastle, the round open bridge with its ring of ports, the director.
     [F5] "USS Anthony (DD-515) off Boston on 18 March 1943.jpg": the ship herself, the hull and stacks.
     The 1958 fit (en.wikipedia "Zerstoerer 1-class destroyer"): mount 53 and the forward quintuple
     tubes landed, three twin 3-inch/50 in place of the 40 mm, a tripod foremast; the bridge was still
     open (enclosed later, [F1] shows the later house: the open bridge of [F2][F4] is drawn). */
  var FLEH = {
    L: 114.8, T: 4.0, tz: -0.25, aR: 12, fF: 96, dWL: 112.9, fp: 1.7,
    zd: [[0, 3.0], [20, 3.15], [40, 3.3], [60, 3.6], [80, 4.6], [95, 5.8], [105, 6.6], [114.8, 7.2]],
    hb: [[0, 4.2], [8, 5.2], [20, 5.8], [35, 6.0], [70, 6.0], [86, 5.5], [98, 4.2], [107, 2.4], [112, 0.9], [114.8, 0.06]],
    hw: [[0, 3.4], [8, 4.8], [20, 5.6], [70, 5.7], [86, 5.0], [98, 3.2], [106, 1.5], [112.9, 0.05]],
    camber: 0.1, bk: 0.9, dr: 0.6
  };
  function buildFletcher(THREE, M, C) {
    var T = materials(THREE, C, PAINT_OLD), B = bins(T), g = new THREE.Group(), H = new Hull(FLEH), X = H.X, s, k;
    H.build(B);
    /* the forward deckhouse d 61 - 88 (01 to 6.6 over the deck) and the bridge block d 76 - 86.5 to
       10.6 with the round open bridge to 13.9 [F1][F2][F4] */
    house(B.sup, X(61.0), X(88.0), H.zd(70) - 0.3, 6.6, 4.6, 0.02, 0.4, 0);
    house(B.sup, X(76.0), X(86.5), 6.55, 10.6, 3.8, 0.03, 0.3, 0);
    cylZ(B.sup, X(82.4), 0, 10.55, 13.0, 3.6, 20);
    for (k = 0; k < 14; k++) { var a = -PI * 0.55 + k * PI * 1.1 / 13; cylY(B.glass, X(82.4) + 3.58 * Math.cos(a), 3.58 * Math.sin(a) - 0.04, 3.58 * Math.sin(a) + 0.04, 11.8, 0.22, 8); }
    railRect(B, X(79.0), X(85.6), -3.2, 3.2, 13.0, 0.9);
    /* the Mk 37 director on the bridge, its dish [F2][F4] */
    cylZ(B.sup, X(80.0), 0, 13.0, 14.0, 1.0, 12);
    house(B.sup, X(78.4), X(81.8), 13.95, 15.9, 1.6, 0.05, 0.5, 0.2);
    dish(frames(B, X(80.0), 0, 15.9, 0), 0.9, 0.4);
    /* the tripod foremast at d 72, its platforms, the bedspring air search antenna at the top [F2] */
    cyl(B.metal, [X(72.0), 0, 6.6], [X(72.0), 0, 27.5], 0.22, 0.1, 8);
    for (s = -1; s <= 1; s += 2) bar(B.metal, [X(68.0), s * 2.8, 6.6], [X(71.9), 0, 21.0], 0.12);
    box(B.sup, X(71.0), X(73.6), -1.4, 1.4, 21.0, 21.15);
    bedspring(frames(B, X(72.4), 0, 21.15, 0), 5.0, 2.2, 1.6, 8, 3);
    bar(B.metal, [X(72.0), -3.4, 19.0], [X(72.0), 3.4, 19.0], 0.06);
    navbar(frames(B, X(73.0), 0, 17.8, 0), 1.8, 0.2);
    box(B.sup, X(72.3), X(73.8), -0.5, 0.5, 17.6, 17.8);
    /* the two raked stacks d 59 - 64.2 and 47.2 - 51.1 to 15.3 / 14.8, capped [F1][F3][F5] */
    function stack(d0, d1, top) {
      var R = [], n = 14, j, z, rk = 0.12;
      [6.55, top].forEach(function (z0) {
        var ring = [], xc = X((d0 + d1) / 2) - (z0 - 6.55) * rk;
        for (j = 0; j < n; j++) { var t = j / n * TAU; ring.push([xc + (d1 - d0) / 2 * Math.cos(t), 1.5 * Math.sin(t), z0]); }
        R.push(ring);
      });
      loft(B.sup, R);
      var xt = X((d0 + d1) / 2) - (top - 6.55) * rk;
      ellipsoid(B.dark, [xt, 0, top], (d1 - d0) / 2 - 0.1, 1.35, 0.25, 2, 14, 0, PI / 2);
      for (j = 0; j < 4; j++) cylZ(B.metal, xt - 0.8 + j * 0.55, 0, top, top + 1.0, 0.12, 6);
    }
    stack(59.0, 64.2, 15.3);
    stack(47.2, 51.1, 14.8);
    house(B.sup, X(46.0), X(61.0), H.zd(54) - 0.2, 5.0, 3.0, 0.02, 0, 0);
    /* the after quintuple torpedo tubes on the centreline d 40.5 [F5] (landed later) */
    (function (F) {
      cylZ(F.sup, 0, 0, 0, 0.7, 1.2, 12);
      for (k = 0; k < 5; k++) cylX(F.sup, -3.4, 3.4, (k - 2) * 0.62, 1.1, 0.29, 10);
      box(F.sup, -1.0, 1.0, -1.6, 1.6, 0.6, 1.0);
    })(frames(B, X(40.5), 0, H.zd(40.5), 10 * DEG));
    /* the after deckhouse d 26 - 39 to 6.0, the twin 3-inch/50s: one on its forward end at d 34.5, two
       abreast the after stack on platforms d 46 [F1][F3]; mounts 54 (superfiring, d 23.7) and 55
       (d 17.2) trained astern [F1] */
    house(B.sup, X(16.0), X(39.0), 3.1, 5.4, 4.2, 0.02, 0, 0);
    house(B.sup, X(20.0), X(27.5), 5.35, 6.0, 2.0, 0, 0, 0);
    twin3in50(frames(B, X(34.5), 0, 5.4, 0), 10);
    for (s = -1; s <= 1; s += 2) {
      cylZ(B.sup, X(44.5), s * 3.3, H.zd(44.5), 6.2, 1.5, 14);
      twin3in50(frames(B, X(44.5), s * 3.3, 6.2, s * 20 * DEG), 15);
    }
    mk30(frames(B, X(23.7), 0, 6.0, PI));
    mk30(frames(B, X(13.0), 0, H.zd(13) + 0.6, PI));
    cylZ(B.sup, X(13.0), 0, H.zd(13), H.zd(13) + 0.6, 1.8, 16);
    /* the depth-charge racks at the stern, two rails [F1][F5] */
    for (s = -1; s <= 1; s += 2) { box(B.metal, X(0.2), X(6.0), s * 1.6 - 0.35, s * 1.6 + 0.35, 3.0, 3.3); for (k = 0; k < 5; k++) cylY(B.dark, X(0.8 + k * 1.1), s * 1.6 - 0.3, s * 1.6 + 0.3, 3.6, 0.28, 8); }
    /* mount 52 on its barbette d 84.8 (crown 11.3, [F1]) */
    cylZ(B.sup, X(84.8), 0, H.zd(84.8), 8.6, 2.2, 16);
    mk30(frames(B, X(84.8), 0, 8.6, 0));
    /* fittings: rails, bitts, anchors, scuttles, hatches, vents, the boats, rafts, whips */
    H.rails(B, 0.3, 61.0, 0.1, 1.0);
    H.rails(B, 88.5, 113.5, 0.1, 1.0);
    railRect(B, X(61.2), X(76.0), -4.4, 4.4, 6.6, 1.0);
    deckGear(B, H, [2.5, 30.0, 58.0, 98.0, 104.0]);
    anchors(B, H, 108.5, 2.3);
    scuttles(B, H, 66, 104, 2.4, 2.4, 0.18);
    scuttles(B, H, 4, 30, 1.6, 3.2, 0.18);
    hatch(B, X(101.0), 0, H.zd(101), 1.2, 1.0); hatch(B, X(8.0), 0, H.zd(8), 1.2, 1.2);
    for (s = -1; s <= 1; s += 2) {
      davits(B, X(56.0), s * 4.5, 6.0, 7.5, s);
      for (k = 0; k < 2; k++) raftCradle(B, X(29.0 + k * 2.2), s * 3.4, 5.4, "x");
      vent(B, X(90.5), s * 2.4, H.zd(90.5), 0.25, 0.8);
      vent(B, X(42.0), s * 4.6, H.zd(42), 0.25, 0.8);
      ladder(B, X(61.4), s * 4.2, H.zd(61), 6.6, false);
      whip(B, X(75.0), s * 3.6, 10.6, 8.0);
    }
    cyl(B.metal, [X(114.3), 0, 7.2], [X(114.3), 0, 9.6], 0.04, 0.02, 5);
    cyl(B.metal, [X(0.4), 0, 3.0], [X(0.4), 0, 6.4], 0.04, 0.02, 5);
    box(B.team, X(63.0), X(66.0), -1.6, 1.6, 6.6, 6.63);
    box(B.team, X(28.0), X(30.5), -1.2, 1.2, 6.0, 6.03);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, X(92.9), 0, H.zd(92.9), function (F) { mk30(F); }));
    return g;
  }

  /* ============================================================ Frankenthal-class (Type 332) [M1]
     [M1] Commons "Homburg (M1069).jpg", broadside from starboard, bow right: transom x 152 to stem
     head x 1490 = 54.4 m, 24.6 px/m; d = (x - 152) / 24.6; waterline y 668. */
  var PAINT_MCM = { hull: 0x8a9296, sup: 0x939b9f, deck: 0x5d605f, boot: 0x1f2224, light: 0xa9b0b3 };
  var FRAH = {
    L: 54.4, T: 2.4, tz: -0.6, aR: 7, fF: 42, dWL: 53.0, fp: 1.5,
    zd: [[0, 2.1], [21.9, 2.1], [22.5, 4.1], [45, 4.15], [54.4, 4.45]],
    hb: [[0, 4.1], [6, 4.5], [14, 4.6], [36, 4.6], [44, 4.1], [49, 3.0], [52.5, 1.5], [54.4, 0.1]],
    hw: [[0, 3.6], [6, 4.2], [14, 4.4], [34, 4.4], [42, 3.7], [48, 2.2], [51.5, 0.7], [53, 0.05]],
    camber: 0.08, bk: 0.95
  };
  function buildFrankenthal(THREE, M, C) {
    var T = materials(THREE, C, PAINT_MCM), B = bins(T), g = new THREE.Group(), H = new Hull(FRAH), X = H.X, s, k;
    H.build(B);
    /* the black-painted after hull below the sweep deck [M1]: a band over the boot */
    /* the after deckhouse d 2.2 - 16.8 to 6.2, its roof the boat and crane deck [M1] */
    house(B.sup, X(2.2), X(16.8), 2.05, 6.2, 3.4, 0, 0, 0);
    for (k = 0; k < 4; k++) for (s = -1; s <= 1; s += 2) box(B.dark, X(3.5 + k * 3.2), X(5.0 + k * 3.2), s * 3.4 - 0.04, s * 3.4 + 0.04, 3.0, 5.2);
    boat(frames(B, X(5.5), 1.2, 6.2, 0), 5.5, 2.2, 0.8);                                   /* the RHIB [M1] */
    /* the crane at d 9.5 - 14, its jib raised aft [M1] */
    cylZ(B.sup, X(13.6), -1.5, 6.2, 7.2, 0.4, 10);
    bar(B.sup, [X(13.6), -1.5, 7.0], [X(9.0), -1.5, 11.3], 0.22);
    /* the main superstructure: 01 d 16.8 - 36.1 to 8.7 (lower aft step d 16.8 - 22.3 to 6.6), the 02
       d 20.6 - 29.1 to 9.7 and the bridge d 29.1 - 36.0 to 9.9 [M1] */
    house(B.sup, X(16.8), X(22.6), 2.05, 6.6, 3.6, 0, 0, 0);
    house(B.sup, X(22.3), X(36.1), 4.05, 8.7, 4.0, 0.03, 0, 0);
    house(B.sup, X(20.6), X(29.1), 8.65, 9.7, 3.5, 0, 0, 0);
    house(B.sup, X(29.0), X(36.0), 8.65, 9.9, 3.9, 0, 0, 0);
    for (k = -3; k <= 3; k++) win(B.glass, X(36.0), k * 1.0, 9.15, 0.8, 0.8);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 4; k++) box(B.glass, X(30.0 + k * 1.4), X(31.0 + k * 1.4), s * 3.9 - 0.05, s * 3.9 + 0.05, 8.8, 9.6);
      for (k = 0; k < 8; k++) cylY(B.dark, X(23.0 + k * 3.2), s * (H.edge(23.0 + k * 3.2) - 0.02), s * (H.edge(23.0 + k * 3.2) + 0.05), 2.8, 0.18, 8);   /* scuttles [M1] */
      for (k = 0; k < 2; k++) raft(B, X(23.8 + k * 2.6), s * 4.05, 6.9, "x");
    }
    /* the tripod mast at d 18.2 to 20.4, its legs raked forward to the 02 roof [M1] */
    cyl(B.metal, [X(18.2), 0, 6.6], [X(18.2), 0, 20.4], 0.16, 0.07, 8);
    for (s = -1; s <= 1; s += 2) bar(B.metal, [X(21.4), s * 1.6, 9.7], [X(18.3), 0, 16.0], 0.07);
    bar(B.metal, [X(18.2), -1.8, 17.0], [X(18.2), 1.8, 17.0], 0.05);
    radome(frames(B, X(18.2), 0, 20.4, 0), 0.32, 0.1);
    /* navigation radar and the whip over the bridge [M1] */
    navbar(frames(B, X(32.6), 0, 9.9, 0), 2.4, 1.6);
    cyl(B.metal, [X(35.0), 0, 9.9], [X(35.4), 0, 18.6], 0.05, 0.02, 5);
    /* the 40 mm on the forecastle at d 40.8 (baked: the row is not turret:true) [M1] */
    bofors40open(frames(B, X(40.8), 0, H.zd(40.8), 0), 6);
    H.rails(B, 0.3, 21.6, 0.08, 1.0);
    H.rails(B, 36.5, 53.6, 0.08, 1.0);
    cyl(B.metal, [X(53.9), 0, 4.45], [X(53.9), 0, 7.0], 0.04, 0.02, 5);
    /* fittings [M1]: rails round the roofs, bitts, the anchor and hawse (x 1285, y 610), hatches,
       vents, rafts, ladders, the sweep-deck gear aft */
    railRect(B, X(2.4), X(16.6), -3.3, 3.3, 6.2, 1.0);
    railRect(B, X(20.8), X(35.8), -3.4, 3.4, 9.7, 1.0);
    deckGear(B, H, [1.2, 19.5, 44.5]);
    anchors(B, H, 46.0, 1.6);
    scuttles(B, H, 23.0, 45.0, 3.0, 2.4, 0.17);
    hatch(B, X(47.5), 0, H.zd(47.5), 1.0, 0.9); hatch(B, X(1.5), 0, 2.1, 1.2, 1.2);
    for (s = -1; s <= 1; s += 2) {
      vent(B, X(37.2), s * 2.2, 4.15, 0.16, 0.6);
      ladder(B, X(16.4), s * 2.9, 2.1, 6.2, true);
      ladder(B, X(21.0), s * 3.6, 4.1, 8.7, false);
      whip(B, X(34.5), s * 3.6, 9.9, 6.5);
      cylX(B.metal, X(0.4), X(1.6), s * 2.6, 2.8, 0.45, 12);                              /* cable reels aft [M1] */
    }
    box(B.team, X(23.0), X(26.0), -1.2, 1.2, 9.7, 9.73);
    box(B.team, X(8.5), X(11.5), 0.6, 2.6, 6.2, 6.23);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ Type 143 Albatros / Type 143A Gepard [G1][G2]
     [G1] Commons "Typenblatt Gepard.jpg", the Bundeswehr type sheet of the 143A: side and plan views to
     a common scale with a 57.60 m bar (x 88 - 1258 = 20.31 px/m) and a 7.80 m beam bar; d = (x - 88) /
     20.31; waterline y 601 (the grey / black boot-top line), z = (601 - y) / 20.31.  [G2] Commons
     "Schnellboote Albatros-Klasse.jpg", Type 143 boats alongside, P6113 broadside from starboard: the
     after 76 mm and the lattice masts of the 143.  The 143 and 143A share the hull (57.6 / 57.8 m
     published, beam 7.8): VARIANT "143" has the after OTO 76 at d 6.5 trained astern and the lattice
     mast [G2]; VARIANT "143A" the RAM Mk 49 there and the pole mast with its strut [G1]. */
  var GEPH = {
    L: 57.6, T: 1.9, tz: -0.95, aR: 4, fF: 48.3, dWL: 55.0, fp: 1.5,
    zd: [[0, 2.2], [20, 2.3], [30, 2.46], [43, 3.0], [50, 3.25], [57.6, 3.7]],
    hb: [[0, 3.7], [6, 3.9], [36, 3.9], [43, 3.57], [48, 2.88], [53, 1.75], [55.8, 0.8], [57.6, 0.06]],
    hw: [[0, 3.3], [6, 3.7], [36, 3.7], [43, 3.2], [48, 2.3], [52, 1.1], [55, 0.05]],
    camber: 0.08, bk: 0.88, dr: 0.45, bt: 0.55
  };
  function buildGepard(THREE, M, C, V) {
    var T = materials(THREE, C, PAINT_FAC), B = bins(T), g = new THREE.Group(), H = new Hull(GEPH), X = H.X, s, k, is143 = V === "143";
    H.build(B);
    /* the 01 house d 19.4 - 36.0 to 4.9 (its after step d 19.4 - 21.5 to 3.6) [G1] */
    house(B.sup, X(19.4), X(21.6), H.zd(20) - 0.05, 3.6, 2.6, 0, 0, 0);
    house(B.sup, X(21.5), X(36.2), H.zd(28) - 0.05, 4.9, 2.95, 0.02, 0, 0);
    /* the bridge block d 36.0 - 40.8 to 6.9 [G1], its windows; the box d 30.5 - 32.6 to 6.5 */
    house(B.sup, X(36.0), X(40.8), H.zd(38) - 0.05, 6.9, 3.25, 0.02, 0.15, 0);
    for (k = -3; k <= 3; k++) win(B.glass, X(40.65), k * 0.85, 6.2, 0.6, 0.55);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 2; k++) box(B.glass, X(38.2 + k * 1.2), X(39.0 + k * 1.2), s * 3.2 - 0.05, s * 3.2 + 0.05, 5.95, 6.5);
    house(B.sup, X(30.5), X(32.6), 4.85, 6.5, 1.2, 0, 0, 0);
    railRect(B, X(21.8), X(35.8), -2.8, 2.8, 4.9, 1.0);
    railRect(B, X(36.2), X(40.5), -3.0, 3.0, 6.9, 0.9);
    /* the WM27 radome on its four-leg tower d 32.8 - 36.4: platform 8.5, sphere r 1.06 at 10.0 [G1] */
    lattice(frames(B, X(34.6), 0, 0, 0), 1.3, 1.1, 0.8, 0.8, 4.9, 8.5, 2, 0.07);
    box(B.sup, X(33.0), X(36.2), -1.3, 1.3, 8.45, 8.6);
    railRect(B, X(33.0), X(36.2), -1.3, 1.3, 8.6, 0.7);
    cylZ(B.sup, X(34.3), 0, 8.6, 9.0, 0.45, 10);
    ellipsoid(B.light, [X(34.3), 0, 10.0], 1.06, 1.06, 1.06, 7, 16, -PI / 2 * 0.85, PI / 2);
    if (is143) {
      /* the 143's lattice mast at d 23.7 [G2] (its exact form NOT CONFIRMED) */
      lattice(frames(B, X(23.7), 0, 0, 0), 0.9, 0.9, 0.3, 0.3, 4.9, 14.8, 5, 0.06);
    } else {
      /* the 143A pole mast at d 23.7 to 15.9, its strut from the deck at d 21.7 [G1] */
      cyl(B.metal, [X(23.7), 0, 4.9], [X(23.7), 0, 15.9], 0.13, 0.07, 8);
      bar(B.metal, [X(21.7), 0, 2.5], [X(23.6), 0, 10.8], 0.08);
    }
    [14.8, 12.9, 12.0].forEach(function (z, i) { bar(B.metal, [X(23.7), -1.5 + i * 0.3, z], [X(23.7), 1.5 - i * 0.3, z], 0.04); });
    radome(frames(B, X(23.7), 0, 15.9, 0), 0.33, 0.1);
    navbar(frames(B, X(24.7), 0, 8.5, 0), 1.8, 0.1);
    box(B.metal, X(24.0), X(25.4), -0.3, 0.3, 8.3, 8.5);
    /* the four MM38 containers in two pairs, trained across each other [G1]: the after pair d 8.4 -
       13.3 to starboard, the forward pair d 14.3 - 19.4 to port; the blast screen d 8.6 - 10.4 */
    canisters(frames(B, X(11.0), 0, H.zd(11), -40 * DEG), 2, 5.8, 1.0, 0.95, 8, 0.4);
    canisters(frames(B, X(16.9), 0, H.zd(17), 40 * DEG), 2, 5.8, 1.0, 0.95, 8, 0.4);
    box(B.dark, X(8.0), X(8.4), -2.2, 2.2, H.zd(8), 4.6);
    /* aft: the 143's second 76 mm trained astern [G2], or the 143A's RAM [G1] (d 6.5) */
    if (is143) oto76(frames(B, X(5.0), 0, H.zd(5), PI), 3);
    else ram(frames(B, X(6.5), 0, H.zd(6.5), PI), 8);
    /* fittings: rails, bitts, anchor (hawse at d 55, [G1]), hatches, vents, rafts, staffs, whips */
    H.rails(B, 0.2, 19.2, 0.08, 1.0);
    H.rails(B, 40.9, 56.6, 0.08, 1.0);
    deckGear(B, H, [1.0, 49.5]);
    anchors(B, H, 54.0, 1.4);
    hatch(B, X(51.5), 0, H.zd(51.5), 0.9, 0.8); hatch(B, X(2.5), 2.2, H.zd(2.5), 0.9, 0.9);
    for (s = -1; s <= 1; s += 2) {
      raftCradle(B, X(26.5), s * 3.55, H.zd(26.5), "x"); raftCradle(B, X(29.0), s * 3.55, H.zd(29), "x");   /* [G1] plan */
      vent(B, X(41.5), s * 2.4, H.zd(41.5), 0.15, 0.5);
      ladder(B, X(36.4), s * 3.0, 4.9, 6.9, false);
      whip(B, X(30.2), s * 2.6, 4.9, 9.5);
    }
    cyl(B.metal, [X(0.3), 0, 2.2], [X(0.3), 0, 4.2], 0.035, 0.02, 5);
    cyl(B.metal, [X(57.0), 0, 3.6], [X(57.0), 0, 5.2], 0.035, 0.02, 5);
    box(B.team, X(26.0), X(29.0), -0.9, 0.9, 4.9, 4.93);
    /* the forward OTO 76 at d 45.2 [G1], baked (the rows are not turret:true) */
    oto76(frames(B, X(45.2), 0, H.zd(45.2), 0), 3);
    flush(THREE, g, B);
    return g;
  }

  /* ============================================================ Type 140 Jaguar / Type 142 Zobel [J1][J2]
     [J1] Commons "Jaguar - Dommel.jpg": a Jaguar-class boat at speed from starboard, bow right, a
     shallow 3/4 (about 29.6 px/m at the hull's mid-length; d = (x - 110) / 29.6, perspective NOT
     corrected).  [J2] "Scale-Model-P-6093 in Wehrtechnische Studiensammlung Koblenz.jpg", the builder's
     style model of the Zobel-class S 43 Wiesel (P6093) from port, bow left: 1380 px stem to transom =
     42.6 m, 32.4 px/m, d = (1445 - x) / 32.4 (the case glass and the camera angle make heights rough).
     The two classes share the hull (both 42.6 x 7.1 m published): VARIANT jaguar draws the four
     forward-firing 533 mm tubes in the deck-edge positions [J1]; VARIANT zobel draws the large radome
     of the M20 fire-control set over the bridge and the two wire-guiding tubes trained aft on the
     quarterdeck [J2]. */
  var PAINT_FAC = { hull: 0x9aa0a3, sup: 0xa2a8ab, deck: 0x6c6a62, boot: 0x6a2a24, light: 0xb2b7b9 };
  var JAGH = {
    L: 42.6, T: 1.45, tz: -0.55, aR: 6, fF: 30, dWL: 40.8, fp: 1.4,
    zd: [[0, 1.85], [14, 1.95], [28, 2.2], [36, 2.55], [42.6, 3.0]],
    hb: [[0, 3.0], [5, 3.4], [12, 3.55], [26, 3.55], [32, 3.25], [37, 2.4], [40.5, 1.2], [42.6, 0.08]],
    hw: [[0, 2.6], [5, 3.1], [12, 3.3], [24, 3.3], [30, 2.9], [35, 2.0], [38.5, 1.0], [40.8, 0.05]],
    camber: 0.08, bk: 0.9, dr: 0.45, bt: 0.3
  };
  function buildSchnellboot(THREE, M, C, V) {
    var T = materials(THREE, C, PAINT_FAC), B = bins(T), g = new THREE.Group(), H = new Hull(JAGH), X = H.X, s, k;
    H.build(B);
    /* the low after casing d 0.3 - 19.9, 1.3 m, its windows [J1][J2] */
    house(B.sup, X(0.4), X(19.9), H.zd(5) - 0.05, 3.3, 2.5, 0.05, 0, 0.3);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 6; k++) box(B.dark, X(1.3 + k * 2.4), X(2.0 + k * 2.4), s * 2.47 - 0.04, s * 2.47 + 0.03, 2.5, 2.95);
    /* the bridge house d 19.6 - 30.0 to 4.6, the open bridge screen and its rail to 5.4 [J1][J2] */
    house(B.sup, X(19.6), X(30.0), H.zd(25) - 0.05, 4.6, 2.85, 0.05, 0.6, 0);
    house(B.sup, X(24.0), X(29.6), 4.55, 5.3, 2.3, 0.05, 0.3, 0);
    for (k = -2; k <= 2; k++) win(B.glass, X(29.55) - 0.25, k * 0.8, 5.0, 0.55, 0.35);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 4; k++) cylY(B.glass, X(21.0 + k * 1.8), s * 2.72, s * 2.82, 3.8, 0.2, 8);   /* ports [J1] */
    railRect(B, X(20.0), X(24.0), -2.5, 2.5, 4.6, 0.9);
    /* the mast at d 21.8: pole with a yard, the radar platform [J1][J2] */
    cyl(B.metal, [X(21.8), 0, 4.6], [X(21.8), 0, 13.6], 0.12, 0.05, 6);
    bar(B.metal, [X(21.8), -2.6, 10.6], [X(21.8), 2.6, 10.6], 0.05);
    box(B.sup, X(21.0), X(23.4), -0.9, 0.9, 9.1, 9.25);
    navbar(frames(B, X(22.3), 0, 9.25, 0), 2.2, 0.4);
    for (s = -1; s <= 1; s += 2) bar(B.metal, [X(19.9), s * 2.2, 3.3], [X(21.8), 0, 10.0], 0.03);
    if (V === "zobel") {
      /* the M20 radome over the bridge on a platform [J2] */
      box(B.sup, X(24.2), X(27.0), -1.2, 1.2, 5.3, 6.3);
      ellipsoid(B.light, [X(25.6), 0, 7.45], 1.3, 1.3, 1.3, 7, 16, -PI / 2 * 0.8, PI / 2);
      /* the two wire-guided tubes on the quarterdeck, trained aft [J2] */
      for (s = -1; s <= 1; s += 2) tube(frames(B, X(5.2), s * 1.35, 3.3, PI - s * 4 * DEG), 7.4, 0.38, 0.35);
    } else {
      /* the four tubes at the deck edges, trained ahead and slightly outboard [J1] */
      for (s = -1; s <= 1; s += 2) {
        tube(frames(B, X(5.3), s * 2.95, H.zd(5.3), s * 4 * DEG), 7.0, 0.38, 0.3);
        tube(frames(B, X(18.5), s * 3.0, H.zd(18.5), s * 4 * DEG), 7.0, 0.38, 0.3);
      }
    }
    /* fittings: rails, bitts, anchor, hatches, vents, rafts, jack and ensign staffs, whips */
    H.rails(B, 0.2, 19.6, 0.08, 0.9);
    H.rails(B, 30.2, 41.8, 0.08, 0.9);
    deckGear(B, H, [0.9, 34.5]);
    anchors(B, H, 39.4, 1.2);
    hatch(B, X(37.0), 0, H.zd(37), 0.9, 0.8); hatch(B, X(31.0), 1.5, H.zd(31), 0.8, 0.8);
    for (s = -1; s <= 1; s += 2) { vent(B, X(30.6), s * 2.2, H.zd(30.6), 0.15, 0.5); raftCradle(B, X(16.5), s * 1.6, 3.3, "x"); whip(B, X(19.9), s * 2.4, 3.3, 6.0); }
    cyl(B.metal, [X(0.3), 0, 3.3], [X(0.3), 0, 5.6], 0.035, 0.02, 5);
    cyl(B.metal, [X(42.2), 0, 3.0], [X(42.2), 0, 4.6], 0.035, 0.02, 5);
    box(B.team, X(1.5), X(3.5), -1.0, 1.0, 3.3, 3.33);
    /* the after 40 mm, trained astern, baked; the forward one is the "turret" (turret:true) [J1][J2] */
    bofors40open(frames(B, X(12.2), 0, 3.3, PI), 12);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, X(33.4), 0, H.zd(33.4), function (F) { bofors40open(F, 10); }));
    return g;
  }

  /* ============================================================ K130 Braunschweig [K1][K2]
     [K1] broadside from port, bow left: 1330 px stem head (x 38) to transom (x 1368) = 89.12 m,
     14.92 px/m; d = (1368 - x) / 14.92; heights against the waterline (y 688 at the bow, 697 aft). */
  var PAINT_K130 = { hull: 0x8e969a, sup: 0x969ea2, deck: 0x5d605f, boot: 0x2c2f31, light: 0xa9b0b3 };
  var K130H = {
    L: 89.12, T: 3.2, tz: -0.9, aR: 12, fF: 66, dWL: 86.0, fp: 1.6,
    zd: [[0, 6.5], [60, 6.5], [80, 6.6], [89.12, 6.75]],
    hb: [[0, 5.9], [10, 6.45], [24, 6.64], [58, 6.64], [68, 6.3], [76, 5.3], [82, 3.9], [86, 2.3], [88, 0.9], [89.12, 0.1]],
    hw: [[0, 5.1], [10, 5.9], [24, 6.2], [55, 6.2], [65, 5.6], [74, 4.1], [80, 2.4], [84, 0.9], [86, 0.05]],
    kn: [[0, 4.3], [60, 4.4], [89.12, 4.7]], tb: [[0, 0.35], [89.12, 0.35]], camber: 0.12
  };
  function buildK130(THREE, M, C) {
    var T = materials(THREE, C, PAINT_K130), B = bins(T), g = new THREE.Group(), H = new Hull(K130H), X = H.X, s, k;
    H.build(B);
    var zD = 6.5;
    /* 01 block, flush with the tumbled hull side, d 39.4 - 75.9, roof 9.85 [K1] */
    house(B.hull, X(39.4), X(75.9), zD - 0.05, 9.85, 6.25, 0.12, 0.35, 0);
    /* hangar d 25.0 - 39.4, roof 12.9, the door aft [K1][K2] */
    house(B.sup, X(25.0), X(39.6), zD - 0.05, 12.9, 6.0, 0.12, 0, 0);
    box(B.dark, X(25.0) - 0.05, X(25.0) + 0.02, -3.6, 3.6, zD, 11.6);
    /* the forward superstructure: 02 d 59 - 75.6 to 13.3 (raked front), 03 d 54 - 72 to 14.6 */
    house(B.sup, X(57.0), X(75.6), 9.8, 13.3, 5.2, 0.14, 0.7, 0);
    house(B.sup, X(52.0), X(72.5), 13.25, 14.6, 4.4, 0.12, 0.6, 0);
    for (k = -4; k <= 4; k++) win(B.glass, X(75.6) - 0.4, k * 0.95, 12.1, 0.8, 0.55);
    for (s = -1; s <= 1; s += 2) for (k = 0; k < 4; k++) box(B.glass, X(70.2 + k * 1.1), X(71.0 + k * 1.1), s * 4.75 - 0.05, s * 4.75 + 0.05, 12.1, 12.7);
    /* the main mast, a shaped pyramid d 51.8 - 66.6 at 14.6 narrowing to d 56.7 - 62.3 at 25.0, a
       band at 19 - 20, the flared head to 29.0 and the TRS-3D/4D on top [K1][K2] */
    prism(B.sup, [[X(51.8), 14.55], [X(66.6), 14.55], [X(62.3), 25.0], [X(56.7), 25.0]], function (z) { return lerp(3.7, 1.6, (z - 14.55) / 10.45); });
    prism(B.sup, [[X(56.9), 24.95], [X(62.1), 24.95], [X(62.6), 28.9], [X(56.5), 28.9]], function (z) { return lerp(1.5, 1.9, (z - 24.95) / 4); });
    planar(frames(B, X(59.5), 0, 28.9, 0), 2.6, 1.5, 0.35, 0.7, 20);
    cyl(B.metal, [X(58.0), 0, 28.9], [X(58.0), 0, 33.8], 0.06, 0.03, 5);
    bar(B.metal, [X(60.0), -4.5, 25.0], [X(60.0), 4.5, 25.0], 0.07);                     /* yard [K1][K2] */
    for (s = -1; s <= 1; s += 2) {
      radome(frames(B, X(64.9), s * 3.1, 18.9, 0), 0.6, 0.2);                           /* sponson domes */
      radome(frames(B, X(52.9), s * 2.9, 18.0, 0), 0.75, 0.2);
      radome(frames(B, X(53.8), s * 2.0, 21.9, 0), 0.6, 0.2);
      box(B.sup, X(51.5), X(54.6), s * 1.8, s * 3.6, 17.85, 18.0);
    }
    /* the after mast: d 40.8 - 48.5 at 12.9 to d 41.5 - 45.5 at 23.8, the dome on top [K1] */
    house(B.sup, X(40.5), X(52.0), 9.8, 12.95, 4.2, 0.12, 0, 0);
    prism(B.sup, [[X(40.8), 12.9], [X(48.5), 12.9], [X(45.5), 23.8], [X(41.5), 23.8]], function (z) { return lerp(2.6, 1.2, (z - 12.9) / 10.9); });
    radome(frames(B, X(43.3), 0, 23.8, 0), 0.85, 0.9);
    bar(B.metal, [X(44.0), -4.0, 23.2], [X(44.0), 4.0, 23.2], 0.06);
    /* the boats in recesses abreast d 49 - 54 [K1][K2] */
    for (s = -1; s <= 1; s += 2) {
      box(B.dark, X(48.6), X(54.9), s * 4.6, s * 6.0, 9.9, 12.4);
      boat(frames(B, X(51.7), s * 5.3, 10.6, 0), 5.8, 2.3, 0.9);
      box(B.sup, X(48.6), X(54.9), s * 4.0, s * 5.9, 12.4, 12.65);
    }
    /* RAM: forward on the 03 deck front d 72.8, aft on the hangar roof d 34.4 [K1][K2] */
    ram(frames(B, X(70.4), 0, 14.6, 0), 8);
    ram(frames(B, X(34.4), 0, 12.9, PI), 8);
    /* the flight deck: rails, the pad marker, a team strip on the hangar roof */
    H.rails(B, 0.3, 24.8, 0.4, 1.0);
    H.rails(B, 76.6, 88.3, 0.4, 1.0);
    cyl(B.metal, [X(88.6), 0, 6.75], [X(88.6), 0, 9.2], 0.05, 0.03, 5);                   /* jack staff */
    /* fittings [K1][K2]: rails round the roofs, bitts and fairleads, the anchors in their pockets
       (x 90, y 640 in [K1]), hatches, vents, rafts, ladders, whips */
    railRect(B, X(25.3), X(39.2), -5.2, 5.2, 12.9, 1.0);
    railRect(B, X(39.6), X(56.8), -5.6, 5.6, 9.85, 1.0);
    railRect(B, X(52.3), X(70.0), -4.0, 4.0, 14.6, 1.0);
    deckGear(B, H, [2.5, 21.5, 80.5]);
    anchors(B, H, 85.6, 3.3);
    hatch(B, X(83.0), 0, H.zd(83), 1.2, 1.0); hatch(B, X(18.0), 3.6, 6.5, 1.0, 0.8); hatch(B, X(18.0), -3.6, 6.5, 1.0, 0.8);
    for (s = -1; s <= 1; s += 2) {
      vent(B, X(76.8), s * 2.6, 6.6, 0.2, 0.6);
      for (k = 0; k < 3; k++) raftCradle(B, X(41.5 + k * 2.0), s * 4.8, 9.85, "x");
      for (k = 0; k < 2; k++) raftCradle(B, X(27.0 + k * 2.2), s * 4.6, 12.9, "x");
      ladder(B, X(39.8), s * 5.4, 9.85, 12.9, false);
      ladder(B, X(57.2), s * 4.6, 9.85, 13.3, false);
      whip(B, X(38.6), s * 5.2, 12.9, 7.5);
      whip(B, X(71.5), s * 4.2, 14.6, 6.0);
    }
    box(B.team, X(28.0), X(31.0), -1.8, 1.8, 12.9, 12.93);
    box(B.team, X(62.0), X(65.0), -1.2, 1.2, 14.6, 14.63);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, X(78.6), 0, H.zd(78.6), function (F) { oto76(F, 3); }));
    hidePad(THREE, g, X(12.5), 0, zD + 0.12);
    return g;
  }

  /* ============================================================ Type 120 Koeln [C1]
     [C1] Commons "German figate Koeln (F220) underway 1982.JPEG" (file name spelled with the umlaut),
     from starboard ahead and a little above, bow left: stem head x 228 to the stern x 1365 = 109.8 m,
     10.36 px/m along the hull; d = (1365 - x) / 10.36.  The camera is above the ship, so heights are
     read against a waterline traced from y 662 at the stem to 712 at the stern and divided by 9.74 px/m
     (the vertical scale foreshortened by about 0.94 for the elevation, estimated from the 100 mm
     gunhouse); every height is NOT CONFIRMED to about 10 per cent. */
  var KOLNH = {
    L: 109.8, T: 3.6, tz: -0.4, aR: 12, fF: 88, dWL: 106.6, fp: 1.7,
    zd: [[0, 1.8], [12, 1.9], [40, 2.5], [64, 2.8], [64.6, 4.0], [100, 4.1], [109.8, 4.4]],
    hb: [[0, 3.9], [8, 4.8], [20, 5.4], [36, 5.5], [62, 5.5], [78, 5.2], [92, 4.2], [101, 2.8], [106, 1.4], [109.8, 0.08]],
    hw: [[0, 3.0], [8, 4.3], [20, 5.1], [60, 5.2], [78, 4.6], [92, 3.0], [101, 1.3], [106.6, 0.05]],
    camber: 0.1, bk: 0.92, dr: 0.6
  };
  var PAINT_OLD = { hull: 0x8f969a, sup: 0x99a0a4, deck: 0x5f625f, boot: 0x2a2c2e, light: 0xb0b5b8 };
  function buildKoln(THREE, M, C) {
    var T = materials(THREE, C, PAINT_OLD), B = bins(T), g = new THREE.Group(), H = new Hull(KOLNH), X = H.X, s, k;
    H.build(B);
    /* the forward superstructure d 64.2 - 88.8: 01 to 7.4, the bridge d 73.8 - 84.5 to 11.9 [C1] */
    house(B.sup, X(64.2), X(88.8), 3.95, 7.4, 4.4, 0.03, 0.5, 0);
    house(B.sup, X(73.8), X(84.5), 7.35, 9.9, 3.6, 0.03, 0.4, 0);
    house(B.sup, X(76.0), X(83.6), 9.85, 11.9, 3.0, 0.03, 0.5, 0);
    for (k = -3; k <= 3; k++) win(B.glass, X(83.6) - 0.6, k * 0.8, 11.2, 0.6, 0.6);
    for (k = -4; k <= 4; k++) win(B.glass, X(84.5) - 0.45, k * 0.8, 9.2, 0.6, 0.5);
    railRect(B, X(76.0), X(83.0), -3.0, 3.0, 11.9, 1.0);
    /* the lattice foremast d 64.2 - 73.8 at its foot, platform 19.5, the DA-02 search set at 23 - 26,
       the topmast to 33.6 [C1] */
    lattice(frames(B, X(69.0), 0, 0, 0), 2.6, 2.2, 0.9, 0.9, 7.4, 19.5, 6, 0.09);
    box(B.sup, X(67.6), X(70.6), -1.6, 1.6, 19.45, 19.6);
    railRect(B, X(67.6), X(70.6), -1.6, 1.6, 19.6, 0.8);
    bedspring(frames(B, X(69.0), 0, 19.6, 0), 4.2, 2.4, 3.4, 8, 3);
    cyl(B.metal, [X(68.2), 0, 19.6], [X(68.2), 0, 33.6], 0.1, 0.04, 6);
    bar(B.metal, [X(68.2), -3.0, 27.0], [X(68.2), 3.0, 27.0], 0.05);
    /* the funnel d 53.6 - 64.2, broad, raked aft, black-capped, to 16.4 [C1] */
    house(B.sup, X(52.6), X(64.4), 2.75, 5.6, 3.2, 0.02, 0, 0);
    house(B.sup, X(54.6), X(62.4), 5.55, 15.9, 2.9, 0.06, 1.2, 1.0);
    house(B.dark, X(55.7), X(61.3), 15.85, 16.4, 2.2, 0, 0.1, 0.1);
    /* the boats in davits abreast the funnel d 52.6 - 64 [C1], the after deckhouse d 11.1 - 52.6 (01
       to 5.6, 02 d 26 - 50 to 8.1), its pole mast at d 27 [C1] */
    for (s = -1; s <= 1; s += 2) davits(B, X(58.0), s * 4.1, H.zd(58) + 0.3, 7.5, s);
    house(B.sup, X(11.1), X(53.0), H.zd(30) - 0.6, 5.6, 4.6, 0.03, 0, 0);
    house(B.sup, X(26.0), X(50.0), 5.55, 8.1, 3.4, 0.03, 0, 0);
    cyl(B.metal, [X(27.0), 0, 8.1], [X(27.0), 0, 20.0], 0.09, 0.04, 6);
    railRect(B, X(26.3), X(49.7), -3.3, 3.3, 8.1, 1.0);
    /* the twin 40 mm Bredas: B position on the forward house front d 88 and on the after house d 44,
       trained aft [C1] (baked: only the forward 100 mm trains) */
    breda40(frames(B, X(87.0), 0, 7.4, 0));
    breda40(frames(B, X(44.4), 0, 8.1, PI));
    /* the two quadruple 375 mm Bofors ASW rocket launchers on the forecastle behind the gun d 90.5 */
    for (s = -1; s <= 1; s += 2) (function (F) {
      cylZ(F.sup, 0, 0, 0, 0.8, 0.8, 12);
      for (k = 0; k < 4; k++) cyl(F.metal, [-0.8, (k % 2 - 0.5) * 0.5, 1.2 + (k >> 1) * 0.5], [1.6, (k % 2 - 0.5) * 0.5, 1.9 + (k >> 1) * 0.5], 0.21, 0.21, 10);
    })(frames(B, X(91.0), s * 2.0, H.zd(91), 0));
    /* the 533 mm tubes on the waist d 48 [C1], the after 100 mm on the house end trained astern */
    for (s = -1; s <= 1; s += 2) tube(frames(B, X(48.0), s * 4.3, H.zd(48), s * 8 * DEG), 6.5, 0.38, 0.4);
    mod53(frames(B, X(14.5), 0, 5.6, PI));
    /* fittings: rails, bitts, anchor, scuttles, hatches, vents, rafts, depth-charge rails, whips */
    H.rails(B, 0.3, 11.0, 0.1, 1.0);
    H.rails(B, 89.0, 108.6, 0.1, 1.0);
    deckGear(B, H, [2.0, 66.0, 101.0]);
    anchors(B, H, 103.5, 2.2);
    scuttles(B, H, 66, 98, 2.6, 2.6, 0.18);
    scuttles(B, H, 14, 52, 1.2, 3.0, 0.18);
    hatch(B, X(99.0), 0, H.zd(99), 1.2, 1.0); hatch(B, X(5.0), 0, H.zd(5), 1.2, 1.2);
    for (s = -1; s <= 1; s += 2) {
      bar(B.metal, [X(0.2), s * 1.6, H.zd(0.5) + 0.3], [X(8.0), s * 1.6, H.zd(8) + 0.3], 0.07);     /* depth-charge rails */
      bar(B.metal, [X(0.2), s * 2.1, H.zd(0.5) + 0.3], [X(8.0), s * 2.1, H.zd(8) + 0.3], 0.07);
      for (k = 0; k < 3; k++) raftCradle(B, X(30.0 + k * 2.2), s * 3.7, 5.6, "x");
      vent(B, X(95.0), s * 2.8, H.zd(95), 0.2, 0.7);
      ladder(B, X(64.5), s * 4.2, 4.0, 7.4, false);
      whip(B, X(64.0), s * 3.6, 7.4, 10.0);
    }
    cyl(B.metal, [X(109.3), 0, 4.4], [X(109.3), 0, 7.0], 0.04, 0.02, 5);
    cyl(B.metal, [X(0.4), 0, 1.8], [X(0.4), 0, 4.4], 0.04, 0.02, 5);
    box(B.team, X(30.0), X(34.0), -1.4, 1.4, 8.1, 8.13);
    flush(THREE, g, B);
    g.add(turretGroup(THREE, T, X(97.5), 0, H.zd(97.5), function (F) { mod53(F); }));
    return g;
  }

  /* ============================================================ Type 103 Luetjens [L1][L2]
     The ship is a modified Charles F. Adams: the hull, deckhouses, bridge, both Mk 42s (the forward one
     is the Adams model's own "turret"), the ASROC, the SPG-51s, the boats and the Mk 32s are the
     plain HeroAdamsDDG.build() of js/hero/us_adams_ddg.js (USS Charles F. Adams, DDG-2), called, not
     copied.  That builder has no option for the German differences, and three of them REPLACE Adams
     parts, so the parts they replace are cut out of its merged meshes here (triangles whose centroid
     falls in a listed box, Adams model space x = m - 66.6), and the German parts drawn in their place:
       1. the foremast and its SPS-37 bedspring, and the forward stack above the 02 roof: replaced by
          the forward "mack", a taller stack with the lattice mast built over it carrying the SPS-52
          planar 3-D antenna [L1][L2] (en.wikipedia: "a second mast mounted on the aft funnel; the large
          air surveillance radar was positioned further aft (above the funnel)");
       2. the mainmast and its SPS-39, and the after stack above the 01 roof: replaced by the after
          mack carrying the SPS-40 bedspring [L1][L2];
       3. the twin-arm Mk 11: replaced by the single-arm Mk 13 the Luetjens carried [L1] (infobox);
       4. added: the exhausts led out sideways, two pipes each side of each stack top (en.wikipedia
          "On the Luetjens the exhaust gases were emitted sideways") [L2].
     Not drawn: the bow sonar bulge (under water, never seen in [L1][L2]); the 1990s RAM launchers and
     the 20 mm (not in the 1969 fit).  The Adams paint is kept (its haze grey; the Bundesmarine grey is
     a shade lighter in [L2], NOT recoloured).
     [L1] Commons "German destroyer Moelders (D186) off Maine in 1969.jpg" (the D186 on trials, from
          starboard, bow right): the macks, the Mk 13, the SPS-40 aft, the SPS-52 forward.
     [L2] "German destroyer Luetjens (D185) underway in 1988.JPEG" (starboard bow): the macks close, the
          side exhausts, the mast platforms.  Heights of the German parts are scaled from the Adams
          stack tops (22.0 / 20.4 m) by their ratios in [L1]: NOT CONFIRMED to about 10 per cent. */
  function stripBoxes(root, boxes) {
    root.children.forEach(function (me) {
      if (!me.isMesh || !me.geometry) return;
      var g = me.geometry, P = g.getAttribute("position"), I = g.getIndex(), keep = [], n, t, k;
      function inside(x, y, z) {
        for (var q = 0; q < boxes.length; q++) {
          var b = boxes[q];
          if (x >= b[0] && x <= b[1] && Math.abs(y) >= b[2] && Math.abs(y) <= b[3] && z >= b[4] && z <= b[5]) return true;
        }
        return false;
      }
      n = I ? I.count / 3 : P.count / 3;
      for (t = 0; t < n; t++) {
        var v = I ? [I.getX(3 * t), I.getX(3 * t + 1), I.getX(3 * t + 2)] : [3 * t, 3 * t + 1, 3 * t + 2], cx = 0, cy = 0, cz = 0;
        for (k = 0; k < 3; k++) { cx += P.getX(v[k]) / 3; cy += P.getY(v[k]) / 3; cz += P.getZ(v[k]) / 3; }
        if (!inside(cx, cy, cz)) keep.push(v[0], v[1], v[2]);
      }
      if (keep.length === n * 3) return;
      g.setIndex(keep);
    });
  }
  function buildLutjens(THREE, M, C) {
    var root = HeroAdamsDDG.build(THREE, M, C), XA = function (m) { return m - 66.6; };
    /* the cuts: [x0, x1, |y|0, |y|1, z0, z1] in Adams space */
    stripBoxes(root, [
      [XA(72.2), XA(84.2), 0, 7.0, 10.6, 45],          /* foremast, SPS-37, the forward stack's upper part */
      [XA(72.2), XA(73.4), 2.4, 4.6, 7.6, 10.7],       /* the foremast struts' feet */
      [XA(50.3), XA(61.0), 0, 4.4, 9.5, 40],           /* mainmast, SPS-39, the after stack's upper part */
      [XA(50.3), XA(52.2), 2.0, 3.6, 7.2, 9.6],        /* the mainmast struts' feet */
      [XA(12.4), XA(19.4), 0, 2.3, 7.05, 14]           /* the Mk 11 */
    ]);
    var T = materials(THREE, C, { hull: 0x7a7d81, sup: 0x7f8387, deck: 0x50545a, boot: 0x2a2c2e, light: 0xb8bcbd }), B = bins(T), s, k;
    /* the German stacks: the Adams outline (forward 5.4 x 3.7 m, after 4.8 x 3.4 m), carried up from the
       cut to the mack tops, raked, black-capped, the exhausts led out sideways [L1][L2] */
    function mack(m0, z0, z1, ax, ay, rake) {
      var R = [], n = 16, j, zz = [z0, z1 - 1.6, z1];
      zz.forEach(function (z) {
        var ring = [], xc = XA(m0) - rake * (z - z0) / (z1 - z0);
        for (j = 0; j < n; j++) { var t2 = j / n * TAU, c2 = Math.cos(t2), s2 = Math.sin(t2); ring.push([xc + ax * Math.sign(c2) * Math.pow(Math.abs(c2), 0.6), ay * Math.sign(s2) * Math.pow(Math.abs(s2), 0.6), z]); }
        R.push(ring);
      });
      loft(B.sup, [R[0], R[1]]);
      loft(B.dark, [R[1], R[2]]);
      var xt = XA(m0) - rake;
      for (s = -1; s <= 1; s += 2) for (k = -1; k <= 1; k += 2) {
        cyl(B.dark, [xt + k * ax * 0.35, s * ay * 0.5, z1 - 0.7], [xt + k * ax * 0.35, s * (ay + 1.3), z1 + 0.2], 0.32, 0.3, 8);
      }
      return xt;
    }
    var xf = mack(76.2, 10.55, 23.0, 2.7, 1.85, 1.2);
    var xa = mack(55.2, 9.45, 21.4, 2.4, 1.7, 1.4);
    /* the forward mack's lattice mast: four legs from the stack top to the head platform at 31.0, the
       SPS-52 planar array on top to 34.6, the topmast to 38 [L1][L2] */
    lattice(frames(B, xf - 0.4, 0, 0, 0), 1.9, 1.5, 0.9, 0.8, 23.0, 31.0, 4, 0.1);
    box(B.sup, xf - 1.7, xf + 0.9, -1.4, 1.4, 30.95, 31.1);
    railRect(B, xf - 1.7, xf + 0.9, -1.4, 1.4, 31.1, 0.8);
    planar(frames(B, xf - 0.4, 0, 31.1, 0), 3.6, 3.0, 0.3, 0.5, 18);
    cyl(B.metal, [xf - 1.4, 0, 31.1], [xf - 1.4, 0, 38.0], 0.09, 0.04, 6);
    bar(B.metal, [xf - 0.4, -4.6, 27.2], [xf - 0.4, 4.6, 27.2], 0.07);
    box(B.sup, xf - 1.3, xf + 0.5, -1.3, 1.3, 27.0, 27.15);
    /* the after mack's mast: a lattice to the platform at 26.0, the SPS-40 bedspring above, pole [L1] */
    lattice(frames(B, xa - 0.3, 0, 0, 0), 1.5, 1.2, 0.7, 0.6, 21.4, 26.0, 3, 0.09);
    box(B.sup, xa - 1.4, xa + 0.8, -1.2, 1.2, 25.95, 26.1);
    bedspring(frames(B, xa - 0.3, 0, 26.1, 0), 5.6, 3.0, 0.9, 10, 4);
    cyl(B.metal, [xa - 1.2, 0, 26.1], [xa - 1.2, 0, 33.0], 0.08, 0.035, 6);
    bar(B.metal, [xa - 0.3, -3.4, 24.0], [xa - 0.3, 3.4, 24.0], 0.06);
    /* the Mk 13 single-arm launcher on the round after end of the after deckhouse [L1] */
    (function (F) {
      cylZ(F.sup, 0, 0, 0, 0.5, 1.9, 22);
      cylZ(F.sup, 0, 0, 0.5, 1.4, 1.25, 18);
      box(F.sup, -0.6, 0.6, -0.45, 0.45, 1.4, 2.4);
      var e = 0.25, ce = Math.cos(e), se = Math.sin(e);
      obox(F.sup, [0.2, 0, 2.2], [ce, 0, se], [0, 1, 0], [-se, 0, ce], -0.6, 3.2, -0.25, 0.25, -0.2, 0.25);
      cyl(F.light, [0.2 - 0.4 * ce, 0, 2.2 - 0.4 * se - 0.5], [0.2 + 3.8 * ce, 0, 2.2 + 3.8 * se - 0.5], 0.17, 0.17, 10);
      cyl(F.light, [0.2 + 3.8 * ce, 0, 2.2 + 3.8 * se - 0.5], [0.2 + 4.3 * ce, 0, 2.2 + 4.3 * se - 0.5], 0.17, 0.02, 10);
    })(frames(B, XA(16.8), 0, 7.0, PI));
    flush(THREE, root, B);
    return root;
  }

  return {
    k130: buildK130, f124: buildF124, frankenthal: buildFrankenthal, schnellboot: buildSchnellboot,
    gepard: buildGepard, koln: buildKoln, bremen: buildBremen, brandenburg: buildBrandenburg,
    fletcher: buildFletcher, lutjens: buildLutjens
  };
})();

/* Registration: len is each class's published length overall (en.wikipedia infoboxes). */
(function () {
  function reg(key, len, fn, v) {
    UNIT_MODELS[key] = { len: len, build: function (THREE, M, C) { return HeroDeuNavy[fn](THREE, M, C, v); } };
  }
  reg("corvette_g", 89.12, "k130");                    /* K130 Braunschweig (skirmish) */
  reg("deu_e00_corvette", 89.12, "k130");              /* K130 Braunschweig */
  reg("destroyer_g", 143.0, "f124");                   /* Sachsen F124 (skirmish) */
  reg("deu_e00_destroyer", 143.0, "f124");             /* Sachsen F124 */
  reg("minesweeper_g", 54.4, "frankenthal");           /* Frankenthal MCMV */
  reg("deu_e50_patrol", 42.6, "schnellboot", "jaguar");/* Jaguar Schnellboot (Type 140) */
  reg("deu_e60_patrol", 42.6, "schnellboot", "zobel"); /* Zobel Schnellboot (Type 142) */
  reg("deu_e50_destroyer", 114.8, "fletcher");         /* Z-1 Fletcher */
  reg("deu_e60_corvette", 109.8, "koln");              /* Koln Type 120 */
  if (typeof HeroAdamsDDG !== "undefined") reg("deu_e60_destroyer", 133.2, "lutjens");   /* Lutjens Type 103 */
  reg("deu_e80_destroyer", 130.5, "bremen");           /* Bremen F122 */
  reg("deu_e90_destroyer", 138.85, "brandenburg");     /* Brandenburg F123 */
  reg("deu_e80_missileboat", 57.6, "gepard", "143");   /* Type 143 Albatros */
  reg("deu_e90_missileboat", 57.6, "gepard", "143A");  /* Type 143A Gepard */
  reg("deu_e00_missileboat", 57.6, "gepard", "143A");  /* Gepard 143A (late) */
  /* reg("deu_e80_minesweeper", 47.2, ...);  Troika (Type 351): no reference found - held, see the header. */
})();
