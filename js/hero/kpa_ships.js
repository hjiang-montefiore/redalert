/* ==================== js/hero/kpa_ships.js ==============================
   HERO MODELS -- Korean People's Navy (KPA) surface ships and submarines.
   One file, three builders, each measured off the references named in its
   own block below:
     kpa_e50_corvette  Project G-5 motor torpedo boat (Soviet, transferred)  buildG5()
     kpa_e60_corvette  Najin-class frigate                                     buildNajin()
     kpa_e90_corvette  Najin-class frigate (the same ship; row "Unchanged")    buildNajin()
     kpa_e90_sub       Sang-o-class coastal submarine                          buildSangO()
   HELD, NOT REGISTERED (review policy rule 1: no usable photograph or drawing
   was found on Wikimedia Commons; the searches are listed at the foot):
     kpa_e80_corvette  Soho-class catamaran frigate        -- no reference found
     kpa_e00_sub       Sinpo / Gorae-class SSB              -- no reference found
     kpa_e00_missileboat Nongo-class fast attack craft      -- no reference found

   DETAIL PASS (2026-11-12, review policy rule 10): fittings added to all three, merged per material
     (new materials: boot top, white canisters, life-ring orange, searchlight body).  G-5: the long grab
     rails on short legs along the deck and on the foredeck, the twin bitts, the small deck fittings, the
     running lights and the roof hatch, all as [GD] draws them, and [GD]'s white boot line 0 - 0.07 m.
     Najin: lifelines along the whole deck edge (they stopped at the houses), rails round the 01 and 02
     roofs and the after deckhouse, ladders, life rings, raft canisters, whips on the bridge wings,
     searchlights, the anchors in their hawses forward of the windlass, rows of scuttles forward and aft,
     hatches, vents, a toe rail and a dark waterway.  Sang-o: the casing's slat lines, four hatches,
     retractable cleats and the rungs up the fin.  The plating canvas carries frame lines, rust runs and
     waterline grime; the deck canvas grit and stains.  NOT CONFIRMED: every position and count of the
     Najin's and Sang-o's added fittings ([P] and [G] are too small or too oblique to place them).

   MODEL SPACE (all three): +X bow, +Y port, +Z up, metres, WATERLINE z = 0
   (the submarine at its surfaced trim, see its block).  Everything is merged
   one mesh per material (the Osa kit of js/hero/ru_osa_boat.js, copied, not
   shared: that module keeps its kit private).  The three corvette rows are
   turret:true, so each carries ONE group named "turret" holding the row's
   first weapon (G-5: the forward DShK on its ring; Najin: the forward 100 mm),
   origin on the ring at the deck, gun along local +X.  The sub row is not
   turret:true and has no named node.  No hull numbers (the Najin photograph
   shows "531", the G-5 drawing a Soviet ensign: neither is drawn), no flags,
   no markings.  Team colour as small strips on up-facing surfaces.  ASCII only.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroKpaShips = (function () {
  "use strict";
  var TAU = Math.PI * 2, PI = Math.PI;

  /* ================================================================ kit
     Copied from js/hero/ru_osa_boat.js (Bin, solid, hexa, box, cyl, loft,
     ellipsoid, obox, flush), plus triOut() for hand-wound hull panels. */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function tbl(T, d) {
    if (d <= T[0][0]) return T[0][1];
    for (var i = 1; i < T.length; i++) if (d <= T[i][0]) {
      var t = (d - T[i - 1][0]) / ((T[i][0] - T[i - 1][0]) || 1);
      return lerp(T[i - 1][1], T[i][1], t);
    }
    return T[T.length - 1][1];
  }

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
  /* a triangle wound so that its face normal points along ref */
  function triOut(bin, a, b, c, ref) {
    var cc = cross(sub(b, a), sub(c, a));
    if (dot(cc, cc) < 1e-12) return;
    if (dot(cc, ref) < 0) bin.tri(a, c, b); else bin.tri(a, b, c);
  }
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
  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
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
    var vol = 0, i, f;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      var p = V[f[0]], q = vol < 0 ? V[f[2]] : V[f[1]], s2 = vol < 0 ? V[f[1]] : V[f[2]];
      var cc = cross(sub(q, p), sub(s2, p));
      if (dot(cc, cc) < 1e-12) continue;
      bin.tri(p, q, s2);
    }
  }
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
    if (a0 > -PI / 2 + 1e-3) {
      var zb = R[0][0][2], cb = [C[0], C[1], zb];
      for (k = 0; k < seg; k++) bin.tri(cb, R[0][(k + 1) % seg], R[0][k], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
    }
  }
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
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      var me = new THREE.Mesh(geo, b.mat); me.castShadow = true; me.receiveShadow = true;
      group.add(me);
    }
  }
  /* a plan outline (stadium: two half circles joined), counter-clockwise, at height z */
  function stadium(x0, x1, hw, z, n) {
    var P = [], k, r = Math.min(hw, (x1 - x0) / 2), xa = x0 + r, xb = x1 - r;
    for (k = 0; k <= n; k++) { var t = -PI / 2 + k / n * PI; P.push([xb + r * Math.cos(t), r * Math.sin(t) * hw / r, z]); }
    for (k = 0; k <= n; k++) { var t2 = PI / 2 + k / n * PI; P.push([xa + r * Math.cos(t2), r * Math.sin(t2) * hw / r, z]); }
    return P;
  }

  /* ---------------------------------------------------------- canvas paint (as ru_osa_boat.js) */
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
    var R = rng(5310), i, k, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.02 + R() * 0.035; g.fillStyle = R() < 0.55 ? "#8a949a" : "#ffffff";
      g.fillRect(R() * S, R() * S, (1 + R() * 3) * m, (0.3 + R() * 1.0) * m);
    }
    g.globalAlpha = 1;
    for (k = 0; k < 16; k++) {
      var y = Math.round(k * m);
      g.fillStyle = "rgba(70,80,86,0.22)"; g.fillRect(0, y, S, 1.5);
      g.fillStyle = "rgba(255,255,255,0.24)"; g.fillRect(0, y + 1.5, S, 1);
      for (i = 0; i < 7; i++) { var x = Math.round(((i * 2.5 + (k % 2) * 1.25) % 16) * m); g.fillStyle = "rgba(70,80,86,0.18)"; g.fillRect(x, y, 1.5, m); }
    }
    for (i = 0; i < 40; i++) {                                  /* rust weeps: the Najin photograph is streaked */
      g.globalAlpha = 0.05 + R() * 0.07; g.fillStyle = "#5b5650";
      g.fillRect(R() * S, R() * S, 0.08 * m, (0.4 + R() * 1.4) * m);
    }
    /* the detail pass: frame lines every 0.5 m through the paint, heavier rust runs, salt and grime in the
       lowest metre of each tile (side faces map z to v, so it lies along the waterline and house feet) */
    for (i = 0; i < 32; i++) { g.fillStyle = "rgba(60,66,70,0.08)"; g.fillRect(Math.round(i * 0.5 * m), 0, 1, S); }
    for (i = 0; i < 80; i++) {
      var rx = R() * S, ry = R() * S, rl = (0.3 + R() * 1.8) * m;
      g.globalAlpha = 0.06 + R() * 0.1; g.fillStyle = R() < 0.6 ? "#6b4a36" : "#4a4440";
      g.fillRect(rx, ry, 1 + R() * 2, rl);
      g.globalAlpha *= 0.5; g.fillRect(rx - 1, ry, 4, rl * 0.4);
    }
    var gr = g.createLinearGradient ? g.createLinearGradient(0, S - 1.2 * m, 0, S) : null;
    if (gr) { gr.addColorStop(0, "rgba(40,44,40,0)"); gr.addColorStop(1, "rgba(40,44,40,0.24)"); g.globalAlpha = 1; g.fillStyle = gr; g.fillRect(0, S - 1.2 * m, S, 1.2 * m); }
    for (i = 0; i < 180; i++) { g.globalAlpha = 0.04 + R() * 0.06; g.fillStyle = R() < 0.6 ? "#3e4446" : "#d8dcdc"; g.fillRect(R() * S, R() * S, 1 + R() * 3, 1 + R() * 3); }
    g.globalAlpha = 1;
  }
  function drawDeck(g, S) {
    var R = rng(5311), i, j, m = S / 16;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, S, S);
    for (i = 0; i < 11; i++) for (j = 0; j < 8; j++) {
      g.fillStyle = "rgba(0,0,0," + (0.02 + R() * 0.05).toFixed(3) + ")";
      g.fillRect(i * 1.5 * m + 2, j * 2 * m + 2, 1.5 * m - 4, 2 * m - 4);
    }
    g.fillStyle = "rgba(40,30,26,0.26)";
    for (i = 0; i <= 11; i++) g.fillRect(i * 1.5 * m - 1, 0, 2, S);
    for (j = 0; j <= 8; j++) g.fillRect(0, j * 2 * m - 1, S, 2);
    for (i = 0; i < 1800; i++) { g.globalAlpha = 0.1 + R() * 0.12; g.fillStyle = R() < 0.7 ? "#000000" : "#ffffff"; g.fillRect(R() * S, R() * S, 1.5, 1.5); }
    for (i = 0; i < 26; i++) { g.globalAlpha = 0.04 + R() * 0.06; g.fillStyle = "#2a2622"; g.fillRect(R() * S, R() * S, (0.3 + R() * 0.8) * m, (0.3 + R() * 0.8) * m); }
    g.globalAlpha = 1;
  }
  /* P: palette {hull, sup, deck, under}; returns the materials and a fresh bin set */
  function makeBins(THREE, C, P) {
    var plate = canvasTex(THREE, "kpa_plate", drawPlate), deckT = canvasTex(THREE, "kpa_deck", drawDeck);
    function mk(c, r, m, map) {
      var o = { color: c, roughness: r, metalness: m };
      if (map) o.map = map;
      return new THREE.MeshStandardMaterial(o);
    }
    var T = {
      hull: mk(P.hull, 0.82, 0.08, plate),
      sup: mk(P.sup, 0.8, 0.08, plate),
      deck: mk(P.deck, 0.95, 0.04, deckT),
      under: mk(P.under, 0.88, 0.04),
      dark: mk(0x22272a, 0.75, 0.3),
      metal: mk(0x4b5257, 0.5, 0.55),
      glass: mk(0x141c22, 0.15, 0.4),
      btop: mk(P.btop === undefined ? 0x1e2022 : P.btop, 0.85, 0.05, plate),   /* the boot-topping line */
      white: mk(0xcfd2cf, 0.7, 0.05, plate),                                  /* raft canisters */
      ring: mk(0xc8582e, 0.7, 0.04),                                          /* life rings */
      light: mk(P.sup, 0.78, 0.08, plate),                                   /* searchlight bodies */
      team: mk((C && C.team !== undefined) ? C.team : 0x3f7fd0, 0.84, 0.06)
    };
    return { T: T, fresh: function () { var B = {}, k; for (k in T) B[k] = new Bin(T[k]); return B; } };
  }

  /* ---------------------------------------------------------- shared hull loft
     xs: station x list (stern first).  half(x) returns N [y, z] points from
     the deck edge (index 0) to the keel / stem (last, y = 0).  zmid(x) is a
     point inside the section, used to wind every panel outward.  Panels whose
     centroid lies under z = 0 go to B.under (the boot), the rest to B.hull.
     deckIn(x) (optional) stops the deck plate short of the centreline (an
     open trough); crown(x) is the camber at the centreline. */
  function hullLoft(B, xs, half, zmid, crown, deckIn, bt) {
    /* the detail pass: with bt given, every section is cut at bt and at the waterline and the band between
       goes to B.btop, the boot-topping line */
    function cutSec(P) {
      if (bt === undefined) return P;
      var out = [], i2, c, cuts = [bt, 0];
      for (i2 = 0; i2 < P.length; i2++) {
        out.push(P[i2]);
        for (c = 0; c < 2; c++) if (i2 + 1 < P.length && P[i2][1] > cuts[c] && P[i2 + 1][1] <= cuts[c]) {
          var t = (P[i2][1] - cuts[c]) / (P[i2][1] - P[i2 + 1][1]);
          out.push([lerp(P[i2][0], P[i2 + 1][0], t), cuts[c]]);
        }
      }
      while (out.length < P.length + 2) out.push(out[out.length - 1].slice());
      return out;
    }
    var H = xs.map(function (x) { return cutSec(half(x)); }), n = H[0].length, i, k, s;
    function bin(a, b, c) { var z = (a[2] + b[2] + c[2]) / 3; return z < -0.005 ? B.under : (bt !== undefined && z < bt - 0.005) ? B.btop : B.hull; }
    for (i = 0; i + 1 < xs.length; i++) {
      var xa = xs[i], xb = xs[i + 1], A = H[i], Bq = H[i + 1];
      for (s = -1; s <= 1; s += 2) for (k = 0; k + 1 < n; k++) {
        var p = [xa, s * A[k][0], A[k][1]], q = [xa, s * A[k + 1][0], A[k + 1][1]],
            r = [xb, s * Bq[k + 1][0], Bq[k + 1][1]], t = [xb, s * Bq[k][0], Bq[k][1]];
        [[p, q, r], [p, r, t]].forEach(function (T) {
          var cx = (T[0][0] + T[1][0] + T[2][0]) / 3, cy = (T[0][1] + T[1][1] + T[2][1]) / 3, cz = (T[0][2] + T[1][2] + T[2][2]) / 3;
          triOut(bin(T[0], T[1], T[2]), T[0], T[1], T[2], [0, cy, cz - zmid(cx)]);
        });
      }
      /* deck */
      var yiA = deckIn ? deckIn(xa) : 0, yiB = deckIn ? deckIn(xb) : 0;
      for (s = -1; s <= 1; s += 2) {
        var e0 = [xa, s * A[0][0], A[0][1]], e1 = [xb, s * Bq[0][0], Bq[0][1]];
        var m0 = [xa, s * yiA, A[0][1] + crown(xa) * (1 - yiA / Math.max(0.01, A[0][0]))],
            m1 = [xb, s * yiB, Bq[0][1] + crown(xb) * (1 - yiB / Math.max(0.01, Bq[0][0]))];
        triOut(B.deck, e0, e1, m1, [0, 0, 1]);
        triOut(B.deck, e0, m1, m0, [0, 0, 1]);
      }
    }
    /* end caps: a fan from the section's own centre line, at each end with breadth */
    [0, xs.length - 1].forEach(function (ie) {
      var S = H[ie], x0 = xs[ie], dir = ie === 0 ? -1 : 1, zc = zmid(x0);
      if (S[0][0] < 0.02) return;
      for (s = -1; s <= 1; s += 2) for (k = 0; k + 1 < n; k++) {
        var a = [x0, s * S[k][0], S[k][1]], b = [x0, s * S[k + 1][0], S[k + 1][1]], c = [x0, 0, zc];
        triOut(bin(a, b, c), a, b, c, [dir, 0, 0]);
      }
      var top = [[x0, S[0][0], S[0][1]], [x0, -S[0][0], S[0][1]], [x0, 0, zc]];
      triOut(B.hull, top[0], top[1], top[2], [dir, 0, 0]);
    });
  }

  /* lifelines along a deck edge: stanchions every 1.5 m, two wires */
  function rails(B, X0, X1, yAt, zAt, h, step) {
    var s, x, st = step || 1.5;
    for (s = -1; s <= 1; s += 2) {
      for (x = X0; x < X1 - 0.01; x += st) {
        var xn = Math.min(x + st, X1), y0 = s * yAt(x), y1 = s * yAt(xn);
        cyl(B.metal, [x, y0, zAt(x) + h], [xn, y1, zAt(xn) + h], 0.02, 0.02, 4);
        cyl(B.metal, [x, y0, zAt(x) + h * 0.5], [xn, y1, zAt(xn) + h * 0.5], 0.013, 0.013, 3);
        box(B.metal, x - 0.025, x + 0.025, y0 - 0.025, y0 + 0.025, zAt(x), zAt(x) + h);
      }
    }
  }

  /* ---------------------------------------------------------- deck fittings (the detail pass, 2026-11-12)
     The same small kit as js/hero/roc_ships2.js: rails, bitts, fairleads, hatches, vents, ladders, raft
     canisters, life rings, whips, searchlights, merged into the bins (review policy rule 10). */
  /* stanchions about every step m along a polyline of foot points, two wires (top and middle) */
  function railLine(bin, pts, h, step) {
    var st = step || 1.3, i, k, hh = h || 0.9;
    for (i = 0; i + 1 < pts.length; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.sqrt(dot(sub(b, a), sub(b, a))), n = Math.max(1, Math.round(L / st));
      for (k = i ? 1 : 0; k <= n; k++) {
        var t = k / n, x = lerp(a[0], b[0], t), y = lerp(a[1], b[1], t), z = lerp(a[2], b[2], t);
        box(bin, x - 0.022, x + 0.022, y - 0.022, y + 0.022, z, z + hh);
      }
      cyl(bin, [a[0], a[1], a[2] + hh], [b[0], b[1], b[2] + hh], 0.02, 0.02, 3);
      cyl(bin, [a[0], a[1], a[2] + hh * 0.5], [b[0], b[1], b[2] + hh * 0.5], 0.013, 0.013, 3);
    }
  }
  /* rails round a flat roof x0..x1 (model x), half width hw, at z; open (no rail) on the side given by gap
     ("f" the fore edge, "a" the after edge) */
  function roofRail(bin, x0, x1, hw, z, h, gap) {
    var P = [[x0, -hw, z], [x1, -hw, z], [x1, hw, z], [x0, hw, z]];
    if (gap === "f") railLine(bin, [P[1], P[0], P[3], P[2]], h);
    else if (gap === "a") railLine(bin, [P[0], P[1], P[2], P[3]], h);
    else railLine(bin, [P[0], P[1], P[2], P[3], P[0]], h);
  }
  /* a pair of bitts on a base plate, along X */
  function bitts(bin, x, y, z, r) {
    var rr = r || 0.09;
    box(bin, x - 0.36 * rr / 0.09, x + 0.36 * rr / 0.09, y - 0.13, y + 0.13, z - 0.02, z + 0.05);
    for (var k = -1; k <= 1; k += 2) {
      cylZ(bin, x + k * 0.2 * rr / 0.09, y, z, z + 3.6 * rr, rr, 8);
      cylZ(bin, x + k * 0.2 * rr / 0.09, y, z + 3.6 * rr, z + 3.6 * rr + 0.04, rr * 1.35, 8);
    }
  }
  /* an open fairlead (chock) on the toe rail at the deck edge: two horns and a roller */
  function fairlead(bin, x, y, z, s) {
    box(bin, x - 0.26, x + 0.26, y - s * 0.16, y, z - 0.02, z + 0.06);
    for (var k = -1; k <= 1; k += 2) box(bin, x + k * 0.2 - 0.05, x + k * 0.2 + 0.05, y - s * 0.14, y - s * 0.02, z, z + 0.24);
    cyl(bin, [x - 0.15, y - s * 0.08, z + 0.1], [x + 0.15, y - s * 0.08, z + 0.1], 0.05, 0.05, 6);
  }
  /* a hatch: the coaming, the lid a shade lower inside it, the hinge bar and a handwheel */
  function hatch(B, x, y, z, lx, ly, round) {
    if (round) {
      cylZ(B.hull, x, y, z - 0.02, z + 0.12, lx / 2, 14);
      cylZ(B.metal, x, y, z + 0.12, z + 0.16, lx / 2 - 0.05, 14);
      cylZ(B.metal, x, y, z + 0.16, z + 0.22, 0.04, 5);
      cyl(B.metal, [x - 0.15, y, z + 0.22], [x + 0.15, y, z + 0.22], 0.02, 0.02, 3);
      return;
    }
    box(B.hull, x - lx / 2, x + lx / 2, y - ly / 2, y + ly / 2, z - 0.02, z + 0.14);
    box(B.metal, x - lx / 2 + 0.05, x + lx / 2 - 0.05, y - ly / 2 + 0.05, y + ly / 2 - 0.05, z + 0.14, z + 0.17);
    cyl(B.dark, [x - lx / 2 + 0.02, y - ly / 2 + 0.08, z + 0.16], [x - lx / 2 + 0.02, y + ly / 2 - 0.08, z + 0.16], 0.03, 0.03, 4);
    cylZ(B.metal, x + lx * 0.15, y, z + 0.17, z + 0.24, 0.03, 4);
    cyl(B.metal, [x + lx * 0.15, y - 0.12, z + 0.24], [x + lx * 0.15, y + 0.12, z + 0.24], 0.018, 0.018, 3);
  }
  /* a mushroom vent: the trunk and its cap */
  function vent(bin, x, y, z, r, h) {
    cylZ(bin, x, y, z - 0.02, z + h, r * 0.6, 8);
    cyl(bin, [x, y, z + h], [x, y, z + h + r * 0.45], r, r * 0.7, 10);
  }
  /* a gooseneck / cowl vent opening toward f (+1 ahead, -1 astern) */
  function cowl(B, x, y, z, r, h, f) {
    cylZ(B.hull, x, y, z - 0.02, z + h, r, 8);
    cyl(B.hull, [x, y, z + h], [x + f * r * 1.2, y, z + h + r * 1.1], r, r * 1.15, 8);
    cyl(B.dark, [x + f * r * 1.15, y, z + h + r * 1.05], [x + f * r * 1.25, y, z + h + r * 1.15], r * 1.0, r * 1.0, 8);
  }
  /* a vertical or inclined ladder from foot A to head Bp, w wide across Y (or across X if ax) */
  function ladder(bin, A, Bp, w, ax) {
    var o = ax ? [w / 2, 0, 0] : [0, w / 2, 0], k, L = Math.abs(Bp[2] - A[2]), n = Math.max(2, Math.round(L / 0.3));
    for (k = -1; k <= 1; k += 2) cyl(bin, [A[0] + k * o[0], A[1] + k * o[1], A[2]], [Bp[0] + k * o[0], Bp[1] + k * o[1], Bp[2]], 0.02, 0.02, 3);
    for (k = 1; k < n; k++) {
      var t = k / n, c = [lerp(A[0], Bp[0], t), lerp(A[1], Bp[1], t), lerp(A[2], Bp[2], t)];
      cyl(bin, [c[0] - o[0], c[1] - o[1], c[2]], [c[0] + o[0], c[1] + o[1], c[2]], 0.014, 0.014, 3);
    }
  }
  /* a life-raft canister on its cradle, axis along X (or Y if ay), centre x,y, cradle foot z */
  function raft(B, x, y, z, ay, r) {
    var rr = r || 0.3, L = rr * 3.4, a = ay ? [0, L / 2, 0] : [L / 2, 0, 0], k;
    box(B.metal, x - (ay ? rr : L * 0.4), x + (ay ? rr : L * 0.4), y - (ay ? L * 0.4 : rr), y + (ay ? L * 0.4 : rr), z, z + 0.1);
    cyl(B.white, [x - a[0], y - a[1], z + 0.12 + rr], [x + a[0], y + a[1], z + 0.12 + rr], rr, rr, 10);
    for (k = -1; k <= 1; k += 2) {
      var c = [x + k * a[0] * 0.55, y + k * a[1] * 0.55, z + 0.12 + rr];
      cyl(B.metal, [c[0] - a[0] * 0.04, c[1] - a[1] * 0.04, c[2]], [c[0] + a[0] * 0.04, c[1] + a[1] * 0.04, c[2]], rr * 1.06, rr * 1.06, 10);
    }
  }
  /* a life ring hung flat on a vertical face at (x, y), facing s (+1 port, -1 starboard) */
  function lifeRing(bin, x, y, z, s, R) {
    var r = R || 0.32, k, n = 10;
    for (k = 0; k < n; k++) {
      var a0 = k / n * TAU, a1 = (k + 1) / n * TAU;
      cyl(bin, [x + Math.cos(a0) * r, y + s * 0.05, z + Math.sin(a0) * r], [x + Math.cos(a1) * r, y + s * 0.05, z + Math.sin(a1) * r], 0.055, 0.055, 4);
    }
  }
  /* a whip aerial on a short base, height h */
  function whip(B, x, y, z, h, lean) {
    cyl(B.metal, [x, y, z - 0.02], [x, y, z + 0.25], 0.07, 0.06, 6);
    cyl(B.metal, [x, y, z + 0.25], [x + (lean || 0), y, z + h], 0.03, 0.012, 4);
  }
  /* a searchlight on a short post */
  function searchlight(B, x, y, z, f) {
    cylZ(B.metal, x, y, z, z + 0.35, 0.05, 5);
    cyl(B.light, [x - f * 0.2, y, z + 0.5], [x + f * 0.2, y, z + 0.5], 0.2, 0.22, 10);
    cyl(B.glass, [x + f * 0.2, y, z + 0.5], [x + f * 0.22, y, z + 0.5], 0.18, 0.18, 10);
  }


  /* the half-breadth at height z of a section given by half(x) */
  function sideYH(half, x, z) {
    var P = half(x), i;
    if (z >= P[0][1]) return P[0][0];
    for (i = 0; i + 1 < P.length; i++) if (z <= P[i][1] && z >= P[i + 1][1] && P[i][1] - P[i + 1][1] > 1e-6)
      return lerp(P[i][0], P[i + 1][0], (P[i][1] - z) / (P[i][1] - P[i + 1][1]));
    return P[P.length - 1][0];
  }
  /* the dark waterway inside the deck edge and a toe rail on it, x0..x1 every step */
  function gutter(B, half, x0, x1, step, toe) {
    for (var s = -1; s <= 1; s += 2) {
      var gw = [], tr = [], x;
      for (x = x0; x <= x1 + 1e-6; x += step) {
        var P = half(x)[0], y = s * P[0], z = P[1];
        if (P[0] < 0.3) continue;
        gw.push([[x, y - s * 0.3, z + 0.005], [x, y - s * 0.05, z + 0.005], [x, y - s * 0.05, z + 0.03], [x, y - s * 0.3, z + 0.03]]);
        tr.push([[x, y - s * 0.05, z - 0.02], [x, y + s * 0.005, z - 0.02], [x, y + s * 0.005, z + (toe || 0.08)], [x, y - s * 0.05, z + (toe || 0.08)]]);
      }
      if (gw.length > 1) { loft(B.dark, gw); loft(B.hull, tr); }
    }
  }
  /* round scuttles on the shell at (x, z), side s */
  function scuttleH(B, half, x, z, s, r) {
    var y = s * sideYH(half, x, z), rr = r || 0.17;
    cyl(B.metal, [x, y - s * 0.01, z], [x, y + s * 0.035, z], rr * 1.25, rr * 1.25, 8);
    cyl(B.glass, [x, y + s * 0.03, z], [x, y + s * 0.045, z], rr, rr, 8);
  }
  /* a stockless anchor stowed in its hawse on the shell at x, its hawse top at zt; fwd = +1 if the bow is +X */
  function anchorH(B, half, x, zt, s, k) {
    var zb = zt - 1.0 * k, yt = s * (sideYH(half, x, zt) + 0.06), yb = s * (sideYH(half, x, zb) + 0.09), j;
    cyl(B.dark, [x, yt - s * 0.08, zt], [x, yt + s * 0.02, zt], 0.22 * k, 0.27 * k, 10);
    cyl(B.metal, [x, yt, zt], [x, yb, zb], 0.07 * k, 0.07 * k, 5);
    box(B.metal, x - 0.45 * k, x + 0.45 * k, Math.min(yb, yb + s * 0.13) - 0.01, Math.max(yb, yb + s * 0.13) + 0.01, zb - 0.13 * k, zb + 0.06 * k);
    for (j = -1; j <= 1; j += 2) obox(B.metal, [x + j * 0.38 * k, yb + s * 0.05, zb], [j * 0.5, 0, 0.86], [0, 1, 0], [-0.86, 0, j * 0.5], 0, 0.5 * k, -0.07, 0.07, -0.08, 0.08);
  }

  /* ======================================================================
     PROJECT G-5 MOTOR TORPEDO BOAT -- kpa_e50_corvette
     Tupolev's stepped planing boat with two 533 mm torpedoes in open stern
     troughs, launched tail-first over the transom.  The KPA had a few dozen in
     1950 (row text: four attacked USS Juneau on 2 July 1950).

     PUBLISHED (en.wikipedia "G-5-class motor torpedo boat", Conway's /
     Breyer): length overall 18.85 - 19.1 m, beam 3.5 m, draught 0.82 m
     (later series), 2 shafts, 1 - 2 DShK 12.7 mm, 2 x 533 mm stern-trough
     torpedoes.

     REFERENCES (Commons, scratchpad q_kpaship_ref):
       [GD] "Lancha G-5.svg" (profile and plan, with a 0-15 m scale bar),
            rendered at 1600 px: 79.47 px/m (0 m at x 166, 15 m at x 1358).
            THE MASTER: every station below is d = metres forward of the
            transom (x 163) read off it; the hull is 17.52 m (transom to
            stem), the launch rails reach 1.52 m further aft, so 19.04 m
            overall (the published 18.85 - 19.1).  The waterline is the white
            boot line (y 408); heights z = (408 - y) / 79.47.
       [GK] "Kirov&TKA-G-5-1940.jpg" (a G-5 at speed off the cruiser Kirov,
            1940): the low turtle-backed hull, the small domed wheelhouse
            amidships, the light grey paint.
     MEASURED off [GD] (published in brackets):
       hull 17.52 m + rails 1.52 = 19.04 m overall [18.85 - 19.1]
       max half-breadth 1.74 m at d 10 - 12  ->  beam 3.48 m [3.5]
       deck edge 0.84 m at the transom rising to 1.21 at the stem, the
       turtle deck crowned up to 0.3 m forward; keel 0.25 m down at the
       transom, the STEP at d 9.4 (keel -0.68 -> -0.85), deepest 0.91 m at
       d 12 [draught 0.82], rising to the stem at the waterline
       wheelhouse d 6.2 - 10.0, roof 2.1 m; MG ring on it at d 7.24 (r 0.4)
       forward MG ring d 14.09 (r 0.48), ring top 1.6 m
       troughs d 0 - 4.9, two side by side, 1.26 m together
       three smoke bottles athwartships d 5.0 - 6.2; mast d 8.5 to 3.77 m
       rudder d -0.6 .. 0 to 0.78 m down; screws d 1.3 - 1.5, 0.95 m down
     RECOGNITION LIST: 1 low stepped planing hull with a turtle-back deck
       and a narrow, tapered transom [GD][GK]; 2 the two open torpedo troughs
       aft with the torpedoes in them and the launch rails over the transom
       [GD]; 3 the small rounded wheelhouse with a raked, faceted windscreen
       and the MG ring on its roof [GD][GK]; 4 the forward DShK on its ring
       [GD]; 5 the smoke bottles, cowl vents, deck hatch [GD]; 6 two screws,
       one rudder [GD].
     NOT CONFIRMED: the KPA paint (drawn as [GD]/[GK] light grey, red
       underbody - no photograph of a Korean boat); the section shape between
       chine and keel (the drawing has no body plan: a shallow V with a chine
       just under the waterline is drawn); the deck crown (from the profile's
       centre-line deck against the edge); the cowl-vent heads (two drawn, as
       [GD] profile); both torpedoes loaded ([GD] draws one in its trough and
       the second beside the plan).  Torpedo colour drawn dark metal, not
       [GD]'s green.  No ensign on the staff.
     TURRET: the row's first weapon is the DShK; the forward DShK on its ring
       (d 14.09) is the "turret", trained ahead.  The wheelhouse DShK is baked,
       trained aft and elevated as [GD] draws it.
     ==================================================================== */
  var G5 = (function () {
    var XO = -8.0;                                    /* model x = d + XO: rails' end -9.52, stem +9.52 */
    function X(d) { return d + XO; }
    var ZD = [[0, 0.84], [4.5, 0.89], [10, 0.98], [14, 1.05], [17.52, 1.21]];
    var CR = [[0, 0.04], [5, 0.08], [9, 0.2], [12, 0.3], [15, 0.26], [16.8, 0.12], [17.52, 0.0]];
    var HB = [[0, 0.98], [1, 1.08], [2, 1.18], [3, 1.29], [4, 1.37], [6, 1.56], [8, 1.68], [10, 1.74], [12, 1.74],
              [13, 1.7], [14, 1.66], [15.13, 1.55], [15.63, 1.45], [16.13, 1.3], [16.64, 1.06], [17.14, 0.64], [17.52, 0.03]];
    var KZ = [[0, -0.25], [2, -0.2], [4, -0.26], [6, -0.42], [8, -0.6], [9.39, -0.68], [9.41, -0.85], [10, -0.86],
              [12, -0.91], [14, -0.88], [15.6, -0.84], [16.1, -0.77], [16.6, -0.63], [17.1, -0.37], [17.52, 0.0]];
    var CZ = [[0, -0.06], [12, -0.08], [15.6, -0.02], [16.6, 0.12], [17.52, 0.3]];
    function zD(d) { return tbl(ZD, d); }
    function hB(d) { return tbl(HB, d); }
    function half(x) {
      var d = x - XO, zd = zD(d), hb = hB(d), zk = tbl(KZ, d), zc = Math.max(tbl(CZ, d), zk + 0.05);
      var hc = hb * lerp(0.97, 0.9, clamp((d - 14) / 3.5, 0, 1));
      return [[hb, zd], [hb * 0.995, lerp(zd, zc, 0.5)], [hc, zc], [hc * 0.62, lerp(zc, zk, 0.62)], [hc * 0.2, lerp(zc, zk, 0.93)], [0, zk]];
    }
    function zmid(x) { var d = x - XO; return (zD(d) + tbl(KZ, d)) / 2; }

    /* a DShK on a pintle, local frame: ring at the origin, barrel along +X, elevation el */
    function dshk(B, P, f, el, yaw) {
      var ce = Math.cos(el), se = Math.sin(el), cy = Math.cos(yaw || 0), sy = Math.sin(yaw || 0);
      function L(a, z) { return [P[0] + f * a * cy, P[1] + f * a * sy, P[2] + z]; }
      cyl(B.metal, L(0, 0), L(0, 0.55), 0.05, 0.05, 6);                          /* pintle */
      var piv = L(0, 0.6);
      function A(a, z) { return [piv[0] + f * cy * (a * ce - z * se), piv[1] + f * sy * (a * ce - z * se), piv[2] + a * se + z * ce]; }
      cyl(B.metal, A(-0.45, 0), A(0.25, 0), 0.07, 0.07, 6);                      /* receiver */
      cyl(B.metal, A(0.25, 0), A(1.25, 0), 0.03, 0.03, 6);                       /* barrel */
      cyl(B.metal, A(0.55, 0), A(0.85, 0), 0.05, 0.05, 6);                       /* the finned part */
      cyl(B.dark, A(1.15, 0), A(1.3, 0), 0.045, 0.045, 6);                       /* muzzle brake */
      obox(B.metal, A(-0.1, 0), unit([f * cy * ce, f * sy * ce, se]), [-sy, cy, 0], unit([-f * cy * se, -f * sy * se, ce]), -0.02, 0.02, -0.2, 0.2, 0.05, 0.35); /* shield plate */
    }

    function build(THREE, M, C) {
      var MB = makeBins(THREE, C, { hull: 0xa8a897, sup: 0xb2b2a2, deck: 0x9a9a8a, under: 0x7a2a22, btop: 0xd8d8cc });
      var B = MB.fresh(), TB = MB.fresh(), g = new THREE.Group(), i, s, d;
      var xs = [], dd = [0, 0.5, 1, 2, 3, 4, 4.9, 6, 7, 8, 9, 9.39, 9.41, 10, 11, 12, 13, 14, 14.6, 15.13, 15.63, 16.13, 16.4, 16.64, 16.9, 17.14, 17.35, 17.52];
      for (i = 0; i < dd.length; i++) xs.push(X(dd[i]));
      hullLoft(B, xs, half, zmid, function (x) { return tbl(CR, x - XO); },
               function (x) { return x - XO < 4.9 ? 0.66 : 0; }, 0.07);   /* [GD]'s white boot line */

      /* torpedo troughs d 0 - 4.9 [GD plan]: floor 0.55 below the deck, an inner divider, the torpedoes */
      var zt = zD(2) - 0.55;
      box(B.dark, X(0), X(4.9), -0.66, 0.66, zt - 0.04, zt);
      box(B.hull, X(4.9) - 0.04, X(4.9), -0.66, 0.66, zt, zD(4.9) + 0.06);       /* forward end of the troughs */
      for (s = -1; s <= 1; s += 2) box(B.hull, X(0), X(4.9), s * 0.66 - 0.02, s * 0.66 + 0.02, zt, zD(2));
      box(B.hull, X(0), X(4.9), -0.02, 0.02, zt, zD(2) - 0.08);
      for (s = -1; s <= 1; s += 2) {
        var yt = s * 0.33, zc = zt + 0.27;
        cyl(B.metal, [X(-0.18), yt, zc], [X(4.85), yt, zc], 0.267, 0.267, 12);
        cyl(B.metal, [X(-0.29), yt, zc], [X(-0.18), yt, zc], 0.08, 0.2, 8);     /* tail cone */
        for (i = 0; i < 4; i++) {                                                 /* tail fins */
          var a = i / 4 * TAU + PI / 4;
          obox(B.metal, [X(-0.25), yt, zc], [1, 0, 0], [0, Math.cos(a), Math.sin(a)], [0, -Math.sin(a), Math.cos(a)], 0, 0.3, 0, 0.3, -0.01, 0.01);
        }
      }
      /* launch rails over the transom [GD]: three bars at deck level, braces down to a lower bar */
      for (i = -1; i <= 1; i++) {
        var yr = i * 0.77;
        box(B.metal, X(-1.52), X(0.1), yr - 0.03, yr + 0.03, zD(0) - 0.05, zD(0) + 0.02);
        if (i !== 0) cyl(B.metal, [X(-0.6), yr, 0.02], [X(-0.05), yr, zD(0) - 0.05], 0.03, 0.03, 4);
      }
      box(B.metal, X(-0.6), X(0.05), -0.8, 0.8, -0.02, 0.04);
      for (s = -1; s <= 1; s += 2) cyl(B.metal, [X(-1.52), s * 0.77, zD(0)], [X(-1.2), s * 0.4, zD(0)], 0.02, 0.02, 3);
      /* ensign staff at the transom (bare) */
      cyl(B.metal, [X(-0.55), 0, zD(0)], [X(-0.8), 0, 2.36], 0.025, 0.015, 4);

      /* smoke bottles athwartships d 5.0 - 6.2 [GD] */
      [[5.25, 0.25], [5.68, 0.25], [6.05, 0.17]].forEach(function (b) {
        var zc = zD(b[0]) + 0.1 + b[1];
        cyl(B.sup, [X(b[0]), -0.6, zc], [X(b[0]), 0.6, zc], b[1], b[1], 12);
      });
      for (s = -1; s <= 1; s += 2) cyl(B.metal, [X(5.0), s * 0.62, zD(5) + 0.1], [X(6.2), s * 0.62, zD(6) + 0.1], 0.03, 0.03, 4);

      /* wheelhouse d 6.2 - 10.0 [GD]: pointed aft, rounded sides, raked faceted front, roof 2.1 */
      (function () {
        var st = [[6.15, 0.05, 1.2], [6.5, 0.42, 1.75], [7.0, 0.62, 2.02], [7.6, 0.75, 2.1], [8.6, 0.86, 2.11],
                  [9.3, 0.86, 2.11], [9.6, 0.74, 2.0], [9.85, 0.55, 1.7], [10.0, 0.4, 1.35]];
        var rings = st.map(function (p) {
          var x = X(p[0]), w = p[1], zt2 = p[2], zb = zD(p[0]) - 0.05 + tbl(CR, p[0]) * 0.6, R = [], k;
          var rr = Math.min(0.35, w * 0.6, (zt2 - zb) * 0.5);
          R.push([x, -w, zb], [x, w, zb]);
          for (k = 0; k <= 3; k++) { var t = k / 3 * PI / 2; R.push([x, w - rr * (1 - Math.cos(t)), zt2 - rr * (1 - Math.sin(t))]); }
          for (k = 0; k <= 3; k++) { var t2 = k / 3 * PI / 2; R.push([x, -w + rr * (1 - Math.sin(t2)), zt2 - rr * (1 - Math.cos(t2))]); }
          return R;
        });
        loft(B.sup, rings);
      })();
      /* windscreen panels on the front facets and side windows [GD] */
      obox(B.glass, [X(9.62), 0, 2.0], unit([0.55, 0, -0.84]), [0, 1, 0], unit([0.84, 0, 0.55]), 0, 0.42, -0.42, 0.42, -0.02, 0.03);
      for (s = -1; s <= 1; s += 2) {
        obox(B.glass, [X(9.55), s * 0.74, 2.0], unit([0.45, -s * 0.55, -0.7]), unit([0.6, s * 0.8, 0]), unit([0.6, 0, 0.8]), 0, 0.42, -0.12, 0.12, -0.02, 0.03);
        box(B.glass, X(8.4), X(9.1), s * 0.86 - 0.02, s * 0.86 + 0.02, 1.8, 2.0);
        box(B.glass, X(7.6), X(8.1), s * 0.8 - 0.02, s * 0.8 + 0.02, 1.8, 1.98);
        box(B.dark, X(7.1), X(7.5), s * 0.7 - 0.02, s * 0.7 + 0.02, 1.45, 1.95);   /* side hatch */
      }
      /* the MG ring on the roof d 7.24 [GD], the DShK trained aft and up [GD profile] */
      cylZ(B.sup, X(7.24), 0, 2.08, 2.26, 0.42, 16);
      cylZ(B.dark, X(7.24), 0, 2.26, 2.28, 0.34, 16);
      dshk(B, [X(7.24), 0, 2.28], -1, 0.62, 0.35);
      /* roof fittings: sight / searchlight and lamp [GD] */
      cylZ(B.metal, X(8.9), 0.3, 2.11, 2.35, 0.08, 8);
      cylZ(B.metal, X(9.15), -0.2, 2.11, 2.25, 0.1, 8);
      box(B.metal, X(9.3), X(9.7), 0.35, 0.45, 2.11, 2.2);
      /* mast d 8.5 to 3.77 m [GD], stays to the bow staff */
      cyl(B.metal, [X(8.49), 0, 2.11], [X(8.49), 0, 3.77], 0.035, 0.02, 5);
      cyl(B.metal, [X(8.49), 0, 3.7], [X(17.3), 0, 2.85], 0.006, 0.006, 3);
      /* bow staff [GD] */
      cyl(B.metal, [X(17.2), 0, zD(17.2) + 0.05], [X(17.32), 0, 2.87], 0.03, 0.015, 4);

      /* engine-room hatch panel d 10.35 - 13.4 [GD plan] with four round vents and two cowls */
      (function () {
        var x0 = X(10.35), x1 = X(13.4), zb = zD(11.5) + tbl(CR, 11.5) - 0.02;
        box(B.sup, x0, x1, -0.63, 0.63, zb, zb + 0.07);
        box(B.dark, x0 + 0.25, x1 - 0.25, -0.02, 0.02, zb + 0.07, zb + 0.08);
        [[11.57, 0.38], [12.27, 0.38], [10.95, -0.38], [11.66, -0.38]].forEach(function (v) {
          cylZ(B.sup, X(v[0]), v[1], zb, zb + 0.18, 0.13, 10);
          cylZ(B.dark, X(v[0]), v[1], zb + 0.18, zb + 0.19, 0.1, 10);
        });
      })();
      [[12.9, 0.4], [14.35, -0.45]].forEach(function (v) {                        /* cowl vents [GD profile] */
        var z0 = zD(v[0]) + tbl(CR, v[0]) * 0.7;
        cyl(B.sup, [X(v[0]), v[1], z0], [X(v[0]), v[1], 1.75], 0.09, 0.09, 8);
        ellipsoid(B.sup, [X(v[0]) + 0.04, v[1], 1.8], 0.17, 0.14, 0.12, 4, 10);
        box(B.dark, X(v[0]) + 0.18, X(v[0]) + 0.21, v[1] - 0.08, v[1] + 0.08, 1.72, 1.86);
      });
      /* bow: hatch, cleats, fairleads, rubbing strakes [GD] */
      box(B.sup, X(15.6), X(16.1), -0.18, 0.18, zD(15.8) + tbl(CR, 15.8) - 0.02, zD(15.8) + tbl(CR, 15.8) + 0.06);
      for (s = -1; s <= 1; s += 2) {
        [[16.5, 0.95], [1.1, 0.85], [3.6, 1.1]].forEach(function (c) {
          box(B.metal, X(c[0]) - 0.12, X(c[0]) + 0.12, s * c[1] - 0.04, s * c[1] + 0.04, zD(c[0]) + 0.02, zD(c[0]) + 0.1);
        });
        /* the rubbing strakes along the sides d 5.05 - 12.8 at z 0.16 and the sheer strake [GD] */
        for (d = 5.05; d < 12.8; d += 1.25) {
          var dn = Math.min(12.8, d + 1.25);
          cyl(B.sup, [X(d), s * (hB(d) + 0.02), 0.16], [X(dn), s * (hB(dn) + 0.02), 0.16], 0.04, 0.04, 4);
        }
      }

      /* the detail pass [GD]: the long grab rails on short legs along both sides of the deck and on the
         foredeck, the twin bitts aft and forward, the deck fittings ahead of the engine hatch, the running
         lights on the wheelhouse sides, the roof hatch */
      for (s = -1; s <= 1; s += 2) {
        [[5.6, 13.9], [14.8, 16.7]].forEach(function (r) {
          var P2 = [], dq;
          for (dq = r[0]; dq <= r[1] + 1e-6; dq += (r[1] - r[0]) / Math.max(1, Math.round((r[1] - r[0]) / 1.2))) P2.push([X(dq), s * (hB(dq) - 0.32), zD(dq) + tbl(CR, dq) * 0.25]);
          for (var q = 0; q < P2.length; q++) box(B.metal, P2[q][0] - 0.02, P2[q][0] + 0.02, P2[q][1] - 0.02, P2[q][1] + 0.02, P2[q][2] - 0.02, P2[q][2] + 0.14);
          for (q = 0; q + 1 < P2.length; q++) cyl(B.metal, [P2[q][0], P2[q][1], P2[q][2] + 0.14], [P2[q + 1][0], P2[q + 1][1], P2[q + 1][2] + 0.14], 0.018, 0.018, 4);
        });
        [1.0, 3.4].forEach(function (dq) { bitts(B.metal, X(dq), s * (hB(dq) - 0.22), zD(dq), 0.05); });
        bitts(B.metal, X(16.0), s * 0.62, zD(16.0) + tbl(CR, 16.0) * 0.5, 0.05);
        box(B.metal, X(9.45), X(9.65), s * 0.75 - 0.05, s * 0.75 + 0.05, 1.75, 1.88);          /* running lights */
        box(B.glass, X(9.62), X(9.67), s * 0.75 - 0.04, s * 0.75 + 0.04, 1.77, 1.86);
      }
      [[13.3, 0.42], [14.0, 0.42], [14.25, 0.36]].forEach(function (v) { var zv = zD(v[0]) + tbl(CR, v[0]) * 0.8; cylZ(B.metal, X(v[0]), v[1], zv - 0.03, zv + 0.06, 0.07, 8); });
      box(B.sup, X(7.9), X(8.35), -0.25, 0.25, 2.11, 2.16);                                       /* roof hatch */
      box(B.metal, X(7.95), X(8.3), -0.2, 0.2, 2.16, 2.18);

      /* underwater [GD]: two shafts, struts, two 3-blade screws, one rudder */
      for (s = -1; s <= 1; s += 2) {
        var ys = s * 0.48, zs = -0.62;
        cyl(B.metal, [X(1.3), ys, zs], [X(5.5), ys * 0.8, -0.33], 0.035, 0.035, 6);
        cyl(B.metal, [X(1.85), ys, zs + 0.02], [X(1.85), ys * 0.9, tbl(KZ, 1.85) + 0.05], 0.03, 0.03, 4);
        cyl(B.metal, [X(1.15), ys, zs], [X(1.35), ys, zs], 0.04, 0.07, 6);
        for (i = 0; i < 3; i++) {
          var an = i / 3 * TAU + 0.4 * s, cyy = Math.cos(an), czz = Math.sin(an);
          var tv = unit([0.45, -czz * 0.9, cyy * 0.9]), tu = cross(tv, [0, cyy, czz]);
          obox(B.metal, [X(1.25), ys, zs], tu, tv, [0, cyy, czz], -0.015, 0.015, -0.08, 0.08, 0.05, 0.3);
        }
      }
      box(B.under, X(-0.6), X(-0.05), -0.04, 0.04, -0.78, -0.05);
      cyl(B.metal, [X(-0.1), 0, -0.6], [X(0.05), 0, -0.25], 0.03, 0.03, 4);

      /* team: two strips on the wheelhouse roof and the engine hatch */
      box(B.team, X(8.3), X(9.2), -0.4, 0.4, 2.11, 2.13);
      box(B.team, X(12.6), X(13.2), -0.5, 0.5, zD(11.5) + tbl(CR, 11.5) + 0.05, zD(11.5) + tbl(CR, 11.5) + 0.07);

      /* the turret: the forward DShK ring d 14.09 [GD], ring top 1.6 m, trained ahead and elevated */
      var zr = zD(14.09) + tbl(CR, 14.09);
      cylZ(B.sup, X(14.09), 0, zr - 0.05, 1.52, 0.5, 18);
      cylZ(B.dark, X(14.09), 0, 1.52, 1.54, 0.42, 18);
      var tw = new THREE.Group(); tw.name = "turret"; tw.position.set(X(14.09), 0, 1.54);
      cylZ(TB.sup, 0, 0, 0, 0.06, 0.46, 18);
      box(TB.metal, -0.08, 0.08, -0.46, 0.46, 0.02, 0.06);
      dshk(TB, [0, 0, 0.06], 1, 0.5, 0);
      flush(THREE, g, B);
      flush(THREE, tw, TB);
      g.add(tw);
      return g;
    }
    return { build: build, L: 19.04 };
  })();

  /* ======================================================================
     NAJIN-CLASS FRIGATE -- kpa_e60_corvette, kpa_e90_corvette
     North Korea's largest warships from 1973 to 2025: two hulls, a coastal
     gun frigate.  ONE photograph exists on Commons and the whole model is
     read off it.

     PUBLISHED (en.wikipedia "Najin-class frigate", Jane's 1983): length 328
       ft (100.0 m), beam 32.8 ft (10.0 m), draught 8.9 ft (2.7 m), 1,600 t;
       2 x 100 mm/56 single, 4 x 57 mm (twin), 30 mm and 25 mm twins, two
       SS-N-2 Styx, RBU-1200, depth-charge projectors and racks; radars Square
       Tie, Pot Head, Pot Drum, Drum Tilt; 2 shafts.
     REFERENCE (Commons, scratchpad q_kpaship_ref):
       [P] "North Korean Navy corvette.jpg" (US DoD, 1993, aerial PORT BEAM view
           of hull 531 underway, bow left), fetched at 1600 px.  Stem head at
           x 52, transom at x 1552: 1500 px = 100 m, so 15.0 px/m along the
           ship; d below = metres aft of the stem = (px - 52) / 15.  The
           camera looks down about 25 deg (sin from the 56 px quarterdeck
           width, checked on the two funnel caps whose ovals give 0.46 and
           0.49), so heights read at 15 x cos 25 = 13.6 px/m and a centre-line
           point sits 0.42 x 15 = 6.3 px per metre of half-breadth above the
           near deck edge.  Heights below are above the waterline (WL) or the
           deck, read that way.
     MEASURED off [P] (published in brackets):
       stem head d 0 at 4.9 m (the centre line of the deck against the
       waterline centre line), stem foot at the waterline d 4.0; deck 4.1 m
       at d 6.5, 3.4 at d 12.5, about 2.5 amidships and aft (near-side
       freeboard 33 - 36 px); beam: 5.9 m at d 7.2, 8.9 m on the
       quarterdeck, transom about 7.5 m [beam 10.0, used amidships];
       draught [2.7, published, not visible] -- the keel is drawn to it.
       breakwater, curved, apex d 13, ends d 16.5 at the deck edge
       A gun (100 mm) box shield d 19.2 - 22.7, roof 2.9 m over the deck
       B mount (57 mm twin) d 23.5 - 27.8, raised, dome top 4.0 m over deck
       superstructure from d 30.5: 01 level 2.3 m, 02 roof 4.6 m; the
       bridge / director box d 33.3 - 35.8 to 8.9 m over the deck
       lattice mast d 39.2 - 40.5 on the 02 roof, top 18.8 m over the deck
       funnel 1 d 41.5 - 45.0, cap 6.1 m over the deck, oval 3.5 x 4.0 m
       domed twin mounts d 47 - 49 and d 66.3 - 68.3
       SS-N-2 launcher box at the deck edge d 50.5 - 58.5, 2.8 m tall, the
       sloped muzzle end forward
       director tower with a ball radome d 56.5, ball top 9.8 m over deck
       funnel 2 d 61.1 - 64.7, cap 5.8 m over the deck
       box d 68.3 - 71.7 on the after deckhouse
       X mount (57 mm twin) d 72.5 - 76.5, raised, top 4.1 m, trained ahead
       Y gun (100 mm) d 78.5 - 83.2, top 3.5 m, trained ASTERN, barrel to
       d 87.6
       stern racks d 93 - 99.6, flat wide transom
     RECOGNITION LIST: 1 long flush hull with a sheer rising to a raked stem
       and a wide transom [P]; 2 two single 100 mm in box shields fore and
       aft, each with a raised 57 mm twin inboard of it [P]; 3 the tall bridge
       block and lattice mast with radar platforms [P]; 4 TWO short oval
       funnels with dark caps [P]; 5 the Styx box at the deck edge abreast
       the ball-radome director [P]; 6 domed AA twins on the deckhouses [P];
       7 breakwater, windlass, depth-charge racks [P].
     NOT CONFIRMED (one photograph, one side, 1993):
       - every height carries the 25 deg camera-angle reduction: +/- 0.5 m;
       - the forward 100 mm shows no barrel in [P] (trained away from the
         camera or masked); it is drawn trained ahead with the barrel of the
         after gun, which [P] does show;
       - the starboard side is not seen: the Styx box, the domed twins and
         the racks are mirrored to starboard by symmetry;
       - the radar heads on the mast are drawn as the platforms and plain
         shapes [P] shows, not identified one by one (Square Tie / Pot Head /
         Pot Drum are named by Jane's but not resolved in [P]);
       - the underwater body (draught published; sections, two shafts and
         rudders drawn plainly), boot colour;
       - paint: [P] is black and white; a light grey hull and houses and a
         grey deck are drawn; the hull number is not drawn.
     ROWS: e60 (service 1973) and e90 ("Unchanged") are drawn as [P] shows
       the ship in 1993; the 1970s as-built fit has no reference and is not
       drawn separately.  The 2014 refit (AK-630s, Kh-35 racks) is not drawn.
     TURRET: the row's first weapon is "2x 100mm": the forward 100 mm (A gun)
       is the group named "turret".
     ==================================================================== */
  var NAJIN = (function () {
    function X(d) { return 50 - d; }                  /* d = metres aft of the stem head */
    var ZD = [[0, 4.9], [3, 4.8], [6.5, 4.1], [12.5, 3.4], [20, 2.9], [30, 2.6], [45, 2.5], [80, 2.5], [100, 2.6]];
    var HB = [[0, 0.1], [3, 1.6], [7.2, 2.95], [12, 3.9], [20, 4.6], [30, 5.0], [70, 5.0], [85, 4.7], [95, 4.2], [100, 3.75]];
    var HW = [[4.0, 0.0], [8, 1.8], [14, 3.3], [22, 4.3], [30, 4.75], [70, 4.75], [85, 4.45], [95, 3.9], [100, 3.4]];
    var KZ = [[0, 4.9], [4.0, 0.0], [6, -1.6], [9, -2.4], [12, -2.7], [86, -2.7], [94, -1.9], [100, -0.45]];
    function zD(d) { return tbl(ZD, d); }
    function hB(d) { return tbl(HB, d); }
    function half(x) {
      var d = 50 - x, zd = zD(d), hb = hB(d), zk = tbl(KZ, d), hw = tbl(HW, d);
      if (zk >= 0) {                                 /* the raked stem above the waterline */
        var P = [], k;
        for (k = 0; k < 7; k++) { var t = k / 6; P.push([hb * (1 - Math.pow(t, 1.4)), lerp(zd, zk, t)]); }
        return P;
      }
      return [[hb, zd], [lerp(hb, hw, 0.5), zd * 0.5], [hw, 0], [hw * 0.97, zk * 0.45], [hw * 0.82, zk * 0.82], [hw * 0.45, zk * 0.98], [0, zk]];
    }
    function zmid(x) { var d = 50 - x; return (zD(d) + Math.min(tbl(KZ, d), 0)) / 2; }

    /* 100 mm single in a box shield [P]: local frame, gun along +X */
    function gun100(B, P, f) {
      function L(a, y, z) { return [P[0] + f * a, P[1] + f * y, P[2] + z]; }
      cylZ(B.sup, P[0], P[1], P[2], P[2] + 0.3, 1.5, 18);
      var V = [L(-1.9, -1.6, 0.3), L(1.2, -1.6, 0.3), L(1.2, 1.6, 0.3), L(-1.9, 1.6, 0.3),
               L(-1.9, -1.45, 2.85), L(0.75, -1.45, 2.85), L(0.75, 1.45, 2.85), L(-1.9, 1.45, 2.85)];
      hexa(B.sup, V);
      obox(B.dark, L(1.18, 0, 0), [f, 0, 0], [0, f, 0], [0, 0, 1], -0.02, 0.04, -0.28, 0.28, 0.9, 2.0);   /* embrasure */
      cyl(B.metal, L(0.9, 0, 1.45), L(5.6, 0, 1.6), 0.14, 0.1, 10);
      cyl(B.metal, L(5.3, 0, 1.59), L(5.75, 0, 1.6), 0.13, 0.13, 10);
      cylZ(B.sup, P[0] - f * 0.8, P[1] + f * 0.8, P[2] + 2.85, P[2] + 3.1, 0.3, 10);  /* sight cupola */
      obox(B.sup, L(-1.95, 0, 0), [f, 0, 0], [0, f, 0], [0, 0, 1], -0.25, 0, -1.2, 1.2, 0.6, 2.6);
    }
    /* twin 57 mm in a domed turret [P]: drum, dome, front plate, two barrels */
    function gun57(B, P, f, el) {
      cylZ(B.sup, P[0], P[1], P[2], P[2] + 1.15, 1.45, 18);
      ellipsoid(B.sup, [P[0], P[1], P[2] + 1.15], 1.45, 1.45, 0.75, 4, 18, 0, PI / 2);
      var ce = Math.cos(el), se = Math.sin(el), i;
      obox(B.sup, [P[0] + f * 1.2, P[1], P[2]], [f, 0, 0], [0, 1, 0], [0, 0, 1], -0.2, 0.25, -0.9, 0.9, 0.3, 1.55);
      for (i = -1; i <= 1; i += 2) {
        var A0 = [P[0] + f * 1.3, P[1] + i * 0.35, P[2] + 1.0];
        cyl(B.metal, A0, [A0[0] + f * 4.1 * ce, A0[1], A0[2] + 4.1 * se], 0.075, 0.06, 8);
        cyl(B.metal, [A0[0] + f * 3.8 * ce, A0[1], A0[2] + 3.8 * se], [A0[0] + f * 4.15 * ce, A0[1], A0[2] + 4.15 * se], 0.09, 0.09, 8);
      }
    }
    /* domed AA twin [P] */
    function domeTwin(B, x, y, z, f) {
      cylZ(B.sup, x, y, z, z + 0.7, 0.9, 14);
      ellipsoid(B.sup, [x, y, z + 0.7], 0.9, 0.9, 0.6, 3, 14, 0, PI / 2);
      for (var i = -1; i <= 1; i += 2) cyl(B.metal, [x + f * 0.7, y + i * 0.2, z + 0.9], [x + f * 2.6, y + i * 0.2, z + 1.3], 0.04, 0.035, 6);
    }
    /* oval funnel with dark cap [P] */
    function funnel(B, d0, d1, w, zb, zt) {
      var xc = X((d0 + d1) / 2), hl = (d1 - d0) / 2, k, R0 = [], R1 = [], R2 = [];
      for (k = 0; k < 20; k++) {
        var t = k / 20 * TAU, c = Math.cos(t), s = Math.sin(t);
        R0.push([xc + hl * c, w / 2 * s, zb]);
        R1.push([xc + hl * c * 0.97, w / 2 * s * 0.97, zt - 0.6]);
        R2.push([xc + hl * c * 0.96, w / 2 * s * 0.96, zt]);
      }
      loft(B.sup, [R0, R1]);
      loft(B.dark, [R1, R2]);
    }

    function build(THREE, M, C) {
      var MB = makeBins(THREE, C, { hull: 0x8f9593, sup: 0x9ba19f, deck: 0x7d8280, under: 0x3a2826 });
      var B = MB.fresh(), TB = MB.fresh(), g = new THREE.Group(), s, i, d;
      var dd = [100, 99, 97, 94, 90, 86, 80, 70, 60, 50, 40, 30, 24, 20, 16, 12.5, 10, 8, 6.5, 5, 4.0, 3, 2, 1, 0.3, 0];
      var xs = dd.map(X);
      hullLoft(B, xs, half, zmid, function () { return 0.12; });
      /* boot topping band at the waterline */
      for (s = -1; s <= 1; s += 2) for (i = 0; i + 1 < dd.length; i++) {
        var da = dd[i], db = dd[i + 1];
        if (da < 4.5 || db < 4.5) continue;
        var ya = tbl(HW, da) + 0.015, yb = tbl(HW, db) + 0.015;
        hexa(B.dark, [[X(da), s * ya, -0.25], [X(db), s * yb, -0.25], [X(db), s * (yb - 0.05), -0.25], [X(da), s * (ya - 0.05), -0.25],
                      [X(da), s * (ya + 0.03), 0.25], [X(db), s * (yb + 0.03), 0.25], [X(db), s * (yb - 0.05), 0.25], [X(da), s * (ya - 0.05), 0.25]]);
      }
      function dz(dq) { return zD(dq) + 0.1; }

      /* ---- forecastle [P]: windlass and chain pipes, bollards, breakwater */
      for (s = -1; s <= 1; s += 2) {
        cylZ(B.metal, X(7.8), s * 0.75, dz(7.8), dz(7.8) + 0.45, 0.32, 10);
        box(B.dark, X(5.2), X(7.4), s * 0.75 - 0.08, s * 0.75 + 0.08, dz(6.3), dz(6.3) + 0.08);
        cylZ(B.metal, X(10.2), s * 2.6, dz(10.2), dz(10.2) + 0.35, 0.14, 8);
        cylZ(B.metal, X(10.8), s * 2.6, dz(10.8), dz(10.8) + 0.35, 0.14, 8);
      }
      box(B.sup, X(9.6), X(8.6), -0.6, 0.6, dz(9), dz(9) + 0.6);                   /* windlass housing */
      (function () {                                                                /* curved breakwater d 13 - 16.5 */
        var k, P0 = [], n = 8;
        for (k = 0; k <= n; k++) {
          var t = -1 + 2 * k / n, dq = 13 + 3.5 * t * t, yq = t * (hB(dq) - 0.2);
          P0.push([X(dq), yq]);
        }
        for (k = 0; k < n; k++) {
          var a = P0[k], b = P0[k + 1], za = zD(50 - a[0]) + 0.05, zb2 = zD(50 - b[0]) + 0.05;
          hexa(B.hull, [[a[0], a[1], za], [b[0], b[1], zb2], [b[0] - 0.08, b[1], zb2], [a[0] - 0.08, a[1], za],
                        [a[0], a[1], za + 0.95], [b[0], b[1], zb2 + 0.95], [b[0] - 0.08, b[1], zb2 + 0.95], [a[0] - 0.08, a[1], za + 0.95]]);
        }
      })();
      cyl(B.metal, [X(0.6), 0, dz(0.6)], [X(0.9), 0, dz(0.6) + 2.0], 0.04, 0.025, 5);  /* jack staff */

      /* ---- A gun ring (the turret goes on it) and B mount on its platform [P] */
      var zA = dz(21.0);
      gun57(B, [X(25.7), 0, dz(25.7) + 1.6], 1, 0.12);
      box(B.sup, X(28.0), X(23.6), -1.9, 1.9, dz(25.7) - 0.1, dz(25.7) + 1.6);         /* B platform */

      /* ---- the bridge block [P] d 30.5 - 47: 01 level 2.3 m, 02 roof 4.6 m, bridge box to 8.9 m */
      var z0 = zD(38) + 0.08;
      function slab(bin, d0, d1, hw, zb, zt, tap) {
        var t = tap === undefined ? 0.08 : tap;
        hexa(bin, [[X(d1), -hw, zb], [X(d0), -hw, zb], [X(d0), hw, zb], [X(d1), hw, zb],
                   [X(d1), -hw + t, zt], [X(d0) - t, -hw + t, zt], [X(d0) - t, hw - t, zt], [X(d1), hw - t, zt]]);
      }
      slab(B.sup, 30.5, 47.5, 4.3, z0 - 0.3, z0 + 2.3);                                /* 01 level */
      slab(B.sup, 31.5, 46.5, 3.4, z0 + 2.3, z0 + 4.6);                                /* 02 level */
      slab(B.sup, 32.6, 39.0, 2.6, z0 + 4.6, z0 + 7.0, 0.3);                           /* wheelhouse */
      slab(B.sup, 33.3, 35.8, 1.3, z0 + 7.0, z0 + 8.9, 0.1);                           /* director box */
      box(B.dark, X(33.35), X(33.25), -1.0, 1.0, z0 + 7.6, z0 + 8.4);
      for (s = -1; s <= 1; s += 2) {
        box(B.sup, X(33.4), X(32.6), s * 2.6, s * 3.9, z0 + 6.8, z0 + 7.0);           /* bridge wings */
        box(B.sup, X(33.4), X(33.3), s * 2.6, s * 3.9, z0 + 7.0, z0 + 7.9);
        for (i = 0; i < 6; i++) box(B.dark, X(36.6 + i * 1.6), X(36.4 + i * 1.6), s * 4.32 - 0.02, s * 4.32 + 0.02, z0 + 0.4, z0 + 1.9);   /* vent slots */
        for (i = 0; i < 5; i++) box(B.dark, X(39.6 + i * 1.3), X(39.45 + i * 1.3), s * 3.42 - 0.02, s * 3.42 + 0.02, z0 + 2.7, z0 + 4.3);
        box(B.dark, X(32.0), X(31.2), s * 4.32 - 0.02, s * 4.32 + 0.02, z0, z0 + 1.8);  /* doors */
      }
      for (i = -2; i <= 2; i++) box(B.glass, X(32.6) + 0.02, X(32.6) + 0.06, i * 0.95 - 0.38, i * 0.95 + 0.38, z0 + 6.0, z0 + 6.6);
      /* lattice mast on the 02 roof [P], radar platforms, pole */
      (function () {
        var xc = X(39.85), zb = z0 + 4.6, zt = z0 + 15.5, a0 = 1.0, a1 = 0.25, lg, bay, sg;
        for (lg = 0; lg < 4; lg++) {
          var sx = lg < 2 ? -1 : 1, sy = (lg % 2) ? -1 : 1;
          cyl(B.metal, [xc + sx * a0, sy * a0, zb], [xc + sx * a1, sy * a1, zt], 0.07, 0.05, 4);
        }
        for (bay = 0; bay < 5; bay++) {
          var f0 = bay / 5, f1 = (bay + 1) / 5, q0 = lerp(a0, a1, f0), q1 = lerp(a0, a1, f1), zz0 = lerp(zb, zt, f0), zz1 = lerp(zb, zt, f1);
          for (sg = -1; sg <= 1; sg += 2) {
            cyl(B.metal, [xc - q0, sg * q0, zz0], [xc + q1, sg * q1, zz1], 0.03, 0.03, 3);
            cyl(B.metal, [xc + sg * q0, -q0, zz0], [xc + sg * q1, q1, zz1], 0.03, 0.03, 3);
          }
        }
        [[z0 + 9.8, 1.4], [z0 + 12.2, 1.1], [z0 + 14.0, 0.9]].forEach(function (p) {
          box(B.deck, xc - p[1], xc + p[1], -p[1], p[1], p[0] - 0.08, p[0]);
        });
        /* radar heads on the platforms, plain shapes as [P] shows */
        box(B.sup, xc - 0.3, xc + 0.3, -1.6, 1.6, z0 + 15.5, z0 + 16.4);              /* the large head at the top */
        cylZ(B.sup, xc + 0.9, 0, z0 + 12.2, z0 + 12.9, 0.55, 12);
        cylZ(B.sup, xc - 0.8, 0, z0 + 9.8, z0 + 10.4, 0.5, 12);
        cyl(B.metal, [xc, 0, z0 + 16.4], [xc, 0, z0 + 18.8], 0.06, 0.03, 5);
        box(B.metal, xc - 0.04, xc + 0.04, -2.2, 2.2, z0 + 14.6, z0 + 14.68);          /* yard */
      })();
      funnel(B, 41.5, 45.0, 4.0, z0 + 4.5, zD(43) + 6.1);
      domeTwin(B, X(48), 2.6, z0 + 2.3, 1);
      domeTwin(B, X(48), -2.6, z0 + 2.3, 1);

      /* ---- midships [P]: Styx boxes at the deck edge, ball-radome director, after deckhouse, funnel 2 */
      for (s = -1; s <= 1; s += 2) {
        var yc = s * 3.55, zb3 = zD(54) + 0.1;
        hexa(B.sup, [[X(58.5), yc - 1.1, zb3], [X(51.6), yc - 1.1, zb3], [X(51.6), yc + 1.1, zb3], [X(58.5), yc + 1.1, zb3],
                     [X(58.5), yc - 1.0, zb3 + 2.8], [X(50.5), yc - 1.0, zb3 + 2.5], [X(50.5), yc + 1.0, zb3 + 2.5], [X(58.5), yc + 1.0, zb3 + 2.8]]);
        obox(B.dark, [X(51.0), yc, zb3 + 1.3], unit([0.94, 0, -0.34]), [0, 1, 0], unit([0.34, 0, 0.94]), -0.03, 0.03, -0.85, 0.85, -0.9, 0.9);
      }
      slab(B.sup, 47.5, 78.0, 2.9, z0 - 0.3, z0 + 2.3);                                 /* the after deckhouse (01) */
      (function () {
        var xc = X(56.5);
        cyl(B.sup, [xc, 0, z0 + 2.3], [xc, 0, z0 + 6.9], 0.75, 0.55, 12);
        box(B.deck, xc - 1.0, xc + 1.0, -1.0, 1.0, z0 + 6.9, z0 + 7.0);
        cylZ(B.sup, xc, 0, z0 + 7.0, z0 + 7.6, 0.45, 12);
        ellipsoid(B.sup, [xc, 0, z0 + 8.95], 0.85, 0.85, 0.85, 6, 16);
        cyl(B.metal, [xc - 0.6, 0.4, z0 + 7.0], [xc - 2.6, 0.9, z0 + 10.5], 0.04, 0.02, 4);   /* whip abaft it [P] */
      })();
      funnel(B, 61.1, 64.7, 4.0, z0 + 2.2, zD(63) + 5.8);
      domeTwin(B, X(67.3), 1.9, z0 + 2.3, 1);
      domeTwin(B, X(67.3), -1.9, z0 + 2.3, 1);
      slab(B.sup, 68.3, 71.7, 1.4, z0 + 2.3, z0 + 4.8, 0.1);                            /* the box on the after house */
      box(B.dark, X(68.35), X(68.25), -0.9, 0.9, z0 + 3.9, z0 + 4.5);
      for (s = -1; s <= 1; s += 2) for (i = 0; i < 7; i++) box(B.dark, X(50 + i * 3.6), X(49.6 + i * 3.6), s * 2.92 - 0.02, s * 2.92 + 0.02, z0 + 0.3, z0 + 1.9);

      /* ---- X mount 57 mm twin, raised, trained ahead [P]; Y gun 100 mm trained astern [P] */
      box(B.sup, X(76.6), X(72.4), -1.9, 1.9, z0 + 0.5, z0 + 2.3);
      gun57(B, [X(74.5), 0, z0 + 2.3], 1, 0.3);
      gun100(B, [X(80.8), 0, dz(80.8)], -1);

      /* ---- quarterdeck [P]: two stern racks with charges, bollards */
      for (s = -1; s <= 1; s += 2) {
        var yq = s * 2.3, zq = dz(96);
        for (i = -1; i <= 1; i += 2) box(B.metal, X(99.6), X(93.0), yq + i * 0.45 - 0.04, yq + i * 0.45 + 0.04, zq, zq + 0.55);
        for (d = 93.4; d < 99.4; d += 0.75) cyl(B.dark, [X(d), yq - 0.35, zq + 0.3], [X(d), yq + 0.35, zq + 0.3], 0.27, 0.27, 8);
        [[87.5, 0.7], [91.0, 0.6], [12.5, 0.6]].forEach(function (b) {
          cylZ(B.metal, X(b[0]), s * (hB(b[0]) - b[1]), dz(b[0]), dz(b[0]) + 0.35, 0.15, 8);
          cylZ(B.metal, X(b[0] + 0.6), s * (hB(b[0]) - b[1]), dz(b[0]), dz(b[0]) + 0.35, 0.15, 8);
        });
      }
      cyl(B.metal, [X(99.6), 0, dz(99.6)], [X(99.8), 0, dz(99.6) + 2.2], 0.04, 0.025, 5);     /* ensign staff (bare) */
      /* the lifelines run the whole length of the deck edge, past the houses as well (the detail pass) */
      rails(B, X(99.5), X(1.0), function (x) { return Math.max(0.3, hB(50 - x) - 0.15); }, function (x) { return zD(50 - x); }, 0.95);
      /* the detail pass [P]: rails round the 01 and 02 roofs and along the after deckhouse, ladders between
         the levels, life rings, raft canisters on the 01 roof, whips on the bridge wings, searchlights, the
         anchors in their hawses, scuttles forward and aft, hatches and vents, the waterway */
      roofRail(B.metal, X(47.4), X(30.6), 4.2, z0 + 2.3, 0.9, "a");
      roofRail(B.metal, X(46.4), X(39.1), 3.3, z0 + 4.6, 0.9, "f");
      for (s = -1; s <= 1; s += 2) {
        railLine(B.metal, [[X(77.8), s * 2.8, z0 + 2.3], [X(47.7), s * 2.8, z0 + 2.3]], 0.9);
        ladder(B.metal, [X(47.75), s * 3.7, zD(47.75)], [X(47.55), s * 3.7, z0 + 2.3], 0.45);
        ladder(B.metal, [X(46.65), s * 2.0, z0 + 2.3], [X(46.55), s * 2.0, z0 + 4.6], 0.45);
        ladder(B.metal, [X(78.2), s * 2.0, zD(78.2)], [X(78.05), s * 2.0, z0 + 2.3], 0.45);
        lifeRing(B.ring, X(33.4), s * 4.32, z0 + 1.2, s, 0.34);
        lifeRing(B.ring, X(75.5), s * 2.92, z0 + 1.2, s, 0.34);
        raft(B, X(45.6), s * 3.85, z0 + 2.3, false, 0.3);
        raft(B, X(32.4), s * 3.85, z0 + 2.3, false, 0.3);
        whip(B, X(33.0), s * 3.7, z0 + 7.0, 6.0, 0);
        searchlight(B, X(45.9), s * 2.6, z0 + 4.6, 1);
        anchorH(B, half, X(5.6), zD(5.6) - 0.5, s, 1.0);
        for (i = 0; i < 9; i++) { var xs2 = X(8.5 + i * 2.2); scuttleH(B, half, xs2, zD(8.5 + i * 2.2) - 1.0, s, 0.17); }
        for (i = 0; i < 5; i++) { var xs3 = X(84.5 + i * 2.2); scuttleH(B, half, xs3, zD(84.5 + i * 2.2) - 0.9, s, 0.17); }
        vent(B.sup, X(29.0), s * 3.0, dz(29.0), 0.25, 0.6);
        vent(B.sup, X(82.8), s * 3.3, dz(82.8), 0.25, 0.55);
        vent(B.sup, X(18.0), s * 2.6, dz(18.0), 0.22, 0.5);
      }
      hatch(B, X(17.6), 0, dz(17.6), 0.9, 1.0);
      hatch(B, X(88.6), 0, dz(88.6), 1.0, 1.2);
      hatch(B, X(29.4), 0, dz(29.4), 0.8, 0.8, true);
      gutter(B, half, X(99.6), X(5.0), 1.5, 0.08);

      /* ---- underwater: two shafts, brackets, screws, two rudders (published; plain) */
      for (s = -1; s <= 1; s += 2) {
        var ys = s * 2.4;
        cyl(B.metal, [X(93.5), ys, -2.1], [X(78), ys * 0.7, -2.5], 0.16, 0.16, 8);
        cyl(B.metal, [X(92.5), ys, -2.1], [X(92.5), ys * 0.6, -1.0], 0.1, 0.1, 4);
        cyl(B.metal, [X(94.2), ys, -2.1], [X(93.5), ys, -2.1], 0.2, 0.3, 8);
        for (i = 0; i < 3; i++) {
          var an = i / 3 * TAU + 0.3 * s, cy2 = Math.cos(an), cz2 = Math.sin(an);
          var tv = unit([0.45, -cz2 * 0.9, cy2 * 0.9]), tu = cross(tv, [0, cy2, cz2]);
          obox(B.metal, [X(93.9), ys, -2.1], tu, tv, [0, cy2, cz2], -0.04, 0.04, -0.35, 0.35, 0.2, 1.05);
        }
        box(B.metal, X(97.6), X(95.8), s * 2.4 - 0.08, s * 2.4 + 0.08, -2.4, -0.5);
      }

      /* ---- team: small strips on the 02 roof and the after-deckhouse roof */
      box(B.team, X(44.6), X(42.6) - 0.5, -1.0, 1.0, z0 + 4.6 + 0.002, z0 + 4.62);
      box(B.team, X(60.5), X(58.5), -1.0, 1.0, z0 + 2.3 + 0.002, z0 + 2.32);
      box(B.team, X(92.0), X(90.6), -0.8, 0.8, dz(91) + 0.002, dz(91) + 0.02);

      /* ---- the turret: A gun 100 mm at d 21.0, trained ahead */
      var tw = new THREE.Group(); tw.name = "turret"; tw.position.set(X(21.0), 0, zA);
      gun100(TB, [0, 0, 0], 1);
      flush(THREE, g, B);
      flush(THREE, tw, TB);
      g.add(tw);
      return g;
    }
    return { build: build, L: 100.0 };
  })();

  /* ======================================================================
     SANG-O-CLASS COASTAL SUBMARINE -- kpa_e90_sub
     The boat that grounded off Gangneung on 18 September 1996, now shown on
     cradles at the Gangneung unification park.

     PUBLISHED (en.wikipedia "Sang-O-class submarine"): length 34 m, beam
       3.8 m, 275 t surfaced / 370 t submerged; 1 diesel, 1 motor, 1 shaft;
       4 x 533 mm tubes (some unarmed).
     REFERENCES (Commons, scratchpad q_kpaship_ref):
       [G] "Gangneung sub 8990.jpg" (the museum boat, port bow quarter,
           2012, fetched at 1600 px; EXIF Canon 450D, 18 mm: F = 1291 px at
           1600).  THE MASTER.  The camera stands at the keel's height (the
           hull's bottom silhouette lies on the sea horizon, y 750), so the
           hull's horizontal lines run to a vanishing point on the horizon
           (casing top and paint line both meet it at x = -420).  Along the
           hull 1/(x + 420) is linear in u (metres forward of the stern):
               u(x) = (0.001618 - 1/(x + 420)) / 3.244e-5
           fixed by the rudder's trailing edge (x 198, u 0) and the nose
           (x 1522, u 34), and the vertical scale is
               s(x) = 0.0576 (x + 420) px/m
           (F, the 43 deg view angle from the vanishing point, and the slope
           above).  Checked: the paint line-to-keel height comes out 3.72,
           3.70 and 3.73 m at x 820, 900 and 1000, and the casing top 4.39 -
           4.45 m from the stern step to the bow (a level casing, as the boat
           is level on its cradles).
       [Y] "1996 NK sub.jpg" (the boat grounded in 1996, from the air, 396 px):
           the same layout and the dark-green-over-red-brown paint at sea.
     WATERLINE (surfaced trim): z = 0 is taken at the paint line, the green
       upper works over the red-brown hull, 3.72 m over the keel in [G] and
       the waterline [Y] shows at sea.  This leaves only the casing (0.70 m)
       and the fin out of the water.  NOT CONFIRMED: the published 275 / 370 t
       (a quarter reserve buoyancy) would float the boat higher; [Y] is
       aground and cannot settle it.  rule 3: not fitted, reported.
     MEASURED off [G] (u from the stern, model x = u - 17; z over the WL):
       hull a cylinder of the published 3.8 m from u 9 to 31, axis z -1.82,
       keel z -3.72; stern cone u 0.5 - 9; nose blunt and round, its front
       under the casing front at u 34.
       casing top z 0.70 (4.42 over the keel) level from u 9.3 to the bow,
       falling to z 0.30 at its after end u 4.7; flat-fronted at the bow.
       fin: after edge u 17.93, upper tower front u 22.41 (top z 3.0, the
       bridge cupola with windows forward), the lower forward step to u
       22.84 (top z 1.43).
       masts (x -> u): snorkel u 18.7 with its head box (top z 4.8), a
       second tube u 19.2 (z 4.4), a thin raked mast u 19.8 (z 4.7), a mast
       u 20.4 (z 5.3), the whip u 21.8 (z 7.1, curved).
       round antenna on a post on the casing u 27.2, centre z 1.07, r 0.26.
       the dark bow recess u 28.3 - 30.0, z -1.55 .. -2.55; the bow plane
       below it u 29.9 - 31.4 at z -2.82.
       upper rudder u 0 - 3.3 to z 1.14.
     RECOGNITION LIST: 1 short fat cylinder 34 x 3.8 m with a blunt round
       nose [G]; 2 a low level casing flat-fronted at the bow [G]; 3 the
       stepped fin forward of amidships, cupola with windows at its fore end
       [G][Y]; 4 the mast cluster: snorkel head box, tubes, whip [G]; 5 the
       bow recess and the bow plane low on the bow [G]; 6 the round antenna
       on the casing [G]; 7 the upper rudder [G]; 8 paint: dark green upper
       works over red-brown, sampled [G] (28,62,66) and (57,23,27) in dusk
       light and taken about 1.8x [G][Y].
     NOT CONFIRMED: the fin width (1.6 m) and the casing width (1.4 m) are
       not measurable in a side view; the bow-plane span (1.0 m); the lower
       rudder, the stern planes and the screw are hidden by the museum stairs
       in [G] and NOT DRAWN (published: one shaft); the forward recess is
       drawn as a dark panel, its purpose not identified; the starboard
       bow plane and recess are mirrored.  Torpedo-tube shutters are not
       visible and not drawn.  No hull number, no flag.
     ==================================================================== */
  var SANGO = (function () {
    var R = 1.9, ZA = -1.82;                                          /* hull radius, axis z */
    function X(u) { return u - 17; }
    /* hull radius along u: stern cone u 0.5 - 9, cylinder, the blunt nose u 31 - 34 */
    function rad(u) {
      if (u <= 0.5) return 0.18;
      if (u < 9) { var t = (u - 0.5) / 8.5; return 0.18 + (R - 0.18) * Math.sin(t * PI / 2); }
      if (u <= 31) return R;
      var q = (u - 31) / 3.0; return R * Math.sqrt(Math.max(0, 1 - Math.pow(q, 2.6)));
    }
    function build(THREE, M, C) {
      var MB = makeBins(THREE, C, { hull: 0x2f5a58, sup: 0x2f5a58, deck: 0x2b4f4c, under: 0x7a3236 });
      var B = MB.fresh(), g = new THREE.Group(), s, i, k;
      /* pressure hull and outer hull: rings of revolution, the paint line at z = 0 */
      var us = [0.3, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.3, 9, 12, 16, 20, 24, 28, 31, 31.8, 32.5, 33.1, 33.55, 33.85, 34.0];
      var NS = 24, rings = [];
      for (i = 0; i < us.length; i++) {
        var r = Math.max(0.02, rad(us[i])), ring = [];
        for (k = 0; k < NS; k++) {
          /* the two ring points nearest the paint line sit exactly on it, so the
             green / red split runs straight along the hull */
          var t = k / NS * TAU;
          if (k === 5 || k === 7) t = (k === 5 ? 1 : -1) * Math.asin(clamp(-ZA / R, -1, 1)) + (k === 7 ? PI : 0);
          ring.push([X(us[i]), r * Math.cos(t), ZA + r * Math.sin(t)]);
        }
        rings.push(ring);
      }
      /* split by the paint line: loft into both bins, keeping each triangle's own colour */
      (function () {
        var tmp = new Bin(null);
        loft(tmp, rings);
        for (var j = 0; j < tmp.P.length; j += 9) {
          var zc = (tmp.P[j + 2] + tmp.P[j + 5] + tmp.P[j + 8]) / 3, bn = zc < -0.02 ? B.under : B.hull;
          for (var q = 0; q < 9; q++) bn.P.push(tmp.P[j + q]);
          for (q = 0; q < 9; q++) bn.N.push(tmp.N[j + q]);
          for (q = 0; q < 6; q++) bn.U.push(tmp.U[j / 9 * 6 + q]);
        }
      })();
      /* casing: flat top 1.4 m wide (NOT CONFIRMED), sides flaring down to the hull; level z 0.70
         from u 9.3, falling to 0.30 at its after end u 4.7; flat front at the bow u 34 */
      (function () {
        var cu = [4.7, 5.6, 7.0, 9.3, 14, 20, 26, 31, 33.2, 33.9], CR = [];
        cu.forEach(function (u) {
          var zt = u >= 9.3 ? 0.7 : lerp(0.3, 0.7, (u - 4.7) / 4.6), hw = 0.7, zb = Math.min(-0.05, ZA + rad(u) * 0.92);   /* the casing meets the hull at the paint line [G] */
          var yb = Math.sqrt(Math.max(0, rad(u) * rad(u) - (zb - ZA) * (zb - ZA)));
          if (u > 33.0) { zb = ZA + 0.2; yb = 0.9; }
          CR.push([[X(u), -yb, zb], [X(u), yb, zb], [X(u), hw, zt - 0.12], [X(u), hw - 0.12, zt], [X(u), -hw + 0.12, zt], [X(u), -hw, zt - 0.12]]);
        });
        loft(B.deck, CR);
        /* limber slots along the casing side [G] */
        for (s = -1; s <= 1; s += 2) for (i = 0; i < 18; i++) {
          var uu = 10 + i * 1.2;
          box(B.dark, X(uu), X(uu) + 0.5, s * 0.74 - 0.02, s * 0.74 + 0.02, 0.22, 0.38);
        }
      })();
      /* fin [G]: lower part u 17.93 - 22.84 to z 1.43, upper tower u 17.93 - 22.41 to z 3.0,
         stadium plan 1.6 m wide (NOT CONFIRMED), the cupola with windows at the fore end */
      (function () {
        var lo = [], up = [];
        lo.push(stadium(X(17.93), X(22.84), 0.8, 0.5, 6), stadium(X(17.93), X(22.84), 0.8, 1.35, 6), stadium(X(18.0), X(22.76), 0.72, 1.43, 6));
        loft(B.sup, lo);
        up.push(stadium(X(17.93), X(22.41), 0.8, 1.4, 6), stadium(X(17.93), X(22.41), 0.8, 2.75, 6), stadium(X(18.05), X(22.3), 0.68, 2.9, 6),
                stadium(X(18.3), X(22.05), 0.45, 3.0, 6));
        loft(B.sup, up);
        for (k = -2; k <= 2; k++) {                                  /* bridge windows round the fore end */
          var a = k * 0.42, cx = X(22.41) - 0.8 + 0.8 * Math.cos(a), cy = 0.8 * Math.sin(a);
          obox(B.glass, [cx, cy, 2.45], [Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1], -0.02, 0.02, -0.14, 0.14, -0.12, 0.12);
        }
        for (s = -1; s <= 1; s += 2) {
          box(B.dark, X(19.2), X(19.9), s * 0.8 - 0.02, s * 0.8 + 0.02, 1.0, 2.1);    /* door line [G] */
          cyl(B.metal, [X(18.2), s * 0.81, 1.5], [X(21.9), s * 0.81, 1.5], 0.025, 0.025, 4);   /* grab rail [G] */
        }
      })();
      /* masts [G] */
      cylZ(B.sup, X(18.7), 0, 2.9, 4.4, 0.13, 10);                              /* snorkel */
      box(B.sup, X(18.4), X(19.0), -0.22, 0.22, 4.4, 4.8);                       /* its head box */
      box(B.dark, X(19.0), X(19.02), -0.15, 0.15, 4.5, 4.7);
      cylZ(B.sup, X(19.2), 0, 2.9, 4.4, 0.12, 10);
      cyl(B.sup, [X(19.8), 0, 2.9], [X(19.75), 0, 4.7], 0.08, 0.05, 8);
      cylZ(B.metal, X(20.4), 0, 2.9, 5.3, 0.05, 6);
      (function () {                                                            /* the whip, bending aft */
        var P = [[21.8, 3.0], [21.8, 4.7], [21.6, 5.6], [21.25, 6.4], [20.9, 7.1]], j;
        for (j = 0; j + 1 < P.length; j++) cyl(B.metal, [X(P[j][0]), 0, P[j][1]], [X(P[j + 1][0]), 0, P[j + 1][1]], 0.035 - j * 0.006, 0.03 - j * 0.006, 4);
      })();
      /* the wire from the fin to the bow and to the stern [G] */
      cyl(B.metal, [X(22.0), 0, 3.0], [X(33.8), 0, 0.85], 0.012, 0.012, 3);
      cyl(B.metal, [X(18.1), 0, 2.5], [X(3.0), 0, 0.6], 0.012, 0.012, 3);
      /* round antenna on a post u 27.2 [G] */
      cylZ(B.metal, X(27.2), 0, 0.7, 0.85, 0.05, 6);
      ellipsoid(B.sup, [X(27.2), 0, 1.07], 0.12, 0.26, 0.26, 5, 12);
      /* bow recess and bow plane [G], mirrored */
      for (s = -1; s <= 1; s += 2) {
        var yr = Math.sqrt(R * R - Math.pow(-2.05 - ZA, 2));
        obox(B.dark, [X(28.3), s * (yr - 0.02), -2.55], [1, 0, 0], [0, s, 0], [0, 0, 1], 0, 1.7, 0, 0.06, 0, 1.0);
        var yp = Math.sqrt(R * R - Math.pow(-2.82 - ZA, 2));
        hexa(B.under, [[X(29.9), s * (yp - 0.1), -2.86], [X(31.4), s * (yp - 0.1), -2.86], [X(31.0), s * (yp + 1.0), -2.86], [X(30.2), s * (yp + 1.0), -2.86],
                       [X(29.9), s * (yp - 0.1), -2.78], [X(31.4), s * (yp - 0.1), -2.78], [X(31.0), s * (yp + 1.0), -2.8], [X(30.2), s * (yp + 1.0), -2.8]]);
      }
      /* the upper rudder u 0 - 3.3 to z 1.14 [G], on the cone */
      hexa(B.hull, [[X(0.0), -0.08, ZA], [X(3.3), -0.08, ZA + 0.9], [X(3.3), 0.08, ZA + 0.9], [X(0.0), 0.08, ZA],
                    [X(0.15), -0.06, 1.14], [X(2.0), -0.06, 1.14], [X(2.0), 0.06, 1.14], [X(0.15), 0.06, 1.14]]);
      box(B.dark, X(0.9), X(0.95), -0.085, 0.085, ZA + 0.3, 1.0);                 /* hinge line */
      /* the small box at the casing's after step [G] */
      box(B.deck, X(4.2), X(4.75), -0.35, 0.35, 0.0, 0.42);
      /* the detail pass [G][Y]: the casing's slat lines and its hatches, the retractable cleats, the rungs
         up the fin's after edge */
      for (k = 0; k < 34; k++) { var uc = 9.6 + k * 0.7; if (uc > 17.7 && uc < 23.0) continue; box(B.dark, X(uc) - 0.015, X(uc) + 0.015, -0.56, 0.56, 0.7, 0.708); }
      [[30.5, 0.6, true], [24.4, 0.55, true], [13.5, 0.6, true], [7.2, 0.5, true]].forEach(function (h) {
        var zh = h[0] >= 9.3 ? 0.7 : lerp(0.3, 0.7, (h[0] - 4.7) / 4.6);
        hatch(B, X(h[0]), 0, zh, h[1], h[1], h[2]);
      });
      for (s = -1; s <= 1; s += 2) {
        [32.4, 26.0, 11.0].forEach(function (u) { box(B.metal, X(u) - 0.2, X(u) + 0.2, s * 0.5 - 0.04, s * 0.5 + 0.04, 0.7, 0.76); });
        for (k = 0; k < 4; k++) box(B.metal, X(17.9) - 0.04, X(17.9) + 0.01, s * 0.3 - 0.15, s * 0.3 + 0.15, 1.6 + k * 0.32, 1.63 + k * 0.32);
      }
      /* team: two flat strips on the casing, 2 cm up */
      box(B.team, X(25.0), X(26.4), -0.4, 0.4, 0.705, 0.725);
      box(B.team, X(12.0), X(13.4), -0.4, 0.4, 0.705, 0.725);
      flush(THREE, g, B);
      return g;
    }
    return { build: build, L: 34.0 };
  })();

  var VARIANTS = {
    kpa_e50_corvette: G5,
    kpa_e60_corvette: NAJIN,
    kpa_e90_corvette: NAJIN,
    kpa_e90_sub: SANGO
  };
  return {
    variants: VARIANTS,
    build: function (THREE, M, C, key) { return VARIANTS[key].build(THREE, M, C); },
    len: function (key) { return VARIANTS[key].L; }
  };
})();

/* Registration: len is each row's measured overall length (G-5 19.04 m with the
   launch rails, Najin 100.0 m, Sang-o 34.0 m). */
(function () {
  ["kpa_e50_corvette", "kpa_e60_corvette", "kpa_e90_corvette", "kpa_e90_sub"].forEach(function (key) {
    UNIT_MODELS[key] = { len: HeroKpaShips.len(key), build: function (THREE, M, C) { return HeroKpaShips.build(THREE, M, C, key); } };
  });
})();

/* HELD (review policy rule 1). Commons was searched one request at a time for
   "Soho class", "Soho frigate North Korea", "catamaran frigate", "North Korean
   frigate", "Korean People's Navy", "North Korean navy", "Sinpo submarine",
   "Sinpo-class", "Gorae submarine", "Sinpo shipyard", "Sinpo satellite",
   "8.24 Yongung", "Pukguksong-1", "SLBM North Korea submarine launch",
   "Nongo", "Kumsong-3 missile boat", "North Korean missile boat" and "North
   Korean patrol boat": no photograph, satellite image or drawing of any of the
   three was found (the Soho photograph on en.wikipedia was deleted).
   UNIT_MODELS["kpa_e80_corvette"]    -- Soho-class frigate: no reference found
   UNIT_MODELS["kpa_e00_sub"]         -- Sinpo / Gorae SSB: no reference found
   UNIT_MODELS["kpa_e00_missileboat"] -- Nongo-class FAC: no reference found */
